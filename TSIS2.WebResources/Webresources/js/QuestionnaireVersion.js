"use strict";
var ROM;
(function (ROM) {
    var QuestionnaireVersion;
    (function (QuestionnaireVersion) {
        function onLoad(eContext) {
            setNotificationMessage(eContext);
            // Get formContext
            var Form = eContext.getFormContext();
            var surveyDefinition = Form.getAttribute("ts_questionnairedefinition").getValue();
            // Get the web resource control on the form
            var wrCtrl = Form.getControl('WebResource_QuestionnaireCreator');
            // Get the web resource inner content window
            InitiateSurvey(wrCtrl, surveyDefinition);
        }
        QuestionnaireVersion.onLoad = onLoad;
        function onSave(eContext) {
            // Get formContext
            var Form = eContext.getFormContext();
            // Get the web resource control on the form
            var wrCtrl = Form.getControl('WebResource_QuestionnaireCreator');
            // Get the web resource inner content window
            SaveQuestionnaireDefinition(Form, wrCtrl);
        }
        QuestionnaireVersion.onSave = onSave;
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
        function dateOnChange(eContext) {
            setNotificationMessage(eContext);
        }
        QuestionnaireVersion.dateOnChange = dateOnChange;
        function setNotificationMessage(eContext) {
            var form = eContext.getFormContext();
            var message;
            var dateStartAttribute = form.getAttribute("ts_effectivestartdate");
            var dateEndAttribute = form.getAttribute("ts_effectiveenddate");
            var dateStartAttributeValue = dateStartAttribute.getValue();
            var dateEndAttributeValue = dateEndAttribute.getValue();
            if (dateStartAttributeValue == null && dateEndAttributeValue == null)
                message = Xrm.Utility.getResourceString("ts_/resx/QuestionnaireVersion", "Draft");
            if (dateStartAttributeValue && dateEndAttributeValue) {
                var dateStartDate = Date.parse(dateStartAttributeValue);
                var dateEndDate = Date.parse(dateEndAttributeValue);
                if (dateStartDate > Date.now() && dateEndDate > Date.now())
                    message = Xrm.Utility.getResourceString("ts_/resx/QuestionnaireVersion", "PublishedAwaitingEffectiveDate");
                if (dateStartDate < Date.now() && dateEndDate < Date.now())
                    message = message = Xrm.Utility.getResourceString("ts_/resx/QuestionnaireVersion", "PublishedRetired");
                if (dateStartDate < Date.now() && dateEndDate > Date.now())
                    message = message = Xrm.Utility.getResourceString("ts_/resx/QuestionnaireVersion", "PublishedInEffect");
            }
            if (dateStartAttributeValue && dateEndAttributeValue == null) {
                var dateStartDate = Date.parse(dateStartAttributeValue);
                if (dateStartDate < Date.now())
                    message = message = Xrm.Utility.getResourceString("ts_/resx/QuestionnaireVersion", "PublishedInEffect");
            }
            form.ui.setFormNotification(message, "INFO", "notification");
        }
    })(QuestionnaireVersion = ROM.QuestionnaireVersion || (ROM.QuestionnaireVersion = {}));
})(ROM || (ROM = {}));
