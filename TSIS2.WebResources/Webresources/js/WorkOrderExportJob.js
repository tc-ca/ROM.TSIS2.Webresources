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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var ROM;
(function (ROM) {
    var WorkOrderExportJob;
    (function (WorkOrderExportJob) {
        // StatusCode Values for ts_workorderexportjob
        var STATUS_ACTIVE = 1;
        var STATUS_CLIENT_PROCESSING = 741130001; // Webresource generating survey PDFs
        var STATUS_READY_FOR_SERVER = 741130002; // Surveys done -> C# builds payload
        var STATUS_READY_FOR_FLOW = 741130003; // Payload ready -> Flow may start
        var STATUS_FLOW_RUNNING = 741130004; // Flow claimed the job (lock)
        var STATUS_READY_FOR_MERGE = 741130005; // MAIN PDFs exist -> C# merge
        var STATUS_COMPLETED = 741130006; // ZIP created
        var STATUS_ERROR = 741130007; // Error
        var progressPollHandle = null;
        var finalizeCheckTimeoutHandle = null;
        var PROGRESS_POLL_INTERVAL_MS = 5000;
        var PROGRESS_WRITE_THROTTLE_MS = 1500;
        var PROGRESS_INDICATOR_UPDATE_THROTTLE_MS = 250;
        var CLIENT_HEARTBEAT_RECENT_MS = 30000;
        var INTERRUPTION_FLAG_PREFIX = "wo_export_interrupted_";
        var DEBUG_LOGS = false;
        var PROGRESS_NOTIFICATION_ID = "wo_export_progress";
        var criticalProgressIndicatorOpen = false;
        var lastCriticalProgressMessage = "";
        var lastCriticalProgressUpdateMs = 0;
        var leaveGuardEnabled = false;
        var leaveGuardJobId = null;
        function debugLog(message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            if (!DEBUG_LOGS)
                return;
            console.log.apply(console, __spreadArray([message], optionalParams));
        }
        var beforeUnloadHandler = function (event) {
            // Modern browsers ignore custom text and show a generic confirmation prompt.
            // Setting returnValue is what triggers: "This page is asking you to confirm..."
            if (leaveGuardJobId) {
                try {
                    localStorage.setItem("" + INTERRUPTION_FLAG_PREFIX + leaveGuardJobId, new Date().toISOString());
                }
                catch (e) {
                    // ignore
                }
            }
            event.preventDefault();
            event.returnValue = "";
            return "";
        };
        function getJobId(formContext) {
            var _a, _b, _c;
            return (((_c = (_b = (_a = formContext === null || formContext === void 0 ? void 0 : formContext.data) === null || _a === void 0 ? void 0 : _a.entity) === null || _b === void 0 ? void 0 : _b.getId) === null || _c === void 0 ? void 0 : _c.call(_b)) || "").replace(/[{}]/g, "");
        }
        function getStatusLabel(status) {
            switch (status) {
                case STATUS_CLIENT_PROCESSING: return "Processing questionnaires";
                case STATUS_READY_FOR_SERVER: return "Preparing export payload";
                case STATUS_READY_FOR_FLOW: return "Queued for main PDF generation";
                case STATUS_FLOW_RUNNING: return "Generating main PDFs";
                case STATUS_READY_FOR_MERGE: return "Merging PDFs and packaging ZIP";
                case STATUS_COMPLETED: return "Completed";
                case STATUS_ERROR: return "Error";
                default: return "Unknown";
            }
        }
        function getStagePrefix(status) {
            if (status === STATUS_CLIENT_PROCESSING)
                return "[Stage 1/3]";
            if (status === STATUS_READY_FOR_SERVER || status === STATUS_READY_FOR_FLOW || status === STATUS_FLOW_RUNNING)
                return "[Stage 2/3]";
            if (status === STATUS_READY_FOR_MERGE)
                return "[Stage 3/3]";
            if (status === STATUS_COMPLETED)
                return "[Completed]";
            if (status === STATUS_ERROR)
                return "[Error]";
            return "[Stage]";
        }
        function formatSurveyOverall(done, total) {
            var safeTotal = Math.max(0, total);
            var safeDone = Math.max(0, Math.min(done, safeTotal));
            var percent = safeTotal > 0 ? Math.round((safeDone * 100) / safeTotal) : 0;
            return "[Stage 1/3] " + safeDone + "/" + safeTotal + " (" + percent + "%)";
        }
        function formatQuestionnaireExportProgress(done, total, complete) {
            if (complete === void 0) { complete = false; }
            var safeTotal = Math.max(0, total);
            var safeDone = Math.max(0, Math.min(done, safeTotal));
            var percent = safeTotal > 0 ? Math.round((safeDone * 100) / safeTotal) : 0;
            return complete
                ? "Questionnaire export: " + safeDone + "/" + safeTotal + " (" + percent + "%) (complete)"
                : "Questionnaire export: " + safeDone + "/" + safeTotal + " (" + percent + "%)";
        }
        function isRecentHeartbeat(heartbeatIso, maxAgeMs) {
            if (!heartbeatIso)
                return false;
            var ts = Date.parse(heartbeatIso);
            if (!Number.isFinite(ts))
                return false;
            return (Date.now() - ts) <= maxAgeMs;
        }
        function formatBackendProgressMessage(status, stageLabel, rawMessage, doneUnits, totalUnits) {
            var percent = totalUnits > 0 ? Math.max(0, Math.min(100, Math.round((doneUnits * 100) / totalUnits))) : 0;
            var msg = (rawMessage || "").trim();
            var stagePrefix = getStagePrefix(status);
            var stageDisplay = stagePrefix + " " + stageLabel;
            var detailMsg = msg;
            // Flow messages sometimes repeat the same stage phrase; strip that prefix from detail.
            var stageLabelLower = (stageLabel || "").trim().toLowerCase();
            var detailLower = detailMsg.toLowerCase();
            if (stageLabelLower && detailLower.startsWith(stageLabelLower)) {
                detailMsg = detailMsg.substring(stageLabel.length).replace(/^[:\-\s]+/, "").trim();
            }
            if (!detailMsg)
                return stageDisplay + " | " + percent + "%";
            // Common pattern from Flow: "Main PDFs: x/y"
            var mainMatch = detailMsg.match(/^Main PDFs:\s*(\d+)\s*\/\s*(\d+)\s*$/i);
            if (mainMatch) {
                var rawDone = Number(mainMatch[1] || 0);
                var rawTotal = Number(mainMatch[2] || 0);
                var total = Math.max(0, rawTotal);
                var done = total > 0 ? Math.max(0, Math.min(rawDone, total)) : Math.max(0, rawDone);
                // If we've already moved to Stage 3, don't keep showing stale Stage 2 "Main PDFs" counters.
                if (status === STATUS_READY_FOR_MERGE) {
                    return stageDisplay + " | " + percent + "% | Starting merge + ZIP";
                }
                var next = (status === STATUS_FLOW_RUNNING && total > 0 && done >= total) ? "Next: merge + ZIP." : "";
                return (stageDisplay + " | " + percent + "% | " + done + " of " + total + " done. " + next).trim();
            }
            // If survey stage completed but we're now in backend, replace technical survey-only messages with a clearer handoff.
            if ((status === STATUS_READY_FOR_SERVER || status === STATUS_READY_FOR_FLOW || status === STATUS_FLOW_RUNNING || status === STATUS_READY_FOR_MERGE) &&
                (detailMsg.toLowerCase().includes("survey pdfs") || detailMsg.toLowerCase().includes("questionnaire pdfs") || detailMsg.toLowerCase().includes("questionnaires") || detailMsg.toLowerCase().includes("questionnaire export")) &&
                detailMsg.toLowerCase().includes("complete")) {
                return stageDisplay + " | " + percent + "% | Questionnaire(s) complete. Continuing with main PDFs and final ZIP...";
            }
            // Default: prefix with stage so message always has context.
            return stageDisplay + " | " + percent + "% | " + detailMsg;
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
                            debugLog("[WOExport] Progress update failed: " + ((e_1 === null || e_1 === void 0 ? void 0 : e_1.message) || e_1));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        function refreshFormAfterCompletion(formContext) {
            return __awaiter(this, void 0, void 0, function () {
                var attempt, e_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            attempt = 0;
                            _a.label = 1;
                        case 1:
                            if (!(attempt < 3)) return [3 /*break*/, 7];
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 4, , 6]);
                            return [4 /*yield*/, formContext.data.refresh(false)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                        case 4:
                            e_2 = _a.sent();
                            if (attempt >= 2)
                                return [2 /*return*/];
                            return [4 /*yield*/, new Promise(function (resolve) { return window.setTimeout(function () { return resolve(); }, 1200); })];
                        case 5:
                            _a.sent();
                            return [3 /*break*/, 6];
                        case 6:
                            attempt++;
                            return [3 /*break*/, 1];
                        case 7: return [2 /*return*/];
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
        function showCriticalProgressIndicator(text, isUnsafeToClose) {
            if (isUnsafeToClose === void 0) { isUnsafeToClose = true; }
            try {
                var header = isUnsafeToClose
                    ? "⚠️ Do not close or refresh this form."
                    : "⏳";
                var detail = text || "Questionnaire export is in progress.";
                var message = isUnsafeToClose ? header + " | " + detail : header + " " + detail;
                if (message === lastCriticalProgressMessage)
                    return;
                var now = Date.now();
                if ((now - lastCriticalProgressUpdateMs) < PROGRESS_INDICATOR_UPDATE_THROTTLE_MS)
                    return;
                if (criticalProgressIndicatorOpen) {
                    Xrm.Utility.closeProgressIndicator();
                    criticalProgressIndicatorOpen = false;
                }
                // Keep one indicator open and update its message in place.
                Xrm.Utility.showProgressIndicator(message);
                criticalProgressIndicatorOpen = true;
                lastCriticalProgressMessage = message;
                lastCriticalProgressUpdateMs = now;
            }
            catch (e) {
                // ignore
            }
        }
        function closeCriticalProgressIndicator() {
            try {
                if (!criticalProgressIndicatorOpen)
                    return;
                Xrm.Utility.closeProgressIndicator();
                criticalProgressIndicatorOpen = false;
                lastCriticalProgressMessage = "";
                lastCriticalProgressUpdateMs = 0;
            }
            catch (e) {
                // ignore
            }
        }
        function setLeavePageGuard(enabled, jobId) {
            try {
                if (enabled) {
                    if (jobId)
                        leaveGuardJobId = jobId;
                    if (leaveGuardEnabled)
                        return;
                    window.addEventListener("beforeunload", beforeUnloadHandler);
                    leaveGuardEnabled = true;
                }
                else {
                    if (!leaveGuardEnabled)
                        return;
                    window.removeEventListener("beforeunload", beforeUnloadHandler);
                    leaveGuardEnabled = false;
                    leaveGuardJobId = null;
                }
            }
            catch (e) {
                // ignore
            }
        }
        function isSurveyPdfFilename(filename) {
            return /^WO_[0-9A-Fa-f-]+_SURVEY_[0-9A-Fa-f-]+\.pdf$/i.test((filename || "").trim());
        }
        function extractSurveyTaskId(filename) {
            var match = (filename || "").trim().match(/^WO_[0-9A-Fa-f-]+_SURVEY_([0-9A-Fa-f-]+)\.pdf$/i);
            return (match === null || match === void 0 ? void 0 : match[1]) ? match[1].toLowerCase() : null;
        }
        function getInterruptionFlagKey(jobId) {
            return "" + INTERRUPTION_FLAG_PREFIX + jobId;
        }
        function consumeInterruptionFlag(jobId) {
            try {
                var key = getInterruptionFlagKey(jobId);
                var found = !!localStorage.getItem(key);
                if (found)
                    localStorage.removeItem(key);
                return found;
            }
            catch (e) {
                return false;
            }
        }
        function clearInterruptionFlag(jobId) {
            try {
                localStorage.removeItem(getInterruptionFlagKey(jobId));
            }
            catch (e) {
                // ignore
            }
        }
        function promptResumeOrCancel() {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Xrm.Navigation.openConfirmDialog({
                                title: "Questionnaire Export Interrupted",
                                text: "The previous questionnaire export appears to have been interrupted by closing or refreshing the form. Select OK to resume, or Cancel to cancel this export job.",
                                confirmButtonLabel: "OK (Resume)",
                                cancelButtonLabel: "Cancel Job"
                            })];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, (result === null || result === void 0 ? void 0 : result.confirmed) ? "resume" : "cancelled"];
                    }
                });
            });
        }
        function getSurveyPdfAnnotations(jobId) {
            return __awaiter(this, void 0, void 0, function () {
                var query, result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            query = "?$select=annotationid,filename" +
                                ("&$filter=_objectid_value eq " + jobId + " and isdocument eq true") +
                                "&$top=5000";
                            return [4 /*yield*/, Xrm.WebApi.retrieveMultipleRecords("annotation", query)];
                        case 1:
                            result = _a.sent();
                            return [2 /*return*/, ((result === null || result === void 0 ? void 0 : result.entities) || [])
                                    .map(function (a) { return ({
                                    annotationid: ((a === null || a === void 0 ? void 0 : a.annotationid) || "").toString(),
                                    filename: ((a === null || a === void 0 ? void 0 : a.filename) || "").toString()
                                }); })
                                    .filter(function (a) { return !!a.annotationid && isSurveyPdfFilename(a.filename); })];
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
            return __awaiter(this, void 0, void 0, function () {
                var q, notes, zipNote, noteId, e_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, tryOpenFinalZipFileColumn(jobId, jobRecord)];
                        case 1:
                            // Mode B: Dataverse File column on the job
                            if (_a.sent()) {
                                return [2 /*return*/];
                            }
                            _a.label = 2;
                        case 2:
                            _a.trys.push([2, 6, , 7]);
                            q = "?$select=annotationid,filename,subject,createdon" +
                                ("&$filter=_objectid_value eq " + jobId + " and isdocument eq true") +
                                "&$orderby=createdon desc" +
                                "&$top=10";
                            return [4 /*yield*/, Xrm.WebApi.retrieveMultipleRecords("annotation", q)];
                        case 3:
                            notes = _a.sent();
                            zipNote = ((notes === null || notes === void 0 ? void 0 : notes.entities) || []).find(function (n) {
                                return (((n === null || n === void 0 ? void 0 : n.filename) || "").toString().toLowerCase().endsWith(".zip"));
                            });
                            noteId = zipNote === null || zipNote === void 0 ? void 0 : zipNote.annotationid;
                            if (!noteId) return [3 /*break*/, 5];
                            return [4 /*yield*/, Xrm.Navigation.navigateTo({
                                    pageType: "entityrecord",
                                    entityName: "annotation",
                                    entityId: noteId
                                }, { target: 1 })];
                        case 4:
                            _a.sent();
                            return [2 /*return*/];
                        case 5: return [3 /*break*/, 7];
                        case 6:
                            e_3 = _a.sent();
                            debugLog("[WOExport] Failed to locate ZIP note: " + ((e_3 === null || e_3 === void 0 ? void 0 : e_3.message) || e_3));
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
                var select, job, status, msg, totalUnits, doneUnits, stageLabel, rawMessage, displayMessage, fileName;
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
                                closeCriticalProgressIndicator();
                                setProgressNotification(formContext, "Error: " + msg, "ERROR");
                                return [2 /*return*/];
                            }
                            totalUnits = Number((job === null || job === void 0 ? void 0 : job.ts_totalunits) || 0);
                            doneUnits = Number((job === null || job === void 0 ? void 0 : job.ts_doneunits) || 0);
                            stageLabel = getStatusLabel(status);
                            rawMessage = ((job === null || job === void 0 ? void 0 : job.ts_progressmessage) || "").trim();
                            displayMessage = formatBackendProgressMessage(status, stageLabel, rawMessage, doneUnits, totalUnits);
                            showCriticalProgressIndicator(displayMessage, status === STATUS_CLIENT_PROCESSING);
                            clearProgressNotification(formContext);
                            if (!(status === STATUS_COMPLETED)) return [3 /*break*/, 3];
                            fileName = ((job === null || job === void 0 ? void 0 : job.ts_finalexportzip_name) || "").toString().trim();
                            if (!fileName) {
                                showCriticalProgressIndicator("Finalizing export...", false);
                                if (finalizeCheckTimeoutHandle === null) {
                                    finalizeCheckTimeoutHandle = window.setTimeout(function () {
                                        finalizeCheckTimeoutHandle = null;
                                        pollAndRenderProgress(formContext, jobId).catch(function () { });
                                    }, 3000); // check if file is in the export job
                                }
                                return [2 /*return*/];
                            }
                            stopProgressPoller(formContext);
                            closeCriticalProgressIndicator();
                            setProgressNotification(formContext, "Export completed. The ZIP is ready to download.", "INFO");
                            return [4 /*yield*/, refreshFormAfterCompletion(formContext)];
                        case 2:
                            _a.sent();
                            return [2 /*return*/];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        function startProgressPoller(formContext, jobId) {
            if (progressPollHandle !== null)
                return;
            progressPollHandle = window.setInterval(function () {
                pollAndRenderProgress(formContext, jobId).catch(function (e) {
                    console.warn("[WOExport] Progress polling error: " + ((e === null || e === void 0 ? void 0 : e.message) || e));
                });
            }, PROGRESS_POLL_INTERVAL_MS);
            // kick once immediately
            pollAndRenderProgress(formContext, jobId).catch(function (e) {
                console.warn("[WOExport] Progress polling error: " + ((e === null || e === void 0 ? void 0 : e.message) || e));
            });
        }
        function stopProgressPoller(formContext) {
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
            var _a, _b, _c, _d, _e;
            return __awaiter(this, void 0, void 0, function () {
                var formContext, formType, renderHostControl, status, jobId, recoveryMode, resumedTaskIds, currentJob, currentStatus, hasInterruptionFlag, hasPartialProgress, heartbeatRecent, isInterruptedRun, existingSurveyNotes, _i, existingSurveyNotes_1, note, existingTaskId, userCancelledMessage, _f, renderHostControl, renderWindow_1, payloadAttr, payloadStr, rawPayload, ids, includeHiddenQuestions, totalExports, exportJobId_1, totalSurveyPdfs, tasksByWorkOrderId, countIndex, _g, ids_1, workOrderId, workOrderIdNoBraces, fetchOptions, tasks, tasksTotal, errorMessage, errorMsgAttr, tasksWithQuestionnaires, errorMessage, errorMsgAttr, totalUnits, doneUnits_1, userSettings, locale_1, cssId, style, currentExportIndex, errors, updateProgress, lastProgressWriteMs_1, writeProgress, _h, ids_2, workOrderId, workOrderIdNoBraces, workOrderName, workOrder, e_4, workOrderLabel, woDisplayName, tasksEntities, tasksTotal, renderedCount, uploadedCount, skippedCount, tasksWithQuestionnaires, totalQuestionnaires, currentTaskIndex, _loop_1, _j, tasksEntities_1, task, errorMsgAttr, e_5, errorMsgAttr;
                var _this = this;
                return __generator(this, function (_k) {
                    switch (_k.label) {
                        case 0:
                            formContext = eContext.getFormContext();
                            // Show internal fields only for Admins
                            if (userHasRole("System Administrator")) {
                                if (formContext.getControl("ts_payloadjson"))
                                    formContext.getControl("ts_payloadjson").setVisible(true);
                                if (formContext.getControl("ts_hiddenquestions"))
                                    formContext.getControl("ts_hiddenquestions").setVisible(true);
                                if (formContext.getControl("ts_finalexportzip"))
                                    formContext.getControl("ts_finalexportzip").setVisible(true);
                                if (formContext.getControl("ts_surveypayloadjson"))
                                    formContext.getControl("ts_surveypayloadjson").setVisible(true);
                            }
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
                            _k.label = 1;
                        case 1:
                            _k.trys.push([1, 41, , 43]);
                            recoveryMode = "none";
                            resumedTaskIds = new Set();
                            if (!jobId) return [3 /*break*/, 13];
                            return [4 /*yield*/, Xrm.WebApi.retrieveRecord("ts_workorderexportjob", jobId, "?$select=statuscode,ts_lastheartbeat,ts_doneunits,ts_progressmessage")];
                        case 2:
                            currentJob = _k.sent();
                            currentStatus = currentJob === null || currentJob === void 0 ? void 0 : currentJob.statuscode;
                            hasInterruptionFlag = consumeInterruptionFlag(jobId);
                            hasPartialProgress = Number((currentJob === null || currentJob === void 0 ? void 0 : currentJob.ts_doneunits) || 0) > 0 ||
                                (((currentJob === null || currentJob === void 0 ? void 0 : currentJob.ts_progressmessage) || "").toString().trim().length > 0);
                            heartbeatRecent = isRecentHeartbeat(currentJob === null || currentJob === void 0 ? void 0 : currentJob.ts_lastheartbeat, CLIENT_HEARTBEAT_RECENT_MS);
                            isInterruptedRun = currentStatus === STATUS_CLIENT_PROCESSING &&
                                (hasInterruptionFlag || (!heartbeatRecent && hasPartialProgress));
                            if (!isInterruptedRun) return [3 /*break*/, 12];
                            return [4 /*yield*/, promptResumeOrCancel()];
                        case 3:
                            recoveryMode = _k.sent();
                            if (!(recoveryMode === "resume")) return [3 /*break*/, 5];
                            return [4 /*yield*/, getSurveyPdfAnnotations(jobId)];
                        case 4:
                            existingSurveyNotes = _k.sent();
                            resumedTaskIds = new Set();
                            for (_i = 0, existingSurveyNotes_1 = existingSurveyNotes; _i < existingSurveyNotes_1.length; _i++) {
                                note = existingSurveyNotes_1[_i];
                                existingTaskId = extractSurveyTaskId(note.filename);
                                if (existingTaskId)
                                    resumedTaskIds.add(existingTaskId);
                            }
                            setProgressNotification(formContext, "Resuming questionnaire export from " + resumedTaskIds.size + " existing PDF(s)...", "INFO");
                            return [3 /*break*/, 11];
                        case 5:
                            userCancelledMessage = "Questionnaire export was interrupted by close/refresh and then cancelled by the user.";
                            return [4 /*yield*/, safeUpdateJob(jobId, {
                                    statuscode: STATUS_ERROR,
                                    ts_errormessage: userCancelledMessage,
                                    ts_progressmessage: userCancelledMessage,
                                    ts_lastheartbeat: new Date().toISOString()
                                })];
                        case 6:
                            _k.sent();
                            clearProgressNotification(formContext);
                            setLeavePageGuard(false);
                            closeCriticalProgressIndicator();
                            clearInterruptionFlag(jobId);
                            _k.label = 7;
                        case 7:
                            _k.trys.push([7, 9, , 10]);
                            return [4 /*yield*/, formContext.data.refresh(false)];
                        case 8:
                            _k.sent();
                            return [3 /*break*/, 10];
                        case 9:
                            _f = _k.sent();
                            return [3 /*break*/, 10];
                        case 10:
                            Xrm.Navigation.openAlertDialog({ text: userCancelledMessage });
                            return [2 /*return*/];
                        case 11: return [3 /*break*/, 13];
                        case 12:
                            if (currentStatus === STATUS_CLIENT_PROCESSING && heartbeatRecent) {
                                setLeavePageGuard(true, jobId);
                                showCriticalProgressIndicator("Questionnaire export is already running. Do not close or refresh this form if you started it.", true);
                                startProgressPoller(formContext, jobId);
                                return [2 /*return*/];
                            }
                            _k.label = 13;
                        case 13:
                            if (jobId) {
                                // Stage 2 is running in this form: warn and prevent accidental close.
                                setLeavePageGuard(true, jobId);
                                clearProgressNotification(formContext);
                            }
                            renderHostControl = formContext.getControl("WebResource_RenderHost");
                            if (!renderHostControl) {
                                throw new Error("WebResource_RenderHost control not found on form.");
                            }
                            return [4 /*yield*/, renderHostControl.getContentWindow()];
                        case 14:
                            renderWindow_1 = _k.sent();
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
                            setProgressNotification(formContext, "Preparing export (1/2): scanning selected work orders...", "INFO");
                            showCriticalProgressIndicator("Preparing export (1/2): scanning selected work orders...");
                            countIndex = 0;
                            _g = 0, ids_1 = ids;
                            _k.label = 15;
                        case 15:
                            if (!(_g < ids_1.length)) return [3 /*break*/, 22];
                            workOrderId = ids_1[_g];
                            countIndex++;
                            workOrderIdNoBraces = workOrderId.replace(/[{}]/g, "");
                            fetchOptions = "?$select=msdyn_workorderservicetaskid,msdyn_name,ovs_questionnairedefinition,ovs_questionnaireresponse" +
                                "&$filter=_msdyn_workorder_value eq " + workOrderIdNoBraces;
                            showCriticalProgressIndicator("Preparing export (1/2): scanning selected work orders (" + countIndex + "/" + totalExports + ")...");
                            return [4 /*yield*/, Xrm.WebApi.retrieveMultipleRecords("msdyn_workorderservicetask", fetchOptions)];
                        case 16:
                            tasks = _k.sent();
                            tasksTotal = tasks.entities.length;
                            if (!(tasksTotal === 0)) return [3 /*break*/, 18];
                            errorMessage = "Work Order " + workOrderIdNoBraces + ": No work order service tasks found";
                            formContext.getAttribute("statuscode").setValue(STATUS_ERROR);
                            errorMsgAttr = formContext.getAttribute("ts_errormessage");
                            if (errorMsgAttr)
                                errorMsgAttr.setValue(errorMessage);
                            clearProgressNotification(formContext);
                            setLeavePageGuard(false);
                            closeCriticalProgressIndicator();
                            return [4 /*yield*/, formContext.data.save()];
                        case 17:
                            _k.sent();
                            Xrm.Navigation.openAlertDialog({ text: errorMessage });
                            return [2 /*return*/];
                        case 18:
                            tasksWithQuestionnaires = tasks.entities.filter(function (task) {
                                return task.ovs_questionnairedefinition && task.ovs_questionnaireresponse;
                            });
                            if (!(tasksWithQuestionnaires.length === 0)) return [3 /*break*/, 20];
                            errorMessage = "Work Order " + workOrderIdNoBraces + ": No questionnaires found in any service tasks";
                            formContext.getAttribute("statuscode").setValue(STATUS_ERROR);
                            errorMsgAttr = formContext.getAttribute("ts_errormessage");
                            if (errorMsgAttr)
                                errorMsgAttr.setValue(errorMessage);
                            clearProgressNotification(formContext);
                            setLeavePageGuard(false);
                            closeCriticalProgressIndicator();
                            return [4 /*yield*/, formContext.data.save()];
                        case 19:
                            _k.sent();
                            Xrm.Navigation.openAlertDialog({ text: errorMessage });
                            return [2 /*return*/];
                        case 20:
                            tasksByWorkOrderId[workOrderIdNoBraces] = tasks.entities;
                            totalSurveyPdfs += tasksWithQuestionnaires.length;
                            _k.label = 21;
                        case 21:
                            _g++;
                            return [3 /*break*/, 15];
                        case 22:
                            totalUnits = totalSurveyPdfs + (3 * totalExports) + 1;
                            doneUnits_1 = 0;
                            if (recoveryMode === "resume" && resumedTaskIds.size > 0) {
                                doneUnits_1 = Math.max(0, Math.min(totalSurveyPdfs, resumedTaskIds.size));
                            }
                            if (!exportJobId_1) return [3 /*break*/, 24];
                            return [4 /*yield*/, safeUpdateJob(exportJobId_1, {
                                    ts_totalunits: totalUnits,
                                    ts_doneunits: doneUnits_1,
                                    ts_progressmessage: formatQuestionnaireExportProgress(doneUnits_1, totalSurveyPdfs),
                                    ts_lastheartbeat: new Date().toISOString()
                                })];
                        case 23:
                            _k.sent();
                            _k.label = 24;
                        case 24:
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
                                var combined = overallMessage;
                                if (detailMessage) {
                                    var lastSep = detailMessage.lastIndexOf("|");
                                    if (lastSep >= 0) {
                                        var left = detailMessage.substring(0, lastSep).trim();
                                        var action = detailMessage.substring(lastSep + 1).trim();
                                        var actionLower = action.toLowerCase();
                                        var icon = actionLower.includes("error") ? "❌ " :
                                            actionLower.includes("done") ? "✅ " :
                                                actionLower.includes("upload") ? "⬆️ " :
                                                    actionLower.includes("render") ? "🖨️ " :
                                                        actionLower.includes("format") ? "🧩 " :
                                                            actionLower.includes("generating") ? "📄 " :
                                                                actionLower.includes("prepar") ? "⏳ " : "";
                                        combined = left + " | " + overallMessage + " | " + icon + action;
                                    }
                                    else {
                                        combined = detailMessage + " | " + overallMessage;
                                    }
                                }
                                showCriticalProgressIndicator(combined);
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
                            _h = 0, ids_2 = ids;
                            _k.label = 25;
                        case 25:
                            if (!(_h < ids_2.length)) return [3 /*break*/, 35];
                            workOrderId = ids_2[_h];
                            currentExportIndex++;
                            workOrderIdNoBraces = workOrderId.replace(/[{}]/g, "");
                            workOrderName = "";
                            _k.label = 26;
                        case 26:
                            _k.trys.push([26, 28, , 29]);
                            return [4 /*yield*/, Xrm.WebApi.retrieveRecord("msdyn_workorder", workOrderIdNoBraces, "?$select=msdyn_name")];
                        case 27:
                            workOrder = _k.sent();
                            workOrderName = workOrder.msdyn_name || "";
                            return [3 /*break*/, 29];
                        case 28:
                            e_4 = _k.sent();
                            debugLog("[WOExport] Could not retrieve work order name for " + workOrderIdNoBraces + ": " + e_4.message);
                            return [3 /*break*/, 29];
                        case 29:
                            workOrderLabel = workOrderName
                                ? workOrderIdNoBraces + " (" + workOrderName + ")"
                                : workOrderIdNoBraces;
                            woDisplayName = workOrderName ? " (" + workOrderName + ")" : "";
                            updateProgress(formatSurveyOverall(doneUnits_1, totalSurveyPdfs), "Work order " + currentExportIndex + "/" + totalExports + woDisplayName + " | Starting");
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
                                var taskId, normalizedTaskId, taskName, def, resp, taskStage, elementPrint, elementNormal, targetElement, targetId, surveyDef, _l, _m, page, els, _o, els_1, el, survey, converter_1, filename_1, options, blob_1, sizeMB_1, base64Data, exportJobId_2, note, taskError_1, taskLabel, userGuidance, errorMessage, errCode, errTitle, errMsg;
                                return __generator(this, function (_p) {
                                    switch (_p.label) {
                                        case 0:
                                            taskId = ((_d = task.msdyn_workorderservicetaskid) === null || _d === void 0 ? void 0 : _d.replace(/[{}]/g, "")) || "unknown";
                                            normalizedTaskId = taskId.toLowerCase();
                                            taskName = (task.msdyn_name || "").toString().trim() || "Unknown";
                                            if (!(task.ovs_questionnairedefinition && task.ovs_questionnaireresponse)) return [3 /*break*/, 9];
                                            currentTaskIndex++;
                                            if (recoveryMode === "resume" && resumedTaskIds.has(normalizedTaskId)) {
                                                skippedCount++;
                                                return [2 /*return*/, "continue"];
                                            }
                                            debugLog("[WOExport][TaskStart] wo=" + workOrderIdNoBraces + " woName=" + (workOrderName || "-") + " task=" + taskId + " idx=" + currentTaskIndex + "/" + totalQuestionnaires);
                                            def = task.ovs_questionnairedefinition;
                                            resp = task.ovs_questionnaireresponse;
                                            taskStage = "start";
                                            _p.label = 1;
                                        case 1:
                                            _p.trys.push([1, 7, , 8]);
                                            taskStage = "prepare";
                                            updateProgress(formatSurveyOverall(doneUnits_1, totalSurveyPdfs), "Work order " + currentExportIndex + "/" + totalExports + woDisplayName + " | Questionnaire " + currentTaskIndex + "/" + totalQuestionnaires + " | Preparing");
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
                                                console.error("[WOExport] Error parsing survey definition for Work Order Service Task " + taskId + ": " + parseError.message);
                                                return [2 /*return*/, "continue"];
                                            }
                                            // If includeHiddenQuestions is true: clear visibleIf on ALL elements on ALL pages
                                            // If false: do nothing (keep original visibleIf)
                                            if (includeHiddenQuestions) {
                                                for (_l = 0, _m = surveyDef.pages; _l < _m.length; _l++) {
                                                    page = _m[_l];
                                                    els = page === null || page === void 0 ? void 0 : page.elements;
                                                    if (!Array.isArray(els))
                                                        continue;
                                                    for (_o = 0, els_1 = els; _o < els_1.length; _o++) {
                                                        el = els_1[_o];
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
                                            // Match normal Survey renderer behavior: convert markdown/HTML text blocks
                                            // so question titles/descriptions render formatted text instead of raw tags.
                                            if (renderWindow_1.showdown) {
                                                converter_1 = new renderWindow_1.showdown.Converter();
                                                survey.onTextMarkdown.add(function (_sender, options) {
                                                    var str = converter_1.makeHtml(options.text || "");
                                                    if (str.indexOf("<p>") === 0) {
                                                        str = str.substring(3);
                                                        str = str.substring(0, str.length - 4);
                                                    }
                                                    options.html = str;
                                                });
                                            }
                                            // 3. Event Handlers (Replicating surveyRenderPrint.js)
                                            // Append Details Logic
                                            survey.onAfterRenderQuestion.add(function (sender, options) {
                                                if (options.question.hasDetail != true)
                                                    return;
                                                var detailSurveyId = options.question.name + "-Detail";
                                                var detailLabel = (locale_1 === 'fr') ? (options.question.detailFrenchText || "Detail") : (options.question.detailEnglishText || "Detail");
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
                                            updateProgress(formatSurveyOverall(doneUnits_1, totalSurveyPdfs), "Work order " + currentExportIndex + "/" + totalExports + woDisplayName + " | Questionnaire " + currentTaskIndex + "/" + totalQuestionnaires + " | Rendering");
                                            taskStage = "render";
                                            renderWindow_1.jQuery(targetId).Survey({ model: survey });
                                            // Wait for rendering with polling
                                            updateProgress(formatSurveyOverall(doneUnits_1, totalSurveyPdfs), "Work order " + currentExportIndex + "/" + totalExports + woDisplayName + " | Questionnaire " + currentTaskIndex + "/" + totalQuestionnaires + " | Finalizing layout");
                                            taskStage = "finalize-layout";
                                            return [4 /*yield*/, waitForRender(targetElement, 10000)];
                                        case 2:
                                            _p.sent();
                                            // ---------------------------------------------------------
                                            // FIX: Convert TextAreas to Divs
                                            // ---------------------------------------------------------
                                            updateProgress(formatSurveyOverall(doneUnits_1, totalSurveyPdfs), "Work order " + currentExportIndex + "/" + totalExports + woDisplayName + " | Questionnaire " + currentTaskIndex + "/" + totalQuestionnaires + " | Formatting");
                                            taskStage = "format";
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
                                            updateProgress(formatSurveyOverall(doneUnits_1, totalSurveyPdfs), "Work order " + currentExportIndex + "/" + totalExports + woDisplayName + " | Questionnaire " + currentTaskIndex + "/" + totalQuestionnaires + " | Generating");
                                            taskStage = "generate-pdf";
                                            options = {
                                                margin: 0.5,
                                                filename: filename_1,
                                                image: { type: 'png', quality: 0.98 },
                                                html2canvas: { scale: 1, useCORS: true },
                                                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
                                            };
                                            return [4 /*yield*/, renderWindow_1.html2pdf().from(targetElement).set(options).output('blob')];
                                        case 3:
                                            blob_1 = _p.sent();
                                            sizeMB_1 = (blob_1.size / (1024 * 1024)).toFixed(2);
                                            debugLog("[WOExport] PDF Generated for Work Order Service Task " + taskId + ". Size: " + sizeMB_1 + " MB");
                                            if (blob_1.size < 5 * 1024) {
                                                console.warn("[WOExport] Warning: " + filename_1 + " is unusually small (" + sizeMB_1 + " MB). It may be blank.");
                                            }
                                            // ---------------------------------------------------------
                                            // UPLOAD
                                            // ---------------------------------------------------------
                                            updateProgress(formatSurveyOverall(doneUnits_1, totalSurveyPdfs), "Work order " + currentExportIndex + "/" + totalExports + woDisplayName + " | Questionnaire " + currentTaskIndex + "/" + totalQuestionnaires + " | Uploading");
                                            taskStage = "upload";
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
                                            base64Data = _p.sent();
                                            exportJobId_2 = formContext.data.entity.getId().replace(/[{}]/g, "");
                                            note = {};
                                            note.subject = filename_1;
                                            note.filename = filename_1;
                                            note.isdocument = true;
                                            note.documentbody = base64Data;
                                            note.mimetype = "application/pdf";
                                            note["objectid_ts_workorderexportjob@odata.bind"] = "/ts_workorderexportjobs(" + exportJobId_2 + ")";
                                            taskStage = "create-annotation";
                                            return [4 /*yield*/, Xrm.WebApi.createRecord("annotation", note)];
                                        case 5:
                                            _p.sent();
                                            updateProgress(formatSurveyOverall(doneUnits_1, totalSurveyPdfs), "Work order " + currentExportIndex + "/" + totalExports + woDisplayName + " | Questionnaire " + currentTaskIndex + "/" + totalQuestionnaires + " | Done");
                                            renderedCount++;
                                            uploadedCount++;
                                            debugLog("[WOExport][TaskDone] wo=" + workOrderIdNoBraces + " task=" + taskId + " sizeMB=" + sizeMB_1 + " uploaded=1");
                                            // Progress unit completed (one survey PDF)
                                            doneUnits_1++;
                                            return [4 /*yield*/, writeProgress(formatQuestionnaireExportProgress(doneUnits_1, totalSurveyPdfs))];
                                        case 6:
                                            _p.sent();
                                            return [3 /*break*/, 8];
                                        case 7:
                                            taskError_1 = _p.sent();
                                            taskLabel = taskId + " (" + taskName + ")";
                                            userGuidance = "Please try again. If this keeps failing, retry the export without this Work Order/Service Task.";
                                            errorMessage = "Work Order: " + workOrderLabel + "\n" +
                                                ("Work Order Service Task: " + taskLabel + "\n") +
                                                ("Error: " + (taskError_1.message || taskError_1.toString()) + "\n") +
                                                ("" + userGuidance);
                                            errors.push(errorMessage);
                                            errCode = (taskError_1 === null || taskError_1 === void 0 ? void 0 : taskError_1.errorCode) || (taskError_1 === null || taskError_1 === void 0 ? void 0 : taskError_1.code) || "n/a";
                                            errTitle = (taskError_1 === null || taskError_1 === void 0 ? void 0 : taskError_1.title) || "n/a";
                                            errMsg = (taskError_1 === null || taskError_1 === void 0 ? void 0 : taskError_1.message) || ((_e = taskError_1 === null || taskError_1 === void 0 ? void 0 : taskError_1.toString) === null || _e === void 0 ? void 0 : _e.call(taskError_1)) || "Unknown error";
                                            console.error("[WOExport][TaskError] wo=" + workOrderIdNoBraces + " task=" + taskId + " stage=" + taskStage + " code=" + errCode + " title=" + errTitle + " msg=" + errMsg);
                                            console.error("[WOExport] Error processing Work Order Service Task " + taskId + " for Work Order " + workOrderIdNoBraces + ":", taskError_1);
                                            updateProgress(formatSurveyOverall(doneUnits_1, totalSurveyPdfs), "Work order " + currentExportIndex + "/" + totalExports + woDisplayName + " | Questionnaire " + currentTaskIndex + "/" + totalQuestionnaires + " | Error: " + (taskError_1.message || taskError_1.toString()));
                                            return [3 /*break*/, 8];
                                        case 8: return [3 /*break*/, 10];
                                        case 9:
                                            skippedCount++;
                                            _p.label = 10;
                                        case 10: return [2 /*return*/];
                                    }
                                });
                            };
                            _j = 0, tasksEntities_1 = tasksEntities;
                            _k.label = 30;
                        case 30:
                            if (!(_j < tasksEntities_1.length)) return [3 /*break*/, 33];
                            task = tasksEntities_1[_j];
                            return [5 /*yield**/, _loop_1(task)];
                        case 31:
                            _k.sent();
                            _k.label = 32;
                        case 32:
                            _j++;
                            return [3 /*break*/, 30];
                        case 33:
                            updateProgress(formatSurveyOverall(doneUnits_1, totalSurveyPdfs), "Work order " + currentExportIndex + "/" + totalExports + woDisplayName + " | Completed (" + renderedCount + " PDFs generated, " + skippedCount + " skipped)");
                            debugLog("[WOExport] Work Order " + workOrderIdNoBraces + ": tasks=" + tasksTotal + ", rendered=" + renderedCount + ", uploaded=" + uploadedCount + ", skipped=" + skippedCount);
                            _k.label = 34;
                        case 34:
                            _h++;
                            return [3 /*break*/, 25];
                        case 35:
                            if (!(errors.length > 0)) return [3 /*break*/, 37];
                            // Set error status and message
                            formContext.getAttribute("statuscode").setValue(STATUS_ERROR);
                            errorMsgAttr = formContext.getAttribute("ts_errormessage");
                            if (errorMsgAttr) {
                                errorMsgAttr.setValue(errors.join("\n\n"));
                            }
                            clearProgressNotification(formContext);
                            setLeavePageGuard(false);
                            closeCriticalProgressIndicator();
                            if (exportJobId_1)
                                clearInterruptionFlag(exportJobId_1);
                            return [4 /*yield*/, formContext.data.save()];
                        case 36:
                            _k.sent();
                            Xrm.Navigation.openAlertDialog({ text: "Export completed with " + errors.length + " error(s). Check error message field for details." });
                            return [3 /*break*/, 40];
                        case 37: return [4 /*yield*/, writeProgress(formatQuestionnaireExportProgress(doneUnits_1, totalSurveyPdfs, true), true)];
                        case 38:
                            _k.sent();
                            closeCriticalProgressIndicator();
                            clearProgressNotification(formContext);
                            formContext.getAttribute("statuscode").setValue(STATUS_READY_FOR_SERVER);
                            setLeavePageGuard(false);
                            closeCriticalProgressIndicator();
                            if (exportJobId_1)
                                clearInterruptionFlag(exportJobId_1);
                            return [4 /*yield*/, formContext.data.save()];
                        case 39:
                            _k.sent();
                            if (exportJobId_1) {
                                startProgressPoller(formContext, exportJobId_1);
                            }
                            _k.label = 40;
                        case 40: return [3 /*break*/, 43];
                        case 41:
                            e_5 = _k.sent();
                            console.error("[WOExport] ERROR: ", e_5);
                            clearProgressNotification(formContext);
                            setLeavePageGuard(false);
                            closeCriticalProgressIndicator();
                            if (jobId)
                                clearInterruptionFlag(jobId);
                            formContext.getAttribute("statuscode").setValue(STATUS_ERROR);
                            errorMsgAttr = formContext.getAttribute("ts_errormessage");
                            if (errorMsgAttr) {
                                errorMsgAttr.setValue(e_5.message || e_5.toString());
                            }
                            return [4 /*yield*/, formContext.data.save()];
                        case 42:
                            _k.sent();
                            Xrm.Navigation.openAlertDialog({ text: "Error processing export job: " + (e_5.message || e_5.toString()) });
                            return [3 /*break*/, 43];
                        case 43: return [2 /*return*/];
                    }
                });
            });
        }
        WorkOrderExportJob.onLoad = onLoad;
    })(WorkOrderExportJob = ROM.WorkOrderExportJob || (ROM.WorkOrderExportJob = {}));
})(ROM || (ROM = {}));
