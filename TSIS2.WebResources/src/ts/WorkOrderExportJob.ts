
namespace ROM.WorkOrderExportJob {
    function getBackendStallDeadAfterMinutes(fallback: number): number {
        const parsed = Number((window as any).WORK_ORDER_EXPORT_TIMING?.BACKEND_STALL_DEAD_AFTER_MINUTES);
        return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
    }

    // StatusCode Values for ts_workorderexportjob
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
    const STAGE2_STATUSES = [STATUS_READY_FOR_SERVER, STATUS_READY_FOR_FLOW, STATUS_FLOW_RUNNING] as const;
    const STAGE3_STATUSES = [
        STATUS_READY_FOR_MERGE,
        STATUS_MERGE_IN_PROGRESS,
        STATUS_READY_FOR_ZIP,
        STATUS_ZIP_IN_PROGRESS,
        STATUS_READY_FOR_CLEANUP,
        STATUS_CLEANUP_IN_PROGRESS
    ] as const;
    const BACKEND_IN_PROGRESS_STATUSES = [...STAGE2_STATUSES, ...STAGE3_STATUSES] as const;
    const POLL_ONLY_STATUSES = [...BACKEND_IN_PROGRESS_STATUSES, STATUS_COMPLETED, STATUS_ERROR] as const;

    let progressPollHandle: number | null = null;
    let finalizeCheckTimeoutHandle: number | null = null;
    let finalizeWaitStartedAtMs: number | null = null;
    let isProgressPollInFlight = false;
    let hasPendingProgressPoll = false;

    const PROGRESS_POLL_INTERVAL_MS = 5000;
    const FINALIZE_MAX_WAIT_MS = 20_000;
    const PROGRESS_WRITE_THROTTLE_MS = 1500;
    const PROGRESS_INDICATOR_UPDATE_THROTTLE_MS = 250;
    const CLIENT_HEARTBEAT_RECENT_MS = 30_000;
    const STALL_WATCHDOG_INTERVAL_MS = 10_000;
    const STAGE1_STALL_TIMEOUT_MS = 4 * 60_000;
    // Treat backend processing as stalled only after this many minutes without a fresh
    // heartbeat or record update. This is the dead/stalled threshold used by the form poller.
    const BACKEND_STALL_DEAD_AFTER_MINUTES = getBackendStallDeadAfterMinutes(10);
    const BACKEND_STALL_TIMEOUT_MS = BACKEND_STALL_DEAD_AFTER_MINUTES * 60_000;
    const BACKEND_LONG_RUNNING_NOTICE_MS = 4 * 60_000;
    const BACKEND_OVERLAY_MAX_AGE_MS = 110_000;
    const MAX_AUTO_RESUME_ATTEMPTS = 5;
    const MAX_SAME_CONTEXT_STALLS = 2;
    const DEBUG_LOGS = false;
    // Increase RENDER_HOST_COUNT and add matching WebResource_RenderHost_N controls for more parallelized rendering
    const RENDER_HOST_COUNT = 2;
    const RENDER_HOST_CONTROL_PREFIX = "WebResource_RenderHost_";

    const PROGRESS_NOTIFICATION_ID = "wo_export_progress";
    let criticalProgressIndicatorOpen = false;
    let lastCriticalProgressMessage = "";
    let lastCriticalProgressUpdateMs = 0;
    let leaveGuardEnabled = false;

    function getResx(key: string): string {
        try {
            const s = Xrm.Utility.getResourceString("ts_/resx/WorkOrderExport", key);
            return (s && s.trim()) || key;
        } catch {
            return key;
        }
    }

    function getFinalizingProgressText(): string {
        return getResx("FinalizingExportRefreshing");
    }
    let leaveGuardJobId: string | null = null;
    let lastPolledStatusForDebug: number | null = null;

    function debugLog(message?: any, ...optionalParams: any[]): void {
        if (!DEBUG_LOGS) return;
        console.log(message, ...optionalParams);
    }

    function getErrorText(error: any): string {
        if (!error) return "Unknown error";
        const direct = (error.message || error.toString?.() || "").toString().trim();
        const inner = (error?.error?.message || error?.error?.innererror?.message || "").toString().trim();
        return (direct || inner || "Unknown error").trim();
    }

    function runBestEffort(fn: () => void): void {
        try { fn(); } catch {}
    }

    async function waitForRenderHostRuntime(renderWindow: any, hostName: string, timeoutMs: number = 15000): Promise<void> {
        const start = Date.now();
        while ((Date.now() - start) < timeoutMs) {
            const hasSurvey = !!renderWindow?.Survey?.Model;
            const hasHtml2Pdf = typeof renderWindow?.html2pdf === "function";
            const hasJquery = typeof renderWindow?.jQuery === "function";
            if (hasSurvey && hasHtml2Pdf && hasJquery) return;
            await new Promise<void>((resolve) => window.setTimeout(resolve, 200));
        }

        throw new Error(
            `Render host '${hostName}' did not finish loading required libraries (Survey/html2pdf/jQuery). `
        );
    }


    function pollDebug(jobId: string, phase: string, details?: string): void {
        if (!DEBUG_LOGS) return;
        console.log(`[WOExport][Poll][${jobId}] ${phase}${details ? ` | ${details}` : ""}`);
    }

    const beforeUnloadHandler = (event: BeforeUnloadEvent): string => {
        if (leaveGuardJobId) {
            const jobId = leaveGuardJobId;
            runBestEffort(() =>
                localStorage.setItem(getInterruptionFlagKey(jobId), new Date().toISOString()));
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
            case STATUS_CLIENT_PROCESSING: return getResx("PreparingQuestionnaires");
            case STATUS_READY_FOR_SERVER: return getResx("PreparingExportPayload");
            case STATUS_READY_FOR_FLOW: return getResx("QueuedForDocumentGeneration");
            case STATUS_FLOW_RUNNING: return getResx("GeneratingExportDocuments");
            case STATUS_READY_FOR_MERGE: return getResx("MergingPDFsAndPackagingZIP");
            case STATUS_MERGE_IN_PROGRESS: return getResx("MergingPDFs");
            case STATUS_READY_FOR_ZIP: return getResx("PreparingZIP");
            case STATUS_ZIP_IN_PROGRESS: return getResx("BuildingZIP");
            case STATUS_READY_FOR_CLEANUP: return getResx("PreparingCleanup");
            case STATUS_CLEANUP_IN_PROGRESS: return getResx("CleaningUpIntermediateFiles");
            case STATUS_COMPLETED: return getResx("Completed");
            case STATUS_ERROR: return getResx("Error");
            default: return getResx("Unknown");
        }
    }

    function getStagePrefix(status: number | null | undefined): string {
        if (status === STATUS_CLIENT_PROCESSING) return "[Stage 1/3]";
        if (isStage2Status(status)) return "[Stage 2/3]";
        if (isStage3Status(status)) return "[Stage 3/3]";
        if (status === STATUS_COMPLETED) return "[Completed]";
        if (status === STATUS_ERROR) return "[Error]";
        return "[Stage]";
    }

    function isStatusInList(status: number | null | undefined, statuses: readonly number[]): boolean {
        return status != null && statuses.includes(status);
    }

    function isStage2Status(status: number | null | undefined): boolean {
        return isStatusInList(status, STAGE2_STATUSES);
    }

    function isStage3Status(status: number | null | undefined): boolean {
        return isStatusInList(status, STAGE3_STATUSES);
    }

    const STAGE1_PREFIX = "[Stage 1/3] Preparing questionnaires...";

    function formatSurveyOverall(done: number, total: number): string {
        const pct = getStage1Percent(done, total);
        return `${STAGE1_PREFIX} (${formatRatio(done, total)}) - ${pct}%`;
    }

    /** Stage 1 detail: WO | Q (done/total) - XX% | action. Percentage from questionnaire count (done/total survey PDFs). */
    function formatStage1DetailWithWoFirst(
        woIdx: number,
        totalWos: number,
        taskIdx: number,
        totalTasksInWo: number,
        doneUnits: number,
        totalUnits: number,
        action: string
    ): string {
        const pct = getStage1Percent(doneUnits, totalUnits);
        return `${formatWorkOrderTaskProgress(woIdx, totalWos, taskIdx, totalTasksInWo)} (${formatRatio(doneUnits, totalUnits)}) - ${pct}% | ${action}`;
    }

    function formatQuestionnaireExportProgress(done: number, total: number, complete: boolean = false): string {
        const overall = formatSurveyOverall(done, total);
        const isActuallyComplete = complete && Math.max(0, done) >= Math.max(0, total);
        return complete
            ? (isActuallyComplete
                ? `${overall} | Waiting for document generation.`
                : `${overall} | Questionnaire export incomplete`)
            : `${overall} | Questionnaire export`;
    }

    function formatStage1Preparation(detail: string): string {
        return `[Stage 1/3] Initializing | ${detail}`;
    }

    function formatWorkOrderTaskProgress(
        workOrderIndex: number,
        totalWorkOrders: number,
        taskIndex: number,
        totalTasksInWorkOrder: number
    ): string {
        return `WO ${workOrderIndex}/${totalWorkOrders} | Q ${taskIndex}/${totalTasksInWorkOrder}`;
    }

    function formatRatio(done: number, total: number): string {
        const safeTotal = Math.max(0, total);
        const safeDone = Math.max(0, Math.min(done, safeTotal));
        return `${safeDone}/${safeTotal}`;
    }

