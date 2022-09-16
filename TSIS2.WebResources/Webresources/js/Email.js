"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var ROM;
(function (ROM) {
    var Email;
    (function (Email) {
        function onLoad(eContext) {
            var _a, _b;
            var formContext = eContext.getFormContext();
            //Filter contacts to only show the ones that are linked to the operations (from WorkOrderServiceTaskRibbon)
            //@ts-ignore
            if (formContext.data.attributes.get("contactid_0").getValue() != null && formContext.data.attributes.get("contactname_0").getValue() != null) {
                //@ts-ignore
                if (formContext.data.attributes.get("contactfilter_0").getValue() != null && formContext.data.attributes.get("regardingobjectid_0").getValue() != null) {
                    var viewIdActivity = '{E1F2D73A-0EDC-4B6C-913E-454864A1CEE6}';
                    var entityNameActivity = "contact";
                    var viewDisplayNameActivity = "Filtered Contacts";
                    //@ts-ignore
                    var fetchXmlActivity = '<fetch distinct="true" returntotalrecordcount="true" page="1"><entity name="contact"><attribute name="fullname"/><attribute name="contactid"/><filter type="or">' + ((_a = formContext.data.attributes.get("contactfilter_0")) === null || _a === void 0 ? void 0 : _a.getValue()) + '</filter><link-entity name="ts_contact_msdyn_workorder" intersect="true" visible="false" to="contactid" from="contactid"><link-entity name="msdyn_workorder" from="msdyn_workorderid" to="msdyn_workorderid" alias="bb"><filter type="and"><condition attribute="msdyn_workorderid" operator="eq" value="' + ((_b = formContext.data.attributes.get("workorderid_0")) === null || _b === void 0 ? void 0 : _b.getValue()) + '"/></filter></link-entity></link-entity></entity></fetch>';
                    var layoutXmlActivity = '<grid name="resultset" object="2" jump="fullname" select="1" icon="1" preview="1"><row name="result" id="contactid"><cell name="fullname" width="200" /></row></grid>';
                    formContext.getControl("to").addCustomView(viewIdActivity, entityNameActivity, viewDisplayNameActivity, fetchXmlActivity, layoutXmlActivity, true);
                    formContext.getControl("to").setEntityTypes(['contact']);
                }
                //@ts-ignore
                else if (formContext.data.attributes.get("contactid_0").getValue() != null) { //Retrieve custom parameters sent from WorkOrderServiceTaskRibbon to fill the "to" lookup field"
                    var contact = new Array();
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
                var regarding_1 = new Array();
                regarding_1[0] = new Object();
                //@ts-ignore
                regarding_1[0].id = formContext.data.attributes.get("regardingobjectid_0").getValue();
                //@ts-ignore
                regarding_1[0].name = formContext.data.attributes.get("regardingobjectname_0").getValue();
                regarding_1[0].entityType = "msdyn_workorderservicetask";
                formContext.getAttribute("regardingobjectid").setValue(regarding_1);
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
                    var ownerFetchXML = [
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
        Email.onLoad = onLoad;
        function filterContacts(eContext) {
            return __awaiter(this, void 0, void 0, function () {
                var formContext, regarding, workOrderId, workOrderContactsFetchXML, viewContactId, layoutXmlContact, viewDisplayName, currentCaseId, caseContactsFetchXML, viewContactId, layoutXmlContact, viewDisplayName;
                return __generator(this, function (_a) {
                    formContext = eContext.getFormContext();
                    regarding = formContext.getAttribute("regardingobjectid").getValue();
                    if (regarding !== null) {
                        // Check Regarding entity equals to Work Order
                        if (regarding[0].entityType === "msdyn_workorder") {
                            workOrderId = regarding[0].id;
                            workOrderContactsFetchXML = [
                                "<fetch>",
                                "  <entity name='contact'>",
                                "    <link-entity name='ts_contact_msdyn_workorder' from='contactid' to='contactid' intersect='true'>",
                                "      <link-entity name='msdyn_workorder' from='msdyn_workorderid' to='msdyn_workorderid'>",
                                "        <filter>",
                                "          <condition attribute='msdyn_workorderid' operator='eq' value='", workOrderId, "'/>",
                                "        </filter>",
                                "      </link-entity>",
                                "    </link-entity>",
                                "</fetch>",
                            ].join("");
                            viewContactId = '{73e123a5-2d58-4642-a298-6d7e4edc089e}';
                            layoutXmlContact = '<grid name="resultset" object="2" jump="lastname" select="1" icon="1" preview="1"><row name="result" id="contactid"><cell name="fullname" width="300"/></row></grid >';
                            viewDisplayName = "Contact";
                            formContext.getControl("to").addCustomView(viewContactId, "contact", viewDisplayName, workOrderContactsFetchXML, layoutXmlContact, true);
                            formContext.getControl("cc").addCustomView(viewContactId, "contact", viewDisplayName, workOrderContactsFetchXML, layoutXmlContact, true);
                            formContext.getControl("bcc").addCustomView(viewContactId, "contact", viewDisplayName, workOrderContactsFetchXML, layoutXmlContact, true);
                        }
                        if (regarding[0].entityType === "incident") {
                            currentCaseId = regarding[0].id;
                            caseContactsFetchXML = [
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
                            viewContactId = '{ed2e1b6b-2cb1-ec11-983e-002248adef01}';
                            layoutXmlContact = '<grid name="resultset" object="2" jump="lastname" select="1" icon="1" preview="1"><row name="result" id="contactid"><cell name="fullname" width="300"/></row></grid >';
                            viewDisplayName = "Contact";
                            formContext.getControl("to").addCustomView(viewContactId, "contact", viewDisplayName, caseContactsFetchXML, layoutXmlContact, true);
                            formContext.getControl("cc").addCustomView(viewContactId, "contact", viewDisplayName, caseContactsFetchXML, layoutXmlContact, true);
                            formContext.getControl("bcc").addCustomView(viewContactId, "contact", viewDisplayName, caseContactsFetchXML, layoutXmlContact, true);
                        }
                    }
                    return [2 /*return*/];
                });
            });
        }
    })(Email = ROM.Email || (ROM.Email = {}));
})(ROM || (ROM = {}));
