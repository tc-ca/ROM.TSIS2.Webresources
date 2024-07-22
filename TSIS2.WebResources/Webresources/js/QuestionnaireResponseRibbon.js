var lang = parent.Xrm.Utility.getGlobalContext().userSettings.languageId;

function appendToWOST(formContext) {
    const questionnaireResponseGuid = formContext.data.entity.getId().replace(/({|})/g, '').toLowerCase();
    const userId = Xrm.Utility.getGlobalContext().userSettings.userId.replace(/({|})/g, '').toLowerCase();
    var jsonData = {
        recordId: questionnaireResponseGuid,
        userId: userId,
        isAdminOrManager: isAdminOrManager()
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
    Xrm.Navigation.navigateTo(pageInput, navigationOptions)
        .then(
        //function () {
        //    // Called when the dialog closes
        //    formContext.data.refresh();
        //}
    ).catch(
        function (error) {
            // Handle error
        }
    );
}

function isAdminOrManager(){
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