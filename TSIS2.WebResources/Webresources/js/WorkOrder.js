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
            updateCaseView(eContext);
            //Set required fields
            form.getAttribute("ts_region").setRequiredLevel("required");
            form.getAttribute("ovs_assetcategory").setRequiredLevel("required");
            form.getAttribute("ts_site").setRequiredLevel("required");
            //Prevent enabling controls if record is Inactive and set the right views (active/inactive)
            if (state == 1) {
                setWorkOrderServiceTasksView(form, false);
                return;
            }
            else { //If the work order is active, show the active views
                setWorkOrderServiceTasksView(form, true);
            }
            switch (form.ui.getFormType()) {
                case 1: //Create New Work Order
                    // Set default values
                    setDefaultFiscalYear(form);
                    setRegion(form);
                    var lookup = new Array();
                    lookup[0] = new Object();
                    lookup[0].id = "{47F438C7-C104-EB11-A813-000D3AF3A7A7}";
                    lookup[0].name = "Unplanned";
                    lookup[0].entityType = "ovs_tyrational";
                    form.getAttribute("ovs_rational").setValue(lookup); //Unplanned
                    // Disable all operation related fields
                    form.getControl("ts_region").setDisabled(true);
                    form.getControl("ovs_assetcategory").setDisabled(true);
                    form.getControl("ts_site").setDisabled(true);
                    form.getControl("msdyn_primaryincidenttype").setDisabled(true);
                    break;
                default:
                    // Enable all operation related fields
                    form.getControl("ts_region").setDisabled(false);
                    form.getControl("ovs_assetcategory").setDisabled(false);
                    form.getControl("msdyn_serviceaccount").setDisabled(false);
                    form.getControl("ts_site").setDisabled(false);
                    form.getControl("msdyn_primaryincidenttype").setDisabled(false);
                    var regionAttribute = form.getAttribute("ts_region");
                    if (regionAttribute != null && regionAttribute != undefined) {
                        var regionAttributeValue = regionAttribute.getValue();
                        if (regionAttributeValue != null && regionAttributeValue != undefined) {
                            if (regionAttributeValue[0].id == "{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}") { //International
                                form.getControl("ts_country").setVisible(true);
                                form.getAttribute("ts_country").setRequiredLevel("required");
                            }
                        }
                        else {
                            form.getControl("ts_country").setVisible(false);
                        }
                    }
                    break;
            }
            // Lock some fields if there exist a Case that has this WO associated to it
            var fetchXML = "<fetch><entity name=\"msdyn_workorder\"><attribute name=\"msdyn_workorderid\"/><filter><condition attribute=\"msdyn_workorderid\" operator=\"eq\" value=\"" + form.data.entity.getId() + "\"/></filter><link-entity name=\"incident\" from=\"incidentid\" to=\"msdyn_servicerequest\"/></entity></fetch>";
            fetchXML = "?fetchXml=" + encodeURIComponent(fetchXML);
            Xrm.WebApi.retrieveMultipleRecords("msdyn_workorder", fetchXML).then(function success(result) {
                if (result.entities.length > 0) {
                    form.getControl("ts_region").setDisabled(true);
                    form.getControl("ts_country").setDisabled(true);
                    form.getControl("msdyn_serviceaccount").setDisabled(true);
                    form.getControl("ts_site").setDisabled(true);
                }
            }, function (error) {
            });
        }
        WorkOrder.onLoad = onLoad;
        function onSave(eContext) {
            var form = eContext.getFormContext();
            var systemStatus = form.getAttribute("msdyn_systemstatus").getValue();
            var workOrderServiceTaskData;
            if (systemStatus == 690970004) { //Only close associated entities when Record Status is set to Closed - Posted
                workOrderServiceTaskData =
                    {
                        "statecode": 1,
                        "statuscode": 918640003 //open -> 918640002
                    };
                //Close/Open associated work order service task(s)
                closeWorkOrderServiceTasks(form, workOrderServiceTaskData);
                //Set inactive views
                setWorkOrderServiceTasksView(form, false);
            }
        }
        WorkOrder.onSave = onSave;
        function workOrderTypeOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var workOrderTypeAttribute = form.getAttribute("msdyn_workordertype");
                var regionAttribute = form.getAttribute("ts_region");
                var countryAttribute = form.getAttribute("ts_country");
                if (workOrderTypeAttribute != null && workOrderTypeAttribute != undefined) {
                    // Clear out all dependent fields' value
                    if (!form.getControl("ovs_assetcategory").getDisabled() || form.getAttribute("ovs_assetcategory").getValue() != null) {
                        form.getAttribute("ovs_assetcategory").setValue(null);
                    }
                    if (!form.getControl("msdyn_serviceaccount").getDisabled() || form.getAttribute("msdyn_serviceaccount").getValue() != null) {
                        form.getAttribute("msdyn_serviceaccount").setValue(null);
                    }
                    if (!form.getControl("ts_site").getDisabled() || form.getAttribute("ts_site").getValue() != null) {
                        form.getAttribute("ts_site").setValue(null);
                    }
                    if (!form.getControl("msdyn_primaryincidenttype").getDisabled() || form.getAttribute("msdyn_primaryincidenttype").getValue() != null) {
                        form.getAttribute("msdyn_primaryincidenttype").setValue(null);
                    }
                    // Disable all dependent fields
                    form.getControl("ts_country").setDisabled(true);
                    form.getControl("ovs_assetcategory").setDisabled(true);
                    form.getControl("msdyn_serviceaccount").setDisabled(true);
                    form.getControl("ts_site").setDisabled(true);
                    form.getControl("msdyn_primaryincidenttype").setDisabled(true);
                    var workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();
                    var regionAttributeValue = regionAttribute.getValue();
                    var countryAttributeValue = countryAttribute.getValue();
                    if (workOrderTypeAttributeValue != null && workOrderTypeAttributeValue != undefined) {
                        // Enable direct dependent field
                        form.getControl("ts_region").setDisabled(false);
                        if (regionAttributeValue != null && regionAttributeValue != undefined) {
                            if (regionAttributeValue[0].name != "International") {
                                setOperationTypeFilteredView(form, regionAttributeValue[0].id, "", workOrderTypeAttributeValue[0].id);
                            }
                            else {
                                form.getControl("ts_country").setDisabled(false);
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
        WorkOrder.workOrderTypeOnChange = workOrderTypeOnChange;
        function regionOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var workOrderTypeAttribute = form.getAttribute("msdyn_workordertype");
                var regionAttribute = form.getAttribute("ts_region");
                if (regionAttribute != null && regionAttribute != undefined) {
                    // Clear out all dependent fields' value
                    if (!form.getControl("ts_country").getDisabled() || form.getAttribute("ts_country").getValue() != null) {
                        form.getAttribute("ts_country").setValue(null);
                    }
                    if (!form.getControl("ovs_assetcategory").getDisabled() || form.getAttribute("ovs_assetcategory").getValue() != null) {
                        form.getAttribute("ovs_assetcategory").setValue(null);
                    }
                    if (!form.getControl("msdyn_serviceaccount").getDisabled() || form.getAttribute("msdyn_serviceaccount").getValue() != null) {
                        form.getAttribute("msdyn_serviceaccount").setValue(null);
                    }
                    if (!form.getControl("ts_site").getDisabled() || form.getAttribute("ts_site").getValue() != null) {
                        form.getAttribute("ts_site").setValue(null);
                    }
                    if (!form.getControl("msdyn_primaryincidenttype").getDisabled() || form.getAttribute("msdyn_primaryincidenttype").getValue() != null) {
                        form.getAttribute("msdyn_primaryincidenttype").setValue(null);
                    }
                    // Disable all dependent fields
                    form.getAttribute("ts_country").setRequiredLevel("none");
                    form.getControl("ts_country").setVisible(false);
                    form.getControl("ovs_assetcategory").setDisabled(true);
                    form.getControl("msdyn_serviceaccount").setDisabled(true);
                    form.getControl("ts_site").setDisabled(true);
                    form.getControl("msdyn_primaryincidenttype").setDisabled(true);
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
                            form.getControl("ts_country").setDisabled(false);
                            setCountryFilteredView(form);
                        }
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
                var workOrderTypeAttribute = form.getAttribute("msdyn_workordertype");
                var regionAttribute = form.getAttribute("ts_region");
                var countryAttribute = form.getAttribute("ts_country");
                if (countryAttribute != null && countryAttribute != undefined) {
                    // Clear out all dependent fields' value
                    if (!form.getControl("ovs_assetcategory").getDisabled() || form.getAttribute("ovs_assetcategory").getValue() != null) {
                        form.getAttribute("ovs_assetcategory").setValue(null);
                    }
                    if (!form.getControl("msdyn_serviceaccount").getDisabled() || form.getAttribute("msdyn_serviceaccount").getValue() != null) {
                        form.getAttribute("msdyn_serviceaccount").setValue(null);
                    }
                    if (!form.getControl("ts_site").getDisabled() || form.getAttribute("ts_site").getValue() != null) {
                        form.getAttribute("ts_site").setValue(null);
                    }
                    if (!form.getControl("msdyn_primaryincidenttype").getDisabled() || form.getAttribute("msdyn_primaryincidenttype").getValue() != null) {
                        form.getAttribute("msdyn_primaryincidenttype").setValue(null);
                    }
                    // Disable all dependent fields
                    form.getControl("ovs_assetcategory").setDisabled(true);
                    form.getControl("msdyn_serviceaccount").setDisabled(true);
                    form.getControl("ts_site").setDisabled(true);
                    form.getControl("msdyn_primaryincidenttype").setDisabled(true);
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
        WorkOrder.countryOnChange = countryOnChange;
        function fiscalYearOnChange(eContext) {
            //if new fiscal year is selected, then previous selection of quarter no longer corresponds
            removeSelectedFiscalQuarter(eContext);
        }
        WorkOrder.fiscalYearOnChange = fiscalYearOnChange;
        function operationTypeOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var workOrderTypeAttribute = form.getAttribute("msdyn_workordertype");
                var regionAttribute = form.getAttribute("ts_region");
                var operationTypeAttribute = form.getAttribute("ovs_assetcategory");
                var countryAttribute = form.getAttribute("ts_country");
                if (operationTypeAttribute != null && operationTypeAttribute != undefined) {
                    // Clear out all dependent fields' value
                    if (!form.getControl("msdyn_serviceaccount").getDisabled() || form.getAttribute("msdyn_serviceaccount").getValue() != null) {
                        form.getAttribute("msdyn_serviceaccount").setValue(null);
                    }
                    if (!form.getControl("ts_site").getDisabled() || form.getAttribute("ts_site").getValue() != null) {
                        form.getAttribute("ts_site").setValue(null);
                    }
                    if (!form.getControl("msdyn_primaryincidenttype").getDisabled() || form.getAttribute("msdyn_primaryincidenttype").getValue() != null) {
                        form.getAttribute("msdyn_primaryincidenttype").setValue(null);
                    }
                    // Disable all dependent fields
                    form.getControl("msdyn_serviceaccount").setDisabled(true);
                    form.getControl("ts_site").setDisabled(true);
                    form.getControl("msdyn_primaryincidenttype").setDisabled(true);
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
                                form.getControl("ts_site").setDisabled(false);
                            }
                            else {
                                countryCondition = '<condition attribute="ts_country" operator="eq" value="' + countryAttributeValue[0].id + '" />';
                            }
                        }
                        // Enable direct dependent field
                        form.getControl("msdyn_serviceaccount").setDisabled(false);
                        form.getControl("msdyn_primaryincidenttype").setDisabled(false);
                        // Setup a custom view
                        // This value is never saved and only needs to be unique among the other available views for the lookup.
                        var viewId = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F660}';
                        var entityName = "account";
                        var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredStakeholders");
                        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"><entity name="account"><attribute name="name" /><attribute name="accountid" /><order attribute="name" descending="false" /><filter type="and"><condition attribute="customertypecode" operator="eq" value="948010000" /><condition attribute="statecode" operator="eq" value="0" /></filter><link-entity name="msdyn_customerasset" from="msdyn_account" to="accountid" link-type="inner" alias="af"><filter type="and"><condition attribute="msdyn_customerassetcategory" operator="eq" value="' + operationTypeAttributeValue[0].id + '" /></filter><link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="msdyn_functionallocation" link-type="inner" alias="ag"><filter type="and"><condition attribute="ts_region" operator="eq" value="' + regionAttributeValue[0].id + '" />' + countryCondition + '</filter></link-entity></link-entity></entity></fetch>';
                        var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="accountid"><cell name="name" width="200" /></row></grid>';
                        form.getControl("msdyn_serviceaccount").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                        //Custom view for Activity Type
                        var viewIdActivity = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F661}';
                        var entityNameActivity = "msdyn_incidenttype";
                        var viewDisplayNameActivity = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredActivityType");
                        var fetchXmlActivity = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="msdyn_incidenttype"><attribute name="msdyn_name" /><attribute name="msdyn_incidenttypeid" /><order attribute="msdyn_name" descending="false" /><filter type="and"><condition attribute="ts_operationtype" operator="eq" value="' + operationTypeAttributeValue[0].id + '" /><condition attribute="msdyn_defaultworkordertype" operator="eq" value="' + workOrderTypeAttributeValue[0].id + '" /></filter></entity></fetch>';
                        var layoutXmlActivity = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_incidenttypeid"><cell name="msdyn_name" width="200" /></row></grid>';
                        form.getControl("msdyn_primaryincidenttype").addCustomView(viewIdActivity, entityNameActivity, viewDisplayNameActivity, fetchXmlActivity, layoutXmlActivity, true);
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        WorkOrder.operationTypeOnChange = operationTypeOnChange;
        function stakeholderOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var regionAttribute = form.getAttribute("ts_region");
                var operationTypeAttribute = form.getAttribute("ovs_assetcategory");
                var stakeholderAttribute = form.getAttribute("msdyn_serviceaccount");
                var countryAttribute = form.getAttribute("ts_country");
                if (stakeholderAttribute != null && stakeholderAttribute != undefined) {
                    // Clear out all dependent fields' value
                    if (!form.getControl("ts_site").getDisabled() || form.getAttribute("ts_site").getValue() != null) {
                        form.getAttribute("ts_site").setValue(null);
                    }
                    // Disable all dependent fields
                    form.getControl("ts_site").setDisabled(true);
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
                        form.getControl("ts_site").setDisabled(false);
                        // Custom view
                        var viewId = '{6E57251F-F695-4076-9498-49AB892154B7}';
                        var entityName = "msdyn_functionallocation";
                        var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredSites");
                        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"><entity name="msdyn_functionallocation"><attribute name="msdyn_functionallocationid" /><attribute name="msdyn_name" /><order attribute="msdyn_name" descending="false" /><filter type="and"><condition attribute="statecode" operator="eq" value="0" /><condition attribute="ts_region" operator="eq" value="' + regionAttributeValue[0].id + '" />' + countryCondition + '</filter><link-entity name="msdyn_customerasset" from="msdyn_functionallocation" to="msdyn_functionallocationid" link-type="inner" alias="aq"><filter type="and"><condition attribute="msdyn_customerassetcategory" operator="eq" value="' + operationTypeAttributeValue[0].id + '" /><condition attribute="msdyn_account" operator="eq" value="' + stakeholderAttributeValue[0].id + '" /></filter></link-entity></entity></fetch>';
                        var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="200" /></row></grid>';
                        form.getControl("ts_site").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        WorkOrder.stakeholderOnChange = stakeholderOnChange;
        function siteOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var operationTypeAttribute = form.getAttribute("ovs_assetcategory");
                var siteAttribute = form.getAttribute("ts_site");
                if (siteAttribute != null && siteAttribute != undefined) {
                    // Clear out all dependent fields' value
                    if (!form.getControl("ovs_asset").getDisabled() || form.getAttribute("ovs_asset").getValue() != null) {
                        form.getAttribute("ovs_asset").setValue(null);
                    }
                    // Disable all dependent fields
                    form.getControl("ovs_asset").setDisabled(true);
                    // If an operation type is selected, we use the filtered fetchxml, otherwise, disable and clear out the dependent fields
                    var operationTypeAttributeValue = operationTypeAttribute.getValue();
                    var siteAttributeValue = siteAttribute.getValue();
                    if (siteAttributeValue != null && siteAttributeValue != undefined &&
                        operationTypeAttributeValue != null && operationTypeAttributeValue != undefined) {
                        // Enable direct dependent field
                        form.getControl("ovs_asset").setDisabled(false);
                        // Setup a custom view
                        // This value is never saved and only needs to be unique among the other available views for the lookup.
                        var viewId = '{C0DAF55B-505E-410C-B0CD-CD0F24F63233}';
                        var entityName = "msdyn_customerasset";
                        var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredOperations");
                        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="msdyn_customerasset"><attribute name="msdyn_account" /><attribute name="msdyn_name" /><attribute name="msdyn_functionallocation" /><attribute name="msdyn_customerassetid" /><order attribute="msdyn_name" descending="true" /><filter type="and"><condition attribute="msdyn_customerassetcategory" operator="eq" value="' + operationTypeAttributeValue[0].id + '" /><condition attribute="msdyn_functionallocation" operator="eq" value="' + siteAttributeValue[0].id + '" /></filter></entity></fetch>';
                        var layoutXml = '<grid name="resultset" object="10300" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_customerassetid"><cell name="msdyn_name" width="200" /></row></grid>';
                        form.getControl("ovs_asset").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        WorkOrder.siteOnChange = siteOnChange;
        function systemStatusOnChange(eContext) {
            var form = eContext.getFormContext();
            var systemStatus = form.getAttribute("msdyn_systemstatus").getValue();
            //If system status is set to closed
            if (systemStatus == 690970004 || systemStatus == 690970005) {
                //Set state to Inactive
                form.getAttribute("statecode").setValue(1);
                //Set Status Reason to Closed
                form.getAttribute("statuscode").setValue(918640000);
            }
            else {
                //Keep record Active
                form.getAttribute("statecode").setValue(0);
                form.getAttribute("statuscode").setValue(1);
            }
        }
        WorkOrder.systemStatusOnChange = systemStatusOnChange;
        function caseOnChange(eContext) {
            var form = eContext.getFormContext();
            var caseAttribute = form.getAttribute("msdyn_servicerequest");
            if (caseAttribute.getValue() == null) {
                form.getControl("ts_region").setDisabled(false);
                form.getControl("ts_country").setDisabled(false);
                form.getControl("msdyn_serviceaccount").setDisabled(false);
                form.getControl("ts_site").setDisabled(false);
            }
        }
        WorkOrder.caseOnChange = caseOnChange;
        function stateCodeOnChange(eContext) {
            var form = eContext.getFormContext();
            var stateCode = form.getAttribute("statecode").getValue();
            //If statecode changed to Active
            if (stateCode == 0) {
                var systemStatus = form.getAttribute("msdyn_systemstatus").getValue();
                //If systemStatus is currently Closed
                if (systemStatus == 690970004 || systemStatus == 690970005) {
                    //Change systemstatus to Open - Completed
                    form.getAttribute("msdyn_systemstatus").setValue(690970003);
                    //Prevent User from discarding status change
                    form.data.save();
                }
            }
        }
        WorkOrder.stateCodeOnChange = stateCodeOnChange;
        function updateCaseView(eContext) {
            try {
                var form_1 = eContext.getFormContext();
                var caseAttribute = form_1.getAttribute("msdyn_servicerequest");
                var regionAttribute = form_1.getAttribute("ts_region");
                var countryAttribute = form_1.getAttribute("ts_country");
                var stakeholderAttribute = form_1.getAttribute("msdyn_serviceaccount");
                var siteAttribute = form_1.getAttribute("ts_site");
                var caseAttributeValue = caseAttribute.getValue();
                var regionAttributeValue_1 = regionAttribute.getValue();
                var countryAttributeValue_1 = countryAttribute.getValue();
                var stakeholderAttributeValue_1 = stakeholderAttribute.getValue();
                var siteAttributeValue_1 = siteAttribute.getValue();
                var regionCondition = regionAttributeValue_1 == null ? "" : '<condition attribute="ovs_region" operator="eq" value="' + regionAttributeValue_1[0].id + '" />';
                var countryCondition = countryAttributeValue_1 == null ? "" : '<condition attribute="ts_country" operator="eq" value="' + countryAttributeValue_1[0].id + '" />';
                var stakeholderCondition = stakeholderAttributeValue_1 == null ? "" : '<condition attribute="customerid" operator="eq" value="' + stakeholderAttributeValue_1[0].id + '" />';
                var siteCondition = siteAttributeValue_1 == null ? "" : '<condition attribute="msdyn_functionallocation" operator="eq" value="' + siteAttributeValue_1[0].id + '" />';
                if (caseAttribute != null && caseAttribute != undefined) {
                    if (caseAttributeValue != null) {
                        Xrm.WebApi.online.retrieveRecord("incident", caseAttributeValue[0].id.replace(/({|})/g, ''), "?$select=_ovs_region_value, _ts_country_value, _customerid_value, _msdyn_functionallocation_value").then(function success(result) {
                            if ((regionCondition != "" && (result != null && regionAttributeValue_1 != null && regionAttributeValue_1[0].id.replace(/({|})/g, '') != result._ovs_region_value.toUpperCase())) ||
                                (countryCondition != "" && (result != null && countryAttributeValue_1 != null && countryAttributeValue_1[0].id.replace(/({|})/g, '') != result._tc_country_value.toUpperCase())) ||
                                (stakeholderCondition != "" && (result != null && stakeholderAttributeValue_1 != null && stakeholderAttributeValue_1[0].id.replace(/({|})/g, '') != result._ts_stakeholder_value.toUpperCase())) ||
                                (siteCondition != "" && (result != null && siteAttributeValue_1 != null && siteAttributeValue_1[0].id.replace(/({|})/g, '') != result._ovs_site_value.toUpperCase()))) {
                                form_1.getAttribute("msdyn_servicerequest").setValue(null);
                            }
                        }, function (error) {
                            showErrorMessageAlert(error);
                        });
                    }
                    // Setup a custom view
                    // This value is never saved and only needs to be unique among the other available views for the lookup.
                    var viewId = '{5B58559F-F162-5428-4771-79BC825240B3}';
                    var entityName = "incident";
                    var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredCases");
                    var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"> <entity name="incident"> <attribute name="ticketnumber" /> <attribute name="incidentid" /> <order attribute="ticketnumber" descending="false" /> <filter type="and">' + regionCondition + countryCondition + stakeholderCondition + siteCondition + ' </filter> </entity> </fetch>';
                    var layoutXml = '<grid name="resultset" object="10010" jump="title" select="1" icon="1" preview="1"><row name="result" id="incidentid"><cell name="title" width="200" /></row></grid>';
                    form_1.getControl("msdyn_servicerequest").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        WorkOrder.updateCaseView = updateCaseView;
        // FUNCTIONS
        function showErrorMessageAlert(error) {
            var alertStrings = { text: error.message };
            var alertOptions = { height: 120, width: 260 };
            Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function () { });
        }
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
                        form.getAttribute('ts_region').setValue(lookup);
                        if (lookup[0].name == "International") {
                            form.getControl("ts_country").setVisible(true);
                            form.getAttribute("ts_country").setRequiredLevel("required");
                            form.getControl("ts_country").setDisabled(true);
                        }
                        else {
                            //setOperationTypeFilteredView(form, territoryId, "", "");
                            //form.getControl("ovs_assetcategory").setDisabled(true);
                        }
                        form.getControl("ts_region").setDisabled(false);
                    }, function (error) {
                        showErrorMessageAlert(error);
                    });
                }
            }, function (error) {
                showErrorMessageAlert(error);
            });
        }
        function setCountryFilteredView(form) {
            form.getControl("ts_country").setVisible(true);
            form.getAttribute("ts_country").setRequiredLevel("required");
            var viewId = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F662}';
            var entityName = "tc_country";
            var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredCountries");
            var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"> <entity name="tc_country"> <attribute name="tc_countryid" /> <attribute name="tc_name" /> <order attribute="tc_name" descending="false" /> <filter type="and"> <condition attribute="statecode" operator="eq" value="0" /> </filter> <link-entity name="msdyn_functionallocation" from="ts_country" to="tc_countryid" link-type="inner" alias="aq"> <filter type="and"> <condition attribute="ts_region" operator="eq" value="{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}" /> </filter> <link-entity name="msdyn_customerasset" from="msdyn_functionallocation" to="msdyn_functionallocationid" link-type="inner" alias="ar"> <link-entity name="msdyn_customerassetcategory" from="msdyn_customerassetcategoryid" to="msdyn_customerassetcategory" link-type="inner" alias="as"> <filter type="and"> <condition attribute="ts_assetcategorytype" operator="eq" value="717750000" /> </filter> </link-entity> </link-entity> </link-entity> </entity> </fetch>';
            var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="tc_countryid"><cell name="tc_name" width="200" /></row></grid>';
            form.getControl("ts_country").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
        }
        function setOperationTypeFilteredView(form, regionAttributeId, countryCondition, workOrderTypeAttributeId) {
            form.getControl("ovs_assetcategory").setDisabled(false);
            var viewId = '{8982C38D-8BB4-4C95-BD05-493398FEAE99}';
            var entityName = "msdyn_customerassetcategory";
            var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredOperationTypes");
            var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"> <entity name="msdyn_customerassetcategory"> <attribute name="msdyn_name" /> <attribute name="msdyn_customerassetcategoryid" /> <order attribute="msdyn_name" descending="false" /> <filter type="and"> <condition attribute="ts_assetcategorytype" operator="eq" value="717750000" /> </filter> <link-entity name="msdyn_customerasset" from="msdyn_customerassetcategory" to="msdyn_customerassetcategoryid" link-type="inner" alias="ac"> <link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="msdyn_functionallocation" link-type="inner" alias="ad"> <filter type="and"> <condition attribute="ts_region" operator="eq" value="' + regionAttributeId + '" />' + countryCondition + '</filter> </link-entity> </link-entity> <link-entity name="msdyn_incidenttype" from="ts_operationtype" to="msdyn_customerassetcategoryid" link-type="inner" alias="ar"> <filter type="and"> <condition attribute="msdyn_defaultworkordertype" operator="eq" value="' + workOrderTypeAttributeId + '" /> </filter> </link-entity> </entity> </fetch>';
            var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="msdyn_customerassetcategoryid"><cell name="msdyn_name" width="200" /></row></grid>';
            form.getControl("ovs_assetcategory").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
        }
        function closeWorkOrderServiceTasks(formContext, workOrderServiceTaskData) {
            Xrm.WebApi.online.retrieveMultipleRecords("msdyn_workorderservicetask", "?$select=msdyn_workorder&$filter=msdyn_workorder/msdyn_workorderid eq " + formContext.data.entity.getId()).then(function success(result) {
                for (var i = 0; i < result.entities.length; i++) {
                    Xrm.WebApi.updateRecord("msdyn_workorderservicetask", result.entities[i].msdyn_workorderservicetaskid, workOrderServiceTaskData).then(function success(result) {
                        //work order service task closed successfully
                    }, function (error) {
                        showErrorMessageAlert(error);
                    });
                }
            }, function (error) {
                showErrorMessageAlert(error);
            });
        }
        function setWorkOrderServiceTasksView(form, active) {
            var workOrderView;
            if (active) {
                workOrderView =
                    {
                        entityType: "savedquery",
                        id: "{C9FD8F4D-8184-4DDB-A31A-89E66E8E710E}",
                        name: "Active Work Order Service Tasks"
                    };
            }
            else {
                workOrderView =
                    {
                        entityType: "savedquery",
                        id: "{2F145106-BCB3-4F0F-9D02-E8C3B6BB25E8}",
                        name: "Inactive Work Order Service Tasks"
                    };
            }
            if (form.getControl("workorderservicetasksgrid").getViewSelector().getCurrentView() != workOrderView) {
                form.getControl("workorderservicetasksgrid").getViewSelector().setCurrentView(workOrderView);
            }
        }
    })(WorkOrder = ROM.WorkOrder || (ROM.WorkOrder = {}));
})(ROM || (ROM = {}));
