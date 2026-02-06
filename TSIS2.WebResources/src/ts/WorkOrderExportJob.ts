
namespace ROM.WorkOrderExportJob {
    // StatusCode Values for ts_workorderexportjob
    const STATUS_ACTIVE = 1;
    const STATUS_CLIENT_PROCESSING = 741130001; // Webresource generating survey PDFs
    const STATUS_READY_FOR_SERVER = 741130002; // Surveys done → C# builds payload
    const STATUS_READY_FOR_FLOW = 741130003; // Payload ready → Flow may start
    const STATUS_FLOW_RUNNING = 741130004; // Flow claimed the job (lock)
    const STATUS_READY_FOR_MERGE = 741130005; // MAIN PDFs exist → C# merge
    const STATUS_COMPLETED = 741130006; // ZIP created
    const STATUS_ERROR = 741130007; // Error

    let progressPollHandle: number | null = null;
    let finalizeCheckTimeoutHandle: number | null = null;

    const PROGRESS_POLL_INTERVAL_MS = 5000;
    const PROGRESS_WRITE_THROTTLE_MS = 1500;
    
    const PROGRESS_NOTIFICATION_ID = "wo_export_progress";


    function getJobId(formContext: any): string {
        return (formContext?.data?.entity?.getId?.() || "").replace(/[{}]/g, "");
    }

    function getStatusLabel(status: number | null | undefined): string {
        switch (status) {
            case STATUS_CLIENT_PROCESSING: return "Generating questionnaire PDFs";
            case STATUS_READY_FOR_SERVER: return "Preparing export payload";
            case STATUS_READY_FOR_FLOW: return "Queued for main PDF generation";
            case STATUS_FLOW_RUNNING: return "Generating main PDFs";
            case STATUS_READY_FOR_MERGE: return "Merging PDFs and packaging ZIP";
            case STATUS_COMPLETED: return "Completed";
            case STATUS_ERROR: return "Error";
            default: return "Unknown";
        }
    }

    function formatSurveyOverall(done: number, total: number): string {
        return `Export — Questionnaires ${Math.min(done, total)}/${total}`;
    }

    function formatBackendProgressMessage(
        status: number | null | undefined,
        stageLabel: string,
        rawMessage: string,
        doneUnits: number,
        totalUnits: number
    ): string {
        const percent = totalUnits > 0 ? Math.max(0, Math.min(100, Math.round((doneUnits * 100) / totalUnits))) : 0;
        const msg = (rawMessage || "").trim();

        if (!msg) return `Export ${percent}% — ${stageLabel}`;

        // Common pattern from Flow: "Main PDFs: x/y"
        const mainMatch = msg.match(/^Main PDFs:\s*(\d+)\s*\/\s*(\d+)\s*$/i);
        if (mainMatch) {
            const done = Number(mainMatch[1] || 0);
            const total = Number(mainMatch[2] || 0);
            const next = (done >= total) ? "Next: merge + ZIP." : "";
            return `Export ${percent}% — ${stageLabel} — ${done} of ${total} done. ${next}`.trim();
        }

        // If survey stage completed but we're now in backend, replace technical survey-only messages with a clearer handoff.
        if ((status === STATUS_READY_FOR_SERVER || status === STATUS_READY_FOR_FLOW || status === STATUS_FLOW_RUNNING || status === STATUS_READY_FOR_MERGE) &&
            (msg.toLowerCase().includes("survey pdfs") || msg.toLowerCase().includes("questionnaire pdfs") || msg.toLowerCase().includes("questionnaires")) &&
            msg.toLowerCase().includes("complete")) {
            return `Export ${percent}% — Questionnaires complete. Continuing with main PDFs and final ZIP...`;
        }

        // Default: prefix with stage so message always has context.
        return `Export ${percent}% — ${stageLabel} — ${msg}`;
    }

