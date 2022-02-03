namespace ROM.Finding {
    let lang = Xrm.Utility.getGlobalContext().userSettings.languageId;

    let verbalWarningLocalizedText = "Verbal Warning";
    let writtenWarningLocalizedText = "Written Warning";
    let referralToCEELocalizedText = "Referral to CEE";

    if (lang == 1036) {
        verbalWarningLocalizedText = "Avertissement verbal";
        writtenWarningLocalizedText = "Avertissement écrit";
        referralToCEELocalizedText = "Renvoi au CEAL";
    }

    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        //If Observation, keep everything hidden
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();
        let findingType = formContext.getAttribute("ts_findingtype").getValue();

        //If findingType is not Non-Compliance
        if (findingType != 717750002) return;

        let userId = Xrm.Utility.getGlobalContext().userSettings.userId;
        let currentUserBusinessUnitFetchXML = [
            "<fetch top='50'>",
            "  <entity name='businessunit'>",
            "    <attribute name='name' />",
            "    <attribute name='businessunitid' />",
            "    <link-entity name='systemuser' from='businessunitid' to='businessunitid'>",
            "      <filter>",
            "        <condition attribute='systemuserid' operator='eq' value='", userId, "'/>",
            "      </filter>",
            "    </link-entity>",
            "  </entity>",
            "</fetch>",
        ].join("");
        currentUserBusinessUnitFetchXML = "?fetchXml=" + encodeURIComponent(currentUserBusinessUnitFetchXML);
        Xrm.WebApi.retrieveMultipleRecords("businessunit", currentUserBusinessUnitFetchXML).then(function (result) {
            let userBusinessUnitId = result.entities[0].businessunitid;

            const transportCanadaId = "c6432c33-29a1-eb11-b1ac-000d3ae8bbe0";
            const avsecId = "6cb920a0-baa3-eb11-b1ac-000d3ae8b98c";
            const issoId = "4ff4b827-bead-eb11-8236-000d3ae8b866";
            //Show NCAT Sections and fields when the user is in Transport Canada or ISSO business unit
            if (userBusinessUnitId == transportCanadaId || userBusinessUnitId == issoId) {
                formContext.ui.tabs.get("summary").sections.get("NCAT_main_section").setVisible(true);
                formContext.getControl("ts_ncatfinalenforcementaction").setVisible(true);
                NCATEnforcementRecommendationOnChange(eContext);
                //If they did not accept the ncat recommendation, show proposal sections and fields
                if (formContext.getAttribute("ts_acceptncatrecommendation").getValue() == 717750001)  { 
                    formContext.ui.tabs.get("summary").sections.get("NCAT_proposed_section").setVisible(true);
                    AcceptNCATRecommendationOnChange(eContext);
                }
            }
            //Show RATE Sections and fields when the user is in Transport Canada or ISSO business unit
            if (userBusinessUnitId == transportCanadaId || userBusinessUnitId == avsecId) {
                formContext.ui.tabs.get("summary").sections.get("RATE_main_section").setVisible(true);
                formContext.getControl("ts_ratefinalenforcementaction").setVisible(true);
                RATEEnforcementRecommendationOnChange(eContext);
                //If they did not accept the rate recommendation, show proposal sections and fields
                if (formContext.getAttribute("ts_acceptraterecommendation").getValue() == 717750001) {
                    formContext.ui.tabs.get("summary").sections.get("RATE_proposed_section").setVisible(true);
                    AcceptRATERecommendationOnChange(eContext);
                }
            }
        });
    }
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

        //If any of the ncat factors don't have a value, reset any fields that require an enforcement recommendation
        if (factor1Value == null || factor2Value == null || factor3Value == null || factor4Value == null || factor5Value == null || factor6Value == null || factor7Value == null) {
            formContext.getAttribute("ts_ncatenforcementrecommendation").setValue(null);

            formContext.getAttribute("ts_acceptncatrecommendation").setValue(null);

            formContext.getAttribute("ts_ncatinspectorrecommendation").setRequiredLevel("none");
            formContext.getAttribute("ts_ncatinspectorrecommendation").setValue(null);
            formContext.getControl("ts_ncatinspectorrecommendation").setVisible(false);

            formContext.getAttribute("ts_ncatenforcementjustification").setRequiredLevel("none");
            formContext.getAttribute("ts_ncatenforcementjustification").setValue(null);
            formContext.getControl("ts_ncatenforcementjustification").setVisible(false);
            
            
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

        //Retrieve the assessment ratings that were set to the ncat factors
        let factor1AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor1AssessmentRatingId, "?$select=ts_weight");
        let factor2AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor2AssessmentRatingId, "?$select=ts_weight");
        let factor3AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor3AssessmentRatingId, "?$select=ts_weight");
        let factor4AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor4AssessmentRatingId, "?$select=ts_weight");
        let factor5AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor5AssessmentRatingId, "?$select=ts_weight");
        let factor6AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor6AssessmentRatingId, "?$select=ts_weight");
        let factor7AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor7AssessmentRatingId, "?$select=ts_weight");

        //Wait for all factors the retrieve, then calculate and set the enforcement recommendation
        await Promise.all([factor1AssessmentRatingPromise, factor2AssessmentRatingPromise, factor3AssessmentRatingPromise, factor4AssessmentRatingPromise, factor5AssessmentRatingPromise, factor6AssessmentRatingPromise, factor7AssessmentRatingPromise]).then((factorPromises) => {
            let totalWeight = 0
            for (let i = 0; i < factorPromises.length; i++) {
                totalWeight += factorPromises[i].ts_weight;
            }

            let enforcementResponseChoiceNumber;
            if (totalWeight <= 19) {
                //Verbal Warning
                enforcementResponseChoiceNumber = 717750000;
                //Written Warning
                enforcementResponseChoiceNumber = 717750001;
            } else if (totalWeight > 55) {
                //Referral to CEE
                enforcementResponseChoiceNumber = 717750002;
            }

            formContext.getAttribute("ts_ncatenforcementrecommendation").setValue(enforcementResponseChoiceNumber);
            formContext.getControl("ts_acceptncatrecommendation").setVisible(true);
            formContext.getAttribute("ts_ncatinspectorrecommendation").setValue(null);
        });

        return true;
    }

    //If all RATE Fields are set, calculate and set the recommended enforcement
    export async function RATEFieldOnChange(eContext: Xrm.ExecutionContext<any, any>): Promise<boolean> {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();

        let factor1Value = formContext.getAttribute("ts_rateactualorpotentialharm").getValue();
        let factor2Value = formContext.getAttribute("ts_ratecompliancehistory").getValue();
        let factor3Value = formContext.getAttribute("ts_ratecooperationwithinspectionorinvestigat").getValue();
        let factor4Value = formContext.getAttribute("ts_ratedetectionofnoncompliances").getValue();
        let factor5Value = formContext.getAttribute("ts_rateeconomicbenefit").getValue();
        let factor6Value = formContext.getAttribute("ts_rateintentionality").getValue();
        let factor7Value = formContext.getAttribute("ts_ratemitigationofnoncompliantbehaviors").getValue();

        //If any of the rate factors don't have a value, reset any fields that require an enforcement recommendation
        if (factor1Value == null || factor2Value == null || factor3Value == null || factor4Value == null || factor5Value == null || factor6Value == null || factor7Value == null) {
            formContext.getAttribute("ts_rateenforcementrecommendation").setValue(null);

            formContext.getAttribute("ts_acceptraterecommendation").setValue(null);

            formContext.getAttribute("ts_rateinspectorrecommendation").setRequiredLevel("none");
            formContext.getAttribute("ts_rateinspectorrecommendation").setValue(null);
            formContext.getControl("ts_rateinspectorrecommendation").setVisible(false);

            formContext.getAttribute("ts_rateenforcementjustification").setRequiredLevel("none");
            formContext.getAttribute("ts_rateenforcementjustification").setValue(null);
            formContext.getControl("ts_rateenforcementjustification").setVisible(false);


            formContext.getControl("ts_acceptraterecommendation").setVisible(false);
            return true;
        }

        let factor1AssessmentRatingId = factor1Value[0].id;
        let factor2AssessmentRatingId = factor2Value[0].id;
        let factor3AssessmentRatingId = factor3Value[0].id;
        let factor4AssessmentRatingId = factor4Value[0].id;
        let factor5AssessmentRatingId = factor5Value[0].id;
        let factor6AssessmentRatingId = factor6Value[0].id;
        let factor7AssessmentRatingId = factor7Value[0].id;

        //Retrieve the assessment ratings that were set to the ncat factors
        let factor1AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor1AssessmentRatingId, "?$select=ts_weight");
        let factor2AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor2AssessmentRatingId, "?$select=ts_weight");
        let factor3AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor3AssessmentRatingId, "?$select=ts_weight");
        let factor4AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor4AssessmentRatingId, "?$select=ts_weight");
        let factor5AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor5AssessmentRatingId, "?$select=ts_weight");
        let factor6AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor6AssessmentRatingId, "?$select=ts_weight");
        let factor7AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor7AssessmentRatingId, "?$select=ts_weight");

        //Wait for all factors the retrieve, then calculate and set the enforcement recommendation
        await Promise.all([factor1AssessmentRatingPromise, factor2AssessmentRatingPromise, factor3AssessmentRatingPromise, factor4AssessmentRatingPromise, factor5AssessmentRatingPromise, factor6AssessmentRatingPromise, factor7AssessmentRatingPromise]).then((factorPromises) => {
            let totalWeight = 0
            for (let i = 0; i < factorPromises.length; i++) {
                totalWeight += factorPromises[i].ts_weight;
            }

            let enforcementResponseChoiceNumber;
            if (totalWeight <= 19) {
                //Verbal Warning
                enforcementResponseChoiceNumber = 717750000;
            } else if (totalWeight > 19 && totalWeight <= 55) {
                //Written Warning
                enforcementResponseChoiceNumber = 717750001;
            } else if (totalWeight > 55) {
                //Referral to CEE
                enforcementResponseChoiceNumber = 717750002;
            }

            formContext.getAttribute("ts_rateenforcementrecommendation").setValue(enforcementResponseChoiceNumber);
            formContext.getControl("ts_acceptraterecommendation").setVisible(true);
            formContext.getAttribute("ts_rateinspectorrecommendation").setValue(null);
        });

        return true;
    }

    export function AcceptNCATRecommendationOnChange(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();
        let acceptNCATRecommendation = formContext.getAttribute("ts_acceptncatrecommendation").getValue();

        //If they did not accept the NCAT recommendation
        if (acceptNCATRecommendation == 717750001) {
            //Show Inspector Recommendation
            formContext.getControl("ts_ncatinspectorrecommendation").setVisible(true);
            //Require Inspector Recommendation
            formContext.getAttribute("ts_ncatinspectorrecommendation").setRequiredLevel("required");
            //Show Enforcement Justification
            formContext.getControl("ts_ncatenforcementjustification").setVisible(true);
            //Require Enforcement Justification
            formContext.getAttribute("ts_ncatenforcementjustification").setRequiredLevel("required");

            let enforcementRecommendation = formContext.getAttribute("ts_ncatenforcementrecommendation").getValue();

            let inspectorRecommendationControl = formContext.getControl("ts_ncatinspectorrecommendation");
            inspectorRecommendationControl.removeOption(717750000);
            inspectorRecommendationControl.removeOption(717750001);
            inspectorRecommendationControl.removeOption(717750002);
            let verbalnWarningOption = { text: verbalWarningLocalizedText, value: 717750000 }
            let writtenWarningOption = { text: writtenWarningLocalizedText, value: 717750001 }
            let referralOption = { text: referralToCEELocalizedText, value: 717750002 }

            if (enforcementRecommendation == 717750000) {
                //Verbal Warning
                inspectorRecommendationControl.addOption(writtenWarningOption);
                inspectorRecommendationControl.addOption(referralOption);
            } else if (enforcementRecommendation == 717750001) {
                //Written Warning
                inspectorRecommendationControl.addOption(verbalnWarningOption);
                inspectorRecommendationControl.addOption(referralOption);
            } else if (enforcementRecommendation == 717750002) {
                //Referral to CEE
                inspectorRecommendationControl.addOption(verbalnWarningOption);
                inspectorRecommendationControl.addOption(writtenWarningOption);
            }
        } else {
            //Clear Inspector Recommendation
            formContext.getAttribute("ts_ncatinspectorrecommendation").setValue(null);
            //Hide Inspector Recommendation
            formContext.getControl("ts_ncatinspectorrecommendation").setVisible(false);
            //Not Require Inspector Recommendation
            formContext.getAttribute("ts_ncatinspectorrecommendation").setRequiredLevel("none");

            //Clear Enforcement Justification
            formContext.getAttribute("ts_ncatenforcementjustification").setValue(null);
            //Hide Enforcement Justification
            formContext.getControl("ts_ncatenforcementjustification").setVisible(false);
            //Not Require Enforcement Justification
            formContext.getAttribute("ts_ncatenforcementjustification").setRequiredLevel("none");
        }
    }

    export function AcceptRATERecommendationOnChange(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();
        let acceptRATERecommendation = formContext.getAttribute("ts_acceptraterecommendation").getValue();

        //If they did not accept the RATE recommendation
        if (acceptRATERecommendation == 717750001) {
            //Show Inspector Recommendation
            formContext.getControl("ts_rateinspectorrecommendation").setVisible(true);
            //Require Inspector Recommendation
            formContext.getAttribute("ts_rateinspectorrecommendation").setRequiredLevel("required");
            //Show Enforcement Justification
            formContext.getControl("ts_rateenforcementjustification").setVisible(true);
            //Require Enforcement Justification
            formContext.getAttribute("ts_rateenforcementjustification").setRequiredLevel("required");

            let enforcementRecommendation = formContext.getAttribute("ts_rateenforcementrecommendation").getValue();

            let inspectorRecommendationControl = formContext.getControl("ts_rateinspectorrecommendation");
            inspectorRecommendationControl.removeOption(717750000);
            inspectorRecommendationControl.removeOption(717750001);
            inspectorRecommendationControl.removeOption(717750002);
            let verbalnWarningOption = { text: verbalWarningLocalizedText, value: 717750000 }
            let writtenWarningOption = { text: writtenWarningLocalizedText, value: 717750001 }
            let referralOption = { text: referralToCEELocalizedText, value: 717750002 }

            if (enforcementRecommendation == 717750000) {
                //Verbal Warning
                inspectorRecommendationControl.addOption(writtenWarningOption);
                inspectorRecommendationControl.addOption(referralOption);
            } else if (enforcementRecommendation == 717750001) {
                //Written Warning
                inspectorRecommendationControl.addOption(verbalnWarningOption);
                inspectorRecommendationControl.addOption(referralOption);
            } else if (enforcementRecommendation == 717750002) {
                //Referral to CEE
                inspectorRecommendationControl.addOption(verbalnWarningOption);
                inspectorRecommendationControl.addOption(writtenWarningOption);
            }
        } else {
            //Clear Inspector Recommendation
            formContext.getAttribute("ts_rateinspectorrecommendation").setValue(null);
            //Hide Inspector Recommendation
            formContext.getControl("ts_rateinspectorrecommendation").setVisible(false);
            //Not Require Inspector Recommendation
            formContext.getAttribute("ts_rateinspectorrecommendation").setRequiredLevel("none");

            //Clear Enforcement Justification
            formContext.getAttribute("ts_rateenforcementjustification").setValue(null);
            //Hide Enforcement Justification
            formContext.getControl("ts_rateenforcementjustification").setVisible(false);
            //Not Require Enforcement Justification
            formContext.getAttribute("ts_rateenforcementjustification").setRequiredLevel("none");
        }
    }

    export function NCATEnforcementRecommendationOnChange(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();
        let NCATEnforcementRecommendation = formContext.getAttribute("ts_ncatenforcementrecommendation").getValue();
        if (NCATEnforcementRecommendation != null) {
            //Show Accept NCAT Recommendation
            formContext.getControl("ts_acceptncatrecommendation").setVisible(true);
        } else {
            //Hide Accept NCAT Recommendation
            formContext.getControl("ts_acceptncatrecommendation").setVisible(false);
            //Clear Accept NCAT Recommendation
            formContext.getAttribute("ts_acceptncatrecommendation").setValue(null);
        }
    }

    export function RATEEnforcementRecommendationOnChange(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();
        let RATEEnforcementRecommendation = formContext.getAttribute("ts_rateenforcementrecommendation").getValue();
        if (RATEEnforcementRecommendation != null) {
            //Show Accept RATE Recommendation
            formContext.getControl("ts_acceptraterecommendation").setVisible(true);
        } else {
            //Hide Accept RATE Recommendation
            formContext.getControl("ts_acceptraterecommendation").setVisible(false);
            //Clear Accept RATE Recommendation
            formContext.getAttribute("ts_acceptraterecommendation").setValue(null);
        }
    }
}