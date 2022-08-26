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
        const ownerValue = form.getAttribute("ownerid").getValue();
        const warningMessage = Xrm.Utility.getResourceString("ts_/resx/CanceledInspectionJustification", "WarningMessageText");
 
        let ownerName;
        if (ownerValue != null) {
            ownerName = ownerValue[0].name;
            if (!ownerName.startsWith("Aviation") && !ownerName.startsWith("Intermodal")) {
                form.getControl("ownerid").setNotification(warningMessage, "error");
            }
            else {
                form.getControl("ownerid").clearNotification("error");
            }
        }
    }
}

