/**
 * Bulk-edit opener for Unplanned Work Order (Workspace) records
 * 
 * Retrieves all Unplanned Work Orders related to selected Work Orders
 * and opens them in bulk-edit mode in a modal window.
 */

// Minimal working bulk-edit opener for Workspace
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
        Xrm.Navigation.openAlertDialog({ text: "You do not have permission to access this function." });
        return;
    }

    const lookup = "_ts_workorder_value";
    const grid = selectedControl.getGrid ? selectedControl.getGrid() : selectedControl;
    const rows = grid.getSelectedRows().get();
    const woIds = rows.map(r => r.getData().getEntity().getId().replace(/[{}]/g, "").toLowerCase());

    (async function () {
        const wsIds = [];
        for (const woId of woIds) {
            const res = await Xrm.WebApi.retrieveMultipleRecords(
                "ts_unplannedworkorder",
                `?$select=ts_unplannedworkorderid&$filter=${lookup} eq '${woId}'`
            );
            res.entities.forEach(e =>
                wsIds.push(e["ts_unplannedworkorderid"].replace(/[{}]/g, "").toLowerCase())
            );
        }
        if (!wsIds.length) {
            return Xrm.Navigation.openAlertDialog({ text: "No Workspace records found." });
        }
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
    })();
}
