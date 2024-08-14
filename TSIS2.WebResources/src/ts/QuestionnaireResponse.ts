namespace ROM.QuestionnaireResponse {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_questionnaireresponse.Main.Information>eContext.getFormContext();
        ToggleQuestionnaire(eContext);

        //Banner warning message displayed if Questionnaire Response has already been appended to a work order
        const warningMessage = Xrm.Utility.getResourceString("ovs_/resx/QuestionnaireResponse", "WorkOrderBannerMessage");

        //if the work order is not null, display the message, otherwise don't show it
        const tsworkorder = form.getAttribute("ts_workorder").getValue();

        if (tsworkorder != null) {

            //Show banner message
            form.ui.setFormNotification(warningMessage, "WARNING", "WorkOrderBannerMessage");
        }
        else {
            //clear banner if the field is null
            form.ui.clearFormNotification("1");
        }

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