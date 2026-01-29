namespace ROM.IncidentType {

    export async function onLoad(eContext: Xrm.ExecutionContext<any, any>): Promise<void> {
        const form = <Form.msdyn_incidenttype.Main.Information>eContext.getFormContext();
        const formType = form.ui.getFormType();

        //If creating a record
        if (formType == 1) {
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
                async function (businessunit) {
                    if (!businessunit.entities.length || !businessunit.entities[0].businessunitid) return;

                    const userBuId = businessunit.entities[0].businessunitid;
                    const isTC = await isTCBU(userBuId);
                    if (isTC) return;

                    const isAvSec = await isAvSecBU(userBuId);
                    const isISSO = !isAvSec ? await isISSOBU(userBuId) : false;
                    const isRailSafety = !isAvSec && !isISSO ? await isRailSafetyBU(userBuId) : false;

                    let teamSchemaName: string | undefined;
                    let isRailSafetyTeam = false;
                    if (isAvSec) {
                        teamSchemaName = TEAM_SCHEMA_NAMES.AVIATION_SECURITY_DOMESTIC;
                    } else if (isISSO) {
                        teamSchemaName = TEAM_SCHEMA_NAMES.ISSO_TEAM;
                    } else if (isRailSafety) {
                        teamSchemaName = TEAM_SCHEMA_NAMES.RAIL_SAFETY;
                        isRailSafetyTeam = true;
                    }

                    if (teamSchemaName) {
                        const teamId = await getEnvironmentVariableValue(teamSchemaName);
                        if (teamId) {
                            try {
                                const teamRec = await Xrm.WebApi.retrieveRecord("team", teamId, "?$select=name");
                                if (!teamRec || !teamRec.name) {
                                    console.warn("[IncidentType.onLoad] Team record not found or missing name:", teamId);
                                    return;
                                }

                                const team: Xrm.EntityReference<"team"> = {
                                    id: teamId,
                                    name: teamRec.name,
                                    entityType: "team"
                                };

                                form.getAttribute('ownerid').setValue([team]);
                                
                                // Hide owner field if Rail Safety team was assigned
                                if (isRailSafetyTeam) {
                                    form.getControl("ownerid").setVisible(false);
                                }

                                // Check owner status after setting it (only for AvSec)
                                if (isAvSec) {
                                    isOwnedByAvSec([team]).then(isAvSecOwner => {
                                        form.ui.tabs.get("tab_risk").setVisible(isAvSecOwner);
                                    });
                                }

                                // Log Rail Safety ownership status after setting owner
                                logRailSafetyOwnershipStatus(form);
                            } catch (error) {
                                console.error("[IncidentType.onLoad] Error retrieving team record:", error);
                            }
                        }
                    }
                }
            ).catch(error => {
                console.error("[IncidentType.onLoad] Error retrieving business unit:", error);
            });
        }

        //If viewing a record
        if (formType == 2 || formType == 3 || formType == 4) {
            Xrm.WebApi.retrieveRecord('msdyn_incidenttype', form.data.entity.getId(), "?$select=_owningbusinessunit_value").then(
                async function success(incidenttype) {
                    const owningBuId = incidenttype._owningbusinessunit_value;
                    if (!owningBuId) return;

                    const isOwningBuAvSec = await isAvSecBU(owningBuId);
                    if (isOwningBuAvSec) {
                        form.ui.tabs.get("operation_activity_tab").setVisible(true);
                        form.getControl("ts_programarea").setVisible(true);
                        form.getControl("ts_programactivityriskrating").setVisible(true);
                        let formUI: any = form.ui;
                        formUI.quickForms.get("ProgramAreaRiskRatingQV").setVisible(true);
                    }
                    else {
                        let formUI: any = form.ui;
                        formUI.quickForms.get("ProgramAreaRiskRatingQV").setVisible(false);
                    }
                }
            ).catch(error => {
                console.error("[IncidentType.onLoad] Error retrieving incident type:", error);
            });

            // Check owner status for existing records
            const ownerAttribute = form.getAttribute("ownerid");
            const ownerAttributeValue = ownerAttribute.getValue();

            if (ownerAttributeValue != null) {
                try {
                    const isAvSecOwner = await isOwnedByAvSec(ownerAttributeValue);
                    form.ui.tabs.get("tab_risk").setVisible(isAvSecOwner);
                } catch (error) {
                    console.error("[IncidentType.onLoad] Error checking AvSec ownership:", error);
                }
            }

            // Log Rail Safety ownership status for existing records
            logRailSafetyOwnershipStatus(form);
        }
    }

    export async function onSave(eContext: Xrm.ExecutionContext<any, any>): Promise<void> {
        const form = <Form.msdyn_incidenttype.Main.Information>eContext.getFormContext();

        try {
            // Rail Safety ownership assignment
            await assignRailSafetyOwnershipOnSave(form);
        } catch (error) {
            console.error("[IncidentType.onSave] Error:", error);
        }
    }

    export function setFieldsDisabled(eContext: Xrm.ExecutionContext<any, any>) {
        const formContext = <Form.ovs_operation.Main.Information>eContext.getFormContext();
        const gridContext = formContext.getControl("operation_activity_grid");
        if (formContext) {
            let arrFields = ["ts_operation", "ts_activity"];
            let objEntity = formContext.data.entity;
            objEntity.attributes.forEach(
                function (attribute, i) {
                    if (arrFields.indexOf(attribute.getName()) > -1) {
                        let attributeToDisable = attribute.controls.get(0);
                        attributeToDisable.setDisabled(true);
                    }
                }
            );
        };
    }
}
