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
        var taskType = Form.getAttribute("msdyn_tasktype").getValue();
        //Lock Task Type field if it has a value.
        if (taskType != null) {
            Form.getControl("msdyn_tasktype").setDisabled(true);
            //Retrieve Task Type record
            Xrm.WebApi.retrieveRecord("msdyn_servicetasktype", taskType[0].id).then(
                function success(result) {
                    //If it's for a custom questionnaire, show the custom questionnaire section
                    if (result.ts_hascustomquestionnaire) {
                        Form.ui.tabs.get("tab_summary").sections.get("section_custom_questionnaire").setVisible(true);
                    }
                }
            );
        }

        if (Form.getAttribute('statecode').getValue() == 1) {
            mode = "display";
        }

        //If Status Reason is New user is able to change Work Order Start Date
        const statusReason = Form.getAttribute("statuscode").getValue();
        if (statusReason == 918640005) {
            Form.getControl("ts_workorderstartdate").setDisabled(false);
        }
    }

    export function workOrderStartDateOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        UpdateQuestionnaireDefinition(eContext);
    }

    //If Status Reason is New, replace ovs_questionnairedefinition with definition from the Service Task Type Lookup field
    function UpdateQuestionnaireDefinition(eContext: Xrm.ExecutionContext<any, any>) {
        const Form = <Form.msdyn_workorderservicetask.Main.SurveyJS>eContext.getFormContext();
        const workOrderStartDate = Form.getAttribute("ts_workorderstartdate").getValue();
        const taskType = Form.getAttribute("msdyn_tasktype").getValue();
        //  Form.getControl('WebResource_QuestionnaireRender').setVisible(false);

        if (taskType != null) {
            const taskTypeID = taskType[0].id;
            Xrm.WebApi.retrieveRecord("msdyn_servicetasktype", taskTypeID, "?$select=msdyn_name&$expand=ovs_Questionnaire").then(
                function success(result) {
                    const today = new Date(Date.now()).toISOString().slice(0, 10);
                    const questionnaireId = result.ovs_Questionnaire.ovs_questionnaireid;
                    if (workOrderStartDate != null) {
                        //current questionnaire
                        var fetchXml = [
                            "<fetch>",
                            "  <entity name='ts_questionnaireversion'>",
                            "    <attribute name='ts_questionnairedefinition' />",
                            "    <attribute name='ts_name' />",
                            "    <filter type='and'>",
                            "      <condition attribute='ts_effectiveenddate' operator='on-or-after' value='", today, "'/>",
                            "      <condition attribute='ts_effectivestartdate' operator = 'on-or-before' value='", today, "'/>",
                            "      <condition attribute='ts_ovs_questionnaire' operator='eq' value='", questionnaireId, "'/>",
                            "    </filter>",
                            "    <order attribute='modifiedon' descending='true' />",
                            "  </entity>",
                            "</fetch>",
                        ].join("");
                        fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);

                        //Retrieve Questionnaire Versions of the Service Task's Questionnaire
                        Xrm.WebApi.retrieveMultipleRecords("ts_questionnaireversion", fetchXml)
                            .then(function success(result) {
                                if (result.entities[0] == null) return;
                                //The date selected falls within the Start and End Date of the current questionnaire - Display current questionnaire
                                if (Date.parse(workOrderStartDate.toString()) > Date.parse(result.entities[0].ts_effectivestartdate) && Date.parse(workOrderStartDate.toString()) < Date.parse(result.entities[0].ts_effectiveenddate)) {
                                    //Set WOST questionnaire definition to the Questionnaire Version's definition
                                    const newDefinition = result.entities[0].ts_questionnairedefinition;
                                    Form.getAttribute("ovs_questionnairedefinition").setValue(newDefinition);
                                    ToggleQuestionnaire(eContext);
                                }
                                else {
                                    // If the Inspector is connected display the questionnaire that was valid / active on the date selected    
                                    //If not display message
                                    var fetchXml = [
                                        "<fetch>",
                                        "  <entity name='ts_questionnaireversion'>",
                                        "    <attribute name='ts_questionnairedefinition' />",
                                        "    <attribute name='ts_name' />",
                                        "    <filter type='and'>",
                                        "      <condition attribute='ts_effectiveenddate' operator='on-or-after' value='", workOrderStartDate.toISOString().slice(0, 10), "'/>",
                                        "      <condition attribute='ts_effectivestartdate' operator = 'on-or-before' value='", workOrderStartDate.toISOString().slice(0, 10), "'/>",
                                        "      <condition attribute='ts_ovs_questionnaire' operator='eq' value='", questionnaireId, "'/>",
                                        "    </filter>",
                                        "    <order attribute='modifiedon' descending='true' />",
                                        "  </entity>",
                                        "</fetch>",
                                    ].join("");
                                    fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
                                    Xrm.WebApi.online.retrieveMultipleRecords("ts_questionnaireversion", fetchXml)
                                        .then(function success(result) {
                                            if (result.entities[0] == null) {
                                                Form.getControl('WebResource_QuestionnaireRender').setVisible(false);
                                                return;
                                            }
                                            //Set WOST questionnaire definition to the Questionnaire Version's definition
                                            const newDefinition = result.entities[0].ts_questionnairedefinition;
                                            Form.getAttribute("ovs_questionnairedefinition").setValue(newDefinition);
                                            ToggleQuestionnaire(eContext);
                                        }, function error(error) {                                          
                                            //If the Inspector is disconnected display an information message
                                            Form.getControl('WebResource_QuestionnaireRender').setVisible(false);
                                            var alertStrings = { confirmButtonLabel: "Ok", text: Xrm.Utility.getResourceString("ts_/resx/WorkOrderServiceTask", "Text"), title: Xrm.Utility.getResourceString("ts_/resx/WorkOrderServiceTask", "Title") };
                                            var alertOptions = { height: 120, width: 260 };
                                            Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
                                        });
                                }
                            }, function error(error) {
                                Xrm.Navigation.openAlertDialog({ text: error.message });
                            });
                    }
                });
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
    export function getSurveyLocal(): string {
        const languageCode = Xrm.Utility.getGlobalContext().userSettings.languageId;
        let surveyLocale = 'en';
        if (languageCode == 1036) {
            //French
            surveyLocale = 'fr';
        }
        return surveyLocale;
    }

    function InitiateSurvey(eContext, wrCtrl, questionnaireDefinition, questionnaireResponse, mode) {
        const Form = <Form.msdyn_workorderservicetask.Main.SurveyJS>eContext.getFormContext();
        wrCtrl.setVisible(true);
        wrCtrl.getContentWindow().then(async function (win) {
            const surveyLocale = getSurveyLocal();
            win.InitialContext(eContext);
            let operationData = await retrieveWorkOrderOperationData(eContext);
            win.isComplete = (Form.getAttribute("msdyn_percentcomplete").getValue() == 100.00);
            win.operationList = operationData.operations;
            win.activityTypeOperationTypeIdsList = operationData.activityTypeOperationTypeIds;
            win.InitializeSurveyRender(questionnaireDefinition, questionnaireResponse, surveyLocale, mode)
        });
    }

    //Retrieves parent Work Order's Operations and parent Work Order's ActivityType's OperationTypes
    async function retrieveWorkOrderOperationData(eContext) {
        //Get parent work order's id
        var workOrderAttribute = eContext.getFormContext().getAttribute('msdyn_workorder').getValue();
        var workOrderId = workOrderAttribute != null ? workOrderAttribute[0].id : "";
        //Array to be populated with opertations associated with parent work order before initializing the survey
        let operations: Object[] = [];
        let activityTypeOperationTypeIds: Object[] = [];

        var parentWorkOrderOperationFetchXml = [
            "<fetch top='50'>",
            "  <entity name='msdyn_workorder'>",
            "    <attribute name='ovs_operationid' />",
            "    <attribute name='msdyn_serviceaccount' />",
            "    <filter>",
            "      <condition attribute='msdyn_workorderid' operator='eq' value='", workOrderId, "'/>",
            "    </filter>",
            "    <link-entity name='ovs_operation' from='ovs_operationid' to='ovs_operationid' link-type='inner'>",
            "      <attribute name='ovs_operationtypeid' />",
            "      <attribute name='ovs_operationid' />",
            "      <attribute name='ovs_name' />",
            "      <link-entity name='ovs_operationtype' from='ovs_operationtypeid' to='ovs_operationtypeid'>",
            "        <attribute name='ts_regulated' />",
            "        <attribute name='ovs_operationtypeid' /> ",
            "      </link-entity>",
            "    </link-entity>",
            "    <link-entity name='account' from='accountid' to='msdyn_serviceaccount'>",
            "      <attribute name='name' />",
            "    </link-entity>",
            "  </entity>",
            "</fetch>",
        ].join("");
        parentWorkOrderOperationFetchXml = "?fetchXml=" + encodeURIComponent(parentWorkOrderOperationFetchXml);
        //Retrieve the operation in the ovs_operationid field of the parent work order
        let operationPromise1 = Xrm.WebApi.retrieveMultipleRecords("msdyn_workorder", parentWorkOrderOperationFetchXml);


        var parentWorkOrderRelatedOperationFetchXml = [
            "<fetch top='50'>",
            "  <entity name='ovs_operation'>",
            "    <attribute name='ts_stakeholder' />",
            "    <attribute name='ovs_operationid' />",
            "    <attribute name='ovs_name' />",
            "    <link-entity name='ts_msdyn_workorder_ovs_operation' from='ovs_operationid' to='ovs_operationid' intersect='true'>",
            "      <filter>",
            "        <condition attribute='msdyn_workorderid' operator='eq' value='", workOrderId, "'/>",
            "      </filter>",
            "    </link-entity>",
            "    <link-entity name='account' from='accountid' to='ts_stakeholder'>",
            "      <attribute name='name' />",
            "    </link-entity>",
            "    <link-entity name='ovs_operationtype' from='ovs_operationtypeid' to='ovs_operationtypeid'>",
            "      <attribute name='ts_regulated' />",
            "      <attribute name='ovs_operationtypeid' /> ",
            "    </link-entity>",
            "  </entity>",
            "</fetch>",
        ].join("");
        parentWorkOrderRelatedOperationFetchXml = "?fetchXml=" + encodeURIComponent(parentWorkOrderRelatedOperationFetchXml);
        //Retrieve operations associated to the parent Work Order
        let operationPromise2 = Xrm.WebApi.retrieveMultipleRecords("ovs_operation", parentWorkOrderRelatedOperationFetchXml);

        var activityTypeOperationTypesFetchXML = [
            "<fetch top='50'>",
            "  <entity name='ovs_operationtype'>",
            "    <attribute name='ovs_operationtypeid' />",
            "    <link-entity name='ts_ovs_operationtypes_msdyn_incidenttypes' from='ovs_operationtypeid' to='ovs_operationtypeid' intersect='true'>",
            "      <link-entity name='msdyn_incidenttype' from='msdyn_incidenttypeid' to='msdyn_incidenttypeid' intersect='true'>",
            "        <link-entity name='msdyn_workorder' from='msdyn_primaryincidenttype' to='msdyn_incidenttypeid'>",
            "          <filter>",
            "            <condition attribute='msdyn_workorderid' operator='eq' value='", workOrderId, "'/>",
            "          </filter>",
            "        </link-entity>",
            "      </link-entity>",
            "    </link-entity>",
            "  </entity>",
            "</fetch>",
        ].join("");
        activityTypeOperationTypesFetchXML = "?fetchXml=" + encodeURIComponent(activityTypeOperationTypesFetchXML);
        //Retrieve operationTypes of parent Work Order's ActivityType
        let activityTypeOperationTypesPromise = Xrm.WebApi.retrieveMultipleRecords("ovs_operationtype", activityTypeOperationTypesFetchXML);

        await Promise.all([operationPromise1, operationPromise2, activityTypeOperationTypesPromise]).then((operationRetrievalPromises) => {
            //Add the work order operation operationid, name, operationTypeId, and regulated boolean to the operations array
            var workOrderOperation = operationRetrievalPromises[0].entities[0];
            if (workOrderOperation["ovs_operation1.ovs_operationid"] != null && workOrderOperation["account3.name"] != null && workOrderOperation["ovs_operationtype2.ts_regulated"] != null) {
                operations.push({
                    id: workOrderOperation["ovs_operation1.ovs_operationid"],
                    name: workOrderOperation["account3.name"] + " : " + workOrderOperation["ovs_operation1.ovs_name"],
                    operationTypeId: workOrderOperation["ovs_operation1.ovs_operationtypeid"],
                    isRegulated: workOrderOperation["ovs_operationtype2.ts_regulated"]
                });
            }

            //Add the operationid, name, operationTypeId, and regulated boolean of the work order's N:N operations to the operations array
            operationRetrievalPromises[1].entities.forEach(function (operation) {
                if (operation.ovs_operationid != null && operation["account2.name"] != null && operation["ovs_operationtype3.ts_regulated"] != null) {
                    operations.push({
                        id: operation["ovs_operationid"],
                        name: operation["account2.name"] + " : " + operation["ovs_name"],
                        operationTypeId: operation["ovs_operationtype3.ovs_operationtypeid"],
                        isRegulated: operation["ovs_operationtype3.ts_regulated"]
                    });
                }
            });

            //collect each operationType Id
            operationRetrievalPromises[2].entities.forEach(function (operationType) {
                activityTypeOperationTypeIds.push(operationType["ovs_operationtypeid"]);
            });

        });

        //Return object containing retrieved operation data
        return {
            operations: operations,
            activityTypeOperationTypeIds: activityTypeOperationTypeIds
        };
    }
}

function CompleteQuestionnaire(wrCtrl) {
    // Get the web resource inner content window
    wrCtrl.getContentWindow().then(function (win) {
        const userInput = win.DoComplete();
    });
}