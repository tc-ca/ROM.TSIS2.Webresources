var lang = parent.Xrm.Utility.getGlobalContext().userSettings.languageId;

var missingActivityTypeTitleLocalized;
var missingActivityTypeTextLocalized;

if (lang == 1036) {
    missingActivityTypeTextLocalized = "Veuillez sélectionner un type d'activité.";
    missingActivityTypeTitleLocalized = "Sélection d'un type d'activité requise.";
}
else {
    missingActivityTypeTextLocalized = "Please select Activity Type.";
    missingActivityTypeTitleLocalized = "Activity Type Selection Required.";
}

function appendToWOST(formContext) {
    const questionnaireResponseGuid = formContext.data.entity.getId().replace(/({|})/g, '').toLowerCase();
    const userId = Xrm.Utility.getGlobalContext().userSettings.userId.replace(/({|})/g, '').toLowerCase();
    const activityTypeValue = formContext.getAttribute("ts_activitytype").getValue();
    var activityTypeId;
    if (activityTypeValue != null) {
        activityTypeId = activityTypeValue[0].id.replace(/({|})/g, '').toLowerCase()

        var jsonData = {
            recordId: questionnaireResponseGuid,
            userId: userId,
            isAdminOrManager: isAdminOrManager(),
            activityTypeId: activityTypeId
        };
        var jsonString = JSON.stringify(jsonData).toString();
        // Centered Dialog
        var pageInput = {
            pageType: "custom",
            name: "ts_appendquestionnaireresponsetoservicetask_6789e", //Unique name of Custom page
            recordId: jsonString

        };
        var navigationOptions = {
            target: 2,
            position: 1,
            width: { value: 450, unit: "px" },
            height: { value: 550, unit: "px" },
            title: (lang == 1036) ? "Ajouter à la tâche de service" : "Append Questionnaire to Work Order Service Task"
        };
        //Open Custom Page to select WO
        Xrm.Navigation.navigateTo(pageInput, navigationOptions);
    }
    //show pop-up message
    else {
        showAlertDialog(missingActivityTypeTextLocalized, missingActivityTypeTitleLocalized);
    }

    //var selectedActivityType = formContext.getAttribute("ts_activitytype").getValue()

    //if (selectedActivityType == null) {
    //    Xrm.Navigation.navigateTo(pageInput, navigationOptions)
    //        .then(
    //            function () {
    //                // Called when the dialog closes
    //                // formContext.data.refresh();

    //            }
    //        ).catch(
    //            function (error) {
    //                // Handle error
    //            }
    //        );
    //}
    //else {

    //}
}

function isAdminOrManager() {
    const userRoles = Xrm.Utility.getGlobalContext().userSettings.roles;
    //If the user is a system admin or ROM - Manager, show the RATE manager review section
    let isAdminOrManager = false;
    userRoles.forEach(role => {
        if (role.name == "System Administrator" || role.name == "ROM - Manager") {
            isAdminOrManager = true;
        }
    });
    return isAdminOrManager;
}

function showAlertDialog(text, title) {
    var alertStrings = { confirmButtonLabel: "OK", text: text, title: title };
    var alertOptions = { height: 200, width: 300 };
    Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
}