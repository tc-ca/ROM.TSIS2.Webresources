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
    var FunctionalLocation;
    (function (FunctionalLocation) {
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            // get the environment variable value
            getEnvironmentVariableByName("ts_TurnoffDocumentCentre", function (value) {
                if (value == "yes") {
                    form.ui.tabs.get("tab_6").sections.get("tab_6_section_2").setVisible(false);
                    console.log("Turn off the Document Centre");
                }
                else if (value == "no") {
                    form.ui.tabs.get("tab_6").sections.get("tab_6_section_2").setVisible(true);
                    form.getControl("WebResource_NewDocumentCenterNotice").setVisible(false);
                    console.log("Don't turn off the Document Centre");
                }
                else {
                    console.log("Variable not found or invalid");
                }
            });
            var ownerAttribute = form.getAttribute("ownerid");
            if (ownerAttribute != null && ownerAttribute != undefined) {
                var ownerAttributeValue_1 = ownerAttribute.getValue();
                if (ownerAttributeValue_1 != null && ownerAttributeValue_1 != undefined && ownerAttributeValue_1[0].entityType == "systemuser") {
                    var targetId = ownerAttributeValue_1[0].id.replace(/[{}]/g, "");
                    console.log("Type: " + ownerAttributeValue_1[0].entityType);
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
            var form = eContext.getFormContext();
            var statusStartDateValue = form.getAttribute("ts_statusstartdate").getValue();
            var statusEndDateValue = form.getAttribute("ts_statusenddate").getValue();
            if (statusStartDateValue != null) {
                if (Date.parse(statusStartDateValue.toDateString()) <= Date.parse(new Date(Date.now()).toDateString())) {
                    form.getAttribute("ts_sitestatus").setValue(717750001 /* NonOperational */);
                }
            }
            if (statusEndDateValue != null) {
                if (Date.parse(statusEndDateValue.toDateString()) <= Date.parse(new Date(Date.now()).toDateString())) {
                    form.getAttribute("ts_sitestatus").setValue(717750000 /* Operational */);
                }
            }
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
            if (siteClass == 717750002 /* _2 */ || siteClass == 717750003 /* _3 */) {
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
                if (ownerAttributeValue[0].name && ownerAttributeValue[0].name.toLowerCase().includes("aviation security".toLowerCase())) {
                    form.getControl("ts_accountableteam").setVisible(true);
                    form.getAttribute("ts_accountableteam").setRequiredLevel("required");
                }
                else {
                    form.getControl("ts_accountableteam").setVisible(false);
                    form.getAttribute("ts_accountableteam").setRequiredLevel("none");
                }
            }
            else {
                // If owner is null, hide and unrequire the ts_accountableteam field
                form.getControl("ts_accountableteam").setVisible(false);
                form.getAttribute("ts_accountableteam").setRequiredLevel("none");
                form.getAttribute("ts_accountableteam").setValue(null);
            }
        }
        FunctionalLocation.onOwnerChange = onOwnerChange;
        function getEnvironmentVariableByName(variableName, callback) {
            var fetchXML = "\n        <fetch top=\"1\">\n            <entity name=\"environmentvariablevalue\">\n                <attribute name=\"value\" />\n                <link-entity name=\"environmentvariabledefinition\" \n                             to=\"environmentvariabledefinitionid\" \n                             from=\"environmentvariabledefinitionid\" \n                             alias=\"definition\">\n                    <filter>\n                        <condition attribute=\"schemaname\" operator=\"eq\" value=\"" + variableName + "\" />\n                    </filter>\n                </link-entity>\n            </entity>\n        </fetch>\n    ";
            var encodedFetchXml = encodeURIComponent(fetchXML);
            Xrm.WebApi.retrieveMultipleRecords("environmentvariablevalue", "?fetchXml=" + encodedFetchXml)
                .then(function (result) {
                if (result.entities.length > 0 && result.entities[0].value !== undefined) {
                    var raw = result.entities[0].value;
                    callback(raw);
                }
                else {
                    console.warn("Environment variable '" + variableName + "' not found or has no value.");
                    callback(null);
                }
            })
                .catch(function (error) {
                console.error("Error retrieving environment variable '" + variableName + "': " + error.message);
                callback(null);
            });
        }
        FunctionalLocation.getEnvironmentVariableByName = getEnvironmentVariableByName;
    })(FunctionalLocation = ROM.FunctionalLocation || (ROM.FunctionalLocation = {}));
})(ROM || (ROM = {}));
