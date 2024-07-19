namespace ROM.QuestionnaireResponse {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_questionnaireresponse.Main.Information>eContext.getFormContext();
        ToggleQuestionnaire(eContext);

        //Put your code here
        //1. write code to show the banner message to make sure it appears
        const warningMessage = Xrm.Utility.getResourceString("ovs_/resx/ts_questionnaireresponse", "WarningMessageText");

        form.ui.setFormNotification(warningMessage, "WARNING", "WarningMessage");
        
        //2. put in the logic to check the work order
        //3. if the work order is not null, display the message, otherwise don't show it

        //if (true) {
            // code to show banner message
        //}
    }

    function ToggleQuestionnaire(eContext: Xrm.ExecutionContext<any, any>): void {
        const Form = <Form.ts_questionnaireresponse.Main.Information>eContext.getFormContext();
        // Get the web resource control on the form
        const wrCtrl = Form.getControl('WebResource_surveyrender');
        const questionnaireDefinition = Form.getAttribute('ts_questionnairedefinition').getValue();
        const questionnaireAnswers = Form.getAttribute('ts_questionnaireanswers').getValue();
        let mode = '';

        // Exit if no questionnaire exists
        if (questionnaireDefinition === null) {
            wrCtrl.setVisible(false);
            return;
        }

        // Get Questionnaire definition
        wrCtrl.setVisible(true);
        InitiateSurvey(eContext, wrCtrl, questionnaireDefinition, questionnaireAnswers, mode);
    }

    async function InitiateSurvey(eContext, wrCtrl, questionnaireDefinition, questionnaireResponse, mode) {
        wrCtrl.setVisible(true);
        wrCtrl.getContentWindow().then(async function (win) {
            const surveyLocale = getSurveyLocal();
            win.InitialContext(eContext);
            win.isComplete = false;
            win.InitializeSurveyRender(questionnaireDefinition, questionnaireResponse, surveyLocale, mode);
        });
    }

    // Get surveyJS locale
    export function getSurveyLocal(): string {
        const languageCode = Xrm.Utility.getGlobalContext().userSettings.languageId;
        let surveyLocale = 'en';
        if (languageCode == 1036) {
            //French
            surveyLocale = 'fr';
        }
        return surveyLocale;
    }

}