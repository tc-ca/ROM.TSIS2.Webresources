﻿"use strict";
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
                var planningDataId = formContext.data.entity.getId();
                var teamPlanningDataFetchXML = [
                    "<fetch>",
                    "<entity name='ts_teamplanningdata'>",
                    "<link-entity name = 'ts_planningdata' from = 'ts_teamplanningdata' to = 'ts_teamplanningdataid' link-type='inner' alias = 'ag'>",
                    "<filter type='and'>",
                    "<condition attribute='ts_planningdataid' operator = 'eq' value='", planningDataId, "'/>",
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
        function disableFormFields(eContext) {
            var form = eContext.getFormContext();
            form.ui.controls.forEach(function (control, index) {
                var controlType = control.getControlType();
                if (controlType != "iframe" && controlType != "webresource" && controlType != "subgrid") {
                    control.setDisabled(true);
                }
            });
        }
    })(PlanningData = ROM.PlanningData || (ROM.PlanningData = {}));
})(ROM || (ROM = {}));
