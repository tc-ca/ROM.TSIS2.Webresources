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
    var User;
    (function (User) {
        var userId;
        var dualInspectorRoleId;
        var clientUrl = Xrm.Utility.getGlobalContext().getClientUrl();
        var isUnifiedClientInterface = Xrm.Internal.isUci();
        function onLoad(eContext) {
            return __awaiter(this, void 0, void 0, function () {
                var form, id, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!isUnifiedClientInterface) return [3 /*break*/, 4];
                            form = eContext.getFormContext();
                            userId = form.data.entity.getId().replace(/[{}]/g, "");
                            if (!(form.ui.getFormType() == 2)) return [3 /*break*/, 4];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, getDualInspectorRoleId(form)];
                        case 2:
                            id = _a.sent();
                            if (id) {
                                dualInspectorRoleId = id;
                                checkIfUserHasDualInspectorRole(form);
                            }
                            form.getControl("ts_dualinspector").setVisible(true);
                            return [3 /*break*/, 4];
                        case 3:
                            error_1 = _a.sent();
                            console.error('Error:', error_1);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        User.onLoad = onLoad;
        function getDualInspectorRoleId(form) {
            var _a, _b, _c, _d;
            //There are multiple ROM - Dual Inspector roles, so we need to retrieve the correct one corresponding to the user business unit
            var userBusinessUnitIdAttribute = form.getAttribute("businessunitid");
            var userBusinessUnitIdAttributeValue = (_d = (_c = (_b = (_a = userBusinessUnitIdAttribute === null || userBusinessUnitIdAttribute === void 0 ? void 0 : userBusinessUnitIdAttribute.getValue()) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.id) === null || _c === void 0 ? void 0 : _c.replace(/[{}]/g, "")) !== null && _d !== void 0 ? _d : "";
            return Xrm.WebApi.retrieveMultipleRecords("role", "?$select=name,_businessunitid_value&$filter=name eq 'ROM - Dual Inspector' and _businessunitid_value eq '" + userBusinessUnitIdAttributeValue + "'").then(function success(result) {
                if (result.entities.length === 0)
                    throw new Error('Role not found');
                // Retrieve the role id
                dualInspectorRoleId = result.entities[0].roleid;
                return dualInspectorRoleId;
            });
        }
        function checkIfUserHasDualInspectorRole(form) {
            return __awaiter(this, void 0, void 0, function () {
                var result, error_2;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 4, , 5]);
                            return [4 /*yield*/, Xrm.WebApi.retrieveRecord("systemuser", userId, "?$expand=systemuserroles_association($select=roleid)")];
                        case 1:
                            result = _a.sent();
                            if (!result.systemuserroles_association) return [3 /*break*/, 3];
                            if (result.systemuserroles_association.find(function (role) { return role.roleid === dualInspectorRoleId; })) { // If the user has the Dual Inspector role
                                form.getAttribute("ts_dualinspector").setValue(true);
                            }
                            else {
                                form.getAttribute("ts_dualinspector").setValue(false);
                            }
                            form.getControl("ts_dualinspector").setDisabled(false);
                            return [4 /*yield*/, form.data.save()];
                        case 2:
                            _a.sent();
                            return [2 /*return*/, true];
                        case 3: return [3 /*break*/, 5];
                        case 4:
                            error_2 = _a.sent();
                            console.error('Error:', error_2);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/, false];
                    }
                });
            });
        }
        function dualInspectorToggleOnChange(eContext) {
            if (isUnifiedClientInterface) {
                var form_1 = eContext.getFormContext();
                var dualInspectorToggleAttribute_1 = form_1.getAttribute("ts_dualinspector");
                if (dualInspectorToggleAttribute_1 != null) {
                    form_1.getControl("ts_dualinspector").setDisabled(true);
                    var dualInspectorToggleAttributeValue_1 = dualInspectorToggleAttribute_1.getValue();
                    Xrm.Utility.showProgressIndicator(dualInspectorToggleAttributeValue_1 ? "Adding ROM - Dual Inspector role..." : "Removing ROM - Dual Inspector role...");
                    var operation = dualInspectorToggleAttributeValue_1 == true
                        ? 'POST'
                        : 'DELETE';
                    var operationUrl = dualInspectorToggleAttributeValue_1 == true
                        ? clientUrl + "/api/data/v9.2/systemusers(" + userId + ")/systemuserroles_association/$ref"
                        : clientUrl + "/api/data/v9.2/systemusers(" + userId + ")/systemuserroles_association/$ref?$id=" + clientUrl + "/api/data/v9.2/roles(" + dualInspectorRoleId + ")";
                    var operationError_1 = dualInspectorToggleAttributeValue_1 == true
                        ? 'Failed to add role to user'
                        : 'Failed to remove role from user';
                    var body = void 0;
                    if (operation == 'POST') {
                        body = JSON.stringify({ "@odata.id": clientUrl + "/api/data/v9.2/roles(" + dualInspectorRoleId + ")" });
                    }
                    fetch(operationUrl, {
                        method: operation,
                        headers: {
                            'OData-MaxVersion': '4.0',
                            'OData-Version': '4.0',
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: body,
                    }).then(function (response) {
                        if (!response.ok)
                            throw new Error(operationError_1);
                        else {
                            form_1.data.save().then(function () { return Xrm.Utility.closeProgressIndicator(); });
                        }
                    }).catch(function (error) {
                        dualInspectorToggleAttribute_1.setValue(!dualInspectorToggleAttributeValue_1);
                        Xrm.Utility.closeProgressIndicator();
                        Xrm.Navigation.openAlertDialog({ text: error, title: "Error" });
                        form_1.getControl("ts_dualinspector").setDisabled(false);
                    });
                    form_1.getControl("ts_dualinspector").setDisabled(false);
                }
            }
        }
        User.dualInspectorToggleOnChange = dualInspectorToggleOnChange;
    })(User = ROM.User || (ROM.User = {}));
})(ROM || (ROM = {}));
