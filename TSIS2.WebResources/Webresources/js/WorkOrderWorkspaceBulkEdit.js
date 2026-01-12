/**
 * Bulk-edit opener for Unplanned Work Order (Workspace) records
 * 
 * Retrieves all Unplanned Work Orders related to selected Work Orders
 * and opens them in bulk-edit mode in a modal window.
 */

// Bulk-edit opener for Workspace with auto-create capability
// If workspaces don't exist for selected Work Orders, they are created automatically
function openBulkWorkspace(selectedControl) {
    // Security check - only allow specific roles
    var roles = Xrm.Utility.getGlobalContext().userSettings.roles;
    var hasAccess = false;
    roles.forEach(function (item) {
        if (item.name == "System Administrator" || item.name == "ROM - Manager" || item.name == "ROM - Planner") {
            hasAccess = true;
        }
    });

    if (!hasAccess) {
        const lang = Xrm.Utility.getGlobalContext().userSettings.languageId;
        Xrm.Navigation.openAlertDialog({ 
            text: (lang == 1036) ? 
                "Vous n'avez pas la permission d'accéder à cette fonction." : 
                "You do not have permission to access this function." 
        });
        return;
    }

    const lookup = "_ts_workorder_value";
    const grid = selectedControl.getGrid ? selectedControl.getGrid() : selectedControl;
    const rows = grid.getSelectedRows().get();
    const woIds = rows.map(r => r.getData().getEntity().getId().replace(/[{}]/g, "").toLowerCase());
    const lang = Xrm.Utility.getGlobalContext().userSettings.languageId;

    (async function () {
        try {
            // Show progress indicator
            Xrm.Utility.showProgressIndicator();

            const wsIds = [];
            const missingWoIds = [];
            const failedWoIds = [];

            // Step 1: Query existing workspaces for each Work Order
            for (let index = 0; index < woIds.length; index++) {
                const woId = woIds[index];
                const res = await Xrm.WebApi.retrieveMultipleRecords(
                    "ts_unplannedworkorder",
                    `?$select=ts_unplannedworkorderid&$filter=${lookup} eq '${woId}'`
                );
                
                if (res.entities && res.entities.length > 0) {
                    // Existing workspace found - add to list
                    res.entities.forEach(e =>
                        wsIds.push(e["ts_unplannedworkorderid"].replace(/[{}]/g, "").toLowerCase())
                    );
                } else {
                    // No workspace found - mark for creation
                    missingWoIds.push(woId);
                }
            }

            // Step 2: Create workspaces for missing Work Orders
            if (missingWoIds.length > 0) {
                for (let index = 0; index < missingWoIds.length; index++) {
                    const woId = missingWoIds[index];
                    const newWorkspaceId = await createWorkspaceAndGetId(woId, lang);
                    
                    if (newWorkspaceId) {
                        wsIds.push(newWorkspaceId);
                    } else {
                        failedWoIds.push(woId);
                    }
                }
            }

            // Step 2.5: Show warning if any failed
            if (failedWoIds.length > 0) {
                const successCount = missingWoIds.length - failedWoIds.length;
                const failureMessage = (lang == 1036) ?
                    `${successCount} espace(s) de travail créé(s). Échec pour ${failedWoIds.length} ordre(s) de travail.\nIDs: ${failedWoIds.join(", ")}` :
                    `${successCount} workspace(s) created. Failed for ${failedWoIds.length} work order(s).\nIDs: ${failedWoIds.join(", ")}`;
                
                Xrm.Utility.closeProgressIndicator();
                Xrm.Navigation.openAlertDialog({ text: failureMessage });
                return;
            }

            // Step 3: Open bulk-edit with all workspace IDs (existing + newly created)
            if (wsIds.length > 0) {
                Xrm.Utility.closeProgressIndicator();
                
                await Xrm.Navigation.navigateTo({
                    pageType: "bulkedit",
                    entityName: "ts_unplannedworkorder",
                    entityIds: wsIds
                }, {
                    target: 2,
                    width: { value: 80, unit: "%" },
                    height: { value: 80, unit: "%" },
                    position: 1
                });
            }
        } catch (error) {
            Xrm.Utility.closeProgressIndicator();
            const lang = Xrm.Utility.getGlobalContext().userSettings.languageId;
            Xrm.Navigation.openAlertDialog({ 
                text: (lang == 1036) ? 
                    "Une erreur s'est produite: " + error.message : 
                    "An error occurred: " + error.message 
            });
        }
    })();
}

