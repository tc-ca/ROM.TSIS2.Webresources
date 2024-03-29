namespace ROM.CustomerAssetQuickCreate {

    var generatedName;
    var currentOperationCategory;
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_customerasset.QuickCreate.CustomerAssetQuickCreate>eContext.getFormContext();
        const assetCategoryAttribute = form.getAttribute("msdyn_customerassetcategory");
        const assetCategoryAttributeValue = form.getAttribute("msdyn_customerassetcategory").getValue();


        const accountAttribute = form.getAttribute("msdyn_account");
        const customerAssetCategoryAttribute = form.getAttribute("msdyn_customerassetcategory");

        const accountAttributeValue = form.getAttribute("msdyn_account").getValue();
        const customerAssetCategoryAttributeValue = form.getAttribute("msdyn_customerassetcategory").getValue();
        //@ts-ignore
        const functionalLocationAttributeValue = Xrm.Utility.getPageContext().input.data.msdyn_functionallocation;
        generatedName = [];
        generatedName['functionalLocation'] = functionalLocationAttributeValue != null ? functionalLocationAttributeValue  : "" ;

        if(accountAttribute != null && customerAssetCategoryAttribute != null){
            if(accountAttributeValue != null && customerAssetCategoryAttributeValue != null){
                generatedName['category'] = customerAssetCategoryAttributeValue != null ? customerAssetCategoryAttributeValue[0].name : "" ;
                generatedName['account'] = accountAttributeValue != null ? accountAttributeValue[0].name  : "" ;
            }
        }

        if (assetCategoryAttribute != null && assetCategoryAttribute != undefined && assetCategoryAttributeValue != null){
            Xrm.WebApi.retrieveRecord("msdyn_customerassetcategory", assetCategoryAttributeValue[0].id.replace(/[{}]/g, ""), "?$select=ts_assetcategorytype").then(
                function success(result) {
                    //717750000 = Operations
                    //717750001 = Physical
                    currentOperationCategory = result.ts_assetcategorytype;
                },
                function (error) {
                }
            );
        }
    }

    export function onSave(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_customerasset.Main.CustomerAsset>eContext.getFormContext();
        
        if(form.ui.getFormType() == 1){
            if(currentOperationCategory == 717750000){
                const nameAttribute = form.getAttribute("msdyn_name");
                const nameAttributeEnglish = form.getAttribute("ts_customerassetenglish");
                const nameAttributeFrench = form.getAttribute("ts_customerassetfrench");

                const accountAttribute = form.getAttribute("msdyn_account");
                const customerAssetCategoryAttribute = form.getAttribute("msdyn_customerassetcategory");
                //@ts-ignore
                const functionalLocationAttributeValue = Xrm.Utility.getPageContext().input.data.msdyn_functionallocation;

                if(accountAttribute != null && customerAssetCategoryAttribute != null){

                    const accountAttributeValue = accountAttribute.getValue();
                    const customerAssetCategoryAttributeValue = customerAssetCategoryAttribute.getValue();

                    if(accountAttributeValue != null && accountAttributeValue != undefined &&
                        customerAssetCategoryAttributeValue != null && customerAssetCategoryAttributeValue != undefined){

                        var generatedAlternateLangName = "";

                        const lang = Xrm.Utility.getGlobalContext().userSettings.languageId == 1033 ? "english" : "french";
                    
                        //Query the alternate language name for the three different entities and generate the final name to be used 
                        Xrm.WebApi.retrieveRecord("account", accountAttributeValue[0].id.replace(/[{}]/g, ""), "?$select=name, ovs_accountnamefrench, ovs_accountnameenglish")
                        .then(
                            function success(result) {

                                if(lang == "english"){
                                    result.ovs_accountnamefrench != null ? generatedAlternateLangName += result.ovs_accountnamefrench + " / " : generatedAlternateLangName += result.name + " / ";
                                }
                                else{
                                    result.ovs_accountnameenglish != null ? generatedAlternateLangName += result.ovs_accountnameenglish + " / " : generatedAlternateLangName += result.name + " / ";
                                }

                                Xrm.WebApi.retrieveRecord("msdyn_customerassetcategory", customerAssetCategoryAttributeValue[0].id.replace(/[{}]/g, ""), "?$select=msdyn_name, ts_assetcategorynamefrench, ts_assetcategorynameenglish").then(
                                    function success(result) {

                                        if(lang == "english"){
                                            result.ts_assetcategorynamefrench != null ? generatedAlternateLangName += result.ts_assetcategorynamefrench + "/ " : generatedAlternateLangName += result.msdyn_name + "/ ";
                                        }
                                        else{
                                            result.ts_assetcategorynameenglish != null ? generatedAlternateLangName += result.ts_assetcategorynameenglish + "/ " : generatedAlternateLangName += result.msdyn_name + "/ ";
                                        }

                                        Xrm.WebApi.retrieveRecord("msdyn_functionallocation", functionalLocationAttributeValue.id.replace(/[{}]/g, ""), "?$select=msdyn_name, ts_functionallocationnamefrench, ts_functionallocationnameenglish").then(
                                            function success(result) {

                                                if(lang == "english"){
                                                    result.ts_functionallocationnamefrench != null ? generatedAlternateLangName += result.ts_functionallocationnamefrench : generatedAlternateLangName += result.msdyn_name;
                                                }
                                                else{
                                                    result.ts_functionallocationnameenglish != null ? generatedAlternateLangName += result.ts_functionallocationnameenglish : generatedAlternateLangName += result.msdyn_name;
                                                }

                                                if(lang == "english"){
                                                    nameAttributeEnglish.setValue(`${accountAttributeValue[0].name} / ${customerAssetCategoryAttributeValue[0].name} / ${functionalLocationAttributeValue.name}`);
                                                    nameAttributeFrench.setValue(generatedAlternateLangName);
                                                    nameAttribute.setValue(`${accountAttributeValue[0].name} / ${customerAssetCategoryAttributeValue[0].name} / ${functionalLocationAttributeValue.name}`);
                                                }
                                                else{
                                                    nameAttributeFrench.setValue(`${accountAttributeValue[0].name} / ${customerAssetCategoryAttributeValue[0].name} / ${functionalLocationAttributeValue.name}`);
                                                    nameAttributeEnglish.setValue(generatedAlternateLangName);
                                                    nameAttribute.setValue(`${accountAttributeValue[0].name} / ${customerAssetCategoryAttributeValue[0].name} / ${functionalLocationAttributeValue.name}`);
                                                }
                                                form.data.entity.save();
                                            },
                                        );
                                    },
                                );
                            },
                        );    
                    }
                }
            }
        }
    }

    export function categoryOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_customerasset.Main.CustomerAsset>eContext.getFormContext();

        const assetCategoryAttribute = form.getAttribute("msdyn_customerassetcategory");
        const nameAttribute = form.getAttribute("msdyn_name");
        if(assetCategoryAttribute != null){
            const assetCategoryAttributeValue = assetCategoryAttribute.getValue();
            if(assetCategoryAttributeValue != null && assetCategoryAttributeValue != undefined ){
                Xrm.WebApi.retrieveRecord("msdyn_customerassetcategory", assetCategoryAttributeValue[0].id.replace(/[{}]/g, ""), "?$select=ts_assetcategorytype").then(
                    function success(result) {
                        //717750000 = Operations
                        //717750001 = Physical
                        if (result.ts_assetcategorytype == 717750000){ //Operations
                            form.getControl("ts_customerassetenglish").setVisible(false);
                            form.getControl("ts_customerassetfrench").setVisible(false);

                            //Keep track of the category change, to be used when saving the asset and determining whether to generate a name or not
                            currentOperationCategory = result.ts_assetcategorytype;
                            generatedName["category"] = assetCategoryAttributeValue[0].name;
                            nameAttribute.setValue(
                                (generatedName["account"] != undefined && generatedName["account"] != null ? generatedName["account"]: "")
                                + " / " +
                                (generatedName["category"]!= undefined && generatedName["category"] != null? generatedName["category"]: "")
                                    + " / " + 
                                (generatedName["functionalLocation"] != undefined && generatedName["functionalLocation"] != null ? generatedName["functionalLocation"].name : "")
                            );
                        }
                        else{ //Physical Asset}
                            nameAttribute.setValue("");
                            if(Xrm.Utility.getGlobalContext().userSettings.languageId == 1033){
                                form.getControl("ts_customerassetfrench").setVisible(true);
                            }
                            else{
                                form.getControl("ts_customerassetenglish").setVisible(true);
                            }
                        }
                    },
                    function (error) {
                    }
                );
                
            } 
        }
    }

    export function accountOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_customerasset.Main.CustomerAsset>eContext.getFormContext();

            const nameAttribute = form.getAttribute("msdyn_name");
            const accountAttribute = form.getAttribute("msdyn_account");

            if(accountAttribute != null){
                const accountAttributeValue = accountAttribute.getValue();
                if(accountAttributeValue != null && accountAttributeValue != undefined){
                    generatedName["account"] = accountAttributeValue[0].name;
                    if(currentOperationCategory == 717750000){
                        nameAttribute.setValue(
                            (generatedName["account"] != undefined && generatedName["account"] != null ? generatedName["account"]: "")
                                + " / " +
                            (generatedName["category"]!= undefined && generatedName["category"] != null? generatedName["category"]: "")
                                + " / " + 
                            (generatedName["functionalLocation"] != undefined && generatedName["functionalLocation"] != null ? generatedName["functionalLocation"].name : "")
                        );
                    }
                }
            } 
        
    }
}