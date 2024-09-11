/* eslint-disable @typescript-eslint/triple-slash-reference */
namespace ROM.Trip {
    // EVENTS
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_trip.Main.Information>eContext.getFormContext();
        
        if (userHasRole("System Administrator|ROM - Business Admin|ROM - Planner|ROM - Manager")) {
            form.getControl("ts_fiscalyear").setDisabled(false);
            console.log("Enable role");
            
        } else {
            form.getControl("ts_fiscalyear").setDisabled(true);
            
        }
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
    
}
