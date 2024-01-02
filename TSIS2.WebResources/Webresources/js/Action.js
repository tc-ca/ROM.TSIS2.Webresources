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
    var Action;
    (function (Action) {
        var isISSO = false;
        //Ideally we should retrieve the values automatically from the form so we don't have to update this file every time the option sets changes. getOptionSets and retrieveOptionSetValues *should* do this but no values are retrieved onLoad, could be because the form is not fully loaded/initiated yet or something with async. To check. 
        var allDeliveryMethodOptions = [
            { text: "Verbal", value: 741130000 /* Verbal */ },
            { text: "In Person", value: 741130006 /* InPerson */ },
            { text: "Telephone", value: 741130007 /* Telephone */ },
            { text: "Email", value: 741130001 /* Email */ },
            { text: "SSCIMS", value: 741130002 /* SSCIMS */ },
            { text: "Letter - Hand delivered", value: 741130003 /* LetterHandDelivered */ },
            { text: "Letter - Mail", value: 741130004 /* LetterMail */ },
            { text: "Letter - Registered Mail", value: 741130005 /* LetterRegisteredMail */ }
        ];
        var allActionCategoryOptions = [
            { text: "Administrative Action", value: 741130000 /* AdministrativeAction */ },
            { text: "Corrective Action", value: 741130001 /* CorrectiveAction */ },
            { text: "Enforcement Action", value: 741130002 /* EnforcementAction */ },
            { text: "Immediate Harm Reduction Measure", value: 741130003 /* ImmediateHarmReductionMeasure */ },
            { text: "Legal Action", value: 741130004 /* LegalAction */ },
            { text: "REU Enforcement Action", value: 741130006 /* REUEnforcementAction */ },
            { text: "TATC Action", value: 741130005 /* TATCAction */ },
        ];
        var allActionStatus = [
            { text: "Consulted", value: 741130000 /* Consulted */ },
            { text: "Convened", value: 741130001 /* Convened */ },
            { text: "Delivered", value: 741130002 /* Delivered */ },
            { text: "Received", value: 741130003 /* Received */ },
            { text: "Referred", value: 741130006 /* Referred */ },
            { text: "Requested", value: 741130004 /* Requested */ },
            { text: "Sworn", value: 741130005 /* Sworn */ }
        ];
        var allActionTypes = [
            { text: "AMP", value: 741130029 /* AMP */ },
            { text: "Administrative monetary penalty", value: 741130001 /* Administrativemonetarypenalty */ },
            { text: "Affidavit Of Service | AMP", value: ts_actiontype.AffidavitOfServiceAMP },
            { text: "Affidavit Of Service | Cancellation/Suspension of CAD", value: 741130026 /* AffidavitOfServiceCancellationSuspensionofCAD */ },
            { text: "Affidavit of Service", value: 741130000 /* AffidavitofService */ },
            { text: "AMP - Payment", value: ts_actiontype.AMPPayment },
            { text: "Corrective Action Plan", value: ts_actiontype.CorrectiveActionPlan },
            { text: "Correspondence", value: 741130003 /* Correspondence */ },
            { text: "Detention of Aircraft", value: 741130014 /* DetentionofAircraft */ },
            { text: "Informal Meeting", value: ts_actiontype.InformalMeeting },
            { text: "Legal Counsel", value: ts_actiontype.LegalCounsel },
            { text: "Letter - Commitment", value: ts_actiontype.LetterCommitment },
            { text: "Letter - Non-compliance", value: ts_actiontype.LetterNoncompliance },
            { text: "Letter - SSC OSA Further Action", value: ts_actiontype.LetterSSCOSAFurtherAction },
            { text: "Notification | Non-compliance", value: 741130027 /* NotificationNoncompliance */ },
            { text: "Notice of Assessment of Monetary Penalty", value: 741130009 /* NoticeofAssessmentofMonetaryPenalty */ },
            { text: "Other", value: 741130015 /* Other */ },
            { text: "Prosecution", value: 741130010 /* Prosecution */ },
            { text: "Punitive Suspension of CAD", value: 741130011 /* PunitiveSuspensionofCAD */ },
            { text: "Regional Enforcement Unit (REU)", value: ts_actiontype.RegionalEnforcementUnitREU },
            { text: "TATC | Appeal Application", value: 741130018 /* TATCAppealApplication */ },
            { text: "TATC | Appeal Determination", value: 741130019 /* TATCAppealDetermination */ },
            { text: "TATC | Appeal Hearing", value: 741130020 /* TATCAppealHearing */ },
            { text: "TATC | Certificate for unpaid AMP", value: 741130021 /* TATCCertificateforunpaidAMP */ },
            { text: "TATC | Determination", value: 741130022 /* TATCDetermination */ },
            { text: "TATC | Review Application", value: 741130023 /* TATCReviewApplication */ },
            { text: "TATC | Review Hearing", value: ts_actiontype.TATCReviewHearing },
            { text: "Verbal Warning", value: 741130012 /* VerbalWarning */ },
            { text: "Written Notice", value: 741130028 /* WrittenNotice */ },
            { text: "Written Warning", value: 741130013 /* WrittenWarning */ }
        ];
        function onLoad(eContext) {
            return __awaiter(this, void 0, void 0, function () {
                var form, formType, caseAttributeValue;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            form = eContext.getFormContext();
                            formType = form.ui.getFormType();
                            caseAttributeValue = form.getAttribute("ts_case").getValue();
                            if (!caseAttributeValue) return [3 /*break*/, 2];
                            return [4 /*yield*/, isISSOAction(caseAttributeValue[0].id)];
                        case 1:
                            isISSO = _a.sent();
                            _a.label = 2;
                        case 2:
                            if (formType === 2) {
                                //setRelatedFindingsFetchXML(form);
                                filterCategory(form);
                                actionCategoryOnChange(eContext, true);
                                if (form.getAttribute("ts_actiontype").getValue() != null) {
                                    actionTypeOnChange(eContext);
                                }
                            }
                            return [2 /*return*/];
                    }
                });
            });
        }
        Action.onLoad = onLoad;
        function isISSOAction(caseId) {
            return __awaiter(this, void 0, void 0, function () {
                var caseOwningBUFetchXML, incident, businessunit;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            caseOwningBUFetchXML = [
                                "<fetch version='1.0' mapping='logical' returntotalrecordcount='true' no-lock='false'>",
                                "  <entity name='incident'>",
                                "    <attribute name='owningbusinessunit' />",
                                "     <filter>",
                                "       <condition attribute='incidentid' operator='eq' value='", caseId, "'/>",
                                "     </filter>",
                                "  </entity>",
                                "</fetch>"
                            ].join("");
                            caseOwningBUFetchXML = "?fetchXml=" + encodeURIComponent(caseOwningBUFetchXML);
                            return [4 /*yield*/, Xrm.WebApi.retrieveMultipleRecords('incident', caseOwningBUFetchXML)];
                        case 1:
                            incident = _a.sent();
                            if (!(incident.entities.length > 0)) return [3 /*break*/, 3];
                            return [4 /*yield*/, Xrm.WebApi.retrieveRecord('businessunit', incident.entities[0]._owningbusinessunit_value, '?$select=name')];
                        case 2:
                            businessunit = _a.sent();
                            if (businessunit.name.startsWith("Intermodal")) {
                                isISSO = true;
                            }
                            _a.label = 3;
                        case 3: return [2 /*return*/, isISSO];
                    }
                });
            });
        }
        function setOptions(attribute, options) {
            if (options) {
                attribute.clearOptions();
                options.forEach(function (option) { return attribute.addOption(option); });
            }
        }
        function clearNonActionFields(form) {
            form.getAttribute("ts_stakeholder").setValue(null);
            form.getAttribute("ts_contact").setValue(null);
            form.getAttribute("ts_deliverymethod").setValue(null);
            form.getAttribute("ts_location").setValue(null);
            form.getAttribute("ts_details").setValue(null);
            form.getAttribute("ts_duedate").setValue(null);
        }
        function resetFieldsVisibility(form) {
            form.getControl("ts_stakeholder").setVisible(true);
            form.getControl("ts_contact").setVisible(true);
            form.getControl("ts_deliverymethod").setVisible(true);
            form.getControl("ts_duedate").setVisible(true);
            form.getControl("ts_location").setVisible(true);
            form.getControl("ts_details").setVisible(true);
        }
        function actionCategoryOnChange(eContext, onLoad) {
            if (onLoad === void 0) { onLoad = false; }
            var form = eContext.getFormContext();
            var actionCategoryAttributeValue = form.getAttribute("ts_actioncategory").getValue();
            if (!actionCategoryAttributeValue) {
                form.getAttribute("ts_actiontype").setValue(null);
                form.getAttribute("ts_actionstatus").setValue(null);
                clearNonActionFields(form);
            }
            else {
                resetFieldsVisibility(form);
            }
            if (!onLoad) {
                form.getAttribute("ts_actionstatus").setValue(null);
            }
            filterTypes(form);
        }
        Action.actionCategoryOnChange = actionCategoryOnChange;
        function filterTypes(form) {
            var actionCategoryAttributeValue = form.getAttribute("ts_actioncategory").getValue();
            var actionTypeAttribute = form.getControl("ts_actiontype");
            var filteredActionTypeOptions = allActionTypes;
            if (isISSO) {
                switch (actionCategoryAttributeValue) {
                    case 741130001 /* CorrectiveAction */:
                        filteredActionTypeOptions = createFilteredOptions([ts_actiontype.CorrectiveActionPlan], allActionTypes);
                        break;
                    case 741130002 /* EnforcementAction */:
                        filteredActionTypeOptions = createFilteredOptions([
                            741130012 /* VerbalWarning */,
                            ts_actiontype.RegionalEnforcementUnitREU,
                            741130013 /* WrittenWarning */,
                        ], allActionTypes);
                        break;
                }
            }
            else {
                switch (actionCategoryAttributeValue) {
                    case 741130000 /* AdministrativeAction */:
                        filteredActionTypeOptions = createFilteredOptions([
                            ts_actiontype.AffidavitOfServiceAMP,
                            741130026 /* AffidavitOfServiceCancellationSuspensionofCAD */,
                            ts_actiontype.InformalMeeting,
                            741130003 /* Correspondence */,
                            ts_actiontype.LetterSSCOSAFurtherAction,
                            ts_actiontype.LetterNoncompliance,
                            ts_actiontype.LetterCommitment,
                            ts_actiontype.AMPPayment,
                            741130027 /* NotificationNoncompliance */,
                            741130028 /* WrittenNotice */,
                        ], allActionTypes);
                        break;
                    case 741130001 /* CorrectiveAction */:
                        filteredActionTypeOptions = createFilteredOptions([ts_actiontype.CorrectiveActionPlan], allActionTypes);
                        break;
                    case 741130002 /* EnforcementAction */:
                        filteredActionTypeOptions = createFilteredOptions([
                            741130029 /* AMP */,
                            741130010 /* Prosecution */,
                            741130011 /* PunitiveSuspensionofCAD */,
                            741130012 /* VerbalWarning */,
                            741130013 /* WrittenWarning */,
                        ], allActionTypes);
                        break;
                    case 741130003 /* ImmediateHarmReductionMeasure */:
                        filteredActionTypeOptions = createFilteredOptions([
                            741130014 /* DetentionofAircraft */,
                            741130015 /* Other */
                        ], allActionTypes);
                        break;
                    case 741130004 /* LegalAction */:
                        filteredActionTypeOptions = createFilteredOptions([ts_actiontype.RegionalEnforcementUnitREU, ts_actiontype.LegalCounsel], allActionTypes);
                        break;
                    case 741130006 /* REUEnforcementAction */:
                        filteredActionTypeOptions = createFilteredOptions([
                            741130029 /* AMP */,
                            741130010 /* Prosecution */,
                            741130011 /* PunitiveSuspensionofCAD */,
                            741130012 /* VerbalWarning */,
                            741130013 /* WrittenWarning */,
                        ], allActionTypes);
                        break;
                    case 741130005 /* TATCAction */:
                        filteredActionTypeOptions = createFilteredOptions([
                            741130021 /* TATCCertificateforunpaidAMP */,
                            741130018 /* TATCAppealApplication */,
                            741130019 /* TATCAppealDetermination */,
                            741130022 /* TATCDetermination */,
                            741130023 /* TATCReviewApplication */,
                            ts_actiontype.TATCReviewHearing,
                            741130020 /* TATCAppealHearing */,
                        ], allActionTypes);
                        break;
                }
            }
            setOptions(actionTypeAttribute, filteredActionTypeOptions);
        }
        function actionTypeOnChange(eContext) {
            var form = eContext.getFormContext();
            var actionCategoryAttributeValue = form.getAttribute("ts_actioncategory").getValue();
            var actionTypeAttributeValue = form.getAttribute("ts_actiontype").getValue();
            var deliveryMethodAttribute = form.getControl("ts_deliverymethod");
            var actionStatusAttribute = form.getControl("ts_actionstatus");
            if (isISSO) {
                handleISSOTypeChange(form, actionCategoryAttributeValue, actionTypeAttributeValue, deliveryMethodAttribute, actionStatusAttribute);
            }
            else {
                handleAvSecTypeChange(form, actionCategoryAttributeValue, actionTypeAttributeValue, deliveryMethodAttribute, actionStatusAttribute);
            }
        }
        Action.actionTypeOnChange = actionTypeOnChange;
        function handleISSOTypeChange(form, actionCategoryAttributeValue, actionTypeAttributeValue, deliveryMethodAttribute, actionStatusAttribute) {
            if (!actionTypeAttributeValue) {
                form.getAttribute("ts_actionstatus").setValue(null);
                clearNonActionFields(form);
                return;
            }
            var filteredDeliveryOptions = allDeliveryMethodOptions;
            var filteredActionStatusOptions = allActionStatus;
            switch (actionCategoryAttributeValue) {
                case 741130002 /* EnforcementAction */:
                    switch (actionTypeAttributeValue) {
                        case 741130012 /* VerbalWarning */:
                            form.getControl("ts_stakeholder").setVisible(true);
                            form.getControl("ts_contact").setVisible(true);
                            form.getControl("ts_deliverymethod").setVisible(true);
                            form.getControl("ts_timedate").setVisible(true);
                            form.getControl("ts_details").setVisible(true);
                            form.getControl("ts_location").setVisible(false);
                            form.getControl("ts_duedate").setVisible(false);
                            filteredDeliveryOptions = createFilteredOptions([
                                741130006 /* InPerson */, 741130007 /* Telephone */, 741130001 /* Email */
                            ], allDeliveryMethodOptions);
                            filteredActionStatusOptions = createFilteredOptions([741130002 /* Delivered */], allActionStatus);
                            break;
                        case 741130013 /* WrittenWarning */:
                            form.getControl("ts_stakeholder").setVisible(true);
                            form.getControl("ts_contact").setVisible(true);
                            form.getControl("ts_deliverymethod").setVisible(true);
                            form.getControl("ts_timedate").setVisible(true);
                            form.getControl("ts_details").setVisible(true);
                            form.getControl("ts_location").setVisible(false);
                            form.getControl("ts_duedate").setVisible(false);
                            filteredDeliveryOptions = createFilteredOptions([
                                741130001 /* Email */,
                                741130003 /* LetterHandDelivered */,
                                741130004 /* LetterMail */,
                                741130005 /* LetterRegisteredMail */,
                                741130002 /* SSCIMS */
                            ], allDeliveryMethodOptions);
                            filteredActionStatusOptions = createFilteredOptions([741130002 /* Delivered */], allActionStatus);
                            break;
                        case ts_actiontype.RegionalEnforcementUnitREU:
                            form.getControl("ts_stakeholder").setVisible(false);
                            form.getControl("ts_contact").setVisible(false);
                            form.getControl("ts_deliverymethod").setVisible(false);
                            form.getControl("ts_location").setVisible(false);
                            form.getControl("ts_duedate").setVisible(false);
                            form.getControl("ts_timedate").setVisible(true);
                            form.getControl("ts_details").setVisible(true);
                            filteredActionStatusOptions = createFilteredOptions([741130006 /* Referred */], allActionStatus);
                            break;
                        default:
                            resetFieldsVisibility(form);
                    }
                    break;
                case 741130001 /* CorrectiveAction */:
                    switch (actionTypeAttributeValue) {
                        case ts_actiontype.CorrectiveActionPlan:
                            form.getControl("ts_stakeholder").setVisible(true);
                            form.getControl("ts_contact").setVisible(true);
                            form.getControl("ts_duedate").setVisible(true);
                            form.getControl("ts_timedate").setVisible(true);
                            form.getControl("ts_details").setVisible(true);
                            form.getControl("ts_location").setVisible(false);
                            form.getControl("ts_deliverymethod").setVisible(false);
                            filteredActionStatusOptions = createFilteredOptions([741130004 /* Requested */, 741130003 /* Received */], allActionStatus);
                            break;
                        default:
                            resetFieldsVisibility(form);
                    }
                    break;
                default:
                    resetFieldsVisibility(form);
            }
            setOptions(deliveryMethodAttribute, filteredDeliveryOptions);
            form.getAttribute("ts_deliverymethod").setValue(null);
            setOptions(actionStatusAttribute, filteredActionStatusOptions);
            var currentActionStatusValue = form.getAttribute("ts_actionstatus").getValue();
            var valueExists = filteredActionStatusOptions.some(function (option) { return option.value === currentActionStatusValue; });
            if (!valueExists) {
                form.getAttribute("ts_actionstatus").setValue(null);
            }
        }
        function handleAvSecTypeChange(form, actionCategoryAttributeValue, actionTypeAttributeValue, deliveryMethodAttribute, actionStatusAttribute) {
            if (!actionTypeAttributeValue) {
                form.getAttribute("ts_actionstatus").setValue(null);
                return;
            }
            clearNonActionFields(form);
            var filteredDeliveryOptions = allDeliveryMethodOptions;
            var filteredActionStatusOptions = allActionStatus;
            switch (actionCategoryAttributeValue) {
                case 741130000 /* AdministrativeAction */:
                    switch (actionTypeAttributeValue) {
                        case ts_actiontype.AffidavitOfServiceAMP:
                        case 741130026 /* AffidavitOfServiceCancellationSuspensionofCAD */:
                            filteredActionStatusOptions = createFilteredOptions([741130005 /* Sworn */], allActionStatus);
                            break;
                        case ts_actiontype.InformalMeeting:
                            filteredActionStatusOptions = createFilteredOptions([741130002 /* Delivered */, 741130001 /* Convened */], allActionStatus);
                            break;
                        case 741130003 /* Correspondence */:
                        case ts_actiontype.LetterCommitment:
                        case ts_actiontype.LetterNoncompliance:
                        case ts_actiontype.LetterSSCOSAFurtherAction:
                            filteredActionStatusOptions = createFilteredOptions([741130002 /* Delivered */, 741130003 /* Received */], allActionStatus);
                            break;
                        case ts_actiontype.AMPPayment:
                            filteredActionStatusOptions = createFilteredOptions([741130003 /* Received */], allActionStatus);
                            break;
                        case 741130027 /* NotificationNoncompliance */:
                        case 741130028 /* WrittenNotice */:
                            filteredActionStatusOptions = createFilteredOptions([741130002 /* Delivered */], allActionStatus);
                            break;
                        default:
                            resetFieldsVisibility(form);
                    }
                    break;
                case 741130001 /* CorrectiveAction */:
                    switch (actionTypeAttributeValue) {
                        case ts_actiontype.CorrectiveActionPlan:
                            filteredActionStatusOptions = createFilteredOptions([741130004 /* Requested */, 741130003 /* Received */], allActionStatus);
                            break;
                        default:
                            resetFieldsVisibility(form);
                    }
                    break;
                case 741130002 /* EnforcementAction */:
                    switch (actionTypeAttributeValue) {
                        case 741130029 /* AMP */:
                        case 741130010 /* Prosecution */:
                        case 741130011 /* PunitiveSuspensionofCAD */:
                        case 741130012 /* VerbalWarning */:
                        case 741130013 /* WrittenWarning */:
                            filteredActionStatusOptions = createFilteredOptions([741130002 /* Delivered */], allActionStatus);
                            break;
                        default:
                            resetFieldsVisibility(form);
                    }
                    break;
                case 741130003 /* ImmediateHarmReductionMeasure */:
                    switch (actionTypeAttributeValue) {
                        case 741130014 /* DetentionofAircraft */:
                        case 741130015 /* Other */:
                            filteredActionStatusOptions = createFilteredOptions([741130002 /* Delivered */], allActionStatus);
                            break;
                        default:
                            resetFieldsVisibility(form);
                    }
                    break;
                case 741130004 /* LegalAction */:
                    switch (actionTypeAttributeValue) {
                        case ts_actiontype.RegionalEnforcementUnitREU:
                            filteredActionStatusOptions = createFilteredOptions([741130000 /* Consulted */, 741130006 /* Referred */], allActionStatus);
                            break;
                        case ts_actiontype.LegalCounsel:
                            filteredActionStatusOptions = createFilteredOptions([741130000 /* Consulted */], allActionStatus);
                            break;
                        default:
                            resetFieldsVisibility(form);
                    }
                    break;
                case 741130006 /* REUEnforcementAction */:
                    switch (actionTypeAttributeValue) {
                        case 741130029 /* AMP */:
                        case 741130010 /* Prosecution */:
                        case 741130011 /* PunitiveSuspensionofCAD */:
                        case 741130012 /* VerbalWarning */:
                        case 741130013 /* WrittenWarning */:
                            filteredActionStatusOptions = createFilteredOptions([741130003 /* Received */], allActionStatus);
                            break;
                        default:
                            resetFieldsVisibility(form);
                    }
                    break;
                case 741130005 /* TATCAction */:
                    switch (actionTypeAttributeValue) {
                        case 741130018 /* TATCAppealApplication */:
                            filteredActionStatusOptions = createFilteredOptions([741130002 /* Delivered */, 741130003 /* Received */], allActionStatus);
                            break;
                        case 741130019 /* TATCAppealDetermination */:
                        case 741130022 /* TATCDetermination */:
                            filteredActionStatusOptions = createFilteredOptions([741130003 /* Received */], allActionStatus);
                            break;
                        case 741130020 /* TATCAppealHearing */:
                        case ts_actiontype.TATCReviewHearing:
                            filteredActionStatusOptions = createFilteredOptions([741130001 /* Convened */], allActionStatus);
                            break;
                        case 741130021 /* TATCCertificateforunpaidAMP */:
                            filteredActionStatusOptions = createFilteredOptions([741130004 /* Requested */, 741130003 /* Received */], allActionStatus);
                            break;
                        case 741130023 /* TATCReviewApplication */:
                            filteredActionStatusOptions = createFilteredOptions([741130003 /* Received */], allActionStatus);
                            break;
                        default:
                            resetFieldsVisibility(form);
                    }
                    break;
            }
            setOptions(deliveryMethodAttribute, filteredDeliveryOptions);
            form.getAttribute("ts_deliverymethod").setValue(null);
            setOptions(actionStatusAttribute, filteredActionStatusOptions);
            var currentActionStatusValue = form.getAttribute("ts_actionstatus").getValue();
            var valueExists = filteredActionStatusOptions.some(function (option) { return option.value === currentActionStatusValue; });
            if (!valueExists) {
                form.getAttribute("ts_actionstatus").setValue(null);
            }
        }
        function actionStatusOnChange(eContext) {
            var form = eContext.getFormContext();
            var actionStatus = form.getAttribute("ts_actionstatus").getValue();
            if (actionStatus != null && (actionStatus == 741130000 /* Consulted */ || actionStatus == 741130001 /* Convened */ || actionStatus == 741130006 /* Referred */)) {
                form.getControl("ts_deliverymethod").setVisible(false);
                form.getControl("ts_amtamount").setVisible(false);
                form.getControl("ts_duedate").setVisible(false);
            }
            else {
                form.getControl("ts_deliverymethod").setVisible(true);
                form.getControl("ts_amtamount").setVisible(true);
                form.getControl("ts_duedate").setVisible(true);
                var actionType = form.getAttribute("ts_actiontype").getValue();
                if (actionType != null && actionType == ts_actiontype.AMPPayment) {
                    form.getControl("ts_amtamount").setVisible(true);
                    if (actionStatus != null && actionStatus == 741130004 /* Requested */) {
                        form.getControl("ts_duedate").setVisible(true);
                    }
                    else {
                        form.getControl("ts_duedate").setVisible(false);
                    }
                }
                else {
                    form.getControl("ts_amtamount").setVisible(false);
                    form.getControl("ts_duedate").setVisible(false);
                }
            }
        }
        Action.actionStatusOnChange = actionStatusOnChange;
        function createFilteredOptions(options, allOptionsSet) {
            var reverseLookup = Object.fromEntries(allOptionsSet.map(function (option) { return [option.value, option.text]; }));
            return options.map(function (option) { return ({
                text: reverseLookup[option],
                value: option
            }); });
        }
        function filterCategory(form) {
            if (isISSO) {
                setOptions(form.getControl("ts_actioncategory"), createFilteredOptions([
                    741130001 /* CorrectiveAction */,
                    741130002 /* EnforcementAction */,
                ], allActionCategoryOptions));
            }
            if (form.getAttribute("ts_actioncategory").getValue() != null && form.getAttribute("ts_actiontype").getValue() == null && form.getAttribute("ts_actionstatus").getValue() == null) {
                form.getAttribute("ts_actioncategory").setValue(null);
            }
        }
        function getOptionSets() {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, retrieveOptionSetValues("ts_deliverymethod")];
                        case 1:
                            allDeliveryMethodOptions = _a.sent();
                            return [4 /*yield*/, retrieveOptionSetValues("ts_actionstatus")];
                        case 2:
                            allActionStatus = _a.sent();
                            return [4 /*yield*/, retrieveOptionSetValues("ts_actiontype")];
                        case 3:
                            allActionTypes = _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
        function retrieveOptionSetValues(optionSet) {
            return __awaiter(this, void 0, void 0, function () {
                var optionSetData, entityMetadata;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, Xrm.Utility.getEntityMetadata("ts_action", [optionSet])];
                        case 1:
                            entityMetadata = _a.sent();
                            if (entityMetadata &&
                                entityMetadata.Attributes &&
                                entityMetadata.Attributes._collection &&
                                entityMetadata.Attributes._collection[optionSet]) {
                                optionSetData = entityMetadata.Attributes._collection[optionSet].OptionSet;
                            }
                            return [2 /*return*/, optionSetData];
                    }
                });
            });
        }
        function setRelatedFindingsFetchXML(form) {
            var actionId = form.data.entity.getId();
            var gridControl = form.getControl("subgrid_related_findings");
            if (gridControl === null) {
                setTimeout(ROM.Action.setRelatedFindingsFetchXML, 1000);
                return;
            }
            else {
                var fetchXml = "<link-entity name=\"ts_actionfinding\" from=\"ts_ovs_finding\" to=\"ovs_findingid\" link-type=\"inner\" alias=\"aa\"><attribute name=\"ts_ovs_finding\"/><filter type=\"and\"><condition attribute=\"ts_ovs_finding\" operator=\"not-null\"/></filter><link-entity name=\"ts_action\" from=\"ts_actionid\" to=\"ts_action\" link-type=\"inner\" alias=\"ab\"><attribute name=\"ts_actionid\"/><filter type=\"and\"><condition attribute=\"ts_actionid\" operator=\"eq\" value=\"" + actionId + "\"/></filter></link-entity></link-entity>";
                ROM.Utils.setSubgridFilterXml(form, "subgrid_related_findings", fetchXml);
            }
        }
        Action.setRelatedFindingsFetchXML = setRelatedFindingsFetchXML;
    })(Action = ROM.Action || (ROM.Action = {}));
})(ROM || (ROM = {}));
