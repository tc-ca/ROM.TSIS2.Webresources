"use strict";
/* eslint-disable @typescript-eslint/triple-slash-reference */
var ROM;
(function (ROM) {
    var WorkOrderCreationWizard;
    (function (WorkOrderCreationWizard) {
        // EVENTS
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            //const state = form.getAttribute("statecode").getValue();
            //Keep track of the current system status, to be used when cancelling a status change.
            //globalThis.currentSystemStatus = form.getAttribute("msdyn_systemstatus").getValue();
            //Set required fields
            form.getAttribute("ts_regionid").setRequiredLevel("required");
            form.getAttribute("ts_operationtypeid").setRequiredLevel("required");
            form.getAttribute("ts_siteid").setRequiredLevel("required");
            switch (form.ui.getFormType()) {
                case 1: //Create New Work Order
                    // Set default values
                    setRegion(form);
                    // Disable all operation related fields
                    form.getControl("ts_regionid").setDisabled(true);
                    form.getControl("ts_operationtypeid").setDisabled(true);
                    form.getControl("ts_siteid").setDisabled(true);
                    break;
                default:
                    // Enable all operation related fields
                    //form.getControl("ts_regionid").setDisabled(false);
                    //form.getControl("ts_operationtypeid").setDisabled(false);
                    //form.getControl("ts_stakeholderid").setDisabled(false);
                    //form.getControl("ts_siteid").setDisabled(false);
                    var regionAttribute = form.getAttribute("ts_regionid");
                    if (regionAttribute != null && regionAttribute != undefined) {
                        var regionAttributeValue = regionAttribute.getValue();
                        if (regionAttributeValue != null && regionAttributeValue != undefined) {
                            if (regionAttributeValue[0].id == "{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}") { //International
                                form.getControl("ts_countryid").setVisible(true);
                                form.getAttribute("ts_countryid").setRequiredLevel("required");
                            }
                        }
                        else {
                            form.getControl("ts_countryid").setVisible(false);
                        }
                    }
                    break;
            }
            // Lock some fields if there exist a Case that has this WO associated to it
            if (form.getAttribute("ts_caseid").getValue() != null) {
                form.getControl("ts_regionid").setDisabled(true);
                form.getControl("ts_countryid").setDisabled(true);
                form.getControl("ts_stakeholderid").setDisabled(true);
                form.getControl("ts_siteid").setDisabled(true);
            }
            ;
            if (form.getControl("ts_caseid") != null && form.getAttribute("ts_caseid").getValue() == null) {
                form.getControl("ts_caseid").setVisible(false);
            }
        }
        WorkOrderCreationWizard.onLoad = onLoad;
        function workOrderTypeOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var workOrderTypeAttribute = form.getAttribute("ts_workordertypeid");
                var regionAttribute = form.getAttribute("ts_regionid");
                var countryAttribute = form.getAttribute("ts_countryid");
                if (workOrderTypeAttribute != null && workOrderTypeAttribute != undefined) {
                    // Clear out all dependent fields' value if they are not already disabled and not already empty
                    if (!form.getControl("ts_operationtypeid").getDisabled() && form.getAttribute("ts_operationtypeid").getValue() != null) {
                        form.getAttribute("ts_operationtypeid").setValue(null);
                    }
                    if (!form.getControl("ts_stakeholderid").getDisabled() && form.getAttribute("ts_stakeholderid").getValue() != null) {
                        form.getAttribute("ts_stakeholderid").setValue(null);
                    }
                    if (!form.getControl("ts_siteid").getDisabled() && form.getAttribute("ts_siteid").getValue() != null) {
                        form.getAttribute("ts_siteid").setValue(null);
                        form.getAttribute("ts_operationid").setValue(null);
                    }
                    // Disable all dependent fields
                    if (form.getControl("ts_countryid").getDisabled() == false)
                        form.getControl("ts_countryid").setDisabled(true);
                    if (form.getControl("ts_operationtypeid").getDisabled() == false)
                        form.getControl("ts_operationtypeid").setDisabled(true);
                    if (form.getControl("ts_stakeholderid").getDisabled() == false)
                        form.getControl("ts_stakeholderid").setDisabled(true);
                    if (form.getControl("ts_siteid").getDisabled() == false)
                        form.getControl("ts_siteid").setDisabled(true);
                    var workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();
                    var regionAttributeValue = regionAttribute.getValue();
                    var countryAttributeValue = countryAttribute.getValue();
                    if (workOrderTypeAttributeValue != null && workOrderTypeAttributeValue != undefined) {
                        // Enable direct dependent field
                        form.getControl("ts_regionid").setDisabled(false);
                        if (regionAttributeValue != null && regionAttributeValue != undefined) {
                            if (regionAttributeValue[0].name != "International") {
                                setOperationTypeFilteredView(form, regionAttributeValue[0].id, "", workOrderTypeAttributeValue[0].id);
                            }
                            else {
                                form.getControl("ts_countryid").setDisabled(false);
                                setCountryFilteredView(form);
                                if (countryAttributeValue != null && countryAttributeValue != undefined) {
                                    var countryCondition = '<condition attribute="ts_country" operator="eq" value="' + countryAttributeValue[0].id + '" />';
                                    setOperationTypeFilteredView(form, regionAttributeValue[0].id, countryCondition, workOrderTypeAttributeValue[0].id);
                                }
                            }
                        }
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        WorkOrderCreationWizard.workOrderTypeOnChange = workOrderTypeOnChange;
        function regionOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var workOrderTypeAttribute = form.getAttribute("ts_workordertypeid");
                var regionAttribute = form.getAttribute("ts_regionid");
                if (regionAttribute != null && regionAttribute != undefined) {
                    // Clear out all dependent fields' value if they are not already disabled and not already empty
                    if (!form.getControl("ts_countryid").getDisabled() && form.getAttribute("ts_countryid").getValue() != null) {
                        form.getAttribute("ts_countryid").setValue(null);
                    }
                    if (!form.getControl("ts_operationtypeid").getDisabled() && form.getAttribute("ts_operationtypeid").getValue() != null) {
                        form.getAttribute("ts_operationtypeid").setValue(null);
                    }
                    if (!form.getControl("ts_stakeholderid").getDisabled() && form.getAttribute("ts_stakeholderid").getValue() != null) {
                        form.getAttribute("ts_stakeholderid").setValue(null);
                    }
                    if (!form.getControl("ts_siteid").getDisabled() && form.getAttribute("ts_siteid").getValue() != null) {
                        form.getAttribute("ts_siteid").setValue(null);
                        form.getAttribute("ts_operationid").setValue(null);
                    }
                    // Disable all dependent fields
                    form.getAttribute("ts_countryid").setRequiredLevel("none");
                    if (form.getControl("ts_countryid").getDisabled() == false)
                        form.getControl("ts_countryid").setVisible(false);
                    if (form.getControl("ts_operationtypeid").getDisabled() == false)
                        form.getControl("ts_operationtypeid").setDisabled(true);
                    if (form.getControl("ts_stakeholderid").getDisabled() == false)
                        form.getControl("ts_stakeholderid").setDisabled(true);
                    if (form.getControl("ts_siteid").getDisabled() == false)
                        form.getControl("ts_siteid").setDisabled(true);
                    // If previous fields have values, we use the filtered fetchxml in a custom lookup view
                    var workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();
                    var regionAttributeValue = regionAttribute.getValue();
                    if (workOrderTypeAttributeValue != null && workOrderTypeAttributeValue != undefined &&
                        regionAttributeValue != null && regionAttributeValue != undefined) {
                        // Enable direct dependent field
                        if (regionAttributeValue[0].name != "International") {
                            setOperationTypeFilteredView(form, regionAttributeValue[0].id, "", workOrderTypeAttributeValue[0].id);
                        }
                        else {
                            form.getControl("ts_countryid").setDisabled(false);
                            setCountryFilteredView(form);
                        }
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        WorkOrderCreationWizard.regionOnChange = regionOnChange;
        function countryOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var workOrderTypeAttribute = form.getAttribute("ts_workordertypeid");
                var regionAttribute = form.getAttribute("ts_regionid");
                var countryAttribute = form.getAttribute("ts_countryid");
                if (countryAttribute != null && countryAttribute != undefined) {
                    // Clear out all dependent fields' value if they are not already disabled and not already empty
                    if (!form.getControl("ts_operationtypeid").getDisabled() && form.getAttribute("ts_operationtypeid").getValue() != null) {
                        form.getAttribute("ts_operationtypeid").setValue(null);
                    }
                    if (!form.getControl("ts_stakeholderid").getDisabled() && form.getAttribute("ts_stakeholderid").getValue() != null) {
                        form.getAttribute("ts_stakeholderid").setValue(null);
                    }
                    if (!form.getControl("ts_siteid").getDisabled() && form.getAttribute("ts_siteid").getValue() != null) {
                        form.getAttribute("ts_siteid").setValue(null);
                        form.getAttribute("ts_operationid").setValue(null);
                    }
                    // Disable all dependent fields
                    if (form.getControl("ts_operationtypeid").getDisabled() == false)
                        form.getControl("ts_operationtypeid").setDisabled(true);
                    if (form.getControl("ts_stakeholderid").getDisabled() == false)
                        form.getControl("ts_stakeholderid").setDisabled(true);
                    if (form.getControl("ts_siteid").getDisabled() == false)
                        form.getControl("ts_siteid").setDisabled(true);
                    var workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();
                    var regionAttributeValue = regionAttribute.getValue();
                    var countryAttributeValue = countryAttribute.getValue();
                    if (workOrderTypeAttributeValue != null && workOrderTypeAttributeValue != undefined &&
                        regionAttributeValue != null && regionAttributeValue != undefined &&
                        countryAttributeValue != null && countryAttributeValue != undefined) {
                        var countryCondition = '<condition attribute="ts_country" operator="eq" value="' + countryAttributeValue[0].id + '" />';
                        setOperationTypeFilteredView(form, regionAttributeValue[0].id, countryCondition, workOrderTypeAttributeValue[0].id);
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        WorkOrderCreationWizard.countryOnChange = countryOnChange;
        function operationTypeOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var workOrderTypeAttribute = form.getAttribute("ts_workordertypeid");
                var regionAttribute = form.getAttribute("ts_regionid");
                var operationTypeAttribute = form.getAttribute("ts_operationtypeid");
                var countryAttribute = form.getAttribute("ts_countryid");
                if (operationTypeAttribute != null && operationTypeAttribute != undefined) {
                    // Clear out all dependent fields' value if they are not already disabled and not already empty
                    if (!form.getControl("ts_stakeholderid").getDisabled() && form.getAttribute("ts_stakeholderid").getValue() != null) {
                        form.getAttribute("ts_stakeholderid").setValue(null);
                    }
                    if (!form.getControl("ts_siteid").getDisabled() && form.getAttribute("ts_siteid").getValue() != null) {
                        form.getAttribute("ts_siteid").setValue(null);
                        form.getAttribute("ts_operationid").setValue(null);
                    }
                    // Disable all dependent fields
                    if (form.getControl("ts_stakeholderid").getDisabled() == false)
                        form.getControl("ts_stakeholderid").setDisabled(true);
                    if (form.getControl("ts_siteid").getDisabled() == false)
                        form.getControl("ts_siteid").setDisabled(true);
                    // If previous fields have values, we use the filtered fetchxml in a custom lookup view
                    var workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();
                    var regionAttributeValue = regionAttribute.getValue();
                    var operationTypeAttributeValue = operationTypeAttribute.getValue();
                    var countryAttributeValue = countryAttribute.getValue();
                    if (regionAttributeValue != null && regionAttributeValue != undefined &&
                        operationTypeAttributeValue != null && operationTypeAttributeValue != undefined &&
                        workOrderTypeAttributeValue != null && workOrderTypeAttributeValue != undefined) {
                        var countryCondition = "";
                        if (countryAttributeValue != null && countryAttributeValue != undefined) {
                            if (regionAttributeValue[0].name != "International") {
                                form.getControl("ts_siteid").setDisabled(false);
                            }
                            else {
                                countryCondition = '<condition attribute="ts_country" operator="eq" value="' + countryAttributeValue[0].id + '" />';
                            }
                        }
                        // Enable direct dependent field
                        form.getControl("ts_stakeholderid").setDisabled(false);
                        // Setup a custom view
                        // This value is never saved and only needs to be unique among the other available views for the lookup.
                        var viewId = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F660}';
                        var entityName = "account";
                        var viewDisplayName = "FilteredStakeholders";
                        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"><entity name="account"><attribute name="name" /><attribute name="accountid" /><order attribute="name" descending="false" /><filter type="and"><condition attribute="customertypecode" operator="eq" value="948010000" /><condition attribute="statecode" operator="eq" value="0" /></filter><link-entity name="msdyn_customerasset" from="msdyn_account" to="accountid" link-type="inner" alias="af"><filter type="and"><condition attribute="msdyn_customerassetcategory" operator="eq" value="' + operationTypeAttributeValue[0].id + '" /></filter><link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="msdyn_functionallocation" link-type="inner" alias="ag"><filter type="and"><condition attribute="ts_region" operator="eq" value="' + regionAttributeValue[0].id + '" />' + countryCondition + '</filter></link-entity></link-entity></entity></fetch>';
                        var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="accountid"><cell name="name" width="200" /></row></grid>';
                        form.getControl("ts_stakeholderid").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        WorkOrderCreationWizard.operationTypeOnChange = operationTypeOnChange;
        function stakeholderOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var regionAttribute = form.getAttribute("ts_regionid");
                var operationTypeAttribute = form.getAttribute("ts_operationtypeid");
                var stakeholderAttribute = form.getAttribute("ts_stakeholderid");
                var countryAttribute = form.getAttribute("ts_countryid");
                if (stakeholderAttribute != null && stakeholderAttribute != undefined) {
                    // Clear out all dependent fields' value if they are not already disabled and not already empty
                    if (!form.getControl("ts_siteid").getDisabled() && form.getAttribute("ts_siteid").getValue() != null) {
                        form.getAttribute("ts_siteid").setValue(null);
                        form.getAttribute("ts_operationid").setValue(null);
                    }
                    // Disable all dependent fields
                    if (form.getControl("ts_siteid").getDisabled() == false)
                        form.getControl("ts_siteid").setDisabled(true);
                    // If an operation type is selected, we use the filtered fetchxml, otherwise, disable and clear out the dependent fields
                    var regionAttributeValue = regionAttribute.getValue();
                    var operationTypeAttributeValue = operationTypeAttribute.getValue();
                    var stakeholderAttributeValue = stakeholderAttribute.getValue();
                    var countryAttributeValue = countryAttribute.getValue();
                    if (regionAttributeValue != null && regionAttributeValue != undefined &&
                        operationTypeAttributeValue != null && operationTypeAttributeValue != undefined &&
                        stakeholderAttributeValue != null && stakeholderAttributeValue != undefined) {
                        var countryCondition = "";
                        if (countryAttributeValue != null && countryAttributeValue != undefined && regionAttributeValue[0].name == "International") {
                            countryCondition = '<condition attribute="ts_country" operator="eq" value="' + countryAttributeValue[0].id + '"/>';
                        }
                        // Enable direct dependent field
                        form.getControl("ts_siteid").setDisabled(false);
                        // Custom view
                        var viewId = '{6E57251F-F695-4076-9498-49AB892154B7}';
                        var entityName = "msdyn_functionallocation";
                        var viewDisplayName = "FilteredSites";
                        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"><entity name="msdyn_functionallocation"><attribute name="msdyn_functionallocationid" /><attribute name="msdyn_name" /><order attribute="msdyn_name" descending="false" /><filter type="and"><condition attribute="ts_region" operator="eq" value="' + regionAttributeValue[0].id + '" /></filter><link-entity name="msdyn_msdyn_functionallocation_account" from="msdyn_functionallocationid" to="msdyn_functionallocationid" visible="false" intersect="true"><link-entity name="account" from="accountid" to="accountid" alias="ai"><filter type="and"><condition attribute="accountid" operator="eq" value="' + stakeholderAttributeValue[0].id + '" /></filter></link-entity></link-entity></entity></fetch > ';
                        var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="200" /></row></grid>';
                        form.getControl("ts_siteid").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        WorkOrderCreationWizard.stakeholderOnChange = stakeholderOnChange;
        function siteOnChange(eContext) {
            try {
                var form_1 = eContext.getFormContext();
                var operationTypeAttribute = form_1.getAttribute("ts_operationtypeid");
                var stakeholderAttribute = form_1.getAttribute("ts_stakeholderid");
                var siteAttribute = form_1.getAttribute("ts_siteid");
                if (siteAttribute != null && siteAttribute != undefined) {
                    // Clear out operation value if not already empty
                    if (form_1.getAttribute("ts_operationid").getValue() != null)
                        form_1.getAttribute("ts_operationid").setValue(null);
                    // Enable direct dependent field
                    form_1.getControl("ts_functionallocationid").setDisabled(false);
                    // If an operation type is selected, we use the filtered fetchxml, otherwise, disable and clear out the dependent fields
                    var operationTypeAttributeValue = operationTypeAttribute.getValue();
                    var stakeholderAttributeValue = stakeholderAttribute.getValue();
                    var siteAttributeValue = siteAttribute.getValue();
                    if (siteAttributeValue != null && siteAttributeValue != undefined &&
                        stakeholderAttributeValue != null && stakeholderAttributeValue != undefined &&
                        operationTypeAttributeValue != null && operationTypeAttributeValue != undefined) {
                        // Populate operation asset
                        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="msdyn_customerasset"><attribute name="msdyn_account" /><attribute name="msdyn_name" /><attribute name="msdyn_functionallocation" /><attribute name="msdyn_customerassetid" /><order attribute="msdyn_name" descending="true" /><filter type="and"><condition attribute="msdyn_customerassetcategory" operator="eq" value="' + operationTypeAttributeValue[0].id + '" /><condition attribute="msdyn_functionallocation" operator="eq" value="' + siteAttributeValue[0].id + '" /></filter></entity></fetch>';
                        var encodedFetchXml = encodeURIComponent(fetchXml);
                        Xrm.WebApi.retrieveMultipleRecords("msdyn_customerasset", "?fetchXml=" + encodedFetchXml).then(function success(result) {
                            if (result.entities.length == 1) {
                                var targetOperation = result.entities[0];
                                var lookup = new Array();
                                lookup[0] = new Object();
                                lookup[0].id = targetOperation.msdyn_customerassetid;
                                lookup[0].name = targetOperation.msdyn_name;
                                lookup[0].entityType = 'msdyn_customerasset';
                                form_1.getAttribute('ts_operationid').setValue(lookup);
                            }
                            else {
                                // do not set a default if multiple records are found, error.
                            }
                        }, function (error) {
                            showErrorMessageAlert(error);
                        });
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        WorkOrderCreationWizard.siteOnChange = siteOnChange;
        function caseOnChange(eContext) {
            var form = eContext.getFormContext();
            var caseAttribute = form.getAttribute("ts_caseid");
            if (caseAttribute.getValue() == null) {
                form.getControl("ts_regionid").setDisabled(false);
                form.getControl("ts_countryid").setDisabled(false);
                form.getControl("ts_stakeholderid").setDisabled(false);
                form.getControl("ts_siteid").setDisabled(false);
            }
        }
        WorkOrderCreationWizard.caseOnChange = caseOnChange;
        // FUNCTIONS
        function showErrorMessageAlert(error) {
            var alertStrings = { text: error.message };
            var alertOptions = { height: 120, width: 260 };
            Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function () { });
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
                        form.getAttribute('ts_regionid').setValue(lookup);
                        if (lookup[0].name == "International") {
                            form.getControl("ts_countryid").setVisible(true);
                            form.getAttribute("ts_countryid").setRequiredLevel("required");
                            form.getControl("ts_countryid").setDisabled(true);
                        }
                        else {
                            //setOperationTypeFilteredView(form, territoryId, "", "");
                            //form.getControl("ts_operationtypeid").setDisabled(true);
                        }
                        form.getControl("ts_regionid").setDisabled(false);
                    }, function (error) {
                        showErrorMessageAlert(error);
                    });
                }
            }, function (error) {
                showErrorMessageAlert(error);
            });
        }
        function setCountryFilteredView(form) {
            form.getControl("ts_countryid").setVisible(true);
            form.getAttribute("ts_countryid").setRequiredLevel("required");
            var viewId = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F662}';
            var entityName = "tc_country";
            var viewDisplayName = "FilteredCountries";
            var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"> <entity name="tc_country"> <attribute name="tc_countryid" /> <attribute name="tc_name" /> <order attribute="tc_name" descending="false" /> <filter type="and"> <condition attribute="statecode" operator="eq" value="0" /> </filter> <link-entity name="msdyn_functionallocation" from="ts_country" to="tc_countryid" link-type="inner" alias="aq"> <filter type="and"> <condition attribute="ts_region" operator="eq" value="{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}" /> </filter> <link-entity name="msdyn_customerasset" from="msdyn_functionallocation" to="msdyn_functionallocationid" link-type="inner" alias="ar"> <link-entity name="msdyn_customerassetcategory" from="msdyn_customerassetcategoryid" to="msdyn_customerassetcategory" link-type="inner" alias="as"> <filter type="and"> <condition attribute="ts_assetcategorytype" operator="eq" value="717750000" /> </filter> </link-entity> </link-entity> </link-entity> </entity> </fetch>';
            var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="tc_countryid"><cell name="tc_name" width="200" /></row></grid>';
            form.getControl("ts_countryid").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
        }
        function setOperationTypeFilteredView(form, regionAttributeId, countryCondition, workOrderTypeAttributeId) {
            form.getControl("ts_operationtypeid").setDisabled(false);
            var viewId = '{8982C38D-8BB4-4C95-BD05-493398FEAE99}';
            var entityName = "msdyn_customerassetcategory";
            var viewDisplayName = "FilteredOperationTypes";
            var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"> <entity name="msdyn_customerassetcategory"> <attribute name="msdyn_name" /> <attribute name="msdyn_customerassetcategoryid" /> <order attribute="msdyn_name" descending="false" /> <filter type="and"> <condition attribute="ts_assetcategorytype" operator="eq" value="717750000" /> </filter> <link-entity name="msdyn_customerasset" from="msdyn_customerassetcategory" to="msdyn_customerassetcategoryid" link-type="inner" alias="ac"> <link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="msdyn_functionallocation" link-type="inner" alias="ad"> <filter type="and"> <condition attribute="ts_region" operator="eq" value="' + regionAttributeId + '" />' + countryCondition + '</filter> </link-entity> </link-entity> <link-entity name="msdyn_incidenttype" from="ts_operationtype" to="msdyn_customerassetcategoryid" link-type="inner" alias="ar"> <filter type="and"> <condition attribute="msdyn_defaultworkordertype" operator="eq" value="' + workOrderTypeAttributeId + '" /> </filter> </link-entity> </entity> </fetch>';
            var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="msdyn_customerassetcategoryid"><cell name="msdyn_name" width="200" /></row></grid>';
            form.getControl("ts_operationtypeid").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
        }
    })(WorkOrderCreationWizard = ROM.WorkOrderCreationWizard || (ROM.WorkOrderCreationWizard = {}));
})(ROM || (ROM = {}));