    async function safeUpdateJob(jobId: string, patch: any): Promise<void> {
        try {
            await Xrm.WebApi.updateRecord("ts_workorderexportjob", jobId, patch);
        } catch (e: any) {
            // Don't fail the export if progress writes fail (e.g., column not on form, permissions, etc.)
            console.log(`[WOExport] Progress update failed: ${e?.message || e}`);
        }
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

    function setLeavePageGuard(enabled: boolean): void {
        try {
            if (enabled) {
                window.onbeforeunload = function () {
                    return "Export is running. If you leave, the export may stop.";
                };
            } else {
                window.onbeforeunload = null;
            }
        } catch (e) {
            // ignore
        }
    }

    async function showDontCloseDialog(): Promise<void> {
        try {
            await Xrm.Navigation.openAlertDialog({
                text:
                    "⚠️ Export started.\n\n" +
                    "Keep this tab open."
            });
        } catch (e) {
            // ignore
        }
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
        const zipFileName = `WorkOrderExport_${jobId}.zip`;
        try {
            const q =
                `?$select=annotationid,filename,subject` +
                `&$filter=_objectid_value eq ${jobId} and filename eq '${zipFileName}'` +
                `&$top=1`;
            const notes = await Xrm.WebApi.retrieveMultipleRecords("annotation", q);
            const noteId = notes?.entities?.[0]?.annotationid;
            if (noteId) {
                await Xrm.Navigation.navigateTo({
                    pageType: "entityrecord",
                    entityName: "annotation",
                    entityId: noteId
                }, { target: 1 });
                return;
            }
        } catch (e: any) {
            console.log(`[WOExport] Failed to locate ZIP note: ${e?.message || e}`);
        }

        Xrm.Navigation.openAlertDialog({ text: "Export completed, but the ZIP could not be located automatically. Please check Notes on the export job (or the Final Export ZIP lookup)." });
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
            setProgressNotification(formContext, `Error: ${msg}`, "ERROR");
            return;
        }

        const totalUnits = Number(job?.ts_totalunits || 0);
        const doneUnits = Number(job?.ts_doneunits || 0);
        const stageLabel = getStatusLabel(status);
        const rawMessage = (job?.ts_progressmessage || "").trim();
        const displayMessage = formatBackendProgressMessage(status, stageLabel, rawMessage, doneUnits, totalUnits);
        setProgressNotification(formContext, displayMessage, "INFO");

        if (status === STATUS_COMPLETED) {
            const fileName = (job?.ts_finalexportzip_name || "").toString().trim();
        
            if (!fileName) {
                setProgressNotification(formContext, "Finalizing export…", "INFO");
                if (finalizeCheckTimeoutHandle === null) {
                    finalizeCheckTimeoutHandle = window.setTimeout(() => {
                        finalizeCheckTimeoutHandle = null;
                        pollAndRenderProgress(formContext, jobId).catch(() => {});
                    }, 3_000); // check if file is in the export job
                }
                return;
            }
        
            stopProgressPoller(formContext);
            setProgressNotification(formContext, "Export completed. The ZIP is ready to download.", "INFO");
            try { await formContext.data.refresh(false); } catch {}
            return;
        }
        
    }

