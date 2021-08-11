namespace ROM.CustomerAsset {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_customerasset.Main.CustomerAsset>eContext.getFormContext();

        if(form.ui.getFormType() == 1 || form.ui.getFormType() == 2){
            Xrm.Utility.getGlobalContext().userSettings.languageId == 1033 ? form.getControl("ts_customerassetfrench").setVisible(true) : form.getControl("ts_customerassetenglish").setVisible(true);
        }
        else{
            Xrm.Utility.getGlobalContext().userSettings.languageId == 1033 ? form.getControl("ts_customerassetfrench").setVisible(false) : form.getControl("ts_customerassetenglish").setVisible(false);
        }
    }

    export function nameOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_customerasset.Main.CustomerAsset>eContext.getFormContext();

        const nameAttribute = form.getAttribute("msdyn_name");
        const nameFrenchAttribute = form.getAttribute("ts_customerassetfrench");
        const nameEnglishAttribute = form.getAttribute("ts_customerassetenglish");


        if(nameAttribute != null){
            const nameAttributeValue = nameAttribute.getValue();
            if(nameAttributeValue != null && nameAttributeValue != undefined){
                Xrm.Utility.getGlobalContext().userSettings.languageId == 1033 ? nameEnglishAttribute.setValue(nameAttributeValue) : nameFrenchAttribute.setValue(nameAttributeValue);
            }
        }
    }
}