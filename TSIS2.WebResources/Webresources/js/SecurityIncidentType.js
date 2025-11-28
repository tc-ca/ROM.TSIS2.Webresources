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
    var SecurityIncidentType;
    (function (SecurityIncidentType) {
        var langColumn = Xrm.Utility.getGlobalContext().userSettings.languageId === 1033 ? "ts_securityincidenttypenameenglish" : "ts_securityincidenttypenamefrench";
        function onLoad(eContext) {
            return __awaiter(this, void 0, void 0, function () {
                var formContext, shouldClearOwner;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            formContext = eContext.getFormContext();
                            if (formContext.ui.getFormType() == 1 || formContext.ui.getFormType() == 2) {
                                showTCOMWarningMessage(formContext);
                            }
                            return [4 /*yield*/, showFieldWarningMessageIfOwnerIsNotISSONorAvSec(formContext)];
                        case 1:
                            shouldClearOwner = _a.sent();
                            if (shouldClearOwner) {
                                formContext.getAttribute("ownerid").setValue(null);
                            }
                            if (formContext.ui.getFormType() == 1) {
                                setOwnerToUserBusinessUnit(formContext);
                            }
                            else if (formContext.ui.getFormType() != 1) {
                                checkIfExistingRecordExistWithSameNameAndBU(formContext, "ts_name");
                            }
                            return [2 /*return*/];
                    }
                });
            });
        }
        SecurityIncidentType.onLoad = onLoad;
        function onSave(eContext) {
            var form = eContext.getFormContext();
            if (checkIfExistingRecordExistWithSameNameAndBU(form, "ts_name") ||
                checkIfExistingRecordExistWithSameNameAndBU(form, "ts_securityincidenttypenameenglish") ||
                checkIfExistingRecordExistWithSameNameAndBU(form, "ts_securityincidenttypenamefrench")) {
                eContext.getEventArgs().preventDefault();
            }
        }
        SecurityIncidentType.onSave = onSave;
        function ownerOnChange(eContext) {
            return __awaiter(this, void 0, void 0, function () {
                var form;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            form = eContext.getFormContext();
                            return [4 /*yield*/, showFieldWarningMessageIfOwnerIsNotISSONorAvSec(form)];
                        case 1:
                            _a.sent();
                            checkIfExistingRecordExistWithSameNameAndBU(form, "ts_name");
                            checkIfExistingRecordExistWithSameNameAndBU(form, "ts_securityincidenttypenameenglish");
                            checkIfExistingRecordExistWithSameNameAndBU(form, "ts_securityincidenttypenamefrench");
                            return [2 /*return*/];
                    }
                });
            });
        }
        SecurityIncidentType.ownerOnChange = ownerOnChange;
        function nameOnChange(eContext, field) {
            var form = eContext.getFormContext();
            checkIfExistingRecordExistWithSameNameAndBU(form, field);
        }
        SecurityIncidentType.nameOnChange = nameOnChange;
        function checkIfExistingRecordExistWithSameNameAndBU(formContext, field) {
            var _a, _b;
            var securityIncidentAttribute = formContext.getAttribute(field);
            if (securityIncidentAttribute !== undefined) {
                var ownerAttribute = formContext.getAttribute("ownerid");
                if (securityIncidentAttribute && ownerAttribute) {
                    var nameAttributeValue = (_a = securityIncidentAttribute.getValue()) === null || _a === void 0 ? void 0 : _a.trim();
                    var ownerAttributeValue = ownerAttribute.getValue();
                    if (nameAttributeValue && ownerAttributeValue) {
                        var fetchData = {
                            "securityIncidentTypeName": "" + nameAttributeValue,
                            "ownerId": "" + ((_b = ownerAttribute.getValue()) === null || _b === void 0 ? void 0 : _b[0].id)
                        };
                        var fetchXml = [
                            "<fetch version='1.0' mapping='logical' distinct='true'>",
                            "  <entity name='ts_securityincidenttype'>",
                            "    <filter type='and'>",
                            "      <condition attribute='", (field === 'ts_name' ? langColumn : field), "' operator='eq' value='", fetchData.securityIncidentTypeName, "'/>",
                            "      <condition attribute='ownerid' operator='eq' value='", fetchData.ownerId, "'/>",
                            "      <condition attribute='ts_securityincidenttypeid' operator='neq' value='", formContext.data.entity.getId(), "'/>",
                            "    </filter>",
                            "  </entity>",
                            "</fetch>"
                        ].join("");
                        Xrm.WebApi.retrieveMultipleRecords('ts_securityincidenttype', "?fetchXml=" + fetchXml).then(function success(result) {
                            if (result.entities.length > 0) {
                                var warningMessage = Xrm.Utility.getResourceString("ts_/resx/SecurityIncidentType", "WarningMessageText");
                                formContext.getControl(field).setNotification(warningMessage, "error");
                                return true;
                            }
                            else {
                                formContext.getControl(field).clearNotification("error");
                            }
                        });
                    }
                }
            }
            return false;
        }
        SecurityIncidentType.checkIfExistingRecordExistWithSameNameAndBU = checkIfExistingRecordExistWithSameNameAndBU;
        function showTCOMWarningMessage(formContext) {
            var message = Xrm.Utility.getGlobalContext().userSettings.languageId === 1033
                ? "Please advise TCOMs before creating or changing this record."
                : "Veuillez informer les TCOM avant de créer ou de modifier cet enregistrement.";
            formContext.ui.setFormNotification(message, "WARNING", "tcom_warning");
        }
    })(SecurityIncidentType = ROM.SecurityIncidentType || (ROM.SecurityIncidentType = {}));
})(ROM || (ROM = {}));
