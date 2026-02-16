
namespace ROM.WorkOrderExportJob {
    // StatusCode Values for ts_workorderexportjob
    const STATUS_ACTIVE = 1;
    const STATUS_CLIENT_PROCESSING = 741130001; // Webresource generating survey PDFs
    const STATUS_READY_FOR_SERVER = 741130002; // Surveys done -> C# builds payload
    const STATUS_READY_FOR_FLOW = 741130003; // Payload ready -> Flow may start
    const STATUS_FLOW_RUNNING = 741130004; // Flow claimed the job (lock)
    const STATUS_READY_FOR_MERGE = 741130005; // MAIN PDFs exist -> C# merge
    const STATUS_COMPLETED = 741130006; // ZIP created
    const STATUS_ERROR = 741130007; // Error
    const STATUS_MERGE_IN_PROGRESS = 741130008;
    const STATUS_READY_FOR_ZIP = 741130009;
    const STATUS_ZIP_IN_PROGRESS = 741130010;
    const STATUS_READY_FOR_CLEANUP = 741130011;
    const STATUS_CLEANUP_IN_PROGRESS = 741130012;

    let progressPollHandle: number | null = null;
    let finalizeCheckTimeoutHandle: number | null = null;

    const PROGRESS_POLL_INTERVAL_MS = 5000;
    const PROGRESS_WRITE_THROTTLE_MS = 1500;
    const PROGRESS_INDICATOR_UPDATE_THROTTLE_MS = 250;
    const CLIENT_HEARTBEAT_RECENT_MS = 30_000;
    const STALL_WATCHDOG_INTERVAL_MS = 10_000;
    const STALL_TIMEOUT_MS = 4 * 60_000;
    const MAX_AUTO_RESUME_ATTEMPTS = 5;
    const MAX_SAME_CONTEXT_STALLS = 2;
    const INTERRUPTION_FLAG_PREFIX = "wo_export_interrupted_";
    const AUTO_RESUME_FLAG_PREFIX = "wo_export_auto_resume_";
    const RESUME_ATTEMPTS_PREFIX = "wo_export_resume_attempts_";
    const LAST_PROGRESS_CONTEXT_PREFIX = "wo_export_last_context_";
    const LAST_STALL_CONTEXT_PREFIX = "wo_export_last_stall_context_";
    const SAME_STALL_COUNT_PREFIX = "wo_export_same_stall_count_";
    const DEBUG_LOGS = false;
    
    const PROGRESS_NOTIFICATION_ID = "wo_export_progress";
    let criticalProgressIndicatorOpen = false;
    let lastCriticalProgressMessage = "";
    let lastCriticalProgressUpdateMs = 0;
    let leaveGuardEnabled = false;
    let leaveGuardJobId: string | null = null;

    function debugLog(message?: any, ...optionalParams: any[]): void {
        if (!DEBUG_LOGS) return;
        console.log(message, ...optionalParams);
    }

    const beforeUnloadHandler = (event: BeforeUnloadEvent): string => {
        // Modern browsers ignore custom text and show a generic confirmation prompt.
        // Setting returnValue is what triggers: "This page is asking you to confirm..."
        if (leaveGuardJobId) {
            try {
                localStorage.setItem(`${INTERRUPTION_FLAG_PREFIX}${leaveGuardJobId}`, new Date().toISOString());
            } catch (e) {
                // ignore
            }
        }
        event.preventDefault();
        event.returnValue = "";
        return "";
    };


    function getJobId(formContext: any): string {
        return (formContext?.data?.entity?.getId?.() || "").replace(/[{}]/g, "");
    }

    function getStatusLabel(status: number | null | undefined): string {
        switch (status) {
            case STATUS_CLIENT_PROCESSING: return "Processing questionnaires";
            case STATUS_READY_FOR_SERVER: return "Preparing export payload";
            case STATUS_READY_FOR_FLOW: return "Queued for main PDF generation";
            case STATUS_FLOW_RUNNING: return "Generating main PDFs";
            case STATUS_READY_FOR_MERGE: return "Merging PDFs and packaging ZIP";
            case STATUS_MERGE_IN_PROGRESS: return "Merging PDFs";
            case STATUS_READY_FOR_ZIP: return "Preparing ZIP";
            case STATUS_ZIP_IN_PROGRESS: return "Creating final ZIP";
            case STATUS_READY_FOR_CLEANUP: return "Preparing cleanup";
            case STATUS_CLEANUP_IN_PROGRESS: return "Cleaning up intermediate files";
            case STATUS_COMPLETED: return "Completed";
            case STATUS_ERROR: return "Error";
            default: return "Unknown";
        }
    }

    function getStagePrefix(status: number | null | undefined): string {
        if (status === STATUS_CLIENT_PROCESSING) return "[Stage 1/3]";
        if (status === STATUS_READY_FOR_SERVER || status === STATUS_READY_FOR_FLOW || status === STATUS_FLOW_RUNNING) return "[Stage 2/3]";
        if (status === STATUS_READY_FOR_MERGE ||
            status === STATUS_MERGE_IN_PROGRESS ||
            status === STATUS_READY_FOR_ZIP ||
            status === STATUS_ZIP_IN_PROGRESS ||
            status === STATUS_READY_FOR_CLEANUP ||
            status === STATUS_CLEANUP_IN_PROGRESS) return "[Stage 3/3]";
        if (status === STATUS_COMPLETED) return "[Completed]";
        if (status === STATUS_ERROR) return "[Error]";
        return "[Stage]";
    }

    function formatSurveyOverall(done: number, total: number): string {
        const safeTotal = Math.max(0, total);
        const safeDone = Math.max(0, Math.min(done, safeTotal));
        const percent = safeTotal > 0 ? Math.round((safeDone * 100) / safeTotal) : 0;
        return `[Stage 1/3] ${safeDone}/${safeTotal} (${percent}%)`;
    }

    function formatQuestionnaireExportProgress(done: number, total: number, complete: boolean = false): string {
        const overall = formatSurveyOverall(done, total);
        const isActuallyComplete = complete && Math.max(0, done) >= Math.max(0, total);
        return complete
            ? (isActuallyComplete
                ? `${overall} | Questionnaire export | Complete`
                : `${overall} | Questionnaire export | Incomplete`)
            : `${overall} | Questionnaire export`;
    }

    function formatStage1Preparation(detail: string): string {
        return `[Stage 1/3] Initializing | ${detail}`;
    }

    function isRecentHeartbeat(heartbeatIso: string | null | undefined, maxAgeMs: number): boolean {
        if (!heartbeatIso) return false;
        const ts = Date.parse(heartbeatIso);
        if (!Number.isFinite(ts)) return false;
        return (Date.now() - ts) <= maxAgeMs;
    }

