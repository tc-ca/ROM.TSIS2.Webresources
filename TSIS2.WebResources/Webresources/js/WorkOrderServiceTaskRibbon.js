var lang = parent.Xrm.Utility.getGlobalContext().userSettings.languageId;

var markCompleteValidationTextLocalized;
var markCompleteValidationTitleLocalized;
var markCompleteConfirmationTextLocalized;
var markCompleteConfirmationTitleLocalized;

if (lang == 1036) {
    markCompleteValidationTextLocalized = "Toutes les questions requises du questionnaire doivent être répondues avant que le questionnaire puissent être marqué comme Terminé.";
    markCompleteValidationTitleLocalized = "Questionnaire Incomplet";
    markCompleteConfirmationTextLocalized = "En cliquant sur OK, le statut du questionnaire passera à Terminé et les réponses seront enregistrées.";
    markCompleteConfirmationTitleLocalized = "Confirmation - Questionnaire complété";
    workOrderServiceTaskDetailsLocalized = "Détails de la tâche du service d'ordre de travail";
    workOrderServiceTaskLocalized = "Tâche de service de l'ordre de travail";
    workOrderDetailsLocalized = "Détails de l'ordre de travail";
    workOrderServiceTaskResultNotPassedTitle = "Tâche de service - Sélection invalide"
    workOrderServiceTaskResultNotPassedText = "La tâche de service selectionné doit avoir « Passé » comme résultat";
    
} else {
    markCompleteValidationTextLocalized = "All required questions in the questionnaire must be answered before the questionnaire can be Marked Complete.";
    markCompleteValidationTitleLocalized = "Questionnaire Incomplete";
    markCompleteConfirmationTextLocalized = "By clicking OK, the questionnaire status will change to Complete and the questionnaire answers will be saved.";
    markCompleteConfirmationTitleLocalized = "Confirmation - Questionnaire Complete";
    workOrderServiceTaskDetailsLocalized = "Work Order Service Task Details";
    workOrderServiceTaskLocalized = "Work Order Service Task";
    workOrderDetailsLocalized = "Work Order Details";
    workOrderServiceTaskResultNotPassedTitle = "Work Order Service Task - Invalid selection"
    workOrderServiceTaskResultNotPassedText = "The selected work order service task must have a result of \"Pass\" ";
}

//Used to hide buttons for ROM - Inspectors unless they're an admin as well
function isROMRoleAndNotSystemAdministrator() {
    return (isROMRole() && !isSystemAdministrator())
}

function isROMRole() {
    romRoles = ["ROM - Inspector", "ROM - Base", "ROM - Business Admin", "ROM - Planner", "ROM - Analyst"]
    var userRoles = Xrm.Utility.getGlobalContext().userSettings.roles;
    //return true when a romRole matches a userRole
    for (var i = 0; i < romRoles.length; i++) {
        for (var j = 0; j < userRoles.getLength(); j++) {
            if (romRoles[i] == userRoles._getByIndex(j).name) {
                return true;
            }
        }
    }
    //No match
    return false;
}

function isSystemAdministrator() {
    var roles = Xrm.Utility.getGlobalContext().userSettings.roles;
    var enable = false;
    roles.forEach(function (item) {
        if (item.name == "System Administrator") enable = true;
    });
    return enable;
}

//Returns true if the associated Task Type is for Custom Questionnaires
async function isTaskTypeCustomQuestionnaire(primaryControl) {
    var taskTypeAttribute = primaryControl.getAttribute("msdyn_tasktype").getValue();
    let taskTypeRecord = await Xrm.WebApi.retrieveRecord("msdyn_servicetasktype", taskTypeAttribute[0].id);
    return taskTypeRecord.ts_hascustomquestionnaire;
}

//Returns true if WOST Status Reason is New
function isStatusReasonNew(primaryControl) {
    var statusReason = primaryControl.getAttribute("statuscode").getValue();
    return (statusReason == 918640005);
}

