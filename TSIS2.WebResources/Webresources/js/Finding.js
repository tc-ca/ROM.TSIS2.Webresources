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
        //If all NCAT Fields are set, calculate and set the recommended enforcement
        function NCATFieldOnChange(eContext) {
            return __awaiter(this, void 0, void 0, function () {
                var formContext, factor1Value, factor2Value, factor3Value, factor4Value, factor5Value, factor6Value, factor7Value, factor1AssessmentRatingId, factor2AssessmentRatingId, factor3AssessmentRatingId, factor4AssessmentRatingId, factor5AssessmentRatingId, factor6AssessmentRatingId, factor7AssessmentRatingId, factor1AssessmentRatingPromise, factor2AssessmentRatingPromise, factor3AssessmentRatingPromise, factor4AssessmentRatingPromise, factor5AssessmentRatingPromise, factor6AssessmentRatingPromise, factor7AssessmentRatingPromise;
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
                            if (factor1Value == null || factor2Value == null || factor3Value == null || factor4Value == null || factor5Value == null || factor6Value == null || factor7Value == null) {
                                formContext.getAttribute("ts_ncatenforcementrecommendation").setValue(null);
                                formContext.getAttribute("ts_acceptncatrecommendation").setValue(null);
                                formContext.getAttribute("ts_ncatinspectorrecommendation").setValue(null);
                                formContext.getControl("ts_acceptncatrecommendation").setVisible(false);
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
                            return [4 /*yield*/, Promise.all([factor1AssessmentRatingPromise, factor2AssessmentRatingPromise, factor3AssessmentRatingPromise, factor4AssessmentRatingPromise, factor5AssessmentRatingPromise, factor6AssessmentRatingPromise, factor7AssessmentRatingPromise]).then(function (factorPromises) {
                                    var totalWeight = 0;
                                    for (var i = 0; i < factorPromises.length; i++) {
                                        totalWeight += factorPromises[i].ts_weight;
                                    }
                                    var enforcementResponseChoiceNumber;
                                    var inspectorRecommendationControl = formContext.getControl("ts_ncatinspectorrecommendation");
                                    inspectorRecommendationControl.removeOption(717750000);
                                    inspectorRecommendationControl.removeOption(717750001);
                                    inspectorRecommendationControl.removeOption(717750002);
                                    var verbalnWarningOption = { text: "Verbal Warning", value: 717750000 };
                                    var writtenWarningOption = { text: "Written Warning", value: 717750001 };
                                    var referralOption = { text: "Referral to CEE", value: 717750002 };
                                    if (totalWeight <= 19) {
                                        //Verbal Warning
                                        enforcementResponseChoiceNumber = 717750000;
                                        inspectorRecommendationControl.addOption(writtenWarningOption);
                                        inspectorRecommendationControl.addOption(referralOption);
                                    }
                                    else if (totalWeight > 19 && totalWeight <= 55) {
                                        //Written Warning
                                        enforcementResponseChoiceNumber = 717750001;
                                        inspectorRecommendationControl.addOption(verbalnWarningOption);
                                        inspectorRecommendationControl.addOption(referralOption);
                                    }
                                    else if (totalWeight > 55) {
                                        //Referral to CEE
                                        enforcementResponseChoiceNumber = 717750002;
                                        inspectorRecommendationControl.addOption(verbalnWarningOption);
                                        inspectorRecommendationControl.addOption(writtenWarningOption);
                                    }
                                    formContext.getAttribute("ts_ncatenforcementrecommendation").setValue(enforcementResponseChoiceNumber);
                                    formContext.getControl("ts_acceptncatrecommendation").setVisible(true);
                                    formContext.getAttribute("ts_ncatinspectorrecommendation").setValue(null);
                                })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/, true];
                    }
                });
            });
        }
        Finding.NCATFieldOnChange = NCATFieldOnChange;
    })(Finding = ROM.Finding || (ROM.Finding = {}));
})(ROM || (ROM = {}));
