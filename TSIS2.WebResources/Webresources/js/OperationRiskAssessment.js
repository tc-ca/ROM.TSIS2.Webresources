"use strict";
var ROM;
(function (ROM) {
    var OperationRiskAssessment;
    (function (OperationRiskAssessment) {
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            var riskThresholdFrench = form.getControl("ts_riskthresholdfrench");
            var riskThresholdEnglish = form.getControl("ts_riskthresholdenglish");
            Xrm.Utility.getGlobalContext().userSettings.languageId == 1033 ? riskThresholdEnglish.setVisible(true) : riskThresholdFrench.setVisible(true);
        }
        OperationRiskAssessment.onLoad = onLoad;
    })(OperationRiskAssessment = ROM.OperationRiskAssessment || (ROM.OperationRiskAssessment = {}));
})(ROM || (ROM = {}));
