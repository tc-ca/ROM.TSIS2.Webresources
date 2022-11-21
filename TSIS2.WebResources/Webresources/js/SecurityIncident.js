"use strict";
var ROM;
(function (ROM) {
    var SecurityIncident;
    (function (SecurityIncident) {
        function onLoad(eContext) {
            var formContext = eContext.getFormContext();
            if (formContext.ui.getFormType() == 2) {
                StatusOfRailwayOwnerOnChange(eContext);
            }
        }
        SecurityIncident.onLoad = onLoad;
        function StatusOfRailwayOwnerOnChange(eContext) {
            var formContext = eContext.getFormContext();
            var statusOfRailwayOwner = formContext.getAttribute("ts_statusofrailwayowner").getValue();
            if (statusOfRailwayOwner == null || (statusOfRailwayOwner != null && statusOfRailwayOwner == 717750000 /* Known */))
                formContext.getControl("ts_owneroftherailwaylinetrack").setVisible(true);
            else
                formContext.getControl("ts_owneroftherailwaylinetrack").setVisible(false);
        }
        SecurityIncident.StatusOfRailwayOwnerOnChange = StatusOfRailwayOwnerOnChange;
    })(SecurityIncident = ROM.SecurityIncident || (ROM.SecurityIncident = {}));
})(ROM || (ROM = {}));
