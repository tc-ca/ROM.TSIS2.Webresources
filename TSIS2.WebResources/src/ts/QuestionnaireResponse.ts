let debugLog = "test";

namespace ROM.QuestionnaireResponse {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_questionnaireresponse.Main.Information>eContext.getFormContext();
        form.getAttribute("ts_debug").setValue(form.getAttribute("ts_debug").getValue() + "onLoad\n");
        ToggleQuestionnaire(eContext);
    }

    function ToggleQuestionnaire(eContext: Xrm.ExecutionContext<any, any>): void {
        const Form = <Form.ts_questionnaireresponse.Main.Information>eContext.getFormContext();
        Form.getAttribute("ts_debug").setValue(Form.getAttribute("ts_debug").getValue() + "ToggleQuestionnaire\n");
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
        const Form = <Form.ts_questionnaireresponse.Main.Information>eContext.getFormContext();
        Form.getAttribute("ts_debug").setValue(Form.getAttribute("ts_debug").getValue() + wrCtrl.getContentWindow());
        wrCtrl.setVisible(true);
        wrCtrl.getContentWindow().then(async function (win) {
            const surveyLocale = getSurveyLocal();
            Form.getAttribute("ts_debug").setValue(Form.getAttribute("ts_debug").getValue() + surveyLocale);
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