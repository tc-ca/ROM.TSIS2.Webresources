"use strict";
var ROM;
(function (ROM) {
    var IncidentType;
    (function (IncidentType) {
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            //If creating a record
            if (form.ui.getFormType() == 1) {
                form.getAttribute('ownerid').setValue();
                var userId = Xrm.Utility.getGlobalContext().userSettings.userId;
                var currentUserBusinessUnitFetchXML = [
                    "<fetch>",
                    "  <entity name='businessunit'>",
                    "    <attribute name='name' />",
                    "    <attribute name='businessunitid' />",
                    "    <link-entity name='systemuser' from='businessunitid' to='businessunitid'>",
                    "      <filter>",
                    "        <condition attribute='systemuserid' operator='eq' value='", userId, "'/>",
                    "      </filter>",
                    "    </link-entity>",
                    "  </entity>",
                    "</fetch>",
                ].join("");
                currentUserBusinessUnitFetchXML = "?fetchXml=" + encodeURIComponent(currentUserBusinessUnitFetchXML);
                Xrm.WebApi.retrieveMultipleRecords("businessunit", currentUserBusinessUnitFetchXML).then(function (businessunit) {
                    var team;
                    if (businessunit.entities[0].name.startsWith('Aviation')) {
                        team = {
                            "name": "Aviation Security",
                            "entityType": "team"
                        };
                    }
                    else if (businessunit.entities[0].name.startsWith('Intermodal')) {
                        team = {
                            "name": "Intermodal Surface Security Oversight (ISSO)",
                            "entityType": "team"
                        };
                    }
                    var teamfetchXml = [
                        "<fetch>",
                        "  <entity name='team'>",
                        "    <attribute name='name'/>",
                        "    <attribute name='teamid'/>",
                        "    <filter>",
                        "      <condition attribute='name' operator='eq' value='", team.name, "'/>",
                        "    </filter>",
                        "  </entity>",
                        "</fetch>"
                    ].join("");
                    teamfetchXml = "?fetchXml=" + encodeURIComponent(teamfetchXml);
                    Xrm.WebApi.retrieveMultipleRecords('team', teamfetchXml).then(function success(result) {
                        team.id = result.entities[0].teamid;
                        form.getAttribute('ownerid').setValue([team]);
                    });
                });
            }
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
