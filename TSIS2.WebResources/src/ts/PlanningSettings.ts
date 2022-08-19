namespace ROM.PlanningSettings {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_planningsettings.Main.Information>eContext.getFormContext();
        if (form.ui.getFormType() == 2) {
            taskOnChange(eContext);
        }
    }

    export function taskOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_planningsettings.Main.Information>eContext.getFormContext();
        var taskCode = form.getAttribute("ts_task").getValue();
        if (taskCode == 717750000) {
            form.getAttribute("ts_stakeholder").setRequiredLevel("required");
            form.getAttribute("ts_totalcount").setRequiredLevel("required");
        }
        else {
            form.getAttribute("ts_stakeholder").setRequiredLevel("none");
            form.getAttribute("ts_totalcount").setRequiredLevel("none");
        }
    }
}