var lang = parent.Xrm.Utility.getGlobalContext().userSettings.languageId;

var markCompleteValidationTextLocalized;
var markCompleteValidationTitleLocalized;
var markCompleteConfirmationTextLocalized;
var markCompleteConfirmationTitleLocalized;

if (lang == 1036) {
    markCompleteValidationTextLocalized = "Toutes les champs obligatoires de la constatation doivent être complétés avant que la constatation puissent être marqué comme terminé.";
    markCompleteValidationTitleLocalized = "Formulaire Incomplet";

} else {
    markCompleteValidationTextLocalized = "All required fields in the Finding must be answered before the Finding can be Marked Complete.";
    markCompleteValidationTitleLocalized = "Form Incomplete";
}
//Action for mscrm.OpenRecordItem overridden command. Opens Finding forms as a modal.
function openRecord(recordId) {
    let formId = "d8af1d58-3786-4ab4-9a35-3a1b85946c12"; //Information Main form
    //Retrieve selected finding record
    Xrm.WebApi.retrieveRecord("ovs_finding", recordId).then(
        function (result) {
            var pageInput = {
                pageType: "entityrecord",
                entityName: "ovs_finding",
                entityId: recordId
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
            //If anything goes wrong log the error
            console.log(error);

            //and open "by default" form
            Xrm.Navigation.openForm({
                entityName: "ovs_finding",
                entityId: recordId,
                formId: formId
            });
        });
}

function markComplete(primaryControl) {
    var finalEnforcementAction = primaryControl.getAttribute("ts_finalenforcementaction").getValue();
    var issueaddressedonsite = primaryControl.getAttribute("ts_issueaddressedonsite").getValue();    
    if (finalEnforcementAction != null && issueaddressedonsite != null) {
        primaryControl.getAttribute("statuscode").setValue(717750002); //Complete
        primaryControl.data.save().then(
            function success(result) {
                primaryControl.ui.close();
            });
    }
    else {
        var alertStrings = {
            text: markCompleteValidationTextLocalized,
            title: markCompleteValidationTitleLocalized
        };
        var alertOptions = { height: 200, width: 450 };
        Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
    }
}