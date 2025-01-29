"use strict";
var ROM;
(function (ROM) {
    var OperationActivityRiskScores;
    (function (OperationActivityRiskScores) {
        function onLoad(eContext) {
            var formContext = eContext.getFormContext();
            console.log("Entering onLoad");
        }
        OperationActivityRiskScores.onLoad = onLoad;
        function onSave(eContext) {
            var formContext = eContext.getFormContext();
            console.log("Entering onSave");
        }
        OperationActivityRiskScores.onSave = onSave;
    })(OperationActivityRiskScores = ROM.OperationActivityRiskScores || (ROM.OperationActivityRiskScores = {}));
})(ROM || (ROM = {}));
