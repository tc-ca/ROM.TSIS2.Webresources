

namespace ROM.WorkOrderExportJob {
    declare function getModelDrivenAppBaseUrl(): Promise<string | null>;

    const STATUS_CLIENT_PROCESSING = 741130001;
    const STATUS_COMPLETED         = 741130006;
    const STATUS_ERROR             = 741130007;

    /** Min interval between progress Web API writes */
    const PROGRESS_WRITE_THROTTLE_MS = 1500;
    let lastProgressWriteMs = 0;
    let cachedUrlContext: { appBaseUrl: string } | null = null;

    function formatResx(key: string, ...args: (string | number)[]): string {
        let template = getResx(key);
        for (let i = 0; i < args.length; i++) {
            template = template.split(`{${i}}`).join(String(args[i]));
        }
        return template;
    }

    function getProgressTextStarting(totalUnits: number): string {
        const text = formatResx("ExportProgressStarting", totalUnits);
        return text === "ExportProgressStarting"
            ? `Starting export (${totalUnits} work order(s))...`
            : text;
    }

    function getProgressTextGeneratingPdf(currentIndex: number, totalUnits: number): string {
        const text = formatResx("ExportProgressGeneratingPdf", currentIndex, totalUnits);
        return text === "ExportProgressGeneratingPdf"
            ? `Generating PDF for work order ${currentIndex} of ${totalUnits}...`
            : text;
    }

    function getProgressTextCompressing(): string {
        const text = getResx("ExportProgressCompressing");
        return text === "ExportProgressCompressing"
            ? "Compressing ZIP..."
            : text;
    }

    function getRowProgressStorageKey(jobId: string): string {
        const cleanJobId = (jobId || "").replace(/[{}]/g, "").toLowerCase();
        return `wo-export-progress:${cleanJobId}`;
    }

    function resetRowProgress(jobId: string): void {
        try {
            window.localStorage.setItem(getRowProgressStorageKey(jobId), JSON.stringify({
                completedIds: [],
                failedIds: [],
                currentProcessingId: null
            }));
        } catch {
        }
    }

    function setCurrentRowProgress(jobId: string, workOrderId: string | null): void {
        try {
            const key = getRowProgressStorageKey(jobId);
            const existingRaw = window.localStorage.getItem(key);
            const existing = existingRaw ? JSON.parse(existingRaw) : {};
            const completedIds = Array.isArray(existing.completedIds) ? existing.completedIds.slice(0) : [];
            const failedIds = Array.isArray(existing.failedIds) ? existing.failedIds.slice(0) : [];
            const currentProcessingId = workOrderId ? workOrderId.replace(/[{}]/g, "").toLowerCase() : null;
            window.localStorage.setItem(key, JSON.stringify({ completedIds, failedIds, currentProcessingId }));
        } catch {
        }
    }

    function updateRowProgress(jobId: string, field: "completedIds" | "failedIds", workOrderId: string): void {
        try {
            const key = getRowProgressStorageKey(jobId);
            const existingRaw = window.localStorage.getItem(key);
            const existing = existingRaw ? JSON.parse(existingRaw) : {};
            const completedIds = Array.isArray(existing.completedIds) ? existing.completedIds.slice(0) : [];
            const failedIds = Array.isArray(existing.failedIds) ? existing.failedIds.slice(0) : [];
            const currentProcessingId = typeof existing.currentProcessingId === "string" ? existing.currentProcessingId : null;
            const cleanId = workOrderId.replace(/[{}]/g, "").toLowerCase();
            const target = field === "completedIds" ? completedIds : failedIds;
            if (target.indexOf(cleanId) === -1) {
                target.push(cleanId);
            }
            window.localStorage.setItem(key, JSON.stringify({ completedIds, failedIds, currentProcessingId }));
        } catch {
        }
    }

    /** D365 form registration: keep this signature. */
    export async function onLoad(eContext: Xrm.ExecutionContext<any, any>): Promise<void> {
        const formCtx = eContext.getFormContext() as any;
        const jobId: string = formCtx.data.entity.getId().replace(/[{}]/g, "");
        const status: number = formCtx.getAttribute("statuscode")?.getValue() ?? -1;

        if (status !== STATUS_CLIENT_PROCESSING) {
            return;
        }

        try {
            await runExport(jobId, formCtx);
        } catch (err: any) {
            await failJob(jobId, formCtx, err?.message ?? String(err));
        }
    }

    // Export pipeline
    async function runExport(
        jobId: string,
        formCtx: any
    ): Promise<void> {
        const payloadRaw: string = formCtx.getAttribute("ts_surveypayloadjson")?.getValue() ?? "{}";
        const payload = JSON.parse(payloadRaw) as { ids?: string[]; includeHiddenQuestions?: boolean };
        const workOrderIds: string[] = payload.ids ?? [];
        const includeHiddenQuestions = !!payload.includeHiddenQuestions;
        const totalUnits = workOrderIds.length;

        if (totalUnits === 0) {
            throw new Error("No work order IDs found in ts_surveypayloadjson.");
        }

        resetRowProgress(jobId);
        Xrm.Utility.showProgressIndicator(getProgressTextStarting(totalUnits));
        try {
        await writeProgress(jobId, 0, totalUnits, `Starting export of ${totalUnits} work order(s)…`, true);
        formCtx.ui.setFormNotification(getProgressTextStarting(totalUnits), "INFO", "export-progress");

        const renderWindow = await bootstrapRenderHost(formCtx);

        const JSZip = (renderWindow as any).JSZip;
        if (!JSZip) {
            throw new Error("JSZip is not available in the render host. Add jszip.min.js to SurveyRenderExport.html.");
        }
        const zip = new JSZip();

        for (let i = 0; i < workOrderIds.length; i++) {
            const woId = workOrderIds[i];
            setCurrentRowProgress(jobId, woId);
            Xrm.Utility.showProgressIndicator(getProgressTextGeneratingPdf(i + 1, totalUnits));
            await writeProgress(jobId, i, totalUnits, `Generating PDF for work order ${i + 1} of ${totalUnits}...`);

            let pdfBlob: Blob;
            try {
                pdfBlob = await generateWorkOrderPdf(woId, renderWindow, formCtx, includeHiddenQuestions);
            } catch (err) {
                setCurrentRowProgress(jobId, null);
                updateRowProgress(jobId, "failedIds", woId);
                throw err;
            }
            const woNumber = await getWorkOrderNumber(woId);
            zip.file(`${woNumber}.pdf`, pdfBlob);
            updateRowProgress(jobId, "completedIds", woId);
            setCurrentRowProgress(jobId, null);
        }

        setCurrentRowProgress(jobId, null);
        Xrm.Utility.showProgressIndicator(getProgressTextCompressing());
        await writeProgress(jobId, totalUnits, totalUnits, "Compressing…", true);

        const zipBlob: Blob = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });

