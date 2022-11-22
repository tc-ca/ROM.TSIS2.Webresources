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