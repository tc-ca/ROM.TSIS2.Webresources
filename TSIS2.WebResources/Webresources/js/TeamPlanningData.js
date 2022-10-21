"use strict";
var ROM;
(function (ROM) {
    var TeamPlanningData;
    (function (TeamPlanningData) {
        function onLoad(eContext) {
            var formContext = eContext.getFormContext();
            if (formContext.ui.getFormType() == 2) { //Update type. The form has already been saved for the first time
                formContext.getControl("ts_team").setDisabled(true);
                formContext.getControl("ts_fiscalyear").setDisabled(true);
            }
        }
        TeamPlanningData.onLoad = onLoad;
    })(TeamPlanningData = ROM.TeamPlanningData || (ROM.TeamPlanningData = {}));
})(ROM || (ROM = {}));
