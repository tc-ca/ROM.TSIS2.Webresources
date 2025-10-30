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
    var NonOversightActivity;
    (function (NonOversightActivity) {
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            if (form.ui.getFormType() == 1) {
                setProgramToUserBusinessUnit(eContext);
            }
            //Set Overtime field visible for AvSec
            var userBusinessUnitName;
            var userId = Xrm.Utility.getGlobalContext().userSettings.userId;
            var currentUserBusinessUnitFetchXML = [
                "<fetch top='50'>",
                "  <entity name='businessunit'>",
                "    <attribute name='name' />",
                "    <attribute name='businessunitid' />",
                "    <link-entity name='systemuser' from='businessunitid' to='businessunitid' link-type='inner' alias='ab'>>",
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
                    var userBusinessUnitId, inAvSecBU;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                userBusinessUnitId = businessunit.entities[0].businessunitid;
                                return [4 /*yield*/, isAvSecBU(userBusinessUnitId)];
                            case 1:
                                inAvSecBU = _a.sent();
                                if (inAvSecBU) {
                                    form.getControl("ts_overtime").setVisible(true);
                                }
                                return [2 /*return*/];
                        }
                    });
                });
            });
        }
        NonOversightActivity.onLoad = onLoad;
        function dateOfActivityOnChange(eContext) {
            var form = eContext.getFormContext();
            var activityDate = form.getAttribute('ts_dateofactivity').getValue();
            if (activityDate != null) {
                var month = activityDate.getMonth();
                if (month < 3) { //Q4
                    form.getAttribute('ts_quarter').setValue(741130003 /* Q4 */);
                }
                else if (month >= 3 && month < 6) { //Q1
                    form.getAttribute('ts_quarter').setValue(741130000 /* Q1 */);
                }
                else if (month >= 6 && month < 9) { //Q2
                    form.getAttribute('ts_quarter').setValue(741130001 /* Q2 */);
                }
                else if (month >= 9 && month < 12) { //Q3
                    form.getAttribute('ts_quarter').setValue(741130002 /* Q3 */);
                }
                var fetchXML = "\n            <fetch version=\"1.0\" output-format=\"xml-platform\" mapping=\"logical\" distinct=\"false\">\n              <entity name=\"tc_tcfiscalyear\">\n                <attribute name=\"tc_tcfiscalyearid\" />\n                <attribute name=\"tc_name\" />\n                <attribute name=\"tc_tcfiscalyearid\" />\n                <order attribute=\"tc_name\" descending=\"false\" />\n                <filter type=\"and\">\n                  <condition attribute=\"tc_fiscalstart\" operator=\"on-or-before\" value=\"" + activityDate.toISOString().split('T')[0] + "\" />\n                  <condition attribute=\"tc_fiscalend\" operator=\"on-or-after\" value=\"" + activityDate.toISOString().split('T')[0] + "\" />\n                </filter>\n              </entity>\n            </fetch>\n            ";
                fetchXML = "?fetchXml=" + encodeURIComponent(fetchXML);
                debugger;
                Xrm.WebApi.retrieveMultipleRecords("tc_tcfiscalyear", fetchXML).then(function success(result) {
                    if (result.entities.length > 0) {
                        var targetedFiscalYear = result.entities[0];
                        var lookup = new Array();
                        lookup[0] = new Object();
                        lookup[0].id = targetedFiscalYear.tc_tcfiscalyearid;
                        lookup[0].name = targetedFiscalYear.tc_name;
                        lookup[0].entityType = 'tc_tcfiscalyear';
                        var test = form.getAttribute('ts_fiscalyear');
                        form.getAttribute('ts_fiscalyear').setValue(lookup);
                    }
                }, function (error) {
                });
            }
        }
        NonOversightActivity.dateOfActivityOnChange = dateOfActivityOnChange;
        function programOnChange(eContext) {
            return __awaiter(this, void 0, void 0, function () {
                var form, program, programId, isISSO, isAvSec;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            form = eContext.getFormContext();
                            program = form.getAttribute('ts_program').getValue();
                            if (!(program != null && program.length > 0)) return [3 /*break*/, 4];
                            programId = program[0].id.replace(/[{}]/g, "").toLowerCase();
                            return [4 /*yield*/, isISSOBU(programId)];
                        case 1:
                            isISSO = _a.sent();
                            if (!isISSO) return [3 /*break*/, 2];
                            form.getControl("ts_category").setDefaultView("e2efe0d1-0812-ee11-8f6e-0022483d7716"); //ISSO
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, isAvSecBU(programId)];
                        case 3:
                            isAvSec = _a.sent();
                            if (isAvSec) {
                                form.getControl("ts_category").setDefaultView("9956908f-0912-ee11-8f6e-0022483d7716"); //AvSec
                            }
                            else {
                                form.getControl("ts_category").setDefaultView("7b5c2ae7-3714-ee11-9cbe-0022483c5061"); //All (Transport or other)
                            }
                            _a.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        NonOversightActivity.programOnChange = programOnChange;
        function setProgramToUserBusinessUnit(eContext) {
            var form = eContext.getFormContext();
            var userId = Xrm.Utility.getGlobalContext().userSettings.userId;
            Xrm.WebApi.retrieveRecord("systemuser", userId.replace(/[{}]/g, ""), "?$select=_businessunitid_value").then(function success(result) {
                var lookup = new Array();
                lookup[0] = new Object();
                lookup[0].id = result["_businessunitid_value"];
                lookup[0].name = result["_businessunitid_value@OData.Community.Display.V1.FormattedValue"];
                lookup[0].entityType = 'businessunit';
                form.getAttribute('ts_program').setValue(lookup);
                programOnChange(eContext);
            }, function (error) {
                console.log(error.message);
            });
        }
    })(NonOversightActivity = ROM.NonOversightActivity || (ROM.NonOversightActivity = {}));
})(ROM || (ROM = {}));
