'use strict';

var MainForm =  (function () {
    function MainForm() {
    }
    MainForm.onLoad = function (eContext) {
        var Form = eContext.getFormContext();
        var surveyDefinition = Form.getAttribute('ovs_questionnairedefinition').getValue();
        var wrCtrl = Form.getControl('WebResource_QuestionnaireCreator');
        this.InitiateSurvey(wrCtrl, surveyDefinition);
    };
    MainForm.onSave = function (eContext) {
        var Form = eContext.getFormContext();
        var wrCtrl = Form.getControl('WebResource_QuestionnaireCreator');
        this.SaveQuestionnaireDefinition(Form, wrCtrl);
    };
    MainForm.InitiateSurvey = function (wrCtrl, surveyDefinition) {
        wrCtrl.setVisible(true);
        var $this = this;
        wrCtrl.getContentWindow().then(function (win) {
            var surveyLocale = $this.getSurveyLocal();
            win.InitializeSurveyCreator(surveyDefinition, surveyLocale);
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
    MainForm.SaveQuestionnaireDefinition = function (Form, wrCtrl) {
        if (wrCtrl !== null && wrCtrl !== undefined) {
            wrCtrl.getContentWindow().then(function (win) {
                var surveyDefinition = win.GetSurveyDefinition();
                Form.getAttribute('ovs_questionnairedefinition').setValue(surveyDefinition);
            });
        }
    };
    return MainForm;
}());

var ROM;
(function (ROM) {
    (function (Questionnaire) {
        function onLoad(eContext) {
            MainForm.onLoad(eContext);
        }
        Questionnaire.onLoad = onLoad;
        function onSave(eContext) {
            MainForm.onSave(eContext);
        }
        Questionnaire.onSave = onSave;
    })(ROM.Questionnaire || (ROM.Questionnaire = {}));
})(ROM || (ROM = {}));
