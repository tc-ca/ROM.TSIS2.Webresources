namespace ROM.WorkOrderServiceTask {
    // EVENTS
    var mode = '';
    const lang = Xrm.Utility.getGlobalContext().userSettings.languageId;
    var enterStartDateToProceedText = "Enter a start date to proceed";
    var enterTaskTypeToProccedText = "Enter a task type to proceed";
    var confirmTitle = "Message";
    var noQuestionnaireText = "There is no questionnaire available for this date.";
    var confirmDisconnectedText = "You cannot retrieve the Inspection valid/active on the date selected";
    if (lang == 1036) {
        enterStartDateToProceedText = "Entrez une date de début pour continue";
        enterTaskTypeToProccedText = "Entrez un type de tâche pour continuer";
        confirmTitle = "Message";
        confirmDisconnectedText = "Vous ne pouvez pas récupérer l'inspection valide/active à la date sélectionnée";
        noQuestionnaireText = "Il n'y a pas de questionnaire disponible pour cette date.";
    }
    var aircraftModelOptions;
    var aocRegion;
    export async function onLoad(eContext: Xrm.ExecutionContext<any, any>) {
        const Form = <Form.msdyn_workorderservicetask.Main.SurveyJS>eContext.getFormContext();

        aircraftModelOptions = Form.getControl("ts_aircraftmodel").getOptions();
        //If there's a related Work Order, filter the Task Type Lookup to match the Work Order's Activity Type Filter
        if (Form.getAttribute("msdyn_workorder").getValue() != null) {
            setTaskTypeFilteredView(Form);
            showHideFieldsByIncidentType(Form);
            // Commented out below to remove the "discard changes" prompt. Moved to WOST Workspace
            //aircraftManufacturerOnChange(eContext);
        }

        var taskType = Form.getAttribute("msdyn_tasktype").getValue();
        //Lock Task Type field if it has a value.
        if (taskType != null) {
            Form.getControl("msdyn_tasktype").setDisabled(true);
            //Retrieve Task Type record
            Xrm.WebApi.retrieveRecord("msdyn_servicetasktype", taskType[0].id).then(
                function success(result) {
                    //If it's for a custom questionnaire, show the custom questionnaire section
                    if (result.ts_hascustomquestionnaire) {
                        Form.ui.tabs.get("tab_questionnaire").sections.get("section_custom_questionnaire").setVisible(true);
                        filterLegislationSource(eContext);
                    }
                }
            );
        }

        if (Form.getAttribute('statecode').getValue() == 1) {
            mode = "display";
        }

        //If Status Reason is New user is able to change Work Order Start Date
        const statusReason = Form.getAttribute("statuscode").getValue();
        const workOrderStartDateCtl = Form.getControl("ts_servicetaskstartdate");
        const workOrderStartDateValue = Form.getAttribute("ts_servicetaskstartdate").getValue();
        const workOrderEndDateCtl = Form.getControl("ts_servicetaskenddate");
        const workOrderTaskTypeCtl = Form.getControl("msdyn_tasktype");

        workOrderEndDateCtl.setDisabled(true);
        if (await workOrderIsDraft(eContext)) {
            mode = 'display';
            setAllFieldsDisabled(eContext);
        } else if (statusReason == 918640005) {
            workOrderStartDateCtl.setDisabled(false);

            // Also, add a message that work order service task start date should be filled in to proceed.
            if (workOrderStartDateValue == null) {
                workOrderStartDateCtl.setNotification(enterStartDateToProceedText, "ts_servicetaskstartdate_entertoproceed");
                Form.getControl('WebResource_QuestionnaireRender').setVisible(false);
            }
            //If work order service task is in new status but has start date and questionnaire (it was copied from anothe WO)
            else {
                workOrderStartDateCtl.setDisabled(true);
                ToggleQuestionnaire(eContext);
            }

            // Also, add a message that task type start date should be filled in to proceed.
            if (taskType == null) {
                workOrderTaskTypeCtl.setNotification(enterTaskTypeToProccedText, "ts_tasktype_entertoproceed");
                Form.getControl('WebResource_QuestionnaireRender').setVisible(false);
            }

        } else {
            //Make sure that if for whatever reason the start date does not have a value, that it remains unlocked.
            if (workOrderStartDateValue == null) {
                workOrderStartDateCtl.setDisabled(false);
            } else {
                workOrderStartDateCtl.setDisabled(true);
            }

            ToggleQuestionnaire(eContext);
        }

        //If Questionnaire was created in offline mode and was appended to WOST
        var fromOffline = Form.getAttribute("ts_fromoffline").getValue();

        if (fromOffline) {
            UpdateQuestionnaireDefinition(eContext);
        }


        if (statusReason == 918640002) {
            Form.ui.setFormNotification((Xrm.Utility.getGlobalContext().userSettings.languageId == 1033 ? "To unlock completed questionnaires please contact your manager." : "Pour déverrouiller un questionnaire complété, veuillez contacter votre gestionnaire."), "WARNING", "completed_questionnaire");

        }

        //Lock for non Admin users
        if (!userHasRole("System Administrator|ROM - Business Admin")) {
            Form.getControl("ts_mandatory").setDisabled(true);
        }

        //Hide Questionnaire Viewable Settings section for non-admin users with the exception of ROM - Manager
        if (!userHasRole("System Administrator|ROM - Manager")) {
            Form.ui.tabs.get('tab_summary').sections.get('tab_summary_section_accesscontrol').setVisible(false);
        }
        checkAccessControl(eContext);
    }

    export function serviceTaskStartDateOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        UpdateQuestionnaireDefinition(eContext);
    }

    export function taskTypeOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        applyMandatoryFieldFromTaskType(eContext);
        UpdateQuestionnaireDefinition(eContext);
    }
    export function onLoadServiceTaskStartDate(eContext: Xrm.ExecutionContext<any, any>): void {
        // Skip auto workspace navigation if we came from the workspace ribbon (sessionStorage flag)
        try {
            const formContext = <Form.msdyn_workorderservicetask.Main.Information>eContext.getFormContext();
            const currentId = formContext.data.entity.getId().replace(/[{}]/g, "");
            const flagKey = "ROM.SkipWorkspaceAutoOpen." + currentId;
            if (sessionStorage.getItem(flagKey) === "1") {
                sessionStorage.removeItem(flagKey);
                return; // Do NOT auto-open or create workspace
            }
        } catch (e) {
            console.warn("Skip flag check failed: " + (e as any).message);
        }

        const formContext = <Form.msdyn_workorderservicetask.Main.Information>eContext.getFormContext();
        const serviceTaskStartDateAttr = formContext.getAttribute("ts_servicetaskstartdate");
        const serviceTaskStartDate = serviceTaskStartDateAttr ? (<Xrm.Attribute<any>>serviceTaskStartDateAttr).getValue() : null;
        const entityId = formContext.data.entity.getId();
        const entityIdClean = entityId.replace(/{|}/g, "");

        const openExistingWorkspaceDialog = (workspaceId: string) => {
            const pageInput: any = {
                pageType: "entityrecord",
                entityName: "ts_workorderservicetaskworkspace",
                entityId: workspaceId
            };
            const navigationOptions: Xrm.NavigationOptions = {
                target: 2,
                width: { value: 80, unit: "%" },
                height: { value: 80, unit: "%" },
                position: 1
            };
            Xrm.Navigation.navigateTo(pageInput, navigationOptions).then(
                () => formContext.ui.close(),
                (error) => console.error("Error opening existing workspace modal: ", error.message)
            );
        };

        const openWorkspaceCreateDialog = () => {
            const entityName = formContext.getAttribute("msdyn_name")?.getValue();
            const workOrderLookup = formContext.getAttribute("msdyn_workorder")?.getValue();
            const workOrderId = workOrderLookup && workOrderLookup.length > 0 ? workOrderLookup[0].id.replace(/{|}/g, "") : null;
            const workOrderName = workOrderLookup && workOrderLookup.length > 0 ? workOrderLookup[0].name : null;
            const taskTypeLookup = formContext.getAttribute("msdyn_tasktype")?.getValue();
            const taskTypeId = taskTypeLookup && taskTypeLookup.length > 0 ? taskTypeLookup[0].id.replace(/{|}/g, "") : null;
            const taskTypeName = taskTypeLookup && taskTypeLookup.length > 0 ? taskTypeLookup[0].name : null;

            const pageInput: any = {
                pageType: "entityrecord",
                entityName: "ts_workorderservicetaskworkspace",
                formType: 2,
                useQuickCreateForm: true,
                data: {
                    ts_name: entityName,
                    "ts_workorderservicetask@odata.bind": `/msdyn_workorderservicetasks(${entityIdClean})`,
                    ts_workorder: workOrderId ? {
                        id: workOrderId,
                        name: workOrderName,
                        entityType: "msdyn_workorder"
                    } : undefined,
                    ts_tasktype: taskTypeId ? {
                        id: taskTypeId,
                        name: taskTypeName,
                        entityType: "msdyn_servicetasktype"
                    } : undefined
                },
                createFromEntity: {
                    entityType: "msdyn_workorderservicetask",
                    id: entityId,
                    name: entityName
                }
            };

            const navigationOptions: Xrm.NavigationOptions = {
                target: 2,
                width: { value: 80, unit: "%" },
                height: { value: 80, unit: "%" },
                position: 1
            };

            Xrm.Navigation.navigateTo(pageInput, navigationOptions).then(
                () => formContext.ui.close(),
                (error) => console.error("Error opening create workspace modal: ", error.message)
            );
        };

        // Always check first if a related workspace already exists (default case: open it)
        const fetchExisting = [
            "<fetch top='1'>",
            "  <entity name='ts_workorderservicetaskworkspace'>",
            "    <attribute name='ts_workorderservicetaskworkspaceid' />",
            "    <order attribute='createdon' descending='true' />",
            "    <filter>",
            "      <condition attribute='ts_workorderservicetask' operator='eq' value='", entityIdClean, "'/>",
            "    </filter>",
            "  </entity>",
            "</fetch>"
        ].join("");

        Xrm.WebApi.retrieveMultipleRecords("ts_workorderservicetaskworkspace", "?fetchXml=" + encodeURIComponent(fetchExisting))
            .then(result => {
                if (result.entities && result.entities.length > 0) {
                    // Existing workspace: open it regardless of start date value
                    openExistingWorkspaceDialog(result.entities[0].ts_workorderservicetaskworkspaceid);
                    return;
                }

                // If no related workspace AND status is Complete, stay on WOST (do not open/create workspace)
                const statusReason = (formContext.getAttribute as any)("statuscode")?.getValue();
                const isComplete = statusReason === 918640002 /* Complete */;
                if (isComplete) {
                    return;
                }

                // If no related workspace AND status is In Progress, create new workspace and copy fields
                const isInProgress = statusReason === 918640004 /* In Progress */;
                if (isInProgress) {
                    return;
                }

                // No existing workspace: create new workspace only if start date is null
                if (serviceTaskStartDate === null) {
                    // Create when start date is null
                    openWorkspaceCreateDialog();
                } else {
                    // Offline Mode: Create when start date has value but no workspace exists
                    openWorkspaceCreateDialog();
                }
            })
            .catch(err => console.error("Error querying existing workspace: ", err.message));

    }
    function applyMandatoryFieldFromTaskType(eContext) {
        var fc = eContext.getFormContext();
        var taskTypeValue = fc.getAttribute("msdyn_tasktype").getValue();
        console.log("Retrieved values: check type ");
        if (taskTypeValue != null && taskTypeValue != undefined && taskTypeValue[0].entityType == "msdyn_servicetasktype") {

            Xrm.WebApi.retrieveRecord("msdyn_servicetasktype", taskTypeValue[0].id, "?$select=ts_mandatory").then(
                function success(result) {

                    console.log("Retrieved values: ts_mandatory: " + result.ts_mandatory);
                    if (result.ts_mandatory != null && result.ts_mandatory) {
                        fc.getAttribute("ts_mandatory").setValue(true);
                    }
                    else { fc.getAttribute("ts_mandatory").setValue(false); }
                },
                function (error) {
                    console.log(error.message);
                }
            );
        }
    }
    function ToggleQuestionnaire(eContext: Xrm.ExecutionContext<any, any>): void {
        console.log("Entering ToggleQuestionnaire ");
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

    //If Status Reason is New, replace ovs_questionnairedefinition with definition from the Service Task Type Lookup field
    function UpdateQuestionnaireDefinition(eContext: Xrm.ExecutionContext<any, any>) {
        const Form = <Form.msdyn_workorderservicetask.Main.SurveyJS>eContext.getFormContext();
        const serviceTaskStartDate = Form.getAttribute("ts_servicetaskstartdate").getValue();
        const taskType = Form.getAttribute("msdyn_tasktype").getValue();
        const workOrderStartDateCtl = Form.getControl("ts_servicetaskstartdate");
        const workOrderTaskTypeCtl = Form.getControl("msdyn_tasktype");
        if (taskType != null) {
            workOrderTaskTypeCtl.clearNotification("ts_tasktype_entertoproceed");
            workOrderStartDateCtl.setDisabled(false);
            const taskTypeID = taskType[0].id;
            Xrm.WebApi.retrieveRecord("msdyn_servicetasktype", taskTypeID, "?$select=msdyn_name,ts_hascustomquestionnaire,ovs_questionnaireenabled&$expand=ovs_Questionnaire").then(
                function success(result) {

                    const workOrderStartDateCtl = Form.getControl("ts_servicetaskstartdate");
                    //Custom questionnaires do not have a questionnaire definition
                    //Remove notification and skip remaining steps
                    if (result.ts_hascustomquestionnaire) {
                        // Clear out the message that a work order service task start date must be entered to proceed
                        workOrderStartDateCtl.clearNotification("ts_servicetaskstartdate_entertoproceed");
                        return;
                    }
                    //Service Task Type does not have a questionnaire
                    if (!result.ovs_questionnaireenabled)
                        workOrderStartDateCtl.setNotification(noQuestionnaireText, "ts_servicetaskstartdate_entertoproceed");

                    const today = new Date(Date.now()).toISOString().slice(0, 10);
                    const questionnaireId = result.ovs_Questionnaire?.ovs_questionnaireid;

                    if (serviceTaskStartDate != null) {

                        // Clear out the message that a work order service task start date must be entered to proceed
                        workOrderStartDateCtl.clearNotification("ts_servicetaskstartdate_entertoproceed");

                        //current questionnaire
                        var fetchXml = [
                            "<fetch>",
                            " <entity name='ts_questionnaireversion'>",
                            "	<attribute name='ts_questionnairedefinition' />",
                            "	<attribute name='ts_name' />",
                            "	<attribute name='ts_effectivestartdate' />",
                            "	<attribute name='ts_effectiveenddate' />",
                            "	<filter type='or'>",
                            "	  <filter>",
                            "		<condition attribute='ts_effectiveenddate' operator='on-or-after' value='", today, "'/>",
                            "		<filter>",
                            "		  <condition attribute='ts_effectivestartdate' operator='on-or-before' value='", today, "'/>",
                            "		  <condition attribute='ts_ovs_questionnaire' operator='eq' value='", questionnaireId, "'/>",
                            "		</filter>",
                            "	  </filter>",
                            "	  <filter>",
                            "		<condition attribute='ts_effectivestartdate' operator='on-or-before' value='", today, "'/>",
                            "		<condition attribute='ts_ovs_questionnaire' operator='eq' value='", questionnaireId, "'/>",
                            "	  </filter>",
                            "	</filter>",
                            " </entity>",
                            "</fetch>",
                        ].join("");
                        fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);

                        //Retrieve Questionnaire Versions of the Service Task's Questionnaire
                        Xrm.WebApi.retrieveMultipleRecords("ts_questionnaireversion", fetchXml)
                            .then(function success(result) {
                                if (result.entities[0] == null) {
                                    workOrderStartDateCtl.setNotification(noQuestionnaireText, "ts_servicetaskstartdate_entertoproceed");
                                    return;
                                }
                                //The date selected falls within the Start and End Date of the current questionnaire - Display current questionnaire
                                var effectiveStartDate = new Date(result.entities[0].ts_effectivestartdate);
                                var effectiveEndDate = new Date(result.entities[0].ts_effectiveenddate);

                                if ((serviceTaskStartDate >= effectiveStartDate) && (effectiveEndDate.toString() == "Invalid Date" || serviceTaskStartDate <= effectiveEndDate)) {
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
                                        "      <condition attribute='ts_effectiveenddate' operator='on-or-after' value='", serviceTaskStartDate.toISOString().slice(0, 10), "'/>",
                                        "      <condition attribute='ts_effectivestartdate' operator = 'on-or-before' value='", serviceTaskStartDate.toISOString().slice(0, 10), "'/>",
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
                                                workOrderStartDateCtl.setNotification(noQuestionnaireText, "ts_servicetaskstartdate_entertoproceed");
                                                return;
                                            }
                                            //Set WOST questionnaire definition to the Questionnaire Version's definition
                                            const newDefinition = result.entities[0].ts_questionnairedefinition;
                                            Form.getAttribute("ovs_questionnairedefinition").setValue(newDefinition);
                                            ToggleQuestionnaire(eContext);
                                        }, function error(error) {
                                            //If the Inspector is disconnected display an information message
                                            Form.getControl('WebResource_QuestionnaireRender').setVisible(false);
                                            var alertStrings = { confirmButtonLabel: "Ok", text: confirmDisconnectedText, title: confirmTitle };
                                            var alertOptions = { height: 120, width: 260 };
                                            Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
                                        });
                                }
                            }, function error(error) {
                                Xrm.Navigation.openAlertDialog({ text: error.message });
                            });
                    } else {
                        // Work order service task start date is empty so display message to enter it before proceeding
                        workOrderStartDateCtl.setNotification(enterStartDateToProceedText, "ts_servicetaskstartdate_entertoproceed");
                        Form.getControl('WebResource_QuestionnaireRender').setVisible(false);
                    }
                });
        }
        else {
            // Task Type is empty so display message to enter it before proceeding
            if (serviceTaskStartDate != null)
                workOrderStartDateCtl.clearNotification("ts_servicetaskstartdate_entertoproceed");
            else
                workOrderStartDateCtl.setNotification(enterStartDateToProceedText, "ts_servicetaskstartdate_entertoproceed");

            const workOrderTaskTypeCtl = Form.getControl("msdyn_tasktype");
            workOrderTaskTypeCtl.setNotification(enterTaskTypeToProccedText, "ts_tasktype_entertoproceed");
            Form.getControl('WebResource_QuestionnaireRender').setVisible(false);
        }
    }

    export function onSave(eContext: Xrm.ExecutionContext<any, any>): void {
        // Get formContext
        const Form = <Form.msdyn_workorderservicetask.Main.SurveyJS>eContext.getFormContext();

        const percentComplete = Form.getAttribute("msdyn_percentcomplete").getValue();
        if (percentComplete != 100.00 && Form.getAttribute("statecode").getValue() == msdyn_workorderservicetask_statecode.Active) {
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

    function setTaskTypeFilteredView(form: Form.msdyn_workorderservicetask.Main.SurveyJS,): void {
        const workOrderValue = form.getAttribute("msdyn_workorder").getValue();
        const workOrderId = workOrderValue ? workOrderValue[0].id : "";

        Xrm.WebApi.retrieveRecord("msdyn_workorder", workOrderId, "?$select=_msdyn_workordertype_value,_ovs_operationtypeid_value,_ts_site_value,_ts_region_value,_msdyn_serviceaccount_value,_ovs_operationid_value&$expand=ovs_operationtypeid($select=_ownerid_value) ").then(
            function success(result) {
                const viewId = '{ae0d8547-6871-4854-91ba-03b0c619dbe1}';
                const entityName = "msdyn_servicetasktype";
                const viewDisplayName = (lang == 1036) ? "Type de tâche relative au service" : "Service Task Types";
                const fetchXml = `<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"> <entity name="msdyn_servicetasktype"> <attribute name="msdyn_name" /> <attribute name="createdon" /> <attribute name="msdyn_estimatedduration" /> <attribute name="msdyn_description" /> <attribute name="msdyn_servicetasktypeid" /> <order attribute="msdyn_name" descending="false" /> <link-entity name="msdyn_incidenttypeservicetask" from="msdyn_tasktype" to="msdyn_servicetasktypeid" link-type="inner" alias="ae"> <link-entity name="msdyn_incidenttype" from="msdyn_incidenttypeid" to="msdyn_incidenttype" link-type="inner" alias="af"> <filter type="and"> <condition attribute="msdyn_defaultworkordertype" operator="eq" value="${result._msdyn_workordertype_value}" /> </filter> <link-entity name="ts_ovs_operationtypes_msdyn_incidenttypes" from="msdyn_incidenttypeid" to="msdyn_incidenttypeid" visible="false" intersect="true"> <link-entity name="ovs_operationtype" from="ovs_operationtypeid" to="ovs_operationtypeid" alias="ag"> <filter type="and"> <condition attribute="ovs_operationtypeid" operator="eq" value="${result._ovs_operationtypeid_value}" /> </filter> </link-entity> </link-entity> </link-entity> </link-entity> </entity> </fetch>`;
                const layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="msdyn_servicetasktype"><cell name="msdyn_name" width="200" /></row></grid>';
                form.getControl("msdyn_tasktype").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);

                const ownerId = getOwnerIdFromRecord(result.ovs_operationtypeid);
                showHideFieldsByOperationType(form, result._ovs_operationtypeid_value, ownerId);
                aocRegion = result._ts_region_value;

                if (form.getAttribute("ts_aocoperation").getValue() == null && result._ovs_operationtypeid_value == "8b614ef0-c651-eb11-a812-000d3af3ac0d") {  //Air Carrier (Passenger)
                    var lookup = new Array();
                    lookup[0] = new Object();
                    lookup[0].id = result._ovs_operationid_value
                    lookup[0].name = result["_ovs_operationid_value@OData.Community.Display.V1.FormattedValue"]
                    lookup[0].entityType = result["_ovs_operationid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                    form.getAttribute("ts_aocoperation").setValue(lookup);

                    lookup = new Array();
                    lookup[0] = new Object();
                    lookup[0].id = result._ovs_operationtypeid_value
                    lookup[0].name = result["_ovs_operationtypeid_value@OData.Community.Display.V1.FormattedValue"]
                    lookup[0].entityType = result["_ovs_operationtypeid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                    form.getAttribute("ts_aocoperationtype").setValue(lookup);

                    lookup = new Array();
                    lookup[0] = new Object();
                    lookup[0].id = result._msdyn_serviceaccount_value
                    lookup[0].name = result["_msdyn_serviceaccount_value@OData.Community.Display.V1.FormattedValue"]
                    lookup[0].entityType = result["_msdyn_serviceaccount_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                    form.getAttribute("ts_aocstakeholder").setValue(lookup);

                    lookup = new Array();
                    lookup[0] = new Object();
                    lookup[0].id = result._ts_site_value
                    lookup[0].name = result["_ts_site_value@OData.Community.Display.V1.FormattedValue"]
                    lookup[0].entityType = result["_ts_site_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                    form.getAttribute("ts_aocsite").setValue(lookup);

                    setAOCSiteFilteredView(form, result._ts_region_value, result._msdyn_serviceaccount_value, result._ovs_operationtypeid_value);
                }
                else {
                    const aocStakeholder = form.getAttribute("ts_aocstakeholder").getValue();
                    const aocOperationtype = form.getAttribute("ts_aocoperationtype").getValue();
                    if (aocStakeholder != null && aocOperationtype != null) {
                        setAOCSiteFilteredView(form, aocRegion, aocStakeholder[0].id, aocOperationtype[0].id);
                    }
                }
            },
            function error(error) {
                Xrm.Navigation.openAlertDialog({ text: error.message });
            });
    }

    export function populateFlightCategory(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_workorderservicetask.Main.SurveyJS>eContext.getFormContext();
        const originValue = form.getAttribute("ts_origin").getValue();
        const destinationValue = form.getAttribute("ts_destination").getValue();
        var originCountry;
        var distinationCountry;
        if (originValue != null && destinationValue != null) {
            Xrm.WebApi.retrieveRecord("msdyn_functionallocation", originValue[0].id, "?$select=_ts_country_value ").then(
                function success(result1) {
                    originCountry = result1._ts_country_value;
                    Xrm.WebApi.retrieveRecord("msdyn_functionallocation", destinationValue[0].id, "?$select=_ts_country_value ").then(
                        function success(result2) {
                            distinationCountry = result2._ts_country_value;

                            if (distinationCountry == "208ef8a1-8e75-eb11-a812-000d3af3fac7" && originCountry == "208ef8a1-8e75-eb11-a812-000d3af3fac7") { // Canada
                                // Domestic
                                form.getAttribute("ts_flightcategory").setValue(ts_flightcategory.Domestic);
                            }
                            else if ((distinationCountry != "7c01709f-8e75-eb11-a812-000d3af3f6ab" && distinationCountry != "208ef8a1-8e75-eb11-a812-000d3af3fac7")
                                || (originCountry != "7c01709f-8e75-eb11-a812-000d3af3f6ab" && originCountry != "208ef8a1-8e75-eb11-a812-000d3af3fac7")) { //Not in USA or Canada
                                //International
                                form.getAttribute("ts_flightcategory").setValue(ts_flightcategory.International);
                            }
                            else {
                                //Transborder
                                form.getAttribute("ts_flightcategory").setValue(ts_flightcategory.Transborder);
                            }
                        },
                        function error(error) {
                            Xrm.Navigation.openAlertDialog({ text: error.message });
                        });
                },
                function error(error) {
                    Xrm.Navigation.openAlertDialog({ text: error.message });
                });
        }
    }

    function showHideFieldsByIncidentType(form: Form.msdyn_workorderservicetask.Main.SurveyJS,): void {
        const workOrderValue = form.getAttribute("msdyn_workorder").getValue();
        const workOrderId = workOrderValue ? workOrderValue[0].id : "";
        const fieldsMap = [
            ['ts_vlocation', 'ts_location'],
            ['ts_vflightnumber', 'ts_flightnumber'],
            ['ts_vorigin', 'ts_origin'],
            ['ts_vdestination', 'ts_destination'],
            ['ts_vflightcategory', 'ts_flightcategory'],
            ['ts_vflighttype', 'ts_flighttype'],
            ['ts_vreportdetails', 'ts_reportdetails'],
            ['ts_vpaxcheckedin', 'ts_paxonboard'],
            ['ts_vpaxboarded', 'ts_paxboarded'],
            ['ts_vcbcheckedin', 'ts_cbonboard'],
            ['ts_vcbloaded', 'ts_cbloaded'],
            ['ts_vscheduledtime', 'ts_scheduledtime'],
            ['ts_vactualtime', 'ts_actualtime'],
            ['ts_vregistration', 'ts_aircraftmark'],
            ['ts_vmanufacturer', 'ts_aircraftmanufacturer'],
            ['ts_vmodel', 'ts_aircraftmodel'],
            ['ts_vbrandname', 'ts_brandname'],
            ['ts_vaocoperation', 'ts_aocoperation'],
            ['ts_vaocstakeholder', 'ts_aocstakeholder'],
            ['ts_vaocoperationtype', 'ts_aocoperationtype'],
            ['ts_vaocsite', 'ts_aocsite'],
            ['ts_vpassengerservices', 'ts_passengerservices'],
            ['ts_vrampservices', 'ts_rampservices'],
            ['ts_vcargoservices', 'ts_cargoservices'],
            ['ts_vcateringservices', 'ts_cateringservices'],
            ['ts_vgroomingservices', 'ts_groomingservices'],
            ['ts_vsecuritysearchservices', 'ts_securitysearchservices'],
            ['ts_vaccesscontrolsecurityservices', 'ts_accesscontrolsecurityservices'],
            ['ts_vothersecurityservices', 'ts_othersecurityservices']
        ];
        Xrm.WebApi.retrieveRecord("msdyn_workorder", workOrderId, "?$select=_msdyn_primaryincidenttype_value&$expand=msdyn_primaryincidenttype ").then(
            function success(result) {
                fieldsMap.forEach(function (item, index) {
                    let isVisiable = false;
                    if (result["msdyn_primaryincidenttype"][item[0]] == true) {
                        isVisiable = true;
                    }

                    var control = form.getControl(item[1]);
                    if (control != null) {
                        (<any>control).setVisible(isVisiable);
                    }
                });
            },
            function error(error) {
                Xrm.Navigation.openAlertDialog({ text: error.message });
            });
    }

    async function showHideFieldsByOperationType(form: Form.msdyn_workorderservicetask.Main.SurveyJS, operationTypeId, operationTypeOwnerId): Promise<void> {
        const isAvSec = await isOwnedByAvSec(operationTypeOwnerId);
        if (!isAvSec) {
            form.ui.tabs.get('tab_Oversight').sections.get('tab_Oversight_AirCarrier').setVisible(false);
            form.ui.tabs.get('tab_Oversight').sections.get('tab_Oversight_Location').setVisible(false);
            form.ui.tabs.get('tab_Oversight').sections.get('tab_Oversight_ServiceProviders').setVisible(false);
            form.ui.tabs.get('tab_Oversight').sections.get('tab_Oversight_Aircraft').setVisible(false);
            form.ui.tabs.get('tab_Oversight').sections.get('tab_Oversight_Flight').setVisible(false);
            form.ui.tabs.get('tab_Oversight').sections.get('tab_Oversight_Other').setVisible(false);
        }
        else {
            form.ui.tabs.get('tab_Oversight').sections.get('tab_Oversight_AirCarrier').setVisible(true);
            form.ui.tabs.get('tab_Oversight').sections.get('tab_Oversight_Location').setVisible(true);
            form.ui.tabs.get('tab_Oversight').sections.get('tab_Oversight_ServiceProviders').setVisible(true);
            form.ui.tabs.get('tab_Oversight').sections.get('tab_Oversight_Aircraft').setVisible(true);
            form.ui.tabs.get('tab_Oversight').sections.get('tab_Oversight_Flight').setVisible(true);
            form.ui.tabs.get('tab_Oversight').sections.get('tab_Oversight_Other').setVisible(true);
        }
    }

    function setAOCSiteFilteredView(form: Form.msdyn_workorderservicetask.Main.SurveyJS, regionAttributeId: string, stakeholderTypeAttributeId: string, operationTypeAttributeId): void {
        const viewId = '{6E57251F-F695-4076-9498-49AB892154B7}';
        const entityName = "msdyn_functionallocation";
        const viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredSites");
        const fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" returntotalrecordcount="true" page="1" count="25" no-lock="false"><entity name="msdyn_functionallocation"><attribute name="statecode"/><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><filter>' + '</filter><filter><condition attribute="ts_region" operator="eq" value="' + regionAttributeId + '"/></filter><filter><condition attribute="ts_sitestatus" operator="ne" value="717750001" /></filter><order attribute="msdyn_name" descending="false"/><link-entity name="ovs_operation" from="ts_site" to="msdyn_functionallocationid"><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value=" ' + operationTypeAttributeId + '"/><condition attribute="ts_stakeholder" operator="eq" value="' + stakeholderTypeAttributeId + '"/><condition attribute="ts_operationalstatus" operator="eq" value="717750000"/></filter></link-entity></entity></fetch>';
        const layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="200" /></row></grid>';
        form.getControl("ts_aocsite").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
    }


    export function AOCOperationOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_workorderservicetask.Main.SurveyJS>eContext.getFormContext();
        const aocOperation = form.getAttribute("ts_aocoperation").getValue();
        if (aocOperation != null) {
            Xrm.WebApi.retrieveRecord("ovs_operation", aocOperation[0].id, "?$select=_ts_stakeholder_value,_ovs_operationtypeid_value,_ts_site_value ").then(
                function success(result) {
                    var lookup = new Array();
                    lookup[0] = new Object();
                    if (result._ovs_operationtypeid_value != null) {
                        lookup[0].id = result._ovs_operationtypeid_value
                        lookup[0].name = result["_ovs_operationtypeid_value@OData.Community.Display.V1.FormattedValue"]
                        lookup[0].entityType = result["_ovs_operationtypeid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                        form.getAttribute("ts_aocoperationtype").setValue(lookup);
                    }
                    lookup = new Array();
                    lookup[0] = new Object();
                    if (result._ts_stakeholder_value != null) {
                        lookup[0].id = result._ts_stakeholder_value
                        lookup[0].name = result["_ts_stakeholder_value@OData.Community.Display.V1.FormattedValue"]
                        lookup[0].entityType = result["_ts_stakeholder_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                        form.getAttribute("ts_aocstakeholder").setValue(lookup);
                    }
                    lookup = new Array();
                    lookup[0] = new Object();
                    if (result._ts_site_value != null) {
                        lookup[0].id = result._ts_site_value
                        lookup[0].name = result["_ts_site_value@OData.Community.Display.V1.FormattedValue"]
                        lookup[0].entityType = result["_ts_site_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                        form.getAttribute("ts_aocsite").setValue(lookup);
                    }
                },
                function error(error) {
                    Xrm.Navigation.openAlertDialog({ text: error.message });
                });
        }
        else {
            form.getAttribute("ts_aocoperationtype").setValue(null);
            form.getAttribute("ts_aocstakeholder").setValue(null);
            form.getAttribute("ts_aocsite").setValue(null);
        }
    }

    export function onAOCFieldsOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_workorderservicetask.Main.SurveyJS>eContext.getFormContext();
        const aocStakeholder = form.getAttribute("ts_aocstakeholder").getValue();
        const aocOperationtype = form.getAttribute("ts_aocoperationtype").getValue();
        if (aocStakeholder != null && aocOperationtype != null) {
            setAOCSiteFilteredView(form, aocRegion, aocStakeholder[0].id, aocOperationtype[0].id);
        }
    }

    export function aircraftManufacturerOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_workorderservicetask.Main.SurveyJS>eContext.getFormContext();

        const aircraftmanufacturer = form.getAttribute("ts_aircraftmanufacturer").getValue();
        var options = form.getControl("ts_aircraftmodel").getOptions();
        for (var i = 0; i < options.length; i++)
            form.getControl("ts_aircraftmodel").removeOption(options[i].value);
        form.getControl("ts_aircraftmodelother").setVisible(false);
        form.getControl("ts_aircraftmodel").setVisible(true);
        if (aircraftmanufacturer == ts_aircraftmanufacturer.Boeing) {
            for (var i = 1; i <= 11; i++) {
                form.getControl("ts_aircraftmodel").addOption(aircraftModelOptions[i]);
            }
        }
        else if (aircraftmanufacturer == ts_aircraftmanufacturer.Airbus) {
            for (var i = 12; i <= 22; i++) {
                form.getControl("ts_aircraftmodel").addOption(aircraftModelOptions[i]);
            }
        }
        else if (aircraftmanufacturer == ts_aircraftmanufacturer.DeHavilland) {
            for (var i = 23; i <= 24; i++) {
                form.getControl("ts_aircraftmodel").addOption(aircraftModelOptions[i]);
            }
        }
        else if (aircraftmanufacturer == ts_aircraftmanufacturer.Bombardier) {
            for (var i = 25; i <= 25; i++) {
                form.getControl("ts_aircraftmodel").addOption(aircraftModelOptions[i]);
            }
        }
        else if (aircraftmanufacturer == ts_aircraftmanufacturer.Embraer) {
            for (var i = 26; i <= 29; i++) {
                form.getControl("ts_aircraftmodel").addOption(aircraftModelOptions[i]);
            }
        }
        else if (aircraftmanufacturer == ts_aircraftmanufacturer.Other) {
            form.getControl("ts_aircraftmodelother").setVisible(true);
            form.getControl("ts_aircraftmodel").setVisible(false);
        }
    }

    async function filterLegislationSource(eContext: Xrm.ExecutionContext<any, any>) {
        const formContext = <Form.msdyn_workorderservicetask.Main.SurveyJS>eContext.getFormContext();
        const workOrderValue = formContext.getAttribute("msdyn_workorder").getValue();
        const workOrderId = workOrderValue ? workOrderValue[0].id : "";
        Xrm.WebApi.retrieveRecord("msdyn_workorder", workOrderId, "?$select=ovs_operationtypeid&$expand=ovs_operationtypeid($expand=owningbusinessunit($select=businessunitid))").then(async function (workOrder) {
            if (workOrder != null && workOrder.ovs_operationtypeid != null && workOrder.ovs_operationtypeid.owningbusinessunit != null) {
                const buId = workOrder.ovs_operationtypeid.owningbusinessunit.businessunitid;
                const isAvSec = await isAvSecBU(buId);
                if (isAvSec) {
                    //Change Legislation Source filter to use
                    const viewId = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F662}';
                    const entityName = "qm_tylegislationsource";
                    var fetchXml = [
                        "<fetch>",
                        "  <entity name='qm_tylegislationsource'>",
                        "    <link-entity name='ts_tylegislationsource_ovs_operationtype' from='qm_tylegislationsourceid' to='qm_tylegislationsourceid' intersect='true'>",
                        "      <filter>",
                        "        <condition attribute='ovs_operationtypeid' operator='eq' value='", workOrder.ovs_operationtypeid.ovs_operationtypeid, "' uitype='ts_tylegislationsource_ovs_operationtype'/>",
                        "      </filter>",
                        "    </link-entity>",
                        "  </entity>",
                        "</fetch>"
                    ].join("");
                    const layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="qm_tylegislationsourceid"><cell name="qm_name" width="200" /></row></grid>';
                    formContext.getControl("ts_legislationsourcefilter").addCustomView(viewId, entityName, "", fetchXml, layoutXml, true);
                }
            }
        });
    }

    async function workOrderIsDraft(eContext: Xrm.ExecutionContext<any, any>) {
        const form = <Form.msdyn_workorderservicetask.Main.SurveyJS>eContext.getFormContext();
        const workOrderValue = form.getAttribute("msdyn_workorder").getValue();
        const workOrderId = workOrderValue ? workOrderValue[0].id : "";
        const workOrder = await Xrm.WebApi.retrieveRecord("msdyn_workorder", workOrderId, "?$select=ts_state");
        return workOrder.ts_state == ts_planningstate.Draft;
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

            console.log("Online: retrieveWorkOrderOperationData");

            let isOffline = Xrm.Utility.getGlobalContext().client.getClientState() === "Offline";
            if (isOffline) {
                //let operationData = await retrieveWorkOrderOperationData(eContext);        
                win.isComplete = (Form.getAttribute("msdyn_percentcomplete").getValue() == 100.00);
                //win.operationList = operationData.operations;
                win.operationList = [];
                win.activityTypeOperationTypeIdsList = [];

                fetchXMLCallStep3(eContext, win); //sequence: 3,1,4,2
                //win.activityTypeOperationTypeIdsList = operationData.activityTypeOperationTypeIds;
                //const statusReason = Form.getAttribute("statuscode").getValue();
                // if (statusReason == 918640002 && operationData.isInspectionType) {
                //     mode = "display";
                //     setAllFieldsDisabled(eContext);
                // }
            }
            else {
                let operationData = await retrieveWorkOrderOperationData(eContext);
                win.isComplete = (Form.getAttribute("msdyn_percentcomplete").getValue() == 100.00);
                win.operationList = operationData.operations;
                win.activityTypeOperationTypeIdsList = operationData.activityTypeOperationTypeIds;

                const statusReason = Form.getAttribute("statuscode").getValue();
                if (statusReason == 918640002 && operationData.isInspectionType) {
                    mode = "display";
                    setAllFieldsDisabled(eContext);
                }
            }

            win.InitializeSurveyRender(questionnaireDefinition, questionnaireResponse, surveyLocale, mode)
        });
    }
    function fetchXMLCallStep1(eContext, win) {
        var workOrderAttribute = eContext.getFormContext().getAttribute('msdyn_workorder').getValue();
        var workOrderId = workOrderAttribute != null ? workOrderAttribute[0].id : "";
        const statusReason = eContext.getFormContext().getAttribute("statuscode").getValue();

        let operations: Object[] = [];
        console.log("fetchXMLCallStep1  win.activityTypeOperationTypeIdsList length: " + win.activityTypeOperationTypeIdsList.length)

        let isInspectionType: Boolean = false;

        var parentWorkOrderOperationFetchXml = [
            "<fetch top='50'>",
            "  <entity name='msdyn_workorder'>",
            "    <attribute name='ovs_operationid' />",
            "    <attribute name='msdyn_serviceaccount' />",
            "    <attribute name='msdyn_workordertype' />",
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
            "        <attribute name='ovs_operationtypenameenglish' />",
            "        <attribute name='ovs_operationtypenamefrench' />",
            "      </link-entity>",
            "      <link-entity name = 'msdyn_functionallocation' from = 'msdyn_functionallocationid' to = 'ts_site' > ",
            "        <attribute name='ts_functionallocationnamefrench' />",
            "        <attribute name='ts_functionallocationnameenglish' />",
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
        Xrm.WebApi.retrieveMultipleRecords("msdyn_workorder", parentWorkOrderOperationFetchXml).then(
            function success(result) {
                console.log("fetchXMLCallStep1 result: " + result.entities.length)
                if (result.entities.length > 0) {
                    var workOrderOperation = result.entities[0];
                    win.workOrderOperation = workOrderOperation;

                    let stakeholderName = workOrderOperation["account4.name"];
                    let operationTypeName = (lang == 1036) ? workOrderOperation["ovs_operationtype2.ovs_operationtypenamefrench"] : workOrderOperation["ovs_operationtype2.ovs_operationtypenameenglish"];
                    let siteName = (lang == 1036) ? workOrderOperation["msdyn_functionallocation3.ts_functionallocationnamefrench"] : workOrderOperation["msdyn_functionallocation3.ts_functionallocationnameenglish"];
                    if (
                        workOrderOperation["ovs_operation1.ovs_operationid"] != null &&
                        workOrderOperation["account4.name"] != null &&
                        workOrderOperation["ovs_operationtype2.ts_regulated"] != null &&
                        workOrderOperation["ovs_operationtype2.ovs_operationtypeid"] != null &&
                        workOrderOperation["ovs_operationtype2.ts_regulated"] == true &&
                        win.activityTypeOperationTypeIdsList.includes(workOrderOperation["ovs_operationtype2.ovs_operationtypeid"])
                    ) {
                        operations.push({
                            id: workOrderOperation["ovs_operation1.ovs_operationid"],
                            name: stakeholderName + " | " + operationTypeName + " | " + siteName,
                            operationTypeId: workOrderOperation["ovs_operation1.ovs_operationtypeid"],
                            isRegulated: workOrderOperation["ovs_operationtype2.ts_regulated"]
                        });
                    }
                }

                if (workOrderOperation["_msdyn_workordertype_value"] != null) {
                    if (workOrderOperation["_msdyn_workordertype_value"].toUpperCase() == "B1EE680A-7CF7-EA11-A815-000D3AF3A7A7") {
                        isInspectionType = true;
                    }
                }

                if (statusReason == 918640002 && isInspectionType) {
                    mode = "display";
                    setAllFieldsDisabled(eContext);
                }
                win.operationList = operations;
                fetchXMLCallStep4(win);
            },
            function (error) {
                console.log("fetchXMLCallStep1 ERROR: " + error.message);
            }
        );
    }

    function fetchXMLCallStep2(win) {
        let parentWorkOrderRelatedOperationFetchXml = [
            "<fetch top='50'>",
            "  <entity name='ovs_operation'>",
            "    <attribute name='ts_stakeholder' />",
            "    <attribute name='ovs_operationid' />",
            "    <attribute name='ovs_name' />",
            "    <link-entity name='ts_msdyn_workorder_ovs_operation' from='ovs_operationid' to='ovs_operationid' intersect='true'>",
            "      <filter>",
            "        <condition attribute='msdyn_workorderid' operator='eq' value='", win.workOrderId, "'/>",
            "      </filter>",
            "    </link-entity>",
            "    <link-entity name='account' from='accountid' to='ts_stakeholder'>",
            "      <attribute name='name' />",
            "    </link-entity>",
            "    <link-entity name='ovs_operationtype' from='ovs_operationtypeid' to='ovs_operationtypeid'>",
            "      <attribute name='ts_regulated' />",
            "      <attribute name='ovs_operationtypeid' /> ",
            "      <attribute name='ovs_operationtypenameenglish' />",
            "      <attribute name='ovs_operationtypenamefrench' />",
            "    </link-entity>",
            "    <link-entity name='msdyn_functionallocation' from='msdyn_functionallocationid' to='ts_site'>",
            "      <attribute name='ts_functionallocationnamefrench' />",
            "      <attribute name='ts_functionallocationnameenglish' />",
            "    </link-entity>",
            "  </entity>",
            "</fetch>",
        ].join("");
        parentWorkOrderRelatedOperationFetchXml = "?fetchXml=" + encodeURIComponent(parentWorkOrderRelatedOperationFetchXml);
        //Retrieve N:N Operations
        let activityTypeOperationTypeIds: Object[] = [];
        Xrm.WebApi.retrieveMultipleRecords("ovs_operation", parentWorkOrderRelatedOperationFetchXml).then(
            function success(result) {
                console.log("fetchXMLCallStep2 result: " + result.entities.length)
                //Add the operationid, name, operationTypeId, and regulated boolean of the work order's N:N operations to the operations array
                // The Operation must be regulated, and the Operation Type of the Operation must be one of the Work Order's Activity Type's Operation Types
                result.entities.forEach(function (operation) {
                    let stakeholderName = operation["account2.name"];
                    let operationTypeName = (lang == 1036) ? operation["ovs_operationtype3.ovs_operationtypenamefrench"] : operation["ovs_operationtype3.ovs_operationtypenameenglish"];
                    let siteName = (lang == 1036) ? operation["msdyn_functionallocation4.ts_functionallocationnamefrench"] : operation["msdyn_functionallocation4.ts_functionallocationnameenglish"];
                    if (
                        operation.ovs_operationid != null &&
                        operation["account2.name"] != null &&
                        operation["ovs_operationtype3.ts_regulated"] != null &&
                        operation["ovs_operationtype3.ovs_operationtypeid"] != null &&
                        operation["ovs_operationtype3.ts_regulated"] == true &&
                        activityTypeOperationTypeIds.includes(operation["ovs_operationtype3.ovs_operationtypeid"]) &&
                        operation["ovs_operationid"] != win.workOrderOperatingcarrierOperationId
                    ) {
                        win.operationList.push({
                            id: operation["ovs_operationid"],
                            name: stakeholderName + " | " + operationTypeName + " | " + siteName,
                            operationTypeId: operation["ovs_operationtype3.ovs_operationtypeid"],
                            isRegulated: operation["ovs_operationtype3.ts_regulated"]
                        });
                    }
                });
            },
            function (error) {
                console.log("fetchXMLCallStep2 ERROR: " + error.message);
            }
        );

    }

    function fetchXMLCallStep3(eContext, win) {
        var workOrderAttribute = eContext.getFormContext().getAttribute('msdyn_workorder').getValue();
        var workOrderId = workOrderAttribute != null ? workOrderAttribute[0].id : "";
        win.workOrderId = workOrderId;
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
        let activityTypeOperationTypeIds: Object[] = [];
        //Retrieve operationTypes of parent Work Order's ActivityType
        let isOffline = Xrm.Utility.getGlobalContext().client.getClientState() === "Offline";
        if (isOffline) {
            Xrm.WebApi.offline.retrieveMultipleRecords("ovs_operationtype", activityTypeOperationTypesFetchXML).then(
                function success(result) {
                    console.log("fetchXMLCallStep3 OFFLINE result: " + result.entities.length)
                    result.entities.forEach(function (operationType) {
                        activityTypeOperationTypeIds.push(operationType["ovs_operationtypeid"]);
                    });
                    win.activityTypeOperationTypeIdsList = activityTypeOperationTypeIds;
                    fetchXMLCallStep1(eContext, win);
                },
                function (error) {
                    console.log("fetchXMLCallStep3 ERROR: " + error.message);
                }
            );
        }
        else {
            Xrm.WebApi.retrieveMultipleRecords("ovs_operationtype", activityTypeOperationTypesFetchXML).then(
                function success(result) {
                    console.log("fetchXMLCallStep3 result: " + result.entities.length)
                    result.entities.forEach(function (operationType) {
                        activityTypeOperationTypeIds.push(operationType["ovs_operationtypeid"]);
                    });
                    win.activityTypeOperationTypeIdsList = activityTypeOperationTypeIds;
                    fetchXMLCallStep1(eContext, win);
                },
                function (error) {
                    console.log("fetchXMLCallStep3 ERROR: " + error.message);
                }
            );
        }

    }
    function fetchXMLCallStep4(win) {
        var parentWorkOrderOperatingcarrierOperationFetchXml = [
            "<fetch top='50'>",
            "  <entity name='msdyn_workorder'>",
            "    <attribute name='ts_operatingcarrieroperation' />",
            "    <attribute name='ts_operatingcarrier' />",
            "    <attribute name='msdyn_workordertype' />",
            "    <filter>",
            "      <condition attribute='msdyn_workorderid' operator='eq' value='", win.workOrderId, "'/>",
            "    </filter>",
            "    <link-entity name='ovs_operation' from='ovs_operationid' to='ts_operatingcarrieroperation' link-type='inner'>",
            "      <attribute name='ovs_operationtypeid' />",
            "      <attribute name='ovs_operationid' />",
            "      <attribute name='ovs_name' />",
            "      <link-entity name='ovs_operationtype' from='ovs_operationtypeid' to='ovs_operationtypeid'>",
            "        <attribute name='ts_regulated' />",
            "        <attribute name='ovs_operationtypeid' /> ",
            "        <attribute name='ovs_operationtypenameenglish' />",
            "        <attribute name='ovs_operationtypenamefrench' />",
            "      </link-entity>",
            "      <link-entity name = 'msdyn_functionallocation' from = 'msdyn_functionallocationid' to = 'ts_site' > ",
            "        <attribute name='ts_functionallocationnamefrench' />",
            "        <attribute name='ts_functionallocationnameenglish' />",
            "      </link-entity>",
            "    </link-entity>",
            "    <link-entity name='account' from='accountid' to='ts_operatingcarrier'>",
            "      <attribute name='name' />",
            "    </link-entity>",
            "  </entity>",
            "</fetch>",
        ].join("");
        parentWorkOrderOperatingcarrierOperationFetchXml = "?fetchXml=" + encodeURIComponent(parentWorkOrderOperatingcarrierOperationFetchXml);
        Xrm.WebApi.retrieveMultipleRecords("msdyn_workorder", parentWorkOrderOperatingcarrierOperationFetchXml).then(
            function success(result) {
                console.log("fetchXMLCallStep4 result: " + result.entities.length + " - WO- " + win.workOrderId);
                //OperatingcarrierOperation
                let workOrderOperatingcarrierOperationId = "";
                if (result.entities.length > 0) {
                    var workOrderOperatingcarrierOperation = result.entities[0];
                    let stakeholderName = workOrderOperatingcarrierOperation["account4.name"];
                    let operationTypeName = (lang == 1036) ? workOrderOperatingcarrierOperation["ovs_operationtype2.ovs_operationtypenamefrench"] : workOrderOperatingcarrierOperation["ovs_operationtype2.ovs_operationtypenameenglish"];
                    let siteName = (lang == 1036) ? workOrderOperatingcarrierOperation["msdyn_functionallocation3.ts_functionallocationnamefrench"] : workOrderOperatingcarrierOperation["msdyn_functionallocation3.ts_functionallocationnameenglish"];
                    if (
                        workOrderOperatingcarrierOperation["ovs_operation1.ovs_operationid"] != null &&
                        workOrderOperatingcarrierOperation["account4.name"] != null &&
                        workOrderOperatingcarrierOperation["ovs_operationtype2.ts_regulated"] != null &&
                        workOrderOperatingcarrierOperation["ovs_operationtype2.ovs_operationtypeid"] != null &&
                        workOrderOperatingcarrierOperation["ovs_operationtype2.ts_regulated"] == true &&
                        win.activityTypeOperationTypeIdsList.includes(workOrderOperatingcarrierOperation["ovs_operationtype2.ovs_operationtypeid"]) &&
                        win.workOrderOperation["ovs_operation1.ovs_operationid"] != workOrderOperatingcarrierOperation["ovs_operation1.ovs_operationid"]
                    ) {
                        win.workOrderOperatingcarrierOperationId = workOrderOperatingcarrierOperation["ovs_operation1.ovs_operationid"];
                        win.operationList.push({
                            id: workOrderOperatingcarrierOperation["ovs_operation1.ovs_operationid"],
                            name: stakeholderName + " | " + operationTypeName + " | " + siteName,
                            operationTypeId: workOrderOperatingcarrierOperation["ovs_operation1.ovs_operationtypeid"],
                            isRegulated: workOrderOperatingcarrierOperation["ovs_operationtype2.ts_regulated"]
                        });
                    }

                }

                fetchXMLCallStep2(win);
            },
            function (error) {
                console.log("fetchXMLCallStep4 ERROR: " + error.message);
            }
        );

    }

    //Retrieves parent Work Order's Operations and parent Work Order's ActivityType's OperationTypes
    async function retrieveWorkOrderOperationData(eContext) {
        //Get parent work order's id
        var workOrderAttribute = eContext.getFormContext().getAttribute('msdyn_workorder').getValue();
        var workOrderId = workOrderAttribute != null ? workOrderAttribute[0].id : "";
        //Array to be populated with opertations associated with parent work order before initializing the survey
        let operations: Object[] = [];
        let activityTypeOperationTypeIds: Object[] = [];
        let isInspectionType: Boolean = false;

        var parentWorkOrderOperationFetchXml = [
            "<fetch top='50'>",
            "  <entity name='msdyn_workorder'>",
            "    <attribute name='ovs_operationid' />",
            "    <attribute name='msdyn_serviceaccount' />",
            "    <attribute name='msdyn_workordertype' />",
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
            "        <attribute name='ovs_operationtypenameenglish' />",
            "        <attribute name='ovs_operationtypenamefrench' />",
            "      </link-entity>",
            "      <link-entity name = 'msdyn_functionallocation' from = 'msdyn_functionallocationid' to = 'ts_site' > ",
            "        <attribute name='ts_functionallocationnamefrench' />",
            "        <attribute name='ts_functionallocationnameenglish' />",
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
        let parentWorkOrderRelatedOperationFetchXml = [
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
            "      <attribute name='ovs_operationtypenameenglish' />",
            "      <attribute name='ovs_operationtypenamefrench' />",
            "    </link-entity>",
            "    <link-entity name='msdyn_functionallocation' from='msdyn_functionallocationid' to='ts_site'>",
            "      <attribute name='ts_functionallocationnamefrench' />",
            "      <attribute name='ts_functionallocationnameenglish' />",
            "    </link-entity>",
            "  </entity>",
            "</fetch>",
        ].join("");
        parentWorkOrderRelatedOperationFetchXml = "?fetchXml=" + encodeURIComponent(parentWorkOrderRelatedOperationFetchXml);
        //Retrieve N:N Operations
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

        var parentWorkOrderOperatingcarrierOperationFetchXml = [
            "<fetch top='50'>",
            "  <entity name='msdyn_workorder'>",
            "    <attribute name='ts_operatingcarrieroperation' />",
            "    <attribute name='ts_operatingcarrier' />",
            "    <attribute name='msdyn_workordertype' />",
            "    <filter>",
            "      <condition attribute='msdyn_workorderid' operator='eq' value='", workOrderId, "'/>",
            "    </filter>",
            "    <link-entity name='ovs_operation' from='ovs_operationid' to='ts_operatingcarrieroperation' link-type='inner'>",
            "      <attribute name='ovs_operationtypeid' />",
            "      <attribute name='ovs_operationid' />",
            "      <attribute name='ovs_name' />",
            "      <link-entity name='ovs_operationtype' from='ovs_operationtypeid' to='ovs_operationtypeid'>",
            "        <attribute name='ts_regulated' />",
            "        <attribute name='ovs_operationtypeid' /> ",
            "        <attribute name='ovs_operationtypenameenglish' />",
            "        <attribute name='ovs_operationtypenamefrench' />",
            "      </link-entity>",
            "      <link-entity name = 'msdyn_functionallocation' from = 'msdyn_functionallocationid' to = 'ts_site' > ",
            "        <attribute name='ts_functionallocationnamefrench' />",
            "        <attribute name='ts_functionallocationnameenglish' />",
            "      </link-entity>",
            "    </link-entity>",
            "    <link-entity name='account' from='accountid' to='ts_operatingcarrier'>",
            "      <attribute name='name' />",
            "    </link-entity>",
            "  </entity>",
            "</fetch>",
        ].join("");
        parentWorkOrderOperatingcarrierOperationFetchXml = "?fetchXml=" + encodeURIComponent(parentWorkOrderOperatingcarrierOperationFetchXml);
        let operationPromise4 = Xrm.WebApi.retrieveMultipleRecords("msdyn_workorder", parentWorkOrderOperatingcarrierOperationFetchXml);

        await Promise.all([operationPromise1, operationPromise2, activityTypeOperationTypesPromise, operationPromise4]).then((operationRetrievalPromises) => {
            //collect each operationType Id
            operationRetrievalPromises[2].entities.forEach(function (operationType) {
                activityTypeOperationTypeIds.push(operationType["ovs_operationtypeid"]);
            });
            //Add the work order operation operationid, name, operationTypeId, and regulated boolean to the operations array
            var workOrderOperation = operationRetrievalPromises[0].entities[0];
            let stakeholderName = workOrderOperation["account4.name"];
            let operationTypeName = (lang == 1036) ? workOrderOperation["ovs_operationtype2.ovs_operationtypenamefrench"] : workOrderOperation["ovs_operationtype2.ovs_operationtypenameenglish"];
            let siteName = (lang == 1036) ? workOrderOperation["msdyn_functionallocation3.ts_functionallocationnamefrench"] : workOrderOperation["msdyn_functionallocation3.ts_functionallocationnameenglish"];
            if (
                workOrderOperation["ovs_operation1.ovs_operationid"] != null &&
                workOrderOperation["account4.name"] != null &&
                workOrderOperation["ovs_operationtype2.ts_regulated"] != null &&
                workOrderOperation["ovs_operationtype2.ovs_operationtypeid"] != null &&
                workOrderOperation["ovs_operationtype2.ts_regulated"] == true &&
                activityTypeOperationTypeIds.includes(workOrderOperation["ovs_operationtype2.ovs_operationtypeid"])
            ) {
                operations.push({
                    id: workOrderOperation["ovs_operation1.ovs_operationid"],
                    name: stakeholderName + " | " + operationTypeName + " | " + siteName,
                    operationTypeId: workOrderOperation["ovs_operation1.ovs_operationtypeid"],
                    isRegulated: workOrderOperation["ovs_operationtype2.ts_regulated"]
                });
            }
            if (workOrderOperation["_msdyn_workordertype_value"] != null) {
                if (workOrderOperation["_msdyn_workordertype_value"].toUpperCase() == "B1EE680A-7CF7-EA11-A815-000D3AF3A7A7") {
                    isInspectionType = true;
                }
            }
            if (
                workOrderOperation["ovs_operation1.ovs_operationid"] != null &&
                workOrderOperation["account4.name"] != null &&
                workOrderOperation["ovs_operationtype2.ts_regulated"] != null &&
                workOrderOperation["ovs_operationtype2.ovs_operationtypeid"] != null &&
                workOrderOperation["ovs_operationtype2.ts_regulated"] == true &&
                workOrderOperation["ovs_operationtype2.ovs_operationtypeid"] == 'abf259f6-eff0-ed11-8848-000d3af4f330'
            ) {
                operations.push({
                    id: workOrderOperation["ovs_operation1.ovs_operationid"],
                    name: stakeholderName + " | " + operationTypeName + " | " + siteName,
                    operationTypeId: workOrderOperation["ovs_operation1.ovs_operationtypeid"],
                    isRegulated: workOrderOperation["ovs_operationtype2.ts_regulated"]
                });
            }
            //OperatingcarrierOperation
            var workOrderOperatingcarrierOperationId = "";
            if (operationRetrievalPromises[3].entities.length > 0) {
                var workOrderOperatingcarrierOperation = operationRetrievalPromises[3].entities[0];
                stakeholderName = workOrderOperatingcarrierOperation["account4.name"];
                operationTypeName = (lang == 1036) ? workOrderOperatingcarrierOperation["ovs_operationtype2.ovs_operationtypenamefrench"] : workOrderOperatingcarrierOperation["ovs_operationtype2.ovs_operationtypenameenglish"];
                siteName = (lang == 1036) ? workOrderOperatingcarrierOperation["msdyn_functionallocation3.ts_functionallocationnamefrench"] : workOrderOperatingcarrierOperation["msdyn_functionallocation3.ts_functionallocationnameenglish"];
                if (
                    workOrderOperatingcarrierOperation["ovs_operation1.ovs_operationid"] != null &&
                    workOrderOperatingcarrierOperation["account4.name"] != null &&
                    workOrderOperatingcarrierOperation["ovs_operationtype2.ts_regulated"] != null &&
                    workOrderOperatingcarrierOperation["ovs_operationtype2.ovs_operationtypeid"] != null &&
                    workOrderOperatingcarrierOperation["ovs_operationtype2.ts_regulated"] == true &&
                    activityTypeOperationTypeIds.includes(workOrderOperatingcarrierOperation["ovs_operationtype2.ovs_operationtypeid"]) &&
                    workOrderOperation["ovs_operation1.ovs_operationid"] != workOrderOperatingcarrierOperation["ovs_operation1.ovs_operationid"]
                ) {
                    workOrderOperatingcarrierOperationId = workOrderOperatingcarrierOperation["ovs_operation1.ovs_operationid"];
                    operations.push({
                        id: workOrderOperatingcarrierOperation["ovs_operation1.ovs_operationid"],
                        name: stakeholderName + " | " + operationTypeName + " | " + siteName,
                        operationTypeId: workOrderOperatingcarrierOperation["ovs_operation1.ovs_operationtypeid"],
                        isRegulated: workOrderOperatingcarrierOperation["ovs_operationtype2.ts_regulated"]
                    });
                }

            }
            //Add the operationid, name, operationTypeId, and regulated boolean of the work order's N:N operations to the operations array
            // The Operation must be regulated, and the Operation Type of the Operation must be one of the Work Order's Activity Type's Operation Types
            operationRetrievalPromises[1].entities.forEach(function (operation) {
                let stakeholderName = operation["account2.name"];
                let operationTypeName = (lang == 1036) ? operation["ovs_operationtype3.ovs_operationtypenamefrench"] : operation["ovs_operationtype3.ovs_operationtypenameenglish"];
                let siteName = (lang == 1036) ? operation["msdyn_functionallocation4.ts_functionallocationnamefrench"] : operation["msdyn_functionallocation4.ts_functionallocationnameenglish"];
                if (
                    operation.ovs_operationid != null &&
                    operation["account2.name"] != null &&
                    operation["ovs_operationtype3.ts_regulated"] != null &&
                    operation["ovs_operationtype3.ovs_operationtypeid"] != null &&
                    operation["ovs_operationtype3.ts_regulated"] == true &&
                    activityTypeOperationTypeIds.includes(operation["ovs_operationtype3.ovs_operationtypeid"]) &&
                    operation["ovs_operationid"] != workOrderOperatingcarrierOperationId
                ) {
                    operations.push({
                        id: operation["ovs_operationid"],
                        name: stakeholderName + " | " + operationTypeName + " | " + siteName,
                        operationTypeId: operation["ovs_operationtype3.ovs_operationtypeid"],
                        isRegulated: operation["ovs_operationtype3.ts_regulated"]
                    });
                }
            });
        });

        //Return object containing retrieved operation data
        return {
            operations: operations,
            activityTypeOperationTypeIds: activityTypeOperationTypeIds,
            isInspectionType: isInspectionType
        };
    }

    async function checkAccessControl(eContext: Xrm.ExecutionContext<any, any>) {
        const form = <Form.msdyn_workorderservicetask.Main.SurveyJS>eContext.getFormContext();
        const accesscontrol = form.getAttribute("ts_accesscontrol").getValue();
        const workOrderValue = form.getAttribute("msdyn_workorder").getValue();
        const workOrderId = workOrderValue ? workOrderValue[0].id : "";
        const userId = Xrm.Utility.getGlobalContext().userSettings.userId.replace(/[{}]/g, "");

        if (!userHasRole("System Administrator")) {
            if (accesscontrol == 1) {
                let accessUserFetchXml = [
                    "<fetch>",
                    "  <entity name='ts_msdyn_workorderservicetask_systemuser'>",
                    "    <filter type='and'>",
                    "      <condition attribute='msdyn_workorderservicetaskid' operator='eq' value='", eContext.getFormContext().data.entity.getId(), "'/>",
                    "      <condition attribute='systemuserid' operator='eq' value='", Xrm.Utility.getGlobalContext().userSettings.userId, "'/>",
                    "    </filter>",
                    "  </entity>",
                    "</fetch>"
                ].join("");
                accessUserFetchXml = "?fetchXml=" + encodeURIComponent(accessUserFetchXml);
                Xrm.WebApi.retrieveMultipleRecords("ts_msdyn_workorderservicetask_systemuser", accessUserFetchXml).then(
                    function (result) {
                        if (result.entities != null && result.entities.length == 0) {
                            if (workOrderId != "") {
                                Xrm.WebApi.retrieveRecord("msdyn_workorder", workOrderId, "?$select=_ownerid_value ").then(
                                    function success(result) {
                                        if (result._ownerid_value != userId.toLowerCase()) {
                                            form.ui.tabs.get("tab_questionnaire").setVisible(false);
                                        }
                                    });
                            }
                            else {
                                form.ui.tabs.get("tab_questionnaire").setVisible(false);
                            }
                        }
                    });
            }
        }
    }

    export async function SubGridFilterExecution(eContext: Xrm.ExecutionContext<any, any>): Promise<any> {
        const formContext = <Form.msdyn_workorderservicetask.Main.Information>eContext.getFormContext();

        let gridControl: any = formContext.getControl("Subgrid_OperationRiskAssessments");

        const workOrder = formContext.getAttribute("msdyn_workorder").getValue();
        let workOrderId;
        if (workOrder != null) {
            workOrderId = workOrder[0].id;
        }

        const operationId = await Xrm.WebApi.retrieveRecord("msdyn_workorder", workOrderId, "?$select=_ovs_operationid_value").then(
            function success(result) {
                return result._ovs_operationid_value
            }
        );

        if (operationId == null) return;

        if (gridControl === null) {
            setTimeout(function () { ROM.WorkOrderServiceTask.SubGridFilterExecution(eContext); }, 1000);
            return;
        }
        else {
            var fetchXml = [
                "<fetch>",
                "  <entity name='ts_operationriskassessment'>",
                "    <filter>",
                "      <condition attribute='ts_operation' operator='eq' value='", operationId, "'/>",
                "    </filter>",
                "  </entity>",
                "</fetch>"
            ].join("");

            gridControl.setFilterXml(fetchXml);
            gridControl.refresh();
        }
    }
}

function userHasRole(rolesName) {
    var userRoles = Xrm.Utility.getGlobalContext().userSettings.roles;
    var hasRole = false;
    var roles = rolesName.split("|");
    roles.forEach(function (roleItem) {
        userRoles.forEach(function (userRoleItem) {
            if (userRoleItem.name.toLowerCase() == roleItem.toLowerCase()) hasRole = true;
        });
    });
    return hasRole;
}

function CompleteQuestionnaire(wrCtrl) {
    // Get the web resource inner content window
    wrCtrl.getContentWindow().then(function (win) {
        const userInput = win.DoComplete();
    });
}

function setAllFieldsDisabled(eContext) {
    const formContext = eContext.getFormContext();

    formContext.ui.controls.forEach(function (control, i) {
        if (control && control.getDisabled && !control.getDisabled()) {
            control.setDisabled!(true);
        }
    });
}


