"use strict";
var ROM;
(function (ROM) {
    var PrescribedFrequencyOverride;
    (function (PrescribedFrequencyOverride) {
        function onLoad(eContext) {
            var formContext = eContext.getFormContext();
            console.log("Entering onLoad");
        }
        PrescribedFrequencyOverride.onLoad = onLoad;
    })(PrescribedFrequencyOverride = ROM.PrescribedFrequencyOverride || (ROM.PrescribedFrequencyOverride = {}));
})(ROM || (ROM = {}));
