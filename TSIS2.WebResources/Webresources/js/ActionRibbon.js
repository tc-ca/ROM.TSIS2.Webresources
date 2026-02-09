//Action for mscrm.OpenRecordItem overridden command. Opens Action forms as a modal.
function openRecord(recordId) {
    let formId = "8b389e0e-5f8c-44fe-afa8-d814de41eede"; //Information Main form
    //Retrieve selected Action record
    Xrm.WebApi.retrieveRecord("ts_action", recordId).then(
        function (result) {
            var pageInput = {
                pageType: "entityrecord",
                entityName: "ts_action",
                entityId: recordId,
            };
            var navigationOptions = {
                target: 2,
                height: {
                    value: 100,
                    unit: "%",
                },
                width: {
                    value: 80,
                    unit: "%",
                },
                position: 1,
            };
            //Open Action record
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
                entityName: "ts_action",
                entityId: recordId,
                formId: formId,
            });
        }
    );
}