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
        function getBackendStallDeadAfterMinutes(fallback) {
            var _a;
            var parsed = Number((_a = window.WORK_ORDER_EXPORT_TIMING) === null || _a === void 0 ? void 0 : _a.BACKEND_STALL_DEAD_AFTER_MINUTES);
            return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
        }
        // StatusCode Values for ts_workorderexportjob
        var STATUS_CLIENT_PROCESSING = 741130001; // Webresource generating survey PDFs
        var STATUS_READY_FOR_SERVER = 741130002; // Surveys done -> C# builds payload
        var STATUS_READY_FOR_FLOW = 741130003; // Payload ready -> Flow may start
        var STATUS_FLOW_RUNNING = 741130004; // Flow claimed the job (lock)
        var STATUS_READY_FOR_MERGE = 741130005; // MAIN PDFs exist -> C# merge
        var STATUS_COMPLETED = 741130006; // ZIP created
        var STATUS_ERROR = 741130007; // Error
        var STATUS_MERGE_IN_PROGRESS = 741130008;
        var STATUS_READY_FOR_ZIP = 741130009;
        var STATUS_ZIP_IN_PROGRESS = 741130010;
        var STATUS_READY_FOR_CLEANUP = 741130011;
        var STATUS_CLEANUP_IN_PROGRESS = 741130012;
        var STAGE2_STATUSES = [STATUS_READY_FOR_SERVER, STATUS_READY_FOR_FLOW, STATUS_FLOW_RUNNING];
        var STAGE3_STATUSES = [
            STATUS_READY_FOR_MERGE,
            STATUS_MERGE_IN_PROGRESS,
            STATUS_READY_FOR_ZIP,
            STATUS_ZIP_IN_PROGRESS,
            STATUS_READY_FOR_CLEANUP,
            STATUS_CLEANUP_IN_PROGRESS
        ];
        var BACKEND_IN_PROGRESS_STATUSES = __spreadArray(__spreadArray([], STAGE2_STATUSES), STAGE3_STATUSES);
        var POLL_ONLY_STATUSES = __spreadArray(__spreadArray([], BACKEND_IN_PROGRESS_STATUSES), [STATUS_COMPLETED, STATUS_ERROR]);
        var progressPollHandle = null;
        var finalizeCheckTimeoutHandle = null;
        var finalizeWaitStartedAtMs = null;
        var isProgressPollInFlight = false;
        var hasPendingProgressPoll = false;
        var PROGRESS_POLL_INTERVAL_MS = 5000;
        var FINALIZE_MAX_WAIT_MS = 20000;
        var PROGRESS_WRITE_THROTTLE_MS = 1500;
        var PROGRESS_INDICATOR_UPDATE_THROTTLE_MS = 250;
        var CLIENT_HEARTBEAT_RECENT_MS = 30000;
        var STALL_WATCHDOG_INTERVAL_MS = 10000;
        var STAGE1_STALL_TIMEOUT_MS = 4 * 60000;
        // Treat backend processing as stalled only after this many minutes without a fresh
        // heartbeat or record update. This is the dead/stalled threshold used by the form poller.
        var BACKEND_STALL_DEAD_AFTER_MINUTES = getBackendStallDeadAfterMinutes(10);
        var BACKEND_STALL_TIMEOUT_MS = BACKEND_STALL_DEAD_AFTER_MINUTES * 60000;
        var BACKEND_LONG_RUNNING_NOTICE_MS = 4 * 60000;
        var BACKEND_OVERLAY_MAX_AGE_MS = 110000;
        var MAX_AUTO_RESUME_ATTEMPTS = 5;
        var MAX_SAME_CONTEXT_STALLS = 2;
        var DEBUG_LOGS = false;
        // Increase RENDER_HOST_COUNT and add matching WebResource_RenderHost_N controls for more parallelized rendering
        var RENDER_HOST_COUNT = 2;
        var RENDER_HOST_CONTROL_PREFIX = "WebResource_RenderHost_";
        var PROGRESS_NOTIFICATION_ID = "wo_export_progress";
        var criticalProgressIndicatorOpen = false;
        var lastCriticalProgressMessage = "";
        var lastCriticalProgressUpdateMs = 0;
        var leaveGuardEnabled = false;
        function getResx(key) {
            try {
                var s = Xrm.Utility.getResourceString("ts_/resx/WorkOrderExport", key);
                return (s && s.trim()) || key;
            }
            catch (_a) {
                return key;
            }
        }
        function getFinalizingProgressText() {
            return getResx("FinalizingExportRefreshing");
        }
        var leaveGuardJobId = null;
        var lastPolledStatusForDebug = null;
        function debugLog(message) {
            var optionalParams = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                optionalParams[_i - 1] = arguments[_i];
            }
            if (!DEBUG_LOGS)
                return;
            console.log.apply(console, __spreadArray([message], optionalParams));
        }
        function getErrorText(error) {
            var _a, _b, _c, _d;
            if (!error)
                return "Unknown error";
            var direct = (error.message || ((_a = error.toString) === null || _a === void 0 ? void 0 : _a.call(error)) || "").toString().trim();
            var inner = (((_b = error === null || error === void 0 ? void 0 : error.error) === null || _b === void 0 ? void 0 : _b.message) || ((_d = (_c = error === null || error === void 0 ? void 0 : error.error) === null || _c === void 0 ? void 0 : _c.innererror) === null || _d === void 0 ? void 0 : _d.message) || "").toString().trim();
            return (direct || inner || "Unknown error").trim();
        }
        function runBestEffort(fn) {
            try {
                fn();
            }
            catch (_a) { }
        }
        function waitForRenderHostRuntime(renderWindow, hostName, timeoutMs) {
            var _a;
            if (timeoutMs === void 0) { timeoutMs = 15000; }
            return __awaiter(this, void 0, void 0, function () {
                var start, hasSurvey, hasHtml2Pdf, hasJquery;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            start = Date.now();
                            _b.label = 1;
                        case 1:
                            if (!((Date.now() - start) < timeoutMs)) return [3 /*break*/, 3];
                            hasSurvey = !!((_a = renderWindow === null || renderWindow === void 0 ? void 0 : renderWindow.Survey) === null || _a === void 0 ? void 0 : _a.Model);
                            hasHtml2Pdf = typeof (renderWindow === null || renderWindow === void 0 ? void 0 : renderWindow.html2pdf) === "function";
                            hasJquery = typeof (renderWindow === null || renderWindow === void 0 ? void 0 : renderWindow.jQuery) === "function";
                            if (hasSurvey && hasHtml2Pdf && hasJquery)
                                return [2 /*return*/];
                            return [4 /*yield*/, new Promise(function (resolve) { return window.setTimeout(resolve, 200); })];
                        case 2:
                            _b.sent();
                            return [3 /*break*/, 1];
                        case 3: throw new Error("Render host '" + hostName + "' did not finish loading required libraries (Survey/html2pdf/jQuery). ");
                    }
                });
            });
        }
        function pollDebug(jobId, phase, details) {
            if (!DEBUG_LOGS)
                return;
            console.log("[WOExport][Poll][" + jobId + "] " + phase + (details ? " | " + details : ""));
        }
        var beforeUnloadHandler = function (event) {
            if (leaveGuardJobId) {
                var jobId_1 = leaveGuardJobId;
                runBestEffort(function () {
                    return localStorage.setItem(getInterruptionFlagKey(jobId_1), new Date().toISOString());
                });
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
        function getStagePrefix(status) {
            if (status === STATUS_CLIENT_PROCESSING)
                return "[Stage 1/3]";
            if (isStage2Status(status))
                return "[Stage 2/3]";
            if (isStage3Status(status))
                return "[Stage 3/3]";
            if (status === STATUS_COMPLETED)
                return "[Completed]";
            if (status === STATUS_ERROR)
                return "[Error]";
            return "[Stage]";
        }
        function isStatusInList(status, statuses) {
            return status != null && statuses.includes(status);
        }
        function isStage2Status(status) {
            return isStatusInList(status, STAGE2_STATUSES);
        }
        function isStage3Status(status) {
            return isStatusInList(status, STAGE3_STATUSES);
        }
        var STAGE1_PREFIX = "[Stage 1/3] Preparing questionnaires...";
        function formatSurveyOverall(done, total) {
            var pct = getStage1Percent(done, total);
            return STAGE1_PREFIX + " (" + formatRatio(done, total) + ") - " + pct + "%";
        }
        /** Stage 1 detail: WO | Q (done/total) - XX% | action. Percentage from questionnaire count (done/total survey PDFs). */
        function formatStage1DetailWithWoFirst(woIdx, totalWos, taskIdx, totalTasksInWo, doneUnits, totalUnits, action) {
            var pct = getStage1Percent(doneUnits, totalUnits);
            return formatWorkOrderTaskProgress(woIdx, totalWos, taskIdx, totalTasksInWo) + " (" + formatRatio(doneUnits, totalUnits) + ") - " + pct + "% | " + action;
        }
        function formatQuestionnaireExportProgress(done, total, complete) {
            if (complete === void 0) { complete = false; }
            var overall = formatSurveyOverall(done, total);
            var isActuallyComplete = complete && Math.max(0, done) >= Math.max(0, total);
            return complete
                ? (isActuallyComplete
                    ? overall + " | Waiting for document generation."
                    : overall + " | Questionnaire export incomplete")
                : overall + " | Questionnaire export";
        }
        function formatStage1Preparation(detail) {
            return "[Stage 1/3] Initializing | " + detail;
        }
        function formatWorkOrderTaskProgress(workOrderIndex, totalWorkOrders, taskIndex, totalTasksInWorkOrder) {
            return "WO " + workOrderIndex + "/" + totalWorkOrders + " | Q " + taskIndex + "/" + totalTasksInWorkOrder;
        }
        function formatRatio(done, total) {
            var safeTotal = Math.max(0, total);
            var safeDone = Math.max(0, Math.min(done, safeTotal));
            return safeDone + "/" + safeTotal;
        }
        function getStage1Percent(done, total) {
            var safeTotal = Math.max(0, total);
            var safeDone = Math.max(0, Math.min(done, safeTotal));
            return safeTotal > 0 ? Math.round((safeDone * 100) / safeTotal) : 0;
        }
        function formatRatioWithPercent(done, total) {
            var r = formatRatio(done, total);
            var p = getStage1Percent(done, total);
            return r + ", " + p + "%";
        }
        function formatStageProgress(stagePrefix, actionLabel, overallPercent, detail) {
            var percentSuffix = typeof overallPercent === "number" ? " | Overall " + overallPercent + "%" : "";
            return detail
                ? stagePrefix + " " + actionLabel + " " + detail + percentSuffix
                : stagePrefix + " " + actionLabel + percentSuffix;
        }
        function formatStageProgressWithRatio(stagePrefix, actionLabel, done, total, overallPercent) {
            return formatStageProgress(stagePrefix, actionLabel, overallPercent, "(" + formatRatioWithPercent(done, total) + ")");
        }
        function formatSkipBreakdown(emptyCount, invalidDefinitionCount, noQuestionnaireCount, erroredCount) {
            var parts = [];
            if (emptyCount > 0)
                parts.push(emptyCount + " empty");
            if (invalidDefinitionCount > 0)
                parts.push(invalidDefinitionCount + " invalid definition");
            if (noQuestionnaireCount > 0)
                parts.push(noQuestionnaireCount + " no questionnaire");
            if (erroredCount > 0)
                parts.push(erroredCount + " errored");
            return parts.length > 0 ? " (" + parts.join(", ") + ")" : "";
        }
        function isRecentHeartbeat(heartbeatIso, maxAgeMs) {
            if (!heartbeatIso)
                return false;
            var ts = Date.parse(heartbeatIso);
            if (!Number.isFinite(ts))
                return false;
            return (Date.now() - ts) <= maxAgeMs;
        }
        function isBackendInProgressStatus(status) {
            return isStatusInList(status, BACKEND_IN_PROGRESS_STATUSES);
        }
        function parseDateMs(value) {
            if (!value)
                return NaN;
            var ts = Date.parse(value);
            return Number.isFinite(ts) ? ts : NaN;
        }
        function isLikelyStalledBackendJob(job, status) {
            if (!isBackendInProgressStatus(status))
                return false;
            var now = Date.now();
            var heartbeatMs = parseDateMs(job === null || job === void 0 ? void 0 : job.ts_lastheartbeat);
            var modifiedMs = parseDateMs(job === null || job === void 0 ? void 0 : job.modifiedon);
            var heartbeatStale = Number.isFinite(heartbeatMs) ? (now - heartbeatMs) >= BACKEND_STALL_TIMEOUT_MS : true;
            var modifiedStale = Number.isFinite(modifiedMs) ? (now - modifiedMs) >= BACKEND_STALL_TIMEOUT_MS : true;
            var hasPartialProgress = Number((job === null || job === void 0 ? void 0 : job.ts_doneunits) || 0) > 0 ||
                (((job === null || job === void 0 ? void 0 : job.ts_progressmessage) || "").toString().trim().length > 0) ||
                Number((job === null || job === void 0 ? void 0 : job.ts_nextmergeindex) || 0) > 0;
            return heartbeatStale && modifiedStale && hasPartialProgress;
        }
        function getBackendActivityAgeMs(job) {
            var heartbeatMs = parseDateMs(job === null || job === void 0 ? void 0 : job.ts_lastheartbeat);
            var modifiedMs = parseDateMs(job === null || job === void 0 ? void 0 : job.modifiedon);
            var latestActivityMs = Math.max(Number.isFinite(heartbeatMs) ? heartbeatMs : -1, Number.isFinite(modifiedMs) ? modifiedMs : -1);
            if (!Number.isFinite(latestActivityMs) || latestActivityMs <= 0)
                return NaN;
            return Date.now() - latestActivityMs;
        }
        function getLongRunningBackendNotice(job, status) {
            if (!isBackendInProgressStatus(status))
                return null;
            var activityAgeMs = getBackendActivityAgeMs(job);
            if (!Number.isFinite(activityAgeMs) || activityAgeMs < BACKEND_LONG_RUNNING_NOTICE_MS) {
                return null;
            }
            var ageMinutes = Math.max(1, Math.floor(activityAgeMs / 60000));
            return "⚠️ " + getResx("LongRunningNotice").replace("{0}", String(ageMinutes));
        }
        function shouldShowBlockingProgressOverlay(job, status) {
            if (status === STATUS_CLIENT_PROCESSING)
                return true;
            if (!isBackendInProgressStatus(status))
                return false;
            var activityAgeMs = getBackendActivityAgeMs(job);
            if (!Number.isFinite(activityAgeMs))
                return false;
            // Only keep the blocking overlay open while backend activity still looks fresh.
            // Polling and non-blocking progress updates continue after the overlay is closed.
            return activityAgeMs < BACKEND_OVERLAY_MAX_AGE_MS;
        }
        function formatBackendProgressMessage(status, stageLabel, rawMessage, doneUnits, totalUnits, nextMergeIndex) {
            var rawPercent = totalUnits > 0 ? Math.max(0, Math.min(100, Math.round((doneUnits * 100) / totalUnits))) : 0;
            var percent = status === STATUS_COMPLETED ? rawPercent : Math.min(99, rawPercent);
            var msg = (rawMessage || "").trim();
            var stagePrefix = getStagePrefix(status);
            var stageDisplay = stagePrefix + " " + stageLabel;
            var detailMsg = msg;
            var zipCountMatch = msg.match(/(\d+)\s*\/\s*(\d+)/);
            var zipDoneFromMessage = zipCountMatch ? Math.max(0, Number(zipCountMatch[1] || 0)) : null;
            var zipTotalFromMessage = zipCountMatch ? Math.max(0, Number(zipCountMatch[2] || 0)) : null;
            if (isStage2Status(status)) {
                // Stage 2 (flow): treat ts_progressmessage as the source of truth once it no longer looks like leftover Stage 1 text.
                var looksLikeStage1Message = /\[Stage\s+1\/3\]|Questionnaire\s+PDFs/i.test(msg);
                if (msg.length > 0 && !looksLikeStage1Message) {
                    return (msg.startsWith("[") || msg.startsWith("✅")) ? msg : stagePrefix + " " + msg;
                }
                return stagePrefix + " Generating main PDFs...";
            }
            if (status === STATUS_READY_FOR_ZIP || status === STATUS_ZIP_IN_PROGRESS) {
                // Keep ZIP assembly visually distinct from cleanup/finalization.
                var zipPercent = Math.min(percent, 98);
                if (zipDoneFromMessage !== null && zipTotalFromMessage !== null && zipTotalFromMessage > 0) {
                    return formatStageProgressWithRatio(stagePrefix, "Building ZIP...", zipDoneFromMessage, zipTotalFromMessage, zipPercent);
                }
                var safeZipDone = Math.max(0, Number(nextMergeIndex || 0));
                var lowerMsg = msg.toLowerCase();
                var isFinalizingHint = lowerMsg.includes("waiting for zip confirmation") ||
                    lowerMsg.includes("zip ready, starting cleanup") ||
                    lowerMsg.includes("starting cleanup");
                if (isFinalizingHint) {
                    return formatStageProgress(stagePrefix, "Finalizing export...", undefined, "Verifying ZIP and preparing cleanup");
                }
                if (safeZipDone <= 0) {
                    return formatStageProgress(stagePrefix, "Building ZIP...", zipPercent > 0 ? zipPercent : undefined, "Preparing archive");
                }
                return formatStageProgress(stagePrefix, "Building ZIP...", zipPercent, "(" + safeZipDone + ")");
            }
            if (status === STATUS_READY_FOR_CLEANUP || status === STATUS_CLEANUP_IN_PROGRESS) {
                return formatStageProgress(stagePrefix, "Cleaning up temporary artifacts...");
            }
            if (status === STATUS_READY_FOR_MERGE || status === STATUS_MERGE_IN_PROGRESS) {
                // Flow sets a final message when moving to ReadyForMerge; show it until merge worker overwrites.
                if (msg.length > 0 && msg.includes("[Stage 2/3]") && (msg.includes("Completed") || msg.includes("Terminé"))) {
                    return (msg.startsWith("[") || msg.startsWith("✅")) ? msg : stagePrefix + " " + msg;
                }
                var safeDone = Math.max(0, doneUnits);
                var safeTotal = Math.max(0, totalUnits);
                return formatStageProgressWithRatio(stagePrefix, "Merging PDFs...", safeDone, safeTotal, percent);
            }
            // If upstream already wrote a standardized stage message, avoid duplicating prefixes.
            if (/^\[(Stage\s+\d+\/\d+|Completed|Error)\]/i.test(detailMsg)) {
                return detailMsg;
            }
            if (!detailMsg)
                return stageDisplay + " | Overall " + percent + "%";
            // Default: prefix with stage so message always has context.
            return stageDisplay + " | Overall " + percent + "% | " + detailMsg;
        }
        function updateJobCritical(jobId, patch) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Xrm.WebApi.updateRecord("ts_workorderexportjob", jobId, patch)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
        function updateJobBestEffort(jobId, patch) {
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
                            // Best-effort path for non-critical progress writes.
                            debugLog("[WOExport] Progress update failed: " + ((e_1 === null || e_1 === void 0 ? void 0 : e_1.message) || e_1));
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        function refreshFormAfterCompletion(formContext) {
            return __awaiter(this, void 0, void 0, function () {
                var refreshed, attempt, e_2, jobId, reloadKey, didReload;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            refreshed = false;
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
                            refreshed = true;
                            return [3 /*break*/, 7];
                        case 4:
                            e_2 = _a.sent();
                            if (attempt >= 2)
                                return [3 /*break*/, 7];
                            return [4 /*yield*/, new Promise(function (resolve) { return window.setTimeout(function () { return resolve(); }, 1200); })];
                        case 5:
                            _a.sent();
                            return [3 /*break*/, 6];
                        case 6:
                            attempt++;
                            return [3 /*break*/, 1];
                        case 7:
                            jobId = getJobId(formContext);
                            if (!jobId)
                                return [2 /*return*/, refreshed];
                            reloadKey = "wo_export_completed_reload_once_" + jobId;
                            didReload = sessionStorage.getItem(reloadKey) === "1";
                            if (didReload) {
                                sessionStorage.removeItem(reloadKey);
                            }
                            if (!refreshed) {
                                if (!didReload) {
                                    sessionStorage.setItem(reloadKey, "1");
                                    window.setTimeout(function () { return window.location.reload(); }, 250);
                                }
                                return [2 /*return*/, false];
                            }
                            // Even when data.refresh succeeds, file columns may still lag in rendering in some clients.
                            return [2 /*return*/, true];
                    }
                });
            });
        }
        function getCompletedPromptShownKey(jobId) {
            return "wo_export_completed_prompt_shown_" + jobId;
        }
        function hasShownCompletedPrompt(jobId) {
            try {
                return sessionStorage.getItem(getCompletedPromptShownKey(jobId)) === "1";
            }
            catch (e) {
                return false;
            }
        }
        function markCompletedPromptShown(jobId) {
            runBestEffort(function () { return sessionStorage.setItem(getCompletedPromptShownKey(jobId), "1"); });
        }
        function clearCompletedPromptShown(jobId) {
            runBestEffort(function () { return sessionStorage.removeItem(getCompletedPromptShownKey(jobId)); });
        }
        function setProgressNotification(formContext, text, level) {
            if (level === void 0) { level = "INFO"; }
            runBestEffort(function () { return formContext.ui.setFormNotification(text, level, PROGRESS_NOTIFICATION_ID); });
        }
        function clearProgressNotification(formContext) {
            runBestEffort(function () { return formContext.ui.clearFormNotification(PROGRESS_NOTIFICATION_ID); });
        }
        function updateErrorMessageVisibility(formContext) {
            runBestEffort(function () {
                var _a, _b, _c, _d;
                var errorControl = (_a = formContext === null || formContext === void 0 ? void 0 : formContext.getControl) === null || _a === void 0 ? void 0 : _a.call(formContext, "ts_errormessage");
                if (!(errorControl === null || errorControl === void 0 ? void 0 : errorControl.setVisible))
                    return;
                var raw = (_d = (_c = (_b = formContext === null || formContext === void 0 ? void 0 : formContext.getAttribute) === null || _b === void 0 ? void 0 : _b.call(formContext, "ts_errormessage")) === null || _c === void 0 ? void 0 : _c.getValue) === null || _d === void 0 ? void 0 : _d.call(_c);
                var hasError = ((raw || "").toString().trim().length > 0);
                errorControl.setVisible(hasError);
            });
        }
        function wireErrorMessageVisibility(formContext) {
            runBestEffort(function () {
                var _a;
                var errorAttr = (_a = formContext === null || formContext === void 0 ? void 0 : formContext.getAttribute) === null || _a === void 0 ? void 0 : _a.call(formContext, "ts_errormessage");
                if (!(errorAttr === null || errorAttr === void 0 ? void 0 : errorAttr.addOnChange))
                    return;
                var marker = "__woExportErrorVisHooked";
                if (errorAttr[marker])
                    return;
                errorAttr.addOnChange(function () { return updateErrorMessageVisibility(formContext); });
                errorAttr[marker] = true;
            });
        }
        function showCriticalProgressIndicator(text, isUnsafeToClose) {
            if (isUnsafeToClose === void 0) { isUnsafeToClose = true; }
            runBestEffort(function () {
                var stripLeadingProgressEmoji = function (value) {
                    var cleaned = (value || "").trim();
                    var knownPrefixes = ["⏳", "⏳️", "⚠️", "✅", "❌", "📦", "📦️"];
                    var changed = true;
                    while (changed && cleaned.length > 0) {
                        changed = false;
                        for (var _i = 0, knownPrefixes_1 = knownPrefixes; _i < knownPrefixes_1.length; _i++) {
                            var prefix = knownPrefixes_1[_i];
                            if (cleaned.startsWith(prefix)) {
                                cleaned = cleaned.substring(prefix.length).trim();
                                changed = true;
                            }
                        }
                        cleaned = cleaned.replace(/^[\uFE0F\u200D\s]+/, "");
                    }
                    return cleaned;
                };
                var header = isUnsafeToClose
                    ? "⚠️ " + getResx("DoNotCloseOrReloadForm")
                    : "⏳";
                var detail = stripLeadingProgressEmoji(text || getResx("QuestionnaireExportInProgress"));
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
            });
        }
        function closeCriticalProgressIndicator() {
            runBestEffort(function () {
                if (!criticalProgressIndicatorOpen)
                    return;
                Xrm.Utility.closeProgressIndicator();
                criticalProgressIndicatorOpen = false;
                lastCriticalProgressMessage = "";
                lastCriticalProgressUpdateMs = 0;
            });
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
            catch (_a) {
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
            return "wo_export_interrupted_" + jobId;
        }
        function getAutoResumeFlagKey(jobId) {
            return "wo_export_auto_resume_" + jobId;
        }
        function getResumeAttemptsKey(jobId) {
            return "wo_export_resume_attempts_" + jobId;
        }
        function getLastProgressContextKey(jobId) {
            return "wo_export_last_context_" + jobId;
        }
        function getLastStallContextKey(jobId) {
            return "wo_export_last_stall_context_" + jobId;
        }
        function getSameStallCountKey(jobId) {
            return "wo_export_same_stall_count_" + jobId;
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
            runBestEffort(function () { return localStorage.removeItem(getInterruptionFlagKey(jobId)); });
        }
        function setAutoResumeFlag(jobId) {
            runBestEffort(function () { return localStorage.setItem(getAutoResumeFlagKey(jobId), new Date().toISOString()); });
        }
        function consumeAutoResumeFlag(jobId) {
            try {
                var key = getAutoResumeFlagKey(jobId);
                var found = !!localStorage.getItem(key);
                if (found)
                    localStorage.removeItem(key);
                return found;
            }
            catch (e) {
                return false;
            }
        }
        function getResumeAttempts(jobId) {
            try {
                var raw = localStorage.getItem(getResumeAttemptsKey(jobId));
                var parsed = Number(raw);
                if (!Number.isFinite(parsed) || parsed < 0)
                    return 0;
                return Math.floor(parsed);
            }
            catch (e) {
                return 0;
            }
        }
        function setResumeAttempts(jobId, attempts) {
            runBestEffort(function () {
                return localStorage.setItem(getResumeAttemptsKey(jobId), "" + Math.max(0, Math.floor(attempts)));
            });
        }
        function clearResumeAttempts(jobId) {
            runBestEffort(function () { return localStorage.removeItem(getResumeAttemptsKey(jobId)); });
        }
        function parseAutoResumeAttemptFromMessage(text) {
            var raw = (text || "").toString().trim();
            if (!raw)
                return 0;
            var match = raw.match(/auto-resume\s+attempt\s+(\d+)\s*\/\s*(\d+)/i);
            if (!match)
                return 0;
            var attempt = Number(match[1] || "0");
            return Number.isFinite(attempt) && attempt > 0 ? Math.floor(attempt) : 0;
        }
        function isAutoResumeProgressMessage(text) {
            return parseAutoResumeAttemptFromMessage(text) > 0;
        }
        function setLastProgressContext(jobId, text) {
            runBestEffort(function () {
                return localStorage.setItem(getLastProgressContextKey(jobId), (text || "").toString().trim());
            });
        }
        function getLastProgressContext(jobId) {
            try {
                return (localStorage.getItem(getLastProgressContextKey(jobId)) || "").toString();
            }
            catch (e) {
                return "";
            }
        }
        function clearLastProgressContext(jobId) {
            runBestEffort(function () { return localStorage.removeItem(getLastProgressContextKey(jobId)); });
        }
        function recordStallAtContext(jobId, context) {
            try {
                var normalized = (context || "").trim();
                var prevContext = (localStorage.getItem(getLastStallContextKey(jobId)) || "").trim();
                var prevCountRaw = Number(localStorage.getItem(getSameStallCountKey(jobId)) || "0");
                var prevCount = Number.isFinite(prevCountRaw) && prevCountRaw > 0 ? Math.floor(prevCountRaw) : 0;
                var nextCount = prevContext === normalized ? (prevCount + 1) : 1;
                localStorage.setItem(getLastStallContextKey(jobId), normalized);
                localStorage.setItem(getSameStallCountKey(jobId), "" + nextCount);
                return nextCount;
            }
            catch (e) {
                return 1;
            }
        }
        function clearStallTracking(jobId) {
            runBestEffort(function () {
                localStorage.removeItem(getLastStallContextKey(jobId));
                localStorage.removeItem(getSameStallCountKey(jobId));
            });
        }
        function clearJobLocalState(jobId) {
            if (!jobId)
                return;
            clearInterruptionFlag(jobId);
            clearResumeAttempts(jobId);
            clearLastProgressContext(jobId);
            clearStallTracking(jobId);
        }
        function formatBytesForUser(bytes) {
            if (!Number.isFinite(bytes) || bytes <= 0)
                return "0 B";
            var units = ["B", "KB", "MB", "GB"];
            var value = bytes;
            var unitIndex = 0;
            while (value >= 1024 && unitIndex < units.length - 1) {
                value /= 1024;
                unitIndex++;
            }
            var precision = unitIndex <= 1 ? 0 : 2;
            return value.toFixed(precision) + " " + units[unitIndex];
        }
        function extractBytesFromErrorMessage(message) {
            var text = (message || "").toString();
            var estimatedMatch = text.match(/EstimatedZIPBytes=(\d+)/i);
            var currentMatch = text.match(/CurrentZIPBytes=(\d+)/i);
            var projectedMatch = text.match(/ProjectedZIPBytes=(\d+)/i);
            var nextMatch = text.match(/NextZIPBytes=(\d+)/i);
            var existingMatch = text.match(/ExistingZIPBytes=(\d+)/i);
            var limitMatch = text.match(/LimitBytes=(\d+)/i);
            var parse = function (raw) {
                if (!raw)
                    return undefined;
                var parsed = Number(raw);
                return Number.isFinite(parsed) ? parsed : undefined;
            };
            return {
                estimatedBytes: parse(estimatedMatch === null || estimatedMatch === void 0 ? void 0 : estimatedMatch[1]),
                currentBytes: parse(currentMatch === null || currentMatch === void 0 ? void 0 : currentMatch[1]),
                projectedBytes: parse(projectedMatch === null || projectedMatch === void 0 ? void 0 : projectedMatch[1]),
                nextBytes: parse(nextMatch === null || nextMatch === void 0 ? void 0 : nextMatch[1]),
                existingBytes: parse(existingMatch === null || existingMatch === void 0 ? void 0 : existingMatch[1]),
                limitBytes: parse(limitMatch === null || limitMatch === void 0 ? void 0 : limitMatch[1])
            };
        }
        function isZipTooLargeMessage(message) {
            var text = (message || "").toLowerCase();
            return text.includes("zip hard limit reached") ||
                text.includes("sandbox zip size limit reached") ||
                text.includes("attachment file size is too big") ||
                (text.includes("export is too large") && text.includes("zip"));
        }
        function buildZipTooLargeMessage(message) {
            var size = extractBytesFromErrorMessage(message);
            var currentText = size.currentBytes ? formatBytesForUser(size.currentBytes) : "";
            var nextText = size.nextBytes ? formatBytesForUser(size.nextBytes) : "";
            var projectedText = size.projectedBytes ? formatBytesForUser(size.projectedBytes) : "";
            var reachedBytes = size.estimatedBytes || size.projectedBytes || size.nextBytes || size.currentBytes || size.existingBytes;
            var reachedText = reachedBytes ? formatBytesForUser(reachedBytes) : "";
            var limitText = size.limitBytes ? formatBytesForUser(size.limitBytes) : "";
            var overByBytes = reachedBytes && size.limitBytes ? Math.max(0, reachedBytes - size.limitBytes) : 0;
            var overByText = overByBytes > 0 ? formatBytesForUser(overByBytes) : "";
            var baseMsg = getResx("ExportTooLargeForSingleZIP");
            var detail = "❌ " + baseMsg;
            if (currentText && nextText && projectedText && limitText) {
                detail = "\u274C ZIP size limit reached before continuing. Current ZIP: " + currentText + ", Next estimated: " + nextText + ", Projected: " + projectedText + ", Limit: " + limitText + ".";
            }
            else if (reachedText && limitText && overByText) {
                detail = "\u274C " + baseMsg + " Estimated: " + reachedText + ". Limit: " + limitText + ". Over by: " + overByText + ".";
            }
            else if (reachedText && limitText) {
                detail = "\u274C " + baseMsg + " Estimated: " + reachedText + ". Limit: " + limitText + ".";
            }
            else if (reachedText) {
                detail = "\u274C " + baseMsg + " Estimated: " + reachedText + ".";
            }
            else if (limitText) {
                detail = "\u274C " + baseMsg + " Limit: " + limitText + ".";
            }
            return detail + getResx("ReduceWorkOrdersAndRetry");
        }
        function getSizeLimitAlertKey(jobId) {
            return "wo_export_size_limit_alert_" + jobId;
        }
        function hasShownSizeLimitAlert(jobId) {
            try {
                return sessionStorage.getItem(getSizeLimitAlertKey(jobId)) === "1";
            }
            catch (e) {
                return false;
            }
        }
        function markSizeLimitAlertShown(jobId) {
            runBestEffort(function () { return sessionStorage.setItem(getSizeLimitAlertKey(jobId), "1"); });
        }
        function clearSizeLimitAlertShown(jobId) {
            runBestEffort(function () { return sessionStorage.removeItem(getSizeLimitAlertKey(jobId)); });
        }
        function promptResumeOrCancel() {
            return __awaiter(this, void 0, void 0, function () {
                var result;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Xrm.Navigation.openConfirmDialog({
                                title: getResx("QuestionnaireExportInterruptedTitle"),
                                text: getResx("QuestionnaireExportInterruptedText"),
                                confirmButtonLabel: getResx("OKResume"),
                                cancelButtonLabel: getResx("CancelJob")
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
        /** Gets current app ID from parent/top frame URL (appid query param). No GUID hardcoding. */
        function getAppIdSync() {
            var _a, _b, _c, _d, _e;
            try {
                var w = typeof window !== "undefined" ? window : null;
                var href = (((_b = (_a = w === null || w === void 0 ? void 0 : w.top) === null || _a === void 0 ? void 0 : _a.location) === null || _b === void 0 ? void 0 : _b.href) || ((_d = (_c = w === null || w === void 0 ? void 0 : w.parent) === null || _c === void 0 ? void 0 : _c.location) === null || _d === void 0 ? void 0 : _d.href) || ((_e = w === null || w === void 0 ? void 0 : w.location) === null || _e === void 0 ? void 0 : _e.href)) || "";
                if (!href)
                    return "";
                var url = new URL(href);
                return (url.searchParams.get("appid") || "").trim();
            }
            catch (e) {
                return "";
            }
        }
        /** Builds record URL for msdyn_workorderservicetask. Uses getClientUrl() and getAppIdSync() so env differs per deployment. */
        function buildServiceTaskRecordUrl(taskId) {
            var baseUrl = getClientUrl();
            if (!baseUrl)
                return "";
            var appId = getAppIdSync();
            var encodedId = encodeURIComponent(taskId);
            if (appId) {
                return baseUrl + "/main.aspx?appid=" + encodeURIComponent(appId) + "&pagetype=entityrecord&etn=msdyn_workorderservicetask&id=" + encodedId;
            }
            return baseUrl + "/main.aspx?pagetype=entityrecord&etn=msdyn_workorderservicetask&id=" + encodedId;
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
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, tryOpenFinalZipFileColumn(jobId, jobRecord)];
                        case 1:
                            if (_a.sent()) {
                                return [2 /*return*/];
                            }
                            Xrm.Navigation.openAlertDialog({ text: getResx("ExportCompletedZIPNotFound") });
                            return [2 /*return*/];
                    }
                });
            });
        }
        function focusZipControl(formContext) {
            runBestEffort(function () {
                var _a;
                var zipControl = (_a = formContext === null || formContext === void 0 ? void 0 : formContext.getControl) === null || _a === void 0 ? void 0 : _a.call(formContext, "ts_finalexportzip");
                if (zipControl === null || zipControl === void 0 ? void 0 : zipControl.setFocus)
                    zipControl.setFocus();
            });
        }
        function pollAndRenderProgress(formContext, jobId) {
            return __awaiter(this, void 0, void 0, function () {
                var select, job, status, msg, isSizeError, displayMsg, totalUnits, doneUnits, stageLabel, rawMessage, displayMessage, hasStalledWarning, fileName, readyForDownload, waitedMs, longRunningNotice;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            select = "?$select=statuscode,ts_errormessage,ts_totalunits,ts_doneunits,ts_progressmessage,ts_lastheartbeat,ts_nextmergeindex,modifiedon,ts_finalexportzip_name";
                            return [4 /*yield*/, Xrm.WebApi.retrieveRecord("ts_workorderexportjob", jobId, select)];
                        case 1:
                            job = _a.sent();
                            status = job === null || job === void 0 ? void 0 : job.statuscode;
                            if (!(status === STATUS_ERROR)) return [3 /*break*/, 4];
                            stopProgressPoller(formContext);
                            msg = (job === null || job === void 0 ? void 0 : job.ts_errormessage) || getResx("ExportFailedSeeError");
                            closeCriticalProgressIndicator();
                            clearCompletedPromptShown(jobId);
                            isSizeError = isZipTooLargeMessage(msg);
                            displayMsg = isSizeError ? buildZipTooLargeMessage(msg) : msg;
                            setProgressNotification(formContext, "Error: " + displayMsg, "ERROR");
                            if (!(isSizeError && !hasShownSizeLimitAlert(jobId))) return [3 /*break*/, 3];
                            markSizeLimitAlertShown(jobId);
                            return [4 /*yield*/, Xrm.Navigation.openAlertDialog({
                                    title: getResx("ExportTooLargeTitle"),
                                    text: displayMsg,
                                    confirmButtonLabel: getResx("OK")
                                })];
                        case 2:
                            _a.sent();
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                        case 4:
                            clearSizeLimitAlertShown(jobId);
                            if (status !== STATUS_COMPLETED) {
                                clearCompletedPromptShown(jobId);
                            }
                            totalUnits = Number((job === null || job === void 0 ? void 0 : job.ts_totalunits) || 0);
                            doneUnits = Number((job === null || job === void 0 ? void 0 : job.ts_doneunits) || 0);
                            stageLabel = getStatusLabel(status);
                            rawMessage = ((job === null || job === void 0 ? void 0 : job.ts_progressmessage) || "").trim();
                            displayMessage = formatBackendProgressMessage(status, stageLabel, rawMessage, doneUnits, totalUnits, Number((job === null || job === void 0 ? void 0 : job.ts_nextmergeindex) || 0));
                            hasStalledWarning = isLikelyStalledBackendJob(job, status);
                            if (hasStalledWarning) {
                                setProgressNotification(formContext, getResx("ExportStalledWarning"), "WARNING");
                            }
                            if (!(status === STATUS_COMPLETED)) return [3 /*break*/, 6];
                            if (finalizeWaitStartedAtMs === null) {
                                finalizeWaitStartedAtMs = Date.now();
                            }
                            fileName = ((job === null || job === void 0 ? void 0 : job.ts_finalexportzip_name) || "").toString().trim();
                            if (!fileName) {
                                pollDebug(jobId, "completed-no-file-yet", "status=" + status + "; done=" + doneUnits + "/" + totalUnits + "; progress=" + (rawMessage || "(empty)"));
                                showCriticalProgressIndicator(getFinalizingProgressText(), false);
                                if (finalizeCheckTimeoutHandle === null) {
                                    finalizeCheckTimeoutHandle = window.setTimeout(function () {
                                        finalizeCheckTimeoutHandle = null;
                                        triggerProgressPoll(formContext, jobId);
                                    }, 1000); // check if file is in the export job
                                }
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, refreshFormAfterCompletion(formContext)];
                        case 5:
                            readyForDownload = _a.sent();
                            if (!readyForDownload) {
                                waitedMs = Date.now() - (finalizeWaitStartedAtMs || Date.now());
                                if (waitedMs >= FINALIZE_MAX_WAIT_MS) {
                                    // Fallback: backend completion is authoritative; avoid indefinite spinner when form/file UI lags.
                                    pollDebug(jobId, "completed-ui-fallback-timeout", "waitedMs=" + waitedMs + "; file=" + fileName);
                                    debugLog("[WOExport] Finalization UI fallback after " + waitedMs + "ms (status completed).");
                                }
                                else {
                                    pollDebug(jobId, "completed-waiting-ui-refresh", "waitedMs=" + waitedMs + "; file=" + fileName);
                                    showCriticalProgressIndicator(getFinalizingProgressText(), false);
                                    if (finalizeCheckTimeoutHandle === null) {
                                        finalizeCheckTimeoutHandle = window.setTimeout(function () {
                                            finalizeCheckTimeoutHandle = null;
                                            triggerProgressPoll(formContext, jobId);
                                        }, 1000);
                                    }
                                    return [2 /*return*/];
                                }
                            }
                            finalizeWaitStartedAtMs = null;
                            pollDebug(jobId, "completed-ready-for-download", "file=" + fileName);
                            stopProgressPoller(formContext);
                            closeCriticalProgressIndicator();
                            setProgressNotification(formContext, "✅ " + getResx("ExportCompleteMessage"), "INFO");
                            if (hasShownCompletedPrompt(jobId)) {
                                return [2 /*return*/];
                            }
                            markCompletedPromptShown(jobId);
                            window.setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                var userChoice;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, refreshFormAfterCompletion(formContext)];
                                        case 1:
                                            _a.sent();
                                            focusZipControl(formContext);
                                            return [4 /*yield*/, Xrm.Navigation.openConfirmDialog({
                                                    title: getResx("ExportCompletedDownloadPromptTitle"),
                                                    text: getResx("ExportCompletedDownloadPromptText"),
                                                    confirmButtonLabel: getResx("DownloadZIP"),
                                                    cancelButtonLabel: getResx("Later")
                                                })];
                                        case 2:
                                            userChoice = _a.sent();
                                            if (!(userChoice === null || userChoice === void 0 ? void 0 : userChoice.confirmed)) return [3 /*break*/, 4];
                                            return [4 /*yield*/, openFinalArtifact(jobId, job)];
                                        case 3:
                                            _a.sent();
                                            _a.label = 4;
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); }, 2000);
                            return [2 /*return*/];
                        case 6:
                            finalizeWaitStartedAtMs = null;
                            if (lastPolledStatusForDebug !== status) {
                                pollDebug(jobId, "status-change", "from=" + (lastPolledStatusForDebug !== null && lastPolledStatusForDebug !== void 0 ? lastPolledStatusForDebug : "null") + "; to=" + (status !== null && status !== void 0 ? status : "null") + "; label=" + stageLabel);
                                lastPolledStatusForDebug = status !== null && status !== void 0 ? status : null;
                            }
                            if (shouldShowBlockingProgressOverlay(job, status)) {
                                showCriticalProgressIndicator(displayMessage, status === STATUS_CLIENT_PROCESSING);
                            }
                            else {
                                closeCriticalProgressIndicator();
                            }
                            longRunningNotice = getLongRunningBackendNotice(job, status);
                            if (longRunningNotice) {
                                setProgressNotification(formContext, longRunningNotice, "WARNING");
                            }
                            else if (!hasStalledWarning) {
                                clearProgressNotification(formContext);
                            }
                            // Tell Included Work Orders iframe to refresh Stage 2 (main PDF) row state from annotations (same cadence as done-units poll)
                            if (status != null && status !== STATUS_ERROR && status !== STATUS_COMPLETED && status >= STATUS_READY_FOR_FLOW) {
                                notifyIncludedWorkOrdersRefreshStage2(formContext, jobId);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        }
        function notifyIncludedWorkOrdersRefreshStage2(formContext, jobId) {
            var _a;
            try {
                var controls = formContext.ui.controls.get();
                for (var idx = 0; idx < controls.length; idx++) {
                    try {
                        var ctrl = controls[idx];
                        var obj = (_a = ctrl.getObject) === null || _a === void 0 ? void 0 : _a.call(ctrl);
                        if ((obj === null || obj === void 0 ? void 0 : obj.tagName) === "IFRAME" && typeof obj.src === "string" && obj.src.indexOf("WorkOrderExportIncludedWorkOrders") !== -1 && obj.contentWindow) {
                            obj.contentWindow.postMessage({ type: "wo-export-refresh-stage2", jobId: jobId }, "*");
                            break;
                        }
                    }
                    catch (_b) {
                        /* ignore */
                    }
                }
            }
            catch (_c) {
                /* ignore */
            }
        }
        function triggerProgressPoll(formContext, jobId) {
            if (isProgressPollInFlight) {
                hasPendingProgressPoll = true;
                return;
            }
            isProgressPollInFlight = true;
            pollAndRenderProgress(formContext, jobId)
                .catch(function (e) {
                console.warn("[WOExport] Progress polling error: " + ((e === null || e === void 0 ? void 0 : e.message) || e));
            })
                .finally(function () {
                isProgressPollInFlight = false;
                if (hasPendingProgressPoll) {
                    hasPendingProgressPoll = false;
                    window.setTimeout(function () { return triggerProgressPoll(formContext, jobId); }, 0);
                }
            });
        }
        function startProgressPoller(formContext, jobId) {
            if (progressPollHandle !== null)
                return;
            progressPollHandle = window.setInterval(function () {
                triggerProgressPoll(formContext, jobId);
            }, PROGRESS_POLL_INTERVAL_MS);
            // kick once immediately
            triggerProgressPoll(formContext, jobId);
        }
        function stopProgressPoller(formContext) {
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
        function waitForRender(targetElement, timeoutMs) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var startTime, pollInterval;
                return __generator(this, function (_b) {
                    // Fast path: Survey.js often renders synchronously; skip polling when content is already present.
                    if (((_a = targetElement === null || targetElement === void 0 ? void 0 : targetElement.innerText) === null || _a === void 0 ? void 0 : _a.trim().length) > 0)
                        return [2 /*return*/];
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
        // -------------------------------------------------------------------------
        // Parallel export helpers
        // -------------------------------------------------------------------------
        function injectExportCss(rw) {
            var cssId = "ts-survey-pdf-css";
            if (rw.document.getElementById(cssId))
                return;
            var style = rw.document.createElement("style");
            style.id = cssId;
            style.innerHTML = "\n            .sv_nav,\n            .sv_next_btn,\n            .sv_prev_btn,\n            .sv_complete_btn,\n            .sv_preview_btn,\n            .sv_progress {\n              display: none !important;\n            }\n            .sv_p_root {\n              padding-bottom: 0px !important;\n            }\n            /* Keep survey blocks together in PDF pages to avoid cut-off at page boundaries. */\n            .sv_q,\n            .sv_row,\n            .sv_panel,\n            .sv_q_title,\n            .sv_q_description,\n            .form-group,\n            .printed-textarea {\n              break-inside: avoid !important;\n              page-break-inside: avoid !important;\n            }\n            .printed-textarea {\n              display: block !important;\n              width: 100% !important;\n              min-height: 50px;\n              height: auto !important;\n              padding: 6px 12px;\n              color: #555;\n              background-color: #fff;\n              background-image: none;\n              border: 1px solid #ccc;\n              border-radius: 4px;\n              box-sizing: border-box;\n              overflow: visible !important;\n            }\n          ";
            rw.document.head.appendChild(style);
        }
        function renderSingleSurvey(params) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var renderWindow, taskId, taskName, def, resp, locale, includeHiddenQuestions, filename, notify, surveyDef, targetElement, _i, _b, page, els, _c, els_1, el, survey, converter_1, pdfContainer, headerEl, taskNameSpan, pdfOptions, blob, sizeMB, e_3;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            renderWindow = params.renderWindow, taskId = params.taskId, taskName = params.taskName, def = params.def, resp = params.resp, locale = params.locale, includeHiddenQuestions = params.includeHiddenQuestions, filename = params.filename;
                            notify = params.onProgress || (function (_s) { });
                            if (!def || typeof def !== "string" || def.trim() === "") {
                                return [2 /*return*/, {
                                        status: "skipped",
                                        reason: "empty-def",
                                        skipMessage: "Skip Reason: Questionnaire definition is missing or empty.",
                                        taskId: taskId
                                    }];
                            }
                            try {
                                surveyDef = JSON.parse(def.trim());
                            }
                            catch (parseError) {
                                return [2 /*return*/, {
                                        status: "skipped",
                                        reason: "invalid-def",
                                        skipMessage: "Skip Reason: Invalid questionnaire definition JSON (" + ((parseError === null || parseError === void 0 ? void 0 : parseError.message) || parseError) + ").",
                                        taskId: taskId
                                    }];
                            }
                            _d.label = 1;
                        case 1:
                            _d.trys.push([1, 4, , 5]);
                            // Reset render window globals
                            renderWindow.operationList = [];
                            renderWindow.activityTypeOperationTypeIdsList = [];
                            renderWindow.questionsOnly = false;
                            // Clear previous DOM content
                            if (renderWindow.jQuery) {
                                renderWindow.jQuery("#surveyElement").empty();
                            }
                            targetElement = renderWindow.document.getElementById("surveyElement");
                            if (!targetElement) {
                                return [2 /*return*/, { status: "error", error: "surveyElement not found in render window", taskId: taskId }];
                            }
                            // Apply includeHiddenQuestions by clearing visibleIf
                            if (includeHiddenQuestions) {
                                for (_i = 0, _b = surveyDef.pages || []; _i < _b.length; _i++) {
                                    page = _b[_i];
                                    els = page === null || page === void 0 ? void 0 : page.elements;
                                    if (!Array.isArray(els))
                                        continue;
                                    for (_c = 0, els_1 = els; _c < els_1.length; _c++) {
                                        el = els_1[_c];
                                        el.visibleIf = null;
                                    }
                                }
                            }
                            survey = new renderWindow.Survey.Model(surveyDef);
                            survey.locale = locale;
                            survey.mode = "display";
                            survey.data = resp ? JSON.parse(resp) : {};
                            survey.showCompletedPage = false;
                            survey.showProgressBar = "off";
                            if (renderWindow.showdown) {
                                converter_1 = new renderWindow.showdown.Converter();
                                survey.onTextMarkdown.add(function (_sender, options) {
                                    var str = converter_1.makeHtml(options.text || "");
                                    if (str.indexOf("<p>") === 0) {
                                        str = str.substring(3);
                                        str = str.substring(0, str.length - 4);
                                    }
                                    options.html = str;
                                });
                            }
                            // Detail question expansion handler (replicates existing behavior)
                            survey.onAfterRenderQuestion.add(function (sender, options) {
                                if (options.question.hasDetail != true)
                                    return;
                                var detailSurveyId = options.question.name + "-Detail";
                                var detailLabel = (locale === "fr")
                                    ? (options.question.detailFrenchText || "Detail")
                                    : (options.question.detailEnglishText || "Detail");
                                var question = options.htmlElement;
                                var detailContainer = renderWindow.document.createElement("div");
                                var header = renderWindow.document.createElement("div");
                                var content = renderWindow.document.createElement("div");
                                var detailText = renderWindow.document.createElement("span");
                                var detailSymbol = renderWindow.document.createElement("span");
                                var detailBox = renderWindow.document.createElement("textarea");
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
                                if (sender.getValue(detailSurveyId) != null)
                                    detailBox.value = sender.getValue(detailSurveyId);
                            });
                            // Render
                            notify("Rendering survey");
                            renderWindow.jQuery("#surveyElement").Survey({ model: survey });
                            // Wait for DOM to have content
                            notify("Preparing layout");
                            return [4 /*yield*/, waitForRender(targetElement, 10000)];
                        case 2:
                            _d.sent();
                            // Convert textareas to divs for clean PDF capture
                            notify("Formatting content");
                            if (renderWindow.jQuery && renderWindow.jQuery("textarea").length > 0) {
                                renderWindow.jQuery("textarea").each(function (_index, el) {
                                    var val = (renderWindow.jQuery(el).val() || "").toString();
                                    var newDiv = renderWindow.jQuery('<div class="printed-textarea"></div>');
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
                                renderWindow.jQuery("input[type='radio']").each(function (_index, el) {
                                    var jEl = renderWindow.jQuery(el);
                                    var checked = jEl.prop("checked");
                                    var marker = renderWindow.jQuery('<span></span>');
                                    marker.text(checked ? "\u25CF" : "\u25CB");
                                    marker.css({ "font-size": "1.1em", "margin-right": "4px" });
                                    jEl.replaceWith(marker);
                                });
                                // Checkboxes: ☑ checked / ☐ unchecked
                                renderWindow.jQuery("input[type='checkbox']").each(function (_index, el) {
                                    var jEl = renderWindow.jQuery(el);
                                    var checked = jEl.prop("checked");
                                    var marker = renderWindow.jQuery('<span></span>');
                                    marker.text(checked ? "\u2611" : "\u2610");
                                    marker.css({ "font-size": "1.1em", "margin-right": "4px" });
                                    jEl.replaceWith(marker);
                                });
                                // Select dropdowns (finding widget Finding Type): replace with selected option text
                                renderWindow.jQuery("select").each(function (_index, el) {
                                    var jEl = renderWindow.jQuery(el);
                                    var selectedText = jEl.find("option:selected").text() || "";
                                    var span = renderWindow.jQuery('<span></span>');
                                    span.text(selectedText);
                                    span.css({ "font-style": "italic" });
                                    jEl.replaceWith(span);
                                });
                            }
                            pdfContainer = renderWindow.document.createElement("div");
                            pdfContainer.id = "ts-survey-pdf-container";
                            pdfContainer.style.display = "inline-block";
                            pdfContainer.style.width = "100%";
                            headerEl = renderWindow.document.createElement("div");
                            headerEl.className = "ts-survey-pdf-header";
                            headerEl.style.marginBottom = "10px";
                            headerEl.style.paddingBottom = "6px";
                            headerEl.style.borderBottom = "1px solid #ccc";
                            taskNameSpan = renderWindow.document.createElement("span");
                            taskNameSpan.style.fontWeight = "bold";
                            taskNameSpan.style.fontSize = "22px";
                            taskNameSpan.textContent = taskName || "Work Order Service Task";
                            headerEl.appendChild(taskNameSpan);
                            pdfContainer.appendChild(headerEl);
                            targetElement.parentNode.insertBefore(pdfContainer, targetElement);
                            pdfContainer.appendChild(targetElement);
                            // Capture PDF blob (from container so header is included)
                            notify("Generating PDF");
                            pdfOptions = {
                                margin: 0.5,
                                filename: filename,
                                image: { type: "png", quality: 0.98 },
                                html2canvas: { scale: 1, useCORS: true, windowWidth: 1200 },
                                jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
                                pagebreak: {
                                    mode: ["css", "legacy"],
                                    avoid: [".sv_q", ".sv_row", ".sv_panel", ".form-group", ".printed-textarea", ".ts-survey-pdf-header"]
                                }
                            };
                            return [4 /*yield*/, renderWindow.html2pdf().from(pdfContainer).set(pdfOptions).output("blob")];
                        case 3:
                            blob = _d.sent();
                            sizeMB = (blob.size / (1024 * 1024)).toFixed(2);
                            debugLog("[WOExport] PDF generated for task " + taskId + ". Size: " + sizeMB + " MB");
                            if (blob.size < 5 * 1024) {
                                console.warn("[WOExport] Warning: " + filename + " is unusually small (" + sizeMB + " MB). It may be blank.");
                            }
                            return [2 /*return*/, { status: "ok", blob: blob, filename: filename, taskId: taskId }];
                        case 4:
                            e_3 = _d.sent();
                            return [2 /*return*/, { status: "error", error: (e_3 === null || e_3 === void 0 ? void 0 : e_3.message) || ((_a = e_3 === null || e_3 === void 0 ? void 0 : e_3.toString) === null || _a === void 0 ? void 0 : _a.call(e_3)) || "Unknown error", taskId: taskId }];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        }
        function uploadSurveyBlob(blob, filename, exportJobId) {
            return __awaiter(this, void 0, void 0, function () {
                var READER_TIMEOUT_MS, sizeMB, base64Data, note;
                var _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            READER_TIMEOUT_MS = 60000;
                            sizeMB = (blob.size / (1024 * 1024)).toFixed(2);
                            return [4 /*yield*/, new Promise(function (resolve, reject) {
                                    var reader = new FileReader();
                                    var settled = false;
                                    var timeoutId = setTimeout(function () {
                                        if (settled)
                                            return;
                                        settled = true;
                                        reader.abort();
                                        reject(new Error("FileReader timed out after " + READER_TIMEOUT_MS / 1000 + "s for " + filename + " (" + sizeMB + " MB)"));
                                    }, READER_TIMEOUT_MS);
                                    reader.onloadend = function () {
                                        if (settled)
                                            return;
                                        settled = true;
                                        clearTimeout(timeoutId);
                                        var result = reader.result;
                                        if (!result) {
                                            reject(new Error("FileReader returned empty result for " + filename));
                                            return;
                                        }
                                        resolve(result.split(",")[1]);
                                    };
                                    reader.onerror = function () {
                                        var _a;
                                        if (settled)
                                            return;
                                        settled = true;
                                        clearTimeout(timeoutId);
                                        reject(new Error("FileReader failed for " + filename + ": " + (((_a = reader.error) === null || _a === void 0 ? void 0 : _a.message) || "Unknown error")));
                                    };
                                    reader.onabort = function () {
                                        if (settled)
                                            return;
                                        settled = true;
                                        clearTimeout(timeoutId);
                                        reject(new Error("FileReader aborted for " + filename));
                                    };
                                    reader.readAsDataURL(blob);
                                })];
                        case 1:
                            base64Data = _b.sent();
                            note = (_a = {
                                    subject: filename,
                                    filename: filename,
                                    isdocument: true,
                                    documentbody: base64Data,
                                    mimetype: "application/pdf"
                                },
                                _a["objectid_ts_workorderexportjob@odata.bind"] = "/ts_workorderexportjobs(" + exportJobId + ")",
                                _a);
                            return [4 /*yield*/, Xrm.WebApi.createRecord("annotation", note)];
                        case 2:
                            _b.sent();
                            debugLog("[WOExport][Uploaded] " + filename);
                            return [2 /*return*/];
                    }
                });
            });
        }
        function onLoad(eContext) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            return __awaiter(this, void 0, void 0, function () {
                var formContext, isSystemAdmin, adminDebugTab, formType, slot, status, jobId, stopStallWatchdog, recoveryMode, resumedTaskIds, stallWatchdogHandle_1, lastProgressActivityMs_1, lastProgressContext_1, autoReloadTriggered_1, touchProgressActivity_1, handleStallDetected_1, currentJob, currentStatus, hasInterruptionFlag, autoResumeRequested, currentProgressMessage, progressIndicatesAutoResume, hasPartialProgress, heartbeatRecent, isInterruptedRun, _o, existingSurveyNotes, _i, existingSurveyNotes_1, note, existingTaskId, userCancelledMessage, _p, renderWindows_3, slot, ctrlName, ctrl, rw, payloadAttr, payloadStr, rawPayload, ids, includeHiddenQuestions_1, totalExports_1, totalSurveyPdfs_1, tasksByWorkOrderId, nonBlockingSkips, skippedEmptyCount, skippedInvalidDefinitionCount, skippedNoQuestionnaireCount, workOrderNames, countIndex, _q, ids_1, workOrderId, workOrderIdNoBraces, fetchOptions, scanMessage, tasks, _r, wo, fetchedTasks, scanErr_1, tasksTotal, tasksWithQuestionnaires, allSurveys, woIdx, _t, ids_2, workOrderId, wId, woName, workOrderLabel, tasksEntities, tasksWithQ, taskIdx, _u, tasksWithQ_1, task, taskId, totalUnits, doneUnits_1, userSettings, locale_1, _v, renderWindows_1, rw, errors_1, totalTasksPerWo_1, _w, allSurveys_1, s, w, completedCountByWo_1, stage1CompletedSet_1, stage1FailedSet_1, notifyIncludedWorkOrdersStage1_1, notifyIncludedWorkOrdersStage1Failed_1, onWoStage1Complete_1, updateProgress_1, lastProgressWriteMs_1, writeProgress, pendingUploadPromises, i, chunk, pct, chunkLabel, renderPromises, results, _loop_1, r, _x, renderWindows_2, rw, errorMsgAttr, parts, completionMsg, skipBreakdown, completionWithSkips, warningSummary, errorMsgAttr, e_4, errorMsgAttr, saveErrText, saveErr_1, baseError, finalError;
                var _this = this;
                return __generator(this, function (_y) {
                    switch (_y.label) {
                        case 0:
                            formContext = eContext.getFormContext();
                            isSystemAdmin = userHasRole("System Administrator");
                            adminDebugTab = (_c = (_b = (_a = formContext === null || formContext === void 0 ? void 0 : formContext.ui) === null || _a === void 0 ? void 0 : _a.tabs) === null || _b === void 0 ? void 0 : _b.get) === null || _c === void 0 ? void 0 : _c.call(_b, "tab_admin_debug");
                            if (adminDebugTab === null || adminDebugTab === void 0 ? void 0 : adminDebugTab.setVisible) {
                                adminDebugTab.setVisible(isSystemAdmin);
                            }
                            wireErrorMessageVisibility(formContext);
                            updateErrorMessageVisibility(formContext);
                            // Show internal fields only for Admins
                            if (isSystemAdmin) {
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
                                for (slot = 1; slot <= RENDER_HOST_COUNT; slot++) {
                                    (_e = (_d = formContext.getControl("" + RENDER_HOST_CONTROL_PREFIX + slot)) === null || _d === void 0 ? void 0 : _d.setVisible) === null || _e === void 0 ? void 0 : _e.call(_d, false);
                                }
                                return [2 /*return*/];
                            }
                            status = (_g = (_f = formContext.getAttribute("statuscode")) === null || _f === void 0 ? void 0 : _f.getValue()) !== null && _g !== void 0 ? _g : (_h = formContext.getAttribute("header_ts_statuscode")) === null || _h === void 0 ? void 0 : _h.getValue();
                            jobId = getJobId(formContext);
                            if (jobId) {
                                // If we're in any backend stage, start polling so user sees live progress without refreshes.
                                if (isStatusInList(status, POLL_ONLY_STATUSES)) {
                                    setLeavePageGuard(false);
                                    startProgressPoller(formContext, jobId);
                                    return [2 /*return*/];
                                }
                            }
                            if (status !== STATUS_CLIENT_PROCESSING)
                                return [2 /*return*/];
                            stopStallWatchdog = function () { };
                            _y.label = 1;
                        case 1:
                            _y.trys.push([1, 47, , 52]);
                            recoveryMode = "none";
                            resumedTaskIds = new Set();
                            stallWatchdogHandle_1 = null;
                            lastProgressActivityMs_1 = Date.now();
                            lastProgressContext_1 = "[Stage 1/3] Initializing";
                            autoReloadTriggered_1 = false;
                            touchProgressActivity_1 = function (context) {
                                lastProgressActivityMs_1 = Date.now();
                                if ((context || "").trim()) {
                                    lastProgressContext_1 = (context || "").trim();
                                    if (jobId)
                                        setLastProgressContext(jobId, lastProgressContext_1);
                                }
                            };
                            stopStallWatchdog = function () {
                                if (stallWatchdogHandle_1 !== null) {
                                    window.clearInterval(stallWatchdogHandle_1);
                                    stallWatchdogHandle_1 = null;
                                }
                            };
                            handleStallDetected_1 = function () { return __awaiter(_this, void 0, void 0, function () {
                                var messageAttempts, priorAttempts, lastKnownContext, sameContextStallCount, repeatedSameContext, fatalMsg, _a, nextAttempt;
                                var _b, _c, _d;
                                return __generator(this, function (_e) {
                                    switch (_e.label) {
                                        case 0:
                                            if (!jobId || autoReloadTriggered_1)
                                                return [2 /*return*/];
                                            autoReloadTriggered_1 = true;
                                            stopStallWatchdog();
                                            messageAttempts = parseAutoResumeAttemptFromMessage(((_d = (_c = (_b = formContext === null || formContext === void 0 ? void 0 : formContext.getAttribute) === null || _b === void 0 ? void 0 : _b.call(formContext, "ts_progressmessage")) === null || _c === void 0 ? void 0 : _c.getValue) === null || _d === void 0 ? void 0 : _d.call(_c)) || "");
                                            priorAttempts = Math.max(getResumeAttempts(jobId), messageAttempts);
                                            lastKnownContext = getLastProgressContext(jobId) || lastProgressContext_1 || "[Stage 1/3] Unknown";
                                            sameContextStallCount = recordStallAtContext(jobId, lastKnownContext);
                                            repeatedSameContext = sameContextStallCount >= MAX_SAME_CONTEXT_STALLS;
                                            if (!(repeatedSameContext || priorAttempts >= MAX_AUTO_RESUME_ATTEMPTS)) return [3 /*break*/, 6];
                                            fatalMsg = repeatedSameContext
                                                ? "Stage 1 stalled " + MAX_SAME_CONTEXT_STALLS + " times at the same step. Export stopped.\nLast known progress: " + lastKnownContext
                                                : "Stage 1 auto-resume failed after " + MAX_AUTO_RESUME_ATTEMPTS + " attempt(s). Export stopped due to repeated stalls.\nLast known progress: " + lastKnownContext;
                                            return [4 /*yield*/, updateJobCritical(jobId, {
                                                    statuscode: STATUS_ERROR,
                                                    ts_errormessage: fatalMsg,
                                                    ts_progressmessage: "[Error] Stage 1 stalled repeatedly. Export stopped.",
                                                    ts_lastheartbeat: new Date().toISOString()
                                                })];
                                        case 1:
                                            _e.sent();
                                            clearJobLocalState(jobId);
                                            setLeavePageGuard(false);
                                            closeCriticalProgressIndicator();
                                            clearProgressNotification(formContext);
                                            _e.label = 2;
                                        case 2:
                                            _e.trys.push([2, 4, , 5]);
                                            return [4 /*yield*/, formContext.data.refresh(false)];
                                        case 3:
                                            _e.sent();
                                            return [3 /*break*/, 5];
                                        case 4:
                                            _a = _e.sent();
                                            return [3 /*break*/, 5];
                                        case 5:
                                            Xrm.Navigation.openAlertDialog({ text: fatalMsg });
                                            return [2 /*return*/];
                                        case 6:
                                            nextAttempt = priorAttempts + 1;
                                            setResumeAttempts(jobId, nextAttempt);
                                            setAutoResumeFlag(jobId);
                                            try {
                                                localStorage.setItem(getInterruptionFlagKey(jobId), new Date().toISOString());
                                            }
                                            catch (_f) {
                                            }
                                            return [4 /*yield*/, updateJobBestEffort(jobId, {
                                                    ts_progressmessage: "[Stage 1/3] Stall detected. Auto-resume attempt " + nextAttempt + "/" + MAX_AUTO_RESUME_ATTEMPTS + "...",
                                                    ts_lastheartbeat: new Date().toISOString()
                                                })];
                                        case 7:
                                            _e.sent();
                                            showCriticalProgressIndicator("[Stage 1/3] Stall detected | Auto-resume attempt " + nextAttempt + "/" + MAX_AUTO_RESUME_ATTEMPTS, true);
                                            setLeavePageGuard(false);
                                            window.setTimeout(function () { return window.location.reload(); }, 250);
                                            return [2 /*return*/];
                                    }
                                });
                            }); };
                            if (!jobId) return [3 /*break*/, 15];
                            return [4 /*yield*/, Xrm.WebApi.retrieveRecord("ts_workorderexportjob", jobId, "?$select=statuscode,ts_lastheartbeat,ts_doneunits,ts_progressmessage")];
                        case 2:
                            currentJob = _y.sent();
                            currentStatus = currentJob === null || currentJob === void 0 ? void 0 : currentJob.statuscode;
                            hasInterruptionFlag = consumeInterruptionFlag(jobId);
                            autoResumeRequested = consumeAutoResumeFlag(jobId);
                            currentProgressMessage = ((currentJob === null || currentJob === void 0 ? void 0 : currentJob.ts_progressmessage) || "").toString();
                            progressIndicatesAutoResume = isAutoResumeProgressMessage(currentProgressMessage);
                            hasPartialProgress = Number((currentJob === null || currentJob === void 0 ? void 0 : currentJob.ts_doneunits) || 0) > 0 ||
                                (currentProgressMessage.trim().length > 0);
                            heartbeatRecent = isRecentHeartbeat(currentJob === null || currentJob === void 0 ? void 0 : currentJob.ts_lastheartbeat, CLIENT_HEARTBEAT_RECENT_MS);
                            isInterruptedRun = currentStatus === STATUS_CLIENT_PROCESSING &&
                                (hasInterruptionFlag || autoResumeRequested || progressIndicatesAutoResume || (!heartbeatRecent && hasPartialProgress));
                            if (!isInterruptedRun) return [3 /*break*/, 14];
                            if (progressIndicatesAutoResume && !autoResumeRequested && !hasInterruptionFlag) {
                                debugLog("[WOExport] Auto-resume inferred from ts_progressmessage fallback.");
                            }
                            if (!(autoResumeRequested || progressIndicatesAutoResume)) return [3 /*break*/, 3];
                            _o = "resume";
                            return [3 /*break*/, 5];
                        case 3: return [4 /*yield*/, promptResumeOrCancel()];
                        case 4:
                            _o = _y.sent();
                            _y.label = 5;
                        case 5:
                            recoveryMode = _o;
                            if (!(recoveryMode === "resume")) return [3 /*break*/, 7];
                            return [4 /*yield*/, getSurveyPdfAnnotations(jobId)];
                        case 6:
                            existingSurveyNotes = _y.sent();
                            resumedTaskIds = new Set();
                            for (_i = 0, existingSurveyNotes_1 = existingSurveyNotes; _i < existingSurveyNotes_1.length; _i++) {
                                note = existingSurveyNotes_1[_i];
                                existingTaskId = extractSurveyTaskId(note.filename);
                                if (existingTaskId)
                                    resumedTaskIds.add(existingTaskId);
                            }
                            setProgressNotification(formContext, (autoResumeRequested || progressIndicatesAutoResume)
                                ? "Resuming questionnaire export automatically (" + getResumeAttempts(jobId) + "/" + MAX_AUTO_RESUME_ATTEMPTS + ") from " + resumedTaskIds.size + " existing PDF(s)..."
                                : "Resuming questionnaire export from " + resumedTaskIds.size + " existing PDF(s)...", "INFO");
                            return [3 /*break*/, 13];
                        case 7:
                            userCancelledMessage = "Questionnaire export was interrupted (the page was left or reloaded), and resume was cancelled by the user.";
                            return [4 /*yield*/, updateJobCritical(jobId, {
                                    statuscode: STATUS_ERROR,
                                    ts_errormessage: userCancelledMessage,
                                    ts_progressmessage: userCancelledMessage,
                                    ts_lastheartbeat: new Date().toISOString()
                                })];
                        case 8:
                            _y.sent();
                            clearProgressNotification(formContext);
                            setLeavePageGuard(false);
                            closeCriticalProgressIndicator();
                            clearJobLocalState(jobId);
                            _y.label = 9;
                        case 9:
                            _y.trys.push([9, 11, , 12]);
                            return [4 /*yield*/, formContext.data.refresh(false)];
                        case 10:
                            _y.sent();
                            return [3 /*break*/, 12];
                        case 11:
                            _p = _y.sent();
                            return [3 /*break*/, 12];
                        case 12:
                            Xrm.Navigation.openAlertDialog({ text: userCancelledMessage });
                            return [2 /*return*/];
                        case 13: return [3 /*break*/, 15];
                        case 14:
                            if (currentStatus === STATUS_CLIENT_PROCESSING && heartbeatRecent) {
                                setLeavePageGuard(true, jobId);
                                showCriticalProgressIndicator("[Stage 1/3] In progress | Questionnaire export is already running. Do not close or reload this form if you started it.", true);
                                startProgressPoller(formContext, jobId);
                                return [2 /*return*/];
                            }
                            _y.label = 15;
                        case 15:
                            if (jobId) {
                                // Stage 2 is running in this form: warn and prevent accidental close.
                                setLeavePageGuard(true, jobId);
                                clearProgressNotification(formContext);
                                touchProgressActivity_1("[Stage 1/3] In progress");
                                stallWatchdogHandle_1 = window.setInterval(function () {
                                    var stalledForMs = Date.now() - lastProgressActivityMs_1;
                                    if (stalledForMs < STAGE1_STALL_TIMEOUT_MS)
                                        return;
                                    handleStallDetected_1().catch(function (e) {
                                        console.warn("[WOExport] Stall watchdog handler failed: " + ((e === null || e === void 0 ? void 0 : e.message) || e));
                                    });
                                }, STALL_WATCHDOG_INTERVAL_MS);
                            }
                            renderWindows_3 = [];
                            slot = 1;
                            _y.label = 16;
                        case 16:
                            if (!(slot <= RENDER_HOST_COUNT)) return [3 /*break*/, 20];
                            ctrlName = "" + RENDER_HOST_CONTROL_PREFIX + slot;
                            ctrl = formContext.getControl(ctrlName);
                            if (!ctrl)
                                throw new Error("Render host control not found on form: " + ctrlName);
                            return [4 /*yield*/, ctrl.getContentWindow()];
                        case 17:
                            rw = _y.sent();
                            if (!rw)
                                throw new Error("Render host content window not accessible: " + ctrlName);
                            return [4 /*yield*/, waitForRenderHostRuntime(rw, ctrlName)];
                        case 18:
                            _y.sent();
                            renderWindows_3.push(rw);
                            _y.label = 19;
                        case 19:
                            slot++;
                            return [3 /*break*/, 16];
                        case 20:
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
                            includeHiddenQuestions_1 = !!rawPayload.includeHiddenQuestions;
                            totalExports_1 = ids.length;
                            totalSurveyPdfs_1 = 0;
                            tasksByWorkOrderId = {};
                            nonBlockingSkips = [];
                            skippedEmptyCount = 0;
                            skippedInvalidDefinitionCount = 0;
                            skippedNoQuestionnaireCount = 0;
                            setProgressNotification(formContext, formatStage1Preparation("Preparing export (1/2): scanning selected work orders..."), "INFO");
                            showCriticalProgressIndicator(formatStage1Preparation("Preparing export (1/2): scanning selected work orders..."));
                            workOrderNames = new Map();
                            countIndex = 0;
                            _q = 0, ids_1 = ids;
                            _y.label = 21;
                        case 21:
                            if (!(_q < ids_1.length)) return [3 /*break*/, 27];
                            workOrderId = ids_1[_q];
                            countIndex++;
                            workOrderIdNoBraces = workOrderId.replace(/[{}]/g, "");
                            fetchOptions = "?$select=msdyn_workorderservicetaskid,msdyn_name,ovs_questionnairedefinition,ovs_questionnaireresponse" +
                                "&$filter=_msdyn_workorder_value eq " + workOrderIdNoBraces;
                            scanMessage = formatStage1Preparation("Preparing export (1/2): scanning selected work orders (" + formatRatioWithPercent(countIndex, totalExports_1) + ")...");
                            setProgressNotification(formContext, scanMessage, "INFO");
                            showCriticalProgressIndicator(scanMessage);
                            tasks = void 0;
                            _y.label = 22;
                        case 22:
                            _y.trys.push([22, 24, , 25]);
                            return [4 /*yield*/, Promise.all([
                                    Xrm.WebApi.retrieveRecord("msdyn_workorder", workOrderIdNoBraces, "?$select=msdyn_name")
                                        .catch(function () { return null; }),
                                    Xrm.WebApi.retrieveMultipleRecords("msdyn_workorderservicetask", fetchOptions)
                                ])];
                        case 23:
                            _r = _y.sent(), wo = _r[0], fetchedTasks = _r[1];
                            workOrderNames.set(workOrderIdNoBraces, ((_j = wo) === null || _j === void 0 ? void 0 : _j.msdyn_name) || "");
                            tasks = fetchedTasks;
                            return [3 /*break*/, 25];
                        case 24:
                            scanErr_1 = _y.sent();
                            throw new Error("Failed loading service tasks for work order " + workOrderIdNoBraces + ": " + getErrorText(scanErr_1));
                        case 25:
                            tasksTotal = tasks.entities.length;
                            if (tasksTotal === 0) {
                                nonBlockingSkips.push("Work Order: " + workOrderIdNoBraces + "\nSkip Reason: No work order service tasks found.");
                                skippedNoQuestionnaireCount++;
                                tasksByWorkOrderId[workOrderIdNoBraces] = [];
                                return [3 /*break*/, 26];
                            }
                            tasksWithQuestionnaires = tasks.entities.filter(function (task) {
                                return task.ovs_questionnairedefinition && task.ovs_questionnaireresponse;
                            });
                            if (tasksWithQuestionnaires.length === 0) {
                                nonBlockingSkips.push("Work Order: " + workOrderIdNoBraces + "\nSkip Reason: No questionnaires found in any service tasks.");
                                skippedNoQuestionnaireCount++;
                                tasksByWorkOrderId[workOrderIdNoBraces] = tasks.entities;
                                return [3 /*break*/, 26];
                            }
                            tasksByWorkOrderId[workOrderIdNoBraces] = tasks.entities;
                            totalSurveyPdfs_1 += tasksWithQuestionnaires.length;
                            _y.label = 26;
                        case 26:
                            _q++;
                            return [3 /*break*/, 21];
                        case 27:
                            allSurveys = [];
                            {
                                woIdx = 0;
                                for (_t = 0, ids_2 = ids; _t < ids_2.length; _t++) {
                                    workOrderId = ids_2[_t];
                                    wId = workOrderId.replace(/[{}]/g, "");
                                    woName = workOrderNames.get(wId) || "";
                                    workOrderLabel = woName ? wId + " (" + woName + ")" : wId;
                                    tasksEntities = tasksByWorkOrderId[wId] || [];
                                    tasksWithQ = tasksEntities.filter(function (t) {
                                        return t.ovs_questionnairedefinition && t.ovs_questionnaireresponse;
                                    });
                                    // Track individual non-questionnaire tasks within WOs that do have some questionnaires
                                    if (tasksWithQ.length > 0) {
                                        skippedNoQuestionnaireCount += (tasksEntities.length - tasksWithQ.length);
                                    }
                                    woIdx++;
                                    taskIdx = 0;
                                    for (_u = 0, tasksWithQ_1 = tasksWithQ; _u < tasksWithQ_1.length; _u++) {
                                        task = tasksWithQ_1[_u];
                                        taskIdx++;
                                        taskId = (task.msdyn_workorderservicetaskid || "unknown").replace(/[{}]/g, "");
                                        // Skip tasks already uploaded in a previous interrupted run
                                        if (recoveryMode === "resume" && resumedTaskIds.has(taskId.toLowerCase())) {
                                            continue;
                                        }
                                        allSurveys.push({
                                            task: task,
                                            workOrderIdNoBraces: wId,
                                            workOrderLabel: workOrderLabel,
                                            woIndex: woIdx,
                                            taskIndex: taskIdx,
                                            totalQuestionnairesInWo: tasksWithQ.length
                                        });
                                    }
                                }
                            }
                            totalUnits = totalSurveyPdfs_1 + (3 * totalExports_1) + 1;
                            doneUnits_1 = 0;
                            if (recoveryMode === "resume" && resumedTaskIds.size > 0) {
                                doneUnits_1 = Math.max(0, Math.min(totalSurveyPdfs_1, resumedTaskIds.size));
                            }
                            if (!jobId) return [3 /*break*/, 29];
                            return [4 /*yield*/, updateJobBestEffort(jobId, {
                                    ts_totalunits: totalUnits,
                                    ts_doneunits: doneUnits_1,
                                    ts_progressmessage: formatQuestionnaireExportProgress(doneUnits_1, totalSurveyPdfs_1),
                                    ts_lastheartbeat: new Date().toISOString()
                                })];
                        case 28:
                            _y.sent();
                            _y.label = 29;
                        case 29:
                            userSettings = Xrm.Utility.getGlobalContext().userSettings;
                            locale_1 = (userSettings.languageId === 1036) ? 'fr' : 'en';
                            // Inject export CSS into all render windows
                            for (_v = 0, renderWindows_1 = renderWindows_3; _v < renderWindows_1.length; _v++) {
                                rw = renderWindows_1[_v];
                                injectExportCss(rw);
                            }
                            errors_1 = [];
                            totalTasksPerWo_1 = {};
                            for (_w = 0, allSurveys_1 = allSurveys; _w < allSurveys_1.length; _w++) {
                                s = allSurveys_1[_w];
                                w = s.workOrderIdNoBraces;
                                totalTasksPerWo_1[w] = (totalTasksPerWo_1[w] || 0) + 1;
                            }
                            completedCountByWo_1 = {};
                            stage1CompletedSet_1 = new Set();
                            stage1FailedSet_1 = new Set();
                            notifyIncludedWorkOrdersStage1_1 = function (woIds) {
                                var _a;
                                try {
                                    var controls = formContext.ui.controls.get();
                                    for (var idx = 0; idx < controls.length; idx++) {
                                        try {
                                            var ctrl = controls[idx];
                                            var obj = (_a = ctrl.getObject) === null || _a === void 0 ? void 0 : _a.call(ctrl);
                                            if ((obj === null || obj === void 0 ? void 0 : obj.tagName) === "IFRAME" && typeof obj.src === "string" && obj.src.indexOf("WorkOrderExportIncludedWorkOrders") !== -1 && obj.contentWindow) {
                                                obj.contentWindow.postMessage({ type: "wo-export-stage1-completed", workOrderIds: woIds }, "*");
                                                break;
                                            }
                                        }
                                        catch (_b) {
                                            /* ignore */
                                        }
                                    }
                                }
                                catch (_c) {
                                    /* ignore */
                                }
                            };
                            notifyIncludedWorkOrdersStage1Failed_1 = function (woIds) {
                                var _a;
                                try {
                                    var controls = formContext.ui.controls.get();
                                    for (var idx = 0; idx < controls.length; idx++) {
                                        try {
                                            var ctrl = controls[idx];
                                            var obj = (_a = ctrl.getObject) === null || _a === void 0 ? void 0 : _a.call(ctrl);
                                            if ((obj === null || obj === void 0 ? void 0 : obj.tagName) === "IFRAME" && typeof obj.src === "string" && obj.src.indexOf("WorkOrderExportIncludedWorkOrders") !== -1 && obj.contentWindow) {
                                                obj.contentWindow.postMessage({ type: "wo-export-stage1-failed", workOrderIds: woIds }, "*");
                                                break;
                                            }
                                        }
                                        catch (_b) {
                                            /* ignore */
                                        }
                                    }
                                }
                                catch (_c) {
                                    /* ignore */
                                }
                            };
                            onWoStage1Complete_1 = function (workOrderIdNoBraces) {
                                completedCountByWo_1[workOrderIdNoBraces] = (completedCountByWo_1[workOrderIdNoBraces] || 0) + 1;
                                var total = totalTasksPerWo_1[workOrderIdNoBraces];
                                if (total && completedCountByWo_1[workOrderIdNoBraces] === total) {
                                    stage1CompletedSet_1.add(workOrderIdNoBraces);
                                    notifyIncludedWorkOrdersStage1_1(Array.from(stage1CompletedSet_1));
                                }
                            };
                            updateProgress_1 = function (overallMessage, detailMessage) {
                                var combined = detailMessage ? overallMessage + " | " + detailMessage : overallMessage;
                                touchProgressActivity_1(combined);
                                setProgressNotification(formContext, combined, "INFO");
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
                                                if (!jobId)
                                                    return [2 /*return*/];
                                                touchProgressActivity_1(message);
                                                return [4 /*yield*/, updateJobBestEffort(jobId, {
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
                            pendingUploadPromises = [];
                            i = 0;
                            _y.label = 30;
                        case 30:
                            if (!(i < allSurveys.length)) return [3 /*break*/, 39];
                            if (!(pendingUploadPromises.length > 0)) return [3 /*break*/, 32];
                            return [4 /*yield*/, Promise.all(pendingUploadPromises)];
                        case 31:
                            _y.sent();
                            pendingUploadPromises = [];
                            _y.label = 32;
                        case 32:
                            chunk = allSurveys.slice(i, i + RENDER_HOST_COUNT);
                            pct = getStage1Percent(doneUnits_1, totalSurveyPdfs_1);
                            chunkLabel = chunk
                                .map(function (s) { return formatWorkOrderTaskProgress(s.woIndex, totalExports_1, s.taskIndex, s.totalQuestionnairesInWo); })
                                .join(" & ") +
                                (" (" + formatRatio(doneUnits_1, totalSurveyPdfs_1) + ") - " + pct + "% | Rendering");
                            updateProgress_1(STAGE1_PREFIX, chunkLabel);
                            renderPromises = chunk.map(function (item, slotIndex) {
                                var task = item.task, workOrderIdNoBraces = item.workOrderIdNoBraces, wIdx = item.woIndex, tIdx = item.taskIndex, totalQuestionnairesInWo = item.totalQuestionnairesInWo;
                                var taskId = (task.msdyn_workorderservicetaskid || "unknown").replace(/[{}]/g, "");
                                var taskName = (task.msdyn_name || "").toString().trim() || "Unknown";
                                var filename = "WO_" + workOrderIdNoBraces + "_SURVEY_" + taskId + ".pdf";
                                return renderSingleSurvey({
                                    renderWindow: renderWindows_3[slotIndex],
                                    taskId: taskId,
                                    taskName: taskName,
                                    def: task.ovs_questionnairedefinition,
                                    resp: task.ovs_questionnaireresponse,
                                    locale: locale_1,
                                    includeHiddenQuestions: includeHiddenQuestions_1,
                                    filename: filename,
                                    onProgress: function (stage) {
                                        updateProgress_1(STAGE1_PREFIX, formatStage1DetailWithWoFirst(wIdx, totalExports_1, tIdx, totalQuestionnairesInWo, doneUnits_1, totalSurveyPdfs_1, stage));
                                    }
                                });
                            });
                            return [4 /*yield*/, Promise.all(renderPromises)];
                        case 33:
                            results = _y.sent();
                            _loop_1 = function (r) {
                                var result, item, task, workOrderIdNoBraces, workOrderLabel, wIdx, tIdx, totalQuestionnairesInWo, taskId, taskName, taskLabel, userGuidance, capturedFilename, uploadPromise;
                                return __generator(this, function (_z) {
                                    switch (_z.label) {
                                        case 0:
                                            result = results[r];
                                            item = chunk[r];
                                            task = item.task, workOrderIdNoBraces = item.workOrderIdNoBraces, workOrderLabel = item.workOrderLabel, wIdx = item.woIndex, tIdx = item.taskIndex, totalQuestionnairesInWo = item.totalQuestionnairesInWo;
                                            taskId = (task.msdyn_workorderservicetaskid || "unknown").replace(/[{}]/g, "");
                                            taskName = (task.msdyn_name || "").toString().trim() || "Unknown";
                                            taskLabel = taskId + " (" + taskName + ")";
                                            if (!(result.status === "skipped")) return [3 /*break*/, 2];
                                            if (result.reason === "empty-def") {
                                                nonBlockingSkips.push("Work Order: " + workOrderLabel + "\nWork Order Service Task: " + taskLabel + "\n" + result.skipMessage);
                                                skippedEmptyCount++;
                                            }
                                            else if (result.reason === "invalid-def") {
                                                nonBlockingSkips.push("Work Order: " + workOrderLabel + "\nWork Order Service Task: " + taskLabel + "\n" + result.skipMessage);
                                                skippedInvalidDefinitionCount++;
                                            }
                                            doneUnits_1++;
                                            onWoStage1Complete_1(workOrderIdNoBraces);
                                            updateProgress_1(STAGE1_PREFIX, formatStage1DetailWithWoFirst(wIdx, totalExports_1, tIdx, totalQuestionnairesInWo, doneUnits_1, totalSurveyPdfs_1, "Skipped"));
                                            return [4 /*yield*/, writeProgress(formatQuestionnaireExportProgress(doneUnits_1, totalSurveyPdfs_1))];
                                        case 1:
                                            _z.sent();
                                            return [3 /*break*/, 5];
                                        case 2:
                                            if (!(result.status === "error")) return [3 /*break*/, 3];
                                            stage1FailedSet_1.add(workOrderIdNoBraces);
                                            notifyIncludedWorkOrdersStage1Failed_1(Array.from(stage1FailedSet_1));
                                            userGuidance = "Please try again. If this keeps failing, retry the export without this Work Order/Service Task.";
                                            errors_1.push("Work Order: " + workOrderLabel + "\n" +
                                                ("Work Order Service Task: " + taskLabel + "\n") +
                                                ("Error: " + result.error + "\n") +
                                                ("" + userGuidance));
                                            console.error("[WOExport][TaskError] wo=" + workOrderIdNoBraces + " task=" + taskId + " msg=" + result.error);
                                            updateProgress_1(STAGE1_PREFIX, formatStage1DetailWithWoFirst(wIdx, totalExports_1, tIdx, totalQuestionnairesInWo, doneUnits_1, totalSurveyPdfs_1, "Error"));
                                            return [3 /*break*/, 5];
                                        case 3:
                                            if (!(result.status === "ok")) return [3 /*break*/, 5];
                                            capturedFilename = result.filename;
                                            uploadPromise = uploadSurveyBlob(result.blob, capturedFilename, jobId)
                                                .then(function () { return onWoStage1Complete_1(workOrderIdNoBraces); })
                                                .catch(function (uploadErr) {
                                                stage1FailedSet_1.add(workOrderIdNoBraces);
                                                notifyIncludedWorkOrdersStage1Failed_1(Array.from(stage1FailedSet_1));
                                                var userGuidance = "Please try again. If this keeps failing, retry the export without this Work Order/Service Task.";
                                                errors_1.push("Work Order: " + workOrderLabel + "\n" +
                                                    ("Work Order Service Task: " + taskLabel + "\n") +
                                                    ("Error (upload): " + ((uploadErr === null || uploadErr === void 0 ? void 0 : uploadErr.message) || uploadErr) + "\n") +
                                                    ("" + userGuidance));
                                                console.error("[WOExport][UploadError] task=" + taskId + " msg=" + ((uploadErr === null || uploadErr === void 0 ? void 0 : uploadErr.message) || uploadErr));
                                            });
                                            pendingUploadPromises.push(uploadPromise);
                                            doneUnits_1++;
                                            updateProgress_1(STAGE1_PREFIX, formatStage1DetailWithWoFirst(wIdx, totalExports_1, tIdx, totalQuestionnairesInWo, doneUnits_1, totalSurveyPdfs_1, "Uploading"));
                                            return [4 /*yield*/, writeProgress(formatQuestionnaireExportProgress(doneUnits_1, totalSurveyPdfs_1))];
                                        case 4:
                                            _z.sent();
                                            _z.label = 5;
                                        case 5: return [2 /*return*/];
                                    }
                                });
                            };
                            r = 0;
                            _y.label = 34;
                        case 34:
                            if (!(r < results.length)) return [3 /*break*/, 37];
                            return [5 /*yield**/, _loop_1(r)];
                        case 35:
                            _y.sent();
                            _y.label = 36;
                        case 36:
                            r++;
                            return [3 /*break*/, 34];
                        case 37:
                            // Clear all render windows after the chunk is processed
                            for (_x = 0, renderWindows_2 = renderWindows_3; _x < renderWindows_2.length; _x++) {
                                rw = renderWindows_2[_x];
                                (_m = (_l = (_k = rw.jQuery) === null || _k === void 0 ? void 0 : _k.call(rw, "#surveyElement")) === null || _l === void 0 ? void 0 : _l.empty) === null || _m === void 0 ? void 0 : _m.call(_l);
                            }
                            _y.label = 38;
                        case 38:
                            i += RENDER_HOST_COUNT;
                            return [3 /*break*/, 30];
                        case 39:
                            if (!(pendingUploadPromises.length > 0)) return [3 /*break*/, 41];
                            updateProgress_1(formatSurveyOverall(doneUnits_1, totalSurveyPdfs_1), "Finishing uploads...");
                            return [4 /*yield*/, Promise.all(pendingUploadPromises)];
                        case 40:
                            _y.sent();
                            pendingUploadPromises = [];
                            _y.label = 41;
                        case 41:
                            if (!(errors_1.length > 0)) return [3 /*break*/, 43];
                            // Set error status and message
                            formContext.getAttribute("statuscode").setValue(STATUS_ERROR);
                            errorMsgAttr = formContext.getAttribute("ts_errormessage");
                            if (errorMsgAttr) {
                                parts = [];
                                parts.push(errors_1.join("\n\n"));
                                if (nonBlockingSkips.length > 0) {
                                    parts.push("Non-blocking skips (" + nonBlockingSkips.length + "):\n" +
                                        nonBlockingSkips.join("\n\n"));
                                }
                                errorMsgAttr.setValue(parts.join("\n\n"));
                            }
                            updateErrorMessageVisibility(formContext);
                            clearProgressNotification(formContext);
                            setLeavePageGuard(false);
                            stopStallWatchdog();
                            closeCriticalProgressIndicator();
                            clearJobLocalState(jobId);
                            return [4 /*yield*/, formContext.data.save()];
                        case 42:
                            _y.sent();
                            Xrm.Navigation.openAlertDialog({ text: "Export completed with " + errors_1.length + " error(s). Check error message field for details." });
                            return [3 /*break*/, 46];
                        case 43:
                            completionMsg = formatQuestionnaireExportProgress(doneUnits_1, totalSurveyPdfs_1, true);
                            skipBreakdown = formatSkipBreakdown(skippedEmptyCount, skippedInvalidDefinitionCount, skippedNoQuestionnaireCount, errors_1.length);
                            completionWithSkips = nonBlockingSkips.length > 0
                                ? completionMsg + " | Skipped: " + nonBlockingSkips.length + skipBreakdown
                                : completionMsg;
                            return [4 /*yield*/, writeProgress(completionWithSkips, true)];
                        case 44:
                            _y.sent();
                            stopStallWatchdog();
                            closeCriticalProgressIndicator();
                            clearProgressNotification(formContext);
                            formContext.getAttribute("statuscode").setValue(STATUS_READY_FOR_SERVER);
                            if (nonBlockingSkips.length > 0) {
                                warningSummary = "Non-blocking skips (" + nonBlockingSkips.length + "):\n" +
                                    nonBlockingSkips.join("\n\n");
                                errorMsgAttr = formContext.getAttribute("ts_errormessage");
                                if (errorMsgAttr)
                                    errorMsgAttr.setValue(warningSummary);
                            }
                            updateErrorMessageVisibility(formContext);
                            setLeavePageGuard(false);
                            clearJobLocalState(jobId);
                            return [4 /*yield*/, formContext.data.save()];
                        case 45:
                            _y.sent();
                            if (jobId) {
                                startProgressPoller(formContext, jobId);
                            }
                            _y.label = 46;
                        case 46: return [3 /*break*/, 52];
                        case 47:
                            e_4 = _y.sent();
                            console.error("[WOExport] ERROR: ", e_4);
                            stopStallWatchdog();
                            clearProgressNotification(formContext);
                            setLeavePageGuard(false);
                            closeCriticalProgressIndicator();
                            clearJobLocalState(jobId);
                            formContext.getAttribute("statuscode").setValue(STATUS_ERROR);
                            errorMsgAttr = formContext.getAttribute("ts_errormessage");
                            if (errorMsgAttr) {
                                errorMsgAttr.setValue(getErrorText(e_4));
                            }
                            updateErrorMessageVisibility(formContext);
                            saveErrText = "";
                            _y.label = 48;
                        case 48:
                            _y.trys.push([48, 50, , 51]);
                            return [4 /*yield*/, formContext.data.save()];
                        case 49:
                            _y.sent();
                            return [3 /*break*/, 51];
                        case 50:
                            saveErr_1 = _y.sent();
                            saveErrText = getErrorText(saveErr_1);
                            return [3 /*break*/, 51];
                        case 51:
                            baseError = getErrorText(e_4);
                            finalError = saveErrText
                                ? "Error processing export job: " + baseError + "\n\nSave failed while setting error state: " + saveErrText
                                : "Error processing export job: " + baseError;
                            Xrm.Navigation.openAlertDialog({ text: finalError });
                            return [3 /*break*/, 52];
                        case 52: return [2 /*return*/];
                    }
                });
            });
        }
        WorkOrderExportJob.onLoad = onLoad;
    })(WorkOrderExportJob = ROM.WorkOrderExportJob || (ROM.WorkOrderExportJob = {}));
})(ROM || (ROM = {}));
