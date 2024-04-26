var lang = parent.Xrm.Utility.getGlobalContext().userSettings.languageId;

function appendToWOST(formContext) {
    const questionnaireResponseGuid = formContext.data.entity.getId().replace(/({|})/g, '').toLowerCase();
    // Centered Dialog
    var pageInput = {
        pageType: "custom",
        name: "ts_appendquestionnaireresponsetoservicetask_6789e", //Unique name of Custom page
        recordId: questionnaireResponseGuid
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