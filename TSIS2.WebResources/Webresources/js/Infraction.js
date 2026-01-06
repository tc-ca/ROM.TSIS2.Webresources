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
    var Infraction;
    (function (Infraction) {
        var lang = Xrm.Utility.getGlobalContext().userSettings.languageId;
        var factorLockMessageTitleLocalizedText = "Warning";
        var factorLockMessageBodyLocalizedText = 'All the factors of the tool will be locked when you select "OK".';
        if (lang == 1036) {
            factorLockMessageTitleLocalizedText = "Avertissement";
            factorLockMessageBodyLocalizedText = "Tous les facteurs de l'outil vont \u00EAtre verrouill\u00E9 lorsque vous s\u00E9lectionner \"OK\".";
        }
        //Air Carrier (Passenger), Air Carrier(All Cargo), Operator of an Aerodrome
        var avSecOperationTypeGuides = ["{8B614EF0-C651-EB11-A812-000D3AF3AC0D}", "{E03381D0-C751-EB11-A812-000D3AF3AC0D}", "{E3238EDD-C651-EB11-A812-000D3AF3AC0D}"];
        var isROM20Form = false;
        //Toggle visibility of  RATE sections depending user business unit and rolls
        //Sets field Controls parameters (required, hidden, disabled, etc) depending on current form state
        function onLoad(eContext) {
            var formContext = eContext.getFormContext();
            var isDualInspector = false;
            var userRoles = Xrm.Utility.getGlobalContext().userSettings.roles;
            userRoles.forEach(function (role) {
                if (role.name == "ROM - Dual Inspector") {
                    isDualInspector = true;
                }
            });
            var formItem = formContext.ui.formSelector.getCurrentItem().getId();
            isROM20Form = formItem.toLowerCase() == "c01347bc-d346-447d-b902-4f411a0e9706";
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
                var operationTypeAttributeValue = formContext.getAttribute("ts_operationtype").getValue();
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
                        return __awaiter(this, void 0, void 0, function () {
                            var infractionID, infractionFetchXml;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        operationTypeOwningBusinessUnit = operationTypeBusinessUnit.entities[0].name;
                                        if (operationTypeAttributeValue != null) {
                                            infractionID = formContext.data.entity.getId();
                                            infractionFetchXml = [
                                                "<fetch>",
                                                "  <entity name='ts_infraction'>",
                                                "    <filter type='and'>",
                                                "      <condition attribute='ts_infractionid' operator='eq' value='", infractionID, "'/>",
                                                "    </filter>",
                                                "    <link-entity name='msdyn_functionallocation' from='msdyn_functionallocationid' to='ts_functionallocation' alias='site'>",
                                                "      <attribute name='ts_region'/>",
                                                "    </link-entity>",
                                                "  </entity>",
                                                "</fetch>"
                                            ].join("");
                                            infractionFetchXml = "?fetchXml=" + encodeURIComponent(infractionFetchXml);
                                            Xrm.WebApi.retrieveMultipleRecords("ts_infraction", infractionFetchXml).then(function (result) {
                                                return __awaiter(this, void 0, void 0, function () {
                                                    var currentInfraction, regionId, enforcementRecommendation, recordStatus, acceptRATERecommendation;
                                                    return __generator(this, function (_a) {
                                                        currentInfraction = result.entities[0];
                                                        regionId = currentInfraction["site.ts_region"];
                                                        //If Operation Type is Air Carrier (Passenger) or Air Carrier(All Cargo) or Operator of an Aerodrome and not international
                                                        if (avSecOperationTypeGuides.includes(operationTypeAttributeValue[0].id) && regionId != "3bf0fa88-150f-eb11-a813-000d3af3a7a7") { //GUID for International region
                                                            formContext.ui.tabs.get("tab_RATE").setVisible(true);
                                                            formContext.getControl("ts_finalenforcementaction").setDisabled(true);
                                                        }
                                                        else {
                                                            formContext.getControl("ts_finalenforcementaction").setDisabled(false);
                                                            formContext.ui.tabs.get("tab_RATE").setVisible(false);
                                                        }
                                                        formContext.getControl("header_ts_rateenforcementrecommendation").setVisible(true);
                                                        enforcementRecommendation = formContext.getAttribute("ts_rateenforcementrecommendation").getValue();
                                                        recordStatus = formContext.getAttribute("statuscode").getValue();
                                                        if (enforcementRecommendation != null && recordStatus != ts_infraction_statuscode.Complete) {
                                                            formContext.getControl("ts_acceptraterecommendation").setDisabled(false);
                                                        }
                                                        acceptRATERecommendation = formContext.getAttribute("ts_acceptraterecommendation").getValue();
                                                        if (acceptRATERecommendation != null) {
                                                            lockRATEFactors(eContext);
                                                        }
                                                        //If they did not accept the rate recommendation, show proposal sections and fields
                                                        if (formContext.getAttribute("ts_acceptraterecommendation").getValue() == ts_yesno.No) {
                                                            formContext.ui.tabs.get("tab_RATE").sections.get("RATE_proposed_section").setVisible(true);
                                                            setPostRATERecommendationSelectionFieldsVisibility(eContext);
                                                            RATEManagerDecisionOnChange(eContext);
                                                        }
                                                        return [2 /*return*/];
                                                    });
                                                });
                                            });
                                            // }
                                        }
                                        RATESpecificComplianceHistoryOnChange(eContext);
                                        return [4 /*yield*/, setApprovingTeamsViews(formContext)];
                                    case 1:
                                        _a.sent();
                                        if (formContext.getAttribute("statuscode").getValue() == ts_infraction_statuscode.Complete) {
                                            disableFormFields(formContext);
                                        }
                                        showHideNonComplianceTimeframe(formContext);
                                        return [2 /*return*/];
                                }
                            });
                        });
                    });
                    if (operationTypeAttributeValue != null && operationTypeAttributeValue[0].id == "{BE8B0910-C751-EB11-A812-000D3AF3AC0D}") { //Person
                        formContext.getControl("ts_contact").setVisible(true);
                    }
                    else {
                        formContext.getControl("ts_contact").setVisible(false);
                    }
                }
            });
            if (isROM20Form) {
                //    SubGridFilterExecution(eContext);
            }
        }
        Infraction.onLoad = onLoad;
        function onSave(eContext) {
            var formContext = eContext.getFormContext();
            var statusCodeAttribute = formContext.getAttribute("statuscode");
            var statusCodeValue = statusCodeAttribute.getValue();
            onLoad(eContext);
            if (statusCodeValue == ts_infraction_statuscode.Complete)
                return;
            var acceptRATERecommendation = formContext.getAttribute("ts_acceptraterecommendation").getValue();
            var rejectedRecommendation = acceptRATERecommendation == ts_yesno.No;
            var RATEManager = formContext.getAttribute("ts_ratemanager").getValue();
            var hasManagerFieldPopulated = RATEManager != null;
            if (rejectedRecommendation && hasManagerFieldPopulated) {
                statusCodeAttribute.setValue(ts_infraction_statuscode.Pending);
            }
            else {
                statusCodeAttribute.setValue(ts_infraction_statuscode.InProgress);
            }
        }
        Infraction.onSave = onSave;
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
        Infraction.RATEFieldOnChange = RATEFieldOnChange;
        //Calculate and set an Enforcement Recommendation with all RATE factors
        function calculateRATEEnforcementRecommendation(eContext) {
            return __awaiter(this, void 0, void 0, function () {
                var formContext, rateSpecificComplianceHistory, factor1Value, factor2Value, factor3Value, factor4Value, factor5Value, factor6Value, factor7Value, factor8Value, complianceHistory, enforcementHistory, factor1AssessmentRatingId, factor2AssessmentRatingId, factor3AssessmentRatingId, factor4AssessmentRatingId, factor5AssessmentRatingId, factor6AssessmentRatingId, factor7AssessmentRatingId, factor8AssessmentRatingId, factor1AssessmentRatingPromise, factor2AssessmentRatingPromise, factor3AssessmentRatingPromise, factor4AssessmentRatingPromise, factor5AssessmentRatingPromise, factor6AssessmentRatingPromise, factor7AssessmentRatingPromise, factor8AssessmentRatingPromise, thresholdsPromise;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            formContext = eContext.getFormContext();
                            rateSpecificComplianceHistory = formContext.getAttribute("ts_ratespecificnoncompliancehistory").getValue();
                            factor1Value = formContext.getAttribute("ts_rategeneralnoncompliancehistory").getValue();
                            factor2Value = formContext.getAttribute("ts_rateactualorpotentialharm").getValue();
                            factor3Value = formContext.getAttribute("ts_rateresponsibility").getValue();
                            factor4Value = formContext.getAttribute("ts_ratemitigationofharm").getValue();
                            factor5Value = formContext.getAttribute("ts_ratepreventingrecurrence").getValue();
                            factor6Value = formContext.getAttribute("ts_rateintentionality").getValue();
                            factor7Value = formContext.getAttribute("ts_rateeconomicbenefit").getValue();
                            factor8Value = formContext.getAttribute("ts_ratecooperation").getValue();
                            complianceHistory = formContext.getAttribute("ts_ratespecificnoncompliancehistory").getValue();
                            enforcementHistory = formContext.getAttribute("ts_ratepreviousenforcementmechanism").getValue();
                            //If any of the rate factors don't have a value, reset any fields that require an enforcement recommendation
                            if (rateSpecificComplianceHistory == null || factor1Value == null || factor2Value == null || factor3Value == null || factor4Value == null || factor5Value == null || factor6Value == null || factor7Value == null || factor8Value == null || ((complianceHistory != null && complianceHistory != ts_ratespecificcompliancehistory._0documentedpreviousidenticalorsimilarnoncompliances) && enforcementHistory == null)) {
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
                                enforcementHistory = ts_ratespecificenforcementhistory.Nil;
                            thresholdsPromise = Xrm.WebApi.retrieveMultipleRecords("ts_assessmentscorethredshots", "?$select=ts_minimum,ts_maximum,ts_rateenforcementaction&$filter=ts_assessmenttool eq ".concat(ts_assessmenttool.RATE, " and ts_rateenforcementhistory eq ").concat(enforcementHistory));
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
            if (formContext.getAttribute("ts_rateactualorpotentialharm").getValue() != null && formContext.getAttribute("ts_rateintentionality").getValue() != null && formContext.getAttribute("ts_rateeconomicbenefit").getValue() != null && formContext.getAttribute("ts_rateresponsibility").getValue() != null && formContext.getAttribute("ts_ratemitigationofharm").getValue() != null && formContext.getAttribute("ts_ratepreventingrecurrence").getValue() != null && formContext.getAttribute("ts_ratecooperation").getValue() != null && acceptRATERecommendation != null) {
                var confirmStrings = { text: factorLockMessageBodyLocalizedText, title: factorLockMessageTitleLocalizedText };
                Xrm.Navigation.openConfirmDialog(confirmStrings).then(function (success) {
                    if (success.confirmed) {
                        if (acceptRATERecommendation == ts_yesno.Yes) {
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
        Infraction.AcceptRATERecommendationOnChange = AcceptRATERecommendationOnChange;
        //Make the Accept RATE Recommendation field Visible if there is an Enforcement Recommendation 
        function RATEEnforcementRecommendationOnChange(eContext) {
            var formContext = eContext.getFormContext();
            var RATEEnforcementRecommendation = formContext.getAttribute("ts_rateenforcementrecommendation").getValue();
            var status = formContext.getAttribute("statuscode").getValue();
            if (RATEEnforcementRecommendation != null && status != ts_infraction_statuscode.Complete) {
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
        Infraction.RATEEnforcementRecommendationOnChange = RATEEnforcementRecommendationOnChange;
        function RATESpecificComplianceHistoryOnChange(eContext) {
            var formContext = eContext.getFormContext();
            var specificComplianceHistory = formContext.getAttribute("ts_ratespecificnoncompliancehistory").getValue();
            if (specificComplianceHistory != null && specificComplianceHistory != ts_ratespecificcompliancehistory._0documentedpreviousidenticalorsimilarnoncompliances) {
                formContext.getControl("ts_ratepreviousenforcementmechanism").setVisible(true);
            }
            else {
                formContext.getAttribute("ts_ratepreviousenforcementmechanism").setValue(null);
                formContext.getControl("ts_ratepreviousenforcementmechanism").setVisible(false);
            }
        }
        Infraction.RATESpecificComplianceHistoryOnChange = RATESpecificComplianceHistoryOnChange;
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
        Infraction.RATEInspectorRecommendationOnChange = RATEInspectorRecommendationOnChange;
        //Sets the RATE Final Enforcement Action depending on the Manager Decision
        //Sets Manager Section Controls to Required or Disabled depending on Manager Decision
        function RATEManagerDecisionOnChange(eContext) {
            var formContext = eContext.getFormContext();
            var RATEManagerDecision = formContext.getAttribute("ts_ratemanagerdecision").getValue();
            if (RATEManagerDecision == ts_ratemanagerdecision.AcceptInspectorRecommendation) {
                formContext.getAttribute("ts_finalenforcementaction").setValue(RATEEnforcementActionChoiceValueToFinalEnforcementActionChoiceValue(formContext.getAttribute("ts_rateinspectorrecommendation").getValue()));
                formContext.getAttribute("ts_ratemanageralternativerecommendation").setRequiredLevel("none");
                formContext.getControl("ts_ratemanageralternativerecommendation").setVisible(false);
                formContext.getAttribute("ts_ratemanageralternativerecommendation").setValue(null);
                formContext.getAttribute("ts_ratemanagerenforcementjustification").setRequiredLevel("required");
                formContext.getControl("ts_ratemanagerenforcementjustification").setDisabled(false);
            }
            else if (RATEManagerDecision == ts_ratemanagerdecision.AcceptRATERecommendation) {
                formContext.getAttribute("ts_finalenforcementaction").setValue(RATEEnforcementActionChoiceValueToFinalEnforcementActionChoiceValue(formContext.getAttribute("ts_rateenforcementrecommendation").getValue()));
                formContext.getAttribute("ts_ratemanageralternativerecommendation").setRequiredLevel("none");
                formContext.getControl("ts_ratemanageralternativerecommendation").setVisible(false);
                formContext.getAttribute("ts_ratemanageralternativerecommendation").setValue(null);
                formContext.getAttribute("ts_ratemanagerenforcementjustification").setRequiredLevel("required");
                formContext.getControl("ts_ratemanagerenforcementjustification").setDisabled(false);
            }
            else if (RATEManagerDecision == ts_ratemanagerdecision.ProvideAlternativeRecommendation) {
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
        Infraction.RATEManagerDecisionOnChange = RATEManagerDecisionOnChange;
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
        Infraction.RATEManagerAlternativeRecommendationOnChange = RATEManagerAlternativeRecommendationOnChange;
        function approvingRATETeamsOnChange(eContext) {
            var formContext = eContext.getFormContext();
            var RATEApprovingTeam = formContext.getAttribute("ts_rateapprovingteam").getValue();
            if (RATEApprovingTeam != null) {
                var viewIdApprovingManagerRATE = '{1c259fee-0541-4cac-8d20-7b30ee394a73}';
                var entityNameApprovingManagers = "systemuser";
                var viewDisplayNameApprovingManagers = "FilteredApprovingManagers";
                //Approving managers in the same region as the case with the ISSO Business Unit
                var fetchXmlApprovingManagersRATE = "<fetch distinct=\"true\" page=\"1\" no-lock=\"false\"><entity name=\"systemuser\"><attribute name=\"systemuserid\"/><attribute name=\"fullname\"/><link-entity name=\"teammembership\" from=\"systemuserid\" to=\"systemuserid\" intersect=\"true\"><filter><condition attribute=\"teamid\" operator=\"eq\" value=\"".concat(RATEApprovingTeam[0].id, "\"/></filter></link-entity></entity></fetch>");
                var layoutXmlApprovingManagers = '<grid name="resultset" object="8" jump="fullname" select="1" icon="1" preview="1"><row name="result" id="systemuserid"><cell name="fullname" width="300" /></row></grid>';
                formContext.getControl("ts_ratemanager").addCustomView(viewIdApprovingManagerRATE, entityNameApprovingManagers, viewDisplayNameApprovingManagers, fetchXmlApprovingManagersRATE, layoutXmlApprovingManagers, true);
                formContext.getControl("ts_ratemanager").setDisabled(false);
            }
            else {
                formContext.getAttribute("ts_ratemanager").setValue();
                formContext.getControl("ts_ratemanager").setDisabled(true);
            }
        }
        Infraction.approvingRATETeamsOnChange = approvingRATETeamsOnChange;
        function issueAddressedOnSiteOnChange(eContext) {
            var formContext = eContext.getFormContext();
            showHideNonComplianceTimeframe(formContext);
        }
        Infraction.issueAddressedOnSiteOnChange = issueAddressedOnSiteOnChange;
        function showHideNonComplianceTimeframe(formContext) {
            var addressedOnSiteAttribute = formContext.getAttribute("ts_issueaddressedonsite");
            var nonComplianceTimeframeAttribute = formContext.getAttribute("ts_noncompliancetimeframe");
            var nonComplianceTimeframeControl = formContext.getControl("ts_noncompliancetimeframe");
            if (addressedOnSiteAttribute != null && nonComplianceTimeframeAttribute != null) {
                var addressedOnSiteValue = addressedOnSiteAttribute.getValue();
                if (addressedOnSiteValue == ts_yesno.No) {
                    //Show timeframe field
                    nonComplianceTimeframeControl.setVisible(true);
                }
                else {
                    //Hide timeframe field
                    nonComplianceTimeframeControl.setVisible(false);
                }
            }
        }
        //Clears, Hides, and sets Required level to None for every field in the RATE Proposed Section
        function RATEHideProposedSection(eContext) {
            var formContext = eContext.getFormContext();
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
        //Infraction has no NCAT fields, so the NCAT-related code is unused, might need to be removed in a future cleanup.
        function setApprovingTeamsViews(form) {
            return __awaiter(this, void 0, void 0, function () {
                var viewIdApprovingTeamNCAT, viewIdApprovingTeamRATE, entityNameApprovingTeams, viewDisplayNameApprovingTeams, issoBUGUIDs, avSecBUGUIDs, issoBUFilterConditions, i, avSecBUFilterConditions, i, fetchXmlApprovingTeamsNCAT, fetchXmlApprovingTeamsRATE, layoutXmlApprovingTeams;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            viewIdApprovingTeamNCAT = '{3c259fee-0541-4cac-8d20-7b30ee397ca7}';
                            viewIdApprovingTeamRATE = '{3c259fee-0541-4cac-8d20-7b30ee394a73}';
                            entityNameApprovingTeams = "team";
                            viewDisplayNameApprovingTeams = "FilteredApprovingTeams";
                            return [4 /*yield*/, getISSOBUGUIDs()];
                        case 1:
                            issoBUGUIDs = _a.sent();
                            return [4 /*yield*/, getAvSecBUGUIDs()];
                        case 2:
                            avSecBUGUIDs = _a.sent();
                            issoBUFilterConditions = '';
                            if (issoBUGUIDs.length > 0) {
                                if (issoBUGUIDs.length === 1) {
                                    issoBUFilterConditions = "<condition attribute=\"businessunitid\" operator=\"eq\" value=\"".concat(issoBUGUIDs[0], "\"/>");
                                }
                                else {
                                    issoBUFilterConditions = '<filter type="or">';
                                    for (i = 0; i < issoBUGUIDs.length; i++) {
                                        issoBUFilterConditions += "<condition attribute=\"businessunitid\" operator=\"eq\" value=\"".concat(issoBUGUIDs[i], "\"/>");
                                    }
                                    issoBUFilterConditions += '</filter>';
                                }
                            }
                            else {
                                // No ISSO BU GUIDs found - use a condition that will never match to prevent invalid FetchXML
                                issoBUFilterConditions = "<condition attribute=\"businessunitid\" operator=\"eq\" value=\"00000000-0000-0000-0000-000000000000\"/>";
                            }
                            avSecBUFilterConditions = '';
                            if (avSecBUGUIDs.length > 0) {
                                if (avSecBUGUIDs.length === 1) {
                                    avSecBUFilterConditions = "<condition attribute=\"businessunitid\" operator=\"eq\" value=\"".concat(avSecBUGUIDs[0], "\"/>");
                                }
                                else {
                                    avSecBUFilterConditions = '<filter type="or">';
                                    for (i = 0; i < avSecBUGUIDs.length; i++) {
                                        avSecBUFilterConditions += "<condition attribute=\"businessunitid\" operator=\"eq\" value=\"".concat(avSecBUGUIDs[i], "\"/>");
                                    }
                                    avSecBUFilterConditions += '</filter>';
                                }
                            }
                            else {
                                // No AvSec BU GUIDs found - use a condition that will never match to prevent invalid FetchXML
                                avSecBUFilterConditions = "<condition attribute=\"businessunitid\" operator=\"eq\" value=\"00000000-0000-0000-0000-000000000000\"/>";
                            }
                            fetchXmlApprovingTeamsNCAT = "<fetch output-format=\"xml-platform\" mapping=\"logical\" no-lock=\"false\"><entity name=\"team\"><attribute name=\"name\"/><attribute name=\"businessunitid\"/><attribute name=\"teamid\"/><attribute name=\"teamtype\"/><filter type=\"and\"><condition attribute=\"teamtype\" operator=\"eq\" value=\"0\"/><condition attribute=\"ts_territory\" operator=\"not-null\"/></filter><order attribute=\"name\" descending=\"false\"/><link-entity name=\"businessunit\" from=\"businessunitid\" to=\"businessunitid\"><filter>".concat(issoBUFilterConditions, "</filter></link-entity></entity></fetch>");
                            fetchXmlApprovingTeamsRATE = "<fetch output-format=\"xml-platform\" mapping=\"logical\" no-lock=\"false\"><entity name=\"team\"><attribute name=\"name\"/><attribute name=\"businessunitid\"/><attribute name=\"teamid\"/><attribute name=\"teamtype\"/><filter type=\"and\"><condition attribute=\"teamtype\" operator=\"eq\" value=\"0\"/><condition attribute=\"ts_territory\" operator=\"not-null\"/></filter><order attribute=\"name\" descending=\"false\"/><link-entity name=\"businessunit\" from=\"businessunitid\" to=\"businessunitid\"><filter>".concat(avSecBUFilterConditions, "</filter></link-entity></entity></fetch>");
                            layoutXmlApprovingTeams = '<grid name="resultset" object="8" jump="name" select="1" icon="1" preview="1"><row name="result" id="businessunitid"><cell name="name" width="300" /></row></grid>';
                            // Apply the AvSec BU-based custom view to the RATE Approving Team lookup
                            form.getControl("ts_rateapprovingteam").addCustomView(viewIdApprovingTeamRATE, entityNameApprovingTeams, viewDisplayNameApprovingTeams, fetchXmlApprovingTeamsRATE, layoutXmlApprovingTeams, true);
                            // Set it as the default view so the lookup uses it
                            form.getControl("ts_rateapprovingteam").setDefaultView(viewIdApprovingTeamRATE);
                            return [2 /*return*/];
                    }
                });
            });
        }
        function setPostRATERecommendationSelectionFieldsVisibility(eContext) {
            var formContext = eContext.getFormContext();
            var acceptRATERecommendation = formContext.getAttribute("ts_acceptraterecommendation").getValue();
            if (acceptRATERecommendation == ts_yesno.No || acceptRATERecommendation == ts_yesno.Yes) {
                lockRATEFactors(eContext);
                formContext.getControl("ts_acceptraterecommendation").setDisabled(true);
            }
            //If they did not accept the RATE recommendation
            if (acceptRATERecommendation == ts_yesno.No) {
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
                if (formContext.getAttribute("ts_ratemanager").getValue() != null) {
                    var userRoles = Xrm.Utility.getGlobalContext().userSettings.roles;
                    //If the user is a system admin or ROM - Manager, show the RATE manager review section
                    var isAdminOrManager_1 = false;
                    userRoles.forEach(function (role) {
                        if (role.name == "System Administrator" || role.name == "ROM - Manager") {
                            isAdminOrManager_1 = true;
                        }
                    });
                    var currentUserId = Xrm.Utility.getGlobalContext().userSettings.userId;
                    var rateManagerValue = formContext.getAttribute("ts_ratemanager").getValue();
                    if (rateManagerValue != null) {
                        var approvingManagerId = rateManagerValue[0].id;
                        if (currentUserId == approvingManagerId) {
                            isAdminOrManager_1 = true;
                        }
                    }
                    if (isAdminOrManager_1) {
                        formContext.ui.tabs.get("tab_RATE").sections.get("RATE_manager_review").setVisible(true);
                    }
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
            formContext.getControl("ts_ratemitigationofharm").setDisabled(true);
            formContext.getControl("ts_ratepreventingrecurrence").setDisabled(true);
            formContext.getControl("ts_ratecooperation").setDisabled(true);
            formContext.getControl("ts_ratespecificnoncompliancehistory").setDisabled(true);
            formContext.getControl("ts_rategeneralnoncompliancehistory").setDisabled(true);
            formContext.getControl("ts_ratepreviousenforcementmechanism").setDisabled(true);
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
        //Takes a RATE Enforcement Action Choice Value and returns the corresponding Final Enforcement Action Choice Value
        function RATEEnforcementActionChoiceValueToFinalEnforcementActionChoiceValue(NCATValue) {
            switch (NCATValue) {
                case ts_raterecommendations.Nil:
                    return ts_finalenforcementaction.Nil;
                case ts_raterecommendations.VerbalWarning:
                    return ts_finalenforcementaction.VerbalWarning;
                case ts_raterecommendations.WrittenWarning:
                    return ts_finalenforcementaction.WrittenWarning;
                case ts_raterecommendations.AMPLevel120ofMaximum:
                    return ts_finalenforcementaction.AMPLevel120ofMaximum;
                case ts_raterecommendations.AMPLevel250ofMaximum:
                    return ts_finalenforcementaction.AMPLevel250ofMaximum;
                case ts_raterecommendations.AMPLevel3100ofMaximum:
                    return ts_finalenforcementaction.AMPLevel3100ofMaximum;
                case ts_raterecommendations.SuspensionofCAD:
                    return ts_finalenforcementaction.SuspensionofCAD;
                case ts_raterecommendations.CancellationofCAD:
                    return ts_finalenforcementaction.CancellationofCAD;
                default:
                    return 0;
            }
        }
        function SubGridFilterExecution(eContext) {
            var formContext = eContext.getFormContext();
            var gridControl = formContext.getControl("relatedfinding_grid");
            var accountobjectid = formContext.getAttribute("ts_contact").getValue();
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
        Infraction.SubGridFilterExecution = SubGridFilterExecution;
    })(Infraction = ROM.Infraction || (ROM.Infraction = {}));
})(ROM || (ROM = {}));
