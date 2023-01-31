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
        var factorLockMessageTitleLocalizedText = "Warning";
        var factorLockMessageBodyLocalizedText = 'All the factors of the tool will be locked when you select "OK".';
        if (lang == 1036) {
            factorLockMessageTitleLocalizedText = "Avertissement";
            factorLockMessageBodyLocalizedText = "Tous les facteurs de l'outil vont \u00EAtre verrouill\u00E9 lorsque vous s\u00E9lectionner \"OK\".";
        }
        var issoOperationTypeGuids = ["{B27E5003-C751-EB11-A812-000D3AF3AC0D}", "{C97A1A12-D8EB-EB11-BACB-000D3AF4FBEC}", "{21CA416A-431A-EC11-B6E7-000D3A09D067}", "{3B261029-C751-EB11-A812-000D3AF3AC0D}", "{D883B39A-C751-EB11-A812-000D3AF3AC0D}", "{DA56FEA1-C751-EB11-A812-000D3AF3AC0D}", "{199E31AE-C751-EB11-A812-000D3AF3AC0D}"];
        //Toggle visibility of NCAT and RATE sections depending user business unit and rolls
        //Sets field Controls parameters (required, hidden, disabled, etc) depending on current form state
        function onLoad(eContext) {
            var formContext = eContext.getFormContext();
            var complianceFindingType = formContext.getAttribute("ts_findingtype").getValue() == 717750002 /* Noncompliance */;
            var isDualInspector = false;
            var userRoles = Xrm.Utility.getGlobalContext().userSettings.roles;
            userRoles.forEach(function (role) {
                if (role.name == "ROM - Dual Inspector") {
                    isDualInspector = true;
                }
            });
            formContext.getAttribute("ts_ncatfactorguide").setValue(false);
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
            Xrm.WebApi.retrieveMultipleRecords("businessunit", currentUserBusinessUnitFetchXML).then(function (businessunit) {
                var userBusinessUnitName = businessunit.entities[0].name;
                var operationTypeAttributeValue = formContext.getAttribute("ts_ovs_operationtype").getValue();
                var operationTypeOwningBusinessUnit;
                if (operationTypeAttributeValue != null) {
                    var operationTypeOwningBusinessUnitFetchXML = [
                        "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true' no-lock='false'>",
                        "  <entity name='businessunit'>",
                        "    <attribute name='name'/>",
                        "    <attribute name='businessunitid'/>",
                        "    <link-entity name='ovs_operationtype' from='owningbusinessunit' to='businessunitid' link-type='inner'>",
                        "      <filter>",
                        "        <condition attribute='ovs_operationtypeid' operator='eq' value='", operationTypeAttributeValue[0].id, "'/>",
                        "      </filter>",
                        "    </link-entity>",
                        "  </entity>",
                        "</fetch>"
                    ].join("");
                    operationTypeOwningBusinessUnitFetchXML = "?fetchXml=" + encodeURIComponent(operationTypeOwningBusinessUnitFetchXML);
                    Xrm.WebApi.retrieveMultipleRecords("businessunit", operationTypeOwningBusinessUnitFetchXML).then(function (operationTypeBusinessUnit) {
                        operationTypeOwningBusinessUnit = operationTypeBusinessUnit.entities[0].name;
                        if (complianceFindingType) {
                            if (operationTypeAttributeValue != null) {
                                //Show NCAT Sections and fields if Operation Type is ISSO specific, else show RATE
                                if (issoOperationTypeGuids.includes(operationTypeAttributeValue[0].id)) {
                                    formContext.ui.tabs.get("tab_NCAT").setVisible(true);
                                    //If there's a recommended enforcement action and the finding is not complete yet, then the accept ncat recommendation field should be unlocked
                                    var enforcementRecommendation = formContext.getAttribute("ts_ncatenforcementrecommendation").getValue();
                                    var recordStatus = formContext.getAttribute("statuscode").getValue();
                                    if (enforcementRecommendation != null && recordStatus != 717750002 /* Complete */) {
                                        formContext.getControl("ts_acceptncatrecommendation").setDisabled(false);
                                    }
                                    //If they have accepted or rejected the NCAT recommendation previously, then the NCAT factors should be locked.
                                    var acceptNCATRecommendation = formContext.getAttribute("ts_acceptncatrecommendation").getValue();
                                    if (acceptNCATRecommendation != null) {
                                        lockNCATFactors(eContext);
                                    }
                                    //If they did not accept the ncat recommendation, show proposal sections and fields
                                    if (formContext.getAttribute("ts_acceptncatrecommendation").getValue() == 717750001 /* No */) {
                                        formContext.ui.tabs.get("tab_NCAT").sections.get("NCAT_proposed_section").setVisible(true);
                                        setPostNCATRecommendationSelectionFieldsVisibility(eContext);
                                        NCATManagerDecisionOnChange(eContext);
                                    }
                                }
                                //Show RATE Sections and fields when the operation type owning business unit is Aviation Security or if the user business unit is Transport Canada
                                else {
                                    formContext.ui.tabs.get("tab_RATE").setVisible(true);
                                    formContext.getControl("header_ts_rateenforcementrecommendation").setVisible(true);
                                    //If there's a recommended enforcement action and the finding is not complete yet, then the accept rate recommendation field should be unlocked
                                    var enforcementRecommendation = formContext.getAttribute("ts_rateenforcementrecommendation").getValue();
                                    var recordStatus = formContext.getAttribute("statuscode").getValue();
                                    if (enforcementRecommendation != null && recordStatus != 717750002 /* Complete */) {
                                        formContext.getControl("ts_acceptraterecommendation").setDisabled(false);
                                    }
                                    //If they have accepted or rejected the RATE recommendation previously, then the RATE factors should be locked.
                                    var acceptRATERecommendation = formContext.getAttribute("ts_acceptraterecommendation").getValue();
                                    if (acceptRATERecommendation != null) {
                                        lockRATEFactors(eContext);
                                    }
                                    //If they did not accept the rate recommendation, show proposal sections and fields
                                    if (formContext.getAttribute("ts_acceptraterecommendation").getValue() == 717750001 /* No */) {
                                        formContext.ui.tabs.get("tab_RATE").sections.get("RATE_proposed_section").setVisible(true);
                                        setPostRATERecommendationSelectionFieldsVisibility(eContext);
                                        RATEManagerDecisionOnChange(eContext);
                                    }
                                }
                            }
                            approvingNCATTeamsOnChange(eContext);
                            approvingRATETeamsOnChange(eContext);
                            RATESpecificComplianceHistoryOnChange(eContext);
                            setApprovingTeamsViews(formContext);
                            if (formContext.getAttribute("statuscode").getValue() == 717750002 /* Complete */) {
                                disableFormFields(formContext);
                            }
                            showHideNonComplianceTimeframe(formContext);
                        }
                        if (shouldShowISSOOnlyFields(isDualInspector, operationTypeOwningBusinessUnit, userBusinessUnitName)) {
                            formContext.getControl("ts_issueaddressedonsite").setVisible(true);
                            formContext.getControl("ts_notetostakeholder").setVisible(true);
                            formContext.getControl("ts_sensitivitylevel").setVisible(true);
                        }
                    });
                    if (operationTypeAttributeValue != null && operationTypeAttributeValue[0].id == "{BE8B0910-C751-EB11-A812-000D3AF3AC0D}") { //Person
                        formContext.getControl("ts_contact").setVisible(true);
                    }
                    else {
                        formContext.getControl("ts_contact").setVisible(false);
                    }
                }
            });
        }
        Finding.onLoad = onLoad;
        function shouldShowISSOOnlyFields(isDualInspector, operationTypeOwningBusinessUnit, userBusinessUnitName) {
            if ((operationTypeOwningBusinessUnit === null || operationTypeOwningBusinessUnit === void 0 ? void 0 : operationTypeOwningBusinessUnit.startsWith("Intermodal")) || userBusinessUnitName.startsWith("Intermodal")) {
                return true;
            }
            return false;
        }
        function onSave(eContext) {
            var formContext = eContext.getFormContext();
            var statusCodeAttribute = formContext.getAttribute("statuscode");
            var statusCodeValue = statusCodeAttribute.getValue();
            onLoad(eContext);
            if (statusCodeValue == 717750002 /* Complete */)
                return;
            var acceptNCATRecommendation = formContext.getAttribute("ts_acceptncatrecommendation").getValue();
            var acceptRATERecommendation = formContext.getAttribute("ts_acceptraterecommendation").getValue();
            var rejectedRecommendation = (acceptNCATRecommendation == 717750001 /* No */ || acceptRATERecommendation == 717750001 /* No */);
            var NCATManager = formContext.getAttribute("ts_ncatmanager").getValue();
            var RATEManager = formContext.getAttribute("ts_ratemanager").getValue();
            var hasManagerFieldPopulated = (NCATManager != null || RATEManager != null);
            if (rejectedRecommendation && hasManagerFieldPopulated) {
                statusCodeAttribute.setValue(717750001 /* Pending */);
            }
            else {
                statusCodeAttribute.setValue(717750000 /* InProgress */);
            }
        }
        Finding.onSave = onSave;
        //If all NCAT Fields are set, calculate and set the recommended enforcement
        function NCATFieldOnChange(eContext) {
            return __awaiter(this, void 0, void 0, function () {
                var formContext, factor1Value, factor2Value, factor3Value, factor4Value, factor5Value, factor6Value, factor7Value, factor1AssessmentRatingId, factor2AssessmentRatingId, factor3AssessmentRatingId, factor4AssessmentRatingId, factor5AssessmentRatingId, factor6AssessmentRatingId, factor7AssessmentRatingId, factor1AssessmentRatingPromise, factor2AssessmentRatingPromise, factor3AssessmentRatingPromise, factor4AssessmentRatingPromise, factor5AssessmentRatingPromise, factor6AssessmentRatingPromise, factor7AssessmentRatingPromise, thresholdsPromise;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            formContext = eContext.getFormContext();
                            //A factor has changed, so everything below needs to be reset
                            formContext.getAttribute("ts_ncatenforcementrecommendation").setValue(null);
                            formContext.getAttribute("ts_acceptncatrecommendation").setValue(null);
                            formContext.getControl("ts_acceptncatrecommendation").setDisabled(true);
                            NCATHideProposedSection(eContext);
                            factor1Value = formContext.getAttribute("ts_ncatactualorpotentialharm").getValue();
                            factor2Value = formContext.getAttribute("ts_ncatcompliancehistory").getValue();
                            factor3Value = formContext.getAttribute("ts_ncatcooperationwithinspectionorinvestigat").getValue();
                            factor4Value = formContext.getAttribute("ts_ncatdetectionofnoncompliances").getValue();
                            factor5Value = formContext.getAttribute("ts_ncateconomicbenefit").getValue();
                            factor6Value = formContext.getAttribute("ts_ncatintentionality").getValue();
                            factor7Value = formContext.getAttribute("ts_ncatmitigationofnoncompliantbehaviors").getValue();
                            //If any of the ncat factors don't have a value, reset any fields that require an enforcement recommendation
                            if (factor1Value == null || factor2Value == null || factor3Value == null || factor4Value == null || factor5Value == null || factor6Value == null || factor7Value == null) {
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
                                    formContext.getControl("ts_acceptncatrecommendation").setDisabled(false);
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
        //Show/hide NCAT Factor Guide
        function NCATFactorGuideOnChange(eContext) {
            var formContext = eContext.getFormContext();
            var NCATFactorGuide = formContext.getAttribute("ts_ncatfactorguide").getValue();
            var webResourceNCATFactorGuide = formContext.getControl("WebResource_NCATFactorGuide");
            if (NCATFactorGuide)
                webResourceNCATFactorGuide.setVisible(true);
            else
                webResourceNCATFactorGuide.setVisible(false);
        }
        Finding.NCATFactorGuideOnChange = NCATFactorGuideOnChange;
        //If all RATE Fields are set, calculate and set the recommended enforcement
        function RATEFieldOnChange(eContext) {
            return __awaiter(this, void 0, void 0, function () {
                var formContext;
                return __generator(this, function (_a) {
                    formContext = eContext.getFormContext();
                    //A factor has changed, so everything below needs to be reset
                    formContext.getAttribute("ts_rateenforcementrecommendation").setValue(null);
                    formContext.getAttribute("ts_acceptraterecommendation").setValue(null);
                    formContext.getControl("ts_acceptraterecommendation").setDisabled(true);
                    RATEHideProposedSection(eContext);
                    calculateRATEEnforcementRecommendation(eContext);
                    return [2 /*return*/, true];
                });
            });
        }
        Finding.RATEFieldOnChange = RATEFieldOnChange;
        //Calculate and set an Enforcement Recommendation with all RATE factors
        function calculateRATEEnforcementRecommendation(eContext) {
            return __awaiter(this, void 0, void 0, function () {
                var formContext, rateSpecificComplianceHistory, factor1Value, factor2Value, factor3Value, factor4Value, factor5Value, factor6Value, factor7Value, factor8Value, complianceHistory, enforcementHistory, factor1AssessmentRatingId, factor2AssessmentRatingId, factor3AssessmentRatingId, factor4AssessmentRatingId, factor5AssessmentRatingId, factor6AssessmentRatingId, factor7AssessmentRatingId, factor8AssessmentRatingId, factor1AssessmentRatingPromise, factor2AssessmentRatingPromise, factor3AssessmentRatingPromise, factor4AssessmentRatingPromise, factor5AssessmentRatingPromise, factor6AssessmentRatingPromise, factor7AssessmentRatingPromise, factor8AssessmentRatingPromise, thresholdsPromise;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            formContext = eContext.getFormContext();
                            rateSpecificComplianceHistory = formContext.getAttribute("ts_ratespecificcompliancehistory").getValue();
                            factor1Value = formContext.getAttribute("ts_rategeneralcompliancehistory").getValue();
                            factor2Value = formContext.getAttribute("ts_rateactualorpotentialharm").getValue();
                            factor3Value = formContext.getAttribute("ts_rateresponsibility").getValue();
                            factor4Value = formContext.getAttribute("ts_ratemitigationofnoncompliantbehaviors").getValue();
                            factor5Value = formContext.getAttribute("ts_ratepreventingrecurrence").getValue();
                            factor6Value = formContext.getAttribute("ts_rateintentionality").getValue();
                            factor7Value = formContext.getAttribute("ts_rateeconomicbenefit").getValue();
                            factor8Value = formContext.getAttribute("ts_ratecooperationwithinspectionorinvestigat").getValue();
                            complianceHistory = formContext.getAttribute("ts_ratespecificcompliancehistory").getValue();
                            enforcementHistory = formContext.getAttribute("ts_ratespecificenforcementhistory").getValue();
                            //If any of the rate factors don't have a value, reset any fields that require an enforcement recommendation
                            if (rateSpecificComplianceHistory == null || factor1Value == null || factor2Value == null || factor3Value == null || factor4Value == null || factor5Value == null || factor6Value == null || factor7Value == null || factor8Value == null || ((complianceHistory != null && complianceHistory != 717750000 /* _0documentedpreviousidenticalorsimilarnoncompliances */) && enforcementHistory == null)) {
                                formContext.getAttribute("ts_rateenforcementrecommendation").setValue(null);
                                formContext.getAttribute("ts_acceptraterecommendation").setValue(null);
                                RATEHideProposedSection(eContext);
                                return [2 /*return*/, true];
                            }
                            factor1AssessmentRatingId = factor1Value[0].id;
                            factor2AssessmentRatingId = factor2Value[0].id;
                            factor3AssessmentRatingId = factor3Value[0].id;
                            factor4AssessmentRatingId = factor4Value[0].id;
                            factor5AssessmentRatingId = factor5Value[0].id;
                            factor6AssessmentRatingId = factor6Value[0].id;
                            factor7AssessmentRatingId = factor7Value[0].id;
                            factor8AssessmentRatingId = factor8Value[0].id;
                            factor1AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor1AssessmentRatingId, "?$select=ts_weight");
                            factor2AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor2AssessmentRatingId, "?$select=ts_weight");
                            factor3AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor3AssessmentRatingId, "?$select=ts_weight");
                            factor4AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor4AssessmentRatingId, "?$select=ts_weight");
                            factor5AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor5AssessmentRatingId, "?$select=ts_weight");
                            factor6AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor6AssessmentRatingId, "?$select=ts_weight");
                            factor7AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor7AssessmentRatingId, "?$select=ts_weight");
                            factor8AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor8AssessmentRatingId, "?$select=ts_weight");
                            if (enforcementHistory == null)
                                enforcementHistory = 717750000 /* Nil */;
                            thresholdsPromise = Xrm.WebApi.retrieveMultipleRecords("ts_assessmentscorethredshots", "?$select=ts_minimum,ts_maximum,ts_rateenforcementaction&$filter=ts_assessmenttool eq " + 717750001 /* RATE */ + " and ts_rateenforcementhistory eq " + enforcementHistory);
                            //Wait for all factors the retrieve, then calculate and set the enforcement recommendation
                            return [4 /*yield*/, Promise.all([factor1AssessmentRatingPromise, factor2AssessmentRatingPromise, factor3AssessmentRatingPromise, factor4AssessmentRatingPromise, factor5AssessmentRatingPromise, factor6AssessmentRatingPromise, factor7AssessmentRatingPromise, factor8AssessmentRatingPromise, thresholdsPromise]).then(function (factorPromises) {
                                    var totalWeight = 0;
                                    for (var i = 0; i < 8; i++) { //The first 8 are the assessment ratings
                                        totalWeight += factorPromises[i].ts_weight;
                                    }
                                    var enforcementResponseChoiceNumber = null;
                                    //Loop through all the thresholds, if the total weight is between a min and max, set its enforcement action to the enforcement recommendation
                                    for (var _i = 0, _a = factorPromises[8].entities; _i < _a.length; _i++) {
                                        var threshold = _a[_i];
                                        var min = threshold.ts_minimum;
                                        var max = threshold.ts_maximum;
                                        if (totalWeight >= min && totalWeight <= max) {
                                            enforcementResponseChoiceNumber = threshold.ts_rateenforcementaction;
                                            break;
                                        }
                                    }
                                    formContext.getAttribute("ts_rateenforcementrecommendation").setValue(enforcementResponseChoiceNumber);
                                    formContext.getControl("ts_acceptraterecommendation").setDisabled(false);
                                    formContext.getAttribute("ts_rateinspectorrecommendation").setValue(null);
                                })];
                        case 1:
                            //Wait for all factors the retrieve, then calculate and set the enforcement recommendation
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
        //Sets the NCAT Final Enforcement Action to the recommended Enforcement if the user accepts
        //Reveals fields for user to suggest an alternative enforcement action if they do not accept the recommendation
        function AcceptNCATRecommendationOnChange(eContext) {
            var formContext = eContext.getFormContext();
            var acceptNCATRecommendation = formContext.getAttribute("ts_acceptncatrecommendation").getValue();
            if (acceptNCATRecommendation == null) {
                NCATHideProposedSection(eContext);
                formContext.getAttribute("ts_finalenforcementaction").setValue(null);
            }
            //If the NCAT factors are all filled
            if (formContext.getAttribute("ts_ncatactualorpotentialharm").getValue() != null && formContext.getAttribute("ts_ncatintentionality").getValue() != null && formContext.getAttribute("ts_ncatcompliancehistory").getValue() != null && formContext.getAttribute("ts_ncateconomicbenefit").getValue() != null && formContext.getAttribute("ts_ncatmitigationofnoncompliantbehaviors").getValue() != null && formContext.getAttribute("ts_ncatcooperationwithinspectionorinvestigat").getValue() != null && formContext.getAttribute("ts_ncatdetectionofnoncompliances").getValue() != null && acceptNCATRecommendation != null) {
                var confirmStrings = { text: factorLockMessageBodyLocalizedText, title: factorLockMessageTitleLocalizedText };
                Xrm.Navigation.openConfirmDialog(confirmStrings).then(function (success) {
                    if (success.confirmed) {
                        if (acceptNCATRecommendation == 717750000 /* Yes */) {
                            //Set NCAT Final Enforcement Action to the Enforcement Recommendation
                            var enforcementRecommendation = formContext.getAttribute("ts_ncatenforcementrecommendation").getValue();
                            formContext.getAttribute("ts_finalenforcementaction").setValue(NCATEnforcementActionChoiceValueToFinalEnforcementActionChoiceValue(enforcementRecommendation));
                            NCATHideProposedSection(eContext);
                            NCATHideManagerReviewSection(eContext);
                        }
                        else {
                            formContext.getAttribute("ts_finalenforcementaction").setValue(null);
                        }
                        formContext.data.save().then(function () {
                            setPostNCATRecommendationSelectionFieldsVisibility(eContext);
                        });
                    }
                    else {
                        formContext.getAttribute("ts_acceptncatrecommendation").setValue(null);
                    }
                });
            }
        }
        Finding.AcceptNCATRecommendationOnChange = AcceptNCATRecommendationOnChange;
        //Sets the RATE Final Enforcement Action to the recommended Enforcement if the user accepts
        //Reveals fields for user to suggest an alternative enforcement action if they do not accept the recommendation
        function AcceptRATERecommendationOnChange(eContext) {
            var formContext = eContext.getFormContext();
            var acceptRATERecommendation = formContext.getAttribute("ts_acceptraterecommendation").getValue();
            if (acceptRATERecommendation == null) {
                RATEHideProposedSection(eContext);
                formContext.getAttribute("ts_finalenforcementaction").setValue(null);
            }
            //If the NCAT factors are all filled
            if (formContext.getAttribute("ts_rateactualorpotentialharm").getValue() != null && formContext.getAttribute("ts_rateintentionality").getValue() != null && formContext.getAttribute("ts_rateeconomicbenefit").getValue() != null && formContext.getAttribute("ts_rateresponsibility").getValue() != null && formContext.getAttribute("ts_ratemitigationofnoncompliantbehaviors").getValue() != null && formContext.getAttribute("ts_ratepreventingrecurrence").getValue() != null && formContext.getAttribute("ts_ratecooperationwithinspectionorinvestigat").getValue() != null && acceptRATERecommendation != null) {
                var confirmStrings = { text: factorLockMessageBodyLocalizedText, title: factorLockMessageTitleLocalizedText };
                Xrm.Navigation.openConfirmDialog(confirmStrings).then(function (success) {
                    if (success.confirmed) {
                        if (acceptRATERecommendation == 717750000 /* Yes */) {
                            //Set RATE Final Enforcement Action to the Enforcement Recommendation
                            var enforcementRecommendation = formContext.getAttribute("ts_rateenforcementrecommendation").getValue();
                            formContext.getAttribute("ts_finalenforcementaction").setValue(RATEEnforcementActionChoiceValueToFinalEnforcementActionChoiceValue(enforcementRecommendation));
                            RATEHideProposedSection(eContext);
                            RATEHideManagerReviewSection(eContext);
                        }
                        else {
                            formContext.getAttribute("ts_finalenforcementaction").setValue(null);
                        }
                        formContext.data.save().then(function () {
                            setPostRATERecommendationSelectionFieldsVisibility(eContext);
                        });
                    }
                    else {
                        formContext.getAttribute("ts_acceptraterecommendation").setValue(null);
                    }
                });
            }
        }
        Finding.AcceptRATERecommendationOnChange = AcceptRATERecommendationOnChange;
        //Make the Accept NCAT Recommendation field Visible if there is an Enforcement Recommendation 
        function NCATEnforcementRecommendationOnChange(eContext) {
            var formContext = eContext.getFormContext();
            var NCATEnforcementRecommendation = formContext.getAttribute("ts_ncatenforcementrecommendation").getValue();
            var status = formContext.getAttribute("statuscode").getValue();
            if (NCATEnforcementRecommendation != null && status != 717750002 /* Complete */) {
                //Enable Accept NCAT Recommendation
                formContext.getControl("ts_acceptncatrecommendation").setDisabled(false);
            }
            else {
                //Disable Accept NCAT Recommendation
                formContext.getControl("ts_acceptncatrecommendation").setDisabled(true);
                //Clear Accept NCAT Recommendation
                formContext.getAttribute("ts_acceptncatrecommendation").setValue(null);
            }
        }
        Finding.NCATEnforcementRecommendationOnChange = NCATEnforcementRecommendationOnChange;
        //Make the Accept RATE Recommendation field Visible if there is an Enforcement Recommendation 
        function RATEEnforcementRecommendationOnChange(eContext) {
            var formContext = eContext.getFormContext();
            var RATEEnforcementRecommendation = formContext.getAttribute("ts_rateenforcementrecommendation").getValue();
            var status = formContext.getAttribute("statuscode").getValue();
            if (RATEEnforcementRecommendation != null && status != 717750002 /* Complete */) {
                //Enable Accept RATE Recommendation
                formContext.getControl("ts_acceptraterecommendation").setDisabled(false);
            }
            else {
                //Disable Accept RATE Recommendation
                formContext.getControl("ts_acceptraterecommendation").setDisabled(true);
                //Clear Accept RATE Recommendation
                formContext.getAttribute("ts_acceptraterecommendation").setValue(null);
            }
        }
        Finding.RATEEnforcementRecommendationOnChange = RATEEnforcementRecommendationOnChange;
        //Does not allow NCAT Inspector Recommendation to match the NCAT Enforcement Recommendation
        //Resets the Manager Review Section fields
        function NCATInspectorRecommendationOnChange(eContext) {
            var formContext = eContext.getFormContext();
            var NCATInspectorRecommendation = formContext.getAttribute("ts_ncatinspectorrecommendation").getValue();
            var NCATEnforcementRecommendation = formContext.getAttribute("ts_ncatenforcementrecommendation").getValue();
            //Reset NCAT Final Enforcement Action and any Manager fields
            NCATHideManagerReviewSection(eContext);
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
        function RATESpecificComplianceHistoryOnChange(eContext) {
            var formContext = eContext.getFormContext();
            var specificComplianceHistory = formContext.getAttribute("ts_ratespecificcompliancehistory").getValue();
            if (specificComplianceHistory != null && specificComplianceHistory != 717750000 /* _0documentedpreviousidenticalorsimilarnoncompliances */) {
                formContext.getControl("ts_ratespecificenforcementhistory").setVisible(true);
            }
            else {
                formContext.getAttribute("ts_ratespecificenforcementhistory").setValue(null);
                formContext.getControl("ts_ratespecificenforcementhistory").setVisible(false);
            }
        }
        Finding.RATESpecificComplianceHistoryOnChange = RATESpecificComplianceHistoryOnChange;
        //Does not allow RATE Inspector Recommendation to match the NCAT Enforcement Recommendation
        //Resets the Manager Review Section fields
        function RATEInspectorRecommendationOnChange(eContext) {
            var formContext = eContext.getFormContext();
            var RATEInspectorRecommendation = formContext.getAttribute("ts_rateinspectorrecommendation").getValue();
            var RATEEnforcementRecommendation = formContext.getAttribute("ts_rateenforcementrecommendation").getValue();
            //Reset RATE Final Enforcement Action and any Manager fields
            RATEHideManagerReviewSection(eContext);
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
        //Sets the NCAT Final Enforcement Action depending on the Manager Decision
        //Sets Manager Section Controls to Required or Disabled depending on Manager Decision
        function NCATManagerDecisionOnChange(eContext) {
            var formContext = eContext.getFormContext();
            var NCATManagerDecision = formContext.getAttribute("ts_ncatmanagerdecision").getValue();
            if (NCATManagerDecision == 717750000 /* AcceptInspectorRecommendation */) {
                formContext.getAttribute("ts_finalenforcementaction").setValue(NCATEnforcementActionChoiceValueToFinalEnforcementActionChoiceValue(formContext.getAttribute("ts_ncatinspectorrecommendation").getValue()));
                formContext.getAttribute("ts_ncatmanageralternativerecommendation").setRequiredLevel("none");
                formContext.getControl("ts_ncatmanageralternativerecommendation").setVisible(false);
                formContext.getControl("ts_ncatmanageralternativerecommendation").clearNotification();
                formContext.getAttribute("ts_ncatmanageralternativerecommendation").setValue(null);
                formContext.getAttribute("ts_ncatmanagerenforcementjustification").setRequiredLevel("required");
                formContext.getControl("ts_ncatmanagerenforcementjustification").setDisabled(false);
            }
            else if (NCATManagerDecision == 717750001 /* AcceptNCATRecommendation */) {
                formContext.getAttribute("ts_finalenforcementaction").setValue(NCATEnforcementActionChoiceValueToFinalEnforcementActionChoiceValue(formContext.getAttribute("ts_ncatenforcementrecommendation").getValue()));
                formContext.getAttribute("ts_ncatmanageralternativerecommendation").setRequiredLevel("none");
                formContext.getControl("ts_ncatmanageralternativerecommendation").setVisible(false);
                formContext.getControl("ts_ncatmanageralternativerecommendation").clearNotification();
                formContext.getAttribute("ts_ncatmanageralternativerecommendation").setValue(null);
                formContext.getAttribute("ts_ncatmanagerenforcementjustification").setRequiredLevel("required");
                formContext.getControl("ts_ncatmanagerenforcementjustification").setDisabled(false);
            }
            else if (NCATManagerDecision == 717750002 /* ProvideAlternativeRecommendation */) {
                formContext.getAttribute("ts_ncatmanageralternativerecommendation").setRequiredLevel("required");
                formContext.getControl("ts_ncatmanageralternativerecommendation").setVisible(true);
                formContext.getAttribute("ts_finalenforcementaction").setValue(NCATEnforcementActionChoiceValueToFinalEnforcementActionChoiceValue(formContext.getAttribute("ts_ncatmanageralternativerecommendation").getValue()));
                formContext.getAttribute("ts_ncatmanagerenforcementjustification").setRequiredLevel("required");
                formContext.getControl("ts_ncatmanagerenforcementjustification").setDisabled(false);
            }
            else {
                formContext.getAttribute("ts_ncatmanageralternativerecommendation").setRequiredLevel("none");
                formContext.getControl("ts_ncatmanageralternativerecommendation").setVisible(false);
                formContext.getControl("ts_ncatmanageralternativerecommendation").clearNotification();
                formContext.getAttribute("ts_ncatmanageralternativerecommendation").setValue(null);
                formContext.getAttribute("ts_ncatmanagerenforcementjustification").setRequiredLevel("none");
                formContext.getControl("ts_ncatmanagerenforcementjustification").setDisabled(true);
                formContext.getAttribute("ts_ncatmanagerenforcementjustification").setValue(null);
            }
        }
        Finding.NCATManagerDecisionOnChange = NCATManagerDecisionOnChange;
        //Sets the RATE Final Enforcement Action depending on the Manager Decision
        //Sets Manager Section Controls to Required or Disabled depending on Manager Decision
        function RATEManagerDecisionOnChange(eContext) {
            var formContext = eContext.getFormContext();
            var RATEManagerDecision = formContext.getAttribute("ts_ratemanagerdecision").getValue();
            if (RATEManagerDecision == 717750000 /* AcceptInspectorRecommendation */) {
                formContext.getAttribute("ts_finalenforcementaction").setValue(RATEEnforcementActionChoiceValueToFinalEnforcementActionChoiceValue(formContext.getAttribute("ts_rateinspectorrecommendation").getValue()));
                formContext.getAttribute("ts_ratemanageralternativerecommendation").setRequiredLevel("none");
                formContext.getControl("ts_ratemanageralternativerecommendation").setVisible(false);
                formContext.getAttribute("ts_ratemanageralternativerecommendation").setValue(null);
                formContext.getAttribute("ts_ratemanagerenforcementjustification").setRequiredLevel("required");
                formContext.getControl("ts_ratemanagerenforcementjustification").setDisabled(false);
            }
            else if (RATEManagerDecision == 717750001 /* AcceptRATERecommendation */) {
                formContext.getAttribute("ts_finalenforcementaction").setValue(RATEEnforcementActionChoiceValueToFinalEnforcementActionChoiceValue(formContext.getAttribute("ts_rateenforcementrecommendation").getValue()));
                formContext.getAttribute("ts_ratemanageralternativerecommendation").setRequiredLevel("none");
                formContext.getControl("ts_ratemanageralternativerecommendation").setVisible(false);
                formContext.getAttribute("ts_ratemanageralternativerecommendation").setValue(null);
                formContext.getAttribute("ts_ratemanagerenforcementjustification").setRequiredLevel("required");
                formContext.getControl("ts_ratemanagerenforcementjustification").setDisabled(false);
            }
            else if (RATEManagerDecision == 717750002 /* ProvideAlternativeRecommendation */) {
                formContext.getAttribute("ts_ratemanageralternativerecommendation").setRequiredLevel("required");
                formContext.getControl("ts_ratemanageralternativerecommendation").setVisible(true);
                formContext.getAttribute("ts_finalenforcementaction").setValue(RATEEnforcementActionChoiceValueToFinalEnforcementActionChoiceValue(formContext.getAttribute("ts_ratemanageralternativerecommendation").getValue()));
                formContext.getAttribute("ts_ratemanagerenforcementjustification").setRequiredLevel("required");
                formContext.getControl("ts_ratemanagerenforcementjustification").setDisabled(false);
            }
            else {
                formContext.getAttribute("ts_ratemanageralternativerecommendation").setRequiredLevel("none");
                formContext.getControl("ts_ratemanageralternativerecommendation").setVisible(false);
                formContext.getAttribute("ts_ratemanageralternativerecommendation").setValue(null);
                formContext.getAttribute("ts_ratemanagerenforcementjustification").setRequiredLevel("none");
                formContext.getControl("ts_ratemanagerenforcementjustification").setDisabled(true);
                formContext.getAttribute("ts_ratemanagerenforcementjustification").setValue(null);
            }
        }
        Finding.RATEManagerDecisionOnChange = RATEManagerDecisionOnChange;
        //Does not allow NCAT Manager Recommendation to match either NCAT Recommendation or Inspector Recommendation
        //Sets the NCAT Final Enforcement action to the Manager Recommendation
        function NCATManagerAlternativeRecommendationOnChange(eContext) {
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
            }
            else if (NCATManagerAlternativeRecommendation != null && NCATManagerAlternativeRecommendation == NCATEnforcementRecommendation) {
                if (lang == 1036) {
                    formContext.getControl("ts_ncatmanageralternativerecommendation").setNotification("ne peut pas correspondre " + formContext.getControl("ts_ncatenforcementrecommendation").getLabel());
                }
                else {
                    formContext.getControl("ts_ncatmanageralternativerecommendation").setNotification("cannot match " + formContext.getControl("ts_ncatenforcementrecommendation").getLabel());
                }
            }
            else {
                formContext.getAttribute("ts_finalenforcementaction").setValue(NCATEnforcementActionChoiceValueToFinalEnforcementActionChoiceValue(formContext.getAttribute("ts_ncatmanageralternativerecommendation").getValue()));
            }
        }
        Finding.NCATManagerAlternativeRecommendationOnChange = NCATManagerAlternativeRecommendationOnChange;
        //Does not allow RATE Manager Recommendation to match either RATE Recommendation or Inspector Recommendation
        //Sets the RATE Final Enforcement action to the Manager Recommendation
        function RATEManagerAlternativeRecommendationOnChange(eContext) {
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
            }
            else if (RATEManagerAlternativeRecommendation != null && RATEManagerAlternativeRecommendation == RATEEnforcementRecommendation) {
                if (lang == 1036) {
                    formContext.getControl("ts_ratemanageralternativerecommendation").setNotification("ne peut pas correspondre " + formContext.getControl("ts_rateenforcementrecommendation").getLabel());
                }
                else {
                    formContext.getControl("ts_ratemanageralternativerecommendation").setNotification("cannot match " + formContext.getControl("ts_rateenforcementrecommendation").getLabel());
                }
            }
            else {
                formContext.getAttribute("ts_finalenforcementaction").setValue(RATEEnforcementActionChoiceValueToFinalEnforcementActionChoiceValue(formContext.getAttribute("ts_ratemanageralternativerecommendation").getValue()));
            }
        }
        Finding.RATEManagerAlternativeRecommendationOnChange = RATEManagerAlternativeRecommendationOnChange;
        function approvingNCATTeamsOnChange(eContext) {
            var formContext = eContext.getFormContext();
            var NCATApprovingTeam = formContext.getAttribute("ts_ncatapprovingteam").getValue();
            if (NCATApprovingTeam != null) {
                var viewIdApprovingManagerNCAT = '{1c259fee-0541-4cac-8d20-7b30ee397ca7}';
                var entityNameApprovingManagers = "systemuser";
                var viewDisplayNameApprovingManagers = "FilteredApprovingManagers";
                //Approving managers in the same region as the case with the AvSec Business Unit
                var fetchXmlApprovingManagersNCAT = "<fetch distinct=\"true\" page=\"1\" no-lock=\"false\"><entity name=\"systemuser\"><attribute name=\"systemuserid\"/><attribute name=\"fullname\"/><link-entity name=\"teammembership\" from=\"systemuserid\" to=\"systemuserid\" intersect=\"true\"><filter><condition attribute=\"teamid\" operator=\"eq\" value=\"" + NCATApprovingTeam[0].id + "\"/></filter></link-entity></entity></fetch>";
                var layoutXmlApprovingManagers = '<grid name="resultset" object="8" jump="fullname" select="1" icon="1" preview="1"><row name="result" id="systemuserid"><cell name="fullname" width="300" /></row></grid>';
                formContext.getControl("ts_ncatmanager").addCustomView(viewIdApprovingManagerNCAT, entityNameApprovingManagers, viewDisplayNameApprovingManagers, fetchXmlApprovingManagersNCAT, layoutXmlApprovingManagers, true);
                if (formContext.getAttribute("ts_ncatmanager").getValue != null) {
                    formContext.getControl("ts_ncatmanager").setDisabled(false);
                }
                else {
                    formContext.getAttribute("ts_ncatmanager").setValue();
                    formContext.getControl("ts_ncatmanager").setDisabled(true);
                }
            }
            else {
                formContext.getAttribute("ts_ncatmanager").setValue();
                formContext.getControl("ts_ncatmanager").setDisabled(true);
            }
        }
        Finding.approvingNCATTeamsOnChange = approvingNCATTeamsOnChange;
        function approvingRATETeamsOnChange(eContext) {
            var formContext = eContext.getFormContext();
            var RATEApprovingTeam = formContext.getAttribute("ts_rateapprovingteam").getValue();
            if (RATEApprovingTeam != null) {
                var viewIdApprovingManagerRATE = '{1c259fee-0541-4cac-8d20-7b30ee394a73}';
                var entityNameApprovingManagers = "systemuser";
                var viewDisplayNameApprovingManagers = "FilteredApprovingManagers";
                //Approving managers in the same region as the case with the ISSO Business Unit
                var fetchXmlApprovingManagersRATE = "<fetch distinct=\"true\" page=\"1\" no-lock=\"false\"><entity name=\"systemuser\"><attribute name=\"systemuserid\"/><attribute name=\"fullname\"/><link-entity name=\"teammembership\" from=\"systemuserid\" to=\"systemuserid\" intersect=\"true\"><filter><condition attribute=\"teamid\" operator=\"eq\" value=\"" + RATEApprovingTeam[0].id + "\"/></filter></link-entity></entity></fetch>";
                var layoutXmlApprovingManagers = '<grid name="resultset" object="8" jump="fullname" select="1" icon="1" preview="1"><row name="result" id="systemuserid"><cell name="fullname" width="300" /></row></grid>';
                formContext.getControl("ts_ratemanager").addCustomView(viewIdApprovingManagerRATE, entityNameApprovingManagers, viewDisplayNameApprovingManagers, fetchXmlApprovingManagersRATE, layoutXmlApprovingManagers, true);
                formContext.getControl("ts_ratemanager").setDisabled(false);
            }
            else {
                formContext.getAttribute("ts_ratemanager").setValue();
                formContext.getControl("ts_ratemanager").setDisabled(true);
            }
        }
        Finding.approvingRATETeamsOnChange = approvingRATETeamsOnChange;
        function issueAddressedOnSiteOnChange(eContext) {
            var formContext = eContext.getFormContext();
            var findingType = formContext.getAttribute("ts_findingtype").getValue();
            var finalEnforcementAction = formContext.getAttribute("ts_finalenforcementaction");
            if (findingType == 717750001 /* Observation */) {
                finalEnforcementAction.setValue(717750009 /* NotApplicable */);
            }
            else {
                showHideNonComplianceTimeframe(formContext);
            }
        }
        Finding.issueAddressedOnSiteOnChange = issueAddressedOnSiteOnChange;
        function showHideNonComplianceTimeframe(formContext) {
            var addressedOnSiteAttribute = formContext.getAttribute("ts_issueaddressedonsite");
            var nonComplianceTimeframeAttribute = formContext.getAttribute("ts_noncompliancetimeframe");
            var nonComplianceTimeframeControl = formContext.getControl("ts_noncompliancetimeframe");
            var findingType = formContext.getAttribute("ts_findingtype").getValue();
            if (findingType == 717750002 /* Noncompliance */) {
                if (addressedOnSiteAttribute != null && nonComplianceTimeframeAttribute != null) {
                    var addressedOnSiteValue = addressedOnSiteAttribute.getValue();
                    if (addressedOnSiteValue == 717750001 /* No */) {
                        //Show timeframe field
                        nonComplianceTimeframeControl.setVisible(true);
                    }
                    else {
                        //Hide timeframe field
                        nonComplianceTimeframeControl.setVisible(false);
                    }
                }
            }
        }
        //Clears, Hides, and sets Required level to None for every field in the NCAT Proposed Section
        function NCATHideProposedSection(eContext) {
            var formContext = eContext.getFormContext();
            formContext.getAttribute("ts_ncatapprovingteam").setValue(null);
            formContext.getAttribute("ts_ncatapprovingteam").setRequiredLevel("none");
            formContext.getControl("ts_ncatapprovingteam").setVisible(false);
            formContext.getAttribute("ts_ncatmanager").setValue(null);
            formContext.getAttribute("ts_ncatmanager").setRequiredLevel("none");
            formContext.getControl("ts_ncatmanager").setVisible(false);
            formContext.getAttribute("ts_ncatinspectorrecommendation").setValue(null);
            formContext.getAttribute("ts_ncatinspectorrecommendation").setRequiredLevel("none");
            formContext.getControl("ts_ncatinspectorrecommendation").setVisible(false);
            formContext.getControl("ts_ncatinspectorrecommendation").clearNotification();
            formContext.getAttribute("ts_ncatenforcementjustification").setValue(null);
            formContext.getAttribute("ts_ncatenforcementjustification").setRequiredLevel("none");
            formContext.getControl("ts_ncatenforcementjustification").setVisible(false);
            NCATHideManagerReviewSection(eContext);
        }
        //Clears, Hides, and sets Required level to None for every field in the NCAT Manager Review Section
        function NCATHideManagerReviewSection(eContext) {
            var formContext = eContext.getFormContext();
            formContext.getAttribute("ts_rateapprovingteam").setValue(null);
            formContext.getAttribute("ts_rateapprovingteam").setRequiredLevel("none");
            formContext.getControl("ts_rateapprovingteam").setVisible(false);
            formContext.getAttribute("ts_ncatmanagerdecision").setRequiredLevel("none");
            formContext.getAttribute("ts_ncatmanagerdecision").setValue(null);
            formContext.getControl("ts_ncatmanagerdecision").setVisible(false);
            formContext.getAttribute("ts_ncatmanageralternativerecommendation").setValue(null);
            formContext.getControl("ts_ncatmanageralternativerecommendation").clearNotification();
            formContext.getControl("ts_ncatmanageralternativerecommendation").setVisible(false);
            formContext.getAttribute("ts_ncatmanagerenforcementjustification").setValue(null);
            formContext.getAttribute("ts_ncatmanagerenforcementjustification").setRequiredLevel("none");
            formContext.getControl("ts_ncatmanagerenforcementjustification").setDisabled(true);
            formContext.getControl("ts_ncatmanagerenforcementjustification").setVisible(false);
        }
        //Clears, Hides, and sets Required level to None for every field in the RATE Proposed Section
        function RATEHideProposedSection(eContext) {
            var formContext = eContext.getFormContext();
            formContext.getAttribute("ts_rateapprovingteam").setValue(null);
            formContext.getAttribute("ts_rateapprovingteam").setRequiredLevel("none");
            formContext.getControl("ts_rateapprovingteam").setVisible(false);
            formContext.getAttribute("ts_ratemanager").setValue(null);
            formContext.getAttribute("ts_ratemanager").setRequiredLevel("none");
            formContext.getControl("ts_ratemanager").setVisible(false);
            formContext.getAttribute("ts_rateinspectorrecommendation").setValue(null);
            formContext.getAttribute("ts_rateinspectorrecommendation").setRequiredLevel("none");
            formContext.getControl("ts_rateinspectorrecommendation").setVisible(false);
            formContext.getControl("ts_rateinspectorrecommendation").clearNotification();
            formContext.getAttribute("ts_rateenforcementjustification").setValue(null);
            formContext.getAttribute("ts_rateenforcementjustification").setRequiredLevel("none");
            formContext.getControl("ts_rateenforcementjustification").setVisible(false);
            RATEHideManagerReviewSection(eContext);
        }
        //Clears, Hides, and sets Required level to None for every field in the RATE Manager Review Section
        function RATEHideManagerReviewSection(eContext) {
            var formContext = eContext.getFormContext();
            formContext.getAttribute("ts_ratemanagerdecision").setRequiredLevel("none");
            formContext.getAttribute("ts_ratemanagerdecision").setValue(null);
            formContext.getControl("ts_ratemanagerdecision").setVisible(false);
            formContext.getAttribute("ts_ratemanageralternativerecommendation").setValue(null);
            formContext.getControl("ts_ratemanageralternativerecommendation").clearNotification();
            formContext.getControl("ts_ratemanageralternativerecommendation").setVisible(false);
            formContext.getAttribute("ts_ratemanagerenforcementjustification").setValue(null);
            formContext.getAttribute("ts_ratemanagerenforcementjustification").setRequiredLevel("none");
            formContext.getControl("ts_ratemanagerenforcementjustification").setDisabled(true);
            formContext.getControl("ts_ratemanagerenforcementjustification").setVisible(false);
        }
        //Sets the lookup views for the Approving Teams fields
        function setApprovingTeamsViews(form) {
            var viewIdApprovingTeamNCAT = '{3c259fee-0541-4cac-8d20-7b30ee397ca7}';
            var viewIdApprovingTeamRATE = '{3c259fee-0541-4cac-8d20-7b30ee394a73}';
            var entityNameApprovingTeams = "team";
            var viewDisplayNameApprovingTeams = "FilteredApprovingTeams";
            //Approving teams with the ISSO Business Unit
            var fetchXmlApprovingTeamsNCAT = "<fetch output-format=\"xml-platform\" mapping=\"logical\" no-lock=\"false\"><entity name=\"team\"><attribute name=\"name\"/><attribute name=\"businessunitid\"/><attribute name=\"teamid\"/><attribute name=\"teamtype\"/><filter type=\"and\"><condition attribute=\"teamtype\" operator=\"eq\" value=\"0\"/><condition attribute=\"ts_territory\" operator=\"not-null\"/></filter><order attribute=\"name\" descending=\"false\"/><link-entity name=\"businessunit\" from=\"businessunitid\" to=\"businessunitid\"><filter><condition attribute=\"name\" operator=\"like\" value=\"Intermodal%\"/></filter></link-entity></entity></fetch>";
            //Approving managers with the AvSec Business Unit
            var fetchXmlApprovingTeamsRATE = "<fetch output-format=\"xml-platform\" mapping=\"logical\" no-lock=\"false\"><entity name=\"team\"><attribute name=\"name\"/><attribute name=\"businessunitid\"/><attribute name=\"teamid\"/><attribute name=\"teamtype\"/><filter type=\"and\"><condition attribute=\"teamtype\" operator=\"eq\" value=\"0\"/><condition attribute=\"ts_territory\" operator=\"not-null\"/></filter><order attribute=\"name\" descending=\"false\"/><link-entity name=\"businessunit\" from=\"businessunitid\" to=\"businessunitid\"><filter><condition attribute=\"name\" operator=\"like\" value=\"Aviation%\"/></filter></link-entity></entity></fetch>";
            var layoutXmlApprovingTeams = '<grid name="resultset" object="8" jump="name" select="1" icon="1" preview="1"><row name="result" id="businessunitid"><cell name="name" width="300" /></row></grid>';
            form.getControl("ts_ncatapprovingteam").addCustomView(viewIdApprovingTeamNCAT, entityNameApprovingTeams, viewDisplayNameApprovingTeams, fetchXmlApprovingTeamsNCAT, layoutXmlApprovingTeams, true);
            form.getControl("ts_rateapprovingteam").addCustomView(viewIdApprovingTeamRATE, entityNameApprovingTeams, viewDisplayNameApprovingTeams, fetchXmlApprovingTeamsRATE, layoutXmlApprovingTeams, true);
        }
        function setPostNCATRecommendationSelectionFieldsVisibility(eContext) {
            var formContext = eContext.getFormContext();
            var acceptNCATRecommendation = formContext.getAttribute("ts_acceptncatrecommendation").getValue();
            if (acceptNCATRecommendation == 717750001 /* No */ || acceptNCATRecommendation == 717750000 /* Yes */) {
                lockNCATFactors(eContext);
                formContext.getControl("ts_acceptncatrecommendation").setDisabled(true);
            }
            //If they did not accept the NCAT recommendation
            if (acceptNCATRecommendation == 717750001 /* No */) {
                //Show NCAT Approving Team
                formContext.getControl("ts_ncatapprovingteam").setVisible(true);
                formContext.getControl("ts_ncatapprovingteam").setDisabled(false);
                formContext.getAttribute("ts_ncatapprovingteam").setRequiredLevel("required");
                //Show NCAT Approving Manager
                formContext.getControl("ts_ncatmanager").setVisible(true);
                formContext.getControl("ts_ncatmanager").setDisabled(false);
                formContext.getAttribute("ts_ncatmanager").setRequiredLevel("required");
                //Show Inspector Recommendation
                formContext.getControl("ts_ncatinspectorrecommendation").setVisible(true);
                formContext.getControl("ts_ncatinspectorrecommendation").setDisabled(false);
                //Require Inspector Recommendation
                formContext.getAttribute("ts_ncatinspectorrecommendation").setRequiredLevel("required");
                //Show Enforcement Justification
                formContext.getControl("ts_ncatenforcementjustification").setVisible(true);
                formContext.getControl("ts_ncatenforcementjustification").setDisabled(false);
                //Require Enforcement Justification
                formContext.getAttribute("ts_ncatenforcementjustification").setRequiredLevel("required");
                //Lock the NCAT Proposed Alternative Enforcement Action and NCAT Justification for Proposed Alternative Enforcement Action fields if they have a value
                var NCATInspectorRecommendationValue = formContext.getAttribute("ts_ncatinspectorrecommendation").getValue();
                if (NCATInspectorRecommendationValue != null) {
                    formContext.getControl("ts_ncatinspectorrecommendation").setDisabled(true);
                }
                var NCATEnforcementJustificationValue = formContext.getAttribute("ts_ncatenforcementjustification").getValue();
                if (NCATEnforcementJustificationValue != null) {
                    formContext.getControl("ts_ncatenforcementjustification").setDisabled(true);
                }
                //If the proposed section has been filled out, show the manager review section
                if (formContext.getAttribute("ts_ncatapprovingteam").getValue() != null) {
                    var userRoles = Xrm.Utility.getGlobalContext().userSettings.roles;
                    //If the user is a system admin or ROM - Manager, show the NCAT manager review section
                    var isAdminOrManager_1 = false;
                    userRoles.forEach(function (role) {
                        if (role.name == "System Administrator" || role.name == "ROM - Manager") {
                            isAdminOrManager_1 = true;
                        }
                    });
                    var currentUserId = Xrm.Utility.getGlobalContext().userSettings.userId;
                    var ncatManagerValue = formContext.getAttribute("ts_ncatmanager").getValue();
                    if (ncatManagerValue != null) {
                        var approvingManagerId = ncatManagerValue[0].id;
                        if (currentUserId == approvingManagerId) {
                            isAdminOrManager_1 = true;
                        }
                    }
                    if (isAdminOrManager_1)
                        formContext.ui.tabs.get("tab_NCAT").sections.get("NCAT_manager_review").setVisible(true);
                }
            }
            else {
                NCATHideProposedSection(eContext);
            }
        }
        function lockNCATFactors(eContext) {
            var formContext = eContext.getFormContext();
            formContext.getControl("ts_ncatactualorpotentialharm").setDisabled(true);
            formContext.getControl("ts_ncatintentionality").setDisabled(true);
            formContext.getControl("ts_ncatcompliancehistory").setDisabled(true);
            formContext.getControl("ts_ncateconomicbenefit").setDisabled(true);
            formContext.getControl("ts_ncatmitigationofnoncompliantbehaviors").setDisabled(true);
            formContext.getControl("ts_ncatcooperationwithinspectionorinvestigat").setDisabled(true);
            formContext.getControl("ts_ncatdetectionofnoncompliances").setDisabled(true);
        }
        function setPostRATERecommendationSelectionFieldsVisibility(eContext) {
            var formContext = eContext.getFormContext();
            var acceptRATERecommendation = formContext.getAttribute("ts_acceptraterecommendation").getValue();
            if (acceptRATERecommendation == 717750001 /* No */ || acceptRATERecommendation == 717750000 /* Yes */) {
                lockRATEFactors(eContext);
                formContext.getControl("ts_acceptraterecommendation").setDisabled(true);
            }
            //If they did not accept the RATE recommendation
            if (acceptRATERecommendation == 717750001 /* No */) {
                //Show RATE Approving Team
                formContext.getControl("ts_rateapprovingteam").setVisible(true);
                formContext.getControl("ts_rateapprovingteam").setDisabled(false);
                formContext.getAttribute("ts_rateapprovingteam").setRequiredLevel("required");
                //Show RATE Approving Manager
                formContext.getControl("ts_ratemanager").setVisible(true);
                formContext.getControl("ts_ratemanager").setDisabled(false);
                formContext.getAttribute("ts_ratemanager").setRequiredLevel("required");
                //Show Inspector Recommendation
                formContext.getControl("ts_rateinspectorrecommendation").setVisible(true);
                formContext.getControl("ts_rateinspectorrecommendation").setDisabled(false);
                //Require Inspector Recommendation
                formContext.getAttribute("ts_rateinspectorrecommendation").setRequiredLevel("required");
                //Show Enforcement Justification
                formContext.getControl("ts_rateenforcementjustification").setVisible(true);
                formContext.getControl("ts_rateenforcementjustification").setDisabled(false);
                //Require Enforcement Justification
                formContext.getAttribute("ts_rateenforcementjustification").setRequiredLevel("required");
                //Lock the RATE Proposed Alternative Enforcement Action and RATE Justification for Proposed Alternative Enforcement Action fields if they have a value
                var RATEInspectorRecommendationValue = formContext.getAttribute("ts_rateinspectorrecommendation").getValue();
                if (RATEInspectorRecommendationValue != null) {
                    formContext.getControl("ts_rateinspectorrecommendation").setDisabled(true);
                }
                var RATEEnforcementJustificationValue = formContext.getAttribute("ts_rateenforcementjustification").getValue();
                if (RATEEnforcementJustificationValue != null) {
                    formContext.getControl("ts_rateenforcementjustification").setDisabled(true);
                }
                //If the proposed section has been filled out, show the manager review section
                if (formContext.getAttribute("ts_rateapprovingteam").getValue() != null) {
                    var userRoles = Xrm.Utility.getGlobalContext().userSettings.roles;
                    //If the user is a system admin or ROM - Manager, show the RATE manager review section
                    var isAdminOrManager_2 = false;
                    userRoles.forEach(function (role) {
                        if (role.name == "System Administrator" || role.name == "ROM - Manager") {
                            isAdminOrManager_2 = true;
                        }
                    });
                    var currentUserId = Xrm.Utility.getGlobalContext().userSettings.userId;
                    var rateManagerValue = formContext.getAttribute("ts_ratemanager").getValue();
                    if (rateManagerValue != null) {
                        var approvingManagerId = rateManagerValue[0].id;
                        if (currentUserId == approvingManagerId) {
                            isAdminOrManager_2 = true;
                        }
                    }
                    if (isAdminOrManager_2)
                        formContext.ui.tabs.get("tab_RATE").sections.get("RATE_manager_review").setVisible(true);
                }
            }
            else {
                RATEHideProposedSection(eContext);
            }
        }
        function lockRATEFactors(eContext) {
            var formContext = eContext.getFormContext();
            formContext.getControl("ts_rateactualorpotentialharm").setDisabled(true);
            formContext.getControl("ts_rateintentionality").setDisabled(true);
            formContext.getControl("ts_rateeconomicbenefit").setDisabled(true);
            formContext.getControl("ts_rateresponsibility").setDisabled(true);
            formContext.getControl("ts_ratemitigationofnoncompliantbehaviors").setDisabled(true);
            formContext.getControl("ts_ratepreventingrecurrence").setDisabled(true);
            formContext.getControl("ts_ratecooperationwithinspectionorinvestigat").setDisabled(true);
            formContext.getControl("ts_ratespecificcompliancehistory").setDisabled(true);
            formContext.getControl("ts_rategeneralcompliancehistory").setDisabled(true);
            formContext.getControl("ts_ratespecificenforcementhistory").setDisabled(true);
        }
        //Disable all form fields except for "note to stakeholder"
        function disableFormFields(form) {
            form.ui.controls.forEach(function (control, index) {
                var controlType = control.getControlType();
                var controlName = control.getName();
                if (controlType != "iframe" && controlType != "webresource" && controlType != "subgrid") {
                    if (controlName != "ts_notetostakeholder" && controlName != "ts_sensitivitylevel") {
                        control.setDisabled(true);
                    }
                }
            });
        }
        //Takes an NCAT Enforcement Action Choice Value and returns the corresponding Final Enforcement Action Choice Value
        function NCATEnforcementActionChoiceValueToFinalEnforcementActionChoiceValue(NCATValue) {
            switch (NCATValue) {
                case 717750000 /* VerbalWarning */:
                    return 717750001 /* VerbalWarning */;
                case 717750001 /* WrittenWarning */:
                    return 717750002 /* WrittenWarning */;
                case 717750002 /* ReferraltoREU */:
                    return 717750008 /* ReferraltoREU */;
                default:
                    return 0;
            }
        }
        //Takes a RATE Enforcement Action Choice Value and returns the corresponding Final Enforcement Action Choice Value
        function RATEEnforcementActionChoiceValueToFinalEnforcementActionChoiceValue(NCATValue) {
            switch (NCATValue) {
                case 717750000 /* Nil */:
                    return 717750000 /* Nil */;
                case 717750001 /* VerbalWarning */:
                    return 717750001 /* VerbalWarning */;
                case 717750002 /* WrittenWarning */:
                    return 717750002 /* WrittenWarning */;
                case 717750003 /* AMPLevel120ofMaximum */:
                    return 717750003 /* AMPLevel120ofMaximum */;
                case 717750004 /* AMPLevel250ofMaximum */:
                    return 717750004 /* AMPLevel250ofMaximum */;
                case 717750005 /* AMPLevel3100ofMaximum */:
                    return 717750005 /* AMPLevel3100ofMaximum */;
                case 717750006 /* SuspensionofCAD */:
                    return 717750006 /* SuspensionofCAD */;
                case 717750007 /* CancellationofCAD */:
                    return 717750007 /* CancellationofCAD */;
                default:
                    return 0;
            }
        }
        function SubGridFilterExecution(eContext) {
            var formContext = eContext.getFormContext();
            var gridControl = formContext.getControl("relatedfinding_grid");
            var accountobjectid = formContext.getAttribute("ts_accountid").getValue();
            var findingId = formContext.data.entity.getId();
            var accountId = '';
            if (accountobjectid != null && accountobjectid != undefined) {
                accountId = accountobjectid[0].id;
            }
            if (gridControl === null) {
                setTimeout(ROM.Finding.SubGridFilterExecution, 1000);
                return;
            }
            else {
                if (accountId !== null && accountId !== '') {
                    var fetchXml = "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false' no-lock='false'>\n\t            <entity name='ovs_finding'>\n\t\t            <attribute name='ovs_findingprovisionreference'/>\n\t\t            <attribute name='ovs_finding'/>\n\t\t            <attribute name='ts_findingtype'/>\n\t\t            <attribute name='ts_accountid'/>\n\t\t            <attribute name='statecode'/>\n\t\t            <attribute name='ts_ovs_operationtype'/>\n\t\t            <attribute name='ovs_caseid'/>\n\t\t            <attribute name='ts_workorder'/>\n\t\t            <attribute name='createdon'/>\n\t\t            <order attribute='createdon' descending='true'/>\n\t\t            <attribute name='ovs_findingid'/>\n\t\t            <attribute name='ts_functionallocation'/>\n\t\t            <filter type='and'>\n\t\t\t            <condition attribute='statecode' operator='eq' value='0'/>\n\t\t\t            <condition attribute='ts_accountid' operator='eq' value='" + accountId + "' uitype='account'/>\n                        <condition attribute='ovs_findingid' operator='ne' value='" + findingId + "' uitype='ovs_finding'/>\n\t\t            </filter>\n\t            </entity>\n            </fetch>";
                    gridControl.setFilterXml(fetchXml);
                    gridControl.refresh();
                }
            }
        }
        Finding.SubGridFilterExecution = SubGridFilterExecution;
    })(Finding = ROM.Finding || (ROM.Finding = {}));
})(ROM || (ROM = {}));
