namespace ROM.IncidentQuickCreate {
    // EVENTS
    export async function onLoad(eContext: Xrm.ExecutionContext<any, any>): Promise<void> {
        const form = <Form.incident.QuickCreate.CaseQuickCreate>eContext.getFormContext();

        switch (form.ui.getFormType()) {
            // Create
            case 1:
                setRegion(eContext);
                form.getAttribute("ownerid").setValue(null);

                const userId = Xrm.Utility.getGlobalContext().userSettings.userId;

                let currentUserBusinessUnitFetchXML = [
                    "<fetch top='1'>",
                    "  <entity name='businessunit'>",
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

                const businessunit = await Xrm.WebApi.retrieveMultipleRecords(
                    "businessunit",
                    currentUserBusinessUnitFetchXML
                );

                if (!businessunit.entities.length) {
                    return;
                }

                const userBusinessUnitId = businessunit.entities[0].businessunitid;

                // Classify BU using GUID-based helpers from common.js
                const isAvSec = await isAvSecBU(userBusinessUnitId);
                const isIsso = !isAvSec && (await isISSOBU(userBusinessUnitId));

                let teamSchemaName: string | null = null;

                if (isAvSec) {
                    teamSchemaName = TEAM_SCHEMA_NAMES.AVIATION_SECURITY;
                } else if (isIsso) {
                    teamSchemaName = TEAM_SCHEMA_NAMES.ISSO_TEAM;
                } else {
                    return;
                }

                const teamGuid = await getEnvironmentVariableValue(teamSchemaName);
                if (!teamGuid) {
                    return;
                }

                const teamName = (await getTeamNameById(teamGuid)) || "";

                form.getAttribute("ownerid").setValue([
                    {
                        id: teamGuid,
                        entityType: "team",
                        name: teamName,
                    },
                ]);

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
