/* eslint-disable @typescript-eslint/triple-slash-reference */
namespace ROM.UnplannedWorkOrder {
    let isFromCase = false; //Boolean status to track if the work order is being created from a case
    let isFromSecurityIncident = false;
    var currentSystemStatus;
    var currentStatus;
    var scheduledQuarterAttributeValueChanged = false;
    var isROM20Form = false;
    var UNPLANNED_CATEGORY_ID = "47f438c7-c104-eb11-a813-000d3af3a7a7";
    // EVENTS
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_unplannedworkorder.Main.Information>eContext.getFormContext();

        //Check if user is using Rail Safety App to set filtered view for Work Order Type
        isUserUsingRailSafetyApp().then(isUsing => {
            if (isUsing) {
                setWorkOrderTypeFilteredView(form, true);
            }
            else {
                setWorkOrderTypeFilteredView(form, false);
            }
        });


        const state = form.getAttribute("statecode").getValue() ?? null;

        // Check flag and navigate to WO if needed
        const flagAttr = form.getAttribute("ts_openworkorderoncreation");
        if (flagAttr && flagAttr.getValue() === true && form.ui.getFormType() === 2) {
            // Clear the flag immediately to prevent re-triggering
            flagAttr.setValue(false);
            flagAttr.setSubmitMode("always");

            // Save the form to confirm the flag change
            form.data.save().then(
                function success() {
                    // Now check if the related work order was created by the plugin
                    const workOrderLookup = form.getAttribute("ts_workorder");
                    if (workOrderLookup) {
                        const workOrderValue = workOrderLookup.getValue();
                        if (workOrderValue && workOrderValue.length > 0) {
                            const woId = workOrderValue[0].id.replace(/[{}]/g, "");

                            // Navigate to the related work order
                            Xrm.Navigation.openForm({
                                entityName: "msdyn_workorder",
                                entityId: woId,
                                openInNewWindow: false
                            }).then(
                                function success() {
                                    console.log("Successfully navigated to related work order");
                                },
                                function error(err) {
                                    console.error("Error opening work order:", err);
                                }
                            );
                        }
                    }
                },
                function error(err) {
                    console.error("Error saving flag change:", err);
                }
            );
        }

        const regionAttribute = form.getAttribute("ts_region");
        const regionAttributeValue = regionAttribute.getValue();

        const ownerControl = form.getControl("header_ownerid");
        const headerOwnerControl = form.getControl("header_ownerid");

        var formItem = form.ui.formSelector.getCurrentItem().getId();
        isROM20Form = formItem.toLowerCase() == "a629bb8a-da93-4e58-b777-3f338a46d4d8";

        currentSystemStatus = form.getAttribute("ts_recordstatus").getValue();

        // Set comment/overtime visibility based on user's Business Unit (AvSec vs non‑AvSec)
        let userId = Xrm.Utility.getGlobalContext().userSettings.userId;
        let currentUserBusinessUnitFetchXML = [
            "<fetch top='50'>",
            "  <entity name='businessunit'>",
            "    <attribute name='name' />",
            "    <attribute name='businessunitid' />",
            "    <link-entity name='systemuser' from='businessunitid' to='businessunitid' link-type='inner' alias='ab'>",
            "      <filter>",
            "        <condition attribute='systemuserid' operator='eq' value='", userId, "'/>",
            "      </filter>",
            "    </link-entity>",
            "  </entity>",
            "</fetch>",
        ].join("");
        currentUserBusinessUnitFetchXML = "?fetchXml=" + encodeURIComponent(currentUserBusinessUnitFetchXML);
        Xrm.WebApi.retrieveMultipleRecords("businessunit", currentUserBusinessUnitFetchXML).then(async function (businessunit) {
            if (!businessunit || !businessunit.entities || businessunit.entities.length === 0) {
                return;
            }

            const userBU = businessunit.entities[0];
            const userBusinessUnitId = userBU.businessunitid;

            const isAvSec = await isAvSecBU(userBusinessUnitId);

            if (!isAvSec) {
                form.getControl("ts_details").setVisible(false);
                /*                form.getControl("ts_overtime").setVisible(false);*/
                form.getControl("ts_overtimerequired").setVisible(true);

            }
            else {
                form.getControl("ts_details").setVisible(true);
                form.getControl("ts_servicerequest").setVisible(false);
                //form.getControl("ts_instructions").setVisible(true);
                //form.getControl("ts_accountableteam").setVisible(true);
                //form.getControl("ts_plannedcost").setVisible(false);
                //form.getControl("ts_actualcost").setVisible(false);
                //form.getControl("ts_costexplanation").setVisible(false);
                //form.getControl("ts_cantcompleteinspection").setVisible(false);

                // Hide overtime toggle for AvSec users in ROM20 form
                if (isROM20Form) {
                    form.getControl("ts_overtimerequired").setVisible(false);
                }

                if (currentSystemStatus == msdyn_wosystemstatus.Closed || currentSystemStatus == msdyn_wosystemstatus.Cancelled) {
                    if (!userHasRole("System Administrator|ROM - Business Admin|ROM - Planner|ROM - Manager")) {
                        form.getControl("header_ts_recordstatus").setDisabled(true);
                    }
                }
            }
            //Set disabled false for quarter fields if ISSO
            //else {
            //    if (userHasRole("System Administrator|ROM - Business Admin|ROM - Planner|ROM - Manager|ROM - Inspector")) {
            //        form.getControl("ts_completedquarter").setDisabled(false);
            //        form.getControl("ovs_revisedquarterid").setDisabled(false);
            //    } else {
            //        form.getControl("ts_completedquarter").setDisabled(true);
            //        form.getControl("ts_revisedquarterid").setDisabled(true);
            //    }
            //}
        });

        // Enable rationale editing for users in the AvSec International team (based on environment variable, not team name)
        getEnvironmentVariableValue(TEAM_SCHEMA_NAMES.AVIATION_SECURITY_INTERNATIONAL)
            .then(function (teamId) {
                if (!teamId) {
                    return null;
                }
                return isUserInTeam(userId, teamId);
            })
            .then(function (isMember) {
                if (isMember) {
                    form.getControl("ts_rational").setDisabled(false);
                }
            })
            .catch(function (error) {
                console.error("Error checking AvSec International team membership:", error);
            });

        //Keep track of the current system status, to be used when cancelling a status change.
        currentStatus = form.getAttribute("ts_state").getValue();
        form.getControl("ts_worklocation").removeOption(690970001);  //Remove Facility Work Location Option
        //updateCaseView(eContext);

        //Set required fields
        form.getAttribute("ts_region").setRequiredLevel("required");
        form.getAttribute("ts_operationtype").setRequiredLevel("required");
        form.getAttribute("ts_site").setRequiredLevel("required");

        //If the Work Order has a Case, set the case lookup to required to prevent saving a Work Order without a Case
        //if (form.getAttribute("ts_servicerequest").getValue() != null) {
        //    form.getAttribute("ts_servicerequest").setRequiredLevel("required");
        //}

        ////Set Case Lookup Navigation to open Time Tracking form when on Time Tracking Tab
        //setCaseLookupClickNavigation(eContext);

        ////Set Security Incident Lookup Navigation to open Time Tracking form when on Time Tracking Tab
        //setSecurityIncidentLookupClickNavigation(eContext);

        ////Set Trip Lookup Navigation to open Time Tracking form when on Time Tracking Tab
        //setTripLookupClickNavigation(eContext);

        showHideFiedsByOperationType(eContext);

        //if (currentSystemStatus == 690970004 || currentSystemStatus == msdyn_wosystemstatus.Closed) {
        //    form.getControl("ts_completedquarter").setVisible(true);
        //}
        //else {
        //    form.getControl("ts_completedquarter").setVisible(false);
        //}

        //if (currentSystemStatus == 690970004 || currentSystemStatus == 690970003 || currentSystemStatus == msdyn_wosystemstatus.Closed) { //Closed ; Completed
        //    form.getControl("ovs_revisedquarterid").setDisabled(true);
        //}

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

        // Show "subsite" & "Sub subsite" fields if it has value on Edit or Readonly mode etc
        if (form.ui.getFormType() !== 1) {
            if (form.getAttribute("ts_functionallocation").getValue() != null) {
                form.getControl('ts_functionallocation').setVisible(true);
            }
            if (form.getAttribute("ts_subsubsite").getValue() != null) {
                form.getControl('ts_subsubsite').setVisible(true);
            }
        }

        ////Prevent enabling controls if record is Inactive and set the right views (active/inactive)
        //if (state == 1) {
        //    setWorkOrderServiceTasksView(form, false);
        //    return;
        //}
        //else { //If the work order is active, show the active views
        //    setWorkOrderServiceTasksView(form, true);
        //}

        if (form.getAttribute("ts_plannedfiscalquarter").getValue() != null && form.getAttribute("ts_revisedquarterid").getValue() == null)
            form.getAttribute("ts_revisedquarterid").setValue(form.getAttribute("ts_plannedfiscalquarter").getValue());

        setScheduledQuarterFilter(form);