        const now = new Date();
        const pad = (n: number) => String(n).padStart(2, "0");
        const zipFileName = `WorkOrder-Export-${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}.zip`;
        await uploadFileColumn(jobId, "ts_finalexportzip", zipBlob, zipFileName);

        const verifyRecord = await Xrm.WebApi.retrieveRecord("ts_workorderexportjob", jobId, "?$select=ts_finalexportzip_name");
        if (!verifyRecord["ts_finalexportzip_name"]) {
            throw new Error("File column upload appeared to succeed but ts_finalexportzip_name is not populated.");
        }

        await Xrm.WebApi.updateRecord("ts_workorderexportjob", jobId, {
            statuscode: STATUS_COMPLETED,
            ts_progressmessage: getResx("ExportCompleteMessage"),
            ts_lastheartbeat: new Date().toISOString()
        });

        formCtx.ui.clearFormNotification("export-progress");
        formCtx.ui.setFormNotification(getResx("ExportCompletedZipReady"), "INFO", "export-complete");
        try { await formCtx.data.refresh(false); } catch { }

        const clientUrl = Xrm.Utility.getGlobalContext().getClientUrl();
        const downloadUrl = `${clientUrl}/api/data/v9.2/ts_workorderexportjobs(${jobId})/ts_finalexportzip/$value`;

