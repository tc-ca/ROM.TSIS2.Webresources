namespace ROM.Email {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.email.Main.Email>eContext.getFormContext();

        //Filter contacts to only show the ones that are linked to the operations (from WorkOrderServiceTaskRibbon)
        //@ts-ignore
        if (formContext.data.attributes.get("contactid_0").getValue() != null && formContext.data.attributes.get("contactname_0").getValue() != null) {
            //@ts-ignore
            if (formContext.data.attributes.get("contactfilter_0").getValue() != null && formContext.data.attributes.get("regardingobjectid_0").getValue() != null) {

                const viewIdActivity = '{E1F2D73A-0EDC-4B6C-913E-454864A1CEE6}';
                const entityNameActivity = "contact";
                const viewDisplayNameActivity = "Filtered Contacts";

                //@ts-ignore
                const fetchXmlActivity = '<fetch distinct="true" returntotalrecordcount="true" page="1"><entity name="contact"><attribute name="fullname"/><attribute name="contactid"/><filter type="or">' + formContext.data.attributes.get("contactfilter_0")?.getValue() + '</filter><link-entity name="ts_contact_msdyn_workorder" intersect="true" visible="false" to="contactid" from="contactid"><link-entity name="msdyn_workorder" from="msdyn_workorderid" to="msdyn_workorderid" alias="bb"><filter type="and"><condition attribute="msdyn_workorderid" operator="eq" value="' + formContext.data.attributes.get("workorderid_0")?.getValue() + '"/></filter></link-entity></link-entity></entity></fetch>';

                const layoutXmlActivity = '<grid name="resultset" object="2" jump="fullname" select="1" icon="1" preview="1"><row name="result" id="contactid"><cell name="fullname" width="200" /></row></grid>';

                formContext.getControl("to").addCustomView(viewIdActivity, entityNameActivity, viewDisplayNameActivity, fetchXmlActivity, layoutXmlActivity, true);
                formContext.getControl("to").setEntityTypes(['contact']);
            }
            //@ts-ignore
            else if (formContext.data.attributes.get("contactid_0").getValue() != null) { //Retrieve custom parameters sent from WorkOrderServiceTaskRibbon to fill the "to" lookup field"
                let contact = new Array();
                contact[0] = new Object();
                //@ts-ignore
                contact[0].id = formContext.data.attributes.get("contactid_0").getValue();
                //@ts-ignore
                contact[0].name = formContext.data.attributes.get("contactname_0").getValue();
                contact[0].entityType = "contact";
                formContext.getAttribute("to").setValue(contact);
            }
        }

        //Fill regarding field
        //@ts-ignore
        if (formContext.data.attributes.get("regardingobjectid_0").getValue() != null && formContext.data.attributes.get("regardingobjectname_0").getValue() != null) {
            //Retrieve custom parameters sent from WorkOrderServiceTaskRibbon to fill the "regardingobjectid" lookup field"
            let regarding = new Array();
            regarding[0] = new Object();
            //@ts-ignore
            regarding[0].id = formContext.data.attributes.get("regardingobjectid_0").getValue();
            //@ts-ignore
            regarding[0].name = formContext.data.attributes.get("regardingobjectname_0").getValue();
            regarding[0].entityType = "msdyn_workorderservicetask";
            formContext.getAttribute("regardingobjectid").setValue(regarding);
        }


        var regarding = formContext.getAttribute("regardingobjectid").getValue();
        if (regarding !== null) {
            // Check Regarding entity equals to Work Order
            if (regarding[0].entityType === "msdyn_workorder") {
                var workOrderId = regarding[0].id;
                //Restrict To, CC, BCC fields with Contact and User Entity
                formContext.getControl("to").setEntityTypes(['contact', 'systemuser']);
                formContext.getControl("cc").setEntityTypes(['contact', 'systemuser']);
                formContext.getControl("bcc").setEntityTypes(['contact', 'systemuser']);
                //Set From field to Work Order Owner
                let ownerFetchXML = [
                    "<fetch>",
                    "<entity name='systemuser'>",
                    "<attribute name='systemuserid'/>",
                    "<attribute name='fullname'/>",
                    "<link-entity name='msdyn_workorder' from='owninguser' to='systemuserid' link-type='inner' alias='bm'>",
                    "<filter type='and'>",
                    "<condition attribute='msdyn_workorderid' operator='eq' value='", workOrderId, "'/>",
                    "</filter>",
                    "</link-entity>",
                    "</entity >",
                    "</fetch >"
                ].join("");
                ownerFetchXML = "?fetchXml=" + encodeURIComponent(ownerFetchXML);
                Xrm.WebApi.online.retrieveMultipleRecords("systemuser", ownerFetchXML).then(function success(result) {
                    var lookup = new Array();
                    lookup[0] = new Object();
                    lookup[0].id = result.entities[0].ownerid;
                    lookup[0].name = result.entities[0].fullname;
                    lookup[0].entityType = "systemuser";
                    formContext.getAttribute("from").setValue(lookup);
                });
            }
            if (regarding[0].entityType === "incident") {
                var workOrderId = regarding[0].id;
                //Remove default value from To if it's a new record
                if (formContext.ui.getFormType() == 1) {
                    formContext.getAttribute("to").setValue(null);
                }
                //Restrict To, CC, BCC fields with Contact and User Entity
                formContext.getControl("to").setEntityTypes(['contact', 'systemuser']);
                formContext.getControl("cc").setEntityTypes(['contact', 'systemuser']);
                formContext.getControl("bcc").setEntityTypes(['contact', 'systemuser']);

            }
        }
        filterContacts(eContext);
    }

    async function filterContacts(eContext: Xrm.ExecutionContext<any, any>) {
        var formContext = <Form.email.Main.Email>eContext.getFormContext();
        var regarding = formContext.getAttribute("regardingobjectid").getValue();
        if (regarding !== null) {
            // Check Regarding entity equals to Work Order
            if (regarding[0].entityType === "msdyn_workorder") {
                var workOrderId = regarding[0].id;

                //Retrieve Contacts from related businessunit
                let workOrderContactsFetchXML = [
                    "<fetch xmlns:generator='MarkMpn.SQL4CDS'>",
                    "  <entity name='contact'>",
                    "    <attribute name='contactid' />",
                    "    <attribute name='owningbusinessunit' />",
                    "    <link-entity name='msdyn_workorder' to='owningbusinessunit' from='owningbusinessunit' alias='msdyn_workorder' link-type='inner'>",
                    "      <filter>",
                    "        <condition attribute='msdyn_workorderid' operator='eq' value='", workOrderId, "'/>",
                    "      </filter>",
                    "    </link-entity>",
                    "  </entity>",
                    "</fetch>",
                ].join("");

                //Set custom view for To, CC, BCC fields
                const viewContactId = '{73e123a5-2d58-4642-a298-6d7e4edc089e}';
                const layoutXmlContact = '<grid name="resultset" object="2" jump="lastname" select="1" icon="1" preview="1"><row name="result" id="contactid"><cell name="fullname" width="300"/></row></grid >';
                const viewDisplayName = "Contact";
                formContext.getControl("to").addCustomView(viewContactId, "contact", viewDisplayName, workOrderContactsFetchXML, layoutXmlContact, true);
                formContext.getControl("cc").addCustomView(viewContactId, "contact", viewDisplayName, workOrderContactsFetchXML, layoutXmlContact, true);
                formContext.getControl("bcc").addCustomView(viewContactId, "contact", viewDisplayName, workOrderContactsFetchXML, layoutXmlContact, true);
            }
            if (regarding[0].entityType === "incident") {
                var currentCaseId = regarding[0].id;

                //Retrieve Contacts from Case
                let caseContactsFetchXML = [
                    "<fetch>",
                    "  <entity name='contact'>",
                    "    <link-entity name='ts_contact_incident' from='contactid' to='contactid' intersect='true'>",
                    "      <link-entity name='incident' from='incidentid' to='incidentid'>",
                    "        <filter>",
                    "          <condition attribute='incidentid' operator='eq' value='", currentCaseId, "'/>",
                    "        </filter>",
                    "      </link-entity>",
                    "    </link-entity>",
                    "</fetch>",
                ].join("");

                //Set custom view for To, CC, BCC fields
                const viewContactId = '{ed2e1b6b-2cb1-ec11-983e-002248adef01}';
                const layoutXmlContact = '<grid name="resultset" object="2" jump="lastname" select="1" icon="1" preview="1"><row name="result" id="contactid"><cell name="fullname" width="300"/></row></grid >';
                const viewDisplayName = "Contact";
                formContext.getControl("to").addCustomView(viewContactId, "contact", viewDisplayName, caseContactsFetchXML, layoutXmlContact, true);
                formContext.getControl("cc").addCustomView(viewContactId, "contact", viewDisplayName, caseContactsFetchXML, layoutXmlContact, true);
                formContext.getControl("bcc").addCustomView(viewContactId, "contact", viewDisplayName, caseContactsFetchXML, layoutXmlContact, true);
            }
        }
    }
}