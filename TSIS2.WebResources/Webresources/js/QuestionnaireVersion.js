"use strict";
var ROM;
(function (ROM) {
    var QuestionnaireVersion;
    (function (QuestionnaireVersion) {
        function onLoad(eContext) {
            setStatusNotification(eContext);
            // setVersionsDatesNotification(eContext);
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
            var saveOverride = Form.getAttribute('ts_questionnairedefinitionsaveoverride').getValue();
            // Check if the save override is set to true - this is used by a business admin to update the Questionnaire Definition JSON manually.
            if (saveOverride === true) {
                Form.getAttribute('ts_questionnairedefinitionsaveoverride').setValue(false);
            }
            else {
                // Get the web resource inner content window
                SaveQuestionnaireDefinition(Form, wrCtrl);
            }
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
        function datesOnChange(eContext) {
            setStatusNotification(eContext);
            setDatesNotification(eContext);
            checkStartDateBeforeEndDate(eContext);
        }
        QuestionnaireVersion.datesOnChange = datesOnChange;
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
            if (!dateStartAttributeValue && dateEndAttributeValue)
                form.getControl("ts_effectiveenddate").setNotification(message, "errorDates");
            if (!dateStartAttributeValue)
                form.getControl("ts_effectivestartdate").clearNotification("errorDates");
            if (!dateEndAttributeValue)
                form.getControl("ts_effectiveenddate").clearNotification("errorDates");
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
        function setDatesNotification(eContext) {
            var form = eContext.getFormContext();
            var questionnaireIdAttribute = form.getAttribute("ts_ovs_questionnaire");
            var questionnaireVersionId = form.data.entity.getId().replace(/[{}]/g, "").toLowerCase();
            var message = Xrm.Utility.getResourceString("ts_/resx/QuestionnaireVersion", "OverlapDates");
            var questionnaireIdAttributeValue;
            var questionnaireId;
            //Get Questionnaire Id for current version
            if (questionnaireIdAttribute != null) {
                questionnaireIdAttributeValue = questionnaireIdAttribute.getValue();
                questionnaireId = questionnaireIdAttributeValue[0].id;
            }
            var dateStartAttribute = form.getAttribute("ts_effectivestartdate");
            var dateEndAttribute = form.getAttribute("ts_effectiveenddate");
            var dateStartAttributeValue = dateStartAttribute.getValue();
            var dateEndAttributeValue = dateEndAttribute.getValue();
            //Retrieve all versions for this questionnaire
            Xrm.WebApi.retrieveMultipleRecords("ts_questionnaireversion", "?$select=ts_name, ts_effectivestartdate, ts_effectiveenddate&$filter=_ts_ovs_questionnaire_value eq " + questionnaireId + "&$orderby=ts_effectivestartdate")
                .then(function success(result) {
                var currentVersionStartDate;
                var currentVersionEndDate;
                if (result.entities.length > 1) {
                    //Get start and end date for current version
                    for (var i = 0; i < result.entities.length; i++) {
                        if (result.entities[i].ts_questionnaireversionid == questionnaireVersionId) {
                            currentVersionStartDate = result.entities[i].ts_effectivestartdate;
                            currentVersionEndDate = result.entities[i].ts_effectiveenddate;
                            break;
                        }
                    }
                    //Check for overlapping
                    //Set or Clear error message
                    if (dateStartAttributeValue) {
                        for (var i = 0; i < result.entities.length; i++) {
                            if (result.entities[i].ts_questionnaireversionid != questionnaireVersionId) {
                                if (result.entities[i].ts_effectiveenddate == null && result.entities[i].ts_effectivestartdate == null)
                                    continue;
                                if (result.entities[i].ts_effectiveenddate && result.entities[i].ts_effectivestartdate) {
                                    if (Date.parse(dateStartAttributeValue.toString()) >= Date.parse(new Date(result.entities[i].ts_effectivestartdate).toString()) &&
                                        Date.parse(dateStartAttributeValue.toString()) <= Date.parse(new Date(result.entities[i].ts_effectiveenddate).toString())) {
                                        form.getControl("ts_effectivestartdate").setNotification(message + result.entities[i].ts_name, "errorStartDate");
                                        break;
                                    }
                                    else {
                                        form.getControl("ts_effectivestartdate").clearNotification("errorStartDate");
                                    }
                                    if (dateEndAttributeValue) {
                                        if (Date.parse(dateEndAttributeValue.toString()) >= Date.parse(new Date(result.entities[i].ts_effectivestartdate).toString()) &&
                                            Date.parse(dateEndAttributeValue.toString()) <= Date.parse(new Date(result.entities[i].ts_effectiveenddate).toString())) {
                                            form.getControl("ts_effectiveenddate").setNotification(message + result.entities[i].ts_name, "errorEndDate");
                                            break;
                                        }
                                        else
                                            form.getControl("ts_effectiveenddate").clearNotification("errorEndDate");
                                    }
                                    else
                                        form.getControl("ts_effectiveenddate").clearNotification("errorEndDate");
                                }
                                if (result.entities[i].ts_effectiveenddate == null && currentVersionEndDate == null && currentVersionStartDate == null) {
                                    if (Date.parse(dateStartAttributeValue.toString()) <= Date.parse(new Date(result.entities[i].ts_effectivestartdate).toString()))
                                        form.getControl("ts_effectivestartdate").setNotification(message + result.entities[i].ts_name, "errorStartDate");
                                    else
                                        form.getControl("ts_effectivestartdate").clearNotification("errorStartDate");
                                }
                                if (result.entities[i].ts_effectiveenddate == null && currentVersionEndDate != null && currentVersionStartDate != null) {
                                    if (Date.parse(dateStartAttributeValue.toString()) >= Date.parse(new Date(result.entities[i].ts_effectivestartdate).toString()))
                                        form.getControl("ts_effectivestartdate").setNotification(message + result.entities[i].ts_name, "errorStartDate");
                                    else
                                        form.getControl("ts_effectivestartdate").clearNotification("errorStartDate");
                                    if (dateEndAttributeValue) {
                                        if (Date.parse(dateEndAttributeValue.toString()) >= Date.parse(new Date(result.entities[i].ts_effectivestartdate).toString()))
                                            form.getControl("ts_effectiveenddate").setNotification(message + result.entities[i].ts_name, "errorEndDate");
                                        else
                                            form.getControl("ts_effectiveenddate").clearNotification("errorEndDate");
                                    }
                                    else
                                        form.getControl("ts_effectiveenddate").clearNotification("errorEndDate");
                                }
                            }
                        }
                    }
                    else {
                        form.getControl("ts_effectivestartdate").clearNotification("errorStartDate");
                    }
                }
            });
        }
    })(QuestionnaireVersion = ROM.QuestionnaireVersion || (ROM.QuestionnaireVersion = {}));
})(ROM || (ROM = {}));