    function formatBackendProgressMessage(
        status: number | null | undefined,
        stageLabel: string,
        rawMessage: string,
        doneUnits: number,
        totalUnits: number
    ): string {
        const normalizeBackendDetail = (input: string): string => {
            const text = (input || "").trim();
            if (!text) return text;
            const lower = text.toLowerCase();

            // Remove redundant "ready for X" phrasing when stage label already conveys it.
            if (/(^|\b)merge worker completed all work orders\.\s*ready for zip\.?$/i.test(text)) {
                return "Merge complete for all work orders.";
            }
            if (/(^|\b)ready for zip\.?$/i.test(text)) {
                return "Merge complete. Starting ZIP packaging.";
            }
            if (/(^|\b)ready for cleanup\.?$/i.test(text)) {
                return "ZIP complete. Starting cleanup.";
            }
            if (/(^|\b)ready for merge\.?$/i.test(text)) {
                return "Main PDFs complete. Starting merge.";
            }

            // Generic redundant prefixes from some worker messages.
            if (lower.startsWith("merge worker:")) {
                return text.replace(/^merge worker:\s*/i, "").trim();
            }
            if (lower.startsWith("zip worker:")) {
                return text.replace(/^zip worker:\s*/i, "").trim();
            }
            if (lower.startsWith("cleanup worker:")) {
                return text.replace(/^cleanup worker:\s*/i, "").trim();
            }

            return text;
        };

        const percent = totalUnits > 0 ? Math.max(0, Math.min(100, Math.round((doneUnits * 100) / totalUnits))) : 0;
        const msg = (rawMessage || "").trim();
        const stagePrefix = getStagePrefix(status);
        const stageDisplay = `${stagePrefix} ${stageLabel}`;
        let detailMsg = normalizeBackendDetail(msg);

        // If upstream already wrote a standardized stage message, avoid duplicating prefixes.
        if (/^\[(Stage\s+\d+\/\d+|Completed|Error)\]/i.test(detailMsg)) {
            return detailMsg;
        }

        // Flow messages sometimes repeat the same stage phrase; strip that prefix from detail.
        const stageLabelLower = (stageLabel || "").trim().toLowerCase();
        const detailLower = detailMsg.toLowerCase();
        if (stageLabelLower && detailLower.startsWith(stageLabelLower)) {
            detailMsg = detailMsg.substring(stageLabel.length).replace(/^[:\-\s]+/, "").trim();
        }
        // Some backend writers append the stage label again at the end.
        // Example: "Main PDFs: 3/10 | Generating main PDFs"
        if (stageLabelLower) {
            const trailingStageLabelPattern = new RegExp(`(?:\\||:|-)?\\s*${stageLabel.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*$`, "i");
            detailMsg = detailMsg.replace(trailingStageLabelPattern, "").replace(/\s+\|+\s*$/, "").trim();
        }

        if (!detailMsg) return `${stageDisplay} | Overall ${percent}%`;

        // Common pattern from Flow: "Main PDFs: x/y"
        const mainMatch = detailMsg.match(/^Main PDFs:\s*(\d+)\s*\/\s*(\d+)\s*$/i);
        if (mainMatch) {
            const rawDone = Number(mainMatch[1] || 0);
            const rawTotal = Number(mainMatch[2] || 0);
            const total = Math.max(0, rawTotal);
            const done = total > 0 ? Math.max(0, Math.min(rawDone, total)) : Math.max(0, rawDone);

            // If we've already moved to Stage 3, don't keep showing stale Stage 2 "Main PDFs" counters.
            if (status === STATUS_READY_FOR_MERGE ||
                status === STATUS_MERGE_IN_PROGRESS ||
                status === STATUS_READY_FOR_ZIP ||
                status === STATUS_ZIP_IN_PROGRESS ||
                status === STATUS_READY_FOR_CLEANUP ||
                status === STATUS_CLEANUP_IN_PROGRESS) {
                return `${stageDisplay} | Overall ${percent}% | Starting merge + ZIP`;
            }

            const next = (status === STATUS_FLOW_RUNNING && total > 0 && done >= total) ? "Next: merge + ZIP." : "";
            return `${stageDisplay} | Overall ${percent}% | ${done} of ${total} done. ${next}`.trim();
        }

        // If survey stage completed but we're now in backend, replace technical survey-only messages with a clearer handoff.
        if ((status === STATUS_READY_FOR_SERVER ||
            status === STATUS_READY_FOR_FLOW ||
            status === STATUS_FLOW_RUNNING ||
            status === STATUS_READY_FOR_MERGE ||
            status === STATUS_MERGE_IN_PROGRESS ||
            status === STATUS_READY_FOR_ZIP ||
            status === STATUS_ZIP_IN_PROGRESS ||
            status === STATUS_READY_FOR_CLEANUP ||
            status === STATUS_CLEANUP_IN_PROGRESS) &&
            (detailMsg.toLowerCase().includes("survey pdfs") || detailMsg.toLowerCase().includes("questionnaire pdfs") || detailMsg.toLowerCase().includes("questionnaires") || detailMsg.toLowerCase().includes("questionnaire export")) &&
            detailMsg.toLowerCase().includes("complete")) {
            return `${stageDisplay} | Overall ${percent}% | Questionnaire(s) complete. Continuing with main PDFs and final ZIP...`;
        }

        // Default: prefix with stage so message always has context.
        return `${stageDisplay} | Overall ${percent}% | ${detailMsg}`;
    }

    async function safeUpdateJob(jobId: string, patch: any): Promise<void> {
        try {
            await Xrm.WebApi.updateRecord("ts_workorderexportjob", jobId, patch);
        } catch (e: any) {
            // Don't fail the export if progress writes fail (e.g., column not on form, permissions, etc.)
            debugLog(`[WOExport] Progress update failed: ${e?.message || e}`);
        }
    }

    async function refreshFormAfterCompletion(formContext: any): Promise<boolean> {
        // Some orgs lag before file column metadata appears in-form.
        // Retry refresh a few times so users don't need manual refresh.
        let refreshed = false;
        for (let attempt = 0; attempt < 3; attempt++) {
            try {
                await formContext.data.refresh(false);
                refreshed = true;
                break;
            } catch (e) {
                if (attempt >= 2) break;
                await new Promise<void>((resolve) => window.setTimeout(() => resolve(), 1200));
            }
        }

        // Fallback: force one full page reload so file-column UI state is guaranteed fresh.
        // Guard with a per-job one-time flag to avoid reload loops.
        const jobId = getJobId(formContext);
        if (!jobId) return refreshed;
        const reloadKey = `wo_export_completed_reload_once_${jobId}`;
        const didReload = sessionStorage.getItem(reloadKey) === "1";
        if (didReload) {
            sessionStorage.removeItem(reloadKey);
        }
        if (!refreshed) {
            if (!didReload) {
                sessionStorage.setItem(reloadKey, "1");
                window.setTimeout(() => window.location.reload(), 250);
            }
            return false;
        }

        // Even when data.refresh succeeds, file columns may still lag in rendering in some clients.
        const fileAttr = formContext.getAttribute?.("ts_finalexportzip");
        const hasFileValue = !!fileAttr?.getValue?.();
        if (!hasFileValue) {
            if (!didReload) {
                sessionStorage.setItem(reloadKey, "1");
                window.setTimeout(() => window.location.reload(), 250);
            }
            return false;
        }
        return true;
    }

    function setProgressNotification(formContext: any, text: string, level: "INFO" | "WARNING" | "ERROR" = "INFO"): void {
        try {
            formContext.ui.setFormNotification(text, level, PROGRESS_NOTIFICATION_ID);
        } catch (e) {
            // ignore
        }
    }

    function clearProgressNotification(formContext: any): void {
        try {
            formContext.ui.clearFormNotification(PROGRESS_NOTIFICATION_ID);
        } catch (e) {
            // ignore
        }
    }

    function showCriticalProgressIndicator(text?: string, isUnsafeToClose: boolean = true): void {
        try {
            const header = isUnsafeToClose
                ? "⚠️ Do not close or reload this form."
                : "⏳";
            const detail = text || "Questionnaire export is in progress.";
            const message = isUnsafeToClose ? `${header} | ${detail}` : `${header} ${detail}`;
            if (message === lastCriticalProgressMessage) return;
            const now = Date.now();
            if ((now - lastCriticalProgressUpdateMs) < PROGRESS_INDICATOR_UPDATE_THROTTLE_MS) return;

        if (criticalProgressIndicatorOpen) {
            Xrm.Utility.closeProgressIndicator();
            criticalProgressIndicatorOpen = false;
        }

        // Keep one indicator open and update its message in place.
        Xrm.Utility.showProgressIndicator(message);
            criticalProgressIndicatorOpen = true;
            lastCriticalProgressMessage = message;
            lastCriticalProgressUpdateMs = now;
        } catch (e) {
            // ignore
        }
    }

    function closeCriticalProgressIndicator(): void {
        try {
            if (!criticalProgressIndicatorOpen) return;
            Xrm.Utility.closeProgressIndicator();
            criticalProgressIndicatorOpen = false;
            lastCriticalProgressMessage = "";
            lastCriticalProgressUpdateMs = 0;
        } catch (e) {
            // ignore
        }
    }

    function setLeavePageGuard(enabled: boolean, jobId?: string): void {
        try {
            if (enabled) {
                if (jobId) leaveGuardJobId = jobId;
                if (leaveGuardEnabled) return;
                window.addEventListener("beforeunload", beforeUnloadHandler);
                leaveGuardEnabled = true;
            } else {
                if (!leaveGuardEnabled) return;
                window.removeEventListener("beforeunload", beforeUnloadHandler);
                leaveGuardEnabled = false;
                leaveGuardJobId = null;
            }
        } catch (e) {
            // ignore
        }
    }

