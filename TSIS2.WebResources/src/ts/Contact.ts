export default class Contact {
    public static onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.contact.Main.Information>eContext.getFormContext();
        form.getAttribute("firstname").setValue("Bob");
    }
}