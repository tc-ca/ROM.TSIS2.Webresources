"use strict";
var ROM;
(function (ROM) {
    var Team;
    (function (Team) {
        function onLoad(eContext) {
            //Show the Planning Tab only when in the Oversight Planning Module
            var globalContext = Xrm.Utility.getGlobalContext();
            globalContext.getCurrentAppName().then(function (appName) {
                if (appName == "Oversight Planning Module" || appName == "Module de planification de la surveillance") {
                    var formContext = eContext.getFormContext();
                    var planningTab = formContext.ui.tabs.get("tab_planning");
                    if (planningTab != null) {
                        planningTab.setVisible(true);
                    }
                }
            });
        }
        Team.onLoad = onLoad;
        function setFieldsDisabled(eContext) {
            var formContext = eContext.getFormContext();
            var gridContext = formContext.getControl("activity_type_estimated_duration");
            if (formContext) {
                var arrFields_1 = ["ts_activitytype"];
                var objEntity = formContext.data.entity;
                objEntity.attributes.forEach(function (attribute, i) {
                    if (arrFields_1.indexOf(attribute.getName()) > -1) {
                        var attributeToDisable = attribute.controls.get(0);
                        attributeToDisable.setDisabled(true);
                    }
                });
            }
            ;
        }
        Team.setFieldsDisabled = setFieldsDisabled;
    })(Team = ROM.Team || (ROM.Team = {}));
})(ROM || (ROM = {}));
