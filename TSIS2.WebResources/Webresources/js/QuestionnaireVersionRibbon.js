
function createResponse(primaryControl) {
    const questionnairedefinition = primaryControl.getAttribute("ts_questionnairedefinition").getValue();
    var data =
    {
        "ts_questionnairedefinition": questionnairedefinition
    }
    // create account record
    Xrm.WebApi.createRecord("ts_questionnaireresponse", data).then(
        function success(result) {
            var pageInput = {
                pageType: "entityrecord",
                entityName: "ts_questionnaireresponse",
                entityId: result.id
            };
            //Open finding record
            Xrm.Navigation.navigateTo(pageInput).then(
                function success() {
                    // Run code on success
                },
                function error() {
                    // Handle errors
                }
            );
        },
        function (error) {
            console.log(error.message);
            // handle error conditions
        }
    );
}

function createResponseSelected(FirstSelectedItemId) {
    Xrm.WebApi.retrieveRecord("ts_questionnaireversion", FirstSelectedItemId, "?$select=ts_questionnairedefinition").then(
        function success(result) {
            if (result.ts_questionnairedefinition == null) return;

            var data =
            {
                "ts_questionnairedefinition": result.ts_questionnairedefinition
            }
            // create account record
            Xrm.WebApi.createRecord("ts_questionnaireresponse", data).then(
                function success(result) {
                    var pageInput = {
                        pageType: "entityrecord",
                        entityName: "ts_questionnaireresponse",
                        entityId: result.id
                    };
                    //Open finding record
                    Xrm.Navigation.navigateTo(pageInput).then(
                        function success() {
                            // Run code on success
                        },
                        function error() {
                            // Handle errors
                        }
                    );
                },
                function (error) {
                    console.log(error.message);
                    // handle error conditions
                }
            );
        }
    );
}