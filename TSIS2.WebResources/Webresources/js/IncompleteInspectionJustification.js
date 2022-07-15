"use strict";
var ROM;
(function (ROM) {
    var IncompleteInspectionJustification;
    (function (IncompleteInspectionJustification) {
        // EVENTS
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            var warningMessage = Xrm.Utility.getResourceString("ovs_/resx/IncompleteInspectionJustification", "WarningMessageText");
            form.ui.setFormNotification(warningMessage, "WARNING", "WarningMessage");
        }
        IncompleteInspectionJustification.onLoad = onLoad;
        function onSave(eContext) {
        }
        IncompleteInspectionJustification.onSave = onSave;
    })(IncompleteInspectionJustification = ROM.IncompleteInspectionJustification || (ROM.IncompleteInspectionJustification = {}));
})(ROM || (ROM = {}));
