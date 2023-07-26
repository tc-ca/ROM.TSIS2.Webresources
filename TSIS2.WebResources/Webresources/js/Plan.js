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
                var formContext, planId, teamValue, teamId, teamName, planningDataFiscalYearValue, planningDataFiscalYearName, planningDataFiscalYearId, inspectorHoursfetchXml, teamInspectorHours, _i, teamInspectorHours_1, inspectorHours, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            formContext = eContext.getFormContext();
                            formContext.data.entity.removeOnPostSave(generateSuggestedInspections);
                            planId = formContext.data.entity.getId().slice(1, -1);
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
                            if (!(teamId != null && planningDataFiscalYearId != null)) return [3 /*break*/, 2];
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
                        case 1:
                            teamInspectorHours = _a.sent();
                            if (teamInspectorHours != null && teamInspectorHours.length > 0) {
                                //For each inspector, create an Plan Inspector Hours record
                                for (_i = 0, teamInspectorHours_1 = teamInspectorHours; _i < teamInspectorHours_1.length; _i++) {
                                    inspectorHours = teamInspectorHours_1[_i];
                                    data = {
                                        "ts_name": inspectorHours["user.fullname"] + " | " + teamName + " | " + planningDataFiscalYearName,
                                        "ts_inspectorhours@odata.bind": "/ts_inspectorhours(" + inspectorHours.ts_inspectionhoursid + ")",
                                        "ts_plan@odata.bind": "/ts_plans(" + planId + ")",
                                        "ts_totalhoursq1": inspectorHours.ts_totalhoursq1,
                                        "ts_totalhoursq2": inspectorHours.ts_totalhoursq2,
                                        "ts_totalhoursq3": inspectorHours.ts_totalhoursq3,
                                        "ts_totalhoursq4": inspectorHours.ts_totalhoursq4,
                                        "ts_remaininghoursq1": 0,
                                        "ts_remaininghoursq2": 0,
                                        "ts_remaininghoursq3": 0,
                                        "ts_remaininghoursq4": 0
                                    };
                                    Xrm.WebApi.createRecord("ts_planinspectorhours", data);
                                }
                            }
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        }
        function recalculate() {
        }
    })(Plan = ROM.Plan || (ROM.Plan = {}));
})(ROM || (ROM = {}));
