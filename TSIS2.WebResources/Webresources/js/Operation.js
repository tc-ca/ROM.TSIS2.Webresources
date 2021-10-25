"use strict";
var ROM;
(function (ROM) {
    var Operation;
    (function (Operation) {
        var generatedName = [];
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            var operationTypeAttribute = form.getAttribute("ovs_operationtypeid");
            var operationTypeAttributeValue = form.getAttribute("ovs_operationtypeid").getValue();
            var accountAttribute = form.getAttribute("ts_stakeholder");
            var accountAttributeValue = form.getAttribute("ts_stakeholder").getValue();
            var siteAttribute = form.getAttribute("ts_site");
            var siteAttributeValue = form.getAttribute("ts_site").getValue();
            var nameAttribute = form.getAttribute("ovs_name");
            //  Save the current values of the fields used in the name generation if they exist+++++
            generatedName = [];
            if (accountAttribute != null || operationTypeAttribute != null || siteAttribute != null) {
                if (accountAttributeValue != null || operationTypeAttributeValue != null || siteAttributeValue != null) {
                    generatedName['operationType'] = operationTypeAttributeValue != null ? operationTypeAttributeValue[0].name : "";
                    generatedName['account'] = accountAttributeValue != null ? accountAttributeValue[0].name : "";
                    generatedName['functionalLocation'] = siteAttributeValue != null ? siteAttributeValue[0].name : "";
                }
            }
        }
        Operation.onLoad = onLoad;
        function onSave(eContext) {
            var form = eContext.getFormContext();
            if (form.ui.getFormType() == 1) {
                var nameAttribute_1 = form.getAttribute("ovs_name");
                var nameAttributeEnglish_1 = form.getAttribute("ts_operationnameenglish");
                var nameAttributeFrench_1 = form.getAttribute("ts_operationnamefrench");
                var accountAttribute = form.getAttribute("ts_stakeholder");
                var operationTypeAttribute = form.getAttribute("ovs_operationtypeid");
                var siteAttribute = form.getAttribute("ts_site");
                if (accountAttribute != null && operationTypeAttribute != null && siteAttribute != null) {
                    var accountAttributeValue_1 = accountAttribute.getValue();
                    var operationTypeAttributeValue_1 = operationTypeAttribute.getValue();
                    var siteAttributeValue_1 = siteAttribute.getValue();
                    if (accountAttributeValue_1 != null && accountAttributeValue_1 != undefined &&
                        operationTypeAttributeValue_1 != null && operationTypeAttributeValue_1 != undefined &&
                        siteAttributeValue_1 != null && siteAttributeValue_1 != undefined) {
                        var generatedAlternateLangName = "";
                        var lang_1 = Xrm.Utility.getGlobalContext().userSettings.languageId == 1033 ? "english" : "french";
                        //Query the alternate language name for the three different entities and generate the final name to be used 
                        Xrm.WebApi.retrieveRecord("account", accountAttributeValue_1[0].id.replace(/[{}]/g, ""), "?$select=name, ovs_accountnamefrench, ovs_accountnameenglish")
                            .then(function success(result) {
                            if (lang_1 == "english") {
                                result.ovs_accountnamefrench != null ? generatedAlternateLangName += result.ovs_accountnamefrench + " | " : generatedAlternateLangName += result.name + " | ";
                            }
                            else {
                                result.ovs_accountnameenglish != null ? generatedAlternateLangName += result.ovs_accountnameenglish + " | " : generatedAlternateLangName += result.name + " | ";
                            }
                            Xrm.WebApi.retrieveRecord("ovs_operationtype", operationTypeAttributeValue_1[0].id.replace(/[{}]/g, ""), "?$select=ovs_name, ovs_operationtypenamefrench, ovs_operationtypenameenglish").then(function success(result) {
                                if (lang_1 == "english") {
                                    result.ovs_operationtypenamefrench != null ? generatedAlternateLangName += result.ovs_operationtypenamefrench + " | " : generatedAlternateLangName += result.ovs_name + "| ";
                                }
                                else {
                                    result.ovs_operationtypenameenglish != null ? generatedAlternateLangName += result.ovs_operationtypenameenglish + " | " : generatedAlternateLangName += result.ovs_name + "| ";
                                }
                                Xrm.WebApi.retrieveRecord("msdyn_functionallocation", siteAttributeValue_1[0].id.replace(/[{}]/g, ""), "?$select=msdyn_name, ts_functionallocationnamefrench, ts_functionallocationnameenglish").then(function success(result) {
                                    if (lang_1 == "english") {
                                        result.ts_functionallocationnamefrench != null ? generatedAlternateLangName += result.ts_functionallocationnamefrench : generatedAlternateLangName += result.ovs_name;
                                    }
                                    else {
                                        result.ts_functionallocationnameenglish != null ? generatedAlternateLangName += result.ts_functionallocationnameenglish : generatedAlternateLangName += result.ovs_name;
                                    }
                                    if (lang_1 == "english") {
                                        nameAttributeEnglish_1.setValue(accountAttributeValue_1[0].name + " | " + operationTypeAttributeValue_1[0].name + " | " + siteAttributeValue_1[0].name);
                                        nameAttributeFrench_1.setValue(generatedAlternateLangName);
                                        nameAttribute_1.setValue(accountAttributeValue_1[0].name + " | " + operationTypeAttributeValue_1[0].name + " | " + siteAttributeValue_1[0].name);
                                    }
                                    else {
                                        nameAttributeFrench_1.setValue(accountAttributeValue_1[0].name + " | " + operationTypeAttributeValue_1[0].name + " | " + siteAttributeValue_1[0].name);
                                        nameAttributeEnglish_1.setValue(generatedAlternateLangName);
                                        nameAttribute_1.setValue(accountAttributeValue_1[0].name + " | " + operationTypeAttributeValue_1[0].name + " | " + siteAttributeValue_1[0].name);
                                    }
                                    form.data.entity.save();
                                });
                            });
                        });
                    }
                }
            }
        }
        Operation.onSave = onSave;
        function operationTypeOnChange(eContext) {
            var form = eContext.getFormContext();
            var nameAttribute = form.getAttribute("ovs_name");
            var operationTypeAttribute = form.getAttribute("ovs_operationtypeid");
            if (operationTypeAttribute != null) {
                var operationTypeAttributeValue = operationTypeAttribute.getValue();
                if (operationTypeAttributeValue != null && operationTypeAttributeValue != undefined) {
                    generatedName["operationType"] = operationTypeAttributeValue[0].name;
                    nameAttribute.setValue((generatedName["account"] != undefined && generatedName["account"] != null ? generatedName["account"] : "")
                        + " | " +
                        (generatedName["operationType"] != undefined && generatedName["operationType"] != null ? generatedName["operationType"] : "")
                        + " | " +
                        (generatedName["functionalLocation"] != undefined && generatedName["functionalLocation"][0] != null ? generatedName["functionalLocation"] : ""));
                }
            }
        }
        Operation.operationTypeOnChange = operationTypeOnChange;
        function stakeholderOnChange(eContext) {
            var form = eContext.getFormContext();
            var nameAttribute = form.getAttribute("ovs_name");
            var accountAttribute = form.getAttribute("ts_stakeholder");
            if (accountAttribute != null) {
                var accountAttributeValue = accountAttribute.getValue();
                if (accountAttributeValue != null && accountAttributeValue != undefined) {
                    generatedName["account"] = accountAttributeValue[0].name;
                    nameAttribute.setValue((generatedName["account"] != undefined && generatedName["account"] != null ? generatedName["account"] : "")
                        + " | " +
                        (generatedName["operationType"] != undefined && generatedName["operationType"] != null ? generatedName["operationType"] : "")
                        + " | " +
                        (generatedName["functionalLocation"] != undefined && generatedName["functionalLocation"] != null ? generatedName["functionalLocation"] : ""));
                }
            }
        }
        Operation.stakeholderOnChange = stakeholderOnChange;
        function siteOnChange(eContext) {
            var form = eContext.getFormContext();
            var nameAttribute = form.getAttribute("ovs_name");
            var siteAttribute = form.getAttribute("ts_site");
            if (siteAttribute != null) {
                var siteAttributeValue = siteAttribute.getValue();
                if (siteAttributeValue != null && siteAttributeValue != undefined) {
                    generatedName["functionalLocation"] = siteAttributeValue[0].name;
                    nameAttribute.setValue((generatedName["account"] != undefined && generatedName["account"] != null ? generatedName["account"] : "")
                        + " | " +
                        (generatedName["operationType"] != undefined && generatedName["operationType"] != null ? generatedName["operationType"] : "")
                        + " | " +
                        (generatedName["functionalLocation"] != undefined && generatedName["functionalLocation"] != null ? generatedName["functionalLocation"] : ""));
                    form.getControl('ts_subsite').setDisabled(false);
                    var viewId = '{6A59549F-F162-5128-4711-79BC929540C3}';
                    var entityName = "msdyn_functionallocation";
                    var viewDisplayName = "Filtered Sites";
                    var activityTypeFetchXml = '<fetch no-lock="false"><entity name="msdyn_functionallocation"><attribute name="statecode"/><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><filter><condition attribute="msdyn_functionallocationid" operator="under" value="' + siteAttributeValue[0].id + '"/></filter><order attribute="msdyn_name" descending="false"/></entity></fetch>';
                    var layoutXml = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="200" /></row></grid>';
                    form.getControl("ts_subsite").addCustomView(viewId, entityName, viewDisplayName, activityTypeFetchXml, layoutXml, true);
                }
                else {
                    form.getControl('ts_subsite').setDisabled(true);
                }
            }
        }
        Operation.siteOnChange = siteOnChange;
    })(Operation = ROM.Operation || (ROM.Operation = {}));
})(ROM || (ROM = {}));
