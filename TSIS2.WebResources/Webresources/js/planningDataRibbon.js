const lang = parent.Xrm.Utility.getGlobalContext().userSettings.languageId;
let confirmTitle = "Set to Non-Operational"
let confirmText = "The Operation Activities related to the selected records will become Non-Operational. Do you wish to proceed?"

if (lang == 1036) {
    confirmTitle = "Passer à non opérationnel"
    confirmText = "Les activités opérationnelles liées aux enregistrements sélectionnés deviendront non opérationnelles. Voulez-vous continuer?"
}

function setSelectedNonOperational(planningDataGuids, primaryControl) {
    var confirmStrings = { text: "The Operation Activities related to the selected records will become Non-Operational. Do you wish to proceed?", title: "Set to Non-Operational", confirmButtonLabel: "Yes", cancelButtonLabel: "Cancel" };
    var confirmOptions = { height: 200, width: 450 };
    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
        async function (success) {
            if (success.confirmed) {
                Xrm.Utility.showProgressIndicator();
                let gridControl = primaryControl.getControl("subgrid_planning_data");
                for (let planningDataGuid of planningDataGuids) {
                    await Xrm.WebApi.retrieveRecord("ts_planningdata", planningDataGuid, "?$select=_ts_operationactivity_value").then(async function (result) {
                        var data =
                        {
                            "ts_operationalstatus": 717750001,
                        }
                        await Xrm.WebApi.updateRecord("ts_operationactivity", result._ts_operationactivity_value, data);
                    });
                }
                setTimeout(gridControl.refresh(), 1000);
                Xrm.Utility.closeProgressIndicator();
            }
        }
);
}

function openOperationActivityFormInModal(selectedControlSelectedItemIds) {
    // Ensure a single Planning Data record is selected
    if (!selectedControlSelectedItemIds || selectedControlSelectedItemIds.length !== 1) {
        console.error("Please select a single Planning Data record.");
        return;
    }

    // The array contains the Planning Data record's ID
    var planningDataId = selectedControlSelectedItemIds[0];
    planningDataId = planningDataId.replace("{", "").replace("}", "");
    console.log("Planning Data Record ID: " + planningDataId);

    // Retrieve the Planning Data record to get the Operation Activity lookup value.
    Xrm.WebApi.retrieveRecord("ts_planningdata", planningDataId, "?$select=_ts_operationactivity_value").then(
        function (result) {
            var operationActivityId = result["_ts_operationactivity_value"];
            if (!operationActivityId) {
                console.error("The selected Planning Data record does not have an associated Operation Activity.");
                return;
            }
            operationActivityId = operationActivityId.replace("{", "").replace("}", "");
            console.log("Operation Activity Record ID: " + operationActivityId);

            // Define the page input to open the desired Operation Activity form
            var pageInput = {
                pageType: "entityrecord",
                entityName: "ts_operationactivity",
                entityId: operationActivityId,
                formId: "dd3c2b2c-fef9-ef11-bae1-002248b2e1ca"  // Second Main Form 'Related Work Orders'
            };

            // Define options for opening the form in a modal dialog
            var navigationOptions = {
                target: 2,
                position: 1,
                width: { value: 70, unit: "%" },
                height: { value: 80, unit: "%" }
            };

            // Open the Operation Activity form in a modal dialog
            Xrm.Navigation.navigateTo(pageInput, navigationOptions).then(
                function () {
                    console.log("Operation Activity form opened successfully in a modal dialog.");
                },
                function (error) {
                    console.error("Error opening Operation Activity form: " + error.message);
                }
            );
        },
        function (error) {
            console.error("Error retrieving Planning Data record: " + error.message);
        }
    );
}