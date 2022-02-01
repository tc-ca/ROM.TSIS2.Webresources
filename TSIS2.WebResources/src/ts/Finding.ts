namespace ROM.Finding {

    //If all NCAT Fields are set, calculate and set the recommended enforcement
    export async function NCATFieldOnChange(eContext: Xrm.ExecutionContext<any, any>): Promise<boolean> {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();

        let factor1Value = formContext.getAttribute("ts_ncatactualorpotentialharm").getValue();
        let factor2Value = formContext.getAttribute("ts_ncatcompliancehistory").getValue();
        let factor3Value = formContext.getAttribute("ts_ncatcooperationwithinspectionorinvestigat").getValue();
        let factor4Value = formContext.getAttribute("ts_ncatdetectionofnoncompliances").getValue();
        let factor5Value = formContext.getAttribute("ts_ncateconomicbenefit").getValue();
        let factor6Value = formContext.getAttribute("ts_ncatintentionality").getValue();
        let factor7Value = formContext.getAttribute("ts_ncatmitigationofnoncompliantbehaviors").getValue();

        if (factor1Value == null || factor2Value == null || factor3Value == null || factor4Value == null || factor5Value == null || factor6Value == null || factor7Value == null) {
            formContext.getAttribute("ts_ncatenforcementrecommendation").setValue(null);
            formContext.getAttribute("ts_acceptncatrecommendation").setValue(null);
            formContext.getAttribute("ts_ncatinspectorrecommendation").setValue(null);
            formContext.getControl("ts_acceptncatrecommendation").setVisible(false);
            return true;
        }

        let factor1AssessmentRatingId = factor1Value[0].id;
        let factor2AssessmentRatingId = factor2Value[0].id;
        let factor3AssessmentRatingId = factor3Value[0].id;
        let factor4AssessmentRatingId = factor4Value[0].id;
        let factor5AssessmentRatingId = factor5Value[0].id;
        let factor6AssessmentRatingId = factor6Value[0].id;
        let factor7AssessmentRatingId = factor7Value[0].id;

        let factor1AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor1AssessmentRatingId, "?$select=ts_weight");
        let factor2AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor2AssessmentRatingId, "?$select=ts_weight");
        let factor3AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor3AssessmentRatingId, "?$select=ts_weight");
        let factor4AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor4AssessmentRatingId, "?$select=ts_weight");
        let factor5AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor5AssessmentRatingId, "?$select=ts_weight");
        let factor6AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor6AssessmentRatingId, "?$select=ts_weight");
        let factor7AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor7AssessmentRatingId, "?$select=ts_weight");

        await Promise.all([factor1AssessmentRatingPromise, factor2AssessmentRatingPromise, factor3AssessmentRatingPromise, factor4AssessmentRatingPromise, factor5AssessmentRatingPromise, factor6AssessmentRatingPromise, factor7AssessmentRatingPromise]).then((factorPromises) => {
            let totalWeight = 0
            for (let i = 0; i < factorPromises.length; i++) {
                totalWeight += factorPromises[i].ts_weight;
            }

            let enforcementResponseChoiceNumber;
            let inspectorRecommendationControl = formContext.getControl("ts_ncatinspectorrecommendation");
            inspectorRecommendationControl.removeOption(717750000);
            inspectorRecommendationControl.removeOption(717750001);
            inspectorRecommendationControl.removeOption(717750002);
            let verbalnWarningOption = { text: "Verbal Warning", value: 717750000 }
            let writtenWarningOption = { text: "Written Warning", value: 717750001 }
            let referralOption = { text: "Referral to CEE", value: 717750002 }
            if (totalWeight <= 19) {
                //Verbal Warning
                enforcementResponseChoiceNumber = 717750000;
                inspectorRecommendationControl.addOption(writtenWarningOption);
                inspectorRecommendationControl.addOption(referralOption);
            } else if (totalWeight > 19 && totalWeight <= 55) {
                //Written Warning
                enforcementResponseChoiceNumber = 717750001;
                inspectorRecommendationControl.addOption(verbalnWarningOption);
                inspectorRecommendationControl.addOption(referralOption);
            } else if (totalWeight > 55) {
                //Referral to CEE
                enforcementResponseChoiceNumber = 717750002;
                inspectorRecommendationControl.addOption(verbalnWarningOption);
                inspectorRecommendationControl.addOption(writtenWarningOption);
            }

            formContext.getAttribute("ts_ncatenforcementrecommendation").setValue(enforcementResponseChoiceNumber);
            formContext.getControl("ts_acceptncatrecommendation").setVisible(true);
            formContext.getAttribute("ts_ncatinspectorrecommendation").setValue(null);
        });

        return true;
    }
}