    function getStage1Percent(done: number, total: number): number {
        const safeTotal = Math.max(0, total);
        const safeDone = Math.max(0, Math.min(done, safeTotal));
        return safeTotal > 0 ? Math.round((safeDone * 100) / safeTotal) : 0;
    }

    function formatRatioWithPercent(done: number, total: number): string {
        const r = formatRatio(done, total);
        const p = getStage1Percent(done, total);
        return `${r}, ${p}%`;
    }

    function formatStageProgress(
        stagePrefix: string,
        actionLabel: string,
        overallPercent?: number,
        detail?: string
    ): string {
        const percentSuffix = typeof overallPercent === "number" ? ` | Overall ${overallPercent}%` : "";
        return detail
            ? `${stagePrefix} ${actionLabel} ${detail}${percentSuffix}`
            : `${stagePrefix} ${actionLabel}${percentSuffix}`;
    }

    function formatStageProgressWithRatio(
        stagePrefix: string,
        actionLabel: string,
        done: number,
        total: number,
        overallPercent: number
    ): string {
        return formatStageProgress(stagePrefix, actionLabel, overallPercent, `(${formatRatioWithPercent(done, total)})`);
    }
    

    function formatSkipBreakdown(
        emptyCount: number,
        invalidDefinitionCount: number,
        noQuestionnaireCount: number,
        erroredCount: number
    ): string {
        const parts: string[] = [];
        if (emptyCount > 0) parts.push(`${emptyCount} empty`);
        if (invalidDefinitionCount > 0) parts.push(`${invalidDefinitionCount} invalid definition`);
        if (noQuestionnaireCount > 0) parts.push(`${noQuestionnaireCount} no questionnaire`);
        if (erroredCount > 0) parts.push(`${erroredCount} errored`);
        return parts.length > 0 ? ` (${parts.join(", ")})` : "";
    }

    function isRecentHeartbeat(heartbeatIso: string | null | undefined, maxAgeMs: number): boolean {
        if (!heartbeatIso) return false;
        const ts = Date.parse(heartbeatIso);
        if (!Number.isFinite(ts)) return false;
        return (Date.now() - ts) <= maxAgeMs;
    }

    function isBackendInProgressStatus(status: number | null | undefined): boolean {
        return isStatusInList(status, BACKEND_IN_PROGRESS_STATUSES);
    }

    function parseDateMs(value: string | null | undefined): number {
        if (!value) return NaN;
        const ts = Date.parse(value);
        return Number.isFinite(ts) ? ts : NaN;
    }

    function isLikelyStalledBackendJob(job: any, status: number | null | undefined): boolean {
        if (!isBackendInProgressStatus(status)) return false;

        const now = Date.now();
        const heartbeatMs = parseDateMs(job?.ts_lastheartbeat);
        const modifiedMs = parseDateMs(job?.modifiedon);
        const heartbeatStale = Number.isFinite(heartbeatMs) ? (now - heartbeatMs) >= BACKEND_STALL_TIMEOUT_MS : true;
        const modifiedStale = Number.isFinite(modifiedMs) ? (now - modifiedMs) >= BACKEND_STALL_TIMEOUT_MS : true;
        const hasPartialProgress =
            Number(job?.ts_doneunits || 0) > 0 ||
            ((job?.ts_progressmessage || "").toString().trim().length > 0) ||
            Number(job?.ts_nextmergeindex || 0) > 0;

        return heartbeatStale && modifiedStale && hasPartialProgress;
    }

    function getBackendActivityAgeMs(job: any): number {
        const heartbeatMs = parseDateMs(job?.ts_lastheartbeat);
        const modifiedMs = parseDateMs(job?.modifiedon);
        const latestActivityMs = Math.max(
            Number.isFinite(heartbeatMs) ? heartbeatMs : -1,
            Number.isFinite(modifiedMs) ? modifiedMs : -1
        );
        if (!Number.isFinite(latestActivityMs) || latestActivityMs <= 0) return NaN;
        return Date.now() - latestActivityMs;
    }

    function getLongRunningBackendNotice(job: any, status: number | null | undefined): string | null {
        if (!isBackendInProgressStatus(status)) return null;

        const activityAgeMs = getBackendActivityAgeMs(job);
        if (!Number.isFinite(activityAgeMs) || activityAgeMs < BACKEND_LONG_RUNNING_NOTICE_MS) {
            return null;
        }

        const ageMinutes = Math.max(1, Math.floor(activityAgeMs / 60_000));
        return "⚠️ " + getResx("LongRunningNotice").replace("{0}", String(ageMinutes));
    }

    function shouldShowBlockingProgressOverlay(job: any, status: number | null | undefined): boolean {
        if (status === STATUS_CLIENT_PROCESSING) return true;
        if (!isBackendInProgressStatus(status)) return false;

        const activityAgeMs = getBackendActivityAgeMs(job);
        if (!Number.isFinite(activityAgeMs)) return false;

        // Only keep the blocking overlay open while backend activity still looks fresh.
        // Polling and non-blocking progress updates continue after the overlay is closed.
        return activityAgeMs < BACKEND_OVERLAY_MAX_AGE_MS;
    }

    function formatBackendProgressMessage(
        status: number | null | undefined,
        stageLabel: string,
        rawMessage: string,
        doneUnits: number,
        totalUnits: number,
        nextMergeIndex?: number | null
    ): string {

        const rawPercent = totalUnits > 0 ? Math.max(0, Math.min(100, Math.round((doneUnits * 100) / totalUnits))) : 0;
        const percent = status === STATUS_COMPLETED ? rawPercent : Math.min(99, rawPercent);
        const msg = (rawMessage || "").trim();
        const stagePrefix = getStagePrefix(status);
        const stageDisplay = `${stagePrefix} ${stageLabel}`;
        const detailMsg = msg;
        const zipCountMatch = msg.match(/(\d+)\s*\/\s*(\d+)/);
        const zipDoneFromMessage = zipCountMatch ? Math.max(0, Number(zipCountMatch[1] || 0)) : null;
        const zipTotalFromMessage = zipCountMatch ? Math.max(0, Number(zipCountMatch[2] || 0)) : null;

        if (isStage2Status(status)) {
            // Stage 2 (flow): treat ts_progressmessage as the source of truth once it no longer looks like leftover Stage 1 text.
            const looksLikeStage1Message = /\[Stage\s+1\/3\]|Questionnaire\s+PDFs/i.test(msg);
            if (msg.length > 0 && !looksLikeStage1Message) {
                return (msg.startsWith("[") || msg.startsWith("✅")) ? msg : `${stagePrefix} ${msg}`;
            }
            return `${stagePrefix} Generating main PDFs...`;
        }

        if (status === STATUS_READY_FOR_ZIP || status === STATUS_ZIP_IN_PROGRESS) {
            // Keep ZIP assembly visually distinct from cleanup/finalization.
            const zipPercent = Math.min(percent, 98);
            if (zipDoneFromMessage !== null && zipTotalFromMessage !== null && zipTotalFromMessage > 0) {
                return formatStageProgressWithRatio(stagePrefix, "Building ZIP...", zipDoneFromMessage, zipTotalFromMessage, zipPercent);
            }
            const safeZipDone = Math.max(0, Number(nextMergeIndex || 0));
            const lowerMsg = msg.toLowerCase();
            const isFinalizingHint =
                lowerMsg.includes("waiting for zip confirmation") ||
                lowerMsg.includes("zip ready, starting cleanup") ||
                lowerMsg.includes("starting cleanup");

            if (isFinalizingHint) {
                return formatStageProgress(stagePrefix, "Finalizing export...", undefined, "Verifying ZIP and preparing cleanup");
            }

            if (safeZipDone <= 0) {
                return formatStageProgress(
                    stagePrefix,
                    "Building ZIP...",
                    zipPercent > 0 ? zipPercent : undefined,
                    "Preparing archive"
                );
            }

            return formatStageProgress(stagePrefix, "Building ZIP...", zipPercent, `(${safeZipDone})`);
        }

        if (status === STATUS_READY_FOR_CLEANUP || status === STATUS_CLEANUP_IN_PROGRESS) {
            return formatStageProgress(stagePrefix, "Cleaning up temporary artifacts...");
        }

        if (status === STATUS_READY_FOR_MERGE || status === STATUS_MERGE_IN_PROGRESS) {
            // Flow sets a final message when moving to ReadyForMerge; show it until merge worker overwrites.
            if (msg.length > 0 && msg.includes("[Stage 2/3]") && (msg.includes("Completed") || msg.includes("Terminé"))) {
                return (msg.startsWith("[") || msg.startsWith("✅")) ? msg : `${stagePrefix} ${msg}`;
            }
            const safeDone = Math.max(0, doneUnits);
            const safeTotal = Math.max(0, totalUnits);
            return formatStageProgressWithRatio(stagePrefix, "Merging PDFs...", safeDone, safeTotal, percent);
        }

        // If upstream already wrote a standardized stage message, avoid duplicating prefixes.
        if (/^\[(Stage\s+\d+\/\d+|Completed|Error)\]/i.test(detailMsg)) {
            return detailMsg;
        }

        if (!detailMsg) return `${stageDisplay} | Overall ${percent}%`;

        // Default: prefix with stage so message always has context.
        return `${stageDisplay} | Overall ${percent}% | ${detailMsg}`;
    }

    async function updateJobCritical(jobId: string, patch: any): Promise<void> {
        await Xrm.WebApi.updateRecord("ts_workorderexportjob", jobId, patch);
    }

