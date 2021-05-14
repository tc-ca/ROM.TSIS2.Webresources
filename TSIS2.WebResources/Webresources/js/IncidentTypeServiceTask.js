'use strict';

var MainForm =  (function () {
    function MainForm() {
    }
    MainForm.ToggleQuestionnaire = function (eContext) {
        var Form = eContext.getFormContext();
        var wrCtrl = Form.getControl('WebResource_QuestionnaireRender');
        var hasQuestionnaire = Form.getAttribute('ovs_questionnaireenabled').getValue();
        var questionnaireId = Form.getAttribute('ovs_questionnaire').getValue();
        if (!hasQuestionnaire) {
            wrCtrl.setVisible(false);
            return;
        }
        if (questionnaireId === null) {
            wrCtrl.setVisible(false);
            return;
        }
        var $this = this;
        Xrm.WebApi.retrieveRecord('ovs_questionnaire', questionnaireId[0].id.substr(1, questionnaireId[0].id.length - 2), '?$select=ovs_questionnairedefinition').then(function success(result) {
            $this.InitiateSurvey(wrCtrl, result.ovs_questionnairedefinition, $this.mode);
        }, function error(error) {
            Xrm.Navigation.openAlertDialog({ text: error.message });
        });
    };
    MainForm.OnTaskTypeChange = function (eContext) {
        var Form = eContext.getFormContext();
        var wrCtrl = Form.getControl('WebResource_QuestionnaireRender');
        var tasktype = Form.getAttribute('msdyn_tasktype').getValue();
        var hasQuestionnaire = Form.getAttribute('ovs_questionnaireenabled');
        var questionnaireId = Form.getAttribute('ovs_questionnaire');
        if (tasktype === null) {
            hasQuestionnaire.setValue(false);
            questionnaireId.setValue(null);
            wrCtrl.setVisible(false);
        }
        else {
            var $this_1 = this;
            Xrm.WebApi.retrieveRecord('msdyn_servicetasktype', tasktype[0].id.substr(1, tasktype[0].id.length - 2), '?$select=ovs_questionnaireenabled,_ovs_questionnaire_value&$expand=ovs_Questionnaire($select=ovs_questionnairedefinition)').then(function success(result) {
                hasQuestionnaire.setValue(result.ovs_questionnaireenabled);
                var lookupValue = new Array();
                lookupValue[0] = new Object();
                lookupValue[0].id = '{' + result._ovs_questionnaire_value + '}';
                lookupValue[0].entityType = 'ovs_questionnaire';
                questionnaireId.setValue(lookupValue);
                $this_1.InitiateSurvey(wrCtrl, result.ovs_Questionnaire.ovs_questionnairedefinition, $this_1.mode);
            }, function error(error) {
                Xrm.Navigation.openAlertDialog({ text: error.message });
            });
        }
    };
    MainForm.getSurveyLocal = function () {
        var languageCode = Xrm.Utility.getGlobalContext().userSettings.languageId;
        var surveyLocale = 'en';
        if (languageCode == 1036) {
            surveyLocale = 'fr';
        }
        return surveyLocale;
    };
    MainForm.InitiateSurvey = function (wrCtrl, surveyDefinition, mode) {
        wrCtrl.setVisible(true);
        var $this = this;
        wrCtrl.getContentWindow().then(function (win) {
            var surveyLocale = $this.getSurveyLocal();
            win.InitializeSurveyRender(surveyDefinition, null, surveyLocale, mode);
        });
    };
    MainForm.mode = 'display';
    return MainForm;
}());

var ROM;
(function (ROM) {
    (function (IncidentTypeServiceTask) {
        function ToggleQuestionnaire(eContext) {
            MainForm.ToggleQuestionnaire(eContext);
        }
        IncidentTypeServiceTask.ToggleQuestionnaire = ToggleQuestionnaire;
        function OnTaskTypeChange(eContext) {
            MainForm.OnTaskTypeChange(eContext);
        }
        IncidentTypeServiceTask.OnTaskTypeChange = OnTaskTypeChange;
    })(ROM.IncidentTypeServiceTask || (ROM.IncidentTypeServiceTask = {}));
})(ROM || (ROM = {}));
