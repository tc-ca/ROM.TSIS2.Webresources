"use strict";
var ROM;
(function (ROM) {
    var Team;
    (function (Team) {
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
