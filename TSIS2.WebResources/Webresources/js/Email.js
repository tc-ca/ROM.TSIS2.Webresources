"use strict";
var ROM;
(function (ROM) {
    var Email;
    (function (Email) {
        function onLoad(eContext) {
            var _a, _b, _c, _d;
            var form = eContext.getFormContext();
            //TODO: if there are multiple op-contact in the operation, filter "partylist" to field.
            //@ts-ignore
            if (form.data.attributes.get("contactfilter_0") != null && ((_a = form.data.attributes.get("contactfilter_0")) === null || _a === void 0 ? void 0 : _a.getValue()) != null && form.data.attributes.get("operationid_0") != null && ((_b = form.data.attributes.get("operationid_0")) === null || _b === void 0 ? void 0 : _b.getValue())) {
                var viewIdActivity = '{E1F2D73A-0EDC-4B6C-913E-454864A1CEE6}';
                var entityNameActivity = "contact";
                var viewDisplayNameActivity = "Filtered Contacts";
                //@ts-ignore
                var fetchXmlActivity = '<fetch distinct="true" returntotalrecordcount="true" page="1"><entity name="contact"><attribute name="fullname"/><attribute name="contactid"/><filter type="or">' + ((_c = form.data.attributes.get("contactfilter_0")) === null || _c === void 0 ? void 0 : _c.getValue()) + '</filter><link-entity name="ts_operationcontact" from="ts_contact" to="contactid"><link-entity name="ovs_operation" from="ovs_operationid" to="ts_operation"><attribute name="ovs_operationid"/><filter><condition attribute="ovs_operationid" operator="eq" value="' + ((_d = form.data.attributes.get("operationid_0")) === null || _d === void 0 ? void 0 : _d.getValue()) + '"/></filter></link-entity><link-entity name="ts_role" from="ts_roleid" to="ts_connectionrole" alias="role"><attribute name="ts_name"/></link-entity></link-entity></entity></fetch>';
                var layoutXmlActivity = '<grid name="resultset" object="2" jump="fullname" select="1" icon="1" preview="1"><row name="result" id="contactid"><cell name="fullname" width="200" /><cell name="role.ts_name" width="200" /></row></grid>';
                form.getControl("to").addCustomView(viewIdActivity, entityNameActivity, viewDisplayNameActivity, fetchXmlActivity, layoutXmlActivity, true);
                form.getControl("to").setEntityTypes(['contact']);
            }
            //Retrieve custom parameters sent from WorkOrderServiceTaskRibbon to fill the "to" lookup field"
            else if (form.data.attributes.get("contactid_0") != null && form.data.attributes.get("contactname_0") != null) {
                var contact = new Array();
                contact[0] = new Object();
                //@ts-ignore
                contact[0].id = form.data.attributes.get("contactid_0").getValue();
                //@ts-ignore
                contact[0].name = form.data.attributes.get("contactname_0").getValue();
                contact[0].entityType = "contact";
                form.getAttribute("to").setValue(contact);
            }
        }
        Email.onLoad = onLoad;
    })(Email = ROM.Email || (ROM.Email = {}));
})(ROM || (ROM = {}));
