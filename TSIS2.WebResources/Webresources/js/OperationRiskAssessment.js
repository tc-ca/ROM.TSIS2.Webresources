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
            console.log("Site Assessment Guidance Value: ", siteAssessmentGuidance);
            // Show the section named "tab_2_section_5" if siteAssessmentGuidance is "Yes" 
            if (siteAssessmentGuidance === true) {
                form.ui.tabs.get("tab_2").sections.get("tab_2_section_5").setVisible(false);
            }
            else {
                form.ui.tabs.get("tab_2").sections.get("tab_2_section_5").setVisible(true);
            }
        }
        OperationRiskAssessment.hideSiteAssessmentGuidance = hideSiteAssessmentGuidance;
    })(OperationRiskAssessment = ROM.OperationRiskAssessment || (ROM.OperationRiskAssessment = {}));
})(ROM || (ROM = {}));
