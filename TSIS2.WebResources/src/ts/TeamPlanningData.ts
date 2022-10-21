namespace ROM.TeamPlanningData {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_teamplanningdata.Main.Information>eContext.getFormContext();
        if (formContext.ui.getFormType() == 2) { //Update type. The form has already been saved for the first time
            formContext.getControl("ts_team").setDisabled(true);
            formContext.getControl("ts_fiscalyear").setDisabled(true);
        }
    }
}