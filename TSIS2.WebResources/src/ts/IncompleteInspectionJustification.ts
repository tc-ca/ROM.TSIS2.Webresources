namespace ROM.IncompleteInspectionJustification {

    // EVENTS
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
    }

    export function onSave(eContext: Xrm.ExecutionContext<any, any>): void {
    }

    export function tsOwnerOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        //Find out what owner is selected from ts_Owner - then set the actual owner
        const form = <Form.ts_incompleteworkorderreason.Main.Information>eContext.getFormContext();
        var selectedOwner = form.getAttribute("ts_owner").getValue();

        if (selectedOwner != null) {
            setOwner(form, selectedOwner);
        }
    }

    // FUNCTIONS
    function setOwner(form: Form.ts_incompleteworkorderreason.Main.Information, owner:number): void {
        //Find out if the user selected Aviation Security or ISSO then set the actual owner
        const aviationSecurity = 717750000;
        const intermodalSurfaceSecurityOversight = 717750001
        const ownerIdISSO = '50F4B827-BEAD-EB11-8236-000D3AE8B866';
        const ownerIdAvSec = 'E2E3910D-A41F-EC11-B6E6-0022483CB5C7';
        var ownerId = '';

        if (owner == aviationSecurity) {
            ownerId = ownerIdAvSec;
        } else if (owner == intermodalSurfaceSecurityOversight) {
            ownerId = ownerIdISSO;
        }
        else {
            return;
        }

        Xrm.WebApi.retrieveRecord("team", ownerId, undefined).then(
            function success(result) {

                var owner = new Array();
                owner[0] = new Object();
                owner[0].id = result.teamid;
                owner[0].name = result.name;
                owner[0].entityType = "team";

                form.getAttribute("ownerid").setValue(owner);
            },
            function (error) {
            }
        );
    }
}