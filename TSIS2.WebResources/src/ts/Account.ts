export namespace ROM.Account {

    export function onLoad(executionContext: Xrm.ExecutionContext<Form.account.Main.ROMInformation, any>) {
        const formContext = executionContext.getFormContext() as Form.account.Main.ROMInformation;

        const addressControl = formContext.getControl("address1_composite_compositionLinkControl_address1_country");

        if(addressControl != null && addressControl != undefined){
           addressControl.setVisible(false);
        }
    }

    export function countryOnChange(executionContext: Xrm.ExecutionContext<Form.account.Main.ROMInformation, any>) {
        const formContext = <Form.account.Main.ROMInformation>executionContext.getFormContext();
        const countryAttr = formContext.getAttribute("ts_country").getValue();

        if(countryAttr != null && countryAttr != undefined){
            var countryName = countryAttr[0].name;
            var address1Country = formContext.getAttribute("address1_country");

            if(address1Country != null && address1Country != undefined){
                address1Country.setValue(countryName)
            }
        }
    }
}