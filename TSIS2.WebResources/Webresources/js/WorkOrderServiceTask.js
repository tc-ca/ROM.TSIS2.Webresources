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
    var WorkOrderServiceTask;
    (function (WorkOrderServiceTask) {
        // EVENTS
        var mode = '';
        function ToggleQuestionnaire(eContext) {
            var Form = eContext.getFormContext();
            if (Form.getAttribute('msdyn_actualduration').getValue() == 0) {
                Form.getAttribute('msdyn_actualduration').setValue();
            }
            // Get the web resource control on the form
            var wrCtrl = Form.getControl('WebResource_QuestionnaireRender');
            var questionnaireDefinition = Form.getAttribute('ovs_questionnairedefinition').getValue();
            var questionnaireResponse = Form.getAttribute('ovs_questionnaireresponse').getValue();
            // Exit if no questionnaire exists
            if (questionnaireDefinition === null) {
                wrCtrl.setVisible(false);
                return;
            }
            // Get Questionnaire definition
            wrCtrl.setVisible(true);
            InitiateSurvey(eContext, wrCtrl, questionnaireDefinition, questionnaireResponse, mode);
        }
        WorkOrderServiceTask.ToggleQuestionnaire = ToggleQuestionnaire;
        function onLoad(eContext) {
            //Update the questionnaire definition before possibly initiating the survey.
            UpdateQuestionnaireDefinition(eContext).then(function (result) {
                ToggleQuestionnaire(eContext);
            });
        }
        WorkOrderServiceTask.onLoad = onLoad;
        //If Status Reason is Active, replace ovs_questionnairedefinition with definition from the Service Task Type Lookup field
        function UpdateQuestionnaireDefinition(eContext) {
            return __awaiter(this, void 0, void 0, function () {
                var Form, statusReason, taskType, taskTypeID;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            Form = eContext.getFormContext();
                            statusReason = Form.getAttribute("statuscode").getValue();
                            if (!(statusReason == 1)) return [3 /*break*/, 2];
                            taskType = Form.getAttribute("msdyn_tasktype").getValue();
                            if (!(taskType != null)) return [3 /*break*/, 2];
                            taskTypeID = taskType[0].id;
                            return [4 /*yield*/, Xrm.WebApi.retrieveRecord("msdyn_servicetasktype", taskTypeID, "?$select=msdyn_name&$expand=ovs_Questionnaire").then(function success(result) {
                                    var newDefinition = result.ovs_Questionnaire.ovs_questionnairedefinition;
                                    Form.getAttribute("ovs_questionnairedefinition").setValue(newDefinition);
                                })];
                        case 1:
                            _a.sent();
                            _a.label = 2;
                        case 2: return [2 /*return*/];
                    }
                });
            });
        }
        function onSave(eContext) {
            // Get formContext
            var Form = eContext.getFormContext();
            var percentComplete = Form.getAttribute("msdyn_percentcomplete").getValue();
            if (percentComplete != 100.00) {
                //Set percentComplete to 50.00
                Form.getAttribute("msdyn_percentcomplete").setValue(50.00);
                //Set Status Reason to In-Progress
                Form.getAttribute("statuscode").setValue(918640004);
            }
            // Get the web resource control on the form
            var wrCtrl = Form.getControl('WebResource_QuestionnaireRender');
            if (wrCtrl.getVisible() === false) {
                return;
            }
            // Get the web resource inner content window
            CompleteQuestionnaire(wrCtrl);
        }
        WorkOrderServiceTask.onSave = onSave;
        // Get surveyJS locale
        function getSurveyLocal() {
            var languageCode = Xrm.Utility.getGlobalContext().userSettings.languageId;
            var surveyLocale = 'en';
            if (languageCode == 1036) {
                //French
                surveyLocale = 'fr';
            }
            return surveyLocale;
        }
        function InitiateSurvey(eContext, wrCtrl, questionnaireDefinition, questionnaireResponse, mode) {
            wrCtrl.setVisible(true);
            wrCtrl.getContentWindow().then(function (win) {
                var surveyLocale = getSurveyLocal();
                win.InitialContext(eContext);
                win.InitializeSurveyRender(questionnaireDefinition, questionnaireResponse, surveyLocale, mode);
            });
        }
    })(WorkOrderServiceTask = ROM.WorkOrderServiceTask || (ROM.WorkOrderServiceTask = {}));
})(ROM || (ROM = {}));
function CompleteQuestionnaire(wrCtrl) {
    // Get the web resource inner content window
    wrCtrl.getContentWindow().then(function (win) {
        var userInput = win.DoComplete();
    });
}
