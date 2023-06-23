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
            showFieldWarningMessageIfOwnerIsNotISSONorAvSec(form);
        }
        CanceledInspectionJustification.onOwnerChange = onOwnerChange;
    })(CanceledInspectionJustification = ROM.CanceledInspectionJustification || (ROM.CanceledInspectionJustification = {}));
})(ROM || (ROM = {}));