    function startProgressPoller(formContext: any, jobId: string): void {
        if (progressPollHandle !== null) return;

        progressPollHandle = window.setInterval(() => {
            pollAndRenderProgress(formContext, jobId).catch((e: any) => {
                console.log(`[WOExport] Progress polling error: ${e?.message || e}`);
            });
        }, PROGRESS_POLL_INTERVAL_MS);

        // kick once immediately
        pollAndRenderProgress(formContext, jobId).catch((e: any) => {
            console.log(`[WOExport] Progress polling error: ${e?.message || e}`);
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
                status === STATUS_ERROR) {
                setLeavePageGuard(false);

                startProgressPoller(formContext, jobId);
                return;
            }
        }

        if (status !== STATUS_CLIENT_PROCESSING) return;

        try {
            if (jobId) {
                // Stage 2 is running in this tab: warn and prevent accidental close.
                setLeavePageGuard(true);
                showDontCloseDialog();
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

            // Pre-count total questionnaires (survey PDFs) to compute accurate totalUnits
            // totalUnits = totalSurveyPdfs + totalWorkOrders + totalMergedPdfs + 1(zip)
            //           = totalSurveyPdfs + (2 * totalWorkOrders) + 1
            let totalSurveyPdfs = 0;
            const tasksByWorkOrderId: Record<string, any[]> = {};

            setProgressNotification(
                formContext,
                "Preparing export (1/2): counting questionnaires...",
                "INFO"
            );            let countIndex = 0;
            for (const workOrderId of ids) {
                countIndex++;
                const workOrderIdNoBraces = workOrderId.replace(/[{}]/g, "");
                const fetchOptions =
                    "?$select=msdyn_workorderservicetaskid,ovs_questionnairedefinition,ovs_questionnaireresponse" +
                    "&$filter=_msdyn_workorder_value eq " + workOrderIdNoBraces;

                setProgressNotification(formContext, `Preparing export (1/2): counting questionnaires (${countIndex}/${totalExports})...`, "INFO");
                const tasks = await Xrm.WebApi.retrieveMultipleRecords("msdyn_workorderservicetask", fetchOptions);

                const tasksTotal = tasks.entities.length;
                if (tasksTotal === 0) {
                    const errorMessage = `Work Order ${workOrderIdNoBraces}: No work order service tasks found`;
                    formContext.getAttribute("statuscode").setValue(STATUS_ERROR);
                    const errorMsgAttr = formContext.getAttribute("ts_errormessage");
                    if (errorMsgAttr) errorMsgAttr.setValue(errorMessage);
                    clearProgressNotification(formContext);
                    await formContext.data.save();
                    Xrm.Navigation.openAlertDialog({ text: errorMessage });
                    return;
                }

                const tasksWithQuestionnaires = tasks.entities.filter(task =>
                    task.ovs_questionnairedefinition && task.ovs_questionnaireresponse
                );

                if (tasksWithQuestionnaires.length === 0) {
                    const errorMessage = `Work Order ${workOrderIdNoBraces}: No questionnaires found in any service tasks`;
                    formContext.getAttribute("statuscode").setValue(STATUS_ERROR);
                    const errorMsgAttr = formContext.getAttribute("ts_errormessage");
                    if (errorMsgAttr) errorMsgAttr.setValue(errorMessage);
                    clearProgressNotification(formContext);
                    await formContext.data.save();
                    Xrm.Navigation.openAlertDialog({ text: errorMessage });
                    return;
                }

                tasksByWorkOrderId[workOrderIdNoBraces] = tasks.entities;
                totalSurveyPdfs += tasksWithQuestionnaires.length;
            }

            const totalUnits = totalSurveyPdfs + (2 * totalExports) + 1;
            let doneUnits = 0;

            // Initialize progress fields on the job (fields exist in Dataverse but may not be on the form)
            if (exportJobId) {
                await safeUpdateJob(exportJobId, {
                    ts_totalunits: totalUnits,
                    ts_doneunits: doneUnits,
                    ts_progressmessage: `Questionnaire PDFs: 0/${totalSurveyPdfs}`,
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
              `;
              renderWindow.document.head.appendChild(style);
            }

            let currentExportIndex = 0;
            const errors: string[] = [];
            
            // Helper function to update progress notification (local UI)
            const updateProgress = (overallMessage: string, detailMessage?: string) => {
                const combined = detailMessage
                    ? `${overallMessage} — ${detailMessage}`
                    : overallMessage;
            
                setProgressNotification(formContext, combined, "WARNING");
            };

            let lastProgressWriteMs = 0;
            const writeProgress = async (message: string, force: boolean = false) => {
                const now = Date.now();
                if (!force && (now - lastProgressWriteMs) < PROGRESS_WRITE_THROTTLE_MS) return;
                lastProgressWriteMs = now;
                if (!exportJobId) return;
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
                    console.log(`[WOExport] Could not retrieve work order name for ${workOrderIdNoBraces}: ${e.message}`);
                }
                
                const woDisplayName = workOrderName ? ` - ${workOrderName}` : "";
                updateProgress(
                    formatSurveyOverall(doneUnits, totalSurveyPdfs),
                    `Export — Work order ${currentExportIndex} of ${totalExports}${woDisplayName}: starting (do not close this tab)`
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
                    
                    if (task.ovs_questionnairedefinition && task.ovs_questionnaireresponse) {
                        currentTaskIndex++;
                        const def = task.ovs_questionnairedefinition;
                        const resp = task.ovs_questionnaireresponse;
                        
                        try {
                        updateProgress(
                            formatSurveyOverall(doneUnits, totalSurveyPdfs),
                            `Export — Work order ${currentExportIndex} of ${totalExports}${woDisplayName} — Questionnaire ${currentTaskIndex} of ${totalQuestionnaires}: preparing`
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
                            continue;
                        }

                        let surveyDef: any;
                        try {
                            surveyDef = JSON.parse(def.trim());
                        } catch (parseError: any) {
                            console.log(`[WOExport] ERROR parsing survey definition for Work Order Service Task ${taskId}: ${parseError.message}`);
                            continue; // Skip this task and move to the next one
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

                        // 3. Event Handlers (Replicating surveyRenderPrint.js)
                        // Append Details Logic
                        survey.onAfterRenderQuestion.add(function (sender: any, options: any) {
                            if (options.question.hasDetail != true) return;
                            
                            const detailSurveyId = options.question.name + "-Detail";
                            const detailLabel = (locale === 'fr') ? (options.question.detailFrenchText || "Détail") : (options.question.detailEnglishText || "Detail");
                            
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
                            `Export — Work order ${currentExportIndex} of ${totalExports}${woDisplayName} — Questionnaire ${currentTaskIndex} of ${totalQuestionnaires}: rendering`
                        );
                        renderWindow.jQuery(targetId).Survey({ model: survey });

                        // Wait for rendering with polling
                        updateProgress(
                            formatSurveyOverall(doneUnits, totalSurveyPdfs),
                            `Export — Work order ${currentExportIndex} of ${totalExports}${woDisplayName} — Questionnaire ${currentTaskIndex} of ${totalQuestionnaires}: finalizing layout`
                        );
                        await waitForRender(targetElement, 10000);

                        // ---------------------------------------------------------
                        // FIX: Convert TextAreas to Divs
                        // ---------------------------------------------------------
                        updateProgress(
                            formatSurveyOverall(doneUnits, totalSurveyPdfs),
                            `Export — Work order ${currentExportIndex} of ${totalExports}${woDisplayName} — Questionnaire ${currentTaskIndex} of ${totalQuestionnaires}: formatting`
                        );
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
                            `Export — Work order ${currentExportIndex} of ${totalExports}${woDisplayName} — Questionnaire ${currentTaskIndex} of ${totalQuestionnaires}: generating PDF`
                        );
                        const options = {
                            margin: 0.5,
                            filename: filename,
                            image: { type: 'png', quality: 0.98 },
                            html2canvas: { scale: 1, useCORS: true },
                            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
                        };

                        const blob = await renderWindow.html2pdf().from(targetElement).set(options).output('blob');
                        const sizeMB = (blob.size / (1024 * 1024)).toFixed(2);
                        console.log(`[WOExport] PDF Generated for Work Order Service Task ${taskId}. Size: ${sizeMB} MB`);

                        if (blob.size < 5 * 1024) {
                            console.warn(`[WOExport] Warning: ${filename} is unusually small (${sizeMB} MB). It may be blank.`);
                        }

                        // ---------------------------------------------------------
                        // UPLOAD
                        // ---------------------------------------------------------
                        updateProgress(
                            formatSurveyOverall(doneUnits, totalSurveyPdfs),
                            `Export — Work order ${currentExportIndex} of ${totalExports}${woDisplayName} — Questionnaire ${currentTaskIndex} of ${totalQuestionnaires}: uploading PDF`
                        );
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

                        await Xrm.WebApi.createRecord("annotation", note);
                        updateProgress(
                            formatSurveyOverall(doneUnits, totalSurveyPdfs),
                            `Export — Work order ${currentExportIndex} of ${totalExports}${woDisplayName} — Questionnaire ${currentTaskIndex} of ${totalQuestionnaires}: done`
                        );

                        renderedCount++;
                        uploadedCount++;

                        // Progress unit completed (one survey PDF)
                        doneUnits++;
                        await writeProgress(`Questionnaire PDFs: ${Math.min(doneUnits, totalSurveyPdfs)}/${totalSurveyPdfs}`);
                        // DO NOT BREAK - Process all tasks for this Work Order
                        } catch (taskError: any) {
                            const errorMessage = `Work Order: ${workOrderIdNoBraces} - Work order service task: ${taskId}:\n\`\`\`\n${taskError.message || taskError.toString()}\n\`\`\``;
                            errors.push(errorMessage);
                            console.error(`[WOExport] Error processing Work Order Service Task ${taskId} for Work Order ${workOrderIdNoBraces}:`, taskError);
                            updateProgress(
                                formatSurveyOverall(doneUnits, totalSurveyPdfs),
                                `Export — Work order ${currentExportIndex} of ${totalExports}${woDisplayName} — Questionnaire ${currentTaskIndex} of ${totalQuestionnaires}: ERROR (${taskError.message || taskError.toString()})`
                            );
                        }
                    } else {
                        skippedCount++;
                    }
                }
                
                updateProgress(
                    formatSurveyOverall(doneUnits, totalSurveyPdfs),
                    `Export — Work order ${currentExportIndex} of ${totalExports}${woDisplayName}: done (${renderedCount} PDFs generated, ${skippedCount} skipped)`
                );
                console.log(`[WOExport] Work Order ${workOrderIdNoBraces}: tasks=${tasksTotal}, rendered=${renderedCount}, uploaded=${uploadedCount}, skipped=${skippedCount}`);
            }

            // 6. Completion
            if (errors.length > 0) {
                // Set error status and message
                formContext.getAttribute("statuscode").setValue(STATUS_ERROR);
                const errorMsgAttr = formContext.getAttribute("ts_errormessage");
                if (errorMsgAttr) {
                    errorMsgAttr.setValue(errors.join("\n\n"));
                }
                clearProgressNotification(formContext);
                setLeavePageGuard(false);
                await formContext.data.save();
                Xrm.Navigation.openAlertDialog({ text: `Export completed with ${errors.length} error(s). Check error message field for details.` });
            } else {
                await writeProgress(`Questionnaire PDFs: ${Math.min(doneUnits, totalSurveyPdfs)}/${totalSurveyPdfs} (complete)`, true);
                setProgressNotification(
                    formContext,
                    "Export in progress (background processing continues).",
                    "INFO"
                );
                formContext.getAttribute("statuscode").setValue(STATUS_READY_FOR_SERVER);
                setLeavePageGuard(false);

                await formContext.data.save();
                if (exportJobId) {
                    startProgressPoller(formContext, exportJobId);
                }
            }

        } catch (e: any) {
            console.error("[WOExport] ERROR: ", e);
            clearProgressNotification(formContext);
            setLeavePageGuard(false);

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
