export default class MainForm {
  // EVENTS
  static onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
    // Get formContext
    const Form = <Form.ovs_questionnaire.Main.Information>eContext.getFormContext();
    const surveyDefinition = Form.getAttribute('ovs_questionnairedefinition').getValue();
    // Get the web resource control on the form
    const wrCtrl = Form.getControl('WebResource_QuestionnaireCreator');

    // Get the web resource inner content window
    this.InitiateSurvey(wrCtrl, surveyDefinition);
  }

  static onSave(eContext: Xrm.ExecutionContext<any, any>): void {
    // Get formContext
    const Form = <Form.ovs_questionnaire.Main.Information>eContext.getFormContext();

    // Get the web resource control on the form
    const wrCtrl = Form.getControl('WebResource_QuestionnaireCreator');

    // Get the web resource inner content window
    this.SaveQuestionnaireDefinition(Form, wrCtrl);
  }

  private static InitiateSurvey(wrCtrl, surveyDefinition) {
    wrCtrl.setVisible(true);
    const $this = this;
    wrCtrl.getContentWindow().then(function (win) {
      const surveyLocale = $this.getSurveyLocal();
      win.InitializeSurveyCreator(surveyDefinition, surveyLocale);
    });
  }

  private static getSurveyLocal(): string {
    const languageCode = Xrm.Utility.getGlobalContext().userSettings.languageId;
    let surveyLocale = 'en';
    if (languageCode == 1036) {
      //French
      surveyLocale = 'fr';
    }
    return surveyLocale;
  }

  private static SaveQuestionnaireDefinition(Form: Form.ovs_questionnaire.Main.Information, wrCtrl) {
    // Get the web resource inner content window
    if (wrCtrl !== null && wrCtrl !== undefined) {
      wrCtrl.getContentWindow().then(function (win) {
        const surveyDefinition = win.GetSurveyDefinition();
        Form.getAttribute('ovs_questionnairedefinition').setValue(surveyDefinition);
      });
    }
  }
}
