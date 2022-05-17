﻿namespace ROM.Email {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>) {
        var formContext = <Form.email.Main.Email>eContext.getFormContext();
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
                Xrm.WebApi.retrieveMultipleRecords("businessunit", currentUserBusinessUnitFetchXML).then(function (result) {

                    let userBusinessUnitName = result.entities[0].name;
                    if (userBusinessUnitName.startsWith("Aviation")) {
                        conditionProgramTeam = "<condition attribute='owningbusinessunitname' operator='like' value='Aviation%'/>";
                    }
                    if (userBusinessUnitName.startsWith("Intermodal")) {
                        conditionProgramTeam = "<condition attribute='owningbusinessunitname' operator='like' value='Intermodal%'/>";
                    }
                    if (userBusinessUnitName.startsWith("Transport")) {
                        conditionProgramTeam = "<condition attribute='owningbusinessunitname' operator='like' value='Aviation%'/><condition attribute='owningbusinessunitname' operator='like' value='Aviation%'/>";
                    }
                });
                var caseCon;
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
                // let contactsCase;
                let CaseId = await Xrm.WebApi.retrieveMultipleRecords("incident", caseFetchXML);

                if (CaseId.entities[0] != null) {
                    caseId = CaseId.entities[0].incidentid;
                    }
              

                //Retrieve Contacts related to Case
                let caseContactsFetchXML = [
                    "<fetch distinct='true'>",
                    "<entity name ='contact'>",
                    "<attribute name='fullname'/>",
                    "<attribute name='contactid'/>",
                    "<link-entity name='ts_operationcontact' from='ts_contact' to='contactid' link-type='inner' alias='fj'>",
                    "<filter type='or'>",
                    conditionProgramTeam,
                    "</filter>",
                    "<link-entity name='ts_incident_ts_operationcontact' from='ts_operationcontactid' to='ts_operationcontactid' visible='false' intersect='true'>",
                    "<link-entity name='incident' from='incidentid' to='incidentid' alias='fs'>",
                    "<filter type='and'>",
                    "<condition attribute='incidentid' operator='eq' value='", caseId, "'/>",
                    "</filter>",
                    "</link-entity>",
                    "</link-entity>",
                    "</link-entity>",
                    "</entity>",
                    "</fetch>"
                ].join("");

                caseContactsFetchXML = "?fetchXml=" + encodeURIComponent(caseContactsFetchXML);
                let promiseCaseContacts = await Xrm.WebApi.retrieveMultipleRecords("contact", caseContactsFetchXML);
                if (promiseCaseContacts.entities[0] != null) {
                    promiseCaseContacts.entities.forEach(contact => {
                            conditionWorkOrderCase += "<condition attribute='contactid' operator='eq' value='" + contact.contactid + "'/>";
                        });
                    }            

                //Retrieve Contacts related to Work Order
                let workOrderContactsFetchXML = [
                    "<fetch distinct='true'>",
                    "<entity name ='contact'>",
                    "<attribute name='fullname'/>",
                    "<attribute name='contactid'/>",
                    "<link-entity name='ts_operationcontact' from='ts_contact' to='contactid' link-type='inner' alias='fj'>",
                    "<filter type='or'>",
                    conditionProgramTeam,
                    "</filter>",
                    "<link-entity name='ts_msdyn_workorder_ts_operationcontact' from='ts_operationcontactid' to='ts_operationcontactid' visible='false' intersect='true'>",
                    "<link-entity name='msdyn_workorder' from='msdyn_workorderid' to='msdyn_workorderid' alias='fk'>",
                    "<filter type='and'>",
                    "<condition attribute='msdyn_workorderid' operator='eq' value='", workOrderId, "'/>",
                    "</filter>",
                    "</link-entity>",
                    "</link-entity>",
                    "</link-entity>",
                    "</entity>",
                    "</fetch>"
                ].join("");
                workOrderContactsFetchXML = "?fetchXml=" + encodeURIComponent(workOrderContactsFetchXML);

                let promiseWorkOrderContacts = await Xrm.WebApi.retrieveMultipleRecords("contact", workOrderContactsFetchXML);
                if (promiseWorkOrderContacts.entities[0] != null) {
                    promiseWorkOrderContacts.entities.forEach(contact => {
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