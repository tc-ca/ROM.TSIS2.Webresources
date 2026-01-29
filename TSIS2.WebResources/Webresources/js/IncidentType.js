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
    var IncidentType;
    (function (IncidentType) {
        function onLoad(eContext) {
            return __awaiter(this, void 0, void 0, function () {
                var form, formType, userId, currentUserBusinessUnitFetchXML, ownerAttribute, ownerAttributeValue, isAvSecOwner, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            form = eContext.getFormContext();
                            formType = form.ui.getFormType();
                            //If creating a record
                            if (formType == 1) {
                                form.getAttribute('ownerid').setValue();
                                userId = Xrm.Utility.getGlobalContext().userSettings.userId;
                                currentUserBusinessUnitFetchXML = [
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
                                        var userBuId, isTC, isAvSec, isISSO, _a, isRailSafety, _b, teamSchemaName, isRailSafetyTeam, teamId, teamRec, team, error_2;
                                        return __generator(this, function (_c) {
                                            switch (_c.label) {
                                                case 0:
                                                    if (!businessunit.entities.length || !businessunit.entities[0].businessunitid)
                                                        return [2 /*return*/];
                                                    userBuId = businessunit.entities[0].businessunitid;
                                                    return [4 /*yield*/, isTCBU(userBuId)];
                                                case 1:
                                                    isTC = _c.sent();
                                                    if (isTC)
                                                        return [2 /*return*/];
                                                    return [4 /*yield*/, isAvSecBU(userBuId)];
                                                case 2:
                                                    isAvSec = _c.sent();
                                                    if (!!isAvSec) return [3 /*break*/, 4];
                                                    return [4 /*yield*/, isISSOBU(userBuId)];
                                                case 3:
                                                    _a = _c.sent();
                                                    return [3 /*break*/, 5];
                                                case 4:
                                                    _a = false;
                                                    _c.label = 5;
                                                case 5:
                                                    isISSO = _a;
                                                    if (!(!isAvSec && !isISSO)) return [3 /*break*/, 7];
                                                    return [4 /*yield*/, isRailSafetyBU(userBuId)];
                                                case 6:
                                                    _b = _c.sent();
                                                    return [3 /*break*/, 8];
                                                case 7:
                                                    _b = false;
                                                    _c.label = 8;
                                                case 8:
                                                    isRailSafety = _b;
                                                    isRailSafetyTeam = false;
                                                    if (isAvSec) {
                                                        teamSchemaName = TEAM_SCHEMA_NAMES.AVIATION_SECURITY_DOMESTIC;
                                                    }
                                                    else if (isISSO) {
                                                        teamSchemaName = TEAM_SCHEMA_NAMES.ISSO_TEAM;
                                                    }
                                                    else if (isRailSafety) {
                                                        teamSchemaName = TEAM_SCHEMA_NAMES.RAIL_SAFETY;
                                                        isRailSafetyTeam = true;
                                                    }
                                                    if (!teamSchemaName) return [3 /*break*/, 13];
                                                    return [4 /*yield*/, getEnvironmentVariableValue(teamSchemaName)];
                                                case 9:
                                                    teamId = _c.sent();
                                                    if (!teamId) return [3 /*break*/, 13];
                                                    _c.label = 10;
                                                case 10:
                                                    _c.trys.push([10, 12, , 13]);
                                                    return [4 /*yield*/, Xrm.WebApi.retrieveRecord("team", teamId, "?$select=name")];
                                                case 11:
                                                    teamRec = _c.sent();
                                                    if (!teamRec || !teamRec.name) {
                                                        console.warn("[IncidentType.onLoad] Team record not found or missing name:", teamId);
                                                        return [2 /*return*/];
                                                    }
                                                    team = {
                                                        id: teamId,
                                                        name: teamRec.name,
                                                        entityType: "team"
                                                    };
                                                    form.getAttribute('ownerid').setValue([team]);
                                                    // Hide owner field if Rail Safety team was assigned
                                                    if (isRailSafetyTeam) {
                                                        form.getControl("ownerid").setVisible(false);
                                                    }
                                                    // Check owner status after setting it (only for AvSec)
                                                    if (isAvSec) {
                                                        isOwnedByAvSec([team]).then(function (isAvSecOwner) {
                                                            form.ui.tabs.get("tab_risk").setVisible(isAvSecOwner);
                                                        });
                                                    }
                                                    // Log Rail Safety ownership status after setting owner
                                                    logRailSafetyOwnershipStatus(form);
                                                    return [3 /*break*/, 13];
                                                case 12:
                                                    error_2 = _c.sent();
                                                    console.error("[IncidentType.onLoad] Error retrieving team record:", error_2);
                                                    return [3 /*break*/, 13];
                                                case 13: return [2 /*return*/];
                                            }
                                        });
                                    });
                                }).catch(function (error) {
                                    console.error("[IncidentType.onLoad] Error retrieving business unit:", error);
                                });
                            }
                            if (!(formType == 2 || formType == 3 || formType == 4)) return [3 /*break*/, 5];
                            Xrm.WebApi.retrieveRecord('msdyn_incidenttype', form.data.entity.getId(), "?$select=_owningbusinessunit_value").then(function success(incidenttype) {
                                return __awaiter(this, void 0, void 0, function () {
                                    var owningBuId, isOwningBuAvSec, formUI, formUI;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                owningBuId = incidenttype._owningbusinessunit_value;
                                                if (!owningBuId)
                                                    return [2 /*return*/];
                                                return [4 /*yield*/, isAvSecBU(owningBuId)];
                                            case 1:
                                                isOwningBuAvSec = _a.sent();
                                                if (isOwningBuAvSec) {
                                                    form.ui.tabs.get("operation_activity_tab").setVisible(true);
                                                    form.getControl("ts_programarea").setVisible(true);
                                                    form.getControl("ts_programactivityriskrating").setVisible(true);
                                                    formUI = form.ui;
                                                    formUI.quickForms.get("ProgramAreaRiskRatingQV").setVisible(true);
                                                }
                                                else {
                                                    formUI = form.ui;
                                                    formUI.quickForms.get("ProgramAreaRiskRatingQV").setVisible(false);
                                                }
                                                return [2 /*return*/];
                                        }
                                    });
                                });
                            }).catch(function (error) {
                                console.error("[IncidentType.onLoad] Error retrieving incident type:", error);
                            });
                            ownerAttribute = form.getAttribute("ownerid");
                            ownerAttributeValue = ownerAttribute.getValue();
                            if (!(ownerAttributeValue != null)) return [3 /*break*/, 4];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, isOwnedByAvSec(ownerAttributeValue)];
                        case 2:
                            isAvSecOwner = _a.sent();
                            form.ui.tabs.get("tab_risk").setVisible(isAvSecOwner);
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            console.error("[IncidentType.onLoad] Error checking AvSec ownership:", error_1);
                            return [3 /*break*/, 4];
                        case 4:
                            // Log Rail Safety ownership status for existing records
                            logRailSafetyOwnershipStatus(form);
                            _a.label = 5;
                        case 5: return [2 /*return*/];
                    }
                });
            });
        }
        IncidentType.onLoad = onLoad;
        function onSave(eContext) {
            return __awaiter(this, void 0, void 0, function () {
                var form, error_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            form = eContext.getFormContext();
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            // Rail Safety ownership assignment
                            return [4 /*yield*/, assignRailSafetyOwnershipOnSave(form)];
                        case 2:
                            // Rail Safety ownership assignment
                            _a.sent();
                            return [3 /*break*/, 4];
                        case 3:
                            error_3 = _a.sent();
                            console.error("[IncidentType.onSave] Error:", error_3);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        IncidentType.onSave = onSave;
        function setFieldsDisabled(eContext) {
            var formContext = eContext.getFormContext();
            var gridContext = formContext.getControl("operation_activity_grid");
            if (formContext) {
                var arrFields_1 = ["ts_operation", "ts_activity"];
                var objEntity = formContext.data.entity;
                objEntity.attributes.forEach(function (attribute, i) {
                    if (arrFields_1.indexOf(attribute.getName()) > -1) {
                        var attributeToDisable = attribute.controls.get(0);
                        attributeToDisable.setDisabled(true);
                    }
                });
            }
            ;
        }
        IncidentType.setFieldsDisabled = setFieldsDisabled;
    })(IncidentType = ROM.IncidentType || (ROM.IncidentType = {}));
})(ROM || (ROM = {}));
