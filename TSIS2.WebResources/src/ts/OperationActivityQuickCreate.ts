namespace ROM.OperationActivityQuickCreate {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_operationactivity.QuickCreate.OperationActivityquickcreateform>eContext.getFormContext();

        const operationAttribute = form.getAttribute("ts_operation");
        const activityTypeAttribute = form.getAttribute("ts_activity");

        if(operationAttribute != null && operationAttribute != undefined && activityTypeAttribute != null && activityTypeAttribute != undefined){
            const operationAttributeValue= operationAttribute.getValue();
            const activityTypeAttributeValue= activityTypeAttribute.getValue();

            if (operationAttributeValue != null && operationAttributeValue != undefined) {

                Xrm.WebApi.retrieveRecord('ovs_operation', operationAttributeValue[0].id, "?$select=_ovs_operationtypeid_value").then(
                    function success(result) {
                        
                        const viewId = '{145AC9F5-4F7E-43DF-BEBD-442CB4C1F880}';
                        const entityName = "msdyn_incidenttype";
                        const viewDisplayName = "Filtered Incident Type";
                        const fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false" returntotalrecordcount="true" page="1" count="25" no-lock="false"><entity name="msdyn_incidenttype"><attribute name="msdyn_incidenttypeid"/><attribute name="msdyn_name"/><order attribute="msdyn_name" descending="false"/><filter type="and"><condition attribute="statecode" operator="eq" value="0"/></filter><link-entity name="ts_ovs_operationtypes_msdyn_incidenttypes" from="msdyn_incidenttypeid" to="msdyn_incidenttypeid" visible="false" intersect="true"><link-entity name="ovs_operationtype" from="ovs_operationtypeid" to="ovs_operationtypeid" alias="ab"><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + result._ovs_operationtypeid_value + '"/></filter></link-entity></link-entity></entity></fetch>';
                        const layoutXml = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_incidenttypeid"><cell name="msdyn_name" width="200" /></row></grid>';

                        form.getControl("ts_activity").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                    }
                );
            }
            else{
                if (activityTypeAttributeValue != null && activityTypeAttributeValue != undefined) {
                    let activityTypeCondition = "";
                    let activityTypeAssociatedOperationTypes = [
                        "<fetch distinct='true'>",
                        "  <entity name='msdyn_incidenttype'>",
                        "    <filter>",
                        "      <condition attribute='msdyn_incidenttypeid' operator='eq' value='", activityTypeAttributeValue[0].id, "'/>",
                        "    </filter>",
                        "    <link-entity name='ts_ovs_operationtypes_msdyn_incidenttypes' from='msdyn_incidenttypeid' to='msdyn_incidenttypeid' link-type='inner' intersect='true'>",
                        "      <attribute name='ovs_operationtypeid'/>",
                        "    </link-entity>",
                        "  </entity>",
                        "</fetch>"
                        ].join("");
                    activityTypeAssociatedOperationTypes = "?fetchXml=" + encodeURIComponent(activityTypeAssociatedOperationTypes);
    
                    Xrm.WebApi.retrieveMultipleRecords('msdyn_incidenttype', activityTypeAssociatedOperationTypes).then(
                        function success(result) {
                            for (var i = 0; i < result.entities.length; i++) {
                                activityTypeCondition += "<condition attribute='ovs_operationtypeid' operator='eq' value='" + result.entities[0]["ts_ovs_operationtypes_msdyn_incidenttypes1.ovs_operationtypeid"] + "'/>";
                            }   
                            const viewId = '{145AC9F5-4F7E-43DF-BEBD-442CB4C1F900}';
                            const entityName = "ovs_operation";
                            const viewDisplayName = "Filtered  Operations";
                            const fetchXml = '<fetch><entity name="ovs_operation"><attribute name="ts_stakeholder"/><attribute name="ovs_operationtypeid"/><attribute name="ts_site"/><order attribute="ovs_name"/><attribute name="ovs_operationid"/><attribute name="ovs_name"/><filter><condition attribute="ts_operationalstatus" operator="eq" value="717750000"/><condition attribute="statecode" operator="eq" value="0"/></filter><filter type="or">' + activityTypeCondition + '</filter></entity></fetch>';
                            const layoutXml = '<grid name="resultset" object="10010" jump="ovs_name" select="1" icon="1" preview="1"><row name="result" id="ovs_operationid"><cell name="ovs_name" width="200" /><cell name="ts_stakeholder" width="200" /><cell name="ovs_operationtypeid" width="200" /><cell name="ts_site" width="200" /></row></grid>';
    
                            form.getControl("ts_operation").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                        }
                    ); 

                }
            }
        }
    }
}