var ROM;
(function (ROM) {
    var WorkOrderServiceTask;
    (function (WorkOrderServiceTask) {
        // EVENTS
        var mode = '';
        function ToggleQuestionnaire(eContext) {
            var Form = eContext.getFormContext();
            // Get the web resource control on the form
            var wrCtrl = Form.getControl('WebResource_QuestionnaireRender');
            var questionnaireDefinition = Form.getAttribute('ovs_questionnairedefinition').getValue();
            var questionnaireResponse = Form.getAttribute('ovs_questionnairereponse').getValue();
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
        function onSave(eContext) {
            // Get formContext
            var Form = eContext.getFormContext();
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
