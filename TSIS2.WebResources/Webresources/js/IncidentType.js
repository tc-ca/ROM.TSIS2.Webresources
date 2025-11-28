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
    var IncidentType;
    (function (IncidentType) {
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            //If creating a record
            if (form.ui.getFormType() == 1) {
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
                        var userBuId, isTC, isAvSec, isISSO, _a, teamSchemaName, teamId, teamRec, team;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!businessunit.entities.length || !businessunit.entities[0].businessunitid)
                                        return [2 /*return*/];
                                    userBuId = businessunit.entities[0].businessunitid;
                                    return [4 /*yield*/, isTCBU(userBuId)];
                                case 1:
                                    isTC = _b.sent();
                                    if (isTC)
                                        return [2 /*return*/];
                                    return [4 /*yield*/, isAvSecBU(userBuId)];
                                case 2:
                                    isAvSec = _b.sent();
                                    if (!!isAvSec) return [3 /*break*/, 4];
                                    return [4 /*yield*/, isISSOBU(userBuId)];
                                case 3:
                                    _a = _b.sent();
                                    return [3 /*break*/, 5];
                                case 4:
                                    _a = false;
                                    _b.label = 5;
                                case 5:
                                    isISSO = _a;
                                    if (isAvSec) {
                                        teamSchemaName = TEAM_SCHEMA_NAMES.AVIATION_SECURITY_DOMESTIC;
                                    }
                                    else if (isISSO) {
                                        teamSchemaName = TEAM_SCHEMA_NAMES.ISSO_TEAM;
                                    }
                                    if (!teamSchemaName) return [3 /*break*/, 8];
                                    return [4 /*yield*/, getEnvironmentVariableValue(teamSchemaName)];
                                case 6:
                                    teamId = _b.sent();
                                    if (!teamId) return [3 /*break*/, 8];
                                    return [4 /*yield*/, Xrm.WebApi.retrieveRecord("team", teamId, "?$select=name")];
                                case 7:
                                    teamRec = _b.sent();
                                    if (!teamRec)
                                        return [2 /*return*/];
                                    team = {
                                        id: teamId,
                                        name: teamRec.name || "",
                                        entityType: "team"
                                    };
                                    form.getAttribute('ownerid').setValue([team]);
                                    _b.label = 8;
                                case 8: return [2 /*return*/];
                            }
                        });
                    });
                });
            }
            //If viewing a record
            if (form.ui.getFormType() == 2 || form.ui.getFormType() == 3 || form.ui.getFormType() == 4) {
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
                });
            }
            //If owner is Aviation Security
            var ownerAttribute = form.getAttribute("ownerid");
            var ownerAttributeValue = ownerAttribute.getValue();
            if (ownerAttributeValue != null) {
                isOwnedByAvSec(ownerAttributeValue).then(function (isAvSecOwner) {
                    form.ui.tabs.get("tab_risk").setVisible(isAvSecOwner);
                });
            }
        }
        IncidentType.onLoad = onLoad;
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
