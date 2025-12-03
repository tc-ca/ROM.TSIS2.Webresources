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
    var FunctionalLocation;
    (function (FunctionalLocation) {
        // Rail Safety tab visibility configuration for Functional Location (Site) form
        var RAIL_SAFETY_VISIBLE_TABS = ["tab_3", "Work Orders"]; // Summary and Work Orders
        function onLoad(eContext) {
            var _this = this;
            var form = eContext.getFormContext();
            // Rail Safety: Show only specific tabs for Rail Safety team members
            applyTabVisibilityForTeam(form, TEAM_SCHEMA_NAMES.RAIL_SAFETY, RAIL_SAFETY_VISIBLE_TABS).catch(function (err) {
                console.error("Error applying Rail Safety tab visibility:", err);
            });
            var ownerAttribute = form.getAttribute("ownerid");
            if (ownerAttribute != null && ownerAttribute != undefined) {
                var ownerAttributeValue_1 = ownerAttribute.getValue();
                if (ownerAttributeValue_1 != null && ownerAttributeValue_1 != undefined && ownerAttributeValue_1[0].entityType == "systemuser") {
                    var targetId = ownerAttributeValue_1[0].id.replace(/[{}]/g, "");
                    var isOffline = Xrm.Utility.getGlobalContext().client.getClientState() === "Offline";
                    if (isOffline) {
                        form.ui.setFormNotification("Offline: get system user ", "INFO", "offline-operation");
                        Xrm.WebApi.offline.retrieveRecord("systemuser", targetId, "?$select=_businessunitid_value").then(function success(result) {
                            Xrm.WebApi.offline.retrieveRecord("businessunit", result._businessunitid_value, "?$select=name").then(function success(result) {
                                form.getAttribute("ts_businessunit").setValue(result.name);
                                form.ui.setFormNotification("Offline: get BU ", "INFO", "offline-operation");
                            }, function (error) {
                                form.ui.setFormNotification("Offline: ERROR  " + JSON.stringify(error), "ERROR", "offline-error");
                            });
                        }, function (error) {
                            form.ui.setFormNotification("Offline: ERROR  " + JSON.stringify(error), "ERROR", "offline-error");
                        });
                    }
                    else {
                        Xrm.WebApi.retrieveRecord("systemuser", targetId, "?$select=_businessunitid_value").then(function success(result) {
                            Xrm.WebApi.retrieveRecord("businessunit", result._businessunitid_value, "?$select=name").then(function success(result) {
                                form.getAttribute("ts_businessunit").setValue(result.name);
                            }, function (error) {
                                form.ui.setFormNotification("Online: ERROR get BU - " + JSON.stringify(error), "ERROR", "online-error");
                            });
                        }, function (error) {
                            form.ui.setFormNotification("Online: ERROR  get user - " + JSON.stringify(error), "ERROR", "online-error");
                        });
                    }
                }
                // Detect if the record is owned by the Rail Safety Team
                if (ownerAttributeValue_1 != null && ownerAttributeValue_1 != undefined && ownerAttributeValue_1[0].entityType == "team") {
                    isOwnedBy(ownerAttributeValue_1[0].id, [TEAM_SCHEMA_NAMES.RAIL_SAFETY]).then(function (isRailSafety) { return __awaiter(_this, void 0, void 0, function () {
                        var teamName;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!isRailSafety) return [3 /*break*/, 2];
                                    return [4 /*yield*/, getTeamNameById(ownerAttributeValue_1[0].id)];
                                case 1:
                                    teamName = _a.sent();
                                    console.log("This record belongs to ".concat(teamName));
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); });
                }
                //If site type is aerodrome, show ICAO and IATA fields
                //If Region is not International, show Class field
                var siteTypeAttribute = form.getAttribute("ts_sitetype");
                if (siteTypeAttribute != null) {
                    var siteTypeAttributeValue = form.getAttribute("ts_sitetype").getValue();
                    if (siteTypeAttributeValue != null) {
                        if (siteTypeAttributeValue[0].name == "Aerodrome") {
                            form.getControl("ts_icaocode").setVisible(true);
                            form.getControl("ts_iatacode").setVisible(true);
                            var regionAttributeValue = form.getAttribute("ts_region").getValue();
                            if (regionAttributeValue != null)
                                if (regionAttributeValue[0].name != "International") {
                                    form.getControl("ts_class").setVisible(true);
                                }
                        }
                    }
                }
                //If owner is ISSO, replace operations view
                if (ownerAttributeValue_1 != null) {
                    (function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var isISSO, operationView;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, isOwnedByISSO(ownerAttributeValue_1)];
                                    case 1:
                                        isISSO = _a.sent();
                                        if (isISSO) {
                                            operationView = {
                                                entityType: "savedquery",
                                                id: "{4361bdce-d4ae-ec11-983e-002248ade910}",
                                                name: "Active Operations"
                                            };
                                            form.getControl("Operations").getViewSelector().setCurrentView(operationView);
                                            form.getControl("ts_siteriskrating").setVisible(false);
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        });
                    })();
                }
                //If owner is Aviation Security
                if (ownerAttributeValue_1 != null) {
                    (function () {
                        return __awaiter(this, void 0, void 0, function () {
                            var isAvSec;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, isOwnedByAvSec(ownerAttributeValue_1)];
                                    case 1:
                                        isAvSec = _a.sent();
                                        if (isAvSec) {
                                            form.ui.tabs.get("tab_Risk").setVisible(true);
                                            form.getControl("ts_accountableteam").setVisible(true);
                                            form.getAttribute("ts_accountableteam").setRequiredLevel("required");
                                        }
                                        else {
                                            form.ui.tabs.get("tab_Risk").setVisible(false);
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        });
                    })();
                }
            }
            if (form.getAttribute("ts_statusstartdate").getValue() != null) {
                form.getControl("ts_statusenddate").setDisabled(false);
                form.getControl("ts_description").setDisabled(false);
                form.getAttribute("ts_description").setRequiredLevel("required");
            }
            riskScoreVisibility(form);
            siteTypesVisibility(eContext);
            // Set owner to Rail Safety team if user is a member (on load, then save)
            setOwnerToTeamAndSave(form, TEAM_SCHEMA_NAMES.RAIL_SAFETY).catch(function (error) {
                console.error("Error in setOwnerToTeamAndSave:", error);
            });
            //Lock for non Admin users
            if (!userHasRole("System Administrator|ROM - Business Admin")) {
                form.getControl("msdyn_name").setDisabled(true);
                form.getControl("ts_functionallocationnameenglish").setDisabled(true);
                form.getControl("ts_functionallocationnamefrench").setDisabled(true);
            }
        }
        FunctionalLocation.onLoad = onLoad;
        function IATACodeOnChange(eContext) {
            var form = eContext.getFormContext();
            var iataValue = form.getAttribute("ts_iatacode").getValue();
            form.getControl("ts_iatacode").clearNotification("iata_length_error");
            if (iataValue != null) {
                if (iataValue.length !== 3) {
                    form.getControl("ts_iatacode").setNotification("IATA code must be exactly 3 characters.", "iata_length_error");
                    eContext.getEventArgs() && eContext.getEventArgs().preventDefault();
                }
            }
        }
        FunctionalLocation.IATACodeOnChange = IATACodeOnChange;
        function ICAOCodeOnChange(eContext) {
            var form = eContext.getFormContext();
            var icaoValue = form.getAttribute("ts_icaocode").getValue();
            form.getControl("ts_icaocode").clearNotification("icao_length_error");
            if (icaoValue != null) {
                if (icaoValue.length !== 4) {
                    form.getControl("ts_icaocode").setNotification("ICAO code must be exactly 4 characters.", "icao_length_error");
                    eContext.getEventArgs() && eContext.getEventArgs().preventDefault();
                }
            }
        }
        FunctionalLocation.ICAOCodeOnChange = ICAOCodeOnChange;
        function onSave(eContext) {
            return __awaiter(this, void 0, void 0, function () {
                var form, statusStartDateValue, statusEndDateValue;
                return __generator(this, function (_a) {
                    form = eContext.getFormContext();
                    statusStartDateValue = form.getAttribute("ts_statusstartdate").getValue();
                    statusEndDateValue = form.getAttribute("ts_statusenddate").getValue();
                    if (statusStartDateValue != null) {
                        if (Date.parse(statusStartDateValue.toDateString()) <= Date.parse(new Date(Date.now()).toDateString())) {
                            form.getAttribute("ts_sitestatus").setValue(717750001 /* ts_sitestatus.NonOperational */);
                        }
                    }
                    if (statusEndDateValue != null) {
                        if (Date.parse(statusEndDateValue.toDateString()) <= Date.parse(new Date(Date.now()).toDateString())) {
                            form.getAttribute("ts_sitestatus").setValue(717750000 /* ts_sitestatus.Operational */);
                        }
                    }
                    return [2 /*return*/];
                });
            });
        }
        FunctionalLocation.onSave = onSave;
        function siteTypeOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var siteTypeAttribute = form.getAttribute("ts_sitetype");
                var icaoCodeAttribute = form.getAttribute("ts_icaocode");
                var iataCodeAttribute = form.getAttribute("ts_iatacode");
                var classAttribute = form.getAttribute("ts_class");
                if (siteTypeAttribute != null && siteTypeAttribute != undefined) {
                    var siteTypeAttributeValue = siteTypeAttribute.getValue();
                    if (siteTypeAttributeValue != null && siteTypeAttributeValue != undefined) {
                        if (siteTypeAttributeValue[0].id == "{99DA31E7-7D78-EB11-A812-0022486D697D}") { //aerodrome
                            form.getControl("ts_icaocode").setVisible(true);
                            form.getControl("ts_iatacode").setVisible(true);
                            var regionAttributeValue = form.getAttribute("ts_region").getValue();
                            if (regionAttributeValue != null) {
                                if (regionAttributeValue[0].name != "International") {
                                    form.getControl("ts_class").setVisible(true);
                                }
                                else {
                                    classAttribute.setValue() == null;
                                    form.getControl("ts_class").setVisible(false);
                                }
                            }
                            else {
                                form.getControl("ts_class").setVisible(true);
                            }
                        }
                        else {
                            icaoCodeAttribute.setValue() == null;
                            iataCodeAttribute.setValue() == null;
                            classAttribute.setValue() == null;
                            form.getControl("ts_icaocode").setVisible(false);
                            form.getControl("ts_iatacode").setVisible(false);
                            form.getControl("ts_class").setVisible(false);
                        }
                    }
                    else {
                        icaoCodeAttribute.setValue() == null;
                        iataCodeAttribute.setValue() == null;
                        classAttribute.setValue() == null;
                        form.getControl("ts_icaocode").setVisible(false);
                        form.getControl("ts_iatacode").setVisible(false);
                        form.getControl("ts_class").setVisible(false);
                    }
                }
                siteTypesVisibility(eContext);
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        FunctionalLocation.siteTypeOnChange = siteTypeOnChange;
        function statusStartDateOnChange(eContext) {
            var form = eContext.getFormContext();
            if (form.getAttribute("ts_statusstartdate").getValue() != null) {
                form.getControl("ts_statusenddate").setDisabled(false);
                form.getControl("ts_description").setDisabled(false);
                form.getAttribute("ts_description").setRequiredLevel("required");
            }
            else {
                form.getAttribute("ts_description").setRequiredLevel("none");
                form.getAttribute("ts_description").setValue(null);
                form.getAttribute("ts_statusenddate").setValue(null);
                form.getControl("ts_statusenddate").setDisabled(true);
                form.getControl("ts_description").setDisabled(true);
            }
        }
        FunctionalLocation.statusStartDateOnChange = statusStartDateOnChange;
        function regionOnChange(eContext) {
            var form = eContext.getFormContext();
            var regionAttributeValue = form.getAttribute("ts_region").getValue();
            var classAttribute = form.getAttribute("ts_class");
            var siteTypeAttributeValue = form.getAttribute("ts_sitetype").getValue();
            if (siteTypeAttributeValue != null) {
                if (siteTypeAttributeValue[0].id == "{99DA31E7-7D78-EB11-A812-0022486D697D}")
                    if (regionAttributeValue != null) {
                        if (regionAttributeValue[0].name != "International") { //aerodrome and not International
                            form.getControl("ts_class").setVisible(true);
                        }
                        else {
                            classAttribute.setValue(null);
                            form.getControl("ts_class").setVisible(false);
                        }
                    }
                    else {
                        form.getControl("ts_class").setVisible(true);
                    }
            }
            else {
                classAttribute.setValue(null);
                form.getControl("ts_class").setVisible(false);
            }
        }
        FunctionalLocation.regionOnChange = regionOnChange;
        //Shows the Risk Score field only when the Class is 2 or 3
        function riskScoreVisibility(form) {
            var siteClass = form.getAttribute("ts_class").getValue();
            if (siteClass == 717750002 /* ts_msdyn_functionallocation_ts_class._2 */ || siteClass == 717750003 /* ts_msdyn_functionallocation_ts_class._3 */) {
                form.getControl("ts_riskscore").setVisible(true);
                form.getControl("ts_lpdtounitedstates").setVisible(true);
            }
            else {
                form.getControl("ts_riskscore").setVisible(false);
                form.getControl("ts_lpdtounitedstates").setVisible(false);
            }
        }
        function siteTypesVisibility(eContext) {
            var form = eContext.getFormContext();
            var siteType = form.getAttribute("ts_sitetype").getValue();
            if (siteType != null) {
                form.getControl("ts_sitetype2").setVisible(true);
                var siteType2 = form.getAttribute("ts_sitetype2").getValue();
                if (siteType2 != null) {
                    form.getControl("ts_sitetype3").setVisible(true);
                }
                else {
                    form.getControl("ts_sitetype3").setVisible(false);
                }
            }
            else {
                form.getControl("ts_sitetype2").setVisible(false);
                form.getControl("ts_sitetype3").setVisible(false);
            }
        }
        FunctionalLocation.siteTypesVisibility = siteTypesVisibility;
        function classOnChange(eContext) {
            var form = eContext.getFormContext();
            riskScoreVisibility(form);
        }
        FunctionalLocation.classOnChange = classOnChange;
        function onOwnerChange(eContext) {
            var form = eContext.getFormContext();
            // Get the owner field value
            var ownerAttributeValue = form.getAttribute("ownerid").getValue();
            // If owner is Aviation Security, make the ts_accountableteam field required and visible
            if (ownerAttributeValue != null) {
                (function () {
                    return __awaiter(this, void 0, void 0, function () {
                        var isAvSec;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, isOwnedByAvSec(ownerAttributeValue)];
                                case 1:
                                    isAvSec = _a.sent();
                                    if (isAvSec) {
                                        form.getControl("ts_accountableteam").setVisible(true);
                                        form.getAttribute("ts_accountableteam").setRequiredLevel("required");
                                    }
                                    else {
                                        form.getControl("ts_accountableteam").setVisible(false);
                                        form.getAttribute("ts_accountableteam").setRequiredLevel("none");
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    });
                })();
            }
            else {
                // If owner is null, hide and unrequire the ts_accountableteam field
                form.getControl("ts_accountableteam").setVisible(false);
                form.getAttribute("ts_accountableteam").setRequiredLevel("none");
                form.getAttribute("ts_accountableteam").setValue(null);
            }
        }
        FunctionalLocation.onOwnerChange = onOwnerChange;
    })(FunctionalLocation = ROM.FunctionalLocation || (ROM.FunctionalLocation = {}));
})(ROM || (ROM = {}));
