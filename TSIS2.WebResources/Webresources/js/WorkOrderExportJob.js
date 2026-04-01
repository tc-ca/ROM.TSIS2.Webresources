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
        var STATUS_CLIENT_PROCESSING = 741130001;
        var STATUS_COMPLETED = 741130006;
        var STATUS_ERROR = 741130007;
        /** Min interval between progress Web API writes */
        var PROGRESS_WRITE_THROTTLE_MS = 1500;
        var lastProgressWriteMs = 0;
        var cachedUrlContext = null;
        function formatResx(key) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var template = getResx(key);
            for (var i = 0; i < args.length; i++) {
                template = template.split("{" + i + "}").join(String(args[i]));
            }
            return template;
        }
        function getProgressTextStarting(totalUnits) {
            var text = formatResx("ExportProgressStarting", totalUnits);
            return text === "ExportProgressStarting"
                ? "Starting export (" + totalUnits + " work order(s))..."
                : text;
        }
        function getProgressTextGeneratingPdf(currentIndex, totalUnits) {
            var text = formatResx("ExportProgressGeneratingPdf", currentIndex, totalUnits);
            return text === "ExportProgressGeneratingPdf"
                ? "Generating PDF for work order " + currentIndex + " of " + totalUnits + "..."
                : text;
        }
        function getProgressTextCompressing() {
            var text = getResx("ExportProgressCompressing");
            return text === "ExportProgressCompressing"
                ? "Compressing ZIP..."
                : text;
        }
        function getRowProgressStorageKey(jobId) {
            var cleanJobId = (jobId || "").replace(/[{}]/g, "").toLowerCase();
            return "wo-export-progress:" + cleanJobId;
        }
        function resetRowProgress(jobId) {
            try {
                window.localStorage.setItem(getRowProgressStorageKey(jobId), JSON.stringify({
                    completedIds: [],
                    failedIds: [],
                    currentProcessingId: null
                }));
            }
            catch (_a) {
            }
        }
        function setCurrentRowProgress(jobId, workOrderId) {
            try {
                var key = getRowProgressStorageKey(jobId);
                var existingRaw = window.localStorage.getItem(key);
                var existing = existingRaw ? JSON.parse(existingRaw) : {};
                var completedIds = Array.isArray(existing.completedIds) ? existing.completedIds.slice(0) : [];
                var failedIds = Array.isArray(existing.failedIds) ? existing.failedIds.slice(0) : [];
                var currentProcessingId = workOrderId ? workOrderId.replace(/[{}]/g, "").toLowerCase() : null;
                window.localStorage.setItem(key, JSON.stringify({ completedIds: completedIds, failedIds: failedIds, currentProcessingId: currentProcessingId }));
            }
            catch (_a) {
            }
        }
        function updateRowProgress(jobId, field, workOrderId) {
            try {
                var key = getRowProgressStorageKey(jobId);
                var existingRaw = window.localStorage.getItem(key);
                var existing = existingRaw ? JSON.parse(existingRaw) : {};
                var completedIds = Array.isArray(existing.completedIds) ? existing.completedIds.slice(0) : [];
                var failedIds = Array.isArray(existing.failedIds) ? existing.failedIds.slice(0) : [];
                var currentProcessingId = typeof existing.currentProcessingId === "string" ? existing.currentProcessingId : null;
                var cleanId = workOrderId.replace(/[{}]/g, "").toLowerCase();
                var target = field === "completedIds" ? completedIds : failedIds;
                if (target.indexOf(cleanId) === -1) {
                    target.push(cleanId);
                }
                window.localStorage.setItem(key, JSON.stringify({ completedIds: completedIds, failedIds: failedIds, currentProcessingId: currentProcessingId }));
            }
            catch (_a) {
            }
        }
        /** D365 form registration: keep this signature. */
        function onLoad(eContext) {
            var _a, _b, _c;
            return __awaiter(this, void 0, void 0, function () {
                var formCtx, jobId, status, err_1;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            formCtx = eContext.getFormContext();
                            jobId = formCtx.data.entity.getId().replace(/[{}]/g, "");
                            status = (_b = (_a = formCtx.getAttribute("statuscode")) === null || _a === void 0 ? void 0 : _a.getValue()) !== null && _b !== void 0 ? _b : -1;
                            if (status !== STATUS_CLIENT_PROCESSING) {
                                return [2 /*return*/];
                            }
                            _d.label = 1;
                        case 1:
                            _d.trys.push([1, 3, , 5]);
                            return [4 /*yield*/, runExport(jobId, formCtx)];
                        case 2:
                            _d.sent();
                            return [3 /*break*/, 5];
                        case 3:
                            err_1 = _d.sent();
                            return [4 /*yield*/, failJob(jobId, formCtx, (_c = err_1 === null || err_1 === void 0 ? void 0 : err_1.message) !== null && _c !== void 0 ? _c : String(err_1))];
                        case 4:
                            _d.sent();
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        }
        WorkOrderExportJob.onLoad = onLoad;
        // Export pipeline
        function runExport(jobId, formCtx) {
            var _a, _b, _c;
            return __awaiter(this, void 0, void 0, function () {
                var payloadRaw, payload, workOrderIds, includeHiddenQuestions, totalUnits, renderWindow, JSZip, zip, i, woId, pdfBlob, err_2, woNumber, zipBlob, now, pad, zipFileName, verifyRecord, _d, clientUrl, downloadUrl_1;
                var _this = this;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            payloadRaw = (_b = (_a = formCtx.getAttribute("ts_surveypayloadjson")) === null || _a === void 0 ? void 0 : _a.getValue()) !== null && _b !== void 0 ? _b : "{}";
                            payload = JSON.parse(payloadRaw);
                            workOrderIds = (_c = payload.ids) !== null && _c !== void 0 ? _c : [];
                            includeHiddenQuestions = !!payload.includeHiddenQuestions;
                            totalUnits = workOrderIds.length;
                            if (totalUnits === 0) {
                                throw new Error("No work order IDs found in ts_surveypayloadjson.");
                            }
                            resetRowProgress(jobId);
                            Xrm.Utility.showProgressIndicator(getProgressTextStarting(totalUnits));
                            _e.label = 1;
                        case 1:
                            _e.trys.push([1, , 22, 23]);
                            return [4 /*yield*/, writeProgress(jobId, 0, totalUnits, "Starting export of " + totalUnits + " work order(s)\u2026", true)];
                        case 2:
                            _e.sent();
                            formCtx.ui.setFormNotification(getProgressTextStarting(totalUnits), "INFO", "export-progress");
                            return [4 /*yield*/, bootstrapRenderHost(formCtx)];
                        case 3:
                            renderWindow = _e.sent();
                            JSZip = renderWindow.JSZip;
                            if (!JSZip) {
                                throw new Error("JSZip is not available in the render host. Add jszip.min.js to SurveyRenderExport.html.");
                            }
                            zip = new JSZip();
                            i = 0;
                            _e.label = 4;
                        case 4:
                            if (!(i < workOrderIds.length)) return [3 /*break*/, 12];
                            woId = workOrderIds[i];
                            setCurrentRowProgress(jobId, woId);
                            Xrm.Utility.showProgressIndicator(getProgressTextGeneratingPdf(i + 1, totalUnits));
                            return [4 /*yield*/, writeProgress(jobId, i, totalUnits, "Generating PDF for work order " + (i + 1) + " of " + totalUnits + "...")];
                        case 5:
                            _e.sent();
                            pdfBlob = void 0;
                            _e.label = 6;
                        case 6:
                            _e.trys.push([6, 8, , 9]);
                            return [4 /*yield*/, generateWorkOrderPdf(woId, renderWindow, formCtx, includeHiddenQuestions)];
                        case 7:
                            pdfBlob = _e.sent();
                            return [3 /*break*/, 9];
                        case 8:
                            err_2 = _e.sent();
                            setCurrentRowProgress(jobId, null);
                            updateRowProgress(jobId, "failedIds", woId);
                            throw err_2;
                        case 9: return [4 /*yield*/, getWorkOrderNumber(woId)];
                        case 10:
                            woNumber = _e.sent();
                            zip.file(woNumber + ".pdf", pdfBlob);
                            updateRowProgress(jobId, "completedIds", woId);
                            setCurrentRowProgress(jobId, null);
                            _e.label = 11;
                        case 11:
                            i++;
                            return [3 /*break*/, 4];
                        case 12:
                            setCurrentRowProgress(jobId, null);
                            Xrm.Utility.showProgressIndicator(getProgressTextCompressing());
                            return [4 /*yield*/, writeProgress(jobId, totalUnits, totalUnits, "Compressing…", true)];
                        case 13:
                            _e.sent();
                            return [4 /*yield*/, zip.generateAsync({ type: "blob", compression: "DEFLATE" })];
                        case 14:
                            zipBlob = _e.sent();
                            now = new Date();
                            pad = function (n) { return String(n).padStart(2, "0"); };
                            zipFileName = "WorkOrder-Export-" + now.getFullYear() + "-" + pad(now.getMonth() + 1) + "-" + pad(now.getDate()) + "_" + pad(now.getHours()) + pad(now.getMinutes()) + ".zip";
                            return [4 /*yield*/, uploadFileColumn(jobId, "ts_finalexportzip", zipBlob, zipFileName)];
                        case 15:
                            _e.sent();
                            return [4 /*yield*/, Xrm.WebApi.retrieveRecord("ts_workorderexportjob", jobId, "?$select=ts_finalexportzip_name")];
                        case 16:
                            verifyRecord = _e.sent();
                            if (!verifyRecord["ts_finalexportzip_name"]) {
                                throw new Error("File column upload appeared to succeed but ts_finalexportzip_name is not populated.");
                            }
                            return [4 /*yield*/, Xrm.WebApi.updateRecord("ts_workorderexportjob", jobId, {
                                    statuscode: STATUS_COMPLETED,
                                    ts_progressmessage: getResx("ExportCompleteMessage"),
                                    ts_lastheartbeat: new Date().toISOString()
                                })];
                        case 17:
                            _e.sent();
                            formCtx.ui.clearFormNotification("export-progress");
                            formCtx.ui.setFormNotification(getResx("ExportCompletedZipReady"), "INFO", "export-complete");
                            _e.label = 18;
                        case 18:
                            _e.trys.push([18, 20, , 21]);
                            return [4 /*yield*/, formCtx.data.refresh(false)];
                        case 19:
                            _e.sent();
                            return [3 /*break*/, 21];
                        case 20:
                            _d = _e.sent();
                            return [3 /*break*/, 21];
                        case 21:
                            clientUrl = Xrm.Utility.getGlobalContext().getClientUrl();
                            downloadUrl_1 = clientUrl + "/api/data/v9.2/ts_workorderexportjobs(" + jobId + ")/ts_finalexportzip/$value";
                            window.setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                                var userChoice;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, Xrm.Navigation.openConfirmDialog({
                                                title: getResx("ExportCompletedDownloadPromptTitle"),
                                                text: getResx("ExportCompletedDownloadPromptText"),
                                                confirmButtonLabel: getResx("DownloadZIP"),
                                                cancelButtonLabel: getResx("Later")
                                            })];
                                        case 1:
                                            userChoice = _a.sent();
                                            if (userChoice === null || userChoice === void 0 ? void 0 : userChoice.confirmed) {
                                                window.open(downloadUrl_1, "_blank");
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, 2000);
                            return [3 /*break*/, 23];
                        case 22:
                            Xrm.Utility.closeProgressIndicator();
                            return [7 /*endfinally*/];
                        case 23: return [2 /*return*/];
                    }
                });
            });
        }
        // Per work order PDF
        function generateWorkOrderPdf(woId, renderWindow, _formCtx, includeHiddenQuestions) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var _b, wo, tasks, caseId, _c, findings, actions, activities, annotations, contacts, woDocs, inspectionDocs, interactions, taskDocMap, urlContext, html, renderBody, printHost, screenHost, existingPreview, pdfContainer, _i, tasks_1, task, woNumber, pdfOptions, blob;
                var _this = this;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, Promise.all([
                                fetchWorkOrderSummary(woId),
                                fetchServiceTasks(woId)
                            ])];
                        case 1:
                            _b = _d.sent(), wo = _b[0], tasks = _b[1];
                            caseId = (_a = wo["_msdyn_servicerequest_value"]) !== null && _a !== void 0 ? _a : null;
                            return [4 /*yield*/, Promise.all([
                                    caseId ? fetchFindings(caseId) : Promise.resolve([]),
                                    caseId ? fetchActions(caseId) : Promise.resolve([]),
                                    fetchActivities(woId),
                                    fetchAnnotations(woId),
                                    fetchContacts(woId),
                                    fetchWorkOrderDocuments(woId),
                                    fetchInspectionDocuments(woId)
                                ])];
                        case 2:
                            _c = _d.sent(), findings = _c[0], actions = _c[1], activities = _c[2], annotations = _c[3], contacts = _c[4], woDocs = _c[5], inspectionDocs = _c[6];
                            interactions = mergeInteractions(activities, annotations);
                            taskDocMap = {};
                            return [4 /*yield*/, Promise.all(tasks.map(function (t) { return __awaiter(_this, void 0, void 0, function () {
                                    var _a, _b;
                                    return __generator(this, function (_c) {
                                        switch (_c.label) {
                                            case 0:
                                                _a = taskDocMap;
                                                _b = t.msdyn_workorderservicetaskid;
                                                return [4 /*yield*/, fetchServiceTaskDocuments(t.msdyn_workorderservicetaskid)];
                                            case 1:
                                                _a[_b] = _c.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }))];
                        case 3:
                            _d.sent();
                            return [4 /*yield*/, getUrlContextCached()];
                        case 4:
                            urlContext = _d.sent();
                            html = buildDocumentHtml(wo, tasks, findings, actions, interactions, contacts, woDocs, inspectionDocs, taskDocMap, urlContext);
                            renderBody = renderWindow.document.body;
                            renderBody.style.margin = "0";
                            renderBody.style.padding = "0";
                            printHost = renderWindow.document.getElementById("surveyElementPrint");
                            screenHost = renderWindow.document.getElementById("surveyElement");
                            if (printHost) {
                                printHost.innerHTML = "";
                            }
                            if (screenHost) {
                                screenHost.innerHTML = "";
                                screenHost.style.display = "none";
                            }
                            existingPreview = renderWindow.document.getElementById("ts-export-preview");
                            if (existingPreview) {
                                existingPreview.remove();
                            }
                            pdfContainer = renderWindow.document.createElement("div");
                            pdfContainer.id = "ts-export-preview";
                            pdfContainer.style.display = "block";
                            pdfContainer.style.width = "7.35in";
                            pdfContainer.style.maxWidth = "7.35in";
                            pdfContainer.style.margin = "0 auto";
                            pdfContainer.style.boxSizing = "border-box";
                            pdfContainer.style.background = "#fff";
                            pdfContainer.innerHTML = html;
                            (printHost || renderBody).appendChild(pdfContainer);
                            _i = 0, tasks_1 = tasks;
                            _d.label = 5;
                        case 5:
                            if (!(_i < tasks_1.length)) return [3 /*break*/, 8];
                            task = tasks_1[_i];
                            if (!(task.ovs_questionnairedefinition && task.ovs_questionnaireresponse)) return [3 /*break*/, 7];
                            return [4 /*yield*/, renderQuestionnaire(renderWindow, task, pdfContainer, "survey-" + task.msdyn_workorderservicetaskid, includeHiddenQuestions)];
                        case 6:
                            _d.sent();
                            _d.label = 7;
                        case 7:
                            _i++;
                            return [3 /*break*/, 5];
                        case 8:
                            woNumber = fmtVal(wo, "msdyn_name") || woId;
                            pdfOptions = {
                                margin: 0.5,
                                filename: woNumber + ".pdf",
                                image: { type: "png", quality: 0.98 },
                                html2canvas: { scale: 2, useCORS: true, scrollX: 0, scrollY: 0 },
                                jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
                                pagebreak: {
                                    mode: ["css", "legacy"],
                                    avoid: [".sv_q", ".sv_row", ".sv_panel", ".form-group", ".printed-textarea", ".ts-survey-pdf-header", ".wo-section-table tr"]
                                }
                            };
                            logExportLayoutDiagnostics(pdfContainer, woId, woNumber, renderWindow, pdfOptions);
                            return [4 /*yield*/, renderWindow.html2pdf().from(pdfContainer).set(pdfOptions).output("blob")];
                        case 9:
                            blob = _d.sent();
                            return [2 /*return*/, blob];
                    }
                });
            });
        }
        function buildDocumentHtml(wo, tasks, findings, actions, interactions, contacts, woDocs, inspectionDocs, taskDocMap, urlContext) {
            var woNumber = fmtVal(wo, "msdyn_name") || "—";
            var woDate = wo["createdon"] ? wo["createdon"].split("T")[0] : "—";
            var region = fmtVal(wo, "_ts_region_value") || "—";
            var opType = fmtVal(wo, "_ovs_operationtypeid_value") || "—";
            var stakeholder = fmtVal(wo, "_msdyn_serviceaccount_value") || "—";
            var site = fmtVal(wo, "_ts_site_value") || "—";
            var workLocation = fmtVal(wo, "msdyn_worklocation") || "—";
            var description = wo["msdyn_primaryincidentdescription"] || "—";
            var businessOwner = wo["ts_businessowner"] || "—";
            var ownerDisplay = fmtVal(wo, "_ownerid_value") || "—";
            var ownerEntity = wo["_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname"] || "";
            var workOrderUrl = buildRecordUrl(urlContext, "msdyn_workorder", wo["msdyn_workorderid"]);
            var opTypeUrl = buildRecordUrl(urlContext, "ovs_operationtype", wo["_ovs_operationtypeid_value"]);
            var stakeholderUrl = buildRecordUrl(urlContext, "account", wo["_msdyn_serviceaccount_value"]);
            var siteUrl = buildRecordUrl(urlContext, "msdyn_functionallocation", wo["_ts_site_value"]);
            var ownerUrl = ownerEntity && wo["_ownerid_value"]
                ? buildRecordUrl(urlContext, ownerEntity, wo["_ownerid_value"])
                : null;
            var styles = "\n<style>\nbody { font-family: \"Segoe UI\", SegoeUI, system-ui, -apple-system, sans-serif; font-size: 10pt; color: #1a1a1a; margin: 0; }\n.wo-title { font-size: 18pt; font-weight: bold; margin-bottom: 16px; border-bottom: 2px solid #005a9e; padding-bottom: 8px; }\n.wo-section { margin-bottom: 20px; break-inside: avoid; page-break-inside: avoid; }\n.wo-section-header { font-weight: 600; text-transform: uppercase; font-size: 9pt; letter-spacing: 0.05em; background: #f0f4f8; padding: 4px 8px; border-left: 3px solid #005a9e; margin-bottom: 8px; break-after: avoid-page; page-break-after: avoid; }\n.wo-info-table { width: 100%; border-collapse: collapse; }\n.wo-info-table td { padding: 3px 6px; vertical-align: top; }\n.wo-info-table td:first-child { font-weight: 600; width: 35%; color: #555; }\n.wo-section-table { width: 100%; border-collapse: collapse; font-size: 9pt; break-before: avoid-page; page-break-before: avoid; }\n.wo-section-table th { background: #e8eef4; padding: 4px 6px; text-align: left; font-weight: 600; border: 1px solid #ccc; }\n.wo-section-table td { padding: 4px 6px; border: 1px solid #ddd; vertical-align: top; page-break-inside: avoid; }\n.wo-empty { color: #888; font-style: italic; font-size: 9pt; padding: 4px 0; break-before: avoid-page; page-break-before: avoid; }\n.wo-task-block { border: 1px solid #ccc; border-radius: 4px; margin-bottom: 16px; page-break-before: always; }\n.wo-task-header { background: #e8eef4; padding: 6px 10px; font-weight: 600; }\n.wo-task-header .wo-link { font-size: 12pt; }\n.wo-subsection.wo-service-tasks-without-docs .wo-section-table td:first-child .wo-link { font-size: 9pt; }\n.wo-task-meta { padding: 4px 10px; font-size: 9pt; color: #444; }\n.wo-task-body { padding: 0 10px 10px 10px; }\n.wo-link { color: #005a9e; text-decoration: underline; }\n.wo-plain-list { margin: 8px 0 0 18px; padding: 0; }\n.wo-plain-list li { margin: 2px 0; }\n.wo-subsection { margin: 10px 0 14px 0; padding: 8px 10px 10px 14px; border-left: 3px solid #94a3b8; background: #fafbfc; border-radius: 0 4px 4px 0; break-inside: avoid; page-break-inside: avoid; }\n.wo-subsection-header { font-weight: 600; font-size: 8.5pt; letter-spacing: 0.03em; color: #475569; text-transform: none; padding: 0 0 6px 0; margin: 0 0 6px 0; border-bottom: 1px dashed #cbd5e1; }\n.wo-subsection .wo-section-table { font-size: 8.5pt; }\n.wo-subsection .wo-section-table th { background: #eef2f6; color: #334155; }\n.wo-subsection .wo-section-table td { border-color: #e2e8f0; }\n.wo-service-tasks-body { margin-top: 4px; }\n</style>";
            var infoSection = "\n<div class=\"wo-section\">\n    <div class=\"wo-section-header\">Work Order Information</div>\n    <table class=\"wo-info-table\">\n        <tr><td>Work Order Number</td><td>" + linkOrText(woNumber, workOrderUrl) + "</td></tr>\n        <tr><td>Date</td><td>" + esc(woDate) + "</td></tr>\n        <tr><td>Region</td><td>" + esc(region) + "</td></tr>\n        <tr><td>Operation Type</td><td>" + linkOrText(opType, opTypeUrl) + "</td></tr>\n        <tr><td>Stakeholder</td><td>" + linkOrText(stakeholder, stakeholderUrl) + "</td></tr>\n        <tr><td>Site</td><td>" + linkOrText(site, siteUrl) + "</td></tr>\n        <tr><td>Work Location</td><td>" + esc(workLocation) + "</td></tr>\n        <tr><td>Description</td><td>" + esc(description) + "</td></tr>\n        <tr><td>Business Owner</td><td>" + esc(businessOwner) + "</td></tr>\n        <tr><td>Owner</td><td>" + linkOrText(ownerDisplay, ownerUrl) + "</td></tr>\n    </table>\n</div>";
            var findingsSection = "\n<div class=\"wo-section\">\n    <div class=\"wo-section-header\">Findings</div>\n    " + (findings.length === 0
                ? "<div class=\"wo-empty\">No Findings</div>"
                : "<table class=\"wo-section-table\">\n            <thead><tr><th>Description</th><th>Type</th><th>Status</th><th>Enforcement</th><th>Sensitivity</th></tr></thead>\n            <tbody>" + findings.map(function (f) { return "<tr>\n                <td>" + linkOrText(f["ovs_finding"] || "", buildRecordUrl(urlContext, "ovs_finding", f["ovs_findingid"])) + "</td>\n                <td>" + esc(fmtVal(f, "ts_findingtype") || "") + "</td>\n                <td>" + esc(fmtVal(f, "statuscode") || "") + "</td>\n                <td>" + esc(fmtVal(f, "ts_finalenforcementaction") || "") + "</td>\n                <td>" + esc(fmtVal(f, "ts_sensitivitylevel") || "") + "</td>\n            </tr>"; }).join("") + "</tbody>\n        </table>") + "\n</div>";
            var actionsSection = "\n<div class=\"wo-section\">\n    <div class=\"wo-section-header\">Actions</div>\n    " + (actions.length === 0
                ? "<div class=\"wo-empty\">No Actions</div>"
                : "<table class=\"wo-section-table\">\n            <thead><tr><th>Name</th><th>Category</th><th>Type</th></tr></thead>\n            <tbody>" + actions.map(function (a) { return "<tr>\n                <td>" + linkOrText(a["ts_name"] || "", buildRecordUrl(urlContext, "ts_action", a["ts_actionid"])) + "</td>\n                <td>" + esc(fmtVal(a, "ts_actioncategory") || "") + "</td>\n                <td>" + esc(fmtVal(a, "ts_actiontype") || "") + "</td>\n            </tr>"; }).join("") + "</tbody>\n        </table>") + "\n</div>";
            var interactionsSection = "\n<div class=\"wo-section\">\n    <div class=\"wo-section-header\">Interactions</div>\n    " + (interactions.length === 0
                ? "<div class=\"wo-empty\">No Interactions</div>"
                : "<table class=\"wo-section-table\">\n            <thead><tr><th>Subject</th><th>Type</th><th>Date</th><th>Description</th></tr></thead>\n            <tbody>" + interactions.map(function (i) { return "<tr>\n                <td>" + esc(i.subject) + "</td>\n                <td>" + esc(i.type) + "</td>\n                <td>" + esc(i.date) + "</td>\n                <td>" + esc(i.description) + "</td>\n            </tr>"; }).join("") + "</tbody>\n        </table>") + "\n</div>";
            var contactsSection = "\n<div class=\"wo-section\">\n    <div class=\"wo-section-header\">Contacts</div>\n    " + (contacts.length === 0
                ? "<div class=\"wo-empty\">No Contacts</div>"
                : "<table class=\"wo-section-table\">\n            <thead><tr><th>Name</th><th>Job Title</th><th>Email</th><th>Phone</th></tr></thead>\n            <tbody>" + contacts.map(function (c) { return "<tr>\n                <td>" + linkOrText(c["fullname"] || "", buildRecordUrl(urlContext, "contact", c["contactid"])) + "</td>\n                <td>" + esc(c["jobtitle"] || "") + "</td>\n                <td>" + mailtoOrText(c["emailaddress1"] || "") + "</td>\n                <td>" + telOrText(c["telephone1"] || "") + "</td>\n            </tr>"; }).join("") + "</tbody>\n        </table>") + "\n</div>";
            var woDocsSection = "\n<div class=\"wo-section\">\n    <div class=\"wo-section-header\">Work Order Documents</div>\n    " + (woDocs.length === 0
                ? "<div class=\"wo-empty\">No Work Order Documents</div>"
                : "<table class=\"wo-section-table\">\n            <thead><tr><th>Name</th><th>Category</th><th>Context</th><th>Link</th></tr></thead>\n            <tbody>" + woDocs.map(function (d) { return "<tr>\n                <td>" + linkOrText(d["ts_file"] || "", buildRecordUrl(urlContext, "ts_file", d["ts_fileid"])) + "</td>\n                <td>" + esc(fmtVal(d, "ts_filecategory") || "") + "</td>\n                <td>" + esc(fmtVal(d, "ts_filecontext") || "") + "</td>\n                <td>" + esc(d["ts_sharepointlink"] || "") + "</td>\n            </tr>"; }).join("") + "</tbody>\n        </table>") + "\n</div>";
            var inspectionDocsSection = "\n<div class=\"wo-section\">\n    <div class=\"wo-section-header\">Inspection Documents</div>\n    " + (inspectionDocs.length === 0
                ? "<div class=\"wo-empty\">No Inspection Documents</div>"
                : "<table class=\"wo-section-table\">\n            <thead><tr><th>Name</th><th>Category</th><th>Context</th><th>Link</th></tr></thead>\n            <tbody>" + inspectionDocs.map(function (d) { return "<tr>\n                <td>" + linkOrText(d["ts_file"] || "", buildRecordUrl(urlContext, "ts_file", d["ts_fileid"])) + "</td>\n                <td>" + esc(fmtVal(d, "ts_filecategory") || "") + "</td>\n                <td>" + esc(fmtVal(d, "ts_filecontext") || "") + "</td>\n                <td>" + esc(d["ts_sharepointlink"] || "") + "</td>\n            </tr>"; }).join("") + "</tbody>\n        </table>") + "\n</div>";
            var tasksWithoutDocs = tasks.filter(function (t) { var _a; return ((_a = taskDocMap[t.msdyn_workorderservicetaskid]) !== null && _a !== void 0 ? _a : []).length === 0; });
            var tasksWithDetailedContent = tasks.filter(function (t) {
                var _a;
                var taskDocs = (_a = taskDocMap[t.msdyn_workorderservicetaskid]) !== null && _a !== void 0 ? _a : [];
                return taskDocs.length > 0 || !!(t.ovs_questionnairedefinition && t.ovs_questionnaireresponse);
            });
            var tasksWithoutDocsSection = tasksWithoutDocs.length === 0
                ? ""
                : "<div class=\"wo-subsection wo-service-tasks-without-docs\">\n    <div class=\"wo-subsection-header\">Service Tasks Without Task Documents</div>\n    <table class=\"wo-section-table\">\n        <thead><tr><th>Service Task</th><th>Status</th><th>Inspection Result</th></tr></thead>\n        <tbody>" + tasksWithoutDocs.map(function (t) { return "<tr>\n            <td>" + linkOrText(t["msdyn_name"] || "Service Task", buildRecordUrl(urlContext, "msdyn_workorderservicetask", t["msdyn_workorderservicetaskid"])) + "</td>\n            <td>" + esc(fmtVal(t, "statuscode") || "—") + "</td>\n            <td>" + esc(fmtVal(t, "msdyn_inspectiontaskresult") || "—") + "</td>\n        </tr>"; }).join("") + "</tbody>\n    </table>\n</div>";
            var serviceTasksSection = tasksWithDetailedContent.length === 0
                ? "<div class=\"wo-empty\">No Service Tasks</div>"
                : tasksWithDetailedContent.map(function (t) {
                    var _a;
                    var taskDocs = (_a = taskDocMap[t.msdyn_workorderservicetaskid]) !== null && _a !== void 0 ? _a : [];
                    var taskDocsHtml = taskDocs.length === 0
                        ? ""
                        : "<div class=\"wo-section-header\" style=\"margin-top:8px;\">Task Documents</div>\n                    <table class=\"wo-section-table\">\n                        <thead><tr><th>Name</th><th>Category</th><th>Context</th><th>Link</th></tr></thead>\n                        <tbody>" + taskDocs.map(function (d) { return "<tr>\n                            <td>" + linkOrText(d["ts_file"] || "", buildRecordUrl(urlContext, "ts_file", d["ts_fileid"])) + "</td>\n                            <td>" + esc(fmtVal(d, "ts_filecategory") || "") + "</td>\n                            <td>" + esc(fmtVal(d, "ts_filecontext") || "") + "</td>\n                            <td>" + esc(d["ts_sharepointlink"] || "") + "</td>\n                        </tr>"; }).join("") + "</tbody>\n                    </table>";
                    return "\n<div class=\"wo-task-block\">\n    <div class=\"wo-task-header\">" + linkOrText(t["msdyn_name"] || "Service Task", buildRecordUrl(urlContext, "msdyn_workorderservicetask", t["msdyn_workorderservicetaskid"])) + "</div>\n    <div class=\"wo-task-meta\">\n        Status: " + esc(fmtVal(t, "statuscode") || "—") + " &nbsp;|&nbsp;\n        Inspection Result: " + esc(fmtVal(t, "msdyn_inspectiontaskresult") || "—") + "\n    </div>\n    <div class=\"wo-task-body\">\n        " + taskDocsHtml + "\n        " + (t.ovs_questionnairedefinition
                        ? "<div id=\"survey-" + t.msdyn_workorderservicetaskid + "\"></div>"
                        : "<div class=\"wo-empty\" style=\"margin-top:8px;\">No questionnaire</div>") + "\n    </div>\n</div>";
                }).join("");
            return styles + "\n<div class=\"wo-title\">" + linkOrText(woNumber, workOrderUrl) + "</div>\n" + infoSection + "\n" + findingsSection + "\n" + actionsSection + "\n" + interactionsSection + "\n" + contactsSection + "\n" + woDocsSection + "\n" + inspectionDocsSection + "\n<div class=\"wo-section\"><div class=\"wo-section-header\">Service Tasks</div><div class=\"wo-service-tasks-body\">" + tasksWithoutDocsSection + serviceTasksSection + "</div></div>";
        }
        // Data fetchers
        function fetchWorkOrderSummary(woId) {
            return __awaiter(this, void 0, void 0, function () {
                var select;
                return __generator(this, function (_a) {
                    select = [
                        "msdyn_name", "msdyn_workorderid", "createdon",
                        "msdyn_primaryincidentdescription", "ts_businessowner", "msdyn_worklocation",
                        "_ts_region_value", "_ovs_operationtypeid_value",
                        "_msdyn_serviceaccount_value", "_ts_site_value", "_msdyn_servicerequest_value",
                        "_ownerid_value"
                    ].join(",");
                    return [2 /*return*/, Xrm.WebApi.retrieveRecord("msdyn_workorder", woId, "?$select=" + select)];
                });
            });
        }
        function getWorkOrderNumber(woId) {
            return __awaiter(this, void 0, void 0, function () {
                var r;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Xrm.WebApi.retrieveRecord("msdyn_workorder", woId, "?$select=msdyn_name")];
                        case 1:
                            r = _a.sent();
                            return [2 /*return*/, r["msdyn_name"] || woId];
                    }
                });
            });
        }
        function fetchServiceTasks(woId) {
            return __awaiter(this, void 0, void 0, function () {
                var r;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Xrm.WebApi.retrieveMultipleRecords("msdyn_workorderservicetask", "?$filter=_msdyn_workorder_value eq '" + woId + "'" +
                                "&$select=msdyn_workorderservicetaskid,msdyn_name,statuscode,msdyn_inspectiontaskresult,ovs_questionnairedefinition,ovs_questionnaireresponse" +
                                "&$orderby=createdon asc")];
                        case 1:
                            r = _a.sent();
                            return [2 /*return*/, r.entities];
                    }
                });
            });
        }
        function fetchFindings(caseId) {
            return __awaiter(this, void 0, void 0, function () {
                var r;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Xrm.WebApi.retrieveMultipleRecords("ovs_finding", "?$filter=_ovs_caseid_value eq '" + caseId + "' and statecode eq 0" +
                                "&$select=ovs_findingid,ovs_finding,ts_findingtype,statuscode,ts_finalenforcementaction,ts_sensitivitylevel")];
                        case 1:
                            r = _a.sent();
                            return [2 /*return*/, r.entities];
                    }
                });
            });
        }
        function fetchActions(caseId) {
            return __awaiter(this, void 0, void 0, function () {
                var r;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Xrm.WebApi.retrieveMultipleRecords("ts_action", "?$filter=_ts_case_value eq '" + caseId + "' and statecode eq 0" +
                                "&$select=ts_actionid,ts_name,ts_actioncategory,ts_actiontype" +
                                "&$orderby=createdon asc")];
                        case 1:
                            r = _a.sent();
                            return [2 /*return*/, r.entities];
                    }
                });
            });
        }
        function fetchActivities(woId) {
            return __awaiter(this, void 0, void 0, function () {
                var r;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Xrm.WebApi.retrieveMultipleRecords("activitypointer", "?$filter=_regardingobjectid_value eq '" + woId + "'" +
                                " and (activitytypecode eq 'appointment' or activitytypecode eq 'email' or activitytypecode eq 'phonecall' or activitytypecode eq 'task')" +
                                "&$select=subject,activitytypecode,description,createdon" +
                                "&$orderby=createdon desc")];
                        case 1:
                            r = _a.sent();
                            return [2 /*return*/, r.entities];
                    }
                });
            });
        }
        function fetchAnnotations(woId) {
            return __awaiter(this, void 0, void 0, function () {
                var r;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Xrm.WebApi.retrieveMultipleRecords("annotation", "?$filter=_objectid_value eq '" + woId + "'" +
                                "&$select=subject,notetext,filename,isdocument,createdon" +
                                "&$orderby=createdon desc")];
                        case 1:
                            r = _a.sent();
                            return [2 /*return*/, r.entities];
                    }
                });
            });
        }
        function fetchContacts(woId) {
            return __awaiter(this, void 0, void 0, function () {
                var r, _a, fetchXml, r, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 2, , 7]);
                            return [4 /*yield*/, Xrm.WebApi.retrieveMultipleRecords("contact", "?$filter=ts_Contact_msdyn_workorder_msdyn_workorder/any(w: w/msdyn_workorderid eq '" + woId + "')" +
                                    "&$select=contactid,fullname,jobtitle,emailaddress1,telephone1")];
                        case 1:
                            r = _c.sent();
                            return [2 /*return*/, r.entities];
                        case 2:
                            _a = _c.sent();
                            _c.label = 3;
                        case 3:
                            _c.trys.push([3, 5, , 6]);
                            fetchXml = "<fetch distinct=\"true\">" +
                                "<entity name=\"contact\">" +
                                "<attribute name=\"contactid\" />" +
                                "<attribute name=\"fullname\" />" +
                                "<attribute name=\"jobtitle\" />" +
                                "<attribute name=\"emailaddress1\" />" +
                                "<attribute name=\"telephone1\" />" +
                                "<link-entity name=\"ts_contact_msdyn_workorder\" intersect=\"true\" visible=\"false\" to=\"contactid\" from=\"contactid\">" +
                                "<link-entity name=\"msdyn_workorder\" from=\"msdyn_workorderid\" to=\"msdyn_workorderid\" alias=\"wo\">" +
                                ("<filter><condition attribute=\"msdyn_workorderid\" operator=\"eq\" value=\"" + woId + "\" /></filter>") +
                                "</link-entity>" +
                                "</link-entity>" +
                                "</entity>" +
                                "</fetch>";
                            return [4 /*yield*/, Xrm.WebApi.retrieveMultipleRecords("contact", "?fetchXml=" + encodeURIComponent(fetchXml))];
                        case 4:
                            r = _c.sent();
                            return [2 /*return*/, r.entities];
                        case 5:
                            _b = _c.sent();
                            return [2 /*return*/, []];
                        case 6: return [3 /*break*/, 7];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        }
        function fetchWorkOrderDocuments(woId) {
            return __awaiter(this, void 0, void 0, function () {
                var r, _a, fetchXml, r, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 2, , 7]);
                            return [4 /*yield*/, Xrm.WebApi.retrieveMultipleRecords("ts_file", "?$filter=ts_Files_msdyn_workorders/any(w: w/msdyn_workorderid eq '" + woId + "')" +
                                    "&$select=ts_file,ts_filecategory,ts_filecontext,ts_sharepointlink,ts_fileid,createdon" +
                                    "&$orderby=ts_file asc")];
                        case 1:
                            r = _c.sent();
                            return [2 /*return*/, deduplicateDocs(r.entities)];
                        case 2:
                            _a = _c.sent();
                            _c.label = 3;
                        case 3:
                            _c.trys.push([3, 5, , 6]);
                            fetchXml = "<fetch distinct=\"true\">" +
                                "<entity name=\"ts_file\">" +
                                "<attribute name=\"ts_file\" />" +
                                "<attribute name=\"ts_filecategory\" />" +
                                "<attribute name=\"ts_filecontext\" />" +
                                "<attribute name=\"ts_sharepointlink\" />" +
                                "<attribute name=\"ts_fileid\" />" +
                                "<attribute name=\"createdon\" />" +
                                "<order attribute=\"ts_file\" descending=\"false\" />" +
                                "<link-entity name=\"ts_files_msdyn_workorders\" intersect=\"true\" visible=\"false\" to=\"ts_fileid\" from=\"ts_fileid\">" +
                                "<link-entity name=\"msdyn_workorder\" from=\"msdyn_workorderid\" to=\"msdyn_workorderid\" alias=\"wo\">" +
                                ("<filter><condition attribute=\"msdyn_workorderid\" operator=\"eq\" value=\"" + woId + "\" /></filter>") +
                                "</link-entity>" +
                                "</link-entity>" +
                                "</entity>" +
                                "</fetch>";
                            return [4 /*yield*/, Xrm.WebApi.retrieveMultipleRecords("ts_file", "?fetchXml=" + encodeURIComponent(fetchXml))];
                        case 4:
                            r = _c.sent();
                            return [2 /*return*/, deduplicateDocs(r.entities)];
                        case 5:
                            _b = _c.sent();
                            return [2 /*return*/, []];
                        case 6: return [3 /*break*/, 7];
                        case 7: return [2 /*return*/];
                    }
                });
            });
        }
        function fetchInspectionDocuments(woId) {
            return __awaiter(this, void 0, void 0, function () {
                var r, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, Xrm.WebApi.retrieveMultipleRecords("ts_file", "?$filter=_ts_msdyn_workorder_value eq '" + woId + "'" +
                                    "&$select=ts_file,ts_filecategory,ts_filecontext,ts_sharepointlink,ts_fileid,createdon" +
                                    "&$orderby=ts_file asc")];
                        case 1:
                            r = _b.sent();
                            return [2 /*return*/, deduplicateDocs(r.entities)];
                        case 2:
                            _a = _b.sent();
                            return [2 /*return*/, []];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        function fetchServiceTaskDocuments(taskId) {
            return __awaiter(this, void 0, void 0, function () {
                var r, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, Xrm.WebApi.retrieveMultipleRecords("ts_file", "?$filter=_ts_workorderservicetask_value eq '" + taskId + "'" +
                                    "&$select=ts_file,ts_filecategory,ts_filecontext,ts_sharepointlink,ts_fileid,createdon" +
                                    "&$orderby=ts_file asc")];
                        case 1:
                            r = _b.sent();
                            return [2 /*return*/, deduplicateDocs(r.entities)];
                        case 2:
                            _a = _b.sent();
                            return [2 /*return*/, []];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        function deduplicateDocs(docs) {
            var seen = new Set();
            return docs.filter(function (d) {
                var _a, _b;
                var key = ((_a = d["ts_file"]) !== null && _a !== void 0 ? _a : "") + "|" + ((_b = d["ts_sharepointlink"]) !== null && _b !== void 0 ? _b : "");
                if (seen.has(key))
                    return false;
                seen.add(key);
                return true;
            });
        }
        // Interactions (activities + notes)
        function mergeInteractions(activities, annotations) {
            var result = [];
            for (var _i = 0, activities_1 = activities; _i < activities_1.length; _i++) {
                var a = activities_1[_i];
                result.push({
                    subject: a["subject"] || "—",
                    type: fmtVal(a, "activitytypecode") || "Activity",
                    date: fmtDate(a["createdon"]),
                    createdon: a["createdon"] || "",
                    description: sanitizeInteractionDescription(a["description"] || "")
                });
            }
            for (var _a = 0, annotations_1 = annotations; _a < annotations_1.length; _a++) {
                var n = annotations_1[_a];
                var subject = n["subject"] || "";
                if (!subject)
                    subject = n["isdocument"] ? "Attachment" : "Note";
                var description = sanitizeInteractionDescription(n["notetext"] || "");
                if (!description && n["isdocument"])
                    description = "Attachment: " + (n["filename"] || "");
                result.push({ subject: subject, type: "Note", date: fmtDate(n["createdon"]), createdon: n["createdon"] || "", description: description });
            }
            result.sort(function (a, b) { return b.createdon.localeCompare(a.createdon); });
            return result;
        }
        function sanitizeInteractionDescription(value) {
            return (value || "")
                .replace(/<br\s*\/?>/gi, "\n")
                .replace(/<\/p>\s*<p>/gi, "\n")
                .replace(/<[^>]+>/g, "")
                .trim();
        }
        // Questionnaire rendering
        function renderQuestionnaire(renderWindow, task, pdfContainer, targetId, includeHiddenQuestions) {
            return __awaiter(this, void 0, void 0, function () {
                var Survey, $, targetEl, surveyDef, surveyData, survey, styleEl;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            Survey = renderWindow.Survey;
                            $ = renderWindow.jQuery;
                            if (!Survey || !$)
                                return [2 /*return*/];
                            targetEl = pdfContainer.querySelector("#" + targetId);
                            if (!targetEl)
                                return [2 /*return*/];
                            try {
                                surveyDef = typeof task.ovs_questionnairedefinition === "string"
                                    ? JSON.parse(task.ovs_questionnairedefinition)
                                    : task.ovs_questionnairedefinition;
                                surveyData = typeof task.ovs_questionnaireresponse === "string"
                                    ? JSON.parse(task.ovs_questionnaireresponse)
                                    : task.ovs_questionnaireresponse;
                            }
                            catch (_b) {
                                targetEl.innerHTML = "<div class=\"wo-empty\">Questionnaire data could not be parsed.</div>";
                                return [2 /*return*/];
                            }
                            if (includeHiddenQuestions) {
                                clearVisibleIfRules(surveyDef);
                            }
                            survey = new Survey.Model(surveyDef);
                            survey.mode = "display";
                            survey.data = surveyData !== null && surveyData !== void 0 ? surveyData : {};
                            // Question titles/descriptions in this system contain HTML (e.g. <strong>, <p>).
                            // SurveyJS escapes text by default, so we pass the raw text through as HTML.
                            if (survey.onTextMarkdown) {
                                survey.onTextMarkdown.add(function (_s, opts) {
                                    opts.html = opts.text;
                                });
                            }
                            styleEl = renderWindow.document.createElement("style");
                            styleEl.textContent = "\n.sv_nav, .sv_progress { display: none !important; }\n.printed-textarea {\n    margin-top: 6px;\n    padding: 8px 10px;\n    border: 1px solid #b8c4d0;\n    border-left: 3px solid #005a9e;\n    border-radius: 3px;\n    background: #f8fafc;\n    white-space: pre-wrap;\n}\n";
                            renderWindow.document.head.appendChild(styleEl);
                            targetEl.id = "survey-render-" + task.msdyn_workorderservicetaskid;
                            $(targetEl).Survey({ model: survey });
                            return [4 /*yield*/, waitForRender(renderWindow, targetEl, 10000)];
                        case 1:
                            _a.sent();
                            // html2pdf snapshots the DOM; inputs don't print reliably — flatten to text.
                            simplifyRenderedSurvey(targetEl);
                            return [2 /*return*/];
                    }
                });
            });
        }
        function clearVisibleIfRules(node) {
            if (!node || typeof node !== "object")
                return;
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
        function waitForRender(renderWindow, el, timeoutMs) {
            return new Promise(function (resolve, reject) {
                var start = Date.now();
                function check() {
                    if (el.querySelector(".sv_q") || (Date.now() - start) >= timeoutMs) {
                        resolve();
                    }
                    else {
                        renderWindow.setTimeout(check, 200);
                    }
                }
                check();
            });
        }
        function simplifyRenderedSurvey(el) {
            var surveyDocument = el.ownerDocument || document;
            el.querySelectorAll(".character-count").forEach(function (node) { return node.remove(); });
            el.querySelectorAll("textarea").forEach(function (ta) {
                var _a;
                var div = surveyDocument.createElement("div");
                div.className = "printed-textarea";
                div.textContent = ta.value;
                (_a = ta.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(div, ta);
            });
            el.querySelectorAll("input[type='radio']").forEach(function (r) {
                var _a, _b;
                var inp = r;
                var span = surveyDocument.createElement("span");
                span.textContent = inp.checked ? "● " : "○ ";
                (_a = r.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(span, r);
                (_b = r.parentNode) === null || _b === void 0 ? void 0 : _b.removeChild(r);
            });
            el.querySelectorAll("input[type='checkbox']").forEach(function (c) {
                var _a, _b;
                var inp = c;
                var span = surveyDocument.createElement("span");
                span.textContent = inp.checked ? "☑ " : "☐ ";
                (_a = c.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(span, c);
                (_b = c.parentNode) === null || _b === void 0 ? void 0 : _b.removeChild(c);
            });
            el.querySelectorAll("select").forEach(function (s) {
                var _a, _b, _c;
                var span = surveyDocument.createElement("em");
                span.textContent = (_b = (_a = s.options[s.selectedIndex]) === null || _a === void 0 ? void 0 : _a.text) !== null && _b !== void 0 ? _b : "";
                (_c = s.parentNode) === null || _c === void 0 ? void 0 : _c.replaceChild(span, s);
            });
        }
        // PDF layout diagnostics (console)
        function describeElementForLog(el) {
            var htmlEl = el;
            var tag = (el.tagName || "").toLowerCase();
            var id = htmlEl.id ? "#" + htmlEl.id : "";
            var className = typeof htmlEl.className === "string"
                ? htmlEl.className.trim().replace(/\s+/g, ".")
                : "";
            var classPart = className ? "." + className : "";
            return "" + tag + id + classPart;
        }
        function logExportLayoutDiagnostics(pdfContainer, woId, woNumber, renderWindow, pdfOptions) {
            var _a, _b, _c, _d;
            var renderDocEl = renderWindow.document.documentElement;
            var renderBodyEl = renderWindow.document.body;
            var containerRect = pdfContainer.getBoundingClientRect();
            var overflowing = [];
            var widest = null;
            pdfContainer.querySelectorAll("*").forEach(function (el) {
                var htmlEl = el;
                var clientWidth = htmlEl.clientWidth || 0;
                var scrollWidth = htmlEl.scrollWidth || 0;
                var offsetWidth = htmlEl.offsetWidth || 0;
                var rect = htmlEl.getBoundingClientRect();
                var relativeLeft = Math.round(rect.left - containerRect.left);
                var relativeRight = Math.round(rect.right - containerRect.left);
                var entry = {
                    element: describeElementForLog(el),
                    clientWidth: clientWidth,
                    scrollWidth: scrollWidth,
                    offsetWidth: offsetWidth,
                    relativeLeft: relativeLeft,
                    relativeRight: relativeRight,
                    textSample: (htmlEl.textContent || "").trim().slice(0, 120)
                };
                if (!widest || scrollWidth > (widest.scrollWidth || 0)) {
                    widest = entry;
                }
                if (scrollWidth > pdfContainer.clientWidth + 2 ||
                    relativeLeft < -2 ||
                    relativeRight > pdfContainer.clientWidth + 2) {
                    overflowing.push(entry);
                }
            });
            console.info("[WOExport][PDFLayout]", {
                woId: woId,
                woNumber: woNumber,
                pdfContainerClientWidth: pdfContainer.clientWidth,
                pdfContainerScrollWidth: pdfContainer.scrollWidth,
                pdfContainerOffsetWidth: pdfContainer.offsetWidth,
                renderBodyClientWidth: (_a = renderBodyEl === null || renderBodyEl === void 0 ? void 0 : renderBodyEl.clientWidth) !== null && _a !== void 0 ? _a : null,
                renderBodyScrollWidth: (_b = renderBodyEl === null || renderBodyEl === void 0 ? void 0 : renderBodyEl.scrollWidth) !== null && _b !== void 0 ? _b : null,
                renderDocClientWidth: (_c = renderDocEl === null || renderDocEl === void 0 ? void 0 : renderDocEl.clientWidth) !== null && _c !== void 0 ? _c : null,
                renderDocScrollWidth: (_d = renderDocEl === null || renderDocEl === void 0 ? void 0 : renderDocEl.scrollWidth) !== null && _d !== void 0 ? _d : null,
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
        function bootstrapRenderHost(formCtx) {
            var _a;
            return __awaiter(this, void 0, void 0, function () {
                var control, renderWindow;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            control = formCtx.getControl("WebResource_RenderHost_1");
                            if (!control)
                                throw new Error("Render host control 'WebResource_RenderHost_1' not found on form.");
                            renderWindow = (_a = control.getObject()) === null || _a === void 0 ? void 0 : _a.contentWindow;
                            if (!renderWindow)
                                throw new Error("Could not access contentWindow of render host.");
                            // Web resource iframe loads Survey / html2pdf / jQuery asynchronously.
                            return [4 /*yield*/, waitForCondition(function () {
                                    var _a;
                                    return !!((_a = renderWindow.Survey) === null || _a === void 0 ? void 0 : _a.Model) &&
                                        !!renderWindow.html2pdf &&
                                        !!renderWindow.jQuery;
                                }, 15000, 200)];
                        case 1:
                            // Web resource iframe loads Survey / html2pdf / jQuery asynchronously.
                            _b.sent();
                            return [2 /*return*/, renderWindow];
                    }
                });
            });
        }
        function waitForCondition(condition, timeoutMs, intervalMs) {
            return new Promise(function (resolve, reject) {
                var start = Date.now();
                function check() {
                    if (condition()) {
                        resolve();
                        return;
                    }
                    if (Date.now() - start >= timeoutMs) {
                        reject(new Error("Timeout waiting for render host libraries."));
                        return;
                    }
                    setTimeout(check, intervalMs);
                }
                check();
            });
        }
        // File column upload (Dataverse)
        function uploadFileColumn(jobId, columnName, blob, fileName) {
            return __awaiter(this, void 0, void 0, function () {
                var clientUrl, entitySetName, url, arrayBuffer, putResponse;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            clientUrl = Xrm.Utility.getGlobalContext().getClientUrl();
                            entitySetName = "ts_workorderexportjobs";
                            url = clientUrl + "/api/data/v9.2/" + entitySetName + "(" + jobId + ")/" + columnName;
                            return [4 /*yield*/, blob.arrayBuffer()];
                        case 1:
                            arrayBuffer = _a.sent();
                            return [4 /*yield*/, fetch(url, {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/octet-stream",
                                        "x-ms-file-name": fileName
                                    },
                                    body: arrayBuffer
                                })];
                        case 2:
                            putResponse = _a.sent();
                            if (putResponse.ok)
                                return [2 /*return*/];
                            return [4 /*yield*/, chunkedUpload(clientUrl, entitySetName, jobId, columnName, arrayBuffer, fileName)];
                        case 3:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
        function chunkedUpload(clientUrl, entitySetName, jobId, columnName, data, fileName) {
            return __awaiter(this, void 0, void 0, function () {
                var base, initResp, FileContinuationToken, BLOCK_SIZE, blockIds, offset, blockNum, chunk, blockId, blockData, uploadResp, commitResp;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            base = clientUrl + "/api/data/v9.2/" + entitySetName + "(" + jobId + ")";
                            return [4 /*yield*/, fetch(base + "/Microsoft.Dynamics.CRM.InitializeFileBlocksUpload", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({
                                        Target: { "@odata.type": "Microsoft.Dynamics.CRM.ts_workorderexportjob", ts_workorderexportjobid: jobId },
                                        FileAttributeName: columnName
                                    })
                                })];
                        case 1:
                            initResp = _a.sent();
                            if (!initResp.ok)
                                throw new Error("InitializeFileBlocksUpload failed: " + initResp.status);
                            return [4 /*yield*/, initResp.json()];
                        case 2:
                            FileContinuationToken = (_a.sent()).FileContinuationToken;
                            BLOCK_SIZE = 4 * 1024 * 1024;
                            blockIds = [];
                            offset = 0, blockNum = 0;
                            _a.label = 3;
                        case 3:
                            if (!(offset < data.byteLength)) return [3 /*break*/, 6];
                            chunk = data.slice(offset, offset + BLOCK_SIZE);
                            blockId = btoa(blockNum.toString().padStart(8, "0"));
                            blockIds.push(blockId);
                            blockData = arrayBufferToBase64(chunk);
                            return [4 /*yield*/, fetch(base + "/Microsoft.Dynamics.CRM.UploadBlock", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ FileContinuationToken: FileContinuationToken, BlockId: blockId, BlockData: blockData })
                                })];
                        case 4:
                            uploadResp = _a.sent();
                            if (!uploadResp.ok)
                                throw new Error("UploadBlock " + blockNum + " failed: " + uploadResp.status);
                            _a.label = 5;
                        case 5:
                            offset += BLOCK_SIZE, blockNum++;
                            return [3 /*break*/, 3];
                        case 6: return [4 /*yield*/, fetch(base + "/Microsoft.Dynamics.CRM.CommitFileBlocksUpload", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ FileContinuationToken: FileContinuationToken, BlockList: blockIds, FileName: fileName })
                            })];
                        case 7:
                            commitResp = _a.sent();
                            if (!commitResp.ok)
                                throw new Error("CommitFileBlocksUpload failed: " + commitResp.status);
                            return [2 /*return*/];
                    }
                });
            });
        }
        function arrayBufferToBase64(buffer) {
            var bytes = new Uint8Array(buffer);
            var binary = "";
            for (var i = 0; i < bytes.byteLength; i++)
                binary += String.fromCharCode(bytes[i]);
            return btoa(binary);
        }
        // Progress & job status
        function writeProgress(jobId, doneUnits, totalUnits, message, force) {
            if (force === void 0) { force = false; }
            return __awaiter(this, void 0, void 0, function () {
                var now;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            now = Date.now();
                            if (!force && (now - lastProgressWriteMs) < PROGRESS_WRITE_THROTTLE_MS)
                                return [2 /*return*/];
                            lastProgressWriteMs = now;
                            return [4 /*yield*/, Xrm.WebApi.updateRecord("ts_workorderexportjob", jobId, {
                                    ts_doneunits: doneUnits,
                                    ts_totalunits: totalUnits,
                                    ts_progressmessage: message,
                                    ts_lastheartbeat: new Date().toISOString()
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
        function failJob(jobId, formCtx, message) {
            return __awaiter(this, void 0, void 0, function () {
                var truncated, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            truncated = message.length > 500 ? message.substring(0, 497) + "…" : message;
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, Xrm.WebApi.updateRecord("ts_workorderexportjob", jobId, {
                                    statuscode: STATUS_ERROR,
                                    ts_errormessage: truncated,
                                    ts_lastheartbeat: new Date().toISOString()
                                })];
                        case 2:
                            _b.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            _a = _b.sent();
                            return [3 /*break*/, 4];
                        case 4:
                            Xrm.Utility.closeProgressIndicator();
                            try {
                                formCtx.ui.clearFormNotification("export-progress");
                            }
                            catch (_c) { }
                            formCtx.ui.setFormNotification(getResx("ExportFailedSeeError") + " " + truncated, "ERROR", "export-error");
                            return [2 /*return*/];
                    }
                });
            });
        }
        // Strings / URLs
        function getResx(key) {
            return (Xrm.Utility.getResourceString("ts_/resx/WorkOrderExport", key) || "").trim() || key;
        }
        function esc(s) {
            return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
        }
        function buildRecordUrl(urlContext, entityLogicalName, recordId) {
            if (!urlContext || !entityLogicalName || !recordId)
                return null;
            var cleanId = String(recordId).replace(/[{}]/g, "").trim().toLowerCase();
            if (!cleanId)
                return null;
            return ("" + urlContext.appBaseUrl +
                ("pagetype=entityrecord&etn=" + encodeURIComponent(entityLogicalName) + "&id=" + encodeURIComponent(cleanId)));
        }
        function linkOrText(text, url) {
            var label = esc(text || "");
            if (!url)
                return label;
            return "<a class=\"wo-link\" href=\"" + esc(url) + "\" target=\"_blank\" rel=\"noopener noreferrer\">" + label + "</a>";
        }
        function mailtoOrText(email) {
            var e = (email || "").trim();
            if (!e)
                return esc("—");
            var href = "mailto:" + e;
            return "<a class=\"wo-link\" href=\"" + esc(href) + "\">" + esc(e) + "</a>";
        }
        function telOrText(phone) {
            var p = (phone || "").trim();
            if (!p)
                return esc("—");
            var dial = p.replace(/[^\d+]/g, "");
            if (!dial)
                return esc(p);
            return "<a class=\"wo-link\" href=\"" + esc("tel:" + dial) + "\">" + esc(p) + "</a>";
        }
        function getUrlContextCached() {
            return __awaiter(this, void 0, void 0, function () {
                var appBaseUrl, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (cachedUrlContext)
                                return [2 /*return*/, cachedUrlContext];
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, getModelDrivenAppBaseUrl()];
                        case 2:
                            appBaseUrl = (_b.sent()) || "";
                            if (!appBaseUrl)
                                return [2 /*return*/, null];
                            cachedUrlContext = { appBaseUrl: appBaseUrl };
                            return [2 /*return*/, cachedUrlContext];
                        case 3:
                            _a = _b.sent();
                            return [2 /*return*/, null];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        /** OData formatted display value when present (option sets, lookups); else raw field value. */
        function fmtVal(record, field) {
            var _a, _b;
            return (_b = (_a = record[field + "@OData.Community.Display.V1.FormattedValue"]) !== null && _a !== void 0 ? _a : record[field]) !== null && _b !== void 0 ? _b : "";
        }
        function fmtDate(iso) {
            if (!iso)
                return "—";
            var d = new Date(iso);
            var pad = function (n) { return String(n).padStart(2, "0"); };
            return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()) + " " + pad(d.getHours()) + ":" + pad(d.getMinutes());
        }
    })(WorkOrderExportJob = ROM.WorkOrderExportJob || (ROM.WorkOrderExportJob = {}));
})(ROM || (ROM = {}));
