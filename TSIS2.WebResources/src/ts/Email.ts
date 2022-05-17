namespace ROM.Email {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.email.Main.Email>eContext.getFormContext();

        //TODO: if there are multiple op-contact in the operation, filter "partylist" to field.
        // //@ts-ignore
        // if(form.data.attributes.get("contactfilter_0") != null && form.data.attributes.get("contactfilter_0")?.getValue() != null){

        //     const viewIdActivity = '{E1F2D73A-0EDC-4B6C-913E-454864A1CEE6}';
        //     const entityNameActivity = "contact";
        //     const viewDisplayNameActivity = "Filtered Contacts";
        //     //@ts-ignore
        //     const fetchXmlActivity = '<fetch version="1.0" mapping="logical"><entity name="contact"><attribute name="fullname"/><attribute name="contactid"/><filter type="and"><condition attribute="statecode" operator="eq" value="0"/>' + form.data.attributes.get("contactfilter_0")?.getValue() + '</filter><link-entity name="ts_operationcontact" from="ts_contact" to="contactid"><attribute name="ts_connectionrole"/><link-entity name="ovs_operation" from="ovs_operationid" to="ts_operation"><attribute name="ts_stakeholder"/></link-entity></link-entity></entity></fetch>';
        //     const layoutXmlActivity = '<grid name="resultset" object="10010" jump="fullname" select="1" icon="1" preview="1"><row name="result" id="contactid"><cell name="ts_stakeholder" width="200" /><cell name="ts_connectionrole" width="200" /></row></grid>';
        //     form.getControl("to").addCustomView(viewIdActivity, entityNameActivity, viewDisplayNameActivity, fetchXmlActivity, layoutXmlActivity, true);
        // }

        // else 
        if(form.data.attributes.get("contactid_0") != null && form.data.attributes.get("contactname_0") != null){            
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