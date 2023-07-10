
function OpenFileUploadPage(PrimaryControl, PrimaryTypeEntityName, PrimaryControlId) {
    const lang = Xrm.Utility.getGlobalContext().userSettings.languageId;

    let recordTag = "";

    //Logic for getting tags when attaching files to Work Orders
    if (PrimaryTypeEntityName == "msdyn_workorder") {
        recordTag = PrimaryControl.getAttribute("msdyn_name").getValue();
    }

    // Centered Dialog
    var pageInput = {
        pageType: "custom",
        name: "ts_fileupload_2bf02", //Unique name of Custom page
        recordId: recordTags, //Using the recordId param as a way to pass data to the custom page
    };
    var navigationOptions = {
        target: 2,
        position: 1,
        width: { value: 1000, unit: "px" },
        height: { value: 550, unit: "px" },
        title: (lang == 1036) ? "Attach File (FR)" : "Attach File"
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