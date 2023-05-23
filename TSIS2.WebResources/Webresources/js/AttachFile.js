
function OpenFileUploadPage(PrimaryControlId) {
    const lang = Xrm.Utility.getGlobalContext().userSettings.languageId;
    // Centered Dialog
    var pageInput = {
        pageType: "custom",
        name: "ts_fileupload_2bf02", //Unique name of Custom page
        recordId: PrimaryControlId,
    };
    var navigationOptions = {
        target: 2,
        position: 1,
        width: { value: 450, unit: "px" },
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