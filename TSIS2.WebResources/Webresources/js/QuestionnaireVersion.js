"use strict";
var ROM;
(function (ROM) {
    var QuestionnaireVersion;
    (function (QuestionnaireVersion) {
        function onLoad(eContext) {
            setStatusNotification(eContext);
            setVersionsDatesNotification(eContext);
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
                    Form.getAttribute('ts_questionnairedefinition').setValue(surveyDefinition);
                });
            }
        }
        function dateOnChange(eContext) {
            setStatusNotification(eContext);
            setVersionsDatesNotification(eContext);
            checkStartDateBeforeEndDate(eContext);
        }
        QuestionnaireVersion.dateOnChange = dateOnChange;
        function checkStartDateBeforeEndDate(eContext) {
            var form = eContext.getFormContext();
            var dateStartAttribute = form.getAttribute("ts_effectivestartdate");
            var dateEndAttribute = form.getAttribute("ts_effectiveenddate");
            var dateStartAttributeValue = dateStartAttribute.getValue();
            var dateEndAttributeValue = dateEndAttribute.getValue();
            var message = Xrm.Utility.getResourceString("ts_/resx/QuestionnaireVersion", "StartBeforeEnd");
            if (dateStartAttributeValue && dateEndAttributeValue) {
                if (Date.parse(dateStartAttributeValue.toString()) > Date.parse(dateEndAttributeValue.toString()))
                    form.getControl("ts_effectiveenddate").setNotification(message, "errorDates");
                else
                    form.getControl("ts_effectiveenddate").clearNotification("errorDates");
            }
        }
        function setStatusNotification(eContext) {
            var form = eContext.getFormContext();
            var message;
            var dateStartAttribute = form.getAttribute("ts_effectivestartdate");
            var dateEndAttribute = form.getAttribute("ts_effectiveenddate");
            var dateStartAttributeValue = dateStartAttribute.getValue();
            var dateEndAttributeValue = dateEndAttribute.getValue();
            if (dateStartAttributeValue == null && dateEndAttributeValue == null)
                message = Xrm.Utility.getResourceString("ts_/resx/QuestionnaireVersion", "Draft");
            if (dateStartAttributeValue && dateEndAttributeValue) {
                if (Date.parse(dateStartAttributeValue.toString()) > Date.now() && Date.parse(dateEndAttributeValue.toString()) > Date.now())
                    message = Xrm.Utility.getResourceString("ts_/resx/QuestionnaireVersion", "PublishedAwaitingEffectiveDate");
                if (Date.parse(dateStartAttributeValue.toString()) < Date.now() && Date.parse(dateEndAttributeValue.toString()) < Date.now())
                    message = message = Xrm.Utility.getResourceString("ts_/resx/QuestionnaireVersion", "PublishedRetired");
                if (Date.parse(dateStartAttributeValue.toString()) < Date.now() && Date.parse(dateEndAttributeValue.toString()) > Date.now())
                    message = message = Xrm.Utility.getResourceString("ts_/resx/QuestionnaireVersion", "PublishedInEffect");
            }
            if (dateStartAttributeValue && dateEndAttributeValue == null) {
                if (Date.parse(dateStartAttributeValue.toString()) < Date.now())
                    message = message = Xrm.Utility.getResourceString("ts_/resx/QuestionnaireVersion", "PublishedInEffect");
            }
            form.ui.setFormNotification(message, "INFO", "notification");
        }
        function setVersionsDatesNotification(eContext) {
            var form = eContext.getFormContext();
            var questionnaireIdAttribute = form.getAttribute("ts_ovs_questionnaire");
            var questionnaireVersionId = form.data.entity.getId().replace(/[{}]/g, "").toLowerCase();
            var message = Xrm.Utility.getResourceString("ts_/resx/QuestionnaireVersion", "OverlapDates");
            var questionnaireIdAttributeValue;
            var questionnaireId;
            if (questionnaireIdAttribute != null) {
                questionnaireIdAttributeValue = questionnaireIdAttribute.getValue();
                questionnaireId = questionnaireIdAttributeValue[0].id;
            }
            var dateStartAttribute = form.getAttribute("ts_effectivestartdate");
            var dateEndAttribute = form.getAttribute("ts_effectiveenddate");
            var dateStartAttributeValue = dateStartAttribute.getValue();
            var dateEndAttributeValue = dateEndAttribute.getValue();
            if (dateStartAttributeValue && dateEndAttributeValue) {
                Xrm.WebApi.retrieveMultipleRecords("ts_questionnaireversion", "?$select=ts_name, ts_effectivestartdate, ts_effectiveenddate&$filter=_ts_ovs_questionnaire_value eq " + questionnaireId)
                    .then(function success(result) {
                    if (result.entities.length > 1) {
                        for (var i = 0; i < result.entities.length; i++) {
                            if (result.entities[i].ts_questionnaireversionid == questionnaireVersionId) {
                                if (i != result.entities.length - 1) {
                                    if (Date.parse(dateEndAttributeValue.toString()) >= Date.parse(result.entities[i + 1].ts_effectivestartdate))
                                        form.getControl("ts_effectiveenddate").setNotification(message + result.entities[i + 1].ts_name, "errorEndDate");
                                    else
                                        form.getControl("ts_effectiveenddate").clearNotification("errorEndDate");
                                }
                                if (i != 0) {
                                    if (Date.parse(dateStartAttributeValue.toString()) <= Date.parse(result.entities[i - 1].ts_effectiveenddate))
                                        form.getControl("ts_effectivestartdate").setNotification(message + result.entities[i - 1].ts_name, "errorStartDate");
                                    else
                                        form.getControl("ts_effectivestartdate").clearNotification("errorStartDate");
                                }
                            }
                        }
                    }
                }, function (error) {
                });
            }
        }
    })(QuestionnaireVersion = ROM.QuestionnaireVersion || (ROM.QuestionnaireVersion = {}));
})(ROM || (ROM = {}));
