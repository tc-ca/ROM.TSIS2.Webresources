
//Action for mscrm.OpenRecordItem overridden command. Opens Findings forms as a modal.
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