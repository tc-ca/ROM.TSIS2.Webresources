"use strict";
var ROM;
(function (ROM) {
    var CustomerAsset;
    (function (CustomerAsset) {
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            var assetCategoryAttribute = form.getAttribute("msdyn_customerassetcategory");
            var assetCategoryAttributeValue = form.getAttribute("msdyn_customerassetcategory").getValue();
            //const relatedWorkOrdersOperationSubGrid = form.getControl("Asset_WorkOrder_Operations");
            var relatedWorkOrdersTagsSubGrid = form.getControl("Asset_WorkOrder_Tags");
            var accountAttribute = form.getAttribute("msdyn_account");
            var customerAssetCategoryAttribute = form.getAttribute("msdyn_customerassetcategory");
            var functionalLocationAttribute = form.getAttribute("msdyn_functionallocation");
            var accountAttributeValue = form.getAttribute("msdyn_account").getValue();
            var customerAssetCategoryAttributeValue = form.getAttribute("msdyn_customerassetcategory").getValue();
            var functionalLocationAttributeValue = form.getAttribute("msdyn_functionallocation").getValue();
            //Save the current values of the fields used in the name generation if they exist
            globalThis.generatedName = [];
            if (accountAttribute != null && customerAssetCategoryAttribute != null && functionalLocationAttribute != null) {
                if (accountAttributeValue != null && customerAssetCategoryAttributeValue != null && functionalLocationAttributeValue != null) {
                    globalThis.generatedName['category'] = customerAssetCategoryAttributeValue != null ? customerAssetCategoryAttributeValue[0].name : "";
                    globalThis.generatedName['account'] = accountAttributeValue != null ? accountAttributeValue[0].name : "";
                    globalThis.generatedName['functionalLocation'] = functionalLocationAttributeValue != null ? functionalLocationAttributeValue[0].name : "";
                }
            }
            if (assetCategoryAttribute != null && assetCategoryAttribute != undefined && assetCategoryAttributeValue != null) {
                Xrm.WebApi.retrieveRecord("msdyn_customerassetcategory", assetCategoryAttributeValue[0].id.replace(/[{}]/g, ""), "?$select=ts_assetcategorytype").then(function success(result) {
                    //717750000 = Operations
                    //717750001 = Physical
                    globalThis.currentOperationCategory = result.ts_assetcategorytype;
                    if (result.ts_assetcategorytype == 717750000) {
                        //relatedWorkOrdersOperationSubGrid.setVisible(true);
                        relatedWorkOrdersTagsSubGrid.setVisible(false);
                        form.getControl("ts_customerassetenglish").setVisible(false);
                        form.getControl("ts_customerassetfrench").setVisible(false);
                    }
                    else {
                        relatedWorkOrdersTagsSubGrid.setVisible(true);
                        //relatedWorkOrdersOperationSubGrid.setVisible(false);
                    }
                }, function (error) {
                });
            }
        }
        CustomerAsset.onLoad = onLoad;
        function onSave(eContext) {
            var form = eContext.getFormContext();
            if (form.ui.getFormType() == 1) {
                if (globalThis.currentOperationCategory == 717750000) {
                    var nameAttribute_1 = form.getAttribute("msdyn_name");
                    var nameAttributeEnglish_1 = form.getAttribute("ts_customerassetenglish");
                    var nameAttributeFrench_1 = form.getAttribute("ts_customerassetfrench");
                    var accountAttribute = form.getAttribute("msdyn_account");
                    var customerAssetCategoryAttribute = form.getAttribute("msdyn_customerassetcategory");
                    var functionalLocationAttribute = form.getAttribute("msdyn_functionallocation");
                    if (accountAttribute != null && customerAssetCategoryAttribute != null && functionalLocationAttribute != null) {
                        var accountAttributeValue_1 = accountAttribute.getValue();
                        var customerAssetCategoryAttributeValue_1 = customerAssetCategoryAttribute.getValue();
                        var functionalLocationAttributeValue_1 = functionalLocationAttribute.getValue();
                        if (accountAttributeValue_1 != null && accountAttributeValue_1 != undefined &&
                            customerAssetCategoryAttributeValue_1 != null && customerAssetCategoryAttributeValue_1 != undefined &&
                            functionalLocationAttributeValue_1 != null && functionalLocationAttributeValue_1 != undefined) {
                            var generatedAlternateLangName = "";
                            var lang_1 = Xrm.Utility.getGlobalContext().userSettings.languageId == 1033 ? "english" : "french";
                            //Query the alternate language name for the three different entities and generate the final name to be used 
                            Xrm.WebApi.retrieveRecord("account", accountAttributeValue_1[0].id.replace(/[{}]/g, ""), "?$select=name, ovs_accountnamefrench, ovs_accountnameenglish")
                                .then(function success(result) {
                                if (lang_1 == "english") {
                                    result.ovs_accountnamefrench != null ? generatedAlternateLangName += result.ovs_accountnamefrench + " / " : generatedAlternateLangName += result.name + " / ";
                                }
                                else {
                                    result.ovs_accountnameenglish != null ? generatedAlternateLangName += result.ovs_accountnameenglish + " / " : generatedAlternateLangName += result.name + " / ";
                                }
                                Xrm.WebApi.retrieveRecord("msdyn_customerassetcategory", customerAssetCategoryAttributeValue_1[0].id.replace(/[{}]/g, ""), "?$select=msdyn_name, ts_assetcategorynamefrench, ts_assetcategorynameenglish").then(function success(result) {
                                    if (lang_1 == "english") {
                                        result.ts_assetcategorynamefrench != null ? generatedAlternateLangName += result.ts_assetcategorynamefrench + "/ " : generatedAlternateLangName += result.msdyn_name + "/ ";
                                    }
                                    else {
                                        result.ts_assetcategorynameenglish != null ? generatedAlternateLangName += result.ts_assetcategorynameenglish + "/ " : generatedAlternateLangName += result.msdyn_name + "/ ";
                                    }
                                    Xrm.WebApi.retrieveRecord("msdyn_functionallocation", functionalLocationAttributeValue_1[0].id.replace(/[{}]/g, ""), "?$select=msdyn_name, ts_functionallocationnamefrench, ts_functionallocationnameenglish").then(function success(result) {
                                        if (lang_1 == "english") {
                                            result.ts_functionallocationnamefrench != null ? generatedAlternateLangName += result.ts_functionallocationnamefrench : generatedAlternateLangName += result.msdyn_name;
                                        }
                                        else {
                                            result.ts_functionallocationnameenglish != null ? generatedAlternateLangName += result.ts_functionallocationnameenglish : generatedAlternateLangName += result.msdyn_name;
                                        }
                                        if (lang_1 == "english") {
                                            nameAttributeEnglish_1.setValue(accountAttributeValue_1[0].name + " / " + customerAssetCategoryAttributeValue_1[0].name + " / " + functionalLocationAttributeValue_1[0].name);
                                            nameAttributeFrench_1.setValue(generatedAlternateLangName);
                                            nameAttribute_1.setValue(accountAttributeValue_1[0].name + " / " + customerAssetCategoryAttributeValue_1[0].name + " / " + functionalLocationAttributeValue_1[0].name);
                                        }
                                        else {
                                            nameAttributeFrench_1.setValue(accountAttributeValue_1[0].name + " / " + customerAssetCategoryAttributeValue_1[0].name + " / " + functionalLocationAttributeValue_1[0].name);
                                            nameAttributeEnglish_1.setValue(generatedAlternateLangName);
                                            nameAttribute_1.setValue(accountAttributeValue_1[0].name + " / " + customerAssetCategoryAttributeValue_1[0].name + " / " + functionalLocationAttributeValue_1[0].name);
                                        }
                                        form.data.entity.save();
                                    });
                                });
                            });
                        }
                    }
                }
            }
        }
        CustomerAsset.onSave = onSave;
        function categoryOnChange(eContext) {
            var form = eContext.getFormContext();
            var assetCategoryAttribute = form.getAttribute("msdyn_customerassetcategory");
            var nameAttribute = form.getAttribute("msdyn_name");
            if (assetCategoryAttribute != null) {
                var assetCategoryAttributeValue_1 = assetCategoryAttribute.getValue();
                if (assetCategoryAttributeValue_1 != null && assetCategoryAttributeValue_1 != undefined) {
                    Xrm.WebApi.retrieveRecord("msdyn_customerassetcategory", assetCategoryAttributeValue_1[0].id.replace(/[{}]/g, ""), "?$select=ts_assetcategorytype").then(function success(result) {
                        //717750000 = Operations
                        //717750001 = Physical
                        if (result.ts_assetcategorytype == 717750000) { //Operations
                            form.getControl("ts_customerassetenglish").setVisible(false);
                            form.getControl("ts_customerassetfrench").setVisible(false);
                            //Keep track of the category change, to be used when saving the asset and determining whether to generate a name or not because we only generate name when the Category is an Operation
                            globalThis.currentOperationCategory = result.ts_assetcategorytype;
                            globalThis.generatedName["category"] = assetCategoryAttributeValue_1[0].name;
                            nameAttribute.setValue((globalThis.generatedName["account"] != undefined && globalThis.generatedName["account"] != null ? globalThis.generatedName["account"] : "")
                                + " / " +
                                (globalThis.generatedName["category"] != undefined && globalThis.generatedName["category"] != null ? globalThis.generatedName["category"] : "")
                                + " / " +
                                (globalThis.generatedName["functionalLocation"] != undefined && globalThis.generatedName["functionalLocation"][0] != null ? globalThis.generatedName["functionalLocation"] : ""));
                        }
                        else { //Physical Asset}
                            if (Xrm.Utility.getGlobalContext().userSettings.languageId == 1033) {
                                form.getControl("ts_customerassetfrench").setVisible(true);
                            }
                            else {
                                form.getControl("ts_customerassetenglish").setVisible(true);
                            }
                        }
                    }, function (error) {
                    });
                }
            }
        }
        CustomerAsset.categoryOnChange = categoryOnChange;
        function accountOnChange(eContext) {
            var form = eContext.getFormContext();
            var nameAttribute = form.getAttribute("msdyn_name");
            var accountAttribute = form.getAttribute("msdyn_account");
            if (accountAttribute != null) {
                var accountAttributeValue = accountAttribute.getValue();
                if (accountAttributeValue != null && accountAttributeValue != undefined) {
                    globalThis.generatedName["account"] = accountAttributeValue[0].name;
                    if (globalThis.currentOperationCategory == 717750000) {
                        nameAttribute.setValue((globalThis.generatedName["account"] != undefined && globalThis.generatedName["account"] != null ? globalThis.generatedName["account"] : "")
                            + " / " +
                            (globalThis.generatedName["category"] != undefined && globalThis.generatedName["category"] != null ? globalThis.generatedName["category"] : "")
                            + " / " +
                            (globalThis.generatedName["functionalLocation"] != undefined && globalThis.generatedName["functionalLocation"] != null ? globalThis.generatedName["functionalLocation"] : ""));
                    }
                }
            }
        }
        CustomerAsset.accountOnChange = accountOnChange;
        function functionalLocationOnChange(eContext) {
            var form = eContext.getFormContext();
            var nameAttribute = form.getAttribute("msdyn_name");
            var functionalLocationAttribute = form.getAttribute("msdyn_functionallocation");
            if (functionalLocationAttribute != null) {
                var functionalLocationAttributeValue = functionalLocationAttribute.getValue();
                if (functionalLocationAttributeValue != null && functionalLocationAttributeValue != undefined) {
                    globalThis.generatedName["functionalLocation"] = functionalLocationAttributeValue[0].name;
                    if (globalThis.currentOperationCategory == 717750000) {
                        nameAttribute.setValue((globalThis.generatedName["account"] != undefined && globalThis.generatedName["account"] != null ? globalThis.generatedName["account"] : "")
                            + " / " +
                            (globalThis.generatedName["category"] != undefined && globalThis.generatedName["category"] != null ? globalThis.generatedName["category"] : "")
                            + " / " +
                            (globalThis.generatedName["functionalLocation"] != undefined && globalThis.generatedName["functionalLocation"] != null ? globalThis.generatedName["functionalLocation"] : ""));
                    }
                }
            }
        }
        CustomerAsset.functionalLocationOnChange = functionalLocationOnChange;
    })(CustomerAsset = ROM.CustomerAsset || (ROM.CustomerAsset = {}));
})(ROM || (ROM = {}));
