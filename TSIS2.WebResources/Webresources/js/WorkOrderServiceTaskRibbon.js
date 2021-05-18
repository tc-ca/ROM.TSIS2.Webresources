var lang = parent.Xrm.Utility.getGlobalContext().userSettings.languageId;

var MarkCompleteValidationText;
var MarkCompleteValidationTitle;
var MarkCompleteConfirmationText;
var MarkCompleteConfirmationTitle;

if (lang == 1036) {
    MarkCompleteValidationText = "Toutes les questions requises du sondage doivent être répondues avant que le sondage puissent être marqué comme Terminé.";
    MarkCompleteValidationTitle = "Sondage Incomplet";
    MarkCompleteConfirmationText = "En cliquant sur OK, le statut du sondage passera à Terminé et les réponses seront enregistrées.";
    MarkCompleteConfirmationTitle = "Confirmation - Sondage complété";
} else {
    MarkCompleteValidationText = "All required questions in the survey must be answered before the survey can be Marked Complete.";
    MarkCompleteValidationTitle = "Survey Incomplete";
    MarkCompleteConfirmationText = "By clicking OK, the survey status will change to Complete and the survey answers will be saved.";
    MarkCompleteConfirmationTitle = "Confirmation - Survey Complete";
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

function printSurvey(primaryControl) {
    var printWindow = window.open('../WebResources/ts_/html/surveyRenderPrint.html', 'SurveyPrint');
    //Provide printWindow with data required to render survey before survey is initialized in surveyRenderPrintScript below
    printWindow.questionnaireDefinition = primaryControl.getAttribute('ovs_questionnairedefinition').getValue();
    printWindow.questionnaireResponse = primaryControl.getAttribute('ovs_questionnaireresponse').getValue();
    languageId = Xrm.Utility.getGlobalContext().userSettings.languageId;
    printWindow.locale = (languageId == 1036) ? 'fr' : 'en';
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

        var wostName = printWindow.document.createElement('h1');
        wostName.innerHTML = wostNameText;

        var wostHeader = printWindow.document.createElement('h2');
        wostHeader.innerHTML = "Work Order Service Task Details";

        var workOrderServiceTaskDetailsList = printWindow.document.createElement('ul');
        workOrderServiceTaskDetailsList.style.listStyleType = "none";
        workOrderServiceTaskDetailsList.innerHTML += '<li>' + taskTypeLabel + ': ' + taskTypeText + '</li>';
        workOrderServiceTaskDetailsList.innerHTML += '<li>' + statusLabel + ': ' + statusValue + '</li>';

        //Work Order Details
        var workOrderHeader = printWindow.document.createElement('h2');
        workOrderHeader.innerHTML = "Work Order Details";
        var workOrderQuickView = primaryControl.ui.quickForms.get('WorkOrderQuickView');

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
        workOrderDetailsList.innerHTML += '<li>' + regionLabel + ': ' + regionText + '</li>';
        workOrderDetailsList.innerHTML += '<li>' + countryLabel + ': ' + countryText + '</li>';
        workOrderDetailsList.innerHTML += '<li>' + operationTypeLabel + ': ' + operationTypeText + '</li>';
        workOrderDetailsList.innerHTML += '<li>' + stakeholderLabel + ': ' + stakeholderText + '</li>';
        workOrderDetailsList.innerHTML += '<li>' + siteLabel + ': ' + siteText + '</li>';

        var workOrderServiceTaskDetails = printWindow.document.getElementById('workOrderServiceTaskDetails');
        workOrderServiceTaskDetails.appendChild(wostName);
        workOrderServiceTaskDetails.appendChild(wostHeader);
        workOrderServiceTaskDetails.appendChild(workOrderServiceTaskDetailsList);
        workOrderServiceTaskDetails.appendChild(workOrderHeader);
        workOrderServiceTaskDetails.appendChild(workOrderDetailsList);

        //mywindow.document.close(); // necessary for IE >= 10
        //mywindow.focus(); // necessary for IE >= 10*/

        //mywindow.print();
        //mywindow.close();
    }
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
                text: MarkCompleteValidationText,
                title: MarkCompleteValidationTitle
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
        text: MarkCompleteConfirmationText,
        title: MarkCompleteConfirmationTitle
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


