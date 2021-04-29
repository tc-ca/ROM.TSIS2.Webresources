/* eslint-disable @typescript-eslint/triple-slash-reference */
namespace ROM.Incident {
    // EVENTS
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.incident.Main.ROMCase>eContext.getFormContext();

        switch (form.ui.getFormType()) {
            case 1:
                setRegion(eContext);
            break;
        }

        const regionAttribute = form.getAttribute("ovs_region");
        if (regionAttribute != null && regionAttribute != undefined) {

            const regionAttributeValue = regionAttribute.getValue();

            if (regionAttributeValue != null && regionAttributeValue != undefined){                
                if(regionAttributeValue[0].id == "{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}"){
                    form.getControl("ts_country").setVisible(true);
                }
            }
            else{
                form.getControl("ts_country").setVisible(false);
            }
        }
    }

    export function regionOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        try {

            const form = <Form.incident.Main.ROMCase>eContext.getFormContext();
            const regionAttribute = form.getAttribute("ovs_region");
            const countryAttribute = form.getAttribute("ts_country");

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
                const regionAttributeValue = regionAttribute.getValue();
                const countryAttributeValue = countryAttribute.getValue();
                if (regionAttributeValue != null && regionAttributeValue != undefined) {

                    if(regionAttributeValue[0].name != "International"){
                        // Enable direct dependent field
                        form.getControl("ovs_regulatedentity").setDisabled(false);
                            
                        // Setup a custom view
                        // This value is never saved and only needs to be unique among the other available views for the lookup.
                        const viewId = '{5463C38B-8BC4-4C95-BD05-491798FEAE23}';
                        const entityName = "account";
                        const viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/Incident", "FilteredRegulatedEntities");

                        const fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"><entity name="account"><attribute name="name"/><attribute name="accountid"/><order attribute="name" descending="false"/><filter type="and"><condition attribute="customertypecode" operator="eq" value="948010000"/></filter><link-entity name="ovs_operation" from="ovs_regulatedentityid" to="accountid" link-type="inner" alias="ag"><link-entity name="account" from="accountid" to="ovs_siteid" link-type="inner" alias="ah"><filter type="and"><condition attribute="msdyn_serviceterritory" operator="eq" value="' + regionAttributeValue[0].id + '" /></filter></link-entity></link-entity></entity></fetch>';
                        const layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="accountid"><cell name="name" width="200" /></row></grid>';
                        form.getControl("ovs_regulatedentity").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                    }
                    else{
                        form.getControl("ts_country").setVisible(true);
                    }
                }
                else{
                    form.getControl("ts_country").setVisible(false);
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
            const regionAttribute = form.getAttribute("ovs_region");

            if (countryAttribute != null && countryAttribute != undefined) {

                // Clear out all dependent fields' value

                if (!form.getControl("ovs_regulatedentity").getDisabled() || form.getAttribute("ovs_regulatedentity").getValue() != null) {
                    form.getAttribute("ovs_regulatedentity").setValue(null);
                }
                if (!form.getControl("ovs_site").getDisabled() || form.getAttribute("ovs_site").getValue() != null) {
                    form.getAttribute("ovs_site").setValue(null);
                }

                const regionAttributeValue = regionAttribute.getValue();
                const countryAttributeValue = countryAttribute.getValue();

                if (countryAttributeValue != null && countryAttributeValue != undefined) {

                    // Enable direct dependent field
                    form.getControl("ovs_regulatedentity").setDisabled(false);
                        
                    // Setup a custom view
                    // This value is never saved and only needs to be unique among the other available views for the lookup.
                    const viewId = '{5482C38D-8BB4-3B95-BD05-493398FEAE95}';
                    const entityName = "account";
                    const viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/Incident", "FilteredRegulatedEntities");
                    const fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"><entity name="account"><attribute name="name"/><attribute name="accountid"/><order attribute="name" descending="false"/><filter type="and"><condition attribute="customertypecode" operator="eq" value="948010000"/></filter><link-entity name="ovs_operation" from="ovs_regulatedentityid" to="accountid" link-type="inner" alias="ag"><link-entity name="account" from="accountid" to="ovs_siteid" link-type="inner" alias="ah"><filter type="and"><condition attribute="ts_country" operator="eq" value="' + countryAttributeValue[0].id + '"/></filter></link-entity></link-entity></entity></fetch>';
                    const layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="accountid"><cell name="name" width="200" /></row></grid>';
                    form.getControl("ovs_regulatedentity").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);

                }

            }
        } catch (e) {
            throw new Error(e.Message);
        }
    }

    export function regulatedEntityOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        try {

            const form = <Form.incident.Main.ROMCase>eContext.getFormContext();
            const regionAttribute = form.getAttribute("ovs_region");
            const operationTypeAttribute = form.getAttribute("ovs_operationtypeid");
            const regulatedEntityAttribute = form.getAttribute("ovs_regulatedentity");
            const countryAttribute = form.getAttribute("ts_country");

            if (regulatedEntityAttribute != null && regulatedEntityAttribute != undefined) {

                // Clear out all dependent fields' value
                if (!form.getControl("ovs_site").getDisabled() || form.getAttribute("ovs_site").getValue() != null) {
                    form.getAttribute("ovs_site").setValue(null);
                }

                // Disable all dependent fields
                form.getControl("ovs_site").setDisabled(true);

                // If an operation type is selected, we use the filtered fetchxml, otherwise, disable and clear out the dependent fields
                const regionAttributeValue = regionAttribute.getValue();
                const regulatedEntityAttributeValue = regulatedEntityAttribute.getValue();
                const countryAttributeValue = countryAttribute.getValue();

                if (regionAttributeValue != null && regionAttributeValue != undefined &&
                    regulatedEntityAttributeValue != null && regulatedEntityAttributeValue != undefined) {

                    var countryXML = "";

                    if(countryAttributeValue != null && countryAttributeValue != undefined ){
                        if(regionAttributeValue[0].name != "International"){
                            form.getControl("ovs_site").setDisabled(false);
                        }
                        else{
                            countryXML = '<condition attribute="ts_country" operator="eq" value="' + countryAttributeValue[0].id + '"/>';
                        }
                    } 
                    // Enable direct dependent field
                    form.getControl("ovs_site").setDisabled(false);

                    // Setup a custom view
                    // This value is never saved and only needs to be unique among the other available views for the lookup.
                    const viewId = '{6C57256F-F695-4576-9438-49AD892152B7}';
                    const entityName = "account";
                    const viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/Incident", "FilteredSites");
                    const layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="accountid"><cell name="name" width="200" /><cell name="owner" width="125" /></row></grid>';
                    const fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"><entity name="account"><attribute name="name" /><attribute name="accountid" /><order attribute="name" descending="false" /><filter type="and"><condition attribute="customertypecode" operator="eq" value="948010001" /><condition attribute="msdyn_serviceterritory" operator="eq" value="' + regionAttributeValue[0].id + '" />' + countryXML + '</filter><link-entity name="ovs_operation" from="ovs_siteid" to="accountid" link-type="inner" alias="ab"><filter type="and"><condition attribute="ovs_regulatedentityid" operator="eq" value="' + regulatedEntityAttributeValue[0].id + '" /></filter></link-entity></entity></fetch>';
                    form.getControl("ovs_site").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                    
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
                            if(lookup[0].id == "{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}"){
                                form.getControl("ts_country").setVisible(true);
                            }
                            else{
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

  }
