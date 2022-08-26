"use strict";
var ROM;
(function (ROM) {
    var CanceledInspectionJustification;
    (function (CanceledInspectionJustification) {
        // EVENTS
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            var warningMessage = Xrm.Utility.getResourceString("ts_/resx/CanceledInspectionJustification", "WarningMessageText");
            form.ui.setFormNotification(warningMessage, "WARNING", "WarningMessage");
            //If Create new
            if (form.ui.getFormType() == 1)
                form.getAttribute("ownerid").setValue(null);
        }
        CanceledInspectionJustification.onLoad = onLoad;
        function onOwnerChange(eContext) {
            var form = eContext.getFormContext();
            var ownerValue = form.getAttribute("ownerid").getValue();
            var warningMessage = Xrm.Utility.getResourceString("ts_/resx/CanceledInspectionJustification", "WarningMessageText");
            var ownerName;
            if (ownerValue != null) {
                ownerName = ownerValue[0].name;
                if (!ownerName.startsWith("Aviation") && !ownerName.startsWith("Intermodal")) {
                    form.getControl("ownerid").setNotification(warningMessage, "error");
                }
                else {
                    form.getControl("ownerid").clearNotification("error");
                }
            }
        }
        CanceledInspectionJustification.onOwnerChange = onOwnerChange;
    })(CanceledInspectionJustification = ROM.CanceledInspectionJustification || (ROM.CanceledInspectionJustification = {}));
})(ROM || (ROM = {}));