    function isSurveyPdfFilename(filename: string): boolean {
        return /^WO_[0-9A-Fa-f-]+_SURVEY_[0-9A-Fa-f-]+\.pdf$/i.test((filename || "").trim());
    }

    function extractSurveyTaskId(filename: string): string | null {
        const match = (filename || "").trim().match(/^WO_[0-9A-Fa-f-]+_SURVEY_([0-9A-Fa-f-]+)\.pdf$/i);
        return match?.[1] ? match[1].toLowerCase() : null;
    }

    function getInterruptionFlagKey(jobId: string): string {
        return `${INTERRUPTION_FLAG_PREFIX}${jobId}`;
    }

    function getAutoResumeFlagKey(jobId: string): string {
        return `${AUTO_RESUME_FLAG_PREFIX}${jobId}`;
    }

    function getResumeAttemptsKey(jobId: string): string {
        return `${RESUME_ATTEMPTS_PREFIX}${jobId}`;
    }

    function getLastProgressContextKey(jobId: string): string {
        return `${LAST_PROGRESS_CONTEXT_PREFIX}${jobId}`;
    }

    function getLastStallContextKey(jobId: string): string {
        return `${LAST_STALL_CONTEXT_PREFIX}${jobId}`;
    }

    function getSameStallCountKey(jobId: string): string {
        return `${SAME_STALL_COUNT_PREFIX}${jobId}`;
    }

    function consumeInterruptionFlag(jobId: string): boolean {
        try {
            const key = getInterruptionFlagKey(jobId);
            const found = !!localStorage.getItem(key);
            if (found) localStorage.removeItem(key);
            return found;
        } catch (e) {
            return false;
        }
    }

    function clearInterruptionFlag(jobId: string): void {
        try {
            localStorage.removeItem(getInterruptionFlagKey(jobId));
        } catch (e) {
            // ignore
        }
    }

    function setAutoResumeFlag(jobId: string): void {
        try {
            localStorage.setItem(getAutoResumeFlagKey(jobId), new Date().toISOString());
        } catch (e) {
            // ignore
        }
    }

    function consumeAutoResumeFlag(jobId: string): boolean {
        try {
            const key = getAutoResumeFlagKey(jobId);
            const found = !!localStorage.getItem(key);
            if (found) localStorage.removeItem(key);
            return found;
        } catch (e) {
            return false;
        }
    }

    function getResumeAttempts(jobId: string): number {
        try {
            const raw = localStorage.getItem(getResumeAttemptsKey(jobId));
            const parsed = Number(raw);
            if (!Number.isFinite(parsed) || parsed < 0) return 0;
            return Math.floor(parsed);
        } catch (e) {
            return 0;
        }
    }

    function setResumeAttempts(jobId: string, attempts: number): void {
        try {
            localStorage.setItem(getResumeAttemptsKey(jobId), `${Math.max(0, Math.floor(attempts))}`);
        } catch (e) {
            // ignore
        }
    }

    function clearResumeAttempts(jobId: string): void {
        try {
            localStorage.removeItem(getResumeAttemptsKey(jobId));
        } catch (e) {
            // ignore
        }
    }

    function setLastProgressContext(jobId: string, text: string): void {
        try {
            localStorage.setItem(getLastProgressContextKey(jobId), (text || "").toString().trim());
        } catch (e) {
            // ignore
        }
    }

    function getLastProgressContext(jobId: string): string {
        try {
            return (localStorage.getItem(getLastProgressContextKey(jobId)) || "").toString();
        } catch (e) {
            return "";
        }
    }

    function clearLastProgressContext(jobId: string): void {
        try {
            localStorage.removeItem(getLastProgressContextKey(jobId));
        } catch (e) {
            // ignore
        }
    }

    function recordStallAtContext(jobId: string, context: string): number {
        try {
            const normalized = (context || "").trim();
            const prevContext = (localStorage.getItem(getLastStallContextKey(jobId)) || "").trim();
            const prevCountRaw = Number(localStorage.getItem(getSameStallCountKey(jobId)) || "0");
            const prevCount = Number.isFinite(prevCountRaw) && prevCountRaw > 0 ? Math.floor(prevCountRaw) : 0;
            const nextCount = prevContext === normalized ? (prevCount + 1) : 1;

            localStorage.setItem(getLastStallContextKey(jobId), normalized);
            localStorage.setItem(getSameStallCountKey(jobId), `${nextCount}`);
            return nextCount;
        } catch (e) {
            return 1;
        }
    }

    function clearStallTracking(jobId: string): void {
        try {
            localStorage.removeItem(getLastStallContextKey(jobId));
            localStorage.removeItem(getSameStallCountKey(jobId));
        } catch (e) {
            // ignore
        }
    }

    async function promptResumeOrCancel(): Promise<"resume" | "cancelled"> {
        const result = await Xrm.Navigation.openConfirmDialog({
            title: "Questionnaire Export Interrupted",
            text: "The previous questionnaire export appears to have been interrupted by closing or refreshing the form. Select OK to resume, or Cancel to cancel this export job.",
            confirmButtonLabel: "OK (Resume)",
            cancelButtonLabel: "Cancel Job"
        });
        return result?.confirmed ? "resume" : "cancelled";
    }

    async function getSurveyPdfAnnotations(jobId: string): Promise<Array<{ annotationid: string; filename: string }>> {
        const query =
            `?$select=annotationid,filename` +
            `&$filter=_objectid_value eq ${jobId} and isdocument eq true` +
            `&$top=5000`;
        const result = await Xrm.WebApi.retrieveMultipleRecords("annotation", query);
        return (result?.entities || [])
            .map((a: any) => ({
                annotationid: (a?.annotationid || "").toString(),
                filename: (a?.filename || "").toString()
            }))
            .filter((a: any) => !!a.annotationid && isSurveyPdfFilename(a.filename));
    }

    function getClientUrl(): string {
        try {
            return Xrm.Utility.getGlobalContext().getClientUrl();
        } catch (e) {
            return "";
        }
    }

    async function tryOpenFinalZipFileColumn(jobId: string, jobRecord: any): Promise<boolean> {
        // File column exposes <column>_name for filename
        const fileName = (jobRecord?.ts_finalexportzip_name || "").toString().trim();
        if (!fileName) return false;

        // Best-effort: open the Web API file download endpoint in a new tab.
        // If the org blocks it, user can still download from the file column on the job form.
        const baseUrl = getClientUrl();
        if (!baseUrl) return false;

        const url = `${baseUrl}/api/data/v9.2/ts_workorderexportjobs(${jobId})/ts_finalexportzip/$value`;
        window.open(url, "_blank");
        return true;
    }

    async function openFinalArtifact(jobId: string, jobRecord: any): Promise<void> {
        // Mode B: Dataverse File column on the job
        if (await tryOpenFinalZipFileColumn(jobId, jobRecord)) {
            return;
        }

        // Mode A: ZIP note on the job
        try {
            const q =
                `?$select=annotationid,filename,subject,createdon` +
                `&$filter=_objectid_value eq ${jobId} and isdocument eq true` +
                `&$orderby=createdon desc` +
                `&$top=10`;
            const notes = await Xrm.WebApi.retrieveMultipleRecords("annotation", q);
            const zipNote = (notes?.entities || []).find((n: any) =>
                ((n?.filename || "").toString().toLowerCase().endsWith(".zip"))
            );
            const noteId = zipNote?.annotationid;
            if (noteId) {
                await Xrm.Navigation.navigateTo({
                    pageType: "entityrecord",
                    entityName: "annotation",
                    entityId: noteId
                }, { target: 1 });
                return;
            }
        } catch (e: any) {
            debugLog(`[WOExport] Failed to locate ZIP note: ${e?.message || e}`);
        }

        Xrm.Navigation.openAlertDialog({ text: "Export completed, but the ZIP could not be located automatically. Please check Notes on the export job (or the Final Export ZIP lookup)." });
    }

    function focusZipControl(formContext: any): void {
        try {
            const zipControl = formContext?.getControl?.("ts_finalexportzip");
            if (zipControl?.setFocus) {
                zipControl.setFocus();
            }
        } catch (e) {
            // ignore
        }
    }

