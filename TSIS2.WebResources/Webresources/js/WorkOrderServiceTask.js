'use strict';

var ROM;
(function (ROM) {
    (function (WorkOrderServiceTask) {
        var mode = '';
        function ToggleQuestionnaire(eContext) {
            var Form = eContext.getFormContext();
            var wrCtrl = Form.getControl('WebResource_QuestionnaireRender');
            var questionnaireDefinition = Form.getAttribute('ovs_questionnairedefinition').getValue();
            var questionnaireResponse = Form.getAttribute('ovs_questionnaireresponse').getValue();
            if (questionnaireDefinition === null) {
                wrCtrl.setVisible(false);
                return;
            }
            wrCtrl.setVisible(true);
            InitiateSurvey(eContext, wrCtrl, questionnaireDefinition, questionnaireResponse, mode);
        }
        WorkOrderServiceTask.ToggleQuestionnaire = ToggleQuestionnaire;
        function onLoad(eContext) {
            var Form = eContext.getFormContext();
            if (Form.getAttribute("msdyn_tasktype").getValue() != null) {
                Form.getControl("msdyn_tasktype").setDisabled(true);
            }
            if (Form.getAttribute('statecode').getValue() == 1) {
                mode = "display";
            }
            UpdateQuestionnaireDefinition(eContext);
        }
        WorkOrderServiceTask.onLoad = onLoad;
        function UpdateQuestionnaireDefinition(eContext) {
            var Form = eContext.getFormContext();
            var statusReason = Form.getAttribute("statuscode").getValue();
            if (statusReason == 918640005) {
                var taskType = Form.getAttribute("msdyn_tasktype").getValue();
                if (taskType != null) {
                    var taskTypeID = taskType[0].id;
                    Xrm.WebApi.retrieveRecord("msdyn_servicetasktype", taskTypeID, "?$select=msdyn_name&$expand=ovs_Questionnaire").then(function success(result) {
                        var newDefinition = result.ovs_Questionnaire.ovs_questionnairedefinition;
                        Form.getAttribute("ovs_questionnairedefinition").setValue(newDefinition);
                        ToggleQuestionnaire(eContext);
                    });
                }
            }
            else {
                ToggleQuestionnaire(eContext);
            }
        }
        function onSave(eContext) {
            var Form = eContext.getFormContext();
            var percentComplete = Form.getAttribute("msdyn_percentcomplete").getValue();
            if (percentComplete != 100.00) {
                Form.getAttribute("msdyn_percentcomplete").setValue(50.00);
                Form.getAttribute("statuscode").setValue(918640004);
            }
            if (Form.getAttribute("msdyn_tasktype").getValue() != null) {
                Form.getControl("msdyn_tasktype").setDisabled(true);
            }
            var wrCtrl = Form.getControl('WebResource_QuestionnaireRender');
            if (wrCtrl.getVisible() === false) {
                return;
            }
            CompleteQuestionnaire(wrCtrl);
        }
        WorkOrderServiceTask.onSave = onSave;
        function getSurveyLocal() {
            var languageCode = Xrm.Utility.getGlobalContext().userSettings.languageId;
            var surveyLocale = 'en';
            if (languageCode == 1036) {
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
    })(ROM.WorkOrderServiceTask || (ROM.WorkOrderServiceTask = {}));
})(ROM || (ROM = {}));
function CompleteQuestionnaire(wrCtrl) {
    wrCtrl.getContentWindow().then(function (win) {
        win.DoComplete();
    });
}