//Returns true if the Work Order Service Task has a questionnaire definition.
//Used for hiding Print Questionnaire ribbon button when no survey exists.
function hasQuestionnaireDefinition(primaryControl) {
    var questionnaireDefinition = primaryControl.getAttribute('ovs_questionnairedefinition').getValue();
    return (questionnaireDefinition != null);
}

async function printQuestionnaire(primaryControl) {
    let operationData = await retrieveWorkOrderOperationData(primaryControl);
    var printWindow = window.open('../WebResources/ts_/html/surveyRenderPrint.html', 'SurveyPrint');
    //Provide printWindow with data required to render survey before survey is initialized in surveyRenderPrintScript below
    printWindow.questionnaireDefinition = primaryControl.getAttribute('ovs_questionnairedefinition').getValue();
    printWindow.questionnaireResponse = primaryControl.getAttribute('ovs_questionnaireresponse').getValue();
    languageId = Xrm.Utility.getGlobalContext().userSettings.languageId;
    printWindow.locale = (languageId == 1036) ? 'fr' : 'en';
    printWindow.operationList = operationData.operations;
    printWindow.activityTypeOperationTypeIdsList = operationData.activityTypeOperationTypeIds;
    printWindow.onload = function () {
        //Run surveyRenderPrint.js in printWindow
        var surveyRenderPrintScript = printWindow.document.createElement('script');
        surveyRenderPrintScript.src = "../../ts_/js/surveyRenderPrint.js";
        printWindow.document.body.appendChild(surveyRenderPrintScript);

        //Add Word Order Service Task and Work Order Details at the top

        //WOST Details
        var wostNameText = primaryControl.getAttribute('msdyn_name').getValue();

        var taskTypeLabel = primaryControl.getControl('msdyn_tasktype').getLabel();
        var taskTypeValue = primaryControl.getAttribute('msdyn_tasktype').getValue()
        var taskTypeText = (taskTypeValue != null) ? taskTypeValue[0].name : "";

        var statusLabel = primaryControl.getControl('statuscode').getLabel();
        var statusValue = primaryControl.getAttribute('statuscode').getText();

        var wostHeader = printWindow.document.createElement('h1');
        wostHeader.innerHTML = workOrderServiceTaskLocalized;

        var wostName = printWindow.document.createElement('h2');
        wostName.innerHTML = wostNameText;

        var wostDetailsHeader = printWindow.document.createElement('h3');
        wostDetailsHeader.innerHTML = workOrderServiceTaskDetailsLocalized;

        var workOrderServiceTaskDetailsList = printWindow.document.createElement('ul');
        workOrderServiceTaskDetailsList.style.listStyleType = "none";
        workOrderServiceTaskDetailsList.innerHTML += '<li>' + taskTypeLabel + ': ' + taskTypeText + '</li>';
        workOrderServiceTaskDetailsList.innerHTML += '<li>' + statusLabel + ': ' + statusValue + '</li>';

        //Work Order Details
        var workOrderHeader = printWindow.document.createElement('h3');
        workOrderHeader.innerHTML = workOrderDetailsLocalized
        var workOrderQuickView = primaryControl.ui.quickForms.get('WorkOrderQuickView');

        var workOrderLabel = primaryControl.getControl('msdyn_workorder').getLabel();
        var workOrderValue = primaryControl.getAttribute('msdyn_workorder').getValue();
        var workOrderText = workOrderValue != null ? workOrderValue[0].name : "";

        var regionLabel = workOrderQuickView.getControl('ts_region').getLabel();
        var regionValue = workOrderQuickView.getAttribute('ts_region').getValue();
        var regionText = (regionValue != null) ? regionValue[0].name : "";

        var countryLabel = workOrderQuickView.getControl('ts_country').getLabel();
        var countryValue = workOrderQuickView.getAttribute('ts_country').getValue();
        var countryText = (countryValue != null) ? countryValue[0].name : "";

        var operationTypeLabel = workOrderQuickView.getControl('ovs_assetcategory').getLabel();
        var operationTypeValue = workOrderQuickView.getAttribute('ovs_assetcategory').getValue();
        var operationTypeText = (operationTypeValue != null) ? operationTypeValue[0].name : "";

        var stakeholderLabel = workOrderQuickView.getControl('msdyn_serviceaccount').getLabel();
        var stakeholderValue = workOrderQuickView.getAttribute('msdyn_serviceaccount').getValue();
        var stakeholderText = (stakeholderValue != null) ? stakeholderValue[0].name : "";

        var siteLabel = workOrderQuickView.getControl('ts_site').getLabel();
        var siteValue = workOrderQuickView.getAttribute('ts_site').getValue();
        var siteText = (siteValue != null) ? siteValue[0].name : "";

        var workOrderDetailsList = printWindow.document.createElement('ul');
        workOrderDetailsList.style.listStyleType = "none";
        workOrderDetailsList.innerHTML += '<li>' + workOrderLabel + ': ' + workOrderText + '</li>';
        workOrderDetailsList.innerHTML += '<li>' + regionLabel + ': ' + regionText + '</li>';
        workOrderDetailsList.innerHTML += '<li>' + countryLabel + ': ' + countryText + '</li>';
        workOrderDetailsList.innerHTML += '<li>' + operationTypeLabel + ': ' + operationTypeText + '</li>';
        workOrderDetailsList.innerHTML += '<li>' + stakeholderLabel + ': ' + stakeholderText + '</li>';
        workOrderDetailsList.innerHTML += '<li>' + siteLabel + ': ' + siteText + '</li>';

        var workOrderServiceTaskDetails = printWindow.document.getElementById('workOrderServiceTaskDetails');
        workOrderServiceTaskDetails.appendChild(wostHeader);
        workOrderServiceTaskDetails.appendChild(wostName);
        workOrderServiceTaskDetails.appendChild(wostDetailsHeader);
        workOrderServiceTaskDetails.appendChild(workOrderServiceTaskDetailsList);
        workOrderServiceTaskDetails.appendChild(workOrderHeader);
        workOrderServiceTaskDetails.appendChild(workOrderDetailsList);

    }
}