    async function updateJobBestEffort(jobId: string, patch: any): Promise<void> {
        try {
            await Xrm.WebApi.updateRecord("ts_workorderexportjob", jobId, patch);
        } catch (e: any) {
            // Best-effort path for non-critical progress writes.
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
            return true;
        }

    function getCompletedPromptShownKey(jobId: string): string {
        return `wo_export_completed_prompt_shown_${jobId}`;
    }

    function hasShownCompletedPrompt(jobId: string): boolean {
        try {
            return sessionStorage.getItem(getCompletedPromptShownKey(jobId)) === "1";
        } catch (e) {
            return false;
        }
    }

    function markCompletedPromptShown(jobId: string): void {
        runBestEffort(() => sessionStorage.setItem(getCompletedPromptShownKey(jobId), "1"));
    }

    function clearCompletedPromptShown(jobId: string): void {
        runBestEffort(() => sessionStorage.removeItem(getCompletedPromptShownKey(jobId)));
    }

    function setProgressNotification(formContext: any, text: string, level: "INFO" | "WARNING" | "ERROR" = "INFO"): void {
        runBestEffort(() => formContext.ui.setFormNotification(text, level, PROGRESS_NOTIFICATION_ID));
    }

    function clearProgressNotification(formContext: any): void {
        runBestEffort(() => formContext.ui.clearFormNotification(PROGRESS_NOTIFICATION_ID));
    }

    function updateErrorMessageVisibility(formContext: any): void {
        runBestEffort(() => {
            const errorControl = formContext?.getControl?.("ts_errormessage");
            if (!errorControl?.setVisible) return;
            const raw = formContext?.getAttribute?.("ts_errormessage")?.getValue?.();
            const hasError = ((raw || "").toString().trim().length > 0);
            errorControl.setVisible(hasError);
        });
    }

    function wireErrorMessageVisibility(formContext: any): void {
        runBestEffort(() => {
            const errorAttr = formContext?.getAttribute?.("ts_errormessage");
            if (!errorAttr?.addOnChange) return;
            const marker = "__woExportErrorVisHooked";
            if ((errorAttr as any)[marker]) return;
            errorAttr.addOnChange(() => updateErrorMessageVisibility(formContext));
            (errorAttr as any)[marker] = true;
        });
    }

    function showCriticalProgressIndicator(text?: string, isUnsafeToClose: boolean = true): void {
        runBestEffort(() => {
            const stripLeadingProgressEmoji = (value: string): string => {
                let cleaned = (value || "").trim();
                const knownPrefixes = ["⏳", "⏳️", "⚠️", "✅", "❌", "📦", "📦️"];
                let changed = true;
                while (changed && cleaned.length > 0) {
                    changed = false;
                    for (const prefix of knownPrefixes) {
                        if (cleaned.startsWith(prefix)) {
                            cleaned = cleaned.substring(prefix.length).trim();
                            changed = true;
                        }
                    }
                    cleaned = cleaned.replace(/^[\uFE0F\u200D\s]+/, "");
                }
                return cleaned;
            };
            const header = isUnsafeToClose
                ? "⚠️ " + getResx("DoNotCloseOrReloadForm")
                : "⏳";
            const detail = stripLeadingProgressEmoji(text || getResx("QuestionnaireExportInProgress"));
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
        });
    }

    function closeCriticalProgressIndicator(): void {
        runBestEffort(() => {
            if (!criticalProgressIndicatorOpen) return;
            Xrm.Utility.closeProgressIndicator();
            criticalProgressIndicatorOpen = false;
            lastCriticalProgressMessage = "";
            lastCriticalProgressUpdateMs = 0;
        });
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
        } catch {
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
        return `wo_export_interrupted_${jobId}`;
    }

    function getAutoResumeFlagKey(jobId: string): string {
        return `wo_export_auto_resume_${jobId}`;
    }

    function getResumeAttemptsKey(jobId: string): string {
        return `wo_export_resume_attempts_${jobId}`;
    }

    function getLastProgressContextKey(jobId: string): string {
        return `wo_export_last_context_${jobId}`;
    }

    function getLastStallContextKey(jobId: string): string {
        return `wo_export_last_stall_context_${jobId}`;
    }

    function getSameStallCountKey(jobId: string): string {
        return `wo_export_same_stall_count_${jobId}`;
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
        runBestEffort(() => localStorage.removeItem(getInterruptionFlagKey(jobId)));
    }

    function setAutoResumeFlag(jobId: string): void {
        runBestEffort(() => localStorage.setItem(getAutoResumeFlagKey(jobId), new Date().toISOString()));
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
        runBestEffort(() =>
            localStorage.setItem(getResumeAttemptsKey(jobId), `${Math.max(0, Math.floor(attempts))}`));
    }

    function clearResumeAttempts(jobId: string): void {
        runBestEffort(() => localStorage.removeItem(getResumeAttemptsKey(jobId)));
    }

    function parseAutoResumeAttemptFromMessage(text: string): number {
        const raw = (text || "").toString().trim();
        if (!raw) return 0;
        const match = raw.match(/auto-resume\s+attempt\s+(\d+)\s*\/\s*(\d+)/i);
        if (!match) return 0;
        const attempt = Number(match[1] || "0");
        return Number.isFinite(attempt) && attempt > 0 ? Math.floor(attempt) : 0;
    }

    function isAutoResumeProgressMessage(text: string): boolean {
        return parseAutoResumeAttemptFromMessage(text) > 0;
    }

    function setLastProgressContext(jobId: string, text: string): void {
        runBestEffort(() =>
            localStorage.setItem(getLastProgressContextKey(jobId), (text || "").toString().trim()));
    }

    function getLastProgressContext(jobId: string): string {
        try {
            return (localStorage.getItem(getLastProgressContextKey(jobId)) || "").toString();
        } catch (e) {
            return "";
        }
    }

    function clearLastProgressContext(jobId: string): void {
        runBestEffort(() => localStorage.removeItem(getLastProgressContextKey(jobId)));
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
        runBestEffort(() => {
            localStorage.removeItem(getLastStallContextKey(jobId));
            localStorage.removeItem(getSameStallCountKey(jobId));
        });
    }

    function clearJobLocalState(jobId: string): void {
        if (!jobId) return;
        clearInterruptionFlag(jobId);
        clearResumeAttempts(jobId);
        clearLastProgressContext(jobId);
        clearStallTracking(jobId);
    }

    function formatBytesForUser(bytes: number): string {
        if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
        const units = ["B", "KB", "MB", "GB"];
        let value = bytes;
        let unitIndex = 0;
        while (value >= 1024 && unitIndex < units.length - 1) {
            value /= 1024;
            unitIndex++;
        }
        const precision = unitIndex <= 1 ? 0 : 2;
        return `${value.toFixed(precision)} ${units[unitIndex]}`;
    }

    function extractBytesFromErrorMessage(message: string): { estimatedBytes?: number; currentBytes?: number; projectedBytes?: number; nextBytes?: number; existingBytes?: number; limitBytes?: number } {
        const text = (message || "").toString();
        const estimatedMatch = text.match(/EstimatedZIPBytes=(\d+)/i);
        const currentMatch = text.match(/CurrentZIPBytes=(\d+)/i);
        const projectedMatch = text.match(/ProjectedZIPBytes=(\d+)/i);
        const nextMatch = text.match(/NextZIPBytes=(\d+)/i);
        const existingMatch = text.match(/ExistingZIPBytes=(\d+)/i);
        const limitMatch = text.match(/LimitBytes=(\d+)/i);

        const parse = (raw?: string): number | undefined => {
            if (!raw) return undefined;
            const parsed = Number(raw);
            return Number.isFinite(parsed) ? parsed : undefined;
        };

        return {
            estimatedBytes: parse(estimatedMatch?.[1]),
            currentBytes: parse(currentMatch?.[1]),
            projectedBytes: parse(projectedMatch?.[1]),
            nextBytes: parse(nextMatch?.[1]),
            existingBytes: parse(existingMatch?.[1]),
            limitBytes: parse(limitMatch?.[1])
        };
    }

    function isZipTooLargeMessage(message: string): boolean {
        const text = (message || "").toLowerCase();
        return text.includes("zip hard limit reached") ||
            text.includes("sandbox zip size limit reached") ||
            text.includes("attachment file size is too big") ||
            (text.includes("export is too large") && text.includes("zip"));
    }

    function buildZipTooLargeMessage(message: string): string {
        const size = extractBytesFromErrorMessage(message);
        const currentText = size.currentBytes ? formatBytesForUser(size.currentBytes) : "";
        const nextText = size.nextBytes ? formatBytesForUser(size.nextBytes) : "";
        const projectedText = size.projectedBytes ? formatBytesForUser(size.projectedBytes) : "";
        const reachedBytes = size.estimatedBytes || size.projectedBytes || size.nextBytes || size.currentBytes || size.existingBytes;
        const reachedText = reachedBytes ? formatBytesForUser(reachedBytes) : "";
        const limitText = size.limitBytes ? formatBytesForUser(size.limitBytes) : "";
        const overByBytes = reachedBytes && size.limitBytes ? Math.max(0, reachedBytes - size.limitBytes) : 0;
        const overByText = overByBytes > 0 ? formatBytesForUser(overByBytes) : "";

        const baseMsg = getResx("ExportTooLargeForSingleZIP");
        let detail = "❌ " + baseMsg;
        if (currentText && nextText && projectedText && limitText) {
            detail = `❌ ZIP size limit reached before continuing. Current ZIP: ${currentText}, Next estimated: ${nextText}, Projected: ${projectedText}, Limit: ${limitText}.`;
        } else if (reachedText && limitText && overByText) {
            detail = `❌ ${baseMsg} Estimated: ${reachedText}. Limit: ${limitText}. Over by: ${overByText}.`;
        } else if (reachedText && limitText) {
            detail = `❌ ${baseMsg} Estimated: ${reachedText}. Limit: ${limitText}.`;
        } else if (reachedText) {
            detail = `❌ ${baseMsg} Estimated: ${reachedText}.`;
        } else if (limitText) {
            detail = `❌ ${baseMsg} Limit: ${limitText}.`;
        }
        return detail + getResx("ReduceWorkOrdersAndRetry");
    }

    function getSizeLimitAlertKey(jobId: string): string {
        return `wo_export_size_limit_alert_${jobId}`;
    }

    function hasShownSizeLimitAlert(jobId: string): boolean {
        try {
            return sessionStorage.getItem(getSizeLimitAlertKey(jobId)) === "1";
        } catch (e) {
            return false;
        }
    }

    function markSizeLimitAlertShown(jobId: string): void {
        runBestEffort(() => sessionStorage.setItem(getSizeLimitAlertKey(jobId), "1"));
    }

    function clearSizeLimitAlertShown(jobId: string): void {
        runBestEffort(() => sessionStorage.removeItem(getSizeLimitAlertKey(jobId)));
    }

    async function promptResumeOrCancel(): Promise<"resume" | "cancelled"> {
        const result = await Xrm.Navigation.openConfirmDialog({
            title: getResx("QuestionnaireExportInterruptedTitle"),
            text: getResx("QuestionnaireExportInterruptedText"),
            confirmButtonLabel: getResx("OKResume"),
            cancelButtonLabel: getResx("CancelJob")
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

    /** Gets current app ID from parent/top frame URL (appid query param). No GUID hardcoding. */
    function getAppIdSync(): string {
        try {
            const w = typeof window !== "undefined" ? window : (null as any);
            const href = (w?.top?.location?.href || w?.parent?.location?.href || w?.location?.href) || "";
            if (!href) return "";
            const url = new URL(href);
            return (url.searchParams.get("appid") || "").trim();
        } catch (e) {
            return "";
        }
    }

    /** Builds record URL for msdyn_workorderservicetask. Uses getClientUrl() and getAppIdSync() so env differs per deployment. */
    function buildServiceTaskRecordUrl(taskId: string): string {
        const baseUrl = getClientUrl();
        if (!baseUrl) return "";
        const appId = getAppIdSync();
        const encodedId = encodeURIComponent(taskId);
        if (appId) {
            return `${baseUrl}/main.aspx?appid=${encodeURIComponent(appId)}&pagetype=entityrecord&etn=msdyn_workorderservicetask&id=${encodedId}`;
        }
        return `${baseUrl}/main.aspx?pagetype=entityrecord&etn=msdyn_workorderservicetask&id=${encodedId}`;
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
        if (await tryOpenFinalZipFileColumn(jobId, jobRecord)) {
            return;
        }

        Xrm.Navigation.openAlertDialog({ text: getResx("ExportCompletedZIPNotFound") });
    }

    function focusZipControl(formContext: any): void {
        runBestEffort(() => {
            const zipControl = formContext?.getControl?.("ts_finalexportzip");
            if (zipControl?.setFocus) zipControl.setFocus();
        });
    }

    async function pollAndRenderProgress(formContext: any, jobId: string): Promise<void> {
        // Single retrieve for status + progress
        const select =
            "?$select=statuscode,ts_errormessage,ts_totalunits,ts_doneunits,ts_progressmessage,ts_lastheartbeat,ts_nextmergeindex,modifiedon,ts_finalexportzip_name";

        const job = await Xrm.WebApi.retrieveRecord("ts_workorderexportjob", jobId, select); 
        const status: number | null | undefined = job?.statuscode;

        if (status === STATUS_ERROR) {
            stopProgressPoller(formContext);
            const msg = job?.ts_errormessage || getResx("ExportFailedSeeError");
            closeCriticalProgressIndicator();
            clearCompletedPromptShown(jobId);
            const isSizeError = isZipTooLargeMessage(msg);
            const displayMsg = isSizeError ? buildZipTooLargeMessage(msg) : msg;
            setProgressNotification(formContext, `Error: ${displayMsg}`, "ERROR");
            if (isSizeError && !hasShownSizeLimitAlert(jobId)) {
                markSizeLimitAlertShown(jobId);
                await Xrm.Navigation.openAlertDialog({
                    title: getResx("ExportTooLargeTitle"),
                    text: displayMsg,
                    confirmButtonLabel: getResx("OK")
                });
            }
            return;
        }
        clearSizeLimitAlertShown(jobId);
        if (status !== STATUS_COMPLETED) {
            clearCompletedPromptShown(jobId);
        }

        const totalUnits = Number(job?.ts_totalunits || 0);
        const doneUnits = Number(job?.ts_doneunits || 0);
        const stageLabel = getStatusLabel(status);
        const rawMessage = (job?.ts_progressmessage || "").trim();
        const displayMessage = formatBackendProgressMessage(
            status,
            stageLabel,
            rawMessage,
            doneUnits,
            totalUnits,
            Number(job?.ts_nextmergeindex || 0)
        );

        const hasStalledWarning = isLikelyStalledBackendJob(job, status);
        if (hasStalledWarning) {
            setProgressNotification(
                formContext,
                getResx("ExportStalledWarning"),
                "WARNING"
            );
        }

        if (status === STATUS_COMPLETED) {
            if (finalizeWaitStartedAtMs === null) {
                finalizeWaitStartedAtMs = Date.now();
            }
            const fileName = (job?.ts_finalexportzip_name || "").toString().trim();
        
            if (!fileName) {
                pollDebug(jobId, "completed-no-file-yet", `status=${status}; done=${doneUnits}/${totalUnits}; progress=${rawMessage || "(empty)"}`);
                showCriticalProgressIndicator(getFinalizingProgressText(), false);
                if (finalizeCheckTimeoutHandle === null) {
                    finalizeCheckTimeoutHandle = window.setTimeout(() => {
                        finalizeCheckTimeoutHandle = null;
                        triggerProgressPoll(formContext, jobId);
                    }, 1_000); // check if file is in the export job
                }
                return;
            }

            const readyForDownload = await refreshFormAfterCompletion(formContext);
            if (!readyForDownload) {
                const waitedMs = Date.now() - (finalizeWaitStartedAtMs || Date.now());
                if (waitedMs >= FINALIZE_MAX_WAIT_MS) {
                    // Fallback: backend completion is authoritative; avoid indefinite spinner when form/file UI lags.
                    pollDebug(jobId, "completed-ui-fallback-timeout", `waitedMs=${waitedMs}; file=${fileName}`);
                    debugLog(`[WOExport] Finalization UI fallback after ${waitedMs}ms (status completed).`);
                } else {
                pollDebug(jobId, "completed-waiting-ui-refresh", `waitedMs=${waitedMs}; file=${fileName}`);
                showCriticalProgressIndicator(getFinalizingProgressText(), false);
                if (finalizeCheckTimeoutHandle === null) {
                    finalizeCheckTimeoutHandle = window.setTimeout(() => {
                        finalizeCheckTimeoutHandle = null;
                        triggerProgressPoll(formContext, jobId);
                    }, 1_000);
                }
                return;
                }
            }

            finalizeWaitStartedAtMs = null;
            pollDebug(jobId, "completed-ready-for-download", `file=${fileName}`);
            stopProgressPoller(formContext);
            closeCriticalProgressIndicator();
            setProgressNotification(formContext, "✅ " + getResx("ExportCompleteMessage"), "INFO");

            if (hasShownCompletedPrompt(jobId)) {
                return;
            }
            markCompletedPromptShown(jobId);

            window.setTimeout(async () => {
                await refreshFormAfterCompletion(formContext);
                focusZipControl(formContext);
                const userChoice = await Xrm.Navigation.openConfirmDialog({
                    title: getResx("ExportCompletedDownloadPromptTitle"),
                    text: getResx("ExportCompletedDownloadPromptText"),
                    confirmButtonLabel: getResx("DownloadZIP"),
                    cancelButtonLabel: getResx("Later")
                });
                if (userChoice?.confirmed) {
                    await openFinalArtifact(jobId, job);
                }
            }, 2000);
            return;
        }

        finalizeWaitStartedAtMs = null;
        if (lastPolledStatusForDebug !== status) {
            pollDebug(jobId, "status-change", `from=${lastPolledStatusForDebug ?? "null"}; to=${status ?? "null"}; label=${stageLabel}`);
            lastPolledStatusForDebug = status ?? null;
        }
        if (shouldShowBlockingProgressOverlay(job, status)) {
            showCriticalProgressIndicator(displayMessage, status === STATUS_CLIENT_PROCESSING);
        } else {
            closeCriticalProgressIndicator();
        }
        const longRunningNotice = getLongRunningBackendNotice(job, status);
        if (longRunningNotice) {
            setProgressNotification(formContext, longRunningNotice, "WARNING");
        } else if (!hasStalledWarning) {
            clearProgressNotification(formContext);
        }

        // Tell Included Work Orders iframe to refresh Stage 2 (main PDF) row state from annotations (same cadence as done-units poll)
        if (status != null && status !== STATUS_ERROR && status !== STATUS_COMPLETED && status >= STATUS_READY_FOR_FLOW) {
            notifyIncludedWorkOrdersRefreshStage2(formContext, jobId);
        }
    }

    function notifyIncludedWorkOrdersRefreshStage2(formContext: any, jobId: string): void {
        try {
            const controls = formContext.ui.controls.get();
            for (let idx = 0; idx < controls.length; idx++) {
                try {
                    const ctrl = controls[idx] as any;
                    const obj = ctrl.getObject?.();
                    if (obj?.tagName === "IFRAME" && typeof obj.src === "string" && obj.src.indexOf("WorkOrderExportIncludedWorkOrders") !== -1 && obj.contentWindow) {
                        obj.contentWindow.postMessage({ type: "wo-export-refresh-stage2", jobId }, "*");
                        break;
                    }
                } catch {
                    /* ignore */
                }
            }
        } catch {
            /* ignore */
        }
    }

    function triggerProgressPoll(formContext: any, jobId: string): void {
        if (isProgressPollInFlight) {
            hasPendingProgressPoll = true;
            return;
        }

        isProgressPollInFlight = true;
        pollAndRenderProgress(formContext, jobId)
            .catch((e: any) => {
                console.warn(`[WOExport] Progress polling error: ${e?.message || e}`);
            })
            .finally(() => {
                isProgressPollInFlight = false;
                if (hasPendingProgressPoll) {
                    hasPendingProgressPoll = false;
                    window.setTimeout(() => triggerProgressPoll(formContext, jobId), 0);
                }
            });
    }

    function startProgressPoller(formContext: any, jobId: string): void {
        if (progressPollHandle !== null) return;

        progressPollHandle = window.setInterval(() => {
            triggerProgressPoll(formContext, jobId);
        }, PROGRESS_POLL_INTERVAL_MS);

        // kick once immediately
        triggerProgressPoll(formContext, jobId);
    }

    function stopProgressPoller(formContext: any): void {
        if (progressPollHandle !== null) {
            window.clearInterval(progressPollHandle);
            progressPollHandle = null;
        }
        hasPendingProgressPoll = false;
        isProgressPollInFlight = false;
        if (finalizeCheckTimeoutHandle !== null) {
            window.clearTimeout(finalizeCheckTimeoutHandle);
            finalizeCheckTimeoutHandle = null;
        }
        finalizeWaitStartedAtMs = null;
    }

    /**
     * Waits for survey element to render with measurable content.
     * Polls until element has text content.
     * @param targetElement Element to check
     * @param timeoutMs Maximum time to wait in milliseconds
     * @returns Promise that resolves when render is complete or timeout occurs
     */
    async function waitForRender(targetElement: HTMLElement, timeoutMs: number): Promise<void> {
        // Fast path: Survey.js often renders synchronously; skip polling when content is already present.
        if (targetElement?.innerText?.trim().length > 0) return;
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

    // -------------------------------------------------------------------------
    // Parallel export helpers
    // -------------------------------------------------------------------------

    function injectExportCss(rw: any): void {
        const cssId = "ts-survey-pdf-css";
        if (rw.document.getElementById(cssId)) return;
        const style = rw.document.createElement("style");
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
            .printed-textarea {
              display: block !important;
              width: 100% !important;
              min-height: 50px;
              height: auto !important;
              padding: 6px 12px;
              color: #555;
              background-color: #fff;
              background-image: none;
              border: 1px solid #ccc;
              border-radius: 4px;
              box-sizing: border-box;
              overflow: visible !important;
            }
          `;
        rw.document.head.appendChild(style);
    }

    type SurveyRenderResult =
        | { status: "ok"; blob: Blob; filename: string; taskId: string }
        | { status: "skipped"; reason: "empty-def" | "invalid-def"; skipMessage: string; taskId: string }
        | { status: "error"; error: string; taskId: string };

    interface SurveyRenderParams {
        renderWindow: any;
        taskId: string;
        taskName: string;
        def: string;
        resp: string | null;
        locale: string;
        includeHiddenQuestions: boolean;
        filename: string;
        onProgress?: (stage: string) => void;
    }

    async function renderSingleSurvey(params: SurveyRenderParams): Promise<SurveyRenderResult> {
        const { renderWindow, taskId, taskName, def, resp, locale, includeHiddenQuestions, filename } = params;
        const notify = params.onProgress || ((_s: string) => {});

        if (!def || typeof def !== "string" || def.trim() === "") {
            return {
                status: "skipped",
                reason: "empty-def",
                skipMessage: `Skip Reason: Questionnaire definition is missing or empty.`,
                taskId
            };
        }

        let surveyDef: any;
        try {
            surveyDef = JSON.parse(def.trim());
        } catch (parseError: any) {
            return {
                status: "skipped",
                reason: "invalid-def",
                skipMessage: `Skip Reason: Invalid questionnaire definition JSON (${parseError?.message || parseError}).`,
                taskId
            };
        }

        try {
            // Reset render window globals
            renderWindow.operationList = [];
            renderWindow.activityTypeOperationTypeIdsList = [];
            renderWindow.questionsOnly = false;

            // Clear previous DOM content
            if (renderWindow.jQuery) {
                renderWindow.jQuery("#surveyElement").empty();
            }

            const targetElement = renderWindow.document.getElementById("surveyElement") as HTMLElement;
            if (!targetElement) {
                return { status: "error", error: "surveyElement not found in render window", taskId };
            }

            // Apply includeHiddenQuestions by clearing visibleIf
            if (includeHiddenQuestions) {
                for (const page of surveyDef.pages || []) {
                    const els = page?.elements;
                    if (!Array.isArray(els)) continue;
                    for (const el of els) {
                        el.visibleIf = null;
                    }
                }
            }

            // Create survey model
            const survey = new renderWindow.Survey.Model(surveyDef);
            survey.locale = locale;
            survey.mode = "display";
            survey.data = resp ? JSON.parse(resp) : {};
            survey.showCompletedPage = false;
            survey.showProgressBar = "off";

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

            // Detail question expansion handler (replicates existing behavior)
            survey.onAfterRenderQuestion.add(function (sender: any, options: any) {
                if (options.question.hasDetail != true) return;
                const detailSurveyId = options.question.name + "-Detail";
                const detailLabel = (locale === "fr")
                    ? (options.question.detailFrenchText || "Detail")
                    : (options.question.detailEnglishText || "Detail");
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
                detailSymbol.innerHTML = "- ";
                if (sender.getValue(detailSurveyId) != null) detailBox.value = sender.getValue(detailSurveyId);
            });

            // Render
            notify("Rendering survey");
            renderWindow.jQuery("#surveyElement").Survey({ model: survey });

            // Wait for DOM to have content
            notify("Preparing layout");
            await waitForRender(targetElement, 10000);

            // Convert textareas to divs for clean PDF capture
            notify("Formatting content");
            if (renderWindow.jQuery && renderWindow.jQuery("textarea").length > 0) {
                renderWindow.jQuery("textarea").each(function (_index: number, el: any) {
                    const val = (renderWindow.jQuery(el).val() || "").toString();
                    const newDiv = renderWindow.jQuery('<div class="printed-textarea"></div>');
                    newDiv.text(val);
                    newDiv.html((newDiv.html() || "").replace(/\n/g, "<br />"));
                    newDiv.css("white-space", "pre-wrap");
                    newDiv.css("word-wrap", "break-word");
                    newDiv.css("overflow-wrap", "break-word");
                    renderWindow.jQuery(el).replaceWith(newDiv);
                });
            }

            // Replace native form controls that html2canvas can't render with text equivalents
            if (renderWindow.jQuery) {
                // Radio buttons: ● selected / ○ unselected
                renderWindow.jQuery("input[type='radio']").each(function (_index: number, el: any) {
                    const jEl = renderWindow.jQuery(el);
                    const checked = jEl.prop("checked");
                    const marker = renderWindow.jQuery('<span></span>');
                    marker.text(checked ? "\u25CF" : "\u25CB");
                    marker.css({ "font-size": "1.1em", "margin-right": "4px" });
                    jEl.replaceWith(marker);
                });
                // Checkboxes: ☑ checked / ☐ unchecked
                renderWindow.jQuery("input[type='checkbox']").each(function (_index: number, el: any) {
                    const jEl = renderWindow.jQuery(el);
                    const checked = jEl.prop("checked");
                    const marker = renderWindow.jQuery('<span></span>');
                    marker.text(checked ? "\u2611" : "\u2610");
                    marker.css({ "font-size": "1.1em", "margin-right": "4px" });
                    jEl.replaceWith(marker);
                });
                // Select dropdowns (finding widget Finding Type): replace with selected option text
                renderWindow.jQuery("select").each(function (_index: number, el: any) {
                    const jEl = renderWindow.jQuery(el);
                    const selectedText = jEl.find("option:selected").text() || "";
                    const span = renderWindow.jQuery('<span></span>');
                    span.text(selectedText);
                    span.css({ "font-style": "italic" });
                    jEl.replaceWith(span);
                });
            }

            // Header on top of survey PDF: work order service task identifier only (no link)
            const pdfContainer = renderWindow.document.createElement("div");
            pdfContainer.id = "ts-survey-pdf-container";
            pdfContainer.style.display = "inline-block";
            pdfContainer.style.width = "100%";

            const headerEl = renderWindow.document.createElement("div");
            headerEl.className = "ts-survey-pdf-header";
            headerEl.style.marginBottom = "10px";
            headerEl.style.paddingBottom = "6px";
            headerEl.style.borderBottom = "1px solid #ccc";
            const taskNameSpan = renderWindow.document.createElement("span");
            taskNameSpan.style.fontWeight = "bold";
            taskNameSpan.style.fontSize = "22px";
            taskNameSpan.textContent = taskName || "Work Order Service Task";
            headerEl.appendChild(taskNameSpan);
            pdfContainer.appendChild(headerEl);
            targetElement.parentNode!.insertBefore(pdfContainer, targetElement);
            pdfContainer.appendChild(targetElement);

            // Capture PDF blob (from container so header is included)
            notify("Generating PDF");
            const pdfOptions = {
                margin: 0.5,
                filename,
                image: { type: "png", quality: 0.98 },
                html2canvas: { scale: 1, useCORS: true, windowWidth: 1200 },
                jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
                pagebreak: {
                    mode: ["css", "legacy"],
                    avoid: [".sv_q", ".sv_row", ".sv_panel", ".form-group", ".printed-textarea", ".ts-survey-pdf-header"]
                }
            };
            const blob: Blob = await renderWindow.html2pdf().from(pdfContainer).set(pdfOptions).output("blob");
            const sizeMB = (blob.size / (1024 * 1024)).toFixed(2);
            debugLog(`[WOExport] PDF generated for task ${taskId}. Size: ${sizeMB} MB`);
            if (blob.size < 5 * 1024) {
                console.warn(`[WOExport] Warning: ${filename} is unusually small (${sizeMB} MB). It may be blank.`);
            }

            return { status: "ok", blob, filename, taskId };

        } catch (e: any) {
            return { status: "error", error: e?.message || e?.toString?.() || "Unknown error", taskId };
        }
    }

    async function uploadSurveyBlob(blob: Blob, filename: string, exportJobId: string): Promise<void> {
        const READER_TIMEOUT_MS = 60_000;
        const sizeMB = (blob.size / (1024 * 1024)).toFixed(2);

        const base64Data = await new Promise<string>((resolve, reject) => {
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
                if (!result) { reject(new Error(`FileReader returned empty result for ${filename}`)); return; }
                resolve(result.split(",")[1]);
            };
            reader.onerror = () => {
                if (settled) return;
                settled = true;
                clearTimeout(timeoutId);
                reject(new Error(`FileReader failed for ${filename}: ${reader.error?.message || "Unknown error"}`));
            };
            reader.onabort = () => {
                if (settled) return;
                settled = true;
                clearTimeout(timeoutId);
                reject(new Error(`FileReader aborted for ${filename}`));
            };
            reader.readAsDataURL(blob);
        });

        const note: any = {
            subject: filename,
            filename,
            isdocument: true,
            documentbody: base64Data,
            mimetype: "application/pdf",
            ["objectid_ts_workorderexportjob@odata.bind"]: `/ts_workorderexportjobs(${exportJobId})`
        };
        await Xrm.WebApi.createRecord("annotation", note);
        debugLog(`[WOExport][Uploaded] ${filename}`);
    }

    export async function onLoad(eContext: Xrm.ExecutionContext<any, any>): Promise<void> {
        const formContext = eContext.getFormContext() as any;
        const isSystemAdmin = userHasRole("System Administrator");

        const adminDebugTab = formContext?.ui?.tabs?.get?.("tab_admin_debug");
        if (adminDebugTab?.setVisible) {
            adminDebugTab.setVisible(isSystemAdmin);
        }

        wireErrorMessageVisibility(formContext);
        updateErrorMessageVisibility(formContext);
        
        // Show internal fields only for Admins
        if (isSystemAdmin) {
            if (formContext.getControl("ts_payloadjson")) formContext.getControl("ts_payloadjson").setVisible(true);
            if (formContext.getControl("ts_hiddenquestions")) formContext.getControl("ts_hiddenquestions").setVisible(true);
            if (formContext.getControl("ts_finalexportzip")) formContext.getControl("ts_finalexportzip").setVisible(true);
            if (formContext.getControl("ts_surveypayloadjson")) formContext.getControl("ts_surveypayloadjson").setVisible(true);
        }
        
        // Hide all render host controls when form is new (creation)
        const formType = formContext.ui.getFormType();
        if (formType === 1) { // 1 = Create (new)
            for (let slot = 1; slot <= RENDER_HOST_COUNT; slot++) {
                formContext.getControl(`${RENDER_HOST_CONTROL_PREFIX}${slot}`)?.setVisible?.(false);
            }
            return;
        }
        
        const status: number | null =
            formContext.getAttribute("statuscode")?.getValue() ??
            formContext.getAttribute("header_ts_statuscode")?.getValue();

        const jobId = getJobId(formContext);
        if (jobId) {
            // If we're in any backend stage, start polling so user sees live progress without refreshes.
            if (isStatusInList(status, POLL_ONLY_STATUSES)) {
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

                const messageAttempts = parseAutoResumeAttemptFromMessage(
                    formContext?.getAttribute?.("ts_progressmessage")?.getValue?.() || ""
                );
                const priorAttempts = Math.max(getResumeAttempts(jobId), messageAttempts);
                const lastKnownContext = getLastProgressContext(jobId) || lastProgressContext || "[Stage 1/3] Unknown";
                const sameContextStallCount = recordStallAtContext(jobId, lastKnownContext);
                const repeatedSameContext = sameContextStallCount >= MAX_SAME_CONTEXT_STALLS;

                if (repeatedSameContext || priorAttempts >= MAX_AUTO_RESUME_ATTEMPTS) {
                    const fatalMsg =
                        repeatedSameContext
                            ? `Stage 1 stalled ${MAX_SAME_CONTEXT_STALLS} times at the same step. Export stopped.\nLast known progress: ${lastKnownContext}`
                            : `Stage 1 auto-resume failed after ${MAX_AUTO_RESUME_ATTEMPTS} attempt(s). Export stopped due to repeated stalls.\nLast known progress: ${lastKnownContext}`;
                    await updateJobCritical(jobId, {
                        statuscode: STATUS_ERROR,
                        ts_errormessage: fatalMsg,
                        ts_progressmessage: `[Error] Stage 1 stalled repeatedly. Export stopped.`,
                        ts_lastheartbeat: new Date().toISOString()
                    });
                    clearJobLocalState(jobId);
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
                } catch {
                }
                await updateJobBestEffort(jobId, {
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
                const currentProgressMessage = (currentJob?.ts_progressmessage || "").toString();
                const progressIndicatesAutoResume = isAutoResumeProgressMessage(currentProgressMessage);
                const hasPartialProgress = Number(currentJob?.ts_doneunits || 0) > 0 ||
                    (currentProgressMessage.trim().length > 0);
                const heartbeatRecent = isRecentHeartbeat(currentJob?.ts_lastheartbeat, CLIENT_HEARTBEAT_RECENT_MS);
                const isInterruptedRun = currentStatus === STATUS_CLIENT_PROCESSING &&
                    (hasInterruptionFlag || autoResumeRequested || progressIndicatesAutoResume || (!heartbeatRecent && hasPartialProgress));

                if (isInterruptedRun) {
                    if (progressIndicatesAutoResume && !autoResumeRequested && !hasInterruptionFlag) {
                        debugLog("[WOExport] Auto-resume inferred from ts_progressmessage fallback.");
                    }
                    recoveryMode = (autoResumeRequested || progressIndicatesAutoResume) ? "resume" : await promptResumeOrCancel();

                    if (recoveryMode === "resume") {
                        const existingSurveyNotes = await getSurveyPdfAnnotations(jobId);
                        resumedTaskIds = new Set<string>();
                        for (const note of existingSurveyNotes) {
                            const existingTaskId = extractSurveyTaskId(note.filename);
                            if (existingTaskId) resumedTaskIds.add(existingTaskId);
                        }
                        setProgressNotification(
                            formContext,
                            (autoResumeRequested || progressIndicatesAutoResume)
                                ? `Resuming questionnaire export automatically (${getResumeAttempts(jobId)}/${MAX_AUTO_RESUME_ATTEMPTS}) from ${resumedTaskIds.size} existing PDF(s)...`
                                : `Resuming questionnaire export from ${resumedTaskIds.size} existing PDF(s)...`,
                            "INFO"
                        );
                    } else {
                        const userCancelledMessage =
                            "Questionnaire export was interrupted (the page was left or reloaded), and resume was cancelled by the user.";
                        await updateJobCritical(jobId, {
                            statuscode: STATUS_ERROR,
                            ts_errormessage: userCancelledMessage,
                            ts_progressmessage: userCancelledMessage,
                            ts_lastheartbeat: new Date().toISOString()
                        });
                        clearProgressNotification(formContext);
                        setLeavePageGuard(false);
                        closeCriticalProgressIndicator();
                        clearJobLocalState(jobId);
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
                    if (stalledForMs < STAGE1_STALL_TIMEOUT_MS) return;
                    handleStallDetected().catch((e: any) => {
                        console.warn(`[WOExport] Stall watchdog handler failed: ${e?.message || e}`);
                    });
                }, STALL_WATCHDOG_INTERVAL_MS);
            }

            const renderWindows: any[] = [];
            for (let slot = 1; slot <= RENDER_HOST_COUNT; slot++) {
                const ctrlName = `${RENDER_HOST_CONTROL_PREFIX}${slot}`;
                const ctrl = formContext.getControl(ctrlName);
                if (!ctrl) throw new Error(`Render host control not found on form: ${ctrlName}`);
                const rw = await ctrl.getContentWindow();
                if (!rw) throw new Error(`Render host content window not accessible: ${ctrlName}`);
                await waitForRenderHostRuntime(rw, ctrlName);
                renderWindows.push(rw);
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

            // Pre-count total questionnaires (survey PDFs) to compute accurate totalUnits.
            // With Flow reporting TWO done-units per Work Order in Stage 4:
            // totalUnits = totalSurveyPdfs + stage4Units + stage5MergeUnits + 1(zip)
            //           = totalSurveyPdfs + (2 * totalWorkOrders) + (1 * totalWorkOrders) + 1
            //           = totalSurveyPdfs + (3 * totalWorkOrders) + 1
            let totalSurveyPdfs = 0;
            const tasksByWorkOrderId: Record<string, any[]> = {};
            const nonBlockingSkips: string[] = [];
            let skippedEmptyCount = 0;
            let skippedInvalidDefinitionCount = 0;
            let skippedNoQuestionnaireCount = 0;

            setProgressNotification(
                formContext,
                formatStage1Preparation("Preparing export (1/2): scanning selected work orders..."),
                "INFO"
            );
            showCriticalProgressIndicator(formatStage1Preparation("Preparing export (1/2): scanning selected work orders..."));
            const workOrderNames = new Map<string, string>();
            let countIndex = 0;
            for (const workOrderId of ids) {
                countIndex++;
                const workOrderIdNoBraces = workOrderId.replace(/[{}]/g, "");
                const fetchOptions =
                    "?$select=msdyn_workorderservicetaskid,msdyn_name,ovs_questionnairedefinition,ovs_questionnaireresponse" +
                    "&$filter=_msdyn_workorder_value eq " + workOrderIdNoBraces;

                const scanMessage = formatStage1Preparation(`Preparing export (1/2): scanning selected work orders (${formatRatioWithPercent(countIndex, totalExports)})...`);
                setProgressNotification(formContext, scanMessage, "INFO");
                showCriticalProgressIndicator(scanMessage);
                let tasks: any;
                try {
                    const [wo, fetchedTasks] = await Promise.all([
                        Xrm.WebApi.retrieveRecord("msdyn_workorder", workOrderIdNoBraces, "?$select=msdyn_name")
                            .catch(() => null),
                        Xrm.WebApi.retrieveMultipleRecords("msdyn_workorderservicetask", fetchOptions)
                    ]);
                    workOrderNames.set(workOrderIdNoBraces, (wo as any)?.msdyn_name || "");
                    tasks = fetchedTasks;
                } catch (scanErr: any) {
                    throw new Error(`Failed loading service tasks for work order ${workOrderIdNoBraces}: ${getErrorText(scanErr)}`);
                }

                const tasksTotal = tasks.entities.length;
                if (tasksTotal === 0) {
                    nonBlockingSkips.push(`Work Order: ${workOrderIdNoBraces}\nSkip Reason: No work order service tasks found.`);
                    skippedNoQuestionnaireCount++;
                    tasksByWorkOrderId[workOrderIdNoBraces] = [];
                    continue;
                }

                const tasksWithQuestionnaires = tasks.entities.filter(task =>
                    task.ovs_questionnairedefinition && task.ovs_questionnaireresponse
                );

                if (tasksWithQuestionnaires.length === 0) {
                    nonBlockingSkips.push(`Work Order: ${workOrderIdNoBraces}\nSkip Reason: No questionnaires found in any service tasks.`);
                    skippedNoQuestionnaireCount++;
                    tasksByWorkOrderId[workOrderIdNoBraces] = tasks.entities;
                    continue;
                }

                tasksByWorkOrderId[workOrderIdNoBraces] = tasks.entities;
                totalSurveyPdfs += tasksWithQuestionnaires.length;
            }

            // Build a flat ordered list of surveys to render.
            // Excludes WOs with no tasks / no questionnaires (already tracked in nonBlockingSkips above).
            // Excludes tasks already uploaded when resuming an interrupted run.
            type SurveyChunkItem = {
                task: any;
                workOrderIdNoBraces: string;
                workOrderLabel: string;
                woIndex: number;
                taskIndex: number;
                totalQuestionnairesInWo: number;
            };
            const allSurveys: SurveyChunkItem[] = [];
            {
                let woIdx = 0;
                for (const workOrderId of ids) {
                    const wId = workOrderId.replace(/[{}]/g, "");
                    const woName = workOrderNames.get(wId) || "";
                    const workOrderLabel = woName ? `${wId} (${woName})` : wId;
                    const tasksEntities = tasksByWorkOrderId[wId] || [];
                    const tasksWithQ = tasksEntities.filter((t: any) =>
                        t.ovs_questionnairedefinition && t.ovs_questionnaireresponse
                    );
                    // Track individual non-questionnaire tasks within WOs that do have some questionnaires
                    if (tasksWithQ.length > 0) {
                        skippedNoQuestionnaireCount += (tasksEntities.length - tasksWithQ.length);
                    }
                    woIdx++;
                    let taskIdx = 0;
                    for (const task of tasksWithQ) {
                        taskIdx++;
                        const taskId = (task.msdyn_workorderservicetaskid || "unknown").replace(/[{}]/g, "");
                        // Skip tasks already uploaded in a previous interrupted run
                        if (recoveryMode === "resume" && resumedTaskIds.has(taskId.toLowerCase())) {
                            continue;
                        }
                        allSurveys.push({
                            task,
                            workOrderIdNoBraces: wId,
                            workOrderLabel,
                            woIndex: woIdx,
                            taskIndex: taskIdx,
                            totalQuestionnairesInWo: tasksWithQ.length
                        });
                    }
                }
            }

            const totalUnits = totalSurveyPdfs + (3 * totalExports) + 1;
            let doneUnits = 0;
            if (recoveryMode === "resume" && resumedTaskIds.size > 0) {
                doneUnits = Math.max(0, Math.min(totalSurveyPdfs, resumedTaskIds.size));
            }

            // Initialize progress fields on the job (fields exist in Dataverse but may not be on the form)
            if (jobId) {
                await updateJobBestEffort(jobId, {
                    ts_totalunits: totalUnits,
                    ts_doneunits: doneUnits,
                    ts_progressmessage: formatQuestionnaireExportProgress(doneUnits, totalSurveyPdfs),
                    ts_lastheartbeat: new Date().toISOString()
                });
            }

            // Determine Locale
            const userSettings = Xrm.Utility.getGlobalContext().userSettings;
            const locale = (userSettings.languageId === 1036) ? 'fr' : 'en';

            // Inject export CSS into all render windows
            for (const rw of renderWindows) {
                injectExportCss(rw);
            }

            const errors: string[] = [];

            // Per-WO completion for Included Work Orders table (Stage 1 row coloring)
            const totalTasksPerWo: Record<string, number> = {};
            for (const s of allSurveys) {
                const w = s.workOrderIdNoBraces;
                totalTasksPerWo[w] = (totalTasksPerWo[w] || 0) + 1;
            }
            const completedCountByWo: Record<string, number> = {};
            const stage1CompletedSet = new Set<string>();
            const stage1FailedSet = new Set<string>();
            const notifyIncludedWorkOrdersStage1 = (woIds: string[]) => {
                try {
                    const controls = formContext.ui.controls.get();
                    for (let idx = 0; idx < controls.length; idx++) {
                        try {
                            const ctrl = controls[idx] as any;
                            const obj = ctrl.getObject?.();
                            if (obj?.tagName === "IFRAME" && typeof obj.src === "string" && obj.src.indexOf("WorkOrderExportIncludedWorkOrders") !== -1 && obj.contentWindow) {
                                obj.contentWindow.postMessage({ type: "wo-export-stage1-completed", workOrderIds: woIds }, "*");
                                break;
                            }
                        } catch {
                            /* ignore */
                        }
                    }
                } catch {
                    /* ignore */
                }
            };
            const notifyIncludedWorkOrdersStage1Failed = (woIds: string[]) => {
                try {
                    const controls = formContext.ui.controls.get();
                    for (let idx = 0; idx < controls.length; idx++) {
                        try {
                            const ctrl = controls[idx] as any;
                            const obj = ctrl.getObject?.();
                            if (obj?.tagName === "IFRAME" && typeof obj.src === "string" && obj.src.indexOf("WorkOrderExportIncludedWorkOrders") !== -1 && obj.contentWindow) {
                                obj.contentWindow.postMessage({ type: "wo-export-stage1-failed", workOrderIds: woIds }, "*");
                                break;
                            }
                        } catch {
                            /* ignore */
                        }
                    }
                } catch {
                    /* ignore */
                }
            };
            const onWoStage1Complete = (workOrderIdNoBraces: string) => {
                completedCountByWo[workOrderIdNoBraces] = (completedCountByWo[workOrderIdNoBraces] || 0) + 1;
                const total = totalTasksPerWo[workOrderIdNoBraces];
                if (total && completedCountByWo[workOrderIdNoBraces] === total) {
                    stage1CompletedSet.add(workOrderIdNoBraces);
                    notifyIncludedWorkOrdersStage1(Array.from(stage1CompletedSet));
                }
            };

            // Helper function to update progress notification (local UI)
            const updateProgress = (overallMessage: string, detailMessage?: string) => {
                const combined = detailMessage ? `${overallMessage} | ${detailMessage}` : overallMessage;
                touchProgressActivity(combined);
                setProgressNotification(formContext, combined, "INFO");
                showCriticalProgressIndicator(combined);
            };

            let lastProgressWriteMs = 0;
            const writeProgress = async (message: string, force: boolean = false) => {
                const now = Date.now();
                if (!force && (now - lastProgressWriteMs) < PROGRESS_WRITE_THROTTLE_MS) return;
                lastProgressWriteMs = now;
                if (!jobId) return;
                touchProgressActivity(message);
                await updateJobBestEffort(jobId, {
                    ts_doneunits: doneUnits,
                    ts_progressmessage: message,
                    ts_lastheartbeat: new Date().toISOString()
                });
            };
            
            // Process all surveys in parallel chunks — RENDER_HOST_COUNT surveys rendered simultaneously,
            // each in its own isolated iframe. Uploads are pipelined: fired in the background while the
            // next chunk renders, then awaited at the start of the following iteration.
            let pendingUploadPromises: Array<Promise<void>> = [];

            for (let i = 0; i < allSurveys.length; i += RENDER_HOST_COUNT) {
                // Wait for the previous chunk's uploads before starting new renders (keeps memory bounded)
                if (pendingUploadPromises.length > 0) {
                    await Promise.all(pendingUploadPromises);
                    pendingUploadPromises = [];
                }

                const chunk = allSurveys.slice(i, i + RENDER_HOST_COUNT);
                const pct = getStage1Percent(doneUnits, totalSurveyPdfs);
                const chunkLabel =
                    chunk
                        .map(s => formatWorkOrderTaskProgress(s.woIndex, totalExports, s.taskIndex, s.totalQuestionnairesInWo))
                        .join(" & ") +
                    ` (${formatRatio(doneUnits, totalSurveyPdfs)}) - ${pct}% | Rendering`;
                updateProgress(STAGE1_PREFIX, chunkLabel);

                // Fire all renders in the chunk in parallel — each uses its own render window (separate iframe)
                const renderPromises = chunk.map((item, slotIndex) => {
                    const { task, workOrderIdNoBraces, woIndex: wIdx, taskIndex: tIdx, totalQuestionnairesInWo } = item;
                    const taskId = (task.msdyn_workorderservicetaskid || "unknown").replace(/[{}]/g, "");
                    const taskName = (task.msdyn_name || "").toString().trim() || "Unknown";
                    const filename = `WO_${workOrderIdNoBraces}_SURVEY_${taskId}.pdf`;
                    return renderSingleSurvey({
                        renderWindow: renderWindows[slotIndex],
                        taskId,
                        taskName,
                        def: task.ovs_questionnairedefinition,
                        resp: task.ovs_questionnaireresponse,
                        locale,
                        includeHiddenQuestions,
                        filename,
                        onProgress: (stage) => {
                            updateProgress(
                                STAGE1_PREFIX,
                                formatStage1DetailWithWoFirst(wIdx, totalExports, tIdx, totalQuestionnairesInWo, doneUnits, totalSurveyPdfs, stage)
                            );
                        }
                    });
                });

                const results = await Promise.all(renderPromises);

                // Process each result in the chunk
                for (let r = 0; r < results.length; r++) {
                    const result = results[r];
                    const item = chunk[r];
                    const { task, workOrderIdNoBraces, workOrderLabel, woIndex: wIdx, taskIndex: tIdx, totalQuestionnairesInWo } = item;
                    const taskId = (task.msdyn_workorderservicetaskid || "unknown").replace(/[{}]/g, "");
                    const taskName = (task.msdyn_name || "").toString().trim() || "Unknown";
                    const taskLabel = `${taskId} (${taskName})`;

                    if (result.status === "skipped") {
                        if (result.reason === "empty-def") {
                            nonBlockingSkips.push(`Work Order: ${workOrderLabel}\nWork Order Service Task: ${taskLabel}\n${result.skipMessage}`);
                            skippedEmptyCount++;
                        } else if (result.reason === "invalid-def") {
                            nonBlockingSkips.push(`Work Order: ${workOrderLabel}\nWork Order Service Task: ${taskLabel}\n${result.skipMessage}`);
                            skippedInvalidDefinitionCount++;
                        }
                        doneUnits++;
                        onWoStage1Complete(workOrderIdNoBraces);
                        updateProgress(
                            STAGE1_PREFIX,
                            formatStage1DetailWithWoFirst(wIdx, totalExports, tIdx, totalQuestionnairesInWo, doneUnits, totalSurveyPdfs, "Skipped")
                        );
                        await writeProgress(formatQuestionnaireExportProgress(doneUnits, totalSurveyPdfs));

                    } else if (result.status === "error") {
                        stage1FailedSet.add(workOrderIdNoBraces);
                        notifyIncludedWorkOrdersStage1Failed(Array.from(stage1FailedSet));
                        const userGuidance = "Please try again. If this keeps failing, retry the export without this Work Order/Service Task.";
                        errors.push(
                            `Work Order: ${workOrderLabel}\n` +
                            `Work Order Service Task: ${taskLabel}\n` +
                            `Error: ${result.error}\n` +
                            `${userGuidance}`
                        );
                        console.error(`[WOExport][TaskError] wo=${workOrderIdNoBraces} task=${taskId} msg=${result.error}`);
                        updateProgress(
                            STAGE1_PREFIX,
                            formatStage1DetailWithWoFirst(wIdx, totalExports, tIdx, totalQuestionnairesInWo, doneUnits, totalSurveyPdfs, "Error")
                        );

                    } else if (result.status === "ok") {
                        // Pipeline: fire upload in the background — don't await here so the next chunk can start rendering.
                        const capturedFilename = result.filename;
                        const uploadPromise = uploadSurveyBlob(result.blob, capturedFilename, jobId)
                            .then(() => onWoStage1Complete(workOrderIdNoBraces))
                            .catch((uploadErr: any) => {
                                stage1FailedSet.add(workOrderIdNoBraces);
                                notifyIncludedWorkOrdersStage1Failed(Array.from(stage1FailedSet));
                                const userGuidance = "Please try again. If this keeps failing, retry the export without this Work Order/Service Task.";
                                errors.push(
                                    `Work Order: ${workOrderLabel}\n` +
                                    `Work Order Service Task: ${taskLabel}\n` +
                                    `Error (upload): ${uploadErr?.message || uploadErr}\n` +
                                    `${userGuidance}`
                                );
                                console.error(`[WOExport][UploadError] task=${taskId} msg=${uploadErr?.message || uploadErr}`);
                            });
                        pendingUploadPromises.push(uploadPromise);
                        doneUnits++;
                        updateProgress(
                            STAGE1_PREFIX,
                            formatStage1DetailWithWoFirst(wIdx, totalExports, tIdx, totalQuestionnairesInWo, doneUnits, totalSurveyPdfs, "Uploading")
                        );
                        await writeProgress(formatQuestionnaireExportProgress(doneUnits, totalSurveyPdfs));
                    }
                }

                // Clear all render windows after the chunk is processed
                for (const rw of renderWindows) {
                    rw.jQuery?.("#surveyElement")?.empty?.();
                }
            }

            // Wait for any remaining pipelined uploads to complete before moving to completion
            if (pendingUploadPromises.length > 0) {
                updateProgress(formatSurveyOverall(doneUnits, totalSurveyPdfs), "Finishing uploads...");
                await Promise.all(pendingUploadPromises);
                pendingUploadPromises = [];
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
                updateErrorMessageVisibility(formContext);
                clearProgressNotification(formContext);
                setLeavePageGuard(false);
                stopStallWatchdog();
                closeCriticalProgressIndicator();
                clearJobLocalState(jobId);
                await formContext.data.save();
                Xrm.Navigation.openAlertDialog({ text: `Export completed with ${errors.length} error(s). Check error message field for details.` });
            } else {
                const completionMsg = formatQuestionnaireExportProgress(doneUnits, totalSurveyPdfs, true);
                const skipBreakdown = formatSkipBreakdown(
                    skippedEmptyCount,
                    skippedInvalidDefinitionCount,
                    skippedNoQuestionnaireCount,
                    errors.length
                );
                const completionWithSkips = nonBlockingSkips.length > 0
                    ? `${completionMsg} | Skipped: ${nonBlockingSkips.length}${skipBreakdown}`
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
                updateErrorMessageVisibility(formContext);
                setLeavePageGuard(false);
                clearJobLocalState(jobId);

                await formContext.data.save();
                if (jobId) {
                    startProgressPoller(formContext, jobId);
                }
            }

        } catch (e: any) {
            console.error("[WOExport] ERROR: ", e);
            stopStallWatchdog();
            clearProgressNotification(formContext);
            setLeavePageGuard(false);
            closeCriticalProgressIndicator();
            clearJobLocalState(jobId);

            formContext.getAttribute("statuscode").setValue(STATUS_ERROR);
            const errorMsgAttr = formContext.getAttribute("ts_errormessage");
            if (errorMsgAttr) {
                errorMsgAttr.setValue(getErrorText(e));
            }
            updateErrorMessageVisibility(formContext);
            let saveErrText = "";
            try {
                await formContext.data.save();
            } catch (saveErr: any) {
                saveErrText = getErrorText(saveErr);
            }

            const baseError = getErrorText(e);
            const finalError = saveErrText
                ? `Error processing export job: ${baseError}\n\nSave failed while setting error state: ${saveErrText}`
                : `Error processing export job: ${baseError}`;
            Xrm.Navigation.openAlertDialog({ text: finalError });
        }
    }
}
