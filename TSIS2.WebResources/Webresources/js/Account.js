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
var ROM;
(function (ROM) {
    var Account;
    (function (Account) {
        function onLoad(eContext) {
            return __awaiter(this, void 0, void 0, function () {
                var form, addressControl, ownerAttribute, ownerAttributeValue, isISSOOwner, operationView, ownerValue, isAvSec;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            form = eContext.getFormContext();
                            addressControl = form.getControl("address1_composite_compositionLinkControl_address1_country");
                            if (addressControl != null && addressControl != undefined) {
                                addressControl.setVisible(false);
                            }
                            if (form.getAttribute("ts_statusstartdate").getValue() != null) {
                                form.getControl("ts_statusenddate").setDisabled(false);
                                form.getControl("ts_statusdescription").setDisabled(false);
                                form.getAttribute("ts_statusdescription").setRequiredLevel("required");
                            }
                            ownerAttribute = form.getAttribute("ownerid");
                            if (!(ownerAttribute != null && ownerAttribute != undefined)) return [3 /*break*/, 2];
                            ownerAttributeValue = ownerAttribute.getValue();
                            if (!(ownerAttributeValue != null)) return [3 /*break*/, 2];
                            return [4 /*yield*/, isOwnedByISSO(ownerAttributeValue)];
                        case 1:
                            isISSOOwner = _a.sent();
                            if (isISSOOwner) {
                                operationView = {
                                    entityType: "savedquery",
                                    id: "{f3c99b02-591d-ed11-b83e-002248ae429c}",
                                    name: "Active Operations"
                                };
                                form.getControl("Operations").getViewSelector().setCurrentView(operationView);
                            }
                            _a.label = 2;
                        case 2:
                            //Lock for non Admin users
                            if (!userHasRole("System Administrator|ROM - Business Admin")) {
                                form.getControl("name").setDisabled(true);
                                form.getControl("ovs_legalname").setDisabled(true);
                            }
                            else {
                                form.getControl("ovs_accountnameenglish").setVisible(true);
                                form.getControl("ovs_accountnamefrench").setVisible(true);
                            }
                            ownerValue = form.getAttribute("ownerid").getValue();
                            return [4 /*yield*/, isOwnedByAvSec(ownerValue)];
                        case 3:
                            isAvSec = _a.sent();
                            form.ui.tabs.get("tab_Risk").setVisible(isAvSec);
                            return [2 /*return*/];
                    }
                });
            });
        }
        Account.onLoad = onLoad;
        function onSave(eContext) {
            var form = eContext.getFormContext();
            var statusStartDateValue = form.getAttribute("ts_statusstartdate").getValue();
            var statusEndDateValue = form.getAttribute("ts_statusenddate").getValue();
            if (statusStartDateValue != null) {
                if (Date.parse(statusStartDateValue.toDateString()) <= Date.parse(new Date(Date.now()).toDateString())) {
                    form.getAttribute("ts_stakeholderstatus").setValue(717750001 /* NonOperational */);
                }
            }
            if (statusEndDateValue != null) {
                if (Date.parse(statusEndDateValue.toDateString()) <= Date.parse(new Date(Date.now()).toDateString())) {
                    form.getAttribute("ts_stakeholderstatus").setValue(717750000 /* Operational */);
                }
            }
        }
        Account.onSave = onSave;
        function regionOnChange(eContext) {
            var form = eContext.getFormContext();
            var countryAttribute = form.getAttribute("ts_country");
            var regionAttribute = form.getAttribute("msdyn_serviceterritory");
            var address1CountryAttribute = form.getAttribute("address1_country");
            if (address1CountryAttribute != null && address1CountryAttribute != undefined) {
                var regionAttributeValue = regionAttribute.getValue();
                var countryAttributeValue = countryAttribute.getValue();
                var address1CountryAttributeValue = address1CountryAttribute.getValue();
                if (regionAttributeValue != null && regionAttributeValue != undefined) {
                    //Set Country to Canada if Region Is Not International
                    if (regionAttributeValue[0].id != "{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}") { //International
                        var lookup = new Array();
                        lookup[0] = new Object();
                        lookup[0].id = "{208EF8A1-8E75-EB11-A812-000D3AF3FAC7}";
                        lookup[0].name = "CANADA";
                        lookup[0].entityType = "tc_country";
                        form.getAttribute("ts_country").setValue(lookup);
                        address1CountryAttribute.setValue("CANADA");
                    }
                    else {
                        if (countryAttributeValue != null && countryAttributeValue[0].id == "{208EF8A1-8E75-EB11-A812-000D3AF3FAC7}") { //Canada
                            countryAttribute.setValue(null);
                        }
                        if (address1CountryAttributeValue == "CANADA") {
                            address1CountryAttribute.setValue(null);
                        }
                    }
                }
            }
        }
        Account.regionOnChange = regionOnChange;
        function countryOnChange(eContext) {
            var form = eContext.getFormContext();
            var countryAttribute = form.getAttribute("ts_country");
            var regionAttribute = form.getAttribute("msdyn_serviceterritory");
            var address1CountryAttribute = form.getAttribute("address1_country");
            if (address1CountryAttribute != null && address1CountryAttribute != undefined) {
                var regionAttributeValue = regionAttribute.getValue();
                var countryAttributeValue = countryAttribute.getValue();
                var address1CountryAttributeValue = address1CountryAttribute.getValue();
                if (countryAttributeValue != null && countryAttributeValue != undefined) {
                    //Put Address1_Composite Country value to the one set in the Country field
                    address1CountryAttribute.setValue(countryAttributeValue[0].name);
                    //Clear and lock Region field if Country is not Canada
                    if (countryAttributeValue[0].id != "{208EF8A1-8E75-EB11-A812-000D3AF3FAC7}") { //Canada
                        var lookup = new Array();
                        lookup[0] = new Object();
                        lookup[0].id = "{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}";
                        lookup[0].name = "International";
                        lookup[0].entityType = "territory";
                        regionAttribute.setValue(lookup);
                        form.getControl("msdyn_serviceterritory").setDisabled(true);
                    }
                    else {
                        if (regionAttributeValue != null && regionAttributeValue[0].id != "{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}") { //International
                            regionAttribute.setValue(null);
                            if (address1CountryAttributeValue == "CANADA") {
                                address1CountryAttribute.setValue(null);
                            }
                            if (countryAttribute != null && countryAttributeValue[0].id == "{208EF8A1-8E75-EB11-A812-000D3AF3FAC7}") {
                                countryAttribute.setValue(null);
                            }
                        }
                        else {
                            regionAttribute.setValue(null);
                        }
                    }
                }
                else {
                    address1CountryAttribute.setValue(null);
                    form.getControl("msdyn_serviceterritory").setDisabled(false);
                }
            }
        }
        Account.countryOnChange = countryOnChange;
        function statusStartDateOnChange(eContext) {
            var form = eContext.getFormContext();
            var statusStartDateValue = form.getAttribute("ts_statusstartdate").getValue();
            if (statusStartDateValue != null) {
                form.getControl("ts_statusenddate").setDisabled(false);
                form.getControl("ts_statusdescription").setDisabled(false);
                form.getAttribute("ts_statusdescription").setRequiredLevel("required");
            }
            else {
                form.getAttribute("ts_statusdescription").setRequiredLevel("none");
                form.getAttribute("ts_statusdescription").setValue(null);
                form.getAttribute("ts_statusenddate").setValue(null);
                form.getControl("ts_statusenddate").setDisabled(true);
                form.getControl("ts_statusdescription").setDisabled(true);
            }
        }
        Account.statusStartDateOnChange = statusStartDateOnChange;
    })(Account = ROM.Account || (ROM.Account = {}));
})(ROM || (ROM = {}));
