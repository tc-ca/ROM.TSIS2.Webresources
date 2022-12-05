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
                formContext.getControl("ts_teamplanningdata").setDisabled(true);
                if (formContext.getAttribute("ts_dueq1").getValue != null) {
                    formContext.getControl("ts_dueq1").setDisabled(true);
                }
                if (formContext.getAttribute("ts_dueq2").getValue != null) {
                    formContext.getControl("ts_dueq2").setDisabled(true);
                }
                if (formContext.getAttribute("ts_dueq3").getValue != null) {
                    formContext.getControl("ts_dueq3").setDisabled(true);
                }
                if (formContext.getAttribute("ts_dueq4").getValue != null) {
                    formContext.getControl("ts_dueq4").setDisabled(true);
                }
                if (formContext.getAttribute("ts_operationactivity").getValue() != null) {
                    formContext.getControl("ts_operationactivity").setDisabled(true);
                }
                if (formContext.getAttribute("ts_target").getValue() != null) {
                    formContext.getControl("ts_target").setDisabled(true);
                }
            }
            if (formContext.getAttribute("ts_generationlog").getValue() == null) {
                formContext.getControl("ts_generationlog").setVisible(false);
            }
        }
        PlanningData.onLoad = onLoad;
        function onSave(eContext) {
            var formContext = eContext.getFormContext();
        }
        PlanningData.onSave = onSave;
        function plannedOnChange(eContext) {
            setNullQuarterValueToZero(eContext);
        }
        PlanningData.plannedOnChange = plannedOnChange;
        function estimatedDurationOnChange(eContext) {
            var formContext = eContext.getFormContext();
            var newEstimatedDuration = formContext.getAttribute("ts_teamestimatedduration").getValue();
            Xrm.WebApi.retrieveRecord("ts_planningdata", formContext.data.entity.getId(), "?$select=ts_originalteamestimatedduration").then(function (result) {
                if (result.ts_originalteamestimatedduration != null && result.ts_originalteamestimatedduration != newEstimatedDuration) {
                    formContext.getAttribute("ts_details").setRequiredLevel("required");
                }
                else if (formContext.getAttribute("ts_varianceuncalculated").getValue() == 0) {
                    formContext.getAttribute("ts_details").setRequiredLevel("none");
                }
            });
        }
        PlanningData.estimatedDurationOnChange = estimatedDurationOnChange;
        function recalculateVarianceAndPlannedWO(eContext) {
            var formContext = eContext.getFormContext();
            var target = formContext.getAttribute("ts_target").getValue();
            var plannedQ1 = formContext.getAttribute("ts_plannedq1").getValue();
            var plannedQ2 = formContext.getAttribute("ts_plannedq2").getValue();
            var plannedQ3 = formContext.getAttribute("ts_plannedq3").getValue();
            var plannedQ4 = formContext.getAttribute("ts_plannedq4").getValue();
            if (target != null && plannedQ1 != null && plannedQ2 != null && plannedQ3 != null && plannedQ4 != null) {
                var plannedWO = plannedQ1 + plannedQ2 + plannedQ3 + plannedQ4;
                var variance = plannedWO - target;
                formContext.getAttribute("ts_plannedwouncalculated").setValue(plannedWO);
                formContext.getAttribute("ts_varianceuncalculated").setValue(variance);
                if (variance != 0) {
                    formContext.getAttribute("ts_details").setRequiredLevel("required");
                }
                else {
                    formContext.getAttribute("ts_details").setRequiredLevel("none");
                }
            }
        }
        function setNullQuarterValueToZero(eContext) {
            var nameAttr = eContext.getEventSource();
            if (nameAttr.getName() == "ts_plannedq1" || nameAttr.getName() == "ts_plannedq2" || nameAttr.getName() == "ts_plannedq3" || nameAttr.getName() == "ts_plannedq4") {
                if (nameAttr.getValue() == null) {
                    nameAttr.setValue(0);
                }
            }
        }
    })(PlanningData = ROM.PlanningData || (ROM.PlanningData = {}));
})(ROM || (ROM = {}));