//Retrieves parent Work Order's Operations and parent Work Order's ActivityType's OperationTypes
async function retrieveWorkOrderOperationData(primaryControl) {
    //Get parent work order's id
    var workOrderAttribute = primaryControl.getAttribute('msdyn_workorder').getValue();
    var workOrderId = workOrderAttribute != null ? workOrderAttribute[0].id : "";
    //Array to be populated with opertations associated with parent work order before initializing the survey
    let operations = [];
    let activityTypeOperationTypeIds = [];

    var parentWorkOrderOperationFetchXml = [
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
    let operationPromise1 = Xrm.WebApi.retrieveMultipleRecords("msdyn_workorder", parentWorkOrderOperationFetchXml);


    var parentWorkOrderRelatedOperationFetchXml = [
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
    //Retrieve operations associated to the parent Work Order
    let operationPromise2 = Xrm.WebApi.retrieveMultipleRecords("ovs_operation", parentWorkOrderRelatedOperationFetchXml);

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
    //Retrieve operationTypes of parent Work Order's ActivityType
    let activityTypeOperationTypesPromise = Xrm.WebApi.retrieveMultipleRecords("ovs_operationtype", activityTypeOperationTypesFetchXML);

    await Promise.all([operationPromise1, operationPromise2, activityTypeOperationTypesPromise]).then((operationRetrievalPromises) => {
        //Add the work order operation operationid, name, operationTypeId, and regulated boolean to the operations array
        var workOrderOperation = operationRetrievalPromises[0].entities[0];
        let stakeholderName = workOrderOperation["account4.name"];
        let operationTypeName = (lang == 1036) ? workOrderOperation["ovs_operationtype2.ovs_operationtypenamefrench"] : workOrderOperation["ovs_operationtype2.ovs_operationtypenameenglish"];
        let siteName = (lang == 1036) ? workOrderOperation["msdyn_functionallocation3.ts_functionallocationnamefrench"] : workOrderOperation["msdyn_functionallocation3.ts_functionallocationnameenglish"];
        if (workOrderOperation["ovs_operation1.ovs_operationid"] != null && workOrderOperation["account4.name"] != null && workOrderOperation["ovs_operationtype2.ts_regulated"] != null) {
            operations.push({
                id: workOrderOperation["ovs_operation1.ovs_operationid"],
                name: stakeholderName + " | " + operationTypeName + " | " + siteName,
                operationTypeId: workOrderOperation["ovs_operation1.ovs_operationtypeid"],
                isRegulated: workOrderOperation["ovs_operationtype2.ts_regulated"]
            });
        }

        //Add the operationid, name, operationTypeId, and regulated boolean of the work order's N:N operations to the operations array
        operationRetrievalPromises[1].entities.forEach(function (operation) {
            let stakeholderName = operation["account2.name"];
            let operationTypeName = (lang == 1036) ? operation["ovs_operationtype3.ovs_operationtypenamefrench"] : operation["ovs_operationtype3.ovs_operationtypenameenglish"];
            let siteName = (lang == 1036) ? operation["msdyn_functionallocation4.ts_functionallocationnamefrench"] : operation["msdyn_functionallocation4.ts_functionallocationnameenglish"];
            if (operation.ovs_operationid != null && operation["account2.name"] != null && operation["ovs_operationtype3.ts_regulated"] != null) {
                operations.push({
                    id: operation["ovs_operationid"],
                    name: stakeholderName + " | " + operationTypeName + " | " + siteName,
                    operationTypeId: operation["ovs_operationtype3.ovs_operationtypeid"],
                    isRegulated: operation["ovs_operationtype3.ts_regulated"]
                });
            }
        });

        //collect each operationType Id
        operationRetrievalPromises[2].entities.forEach(function (operationType) {
            activityTypeOperationTypeIds.push(operationType["ovs_operationtypeid"]);
        });

    });

    //Return object containing retrieved operation data
    return {
        operations: operations,
        activityTypeOperationTypeIds: activityTypeOperationTypeIds
    };
}

function surveyHasErrors(primaryControl) {
    const formContext = primaryControl;
    // Get the web resource control on the form
    var wrCtrl = formContext.getControl('WebResource_QuestionnaireRender');
    wrCtrl.getContentWindow().then(function (win) {
        var hasError = false;
        for(var i = 0; i < win.survey.visiblePages.length; i ++) {
            //the first parameter, fireCallback, is set to true to show errors in UI
            hasError = win.survey.visiblePages[i].hasErrors(true) || hasError;
        }
        if (hasError) {
            var alertStrings = {
                text: markCompleteValidationTextLocalized,
                title: markCompleteValidationTitleLocalized
            };
            var alertOptions = { height: 200, width: 450 };
            Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
        } else {
            completeConfirmation(formContext, win.survey);
        }
    });
}

function completeConfirmation(formContext, survey) {
    var confirmStrings = {
        text: markCompleteConfirmationTextLocalized,
        title: markCompleteConfirmationTitleLocalized
    };
      
    var confirmOptions = { height: 200, width: 450 };
    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
      function (success) {
        if (success.confirmed) {
            formContext.getAttribute("msdyn_percentcomplete").setValue(100.00);
            //Set Status Reason to Complete
            formContext.getAttribute("statuscode").setValue(918640002);
            //Set Service Task End Date to current date
            formContext.getAttribute("ts_servicetaskenddate").setValue(new Date());
            formContext.data.save().then(
                function success(result) {
                    formContext.ui.close();
                });
        }
      });
}

function ActivateWorkOrderServiceTask(primaryControl) {
    const formContext = primaryControl;
    //formContext.getAttribute("ovs_inspectionstatus").setValue(true);
    formContext.getAttribute("statecode").setValue(0);
    formContext.getAttribute("statuscode").setValue(1);
}

function UnlockWorkOrderServiceTask(primaryControl) {
    const formContext = primaryControl;
    formContext.getAttribute("statuscode").setValue(1);
    formContext.data.save().then(
        function success(result) {
            formContext.ui.close();
        });
}

function hide() {
    return false;
}

var findingTypes = {
    "No Finding": 717750000,
    "Observation": 717750001,
    "Non-compliance": 717750002,
};

async function buildCustomQuestionnaire(primaryControl) {
    var provisionPromise = await retrieveProvisions(primaryControl);
    var provisions = provisionPromise.entities;
    if (provisions == null) return;
    var customSurveyDefinition = await generateCustomSurveyDefinition(provisions);

    var oldDefinition = JSON.parse(primaryControl.getAttribute("ovs_questionnairedefinition").getValue());
    var oldResponse = JSON.parse(primaryControl.getAttribute("ovs_questionnaireresponse").getValue());
    var newResponse = {};

    //If there's an old response, reuse values from identical provisions
    if (oldResponse != null) {
        //Iterate through provisions, check if a radiogroup question key exists for it in the old response
        for (provision of provisions) {
            let provisionName = provision.qm_name;
            //If the same radiogroup question existed in the old response, keep the old values
            if ((provisionName + "-radiogroup") in oldResponse) {
                let findingTypeValue = oldResponse[provisionName + "-radiogroup"];
                newResponse[provisionName + "-radiogroup"] = findingTypeValue;

                //Check if any finding questions in the custom survey definition can use old values
                for (oldQuestion of oldDefinition.pages[0].elements) {
                    //If a finding question used the same provision and has the same findingType
                    if (oldQuestion.type == "finding" && oldQuestion.provision == provisionName && oldQuestion.findingType == findingTypes[findingTypeValue]) {
                        //Retrieve the value in the old response
                        let oldFindingQuestionValue = oldResponse[oldQuestion.name];
                        //Determine the question name used in the new definition, make it use the same name as before then set its value in the new response
                        //The name for the finding widgets must remain the same and unique to maintain the connection with any finding records created
                        for (newQuestion of customSurveyDefinition.pages[0].elements) {
                            if (newQuestion.provision == provisionName && newQuestion.findingType == findingTypes[findingTypeValue]) {
                                newQuestion.name = oldQuestion.name;
                                newQuestion.nameID = oldQuestion.nameID;
                                newResponse[oldQuestion.name] = oldFindingQuestionValue;
                            }
                        }
                    }
                }
            }
        }
    }
    primaryControl.getAttribute("ovs_questionnairedefinition").setValue(JSON.stringify(customSurveyDefinition));
    primaryControl.getAttribute("ovs_questionnaireresponse").setValue(JSON.stringify(newResponse));
    toggleQuestionnaire(primaryControl);
}

var mode = '';
function toggleQuestionnaire(primaryControl) {

        // Get the web resource control on the form
    const wrCtrl = primaryControl.getControl('WebResource_QuestionnaireRender');
    const questionnaireDefinition = primaryControl.getAttribute('ovs_questionnairedefinition').getValue();
    const questionnaireResponse = primaryControl.getAttribute('ovs_questionnaireresponse').getValue();

    // Exit if no questionnaire exists
    if (questionnaireDefinition === null) {
        wrCtrl.setVisible(false);
    return;
    }

    // Get Questionnaire definition
    wrCtrl.setVisible(true);
    initiateSurvey(primaryControl, wrCtrl, questionnaireDefinition, questionnaireResponse, mode);
}

function initiateSurvey(primaryControl, wrCtrl, questionnaireDefinition, questionnaireResponse, mode) {
    wrCtrl.setVisible(true);
    wrCtrl.getContentWindow().then(async function (win) {
        const surveyLocale = ROM.WorkOrderServiceTask.getSurveyLocal();
        win.InitialFormContext(primaryControl);
        let operationData = await retrieveWorkOrderOperationData(primaryControl);
        win.isComplete = (primaryControl.getAttribute("msdyn_percentcomplete").getValue() == 100.00);
        win.operationList = operationData.operations;
        win.activityTypeOperationTypeIdsList = operationData.activityTypeOperationTypeIds;
        win.InitializeSurveyRender(questionnaireDefinition, questionnaireResponse, surveyLocale, mode)
    });
}

//Opens a tab to display the full provision text of each custom questionnaire provision
async function previewProvisionText(primaryControl) {
    var provisionPromise = await retrieveProvisions(primaryControl);
    var provisions = provisionPromise.entities;
    if (provisions == null) return;

    var lang = '1033';
    if (parent.Xrm != null) {
        lang = parent.Xrm.Utility.getGlobalContext().userSettings.languageId;
    }

    var provisionText = "";
    //Build provision text for each provision, concatenate together with line breaks between.
    for (var provision of provisions) {
        provisionText += (await buildProvisionText(provision, lang) + "<br><br>");
    }

    var provisionTextWindow = window.open("", "Preview Provision Text");
    provisionTextWindow.document.write("<head><title>Provision Text</title></head><body></body>");
    var provisionTextSpan = provisionTextWindow.document.createElement('span');
    provisionTextSpan.innerHTML = provisionText
    provisionTextWindow.document.body.appendChild(provisionTextSpan);
}

function InitialContext(executionContext) {
    window.parentExecutionContext = executionContext;
    window.parentFormContext = executionContext.getFormContext();
}

async function retrieveProvisions(primaryControl) {
    //Retrieve Provisions from WOST
    var workOrderServiceTaskId = primaryControl.data.entity.getId().replace("{", "").replace("}", "");
    var fetchXml = [
        "<fetch>",
        "  <entity name='qm_rclegislation'>",
        "    <all-attributes />",
        "    <link-entity name='ts_workorderservicetask_qm_rclegislation' from='qm_rclegislationid' to='qm_rclegislationid' intersect='true'>",
        "      <filter>",
        "        <condition attribute='msdyn_workorderservicetaskid' operator='eq' value='", workOrderServiceTaskId, "'/>",
        "      </filter>",
        "    </link-entity>",
        "  </entity>",
        "</fetch>",
    ].join("");
    fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);

    return Xrm.WebApi.retrieveMultipleRecords("qm_rclegislation", fetchXml);
}
//Generates a custom survey definition for the given provisions
async function generateCustomSurveyDefinition(provisions) {
    var survey = {
        pages: [
            {
                name: "page1",
                elements: []
            }
        ]
    };
    var questionArray = []
    for (var provision of provisions) {
        var provisionName = provision.qm_name;
        var provisionTextEn = await buildProvisionText(provision, "1033");
        var provisionTextFr = await buildProvisionText(provision, "1036");
        var radioQuestionName = provisionName + "-radiogroup";
        //Create radiogroup question
        var radioQuestion = {
            type: "radiogroup",
            name: radioQuestionName,
            title: provisionName,
            description: {
                default: provisionTextEn,
                fr: provisionTextFr
            },
            isRequired: true,
            choices: [
                {
                    value: "No Finding",
                    text: "No Finding"
                },
                {
                    value: "Observation",
                    text: "Observation"
                },
                {
                    value: "Non-compliance",
                    text: "Non-compliance"
                }
            ]
        };
        questionArray.push(radioQuestion);
        let uniqueNum = Date.now();
        //Create Observation Finding
        var observationFinding = {
            type: "finding",
            name: "finding-sq_" + uniqueNum,
            visibleIf: `{${radioQuestionName}} = 'Observation'`,
            title: provisionName,
            description: {
                default: provisionTextEn,
                fr: provisionTextFr
            },
            provision: provisionName,
            reference: provisionName,
            nameID: "sq_" + uniqueNum,
            findingType: 717750001,
            provisionData: {
                legislationid: provision.qm_rclegislationid,
                provisioncategoryid: provision._ts_provisioncategory_value
            },
        }
        questionArray.push(observationFinding);
        uniqueNum = Date.now() + 1;
        //Create Non-Compliance Finding
        var nonComplianceFinding = {
            type: "finding",
            name: "finding-sq_" + uniqueNum,
            visibleIf: `{${radioQuestionName}} = 'Non-compliance'`,
            title: provisionName,
            description: {
                default: provisionTextEn,
                fr: provisionTextFr
            },
            isRequired: true,
            provision: provisionName,
            reference: provisionName,
            nameID: "sq_" + uniqueNum,
            findingType: 717750002,
            provisionData: {
                legislationid: provision.qm_rclegislationid,
                provisioncategoryid: provision._ts_provisioncategory_value
            },
        }
        questionArray.push(nonComplianceFinding);
    };
    survey.pages[0].elements = questionArray;
    return survey;
}

