namespace ROM.CanceledInspectionJustification {

    // EVENTS
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_canceledinspectionjustification.Main.Information>eContext.getFormContext();

        const warningMessage = Xrm.Utility.getResourceString("ts_/resx/CanceledInspectionJustification", "WarningMessageText");
      
        form.ui.setFormNotification(warningMessage, "WARNING", "WarningMessage");
        //If Create new
        if (form.ui.getFormType()==1)
               form.getAttribute("ownerid").setValue(null);

    }

    export function onOwnerChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_canceledinspectionjustification.Main.Information>eContext.getFormContext();
        showFieldWarningMessageIfOwnerIsNotISSONorAvSec(form, "ownerid");
    }
}

declare function showFieldWarningMessageIfOwnerIsNotISSONorAvSec(formContext: any, ownerControlToShowNotification: string): void;
