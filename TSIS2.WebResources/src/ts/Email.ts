namespace ROM.Email {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.email.Main.Email>eContext.getFormContext();

        //Filter contacts to only show the ones that are linked to the operations (from WorkOrderServiceTaskRibbon)
        //@ts-ignore
        if(formContext.data.attributes.get("contactid_0").getValue() != null && formContext.data.attributes.get("contactname_0").getValue() != null){
           //@ts-ignore
            if(formContext.data.attributes.get("contactfilter_0").getValue() != null && formContext.data.attributes.get("operationid_0").getValue() != null){

                const viewIdActivity = '{E1F2D73A-0EDC-4B6C-913E-454864A1CEE6}';
                const entityNameActivity = "contact";
                const viewDisplayNameActivity = "Filtered Contacts";
                //@ts-ignore
                const fetchXmlActivity = '<fetch distinct="true" returntotalrecordcount="true" page="1"><entity name="contact"><attribute name="fullname"/><attribute name="contactid"/><filter type="or">' + formContext.data.attributes.get("contactfilter_0")?.getValue() + '</filter><link-entity name="ts_operationcontact" from="ts_contact" to="contactid"><link-entity name="ovs_operation" from="ovs_operationid" to="ts_operation"><attribute name="ovs_operationid"/><filter><condition attribute="ovs_operationid" operator="eq" value="' + formContext.data.attributes.get("operationid_0")?.getValue() + '"/></filter></link-entity><link-entity name="ts_role" from="ts_roleid" to="ts_connectionrole" alias="role"><attribute name="ts_name"/></link-entity></link-entity></entity></fetch>';
    
                const layoutXmlActivity = '<grid name="resultset" object="2" jump="fullname" select="1" icon="1" preview="1"><row name="result" id="contactid"><cell name="fullname" width="200" /><cell name="role.ts_name" width="200" /></row></grid>';
    
                formContext.getControl("to").addCustomView(viewIdActivity, entityNameActivity, viewDisplayNameActivity, fetchXmlActivity, layoutXmlActivity, true);
                formContext.getControl("to").setEntityTypes(['contact']);
            }
            //@ts-ignore
            else if(formContext.data.attributes.get("contactid_0").getValue() != null){ //Retrieve custom parameters sent from WorkOrderServiceTaskRibbon to fill the "to" lookup field"
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
        if(formContext.data.attributes.get("regardingobjectid_0").getValue() != null && formContext.data.attributes.get("regardingobjectname_0").getValue() != null){
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
                var caseId;
                let conditionWorkOrderCase = "";
                let conditionProgramTeam = "";

                //Filter Contacts by Program team 
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
                await Xrm.WebApi.retrieveMultipleRecords("businessunit", currentUserBusinessUnitFetchXML).then(function (result) {
                    //Set condition depending on Business Unit
                    let userBusinessUnitName = result.entities[0].name;
                    if (userBusinessUnitName.startsWith("Aviation")) {
                        conditionProgramTeam = "<condition attribute='name' operator = 'like' value='%Aviation%'/>";
                    }
                    if (userBusinessUnitName.startsWith("Intermodal")) {
                        conditionProgramTeam = "<condition attribute='name' operator='like' value='%Intermodal%'/>";
                    }
                    if (userBusinessUnitName.startsWith("Transport")) {
                        conditionProgramTeam = "<condition attribute='name' operator = 'like' value='%Aviation%'/><condition attribute='name' operator='like' value='%Intermodal%'/><condition attribute='name' operator='like' value='%Transport%'/>";
                    }
                });
                //Retrieve Case related to Work Order
                let caseFetchXML = [
                    "<fetch distinct='true'>",
                    "<entity name='incident'>",
                    "<attribute name='incidentid'/>",
                    "<order attribute='title' descending='false'/>",
                    "<link-entity name='msdyn_workorder' from='msdyn_servicerequest' to='incidentid' link-type='inner' alias='hs'>",
                    "<filter type='and'>",
                    "<condition attribute='msdyn_workorderid' operator='eq' value='", workOrderId, "'/>",
                    "</filter>",
                    "</link-entity>",
                    "</entity>",
                    "</fetch>"
                ].join("");
                caseFetchXML = "?fetchXml=" + encodeURIComponent(caseFetchXML);

                let caseRelated = await Xrm.WebApi.retrieveMultipleRecords("incident", caseFetchXML);

                if (caseRelated.entities[0] != null) {
                    caseId = caseRelated.entities[0].incidentid;
                }
                //Retrieve Contacts from Case
                let caseContactsFetchXML = [
                    "<fetch top='50'>",
                    "  <entity name='contact'>",
                    "    <link-entity name='ts_operationcontact' from='ts_contact' to='contactid'>",
                    "      <link-entity name='ts_incident_ts_operationcontact' from='ts_operationcontactid' to='ts_operationcontactid' intersect='true'>",
                    "        <filter>",
                    "          <condition attribute='incidentid' operator='eq' value='", caseId, "'/>",
                    "        </filter>",
                    "      </link-entity>",
                    "    </link-entity>",
                    "    <link-entity name='businessunit' from='businessunitid' to='owningbusinessunit'>",
                    "      <filter type='or'>",
                    conditionProgramTeam,
                    "      </filter>",
                    "    </link-entity>",
                    "  </entity>",
                    "</fetch>",
                ].join("");

                caseContactsFetchXML = "?fetchXml=" + encodeURIComponent(caseContactsFetchXML);
                let caseContacts = await Xrm.WebApi.retrieveMultipleRecords("contact", caseContactsFetchXML);
                //Set condition string
                if (caseContacts.entities[0] != null) {
                    caseContacts.entities.forEach(contact => {
                        conditionWorkOrderCase += "<condition attribute='contactid' operator='eq' value='" + contact.contactid + "'/>";
                    });
                }
                //Retrieve Contacts from work Order
                var workOrderContactsFetchXML = [
                    "<fetch top='50'>",
                    "  <entity name='contact'>",
                    "    <link-entity name='ts_operationcontact' from='ts_contact' to='contactid'>",
                    "      <link-entity name='ts_msdyn_workorder_ts_operationcontact' from='ts_operationcontactid' to='ts_operationcontactid' intersect='true'>",
                    "        <filter>",
                    "          <condition attribute='msdyn_workorderid' operator='eq' value='", workOrderId, "'/>",
                    "        </filter>",
                    "      </link-entity>",
                    "    </link-entity>",
                    "    <link-entity name='businessunit' from='businessunitid' to='owningbusinessunit'>",
                    "      <filter type='or'>",
                    conditionProgramTeam,
                    "      </filter>",
                    "    </link-entity>",
                    "  </entity>",
                    "</fetch>",
                ].join("");
                workOrderContactsFetchXML = "?fetchXml=" + encodeURIComponent(workOrderContactsFetchXML);

                let workOrderContacts = await Xrm.WebApi.retrieveMultipleRecords("contact", workOrderContactsFetchXML);
                //Set condition string
                if (workOrderContacts.entities[0] != null) {
                    workOrderContacts.entities.forEach(contact => {
                        conditionWorkOrderCase += "<condition attribute='contactid' operator='eq' value='" + contact.contactid + "'/>";
                    });
                }

                var operationalContactsfetchXML;
                //Set custom view for To, CC, BCC fields
                if (conditionWorkOrderCase != "") {
                    operationalContactsfetchXML = "<fetch distinct='false'><entity name='contact'><attribute name='fullname'/><attribute name='contactid'/><order attribute='fullname' descending='false'/><filter type='and'><filter type='or'>" + conditionWorkOrderCase + "</filter></filter></entity></fetch>";

                }
                else {
                    operationalContactsfetchXML = "<fetch></fetch>";

                }
                const viewOperationalContactId = '{ed2e1b6b-2cb1-ec11-983e-002248adef00}';
                const layoutXmlContact = '<grid name="resultset" object="2" jump="lastname" select="1" icon="1" preview="1"><row name="result" id="contactid"><cell name="fullname" width="300"/></row></grid >';
                const viewDisplayName = "Contact";
                formContext.getControl("to").addCustomView(viewOperationalContactId, "contact", viewDisplayName, operationalContactsfetchXML, layoutXmlContact, true);
                formContext.getControl("cc").addCustomView(viewOperationalContactId, "contact", viewDisplayName, operationalContactsfetchXML, layoutXmlContact, true);
                formContext.getControl("bcc").addCustomView(viewOperationalContactId, "contact", viewDisplayName, operationalContactsfetchXML, layoutXmlContact, true);
            }
        }
    }
}