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
    var Finding;
    (function (Finding) {
        var lang = Xrm.Utility.getGlobalContext().userSettings.languageId;
        function onLoad(eContext) {
            //If Observation, keep everything hidden
            var formContext = eContext.getFormContext();
            var findingType = formContext.getAttribute("ts_findingtype").getValue();
            if (findingType != 717750002 /* Noncompliance */)
                return;
            var userId = Xrm.Utility.getGlobalContext().userSettings.userId;
            var currentUserBusinessUnitFetchXML = [
                "<fetch top='50'>",
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
            Xrm.WebApi.retrieveMultipleRecords("businessunit", currentUserBusinessUnitFetchXML).then(function (result) {
                var userBusinessUnitName = result.entities[0].name;
                //Show NCAT Sections and fields when the user is in Transport Canada or ISSO business unit
                if (userBusinessUnitName.startsWith("Transport") || userBusinessUnitName.startsWith("Intermodal")) {
                    formContext.ui.tabs.get("summary").sections.get("NCAT_main_section").setVisible(true);
                    formContext.getControl("ts_ncatfinalenforcementaction").setVisible(true);
                    NCATEnforcementRecommendationOnChange(eContext);
                    //If they did not accept the ncat recommendation, show proposal sections and fields
                    if (formContext.getAttribute("ts_acceptncatrecommendation").getValue() == 717750001 /* No */) {
                        formContext.ui.tabs.get("summary").sections.get("NCAT_proposed_section").setVisible(true);
                        AcceptNCATRecommendationOnChange(eContext);
                    }
                }
                //Show RATE Sections and fields when the user is in Transport Canada or Aviation Security business unit
                if (userBusinessUnitName.startsWith("Transport") || userBusinessUnitName.startsWith("Aviation")) {
                    formContext.ui.tabs.get("summary").sections.get("RATE_main_section").setVisible(true);
                    formContext.getControl("ts_ratefinalenforcementaction").setVisible(true);
                    RATEEnforcementRecommendationOnChange(eContext);
                    //If they did not accept the rate recommendation, show proposal sections and fields
                    if (formContext.getAttribute("ts_acceptraterecommendation").getValue() == 717750001 /* No */) {
                        formContext.ui.tabs.get("summary").sections.get("RATE_proposed_section").setVisible(true);
                        AcceptRATERecommendationOnChange(eContext);
                    }
                }
            });
        }
        Finding.onLoad = onLoad;
        //If all NCAT Fields are set, calculate and set the recommended enforcement
        function NCATFieldOnChange(eContext) {
            return __awaiter(this, void 0, void 0, function () {
                var formContext, factor1Value, factor2Value, factor3Value, factor4Value, factor5Value, factor6Value, factor7Value, factor1AssessmentRatingId, factor2AssessmentRatingId, factor3AssessmentRatingId, factor4AssessmentRatingId, factor5AssessmentRatingId, factor6AssessmentRatingId, factor7AssessmentRatingId, factor1AssessmentRatingPromise, factor2AssessmentRatingPromise, factor3AssessmentRatingPromise, factor4AssessmentRatingPromise, factor5AssessmentRatingPromise, factor6AssessmentRatingPromise, factor7AssessmentRatingPromise, thresholdsPromise;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            formContext = eContext.getFormContext();
                            factor1Value = formContext.getAttribute("ts_ncatactualorpotentialharm").getValue();
                            factor2Value = formContext.getAttribute("ts_ncatcompliancehistory").getValue();
                            factor3Value = formContext.getAttribute("ts_ncatcooperationwithinspectionorinvestigat").getValue();
                            factor4Value = formContext.getAttribute("ts_ncatdetectionofnoncompliances").getValue();
                            factor5Value = formContext.getAttribute("ts_ncateconomicbenefit").getValue();
                            factor6Value = formContext.getAttribute("ts_ncatintentionality").getValue();
                            factor7Value = formContext.getAttribute("ts_ncatmitigationofnoncompliantbehaviors").getValue();
                            //If any of the ncat factors don't have a value, reset any fields that require an enforcement recommendation
                            if (factor1Value == null || factor2Value == null || factor3Value == null || factor4Value == null || factor5Value == null || factor6Value == null || factor7Value == null) {
                                formContext.getAttribute("ts_ncatenforcementrecommendation").setValue(null);
                                formContext.getAttribute("ts_acceptncatrecommendation").setValue(null);
                                formContext.getAttribute("ts_ncatinspectorrecommendation").setRequiredLevel("none");
                                formContext.getAttribute("ts_ncatinspectorrecommendation").setValue(null);
                                formContext.getControl("ts_ncatinspectorrecommendation").setVisible(false);
                                formContext.getAttribute("ts_ncatenforcementjustification").setRequiredLevel("none");
                                formContext.getAttribute("ts_ncatenforcementjustification").setValue(null);
                                formContext.getControl("ts_ncatenforcementjustification").setVisible(false);
                                formContext.getControl("ts_acceptncatrecommendation").setVisible(false);
                                formContext.getAttribute("ts_ncatfinalenforcementaction").setValue(null);
                                return [2 /*return*/, true];
                            }
                            factor1AssessmentRatingId = factor1Value[0].id;
                            factor2AssessmentRatingId = factor2Value[0].id;
                            factor3AssessmentRatingId = factor3Value[0].id;
                            factor4AssessmentRatingId = factor4Value[0].id;
                            factor5AssessmentRatingId = factor5Value[0].id;
                            factor6AssessmentRatingId = factor6Value[0].id;
                            factor7AssessmentRatingId = factor7Value[0].id;
                            factor1AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor1AssessmentRatingId, "?$select=ts_weight");
                            factor2AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor2AssessmentRatingId, "?$select=ts_weight");
                            factor3AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor3AssessmentRatingId, "?$select=ts_weight");
                            factor4AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor4AssessmentRatingId, "?$select=ts_weight");
                            factor5AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor5AssessmentRatingId, "?$select=ts_weight");
                            factor6AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor6AssessmentRatingId, "?$select=ts_weight");
                            factor7AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor7AssessmentRatingId, "?$select=ts_weight");
                            thresholdsPromise = Xrm.WebApi.retrieveMultipleRecords("ts_assessmentscorethredshots", "?$select=ts_minimum,ts_maximum,ts_ncatenforcementaction&$filter=ts_assessmenttool eq " + 717750000 /* NCAT */);
                            //Wait for all factors the retrieve, then calculate and set the enforcement recommendation
                            return [4 /*yield*/, Promise.all([factor1AssessmentRatingPromise, factor2AssessmentRatingPromise, factor3AssessmentRatingPromise, factor4AssessmentRatingPromise, factor5AssessmentRatingPromise, factor6AssessmentRatingPromise, factor7AssessmentRatingPromise, thresholdsPromise]).then(function (factorPromises) {
                                    var totalWeight = 0;
                                    for (var i = 0; i < 7; i++) { //The first 7 are the assessment ratings
                                        totalWeight += factorPromises[i].ts_weight;
                                    }
                                    var enforcementResponseChoiceNumber = null;
                                    //Loop through all the thresholds, if the total weight is between a min and max, set its enforcement action to the enforcement recommendation
                                    for (var _i = 0, _a = factorPromises[7].entities; _i < _a.length; _i++) {
                                        var threshold = _a[_i];
                                        var min = threshold.ts_minimum;
                                        var max = threshold.ts_maximum;
                                        if (totalWeight >= min && totalWeight <= max) {
                                            enforcementResponseChoiceNumber = threshold.ts_ncatenforcementaction;
                                            break;
                                        }
                                    }
                                    formContext.getAttribute("ts_ncatenforcementrecommendation").setValue(enforcementResponseChoiceNumber);
                                    formContext.getControl("ts_acceptncatrecommendation").setVisible(true);
                                    formContext.getAttribute("ts_ncatinspectorrecommendation").setValue(null);
                                })];
                        case 1:
                            //Wait for all factors the retrieve, then calculate and set the enforcement recommendation
                            _a.sent();
                            return [2 /*return*/, true];
                    }
                });
            });
        }
        Finding.NCATFieldOnChange = NCATFieldOnChange;
        //If all RATE Fields are set, calculate and set the recommended enforcement
        function RATEFieldOnChange(eContext) {
            return __awaiter(this, void 0, void 0, function () {
                var formContext, factor1Value, factor2Value, factor3Value, factor4Value, factor5Value, factor6Value, factor7Value, factor1AssessmentRatingId, factor2AssessmentRatingId, factor3AssessmentRatingId, factor4AssessmentRatingId, factor5AssessmentRatingId, factor6AssessmentRatingId, factor7AssessmentRatingId, factor1AssessmentRatingPromise, factor2AssessmentRatingPromise, factor3AssessmentRatingPromise, factor4AssessmentRatingPromise, factor5AssessmentRatingPromise, factor6AssessmentRatingPromise, factor7AssessmentRatingPromise, thresholdsPromise;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            formContext = eContext.getFormContext();
                            factor1Value = formContext.getAttribute("ts_rateactualorpotentialharm").getValue();
                            factor2Value = formContext.getAttribute("ts_ratecompliancehistory").getValue();
                            factor3Value = formContext.getAttribute("ts_ratecooperationwithinspectionorinvestigat").getValue();
                            factor4Value = formContext.getAttribute("ts_ratedetectionofnoncompliances").getValue();
                            factor5Value = formContext.getAttribute("ts_rateeconomicbenefit").getValue();
                            factor6Value = formContext.getAttribute("ts_rateintentionality").getValue();
                            factor7Value = formContext.getAttribute("ts_ratemitigationofnoncompliantbehaviors").getValue();
                            //If any of the rate factors don't have a value, reset any fields that require an enforcement recommendation
                            if (factor1Value == null || factor2Value == null || factor3Value == null || factor4Value == null || factor5Value == null || factor6Value == null || factor7Value == null) {
                                formContext.getAttribute("ts_rateenforcementrecommendation").setValue(null);
                                formContext.getAttribute("ts_acceptraterecommendation").setValue(null);
                                formContext.getAttribute("ts_rateinspectorrecommendation").setRequiredLevel("none");
                                formContext.getAttribute("ts_rateinspectorrecommendation").setValue(null);
                                formContext.getControl("ts_rateinspectorrecommendation").setVisible(false);
                                formContext.getAttribute("ts_rateenforcementjustification").setRequiredLevel("none");
                                formContext.getAttribute("ts_rateenforcementjustification").setValue(null);
                                formContext.getControl("ts_rateenforcementjustification").setVisible(false);
                                formContext.getControl("ts_acceptraterecommendation").setVisible(false);
                                formContext.getAttribute("ts_ratefinalenforcementaction").setValue(null);
                                return [2 /*return*/, true];
                            }
                            factor1AssessmentRatingId = factor1Value[0].id;
                            factor2AssessmentRatingId = factor2Value[0].id;
                            factor3AssessmentRatingId = factor3Value[0].id;
                            factor4AssessmentRatingId = factor4Value[0].id;
                            factor5AssessmentRatingId = factor5Value[0].id;
                            factor6AssessmentRatingId = factor6Value[0].id;
                            factor7AssessmentRatingId = factor7Value[0].id;
                            factor1AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor1AssessmentRatingId, "?$select=ts_weight");
                            factor2AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor2AssessmentRatingId, "?$select=ts_weight");
                            factor3AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor3AssessmentRatingId, "?$select=ts_weight");
                            factor4AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor4AssessmentRatingId, "?$select=ts_weight");
                            factor5AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor5AssessmentRatingId, "?$select=ts_weight");
                            factor6AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor6AssessmentRatingId, "?$select=ts_weight");
                            factor7AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor7AssessmentRatingId, "?$select=ts_weight");
                            thresholdsPromise = Xrm.WebApi.retrieveMultipleRecords("ts_assessmentscorethredshots", "?$select=ts_minimum,ts_maximum,ts_ncatenforcementaction&$filter=ts_assessmenttool eq " + 717750000 /* NCAT */);
                            //Wait for all factors the retrieve, then calculate and set the enforcement recommendation
                            return [4 /*yield*/, Promise.all([factor1AssessmentRatingPromise, factor2AssessmentRatingPromise, factor3AssessmentRatingPromise, factor4AssessmentRatingPromise, factor5AssessmentRatingPromise, factor6AssessmentRatingPromise, factor7AssessmentRatingPromise, thresholdsPromise]).then(function (factorPromises) {
                                    var totalWeight = 0;
                                    for (var i = 0; i < 7; i++) { //The first 7 are the assessment ratings
                                        totalWeight += factorPromises[i].ts_weight;
                                    }
                                    var enforcementResponseChoiceNumber = null;
                                    //Loop through all the thresholds, if the total weight is between a min and max, set its enforcement action to the enforcement recommendation
                                    for (var _i = 0, _a = factorPromises[7].entities; _i < _a.length; _i++) {
                                        var threshold = _a[_i];
                                        var min = threshold.ts_minimum;
                                        var max = threshold.ts_maximum;
                                        if (totalWeight >= min && totalWeight <= max) {
                                            enforcementResponseChoiceNumber = threshold.ts_ncatenforcementaction;
                                            break;
                                        }
                                    }
                                    formContext.getAttribute("ts_rateenforcementrecommendation").setValue(enforcementResponseChoiceNumber);
                                    formContext.getControl("ts_acceptraterecommendation").setVisible(true);
                                    formContext.getAttribute("ts_rateinspectorrecommendation").setValue(null);
                                })];
                        case 1:
                            //Wait for all factors the retrieve, then calculate and set the enforcement recommendation
                            _a.sent();
                            return [2 /*return*/, true];
                    }
                });
            });
        }
        Finding.RATEFieldOnChange = RATEFieldOnChange;
        function AcceptNCATRecommendationOnChange(eContext) {
            var formContext = eContext.getFormContext();
            var acceptNCATRecommendation = formContext.getAttribute("ts_acceptncatrecommendation").getValue();
            //If they did not accept the NCAT recommendation
            if (acceptNCATRecommendation == 717750001 /* No */) {
                //Show Inspector Recommendation
                formContext.getControl("ts_ncatinspectorrecommendation").setVisible(true);
                //Require Inspector Recommendation
                formContext.getAttribute("ts_ncatinspectorrecommendation").setRequiredLevel("required");
                //Show Enforcement Justification
                formContext.getControl("ts_ncatenforcementjustification").setVisible(true);
                //Require Enforcement Justification
                formContext.getAttribute("ts_ncatenforcementjustification").setRequiredLevel("required");
                //Clear final enforcement action, in case it was set before
                formContext.getAttribute("ts_ncatfinalenforcementaction").setValue(null);
                var adminRoleId_1 = "ca432c33-29a1-eb11-b1ac-000d3ae8bbe0";
                var managerRoleId_1 = "85e36d25-29f5-eb11-94ef-000d3af36036";
                var userRoles = Xrm.Utility.getGlobalContext().userSettings.roles;
                //If the user is a system admin or ROM - Manager, show the NCAT manager review section
                var isAdminOrManager_1 = false;
                userRoles.forEach(function (role) {
                    if (role.id == adminRoleId_1 || role.id == managerRoleId_1) {
                        isAdminOrManager_1 = true;
                    }
                });
                if (isAdminOrManager_1)
                    formContext.ui.tabs.get("summary").sections.get("NCAT_manager_review").setVisible(true);
            }
            else {
                if (acceptNCATRecommendation == 717750000 /* Yes */) {
                    //Set NCAT Final Enforcement Action to the Enforcement Recommendation
                    var enforcementRecommendation = formContext.getAttribute("ts_ncatenforcementrecommendation").getValue();
                    formContext.getAttribute("ts_ncatfinalenforcementaction").setValue(enforcementRecommendation);
                }
                //Clear Inspector Recommendation
                formContext.getAttribute("ts_ncatinspectorrecommendation").setValue(null);
                //Hide Inspector Recommendation
                formContext.getControl("ts_ncatinspectorrecommendation").setVisible(false);
                //Not Require Inspector Recommendation
                formContext.getAttribute("ts_ncatinspectorrecommendation").setRequiredLevel("none");
                //Clear Enforcement Justification
                formContext.getAttribute("ts_ncatenforcementjustification").setValue(null);
                //Hide Enforcement Justification
                formContext.getControl("ts_ncatenforcementjustification").setVisible(false);
                //Not Require Enforcement Justification
                formContext.getAttribute("ts_ncatenforcementjustification").setRequiredLevel("none");
                //Hide NCAT Manager Review section
                formContext.ui.tabs.get("summary").sections.get("NCAT_manager_review").setVisible(false);
                //Clear NCAT Manager Review section fields
                formContext.getAttribute("ts_ncatmanageralternativerecommendation").setValue(null);
                formContext.getAttribute("ts_ncatmanagerdecision").setValue(null);
                formContext.getAttribute("ts_ncatmanagerenforcementjustification").setValue(null);
            }
        }
        Finding.AcceptNCATRecommendationOnChange = AcceptNCATRecommendationOnChange;
        function AcceptRATERecommendationOnChange(eContext) {
            var formContext = eContext.getFormContext();
            var acceptRATERecommendation = formContext.getAttribute("ts_acceptraterecommendation").getValue();
            //If they did not accept the RATE recommendation
            if (acceptRATERecommendation == 717750001 /* No */) {
                //Show Inspector Recommendation
                formContext.getControl("ts_rateinspectorrecommendation").setVisible(true);
                //Require Inspector Recommendation
                formContext.getAttribute("ts_rateinspectorrecommendation").setRequiredLevel("required");
                //Show Enforcement Justification
                formContext.getControl("ts_rateenforcementjustification").setVisible(true);
                //Require Enforcement Justification
                formContext.getAttribute("ts_rateenforcementjustification").setRequiredLevel("required");
                //Clear final enforcement action, in case it was set before
                formContext.getAttribute("ts_ratefinalenforcementaction").setValue(null);
                var adminRoleId_2 = "ca432c33-29a1-eb11-b1ac-000d3ae8bbe0";
                var managerRoleId_2 = "85e36d25-29f5-eb11-94ef-000d3af36036";
                var userRoles = Xrm.Utility.getGlobalContext().userSettings.roles;
                //If the user is a system admin or ROM - Manager, show the RATE manager review section
                var isAdminOrManager_2 = false;
                userRoles.forEach(function (role) {
                    if (role.id == adminRoleId_2 || role.id == managerRoleId_2) {
                        isAdminOrManager_2 = true;
                    }
                });
                if (isAdminOrManager_2)
                    formContext.ui.tabs.get("summary").sections.get("RATE_manager_review").setVisible(true);
            }
            else {
                if (acceptRATERecommendation == 717750000 /* Yes */) {
                    //Set RATE Final Enforcement Action to the Enforcement Recommendation
                    var enforcementRecommendation = formContext.getAttribute("ts_rateenforcementrecommendation").getValue();
                    formContext.getAttribute("ts_ratefinalenforcementaction").setValue(enforcementRecommendation);
                }
                //Clear Inspector Recommendation
                formContext.getAttribute("ts_rateinspectorrecommendation").setValue(null);
                //Hide Inspector Recommendation
                formContext.getControl("ts_rateinspectorrecommendation").setVisible(false);
                //Not Require Inspector Recommendation
                formContext.getAttribute("ts_rateinspectorrecommendation").setRequiredLevel("none");
                //Clear Enforcement Justification
                formContext.getAttribute("ts_rateenforcementjustification").setValue(null);
                //Hide Enforcement Justification
                formContext.getControl("ts_rateenforcementjustification").setVisible(false);
                //Not Require Enforcement Justification
                formContext.getAttribute("ts_rateenforcementjustification").setRequiredLevel("none");
                //Hide RATE Manager Review section
                formContext.ui.tabs.get("summary").sections.get("RATE_manager_review").setVisible(false);
                //Clear RATE Manager Review section fields
                formContext.getAttribute("ts_ratemanageralternativerecommendation").setValue(null);
                formContext.getAttribute("ts_ratemanagerdecision").setValue(null);
                formContext.getAttribute("ts_ratemanagerenforcementjustification").setValue(null);
            }
        }
        Finding.AcceptRATERecommendationOnChange = AcceptRATERecommendationOnChange;
        function NCATEnforcementRecommendationOnChange(eContext) {
            var formContext = eContext.getFormContext();
            var NCATEnforcementRecommendation = formContext.getAttribute("ts_ncatenforcementrecommendation").getValue();
            if (NCATEnforcementRecommendation != null) {
                //Show Accept NCAT Recommendation
                formContext.getControl("ts_acceptncatrecommendation").setVisible(true);
            }
            else {
                //Hide Accept NCAT Recommendation
                formContext.getControl("ts_acceptncatrecommendation").setVisible(false);
                //Clear Accept NCAT Recommendation
                formContext.getAttribute("ts_acceptncatrecommendation").setValue(null);
            }
        }
        Finding.NCATEnforcementRecommendationOnChange = NCATEnforcementRecommendationOnChange;
        function RATEEnforcementRecommendationOnChange(eContext) {
            var formContext = eContext.getFormContext();
            var RATEEnforcementRecommendation = formContext.getAttribute("ts_rateenforcementrecommendation").getValue();
            if (RATEEnforcementRecommendation != null) {
                //Show Accept RATE Recommendation
                formContext.getControl("ts_acceptraterecommendation").setVisible(true);
            }
            else {
                //Hide Accept RATE Recommendation
                formContext.getControl("ts_acceptraterecommendation").setVisible(false);
                //Clear Accept RATE Recommendation
                formContext.getAttribute("ts_acceptraterecommendation").setValue(null);
            }
        }
        Finding.RATEEnforcementRecommendationOnChange = RATEEnforcementRecommendationOnChange;
        function NCATInspectorRecommendationOnChange(eContext) {
            var formContext = eContext.getFormContext();
            var NCATInspectorRecommendation = formContext.getAttribute("ts_ncatinspectorrecommendation").getValue();
            var NCATEnforcementRecommendation = formContext.getAttribute("ts_ncatenforcementrecommendation").getValue();
            //Reset NCAT Final Enforcement Action and any Manager fields
            formContext.getAttribute("ts_ncatfinalenforcementaction").setValue(null);
            formContext.getAttribute("ts_ncatmanageralternativerecommendation").setValue(null);
            formContext.getAttribute("ts_ncatmanagerdecision").setValue(null);
            formContext.getAttribute("ts_ncatmanagerenforcementjustification").setValue(null);
            if (NCATInspectorRecommendation != null && NCATEnforcementRecommendation != null && NCATInspectorRecommendation == NCATEnforcementRecommendation) {
                if (lang == 1036) {
                    formContext.getControl("ts_ncatinspectorrecommendation").setNotification("ne peut pas correspondre " + formContext.getControl("ts_ncatenforcementrecommendation").getLabel());
                }
                else {
                    formContext.getControl("ts_ncatinspectorrecommendation").setNotification("cannot match " + formContext.getControl("ts_ncatenforcementrecommendation").getLabel());
                }
            }
            else {
                formContext.getControl("ts_ncatinspectorrecommendation").clearNotification();
            }
        }
        Finding.NCATInspectorRecommendationOnChange = NCATInspectorRecommendationOnChange;
        function RATEInspectorRecommendationOnChange(eContext) {
            var formContext = eContext.getFormContext();
            var RATEInspectorRecommendation = formContext.getAttribute("ts_rateinspectorrecommendation").getValue();
            var RATEEnforcementRecommendation = formContext.getAttribute("ts_rateenforcementrecommendation").getValue();
            //Reset RATE Final Enforcement Action and any Manager fields
            formContext.getAttribute("ts_ratefinalenforcementaction").setValue(null);
            formContext.getAttribute("ts_ratemanageralternativerecommendation").setValue(null);
            formContext.getAttribute("ts_ratemanagerdecision").setValue(null);
            formContext.getAttribute("ts_ratemanagerenforcementjustification").setValue(null);
            if (RATEInspectorRecommendation != null && RATEEnforcementRecommendation != null && RATEInspectorRecommendation == RATEEnforcementRecommendation) {
                if (lang == 1036) {
                    formContext.getControl("ts_rateinspectorrecommendation").setNotification("ne peut pas correspondre " + formContext.getControl("ts_rateenforcementrecommendation").getLabel());
                }
                else {
                    formContext.getControl("ts_rateinspectorrecommendation").setNotification("cannot match " + formContext.getControl("ts_rateenforcementrecommendation").getLabel());
                }
            }
            else {
                formContext.getControl("ts_rateinspectorrecommendation").clearNotification();
            }
        }
        Finding.RATEInspectorRecommendationOnChange = RATEInspectorRecommendationOnChange;
        function NCATManagerDecisionOnChange(eContext) {
            var formContext = eContext.getFormContext();
            var NCATManagerDecision = formContext.getAttribute("ts_ncatmanagerdecision").getValue();
            if (NCATManagerDecision == 717750000 /* AcceptInspectorRecommendation */) {
                formContext.getAttribute("ts_ncatfinalenforcementaction").setValue(formContext.getAttribute("ts_ncatinspectorrecommendation").getValue());
                formContext.getControl("ts_ncatmanageralternativerecommendation").setVisible(false);
                formContext.getControl("ts_ncatmanageralternativerecommendation").clearNotification();
                formContext.getAttribute("ts_ncatmanageralternativerecommendation").setValue(null);
            }
            else if (NCATManagerDecision == 717750001 /* AcceptNCATRecommendation */) {
                formContext.getAttribute("ts_ncatfinalenforcementaction").setValue(formContext.getAttribute("ts_ncatenforcementrecommendation").getValue());
                formContext.getControl("ts_ncatmanageralternativerecommendation").setVisible(false);
                formContext.getControl("ts_ncatmanageralternativerecommendation").clearNotification();
                formContext.getAttribute("ts_ncatmanageralternativerecommendation").setValue(null);
            }
            else if (NCATManagerDecision == 717750002 /* ProvideAlternativeRecommendation */) {
                formContext.getControl("ts_ncatmanageralternativerecommendation").setVisible(true);
                formContext.getAttribute("ts_ncatfinalenforcementaction").setValue(null);
            }
            else {
                formContext.getControl("ts_ncatmanageralternativerecommendation").setVisible(false);
                formContext.getControl("ts_ncatmanageralternativerecommendation").clearNotification();
                formContext.getAttribute("ts_ncatmanageralternativerecommendation").setValue(null);
                formContext.getAttribute("ts_ncatfinalenforcementaction").setValue(null);
            }
        }
        Finding.NCATManagerDecisionOnChange = NCATManagerDecisionOnChange;
        function RATEManagerDecisionOnChange(eContext) {
            var formContext = eContext.getFormContext();
            var RATEManagerDecision = formContext.getAttribute("ts_ratemanagerdecision").getValue();
            if (RATEManagerDecision == 717750000 /* AcceptInspectorRecommendation */) {
                formContext.getAttribute("ts_ratefinalenforcementaction").setValue(formContext.getAttribute("ts_rateinspectorrecommendation").getValue());
                formContext.getControl("ts_ratemanageralternativerecommendation").setVisible(false);
                formContext.getAttribute("ts_ratemanageralternativerecommendation").setValue(null);
            }
            else if (RATEManagerDecision == 717750001 /* AcceptRATERecommendation */) {
                formContext.getAttribute("ts_ratefinalenforcementaction").setValue(formContext.getAttribute("ts_rateenforcementrecommendation").getValue());
                formContext.getControl("ts_ratemanageralternativerecommendation").setVisible(false);
                formContext.getAttribute("ts_ratemanageralternativerecommendation").setValue(null);
            }
            else if (RATEManagerDecision == 717750002 /* ProvideAlternativeRecommendation */) {
                formContext.getControl("ts_ratemanageralternativerecommendation").setVisible(true);
                formContext.getAttribute("ts_ratefinalenforcementaction").setValue(null);
            }
            else {
                formContext.getControl("ts_ratemanageralternativerecommendation").setVisible(false);
                formContext.getAttribute("ts_ratemanageralternativerecommendation").setValue(null);
                formContext.getAttribute("ts_ratefinalenforcementaction").setValue(null);
            }
        }
        Finding.RATEManagerDecisionOnChange = RATEManagerDecisionOnChange;
        function NCATManagerAlternativeRecommendaionOnChange(eContext) {
            var formContext = eContext.getFormContext();
            var NCATInspectorRecommendation = formContext.getAttribute("ts_ncatinspectorrecommendation").getValue();
            var NCATEnforcementRecommendation = formContext.getAttribute("ts_ncatenforcementrecommendation").getValue();
            var NCATManagerAlternativeRecommendation = formContext.getAttribute("ts_ncatmanageralternativerecommendation").getValue();
            formContext.getControl("ts_ncatmanageralternativerecommendation").clearNotification();
            if (NCATManagerAlternativeRecommendation != null && NCATManagerAlternativeRecommendation == NCATInspectorRecommendation) {
                if (lang == 1036) {
                    formContext.getControl("ts_ncatmanageralternativerecommendation").setNotification("ne peut pas correspondre " + formContext.getControl("ts_ncatinspectorrecommendation").getLabel());
                }
                else {
                    formContext.getControl("ts_ncatmanageralternativerecommendation").setNotification("cannot match " + formContext.getControl("ts_ncatinspectorrecommendation").getLabel());
                }
                formContext.getAttribute("ts_ncatfinalenforcementaction").setValue(null);
            }
            else if (NCATManagerAlternativeRecommendation != null && NCATManagerAlternativeRecommendation == NCATEnforcementRecommendation) {
                if (lang == 1036) {
                    formContext.getControl("ts_ncatmanageralternativerecommendation").setNotification("ne peut pas correspondre " + formContext.getControl("ts_ncatenforcementrecommendation").getLabel());
                }
                else {
                    formContext.getControl("ts_ncatmanageralternativerecommendation").setNotification("cannot match " + formContext.getControl("ts_ncatenforcementrecommendation").getLabel());
                }
                formContext.getAttribute("ts_ncatfinalenforcementaction").setValue(null);
            }
            else {
                formContext.getAttribute("ts_ncatfinalenforcementaction").setValue(formContext.getAttribute("ts_ncatmanageralternativerecommendation").getValue());
            }
        }
        Finding.NCATManagerAlternativeRecommendaionOnChange = NCATManagerAlternativeRecommendaionOnChange;
        function RATEManagerAlternativeRecommendaionOnChange(eContext) {
            var formContext = eContext.getFormContext();
            var RATEInspectorRecommendation = formContext.getAttribute("ts_rateinspectorrecommendation").getValue();
            var RATEEnforcementRecommendation = formContext.getAttribute("ts_rateenforcementrecommendation").getValue();
            var RATEManagerAlternativeRecommendation = formContext.getAttribute("ts_ratemanageralternativerecommendation").getValue();
            formContext.getControl("ts_ratemanageralternativerecommendation").clearNotification();
            if (RATEManagerAlternativeRecommendation != null && RATEManagerAlternativeRecommendation == RATEInspectorRecommendation) {
                if (lang == 1036) {
                    formContext.getControl("ts_ratemanageralternativerecommendation").setNotification("ne peut pas correspondre " + formContext.getControl("ts_rateinspectorrecommendation").getLabel());
                }
                else {
                    formContext.getControl("ts_ratemanageralternativerecommendation").setNotification("cannot match " + formContext.getControl("ts_rateinspectorrecommendation").getLabel());
                }
                formContext.getAttribute("ts_ratefinalenforcementaction").setValue(null);
            }
            else if (RATEManagerAlternativeRecommendation != null && RATEManagerAlternativeRecommendation == RATEEnforcementRecommendation) {
                if (lang == 1036) {
                    formContext.getControl("ts_ratemanageralternativerecommendation").setNotification("ne peut pas correspondre " + formContext.getControl("ts_rateenforcementrecommendation").getLabel());
                }
                else {
                    formContext.getControl("ts_ratemanageralternativerecommendation").setNotification("cannot match " + formContext.getControl("ts_rateenforcementrecommendation").getLabel());
                }
                formContext.getAttribute("ts_ratefinalenforcementaction").setValue(null);
            }
            else {
                formContext.getAttribute("ts_ratefinalenforcementaction").setValue(formContext.getAttribute("ts_ratemanageralternativerecommendation").getValue());
            }
        }
        Finding.RATEManagerAlternativeRecommendaionOnChange = RATEManagerAlternativeRecommendaionOnChange;
    })(Finding = ROM.Finding || (ROM.Finding = {}));
})(ROM || (ROM = {}));
