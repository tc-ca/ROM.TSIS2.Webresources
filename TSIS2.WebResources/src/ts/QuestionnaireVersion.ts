namespace ROM.QuestionnaireVersion {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {        
        setNotificationMessage(eContext);
        // Get formContext
        const Form = <Form.ts_questionnaireversion.Main.Information>eContext.getFormContext();
        const surveyDefinition = Form.getAttribute("ts_questionnairedefinition")?.getValue();
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
        setNotificationMessage(eContext);
    }     

    function setNotificationMessage(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_questionnaireversion.Main.Information>eContext.getFormContext();
        var message;
        const dateStartAttribute = form.getAttribute("ts_effectivestartdate");
        const dateEndAttribute = form.getAttribute("ts_effectiveenddate");
        const dateStartAttributeValue = dateStartAttribute.getValue();
        const dateEndAttributeValue = dateEndAttribute.getValue();       
       
        if (dateStartAttributeValue==null && dateEndAttributeValue==null)
            message = Xrm.Utility.getResourceString("ts_/resx/QuestionnaireVersion", "Draft");       
            
        if (dateStartAttributeValue && dateEndAttributeValue) {

            const dateStartDate = dateStartAttributeValue;
            const dateEndDate = dateEndAttributeValue;
           
            if (dateStartDate.getDate() > Date.now() && dateEndDate.getDate() > Date.now())
                message = Xrm.Utility.getResourceString("ts_/resx/QuestionnaireVersion", "PublishedAwaitingEffectiveDate"); 
            if (dateStartDate.getDate() < Date.now() && dateEndDate.getDate() < Date.now())
                message = message = Xrm.Utility.getResourceString("ts_/resx/QuestionnaireVersion", "PublishedRetired"); 
            if (dateStartDate.getDate() < Date.now() && dateEndDate.getDate() > Date.now())
                message = message = Xrm.Utility.getResourceString("ts_/resx/QuestionnaireVersion", "PublishedInEffect");               
        }

        if (dateStartAttributeValue && dateEndAttributeValue == null) {
            const dateStartDate = dateStartAttributeValue;
            if (dateStartDate.getDate() < Date.now())
                message = message = Xrm.Utility.getResourceString("ts_/resx/QuestionnaireVersion", "PublishedInEffect");  
        }            

        form.ui.setFormNotification(message, "INFO", "notification");
    }
}