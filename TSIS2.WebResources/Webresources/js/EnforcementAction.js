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
    var EnforcementAction;
    (function (EnforcementAction) {
        function onLoad(eContext) {
            var formContext = eContext.getFormContext();
            //Enable type of enforcement action field if user is Admin
            if (formContext.ui.getFormType() == 2 || formContext.ui.getFormType() == 3) {
                var userRoles = Xrm.Utility.getGlobalContext().userSettings.roles;
                userRoles.forEach(function (role) {
                    if (role.name == "System Administrator") {
                        formContext.getControl("ts_typeofenforcementaction").setDisabled(false);
                    }
                });
            }
            var referralToREUEnforcementAction = formContext.getAttribute("ts_typeofenforcementaction").getValue() == 717750002;
            //Set fields visible if ISSO
            var userId = Xrm.Utility.getGlobalContext().userSettings.userId;
            var currentUserBusinessUnitFetchXML = [
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
                return __awaiter(this, void 0, void 0, function () {
                    var userBusinessUnitId, inISSOBU, caseAttribute, caseAttributeValue, caseId;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                userBusinessUnitId = result.entities[0].businessunitid;
                                return [4 /*yield*/, isISSOBU(userBusinessUnitId)];
                            case 1:
                                inISSOBU = _a.sent();
                                if (inISSOBU) {
                                    formContext.getControl("ts_details").setVisible(true);
                                    //Don't need that for now (PBI 242536)
                                    //formContext.getControl("ts_elevatedenforcementactionrequired").setVisible(true);
                                    //if (formContext.getAttribute("ts_elevatedenforcementactionrequired").getValue()) {
                                    //    formContext.getControl("ts_justificationelevatedenforcementaction").setVisible(true);
                                    //    formContext.getAttribute("ts_justificationelevatedenforcementaction").setRequiredLevel("required");
                                    //}
                                    //Hide fields for ISSO if type of enforcement action is set to "Referral to REU"
                                    if (referralToREUEnforcementAction) {
                                        hideFieldsWhenTypeOfEnforcementActionSetToReferralToREUForISSO(formContext);
                                    }
                                }
                                else {
                                    if (referralToREUEnforcementAction) {
                                        caseAttribute = formContext.getAttribute("regardingobjectid");
                                        if (caseAttribute != null) {
                                            caseAttributeValue = caseAttribute.getValue();
                                            if (caseAttributeValue != null) {
                                                caseId = caseAttributeValue[0].id;
                                                Xrm.WebApi.retrieveRecord('incident', caseId, "?$select=_owningbusinessunit_value").then(function success(incident) {
                                                    return __awaiter(this, void 0, void 0, function () {
                                                        var isISSO;
                                                        return __generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0: return [4 /*yield*/, isISSOBU(incident._owningbusinessunit_value)];
                                                                case 1:
                                                                    isISSO = _a.sent();
                                                                    if (isISSO) {
                                                                        hideFieldsWhenTypeOfEnforcementActionSetToReferralToREUForISSO(formContext);
                                                                    }
                                                                    return [2 /*return*/];
                                                            }
                                                        });
                                                    });
                                                });
                                            }
                                        }
                                    }
                                }
                                return [2 /*return*/];
                        }
                    });
                });
            });
            additionalDetailsVisibility(formContext);
            //Since Operation contact was removed from ROM (app designer)
            //filterRepresentative(formContext);
            filterCompany(formContext);
        }
        EnforcementAction.onLoad = onLoad;
        function hideFieldsWhenTypeOfEnforcementActionSetToReferralToREUForISSO(formContext) {
            formContext.getControl("ts_dateandtimeofserviceofenforcementaction").setVisible(false);
            formContext.getControl("ts_comments").setVisible(false);
            formContext.getControl("ts_copyofreceipt").setVisible(false);
            //Don't need that for now (PBI 242536)
            // formContext.getControl("ts_elevatedenforcementactionrequired").setVisible(false);
            formContext.getControl("ts_details").setVisible(true);
        }
        function onSave(eContext) {
        }
        EnforcementAction.onSave = onSave;
        function filterRepresentative(formContext) {
            var viewId = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F770}';
            var entityName = "contact";
            var viewDisplayName = "Filtered Contacts";
            var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" no-lock="false" returntotalrecordcount="true" page="1" count="25"><entity name="contact"><attribute name="statecode"/><attribute name="contactid"/><attribute name="fullname"/><link-entity name="ts_operationcontact" from="ts_contact" to="contactid"><link-entity name="ovs_operation" from="ovs_operationid" to="ts_operation"><link-entity name="msdyn_workorder" from="ovs_operationid" to="ovs_operationid"><link-entity name="incident" from="incidentid" to="msdyn_servicerequest" link-type="inner"><link-entity name="ts_enforcementaction" from="regardingobjectid" to="incidentid" link-type="inner"><filter><condition attribute="activityid" operator="eq" value="' + formContext.data.entity.getId() + '"/></filter></link-entity></link-entity></link-entity></link-entity><link-entity name="ts_role" from="ts_roleid" to="ts_connectionrole" link-type="inner"><attribute name="ts_name" alias="role"/></link-entity></link-entity><order attribute="fullname" descending="false"/></entity></fetch>';
            var layoutXml = '<grid name="resultset" object="2" jump="fullname" select="1" icon="1" preview="1"><row name="result" id="contactid"><cell name="fullname" width="200" /><cell name="role.ts_name" width="200" /></row></grid>';
            formContext.getControl("ts_verbalwarninggivento").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
            formContext.getControl("ts_writtenwarningsentto").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
        }
        function filterCompany(formContext) {
            var viewId = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F880}';
            var entityName = "account";
            var viewDisplayName = "Filtered Accounts";
            var fetchXml = '<fetch count="25" distinct="true" returntotalrecordcount="true" page="1"><entity name="account"><attribute name="name"/><attribute name="ts_stakeholderstatus"/><link-entity name="msdyn_workorder" from="msdyn_serviceaccount" to="accountid" link-type="inner"><link-entity name="incident" from="incidentid" to="msdyn_servicerequest"><link-entity name="ts_enforcementaction" from="regardingobjectid" to="incidentid"><filter><condition attribute="activityid" operator="eq" value="' + formContext.data.entity.getId() + '"/></filter></link-entity></link-entity></link-entity></entity></fetch>';
            var layoutXml = '<grid name="resultset" object="2" jump="name" select="1" icon="1" preview="1"><row name="result" id="activityid"><cell name="name" width="200" /><cell name="ts_stakeholderstatus" width="200" /></row></grid>';
            formContext.getControl("ts_individualcompany").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
        }
        function typeOnChange(eContext) {
            var formContext = eContext.getFormContext();
            additionalDetailsVisibility(formContext);
        }
        EnforcementAction.typeOnChange = typeOnChange;
        function additionalDetailsVisibility(formContext) {
            var typeAttributeValue = formContext.getAttribute("ts_typeofenforcementaction").getValue();
            if (typeAttributeValue != null && typeAttributeValue == 717750000 /* VerbalWarning */) {
                formContext.ui.tabs.get("general").sections.get("additional_details").setVisible(true);
                formContext.getControl("ts_verbalwarninggivento").setVisible(true);
                formContext.getControl("ts_individualposition").setVisible(true);
                formContext.getControl("ts_individualcompany").setVisible(true);
                formContext.getControl("ts_verbalwarningdeliverylocation").setVisible(true);
                formContext.getAttribute("ts_verbalwarninggivento").setRequiredLevel("required");
                formContext.getAttribute("ts_individualposition").setRequiredLevel("required");
                formContext.getAttribute("ts_individualcompany").setRequiredLevel("required");
                formContext.getAttribute("ts_verbalwarningdeliverylocation").setRequiredLevel("required");
                formContext.getAttribute("ts_writtenwarningsentto").setValue();
                formContext.getAttribute("ts_writtenwarningdeliverymethod").setValue();
                formContext.getControl("ts_writtenwarningsentto").setVisible(false);
                formContext.getControl("ts_writtenwarningdeliverymethod").setVisible(false);
                formContext.getAttribute("ts_writtenwarningsentto").setRequiredLevel("none");
                formContext.getAttribute("ts_writtenwarningdeliverymethod").setRequiredLevel("none");
            }
            else if (typeAttributeValue != null && typeAttributeValue == 717750001 /* WrittenWarning */) {
                formContext.ui.tabs.get("general").sections.get("additional_details").setVisible(true);
                formContext.getControl("ts_writtenwarningsentto").setVisible(true);
                formContext.getControl("ts_individualposition").setVisible(true);
                formContext.getControl("ts_individualcompany").setVisible(true);
                formContext.getControl("ts_writtenwarningdeliverymethod").setVisible(true);
                formContext.getAttribute("ts_writtenwarningsentto").setRequiredLevel("required");
                formContext.getAttribute("ts_individualposition").setRequiredLevel("required");
                formContext.getAttribute("ts_individualcompany").setRequiredLevel("required");
                formContext.getAttribute("ts_writtenwarningdeliverymethod").setRequiredLevel("required");
                formContext.getAttribute("ts_verbalwarninggivento").setValue();
                formContext.getAttribute("ts_verbalwarningdeliverylocation").setValue();
                formContext.getControl("ts_verbalwarninggivento").setVisible(false);
                formContext.getControl("ts_verbalwarningdeliverylocation").setVisible(false);
                formContext.getAttribute("ts_verbalwarninggivento").setRequiredLevel("none");
                formContext.getAttribute("ts_verbalwarningdeliverylocation").setRequiredLevel("none");
            }
            else {
                formContext.ui.tabs.get("general").sections.get("additional_details").setVisible(false);
                formContext.getAttribute("ts_verbalwarninggivento").setValue();
                formContext.getAttribute("ts_writtenwarningsentto").setValue();
                formContext.getAttribute("ts_individualposition").setValue();
                formContext.getAttribute("ts_individualcompany").setValue();
                formContext.getAttribute("ts_verbalwarningdeliverylocation").setValue();
                formContext.getAttribute("ts_writtenwarningdeliverymethod").setValue();
                formContext.getControl("ts_verbalwarninggivento").setVisible(false);
                formContext.getControl("ts_writtenwarningsentto").setVisible(false);
                formContext.getControl("ts_individualposition").setVisible(false);
                formContext.getControl("ts_individualcompany").setVisible(false);
                formContext.getControl("ts_verbalwarningdeliverylocation").setVisible(false);
                formContext.getControl("ts_writtenwarningdeliverymethod").setVisible(false);
                formContext.getAttribute("ts_verbalwarninggivento").setRequiredLevel("none");
                formContext.getAttribute("ts_writtenwarningsentto").setRequiredLevel("none");
                formContext.getAttribute("ts_individualposition").setRequiredLevel("none");
                formContext.getAttribute("ts_individualcompany").setRequiredLevel("none");
                formContext.getAttribute("ts_verbalwarningdeliverylocation").setRequiredLevel("none");
            }
        }
        EnforcementAction.additionalDetailsVisibility = additionalDetailsVisibility;
        //Don't need that for now (PBI 242536)
        //export function elevatedEnforcementActionRequiredOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        //    let formContext = <Form.ts_enforcementaction.Main.Information>eContext.getFormContext();
        //    if (formContext.getAttribute("ts_elevatedenforcementactionrequired").getValue()) {
        //        formContext.getControl("ts_justificationelevatedenforcementaction").setVisible(true);
        //        formContext.getAttribute("ts_justificationelevatedenforcementaction").setRequiredLevel("required");
        //    }
        //    else {
        //        formContext.getControl("ts_justificationelevatedenforcementaction").setVisible(false);
        //        formContext.getAttribute("ts_justificationelevatedenforcementaction").setRequiredLevel("none");
        //        formContext.getAttribute("ts_justificationelevatedenforcementaction").setValue();
        //    }
        //}
    })(EnforcementAction = ROM.EnforcementAction || (ROM.EnforcementAction = {}));
})(ROM || (ROM = {}));
