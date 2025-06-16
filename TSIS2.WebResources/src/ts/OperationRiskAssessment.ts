namespace ROM.OperationRiskAssessment {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_operationriskassessment.Main.Information>eContext.getFormContext();
        const riskThresholdFrench = form.getControl("ts_riskthresholdfrench");
        const riskThresholdEnglish = form.getControl("ts_riskthresholdenglish");

        Xrm.Utility.getGlobalContext().userSettings.languageId == 1033 ? riskThresholdEnglish.setVisible(true) : riskThresholdFrench.setVisible(true);

    }

    export function hideSiteAssessmentGuidance(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_operationriskassessment.Main.Information>eContext.getFormContext();
        let siteAssessmentGuidance = form.getAttribute("ts_siteassessmentguidance")?.getValue();
        let webResourceSiteAssessmentGuidance = form.getControl("WebResource_siteAssessmentGuide");
        console.log("Site Assessment Guidance Value: ", siteAssessmentGuidance);

        // Show webresource if siteAssessmentGuidance is "Yes" 
        if (siteAssessmentGuidance === true) {
            webResourceSiteAssessmentGuidance.setVisible(true);
        } else {
            webResourceSiteAssessmentGuidance.setVisible(false);
        }
    }
}