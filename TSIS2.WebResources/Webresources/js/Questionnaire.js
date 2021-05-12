'use strict';

var ROM;
(function (ROM) {
    (function (Questionnaire) {
        function onLoad(eContext) {
            var Form = eContext.getFormContext();
            var surveyDefinition = Form.getAttribute('ovs_questionnairedefinition').getValue();
            var wrCtrl = Form.getControl('WebResource_QuestionnaireCreator');
            InitiateSurvey(wrCtrl, surveyDefinition);
        }
        Questionnaire.onLoad = onLoad;
        function onSave(eContext) {
            var Form = eContext.getFormContext();
            var wrCtrl = Form.getControl('WebResource_QuestionnaireCreator');
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
                surveyLocale = 'fr';
            }
            return surveyLocale;
        }
        function SaveQuestionnaireDefinition(Form, wrCtrl) {
            if (wrCtrl !== null && wrCtrl !== undefined) {
                wrCtrl.getContentWindow().then(function (win) {
                    var surveyDefinition = win.GetSurveyDefinition();
                    Form.getAttribute('ovs_questionnairedefinition').setValue(surveyDefinition);
                });
            }
        }
    })(ROM.Questionnaire || (ROM.Questionnaire = {}));
})(ROM || (ROM = {}));
