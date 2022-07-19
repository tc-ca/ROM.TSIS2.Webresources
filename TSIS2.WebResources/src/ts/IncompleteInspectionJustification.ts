namespace ROM.IncompleteInspectionJustification {

    // EVENTS
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_incompleteworkorderreason.Main.Information>eContext.getFormContext();

        const warningMessage = Xrm.Utility.getResourceString("ovs_/resx/IncompleteInspectionJustification", "WarningMessageText");

        form.ui.setFormNotification(warningMessage, "WARNING", "WarningMessage");
    }

    export function onSave(eContext: Xrm.ExecutionContext<any, any>): void {
    }
}