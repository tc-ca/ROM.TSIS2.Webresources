namespace ROM.Email {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.email.Main.Email>eContext.getFormContext();

        //TODO: if there are multiple op-contact in the operation, filter "partylist" to field.
        //@ts-ignore
        if(form.data.attributes.get("contactfilter_0") != null && form.data.attributes.get("contactfilter_0")?.getValue() != null && form.data.attributes.get("operationid_0") != null && form.data.attributes.get("operationid_0")?.getValue()){

            const viewIdActivity = '{E1F2D73A-0EDC-4B6C-913E-454864A1CEE6}';
            const entityNameActivity = "contact";
            const viewDisplayNameActivity = "Filtered Contacts";
            //@ts-ignore
            const fetchXmlActivity = '<fetch distinct="true" returntotalrecordcount="true" page="1"><entity name="contact"><attribute name="fullname"/><attribute name="contactid"/><filter type="or">' + form.data.attributes.get("contactfilter_0")?.getValue() + '</filter><link-entity name="ts_operationcontact" from="ts_contact" to="contactid"><link-entity name="ovs_operation" from="ovs_operationid" to="ts_operation"><attribute name="ovs_operationid"/><filter><condition attribute="ovs_operationid" operator="eq" value="' + form.data.attributes.get("operationid_0")?.getValue() + '"/></filter></link-entity><link-entity name="ts_role" from="ts_roleid" to="ts_connectionrole" alias="role"><attribute name="ts_name"/></link-entity></link-entity></entity></fetch>';

            const layoutXmlActivity = '<grid name="resultset" object="2" jump="fullname" select="1" icon="1" preview="1"><row name="result" id="contactid"><cell name="fullname" width="200" /><cell name="role.ts_name" width="200" /></row></grid>';

            form.getControl("to").addCustomView(viewIdActivity, entityNameActivity, viewDisplayNameActivity, fetchXmlActivity, layoutXmlActivity, true);
            form.getControl("to").setEntityTypes(['contact']);
        }

        //Retrieve custom parameters sent from WorkOrderServiceTaskRibbon to fill the "to" lookup field"
        else if(form.data.attributes.get("contactid_0") != null && form.data.attributes.get("contactname_0") != null){            
            let contact = new Array();
            contact[0] = new Object();
            //@ts-ignore
            contact[0].id = form.data.attributes.get("contactid_0").getValue();
            //@ts-ignore
            contact[0].name = form.data.attributes.get("contactname_0").getValue();
            contact[0].entityType = "contact";
            form.getAttribute("to").setValue(contact);
        }
    }
}