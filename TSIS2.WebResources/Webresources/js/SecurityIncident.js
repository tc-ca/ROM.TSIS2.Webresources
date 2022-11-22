"use strict";
var ROM;
(function (ROM) {
    var SecurityIncident;
    (function (SecurityIncident) {
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            if (form.getAttribute("ts_delaystooperation").getValue() == 717750000 /* Known */) {
                form.getControl("ts_delaystooperationtime").setVisible(true);
            }
            if (form.getAttribute("ts_arrests").getValue() == 717750000 /* Known */) {
                form.getControl("ts_arrestscount").setVisible(true);
                form.getControl("ts_arrestsdetails").setVisible(true);
            }
        }
        SecurityIncident.onLoad = onLoad;
    })(SecurityIncident = ROM.SecurityIncident || (ROM.SecurityIncident = {}));
})(ROM || (ROM = {}));
