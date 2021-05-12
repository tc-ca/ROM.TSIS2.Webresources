'use strict';

var ROM;
(function (ROM) {
    (function (ServiceTaskType) {
        function ToggleQuestionnaire(eContext) {
            var Form = eContext.getFormContext();
            var wrCtrl = Form.getControl('WebResource_QuestionnaireRender');
            var hasQuestionnaire = Form.getAttribute('ovs_questionnaireenabled').getValue();
            var questionnaireId = Form.getAttribute('ovs_questionnaire').getValue();
            var mode = 'display';
            if (wrCtrl === null || wrCtrl === undefined) {
                return;
            }
            if (!hasQuestionnaire) {
                wrCtrl.setVisible(false);
                return;
            }
            if (questionnaireId === null) {
                wrCtrl.setVisible(false);
                return;
            }
            Xrm.WebApi.retrieveRecord('ovs_questionnaire', questionnaireId[0].id.substr(1, questionnaireId[0].id.length - 2))
                .then(function success(result) {
                InitiateSurvey(wrCtrl, result.ovs_questionnairedefinition, mode);
            }, function error(error) {
                Xrm.Navigation.openAlertDialog({ text: error.message });
            });
        }
        ServiceTaskType.ToggleQuestionnaire = ToggleQuestionnaire;
        function InitiateSurvey(wrCtrl, surveyDefinition, mode) {
            wrCtrl.setVisible(true);
            wrCtrl.getContentWindow().then(function (win) {
                var surveyLocale = getSurveyLocal();
                win.InitializeSurveyRender(surveyDefinition, null, surveyLocale, mode);
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
    })(ROM.ServiceTaskType || (ROM.ServiceTaskType = {}));
})(ROM || (ROM = {}));
