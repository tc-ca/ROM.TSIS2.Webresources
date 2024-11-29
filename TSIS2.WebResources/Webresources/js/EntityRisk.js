"use strict";
var ROM;
(function (ROM) {
    var EntityRisk;
    (function (EntityRisk) {
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            console.log("Entering EntityRisk onLoad");
        }
        EntityRisk.onLoad = onLoad;
        function onSave(eContext) {
            var form = eContext.getFormContext();
            console.log("Entering EntityRisk onSave");
        }
        EntityRisk.onSave = onSave;
    })(EntityRisk = ROM.EntityRisk || (ROM.EntityRisk = {}));
})(ROM || (ROM = {}));
