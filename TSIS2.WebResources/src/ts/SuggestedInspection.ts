namespace ROM.SuggestedInspection {
    export async function onLoad(eContext) {
        const form = <Form.ts_suggestedinspection.Main.Information>eContext.getFormContext();
        await setOperationTypeFilteredView(form);
        setStakeholderFilteredView(form);
        setSiteFilteredView(form);
        setActivityTypeFilteredView(form);
        filterTrips(form);

        const operationTypeValue = form.getAttribute("ts_operationtype").getValue();
        const stakeholderValue = form.getAttribute("ts_stakeholder").getValue();
        const siteValue = form.getAttribute("ts_site").getValue();
        const activityTypeValue = form.getAttribute("ts_activitytype").getValue();
        const operationValue = form.getAttribute("ts_operation").getValue();

        if (operationTypeValue != null) {
            form.getControl("ts_stakeholder").setDisabled(false);
        }

        if (stakeholderValue != null) {
            form.getControl("ts_stakeholder").setDisabled(false);
            form.getControl("ts_site").setDisabled(false);
        }

        if (siteValue != null) {
            form.getControl("ts_site").setDisabled(false);
            form.getControl("ts_activitytype").setDisabled(false);
        }

        if (activityTypeValue != null) {
            form.getControl("ts_activitytype").setDisabled(false);
        }

        if (form.getAttribute("ts_q1").getValue() == null) {
            form.getAttribute("ts_q1").setValue(0)
        }

        if (form.getAttribute("ts_q2").getValue() == null) {
            form.getAttribute("ts_q2").setValue(0)
        }

        if (form.getAttribute("ts_q3").getValue() == null) {
            form.getAttribute("ts_q3").setValue(0)
        }

        if (form.getAttribute("ts_q4").getValue() == null) {
            form.getAttribute("ts_q4").setValue(0)
        }
    }

    export async function operationTypeOnChange(eContext) {
        const form = <Form.ts_suggestedinspection.Main.Information>eContext.getFormContext();

        const operationTypeValue = form.getAttribute("ts_operationtype").getValue();
        if (operationTypeValue == null) {
            //Clear and lock all dependent fields
            form.getAttribute("ts_stakeholder").setValue(null);
            form.getAttribute("ts_site").setValue(null);
            form.getAttribute("ts_operation").setValue(null);
            form.getAttribute("ts_activitytype").setValue(null);
            form.getAttribute("ts_riskthreshold").setValue(null);

            form.getControl("ts_stakeholder").setDisabled(true);
            form.getControl("ts_site").setDisabled(true);
            form.getControl("ts_operation").setDisabled(true);
            form.getControl("ts_activitytype").setDisabled(true);
            form.getControl("ts_riskthreshold").setDisabled(true);

            await setOperationTypeFilteredView(form);
        } else {
            //Unlock next field
            form.getControl("ts_stakeholder").setDisabled(false);
            setStakeholderFilteredView(form);
        }
    }

    export async function stakeholderOnChange(eContext) {
        const form = <Form.ts_suggestedinspection.Main.Information>eContext.getFormContext();

        const stakeholderValue = form.getAttribute("ts_stakeholder").getValue();
        if (stakeholderValue == null) {
            //Clear and lock all dependent fields
            form.getAttribute("ts_site").setValue(null);
            form.getAttribute("ts_operation").setValue(null);
            form.getAttribute("ts_activitytype").setValue(null);
            form.getAttribute("ts_riskthreshold").setValue(null);

            form.getControl("ts_site").setDisabled(true);
            form.getControl("ts_operation").setDisabled(true);
            form.getControl("ts_activitytype").setDisabled(true);
            form.getControl("ts_riskthreshold").setDisabled(true);

            await setOperationTypeFilteredView(form);
            setStakeholderFilteredView(form);
        } else {
            //Unlock next field
            form.getControl("ts_site").setDisabled(false);
            setSiteFilteredView(form);
        }
    }

    export async function siteOnChange(eContext) {
        const form = <Form.ts_suggestedinspection.Main.Information>eContext.getFormContext();

        const siteValue = form.getAttribute("ts_site").getValue();
        if (siteValue == null) {
            //Clear and lock all dependent fields
            form.getAttribute("ts_operation").setValue(null);
            form.getAttribute("ts_activitytype").setValue(null);
            form.getAttribute("ts_riskthreshold").setValue(null);
            form.getAttribute("ts_estimatedduration").setValue(null);

            form.getControl("ts_operation").setDisabled(true);
            form.getControl("ts_activitytype").setDisabled(true);
            form.getControl("ts_riskthreshold").setDisabled(true);

            setStakeholderFilteredView(form);
            setSiteFilteredView(form);
        } else {
            //Set Operation Field
            const operationTypeValue = form.getAttribute("ts_operationtype").getValue();
            const stakeholderValue = form.getAttribute("ts_stakeholder").getValue();
            let operationTypeId;
            let stakeholderId;
            let siteId;
            if (operationTypeValue != null && stakeholderValue != null) {
                operationTypeId = operationTypeValue[0].id;
                stakeholderId = stakeholderValue[0].id;
                siteId = siteValue[0].id;
            }
            if (operationTypeId != null && stakeholderId != null && siteId != null) {

                //Active Operation with matching Operation Type Stakeholder and Site
                let fetchXml = [
                    "<fetch>",
                    "  <entity name='ovs_operation'>",
                    "    <attribute name='ovs_operationid'/>",
                    "    <attribute name='ts_operationalstatus'/>",
                    "    <attribute name='ovs_name'/>",
                    "    <attribute name='ts_risk'/>",
                    "    <filter>",
                    "      <condition attribute='ts_stakeholder' operator='eq' value='", stakeholderId, "' uitype='account'/>",
                    "      <condition attribute='ovs_operationtypeid' operator='eq' value='", operationTypeId, "' uitype='ovs_operationtype'/>",
                    "      <condition attribute='ts_site' operator='eq' value='", siteId, "' uitype='msdyn_functionallocation'/>",
                    "      <condition attribute='statecode' operator='eq' value='0'/>",
                    "    </filter>",
                    "  </entity>",
                    "</fetch>"
                ].join("");
                fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
                let operation = await Xrm.WebApi.retrieveMultipleRecords("ovs_operation", fetchXml).then(function success(result) {
                    return result.entities[0];
                });
                if (operation != null) {
                    //Create Operation Lookup to set as Operation
                    const operationlookup = new Array();
                    operationlookup[0] = new Object();
                    operationlookup[0].id = operation.ovs_operationid;
                    operationlookup[0].name = operation.ovs_name;
                    operationlookup[0].entityType = 'ovs_operation';

                    //Set Risk if it exists
                    if (operation._ts_risk_value != null) {
                        //Create Risk Lookup to set as Risk
                        const risklookup = new Array();
                        risklookup[0] = new Object();
                        risklookup[0].id = operation._ts_risk_value;
                        risklookup[0].name = operation["_ts_risk_value@OData.Community.Display.V1.FormattedValue"]
                        risklookup[0].entityType = 'ts_riskcategory';
                        form.getAttribute('ts_riskthreshold').setValue(risklookup);
                    }

                    if (operation.ts_operationalstatus == 717750001) {
                        form.ui.setFormNotification((Xrm.Utility.getGlobalContext().userSettings.languageId == 1033 ? "The operation \"" + operation.ovs_name + "\" is non-operational." : "L'opération \"" + operation.ovs_name + "\" est  non opérationnelle."), "ERROR", "non-operational-operation");
                        form.getAttribute('ts_site').setValue(null);
                    }
                    else {
                        form.ui.clearFormNotification("non-operational-operation");
                        form.getAttribute('ts_operation').setValue(operationlookup);
                        form.getControl("ts_activitytype").setDisabled(false);
                        setActivityTypeFilteredView(form);
                    }
                }
            }

        }
    }

    export function activityTypeOnChange(eContext) {
        const form = <Form.ts_suggestedinspection.Main.Information>eContext.getFormContext();
        const activtyTypeValue = form.getAttribute("ts_activitytype").getValue();
        let activityypeId;
        if (activtyTypeValue != null) {
            activityypeId = activtyTypeValue[0].id;

            Xrm.WebApi.retrieveRecord("msdyn_incidenttype", activityypeId, "?$select=msdyn_estimatedduration")
                .then(function success(result) {
                    if (result != null) {
                        form.getAttribute('ts_estimatedduration').setValue(result.msdyn_estimatedduration / 60);
                    }
                });
        } else {
            form.getAttribute('ts_estimatedduration').setValue(null);
        }
    }

    async function setOperationTypeFilteredView(form: Form.ts_suggestedinspection.Main.Information): Promise<void> {
        const viewId = '{8982C38D-8BB4-4C95-BD05-493398FEAE99}';
        const entityName = "ovs_operationtype";
        //const viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredOperationTypes");
        const viewDisplayName = "Operation Types";

        // Retrieve ISSO Business Unit GUIDs
        const issoBUGUIDs = await getISSOBUGUIDs();

        // Build filter conditions for ISSO BUs
        let issoBUFilterConditions = '';
        if (issoBUGUIDs.length > 0) {
            if (issoBUGUIDs.length === 1) {
                issoBUFilterConditions = `<condition attribute="businessunitid" operator="eq" value="${issoBUGUIDs[0]}"/>`;
            } else {
                issoBUFilterConditions = '<filter type="or">';
                for (let i = 0; i < issoBUGUIDs.length; i++) {
                    issoBUFilterConditions += `<condition attribute="businessunitid" operator="eq" value="${issoBUGUIDs[i]}"/>`;
                }
                issoBUFilterConditions += '</filter>';
            }
        }

        //Active Operation Types with Inspection Incident Types that belong to ISSO (GUID-based)
        const fetchXml = [
            "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true'>",
            "  <entity name='ovs_operationtype'>",
            "    <attribute name='createdon'/>",
            "    <attribute name='ovs_name'/>",
            "    <attribute name='ovs_operationtypeid'/>",
            "    <filter>",
            "      <condition attribute='statecode' operator='eq' value='0'/>",
            "    </filter>",
            "    <link-entity name='businessunit' from='businessunitid' to='owningbusinessunit' alias='businessunit'>",
            "      <filter>",
            "        ", issoBUFilterConditions, "",
            "      </filter>",
            "    </link-entity>",
            "    <link-entity name='ts_ovs_operationtypes_msdyn_incidenttypes' from='ovs_operationtypeid' to='ovs_operationtypeid' intersect='true'>",
            "      <link-entity name='msdyn_incidenttype' from='msdyn_incidenttypeid' to='msdyn_incidenttypeid' alias='incidenttype'>",
            "        <filter>",
            "          <condition attribute='msdyn_defaultworkordertype' operator='eq' value='b1ee680a-7cf7-ea11-a815-000d3af3a7a7'/>",
            "          <condition attribute='statecode' operator='eq' value='0'/>",
            "        </filter>",
            "      </link-entity>",
            "    </link-entity>",
            "  </entity>",
            "</fetch>"
        ].join("");
        const layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="ovs_operationtypeid"><cell name="ovs_name" width="200" /></row></grid>';
        form.getControl("ts_operationtype").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
    }

    function setStakeholderFilteredView(form: Form.ts_suggestedinspection.Main.Information): void {
        let operationTypeValue = form.getAttribute("ts_operationtype").getValue();
        let operationTypeId;
        if (operationTypeValue != null) {
            operationTypeId = operationTypeValue[0].id;
        }
        const viewId = '{8982C38D-8BB4-4C95-BD05-493398F11111}';
        const entityName = "account";
        //const viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredStakeholders");
        const viewDisplayName = "Stakeholders";

        //All Active Stakeholders/Accounts that have an Operation with a matching Operation Type
        var fetchXml = [
            "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true'>",
            "  <entity name='account'>",
            "    <attribute name='accountid'/>",
            "    <attribute name='createdon'/>",
            "    <attribute name='name'/>",
            "    <filter>",
            "      <condition attribute='statecode' operator='eq' value='0'/>",
            "    </filter>",
            "    <link-entity name='ovs_operation' from='ts_stakeholder' to='accountid' link-type='inner' alias='operation' intersect='true'>",
            "      <filter>",
            "        <condition attribute='ovs_operationtypeid' operator='eq' value='", operationTypeId, "'/>",
            "        <condition attribute='statecode' operator='eq' value='0'/>",
            "      </filter>",
            "    </link-entity>",
            "  </entity>",
            "</fetch>"
        ].join("");
        const layoutXml = '<grid name="resultset" jump="name" select="1" icon="1" preview="1"> <row name="result" id="accountid"> <cell name="name" width="300" /></row> </grid>';
        form.getControl("ts_stakeholder").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
    }

    function setSiteFilteredView(form: Form.ts_suggestedinspection.Main.Information): void {
        let operationTypeValue = form.getAttribute("ts_operationtype").getValue();
        let stakeholderValue = form.getAttribute("ts_stakeholder").getValue();
        let operationTypeId;
        let stakeholderId;
        if (operationTypeValue != null && stakeholderValue != null) {
            operationTypeId = operationTypeValue[0].id;
            stakeholderId = stakeholderValue[0].id;
        }
        const viewId = '{8982C38D-8BB4-4C95-BD05-493398F00000}';
        const entityName = "msdyn_functionallocation";
        //const viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredStakeholders");
        const viewDisplayName = "Sites";

        //All Active Sites/FunctionalLocations that have an Operation with matching Stakeholder and Operation Type
        const fetchXml = [
            "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true'>",
            "  <entity name='msdyn_functionallocation'>",
            "    <attribute name='createdon'/>",
            "    <attribute name='msdyn_name'/>",
            "    <attribute name='msdyn_functionallocationid'/>",
            "    <filter>",
            "      <condition attribute='statecode' operator='eq' value='0'/>",
            "    </filter>",
            "    <link-entity name='ovs_operation' from='ts_site' to='msdyn_functionallocationid' alias='operation'  intersect='true'>",
            "      <filter>",
            "        <condition attribute='ts_stakeholder' operator='eq' value='", stakeholderId, "'/>",
            "        <condition attribute='ovs_operationtypeid' operator='eq' value='", operationTypeId, "'/>",
            "        <condition attribute='statecode' operator='eq' value='0'/>",
            "      </filter>",
            "    </link-entity>",
            "  </entity>",
            "</fetch>"
        ].join("");
        const layoutXml = '<grid name="resultset" jump="msdyn_name" select="1" preview="1" icon="1"> <row name="result" id="msdyn_functionallocationid"> <cell name="msdyn_name" width="150" /> </row> </grid>';
        form.getControl("ts_site").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
    }

    function setActivityTypeFilteredView(form: Form.ts_suggestedinspection.Main.Information): void {
        const viewId = '{8982C38D-8BB4-4C95-BD05-493398666666}';
        const entityName = "msdyn_incidenttype";
        //const viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredOperationTypes");
        const viewDisplayName = "Activity Types";

        let operationTypeValue = form.getAttribute("ts_operationtype").getValue();
        let operationTypeId;
        if (operationTypeValue != null) {
            operationTypeId = operationTypeValue[0].id;
        }

        //All Active Inspection ActivityTypes/IncidentTypes related to the selected Operation Type  
        const fetchXml = [
            "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true'>",
            "  <entity name='msdyn_incidenttype'>",
            "    <attribute name='msdyn_incidenttypeid'/>",
            "    <attribute name='msdyn_name'/>",
            "    <filter>",
            "      <condition attribute='msdyn_defaultworkordertype' operator='eq' value='b1ee680a-7cf7-ea11-a815-000d3af3a7a7'/>",
            "      <condition attribute='statecode' operator='eq' value='0'/>",
            "    </filter>",
            "    <link-entity name='ts_ovs_operationtypes_msdyn_incidenttypes' from='msdyn_incidenttypeid' to='msdyn_incidenttypeid' intersect='true'>",
            "      <link-entity name='ovs_operationtype' from='ovs_operationtypeid' to='ovs_operationtypeid' intersect='true'>",
            "        <filter>",
            "          <condition attribute='ovs_operationtypeid' operator='eq' value='", operationTypeId, "'/>",
            "          <condition attribute='statecode' operator='eq' value='0'/>",
            "        </filter>",
            "      </link-entity>",
            "    </link-entity>",
            "  </entity>",
            "</fetch>"
        ].join("");
        const layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="msdyn_incidenttypeid"><cell name="msdyn_name" width="200" /></row></grid>';
        form.getControl("ts_activitytype").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
    }


    function filterTrips(form: Form.ts_suggestedinspection.Main.Information) {
        var plan = form.getAttribute("ts_plan").getValue();
        if (plan !== null) {
            Xrm.WebApi.retrieveRecord("ts_plan", plan[0].id, "?$select=_ts_fiscalyear_value,ts_name&$expand=ts_team($select=_ts_territory_value)").then(function success(result) {
                if (result["ts_team"] != null && result["ts_team"]["_ts_territory_value"] != null) {
                    console.log("Retrieved _ts_fiscalyear_value: " + result._ts_fiscalyear_value + "  Region: " + result["ts_team"]["_ts_territory_value"]);
                    let yearId = result._ts_fiscalyear_value;
                    var tripFilter = "<filter type='and'><condition attribute='statecode' operator='eq' value='0'/><condition attribute='ts_fiscalyear' operator='eq'  value='" + yearId + "' /><filter type='or'>" +
                        "<condition attribute='ts_region' operator='eq' value='{" + result["ts_team"]["_ts_territory_value"] + "}' /><condition attribute='ts_region' operator='null' /></filter></filter>";
                    form.getControl("ts_trip").addPreSearch(function () {
                        form.getControl("ts_trip").addCustomFilter(tripFilter, "ts_trip");
                    });
                }
            });
        }
    }

    export function q1OnChange(eContext) {
        const form = <Form.ts_suggestedinspection.Main.Information>eContext.getFormContext();
        if (form.getAttribute("ts_q1").getValue() == null) {
            form.getAttribute("ts_q1").setValue(0)
        }
    }

    export function q2OnChange(eContext) {
        const form = <Form.ts_suggestedinspection.Main.Information>eContext.getFormContext();
        if (form.getAttribute("ts_q2").getValue() == null) {
            form.getAttribute("ts_q2").setValue(0)
        }
    }

    export function q3OnChange(eContext) {
        const form = <Form.ts_suggestedinspection.Main.Information>eContext.getFormContext();
        if (form.getAttribute("ts_q3").getValue() == null) {
            form.getAttribute("ts_q3").setValue(0)
        }
    }

    export function q4OnChange(eContext) {
        const form = <Form.ts_suggestedinspection.Main.Information>eContext.getFormContext();
        if (form.getAttribute("ts_q4").getValue() == null) {
            form.getAttribute("ts_q4").setValue(0)
        }
    }
}