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
            //Keep track of the current system status, to be used when cancelling a status change.
            globalThis.currentSystemStatus = form.getAttribute("msdyn_systemstatus").getValue();
            updateCaseView(eContext);
            //Set required fields
            form.getAttribute("ts_region").setRequiredLevel("required");
            form.getAttribute("ovs_operationtypeid").setRequiredLevel("required");
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
                    form.getControl("ovs_operationtypeid").setDisabled(true);
                    form.getControl("ts_site").setDisabled(true);
                    form.getControl("msdyn_primaryincidenttype").setDisabled(true);
                    form.getControl("msdyn_functionallocation").setDisabled(true);
                    break;
                default:
                    // Enable all operation related fields
                    form.getControl("ts_region").setDisabled(false);
                    form.getControl("ovs_operationtypeid").setDisabled(false);
                    form.getControl("ts_tradenameid").setDisabled(false);
                    //form.getControl("msdyn_serviceaccount").setDisabled(false);
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
                    form.getControl("ts_tradenameid").setDisabled(true);
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
                    // Clear out all dependent fields' value if they are not already disabled and not already empty
                    if (!form.getControl("ovs_operationtypeid").getDisabled() && form.getAttribute("ovs_operationtypeid").getValue() != null) {
                        form.getAttribute("ovs_operationtypeid").setValue(null);
                    }
                    if (!form.getControl("ts_tradenameid").getDisabled() && form.getAttribute("ts_tradenameid").getValue() != null) {
                        form.getAttribute("ts_tradenameid").setValue(null);
                    }
                    if (!form.getControl("msdyn_serviceaccount").getDisabled() && form.getAttribute("msdyn_serviceaccount").getValue() != null) {
                        form.getAttribute("msdyn_serviceaccount").setValue(null);
                    }
                    if (!form.getControl("ts_site").getDisabled() && form.getAttribute("ts_site").getValue() != null) {
                        form.getAttribute("ts_site").setValue(null);
                        form.getAttribute("ovs_operationid").setValue(null);
                    }
                    if (!form.getControl("msdyn_primaryincidenttype").getDisabled() && form.getAttribute("msdyn_primaryincidenttype").getValue() != null) {
                        form.getAttribute("msdyn_primaryincidenttype").setValue(null);
                    }
                    // Disable all dependent fields
                    if (form.getControl("ts_country").getDisabled() == false)
                        form.getControl("ts_country").setDisabled(true);
                    if (form.getControl("ovs_operationtypeid").getDisabled() == false)
                        form.getControl("ovs_operationtypeid").setDisabled(true);
                    if (form.getControl("ts_tradenameid").getDisabled() == false)
                        form.getControl("ts_tradenameid").setDisabled(true);
                    if (form.getControl("msdyn_serviceaccount").getDisabled() == false)
                        form.getControl("msdyn_serviceaccount").setDisabled(true);
                    if (form.getControl("ts_site").getDisabled() == false)
                        form.getControl("ts_site").setDisabled(true);
                    if (form.getControl("msdyn_primaryincidenttype").getDisabled() == false)
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
                    // Clear out all dependent fields' value if they are not already disabled and not already empty
                    if (!form.getControl("ts_country").getDisabled() && form.getAttribute("ts_country").getValue() != null) {
                        form.getAttribute("ts_country").setValue(null);
                    }
                    if (!form.getControl("ovs_operationtypeid").getDisabled() && form.getAttribute("ovs_operationtypeid").getValue() != null) {
                        form.getAttribute("ovs_operationtypeid").setValue(null);
                    }
                    if (!form.getControl("ts_tradenameid").getDisabled() && form.getAttribute("ts_tradenameid").getValue() != null) {
                        form.getAttribute("ts_tradenameid").setValue(null);
                    }
                    if (!form.getControl("msdyn_serviceaccount").getDisabled() && form.getAttribute("msdyn_serviceaccount").getValue() != null) {
                        form.getAttribute("msdyn_serviceaccount").setValue(null);
                    }
                    if (!form.getControl("ts_site").getDisabled() && form.getAttribute("ts_site").getValue() != null) {
                        form.getAttribute("ts_site").setValue(null);
                        form.getAttribute("ovs_operationid").setValue(null);
                    }
                    if (!form.getControl("msdyn_functionallocation").getVisible() && form.getAttribute("msdyn_functionallocation").getValue() != null) {
                        form.getAttribute("msdyn_functionallocation").setValue(null);
                    }
                    if (!form.getControl("msdyn_primaryincidenttype").getDisabled() && form.getAttribute("msdyn_primaryincidenttype").getValue() != null) {
                        form.getAttribute("msdyn_primaryincidenttype").setValue(null);
                    }
                    // Disable all dependent fields
                    form.getAttribute("ts_country").setRequiredLevel("none");
                    if (form.getControl("ts_country").getDisabled() == false)
                        form.getControl("ts_country").setVisible(false);
                    if (form.getControl("ovs_operationtypeid").getDisabled() == false)
                        form.getControl("ovs_operationtypeid").setDisabled(true);
                    if (form.getControl("ts_tradenameid").getDisabled() == false)
                        form.getControl("ts_tradenameid").setDisabled(true);
                    if (form.getControl("msdyn_serviceaccount").getDisabled() == false)
                        form.getControl("msdyn_serviceaccount").setDisabled(true);
                    if (form.getControl("ts_site").getDisabled() == false)
                        form.getControl("ts_site").setDisabled(true);
                    if (form.getControl("msdyn_functionallocation").getDisabled() == false)
                        form.getControl("msdyn_functionallocation").setVisible(false);
                    if (form.getControl("msdyn_primaryincidenttype").getDisabled() == false)
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
                    // Clear out all dependent fields' value if they are not already disabled and not already empty
                    if (!form.getControl("ovs_operationtypeid").getDisabled() && form.getAttribute("ovs_operationtypeid").getValue() != null) {
                        form.getAttribute("ovs_operationtypeid").setValue(null);
                    }
                    if (!form.getControl("ts_tradenameid").getDisabled() && form.getAttribute("ts_tradenameid").getValue() != null) {
                        form.getAttribute("ts_tradenameid").setValue(null);
                    }
                    if (!form.getControl("msdyn_serviceaccount").getDisabled() && form.getAttribute("msdyn_serviceaccount").getValue() != null) {
                        form.getAttribute("msdyn_serviceaccount").setValue(null);
                    }
                    if (!form.getControl("ts_site").getDisabled() && form.getAttribute("ts_site").getValue() != null) {
                        form.getAttribute("ts_site").setValue(null);
                        form.getAttribute("ovs_operationid").setValue(null);
                    }
                    if (!form.getControl("msdyn_functionallocation").getVisible() && form.getAttribute("msdyn_functionallocation").getValue() != null) {
                        form.getAttribute("msdyn_functionallocation").setValue(null);
                    }
                    if (!form.getControl("msdyn_primaryincidenttype").getDisabled() && form.getAttribute("msdyn_primaryincidenttype").getValue() != null) {
                        form.getAttribute("msdyn_primaryincidenttype").setValue(null);
                    }
                    // Disable all dependent fields
                    if (form.getControl("ovs_operationtypeid").getDisabled() == false)
                        form.getControl("ovs_operationtypeid").setDisabled(true);
                    if (form.getControl("ts_tradenameid").getDisabled() == false)
                        form.getControl("ts_tradenameid").setDisabled(true);
                    if (form.getControl("msdyn_serviceaccount").getDisabled() == false)
                        form.getControl("msdyn_serviceaccount").setDisabled(true);
                    if (form.getControl("ts_site").getDisabled() == false)
                        form.getControl("ts_site").setDisabled(true);
                    if (form.getControl("msdyn_functionallocation").getDisabled() == false)
                        form.getControl("msdyn_functionallocation").setVisible(false);
                    if (form.getControl("msdyn_primaryincidenttype").getDisabled() == false)
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
                var operationTypeAttribute = form.getAttribute("ovs_operationtypeid");
                var countryAttribute = form.getAttribute("ts_country");
                if (operationTypeAttribute != null && operationTypeAttribute != undefined) {
                    // Clear out all dependent fields' value if they are not already disabled and not already empty
                    if (!form.getControl("ts_tradenameid").getDisabled() && form.getAttribute("ts_tradenameid").getValue() != null) {
                        form.getAttribute("ts_tradenameid").setValue(null);
                    }
                    if (!form.getControl("msdyn_serviceaccount").getDisabled() && form.getAttribute("msdyn_serviceaccount").getValue() != null) {
                        form.getAttribute("msdyn_serviceaccount").setValue(null);
                    }
                    if (!form.getControl("ts_site").getDisabled() && form.getAttribute("ts_site").getValue() != null) {
                        form.getAttribute("ts_site").setValue(null);
                        form.getAttribute("ovs_operationid").setValue(null);
                    }
                    if (!form.getControl("msdyn_functionallocation").getVisible() && form.getAttribute("msdyn_functionallocation").getValue() != null) {
                        form.getAttribute("msdyn_functionallocation").setValue(null);
                    }
                    if (!form.getControl("msdyn_primaryincidenttype").getDisabled() && form.getAttribute("msdyn_primaryincidenttype").getValue() != null) {
                        form.getAttribute("msdyn_primaryincidenttype").setValue(null);
                    }
                    // Disable all dependent fields
                    if (form.getControl("ts_tradenameid").getDisabled() == false)
                        form.getControl("ts_tradenameid").setDisabled(true);
                    if (form.getControl("msdyn_serviceaccount").getDisabled() == false)
                        form.getControl("msdyn_serviceaccount").setDisabled(true);
                    if (form.getControl("ts_site").getDisabled() == false)
                        form.getControl("ts_site").setDisabled(true);
                    if (form.getControl("msdyn_functionallocation").getDisabled() == false)
                        form.getControl("msdyn_functionallocation").setVisible(false);
                    if (form.getControl("msdyn_primaryincidenttype").getDisabled() == false)
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
                        form.getControl("ts_tradenameid").setDisabled(false);
                        //form.getControl("msdyn_serviceaccount").setDisabled(false);
                        form.getControl("msdyn_primaryincidenttype").setDisabled(false);
                        // Setup a custom view
                        // This value is never saved and only needs to be unique among the other available views for the lookup.
                        var viewId = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F660}';
                        var entityName = "account";
                        var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredStakeholders");
                        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" returntotalrecordcount="true" page="1" no-lock="false"><entity name="account"><attribute name="name"/><attribute name="accountid"/><order attribute="name" descending="false" /><link-entity name="ovs_operation" from="ts_stakeholder" to="accountid" link-type="inner" alias="ac"><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeValue[0].id + '"/></filter><link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="ts_site" link-type="inner" alias="ad"><filter type="and"><condition attribute="ts_region" operator="eq" value="' + regionAttributeValue[0].id + '"/>' + countryCondition + '</filter></link-entity></link-entity></entity></fetch>';
                        var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="accountid"><cell name="name" width="200" /></row></grid>';
                        form.getControl("msdyn_serviceaccount").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                        // Custom view for Trade Names
                        var viewIdTradename = '{1c259fee-0541-4cac-8d20-7b30ee398065}';
                        var entityNameTradename = "ts_tradename";
                        var viewDisplayNameTradename = "FilteredSTradenames";
                        var fetchXmlTradename = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" returntotalrecordcount="true" page="1" no-lock="false"><entity name="ts_tradename" ><attribute name="ts_tradenameid" /><attribute name="ts_name" /><order attribute="ts_stakeholderidname" /><order attribute="ts_name" /><link-entity name="account" from="accountid" to="ts_stakeholderid" ><link-entity name="ovs_operation" from="ts_stakeholder" to="accountid" link-type="inner" alias="ac"><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeValue[0].id + '"/></filter><link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="ts_site" link-type="inner" alias="ad"><filter type="and"><condition attribute="ts_region" operator="eq" value="' + regionAttributeValue[0].id + '"/>' + countryCondition + '</filter></link-entity></link-entity></link-entity></entity></fetch>';
                        var layoutXmlTradename = '<grid name="resultset" object="10010" jump="ts_name" select="1" icon="1" preview="1"><row name="result" id="ts_tradenameid"><cell name="ts_name" width="200" /></row></grid>';
                        form.getControl("ts_tradenameid").addCustomView(viewIdTradename, entityNameTradename, viewDisplayNameTradename, fetchXmlTradename, layoutXmlTradename, true);
                        // Custom view for Activity Type
                        var viewIdActivity = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F661}';
                        var entityNameActivity = "msdyn_incidenttype";
                        var viewDisplayNameActivity = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredActivityType");
                        var fetchXmlActivity = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="msdyn_incidenttype"><attribute name="msdyn_name" /><attribute name="msdyn_incidenttypeid" /><order attribute="msdyn_name" descending="false" /><filter type="and"><condition attribute="msdyn_defaultworkordertype" operator="eq" uiname="Inspection" uitype="msdyn_workordertype" value="' + workOrderTypeAttributeValue[0].id + '" /></filter><link-entity name="ts_ovs_operationtypes_msdyn_incidenttypes" from="msdyn_incidenttypeid" to="msdyn_incidenttypeid" visible="false" intersect="true"><link-entity name="ovs_operationtype" from="ovs_operationtypeid" to="ovs_operationtypeid" alias="ab"><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeValue[0].id + '" /></filter></link-entity></link-entity></entity></fetch>';
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
                var operationTypeAttribute = form.getAttribute("ovs_operationtypeid");
                var stakeholderAttribute = form.getAttribute("msdyn_serviceaccount");
                var countryAttribute = form.getAttribute("ts_country");
                if (stakeholderAttribute != null && stakeholderAttribute != undefined) {
                    // Clear out all dependent fields' value if they are not already disabled and not already empty
                    if (!form.getControl("ts_site").getDisabled() && form.getAttribute("ts_site").getValue() != null) {
                        form.getAttribute("ts_site").setValue(null);
                        form.getAttribute("ovs_operationid").setValue(null);
                    }
                    if (!form.getControl("msdyn_functionallocation").getVisible() && form.getAttribute("msdyn_functionallocation").getValue() != null) {
                        form.getAttribute("msdyn_functionallocation").setValue(null);
                    }
                    // Disable all dependent fields
                    if (form.getControl("ts_site").getDisabled() == false)
                        form.getControl("ts_site").setDisabled(true);
                    if (form.getControl("msdyn_functionallocation").getDisabled() == false)
                        form.getControl("msdyn_functionallocation").setVisible(false);
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
                        var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredStakeholders");
                        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" returntotalrecordcount="true" page="1" count="25" no-lock="false"><entity name="msdyn_functionallocation"><attribute name="statecode"/><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><filter>' + countryCondition + '</filter><filter><condition attribute="ts_region" operator="eq" value="' + regionAttributeValue[0].id + '"/></filter><order attribute="msdyn_name" descending="false"/><link-entity name="ovs_operation" from="ts_site" to="msdyn_functionallocationid"><filter><condition attribute="ovs_operationtypeid" operator="eq" value=" ' + operationTypeAttributeValue[0].id + '"/></filter><filter><condition attribute="ts_stakeholder" operator="eq" value="' + stakeholderAttributeValue[0].id + '"/></filter></link-entity></entity></fetch>';
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
                var form_1 = eContext.getFormContext();
                var operationTypeAttribute = form_1.getAttribute("ovs_operationtypeid");
                var stakeholderAttribute = form_1.getAttribute("msdyn_serviceaccount");
                var siteAttribute = form_1.getAttribute("ts_site");
                if (siteAttribute != null && siteAttribute != undefined) {
                    // Clear out operation and subsite value if not already empty
                    if (form_1.getAttribute("ovs_operationid").getValue() != null)
                        form_1.getAttribute("ovs_operationid").setValue(null);
                    // If an operation type is selected, we use the filtered fetchxml, otherwise, disable and clear out the dependent fields
                    var operationTypeAttributeValue = operationTypeAttribute.getValue();
                    var stakeholderAttributeValue = stakeholderAttribute.getValue();
                    var siteAttributeValue_1 = siteAttribute.getValue();
                    if (siteAttributeValue_1 != null && siteAttributeValue_1 != undefined &&
                        stakeholderAttributeValue != null && stakeholderAttributeValue != undefined &&
                        operationTypeAttributeValue != null && operationTypeAttributeValue != undefined) {
                        // Populate operation asset
                        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="ovs_operation"><attribute name="ovs_name"/><attribute name="ts_stakeholder"/><attribute name="ts_site"/><attribute name="ovs_operationid"/><order attribute="ovs_name" descending="true"/><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeValue[0].id + '"/><condition attribute="ts_site" operator="eq" value="' + siteAttributeValue_1[0].id + '"/><condition attribute="ts_stakeholder" operator="eq" value="' + stakeholderAttributeValue[0].id + '"/></filter></entity></fetch>';
                        var encodedFetchXml = encodeURIComponent(fetchXml);
                        Xrm.WebApi.retrieveMultipleRecords("ovs_operation", "?fetchXml=" + encodedFetchXml).then(function success(result) {
                            if (result.entities.length == 1) {
                                var targetOperation = result.entities[0];
                                var lookup = new Array();
                                lookup[0] = new Object();
                                lookup[0].id = targetOperation.ovs_operationid;
                                lookup[0].name = targetOperation.ovs_name;
                                lookup[0].entityType = 'ovs_operation';
                                form_1.getAttribute('ovs_operationid').setValue(lookup);
                            }
                            else {
                                // do not set a default if multiple records are found, error.
                            }
                        }, function (error) {
                            showErrorMessageAlert(error);
                        });
                        //Check if any subsites exists and only show the field if it's the case
                        var fetchXmlToCheckForSubSites = '<fetch no-lock="false" returntotalrecordcount="true" page="1" count="25"><entity name="msdyn_functionallocation"><attribute name="statecode"/><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><filter><condition attribute="msdyn_functionallocationid" operator="under" value="' + siteAttributeValue_1[0].id + '"/></filter><order attribute="msdyn_name" descending="false"/><link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="msdyn_parentfunctionallocation" alias="bb"><filter type="and"><condition attribute="msdyn_functionallocationid" operator="eq" uitype="msdyn_functionallocation" value="' + siteAttributeValue_1[0].id + '"/></filter></link-entity></entity></fetch>';
                        encodedFetchXml = encodeURIComponent(fetchXmlToCheckForSubSites);
                        Xrm.WebApi.retrieveMultipleRecords("msdyn_functionallocation", "?fetchXml=" + encodedFetchXml).then(function success(result) {
                            if (result.entities.length > 0) {
                                form_1.getControl('msdyn_functionallocation').setDisabled(false);
                                form_1.getControl('msdyn_functionallocation').setVisible(true);
                                var viewId = '{1B59589F-F122-5428-4771-79BC925240C3}';
                                var entityName = "msdyn_functionallocation";
                                var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredSites");
                                var activityTypeFetchXml = '<fetch no-lock="false"><entity name="msdyn_functionallocation"><attribute name="statecode"/><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><filter><condition attribute="msdyn_functionallocationid" operator="under" value="' + siteAttributeValue_1[0].id + '"/></filter><order attribute="msdyn_name" descending="false"/></entity></fetch>';
                                var layoutXml = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="200" /></row></grid>';
                                form_1.getControl("msdyn_functionallocation").addCustomView(viewId, entityName, viewDisplayName, activityTypeFetchXml, layoutXml, true);
                            }
                            else {
                                form_1.getAttribute("msdyn_functionallocation").setValue(null);
                                form_1.getControl('msdyn_functionallocation').setVisible(false);
                            }
                        }, function (error) {
                            showErrorMessageAlert(error);
                        });
                    }
                    else {
                        form_1.getAttribute("msdyn_functionallocation").setValue(null);
                        form_1.getControl('msdyn_functionallocation').setVisible(false);
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        WorkOrder.siteOnChange = siteOnChange;
        function tradenameOnChange(eContext) {
            try {
                var form_2 = eContext.getFormContext();
                var TradenameAttribute = form_2.getAttribute("ts_tradenameid");
                if (TradenameAttribute != null && TradenameAttribute != undefined) {
                    var TradenameAttributeValue = TradenameAttribute.getValue();
                    if (TradenameAttributeValue != null && TradenameAttributeValue != undefined) {
                        Xrm.WebApi.online.retrieveRecord("ts_tradename", TradenameAttributeValue[0].id, "?$select=_ts_stakeholderid_value").then(function success(result) {
                            var _ts_stakeholderid_value = result["_ts_stakeholderid_value"];
                            var _ts_stakeholderid_value_formatted = result["_ts_stakeholderid_value@OData.Community.Display.V1.FormattedValue"];
                            var _ts_stakeholderid_value_lookuplogicalname = result["_ts_stakeholderid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                            var lookup = new Array();
                            lookup[0] = new Object();
                            lookup[0].id = _ts_stakeholderid_value;
                            lookup[0].name = _ts_stakeholderid_value_formatted;
                            lookup[0].entityType = _ts_stakeholderid_value_lookuplogicalname;
                            form_2.getAttribute('msdyn_serviceaccount').setValue(lookup);
                            stakeholderOnChange(eContext);
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
        WorkOrder.tradenameOnChange = tradenameOnChange;
        function functionalLocationOnChange(eContext) {
            try {
                var form_3 = eContext.getFormContext();
                var operationTypeAttribute = form_3.getAttribute("ovs_operationtypeid");
                var stakeholderAttribute = form_3.getAttribute("msdyn_serviceaccount");
                var functionalLocationAttribute = form_3.getAttribute("msdyn_functionallocation");
                if (functionalLocationAttribute != null && functionalLocationAttribute != undefined) {
                    // Clear out operation value if not already empty
                    if (form_3.getAttribute("ovs_operationid").getValue() != null)
                        form_3.getAttribute("ovs_operationid").setValue(null);
                    // If an operation type is selected, we use the filtered fetchxml, otherwise, disable and clear out the dependent fields
                    var operationTypeAttributeValue = operationTypeAttribute.getValue();
                    var stakeholderAttributeValue = stakeholderAttribute.getValue();
                    var functionalLocationAttributeValue = functionalLocationAttribute.getValue();
                    if (functionalLocationAttributeValue != null && functionalLocationAttributeValue != undefined &&
                        stakeholderAttributeValue != null && stakeholderAttributeValue != undefined &&
                        operationTypeAttributeValue != null && operationTypeAttributeValue != undefined) {
                        // Populate operation asset
                        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="ovs_operation"><attribute name="ovs_name"/><attribute name="ts_stakeholder"/><attribute name="ts_site"/><attribute name="ovs_operationid"/><order attribute="ovs_name" descending="true"/><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeValue[0].id + '"/><condition attribute="ts_stakeholder" operator="eq" value="' + stakeholderAttributeValue[0].id + '"/><condition attribute="ts_site" operator="eq" value="' + functionalLocationAttributeValue[0].id + '"/></filter></entity></fetch>';
                        var encodedFetchXml = encodeURIComponent(fetchXml);
                        Xrm.WebApi.retrieveMultipleRecords("ovs_operation", "?fetchXml=" + encodedFetchXml).then(function success(result) {
                            if (result.entities.length == 1) {
                                var targetOperation = result.entities[0];
                                var lookup = new Array();
                                lookup[0] = new Object();
                                lookup[0].id = targetOperation.ovs_operationid;
                                lookup[0].name = targetOperation.ovs_name;
                                lookup[0].entityType = 'ovs_operation';
                                form_3.getAttribute('ovs_operationid').setValue(lookup);
                            }
                            else {
                                // do not set a default if multiple records are found, error.
                            }
                        }, function (error) {
                            showErrorMessageAlert(error);
                        });
                    }
                    else {
                        // Fall back to siteOnChange if functional location is cleared
                        siteOnChange(eContext);
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        WorkOrder.functionalLocationOnChange = functionalLocationOnChange;
        function systemStatusOnChange(eContext) {
            var form = eContext.getFormContext();
            var newSystemStatus = form.getAttribute("msdyn_systemstatus").getValue();
            //If system status is set to closed
            if (newSystemStatus == 690970004 || newSystemStatus == 690970005) {
                var confirmStrings = {
                    text: Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "CloseWorkOrderConfirmationText"),
                    title: Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "CloseWorkOrderConfirmationTitle")
                };
                var confirmOptions = { height: 200, width: 450 };
                Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(function (success) {
                    if (success.confirmed) {
                        //Set state to Inactive
                        form.getAttribute("statecode").setValue(1);
                        //Set Status Reason to Closed
                        form.getAttribute("statuscode").setValue(918640000);
                        globalThis.currentSystemStatus = newSystemStatus;
                    }
                    else {
                        //Undo the system status change
                        form.getAttribute("msdyn_systemstatus").setValue(globalThis.currentSystemStatus);
                    }
                });
            }
            else {
                //Keep record Active
                form.getAttribute("statecode").setValue(0);
                form.getAttribute("statuscode").setValue(1);
                globalThis.currentSystemStatus = newSystemStatus;
            }
        }
        WorkOrder.systemStatusOnChange = systemStatusOnChange;
        function caseOnChange(eContext) {
            var form = eContext.getFormContext();
            var caseAttribute = form.getAttribute("msdyn_servicerequest");
            if (caseAttribute.getValue() == null) {
                form.getControl("ts_region").setDisabled(false);
                form.getControl("ts_country").setDisabled(false);
                form.getControl("ts_tradenameid").setDisabled(false);
                //form.getControl("msdyn_serviceaccount").setDisabled(false);
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
                var form_4 = eContext.getFormContext();
                var caseAttribute = form_4.getAttribute("msdyn_servicerequest");
                var regionAttribute = form_4.getAttribute("ts_region");
                var countryAttribute = form_4.getAttribute("ts_country");
                var stakeholderAttribute = form_4.getAttribute("msdyn_serviceaccount");
                var siteAttribute = form_4.getAttribute("ts_site");
                var caseAttributeValue = caseAttribute.getValue();
                var regionAttributeValue_1 = regionAttribute.getValue();
                var countryAttributeValue_1 = countryAttribute.getValue();
                var stakeholderAttributeValue_1 = stakeholderAttribute.getValue();
                var siteAttributeValue_2 = siteAttribute.getValue();
                var regionCondition = regionAttributeValue_1 == null ? "" : '<condition attribute="ovs_region" operator="eq" value="' + regionAttributeValue_1[0].id + '" />';
                var countryCondition = countryAttributeValue_1 == null ? "" : '<condition attribute="ts_country" operator="eq" value="' + countryAttributeValue_1[0].id + '" />';
                var stakeholderCondition = stakeholderAttributeValue_1 == null ? "" : '<condition attribute="customerid" operator="eq" value="' + stakeholderAttributeValue_1[0].id + '" />';
                var siteCondition = siteAttributeValue_2 == null ? "" : '<condition attribute="msdyn_functionallocation" operator="eq" value="' + siteAttributeValue_2[0].id + '" />';
                if (caseAttribute != null && caseAttribute != undefined) {
                    if (caseAttributeValue != null) {
                        Xrm.WebApi.online.retrieveRecord("incident", caseAttributeValue[0].id.replace(/({|})/g, ''), "?$select=_ovs_region_value, _ts_country_value, _customerid_value, _msdyn_functionallocation_value, _ts_stakeholder_value").then(function success(result) {
                            if ((regionCondition != "" && (result != null && regionAttributeValue_1 != null && regionAttributeValue_1[0].id.replace(/({|})/g, '') != result._ovs_region_value.toUpperCase())) ||
                                (countryCondition != "" && (result != null && countryAttributeValue_1 != null && countryAttributeValue_1[0].id.replace(/({|})/g, '') != result._ts_country_value.toUpperCase())) ||
                                (stakeholderCondition != "" && (result != null && stakeholderAttributeValue_1 != null && stakeholderAttributeValue_1[0].id.replace(/({|})/g, '') != result._ts_stakeholder_value.toUpperCase())) ||
                                (siteCondition != "" && (result != null && siteAttributeValue_2 != null && siteAttributeValue_2[0].id.replace(/({|})/g, '') != result._msdyn_functionallocation_value.toUpperCase()))) {
                                form_4.getAttribute("msdyn_servicerequest").setValue(null);
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
                    form_4.getControl("msdyn_servicerequest").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        WorkOrder.updateCaseView = updateCaseView;
        function revisedQuarterOnChange(eContext) {
            var form = eContext.getFormContext();
            var revisedQuarterAttribute = form.getAttribute("ovs_revisedquarterid");
            var currentFiscalQuarterAttribute = form.getAttribute("ovs_currentfiscalquarter");
            var plannedFiscalQuarterAttribute = form.getAttribute("ovs_fiscalquarter");
            var revisedQuarterAttributeValue = revisedQuarterAttribute.getValue();
            var currentFiscalQuarterAttributeValue = currentFiscalQuarterAttribute.getValue();
            var plannedFiscalQuarterAttributeValue = plannedFiscalQuarterAttribute.getValue();
            if (revisedQuarterAttributeValue != null) {
                currentFiscalQuarterAttribute.setValue(revisedQuarterAttributeValue);
            }
            else {
                if (plannedFiscalQuarterAttribute != null) {
                    currentFiscalQuarterAttribute.setValue(plannedFiscalQuarterAttributeValue);
                }
                else {
                    currentFiscalQuarterAttribute.setValue(null);
                }
            }
        }
        WorkOrder.revisedQuarterOnChange = revisedQuarterOnChange;
        function dateWindowEndOnChange(eContext) {
            var form = eContext.getFormContext();
            var dateWindowEndValue = form.data.entity.attributes.get("msdyn_datewindowend").getValue();
            var fiscalQuarterAttribute = form.data.entity.attributes.get("ovs_fiscalquarter");
            var fetchXml = "<fetch distinct=\"false\" mapping=\"logical\" output-format=\"xml-platform\" version=\"1.0\"> <entity name=\"tc_tcfiscalquarter\"> <attribute name=\"tc_name\"/> <attribute name=\"tc_tcfiscalquarterid\"/> <attribute name=\"tc_tcfiscalyearid\"/> <filter type=\"and\"> <condition operator=\"this-fiscal-year\" attribute = \"tc_quarterstart\"/> </filter> </entity> </fetch>";
            fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
            Xrm.WebApi.retrieveMultipleRecords("tc_tcfiscalquarter", fetchXml).then(function success(result) {
                if (result.entities.length > 0) {
                    if (dateWindowEndValue != null) {
                        var m = Math.floor(dateWindowEndValue.getMonth() / 3);
                        var lookup = new Array();
                        lookup[0] = new Object();
                        lookup[0].id = result.entities[m].tc_tcfiscalquarterid;
                        lookup[0].name = result.entities[m].tc_name;
                        lookup[0].entityType = 'tc_tcfiscalquarter';
                        fiscalQuarterAttribute.setValue(lookup);
                    }
                }
            }, function (error) {
            });
        }
        WorkOrder.dateWindowEndOnChange = dateWindowEndOnChange;
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
                            //form.getControl("ovs_operationtypeid").setDisabled(true);
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
            var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"><entity name="tc_country"><attribute name="tc_countryid"/><attribute name="tc_name"/><order attribute="tc_name" descending="false" /><link-entity name="msdyn_functionallocation" from="ts_country" to="tc_countryid" link-type="inner" alias="ag"><link-entity name="ovs_operation" from="ts_site" to="msdyn_functionallocationid" link-type="inner" alias="ah" /></link-entity></entity></fetch>';
            var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="tc_countryid"><cell name="tc_name" width="200" /></row></grid>';
            form.getControl("ts_country").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
        }
        function setOperationTypeFilteredView(form, regionAttributeId, countryCondition, workOrderTypeAttributeId) {
            form.getControl("ovs_operationtypeid").setDisabled(false);
            var viewId = '{8982C38D-8BB4-4C95-BD05-493398FEAE99}';
            var entityName = "ovs_operationtype";
            var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredOperationTypes");
            var fetchXml = '<fetch distinct="true" page="1"><entity name="ovs_operationtype"><attribute name="statecode"/><attribute name="ovs_operationtypeid"/><attribute name="ovs_name"/><attribute name="createdon"/><link-entity name="ts_ovs_operationtypes_msdyn_incidenttypes" from="ovs_operationtypeid" to="ovs_operationtypeid" visible="false" intersect="true"><link-entity name="msdyn_incidenttype" from="msdyn_incidenttypeid" to="msdyn_incidenttypeid" alias="ad"><filter type="and"><condition attribute="msdyn_defaultworkordertype" operator="eq" value="' + workOrderTypeAttributeId + '" /></filter></link-entity></link-entity><link-entity name="ovs_operation" from="ovs_operationtypeid" to="ovs_operationtypeid" link-type="inner" alias="ae"><link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="ts_site" link-type="inner" alias="af"><filter type="and"><condition attribute="ts_region" operator="eq" value="' + regionAttributeId + '" />' + countryCondition + '</filter></link-entity></link-entity></entity></fetch>';
            var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="ovs_operationtypeid"><cell name="ovs_name" width="200" /></row></grid>';
            form.getControl("ovs_operationtypeid").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
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
