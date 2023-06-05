﻿"use strict";
/* eslint-disable @typescript-eslint/triple-slash-reference */
var ROM;
(function (ROM) {
    var Incident;
    (function (Incident) {
        // EVENTS
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            var regionAttribute = form.getAttribute("ovs_region");
            var ownerControl = form.getControl("header_ownerid");
            //Set required fields
            form.getAttribute("msdyn_functionallocation").setRequiredLevel("required");
            switch (form.ui.getFormType()) {
                case 1:
                    setRegion(eContext);
                    form.getControl("ts_tradenameid").setDisabled(true);
                    form.getControl("msdyn_functionallocation").setDisabled(true);
                    break;
                default:
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
                    form.getControl("ts_tradenameid").setDisabled(false);
                    form.getControl("msdyn_functionallocation").setDisabled(false);
                    break;
            }
            if (form.ui.getFormType() == 1 || form.ui.getFormType() == 2) {
                if (ownerControl != null) {
                    ownerControl.setEntityTypes(["systemuser"]);
                    var defaultViewId = "29bd662e-52e7-ec11-bb3c-0022483d86ce";
                    ownerControl.setDefaultView(defaultViewId);
                }
            }
            // Lock some fields if there are associated WOs
            var fetchXML = "<fetch> <entity name=\"incident\" > <attribute name=\"incidentid\" /> <filter> <condition attribute=\"incidentid\" operator=\"eq\" value=\"".concat(form.data.entity.getId(), "\" /> </filter> <link-entity name=\"msdyn_workorder\" from=\"msdyn_servicerequest\" to=\"incidentid\" /> </entity> </fetch>");
            fetchXML = "?fetchXml=" + encodeURIComponent(fetchXML);
            Xrm.WebApi.retrieveMultipleRecords("incident", fetchXML).then(function success(result) {
                if (result.entities.length > 0) {
                    form.getControl("ovs_region").setDisabled(true);
                    form.getControl("ts_country").setDisabled(true);
                    form.getControl("ts_tradenameid").setDisabled(true);
                    form.getControl("msdyn_functionallocation").setDisabled(true);
                }
            }, function (error) {
            });
            //Hide Associate Evidence for AvSec users
            var userBusinessUnitName;
            var userId = Xrm.Utility.getGlobalContext().userSettings.userId;
            var currentUserBusinessUnitFetchXML = [
                "<fetch top='50'>",
                "  <entity name='businessunit'>",
                "    <attribute name='name' />",
                "    <attribute name='businessunitid' />",
                "    <link-entity name='systemuser' from='businessunitid' to='businessunitid' link-type='inner' alias='ab'>>",
                "      <filter>",
                "        <condition attribute='systemuserid' operator='eq' value='", userId, "'/>",
                "      </filter>",
                "    </link-entity>",
                "  </entity>",
                "</fetch>",
            ].join("");
            currentUserBusinessUnitFetchXML = "?fetchXml=" + encodeURIComponent(currentUserBusinessUnitFetchXML);
            Xrm.WebApi.retrieveMultipleRecords("businessunit", currentUserBusinessUnitFetchXML).then(function (businessunit) {
                userBusinessUnitName = businessunit.entities[0].name;
                if (userBusinessUnitName.startsWith("Aviation")) {
                    form.ui.tabs.get("tab_findings").sections.get("tab_findings_section_aef").setVisible(false);
                }
            });
            emailTemplateFieldsOnLoad(eContext);
            //Hide OOB status code we don't use
            var caseStatus = form.getControl("header_statuscode");
            if (caseStatus != null && caseStatus != undefined) {
                var options = caseStatus.getOptions();
                for (var i = 0; i < options.length; i++) {
                    if (options[i].value == 3 || options[i].value == 4) {
                        caseStatus.removeOption(options[i].value);
                    }
                }
            }
        }
        Incident.onLoad = onLoad;
        function systemStatusCodeOnChange(eContext) {
            var form = eContext.getFormContext();
            if (form.getAttribute("statuscode").getValue() == 7) {
            }
        }
        Incident.systemStatusCodeOnChange = systemStatusCodeOnChange;
        function regionOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var regionAttribute = form.getAttribute("ovs_region");
                if (regionAttribute != null && regionAttribute != undefined) {
                    // Clear out all dependent fields' value
                    if (!form.getControl("ts_country").getDisabled() || form.getAttribute("ts_country").getValue() != null) {
                        form.getAttribute("ts_country").setValue(null);
                    }
                    if (!form.getControl("ts_tradenameid").getDisabled() || form.getAttribute("ts_tradenameid").getValue() != null) {
                        form.getAttribute("ts_tradenameid").setValue(null);
                    }
                    if (!form.getControl("customerid").getDisabled() || form.getAttribute("customerid").getValue() != null) {
                        form.getAttribute("customerid").setValue(null);
                    }
                    if (!form.getControl("msdyn_functionallocation").getDisabled() || form.getAttribute("msdyn_functionallocation").getValue() != null) {
                        form.getAttribute("msdyn_functionallocation").setValue(null);
                    }
                    // Disable all dependent fields
                    form.getControl("ts_country").setVisible(false);
                    form.getAttribute("ts_country").setRequiredLevel("none");
                    form.getControl("ts_tradenameid").setDisabled(true);
                    form.getControl("msdyn_functionallocation").setDisabled(true);
                    // If previous fields have values, we use the filtered fetchxml in a custom lookup view
                    var regionAttributeValue = regionAttribute.getValue();
                    if (regionAttributeValue != null && regionAttributeValue != undefined) {
                        if (regionAttributeValue[0].name != "International") {
                            // Enable direct dependent field
                            form.getControl("ts_tradenameid").setDisabled(false);
                            // Custom view for Trade Names
                            var viewIdTradename = '{1c259fee-0541-4cac-8d20-7b30ee398065}';
                            var entityNameTradename = "ts_tradename";
                            var viewDisplayNameTradename = "FilteredSTradenames";
                            var fetchXmlTradename = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" returntotalrecordcount="true" page="1" no-lock="false"><entity name="ts_tradename" ><attribute name="ts_tradenameid" /><attribute name="ts_name" /><order attribute="ts_stakeholderidname" /><order attribute="ts_name" /><link-entity name="account" from="accountid" to="ts_stakeholderid" ><filter type="and"><condition attribute="ts_stakeholderstatus" operator="ne" value="717750001" /></filter><link-entity name="ovs_operation" from="ts_stakeholder" to="accountid" link-type="inner" alias="ac"><link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="ts_site" link-type="inner" alias="ad"><filter type="and"><condition attribute="ts_region" operator="eq" value="' + regionAttributeValue[0].id + '"/></filter></link-entity></link-entity></link-entity></entity></fetch>';
                            var layoutXmlTradename = '<grid name="resultset" object="10010" jump="ts_name" select="1" icon="1" preview="1"><row name="result" id="ts_tradenameid"><cell name="ts_name" width="200" /></row></grid>';
                            form.getControl("ts_tradenameid").addCustomView(viewIdTradename, entityNameTradename, viewDisplayNameTradename, fetchXmlTradename, layoutXmlTradename, true);
                        }
                        else {
                            setCountryFilteredView(form);
                        }
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        Incident.regionOnChange = regionOnChange;
        function countryOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var countryAttribute = form.getAttribute("ts_country");
                if (countryAttribute != null && countryAttribute != undefined) {
                    // Clear out all dependent fields' value
                    if (!form.getControl("ts_tradenameid").getDisabled() || form.getAttribute("ts_tradenameid").getValue() != null) {
                        form.getAttribute("ts_tradenameid").setValue(null);
                    }
                    if (!form.getControl("customerid").getDisabled() || form.getAttribute("customerid").getValue() != null) {
                        form.getAttribute("customerid").setValue(null);
                    }
                    if (!form.getControl("msdyn_functionallocation").getDisabled() || form.getAttribute("msdyn_functionallocation").getValue() != null) {
                        form.getAttribute("msdyn_functionallocation").setValue(null);
                    }
                    // Disable all dependent fields
                    form.getControl("ts_tradenameid").setDisabled(true);
                    form.getControl("msdyn_functionallocation").setDisabled(true);
                    var countryAttributeValue = countryAttribute.getValue();
                    if (countryAttributeValue != null && countryAttributeValue != undefined) {
                        // Enable direct dependent field
                        form.getControl("ts_tradenameid").setDisabled(false);
                        // Custom view for Trade Names
                        var viewIdTradename = '{1c259fee-0541-4cac-8d20-7b30ee398065}';
                        var entityNameTradename = "ts_tradename";
                        var viewDisplayNameTradename = "FilteredSTradenames";
                        var fetchXmlTradename = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" returntotalrecordcount="true" page="1" no-lock="false"><entity name="ts_tradename" ><attribute name="ts_tradenameid" /><attribute name="ts_name" /><order attribute="ts_stakeholderidname" /><order attribute="ts_name" /><link-entity name="account" from="accountid" to="ts_stakeholderid" ><filter type="and"><condition attribute="ts_stakeholderstatus" operator="ne" value="717750001" /></filter><link-entity name="ovs_operation" from="ts_stakeholder" to="accountid" link-type="inner" alias="ac"><link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="ts_site" link-type="inner" alias="ad"><filter type="and"><condition attribute="ts_region" operator="eq" value="{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}" /><condition attribute="ts_country" operator="eq" value="' + countryAttributeValue[0].id + '"/></filter></link-entity></link-entity></link-entity></entity></fetch>';
                        var layoutXmlTradename = '<grid name="resultset" object="10010" jump="ts_name" select="1" icon="1" preview="1"><row name="result" id="ts_tradenameid"><cell name="ts_name" width="200" /></row></grid>';
                        form.getControl("ts_tradenameid").addCustomView(viewIdTradename, entityNameTradename, viewDisplayNameTradename, fetchXmlTradename, layoutXmlTradename, true);
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        Incident.countryOnChange = countryOnChange;
        function stakeholderOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var regionAttribute = form.getAttribute("ovs_region");
                var stakeholderAttribute = form.getAttribute("customerid");
                var countryAttribute = form.getAttribute("ts_country");
                if (stakeholderAttribute != null && stakeholderAttribute != undefined) {
                    // Clear out all dependent fields' value
                    if (!form.getControl("msdyn_functionallocation").getDisabled() || form.getAttribute("msdyn_functionallocation").getValue() != null) {
                        form.getAttribute("msdyn_functionallocation").setValue(null);
                    }
                    // Disable all dependent fields
                    form.getControl("msdyn_functionallocation").setDisabled(true);
                    // If an operation type is selected, we use the filtered fetchxml, otherwise, disable and clear out the dependent fields
                    var regionAttributeValue = regionAttribute.getValue();
                    var stakeholderAttributeValue = stakeholderAttribute.getValue();
                    var countryAttributeValue = countryAttribute.getValue();
                    if (regionAttributeValue != null && regionAttributeValue != undefined &&
                        stakeholderAttributeValue != null && stakeholderAttributeValue != undefined) {
                        var countryCondition = "";
                        if (countryAttributeValue != null && countryAttributeValue != undefined && regionAttributeValue[0].name == "International") {
                            countryCondition = '<condition attribute="ts_country" operator="eq" value="' + countryAttributeValue[0].id + '"/>';
                        }
                        // Enable direct dependent field
                        form.getControl("msdyn_functionallocation").setDisabled(false);
                        // Custom view: Functional locations in the specified region, that has operation assets associated with the specified stakeholder
                        var viewId = '{6C57256F-F695-4576-9438-49AD892152B7}';
                        var entityName = "msdyn_functionallocation";
                        var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/Incident", "FilteredSites");
                        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"><entity name="msdyn_functionallocation"><attribute name="msdyn_functionallocationid" /><attribute name="msdyn_name" /><order attribute="msdyn_name" descending="false" /><filter type="and"><condition attribute="ts_sitestatus" operator="ne" value="717750001" /><condition attribute="ts_region" operator="eq" value="' + regionAttributeValue[0].id + '" />' + countryCondition + '</filter><link-entity name="ovs_operation" from="ts_site" to="msdyn_functionallocationid" link-type="inner" alias="al"><filter type="and"><condition attribute="ts_stakeholder" operator="eq" value="' + stakeholderAttributeValue[0].id + '" /></filter></link-entity></entity></fetch>';
                        var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="200" /></row></grid>';
                        form.getControl("msdyn_functionallocation").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        Incident.stakeholderOnChange = stakeholderOnChange;
        function tradenameOnChange(eContext) {
            try {
                var form_1 = eContext.getFormContext();
                var TradenameAttribute = form_1.getAttribute("ts_tradenameid");
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
                            form_1.getAttribute('customerid').setValue(lookup);
                            stakeholderOnChange(eContext);
                        }, function (error) {
                            var alertStrings = { text: error.message };
                            var alertOptions = { height: 120, width: 260 };
                            Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function () { });
                        });
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        Incident.tradenameOnChange = tradenameOnChange;
        // FUNCTIONS
        function setRegion(eContext) {
            var currentUserId = Xrm.Utility.getGlobalContext().userSettings.userId;
            currentUserId = currentUserId.replace(/[{}]/g, "");
            // Get the user's territory
            Xrm.WebApi.online.retrieveRecord("systemuser", currentUserId, "?$select=_territoryid_value").then(function success(result) {
                var form = eContext.getFormContext();
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
                        form.getAttribute('ovs_region').setValue(lookup);
                        if (lookup[0].id == "{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}") { //International
                            setCountryFilteredView(form);
                        }
                        else {
                            regionOnChange(eContext);
                        }
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
        function setCountryFilteredView(form) {
            form.getControl("ts_country").setDisabled(false);
            form.getControl("ts_country").setVisible(true);
            form.getAttribute("ts_country").setRequiredLevel("required");
            // Custom view: Countries that have an international site
            var viewId = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F662}';
            var entityName = "tc_country";
            var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/Incident", "FilteredCountries");
            var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"><entity name="tc_country"><attribute name="tc_countryid" /><attribute name="tc_name" /><order attribute="tc_name" descending="false" /><filter type="and"><condition attribute="statecode" operator="eq" value="0" /></filter><link-entity name="msdyn_functionallocation" from="ts_country" to="tc_countryid" link-type="inner" alias="ae"><filter type="and"><condition attribute="ts_region" operator="eq" value="{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}" /></filter></link-entity></entity></fetch>';
            var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="tc_countryid"><cell name="tc_name" width="200" /></row></grid>';
            form.getControl("ts_country").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
        }
        function emailTemplateFieldsOnLoad(eContext) {
            var form = eContext.getFormContext();
            var workOrder1Attribute = form.getAttribute("ts_workorder1");
            var workOrder2Attribute = form.getAttribute("ts_workorder2");
            //Unlock dependent fields if Work Order 1 already has a value
            if (workOrder1Attribute.getValue() != null) {
                form.getControl("ts_workorderservicetask1").setDisabled(false);
                form.getControl("ts_additionalinspectors1").setDisabled(false);
            }
            //Unlock dependent fields if Work Order 2 already has a value
            if (workOrder2Attribute.getValue() != null) {
                form.getControl("ts_workorderservicetask2").setDisabled(false);
                form.getControl("ts_additionalinspectors2").setDisabled(false);
            }
            //Set custom views for all fields
            setWorkOrder1FilteredView(form);
            setWorkOrder2FilteredView(form);
            setWOST1FilteredView(form);
            setWOST2FilteredView(form);
            setAdditionalInspectors1FilteredView(form);
            setAdditionalInspectors2FilteredView(form);
        }
        function workOrder1OnChange(eContext) {
            var form = eContext.getFormContext();
            var workOrder1Value = form.getAttribute("ts_workorder1").getValue();
            if (workOrder1Value != null) {
                //Update View of dependent fields
                setWOST1FilteredView(form);
                setAdditionalInspectors1FilteredView(form);
                var WorkOrderValue = form.getAttribute("ts_workorder1").getValue();
                //If Work Order has a value, try to find its Mandatory Service task and set the WOST1 field to it
                if (WorkOrderValue != null) {
                    var workOrderId = WorkOrderValue[0].id;
                    var fetchXml = [
                        "<fetch top='1'>",
                        "  <entity name='msdyn_workorderservicetask'>",
                        "  <attribute name='msdyn_name' />",
                        "  <attribute name = 'msdyn_workorderservicetaskid' />",
                        "    <filter type='and'>",
                        "      <condition attribute='msdyn_workorder' operator='eq' value='", workOrderId, "'/>",
                        "      <condition attribute='ts_mandatory' operator='eq' value='1'/>",
                        "    </filter>",
                        "  </entity>",
                        "</fetch>",
                    ].join("");
                    fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
                    Xrm.WebApi.retrieveMultipleRecords("msdyn_workorderservicetask", fetchXml).then(function (result) {
                        if (result.entities[0] != null) {
                            var lookup = new Array();
                            lookup[0] = new Object();
                            lookup[0].id = result.entities[0]["msdyn_workorderservicetaskid"];
                            lookup[0].name = result.entities[0]["msdyn_name"];
                            lookup[0].entityType = 'msdyn_workorderservicetask';
                            form.getAttribute('ts_workorderservicetask1').setValue(lookup);
                            workOrderServiceTask1OnChange(eContext);
                        }
                    });
                    //Set the Inspection Type field to the Inspection Type of the Work Order
                    Xrm.WebApi.retrieveRecord("msdyn_workorder", workOrderId, "?$select=_msdyn_primaryincidenttype_value").then(function (result) {
                        var lookup = new Array();
                        lookup[0] = new Object();
                        lookup[0].id = result["_msdyn_primaryincidenttype_value"];
                        lookup[0].name = result["_msdyn_primaryincidenttype_value@OData.Community.Display.V1.FormattedValue"];
                        lookup[0].entityType = 'msdyn_incidenttype';
                        form.getAttribute('ts_inspectiontype1').setValue(lookup);
                    });
                }
                form.getControl("ts_workorderservicetask1").setDisabled(false);
                form.getControl("ts_additionalinspectors1").setDisabled(false);
            }
            else {
                //Clear and lock dependent fields
                form.getAttribute("ts_workorderservicetask1").setValue(null);
                form.getAttribute("ts_additionalinspectors1").setValue(null);
                form.getAttribute("ts_inspectiontype1").setValue(null);
                form.getAttribute("ts_dateofinspection1").setValue(null);
                form.getControl("ts_workorderservicetask1").setDisabled(true);
                form.getControl("ts_additionalinspectors1").setDisabled(true);
            }
            setWorkOrder2FilteredView(form);
        }
        Incident.workOrder1OnChange = workOrder1OnChange;
        function workOrder2OnChange(eContext) {
            var form = eContext.getFormContext();
            var workOrder2Value = form.getAttribute("ts_workorder2").getValue();
            if (workOrder2Value != null) {
                //Update View of dependent fields
                setWOST2FilteredView(form);
                setAdditionalInspectors2FilteredView(form);
                var WorkOrderValue = form.getAttribute("ts_workorder2").getValue();
                //If Work Order has a value, try to find its Mandatory Service task and set the WOST1 field to it
                if (WorkOrderValue != null) {
                    var workOrderId = WorkOrderValue[0].id;
                    var fetchXml = [
                        "<fetch top='1'>",
                        "  <entity name='msdyn_workorderservicetask'>",
                        "  <attribute name='msdyn_name' />",
                        "  <attribute name = 'msdyn_workorderservicetaskid' />",
                        "    <filter type='and'>",
                        "      <condition attribute='msdyn_workorder' operator='eq' value='", workOrderId, "'/>",
                        "      <condition attribute='ts_mandatory' operator='eq' value='1'/>",
                        "    </filter>",
                        "  </entity>",
                        "</fetch>",
                    ].join("");
                    fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
                    Xrm.WebApi.retrieveMultipleRecords("msdyn_workorderservicetask", fetchXml).then(function (result) {
                        if (result.entities[0] != null) {
                            var lookup = new Array();
                            lookup[0] = new Object();
                            lookup[0].id = result.entities[0]["msdyn_workorderservicetaskid"];
                            lookup[0].name = result.entities[0]["msdyn_name"];
                            lookup[0].entityType = 'msdyn_workorderservicetask';
                            form.getAttribute('ts_workorderservicetask2').setValue(lookup);
                            workOrderServiceTask2OnChange(eContext);
                        }
                    });
                    //Set the Inspection Type field to the Inspection Type of the Work Order
                    Xrm.WebApi.retrieveRecord("msdyn_workorder", workOrderId, "?$select=_msdyn_primaryincidenttype_value").then(function (result) {
                        var lookup = new Array();
                        lookup[0] = new Object();
                        lookup[0].id = result["_msdyn_primaryincidenttype_value"];
                        lookup[0].name = result["_msdyn_primaryincidenttype_value@OData.Community.Display.V1.FormattedValue"];
                        lookup[0].entityType = 'msdyn_incidenttype';
                        form.getAttribute('ts_inspectiontype2').setValue(lookup);
                    });
                }
                form.getControl("ts_workorderservicetask2").setDisabled(false);
                form.getControl("ts_additionalinspectors2").setDisabled(false);
            }
            else {
                //Clear and lock dependent fields
                form.getAttribute("ts_workorderservicetask2").setValue(null);
                form.getAttribute("ts_additionalinspectors2").setValue(null);
                form.getAttribute("ts_inspectiontype2").setValue(null);
                form.getAttribute("ts_dateofinspection2").setValue(null);
                form.getControl("ts_workorderservicetask2").setDisabled(true);
                form.getControl("ts_additionalinspectors2").setDisabled(true);
            }
            setWorkOrder1FilteredView(form);
        }
        Incident.workOrder2OnChange = workOrder2OnChange;
        //When the Service Task is changed, set or clear Date of Inspection 1
        function workOrderServiceTask1OnChange(eContext) {
            var form = eContext.getFormContext();
            var WOST1Value = form.getAttribute("ts_workorderservicetask1").getValue();
            if (WOST1Value != null) {
                var WOSTId = WOST1Value[0].id;
                Xrm.WebApi.retrieveRecord("msdyn_workorderservicetask", WOSTId, "?$select=ts_servicetaskstartdate").then(function (result) {
                    if (result.ts_servicetaskstartdate != null) {
                        form.getAttribute('ts_dateofinspection1').setValue(new Date(result.ts_servicetaskstartdate));
                    }
                });
            }
            else {
                form.getAttribute('ts_dateofinspection1').setValue(null);
            }
        }
        Incident.workOrderServiceTask1OnChange = workOrderServiceTask1OnChange;
        //When the Service Task is changed, set or clear Date of Inspection 2
        function workOrderServiceTask2OnChange(eContext) {
            var form = eContext.getFormContext();
            var WOST2Value = form.getAttribute("ts_workorderservicetask2").getValue();
            if (WOST2Value != null) {
                var WOSTId = WOST2Value[0].id;
                Xrm.WebApi.retrieveRecord("msdyn_workorderservicetask", WOSTId, "?$select=ts_servicetaskstartdate").then(function (result) {
                    if (result.ts_servicetaskstartdate != null) {
                        form.getAttribute('ts_dateofinspection2').setValue(new Date(result.ts_servicetaskstartdate));
                    }
                });
            }
            else {
                form.getAttribute('ts_dateofinspection2').setValue(null);
            }
        }
        Incident.workOrderServiceTask2OnChange = workOrderServiceTask2OnChange;
        function setWorkOrder1FilteredView(form) {
            var caseId = form.data.entity.getId();
            var viewIdWorkOrder = '{1c259fee-0541-4cac-8d20-7b30ee391111}';
            var entityNameWorkOrder = "msdyn_workorder";
            var viewDisplayNameWorkOrder = "RelatedWorkOrders1";
            var WorkOrder2Value = form.getAttribute("ts_workorder2").getValue();
            var fetchXmlWorkOrder = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"> <entity name="msdyn_workorder"><attribute name="msdyn_name" /> <attribute name="msdyn_workorderid" /> <attribute name="msdyn_primaryincidenttype" /> <order attribute="msdyn_name" descending="false" /> <filter type="and"> <condition attribute="msdyn_servicerequest" operator="eq" value="' + caseId + '"/></filter> </entity> </fetch>';
            //Do not allow Work Order 2 to be selected again for Work Order 1
            if (WorkOrder2Value != null) {
                var workOrder2Id = WorkOrder2Value[0].id;
                fetchXmlWorkOrder = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"> <entity name="msdyn_workorder"><attribute name="msdyn_name" /> <attribute name="msdyn_workorderid" /> <attribute name="msdyn_primaryincidenttype" /> <order attribute="msdyn_name" descending="false" /> <filter type="and"> <condition attribute="msdyn_servicerequest" operator="eq" value="' + caseId + '"/><condition attribute="msdyn_workorderid" operator="ne" value="' + workOrder2Id + '" /> </filter> </entity> </fetch>';
            }
            var layoutXmlWorkOrder = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_workorder"><cell name="msdyn_name" width="100" /><cell name="msdyn_primaryincidenttype" width="200" /></row></grid>';
            form.getControl("ts_workorder1").addCustomView(viewIdWorkOrder, entityNameWorkOrder, viewDisplayNameWorkOrder, fetchXmlWorkOrder, layoutXmlWorkOrder, true);
        }
        function setWorkOrder2FilteredView(form) {
            var caseId = form.data.entity.getId();
            var viewIdWorkOrder = '{1c259fee-0541-4cac-8d20-7b30ee391112}';
            var entityNameWorkOrder = "msdyn_workorder";
            var viewDisplayNameWorkOrder = "RelatedWorkOrders2";
            var WorkOrder1Value = form.getAttribute("ts_workorder1").getValue();
            var fetchXmlWorkOrder = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"> <entity name="msdyn_workorder"><attribute name="msdyn_name" /> <attribute name="msdyn_workorderid" /> <attribute name="msdyn_primaryincidenttype" /> <order attribute="msdyn_name" descending="false" /> <filter type="and"> <condition attribute="msdyn_servicerequest" operator="eq" value="' + caseId + '"/></filter> </entity> </fetch>';
            //Do not allow Work Order 1 to be selected again for Work Order 2
            if (WorkOrder1Value != null) {
                var workOrder1Id = WorkOrder1Value[0].id;
                fetchXmlWorkOrder = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"> <entity name="msdyn_workorder"><attribute name="msdyn_name" /> <attribute name="msdyn_workorderid" /> <attribute name="msdyn_primaryincidenttype" /> <order attribute="msdyn_name" descending="false" /> <filter type="and"> <condition attribute="msdyn_servicerequest" operator="eq" value="' + caseId + '"/><condition attribute="msdyn_workorderid" operator="ne" value="' + workOrder1Id + '" /> </filter> </entity> </fetch>';
            }
            var layoutXmlWorkOrder = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_workorder"><cell name="msdyn_name" width="200" /><cell name="msdyn_primaryincidenttype" width="200" /></row></grid>';
            form.getControl("ts_workorder2").addCustomView(viewIdWorkOrder, entityNameWorkOrder, viewDisplayNameWorkOrder, fetchXmlWorkOrder, layoutXmlWorkOrder, true);
        }
        function setWOST1FilteredView(form) {
            var WorkOrderValue = form.getAttribute("ts_workorder1").getValue();
            var workOrderId = (WorkOrderValue != null) ? WorkOrderValue[0].id : null;
            var viewIdWOST = '{1c259fee-0541-4cac-8d20-7b30ee391113}';
            var entityNameWOST = "msdyn_workorderservicetask";
            var viewDisplayNameWOST = "RelatedWorkOrderServiceTasks1";
            var fetchXmlWOST = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"> <entity name="msdyn_workorderservicetask"><attribute name="msdyn_name" /> <attribute name="msdyn_tasktype" /> <order attribute="msdyn_lineorder" descending="false" /> <filter type="and"> <condition attribute="msdyn_workorder" operator="eq" value="' + workOrderId + '" /> </filter> </entity> </fetch>';
            var layoutXmlWOST = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_workorderservicetask"><cell name="msdyn_name" width="200" /><cell name="msdyn_tasktype" width="200" /></row></grid>';
            form.getControl("ts_workorderservicetask1").addCustomView(viewIdWOST, entityNameWOST, viewDisplayNameWOST, fetchXmlWOST, layoutXmlWOST, true);
        }
        function setWOST2FilteredView(form) {
            var WorkOrderValue = form.getAttribute("ts_workorder2").getValue();
            var workOrderId = (WorkOrderValue != null) ? WorkOrderValue[0].id : null;
            var viewIdWOST = '{1c259fee-0541-4cac-8d20-7b30ee391114}';
            var entityNameWOST = "msdyn_workorderservicetask";
            var viewDisplayNameWOST = "RelatedWorkOrderServiceTasks2";
            var fetchXmlWOST = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"> <entity name="msdyn_workorderservicetask"><attribute name="msdyn_name" /> <attribute name="msdyn_tasktype" /> <order attribute="msdyn_lineorder" descending="false" /> <filter type="and"> <condition attribute="msdyn_workorder" operator="eq" value="' + workOrderId + '" /> </filter> </entity> </fetch>';
            var layoutXmlWOST = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_workorderservicetask"><cell name="msdyn_name" width="200" /><cell name="msdyn_tasktype" width="200" /></row></grid>';
            form.getControl("ts_workorderservicetask2").addCustomView(viewIdWOST, entityNameWOST, viewDisplayNameWOST, fetchXmlWOST, layoutXmlWOST, true);
        }
        function setAdditionalInspectors1FilteredView(form) {
            var WorkOrderValue = form.getAttribute("ts_workorder1").getValue();
            var workOrderId = (WorkOrderValue != null) ? WorkOrderValue[0].id : null;
            var viewIdAdditionalInspectors = '{1c259fee-0541-4cac-8d20-7b30ee391115}';
            var entityNameAdditionalInspectors = "systemuser";
            var viewDisplayNameAdditionalInspectors = "RelatedAdditionalInspectors1";
            var fetchXmlAdditionalInspectors = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="systemuser" ><attribute name="fullname" /> <attribute name="title" /> <link-entity name="teammembership" from="systemuserid" to="systemuserid" intersect="true" > <link-entity name="team" from="teamid" to="teamid" intersect="true" > <link-entity name="msdyn_workorder" from="msdyn_workorderid" to="regardingobjectid" > <filter> <condition attribute="msdyn_workorderid" operator="eq" value="' + workOrderId + '" /> </filter> </link-entity> </link-entity> </link-entity> </entity> </fetch>';
            var layoutXmlAdditionalInspectors = '<grid name="resultset" object="10010" jump="fullname" select="1" icon="1" preview="1"><row name="result" id="systemuser"><cell name="fullname" width="200" /><cell name="title" width="200" /></row></grid>';
            form.getControl("ts_additionalinspectors1").addCustomView(viewIdAdditionalInspectors, entityNameAdditionalInspectors, viewDisplayNameAdditionalInspectors, fetchXmlAdditionalInspectors, layoutXmlAdditionalInspectors, true);
        }
        function setAdditionalInspectors2FilteredView(form) {
            var WorkOrderValue = form.getAttribute("ts_workorder2").getValue();
            var workOrderId = (WorkOrderValue != null) ? WorkOrderValue[0].id : null;
            var viewIdAdditionalInspectors = '{1c259fee-0541-4cac-8d20-7b30ee391116}';
            var entityNameAdditionalInspectors = "systemuser";
            var viewDisplayNameAdditionalInspectors = "RelatedAdditionalInspectors2";
            var fetchXmlAdditionalInspectors = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="systemuser" ><attribute name="fullname" /> <attribute name="title" /> <link-entity name="teammembership" from="systemuserid" to="systemuserid" intersect="true" > <link-entity name="team" from="teamid" to="teamid" intersect="true" > <link-entity name="msdyn_workorder" from="msdyn_workorderid" to="regardingobjectid" > <filter> <condition attribute="msdyn_workorderid" operator="eq" value="' + workOrderId + '" /> </filter> </link-entity> </link-entity> </link-entity> </entity> </fetch>';
            var layoutXmlAdditionalInspectors = '<grid name="resultset" object="10010" jump="fullname" select="1" icon="1" preview="1"><row name="result" id="systemuser"><cell name="fullname" width="200" /><cell name="title" width="200" /></row></grid>';
            form.getControl("ts_additionalinspectors2").addCustomView(viewIdAdditionalInspectors, entityNameAdditionalInspectors, viewDisplayNameAdditionalInspectors, fetchXmlAdditionalInspectors, layoutXmlAdditionalInspectors, true);
        }
    })(Incident = ROM.Incident || (ROM.Incident = {}));
})(ROM || (ROM = {}));
