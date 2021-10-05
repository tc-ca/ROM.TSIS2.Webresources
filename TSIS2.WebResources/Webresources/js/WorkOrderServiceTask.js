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
        var lang = Xrm.Utility.getGlobalContext().userSettings.languageId;
        var enterStartDateToProceedText = "Enter a start date to proceed";
        var enterTaskTypeToProccedText = "Enter a task type to proceed";
        var confirmTitle = "Message";
        var noQuestionnaireText = "There is no questionnaire available for this date.";
        var confirmDisconnectedText = "You cannot retrieve the Inspection valid/active on the date selected";
        if (lang == 1036) {
            enterStartDateToProceedText = "Entrez une date de début pour continue";
            enterTaskTypeToProccedText = "Entrez un type de tâche pour continuer";
            confirmTitle = "Message";
            confirmDisconnectedText = "Vous ne pouvez pas récupérer l'inspection valide/active à la date sélectionnée";
            noQuestionnaireText = "Il n'y a pas de questionnaire disponible pour cette date.";
        }
        function onLoad(eContext) {
            var Form = eContext.getFormContext();
            var taskType = Form.getAttribute("msdyn_tasktype").getValue();
            //Lock Task Type field if it has a value.
            if (taskType != null) {
                Form.getControl("msdyn_tasktype").setDisabled(true);
                //Retrieve Task Type record
                Xrm.WebApi.retrieveRecord("msdyn_servicetasktype", taskType[0].id).then(function success(result) {
                    //If it's for a custom questionnaire, show the custom questionnaire section
                    if (result.ts_hascustomquestionnaire) {
                        Form.ui.tabs.get("tab_summary").sections.get("section_custom_questionnaire").setVisible(true);
                    }
                });
            }
            if (Form.getAttribute('statecode').getValue() == 1) {
                mode = "display";
            }
            //If Status Reason is New user is able to change Work Order Start Date
            var statusReason = Form.getAttribute("statuscode").getValue();
            var workOrderStartDateCtl = Form.getControl("ts_servicetaskstartdate");
            var workOrderTaskTypeCtl = Form.getControl("msdyn_tasktype");
            if (statusReason == 918640005) {
                workOrderStartDateCtl.setDisabled(false);
                // Also, add a message that work order service task start date should be filled in to proceed.
                workOrderStartDateCtl.setNotification(enterStartDateToProceedText, "ts_servicetaskstartdate_entertoproceed");
                // Also, add a message that task type start date should be filled in to proceed.
                workOrderTaskTypeCtl.setNotification(enterTaskTypeToProccedText, "ts_tasktype_entertoproceed");
                Form.getControl('WebResource_QuestionnaireRender').setVisible(false);
            }
            else {
                workOrderStartDateCtl.setDisabled(true);
                ToggleQuestionnaire(eContext);
            }
        }
        WorkOrderServiceTask.onLoad = onLoad;
        function serviceTaskStartDateOnChange(eContext) {
            UpdateQuestionnaireDefinition(eContext);
        }
        WorkOrderServiceTask.serviceTaskStartDateOnChange = serviceTaskStartDateOnChange;
        function taskTypeOnChange(eContext) {
            UpdateQuestionnaireDefinition(eContext);
        }
        WorkOrderServiceTask.taskTypeOnChange = taskTypeOnChange;
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
        //If Status Reason is New, replace ovs_questionnairedefinition with definition from the Service Task Type Lookup field
        function UpdateQuestionnaireDefinition(eContext) {
            var Form = eContext.getFormContext();
            var serviceTaskStartDate = Form.getAttribute("ts_servicetaskstartdate").getValue();
            var taskType = Form.getAttribute("msdyn_tasktype").getValue();
            var workOrderStartDateCtl = Form.getControl("ts_servicetaskstartdate");
            var workOrderTaskTypeCtl = Form.getControl("msdyn_tasktype");
            if (taskType != null) {
                workOrderTaskTypeCtl.clearNotification("ts_tasktype_entertoproceed");
                workOrderStartDateCtl.setDisabled(false);
                var taskTypeID = taskType[0].id;
                Xrm.WebApi.retrieveRecord("msdyn_servicetasktype", taskTypeID, "?$select=msdyn_name,ts_hascustomquestionnaire&$expand=ovs_Questionnaire").then(function success(result) {
                    var workOrderStartDateCtl = Form.getControl("ts_servicetaskstartdate");
                    //Custom questionnaires do not have a questionnaire definition
                    //Remove notification and skip remaining steps
                    if (result.ts_hascustomquestionnaire) {
                        // Clear out the message that a work order service task start date must be entered to proceed
                        workOrderStartDateCtl.clearNotification("ts_servicetaskstartdate_entertoproceed");
                        return;
                    }
                    var today = new Date(Date.now()).toISOString().slice(0, 10);
                    var questionnaireId = result.ovs_Questionnaire.ovs_questionnaireid;
                    if (serviceTaskStartDate != null) {
                        // Clear out the message that a work order service task start date must be entered to proceed
                        workOrderStartDateCtl.clearNotification("ts_servicetaskstartdate_entertoproceed");
                        //current questionnaire
                        var fetchXml = [
                            "<fetch>",
                            "  <entity name='ts_questionnaireversion'>",
                            "    <attribute name='ts_questionnairedefinition' />",
                            "    <attribute name='ts_name' />",
                            "    <filter type='and'>",
                            "      <condition attribute='ts_effectiveenddate' operator='on-or-after' value='", today, "'/>",
                            "      <condition attribute='ts_effectivestartdate' operator = 'on-or-before' value='", today, "'/>",
                            "      <condition attribute='ts_ovs_questionnaire' operator='eq' value='", questionnaireId, "'/>",
                            "    </filter>",
                            "    <order attribute='modifiedon' descending='true' />",
                            "  </entity>",
                            "</fetch>",
                        ].join("");
                        fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
                        //Retrieve Questionnaire Versions of the Service Task's Questionnaire
                        Xrm.WebApi.retrieveMultipleRecords("ts_questionnaireversion", fetchXml)
                            .then(function success(result) {
                            if (result.entities[0] == null) {
                                workOrderStartDateCtl.setNotification(noQuestionnaireText, "ts_servicetaskstartdate_entertoproceed");
                                return;
                            }
                            //The date selected falls within the Start and End Date of the current questionnaire - Display current questionnaire
                            if (Date.parse(serviceTaskStartDate.toString()) > Date.parse(result.entities[0].ts_effectivestartdate) && Date.parse(serviceTaskStartDate.toString()) < Date.parse(result.entities[0].ts_effectiveenddate)) {
                                //Set WOST questionnaire definition to the Questionnaire Version's definition
                                var newDefinition = result.entities[0].ts_questionnairedefinition;
                                Form.getAttribute("ovs_questionnairedefinition").setValue(newDefinition);
                                ToggleQuestionnaire(eContext);
                            }
                            else {
                                // If the Inspector is connected display the questionnaire that was valid / active on the date selected    
                                //If not display message
                                var fetchXml = [
                                    "<fetch>",
                                    "  <entity name='ts_questionnaireversion'>",
                                    "    <attribute name='ts_questionnairedefinition' />",
                                    "    <attribute name='ts_name' />",
                                    "    <filter type='and'>",
                                    "      <condition attribute='ts_effectiveenddate' operator='on-or-after' value='", serviceTaskStartDate.toISOString().slice(0, 10), "'/>",
                                    "      <condition attribute='ts_effectivestartdate' operator = 'on-or-before' value='", serviceTaskStartDate.toISOString().slice(0, 10), "'/>",
                                    "      <condition attribute='ts_ovs_questionnaire' operator='eq' value='", questionnaireId, "'/>",
                                    "    </filter>",
                                    "    <order attribute='modifiedon' descending='true' />",
                                    "  </entity>",
                                    "</fetch>",
                                ].join("");
                                fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
                                Xrm.WebApi.online.retrieveMultipleRecords("ts_questionnaireversion", fetchXml)
                                    .then(function success(result) {
                                    if (result.entities[0] == null) {
                                        Form.getControl('WebResource_QuestionnaireRender').setVisible(false);
                                        workOrderStartDateCtl.setNotification(noQuestionnaireText, "ts_servicetaskstartdate_entertoproceed");
                                        return;
                                    }
                                    //Set WOST questionnaire definition to the Questionnaire Version's definition
                                    var newDefinition = result.entities[0].ts_questionnairedefinition;
                                    Form.getAttribute("ovs_questionnairedefinition").setValue(newDefinition);
                                    ToggleQuestionnaire(eContext);
                                }, function error(error) {
                                    //If the Inspector is disconnected display an information message
                                    Form.getControl('WebResource_QuestionnaireRender').setVisible(false);
                                    var alertStrings = { confirmButtonLabel: "Ok", text: confirmDisconnectedText, title: confirmTitle };
                                    var alertOptions = { height: 120, width: 260 };
                                    Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
                                });
                            }
                        }, function error(error) {
                            Xrm.Navigation.openAlertDialog({ text: error.message });
                        });
                    }
                    else {
                        // Work order service task start date is empty so display message to enter it before proceeding
                        workOrderStartDateCtl.setNotification(enterStartDateToProceedText, "ts_servicetaskstartdate_entertoproceed");
                        Form.getControl('WebResource_QuestionnaireRender').setVisible(false);
                    }
                });
            }
            else {
                // Task Type is empty so display message to enter it before proceeding
                if (serviceTaskStartDate != null)
                    workOrderStartDateCtl.clearNotification("ts_servicetaskstartdate_entertoproceed");
                else
                    workOrderStartDateCtl.setNotification(enterStartDateToProceedText, "ts_servicetaskstartdate_entertoproceed");
                var workOrderTaskTypeCtl_1 = Form.getControl("msdyn_tasktype");
                workOrderTaskTypeCtl_1.setNotification(enterTaskTypeToProccedText, "ts_tasktype_entertoproceed");
                Form.getControl('WebResource_QuestionnaireRender').setVisible(false);
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
        WorkOrderServiceTask.getSurveyLocal = getSurveyLocal;
        function InitiateSurvey(eContext, wrCtrl, questionnaireDefinition, questionnaireResponse, mode) {
            var Form = eContext.getFormContext();
            wrCtrl.setVisible(true);
            wrCtrl.getContentWindow().then(function (win) {
                return __awaiter(this, void 0, void 0, function () {
                    var surveyLocale, operationData;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                surveyLocale = getSurveyLocal();
                                win.InitialContext(eContext);
                                return [4 /*yield*/, retrieveWorkOrderOperationData(eContext)];
                            case 1:
                                operationData = _a.sent();
                                win.isComplete = (Form.getAttribute("msdyn_percentcomplete").getValue() == 100.00);
                                win.operationList = operationData.operations;
                                win.activityTypeOperationTypeIdsList = operationData.activityTypeOperationTypeIds;
                                win.InitializeSurveyRender(questionnaireDefinition, questionnaireResponse, surveyLocale, mode);
                                return [2 /*return*/];
                        }
                    });
                });
            });
        }
        //Retrieves parent Work Order's Operations and parent Work Order's ActivityType's OperationTypes
        function retrieveWorkOrderOperationData(eContext) {
            return __awaiter(this, void 0, void 0, function () {
                var workOrderAttribute, workOrderId, operations, activityTypeOperationTypeIds, parentWorkOrderOperationFetchXml, operationPromise1, parentWorkOrderRelatedOperationFetchXml, operationPromise2, activityTypeOperationTypesFetchXML, activityTypeOperationTypesPromise;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            workOrderAttribute = eContext.getFormContext().getAttribute('msdyn_workorder').getValue();
                            workOrderId = workOrderAttribute != null ? workOrderAttribute[0].id : "";
                            operations = [];
                            activityTypeOperationTypeIds = [];
                            parentWorkOrderOperationFetchXml = [
                                "<fetch top='50'>",
                                "  <entity name='msdyn_workorder'>",
                                "    <attribute name='ovs_operationid' />",
                                "    <attribute name='msdyn_serviceaccount' />",
                                "    <filter>",
                                "      <condition attribute='msdyn_workorderid' operator='eq' value='", workOrderId, "'/>",
                                "    </filter>",
                                "    <link-entity name='ovs_operation' from='ovs_operationid' to='ovs_operationid' link-type='inner'>",
                                "      <attribute name='ovs_operationtypeid' />",
                                "      <attribute name='ovs_operationid' />",
                                "      <attribute name='ovs_name' />",
                                "      <link-entity name='ovs_operationtype' from='ovs_operationtypeid' to='ovs_operationtypeid'>",
                                "        <attribute name='ts_regulated' />",
                                "        <attribute name='ovs_operationtypeid' /> ",
                                "      </link-entity>",
                                "    </link-entity>",
                                "    <link-entity name='account' from='accountid' to='msdyn_serviceaccount'>",
                                "      <attribute name='name' />",
                                "    </link-entity>",
                                "  </entity>",
                                "</fetch>",
                            ].join("");
                            parentWorkOrderOperationFetchXml = "?fetchXml=" + encodeURIComponent(parentWorkOrderOperationFetchXml);
                            operationPromise1 = Xrm.WebApi.retrieveMultipleRecords("msdyn_workorder", parentWorkOrderOperationFetchXml);
                            parentWorkOrderRelatedOperationFetchXml = [
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
                                "    <link-entity name='ovs_operationtype' from='ovs_operationtypeid' to='ovs_operationtypeid'>",
                                "      <attribute name='ts_regulated' />",
                                "      <attribute name='ovs_operationtypeid' /> ",
                                "    </link-entity>",
                                "  </entity>",
                                "</fetch>",
                            ].join("");
                            parentWorkOrderRelatedOperationFetchXml = "?fetchXml=" + encodeURIComponent(parentWorkOrderRelatedOperationFetchXml);
                            operationPromise2 = Xrm.WebApi.retrieveMultipleRecords("ovs_operation", parentWorkOrderRelatedOperationFetchXml);
                            activityTypeOperationTypesFetchXML = [
                                "<fetch top='50'>",
                                "  <entity name='ovs_operationtype'>",
                                "    <attribute name='ovs_operationtypeid' />",
                                "    <link-entity name='ts_ovs_operationtypes_msdyn_incidenttypes' from='ovs_operationtypeid' to='ovs_operationtypeid' intersect='true'>",
                                "      <link-entity name='msdyn_incidenttype' from='msdyn_incidenttypeid' to='msdyn_incidenttypeid' intersect='true'>",
                                "        <link-entity name='msdyn_workorder' from='msdyn_primaryincidenttype' to='msdyn_incidenttypeid'>",
                                "          <filter>",
                                "            <condition attribute='msdyn_workorderid' operator='eq' value='", workOrderId, "'/>",
                                "          </filter>",
                                "        </link-entity>",
                                "      </link-entity>",
                                "    </link-entity>",
                                "  </entity>",
                                "</fetch>",
                            ].join("");
                            activityTypeOperationTypesFetchXML = "?fetchXml=" + encodeURIComponent(activityTypeOperationTypesFetchXML);
                            activityTypeOperationTypesPromise = Xrm.WebApi.retrieveMultipleRecords("ovs_operationtype", activityTypeOperationTypesFetchXML);
                            return [4 /*yield*/, Promise.all([operationPromise1, operationPromise2, activityTypeOperationTypesPromise]).then(function (operationRetrievalPromises) {
                                    //Add the work order operation operationid, name, operationTypeId, and regulated boolean to the operations array
                                    var workOrderOperation = operationRetrievalPromises[0].entities[0];
                                    if (workOrderOperation["ovs_operation1.ovs_operationid"] != null && workOrderOperation["account3.name"] != null && workOrderOperation["ovs_operationtype2.ts_regulated"] != null) {
                                        operations.push({
                                            id: workOrderOperation["ovs_operation1.ovs_operationid"],
                                            name: workOrderOperation["account3.name"] + " : " + workOrderOperation["ovs_operation1.ovs_name"],
                                            operationTypeId: workOrderOperation["ovs_operation1.ovs_operationtypeid"],
                                            isRegulated: workOrderOperation["ovs_operationtype2.ts_regulated"]
                                        });
                                    }
                                    //Add the operationid, name, operationTypeId, and regulated boolean of the work order's N:N operations to the operations array
                                    operationRetrievalPromises[1].entities.forEach(function (operation) {
                                        if (operation.ovs_operationid != null && operation["account2.name"] != null && operation["ovs_operationtype3.ts_regulated"] != null) {
                                            operations.push({
                                                id: operation["ovs_operationid"],
                                                name: operation["account2.name"] + " : " + operation["ovs_name"],
                                                operationTypeId: operation["ovs_operationtype3.ovs_operationtypeid"],
                                                isRegulated: operation["ovs_operationtype3.ts_regulated"]
                                            });
                                        }
                                    });
                                    //collect each operationType Id
                                    operationRetrievalPromises[2].entities.forEach(function (operationType) {
                                        activityTypeOperationTypeIds.push(operationType["ovs_operationtypeid"]);
                                    });
                                })];
                        case 1:
                            _a.sent();
                            //Return object containing retrieved operation data
                            return [2 /*return*/, {
                                    operations: operations,
                                    activityTypeOperationTypeIds: activityTypeOperationTypeIds
                                }];
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
