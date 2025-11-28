/* eslint-disable @typescript-eslint/triple-slash-reference */
namespace ROM.IncidentQuickCreate {
    // EVENTS
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.incident.QuickCreate.CaseQuickCreate>eContext.getFormContext();

        switch (form.ui.getFormType()) {
            //Create
            case 1:
                setRegion(eContext);
                form.getAttribute('ownerid').setValue();
                let userId = Xrm.Utility.getGlobalContext().userSettings.userId;

                let currentUserBusinessUnitFetchXML = [
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

                Xrm.WebApi.retrieveMultipleRecords("businessunit", currentUserBusinessUnitFetchXML).then(
                    function (businessunit) {
                        let team;
                        // TODO: Need to verify which Aviation Security team we should use for team name lookup.
                        // There are multiple teams with similar names:
                        //   - "Aviation Security" (hardcoded name used here) - in "Aviation Security Directorate - Domestic" business unit (e2e3910d-a41f-ec11-b6e6-0022483cb5c7)
                        //   - "Aviation Security Directorate - Domestic" - in "Aviation Security Directorate - Domestic" business unit (8444831b-bead-eb11-8236-000d3ae8b866)
                        //   - "Aviation Security Directorate" - in "Aviation Security Directorate" business unit (3b8513c3-b426-ec11-b6e6-000d3af4f86f)
                        // We need to determine which team name is correct for this use case.
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

                        Xrm.WebApi.retrieveMultipleRecords('team', teamfetchXml).then(
                            function success(result) {
                                team.id = result.entities[0].teamid;
                                form.getAttribute('ownerid').setValue([team]);
                            }
                        );
                    }
                );
                break;
        }
    }

    export function regionOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        try {

            const form = <Form.incident.QuickCreate.CaseQuickCreate>eContext.getFormContext();
            const regionAttribute = form.getAttribute("ovs_region");

            if (regionAttribute != null && regionAttribute != undefined) {

                const regionAttributeValue = regionAttribute.getValue();
                if (regionAttributeValue != null && regionAttributeValue != undefined) {
                    if (regionAttributeValue[0].id == "{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}") { //International
                        form.getControl("ts_country").setVisible(true);
                    }
                }
                else {
                    form.getControl("ts_country").setVisible(false);
                }
            }
        } catch (e) {
            throw new Error((e as any).Message);
        }
    }

    // FUNCTIONS
    function setRegion(eContext: Xrm.ExecutionContext<any, any>): void {
        var currentUserId = Xrm.Utility.getGlobalContext().userSettings.userId;
        currentUserId = currentUserId.replace(/[{}]/g, "");

        // Get the user's territory
        Xrm.WebApi.online.retrieveRecord("systemuser", currentUserId, "?$select=_territoryid_value").then(
            function success(result) {
                const form = <Form.incident.QuickCreate.CaseQuickCreate>eContext.getFormContext();
                if (result != null && result["_territoryid_value"] != null) {

                    // NOTE: Our localization plugin can't localize the territory name on system user
                    // So we do an extra call to the territory table to get the localized name
                    Xrm.WebApi.online.retrieveRecord("territory", result["_territoryid_value"], "?$select=name").then(
                        function success(result) {
                            const territoryId = result["territoryid"];
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
                        },
                        function (error) {
                            var alertStrings = { text: error.message };
                            var alertOptions = { height: 120, width: 260 };
                            Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function () { });
                        }
                    );

                }
            },
            function (error) {
                var alertStrings = { text: error.message };
                var alertOptions = { height: 120, width: 260 };
                Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function () { });
            }
        );
    }

}
