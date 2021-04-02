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
}
else {
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


