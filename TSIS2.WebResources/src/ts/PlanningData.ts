namespace ROM.PlanningData {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_planningdata.Main.Information>eContext.getFormContext();
        if (formContext.ui.getFormType() == 2) { //Update type. The form has already been saved for the first time
            formContext.getControl("ts_fiscalyear").setDisabled(true);
            formContext.getControl("ts_name").setDisabled(true);
            formContext.getControl("ts_teamplanningdata").setDisabled(true);
            if (formContext.getAttribute("ts_dueq1").getValue != null) {
                formContext.getControl("ts_dueq1").setDisabled(true);
            }
            if (formContext.getAttribute("ts_dueq2").getValue != null) {
                formContext.getControl("ts_dueq2").setDisabled(true);
            }
            if (formContext.getAttribute("ts_dueq3").getValue != null) {
                formContext.getControl("ts_dueq3").setDisabled(true);
            }
            if (formContext.getAttribute("ts_dueq4").getValue != null) {
                formContext.getControl("ts_dueq4").setDisabled(true);
            }
            if (formContext.getAttribute("ts_operationactivity").getValue() != null) {
                formContext.getControl("ts_operationactivity").setDisabled(true);
            }
            if (formContext.getAttribute("ts_target").getValue() != null) {
                formContext.getControl("ts_target").setDisabled(true);
            }
        }
        if (formContext.getAttribute("ts_generationlog").getValue() == null) {
            formContext.getControl("ts_generationlog").setVisible(false);
        }
    }

    export function plannedOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        setNullQuarterValueToZero(eContext)
    }

    function setNullQuarterValueToZero(eContext: Xrm.ExecutionContext<any, any>): void {
        let nameAttr = eContext.getEventSource();
        if(nameAttr.getName() == "ts_plannedq1" || nameAttr.getName() == "ts_plannedq2" || nameAttr.getName() == "ts_plannedq3" || nameAttr.getName() == "ts_plannedq4"){
            if(nameAttr.getValue() == null){
                nameAttr.setValue(0);
            }
        }
    }
}