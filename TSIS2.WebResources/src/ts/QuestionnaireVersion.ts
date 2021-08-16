namespace ROM.QuestionnaireVersion {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {        
        setNotificationMessage(eContext);
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

            const dateStartDate = Date.parse(dateStartAttributeValue);
            const dateEndDate = Date.parse(dateEndAttributeValue);
           
            if (dateStartDate > Date.now() && dateEndDate > Date.now())
                message = Xrm.Utility.getResourceString("ts_/resx/QuestionnaireVersion", "PublishedAwaitingEffectiveDate"); 
            if (dateStartDate < Date.now() && dateEndDate < Date.now())
                message = message = Xrm.Utility.getResourceString("ts_/resx/QuestionnaireVersion", "PublishedRetired"); 
            if (dateStartDate < Date.now() && dateEndDate > Date.now())
                message = message = Xrm.Utility.getResourceString("ts_/resx/QuestionnaireVersion", "PublishedInEffect");               
        }

        if (dateStartAttributeValue && dateEndAttributeValue == null) {
            const dateStartDate = Date.parse(dateStartAttributeValue);
            if (dateStartDate < Date.now())
                message = message = Xrm.Utility.getResourceString("ts_/resx/QuestionnaireVersion", "PublishedInEffect");  
        }            

        form.ui.setFormNotification(message, "INFO", "notification");
    }
}