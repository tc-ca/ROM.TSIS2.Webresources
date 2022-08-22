"use strict";
var ROM;
(function (ROM) {
    var IncidentType;
    (function (IncidentType) {
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            //If viewing a record
            if (form.ui.getFormType() == 2 || form.ui.getFormType() == 3 || form.ui.getFormType() == 4) {
                Xrm.WebApi.retrieveRecord('msdyn_incidenttype', form.data.entity.getId(), "?$select=_owningbusinessunit_value").then(function success(incidenttype) {
                    var businessUnitfetchXml = [
                        "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false' returntotalrecordcount='true' no-lock='false'>",
                        "  <entity name='businessunit'>",
                        "    <attribute name='name'/>",
                        "    <attribute name='businessunitid'/>",
                        "    <filter>",
                        "      <condition attribute='businessunitid' operator='eq' value='", incidenttype._owningbusinessunit_value, "'/>",
                        "    </filter>",
                        "  </entity>",
                        "</fetch>"
                    ].join("");
                    businessUnitfetchXml = "?fetchXml=" + businessUnitfetchXml;
                    Xrm.WebApi.retrieveMultipleRecords("businessunit", businessUnitfetchXml).then(function (result) {
                        if (result.entities[0].name.startsWith("Aviation")) {
                            form.ui.tabs.get("operation_activity_tab").setVisible(true);
                        }
                    });
                });
            }
        }
        IncidentType.onLoad = onLoad;
        function setFieldsDisabled(eContext) {
            var formContext = eContext.getFormContext();
            var gridContext = formContext.getControl("operation_activity_grid");
            if (formContext) {
                var arrFields_1 = ["ts_operation", "ts_activity"];
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
        IncidentType.setFieldsDisabled = setFieldsDisabled;
    })(IncidentType = ROM.IncidentType || (ROM.IncidentType = {}));
})(ROM || (ROM = {}));
