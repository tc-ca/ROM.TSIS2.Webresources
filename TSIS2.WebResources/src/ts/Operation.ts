namespace ROM.Operation {

    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ovs_operation.Main.Information>eContext.getFormContext();

        let userId = Xrm.Utility.getGlobalContext().userSettings.userId;
        let currentUserBusinessUnitFetchXML = [
            "<fetch top='50'>",
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
        Xrm.WebApi.retrieveMultipleRecords("businessunit", currentUserBusinessUnitFetchXML).then(function (result) {
            let userBusinessUnitName = result.entities[0].name;
            //Show Properties Tab when the user is in Transport Canada or ISSO business unit
            if (userBusinessUnitName.startsWith("Transport") || userBusinessUnitName.startsWith("Intermodal")) {
                form.ui.tabs.get("tab_properties").setVisible(true);
                //Show Visual Security Inspection question only for Railway Carrier and Railway Loader
                var operationType = form.getAttribute("ovs_operationtypeid").getValue();
                if (operationType != null) {
                    if (operationType[0].id == "{D883B39A-C751-EB11-A812-000D3AF3AC0D}" || operationType[0].id == "{DA56FEA1-C751-EB11-A812-000D3AF3AC0D}") {
                        form.getControl("ts_visualsecurityinspection").setVisible(true);
                        form.getControl("ts_typeofdangerousgoods").setVisible(true);
                        //Set default value for existing operations
                        if (form.getAttribute("ts_visualsecurityinspection").getValue() == null) {
                            form.getAttribute("ts_visualsecurityinspection").setValue(ts_visualsecurityinspection.Unconfirmed);
                        }                            
                    }
                }
            }
        });        

        if (form.getAttribute("ts_statusstartdate").getValue() != null) {
            form.getControl("ts_statusenddate").setDisabled(false);
            form.getControl("ts_description").setDisabled(false);
            form.getAttribute("ts_description").setRequiredLevel("required");
        }
    }


    export function onSave(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ovs_operation.Main.Information>eContext.getFormContext();
        const statusStartDateValue = form.getAttribute("ts_statusstartdate").getValue();
        const statusEndDateValue = form.getAttribute("ts_statusenddate").getValue();
        if (statusStartDateValue != null) {
            if (Date.parse(statusStartDateValue.toDateString()) <= Date.parse(new Date(Date.now()).toDateString())) {
                form.getAttribute("ts_operationalstatus").setValue(ts_operationalstatus.NonOperational);
            }
        }
        if (statusEndDateValue != null) {
            if (Date.parse(statusEndDateValue.toDateString()) <= Date.parse(new Date(Date.now()).toDateString())) {
                form.getAttribute("ts_operationalstatus").setValue(ts_operationalstatus.Operational);
            }
        }
    }
    export function siteOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ovs_operation.Main.Information>eContext.getFormContext();
        const siteAttribute = form.getAttribute("ts_site");

        if (siteAttribute != null) {
            const siteAttributeValue = siteAttribute.getValue();

            // Enable subsite field with appropriate filtered view if site selected
            if (siteAttributeValue != null && siteAttributeValue != undefined) {
                form.getControl('ts_subsite').setDisabled(false);
                const viewId = '{6A59549F-F162-5128-4711-79BC929540C3}';
                const entityName = "msdyn_functionallocation";
                const viewDisplayName = "Filtered Sites";
                const activityTypeFetchXml = '<fetch no-lock="false"><entity name="msdyn_functionallocation"><attribute name="statecode"/><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><filter><condition attribute="msdyn_functionallocationid" operator="under" value="' + siteAttributeValue[0].id + '"/></filter><order attribute="msdyn_name" descending="false"/></entity></fetch>';
                const layoutXml = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="200" /></row></grid>';
                form.getControl("ts_subsite").addCustomView(viewId, entityName, viewDisplayName, activityTypeFetchXml, layoutXml, true);
            }
            else {
                form.getControl('ts_subsite').setDisabled(true);
            }
        }
    }

    export function statusStartDateOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ovs_operation.Main.Information>eContext.getFormContext();
        if (form.getAttribute("ts_statusstartdate").getValue() != null) {
            form.getControl("ts_statusenddate").setDisabled(false);
            form.getControl("ts_description").setDisabled(false);
            form.getAttribute("ts_description").setRequiredLevel("required");
        }
        else {
            form.getAttribute("ts_description").setRequiredLevel("none");
            form.getAttribute("ts_description").setValue(null);
            form.getAttribute("ts_statusenddate").setValue(null);
            form.getControl("ts_statusenddate").setDisabled(true);
            form.getControl("ts_description").setDisabled(true);
        }
    }
}