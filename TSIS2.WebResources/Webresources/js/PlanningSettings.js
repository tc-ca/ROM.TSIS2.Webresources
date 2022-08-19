"use strict";
var ROM;
(function (ROM) {
    var PlanningSettings;
    (function (PlanningSettings) {
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            if (form.ui.getFormType() == 2) {
                taskOnChange(eContext);
            }
        }
        PlanningSettings.onLoad = onLoad;
        function taskOnChange(eContext) {
            var form = eContext.getFormContext();
            var taskCode = form.getAttribute("ts_task").getValue();
            if (taskCode == 717750000) {
                form.getAttribute("ts_stakeholder").setRequiredLevel("required");
                form.getAttribute("ts_totalcount").setRequiredLevel("required");
            }
            else {
                form.getAttribute("ts_stakeholder").setRequiredLevel("none");
                form.getAttribute("ts_totalcount").setRequiredLevel("none");
            }
        }
        PlanningSettings.taskOnChange = taskOnChange;
    })(PlanningSettings = ROM.PlanningSettings || (ROM.PlanningSettings = {}));
})(ROM || (ROM = {}));