function SendReport(primaryControl, SelectedControlSelectedItemReferences){
    //If WOTask has a result of "Pass"
    Xrm.WebApi.retrieveRecord("msdyn_workorderservicetask", SelectedControlSelectedItemReferences[0].Id, "?$select=msdyn_inspectiontaskresult").then(
        function success(result) {
           if(result.msdyn_inspectiontaskresult == 192350000){
            var operationId = primaryControl.getAttribute("ovs_operationid").getValue()[0].id; 
            let fetchXml = '<fetch version="1.0" mapping="logical"><entity name="contact"><attribute name="contactid" /><attribute name="fullname"/><filter type="and"><condition attribute="statecode" operator="eq" value="0"/></filter><link-entity name="ts_operationcontact" from="ts_contact" to="contactid"><link-entity name="ovs_operation" from="ovs_operationid" to="ts_operation"><filter><condition attribute="ovs_operationid" operator="eq" value="' + operationId +'"/></filter></link-entity></link-entity></entity></fetch>';

            //Retrieve contact that are associated with the operations in the WO
            Xrm.WebApi.retrieveMultipleRecords("contact", "?fetchXml=" + encodeURIComponent(fetchXml)).then(
                function success(result) {
                    //Create filter that will subsequently be used to filter the "to" field in the email form if there are moe than 1 contact
                    let contactFilter = "";
                    if(result.entities.length > 1){
                        result.entities.forEach(function (contact) {
                            contactFilter += '<condition attribute="contactid" operator="eq" value="' + contact.contactid + '"/>';
                        });
                    }

                    //Send custom parameters to fill the "to" and "regardingobjetid" lookup fields in the email form 
                    var pageInput = {
                        pageType: "entityrecord",
                        entityName: "email",
                        data: {
                            from: "",
                            contactid_0: result.entities[0].contactid,
                            contactname_0: result.entities[0].fullname,
                            contactfilter_0 : contactFilter,
                            operationid_0 : operationId, 
                            cc: "",
                            bcc: "",
                            subject: "Subject test",
                            description: "testblabla",
                            regardingobjectid_0: SelectedControlSelectedItemReferences[0].Id,
                            regardingobjectname_0: SelectedControlSelectedItemReferences[0].Name,
                        }
                    };
                    var navigationOptions = {
                        target: 2,
                        height: {
                            value: 100, unit: "%"
                        },
                        width: {
                            value: 80, unit: "%"
                        },
                        position: 1
                    };
                    //Open finding record
                    Xrm.Navigation.navigateTo(pageInput, navigationOptions).then(
                        function success() {
                            // Run code on success
                        },
                        function error() {
                            // Handle errors
                        }
                    );
                },
                function (error) {
                }
            );
           }
           else{
                var alertStrings = {
                    text: workOrderServiceTaskResultNotPassedText,
                    title: workOrderServiceTaskResultNotPassedTitle
                };
                var alertOptions = { height: 200, width: 450 };
                Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
           }
        },
        function (error) {
        }
    );
    return false;
}