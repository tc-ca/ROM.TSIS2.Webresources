namespace ROM.IncidentTypeServiceTask {
  // EVENTS
  const mode = 'display';
  export function ToggleQuestionnaire(eContext: Xrm.ExecutionContext<any, any>): void {
    const Form = <Form.msdyn_incidenttypeservicetask.Main.ROMInformation>eContext.getFormContext();

    // Get the web resource control on the form
    const wrCtrl = Form.getControl('WebResource_QuestionnaireRender');
    const hasQuestionnaire = Form.getAttribute('ovs_questionnaireenabled').getValue();
    const questionnaireId = Form.getAttribute('ovs_questionnaire').getValue();

    // Exit if no questionnaire exists
    if (!hasQuestionnaire) {
      wrCtrl.setVisible(false);
      return;
    }

    // Exit if no questionnaire is selected
    if (questionnaireId === null) {
      wrCtrl.setVisible(false);
      return;
    }

    // Get Questionnaire definition
    const surveyDefinition = null;
    Xrm.WebApi.retrieveRecord(
      'ovs_questionnaire',
      questionnaireId[0].id.substr(1, questionnaireId[0].id.length - 2),
      '?$select=ovs_questionnairedefinition'
    ).then(
      function success(result) {
        InitiateSurvey(wrCtrl, result.ovs_questionnairedefinition, mode);
      },
      function error(error) {
        Xrm.Navigation.openAlertDialog({ text: error.message });
      }
    );
  }
  // Get surveyJS locale
  function getSurveyLocal(): string {
    const languageCode = Xrm.Utility.getGlobalContext().userSettings.languageId;
    let surveyLocale = 'en';
    if (languageCode == 1036) {
      //French
      surveyLocale = 'fr';
    }
    return surveyLocale;
  }

  function InitiateSurvey(wrCtrl, surveyDefinition, mode) {
    wrCtrl.setVisible(true);
    wrCtrl.getContentWindow().then(function (win) {
      const surveyLocale = getSurveyLocal();
      win.InitializeSurveyRender(surveyDefinition, null, surveyLocale, mode);
    });
  }

  export function OnTaskTypeChange(eContext: Xrm.ExecutionContext<any, any>): void {
    const Form = <Form.msdyn_incidenttypeservicetask.Main.ROMInformation>eContext.getFormContext();
    const wrCtrl = Form.getControl('WebResource_QuestionnaireRender');
    // Get the web resource control on the form
    const tasktype = Form.getAttribute('msdyn_tasktype').getValue();
    const hasQuestionnaire = Form.getAttribute('ovs_questionnaireenabled');
    const questionnaireId = Form.getAttribute('ovs_questionnaire');
    if (tasktype === null) {
      hasQuestionnaire.setValue(false);
      questionnaireId.setValue(null);
      wrCtrl.setVisible(false);
    } else {
      //Assign hasquestionnaire and questionnaire id from task type to incident type service task
      Xrm.WebApi.retrieveRecord(
        'msdyn_servicetasktype',
        tasktype[0].id.substr(1, tasktype[0].id.length - 2),
        '?$select=ovs_questionnaireenabled,_ovs_questionnaire_value&$expand=ovs_Questionnaire($select=ovs_questionnairedefinition)'
      ).then(
        function success(result) {
          hasQuestionnaire.setValue(result.ovs_questionnaireenabled);
          const lookupValue = new Array();
          lookupValue[0] = new Object();
          lookupValue[0].id = '{' + result._ovs_questionnaire_value + '}'; // GUID of the lookup id
          lookupValue[0].entityType = 'ovs_questionnaire';
          questionnaireId.setValue(lookupValue);
          //Hide or render the SurveyJS section
          InitiateSurvey(wrCtrl, result.ovs_Questionnaire.ovs_questionnairedefinition, mode);
        },
        function error(error) {
          Xrm.Navigation.openAlertDialog({ text: error.message });
        }
      );
    }
  }
}
