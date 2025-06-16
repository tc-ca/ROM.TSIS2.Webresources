namespace ROM.OperationRiskAssessment {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_operationriskassessment.Main.Information>eContext.getFormContext();
        const riskThresholdFrench = form.getControl("ts_riskthresholdfrench");
        const riskThresholdEnglish = form.getControl("ts_riskthresholdenglish");

        Xrm.Utility.getGlobalContext().userSettings.languageId == 1033 ? riskThresholdEnglish.setVisible(true) : riskThresholdFrench.setVisible(true);

    }

    export function hideSiteAssessmentGuidance(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_operationriskassessment.Main.Information>eContext.getFormContext();
        const siteAssessmentGuidance = form.getAttribute("ts_siteassessmentguidance")?.getValue();
        console.log("Site Assessment Guidance Value: ", siteAssessmentGuidance);

        // Show the section named "tab_2_section_5" if siteAssessmentGuidance is "Yes" 
        if (siteAssessmentGuidance === false) {
            form.ui.tabs.get("tab_2").sections.get("tab_2_section_5").setVisible(false);
        } else {
            form.ui.tabs.get("tab_2").sections.get("tab_2_section_5").setVisible(true);
        }
    }
}