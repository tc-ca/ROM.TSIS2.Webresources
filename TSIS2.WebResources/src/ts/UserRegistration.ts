namespace ROM.UserRegistration {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_userregistration.Main.Information>eContext.getFormContext();
        console.log("Entering onLoad");
    }

    export function onSave(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_userregistration.Main.Information>eContext.getFormContext();
        console.log("Entering onSave");
    }

    export function OnChangeAADUser(eContext: Xrm.ExecutionContext<any, any>): void {
        console.log("Entering OnChangeAADUser");
        const formContext = <Form.ts_userregistration.Main.Information>eContext.getFormContext();
        const aaduserid = formContext.getAttribute("ts_aaduser")?.getValue();

        if (!aaduserid || aaduserid.length === 0) return;

        Xrm.WebApi.retrieveRecord("aaduser", aaduserid[0].id, "?$select=userprincipalname,surname,givenname")
            .then((result: any) => {
                console.log("Retrieved values: Name: " + result.userprincipalname);
                formContext.getAttribute("ts_name")?.setValue(result.userprincipalname);
                formContext.getAttribute("ts_firstname")?.setValue(result.givenname);
                formContext.getAttribute("ts_lastname")?.setValue(result.surname);
            })
            .catch((error: any) => {
                console.error(error.message);
            });
    }
}