        switch (form.ui.getFormType()) {
            case 1:  //Create New Work Order

                //If work order is New (case 1) and it already has a case on form load, the work order must be coming from a case
                //if (form.getAttribute("ts_servicerequest").getValue() != null) {
                //    isFromCase = true;
                //}
                //else if (form.getAttribute("ts_securityincident").getValue() != null) {
                //    isFromSecurityIncident = true;
                //}

                // Set default values
                setDefaultFiscalYear(form);
                setRegion(form);

                //If the new work order is coming from a case, set default rational to planned
                if (isFromCase) {
                    var lookup = new Array();
                    lookup[0] = new Object();
                    lookup[0].id = "{994c3ec1-c104-eb11-a813-000d3af3a7a7}"
                    lookup[0].name = "Planned";
                    lookup[0].entityType = "ts_tyrational";
                    form.getAttribute("ts_rational").setValue(lookup); //Planned
                } else {
                    var lookup = new Array();
                    lookup[0] = new Object();
                    lookup[0].id = `{${UNPLANNED_CATEGORY_ID}}`;
                    lookup[0].name = "Unplanned";
                    lookup[0].entityType = "ovs_tyrational";
                    form.getAttribute("ts_rational").setValue(lookup); //Unplanned

                    setFiscalQuarter(form);
                }

                // Disable all operation related fields
                form.getControl("ts_region").setDisabled(true);
                form.getControl("ts_operationtype").setDisabled(true);
                form.getControl("ts_site").setDisabled(true);
                form.getControl("ts_primaryincidenttype").setDisabled(true);
                form.getControl("ts_functionallocation").setDisabled(true);


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

                //if (isFromSecurityIncident) {
                //    const stakeholderAttribute = form.getAttribute("msdyn_serviceaccount");
                //    const stakeholderAttributeValue = stakeholderAttribute!.getValue();

                //    if (stakeholderAttributeValue != null) {
                //        fillOrSetTradeNameView(eContext, stakeholderAttributeValue);
                //    }
                //}

                break;
            case 2:
                const workOrderTypeAttribute = form.getAttribute("ts_workordertype");
                const workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();
                const operationTypeAttribute = form.getAttribute("ts_operationtype");
                const operationTypeAttributeValue = operationTypeAttribute.getValue();
                const countryAttribute = form.getAttribute("ts_country");
                const countryAttributeValue = countryAttribute.getValue();
                const stakeholderAttribute = form.getAttribute("ts_stakeholder");
                const stakeholderAttributeValue = stakeholderAttribute.getValue();

                var countryCondition = getCountryFetchXmlCondition(form);

                if (regionAttribute != null && workOrderTypeAttribute != null && operationTypeAttribute != null && stakeholderAttribute) {
                    if (regionAttributeValue != null && workOrderTypeAttributeValue != null && operationTypeAttributeValue != null && stakeholderAttributeValue != null) {
                        setOperationTypeFilteredView(form, regionAttributeValue[0].id, "", workOrderTypeAttributeValue[0].id, "", "",);
                        //setTradeViewFilteredView(form, regionAttributeValue[0].id, countryCondition, workOrderTypeAttributeValue[0].id, "", "", operationTypeAttributeValue[0].id);
                        setSiteFilteredView(form, regionAttributeValue[0].id, countryCondition, "", stakeholderAttributeValue[0].id, "", operationTypeAttributeValue[0].id);
                    }
                }

                // setActivityTypeDisabled(eContext);

                //if (currentSystemStatus == 690970004 || currentSystemStatus == msdyn_wosystemstatus.Closed) {
                //    if (!userHasRole("System Administrator|ROM - Business Admin|ROM - Manager")) {
                //        form.getControl("header_msdyn_systemstatus").setDisabled(true);
                //    }
                //}

                //if (currentSystemStatus == msdyn_wosystemstatus.Closed) {
                //    form.getControl("msdyn_workordertype").setDisabled(true);
                //    form.getControl("ts_region").setDisabled(true);
                //    form.getControl("ts_operationtype").setDisabled(true);
                //    //form.getControl("ts_tradenameid").setDisabled(true);
                //    form.getControl("ts_site").setDisabled(true);
                //    form.getControl("msdyn_worklocation").setDisabled(true);
                //    form.getControl("header_ownerid").setDisabled(true);
                //    form.getControl("ownerid").setDisabled(true);
                //}

                //if (form.getAttribute("ts_trip").getValue() != null) {
                //    form.getControl("ts_traveltime").setVisible(false);
                //}

                showHideContact(form);
                break;
            default:
                // Enable all operation related fields
                form.getControl("ts_region").setDisabled(false);
                form.getControl("ts_operationtype").setDisabled(false);
                //form.getControl("ts_tradenameid").setDisabled(false);
                form.getControl("ts_stakeholder").setDisabled(false);
                form.getControl("ts_site").setDisabled(false);
                form.getControl("ts_primaryincidenttype").setDisabled(false);

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
                    //form.getControl("ts_tradenameid").setDisabled(true);
                    form.getControl("ts_stakeholder").setDisabled(true);
                    form.getControl("ts_site").setDisabled(true);
                    form.getControl("ts_operationtype").setDisabled(true);
                }
            },
            function (error) {
            }
        );

        //Hide Quarters field for ISSO WO based on Operation Type owner
        //const operationType = form.getAttribute("ts_operationtype").getValue();
        //if (operationType != null) {
        //let operationTypeOwningBusinessUnitFetchXML = [
        //    "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true' no-lock='false'>",
        //    "  <entity name='businessunit'>",
        //    "    <attribute name='name'/>",
        //    "    <attribute name='businessunitid'/>",
        //    "    <link-entity name='ovs_operationtype' from='owningbusinessunit' to='businessunitid' link-type='inner'>",
        //    "      <filter>",
        //    "        <condition attribute='ts_operationtype' operator='eq' value='", operationType[0].id, "'/>",
        //    "      </filter>",
        //    "    </link-entity>",
        //    "  </entity>",
        //    "</fetch>"
        //].join("");
        //    operationTypeOwningBusinessUnitFetchXML = "?fetchXml=" + operationTypeOwningBusinessUnitFetchXML;
        //    Xrm.WebApi.retrieveMultipleRecords("businessunit", operationTypeOwningBusinessUnitFetchXML).then(
        //        function success(result) {
        //            if (!result.entities[0].name.startsWith("Avia")) {                        
        //                form.getControl("ts_quarterofpreparationtime").setVisible(false);
        //                form.getControl("ts_quarterofconductingoversight").setVisible(false);
        //                form.getControl("ts_quarterofreportinganddocumentation").setVisible(false);
        //                form.getControl("ts_quarteroftraveltime").setVisible(false);
        //            }
        //        },
        //        function (error) {
        //        }
        //    );
        //}

        //Check if the Work Order is past the Planned Fiscal Quarter
        //setCantCompleteinspectionVisibility(form);
        //setIncompleteWorkOrderReasonFilteredView(form);

        //Set visiblity for canceled inspection justification field
        //if (currentSystemStatus != 690970005) {
        //    form.getControl("ts_canceledinspectionjustification").setVisible(false);
        //    form.getControl("ts_othercanceledjustification").setVisible(false);
        //}

        //Set the Work Order Status 'Completed', 'Scheduled', and 'In Progress - Do Not Use This' to not visible
        var workOrderStatus = form.getControl("header_ts_recordstatus");

        if (workOrderStatus != null && workOrderStatus != undefined) {

            var options = workOrderStatus.getOptions();

            for (var i = 0; i < options.length; i++) {
                if (options[i].value == 690970003 || options[i].value == 690970001 || options[i].value == 690970002 || options[i].value == 690970004) {
                    workOrderStatus.removeOption(options[i].value);
                }
            }
        }

        //if (currentSystemStatus == msdyn_wosystemstatus.Closed) {
        //    form.getControl("msdyn_systemstatus").removeOption(msdyn_wosystemstatus.New);
        //    form.getControl("msdyn_systemstatus").removeOption(msdyn_wosystemstatus.Scheduled);
        //    form.getControl("msdyn_systemstatus").removeOption(msdyn_wosystemstatus.Cancelled);
        //    if (!userHasRole("System Administrator|ROM - Business Admin|ROM - Manager")) {
        //        form.getControl("msdyn_systemstatus").removeOption(msdyn_wosystemstatus.InProgress);
        //    }
        //}

        //Restrict edit rights for Report Details to WO Owner and Additional Inspectors
        var subgridAdditionalInspectors = form.getControl("AdditionalInspectors");
        if (subgridAdditionalInspectors) {
            subgridAdditionalInspectors.addOnLoad(function () {
                restrictEditRightReportDetails(eContext, subgridAdditionalInspectors);
            });
        }

        //Lock Cancelled Inspection Justification field if WO is cancelled
        if (currentSystemStatus == msdyn_wosystemstatus.Cancelled) {
            form.getControl("ts_cancelledinspectionjustification").setDisabled(true);

            let selectedCanceledWorkOrderReason = form.getAttribute("ts_cancelledinspectionjustification").getValue();
            const selectedOther = "{A8D7125C-7F24-ED11-9DB2-002248AE429C}";

            //If 'Other' is selected as a reason, make ts_othercanceledjustification visible
            if (selectedCanceledWorkOrderReason != null && selectedCanceledWorkOrderReason[0].id.toUpperCase() == selectedOther) {
                form.getControl("ts_othercancelledjustification").setVisible(true);
                form.getAttribute("ts_othercancelledjustification").setRequiredLevel("required");
            }
        }


        //  unlockRecordLogFieldsIfUserIsSystemAdmin(form);
        RemoveOptionCancel(eContext);

        showRationaleField(form, UNPLANNED_CATEGORY_ID);
    }
    function restrictEditRightReportDetails(executionContext, subgridAdditionalInspectors) {
        //Process Additional Inspectors Subgrid
        var additionalInspectorIds: string[] = [];
        if (subgridAdditionalInspectors && subgridAdditionalInspectors.getGrid()) {
            var rows = subgridAdditionalInspectors.getGrid().getRows();
            var length = rows.getLength();
            rows.forEach(function (row) {
                var entity = row.getData().getEntity();
                var id = entity.getId();
                additionalInspectorIds.push(id);
            });
        } else {
            console.log("Subgrid not loaded or not found.");
        }
        //Disabled Report Details if user is not a owner or additional inspector
        let userId = Xrm.Utility.getGlobalContext().userSettings.userId;
        const form = <Form.msdyn_workorder.Main.ROMOversightActivity>executionContext.getFormContext();
        const ownerAttribute = form.getAttribute("ownerid").getValue();
        if (ownerAttribute && ownerAttribute[0].id) {
            if (!(userId == ownerAttribute[0].id || (additionalInspectorIds.includes(userId)))) {
                form.getControl("ts_reportdetails").setDisabled(true);
            }
        }
    }

    function RemoveOptionCancel(eContext) {
        var formContext = eContext.getFormContext();
        var userSettings = Xrm.Utility.getGlobalContext().userSettings;

        //Get Security Roles of the current User
        var securityRoles = userSettings.roles;

        if (!CheckRolesBeforeCancel(securityRoles)) {
            formContext.getControl("header_ts_recordstatus").removeOption(690970005);
        }
    }

    function CheckRolesBeforeCancel(securityRoles) {
        let match = false;
        var allowedRoles = ["ROM - Planner", "ROM - Business Admin", "ROM - Manager", "System Administrator"]
        securityRoles.forEach(function (role) {
            if (allowedRoles.includes(role.name)) {
                match = true;
            }
        });
        return match;
    }

    export function onSave(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_unplannedworkorder.Main.Information>eContext.getFormContext();
        const systemStatus = form.getAttribute("ts_recordstatus").getValue();
        const cancelledInspectionJustification = form.getAttribute("ts_cancelledinspectionjustification").getValue();

        var workOrderServiceTaskData;

        if (systemStatus == msdyn_wosystemstatus.ClosedInactive) { //Only close associated entities when Record Status is set to Closed - Posted  690970004
            workOrderServiceTaskData =
            {
                "statecode": 1,           //open -> 0
                "statuscode": 918640003    //open -> 918640002
            };

            //Close/Open associated work order service task(s)
            //   closeWorkOrderServiceTasks(form, workOrderServiceTaskData);

            //Set inactive views
            //   setWorkOrderServiceTasksView(form, false);
        }

        //Check if the Work Order is past the Planned Fiscal Quarter
        //  setCantCompleteinspectionVisibility(form);

        //Post a note on ScheduledQuarter Change
        //  postNoteOnScheduledQuarterChange(form);

        if (cancelledInspectionJustification != null) {
            form.getAttribute("ts_recordstatus").setValue(msdyn_wosystemstatus.Cancelled);
            form.getControl("ts_cancelledinspectionjustification").setDisabled(true);
        }
    }

    export function workOrderTypeOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        try {

            const form = <Form.ts_unplannedworkorder.Main.Information>eContext.getFormContext();
            const workOrderTypeAttribute = form.getAttribute("ts_workordertype");
            const regionAttribute = form.getAttribute("ts_region");
            const countryAttribute = form.getAttribute("ts_country");
            const stakeholderAttribute = form.getAttribute("ts_stakeholder");
            const siteAttribute = form.getAttribute("ts_site");

            if (workOrderTypeAttribute != null && workOrderTypeAttribute != undefined) {

                // Clear out all dependent fields' value if they are not already disabled and not already empty
                if (!form.getControl("ts_operationtype").getDisabled() && form.getAttribute("ts_operationtype").getValue() != null) {
                    form.getAttribute("ts_operationtype").setValue(null);
                }
                //if (!form.getControl("ts_tradenameid").getDisabled() && form.getAttribute("ts_tradenameid").getValue() != null) {
                //    form.getAttribute("ts_tradenameid").setValue(null);
                //}
                if (!form.getControl("ts_stakeholder").getDisabled() && form.getAttribute("ts_stakeholder").getValue() != null) {
                    form.getAttribute("ts_stakeholder").setValue(null);
                }
                if (!form.getControl("ts_site").getDisabled() && form.getAttribute("ts_site").getValue() != null) {
                    form.getAttribute("ts_site").setValue(null);
                    form.getAttribute("ts_operation").setValue(null);
                }
                if (!form.getControl("ts_primaryincidenttype").getDisabled() && form.getAttribute("ts_primaryincidenttype").getValue() != null) {
                    form.getAttribute("ts_primaryincidenttype").setValue(null);
                }

                // Disable all dependent fields
                if (form.getControl("ts_country").getDisabled() == false) form.getControl("ts_country").setDisabled(true);
                if (form.getControl("ts_operationtype").getDisabled() == false) form.getControl("ts_operationtype").setDisabled(true);
                //if (form.getControl("ts_tradenameid").getDisabled() == false) form.getControl("ts_tradenameid").setDisabled(true);
                if (form.getControl("ts_stakeholder").getDisabled() == false) form.getControl("ts_stakeholder").setDisabled(true);
                if (form.getControl("ts_site").getDisabled() == false) form.getControl("ts_site").setDisabled(true);
                if (form.getControl("ts_primaryincidenttype").getDisabled() == false) form.getControl("ts_primaryincidenttype").setDisabled(true);

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

            const form = <Form.ts_unplannedworkorder.Main.Information>eContext.getFormContext();
            const workOrderTypeAttribute = form.getAttribute("ts_workordertype");
            const regionAttribute = form.getAttribute("ts_region");

            if (regionAttribute != null && regionAttribute != undefined) {

                // Clear out all dependent fields' value if they are not already disabled and not already empty
                if (!form.getControl("ts_country").getDisabled() && form.getAttribute("ts_country").getValue() != null) {
                    form.getAttribute("ts_country").setValue(null);
                }
                if (!form.getControl("ts_operationtype").getDisabled() && form.getAttribute("ts_operationtype").getValue() != null) {
                    form.getAttribute("ts_operationtype").setValue(null);
                }
                //if (!form.getControl("ts_tradenameid").getDisabled() && form.getAttribute("ts_tradenameid").getValue() != null) {
                //    form.getAttribute("ts_tradenameid").setValue(null);
                //}
                if (!form.getControl("ts_stakeholder").getDisabled() && form.getAttribute("ts_stakeholder").getValue() != null) {
                    form.getAttribute("ts_stakeholder").setValue(null);
                }
                if (!form.getControl("ts_site").getDisabled() && form.getAttribute("ts_site").getValue() != null) {
                    form.getAttribute("ts_site").setValue(null);
                    form.getAttribute("ts_operation").setValue(null);
                }
                if (!form.getControl("ts_functionallocation").getVisible() && form.getAttribute("ts_functionallocation").getValue() != null) {
                    form.getAttribute("ts_functionallocation").setValue(null);
                }
                if (!form.getControl("ts_primaryincidenttype").getDisabled() && form.getAttribute("ts_primaryincidenttype").getValue() != null) {
                    form.getAttribute("ts_primaryincidenttype").setValue(null);
                }

                // Disable all dependent fields
                form.getAttribute("ts_country").setRequiredLevel("none");
                if (form.getControl("ts_country").getDisabled() == false) form.getControl("ts_country").setVisible(false);
                if (form.getControl("ts_operationtype").getDisabled() == false) form.getControl("ts_operationtype").setDisabled(true);
                //if (form.getControl("ts_tradenameid").getDisabled() == false) form.getControl("ts_tradenameid").setDisabled(true);
                if (form.getControl("ts_stakeholder").getDisabled() == false) form.getControl("ts_stakeholder").setDisabled(true);
                if (form.getControl("ts_site").getDisabled() == false) form.getControl("ts_site").setDisabled(true);
                if (form.getControl("ts_functionallocation").getDisabled() == false) form.getControl("ts_functionallocation").setVisible(false);
                //if (!(isFromSecurityIncident && form.getAttribute("ts_site").getValue() != null)) {
                if (form.getControl("ts_primaryincidenttype").getDisabled() == false) form.getControl("ts_primaryincidenttype").setDisabled(true);
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

            const form = <Form.ts_unplannedworkorder.Main.Information>eContext.getFormContext();
            const workOrderTypeAttribute = form.getAttribute("ts_workordertype");
            const regionAttribute = form.getAttribute("ts_region");
            const countryAttribute = form.getAttribute("ts_country");

            if (countryAttribute != null && countryAttribute != undefined) {

                // Clear out all dependent fields' value if they are not already disabled and not already empty
                if (!form.getControl("ts_operationtype").getDisabled() && form.getAttribute("ts_operationtype").getValue() != null) {
                    form.getAttribute("ts_operationtype").setValue(null);
                }
                //if (!form.getControl("ts_tradenameid").getDisabled() && form.getAttribute("ts_tradenameid").getValue() != null) {
                //    form.getAttribute("ts_tradenameid").setValue(null);
                //}
                if (!form.getControl("ts_stakeholder").getDisabled() && form.getAttribute("ts_stakeholder").getValue() != null) {
                    form.getAttribute("ts_stakeholder").setValue(null);
                }
                if (!form.getControl("ts_site").getDisabled() && form.getAttribute("ts_site").getValue() != null) {
                    form.getAttribute("ts_site").setValue(null);
                    form.getAttribute("ts_operation").setValue(null);
                }
                if (!form.getControl("ts_functionallocation").getVisible() && form.getAttribute("ts_functionallocation").getValue() != null) {
                    form.getAttribute("ts_functionallocation").setValue(null);
                }
                if (!form.getControl("ts_primaryincidenttype").getDisabled() && form.getAttribute("ts_primaryincidenttype").getValue() != null) {
                    form.getAttribute("ts_primaryincidenttype").setValue(null);
                }

                // Disable all dependent fields
                if (form.getControl("ts_operationtype").getDisabled() == false) form.getControl("ts_operationtype").setDisabled(true);
                //if (form.getControl("ts_tradenameid").getDisabled() == false) form.getControl("ts_tradenameid").setDisabled(true);
                if (form.getControl("ts_stakeholder").getDisabled() == false) form.getControl("ts_stakeholder").setDisabled(true);
                if (form.getControl("ts_site").getDisabled() == false) form.getControl("ts_site").setDisabled(true);
                if (form.getControl("ts_functionallocation").getDisabled() == false) form.getControl("ts_functionallocation").setVisible(false);
                if (form.getControl("ts_primaryincidenttype").getDisabled() == false) form.getControl("ts_primaryincidenttype").setDisabled(true);

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

            const form = <Form.ts_unplannedworkorder.Main.Information>eContext.getFormContext();
            const workOrderTypeAttribute = form.getAttribute("ts_workordertype");
            const regionAttribute = form.getAttribute("ts_region");
            const operationTypeAttribute = form.getAttribute("ts_operationtype");
            const countryAttribute = form.getAttribute("ts_country");

            if (operationTypeAttribute != null && operationTypeAttribute != undefined && !isFromCase && !isFromSecurityIncident) {

                // Clear out all dependent fields' value if they are not already disabled and not already empty
                //if (!form.getControl("ts_tradenameid").getDisabled() && form.getAttribute("ts_tradenameid").getValue() != null) {
                //    form.getAttribute("ts_tradenameid").setValue(null);
                //}
                if (form.getAttribute("ts_stakeholder").getValue() != null) {
                    form.getAttribute("ts_stakeholder").setValue(null);
                }
                if (!form.getControl("ts_site").getDisabled() && form.getAttribute("ts_site").getValue() != null) {
                    form.getAttribute("ts_site").setValue(null);
                    form.getAttribute("ts_operation").setValue(null);
                }
                if (!form.getControl("ts_functionallocation").getVisible() && form.getAttribute("ts_functionallocation").getValue() != null) {
                    form.getAttribute("ts_functionallocation").setValue(null);
                }
                if (!form.getControl("ts_primaryincidenttype").getDisabled() && form.getAttribute("ts_primaryincidenttype").getValue() != null) {
                    form.getAttribute("ts_primaryincidenttype").setValue(null);
                }

                // Disable all dependent fields
                //if (form.getControl("ts_tradenameid").getDisabled() == false) form.getControl("ts_tradenameid").setDisabled(true);
                if (form.getControl("ts_stakeholder").getDisabled() == false) form.getControl("ts_stakeholder").setDisabled(true);
                if (form.getControl("ts_site").getDisabled() == false) form.getControl("ts_site").setDisabled(true);
                if (form.getControl("ts_functionallocation").getDisabled() == false) form.getControl("ts_functionallocation").setVisible(false);
                if (!(isFromSecurityIncident && form.getAttribute("ts_site").getValue() != null)) {
                    if (form.getControl("ts_primaryincidenttype").getDisabled() == false) form.getControl("ts_primaryincidenttype").setDisabled(true);
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
                    form.getControl("ts_stakeholder").setDisabled(false);

                    // Setup a custom view
                    // This value is never saved and only needs to be unique among the other available views for the lookup.
                    const viewId = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F660}';
                    const entityName = "account";
                    const viewDisplayName = Xrm.Utility.getResourceString("ts_/resx/UnplannedWorkOrder", "FilteredStakeholders");
                    const fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" returntotalrecordcount="true" page="1" no-lock="false"><entity name="account"><attribute name="name"/><attribute name="accountid"/><order attribute="name" descending="false" /><link-entity name="ovs_operation" from="ts_stakeholder" to="accountid" link-type="inner" alias="ac"><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeValue[0].id + '"/><condition attribute="ts_operationalstatus" operator="eq" value="717750000"/></filter><link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="ts_site" link-type="inner" alias="ad"><filter type="and"><condition attribute="ts_region" operator="eq" value="' + regionAttributeValue[0].id + '"/>' + countryCondition + '</filter></link-entity></link-entity></entity></fetch>';
                    const layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="accountid"><cell name="name" width="200" /></row></grid>';

                    form.getControl("ts_stakeholder").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);

                    // Custom view for Trade Names
                    //setTradeViewFilteredView(form, regionAttributeValue[0].id, countryCondition, workOrderTypeAttributeValue[0].id, "", "", operationTypeAttributeValue[0].id);
                }
                showHideContact(form);
                //} else if (isFromCase) {
                //    populateOperationField(eContext);
                //} else if (isFromSecurityIncident) {
                //    //const workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();
                //    //const regionAttributeValue = regionAttribute.getValue();
                //    //const operationTypeAttributeValue = operationTypeAttribute.getValue();
                //    //if (regionAttributeValue != null && regionAttributeValue != undefined &&
                //    //    operationTypeAttributeValue != null && operationTypeAttributeValue != undefined &&
                //    //    workOrderTypeAttributeValue != null && workOrderTypeAttributeValue != undefined) {
                //    //    var countryCondition = getCountryFetchXmlCondition(form);
                //    //    setTradeViewFilteredView(form, regionAttributeValue[0].id, countryCondition, workOrderTypeAttributeValue[0].id, "", "", operationTypeAttributeValue[0].id);
                //    //}
                //    //form.getControl("ts_site").setDisabled(false);
                populateOperationField(eContext);
                //
            }

            showHideFiedsByOperationType(eContext);

        } catch (e) {
            throw new Error((e as any).Message);
        }
    }

    export function stakeholderOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        try {

            const form = <Form.ts_unplannedworkorder.Main.Information>eContext.getFormContext();
            const regionAttribute = form.getAttribute("ts_region");
            const operationTypeAttribute = form.getAttribute("ts_operationtype");
            const stakeholderAttribute = form.getAttribute("ts_stakeholder");
            const countryAttribute = form.getAttribute("ts_country");

            if (stakeholderAttribute != null && stakeholderAttribute != undefined) {

                // Clear out all dependent fields' value if they are not already disabled and not already empty
                if (!form.getControl("ts_site").getDisabled() && form.getAttribute("ts_site").getValue() != null) {
                    form.getAttribute("ts_site").setValue(null);
                    form.getAttribute("ts_operation").setValue(null);
                }
                if (!form.getControl("ts_functionallocation").getVisible() && form.getAttribute("ts_functionallocation").getValue() != null) {
                    form.getAttribute("ts_functionallocation").setValue(null);
                }

                // Disable all dependent fields
                if (form.getControl("ts_site").getDisabled() == false) form.getControl("ts_site").setDisabled(true);
                if (form.getControl("ts_functionallocation").getDisabled() == false) form.getControl("ts_functionallocation").setVisible(false);

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

    export function subSubSiteOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        try {

            const form = <Form.ts_unplannedworkorder.Main.Information>eContext.getFormContext();
            const operationTypeAttribute = form.getAttribute("ts_operationtype");
            const stakeholderAttribute = form.getAttribute("ts_stakeholder");
            const siteAttribute = form.getAttribute("ts_site");
            const subSiteAttribute = form.getAttribute("ts_functionallocation");//ts_subsite on Operation entity
            const subSubSiteAttribute = form.getAttribute("ts_subsubsite");//ts_subsubsite on Operation entity

            const workOrderTypeAttribute = form.getAttribute("ts_workordertype");
            if (siteAttribute != null && siteAttribute != undefined && subSiteAttribute != null && subSiteAttribute != undefined && subSubSiteAttribute != null && subSubSiteAttribute != undefined) {
                // Clear out operation and subsite value if not already empty
                if (form.getAttribute("ts_operation").getValue() != null) form.getAttribute("ts_operation").setValue(null);

                // If an operation type is selected, we use the filtered fetchxml, otherwise, disable and clear out the dependent fields
                const operationTypeAttributeValue = operationTypeAttribute.getValue();
                const stakeholderAttributeValue = stakeholderAttribute.getValue();
                const siteAttributeValue = siteAttribute.getValue();
                const subSiteAttributeValue = subSiteAttribute.getValue();
                const subSubSiteAttributeValue = subSubSiteAttribute.getValue();
                const workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();

                if (siteAttributeValue != null && siteAttributeValue != undefined &&
                    subSiteAttributeValue != null && subSiteAttributeValue != undefined &&
                    subSubSiteAttributeValue != null && subSubSiteAttributeValue != undefined &&
                    stakeholderAttributeValue != null && stakeholderAttributeValue != undefined &&
                    operationTypeAttributeValue != null && operationTypeAttributeValue != undefined &&
                    workOrderTypeAttribute != null && workOrderTypeAttributeValue != null) {

                    // Populate operation asset
                    const fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="ovs_operation"><attribute name="ovs_name"/><attribute name="ts_stakeholder"/><attribute name="ts_site"/><attribute name="ovs_operationid"/><attribute name="ts_operationalstatus"/><order attribute="ovs_name" descending="true"/><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeValue[0].id + '"/><condition attribute="ts_site" operator="eq" value="' + siteAttributeValue[0].id + '"/><condition attribute="ts_stakeholder" operator="eq" value="' + stakeholderAttributeValue[0].id + '"/><condition attribute="ts_subsite" operator="eq" value="' + subSiteAttributeValue[0].id + '"/><condition attribute="ts_subsubsite" operator="eq" value="' + subSubSiteAttributeValue[0].id + '"/></filter></entity></fetch>';
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
                                    form.ui.clearFormNotification("sub-non-operational-operation");

                                    form.ui.setFormNotification((Xrm.Utility.getGlobalContext().userSettings.languageId == 1033 ? "The operation \"" + targetOperation.ovs_name + "\" is non-operational." : "L'opération \"" + targetOperation.ovs_name + "\" est  non opérationnelle."), "ERROR", "sub-non-operational-operation");
                                    form.getAttribute('ts_site').setValue(null);
                                }
                                else {
                                    form.ui.clearFormNotification("sub-non-operational-operation");
                                    form.getAttribute('ts_operation').setValue(lookup);
                                }

                                setActivityTypeFilteredView(form, lookup[0].id, workOrderTypeAttributeValue[0].id, operationTypeAttributeValue[0].id);
                            } else {
                                form.ui.clearFormNotification("closedSubSubProject")
                                // do not set a default if multiple records are found, error.
                                form.ui.setFormNotification("No operations found matching the selected Sub subsite, Operation Type and Stakeholder!.", "WARNING", "closedSubSubProject");//ERROR
                            }
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
    //export function filterCanceledJustificationField(eContext: Xrm.ExecutionContext<any, any>): void {
    //    try {
    //        let form = <Form.msdyn_workorder.Main.WOJustifyCancellation>eContext.getFormContext();
    //        console.log("filterCanceledJustificationField");
    //        if (form.getAttribute("ts_operationtype") != null) {
    //            var type = form.getAttribute("ts_operationtype").getValue();
    //            if (type != null) {
    //                var operationTypeOwningBusinessUnitFetchXML = [
    //                    "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true' no-lock='false'>",
    //                    "  <entity name='businessunit'>",
    //                    "    <attribute name='name'/>",
    //                    "    <attribute name='businessunitid'/>",
    //                    "    <link-entity name='ovs_operationtype' from='owningbusinessunit' to='businessunitid' link-type='inner'>",
    //                    "      <filter>",
    //                    "        <condition attribute='ts_operationtype' operator='eq' value='", type[0].id, "'/>",
    //                    "      </filter>",
    //                    "    </link-entity>",
    //                    "  </entity>",
    //                    "</fetch>"
    //                ].join("");
    //                operationTypeOwningBusinessUnitFetchXML = "?fetchXml=" + operationTypeOwningBusinessUnitFetchXML;
    //                Xrm.WebApi.retrieveMultipleRecords("businessunit", operationTypeOwningBusinessUnitFetchXML).then(function success(resultBusinessUnit) {
    //                    var targetFilter = "<filter type='and'><condition attribute='owneridname' operator='like' value='Avia%'/></filter>";
    //                    if (resultBusinessUnit.entities[0].name.startsWith("Inte")) {
    //                        targetFilter = "<filter type='and'> <condition attribute='owneridname' operator='like' value='Inte%'/> </filter> ";
    //                    }
    //                    form.getControl("ts_canceledinspectionjustification").addPreSearch(function () {
    //                        console.log("inside Filter: " + targetFilter);
    //                        form.getControl("ts_canceledinspectionjustification").addCustomFilter(targetFilter, "ts_canceledinspectionjustification");
    //                    });

    //                }, function (error) {
    //                    showErrorMessageAlert(error);
    //                });
    //            }
    //        }
    //    }
    //    catch (e) {
    //        throw new Error((e as any).Message);
    //    }
    //}

    export function subSiteOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        try {

            const form = <Form.ts_unplannedworkorder.Main.Information>eContext.getFormContext();
            const operationTypeAttribute = form.getAttribute("ts_operationtype");
            const stakeholderAttribute = form.getAttribute("ts_stakeholder");
            const siteAttribute = form.getAttribute("ts_site");
            const subSiteAttribute = form.getAttribute("ts_functionallocation");//ts_subsite on Operation entity

            const workOrderTypeAttribute = form.getAttribute("ts_workordertype");
            if (siteAttribute != null && siteAttribute != undefined && subSiteAttribute != null && subSiteAttribute != undefined) {
                // Clear out operation and subsite value if not already empty
                if (form.getAttribute("ts_operation").getValue() != null) form.getAttribute("ts_operation").setValue(null);

                // If an operation type is selected, we use the filtered fetchxml, otherwise, disable and clear out the dependent fields
                const operationTypeAttributeValue = operationTypeAttribute.getValue();
                const stakeholderAttributeValue = stakeholderAttribute.getValue();
                const siteAttributeValue = siteAttribute.getValue();
                const subSiteAttributeValue = subSiteAttribute.getValue();
                const workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();

                if (siteAttributeValue != null && siteAttributeValue != undefined &&
                    subSiteAttributeValue != null && subSiteAttributeValue != undefined &&
                    stakeholderAttributeValue != null && stakeholderAttributeValue != undefined &&
                    operationTypeAttributeValue != null && operationTypeAttributeValue != undefined &&
                    workOrderTypeAttribute != null && workOrderTypeAttributeValue != null) {

                    // Populate operation asset
                    const fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="ovs_operation"><attribute name="ovs_name"/><attribute name="ts_stakeholder"/><attribute name="ts_site"/><attribute name="ovs_operationid"/><attribute name="ts_operationalstatus"/><order attribute="ovs_name" descending="true"/><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeValue[0].id + '"/><condition attribute="ts_site" operator="eq" value="' + siteAttributeValue[0].id + '"/><condition attribute="ts_stakeholder" operator="eq" value="' + stakeholderAttributeValue[0].id + '"/><condition attribute="ts_subsite" operator="eq" value="' + subSiteAttributeValue[0].id + '"/></filter></entity></fetch>';
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
                                    form.getAttribute('ts_operation').setValue(lookup);
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
                    //Check if any Sub-subsites exists and only show the field if it's the case
                    const fetchXmlToCheckForSubSites = '<fetch no-lock="false" returntotalrecordcount="true" page="1" count="25"><entity name="msdyn_functionallocation"><attribute name="statecode"/><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><filter><condition attribute="msdyn_functionallocationid" operator="under" value="' + siteAttributeValue[0].id + '"/></filter><order attribute="msdyn_name" descending="false"/><link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="msdyn_parentfunctionallocation" alias="bb"><filter type="and"><condition attribute="msdyn_functionallocationid" operator="eq" uitype="msdyn_functionallocation" value="' + siteAttributeValue[0].id + '"/></filter></link-entity></entity></fetch>';
                    encodedFetchXml = encodeURIComponent(fetchXmlToCheckForSubSites);

                    //only retrieve SubSites with Operations under Stakeholders
                    var targetSubSiteIds = "";
                    var checkOtherSubSites = true;
                    const fetchOperationsWithSiteAndStakeholder = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="ovs_operation"><attribute name="ovs_name" /><attribute name="ts_subsite"/><attribute name="ts_subsubsite"/><attribute name="createdon" /><attribute name="ovs_operationtypeid" /><attribute name="ovs_operationid" />     <order attribute="ovs_name" descending="false" /><filter type="and"><condition attribute="statecode" operator="eq" value="0" /><condition attribute="ts_stakeholder" operator="eq" uitype="account" value="' + stakeholderAttributeValue[0].id + '" /> <condition attribute="ts_site" operator="eq"  uitype="msdyn_functionallocation" value="' + siteAttributeValue[0].id + '" /><condition attribute="ts_subsite" operator="eq"  uitype="msdyn_functionallocation" value="' + subSiteAttributeValue[0].id + '" /><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeValue[0].id + '"/></filter></entity></fetch>';
                    var encodedFetchXmlOperationsWithSiteAndStakeholder = encodeURIComponent(fetchOperationsWithSiteAndStakeholder);
                    Xrm.WebApi.retrieveMultipleRecords("ovs_operation", "?fetchXml=" + encodedFetchXmlOperationsWithSiteAndStakeholder).then(
                        function success(result) {
                            if (result.entities.length > 0) {
                                var subCounter = 0;
                                result.entities.forEach(function (item) {
                                    var subSiteId = item["_ts_subsubsite_value"];
                                    if (subSiteId != undefined) {
                                        targetSubSiteIds += "<value>" + subSiteId + "</value>";
                                        subCounter++;
                                    }
                                });
                                if (targetSubSiteIds != "") {
                                    checkOtherSubSites = false;
                                    form.getControl('ts_subsubsite').setDisabled(false);
                                    form.getControl('ts_subsubsite').setVisible(true);
                                    form.getAttribute("ts_subsubsite").setRequiredLevel("required");//none
                                    var viewId = '{1B59589F-F122-5428-4771-79BC925240C3}';
                                    var entityName = "msdyn_functionallocation";
                                    var viewDisplayName = Xrm.Utility.getResourceString("ts_/resx/UnplannedWorkOrder", "FilteredSites");
                                    var activityTypeFetchXml = '<fetch no-lock="false"><entity name="msdyn_functionallocation"><attribute name="statecode"/><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><filter><condition attribute="msdyn_functionallocationid" operator="in">' + targetSubSiteIds + '</condition></filter><order attribute="msdyn_name" descending="false"/></entity></fetch>';
                                    debugger;
                                    var msgTxt = subCounter + " operations found for the selected site and stakeholder!.";
                                    form.ui.clearFormNotification("hasOperation");
                                    form.ui.setFormNotification(msgTxt, "INFO", "hasOperation"); //INFO

                                    var layoutXml = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="200" /></row></grid>';
                                    form.getControl("ts_subsubsite").addCustomView(viewId, entityName, viewDisplayName, activityTypeFetchXml, layoutXml, true);
                                }
                            }

                            if (checkOtherSubSites) {
                                //No operation found for Sub-subsite
                                form.ui.clearFormNotification("closedSubProject");
                                form.ui.setFormNotification("No operations found matching the selected Subsite, Operation Type and Stakeholder!.", "WARNING", "closedSubProject");//ERROR
                                form.getAttribute("ts_subsubsite").setValue(null);
                                form.getControl('ts_subsubsite').setVisible(false);
                                form.getAttribute("ts_subsubsite").setRequiredLevel("none");//none,required
                            }
                        },
                        function (error) {
                            showErrorMessageAlert(error);
                        }
                    );
                }
                else {
                    form.getAttribute("ts_subsubsite").setValue(null);
                    form.getControl('ts_subsubsite').setVisible(false);
                }
            }
        } catch (e) {
            throw new Error((e as any).Message);
        }
    }
    export function siteOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        try {

            const form = <Form.ts_unplannedworkorder.Main.Information>eContext.getFormContext();
            const operationTypeAttribute = form.getAttribute("ts_operationtype");
            const stakeholderAttribute = form.getAttribute("ts_stakeholder");
            const siteAttribute = form.getAttribute("ts_site");
            const workOrderTypeAttribute = form.getAttribute("ts_workordertype");
            if (siteAttribute != null && siteAttribute != undefined) {
                // Clear out operation and subsite value if not already empty
                if (form.getAttribute("ts_operation").getValue() != null) form.getAttribute("ts_operation").setValue(null);

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
                                    form.getAttribute('ts_operation').setValue(lookup);
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

                    //only retrieve SubSites with Operations under Stakeholders
                    var targetSubSiteIds = "";
                    var checkOtherSubSites = true;
                    const fetchOperationsWithSiteAndStakeholder = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="ovs_operation"><attribute name="ovs_name" /><attribute name="ts_subsite"/><attribute name="ts_subsubsite"/><attribute name="createdon" /><attribute name="ovs_operationtypeid" /><attribute name="ovs_operationid" />     <order attribute="ovs_name" descending="false" /><filter type="and"><condition attribute="statecode" operator="eq" value="0" /><condition attribute="ts_stakeholder" operator="eq" uitype="account" value="' + stakeholderAttributeValue[0].id + '" /> <condition attribute="ts_site" operator="eq"  uitype="msdyn_functionallocation" value="' + siteAttributeValue[0].id + '" /><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeValue[0].id + '"/></filter></entity></fetch>';
                    var encodedFetchXmlOperationsWithSiteAndStakeholder = encodeURIComponent(fetchOperationsWithSiteAndStakeholder);
                    Xrm.WebApi.retrieveMultipleRecords("ovs_operation", "?fetchXml=" + encodedFetchXmlOperationsWithSiteAndStakeholder).then(
                        function success(result) {
                            if (result.entities.length > 0) {
                                var counter = 0;
                                result.entities.forEach(function (item) {
                                    var subSiteId = item["_ts_subsite_value"];
                                    if (subSiteId != undefined) {
                                        targetSubSiteIds += "<value>" + subSiteId + "</value>";
                                        counter++;
                                    }
                                });

                                if (targetSubSiteIds != "") {
                                    checkOtherSubSites = false;
                                    form.getControl('ts_functionallocation').setDisabled(false);
                                    form.getControl('ts_functionallocation').setVisible(true);
                                    form.getAttribute("ts_functionallocation").setRequiredLevel("required");//none,required
                                    var viewId = '{1B59589F-F122-5428-4771-79BC925240C3}';
                                    var entityName = "msdyn_functionallocation";
                                    var viewDisplayName = Xrm.Utility.getResourceString("ts_/resx/UnplannedWorkOrder", "FilteredSites");
                                    var activityTypeFetchXml = '<fetch no-lock="false"><entity name="msdyn_functionallocation"><attribute name="statecode"/><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><filter><condition attribute="msdyn_functionallocationid" operator="in">' + targetSubSiteIds + '</condition></filter><order attribute="msdyn_name" descending="false"/></entity></fetch>';
                                    debugger;
                                    var msgTxt = counter + " operations found for the selected site, operation type and stakeholder!.";
                                    form.ui.clearFormNotification("hasOperation");
                                    form.ui.setFormNotification(msgTxt, "INFO", "hasOperation"); //INFO

                                    var layoutXml = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="200" /></row></grid>';
                                    form.getControl("ts_functionallocation").addCustomView(viewId, entityName, viewDisplayName, activityTypeFetchXml, layoutXml, true);
                                }
                            }
                            if (checkOtherSubSites) {
                                //No operation found
                                form.ui.clearFormNotification("closedProject");
                                //form.ui.setFormNotification("No operations found matching the selected site, operation type and stakeholder!.", "WARNING", "closedProject");//ERROR
                                form.getAttribute("ts_functionallocation").setValue(null);
                                form.getControl('ts_functionallocation').setVisible(false);
                                form.getAttribute("ts_functionallocation").setRequiredLevel("none");//none,required                                
                            }
                        },
                        function (error) {
                            showErrorMessageAlert(error);
                        }
                    );
                }
                else {
                    form.getAttribute("ts_functionallocation").setValue(null);
                    form.getControl('ts_functionallocation').setVisible(false);
                    form.getAttribute("ts_functionallocation").setRequiredLevel("none");//none,required                                
                }
            }
        } catch (e) {
            throw new Error((e as any).Message);
        }
    }

    export function tradenameOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        try {
            const form = <Form.ts_unplannedworkorder.Main.Information>eContext.getFormContext();
            const TradenameAttribute = form.getAttribute("ts_tradename");

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
                            form.getAttribute('ts_stakeholder').setValue(lookup);
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

            const form = <Form.ts_unplannedworkorder.Main.Information>eContext.getFormContext();
            const operationTypeAttribute = form.getAttribute("ts_operationtype");
            const stakeholderAttribute = form.getAttribute("ts_stakeholder");
            const functionalLocationAttribute = form.getAttribute("ts_functionallocation");
            if (functionalLocationAttribute != null && functionalLocationAttribute != undefined) {
                // Clear out operation value if not already empty
                if (form.getAttribute("ts_operation").getValue() != null) form.getAttribute("ts_operation").setValue(null);

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

                                form.getAttribute('ts_operation').setValue(lookup);
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

    //export function systemStatusOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
    //    const form = <Form.ts_unplannedworkorder.Main.Information>eContext.getFormContext();
    //    var newSystemStatus = form.getAttribute("ts_recordstatus").getValue();
    //    //var preparationTime = form.getAttribute("ts_preparationtime").getValue();
    //    //var conductingOversight = form.getAttribute("ts_conductingoversight").getValue();
    //    //var woReportingAndDocumentation = form.getAttribute("ts_woreportinganddocumentation").getValue();
    //    //If user try to cancel Complete WO
    //    if (currentSystemStatus == 690970003 && newSystemStatus == 690970005) {
    //        var alertStrings = {
    //            text: Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "CantCancelText"),
    //        };
    //        var alertOptions = { height: 160, width: 340 };
    //        Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function () { });
    //        form.getAttribute("ts_recordstatus").setValue(currentSystemStatus);
    //    }
    //    else
    //        //If system status is set to closed
    //        if (newSystemStatus == msdyn_wosystemstatus.ClosedInactive || newSystemStatus == msdyn_wosystemstatus.Closed) {
    //            Xrm.WebApi.retrieveMultipleRecords("msdyn_workorderservicetask", "?$select=msdyn_workorder&$filter=statecode eq 0 and msdyn_workorder/msdyn_workorderid eq " + form.data.entity.getId() + " and statuscode ne 918640002 and ts_mandatory eq true").then(function success(result) {
    //                if (result.entities.length > 0) {
    //                    var alertStrings = {
    //                        text: Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "CloseWOWithUnCompletedSTText"),
    //                        title: Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "CloseWOWithUnCompletedSTTitle")
    //                    };
    //                    var alertOptions = { height: 160, width: 340 };
    //                    Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function () { });

    //                    form.getAttribute("ts_recordstatus").setValue(currentSystemStatus);
    //                }
    //                else {
    //                    if (newSystemStatus == msdyn_wosystemstatus.ClosedInactive) {
    //                        var confirmStrings = {
    //                            text: Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "CloseWorkOrderConfirmationText"),
    //                            title: Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "CloseWorkOrderConfirmationTitle")

    //                        };
    //                        var confirmOptions = { height: 200, width: 450 };

    //                        Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
    //                            function (success) {
    //                                if (success.confirmed) {
    //                                    //Set state to Inactive
    //                                    form.getAttribute("statecode").setValue(1);
    //                                    //Set Status Reason to Closed
    //                                    form.getAttribute("statuscode").setValue(918640000);

    //                                    currentSystemStatus = newSystemStatus;
    //                                    //At Transport Canada, Fiscal Years run from Apr 1st to Mar 31, Q1 = Apr-Jun, Q2 = Jul-Sept, Q3 = Oct-Dec, Q4 = Jan-Mar
    //                                    var currentQuarter = Math.floor(new Date().getMonth() / 3);
    //                                    if (currentQuarter == 0) {
    //                                        currentQuarter = 4;
    //                                    }
    //                                    form.getAttribute("ts_completedquarter").setValue(717750000 + currentQuarter);
    //                                    form.getControl("ts_completedquarter").setVisible(true);
    //                                } else {
    //                                    //Undo the system status change
    //                                    form.getAttribute("msdyn_systemstatus").setValue(currentSystemStatus);
    //                                }
    //                            });
    //                    }
    //                    else {
    //                        //At Transport Canada, Fiscal Years run from Apr 1st to Mar 31, Q1 = Apr-Jun, Q2 = Jul-Sept, Q3 = Oct-Dec, Q4 = Jan-Mar
    //                        var currentQuarter = Math.floor(new Date().getMonth() / 3);
    //                        if (currentQuarter == 0) {
    //                            currentQuarter = 4;
    //                        }
    //                        form.getAttribute("ts_completedquarter").setValue(717750000 + currentQuarter);
    //                        form.getControl("ts_completedquarter").setVisible(true);
    //                    }
    //                    //if (preparationTime == null || woReportingAndDocumentation == null || conductingOversight == null) {
    //                    //    var alertStrings = {
    //                    //        text: Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "CloseWOWithoutTimeTrackingFieldsText"),
    //                    //        title: Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "CloseWOWithoutTimeTrackingFieldsTitle")
    //                    //    };
    //                    //    var alertOptions = { height: 160, width: 340 };
    //                    //    Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function () {
    //                    //        form.getAttribute("msdyn_systemstatus").setValue(currentSystemStatus);

    //                    //        //All required time tracking fields must be input before the Work order can be closed.
    //                    //        form.getAttribute("ts_preparationtime").setRequiredLevel("required");
    //                    //        form.getAttribute("ts_conductingoversight").setRequiredLevel("required");
    //                    //        form.getAttribute("ts_woreportinganddocumentation").setRequiredLevel("required");
    //                    //    });
    //                    //}
    //                    //else {
    //                    form.getControl("msdyn_workordertype").setDisabled(true);
    //                    form.getControl("ts_region").setDisabled(true);
    //                    form.getControl("ts_operationtype").setDisabled(true);
    //                    //form.getControl("ts_tradenameid").setDisabled(true);
    //                    form.getControl("ts_site").setDisabled(true);
    //                    form.getControl("msdyn_worklocation").setDisabled(true);
    //                    form.getControl("header_ownerid").setDisabled(true);
    //                    form.getControl("ownerid").setDisabled(true);
    //                    //       }

    //                }

    //            }, function (error) {
    //                showErrorMessageAlert(error);
    //            });

    //        }
    //        else {
    //            if (newSystemStatus == 690970005 && currentSystemStatus != 690970003 && userHasRole("System Administrator|ROM - Business Admin|ROM - Planner")) {
    //                var confirmStrings = {
    //                    text: Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "CancelWorkOrderConfirmationText"),
    //                    title: Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "CancelWorkOrderConfirmationTitle")

    //                };
    //                var confirmOptions = { height: 200, width: 450 };

    //                Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
    //                    function (success) {
    //                        if (success.confirmed) {
    //                            //Set state to Inactive
    //                            form.getAttribute("statecode").setValue(1);
    //                            //Set Status Reason to Closed
    //                            form.getAttribute("statuscode").setValue(918640000);
    //                            currentSystemStatus = newSystemStatus;
    //                            //Set visible canceled inspection justification field
    //                            form.getControl("ts_canceledinspectionjustification").setVisible(true);
    //                            form.getAttribute("ts_canceledinspectionjustification").setRequiredLevel("required");
    //                        } else {
    //                            //Undo the system status change
    //                            form.getAttribute("msdyn_systemstatus").setValue(currentSystemStatus);
    //                        }
    //                    });

    //            }
    //            else {
    //                //Keep record Active
    //                form.getAttribute("statecode").setValue(0);
    //                form.getAttribute("statuscode").setValue(1);
    //                form.getControl("ts_canceledinspectionjustification").setVisible(false);
    //                form.getControl("ts_canceledinspectionjustification").setVisible(false);
    //                form.getAttribute("ts_canceledinspectionjustification").setRequiredLevel("none");
    //                currentSystemStatus = newSystemStatus;

    //            }

    //            form.getControl("msdyn_workordertype").setDisabled(false);
    //            form.getControl("ts_region").setDisabled(false);
    //            form.getControl("ts_operationtype").setDisabled(false);
    //            //form.getControl("ts_tradenameid").setDisabled(false);
    //            form.getControl("ts_site").setDisabled(false);
    //            form.getControl("msdyn_worklocation").setDisabled(false);
    //            form.getControl("header_ownerid").setDisabled(false);
    //            form.getControl("ownerid").setDisabled(false);

    //            //form.getAttribute("ts_preparationtime").setRequiredLevel("none");
    //            //form.getAttribute("ts_conductingoversight").setRequiredLevel("none");
    //            //form.getAttribute("ts_woreportinganddocumentation").setRequiredLevel("none");
    //        }
    //}

    export function caseOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_unplannedworkorder.Main.Information>eContext.getFormContext();

        const caseAttribute = form.getAttribute("ts_stakeholder");

        if (caseAttribute.getValue() == null) {
            form.getControl("ts_region").setDisabled(false);
            form.getControl("ts_country").setDisabled(false);
            //form.getControl("ts_tradenameid").setDisabled(false);
            form.getControl("ts_stakeholder").setDisabled(false);
            form.getControl("ts_site").setDisabled(false);
        }
    }

    //export function stateCodeOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
    //    const form = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();
    //    var stateCode = form.getAttribute("statecode").getValue();
    //    //If statecode changed to Active
    //    if (stateCode == 0) {
    //        var systemStatus = form.getAttribute("msdyn_systemstatus").getValue();
    //        //If systemStatus is currently Closed
    //        if (systemStatus == 690970004 || systemStatus == 690970005) {

    //            // taken out because we don't use 'Completed' as a WO System Status
    //            //Change systemstatus to Open - Completed
    //            //form.getAttribute("msdyn_systemstatus").setValue(690970003);
    //            //Prevent User from discarding status change
    //            form.data.save();
    //        }
    //    }
    //}

    //export function updateCaseView(eContext: Xrm.ExecutionContext<any, any>): void {
    //    try {

    //        const form = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();
    //        const caseAttribute = form.getAttribute("msdyn_servicerequest");
    //        const regionAttribute = form.getAttribute("ts_region");
    //        const countryAttribute = form.getAttribute("ts_country");
    //        const stakeholderAttribute = form.getAttribute("msdyn_serviceaccount");
    //        const siteAttribute = form.getAttribute("ts_site");

    //        const caseAttributeValue = caseAttribute.getValue();
    //        const regionAttributeValue = regionAttribute.getValue();
    //        const countryAttributeValue = countryAttribute.getValue();
    //        const stakeholderAttributeValue = stakeholderAttribute.getValue();
    //        const siteAttributeValue = siteAttribute.getValue();

    //        var regionCondition = regionAttributeValue == null ? "" : '<condition attribute="ovs_region" operator="eq" value="' + regionAttributeValue[0].id + '" />';
    //        var countryCondition = getCountryFetchXmlCondition(form);
    //        var stakeholderCondition = stakeholderAttributeValue == null ? "" : '<condition attribute="customerid" operator="eq" value="' + stakeholderAttributeValue[0].id + '" />';
    //        var siteCondition = siteAttributeValue == null ? "" : '<condition attribute="msdyn_functionallocation" operator="eq" value="' + siteAttributeValue[0].id + '" />';

    //        if (caseAttribute != null && caseAttribute != undefined) {
    //            if (caseAttributeValue != null) {
    //                Xrm.WebApi.retrieveRecord("incident", caseAttributeValue[0].id.replace(/({|})/g, ''), "?$select=_ovs_region_value, _ts_country_value, _customerid_value, _msdyn_functionallocation_value").then(
    //                    function success(result) {
    //                        if ((regionCondition != "" && (result != null && regionAttributeValue != null && regionAttributeValue[0].id.replace(/({|})/g, '') != result._ovs_region_value?.toUpperCase())) ||
    //                            (countryCondition != "" && (result != null && countryAttributeValue != null && countryAttributeValue[0].id.replace(/({|})/g, '') != result._ts_country_value?.toUpperCase())) ||
    //                            (stakeholderCondition != "" && (result != null && stakeholderAttributeValue != null && stakeholderAttributeValue[0].id.replace(/({|})/g, '') != result._customerid_value?.toUpperCase())) ||
    //                            (siteCondition != "" && (result != null && siteAttributeValue != null && siteAttributeValue[0].id.replace(/({|})/g, '') != result._msdyn_functionallocation_value?.toUpperCase()))) {

    //                            form.getAttribute("msdyn_servicerequest").setValue(null);
    //                        }
    //                    },
    //                    function (error) {
    //                        showErrorMessageAlert(error);
    //                    }
    //                );
    //            }

    //            // Setup a custom view
    //            // This value is never saved and only needs to be unique among the other available views for the lookup.
    //            const viewId = '{5B58559F-F162-5428-4771-79BC825240B3}';
    //            const entityName = "incident";
    //            const viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredCases");
    //            const fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"> <entity name="incident"> <attribute name="ticketnumber" /> <attribute name="incidentid" /> <order attribute="ticketnumber" descending="false" /> <filter type="and">' + regionCondition + countryCondition + stakeholderCondition + siteCondition + ' </filter> </entity> </fetch>';
    //            const layoutXml = '<grid name="resultset" object="10010" jump="title" select="1" icon="1" preview="1"><row name="result" id="incidentid"><cell name="title" width="200" /></row></grid>';
    //            form.getControl("msdyn_servicerequest").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
    //        }

    //    } catch (e) {
    //        throw new Error((e as any).Message);
    //    }
    //}

    //export function revisedQuarterOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
    //    const form = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();

    //    const revisedQuarterAttribute = form.getAttribute("ovs_revisedquarterid");
    //    const currentFiscalQuarterAttribute = form.getAttribute("ovs_currentfiscalquarter");
    //    const plannedFiscalQuarterAttribute = form.getAttribute("ovs_fiscalquarter");

    //    const revisedQuarterAttributeValue = revisedQuarterAttribute.getValue();
    //    const currentFiscalQuarterAttributeValue = currentFiscalQuarterAttribute.getValue();
    //    const plannedFiscalQuarterAttributeValue = plannedFiscalQuarterAttribute.getValue();

    //    if (revisedQuarterAttributeValue != null) {
    //        currentFiscalQuarterAttribute.setValue(revisedQuarterAttributeValue);
    //    }
    //    else {
    //        if (plannedFiscalQuarterAttribute != null) {
    //            currentFiscalQuarterAttribute.setValue(plannedFiscalQuarterAttributeValue);
    //        }
    //        else {
    //            currentFiscalQuarterAttribute.setValue(null);
    //        }
    //    }
    //}

    //export function dateWindowEndOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
    //    const form = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();
    //    const dateWindowEndValue = form.data.entity.attributes.get("msdyn_datewindowend").getValue()
    //    const fiscalQuarterAttribute = form.data.entity.attributes.get("ovs_fiscalquarter");

    //    var fetchXml = `<fetch distinct="false" mapping="logical" output-format="xml-platform" version="1.0"> <entity name="tc_tcfiscalquarter"> <attribute name="tc_name"/> <attribute name="tc_tcfiscalquarterid"/> <attribute name="tc_tcfiscalyearid"/> <filter type="and"> <condition operator="this-fiscal-year" attribute = "tc_quarterstart"/> </filter> </entity> </fetch>`;
    //    fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
    //    Xrm.WebApi.retrieveMultipleRecords("tc_tcfiscalquarter", fetchXml).then(
    //        function success(result) {
    //            if (result.entities.length > 0) {
    //                if (dateWindowEndValue != null) {
    //                    var m = Math.floor(dateWindowEndValue.getMonth() / 3);
    //                    const lookup = new Array();
    //                    lookup[0] = new Object();
    //                    lookup[0].id = result.entities[m].tc_tcfiscalquarterid;
    //                    lookup[0].name = result.entities[m].tc_name;
    //                    lookup[0].entityType = 'tc_tcfiscalquarter';
    //                    fiscalQuarterAttribute.setValue(lookup);
    //                }
    //            }
    //        },
    //        function (error) {
    //        }
    //    );

    //}

    export function scheduledQuarterOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_unplannedworkorder.Main.Information>eContext.getFormContext();
        const revisedQuarterAttributeValue = form.getAttribute("ts_revisedquarterid").getValue();
        scheduledQuarterAttributeValueChanged = true;
        if (revisedQuarterAttributeValue != null) {
            form.getControl("ts_scheduledquarterjustification").setVisible(true);
            form.getControl("ts_scheduledquarterjustificationcomment").setVisible(true);
        }
        else {
            form.getControl("ts_scheduledquarterjustification").setVisible(false);
            form.getControl("ts_scheduledquarterjustificationcomment").setVisible(false);
        }
    }

    //Sets the Scheduled Quarter filter to show quarters in the planned fiscal year and the year after
    export function setScheduledQuarterFilter(form: Form.ts_unplannedworkorder.Main.Information): void {
        //Get name of planned fiscal year
        const fiscalYearValue = form.getAttribute("ts_plannedfiscalquarter").getValue();
        if (fiscalYearValue != null) {
            const fiscalYearName = fiscalYearValue[0].name;
            if (fiscalYearName != null) {
                const nextFiscalYearName = fiscalYearName.split("-")[1] + "-" + (Number(fiscalYearName.split("-")[1]) + 1);
                const viewId = '{8982C38D-8BB4-4C95-BD05-493398F' + Date.now().toString().slice(-5) + '}'; //If this function is called again, this guid needs to be unique
                const entityName = "tc_tcfiscalquarter";
                const viewDisplayName = "Fiscal Quarters";

                //All Active Stakeholders/Accounts that have an Operation with a matching Operation Type
                var fetchXml = [
                    "<fetch>",
                    "  <entity name='tc_tcfiscalquarter'>",
                    "    <attribute name='tc_name'/>",
                    "    <attribute name='tc_tcfiscalyearid'/>",
                    "    <order attribute='tc_tcfiscalyearid'/>",
                    "    <link-entity name='tc_tcfiscalyear' from='tc_tcfiscalyearid' to='tc_tcfiscalyearid' alias='fiscalyear'>",
                    "      <attribute name='tc_fiscalyearlonglbl'/>",
                    "      <filter type='or'>",
                    "        <condition attribute='tc_name' operator='eq' value='", fiscalYearName, "'/>",
                    "        <condition attribute='tc_name' operator='eq' value='", nextFiscalYearName, "'/>",
                    "      </filter>",
                    "    </link-entity>",
                    "  </entity>",
                    "</fetch>"
                ].join("");
                const layoutXml = '<grid name="resultset" jump="tc_name" select="1" icon="1" preview="1"> <row name="result" id="fiscalquarterid"> <cell name="tc_name" width="100" />< cell name = "fiscalyear.tc_fiscalyearlonglbl" width = "167" /></row> </grid>';
                form.getControl("ts_revisedquarterid").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
            }
        }
    }

    // FUNCTIONS
    function postNoteOnScheduledQuarterChange(form: Form.msdyn_workorder.Main.ROMOversightActivity): void {
        if (scheduledQuarterAttributeValueChanged) {
            const revisedQuarterAttributeValue = form.getAttribute("ovs_revisedquarterid").getValue();
            const justification = form.getAttribute("ts_scheduledquarterjustification").getValue();
            var justificationValue;
            const justificationComment = form.getAttribute("ts_justificationcomment").getValue();

            if (form.ui.getFormType() == 2) {
                let recordId = form.data.entity.getId().replace(/[{}]/g, "");
                var data = {};
                data['objectid_msdyn_workorder@odata.bind'] = '/msdyn_workorders(' + recordId + ')';
                if (revisedQuarterAttributeValue != null) {
                    data['subject'] = "Scheduled Quarter changed to: " + revisedQuarterAttributeValue[0].name;
                }
                else {
                    data['subject'] = "Scheduled Quarter changed to null ";
                }

                if (justification != null) {
                    justificationValue = justification[0].name;
                }
                else {
                    justificationValue = "null";
                }
                data['notetext'] = "Justification changed to: " + justificationValue + " <br />Justification Comment: " + justificationComment;

                //form.getAttribute("ts_scheduledquarterjustification").setValue(null);
                //form.getAttribute("ts_justificationcomment").setValue(null);

                Xrm.WebApi.createRecord('annotation', data).then(function success(result) {
                    scheduledQuarterAttributeValueChanged = false;
                },
                    function (error) {
                        console.log(error.message);
                    });
            }
        }
    }

    function showErrorMessageAlert(error) {
        var alertStrings = { text: error.message };
        var alertOptions = { height: 120, width: 260 };
        Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function () { });
    }

    function setDefaultFiscalYear(form: Form.ts_unplannedworkorder.Main.Information): void {
        XrmQuery.retrieveMultiple((x) => x.tc_tcfiscalyears)
            .select((x) => [x.tc_name])
            .filter((x) => Filter.equals(x.tc_iscurrentfiscalyear, true))
            .execute((fiscalYears) => {
                // There are 2 records: one year fiscal year and five year fiscal year.
                if (!fiscalYears || fiscalYears.length === 0) {
                    return; // nothing to set
                }

                // set to one year fiscal year.
                const targetedFiscalYear = fiscalYears[0];
                const lookup = new Array();
                lookup[0] = new Object();
                lookup[0].id = targetedFiscalYear.tc_tcfiscalyearid;
                lookup[0].name = targetedFiscalYear.tc_name;
                lookup[0].entityType = 'tc_tcfiscalyear';

                form.getAttribute('ts_plannedfiscalyear').setValue(lookup);

            });
    }

    function removeSelectedFiscalQuarter(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_unplannedworkorder.Main.Information>eContext.getFormContext();
        form.getAttribute('ts_plannedfiscalquarter').setValue(null);
    }

    function setRegion(form: Form.ts_unplannedworkorder.Main.Information): void {
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
                                    //form.getControl("ts_operationtype").setDisabled(true);
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

    function setActivityTypeFilteredView(form: Form.ts_unplannedworkorder.Main.Information, operationAttributeId: string, workOrderTypeAttributeId: string, operationTypeAttributeId: string): void {

        // Check whether this is an AvSec WO by using the operation type's owning BU (via GUID, not name)
        const operationTypeIdClean = operationTypeAttributeId ? operationTypeAttributeId.replace(/[{}]/g, "") : "";

        if (!operationTypeIdClean) {
            return;
        }

        Xrm.WebApi.retrieveRecord("ovs_operationtype", operationTypeIdClean, "?$select=_owningbusinessunit_value")
            .then(async function success(operationType) {
                let operationActivityFilter = "";

                if (!isFromSecurityIncident && operationType && operationType._owningbusinessunit_value) {
                    const owningBuId = operationType._owningbusinessunit_value;
                    const isAvSec = await isAvSecBU(owningBuId);

                    if (isAvSec) { // Add the operation activity filter if it's an AvSec workorder
                        operationActivityFilter += "<link-entity name='ts_operationactivity' from='ts_activity' to='msdyn_incidenttypeid' link-type='inner'><filter><condition attribute='ts_operation' operator='eq' value='" + operationAttributeId + "'/><condition attribute='ts_operationalstatus' operator='eq' value='717750000'/></filter></link-entity>";
                    }
                }

                let fetchXmlActivity = "";
                const viewIdActivity = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F661}';
                const entityNameActivity = "msdyn_incidenttype";
                const viewDisplayNameActivity = Xrm.Utility.getResourceString("ts_/resx/UnplannedWorkOrder", "FilteredActivityType");
                const layoutXmlActivity = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_incidenttypeid"><cell name="msdyn_name" width="200" /></row></grid>';

                if (!isFromCase) {
                    fetchXmlActivity = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="msdyn_incidenttype"><attribute name="msdyn_name" /><attribute name="msdyn_incidenttypeid" /><order attribute="msdyn_name" descending="false" /><filter type="and"><condition attribute="msdyn_defaultworkordertype" operator="eq" uiname="Inspection" uitype="msdyn_workordertype" value="' + workOrderTypeAttributeId + '" /><condition attribute="statecode" operator="eq" value="0" /></filter><link-entity name="ts_ovs_operationtypes_msdyn_incidenttypes" from="msdyn_incidenttypeid" to="msdyn_incidenttypeid" visible="false" intersect="true"><link-entity name="ovs_operationtype" from="ovs_operationtypeid" to="ovs_operationtypeid" alias="ab"><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeId + '" /></filter></link-entity></link-entity>' + operationActivityFilter + '</entity></fetch>';
                }

                form.getControl("ts_primaryincidenttype").addCustomView(viewIdActivity, entityNameActivity, viewDisplayNameActivity, fetchXmlActivity, layoutXmlActivity, true);
                form.getControl("ts_primaryincidenttype").setDisabled(false);
            })
            .catch(function (error) {
                showErrorMessageAlert(error);
            });
    }

    function setCountryFilteredView(form: Form.ts_unplannedworkorder.Main.Information): void {
        form.getControl("ts_country").setVisible(true);
        form.getAttribute("ts_country").setRequiredLevel("required");

        const viewId = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F662}';
        const entityName = "tc_country";
        const viewDisplayName = Xrm.Utility.getResourceString("ts_/resx/UnplannedWorkOrder", "FilteredCountries");
        const fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"><entity name="tc_country"><attribute name="tc_countryid"/><attribute name="tc_name"/><filter><condition attribute="tc_countrynameenglish" operator="ne" value="CANADA" /></filter><order attribute="tc_name" descending="false" /><link-entity name="msdyn_functionallocation" from="ts_country" to="tc_countryid" link-type="inner" alias="ag"><link-entity name="ovs_operation" from="ts_site" to="msdyn_functionallocationid" link-type="inner" alias="ah" /></link-entity></entity></fetch>';
        const layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="tc_countryid"><cell name="tc_name" width="200" /></row></grid>';
        form.getControl("ts_country").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
    }

    function setOperationTypeFilteredView(form: Form.ts_unplannedworkorder.Main.Information, regionAttributeId: string, countryCondition: string, workOrderTypeAttributeId: string, stakeholderTypeAttributeId: string, siteAttributeId: string): void {
        form.getControl("ts_operationtype").setDisabled(false);

        const viewId = '{8982C38D-8BB4-4C95-BD05-493398FEAE99}';
        const entityName = "ovs_operationtype";
        const viewDisplayName = Xrm.Utility.getResourceString("ts_/resx/UnplannedWorkOrder", "FilteredOperationTypes");
        const fetchXml = (isFromCase && stakeholderTypeAttributeId != "" && siteAttributeId != "") ? '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"> <entity name="ovs_operationtype"> <attribute name="ovs_operationtypeid" /> <attribute name="ovs_name" /> <attribute name="createdon" /> <filter type="and"><condition attribute="statecode" operator="eq" value="0"/></filter> <order attribute="ovs_name" descending="false" /> <link-entity name="ts_ovs_operationtypes_msdyn_incidenttypes" from="ovs_operationtypeid" to="ovs_operationtypeid" visible="false" intersect="true"> <link-entity name="msdyn_incidenttype" from="msdyn_incidenttypeid" to="msdyn_incidenttypeid" alias="ah"> <filter type="and"> <condition attribute="msdyn_defaultworkordertype" operator="eq" value="' + workOrderTypeAttributeId + '" /> </filter> </link-entity> </link-entity> <link-entity name="ovs_operation" from="ovs_operationtypeid" to="ovs_operationtypeid" link-type="inner" alias="ai"> <filter type="and"><condition attribute="ts_operationalstatus" operator="ne" value="717750001" /><condition attribute="ts_stakeholder" operator="eq" value="' + stakeholderTypeAttributeId + '" /></filter> <link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="ts_site" link-type="inner" alias="aj"> <filter type="and"> <condition attribute="ts_region" operator="eq" value="' + regionAttributeId + '" />' + countryCondition + '<condition attribute="msdyn_functionallocationid" operator="eq" value="' + siteAttributeId + '" /> </filter> </link-entity> </link-entity> </entity> </fetch>' : '<fetch distinct="true" page="1"><entity name="ovs_operationtype"><attribute name="statecode"/><attribute name="ovs_operationtypeid"/><attribute name="ovs_name"/><attribute name="createdon"/><filter type="and"><condition attribute="statecode" operator="eq" value="0"/></filter><link-entity name="ts_ovs_operationtypes_msdyn_incidenttypes" from="ovs_operationtypeid" to="ovs_operationtypeid" visible="false" intersect="true"><link-entity name="msdyn_incidenttype" from="msdyn_incidenttypeid" to="msdyn_incidenttypeid" alias="ad"><filter type="and"><condition attribute="msdyn_defaultworkordertype" operator="eq" value="' + workOrderTypeAttributeId + '" /></filter></link-entity></link-entity><link-entity name="ovs_operation" from="ovs_operationtypeid" to="ovs_operationtypeid" link-type="inner" alias="ae"><link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="ts_site" link-type="inner" alias="af"><filter type="and"><condition attribute="ts_region" operator="eq" value="' + regionAttributeId + '" />' + countryCondition + '</filter></link-entity></link-entity></entity></fetch>';
        const layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="ovs_operationtypeid"><cell name="ovs_name" width="200" /></row></grid>';
        form.getControl("ts_operationtype").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
    }

    //function setTradeViewFilteredView(form: Form.msdyn_workorder.Main.ROMOversightActivity, regionAttributeId: string, countryCondition: string, workOrderTypeAttributeId: string, stakeholderTypeAttributeId: string, siteAttributeId: string, operationTypeAttributeId): void {
    //    // Enable direct dependent field
    //    form.getControl("ts_tradenameid").setDisabled(false);

    //    const viewIdTradename = '{1c259fee-0541-4cac-8d20-7b30ee398065}';
    //    const entityNameTradename = "ts_tradename";
    //    const viewDisplayNameTradename = "FilteredSTradenames";
    //    const fetchXmlTradename = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" returntotalrecordcount="true" page="1" no-lock="false"><entity name="ts_tradename" ><attribute name="ts_tradenameid" /><attribute name="ts_name" /><order attribute="ts_stakeholderidname" /><order attribute="ts_name" /><link-entity name="account" from="accountid" to="ts_stakeholderid" ><filter type="and"><condition attribute="ts_stakeholderstatus" operator="ne" value="717750001" /></filter><link-entity name="ovs_operation" from="ts_stakeholder" to="accountid" link-type="inner" alias="ac"><filter type="and"><condition attribute="ts_operationtype" operator="eq" value="' + operationTypeAttributeId + '"/><condition attribute="ts_operationalstatus" operator="eq" value="717750000"/></filter><link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="ts_site" link-type="inner" alias="ad"><filter type="and"><condition attribute="ts_region" operator="eq" value="' + regionAttributeId + '"/>' + countryCondition + '</filter></link-entity></link-entity></link-entity></entity></fetch>';
    //    const layoutXmlTradename = '<grid name="resultset" object="10010" jump="ts_name" select="1" icon="1" preview="1"><row name="result" id="ts_tradenameid"><cell name="ts_name" width="200" /></row></grid>';
    //    form.getControl("ts_tradenameid").addCustomView(viewIdTradename, entityNameTradename, viewDisplayNameTradename, fetchXmlTradename, layoutXmlTradename, true);
    //}

    function setSiteFilteredView(form: Form.ts_unplannedworkorder.Main.Information, regionAttributeId: string, countryCondition: string, workOrderTypeAttributeId: string, stakeholderTypeAttributeId: string, siteAttributeId: string, operationTypeAttributeId): void {
        // Enable direct dependent field
        form.getControl("ts_site").setDisabled(false);

        // Custom view
        const viewId = '{6E57251F-F695-4076-9498-49AB892154B7}';
        const entityName = "msdyn_functionallocation";
        const viewDisplayName = Xrm.Utility.getResourceString("ts_/resx/UnplannedWorkOrder", "FilteredSites");
        const fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" returntotalrecordcount="true" page="1" count="25" no-lock="false"><entity name="msdyn_functionallocation"><attribute name="statecode"/><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><filter>' + countryCondition + '</filter><filter><condition attribute="ts_region" operator="eq" value="' + regionAttributeId + '"/></filter><filter><condition attribute="ts_sitestatus" operator="ne" value="717750001" /></filter><order attribute="msdyn_name" descending="false"/><link-entity name="ovs_operation" from="ts_site" to="msdyn_functionallocationid"><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value=" ' + operationTypeAttributeId + '"/><condition attribute="ts_stakeholder" operator="eq" value="' + stakeholderTypeAttributeId + '"/><condition attribute="ts_operationalstatus" operator="eq" value="717750000"/></filter></link-entity></entity></fetch>';
        const layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="200" /></row></grid>';
        form.getControl("ts_site").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
    }

    //function setIncompleteWorkOrderReasonFilteredView(form: Form.msdyn_workorder.Main.ROMOversightActivity): void {
    //    //Find out if the Work Order Type belongs to ISSO or AvSec
    //    let selectedOperationTypeId = form.getAttribute("ts_operationtype").getValue();

    //    let ownerId;

    //    if (selectedOperationTypeId != null && selectedOperationTypeId != undefined) {
    //        Xrm.WebApi.retrieveRecord("ovs_operationtype", selectedOperationTypeId[0].id.replace(/({|})/g, ''), undefined).then(
    //            function success(result) {
    //                ownerId = result._ownerid_value;

    //                //Now filter the lookup
    //                if (ownerId != null) {
    //                    form.getControl("ts_incompleteworkorderreason").setDisabled(false);

    //                    const viewId = '{736A4E08-E24F-4961-ADB4-BBAAB4119EE0}';

    //                    //Keep the option to select 'Other' available no matter who the Work Order Type belongs to
    //                    const otherId = '8B3B6A28-C5FB-EC11-82E6-002248AE441F';
    //                    const entityName = "ts_incompleteworkorderreason";
    //                    const viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredIncompleteWorkOrderReasons");
    //                    const fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" returntotalrecordcount="true" page="1" count="25" no-lock="false"><entity name="ts_incompleteworkorderreason"><attribute name="ts_incompleteworkorderreasonid" /><attribute name="ts_name" /><filter type="or"><condition attribute="ownerid" operator="eq" value="' + ownerId + '" /><condition attribute="ts_incompleteworkorderreasonid" operator="eq" value="' + otherId + '" /></filter><order attribute="ts_name" /></entity></fetch>';
    //                    const layoutXml = '<grid name="resultset" object="10010" jump="ts_name" select="1" icon="1" preview="1"><row name="result" id="ts_incompleteworkorderreasonid"><cell name="ts_name" width="200" /></row></grid>';
    //                    form.getControl("ts_incompleteworkorderreason").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
    //                }
    //            },
    //            function (error) {
    //            }
    //        );
    //    }
    //}

    function getCountryFetchXmlCondition(form: Form.ts_unplannedworkorder.Main.Information) {
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

    //function closeWorkOrderServiceTasks(formContext: Form.msdyn_workorder.Main.ROMOversightActivity, workOrderServiceTaskData: any) {
    //    Xrm.WebApi.retrieveMultipleRecords("msdyn_workorderservicetask", `?$select=msdyn_workorder&$filter=msdyn_workorder/msdyn_workorderid eq ${formContext.data.entity.getId()}`).then(
    //        function success(result) {
    //            for (var i = 0; i < result.entities.length; i++) {
    //                Xrm.WebApi.updateRecord("msdyn_workorderservicetask", result.entities[i].msdyn_workorderservicetaskid, workOrderServiceTaskData).then(
    //                    function success(result) {
    //                        //work order service task closed successfully
    //                    },
    //                    function (error) {
    //                        showErrorMessageAlert(error);
    //                    }
    //                );
    //            }
    //        },
    //        function (error) {
    //            showErrorMessageAlert(error);
    //        }
    //    );
    //}

    //function setWorkOrderServiceTasksView(form: Form.ts_unplannedworkorder.Main.Information, active: boolean) {
    //    var workOrderView;

    //    if (active) {
    //        workOrderView =
    //        {
    //            entityType: "savedquery",
    //            id: "{C9FD8F4D-8184-4DDB-A31A-89E66E8E710E}",
    //            name: "Active Work Order Service Tasks"
    //        }
    //    }
    //    else {
    //        workOrderView =
    //        {
    //            entityType: "savedquery",
    //            id: "{2F145106-BCB3-4F0F-9D02-E8C3B6BB25E8}",
    //            name: "Inactive Work Order Service Tasks"
    //        };
    //    }

    //    if (form.getControl("workorderservicetasksgrid").getViewSelector().getCurrentView() != workOrderView) {
    //        form.getControl("workorderservicetasksgrid").getViewSelector().setCurrentView(workOrderView);
    //    }
    //}

    //function setCantCompleteinspectionVisibility(form: Form.msdyn_workorder.Main.ROMOversightActivity): void {
    //    const systemStatus = form.getAttribute("msdyn_systemstatus").getValue();
    //    let plannedFiscalQuarter = form.getAttribute("ovs_fiscalquarter").getValue();
    //    let validWorkOrderStatus = false;

    //    if (systemStatus != null && (systemStatus == msdyn_wosystemstatus.New || systemStatus == msdyn_wosystemstatus.Scheduled || systemStatus == msdyn_wosystemstatus.InProgress)) {
    //        validWorkOrderStatus = true;
    //    }

    //    if (plannedFiscalQuarter != null) {

    //        //fetch the end date of the Planned Fiscal Quarter
    //        Xrm.WebApi.retrieveRecord("tc_tcfiscalquarter", plannedFiscalQuarter[0].id.replace(/({|})/g, ''), "?$select=tc_quarterend").then(
    //            function success(result) {

    //                let currentDateTime = new Date();

    //                let quarterendDate = new Date(result.tc_quarterend);

    //                //if we are past the end date of the quarter and have a valid work order status, make the Can't Complete Inspection visible, otherwise hide it
    //                if (quarterendDate < currentDateTime && validWorkOrderStatus) {
    //                    setCantCompleteInspectionControlsVisibility(form, true);
    //                }
    //                else {
    //                    //Hide the Can't Complete Inspection if there is no Planned Fiscal Quarter set
    //                    setCantCompleteInspectionControlsVisibility(form, false);
    //                }
    //            },
    //            function (error) {
    //                setCantCompleteInspectionControlsVisibility(form, false);
    //                showErrorMessageAlert("Error fetching the end date of the Planned Fiscal Quarter: " + error);
    //            }
    //        );
    //    }
    //    else {
    //        //Hide the Can't Complete Inspection if there is no Planned Fiscal Quarter set
    //        setCantCompleteInspectionControlsVisibility(form, false);
    //    }
    //}

    //function setCantCompleteInspectionControlsVisibility(form: Form.msdyn_workorder.Main.ROMOversightActivity, visibility: boolean): void {
    //    let cantCompleteInspectionSelection = form.getAttribute("ts_cantcompleteinspection").getValue();

    //    if (visibility == true) {
    //        form.getControl("ts_cantcompleteinspection").setVisible(visibility);

    //        if (cantCompleteInspectionSelection == true) {
    //            var reason = form.getAttribute("ts_incompleteworkorderreason").getValue();

    //            form.getControl("ts_incompleteworkorderreason").setVisible(visibility);

    //            if (reason != null) {
    //                //Determine if 'Other' is selected - if it is show the reason for other
    //                if (reason[0].id == "{8B3B6A28-C5FB-EC11-82E6-002248AE441F}") {
    //                    form.getControl("ts_incompleteworkorderreasonforother").setVisible(true);
    //                } else {
    //                    form.getControl("ts_incompleteworkorderreasonforother").setVisible(false);
    //                }
    //            } else {
    //                form.getControl("ts_incompleteworkorderreasonforother").setVisible(false);
    //            }
    //        }
    //        else {
    //            form.getControl("ts_incompleteworkorderreason").setVisible(false);
    //            form.getControl("ts_incompleteworkorderreasonforother").setVisible(false);
    //            form.getAttribute("ts_cantcompleteinspection").setValue(false);
    //            form.getAttribute("ts_incompleteworkorderreason").setValue(null);
    //            form.getAttribute("ts_incompleteworkorderreasonforother").setValue(null);
    //        }
    //    }
    //    else {
    //        form.getControl("ts_cantcompleteinspection").setVisible(visibility);
    //        form.getControl("ts_incompleteworkorderreason").setVisible(visibility);
    //        form.getControl("ts_incompleteworkorderreasonforother").setVisible(visibility);
    //        form.getAttribute("ts_cantcompleteinspection").setValue(false);
    //        form.getAttribute("ts_incompleteworkorderreason").setValue(null);
    //        form.getAttribute("ts_incompleteworkorderreasonforother").setValue(null);
    //    }
    //}

    //Checks if the Activity Type should have been able to be changed
    //Puts old value in and locks the control if it shouldn't have been able to be changed
    //This is needed when a service task is changed to in-progress and the work order form remained open.
    export function activityTypeOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_unplannedworkorder.Main.Information>eContext.getFormContext();
        if (formContext.ui.getFormType() == 1) {
            var activityTypeValue = formContext.getAttribute("ts_primaryincidenttype").getValue();
            //if (activityTypeValue != null) {
            //    Xrm.WebApi.retrieveRecord('msdyn_incidenttype', activityTypeValue[0].id, '?$select=ts_preparationtime,ts_conductingoversight,ts_reportinganddocumentation').then(
            //        function success(result) {
            //            formContext.getAttribute("ts_preparationtime").setValue(result.ts_preparationtime);
            //            formContext.getAttribute("ts_conductingoversight").setValue(result.ts_conductingoversight);
            //            formContext.getAttribute("ts_woreportinganddocumentation").setValue(result.ts_reportinganddocumentation);
            //        }
            //    );
            //}
        }
        else {

            const workOrderId = formContext.data.entity.getId();
            const activityTypeControl = formContext.getControl("ts_primaryincidenttype");
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
                            formContext.getAttribute("ts_primaryincidenttype").setValue([{
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

            const operation = formContext.getAttribute("ts_operation").getValue();
            const operationType = formContext.getAttribute("ts_operationtype").getValue();
            const workOrderType = formContext.getAttribute("ts_workordertype").getValue();
            if (operation != null && operationType != null && workOrderType != null) {
                setActivityTypeFilteredView(formContext, operation[0].id, workOrderType[0].id, operationType[0].id);
            }
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


    //export function cantCompleteInspectionOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
    //    const form = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();

    //    let cantCompleteInspection = form.getAttribute("ts_cantcompleteinspection").getValue();

    //    if (cantCompleteInspection == true) {
    //        setCantCompleteInspectionControlsVisibility(form, true);
    //        form.getAttribute("ts_incompleteworkorderreason").setRequiredLevel("required");
    //        form.getControl("ts_incompleteworkorderreason").setFocus();
    //    } else {
    //        setCantCompleteInspectionControlsVisibility(form, false);
    //        form.getControl("ts_cantcompleteinspection").setVisible(true);
    //        form.getAttribute("ts_incompleteworkorderreason").setRequiredLevel("none");
    //    }
    //}

    //export function incompleteWorkOrderReasonOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
    //    const form = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();

    //    let selectedIncompleteWorkOrderReason = form.getAttribute("ts_incompleteworkorderreason").getValue();

    //    const selectedOther = "{8B3B6A28-C5FB-EC11-82E6-002248AE441F}";

    //    //If 'Other' is selected as a reason, make ts_incompleteworkorderreasonforother visible
    //    if (selectedIncompleteWorkOrderReason != null && selectedIncompleteWorkOrderReason[0].id.toUpperCase() == selectedOther) {
    //        form.getControl("ts_incompleteworkorderreasonforother").setVisible(true);
    //        form.getControl("ts_incompleteworkorderreasonforother").setFocus();
    //        form.getAttribute("ts_incompleteworkorderreasonforother").setRequiredLevel("required");
    //    } else {
    //        form.getControl("ts_incompleteworkorderreasonforother").setVisible(false);
    //        form.getAttribute("ts_incompleteworkorderreasonforother").setValue(null);
    //        form.getAttribute("ts_incompleteworkorderreasonforother").setRequiredLevel("none");
    //    }
    //}

    export function fiscalQuarterOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_unplannedworkorder.Main.Information>eContext.getFormContext();

        //Check if the Work Order is past the Planned Fiscal Quarter
        //setCantCompleteinspectionVisibility(form);
        setScheduledQuarterFilter(form);
    }

    export function canceledWorkOrderReasonOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_unplannedworkorder.Main.Information>eContext.getFormContext();

        let selectedCanceledWorkOrderReason = form.getAttribute("ts_cancelledinspectionjustification").getValue();

        const selectedOther = "{A8D7125C-7F24-ED11-9DB2-002248AE429C}";

        //If 'Other' is selected as a reason, make ts_othercanceledjustification visible
        if (selectedCanceledWorkOrderReason != null && selectedCanceledWorkOrderReason[0].id.toUpperCase() == selectedOther) {
            form.getControl("ts_othercancelledjustification").setVisible(true);
            form.getAttribute("ts_othercancelledjustification").setRequiredLevel("required");
        } else {
            form.getControl("ts_othercancelledjustification").setVisible(false);
            form.getAttribute("ts_othercancelledjustification").setValue(null);
            form.getAttribute("ts_othercancelledjustification").setRequiredLevel("none");
        }
    }

    function populateOperationField(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_unplannedworkorder.Main.Information>eContext.getFormContext();
        const operationTypeAttribute = form.getAttribute("ts_operationtype");
        const stakeholderAttribute = form.getAttribute("ts_stakeholder");
        const siteAttribute = form.getAttribute("ts_site");
        const workOrderTypeAttribute = form.getAttribute("ts_workordertype");
        if (siteAttribute != null && siteAttribute != undefined) {
            // Clear out operation and subsite value if not already empty
            if (form.getAttribute("ts_operation").getValue() != null) form.getAttribute("ts_operation").setValue(null);

            // If an operation type is selected, we use the filtered fetchxml, otherwise, disable and clear out the dependent fields
            const operationTypeAttributeValue = operationTypeAttribute.getValue();
            const stakeholderAttributeValue = stakeholderAttribute.getValue();
            const siteAttributeValue = siteAttribute.getValue();
            const workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();

            if (siteAttributeValue != null && siteAttributeValue != undefined &&
                stakeholderAttributeValue != null && stakeholderAttributeValue != undefined &&
                operationTypeAttributeValue != null && operationTypeAttributeValue != undefined &&
                workOrderTypeAttribute != null && workOrderTypeAttributeValue != null) {

                if (isFromSecurityIncident && siteAttributeValue[0].id.toLowerCase() == "{bfff30ab-31c3-ed11-b597-000d3af4f43d}") {  //Security Incident Site. Bug 322427 fixes
                    const placeHolderOperation: { id: string; name: string; entityType: "ovs_operation" }[] = [
                        {
                            id: "e9fa69ee-85ea-ed11-a7c6-0022483c5061",
                            name: "Security Incident Operation",
                            entityType: "ovs_operation"
                        }
                    ]
                    form.getAttribute('ts_operation').setValue(placeHolderOperation);
                    setActivityTypeFilteredView(form, placeHolderOperation[0].id, workOrderTypeAttributeValue[0].id, operationTypeAttributeValue[0].id);
                }
                else {
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
                                    form.getAttribute('ts_operation').setValue(lookup);
                                }

                                setActivityTypeFilteredView(form, lookup[0].id, workOrderTypeAttributeValue[0].id, operationTypeAttributeValue[0].id);
                            }
                            //else {
                            //    if (isFromSecurityIncident) {
                            //        const placeHolderOperation: { id: string; name: string; entityType: "ovs_operation" }[] = [
                            //            {
                            //                id: "e9fa69ee-85ea-ed11-a7c6-0022483c5061",
                            //                name: "Security Incident Operation",
                            //                entityType: "ovs_operation"
                            //            }
                            //        ]
                            //        form.getAttribute('ovs_operationid').setValue(placeHolderOperation);
                            //        setActivityTypeFilteredView(form, placeHolderOperation[0].id, workOrderTypeAttributeValue[0].id, operationTypeAttributeValue[0].id);
                            //    }
                            //}
                        },
                        function (error) {
                            showErrorMessageAlert(error);
                        }
                    );
                }
            }
        }
    }

    //function fillOrSetTradeNameView(eContext: Xrm.ExecutionContext<any, any>, stakeholderAttributeValue: Xrm.EntityReference<"account">[]) {
    //    const form = <Form.msdyn_workorder.Main.ROMOversightActivity>eContext.getFormContext();

    //    const tradeNameFetchXML = '?fetchXml=' + '<fetch version="1.0" mapping="logical" returntotalrecordcount="true" page="1" count="25" no-lock="false"><entity name="ts_tradename"><attribute name="statecode"/><attribute name="ts_tradenameid"/><attribute name="ts_name"/><attribute name="createdon"/><filter type="and"><condition attribute="statecode" operator="eq" value="0"/><condition attribute="ts_stakeholderid" operator="eq" value="' + stakeholderAttributeValue[0].id + '"/></filter><attribute name="ts_stakeholderid"/><order attribute="ts_name" descending="false"/></entity></fetch>';

    //    Xrm.WebApi.retrieveMultipleRecords('ts_tradename', tradeNameFetchXML).then(
    //        function success(tradeNames) {
    //            if (tradeNames.entities.length == 1) {
    //                var tradeName = new Array();
    //                tradeName[0] = new Object();
    //                tradeName[0].id = tradeNames.entities[0].ts_tradenameid
    //                tradeName[0].name = tradeNames.entities[0].ts_name
    //                tradeName[0].entityType = "ts_tradename";

    //                form.getAttribute("ts_tradenameid").setValue(tradeName);
    //            }
    //            else if (tradeNames.entities.length > 1) {
    //                form.getControl("ts_tradenameid").setDisabled(false);

    //                let tradeNameCondition = '';

    //                tradeNames.entities.forEach((tradeName) => { tradeNameCondition += '<condition attribute="ts_tradenameid" operator="eq" value="' + tradeName.ts_tradenameid + '" />' })

    //                const viewIdTradename = '{1c859fee-0541-2cac-8d20-7b50ee398066}';
    //                const entityNameTradename = "ts_tradename";
    //                const viewDisplayNameTradename = "FilteredSTradenames";
    //                const fetchXmlTradename = '<fetch version="1.0" mapping="logical" returntotalrecordcount="true" page="1" count="25" no-lock="false"><entity name="ts_tradename"><attribute name="statecode"/><attribute name="ts_tradenameid"/><attribute name="ts_name"/><attribute name="createdon"/><filter type="and"><condition attribute="statecode" operator="eq" value="0"/></filter><filter type="or">' + tradeNameCondition + '</filter><attribute name="ts_stakeholderid"/><order attribute="ts_name" descending="false"/></entity></fetch>';
    //                const layoutXmlTradename = '<grid name="resultset" object="10010" jump="ts_name" select="1" icon="1" preview="1"><row name="result" id="ts_tradenameid"><cell name="ts_name" width="200" /></row></grid>';
    //                form.getControl("ts_tradenameid").addCustomView(viewIdTradename, entityNameTradename, viewDisplayNameTradename, fetchXmlTradename, layoutXmlTradename, true);
    //            }
    //        }
    //    );
    //}

    function showHideContact(form: Form.ts_unplannedworkorder.Main.Information): void {
        const operationTypeValue = form.getAttribute("ts_operationtype").getValue();

        if (operationTypeValue != null && operationTypeValue[0].id == "{BE8B0910-C751-EB11-A812-000D3AF3AC0D}") { //Person
            form.getControl("ts_contact").setVisible(true);
            form.getAttribute("ts_contact").setRequiredLevel("required");
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
        let userBusinessUnit = await Xrm.WebApi.retrieveMultipleRecords("businessunit", currentUserBusinessUnitFetchXML);
        const userBusinessUnitId = userBusinessUnit.entities[0].businessunitid;
        return await isAvSecBU(userBusinessUnitId);
    }

    function setFiscalQuarter(form: Form.ts_unplannedworkorder.Main.Information) {
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

                form.getAttribute("ts_plannedfiscalquarter").setValue(lookup);
            },
            function (error) {
            }
        );
    }

    //function setCaseLookupClickNavigation(eContext) {
    //    const formContext = eContext.getFormContext();
    //    formContext.getControl("msdyn_servicerequest").addOnLookupTagClick(function (eContext) {
    //        const formContext = eContext.getFormContext();
    //        //Check if the Time Tracking Tab is Expanded
    //        var timeTrackingExpanded = false;
    //        if (isROM20Form) {
    //            timeTrackingExpanded = formContext.ui.tabs.get("tab_workspace").getDisplayState() == 'expanded';
    //        }
    //        else {
    //            timeTrackingExpanded = formContext.ui.tabs.get("tab_TimeTracking").getDisplayState() == 'expanded';
    //        }
    //        if (timeTrackingExpanded) {
    //            eContext.getEventArgs().preventDefault(); //Prevent default navigation to normal Case form
    //            var record = eContext.getEventArgs().getTagValue();
    //            Xrm.Navigation.navigateTo({
    //                pageType: "entityrecord",
    //                entityName: record.entityType,
    //                entityId: record.id,
    //                formId: "cc169f8e-7df9-ed11-8f6e-000d3af36bac"
    //            }, {
    //                target: 2,
    //                position: 2,
    //                width:
    //                {
    //                    value: 30,
    //                    unit: "%"
    //                }
    //            });
    //        }
    //    });
    //}

    //function setSecurityIncidentLookupClickNavigation(eContext) {
    //    const formContext = eContext.getFormContext();
    //    formContext.getControl("ts_securityincident").addOnLookupTagClick(function (eContext) {
    //        const formContext = eContext.getFormContext();
    //        //Check if the Time Tracking Tab is Expanded
    //        var timeTrackingExpanded = false;
    //        if (isROM20Form) {
    //            timeTrackingExpanded = formContext.ui.tabs.get("tab_workspace").getDisplayState() == 'expanded';
    //        }
    //        else {
    //            timeTrackingExpanded = formContext.ui.tabs.get("tab_TimeTracking").getDisplayState() == 'expanded';
    //        }
    //        if (timeTrackingExpanded) {
    //            eContext.getEventArgs().preventDefault(); //Prevent default navigation to normal Case form
    //            var record = eContext.getEventArgs().getTagValue();
    //            Xrm.Navigation.navigateTo({
    //                pageType: "entityrecord",
    //                entityName: record.entityType,
    //                entityId: record.id,
    //                formId: "54b321b6-6afa-ed11-8f6e-0022483c5061"
    //            }, {
    //                target: 2,
    //                position: 2,
    //                width:
    //                {
    //                    value: 30,
    //                    unit: "%"
    //                }
    //            });
    //        }
    //    });
    //}

    //function setTripLookupClickNavigation(eContext) {
    //    const formContext = eContext.getFormContext();
    //    formContext.getControl("ts_trip").addOnLookupTagClick(function (eContext) {
    //        const formContext = eContext.getFormContext();
    //        //Check if the Time Tracking Tab is Expanded
    //        var timeTrackingExpanded = false;
    //        if (isROM20Form) {
    //            timeTrackingExpanded = formContext.ui.tabs.get("tab_workspace").getDisplayState() == 'expanded';
    //        }
    //        else {
    //            timeTrackingExpanded = formContext.ui.tabs.get("tab_TimeTracking").getDisplayState() == 'expanded';
    //        }
    //        if (timeTrackingExpanded) {
    //            eContext.getEventArgs().preventDefault(); //Prevent default navigation to normal Case form
    //            var record = eContext.getEventArgs().getTagValue();
    //            Xrm.Navigation.navigateTo({
    //                pageType: "entityrecord",
    //                entityName: record.entityType,
    //                entityId: record.id,
    //                formId: "F9A735C7-D9C6-4CFF-B0CE-C78A28C8E5AD"
    //            }, {
    //                target: 2,
    //                position: 2,
    //                width:
    //                {
    //                    value: 30,
    //                    unit: "%"
    //                }
    //            });
    //        }
    //    });
    //}

    //function unlockRecordLogFieldsIfUserIsSystemAdmin(formContext) {
    //    if (userHasRole("System Administrator")) {
    //        formContext.getControl("msdyn_timeclosed").setDisabled(false);
    //        formContext.getControl("msdyn_closedby").setDisabled(false);
    //    }
    //}

    function showHideFiedsByOperationType(eContext: Xrm.ExecutionContext<any, any>) {
        const form = <Form.ts_unplannedworkorder.Main.Information>eContext.getFormContext();
        //   const formROM2 = <Form.msdyn_workorder.Main.ROM20>eContext.getFormContext();
        const operationTypeAttribute = form.getAttribute("ts_operationtype");
        if (operationTypeAttribute != null) {
            const operationTypeAttributeValue = operationTypeAttribute.getValue();
            if (operationTypeAttributeValue != null) {
                if (operationTypeAttributeValue[0].id.toLowerCase() == "{8b614ef0-c651-eb11-a812-000d3af3ac0d}") {  //Air Carrier (Passenger)
                    form.getControl("ts_aircraftclassification").setVisible(true);
                    if (form.getAttribute("ts_aircraftclassification").getValue() == null) {
                        form.getAttribute("ts_aircraftclassification").setValue(ts_aircraftclassification.PassengerPAX);
                    }

                    //if (isROM20Form) {
                    //    formROM2.ui.tabs.get("tab_workspace").sections.get("tab_workspace_flightdetails").setVisible(true);
                    //    formROM2.ui.tabs.get("tab_workspace").sections.get("tab_workspace_aircraftdetails").setVisible(true);
                    //}
                }
                else {
                    form.getControl("ts_aircraftclassification").setVisible(false);
                    //if (isROM20Form) {
                    //    formROM2.ui.tabs.get("tab_workspace").sections.get("tab_workspace_flightdetails").setVisible(false);
                    //    formROM2.ui.tabs.get("tab_workspace").sections.get("tab_workspace_aircraftdetails").setVisible(false);
                    //}
                }
            }
            else {
                form.getControl("ts_aircraftclassification").setVisible(false);
            }
        }
    }

    export function RunOnRowSelected(eContext) {
        debugger;
        var selected = eContext.getFormContext().data.entity;
        var Id = selected.getId();
        var entityName = selected.getEntityName();

        Xrm.Navigation.navigateTo({
            pageType: "entityrecord",
            entityName: entityName,
            entityId: Id
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

    export function populateFlightCategory(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_workorder.Main.ROM20>eContext.getFormContext();
        const originValue = form.getAttribute("ts_departureaerodrome").getValue();
        const destinationValue = form.getAttribute("ts_arrivalaerodrome").getValue();
        var originCountry;
        var distinationCountry;

        if (originValue != null && destinationValue != null) {
            Xrm.WebApi.retrieveRecord("msdyn_functionallocation", originValue[0].id, "?$select=_ts_country_value ").then(
                function success(result1) {
                    originCountry = result1._ts_country_value;
                    Xrm.WebApi.retrieveRecord("msdyn_functionallocation", destinationValue[0].id, "?$select=_ts_country_value ").then(
                        function success(result2) {
                            distinationCountry = result2._ts_country_value;

                            if (distinationCountry == "208ef8a1-8e75-eb11-a812-000d3af3fac7" && originCountry == "208ef8a1-8e75-eb11-a812-000d3af3fac7") { // Canada
                                // Domestic
                                form.getAttribute("ts_airserviceclassification").setValue(ts_airserviceclassification.Domestic);
                            }
                            else if ((distinationCountry != "7c01709f-8e75-eb11-a812-000d3af3f6ab" && distinationCountry != "208ef8a1-8e75-eb11-a812-000d3af3fac7")
                                || (originCountry != "7c01709f-8e75-eb11-a812-000d3af3f6ab" && originCountry != "208ef8a1-8e75-eb11-a812-000d3af3fac7")) { //Not in USA or Canada
                                //International
                                form.getAttribute("ts_airserviceclassification").setValue(ts_airserviceclassification.International);
                            }
                            else {
                                //Transborder
                                form.getAttribute("ts_airserviceclassification").setValue(ts_airserviceclassification.Transborder);
                            }
                        },
                        function error(error) {
                            Xrm.Navigation.openAlertDialog({ text: error.message });
                        });
                },
                function error(error) {
                    Xrm.Navigation.openAlertDialog({ text: error.message });
                });
        }
    }

    /**
    * Handler for the OnChange event of the Rationale lookup.
    *
    * @param {Xrm.ExecutionContext<any, any>} eContext The execution context passed by the form.
    *
    * @returns {void}
    */
    export function rationaleOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_unplannedworkorder.Main.Information>eContext.getFormContext();

        showWorkOrderJustificationField(form);
    }

    /**
      * Shows and makes required the Rationale lookup control when a Category indicates "Unplanned".
      *
      * @param {Form.msdyn_workorder.Main.ROMOversightActivity} form The Work Order form context (ROM Oversight Activity).
      * @param {string} unplannedCategoryGUID GUID for the "Unplanned" category.
      *
      * @returns {void}
      */
    function showRationaleField(form: Form.ts_unplannedworkorder.Main.Information, unplannedCategoryGUID: string): void {
        const lang = Xrm.Utility.getGlobalContext().userSettings.languageId;
        const categoryAttribute = form.getAttribute("ts_rational");
        if (!categoryAttribute) {
            return;
        }

        const categoryValue = categoryAttribute.getValue();

        let show = false;

        if (Array.isArray(categoryValue) && categoryValue.length > 0) {
            const item = categoryValue[0];
            const rawId = item.id || "";
            const id = rawId.replace(/[{}]/g, "").toLowerCase();

            if (id === unplannedCategoryGUID.toLowerCase()) {
                show = true;
            }
        }

        const rationaleControl = form.getControl("ts_reason");
        const rationaleAttribute = form.getAttribute("ts_reason");


        if (rationaleControl) {

            rationaleControl.setVisible(show);
        }

        if (rationaleAttribute) {
            rationaleAttribute.setRequiredLevel(show ? "required" : "none");
            showWorkOrderJustificationField(form);

            // If hiding, clear value to avoid stale required-value mismatch
            if (!show) {
                rationaleAttribute.setValue(null);
            }
        }
    }

    /**
     * Shows and makes required the Work Order Justification field when the current
     * Rationale lookup value is equal to the HQ Direction GUID.
     *
     * @param {Form.msdyn_workorder.Main.ROMOversightActivity} form The Work Order form context (ROM Oversight Activity).
     *
     * @returns {void}
     */
    function showWorkOrderJustificationField(form: Form.ts_unplannedworkorder.Main.Information): void {

        const rationaleAttribute = form.getAttribute("ts_reason");
        if (!rationaleAttribute) {
            return;
        }

        const rationaleValue = rationaleAttribute.getValue();

        const justificationControl = form.getControl("ts_workorderjustification");
        const justificationAttribute = form.getAttribute("ts_workorderjustification");

        const HQ_DIRECTION_RATIONALE_GUID = "b323090c-1cb5-f011-bbd2-7ced8da5b15f";

        let show = false;

        if (Array.isArray(rationaleValue) && rationaleValue.length > 0) {
            const item = rationaleValue[0];
            const rawId = item.id || "";
            const id = rawId.replace(/[{}]/g, "").toLowerCase();

            if (id === HQ_DIRECTION_RATIONALE_GUID.toLowerCase()) {
                show = true;
            }
        }

        if (justificationControl) {
            justificationControl.setVisible(show);
        }

        if (justificationAttribute) {
            justificationAttribute.setRequiredLevel(show ? "required" : "none");

            if (!show) {
                justificationAttribute.setValue(null);
            }
        }
    }

    async function setWorkOrderTypeFilteredView(
        form: Form.ts_unplannedworkorder.Main.Information,
        useRailSafetyTypes: boolean
    ): Promise<void> {

        const railSecurityTeamId = await getEnvironmentVariableValue(TEAM_SCHEMA_NAMES.RAIL_SAFETY);

        const viewId = useRailSafetyTypes
            ? '{4197D34A-2D73-4BED-AB2A-B44799E98C62}' // Rail Safety
            : '{4197D34B-2D73-4BED-AB2C-B44799E98C62}' // Default

        const op = useRailSafetyTypes ? "eq" : "ne";

        const entityName = "msdyn_workordertype";
        const viewDisplayName = "Filtered Work Order Types";

        const fetchXml =
            '<fetch xmlns:generator="MarkMpn.SQL4CDS">' +
            '  <entity name="msdyn_workordertype">' +
            '    <attribute name="msdyn_workordertypeid" />' +
            '    <attribute name="msdyn_name" />' +
            '    <filter>' +
            `      <condition attribute="ownerid" operator="${op}" value="${railSecurityTeamId}" />` +
            '    </filter>' +
            '  </entity>' +
            '</fetch>';

        const layoutXml =
            '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1">' +
            '  <row name="result" id="msdyn_workordertypeid">' +
            '    <cell name="msdyn_name" width="200" />' +
            '  </row>' +
            '</grid>';

        form.getControl("ts_workordertype")
            .addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
    }
}

