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
    var WorkOrderServiceTask;
    (function (WorkOrderServiceTask) {
        // EVENTS
        var mode = '';
        function ToggleQuestionnaire(eContext) {
            var Form = eContext.getFormContext();
            // Get the web resource control on the form
            var wrCtrl = Form.getControl('WebResource_QuestionnaireRender');
            var questionnaireDefinition = Form.getAttribute('ovs_questionnairedefinition').getValue();
            var questionnaireResponse = Form.getAttribute('ovs_questionnaireresponse').getValue();
            // Exit if no questionnaire exists
            if (questionnaireDefinition === null) {
                wrCtrl.setVisible(false);
                return;
            }
            // Get Questionnaire definition
            wrCtrl.setVisible(true);
            InitiateSurvey(eContext, wrCtrl, questionnaireDefinition, questionnaireResponse, mode);
        }
        WorkOrderServiceTask.ToggleQuestionnaire = ToggleQuestionnaire;
        function onLoad(eContext) {
            var Form = eContext.getFormContext();
            //Lock Task Type field if it has a value.
            if (Form.getAttribute("msdyn_tasktype").getValue() != null) {
                Form.getControl("msdyn_tasktype").setDisabled(true);
            }
            if (Form.getAttribute('statecode').getValue() == 1) {
                mode = "display";
            }
            UpdateQuestionnaireDefinition(eContext);
        }
        WorkOrderServiceTask.onLoad = onLoad;
        //If Status Reason is New, replace ovs_questionnairedefinition with definition from the Service Task Type Lookup field
        function UpdateQuestionnaireDefinition(eContext) {
            var Form = eContext.getFormContext();
            var statusReason = Form.getAttribute("statuscode").getValue();
            //If Status Reason is New
            if (statusReason == 918640005) {
                var taskType = Form.getAttribute("msdyn_tasktype").getValue();
                if (taskType != null) {
                    var taskTypeID = taskType[0].id;
                    Xrm.WebApi.retrieveRecord("msdyn_servicetasktype", taskTypeID, "?$select=msdyn_name&$expand=ovs_Questionnaire").then(function success(result) {
                        var newDefinition = result.ovs_Questionnaire.ovs_questionnairedefinition;
                        Form.getAttribute("ovs_questionnairedefinition").setValue(newDefinition);
                        ToggleQuestionnaire(eContext);
                    });
                }
            }
            else {
                ToggleQuestionnaire(eContext);
            }
        }
        function onSave(eContext) {
            // Get formContext
            var Form = eContext.getFormContext();
            var percentComplete = Form.getAttribute("msdyn_percentcomplete").getValue();
            if (percentComplete != 100.00) {
                //Set percentComplete to 50.00
                Form.getAttribute("msdyn_percentcomplete").setValue(50.00);
                //Set Status Reason to In-Progress
                Form.getAttribute("statuscode").setValue(918640004);
            }
            //Lock Task Type field if it has a value.
            if (Form.getAttribute("msdyn_tasktype").getValue() != null) {
                Form.getControl("msdyn_tasktype").setDisabled(true);
            }
            // Get the web resource control on the form
            var wrCtrl = Form.getControl('WebResource_QuestionnaireRender');
            if (wrCtrl.getVisible() === false) {
                return;
            }
            // Get the web resource inner content window
            CompleteQuestionnaire(wrCtrl);
        }
        WorkOrderServiceTask.onSave = onSave;
        // Get surveyJS locale
        function getSurveyLocal() {
            var languageCode = Xrm.Utility.getGlobalContext().userSettings.languageId;
            var surveyLocale = 'en';
            if (languageCode == 1036) {
                //French
                surveyLocale = 'fr';
            }
            return surveyLocale;
        }
        function InitiateSurvey(eContext, wrCtrl, questionnaireDefinition, questionnaireResponse, mode) {
            wrCtrl.setVisible(true);
            wrCtrl.getContentWindow().then(function (win) {
                return __awaiter(this, void 0, void 0, function () {
                    var surveyLocale, _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                surveyLocale = getSurveyLocal();
                                win.InitialContext(eContext);
                                _a = win;
                                return [4 /*yield*/, retrieveWorkOrderOperations(eContext)];
                            case 1:
                                _a.operationList = _b.sent();
                                win.InitializeSurveyRender(questionnaireDefinition, questionnaireResponse, surveyLocale, mode);
                                return [2 /*return*/];
                        }
                    });
                });
            });
        }
        function retrieveWorkOrderOperations(eContext) {
            return __awaiter(this, void 0, void 0, function () {
                var workOrderAttribute, workOrderId, operations, operationPromise1, fetchXml, operationPromise2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            workOrderAttribute = eContext.getFormContext().getAttribute('msdyn_workorder').getValue();
                            workOrderId = workOrderAttribute != null ? workOrderAttribute[0].id : "";
                            operations = [];
                            operationPromise1 = Xrm.WebApi.online.retrieveRecord("msdyn_workorder", workOrderId, "?$select=ovs_OperationId,msdyn_serviceaccount&$expand=ovs_OperationId($select=ovs_name,ovs_operationid),msdyn_serviceaccount($select=name)");
                            fetchXml = [
                                "<fetch top='50'>",
                                "  <entity name='ovs_operation'>",
                                "    <attribute name='ts_stakeholder' />",
                                "    <attribute name='ovs_operationid' />",
                                "    <attribute name='ovs_name' />",
                                "    <link-entity name='ts_msdyn_workorder_ovs_operation' from='ovs_operationid' to='ovs_operationid' intersect='true'>",
                                "      <filter>",
                                "        <condition attribute='msdyn_workorderid' operator='eq' value='", workOrderId, "'/>",
                                "      </filter>",
                                "    </link-entity>",
                                "    <link-entity name='account' from='accountid' to='ts_stakeholder'>",
                                "      <attribute name='name' />",
                                "    </link-entity>",
                                "  </entity>",
                                "</fetch>",
                            ].join("");
                            fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
                            operationPromise2 = Xrm.WebApi.retrieveMultipleRecords("ovs_operation", fetchXml);
                            return [4 /*yield*/, Promise.all([operationPromise1, operationPromise2]).then(function (operationRetrievalPromises) {
                                    //Add the work order operation field's id and name to the operations array
                                    if (operationRetrievalPromises[0].ovs_OperationId != null && operationRetrievalPromises[0].msdyn_serviceaccount != null) {
                                        operations.push({
                                            id: operationRetrievalPromises[0].ovs_OperationId.ovs_operationid,
                                            name: operationRetrievalPromises[0].msdyn_serviceaccount.name + " : " + operationRetrievalPromises[0].ovs_OperationId.ovs_name
                                        });
                                    }
                                    //Add the id and name of the work order's N:N operations to the operations array
                                    operationRetrievalPromises[1].entities.forEach(function (operation) {
                                        if (operation.ovs_operationid != null && operation["account2.name"] != null) {
                                            operations.push({
                                                id: operation.ovs_operationid,
                                                name: operation["account2.name"] + " : " + operation.ovs_name
                                            });
                                        }
                                    });
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, operations];
                    }
                });
            });
        }
    })(WorkOrderServiceTask = ROM.WorkOrderServiceTask || (ROM.WorkOrderServiceTask = {}));
})(ROM || (ROM = {}));
function CompleteQuestionnaire(wrCtrl) {
    // Get the web resource inner content window
    wrCtrl.getContentWindow().then(function (win) {
        var userInput = win.DoComplete();
    });
}
