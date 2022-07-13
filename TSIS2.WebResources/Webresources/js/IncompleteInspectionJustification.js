"use strict";
var ROM;
(function (ROM) {
    var IncompleteInspectionJustification;
    (function (IncompleteInspectionJustification) {
        // EVENTS
        function onLoad(eContext) {
        }
        IncompleteInspectionJustification.onLoad = onLoad;
        function onSave(eContext) {
        }
        IncompleteInspectionJustification.onSave = onSave;
        function tsOwnerOnChange(eContext) {
            //Find out what owner is selected from ts_Owner - then set the actual owner
            var form = eContext.getFormContext();
            var selectedOwner = form.getAttribute("ts_owner").getValue();
            if (selectedOwner != null) {
                setOwner(form, selectedOwner);
            }
        }
        IncompleteInspectionJustification.tsOwnerOnChange = tsOwnerOnChange;
        // FUNCTIONS
        function setOwner(form, owner) {
            //Find out if the user selected Aviation Security or ISSO then set the actual owner
            var aviationSecurity = 717750000;
            var intermodalSurfaceSecurityOversight = 717750001;
            var ownerIdISSO = '50F4B827-BEAD-EB11-8236-000D3AE8B866';
            var ownerIdAvSec = 'E2E3910D-A41F-EC11-B6E6-0022483CB5C7';
            var ownerId = '';
            if (owner == aviationSecurity) {
                ownerId = ownerIdAvSec;
            }
            else if (owner == intermodalSurfaceSecurityOversight) {
                ownerId = ownerIdISSO;
            }
            else {
                return;
            }
            Xrm.WebApi.retrieveRecord("team", ownerId, undefined).then(function success(result) {
                var owner = new Array();
                owner[0] = new Object();
                owner[0].id = result.teamid;
                owner[0].name = result.name;
                owner[0].entityType = "team";
                form.getAttribute("ownerid").setValue(owner);
            }, function (error) {
            });
        }
    })(IncompleteInspectionJustification = ROM.IncompleteInspectionJustification || (ROM.IncompleteInspectionJustification = {}));
})(ROM || (ROM = {}));
