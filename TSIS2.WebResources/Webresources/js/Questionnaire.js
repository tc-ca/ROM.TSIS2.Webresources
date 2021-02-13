var ROM;
(function (ROM) {
    var Questionnaire;
    (function (Questionnaire) {
        // EVENTS
        function onLoad(eContext) {
            // Get formContext
            var Form = eContext.getFormContext();
            var surveyDefinition = Form.getAttribute('ovs_questionnairedefinition').getValue();
            // Get the web resource control on the form
            var wrCtrl = Form.getControl('WebResource_QuestionnaireCreator');
            // Get the web resource inner content window
            InitiateSurvey(wrCtrl, surveyDefinition);
        }
        Questionnaire.onLoad = onLoad;
        function onSave(eContext) {
            // Get formContext
            var Form = eContext.getFormContext();
            // Get the web resource control on the form
            var wrCtrl = Form.getControl('WebResource_QuestionnaireCreator');
            // Get the web resource inner content window
            SaveQuestionnaireDefinition(Form, wrCtrl);
        }
        Questionnaire.onSave = onSave;
        function InitiateSurvey(wrCtrl, surveyDefinition) {
            wrCtrl.setVisible(true);
            wrCtrl.getContentWindow().then(function (win) {
                var surveyLocale = getSurveyLocal();
                win.InitializeSurveyCreator(surveyDefinition, surveyLocale);
            });
        }
        function getSurveyLocal() {
            var languageCode = Xrm.Utility.getGlobalContext().userSettings.languageId;
            var surveyLocale = 'en';
            if (languageCode == 1036) {
                //French
                surveyLocale = 'fr';
            }
            return surveyLocale;
        }
        function SaveQuestionnaireDefinition(Form, wrCtrl) {
            // Get the web resource inner content window
            if (wrCtrl !== null && wrCtrl !== undefined) {
                wrCtrl.getContentWindow().then(function (win) {
                    var surveyDefinition = win.GetSurveyDefinition();
                    Form.getAttribute('ovs_questionnairedefinition').setValue(surveyDefinition);
                });
            }
        }
    })(Questionnaire = ROM.Questionnaire || (ROM.Questionnaire = {}));
})(ROM || (ROM = {}));
