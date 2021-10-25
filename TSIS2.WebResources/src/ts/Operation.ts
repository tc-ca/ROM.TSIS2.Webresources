namespace ROM.Operation {
    var generatedName = []
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ovs_operation.Main.Information>eContext.getFormContext();

        const operationTypeAttribute = form.getAttribute("ovs_operationtypeid");
        const operationTypeAttributeValue = form.getAttribute("ovs_operationtypeid").getValue();

        const accountAttribute = form.getAttribute("ts_stakeholder");
        const accountAttributeValue = form.getAttribute("ts_stakeholder").getValue();

        const siteAttribute = form.getAttribute("ts_site");
        const siteAttributeValue = form.getAttribute("ts_site").getValue();

        const nameAttribute = form.getAttribute("ovs_name");
      //  Save the current values of the fields used in the name generation if they exist+++++
        generatedName = [];
        if(accountAttribute != null || operationTypeAttribute != null || siteAttribute != null){
            if (accountAttributeValue != null || operationTypeAttributeValue != null || siteAttributeValue != null) {
                generatedName['operationType'] = operationTypeAttributeValue != null ? operationTypeAttributeValue[0].name : "";
                generatedName['account'] = accountAttributeValue != null ? accountAttributeValue[0].name : "";
                generatedName['functionalLocation'] = siteAttributeValue != null ? siteAttributeValue[0].name : "";           
            }
        }   
    }

    export function onSave(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ovs_operation.Main.Information>eContext.getFormContext();
        
        if(form.ui.getFormType() == 1){
            const nameAttribute = form.getAttribute("ovs_name");
            const nameAttributeEnglish = form.getAttribute("ts_operationnameenglish");
            const nameAttributeFrench = form.getAttribute("ts_operationnamefrench");

            const accountAttribute = form.getAttribute("ts_stakeholder");
            const operationTypeAttribute = form.getAttribute("ovs_operationtypeid");
            const siteAttribute = form.getAttribute("ts_site");

            if(accountAttribute != null && operationTypeAttribute != null && siteAttribute != null){

                const accountAttributeValue = accountAttribute.getValue();
                const operationTypeAttributeValue = operationTypeAttribute.getValue();
                const siteAttributeValue = siteAttribute.getValue();

                if(accountAttributeValue != null && accountAttributeValue != undefined &&
                    operationTypeAttributeValue != null && operationTypeAttributeValue != undefined &&
                    siteAttributeValue != null && siteAttributeValue != undefined){

                    var generatedAlternateLangName = "";

                    const lang = Xrm.Utility.getGlobalContext().userSettings.languageId == 1033 ? "english" : "french";
                
                    //Query the alternate language name for the three different entities and generate the final name to be used 
                    Xrm.WebApi.retrieveRecord("account", accountAttributeValue[0].id.replace(/[{}]/g, ""), "?$select=name, ovs_accountnamefrench, ovs_accountnameenglish")
                    .then(
                        function success(result) {

                            if(lang == "english"){
                                result.ovs_accountnamefrench != null ? generatedAlternateLangName += result.ovs_accountnamefrench + " | " : generatedAlternateLangName += result.name + " | ";
                            }
                            else{
                                result.ovs_accountnameenglish != null ? generatedAlternateLangName += result.ovs_accountnameenglish + " | " : generatedAlternateLangName += result.name + " | ";
                            }

                            Xrm.WebApi.retrieveRecord("ovs_operationtype", operationTypeAttributeValue[0].id.replace(/[{}]/g, ""), "?$select=ovs_name, ovs_operationtypenamefrench, ovs_operationtypenameenglish").then(
                                function success(result) {

                                    if(lang == "english"){
                                        result.ovs_operationtypenamefrench != null ? generatedAlternateLangName += result.ovs_operationtypenamefrench + " | " : generatedAlternateLangName += result.ovs_name + "| ";
                                    }
                                    else{
                                        result.ovs_operationtypenameenglish != null ? generatedAlternateLangName += result.ovs_operationtypenameenglish + " | " : generatedAlternateLangName += result.ovs_name + "| ";
                                    }

                                    Xrm.WebApi.retrieveRecord("msdyn_functionallocation", siteAttributeValue[0].id.replace(/[{}]/g, ""), "?$select=msdyn_name, ts_functionallocationnamefrench, ts_functionallocationnameenglish").then(
                                        function success(result) {

                                            if(lang == "english"){
                                                result.ts_functionallocationnamefrench != null ? generatedAlternateLangName += result.ts_functionallocationnamefrench : generatedAlternateLangName += result.ovs_name;
                                            }
                                            else{
                                                result.ts_functionallocationnameenglish != null ? generatedAlternateLangName += result.ts_functionallocationnameenglish : generatedAlternateLangName += result.ovs_name;
                                            }

                                            if(lang == "english"){
                                                nameAttributeEnglish.setValue(`${accountAttributeValue[0].name} | ${operationTypeAttributeValue[0].name} | ${siteAttributeValue[0].name}`);
                                                nameAttributeFrench.setValue(generatedAlternateLangName);
                                                nameAttribute.setValue(`${accountAttributeValue[0].name} | ${operationTypeAttributeValue[0].name} | ${siteAttributeValue[0].name}`);
                                            }
                                            else{
                                                nameAttributeFrench.setValue(`${accountAttributeValue[0].name} | ${operationTypeAttributeValue[0].name} | ${siteAttributeValue[0].name}`);
                                                nameAttributeEnglish.setValue(generatedAlternateLangName);
                                                nameAttribute.setValue(`${accountAttributeValue[0].name} | ${operationTypeAttributeValue[0].name} | ${siteAttributeValue[0].name}`);
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

    export function operationTypeOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ovs_operation.Main.Information>eContext.getFormContext();

        const nameAttribute = form.getAttribute("ovs_name");
        const operationTypeAttribute = form.getAttribute("ovs_operationtypeid");
        
        if(operationTypeAttribute != null){
            const operationTypeAttributeValue = operationTypeAttribute.getValue();
            if(operationTypeAttributeValue != null && operationTypeAttributeValue != undefined){
                generatedName["operationType"] = operationTypeAttributeValue[0].name;
                nameAttribute.setValue(
                    (generatedName["account"] != undefined && generatedName["account"] != null ? generatedName["account"]: "")
                    + " | " +
                    (generatedName["operationType"]!= undefined && generatedName["operationType"] != null? generatedName["operationType"]: "")
                        + " | " + 
                    (generatedName["functionalLocation"] != undefined && generatedName["functionalLocation"][0] != null ? generatedName["functionalLocation"] : "")
                );
                }
        }
    }

    export function stakeholderOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ovs_operation.Main.Information>eContext.getFormContext();

        const nameAttribute = form.getAttribute("ovs_name");
        const accountAttribute = form.getAttribute("ts_stakeholder");

        if(accountAttribute != null){
            const accountAttributeValue = accountAttribute.getValue();
            if(accountAttributeValue != null && accountAttributeValue != undefined){
            generatedName["account"] = accountAttributeValue[0].name;
                nameAttribute.setValue(
                    (generatedName["account"] != undefined && generatedName["account"] != null ? generatedName["account"]: "")
                        + " | " +
                    (generatedName["operationType"]!= undefined && generatedName["operationType"] != null? generatedName["operationType"]: "")
                        + " | " + 
                    (generatedName["functionalLocation"] != undefined && generatedName["functionalLocation"] != null ? generatedName["functionalLocation"] : "")
                );
            
            }
        } 
    }

    export function siteOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ovs_operation.Main.Information>eContext.getFormContext();

        const nameAttribute = form.getAttribute("ovs_name");
        const siteAttribute = form.getAttribute("ts_site");

        if(siteAttribute != null){
            const siteAttributeValue = siteAttribute.getValue();
            if(siteAttributeValue != null && siteAttributeValue != undefined){
            generatedName["functionalLocation"] = siteAttributeValue[0].name;
                nameAttribute.setValue(
                    (generatedName["account"] != undefined && generatedName["account"] != null ? generatedName["account"]: "")
                    + " | " +
                    (generatedName["operationType"]!= undefined && generatedName["operationType"] != null? generatedName["operationType"]: "")
                    + " | " + 
                    (generatedName["functionalLocation"] != undefined && generatedName["functionalLocation"] != null ? generatedName["functionalLocation"] : "")
                );

                form.getControl('ts_subsite').setDisabled(false);
                const viewId = '{6A59549F-F162-5128-4711-79BC929540C3}';
                const entityName = "msdyn_functionallocation";
                const viewDisplayName = "Filtered Sites";
                const activityTypeFetchXml = '<fetch no-lock="false"><entity name="msdyn_functionallocation"><attribute name="statecode"/><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><filter><condition attribute="msdyn_functionallocationid" operator="under" value="' + siteAttributeValue[0].id + '"/></filter><order attribute="msdyn_name" descending="false"/></entity></fetch>';
                const layoutXml = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="200" /></row></grid>';
                form.getControl("ts_subsite").addCustomView(viewId, entityName, viewDisplayName, activityTypeFetchXml, layoutXml, true);
            }
            else{
                form.getControl('ts_subsite').setDisabled(true);
            }
        }
    }
}