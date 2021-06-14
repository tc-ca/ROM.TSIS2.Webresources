namespace ROM.CustomerAsset {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_customerasset.Main.CustomerAsset>eContext.getFormContext();
        const assetCategoryAttribute = form.getAttribute("msdyn_customerassetcategory");
        const assetCategoryAttributeValue = form.getAttribute("msdyn_customerassetcategory").getValue();

        const relatedWorkOrdersOperationSubGrid = form.getControl("Asset_WorkOrder_Operations");
        const relatedWorkOrdersTagsSubGrid = form.getControl("Asset_WorkOrder_Tags");

        const accountAttribute = form.getAttribute("msdyn_account");
        const customerAssetCategoryAttribute = form.getAttribute("msdyn_customerassetcategory");
        const functionalLocationAttribute = form.getAttribute("msdyn_functionallocation");

        const accountAttributeValue = form.getAttribute("msdyn_account").getValue();
        const customerAssetCategoryAttributeValue = form.getAttribute("msdyn_customerassetcategory").getValue();
        const functionalLocationAttributeValue = form.getAttribute("msdyn_functionallocation").getValue();

        globalThis.generatedName = [];
        if(accountAttribute != null && customerAssetCategoryAttribute != null && functionalLocationAttribute != null){
            if(accountAttributeValue != null && customerAssetCategoryAttributeValue != null && functionalLocationAttributeValue != null){
                globalThis.generatedName['category'] = customerAssetCategoryAttributeValue != null ? customerAssetCategoryAttributeValue[0].name : "" ;
                globalThis.generatedName['account'] = accountAttributeValue != null ? accountAttributeValue[0].name  : "" ;
                globalThis.generatedName['functionalLocation'] = functionalLocationAttributeValue != null ? functionalLocationAttributeValue[0].name  : "" ;
            }
        }

        if (assetCategoryAttribute != null && assetCategoryAttribute != undefined && assetCategoryAttributeValue != null){
            Xrm.WebApi.retrieveRecord("msdyn_customerassetcategory", assetCategoryAttributeValue[0].id.replace(/[{}]/g, ""), "?$select=ts_assetcategorytype").then(
                function success(result) {
                    //717750000 = Operations
                    //717750001 = Physical
                    globalThis.currentOperationCategory = result.ts_assetcategorytype;
                    if (result.ts_assetcategorytype == 717750000){
                        relatedWorkOrdersOperationSubGrid.setVisible(true);
                        relatedWorkOrdersTagsSubGrid.setVisible(false);
                        form.getControl("ts_customerassetenglish").setVisible(false);
                        form.getControl("ts_customerassetfrench").setVisible(false);
                    }
                    else {
                        relatedWorkOrdersTagsSubGrid.setVisible(true);
                        relatedWorkOrdersOperationSubGrid.setVisible(false);
                    }
                },
                function (error) {
                }
            );
        }
    }

    export function onSave(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_customerasset.Main.CustomerAsset>eContext.getFormContext();
        
        if(form.ui.getFormType() == 1){
            if(globalThis.currentOperationCategory == 717750000){
                const nameAttribute = form.getAttribute("msdyn_name");
                const nameAttributeEnglish = form.getAttribute("ts_customerassetenglish");
                const nameAttributeFrench = form.getAttribute("ts_customerassetfrench");

                const accountAttribute = form.getAttribute("msdyn_account");
                const customerAssetCategoryAttribute = form.getAttribute("msdyn_customerassetcategory");
                const functionalLocationAttribute = form.getAttribute("msdyn_functionallocation");

                if(accountAttribute != null && customerAssetCategoryAttribute != null && functionalLocationAttribute != null){

                    const accountAttributeValue = accountAttribute.getValue();
                    const customerAssetCategoryAttributeValue = customerAssetCategoryAttribute.getValue();
                    const functionalLocationAttributeValue = functionalLocationAttribute.getValue();

                    if(accountAttributeValue != null && accountAttributeValue != undefined &&
                        customerAssetCategoryAttributeValue != null && customerAssetCategoryAttributeValue != undefined &&
                        functionalLocationAttributeValue != null && functionalLocationAttributeValue != undefined){

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

                                        Xrm.WebApi.retrieveRecord("msdyn_functionallocation", functionalLocationAttributeValue[0].id.replace(/[{}]/g, ""), "?$select=msdyn_name, ts_functionallocationnamefrench, ts_functionallocationnameenglish").then(
                                            function success(result) {

                                                if(lang == "english"){
                                                    result.ts_functionallocationnamefrench != null ? generatedAlternateLangName += result.ts_functionallocationnamefrench : generatedAlternateLangName += result.msdyn_name;
                                                }
                                                else{
                                                    result.ts_functionallocationnameenglish != null ? generatedAlternateLangName += result.ts_functionallocationnameenglish : generatedAlternateLangName += result.msdyn_name;
                                                }

                                                if(lang == "english"){
                                                    nameAttributeEnglish.setValue(`${accountAttributeValue[0].name} / ${customerAssetCategoryAttributeValue[0].name} / ${functionalLocationAttributeValue[0].name}`);
                                                    nameAttributeFrench.setValue(generatedAlternateLangName);
                                                    nameAttribute.setValue(`${accountAttributeValue[0].name} / ${customerAssetCategoryAttributeValue[0].name} / ${functionalLocationAttributeValue[0].name}`);
                                                }
                                                else{
                                                    nameAttributeFrench.setValue(`${accountAttributeValue[0].name} / ${customerAssetCategoryAttributeValue[0].name} / ${functionalLocationAttributeValue[0].name}`);
                                                    nameAttributeEnglish.setValue(generatedAlternateLangName);
                                                    nameAttribute.setValue(`${accountAttributeValue[0].name} / ${customerAssetCategoryAttributeValue[0].name} / ${functionalLocationAttributeValue[0].name}`);
                                                }
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
                            globalThis.currentOperationCategory = result.ts_assetcategorytype;
                            globalThis.generatedName["category"] = assetCategoryAttributeValue[0].name;
                            nameAttribute.setValue(
                                (globalThis.generatedName["account"] != undefined && globalThis.generatedName["account"] != null ? globalThis.generatedName["account"]: "")
                                + " / " +
                                (globalThis.generatedName["category"]!= undefined && globalThis.generatedName["category"] != null? globalThis.generatedName["category"]: "")
                                    + " / " + 
                                (globalThis.generatedName["functionalLocation"] != undefined && globalThis.generatedName["functionalLocation"][0] != null ? globalThis.generatedName["functionalLocation"] : "")
                            );
                        }
                        else{ //Physical Asset}
                            if(Xrm.Utility.getGlobalContext().userSettings.languageId == 1033){
                                form.getControl("ts_customerassetenglish").setVisible(true);
                            }
                            else{
                                form.getControl("ts_customerassetfrench").setVisible(true);
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

        if(globalThis.currentOperationCategory == 717750000){
            const nameAttribute = form.getAttribute("msdyn_name");
            const accountAttribute = form.getAttribute("msdyn_account");

            if(accountAttribute != null){
                const accountAttributeValue = accountAttribute.getValue();
                if(accountAttributeValue != null && accountAttributeValue != undefined){
                    globalThis.generatedName["account"] = accountAttributeValue[0].name;
                    nameAttribute.setValue(
                        (globalThis.generatedName["account"] != undefined && globalThis.generatedName["account"] != null ? globalThis.generatedName["account"]: "")
                            + " / " +
                        (globalThis.generatedName["category"]!= undefined && globalThis.generatedName["category"] != null? globalThis.generatedName["category"]: "")
                            + " / " + 
                        (globalThis.generatedName["functionalLocation"] != undefined && globalThis.generatedName["functionalLocation"] != null ? globalThis.generatedName["functionalLocation"] : "")
                    );
                }
            } 
        }
        
    }

    export function functionalLocationOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_customerasset.Main.CustomerAsset>eContext.getFormContext();

        const nameAttribute = form.getAttribute("msdyn_name");
        const functionalLocationAttribute = form.getAttribute("msdyn_functionallocation");

        if(globalThis.currentOperationCategory == 717750000){
            if(functionalLocationAttribute != null){
                const functionalLocationAttributeValue = functionalLocationAttribute.getValue();
                if(functionalLocationAttributeValue != null && functionalLocationAttributeValue != undefined){
                    globalThis.generatedName["functionalLocation"] = functionalLocationAttributeValue[0].name;
                    nameAttribute.setValue(
                        (globalThis.generatedName["account"] != undefined && globalThis.generatedName["account"] != null ? globalThis.generatedName["account"]: "")
                        + " / " +
                        (globalThis.generatedName["category"]!= undefined && globalThis.generatedName["category"] != null? globalThis.generatedName["category"]: "")
                        + " / " + 
                        (globalThis.generatedName["functionalLocation"] != undefined && globalThis.generatedName["functionalLocation"] != null ? globalThis.generatedName["functionalLocation"] : "")
                    );
                }
            }
        }
    }
}