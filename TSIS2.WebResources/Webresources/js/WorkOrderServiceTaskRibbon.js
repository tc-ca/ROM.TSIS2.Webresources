var lang = parent.Xrm.Utility.getGlobalContext().userSettings.languageId;

var markCompleteValidationTextLocalized;
var markCompleteValidationTitleLocalized;
var markCompleteConfirmationTextLocalized;
var markCompleteConfirmationTitleLocalized;

if (lang == 1036) {
    markCompleteValidationTextLocalized = "Toutes les questions requises du sondage doivent être répondues avant que le sondage puissent être marqué comme Terminé.";
    markCompleteValidationTitleLocalized = "Sondage Incomplet";
    markCompleteConfirmationTextLocalized = "En cliquant sur OK, le statut du sondage passera à Terminé et les réponses seront enregistrées.";
    markCompleteConfirmationTitleLocalized = "Confirmation - Sondage complété";
    workOrderServiceTaskDetailsLocalized = "Détails de la tâche du service d'ordre de travail";
    workOrderServiceTaskLocalized = "Tâche de service de l'ordre de travail";
    workOrderDetailsLocalized = "Détails de l'ordre de travail";
    
} else {
    markCompleteValidationTextLocalized = "All required questions in the survey must be answered before the survey can be Marked Complete.";
    markCompleteValidationTitleLocalized = "Survey Incomplete";
    markCompleteConfirmationTextLocalized = "By clicking OK, the survey status will change to Complete and the survey answers will be saved.";
    markCompleteConfirmationTitleLocalized = "Confirmation - Survey Complete";
    workOrderServiceTaskDetailsLocalized = "Work Order Service Task Details";
    workOrderServiceTaskLocalized = "Work Order Service Task";
    workOrderDetailsLocalized = "Work Order Details";
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
    let operationList = await retrieveWorkOrderOperations(primaryControl);
    var printWindow = window.open('../WebResources/ts_/html/surveyRenderPrint.html', 'SurveyPrint');
    //Provide printWindow with data required to render survey before survey is initialized in surveyRenderPrintScript below
    printWindow.questionnaireDefinition = primaryControl.getAttribute('ovs_questionnairedefinition').getValue();
    printWindow.questionnaireResponse = primaryControl.getAttribute('ovs_questionnaireresponse').getValue();
    languageId = Xrm.Utility.getGlobalContext().userSettings.languageId;
    printWindow.locale = (languageId == 1036) ? 'fr' : 'en';
    printWindow.operationList = operationList;
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

async function retrieveWorkOrderOperations(primaryControl) {
    //Get parent work order's id
    var workOrderAttribute = primaryControl.getAttribute('msdyn_workorder').getValue();
    var workOrderId = workOrderAttribute != null ? workOrderAttribute[0].id : "";
    //Array to be populated with opertations associated with parent work order before initializing the survey
    let operations = [];

    //Retrieve the operation (customer asset) in the ovs_asset field of the parent work order
    let operationPromise1 = Xrm.WebApi.online.retrieveRecord("msdyn_workorder", workOrderId, "?$select=ovs_asset&$expand=ovs_asset($select=msdyn_name,msdyn_customerassetid)");

    var fetchXml = [
        "<fetch top='50'>",
        "  <entity name='msdyn_customerasset'>",
        "    <attribute name='msdyn_name' />",
        "    <attribute name='msdyn_customerassetid' />",
        "    <link-entity name='ts_msdyn_customerasset_msdyn_workorder' from='msdyn_customerassetid' to='msdyn_customerassetid' intersect='true'>",
        "      <filter>",
        "        <condition attribute='msdyn_workorderid' operator='eq' value='", workOrderId, "'/>",
        "      </filter>",
        "    </link-entity>",
        "  </entity>",
        "</fetch>",
    ].join("");
    fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
    //Retrieve operations (customer assets) associated to the parent Work Order
    let operationPromise2 = Xrm.WebApi.retrieveMultipleRecords("msdyn_customerasset", fetchXml);

    await Promise.all([operationPromise1, operationPromise2]).then((operationRetrievalPromises) => {
        //Add the work order operation field's id and name to the operations array
        operations.push({
            id: operationRetrievalPromises[0].ovs_asset.msdyn_customerassetid,
            name: operationRetrievalPromises[0].ovs_asset.msdyn_name
        });
        //Add the id and name of the work order's N:N operations to the operations array
        operationRetrievalPromises[1].entities.forEach(function (operation) {
            operations.push({
                id: operation.msdyn_customerassetid,
                name: operation.msdyn_name
            });
        });
    });

    return operations;
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

function hide() {
    return false;
}


