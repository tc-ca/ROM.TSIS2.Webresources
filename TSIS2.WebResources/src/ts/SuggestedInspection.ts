namespace ROM.SuggestedInspection {
    export function onLoad(eContext) {
        const form = <Form.ts_suggestedinspection.Main.Information>eContext.getFormContext();
        setOperationTypeFilteredView(form);
    }

    export function operationTypeOnChange(eContext) {
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
        } else {
            //Unlock next field
            form.getControl("ts_stakeholder").setDisabled(false);
            setStakeholderFilteredView(form);
        }
    }

    export function stakeholderOnChange(eContext) {
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

            form.getControl("ts_operation").setDisabled(true);
            form.getControl("ts_activitytype").setDisabled(true);
            form.getControl("ts_riskthreshold").setDisabled(true);
        } else {
            //Set Operation Field

            //Get
            const operationTypeValue = form.getAttribute("ts_site").getValue();
            const stakeholderValue = form.getAttribute("ts_site").getValue();
            let operationTypeId;
            let stakeholderId;
            let siteId;
            if (operationTypeValue != null && stakeholderValue != null) {
                operationTypeId = operationTypeValue[0].id;
                stakeholderId = operationTypeValue[0].id;
                siteId = siteValue[0].id;
            }
            if (operationTypeId != null && stakeholderId != null && siteId != null) {
                let fetchXml = [
                    "<fetch>",
                    "  <entity name='ovs_operation'>",
                    "    <attribute name='ovs_operationid'/>",
                    "    <attribute name='ts_operationalstatus'/>",
                    "    <attribute name='ovs_name'/>",
                    "    <filter>",
                    "      <condition attribute='ts_stakeholder' operator='eq' value='", stakeholderId, "' uitype='account'/>",
                    "      <condition attribute='ovs_operationtypeid' operator='eq' value='", operationTypeId, "' uitype='ovs_operationtype'/>",
                    "      <condition attribute='ts_site' operator='eq' value='", siteId, "' uitype='msdyn_functionallocation'/>",
                    "    </filter>",
                    "  </entity>",
                    "</fetch>"
                ].join("");
                fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
                let operation = await Xrm.WebApi.retrieveMultipleRecords("ovs_operation", fetchXml).then(function success(result) {
                    return result.entities[0];
                });
                if (operation != null) {
                    const lookup = new Array();
                    lookup[0] = new Object();
                    lookup[0].id = operation.ovs_operationid;
                    lookup[0].name = operation.ovs_name;
                    lookup[0].entityType = 'ovs_operation';

                    if (operation.ts_operationalstatus == 717750001) {
                        form.ui.setFormNotification((Xrm.Utility.getGlobalContext().userSettings.languageId == 1033 ? "The operation \"" + operation.ovs_name + "\" is non-operational." : "L'opération \"" + operation.ovs_name + "\" est  non opérationnelle."), "ERROR", "non-operational-operation");
                        form.getAttribute('ts_site').setValue(null);
                    }
                    else {
                        form.ui.clearFormNotification("non-operational-operation");
                        form.getAttribute('ts_operation').setValue(lookup);
                        setActivityTypeFilteredView(form);
                    }
                }
            }
            
        }
    }

    export function operationOnChange(eContext) {
        const form = <Form.ts_suggestedinspection.Main.Information>eContext.getFormContext();

        const operationValue = form.getAttribute("ts_operation").getValue();
        if (operationValue == null) {
            //Clear and lock all dependent fields
            form.getAttribute("ts_activitytype").setValue(null);
            form.getAttribute("ts_riskthreshold").setValue(null);

            form.getControl("ts_activitytype").setDisabled(true);
            form.getControl("ts_riskthreshold").setDisabled(true);
        } else {
            //Unlock next field
            form.getControl("ts_activitytype").setDisabled(false);
            setActivityTypeFilteredView(form);
        }
    }

    export function activityTypeOnChange(eContext) {
        const form = <Form.ts_suggestedinspection.Main.Information>eContext.getFormContext();

        const activtyTypeValue = form.getAttribute("ts_activitytype").getValue();
        if (activtyTypeValue == null) {
            //Clear and lock all dependent fields
            form.getAttribute("ts_riskthreshold").setValue(null);

            form.getControl("ts_riskthreshold").setDisabled(true);
        }
    }

    function setOperationTypeFilteredView(form: Form.ts_suggestedinspection.Main.Information): void {
        const viewId = '{8982C38D-8BB4-4C95-BD05-493398FEAE99}';
        const entityName = "ovs_operationtype";
        //const viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredOperationTypes");
        const viewDisplayName = "Operation Types";
        const fetchXml = [
            "<fetch>",
            "  <entity name='ovs_operationtype'>",
            "    <attribute name='createdon'/>",
            "    <attribute name='ovs_name'/>",
            "    <attribute name='ovs_operationtypeid'/>",
            "    <link-entity name='businessunit' from='businessunitid' to='owningbusinessunit' alias='businessunit'>",
            "      <filter>",
            "        <condition attribute='name' operator='begins-with' value='Intermodal'/>",
            "      </filter>",
            "    </link-entity>",
            "    <link-entity name='ts_ovs_operationtypes_msdyn_incidenttypes' from='ovs_operationtypeid' to='ovs_operationtypeid' intersect='true'>",
            "      <link-entity name='msdyn_incidenttype' from='msdyn_incidenttypeid' to='msdyn_incidenttypeid' alias='incidenttype'>",
            "        <filter>",
            "          <condition attribute='msdyn_defaultworkordertype' operator='eq' value='b1ee680a-7cf7-ea11-a815-000d3af3a7a7' uiname='Inspection' uitype='msdyn_workordertype'/>",
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
        const viewId = '{8982C38D-8BB4-4C95-BD05-493398FEAE98}';
        const entityName = "account";
        //const viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredStakeholders");
        const viewDisplayName = "Stakeholders";
        const fetchXml = [
            "<fetch>",
            "  <entity name='account'>",
            "    <attribute name='accountid'/>",
            "    <attribute name='createdon'/>",
            "    <attribute name='name'/>",
            "    <link-entity name='ovs_operation' from='ts_stakeholder' to='accountid'>",
            "      <filter>",
            "        <condition attribute='ovs_operationtypeid' operator='eq' value='", operationTypeId, "'uitype='ovs_operationtype'/>",
            "      </filter>",
            "    </link-entity>",
            "  </entity>",
            "</fetch>"
        ].join("");
        const layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="accountid"><cell name="name" width="200" /></row></grid>';
        form.getControl("ts_stakeholder").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
    }

    function setSiteFilteredView(form: Form.ts_suggestedinspection.Main.Information): void {
        let operationTypeValue = form.getAttribute("ts_operationtype").getValue();
        let stakeholderValue = form.getAttribute("ts_stakeholder").getValue();
        let operationTypeId;
        let stakeholderId;
        if (operationTypeValue != null && stakeholderValue != null) {
            operationTypeId = operationTypeValue[0].id;
            stakeholderId = operationTypeValue[0].id;
        }
        const viewId = '{8982C38D-8BB4-4C95-BD05-493398FEAE98}';
        const entityName = "account";
        //const viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredStakeholders");
        const viewDisplayName = "Stakeholders";
        const fetchXml = [
            "<fetch>",
            "  <entity name='msdyn_functionallocation'>",
            "    <link-entity name='ovs_operation' from='ts_site' to='msdyn_functionallocationid' alias='operation'>",
            "      <filter>",
            "        <condition attribute='ts_stakeholder' operator='eq' value='", stakeholderId, "' uitype='account'/>",
            "        <condition attribute='ovs_operationtypeid' operator='eq' value='", operationTypeId, "' uitype='ovs_operationtype'/>",
            "      </filter>",
            "    </link-entity>",
            "  </entity>",
            "</fetch>"
        ].join("");
        const layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="accountid"><cell name="name" width="200" /></row></grid>';
        form.getControl("ts_stakeholder").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
    }

    function setActivityTypeFilteredView(form: Form.ts_suggestedinspection.Main.Information): void {

    }


}