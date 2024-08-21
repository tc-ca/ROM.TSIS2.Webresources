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

        setActivityTypeFilteredView(form);
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

    // Filter the lookup for Activity Type (ts_activitytype)
    function setActivityTypeFilteredView(form: Form.ts_questionnaireresponse.Main.Information): void {

        //let selectedQuestionnaireResponseId = form.data.entity.getId();
        let selectedQuestionnaireId = form.getAttribute("ts_questionnaire").getValue();

        if (selectedQuestionnaireId != null && selectedQuestionnaireId != undefined) {

            // remove the curly braces from the GUID
            let selectedQuestionnaireIdGUID = selectedQuestionnaireId[0].id.replace(/[{}]/g, '');

            // get the Activity Types
            let activityTypeFetchXML = `
                <fetch xmlns:generator="MarkMpn.SQL4CDS" distinct="true">
                  <entity name="msdyn_incidenttype">
                    <attribute name="msdyn_incidenttypeid" />
                    <attribute name="msdyn_name" />
                    <link-entity name="msdyn_incidenttypeservicetask" to="msdyn_incidenttypeid" from="msdyn_incidenttype" alias="msdyn_incidenttypeservicetask" link-type="inner">
                      <link-entity name="msdyn_servicetasktype" to="msdyn_tasktype" from="msdyn_servicetasktypeid" alias="msdyn_servicetasktype" link-type="inner">
                        <link-entity name="ovs_questionnaire" to="ovs_questionnaire" from="ovs_questionnaireid" alias="ovs_questionnaire" link-type="inner">
                          <attribute name="ovs_questionnaireid" />
                          <filter>
                            <condition attribute="ovs_questionnaireid" operator="eq" value="${selectedQuestionnaireIdGUID}" />
                          </filter>
                        </link-entity>
                      </link-entity>
                    </link-entity>
                  </entity>
                </fetch>
            `;


            //Now filter the lookup
            const viewId = '{5D6A532B-172B-469E-993F-F6C6CF8C2E9F}';
            const entityName = "msdyn_incidenttype";
            const viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/QuestionnaireResponse", "FilteredActivityTypes");
            //const fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" returntotalrecordcount="true" page="1" count="25" no-lock="false"><entity name="ts_incompleteworkorderreason"><attribute name="ts_incompleteworkorderreasonid" /><attribute name="ts_name" /><filter type="or"><condition attribute="ownerid" operator="eq" value="' + ownerId + '" /><condition attribute="ts_incompleteworkorderreasonid" operator="eq" value="' + otherId + '" /></filter><order attribute="ts_name" /></entity></fetch>';
            const layoutXml = `
                <grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1">
	                <row name="result" id="msdyn_incidenttypeid">
		                <cell name="msdyn_name" width="200" />
	                </row>
                </grid>
            `;

            form.getControl("ts_activitytype").addCustomView(viewId, entityName, viewDisplayName, activityTypeFetchXML, layoutXml, true);
        }
    }
}