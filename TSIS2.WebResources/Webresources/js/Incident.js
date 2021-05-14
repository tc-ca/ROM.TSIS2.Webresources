'use strict';

var MainForm =  (function () {
    function MainForm() {
    }
    MainForm.onLoad = function (eContext) {
        var form = eContext.getFormContext();
        var regionAttribute = form.getAttribute("ovs_region");
        form.getAttribute("msdyn_functionallocation").setRequiredLevel("required");
        switch (form.ui.getFormType()) {
            case 1:
                this.setRegion(eContext);
                form.getControl("customerid").setDisabled(true);
                form.getControl("msdyn_functionallocation").setDisabled(true);
                break;
            default:
                if (regionAttribute != null && regionAttribute != undefined) {
                    var regionAttributeValue = regionAttribute.getValue();
                    if (regionAttributeValue != null && regionAttributeValue != undefined) {
                        if (regionAttributeValue[0].id == "{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}") {
                            form.getControl("ts_country").setVisible(true);
                            form.getAttribute("ts_country").setRequiredLevel("required");
                        }
                    }
                    else {
                        form.getControl("ts_country").setVisible(false);
                    }
                }
                form.getControl("customerid").setDisabled(false);
                form.getControl("msdyn_functionallocation").setDisabled(false);
                break;
        }
        var fetchXML = "<fetch> <entity name=\"incident\" > <attribute name=\"incidentid\" /> <filter> <condition attribute=\"incidentid\" operator=\"eq\" value=\"" + form.data.entity.getId() + "\" /> </filter> <link-entity name=\"msdyn_workorder\" from=\"msdyn_servicerequest\" to=\"incidentid\" /> </entity> </fetch>";
        fetchXML = "?fetchXml=" + encodeURIComponent(fetchXML);
        Xrm.WebApi.retrieveMultipleRecords("incident", fetchXML).then(function success(result) {
            if (result.entities.length > 0) {
                form.getControl("ovs_region").setDisabled(true);
                form.getControl("ts_country").setDisabled(true);
                form.getControl("ts_stakeholder").setDisabled(true);
                form.getControl("msdyn_functionallocation").setDisabled(true);
            }
        }, function (error) {
        });
    };
    MainForm.regionOnChange = function (eContext) {
        try {
            var form = eContext.getFormContext();
            var regionAttribute = form.getAttribute("ovs_region");
            if (regionAttribute != null && regionAttribute != undefined) {
                if (!form.getControl("ts_country").getDisabled() || form.getAttribute("ts_country").getValue() != null) {
                    form.getAttribute("ts_country").setValue(null);
                }
                if (!form.getControl("customerid").getDisabled() || form.getAttribute("customerid").getValue() != null) {
                    form.getAttribute("customerid").setValue(null);
                }
                if (!form.getControl("msdyn_functionallocation").getDisabled() || form.getAttribute("msdyn_functionallocation").getValue() != null) {
                    form.getAttribute("msdyn_functionallocation").setValue(null);
                }
                form.getControl("ts_country").setVisible(false);
                form.getAttribute("ts_country").setRequiredLevel("none");
                form.getControl("customerid").setDisabled(true);
                form.getControl("msdyn_functionallocation").setDisabled(true);
                var regionAttributeValue = regionAttribute.getValue();
                if (regionAttributeValue != null && regionAttributeValue != undefined) {
                    if (regionAttributeValue[0].name != "International") {
                        form.getControl("customerid").setDisabled(false);
                        var viewId = '{5463C38B-8BC4-4C95-BD05-491798FEAE23}';
                        var entityName = "account";
                        var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/Incident", "FilteredStakeholders");
                        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"> <entity name="account"> <attribute name="name" /> <attribute name="accountid" /> <order attribute="name" descending="false" /> <filter type="and"> <condition attribute="customertypecode" operator="eq" value="948010000" /> <condition attribute="statecode" operator="eq" value="0" /> </filter> <link-entity name="msdyn_customerasset" from="msdyn_account" to="accountid" link-type="inner" alias="bh"> <link-entity name="msdyn_customerassetcategory" from="msdyn_customerassetcategoryid" to="msdyn_customerassetcategory" link-type="inner" alias="bi"> <filter type="and"> <condition attribute="ts_assetcategorytype" operator="eq" value="717750000" /> </filter> </link-entity> <link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="msdyn_functionallocation" link-type="inner" alias="bj"> <filter type="and"> <condition attribute="ts_region" operator="eq" value="' + regionAttributeValue[0].id + '" /> </filter> </link-entity> </link-entity> </entity> </fetch>';
                        var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="accountid"><cell name="name" width="200" /></row></grid>';
                        form.getControl("customerid").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                    }
                    else {
                        this.setCountryFilteredView(form);
                    }
                }
            }
        }
        catch (e) {
            throw new Error(e.Message);
        }
    };
    MainForm.countryOnChange = function (eContext) {
        try {
            var form = eContext.getFormContext();
            var countryAttribute = form.getAttribute("ts_country");
            if (countryAttribute != null && countryAttribute != undefined) {
                if (!form.getControl("customerid").getDisabled() || form.getAttribute("customerid").getValue() != null) {
                    form.getAttribute("customerid").setValue(null);
                }
                if (!form.getControl("msdyn_functionallocation").getDisabled() || form.getAttribute("msdyn_functionallocation").getValue() != null) {
                    form.getAttribute("msdyn_functionallocation").setValue(null);
                }
                form.getControl("customerid").setDisabled(true);
                form.getControl("msdyn_functionallocation").setDisabled(true);
                var countryAttributeValue = countryAttribute.getValue();
                if (countryAttributeValue != null && countryAttributeValue != undefined) {
                    form.getControl("customerid").setDisabled(false);
                    var viewId = '{5482C38D-8BB4-3B95-BD05-493398FEAE95}';
                    var entityName = "account";
                    var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/Incident", "FilteredStakeholders");
                    var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"> <entity name="account"> <attribute name="name" /> <attribute name="accountid" /> <order attribute="name" descending="false" /> <filter type="and"> <condition attribute="customertypecode" operator="eq" value="948010000" /> <condition attribute="statecode" operator="eq" value="0" /> </filter> <link-entity name="msdyn_customerasset" from="msdyn_account" to="accountid" link-type="inner" alias="bb"> <link-entity name="msdyn_customerassetcategory" from="msdyn_customerassetcategoryid" to="msdyn_customerassetcategory" link-type="inner" alias="bc"> <filter type="and"> <condition attribute="ts_assetcategorytype" operator="eq" value="717750000" /> </filter> </link-entity> <link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="msdyn_functionallocation" link-type="inner" alias="bd"> <filter type="and"> <condition attribute="ts_country" operator="eq" value="' + countryAttributeValue[0].id + '" /> </filter> </link-entity> </link-entity> </entity> </fetch>';
                    var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="accountid"><cell name="name" width="200" /></row></grid>';
                    form.getControl("customerid").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                }
            }
        }
        catch (e) {
            throw new Error(e.Message);
        }
    };
    MainForm.stakeholderOnChange = function (eContext) {
        try {
            var form = eContext.getFormContext();
            var regionAttribute = form.getAttribute("ovs_region");
            var stakeholderAttribute = form.getAttribute("customerid");
            var countryAttribute = form.getAttribute("ts_country");
            if (stakeholderAttribute != null && stakeholderAttribute != undefined) {
                if (!form.getControl("msdyn_functionallocation").getDisabled() || form.getAttribute("msdyn_functionallocation").getValue() != null) {
                    form.getAttribute("msdyn_functionallocation").setValue(null);
                }
                form.getControl("msdyn_functionallocation").setDisabled(true);
                var regionAttributeValue = regionAttribute.getValue();
                var stakeholderAttributeValue = stakeholderAttribute.getValue();
                var countryAttributeValue = countryAttribute.getValue();
                if (regionAttributeValue != null && regionAttributeValue != undefined &&
                    stakeholderAttributeValue != null && stakeholderAttributeValue != undefined) {
                    var countryCondition = "";
                    if (countryAttributeValue != null && countryAttributeValue != undefined && regionAttributeValue[0].name != "International") {
                        countryCondition = '<condition attribute="ts_country" operator="eq" value="' + countryAttributeValue[0].id + '"/>';
                    }
                    form.getControl("msdyn_functionallocation").setDisabled(false);
                    var viewId = '{6C57256F-F695-4576-9438-49AD892152B7}';
                    var entityName = "msdyn_functionallocation";
                    var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/Incident", "FilteredSites");
                    var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"> <entity name="msdyn_functionallocation"> <attribute name="msdyn_functionallocationid" /> <attribute name="msdyn_name" /> <order attribute="msdyn_name" descending="false" /> <filter type="and"> <condition attribute="statecode" operator="eq" value="0" /> <condition attribute="ts_region" operator="eq" value="' + regionAttributeValue[0].id + '" />' + countryCondition + '</filter><link-entity name="msdyn_customerasset" from="msdyn_functionallocation" to="msdyn_functionallocationid" link-type="inner" alias="an"> <filter type="and"> <condition attribute="msdyn_account" operator="eq" value="' + stakeholderAttributeValue[0].id + '" /> </filter> <link-entity name="msdyn_customerassetcategory" from="msdyn_customerassetcategoryid" to="msdyn_customerassetcategory" link-type="inner" alias="ao"> <filter type="and"> <condition attribute="ts_assetcategorytype" operator="eq" value="717750000" /> </filter> </link-entity> </link-entity> </entity> </fetch>';
                    var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="200" /></row></grid>';
                    form.getControl("msdyn_functionallocation").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                }
            }
        }
        catch (e) {
            throw new Error(e.Message);
        }
    };
    MainForm.setRegion = function (eContext) {
        var currentUserId = Xrm.Utility.getGlobalContext().userSettings.userId;
        currentUserId = currentUserId.replace(/[{}]/g, "");
        var $this = this;
        Xrm.WebApi.online.retrieveRecord("systemuser", currentUserId, "?$select=_territoryid_value").then(function success(result) {
            var form = eContext.getFormContext();
            if (result != null && result["_territoryid_value"] != null) {
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
                    if (lookup[0].id == "{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}") {
                        $this.setCountryFilteredView(form);
                    }
                    else {
                        $this.regionOnChange(eContext);
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
    };
    MainForm.setCountryFilteredView = function (form) {
        form.getControl("ts_country").setDisabled(false);
        form.getControl("ts_country").setVisible(true);
        form.getAttribute("ts_country").setRequiredLevel("required");
        var viewId = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F662}';
        var entityName = "tc_country";
        var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredCountries");
        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"><entity name="tc_country"><attribute name="tc_countryid" /><attribute name="tc_name" /><order attribute="tc_name" descending="false" /><filter type="and"><condition attribute="statecode" operator="eq" value="0" /></filter><link-entity name="msdyn_functionallocation" from="ts_country" to="tc_countryid" link-type="inner" alias="ae"><filter type="and"><condition attribute="ts_region" operator="eq" value="{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}" /></filter></link-entity></entity></fetch>';
        var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="tc_countryid"><cell name="tc_name" width="200" /></row></grid>';
        form.getControl("ts_country").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
    };
    return MainForm;
}());

var ROM;
(function (ROM) {
    (function (Incident) {
        function onLoad(eContext) {
            MainForm.onLoad(eContext);
        }
        Incident.onLoad = onLoad;
        function regionOnChange(eContext) {
            MainForm.regionOnChange(eContext);
        }
        Incident.regionOnChange = regionOnChange;
        function countryOnChange(eContext) {
            MainForm.countryOnChange(eContext);
        }
        Incident.countryOnChange = countryOnChange;
        function stakeholderOnChange(eContext) {
            MainForm.stakeholderOnChange(eContext);
        }
        Incident.stakeholderOnChange = stakeholderOnChange;
    })(ROM.Incident || (ROM.Incident = {}));
})(ROM || (ROM = {}));
