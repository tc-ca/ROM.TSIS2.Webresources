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
    var TeamPlanningData;
    (function (TeamPlanningData) {
        var INSPECTORROLEID = "ed37675e-f72c-eb11-a813-000d3af3a7a7";
        function onLoad(eContext) {
            var formContext = eContext.getFormContext();
            if (formContext.ui.getFormType() == 2) { //Update type. The form has already been saved for the first time
                formContext.getControl("ts_team").setDisabled(true);
                formContext.getControl("ts_fiscalyear").setDisabled(true);
                var planStatusValue = formContext.getAttribute("ts_planstatus").getValue();
                if (planStatusValue == 741130001 /* Complete */ || planStatusValue == 447390001 /* HQreview */) {
                    if (userHasRole("System Administrator|ROM - Business Admin")) {
                        formContext.getControl("ts_planstatus").setDisabled(false);
                    }
                    else {
                        formContext.getControl("ts_planstatus").setDisabled(true);
                    }
                    formContext.getControl("ts_totalhoursq1").setDisabled(true);
                    formContext.getControl("ts_totalhoursq2").setDisabled(true);
                    formContext.getControl("ts_totalhoursq3").setDisabled(true);
                    formContext.getControl("ts_totalhoursq4").setDisabled(true);
                    formContext.getControl("ts_totalhoursfiscalyear").setDisabled(true);
                    formContext.getControl("header_ts_name").setDisabled(true);
                    formContext.getControl("header_ownerid").setDisabled(true);
                }
                else {
                    formContext.getControl("ts_totalhoursq1").setDisabled(false);
                    formContext.getControl("ts_totalhoursq2").setDisabled(false);
                    formContext.getControl("ts_totalhoursq3").setDisabled(false);
                    formContext.getControl("ts_totalhoursq4").setDisabled(false);
                    formContext.getControl("ts_totalhoursfiscalyear").setDisabled(false);
                    formContext.getControl("header_ts_name").setDisabled(false);
                    formContext.getControl("header_ownerid").setDisabled(false);
                    formContext.getControl("ts_planstatus").setDisabled(false);
                }
            }
        }
        TeamPlanningData.onLoad = onLoad;
        function onSave(eContext) {
            var formContext = eContext.getFormContext();
            if (formContext.ui.getFormType() == 1) { //Create
                formContext.data.entity.addOnPostSave(generatePlanningData);
            }
        }
        TeamPlanningData.onSave = onSave;
        function generatePlanningData(eContext) {
            return __awaiter(this, void 0, void 0, function () {
                var formContext, teamPlanningDataId, teamPlanningDataTotalHoursQ1, teamPlanningDataTotalHoursQ2, teamPlanningDataTotalHoursQ3, teamPlanningDataTotalHoursQ4, teamPlanningDataTotalHoursFiscalYear, teamValue, teamId, teamName, planningDataFiscalYearValue, planningDataFiscalYearName, planningDataFiscalYearId, teamPlanningDataPlannedQ1, teamPlanningDataPlannedQ2, teamPlanningDataPlannedQ3, teamPlanningDataPlannedQ4, teamPlanningDataPlannedTotal, teamPlanningDataAvailableInspectorHoursQ1, teamPlanningDataAvailableInspectorHoursQ2, teamPlanningDataAvailableInspectorHoursQ3, teamPlanningDataAvailableInspectorHoursQ4, teamPlanningDataAvailableInspectorHoursTotal, teamPlanningDataTeamEstimatedDurationQ1, teamPlanningDataTeamEstimatedDurationQ2, teamPlanningDataTeamEstimatedDurationQ3, teamPlanningDataTeamEstimatedDurationQ4, teamPlanningDataTeamEstimatedDurationTotal, teamPlanningDataResidualinspectorhoursQ1, teamPlanningDataResidualinspectorhoursQ2, teamPlanningDataResidualinspectorhoursQ3, teamPlanningDataResidualinspectorhoursQ4, teamPlanningDataResidualinspectorhoursTotal, userfetchXml, fetchXml;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            Xrm.Utility.showProgressIndicator("Please wait while the Planning records are being created.");
                            formContext = eContext.getFormContext();
                            formContext.data.entity.removeOnPostSave(generatePlanningData);
                            teamPlanningDataId = formContext.data.entity.getId().slice(1, -1);
                            teamPlanningDataTotalHoursQ1 = formContext.getAttribute("ts_totalhoursq1").getValue();
                            teamPlanningDataTotalHoursQ2 = formContext.getAttribute("ts_totalhoursq2").getValue();
                            teamPlanningDataTotalHoursQ3 = formContext.getAttribute("ts_totalhoursq3").getValue();
                            teamPlanningDataTotalHoursQ4 = formContext.getAttribute("ts_totalhoursq4").getValue();
                            teamPlanningDataTotalHoursFiscalYear = formContext.getAttribute("ts_totalhoursfiscalyear").getValue();
                            if (teamPlanningDataTotalHoursQ1 == null)
                                formContext.getAttribute("ts_totalhoursq1").setValue(0);
                            if (teamPlanningDataTotalHoursQ2 == null)
                                formContext.getAttribute("ts_totalhoursq2").setValue(0);
                            if (teamPlanningDataTotalHoursQ3 == null)
                                formContext.getAttribute("ts_totalhoursq3").setValue(0);
                            if (teamPlanningDataTotalHoursQ4 == null)
                                formContext.getAttribute("ts_totalhoursq4").setValue(0);
                            if (teamPlanningDataTotalHoursFiscalYear == null)
                                formContext.getAttribute("ts_totalhoursfiscalyear").setValue(0);
                            teamValue = formContext.getAttribute("ts_team").getValue();
                            if (teamValue != null) {
                                teamId = teamValue[0].id;
                                teamName = teamValue[0].name;
                            }
                            planningDataFiscalYearValue = formContext.getAttribute("ts_fiscalyear").getValue();
                            if (planningDataFiscalYearValue != null) {
                                planningDataFiscalYearName = planningDataFiscalYearValue[0].name;
                                planningDataFiscalYearId = planningDataFiscalYearValue[0].id.slice(1, -1);
                            }
                            if (teamId == null || planningDataFiscalYearName == null) {
                                Xrm.Utility.closeProgressIndicator();
                                return [2 /*return*/];
                            }
                            teamPlanningDataPlannedQ1 = 0;
                            teamPlanningDataPlannedQ2 = 0;
                            teamPlanningDataPlannedQ3 = 0;
                            teamPlanningDataPlannedQ4 = 0;
                            teamPlanningDataPlannedTotal = 0;
                            teamPlanningDataAvailableInspectorHoursQ1 = 0;
                            teamPlanningDataAvailableInspectorHoursQ2 = 0;
                            teamPlanningDataAvailableInspectorHoursQ3 = 0;
                            teamPlanningDataAvailableInspectorHoursQ4 = 0;
                            teamPlanningDataAvailableInspectorHoursTotal = 0;
                            teamPlanningDataTeamEstimatedDurationQ1 = 0;
                            teamPlanningDataTeamEstimatedDurationQ2 = 0;
                            teamPlanningDataTeamEstimatedDurationQ3 = 0;
                            teamPlanningDataTeamEstimatedDurationQ4 = 0;
                            teamPlanningDataTeamEstimatedDurationTotal = 0;
                            teamPlanningDataResidualinspectorhoursQ1 = 0;
                            teamPlanningDataResidualinspectorhoursQ2 = 0;
                            teamPlanningDataResidualinspectorhoursQ3 = 0;
                            teamPlanningDataResidualinspectorhoursQ4 = 0;
                            teamPlanningDataResidualinspectorhoursTotal = 0;
                            userfetchXml = [
                                "<fetch>",
                                "  <entity name='systemuser'>",
                                "    <attribute name='fullname'/>",
                                "    <attribute name='systemuserid'/>",
                                "    <link-entity name='teammembership' from='systemuserid' to='systemuserid' intersect='true'>",
                                "      <filter>",
                                "        <condition attribute='teamid' operator='eq' value='", teamId, "' uitype='teammembership'/>",
                                "      </filter>",
                                "    </link-entity>",
                                "    <link-entity name='systemuserroles' from='systemuserid' to='systemuserid' intersect='true'>",
                                "      <filter>",
                                "        <condition attribute='roleid' operator='eq' value='", INSPECTORROLEID, "'/>",
                                "      </filter>",
                                "    </link-entity>",
                                "  </entity>",
                                "</fetch>"
                            ].join("");
                            userfetchXml = "?fetchXml=" + encodeURIComponent(userfetchXml);
                            return [4 /*yield*/, Xrm.WebApi.retrieveMultipleRecords("systemuser", userfetchXml).then(function success(result) {
                                    for (var _i = 0, _a = result.entities; _i < _a.length; _i++) {
                                        var user = _a[_i];
                                        teamPlanningDataAvailableInspectorHoursQ1 += teamPlanningDataTotalHoursQ1;
                                        teamPlanningDataAvailableInspectorHoursQ2 += teamPlanningDataTotalHoursQ2;
                                        teamPlanningDataAvailableInspectorHoursQ3 += teamPlanningDataTotalHoursQ3;
                                        teamPlanningDataAvailableInspectorHoursQ4 += teamPlanningDataTotalHoursQ4;
                                        var data = {
                                            "ts_name": user.fullname + " | " + teamName + " | " + planningDataFiscalYearName,
                                            "ts_Inspector@odata.bind": "/systemusers(" + user.systemuserid + ")",
                                            "ts_TeamPlanningData@odata.bind": "/ts_teamplanningdatas(" + teamPlanningDataId + ")",
                                            "ts_varianceq1": 0,
                                            "ts_varianceq2": 0,
                                            "ts_varianceq3": 0,
                                            "ts_varianceq4": 0,
                                        };
                                        Xrm.WebApi.createRecord("ts_teamplanninginspectorhours", data);
                                    }
                                })];
                        case 1:
                            _a.sent();
                            fetchXml = [
                                "<fetch>",
                                "  <entity name='ts_operationactivity'>",
                                "    <attribute name='ts_stakeholder'/>",
                                "    <attribute name='ts_operation'/>",
                                "    <attribute name='ts_activity'/>",
                                "    <attribute name='ts_operationtype'/>",
                                "    <attribute name='ts_site'/>",
                                "    <attribute name='ts_operationalstatus'/>",
                                "    <attribute name='ts_operationactivityid'/>",
                                "    <filter>",
                                "      <condition attribute='statecode' operator='eq' value='0'/>",
                                "    </filter>",
                                "    <link-entity name='ovs_operation' from='ovs_operationid' to='ts_operation'>",
                                "      <attribute name='ovs_name'/>",
                                "      <filter>",
                                "        <condition attribute='ts_opiteam' operator='eq' value='", teamId, "'/>",
                                "      </filter>",
                                "    </link-entity>",
                                "    <link-entity name='msdyn_incidenttype' from='msdyn_incidenttypeid' to='ts_activity'>",
                                "      <attribute name='ovs_incidenttypenameenglish'/>",
                                "      <attribute name='ovs_incidenttypenamefrench'/>",
                                "      <attribute name='ts_riskscore'/>",
                                "      <attribute name='msdyn_estimatedduration'/>",
                                "      <filter>",
                                "        <condition attribute='ts_includeinplanning' operator='eq' value='1'/>",
                                "      </filter>",
                                "      <link-entity name='ts_recurrencefrequencies' from='ts_recurrencefrequenciesid' to='ts_riskscore'>",
                                "        <attribute name='ts_class1interval'/>",
                                "        <attribute name='ts_class2and3lowriskinterval'/>",
                                "        <attribute name='ts_class2and3highriskinterval'/>",
                                "      </link-entity>",
                                "    </link-entity>",
                                "    <link-entity name='msdyn_functionallocation' from='msdyn_functionallocationid' to='ts_site'>",
                                "      <attribute name='ts_class'/>",
                                "      <attribute name='ts_riskscore'/>",
                                "      <attribute name='ts_lpdtounitedstates'/>",
                                "    </link-entity>",
                                "  </entity>",
                                "</fetch>"
                            ].join("");
                            fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
                            return [4 /*yield*/, Xrm.WebApi.retrieveMultipleRecords("ts_operationactivity", fetchXml).then(function success(result) {
                                    return __awaiter(this, void 0, void 0, function () {
                                        var _i, _a, operationActivity, generationLog, isMissingData, planningDataName, planningDataEnglishName, planningDataFrenchName, planningDataStakeholderId, planningDataOperationTypeId, planningDataSiteId, planningDataActivityTypeId, planningDataOperationId, planningDataTarget, planningDataEstimatedDuration, planningDataQuarters, estimatedDurationFetchXml, teamActivityTypeEstimatedDuration, interval, i, data;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    _i = 0, _a = result.entities;
                                                    _b.label = 1;
                                                case 1:
                                                    if (!(_i < _a.length)) return [3 /*break*/, 4];
                                                    operationActivity = _a[_i];
                                                    generationLog = "";
                                                    isMissingData = false;
                                                    planningDataName = "";
                                                    planningDataEnglishName = "";
                                                    planningDataFrenchName = "";
                                                    planningDataStakeholderId = "";
                                                    planningDataOperationTypeId = "";
                                                    planningDataSiteId = "";
                                                    planningDataActivityTypeId = "";
                                                    planningDataOperationId = "";
                                                    planningDataTarget = 0;
                                                    planningDataEstimatedDuration = 0;
                                                    planningDataQuarters = [0, 0, 0, 0];
                                                    //Check if anything is missing from the FetchXML. Log it in the generationLog. Flag that there's missing data.
                                                    if (operationActivity["_ts_stakeholder_value"] == null) {
                                                        generationLog += "Missing Stakeholder \n";
                                                        isMissingData = true;
                                                    }
                                                    if (operationActivity["_ts_operationtype_value"] == null) {
                                                        generationLog += "Missing Operation Type\n";
                                                        isMissingData = true;
                                                    }
                                                    if (operationActivity["_ts_site_value"] == null) {
                                                        generationLog += "Missin Site \n";
                                                        isMissingData = true;
                                                    }
                                                    if (operationActivity["_ts_activity_value"] == null) {
                                                        generationLog += "Missing Activity Type\n";
                                                        isMissingData = true;
                                                    }
                                                    if (operationActivity["ovs_operation1.ovs_name"] == null) {
                                                        generationLog += "Operation missing Name\n";
                                                        isMissingData = true;
                                                    }
                                                    if (operationActivity["msdyn_incidenttype2.ovs_incidenttypenameenglish"] == null) {
                                                        generationLog += "Incident Type missing english name\n";
                                                        isMissingData = true;
                                                    }
                                                    if (operationActivity["msdyn_incidenttype2.ovs_incidenttypenamefrench"] == null) {
                                                        generationLog += "Incident Type missing french name\n";
                                                        isMissingData = true;
                                                    }
                                                    if (operationActivity["msdyn_functionallocation4.ts_class"] == null) {
                                                        generationLog += "Missing Class on Site\n";
                                                        isMissingData = true;
                                                    }
                                                    if (operationActivity['ts_recurrencefrequencies3.ts_class2and3highriskinterval'] == null) {
                                                        generationLog += "Incident Type missing Recurrence Frequency\n";
                                                        isMissingData = true;
                                                    }
                                                    if (operationActivity['ts_recurrencefrequencies3.ts_class2and3lowriskinterval'] == null) {
                                                        generationLog += "Incident Type missing Recurrence Frequency\n";
                                                        isMissingData = true;
                                                    }
                                                    if (operationActivity['ts_recurrencefrequencies3.ts_class1interval'] == null) {
                                                        generationLog += "Incident Type missing Recurrence Frequency\n";
                                                        isMissingData = true;
                                                    }
                                                    planningDataStakeholderId = operationActivity["_ts_stakeholder_value"];
                                                    planningDataOperationTypeId = operationActivity["_ts_operationtype_value"];
                                                    planningDataSiteId = operationActivity["_ts_site_value"];
                                                    planningDataActivityTypeId = operationActivity["_ts_activity_value"];
                                                    planningDataOperationId = operationActivity["_ts_operation_value"];
                                                    planningDataEnglishName = operationActivity["ovs_operation1.ovs_name"] + " | " + operationActivity["msdyn_incidenttype2.ovs_incidenttypenameenglish"] + " | " + planningDataFiscalYearName;
                                                    planningDataFrenchName = operationActivity["ovs_operation1.ovs_name"] + " | " + operationActivity["msdyn_incidenttype2.ovs_incidenttypenamefrench"] + " | " + planningDataFiscalYearName;
                                                    planningDataName = planningDataEnglishName + "::" + planningDataFrenchName;
                                                    estimatedDurationFetchXml = [
                                                        "<fetch>",
                                                        "  <entity name='ts_teamactivitytypeestimatedduration'>",
                                                        "    <attribute name='ts_estimatedduration'/>",
                                                        "    <filter>",
                                                        "      <condition attribute='ts_team' operator='eq' value='", teamId, "'/>",
                                                        "      <condition attribute='ts_activitytype' operator='eq' value='", planningDataActivityTypeId, "'/>",
                                                        "    </filter>",
                                                        "  </entity>",
                                                        "</fetch>"
                                                    ].join("");
                                                    estimatedDurationFetchXml = "?fetchXml=" + encodeURIComponent(estimatedDurationFetchXml);
                                                    return [4 /*yield*/, Xrm.WebApi.retrieveMultipleRecords("ts_teamactivitytypeestimatedduration", estimatedDurationFetchXml).then(function (result) { return result.entities[0]; })];
                                                case 2:
                                                    teamActivityTypeEstimatedDuration = _b.sent();
                                                    if (teamActivityTypeEstimatedDuration != null && teamActivityTypeEstimatedDuration.ts_estimatedduration != null) {
                                                        planningDataEstimatedDuration = teamActivityTypeEstimatedDuration.ts_estimatedduration / 60;
                                                    }
                                                    else if (operationActivity["msdyn_incidenttype2.msdyn_estimatedduration"] != null) {
                                                        planningDataEstimatedDuration = operationActivity["msdyn_incidenttype2.msdyn_estimatedduration"] / 60;
                                                        generationLog += "Missing Team Estimated Duration for this Team and Activity Type. Using Activity Type Estimated Duration. \n";
                                                    }
                                                    else {
                                                        generationLog += "The Incident Type does not have an Estimated Duration. \n";
                                                        isMissingData = true;
                                                    }
                                                    interval = 0;
                                                    if (operationActivity["msdyn_functionallocation4.ts_class"] == 717750001) {
                                                        interval = operationActivity['ts_recurrencefrequencies3.ts_class1interval'];
                                                    }
                                                    else //Class 2 or 3
                                                     {
                                                        if (operationActivity["msdyn_functionallocation4.ts_riskscore"] == null) {
                                                            generationLog += "Missing Risk Score on Site\n";
                                                            isMissingData = true;
                                                        }
                                                        if (operationActivity["msdyn_functionallocation4.ts_riskscore"] > 5 || operationActivity["msdyn_functionallocation4.ts_lpdtounitedstates"] == true) {
                                                            interval = operationActivity['ts_recurrencefrequencies3.ts_class2and3highriskinterval'];
                                                        }
                                                        else {
                                                            interval = operationActivity['ts_recurrencefrequencies3.ts_class2and3lowriskinterval'];
                                                        }
                                                    }
                                                    if (interval > 0) {
                                                        for (i = 0; i < 4; i += interval) {
                                                            planningDataQuarters[i]++;
                                                            planningDataTarget++;
                                                        }
                                                        if (operationActivity.ts_operationalstatus == 717750000) { //Operational
                                                            teamPlanningDataTeamEstimatedDurationQ1 += planningDataQuarters[0] * planningDataEstimatedDuration;
                                                            teamPlanningDataTeamEstimatedDurationQ2 += planningDataQuarters[1] * planningDataEstimatedDuration;
                                                            teamPlanningDataTeamEstimatedDurationQ3 += planningDataQuarters[2] * planningDataEstimatedDuration;
                                                            teamPlanningDataTeamEstimatedDurationQ4 += planningDataQuarters[3] * planningDataEstimatedDuration;
                                                            teamPlanningDataPlannedQ1 += planningDataQuarters[0];
                                                            teamPlanningDataPlannedQ2 += planningDataQuarters[1];
                                                            teamPlanningDataPlannedQ3 += planningDataQuarters[2];
                                                            teamPlanningDataPlannedQ4 += planningDataQuarters[3];
                                                        }
                                                    }
                                                    data = {
                                                        "ts_name": planningDataName,
                                                        "ts_englishname": planningDataEnglishName,
                                                        "ts_frenchname": planningDataFrenchName,
                                                        "ts_OperationActivity@odata.bind": "/ts_operationactivities(" + operationActivity.ts_operationactivityid + ")",
                                                        "ts_FiscalYear@odata.bind": "/tc_tcfiscalyears(" + planningDataFiscalYearId + ")",
                                                        "ts_TeamPlanningData@odata.bind": "/ts_teamplanningdatas(" + teamPlanningDataId + ")",
                                                        "ts_Stakeholder@odata.bind": "/accounts(" + planningDataStakeholderId + ")",
                                                        "ts_OperationType@odata.bind": "/ovs_operationtypes(" + planningDataOperationTypeId + ")",
                                                        "ts_Site@odata.bind": "/msdyn_functionallocations(" + planningDataSiteId + ")",
                                                        "ts_ActivityType@odata.bind": "/msdyn_incidenttypes(" + planningDataActivityTypeId + ")",
                                                        "ts_Operation@odata.bind": "/ovs_operations(" + planningDataOperationId + ")",
                                                        "ts_target": planningDataTarget,
                                                        "ts_varianceuncalculated": 0,
                                                        "ts_plannedwouncalculated": planningDataTarget,
                                                        "ts_teamestimatedduration": planningDataEstimatedDuration,
                                                        "ts_originalteamestimatedduration": planningDataEstimatedDuration,
                                                        "ts_dueq1": planningDataQuarters[0],
                                                        "ts_dueq2": planningDataQuarters[1],
                                                        "ts_dueq3": planningDataQuarters[2],
                                                        "ts_dueq4": planningDataQuarters[3],
                                                        "ts_plannedq1": planningDataQuarters[0],
                                                        "ts_plannedq2": planningDataQuarters[1],
                                                        "ts_plannedq3": planningDataQuarters[2],
                                                        "ts_plannedq4": planningDataQuarters[3],
                                                        "ts_generationlog": generationLog
                                                    };
                                                    Xrm.WebApi.createRecord("ts_planningdata", data).then(function success(result) {
                                                    }, function (error) {
                                                        console.log(error.message);
                                                    });
                                                    _b.label = 3;
                                                case 3:
                                                    _i++;
                                                    return [3 /*break*/, 1];
                                                case 4: return [2 /*return*/];
                                            }
                                        });
                                    });
                                })];
                        case 2:
                            _a.sent();
                            teamPlanningDataResidualinspectorhoursQ1 = teamPlanningDataAvailableInspectorHoursQ1 - teamPlanningDataTeamEstimatedDurationQ1;
                            teamPlanningDataResidualinspectorhoursQ2 = teamPlanningDataAvailableInspectorHoursQ2 - teamPlanningDataTeamEstimatedDurationQ2;
                            teamPlanningDataResidualinspectorhoursQ3 = teamPlanningDataAvailableInspectorHoursQ3 - teamPlanningDataTeamEstimatedDurationQ3;
                            teamPlanningDataResidualinspectorhoursQ4 = teamPlanningDataAvailableInspectorHoursQ4 - teamPlanningDataTeamEstimatedDurationQ4;
                            teamPlanningDataPlannedTotal = teamPlanningDataPlannedQ1 + teamPlanningDataPlannedQ2 + teamPlanningDataPlannedQ3 + teamPlanningDataPlannedQ4;
                            teamPlanningDataAvailableInspectorHoursTotal = teamPlanningDataAvailableInspectorHoursQ1 + teamPlanningDataAvailableInspectorHoursQ2 + teamPlanningDataAvailableInspectorHoursQ3 + teamPlanningDataAvailableInspectorHoursQ4;
                            teamPlanningDataTeamEstimatedDurationTotal = teamPlanningDataTeamEstimatedDurationQ1 + teamPlanningDataTeamEstimatedDurationQ2 + teamPlanningDataTeamEstimatedDurationQ3 + teamPlanningDataTeamEstimatedDurationQ4;
                            teamPlanningDataResidualinspectorhoursTotal = teamPlanningDataAvailableInspectorHoursTotal - teamPlanningDataTeamEstimatedDurationTotal;
                            formContext.getAttribute("ts_name").setValue(teamName + " | " + planningDataFiscalYearName);
                            formContext.getAttribute("ts_plannedactivityq1").setValue(teamPlanningDataPlannedQ1);
                            formContext.getAttribute("ts_plannedactivityq2").setValue(teamPlanningDataPlannedQ2);
                            formContext.getAttribute("ts_plannedactivityq3").setValue(teamPlanningDataPlannedQ3);
                            formContext.getAttribute("ts_plannedactivityq4").setValue(teamPlanningDataPlannedQ4);
                            formContext.getAttribute("ts_plannedactivityfiscalyear").setValue(teamPlanningDataPlannedTotal);
                            formContext.getAttribute("ts_availablehoursq1").setValue(teamPlanningDataAvailableInspectorHoursQ1);
                            formContext.getAttribute("ts_availablehoursq2").setValue(teamPlanningDataAvailableInspectorHoursQ2);
                            formContext.getAttribute("ts_availablehoursq3").setValue(teamPlanningDataAvailableInspectorHoursQ3);
                            formContext.getAttribute("ts_availablehoursq4").setValue(teamPlanningDataAvailableInspectorHoursQ4);
                            formContext.getAttribute("ts_availableinspectorhoursfiscalyear").setValue(teamPlanningDataAvailableInspectorHoursTotal);
                            formContext.getAttribute("ts_teamestimateddurationq1").setValue(teamPlanningDataTeamEstimatedDurationQ1);
                            formContext.getAttribute("ts_teamestimateddurationq2").setValue(teamPlanningDataTeamEstimatedDurationQ2);
                            formContext.getAttribute("ts_teamestimateddurationq3").setValue(teamPlanningDataTeamEstimatedDurationQ3);
                            formContext.getAttribute("ts_teamestimateddurationq4").setValue(teamPlanningDataTeamEstimatedDurationQ4);
                            formContext.getAttribute("ts_teamestimateddurationfiscalyear").setValue(teamPlanningDataTeamEstimatedDurationTotal);
                            formContext.getAttribute("ts_residualinspectorhoursq1").setValue(teamPlanningDataResidualinspectorhoursQ1);
                            formContext.getAttribute("ts_residualinspectorhoursq2").setValue(teamPlanningDataResidualinspectorhoursQ2);
                            formContext.getAttribute("ts_residualinspectorhoursq3").setValue(teamPlanningDataResidualinspectorhoursQ3);
                            formContext.getAttribute("ts_residualinspectorhoursq4").setValue(teamPlanningDataResidualinspectorhoursQ4);
                            formContext.getAttribute("ts_residualinspectorhoursfiscalyear").setValue(teamPlanningDataResidualinspectorhoursTotal);
                            formContext.data.entity.save();
                            Xrm.Utility.closeProgressIndicator();
                            return [2 /*return*/];
                    }
                });
            });
        }
        function setTotalInspectorHoursFiscalYear(formContext) {
            var teamPlanningDataTotalHoursQ1 = formContext.getAttribute("ts_totalhoursq1").getValue();
            var teamPlanningDataTotalHoursQ2 = formContext.getAttribute("ts_totalhoursq2").getValue();
            var teamPlanningDataTotalHoursQ3 = formContext.getAttribute("ts_totalhoursq3").getValue();
            var teamPlanningDataTotalHoursQ4 = formContext.getAttribute("ts_totalhoursq4").getValue();
            if (teamPlanningDataTotalHoursQ1 != null && teamPlanningDataTotalHoursQ2 != null && teamPlanningDataTotalHoursQ3 != null && teamPlanningDataTotalHoursQ4 != null) {
                formContext.getAttribute("ts_totalhoursfiscalyear").setValue(teamPlanningDataTotalHoursQ1 + teamPlanningDataTotalHoursQ2 + teamPlanningDataTotalHoursQ3 + teamPlanningDataTotalHoursQ4);
            }
        }
        TeamPlanningData.setTotalInspectorHoursFiscalYear = setTotalInspectorHoursFiscalYear;
        function inspectorHoursQ1OnChange(eContext) {
            var formContext = eContext.getFormContext();
            var teamPlanningDataTotalHoursQ1 = formContext.getAttribute("ts_totalhoursq1").getValue();
            if (teamPlanningDataTotalHoursQ1 == null) {
                formContext.getAttribute("ts_totalhoursq1").setValue(0);
            }
            setTotalInspectorHoursFiscalYear(formContext);
        }
        TeamPlanningData.inspectorHoursQ1OnChange = inspectorHoursQ1OnChange;
        function inspectorHoursQ2OnChange(eContext) {
            var formContext = eContext.getFormContext();
            var teamPlanningDataTotalHoursQ2 = formContext.getAttribute("ts_totalhoursq2").getValue();
            if (teamPlanningDataTotalHoursQ2 == null) {
                formContext.getAttribute("ts_totalhoursq2").setValue(0);
            }
            setTotalInspectorHoursFiscalYear(formContext);
        }
        TeamPlanningData.inspectorHoursQ2OnChange = inspectorHoursQ2OnChange;
        function inspectorHoursQ3OnChange(eContext) {
            var formContext = eContext.getFormContext();
            var teamPlanningDataTotalHoursQ3 = formContext.getAttribute("ts_totalhoursq3").getValue();
            if (teamPlanningDataTotalHoursQ3 == null) {
                formContext.getAttribute("ts_totalhoursq3").setValue(0);
            }
            setTotalInspectorHoursFiscalYear(formContext);
        }
        TeamPlanningData.inspectorHoursQ3OnChange = inspectorHoursQ3OnChange;
        function inspectorHoursQ4OnChange(eContext) {
            var formContext = eContext.getFormContext();
            var teamPlanningDataTotalHoursQ4 = formContext.getAttribute("ts_totalhoursq4").getValue();
            if (teamPlanningDataTotalHoursQ4 == null) {
                formContext.getAttribute("ts_totalhoursq4").setValue(0);
            }
            setTotalInspectorHoursFiscalYear(formContext);
        }
        TeamPlanningData.inspectorHoursQ4OnChange = inspectorHoursQ4OnChange;
        function fiscalYearInspectorHoursOnChange(eContext) {
            var formContext = eContext.getFormContext();
            var teamPlanningDataTotalHoursFiscalYear = formContext.getAttribute("ts_totalhoursfiscalyear").getValue();
            if (teamPlanningDataTotalHoursFiscalYear == null) {
                formContext.getAttribute("ts_totalhoursfiscalyear").setValue(0);
                formContext.getAttribute("ts_totalhoursq1").setValue(0);
                formContext.getAttribute("ts_totalhoursq2").setValue(0);
                formContext.getAttribute("ts_totalhoursq3").setValue(0);
                formContext.getAttribute("ts_totalhoursq4").setValue(0);
            }
            else {
                var quarterTotal = teamPlanningDataTotalHoursFiscalYear / 4;
                formContext.getAttribute("ts_totalhoursq1").setValue(quarterTotal);
                formContext.getAttribute("ts_totalhoursq2").setValue(quarterTotal);
                formContext.getAttribute("ts_totalhoursq3").setValue(quarterTotal);
                formContext.getAttribute("ts_totalhoursq4").setValue(quarterTotal);
            }
        }
        TeamPlanningData.fiscalYearInspectorHoursOnChange = fiscalYearInspectorHoursOnChange;
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
        TeamPlanningData.userHasRole = userHasRole;
        function planStatusOnChange(eContext) {
            var formContext = eContext.getFormContext();
            var planStatusValue = formContext.getAttribute("ts_planstatus").getValue();
            if (planStatusValue == 741130001 /* Complete */ || planStatusValue == 447390001 /* HQreview */) {
                formContext.getControl("ts_totalhoursq1").setDisabled(true);
                formContext.getControl("ts_totalhoursq2").setDisabled(true);
                formContext.getControl("ts_totalhoursq3").setDisabled(true);
                formContext.getControl("ts_totalhoursq4").setDisabled(true);
                formContext.getControl("ts_totalhoursq4").setDisabled(true);
                formContext.getControl("ts_totalhoursfiscalyear").setDisabled(true);
                formContext.getControl("header_ts_name").setDisabled(true);
                formContext.getControl("header_ownerid").setDisabled(true);
                if (userHasRole("System Administrator|ROM - Business Admin")) {
                    formContext.getControl("ts_planstatus").setDisabled(false);
                }
                else {
                    formContext.getControl("ts_planstatus").setDisabled(true);
                }
            }
            else {
                formContext.getControl("ts_totalhoursq1").setDisabled(false);
                formContext.getControl("ts_totalhoursq2").setDisabled(false);
                formContext.getControl("ts_totalhoursq3").setDisabled(false);
                formContext.getControl("ts_totalhoursq4").setDisabled(false);
                formContext.getControl("ts_totalhoursfiscalyear").setDisabled(false);
                formContext.getControl("header_ts_name").setDisabled(false);
                formContext.getControl("header_ownerid").setDisabled(false);
                formContext.getControl("ts_planstatus").setDisabled(false);
            }
            formContext.ui.refreshRibbon();
            formContext.data.entity.save();
        }
        TeamPlanningData.planStatusOnChange = planStatusOnChange;
    })(TeamPlanningData = ROM.TeamPlanningData || (ROM.TeamPlanningData = {}));
})(ROM || (ROM = {}));
