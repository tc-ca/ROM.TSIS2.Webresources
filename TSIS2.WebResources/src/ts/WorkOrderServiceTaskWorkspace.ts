namespace ROM.WorkOrderServiceTaskWorkspace {
    const lang = Xrm.Utility.getGlobalContext().userSettings.languageId;
    const enterStartDateToProceedText = lang === 1036 ? "Entrez une date de début pour continuer" : "Enter a start date to proceed";
    const enterTaskTypeToProceedText = lang === 1036 ? "Entrez un type de tâche pour continuer" : "Enter a task type to proceed";
    const noQuestionnaireText = lang === 1036 ? "Il n'y a pas de questionnaire disponible pour cette date." : "There is no questionnaire available for this date.";

    export async function onLoad(eContext: Xrm.ExecutionContext<any, any>) {
        const Form = <Form.ts_workorderservicetaskworkspace.Main.Information>eContext.getFormContext();

        const workOrderStartDateCtl = Form.getControl("ts_workorderservicetaskstartdate");
        const workOrderStartDateValue = Form.getAttribute("ts_workorderservicetaskstartdate").getValue();

        // Also, add a message that work order service task start date should be filled in to proceed.
        if (workOrderStartDateValue == null) {
            workOrderStartDateCtl.setNotification(enterStartDateToProceedText, "ts_workorderservicetaskstartdate_entertoproceed");
        }
        //If work order service task already has a start date, disable the control.
        else {
            workOrderStartDateCtl.setDisabled(true);
        }
    }
    /**
     * This function is triggered when the Work Order Service Task is changed.
     * It checks if the related task type has a custom questionnaire or if a valid questionnaire version exists for the selected date.
     * @param eContext - The execution context of the form.
     */
    export async function workOrderServiceTaskStartDateOnChange(eContext: Xrm.ExecutionContext<any, any>): Promise<void> {
        const formContext = <Form.ts_workorderservicetaskworkspace.Main.Information>eContext.getFormContext();
        const serviceTaskStartDate = formContext.getAttribute("ts_workorderservicetaskstartdate")?.getValue();
        const workOrderTaskLookup = formContext.getAttribute("ts_workorderservicetask")?.getValue();
        const startDateCtl = formContext.getControl("ts_workorderservicetaskstartdate");

        startDateCtl.clearNotification("ts_workorderservicetaskstartdate_entertoproceed");

        if (!workOrderTaskLookup) {
            console.warn("No related Work Order Service Task found.");
            return;
        }

        const workOrderTaskId = workOrderTaskLookup[0].id.replace(/{|}/g, "");

        try {
            // Retrieve the related msdyn_workorderservicetask to get msdyn_tasktype
            const wost = await Xrm.WebApi.retrieveRecord(
                "msdyn_workorderservicetask",
                workOrderTaskId,
                "?$select=msdyn_workorderservicetaskid&$expand=msdyn_tasktype($select=msdyn_servicetasktypeid)"
            );
            console.log("Retrieved Work Order Service Task:", wost);


            if (!wost.msdyn_tasktype) {
                startDateCtl.setNotification(enterTaskTypeToProceedText, "ts_tasktype_entertoproceed");
                return;
            }

            const taskTypeId = wost.msdyn_tasktype?.msdyn_servicetasktypeid;
            console.log("msdyn_tasktype:", taskTypeId);
            // Retrieve msdyn_servicetasktype to get ts_hascustomquestionnaire, ovs_questionnaireenabled, and related questionnaire
            const taskType = await Xrm.WebApi.retrieveRecord(
                "msdyn_servicetasktype",
                taskTypeId,
                "?$select=ts_hascustomquestionnaire,ovs_questionnaireenabled&$expand=ovs_Questionnaire($select=ovs_questionnaireid)"
            );

            if (taskType.ts_hascustomquestionnaire) {
                // Allow immediately if using a custom questionnaire
                console.info("Custom questionnaire in use; date accepted without further validation.");
                return;
            }

            if (!taskType.ovs_questionnaireenabled) {
                startDateCtl.setNotification(noQuestionnaireText, "ts_workorderservicetaskstartdate_entertoproceed");
                return;
            }

            if (!serviceTaskStartDate) {
                startDateCtl.setNotification(enterStartDateToProceedText, "ts_workorderservicetaskstartdate_entertoproceed");
                return;
            }

            const questionnaireId = taskType.ovs_Questionnaire?.ovs_questionnaireid;
            if (!questionnaireId) {
                startDateCtl.setNotification(noQuestionnaireText, "ts_workorderservicetaskstartdate_entertoproceed");
                return;
            }

            const dateString = serviceTaskStartDate.toISOString().slice(0, 10);

            // Retrieve questionnaire versions valid on the selected date
            const fetchXml = `
                <fetch top='1'>
                  <entity name='ts_questionnaireversion'>
                    <attribute name='ts_questionnairedefinition' />
                    <attribute name='ts_name' />
                    <attribute name='ts_effectivestartdate' />
                    <attribute name='ts_effectiveenddate' />
                    <filter type='and'>
                      <condition attribute='ts_effectivestartdate' operator='on-or-before' value='${dateString}' />
                      <filter type='or'>
                        <condition attribute='ts_effectiveenddate' operator='on-or-after' value='${dateString}' />
                        <condition attribute='ts_effectiveenddate' operator='null' />
                      </filter>
                      <condition attribute='ts_ovs_questionnaire' operator='eq' value='${questionnaireId}' />
                    </filter>
                  </entity>
                </fetch>`;

            const result = await Xrm.WebApi.retrieveMultipleRecords("ts_questionnaireversion", "?fetchXml=" + encodeURIComponent(fetchXml));

            if (result.entities.length === 0) {
                startDateCtl.setNotification(noQuestionnaireText, "ts_workorderservicetaskstartdate_entertoproceed");
                return;
            }

            // Valid questionnaire version found; no further action needed
            console.info("Valid questionnaire version found for the selected date.");
            return;

        } catch (error) {
            console.error(error);
            Xrm.Navigation.openAlertDialog({ text: `Error: ${error.message}` });
        }
    }
}