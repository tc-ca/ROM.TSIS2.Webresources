namespace ROM.Finding {

    let lang = Xrm.Utility.getGlobalContext().userSettings.languageId;

    //Toggle visibility of NCAT and RATE sections depending user business unit and rolls
    //Sets field Controls parameters (required, hidden, disabled, etc) depending on current form state
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        //If Observation, keep everything hidden
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();
        let findingType = formContext.getAttribute("ts_findingtype").getValue();              
        if (findingType != ts_findingtype.Noncompliance) return;
       
        formContext.getAttribute("ts_ncatfactorguide").setValue(false);

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
            let userBusinessUnitName = result.entities[0].name;

            //Show NCAT Sections and fields when the user is in Transport Canada or ISSO business unit
            if (userBusinessUnitName.startsWith("Transport") || userBusinessUnitName.startsWith("Intermodal")) {
                formContext.ui.tabs.get("tab_NCAT").setVisible(true);
                NCATEnforcementRecommendationOnChange(eContext);
                //If they did not accept the ncat recommendation, show proposal sections and fields
                if (formContext.getAttribute("ts_acceptncatrecommendation").getValue() == ts_yesno.No) {
                    formContext.ui.tabs.get("tab_NCAT").sections.get("NCAT_proposed_section").setVisible(true);
                    setPostNCATRecommendationSelectionFieldsVisibilityAndSetFinalEnforcementAction(eContext);
                    NCATManagerDecisionOnChange(eContext);
                }
            }
            //Show RATE Sections and fields when the user is in Transport Canada or Aviation Security business unit
            if (userBusinessUnitName.startsWith("Transport") || userBusinessUnitName.startsWith("Aviation")) {
                formContext.ui.tabs.get("tab_RATE").setVisible(true);
                RATEEnforcementRecommendationOnChange(eContext);
                //If they did not accept the rate recommendation, show proposal sections and fields
                if (formContext.getAttribute("ts_acceptraterecommendation").getValue() == ts_yesno.No) {
                    formContext.ui.tabs.get("tab_RATE").sections.get("RATE_proposed_section").setVisible(true);
                    setPostRATERecommendationSelectionFieldsVisibilityAndSetFinalEnforcementAction(eContext);
                    RATEManagerDecisionOnChange(eContext);
                }
            }
        });
        RATESpecificComplianceHistoryOnChange(eContext);
        setApprovingTeamsViews(formContext); 
        setApprovingManagersViews(formContext);

        if (formContext.getAttribute("statuscode").getValue() == ovs_finding_statuscode.Complete) {
            disableFormFields(formContext);
        }
    }

    export function onSave(eContext: Xrm.ExecutionContext<any, any>): void {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();
        const statusCodeAttribute = formContext.getAttribute("statuscode");
        const statusCodeValue = statusCodeAttribute.getValue();
        onLoad(eContext);
        if (statusCodeValue == ovs_finding_statuscode.Complete) return;

        const acceptNCATRecommendation = formContext.getAttribute("ts_acceptncatrecommendation").getValue();
        const acceptRATERecommendation = formContext.getAttribute("ts_acceptraterecommendation").getValue();
        const rejectedRecommendation = (acceptNCATRecommendation == ts_yesno.No || acceptRATERecommendation == ts_yesno.No)

        if (rejectedRecommendation) {
            statusCodeAttribute.setValue(ovs_finding_statuscode.Pending)
        } else {
            statusCodeAttribute.setValue(ovs_finding_statuscode.InProgress)
        }
    }

    //If all NCAT Fields are set, calculate and set the recommended enforcement
    export async function NCATFieldOnChange(eContext: Xrm.ExecutionContext<any, any>): Promise<boolean> {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();

        //A factor has changed, so everything below needs to be reset
        formContext.getAttribute("ts_ncatenforcementrecommendation").setValue(null);
        formContext.getAttribute("ts_acceptncatrecommendation").setValue(null);
        formContext.getControl("ts_acceptncatrecommendation").setDisabled(true);
        NCATHideProposedSection(eContext);

        const factor1Value = formContext.getAttribute("ts_ncatactualorpotentialharm").getValue();
        const factor2Value = formContext.getAttribute("ts_ncatcompliancehistory").getValue();
        const factor3Value = formContext.getAttribute("ts_ncatcooperationwithinspectionorinvestigat").getValue();
        const factor4Value = formContext.getAttribute("ts_ncatdetectionofnoncompliances").getValue();
        const factor5Value = formContext.getAttribute("ts_ncateconomicbenefit").getValue();
        const factor6Value = formContext.getAttribute("ts_ncatintentionality").getValue();
        const factor7Value = formContext.getAttribute("ts_ncatmitigationofnoncompliantbehaviors").getValue();

        //If any of the ncat factors don't have a value, reset any fields that require an enforcement recommendation
        if (factor1Value == null || factor2Value == null || factor3Value == null || factor4Value == null || factor5Value == null || factor6Value == null || factor7Value == null) {
            
            return true;
        }

        const factor1AssessmentRatingId = factor1Value[0].id;
        const factor2AssessmentRatingId = factor2Value[0].id;
        const factor3AssessmentRatingId = factor3Value[0].id;
        const factor4AssessmentRatingId = factor4Value[0].id;
        const factor5AssessmentRatingId = factor5Value[0].id;
        const factor6AssessmentRatingId = factor6Value[0].id;
        const factor7AssessmentRatingId = factor7Value[0].id;

        //Retrieve the assessment ratings that were set to the ncat factors
        const factor1AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor1AssessmentRatingId, "?$select=ts_weight");
        const factor2AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor2AssessmentRatingId, "?$select=ts_weight");
        const factor3AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor3AssessmentRatingId, "?$select=ts_weight");
        const factor4AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor4AssessmentRatingId, "?$select=ts_weight");
        const factor5AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor5AssessmentRatingId, "?$select=ts_weight");
        const factor6AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor6AssessmentRatingId, "?$select=ts_weight");
        const factor7AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor7AssessmentRatingId, "?$select=ts_weight");

        //Retrieve the enforcement thresholds for NCAT
        let thresholdsPromise = Xrm.WebApi.retrieveMultipleRecords("ts_assessmentscorethredshots", `?$select=ts_minimum,ts_maximum,ts_ncatenforcementaction&$filter=ts_assessmenttool eq ${ts_assessmenttool.NCAT}`);

        //Wait for all factors the retrieve, then calculate and set the enforcement recommendation
        await Promise.all([factor1AssessmentRatingPromise, factor2AssessmentRatingPromise, factor3AssessmentRatingPromise, factor4AssessmentRatingPromise, factor5AssessmentRatingPromise, factor6AssessmentRatingPromise, factor7AssessmentRatingPromise, thresholdsPromise]).then((factorPromises) => {

            let totalWeight = 0
            for (let i = 0; i < 7; i++) { //The first 7 are the assessment ratings
                totalWeight += factorPromises[i].ts_weight;
            }

            let enforcementResponseChoiceNumber = null;

            //Loop through all the thresholds, if the total weight is between a min and max, set its enforcement action to the enforcement recommendation
            for (let threshold of factorPromises[7].entities) {

                const min = threshold.ts_minimum;
                const max = threshold.ts_maximum;

                if (totalWeight >= min && totalWeight <= max) {
                    enforcementResponseChoiceNumber = threshold.ts_ncatenforcementaction;
                    break;
                }
            }

            formContext.getAttribute("ts_ncatenforcementrecommendation").setValue(enforcementResponseChoiceNumber);
            formContext.getControl("ts_acceptncatrecommendation").setDisabled(false);
            formContext.getAttribute("ts_ncatinspectorrecommendation").setValue(null);
        });

        return true;
    }
    //Show/hide NCAT Factor Guide
    export function NCATFactorGuideOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();
        let NCATFactorGuide = formContext.getAttribute("ts_ncatfactorguide").getValue();
        let webResourceNCATFactorGuide = formContext.getControl("WebResource_NCATFactorGuide");
        if (NCATFactorGuide)
            webResourceNCATFactorGuide.setVisible(true);
        else
            webResourceNCATFactorGuide.setVisible(false);
    }
    //If all RATE Fields are set, calculate and set the recommended enforcement
    export async function RATEFieldOnChange(eContext: Xrm.ExecutionContext<any, any>): Promise<boolean> {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();

        //A factor has changed, so everything below needs to be reset
        formContext.getAttribute("ts_rateenforcementrecommendation").setValue(null);
        formContext.getAttribute("ts_acceptraterecommendation").setValue(null);
        formContext.getControl("ts_acceptraterecommendation").setDisabled(true);
        RATEHideProposedSection(eContext);

        calculateRATEEnforcementRecommendation(eContext);

        return true
    }

    //Calculate and set an Enforcement Recommendation with all RATE factors
    async function calculateRATEEnforcementRecommendation(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();

        const rateSpecificComplianceHistory = formContext.getAttribute("ts_ratespecificcompliancehistory").getValue();
        const factor1Value = formContext.getAttribute("ts_rategeneralcompliancehistory").getValue();
        const factor2Value = formContext.getAttribute("ts_rateactualorpotentialharm").getValue();
        const factor3Value = formContext.getAttribute("ts_rateresponsibility").getValue();
        const factor4Value = formContext.getAttribute("ts_ratemitigationofnoncompliantbehaviors").getValue();
        const factor5Value = formContext.getAttribute("ts_ratepreventingrecurrence").getValue();
        const factor6Value = formContext.getAttribute("ts_rateintentionality").getValue();
        const factor7Value = formContext.getAttribute("ts_rateeconomicbenefit").getValue();
        const factor8Value = formContext.getAttribute("ts_ratecooperationwithinspectionorinvestigat").getValue();

        const complianceHistory = formContext.getAttribute("ts_ratespecificcompliancehistory").getValue()
        let enforcementHistory = formContext.getAttribute("ts_ratespecificenforcementhistory").getValue();

        //If any of the rate factors don't have a value, reset any fields that require an enforcement recommendation
        if (rateSpecificComplianceHistory == null || factor1Value == null || factor2Value == null || factor3Value == null || factor4Value == null || factor5Value == null || factor6Value == null || factor7Value == null || factor8Value == null || ((complianceHistory != null && complianceHistory != ts_ratespecificcompliancehistory._0documentedpreviousidenticalorsimilarnoncompliances) && enforcementHistory == null)) {
            formContext.getAttribute("ts_rateenforcementrecommendation").setValue(null);
            formContext.getAttribute("ts_acceptraterecommendation").setValue(null);
            RATEHideProposedSection(eContext);
            return true;
        }

        const factor1AssessmentRatingId = factor1Value[0].id;
        const factor2AssessmentRatingId = factor2Value[0].id;
        const factor3AssessmentRatingId = factor3Value[0].id;
        const factor4AssessmentRatingId = factor4Value[0].id;
        const factor5AssessmentRatingId = factor5Value[0].id;
        const factor6AssessmentRatingId = factor6Value[0].id;
        const factor7AssessmentRatingId = factor7Value[0].id;
        const factor8AssessmentRatingId = factor8Value[0].id;

        //Retrieve the assessment ratings that were set to the rate factors
        const factor1AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor1AssessmentRatingId, "?$select=ts_weight");
        const factor2AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor2AssessmentRatingId, "?$select=ts_weight");
        const factor3AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor3AssessmentRatingId, "?$select=ts_weight");
        const factor4AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor4AssessmentRatingId, "?$select=ts_weight");
        const factor5AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor5AssessmentRatingId, "?$select=ts_weight");
        const factor6AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor6AssessmentRatingId, "?$select=ts_weight");
        const factor7AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor7AssessmentRatingId, "?$select=ts_weight");
        const factor8AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor8AssessmentRatingId, "?$select=ts_weight");

        if (enforcementHistory == null) enforcementHistory = ts_ratespecificenforcementhistory.Nil;

        //Retrieve the enforcement thresholds for RATE
        let thresholdsPromise = Xrm.WebApi.retrieveMultipleRecords("ts_assessmentscorethredshots", `?$select=ts_minimum,ts_maximum,ts_rateenforcementaction&$filter=ts_assessmenttool eq ${ts_assessmenttool.RATE} and ts_rateenforcementhistory eq ${enforcementHistory}`);

        //Wait for all factors the retrieve, then calculate and set the enforcement recommendation
        await Promise.all([factor1AssessmentRatingPromise, factor2AssessmentRatingPromise, factor3AssessmentRatingPromise, factor4AssessmentRatingPromise, factor5AssessmentRatingPromise, factor6AssessmentRatingPromise, factor7AssessmentRatingPromise, factor8AssessmentRatingPromise, thresholdsPromise]).then((factorPromises) => {
            let totalWeight = 0
            for (let i = 0; i < 8; i++) { //The first 8 are the assessment ratings
                totalWeight += factorPromises[i].ts_weight;
            }

            let enforcementResponseChoiceNumber = null;

            //Loop through all the thresholds, if the total weight is between a min and max, set its enforcement action to the enforcement recommendation
            for (let threshold of factorPromises[8].entities) {

                const min = threshold.ts_minimum;
                const max = threshold.ts_maximum;

                if (totalWeight >= min && totalWeight <= max) {
                    enforcementResponseChoiceNumber = threshold.ts_rateenforcementaction;
                    break;
                }
            }

            formContext.getAttribute("ts_rateenforcementrecommendation").setValue(enforcementResponseChoiceNumber);
            formContext.getControl("ts_acceptraterecommendation").setDisabled(false);
            formContext.getAttribute("ts_rateinspectorrecommendation").setValue(null);
        });
    }

    //Sets the NCAT Final Enforcement Action to the recommended Enforcement if the user accepts
    //Reveals fields for user to suggest an alternative enforcement action if they do not accept the recommendation
    export function AcceptNCATRecommendationOnChange(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();
        const acceptNCATRecommendation = formContext.getAttribute("ts_acceptncatrecommendation").getValue();

        if (acceptNCATRecommendation == null) {
            NCATHideProposedSection(eContext);
            formContext.getAttribute("ts_finalenforcementaction").setValue(null);
        }

        //If the NCAT factors are all filled
        if(formContext.getAttribute("ts_ncatactualorpotentialharm").getValue() != null && formContext.getAttribute("ts_ncatintentionality").getValue() != null && formContext.getAttribute("ts_ncatcompliancehistory").getValue() != null && formContext.getAttribute("ts_ncateconomicbenefit").getValue() != null && formContext.getAttribute("ts_ncatmitigationofnoncompliantbehaviors").getValue() != null && formContext.getAttribute("ts_ncatcooperationwithinspectionorinvestigat").getValue() != null && formContext.getAttribute("ts_ncatdetectionofnoncompliances").getValue() != null && acceptNCATRecommendation != null){
           
            var confirmStrings = { text:"Placeholder Text. Fields will lock.", title:"Placeholder Title" };
            Xrm.Navigation.openConfirmDialog(confirmStrings).then(
            function (success) {    
                if (success.confirmed){
                    if (acceptNCATRecommendation == ts_yesno.Yes) {
                        //Set NCAT Final Enforcement Action to the Enforcement Recommendation
                        const enforcementRecommendation = formContext.getAttribute("ts_ncatenforcementrecommendation").getValue();
                        formContext.getAttribute("ts_finalenforcementaction").setValue(NCATEnforcementActionChoiceValueToFinalEnforcementActionChoiceValue(enforcementRecommendation));
                        NCATHideProposedSection(eContext);
                        NCATHideManagerReviewSection(eContext);
                    } else {
                        formContext.getAttribute("ts_finalenforcementaction").setValue(null);
                    }
                    formContext.data.save().then(function() {
                        setPostNCATRecommendationSelectionFieldsVisibilityAndSetFinalEnforcementAction(eContext);
                    });                    
                } else {
                    formContext.getAttribute("ts_acceptncatrecommendation").setValue(null);
                }
            });          
        }

       
    }

    //Sets the RATE Final Enforcement Action to the recommended Enforcement if the user accepts
    //Reveals fields for user to suggest an alternative enforcement action if they do not accept the recommendation
    export function AcceptRATERecommendationOnChange(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();
        const acceptRATERecommendation = formContext.getAttribute("ts_acceptraterecommendation").getValue();

        if (acceptRATERecommendation == null) {
            RATEHideProposedSection(eContext);
            formContext.getAttribute("ts_finalenforcementaction").setValue(null);
        }

        //If the NCAT factors are all filled
        if(formContext.getAttribute("ts_rateactualorpotentialharm").getValue() != null && formContext.getAttribute("ts_rateintentionality").getValue() != null && formContext.getAttribute("ts_rateeconomicbenefit").getValue() != null && formContext.getAttribute("ts_rateresponsibility").getValue() != null && formContext.getAttribute("ts_ratemitigationofnoncompliantbehaviors").getValue() != null && formContext.getAttribute("ts_ratepreventingrecurrence").getValue() != null && formContext.getAttribute("ts_ratecooperationwithinspectionorinvestigat").getValue() != null && acceptRATERecommendation != null){
           
            var confirmStrings = { text:"Placeholder Text. Fields will lock", title:"Placeholder Title." };
            Xrm.Navigation.openConfirmDialog(confirmStrings).then(
            function (success) {    
                    if (success.confirmed) {
                        if (acceptRATERecommendation == ts_yesno.Yes) {
                            //Set RATE Final Enforcement Action to the Enforcement Recommendation
                            let enforcementRecommendation = formContext.getAttribute("ts_rateenforcementrecommendation").getValue();
                            formContext.getAttribute("ts_finalenforcementaction").setValue(RATEEnforcementActionChoiceValueToFinalEnforcementActionChoiceValue(enforcementRecommendation));
                            RATEHideProposedSection(eContext);
                            RATEHideManagerReviewSection(eContext);
                        } else {
                            formContext.getAttribute("ts_finalenforcementaction").setValue(null);
                        }
                        formContext.data.save().then(function () {
                            setPostRATERecommendationSelectionFieldsVisibilityAndSetFinalEnforcementAction(eContext);
                        });
                    } else {
                        formContext.getAttribute("ts_acceptraterecommendation").setValue(null);
                    }
            });          
        }
    }

    //Make the Accept NCAT Recommendation field Visible if there is an Enforcement Recommendation 
    export function NCATEnforcementRecommendationOnChange(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();
        const NCATEnforcementRecommendation = formContext.getAttribute("ts_ncatenforcementrecommendation").getValue();
        const status = formContext.getAttribute("statuscode").getValue();
        if (NCATEnforcementRecommendation != null && status != ovs_finding_statuscode.Complete) {
            //Enable Accept NCAT Recommendation
            formContext.getControl("ts_acceptncatrecommendation").setDisabled(false);
        } else {
            //Disable Accept NCAT Recommendation
            formContext.getControl("ts_acceptncatrecommendation").setDisabled(true);
            //Clear Accept NCAT Recommendation
            formContext.getAttribute("ts_acceptncatrecommendation").setValue(null);
        }
    }

    //Make the Accept RATE Recommendation field Visible if there is an Enforcement Recommendation 
    export function RATEEnforcementRecommendationOnChange(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();
        const RATEEnforcementRecommendation = formContext.getAttribute("ts_rateenforcementrecommendation").getValue();
        const status = formContext.getAttribute("statuscode").getValue();
        if (RATEEnforcementRecommendation != null && status != ovs_finding_statuscode.Complete) {
            //Enable Accept RATE Recommendation
            formContext.getControl("ts_acceptraterecommendation").setDisabled(false);
        } else {
            //Disable Accept RATE Recommendation
            formContext.getControl("ts_acceptraterecommendation").setDisabled(true);
            //Clear Accept RATE Recommendation
            formContext.getAttribute("ts_acceptraterecommendation").setValue(null);
        }
    }

    //Does not allow NCAT Inspector Recommendation to match the NCAT Enforcement Recommendation
    //Resets the Manager Review Section fields
    export function NCATInspectorRecommendationOnChange(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();
        const NCATInspectorRecommendation = formContext.getAttribute("ts_ncatinspectorrecommendation").getValue();
        const NCATEnforcementRecommendation = formContext.getAttribute("ts_ncatenforcementrecommendation").getValue();

        //Reset NCAT Final Enforcement Action and any Manager fields
        NCATHideManagerReviewSection(eContext);

        if (NCATInspectorRecommendation != null && NCATEnforcementRecommendation != null && NCATInspectorRecommendation == NCATEnforcementRecommendation) {
            if (lang == 1036) {
                formContext.getControl("ts_ncatinspectorrecommendation").setNotification("ne peut pas correspondre " + formContext.getControl("ts_ncatenforcementrecommendation").getLabel());
            } else {
                formContext.getControl("ts_ncatinspectorrecommendation").setNotification("cannot match " + formContext.getControl("ts_ncatenforcementrecommendation").getLabel());
            }
            
        } else {
            formContext.getControl("ts_ncatinspectorrecommendation").clearNotification();
        }
    }

    export function RATESpecificComplianceHistoryOnChange(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();
        const specificComplianceHistory = formContext.getAttribute("ts_ratespecificcompliancehistory").getValue()
        if (specificComplianceHistory != null && specificComplianceHistory != ts_ratespecificcompliancehistory._0documentedpreviousidenticalorsimilarnoncompliances) {
            formContext.getControl("ts_ratespecificenforcementhistory").setVisible(true);
        } else {
            formContext.getAttribute("ts_ratespecificenforcementhistory").setValue(null);
            formContext.getControl("ts_ratespecificenforcementhistory").setVisible(false);
        }
    }

    //Does not allow RATE Inspector Recommendation to match the NCAT Enforcement Recommendation
    //Resets the Manager Review Section fields
    export function RATEInspectorRecommendationOnChange(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();
        const RATEInspectorRecommendation = formContext.getAttribute("ts_rateinspectorrecommendation").getValue();
        const RATEEnforcementRecommendation = formContext.getAttribute("ts_rateenforcementrecommendation").getValue();

        //Reset RATE Final Enforcement Action and any Manager fields
        RATEHideManagerReviewSection(eContext);

        if (RATEInspectorRecommendation != null && RATEEnforcementRecommendation != null && RATEInspectorRecommendation == RATEEnforcementRecommendation) {
            if (lang == 1036) {
                formContext.getControl("ts_rateinspectorrecommendation").setNotification("ne peut pas correspondre " + formContext.getControl("ts_rateenforcementrecommendation").getLabel());
            } else {
                formContext.getControl("ts_rateinspectorrecommendation").setNotification("cannot match " + formContext.getControl("ts_rateenforcementrecommendation").getLabel());
            }
        } else {
            formContext.getControl("ts_rateinspectorrecommendation").clearNotification();
        }
    }

    //Sets the NCAT Final Enforcement Action depending on the Manager Decision
    //Sets Manager Section Controls to Required or Disabled depending on Manager Decision
    export function NCATManagerDecisionOnChange(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();
        const NCATManagerDecision = formContext.getAttribute("ts_ncatmanagerdecision").getValue();

        if (NCATManagerDecision == ts_ncatmanagerdecision.AcceptInspectorRecommendation) {
            formContext.getAttribute("ts_finalenforcementaction").setValue(NCATEnforcementActionChoiceValueToFinalEnforcementActionChoiceValue(formContext.getAttribute("ts_ncatinspectorrecommendation").getValue()));
            formContext.getAttribute("ts_ncatmanageralternativerecommendation").setRequiredLevel("none");
            formContext.getControl("ts_ncatmanageralternativerecommendation").setVisible(false);
            formContext.getControl("ts_ncatmanageralternativerecommendation").clearNotification();
            formContext.getAttribute("ts_ncatmanageralternativerecommendation").setValue(null);
            formContext.getAttribute("ts_ncatmanagerenforcementjustification").setRequiredLevel("required");
            formContext.getControl("ts_ncatmanagerenforcementjustification").setDisabled(false);

        } else if (NCATManagerDecision == ts_ncatmanagerdecision.AcceptNCATRecommendation) {
            formContext.getAttribute("ts_finalenforcementaction").setValue(NCATEnforcementActionChoiceValueToFinalEnforcementActionChoiceValue(formContext.getAttribute("ts_ncatenforcementrecommendation").getValue()));
            formContext.getAttribute("ts_ncatmanageralternativerecommendation").setRequiredLevel("none");
            formContext.getControl("ts_ncatmanageralternativerecommendation").setVisible(false);
            formContext.getControl("ts_ncatmanageralternativerecommendation").clearNotification();
            formContext.getAttribute("ts_ncatmanageralternativerecommendation").setValue(null);
            formContext.getAttribute("ts_ncatmanagerenforcementjustification").setRequiredLevel("required");
            formContext.getControl("ts_ncatmanagerenforcementjustification").setDisabled(false);

        } else if (NCATManagerDecision == ts_ncatmanagerdecision.ProvideAlternativeRecommendation) {
            formContext.getAttribute("ts_ncatmanageralternativerecommendation").setRequiredLevel("required");
            formContext.getControl("ts_ncatmanageralternativerecommendation").setVisible(true);
            formContext.getAttribute("ts_finalenforcementaction").setValue(NCATEnforcementActionChoiceValueToFinalEnforcementActionChoiceValue(formContext.getAttribute("ts_ncatmanageralternativerecommendation").getValue()));
            formContext.getAttribute("ts_ncatmanagerenforcementjustification").setRequiredLevel("required");
            formContext.getControl("ts_ncatmanagerenforcementjustification").setDisabled(false);

        } else {
            formContext.getAttribute("ts_ncatmanageralternativerecommendation").setRequiredLevel("none");
            formContext.getControl("ts_ncatmanageralternativerecommendation").setVisible(false);
            formContext.getControl("ts_ncatmanageralternativerecommendation").clearNotification();
            formContext.getAttribute("ts_ncatmanageralternativerecommendation").setValue(null);
            formContext.getAttribute("ts_ncatmanagerenforcementjustification").setRequiredLevel("none");
            formContext.getControl("ts_ncatmanagerenforcementjustification").setDisabled(true);
            formContext.getAttribute("ts_ncatmanagerenforcementjustification").setValue(null);
        }
    }

    //Sets the RATE Final Enforcement Action depending on the Manager Decision
    //Sets Manager Section Controls to Required or Disabled depending on Manager Decision
    export function RATEManagerDecisionOnChange(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();
        const RATEManagerDecision = formContext.getAttribute("ts_ratemanagerdecision").getValue();

        if (RATEManagerDecision == ts_ratemanagerdecision.AcceptInspectorRecommendation) {
            formContext.getAttribute("ts_finalenforcementaction").setValue(RATEEnforcementActionChoiceValueToFinalEnforcementActionChoiceValue(formContext.getAttribute("ts_rateinspectorrecommendation").getValue()));
            formContext.getAttribute("ts_ratemanageralternativerecommendation").setRequiredLevel("none");
            formContext.getControl("ts_ratemanageralternativerecommendation").setVisible(false);
            formContext.getAttribute("ts_ratemanageralternativerecommendation").setValue(null);
            formContext.getAttribute("ts_ratemanagerenforcementjustification").setRequiredLevel("required");
            formContext.getControl("ts_ratemanagerenforcementjustification").setDisabled(false);

        } else if (RATEManagerDecision == ts_ratemanagerdecision.AcceptRATERecommendation) {
            formContext.getAttribute("ts_finalenforcementaction").setValue(RATEEnforcementActionChoiceValueToFinalEnforcementActionChoiceValue(formContext.getAttribute("ts_rateenforcementrecommendation").getValue()));
            formContext.getAttribute("ts_ratemanageralternativerecommendation").setRequiredLevel("none");
            formContext.getControl("ts_ratemanageralternativerecommendation").setVisible(false);
            formContext.getAttribute("ts_ratemanageralternativerecommendation").setValue(null);
            formContext.getAttribute("ts_ratemanagerenforcementjustification").setRequiredLevel("required");
            formContext.getControl("ts_ratemanagerenforcementjustification").setDisabled(false);

        } else if (RATEManagerDecision == ts_ratemanagerdecision.ProvideAlternativeRecommendation) {
            formContext.getAttribute("ts_ratemanageralternativerecommendation").setRequiredLevel("required");
            formContext.getControl("ts_ratemanageralternativerecommendation").setVisible(true);
            formContext.getAttribute("ts_finalenforcementaction").setValue(RATEEnforcementActionChoiceValueToFinalEnforcementActionChoiceValue(formContext.getAttribute("ts_ratemanageralternativerecommendation").getValue()));
            formContext.getAttribute("ts_ratemanagerenforcementjustification").setRequiredLevel("required");
            formContext.getControl("ts_ratemanagerenforcementjustification").setDisabled(false);
        } else {
            formContext.getAttribute("ts_ratemanageralternativerecommendation").setRequiredLevel("none");
            formContext.getControl("ts_ratemanageralternativerecommendation").setVisible(false);
            formContext.getAttribute("ts_ratemanageralternativerecommendation").setValue(null);
            formContext.getAttribute("ts_ratemanagerenforcementjustification").setRequiredLevel("none");
            formContext.getControl("ts_ratemanagerenforcementjustification").setDisabled(true);
            formContext.getAttribute("ts_ratemanagerenforcementjustification").setValue(null);
        }
    }

    //Does not allow NCAT Manager Recommendation to match either NCAT Recommendation or Inspector Recommendation
    //Sets the NCAT Final Enforcement action to the Manager Recommendation
    export function NCATManagerAlternativeRecommendationOnChange(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();
        const NCATInspectorRecommendation = formContext.getAttribute("ts_ncatinspectorrecommendation").getValue();
        const NCATEnforcementRecommendation = formContext.getAttribute("ts_ncatenforcementrecommendation").getValue();
        const NCATManagerAlternativeRecommendation = formContext.getAttribute("ts_ncatmanageralternativerecommendation").getValue();

        formContext.getControl("ts_ncatmanageralternativerecommendation").clearNotification();

        if (NCATManagerAlternativeRecommendation != null && NCATManagerAlternativeRecommendation == NCATInspectorRecommendation) {
            if (lang == 1036) {
                formContext.getControl("ts_ncatmanageralternativerecommendation").setNotification("ne peut pas correspondre " + formContext.getControl("ts_ncatinspectorrecommendation").getLabel());
            } else {
                formContext.getControl("ts_ncatmanageralternativerecommendation").setNotification("cannot match " + formContext.getControl("ts_ncatinspectorrecommendation").getLabel());
            }
        } else if (NCATManagerAlternativeRecommendation != null && NCATManagerAlternativeRecommendation == NCATEnforcementRecommendation) {
            if (lang == 1036) {
                formContext.getControl("ts_ncatmanageralternativerecommendation").setNotification("ne peut pas correspondre " + formContext.getControl("ts_ncatenforcementrecommendation").getLabel());
            } else {
                formContext.getControl("ts_ncatmanageralternativerecommendation").setNotification("cannot match " + formContext.getControl("ts_ncatenforcementrecommendation").getLabel());
            }
        } else {
            formContext.getAttribute("ts_finalenforcementaction").setValue(NCATEnforcementActionChoiceValueToFinalEnforcementActionChoiceValue(formContext.getAttribute("ts_ncatmanageralternativerecommendation").getValue()));
        }
    }

    //Does not allow RATE Manager Recommendation to match either RATE Recommendation or Inspector Recommendation
    //Sets the RATE Final Enforcement action to the Manager Recommendation
    export function RATEManagerAlternativeRecommendationOnChange(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();
        const RATEInspectorRecommendation = formContext.getAttribute("ts_rateinspectorrecommendation").getValue();
        const RATEEnforcementRecommendation = formContext.getAttribute("ts_rateenforcementrecommendation").getValue();
        const RATEManagerAlternativeRecommendation = formContext.getAttribute("ts_ratemanageralternativerecommendation").getValue();

        formContext.getControl("ts_ratemanageralternativerecommendation").clearNotification();

        if (RATEManagerAlternativeRecommendation != null && RATEManagerAlternativeRecommendation == RATEInspectorRecommendation) {
            if (lang == 1036) {
                formContext.getControl("ts_ratemanageralternativerecommendation").setNotification("ne peut pas correspondre " + formContext.getControl("ts_rateinspectorrecommendation").getLabel());
            } else {
                formContext.getControl("ts_ratemanageralternativerecommendation").setNotification("cannot match " + formContext.getControl("ts_rateinspectorrecommendation").getLabel());
            }
        } else if (RATEManagerAlternativeRecommendation != null && RATEManagerAlternativeRecommendation == RATEEnforcementRecommendation) {
            if (lang == 1036) {
                formContext.getControl("ts_ratemanageralternativerecommendation").setNotification("ne peut pas correspondre " + formContext.getControl("ts_rateenforcementrecommendation").getLabel());
            } else {
                formContext.getControl("ts_ratemanageralternativerecommendation").setNotification("cannot match " + formContext.getControl("ts_rateenforcementrecommendation").getLabel());
            }
        } else {
            formContext.getAttribute("ts_finalenforcementaction").setValue(RATEEnforcementActionChoiceValueToFinalEnforcementActionChoiceValue(formContext.getAttribute("ts_ratemanageralternativerecommendation").getValue()));
        }
    }

    //Clears, Hides, and sets Required level to None for every field in the NCAT Proposed Section
    function NCATHideProposedSection(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();

        formContext.getAttribute("ts_ncatapprovingteam").setValue(null);
        formContext.getAttribute("ts_ncatapprovingteam").setRequiredLevel("none");
        formContext.getControl("ts_ncatapprovingteam").setVisible(false);

        formContext.getAttribute("ts_ncatmanager").setValue(null);
        formContext.getAttribute("ts_ncatmanager").setRequiredLevel("none");
        formContext.getControl("ts_ncatmanager").setVisible(false);

        formContext.getAttribute("ts_ncatinspectorrecommendation").setValue(null);
        formContext.getAttribute("ts_ncatinspectorrecommendation").setRequiredLevel("none");
        formContext.getControl("ts_ncatinspectorrecommendation").setVisible(false);
        formContext.getControl("ts_ncatinspectorrecommendation").clearNotification();

        formContext.getAttribute("ts_ncatenforcementjustification").setValue(null);
        formContext.getAttribute("ts_ncatenforcementjustification").setRequiredLevel("none");
        formContext.getControl("ts_ncatenforcementjustification").setVisible(false);

        NCATHideManagerReviewSection(eContext);
    }

    //Clears, Hides, and sets Required level to None for every field in the NCAT Manager Review Section
    function NCATHideManagerReviewSection(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();

        formContext.getAttribute("ts_rateapprovingteam").setValue(null);
        formContext.getAttribute("ts_rateapprovingteam").setRequiredLevel("none");
        formContext.getControl("ts_rateapprovingteam").setVisible(false);

        formContext.getAttribute("ts_ncatmanagerdecision").setRequiredLevel("none");
        formContext.getAttribute("ts_ncatmanagerdecision").setValue(null);
        formContext.getControl("ts_ncatmanagerdecision").setVisible(false);

        formContext.getAttribute("ts_ncatmanageralternativerecommendation").setValue(null);
        formContext.getControl("ts_ncatmanageralternativerecommendation").clearNotification();
        formContext.getControl("ts_ncatmanageralternativerecommendation").setVisible(false);

        formContext.getAttribute("ts_ncatmanagerenforcementjustification").setValue(null);
        formContext.getAttribute("ts_ncatmanagerenforcementjustification").setRequiredLevel("none");
        formContext.getControl("ts_ncatmanagerenforcementjustification").setDisabled(true);
        formContext.getControl("ts_ncatmanagerenforcementjustification").setVisible(false);
    }

    //Clears, Hides, and sets Required level to None for every field in the RATE Proposed Section
    function RATEHideProposedSection(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();

        formContext.getAttribute("ts_ratemanager").setValue(null);
        formContext.getAttribute("ts_ratemanager").setRequiredLevel("none");
        formContext.getControl("ts_ratemanager").setVisible(false);

        formContext.getAttribute("ts_rateinspectorrecommendation").setValue(null);
        formContext.getAttribute("ts_rateinspectorrecommendation").setRequiredLevel("none");
        formContext.getControl("ts_rateinspectorrecommendation").setVisible(false);
        formContext.getControl("ts_rateinspectorrecommendation").clearNotification();

        formContext.getAttribute("ts_rateenforcementjustification").setValue(null);
        formContext.getAttribute("ts_rateenforcementjustification").setRequiredLevel("none");
        formContext.getControl("ts_rateenforcementjustification").setVisible(false);

        RATEHideManagerReviewSection(eContext);
    }

    //Clears, Hides, and sets Required level to None for every field in the RATE Manager Review Section
    function RATEHideManagerReviewSection(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();

        formContext.getAttribute("ts_ratemanagerdecision").setRequiredLevel("none");
        formContext.getAttribute("ts_ratemanagerdecision").setValue(null);
        formContext.getControl("ts_ratemanagerdecision").setVisible(false);

        formContext.getAttribute("ts_ratemanageralternativerecommendation").setValue(null);
        formContext.getControl("ts_ratemanageralternativerecommendation").clearNotification();
        formContext.getControl("ts_ratemanageralternativerecommendation").setVisible(false);

        formContext.getAttribute("ts_ratemanagerenforcementjustification").setValue(null);
        formContext.getAttribute("ts_ratemanagerenforcementjustification").setRequiredLevel("none");
        formContext.getControl("ts_ratemanagerenforcementjustification").setDisabled(true);
        formContext.getControl("ts_ratemanagerenforcementjustification").setVisible(false);
    }

       //Sets the lookup views for the Approving Teams fields
       function setApprovingTeamsViews(form: Form.ovs_finding.Main.Information): void {
        const viewIdApprovingTeamNCAT = '{3c259fee-0541-4cac-8d20-7b30ee397ca7}';
        const viewIdApprovingTeamRATE = '{3c259fee-0541-4cac-8d20-7b30ee394a73}';
        const entityNameApprovingTeams = "team";
        const viewDisplayNameApprovingTeams = "FilteredApprovingManagers";

        //Approving managers in the same region as the case with the AvSec Business Unit
        const fetchXmlApprovingManagersNCAT = `<fetch version="1.0" output-format="xml-platform" mapping="logical" returntotalrecordcount="true" page="1" no-lock="false"><entity name="team"><attribute name="name"/><attribute name="businessunitid"/><attribute name="teamid"/><attribute name="teamtype"/><filter type="and"><condition attribute="teamtype" operator="eq" value="0"/><condition attribute="ts_territory" operator="not-null"/></filter><order attribute="name" descending="false"/><link-entity name="businessunit" from="businessunitid" to="businessunitid"><filter><condition attribute="name" operator="like" value="Intermodal%"/></filter></link-entity></entity></fetch>`;

        //Approving managers in the same region as the case with the ISSO Business Unit
        const fetchXmlApprovingManagersRATE = `<fetch version="1.0" output-format="xml-platform" mapping="logical" returntotalrecordcount="true" page="1" no-lock="false"><entity name="team"><attribute name="name"/><attribute name="businessunitid"/><attribute name="teamid"/><attribute name="teamtype"/><filter type="and"><condition attribute="teamtype" operator="eq" value="0"/><condition attribute="ts_territory" operator="not-null"/></filter><order attribute="name" descending="false"/><link-entity name="businessunit" from="businessunitid" to="businessunitid"><filter><condition attribute="name" operator="like" value="Aviation%"/></filter></link-entity></entity></fetch>`;
        const layoutXmlApprovingManagers = '<grid name="resultset" object="8" jump="fullname" select="1" icon="1" preview="1"><row name="result" id="systemuserid"><cell name="fullname" width="300" /></row></grid>';

        form.getControl("ts_ncatmanager").addCustomView(viewIdApprovingTeamNCAT, entityNameApprovingTeams, viewDisplayNameApprovingTeams, fetchXmlApprovingManagersNCAT, layoutXmlApprovingManagers, true);
        form.getControl("ts_ratemanager").addCustomView(viewIdApprovingTeamRATE, entityNameApprovingTeams, viewDisplayNameApprovingTeams, fetchXmlApprovingManagersRATE, layoutXmlApprovingManagers, true);
    }

    //Sets the lookup views for the Approving Manager fields
    function setApprovingManagersViews(form: Form.ovs_finding.Main.Information): void {
        const viewIdApprovingManagerNCAT = '{1c259fee-0541-4cac-8d20-7b30ee397ca7}';
        const viewIdApprovingManagerRATE = '{1c259fee-0541-4cac-8d20-7b30ee394a73}';
        const entityNameApprovingManagers = "systemuser";
        const viewDisplayNameApprovingManagers = "FilteredApprovingManagers";

        //Approving managers in the same region as the case with the AvSec Business Unit
        const fetchXmlApprovingManagersNCAT = `<fetch distinct="true" > <entity name="systemuser" > <attribute name="fullname" /> <link-entity name="systemuserroles" from="systemuserid" to="systemuserid" intersect="true" > <link-entity name="role" from="roleid" to="roleid" intersect="true" > <attribute name="name" /> <filter type="and" > <condition attribute="name" operator="eq" value="ROM - Manager" /> </filter> </link-entity> </link-entity> <link-entity name="businessunit" from="businessunitid" to="businessunitid" > <filter> <condition attribute="name" operator="like" value="Intermodal%" /> </filter> </link-entity> <link-entity name="territory" from="territoryid" to="territoryid" > <filter> <condition attribute="territoryid" operator="eq" value="${getCaseRegion(form)}" /> </filter> </link-entity> </entity> </fetch>`;

        //Approving managers in the same region as the case with the ISSO Business Unit
        const fetchXmlApprovingManagersRATE = `<fetch distinct="true" > <entity name="systemuser" > <attribute name="fullname" /> <link-entity name="systemuserroles" from="systemuserid" to="systemuserid" intersect="true" > <link-entity name="role" from="roleid" to="roleid" intersect="true" > <attribute name="name" /> <filter type="and" > <condition attribute="name" operator="eq" value="ROM - Manager" /> </filter> </link-entity> </link-entity> <link-entity name="businessunit" from="businessunitid" to="businessunitid" > <filter> <condition attribute="name" operator="like" value="Aviation%" /> </filter> </link-entity> <link-entity name="territory" from="territoryid" to="territoryid" > <filter> <condition attribute="territoryid" operator="eq" value="${getCaseRegion(form)}" /> </filter> </link-entity> </entity> </fetch>`;
        const layoutXmlApprovingManagers = '<grid name="resultset" object="8" jump="fullname" select="1" icon="1" preview="1"><row name="result" id="systemuserid"><cell name="fullname" width="300" /></row></grid>';

        form.getControl("ts_ncatmanager").addCustomView(viewIdApprovingManagerNCAT, entityNameApprovingManagers, viewDisplayNameApprovingManagers, fetchXmlApprovingManagersNCAT, layoutXmlApprovingManagers, true);
        form.getControl("ts_ratemanager").addCustomView(viewIdApprovingManagerRATE, entityNameApprovingManagers, viewDisplayNameApprovingManagers, fetchXmlApprovingManagersRATE, layoutXmlApprovingManagers, true);
    }

    function setPostNCATRecommendationSelectionFieldsVisibilityAndSetFinalEnforcementAction(eContext: Xrm.ExecutionContext<any, any>): void {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();
        const acceptNCATRecommendation = formContext.getAttribute("ts_acceptncatrecommendation").getValue();

        if (acceptNCATRecommendation == ts_yesno.No || acceptNCATRecommendation == ts_yesno.Yes) {
            formContext.getControl("ts_ncatactualorpotentialharm").setDisabled(true);
            formContext.getControl("ts_ncatintentionality").setDisabled(true);
            formContext.getControl("ts_ncatcompliancehistory").setDisabled(true);
            formContext.getControl("ts_ncateconomicbenefit").setDisabled(true);
            formContext.getControl("ts_ncatmitigationofnoncompliantbehaviors").setDisabled(true);
            formContext.getControl("ts_ncatcooperationwithinspectionorinvestigat").setDisabled(true);
            formContext.getControl("ts_ncatdetectionofnoncompliances").setDisabled(true);
        }

        //If they did not accept the NCAT recommendation
        if (acceptNCATRecommendation == ts_yesno.No) {
            //Show NCAT Approving Team
            formContext.getControl("ts_ncatapprovingteam").setVisible(true);
            formContext.getAttribute("ts_ncatapprovingteam").setRequiredLevel("required");
            //Show NCAT Approving Manager
            formContext.getControl("ts_ncatmanager").setVisible(true);
            formContext.getAttribute("ts_ncatmanager").setRequiredLevel("required");
            //Show Inspector Recommendation
            formContext.getControl("ts_ncatinspectorrecommendation").setVisible(true);
            //Require Inspector Recommendation
            formContext.getAttribute("ts_ncatinspectorrecommendation").setRequiredLevel("required");
            //Show Enforcement Justification
            formContext.getControl("ts_ncatenforcementjustification").setVisible(true);
            //Require Enforcement Justification
            formContext.getAttribute("ts_ncatenforcementjustification").setRequiredLevel("required");

            //Lock the NCAT Proposed Alternative Enforcement Action and NCAT Justification for Proposed Alternative Enforcement Action fields if they have a value
            const NCATInspectorRecommendationValue = formContext.getAttribute("ts_ncatinspectorrecommendation").getValue();
            if (NCATInspectorRecommendationValue != null) {
                formContext.getControl("ts_ncatinspectorrecommendation").setDisabled(true);
            }
            const NCATEnforcementJustificationValue = formContext.getAttribute("ts_ncatenforcementjustification").getValue();
            if (NCATEnforcementJustificationValue != null) {
                formContext.getControl("ts_ncatenforcementjustification").setDisabled(true);
            }
            //If the proposed section has been filled out, show the manager review section
            if (formContext.getAttribute("ts_ncatapprovingteam").getValue() != null) {
                const userRoles = Xrm.Utility.getGlobalContext().userSettings.roles;
                //If the user is a system admin or ROM - Manager, show the NCAT manager review section
                let isAdminOrManager = false;
                userRoles.forEach(role => {
                    if (role.name == "System Administrator" || role.name == "ROM - Manager") {
                        isAdminOrManager = true;
                    }
                });
                if (isAdminOrManager) formContext.ui.tabs.get("tab_NCAT").sections.get("NCAT_manager_review").setVisible(true);
            }
        } else {
            
            NCATHideProposedSection(eContext);
        }
    }

    function setPostRATERecommendationSelectionFieldsVisibilityAndSetFinalEnforcementAction(eContext: Xrm.ExecutionContext<any, any>): void {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();
        const acceptRATERecommendation = formContext.getAttribute("ts_acceptraterecommendation").getValue();

        if (acceptRATERecommendation == ts_yesno.No || acceptRATERecommendation == ts_yesno.Yes) {
            formContext.getControl("ts_rateactualorpotentialharm").setDisabled(true);
            formContext.getControl("ts_rateintentionality").setDisabled(true);
            formContext.getControl("ts_rateeconomicbenefit").setDisabled(true);
            formContext.getControl("ts_rateresponsibility").setDisabled(true);
            formContext.getControl("ts_ratemitigationofnoncompliantbehaviors").setDisabled(true);
            formContext.getControl("ts_ratepreventingrecurrence").setDisabled(true);
            formContext.getControl("ts_ratecooperationwithinspectionorinvestigat").setDisabled(true);
            formContext.getControl("ts_ratespecificcompliancehistory").setDisabled(true);
            formContext.getControl("ts_rategeneralcompliancehistory").setDisabled(true);
            formContext.getControl("ts_ratespecificenforcementhistory").setDisabled(true);
        }

        //If they did not accept the RATE recommendation
        if (acceptRATERecommendation == ts_yesno.No) {
            //Show RATE Approving Team
            formContext.getControl("ts_rateapprovingteam").setVisible(true);
            formContext.getAttribute("ts_rateapprovingteam").setRequiredLevel("required");
            //Show RATE Approving Manager
            formContext.getControl("ts_ratemanager").setVisible(true);
            formContext.getAttribute("ts_ratemanager").setRequiredLevel("required");
            //Show Inspector Recommendation
            formContext.getControl("ts_rateinspectorrecommendation").setVisible(true);
            //Require Inspector Recommendation
            formContext.getAttribute("ts_rateinspectorrecommendation").setRequiredLevel("required");
            //Show Enforcement Justification
            formContext.getControl("ts_rateenforcementjustification").setVisible(true);
            //Require Enforcement Justification
            formContext.getAttribute("ts_rateenforcementjustification").setRequiredLevel("required");

            //Lock the RATE Proposed Alternative Enforcement Action and RATE Justification for Proposed Alternative Enforcement Action fields if they have a value
            const RATEInspectorRecommendationValue = formContext.getAttribute("ts_rateinspectorrecommendation").getValue();
            if (RATEInspectorRecommendationValue != null) {
                formContext.getControl("ts_rateinspectorrecommendation").setDisabled(true);
            }
            const RATEEnforcementJustificationValue = formContext.getAttribute("ts_rateenforcementjustification").getValue();
            if (RATEEnforcementJustificationValue != null) {
                formContext.getControl("ts_rateenforcementjustification").setDisabled(true);
            }

            //If the proposed section has been filled out, show the manager review section
            if (formContext.getAttribute("ts_rateapprovingteam").getValue() != null) {
                const userRoles = Xrm.Utility.getGlobalContext().userSettings.roles;
                //If the user is a system admin or ROM - Manager, show the RATE manager review section
                let isAdminOrManager = false;
                userRoles.forEach(role => {
                    if (role.name == "System Administrator" || role.name == "ROM - Manager") {
                        isAdminOrManager = true;
                    }
                });
                if (isAdminOrManager) formContext.ui.tabs.get("tab_RATE").sections.get("RATE_manager_review").setVisible(true);
            }
        } else {
            RATEHideProposedSection(eContext);
        }
    }

    //Disable all form fields except for "note to stakeholder"
    function disableFormFields(form: Form.ovs_finding.Main.Information): void {
    form.ui.controls.forEach(function (control, index) {
            let controlType = control.getControlType();
            let controlName = control.getName();
            if (controlType != "iframe" && controlType != "webresource" && controlType != "subgrid"){
                if(controlName != "ts_notetostakeholder"){
                    control.setDisabled!(true);
                }
            }
        });
    }

    //Get related Case region ID
    function getCaseRegion(form: Form.ovs_finding.Main.Information): void {
        const caseAttribute = form.getAttribute("ovs_caseid");
        const caseAttributeValue = form.getAttribute("ovs_caseid").getValue();
        let caseId

        if(caseAttribute != null){
            if(caseAttributeValue != null){
                Xrm.WebApi.retrieveRecord("incident", caseAttributeValue[0].id.replace(/({|})/g, ''), "?$select=_ovs_region_value").then(
                    function success(result) {
                        return result._ovs_region_value;
                    },
                    function (error) {
                    }
                );
            }
        }
    }

    //Takes an NCAT Enforcement Action Choice Value and returns the corresponding Final Enforcement Action Choice Value
    function NCATEnforcementActionChoiceValueToFinalEnforcementActionChoiceValue(NCATValue: any): number {
        switch (NCATValue) {
            case ts_ncatrecommendations.VerbalWarning:
                return ts_finalenforcementaction.VerbalWarning
            case ts_ncatrecommendations.WrittenWarning:
                return ts_finalenforcementaction.WrittenWarning
            case ts_ncatrecommendations.ReferraltoREU:
                return ts_finalenforcementaction.ReferraltoREU
            default:
                return 0;
        }
    }

    //Takes a RATE Enforcement Action Choice Value and returns the corresponding Final Enforcement Action Choice Value
    function RATEEnforcementActionChoiceValueToFinalEnforcementActionChoiceValue(NCATValue: any): number {
        switch (NCATValue) {
            case ts_raterecommendations.Nil:
                return ts_finalenforcementaction.Nil
            case ts_raterecommendations.VerbalWarning:
                return ts_finalenforcementaction.VerbalWarning
            case ts_raterecommendations.WrittenWarning:
                return ts_finalenforcementaction.WrittenWarning
            case ts_raterecommendations.AMPLevel120ofMaximum:
                return ts_finalenforcementaction.AMPLevel120ofMaximum
            case ts_raterecommendations.AMPLevel250ofMaximum:
                return ts_finalenforcementaction.AMPLevel250ofMaximum
            case ts_raterecommendations.AMPLevel3100ofMaximum:
                return ts_finalenforcementaction.AMPLevel3100ofMaximum
            case ts_raterecommendations.SuspensionofCAD:
                return ts_finalenforcementaction.SuspensionofCAD
            case ts_raterecommendations.CancellationofCAD:
                return ts_finalenforcementaction.CancellationofCAD
            default:
                return 0;
        }
    }
}