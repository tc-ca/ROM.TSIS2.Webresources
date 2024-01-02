namespace ROM.QuestionnaireResponse {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_questionnaireresponse.Main.Information>eContext.getFormContext();
        ToggleQuestionnaire(eContext);
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

    function InitiateSurvey(eContext, wrCtrl, questionnaireDefinition, questionnaireResponse, mode) {
        const Form = <Form.ts_questionnaireresponse.Main.Information>eContext.getFormContext();
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