"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var ROM;
(function (ROM) {
    var WorkOrderExportJob;
    (function (WorkOrderExportJob) {
        // StatusCode Values for ts_workorderexportjob
        var STATUS_ACTIVE = 1;
        var STATUS_CLIENT_PROCESSING = 741130001; // Webresource generating survey PDFs
        var STATUS_READY_FOR_SERVER = 741130002; // Surveys done → C# builds payload
        var STATUS_READY_FOR_FLOW = 741130003; // Payload ready → Flow may start
        var STATUS_FLOW_RUNNING = 741130004; // Flow claimed the job (lock)
        var STATUS_READY_FOR_MERGE = 741130005; // MAIN PDFs exist → C# merge
        var STATUS_COMPLETED = 741130006; // ZIP created
        var STATUS_ERROR = 741130007; // Error
        var PROGRESS_POLL_INTERVAL_MS = 10000;
        var PROGRESS_WRITE_THROTTLE_MS = 1500;
        var PROGRESS_NOTIFICATION_ID = "wo_export_progress";
        var progressPollHandle = null;
        function getJobId(formContext) {
            var _a, _b, _c;
            return (((_c = (_b = (_a = formContext === null || formContext === void 0 ? void 0 : formContext.data) === null || _a === void 0 ? void 0 : _a.entity) === null || _b === void 0 ? void 0 : _b.getId) === null || _c === void 0 ? void 0 : _c.call(_b)) || "").replace(/[{}]/g, "");
        }
        function getStatusLabel(status) {
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
        function formatSurveyOverall(done, total) {
            return "Export \u2014 Questionnaires " + Math.min(done, total) + "/" + total;
        }
        function formatBackendProgressMessage(status, stageLabel, rawMessage, doneUnits, totalUnits) {
            var percent = totalUnits > 0 ? Math.max(0, Math.min(100, Math.round((doneUnits * 100) / totalUnits))) : 0;
            var msg = (rawMessage || "").trim();
            if (!msg)
                return "Export " + percent + "% \u2014 " + stageLabel;
            // Common pattern from Flow: "Main PDFs: x/y"
            var mainMatch = msg.match(/^Main PDFs:\s*(\d+)\s*\/\s*(\d+)\s*$/i);
            if (mainMatch) {
                var done = Number(mainMatch[1] || 0);
                var total = Number(mainMatch[2] || 0);
                var next = (done >= total) ? "Next: merge + ZIP." : "";
                return ("Export " + percent + "% \u2014 " + stageLabel + " \u2014 " + done + " of " + total + " done. " + next).trim();
            }
            // If survey stage completed but we're now in backend, replace technical survey-only messages with a clearer handoff.
            if ((status === STATUS_READY_FOR_SERVER || status === STATUS_READY_FOR_FLOW || status === STATUS_FLOW_RUNNING || status === STATUS_READY_FOR_MERGE) &&
                (msg.toLowerCase().includes("survey pdfs") || msg.toLowerCase().includes("questionnaire pdfs") || msg.toLowerCase().includes("questionnaires")) &&
                msg.toLowerCase().includes("complete")) {
                return "Export " + percent + "% \u2014 Questionnaires complete. Continuing with main PDFs and final ZIP...";
            }
            // Default: prefix with stage so message always has context.
            return "Export " + percent + "% \u2014 " + stageLabel + " \u2014 " + msg;
        }
        function safeUpdateJob(jobId, patch) {
            return __awaiter(this, void 0, void 0, function () {
                var e_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, Xrm.WebApi.updateRecord("ts_workorderexportjob", jobId, patch)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            e_1 = _a.sent();
                            // Don't fail the export if progress writes fail (e.g., column not on form, permissions, etc.)
                            console.log("[WOExport] Progress update failed: " + ((e_1 === null || e_1 === void 0 ? void 0 : e_1.message) || e_1));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        function setProgressNotification(formContext, text, level) {
            if (level === void 0) { level = "INFO"; }
            try {
                formContext.ui.setFormNotification(text, level, PROGRESS_NOTIFICATION_ID);
            }
            catch (e) {
                // ignore
            }
        }
        function clearProgressNotification(formContext) {
            try {
                formContext.ui.clearFormNotification(PROGRESS_NOTIFICATION_ID);
            }
            catch (e) {
                // ignore
            }
        }
        function setLeavePageGuard(enabled) {
            try {
                if (enabled) {
                    window.onbeforeunload = function () {
                        return "Export is running. If you leave, the export may stop.";
                    };
                }
                else {
                    window.onbeforeunload = null;
                }
            }
            catch (e) {
                // ignore
            }
        }
        function showDontCloseDialog() {
            return __awaiter(this, void 0, void 0, function () {
                var e_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, Xrm.Navigation.openAlertDialog({
                                    text: "⚠️ Export started.\n\n" +
                                        "Keep this tab open."
                                })];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            e_2 = _a.sent();
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        function getClientUrl() {
            try {
                return Xrm.Utility.getGlobalContext().getClientUrl();
            }
            catch (e) {
                return "";
            }
        }
        function tryOpenFinalZipFileColumn(jobId, jobRecord) {
            return __awaiter(this, void 0, void 0, function () {
                var fileName, baseUrl, url;
                return __generator(this, function (_a) {
                    fileName = ((jobRecord === null || jobRecord === void 0 ? void 0 : jobRecord.ts_finalexportzip_name) || "").toString().trim();
                    if (!fileName)
                        return [2 /*return*/, false];
                    baseUrl = getClientUrl();
                    if (!baseUrl)
                        return [2 /*return*/, false];
                    url = baseUrl + "/api/data/v9.2/ts_workorderexportjobs(" + jobId + ")/ts_finalexportzip/$value";
                    window.open(url, "_blank");
                    return [2 /*return*/, true];
                });
            });
        }
        function openFinalArtifact(jobId, jobRecord) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function () {
                var zipFileName, q, notes, noteId, e_3;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, tryOpenFinalZipFileColumn(jobId, jobRecord)];
                        case 1:
                            // Mode B: Dataverse File column on the job
                            if (_c.sent()) {
                                return [2 /*return*/];
                            }
                            zipFileName = "WorkOrderExport_" + jobId + ".zip";
                            _c.label = 2;
                        case 2:
                            _c.trys.push([2, 6, , 7]);
                            q = "?$select=annotationid,filename,subject" +
                                ("&$filter=_objectid_value eq " + jobId + " and filename eq '" + zipFileName + "'") +
                                "&$top=1";
                            return [4 /*yield*/, Xrm.WebApi.retrieveMultipleRecords("annotation", q)];
                        case 3:
                            notes = _c.sent();
                            noteId = (_b = (_a = notes === null || notes === void 0 ? void 0 : notes.entities) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.annotationid;
                            if (!noteId) return [3 /*break*/, 5];
                            return [4 /*yield*/, Xrm.Navigation.navigateTo({
                                    pageType: "entityrecord",
                                    entityName: "annotation",
                                    entityId: noteId
                                }, { target: 1 })];
                        case 4:
                            _c.sent();
                            return [2 /*return*/];
                        case 5: return [3 /*break*/, 7];
                        case 6:
                            e_3 = _c.sent();
                            console.log("[WOExport] Failed to locate ZIP note: " + ((e_3 === null || e_3 === void 0 ? void 0 : e_3.message) || e_3));
                            return [3 /*break*/, 7];
                        case 7:
                            Xrm.Navigation.openAlertDialog({ text: "Export completed, but the ZIP could not be located automatically. Please check Notes on the export job (or the Final Export ZIP lookup)." });
                            return [2 /*return*/];
                    }
                });
            });
        }
        function pollAndRenderProgress(formContext, jobId) {
            return __awaiter(this, void 0, void 0, function () {
                var select, job, status, msg, totalUnits, doneUnits, stageLabel, rawMessage, displayMessage, e_4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            select = "?$select=statuscode,ts_errormessage,ts_totalunits,ts_doneunits,ts_progressmessage,ts_lastheartbeat,ts_finalexportzip_name";
                            return [4 /*yield*/, Xrm.WebApi.retrieveRecord("ts_workorderexportjob", jobId, select)];
                        case 1:
                            job = _a.sent();
                            status = job === null || job === void 0 ? void 0 : job.statuscode;
                            if (status === STATUS_ERROR) {
                                stopProgressPoller(formContext);
                                msg = (job === null || job === void 0 ? void 0 : job.ts_errormessage) || "Export failed. See error message.";
                                setProgressNotification(formContext, "Error: " + msg, "ERROR");
                                return [2 /*return*/];
                            }
                            totalUnits = Number((job === null || job === void 0 ? void 0 : job.ts_totalunits) || 0);
                            doneUnits = Number((job === null || job === void 0 ? void 0 : job.ts_doneunits) || 0);
                            stageLabel = getStatusLabel(status);
                            rawMessage = ((job === null || job === void 0 ? void 0 : job.ts_progressmessage) || "").trim();
                            displayMessage = formatBackendProgressMessage(status, stageLabel, rawMessage, doneUnits, totalUnits);
                            setProgressNotification(formContext, displayMessage, "INFO");
                            if (!(status === STATUS_COMPLETED)) return [3 /*break*/, 5];
                            stopProgressPoller(formContext);
                            setProgressNotification(formContext, "Export completed.  The ZIP is ready to download.", "INFO");
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, formContext.data.refresh(false)];
                        case 3:
                            _a.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            e_4 = _a.sent();
                            console.log("[WOExport] Form refresh failed after completion:", e_4);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        }
        function startProgressPoller(formContext, jobId) {
            if (progressPollHandle !== null)
                return;
            progressPollHandle = window.setInterval(function () {
                pollAndRenderProgress(formContext, jobId).catch(function (e) {
                    console.log("[WOExport] Progress polling error: " + ((e === null || e === void 0 ? void 0 : e.message) || e));
                });
            }, PROGRESS_POLL_INTERVAL_MS);
            // kick once immediately
            pollAndRenderProgress(formContext, jobId).catch(function (e) {
                console.log("[WOExport] Progress polling error: " + ((e === null || e === void 0 ? void 0 : e.message) || e));
            });
        }
        function stopProgressPoller(formContext) {
            if (progressPollHandle !== null) {
                window.clearInterval(progressPollHandle);
                progressPollHandle = null;
            }
        }
        /**
         * Waits for survey element to render with measurable content.
         * Polls until element has text content.
         * @param targetElement Element to check
         * @param timeoutMs Maximum time to wait in milliseconds
         * @returns Promise that resolves when render is complete or timeout occurs
         */
        function waitForRender(targetElement, timeoutMs) {
            return __awaiter(this, void 0, void 0, function () {
                var startTime, pollInterval;
                return __generator(this, function (_a) {
                    startTime = Date.now();
                    pollInterval = 100;
                    return [2 /*return*/, new Promise(function (resolve) {
                            var checkRender = function () {
                                var elapsed = Date.now() - startTime;
                                var hasText = targetElement.innerText.trim().length > 0;
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
                        })];
                });
            });
        }
        function onLoad(eContext) {
            var _a, _b, _c, _d;
            return __awaiter(this, void 0, void 0, function () {
                var formContext, formType, renderHostControl, status, jobId, renderHostControl, renderWindow_1, payloadAttr, payloadStr, rawPayload, ids, includeHiddenQuestions, totalExports, exportJobId_1, totalSurveyPdfs, tasksByWorkOrderId, countIndex, _i, ids_1, workOrderId, workOrderIdNoBraces, fetchOptions, tasks, tasksTotal, errorMessage, errorMsgAttr, tasksWithQuestionnaires, errorMessage, errorMsgAttr, totalUnits, doneUnits_1, userSettings, locale_1, cssId, style, currentExportIndex, errors, updateProgress, lastProgressWriteMs_1, writeProgress, _e, ids_2, workOrderId, workOrderIdNoBraces, workOrderName, workOrder, e_5, woDisplayName, tasksEntities, tasksTotal, renderedCount, uploadedCount, skippedCount, tasksWithQuestionnaires, totalQuestionnaires, currentTaskIndex, _loop_1, _f, tasksEntities_1, task, errorMsgAttr, e_6, errorMsgAttr;
                var _this = this;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            formContext = eContext.getFormContext();
                            console.log("[WOExport] onLoad triggered.");
                            formType = formContext.ui.getFormType();
                            if (formType === 1) { // 1 = Create (new)
                                renderHostControl = formContext.getControl("WebResource_RenderHost");
                                if (renderHostControl) {
                                    renderHostControl.setVisible(false);
                                }
                                // Don't process if form is new - return early
                                return [2 /*return*/];
                            }
                            status = (_b = (_a = formContext.getAttribute("statuscode")) === null || _a === void 0 ? void 0 : _a.getValue()) !== null && _b !== void 0 ? _b : (_c = formContext.getAttribute("header_ts_statuscode")) === null || _c === void 0 ? void 0 : _c.getValue();
                            jobId = getJobId(formContext);
                            if (jobId) {
                                // If we're in any backend stage, start polling so user sees live progress without refreshes.
                                if (status === STATUS_READY_FOR_SERVER ||
                                    status === STATUS_READY_FOR_FLOW ||
                                    status === STATUS_FLOW_RUNNING ||
                                    status === STATUS_READY_FOR_MERGE ||
                                    status === STATUS_ERROR) {
                                    setLeavePageGuard(false);
                                    startProgressPoller(formContext, jobId);
                                    return [2 /*return*/];
                                }
                            }
                            if (status !== STATUS_CLIENT_PROCESSING)
                                return [2 /*return*/];
                            _g.label = 1;
                        case 1:
                            _g.trys.push([1, 31, , 33]);
                            if (!jobId) return [3 /*break*/, 3];
                            // Stage 2 is running in this tab: warn and prevent accidental close.
                            setLeavePageGuard(true);
                            return [4 /*yield*/, showDontCloseDialog()];
                        case 2:
                            _g.sent();
                            _g.label = 3;
                        case 3:
                            renderHostControl = formContext.getControl("WebResource_RenderHost");
                            if (!renderHostControl) {
                                throw new Error("WebResource_RenderHost control not found on form.");
                            }
                            return [4 /*yield*/, renderHostControl.getContentWindow()];
                        case 4:
                            renderWindow_1 = _g.sent();
                            if (!renderWindow_1) {
                                throw new Error("Render host content window not accessible.");
                            }
                            payloadAttr = formContext.getAttribute("ts_surveypayloadjson");
                            payloadStr = payloadAttr === null || payloadAttr === void 0 ? void 0 : payloadAttr.getValue();
                            if (!payloadStr) {
                                throw new Error("No payload JSON found (ts_surveypayloadjson is empty).");
                            }
                            rawPayload = void 0;
                            try {
                                rawPayload = JSON.parse(payloadStr);
                            }
                            catch (e) {
                                throw new Error("Invalid payload JSON (parse failed): " + (e.message || e));
                            }
                            if (!rawPayload || !Array.isArray(rawPayload.ids)) {
                                throw new Error("Invalid payload JSON format. Expected { ids: string[], includeHiddenQuestions?: boolean }.");
                            }
                            ids = rawPayload.ids;
                            includeHiddenQuestions = !!rawPayload.includeHiddenQuestions;
                            totalExports = ids.length;
                            exportJobId_1 = jobId || getJobId(formContext);
                            totalSurveyPdfs = 0;
                            tasksByWorkOrderId = {};
                            setProgressNotification(formContext, "Preparing export (1/2): counting questionnaires...", "INFO");
                            countIndex = 0;
                            _i = 0, ids_1 = ids;
                            _g.label = 5;
                        case 5:
                            if (!(_i < ids_1.length)) return [3 /*break*/, 12];
                            workOrderId = ids_1[_i];
                            countIndex++;
                            workOrderIdNoBraces = workOrderId.replace(/[{}]/g, "");
                            fetchOptions = "?$select=msdyn_workorderservicetaskid,ovs_questionnairedefinition,ovs_questionnaireresponse" +
                                "&$filter=_msdyn_workorder_value eq " + workOrderIdNoBraces;
                            setProgressNotification(formContext, "Preparing export (1/2): counting questionnaires (" + countIndex + "/" + totalExports + ")...", "INFO");
                            return [4 /*yield*/, Xrm.WebApi.retrieveMultipleRecords("msdyn_workorderservicetask", fetchOptions)];
                        case 6:
                            tasks = _g.sent();
                            tasksTotal = tasks.entities.length;
                            if (!(tasksTotal === 0)) return [3 /*break*/, 8];
                            errorMessage = "Work Order " + workOrderIdNoBraces + ": No work order service tasks found";
                            formContext.getAttribute("statuscode").setValue(STATUS_ERROR);
                            errorMsgAttr = formContext.getAttribute("ts_errormessage");
                            if (errorMsgAttr)
                                errorMsgAttr.setValue(errorMessage);
                            clearProgressNotification(formContext);
                            return [4 /*yield*/, formContext.data.save()];
                        case 7:
                            _g.sent();
                            Xrm.Navigation.openAlertDialog({ text: errorMessage });
                            return [2 /*return*/];
                        case 8:
                            tasksWithQuestionnaires = tasks.entities.filter(function (task) {
                                return task.ovs_questionnairedefinition && task.ovs_questionnaireresponse;
                            });
                            if (!(tasksWithQuestionnaires.length === 0)) return [3 /*break*/, 10];
                            errorMessage = "Work Order " + workOrderIdNoBraces + ": No questionnaires found in any service tasks";
                            formContext.getAttribute("statuscode").setValue(STATUS_ERROR);
                            errorMsgAttr = formContext.getAttribute("ts_errormessage");
                            if (errorMsgAttr)
                                errorMsgAttr.setValue(errorMessage);
                            clearProgressNotification(formContext);
                            return [4 /*yield*/, formContext.data.save()];
                        case 9:
                            _g.sent();
                            Xrm.Navigation.openAlertDialog({ text: errorMessage });
                            return [2 /*return*/];
                        case 10:
                            tasksByWorkOrderId[workOrderIdNoBraces] = tasks.entities;
                            totalSurveyPdfs += tasksWithQuestionnaires.length;
                            _g.label = 11;
                        case 11:
                            _i++;
                            return [3 /*break*/, 5];
                        case 12:
                            totalUnits = totalSurveyPdfs + (2 * totalExports) + 1;
                            doneUnits_1 = 0;
                            if (!exportJobId_1) return [3 /*break*/, 14];
                            return [4 /*yield*/, safeUpdateJob(exportJobId_1, {
                                    ts_totalunits: totalUnits,
                                    ts_doneunits: doneUnits_1,
                                    ts_progressmessage: "Questionnaire PDFs: 0/" + totalSurveyPdfs,
                                    ts_lastheartbeat: new Date().toISOString()
                                })];
                        case 13:
                            _g.sent();
                            _g.label = 14;
                        case 14:
                            userSettings = Xrm.Utility.getGlobalContext().userSettings;
                            locale_1 = (userSettings.languageId === 1036) ? 'fr' : 'en';
                            cssId = "ts-survey-pdf-css";
                            if (!renderWindow_1.document.getElementById(cssId)) {
                                style = renderWindow_1.document.createElement("style");
                                style.id = cssId;
                                style.innerHTML = "\n                .sv_nav,\n                .sv_next_btn,\n                .sv_prev_btn,\n                .sv_complete_btn,\n                .sv_preview_btn,\n                .sv_progress {\n                  display: none !important;\n                }\n          \n                .sv_p_root {\n                  padding-bottom: 0px !important;\n                }\n              ";
                                renderWindow_1.document.head.appendChild(style);
                            }
                            currentExportIndex = 0;
                            errors = [];
                            updateProgress = function (overallMessage, detailMessage) {
                                var combined = detailMessage
                                    ? overallMessage + " \u2014 " + detailMessage
                                    : overallMessage;
                                setProgressNotification(formContext, combined, "WARNING");
                            };
                            lastProgressWriteMs_1 = 0;
                            writeProgress = function (message, force) {
                                if (force === void 0) { force = false; }
                                return __awaiter(_this, void 0, void 0, function () {
                                    var now;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                now = Date.now();
                                                if (!force && (now - lastProgressWriteMs_1) < PROGRESS_WRITE_THROTTLE_MS)
                                                    return [2 /*return*/];
                                                lastProgressWriteMs_1 = now;
                                                if (!exportJobId_1)
                                                    return [2 /*return*/];
                                                return [4 /*yield*/, safeUpdateJob(exportJobId_1, {
                                                        ts_doneunits: doneUnits_1,
                                                        ts_progressmessage: message,
                                                        ts_lastheartbeat: new Date().toISOString()
                                                    })];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                });
                            };
                            _e = 0, ids_2 = ids;
                            _g.label = 15;
                        case 15:
                            if (!(_e < ids_2.length)) return [3 /*break*/, 25];
                            workOrderId = ids_2[_e];
                            currentExportIndex++;
                            workOrderIdNoBraces = workOrderId.replace(/[{}]/g, "");
                            workOrderName = "";
                            _g.label = 16;
                        case 16:
                            _g.trys.push([16, 18, , 19]);
                            return [4 /*yield*/, Xrm.WebApi.retrieveRecord("msdyn_workorder", workOrderIdNoBraces, "?$select=msdyn_name")];
                        case 17:
                            workOrder = _g.sent();
                            workOrderName = workOrder.msdyn_name || "";
                            return [3 /*break*/, 19];
                        case 18:
                            e_5 = _g.sent();
                            console.log("[WOExport] Could not retrieve work order name for " + workOrderIdNoBraces + ": " + e_5.message);
                            return [3 /*break*/, 19];
                        case 19:
                            woDisplayName = workOrderName ? " - " + workOrderName : "";
                            updateProgress(formatSurveyOverall(doneUnits_1, totalSurveyPdfs), "Export \u2014 Work order " + currentExportIndex + " of " + totalExports + woDisplayName + ": starting (do not close this tab)");
                            tasksEntities = tasksByWorkOrderId[workOrderIdNoBraces] || [];
                            tasksTotal = tasksEntities.length;
                            renderedCount = 0;
                            uploadedCount = 0;
                            skippedCount = 0;
                            tasksWithQuestionnaires = tasksEntities.filter(function (task) {
                                return task.ovs_questionnairedefinition && task.ovs_questionnaireresponse;
                            });
                            totalQuestionnaires = tasksWithQuestionnaires.length;
                            currentTaskIndex = 0;
                            _loop_1 = function (task) {
                                var taskId, def, resp, elementPrint, elementNormal, targetElement, targetId, surveyDef, _h, _j, page, els, _k, els_1, el, survey, filename_1, options, blob_1, sizeMB_1, base64Data, exportJobId_2, note, taskError_1, errorMessage;
                                return __generator(this, function (_l) {
                                    switch (_l.label) {
                                        case 0:
                                            taskId = ((_d = task.msdyn_workorderservicetaskid) === null || _d === void 0 ? void 0 : _d.replace(/[{}]/g, "")) || "unknown";
                                            if (!(task.ovs_questionnairedefinition && task.ovs_questionnaireresponse)) return [3 /*break*/, 9];
                                            currentTaskIndex++;
                                            def = task.ovs_questionnairedefinition;
                                            resp = task.ovs_questionnaireresponse;
                                            _l.label = 1;
                                        case 1:
                                            _l.trys.push([1, 7, , 8]);
                                            updateProgress(formatSurveyOverall(doneUnits_1, totalSurveyPdfs), "Export \u2014 Work order " + currentExportIndex + " of " + totalExports + woDisplayName + " \u2014 Questionnaire " + currentTaskIndex + " of " + totalQuestionnaires + ": preparing");
                                            // ---------------------------------------------------------
                                            // RENDER LOGIC
                                            // ---------------------------------------------------------
                                            // Reset Globals
                                            renderWindow_1.operationList = [];
                                            renderWindow_1.activityTypeOperationTypeIdsList = [];
                                            renderWindow_1.questionsOnly = false;
                                            // Clear Previous DOM
                                            if (renderWindow_1.jQuery) {
                                                renderWindow_1.jQuery("#surveyElementPrint").empty();
                                                renderWindow_1.jQuery("#surveyElement").empty();
                                            }
                                            elementPrint = renderWindow_1.document.getElementById("surveyElementPrint");
                                            elementNormal = renderWindow_1.document.getElementById("surveyElement");
                                            targetElement = elementPrint || elementNormal;
                                            targetId = elementPrint ? "#surveyElementPrint" : "#surveyElement";
                                            // 1. Parse & Flatten Definition (Single Page)
                                            if (!def || typeof def !== 'string' || def.trim() === '') {
                                                return [2 /*return*/, "continue"];
                                            }
                                            surveyDef = void 0;
                                            try {
                                                surveyDef = JSON.parse(def.trim());
                                            }
                                            catch (parseError) {
                                                console.log("[WOExport] ERROR parsing survey definition for Work Order Service Task " + taskId + ": " + parseError.message);
                                                return [2 /*return*/, "continue"];
                                            }
                                            // If includeHiddenQuestions is true: clear visibleIf on ALL elements on ALL pages
                                            // If false: do nothing (keep original visibleIf)
                                            if (includeHiddenQuestions) {
                                                for (_h = 0, _j = surveyDef.pages; _h < _j.length; _h++) {
                                                    page = _j[_h];
                                                    els = page === null || page === void 0 ? void 0 : page.elements;
                                                    if (!Array.isArray(els))
                                                        continue;
                                                    for (_k = 0, els_1 = els; _k < els_1.length; _k++) {
                                                        el = els_1[_k];
                                                        el.visibleIf = null;
                                                    }
                                                }
                                            }
                                            survey = new renderWindow_1.Survey.Model(surveyDef);
                                            survey.locale = locale_1;
                                            survey.mode = 'display';
                                            survey.data = resp ? JSON.parse(resp) : {};
                                            survey.showCompletedPage = false;
                                            survey.showProgressBar = 'off'; // Hide progress bar
                                            // 3. Event Handlers (Replicating surveyRenderPrint.js)
                                            // Append Details Logic
                                            survey.onAfterRenderQuestion.add(function (sender, options) {
                                                if (options.question.hasDetail != true)
                                                    return;
                                                var detailSurveyId = options.question.name + "-Detail";
                                                var detailLabel = (locale_1 === 'fr') ? (options.question.detailFrenchText || "Détail") : (options.question.detailEnglishText || "Detail");
                                                var question = options.htmlElement;
                                                var detailContainer = renderWindow_1.document.createElement("div");
                                                var header = renderWindow_1.document.createElement("div");
                                                var content = renderWindow_1.document.createElement("div");
                                                var detailText = renderWindow_1.document.createElement("span");
                                                var detailSymbol = renderWindow_1.document.createElement("span");
                                                var detailBox = renderWindow_1.document.createElement("textarea");
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
                                                if (sender.getValue(detailSurveyId) != null)
                                                    detailBox.value = sender.getValue(detailSurveyId);
                                            });
                                            // 4. Render
                                            updateProgress(formatSurveyOverall(doneUnits_1, totalSurveyPdfs), "Export \u2014 Work order " + currentExportIndex + " of " + totalExports + woDisplayName + " \u2014 Questionnaire " + currentTaskIndex + " of " + totalQuestionnaires + ": rendering");
                                            renderWindow_1.jQuery(targetId).Survey({ model: survey });
                                            // Wait for rendering with polling
                                            updateProgress(formatSurveyOverall(doneUnits_1, totalSurveyPdfs), "Export \u2014 Work order " + currentExportIndex + " of " + totalExports + woDisplayName + " \u2014 Questionnaire " + currentTaskIndex + " of " + totalQuestionnaires + ": finalizing layout");
                                            return [4 /*yield*/, waitForRender(targetElement, 10000)];
                                        case 2:
                                            _l.sent();
                                            // ---------------------------------------------------------
                                            // FIX: Convert TextAreas to Divs
                                            // ---------------------------------------------------------
                                            updateProgress(formatSurveyOverall(doneUnits_1, totalSurveyPdfs), "Export \u2014 Work order " + currentExportIndex + " of " + totalExports + woDisplayName + " \u2014 Questionnaire " + currentTaskIndex + " of " + totalQuestionnaires + ": formatting");
                                            if (renderWindow_1.jQuery) {
                                                renderWindow_1.jQuery("textarea").each(function (index, el) {
                                                    var val = (renderWindow_1.jQuery(el).val() || "").toString();
                                                    // IMPORTANT: escape user-entered text before inserting into DOM.
                                                    // Using .html(val) allows arbitrary markup injection (including malformed style attributes),
                                                    // which can break html2canvas/html2pdf CSS parsing ("unexpected EOF").
                                                    var newDiv = renderWindow_1.jQuery('<div class="printed-textarea"></div>');
                                                    newDiv.text(val);
                                                    newDiv.html((newDiv.html() || "").replace(/\n/g, "<br />"));
                                                    newDiv.css("white-space", "pre-wrap");
                                                    newDiv.css("word-wrap", "break-word");
                                                    newDiv.css("border", "1px solid #ccc");
                                                    newDiv.css("padding", "5px");
                                                    newDiv.css("min-height", "50px");
                                                    newDiv.addClass("form-control");
                                                    renderWindow_1.jQuery(el).replaceWith(newDiv);
                                                });
                                            }
                                            filename_1 = "WO_" + workOrderIdNoBraces + "_SURVEY_" + taskId + ".pdf";
                                            updateProgress(formatSurveyOverall(doneUnits_1, totalSurveyPdfs), "Export \u2014 Work order " + currentExportIndex + " of " + totalExports + woDisplayName + " \u2014 Questionnaire " + currentTaskIndex + " of " + totalQuestionnaires + ": generating PDF");
                                            options = {
                                                margin: 0.5,
                                                filename: filename_1,
                                                image: { type: 'png', quality: 0.98 },
                                                html2canvas: { scale: 1, useCORS: true },
                                                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
                                            };
                                            return [4 /*yield*/, renderWindow_1.html2pdf().from(targetElement).set(options).output('blob')];
                                        case 3:
                                            blob_1 = _l.sent();
                                            sizeMB_1 = (blob_1.size / (1024 * 1024)).toFixed(2);
                                            console.log("[WOExport] PDF Generated for Work Order Service Task " + taskId + ". Size: " + sizeMB_1 + " MB");
                                            if (blob_1.size < 5 * 1024) {
                                                console.warn("[WOExport] Warning: " + filename_1 + " is unusually small (" + sizeMB_1 + " MB). It may be blank.");
                                            }
                                            // ---------------------------------------------------------
                                            // UPLOAD
                                            // ---------------------------------------------------------
                                            updateProgress(formatSurveyOverall(doneUnits_1, totalSurveyPdfs), "Export \u2014 Work order " + currentExportIndex + " of " + totalExports + woDisplayName + " \u2014 Questionnaire " + currentTaskIndex + " of " + totalQuestionnaires + ": uploading PDF");
                                            return [4 /*yield*/, new Promise(function (resolve, reject) {
                                                    var READER_TIMEOUT_MS = 60000; // 60 seconds max for blob read
                                                    var reader = new FileReader();
                                                    var settled = false;
                                                    var timeoutId = setTimeout(function () {
                                                        if (settled)
                                                            return;
                                                        settled = true;
                                                        reader.abort();
                                                        reject(new Error("FileReader timed out after " + READER_TIMEOUT_MS / 1000 + "s for " + filename_1 + " (" + sizeMB_1 + " MB)"));
                                                    }, READER_TIMEOUT_MS);
                                                    reader.onloadend = function () {
                                                        if (settled)
                                                            return;
                                                        settled = true;
                                                        clearTimeout(timeoutId);
                                                        var result = reader.result;
                                                        if (!result) {
                                                            reject(new Error("FileReader returned empty result for " + filename_1));
                                                            return;
                                                        }
                                                        var data = result.split(',')[1];
                                                        resolve(data);
                                                    };
                                                    reader.onerror = function () {
                                                        var _a;
                                                        if (settled)
                                                            return;
                                                        settled = true;
                                                        clearTimeout(timeoutId);
                                                        reject(new Error("FileReader failed for " + filename_1 + ": " + (((_a = reader.error) === null || _a === void 0 ? void 0 : _a.message) || 'Unknown error')));
                                                    };
                                                    reader.onabort = function () {
                                                        if (settled)
                                                            return;
                                                        settled = true;
                                                        clearTimeout(timeoutId);
                                                        reject(new Error("FileReader aborted for " + filename_1));
                                                    };
                                                    reader.readAsDataURL(blob_1);
                                                })];
                                        case 4:
                                            base64Data = _l.sent();
                                            exportJobId_2 = formContext.data.entity.getId().replace(/[{}]/g, "");
                                            note = {};
                                            note.subject = filename_1;
                                            note.filename = filename_1;
                                            note.isdocument = true;
                                            note.documentbody = base64Data;
                                            note.mimetype = "application/pdf";
                                            note["objectid_ts_workorderexportjob@odata.bind"] = "/ts_workorderexportjobs(" + exportJobId_2 + ")";
                                            return [4 /*yield*/, Xrm.WebApi.createRecord("annotation", note)];
                                        case 5:
                                            _l.sent();
                                            updateProgress(formatSurveyOverall(doneUnits_1, totalSurveyPdfs), "Export \u2014 Work order " + currentExportIndex + " of " + totalExports + woDisplayName + " \u2014 Questionnaire " + currentTaskIndex + " of " + totalQuestionnaires + ": done");
                                            renderedCount++;
                                            uploadedCount++;
                                            // Progress unit completed (one survey PDF)
                                            doneUnits_1++;
                                            return [4 /*yield*/, writeProgress("Questionnaire PDFs: " + Math.min(doneUnits_1, totalSurveyPdfs) + "/" + totalSurveyPdfs)];
                                        case 6:
                                            _l.sent();
                                            return [3 /*break*/, 8];
                                        case 7:
                                            taskError_1 = _l.sent();
                                            errorMessage = "Work Order: " + workOrderIdNoBraces + " - Work order service task: " + taskId + ":\n```\n" + (taskError_1.message || taskError_1.toString()) + "\n```";
                                            errors.push(errorMessage);
                                            console.error("[WOExport] Error processing Work Order Service Task " + taskId + " for Work Order " + workOrderIdNoBraces + ":", taskError_1);
                                            updateProgress(formatSurveyOverall(doneUnits_1, totalSurveyPdfs), "Export \u2014 Work order " + currentExportIndex + " of " + totalExports + woDisplayName + " \u2014 Questionnaire " + currentTaskIndex + " of " + totalQuestionnaires + ": ERROR (" + (taskError_1.message || taskError_1.toString()) + ")");
                                            return [3 /*break*/, 8];
                                        case 8: return [3 /*break*/, 10];
                                        case 9:
                                            skippedCount++;
                                            _l.label = 10;
                                        case 10: return [2 /*return*/];
                                    }
                                });
                            };
                            _f = 0, tasksEntities_1 = tasksEntities;
                            _g.label = 20;
                        case 20:
                            if (!(_f < tasksEntities_1.length)) return [3 /*break*/, 23];
                            task = tasksEntities_1[_f];
                            return [5 /*yield**/, _loop_1(task)];
                        case 21:
                            _g.sent();
                            _g.label = 22;
                        case 22:
                            _f++;
                            return [3 /*break*/, 20];
                        case 23:
                            updateProgress(formatSurveyOverall(doneUnits_1, totalSurveyPdfs), "Export \u2014 Work order " + currentExportIndex + " of " + totalExports + woDisplayName + ": done (" + renderedCount + " PDFs generated, " + skippedCount + " skipped)");
                            console.log("[WOExport] Work Order " + workOrderIdNoBraces + ": tasks=" + tasksTotal + ", rendered=" + renderedCount + ", uploaded=" + uploadedCount + ", skipped=" + skippedCount);
                            _g.label = 24;
                        case 24:
                            _e++;
                            return [3 /*break*/, 15];
                        case 25:
                            if (!(errors.length > 0)) return [3 /*break*/, 27];
                            // Set error status and message
                            formContext.getAttribute("statuscode").setValue(STATUS_ERROR);
                            errorMsgAttr = formContext.getAttribute("ts_errormessage");
                            if (errorMsgAttr) {
                                errorMsgAttr.setValue(errors.join("\n\n"));
                            }
                            clearProgressNotification(formContext);
                            setLeavePageGuard(false);
                            return [4 /*yield*/, formContext.data.save()];
                        case 26:
                            _g.sent();
                            Xrm.Navigation.openAlertDialog({ text: "Export completed with " + errors.length + " error(s). Check error message field for details." });
                            return [3 /*break*/, 30];
                        case 27: return [4 /*yield*/, writeProgress("Questionnaire PDFs: " + Math.min(doneUnits_1, totalSurveyPdfs) + "/" + totalSurveyPdfs + " (complete)", true)];
                        case 28:
                            _g.sent();
                            setProgressNotification(formContext, "Export in progress (background processing continues).", "INFO");
                            formContext.getAttribute("statuscode").setValue(STATUS_READY_FOR_SERVER);
                            setLeavePageGuard(false);
                            return [4 /*yield*/, formContext.data.save()];
                        case 29:
                            _g.sent();
                            if (exportJobId_1) {
                                startProgressPoller(formContext, exportJobId_1);
                            }
                            _g.label = 30;
                        case 30: return [3 /*break*/, 33];
                        case 31:
                            e_6 = _g.sent();
                            console.error("[WOExport] ERROR: ", e_6);
                            clearProgressNotification(formContext);
                            setLeavePageGuard(false);
                            formContext.getAttribute("statuscode").setValue(STATUS_ERROR);
                            errorMsgAttr = formContext.getAttribute("ts_errormessage");
                            if (errorMsgAttr) {
                                errorMsgAttr.setValue(e_6.message || e_6.toString());
                            }
                            return [4 /*yield*/, formContext.data.save()];
                        case 32:
                            _g.sent();
                            Xrm.Navigation.openAlertDialog({ text: "Error processing export job: " + (e_6.message || e_6.toString()) });
                            return [3 /*break*/, 33];
                        case 33: return [2 /*return*/];
                    }
                });
            });
        }
        WorkOrderExportJob.onLoad = onLoad;
    })(WorkOrderExportJob = ROM.WorkOrderExportJob || (ROM.WorkOrderExportJob = {}));
})(ROM || (ROM = {}));
