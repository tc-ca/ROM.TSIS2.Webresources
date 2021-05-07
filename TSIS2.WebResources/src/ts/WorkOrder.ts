/* eslint-disable @typescript-eslint/triple-slash-reference */
namespace ROM.WorkOrder {
    // EVENTS
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();
        const state = form.getAttribute("statecode").getValue();

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
            case 1:  //Create New Work Order
                setDefaultFiscalYear(form);
                setRegion(form);

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

                const regionAttribute = form.getAttribute("ts_region");
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

                break;
        }

    }

    export function onSave(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();
        const systemStatus = form.getAttribute("msdyn_systemstatus").getValue();

        var workOrderServiceTaskData;

        if (systemStatus == 690970004) { //Only close associated entities when Record Status is set to Closed - Posted
            workOrderServiceTaskData =
            {
                "statecode": 1,           //open -> 0
                "statuscode": 918640003    //open -> 918640002
            };

            //Close/Open associated work order service task(s)
            closeWorkOrderServiceTasks(form, workOrderServiceTaskData);

            //Set inactive views
            setWorkOrderServiceTasksView(form, false);
        }
    }

    export function workOrderTypeOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        try {

            const form = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();
            const workOrderTypeAttribute = form.getAttribute("msdyn_workordertype");
            const regionAttribute = form.getAttribute("ts_region");
            const countryAttribute = form.getAttribute("ts_country");

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

                const workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();
                const regionAttributeValue = regionAttribute.getValue();
                const countryAttributeValue = countryAttribute.getValue();
                if (workOrderTypeAttributeValue != null && workOrderTypeAttributeValue != undefined) {
                    // Enable direct dependent field
                    form.getControl("ts_region").setDisabled(false);

                    if (regionAttributeValue != null && regionAttributeValue != undefined) {
                        if (regionAttributeValue[0].name != "International") {
                            setOperationTypeFilteredView(form, regionAttributeValue[0].id, "", workOrderTypeAttributeValue[0].id);

                        } else {
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
        } catch (e) {
            throw new Error(e.Message);
        }
    }

    export function regionOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        try {

            const form = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();
            const workOrderTypeAttribute = form.getAttribute("msdyn_workordertype");
            const regionAttribute = form.getAttribute("ts_region");

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
                const workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();
                const regionAttributeValue = regionAttribute.getValue();
                if (workOrderTypeAttributeValue != null && workOrderTypeAttributeValue != undefined &&
                    regionAttributeValue != null && regionAttributeValue != undefined) {

                    // Enable direct dependent field
                    if (regionAttributeValue[0].name != "International") {
                        setOperationTypeFilteredView(form, regionAttributeValue[0].id, "", workOrderTypeAttributeValue[0].id);

                    } else {
                        form.getControl("ts_country").setDisabled(false);
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

            const form = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();
            const workOrderTypeAttribute = form.getAttribute("msdyn_workordertype");
            const regionAttribute = form.getAttribute("ts_region");
            const countryAttribute = form.getAttribute("ts_country");

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

                const workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();
                const regionAttributeValue = regionAttribute.getValue();
                const countryAttributeValue = countryAttribute.getValue();
                if (workOrderTypeAttributeValue != null && workOrderTypeAttributeValue != undefined &&
                    regionAttributeValue != null && regionAttributeValue != undefined &&
                    countryAttributeValue != null && countryAttributeValue != undefined) {
                    var countryCondition = '<condition attribute="ts_country" operator="eq" value="' + countryAttributeValue[0].id + '" />';
                    setOperationTypeFilteredView(form, regionAttributeValue[0].id, countryCondition, workOrderTypeAttributeValue[0].id);
                }
            }
        } catch (e) {
            throw new Error(e.Message);
        }
    }

    export function fiscalYearOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        //if new fiscal year is selected, then previous selection of quarter no longer corresponds
        removeSelectedFiscalQuarter(eContext);
    }

    export function operationTypeOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        try {

            const form = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();
            const workOrderTypeAttribute = form.getAttribute("msdyn_workordertype");
            const regionAttribute = form.getAttribute("ts_region");
            const operationTypeAttribute = form.getAttribute("ovs_assetcategory");
            const countryAttribute = form.getAttribute("ts_country");

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
                const workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();
                const regionAttributeValue = regionAttribute.getValue();
                const operationTypeAttributeValue = operationTypeAttribute.getValue();
                const countryAttributeValue = countryAttribute.getValue();
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
                    const viewId = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F660}';
                    const entityName = "account";
                    const viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredStakeholders");
                    const fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"><entity name="account"><attribute name="name" /><attribute name="accountid" /><order attribute="name" descending="false" /><filter type="and"><condition attribute="customertypecode" operator="eq" value="948010000" /><condition attribute="statecode" operator="eq" value="0" /></filter><link-entity name="msdyn_customerasset" from="msdyn_account" to="accountid" link-type="inner" alias="af"><filter type="and"><condition attribute="msdyn_customerassetcategory" operator="eq" value="' + operationTypeAttributeValue[0].id + '" /></filter><link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="msdyn_functionallocation" link-type="inner" alias="ag"><filter type="and"><condition attribute="ts_region" operator="eq" value="' + regionAttributeValue[0].id + '" />' + countryCondition + '</filter></link-entity></link-entity></entity></fetch>';
                    const layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="accountid"><cell name="name" width="200" /></row></grid>';
                    form.getControl("msdyn_serviceaccount").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);

                    //Custom view for Activity Type
                    const viewIdActivity = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F661}';
                    const entityNameActivity = "msdyn_incidenttype";
                    const viewDisplayNameActivity = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredActivityType");
                    const fetchXmlActivity = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="msdyn_incidenttype"><attribute name="msdyn_name" /><attribute name="msdyn_incidenttypeid" /><order attribute="msdyn_name" descending="false" /><filter type="and"><condition attribute="ts_operationtype" operator="eq" value="' + operationTypeAttributeValue[0].id + '" /><condition attribute="msdyn_defaultworkordertype" operator="eq" value="' + workOrderTypeAttributeValue[0].id + '" /></filter></entity></fetch>';
                    const layoutXmlActivity = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_incidenttypeid"><cell name="msdyn_name" width="200" /></row></grid>';
                    form.getControl("msdyn_primaryincidenttype").addCustomView(viewIdActivity, entityNameActivity, viewDisplayNameActivity, fetchXmlActivity, layoutXmlActivity, true);
                }
            }
        } catch (e) {
            throw new Error(e.Message);
        }
    }

    export function stakeholderOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        try {

            const form = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();
            const regionAttribute = form.getAttribute("ts_region");
            const operationTypeAttribute = form.getAttribute("ovs_assetcategory");
            const stakeholderAttribute = form.getAttribute("msdyn_serviceaccount");
            const countryAttribute = form.getAttribute("ts_country");

            if (stakeholderAttribute != null && stakeholderAttribute != undefined) {

                // Clear out all dependent fields' value
                if (!form.getControl("ts_site").getDisabled() || form.getAttribute("ts_site").getValue() != null) {
                    form.getAttribute("ts_site").setValue(null);
                }

                // Disable all dependent fields
                form.getControl("ts_site").setDisabled(true);

                // If an operation type is selected, we use the filtered fetchxml, otherwise, disable and clear out the dependent fields
                const regionAttributeValue = regionAttribute.getValue();
                const operationTypeAttributeValue = operationTypeAttribute.getValue();
                const stakeholderAttributeValue = stakeholderAttribute.getValue();
                const countryAttributeValue = countryAttribute.getValue();

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
                    const viewId = '{6E57251F-F695-4076-9498-49AB892154B7}';
                    const entityName = "msdyn_functionallocation";
                    const viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredSites");
                    const fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"><entity name="msdyn_functionallocation"><attribute name="msdyn_functionallocationid" /><attribute name="msdyn_name" /><order attribute="msdyn_name" descending="false" /><filter type="and"><condition attribute="statecode" operator="eq" value="0" /><condition attribute="ts_region" operator="eq" value="' + regionAttributeValue[0].id + '" />' + countryCondition + '</filter><link-entity name="msdyn_customerasset" from="msdyn_functionallocation" to="msdyn_functionallocationid" link-type="inner" alias="aq"><filter type="and"><condition attribute="msdyn_customerassetcategory" operator="eq" value="' + operationTypeAttributeValue[0].id + '" /><condition attribute="msdyn_account" operator="eq" value="' + stakeholderAttributeValue[0].id + '" /></filter></link-entity></entity></fetch>';
                    const layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="200" /></row></grid>';
                    form.getControl("ts_site").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                }

            }
        } catch (e) {
            throw new Error(e.Message);
        }
    }

    export function siteOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        try {

            const form = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();
            const operationTypeAttribute = form.getAttribute("ovs_assetcategory");
            const siteAttribute = form.getAttribute("ts_site");

            if (siteAttribute != null && siteAttribute != undefined) {

                // Clear out all dependent fields' value
                if (!form.getControl("ovs_asset").getDisabled() || form.getAttribute("ovs_asset").getValue() != null) {
                    form.getAttribute("ovs_asset").setValue(null);
                }

                // Disable all dependent fields
                form.getControl("ovs_asset").setDisabled(true);

                // If an operation type is selected, we use the filtered fetchxml, otherwise, disable and clear out the dependent fields
                const operationTypeAttributeValue = operationTypeAttribute.getValue();
                const siteAttributeValue = siteAttribute.getValue();

                if (siteAttributeValue != null && siteAttributeValue != undefined &&
                    operationTypeAttributeValue != null && operationTypeAttributeValue != undefined) {

                    // Enable direct dependent field
                    form.getControl("ovs_asset").setDisabled(false);

                    // Setup a custom view
                    // This value is never saved and only needs to be unique among the other available views for the lookup.
                    const viewId = '{C0DAF55B-505E-410C-B0CD-CD0F24F63233}';
                    const entityName = "msdyn_customerasset";
                    const viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredOperations");
                    const fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="msdyn_customerasset"><attribute name="msdyn_account" /><attribute name="msdyn_name" /><attribute name="msdyn_functionallocation" /><attribute name="msdyn_customerassetid" /><order attribute="msdyn_name" descending="true" /><filter type="and"><condition attribute="msdyn_customerassetcategory" operator="eq" value="' + operationTypeAttributeValue[0].id + '" /><condition attribute="msdyn_functionallocation" operator="eq" value="' + siteAttributeValue[0].id + '" /></filter></entity></fetch>';
                    const layoutXml = '<grid name="resultset" object="10300" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_customerassetid"><cell name="msdyn_name" width="200" /></row></grid>';
                    form.getControl("ovs_asset").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                }

            }
        } catch (e) {
            throw new Error(e.Message);
        }
    }

    export function systemStatusOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();
        var systemStatus = formContext.getAttribute("msdyn_systemstatus").getValue();

        //If system status is set to closed
        if (systemStatus == 690970004 || systemStatus == 690970005) {
            //Set state to Inactive
            formContext.getAttribute("statecode").setValue(1);
            //Set Status Reason to Closed
            formContext.getAttribute("statuscode").setValue(918640000);

        } else {
            //Keep record Active
            formContext.getAttribute("statecode").setValue(0);
            formContext.getAttribute("statuscode").setValue(1);
        }
    }

    export function stateCodeOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();
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

    export function updateCaseView(eContext: Xrm.ExecutionContext<any, any>): void {
        try {

            const form = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();
            const caseAttribute = form.getAttribute("msdyn_servicerequest");
            const regionAttribute = form.getAttribute("ts_region");
            const countryAttribute = form.getAttribute("ts_country");
            const stakeholderAttribute = form.getAttribute("msdyn_serviceaccount");
            const siteAttribute = form.getAttribute("ts_site");

            const caseAttributeValue = caseAttribute.getValue();
            const regionAttributeValue = regionAttribute.getValue();
            const countryAttributeValue = countryAttribute.getValue();
            const stakeholderAttributeValue = stakeholderAttribute.getValue();
            const siteAttributeValue = siteAttribute.getValue();

            var regionCondition = regionAttributeValue == null ? "" : '<condition attribute="ovs_region" operator="eq" value="' + regionAttributeValue[0].id + '" />';
            var countryCondition = countryAttributeValue == null ? "" : '<condition attribute="ts_country" operator="eq" value="' + countryAttributeValue[0].id + '" />';
            var stakeholderCondition = stakeholderAttributeValue == null ? "" : '<condition attribute="customerid" operator="eq" value="' + stakeholderAttributeValue[0].id + '" />';
            var siteCondition = siteAttributeValue == null ? "" : '<condition attribute="msdyn_functionallocation" operator="eq" value="' + siteAttributeValue[0].id + '" />';

            if (caseAttribute != null && caseAttribute != undefined) {
                if (caseAttributeValue != null) {
                    Xrm.WebApi.online.retrieveRecord("incident", caseAttributeValue[0].id.replace(/({|})/g, ''), "?$select=_ovs_region_value, _ts_country_value, _customerid_value, _msdyn_functionallocation_value").then(
                        function success(result) {
                            if ((regionCondition != "" && (result != null && regionAttributeValue != null && regionAttributeValue[0].id.replace(/({|})/g, '') != result._ovs_region_value.toUpperCase())) ||
                                (countryCondition != "" && (result != null && countryAttributeValue != null && countryAttributeValue[0].id.replace(/({|})/g, '') != result._tc_country_value.toUpperCase())) ||
                                (stakeholderCondition != "" && (result != null && stakeholderAttributeValue != null && stakeholderAttributeValue[0].id.replace(/({|})/g, '') != result._ovs_regulatedentity_value.toUpperCase())) ||
                                (siteCondition != "" && (result != null && siteAttributeValue != null && siteAttributeValue[0].id.replace(/({|})/g, '') != result._ovs_site_value.toUpperCase()))) {

                                form.getAttribute("msdyn_servicerequest").setValue(null);
                            }
                        },
                        function (error) {
                            showErrorMessageAlert(error);
                        }
                    );
                }

                // Setup a custom view
                // This value is never saved and only needs to be unique among the other available views for the lookup.
                const viewId = '{5B58559F-F162-5428-4771-79BC825240B3}';
                const entityName = "incident";
                const viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredCases");
                const fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"> <entity name="incident"> <attribute name="ticketnumber" /> <attribute name="incidentid" /> <order attribute="ticketnumber" descending="false" /> <filter type="and">' + regionCondition + countryCondition + stakeholderCondition + siteCondition + ' </filter> </entity> </fetch>';
                const layoutXml = '<grid name="resultset" object="10010" jump="title" select="1" icon="1" preview="1"><row name="result" id="incidentid"><cell name="title" width="200" /></row></grid>';
                form.getControl("msdyn_servicerequest").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
            }

        } catch (e) {
            throw new Error(e.Message);
        }
    }

    // FUNCTIONS
    function showErrorMessageAlert(error) {
        var alertStrings = { text: error.message };
        var alertOptions = { height: 120, width: 260 };
        Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function () { });
    }

    function setDefaultFiscalYear(form: Form.msdyn_workorder.Main.ROMOversightActivity): void {
        XrmQuery.retrieveMultiple((x) => x.tc_tcfiscalyears)
            .select((x) => [x.tc_name])
            .filter((x) => Filter.equals(x.tc_iscurrentfiscalyear, true))
            .execute((fiscalYears) => {
                //should only return one fiscal year record as the current
                if (fiscalYears.length === 1) {
                    const targetedFiscalYear = fiscalYears[0];
                    const lookup = new Array();
                    lookup[0] = new Object();
                    lookup[0].id = targetedFiscalYear.tc_tcfiscalyearid;
                    lookup[0].name = targetedFiscalYear.tc_name;
                    lookup[0].entityType = 'tc_tcfiscalyear';

                    form.getAttribute('ovs_fiscalyear').setValue(lookup);
                } else {
                    // do not set a default if multiple records are found, error.
                }
            });
    }

    function removeSelectedFiscalQuarter(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();
        form.getAttribute('ovs_fiscalquarter').setValue(null);
    }

    function setRegion(form: Form.msdyn_workorder.Main.ROMOversightActivity): void {
        var currentUserId = Xrm.Utility.getGlobalContext().userSettings.userId;
        currentUserId = currentUserId.replace(/[{}]/g, "");

        // Get the user's territory
        Xrm.WebApi.online.retrieveRecord("systemuser", currentUserId, "?$select=_territoryid_value").then(
            function success(result) {

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
                            form.getAttribute('ts_region').setValue(lookup);
                            if (lookup[0].name == "International") {
                                form.getControl("ts_country").setVisible(true);
                                form.getAttribute("ts_country").setRequiredLevel("required");
                                form.getControl("ts_country").setDisabled(true);
                            } else {
                                //setOperationTypeFilteredView(form, territoryId, "", "");
                                //form.getControl("ovs_assetcategory").setDisabled(true);
                            }
                            form.getControl("ts_region").setDisabled(false);
                        },
                        function (error) {
                            showErrorMessageAlert(error);
                        }
                    );

                }
            },
            function (error) {
                showErrorMessageAlert(error);
            }
        );
    }

    function setCountryFilteredView(form: Form.msdyn_workorder.Main.ROMOversightActivity): void {
        form.getControl("ts_country").setVisible(true);
        form.getAttribute("ts_country").setRequiredLevel("required");

        const viewId = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F662}';
        const entityName = "tc_country";
        const viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredCountries");
        const fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"> <entity name="tc_country"> <attribute name="tc_countryid" /> <attribute name="tc_name" /> <order attribute="tc_name" descending="false" /> <filter type="and"> <condition attribute="statecode" operator="eq" value="0" /> </filter> <link-entity name="msdyn_functionallocation" from="ts_country" to="tc_countryid" link-type="inner" alias="aq"> <filter type="and"> <condition attribute="ts_region" operator="eq" value="{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}" /> </filter> <link-entity name="msdyn_customerasset" from="msdyn_functionallocation" to="msdyn_functionallocationid" link-type="inner" alias="ar"> <link-entity name="msdyn_customerassetcategory" from="msdyn_customerassetcategoryid" to="msdyn_customerassetcategory" link-type="inner" alias="as"> <filter type="and"> <condition attribute="ts_assetcategorytype" operator="eq" value="717750000" /> </filter> </link-entity> </link-entity> </link-entity> </entity> </fetch>';
        const layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="tc_countryid"><cell name="tc_name" width="200" /></row></grid>';
        form.getControl("ts_country").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
    }

    function setOperationTypeFilteredView(form: Form.msdyn_workorder.Main.ROMOversightActivity, regionAttributeId: string, countryCondition: string, workOrderTypeAttributeId: string): void {
        form.getControl("ovs_assetcategory").setDisabled(false);

        const viewId = '{8982C38D-8BB4-4C95-BD05-493398FEAE99}';
        const entityName = "msdyn_customerassetcategory";
        const viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredOperationTypes");
        const fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"> <entity name="msdyn_customerassetcategory"> <attribute name="msdyn_name" /> <attribute name="msdyn_customerassetcategoryid" /> <order attribute="msdyn_name" descending="false" /> <filter type="and"> <condition attribute="ts_assetcategorytype" operator="eq" value="717750000" /> </filter> <link-entity name="msdyn_customerasset" from="msdyn_customerassetcategory" to="msdyn_customerassetcategoryid" link-type="inner" alias="ac"> <link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="msdyn_functionallocation" link-type="inner" alias="ad"> <filter type="and"> <condition attribute="ts_region" operator="eq" value="' + regionAttributeId + '" />' + countryCondition + '</filter> </link-entity> </link-entity> <link-entity name="msdyn_incidenttype" from="ts_operationtype" to="msdyn_customerassetcategoryid" link-type="inner" alias="ar"> <filter type="and"> <condition attribute="msdyn_defaultworkordertype" operator="eq" value="' + workOrderTypeAttributeId + '" /> </filter> </link-entity> </entity> </fetch>';
        const layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="msdyn_customerassetcategoryid"><cell name="msdyn_name" width="200" /></row></grid>';
        form.getControl("ovs_assetcategory").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
    }

    function closeWorkOrderServiceTasks(formContext: Form.msdyn_workorder.Main.ROMOversightActivity, workOrderServiceTaskData: any) {
        Xrm.WebApi.online.retrieveMultipleRecords("msdyn_workorderservicetask", `?$select=msdyn_workorder&$filter=msdyn_workorder/msdyn_workorderid eq ${formContext.data.entity.getId()}`).then(
            function success(result) {
                for (var i = 0; i < result.entities.length; i++) {
                    Xrm.WebApi.updateRecord("msdyn_workorderservicetask", result.entities[i].msdyn_workorderservicetaskid, workOrderServiceTaskData).then(
                        function success(result) {
                            //work order service task closed successfully
                        },
                        function (error) {
                            showErrorMessageAlert(error);
                        }
                    );
                }
            },
            function (error) {
                showErrorMessageAlert(error);
            }
        );
    }

    function setWorkOrderServiceTasksView(form: Form.msdyn_workorder.Main.ROMOversightActivity, active: boolean) {
        var workOrderView;

        if (active) {
            workOrderView =
            {
                entityType: "savedquery",
                id: "{C9FD8F4D-8184-4DDB-A31A-89E66E8E710E}",
                name: "Active Work Order Service Tasks"
            }
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
}