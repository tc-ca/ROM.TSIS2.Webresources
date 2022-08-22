namespace ROM.IncidentType {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_incidenttype.Main.Information>eContext.getFormContext();

        //If viewing a record
        if(form.ui.getFormType() == 2 || form.ui.getFormType() == 3 || form.ui.getFormType() == 4){
            Xrm.WebApi.retrieveRecord('msdyn_incidenttype', form.data.entity.getId(), "?$select=_owningbusinessunit_value").then(
                function success(incidenttype) {
                    let businessUnitfetchXml = [
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
                        if(result.entities[0].name.startsWith("Aviation")){
                            form.ui.tabs.get("operation_activity_tab").setVisible(true);
                        }  
                    });                     
                }
            );
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