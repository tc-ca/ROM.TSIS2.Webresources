/* eslint-disable @typescript-eslint/triple-slash-reference */
namespace ROM.WorkOrder {
    let isFromCase = false; //Boolean status to track if the work order is being created from a case
    var currentSystemStatus;
    // EVENTS
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();
        const state = form.getAttribute("statecode").getValue() ?? null;

        const regionAttribute = form.getAttribute("ts_region");
        const regionAttributeValue = regionAttribute.getValue();

        //Keep track of the current system status, to be used when cancelling a status change.
        currentSystemStatus = form.getAttribute("msdyn_systemstatus").getValue();
        updateCaseView(eContext);

        //Set required fields
        form.getAttribute("ts_region").setRequiredLevel("required");
        form.getAttribute("ovs_operationtypeid").setRequiredLevel("required");
        form.getAttribute("ts_site").setRequiredLevel("required");

        //If the Work Order has a Case, set the case lookup to required to prevent saving a Work Order without a Case
        if (form.getAttribute("msdyn_servicerequest").getValue() != null) {
            form.getAttribute("msdyn_servicerequest").setRequiredLevel("required");
        }
        
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

                //If work order is New (case 1) and it already has a case on form load, the work order must be coming from a case
                if (form.getAttribute("msdyn_servicerequest").getValue() != null) {
                    isFromCase = true;
                }

                // Set default values
                setDefaultFiscalYear(form);
                setRegion(form);

                //If the new work order is coming from a case, set default rational to planned
                if (form.getAttribute("msdyn_servicerequest").getValue() != null) {
                    var lookup = new Array();
                    lookup[0] = new Object();
                    lookup[0].id = "{994c3ec1-c104-eb11-a813-000d3af3a7a7}"
                    lookup[0].name = "Planned";
                    lookup[0].entityType = "ovs_tyrational";
                    form.getAttribute("ovs_rational").setValue(lookup); //Planned
                } else {
                    var lookup = new Array();
                    lookup[0] = new Object();
                    lookup[0].id = "{47F438C7-C104-EB11-A813-000D3AF3A7A7}"
                    lookup[0].name = "Unplanned";
                    lookup[0].entityType = "ovs_tyrational";
                    form.getAttribute("ovs_rational").setValue(lookup); //Unplanned
                }

                // Disable all operation related fields
                form.getControl("ts_region").setDisabled(true);
                form.getControl("ovs_operationtypeid").setDisabled(true);
                form.getControl("ts_site").setDisabled(true);
                form.getControl("msdyn_primaryincidenttype").setDisabled(true);
                form.getControl("msdyn_functionallocation").setDisabled(true);


                /* Localize the labels shown in the region and country lookups when coming from a case.
                 * Workaround for localization plugin running after mapped case fields have already been retrieved.
                 * Split("::") the field name, using left side if in english and right if in french.
                 */ 
                let regionValue = form.getAttribute("ts_region").getValue();
                if (regionValue != null) {
                    regionValue[0].name = (Xrm.Utility.getGlobalContext().userSettings.languageId === 1036) ? regionValue[0]?.name?.split("::")[1] : regionValue[0]?.name?.split("::")[0];
                    form.getAttribute("ts_region").setValue(regionValue);
                }
                let countryValue = form.getAttribute("ts_country").getValue();
                if (countryValue != null) {
                    countryValue[0].name = (Xrm.Utility.getGlobalContext().userSettings.languageId === 1036) ? countryValue[0]?.name?.split("::")[1] : countryValue[0]?.name?.split("::")[0];
                    form.getAttribute("ts_country").setValue(countryValue);
                }
                

                //If the new work order is coming from a case, and region is international, show the country lookup
                if (isFromCase && regionValue && regionValue[0].id == "{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}") {
                    form.getControl("ts_country").setVisible(true);
                    form.getControl("ts_country").setDisabled(true);
                }
                break;
            case 2:
                const workOrderTypeAttribute = form.getAttribute("msdyn_workordertype");
                const workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();
                const operationTypeAttribute = form.getAttribute("ovs_operationtypeid");
                const operationTypeAttributeValue = operationTypeAttribute.getValue();
                const countryAttribute= form.getAttribute("ts_country");
                const countryAttributeValue = countryAttribute.getValue();
                const stakeholderAttribute= form.getAttribute("msdyn_serviceaccount");
                const stakeholderAttributeValue = stakeholderAttribute.getValue();

                var countryCondition = getCountryFetchXmlCondition(form);

                if(regionAttribute != null && workOrderTypeAttribute != null && operationTypeAttribute != null && stakeholderAttribute){
                    if(regionAttributeValue != null && workOrderTypeAttributeValue != null && operationTypeAttributeValue != null && stakeholderAttributeValue != null){
                        setOperationTypeFilteredView(form, regionAttributeValue[0].id, "", workOrderTypeAttributeValue[0].id , "", "",);
                        setTradeViewFilteredView(form, regionAttributeValue[0].id, countryCondition, workOrderTypeAttributeValue[0].id, "", "", operationTypeAttributeValue[0].id);
                        setSiteFilteredView(form, regionAttributeValue[0].id, countryCondition, "" , stakeholderAttributeValue[0].id, "", operationTypeAttributeValue[0].id);
                    }
                }
                
