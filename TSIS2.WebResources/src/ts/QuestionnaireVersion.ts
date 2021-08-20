namespace ROM.QuestionnaireVersion {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {        
        setStatusNotification(eContext);
        setVersionsDatesNotification(eContext);
        // Get formContext
        const Form = <Form.ts_questionnaireversion.Main.Information>eContext.getFormContext();
        const surveyDefinition = Form.getAttribute("ts_questionnairedefinition").getValue();
        // Get the web resource control on the form
        const wrCtrl = Form.getControl('WebResource_QuestionnaireCreator');

        // Get the web resource inner content window
        InitiateSurvey(wrCtrl, surveyDefinition);
    }

    export function onSave(eContext: Xrm.ExecutionContext<any, any>): void {
        // Get formContext
        const Form = <Form.ts_questionnaireversion.Main.Information>eContext.getFormContext();
                
        // Get the web resource control on the form
        const wrCtrl = Form.getControl('WebResource_QuestionnaireCreator');

        // Get the web resource inner content window
        SaveQuestionnaireDefinition(Form, wrCtrl);
    }

    function InitiateSurvey(wrCtrl, surveyDefinition) {
        wrCtrl.setVisible(true);
        wrCtrl.getContentWindow().then(function (win) {
            const surveyLocale = getSurveyLocal();
            win.InitializeSurveyCreator(surveyDefinition, surveyLocale);
        });
    }

    function getSurveyLocal(): string {
        const languageCode = Xrm.Utility.getGlobalContext().userSettings.languageId;
        let surveyLocale = 'en';
        if (languageCode == 1036) {
            //French
            surveyLocale = 'fr';
        }
        return surveyLocale;
    }

    function SaveQuestionnaireDefinition(Form: Form.ts_questionnaireversion.Main.Information, wrCtrl) {
        // Get the web resource inner content window
        if (wrCtrl !== null && wrCtrl !== undefined) {
            wrCtrl.getContentWindow().then(function (win) {
                const surveyDefinition = win.GetSurveyDefinition();
                Form.getAttribute('ts_questionnairedefinition').setValue(surveyDefinition);
            });
        }
    }

    export function dateOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        setStatusNotification(eContext);
        setVersionsDatesNotification(eContext);
        checkStartDateBeforeEndDate(eContext);
    }     

    function checkStartDateBeforeEndDate(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_questionnaireversion.Main.Information>eContext.getFormContext();       
        const dateStartAttribute = form.getAttribute("ts_effectivestartdate");
        const dateEndAttribute = form.getAttribute("ts_effectiveenddate");
        const dateStartAttributeValue = dateStartAttribute.getValue();
        const dateEndAttributeValue = dateEndAttribute.getValue();
        const message = Xrm.Utility.getResourceString("ts_/resx/QuestionnaireVersion", "StartBeforeEnd"); 
        if (dateStartAttributeValue && dateEndAttributeValue) {
            if (Date.parse(dateStartAttributeValue.toString()) > Date.parse(dateEndAttributeValue.toString()))
                form.getControl("ts_effectiveenddate").setNotification(message, "errorDates");
            else
                form.getControl("ts_effectiveenddate").clearNotification("errorDates");
        }
    }
    function setStatusNotification(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_questionnaireversion.Main.Information>eContext.getFormContext();
        var message;
        const dateStartAttribute = form.getAttribute("ts_effectivestartdate");
        const dateEndAttribute = form.getAttribute("ts_effectiveenddate");
        const dateStartAttributeValue = dateStartAttribute.getValue();
        const dateEndAttributeValue = dateEndAttribute.getValue();       
       
        if (dateStartAttributeValue==null && dateEndAttributeValue==null)
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
     function setVersionsDatesNotification(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_questionnaireversion.Main.Information>eContext.getFormContext();
        const questionnaireIdAttribute = form.getAttribute("ts_ovs_questionnaire");
        const questionnaireVersionId = form.data.entity.getId().replace(/[{}]/g, "").toLowerCase();
         const message = Xrm.Utility.getResourceString("ts_/resx/QuestionnaireVersion", "OverlapDates"); 
        var questionnaireIdAttributeValue;
        var questionnaireId;
        if (questionnaireIdAttribute != null) {
            questionnaireIdAttributeValue = questionnaireIdAttribute.getValue();
            questionnaireId = questionnaireIdAttributeValue[0].id;
        }
        
        const dateStartAttribute = form.getAttribute("ts_effectivestartdate");
        const dateEndAttribute = form.getAttribute("ts_effectiveenddate");
        const dateStartAttributeValue = dateStartAttribute.getValue();
        const dateEndAttributeValue = dateEndAttribute.getValue();

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
                },
                    function (error) {
                    }
             );
        }
    }
}