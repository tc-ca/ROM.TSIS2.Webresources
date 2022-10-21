namespace ROM.PlanningData {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_planningdata.Main.Information>eContext.getFormContext();
        if (formContext.ui.getFormType() == 2) { //Update type. The form has already been saved for the first time
            formContext.getControl("ts_fiscalyear").setDisabled(true);
            formContext.getControl("ts_name").setDisabled(true);
            formContext.getControl("ts_operationactivity").setDisabled(true);
            formContext.getControl("ts_teamplanningdata").setDisabled(true);
            formContext.getControl("ts_target").setDisabled(true);
        }
    }
}