    async function pollAndRenderProgress(formContext: any, jobId: string): Promise<void> {
        // Single retrieve for status + progress
        const select =
            "?$select=statuscode,ts_errormessage,ts_totalunits,ts_doneunits,ts_progressmessage,ts_lastheartbeat,ts_finalexportzip_name";

        const job = await Xrm.WebApi.retrieveRecord("ts_workorderexportjob", jobId, select);
        const status: number | null | undefined = job?.statuscode;

        if (status === STATUS_ERROR) {
            stopProgressPoller(formContext);
            const msg = job?.ts_errormessage || "Export failed. See error message.";
            closeCriticalProgressIndicator();
            setProgressNotification(formContext, `Error: ${msg}`, "ERROR");
            return;
        }

        const totalUnits = Number(job?.ts_totalunits || 0);
        const doneUnits = Number(job?.ts_doneunits || 0);
        const stageLabel = getStatusLabel(status);
        const rawMessage = (job?.ts_progressmessage || "").trim();
        const displayMessage = formatBackendProgressMessage(status, stageLabel, rawMessage, doneUnits, totalUnits);

        if (status === STATUS_COMPLETED) {
            const fileName = (job?.ts_finalexportzip_name || "").toString().trim();
        
            if (!fileName) {
                showCriticalProgressIndicator("Finalizing export...", false);
                if (finalizeCheckTimeoutHandle === null) {
                    finalizeCheckTimeoutHandle = window.setTimeout(() => {
                        finalizeCheckTimeoutHandle = null;
                        pollAndRenderProgress(formContext, jobId).catch(() => {});
                    }, 3_000); // check if file is in the export job
                }
                return;
            }

            const readyForDownload = await refreshFormAfterCompletion(formContext);
            if (!readyForDownload) {
                showCriticalProgressIndicator("Finalizing export...", false);
                if (finalizeCheckTimeoutHandle === null) {
                    finalizeCheckTimeoutHandle = window.setTimeout(() => {
                        finalizeCheckTimeoutHandle = null;
                        pollAndRenderProgress(formContext, jobId).catch(() => {});
                    }, 3_000);
                }
                return;
            }

            stopProgressPoller(formContext);
            closeCriticalProgressIndicator();
            setProgressNotification(formContext, "Export completed. The ZIP is ready to download.", "INFO");
            focusZipControl(formContext);

            const userChoice = await Xrm.Navigation.openConfirmDialog({
                title: "Export Completed",
                text: "The export is complete. Your ZIP is ready.\n\nDo you want to download it now?",
                confirmButtonLabel: "Download ZIP",
                cancelButtonLabel: "Later"
            });
            if (userChoice?.confirmed) {
                await openFinalArtifact(jobId, job);
            }
            return;
        }

        showCriticalProgressIndicator(displayMessage, status === STATUS_CLIENT_PROCESSING);
        clearProgressNotification(formContext);
        
    }

    function startProgressPoller(formContext: any, jobId: string): void {
        if (progressPollHandle !== null) return;

        progressPollHandle = window.setInterval(() => {
            pollAndRenderProgress(formContext, jobId).catch((e: any) => {
                console.warn(`[WOExport] Progress polling error: ${e?.message || e}`);
            });
        }, PROGRESS_POLL_INTERVAL_MS);

        // kick once immediately
        pollAndRenderProgress(formContext, jobId).catch((e: any) => {
            console.warn(`[WOExport] Progress polling error: ${e?.message || e}`);
        });
    }

    function stopProgressPoller(formContext: any): void {
        if (progressPollHandle !== null) {
            window.clearInterval(progressPollHandle);
            progressPollHandle = null;
        }
        if (finalizeCheckTimeoutHandle !== null) {
            window.clearTimeout(finalizeCheckTimeoutHandle);
            finalizeCheckTimeoutHandle = null;
        }
    }

    /**
     * Waits for survey element to render with measurable content.
     * Polls until element has text content.
     * @param targetElement Element to check
     * @param timeoutMs Maximum time to wait in milliseconds
     * @returns Promise that resolves when render is complete or timeout occurs
     */
    async function waitForRender(targetElement: HTMLElement, timeoutMs: number): Promise<void> {
        const startTime = Date.now();
        const pollInterval = 100; // Check every 100ms
        
        return new Promise<void>((resolve) => {
            const checkRender = () => {
                const elapsed = Date.now() - startTime;
                const hasText = targetElement.innerText.trim().length > 0;
                
                if (hasText) {
                    resolve();
                    return;
                }
                
                if (elapsed >= timeoutMs) {
                    resolve();
                    return;
                }
                
                setTimeout(checkRender, pollInterval);
            };
            
            checkRender();
        });
    }

