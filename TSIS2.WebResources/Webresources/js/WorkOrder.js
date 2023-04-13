﻿"use strict";
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
/* eslint-disable @typescript-eslint/triple-slash-reference */
var ROM;
(function (ROM) {
    var WorkOrder;
    (function (WorkOrder) {
        var isFromCase = false; //Boolean status to track if the work order is being created from a case
        var isFromSecurityIncident = false;
        var currentSystemStatus;
        var currentStatus;
        // EVENTS
        function onLoad(eContext) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            var form = eContext.getFormContext();
            var state = (_a = form.getAttribute("statecode").getValue()) !== null && _a !== void 0 ? _a : null;
            var regionAttribute = form.getAttribute("ts_region");
            var regionAttributeValue = regionAttribute.getValue();
            var ownerControl = form.getControl("ownerid");
            var headerOwnerControl = form.getControl("header_ownerid");
            //Set comment field visible if AvSec
            var userBusinessUnitName;
            var userId = Xrm.Utility.getGlobalContext().userSettings.userId;
            var currentUserBusinessUnitFetchXML = [
                "<fetch top='50'>",
                "  <entity name='businessunit'>",
                "    <attribute name='name' />",
                "    <attribute name='businessunitid' />",
                "    <link-entity name='systemuser' from='businessunitid' to='businessunitid' link-type='inner' alias='ab'>>",
                "      <filter>",
                "        <condition attribute='systemuserid' operator='eq' value='", userId, "'/>",
                "      </filter>",
                "    </link-entity>",
                "  </entity>",
                "</fetch>",
            ].join("");
            currentUserBusinessUnitFetchXML = "?fetchXml=" + encodeURIComponent(currentUserBusinessUnitFetchXML);
            Xrm.WebApi.retrieveMultipleRecords("businessunit", currentUserBusinessUnitFetchXML).then(function (businessunit) {
                userBusinessUnitName = businessunit.entities[0].name;
                if (userBusinessUnitName.startsWith("Aviation")) {
                    form.getControl("ts_details").setVisible(true);
                }
            });
            //Keep track of the current system status, to be used when cancelling a status change.
            currentSystemStatus = form.getAttribute("msdyn_systemstatus").getValue();
            currentStatus = form.getAttribute("ts_state").getValue();
            form.getControl("msdyn_worklocation").removeOption(690970001); //Remove Facility Work Location Option
            updateCaseView(eContext);
            //Set required fields
            form.getAttribute("ts_region").setRequiredLevel("required");
            form.getAttribute("ovs_operationtypeid").setRequiredLevel("required");
            form.getAttribute("ts_site").setRequiredLevel("required");
            //If the Work Order has a Case, set the case lookup to required to prevent saving a Work Order without a Case
            if (form.getAttribute("msdyn_servicerequest").getValue() != null) {
                form.getAttribute("msdyn_servicerequest").setRequiredLevel("required");
            }
            if (currentSystemStatus == 690970004) {
                form.getControl("ts_completedquarter").setVisible(true);
            }
            else {
                form.getControl("ts_completedquarter").setVisible(false);
            }
            if (currentSystemStatus == 690970004 || currentSystemStatus == 690970003) { //Closed ; Completed
                form.getControl("ovs_revisedquarterid").setDisabled(true);
            }
            if (currentStatus == 717750001) { //Committed
                form.getControl("ovs_fiscalquarter").setDisabled(true);
            }
            //Limit ownership of a Work Order to users associated with the same program
            if (form.ui.getFormType() == 1 || form.ui.getFormType() == 2) {
                if (ownerControl != null) {
                    ownerControl.setEntityTypes(["systemuser"]);
                    headerOwnerControl.setEntityTypes(["systemuser"]);
                    var defaultViewId = "29bd662e-52e7-ec11-bb3c-0022483d86ce";
                    ownerControl.setDefaultView(defaultViewId);
                    headerOwnerControl.setDefaultView(defaultViewId);
                }
            }
            //Prevent enabling controls if record is Inactive and set the right views (active/inactive)
            if (state == 1) {
                setWorkOrderServiceTasksView(form, false);
                return;
            }
            else { //If the work order is active, show the active views
                setWorkOrderServiceTasksView(form, true);
            }
            switch (form.ui.getFormType()) {
                case 1: //Create New Work Order
                    //If work order is New (case 1) and it already has a case on form load, the work order must be coming from a case
                    if (form.getAttribute("msdyn_servicerequest").getValue() != null) {
                        isFromCase = true;
                    }
                    else if (form.getAttribute("ts_securityincident").getValue() != null) {
                        isFromSecurityIncident = true;
                    }
                    // Set default values
                    setDefaultFiscalYear(form);
                    setRegion(form);
                    //If the new work order is coming from a case, set default rational to planned
                    if (form.getAttribute("msdyn_servicerequest").getValue() != null) {
                        var lookup = new Array();
                        lookup[0] = new Object();
                        lookup[0].id = "{994c3ec1-c104-eb11-a813-000d3af3a7a7}";
                        lookup[0].name = "Planned";
                        lookup[0].entityType = "ovs_tyrational";
                        form.getAttribute("ovs_rational").setValue(lookup); //Planned
                    }
                    else {
                        var lookup = new Array();
                        lookup[0] = new Object();
                        lookup[0].id = "{47F438C7-C104-EB11-A813-000D3AF3A7A7}";
                        lookup[0].name = "Unplanned";
                        lookup[0].entityType = "ovs_tyrational";
                        form.getAttribute("ovs_rational").setValue(lookup); //Unplanned
                    }
                    // Disable all operation related fields
                    form.getControl("ts_region").setDisabled(true);
                    form.getControl("ovs_operationtypeid").setDisabled(true);
                    form.getControl("ts_site").setDisabled(true);
                    form.getControl("msdyn_primaryincidenttype").setDisabled(true);
                    form.getControl("msdyn_functionallocation").setDisabled(true);
                    /* Localize the labels shown in the region and country lookups when coming from a case.
                     * Workaround for localization plugin running after mapped case fields have already been retrieved.
                     * Split("::") the field name, using left side if in english and right if in french.
                     */
                    var regionValue = form.getAttribute("ts_region").getValue();
                    if (regionValue != null) {
                        regionValue[0].name = (Xrm.Utility.getGlobalContext().userSettings.languageId === 1036) ? (_c = (_b = regionValue[0]) === null || _b === void 0 ? void 0 : _b.name) === null || _c === void 0 ? void 0 : _c.split("::")[1] : (_e = (_d = regionValue[0]) === null || _d === void 0 ? void 0 : _d.name) === null || _e === void 0 ? void 0 : _e.split("::")[0];
                        form.getAttribute("ts_region").setValue(regionValue);
                    }
                    var countryValue = form.getAttribute("ts_country").getValue();
                    if (countryValue != null) {
                        countryValue[0].name = (Xrm.Utility.getGlobalContext().userSettings.languageId === 1036) ? (_g = (_f = countryValue[0]) === null || _f === void 0 ? void 0 : _f.name) === null || _g === void 0 ? void 0 : _g.split("::")[1] : (_j = (_h = countryValue[0]) === null || _h === void 0 ? void 0 : _h.name) === null || _j === void 0 ? void 0 : _j.split("::")[0];
                        form.getAttribute("ts_country").setValue(countryValue);
                    }
                    //If the new work order is coming from a case, and region is international, show the country lookup
                    if (isFromCase && regionValue && regionValue[0].id == "{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}") {
                        form.getControl("ts_country").setVisible(true);
                        form.getControl("ts_country").setDisabled(true);
                    }
                    if (isFromSecurityIncident) {
                        var stakeholderAttribute_1 = form.getAttribute("msdyn_serviceaccount");
                        var stakeholderAttributeValue_1 = stakeholderAttribute_1.getValue();
                        if (stakeholderAttributeValue_1 != null) {
                            fillOrSetTradeNameView(eContext, stakeholderAttributeValue_1);
                        }
                    }
                    break;
                case 2:
                    var workOrderTypeAttribute = form.getAttribute("msdyn_workordertype");
                    var workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();
                    var operationTypeAttribute = form.getAttribute("ovs_operationtypeid");
                    var operationTypeAttributeValue = operationTypeAttribute.getValue();
                    var countryAttribute = form.getAttribute("ts_country");
                    var countryAttributeValue = countryAttribute.getValue();
                    var stakeholderAttribute = form.getAttribute("msdyn_serviceaccount");
                    var stakeholderAttributeValue = stakeholderAttribute.getValue();
                    var countryCondition = getCountryFetchXmlCondition(form);
                    if (regionAttribute != null && workOrderTypeAttribute != null && operationTypeAttribute != null && stakeholderAttribute) {
                        if (regionAttributeValue != null && workOrderTypeAttributeValue != null && operationTypeAttributeValue != null && stakeholderAttributeValue != null) {
                            setOperationTypeFilteredView(form, regionAttributeValue[0].id, "", workOrderTypeAttributeValue[0].id, "", "");
                            setTradeViewFilteredView(form, regionAttributeValue[0].id, countryCondition, workOrderTypeAttributeValue[0].id, "", "", operationTypeAttributeValue[0].id);
                            setSiteFilteredView(form, regionAttributeValue[0].id, countryCondition, "", stakeholderAttributeValue[0].id, "", operationTypeAttributeValue[0].id);
                        }
                    }
                    setActivityTypeDisabled(eContext);
                    if (currentSystemStatus == 690970004) {
                        if (!userHasRole("System Administrator|ROM - Business Admin|ROM - Manager")) {
                            form.getControl("header_msdyn_systemstatus").setDisabled(true);
                        }
                    }
                    showHideContact(form);
                    break;
                default:
                    // Enable all operation related fields
                    form.getControl("ts_region").setDisabled(false);
                    form.getControl("ovs_operationtypeid").setDisabled(false);
                    form.getControl("ts_tradenameid").setDisabled(false);
                    //form.getControl("msdyn_serviceaccount").setDisabled(false);
                    form.getControl("ts_site").setDisabled(false);
                    form.getControl("msdyn_primaryincidenttype").setDisabled(false);
                    if (regionAttribute != null && regionAttribute != undefined) {
                        if (regionAttributeValue != null && regionAttributeValue != undefined) {
                            if (regionAttributeValue[0].id == "{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}") { //International
                                form.getControl("ts_country").setVisible(true);
                                form.getAttribute("ts_country").setRequiredLevel("required");
                            }
                        }
                        else {
                            form.getControl("ts_country").setVisible(false);
                        }
                    }
                    break;
            }
            // Lock some fields if there exist a Case that has this WO associated to it
            var fetchXML = "<fetch><entity name=\"msdyn_workorder\"><attribute name=\"msdyn_workorderid\"/><filter><condition attribute=\"msdyn_workorderid\" operator=\"eq\" value=\"" + form.data.entity.getId() + "\"/></filter><link-entity name=\"incident\" from=\"incidentid\" to=\"msdyn_servicerequest\"/></entity></fetch>";
            fetchXML = "?fetchXml=" + encodeURIComponent(fetchXML);
            Xrm.WebApi.retrieveMultipleRecords("msdyn_workorder", fetchXML).then(function success(result) {
                if (result.entities.length > 0) {
                    form.getControl("ts_region").setDisabled(true);
                    form.getControl("ts_country").setDisabled(true);
                    form.getControl("ts_tradenameid").setDisabled(true);
                    form.getControl("msdyn_serviceaccount").setDisabled(true);
                    form.getControl("ts_site").setDisabled(true);
                    form.getControl("ovs_operationtypeid").setDisabled(true);
                }
            }, function (error) {
            });
            //Check if the Work Order is past the Planned Fiscal Quarter
            setCantCompleteinspectionVisibility(form);
            setIncompleteWorkOrderReasonFilteredView(form);
            //Set visiblity for canceled inspection justification field
            if (currentSystemStatus != 690970005) {
                form.getControl("ts_canceledinspectionjustification").setVisible(false);
                form.getControl("ts_othercanceledjustification").setVisible(false);
            }
            //Set the Work Order Status 'Completed' and 'Scheduled' to not visible
            var workOrderStatus = form.getControl("header_msdyn_systemstatus");
            if (workOrderStatus != null && workOrderStatus != undefined) {
                var options = workOrderStatus.getOptions();
                for (var i = 0; i < options.length; i++) {
                    if (options[i].value == 690970003 || options[i].value == 690970001) {
                        workOrderStatus.removeOption(options[i].value);
                    }
                }
            }
        }
        WorkOrder.onLoad = onLoad;
        function onSave(eContext) {
            var form = eContext.getFormContext();
            var systemStatus = form.getAttribute("msdyn_systemstatus").getValue();
            var workOrderServiceTaskData;
            if (systemStatus == 690970004) { //Only close associated entities when Record Status is set to Closed - Posted
                workOrderServiceTaskData =
                    {
                        "statecode": 1,
                        "statuscode": 918640003 //open -> 918640002
                    };
                //Close/Open associated work order service task(s)
                closeWorkOrderServiceTasks(form, workOrderServiceTaskData);
                //Set inactive views
                setWorkOrderServiceTasksView(form, false);
            }
            //Check if the Work Order is past the Planned Fiscal Quarter
            setCantCompleteinspectionVisibility(form);
        }
        WorkOrder.onSave = onSave;
        function workOrderTypeOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var workOrderTypeAttribute = form.getAttribute("msdyn_workordertype");
                var regionAttribute = form.getAttribute("ts_region");
                var countryAttribute = form.getAttribute("ts_country");
                var stakeholderAttribute = form.getAttribute("msdyn_serviceaccount");
                var siteAttribute = form.getAttribute("ts_site");
                if (workOrderTypeAttribute != null && workOrderTypeAttribute != undefined) {
                    // Clear out all dependent fields' value if they are not already disabled and not already empty
                    if (!form.getControl("ovs_operationtypeid").getDisabled() && form.getAttribute("ovs_operationtypeid").getValue() != null) {
                        form.getAttribute("ovs_operationtypeid").setValue(null);
                    }
                    if (!form.getControl("ts_tradenameid").getDisabled() && form.getAttribute("ts_tradenameid").getValue() != null) {
                        form.getAttribute("ts_tradenameid").setValue(null);
                    }
                    if (!form.getControl("msdyn_serviceaccount").getDisabled() && form.getAttribute("msdyn_serviceaccount").getValue() != null) {
                        form.getAttribute("msdyn_serviceaccount").setValue(null);
                    }
                    if (!form.getControl("ts_site").getDisabled() && form.getAttribute("ts_site").getValue() != null) {
                        form.getAttribute("ts_site").setValue(null);
                        form.getAttribute("ovs_operationid").setValue(null);
                    }
                    if (!form.getControl("msdyn_primaryincidenttype").getDisabled() && form.getAttribute("msdyn_primaryincidenttype").getValue() != null) {
                        form.getAttribute("msdyn_primaryincidenttype").setValue(null);
                    }
                    // Disable all dependent fields
                    if (form.getControl("ts_country").getDisabled() == false)
                        form.getControl("ts_country").setDisabled(true);
                    if (form.getControl("ovs_operationtypeid").getDisabled() == false)
                        form.getControl("ovs_operationtypeid").setDisabled(true);
                    if (form.getControl("ts_tradenameid").getDisabled() == false)
                        form.getControl("ts_tradenameid").setDisabled(true);
                    if (form.getControl("msdyn_serviceaccount").getDisabled() == false)
                        form.getControl("msdyn_serviceaccount").setDisabled(true);
                    if (form.getControl("ts_site").getDisabled() == false)
                        form.getControl("ts_site").setDisabled(true);
                    if (form.getControl("msdyn_primaryincidenttype").getDisabled() == false)
                        form.getControl("msdyn_primaryincidenttype").setDisabled(true);
                    var workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();
                    var regionAttributeValue = regionAttribute.getValue();
                    var countryAttributeValue = countryAttribute.getValue();
                    var stakeholderAttributeValue = stakeholderAttribute.getValue();
                    var siteAttributeValue = siteAttribute.getValue();
                    if (workOrderTypeAttributeValue != null && workOrderTypeAttributeValue != undefined) {
                        // Enable direct dependent field
                        if (!isFromCase)
                            form.getControl("ts_region").setDisabled(false);
                        if (regionAttributeValue != null && regionAttributeValue != undefined) {
                            if (regionAttributeValue[0].id != "{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}") {
                                if (isFromCase && stakeholderAttributeValue != null && siteAttributeValue != null) {
                                    setOperationTypeFilteredView(form, regionAttributeValue[0].id, "", workOrderTypeAttributeValue[0].id, stakeholderAttributeValue[0].id, siteAttributeValue[0].id);
                                }
                                else {
                                    setOperationTypeFilteredView(form, regionAttributeValue[0].id, "", workOrderTypeAttributeValue[0].id, "", "");
                                }
                            }
                            else {
                                if (!isFromCase)
                                    form.getControl("ts_country").setDisabled(false);
                                setCountryFilteredView(form);
                                var countryCondition = getCountryFetchXmlCondition(form);
                                if (isFromCase && stakeholderAttributeValue != null && siteAttributeValue != null) {
                                    setOperationTypeFilteredView(form, regionAttributeValue[0].id, countryCondition, workOrderTypeAttributeValue[0].id, stakeholderAttributeValue[0].id, siteAttributeValue[0].id);
                                }
                                else {
                                    setOperationTypeFilteredView(form, regionAttributeValue[0].id, countryCondition, workOrderTypeAttributeValue[0].id, "", "");
                                }
                            }
                        }
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        WorkOrder.workOrderTypeOnChange = workOrderTypeOnChange;
        function regionOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var workOrderTypeAttribute = form.getAttribute("msdyn_workordertype");
                var regionAttribute = form.getAttribute("ts_region");
                if (regionAttribute != null && regionAttribute != undefined) {
                    // Clear out all dependent fields' value if they are not already disabled and not already empty
                    if (!form.getControl("ts_country").getDisabled() && form.getAttribute("ts_country").getValue() != null) {
                        form.getAttribute("ts_country").setValue(null);
                    }
                    if (!form.getControl("ovs_operationtypeid").getDisabled() && form.getAttribute("ovs_operationtypeid").getValue() != null) {
                        form.getAttribute("ovs_operationtypeid").setValue(null);
                    }
                    if (!form.getControl("ts_tradenameid").getDisabled() && form.getAttribute("ts_tradenameid").getValue() != null) {
                        form.getAttribute("ts_tradenameid").setValue(null);
                    }
                    if (!form.getControl("msdyn_serviceaccount").getDisabled() && form.getAttribute("msdyn_serviceaccount").getValue() != null) {
                        form.getAttribute("msdyn_serviceaccount").setValue(null);
                    }
                    if (!form.getControl("ts_site").getDisabled() && form.getAttribute("ts_site").getValue() != null) {
                        form.getAttribute("ts_site").setValue(null);
                        form.getAttribute("ovs_operationid").setValue(null);
                    }
                    if (!form.getControl("msdyn_functionallocation").getVisible() && form.getAttribute("msdyn_functionallocation").getValue() != null) {
                        form.getAttribute("msdyn_functionallocation").setValue(null);
                    }
                    if (!form.getControl("msdyn_primaryincidenttype").getDisabled() && form.getAttribute("msdyn_primaryincidenttype").getValue() != null) {
                        form.getAttribute("msdyn_primaryincidenttype").setValue(null);
                    }
                    // Disable all dependent fields
                    form.getAttribute("ts_country").setRequiredLevel("none");
                    if (form.getControl("ts_country").getDisabled() == false)
                        form.getControl("ts_country").setVisible(false);
                    if (form.getControl("ovs_operationtypeid").getDisabled() == false)
                        form.getControl("ovs_operationtypeid").setDisabled(true);
                    if (form.getControl("ts_tradenameid").getDisabled() == false)
                        form.getControl("ts_tradenameid").setDisabled(true);
                    if (form.getControl("msdyn_serviceaccount").getDisabled() == false)
                        form.getControl("msdyn_serviceaccount").setDisabled(true);
                    if (form.getControl("ts_site").getDisabled() == false)
                        form.getControl("ts_site").setDisabled(true);
                    if (form.getControl("msdyn_functionallocation").getDisabled() == false)
                        form.getControl("msdyn_functionallocation").setVisible(false);
                    if (form.getControl("msdyn_primaryincidenttype").getDisabled() == false)
                        form.getControl("msdyn_primaryincidenttype").setDisabled(true);
                    // If previous fields have values, we use the filtered fetchxml in a custom lookup view
                    var workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();
                    var regionAttributeValue = regionAttribute.getValue();
                    if (workOrderTypeAttributeValue != null && workOrderTypeAttributeValue != undefined &&
                        regionAttributeValue != null && regionAttributeValue != undefined) {
                        // Enable direct dependent field
                        if (regionAttributeValue[0].name != "International") {
                            setOperationTypeFilteredView(form, regionAttributeValue[0].id, "", workOrderTypeAttributeValue[0].id, "", "");
                        }
                        else {
                            form.getControl("ts_country").setDisabled(false);
                            setCountryFilteredView(form);
                        }
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        WorkOrder.regionOnChange = regionOnChange;
        function countryOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var workOrderTypeAttribute = form.getAttribute("msdyn_workordertype");
                var regionAttribute = form.getAttribute("ts_region");
                var countryAttribute = form.getAttribute("ts_country");
                if (countryAttribute != null && countryAttribute != undefined) {
                    // Clear out all dependent fields' value if they are not already disabled and not already empty
                    if (!form.getControl("ovs_operationtypeid").getDisabled() && form.getAttribute("ovs_operationtypeid").getValue() != null) {
                        form.getAttribute("ovs_operationtypeid").setValue(null);
                    }
                    if (!form.getControl("ts_tradenameid").getDisabled() && form.getAttribute("ts_tradenameid").getValue() != null) {
                        form.getAttribute("ts_tradenameid").setValue(null);
                    }
                    if (!form.getControl("msdyn_serviceaccount").getDisabled() && form.getAttribute("msdyn_serviceaccount").getValue() != null) {
                        form.getAttribute("msdyn_serviceaccount").setValue(null);
                    }
                    if (!form.getControl("ts_site").getDisabled() && form.getAttribute("ts_site").getValue() != null) {
                        form.getAttribute("ts_site").setValue(null);
                        form.getAttribute("ovs_operationid").setValue(null);
                    }
                    if (!form.getControl("msdyn_functionallocation").getVisible() && form.getAttribute("msdyn_functionallocation").getValue() != null) {
                        form.getAttribute("msdyn_functionallocation").setValue(null);
                    }
                    if (!form.getControl("msdyn_primaryincidenttype").getDisabled() && form.getAttribute("msdyn_primaryincidenttype").getValue() != null) {
                        form.getAttribute("msdyn_primaryincidenttype").setValue(null);
                    }
                    // Disable all dependent fields
                    if (form.getControl("ovs_operationtypeid").getDisabled() == false)
                        form.getControl("ovs_operationtypeid").setDisabled(true);
                    if (form.getControl("ts_tradenameid").getDisabled() == false)
                        form.getControl("ts_tradenameid").setDisabled(true);
                    if (form.getControl("msdyn_serviceaccount").getDisabled() == false)
                        form.getControl("msdyn_serviceaccount").setDisabled(true);
                    if (form.getControl("ts_site").getDisabled() == false)
                        form.getControl("ts_site").setDisabled(true);
                    if (form.getControl("msdyn_functionallocation").getDisabled() == false)
                        form.getControl("msdyn_functionallocation").setVisible(false);
                    if (form.getControl("msdyn_primaryincidenttype").getDisabled() == false)
                        form.getControl("msdyn_primaryincidenttype").setDisabled(true);
                    var workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();
                    var regionAttributeValue = regionAttribute.getValue();
                    var countryAttributeValue = countryAttribute.getValue();
                    if (workOrderTypeAttributeValue != null && workOrderTypeAttributeValue != undefined &&
                        regionAttributeValue != null && regionAttributeValue != undefined) {
                        var countryCondition = getCountryFetchXmlCondition(form);
                        setOperationTypeFilteredView(form, regionAttributeValue[0].id, countryCondition, workOrderTypeAttributeValue[0].id, "", "");
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        WorkOrder.countryOnChange = countryOnChange;
        function fiscalYearOnChange(eContext) {
            //if new fiscal year is selected, then previous selection of quarter no longer corresponds
            removeSelectedFiscalQuarter(eContext);
        }
        WorkOrder.fiscalYearOnChange = fiscalYearOnChange;
        function operationTypeOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var workOrderTypeAttribute = form.getAttribute("msdyn_workordertype");
                var regionAttribute = form.getAttribute("ts_region");
                var operationTypeAttribute = form.getAttribute("ovs_operationtypeid");
                var countryAttribute = form.getAttribute("ts_country");
                if (operationTypeAttribute != null && operationTypeAttribute != undefined && !isFromCase) {
                    // Clear out all dependent fields' value if they are not already disabled and not already empty
                    if (!form.getControl("ts_tradenameid").getDisabled() && form.getAttribute("ts_tradenameid").getValue() != null) {
                        form.getAttribute("ts_tradenameid").setValue(null);
                    }
                    if (!form.getControl("msdyn_serviceaccount").getDisabled() && form.getAttribute("msdyn_serviceaccount").getValue() != null) {
                        form.getAttribute("msdyn_serviceaccount").setValue(null);
                    }
                    if (!form.getControl("ts_site").getDisabled() && form.getAttribute("ts_site").getValue() != null) {
                        form.getAttribute("ts_site").setValue(null);
                        form.getAttribute("ovs_operationid").setValue(null);
                    }
                    if (!form.getControl("msdyn_functionallocation").getVisible() && form.getAttribute("msdyn_functionallocation").getValue() != null) {
                        form.getAttribute("msdyn_functionallocation").setValue(null);
                    }
                    if (!form.getControl("msdyn_primaryincidenttype").getDisabled() && form.getAttribute("msdyn_primaryincidenttype").getValue() != null) {
                        form.getAttribute("msdyn_primaryincidenttype").setValue(null);
                    }
                    // Disable all dependent fields
                    if (form.getControl("ts_tradenameid").getDisabled() == false)
                        form.getControl("ts_tradenameid").setDisabled(true);
                    if (form.getControl("msdyn_serviceaccount").getDisabled() == false)
                        form.getControl("msdyn_serviceaccount").setDisabled(true);
                    if (form.getControl("ts_site").getDisabled() == false)
                        form.getControl("ts_site").setDisabled(true);
                    if (form.getControl("msdyn_functionallocation").getDisabled() == false)
                        form.getControl("msdyn_functionallocation").setVisible(false);
                    if (form.getControl("msdyn_primaryincidenttype").getDisabled() == false)
                        form.getControl("msdyn_primaryincidenttype").setDisabled(true);
                    // If previous fields have values, we use the filtered fetchxml in a custom lookup view
                    var workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();
                    var regionAttributeValue = regionAttribute.getValue();
                    var operationTypeAttributeValue = operationTypeAttribute.getValue();
                    var countryAttributeValue = countryAttribute.getValue();
                    if (regionAttributeValue != null && regionAttributeValue != undefined &&
                        operationTypeAttributeValue != null && operationTypeAttributeValue != undefined &&
                        workOrderTypeAttributeValue != null && workOrderTypeAttributeValue != undefined) {
                        var countryCondition = getCountryFetchXmlCondition(form);
                        //form.getControl("msdyn_serviceaccount").setDisabled(false);
                        // Setup a custom view
                        // This value is never saved and only needs to be unique among the other available views for the lookup.
                        var viewId = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F660}';
                        var entityName = "account";
                        var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredStakeholders");
                        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" returntotalrecordcount="true" page="1" no-lock="false"><entity name="account"><attribute name="name"/><attribute name="accountid"/><order attribute="name" descending="false" /><link-entity name="ovs_operation" from="ts_stakeholder" to="accountid" link-type="inner" alias="ac"><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeValue[0].id + '"/></filter><link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="ts_site" link-type="inner" alias="ad"><filter type="and"><condition attribute="ts_region" operator="eq" value="' + regionAttributeValue[0].id + '"/>' + countryCondition + '</filter></link-entity></link-entity></entity></fetch>';
                        var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="accountid"><cell name="name" width="200" /></row></grid>';
                        form.getControl("msdyn_serviceaccount").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                        // Custom view for Trade Names
                        setTradeViewFilteredView(form, regionAttributeValue[0].id, countryCondition, workOrderTypeAttributeValue[0].id, "", "", operationTypeAttributeValue[0].id);
                    }
                    showHideContact(form);
                }
                else if (isFromCase) {
                    populateOperationField(eContext);
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        WorkOrder.operationTypeOnChange = operationTypeOnChange;
        function stakeholderOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var regionAttribute = form.getAttribute("ts_region");
                var operationTypeAttribute = form.getAttribute("ovs_operationtypeid");
                var stakeholderAttribute = form.getAttribute("msdyn_serviceaccount");
                var countryAttribute = form.getAttribute("ts_country");
                if (stakeholderAttribute != null && stakeholderAttribute != undefined) {
                    // Clear out all dependent fields' value if they are not already disabled and not already empty
                    if (!form.getControl("ts_site").getDisabled() && form.getAttribute("ts_site").getValue() != null) {
                        form.getAttribute("ts_site").setValue(null);
                        form.getAttribute("ovs_operationid").setValue(null);
                    }
                    if (!form.getControl("msdyn_functionallocation").getVisible() && form.getAttribute("msdyn_functionallocation").getValue() != null) {
                        form.getAttribute("msdyn_functionallocation").setValue(null);
                    }
                    // Disable all dependent fields
                    if (form.getControl("ts_site").getDisabled() == false)
                        form.getControl("ts_site").setDisabled(true);
                    if (form.getControl("msdyn_functionallocation").getDisabled() == false)
                        form.getControl("msdyn_functionallocation").setVisible(false);
                    // If an operation type is selected, we use the filtered fetchxml, otherwise, disable and clear out the dependent fields
                    var regionAttributeValue = regionAttribute.getValue();
                    var operationTypeAttributeValue = operationTypeAttribute.getValue();
                    var stakeholderAttributeValue = stakeholderAttribute.getValue();
                    var countryAttributeValue = countryAttribute.getValue();
                    if (regionAttributeValue != null && regionAttributeValue != undefined &&
                        operationTypeAttributeValue != null && operationTypeAttributeValue != undefined &&
                        stakeholderAttributeValue != null && stakeholderAttributeValue != undefined) {
                        var countryCondition = getCountryFetchXmlCondition(form);
                        setSiteFilteredView(form, regionAttributeValue[0].id, countryCondition, "", stakeholderAttributeValue[0].id, "", operationTypeAttributeValue[0].id);
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        WorkOrder.stakeholderOnChange = stakeholderOnChange;
        function siteOnChange(eContext) {
            try {
                var form_1 = eContext.getFormContext();
                var operationTypeAttribute = form_1.getAttribute("ovs_operationtypeid");
                var stakeholderAttribute = form_1.getAttribute("msdyn_serviceaccount");
                var siteAttribute = form_1.getAttribute("ts_site");
                var workOrderTypeAttribute = form_1.getAttribute("msdyn_workordertype");
                if (siteAttribute != null && siteAttribute != undefined) {
                    // Clear out operation and subsite value if not already empty
                    if (form_1.getAttribute("ovs_operationid").getValue() != null)
                        form_1.getAttribute("ovs_operationid").setValue(null);
                    // If an operation type is selected, we use the filtered fetchxml, otherwise, disable and clear out the dependent fields
                    var operationTypeAttributeValue_1 = operationTypeAttribute.getValue();
                    var stakeholderAttributeValue = stakeholderAttribute.getValue();
                    var siteAttributeValue_1 = siteAttribute.getValue();
                    var workOrderTypeAttributeValue_1 = workOrderTypeAttribute.getValue();
                    if (siteAttributeValue_1 != null && siteAttributeValue_1 != undefined &&
                        stakeholderAttributeValue != null && stakeholderAttributeValue != undefined &&
                        operationTypeAttributeValue_1 != null && operationTypeAttributeValue_1 != undefined &&
                        workOrderTypeAttribute != null && workOrderTypeAttributeValue_1 != null) {
                        // Populate operation asset
                        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="ovs_operation"><attribute name="ovs_name"/><attribute name="ts_stakeholder"/><attribute name="ts_site"/><attribute name="ovs_operationid"/><attribute name="ts_operationalstatus"/><order attribute="ovs_name" descending="true"/><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeValue_1[0].id + '"/><condition attribute="ts_site" operator="eq" value="' + siteAttributeValue_1[0].id + '"/><condition attribute="ts_stakeholder" operator="eq" value="' + stakeholderAttributeValue[0].id + '"/></filter></entity></fetch>';
                        var encodedFetchXml = encodeURIComponent(fetchXml);
                        Xrm.WebApi.retrieveMultipleRecords("ovs_operation", "?fetchXml=" + encodedFetchXml).then(function success(result) {
                            if (result.entities.length == 1) {
                                var targetOperation = result.entities[0];
                                var lookup = new Array();
                                lookup[0] = new Object();
                                lookup[0].id = targetOperation.ovs_operationid;
                                lookup[0].name = targetOperation.ovs_name;
                                lookup[0].entityType = 'ovs_operation';
                                if (targetOperation.ts_operationalstatus == 717750001) {
                                    form_1.ui.setFormNotification((Xrm.Utility.getGlobalContext().userSettings.languageId == 1033 ? "The operation \"" + targetOperation.ovs_name + "\" is non-operational." : "L'opération \"" + targetOperation.ovs_name + "\" est  non opérationnelle."), "ERROR", "non-operational-operation");
                                    form_1.getAttribute('ts_site').setValue(null);
                                }
                                else {
                                    form_1.ui.clearFormNotification("non-operational-operation");
                                    form_1.getAttribute('ovs_operationid').setValue(lookup);
                                }
                                setActivityTypeFilteredView(form_1, lookup[0].id, workOrderTypeAttributeValue_1[0].id, operationTypeAttributeValue_1[0].id);
                            }
                            else {
                                // do not set a default if multiple records are found, error.
                            }
                        }, function (error) {
                            showErrorMessageAlert(error);
                        });
                        //Check if any subsites exists and only show the field if it's the case
                        var fetchXmlToCheckForSubSites = '<fetch no-lock="false" returntotalrecordcount="true" page="1" count="25"><entity name="msdyn_functionallocation"><attribute name="statecode"/><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><filter><condition attribute="msdyn_functionallocationid" operator="under" value="' + siteAttributeValue_1[0].id + '"/></filter><order attribute="msdyn_name" descending="false"/><link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="msdyn_parentfunctionallocation" alias="bb"><filter type="and"><condition attribute="msdyn_functionallocationid" operator="eq" uitype="msdyn_functionallocation" value="' + siteAttributeValue_1[0].id + '"/></filter></link-entity></entity></fetch>';
                        encodedFetchXml = encodeURIComponent(fetchXmlToCheckForSubSites);
                        Xrm.WebApi.retrieveMultipleRecords("msdyn_functionallocation", "?fetchXml=" + encodedFetchXml).then(function success(result) {
                            if (result.entities.length > 0) {
                                form_1.getControl('msdyn_functionallocation').setDisabled(false);
                                form_1.getControl('msdyn_functionallocation').setVisible(true);
                                var viewId = '{1B59589F-F122-5428-4771-79BC925240C3}';
                                var entityName = "msdyn_functionallocation";
                                var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredSites");
                                var activityTypeFetchXml = '<fetch no-lock="false"><entity name="msdyn_functionallocation"><attribute name="statecode"/><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><filter><condition attribute="msdyn_functionallocationid" operator="under" value="' + siteAttributeValue_1[0].id + '"/></filter><order attribute="msdyn_name" descending="false"/></entity></fetch>';
                                var layoutXml = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="200" /></row></grid>';
                                form_1.getControl("msdyn_functionallocation").addCustomView(viewId, entityName, viewDisplayName, activityTypeFetchXml, layoutXml, true);
                            }
                            else {
                                form_1.getAttribute("msdyn_functionallocation").setValue(null);
                                form_1.getControl('msdyn_functionallocation').setVisible(false);
                            }
                        }, function (error) {
                            showErrorMessageAlert(error);
                        });
                    }
                    else {
                        form_1.getAttribute("msdyn_functionallocation").setValue(null);
                        form_1.getControl('msdyn_functionallocation').setVisible(false);
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        WorkOrder.siteOnChange = siteOnChange;
        function tradenameOnChange(eContext) {
            try {
                var form_2 = eContext.getFormContext();
                var TradenameAttribute = form_2.getAttribute("ts_tradenameid");
                if (TradenameAttribute != null && TradenameAttribute != undefined) {
                    var TradenameAttributeValue = TradenameAttribute.getValue();
                    if (TradenameAttributeValue != null && TradenameAttributeValue != undefined) {
                        Xrm.WebApi.retrieveRecord("ts_tradename", TradenameAttributeValue[0].id, "?$select=_ts_stakeholderid_value").then(function success(result) {
                            var _ts_stakeholderid_value = result["_ts_stakeholderid_value"];
                            var _ts_stakeholderid_value_formatted = result["_ts_stakeholderid_value@OData.Community.Display.V1.FormattedValue"];
                            var _ts_stakeholderid_value_lookuplogicalname = result["_ts_stakeholderid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                            var lookup = new Array();
                            lookup[0] = new Object();
                            lookup[0].id = _ts_stakeholderid_value;
                            lookup[0].name = _ts_stakeholderid_value_formatted;
                            lookup[0].entityType = _ts_stakeholderid_value_lookuplogicalname;
                            form_2.getAttribute('msdyn_serviceaccount').setValue(lookup);
                            stakeholderOnChange(eContext);
                        }, function (error) {
                            showErrorMessageAlert(error);
                        });
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        WorkOrder.tradenameOnChange = tradenameOnChange;
        function functionalLocationOnChange(eContext) {
            try {
                var form_3 = eContext.getFormContext();
                var operationTypeAttribute = form_3.getAttribute("ovs_operationtypeid");
                var stakeholderAttribute = form_3.getAttribute("msdyn_serviceaccount");
                var functionalLocationAttribute = form_3.getAttribute("msdyn_functionallocation");
                if (functionalLocationAttribute != null && functionalLocationAttribute != undefined) {
                    // Clear out operation value if not already empty
                    if (form_3.getAttribute("ovs_operationid").getValue() != null)
                        form_3.getAttribute("ovs_operationid").setValue(null);
                    // If an operation type is selected, we use the filtered fetchxml, otherwise, disable and clear out the dependent fields
                    var operationTypeAttributeValue = operationTypeAttribute.getValue();
                    var stakeholderAttributeValue = stakeholderAttribute.getValue();
                    var functionalLocationAttributeValue = functionalLocationAttribute.getValue();
                    if (functionalLocationAttributeValue != null && functionalLocationAttributeValue != undefined &&
                        stakeholderAttributeValue != null && stakeholderAttributeValue != undefined &&
                        operationTypeAttributeValue != null && operationTypeAttributeValue != undefined) {
                        // Populate operation asset
                        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="ovs_operation"><attribute name="ovs_name"/><attribute name="ts_stakeholder"/><attribute name="ts_site"/><attribute name="ovs_operationid"/><order attribute="ovs_name" descending="true"/><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeValue[0].id + '"/><condition attribute="ts_stakeholder" operator="eq" value="' + stakeholderAttributeValue[0].id + '"/><condition attribute="ts_site" operator="eq" value="' + functionalLocationAttributeValue[0].id + '"/></filter></entity></fetch>';
                        var encodedFetchXml = encodeURIComponent(fetchXml);
                        Xrm.WebApi.retrieveMultipleRecords("ovs_operation", "?fetchXml=" + encodedFetchXml).then(function success(result) {
                            if (result.entities.length == 1) {
                                var targetOperation = result.entities[0];
                                var lookup = new Array();
                                lookup[0] = new Object();
                                lookup[0].id = targetOperation.ovs_operationid;
                                lookup[0].name = targetOperation.ovs_name;
                                lookup[0].entityType = 'ovs_operation';
                                form_3.getAttribute('ovs_operationid').setValue(lookup);
                            }
                            else {
                                // do not set a default if multiple records are found, error.
                            }
                        }, function (error) {
                            showErrorMessageAlert(error);
                        });
                    }
                    else {
                        // Fall back to siteOnChange if functional location is cleared
                        siteOnChange(eContext);
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        WorkOrder.functionalLocationOnChange = functionalLocationOnChange;
        function systemStatusOnChange(eContext) {
            var form = eContext.getFormContext();
            var newSystemStatus = form.getAttribute("msdyn_systemstatus").getValue();
            //If user try to cancel Complete WO
            if (currentSystemStatus == 690970003 && newSystemStatus == 690970005) {
                var alertStrings = {
                    text: Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "CantCancelText"),
                };
                var alertOptions = { height: 160, width: 340 };
                Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function () { });
                form.getAttribute("msdyn_systemstatus").setValue(currentSystemStatus);
            }
            else 
            //If system status is set to closed
            if (newSystemStatus == 690970004) {
                Xrm.WebApi.retrieveMultipleRecords("msdyn_workorderservicetask", "?$select=msdyn_workorder&$filter=msdyn_workorder/msdyn_workorderid eq " + form.data.entity.getId() + " and statuscode ne 918640002 and ts_mandatory eq true").then(function success(result) {
                    if (result.entities.length > 0) {
                        var alertStrings = {
                            text: Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "CloseWOWithUnCompletedSTText"),
                            title: Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "CloseWOWithUnCompletedSTTitle")
                        };
                        var alertOptions = { height: 160, width: 340 };
                        Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function () { });
                        form.getAttribute("msdyn_systemstatus").setValue(currentSystemStatus);
                    }
                    else {
                        var confirmStrings = {
                            text: Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "CloseWorkOrderConfirmationText"),
                            title: Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "CloseWorkOrderConfirmationTitle")
                        };
                        var confirmOptions = { height: 200, width: 450 };
                        Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(function (success) {
                            if (success.confirmed) {
                                //Set state to Inactive
                                form.getAttribute("statecode").setValue(1);
                                //Set Status Reason to Closed
                                form.getAttribute("statuscode").setValue(918640000);
                                currentSystemStatus = newSystemStatus;
                                //At Transport Canada, Fiscal Years run from Apr 1st to Mar 31, Q1 = Apr-Jun, Q2 = Jul-Sept, Q3 = Oct-Dec, Q4 = Jan-Mar
                                var currentQuarter = Math.floor(new Date().getMonth() / 3);
                                if (currentQuarter == 0) {
                                    currentQuarter = 4;
                                }
                                form.getAttribute("ts_completedquarter").setValue(717750000 + currentQuarter);
                                form.getControl("ts_completedquarter").setVisible(true);
                            }
                            else {
                                //Undo the system status change
                                form.getAttribute("msdyn_systemstatus").setValue(currentSystemStatus);
                            }
                        });
                    }
                }, function (error) {
                    showErrorMessageAlert(error);
                });
            }
            else {
                if (newSystemStatus == 690970005 && currentSystemStatus != 690970003 && userHasRole("System Administrator|ROM - Business Admin|ROM - Planner")) {
                    var confirmStrings = {
                        text: Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "CancelWorkOrderConfirmationText"),
                        title: Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "CancelWorkOrderConfirmationTitle")
                    };
                    var confirmOptions = { height: 200, width: 450 };
                    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(function (success) {
                        if (success.confirmed) {
                            //Set state to Inactive
                            form.getAttribute("statecode").setValue(1);
                            //Set Status Reason to Closed
                            form.getAttribute("statuscode").setValue(918640000);
                            currentSystemStatus = newSystemStatus;
                            //Set visible canceled inspection justification field
                            form.getControl("ts_canceledinspectionjustification").setVisible(true);
                            form.getAttribute("ts_canceledinspectionjustification").setRequiredLevel("required");
                        }
                        else {
                            //Undo the system status change
                            form.getAttribute("msdyn_systemstatus").setValue(currentSystemStatus);
                        }
                    });
                }
                else {
                    //Keep record Active
                    form.getAttribute("statecode").setValue(0);
                    form.getAttribute("statuscode").setValue(1);
                    form.getControl("ts_canceledinspectionjustification").setVisible(false);
                    form.getControl("ts_canceledinspectionjustification").setVisible(false);
                    form.getAttribute("ts_canceledinspectionjustification").setRequiredLevel("none");
                    currentSystemStatus = newSystemStatus;
                }
            }
        }
        WorkOrder.systemStatusOnChange = systemStatusOnChange;
        function caseOnChange(eContext) {
            var form = eContext.getFormContext();
            var caseAttribute = form.getAttribute("msdyn_servicerequest");
            if (caseAttribute.getValue() == null) {
                form.getControl("ts_region").setDisabled(false);
                form.getControl("ts_country").setDisabled(false);
                form.getControl("ts_tradenameid").setDisabled(false);
                //form.getControl("msdyn_serviceaccount").setDisabled(false);
                form.getControl("ts_site").setDisabled(false);
            }
        }
        WorkOrder.caseOnChange = caseOnChange;
        function stateCodeOnChange(eContext) {
            var form = eContext.getFormContext();
            var stateCode = form.getAttribute("statecode").getValue();
            //If statecode changed to Active
            if (stateCode == 0) {
                var systemStatus = form.getAttribute("msdyn_systemstatus").getValue();
                //If systemStatus is currently Closed
                if (systemStatus == 690970004 || systemStatus == 690970005) {
                    // taken out because we don't use 'Completed' as a WO System Status
                    //Change systemstatus to Open - Completed
                    //form.getAttribute("msdyn_systemstatus").setValue(690970003);
                    //Prevent User from discarding status change
                    form.data.save();
                }
            }
        }
        WorkOrder.stateCodeOnChange = stateCodeOnChange;
        function updateCaseView(eContext) {
            try {
                var form_4 = eContext.getFormContext();
                var caseAttribute = form_4.getAttribute("msdyn_servicerequest");
                var regionAttribute = form_4.getAttribute("ts_region");
                var countryAttribute = form_4.getAttribute("ts_country");
                var stakeholderAttribute = form_4.getAttribute("msdyn_serviceaccount");
                var siteAttribute = form_4.getAttribute("ts_site");
                var caseAttributeValue = caseAttribute.getValue();
                var regionAttributeValue_1 = regionAttribute.getValue();
                var countryAttributeValue_1 = countryAttribute.getValue();
                var stakeholderAttributeValue_2 = stakeholderAttribute.getValue();
                var siteAttributeValue_2 = siteAttribute.getValue();
                var regionCondition = regionAttributeValue_1 == null ? "" : '<condition attribute="ovs_region" operator="eq" value="' + regionAttributeValue_1[0].id + '" />';
                var countryCondition = getCountryFetchXmlCondition(form_4);
                var stakeholderCondition = stakeholderAttributeValue_2 == null ? "" : '<condition attribute="customerid" operator="eq" value="' + stakeholderAttributeValue_2[0].id + '" />';
                var siteCondition = siteAttributeValue_2 == null ? "" : '<condition attribute="msdyn_functionallocation" operator="eq" value="' + siteAttributeValue_2[0].id + '" />';
                if (caseAttribute != null && caseAttribute != undefined) {
                    if (caseAttributeValue != null) {
                        Xrm.WebApi.retrieveRecord("incident", caseAttributeValue[0].id.replace(/({|})/g, ''), "?$select=_ovs_region_value, _ts_country_value, _customerid_value, _msdyn_functionallocation_value").then(function success(result) {
                            var _a, _b, _c, _d;
                            if ((regionCondition != "" && (result != null && regionAttributeValue_1 != null && regionAttributeValue_1[0].id.replace(/({|})/g, '') != ((_a = result._ovs_region_value) === null || _a === void 0 ? void 0 : _a.toUpperCase()))) ||
                                (countryCondition != "" && (result != null && countryAttributeValue_1 != null && countryAttributeValue_1[0].id.replace(/({|})/g, '') != ((_b = result._ts_country_value) === null || _b === void 0 ? void 0 : _b.toUpperCase()))) ||
                                (stakeholderCondition != "" && (result != null && stakeholderAttributeValue_2 != null && stakeholderAttributeValue_2[0].id.replace(/({|})/g, '') != ((_c = result._customerid_value) === null || _c === void 0 ? void 0 : _c.toUpperCase()))) ||
                                (siteCondition != "" && (result != null && siteAttributeValue_2 != null && siteAttributeValue_2[0].id.replace(/({|})/g, '') != ((_d = result._msdyn_functionallocation_value) === null || _d === void 0 ? void 0 : _d.toUpperCase())))) {
                                form_4.getAttribute("msdyn_servicerequest").setValue(null);
                            }
                        }, function (error) {
                            showErrorMessageAlert(error);
                        });
                    }
                    // Setup a custom view
                    // This value is never saved and only needs to be unique among the other available views for the lookup.
                    var viewId = '{5B58559F-F162-5428-4771-79BC825240B3}';
                    var entityName = "incident";
                    var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredCases");
                    var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"> <entity name="incident"> <attribute name="ticketnumber" /> <attribute name="incidentid" /> <order attribute="ticketnumber" descending="false" /> <filter type="and">' + regionCondition + countryCondition + stakeholderCondition + siteCondition + ' </filter> </entity> </fetch>';
                    var layoutXml = '<grid name="resultset" object="10010" jump="title" select="1" icon="1" preview="1"><row name="result" id="incidentid"><cell name="title" width="200" /></row></grid>';
                    form_4.getControl("msdyn_servicerequest").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        WorkOrder.updateCaseView = updateCaseView;
        function revisedQuarterOnChange(eContext) {
            var form = eContext.getFormContext();
            var revisedQuarterAttribute = form.getAttribute("ovs_revisedquarterid");
            var currentFiscalQuarterAttribute = form.getAttribute("ovs_currentfiscalquarter");
            var plannedFiscalQuarterAttribute = form.getAttribute("ovs_fiscalquarter");
            var revisedQuarterAttributeValue = revisedQuarterAttribute.getValue();
            var currentFiscalQuarterAttributeValue = currentFiscalQuarterAttribute.getValue();
            var plannedFiscalQuarterAttributeValue = plannedFiscalQuarterAttribute.getValue();
            if (revisedQuarterAttributeValue != null) {
                currentFiscalQuarterAttribute.setValue(revisedQuarterAttributeValue);
            }
            else {
                if (plannedFiscalQuarterAttribute != null) {
                    currentFiscalQuarterAttribute.setValue(plannedFiscalQuarterAttributeValue);
                }
                else {
                    currentFiscalQuarterAttribute.setValue(null);
                }
            }
        }
        WorkOrder.revisedQuarterOnChange = revisedQuarterOnChange;
        function dateWindowEndOnChange(eContext) {
            var form = eContext.getFormContext();
            var dateWindowEndValue = form.data.entity.attributes.get("msdyn_datewindowend").getValue();
            var fiscalQuarterAttribute = form.data.entity.attributes.get("ovs_fiscalquarter");
            var fetchXml = "<fetch distinct=\"false\" mapping=\"logical\" output-format=\"xml-platform\" version=\"1.0\"> <entity name=\"tc_tcfiscalquarter\"> <attribute name=\"tc_name\"/> <attribute name=\"tc_tcfiscalquarterid\"/> <attribute name=\"tc_tcfiscalyearid\"/> <filter type=\"and\"> <condition operator=\"this-fiscal-year\" attribute = \"tc_quarterstart\"/> </filter> </entity> </fetch>";
            fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
            Xrm.WebApi.retrieveMultipleRecords("tc_tcfiscalquarter", fetchXml).then(function success(result) {
                if (result.entities.length > 0) {
                    if (dateWindowEndValue != null) {
                        var m = Math.floor(dateWindowEndValue.getMonth() / 3);
                        var lookup = new Array();
                        lookup[0] = new Object();
                        lookup[0].id = result.entities[m].tc_tcfiscalquarterid;
                        lookup[0].name = result.entities[m].tc_name;
                        lookup[0].entityType = 'tc_tcfiscalquarter';
                        fiscalQuarterAttribute.setValue(lookup);
                    }
                }
            }, function (error) {
            });
        }
        WorkOrder.dateWindowEndOnChange = dateWindowEndOnChange;
        // FUNCTIONS
        function showErrorMessageAlert(error) {
            var alertStrings = { text: error.message };
            var alertOptions = { height: 120, width: 260 };
            Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function () { });
        }
        function setDefaultFiscalYear(form) {
            XrmQuery.retrieveMultiple(function (x) { return x.tc_tcfiscalyears; })
                .select(function (x) { return [x.tc_name]; })
                .filter(function (x) { return Filter.equals(x.tc_iscurrentfiscalyear, true); })
                .execute(function (fiscalYears) {
                //should only return one fiscal year record as the current
                if (fiscalYears.length === 1) {
                    var targetedFiscalYear = fiscalYears[0];
                    var lookup = new Array();
                    lookup[0] = new Object();
                    lookup[0].id = targetedFiscalYear.tc_tcfiscalyearid;
                    lookup[0].name = targetedFiscalYear.tc_name;
                    lookup[0].entityType = 'tc_tcfiscalyear';
                    form.getAttribute('ovs_fiscalyear').setValue(lookup);
                }
                else {
                    // do not set a default if multiple records are found, error.
                }
            });
        }
        function removeSelectedFiscalQuarter(eContext) {
            var form = eContext.getFormContext();
            form.getAttribute('ovs_fiscalquarter').setValue(null);
        }
        function setRegion(form) {
            var regionAttribute = form.getAttribute("ts_region");
            var regionAttributeValue = regionAttribute.getValue();
            var currentUserId = Xrm.Utility.getGlobalContext().userSettings.userId;
            currentUserId = currentUserId.replace(/[{}]/g, "");
            if (!(regionAttributeValue === null || regionAttributeValue === void 0 ? void 0 : regionAttributeValue[0].name)) {
                // Get the user's territory
                Xrm.WebApi.retrieveRecord("systemuser", currentUserId, "?$select=_territoryid_value").then(function success(result) {
                    if (result != null && result["_territoryid_value"] != null) {
                        // NOTE: Our localization plugin can't localize the territory name on system user
                        // So we do an extra call to the territory table to get the localized name
                        Xrm.WebApi.retrieveRecord("territory", result["_territoryid_value"], "?$select=name").then(function success(result) {
                            var territoryId = result["territoryid"];
                            var territoryName = result["name"];
                            var territoryLogicalName = "territory";
                            var lookup = new Array();
                            lookup[0] = new Object();
                            lookup[0].id = territoryId;
                            lookup[0].name = territoryName;
                            lookup[0].entityType = territoryLogicalName;
                            form.getAttribute('ts_region').setValue(lookup);
                            form.getControl("ts_region").setDisabled(false);
                            if (lookup[0].name == "International") {
                                form.getControl("ts_country").setVisible(true);
                                form.getAttribute("ts_country").setRequiredLevel("required");
                                form.getControl("ts_country").setDisabled(false);
                            }
                            else {
                                //setOperationTypeFilteredView(form, territoryId, "", "");
                                //form.getControl("ovs_operationtypeid").setDisabled(true);
                            }
                        }, function (error) {
                            showErrorMessageAlert(error);
                        });
                    }
                }, function (error) {
                    showErrorMessageAlert(error);
                });
            }
        }
        function setActivityTypeFilteredView(form, operationAttributeId, workOrderTypeAttributeId, operationTypeAttributeId) {
            //Check whether this is a AvSec WO by using the operation
            var operationTypeOwningBusinessUnitFetchXML = [
                "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true' no-lock='false'>",
                "  <entity name='businessunit'>",
                "    <attribute name='name'/>",
                "    <attribute name='businessunitid'/>",
                "    <filter>",
                "      <condition attribute='name' operator='like' value='Avia%'/>",
                "    </filter>",
                "    <link-entity name='ovs_operationtype' from='owningbusinessunit' to='businessunitid' link-type='inner'>",
                "      <filter>",
                "        <condition attribute='ovs_operationtypeid' operator='eq' value='", operationTypeAttributeId, "'/>",
                "      </filter>",
                "    </link-entity>",
                "  </entity>",
                "</fetch>"
            ].join("");
            operationTypeOwningBusinessUnitFetchXML = "?fetchXml=" + operationTypeOwningBusinessUnitFetchXML;
            Xrm.WebApi.retrieveMultipleRecords('businessunit', operationTypeOwningBusinessUnitFetchXML).then(function success(result) {
                var operationActivityFilter = "";
                if (result.entities.length == 1) { //Add the operation activity filter if it's an AvSec workorder
                    operationActivityFilter += "<link-entity name='ts_operationactivity' from='ts_activity' to='msdyn_incidenttypeid' link-type='inner'><filter><condition attribute='ts_operation' operator='eq' value='" + operationAttributeId + "'/><condition attribute='ts_operationalstatus' operator='eq' value='717750000'/></filter></link-entity>";
                }
                var fetchXmlActivity = "";
                var viewIdActivity = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F661}';
                var entityNameActivity = "msdyn_incidenttype";
                var viewDisplayNameActivity = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredActivityType");
                var layoutXmlActivity = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_incidenttypeid"><cell name="msdyn_name" width="200" /></row></grid>';
                if (!isFromCase) {
                    fetchXmlActivity = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="msdyn_incidenttype"><attribute name="msdyn_name" /><attribute name="msdyn_incidenttypeid" /><order attribute="msdyn_name" descending="false" /><filter type="and"><condition attribute="msdyn_defaultworkordertype" operator="eq" uiname="Inspection" uitype="msdyn_workordertype" value="' + workOrderTypeAttributeId + '" /></filter><link-entity name="ts_ovs_operationtypes_msdyn_incidenttypes" from="msdyn_incidenttypeid" to="msdyn_incidenttypeid" visible="false" intersect="true"><link-entity name="ovs_operationtype" from="ovs_operationtypeid" to="ovs_operationtypeid" alias="ab"><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeId + '" /></filter></link-entity></link-entity>' + operationActivityFilter + '</entity></fetch>';
                }
                else {
                    var viewIdActivity_1 = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F661}';
                    var entityNameActivity_1 = "msdyn_incidenttype";
                    var viewDisplayNameActivity_1 = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredActivityType");
                    fetchXmlActivity = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="msdyn_incidenttype"><attribute name="msdyn_name" /><attribute name="msdyn_incidenttypeid" /><order attribute="msdyn_name" descending="false" /><filter type="and"><condition attribute="msdyn_defaultworkordertype" operator="eq" uiname="Inspection" uitype="msdyn_workordertype" value="' + workOrderTypeAttributeId + '" /></filter><link-entity name="ts_ovs_operationtypes_msdyn_incidenttypes" from="msdyn_incidenttypeid" to="msdyn_incidenttypeid" visible="false" intersect="true"><link-entity name="ovs_operationtype" from="ovs_operationtypeid" to="ovs_operationtypeid" alias="ab"><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeId + '" /></filter></link-entity></link-entity></entity></fetch>';
                    var layoutXmlActivity_1 = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_incidenttypeid"><cell name="msdyn_name" width="200" /></row></grid>';
                }
                form.getControl("msdyn_primaryincidenttype").addCustomView(viewIdActivity, entityNameActivity, viewDisplayNameActivity, fetchXmlActivity, layoutXmlActivity, true);
                form.getControl("msdyn_primaryincidenttype").setDisabled(false);
            });
        }
        function setCountryFilteredView(form) {
            form.getControl("ts_country").setVisible(true);
            form.getAttribute("ts_country").setRequiredLevel("required");
            var viewId = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F662}';
            var entityName = "tc_country";
            var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredCountries");
            var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"><entity name="tc_country"><attribute name="tc_countryid"/><attribute name="tc_name"/><filter><condition attribute="tc_countrynameenglish" operator="ne" value="CANADA" /></filter><order attribute="tc_name" descending="false" /><link-entity name="msdyn_functionallocation" from="ts_country" to="tc_countryid" link-type="inner" alias="ag"><link-entity name="ovs_operation" from="ts_site" to="msdyn_functionallocationid" link-type="inner" alias="ah" /></link-entity></entity></fetch>';
            var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="tc_countryid"><cell name="tc_name" width="200" /></row></grid>';
            form.getControl("ts_country").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
        }
        function setOperationTypeFilteredView(form, regionAttributeId, countryCondition, workOrderTypeAttributeId, stakeholderTypeAttributeId, siteAttributeId) {
            form.getControl("ovs_operationtypeid").setDisabled(false);
            var viewId = '{8982C38D-8BB4-4C95-BD05-493398FEAE99}';
            var entityName = "ovs_operationtype";
            var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredOperationTypes");
            var fetchXml = (isFromCase && stakeholderTypeAttributeId != "" && siteAttributeId != "") ? '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"> <entity name="ovs_operationtype"> <attribute name="ovs_operationtypeid" /> <attribute name="ovs_name" /> <attribute name="createdon" /> <order attribute="ovs_name" descending="false" /> <link-entity name="ts_ovs_operationtypes_msdyn_incidenttypes" from="ovs_operationtypeid" to="ovs_operationtypeid" visible="false" intersect="true"> <link-entity name="msdyn_incidenttype" from="msdyn_incidenttypeid" to="msdyn_incidenttypeid" alias="ah"> <filter type="and"> <condition attribute="msdyn_defaultworkordertype" operator="eq" value="' + workOrderTypeAttributeId + '" /> </filter> </link-entity> </link-entity> <link-entity name="ovs_operation" from="ovs_operationtypeid" to="ovs_operationtypeid" link-type="inner" alias="ai"> <filter type="and"><condition attribute="ts_operationalstatus" operator="ne" value="717750001" /><condition attribute="ts_stakeholder" operator="eq" value="' + stakeholderTypeAttributeId + '" /></filter> <link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="ts_site" link-type="inner" alias="aj"> <filter type="and"> <condition attribute="ts_region" operator="eq" value="' + regionAttributeId + '" />' + countryCondition + '<condition attribute="msdyn_functionallocationid" operator="eq" value="' + siteAttributeId + '" /> </filter> </link-entity> </link-entity> </entity> </fetch>' : '<fetch distinct="true" page="1"><entity name="ovs_operationtype"><attribute name="statecode"/><attribute name="ovs_operationtypeid"/><attribute name="ovs_name"/><attribute name="createdon"/><link-entity name="ts_ovs_operationtypes_msdyn_incidenttypes" from="ovs_operationtypeid" to="ovs_operationtypeid" visible="false" intersect="true"><link-entity name="msdyn_incidenttype" from="msdyn_incidenttypeid" to="msdyn_incidenttypeid" alias="ad"><filter type="and"><condition attribute="msdyn_defaultworkordertype" operator="eq" value="' + workOrderTypeAttributeId + '" /></filter></link-entity></link-entity><link-entity name="ovs_operation" from="ovs_operationtypeid" to="ovs_operationtypeid" link-type="inner" alias="ae"><link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="ts_site" link-type="inner" alias="af"><filter type="and"><condition attribute="ts_region" operator="eq" value="' + regionAttributeId + '" />' + countryCondition + '</filter></link-entity></link-entity></entity></fetch>';
            var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="ovs_operationtypeid"><cell name="ovs_name" width="200" /></row></grid>';
            form.getControl("ovs_operationtypeid").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
        }
        function setTradeViewFilteredView(form, regionAttributeId, countryCondition, workOrderTypeAttributeId, stakeholderTypeAttributeId, siteAttributeId, operationTypeAttributeId) {
            // Enable direct dependent field
            form.getControl("ts_tradenameid").setDisabled(false);
            var viewIdTradename = '{1c259fee-0541-4cac-8d20-7b30ee398065}';
            var entityNameTradename = "ts_tradename";
            var viewDisplayNameTradename = "FilteredSTradenames";
            var fetchXmlTradename = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" returntotalrecordcount="true" page="1" no-lock="false"><entity name="ts_tradename" ><attribute name="ts_tradenameid" /><attribute name="ts_name" /><order attribute="ts_stakeholderidname" /><order attribute="ts_name" /><link-entity name="account" from="accountid" to="ts_stakeholderid" ><filter type="and"><condition attribute="ts_stakeholderstatus" operator="ne" value="717750001" /></filter><link-entity name="ovs_operation" from="ts_stakeholder" to="accountid" link-type="inner" alias="ac"><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeId + '"/><condition attribute="ts_operationalstatus" operator="eq" value="717750000"/></filter><link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="ts_site" link-type="inner" alias="ad"><filter type="and"><condition attribute="ts_region" operator="eq" value="' + regionAttributeId + '"/>' + countryCondition + '</filter></link-entity></link-entity></link-entity></entity></fetch>';
            var layoutXmlTradename = '<grid name="resultset" object="10010" jump="ts_name" select="1" icon="1" preview="1"><row name="result" id="ts_tradenameid"><cell name="ts_name" width="200" /></row></grid>';
            form.getControl("ts_tradenameid").addCustomView(viewIdTradename, entityNameTradename, viewDisplayNameTradename, fetchXmlTradename, layoutXmlTradename, true);
        }
        function setSiteFilteredView(form, regionAttributeId, countryCondition, workOrderTypeAttributeId, stakeholderTypeAttributeId, siteAttributeId, operationTypeAttributeId) {
            // Enable direct dependent field
            form.getControl("ts_site").setDisabled(false);
            // Custom view
            var viewId = '{6E57251F-F695-4076-9498-49AB892154B7}';
            var entityName = "msdyn_functionallocation";
            var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredSites");
            var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" returntotalrecordcount="true" page="1" count="25" no-lock="false"><entity name="msdyn_functionallocation"><attribute name="statecode"/><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><filter>' + countryCondition + '</filter><filter><condition attribute="ts_region" operator="eq" value="' + regionAttributeId + '"/></filter><filter><condition attribute="ts_sitestatus" operator="ne" value="717750001" /></filter><order attribute="msdyn_name" descending="false"/><link-entity name="ovs_operation" from="ts_site" to="msdyn_functionallocationid"><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value=" ' + operationTypeAttributeId + '"/><condition attribute="ts_stakeholder" operator="eq" value="' + stakeholderTypeAttributeId + '"/><condition attribute="ts_operationalstatus" operator="eq" value="717750000"/></filter></link-entity></entity></fetch>';
            var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="200" /></row></grid>';
            form.getControl("ts_site").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
        }
        function setIncompleteWorkOrderReasonFilteredView(form) {
            //Find out if the Work Order Type belongs to ISSO or AvSec
            var selectedOperationTypeId = form.getAttribute("ovs_operationtypeid").getValue();
            var ownerId;
            if (selectedOperationTypeId != null && selectedOperationTypeId != undefined) {
                Xrm.WebApi.retrieveRecord("ovs_operationtype", selectedOperationTypeId[0].id.replace(/({|})/g, ''), undefined).then(function success(result) {
                    ownerId = result._ownerid_value;
                    //Now filter the lookup
                    if (ownerId != null) {
                        form.getControl("ts_incompleteworkorderreason").setDisabled(false);
                        var viewId = '{736A4E08-E24F-4961-ADB4-BBAAB4119EE0}';
                        //Keep the option to select 'Other' available no matter who the Work Order Type belongs to
                        var otherId = '8B3B6A28-C5FB-EC11-82E6-002248AE441F';
                        var entityName = "ts_incompleteworkorderreason";
                        var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredIncompleteWorkOrderReasons");
                        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" returntotalrecordcount="true" page="1" count="25" no-lock="false"><entity name="ts_incompleteworkorderreason"><attribute name="ts_incompleteworkorderreasonid" /><attribute name="ts_name" /><filter type="or"><condition attribute="ownerid" operator="eq" value="' + ownerId + '" /><condition attribute="ts_incompleteworkorderreasonid" operator="eq" value="' + otherId + '" /></filter><order attribute="ts_name" /></entity></fetch>';
                        var layoutXml = '<grid name="resultset" object="10010" jump="ts_name" select="1" icon="1" preview="1"><row name="result" id="ts_incompleteworkorderreasonid"><cell name="ts_name" width="200" /></row></grid>';
                        form.getControl("ts_incompleteworkorderreason").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                    }
                }, function (error) {
                });
            }
        }
        function getCountryFetchXmlCondition(form) {
            var regionAttribute = form.getAttribute("ts_region");
            var regionAttributeValue = regionAttribute.getValue();
            var countryAttribute = form.getAttribute("ts_country");
            var countryAttributeValue = countryAttribute.getValue();
            if (regionAttributeValue != null && countryAttributeValue != null && countryAttributeValue != undefined) {
                if (regionAttributeValue[0].name != "International") {
                    form.getControl("ts_site").setDisabled(false);
                }
                else {
                    return '<condition attribute="ts_country" operator="eq" value="' + countryAttributeValue[0].id + '" />';
                }
            }
            return "";
        }
        function closeWorkOrderServiceTasks(formContext, workOrderServiceTaskData) {
            Xrm.WebApi.retrieveMultipleRecords("msdyn_workorderservicetask", "?$select=msdyn_workorder&$filter=msdyn_workorder/msdyn_workorderid eq " + formContext.data.entity.getId()).then(function success(result) {
                for (var i = 0; i < result.entities.length; i++) {
                    Xrm.WebApi.updateRecord("msdyn_workorderservicetask", result.entities[i].msdyn_workorderservicetaskid, workOrderServiceTaskData).then(function success(result) {
                        //work order service task closed successfully
                    }, function (error) {
                        showErrorMessageAlert(error);
                    });
                }
            }, function (error) {
                showErrorMessageAlert(error);
            });
        }
        function setWorkOrderServiceTasksView(form, active) {
            var workOrderView;
            if (active) {
                workOrderView =
                    {
                        entityType: "savedquery",
                        id: "{C9FD8F4D-8184-4DDB-A31A-89E66E8E710E}",
                        name: "Active Work Order Service Tasks"
                    };
            }
            else {
                workOrderView =
                    {
                        entityType: "savedquery",
                        id: "{2F145106-BCB3-4F0F-9D02-E8C3B6BB25E8}",
                        name: "Inactive Work Order Service Tasks"
                    };
            }
            if (form.getControl("workorderservicetasksgrid").getViewSelector().getCurrentView() != workOrderView) {
                form.getControl("workorderservicetasksgrid").getViewSelector().setCurrentView(workOrderView);
            }
        }
        function setCantCompleteinspectionVisibility(form) {
            var systemStatus = form.getAttribute("msdyn_systemstatus").getValue();
            var plannedFiscalQuarter = form.getAttribute("ovs_fiscalquarter").getValue();
            var validWorkOrderStatus = false;
            if (systemStatus != null && (systemStatus == 690970000 /* New */ || systemStatus == 690970001 /* Scheduled */ || systemStatus == 690970002 /* InProgress */)) {
                validWorkOrderStatus = true;
            }
            if (plannedFiscalQuarter != null) {
                //fetch the end date of the Planned Fiscal Quarter
                Xrm.WebApi.retrieveRecord("tc_tcfiscalquarter", plannedFiscalQuarter[0].id.replace(/({|})/g, ''), "?$select=tc_quarterend").then(function success(result) {
                    var currentDateTime = new Date();
                    var quarterendDate = new Date(result.tc_quarterend);
                    //if we are past the end date of the quarter and have a valid work order status, make the Can't Complete Inspection visible, otherwise hide it
                    if (quarterendDate < currentDateTime && validWorkOrderStatus) {
                        setCantCompleteInspectionControlsVisibility(form, true);
                    }
                    else {
                        //Hide the Can't Complete Inspection if there is no Planned Fiscal Quarter set
                        setCantCompleteInspectionControlsVisibility(form, false);
                    }
                }, function (error) {
                    setCantCompleteInspectionControlsVisibility(form, false);
                    showErrorMessageAlert("Error fetching the end date of the Planned Fiscal Quarter: " + error);
                });
            }
            else {
                //Hide the Can't Complete Inspection if there is no Planned Fiscal Quarter set
                setCantCompleteInspectionControlsVisibility(form, false);
            }
        }
        function setCantCompleteInspectionControlsVisibility(form, visibility) {
            var cantCompleteInspectionSelection = form.getAttribute("ts_cantcompleteinspection").getValue();
            if (visibility == true) {
                form.getControl("ts_cantcompleteinspection").setVisible(visibility);
                if (cantCompleteInspectionSelection == true) {
                    var reason = form.getAttribute("ts_incompleteworkorderreason").getValue();
                    form.getControl("ts_incompleteworkorderreason").setVisible(visibility);
                    if (reason != null) {
                        //Determine if 'Other' is selected - if it is show the reason for other
                        if (reason[0].id == "{8B3B6A28-C5FB-EC11-82E6-002248AE441F}") {
                            form.getControl("ts_incompleteworkorderreasonforother").setVisible(true);
                        }
                        else {
                            form.getControl("ts_incompleteworkorderreasonforother").setVisible(false);
                        }
                    }
                    else {
                        form.getControl("ts_incompleteworkorderreasonforother").setVisible(false);
                    }
                }
                else {
                    form.getControl("ts_incompleteworkorderreason").setVisible(false);
                    form.getControl("ts_incompleteworkorderreasonforother").setVisible(false);
                    form.getAttribute("ts_cantcompleteinspection").setValue(false);
                    form.getAttribute("ts_incompleteworkorderreason").setValue(null);
                    form.getAttribute("ts_incompleteworkorderreasonforother").setValue(null);
                }
            }
            else {
                form.getControl("ts_cantcompleteinspection").setVisible(visibility);
                form.getControl("ts_incompleteworkorderreason").setVisible(visibility);
                form.getControl("ts_incompleteworkorderreasonforother").setVisible(visibility);
                form.getAttribute("ts_cantcompleteinspection").setValue(false);
                form.getAttribute("ts_incompleteworkorderreason").setValue(null);
                form.getAttribute("ts_incompleteworkorderreasonforother").setValue(null);
            }
        }
        //Checks if the Activity Type should have been able to be changed
        //Puts old value in and locks the control if it shouldn't have been able to be changed
        //This is needed when a service task is changed to in-progress and the work order form remained open.
        function activityTypeOnChange(eContext) {
            var formContext = eContext.getFormContext();
            if (formContext.ui.getFormType() == 1) {
                return;
            }
            var workOrderId = formContext.data.entity.getId();
            var activityTypeControl = formContext.getControl("msdyn_primaryincidenttype");
            //Retrieve all related Service Tasks
            var fetchXml = [
                "<fetch top='50'>",
                "  <entity name='msdyn_workorderservicetask'>",
                "    <attribute name='statuscode' />",
                "    <attribute name='statecode' />",
                "    <filter>",
                "      <condition attribute='msdyn_workorder' operator='eq' value='", workOrderId, "'/>",
                "    </filter>",
                "  </entity>",
                "</fetch>",
            ].join("");
            fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
            Xrm.WebApi.retrieveMultipleRecords("msdyn_workorderservicetask", fetchXml).then(function (result) {
                if (result.entities.length == 0) {
                    activityTypeControl.setDisabled(false);
                }
                else {
                    var workOrderHasActiveWost = false;
                    var workOrderHasNewWost = false;
                    for (var _i = 0, _a = result.entities; _i < _a.length; _i++) {
                        var wost = _a[_i];
                        if (wost.statecode == 0) {
                            workOrderHasActiveWost = true;
                            if (wost.statuscode == 918640005 /* New */)
                                workOrderHasNewWost = true;
                        }
                    }
                    if (!(workOrderHasNewWost || !workOrderHasActiveWost)) {
                        //The Activity type should not have been able to change. Set it to the old value and lock the field.
                        Xrm.WebApi.retrieveRecord("msdyn_workorder", workOrderId, "?$select=_msdyn_primaryincidenttype_value&$expand=msdyn_primaryincidenttype($select=ovs_incidenttypenameenglish,ovs_incidenttypenamefrench)").then(function (result) {
                            var incidentTypeName = (Xrm.Utility.getGlobalContext().userSettings.languageId == 1036) ? result.msdyn_primaryincidenttype.ovs_incidenttypenamefrench : result.msdyn_primaryincidenttype.ovs_incidenttypenameenglish;
                            formContext.getAttribute("msdyn_primaryincidenttype").setValue([{
                                    id: result._msdyn_primaryincidenttype_value,
                                    name: incidentTypeName,
                                    entityType: "msdyn_incidenttype"
                                }]);
                            activityTypeControl.setDisabled(true);
                        });
                    }
                    else {
                        formContext.data.save();
                    }
                }
            });
            var operation = formContext.getAttribute("ovs_operationid").getValue();
            var operationType = formContext.getAttribute("ovs_operationtypeid").getValue();
            var workOrderType = formContext.getAttribute("msdyn_workordertype").getValue();
            if (operation != null && operationType != null && workOrderType != null) {
                setActivityTypeFilteredView(formContext, operation[0].id, workOrderType[0].id, operationType[0].id);
            }
        }
        WorkOrder.activityTypeOnChange = activityTypeOnChange;
        //Enables the Activity Type control if there is a New WOST or no Active WOSTs yet
        function setActivityTypeDisabled(eContext) {
            var formContext = eContext.getFormContext();
            var workOrderId = formContext.data.entity.getId();
            var activityTypeControl = formContext.getControl("msdyn_primaryincidenttype");
            //Retrieve all related Service Tasks
            var fetchXml = [
                "<fetch top='50'>",
                "  <entity name='msdyn_workorderservicetask'>",
                "    <attribute name='statuscode' />",
                "    <attribute name='statecode' />",
                "    <filter>",
                "      <condition attribute='msdyn_workorder' operator='eq' value='", workOrderId, "'/>",
                "    </filter>",
                "  </entity>",
                "</fetch>",
            ].join("");
            fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
            Xrm.WebApi.retrieveMultipleRecords("msdyn_workorderservicetask", fetchXml).then(function (result) {
                if (result.entities.length == 0) {
                    activityTypeControl.setDisabled(false);
                }
                else {
                    var workOrderHasActiveWost = false;
                    var workOrderHasNewWost = false;
                    for (var _i = 0, _a = result.entities; _i < _a.length; _i++) {
                        var wost = _a[_i];
                        if (wost.statecode == 0) {
                            workOrderHasActiveWost = true;
                            if (wost.statuscode == 918640005 /* New */)
                                workOrderHasNewWost = true;
                        }
                    }
                    if (workOrderHasNewWost || !workOrderHasActiveWost) {
                        activityTypeControl.setDisabled(false);
                    }
                    else {
                        activityTypeControl.setDisabled(true);
                    }
                }
            });
        }
        function userHasRole(rolesName) {
            var userRoles = Xrm.Utility.getGlobalContext().userSettings.roles;
            var hasRole = false;
            var roles = rolesName.split("|");
            roles.forEach(function (roleItem) {
                userRoles.forEach(function (userRoleItem) {
                    if (userRoleItem.name.toLowerCase() == roleItem.toLowerCase())
                        hasRole = true;
                });
            });
            return hasRole;
        }
        WorkOrder.userHasRole = userHasRole;
        function cantCompleteInspectionOnChange(eContext) {
            var form = eContext.getFormContext();
            var cantCompleteInspection = form.getAttribute("ts_cantcompleteinspection").getValue();
            if (cantCompleteInspection == true) {
                setCantCompleteInspectionControlsVisibility(form, true);
                form.getAttribute("ts_incompleteworkorderreason").setRequiredLevel("required");
                form.getControl("ts_incompleteworkorderreason").setFocus();
            }
            else {
                setCantCompleteInspectionControlsVisibility(form, false);
                form.getControl("ts_cantcompleteinspection").setVisible(true);
                form.getAttribute("ts_incompleteworkorderreason").setRequiredLevel("none");
            }
        }
        WorkOrder.cantCompleteInspectionOnChange = cantCompleteInspectionOnChange;
        function incompleteWorkOrderReasonOnChange(eContext) {
            var form = eContext.getFormContext();
            var selectedIncompleteWorkOrderReason = form.getAttribute("ts_incompleteworkorderreason").getValue();
            var selectedOther = "{8B3B6A28-C5FB-EC11-82E6-002248AE441F}";
            //If 'Other' is selected as a reason, make ts_incompleteworkorderreasonforother visible
            if (selectedIncompleteWorkOrderReason != null && selectedIncompleteWorkOrderReason[0].id.toUpperCase() == selectedOther) {
                form.getControl("ts_incompleteworkorderreasonforother").setVisible(true);
                form.getControl("ts_incompleteworkorderreasonforother").setFocus();
                form.getAttribute("ts_incompleteworkorderreasonforother").setRequiredLevel("required");
            }
            else {
                form.getControl("ts_incompleteworkorderreasonforother").setVisible(false);
                form.getAttribute("ts_incompleteworkorderreasonforother").setValue(null);
                form.getAttribute("ts_incompleteworkorderreasonforother").setRequiredLevel("none");
            }
        }
        WorkOrder.incompleteWorkOrderReasonOnChange = incompleteWorkOrderReasonOnChange;
        function fiscalQuarterOnChange(eContext) {
            var form = eContext.getFormContext();
            //Check if the Work Order is past the Planned Fiscal Quarter
            setCantCompleteinspectionVisibility(form);
        }
        WorkOrder.fiscalQuarterOnChange = fiscalQuarterOnChange;
        function canceledWorkOrderReasonOnChange(eContext) {
            var form = eContext.getFormContext();
            var selectedCanceledWorkOrderReason = form.getAttribute("ts_canceledinspectionjustification").getValue();
            var selectedOther = "{A8D7125C-7F24-ED11-9DB2-002248AE429C}";
            //If 'Other' is selected as a reason, make ts_othercanceledjustification visible
            if (selectedCanceledWorkOrderReason != null && selectedCanceledWorkOrderReason[0].id.toUpperCase() == selectedOther) {
                form.getControl("ts_othercanceledjustification").setVisible(true);
                form.getAttribute("ts_othercanceledjustification").setRequiredLevel("required");
            }
            else {
                form.getControl("ts_othercanceledjustification").setVisible(false);
                form.getAttribute("ts_othercanceledjustification").setValue(null);
                form.getAttribute("ts_othercanceledjustification").setRequiredLevel("none");
            }
        }
        WorkOrder.canceledWorkOrderReasonOnChange = canceledWorkOrderReasonOnChange;
        function populateOperationField(eContext) {
            var form = eContext.getFormContext();
            var operationTypeAttribute = form.getAttribute("ovs_operationtypeid");
            var stakeholderAttribute = form.getAttribute("msdyn_serviceaccount");
            var siteAttribute = form.getAttribute("ts_site");
            var workOrderTypeAttribute = form.getAttribute("msdyn_workordertype");
            if (siteAttribute != null && siteAttribute != undefined) {
                // Clear out operation and subsite value if not already empty
                if (form.getAttribute("ovs_operationid").getValue() != null)
                    form.getAttribute("ovs_operationid").setValue(null);
                // If an operation type is selected, we use the filtered fetchxml, otherwise, disable and clear out the dependent fields
                var operationTypeAttributeValue_2 = operationTypeAttribute.getValue();
                var stakeholderAttributeValue = stakeholderAttribute.getValue();
                var siteAttributeValue = siteAttribute.getValue();
                var workOrderTypeAttributeValue_2 = workOrderTypeAttribute.getValue();
                if (siteAttributeValue != null && siteAttributeValue != undefined &&
                    stakeholderAttributeValue != null && stakeholderAttributeValue != undefined &&
                    operationTypeAttributeValue_2 != null && operationTypeAttributeValue_2 != undefined &&
                    workOrderTypeAttribute != null && workOrderTypeAttributeValue_2 != null) {
                    // Populate operation asset
                    var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="ovs_operation"><attribute name="ovs_name"/><attribute name="ts_stakeholder"/><attribute name="ts_site"/><attribute name="ovs_operationid"/><attribute name="ts_operationalstatus"/><order attribute="ovs_name" descending="true"/><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeValue_2[0].id + '"/><condition attribute="ts_site" operator="eq" value="' + siteAttributeValue[0].id + '"/><condition attribute="ts_stakeholder" operator="eq" value="' + stakeholderAttributeValue[0].id + '"/></filter></entity></fetch>';
                    var encodedFetchXml = encodeURIComponent(fetchXml);
                    Xrm.WebApi.retrieveMultipleRecords("ovs_operation", "?fetchXml=" + encodedFetchXml).then(function success(result) {
                        if (result.entities.length == 1) {
                            var targetOperation = result.entities[0];
                            var lookup = new Array();
                            lookup[0] = new Object();
                            lookup[0].id = targetOperation.ovs_operationid;
                            lookup[0].name = targetOperation.ovs_name;
                            lookup[0].entityType = 'ovs_operation';
                            if (targetOperation.ts_operationalstatus == 717750001) {
                                form.ui.setFormNotification((Xrm.Utility.getGlobalContext().userSettings.languageId == 1033 ? "The operation \"" + targetOperation.ovs_name + "\" is non-operational." : "L'opération \"" + targetOperation.ovs_name + "\" est  non opérationnelle."), "ERROR", "non-operational-operation");
                                form.getAttribute('ts_site').setValue(null);
                            }
                            else {
                                form.ui.clearFormNotification("non-operational-operation");
                                form.getAttribute('ovs_operationid').setValue(lookup);
                            }
                            setActivityTypeFilteredView(form, lookup[0].id, workOrderTypeAttributeValue_2[0].id, operationTypeAttributeValue_2[0].id);
                        }
                        else {
                            // do not set a default if multiple records are found, error.
                        }
                    }, function (error) {
                        showErrorMessageAlert(error);
                    });
                }
            }
        }
        function fillOrSetTradeNameView(eContext, stakeholderAttributeValue) {
            var form = eContext.getFormContext();
            var tradeNameFetchXML = '?fetchXml=' + '<fetch version="1.0" mapping="logical" returntotalrecordcount="true" page="1" count="25" no-lock="false"><entity name="ts_tradename"><attribute name="statecode"/><attribute name="ts_tradenameid"/><attribute name="ts_name"/><attribute name="createdon"/><filter type="and"><condition attribute="statecode" operator="eq" value="0"/><condition attribute="ts_stakeholderid" operator="eq" value="' + stakeholderAttributeValue[0].id + '"/></filter><attribute name="ts_stakeholderid"/><order attribute="ts_name" descending="false"/></entity></fetch>';
            Xrm.WebApi.retrieveMultipleRecords('ts_tradename', tradeNameFetchXML).then(function success(tradeNames) {
                if (tradeNames.entities.length == 1) {
                    var tradeName = new Array();
                    tradeName[0] = new Object();
                    tradeName[0].id = tradeNames.entities[0].ts_tradenameid;
                    tradeName[0].name = tradeNames.entities[0].ts_name;
                    tradeName[0].entityType = "ts_tradename";
                    form.getAttribute("ts_tradenameid").setValue(tradeName);
                }
                else if (tradeNames.entities.length > 1) {
                    form.getControl("ts_tradenameid").setDisabled(false);
                    var tradeNameCondition_1 = '';
                    tradeNames.entities.forEach(function (tradeName) { tradeNameCondition_1 += '<condition attribute="ts_tradenameid" operator="eq" value="' + tradeName.ts_tradenameid + '" />'; });
                    var viewIdTradename = '{1c859fee-0541-2cac-8d20-7b50ee398066}';
                    var entityNameTradename = "ts_tradename";
                    var viewDisplayNameTradename = "FilteredSTradenames";
                    var fetchXmlTradename = '<fetch version="1.0" mapping="logical" returntotalrecordcount="true" page="1" count="25" no-lock="false"><entity name="ts_tradename"><attribute name="statecode"/><attribute name="ts_tradenameid"/><attribute name="ts_name"/><attribute name="createdon"/><filter type="and"><condition attribute="statecode" operator="eq" value="0"/></filter><filter type="or">' + tradeNameCondition_1 + '</filter><attribute name="ts_stakeholderid"/><order attribute="ts_name" descending="false"/></entity></fetch>';
                    var layoutXmlTradename = '<grid name="resultset" object="10010" jump="ts_name" select="1" icon="1" preview="1"><row name="result" id="ts_tradenameid"><cell name="ts_name" width="200" /></row></grid>';
                    form.getControl("ts_tradenameid").addCustomView(viewIdTradename, entityNameTradename, viewDisplayNameTradename, fetchXmlTradename, layoutXmlTradename, true);
                }
            });
        }
        function showHideContact(form) {
            var operationTypeValue = form.getAttribute("ovs_operationtypeid").getValue();
            if (operationTypeValue != null && operationTypeValue[0].id == "{BE8B0910-C751-EB11-A812-000D3AF3AC0D}") { //Person
                form.getControl("ts_contact").setVisible(true);
            }
            else {
                form.getControl("ts_contact").setVisible(false);
            }
            //const operationTypeId = operationTypeValue ? operationTypeValue[0].id : "";
            //if (operationTypeId != "") {
            //    Xrm.WebApi.retrieveRecord("ovs_operationtype", operationTypeId, "?$select=_ownerid_value ").then(
            //        function success(result) {
            //            if (result._ownerid_value == "e2e3910d-a41f-ec11-b6e6-0022483cb5c7") {  //Owner is AvSec
            //                form.getControl("ts_contact").setVisible(true);
            //            }
            //            else {
            //                form.getControl("ts_contact").setVisible(false);
            //            }
            //        },
            //        function error(error) {
            //            Xrm.Navigation.openAlertDialog({ text: error.message });
            //        });
            //}
        }
        function isAvSecBusinessUnit() {
            return __awaiter(this, void 0, void 0, function () {
                var userId, currentUserBusinessUnitFetchXML, userBusinessUnitName;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            userId = Xrm.Utility.getGlobalContext().userSettings.userId;
                            currentUserBusinessUnitFetchXML = [
                                "<fetch top='50'>",
                                "  <entity name='businessunit'>",
                                "    <attribute name='name' />",
                                "    <attribute name='businessunitid' />",
                                "    <link-entity name='systemuser' from='businessunitid' to='businessunitid' link-type='inner' alias='ab'>>",
                                "      <filter>",
                                "        <condition attribute='systemuserid' operator='eq' value='", userId, "'/>",
                                "      </filter>",
                                "    </link-entity>",
                                "  </entity>",
                                "</fetch>",
                            ].join("");
                            currentUserBusinessUnitFetchXML = "?fetchXml=" + encodeURIComponent(currentUserBusinessUnitFetchXML);
                            return [4 /*yield*/, Xrm.WebApi.retrieveMultipleRecords("businessunit", currentUserBusinessUnitFetchXML)];
                        case 1:
                            userBusinessUnitName = _a.sent();
                            return [2 /*return*/, userBusinessUnitName.entities[0].name.startsWith("Aviation")];
                    }
                });
            });
        }
    })(WorkOrder = ROM.WorkOrder || (ROM.WorkOrder = {}));
})(ROM || (ROM = {}));