// Helper function: Create workspace silently and return its ID
// Does not open a form - used for bulk auto-creation
async function createWorkspaceAndGetId(currentWorkOrderId, lang) {
    return new Promise((resolve) => {
        Xrm.WebApi.retrieveRecord("msdyn_workorder", currentWorkOrderId,
            "?$select=msdyn_name,_ownerid_value,_msdyn_workordertype_value,_ts_region_value,_ts_country_value,_ovs_operationtypeid_value,ts_aircraftclassification,_ts_tradenameid_value,_msdyn_serviceaccount_value,_ts_contact_value,_ts_site_value,_msdyn_functionallocation_value,_ts_subsubsite_value,_ts_reason_value,_ts_workorderjustification_value,_ovs_operationid_value,msdyn_worklocation,_ovs_rational_value,ts_businessowner,_msdyn_primaryincidenttype_value,msdyn_primaryincidentdescription,msdyn_primaryincidentestimatedduration,ts_overtimerequired,ts_reportdetails,_ts_canceledinspectionjustification_value,_ovs_revisedquarterid_value,_ts_scheduledquarterjustification_value,ts_justificationcomment,ts_details,msdyn_instructions,ts_preparationtime,ts_woreportinganddocumentation,ts_comments,ts_overtime,ts_conductingoversight,ts_traveltime,_msdyn_servicerequest_value,_ts_securityincident_value,_ts_trip_value,_msdyn_parentworkorder_value,msdyn_systemstatus"
        ).then(
            function success(workOrder) {
                var unplannedWorkOrderData = {
                    ts_skipplugin: true,
                    ts_name: workOrder.msdyn_name
                };

                // Add lookup fields
                if (workOrder._ownerid_value) {
                    unplannedWorkOrderData["ownerid@odata.bind"] = "/systemusers(" + workOrder._ownerid_value + ")";
                }
                if (currentWorkOrderId) {
                    unplannedWorkOrderData["ts_WorkOrder@odata.bind"] = "/msdyn_workorders(" + currentWorkOrderId + ")";
                }
                if (workOrder._msdyn_workordertype_value) {
                    unplannedWorkOrderData["ts_workordertype@odata.bind"] = "/msdyn_workordertypes(" + workOrder._msdyn_workordertype_value + ")";
                }
                if (workOrder._ts_region_value) {
                    unplannedWorkOrderData["ts_region@odata.bind"] = "/msdyn_regions(" + workOrder._ts_region_value + ")";
                }
                if (workOrder._ts_country_value) {
                    unplannedWorkOrderData["ts_country@odata.bind"] = "/tc_countries(" + workOrder._ts_country_value + ")";
                }
                if (workOrder._ovs_operationtypeid_value) {
                    unplannedWorkOrderData["ts_operationtype@odata.bind"] = "/ovs_operationtypes(" + workOrder._ovs_operationtypeid_value + ")";
                }
                if (workOrder._ts_tradenameid_value) {
                    unplannedWorkOrderData["ts_TradeName@odata.bind"] = "/ts_tradenames(" + workOrder._ts_tradenameid_value + ")";
                }
                if (workOrder._msdyn_serviceaccount_value) {
                    unplannedWorkOrderData["ts_stakeholder@odata.bind"] = "/accounts(" + workOrder._msdyn_serviceaccount_value + ")";
                }
                if (workOrder._ts_contact_value) {
                    unplannedWorkOrderData["ts_contact@odata.bind"] = "/contacts(" + workOrder._ts_contact_value + ")";
                }
                if (workOrder._ts_site_value) {
                    unplannedWorkOrderData["ts_site@odata.bind"] = "/ts_sites(" + workOrder._ts_site_value + ")";
                }
                if (workOrder._msdyn_functionallocation_value) {
                    unplannedWorkOrderData["ts_functionallocation@odata.bind"] = "/msdyn_functionallocations(" + workOrder._msdyn_functionallocation_value + ")";
                }
                if (workOrder._ts_subsubsite_value) {
                    unplannedWorkOrderData["ts_subsubsite@odata.bind"] = "/msdyn_functionallocations(" + workOrder._ts_subsubsite_value + ")";
                }
                if (workOrder._ts_reason_value) {
                    unplannedWorkOrderData["ts_reason@odata.bind"] = "/ts_planningreasons(" + workOrder._ts_reason_value + ")";
                }
                if (workOrder._ts_workorderjustification_value) {
                    unplannedWorkOrderData["ts_WorkOrderJustification@odata.bind"] = "/ts_justifications(" + workOrder._ts_workorderjustification_value + ")";
                }
                if (workOrder._ovs_operationid_value) {
                    unplannedWorkOrderData["ts_operation@odata.bind"] = "/ovs_operations(" + workOrder._ovs_operationid_value + ")";
                }
                if (workOrder._ovs_rational_value) {
                    unplannedWorkOrderData["ts_rational@odata.bind"] = "/ovs_tyrationals(" + workOrder._ovs_rational_value + ")";
                }
                if (workOrder._msdyn_primaryincidenttype_value) {
                    unplannedWorkOrderData["ts_primaryincidenttype@odata.bind"] = "/msdyn_incidenttypes(" + workOrder._msdyn_primaryincidenttype_value + ")";
                }
                if (workOrder._ts_canceledinspectionjustification_value) {
                    unplannedWorkOrderData["ts_CancelledInspectionJustification@odata.bind"] = "/ts_canceledinspectionjustifications(" + workOrder._ts_canceledinspectionjustification_value + ")";
                }
                if (workOrder._ovs_revisedquarterid_value) {
                    unplannedWorkOrderData["ts_revisedquarterid@odata.bind"] = "/tc_tcfiscalquarters(" + workOrder._ovs_revisedquarterid_value + ")";
                }
                if (workOrder._ts_scheduledquarterjustification_value) {
                    unplannedWorkOrderData["ts_ScheduledQuarterJustification@odata.bind"] = "/ts_justifications(" + workOrder._ts_scheduledquarterjustification_value + ")";
                }
                if (workOrder._msdyn_servicerequest_value) {
                    unplannedWorkOrderData["ts_servicerequest@odata.bind"] = "/incidents(" + workOrder._msdyn_servicerequest_value + ")";
                }
                if (workOrder._ts_securityincident_value) {
                    unplannedWorkOrderData["ts_SecurityIncident@odata.bind"] = "/ts_securityincidents(" + workOrder._ts_securityincident_value + ")";
                }
                if (workOrder._ts_trip_value) {
                    unplannedWorkOrderData["ts_Trip@odata.bind"] = "/ts_trips(" + workOrder._ts_trip_value + ")";
                }
                if (workOrder._msdyn_parentworkorder_value) {
                    unplannedWorkOrderData["ts_ParentWorkOrder@odata.bind"] = "/msdyn_workorders(" + workOrder._msdyn_parentworkorder_value + ")";
                }

                // Add simple fields
                if (workOrder.ts_aircraftclassification !== null && workOrder.ts_aircraftclassification !== undefined) {
                    unplannedWorkOrderData.ts_aircraftclassification = workOrder.ts_aircraftclassification;
                }
                if (workOrder.msdyn_worklocation !== null && workOrder.msdyn_worklocation !== undefined) {
                    unplannedWorkOrderData.ts_worklocation = workOrder.msdyn_worklocation;
                }
                if (workOrder.ts_businessowner) {
                    unplannedWorkOrderData.ts_businessowner = workOrder.ts_businessowner;
                }
                if (workOrder.msdyn_primaryincidentdescription) {
                    unplannedWorkOrderData.ts_primaryincidentdescription = workOrder.msdyn_primaryincidentdescription;
                }
                if (workOrder.msdyn_primaryincidentestimatedduration !== null && workOrder.msdyn_primaryincidentestimatedduration !== undefined) {
                    unplannedWorkOrderData.ts_primaryincidentestimatedduration = workOrder.msdyn_primaryincidentestimatedduration;
                }
                if (workOrder.ts_overtimerequired !== null && workOrder.ts_overtimerequired !== undefined) {
                    unplannedWorkOrderData.ts_overtimerequired = workOrder.ts_overtimerequired;
                }
                if (workOrder.ts_reportdetails) {
                    unplannedWorkOrderData.ts_reportdetails = workOrder.ts_reportdetails;
                }
                if (workOrder.ts_justificationcomment) {
                    unplannedWorkOrderData.ts_scheduledquarterjustificationcomment = workOrder.ts_justificationcomment;
                }
                if (workOrder.ts_details) {
                    unplannedWorkOrderData.ts_details = workOrder.ts_details;
                }
                if (workOrder.msdyn_instructions) {
                    unplannedWorkOrderData.ts_instructions = workOrder.msdyn_instructions;
                }
                if (workOrder.ts_preparationtime) {
                    unplannedWorkOrderData.ts_wopreparationtime = workOrder.ts_preparationtime;
                }
                if (workOrder.ts_woreportinganddocumentation) {
                    unplannedWorkOrderData.ts_woreportinganddocumentation = workOrder.ts_woreportinganddocumentation;
                }
                if (workOrder.ts_comments) {
                    unplannedWorkOrderData.ts_comments = workOrder.ts_comments;
                }
                if (workOrder.ts_overtime) {
                    unplannedWorkOrderData.ts_overtime = workOrder.ts_overtime;
                }
                if (workOrder.ts_conductingoversight) {
                    unplannedWorkOrderData.ts_woconductingoversight = workOrder.ts_conductingoversight;
                }
                if (workOrder.ts_traveltime) {
                    unplannedWorkOrderData.ts_wotraveltime = workOrder.ts_traveltime;
                }
                if (workOrder.msdyn_systemstatus) {
                    unplannedWorkOrderData.ts_recordstatus = workOrder.msdyn_systemstatus;
                }

                // Create the workspace (no form opened)
                Xrm.WebApi.createRecord("ts_unplannedworkorder", unplannedWorkOrderData).then(
                    function success(result) {
                        resolve(result.id);
                    },
                    function error(err) {
                        resolve(null); // Continue processing even if one fails
                    }
                );
            },
            function error(err) {
                resolve(null); // Continue processing even if one fails
            }
        );
    });
}
