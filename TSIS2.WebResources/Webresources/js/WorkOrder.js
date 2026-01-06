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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
        var scheduledQuarterAttributeValueChanged = false;
        var isROM20Form = false;
        var UNPLANNED_CATEGORY_ID = "47f438c7-c104-eb11-a813-000d3af3a7a7";
        WorkOrder.isEditWorkOrderEnabled = false;
        // EVENTS
        function onLoad(eContext) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            var form = eContext.getFormContext();
            //Check if user is using Rail Safety App to set filtered view for Work Order Type
            isUserUsingRailSafetyApp().then(function (isUsing) {
                if (isUsing) {
                    setWorkOrderTypeFilteredView(form, true);
                }
                else {
                    setWorkOrderTypeFilteredView(form, false);
                }
            });
            var state = (_a = form.getAttribute("statecode").getValue()) !== null && _a !== void 0 ? _a : null;
            var regionAttribute = form.getAttribute("ts_region");
            var regionAttributeValue = regionAttribute.getValue();
            var ownerControl = form.getControl("ownerid");
            var headerOwnerControl = form.getControl("header_ownerid");
            var formItem = form.ui.formSelector.getCurrentItem().getId();
            isROM20Form = formItem.toLowerCase() == "a629bb8a-da93-4e58-b777-3f338a46d4d8";
            currentSystemStatus = form.getAttribute("msdyn_systemstatus").getValue();
            //Set comment field visible if AvSec
            //Set Overtime field visible for AvSec
            var userId = Xrm.Utility.getGlobalContext().userSettings.userId;
            var currentUserBusinessUnitFetchXML = [
                "<fetch top='50'>",
                "  <entity name='businessunit'>",
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
                return __awaiter(this, void 0, void 0, function () {
                    var userBusinessUnitId, inAvSecBU;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                userBusinessUnitId = businessunit.entities[0].businessunitid;
                                return [4 /*yield*/, isAvSecBU(userBusinessUnitId)];
                            case 1:
                                inAvSecBU = _a.sent();
                                if (!inAvSecBU) {
                                    form.getControl("ts_details").setVisible(false);
                                    form.getControl("ts_overtime").setVisible(false);
                                    form.getControl("ts_overtimerequired").setVisible(true);
                                }
                                else if (inAvSecBU) {
                                    form.getControl("ts_details").setVisible(true);
                                    form.getControl("msdyn_instructions").setVisible(true);
                                    form.getControl("ts_accountableteam").setVisible(true);
                                    form.getControl("ts_plannedcost").setVisible(false);
                                    form.getControl("ts_actualcost").setVisible(false);
                                    form.getControl("ts_costexplanation").setVisible(false);
                                    form.getControl("ts_cantcompleteinspection").setVisible(false);
                                    // Hide overtime toggle for AvSec users in ROM20 form
                                    if (isROM20Form) {
                                        form.getControl("ts_overtimerequired").setVisible(false);
                                    }
                                    if (currentSystemStatus == 741130000 /* msdyn_wosystemstatus.Closed */ || currentSystemStatus == 690970005 /* msdyn_wosystemstatus.Cancelled */) {
                                        if (!userHasRole("System Administrator|ROM - Business Admin|ROM - Planner|ROM - Manager")) {
                                            form.getControl("msdyn_systemstatus").setDisabled(true);
                                        }
                                    }
                                }
                                //Set disabled false for quarter fields if ISSO
                                else {
                                    if (userHasRole("System Administrator|ROM - Business Admin|ROM - Planner|ROM - Manager|ROM - Inspector")) {
                                        form.getControl("ts_completedquarter").setDisabled(false);
                                        form.getControl("ovs_revisedquarterid").setDisabled(false);
                                    }
                                    else {
                                        form.getControl("ts_completedquarter").setDisabled(true);
                                        form.getControl("ovs_revisedquarterid").setDisabled(true);
                                    }
                                }
                                return [2 /*return*/];
                        }
                    });
                });
            });
            getUserTeam(userId).then(function (userTeams) {
                if (userTeams != null && userTeams.entities.length > 0) {
                    for (var i = 0; i < userTeams.entities.length; i++) {
                        if (userTeams.entities[i]["name"].indexOf("International - Inspectors") > 0) {
                            form.getControl("ovs_rational").setDisabled(false);
                        }
                    }
                }
            });
            //Keep track of the current system status, to be used when cancelling a status change.
            currentStatus = form.getAttribute("ts_state").getValue();
            // Auto-populate State field to Committed for Rail Safety users
            isUserUsingRailSafetyApp().then(function (isRailSafety) {
                if (isRailSafety) {
                    form.getAttribute("ts_state").setValue(717750001); // Committed
                    form.getControl("ts_state").setVisible(false);
                }
            });
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
            //Set Case Lookup Navigation to open Time Tracking form when on Time Tracking Tab
            setCaseLookupClickNavigation(eContext);
            //Set Security Incident Lookup Navigation to open Time Tracking form when on Time Tracking Tab
            setSecurityIncidentLookupClickNavigation(eContext);
            //Set Trip Lookup Navigation to open Time Tracking form when on Time Tracking Tab
            setTripLookupClickNavigation(eContext);
            showHideFiedsByOperationType(eContext);
            if (currentSystemStatus == 690970004 || currentSystemStatus == 741130000 /* msdyn_wosystemstatus.Closed */) {
                form.getControl("ts_completedquarter").setVisible(true);
            }
            else {
                form.getControl("ts_completedquarter").setVisible(false);
            }
            if (currentSystemStatus == 690970004 || currentSystemStatus == 690970003 || currentSystemStatus == 741130000 /* msdyn_wosystemstatus.Closed */) { //Closed ; Completed
                form.getControl("ovs_revisedquarterid").setDisabled(true);
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
            // Show "subsite" & "Sub subsite" fields if it has value on Edit or Readonly mode etc
            if (form.ui.getFormType() !== 1) {
                if (form.getAttribute("msdyn_functionallocation").getValue() != null) {
                    form.getControl('msdyn_functionallocation').setVisible(true);
                }
                if (form.getAttribute("ts_subsubsite").getValue() != null) {
                    form.getControl('ts_subsubsite').setVisible(true);
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
            if (form.getAttribute("ovs_fiscalquarter").getValue() != null && form.getAttribute("ovs_revisedquarterid").getValue() == null)
                form.getAttribute("ovs_revisedquarterid").setValue(form.getAttribute("ovs_fiscalquarter").getValue());
            setScheduledQuarterFilter(form);
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
                    if (isFromCase) {
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
                        lookup[0].id = "{".concat(UNPLANNED_CATEGORY_ID, "}");
                        lookup[0].name = "Unplanned";
                        lookup[0].entityType = "ovs_tyrational";
                        form.getAttribute("ovs_rational").setValue(lookup); //Unplanned
                        setFiscalQuarter(form);
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
                    //if (isFromSecurityIncident) {
                    //    const stakeholderAttribute = form.getAttribute("msdyn_serviceaccount");
                    //    const stakeholderAttributeValue = stakeholderAttribute!.getValue();
                    //    if (stakeholderAttributeValue != null) {
                    //        fillOrSetTradeNameView(eContext, stakeholderAttributeValue);
                    //    }
                    //}
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
                            //setTradeViewFilteredView(form, regionAttributeValue[0].id, countryCondition, workOrderTypeAttributeValue[0].id, "", "", operationTypeAttributeValue[0].id);
                            setSiteFilteredView(form, regionAttributeValue[0].id, countryCondition, "", stakeholderAttributeValue[0].id, "", operationTypeAttributeValue[0].id);
                        }
                    }
                    setActivityTypeDisabled(eContext);
                    if (currentSystemStatus == 690970004 || currentSystemStatus == 741130000 /* msdyn_wosystemstatus.Closed */) {
                        if (!userHasRole("System Administrator|ROM - Business Admin|ROM - Manager")) {
                            form.getControl("header_msdyn_systemstatus").setDisabled(true);
                        }
                    }
                    if (currentSystemStatus == 741130000 /* msdyn_wosystemstatus.Closed */) {
                        form.getControl("msdyn_workordertype").setDisabled(true);
                        form.getControl("ts_region").setDisabled(true);
                        form.getControl("ovs_operationtypeid").setDisabled(true);
                        //form.getControl("ts_tradenameid").setDisabled(true);
                        form.getControl("ts_site").setDisabled(true);
                        form.getControl("msdyn_worklocation").setDisabled(true);
                        form.getControl("header_ownerid").setDisabled(true);
                        form.getControl("ownerid").setDisabled(true);
                    }
                    //if (form.getAttribute("ts_trip").getValue() != null) {
                    //    form.getControl("ts_traveltime").setVisible(false);
                    //}
                    showHideContact(form);
                    break;
                default:
                    // Enable all operation related fields
                    form.getControl("ts_region").setDisabled(false);
                    form.getControl("ovs_operationtypeid").setDisabled(false);
                    //form.getControl("ts_tradenameid").setDisabled(false);
                    form.getControl("msdyn_serviceaccount").setDisabled(false);
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
            var fetchXML = "<fetch><entity name=\"msdyn_workorder\"><attribute name=\"msdyn_workorderid\"/><filter><condition attribute=\"msdyn_workorderid\" operator=\"eq\" value=\"".concat(form.data.entity.getId(), "\"/></filter><link-entity name=\"incident\" from=\"incidentid\" to=\"msdyn_servicerequest\"/></entity></fetch>");
            fetchXML = "?fetchXml=" + encodeURIComponent(fetchXML);
            Xrm.WebApi.retrieveMultipleRecords("msdyn_workorder", fetchXML).then(function success(result) {
                if (result.entities.length > 0) {
                    form.getControl("ts_region").setDisabled(true);
                    form.getControl("ts_country").setDisabled(true);
                    //form.getControl("ts_tradenameid").setDisabled(true);
                    form.getControl("msdyn_serviceaccount").setDisabled(true);
                    form.getControl("ts_site").setDisabled(true);
                    form.getControl("ovs_operationtypeid").setDisabled(true);
                }
            }, function (error) {
            });
            //Hide Quarters field for ISSO WO based on Operation Type owner
            //const operationType = form.getAttribute("ovs_operationtypeid").getValue();
            //if (operationType != null) {
            //let operationTypeOwningBusinessUnitFetchXML = [
            //    "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true' no-lock='false'>",
            //    "  <entity name='businessunit'>",
            //    "    <attribute name='name'/>",
            //    "    <attribute name='businessunitid'/>",
            //    "    <link-entity name='ovs_operationtype' from='owningbusinessunit' to='businessunitid' link-type='inner'>",
            //    "      <filter>",
            //    "        <condition attribute='ovs_operationtypeid' operator='eq' value='", operationType[0].id, "'/>",
            //    "      </filter>",
            //    "    </link-entity>",
            //    "  </entity>",
            //    "</fetch>"
            //].join("");
            //    operationTypeOwningBusinessUnitFetchXML = "?fetchXml=" + operationTypeOwningBusinessUnitFetchXML;
            //    Xrm.WebApi.retrieveMultipleRecords("businessunit", operationTypeOwningBusinessUnitFetchXML).then(
            //        function success(result) {
            //            if (!result.entities[0].name.startsWith("Avia")) {                        
            //                form.getControl("ts_quarterofpreparationtime").setVisible(false);
            //                form.getControl("ts_quarterofconductingoversight").setVisible(false);
            //                form.getControl("ts_quarterofreportinganddocumentation").setVisible(false);
            //                form.getControl("ts_quarteroftraveltime").setVisible(false);
            //            }
            //        },
            //        function (error) {
            //        }
            //    );
            //}
            //Check if the Work Order is past the Planned Fiscal Quarter
            setCantCompleteinspectionVisibility(form);
            setIncompleteWorkOrderReasonFilteredView(form);
            //Set visiblity for canceled inspection justification field
            if (currentSystemStatus != 690970005) {
                form.getControl("ts_canceledinspectionjustification").setVisible(false);
                form.getControl("ts_othercanceledjustification").setVisible(false);
            }
            //Set the Work Order Status 'Completed', 'Scheduled', and 'In Progress - Do Not Use This' to not visible
            var workOrderStatus = form.getControl("header_msdyn_systemstatus");
            if (workOrderStatus != null && workOrderStatus != undefined) {
                var options = workOrderStatus.getOptions();
                for (var i = 0; i < options.length; i++) {
                    if (options[i].value == 690970003 || options[i].value == 690970001 || options[i].value == 690970002 || options[i].value == 690970004) {
                        workOrderStatus.removeOption(options[i].value);
                    }
                }
            }
            if (currentSystemStatus == 741130000 /* msdyn_wosystemstatus.Closed */) {
                form.getControl("msdyn_systemstatus").removeOption(690970000 /* msdyn_wosystemstatus.New */);
                form.getControl("msdyn_systemstatus").removeOption(690970001 /* msdyn_wosystemstatus.Scheduled */);
                form.getControl("msdyn_systemstatus").removeOption(690970005 /* msdyn_wosystemstatus.Cancelled */);
                if (!userHasRole("System Administrator|ROM - Business Admin|ROM - Manager")) {
                    form.getControl("msdyn_systemstatus").removeOption(741130001 /* msdyn_wosystemstatus.InProgress */);
                }
            }
            //Restrict edit rights for Report Details to WO Owner and Additional Inspectors
            var subgridAdditionalInspectors = form.getControl("AdditionalInspectors");
            if (subgridAdditionalInspectors) {
                subgridAdditionalInspectors.addOnLoad(function () {
                    restrictEditRightReportDetails(eContext, subgridAdditionalInspectors);
                });
            }
            //Lock Cancelled Inspection Justification field if WO is cancelled        
            if (currentSystemStatus == 690970005 /* msdyn_wosystemstatus.Cancelled */) {
                form.getControl("ts_canceledinspectionjustification").setDisabled(true);
            }
            unlockRecordLogFieldsIfUserIsSystemAdmin(form);
            RemoveOptionCancel(eContext);
            showRationaleField(form, UNPLANNED_CATEGORY_ID);
            checkUserIsInWorkOrderAccessTeam(form);
        }
        WorkOrder.onLoad = onLoad;
        function restrictEditRightReportDetails(executionContext, subgridAdditionalInspectors) {
            //Process Additional Inspectors Subgrid
            var additionalInspectorIds = [];
            if (subgridAdditionalInspectors && subgridAdditionalInspectors.getGrid()) {
                var rows = subgridAdditionalInspectors.getGrid().getRows();
                var length = rows.getLength();
                rows.forEach(function (row) {
                    var entity = row.getData().getEntity();
                    var id = entity.getId();
                    additionalInspectorIds.push(id);
                });
            }
            else {
                console.log("Subgrid not loaded or not found.");
            }
            //Disabled Report Details if user is not a owner or additional inspector
            var userId = Xrm.Utility.getGlobalContext().userSettings.userId;
            var form = executionContext.getFormContext();
            var ownerAttribute = form.getAttribute("ownerid").getValue();
            if (ownerAttribute && ownerAttribute[0].id) {
                if (!(userId == ownerAttribute[0].id || (additionalInspectorIds.includes(userId)))) {
                    form.getControl("ts_reportdetails").setDisabled(true);
                }
            }
        }
        function RemoveOptionCancel(eContext) {
            var formContext = eContext.getFormContext();
            var userSettings = Xrm.Utility.getGlobalContext().userSettings;
            //Get Security Roles of the current User
            var securityRoles = userSettings.roles;
            if (!CheckRolesBeforeCancel(securityRoles)) {
                formContext.getControl("msdyn_systemstatus").removeOption(690970005);
            }
        }
        function CheckRolesBeforeCancel(securityRoles) {
            var match = false;
            var allowedRoles = ["ROM - Planner", "ROM - Business Admin", "ROM - Manager", "System Administrator"];
            securityRoles.forEach(function (role) {
                if (allowedRoles.includes(role.name)) {
                    match = true;
                }
            });
            return match;
        }
        function onSave(eContext) {
            var form = eContext.getFormContext();
            var systemStatus = form.getAttribute("msdyn_systemstatus").getValue();
            var workOrderServiceTaskData;
            if (systemStatus == 690970004 /* msdyn_wosystemstatus.ClosedInactive */) { //Only close associated entities when Record Status is set to Closed - Posted  690970004
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
            //Post a note on ScheduledQuarter Change
            postNoteOnScheduledQuarterChange(form);
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
                    //if (!form.getControl("ts_tradenameid").getDisabled() && form.getAttribute("ts_tradenameid").getValue() != null) {
                    //    form.getAttribute("ts_tradenameid").setValue(null);
                    //}
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
                    //if (form.getControl("ts_tradenameid").getDisabled() == false) form.getControl("ts_tradenameid").setDisabled(true);
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
                                if ((isFromCase || isFromSecurityIncident) && stakeholderAttributeValue != null && siteAttributeValue != null) {
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
                                if ((isFromCase || isFromSecurityIncident) && stakeholderAttributeValue != null && siteAttributeValue != null) {
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
            var _this = this;
            try {
                var form_1 = eContext.getFormContext();
                var workOrderTypeAttribute = form_1.getAttribute("msdyn_workordertype");
                var regionAttribute = form_1.getAttribute("ts_region");
                if (regionAttribute != null && regionAttribute != undefined) {
                    // Clear out all dependent fields' value if they are not already disabled and not already empty
                    if (!form_1.getControl("ts_country").getDisabled() && form_1.getAttribute("ts_country").getValue() != null) {
                        form_1.getAttribute("ts_country").setValue(null);
                    }
                    if (!form_1.getControl("ovs_operationtypeid").getDisabled() && form_1.getAttribute("ovs_operationtypeid").getValue() != null) {
                        form_1.getAttribute("ovs_operationtypeid").setValue(null);
                    }
                    //if (!form.getControl("ts_tradenameid").getDisabled() && form.getAttribute("ts_tradenameid").getValue() != null) {
                    //    form.getAttribute("ts_tradenameid").setValue(null);
                    //}
                    if (!form_1.getControl("msdyn_serviceaccount").getDisabled() && form_1.getAttribute("msdyn_serviceaccount").getValue() != null) {
                        form_1.getAttribute("msdyn_serviceaccount").setValue(null);
                    }
                    if (!form_1.getControl("ts_site").getDisabled() && form_1.getAttribute("ts_site").getValue() != null) {
                        form_1.getAttribute("ts_site").setValue(null);
                        form_1.getAttribute("ovs_operationid").setValue(null);
                    }
                    if (!form_1.getControl("msdyn_functionallocation").getVisible() && form_1.getAttribute("msdyn_functionallocation").getValue() != null) {
                        form_1.getAttribute("msdyn_functionallocation").setValue(null);
                    }
                    if (!form_1.getControl("msdyn_primaryincidenttype").getDisabled() && form_1.getAttribute("msdyn_primaryincidenttype").getValue() != null) {
                        form_1.getAttribute("msdyn_primaryincidenttype").setValue(null);
                    }
                    // Disable all dependent fields
                    form_1.getAttribute("ts_country").setRequiredLevel("none");
                    if (form_1.getControl("ts_country").getDisabled() == false)
                        form_1.getControl("ts_country").setVisible(false);
                    if (form_1.getControl("ovs_operationtypeid").getDisabled() == false)
                        form_1.getControl("ovs_operationtypeid").setDisabled(true);
                    //if (form.getControl("ts_tradenameid").getDisabled() == false) form.getControl("ts_tradenameid").setDisabled(true);
                    if (form_1.getControl("msdyn_serviceaccount").getDisabled() == false)
                        form_1.getControl("msdyn_serviceaccount").setDisabled(true);
                    if (form_1.getControl("ts_site").getDisabled() == false)
                        form_1.getControl("ts_site").setDisabled(true);
                    if (form_1.getControl("msdyn_functionallocation").getDisabled() == false)
                        form_1.getControl("msdyn_functionallocation").setVisible(false);
                    //if (!(isFromSecurityIncident && form.getAttribute("ts_site").getValue() != null)) {
                    if (form_1.getControl("msdyn_primaryincidenttype").getDisabled() == false)
                        form_1.getControl("msdyn_primaryincidenttype").setDisabled(true);
                    //}
                    // If previous fields have values, we use the filtered fetchxml in a custom lookup view
                    var workOrderTypeAttributeValue_1 = workOrderTypeAttribute.getValue();
                    var regionAttributeValue_1 = regionAttribute.getValue();
                    if (workOrderTypeAttributeValue_1 != null && workOrderTypeAttributeValue_1 != undefined &&
                        regionAttributeValue_1 != null && regionAttributeValue_1 != undefined) {
                        // Enable direct dependent field
                        if (regionAttributeValue_1[0].name != "International") {
                            // Check if user is in Rail Safety team
                            isUserUsingRailSafetyApp().then(function (isRailSafety) { return __awaiter(_this, void 0, void 0, function () {
                                var railwayCarrierId, railwayCarrierOperationType;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!isRailSafety) return [3 /*break*/, 2];
                                            return [4 /*yield*/, getEnvironmentVariableValue(OPERATION_TYPE_NAMES.RAILWAY_CARRIER)];
                                        case 1:
                                            railwayCarrierId = _a.sent();
                                            if (railwayCarrierId) {
                                                railwayCarrierOperationType = new Array();
                                                railwayCarrierOperationType[0] = new Object();
                                                railwayCarrierOperationType[0].id = "{".concat(railwayCarrierId, "}");
                                                railwayCarrierOperationType[0].name = "Railway Carrier";
                                                railwayCarrierOperationType[0].entityType = "ovs_operationtype";
                                                form_1.getAttribute("ovs_operationtypeid").setValue(railwayCarrierOperationType);
                                                form_1.getControl("ovs_operationtypeid").setVisible(false);
                                            }
                                            return [3 /*break*/, 3];
                                        case 2:
                                            // Normal flow for non-Rail Safety users
                                            setOperationTypeFilteredView(form_1, regionAttributeValue_1[0].id, "", workOrderTypeAttributeValue_1[0].id, "", "");
                                            _a.label = 3;
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                        else {
                            form_1.getControl("ts_country").setDisabled(false);
                            setCountryFilteredView(form_1);
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
                    //if (!form.getControl("ts_tradenameid").getDisabled() && form.getAttribute("ts_tradenameid").getValue() != null) {
                    //    form.getAttribute("ts_tradenameid").setValue(null);
                    //}
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
                    //if (form.getControl("ts_tradenameid").getDisabled() == false) form.getControl("ts_tradenameid").setDisabled(true);
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
                if (operationTypeAttribute != null && operationTypeAttribute != undefined && !isFromCase && !isFromSecurityIncident) {
                    // Clear out all dependent fields' value if they are not already disabled and not already empty
                    //if (!form.getControl("ts_tradenameid").getDisabled() && form.getAttribute("ts_tradenameid").getValue() != null) {
                    //    form.getAttribute("ts_tradenameid").setValue(null);
                    //}
                    if (form.getAttribute("msdyn_serviceaccount").getValue() != null) {
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
                    //if (form.getControl("ts_tradenameid").getDisabled() == false) form.getControl("ts_tradenameid").setDisabled(true);
                    if (form.getControl("msdyn_serviceaccount").getDisabled() == false)
                        form.getControl("msdyn_serviceaccount").setDisabled(true);
                    if (form.getControl("ts_site").getDisabled() == false)
                        form.getControl("ts_site").setDisabled(true);
                    if (form.getControl("msdyn_functionallocation").getDisabled() == false)
                        form.getControl("msdyn_functionallocation").setVisible(false);
                    if (!(isFromSecurityIncident && form.getAttribute("ts_site").getValue() != null)) {
                        if (form.getControl("msdyn_primaryincidenttype").getDisabled() == false)
                            form.getControl("msdyn_primaryincidenttype").setDisabled(true);
                    }
                    // If previous fields have values, we use the filtered fetchxml in a custom lookup view
                    var workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();
                    var regionAttributeValue = regionAttribute.getValue();
                    var operationTypeAttributeValue = operationTypeAttribute.getValue();
                    var countryAttributeValue = countryAttribute.getValue();
                    if (regionAttributeValue != null && regionAttributeValue != undefined &&
                        operationTypeAttributeValue != null && operationTypeAttributeValue != undefined &&
                        workOrderTypeAttributeValue != null && workOrderTypeAttributeValue != undefined) {
                        var countryCondition = getCountryFetchXmlCondition(form);
                        form.getControl("msdyn_serviceaccount").setDisabled(false);
                        // Setup a custom view
                        // This value is never saved and only needs to be unique among the other available views for the lookup.
                        var viewId = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F660}';
                        var entityName = "account";
                        var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredStakeholders");
                        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" returntotalrecordcount="true" page="1" no-lock="false"><entity name="account"><attribute name="name"/><attribute name="accountid"/><order attribute="name" descending="false" /><link-entity name="ovs_operation" from="ts_stakeholder" to="accountid" link-type="inner" alias="ac"><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeValue[0].id + '"/><condition attribute="ts_operationalstatus" operator="eq" value="717750000"/></filter><link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="ts_site" link-type="inner" alias="ad"><filter type="and"><condition attribute="ts_region" operator="eq" value="' + regionAttributeValue[0].id + '"/>' + countryCondition + '</filter></link-entity></link-entity></entity></fetch>';
                        var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="accountid"><cell name="name" width="200" /></row></grid>';
                        form.getControl("msdyn_serviceaccount").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                        // Custom view for Trade Names
                        //setTradeViewFilteredView(form, regionAttributeValue[0].id, countryCondition, workOrderTypeAttributeValue[0].id, "", "", operationTypeAttributeValue[0].id);
                    }
                    showHideContact(form);
                }
                else if (isFromCase) {
                    populateOperationField(eContext);
                }
                else if (isFromSecurityIncident) {
                    //const workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();
                    //const regionAttributeValue = regionAttribute.getValue();
                    //const operationTypeAttributeValue = operationTypeAttribute.getValue();
                    //if (regionAttributeValue != null && regionAttributeValue != undefined &&
                    //    operationTypeAttributeValue != null && operationTypeAttributeValue != undefined &&
                    //    workOrderTypeAttributeValue != null && workOrderTypeAttributeValue != undefined) {
                    //    var countryCondition = getCountryFetchXmlCondition(form);
                    //    setTradeViewFilteredView(form, regionAttributeValue[0].id, countryCondition, workOrderTypeAttributeValue[0].id, "", "", operationTypeAttributeValue[0].id);
                    //}
                    //form.getControl("ts_site").setDisabled(false);
                    populateOperationField(eContext);
                }
                showHideFiedsByOperationType(eContext);
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
        function subSubSiteOnChange(eContext) {
            try {
                var form_2 = eContext.getFormContext();
                var operationTypeAttribute = form_2.getAttribute("ovs_operationtypeid");
                var stakeholderAttribute = form_2.getAttribute("msdyn_serviceaccount");
                var siteAttribute = form_2.getAttribute("ts_site");
                var subSiteAttribute = form_2.getAttribute("msdyn_functionallocation"); //ts_subsite on Operation entity
                var subSubSiteAttribute = form_2.getAttribute("ts_subsubsite"); //ts_subsubsite on Operation entity
                var workOrderTypeAttribute = form_2.getAttribute("msdyn_workordertype");
                if (siteAttribute != null && siteAttribute != undefined && subSiteAttribute != null && subSiteAttribute != undefined && subSubSiteAttribute != null && subSubSiteAttribute != undefined) {
                    // Clear out operation and subsite value if not already empty
                    if (form_2.getAttribute("ovs_operationid").getValue() != null)
                        form_2.getAttribute("ovs_operationid").setValue(null);
                    // If an operation type is selected, we use the filtered fetchxml, otherwise, disable and clear out the dependent fields
                    var operationTypeAttributeValue_1 = operationTypeAttribute.getValue();
                    var stakeholderAttributeValue = stakeholderAttribute.getValue();
                    var siteAttributeValue = siteAttribute.getValue();
                    var subSiteAttributeValue = subSiteAttribute.getValue();
                    var subSubSiteAttributeValue = subSubSiteAttribute.getValue();
                    var workOrderTypeAttributeValue_2 = workOrderTypeAttribute.getValue();
                    if (siteAttributeValue != null && siteAttributeValue != undefined &&
                        subSiteAttributeValue != null && subSiteAttributeValue != undefined &&
                        subSubSiteAttributeValue != null && subSubSiteAttributeValue != undefined &&
                        stakeholderAttributeValue != null && stakeholderAttributeValue != undefined &&
                        operationTypeAttributeValue_1 != null && operationTypeAttributeValue_1 != undefined &&
                        workOrderTypeAttribute != null && workOrderTypeAttributeValue_2 != null) {
                        // Populate operation asset
                        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="ovs_operation"><attribute name="ovs_name"/><attribute name="ts_stakeholder"/><attribute name="ts_site"/><attribute name="ovs_operationid"/><attribute name="ts_operationalstatus"/><order attribute="ovs_name" descending="true"/><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeValue_1[0].id + '"/><condition attribute="ts_site" operator="eq" value="' + siteAttributeValue[0].id + '"/><condition attribute="ts_stakeholder" operator="eq" value="' + stakeholderAttributeValue[0].id + '"/><condition attribute="ts_subsite" operator="eq" value="' + subSiteAttributeValue[0].id + '"/><condition attribute="ts_subsubsite" operator="eq" value="' + subSubSiteAttributeValue[0].id + '"/></filter></entity></fetch>';
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
                                    form_2.ui.clearFormNotification("sub-non-operational-operation");
                                    form_2.ui.setFormNotification((Xrm.Utility.getGlobalContext().userSettings.languageId == 1033 ? "The operation \"" + targetOperation.ovs_name + "\" is non-operational." : "L'opération \"" + targetOperation.ovs_name + "\" est  non opérationnelle."), "ERROR", "sub-non-operational-operation");
                                    form_2.getAttribute('ts_site').setValue(null);
                                }
                                else {
                                    form_2.ui.clearFormNotification("sub-non-operational-operation");
                                    form_2.getAttribute('ovs_operationid').setValue(lookup);
                                }
                                setActivityTypeFilteredView(form_2, lookup[0].id, workOrderTypeAttributeValue_2[0].id, operationTypeAttributeValue_1[0].id);
                            }
                            else {
                                form_2.ui.clearFormNotification("closedSubSubProject");
                                // do not set a default if multiple records are found, error.
                                form_2.ui.setFormNotification("No operations found matching the selected Sub subsite, Operation Type and Stakeholder!.", "WARNING", "closedSubSubProject"); //ERROR
                            }
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
        WorkOrder.subSubSiteOnChange = subSubSiteOnChange;
        function filterCanceledJustificationField(eContext) {
            try {
                var form_3 = eContext.getFormContext();
                console.log("filterCanceledJustificationField");
                if (form_3.getAttribute("ovs_operationtypeid") != null) {
                    var type = form_3.getAttribute("ovs_operationtypeid").getValue();
                    if (type != null) {
                        var operationTypeOwningBusinessUnitFetchXML = [
                            "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true' no-lock='false'>",
                            "  <entity name='businessunit'>",
                            "    <attribute name='name'/>",
                            "    <attribute name='businessunitid'/>",
                            "    <link-entity name='ovs_operationtype' from='owningbusinessunit' to='businessunitid' link-type='inner'>",
                            "      <filter>",
                            "        <condition attribute='ovs_operationtypeid' operator='eq' value='", type[0].id, "'/>",
                            "      </filter>",
                            "    </link-entity>",
                            "  </entity>",
                            "</fetch>"
                        ].join("");
                        operationTypeOwningBusinessUnitFetchXML = "?fetchXml=" + operationTypeOwningBusinessUnitFetchXML;
                        Xrm.WebApi.retrieveMultipleRecords("businessunit", operationTypeOwningBusinessUnitFetchXML).then(function success(resultBusinessUnit) {
                            return __awaiter(this, void 0, void 0, function () {
                                var owningBuId, filterConditions, _a, avSecDomesticTeamId, avSecInternationalTeamId, _b, issoTeamId, targetFilter;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            if (!resultBusinessUnit.entities.length) {
                                                return [2 /*return*/];
                                            }
                                            owningBuId = resultBusinessUnit.entities[0].businessunitid;
                                            filterConditions = [];
                                            _a = owningBuId;
                                            if (!_a) return [3 /*break*/, 2];
                                            return [4 /*yield*/, isAvSecBU(owningBuId)];
                                        case 1:
                                            _a = (_c.sent());
                                            _c.label = 2;
                                        case 2:
                                            if (!_a) return [3 /*break*/, 5];
                                            return [4 /*yield*/, getEnvironmentVariableValue(TEAM_SCHEMA_NAMES.AVIATION_SECURITY_DOMESTIC)];
                                        case 3:
                                            avSecDomesticTeamId = _c.sent();
                                            return [4 /*yield*/, getEnvironmentVariableValue(TEAM_SCHEMA_NAMES.AVIATION_SECURITY_INTERNATIONAL)];
                                        case 4:
                                            avSecInternationalTeamId = _c.sent();
                                            if (avSecDomesticTeamId) {
                                                filterConditions.push("<condition attribute='ownerid' operator='eq' value='" + avSecDomesticTeamId + "'/>");
                                            }
                                            if (avSecInternationalTeamId) {
                                                filterConditions.push("<condition attribute='ownerid' operator='eq' value='" + avSecInternationalTeamId + "'/>");
                                            }
                                            return [3 /*break*/, 9];
                                        case 5:
                                            _b = owningBuId;
                                            if (!_b) return [3 /*break*/, 7];
                                            return [4 /*yield*/, isISSOBU(owningBuId)];
                                        case 6:
                                            _b = (_c.sent());
                                            _c.label = 7;
                                        case 7:
                                            if (!_b) return [3 /*break*/, 9];
                                            return [4 /*yield*/, getEnvironmentVariableValue(TEAM_SCHEMA_NAMES.ISSO_TEAM)];
                                        case 8:
                                            issoTeamId = _c.sent();
                                            if (issoTeamId) {
                                                filterConditions.push("<condition attribute='ownerid' operator='eq' value='" + issoTeamId + "'/>");
                                            }
                                            _c.label = 9;
                                        case 9:
                                            if (!filterConditions.length) {
                                                return [2 /*return*/];
                                            }
                                            targetFilter = "<filter type='or'>" + filterConditions.join("") + "</filter>";
                                            form_3.getControl("ts_canceledinspectionjustification").addPreSearch(function () {
                                                console.log("inside Filter: " + targetFilter);
                                                form_3.getControl("ts_canceledinspectionjustification").addCustomFilter(targetFilter, "ts_canceledinspectionjustification");
                                            });
                                            return [2 /*return*/];
                                    }
                                });
                            });
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
        WorkOrder.filterCanceledJustificationField = filterCanceledJustificationField;
        function subSiteOnChange(eContext) {
            try {
                var form_4 = eContext.getFormContext();
                var operationTypeAttribute = form_4.getAttribute("ovs_operationtypeid");
                var stakeholderAttribute = form_4.getAttribute("msdyn_serviceaccount");
                var siteAttribute = form_4.getAttribute("ts_site");
                var subSiteAttribute = form_4.getAttribute("msdyn_functionallocation"); //ts_subsite on Operation entity
                var workOrderTypeAttribute = form_4.getAttribute("msdyn_workordertype");
                if (siteAttribute != null && siteAttribute != undefined && subSiteAttribute != null && subSiteAttribute != undefined) {
                    // Clear out operation and subsite value if not already empty
                    if (form_4.getAttribute("ovs_operationid").getValue() != null)
                        form_4.getAttribute("ovs_operationid").setValue(null);
                    // If an operation type is selected, we use the filtered fetchxml, otherwise, disable and clear out the dependent fields
                    var operationTypeAttributeValue_2 = operationTypeAttribute.getValue();
                    var stakeholderAttributeValue = stakeholderAttribute.getValue();
                    var siteAttributeValue = siteAttribute.getValue();
                    var subSiteAttributeValue = subSiteAttribute.getValue();
                    var workOrderTypeAttributeValue_3 = workOrderTypeAttribute.getValue();
                    if (siteAttributeValue != null && siteAttributeValue != undefined &&
                        subSiteAttributeValue != null && subSiteAttributeValue != undefined &&
                        stakeholderAttributeValue != null && stakeholderAttributeValue != undefined &&
                        operationTypeAttributeValue_2 != null && operationTypeAttributeValue_2 != undefined &&
                        workOrderTypeAttribute != null && workOrderTypeAttributeValue_3 != null) {
                        // Populate operation asset
                        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="ovs_operation"><attribute name="ovs_name"/><attribute name="ts_stakeholder"/><attribute name="ts_site"/><attribute name="ovs_operationid"/><attribute name="ts_operationalstatus"/><order attribute="ovs_name" descending="true"/><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeValue_2[0].id + '"/><condition attribute="ts_site" operator="eq" value="' + siteAttributeValue[0].id + '"/><condition attribute="ts_stakeholder" operator="eq" value="' + stakeholderAttributeValue[0].id + '"/><condition attribute="ts_subsite" operator="eq" value="' + subSiteAttributeValue[0].id + '"/></filter></entity></fetch>';
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
                                    form_4.ui.setFormNotification((Xrm.Utility.getGlobalContext().userSettings.languageId == 1033 ? "The operation \"" + targetOperation.ovs_name + "\" is non-operational." : "L'opération \"" + targetOperation.ovs_name + "\" est  non opérationnelle."), "ERROR", "non-operational-operation");
                                    form_4.getAttribute('ts_site').setValue(null);
                                }
                                else {
                                    form_4.ui.clearFormNotification("non-operational-operation");
                                    form_4.getAttribute('ovs_operationid').setValue(lookup);
                                }
                                setActivityTypeFilteredView(form_4, lookup[0].id, workOrderTypeAttributeValue_3[0].id, operationTypeAttributeValue_2[0].id);
                            }
                            else {
                                // do not set a default if multiple records are found, error.
                            }
                        }, function (error) {
                            showErrorMessageAlert(error);
                        });
                        //Check if any Sub-subsites exists and only show the field if it's the case
                        var fetchXmlToCheckForSubSites = '<fetch no-lock="false" returntotalrecordcount="true" page="1" count="25"><entity name="msdyn_functionallocation"><attribute name="statecode"/><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><filter><condition attribute="msdyn_functionallocationid" operator="under" value="' + siteAttributeValue[0].id + '"/></filter><order attribute="msdyn_name" descending="false"/><link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="msdyn_parentfunctionallocation" alias="bb"><filter type="and"><condition attribute="msdyn_functionallocationid" operator="eq" uitype="msdyn_functionallocation" value="' + siteAttributeValue[0].id + '"/></filter></link-entity></entity></fetch>';
                        encodedFetchXml = encodeURIComponent(fetchXmlToCheckForSubSites);
                        //only retrieve SubSites with Operations under Stakeholders
                        var targetSubSiteIds = "";
                        var checkOtherSubSites = true;
                        var fetchOperationsWithSiteAndStakeholder = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="ovs_operation"><attribute name="ovs_name" /><attribute name="ts_subsite"/><attribute name="ts_subsubsite"/><attribute name="createdon" /><attribute name="ovs_operationtypeid" /><attribute name="ovs_operationid" />     <order attribute="ovs_name" descending="false" /><filter type="and"><condition attribute="statecode" operator="eq" value="0" /><condition attribute="ts_stakeholder" operator="eq" uitype="account" value="' + stakeholderAttributeValue[0].id + '" /> <condition attribute="ts_site" operator="eq"  uitype="msdyn_functionallocation" value="' + siteAttributeValue[0].id + '" /><condition attribute="ts_subsite" operator="eq"  uitype="msdyn_functionallocation" value="' + subSiteAttributeValue[0].id + '" /><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeValue_2[0].id + '"/></filter></entity></fetch>';
                        var encodedFetchXmlOperationsWithSiteAndStakeholder = encodeURIComponent(fetchOperationsWithSiteAndStakeholder);
                        Xrm.WebApi.retrieveMultipleRecords("ovs_operation", "?fetchXml=" + encodedFetchXmlOperationsWithSiteAndStakeholder).then(function success(result) {
                            if (result.entities.length > 0) {
                                var subCounter = 0;
                                result.entities.forEach(function (item) {
                                    var subSiteId = item["_ts_subsubsite_value"];
                                    if (subSiteId != undefined) {
                                        targetSubSiteIds += "<value>" + subSiteId + "</value>";
                                        subCounter++;
                                    }
                                });
                                if (targetSubSiteIds != "") {
                                    checkOtherSubSites = false;
                                    form_4.getControl('ts_subsubsite').setDisabled(false);
                                    form_4.getControl('ts_subsubsite').setVisible(true);
                                    form_4.getAttribute("ts_subsubsite").setRequiredLevel("required"); //none
                                    var viewId = '{1B59589F-F122-5428-4771-79BC925240C3}';
                                    var entityName = "msdyn_functionallocation";
                                    var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredSites");
                                    var activityTypeFetchXml = '<fetch no-lock="false"><entity name="msdyn_functionallocation"><attribute name="statecode"/><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><filter><condition attribute="msdyn_functionallocationid" operator="in">' + targetSubSiteIds + '</condition></filter><order attribute="msdyn_name" descending="false"/></entity></fetch>';
                                    debugger;
                                    var msgTxt = subCounter + " operations found for the selected site and stakeholder!.";
                                    form_4.ui.clearFormNotification("hasOperation");
                                    form_4.ui.setFormNotification(msgTxt, "INFO", "hasOperation"); //INFO
                                    var layoutXml = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="200" /></row></grid>';
                                    form_4.getControl("ts_subsubsite").addCustomView(viewId, entityName, viewDisplayName, activityTypeFetchXml, layoutXml, true);
                                }
                            }
                            if (checkOtherSubSites) {
                                //No operation found for Sub-subsite
                                form_4.ui.clearFormNotification("closedSubProject");
                                form_4.ui.setFormNotification("No operations found matching the selected Subsite, Operation Type and Stakeholder!.", "WARNING", "closedSubProject"); //ERROR
                                form_4.getAttribute("ts_subsubsite").setValue(null);
                                form_4.getControl('ts_subsubsite').setVisible(false);
                                form_4.getAttribute("ts_subsubsite").setRequiredLevel("none"); //none,required
                            }
                        }, function (error) {
                            showErrorMessageAlert(error);
                        });
                    }
                    else {
                        form_4.getAttribute("ts_subsubsite").setValue(null);
                        form_4.getControl('ts_subsubsite').setVisible(false);
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        WorkOrder.subSiteOnChange = subSiteOnChange;
        function siteOnChange(eContext) {
            try {
                var form_5 = eContext.getFormContext();
                var operationTypeAttribute = form_5.getAttribute("ovs_operationtypeid");
                var stakeholderAttribute = form_5.getAttribute("msdyn_serviceaccount");
                var siteAttribute = form_5.getAttribute("ts_site");
                var workOrderTypeAttribute = form_5.getAttribute("msdyn_workordertype");
                if (siteAttribute != null && siteAttribute != undefined) {
                    // Clear out operation and subsite value if not already empty
                    if (form_5.getAttribute("ovs_operationid").getValue() != null)
                        form_5.getAttribute("ovs_operationid").setValue(null);
                    // If an operation type is selected, we use the filtered fetchxml, otherwise, disable and clear out the dependent fields
                    var operationTypeAttributeValue_3 = operationTypeAttribute.getValue();
                    var stakeholderAttributeValue = stakeholderAttribute.getValue();
                    var siteAttributeValue = siteAttribute.getValue();
                    var workOrderTypeAttributeValue_4 = workOrderTypeAttribute.getValue();
                    if (siteAttributeValue != null && siteAttributeValue != undefined &&
                        stakeholderAttributeValue != null && stakeholderAttributeValue != undefined &&
                        operationTypeAttributeValue_3 != null && operationTypeAttributeValue_3 != undefined &&
                        workOrderTypeAttribute != null && workOrderTypeAttributeValue_4 != null) {
                        // Populate operation asset
                        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="ovs_operation"><attribute name="ovs_name"/><attribute name="ts_stakeholder"/><attribute name="ts_site"/><attribute name="ovs_operationid"/><attribute name="ts_operationalstatus"/><order attribute="ovs_name" descending="true"/><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeValue_3[0].id + '"/><condition attribute="ts_site" operator="eq" value="' + siteAttributeValue[0].id + '"/><condition attribute="ts_stakeholder" operator="eq" value="' + stakeholderAttributeValue[0].id + '"/></filter></entity></fetch>';
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
                                    form_5.ui.setFormNotification((Xrm.Utility.getGlobalContext().userSettings.languageId == 1033 ? "The operation \"" + targetOperation.ovs_name + "\" is non-operational." : "L'opération \"" + targetOperation.ovs_name + "\" est  non opérationnelle."), "ERROR", "non-operational-operation");
                                    form_5.getAttribute('ts_site').setValue(null);
                                }
                                else {
                                    form_5.ui.clearFormNotification("non-operational-operation");
                                    form_5.getAttribute('ovs_operationid').setValue(lookup);
                                }
                                setActivityTypeFilteredView(form_5, lookup[0].id, workOrderTypeAttributeValue_4[0].id, operationTypeAttributeValue_3[0].id);
                            }
                            else {
                                // do not set a default if multiple records are found, error.
                            }
                        }, function (error) {
                            showErrorMessageAlert(error);
                        });
                        //Check if any subsites exists and only show the field if it's the case
                        var fetchXmlToCheckForSubSites = '<fetch no-lock="false" returntotalrecordcount="true" page="1" count="25"><entity name="msdyn_functionallocation"><attribute name="statecode"/><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><filter><condition attribute="msdyn_functionallocationid" operator="under" value="' + siteAttributeValue[0].id + '"/></filter><order attribute="msdyn_name" descending="false"/><link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="msdyn_parentfunctionallocation" alias="bb"><filter type="and"><condition attribute="msdyn_functionallocationid" operator="eq" uitype="msdyn_functionallocation" value="' + siteAttributeValue[0].id + '"/></filter></link-entity></entity></fetch>';
                        encodedFetchXml = encodeURIComponent(fetchXmlToCheckForSubSites);
                        //only retrieve SubSites with Operations under Stakeholders
                        var targetSubSiteIds = "";
                        var checkOtherSubSites = true;
                        var fetchOperationsWithSiteAndStakeholder = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="ovs_operation"><attribute name="ovs_name" /><attribute name="ts_subsite"/><attribute name="ts_subsubsite"/><attribute name="createdon" /><attribute name="ovs_operationtypeid" /><attribute name="ovs_operationid" />     <order attribute="ovs_name" descending="false" /><filter type="and"><condition attribute="statecode" operator="eq" value="0" /><condition attribute="ts_stakeholder" operator="eq" uitype="account" value="' + stakeholderAttributeValue[0].id + '" /> <condition attribute="ts_site" operator="eq"  uitype="msdyn_functionallocation" value="' + siteAttributeValue[0].id + '" /><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeValue_3[0].id + '"/></filter></entity></fetch>';
                        var encodedFetchXmlOperationsWithSiteAndStakeholder = encodeURIComponent(fetchOperationsWithSiteAndStakeholder);
                        Xrm.WebApi.retrieveMultipleRecords("ovs_operation", "?fetchXml=" + encodedFetchXmlOperationsWithSiteAndStakeholder).then(function success(result) {
                            if (result.entities.length > 0) {
                                var counter = 0;
                                result.entities.forEach(function (item) {
                                    var subSiteId = item["_ts_subsite_value"];
                                    if (subSiteId != undefined) {
                                        targetSubSiteIds += "<value>" + subSiteId + "</value>";
                                        counter++;
                                    }
                                });
                                if (targetSubSiteIds != "") {
                                    checkOtherSubSites = false;
                                    form_5.getControl('msdyn_functionallocation').setDisabled(false);
                                    form_5.getControl('msdyn_functionallocation').setVisible(true);
                                    form_5.getAttribute("msdyn_functionallocation").setRequiredLevel("required"); //none,required
                                    var viewId = '{1B59589F-F122-5428-4771-79BC925240C3}';
                                    var entityName = "msdyn_functionallocation";
                                    var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredSites");
                                    var activityTypeFetchXml = '<fetch no-lock="false"><entity name="msdyn_functionallocation"><attribute name="statecode"/><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><filter><condition attribute="msdyn_functionallocationid" operator="in">' + targetSubSiteIds + '</condition></filter><order attribute="msdyn_name" descending="false"/></entity></fetch>';
                                    debugger;
                                    var msgTxt = counter + " operations found for the selected site, operation type and stakeholder!.";
                                    form_5.ui.clearFormNotification("hasOperation");
                                    form_5.ui.setFormNotification(msgTxt, "INFO", "hasOperation"); //INFO
                                    var layoutXml = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="200" /></row></grid>';
                                    form_5.getControl("msdyn_functionallocation").addCustomView(viewId, entityName, viewDisplayName, activityTypeFetchXml, layoutXml, true);
                                }
                            }
                            if (checkOtherSubSites) {
                                //No operation found
                                form_5.ui.clearFormNotification("closedProject");
                                //form.ui.setFormNotification("No operations found matching the selected site, operation type and stakeholder!.", "WARNING", "closedProject");//ERROR
                                form_5.getAttribute("msdyn_functionallocation").setValue(null);
                                form_5.getControl('msdyn_functionallocation').setVisible(false);
                                form_5.getAttribute("msdyn_functionallocation").setRequiredLevel("none"); //none,required                                
                            }
                        }, function (error) {
                            showErrorMessageAlert(error);
                        });
                    }
                    else {
                        form_5.getAttribute("msdyn_functionallocation").setValue(null);
                        form_5.getControl('msdyn_functionallocation').setVisible(false);
                        form_5.getAttribute("msdyn_functionallocation").setRequiredLevel("none"); //none,required                                
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
                var form_6 = eContext.getFormContext();
                var TradenameAttribute = form_6.getAttribute("ts_tradenameid");
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
                            form_6.getAttribute('msdyn_serviceaccount').setValue(lookup);
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
        // Just removed this from subsite onchange. I see there's also SiteOnChange in here which we're using for the actual site field. I'm not sure if we need this function anymore.
        function functionalLocationOnChange(eContext) {
            try {
                var form_7 = eContext.getFormContext();
                var operationTypeAttribute = form_7.getAttribute("ovs_operationtypeid");
                var stakeholderAttribute = form_7.getAttribute("msdyn_serviceaccount");
                var functionalLocationAttribute = form_7.getAttribute("msdyn_functionallocation");
                if (functionalLocationAttribute != null && functionalLocationAttribute != undefined) {
                    // Clear out operation value if not already empty
                    if (form_7.getAttribute("ovs_operationid").getValue() != null)
                        form_7.getAttribute("ovs_operationid").setValue(null);
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
                                form_7.getAttribute('ovs_operationid').setValue(lookup);
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
            //var preparationTime = form.getAttribute("ts_preparationtime").getValue();
            //var conductingOversight = form.getAttribute("ts_conductingoversight").getValue();
            //var woReportingAndDocumentation = form.getAttribute("ts_woreportinganddocumentation").getValue();
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
            if (newSystemStatus == 690970004 /* msdyn_wosystemstatus.ClosedInactive */ || newSystemStatus == 741130000 /* msdyn_wosystemstatus.Closed */) {
                Xrm.WebApi.retrieveMultipleRecords("msdyn_workorderservicetask", "?$select=msdyn_workorder&$filter=statecode eq 0 and msdyn_workorder/msdyn_workorderid eq " + form.data.entity.getId() + " and statuscode ne 918640002 and ts_mandatory eq true").then(function success(result) {
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
                        if (newSystemStatus == 690970004 /* msdyn_wosystemstatus.ClosedInactive */) {
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
                        else {
                            //At Transport Canada, Fiscal Years run from Apr 1st to Mar 31, Q1 = Apr-Jun, Q2 = Jul-Sept, Q3 = Oct-Dec, Q4 = Jan-Mar
                            var currentQuarter = Math.floor(new Date().getMonth() / 3);
                            if (currentQuarter == 0) {
                                currentQuarter = 4;
                            }
                            form.getAttribute("ts_completedquarter").setValue(717750000 + currentQuarter);
                            form.getControl("ts_completedquarter").setVisible(true);
                        }
                        //if (preparationTime == null || woReportingAndDocumentation == null || conductingOversight == null) {
                        //    var alertStrings = {
                        //        text: Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "CloseWOWithoutTimeTrackingFieldsText"),
                        //        title: Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "CloseWOWithoutTimeTrackingFieldsTitle")
                        //    };
                        //    var alertOptions = { height: 160, width: 340 };
                        //    Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function () {
                        //        form.getAttribute("msdyn_systemstatus").setValue(currentSystemStatus);
                        //        //All required time tracking fields must be input before the Work order can be closed.
                        //        form.getAttribute("ts_preparationtime").setRequiredLevel("required");
                        //        form.getAttribute("ts_conductingoversight").setRequiredLevel("required");
                        //        form.getAttribute("ts_woreportinganddocumentation").setRequiredLevel("required");
                        //    });
                        //}
                        //else {
                        form.getControl("msdyn_workordertype").setDisabled(true);
                        form.getControl("ts_region").setDisabled(true);
                        form.getControl("ovs_operationtypeid").setDisabled(true);
                        //form.getControl("ts_tradenameid").setDisabled(true);
                        form.getControl("ts_site").setDisabled(true);
                        form.getControl("msdyn_worklocation").setDisabled(true);
                        form.getControl("header_ownerid").setDisabled(true);
                        form.getControl("ownerid").setDisabled(true);
                        //       }
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
                form.getControl("msdyn_workordertype").setDisabled(false);
                form.getControl("ts_region").setDisabled(false);
                form.getControl("ovs_operationtypeid").setDisabled(false);
                //form.getControl("ts_tradenameid").setDisabled(false);
                form.getControl("ts_site").setDisabled(false);
                form.getControl("msdyn_worklocation").setDisabled(false);
                form.getControl("header_ownerid").setDisabled(false);
                form.getControl("ownerid").setDisabled(false);
                //form.getAttribute("ts_preparationtime").setRequiredLevel("none");
                //form.getAttribute("ts_conductingoversight").setRequiredLevel("none");
                //form.getAttribute("ts_woreportinganddocumentation").setRequiredLevel("none");
            }
        }
        WorkOrder.systemStatusOnChange = systemStatusOnChange;
        function caseOnChange(eContext) {
            var form = eContext.getFormContext();
            var caseAttribute = form.getAttribute("msdyn_servicerequest");
            if (caseAttribute.getValue() == null) {
                form.getControl("ts_region").setDisabled(false);
                form.getControl("ts_country").setDisabled(false);
                //form.getControl("ts_tradenameid").setDisabled(false);
                form.getControl("msdyn_serviceaccount").setDisabled(false);
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
                var form_8 = eContext.getFormContext();
                var caseAttribute = form_8.getAttribute("msdyn_servicerequest");
                var regionAttribute = form_8.getAttribute("ts_region");
                var countryAttribute = form_8.getAttribute("ts_country");
                var stakeholderAttribute = form_8.getAttribute("msdyn_serviceaccount");
                var siteAttribute = form_8.getAttribute("ts_site");
                var caseAttributeValue = caseAttribute.getValue();
                var regionAttributeValue_2 = regionAttribute.getValue();
                var countryAttributeValue_1 = countryAttribute.getValue();
                var stakeholderAttributeValue_1 = stakeholderAttribute.getValue();
                var siteAttributeValue_1 = siteAttribute.getValue();
                var regionCondition = regionAttributeValue_2 == null ? "" : '<condition attribute="ovs_region" operator="eq" value="' + regionAttributeValue_2[0].id + '" />';
                var countryCondition = getCountryFetchXmlCondition(form_8);
                var stakeholderCondition = stakeholderAttributeValue_1 == null ? "" : '<condition attribute="customerid" operator="eq" value="' + stakeholderAttributeValue_1[0].id + '" />';
                var siteCondition = siteAttributeValue_1 == null ? "" : '<condition attribute="msdyn_functionallocation" operator="eq" value="' + siteAttributeValue_1[0].id + '" />';
                if (caseAttribute != null && caseAttribute != undefined) {
                    if (caseAttributeValue != null) {
                        Xrm.WebApi.retrieveRecord("incident", caseAttributeValue[0].id.replace(/({|})/g, ''), "?$select=_ovs_region_value, _ts_country_value, _customerid_value, _msdyn_functionallocation_value").then(function success(result) {
                            var _a, _b, _c, _d;
                            if ((regionCondition != "" && (result != null && regionAttributeValue_2 != null && regionAttributeValue_2[0].id.replace(/({|})/g, '') != ((_a = result._ovs_region_value) === null || _a === void 0 ? void 0 : _a.toUpperCase()))) ||
                                (countryCondition != "" && (result != null && countryAttributeValue_1 != null && countryAttributeValue_1[0].id.replace(/({|})/g, '') != ((_b = result._ts_country_value) === null || _b === void 0 ? void 0 : _b.toUpperCase()))) ||
                                (stakeholderCondition != "" && (result != null && stakeholderAttributeValue_1 != null && stakeholderAttributeValue_1[0].id.replace(/({|})/g, '') != ((_c = result._customerid_value) === null || _c === void 0 ? void 0 : _c.toUpperCase()))) ||
                                (siteCondition != "" && (result != null && siteAttributeValue_1 != null && siteAttributeValue_1[0].id.replace(/({|})/g, '') != ((_d = result._msdyn_functionallocation_value) === null || _d === void 0 ? void 0 : _d.toUpperCase())))) {
                                form_8.getAttribute("msdyn_servicerequest").setValue(null);
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
                    form_8.getControl("msdyn_servicerequest").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
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
        function scheduledQuarterOnChange(eContext) {
            var form = eContext.getFormContext();
            var revisedQuarterAttributeValue = form.getAttribute("ovs_revisedquarterid").getValue();
            scheduledQuarterAttributeValueChanged = true;
            //if (revisedQuarterAttributeValue != null) {
            //    form.getControl("ts_scheduledquarterjustification").setVisible(true);
            //    form.getControl("ts_justificationcomment").setVisible(true);
            //}
            //else {
            //    form.getControl("ts_scheduledquarterjustification").setVisible(false);
            //    form.getControl("ts_justificationcomment").setVisible(false);
            //}
        }
        WorkOrder.scheduledQuarterOnChange = scheduledQuarterOnChange;
        //Sets the Scheduled Quarter filter to show quarters in the planned fiscal year and the year after
        function setScheduledQuarterFilter(form) {
            //Get name of planned fiscal year
            var fiscalYearValue = form.getAttribute("ovs_fiscalyear").getValue();
            if (fiscalYearValue != null) {
                var fiscalYearName = fiscalYearValue[0].name;
                if (fiscalYearName != null) {
                    var nextFiscalYearName = fiscalYearName.split("-")[1] + "-" + (Number(fiscalYearName.split("-")[1]) + 1);
                    var viewId = '{8982C38D-8BB4-4C95-BD05-493398F' + Date.now().toString().slice(-5) + '}'; //If this function is called again, this guid needs to be unique
                    var entityName = "tc_tcfiscalquarter";
                    var viewDisplayName = "Fiscal Quarters";
                    //All Active Stakeholders/Accounts that have an Operation with a matching Operation Type
                    var fetchXml = [
                        "<fetch>",
                        "  <entity name='tc_tcfiscalquarter'>",
                        "    <attribute name='tc_name'/>",
                        "    <attribute name='tc_tcfiscalyearid'/>",
                        "    <order attribute='tc_tcfiscalyearid'/>",
                        "    <link-entity name='tc_tcfiscalyear' from='tc_tcfiscalyearid' to='tc_tcfiscalyearid' alias='fiscalyear'>",
                        "      <attribute name='tc_fiscalyearlonglbl'/>",
                        "      <filter type='or'>",
                        "        <condition attribute='tc_name' operator='eq' value='", fiscalYearName, "'/>",
                        "        <condition attribute='tc_name' operator='eq' value='", nextFiscalYearName, "'/>",
                        "      </filter>",
                        "    </link-entity>",
                        "  </entity>",
                        "</fetch>"
                    ].join("");
                    var layoutXml = '<grid name="resultset" jump="tc_name" select="1" icon="1" preview="1"> <row name="result" id="fiscalquarterid"> <cell name="tc_name" width="100" />< cell name = "fiscalyear.tc_fiscalyearlonglbl" width = "167" /></row> </grid>';
                    form.getControl("ovs_revisedquarterid").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                }
            }
        }
        WorkOrder.setScheduledQuarterFilter = setScheduledQuarterFilter;
        // FUNCTIONS
        function postNoteOnScheduledQuarterChange(form) {
            if (scheduledQuarterAttributeValueChanged) {
                var revisedQuarterAttributeValue = form.getAttribute("ovs_revisedquarterid").getValue();
                var justification = form.getAttribute("ts_scheduledquarterjustification").getValue();
                var justificationValue;
                var justificationComment = form.getAttribute("ts_justificationcomment").getValue();
                if (form.ui.getFormType() == 2) {
                    var recordId = form.data.entity.getId().replace(/[{}]/g, "");
                    var data = {};
                    data['objectid_msdyn_workorder@odata.bind'] = '/msdyn_workorders(' + recordId + ')';
                    if (revisedQuarterAttributeValue != null) {
                        data['subject'] = "Scheduled Quarter changed to: " + revisedQuarterAttributeValue[0].name;
                    }
                    else {
                        data['subject'] = "Scheduled Quarter changed to null ";
                    }
                    if (justification != null) {
                        justificationValue = justification[0].name;
                    }
                    else {
                        justificationValue = "null";
                    }
                    data['notetext'] = "Justification changed to: " + justificationValue + " <br />Justification Comment: " + justificationComment;
                    //form.getAttribute("ts_scheduledquarterjustification").setValue(null);
                    //form.getAttribute("ts_justificationcomment").setValue(null);
                    Xrm.WebApi.createRecord('annotation', data).then(function success(result) {
                        scheduledQuarterAttributeValueChanged = false;
                    }, function (error) {
                        console.log(error.message);
                    });
                }
            }
        }
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
            // Determine if this is an AvSec WO by checking the owning BU of the operation type using environment-based helpers
            var opTypeId = operationTypeAttributeId ? operationTypeAttributeId.replace(/[{}]/g, "") : operationTypeAttributeId;
            Xrm.WebApi.retrieveRecord("ovs_operationtype", opTypeId, "?$select=_owningbusinessunit_value").then(function success(operationType) {
                return __awaiter(this, void 0, void 0, function () {
                    var operationActivityFilter, isAvSec, fetchXmlActivity, viewIdActivity, entityNameActivity, viewDisplayNameActivity, layoutXmlActivity;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                operationActivityFilter = "";
                                if (!(!isFromSecurityIncident && operationType._owningbusinessunit_value)) return [3 /*break*/, 2];
                                return [4 /*yield*/, isAvSecBU(operationType._owningbusinessunit_value)];
                            case 1:
                                isAvSec = _a.sent();
                                if (isAvSec) {
                                    operationActivityFilter += "<link-entity name='ts_operationactivity' from='ts_activity' to='msdyn_incidenttypeid' link-type='inner'><filter><condition attribute='ts_operation' operator='eq' value='" + operationAttributeId + "'/><condition attribute='ts_operationalstatus' operator='eq' value='717750000'/></filter></link-entity>";
                                }
                                _a.label = 2;
                            case 2:
                                fetchXmlActivity = "";
                                viewIdActivity = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F661}';
                                entityNameActivity = "msdyn_incidenttype";
                                viewDisplayNameActivity = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredActivityType");
                                layoutXmlActivity = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_incidenttypeid"><cell name="msdyn_name" width="200" /></row></grid>';
                                if (!isFromCase) {
                                    fetchXmlActivity = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="msdyn_incidenttype"><attribute name="msdyn_name" /><attribute name="msdyn_incidenttypeid" /><order attribute="msdyn_name" descending="false" /><filter type="and"><condition attribute="msdyn_defaultworkordertype" operator="eq" uiname="Inspection" uitype="msdyn_workordertype" value="' + workOrderTypeAttributeId + '" /><condition attribute="statecode" operator="eq" value="0" /></filter><link-entity name="ts_ovs_operationtypes_msdyn_incidenttypes" from="msdyn_incidenttypeid" to="msdyn_incidenttypeid" visible="false" intersect="true"><link-entity name="ovs_operationtype" from="ovs_operationtypeid" to="ovs_operationtypeid" alias="ab"><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeId + '" /></filter></link-entity></link-entity>' + operationActivityFilter + '</entity></fetch>';
                                }
                                else {
                                    fetchXmlActivity = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="msdyn_incidenttype"><attribute name="msdyn_name" /><attribute name="msdyn_incidenttypeid" /><order attribute="msdyn_name" descending="false" /><filter type="and"><condition attribute="msdyn_defaultworkordertype" operator="eq" uiname="Inspection" uitype="msdyn_workordertype" value="' + workOrderTypeAttributeId + '" /><condition attribute="statecode" operator="eq" value="0" /></filter><link-entity name="ts_ovs_operationtypes_msdyn_incidenttypes" from="msdyn_incidenttypeid" to="msdyn_incidenttypeid" visible="false" intersect="true"><link-entity name="ovs_operationtype" from="ovs_operationtypeid" to="ovs_operationtypeid" alias="ab"><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeId + '" /></filter></link-entity></link-entity></entity></fetch>';
                                }
                                form.getControl("msdyn_primaryincidenttype").addCustomView(viewIdActivity, entityNameActivity, viewDisplayNameActivity, fetchXmlActivity, layoutXmlActivity, true);
                                form.getControl("msdyn_primaryincidenttype").setDisabled(false);
                                return [2 /*return*/];
                        }
                    });
                });
            }, function (error) {
                showErrorMessageAlert(error);
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
            var fetchXml = (isFromCase && stakeholderTypeAttributeId != "" && siteAttributeId != "") ? '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"> <entity name="ovs_operationtype"> <attribute name="ovs_operationtypeid" /> <attribute name="ovs_name" /> <attribute name="createdon" /> <filter type="and"><condition attribute="statecode" operator="eq" value="0"/></filter> <order attribute="ovs_name" descending="false" /> <link-entity name="ts_ovs_operationtypes_msdyn_incidenttypes" from="ovs_operationtypeid" to="ovs_operationtypeid" visible="false" intersect="true"> <link-entity name="msdyn_incidenttype" from="msdyn_incidenttypeid" to="msdyn_incidenttypeid" alias="ah"> <filter type="and"> <condition attribute="msdyn_defaultworkordertype" operator="eq" value="' + workOrderTypeAttributeId + '" /> </filter> </link-entity> </link-entity> <link-entity name="ovs_operation" from="ovs_operationtypeid" to="ovs_operationtypeid" link-type="inner" alias="ai"> <filter type="and"><condition attribute="ts_operationalstatus" operator="ne" value="717750001" /><condition attribute="ts_stakeholder" operator="eq" value="' + stakeholderTypeAttributeId + '" /></filter> <link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="ts_site" link-type="inner" alias="aj"> <filter type="and"> <condition attribute="ts_region" operator="eq" value="' + regionAttributeId + '" />' + countryCondition + '<condition attribute="msdyn_functionallocationid" operator="eq" value="' + siteAttributeId + '" /> </filter> </link-entity> </link-entity> </entity> </fetch>' : '<fetch distinct="true" page="1"><entity name="ovs_operationtype"><attribute name="statecode"/><attribute name="ovs_operationtypeid"/><attribute name="ovs_name"/><attribute name="createdon"/><filter type="and"><condition attribute="statecode" operator="eq" value="0"/></filter><link-entity name="ts_ovs_operationtypes_msdyn_incidenttypes" from="ovs_operationtypeid" to="ovs_operationtypeid" visible="false" intersect="true"><link-entity name="msdyn_incidenttype" from="msdyn_incidenttypeid" to="msdyn_incidenttypeid" alias="ad"><filter type="and"><condition attribute="msdyn_defaultworkordertype" operator="eq" value="' + workOrderTypeAttributeId + '" /></filter></link-entity></link-entity><link-entity name="ovs_operation" from="ovs_operationtypeid" to="ovs_operationtypeid" link-type="inner" alias="ae"><link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="ts_site" link-type="inner" alias="af"><filter type="and"><condition attribute="ts_region" operator="eq" value="' + regionAttributeId + '" />' + countryCondition + '</filter></link-entity></link-entity></entity></fetch>';
            var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="ovs_operationtypeid"><cell name="ovs_name" width="200" /></row></grid>';
            form.getControl("ovs_operationtypeid").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
        }
        //function setTradeViewFilteredView(form: Form.msdyn_workorder.Main.ROMOversightActivity, regionAttributeId: string, countryCondition: string, workOrderTypeAttributeId: string, stakeholderTypeAttributeId: string, siteAttributeId: string, operationTypeAttributeId): void {
        //    // Enable direct dependent field
        //    form.getControl("ts_tradenameid").setDisabled(false);
        //    const viewIdTradename = '{1c259fee-0541-4cac-8d20-7b30ee398065}';
        //    const entityNameTradename = "ts_tradename";
        //    const viewDisplayNameTradename = "FilteredSTradenames";
        //    const fetchXmlTradename = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" returntotalrecordcount="true" page="1" no-lock="false"><entity name="ts_tradename" ><attribute name="ts_tradenameid" /><attribute name="ts_name" /><order attribute="ts_stakeholderidname" /><order attribute="ts_name" /><link-entity name="account" from="accountid" to="ts_stakeholderid" ><filter type="and"><condition attribute="ts_stakeholderstatus" operator="ne" value="717750001" /></filter><link-entity name="ovs_operation" from="ts_stakeholder" to="accountid" link-type="inner" alias="ac"><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeId + '"/><condition attribute="ts_operationalstatus" operator="eq" value="717750000"/></filter><link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="ts_site" link-type="inner" alias="ad"><filter type="and"><condition attribute="ts_region" operator="eq" value="' + regionAttributeId + '"/>' + countryCondition + '</filter></link-entity></link-entity></link-entity></entity></fetch>';
        //    const layoutXmlTradename = '<grid name="resultset" object="10010" jump="ts_name" select="1" icon="1" preview="1"><row name="result" id="ts_tradenameid"><cell name="ts_name" width="200" /></row></grid>';
        //    form.getControl("ts_tradenameid").addCustomView(viewIdTradename, entityNameTradename, viewDisplayNameTradename, fetchXmlTradename, layoutXmlTradename, true);
        //}
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
            Xrm.WebApi.retrieveMultipleRecords("msdyn_workorderservicetask", "?$select=msdyn_workorder&$filter=msdyn_workorder/msdyn_workorderid eq ".concat(formContext.data.entity.getId())).then(function success(result) {
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
            if (systemStatus != null && (systemStatus == 690970000 /* msdyn_wosystemstatus.New */ || systemStatus == 690970001 /* msdyn_wosystemstatus.Scheduled */ || systemStatus == 741130001 /* msdyn_wosystemstatus.InProgress */)) {
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
                var activityTypeValue = formContext.getAttribute("msdyn_primaryincidenttype").getValue();
                if (activityTypeValue != null) {
                    Xrm.WebApi.retrieveRecord('msdyn_incidenttype', activityTypeValue[0].id, '?$select=ts_preparationtime,ts_conductingoversight,ts_reportinganddocumentation').then(function success(result) {
                        formContext.getAttribute("ts_preparationtime").setValue(result.ts_preparationtime);
                        formContext.getAttribute("ts_conductingoversight").setValue(result.ts_conductingoversight);
                        formContext.getAttribute("ts_woreportinganddocumentation").setValue(result.ts_reportinganddocumentation);
                    });
                }
            }
            else {
                var workOrderId_1 = formContext.data.entity.getId();
                var activityTypeControl_1 = formContext.getControl("msdyn_primaryincidenttype");
                //Retrieve all related Service Tasks
                var fetchXml = [
                    "<fetch top='50'>",
                    "  <entity name='msdyn_workorderservicetask'>",
                    "    <attribute name='statuscode' />",
                    "    <attribute name='statecode' />",
                    "    <filter>",
                    "      <condition attribute='msdyn_workorder' operator='eq' value='", workOrderId_1, "'/>",
                    "    </filter>",
                    "  </entity>",
                    "</fetch>",
                ].join("");
                fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
                Xrm.WebApi.retrieveMultipleRecords("msdyn_workorderservicetask", fetchXml).then(function (result) {
                    if (result.entities.length == 0) {
                        activityTypeControl_1.setDisabled(false);
                    }
                    else {
                        var workOrderHasActiveWost = false;
                        var workOrderHasNewWost = false;
                        for (var _i = 0, _a = result.entities; _i < _a.length; _i++) {
                            var wost = _a[_i];
                            if (wost.statecode == 0) {
                                workOrderHasActiveWost = true;
                                if (wost.statuscode == 918640005 /* msdyn_workorderservicetask_statuscode.New */)
                                    workOrderHasNewWost = true;
                            }
                        }
                        if (!(workOrderHasNewWost || !workOrderHasActiveWost)) {
                            //The Activity type should not have been able to change. Set it to the old value and lock the field.
                            Xrm.WebApi.retrieveRecord("msdyn_workorder", workOrderId_1, "?$select=_msdyn_primaryincidenttype_value&$expand=msdyn_primaryincidenttype($select=ovs_incidenttypenameenglish,ovs_incidenttypenamefrench)").then(function (result) {
                                var incidentTypeName = (Xrm.Utility.getGlobalContext().userSettings.languageId == 1036) ? result.msdyn_primaryincidenttype.ovs_incidenttypenamefrench : result.msdyn_primaryincidenttype.ovs_incidenttypenameenglish;
                                formContext.getAttribute("msdyn_primaryincidenttype").setValue([{
                                        id: result._msdyn_primaryincidenttype_value,
                                        name: incidentTypeName,
                                        entityType: "msdyn_incidenttype"
                                    }]);
                                activityTypeControl_1.setDisabled(true);
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
                            if (wost.statuscode == 918640005 /* msdyn_workorderservicetask_statuscode.New */)
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
            setScheduledQuarterFilter(form);
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
                var operationTypeAttributeValue_4 = operationTypeAttribute.getValue();
                var stakeholderAttributeValue = stakeholderAttribute.getValue();
                var siteAttributeValue = siteAttribute.getValue();
                var workOrderTypeAttributeValue_5 = workOrderTypeAttribute.getValue();
                if (siteAttributeValue != null && siteAttributeValue != undefined &&
                    stakeholderAttributeValue != null && stakeholderAttributeValue != undefined &&
                    operationTypeAttributeValue_4 != null && operationTypeAttributeValue_4 != undefined &&
                    workOrderTypeAttribute != null && workOrderTypeAttributeValue_5 != null) {
                    if (isFromSecurityIncident && siteAttributeValue[0].id.toLowerCase() == "{bfff30ab-31c3-ed11-b597-000d3af4f43d}") { //Security Incident Site. Bug 322427 fixes
                        var placeHolderOperation = [
                            {
                                id: "e9fa69ee-85ea-ed11-a7c6-0022483c5061",
                                name: "Security Incident Operation",
                                entityType: "ovs_operation"
                            }
                        ];
                        form.getAttribute('ovs_operationid').setValue(placeHolderOperation);
                        setActivityTypeFilteredView(form, placeHolderOperation[0].id, workOrderTypeAttributeValue_5[0].id, operationTypeAttributeValue_4[0].id);
                    }
                    else {
                        // Populate operation asset
                        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="ovs_operation"><attribute name="ovs_name"/><attribute name="ts_stakeholder"/><attribute name="ts_site"/><attribute name="ovs_operationid"/><attribute name="ts_operationalstatus"/><order attribute="ovs_name" descending="true"/><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeValue_4[0].id + '"/><condition attribute="ts_site" operator="eq" value="' + siteAttributeValue[0].id + '"/><condition attribute="ts_stakeholder" operator="eq" value="' + stakeholderAttributeValue[0].id + '"/></filter></entity></fetch>';
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
                                setActivityTypeFilteredView(form, lookup[0].id, workOrderTypeAttributeValue_5[0].id, operationTypeAttributeValue_4[0].id);
                            }
                            //else {
                            //    if (isFromSecurityIncident) {
                            //        const placeHolderOperation: { id: string; name: string; entityType: "ovs_operation" }[] = [
                            //            {
                            //                id: "e9fa69ee-85ea-ed11-a7c6-0022483c5061",
                            //                name: "Security Incident Operation",
                            //                entityType: "ovs_operation"
                            //            }
                            //        ]
                            //        form.getAttribute('ovs_operationid').setValue(placeHolderOperation);
                            //        setActivityTypeFilteredView(form, placeHolderOperation[0].id, workOrderTypeAttributeValue[0].id, operationTypeAttributeValue[0].id);
                            //    }
                            //}
                        }, function (error) {
                            showErrorMessageAlert(error);
                        });
                    }
                }
            }
        }
        //function fillOrSetTradeNameView(eContext: Xrm.ExecutionContext<any, any>, stakeholderAttributeValue: Xrm.EntityReference<"account">[]) {
        //    const form = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();
        //    const tradeNameFetchXML = '?fetchXml=' + '<fetch version="1.0" mapping="logical" returntotalrecordcount="true" page="1" count="25" no-lock="false"><entity name="ts_tradename"><attribute name="statecode"/><attribute name="ts_tradenameid"/><attribute name="ts_name"/><attribute name="createdon"/><filter type="and"><condition attribute="statecode" operator="eq" value="0"/><condition attribute="ts_stakeholderid" operator="eq" value="' + stakeholderAttributeValue[0].id + '"/></filter><attribute name="ts_stakeholderid"/><order attribute="ts_name" descending="false"/></entity></fetch>';
        //    Xrm.WebApi.retrieveMultipleRecords('ts_tradename', tradeNameFetchXML).then(
        //        function success(tradeNames) {
        //            if (tradeNames.entities.length == 1) {
        //                var tradeName = new Array();
        //                tradeName[0] = new Object();
        //                tradeName[0].id = tradeNames.entities[0].ts_tradenameid
        //                tradeName[0].name = tradeNames.entities[0].ts_name
        //                tradeName[0].entityType = "ts_tradename";
        //                form.getAttribute("ts_tradenameid").setValue(tradeName);
        //            }
        //            else if (tradeNames.entities.length > 1) {
        //                form.getControl("ts_tradenameid").setDisabled(false);
        //                let tradeNameCondition = '';
        //                tradeNames.entities.forEach((tradeName) => { tradeNameCondition += '<condition attribute="ts_tradenameid" operator="eq" value="' + tradeName.ts_tradenameid + '" />' })
        //                const viewIdTradename = '{1c859fee-0541-2cac-8d20-7b50ee398066}';
        //                const entityNameTradename = "ts_tradename";
        //                const viewDisplayNameTradename = "FilteredSTradenames";
        //                const fetchXmlTradename = '<fetch version="1.0" mapping="logical" returntotalrecordcount="true" page="1" count="25" no-lock="false"><entity name="ts_tradename"><attribute name="statecode"/><attribute name="ts_tradenameid"/><attribute name="ts_name"/><attribute name="createdon"/><filter type="and"><condition attribute="statecode" operator="eq" value="0"/></filter><filter type="or">' + tradeNameCondition + '</filter><attribute name="ts_stakeholderid"/><order attribute="ts_name" descending="false"/></entity></fetch>';
        //                const layoutXmlTradename = '<grid name="resultset" object="10010" jump="ts_name" select="1" icon="1" preview="1"><row name="result" id="ts_tradenameid"><cell name="ts_name" width="200" /></row></grid>';
        //                form.getControl("ts_tradenameid").addCustomView(viewIdTradename, entityNameTradename, viewDisplayNameTradename, fetchXmlTradename, layoutXmlTradename, true);
        //            }
        //        }
        //    );
        //}
        function showHideContact(form) {
            var operationTypeValue = form.getAttribute("ovs_operationtypeid").getValue();
            if (operationTypeValue != null && operationTypeValue[0].id == "{BE8B0910-C751-EB11-A812-000D3AF3AC0D}") { //Person
                form.getControl("ts_contact").setVisible(true);
                form.getAttribute("ts_contact").setRequiredLevel("required");
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
                var userId, currentUserBusinessUnitFetchXML, userBusinessUnit, userBusinessUnitId;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            userId = Xrm.Utility.getGlobalContext().userSettings.userId;
                            currentUserBusinessUnitFetchXML = [
                                "<fetch top='50'>",
                                "  <entity name='businessunit'>",
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
                            userBusinessUnit = _a.sent();
                            userBusinessUnitId = userBusinessUnit.entities[0].businessunitid;
                            return [4 /*yield*/, isAvSecBU(userBusinessUnitId)];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        }
        function setFiscalQuarter(form) {
            var currentDate = new Date();
            var currentDateString = currentDate.toISOString();
            var fetchXml = "<fetch top=\"1\"><entity name=\"tc_tcfiscalquarter\"><attribute name=\"tc_name\"/><attribute name=\"tc_tcfiscalquarterid\"/><filter type=\"and\"><condition attribute=\"tc_quarterstart\" operator=\"le\" value=\"".concat(currentDateString, "\"/><condition attribute=\"tc_quarterend\" operator=\"ge\" value=\"").concat(currentDateString, "\"/></filter></entity></fetch>");
            var lookup = new Array();
            Xrm.WebApi.retrieveMultipleRecords("tc_tcfiscalquarter", "?fetchXml=" + fetchXml).then(function success(result) {
                lookup[0] = new Object();
                lookup[0].entityType = "tc_tcfiscalquarter";
                lookup[0].name = result.entities[0].tc_name;
                lookup[0].id = result.entities[0].tc_tcfiscalquarterid;
                form.getAttribute("ovs_fiscalquarter").setValue(lookup);
            }, function (error) {
            });
        }
        function setCaseLookupClickNavigation(eContext) {
            var formContext = eContext.getFormContext();
            formContext.getControl("msdyn_servicerequest").addOnLookupTagClick(function (eContext) {
                var formContext = eContext.getFormContext();
                //Check if the Time Tracking Tab is Expanded
                var timeTrackingExpanded = false;
                if (isROM20Form) {
                    timeTrackingExpanded = formContext.ui.tabs.get("tab_workspace").getDisplayState() == 'expanded';
                }
                else {
                    timeTrackingExpanded = formContext.ui.tabs.get("tab_TimeTracking").getDisplayState() == 'expanded';
                }
                if (timeTrackingExpanded) {
                    eContext.getEventArgs().preventDefault(); //Prevent default navigation to normal Case form
                    var record = eContext.getEventArgs().getTagValue();
                    Xrm.Navigation.navigateTo({
                        pageType: "entityrecord",
                        entityName: record.entityType,
                        entityId: record.id,
                        formId: "cc169f8e-7df9-ed11-8f6e-000d3af36bac"
                    }, {
                        target: 2,
                        position: 2,
                        width: {
                            value: 30,
                            unit: "%"
                        }
                    });
                }
            });
        }
        function setSecurityIncidentLookupClickNavigation(eContext) {
            var formContext = eContext.getFormContext();
            formContext.getControl("ts_securityincident").addOnLookupTagClick(function (eContext) {
                var formContext = eContext.getFormContext();
                //Check if the Time Tracking Tab is Expanded
                var timeTrackingExpanded = false;
                if (isROM20Form) {
                    timeTrackingExpanded = formContext.ui.tabs.get("tab_workspace").getDisplayState() == 'expanded';
                }
                else {
                    timeTrackingExpanded = formContext.ui.tabs.get("tab_TimeTracking").getDisplayState() == 'expanded';
                }
                if (timeTrackingExpanded) {
                    eContext.getEventArgs().preventDefault(); //Prevent default navigation to normal Case form
                    var record = eContext.getEventArgs().getTagValue();
                    Xrm.Navigation.navigateTo({
                        pageType: "entityrecord",
                        entityName: record.entityType,
                        entityId: record.id,
                        formId: "54b321b6-6afa-ed11-8f6e-0022483c5061"
                    }, {
                        target: 2,
                        position: 2,
                        width: {
                            value: 30,
                            unit: "%"
                        }
                    });
                }
            });
        }
        function setTripLookupClickNavigation(eContext) {
            var formContext = eContext.getFormContext();
            formContext.getControl("ts_trip").addOnLookupTagClick(function (eContext) {
                var formContext = eContext.getFormContext();
                //Check if the Time Tracking Tab is Expanded
                var timeTrackingExpanded = false;
                if (isROM20Form) {
                    timeTrackingExpanded = formContext.ui.tabs.get("tab_workspace").getDisplayState() == 'expanded';
                }
                else {
                    timeTrackingExpanded = formContext.ui.tabs.get("tab_TimeTracking").getDisplayState() == 'expanded';
                }
                if (timeTrackingExpanded) {
                    eContext.getEventArgs().preventDefault(); //Prevent default navigation to normal Case form
                    var record = eContext.getEventArgs().getTagValue();
                    Xrm.Navigation.navigateTo({
                        pageType: "entityrecord",
                        entityName: record.entityType,
                        entityId: record.id,
                        formId: "F9A735C7-D9C6-4CFF-B0CE-C78A28C8E5AD"
                    }, {
                        target: 2,
                        position: 2,
                        width: {
                            value: 30,
                            unit: "%"
                        }
                    });
                }
            });
        }
        function unlockRecordLogFieldsIfUserIsSystemAdmin(formContext) {
            if (userHasRole("System Administrator")) {
                formContext.getControl("msdyn_timeclosed").setDisabled(false);
                formContext.getControl("msdyn_closedby").setDisabled(false);
            }
        }
        function showHideFiedsByOperationType(eContext) {
            var form = eContext.getFormContext();
            var formROM2 = eContext.getFormContext();
            var operationTypeAttribute = form.getAttribute("ovs_operationtypeid");
            if (operationTypeAttribute != null) {
                var operationTypeAttributeValue = operationTypeAttribute.getValue();
                if (operationTypeAttributeValue != null) {
                    if (operationTypeAttributeValue[0].id.toLowerCase() == "{8b614ef0-c651-eb11-a812-000d3af3ac0d}") { //Air Carrier (Passenger)
                        form.getControl("ts_aircraftclassification").setVisible(true);
                        if (form.getAttribute("ts_aircraftclassification").getValue() == null) {
                            form.getAttribute("ts_aircraftclassification").setValue(741130000 /* ts_aircraftclassification.PassengerPAX */);
                        }
                        if (isROM20Form) {
                            formROM2.ui.tabs.get("tab_workspace").sections.get("tab_workspace_flightdetails").setVisible(true);
                            formROM2.ui.tabs.get("tab_workspace").sections.get("tab_workspace_aircraftdetails").setVisible(true);
                        }
                    }
                    else {
                        form.getControl("ts_aircraftclassification").setVisible(false);
                        if (isROM20Form) {
                            formROM2.ui.tabs.get("tab_workspace").sections.get("tab_workspace_flightdetails").setVisible(false);
                            formROM2.ui.tabs.get("tab_workspace").sections.get("tab_workspace_aircraftdetails").setVisible(false);
                        }
                    }
                }
                else {
                    form.getControl("ts_aircraftclassification").setVisible(false);
                }
            }
        }
        function RunOnRowSelected(eContext) {
            debugger;
            var selected = eContext.getFormContext().data.entity;
            var Id = selected.getId();
            var entityName = selected.getEntityName();
            Xrm.Navigation.navigateTo({
                pageType: "entityrecord",
                entityName: entityName,
                entityId: Id
            }, {
                target: 2,
                position: 2,
                width: {
                    value: 30,
                    unit: "%"
                }
            });
        }
        WorkOrder.RunOnRowSelected = RunOnRowSelected;
        function populateFlightCategory(eContext) {
            var form = eContext.getFormContext();
            var originValue = form.getAttribute("ts_departureaerodrome").getValue();
            var destinationValue = form.getAttribute("ts_arrivalaerodrome").getValue();
            var originCountry;
            var distinationCountry;
            if (originValue != null && destinationValue != null) {
                Xrm.WebApi.retrieveRecord("msdyn_functionallocation", originValue[0].id, "?$select=_ts_country_value ").then(function success(result1) {
                    originCountry = result1._ts_country_value;
                    Xrm.WebApi.retrieveRecord("msdyn_functionallocation", destinationValue[0].id, "?$select=_ts_country_value ").then(function success(result2) {
                        distinationCountry = result2._ts_country_value;
                        if (distinationCountry == "208ef8a1-8e75-eb11-a812-000d3af3fac7" && originCountry == "208ef8a1-8e75-eb11-a812-000d3af3fac7") { // Canada
                            // Domestic
                            form.getAttribute("ts_airserviceclassification").setValue(741130000 /* ts_airserviceclassification.Domestic */);
                        }
                        else if ((distinationCountry != "7c01709f-8e75-eb11-a812-000d3af3f6ab" && distinationCountry != "208ef8a1-8e75-eb11-a812-000d3af3fac7")
                            || (originCountry != "7c01709f-8e75-eb11-a812-000d3af3f6ab" && originCountry != "208ef8a1-8e75-eb11-a812-000d3af3fac7")) { //Not in USA or Canada
                            //International
                            form.getAttribute("ts_airserviceclassification").setValue(741130001 /* ts_airserviceclassification.International */);
                        }
                        else {
                            //Transborder
                            form.getAttribute("ts_airserviceclassification").setValue(741130002 /* ts_airserviceclassification.Transborder */);
                        }
                    }, function error(error) {
                        Xrm.Navigation.openAlertDialog({ text: error.message });
                    });
                }, function error(error) {
                    Xrm.Navigation.openAlertDialog({ text: error.message });
                });
            }
        }
        WorkOrder.populateFlightCategory = populateFlightCategory;
        function getUserTeam(userId) {
            var fetchXml = [
                "<fetch distinct='false' mapping='logical'>",
                "  <entity name='team'>",
                "    <attribute name='name' />",
                "    <attribute name='teamid' />",
                "    <filter type='and'>",
                "      <condition attribute='teamtype' operator='ne' value='1' />",
                "    </filter>",
                "    <link-entity name='teammembership' intersect='true' visible='false' to='teamid' from='teamid'>",
                "      <link-entity name='systemuser' from='systemuserid' to='systemuserid' alias='bb'>",
                "        <filter type='and'>",
                "          <condition attribute='systemuserid' operator='eq' value='",
                userId,
                "' />",
                "        </filter>",
                "      </link-entity>",
                "    </link-entity>",
                "  </entity>",
                "</fetch>",
            ].join("");
            return Xrm.WebApi.retrieveMultipleRecords("team", "?fetchXml=" + encodeURIComponent(fetchXml));
        }
        /**
        * Handler for the OnChange event of the Rationale lookup.
        *
        * @param {Xrm.ExecutionContext<any, any>} eContext The execution context passed by the form.
        *
        * @returns {void}
        */
        function rationaleOnChange(eContext) {
            var form = eContext.getFormContext();
            showWorkOrderJustificationField(form);
        }
        WorkOrder.rationaleOnChange = rationaleOnChange;
        /**
          * Shows and makes required the Rationale lookup control when a Category indicates "Unplanned".
          *
          * @param {Form.msdyn_workorder.Main.ROMOversightActivity} form The Work Order form context (ROM Oversight Activity).
          * @param {string} unplannedCategoryGUID GUID for the "Unplanned" category.
          *
          * @returns {void}
          */
        function showRationaleField(form, unplannedCategoryGUID) {
            var lang = Xrm.Utility.getGlobalContext().userSettings.languageId;
            var categoryAttribute = form.getAttribute("ovs_rational");
            if (!categoryAttribute) {
                return;
            }
            var categoryValue = categoryAttribute.getValue();
            var show = false;
            if (Array.isArray(categoryValue) && categoryValue.length > 0) {
                var item = categoryValue[0];
                var rawId = item.id || "";
                var id = rawId.replace(/[{}]/g, "").toLowerCase();
                if (id === unplannedCategoryGUID.toLowerCase()) {
                    show = true;
                }
            }
            var rationaleControl = form.getControl("ts_reason");
            var rationaleAttribute = form.getAttribute("ts_reason");
            var rationaleValue = rationaleAttribute === null || rationaleAttribute === void 0 ? void 0 : rationaleAttribute.getValue();
            console.log("ts_reason value on load:", rationaleValue);
            if (rationaleControl) {
                rationaleControl.setVisible(show);
            }
            if (rationaleAttribute) {
                rationaleAttribute.setRequiredLevel(show ? "required" : "none");
                showWorkOrderJustificationField(form);
                // If hiding, clear value to avoid stale required-value mismatch
                if (!show) {
                    rationaleAttribute.setValue(null);
                }
            }
        }
        /**
         * Shows and makes required the Work Order Justification field when the current
         * Rationale lookup value is equal to the HQ Direction GUID.
         *
         * @param {Form.msdyn_workorder.Main.ROMOversightActivity} form The Work Order form context (ROM Oversight Activity).
         *
         * @returns {void}
         */
        function showWorkOrderJustificationField(form) {
            var rationaleAttribute = form.getAttribute("ts_reason");
            if (!rationaleAttribute) {
                return;
            }
            var rationaleValue = rationaleAttribute.getValue();
            var justificationControl = form.getControl("ts_workorderjustification");
            var justificationAttribute = form.getAttribute("ts_workorderjustification");
            var HQ_DIRECTION_RATIONALE_GUID = "b323090c-1cb5-f011-bbd2-7ced8da5b15f";
            var show = false;
            if (Array.isArray(rationaleValue) && rationaleValue.length > 0) {
                var item = rationaleValue[0];
                var rawId = item.id || "";
                var id = rawId.replace(/[{}]/g, "").toLowerCase();
                if (id === HQ_DIRECTION_RATIONALE_GUID.toLowerCase()) {
                    show = true;
                }
            }
            if (justificationControl) {
                justificationControl.setVisible(show);
            }
            if (justificationAttribute) {
                justificationAttribute.setRequiredLevel(show ? "required" : "none");
                if (!show) {
                    justificationAttribute.setValue(null);
                }
            }
        }
        /**
         * Checks whether the current user is part of the Work Order Access Team
         * based on a specific Team Template associated with the Work Order.
         *
         * @param {Form.msdyn_workorder.Main.ROMOversightActivity} form
         *        The form context from the Work Order form.
         *
         * @description
         * This function runs a FetchXML query to retrieve users who:
         * - belong to a team created from a specific Team Template
         * - AND have access to the current Work Order (via principalobjectaccess)
         *
         * If the logged-in user's ID is found, the global flag
         * `isEditWorkOrderEnabled` is set to true.
         */
        function checkUserIsInWorkOrderAccessTeam(form) {
            var currentWorkOrderRecordId = form.data.entity.getId().replace(/({|})/g, '');
            var currentUserId = Xrm.Utility.getGlobalContext().userSettings.userId.replace(/[{}]/g, "").toLocaleLowerCase();
            // Hardcoded Team Template ID
            var teamTemplateId = "bddf1d45-706d-ec11-8f8e-0022483da5aa";
            // FetchXML to get existing users in the Additional Inspectors subgrid 
            var fetchXML = "\n                        <fetch>\n                          <entity name=\"systemuser\">\n                            <attribute name=\"systemuserid\"/>\n                            <attribute name=\"fullname\"/>\n                            <link-entity name=\"teammembership\" from=\"systemuserid\" to=\"systemuserid\" link-type=\"inner\">\n                              <link-entity name=\"team\" from=\"teamid\" to=\"teamid\" link-type=\"inner\">\n                                <link-entity name=\"teamtemplate\" from=\"teamtemplateid\" to=\"teamtemplateid\" link-type=\"inner\">\n                                  <filter>\n                                    <condition attribute=\"teamtemplateid\" operator=\"eq\" value=\"".concat(teamTemplateId, "\" />\n                                  </filter>\n                                </link-entity>\n                                <link-entity name=\"principalobjectaccess\" from=\"principalid\" to=\"teamid\" link-type=\"inner\">\n                                  <link-entity name=\"msdyn_workorder\" from=\"msdyn_workorderid\" to=\"objectid\" link-type=\"inner\">\n                                    <filter>\n                                      <condition attribute=\"msdyn_workorderid\" operator=\"eq\" value=\"").concat(currentWorkOrderRecordId, "\" />\n                                    </filter>\n                                  </link-entity>\n                                </link-entity>\n                              </link-entity>\n                            </link-entity>sys\n                          </entity>\n                        </fetch>");
            Xrm.WebApi.retrieveMultipleRecords("systemuser", "?fetchXml=" + encodeURIComponent(fetchXML))
                .then(function (result) {
                for (var i = 0; i < result.entities.length; i++) {
                    if (currentUserId === result.entities[i].systemuserid.replace(/({|})/g, '').toLowerCase()) {
                        WorkOrder.isEditWorkOrderEnabled = true;
                        break;
                    }
                }
                form.ui.refreshRibbon();
            })
                .catch(function (error) {
                console.error("Error retrieving subgrid users: ", error.message);
            });
        }
        function setWorkOrderTypeFilteredView(form, useRailSafetyTypes) {
            return __awaiter(this, void 0, void 0, function () {
                var railSecurityTeamId, viewId, op, entityName, viewDisplayName, fetchXml, layoutXml;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, getEnvironmentVariableValue(TEAM_SCHEMA_NAMES.RAIL_SAFETY)];
                        case 1:
                            railSecurityTeamId = _a.sent();
                            viewId = useRailSafetyTypes
                                ? '{4197D34A-2D73-4BED-AB2A-B44799E98C62}' // Rail Safety
                                : '{4197D34B-2D73-4BED-AB2C-B44799E98C62}' // Default
                            ;
                            op = useRailSafetyTypes ? "eq" : "ne";
                            entityName = "msdyn_workordertype";
                            viewDisplayName = "Filtered Work Order Types";
                            fetchXml = '<fetch xmlns:generator="MarkMpn.SQL4CDS">' +
                                '  <entity name="msdyn_workordertype">' +
                                '    <attribute name="msdyn_workordertypeid" />' +
                                '    <attribute name="msdyn_name" />' +
                                '    <filter>' +
                                "      <condition attribute=\"ownerid\" operator=\"".concat(op, "\" value=\"").concat(railSecurityTeamId, "\" />") +
                                '    </filter>' +
                                '  </entity>' +
                                '</fetch>';
                            layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1">' +
                                '  <row name="result" id="msdyn_workordertypeid">' +
                                '    <cell name="msdyn_name" width="200" />' +
                                '  </row>' +
                                '</grid>';
                            form.getControl("msdyn_workordertype")
                                .addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                            return [2 /*return*/];
                    }
                });
            });
        }
    })(WorkOrder = ROM.WorkOrder || (ROM.WorkOrder = {}));
})(ROM || (ROM = {}));
