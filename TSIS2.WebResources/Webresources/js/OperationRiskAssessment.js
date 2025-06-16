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
        function hideSiteAssessmentGuidance(eContext) {
            var _a;
            var form = eContext.getFormContext();
            var siteAssessmentGuidance = (_a = form.getAttribute("ts_siteassessmentguidance")) === null || _a === void 0 ? void 0 : _a.getValue();
            var webResourceSiteAssessmentGuidance = form.getControl("WebResource_siteAssessmentGuide");
            console.log("Site Assessment Guidance Value: ", siteAssessmentGuidance);
            // Show webresource if siteAssessmentGuidance is "Yes" 
            if (siteAssessmentGuidance === true) {
                webResourceSiteAssessmentGuidance.setVisible(true);
            }
            else {
                webResourceSiteAssessmentGuidance.setVisible(false);
            }
        }
        OperationRiskAssessment.hideSiteAssessmentGuidance = hideSiteAssessmentGuidance;
    })(OperationRiskAssessment = ROM.OperationRiskAssessment || (ROM.OperationRiskAssessment = {}));
})(ROM || (ROM = {}));
