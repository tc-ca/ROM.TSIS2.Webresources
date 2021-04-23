namespace ROM.Account {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.account.Main.ROMInformation>eContext.getFormContext();

        const addressControl = form.getControl("address1_composite_compositionLinkControl_address1_country");

        if(addressControl != null && addressControl != undefined){
           addressControl.setVisible(false);
        }
    }
    export function countryOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.account.Main.ROMInformation>eContext.getFormContext();
        const countryAttr = form.getAttribute("ts_country").getValue();

        if(countryAttr != null && countryAttr != undefined){
            var countryName = countryAttr[0].name;
            var address1Country = form.getAttribute("address1_country");

            if(address1Country != null && address1Country != undefined){
                address1Country.setValue(countryName)
            }
        }
    }
}