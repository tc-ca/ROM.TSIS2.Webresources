/* eslint-disable @typescript-eslint/triple-slash-reference */
namespace ROM.Incident {
    // EVENTS
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.incident.Main.ROMCase>eContext.getFormContext();
        const regionAttribute = form.getAttribute("ovs_region");

        //Set required fields
        form.getAttribute("msdyn_functionallocation").setRequiredLevel("required");

        switch (form.ui.getFormType()) {
            case 1:
                setRegion(eContext);
                form.getControl("customerid").setDisabled(true);
                form.getControl("msdyn_functionallocation").setDisabled(true);
                break;

            default:
                if (regionAttribute != null && regionAttribute != undefined) {
                    const regionAttributeValue = regionAttribute.getValue();
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
                form.getControl("customerid").setDisabled(false);
                form.getControl("msdyn_functionallocation").setDisabled(false);
                break;
        }
    }

    export function regionOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        try {

            const form = <Form.incident.Main.ROMCase>eContext.getFormContext();
            const regionAttribute = form.getAttribute("ovs_region");

            if (regionAttribute != null && regionAttribute != undefined) {

                // Clear out all dependent fields' value
                if (!form.getControl("ts_country").getDisabled() || form.getAttribute("ts_country").getValue() != null) {
                    form.getAttribute("ts_country").setValue(null);
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
                form.getControl("customerid").setDisabled(true);
                form.getControl("msdyn_functionallocation").setDisabled(true);

                // If previous fields have values, we use the filtered fetchxml in a custom lookup view
                const regionAttributeValue = regionAttribute.getValue();
                if (regionAttributeValue != null && regionAttributeValue != undefined) {

                    if (regionAttributeValue[0].name != "International") {
                        // Enable direct dependent field
                        form.getControl("customerid").setDisabled(false);

                        // Custom view: Stakeholders that have operations at a site in the specified region
                        const viewId = '{5463C38B-8BC4-4C95-BD05-491798FEAE23}';
                        const entityName = "account";
                        const viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/Incident", "FilteredStakeholders");
                        const fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"> <entity name="account"> <attribute name="name" /> <attribute name="accountid" /> <order attribute="name" descending="false" /> <filter type="and"> <condition attribute="customertypecode" operator="eq" value="948010000" /> <condition attribute="statecode" operator="eq" value="0" /> </filter> <link-entity name="msdyn_customerasset" from="msdyn_account" to="accountid" link-type="inner" alias="bh"> <link-entity name="msdyn_customerassetcategory" from="msdyn_customerassetcategoryid" to="msdyn_customerassetcategory" link-type="inner" alias="bi"> <filter type="and"> <condition attribute="ts_assetcategorytype" operator="eq" value="717750000" /> </filter> </link-entity> <link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="msdyn_functionallocation" link-type="inner" alias="bj"> <filter type="and"> <condition attribute="ts_region" operator="eq" value="' + regionAttributeValue[0].id + '" /> </filter> </link-entity> </link-entity> </entity> </fetch>';
                        const layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="accountid"><cell name="name" width="200" /></row></grid>';
                        form.getControl("customerid").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                    }
                    else {
                        setCountryFilteredView(form);
                    }
                }
            }
        } catch (e) {
            throw new Error(e.Message);
        }
    }

