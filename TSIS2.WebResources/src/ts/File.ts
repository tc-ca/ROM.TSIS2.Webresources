namespace ROM.File {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_file.Main.Information>eContext.getFormContext();

        //Hide the Attachment column if the SharePoint link is already populated.
        const sharePointLink = form.getAttribute("ts_sharepointlink").getValue();
        if (sharePointLink == null) {
            const attachmentControl = form.getControl("ts_attachment");
            if (attachmentControl != null && attachmentControl != undefined) {
                attachmentControl.setVisible(true);
            }
        }

    }
}