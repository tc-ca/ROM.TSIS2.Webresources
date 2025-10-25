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
/* eslint-disable @typescript-eslint/triple-slash-reference */
var ROM;
(function (ROM) {
    var IncidentQuickCreate;
    (function (IncidentQuickCreate) {
        // EVENTS
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            switch (form.ui.getFormType()) {
                //Create
                case 1:
                    setRegion(eContext);
                    form.getAttribute('ownerid').setValue();
                    var userId = Xrm.Utility.getGlobalContext().userSettings.userId;
                    var currentUserBusinessUnitFetchXML = [
                        "<fetch>",
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
                    Xrm.WebApi.retrieveMultipleRecords("businessunit", currentUserBusinessUnitFetchXML).then(function (businessunit) {
                        return __awaiter(this, void 0, void 0, function () {
                            var userBuId, isAvSec, isISSO, _a, teamSchemaName, teamId, teamRec, team;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!businessunit.entities.length || !businessunit.entities[0].businessunitid)
                                            return [2 /*return*/];
                                        userBuId = businessunit.entities[0].businessunitid;
                                        return [4 /*yield*/, isAvSecBU(userBuId)];
                                    case 1:
                                        isAvSec = _b.sent();
                                        if (!!isAvSec) return [3 /*break*/, 3];
                                        return [4 /*yield*/, isISSOBU(userBuId)];
                                    case 2:
                                        _a = _b.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        _a = false;
                                        _b.label = 4;
                                    case 4:
                                        isISSO = _a;
                                        if (isAvSec) {
                                            teamSchemaName = TEAM_SCHEMA_NAMES.AVIATION_SECURITY_DOMESTIC;
                                        }
                                        else if (isISSO) {
                                            teamSchemaName = TEAM_SCHEMA_NAMES.ISSO_TEAM;
                                        }
                                        if (!teamSchemaName) return [3 /*break*/, 7];
                                        return [4 /*yield*/, getEnvironmentVariableValue(teamSchemaName)];
                                    case 5:
                                        teamId = _b.sent();
                                        if (!teamId) return [3 /*break*/, 7];
                                        return [4 /*yield*/, Xrm.WebApi.retrieveRecord("team", teamId, "?$select=name")];
                                    case 6:
                                        teamRec = _b.sent();
                                        if (!teamRec)
                                            return [2 /*return*/];
                                        team = {
                                            id: teamId,
                                            name: teamRec.name || "",
                                            entityType: "team"
                                        };
                                        form.getAttribute("ownerid").setValue([team]);
                                        _b.label = 7;
                                    case 7: return [2 /*return*/];
                                }
                            });
                        });
                    });
                    break;
            }
        }
        IncidentQuickCreate.onLoad = onLoad;
        function regionOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var regionAttribute = form.getAttribute("ovs_region");
                if (regionAttribute != null && regionAttribute != undefined) {
                    var regionAttributeValue = regionAttribute.getValue();
                    if (regionAttributeValue != null && regionAttributeValue != undefined) {
                        if (regionAttributeValue[0].id == "{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}") { //International
                            form.getControl("ts_country").setVisible(true);
                        }
                    }
                    else {
                        form.getControl("ts_country").setVisible(false);
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        IncidentQuickCreate.regionOnChange = regionOnChange;
        // FUNCTIONS
        function setRegion(eContext) {
            var currentUserId = Xrm.Utility.getGlobalContext().userSettings.userId;
            currentUserId = currentUserId.replace(/[{}]/g, "");
            // Get the user's territory
            Xrm.WebApi.online.retrieveRecord("systemuser", currentUserId, "?$select=_territoryid_value").then(function success(result) {
                var form = eContext.getFormContext();
                if (result != null && result["_territoryid_value"] != null) {
                    // NOTE: Our localization plugin can't localize the territory name on system user
                    // So we do an extra call to the territory table to get the localized name
                    Xrm.WebApi.online.retrieveRecord("territory", result["_territoryid_value"], "?$select=name").then(function success(result) {
                        var territoryId = result["territoryid"];
                        var territoryName = result["name"];
                        var territoryLogicalName = "territory";
                        var lookup = new Array();
                        lookup[0] = new Object();
                        lookup[0].id = territoryId;
                        lookup[0].name = territoryName;
                        lookup[0].entityType = territoryLogicalName;
                        form.getAttribute('ovs_region').setValue(lookup);
                        if (lookup[0].id == "{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}") { //International
                            form.getControl("ts_country").setVisible(true);
                        }
                        else {
                            regionOnChange(eContext);
                        }
                    }, function (error) {
                        var alertStrings = { text: error.message };
                        var alertOptions = { height: 120, width: 260 };
                        Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function () { });
                    });
                }
            }, function (error) {
                var alertStrings = { text: error.message };
                var alertOptions = { height: 120, width: 260 };
                Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function () { });
            });
        }
    })(IncidentQuickCreate = ROM.IncidentQuickCreate || (ROM.IncidentQuickCreate = {}));
})(ROM || (ROM = {}));
