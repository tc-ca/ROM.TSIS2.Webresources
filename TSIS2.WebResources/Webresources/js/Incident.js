"use strict";
/* eslint-disable @typescript-eslint/triple-slash-reference */
var ROM;
(function (ROM) {
    var Incident;
    (function (Incident) {
        // EVENTS
        function onLoad(eContext) {
            var form = eContext.getFormContext();
        }
        Incident.onLoad = onLoad;
        function regionOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var regionAttribute = form.getAttribute("ovs_region");
                var countryAttribute = form.getAttribute("ovs_countryid");
                if (regionAttribute != null && regionAttribute != undefined) {
                    // Clear out all dependent fields' value
                    if (!form.getControl("ovs_regulatedentity").getDisabled() || form.getAttribute("ovs_regulatedentity").getValue() != null) {
                        form.getAttribute("ovs_regulatedentity").setValue(null);
                    }
                    if (!form.getControl("ovs_site").getDisabled() || form.getAttribute("ovs_site").getValue() != null) {
                        form.getAttribute("ovs_site").setValue(null);
                    }
                    // Disable all dependent fields
                    form.getControl("ovs_regulatedentity").setDisabled(true);
                    form.getControl("ovs_site").setDisabled(true);
                    // If previous fields have values, we use the filtered fetchxml in a custom lookup view
                    var regionAttributeValue = regionAttribute.getValue();
                    var countryAttributeValue = countryAttribute.getValue();
                    if (regionAttributeValue != null && regionAttributeValue != undefined
                        && regionAttributeValue[0].name != "International") {
                        // Enable direct dependent field
                        form.getControl("ovs_regulatedentity").setDisabled(false);
                        // Setup a custom view
                        // This value is never saved and only needs to be unique among the other available views for the lookup.
                        var viewId = '{5463C38B-8BC4-4C95-BD05-491798FEAE23}';
                        var entityName = "account";
                        var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/Incident", "FilteredRegulatedEntities");
                        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"><entity name="account"><attribute name="name"/><attribute name="accountid"/><order attribute="name" descending="false"/><filter type="and"><condition attribute="customertypecode" operator="eq" value="948010000"/></filter><link-entity name="ovs_operation" from="ovs_regulatedentityid" to="accountid" link-type="inner" alias="ag"><link-entity name="account" from="accountid" to="ovs_siteid" link-type="inner" alias="ah"><filter type="and"><condition attribute="msdyn_serviceterritory" operator="eq" value="' + regionAttributeValue[0].id + '" /></filter></link-entity></link-entity></entity></fetch>';
                        var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="accountid"><cell name="name" width="200" /><cell name="accountid" width="125" /></row></grid>';
                        form.getControl("ovs_regulatedentity").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
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
                var countryAttribute = form.getAttribute("ovs_countryid");
                var regionAttribute = form.getAttribute("ovs_region");
                if (countryAttribute != null && countryAttribute != undefined) {
                    // Clear out all dependent fields' value
                    if (!form.getControl("ovs_regulatedentity").getDisabled() || form.getAttribute("ovs_regulatedentity").getValue() != null) {
                        form.getAttribute("ovs_regulatedentity").setValue(null);
                    }
                    if (!form.getControl("ovs_site").getDisabled() || form.getAttribute("ovs_site").getValue() != null) {
                        form.getAttribute("ovs_site").setValue(null);
                    }
                    var regionAttributeValue = regionAttribute.getValue();
                    var countryAttributeValue = countryAttribute.getValue();
                    if (countryAttributeValue != null && countryAttributeValue != undefined) {
                        // Enable direct dependent field
                        form.getControl("ovs_regulatedentity").setDisabled(false);
                        // Setup a custom view
                        // This value is never saved and only needs to be unique among the other available views for the lookup.
                        var viewId = '{5482C38D-8BB4-3B95-BD05-493398FEAE95}';
                        var entityName = "account";
                        var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/Incident", "FilteredRegulatedEntities");
                        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"><entity name="account"><attribute name="name"/><attribute name="accountid"/><order attribute="name" descending="false"/><filter type="and"><condition attribute="customertypecode" operator="eq" value="948010000"/></filter><link-entity name="ovs_operation" from="ovs_regulatedentityid" to="accountid" link-type="inner" alias="ag"><link-entity name="account" from="accountid" to="ovs_siteid" link-type="inner" alias="ah"><filter type="and"><condition attribute="ovs_countryid" operator="eq" value="' + countryAttributeValue[0].id + '"/></filter></link-entity></link-entity></entity></fetch>';
                        var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="accountid"><cell name="name" width="200" /><cell name="accountid" width="125" /></row></grid>';
                        form.getControl("ovs_regulatedentity").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        Incident.countryOnChange = countryOnChange;
        function regulatedEntityOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var regionAttribute = form.getAttribute("ovs_region");
                var operationTypeAttribute = form.getAttribute("ovs_operationtypeid");
                var regulatedEntityAttribute = form.getAttribute("ovs_regulatedentity");
                var countryAttribute = form.getAttribute("ovs_countryid");
                if (regulatedEntityAttribute != null && regulatedEntityAttribute != undefined) {
                    // Clear out all dependent fields' value
                    if (!form.getControl("ovs_site").getDisabled() || form.getAttribute("ovs_site").getValue() != null) {
                        form.getAttribute("ovs_site").setValue(null);
                    }
                    // Disable all dependent fields
                    form.getControl("ovs_site").setDisabled(true);
                    // If an operation type is selected, we use the filtered fetchxml, otherwise, disable and clear out the dependent fields
                    var regionAttributeValue = regionAttribute.getValue();
                    var regulatedEntityAttributeValue = regulatedEntityAttribute.getValue();
                    var countryAttributeValue = countryAttribute.getValue();
                    if (regionAttributeValue != null && regionAttributeValue != undefined &&
                        regulatedEntityAttributeValue != null && regulatedEntityAttributeValue != undefined) {
                        var countryXML = "";
                        if (countryAttributeValue != null && countryAttributeValue != undefined) {
                            if (regionAttributeValue[0].name != "International") {
                                form.getControl("ovs_site").setDisabled(false);
                            }
                            else {
                                countryXML = '<condition attribute="ovs_countryid" operator="eq" value="' + countryAttributeValue[0].id + '"/>';
                            }
                        }
                        // Enable direct dependent field
                        form.getControl("ovs_site").setDisabled(false);
                        // Setup a custom view
                        // This value is never saved and only needs to be unique among the other available views for the lookup.
                        var viewId = '{6C57256F-F695-4576-9438-49AD892152B7}';
                        var entityName = "account";
                        var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/Incident", "FilteredSites");
                        var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="accountid"><cell name="name" width="200" /><cell name="owner" width="125" /></row></grid>';
                        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"><entity name="account"><attribute name="name" /><attribute name="accountid" /><order attribute="name" descending="false" /><filter type="and"><condition attribute="customertypecode" operator="eq" value="948010001" /><condition attribute="msdyn_serviceterritory" operator="eq" value="' + regionAttributeValue[0].id + '" />' + countryXML + '</filter><link-entity name="ovs_operation" from="ovs_siteid" to="accountid" link-type="inner" alias="ab"><filter type="and"><condition attribute="ovs_regulatedentityid" operator="eq" value="' + regulatedEntityAttributeValue[0].id + '" /></filter></link-entity></entity></fetch>';
                        form.getControl("ovs_site").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        Incident.regulatedEntityOnChange = regulatedEntityOnChange;
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
                        if (lookup[0].name == "International") {
                            form.getControl("ovs_countryid").setVisible(true);
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
    })(Incident = ROM.Incident || (ROM.Incident = {}));
})(ROM || (ROM = {}));
