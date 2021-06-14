namespace ROM.WorkOrderServiceTask {
    // EVENTS
    var mode = '';
    export function ToggleQuestionnaire(eContext: Xrm.ExecutionContext<any, any>): void {
        const Form = <Form.msdyn_workorderservicetask.Main.SurveyJS>eContext.getFormContext();

        // Get the web resource control on the form
        const wrCtrl = Form.getControl('WebResource_QuestionnaireRender');
        const questionnaireDefinition = Form.getAttribute('ovs_questionnairedefinition').getValue();
        const questionnaireResponse = Form.getAttribute('ovs_questionnaireresponse').getValue();

        // Exit if no questionnaire exists
        if (questionnaireDefinition === null) {
            wrCtrl.setVisible(false);
            return;
        }

        // Get Questionnaire definition
        wrCtrl.setVisible(true);
        InitiateSurvey(eContext, wrCtrl, questionnaireDefinition, questionnaireResponse, mode);
    }

    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const Form = <Form.msdyn_workorderservicetask.Main.SurveyJS>eContext.getFormContext();

        //Lock Task Type field if it has a value.
        if (Form.getAttribute("msdyn_tasktype").getValue() != null) {
            Form.getControl("msdyn_tasktype").setDisabled(true);
        }

        if(Form.getAttribute('statecode').getValue() == 1){
            mode = "display";
        }
        UpdateQuestionnaireDefinition(eContext);
    }

    //If Status Reason is New, replace ovs_questionnairedefinition with definition from the Service Task Type Lookup field
    function UpdateQuestionnaireDefinition(eContext: Xrm.ExecutionContext<any, any>) {
        const Form = <Form.msdyn_workorderservicetask.Main.SurveyJS>eContext.getFormContext();
        const statusReason = Form.getAttribute("statuscode").getValue();
        //If Status Reason is New
        if (statusReason == 918640005) {
            const taskType = Form.getAttribute("msdyn_tasktype").getValue();
            if (taskType != null) {
                const taskTypeID = taskType[0].id;
                Xrm.WebApi.retrieveRecord("msdyn_servicetasktype", taskTypeID, "?$select=msdyn_name&$expand=ovs_Questionnaire").then(
                    function success(result) {
                        const newDefinition = result.ovs_Questionnaire.ovs_questionnairedefinition;
                        Form.getAttribute("ovs_questionnairedefinition").setValue(newDefinition);
                        ToggleQuestionnaire(eContext);
                    });
            }
        } else {
            ToggleQuestionnaire(eContext);
        }
    }

    export function onSave(eContext: Xrm.ExecutionContext<any, any>): void {
        // Get formContext
        const Form = <Form.msdyn_workorderservicetask.Main.SurveyJS>eContext.getFormContext();

        const percentComplete = Form.getAttribute("msdyn_percentcomplete").getValue();
        if (percentComplete != 100.00) {
            //Set percentComplete to 50.00
            Form.getAttribute("msdyn_percentcomplete").setValue(50.00);
            //Set Status Reason to In-Progress
            Form.getAttribute("statuscode").setValue(918640004);
        }
        //Lock Task Type field if it has a value.
        if (Form.getAttribute("msdyn_tasktype").getValue() != null) {
            Form.getControl("msdyn_tasktype").setDisabled(true);
        }

        // Get the web resource control on the form
        const wrCtrl = Form.getControl('WebResource_QuestionnaireRender');
        if (wrCtrl.getVisible() === false) {
            return;
        }
        // Get the web resource inner content window
        CompleteQuestionnaire(wrCtrl);
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

    function InitiateSurvey(eContext, wrCtrl, questionnaireDefinition, questionnaireResponse, mode) {
        wrCtrl.setVisible(true);
        wrCtrl.getContentWindow().then(async function (win) {
            const surveyLocale = getSurveyLocal();
            win.InitialContext(eContext);
            win.operationList = await retrieveWorkOrderOperations(eContext);
            win.InitializeSurveyRender(questionnaireDefinition, questionnaireResponse, surveyLocale, mode)
        });
    }

    async function retrieveWorkOrderOperations(eContext) {
        //Get parent work order's id
        var workOrderAttribute = eContext.getFormContext().getAttribute('msdyn_workorder').getValue();
        var workOrderId = workOrderAttribute != null ? workOrderAttribute[0].id : "";
        //Array to be populated with opertations associated with parent work order before initializing the survey
        let operations : Object[] = [];

        //Retrieve the operation (customer asset) in the ovs_asset field of the parent work order
        let operationPromise1 = Xrm.WebApi.online.retrieveRecord("msdyn_workorder", workOrderId, "?$select=ovs_asset&$expand=ovs_asset($select=msdyn_name,msdyn_customerassetid)");

        var fetchXml = [
            "<fetch top='50'>",
            "  <entity name='msdyn_customerasset'>",
            "    <attribute name='msdyn_name' />",
            "    <attribute name='msdyn_customerassetid' />",
            "    <link-entity name='ts_msdyn_customerasset_msdyn_workorder' from='msdyn_customerassetid' to='msdyn_customerassetid' intersect='true'>",
            "      <filter>",
            "        <condition attribute='msdyn_workorderid' operator='eq' value='", workOrderId, "'/>",
            "      </filter>",
            "    </link-entity>",
            "  </entity>",
            "</fetch>",
        ].join("");
        fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
        //Retrieve operations (customer assets) associated to the parent Work Order
        let operationPromise2 = Xrm.WebApi.retrieveMultipleRecords("msdyn_customerasset", fetchXml);

        await Promise.all([operationPromise1, operationPromise2]).then((operationRetrievalPromises) => {
            //Add the work order operation field's id and name to the operationListarray
            operations.push({
                id: operationRetrievalPromises[0].ovs_asset.msdyn_customerassetid,
                name: operationRetrievalPromises[0].ovs_asset.msdyn_name
            });
            //Add the id and name of the work order's N:N operations to the operationList array
            operationRetrievalPromises[1].entities.forEach(function (operation) {
                operations.push({
                    id: operation.msdyn_customerassetid,
                    name: operation.msdyn_name
                });
            });
        });

        return operations;
    }
}

function CompleteQuestionnaire(wrCtrl) {
    // Get the web resource inner content window
    wrCtrl.getContentWindow().then(function (win) {
        const userInput = win.DoComplete();
    });
}