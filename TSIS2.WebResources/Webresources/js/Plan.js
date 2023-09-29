"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var Plan;
    (function (Plan) {
        function onLoad(eContext) {
            var formContext = eContext.getFormContext();
            if (formContext.ui.getFormType() == 1) { //Create
                formContext.data.entity.addOnPostSave(generateSuggestedInspections);
            }
        }
        Plan.onLoad = onLoad;
        /*
         * Generates the Suggested Inspection Records and the Plan Inspector Hours Records
         *
         * Suggested Inspections:
         * First retrieve all the required records
         * Retrieve all the Operations related to the Plan and Loop through
         * For each Operation, look at the last Risk Based Inspection Date, and the Risk's Interval and Frequency to determine if an inspection is due and how many are due
         * If an inspection is due, look at the Operation's property values to determine what Incident Types should be Suggested
         * Create Suggested Inspection records for all the Operations that are due
         *
         * Plan Inspector Hours:
         * Retrieve all Inspector Hours (ts_inspectionhours) records related to the Plan's team (Baseline Hours Lookup record has the same Team as the Plan)
         * Create a Plan Inspector Hours record for each
         */
        function generateSuggestedInspections(eContext) {
            return __awaiter(this, void 0, void 0, function () {
                var formContext, planId, teamValue, teamId, teamName, planFiscalYearValue, planFiscalYearName, planFiscalYearId, planfetchXml, planData, teamRegionId, plannedFiscalEndDate, OperationsFetchXml, operations, siteInspectionTDGIncidentTypeId, VSITDGIncidentTypeId, NonSchedule1TDGIncidentTypeId, OversightSIPAXIncidentTypeId, SIPAXIncidentTypeId, siteInspectionTDGIncidentType, VSITDGIncidentType, NonSchedule1TDGIncidentType, OversightSIPAXIncidentType, SIPAXIncidentType, _i, operations_1, operation, lastRiskInspection, riskInterval, riskFrequency, inspectionIsDue, inspectionCount, nextInspectionDate, i, data, railwayCarrierOperationTypeId, railwayLoaderOperationTypeId, VSIData, SiteInspectionData, SiteInspectionData, VSIData, nonSchedule1Data, nonSchedule1Data, OversightData, SiteInspectionData, SiteInspectionData, inspectorHoursfetchXml, teamInspectorHours, _a, teamInspectorHours_1, inspectorHours, data;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            formContext = eContext.getFormContext();
                            Xrm.Utility.showProgressIndicator("Please wait while the Suggested Inspection records are being created.");
                            formContext.data.entity.removeOnPostSave(generateSuggestedInspections);
                            planId = formContext.data.entity.getId();
                            teamValue = formContext.getAttribute("ts_team").getValue();
                            if (teamValue != null) {
                                teamId = teamValue[0].id;
                                teamName = teamValue[0].name;
                            }
                            planFiscalYearValue = formContext.getAttribute("ts_fiscalyear").getValue();
                            if (planFiscalYearValue != null) {
                                planFiscalYearName = planFiscalYearValue[0].name;
                                planFiscalYearId = planFiscalYearValue[0].id.slice(1, -1);
                            }
                            if (!(teamId != null && planFiscalYearId != null)) return [3 /*break*/, 9];
                            //Set the Plan name to a combination of the team and fiscal year
                            formContext.getAttribute("ts_name").setValue(teamName + " " + planFiscalYearName);
                            planfetchXml = [
                                "<fetch>",
                                "  <entity name='ts_plan'>",
                                "    <filter>",
                                "      <condition attribute='ts_planid' operator='eq' value='", planId, "' uitype='ts_plan'/>",
                                "    </filter>",
                                "    <link-entity name='tc_tcfiscalyear' from='tc_tcfiscalyearid' to='ts_fiscalyear' alias='fiscalyear'>",
                                "      <attribute name='tc_fiscalend'/>",
                                "      <attribute name='tc_fiscalstart'/>",
                                "      <attribute name='tc_tcfiscalyearid'/>",
                                "    </link-entity>",
                                "    <link-entity name='team' from='teamid' to='ts_team' alias='team'>",
                                "      <attribute name='ts_territory'/>",
                                "    </link-entity>",
                                "  </entity>",
                                "</fetch>"
                            ].join("");
                            planfetchXml = "?fetchXml=" + encodeURIComponent(planfetchXml);
                            return [4 /*yield*/, Xrm.WebApi.retrieveMultipleRecords("ts_plan", planfetchXml).then(function success(result) { return result.entities[0]; })];
                        case 1:
                            planData = _b.sent();
                            if (planData == null) {
                                console.log("Failed to load current Plan");
                                return [2 /*return*/];
                            }
                            teamRegionId = planData["team.ts_territory"];
                            plannedFiscalEndDate = new Date(planData["fiscalyear.tc_fiscalend"]);
                            OperationsFetchXml = [
                                "<fetch>",
                                "  <entity name='ovs_operation'>",
                                "    <attribute name='ts_dateoflastriskbasedinspection'/>",
                                "    <attribute name='ts_typeofdangerousgoods'/>",
                                "    <attribute name='ovs_name'/>",
                                "    <attribute name='ovs_operationid'/>",
                                "    <attribute name='ovs_operationtypeid'/>",
                                "    <attribute name='ts_risk'/>",
                                "    <attribute name='ts_site'/>",
                                "    <attribute name='ts_stakeholder'/>",
                                "    <attribute name='ts_operationnameenglish'/>",
                                "    <attribute name='ts_operationnamefrench'/>",
                                "    <attribute name='ts_visualsecurityinspection'/>",
                                "    <attribute name='ts_issecurityinspectionsite'/>",
                                "    <filter type='or'>",
                                "      <condition attribute='ovs_operationtypeid' operator='eq' value='d883b39a-c751-eb11-a812-000d3af3ac0d' uiname='Railway Carrier' uitype='ovs_operationtype'/>",
                                "      <condition attribute='ovs_operationtypeid' operator='eq' value='da56fea1-c751-eb11-a812-000d3af3ac0d' uiname='Railway Loader' uitype='ovs_operationtype'/>",
                                "      <condition attribute='ovs_operationtypeid' operator='eq' value='3b261029-c751-eb11-a812-000d3af3ac0d' uitype='ovs_operationtype'/>",
                                "      <condition attribute='ovs_operationtypeid' operator='eq' value='199e31ae-c751-eb11-a812-000d3af3ac0d' uitype='ovs_operationtype'/>",
                                "      <condition attribute='ovs_operationtypeid' operator='eq' value='b27e5003-c751-eb11-a812-000d3af3ac0d' uitype='ovs_operationtype'/>",
                                "    </filter>",
                                "    <link-entity name='msdyn_functionallocation' from='msdyn_functionallocationid' to='ts_site'>",
                                "      <filter>",
                                "        <condition attribute='ts_region' operator='eq' value='", teamRegionId, "' uiname='Pacific Region' uitype='territory'/>",
                                "      </filter>",
                                "    </link-entity>",
                                "    <link-entity name='ts_riskcategory' from='ts_riskcategoryid' to='ts_risk' alias='risk'>",
                                "      <attribute name='ts_frequency'/>",
                                "      <attribute name='ts_interval'/>",
                                "    </link-entity>",
                                "  </entity>",
                                "</fetch>"
                            ].join("");
                            OperationsFetchXml = "?fetchXml=" + encodeURIComponent(OperationsFetchXml);
                            return [4 /*yield*/, Xrm.WebApi.retrieveMultipleRecords("ovs_operation", OperationsFetchXml).then(function success(result) { return result.entities; })];
                        case 2:
                            operations = _b.sent();
                            planId = planId.slice(1, -1);
                            siteInspectionTDGIncidentTypeId = "2bc59aa0-511a-ec11-b6e7-000d3a09ce95";
                            VSITDGIncidentTypeId = "34c59aa0-511a-ec11-b6e7-000d3a09ce95";
                            NonSchedule1TDGIncidentTypeId = "3ac59aa0-511a-ec11-b6e7-000d3a09ce95";
                            OversightSIPAXIncidentTypeId = "c8c934c6-01b5-ec11-983e-000d3af4f373";
                            SIPAXIncidentTypeId = "45c59aa0-511a-ec11-b6e7-000d3a09ce95";
                            return [4 /*yield*/, Xrm.WebApi.retrieveRecord("msdyn_incidenttype", siteInspectionTDGIncidentTypeId, "?$select=msdyn_name,msdyn_estimatedduration").then(function success(result) { return result; }, function (error) { console.log(error.message); })];
                        case 3:
                            siteInspectionTDGIncidentType = _b.sent();
                            return [4 /*yield*/, Xrm.WebApi.retrieveRecord("msdyn_incidenttype", VSITDGIncidentTypeId, "?$select=msdyn_name,msdyn_estimatedduration").then(function success(result) { return result; }, function (error) { console.log(error.message); })];
                        case 4:
                            VSITDGIncidentType = _b.sent();
                            return [4 /*yield*/, Xrm.WebApi.retrieveRecord("msdyn_incidenttype", NonSchedule1TDGIncidentTypeId, "?$select=msdyn_name,msdyn_estimatedduration").then(function success(result) { return result; }, function (error) { console.log(error.message); })];
                        case 5:
                            NonSchedule1TDGIncidentType = _b.sent();
                            return [4 /*yield*/, Xrm.WebApi.retrieveRecord("msdyn_incidenttype", OversightSIPAXIncidentTypeId, "?$select=msdyn_name,msdyn_estimatedduration").then(function success(result) { return result; }, function (error) { console.log(error.message); })];
                        case 6:
                            OversightSIPAXIncidentType = _b.sent();
                            return [4 /*yield*/, Xrm.WebApi.retrieveRecord("msdyn_incidenttype", SIPAXIncidentTypeId, "?$select=msdyn_name,msdyn_estimatedduration").then(function success(result) { return result; }, function (error) { console.log(error.message); })];
                        case 7:
                            SIPAXIncidentType = _b.sent();
                            //Create a suggested inspection for each operation
                            for (_i = 0, operations_1 = operations; _i < operations_1.length; _i++) {
                                operation = operations_1[_i];
                                // If ts_typeofdangerousgoods does not equal No DG
                                if (operation.ts_typeofdangerousgoods != 717750000 /* NoDangerousGoods */) {
                                    lastRiskInspection = operation.ts_dateoflastriskbasedinspection;
                                    riskInterval = operation["risk.ts_interval"];
                                    riskFrequency = operation["risk.ts_frequency"];
                                    inspectionIsDue = false;
                                    inspectionCount = 0;
                                    //Handle Last Risk Inspection Date bieng Null. Suggest an inspection this fiscal year. Or multiple if multiple happen a year.
                                    if (lastRiskInspection == null) {
                                        inspectionIsDue = true;
                                        if (riskInterval > 1) {
                                            inspectionCount = 1;
                                        }
                                        else {
                                            inspectionCount = riskFrequency;
                                        }
                                        // There is a previous date we need to start from
                                    }
                                    else {
                                        nextInspectionDate = getNextInspectionDate(lastRiskInspection, riskFrequency, riskInterval);
                                        /*
                                         * Interval is the amount of years between each inspection
                                         * Frequency is the amount of inspections in the interval
                                         * Frequency is always 1 when Interval is greater than 1
                                         * Interval is always 1 when Frequency is greater than 1
                                         * So really Frequency only matters when Interval is 1, and it tells you how many inspections occur a year
                                        */
                                        for (i = 1; i <= riskFrequency; i++) {
                                            //If Next Inspection occurs before fiscal year ends, an inspection is due/overdue
                                            if (nextInspectionDate <= plannedFiscalEndDate) {
                                                inspectionCount++;
                                                inspectionIsDue = true;
                                            }
                                            nextInspectionDate = getNextInspectionDate(lastRiskInspection, riskFrequency, riskInterval);
                                        }
                                    }
                                    if (inspectionIsDue) {
                                        data = {
                                            //"ts_name" : `${railOperation.ts_operationnameenglish} | ${VSITDGIncidentType.ts_estimatedduration.msdyn_name} | ${planFiscalYearName}`;
                                            "ts_plan@odata.bind": "/ts_plans(" + planId + ")",
                                            "ts_stakeholder@odata.bind": "/accounts(" + operation._ts_stakeholder_value + ")",
                                            "ts_operationtype@odata.bind": "/ovs_operationtypes(" + operation._ovs_operationtypeid_value + ")",
                                            "ts_site@odata.bind": "/msdyn_functionallocations(" + operation._ts_site_value + ")",
                                            "ts_operation@odata.bind": "/ovs_operations(" + operation.ovs_operationid + ")",
                                            "ts_riskthreshold@odata.bind": "/ts_riskcategories(" + operation._ts_risk_value + ")",
                                            "ts_q1": inspectionCount,
                                            "ts_q2": 0,
                                            "ts_q3": 0,
                                            "ts_q4": 0,
                                        };
                                        railwayCarrierOperationTypeId = "d883b39a-c751-eb11-a812-000d3af3ac0d";
                                        railwayLoaderOperationTypeId = "da56fea1-c751-eb11-a812-000d3af3ac0d";
                                        //If the Operation Type is RailwayCarrier of RailwayLoader (First bigger Flow Logic)
                                        if (operation._ovs_operationtypeid_value == railwayCarrierOperationTypeId || operation._ovs_operationtypeid_value == railwayLoaderOperationTypeId) {
                                            if (operation.ts_typeofdangerousgoods == 717750001 /* Schedule1DangerousGoods */ || operation.ts_typeofdangerousgoods == null) {
                                                if (operation.ts_visualsecurityinspection == 717750001 /* Yes */) {
                                                    VSIData = __assign({}, data);
                                                    SiteInspectionData = __assign({}, data);
                                                    VSIData["ts_activitytype@odata.bind"] = "/msdyn_incidenttypes(" + VSITDGIncidentTypeId + ")"; //Oversight of the Railway Carrier Visual Security Inspection (TDG)
                                                    VSIData["ts_estimatedduration"] = VSITDGIncidentType.msdyn_estimatedduration / 60;
                                                    Xrm.WebApi.createRecord("ts_suggestedinspection", VSIData).then(function success(result) { }, function (error) { console.log(error.message); });
                                                    SiteInspectionData["ts_activitytype@odata.bind"] = "/msdyn_incidenttypes(" + siteInspectionTDGIncidentTypeId + ")"; //Site Inspection (TDG)
                                                    SiteInspectionData["ts_estimatedduration"] = siteInspectionTDGIncidentType.msdyn_estimatedduration / 60;
                                                    Xrm.WebApi.createRecord("ts_suggestedinspection", SiteInspectionData).then(function success(result) { }, function (error) { console.log(error.message); });
                                                }
                                                else {
                                                    SiteInspectionData = __assign({}, data);
                                                    //Site Inspection (TDG) Suggested
                                                    SiteInspectionData["ts_activitytype@odata.bind"] = "/msdyn_incidenttypes(" + siteInspectionTDGIncidentTypeId + ")"; //Site Inspection (TDG)
                                                    SiteInspectionData["ts_estimatedduration"] = siteInspectionTDGIncidentType.msdyn_estimatedduration / 60;
                                                    Xrm.WebApi.createRecord("ts_suggestedinspection", SiteInspectionData).then(function success(result) { }, function (error) { console.log(error.message); });
                                                }
                                            }
                                            else if (operation.ts_typeofdangerousgoods == 717750002 /* NonSchedule1DangerousGoods */) {
                                                if (operation.ts_visualsecurityinspection == 717750001 /* Yes */) {
                                                    VSIData = __assign({}, data);
                                                    nonSchedule1Data = __assign({}, data);
                                                    VSIData["ts_activitytype@odata.bind"] = "/msdyn_incidenttypes(" + VSITDGIncidentTypeId + ")"; //Oversight of the Railway Carrier Visual Security Inspection (TDG)
                                                    VSIData["ts_estimatedduration"] = VSITDGIncidentType.msdyn_estimatedduration / 60;
                                                    Xrm.WebApi.createRecord("ts_suggestedinspection", VSIData).then(function success(result) { }, function (error) { console.log(error.message); });
                                                    nonSchedule1Data["ts_activitytype@odata.bind"] = "/msdyn_incidenttypes(" + NonSchedule1TDGIncidentTypeId + ")"; //Site Inspection for Non-Schedule 1 DG Railway Carriers/Loaders (TDG)
                                                    nonSchedule1Data["ts_estimatedduration"] = NonSchedule1TDGIncidentType.msdyn_estimatedduration / 60;
                                                    Xrm.WebApi.createRecord("ts_suggestedinspection", nonSchedule1Data).then(function success(result) { }, function (error) { console.log(error.message); });
                                                }
                                                else {
                                                    nonSchedule1Data = __assign({}, data);
                                                    nonSchedule1Data["ts_activitytype@odata.bind"] = "/msdyn_incidenttypes(" + NonSchedule1TDGIncidentTypeId + ")"; //Site Inspection for Non-Schedule 1 DG Railway Carriers/Loaders (TDG)
                                                    nonSchedule1Data["ts_estimatedduration"] = NonSchedule1TDGIncidentType.msdyn_estimatedduration / 60;
                                                    Xrm.WebApi.createRecord("ts_suggestedinspection", nonSchedule1Data).then(function success(result) { }, function (error) { console.log(error.message); });
                                                }
                                            }
                                        }
                                        //Operation Type is Passenger Company, Small Passenger Company, or Host Company (Smaller Flow Logic)
                                        else {
                                            if (operation.ts_issecurityinspectionsite == 717750001 /* Yes */) {
                                                OversightData = __assign({}, data);
                                                SiteInspectionData = __assign({}, data);
                                                OversightData["ts_activitytype@odata.bind"] = "/msdyn_incidenttypes(" + OversightSIPAXIncidentTypeId + ")"; //Oversight of Security Inspections(PAX)
                                                OversightData["ts_estimatedduration"] = OversightSIPAXIncidentType.msdyn_estimatedduration / 60;
                                                Xrm.WebApi.createRecord("ts_suggestedinspection", OversightData).then(function success(result) { }, function (error) { console.log(error.message); });
                                                SiteInspectionData["ts_activitytype@odata.bind"] = "/msdyn_incidenttypes(" + SIPAXIncidentTypeId + ")"; //Site Inspection (PAX)
                                                SiteInspectionData["ts_estimatedduration"] = SIPAXIncidentType.msdyn_estimatedduration / 60;
                                                Xrm.WebApi.createRecord("ts_suggestedinspection", SiteInspectionData).then(function success(result) { }, function (error) { console.log(error.message); });
                                            }
                                            else {
                                                SiteInspectionData = __assign({}, data);
                                                //Site Inspection (TDG) Suggested
                                                SiteInspectionData["ts_activitytype@odata.bind"] = "/msdyn_incidenttypes(" + SIPAXIncidentTypeId + ")"; //Site Inspection (PAX)
                                                SiteInspectionData["ts_estimatedduration"] = SIPAXIncidentType.msdyn_estimatedduration / 60;
                                                Xrm.WebApi.createRecord("ts_suggestedinspection", SiteInspectionData).then(function success(result) { }, function (error) { console.log(error.message); });
                                            }
                                        }
                                    }
                                }
                            }
                            inspectorHoursfetchXml = [
                                "<fetch>",
                                "  <entity name='ts_inspectionhours'>",
                                "    <attribute name='ts_totalhoursq1'/>",
                                "    <attribute name='ts_totalhoursq2'/>",
                                "    <attribute name='ts_totalhoursq3'/>",
                                "    <attribute name='ts_totalhoursq4'/>",
                                "    <attribute name='ts_inspectionhoursid'/>",
                                "    <link-entity name='systemuser' from='systemuserid' to='ts_inspector' alias='user'>",
                                "      <attribute name='fullname'/>",
                                "    </link-entity>",
                                "    <link-entity name='ts_baselinehours' from='ts_baselinehoursid' to='ts_baselinehours'>",
                                "      <filter>",
                                "        <condition attribute='ts_team' operator='eq' value='", teamId, "' uitype='team'/>",
                                "      </filter>",
                                "    </link-entity>",
                                "  </entity>",
                                "</fetch>"
                            ].join("");
                            inspectorHoursfetchXml = "?fetchXml=" + encodeURIComponent(inspectorHoursfetchXml);
                            return [4 /*yield*/, Xrm.WebApi.retrieveMultipleRecords("ts_inspectionhours", inspectorHoursfetchXml).then(function success(result) {
                                    return result.entities;
                                })];
                        case 8:
                            teamInspectorHours = _b.sent();
                            if (teamInspectorHours != null && teamInspectorHours.length > 0) {
                                //For each inspector, create an Plan Inspector Hours record
                                for (_a = 0, teamInspectorHours_1 = teamInspectorHours; _a < teamInspectorHours_1.length; _a++) {
                                    inspectorHours = teamInspectorHours_1[_a];
                                    data = {
                                        "ts_name": inspectorHours["user.fullname"] + " | " + teamName + " | " + planFiscalYearName,
                                        "ts_inspectorhours@odata.bind": "/ts_inspectionhourses(" + inspectorHours.ts_inspectionhoursid + ")",
                                        "ts_plan@odata.bind": "/ts_plans(" + planId + ")",
                                        "ts_remaininghoursq1": inspectorHours.ts_totalhoursq1,
                                        "ts_remaininghoursq2": inspectorHours.ts_totalhoursq2,
                                        "ts_remaininghoursq3": inspectorHours.ts_totalhoursq3,
                                        "ts_remaininghoursq4": inspectorHours.ts_totalhoursq4
                                    };
                                    Xrm.WebApi.createRecord("ts_planinspectorhours", data);
                                }
                            }
                            _b.label = 9;
                        case 9:
                            formContext.data.entity.save();
                            Xrm.Utility.closeProgressIndicator();
                            return [2 /*return*/];
                    }
                });
            });
        }
        //Used to lock specific fields in editable grids
        function lockSuggestedInspectionEditableGridFields(executionContext, fields) {
            var formContext = executionContext.getFormContext();
            if (formContext) {
                var entity = formContext.data.entity;
                entity.attributes.forEach(function (attribute, i) {
                    if (fields.indexOf(attribute.getName()) > -1) {
                        var attributeToDisable = attribute.controls.get(0);
                        attributeToDisable.setDisabled(true);
                    }
                });
            }
        }
        Plan.lockSuggestedInspectionEditableGridFields = lockSuggestedInspectionEditableGridFields;
        function getNextInspectionDate(startDate, interval, frequency) {
            var nextInspectionDate = new Date(startDate);
            var monthsToAdd = 12 * interval / frequency;
            nextInspectionDate.setMonth(nextInspectionDate.getMonth() + monthsToAdd);
            return nextInspectionDate;
        }
    })(Plan = ROM.Plan || (ROM.Plan = {}));
})(ROM || (ROM = {}));
