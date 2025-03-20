"use strict";
var ROM;
(function (ROM) {
    var EntityRiskFrequency;
    (function (EntityRiskFrequency) {
        function onLoad(eContext) {
            var formContext = eContext.getFormContext();
            console.log("Entering onLoad");
        }
        EntityRiskFrequency.onLoad = onLoad;
        function onSave(eContext) {
            var formContext = eContext.getFormContext();
            console.log("Entering onSave");
        }
        EntityRiskFrequency.onSave = onSave;
    })(EntityRiskFrequency = ROM.EntityRiskFrequency || (ROM.EntityRiskFrequency = {}));
})(ROM || (ROM = {}));
