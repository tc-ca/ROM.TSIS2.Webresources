'use strict';

var MainForm =  (function () {
    function MainForm() {
    }
    MainForm.ToggleQuestionnaire = function (eContext) {
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
        var $this = this;
        Xrm.WebApi.retrieveRecord('ovs_questionnaire', questionnaireId[0].id.substr(1, questionnaireId[0].id.length - 2))
            .then(function success(result) {
            $this.InitiateSurvey(wrCtrl, result.ovs_questionnairedefinition, mode);
        }, function error(error) {
            Xrm.Navigation.openAlertDialog({ text: error.message });
        });
    };
    MainForm.InitiateSurvey = function (wrCtrl, surveyDefinition, mode) {
        wrCtrl.setVisible(true);
        var $this = this;
        wrCtrl.getContentWindow().then(function (win) {
            var surveyLocale = $this.getSurveyLocal();
            win.InitializeSurveyRender(surveyDefinition, null, surveyLocale, mode);
        });
    };
    MainForm.getSurveyLocal = function () {
        var languageCode = Xrm.Utility.getGlobalContext().userSettings.languageId;
        var surveyLocale = 'en';
        if (languageCode == 1036) {
            surveyLocale = 'fr';
        }
        return surveyLocale;
    };
    return MainForm;
}());

var ROM;
(function (ROM) {
    (function (ServiceTaskType) {
        function ToggleQuestionnaire(eContext) {
            MainForm.ToggleQuestionnaire(eContext);
        }
        ServiceTaskType.ToggleQuestionnaire = ToggleQuestionnaire;
    })(ROM.ServiceTaskType || (ROM.ServiceTaskType = {}));
})(ROM || (ROM = {}));