        window.setTimeout(async () => {
            const userChoice = await Xrm.Navigation.openConfirmDialog({
                title: getResx("ExportCompletedDownloadPromptTitle"),
                text: getResx("ExportCompletedDownloadPromptText"),
                confirmButtonLabel: getResx("DownloadZIP"),
                cancelButtonLabel: getResx("Later")
            });
            if (userChoice?.confirmed) {
                window.open(downloadUrl, "_blank");
            }
        }, 2000);
        } finally {
            Xrm.Utility.closeProgressIndicator();
        }
    }

    // Per work order PDF
    async function generateWorkOrderPdf(
        woId: string,
        renderWindow: Window,
        _formCtx: any,
        includeHiddenQuestions: boolean
    ): Promise<Blob> {
        const [wo, tasks] = await Promise.all([
            fetchWorkOrderSummary(woId),
            fetchServiceTasks(woId)
        ]);

        const caseId: string | null = wo["_msdyn_servicerequest_value"] ?? null;
        const [findings, actions, activities, annotations, contacts, woDocs, inspectionDocs] = await Promise.all([
            caseId ? fetchFindings(caseId) : Promise.resolve([]),
            caseId ? fetchActions(caseId) : Promise.resolve([]),
            fetchActivities(woId),
            fetchAnnotations(woId),
            fetchContacts(woId),
            fetchWorkOrderDocuments(woId),
            fetchInspectionDocuments(woId)
        ]);

        const interactions = mergeInteractions(activities, annotations);

        const taskDocMap: Record<string, any[]> = {};
        await Promise.all(tasks.map(async (t: any) => {
            taskDocMap[t.msdyn_workorderservicetaskid] = await fetchServiceTaskDocuments(t.msdyn_workorderservicetaskid);
        }));

        const urlContext = await getUrlContextCached();
        const html = buildDocumentHtml(wo, tasks, findings, actions, interactions, contacts, woDocs, inspectionDocs, taskDocMap, urlContext);

        // html2canvas: default body margin is 8px and shifts capture left; zero margin/padding for x=0 alignment.
        const renderBody = renderWindow.document.body as HTMLBodyElement;
        renderBody.style.margin = "0";
        renderBody.style.padding = "0";
        const printHost = renderWindow.document.getElementById("surveyElementPrint") as HTMLElement | null;
        const screenHost = renderWindow.document.getElementById("surveyElement") as HTMLElement | null;
        if (printHost) {
            printHost.innerHTML = "";
        }
        if (screenHost) {
            screenHost.innerHTML = "";
            screenHost.style.display = "none";
        }
        const existingPreview = renderWindow.document.getElementById("ts-export-preview");
        if (existingPreview) {
            existingPreview.remove();
        }

        const pdfContainer = (renderWindow.document as Document).createElement("div");
        pdfContainer.id = "ts-export-preview";
        pdfContainer.style.display = "block";
        pdfContainer.style.width = "7.35in";
        pdfContainer.style.maxWidth = "7.35in";
        pdfContainer.style.margin = "0 auto";
        pdfContainer.style.boxSizing = "border-box";
        pdfContainer.style.background = "#fff";
        pdfContainer.innerHTML = html;
        (printHost || renderBody).appendChild(pdfContainer);

        for (const task of tasks) {
            if (task.ovs_questionnairedefinition && task.ovs_questionnaireresponse) {
                await renderQuestionnaire(
                    renderWindow,
                    task,
                    pdfContainer,
                    `survey-${task.msdyn_workorderservicetaskid}`,
                    includeHiddenQuestions
                );
            }
        }

        const woNumber = fmtVal(wo, "msdyn_name") || woId;
        const pdfOptions = {
            margin: 0.5,
            filename: `${woNumber}.pdf`,
            image: { type: "png", quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true, scrollX: 0, scrollY: 0 },
            jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
            pagebreak: {
                mode: ["css", "legacy"],
                avoid: [".sv_q", ".sv_row", ".sv_panel", ".form-group", ".printed-textarea", ".ts-survey-pdf-header", ".wo-section-table tr"]
            }
        };
        logExportLayoutDiagnostics(pdfContainer, woId, woNumber, renderWindow, pdfOptions);

        const blob: Blob = await (renderWindow as any).html2pdf().from(pdfContainer).set(pdfOptions).output("blob");
        return blob;
    }

    function buildDocumentHtml(
        wo: any,
        tasks: any[],
        findings: any[],
        actions: any[],
        interactions: any[],
        contacts: any[],
        woDocs: any[],
        inspectionDocs: any[],
        taskDocMap: Record<string, any[]>,
        urlContext: { appBaseUrl: string } | null
    ): string {
        const woNumber = fmtVal(wo, "msdyn_name") || "—";
        const woDate = wo["createdon"] ? wo["createdon"].split("T")[0] : "—";
        const region = fmtVal(wo, "_ts_region_value") || "—";
        const opType = fmtVal(wo, "_ovs_operationtypeid_value") || "—";
        const stakeholder = fmtVal(wo, "_msdyn_serviceaccount_value") || "—";
        const site = fmtVal(wo, "_ts_site_value") || "—";
        const workLocation = fmtVal(wo, "msdyn_worklocation") || "—";
        const description = wo["msdyn_primaryincidentdescription"] || "—";
        const businessOwner = wo["ts_businessowner"] || "—";
        const ownerDisplay = fmtVal(wo, "_ownerid_value") || "—";
        const ownerEntity =
            (wo["_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname"] as string | undefined) || "";
        const workOrderUrl = buildRecordUrl(urlContext, "msdyn_workorder", wo["msdyn_workorderid"]);
        const opTypeUrl = buildRecordUrl(urlContext, "ovs_operationtype", wo["_ovs_operationtypeid_value"]);
        const stakeholderUrl = buildRecordUrl(urlContext, "account", wo["_msdyn_serviceaccount_value"]);
        const siteUrl = buildRecordUrl(urlContext, "msdyn_functionallocation", wo["_ts_site_value"]);
        const ownerUrl =
            ownerEntity && wo["_ownerid_value"]
                ? buildRecordUrl(urlContext, ownerEntity, wo["_ownerid_value"] as string)
                : null;

        const styles = `
<style>
body { font-family: "Segoe UI", SegoeUI, system-ui, -apple-system, sans-serif; font-size: 10pt; color: #1a1a1a; margin: 0; }
.wo-title { font-size: 18pt; font-weight: bold; margin-bottom: 16px; border-bottom: 2px solid #005a9e; padding-bottom: 8px; }
.wo-section { margin-bottom: 20px; break-inside: avoid; page-break-inside: avoid; }
.wo-section-header { font-weight: 600; text-transform: uppercase; font-size: 9pt; letter-spacing: 0.05em; background: #f0f4f8; padding: 4px 8px; border-left: 3px solid #005a9e; margin-bottom: 8px; break-after: avoid-page; page-break-after: avoid; }
.wo-info-table { width: 100%; border-collapse: collapse; }
.wo-info-table td { padding: 3px 6px; vertical-align: top; }
.wo-info-table td:first-child { font-weight: 600; width: 35%; color: #555; }
.wo-section-table { width: 100%; border-collapse: collapse; font-size: 9pt; break-before: avoid-page; page-break-before: avoid; }
.wo-section-table th { background: #e8eef4; padding: 4px 6px; text-align: left; font-weight: 600; border: 1px solid #ccc; }
.wo-section-table td { padding: 4px 6px; border: 1px solid #ddd; vertical-align: top; page-break-inside: avoid; }
.wo-empty { color: #888; font-style: italic; font-size: 9pt; padding: 4px 0; break-before: avoid-page; page-break-before: avoid; }
.wo-task-block { border: 1px solid #ccc; border-radius: 4px; margin-bottom: 16px; page-break-before: always; }
.wo-task-header { background: #e8eef4; padding: 6px 10px; font-weight: 600; }
.wo-task-header .wo-link { font-size: 12pt; }
.wo-subsection.wo-service-tasks-without-docs .wo-section-table td:first-child .wo-link { font-size: 9pt; }
.wo-task-meta { padding: 4px 10px; font-size: 9pt; color: #444; }
.wo-task-body { padding: 0 10px 10px 10px; }
.wo-link { color: #005a9e; text-decoration: underline; }
.wo-plain-list { margin: 8px 0 0 18px; padding: 0; }
.wo-plain-list li { margin: 2px 0; }
.wo-subsection { margin: 10px 0 14px 0; padding: 8px 10px 10px 14px; border-left: 3px solid #94a3b8; background: #fafbfc; border-radius: 0 4px 4px 0; break-inside: avoid; page-break-inside: avoid; }
.wo-subsection-header { font-weight: 600; font-size: 8.5pt; letter-spacing: 0.03em; color: #475569; text-transform: none; padding: 0 0 6px 0; margin: 0 0 6px 0; border-bottom: 1px dashed #cbd5e1; }
.wo-subsection .wo-section-table { font-size: 8.5pt; }
.wo-subsection .wo-section-table th { background: #eef2f6; color: #334155; }
.wo-subsection .wo-section-table td { border-color: #e2e8f0; }
.wo-service-tasks-body { margin-top: 4px; }
</style>`;

        const infoSection = `
<div class="wo-section">
    <div class="wo-section-header">Work Order Information</div>
    <table class="wo-info-table">
        <tr><td>Work Order Number</td><td>${linkOrText(woNumber, workOrderUrl)}</td></tr>
        <tr><td>Date</td><td>${esc(woDate)}</td></tr>
        <tr><td>Region</td><td>${esc(region)}</td></tr>
        <tr><td>Operation Type</td><td>${linkOrText(opType, opTypeUrl)}</td></tr>
        <tr><td>Stakeholder</td><td>${linkOrText(stakeholder, stakeholderUrl)}</td></tr>
        <tr><td>Site</td><td>${linkOrText(site, siteUrl)}</td></tr>
        <tr><td>Work Location</td><td>${esc(workLocation)}</td></tr>
        <tr><td>Description</td><td>${esc(description)}</td></tr>
        <tr><td>Business Owner</td><td>${esc(businessOwner)}</td></tr>
        <tr><td>Owner</td><td>${linkOrText(ownerDisplay, ownerUrl)}</td></tr>
    </table>
</div>`;

        const findingsSection = `
<div class="wo-section">
    <div class="wo-section-header">Findings</div>
    ${findings.length === 0
        ? `<div class="wo-empty">No Findings</div>`
        : `<table class="wo-section-table">
            <thead><tr><th>Description</th><th>Type</th><th>Status</th><th>Enforcement</th><th>Sensitivity</th></tr></thead>
            <tbody>${findings.map(f => `<tr>
                <td>${linkOrText(f["ovs_finding"] || "", buildRecordUrl(urlContext, "ovs_finding", f["ovs_findingid"]))}</td>
                <td>${esc(fmtVal(f, "ts_findingtype") || "")}</td>
                <td>${esc(fmtVal(f, "statuscode") || "")}</td>
                <td>${esc(fmtVal(f, "ts_finalenforcementaction") || "")}</td>
                <td>${esc(fmtVal(f, "ts_sensitivitylevel") || "")}</td>
            </tr>`).join("")}</tbody>
        </table>`}
</div>`;

        const actionsSection = `
<div class="wo-section">
    <div class="wo-section-header">Actions</div>
    ${actions.length === 0
        ? `<div class="wo-empty">No Actions</div>`
        : `<table class="wo-section-table">
            <thead><tr><th>Name</th><th>Category</th><th>Type</th></tr></thead>
            <tbody>${actions.map(a => `<tr>
                <td>${linkOrText(a["ts_name"] || "", buildRecordUrl(urlContext, "ts_action", a["ts_actionid"]))}</td>
                <td>${esc(fmtVal(a, "ts_actioncategory") || "")}</td>
                <td>${esc(fmtVal(a, "ts_actiontype") || "")}</td>
            </tr>`).join("")}</tbody>
        </table>`}
</div>`;

        const interactionsSection = `
<div class="wo-section">
    <div class="wo-section-header">Interactions</div>
    ${interactions.length === 0
        ? `<div class="wo-empty">No Interactions</div>`
        : `<table class="wo-section-table">
            <thead><tr><th>Subject</th><th>Type</th><th>Date</th><th>Description</th></tr></thead>
            <tbody>${interactions.map(i => `<tr>
                <td>${esc(i.subject)}</td>
                <td>${esc(i.type)}</td>
                <td>${esc(i.date)}</td>
                <td>${esc(i.description)}</td>
            </tr>`).join("")}</tbody>
        </table>`}
</div>`;

        const contactsSection = `
<div class="wo-section">
    <div class="wo-section-header">Contacts</div>
    ${contacts.length === 0
        ? `<div class="wo-empty">No Contacts</div>`
        : `<table class="wo-section-table">
            <thead><tr><th>Name</th><th>Job Title</th><th>Email</th><th>Phone</th></tr></thead>
            <tbody>${contacts.map(c => `<tr>
                <td>${linkOrText(c["fullname"] || "", buildRecordUrl(urlContext, "contact", c["contactid"]))}</td>
                <td>${esc(c["jobtitle"] || "")}</td>
                <td>${mailtoOrText(c["emailaddress1"] || "")}</td>
                <td>${telOrText(c["telephone1"] || "")}</td>
            </tr>`).join("")}</tbody>
        </table>`}
</div>`;

        const woDocsSection = `
<div class="wo-section">
    <div class="wo-section-header">Work Order Documents</div>
    ${woDocs.length === 0
        ? `<div class="wo-empty">No Work Order Documents</div>`
        : `<table class="wo-section-table">
            <thead><tr><th>Name</th><th>Category</th><th>Context</th><th>Link</th></tr></thead>
            <tbody>${woDocs.map(d => `<tr>
                <td>${linkOrText(d["ts_file"] || "", buildRecordUrl(urlContext, "ts_file", d["ts_fileid"]))}</td>
                <td>${esc(fmtVal(d, "ts_filecategory") || "")}</td>
                <td>${esc(fmtVal(d, "ts_filecontext") || "")}</td>
                <td>${esc(d["ts_sharepointlink"] || "")}</td>
            </tr>`).join("")}</tbody>
        </table>`}
</div>`;

        const inspectionDocsSection = `
<div class="wo-section">
    <div class="wo-section-header">Inspection Documents</div>
    ${inspectionDocs.length === 0
        ? `<div class="wo-empty">No Inspection Documents</div>`
        : `<table class="wo-section-table">
            <thead><tr><th>Name</th><th>Category</th><th>Context</th><th>Link</th></tr></thead>
            <tbody>${inspectionDocs.map(d => `<tr>
                <td>${linkOrText(d["ts_file"] || "", buildRecordUrl(urlContext, "ts_file", d["ts_fileid"]))}</td>
                <td>${esc(fmtVal(d, "ts_filecategory") || "")}</td>
                <td>${esc(fmtVal(d, "ts_filecontext") || "")}</td>
                <td>${esc(d["ts_sharepointlink"] || "")}</td>
            </tr>`).join("")}</tbody>
        </table>`}
</div>`;

        const tasksWithoutDocs = tasks.filter((t: any) => (taskDocMap[t.msdyn_workorderservicetaskid] ?? []).length === 0);
        const tasksWithDetailedContent = tasks.filter((t: any) => {
            const taskDocs = taskDocMap[t.msdyn_workorderservicetaskid] ?? [];
            return taskDocs.length > 0 || !!(t.ovs_questionnairedefinition && t.ovs_questionnaireresponse);
        });
        const tasksWithoutDocsSection = tasksWithoutDocs.length === 0
            ? ""
            : `<div class="wo-subsection wo-service-tasks-without-docs">
    <div class="wo-subsection-header">Service Tasks Without Task Documents</div>
    <table class="wo-section-table">
        <thead><tr><th>Service Task</th><th>Status</th><th>Inspection Result</th></tr></thead>
        <tbody>${tasksWithoutDocs.map((t: any) => `<tr>
            <td>${linkOrText(t["msdyn_name"] || "Service Task", buildRecordUrl(urlContext, "msdyn_workorderservicetask", t["msdyn_workorderservicetaskid"]))}</td>
            <td>${esc(fmtVal(t, "statuscode") || "—")}</td>
            <td>${esc(fmtVal(t, "msdyn_inspectiontaskresult") || "—")}</td>
        </tr>`).join("")}</tbody>
    </table>
</div>`;

        const serviceTasksSection = tasksWithDetailedContent.length === 0
            ? `<div class="wo-empty">No Service Tasks</div>`
            : tasksWithDetailedContent.map((t: any) => {
                const taskDocs = taskDocMap[t.msdyn_workorderservicetaskid] ?? [];
                const taskDocsHtml = taskDocs.length === 0
                    ? ""
                    : `<div class="wo-section-header" style="margin-top:8px;">Task Documents</div>
                    <table class="wo-section-table">
                        <thead><tr><th>Name</th><th>Category</th><th>Context</th><th>Link</th></tr></thead>
                        <tbody>${taskDocs.map((d: any) => `<tr>
                            <td>${linkOrText(d["ts_file"] || "", buildRecordUrl(urlContext, "ts_file", d["ts_fileid"]))}</td>
                            <td>${esc(fmtVal(d, "ts_filecategory") || "")}</td>
                            <td>${esc(fmtVal(d, "ts_filecontext") || "")}</td>
                            <td>${esc(d["ts_sharepointlink"] || "")}</td>
                        </tr>`).join("")}</tbody>
                    </table>`;
                return `
<div class="wo-task-block">
    <div class="wo-task-header">${linkOrText(t["msdyn_name"] || "Service Task", buildRecordUrl(urlContext, "msdyn_workorderservicetask", t["msdyn_workorderservicetaskid"]))}</div>
    <div class="wo-task-meta">
        Status: ${esc(fmtVal(t, "statuscode") || "—")} &nbsp;|&nbsp;
        Inspection Result: ${esc(fmtVal(t, "msdyn_inspectiontaskresult") || "—")}
    </div>
    <div class="wo-task-body">
        ${taskDocsHtml}
        ${t.ovs_questionnairedefinition
            ? `<div id="survey-${t.msdyn_workorderservicetaskid}"></div>`
            : `<div class="wo-empty" style="margin-top:8px;">No questionnaire</div>`}
    </div>
</div>`;
            }).join("");

        return `${styles}
<div class="wo-title">${linkOrText(woNumber, workOrderUrl)}</div>
${infoSection}
${findingsSection}
${actionsSection}
${interactionsSection}
${contactsSection}
${woDocsSection}
${inspectionDocsSection}
<div class="wo-section"><div class="wo-section-header">Service Tasks</div><div class="wo-service-tasks-body">${tasksWithoutDocsSection}${serviceTasksSection}</div></div>`;
    }

    // Data fetchers
    async function fetchWorkOrderSummary(woId: string): Promise<any> {
        const select = [
            "msdyn_name", "msdyn_workorderid", "createdon",
            "msdyn_primaryincidentdescription", "ts_businessowner", "msdyn_worklocation",
            "_ts_region_value", "_ovs_operationtypeid_value",
            "_msdyn_serviceaccount_value", "_ts_site_value", "_msdyn_servicerequest_value",
            "_ownerid_value"
        ].join(",");
        return Xrm.WebApi.retrieveRecord("msdyn_workorder", woId, `?$select=${select}`);
    }

    async function getWorkOrderNumber(woId: string): Promise<string> {
        const r = await Xrm.WebApi.retrieveRecord("msdyn_workorder", woId, "?$select=msdyn_name");
        return r["msdyn_name"] || woId;
    }

    async function fetchServiceTasks(woId: string): Promise<any[]> {
        const r = await Xrm.WebApi.retrieveMultipleRecords(
            "msdyn_workorderservicetask",
            `?$filter=_msdyn_workorder_value eq '${woId}'` +
            `&$select=msdyn_workorderservicetaskid,msdyn_name,statuscode,msdyn_inspectiontaskresult,ovs_questionnairedefinition,ovs_questionnaireresponse` +
            `&$orderby=createdon asc`
        );
        return r.entities;
    }

    async function fetchFindings(caseId: string): Promise<any[]> {
        const r = await Xrm.WebApi.retrieveMultipleRecords(
            "ovs_finding",
            `?$filter=_ovs_caseid_value eq '${caseId}' and statecode eq 0` +
            `&$select=ovs_findingid,ovs_finding,ts_findingtype,statuscode,ts_finalenforcementaction,ts_sensitivitylevel`
        );
        return r.entities;
    }

    async function fetchActions(caseId: string): Promise<any[]> {
        const r = await Xrm.WebApi.retrieveMultipleRecords(
            "ts_action",
            `?$filter=_ts_case_value eq '${caseId}' and statecode eq 0` +
            `&$select=ts_actionid,ts_name,ts_actioncategory,ts_actiontype` +
            `&$orderby=createdon asc`
        );
        return r.entities;
    }

    async function fetchActivities(woId: string): Promise<any[]> {
        const r = await Xrm.WebApi.retrieveMultipleRecords(
            "activitypointer",
            `?$filter=_regardingobjectid_value eq '${woId}'` +
            ` and (activitytypecode eq 'appointment' or activitytypecode eq 'email' or activitytypecode eq 'phonecall' or activitytypecode eq 'task')` +
            `&$select=subject,activitytypecode,description,createdon` +
            `&$orderby=createdon desc`
        );
        return r.entities;
    }

    async function fetchAnnotations(woId: string): Promise<any[]> {
        const r = await Xrm.WebApi.retrieveMultipleRecords(
            "annotation",
            `?$filter=_objectid_value eq '${woId}'` +
            `&$select=subject,notetext,filename,isdocument,createdon` +
            `&$orderby=createdon desc`
        );
        return r.entities;
    }

    async function fetchContacts(woId: string): Promise<any[]> {
        try {
            const r = await Xrm.WebApi.retrieveMultipleRecords(
                "contact",
                `?$filter=ts_Contact_msdyn_workorder_msdyn_workorder/any(w: w/msdyn_workorderid eq '${woId}')` +
                `&$select=contactid,fullname,jobtitle,emailaddress1,telephone1`
            );
            return r.entities;
        } catch {
            try {
                const fetchXml =
                    `<fetch distinct="true">` +
                    `<entity name="contact">` +
                    `<attribute name="contactid" />` +
                    `<attribute name="fullname" />` +
                    `<attribute name="jobtitle" />` +
                    `<attribute name="emailaddress1" />` +
                    `<attribute name="telephone1" />` +
                    `<link-entity name="ts_contact_msdyn_workorder" intersect="true" visible="false" to="contactid" from="contactid">` +
                    `<link-entity name="msdyn_workorder" from="msdyn_workorderid" to="msdyn_workorderid" alias="wo">` +
                    `<filter><condition attribute="msdyn_workorderid" operator="eq" value="${woId}" /></filter>` +
                    `</link-entity>` +
                    `</link-entity>` +
                    `</entity>` +
                    `</fetch>`;
                const r = await Xrm.WebApi.retrieveMultipleRecords("contact", `?fetchXml=${encodeURIComponent(fetchXml)}`);
                return r.entities;
            } catch {
                return [];
            }
        }
    }

    async function fetchWorkOrderDocuments(woId: string): Promise<any[]> {
        try {
            const r = await Xrm.WebApi.retrieveMultipleRecords(
                "ts_file",
                `?$filter=ts_Files_msdyn_workorders/any(w: w/msdyn_workorderid eq '${woId}')` +
                `&$select=ts_file,ts_filecategory,ts_filecontext,ts_sharepointlink,ts_fileid,createdon` +
                `&$orderby=ts_file asc`
            );
            return deduplicateDocs(r.entities);
        } catch {
            try {
                const fetchXml =
                    `<fetch distinct="true">` +
                    `<entity name="ts_file">` +
                    `<attribute name="ts_file" />` +
                    `<attribute name="ts_filecategory" />` +
                    `<attribute name="ts_filecontext" />` +
                    `<attribute name="ts_sharepointlink" />` +
                    `<attribute name="ts_fileid" />` +
                    `<attribute name="createdon" />` +
                    `<order attribute="ts_file" descending="false" />` +
                    `<link-entity name="ts_files_msdyn_workorders" intersect="true" visible="false" to="ts_fileid" from="ts_fileid">` +
                    `<link-entity name="msdyn_workorder" from="msdyn_workorderid" to="msdyn_workorderid" alias="wo">` +
                    `<filter><condition attribute="msdyn_workorderid" operator="eq" value="${woId}" /></filter>` +
                    `</link-entity>` +
                    `</link-entity>` +
                    `</entity>` +
                    `</fetch>`;
                const r = await Xrm.WebApi.retrieveMultipleRecords("ts_file", `?fetchXml=${encodeURIComponent(fetchXml)}`);
                return deduplicateDocs(r.entities);
            } catch {
                return [];
            }
        }
    }

    async function fetchInspectionDocuments(woId: string): Promise<any[]> {
        try {
            const r = await Xrm.WebApi.retrieveMultipleRecords(
                "ts_file",
                `?$filter=_ts_msdyn_workorder_value eq '${woId}'` +
                `&$select=ts_file,ts_filecategory,ts_filecontext,ts_sharepointlink,ts_fileid,createdon` +
                `&$orderby=ts_file asc`
            );
            return deduplicateDocs(r.entities);
        } catch {
            return [];
        }
    }

    async function fetchServiceTaskDocuments(taskId: string): Promise<any[]> {
        try {
            const r = await Xrm.WebApi.retrieveMultipleRecords(
                "ts_file",
                `?$filter=_ts_workorderservicetask_value eq '${taskId}'` +
                `&$select=ts_file,ts_filecategory,ts_filecontext,ts_sharepointlink,ts_fileid,createdon` +
                `&$orderby=ts_file asc`
            );
            return deduplicateDocs(r.entities);
        } catch {
            return [];
        }
    }

    function deduplicateDocs(docs: any[]): any[] {
        const seen = new Set<string>();
        return docs.filter(d => {
            const key = `${d["ts_file"] ?? ""}|${d["ts_sharepointlink"] ?? ""}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }

    // Interactions (activities + notes)
    function mergeInteractions(activities: any[], annotations: any[]): Array<{ subject: string; type: string; date: string; description: string }> {
        const result: Array<{ subject: string; type: string; date: string; createdon: string; description: string }> = [];
        for (const a of activities) {
            result.push({
                subject: a["subject"] || "—",
                type: fmtVal(a, "activitytypecode") || "Activity",
                date: fmtDate(a["createdon"]),
                createdon: a["createdon"] || "",
                description: sanitizeInteractionDescription(a["description"] || "")
            });
        }
        for (const n of annotations) {
            let subject = n["subject"] || "";
            if (!subject) subject = n["isdocument"] ? "Attachment" : "Note";
            let description = sanitizeInteractionDescription(n["notetext"] || "");
            if (!description && n["isdocument"]) description = `Attachment: ${n["filename"] || ""}`;
            result.push({ subject, type: "Note", date: fmtDate(n["createdon"]), createdon: n["createdon"] || "", description });
        }
        result.sort((a, b) => b.createdon.localeCompare(a.createdon));
        return result;
    }

    function sanitizeInteractionDescription(value: string): string {
        return (value || "")
            .replace(/<br\s*\/?>/gi, "\n")
            .replace(/<\/p>\s*<p>/gi, "\n")
            .replace(/<[^>]+>/g, "")
            .trim();
    }

    // Questionnaire rendering
    async function renderQuestionnaire(
        renderWindow: Window,
        task: any,
        pdfContainer: HTMLElement,
        targetId: string,
        includeHiddenQuestions: boolean
    ): Promise<void> {
        const Survey = (renderWindow as any).Survey;
        const $ = (renderWindow as any).jQuery;
        if (!Survey || !$) return;

        const targetEl = pdfContainer.querySelector(`#${targetId}`) as HTMLElement | null;
        if (!targetEl) return;

        let surveyDef: any;
        let surveyData: any;
        try {
            surveyDef = typeof task.ovs_questionnairedefinition === "string"
                ? JSON.parse(task.ovs_questionnairedefinition)
                : task.ovs_questionnairedefinition;
            surveyData = typeof task.ovs_questionnaireresponse === "string"
                ? JSON.parse(task.ovs_questionnaireresponse)
                : task.ovs_questionnaireresponse;
        } catch {
            targetEl.innerHTML = `<div class="wo-empty">Questionnaire data could not be parsed.</div>`;
            return;
        }

        if (includeHiddenQuestions) {
            clearVisibleIfRules(surveyDef);
        }

        const survey = new Survey.Model(surveyDef);
        survey.mode = "display";
        survey.data = surveyData ?? {};

        // Question titles/descriptions in this system contain HTML (e.g. <strong>, <p>).
        // SurveyJS escapes text by default, so we pass the raw text through as HTML.
        if (survey.onTextMarkdown) {
            survey.onTextMarkdown.add(function (_s: any, opts: any) {
                opts.html = opts.text;
            });
        }

        const styleEl = renderWindow.document.createElement("style");
        styleEl.textContent = `
.sv_nav, .sv_progress { display: none !important; }
.printed-textarea {
    margin-top: 6px;
    padding: 8px 10px;
    border: 1px solid #b8c4d0;
    border-left: 3px solid #005a9e;
    border-radius: 3px;
    background: #f8fafc;
    white-space: pre-wrap;
}
`;
        renderWindow.document.head.appendChild(styleEl);

        targetEl.id = `survey-render-${task.msdyn_workorderservicetaskid}`;
        $(targetEl).Survey({ model: survey });

        await waitForRender(renderWindow, targetEl, 10000);

        // html2pdf snapshots the DOM; inputs don't print reliably — flatten to text.
        simplifyRenderedSurvey(targetEl);
    }

    function clearVisibleIfRules(node: any): void {
        if (!node || typeof node !== "object") return;
        if (Object.prototype.hasOwnProperty.call(node, "visibleIf")) {
            node.visibleIf = null;
        }
        if (Array.isArray(node.pages)) {
            node.pages.forEach(clearVisibleIfRules);
        }
        if (Array.isArray(node.elements)) {
            node.elements.forEach(clearVisibleIfRules);
        }
        if (Array.isArray(node.rows)) {
            node.rows.forEach(clearVisibleIfRules);
        }
        if (Array.isArray(node.columns)) {
            node.columns.forEach(clearVisibleIfRules);
        }
        if (Array.isArray(node.choices)) {
            node.choices.forEach(clearVisibleIfRules);
        }
        if (Array.isArray(node.templateElements)) {
            node.templateElements.forEach(clearVisibleIfRules);
        }
    }

    function waitForRender(renderWindow: Window, el: HTMLElement, timeoutMs: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const start = Date.now();
            function check() {
                if (el.querySelector(".sv_q") || (Date.now() - start) >= timeoutMs) {
                    resolve();
                } else {
                    (renderWindow as any).setTimeout(check, 200);
                }
            }
            check();
        });
    }

    function simplifyRenderedSurvey(el: HTMLElement): void {
        const surveyDocument = el.ownerDocument || document;
        el.querySelectorAll(".character-count").forEach((node: Element) => node.remove());
        el.querySelectorAll("textarea").forEach((ta: HTMLTextAreaElement) => {
            const div = surveyDocument.createElement("div");
            div.className = "printed-textarea";
            div.textContent = ta.value;
            ta.parentNode?.replaceChild(div, ta);
        });
        el.querySelectorAll("input[type='radio']").forEach((r: Element) => {
            const inp = r as HTMLInputElement;
            const span = surveyDocument.createElement("span");
            span.textContent = inp.checked ? "● " : "○ ";
            r.parentNode?.insertBefore(span, r);
            r.parentNode?.removeChild(r);
        });
        el.querySelectorAll("input[type='checkbox']").forEach((c: Element) => {
            const inp = c as HTMLInputElement;
            const span = surveyDocument.createElement("span");
            span.textContent = inp.checked ? "☑ " : "☐ ";
            c.parentNode?.insertBefore(span, c);
            c.parentNode?.removeChild(c);
        });
        el.querySelectorAll("select").forEach((s: HTMLSelectElement) => {
            const span = surveyDocument.createElement("em");
            span.textContent = s.options[s.selectedIndex]?.text ?? "";
            s.parentNode?.replaceChild(span, s);
        });
    }

    // PDF layout diagnostics (console)
    function describeElementForLog(el: Element): string {
        const htmlEl = el as HTMLElement;
        const tag = (el.tagName || "").toLowerCase();
        const id = htmlEl.id ? `#${htmlEl.id}` : "";
        const className = typeof htmlEl.className === "string"
            ? htmlEl.className.trim().replace(/\s+/g, ".")
            : "";
        const classPart = className ? `.${className}` : "";
        return `${tag}${id}${classPart}`;
    }

    function logExportLayoutDiagnostics(pdfContainer: HTMLElement, woId: string, woNumber: string, renderWindow: Window, pdfOptions: any): void {
        const renderDocEl = renderWindow.document.documentElement;
        const renderBodyEl = renderWindow.document.body;
        const containerRect = pdfContainer.getBoundingClientRect();
        const overflowing: Array<Record<string, any>> = [];
        let widest: Record<string, any> | null = null;

        pdfContainer.querySelectorAll("*").forEach((el: Element) => {
            const htmlEl = el as HTMLElement;
            const clientWidth = htmlEl.clientWidth || 0;
            const scrollWidth = htmlEl.scrollWidth || 0;
            const offsetWidth = htmlEl.offsetWidth || 0;
            const rect = htmlEl.getBoundingClientRect();
            const relativeLeft = Math.round(rect.left - containerRect.left);
            const relativeRight = Math.round(rect.right - containerRect.left);
            const entry = {
                element: describeElementForLog(el),
                clientWidth,
                scrollWidth,
                offsetWidth,
                relativeLeft,
                relativeRight,
                textSample: (htmlEl.textContent || "").trim().slice(0, 120)
            };

            if (!widest || scrollWidth > (widest.scrollWidth || 0)) {
                widest = entry;
            }

            if (
                scrollWidth > pdfContainer.clientWidth + 2 ||
                relativeLeft < -2 ||
                relativeRight > pdfContainer.clientWidth + 2
            ) {
                overflowing.push(entry);
            }
        });

        console.info("[WOExport][PDFLayout]", {
            woId,
            woNumber,
            pdfContainerClientWidth: pdfContainer.clientWidth,
            pdfContainerScrollWidth: pdfContainer.scrollWidth,
            pdfContainerOffsetWidth: pdfContainer.offsetWidth,
            renderBodyClientWidth: renderBodyEl?.clientWidth ?? null,
            renderBodyScrollWidth: renderBodyEl?.scrollWidth ?? null,
            renderDocClientWidth: renderDocEl?.clientWidth ?? null,
            renderDocScrollWidth: renderDocEl?.scrollWidth ?? null,
            html2canvasWindowWidth: pdfOptions.html2canvas.windowWidth,
            marginInches: pdfOptions.margin,
            jsPdfFormat: pdfOptions.jsPDF.format,
            widestElement: widest,
            overflowCount: overflowing.length
        });

        if (overflowing.length > 0) {
            console.table(overflowing.slice(0, 25));
        }
    }

    // Render host iframe
    async function bootstrapRenderHost(formCtx: any): Promise<Window> {
        const control = formCtx.getControl("WebResource_RenderHost_1");
        if (!control) throw new Error("Render host control 'WebResource_RenderHost_1' not found on form.");

        const renderWindow = (control as any).getObject()?.contentWindow as Window | null;
        if (!renderWindow) throw new Error("Could not access contentWindow of render host.");

        // Web resource iframe loads Survey / html2pdf / jQuery asynchronously.
        await waitForCondition(() =>
            !!(renderWindow as any).Survey?.Model &&
            !!(renderWindow as any).html2pdf &&
            !!(renderWindow as any).jQuery,
            15000, 200
        );

        return renderWindow;
    }

    function waitForCondition(condition: () => boolean, timeoutMs: number, intervalMs: number): Promise<void> {
        return new Promise((resolve, reject) => {
            const start = Date.now();
            function check() {
                if (condition()) { resolve(); return; }
                if (Date.now() - start >= timeoutMs) { reject(new Error("Timeout waiting for render host libraries.")); return; }
                setTimeout(check, intervalMs);
            }
            check();
        });
    }

    // File column upload (Dataverse)
    async function uploadFileColumn(jobId: string, columnName: string, blob: Blob, fileName: string): Promise<void> {
        const clientUrl = Xrm.Utility.getGlobalContext().getClientUrl();
        const entitySetName = "ts_workorderexportjobs";
        const url = `${clientUrl}/api/data/v9.2/${entitySetName}(${jobId})/${columnName}`;
        const arrayBuffer = await blob.arrayBuffer();

        // Prefer single PUT; on failure use Dataverse block upload (large files / limits).
        const putResponse = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/octet-stream",
                "x-ms-file-name": fileName
            },
            body: arrayBuffer
        });

        if (putResponse.ok) return;

        await chunkedUpload(clientUrl, entitySetName, jobId, columnName, arrayBuffer, fileName);
    }

    async function chunkedUpload(
        clientUrl: string,
        entitySetName: string,
        jobId: string,
        columnName: string,
        data: ArrayBuffer,
        fileName: string
    ): Promise<void> {
        const base = `${clientUrl}/api/data/v9.2/${entitySetName}(${jobId})`;

        // File column block API: InitializeFileBlocksUpload → UploadBlock (≤4MB chunks) → CommitFileBlocksUpload
        const initResp = await fetch(`${base}/Microsoft.Dynamics.CRM.InitializeFileBlocksUpload`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                Target: { "@odata.type": "Microsoft.Dynamics.CRM.ts_workorderexportjob", ts_workorderexportjobid: jobId },
                FileAttributeName: columnName
            })
        });
        if (!initResp.ok) throw new Error(`InitializeFileBlocksUpload failed: ${initResp.status}`);
        const { FileContinuationToken } = await initResp.json();

        const BLOCK_SIZE = 4 * 1024 * 1024;
        const blockIds: string[] = [];
        for (let offset = 0, blockNum = 0; offset < data.byteLength; offset += BLOCK_SIZE, blockNum++) {
            const chunk = data.slice(offset, offset + BLOCK_SIZE);
            const blockId = btoa(blockNum.toString().padStart(8, "0"));
            blockIds.push(blockId);
            const blockData = arrayBufferToBase64(chunk);
            const uploadResp = await fetch(`${base}/Microsoft.Dynamics.CRM.UploadBlock`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ FileContinuationToken, BlockId: blockId, BlockData: blockData })
            });
            if (!uploadResp.ok) throw new Error(`UploadBlock ${blockNum} failed: ${uploadResp.status}`);
        }

        const commitResp = await fetch(`${base}/Microsoft.Dynamics.CRM.CommitFileBlocksUpload`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ FileContinuationToken, BlockList: blockIds, FileName: fileName })
        });
        if (!commitResp.ok) throw new Error(`CommitFileBlocksUpload failed: ${commitResp.status}`);
    }

    function arrayBufferToBase64(buffer: ArrayBuffer): string {
        const bytes = new Uint8Array(buffer);
        let binary = "";
        for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
        return btoa(binary);
    }

    // Progress & job status
    async function writeProgress(
        jobId: string,
        doneUnits: number,
        totalUnits: number,
        message: string,
        force: boolean = false
    ): Promise<void> {
        const now = Date.now();
        if (!force && (now - lastProgressWriteMs) < PROGRESS_WRITE_THROTTLE_MS) return;
        lastProgressWriteMs = now;
        await Xrm.WebApi.updateRecord("ts_workorderexportjob", jobId, {
            ts_doneunits: doneUnits,
            ts_totalunits: totalUnits,
            ts_progressmessage: message,
            ts_lastheartbeat: new Date().toISOString()
        });
    }

    async function failJob(jobId: string, formCtx: any, message: string): Promise<void> {
        const truncated = message.length > 500 ? message.substring(0, 497) + "…" : message;
        try {
            await Xrm.WebApi.updateRecord("ts_workorderexportjob", jobId, {
                statuscode: STATUS_ERROR,
                ts_errormessage: truncated,
                ts_lastheartbeat: new Date().toISOString()
            });
        } catch {
            // Best-effort; don't throw from error handler
        }
        Xrm.Utility.closeProgressIndicator();
        try { formCtx.ui.clearFormNotification("export-progress"); } catch { }
        formCtx.ui.setFormNotification(`${getResx("ExportFailedSeeError")} ${truncated}`, "ERROR", "export-error");
    }

    // Strings / URLs
    function getResx(key: string): string {
        return (Xrm.Utility.getResourceString("ts_/resx/WorkOrderExport", key) || "").trim() || key;
    }

    function esc(s: string): string {
        return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
    }

    function buildRecordUrl(
        urlContext: { appBaseUrl: string } | null,
        entityLogicalName: string,
        recordId: string | undefined
    ): string | null {
        if (!urlContext || !entityLogicalName || !recordId) return null;
        const cleanId = String(recordId).replace(/[{}]/g, "").trim().toLowerCase();
        if (!cleanId) return null;
        return (
            `${urlContext.appBaseUrl}` +
            `pagetype=entityrecord&etn=${encodeURIComponent(entityLogicalName)}&id=${encodeURIComponent(cleanId)}`
        );
    }

    function linkOrText(text: string, url: string | null | undefined): string {
        const label = esc(text || "");
        if (!url) return label;
        return `<a class="wo-link" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${label}</a>`;
    }

    function mailtoOrText(email: string): string {
        const e = (email || "").trim();
        if (!e) return esc("—");
        const href = `mailto:${e}`;
        return `<a class="wo-link" href="${esc(href)}">${esc(e)}</a>`;
    }

    function telOrText(phone: string): string {
        const p = (phone || "").trim();
        if (!p) return esc("—");
        const dial = p.replace(/[^\d+]/g, "");
        if (!dial) return esc(p);
        return `<a class="wo-link" href="${esc("tel:" + dial)}">${esc(p)}</a>`;
    }

    async function getUrlContextCached(): Promise<{ appBaseUrl: string } | null> {
        if (cachedUrlContext) return cachedUrlContext;
        try {
            const appBaseUrl = (await getModelDrivenAppBaseUrl()) || "";
            if (!appBaseUrl) return null;
            cachedUrlContext = { appBaseUrl };
            return cachedUrlContext;
        } catch {
            return null;
        }
    }

    /** OData formatted display value when present (option sets, lookups); else raw field value. */
    function fmtVal(record: any, field: string): string {
        return record[`${field}@OData.Community.Display.V1.FormattedValue`] ?? record[field] ?? "";
    }

    function fmtDate(iso: string | null | undefined): string {
        if (!iso) return "—";
        const d = new Date(iso);
        const pad = (n: number) => String(n).padStart(2, "0");
        return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
    }
}
