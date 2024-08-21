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
    var QuestionnaireResponse;
    (function (QuestionnaireResponse) {
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            ToggleQuestionnaire(eContext);
            //Banner warning message displayed if Questionnaire Response has already been appended to a work order
            var warningMessage = Xrm.Utility.getResourceString("ovs_/resx/QuestionnaireResponse", "WorkOrderBannerMessage");
            //if the work order is not null, display the message, otherwise don't show it
            var tsworkorder = form.getAttribute("ts_workorder").getValue();
            if (tsworkorder != null) {
                //Show banner message
                form.ui.setFormNotification(warningMessage, "WARNING", "WorkOrderBannerMessage");
            }
            else {
                //clear banner if the field is null
                form.ui.clearFormNotification("1");
            }
            setActivityTypeFilteredView(form);
        }
        QuestionnaireResponse.onLoad = onLoad;
        function ToggleQuestionnaire(eContext) {
            var Form = eContext.getFormContext();
            // Get the web resource control on the form
            var wrCtrl = Form.getControl('WebResource_surveyrender');
            var questionnaireDefinition = Form.getAttribute('ts_questionnairedefinition').getValue();
            var questionnaireAnswers = Form.getAttribute('ts_questionnaireanswers').getValue();
            var mode = '';
            // Exit if no questionnaire exists
            if (questionnaireDefinition === null) {
                wrCtrl.setVisible(false);
                return;
            }
            // Get Questionnaire definition
            wrCtrl.setVisible(true);
            InitiateSurvey(eContext, wrCtrl, questionnaireDefinition, questionnaireAnswers, mode);
        }
        function InitiateSurvey(eContext, wrCtrl, questionnaireDefinition, questionnaireResponse, mode) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    wrCtrl.setVisible(true);
                    wrCtrl.getContentWindow().then(function (win) {
                        return __awaiter(this, void 0, void 0, function () {
                            var surveyLocale;
                            return __generator(this, function (_a) {
                                surveyLocale = getSurveyLocal();
                                win.InitialContext(eContext);
                                win.isComplete = false;
                                win.InitializeSurveyRender(questionnaireDefinition, questionnaireResponse, surveyLocale, mode);
                                return [2 /*return*/];
                            });
                        });
                    });
                    return [2 /*return*/];
                });
            });
        }
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
        QuestionnaireResponse.getSurveyLocal = getSurveyLocal;
        // Filter the lookup for Activity Type (ts_activitytype)
        function setActivityTypeFilteredView(form) {
            //let selectedQuestionnaireResponseId = form.data.entity.getId();
            var selectedQuestionnaireId = form.getAttribute("ts_questionnaire").getValue();
            if (selectedQuestionnaireId != null && selectedQuestionnaireId != undefined) {
                // remove the curly braces from the GUID
                var selectedQuestionnaireIdGUID = selectedQuestionnaireId[0].id.replace(/[{}]/g, '');
                // get the Activity Types
                var activityTypeFetchXML = "\n                <fetch xmlns:generator=\"MarkMpn.SQL4CDS\" distinct=\"true\">\n                  <entity name=\"msdyn_incidenttype\">\n                    <attribute name=\"msdyn_incidenttypeid\" />\n                    <attribute name=\"msdyn_name\" />\n                    <link-entity name=\"msdyn_incidenttypeservicetask\" to=\"msdyn_incidenttypeid\" from=\"msdyn_incidenttype\" alias=\"msdyn_incidenttypeservicetask\" link-type=\"inner\">\n                      <link-entity name=\"msdyn_servicetasktype\" to=\"msdyn_tasktype\" from=\"msdyn_servicetasktypeid\" alias=\"msdyn_servicetasktype\" link-type=\"inner\">\n                        <link-entity name=\"ovs_questionnaire\" to=\"ovs_questionnaire\" from=\"ovs_questionnaireid\" alias=\"ovs_questionnaire\" link-type=\"inner\">\n                          <attribute name=\"ovs_questionnaireid\" />\n                          <filter>\n                            <condition attribute=\"ovs_questionnaireid\" operator=\"eq\" value=\"" + selectedQuestionnaireIdGUID + "\" />\n                          </filter>\n                        </link-entity>\n                      </link-entity>\n                    </link-entity>\n                  </entity>\n                </fetch>\n            ";
                //Now filter the lookup
                var viewId = '{5D6A532B-172B-469E-993F-F6C6CF8C2E9F}';
                var entityName = "msdyn_incidenttype";
                var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/QuestionnaireResponse", "FilteredActivityTypes");
                //const fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" returntotalrecordcount="true" page="1" count="25" no-lock="false"><entity name="ts_incompleteworkorderreason"><attribute name="ts_incompleteworkorderreasonid" /><attribute name="ts_name" /><filter type="or"><condition attribute="ownerid" operator="eq" value="' + ownerId + '" /><condition attribute="ts_incompleteworkorderreasonid" operator="eq" value="' + otherId + '" /></filter><order attribute="ts_name" /></entity></fetch>';
                var layoutXml = "\n                <grid name=\"resultset\" object=\"10010\" jump=\"msdyn_name\" select=\"1\" icon=\"1\" preview=\"1\">\n\t                <row name=\"result\" id=\"msdyn_incidenttypeid\">\n\t\t                <cell name=\"msdyn_name\" width=\"200\" />\n\t                </row>\n                </grid>\n            ";
                form.getControl("ts_activitytype").addCustomView(viewId, entityName, viewDisplayName, activityTypeFetchXML, layoutXml, true);
            }
        }
    })(QuestionnaireResponse = ROM.QuestionnaireResponse || (ROM.QuestionnaireResponse = {}));
})(ROM || (ROM = {}));
