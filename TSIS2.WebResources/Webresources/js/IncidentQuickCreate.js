"use strict";
/* eslint-disable @typescript-eslint/triple-slash-reference */
var ROM;
(function (ROM) {
    var IncidentQuickCreate;
    (function (IncidentQuickCreate) {
        // EVENTS
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            switch (form.ui.getFormType()) {
                //Create
                case 1:
                    setRegion(eContext);
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
                    break;
            }
        }
        IncidentQuickCreate.onLoad = onLoad;
        function regionOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var regionAttribute = form.getAttribute("ovs_region");
                if (regionAttribute != null && regionAttribute != undefined) {
                    var regionAttributeValue = regionAttribute.getValue();
                    if (regionAttributeValue != null && regionAttributeValue != undefined) {
                        if (regionAttributeValue[0].id == "{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}") { //International
                            form.getControl("ts_country").setVisible(true);
                        }
                    }
                    else {
                        form.getControl("ts_country").setVisible(false);
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        IncidentQuickCreate.regionOnChange = regionOnChange;
        // FUNCTIONS
        function setRegion(eContext) {
            var currentUserId = Xrm.Utility.getGlobalContext().userSettings.userId;
            currentUserId = currentUserId.replace(/[{}]/g, "");
            // Get the user's territory
            Xrm.WebApi.online.retrieveRecord("systemuser", currentUserId, "?$select=_territoryid_value").then(function success(result) {
                var form = eContext.getFormContext();
                if (result != null && result["_territoryid_value"] != null) {
                    // NOTE: Our localization plugin can't localize the territory name on system user
                    // So we do an extra call to the territory table to get the localized name
                    Xrm.WebApi.online.retrieveRecord("territory", result["_territoryid_value"], "?$select=name").then(function success(result) {
                        var territoryId = result["territoryid"];
                        var territoryName = result["name"];
                        var territoryLogicalName = "territory";
                        var lookup = new Array();
                        lookup[0] = new Object();
                        lookup[0].id = territoryId;
                        lookup[0].name = territoryName;
                        lookup[0].entityType = territoryLogicalName;
                        form.getAttribute('ovs_region').setValue(lookup);
                        if (lookup[0].id == "{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}") { //International
                            form.getControl("ts_country").setVisible(true);
                        }
                        else {
                            regionOnChange(eContext);
                        }
                    }, function (error) {
                        var alertStrings = { text: error.message };
                        var alertOptions = { height: 120, width: 260 };
                        Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function () { });
                    });
                }
            }, function (error) {
                var alertStrings = { text: error.message };
                var alertOptions = { height: 120, width: 260 };
                Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function () { });
            });
        }
    })(IncidentQuickCreate = ROM.IncidentQuickCreate || (ROM.IncidentQuickCreate = {}));
})(ROM || (ROM = {}));
