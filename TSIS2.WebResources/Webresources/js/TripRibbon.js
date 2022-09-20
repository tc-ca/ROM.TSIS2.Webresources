var lang = parent.Xrm.Utility.getGlobalContext().userSettings.languageId;

var tripCommitMessageText = "The Work Orders related to the selected Trip(s) have been set to a Committed State";
var tripCommitMessageTitle = "Work Orders Committed";

if (lang == 1036) {
    tripCommitMessageText = "Les ordres de travail relié au(x) voyage(s) sélectionné(s) ont été changé à l’état validé";
    tripOrderCommitMessageTitle = "Ordres de travail validés";
}

function planningTrip(data) {
    Xrm.Navigation.navigateTo({
        pageType: "bulkedit",
        entityName: "ts_trip",
        entityIds: data,
        formId:"2D4F5852-3B4C-47BF-AD64-DF22048C5C9A"
    }, {
        target: 2,
        width: {
            value: 50,
            unit: "%"
        },
        height: {
            value: 60,
            unit: "%"
        }
    });
}

function commitRelatedWorkOrdersOfSelectedTrips(selectedTripsGuids, selectedControl) {
    for (let tripGuid of selectedTripsGuids) {
        var fetchXml = [
            "<fetch>",
            "  <entity name='ts_tripinspection'>",
            "    <attribute name='ts_inspection' />",
            "    <filter>",
            "      <condition attribute='ts_trip' operator='eq' value='", tripGuid, "'/>",
            "    </filter>",
            "  </entity>",
            "</fetch>",
        ].join("");
        fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
        Xrm.WebApi.retrieveMultipleRecords("ts_tripinspection", fetchXml).then(
            function success(result) {
                for (var i = 0; i < result.entities.length; i++) {
                    const workOrderGuid = result.entities[i]._ts_inspection_value;
                    Xrm.WebApi.updateRecord("msdyn_workorder", workOrderGuid, { "ts_state": 717750001 });
                }
            }
        );
    }
    var alertStrings = { confirmButtonLabel: "OK", text: tripCommitMessageText, title: tripCommitMessageTitle };
    var alertOptions = { height: 200, width: 200 };
    Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(
        function success(result) {
            selectedControl.refresh();
        }
    );
}
