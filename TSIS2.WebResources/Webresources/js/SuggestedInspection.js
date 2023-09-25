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
    var SuggestedInspection;
    (function (SuggestedInspection) {
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            setOperationTypeFilteredView(form);
        }
        SuggestedInspection.onLoad = onLoad;
        function operationTypeOnChange(eContext) {
            var form = eContext.getFormContext();
            var operationTypeValue = form.getAttribute("ts_operationtype").getValue();
            if (operationTypeValue == null) {
                //Clear and lock all dependent fields
                form.getAttribute("ts_stakeholder").setValue(null);
                form.getAttribute("ts_site").setValue(null);
                form.getAttribute("ts_operation").setValue(null);
                form.getAttribute("ts_activitytype").setValue(null);
                form.getAttribute("ts_riskthreshold").setValue(null);
                form.getControl("ts_stakeholder").setDisabled(true);
                form.getControl("ts_site").setDisabled(true);
                form.getControl("ts_operation").setDisabled(true);
                form.getControl("ts_activitytype").setDisabled(true);
                form.getControl("ts_riskthreshold").setDisabled(true);
            }
            else {
                //Unlock next field
                form.getControl("ts_stakeholder").setDisabled(false);
                setStakeholderFilteredView(form);
            }
        }
        SuggestedInspection.operationTypeOnChange = operationTypeOnChange;
        function stakeholderOnChange(eContext) {
            var form = eContext.getFormContext();
            var stakeholderValue = form.getAttribute("ts_stakeholder").getValue();
            if (stakeholderValue == null) {
                //Clear and lock all dependent fields
                form.getAttribute("ts_site").setValue(null);
                form.getAttribute("ts_operation").setValue(null);
                form.getAttribute("ts_activitytype").setValue(null);
                form.getAttribute("ts_riskthreshold").setValue(null);
                form.getControl("ts_site").setDisabled(true);
                form.getControl("ts_operation").setDisabled(true);
                form.getControl("ts_activitytype").setDisabled(true);
                form.getControl("ts_riskthreshold").setDisabled(true);
            }
            else {
                //Unlock next field
                form.getControl("ts_site").setDisabled(false);
                setSiteFilteredView(form);
            }
        }
        SuggestedInspection.stakeholderOnChange = stakeholderOnChange;
        function siteOnChange(eContext) {
            return __awaiter(this, void 0, void 0, function () {
                var form, siteValue, operationTypeValue, stakeholderValue, operationTypeId, stakeholderId, siteId, fetchXml, operation, lookup;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            form = eContext.getFormContext();
                            siteValue = form.getAttribute("ts_site").getValue();
                            if (!(siteValue == null)) return [3 /*break*/, 1];
                            //Clear and lock all dependent fields
                            form.getAttribute("ts_operation").setValue(null);
                            form.getAttribute("ts_activitytype").setValue(null);
                            form.getAttribute("ts_riskthreshold").setValue(null);
                            form.getControl("ts_operation").setDisabled(true);
                            form.getControl("ts_activitytype").setDisabled(true);
                            form.getControl("ts_riskthreshold").setDisabled(true);
                            return [3 /*break*/, 3];
                        case 1:
                            operationTypeValue = form.getAttribute("ts_site").getValue();
                            stakeholderValue = form.getAttribute("ts_site").getValue();
                            operationTypeId = void 0;
                            stakeholderId = void 0;
                            siteId = void 0;
                            if (operationTypeValue != null && stakeholderValue != null) {
                                operationTypeId = operationTypeValue[0].id;
                                stakeholderId = operationTypeValue[0].id;
                                siteId = siteValue[0].id;
                            }
                            if (!(operationTypeId != null && stakeholderId != null && siteId != null)) return [3 /*break*/, 3];
                            fetchXml = [
                                "<fetch>",
                                "  <entity name='ovs_operation'>",
                                "    <attribute name='ovs_operationid'/>",
                                "    <attribute name='ts_operationalstatus'/>",
                                "    <attribute name='ovs_name'/>",
                                "    <filter>",
                                "      <condition attribute='ts_stakeholder' operator='eq' value='", stakeholderId, "' uitype='account'/>",
                                "      <condition attribute='ovs_operationtypeid' operator='eq' value='", operationTypeId, "' uitype='ovs_operationtype'/>",
                                "      <condition attribute='ts_site' operator='eq' value='", siteId, "' uitype='msdyn_functionallocation'/>",
                                "    </filter>",
                                "  </entity>",
                                "</fetch>"
                            ].join("");
                            fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
                            return [4 /*yield*/, Xrm.WebApi.retrieveMultipleRecords("ovs_operation", fetchXml).then(function success(result) {
                                    return result.entities[0];
                                })];
                        case 2:
                            operation = _a.sent();
                            if (operation != null) {
                                lookup = new Array();
                                lookup[0] = new Object();
                                lookup[0].id = operation.ovs_operationid;
                                lookup[0].name = operation.ovs_name;
                                lookup[0].entityType = 'ovs_operation';
                                if (operation.ts_operationalstatus == 717750001) {
                                    form.ui.setFormNotification((Xrm.Utility.getGlobalContext().userSettings.languageId == 1033 ? "The operation \"" + operation.ovs_name + "\" is non-operational." : "L'opération \"" + operation.ovs_name + "\" est  non opérationnelle."), "ERROR", "non-operational-operation");
                                    form.getAttribute('ts_site').setValue(null);
                                }
                                else {
                                    form.ui.clearFormNotification("non-operational-operation");
                                    form.getAttribute('ts_operation').setValue(lookup);
                                    setActivityTypeFilteredView(form);
                                }
                            }
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        SuggestedInspection.siteOnChange = siteOnChange;
        function operationOnChange(eContext) {
            var form = eContext.getFormContext();
            var operationValue = form.getAttribute("ts_operation").getValue();
            if (operationValue == null) {
                //Clear and lock all dependent fields
                form.getAttribute("ts_activitytype").setValue(null);
                form.getAttribute("ts_riskthreshold").setValue(null);
                form.getControl("ts_activitytype").setDisabled(true);
                form.getControl("ts_riskthreshold").setDisabled(true);
            }
            else {
                //Unlock next field
                form.getControl("ts_activitytype").setDisabled(false);
                setActivityTypeFilteredView(form);
            }
        }
        SuggestedInspection.operationOnChange = operationOnChange;
        function activityTypeOnChange(eContext) {
            var form = eContext.getFormContext();
            var activtyTypeValue = form.getAttribute("ts_activitytype").getValue();
            if (activtyTypeValue == null) {
                //Clear and lock all dependent fields
                form.getAttribute("ts_riskthreshold").setValue(null);
                form.getControl("ts_riskthreshold").setDisabled(true);
            }
        }
        SuggestedInspection.activityTypeOnChange = activityTypeOnChange;
        function setOperationTypeFilteredView(form) {
            var viewId = '{8982C38D-8BB4-4C95-BD05-493398FEAE99}';
            var entityName = "ovs_operationtype";
            //const viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredOperationTypes");
            var viewDisplayName = "Operation Types";
            var fetchXml = [
                "<fetch>",
                "  <entity name='ovs_operationtype'>",
                "    <attribute name='createdon'/>",
                "    <attribute name='ovs_name'/>",
                "    <attribute name='ovs_operationtypeid'/>",
                "    <link-entity name='businessunit' from='businessunitid' to='owningbusinessunit' alias='businessunit'>",
                "      <filter>",
                "        <condition attribute='name' operator='begins-with' value='Intermodal'/>",
                "      </filter>",
                "    </link-entity>",
                "    <link-entity name='ts_ovs_operationtypes_msdyn_incidenttypes' from='ovs_operationtypeid' to='ovs_operationtypeid' intersect='true'>",
                "      <link-entity name='msdyn_incidenttype' from='msdyn_incidenttypeid' to='msdyn_incidenttypeid' alias='incidenttype'>",
                "        <filter>",
                "          <condition attribute='msdyn_defaultworkordertype' operator='eq' value='b1ee680a-7cf7-ea11-a815-000d3af3a7a7' uiname='Inspection' uitype='msdyn_workordertype'/>",
                "        </filter>",
                "      </link-entity>",
                "    </link-entity>",
                "  </entity>",
                "</fetch>"
            ].join("");
            var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="ovs_operationtypeid"><cell name="ovs_name" width="200" /></row></grid>';
            form.getControl("ts_operationtype").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
        }
        function setStakeholderFilteredView(form) {
            var operationTypeValue = form.getAttribute("ts_operationtype").getValue();
            var operationTypeId;
            if (operationTypeValue != null) {
                operationTypeId = operationTypeValue[0].id;
            }
            var viewId = '{8982C38D-8BB4-4C95-BD05-493398FEAE98}';
            var entityName = "account";
            //const viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredStakeholders");
            var viewDisplayName = "Stakeholders";
            var fetchXml = [
                "<fetch>",
                "  <entity name='account'>",
                "    <attribute name='accountid'/>",
                "    <attribute name='createdon'/>",
                "    <attribute name='name'/>",
                "    <link-entity name='ovs_operation' from='ts_stakeholder' to='accountid'>",
                "      <filter>",
                "        <condition attribute='ovs_operationtypeid' operator='eq' value='", operationTypeId, "'uitype='ovs_operationtype'/>",
                "      </filter>",
                "    </link-entity>",
                "  </entity>",
                "</fetch>"
            ].join("");
            var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="accountid"><cell name="name" width="200" /></row></grid>';
            form.getControl("ts_stakeholder").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
        }
        function setSiteFilteredView(form) {
            var operationTypeValue = form.getAttribute("ts_operationtype").getValue();
            var stakeholderValue = form.getAttribute("ts_stakeholder").getValue();
            var operationTypeId;
            var stakeholderId;
            if (operationTypeValue != null && stakeholderValue != null) {
                operationTypeId = operationTypeValue[0].id;
                stakeholderId = operationTypeValue[0].id;
            }
            var viewId = '{8982C38D-8BB4-4C95-BD05-493398FEAE98}';
            var entityName = "account";
            //const viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredStakeholders");
            var viewDisplayName = "Stakeholders";
            var fetchXml = [
                "<fetch>",
                "  <entity name='msdyn_functionallocation'>",
                "    <link-entity name='ovs_operation' from='ts_site' to='msdyn_functionallocationid' alias='operation'>",
                "      <filter>",
                "        <condition attribute='ts_stakeholder' operator='eq' value='", stakeholderId, "' uitype='account'/>",
                "        <condition attribute='ovs_operationtypeid' operator='eq' value='", operationTypeId, "' uitype='ovs_operationtype'/>",
                "      </filter>",
                "    </link-entity>",
                "  </entity>",
                "</fetch>"
            ].join("");
            var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="accountid"><cell name="name" width="200" /></row></grid>';
            form.getControl("ts_stakeholder").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
        }
        function setActivityTypeFilteredView(form) {
        }
    })(SuggestedInspection = ROM.SuggestedInspection || (ROM.SuggestedInspection = {}));
})(ROM || (ROM = {}));
