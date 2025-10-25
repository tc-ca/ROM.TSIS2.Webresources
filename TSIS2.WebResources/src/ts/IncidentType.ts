namespace ROM.IncidentType {

    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_incidenttype.Main.Information>eContext.getFormContext();

        //If creating a record
        if (form.ui.getFormType() == 1) {
            form.getAttribute('ownerid').setValue();
            let userId = Xrm.Utility.getGlobalContext().userSettings.userId;

            let currentUserBusinessUnitFetchXML = [
                "<fetch>",
                "  <entity name='businessunit'>",
                "    <attribute name='name' />",
                "    <attribute name='businessunitid' />",
                "    <filter type='and'>",
                "      <condition attribute='name' operator='ne' value='Transport Canada' />",
                "    </filter>",
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
                    const isAvSec = await isAvSecBU(userBuId);
                    const isISSO = !isAvSec ? await isISSOBU(userBuId) : false;

                    let teamSchemaName: string | undefined;
                    if (isAvSec) {
                        teamSchemaName = TEAM_SCHEMA_NAMES.AVIATION_SECURITY_DOMESTIC;
                    } else if (isISSO) {
                        teamSchemaName = TEAM_SCHEMA_NAMES.ISSO_TEAM;
                    }

                    if (teamSchemaName) {
                        const teamId = await getEnvironmentVariableValue(teamSchemaName);
                        if (teamId) {
                            const teamRec = await Xrm.WebApi.retrieveRecord("team", teamId, "?$select=name");
                            if (!teamRec) return;

                            const team: Xrm.EntityReference<"team"> = {
                                id: teamId,
                                name: teamRec.name || "",
                                entityType: "team"
                            };

                            form.getAttribute('ownerid').setValue([team]);
                        }
                    }
                }
            );
        }

        //If viewing a record
        if (form.ui.getFormType() == 2 || form.ui.getFormType() == 3 || form.ui.getFormType() == 4) {
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
            );
        }

        //If owner is Aviation Security
        const ownerAttribute = form.getAttribute("ownerid")
        const ownerAttributeValue = ownerAttribute.getValue();

        if (ownerAttributeValue != null) {
            isOwnedByAvSec(ownerAttributeValue).then(isAvSecOwner => {
                form.ui.tabs.get("tab_risk").setVisible(isAvSecOwner);
            });
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
