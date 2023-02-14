"use strict";
var ROM;
(function (ROM) {
    var TeamPlanningInspectorHours;
    (function (TeamPlanningInspectorHours) {
        function onLoad(eContext) {
            var formContext = eContext.getFormContext();
            if (formContext.ui.getFormType() == 2) { //Update type. The form has already been saved for the first time
                var teamPlanningDataInspectorHoursId = formContext.data.entity.getId();
                var teamPlanningDataFetchXML = [
                    "<fetch>",
                    "<entity name='ts_teamplanningdata'>",
                    "<link-entity name = 'ts_teamplanninginspectorhours' from = 'ts_teamplanningdata' to = 'ts_teamplanningdataid' link-type='inner' alias = 'ag'>",
                    "<filter type='and'>",
                    "<condition attribute='ts_teamplanninginspectorhoursid' operator = 'eq' value='", teamPlanningDataInspectorHoursId, "'/>",
                    "</filter>",
                    "</link-entity>",
                    "</entity>",
                    "</fetch>"
                ].join("");
                teamPlanningDataFetchXML = "?fetchXml=" + encodeURIComponent(teamPlanningDataFetchXML);
                Xrm.WebApi.retrieveMultipleRecords("ts_teamplanningdata", teamPlanningDataFetchXML).then(function (result) {
                    if (result.entities[0].ts_planstatus == 741130001) {
                        disableFormFields(eContext);
                    }
                    ;
                });
            }
        }
        TeamPlanningInspectorHours.onLoad = onLoad;
        function disableFormFields(eContext) {
            var form = eContext.getFormContext();
            form.ui.controls.forEach(function (control, index) {
                var controlType = control.getControlType();
                if (controlType != "iframe" && controlType != "webresource" && controlType != "subgrid") {
                    control.setDisabled(true);
                }
            });
        }
    })(TeamPlanningInspectorHours = ROM.TeamPlanningInspectorHours || (ROM.TeamPlanningInspectorHours = {}));
})(ROM || (ROM = {}));
