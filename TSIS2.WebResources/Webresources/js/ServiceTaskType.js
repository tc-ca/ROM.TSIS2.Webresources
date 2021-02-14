var ROM;
(function (ROM) {
    var ServiceTaskType;
    (function (ServiceTaskType) {
        // EVENTS
        function ToggleQuestionnaire(eContext) {
            var Form = eContext.getFormContext();
            // Get the web resource control on the form
            var wrCtrl = Form.getControl('WebResource_QuestionnaireRender');
            var hasQuestionnaire = Form.getAttribute('ovs_questionnaireenabled').getValue();
            var questionnaireId = Form.getAttribute('ovs_questionnaire').getValue();
            var mode = 'display';
            // Exit if no surveyJS render exists
            if (wrCtrl === null || wrCtrl === undefined) {
                return;
            }
            // Exit if no questionnaire exists
            if (!hasQuestionnaire) {
                wrCtrl.setVisible(false);
                return;
            }
            // Exit if no questionnaire is selected
            if (questionnaireId === null) {
                wrCtrl.setVisible(false);
                return;
            }
            // Get Questionnaire definition
            var surveyDefinition = null;
            Xrm.WebApi.retrieveRecord('ovs_questionnaire', questionnaireId[0].id.substr(1, questionnaireId[0].id.length - 2), '$select=ovs_questionnairedefinition').then(function success(result) {
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
    })(ServiceTaskType = ROM.ServiceTaskType || (ROM.ServiceTaskType = {}));
})(ROM || (ROM = {}));