    export async function onLoad(eContext: Xrm.ExecutionContext<any, any>): Promise<void> {
        const formContext = eContext.getFormContext() as any;
        
        // Show internal fields only for Admins
        if (userHasRole("System Administrator")) {
            if (formContext.getControl("ts_payloadjson")) formContext.getControl("ts_payloadjson").setVisible(true);
            if (formContext.getControl("ts_hiddenquestions")) formContext.getControl("ts_hiddenquestions").setVisible(true);
            if (formContext.getControl("ts_finalexportzip")) formContext.getControl("ts_finalexportzip").setVisible(true);
            if (formContext.getControl("ts_surveypayloadjson")) formContext.getControl("ts_surveypayloadjson").setVisible(true);
        }
        
        // Hide WebResource_RenderHost if formType is new (creation)
        const formType = formContext.ui.getFormType();
        if (formType === 1) { // 1 = Create (new)
            const renderHostControl = formContext.getControl("WebResource_RenderHost");
            if (renderHostControl) {
                renderHostControl.setVisible(false);
            }
            // Don't process if form is new - return early
            return;
        }
        
        const status: number | null =
            formContext.getAttribute("statuscode")?.getValue() ??
            formContext.getAttribute("header_ts_statuscode")?.getValue();

        const jobId = getJobId(formContext);
        if (jobId) {
            // If we're in any backend stage, start polling so user sees live progress without refreshes.
            if (status === STATUS_READY_FOR_SERVER ||
                status === STATUS_READY_FOR_FLOW ||
                status === STATUS_FLOW_RUNNING ||
                status === STATUS_READY_FOR_MERGE ||
                status === STATUS_MERGE_IN_PROGRESS ||
                status === STATUS_READY_FOR_ZIP ||
                status === STATUS_ZIP_IN_PROGRESS ||
                status === STATUS_READY_FOR_CLEANUP ||
                status === STATUS_CLEANUP_IN_PROGRESS ||
                status === STATUS_COMPLETED ||
                status === STATUS_ERROR) {
                setLeavePageGuard(false);

                startProgressPoller(formContext, jobId);
                return;
            }
        }

        if (status !== STATUS_CLIENT_PROCESSING) return;

        let stopStallWatchdog: () => void = () => {};
        try {
            let recoveryMode: "none" | "resume" | "cancelled" = "none";
            let resumedTaskIds = new Set<string>();
            let stallWatchdogHandle: number | null = null;
            let lastProgressActivityMs = Date.now();
            let lastProgressContext = "[Stage 1/3] Initializing";
            let autoReloadTriggered = false;

            const touchProgressActivity = (context?: string): void => {
                lastProgressActivityMs = Date.now();
                if ((context || "").trim()) {
                    lastProgressContext = (context || "").trim();
                    if (jobId) setLastProgressContext(jobId, lastProgressContext);
                }
            };

            stopStallWatchdog = (): void => {
                if (stallWatchdogHandle !== null) {
                    window.clearInterval(stallWatchdogHandle);
                    stallWatchdogHandle = null;
                }
            };

            const handleStallDetected = async (): Promise<void> => {
                if (!jobId || autoReloadTriggered) return;
                autoReloadTriggered = true;
                stopStallWatchdog();

                const priorAttempts = getResumeAttempts(jobId);
                const lastKnownContext = getLastProgressContext(jobId) || lastProgressContext || "[Stage 1/3] Unknown";
                const sameContextStallCount = recordStallAtContext(jobId, lastKnownContext);
                const repeatedSameContext = sameContextStallCount >= MAX_SAME_CONTEXT_STALLS;

                if (repeatedSameContext || priorAttempts >= MAX_AUTO_RESUME_ATTEMPTS) {
                    const fatalMsg =
                        repeatedSameContext
                            ? `Stage 1 stalled ${MAX_SAME_CONTEXT_STALLS} times at the same step. Export stopped.\nLast known progress: ${lastKnownContext}`
                            : `Stage 1 auto-resume failed after ${MAX_AUTO_RESUME_ATTEMPTS} attempt(s). Export stopped due to repeated stalls.\nLast known progress: ${lastKnownContext}`;
                    await safeUpdateJob(jobId, {
                        statuscode: STATUS_ERROR,
                        ts_errormessage: fatalMsg,
                        ts_progressmessage: `[Error] Stage 1 stalled repeatedly. Export stopped.`,
                        ts_lastheartbeat: new Date().toISOString()
                    });
                    clearInterruptionFlag(jobId);
                    clearResumeAttempts(jobId);
                    clearLastProgressContext(jobId);
                    clearStallTracking(jobId);
                    setLeavePageGuard(false);
                    closeCriticalProgressIndicator();
                    clearProgressNotification(formContext);
                    try { await formContext.data.refresh(false); } catch {}
                    Xrm.Navigation.openAlertDialog({ text: fatalMsg });
                    return;
                }

                const nextAttempt = priorAttempts + 1;
                setResumeAttempts(jobId, nextAttempt);
                setAutoResumeFlag(jobId);
                try {
                    localStorage.setItem(getInterruptionFlagKey(jobId), new Date().toISOString());
                } catch (e) {
                    // ignore
                }
                await safeUpdateJob(jobId, {
                    ts_progressmessage: `[Stage 1/3] Stall detected. Auto-resume attempt ${nextAttempt}/${MAX_AUTO_RESUME_ATTEMPTS}...`,
                    ts_lastheartbeat: new Date().toISOString()
                });
                showCriticalProgressIndicator(
                    `[Stage 1/3] Stall detected | Auto-resume attempt ${nextAttempt}/${MAX_AUTO_RESUME_ATTEMPTS}`,
                    true
                );
                setLeavePageGuard(false);
                window.setTimeout(() => window.location.reload(), 250);
            };

            if (jobId) {
                const currentJob = await Xrm.WebApi.retrieveRecord(
                    "ts_workorderexportjob",
                    jobId,
                    "?$select=statuscode,ts_lastheartbeat,ts_doneunits,ts_progressmessage"
                );
                const currentStatus: number | null | undefined = currentJob?.statuscode;
                const hasInterruptionFlag = consumeInterruptionFlag(jobId);
                const autoResumeRequested = consumeAutoResumeFlag(jobId);
                const hasPartialProgress = Number(currentJob?.ts_doneunits || 0) > 0 ||
                    ((currentJob?.ts_progressmessage || "").toString().trim().length > 0);
                const heartbeatRecent = isRecentHeartbeat(currentJob?.ts_lastheartbeat, CLIENT_HEARTBEAT_RECENT_MS);
                const isInterruptedRun = currentStatus === STATUS_CLIENT_PROCESSING &&
                    (hasInterruptionFlag || (!heartbeatRecent && hasPartialProgress));

                if (isInterruptedRun) {
                    recoveryMode = autoResumeRequested ? "resume" : await promptResumeOrCancel();

                    if (recoveryMode === "resume") {
                        const existingSurveyNotes = await getSurveyPdfAnnotations(jobId);
                        resumedTaskIds = new Set<string>();
                        for (const note of existingSurveyNotes) {
                            const existingTaskId = extractSurveyTaskId(note.filename);
                            if (existingTaskId) resumedTaskIds.add(existingTaskId);
                        }
                        setProgressNotification(
                            formContext,
                            autoResumeRequested
                                ? `Resuming questionnaire export automatically (${getResumeAttempts(jobId)}/${MAX_AUTO_RESUME_ATTEMPTS}) from ${resumedTaskIds.size} existing PDF(s)...`
                                : `Resuming questionnaire export from ${resumedTaskIds.size} existing PDF(s)...`,
                            "INFO"
                        );
                    } else {
                        const userCancelledMessage =
                            "Questionnaire export was interrupted by close/refresh and then cancelled by the user.";
                        await safeUpdateJob(jobId, {
                            statuscode: STATUS_ERROR,
                            ts_errormessage: userCancelledMessage,
                            ts_progressmessage: userCancelledMessage,
                            ts_lastheartbeat: new Date().toISOString()
                        });
                        clearProgressNotification(formContext);
                        setLeavePageGuard(false);
                        closeCriticalProgressIndicator();
                        clearInterruptionFlag(jobId);
                        clearResumeAttempts(jobId);
                        clearLastProgressContext(jobId);
                        clearStallTracking(jobId);
                        try { await formContext.data.refresh(false); } catch {}
                        Xrm.Navigation.openAlertDialog({ text: userCancelledMessage });
                        return;
                    }
                } else if (currentStatus === STATUS_CLIENT_PROCESSING && heartbeatRecent) {
                    setLeavePageGuard(true, jobId);
                    showCriticalProgressIndicator(
                        "[Stage 1/3] In progress | Questionnaire export is already running. Do not close or reload this form if you started it.",
                        true
                    );
                    startProgressPoller(formContext, jobId);
                    return;
                }
            }

            if (jobId) {
                // Stage 2 is running in this form: warn and prevent accidental close.
                setLeavePageGuard(true, jobId);
                clearProgressNotification(formContext);
                touchProgressActivity("[Stage 1/3] In progress");

                stallWatchdogHandle = window.setInterval(() => {
                    const stalledForMs = Date.now() - lastProgressActivityMs;
                    if (stalledForMs < STALL_TIMEOUT_MS) return;
                    handleStallDetected().catch((e: any) => {
                        console.warn(`[WOExport] Stall watchdog handler failed: ${e?.message || e}`);
                    });
                }, STALL_WATCHDOG_INTERVAL_MS);
            }

            const renderHostControl = formContext.getControl("WebResource_RenderHost");
            if (!renderHostControl) {
                throw new Error("WebResource_RenderHost control not found on form.");
            }

            const renderWindow = await renderHostControl.getContentWindow();
            if (!renderWindow) {
                throw new Error("Render host content window not accessible.");
            }

            const payloadAttr = formContext.getAttribute("ts_surveypayloadjson");
            const payloadStr = payloadAttr?.getValue();
            
            if (!payloadStr) {
              throw new Error("No payload JSON found (ts_surveypayloadjson is empty).");
            }
            
            let rawPayload: any;
            try {
              rawPayload = JSON.parse(payloadStr);
            } catch (e: any) {
              throw new Error(`Invalid payload JSON (parse failed): ${e.message || e}`);
            }
            
            if (!rawPayload || !Array.isArray(rawPayload.ids)) {
              throw new Error("Invalid payload JSON format. Expected { ids: string[], includeHiddenQuestions?: boolean }.");
            }
            
            const ids: string[] = rawPayload.ids;
            const includeHiddenQuestions = !!rawPayload.includeHiddenQuestions;
            const totalExports = ids.length;
            const exportJobId = jobId || getJobId(formContext);

            // Pre-count total questionnaires (survey PDFs) to compute accurate totalUnits.
            // With Flow reporting TWO done-units per Work Order in Stage 4:
            // totalUnits = totalSurveyPdfs + stage4Units + stage5MergeUnits + 1(zip)
            //           = totalSurveyPdfs + (2 * totalWorkOrders) + (1 * totalWorkOrders) + 1
            //           = totalSurveyPdfs + (3 * totalWorkOrders) + 1
            let totalSurveyPdfs = 0;
            const tasksByWorkOrderId: Record<string, any[]> = {};
            const nonBlockingSkips: string[] = [];

            setProgressNotification(
                formContext,
                "Preparing export (1/2): scanning selected work orders...",
                "INFO"
            );
            showCriticalProgressIndicator(formatStage1Preparation("Preparing export (1/2): scanning selected work orders..."));
            let countIndex = 0;
            for (const workOrderId of ids) {
                countIndex++;
                const workOrderIdNoBraces = workOrderId.replace(/[{}]/g, "");
                const fetchOptions =
                    "?$select=msdyn_workorderservicetaskid,msdyn_name,ovs_questionnairedefinition,ovs_questionnaireresponse" +
                    "&$filter=_msdyn_workorder_value eq " + workOrderIdNoBraces;

                showCriticalProgressIndicator(formatStage1Preparation(`Preparing export (1/2): scanning selected work orders (${countIndex}/${totalExports})...`));
                const tasks = await Xrm.WebApi.retrieveMultipleRecords("msdyn_workorderservicetask", fetchOptions);

                const tasksTotal = tasks.entities.length;
                if (tasksTotal === 0) {
                    nonBlockingSkips.push(`Work Order: ${workOrderIdNoBraces}\nSkip Reason: No work order service tasks found.`);
                    tasksByWorkOrderId[workOrderIdNoBraces] = [];
                    continue;
                }

                const tasksWithQuestionnaires = tasks.entities.filter(task =>
                    task.ovs_questionnairedefinition && task.ovs_questionnaireresponse
                );

                if (tasksWithQuestionnaires.length === 0) {
                    nonBlockingSkips.push(`Work Order: ${workOrderIdNoBraces}\nSkip Reason: No questionnaires found in any service tasks.`);
                    tasksByWorkOrderId[workOrderIdNoBraces] = tasks.entities;
                    continue;
                }

                tasksByWorkOrderId[workOrderIdNoBraces] = tasks.entities;
                totalSurveyPdfs += tasksWithQuestionnaires.length;
            }

            const totalUnits = totalSurveyPdfs + (3 * totalExports) + 1;
            let doneUnits = 0;
            if (recoveryMode === "resume" && resumedTaskIds.size > 0) {
                doneUnits = Math.max(0, Math.min(totalSurveyPdfs, resumedTaskIds.size));
            }

            // Initialize progress fields on the job (fields exist in Dataverse but may not be on the form)
            if (exportJobId) {
                await safeUpdateJob(exportJobId, {
                    ts_totalunits: totalUnits,
                    ts_doneunits: doneUnits,
                    ts_progressmessage: formatQuestionnaireExportProgress(doneUnits, totalSurveyPdfs),
                    ts_lastheartbeat: new Date().toISOString()
                });
            }

            // Determine Locale
            const userSettings = Xrm.Utility.getGlobalContext().userSettings;
            const locale = (userSettings.languageId === 1036) ? 'fr' : 'en';

            // Inject CSS to hide buttons (Global)
            const cssId = "ts-survey-pdf-css";
          
            if (!renderWindow.document.getElementById(cssId)) {
              const style = renderWindow.document.createElement("style");
              style.id = cssId;
              style.innerHTML = `
                .sv_nav,
                .sv_next_btn,
                .sv_prev_btn,
                .sv_complete_btn,
                .sv_preview_btn,
                .sv_progress {
                  display: none !important;
                }
          
                .sv_p_root {
                  padding-bottom: 0px !important;
                }

                /* Keep survey blocks together in PDF pages to avoid cut-off at page boundaries. */
                .sv_q,
                .sv_row,
                .sv_panel,
                .sv_q_title,
                .sv_q_description,
                .form-group,
                .printed-textarea {
                  break-inside: avoid !important;
                  page-break-inside: avoid !important;
                }
              `;
              renderWindow.document.head.appendChild(style);
            }

            let currentExportIndex = 0;
            const errors: string[] = [];
            
            // Helper function to update progress notification (local UI)
            const updateProgress = (overallMessage: string, detailMessage?: string) => {
                let combined = overallMessage;
                if (detailMessage) {
                    const lastSep = detailMessage.lastIndexOf("|");
                    if (lastSep >= 0) {
                        const left = detailMessage.substring(0, lastSep).trim();
                        const action = detailMessage.substring(lastSep + 1).trim();
                        const actionLower = action.toLowerCase();
                        const icon =
                            actionLower.includes("error") ? "❌ " :
                            actionLower.includes("done") ? "✅ " :
                            actionLower.includes("upload") ? "⬆️ " :
                            actionLower.includes("render") ? "🖨️ " :
                            actionLower.includes("format") ? "🧩 " :
                            actionLower.includes("generating") ? "📄 " :
                            actionLower.includes("prepar") ? "⏳ " : "";
                        combined = `${overallMessage} | ${left} | ${icon}${action}`;
                    } else {
                        combined = `${overallMessage} | ${detailMessage}`;
                    }
                }
                touchProgressActivity(combined);
                showCriticalProgressIndicator(combined);
            };

            let lastProgressWriteMs = 0;
            const writeProgress = async (message: string, force: boolean = false) => {
                const now = Date.now();
                if (!force && (now - lastProgressWriteMs) < PROGRESS_WRITE_THROTTLE_MS) return;
                lastProgressWriteMs = now;
                if (!exportJobId) return;
                touchProgressActivity(message);
                await safeUpdateJob(exportJobId, {
                    ts_doneunits: doneUnits,
                    ts_progressmessage: message,
                    ts_lastheartbeat: new Date().toISOString()
                });
            };
            
            for (const workOrderId of ids) {
                currentExportIndex++;
                
                const workOrderIdNoBraces = workOrderId.replace(/[{}]/g, "");
                
                // Fetch work order name for progress message
                let workOrderName = "";
                try {
                    const workOrder = await Xrm.WebApi.retrieveRecord("msdyn_workorder", workOrderIdNoBraces, "?$select=msdyn_name");
                    workOrderName = workOrder.msdyn_name || "";
                } catch (e: any) {
                    debugLog(`[WOExport] Could not retrieve work order name for ${workOrderIdNoBraces}: ${e.message}`);
                }
                const workOrderLabel = workOrderName
                    ? `${workOrderIdNoBraces} (${workOrderName})`
                    : workOrderIdNoBraces;
                
                const woDisplayName = workOrderName ? ` (${workOrderName})` : "";
                updateProgress(
                    formatSurveyOverall(doneUnits, totalSurveyPdfs),
                    `Work order ${currentExportIndex}/${totalExports}${woDisplayName} | Starting`
                );
                
                const tasksEntities = tasksByWorkOrderId[workOrderIdNoBraces] || [];
                let tasksTotal = tasksEntities.length;
                let renderedCount = 0;
                let uploadedCount = 0;
                let skippedCount = 0;
                const tasksWithQuestionnaires = tasksEntities.filter(task =>
                    task.ovs_questionnairedefinition && task.ovs_questionnaireresponse
                );
                const totalQuestionnaires = tasksWithQuestionnaires.length;

                // Loop through ALL tasks for the Work Order
                let currentTaskIndex = 0;
                for (const task of tasksEntities) {
                    const taskId = task.msdyn_workorderservicetaskid?.replace(/[{}]/g, "") || "unknown";
                    const normalizedTaskId = taskId.toLowerCase();
                    const taskName = (task.msdyn_name || "").toString().trim() || "Unknown";
                    const taskLabel = `${taskId} (${taskName})`;
                    
                    if (task.ovs_questionnairedefinition && task.ovs_questionnaireresponse) {
                        currentTaskIndex++;
                        if (recoveryMode === "resume" && resumedTaskIds.has(normalizedTaskId)) {
                            skippedCount++;
                            continue;
                        }
                        debugLog(`[WOExport][TaskStart] wo=${workOrderIdNoBraces} woName=${workOrderName || "-"} task=${taskId} idx=${currentTaskIndex}/${totalQuestionnaires}`);
                        const def = task.ovs_questionnairedefinition;
                        const resp = task.ovs_questionnaireresponse;
                        let taskStage = "start";
                        
                        try {
                        taskStage = "prepare";
                        updateProgress(
                            formatSurveyOverall(doneUnits, totalSurveyPdfs),
                            `Work order ${currentExportIndex}/${totalExports}${woDisplayName} | Questionnaire ${currentTaskIndex}/${totalQuestionnaires} | Preparing`
                        );

                        // ---------------------------------------------------------
                        // RENDER LOGIC
                        // ---------------------------------------------------------
                        
                        // Reset Globals
                        renderWindow.operationList = [];
                        renderWindow.activityTypeOperationTypeIdsList = [];
                        renderWindow.questionsOnly = false; 

                        // Clear Previous DOM
                        if (renderWindow.jQuery) {
                            renderWindow.jQuery("#surveyElementPrint").empty();
                            renderWindow.jQuery("#surveyElement").empty();
                        }

                        // Target Element
                        const elementPrint = renderWindow.document.getElementById("surveyElementPrint");
                        const elementNormal = renderWindow.document.getElementById("surveyElement");
                        const targetElement = elementPrint || elementNormal;
                        const targetId = elementPrint ? "#surveyElementPrint" : "#surveyElement";

                        // 1. Parse & Flatten Definition (Single Page)
                        if (!def || typeof def !== 'string' || def.trim() === '') {
                            const warningMessage =
                                `Work Order: ${workOrderLabel}\n` +
                                `Work Order Service Task: ${taskLabel}\n` +
                                `Skip Reason: Questionnaire definition is missing or empty.`;
                            nonBlockingSkips.push(warningMessage);
                            skippedCount++;
                            doneUnits++;
                            updateProgress(
                                formatSurveyOverall(doneUnits, totalSurveyPdfs),
                                `Work order ${currentExportIndex}/${totalExports}${woDisplayName} | Questionnaire ${currentTaskIndex}/${totalQuestionnaires} | Skipped (missing definition)`
                            );
                            await writeProgress(formatQuestionnaireExportProgress(doneUnits, totalSurveyPdfs));
                            continue;
                        }

                        let surveyDef: any;
                        try {
                            surveyDef = JSON.parse(def.trim());
                        } catch (parseError: any) {
                            const warningMessage =
                                `Work Order: ${workOrderLabel}\n` +
                                `Work Order Service Task: ${taskLabel}\n` +
                                `Skip Reason: Invalid questionnaire definition JSON (${parseError?.message || parseError}).`;
                            nonBlockingSkips.push(warningMessage);
                            skippedCount++;
                            doneUnits++;
                            updateProgress(
                                formatSurveyOverall(doneUnits, totalSurveyPdfs),
                                `Work order ${currentExportIndex}/${totalExports}${woDisplayName} | Questionnaire ${currentTaskIndex}/${totalQuestionnaires} | Skipped (invalid definition)`
                            );
                            await writeProgress(formatQuestionnaireExportProgress(doneUnits, totalSurveyPdfs));
                            continue;
                        }

                        // If includeHiddenQuestions is true: clear visibleIf on ALL elements on ALL pages
                        // If false: do nothing (keep original visibleIf)
                        if (includeHiddenQuestions) {
                            for (const page of surveyDef.pages) {
                                const els = page?.elements;
                                if (!Array.isArray(els)) continue;
                                for (const el of els) {
                                    el.visibleIf = null;
                                }
                            }
                        }

                        // 2. Create Model
                        const survey = new renderWindow.Survey.Model(surveyDef);
                        survey.locale = locale;
                        survey.mode = 'display'; 
                        
                        survey.data = resp ? JSON.parse(resp) : {};
                        
                        survey.showCompletedPage = false;
                        survey.showProgressBar = 'off'; // Hide progress bar

                        // Match normal Survey renderer behavior: convert markdown/HTML text blocks
                        // so question titles/descriptions render formatted text instead of raw tags.
                        if (renderWindow.showdown) {
                            const converter = new renderWindow.showdown.Converter();
                            survey.onTextMarkdown.add(function (_sender: any, options: any) {
                                let str = converter.makeHtml(options.text || "");
                                if (str.indexOf("<p>") === 0) {
                                    str = str.substring(3);
                                    str = str.substring(0, str.length - 4);
                                }
                                options.html = str;
                            });
                        }

                        // 3. Event Handlers (Replicating surveyRenderPrint.js)
                        // Append Details Logic
                        survey.onAfterRenderQuestion.add(function (sender: any, options: any) {
                            if (options.question.hasDetail != true) return;
                            
                            const detailSurveyId = options.question.name + "-Detail";
                            const detailLabel = (locale === 'fr') ? (options.question.detailFrenchText || "Detail") : (options.question.detailEnglishText || "Detail");
                            
                            const question = options.htmlElement;
                            const detailContainer = renderWindow.document.createElement("div");
                            const header = renderWindow.document.createElement("div");
                            const content = renderWindow.document.createElement("div");
                            const detailText = renderWindow.document.createElement("span");
                            const detailSymbol = renderWindow.document.createElement("span");
                            const detailBox = renderWindow.document.createElement("textarea");

                            header.appendChild(detailSymbol);
                            header.appendChild(detailText);
                            content.appendChild(detailBox);
                            detailContainer.appendChild(header);
                            detailContainer.appendChild(content);
                            question.appendChild(detailContainer);

                            detailContainer.style.marginTop = "10px";
                            header.style.backgroundColor = "#d3d3d3";
                            header.style.padding = "2px";
                            header.style.fontWeight = "bold";
                            detailBox.className = "form-control";
                            detailBox.rows = 5;
                            detailBox.readOnly = true;
                            detailText.innerHTML = detailLabel;
                            content.style.display = "block";
                            detailSymbol.innerHTML = "- "; // Expanded by default
                            
                            if (sender.getValue(detailSurveyId) != null) detailBox.value = sender.getValue(detailSurveyId);
                        });

                        // 4. Render
                        updateProgress(
                            formatSurveyOverall(doneUnits, totalSurveyPdfs),
                            `Work order ${currentExportIndex}/${totalExports}${woDisplayName} | Questionnaire ${currentTaskIndex}/${totalQuestionnaires} | Rendering`
                        );
                        taskStage = "render";
                        renderWindow.jQuery(targetId).Survey({ model: survey });

                        // Wait for rendering with polling
                        updateProgress(
                            formatSurveyOverall(doneUnits, totalSurveyPdfs),
                            `Work order ${currentExportIndex}/${totalExports}${woDisplayName} | Questionnaire ${currentTaskIndex}/${totalQuestionnaires} | Finalizing layout`
                        );
                        taskStage = "finalize-layout";
                        await waitForRender(targetElement, 10000);

                        // ---------------------------------------------------------
                        // FIX: Convert TextAreas to Divs
                        // ---------------------------------------------------------
                        updateProgress(
                            formatSurveyOverall(doneUnits, totalSurveyPdfs),
                            `Work order ${currentExportIndex}/${totalExports}${woDisplayName} | Questionnaire ${currentTaskIndex}/${totalQuestionnaires} | Formatting`
                        );
                        taskStage = "format";
                        if (renderWindow.jQuery) {
                            renderWindow.jQuery("textarea").each(function (index: number, el: any) {
                                const val = (renderWindow.jQuery(el).val() || "").toString();
                                // IMPORTANT: escape user-entered text before inserting into DOM.
                                // Using .html(val) allows arbitrary markup injection (including malformed style attributes),
                                // which can break html2canvas/html2pdf CSS parsing ("unexpected EOF").
                                const newDiv = renderWindow.jQuery('<div class="printed-textarea"></div>');
                                newDiv.text(val);
                                newDiv.html((newDiv.html() || "").replace(/\n/g, "<br />"));
                                newDiv.css("white-space", "pre-wrap");
                                newDiv.css("word-wrap", "break-word");
                                newDiv.css("border", "1px solid #ccc"); 
                                newDiv.css("padding", "5px");
                                newDiv.css("min-height", "50px");
                                newDiv.addClass("form-control"); 
                                renderWindow.jQuery(el).replaceWith(newDiv);
                            });
                        }

                        // ---------------------------------------------------------
                        // CAPTURE PDF
                        // ---------------------------------------------------------
                        // Filename includes Work Order ID for grouping, plus Task ID for uniqueness
                        const filename = `WO_${workOrderIdNoBraces}_SURVEY_${taskId}.pdf`;
                        
                        updateProgress(
                            formatSurveyOverall(doneUnits, totalSurveyPdfs),
                            `Work order ${currentExportIndex}/${totalExports}${woDisplayName} | Questionnaire ${currentTaskIndex}/${totalQuestionnaires} | Generating`
                        );
                        taskStage = "generate-pdf";
                        const options = {
                            margin: 0.5,
                            filename: filename,
                            image: { type: 'png', quality: 0.98 },
                            html2canvas: { scale: 1, useCORS: true },
                            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
                            pagebreak: {
                                mode: ['css', 'legacy'],
                                avoid: ['.sv_q', '.sv_row', '.sv_panel', '.form-group', '.printed-textarea']
                            }
                        };

                        const blob = await renderWindow.html2pdf().from(targetElement).set(options).output('blob');
                        const sizeMB = (blob.size / (1024 * 1024)).toFixed(2);
                        debugLog(`[WOExport] PDF Generated for Work Order Service Task ${taskId}. Size: ${sizeMB} MB`);

                        if (blob.size < 5 * 1024) {
                            console.warn(`[WOExport] Warning: ${filename} is unusually small (${sizeMB} MB). It may be blank.`);
                        }

                        // ---------------------------------------------------------
                        // UPLOAD
                        // ---------------------------------------------------------
                        updateProgress(
                            formatSurveyOverall(doneUnits, totalSurveyPdfs),
                            `Work order ${currentExportIndex}/${totalExports}${woDisplayName} | Questionnaire ${currentTaskIndex}/${totalQuestionnaires} | Uploading`
                        );
                        taskStage = "upload";
                        const base64Data = await new Promise<string>((resolve, reject) => {
                            const READER_TIMEOUT_MS = 60_000; // 60 seconds max for blob read
                            const reader = new FileReader();
                            let settled = false;

                            const timeoutId = setTimeout(() => {
                                if (settled) return;
                                settled = true;
                                reader.abort();
                                reject(new Error(`FileReader timed out after ${READER_TIMEOUT_MS / 1000}s for ${filename} (${sizeMB} MB)`));
                            }, READER_TIMEOUT_MS);

                            reader.onloadend = () => {
                                if (settled) return;
                                settled = true;
                                clearTimeout(timeoutId);
                                const result = reader.result as string;
                                if (!result) {
                                    reject(new Error(`FileReader returned empty result for ${filename}`));
                                    return;
                                }
                                const data = result.split(',')[1];
                                resolve(data);
                            };

                            reader.onerror = () => {
                                if (settled) return;
                                settled = true;
                                clearTimeout(timeoutId);
                                reject(new Error(`FileReader failed for ${filename}: ${reader.error?.message || 'Unknown error'}`));
                            };

                            reader.onabort = () => {
                                if (settled) return;
                                settled = true;
                                clearTimeout(timeoutId);
                                reject(new Error(`FileReader aborted for ${filename}`));
                            };

                            reader.readAsDataURL(blob);
                        });

                        const exportJobId = formContext.data.entity.getId().replace(/[{}]/g, "");
                        const note: any = {};
                        note.subject = filename;
                        note.filename = filename;
                        note.isdocument = true
                        note.documentbody = base64Data;
                        note.mimetype = "application/pdf";
                        note["objectid_ts_workorderexportjob@odata.bind"] = `/ts_workorderexportjobs(${exportJobId})`;

                        taskStage = "create-annotation";
                        await Xrm.WebApi.createRecord("annotation", note);
                        updateProgress(
                            formatSurveyOverall(doneUnits, totalSurveyPdfs),
                            `Work order ${currentExportIndex}/${totalExports}${woDisplayName} | Questionnaire ${currentTaskIndex}/${totalQuestionnaires} | Done`
                        );

                        renderedCount++;
                        uploadedCount++;
                        debugLog(`[WOExport][TaskDone] wo=${workOrderIdNoBraces} task=${taskId} sizeMB=${sizeMB} uploaded=1`);

                        // Progress unit completed (one survey PDF)
                        doneUnits++;
                        await writeProgress(formatQuestionnaireExportProgress(doneUnits, totalSurveyPdfs));
                        // DO NOT BREAK - Process all tasks for this Work Order
                        } catch (taskError: any) {
                            const userGuidance = "Please try again. If this keeps failing, retry the export without this Work Order/Service Task.";
                            const errorMessage =
                                `Work Order: ${workOrderLabel}\n` +
                                `Work Order Service Task: ${taskLabel}\n` +
                                `Error: ${taskError.message || taskError.toString()}\n` +
                                `${userGuidance}`;
                            errors.push(errorMessage);
                            const errCode = taskError?.errorCode || taskError?.code || "n/a";
                            const errTitle = taskError?.title || "n/a";
                            const errMsg = taskError?.message || taskError?.toString?.() || "Unknown error";
                            console.error(`[WOExport][TaskError] wo=${workOrderIdNoBraces} task=${taskId} stage=${taskStage} code=${errCode} title=${errTitle} msg=${errMsg}`);
                            console.error(`[WOExport] Error processing Work Order Service Task ${taskId} for Work Order ${workOrderIdNoBraces}:`, taskError);
                            updateProgress(
                                formatSurveyOverall(doneUnits, totalSurveyPdfs),
                                `Work order ${currentExportIndex}/${totalExports}${woDisplayName} | Questionnaire ${currentTaskIndex}/${totalQuestionnaires} | Error: ${taskError.message || taskError.toString()}`
                            );
                        }
                    } else {
                        skippedCount++;
                    }
                }
                
                updateProgress(
                    formatSurveyOverall(doneUnits, totalSurveyPdfs),
                    `Work order ${currentExportIndex}/${totalExports}${woDisplayName} | Completed (${renderedCount} PDFs generated, ${skippedCount} skipped)`
                );
                debugLog(`[WOExport] Work Order ${workOrderIdNoBraces}: tasks=${tasksTotal}, rendered=${renderedCount}, uploaded=${uploadedCount}, skipped=${skippedCount}`);
            }

            // 6. Completion
            if (errors.length > 0) {
                // Set error status and message
                formContext.getAttribute("statuscode").setValue(STATUS_ERROR);
                const errorMsgAttr = formContext.getAttribute("ts_errormessage");
                if (errorMsgAttr) {
                    const parts: string[] = [];
                    parts.push(errors.join("\n\n"));
                    if (nonBlockingSkips.length > 0) {
                        parts.push(
                            `Non-blocking skips (${nonBlockingSkips.length}):\n` +
                            nonBlockingSkips.join("\n\n")
                        );
                    }
                    errorMsgAttr.setValue(parts.join("\n\n"));
                }
                clearProgressNotification(formContext);
                setLeavePageGuard(false);
                stopStallWatchdog();
                closeCriticalProgressIndicator();
                if (exportJobId) clearInterruptionFlag(exportJobId);
                if (exportJobId) clearResumeAttempts(exportJobId);
                if (exportJobId) clearLastProgressContext(exportJobId);
                if (exportJobId) clearStallTracking(exportJobId);
                await formContext.data.save();
                Xrm.Navigation.openAlertDialog({ text: `Export completed with ${errors.length} error(s). Check error message field for details.` });
            } else {
                const completionMsg = formatQuestionnaireExportProgress(doneUnits, totalSurveyPdfs, true);
                const completionWithSkips = nonBlockingSkips.length > 0
                    ? `${completionMsg} | Skipped: ${nonBlockingSkips.length}`
                    : completionMsg;
                await writeProgress(completionWithSkips, true);
                stopStallWatchdog();
                closeCriticalProgressIndicator();
                clearProgressNotification(formContext);
                formContext.getAttribute("statuscode").setValue(STATUS_READY_FOR_SERVER);
                if (nonBlockingSkips.length > 0) {
                    const warningSummary =
                        `Non-blocking skips (${nonBlockingSkips.length}):\n` +
                        nonBlockingSkips.join("\n\n");
                    const errorMsgAttr = formContext.getAttribute("ts_errormessage");
                    if (errorMsgAttr) errorMsgAttr.setValue(warningSummary);
                }
                setLeavePageGuard(false);
                closeCriticalProgressIndicator();
                if (exportJobId) clearInterruptionFlag(exportJobId);
                if (exportJobId) clearResumeAttempts(exportJobId);
                if (exportJobId) clearLastProgressContext(exportJobId);
                if (exportJobId) clearStallTracking(exportJobId);

                await formContext.data.save();
                if (exportJobId) {
                    startProgressPoller(formContext, exportJobId);
                }
            }

        } catch (e: any) {
            console.error("[WOExport] ERROR: ", e);
            stopStallWatchdog();
            clearProgressNotification(formContext);
            setLeavePageGuard(false);
            closeCriticalProgressIndicator();
            if (jobId) clearInterruptionFlag(jobId);
            if (jobId) clearResumeAttempts(jobId);
            if (jobId) clearLastProgressContext(jobId);
            if (jobId) clearStallTracking(jobId);

            formContext.getAttribute("statuscode").setValue(STATUS_ERROR);
            const errorMsgAttr = formContext.getAttribute("ts_errormessage");
            if (errorMsgAttr) {
                errorMsgAttr.setValue(e.message || e.toString());
            }
            await formContext.data.save();
            Xrm.Navigation.openAlertDialog({ text: "Error processing export job: " + (e.message || e.toString()) });
        }
    }
}

