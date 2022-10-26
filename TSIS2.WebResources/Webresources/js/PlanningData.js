"use strict";
var ROM;
(function (ROM) {
    var PlanningData;
    (function (PlanningData) {
        function onLoad(eContext) {
            var formContext = eContext.getFormContext();
            if (formContext.ui.getFormType() == 2) { //Update type. The form has already been saved for the first time
                formContext.getControl("ts_fiscalyear").setDisabled(true);
                formContext.getControl("ts_name").setDisabled(true);
                formContext.getControl("ts_operationactivity").setDisabled(true);
                formContext.getControl("ts_teamplanningdata").setDisabled(true);
                formContext.getControl("ts_target").setDisabled(true);
            }
        }
        PlanningData.onLoad = onLoad;
    })(PlanningData = ROM.PlanningData || (ROM.PlanningData = {}));
})(ROM || (ROM = {}));