            break;
            default:
                // Enable all operation related fields
                form.getControl("ts_region").setDisabled(false);
                form.getControl("ovs_operationtypeid").setDisabled(false);
                form.getControl("ts_tradenameid").setDisabled(false);
                //form.getControl("msdyn_serviceaccount").setDisabled(false);
                form.getControl("ts_site").setDisabled(false);
                form.getControl("msdyn_primaryincidenttype").setDisabled(false);

                if (regionAttribute != null && regionAttribute != undefined) {
                    
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
        var fetchXML = `<fetch><entity name="msdyn_workorder"><attribute name="msdyn_workorderid"/><filter><condition attribute="msdyn_workorderid" operator="eq" value="${form.data.entity.getId()}"/></filter><link-entity name="incident" from="incidentid" to="msdyn_servicerequest"/></entity></fetch>`;

        fetchXML = "?fetchXml=" + encodeURIComponent(fetchXML);

        Xrm.WebApi.retrieveMultipleRecords("msdyn_workorder", fetchXML).then(
            function success(result) {
                if(result.entities.length > 0){
                    form.getControl("ts_region").setDisabled(true);
                    form.getControl("ts_country").setDisabled(true);
                    form.getControl("ts_tradenameid").setDisabled(true);
                    form.getControl("msdyn_serviceaccount").setDisabled(true);
                    form.getControl("ts_site").setDisabled(true);
                    form.getControl("ovs_operationtypeid").setDisabled(true);
                }
            },
            function (error) {
            }
        );

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
            const stakeholderAttribute = form.getAttribute("msdyn_serviceaccount");
            const siteAttribute = form.getAttribute("ts_site");

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
                if (form.getControl("ts_country").getDisabled() == false) form.getControl("ts_country").setDisabled(true);
                if (form.getControl("ovs_operationtypeid").getDisabled() == false) form.getControl("ovs_operationtypeid").setDisabled(true);
                if (form.getControl("ts_tradenameid").getDisabled() == false) form.getControl("ts_tradenameid").setDisabled(true);
                if (form.getControl("msdyn_serviceaccount").getDisabled() == false) form.getControl("msdyn_serviceaccount").setDisabled(true);
                if (form.getControl("ts_site").getDisabled() == false) form.getControl("ts_site").setDisabled(true);
                if (form.getControl("msdyn_primaryincidenttype").getDisabled() == false) form.getControl("msdyn_primaryincidenttype").setDisabled(true);

                const workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();
                const regionAttributeValue = regionAttribute.getValue();
                const countryAttributeValue = countryAttribute.getValue();
                const stakeholderAttributeValue = stakeholderAttribute.getValue();
                const siteAttributeValue = siteAttribute.getValue();
                if (workOrderTypeAttributeValue != null && workOrderTypeAttributeValue != undefined) {
                    // Enable direct dependent field
                    if (!isFromCase) form.getControl("ts_region").setDisabled(false);

                    if (regionAttributeValue != null && regionAttributeValue != undefined) {
                        if (regionAttributeValue[0].id != "{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}") {
                            if (isFromCase && stakeholderAttributeValue != null && siteAttributeValue != null) {
                                setOperationTypeFilteredView(form, regionAttributeValue[0].id, "", workOrderTypeAttributeValue[0].id, stakeholderAttributeValue[0].id, siteAttributeValue[0].id);
                            } else {
                                setOperationTypeFilteredView(form, regionAttributeValue[0].id, "", workOrderTypeAttributeValue[0].id, "", "");
                            }
                        } else {
                            if (!isFromCase) form.getControl("ts_country").setDisabled(false);
                            setCountryFilteredView(form);

                            var countryCondition = getCountryFetchXmlCondition(form);
                            if (isFromCase && stakeholderAttributeValue != null && siteAttributeValue != null) {
                                setOperationTypeFilteredView(form, regionAttributeValue[0].id, countryCondition, workOrderTypeAttributeValue[0].id, stakeholderAttributeValue[0].id, siteAttributeValue[0].id);
                            } else {
                                setOperationTypeFilteredView(form, regionAttributeValue[0].id, countryCondition, workOrderTypeAttributeValue[0].id, "", "");
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
                if (form.getControl("ts_country").getDisabled() == false) form.getControl("ts_country").setVisible(false);
                if (form.getControl("ovs_operationtypeid").getDisabled() == false) form.getControl("ovs_operationtypeid").setDisabled(true);
                if (form.getControl("ts_tradenameid").getDisabled() == false) form.getControl("ts_tradenameid").setDisabled(true);
                if (form.getControl("msdyn_serviceaccount").getDisabled() == false) form.getControl("msdyn_serviceaccount").setDisabled(true);
                if (form.getControl("ts_site").getDisabled() == false) form.getControl("ts_site").setDisabled(true);
                if (form.getControl("msdyn_functionallocation").getDisabled() == false) form.getControl("msdyn_functionallocation").setVisible(false);
                if (form.getControl("msdyn_primaryincidenttype").getDisabled() == false) form.getControl("msdyn_primaryincidenttype").setDisabled(true);

                // If previous fields have values, we use the filtered fetchxml in a custom lookup view
                const workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();
                const regionAttributeValue = regionAttribute.getValue();
                if (workOrderTypeAttributeValue != null && workOrderTypeAttributeValue != undefined &&
                    regionAttributeValue != null && regionAttributeValue != undefined) {

                    // Enable direct dependent field
                    if (regionAttributeValue[0].name != "International") {
                        setOperationTypeFilteredView(form, regionAttributeValue[0].id, "", workOrderTypeAttributeValue[0].id, "", "");

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
                if (form.getControl("ovs_operationtypeid").getDisabled() == false) form.getControl("ovs_operationtypeid").setDisabled(true);
                if (form.getControl("ts_tradenameid").getDisabled() == false) form.getControl("ts_tradenameid").setDisabled(true);
                if (form.getControl("msdyn_serviceaccount").getDisabled() == false) form.getControl("msdyn_serviceaccount").setDisabled(true);
                if (form.getControl("ts_site").getDisabled() == false) form.getControl("ts_site").setDisabled(true);
                if (form.getControl("msdyn_functionallocation").getDisabled() == false) form.getControl("msdyn_functionallocation").setVisible(false);
                if (form.getControl("msdyn_primaryincidenttype").getDisabled() == false) form.getControl("msdyn_primaryincidenttype").setDisabled(true);

                const workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();
                const regionAttributeValue = regionAttribute.getValue();
                const countryAttributeValue = countryAttribute.getValue();
                if (workOrderTypeAttributeValue != null && workOrderTypeAttributeValue != undefined &&
                    regionAttributeValue != null && regionAttributeValue != undefined) {
                    var countryCondition = getCountryFetchXmlCondition(form);
                    setOperationTypeFilteredView(form, regionAttributeValue[0].id, countryCondition, workOrderTypeAttributeValue[0].id, "", "");
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
            const operationTypeAttribute = form.getAttribute("ovs_operationtypeid");
            const countryAttribute = form.getAttribute("ts_country");

            if (operationTypeAttribute != null && operationTypeAttribute != undefined && !isFromCase) {

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
                if (form.getControl("ts_tradenameid").getDisabled() == false) form.getControl("ts_tradenameid").setDisabled(true);
                if (form.getControl("msdyn_serviceaccount").getDisabled() == false) form.getControl("msdyn_serviceaccount").setDisabled(true);
                if (form.getControl("ts_site").getDisabled() == false) form.getControl("ts_site").setDisabled(true);
                if (form.getControl("msdyn_functionallocation").getDisabled() == false) form.getControl("msdyn_functionallocation").setVisible(false);
                if (form.getControl("msdyn_primaryincidenttype").getDisabled() == false) form.getControl("msdyn_primaryincidenttype").setDisabled(true);

                // If previous fields have values, we use the filtered fetchxml in a custom lookup view
                const workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();
                const regionAttributeValue = regionAttribute.getValue();
                const operationTypeAttributeValue = operationTypeAttribute.getValue();
                const countryAttributeValue = countryAttribute.getValue();
                if (regionAttributeValue != null && regionAttributeValue != undefined &&
                    operationTypeAttributeValue != null && operationTypeAttributeValue != undefined &&
                    workOrderTypeAttributeValue != null && workOrderTypeAttributeValue != undefined) {

                    var countryCondition = getCountryFetchXmlCondition(form);
                    //form.getControl("msdyn_serviceaccount").setDisabled(false);
                    form.getControl("msdyn_primaryincidenttype").setDisabled(false);

                    // Setup a custom view
                    // This value is never saved and only needs to be unique among the other available views for the lookup.
                    const viewId = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F660}';
                    const entityName = "account";
                    const viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredStakeholders");
                    const fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" returntotalrecordcount="true" page="1" no-lock="false"><entity name="account"><attribute name="name"/><attribute name="accountid"/><order attribute="name" descending="false" /><link-entity name="ovs_operation" from="ts_stakeholder" to="accountid" link-type="inner" alias="ac"><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeValue[0].id + '"/></filter><link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="ts_site" link-type="inner" alias="ad"><filter type="and"><condition attribute="ts_region" operator="eq" value="' + regionAttributeValue[0].id + '"/>' + countryCondition + '</filter></link-entity></link-entity></entity></fetch>';
                    const layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="accountid"><cell name="name" width="200" /></row></grid>';

                    form.getControl("msdyn_serviceaccount").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);

                    // Custom view for Trade Names
                    setTradeViewFilteredView(form, regionAttributeValue[0].id, countryCondition, workOrderTypeAttributeValue[0].id, "", "", operationTypeAttributeValue[0].id);

                    // Custom view for Activity Type
                    const viewIdActivity = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F661}';
                    const entityNameActivity = "msdyn_incidenttype";
                    const viewDisplayNameActivity = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredActivityType");
                    const fetchXmlActivity = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="msdyn_incidenttype"><attribute name="msdyn_name" /><attribute name="msdyn_incidenttypeid" /><order attribute="msdyn_name" descending="false" /><filter type="and"><condition attribute="msdyn_defaultworkordertype" operator="eq" uiname="Inspection" uitype="msdyn_workordertype" value="' + workOrderTypeAttributeValue[0].id + '" /></filter><link-entity name="ts_ovs_operationtypes_msdyn_incidenttypes" from="msdyn_incidenttypeid" to="msdyn_incidenttypeid" visible="false" intersect="true"><link-entity name="ovs_operationtype" from="ovs_operationtypeid" to="ovs_operationtypeid" alias="ab"><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeValue[0].id + '" /></filter></link-entity></link-entity></entity></fetch>';
                    const layoutXmlActivity = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_incidenttypeid"><cell name="msdyn_name" width="200" /></row></grid>';
                    form.getControl("msdyn_primaryincidenttype").addCustomView(viewIdActivity, entityNameActivity, viewDisplayNameActivity, fetchXmlActivity, layoutXmlActivity, true);
                }
            } else if (operationTypeAttribute != null && operationTypeAttribute != undefined && isFromCase) {
                const workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();
                const operationTypeAttributeValue = operationTypeAttribute.getValue();

                if (workOrderTypeAttributeValue != null && operationTypeAttributeValue != null) {
                    form.getControl("msdyn_primaryincidenttype").setDisabled(false);
                    // Custom view for Activity Type
                    const viewIdActivity = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F661}';
                    const entityNameActivity = "msdyn_incidenttype";
                    const viewDisplayNameActivity = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredActivityType");
                    const fetchXmlActivity = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="msdyn_incidenttype"><attribute name="msdyn_name" /><attribute name="msdyn_incidenttypeid" /><order attribute="msdyn_name" descending="false" /><filter type="and"><condition attribute="msdyn_defaultworkordertype" operator="eq" uiname="Inspection" uitype="msdyn_workordertype" value="' + workOrderTypeAttributeValue[0].id + '" /></filter><link-entity name="ts_ovs_operationtypes_msdyn_incidenttypes" from="msdyn_incidenttypeid" to="msdyn_incidenttypeid" visible="false" intersect="true"><link-entity name="ovs_operationtype" from="ovs_operationtypeid" to="ovs_operationtypeid" alias="ab"><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeValue[0].id + '" /></filter></link-entity></link-entity></entity></fetch>';
                    const layoutXmlActivity = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_incidenttypeid"><cell name="msdyn_name" width="200" /></row></grid>';
                    form.getControl("msdyn_primaryincidenttype").addCustomView(viewIdActivity, entityNameActivity, viewDisplayNameActivity, fetchXmlActivity, layoutXmlActivity, true);
                    functionalLocationOnChange(eContext);
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
            const operationTypeAttribute = form.getAttribute("ovs_operationtypeid");
            const stakeholderAttribute = form.getAttribute("msdyn_serviceaccount");
            const countryAttribute = form.getAttribute("ts_country");

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
                if (form.getControl("ts_site").getDisabled() == false) form.getControl("ts_site").setDisabled(true);
                if (form.getControl("msdyn_functionallocation").getDisabled() == false) form.getControl("msdyn_functionallocation").setVisible(false);

                // If an operation type is selected, we use the filtered fetchxml, otherwise, disable and clear out the dependent fields
                const regionAttributeValue = regionAttribute.getValue();
                const operationTypeAttributeValue = operationTypeAttribute.getValue();
                const stakeholderAttributeValue = stakeholderAttribute.getValue();
                const countryAttributeValue = countryAttribute.getValue();

                if (regionAttributeValue != null && regionAttributeValue != undefined &&
                    operationTypeAttributeValue != null && operationTypeAttributeValue != undefined &&
                    stakeholderAttributeValue != null && stakeholderAttributeValue != undefined) {

                    var countryCondition = getCountryFetchXmlCondition(form);

                    setSiteFilteredView(form, regionAttributeValue[0].id, countryCondition, "" , stakeholderAttributeValue[0].id, "", operationTypeAttributeValue[0].id);
                }

            }
        } catch (e) {
            throw new Error(e.Message);
        }
    }

        export function siteOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        try {

            const form = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();
            const operationTypeAttribute = form.getAttribute("ovs_operationtypeid");
            const stakeholderAttribute = form.getAttribute("msdyn_serviceaccount");
            const siteAttribute = form.getAttribute("ts_site");
            if (siteAttribute != null && siteAttribute != undefined) {
                // Clear out operation and subsite value if not already empty
                if (form.getAttribute("ovs_operationid").getValue() != null) form.getAttribute("ovs_operationid").setValue(null);

                // If an operation type is selected, we use the filtered fetchxml, otherwise, disable and clear out the dependent fields
                const operationTypeAttributeValue = operationTypeAttribute.getValue();
                const stakeholderAttributeValue = stakeholderAttribute.getValue();
                const siteAttributeValue = siteAttribute.getValue();


                
                if (siteAttributeValue != null && siteAttributeValue != undefined &&
                    stakeholderAttributeValue != null && stakeholderAttributeValue != undefined &&
                    operationTypeAttributeValue != null && operationTypeAttributeValue != undefined) {

                    // Populate operation asset
                    const fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="ovs_operation"><attribute name="ovs_name"/><attribute name="ts_stakeholder"/><attribute name="ts_site"/><attribute name="ovs_operationid"/><order attribute="ovs_name" descending="true"/><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeValue[0].id + '"/><condition attribute="ts_site" operator="eq" value="' + siteAttributeValue[0].id + '"/><condition attribute="ts_stakeholder" operator="eq" value="' + stakeholderAttributeValue[0].id + '"/></filter></entity></fetch>';
                    var encodedFetchXml = encodeURIComponent(fetchXml);
                    Xrm.WebApi.retrieveMultipleRecords("ovs_operation", "?fetchXml=" + encodedFetchXml).then(
                        function success(result) {
                            if (result.entities.length == 1) {
                                const targetOperation = result.entities[0];
                                const lookup = new Array();
                                lookup[0] = new Object();
                                lookup[0].id = targetOperation.ovs_operationid;
                                lookup[0].name = targetOperation.ovs_name;
                                lookup[0].entityType = 'ovs_operation';

                                form.getAttribute('ovs_operationid').setValue(lookup);
                            } else {
                                // do not set a default if multiple records are found, error.
                            }
                        },
                        function (error) {
                            showErrorMessageAlert(error);
                        }
                    );
                    //Check if any subsites exists and only show the field if it's the case
                    const fetchXmlToCheckForSubSites = '<fetch no-lock="false" returntotalrecordcount="true" page="1" count="25"><entity name="msdyn_functionallocation"><attribute name="statecode"/><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><filter><condition attribute="msdyn_functionallocationid" operator="under" value="' + siteAttributeValue[0].id + '"/></filter><order attribute="msdyn_name" descending="false"/><link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="msdyn_parentfunctionallocation" alias="bb"><filter type="and"><condition attribute="msdyn_functionallocationid" operator="eq" uitype="msdyn_functionallocation" value="' + siteAttributeValue[0].id +  '"/></filter></link-entity></entity></fetch>';
                    encodedFetchXml = encodeURIComponent(fetchXmlToCheckForSubSites);
                    Xrm.WebApi.retrieveMultipleRecords("msdyn_functionallocation", "?fetchXml=" + encodedFetchXml).then(
                        function success(result) {
                            if (result.entities.length > 0) {
                                form.getControl('msdyn_functionallocation').setDisabled(false);
                                form.getControl('msdyn_functionallocation').setVisible(true);
                                const viewId = '{1B59589F-F122-5428-4771-79BC925240C3}';
                                const entityName = "msdyn_functionallocation";
                                const viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredSites");
                                const activityTypeFetchXml = '<fetch no-lock="false"><entity name="msdyn_functionallocation"><attribute name="statecode"/><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><filter><condition attribute="msdyn_functionallocationid" operator="under" value="' + siteAttributeValue[0].id + '"/></filter><order attribute="msdyn_name" descending="false"/></entity></fetch>';
                                const layoutXml = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="200" /></row></grid>';
                                form.getControl("msdyn_functionallocation").addCustomView(viewId, entityName, viewDisplayName, activityTypeFetchXml, layoutXml, true); 
                            }
                            else{
                                form.getAttribute("msdyn_functionallocation").setValue(null);
                                form.getControl('msdyn_functionallocation').setVisible(false);
                            }
                        },
                        function (error) {
                            showErrorMessageAlert(error);
                        }
                    );
                }
                else{
                    form.getAttribute("msdyn_functionallocation").setValue(null);
                    form.getControl('msdyn_functionallocation').setVisible(false);
                }
            }
        } catch (e) {
            throw new Error(e.Message);
        }
    }

    export function tradenameOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        try {
            const form = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();
            const TradenameAttribute = form.getAttribute("ts_tradenameid");
            if (TradenameAttribute != null && TradenameAttribute != undefined) {
                const TradenameAttributeValue = TradenameAttribute.getValue();
                if (TradenameAttributeValue != null && TradenameAttributeValue != undefined) {
                    Xrm.WebApi.retrieveRecord("ts_tradename", TradenameAttributeValue[0].id, "?$select=_ts_stakeholderid_value").then(
                        function success(result) {
                            var _ts_stakeholderid_value = result["_ts_stakeholderid_value"];
                            var _ts_stakeholderid_value_formatted = result["_ts_stakeholderid_value@OData.Community.Display.V1.FormattedValue"];
                            var _ts_stakeholderid_value_lookuplogicalname = result["_ts_stakeholderid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                            var lookup = new Array();
                            lookup[0] = new Object();
                            lookup[0].id = _ts_stakeholderid_value;
                            lookup[0].name = _ts_stakeholderid_value_formatted;
                            lookup[0].entityType = _ts_stakeholderid_value_lookuplogicalname;
                            form.getAttribute('msdyn_serviceaccount').setValue(lookup);
                            stakeholderOnChange(eContext);
                        },
                        function (error) {
                            showErrorMessageAlert(error);
                        }
                    );
                }
            }
        } catch (e) {
            throw new Error(e.Message);
        }
    }

    export function functionalLocationOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        try {

            const form = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();
            const operationTypeAttribute = form.getAttribute("ovs_operationtypeid");
            const stakeholderAttribute = form.getAttribute("msdyn_serviceaccount");
            const functionalLocationAttribute = form.getAttribute("msdyn_functionallocation");
            if (functionalLocationAttribute != null && functionalLocationAttribute != undefined) {
                // Clear out operation value if not already empty
                if (form.getAttribute("ovs_operationid").getValue() != null) form.getAttribute("ovs_operationid").setValue(null);

                // If an operation type is selected, we use the filtered fetchxml, otherwise, disable and clear out the dependent fields
                const operationTypeAttributeValue = operationTypeAttribute.getValue();
                const stakeholderAttributeValue = stakeholderAttribute.getValue();
                const functionalLocationAttributeValue = functionalLocationAttribute.getValue();

                if (functionalLocationAttributeValue != null && functionalLocationAttributeValue != undefined &&
                    stakeholderAttributeValue != null && stakeholderAttributeValue != undefined &&
                    operationTypeAttributeValue != null && operationTypeAttributeValue != undefined) {

                    // Populate operation asset
                    const fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="ovs_operation"><attribute name="ovs_name"/><attribute name="ts_stakeholder"/><attribute name="ts_site"/><attribute name="ovs_operationid"/><order attribute="ovs_name" descending="true"/><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeValue[0].id + '"/><condition attribute="ts_stakeholder" operator="eq" value="' + stakeholderAttributeValue[0].id + '"/><condition attribute="ts_site" operator="eq" value="' + functionalLocationAttributeValue[0].id + '"/></filter></entity></fetch>';
                    var encodedFetchXml = encodeURIComponent(fetchXml);
                    Xrm.WebApi.retrieveMultipleRecords("ovs_operation", "?fetchXml=" + encodedFetchXml).then(
                        function success(result) {
                            if (result.entities.length == 1) {
                                const targetOperation = result.entities[0];
                                const lookup = new Array();
                                lookup[0] = new Object();
                                lookup[0].id = targetOperation.ovs_operationid;
                                lookup[0].name = targetOperation.ovs_name;
                                lookup[0].entityType = 'ovs_operation';

                                form.getAttribute('ovs_operationid').setValue(lookup);
                            } else {
                                // do not set a default if multiple records are found, error.
                            }
                        },
                        function (error) {
                            showErrorMessageAlert(error);
                        }
                    );
                } else {
                    // Fall back to siteOnChange if functional location is cleared
                    siteOnChange(eContext);
                }
            }
        } catch (e) {
            throw new Error(e.Message);
        }
    }

    export function systemStatusOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();
        var newSystemStatus = form.getAttribute("msdyn_systemstatus").getValue();

        //If system status is set to closed
        if (newSystemStatus == 690970004 || newSystemStatus == 690970005) {
            var confirmStrings = {
                text: Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "CloseWorkOrderConfirmationText"),
                title: Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "CloseWorkOrderConfirmationTitle")
            };
            var confirmOptions = { height: 200, width: 450 };
            Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
                function (success) {
                    if (success.confirmed) {
                        //Set state to Inactive
                        form.getAttribute("statecode").setValue(1);
                        //Set Status Reason to Closed
                        form.getAttribute("statuscode").setValue(918640000);
                        currentSystemStatus = newSystemStatus;
                    } else {
                        //Undo the system status change
                        form.getAttribute("msdyn_systemstatus").setValue(currentSystemStatus);
                    }
            });
        } else {
            //Keep record Active
            form.getAttribute("statecode").setValue(0);
            form.getAttribute("statuscode").setValue(1);
            currentSystemStatus = newSystemStatus;
        }
    }

    export function caseOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();

        const caseAttribute = form.getAttribute("msdyn_servicerequest");

        if(caseAttribute.getValue() == null){
            form.getControl("ts_region").setDisabled(false);
            form.getControl("ts_country").setDisabled(false);
            form.getControl("ts_tradenameid").setDisabled(false);
            //form.getControl("msdyn_serviceaccount").setDisabled(false);
            form.getControl("ts_site").setDisabled(false);
        }
    }

    export function stateCodeOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();
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
            var countryCondition = getCountryFetchXmlCondition(form);
            var stakeholderCondition = stakeholderAttributeValue == null ? "" : '<condition attribute="customerid" operator="eq" value="' + stakeholderAttributeValue[0].id + '" />';
            var siteCondition = siteAttributeValue == null ? "" : '<condition attribute="msdyn_functionallocation" operator="eq" value="' + siteAttributeValue[0].id + '" />';

            if (caseAttribute != null && caseAttribute != undefined) {
                if (caseAttributeValue != null) {
                    Xrm.WebApi.retrieveRecord("incident", caseAttributeValue[0].id.replace(/({|})/g, ''), "?$select=_ovs_region_value, _ts_country_value, _customerid_value, _msdyn_functionallocation_value").then(
                        function success(result) {
                            if ((regionCondition != "" && (result != null && regionAttributeValue != null && regionAttributeValue[0].id.replace(/({|})/g, '') != result._ovs_region_value?.toUpperCase())) ||
                                (countryCondition != "" && (result != null && countryAttributeValue != null && countryAttributeValue[0].id.replace(/({|})/g, '') != result._ts_country_value?.toUpperCase())) ||
                                (stakeholderCondition != "" && (result != null && stakeholderAttributeValue != null && stakeholderAttributeValue[0].id.replace(/({|})/g, '') != result._customerid_value?.toUpperCase())) ||
                                (siteCondition != "" && (result != null && siteAttributeValue != null && siteAttributeValue[0].id.replace(/({|})/g, '') != result._msdyn_functionallocation_value?.toUpperCase()))) {

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

    export function revisedQuarterOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();
        
        const revisedQuarterAttribute = form.getAttribute("ovs_revisedquarterid");
        const currentFiscalQuarterAttribute = form.getAttribute("ovs_currentfiscalquarter");
        const plannedFiscalQuarterAttribute = form.getAttribute("ovs_fiscalquarter");
    
        const revisedQuarterAttributeValue = revisedQuarterAttribute.getValue();
        const currentFiscalQuarterAttributeValue = currentFiscalQuarterAttribute.getValue();
        const plannedFiscalQuarterAttributeValue = plannedFiscalQuarterAttribute.getValue();

        if(revisedQuarterAttributeValue != null){
            currentFiscalQuarterAttribute.setValue(revisedQuarterAttributeValue);
        }
        else{
            if(plannedFiscalQuarterAttribute != null){
                currentFiscalQuarterAttribute.setValue(plannedFiscalQuarterAttributeValue);
            }
            else{
                currentFiscalQuarterAttribute.setValue(null);
            }
        }
    }

    export function dateWindowEndOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();
        const dateWindowEndValue = form.data.entity.attributes.get("msdyn_datewindowend").getValue()       
        const fiscalQuarterAttribute = form.data.entity.attributes.get("ovs_fiscalquarter");
    
        var fetchXml = `<fetch distinct="false" mapping="logical" output-format="xml-platform" version="1.0"> <entity name="tc_tcfiscalquarter"> <attribute name="tc_name"/> <attribute name="tc_tcfiscalquarterid"/> <attribute name="tc_tcfiscalyearid"/> <filter type="and"> <condition operator="this-fiscal-year" attribute = "tc_quarterstart"/> </filter> </entity> </fetch>`;
        fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
        Xrm.WebApi.retrieveMultipleRecords("tc_tcfiscalquarter", fetchXml).then(
            function success(result) {
                if (result.entities.length > 0) {
                    if (dateWindowEndValue != null) {
                          var m = Math.floor(dateWindowEndValue.getMonth() / 3);
                          const lookup = new Array();
                          lookup[0] = new Object();
                          lookup[0].id = result.entities[m].tc_tcfiscalquarterid;
                          lookup[0].name = result.entities[m].tc_name;
                          lookup[0].entityType = 'tc_tcfiscalquarter';
                          fiscalQuarterAttribute.setValue(lookup);                       
                    }
                }
            },
            function (error) {           
            }
        );          

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
        const regionAttribute = form.getAttribute("ts_region");
        const regionAttributeValue = regionAttribute.getValue();

        var currentUserId = Xrm.Utility.getGlobalContext().userSettings.userId;
        currentUserId = currentUserId.replace(/[{}]/g, "");

        if(!regionAttributeValue?.[0].name){
             // Get the user's territory
            Xrm.WebApi.retrieveRecord("systemuser", currentUserId, "?$select=_territoryid_value").then(
                function success(result) {
                    if (result != null && result["_territoryid_value"] != null) {
                        // NOTE: Our localization plugin can't localize the territory name on system user
                        // So we do an extra call to the territory table to get the localized name
                        Xrm.WebApi.retrieveRecord("territory", result["_territoryid_value"], "?$select=name").then(
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
                                form.getControl("ts_region").setDisabled(false);
                                if (lookup[0].name == "International") {
                                    form.getControl("ts_country").setVisible(true);
                                    form.getAttribute("ts_country").setRequiredLevel("required");
                                    form.getControl("ts_country").setDisabled(false);
                                } else {
                                    //setOperationTypeFilteredView(form, territoryId, "", "");
                                    //form.getControl("ovs_operationtypeid").setDisabled(true);
                                }
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
    }

    function setCountryFilteredView(form: Form.msdyn_workorder.Main.ROMOversightActivity): void {
        form.getControl("ts_country").setVisible(true);
        form.getAttribute("ts_country").setRequiredLevel("required");

        const viewId = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F662}';
        const entityName = "tc_country";
        const viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredCountries");
        const fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"><entity name="tc_country"><attribute name="tc_countryid"/><attribute name="tc_name"/><order attribute="tc_name" descending="false" /><link-entity name="msdyn_functionallocation" from="ts_country" to="tc_countryid" link-type="inner" alias="ag"><link-entity name="ovs_operation" from="ts_site" to="msdyn_functionallocationid" link-type="inner" alias="ah" /></link-entity></entity></fetch>';
        const layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="tc_countryid"><cell name="tc_name" width="200" /></row></grid>';
        form.getControl("ts_country").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
    }

    function setOperationTypeFilteredView(form: Form.msdyn_workorder.Main.ROMOversightActivity, regionAttributeId: string, countryCondition: string, workOrderTypeAttributeId: string, stakeholderTypeAttributeId: string, siteAttributeId: string): void {
        form.getControl("ovs_operationtypeid").setDisabled(false);

        const viewId = '{8982C38D-8BB4-4C95-BD05-493398FEAE99}';
        const entityName = "ovs_operationtype";
        const viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredOperationTypes");
        const fetchXml = (isFromCase && stakeholderTypeAttributeId != "" && siteAttributeId != "") ? '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"> <entity name="ovs_operationtype"> <attribute name="ovs_operationtypeid" /> <attribute name="ovs_name" /> <attribute name="createdon" /> <order attribute="ovs_name" descending="false" /> <link-entity name="ts_ovs_operationtypes_msdyn_incidenttypes" from="ovs_operationtypeid" to="ovs_operationtypeid" visible="false" intersect="true"> <link-entity name="msdyn_incidenttype" from="msdyn_incidenttypeid" to="msdyn_incidenttypeid" alias="ah"> <filter type="and"> <condition attribute="msdyn_defaultworkordertype" operator="eq" value="' + workOrderTypeAttributeId + '" /> </filter> </link-entity> </link-entity> <link-entity name="ovs_operation" from="ovs_operationtypeid" to="ovs_operationtypeid" link-type="inner" alias="ai"> <filter type="and"> <condition attribute="ts_stakeholder" operator="eq" value="' + stakeholderTypeAttributeId + '" /> </filter> <link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="ts_site" link-type="inner" alias="aj"> <filter type="and"> <condition attribute="ts_region" operator="eq" value="' + regionAttributeId + '" />' + countryCondition + '<condition attribute="msdyn_functionallocationid" operator="eq" value="' + siteAttributeId + '" /> </filter> </link-entity> </link-entity> </entity> </fetch>' : '<fetch distinct="true" page="1"><entity name="ovs_operationtype"><attribute name="statecode"/><attribute name="ovs_operationtypeid"/><attribute name="ovs_name"/><attribute name="createdon"/><link-entity name="ts_ovs_operationtypes_msdyn_incidenttypes" from="ovs_operationtypeid" to="ovs_operationtypeid" visible="false" intersect="true"><link-entity name="msdyn_incidenttype" from="msdyn_incidenttypeid" to="msdyn_incidenttypeid" alias="ad"><filter type="and"><condition attribute="msdyn_defaultworkordertype" operator="eq" value="' + workOrderTypeAttributeId + '" /></filter></link-entity></link-entity><link-entity name="ovs_operation" from="ovs_operationtypeid" to="ovs_operationtypeid" link-type="inner" alias="ae"><link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="ts_site" link-type="inner" alias="af"><filter type="and"><condition attribute="ts_region" operator="eq" value="' + regionAttributeId + '" />' + countryCondition + '</filter></link-entity></link-entity></entity></fetch>';
        const layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="ovs_operationtypeid"><cell name="ovs_name" width="200" /></row></grid>';
        form.getControl("ovs_operationtypeid").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
    }

    function setTradeViewFilteredView(form: Form.msdyn_workorder.Main.ROMOversightActivity, regionAttributeId: string, countryCondition: string, workOrderTypeAttributeId: string, stakeholderTypeAttributeId: string, siteAttributeId: string, operationTypeAttributeId): void {
        // Enable direct dependent field
        form.getControl("ts_tradenameid").setDisabled(false);

        const viewIdTradename = '{1c259fee-0541-4cac-8d20-7b30ee398065}';
        const entityNameTradename = "ts_tradename";
        const viewDisplayNameTradename = "FilteredSTradenames";
        const fetchXmlTradename = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" returntotalrecordcount="true" page="1" no-lock="false"><entity name="ts_tradename" ><attribute name="ts_tradenameid" /><attribute name="ts_name" /><order attribute="ts_stakeholderidname" /><order attribute="ts_name" /><link-entity name="account" from="accountid" to="ts_stakeholderid" ><link-entity name="ovs_operation" from="ts_stakeholder" to="accountid" link-type="inner" alias="ac"><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeId + '"/></filter><link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="ts_site" link-type="inner" alias="ad"><filter type="and"><condition attribute="ts_region" operator="eq" value="' + regionAttributeId + '"/>' + countryCondition + '</filter></link-entity></link-entity></link-entity></entity></fetch>';
        const layoutXmlTradename = '<grid name="resultset" object="10010" jump="ts_name" select="1" icon="1" preview="1"><row name="result" id="ts_tradenameid"><cell name="ts_name" width="200" /></row></grid>';
        form.getControl("ts_tradenameid").addCustomView(viewIdTradename, entityNameTradename, viewDisplayNameTradename, fetchXmlTradename, layoutXmlTradename, true);
    }

    function setSiteFilteredView(form: Form.msdyn_workorder.Main.ROMOversightActivity, regionAttributeId: string, countryCondition: string, workOrderTypeAttributeId: string, stakeholderTypeAttributeId: string, siteAttributeId: string, operationTypeAttributeId): void {
        // Enable direct dependent field
        form.getControl("ts_site").setDisabled(false);

        // Custom view
        const viewId = '{6E57251F-F695-4076-9498-49AB892154B7}';
        const entityName = "msdyn_functionallocation";
        const viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredStakeholders");
        const fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" returntotalrecordcount="true" page="1" count="25" no-lock="false"><entity name="msdyn_functionallocation"><attribute name="statecode"/><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><filter>' + countryCondition +'</filter><filter><condition attribute="ts_region" operator="eq" value="' + regionAttributeId + '"/></filter><order attribute="msdyn_name" descending="false"/><link-entity name="ovs_operation" from="ts_site" to="msdyn_functionallocationid"><filter><condition attribute="ovs_operationtypeid" operator="eq" value=" ' + operationTypeAttributeId + '"/></filter><filter><condition attribute="ts_stakeholder" operator="eq" value="' + stakeholderTypeAttributeId + '"/></filter></link-entity></entity></fetch>';
        const layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="200" /></row></grid>';
        form.getControl("ts_site").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
    }

    function getCountryFetchXmlCondition(form: Form.msdyn_workorder.Main.ROMOversightActivity){
        const regionAttribute = form.getAttribute("ts_region");
        const regionAttributeValue = regionAttribute.getValue();
        const countryAttribute = form.getAttribute("ts_country")
        const countryAttributeValue = countryAttribute.getValue();

        if (regionAttributeValue != null && countryAttributeValue != null && countryAttributeValue != undefined) {
            if (regionAttributeValue[0].name != "International") {
                form.getControl("ts_site").setDisabled(false);
            }
            else {
                return '<condition attribute="ts_country" operator="eq" value="' + countryAttributeValue[0].id + '" />';
            }
        }
        return "";
    }



    function closeWorkOrderServiceTasks(formContext: Form.msdyn_workorder.Main.ROMOversightActivity, workOrderServiceTaskData: any) {
        Xrm.WebApi.retrieveMultipleRecords("msdyn_workorderservicetask", `?$select=msdyn_workorder&$filter=msdyn_workorder/msdyn_workorderid eq ${formContext.data.entity.getId()}`).then(
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