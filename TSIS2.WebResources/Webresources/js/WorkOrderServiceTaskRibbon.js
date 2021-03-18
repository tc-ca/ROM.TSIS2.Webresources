function isROMInspector() {
    var roles = Xrm.Utility.getGlobalContext().userSettings.roles;
    var enable = false;
    roles.forEach(function (item) {
  
        if (item.name == "ROM - Inspector") enable = true;
  
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
                text: Xrm.Utility.getResourceString("ovs_/resx/WorkOrderServiceTaskRibbon", "MarkCompleteValidationText"),
                title: Xrm.Utility.getResourceString("ovs_/resx/WorkOrderServiceTaskRibbon", "MarkCompleteValidationTitle"),
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
        text: parent.Xrm.Utility.getResourceString("ovs_/resx/WorkOrderServiceTaskRibbon", "MarkCompleteConfirmationText"),
        title: parent.Xrm.Utility.getResourceString("ovs_/resx/WorkOrderServiceTaskRibbon", "MarkCompleteConfirmationTitle"),
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
    formContext.getAttribute("ovs_inspectionstatus").setValue(true);
    formContext.getAttribute("statecode").setValue(0);
    formContext.getAttribute("statuscode").setValue(1);
}

function hide() {
    return false;
}


