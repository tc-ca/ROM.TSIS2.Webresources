namespace ROM.OperationRiskAssessment {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_operationriskassessment.Main.Information>eContext.getFormContext();
        const riskThresholdFrench = form.getControl("ts_riskthresholdfrench");
        const riskThresholdEnglish = form.getControl("ts_riskthresholdenglish");

        Xrm.Utility.getGlobalContext().userSettings.languageId == 1033 ? riskThresholdEnglish.setVisible(true) : riskThresholdFrench.setVisible(false);

    }
}