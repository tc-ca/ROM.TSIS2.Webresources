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
    var WorkOrderServiceTaskWorkspace;
    (function (WorkOrderServiceTaskWorkspace) {
        var lang = Xrm.Utility.getGlobalContext().userSettings.languageId;
        var enterStartDateToProceedText = lang === 1036 ? "Entrez une date de début pour continuer" : "Enter a start date to proceed";
        var enterTaskTypeToProceedText = lang === 1036 ? "Entrez un type de tâche pour continuer" : "Enter a task type to proceed";
        var noQuestionnaireText = lang === 1036 ? "Il n'y a pas de questionnaire disponible pour cette date." : "There is no questionnaire available for this date.";
        function onLoad(eContext) {
            return __awaiter(this, void 0, void 0, function () {
                var Form, workOrderStartDateCtl, workOrderStartDateValue;
                return __generator(this, function (_a) {
                    Form = eContext.getFormContext();
                    workOrderStartDateCtl = Form.getControl("ts_workorderservicetaskstartdate");
                    workOrderStartDateValue = Form.getAttribute("ts_workorderservicetaskstartdate").getValue();
                    // Also, add a message that work order service task start date should be filled in to proceed.
                    if (workOrderStartDateValue == null) {
                        workOrderStartDateCtl.setNotification(enterStartDateToProceedText, "ts_workorderservicetaskstartdate_entertoproceed");
                    }
                    //If work order service task already has a start date, disable the control.
                    else {
                        workOrderStartDateCtl.setDisabled(true);
                    }
                    return [2 /*return*/];
                });
            });
        }
        WorkOrderServiceTaskWorkspace.onLoad = onLoad;
        /**
         * This function is triggered when the Work Order Service Task is changed.
         * It checks if the related task type has a custom questionnaire or if a valid questionnaire version exists for the selected date.
         * @param eContext - The execution context of the form.
         */
        function workOrderServiceTaskStartDateOnChange(eContext) {
            var _a, _b, _c, _d;
            return __awaiter(this, void 0, void 0, function () {
                var formContext, serviceTaskStartDate, workOrderTaskLookup, startDateCtl, workOrderTaskId, wost, taskTypeId, taskType, questionnaireId, dateString, fetchXml, result, error_1;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            formContext = eContext.getFormContext();
                            serviceTaskStartDate = (_a = formContext.getAttribute("ts_workorderservicetaskstartdate")) === null || _a === void 0 ? void 0 : _a.getValue();
                            workOrderTaskLookup = (_b = formContext.getAttribute("ts_workorderservicetask")) === null || _b === void 0 ? void 0 : _b.getValue();
                            startDateCtl = formContext.getControl("ts_workorderservicetaskstartdate");
                            startDateCtl.clearNotification("ts_workorderservicetaskstartdate_entertoproceed");
                            if (!workOrderTaskLookup) {
                                console.warn("No related Work Order Service Task found.");
                                return [2 /*return*/];
                            }
                            workOrderTaskId = workOrderTaskLookup[0].id.replace(/{|}/g, "");
                            _e.label = 1;
                        case 1:
                            _e.trys.push([1, 5, , 6]);
                            return [4 /*yield*/, Xrm.WebApi.retrieveRecord("msdyn_workorderservicetask", workOrderTaskId, "?$select=msdyn_workorderservicetaskid&$expand=msdyn_tasktype($select=msdyn_servicetasktypeid)")];
                        case 2:
                            wost = _e.sent();
                            console.log("Retrieved Work Order Service Task:", wost);
                            if (!wost.msdyn_tasktype) {
                                startDateCtl.setNotification(enterTaskTypeToProceedText, "ts_tasktype_entertoproceed");
                                return [2 /*return*/];
                            }
                            taskTypeId = (_c = wost.msdyn_tasktype) === null || _c === void 0 ? void 0 : _c.msdyn_servicetasktypeid;
                            console.log("msdyn_tasktype:", taskTypeId);
                            return [4 /*yield*/, Xrm.WebApi.retrieveRecord("msdyn_servicetasktype", taskTypeId, "?$select=ts_hascustomquestionnaire,ovs_questionnaireenabled&$expand=ovs_Questionnaire($select=ovs_questionnaireid)")];
                        case 3:
                            taskType = _e.sent();
                            if (taskType.ts_hascustomquestionnaire) {
                                // Allow immediately if using a custom questionnaire
                                console.info("Custom questionnaire in use; date accepted without further validation.");
                                return [2 /*return*/];
                            }
                            if (!taskType.ovs_questionnaireenabled) {
                                startDateCtl.setNotification(noQuestionnaireText, "ts_workorderservicetaskstartdate_entertoproceed");
                                return [2 /*return*/];
                            }
                            if (!serviceTaskStartDate) {
                                startDateCtl.setNotification(enterStartDateToProceedText, "ts_workorderservicetaskstartdate_entertoproceed");
                                return [2 /*return*/];
                            }
                            questionnaireId = (_d = taskType.ovs_Questionnaire) === null || _d === void 0 ? void 0 : _d.ovs_questionnaireid;
                            if (!questionnaireId) {
                                startDateCtl.setNotification(noQuestionnaireText, "ts_workorderservicetaskstartdate_entertoproceed");
                                return [2 /*return*/];
                            }
                            dateString = serviceTaskStartDate.toISOString().slice(0, 10);
                            fetchXml = "\n                <fetch top='1'>\n                  <entity name='ts_questionnaireversion'>\n                    <attribute name='ts_questionnairedefinition' />\n                    <attribute name='ts_name' />\n                    <attribute name='ts_effectivestartdate' />\n                    <attribute name='ts_effectiveenddate' />\n                    <filter type='and'>\n                      <condition attribute='ts_effectivestartdate' operator='on-or-before' value='" + dateString + "' />\n                      <filter type='or'>\n                        <condition attribute='ts_effectiveenddate' operator='on-or-after' value='" + dateString + "' />\n                        <condition attribute='ts_effectiveenddate' operator='null' />\n                      </filter>\n                      <condition attribute='ts_ovs_questionnaire' operator='eq' value='" + questionnaireId + "' />\n                    </filter>\n                  </entity>\n                </fetch>";
                            return [4 /*yield*/, Xrm.WebApi.retrieveMultipleRecords("ts_questionnaireversion", "?fetchXml=" + encodeURIComponent(fetchXml))];
                        case 4:
                            result = _e.sent();
                            if (result.entities.length === 0) {
                                startDateCtl.setNotification(noQuestionnaireText, "ts_workorderservicetaskstartdate_entertoproceed");
                                return [2 /*return*/];
                            }
                            // Valid questionnaire version found; no further action needed
                            console.info("Valid questionnaire version found for the selected date.");
                            return [2 /*return*/];
                        case 5:
                            error_1 = _e.sent();
                            console.error(error_1);
                            Xrm.Navigation.openAlertDialog({ text: "Error: " + error_1.message });
                            return [3 /*break*/, 6];
                        case 6: return [2 /*return*/];
                    }
                });
            });
        }
        WorkOrderServiceTaskWorkspace.workOrderServiceTaskStartDateOnChange = workOrderServiceTaskStartDateOnChange;
    })(WorkOrderServiceTaskWorkspace = ROM.WorkOrderServiceTaskWorkspace || (ROM.WorkOrderServiceTaskWorkspace = {}));
})(ROM || (ROM = {}));
