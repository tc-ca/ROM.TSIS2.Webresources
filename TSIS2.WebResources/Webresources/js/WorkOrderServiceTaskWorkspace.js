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
        var mode = '';
        var lang = Xrm.Utility.getGlobalContext().userSettings.languageId;
        var enterStartDateToProceedText = lang === 1036 ? "Entrez une date de début pour continuer" : "Enter a start date to proceed";
        var enterTaskTypeToProceedText = lang === 1036 ? "Entrez un type de tâche pour continuer" : "Enter a task type to proceed";
        var noQuestionnaireText = lang === 1036 ? "Il n'y a pas de questionnaire disponible pour cette date." : "There is no questionnaire available for this date.";
        var confirmTitle = "Message";
        var confirmDisconnectedText = lang === 1036 ? "You cannot retrieve the Inspection valid/active on the date selected" : "Vous ne pouvez pas récupérer l'inspection valide/active à la date sélectionnée";
        var aircraftModelOptions;
        var aocRegion;
        function onLoad(eContext) {
            return __awaiter(this, void 0, void 0, function () {
                var Form, taskType, statusReason, workOrderStartDateCtl, workOrderStartDateValue, workOrderEndDateCtl, workOrderTaskTypeCtl, fromOffline;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            Form = eContext.getFormContext();
                            aircraftModelOptions = Form.getControl("ts_aircraftmodel").getOptions();
                            //If there's a related Work Order, filter the Task Type Lookup to match the Work Order's Activity Type Filter
                            if (Form.getAttribute("ts_workorder").getValue() != null) {
                                setTaskTypeFilteredView(Form);
                                showHideFieldsByIncidentType(Form);
                                aircraftManufacturerOnChange(eContext);
                            }
                            taskType = Form.getAttribute("ts_tasktype").getValue();
                            //Lock Task Type field if it has a value.
                            if (taskType != null) {
                                Form.getControl("ts_tasktype").setDisabled(true);
                                //Retrieve Task Type record
                                Xrm.WebApi.retrieveRecord("msdyn_servicetasktype", taskType[0].id).then(function success(result) {
                                    //If it's for a custom questionnaire, show the custom questionnaire section
                                    if (result.ts_hascustomquestionnaire) {
                                        Form.ui.tabs.get("tab_questionnaire").sections.get("section_custom_questionnaire").setVisible(true);
                                        filterLegislationSource(eContext);
                                    }
                                });
                            }
                            if (Form.getAttribute('statecode').getValue() == 1) {
                                mode = "display";
                            }
                            statusReason = Form.getAttribute("statuscode").getValue();
                            workOrderStartDateCtl = Form.getControl("ts_workorderservicetaskstartdate");
                            workOrderStartDateValue = Form.getAttribute("ts_workorderservicetaskstartdate").getValue();
                            workOrderEndDateCtl = Form.getControl("ts_workorderservicetaskenddate");
                            workOrderTaskTypeCtl = Form.getControl("ts_tasktype");
                            workOrderEndDateCtl.setDisabled(true);
                            return [4 /*yield*/, workOrderIsDraft(eContext)];
                        case 1:
                            if (_a.sent()) {
                                mode = 'display';
                                setAllFieldsDisabled(eContext);
                            }
                            else if (statusReason == 741130003) {
                                workOrderStartDateCtl.setDisabled(false);
                                // Also, add a message that work order service task start date should be filled in to proceed.
                                if (workOrderStartDateValue == null) {
                                    workOrderStartDateCtl.setNotification(enterStartDateToProceedText, "ts_workorderservicetaskstartdate_entertoproceed");
                                    Form.getControl('WebResource_QuestionnaireRender').setVisible(false);
                                }
                                //If work order service task is in new status but has start date and questionnaire (it was copied from another WO)
                                else {
                                    workOrderStartDateCtl.setDisabled(true);
                                    ToggleQuestionnaire(eContext);
                                }
                                // Also, add a message that task type start date should be filled in to proceed.
                                if (taskType == null) {
                                    workOrderTaskTypeCtl.setNotification(enterTaskTypeToProceedText, "ts_tasktype_entertoproceed");
                                    Form.getControl('WebResource_QuestionnaireRender').setVisible(false);
                                }
                            }
                            else {
                                //Make sure that if for whatever reason the start date does not have a value, that it remains unlocked.
                                if (workOrderStartDateValue == null) {
                                    workOrderStartDateCtl.setDisabled(false);
                                }
                                else {
                                    workOrderStartDateCtl.setDisabled(true);
                                }
                                ToggleQuestionnaire(eContext);
                            }
                            fromOffline = Form.getAttribute("ts_fromoffline").getValue();
                            if (fromOffline) {
                                UpdateQuestionnaireDefinition(eContext);
                            }
                            if (statusReason == 741130001) {
                                Form.ui.setFormNotification((Xrm.Utility.getGlobalContext().userSettings.languageId == 1033 ? "To unlock completed questionnaires please contact your manager." : "Pour déverrouiller un questionnaire complété, veuillez contacter votre gestionnaire."), "WARNING", "completed_questionnaire");
                            }
                            //Lock for non Admin users
                            if (!userHasRole("System Administrator|ROM - Business Admin")) {
                                Form.getControl("ts_mandatory").setDisabled(true);
                            }
                            //Hide Questionnaire Viewable Settings section for non-admin users with the exception of ROM - Manager
                            if (!userHasRole("System Administrator|ROM - Manager")) {
                                Form.ui.tabs.get('tab_summary').sections.get('tab_summary_section_accesscontrol').setVisible(false);
                            }
                            checkAccessControl(eContext);
                            return [2 /*return*/];
                    }
                });
            });
        }
        WorkOrderServiceTaskWorkspace.onLoad = onLoad;
        function workOrderServiceTaskStartDateOnChange(eContext) {
            UpdateQuestionnaireDefinition(eContext);
        }
        WorkOrderServiceTaskWorkspace.workOrderServiceTaskStartDateOnChange = workOrderServiceTaskStartDateOnChange;
        function taskTypeOnChange(eContext) {
            applyMandatoryFieldFromTaskType(eContext);
            UpdateQuestionnaireDefinition(eContext);
        }
        WorkOrderServiceTaskWorkspace.taskTypeOnChange = taskTypeOnChange;
        function applyMandatoryFieldFromTaskType(eContext) {
            var fc = eContext.getFormContext();
            var taskTypeValue = fc.getAttribute("ts_tasktype").getValue();
            console.log("Retrieved values: check type ");
            if (taskTypeValue != null && taskTypeValue != undefined && taskTypeValue[0].entityType == "msdyn_servicetasktype") {
                Xrm.WebApi.retrieveRecord("msdyn_servicetasktype", taskTypeValue[0].id, "?$select=ts_mandatory").then(function success(result) {
                    console.log("Retrieved values: ts_mandatory: " + result.ts_mandatory);
                    if (result.ts_mandatory != null && result.ts_mandatory) {
                        fc.getAttribute("ts_mandatory").setValue(true);
                    }
                    else {
                        fc.getAttribute("ts_mandatory").setValue(false);
                    }
                }, function (error) {
                    console.log(error.message);
                });
            }
        }
        function ToggleQuestionnaire(eContext) {
            console.log("Entering ToggleQuestionnaire ");
            var Form = eContext.getFormContext();
            // Get the web resource control on the form
            var wrCtrl = Form.getControl('WebResource_QuestionnaireRender');
            var questionnaireDefinition = Form.getAttribute('ts_questionnairedefinition').getValue();
            var questionnaireResponse = Form.getAttribute('ts_questionnaireresponse').getValue();
            // Exit if no questionnaire exists
            if (questionnaireDefinition === null) {
                wrCtrl.setVisible(false);
                return;
            }
            // Get Questionnaire definition
            wrCtrl.setVisible(true);
            InitiateSurvey(eContext, wrCtrl, questionnaireDefinition, questionnaireResponse, mode);
        }
        function UpdateQuestionnaireDefinition(eContext) {
            return __awaiter(this, void 0, void 0, function () {
                var Form, serviceTaskStartDate, taskType, workOrderStartDateCtl, workOrderTaskTypeCtl, taskTypeID, workOrderTaskTypeCtl_1;
                return __generator(this, function (_a) {
                    Form = eContext.getFormContext();
                    serviceTaskStartDate = Form.getAttribute("ts_workorderservicetaskstartdate").getValue();
                    taskType = Form.getAttribute("ts_tasktype").getValue();
                    workOrderStartDateCtl = Form.getControl("ts_workorderservicetaskstartdate");
                    workOrderTaskTypeCtl = Form.getControl("ts_tasktype");
                    if (taskType != null) {
                        workOrderTaskTypeCtl.clearNotification("ts_tasktype_entertoproceed");
                        workOrderStartDateCtl.setDisabled(false);
                        taskTypeID = taskType[0].id;
                        Xrm.WebApi.retrieveRecord("msdyn_servicetasktype", taskTypeID, "?$select=msdyn_name,ts_hascustomquestionnaire,ovs_questionnaireenabled&$expand=ovs_Questionnaire").then(function success(result) {
                            var _a;
                            var workOrderStartDateCtl = Form.getControl("ts_workorderservicetaskstartdate");
                            //Custom questionnaires do not have a questionnaire definition
                            //Remove notification and skip remaining steps
                            if (result.ts_hascustomquestionnaire) {
                                // Clear out the message that a work order service task start date must be entered to proceed
                                workOrderStartDateCtl.clearNotification("ts_workorderservicetaskstartdate_entertoproceed");
                                return;
                            }
                            //Service Task Type does not have a questionnaire
                            if (!result.ovs_questionnaireenabled)
                                workOrderStartDateCtl.setNotification(noQuestionnaireText, "ts_workorderservicetaskstartdate_entertoproceed");
                            var today = new Date(Date.now()).toISOString().slice(0, 10);
                            var questionnaireId = (_a = result.ovs_Questionnaire) === null || _a === void 0 ? void 0 : _a.ovs_questionnaireid;
                            if (serviceTaskStartDate != null) {
                                // Clear out the message that a work order service task start date must be entered to proceed
                                workOrderStartDateCtl.clearNotification("ts_workorderservicetaskstartdate_entertoproceed");
                                //current questionnaire
                                var fetchXml = [
                                    "<fetch>",
                                    " <entity name='ts_questionnaireversion'>",
                                    "	<attribute name='ts_questionnairedefinition' />",
                                    "	<attribute name='ts_name' />",
                                    "	<attribute name='ts_effectivestartdate' />",
                                    "	<attribute name='ts_effectiveenddate' />",
                                    "	<filter type='or'>",
                                    "	  <filter>",
                                    "		<condition attribute='ts_effectiveenddate' operator='on-or-after' value='", today, "'/>",
                                    "		<filter>",
                                    "		  <condition attribute='ts_effectivestartdate' operator='on-or-before' value='", today, "'/>",
                                    "		  <condition attribute='ts_ovs_questionnaire' operator='eq' value='", questionnaireId, "'/>",
                                    "		</filter>",
                                    "	  </filter>",
                                    "	  <filter>",
                                    "		<condition attribute='ts_effectivestartdate' operator='on-or-before' value='", today, "'/>",
                                    "		<condition attribute='ts_ovs_questionnaire' operator='eq' value='", questionnaireId, "'/>",
                                    "	  </filter>",
                                    "	</filter>",
                                    " </entity>",
                                    "</fetch>",
                                ].join("");
                                fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
                                //Retrieve Questionnaire Versions of the Service Task's Questionnaire
                                Xrm.WebApi.retrieveMultipleRecords("ts_questionnaireversion", fetchXml)
                                    .then(function success(result) {
                                    if (result.entities[0] == null) {
                                        workOrderStartDateCtl.setNotification(noQuestionnaireText, "ts_workorderservicetaskstartdate_entertoproceed");
                                        return;
                                    }
                                    //The date selected falls within the Start and End Date of the current questionnaire - Display current questionnaire
                                    var effectiveStartDate = new Date(result.entities[0].ts_effectivestartdate);
                                    var effectiveEndDate = new Date(result.entities[0].ts_effectiveenddate);
                                    if ((serviceTaskStartDate >= effectiveStartDate) && (effectiveEndDate.toString() == "Invalid Date" || serviceTaskStartDate <= effectiveEndDate)) {
                                        //Set WOST questionnaire definition to the Questionnaire Version's definition
                                        var newDefinition = result.entities[0].ts_questionnairedefinition;
                                        Form.getAttribute("ts_questionnairedefinition").setValue(newDefinition);
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
                                                workOrderStartDateCtl.setNotification(noQuestionnaireText, "ts_workorderservicetaskstartdate_entertoproceed");
                                                return;
                                            }
                                            //Set WOST questionnaire definition to the Questionnaire Version's definition
                                            var newDefinition = result.entities[0].ts_questionnairedefinition;
                                            Form.getAttribute("ts_questionnairedefinition").setValue(newDefinition);
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
                                workOrderStartDateCtl.setNotification(enterStartDateToProceedText, "ts_workorderservicetaskstartdate_entertoproceed");
                                Form.getControl('WebResource_QuestionnaireRender').setVisible(false);
                            }
                        });
                    }
                    else {
                        // Task Type is empty so display message to enter it before proceeding
                        if (serviceTaskStartDate != null)
                            workOrderStartDateCtl.clearNotification("ts_workorderservicetaskstartdate_entertoproceed");
                        else
                            workOrderStartDateCtl.setNotification(enterStartDateToProceedText, "ts_workorderservicetaskstartdate_entertoproceed");
                        workOrderTaskTypeCtl_1 = Form.getControl("ts_tasktype");
                        workOrderTaskTypeCtl_1.setNotification(enterTaskTypeToProceedText, "ts_tasktype_entertoproceed");
                        Form.getControl('WebResource_QuestionnaireRender').setVisible(false);
                    }
                    return [2 /*return*/];
                });
            });
        }
        function onSave(eContext) {
            var Form = eContext.getFormContext();
            var percentComplete = Form.getAttribute("ts_percentcomplete").getValue();
            if (percentComplete != 100.00 && Form.getAttribute("statecode").getValue() == 0 /* Active */) {
                //Set percentComplete to 50.00
                Form.getAttribute("ts_percentcomplete").setValue(50.00);
                //Set Status Reason to In-Progress
                Form.getAttribute("statuscode").setValue(741130002);
            }
            //Lock Task Type field if it has a value.
            if (Form.getAttribute("ts_tasktype").getValue() != null) {
                Form.getControl("ts_tasktype").setDisabled(true);
            }
            // Get the web resource control on the form
            var wrCtrl = Form.getControl('WebResource_QuestionnaireRender');
            if (wrCtrl.getVisible() === false) {
                return;
            }
            // Get the web resource inner content window
            CompleteQuestionnaire(wrCtrl);
        }
        WorkOrderServiceTaskWorkspace.onSave = onSave;
        function setTaskTypeFilteredView(form) {
            var workOrderValue = form.getAttribute("ts_workorder").getValue();
            var workOrderId = workOrderValue ? workOrderValue[0].id : "";
            Xrm.WebApi.retrieveRecord("msdyn_workorder", workOrderId, "?$select=_msdyn_workordertype_value,_ovs_operationtypeid_value,_ts_site_value,_ts_region_value,_msdyn_serviceaccount_value,_ovs_operationid_value").then(function success(result) {
                return __awaiter(this, void 0, void 0, function () {
                    var viewId, entityName, viewDisplayName, fetchXml, layoutXml, operationType, ownerId, lookup, aocStakeholder, aocOperationtype;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                viewId = '{ae0d8547-6871-4854-91ba-03b0c619dbe1}';
                                entityName = "msdyn_servicetasktype";
                                viewDisplayName = (lang == 1036) ? "Type de tâche relative au service" : "Service Task Types";
                                fetchXml = "<fetch version=\"1.0\" output-format=\"xml-platform\" mapping=\"logical\" distinct=\"true\"> <entity name=\"msdyn_servicetasktype\"> <attribute name=\"msdyn_name\" /> <attribute name=\"createdon\" /> <attribute name=\"msdyn_estimatedduration\" /> <attribute name=\"msdyn_description\" /> <attribute name=\"msdyn_servicetasktypeid\" /> <order attribute=\"msdyn_name\" descending=\"false\" /> <link-entity name=\"msdyn_incidenttypeservicetask\" from=\"msdyn_tasktype\" to=\"msdyn_servicetasktypeid\" link-type=\"inner\" alias=\"ae\"> <link-entity name=\"msdyn_incidenttype\" from=\"msdyn_incidenttypeid\" to=\"msdyn_incidenttype\" link-type=\"inner\" alias=\"af\"> <filter type=\"and\"> <condition attribute=\"msdyn_defaultworkordertype\" operator=\"eq\" value=\"" + result._msdyn_workordertype_value + "\" /> </filter> <link-entity name=\"ts_ovs_operationtypes_msdyn_incidenttypes\" from=\"msdyn_incidenttypeid\" to=\"msdyn_incidenttypeid\" visible=\"false\" intersect=\"true\"> <link-entity name=\"ovs_operationtype\" from=\"ovs_operationtypeid\" to=\"ovs_operationtypeid\" alias=\"ag\"> <filter type=\"and\"> <condition attribute=\"ovs_operationtypeid\" operator=\"eq\" value=\"" + result._ovs_operationtypeid_value + "\" /> </filter> </link-entity> </link-entity> </link-entity> </link-entity> </entity> </fetch>";
                                layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="msdyn_servicetasktype"><cell name="msdyn_name" width="200" /></row></grid>';
                                form.getControl("ts_tasktype").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                                return [4 /*yield*/, Xrm.WebApi.retrieveRecord("ovs_operationtype", result._ovs_operationtypeid_value, "?$select=_ownerid_value")];
                            case 1:
                                operationType = _a.sent();
                                ownerId = getOwnerIdFromRecord(operationType);
                                return [4 /*yield*/, showHideFieldsByOperationType(form, result._ovs_operationtypeid_value, ownerId)];
                            case 2:
                                _a.sent();
                                aocRegion = result._ts_region_value;
                                if (form.getAttribute("ts_aocoperation").getValue() == null && result._ovs_operationtypeid_value == "8b614ef0-c651-eb11-a812-000d3af3ac0d") { //Air Carrier (Passenger)
                                    lookup = new Array();
                                    lookup[0] = new Object();
                                    lookup[0].id = result._ovs_operationid_value;
                                    lookup[0].name = result["_ovs_operationid_value@OData.Community.Display.V1.FormattedValue"];
                                    lookup[0].entityType = result["_ovs_operationid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                                    form.getAttribute("ts_aocoperation").setValue(lookup);
                                    lookup = new Array();
                                    lookup[0] = new Object();
                                    lookup[0].id = result._ovs_operationtypeid_value;
                                    lookup[0].name = result["_ovs_operationtypeid_value@OData.Community.Display.V1.FormattedValue"];
                                    lookup[0].entityType = result["_ovs_operationtypeid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                                    form.getAttribute("ts_aocoperationtype").setValue(lookup);
                                    lookup = new Array();
                                    lookup[0] = new Object();
                                    lookup[0].id = result._msdyn_serviceaccount_value;
                                    lookup[0].name = result["_msdyn_serviceaccount_value@OData.Community.Display.V1.FormattedValue"];
                                    lookup[0].entityType = result["_msdyn_serviceaccount_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                                    form.getAttribute("ts_aocstakeholder").setValue(lookup);
                                    lookup = new Array();
                                    lookup[0] = new Object();
                                    lookup[0].id = result._ts_site_value;
                                    lookup[0].name = result["_ts_site_value@OData.Community.Display.V1.FormattedValue"];
                                    lookup[0].entityType = result["_ts_site_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                                    form.getAttribute("ts_aocsite").setValue(lookup);
                                    setAOCSiteFilteredView(form, result._ts_region_value, result._msdyn_serviceaccount_value, result._ovs_operationtypeid_value);
                                }
                                else {
                                    aocStakeholder = form.getAttribute("ts_aocstakeholder").getValue();
                                    aocOperationtype = form.getAttribute("ts_aocoperationtype").getValue();
                                    if (aocStakeholder != null && aocOperationtype != null) {
                                        setAOCSiteFilteredView(form, aocRegion, aocStakeholder[0].id, aocOperationtype[0].id);
                                    }
                                }
                                return [2 /*return*/];
                        }
                    });
                });
            }, function error(error) {
                Xrm.Navigation.openAlertDialog({ text: error.message });
            });
        }
        function populateFlightCategory(eContext) {
            var form = eContext.getFormContext();
            var originValue = form.getAttribute("ts_origin").getValue();
            var destinationValue = form.getAttribute("ts_destination").getValue();
            var originCountry;
            var distinationCountry;
            if (originValue != null && destinationValue != null) {
                Xrm.WebApi.retrieveRecord("msdyn_functionallocation", originValue[0].id, "?$select=_ts_country_value ").then(function success(result1) {
                    originCountry = result1._ts_country_value;
                    Xrm.WebApi.retrieveRecord("msdyn_functionallocation", destinationValue[0].id, "?$select=_ts_country_value ").then(function success(result2) {
                        distinationCountry = result2._ts_country_value;
                        if (distinationCountry == "208ef8a1-8e75-eb11-a812-000d3af3fac7" && originCountry == "208ef8a1-8e75-eb11-a812-000d3af3fac7") { // Canada
                            // Domestic
                            form.getAttribute("ts_flightcategory").setValue(741130000 /* Domestic */);
                        }
                        else if ((distinationCountry != "7c01709f-8e75-eb11-a812-000d3af3f6ab" && distinationCountry != "208ef8a1-8e75-eb11-a812-000d3af3fac7")
                            || (originCountry != "7c01709f-8e75-eb11-a812-000d3af3f6ab" && originCountry != "208ef8a1-8e75-eb11-a812-000d3af3fac7")) { //Not in USA or Canada
                            //International
                            form.getAttribute("ts_flightcategory").setValue(741130001 /* International */);
                        }
                        else {
                            //Transborder
                            form.getAttribute("ts_flightcategory").setValue(741130002 /* Transborder */);
                        }
                    }, function error(error) {
                        Xrm.Navigation.openAlertDialog({ text: error.message });
                    });
                }, function error(error) {
                    Xrm.Navigation.openAlertDialog({ text: error.message });
                });
            }
        }
        WorkOrderServiceTaskWorkspace.populateFlightCategory = populateFlightCategory;
        function showHideFieldsByIncidentType(form) {
            var workOrderValue = form.getAttribute("ts_workorder").getValue();
            var workOrderId = workOrderValue ? workOrderValue[0].id : "";
            var fieldsMap = [
                ['ts_vlocation', 'ts_location'],
                ['ts_vflightnumber', 'ts_flightnumber'],
                ['ts_vorigin', 'ts_origin'],
                ['ts_vdestination', 'ts_destination'],
                ['ts_vflightcategory', 'ts_flightcategory'],
                ['ts_vflighttype', 'ts_flighttype'],
                ['ts_vreportdetails', 'ts_reportdetails'],
                ['ts_vpaxcheckedin', 'ts_paxonboard'],
                ['ts_vpaxboarded', 'ts_paxboarded'],
                ['ts_vcbcheckedin', 'ts_cbonboard'],
                ['ts_vcbloaded', 'ts_cbloaded'],
                ['ts_vscheduledtime', 'ts_scheduledtime'],
                ['ts_vactualtime', 'ts_actualtime'],
                ['ts_vregistration', 'ts_aircraftmark'],
                ['ts_vmanufacturer', 'ts_aircraftmanufacturer'],
                ['ts_vmodel', 'ts_aircraftmodel'],
                ['ts_vbrandname', 'ts_brandname'],
                ['ts_vaocoperation', 'ts_aocoperation'],
                ['ts_vaocstakeholder', 'ts_aocstakeholder'],
                ['ts_vaocoperationtype', 'ts_aocoperationtype'],
                ['ts_vaocsite', 'ts_aocsite'],
                ['ts_vpassengerservices', 'ts_passengerservices'],
                ['ts_vrampservices', 'ts_rampservices'],
                ['ts_vcargoservices', 'ts_cargoservices'],
                ['ts_vcateringservices', 'ts_cateringservices'],
                ['ts_vgroomingservices', 'ts_groomingservices'],
                ['ts_vsecuritysearchservices', 'ts_securitysearchservices'],
                ['ts_vaccesscontrolsecurityservices', 'ts_accesscontrolsecurityservices'],
                ['ts_vothersecurityservices', 'ts_othersecurityservices']
            ];
            Xrm.WebApi.retrieveRecord("msdyn_workorder", workOrderId, "?$select=_msdyn_primaryincidenttype_value&$expand=msdyn_primaryincidenttype ").then(function success(result) {
                fieldsMap.forEach(function (item, index) {
                    var isVisiable = false;
                    if (result["msdyn_primaryincidenttype"][item[0]] == true) {
                        isVisiable = true;
                    }
                    var control = form.getControl(item[1]);
                    if (control != null) {
                        control.setVisible(isVisiable);
                    }
                });
            }, function error(error) {
                Xrm.Navigation.openAlertDialog({ text: error.message });
            });
        }
        function showHideFieldsByOperationType(form, operationTypeId, operationTypeOwnerId) {
            return __awaiter(this, void 0, void 0, function () {
                var isAvSec;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, isOwnedByAvSec(operationTypeOwnerId)];
                        case 1:
                            isAvSec = _a.sent();
                            if (!isAvSec) {
                                form.ui.tabs.get('tab_Oversight').sections.get('tab_Oversight_AirCarrier').setVisible(false);
                                form.ui.tabs.get('tab_Oversight').sections.get('tab_Oversight_Location').setVisible(false);
                                form.ui.tabs.get('tab_Oversight').sections.get('tab_Oversight_ServiceProviders').setVisible(false);
                                form.ui.tabs.get('tab_Oversight').sections.get('tab_Oversight_Aircraft').setVisible(false);
                                form.ui.tabs.get('tab_Oversight').sections.get('tab_Oversight_Flight').setVisible(false);
                                form.ui.tabs.get('tab_Oversight').sections.get('tab_Oversight_Other').setVisible(false);
                            }
                            else {
                                form.ui.tabs.get('tab_Oversight').sections.get('tab_Oversight_AirCarrier').setVisible(true);
                                form.ui.tabs.get('tab_Oversight').sections.get('tab_Oversight_Location').setVisible(true);
                                form.ui.tabs.get('tab_Oversight').sections.get('tab_Oversight_ServiceProviders').setVisible(true);
                                form.ui.tabs.get('tab_Oversight').sections.get('tab_Oversight_Aircraft').setVisible(true);
                                form.ui.tabs.get('tab_Oversight').sections.get('tab_Oversight_Flight').setVisible(true);
                                form.ui.tabs.get('tab_Oversight').sections.get('tab_Oversight_Other').setVisible(true);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        }
        function setAOCSiteFilteredView(form, regionAttributeId, stakeholderTypeAttributeId, operationTypeAttributeId) {
            var viewId = '{6E57251F-F695-4076-9498-49AB892154B7}';
            var entityName = "msdyn_functionallocation";
            var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredSites");
            var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" returntotalrecordcount="true" page="1" count="25" no-lock="false"><entity name="msdyn_functionallocation"><attribute name="statecode"/><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><filter>' + '</filter><filter><condition attribute="ts_region" operator="eq" value="' + regionAttributeId + '"/></filter><filter><condition attribute="ts_sitestatus" operator="ne" value="717750001" /></filter><order attribute="msdyn_name" descending="false"/><link-entity name="ovs_operation" from="ts_site" to="msdyn_functionallocationid"><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value=" ' + operationTypeAttributeId + '"/><condition attribute="ts_stakeholder" operator="eq" value="' + stakeholderTypeAttributeId + '"/><condition attribute="ts_operationalstatus" operator="eq" value="717750000"/></filter></link-entity></entity></fetch>';
            var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="200" /></row></grid>';
            form.getControl("ts_aocsite").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
        }
        function AOCOperationOnChange(eContext) {
            var form = eContext.getFormContext();
            var aocOperation = form.getAttribute("ts_aocoperation").getValue();
            if (aocOperation != null) {
                Xrm.WebApi.retrieveRecord("ovs_operation", aocOperation[0].id, "?$select=_ts_stakeholder_value,_ovs_operationtypeid_value,_ts_site_value ").then(function success(result) {
                    var lookup = new Array();
                    lookup[0] = new Object();
                    if (result._ovs_operationtypeid_value != null) {
                        lookup[0].id = result._ovs_operationtypeid_value;
                        lookup[0].name = result["_ovs_operationtypeid_value@OData.Community.Display.V1.FormattedValue"];
                        lookup[0].entityType = result["_ovs_operationtypeid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                        form.getAttribute("ts_aocoperationtype").setValue(lookup);
                    }
                    lookup = new Array();
                    lookup[0] = new Object();
                    if (result._ts_stakeholder_value != null) {
                        lookup[0].id = result._ts_stakeholder_value;
                        lookup[0].name = result["_ts_stakeholder_value@OData.Community.Display.V1.FormattedValue"];
                        lookup[0].entityType = result["_ts_stakeholder_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                        form.getAttribute("ts_aocstakeholder").setValue(lookup);
                    }
                    lookup = new Array();
                    lookup[0] = new Object();
                    if (result._ts_site_value != null) {
                        lookup[0].id = result._ts_site_value;
                        lookup[0].name = result["_ts_site_value@OData.Community.Display.V1.FormattedValue"];
                        lookup[0].entityType = result["_ts_site_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                        form.getAttribute("ts_aocsite").setValue(lookup);
                    }
                }, function error(error) {
                    Xrm.Navigation.openAlertDialog({ text: error.message });
                });
            }
            else {
                form.getAttribute("ts_aocoperationtype").setValue(null);
                form.getAttribute("ts_aocstakeholder").setValue(null);
                form.getAttribute("ts_aocsite").setValue(null);
            }
        }
        WorkOrderServiceTaskWorkspace.AOCOperationOnChange = AOCOperationOnChange;
        function onAOCFieldsOnChange(eContext) {
            var form = eContext.getFormContext();
            var aocStakeholder = form.getAttribute("ts_aocstakeholder").getValue();
            var aocOperationtype = form.getAttribute("ts_aocoperationtype").getValue();
            if (aocStakeholder != null && aocOperationtype != null) {
                setAOCSiteFilteredView(form, aocRegion, aocStakeholder[0].id, aocOperationtype[0].id);
            }
        }
        WorkOrderServiceTaskWorkspace.onAOCFieldsOnChange = onAOCFieldsOnChange;
        function aircraftManufacturerOnChange(eContext) {
            var form = eContext.getFormContext();
            var aircraftmanufacturer = form.getAttribute("ts_aircraftmanufacturer").getValue();
            var options = form.getControl("ts_aircraftmodel").getOptions();
            for (var i = 0; i < options.length; i++)
                form.getControl("ts_aircraftmodel").removeOption(options[i].value);
            form.getControl("ts_aircraftmodelother").setVisible(false);
            form.getControl("ts_aircraftmodel").setVisible(true);
            if (aircraftmanufacturer == 741130000 /* Boeing */) {
                for (var i = 1; i <= 11; i++) {
                    form.getControl("ts_aircraftmodel").addOption(aircraftModelOptions[i]);
                }
            }
            else if (aircraftmanufacturer == 741130001 /* Airbus */) {
                for (var i = 12; i <= 22; i++) {
                    form.getControl("ts_aircraftmodel").addOption(aircraftModelOptions[i]);
                }
            }
            else if (aircraftmanufacturer == 741130002 /* DeHavilland */) {
                for (var i = 23; i <= 24; i++) {
                    form.getControl("ts_aircraftmodel").addOption(aircraftModelOptions[i]);
                }
            }
            else if (aircraftmanufacturer == 741130003 /* Bombardier */) {
                for (var i = 25; i <= 25; i++) {
                    form.getControl("ts_aircraftmodel").addOption(aircraftModelOptions[i]);
                }
            }
            else if (aircraftmanufacturer == 741130004 /* Embraer */) {
                for (var i = 26; i <= 29; i++) {
                    form.getControl("ts_aircraftmodel").addOption(aircraftModelOptions[i]);
                }
            }
            else if (aircraftmanufacturer == 741130005 /* Other */) {
                form.getControl("ts_aircraftmodelother").setVisible(true);
                form.getControl("ts_aircraftmodel").setVisible(false);
            }
        }
        WorkOrderServiceTaskWorkspace.aircraftManufacturerOnChange = aircraftManufacturerOnChange;
        function filterLegislationSource(eContext) {
            return __awaiter(this, void 0, void 0, function () {
                var formContext, workOrderValue, workOrderId;
                return __generator(this, function (_a) {
                    formContext = eContext.getFormContext();
                    workOrderValue = formContext.getAttribute("ts_workorder").getValue();
                    workOrderId = workOrderValue ? workOrderValue[0].id : "";
                    Xrm.WebApi.retrieveRecord("msdyn_workorder", workOrderId, "?$select=ovs_operationtypeid&$expand=ovs_operationtypeid($expand=owningbusinessunit($select=businessunitid))").then(function (workOrder) {
                        return __awaiter(this, void 0, void 0, function () {
                            var buId, isAvSec, viewId, entityName, fetchXml, layoutXml;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(workOrder != null && workOrder.ovs_operationtypeid != null && workOrder.ovs_operationtypeid.owningbusinessunit != null)) return [3 /*break*/, 2];
                                        buId = workOrder.ovs_operationtypeid.owningbusinessunit.businessunitid;
                                        return [4 /*yield*/, isAvSecBU(buId)];
                                    case 1:
                                        isAvSec = _a.sent();
                                        if (isAvSec) {
                                            viewId = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F662}';
                                            entityName = "qm_tylegislationsource";
                                            fetchXml = [
                                                "<fetch>",
                                                "  <entity name='qm_tylegislationsource'>",
                                                "    <link-entity name='ts_tylegislationsource_ovs_operationtype' from='qm_tylegislationsourceid' to='qm_tylegislationsourceid' intersect='true'>",
                                                "      <filter>",
                                                "        <condition attribute='ovs_operationtypeid' operator='eq' value='", workOrder.ovs_operationtypeid.ovs_operationtypeid, "' uitype='ts_tylegislationsource_ovs_operationtype'/>",
                                                "      </filter>",
                                                "    </link-entity>",
                                                "  </entity>",
                                                "</fetch>"
                                            ].join("");
                                            layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="qm_tylegislationsourceid"><cell name="qm_name" width="200" /></row></grid>';
                                            formContext.getControl("ts_legislationsourcefilter").addCustomView(viewId, entityName, "", fetchXml, layoutXml, true);
                                        }
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        });
                    });
                    return [2 /*return*/];
                });
            });
        }
        function workOrderIsDraft(eContext) {
            return __awaiter(this, void 0, void 0, function () {
                var form, workOrderValue, workOrderId, workOrder;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            form = eContext.getFormContext();
                            workOrderValue = form.getAttribute("ts_workorder").getValue();
                            workOrderId = workOrderValue && workOrderValue[0] ? workOrderValue[0].id : null;
                            // No parent work order → cannot be "Draft" in the planning sense
                            if (!workOrderId) {
                                return [2 /*return*/, false];
                            }
                            return [4 /*yield*/, Xrm.WebApi.retrieveRecord("msdyn_workorder", workOrderId, "?$select=ts_state")];
                        case 1:
                            workOrder = _a.sent();
                            return [2 /*return*/, workOrder.ts_state == 717750000 /* Draft */];
                    }
                });
            });
        }
        function getSurveyLocal() {
            var languageCode = Xrm.Utility.getGlobalContext().userSettings.languageId;
            var surveyLocale = 'en';
            if (languageCode == 1036) {
                //French
                surveyLocale = 'fr';
            }
            return surveyLocale;
        }
        WorkOrderServiceTaskWorkspace.getSurveyLocal = getSurveyLocal;
        function InitiateSurvey(eContext, wrCtrl, questionnaireDefinition, questionnaireResponse, mode) {
            var Form = eContext.getFormContext();
            wrCtrl.setVisible(true);
            wrCtrl.getContentWindow().then(function (win) {
                return __awaiter(this, void 0, void 0, function () {
                    var surveyLocale, isOffline, operationData, statusReason;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                surveyLocale = getSurveyLocal();
                                win.InitialContext(eContext);
                                console.log("Online: retrieveWorkOrderOperationData");
                                isOffline = Xrm.Utility.getGlobalContext().client.getClientState() === "Offline";
                                if (!isOffline) return [3 /*break*/, 1];
                                //let operationData = await retrieveWorkOrderOperationData(eContext);        
                                win.isComplete = (Form.getAttribute("ts_percentcomplete").getValue() == 100.00);
                                //win.operationList = operationData.operations;
                                win.operationList = [];
                                win.activityTypeOperationTypeIdsList = [];
                                fetchXMLCallStep3(eContext, win); //sequence: 3,1,4,2
                                return [3 /*break*/, 3];
                            case 1: return [4 /*yield*/, retrieveWorkOrderOperationData(eContext)];
                            case 2:
                                operationData = _a.sent();
                                win.isComplete = (Form.getAttribute("ts_percentcomplete").getValue() == 100.00);
                                win.operationList = operationData.operations;
                                win.activityTypeOperationTypeIdsList = operationData.activityTypeOperationTypeIds;
                                statusReason = Form.getAttribute("statuscode").getValue();
                                if (statusReason == 741130001 && operationData.isInspectionType) {
                                    mode = "display";
                                    setAllFieldsDisabled(eContext);
                                }
                                _a.label = 3;
                            case 3:
                                win.InitializeSurveyRender(questionnaireDefinition, questionnaireResponse, surveyLocale, mode);
                                return [2 /*return*/];
                        }
                    });
                });
            });
        }
        function fetchXMLCallStep1(eContext, win) {
            var workOrderAttribute = eContext.getFormContext().getAttribute('ts_workorder').getValue();
            var workOrderId = workOrderAttribute != null ? workOrderAttribute[0].id : "";
            var statusReason = eContext.getFormContext().getAttribute("statuscode").getValue();
            var operations = [];
            console.log("fetchXMLCallStep1  win.activityTypeOperationTypeIdsList length: " + win.activityTypeOperationTypeIdsList.length);
            var isInspectionType = false;
            var parentWorkOrderOperationFetchXml = [
                "<fetch top='50'>",
                "  <entity name='msdyn_workorder'>",
                "    <attribute name='ovs_operationid' />",
                "    <attribute name='msdyn_serviceaccount' />",
                "    <attribute name='msdyn_workordertype' />",
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
                "        <attribute name='ovs_operationtypenameenglish' />",
                "        <attribute name='ovs_operationtypenamefrench' />",
                "      </link-entity>",
                "      <link-entity name = 'msdyn_functionallocation' from = 'msdyn_functionallocationid' to = 'ts_site' > ",
                "        <attribute name='ts_functionallocationnamefrench' />",
                "        <attribute name='ts_functionallocationnameenglish' />",
                "      </link-entity>",
                "    </link-entity>",
                "    <link-entity name='account' from='accountid' to='msdyn_serviceaccount'>",
                "      <attribute name='name' />",
                "    </link-entity>",
                "  </entity>",
                "</fetch>",
            ].join("");
            parentWorkOrderOperationFetchXml = "?fetchXml=" + encodeURIComponent(parentWorkOrderOperationFetchXml);
            //Retrieve the operation in the ovs_operationid field of the parent work order
            Xrm.WebApi.retrieveMultipleRecords("msdyn_workorder", parentWorkOrderOperationFetchXml).then(function success(result) {
                console.log("fetchXMLCallStep1 result: " + result.entities.length);
                if (result.entities.length > 0) {
                    var workOrderOperation = result.entities[0];
                    win.workOrderOperation = workOrderOperation;
                    var stakeholderName = workOrderOperation["account4.name"];
                    var operationTypeName = (lang == 1036) ? workOrderOperation["ovs_operationtype2.ovs_operationtypenamefrench"] : workOrderOperation["ovs_operationtype2.ovs_operationtypenameenglish"];
                    var siteName = (lang == 1036) ? workOrderOperation["msdyn_functionallocation3.ts_functionallocationnamefrench"] : workOrderOperation["msdyn_functionallocation3.ts_functionallocationnameenglish"];
                    if (workOrderOperation["ovs_operation1.ovs_operationid"] != null &&
                        workOrderOperation["account4.name"] != null &&
                        workOrderOperation["ovs_operationtype2.ts_regulated"] != null &&
                        workOrderOperation["ovs_operationtype2.ovs_operationtypeid"] != null &&
                        workOrderOperation["ovs_operationtype2.ts_regulated"] == true &&
                        win.activityTypeOperationTypeIdsList.includes(workOrderOperation["ovs_operationtype2.ovs_operationtypeid"])) {
                        operations.push({
                            id: workOrderOperation["ovs_operation1.ovs_operationid"],
                            name: stakeholderName + " | " + operationTypeName + " | " + siteName,
                            operationTypeId: workOrderOperation["ovs_operation1.ovs_operationtypeid"],
                            isRegulated: workOrderOperation["ovs_operationtype2.ts_regulated"]
                        });
                    }
                }
                if (workOrderOperation["_msdyn_workordertype_value"] != null) {
                    if (workOrderOperation["_msdyn_workordertype_value"].toUpperCase() == "B1EE680A-7CF7-EA11-A815-000D3AF3A7A7") {
                        isInspectionType = true;
                    }
                }
                if (statusReason == 918640002 && isInspectionType) {
                    mode = "display";
                    setAllFieldsDisabled(eContext);
                }
                win.operationList = operations;
                fetchXMLCallStep4(win);
            }, function (error) {
                console.log("fetchXMLCallStep1 ERROR: " + error.message);
            });
        }
        function fetchXMLCallStep2(win) {
            var parentWorkOrderRelatedOperationFetchXml = [
                "<fetch top='50'>",
                "  <entity name='ovs_operation'>",
                "    <attribute name='ts_stakeholder' />",
                "    <attribute name='ovs_operationid' />",
                "    <attribute name='ovs_name' />",
                "    <link-entity name='ts_msdyn_workorder_ovs_operation' from='ovs_operationid' to='ovs_operationid' intersect='true'>",
                "      <filter>",
                "        <condition attribute='msdyn_workorderid' operator='eq' value='", win.workOrderId, "'/>",
                "      </filter>",
                "    </link-entity>",
                "    <link-entity name='account' from='accountid' to='ts_stakeholder'>",
                "      <attribute name='name' />",
                "    </link-entity>",
                "    <link-entity name='ovs_operationtype' from='ovs_operationtypeid' to='ovs_operationtypeid'>",
                "      <attribute name='ts_regulated' />",
                "      <attribute name='ovs_operationtypeid' /> ",
                "      <attribute name='ovs_operationtypenameenglish' />",
                "      <attribute name='ovs_operationtypenamefrench' />",
                "    </link-entity>",
                "    <link-entity name='msdyn_functionallocation' from='msdyn_functionallocationid' to='ts_site'>",
                "      <attribute name='ts_functionallocationnamefrench' />",
                "      <attribute name='ts_functionallocationnameenglish' />",
                "    </link-entity>",
                "  </entity>",
                "</fetch>",
            ].join("");
            parentWorkOrderRelatedOperationFetchXml = "?fetchXml=" + encodeURIComponent(parentWorkOrderRelatedOperationFetchXml);
            //Retrieve N:N Operations
            var activityTypeOperationTypeIds = [];
            Xrm.WebApi.retrieveMultipleRecords("ovs_operation", parentWorkOrderRelatedOperationFetchXml).then(function success(result) {
                console.log("fetchXMLCallStep2 result: " + result.entities.length);
                //Add the operationid, name, operationTypeId, and regulated boolean of the work order's N:N operations to the operations array
                // The Operation must be regulated, and the Operation Type of the Operation must be one of the Work Order's Activity Type's Operation Types
                result.entities.forEach(function (operation) {
                    var stakeholderName = operation["account2.name"];
                    var operationTypeName = (lang == 1036) ? operation["ovs_operationtype3.ovs_operationtypenamefrench"] : operation["ovs_operationtype3.ovs_operationtypenameenglish"];
                    var siteName = (lang == 1036) ? operation["msdyn_functionallocation4.ts_functionallocationnamefrench"] : operation["msdyn_functionallocation4.ts_functionallocationnameenglish"];
                    if (operation.ovs_operationid != null &&
                        operation["account2.name"] != null &&
                        operation["ovs_operationtype3.ts_regulated"] != null &&
                        operation["ovs_operationtype3.ovs_operationtypeid"] != null &&
                        operation["ovs_operationtype3.ts_regulated"] == true &&
                        activityTypeOperationTypeIds.includes(operation["ovs_operationtype3.ovs_operationtypeid"]) &&
                        operation["ovs_operationid"] != win.workOrderOperatingcarrierOperationId) {
                        win.operationList.push({
                            id: operation["ovs_operationid"],
                            name: stakeholderName + " | " + operationTypeName + " | " + siteName,
                            operationTypeId: operation["ovs_operationtype3.ovs_operationtypeid"],
                            isRegulated: operation["ovs_operationtype3.ts_regulated"]
                        });
                    }
                });
            }, function (error) {
                console.log("fetchXMLCallStep2 ERROR: " + error.message);
            });
        }
        function fetchXMLCallStep3(eContext, win) {
            var workOrderAttribute = eContext.getFormContext().getAttribute('ts_workorder').getValue();
            var workOrderId = workOrderAttribute != null ? workOrderAttribute[0].id : "";
            win.workOrderId = workOrderId;
            var activityTypeOperationTypesFetchXML = [
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
            var activityTypeOperationTypeIds = [];
            //Retrieve operationTypes of parent Work Order's ActivityType
            var isOffline = Xrm.Utility.getGlobalContext().client.getClientState() === "Offline";
            if (isOffline) {
                Xrm.WebApi.offline.retrieveMultipleRecords("ovs_operationtype", activityTypeOperationTypesFetchXML).then(function success(result) {
                    console.log("fetchXMLCallStep3 OFFLINE result: " + result.entities.length);
                    result.entities.forEach(function (operationType) {
                        activityTypeOperationTypeIds.push(operationType["ovs_operationtypeid"]);
                    });
                    win.activityTypeOperationTypeIdsList = activityTypeOperationTypeIds;
                    fetchXMLCallStep1(eContext, win);
                }, function (error) {
                    console.log("fetchXMLCallStep3 ERROR: " + error.message);
                });
            }
            else {
                Xrm.WebApi.retrieveMultipleRecords("ovs_operationtype", activityTypeOperationTypesFetchXML).then(function success(result) {
                    console.log("fetchXMLCallStep3 result: " + result.entities.length);
                    result.entities.forEach(function (operationType) {
                        activityTypeOperationTypeIds.push(operationType["ovs_operationtypeid"]);
                    });
                    win.activityTypeOperationTypeIdsList = activityTypeOperationTypeIds;
                    fetchXMLCallStep1(eContext, win);
                }, function (error) {
                    console.log("fetchXMLCallStep3 ERROR: " + error.message);
                });
            }
        }
        function fetchXMLCallStep4(win) {
            var parentWorkOrderOperatingcarrierOperationFetchXml = [
                "<fetch top='50'>",
                "  <entity name='msdyn_workorder'>",
                "    <attribute name='ts_operatingcarrieroperation' />",
                "    <attribute name='ts_operatingcarrier' />",
                "    <attribute name='msdyn_workordertype' />",
                "    <filter>",
                "      <condition attribute='msdyn_workorderid' operator='eq' value='", win.workOrderId, "'/>",
                "    </filter>",
                "    <link-entity name='ovs_operation' from='ovs_operationid' to='ts_operatingcarrieroperation' link-type='inner'>",
                "      <attribute name='ovs_operationtypeid' />",
                "      <attribute name='ovs_operationid' />",
                "      <attribute name='ovs_name' />",
                "      <link-entity name='ovs_operationtype' from='ovs_operationtypeid' to='ovs_operationtypeid'>",
                "        <attribute name='ts_regulated' />",
                "        <attribute name='ovs_operationtypeid' /> ",
                "        <attribute name='ovs_operationtypenameenglish' />",
                "        <attribute name='ovs_operationtypenamefrench' />",
                "      </link-entity>",
                "      <link-entity name = 'msdyn_functionallocation' from = 'msdyn_functionallocationid' to = 'ts_site' > ",
                "        <attribute name='ts_functionallocationnamefrench' />",
                "        <attribute name='ts_functionallocationnameenglish' />",
                "      </link-entity>",
                "    </link-entity>",
                "    <link-entity name='account' from='accountid' to='ts_operatingcarrier'>",
                "      <attribute name='name' />",
                "    </link-entity>",
                "  </entity>",
                "</fetch>",
            ].join("");
            parentWorkOrderOperatingcarrierOperationFetchXml = "?fetchXml=" + encodeURIComponent(parentWorkOrderOperatingcarrierOperationFetchXml);
            Xrm.WebApi.retrieveMultipleRecords("msdyn_workorder", parentWorkOrderOperatingcarrierOperationFetchXml).then(function success(result) {
                console.log("fetchXMLCallStep4 result: " + result.entities.length + " - WO- " + win.workOrderId);
                //OperatingcarrierOperation
                var workOrderOperatingcarrierOperationId = "";
                if (result.entities.length > 0) {
                    var workOrderOperatingcarrierOperation = result.entities[0];
                    var stakeholderName = workOrderOperatingcarrierOperation["account4.name"];
                    var operationTypeName = (lang == 1036) ? workOrderOperatingcarrierOperation["ovs_operationtype2.ovs_operationtypenamefrench"] : workOrderOperatingcarrierOperation["ovs_operationtype2.ovs_operationtypenameenglish"];
                    var siteName = (lang == 1036) ? workOrderOperatingcarrierOperation["msdyn_functionallocation3.ts_functionallocationnamefrench"] : workOrderOperatingcarrierOperation["msdyn_functionallocation3.ts_functionallocationnameenglish"];
                    if (workOrderOperatingcarrierOperation["ovs_operation1.ovs_operationid"] != null &&
                        workOrderOperatingcarrierOperation["account4.name"] != null &&
                        workOrderOperatingcarrierOperation["ovs_operationtype2.ts_regulated"] != null &&
                        workOrderOperatingcarrierOperation["ovs_operationtype2.ovs_operationtypeid"] != null &&
                        workOrderOperatingcarrierOperation["ovs_operationtype2.ts_regulated"] == true &&
                        win.activityTypeOperationTypeIdsList.includes(workOrderOperatingcarrierOperation["ovs_operationtype2.ovs_operationtypeid"]) &&
                        win.workOrderOperation["ovs_operation1.ovs_operationid"] != workOrderOperatingcarrierOperation["ovs_operation1.ovs_operationid"]) {
                        win.workOrderOperatingcarrierOperationId = workOrderOperatingcarrierOperation["ovs_operation1.ovs_operationid"];
                        win.operationList.push({
                            id: workOrderOperatingcarrierOperation["ovs_operation1.ovs_operationid"],
                            name: stakeholderName + " | " + operationTypeName + " | " + siteName,
                            operationTypeId: workOrderOperatingcarrierOperation["ovs_operation1.ovs_operationtypeid"],
                            isRegulated: workOrderOperatingcarrierOperation["ovs_operationtype2.ts_regulated"]
                        });
                    }
                }
                fetchXMLCallStep2(win);
            }, function (error) {
                console.log("fetchXMLCallStep4 ERROR: " + error.message);
            });
        }
        //Retrieves parent Work Order's Operations and parent Work Order's ActivityType's OperationTypes
        function retrieveWorkOrderOperationData(eContext) {
            return __awaiter(this, void 0, void 0, function () {
                var workOrderAttribute, workOrderId, operations, activityTypeOperationTypeIds, isInspectionType, parentWorkOrderOperationFetchXml, operationPromise1, parentWorkOrderRelatedOperationFetchXml, operationPromise2, activityTypeOperationTypesFetchXML, activityTypeOperationTypesPromise, parentWorkOrderOperatingcarrierOperationFetchXml, operationPromise4;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            workOrderAttribute = eContext.getFormContext().getAttribute('ts_workorder').getValue();
                            workOrderId = workOrderAttribute != null ? workOrderAttribute[0].id : "";
                            operations = [];
                            activityTypeOperationTypeIds = [];
                            isInspectionType = false;
                            parentWorkOrderOperationFetchXml = [
                                "<fetch top='50'>",
                                "  <entity name='msdyn_workorder'>",
                                "    <attribute name='ovs_operationid' />",
                                "    <attribute name='msdyn_serviceaccount' />",
                                "    <attribute name='msdyn_workordertype' />",
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
                                "        <attribute name='ovs_operationtypenameenglish' />",
                                "        <attribute name='ovs_operationtypenamefrench' />",
                                "      </link-entity>",
                                "      <link-entity name = 'msdyn_functionallocation' from = 'msdyn_functionallocationid' to = 'ts_site' > ",
                                "        <attribute name='ts_functionallocationnamefrench' />",
                                "        <attribute name='ts_functionallocationnameenglish' />",
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
                                "      <attribute name='ovs_operationtypenameenglish' />",
                                "      <attribute name='ovs_operationtypenamefrench' />",
                                "    </link-entity>",
                                "    <link-entity name='msdyn_functionallocation' from='msdyn_functionallocationid' to='ts_site'>",
                                "      <attribute name='ts_functionallocationnamefrench' />",
                                "      <attribute name='ts_functionallocationnameenglish' />",
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
                            parentWorkOrderOperatingcarrierOperationFetchXml = [
                                "<fetch top='50'>",
                                "  <entity name='msdyn_workorder'>",
                                "    <attribute name='ts_operatingcarrieroperation' />",
                                "    <attribute name='ts_operatingcarrier' />",
                                "    <attribute name='msdyn_workordertype' />",
                                "    <filter>",
                                "      <condition attribute='msdyn_workorderid' operator='eq' value='", workOrderId, "'/>",
                                "    </filter>",
                                "    <link-entity name='ovs_operation' from='ovs_operationid' to='ts_operatingcarrieroperation' link-type='inner'>",
                                "      <attribute name='ovs_operationtypeid' />",
                                "      <attribute name='ovs_operationid' />",
                                "      <attribute name='ovs_name' />",
                                "      <link-entity name='ovs_operationtype' from='ovs_operationtypeid' to='ovs_operationtypeid'>",
                                "        <attribute name='ts_regulated' />",
                                "        <attribute name='ovs_operationtypeid' /> ",
                                "        <attribute name='ovs_operationtypenameenglish' />",
                                "        <attribute name='ovs_operationtypenamefrench' />",
                                "      </link-entity>",
                                "      <link-entity name = 'msdyn_functionallocation' from = 'msdyn_functionallocationid' to = 'ts_site' > ",
                                "        <attribute name='ts_functionallocationnamefrench' />",
                                "        <attribute name='ts_functionallocationnameenglish' />",
                                "      </link-entity>",
                                "    </link-entity>",
                                "    <link-entity name='account' from='accountid' to='ts_operatingcarrier'>",
                                "      <attribute name='name' />",
                                "    </link-entity>",
                                "  </entity>",
                                "</fetch>",
                            ].join("");
                            parentWorkOrderOperatingcarrierOperationFetchXml = "?fetchXml=" + encodeURIComponent(parentWorkOrderOperatingcarrierOperationFetchXml);
                            operationPromise4 = Xrm.WebApi.retrieveMultipleRecords("msdyn_workorder", parentWorkOrderOperatingcarrierOperationFetchXml);
                            return [4 /*yield*/, Promise.all([operationPromise1, operationPromise2, activityTypeOperationTypesPromise, operationPromise4]).then(function (operationRetrievalPromises) {
                                    //collect each operationType Id
                                    operationRetrievalPromises[2].entities.forEach(function (operationType) {
                                        activityTypeOperationTypeIds.push(operationType["ovs_operationtypeid"]);
                                    });
                                    //Add the work order operation operationid, name, operationTypeId, and regulated boolean to the operations array
                                    var workOrderOperation = operationRetrievalPromises[0].entities[0];
                                    var stakeholderName = workOrderOperation["account4.name"];
                                    var operationTypeName = (lang == 1036) ? workOrderOperation["ovs_operationtype2.ovs_operationtypenamefrench"] : workOrderOperation["ovs_operationtype2.ovs_operationtypenameenglish"];
                                    var siteName = (lang == 1036) ? workOrderOperation["msdyn_functionallocation3.ts_functionallocationnamefrench"] : workOrderOperation["msdyn_functionallocation3.ts_functionallocationnameenglish"];
                                    if (workOrderOperation["ovs_operation1.ovs_operationid"] != null &&
                                        workOrderOperation["account4.name"] != null &&
                                        workOrderOperation["ovs_operationtype2.ts_regulated"] != null &&
                                        workOrderOperation["ovs_operationtype2.ovs_operationtypeid"] != null &&
                                        workOrderOperation["ovs_operationtype2.ts_regulated"] == true &&
                                        activityTypeOperationTypeIds.includes(workOrderOperation["ovs_operationtype2.ovs_operationtypeid"])) {
                                        operations.push({
                                            id: workOrderOperation["ovs_operation1.ovs_operationid"],
                                            name: stakeholderName + " | " + operationTypeName + " | " + siteName,
                                            operationTypeId: workOrderOperation["ovs_operation1.ovs_operationtypeid"],
                                            isRegulated: workOrderOperation["ovs_operationtype2.ts_regulated"]
                                        });
                                    }
                                    if (workOrderOperation["_msdyn_workordertype_value"] != null) {
                                        if (workOrderOperation["_msdyn_workordertype_value"].toUpperCase() == "B1EE680A-7CF7-EA11-A815-000D3AF3A7A7") {
                                            isInspectionType = true;
                                        }
                                    }
                                    if (workOrderOperation["ovs_operation1.ovs_operationid"] != null &&
                                        workOrderOperation["account4.name"] != null &&
                                        workOrderOperation["ovs_operationtype2.ts_regulated"] != null &&
                                        workOrderOperation["ovs_operationtype2.ovs_operationtypeid"] != null &&
                                        workOrderOperation["ovs_operationtype2.ts_regulated"] == true &&
                                        workOrderOperation["ovs_operationtype2.ovs_operationtypeid"] == 'abf259f6-eff0-ed11-8848-000d3af4f330') {
                                        operations.push({
                                            id: workOrderOperation["ovs_operation1.ovs_operationid"],
                                            name: stakeholderName + " | " + operationTypeName + " | " + siteName,
                                            operationTypeId: workOrderOperation["ovs_operation1.ovs_operationtypeid"],
                                            isRegulated: workOrderOperation["ovs_operationtype2.ts_regulated"]
                                        });
                                    }
                                    //OperatingcarrierOperation
                                    var workOrderOperatingcarrierOperationId = "";
                                    if (operationRetrievalPromises[3].entities.length > 0) {
                                        var workOrderOperatingcarrierOperation = operationRetrievalPromises[3].entities[0];
                                        stakeholderName = workOrderOperatingcarrierOperation["account4.name"];
                                        operationTypeName = (lang == 1036) ? workOrderOperatingcarrierOperation["ovs_operationtype2.ovs_operationtypenamefrench"] : workOrderOperatingcarrierOperation["ovs_operationtype2.ovs_operationtypenameenglish"];
                                        siteName = (lang == 1036) ? workOrderOperatingcarrierOperation["msdyn_functionallocation3.ts_functionallocationnamefrench"] : workOrderOperatingcarrierOperation["msdyn_functionallocation3.ts_functionallocationnameenglish"];
                                        if (workOrderOperatingcarrierOperation["ovs_operation1.ovs_operationid"] != null &&
                                            workOrderOperatingcarrierOperation["account4.name"] != null &&
                                            workOrderOperatingcarrierOperation["ovs_operationtype2.ts_regulated"] != null &&
                                            workOrderOperatingcarrierOperation["ovs_operationtype2.ovs_operationtypeid"] != null &&
                                            workOrderOperatingcarrierOperation["ovs_operationtype2.ts_regulated"] == true &&
                                            activityTypeOperationTypeIds.includes(workOrderOperatingcarrierOperation["ovs_operationtype2.ovs_operationtypeid"]) &&
                                            workOrderOperation["ovs_operation1.ovs_operationid"] != workOrderOperatingcarrierOperation["ovs_operation1.ovs_operationid"]) {
                                            workOrderOperatingcarrierOperationId = workOrderOperatingcarrierOperation["ovs_operation1.ovs_operationid"];
                                            operations.push({
                                                id: workOrderOperatingcarrierOperation["ovs_operation1.ovs_operationid"],
                                                name: stakeholderName + " | " + operationTypeName + " | " + siteName,
                                                operationTypeId: workOrderOperatingcarrierOperation["ovs_operation1.ovs_operationtypeid"],
                                                isRegulated: workOrderOperatingcarrierOperation["ovs_operationtype2.ts_regulated"]
                                            });
                                        }
                                    }
                                    //Add the operationid, name, operationTypeId, and regulated boolean of the work order's N:N operations to the operations array
                                    // The Operation must be regulated, and the Operation Type of the Operation must be one of the Work Order's Activity Type's Operation Types
                                    operationRetrievalPromises[1].entities.forEach(function (operation) {
                                        var stakeholderName = operation["account2.name"];
                                        var operationTypeName = (lang == 1036) ? operation["ovs_operationtype3.ovs_operationtypenamefrench"] : operation["ovs_operationtype3.ovs_operationtypenameenglish"];
                                        var siteName = (lang == 1036) ? operation["msdyn_functionallocation4.ts_functionallocationnamefrench"] : operation["msdyn_functionallocation4.ts_functionallocationnameenglish"];
                                        if (operation.ovs_operationid != null &&
                                            operation["account2.name"] != null &&
                                            operation["ovs_operationtype3.ts_regulated"] != null &&
                                            operation["ovs_operationtype3.ovs_operationtypeid"] != null &&
                                            operation["ovs_operationtype3.ts_regulated"] == true &&
                                            activityTypeOperationTypeIds.includes(operation["ovs_operationtype3.ovs_operationtypeid"]) &&
                                            operation["ovs_operationid"] != workOrderOperatingcarrierOperationId) {
                                            operations.push({
                                                id: operation["ovs_operationid"],
                                                name: stakeholderName + " | " + operationTypeName + " | " + siteName,
                                                operationTypeId: operation["ovs_operationtype3.ovs_operationtypeid"],
                                                isRegulated: operation["ovs_operationtype3.ts_regulated"]
                                            });
                                        }
                                    });
                                })];
                        case 1:
                            _a.sent();
                            //Return object containing retrieved operation data
                            return [2 /*return*/, {
                                    operations: operations,
                                    activityTypeOperationTypeIds: activityTypeOperationTypeIds,
                                    isInspectionType: isInspectionType
                                }];
                    }
                });
            });
        }
        function checkAccessControl(eContext) {
            return __awaiter(this, void 0, void 0, function () {
                var form, accesscontrol, workOrderValue, workOrderId, userId, accessUserFetchXml;
                return __generator(this, function (_a) {
                    form = eContext.getFormContext();
                    accesscontrol = form.getAttribute("ts_accesscontrol").getValue();
                    workOrderValue = form.getAttribute("ts_workorder").getValue();
                    workOrderId = workOrderValue ? workOrderValue[0].id : "";
                    userId = Xrm.Utility.getGlobalContext().userSettings.userId.replace(/[{}]/g, "");
                    if (!userHasRole("System Administrator")) {
                        if (accesscontrol == 1) {
                            accessUserFetchXml = [
                                "<fetch>",
                                "  <entity name='ts_msdyn_workorderservicetask_systemuser'>",
                                "    <filter type='and'>",
                                "      <condition attribute='msdyn_workorderservicetaskid' operator='eq' value='", eContext.getFormContext().data.entity.getId(), "'/>",
                                "      <condition attribute='systemuserid' operator='eq' value='", Xrm.Utility.getGlobalContext().userSettings.userId, "'/>",
                                "    </filter>",
                                "  </entity>",
                                "</fetch>"
                            ].join("");
                            accessUserFetchXml = "?fetchXml=" + encodeURIComponent(accessUserFetchXml);
                            Xrm.WebApi.retrieveMultipleRecords("ts_msdyn_workorderservicetask_systemuser", accessUserFetchXml).then(function (result) {
                                if (result.entities != null && result.entities.length == 0) {
                                    if (workOrderId != "") {
                                        Xrm.WebApi.retrieveRecord("msdyn_workorder", workOrderId, "?$select=_ownerid_value ").then(function success(result) {
                                            if (result._ownerid_value != userId.toLowerCase()) {
                                                form.ui.tabs.get("tab_questionnaire").setVisible(false);
                                            }
                                        });
                                    }
                                    else {
                                        form.ui.tabs.get("tab_questionnaire").setVisible(false);
                                    }
                                }
                            });
                        }
                    }
                    return [2 /*return*/];
                });
            });
        }
        function CompleteQuestionnaire(wrCtrl) {
            // Get the web resource inner content window
            wrCtrl.getContentWindow().then(function (win) {
                var userInput = win.DoComplete();
            });
        }
        function setAllFieldsDisabled(eContext) {
            var formContext = eContext.getFormContext();
            formContext.ui.controls.forEach(function (control, i) {
                if (control && control.getDisabled && !control.getDisabled()) {
                    control.setDisabled(true);
                }
            });
        }
    })(WorkOrderServiceTaskWorkspace = ROM.WorkOrderServiceTaskWorkspace || (ROM.WorkOrderServiceTaskWorkspace = {}));
})(ROM || (ROM = {}));
