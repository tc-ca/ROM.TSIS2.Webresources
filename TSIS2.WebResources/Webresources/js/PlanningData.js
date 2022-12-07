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
        function plannedOnChange(eContext) {
            setNullQuarterValueToZero(eContext);
        }
        PlanningData.plannedOnChange = plannedOnChange;
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