    export function countryOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        try {

            const form = <Form.incident.Main.ROMCase>eContext.getFormContext();
            const countryAttribute = form.getAttribute("ts_country");

            if (countryAttribute != null && countryAttribute != undefined) {

                // Clear out all dependent fields' value
                if (!form.getControl("customerid").getDisabled() || form.getAttribute("customerid").getValue() != null) {
                    form.getAttribute("customerid").setValue(null);
                }
                if (!form.getControl("msdyn_functionallocation").getDisabled() || form.getAttribute("msdyn_functionallocation").getValue() != null) {
                    form.getAttribute("msdyn_functionallocation").setValue(null);
                }

                // Disable all dependent fields
                form.getControl("customerid").setDisabled(true);
                form.getControl("msdyn_functionallocation").setDisabled(true);

                const countryAttributeValue = countryAttribute.getValue();
                if (countryAttributeValue != null && countryAttributeValue != undefined) {

                    // Enable direct dependent field
                    form.getControl("customerid").setDisabled(false);

                    // Custom view: Stakeholders that have operations at a site in the specified country
                    const viewId = '{5482C38D-8BB4-3B95-BD05-493398FEAE95}';
                    const entityName = "account";
                    const viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/Incident", "FilteredStakeholders");
                    const fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"> <entity name="account"> <attribute name="name" /> <attribute name="accountid" /> <order attribute="name" descending="false" /> <filter type="and"> <condition attribute="customertypecode" operator="eq" value="948010000" /> <condition attribute="statecode" operator="eq" value="0" /> </filter> <link-entity name="msdyn_customerasset" from="msdyn_account" to="accountid" link-type="inner" alias="bb"> <link-entity name="msdyn_customerassetcategory" from="msdyn_customerassetcategoryid" to="msdyn_customerassetcategory" link-type="inner" alias="bc"> <filter type="and"> <condition attribute="ts_assetcategorytype" operator="eq" value="717750000" /> </filter> </link-entity> <link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="msdyn_functionallocation" link-type="inner" alias="bd"> <filter type="and"> <condition attribute="ts_country" operator="eq" value="' + countryAttributeValue[0].id + '" /> </filter> </link-entity> </link-entity> </entity> </fetch>';
                    const layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="accountid"><cell name="name" width="200" /></row></grid>';
                    form.getControl("customerid").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                }
            }
        } catch (e) {
            throw new Error(e.Message);
        }
    }

    export function stakeholderOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        try {

            const form = <Form.incident.Main.ROMCase>eContext.getFormContext();
            const regionAttribute = form.getAttribute("ovs_region");
            const stakeholderAttribute = form.getAttribute("customerid");
            const countryAttribute = form.getAttribute("ts_country");

            if (stakeholderAttribute != null && stakeholderAttribute != undefined) {

                // Clear out all dependent fields' value
                if (!form.getControl("msdyn_functionallocation").getDisabled() || form.getAttribute("msdyn_functionallocation").getValue() != null) {
                    form.getAttribute("msdyn_functionallocation").setValue(null);
                }

                // Disable all dependent fields
                form.getControl("msdyn_functionallocation").setDisabled(true);

                // If an operation type is selected, we use the filtered fetchxml, otherwise, disable and clear out the dependent fields
                const regionAttributeValue = regionAttribute.getValue();
                const stakeholderAttributeValue = stakeholderAttribute.getValue();
                const countryAttributeValue = countryAttribute.getValue();

                if (regionAttributeValue != null && regionAttributeValue != undefined &&
                    stakeholderAttributeValue != null && stakeholderAttributeValue != undefined) {

                    var countryCondition = "";

                    if (countryAttributeValue != null && countryAttributeValue != undefined && regionAttributeValue[0].name != "International") {
                        countryCondition = '<condition attribute="ts_country" operator="eq" value="' + countryAttributeValue[0].id + '"/>';
                    }

                    // Enable direct dependent field
                    form.getControl("msdyn_functionallocation").setDisabled(false);

                    // Custom view: Functional locations in the specified region, that has operation assets associated with the specified stakeholder
                    const viewId = '{6C57256F-F695-4576-9438-49AD892152B7}';
                    const entityName = "msdyn_functionallocation";
                    const viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/Incident", "FilteredSites");
                    const fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"> <entity name="msdyn_functionallocation"> <attribute name="msdyn_functionallocationid" /> <attribute name="msdyn_name" /> <order attribute="msdyn_name" descending="false" /> <filter type="and"> <condition attribute="statecode" operator="eq" value="0" /> <condition attribute="ts_region" operator="eq" value="' + regionAttributeValue[0].id + '" />' + countryCondition + '</filter><link-entity name="msdyn_customerasset" from="msdyn_functionallocation" to="msdyn_functionallocationid" link-type="inner" alias="an"> <filter type="and"> <condition attribute="msdyn_account" operator="eq" value="' + stakeholderAttributeValue[0].id + '" /> </filter> <link-entity name="msdyn_customerassetcategory" from="msdyn_customerassetcategoryid" to="msdyn_customerassetcategory" link-type="inner" alias="ao"> <filter type="and"> <condition attribute="ts_assetcategorytype" operator="eq" value="717750000" /> </filter> </link-entity> </link-entity> </entity> </fetch>';
                    const layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="200" /></row></grid>';
                    form.getControl("msdyn_functionallocation").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                }
            }
        } catch (e) {
            throw new Error(e.Message);
        }
    }

    // FUNCTIONS
    function setRegion(eContext: Xrm.ExecutionContext<any, any>): void {
        var currentUserId = Xrm.Utility.getGlobalContext().userSettings.userId;
        currentUserId = currentUserId.replace(/[{}]/g, "");

        // Get the user's territory
        Xrm.WebApi.online.retrieveRecord("systemuser", currentUserId, "?$select=_territoryid_value").then(
            function success(result) {
                const form = <Form.incident.Main.ROMCase>eContext.getFormContext();
                if (result != null && result["_territoryid_value"] != null) {

                    // NOTE: Our localization plugin can't localize the territory name on system user
                    // So we do an extra call to the territory table to get the localized name
                    Xrm.WebApi.online.retrieveRecord("territory", result["_territoryid_value"], "?$select=name").then(
                        function success(result) {
                            const territoryId = result["territoryid"];
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
                        },
                        function (error) {
                            var alertStrings = { text: error.message };
                            var alertOptions = { height: 120, width: 260 };
                            Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function () { });
                        }
                    );

                }
            },
            function (error) {
                var alertStrings = { text: error.message };
                var alertOptions = { height: 120, width: 260 };
                Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function () { });
            }
        );
    }

    function setCountryFilteredView(form: Form.incident.Main.ROMCase): void {
        form.getControl("ts_country").setDisabled(false);
        form.getControl("ts_country").setVisible(true);
        form.getAttribute("ts_country").setRequiredLevel("required");

        // Custom view: Countries that have an international site
        const viewId = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F662}';
        const entityName = "tc_country";
        const viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredCountries");
        const fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"><entity name="tc_country"><attribute name="tc_countryid" /><attribute name="tc_name" /><order attribute="tc_name" descending="false" /><filter type="and"><condition attribute="statecode" operator="eq" value="0" /></filter><link-entity name="msdyn_functionallocation" from="ts_country" to="tc_countryid" link-type="inner" alias="ae"><filter type="and"><condition attribute="ts_region" operator="eq" value="{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}" /></filter></link-entity></entity></fetch>';
        const layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="tc_countryid"><cell name="tc_name" width="200" /></row></grid>';
        form.getControl("ts_country").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
    }

  }
