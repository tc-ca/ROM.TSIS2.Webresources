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
    var CauseFinding;
    (function (CauseFinding) {
        function onLoad(eContext) {
            return __awaiter(this, void 0, void 0, function () {
                var form, finding, record, viewId, entityName, viewDisplayName, fetchXml, layoutXml;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            form = eContext.getFormContext();
                            debugger;
                            finding = form.getAttribute("ts_finding").getValue();
                            if (!(finding != null)) return [3 /*break*/, 2];
                            return [4 /*yield*/, Xrm.WebApi.retrieveRecord('ovs_finding', finding[0].id, '?$select=ovs_finding,_ts_qm_rclegislation_value')];
                        case 1:
                            record = _a.sent();
                            if (record != null && record._ts_qm_rclegislation_value != null) {
                                viewId = '{3544CA89-0B3B-4456-8918-494DF3B1CD1C}';
                                entityName = "qm_rclegislation";
                                viewDisplayName = "Filtered Legislation";
                                fetchXml = "<fetch version=\"1.0\" mapping=\"logical\" no-lock=\"false\" distinct=\"true\">\n                          <entity name=\"qm_rclegislation\">\n                            <attribute name=\"qm_name\" />\n                            <attribute name=\"qm_legislationftxt\" />\n                            <attribute name=\"qm_legislationetxt\" />\n                            <attribute name=\"qm_rclegislationid\" />\n                            <order attribute=\"qm_name\" descending=\"false\" />\n                            <link-entity name=\"ts_qm_rclegislation_causes\" intersect=\"true\" visible=\"false\" from=\"qm_rclegislationidtwo\" to=\"qm_rclegislationid\">\n                              <link-entity name=\"qm_rclegislation\" alias=\"ai\" from=\"qm_rclegislationid\" to=\"qm_rclegislationidone\">\n                                <filter type=\"and\">\n                                  <condition attribute=\"qm_rclegislationid\" operator=\"eq\" value=\"" + record._ts_qm_rclegislation_value + "\"  uitype=\"qm_rclegislation\" />\n                                </filter>\n                              </link-entity>\n                            </link-entity>\n                          </entity>\n                        </fetch>";
                                layoutXml = '<grid name="resultset" object="2" jump="qm_name" select="1" icon="1" preview="1"><row name="result" id="qm_rclegislationid"><cell name="qm_name" width="300" /></row></grid>';
                                form.getControl("ts_cause").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                            }
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        }
        CauseFinding.onLoad = onLoad;
    })(CauseFinding = ROM.CauseFinding || (ROM.CauseFinding = {}));
})(ROM || (ROM = {}));
