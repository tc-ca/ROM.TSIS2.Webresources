"use strict";
/* eslint-disable @typescript-eslint/triple-slash-reference */
var ROM;
(function (ROM) {
    var WorkOrder;
    (function (WorkOrder) {
        // EVENTS
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            var state = form.getAttribute("statecode").getValue();
            //Set required field
            form.getAttribute("ovs_operationtypeid").setRequiredLevel("required");
            form.getAttribute("ovs_regulatedentity").setRequiredLevel("required");
            //Prevent enabling controls if record is Inactive
            if (state == 1)
                return;
            switch (form.ui.getFormType()) {
                //Create
                case 1:
                    setDefaultFiscalYear(form);
                    setRegion(form);
                    // Disable all operation related fields
                    form.getControl("ovs_operationtypeid").setDisabled(true);
                    form.getControl("ovs_regulatedentity").setDisabled(true);
                    form.getControl("msdyn_serviceaccount").setDisabled(true);
                    break;
                default:
                    // Enable all operation related fields
                    form.getControl("ovs_operationtypeid").setDisabled(false);
                    form.getControl("ovs_regulatedentity").setDisabled(false);
                    form.getControl("msdyn_serviceaccount").setDisabled(false);
                    break;
            }
        }
        WorkOrder.onLoad = onLoad;
        function regionOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var regionAttribute = form.getAttribute("msdyn_serviceterritory");
                if (regionAttribute != null && regionAttribute != undefined) {
                    // Clear out all dependent fields' value
                    if (!form.getControl("ovs_operationtypeid").getDisabled() || form.getAttribute("ovs_operationtypeid").getValue() != null) {
                        form.getAttribute("ovs_operationtypeid").setValue(null);
                    }
                    if (!form.getControl("ovs_regulatedentity").getDisabled() || form.getAttribute("ovs_regulatedentity").getValue() != null) {
                        form.getAttribute("ovs_regulatedentity").setValue(null);
                    }
                    if (!form.getControl("msdyn_serviceaccount").getDisabled() || form.getAttribute("msdyn_serviceaccount").getValue() != null) {
                        form.getAttribute("msdyn_serviceaccount").setValue(null);
                    }
                    // Disable all dependent fields
                    form.getControl("ovs_operationtypeid").setDisabled(true);
                    form.getControl("ovs_regulatedentity").setDisabled(true);
                    form.getControl("msdyn_serviceaccount").setDisabled(true);
                    // If previous fields have values, we use the filtered fetchxml in a custom lookup view
                    var regionAttributeValue = regionAttribute.getValue();
                    if (regionAttributeValue != null && regionAttributeValue != undefined) {
                        // Enable direct dependent field
                        if (regionAttributeValue[0].name != "International") {
                            form.getControl("ovs_operationtypeid").setDisabled(false);
                        }
                        // Setup a custom view
                        // This value is never saved and only needs to be unique among the other available views for the lookup.
                        var viewId = '{8982C38D-8BB4-4C95-BD05-493398FEAE98}';
                        var entityName = "ovs_operationtype";
                        var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredOperationTypes");
                        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"><entity name="ovs_operationtype"><attribute name="ovs_operationtypeid" /><attribute name="ovs_name" /><order attribute="ovs_name" descending="false" /><link-entity name="ovs_operation" from="ovs_operationtypeid" to="ovs_operationtypeid" link-type="inner" alias="al"><link-entity name="account" from="accountid" to="ovs_siteid" link-type="inner" alias="am"><filter type="and"><condition attribute="msdyn_serviceterritory" operator="eq"  value="' + regionAttributeValue[0].id + '" /></filter></link-entity></link-entity></entity></fetch>';
                        var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="ovs_operationtypeid"><cell name="ovs_name" width="200" /><cell name="owner" width="125" /></row></grid>';
                        form.getControl("ovs_operationtypeid").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        WorkOrder.regionOnChange = regionOnChange;
        function countryOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var countryAttribute = form.getAttribute("ovs_ovscountry");
                if (countryAttribute != null && countryAttribute != undefined) {
                    // Clear out all dependent fields' value
                    if (!form.getControl("ovs_operationtypeid").getDisabled() || form.getAttribute("ovs_operationtypeid").getValue() != null) {
                        form.getAttribute("ovs_operationtypeid").setValue(null);
                    }
                    if (!form.getControl("ovs_regulatedentity").getDisabled() || form.getAttribute("ovs_regulatedentity").getValue() != null) {
                        form.getAttribute("ovs_regulatedentity").setValue(null);
                    }
                    if (!form.getControl("msdyn_serviceaccount").getDisabled() || form.getAttribute("msdyn_serviceaccount").getValue() != null) {
                        form.getAttribute("msdyn_serviceaccount").setValue(null);
                    }
                    // Enable direct dependent field
                    form.getControl("ovs_operationtypeid").setDisabled(false);
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        WorkOrder.countryOnChange = countryOnChange;
        function fiscalYearOnChange(eContext) {
            //if new fiscal year is selected, then previous selection of quarter no longer corresponds
            removeSelectedFiscalQuarter(eContext);
        }
        WorkOrder.fiscalYearOnChange = fiscalYearOnChange;
        function operationTypeOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var regionAttribute = form.getAttribute("msdyn_serviceterritory");
                var operationTypeAttribute = form.getAttribute("ovs_operationtypeid");
                var countryAttribute = form.getAttribute("ovs_ovscountry");
                if (operationTypeAttribute != null && operationTypeAttribute != undefined) {
                    // Clear out all dependent fields' value
                    if (!form.getControl("ovs_regulatedentity").getDisabled() || form.getAttribute("ovs_regulatedentity").getValue() != null) {
                        form.getAttribute("ovs_regulatedentity").setValue(null);
                    }
                    if (!form.getControl("msdyn_serviceaccount").getDisabled() || form.getAttribute("msdyn_serviceaccount").getValue() != null) {
                        form.getAttribute("msdyn_serviceaccount").setValue(null);
                    }
                    // Disable all dependent fields
                    form.getControl("ovs_regulatedentity").setDisabled(true);
                    form.getControl("msdyn_serviceaccount").setDisabled(true);
                    // If previous fields have values, we use the filtered fetchxml in a custom lookup view
                    var regionAttributeValue = regionAttribute.getValue();
                    var operationTypeAttributeValue = operationTypeAttribute.getValue();
                    var countryAttributeValue = countryAttribute.getValue();
                    if (regionAttributeValue != null && regionAttributeValue != undefined &&
                        operationTypeAttributeValue != null && operationTypeAttributeValue != undefined) {
                        var countryXML = "";
                        if (countryAttributeValue != null && countryAttributeValue != undefined) {
                            if (regionAttributeValue[0].name != "International") {
                                form.getControl("msdyn_serviceaccount").setDisabled(false);
                            }
                            else {
                                countryXML = '<condition attribute="ovs_country" operator="eq" value="' + countryAttributeValue[0].id + '" />';
                            }
                        }
                        // Enable direct dependent field
                        form.getControl("ovs_regulatedentity").setDisabled(false);
                        // Setup a custom view
                        // This value is never saved and only needs to be unique among the other available views for the lookup.
                        var viewId = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F659}';
                        var entityName = "account";
                        var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredRegulatedEntities");
                        var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="accountid"><cell name="name" width="200" /><cell name="owner" width="125" /></row></grid>';
                        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"><entity name="account"><attribute name="name" /><attribute name="accountid" /><order attribute="name" descending="false" /><filter type="and"><condition attribute="customertypecode" operator="eq" value="948010000" /></filter><link-entity name="ovs_operation" from="ovs_regulatedentityid" to="accountid" link-type="inner" alias="ag"><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeValue[0].id + '" /></filter><link-entity name="account" from="accountid" to="ovs_siteid" link-type="inner" alias="ah"><filter type="and"><condition attribute="msdyn_serviceterritory" operator="eq" value="' + regionAttributeValue[0].id + '" />' + countryXML + '</filter></link-entity></link-entity></entity></fetch>';
                        form.getControl("ovs_regulatedentity").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        WorkOrder.operationTypeOnChange = operationTypeOnChange;
        function regulatedEntityOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var regionAttribute = form.getAttribute("msdyn_serviceterritory");
                var operationTypeAttribute = form.getAttribute("ovs_operationtypeid");
                var regulatedEntityAttribute = form.getAttribute("ovs_regulatedentity");
                var countryAttribute = form.getAttribute("ovs_ovscountry");
                if (regulatedEntityAttribute != null && regulatedEntityAttribute != undefined) {
                    // Clear out all dependent fields' value
                    if (!form.getControl("msdyn_serviceaccount").getDisabled() || form.getAttribute("msdyn_serviceaccount").getValue() != null) {
                        form.getAttribute("msdyn_serviceaccount").setValue(null);
                    }
                    // Disable all dependent fields
                    form.getControl("msdyn_serviceaccount").setDisabled(true);
                    // If an operation type is selected, we use the filtered fetchxml, otherwise, disable and clear out the dependent fields
                    var regionAttributeValue = regionAttribute.getValue();
                    var operationTypeAttributeValue = operationTypeAttribute.getValue();
                    var regulatedEntityAttributeValue = regulatedEntityAttribute.getValue();
                    var countryAttributeValue = countryAttribute.getValue();
                    if (regionAttributeValue != null && regionAttributeValue != undefined &&
                        operationTypeAttributeValue != null && operationTypeAttributeValue != undefined &&
                        regulatedEntityAttributeValue != null && regulatedEntityAttributeValue != undefined) {
                        var countryXML = "";
                        if (countryAttributeValue != null && countryAttributeValue != undefined) {
                            if (regionAttributeValue[0].name != "International") {
                                form.getControl("msdyn_serviceaccount").setDisabled(false);
                            }
                            else {
                                countryXML = '<condition attribute="ovs_country" operator="eq" value="' + countryAttributeValue[0].id + '"/>';
                            }
                        }
                        // Enable direct dependent field
                        form.getControl("msdyn_serviceaccount").setDisabled(false);
                        // Setup a custom view
                        // This value is never saved and only needs to be unique among the other available views for the lookup.
                        var viewId = '{6E57251F-F695-4076-9498-49AB892154B7}';
                        var entityName = "account";
                        var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredSites");
                        var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="accountid"><cell name="name" width="200" /><cell name="owner" width="125" /></row></grid>';
                        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"><entity name="account"><attribute name="name" /><attribute name="accountid" /><order attribute="name" descending="false" /><filter type="and"><condition attribute="customertypecode" operator="eq" value="948010001" /><condition attribute="msdyn_serviceterritory" operator="eq" value="' + regionAttributeValue[0].id + '" />' + countryXML + '</filter><link-entity name="ovs_operation" from="ovs_siteid" to="accountid" link-type="inner" alias="ab"><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeValue[0].id + '" /><condition attribute="ovs_regulatedentityid" operator="eq" value="' + regulatedEntityAttributeValue[0].id + '" /></filter></link-entity></entity></fetch>';
                        form.getControl("msdyn_serviceaccount").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        WorkOrder.regulatedEntityOnChange = regulatedEntityOnChange;
        function functionalLocationOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var assetCategoryAttribute = form.getAttribute("ovs_assetcategory");
                var functionalLocationAttribute = form.getAttribute("msdyn_functionallocation");
                if (functionalLocationAttribute != null && functionalLocationAttribute != undefined) {
                    // Clear out all dependent fields' value
                    if (!form.getControl("ovs_assetcategory").getDisabled() || form.getAttribute("ovs_assetcategory").getValue() != null) {
                        form.getAttribute("ovs_assetcategory").setValue(null);
                    }
                    // Disable all dependent fields
                    form.getControl("ovs_assetcategory").setDisabled(true);
                    // If an operation type is selected, we use the filtered fetchxml, otherwise, disable and clear out the dependent fields
                    var functionalLocationAttributeValue = functionalLocationAttribute.getValue();
                    if (functionalLocationAttributeValue != null && functionalLocationAttributeValue != undefined) {
                        // Enable direct dependent field
                        form.getControl("ovs_assetcategory").setVisible(true);
                        form.getControl("ovs_assetcategory").setDisabled(false);
                        // Setup a custom view
                        // This value is never saved and only needs to be unique among the other available views for the lookup.
                        var viewId = '{1A58459F-F987-5478-5823-49AB823644B1}';
                        var entityName = "msdyn_customerassetcategory";
                        var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredAssets");
                        var layoutXml = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_customerassetcategoryid"><cell name="msdyn_name" width="200" /></row></grid>';
                        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" ><entity name="msdyn_customerassetcategory" ><attribute name="msdyn_name" /><attribute name="msdyn_customerassetcategoryid" /><filter type="and" ><condition attribute="ovs_functionallocation" operator="eq" value="' + functionalLocationAttributeValue[0].id + '" /></filter> </entity></fetch>';
                        form.getControl("ovs_assetcategory").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        WorkOrder.functionalLocationOnChange = functionalLocationOnChange;
        function assetCategoryOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var assetAttribute = form.getAttribute("ovs_asset");
                var assetCategoryAttribute = form.getAttribute("ovs_assetcategory");
                if (assetCategoryAttribute != null && assetCategoryAttribute != undefined) {
                    // Clear out all dependent fields' value
                    if (!form.getControl("ovs_asset").getDisabled() || form.getAttribute("ovs_asset").getValue() != null) {
                        form.getAttribute("ovs_asset").setValue(null);
                    }
                    // Disable all dependent fields
                    form.getControl("ovs_asset").setDisabled(true);
                    // If an operation type is selected, we use the filtered fetchxml, otherwise, disable and clear out the dependent fields
                    var assetCategoryAttributeValue = assetCategoryAttribute.getValue();
                    if (assetCategoryAttributeValue != null && assetCategoryAttributeValue != undefined) {
                        // Enable direct dependent field
                        form.getControl("ovs_asset").setVisible(true);
                        form.getControl("ovs_asset").setDisabled(false);
                        // Setup a custom view
                        // This value is never saved and only needs to be unique among the other available views for the lookup.
                        var viewId = '{3A58459F-F182-5428-4871-49AA825243B3}';
                        var entityName = "msdyn_customerasset";
                        var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredAssetCategories");
                        var layoutXml = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_customerassetid"><cell name="msdyn_name" width="200" /></row></grid>';
                        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" ><entity name="msdyn_customerasset" ><attribute name="msdyn_name" /><attribute name="msdyn_customerassetid" /><filter type="and" ><condition attribute="msdyn_customerassetcategory" operator="eq" value="' + assetCategoryAttributeValue[0].id + '" /></filter> </entity></fetch>';
                        form.getControl("ovs_asset").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        WorkOrder.assetCategoryOnChange = assetCategoryOnChange;
        // FUNCTIONS
        function setDefaultFiscalYear(form) {
            XrmQuery.retrieveMultiple(function (x) { return x.tc_tcfiscalyears; })
                .select(function (x) { return [x.tc_name]; })
                .filter(function (x) { return Filter.equals(x.tc_iscurrentfiscalyear, true); })
                .execute(function (fiscalYears) {
                //should only return one fiscal year record as the current
                if (fiscalYears.length === 1) {
                    var targetedFiscalYear = fiscalYears[0];
                    var lookup = new Array();
                    lookup[0] = new Object();
                    lookup[0].id = targetedFiscalYear.tc_tcfiscalyearid;
                    lookup[0].name = targetedFiscalYear.tc_name;
                    lookup[0].entityType = 'tc_tcfiscalyear';
                    form.getAttribute('ovs_fiscalyear').setValue(lookup);
                }
                else {
                    // do not set a default if multiple records are found, error.
                }
            });
        }
        function removeSelectedFiscalQuarter(eContext) {
            var form = eContext.getFormContext();
            form.getAttribute('ovs_fiscalquarter').setValue(null);
        }
        function setRegion(form) {
            var currentUserId = Xrm.Utility.getGlobalContext().userSettings.userId;
            currentUserId = currentUserId.replace(/[{}]/g, "");
            // Get the user's territory
            Xrm.WebApi.online.retrieveRecord("systemuser", currentUserId, "?$select=_territoryid_value").then(function success(result) {
                if (result != null && result["_territoryid_value"] != null) {
                    // NOTE: Our localization plugin can't localize the territory name on system user
                    // So we do an extra call to the territory table to get the localized name
                    Xrm.WebApi.online.retrieveRecord("territory", result["_territoryid_value"], "?$select=name").then(function success(result) {
                        var territoryId = result["territoryid"];
                        var territoryName = result["name"];
                        var territoryLogicalName = "territory";
                        var lookup = new Array();
                        lookup[0] = new Object();
                        lookup[0].id = territoryId;
                        lookup[0].name = territoryName;
                        lookup[0].entityType = territoryLogicalName;
                        form.getAttribute('msdyn_serviceterritory').setValue(lookup);
                        // Enable the Operation Type if we've successfully set the Region
                        form.getControl("ovs_operationtypeid").setDisabled(false);
                    }, function (error) {
                        var alertStrings = { text: error.message };
                        var alertOptions = { height: 120, width: 260 };
                        Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function () { });
                    });
                }
            }, function (error) {
                var alertStrings = { text: error.message };
                var alertOptions = { height: 120, width: 260 };
                Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function () { });
            });
        }
        function systemStatusOnChange(eContext) {
            var formContext = eContext.getFormContext();
            var systemStatus = formContext.getAttribute("msdyn_systemstatus").getValue();
            //If system status is set to closed
            if (systemStatus == 690970004 || systemStatus == 690970005) {
                //Set state to Inactive
                formContext.getAttribute("statecode").setValue(1);
                //Set Status Reason to Closed
                formContext.getAttribute("statuscode").setValue(918640000);
            }
            else {
                //Keep record Active
                formContext.getAttribute("statecode").setValue(0);
                formContext.getAttribute("statuscode").setValue(1);
            }
        }
        WorkOrder.systemStatusOnChange = systemStatusOnChange;
        function stateCodeOnChange(eContext) {
            var formContext = eContext.getFormContext();
            var stateCode = formContext.getAttribute("statecode").getValue();
            //If statecode changed to Active
            if (stateCode == 0) {
                var systemStatus = formContext.getAttribute("msdyn_systemstatus").getValue();
                //If systemStatus is currently Closed
                if (systemStatus == 690970004 || systemStatus == 690970005) {
                    //Change systemstatus to Open - Completed
                    formContext.getAttribute("msdyn_systemstatus").setValue(690970003);
                    //Prevent User from discarding status change
                    formContext.data.save();
                }
            }
        }
        WorkOrder.stateCodeOnChange = stateCodeOnChange;
    })(WorkOrder = ROM.WorkOrder || (ROM.WorkOrder = {}));
})(ROM || (ROM = {}));
