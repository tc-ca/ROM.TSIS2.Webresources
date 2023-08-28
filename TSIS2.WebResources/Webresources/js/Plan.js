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
        function generateSuggestedInspections(eContext) {
            return __awaiter(this, void 0, void 0, function () {
                var formContext, planId, teamValue, teamId, teamName, planFiscalYearValue, planFiscalYearName, planFiscalYearId, issoActivitiesFetchXml, issoActivities, _i, issoActivities_1, activity, data, inspectorHoursfetchXml, teamInspectorHours, _a, teamInspectorHours_1, inspectorHours, data;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            formContext = eContext.getFormContext();
                            Xrm.Utility.showProgressIndicator("Please wait while the Suggested Inspection records are being created.");
                            formContext.data.entity.removeOnPostSave(generateSuggestedInspections);
                            planId = formContext.data.entity.getId().slice(1, -1);
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
                            if (!(teamId != null && planFiscalYearId != null)) return [3 /*break*/, 3];
                            formContext.getAttribute("ts_name").setValue("".concat(teamName, " ").concat(planFiscalYearName));
                            issoActivitiesFetchXml = [
                                "<fetch top='20'>",
                                "  <entity name='msdyn_incidenttype'>",
                                "    <attribute name='msdyn_incidenttypeid'/>",
                                "    <attribute name='msdyn_name'/>",
                                "    <link-entity name='ts_ovs_operationtypes_msdyn_incidenttypes' from='msdyn_incidenttypeid' to='msdyn_incidenttypeid' intersect='true'>",
                                "      <link-entity name='ovs_operationtype' from='ovs_operationtypeid' to='ovs_operationtypeid' intersect='true'>",
                                "        <link-entity name='ovs_operation' from='ovs_operationtypeid' to='ovs_operationtypeid' alias='operation'>",
                                "          <attribute name='ovs_operationtypeid'/>",
                                "          <attribute name='ts_site'/>",
                                "          <attribute name='ts_stakeholder'/>",
                                "          <attribute name='ovs_operationid'/>",
                                "          <attribute name='ts_risk'/>",
                                "          <attribute name='ts_operationnameenglish'/>",
                                "          <attribute name='ts_operationnamefrench'/>",
                                "          <filter>",
                                "            <condition attribute='owningbusinessunit' operator='eq' value='4ff4b827-bead-eb11-8236-000d3ae8b866' uitype='businessunit'/>",
                                "          </filter>",
                                "          <filter type='and'>",
                                "            <condition attribute='ts_stakeholder' operator='not-null'/>",
                                "            <condition attribute='ovs_operationtypeid' operator='not-null'/>",
                                "            <condition attribute='ts_site' operator='not-null'/>",
                                "            <condition attribute='ts_risk' operator='not-null'/>",
                                "          </filter>",
                                "        </link-entity>",
                                "      </link-entity>",
                                "    </link-entity>",
                                "  </entity>",
                                "</fetch>"
                            ].join("");
                            issoActivitiesFetchXml = "?fetchXml=" + encodeURIComponent(issoActivitiesFetchXml);
                            return [4 /*yield*/, Xrm.WebApi.retrieveMultipleRecords("msdyn_incidenttype", issoActivitiesFetchXml).then(function success(result) {
                                    return result.entities;
                                })];
                        case 1:
                            issoActivities = _b.sent();
                            //Create a suggested inspection for each operation
                            for (_i = 0, issoActivities_1 = issoActivities; _i < issoActivities_1.length; _i++) {
                                activity = issoActivities_1[_i];
                                data = {
                                    "ts_name": "".concat(activity["operation.ts_operationnameenglish"], " | ").concat(activity.msdyn_name, " | ").concat(planFiscalYearName),
                                    "ts_plan@odata.bind": "/ts_plans(" + planId + ")",
                                    "ts_stakeholder@odata.bind": "/accounts(" + activity["operation.ts_stakeholder"] + ")",
                                    "ts_operationtype@odata.bind": "/ovs_operationtypes(" + activity["operation.ovs_operationtypeid"] + ")",
                                    "ts_site@odata.bind": "/msdyn_functionallocations(" + activity["operation.ts_site"] + ")",
                                    "ts_activitytype@odata.bind": "/msdyn_incidenttypes(" + activity.msdyn_incidenttypeid + ")",
                                    "ts_operation@odata.bind": "/ovs_operations(" + activity["operation.ovs_operationid"] + ")",
                                    "ts_riskthreshold@odata.bind": "/ts_riskcategories(" + activity["operation.ts_risk"] + ")",
                                    "ts_q1": 1,
                                    "ts_q2": 0,
                                    "ts_q3": 0,
                                    "ts_q4": 0,
                                };
                                Xrm.WebApi.createRecord("ts_suggestedinspection", data).then(function success(result) {
                                }, function (error) {
                                    console.log(error.message);
                                });
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
                        case 2:
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
                            _b.label = 3;
                        case 3:
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
    })(Plan = ROM.Plan || (ROM.Plan = {}));
})(ROM || (ROM = {}));
