/* eslint-disable @typescript-eslint/triple-slash-reference */
namespace ROM.WorkOrder {
    let isFromCase = false; //Boolean status to track if the work order is being created from a case
    let isFromSecurityIncident = false;
    var currentSystemStatus;
    var currentStatus;
    // EVENTS
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();
        const state = form.getAttribute("statecode").getValue() ?? null;

        const regionAttribute = form.getAttribute("ts_region");
        const regionAttributeValue = regionAttribute.getValue();

        const ownerControl = form.getControl("ownerid");
        const headerOwnerControl = form.getControl("header_ownerid");

        //Set comment field visible if AvSec
        let userBusinessUnitName;
        let userId = Xrm.Utility.getGlobalContext().userSettings.userId;
        let currentUserBusinessUnitFetchXML = [
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
                form.getControl("ts_details").setVisible(true);
            }
        });
        

        //Keep track of the current system status, to be used when cancelling a status change.
        currentSystemStatus = form.getAttribute("msdyn_systemstatus").getValue();
        currentStatus = form.getAttribute("ts_state").getValue();
        form.getControl("msdyn_worklocation").removeOption(690970001);  //Remove Facility Work Location Option
        updateCaseView(eContext);
          
        //Set required fields
        form.getAttribute("ts_region").setRequiredLevel("required");
        form.getAttribute("ovs_operationtypeid").setRequiredLevel("required");
        form.getAttribute("ts_site").setRequiredLevel("required");

        //If the Work Order has a Case, set the case lookup to required to prevent saving a Work Order without a Case
        if (form.getAttribute("msdyn_servicerequest").getValue() != null) {
            form.getAttribute("msdyn_servicerequest").setRequiredLevel("required");
        }

        //Set Case Lookup Navigation to open Time Tracking form when on Time Tracking Tab
        setCaseLookupClickNavigation(eContext);

        //Set Security Incident Lookup Navigation to open Time Tracking form when on Time Tracking Tab
        setSecurityIncidentLookupClickNavigation(eContext);

        if (currentSystemStatus == 690970004) { 
            form.getControl("ts_completedquarter").setVisible(true);
        }
        else {
            form.getControl("ts_completedquarter").setVisible(false);
        }

        if (currentSystemStatus == 690970004 || currentSystemStatus == 690970003) { //Closed ; Completed
            form.getControl("ovs_revisedquarterid").setDisabled(true);
        }

        if (currentStatus == 717750001) { //Committed
            form.getControl("ovs_fiscalquarter").setDisabled(true);
        }

        //Limit ownership of a Work Order to users associated with the same program
        if (form.ui.getFormType() == 1 || form.ui.getFormType() == 2) {
            if (ownerControl != null) {
                ownerControl.setEntityTypes(["systemuser"]);
                headerOwnerControl.setEntityTypes(["systemuser"]);
                var defaultViewId = "29bd662e-52e7-ec11-bb3c-0022483d86ce";
                ownerControl.setDefaultView(defaultViewId);
                headerOwnerControl.setDefaultView(defaultViewId);
            }
        }

        // Show subsite field if it has value on Edit or Readonly mode etc
        if (form.ui.getFormType() !== 1) {
            if (form.getAttribute("msdyn_functionallocation").getValue() != null) {
                form.getControl('msdyn_functionallocation').setVisible(true);
            }
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
                else if (form.getAttribute("ts_securityincident").getValue() != null) {
                    isFromSecurityIncident = true;
                }
                
                // Set default values
                setDefaultFiscalYear(form);
                setRegion(form);

                //If the new work order is coming from a case, set default rational to planned
                if (isFromCase) {
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

                    setFiscalQuarter(form);
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

                if (isFromSecurityIncident){
                    const stakeholderAttribute = form.getAttribute("msdyn_serviceaccount");
                    const stakeholderAttributeValue = stakeholderAttribute!.getValue();

                    if(stakeholderAttributeValue != null){
                        fillOrSetTradeNameView(eContext, stakeholderAttributeValue);
                    }
                }

                break;
            case 2:
                const workOrderTypeAttribute = form.getAttribute("msdyn_workordertype");
                const workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();
                const operationTypeAttribute = form.getAttribute("ovs_operationtypeid");
                const operationTypeAttributeValue = operationTypeAttribute.getValue();
                const countryAttribute = form.getAttribute("ts_country");
                const countryAttributeValue = countryAttribute.getValue();
                const stakeholderAttribute = form.getAttribute("msdyn_serviceaccount");
                const stakeholderAttributeValue = stakeholderAttribute.getValue();

                var countryCondition = getCountryFetchXmlCondition(form);

                if (regionAttribute != null && workOrderTypeAttribute != null && operationTypeAttribute != null && stakeholderAttribute) {
                    if (regionAttributeValue != null && workOrderTypeAttributeValue != null && operationTypeAttributeValue != null && stakeholderAttributeValue != null) {
                        setOperationTypeFilteredView(form, regionAttributeValue[0].id, "", workOrderTypeAttributeValue[0].id, "", "",);
                        setTradeViewFilteredView(form, regionAttributeValue[0].id, countryCondition, workOrderTypeAttributeValue[0].id, "", "", operationTypeAttributeValue[0].id);
                        setSiteFilteredView(form, regionAttributeValue[0].id, countryCondition, "", stakeholderAttributeValue[0].id, "", operationTypeAttributeValue[0].id);
                    }
                }
                setActivityTypeDisabled(eContext);

                if (currentSystemStatus == 690970004) {
                    if (!userHasRole("System Administrator|ROM - Business Admin|ROM - Manager")) {
                        form.getControl("header_msdyn_systemstatus").setDisabled(true);
                    }
                }
                showHideContact(form);
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
                if (result.entities.length > 0) {
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

        //Check if the Work Order is past the Planned Fiscal Quarter
        setCantCompleteinspectionVisibility(form);
        setIncompleteWorkOrderReasonFilteredView(form);

        //Set visiblity for canceled inspection justification field
        if (currentSystemStatus != 690970005) {
            form.getControl("ts_canceledinspectionjustification").setVisible(false);
            form.getControl("ts_othercanceledjustification").setVisible(false);
        }

        //Set the Work Order Status 'Completed', 'Scheduled', and 'In Progress - Do Not Use This' to not visible
        var workOrderStatus = form.getControl("header_msdyn_systemstatus");

        if (workOrderStatus != null && workOrderStatus != undefined) {

            var options = workOrderStatus.getOptions();

            for (var i = 0; i < options.length; i++) {
                if (options[i].value == 690970003 || options[i].value == 690970001 || options[i].value == 690970002) {
                    workOrderStatus.removeOption(options[i].value);
                }
            }
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

        //Check if the Work Order is past the Planned Fiscal Quarter
        setCantCompleteinspectionVisibility(form);
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
                            if ((isFromCase || isFromSecurityIncident) && stakeholderAttributeValue != null && siteAttributeValue != null) {
                                setOperationTypeFilteredView(form, regionAttributeValue[0].id, "", workOrderTypeAttributeValue[0].id, stakeholderAttributeValue[0].id, siteAttributeValue[0].id);
                            } else {
                                setOperationTypeFilteredView(form, regionAttributeValue[0].id, "", workOrderTypeAttributeValue[0].id, "", "");
                            }
                        } else {
                            if (!isFromCase) form.getControl("ts_country").setDisabled(false);
                            setCountryFilteredView(form);

                            var countryCondition = getCountryFetchXmlCondition(form);
                            if ((isFromCase || isFromSecurityIncident) && stakeholderAttributeValue != null && siteAttributeValue != null) {
                                setOperationTypeFilteredView(form, regionAttributeValue[0].id, countryCondition, workOrderTypeAttributeValue[0].id, stakeholderAttributeValue[0].id, siteAttributeValue[0].id);
                            } else {
                                setOperationTypeFilteredView(form, regionAttributeValue[0].id, countryCondition, workOrderTypeAttributeValue[0].id, "", "");
                            }


                        }

                    }
                }
            }
        } catch (e) {
            throw new Error((e as any).Message);
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
                //if (!(isFromSecurityIncident && form.getAttribute("ts_site").getValue() != null)) {
                    if (form.getControl("msdyn_primaryincidenttype").getDisabled() == false) form.getControl("msdyn_primaryincidenttype").setDisabled(true);
                //}

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
            throw new Error((e as any).Message);
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
            throw new Error((e as any).Message);
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

            if (operationTypeAttribute != null && operationTypeAttribute != undefined && !isFromCase && !isFromSecurityIncident) {

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
                if (!(isFromSecurityIncident && form.getAttribute("ts_site").getValue() != null)) {
                    if (form.getControl("msdyn_primaryincidenttype").getDisabled() == false) form.getControl("msdyn_primaryincidenttype").setDisabled(true);
                }

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
                }
                showHideContact(form);
            } else if (isFromCase) {
                populateOperationField(eContext);
            } else if (isFromSecurityIncident)
            {
                const workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();
                const regionAttributeValue = regionAttribute.getValue();
                const operationTypeAttributeValue = operationTypeAttribute.getValue();
                if (regionAttributeValue != null && regionAttributeValue != undefined &&
                    operationTypeAttributeValue != null && operationTypeAttributeValue != undefined &&
                    workOrderTypeAttributeValue != null && workOrderTypeAttributeValue != undefined) {
                    var countryCondition = getCountryFetchXmlCondition(form);
                    setTradeViewFilteredView(form, regionAttributeValue[0].id, countryCondition, workOrderTypeAttributeValue[0].id, "", "", operationTypeAttributeValue[0].id);
                }
                populateOperationField(eContext);
            }
        } catch (e) {
            throw new Error((e as any).Message);
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

                    setSiteFilteredView(form, regionAttributeValue[0].id, countryCondition, "", stakeholderAttributeValue[0].id, "", operationTypeAttributeValue[0].id);
                }

            }
        } catch (e) {
            throw new Error((e as any).Message);
        }
    }

    export function siteOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        try {

            const form = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();
            const operationTypeAttribute = form.getAttribute("ovs_operationtypeid");
            const stakeholderAttribute = form.getAttribute("msdyn_serviceaccount");
            const siteAttribute = form.getAttribute("ts_site");
            const workOrderTypeAttribute = form.getAttribute("msdyn_workordertype");
            if (siteAttribute != null && siteAttribute != undefined) {
                // Clear out operation and subsite value if not already empty
                if (form.getAttribute("ovs_operationid").getValue() != null) form.getAttribute("ovs_operationid").setValue(null);

                // If an operation type is selected, we use the filtered fetchxml, otherwise, disable and clear out the dependent fields
                const operationTypeAttributeValue = operationTypeAttribute.getValue();
                const stakeholderAttributeValue = stakeholderAttribute.getValue();
                const siteAttributeValue = siteAttribute.getValue();
                const workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();



                if (siteAttributeValue != null && siteAttributeValue != undefined &&
                    stakeholderAttributeValue != null && stakeholderAttributeValue != undefined &&
                    operationTypeAttributeValue != null && operationTypeAttributeValue != undefined &&
                    workOrderTypeAttribute != null && workOrderTypeAttributeValue != null) {

                    // Populate operation asset
                    const fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="ovs_operation"><attribute name="ovs_name"/><attribute name="ts_stakeholder"/><attribute name="ts_site"/><attribute name="ovs_operationid"/><attribute name="ts_operationalstatus"/><order attribute="ovs_name" descending="true"/><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeValue[0].id + '"/><condition attribute="ts_site" operator="eq" value="' + siteAttributeValue[0].id + '"/><condition attribute="ts_stakeholder" operator="eq" value="' + stakeholderAttributeValue[0].id + '"/></filter></entity></fetch>';
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

                                if (targetOperation.ts_operationalstatus == 717750001) {
                                    form.ui.setFormNotification((Xrm.Utility.getGlobalContext().userSettings.languageId == 1033 ? "The operation \"" + targetOperation.ovs_name + "\" is non-operational." : "L'opération \"" + targetOperation.ovs_name + "\" est  non opérationnelle."), "ERROR", "non-operational-operation");
                                    form.getAttribute('ts_site').setValue(null);
                                }
                                else {
                                    form.ui.clearFormNotification("non-operational-operation");
                                    form.getAttribute('ovs_operationid').setValue(lookup);
                                }

                                setActivityTypeFilteredView(form, lookup[0].id, workOrderTypeAttributeValue[0].id, operationTypeAttributeValue[0].id);
                            } else {
                                // do not set a default if multiple records are found, error.
                            }
                        },
                        function (error) {
                            showErrorMessageAlert(error);
                        }
                    );
                    //Check if any subsites exists and only show the field if it's the case
                    const fetchXmlToCheckForSubSites = '<fetch no-lock="false" returntotalrecordcount="true" page="1" count="25"><entity name="msdyn_functionallocation"><attribute name="statecode"/><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><filter><condition attribute="msdyn_functionallocationid" operator="under" value="' + siteAttributeValue[0].id + '"/></filter><order attribute="msdyn_name" descending="false"/><link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="msdyn_parentfunctionallocation" alias="bb"><filter type="and"><condition attribute="msdyn_functionallocationid" operator="eq" uitype="msdyn_functionallocation" value="' + siteAttributeValue[0].id + '"/></filter></link-entity></entity></fetch>';
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
                            else {
                                form.getAttribute("msdyn_functionallocation").setValue(null);
                                form.getControl('msdyn_functionallocation').setVisible(false);
                            }
                        },
                        function (error) {
                            showErrorMessageAlert(error);
                        }
                    );
                }
                else {
                    form.getAttribute("msdyn_functionallocation").setValue(null);
                    form.getControl('msdyn_functionallocation').setVisible(false);
                }
            }
        } catch (e) {
            throw new Error((e as any).Message);
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
            throw new Error((e as any).Message);
        }
    }

    // Just removed this from subsite onchange. I see there's also SiteOnChange in here which we're using for the actual site field. I'm not sure if we need this function anymore.

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
            throw new Error((e as any).Message);
        }
    }

    export function systemStatusOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();
        var newSystemStatus = form.getAttribute("msdyn_systemstatus").getValue();
        //If user try to cancel Complete WO
        if (currentSystemStatus == 690970003 && newSystemStatus == 690970005) {
            var alertStrings = {
                text: Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "CantCancelText"),
            };
            var alertOptions = { height: 160, width: 340 };
            Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function () { });
            form.getAttribute("msdyn_systemstatus").setValue(currentSystemStatus);
        }
        else
            //If system status is set to closed
            if (newSystemStatus == 690970004) {
                Xrm.WebApi.retrieveMultipleRecords("msdyn_workorderservicetask", "?$select=msdyn_workorder&$filter=statecode eq 0 and msdyn_workorder/msdyn_workorderid eq " + form.data.entity.getId() + " and statuscode ne 918640002 and ts_mandatory eq true").then(function success(result) {
                    if (result.entities.length > 0) {
                        var alertStrings = {
                            text: Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "CloseWOWithUnCompletedSTText"),
                            title: Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "CloseWOWithUnCompletedSTTitle")
                        };
                        var alertOptions = { height: 160, width: 340 };
                        Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function () { });

                        form.getAttribute("msdyn_systemstatus").setValue(currentSystemStatus);
                    }
                    else {
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
                                    //At Transport Canada, Fiscal Years run from Apr 1st to Mar 31, Q1 = Apr-Jun, Q2 = Jul-Sept, Q3 = Oct-Dec, Q4 = Jan-Mar
                                    var currentQuarter = Math.floor(new Date().getMonth() / 3);
                                    if (currentQuarter == 0) {
                                        currentQuarter = 4;
                                    }
                                    form.getAttribute("ts_completedquarter").setValue(717750000 + currentQuarter);
                                    form.getControl("ts_completedquarter").setVisible(true);
                                } else {
                                    //Undo the system status change
                                    form.getAttribute("msdyn_systemstatus").setValue(currentSystemStatus);
                                }
                            });
                    }

                }, function (error) {
                    showErrorMessageAlert(error);
                });
            }
            else {
                if (newSystemStatus == 690970005 && currentSystemStatus != 690970003 && userHasRole("System Administrator|ROM - Business Admin|ROM - Planner")) {
                    var confirmStrings = {
                        text: Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "CancelWorkOrderConfirmationText"),
                        title: Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "CancelWorkOrderConfirmationTitle")

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
                                //Set visible canceled inspection justification field
                                form.getControl("ts_canceledinspectionjustification").setVisible(true);
                                form.getAttribute("ts_canceledinspectionjustification").setRequiredLevel("required");
                            } else {
                                //Undo the system status change
                                form.getAttribute("msdyn_systemstatus").setValue(currentSystemStatus);
                            }
                        });

                }
                else {
                    //Keep record Active
                    form.getAttribute("statecode").setValue(0);
                    form.getAttribute("statuscode").setValue(1);
                    form.getControl("ts_canceledinspectionjustification").setVisible(false);
                    form.getControl("ts_canceledinspectionjustification").setVisible(false);
                    form.getAttribute("ts_canceledinspectionjustification").setRequiredLevel("none");
                    currentSystemStatus = newSystemStatus;

                }
            }
    }

    export function caseOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();

        const caseAttribute = form.getAttribute("msdyn_servicerequest");

        if (caseAttribute.getValue() == null) {
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

                // taken out because we don't use 'Completed' as a WO System Status
                //Change systemstatus to Open - Completed
                //form.getAttribute("msdyn_systemstatus").setValue(690970003);
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
            throw new Error((e as any).Message);
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

        if (!regionAttributeValue?.[0].name) {
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

    function setActivityTypeFilteredView(form: Form.msdyn_workorder.Main.ROMOversightActivity, operationAttributeId: string, workOrderTypeAttributeId: string, operationTypeAttributeId: string): void {

        //Check whether this is a AvSec WO by using the operation
        let operationTypeOwningBusinessUnitFetchXML = [
            "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true' no-lock='false'>",
            "  <entity name='businessunit'>",
            "    <attribute name='name'/>",
            "    <attribute name='businessunitid'/>",
            "    <filter>",
            "      <condition attribute='name' operator='like' value='Avia%'/>",
            "    </filter>",
            "    <link-entity name='ovs_operationtype' from='owningbusinessunit' to='businessunitid' link-type='inner'>",
            "      <filter>",
            "        <condition attribute='ovs_operationtypeid' operator='eq' value='", operationTypeAttributeId, "'/>",
            "      </filter>",
            "    </link-entity>",
            "  </entity>",
            "</fetch>"
        ].join("");
        operationTypeOwningBusinessUnitFetchXML = "?fetchXml=" + operationTypeOwningBusinessUnitFetchXML;

        Xrm.WebApi.retrieveMultipleRecords('businessunit', operationTypeOwningBusinessUnitFetchXML).then(
            function success(result) {
                let operationActivityFilter = "";
                if (result.entities.length == 1 && !isFromSecurityIncident) { //Add the operation activity filter if it's an AvSec workorder
                    operationActivityFilter += "<link-entity name='ts_operationactivity' from='ts_activity' to='msdyn_incidenttypeid' link-type='inner'><filter><condition attribute='ts_operation' operator='eq' value='" + operationAttributeId + "'/><condition attribute='ts_operationalstatus' operator='eq' value='717750000'/></filter></link-entity>";
                }

                let fetchXmlActivity = "";
                const viewIdActivity = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F661}';
                const entityNameActivity = "msdyn_incidenttype";
                const viewDisplayNameActivity = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredActivityType");
                const layoutXmlActivity = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_incidenttypeid"><cell name="msdyn_name" width="200" /></row></grid>';

                if (!isFromCase) {
                    fetchXmlActivity = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="msdyn_incidenttype"><attribute name="msdyn_name" /><attribute name="msdyn_incidenttypeid" /><order attribute="msdyn_name" descending="false" /><filter type="and"><condition attribute="msdyn_defaultworkordertype" operator="eq" uiname="Inspection" uitype="msdyn_workordertype" value="' + workOrderTypeAttributeId + '" /><condition attribute="statecode" operator="eq" value="0" /></filter><link-entity name="ts_ovs_operationtypes_msdyn_incidenttypes" from="msdyn_incidenttypeid" to="msdyn_incidenttypeid" visible="false" intersect="true"><link-entity name="ovs_operationtype" from="ovs_operationtypeid" to="ovs_operationtypeid" alias="ab"><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeId + '" /></filter></link-entity></link-entity>' + operationActivityFilter + '</entity></fetch>';
                }
                else {
                    const viewIdActivity = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F661}';
                    const entityNameActivity = "msdyn_incidenttype";
                    const viewDisplayNameActivity = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredActivityType");
                    fetchXmlActivity = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="msdyn_incidenttype"><attribute name="msdyn_name" /><attribute name="msdyn_incidenttypeid" /><order attribute="msdyn_name" descending="false" /><filter type="and"><condition attribute="msdyn_defaultworkordertype" operator="eq" uiname="Inspection" uitype="msdyn_workordertype" value="' + workOrderTypeAttributeId + '" /><condition attribute="statecode" operator="eq" value="0" /></filter><link-entity name="ts_ovs_operationtypes_msdyn_incidenttypes" from="msdyn_incidenttypeid" to="msdyn_incidenttypeid" visible="false" intersect="true"><link-entity name="ovs_operationtype" from="ovs_operationtypeid" to="ovs_operationtypeid" alias="ab"><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeId + '" /></filter></link-entity></link-entity></entity></fetch>';
                    const layoutXmlActivity = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_incidenttypeid"><cell name="msdyn_name" width="200" /></row></grid>';

                }
                form.getControl("msdyn_primaryincidenttype").addCustomView(viewIdActivity, entityNameActivity, viewDisplayNameActivity, fetchXmlActivity, layoutXmlActivity, true);
                form.getControl("msdyn_primaryincidenttype").setDisabled(false);
            }
        ,);
    }

    function setCountryFilteredView(form: Form.msdyn_workorder.Main.ROMOversightActivity): void {
        form.getControl("ts_country").setVisible(true);
        form.getAttribute("ts_country").setRequiredLevel("required");

        const viewId = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F662}';
        const entityName = "tc_country";
        const viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredCountries");
        const fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"><entity name="tc_country"><attribute name="tc_countryid"/><attribute name="tc_name"/><filter><condition attribute="tc_countrynameenglish" operator="ne" value="CANADA" /></filter><order attribute="tc_name" descending="false" /><link-entity name="msdyn_functionallocation" from="ts_country" to="tc_countryid" link-type="inner" alias="ag"><link-entity name="ovs_operation" from="ts_site" to="msdyn_functionallocationid" link-type="inner" alias="ah" /></link-entity></entity></fetch>';
        const layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="tc_countryid"><cell name="tc_name" width="200" /></row></grid>';
        form.getControl("ts_country").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
    }

    function setOperationTypeFilteredView(form: Form.msdyn_workorder.Main.ROMOversightActivity, regionAttributeId: string, countryCondition: string, workOrderTypeAttributeId: string, stakeholderTypeAttributeId: string, siteAttributeId: string): void {
        form.getControl("ovs_operationtypeid").setDisabled(false);

        const viewId = '{8982C38D-8BB4-4C95-BD05-493398FEAE99}';
        const entityName = "ovs_operationtype";
        const viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredOperationTypes");
        const fetchXml = (isFromCase && stakeholderTypeAttributeId != "" && siteAttributeId != "") ? '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"> <entity name="ovs_operationtype"> <attribute name="ovs_operationtypeid" /> <attribute name="ovs_name" /> <attribute name="createdon" /> <order attribute="ovs_name" descending="false" /> <link-entity name="ts_ovs_operationtypes_msdyn_incidenttypes" from="ovs_operationtypeid" to="ovs_operationtypeid" visible="false" intersect="true"> <link-entity name="msdyn_incidenttype" from="msdyn_incidenttypeid" to="msdyn_incidenttypeid" alias="ah"> <filter type="and"> <condition attribute="msdyn_defaultworkordertype" operator="eq" value="' + workOrderTypeAttributeId + '" /> </filter> </link-entity> </link-entity> <link-entity name="ovs_operation" from="ovs_operationtypeid" to="ovs_operationtypeid" link-type="inner" alias="ai"> <filter type="and"><condition attribute="ts_operationalstatus" operator="ne" value="717750001" /><condition attribute="ts_stakeholder" operator="eq" value="' + stakeholderTypeAttributeId + '" /></filter> <link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="ts_site" link-type="inner" alias="aj"> <filter type="and"> <condition attribute="ts_region" operator="eq" value="' + regionAttributeId + '" />' + countryCondition + '<condition attribute="msdyn_functionallocationid" operator="eq" value="' + siteAttributeId + '" /> </filter> </link-entity> </link-entity> </entity> </fetch>' : '<fetch distinct="true" page="1"><entity name="ovs_operationtype"><attribute name="statecode"/><attribute name="ovs_operationtypeid"/><attribute name="ovs_name"/><attribute name="createdon"/><link-entity name="ts_ovs_operationtypes_msdyn_incidenttypes" from="ovs_operationtypeid" to="ovs_operationtypeid" visible="false" intersect="true"><link-entity name="msdyn_incidenttype" from="msdyn_incidenttypeid" to="msdyn_incidenttypeid" alias="ad"><filter type="and"><condition attribute="msdyn_defaultworkordertype" operator="eq" value="' + workOrderTypeAttributeId + '" /></filter></link-entity></link-entity><link-entity name="ovs_operation" from="ovs_operationtypeid" to="ovs_operationtypeid" link-type="inner" alias="ae"><link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="ts_site" link-type="inner" alias="af"><filter type="and"><condition attribute="ts_region" operator="eq" value="' + regionAttributeId + '" />' + countryCondition + '</filter></link-entity></link-entity></entity></fetch>';
        const layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="ovs_operationtypeid"><cell name="ovs_name" width="200" /></row></grid>';
        form.getControl("ovs_operationtypeid").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
    }

    function setTradeViewFilteredView(form: Form.msdyn_workorder.Main.ROMOversightActivity, regionAttributeId: string, countryCondition: string, workOrderTypeAttributeId: string, stakeholderTypeAttributeId: string, siteAttributeId: string, operationTypeAttributeId): void {
        // Enable direct dependent field
        form.getControl("ts_tradenameid").setDisabled(false);

        const viewIdTradename = '{1c259fee-0541-4cac-8d20-7b30ee398065}';
        const entityNameTradename = "ts_tradename";
        const viewDisplayNameTradename = "FilteredSTradenames";
        const fetchXmlTradename = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" returntotalrecordcount="true" page="1" no-lock="false"><entity name="ts_tradename" ><attribute name="ts_tradenameid" /><attribute name="ts_name" /><order attribute="ts_stakeholderidname" /><order attribute="ts_name" /><link-entity name="account" from="accountid" to="ts_stakeholderid" ><filter type="and"><condition attribute="ts_stakeholderstatus" operator="ne" value="717750001" /></filter><link-entity name="ovs_operation" from="ts_stakeholder" to="accountid" link-type="inner" alias="ac"><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeId + '"/><condition attribute="ts_operationalstatus" operator="eq" value="717750000"/></filter><link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="ts_site" link-type="inner" alias="ad"><filter type="and"><condition attribute="ts_region" operator="eq" value="' + regionAttributeId + '"/>' + countryCondition + '</filter></link-entity></link-entity></link-entity></entity></fetch>';
        const layoutXmlTradename = '<grid name="resultset" object="10010" jump="ts_name" select="1" icon="1" preview="1"><row name="result" id="ts_tradenameid"><cell name="ts_name" width="200" /></row></grid>';
        form.getControl("ts_tradenameid").addCustomView(viewIdTradename, entityNameTradename, viewDisplayNameTradename, fetchXmlTradename, layoutXmlTradename, true);
    }

    function setSiteFilteredView(form: Form.msdyn_workorder.Main.ROMOversightActivity, regionAttributeId: string, countryCondition: string, workOrderTypeAttributeId: string, stakeholderTypeAttributeId: string, siteAttributeId: string, operationTypeAttributeId): void {
        // Enable direct dependent field
        form.getControl("ts_site").setDisabled(false);

        // Custom view
        const viewId = '{6E57251F-F695-4076-9498-49AB892154B7}';
        const entityName = "msdyn_functionallocation";
        const viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredSites");
        const fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" returntotalrecordcount="true" page="1" count="25" no-lock="false"><entity name="msdyn_functionallocation"><attribute name="statecode"/><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><filter>' + countryCondition + '</filter><filter><condition attribute="ts_region" operator="eq" value="' + regionAttributeId + '"/></filter><filter><condition attribute="ts_sitestatus" operator="ne" value="717750001" /></filter><order attribute="msdyn_name" descending="false"/><link-entity name="ovs_operation" from="ts_site" to="msdyn_functionallocationid"><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value=" ' + operationTypeAttributeId + '"/><condition attribute="ts_stakeholder" operator="eq" value="' + stakeholderTypeAttributeId + '"/><condition attribute="ts_operationalstatus" operator="eq" value="717750000"/></filter></link-entity></entity></fetch>';
        const layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="200" /></row></grid>';
        form.getControl("ts_site").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
    }

    function setIncompleteWorkOrderReasonFilteredView(form: Form.msdyn_workorder.Main.ROMOversightActivity): void {
        //Find out if the Work Order Type belongs to ISSO or AvSec
        let selectedOperationTypeId = form.getAttribute("ovs_operationtypeid").getValue();

        let ownerId;

        if (selectedOperationTypeId != null && selectedOperationTypeId != undefined) {
            Xrm.WebApi.retrieveRecord("ovs_operationtype", selectedOperationTypeId[0].id.replace(/({|})/g, ''), undefined).then(
                function success(result) {
                    ownerId = result._ownerid_value;

                    //Now filter the lookup
                    if (ownerId != null) {
                        form.getControl("ts_incompleteworkorderreason").setDisabled(false);

                        const viewId = '{736A4E08-E24F-4961-ADB4-BBAAB4119EE0}';

                        //Keep the option to select 'Other' available no matter who the Work Order Type belongs to
                        const otherId = '8B3B6A28-C5FB-EC11-82E6-002248AE441F';
                        const entityName = "ts_incompleteworkorderreason";
                        const viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredIncompleteWorkOrderReasons");
                        const fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" returntotalrecordcount="true" page="1" count="25" no-lock="false"><entity name="ts_incompleteworkorderreason"><attribute name="ts_incompleteworkorderreasonid" /><attribute name="ts_name" /><filter type="or"><condition attribute="ownerid" operator="eq" value="' + ownerId + '" /><condition attribute="ts_incompleteworkorderreasonid" operator="eq" value="' + otherId + '" /></filter><order attribute="ts_name" /></entity></fetch>';
                        const layoutXml = '<grid name="resultset" object="10010" jump="ts_name" select="1" icon="1" preview="1"><row name="result" id="ts_incompleteworkorderreasonid"><cell name="ts_name" width="200" /></row></grid>';
                        form.getControl("ts_incompleteworkorderreason").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                    }
                },
                function (error) {
                }
            );
        }
    }

    function getCountryFetchXmlCondition(form: Form.msdyn_workorder.Main.ROMOversightActivity) {
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

    function setCantCompleteinspectionVisibility(form: Form.msdyn_workorder.Main.ROMOversightActivity): void {
        const systemStatus = form.getAttribute("msdyn_systemstatus").getValue();
        let plannedFiscalQuarter = form.getAttribute("ovs_fiscalquarter").getValue();
        let validWorkOrderStatus = false;

        if (systemStatus != null && (systemStatus == msdyn_wosystemstatus.New || systemStatus == msdyn_wosystemstatus.Scheduled || systemStatus == msdyn_wosystemstatus.InProgress)) {
            validWorkOrderStatus = true;
        }

        if (plannedFiscalQuarter != null) {

            //fetch the end date of the Planned Fiscal Quarter
            Xrm.WebApi.retrieveRecord("tc_tcfiscalquarter", plannedFiscalQuarter[0].id.replace(/({|})/g, ''), "?$select=tc_quarterend").then(
                function success(result) {

                    let currentDateTime = new Date();

                    let quarterendDate = new Date(result.tc_quarterend);

                    //if we are past the end date of the quarter and have a valid work order status, make the Can't Complete Inspection visible, otherwise hide it
                    if (quarterendDate < currentDateTime && validWorkOrderStatus) {
                        setCantCompleteInspectionControlsVisibility(form, true);
                    }
                    else {
                        //Hide the Can't Complete Inspection if there is no Planned Fiscal Quarter set
                        setCantCompleteInspectionControlsVisibility(form, false);
                    }
                },
                function (error) {
                    setCantCompleteInspectionControlsVisibility(form, false);
                    showErrorMessageAlert("Error fetching the end date of the Planned Fiscal Quarter: " + error);
                }
            );
        }
        else {
            //Hide the Can't Complete Inspection if there is no Planned Fiscal Quarter set
            setCantCompleteInspectionControlsVisibility(form, false);
        }
    }

    function setCantCompleteInspectionControlsVisibility(form: Form.msdyn_workorder.Main.ROMOversightActivity, visibility: boolean): void {
        let cantCompleteInspectionSelection = form.getAttribute("ts_cantcompleteinspection").getValue();

        if (visibility == true) {
            form.getControl("ts_cantcompleteinspection").setVisible(visibility);

            if (cantCompleteInspectionSelection == true) {
                var reason = form.getAttribute("ts_incompleteworkorderreason").getValue();

                form.getControl("ts_incompleteworkorderreason").setVisible(visibility);

                if (reason != null) {
                    //Determine if 'Other' is selected - if it is show the reason for other
                    if (reason[0].id == "{8B3B6A28-C5FB-EC11-82E6-002248AE441F}") {
                        form.getControl("ts_incompleteworkorderreasonforother").setVisible(true);
                    } else {
                        form.getControl("ts_incompleteworkorderreasonforother").setVisible(false);
                    }
                } else {
                    form.getControl("ts_incompleteworkorderreasonforother").setVisible(false);
                }
            }
            else {
                form.getControl("ts_incompleteworkorderreason").setVisible(false);
                form.getControl("ts_incompleteworkorderreasonforother").setVisible(false);
                form.getAttribute("ts_cantcompleteinspection").setValue(false);
                form.getAttribute("ts_incompleteworkorderreason").setValue(null);
                form.getAttribute("ts_incompleteworkorderreasonforother").setValue(null);
            }
        }
        else {
            form.getControl("ts_cantcompleteinspection").setVisible(visibility);
            form.getControl("ts_incompleteworkorderreason").setVisible(visibility);
            form.getControl("ts_incompleteworkorderreasonforother").setVisible(visibility);
            form.getAttribute("ts_cantcompleteinspection").setValue(false);
            form.getAttribute("ts_incompleteworkorderreason").setValue(null);
            form.getAttribute("ts_incompleteworkorderreasonforother").setValue(null);
        }
    }

    //Checks if the Activity Type should have been able to be changed
    //Puts old value in and locks the control if it shouldn't have been able to be changed
    //This is needed when a service task is changed to in-progress and the work order form remained open.
    export function activityTypeOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();
        if (formContext.ui.getFormType() == 1) {
            return;
        }

        const workOrderId = formContext.data.entity.getId();
        const activityTypeControl = formContext.getControl("msdyn_primaryincidenttype");
        //Retrieve all related Service Tasks
        let fetchXml = [
            "<fetch top='50'>",
            "  <entity name='msdyn_workorderservicetask'>",
            "    <attribute name='statuscode' />",
            "    <attribute name='statecode' />",
            "    <filter>",
            "      <condition attribute='msdyn_workorder' operator='eq' value='", workOrderId, "'/>",
            "    </filter>",
            "  </entity>",
            "</fetch>",
        ].join("");
        fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
        Xrm.WebApi.retrieveMultipleRecords("msdyn_workorderservicetask", fetchXml).then(function (result) {
            if (result.entities.length == 0) {
                activityTypeControl.setDisabled(false);
            } else {
                let workOrderHasActiveWost = false;
                let workOrderHasNewWost = false;
                for (let wost of result.entities) {
                    if (wost.statecode == 0) {
                        workOrderHasActiveWost = true;
                        if (wost.statuscode == msdyn_workorderservicetask_statuscode.New) workOrderHasNewWost = true;
                    }
                }
                if (!(workOrderHasNewWost || !workOrderHasActiveWost)) {
                    //The Activity type should not have been able to change. Set it to the old value and lock the field.
                    Xrm.WebApi.retrieveRecord("msdyn_workorder", workOrderId, "?$select=_msdyn_primaryincidenttype_value&$expand=msdyn_primaryincidenttype($select=ovs_incidenttypenameenglish,ovs_incidenttypenamefrench)").then(function (result) {
                        const incidentTypeName = (Xrm.Utility.getGlobalContext().userSettings.languageId == 1036) ? result.msdyn_primaryincidenttype.ovs_incidenttypenamefrench : result.msdyn_primaryincidenttype.ovs_incidenttypenameenglish
                        formContext.getAttribute("msdyn_primaryincidenttype").setValue([{
                            id: result._msdyn_primaryincidenttype_value,
                            name: incidentTypeName,
                            entityType: "msdyn_incidenttype"
                        }]);
                        activityTypeControl.setDisabled(true);
                    });
                } else {
                    formContext.data.save();
                }
            }
        });

        const operation = formContext.getAttribute("ovs_operationid").getValue();
        const operationType = formContext.getAttribute("ovs_operationtypeid").getValue();
        const workOrderType = formContext.getAttribute("msdyn_workordertype").getValue();
        if (operation != null && operationType != null && workOrderType != null) {
            setActivityTypeFilteredView(formContext, operation[0].id, workOrderType[0].id, operationType[0].id);
        }
    }

    //Enables the Activity Type control if there is a New WOST or no Active WOSTs yet
    function setActivityTypeDisabled(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();
        const workOrderId = formContext.data.entity.getId();
        const activityTypeControl = formContext.getControl("msdyn_primaryincidenttype");
        //Retrieve all related Service Tasks
        let fetchXml = [
            "<fetch top='50'>",
            "  <entity name='msdyn_workorderservicetask'>",
            "    <attribute name='statuscode' />",
            "    <attribute name='statecode' />",
            "    <filter>",
            "      <condition attribute='msdyn_workorder' operator='eq' value='", workOrderId, "'/>",
            "    </filter>",
            "  </entity>",
            "</fetch>",
        ].join("");
        fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
        Xrm.WebApi.retrieveMultipleRecords("msdyn_workorderservicetask", fetchXml).then(function (result) {
            if (result.entities.length == 0) {
                activityTypeControl.setDisabled(false);
            } else {
                let workOrderHasActiveWost = false;
                let workOrderHasNewWost = false;
                for (let wost of result.entities) {
                    if (wost.statecode == 0) {
                        workOrderHasActiveWost = true;
                        if (wost.statuscode == msdyn_workorderservicetask_statuscode.New) workOrderHasNewWost = true;
                    }
                }
                if (workOrderHasNewWost || !workOrderHasActiveWost) {
                    activityTypeControl.setDisabled(false);
                } else {
                    activityTypeControl.setDisabled(true);
                }
            }
        });
    }

    export function userHasRole(rolesName) {
        var userRoles = Xrm.Utility.getGlobalContext().userSettings.roles;
        var hasRole = false;
        var roles = rolesName.split("|");
        roles.forEach(function (roleItem) {
            userRoles.forEach(function (userRoleItem) {
                if (userRoleItem.name.toLowerCase() == roleItem.toLowerCase()) hasRole = true;
            });
        });
        return hasRole;
    }

    export function cantCompleteInspectionOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();

        let cantCompleteInspection = form.getAttribute("ts_cantcompleteinspection").getValue();

        if (cantCompleteInspection == true) {
            setCantCompleteInspectionControlsVisibility(form, true);
            form.getAttribute("ts_incompleteworkorderreason").setRequiredLevel("required");
            form.getControl("ts_incompleteworkorderreason").setFocus();
        } else {
            setCantCompleteInspectionControlsVisibility(form, false);
            form.getControl("ts_cantcompleteinspection").setVisible(true);
            form.getAttribute("ts_incompleteworkorderreason").setRequiredLevel("none");
        }
    }

    export function incompleteWorkOrderReasonOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();

        let selectedIncompleteWorkOrderReason = form.getAttribute("ts_incompleteworkorderreason").getValue();

        const selectedOther = "{8B3B6A28-C5FB-EC11-82E6-002248AE441F}";

        //If 'Other' is selected as a reason, make ts_incompleteworkorderreasonforother visible
        if (selectedIncompleteWorkOrderReason != null && selectedIncompleteWorkOrderReason[0].id.toUpperCase() == selectedOther) {
            form.getControl("ts_incompleteworkorderreasonforother").setVisible(true);
            form.getControl("ts_incompleteworkorderreasonforother").setFocus();
            form.getAttribute("ts_incompleteworkorderreasonforother").setRequiredLevel("required");
        } else {
            form.getControl("ts_incompleteworkorderreasonforother").setVisible(false);
            form.getAttribute("ts_incompleteworkorderreasonforother").setValue(null);
            form.getAttribute("ts_incompleteworkorderreasonforother").setRequiredLevel("none");
        }
    }

    export function fiscalQuarterOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();

        //Check if the Work Order is past the Planned Fiscal Quarter
        setCantCompleteinspectionVisibility(form);
    }

    export function canceledWorkOrderReasonOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();

        let selectedCanceledWorkOrderReason = form.getAttribute("ts_canceledinspectionjustification").getValue();

        const selectedOther = "{A8D7125C-7F24-ED11-9DB2-002248AE429C}";

        //If 'Other' is selected as a reason, make ts_othercanceledjustification visible
        if (selectedCanceledWorkOrderReason != null && selectedCanceledWorkOrderReason[0].id.toUpperCase() == selectedOther) {
            form.getControl("ts_othercanceledjustification").setVisible(true);
            form.getAttribute("ts_othercanceledjustification").setRequiredLevel("required");
        } else {
            form.getControl("ts_othercanceledjustification").setVisible(false);
            form.getAttribute("ts_othercanceledjustification").setValue(null);
            form.getAttribute("ts_othercanceledjustification").setRequiredLevel("none");
        }
    }

    function populateOperationField(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();
        const operationTypeAttribute = form.getAttribute("ovs_operationtypeid");
        const stakeholderAttribute = form.getAttribute("msdyn_serviceaccount");
        const siteAttribute = form.getAttribute("ts_site");
        const workOrderTypeAttribute = form.getAttribute("msdyn_workordertype");
        if (siteAttribute != null && siteAttribute != undefined) {
            // Clear out operation and subsite value if not already empty
            if (form.getAttribute("ovs_operationid").getValue() != null) form.getAttribute("ovs_operationid").setValue(null);

            // If an operation type is selected, we use the filtered fetchxml, otherwise, disable and clear out the dependent fields
            const operationTypeAttributeValue = operationTypeAttribute.getValue();
            const stakeholderAttributeValue = stakeholderAttribute.getValue();
            const siteAttributeValue = siteAttribute.getValue();
            const workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();

            if (siteAttributeValue != null && siteAttributeValue != undefined &&
                stakeholderAttributeValue != null && stakeholderAttributeValue != undefined &&
                operationTypeAttributeValue != null && operationTypeAttributeValue != undefined &&
                workOrderTypeAttribute != null && workOrderTypeAttributeValue != null) {

                // Populate operation asset
                const fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="ovs_operation"><attribute name="ovs_name"/><attribute name="ts_stakeholder"/><attribute name="ts_site"/><attribute name="ovs_operationid"/><attribute name="ts_operationalstatus"/><order attribute="ovs_name" descending="true"/><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeValue[0].id + '"/><condition attribute="ts_site" operator="eq" value="' + siteAttributeValue[0].id + '"/><condition attribute="ts_stakeholder" operator="eq" value="' + stakeholderAttributeValue[0].id + '"/></filter></entity></fetch>';
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

                            if (targetOperation.ts_operationalstatus == 717750001) {
                                form.ui.setFormNotification((Xrm.Utility.getGlobalContext().userSettings.languageId == 1033 ? "The operation \"" + targetOperation.ovs_name + "\" is non-operational." : "L'opération \"" + targetOperation.ovs_name + "\" est  non opérationnelle."), "ERROR", "non-operational-operation");
                                form.getAttribute('ts_site').setValue(null);
                            }
                            else {
                                form.ui.clearFormNotification("non-operational-operation");
                                form.getAttribute('ovs_operationid').setValue(lookup);
                            }

                            setActivityTypeFilteredView(form, lookup[0].id, workOrderTypeAttributeValue[0].id, operationTypeAttributeValue[0].id);
                        } else {
                            if(isFromSecurityIncident){
                                const placeHolderOperation: { id: string; name: string; entityType: "ovs_operation" }[] = [
                                    {
                                        id: "e9fa69ee-85ea-ed11-a7c6-0022483c5061",
                                        name: "Security Incident Operation",
                                        entityType: "ovs_operation"
                                    }
                                ]
                                form.getAttribute('ovs_operationid').setValue(placeHolderOperation);
                                setActivityTypeFilteredView(form, placeHolderOperation[0].id, workOrderTypeAttributeValue[0].id, operationTypeAttributeValue[0].id);
                            }
                        }
                    },
                    function (error) {
                        showErrorMessageAlert(error);
                    }
                );
            }
        }
    }

    function fillOrSetTradeNameView(eContext: Xrm.ExecutionContext<any, any>, stakeholderAttributeValue: Xrm.EntityReference<"account">[]) {
        const form = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();

        const tradeNameFetchXML = '?fetchXml=' + '<fetch version="1.0" mapping="logical" returntotalrecordcount="true" page="1" count="25" no-lock="false"><entity name="ts_tradename"><attribute name="statecode"/><attribute name="ts_tradenameid"/><attribute name="ts_name"/><attribute name="createdon"/><filter type="and"><condition attribute="statecode" operator="eq" value="0"/><condition attribute="ts_stakeholderid" operator="eq" value="' + stakeholderAttributeValue[0].id + '"/></filter><attribute name="ts_stakeholderid"/><order attribute="ts_name" descending="false"/></entity></fetch>';

        Xrm.WebApi.retrieveMultipleRecords('ts_tradename', tradeNameFetchXML).then(
            function success(tradeNames) {
                if(tradeNames.entities.length == 1){
                    var tradeName = new Array();
                    tradeName[0] = new Object();
                    tradeName[0].id = tradeNames.entities[0].ts_tradenameid
                    tradeName[0].name = tradeNames.entities[0].ts_name
                    tradeName[0].entityType = "ts_tradename";

                    form.getAttribute("ts_tradenameid").setValue(tradeName);
                }
                else if(tradeNames.entities.length > 1){
                    form.getControl("ts_tradenameid").setDisabled(false);

                    let tradeNameCondition = '';

                    tradeNames.entities.forEach((tradeName) => {tradeNameCondition += '<condition attribute="ts_tradenameid" operator="eq" value="' + tradeName.ts_tradenameid + '" />'})
                    
                    const viewIdTradename = '{1c859fee-0541-2cac-8d20-7b50ee398066}';
                    const entityNameTradename = "ts_tradename";
                    const viewDisplayNameTradename = "FilteredSTradenames";
                    const fetchXmlTradename = '<fetch version="1.0" mapping="logical" returntotalrecordcount="true" page="1" count="25" no-lock="false"><entity name="ts_tradename"><attribute name="statecode"/><attribute name="ts_tradenameid"/><attribute name="ts_name"/><attribute name="createdon"/><filter type="and"><condition attribute="statecode" operator="eq" value="0"/></filter><filter type="or">' + tradeNameCondition +'</filter><attribute name="ts_stakeholderid"/><order attribute="ts_name" descending="false"/></entity></fetch>';
                    const layoutXmlTradename = '<grid name="resultset" object="10010" jump="ts_name" select="1" icon="1" preview="1"><row name="result" id="ts_tradenameid"><cell name="ts_name" width="200" /></row></grid>';
                    form.getControl("ts_tradenameid").addCustomView(viewIdTradename, entityNameTradename, viewDisplayNameTradename, fetchXmlTradename, layoutXmlTradename, true);
                }             
            }
        );
    }

    function showHideContact(form: Form.msdyn_workorder.Main.ROMOversightActivity): void {
        const operationTypeValue = form.getAttribute("ovs_operationtypeid").getValue();

        if (operationTypeValue != null && operationTypeValue[0].id == "{BE8B0910-C751-EB11-A812-000D3AF3AC0D}") { //Person
            form.getControl("ts_contact").setVisible(true);
        }
        else {
            form.getControl("ts_contact").setVisible(false);
        }

        //const operationTypeId = operationTypeValue ? operationTypeValue[0].id : "";
        //if (operationTypeId != "") {
        //    Xrm.WebApi.retrieveRecord("ovs_operationtype", operationTypeId, "?$select=_ownerid_value ").then(
        //        function success(result) {
        //            if (result._ownerid_value == "e2e3910d-a41f-ec11-b6e6-0022483cb5c7") {  //Owner is AvSec
        //                form.getControl("ts_contact").setVisible(true);
        //            }
        //            else {
        //                form.getControl("ts_contact").setVisible(false);
        //            }
        //        },
        //        function error(error) {
        //            Xrm.Navigation.openAlertDialog({ text: error.message });
        //        });
        //}
    }

    async function isAvSecBusinessUnit() {
        let userId = Xrm.Utility.getGlobalContext().userSettings.userId;
        let currentUserBusinessUnitFetchXML = [
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
        let userBusinessUnitName = await Xrm.WebApi.retrieveMultipleRecords("businessunit", currentUserBusinessUnitFetchXML);
        return userBusinessUnitName.entities[0].name.startsWith("Aviation");
    }
        
    function setFiscalQuarter(form: Form.msdyn_workorder.Main.ROMOversightActivity) {
        let currentDate = new Date();
        let currentDateString = currentDate.toISOString();

        let fetchXml = `<fetch top="1"><entity name="tc_tcfiscalquarter"><attribute name="tc_name"/><attribute name="tc_tcfiscalquarterid"/><filter type="and"><condition attribute="tc_quarterstart" operator="le" value="${currentDateString}"/><condition attribute="tc_quarterend" operator="ge" value="${currentDateString}"/></filter></entity></fetch>`;

        let lookup = new Array();
        Xrm.WebApi.retrieveMultipleRecords("tc_tcfiscalquarter", "?fetchXml=" + fetchXml).then(
            function success(result) {
                lookup[0] = new Object();
                lookup[0].entityType = "tc_tcfiscalquarter"; 
                lookup[0].name = result.entities[0].tc_name;
                lookup[0].id = result.entities[0].tc_tcfiscalquarterid;

                form.getAttribute("ovs_fiscalquarter").setValue(lookup);
            },
            function (error) {
            }
        );
    }

    function setCaseLookupClickNavigation(eContext) {
        const formContext = eContext.getFormContext();
        formContext.getControl("msdyn_servicerequest").addOnLookupTagClick(function (eContext) {
            const formContext = eContext.getFormContext();
            //Check if the Time Tracking Tab is Expanded
            if (formContext.ui.tabs.get("tab_TimeTracking").getDisplayState() == 'expanded') {
                eContext.getEventArgs().preventDefault(); //Prevent default navigation to normal Case form
                var record = eContext.getEventArgs().getTagValue();
                Xrm.Navigation.navigateTo({
                    pageType: "entityrecord",
                    entityName: record.entityType,
                    entityId: record.id,
                    formId: "cc169f8e-7df9-ed11-8f6e-000d3af36bac"
                }, {
                    target: 2,
                    position: 2,
                    width:
                    {
                        value: 30,
                        unit: "%"
                    }
                });
            }
        });
    }

    function setSecurityIncidentLookupClickNavigation(eContext) {
        const formContext = eContext.getFormContext();
        formContext.getControl("ts_securityincident").addOnLookupTagClick(function (eContext) {
            const formContext = eContext.getFormContext();
            //Check if the Time Tracking Tab is Expanded
            if (formContext.ui.tabs.get("tab_TimeTracking").getDisplayState() == 'expanded') {
                eContext.getEventArgs().preventDefault(); //Prevent default navigation to normal Case form
                var record = eContext.getEventArgs().getTagValue();
                Xrm.Navigation.navigateTo({
                    pageType: "entityrecord",
                    entityName: record.entityType,
                    entityId: record.id,
                    formId: "54b321b6-6afa-ed11-8f6e-0022483c5061"
                }, {
                    target: 2,
                    position: 2,
                    width:
                    {
                        value: 30,
                        unit: "%"
                    }
                });
            }
        });
    }
}

