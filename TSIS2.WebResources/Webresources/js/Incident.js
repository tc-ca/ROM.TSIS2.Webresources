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
            // Lock some fields if there are associated WOs
            var fetchXML = "<fetch> <entity name=\"incident\" > <attribute name=\"incidentid\" /> <filter> <condition attribute=\"incidentid\" operator=\"eq\" value=\"" + form.data.entity.getId() + "\" /> </filter> <link-entity name=\"msdyn_workorder\" from=\"msdyn_servicerequest\" to=\"incidentid\" /> </entity> </fetch>";
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
        }
        Incident.onLoad = onLoad;
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
                            var fetchXmlTradename = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" returntotalrecordcount="true" page="1" no-lock="false"><entity name="ts_tradename" ><attribute name="ts_tradenameid" /><attribute name="ts_name" /><order attribute="ts_stakeholderidname" /><order attribute="ts_name" /><link-entity name="account" from="accountid" to="ts_stakeholderid" ><link-entity name="ovs_operation" from="ts_stakeholder" to="accountid" link-type="inner" alias="ac"><link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="ts_site" link-type="inner" alias="ad"><filter type="and"><condition attribute="ts_region" operator="eq" value="' + regionAttributeValue[0].id + '"/></filter></link-entity></link-entity></link-entity></entity></fetch>';
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
    })(Incident = ROM.Incident || (ROM.Incident = {}));
})(ROM || (ROM = {}));
