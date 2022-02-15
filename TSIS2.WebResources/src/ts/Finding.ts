namespace ROM.Finding {

    let lang = Xrm.Utility.getGlobalContext().userSettings.languageId;

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
                formContext.ui.tabs.get("summary").sections.get("NCAT_main_section").setVisible(true);
                formContext.ui.tabs.get("summary").sections.get("summary_ncatfactorguide").setVisible(true);
                formContext.getControl("ts_ncatfinalenforcementaction").setVisible(true);
                NCATEnforcementRecommendationOnChange(eContext);
                //If they did not accept the ncat recommendation, show proposal sections and fields
                if (formContext.getAttribute("ts_acceptncatrecommendation").getValue() == ts_yesno.No) {
                    formContext.ui.tabs.get("summary").sections.get("NCAT_proposed_section").setVisible(true);
                    AcceptNCATRecommendationOnChange(eContext);
                    NCATManagerDecisionOnChange(eContext);
                }
            }
            //Show RATE Sections and fields when the user is in Transport Canada or Aviation Security business unit
            if (userBusinessUnitName.startsWith("Transport") || userBusinessUnitName.startsWith("Aviation")) {
                formContext.ui.tabs.get("summary").sections.get("RATE_main_section").setVisible(true);
                formContext.getControl("ts_ratefinalenforcementaction").setVisible(true);
                RATEEnforcementRecommendationOnChange(eContext);
                //If they did not accept the rate recommendation, show proposal sections and fields
                if (formContext.getAttribute("ts_acceptraterecommendation").getValue() == ts_yesno.No) {
                    formContext.ui.tabs.get("summary").sections.get("RATE_proposed_section").setVisible(true);
                    AcceptRATERecommendationOnChange(eContext);
                    RATEManagerDecisionOnChange(eContext);
                }
            }
        });
        RATESpecificComplianceHistoryOnChange(eContext);
        RATEActualHarmFactorOnChange(eContext);
        setApprovingManagersViews(formContext);
    }
    //If all NCAT Fields are set, calculate and set the recommended enforcement
    export async function NCATFieldOnChange(eContext: Xrm.ExecutionContext<any, any>): Promise<boolean> {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();

        //A factor has changed, so everything below needs to be reset
        formContext.getAttribute("ts_ncatenforcementrecommendation").setValue(null);
        formContext.getAttribute("ts_acceptncatrecommendation").setValue(null);
        NCATHideProposedSection(eContext);
        formContext.getAttribute("ts_ncatfinalenforcementaction").setValue(null);

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
            formContext.getControl("ts_acceptncatrecommendation").setVisible(true);
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

        const actualOrPotentialHarm = formContext.getAttribute("ts_rateactualorpotentialharm").getValue();

        //A factor has changed, so everything below needs to be reset
        formContext.getAttribute("ts_rateenforcementrecommendation").setValue(null);
        formContext.getAttribute("ts_acceptraterecommendation").setValue(null);
        RATEHideProposedSection(eContext);
        formContext.getAttribute("ts_ratefinalenforcementaction").setValue(null);

        if (actualOrPotentialHarm != null) {
            const assessmentRatingName = actualOrPotentialHarm[0].name;
            if (assessmentRatingName == "None" || assessmentRatingName == "Rien") {
                calculateRATEEnforcementRecommendationActualHarmFactorNone(eContext);
            } else {
                calculateRATEEnforcementRecommendationActualHarmFactorNotNone(eContext);
            }
        }

        return true
    }

    //Calculate and set an Enforcement Recommendation with all RATE factors
    async function calculateRATEEnforcementRecommendationActualHarmFactorNotNone(eContext: Xrm.ExecutionContext<any, any>) {
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

        //If any of the rate factors don't have a value, reset any fields that require an enforcement recommendation
        if (rateSpecificComplianceHistory == null || factor1Value == null || factor2Value == null || factor3Value == null || factor4Value == null || factor5Value == null || factor6Value == null || factor7Value == null || factor8Value == null) {
            formContext.getAttribute("ts_rateenforcementrecommendation").setValue(null);
            formContext.getAttribute("ts_acceptraterecommendation").setValue(null);
            RATEHideProposedSection(eContext);
            formContext.getAttribute("ts_ratefinalenforcementaction").setValue(null);
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

        let enforcementHistory = formContext.getAttribute("ts_ratespecificenforcementhistory").getValue();
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
            formContext.getControl("ts_acceptraterecommendation").setVisible(true);
            formContext.getAttribute("ts_rateinspectorrecommendation").setValue(null);
        });
    }

    //Calculate and set an Enforcement Recommendation without Responsibility and Mitigation
    async function calculateRATEEnforcementRecommendationActualHarmFactorNone(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();

        const rateSpecificComplianceHistory = formContext.getAttribute("ts_ratespecificcompliancehistory").getValue();
        const factor1Value = formContext.getAttribute("ts_rategeneralcompliancehistory").getValue();
        const factor2Value = formContext.getAttribute("ts_rateactualorpotentialharm").getValue();
        const factor5Value = formContext.getAttribute("ts_ratepreventingrecurrence").getValue();
        const factor6Value = formContext.getAttribute("ts_rateintentionality").getValue();
        const factor7Value = formContext.getAttribute("ts_rateeconomicbenefit").getValue();
        const factor8Value = formContext.getAttribute("ts_ratecooperationwithinspectionorinvestigat").getValue();

        //If any of the rate factors don't have a value, reset any fields that require an enforcement recommendation
        if (rateSpecificComplianceHistory == null || factor1Value == null || factor2Value == null || factor5Value == null || factor6Value == null || factor7Value == null || factor8Value == null) {
            formContext.getAttribute("ts_rateenforcementrecommendation").setValue(null);
            formContext.getAttribute("ts_acceptraterecommendation").setValue(null);
            RATEHideProposedSection(eContext);
            formContext.getAttribute("ts_ratefinalenforcementaction").setValue(null);
            return true;
        }

        const factor1AssessmentRatingId = factor1Value[0].id;
        const factor2AssessmentRatingId = factor2Value[0].id;
        const factor5AssessmentRatingId = factor5Value[0].id;
        const factor6AssessmentRatingId = factor6Value[0].id;
        const factor7AssessmentRatingId = factor7Value[0].id;
        const factor8AssessmentRatingId = factor8Value[0].id;

        //Retrieve the assessment ratings that were set to the rate factors
        const factor1AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor1AssessmentRatingId, "?$select=ts_weight");
        const factor2AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor2AssessmentRatingId, "?$select=ts_weight");
        const factor5AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor5AssessmentRatingId, "?$select=ts_weight");
        const factor6AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor6AssessmentRatingId, "?$select=ts_weight");
        const factor7AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor7AssessmentRatingId, "?$select=ts_weight");
        const factor8AssessmentRatingPromise = Xrm.WebApi.retrieveRecord("ts_assessmentrating", factor8AssessmentRatingId, "?$select=ts_weight");

        let enforcementHistory = formContext.getAttribute("ts_ratespecificenforcementhistory").getValue();
        if (enforcementHistory == null) enforcementHistory = ts_ratespecificenforcementhistory.Nil;

        //Retrieve the enforcement thresholds for RATE
        let thresholdsPromise = Xrm.WebApi.retrieveMultipleRecords("ts_assessmentscorethredshots", `?$select=ts_minimum,ts_maximum,ts_rateenforcementaction&$filter=ts_assessmenttool eq ${ts_assessmenttool.RATE} and ts_rateenforcementhistory eq ${enforcementHistory}`);

        //Wait for all factors the retrieve, then calculate and set the enforcement recommendation
        await Promise.all([factor1AssessmentRatingPromise, factor2AssessmentRatingPromise, factor5AssessmentRatingPromise, factor6AssessmentRatingPromise, factor7AssessmentRatingPromise, factor8AssessmentRatingPromise, thresholdsPromise]).then((factorPromises) => {
            let totalWeight = 0
            for (let i = 0; i < 6; i++) { //The first 6 are the assessment ratings
                totalWeight += factorPromises[i].ts_weight;
            }

            let enforcementResponseChoiceNumber = null;

            //Loop through all the thresholds, if the total weight is between a min and max, set its enforcement action to the enforcement recommendation
            for (let threshold of factorPromises[6].entities) {

                const min = threshold.ts_minimum;
                const max = threshold.ts_maximum;

                if (totalWeight >= min && totalWeight <= max) {
                    enforcementResponseChoiceNumber = threshold.ts_rateenforcementaction;
                    break;
                }
            }

            formContext.getAttribute("ts_rateenforcementrecommendation").setValue(enforcementResponseChoiceNumber);
            formContext.getControl("ts_acceptraterecommendation").setVisible(true);
            formContext.getAttribute("ts_rateinspectorrecommendation").setValue(null);
        });
    }

    export function AcceptNCATRecommendationOnChange(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();
        const acceptNCATRecommendation = formContext.getAttribute("ts_acceptncatrecommendation").getValue();

        //If they did not accept the NCAT recommendation
        if (acceptNCATRecommendation == ts_yesno.No) {
            //Show NCAT Approving Manager
            formContext.getControl("ts_ncatmanager").setVisible(true);
            //Require NCAT Approving Manager (Will make it required when there are managers to choose)
            //formContext.getAttribute("ts_ncatmanager").setRequiredLevel("required");
            //Show Inspector Recommendation
            formContext.getControl("ts_ncatinspectorrecommendation").setVisible(true);
            //Require Inspector Recommendation
            formContext.getAttribute("ts_ncatinspectorrecommendation").setRequiredLevel("required");
            //Show Enforcement Justification
            formContext.getControl("ts_ncatenforcementjustification").setVisible(true);
            //Require Enforcement Justification
            formContext.getAttribute("ts_ncatenforcementjustification").setRequiredLevel("required");
            //Clear final enforcement action, in case it was set before
            formContext.getAttribute("ts_ncatfinalenforcementaction").setValue(null);

            const adminRoleId = "ca432c33-29a1-eb11-b1ac-000d3ae8bbe0";
            const managerRoleId = "85e36d25-29f5-eb11-94ef-000d3af36036";
            const userRoles = Xrm.Utility.getGlobalContext().userSettings.roles;
            //If the user is a system admin or ROM - Manager, show the NCAT manager review section
            let isAdminOrManager = false;
            userRoles.forEach(role => {
                if (role.id == adminRoleId || role.id == managerRoleId) {
                    isAdminOrManager = true;
                }
            });
            if (isAdminOrManager) formContext.ui.tabs.get("summary").sections.get("NCAT_manager_review").setVisible(true);
        } else {
            if (acceptNCATRecommendation == ts_yesno.Yes) {
                //Set NCAT Final Enforcement Action to the Enforcement Recommendation
                const enforcementRecommendation = formContext.getAttribute("ts_ncatenforcementrecommendation").getValue();
                formContext.getAttribute("ts_ncatfinalenforcementaction").setValue(enforcementRecommendation);
            }
            NCATHideProposedSection(eContext);
        }
    }

    export function AcceptRATERecommendationOnChange(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();
        const acceptRATERecommendation = formContext.getAttribute("ts_acceptraterecommendation").getValue();

        //If they did not accept the RATE recommendation
        if (acceptRATERecommendation == ts_yesno.No) {
            //Show RATE Approving Manager
            formContext.getControl("ts_ratemanager").setVisible(true);
            //Require NCAT Approving Manager (Will make it required when there are managers to choose)
            //formContext.getAttribute("ts_ratemanager").setRequiredLevel("required");
            //Show Inspector Recommendation
            formContext.getControl("ts_rateinspectorrecommendation").setVisible(true);
            //Require Inspector Recommendation
            formContext.getAttribute("ts_rateinspectorrecommendation").setRequiredLevel("required");
            //Show Enforcement Justification
            formContext.getControl("ts_rateenforcementjustification").setVisible(true);
            //Require Enforcement Justification
            formContext.getAttribute("ts_rateenforcementjustification").setRequiredLevel("required");
            //Clear final enforcement action, in case it was set before
            formContext.getAttribute("ts_ratefinalenforcementaction").setValue(null);

            const adminRoleId = "ca432c33-29a1-eb11-b1ac-000d3ae8bbe0";
            const managerRoleId = "85e36d25-29f5-eb11-94ef-000d3af36036";
            const userRoles = Xrm.Utility.getGlobalContext().userSettings.roles;
            //If the user is a system admin or ROM - Manager, show the RATE manager review section
            let isAdminOrManager = false;
            userRoles.forEach(role => {
                if (role.id == adminRoleId || role.id == managerRoleId) {
                    isAdminOrManager = true;
                }
            });
            if (isAdminOrManager) formContext.ui.tabs.get("summary").sections.get("RATE_manager_review").setVisible(true);
        } else {
            if (acceptRATERecommendation == ts_yesno.Yes) {
                //Set RATE Final Enforcement Action to the Enforcement Recommendation
                let enforcementRecommendation = formContext.getAttribute("ts_rateenforcementrecommendation").getValue();
                formContext.getAttribute("ts_ratefinalenforcementaction").setValue(enforcementRecommendation);
            }
            RATEHideProposedSection(eContext);
        }
    }

    export function NCATEnforcementRecommendationOnChange(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();
        const NCATEnforcementRecommendation = formContext.getAttribute("ts_ncatenforcementrecommendation").getValue();
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
        const RATEEnforcementRecommendation = formContext.getAttribute("ts_rateenforcementrecommendation").getValue();
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

    export function NCATInspectorRecommendationOnChange(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();
        const NCATInspectorRecommendation = formContext.getAttribute("ts_ncatinspectorrecommendation").getValue();
        const NCATEnforcementRecommendation = formContext.getAttribute("ts_ncatenforcementrecommendation").getValue();

        //Reset NCAT Final Enforcement Action and any Manager fields
        formContext.getAttribute("ts_ncatfinalenforcementaction").setValue(null);
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
        if (specificComplianceHistory != null && specificComplianceHistory != ts_ratespecificcompliancehistory._0) {
            formContext.getControl("ts_ratespecificenforcementhistory").setVisible(true);
        } else {
            formContext.getAttribute("ts_ratespecificenforcementhistory").setValue(null);
            formContext.getControl("ts_ratespecificenforcementhistory").setVisible(false);
        }
    }

    //Responsibilty and Mitigation RATE factors are locked and unlocked based on the repsonse of the Actual Harm factor
    export function RATEActualHarmFactorOnChange(eContext) {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();

        const actualOrPotentialHarm = formContext.getAttribute("ts_rateactualorpotentialharm").getValue();

        if (actualOrPotentialHarm != null) {
            const assessmentRatingName = actualOrPotentialHarm[0].name;
            if (assessmentRatingName == "None" || assessmentRatingName == "Rien") {
                formContext.getControl("ts_rateresponsibility").setDisabled(true);
                formContext.getControl("ts_ratemitigationofnoncompliantbehaviors").setDisabled(true);
                formContext.getAttribute("ts_rateresponsibility").setValue(null);
                formContext.getAttribute("ts_ratemitigationofnoncompliantbehaviors").setValue(null);
            } else {
                formContext.getControl("ts_rateresponsibility").setDisabled(false);
                formContext.getControl("ts_ratemitigationofnoncompliantbehaviors").setDisabled(false);
            }
        } else {
            formContext.getControl("ts_rateresponsibility").setDisabled(true);
            formContext.getControl("ts_ratemitigationofnoncompliantbehaviors").setDisabled(true);
            formContext.getAttribute("ts_rateresponsibility").setValue(null);
            formContext.getAttribute("ts_ratemitigationofnoncompliantbehaviors").setValue(null);
        }
    }

    export function RATEInspectorRecommendationOnChange(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();
        const RATEInspectorRecommendation = formContext.getAttribute("ts_rateinspectorrecommendation").getValue();
        const RATEEnforcementRecommendation = formContext.getAttribute("ts_rateenforcementrecommendation").getValue();

        //Reset RATE Final Enforcement Action and any Manager fields
        formContext.getAttribute("ts_ratefinalenforcementaction").setValue(null);
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

    export function NCATManagerDecisionOnChange(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();
        const NCATManagerDecision = formContext.getAttribute("ts_ncatmanagerdecision").getValue();

        if (NCATManagerDecision == ts_ncatmanagerdecision.AcceptInspectorRecommendation) {
            formContext.getAttribute("ts_ncatfinalenforcementaction").setValue(formContext.getAttribute("ts_ncatinspectorrecommendation").getValue());
            formContext.getAttribute("ts_ncatmanageralternativerecommendation").setRequiredLevel("none");
            formContext.getControl("ts_ncatmanageralternativerecommendation").setVisible(false);
            formContext.getControl("ts_ncatmanageralternativerecommendation").clearNotification();
            formContext.getAttribute("ts_ncatmanageralternativerecommendation").setValue(null);
            formContext.getAttribute("ts_ncatmanagerenforcementjustification").setRequiredLevel("required");
            formContext.getControl("ts_ncatmanagerenforcementjustification").setDisabled(false);

        } else if (NCATManagerDecision == ts_ncatmanagerdecision.AcceptNCATRecommendation) {
            formContext.getAttribute("ts_ncatfinalenforcementaction").setValue(formContext.getAttribute("ts_ncatenforcementrecommendation").getValue());
            formContext.getAttribute("ts_ncatmanageralternativerecommendation").setRequiredLevel("none");
            formContext.getControl("ts_ncatmanageralternativerecommendation").setVisible(false);
            formContext.getControl("ts_ncatmanageralternativerecommendation").clearNotification();
            formContext.getAttribute("ts_ncatmanageralternativerecommendation").setValue(null);
            formContext.getAttribute("ts_ncatmanagerenforcementjustification").setRequiredLevel("required");
            formContext.getControl("ts_ncatmanagerenforcementjustification").setDisabled(false);

        } else if (NCATManagerDecision == ts_ncatmanagerdecision.ProvideAlternativeRecommendation) {
            formContext.getAttribute("ts_ncatmanageralternativerecommendation").setRequiredLevel("required");
            formContext.getControl("ts_ncatmanageralternativerecommendation").setVisible(true);
            formContext.getAttribute("ts_ncatfinalenforcementaction").setValue(formContext.getAttribute("ts_ncatmanageralternativerecommendation").getValue());
            formContext.getAttribute("ts_ncatmanagerenforcementjustification").setRequiredLevel("required");
            formContext.getControl("ts_ncatmanagerenforcementjustification").setDisabled(false);

        } else {
            formContext.getAttribute("ts_ncatmanageralternativerecommendation").setRequiredLevel("none");
            formContext.getControl("ts_ncatmanageralternativerecommendation").setVisible(false);
            formContext.getControl("ts_ncatmanageralternativerecommendation").clearNotification();
            formContext.getAttribute("ts_ncatmanageralternativerecommendation").setValue(null);
            formContext.getAttribute("ts_ncatfinalenforcementaction").setValue(null);
            formContext.getAttribute("ts_ncatmanagerenforcementjustification").setRequiredLevel("none");
            formContext.getControl("ts_ncatmanagerenforcementjustification").setDisabled(true);
            formContext.getAttribute("ts_ncatmanagerenforcementjustification").setValue(null);
        }
    }

    export function RATEManagerDecisionOnChange(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();
        const RATEManagerDecision = formContext.getAttribute("ts_ratemanagerdecision").getValue();

        if (RATEManagerDecision == ts_ratemanagerdecision.AcceptInspectorRecommendation) {
            formContext.getAttribute("ts_ratefinalenforcementaction").setValue(formContext.getAttribute("ts_rateinspectorrecommendation").getValue());
            formContext.getAttribute("ts_ratemanageralternativerecommendation").setRequiredLevel("none");
            formContext.getControl("ts_ratemanageralternativerecommendation").setVisible(false);
            formContext.getAttribute("ts_ratemanageralternativerecommendation").setValue(null);
            formContext.getAttribute("ts_ratemanagerenforcementjustification").setRequiredLevel("required");
            formContext.getControl("ts_ratemanagerenforcementjustification").setDisabled(false);

        } else if (RATEManagerDecision == ts_ratemanagerdecision.AcceptRATERecommendation) {
            formContext.getAttribute("ts_ratefinalenforcementaction").setValue(formContext.getAttribute("ts_rateenforcementrecommendation").getValue());
            formContext.getAttribute("ts_ratemanageralternativerecommendation").setRequiredLevel("none");
            formContext.getControl("ts_ratemanageralternativerecommendation").setVisible(false);
            formContext.getAttribute("ts_ratemanageralternativerecommendation").setValue(null);
            formContext.getAttribute("ts_ratemanagerenforcementjustification").setRequiredLevel("required");
            formContext.getControl("ts_ratemanagerenforcementjustification").setDisabled(false);

        } else if (RATEManagerDecision == ts_ratemanagerdecision.ProvideAlternativeRecommendation) {
            formContext.getAttribute("ts_ratemanageralternativerecommendation").setRequiredLevel("required");
            formContext.getControl("ts_ratemanageralternativerecommendation").setVisible(true);
            formContext.getAttribute("ts_ratefinalenforcementaction").setValue(formContext.getAttribute("ts_ratemanageralternativerecommendation").getValue());
            formContext.getAttribute("ts_ratemanagerenforcementjustification").setRequiredLevel("required");
            formContext.getControl("ts_ratemanagerenforcementjustification").setDisabled(false);
        } else {
            formContext.getAttribute("ts_ratemanageralternativerecommendation").setRequiredLevel("none");
            formContext.getControl("ts_ratemanageralternativerecommendation").setVisible(false);
            formContext.getAttribute("ts_ratemanageralternativerecommendation").setValue(null);
            formContext.getAttribute("ts_ratefinalenforcementaction").setValue(null);
            formContext.getAttribute("ts_ratemanagerenforcementjustification").setRequiredLevel("none");
            formContext.getControl("ts_ratemanagerenforcementjustification").setDisabled(true);
            formContext.getAttribute("ts_ratemanagerenforcementjustification").setValue(null);
        }
    }

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
            formContext.getAttribute("ts_ncatfinalenforcementaction").setValue(null);
        } else if (NCATManagerAlternativeRecommendation != null && NCATManagerAlternativeRecommendation == NCATEnforcementRecommendation) {
            if (lang == 1036) {
                formContext.getControl("ts_ncatmanageralternativerecommendation").setNotification("ne peut pas correspondre " + formContext.getControl("ts_ncatenforcementrecommendation").getLabel());
            } else {
                formContext.getControl("ts_ncatmanageralternativerecommendation").setNotification("cannot match " + formContext.getControl("ts_ncatenforcementrecommendation").getLabel());
            }
            formContext.getAttribute("ts_ncatfinalenforcementaction").setValue(null);
        } else {
            formContext.getAttribute("ts_ncatfinalenforcementaction").setValue(formContext.getAttribute("ts_ncatmanageralternativerecommendation").getValue());
        }
    }

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
            formContext.getAttribute("ts_ratefinalenforcementaction").setValue(null);
        } else if (RATEManagerAlternativeRecommendation != null && RATEManagerAlternativeRecommendation == RATEEnforcementRecommendation) {
            if (lang == 1036) {
                formContext.getControl("ts_ratemanageralternativerecommendation").setNotification("ne peut pas correspondre " + formContext.getControl("ts_rateenforcementrecommendation").getLabel());
            } else {
                formContext.getControl("ts_ratemanageralternativerecommendation").setNotification("cannot match " + formContext.getControl("ts_rateenforcementrecommendation").getLabel());
            }
            formContext.getAttribute("ts_ratefinalenforcementaction").setValue(null);
        } else {
            formContext.getAttribute("ts_ratefinalenforcementaction").setValue(formContext.getAttribute("ts_ratemanageralternativerecommendation").getValue());
        }
    }

    function NCATHideProposedSection(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();

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

    function NCATHideManagerReviewSection(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();

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

    function RATEHideManagerReviewSection(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();

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

    function setApprovingManagersViews(form: Form.ovs_finding.Main.Information): void {
        const romManagerRoleId = "9a6f5e85-84ae-42a9-a9cc-148426ecf05a";

        //Get related Case region ID
        let regionId;
        Xrm.WebApi.retrieveRecord("ovs_finding", form.data.entity.getId(), "?$select=_ovs_caseid_value").then(
            function success(result) {
                Xrm.WebApi.retrieveRecord("incident", result._ovs_caseid_value, "?$select=_ovs_region_value").then(
                    function success(result2) {
                        regionId = result2._ovs_region_value;

                        const viewIdApprovingManagerNCAT = '{1c259fee-0541-4cac-8d20-7b30ee397ca7}';
                        const viewIdApprovingManagerRATE = '{1c259fee-0541-4cac-8d20-7b30ee394a73}';
                        const entityNameApprovingManagers = "systemuser";
                        const viewDisplayNameApprovingManagers = "FilteredApprovingManagers";

                        //Approving managers in the same region as the case with the AvSec Business Unit
                        const fetchXmlApprovingManagersNCAT = '<fetch distinct="false" mapping="logical"><entity name="systemuser"><attribute name="fullname"/><attribute name="territoryid"/><filter><condition attribute="territoryid" operator="eq" value="' + regionId + '" /></filter><link-entity name="systemuserroles" from="systemuserid" to="systemuserid" link-type="inner" intersect="true"><attribute name="roleid"/><filter><condition attribute="roleid" operator="eq" value="' + romManagerRoleId + '"/></filter></link-entity><link-entity name="businessunit" from="businessunitid" to="businessunitid"><filter><condition attribute="name" operator="like" value="Intermodal%"/></filter></link-entity></entity></fetch>';

                        //Approving managers in the same region as the case with the ISSO Business Unit
                        const fetchXmlApprovingManagersRATE = '<fetch distinct="false" mapping="logical"><entity name="systemuser"><attribute name="fullname"/><attribute name="territoryid"/><filter><condition attribute="territoryid" operator="eq" value="' + regionId + '" /></filter><link-entity name="systemuserroles" from="systemuserid" to="systemuserid" link-type="inner" intersect="true"><attribute name="roleid"/><filter><condition attribute="roleid" operator="eq" value="' + romManagerRoleId + '"/></filter></link-entity><link-entity name="businessunit" from="businessunitid" to="businessunitid"><filter><condition attribute="name" operator="like" value="Aviation%"/></filter></link-entity></entity></fetch>';
                        const layoutXmlApprovingManagers = '<grid name="resultset" object="8" jump="fullname" select="1" icon="1" preview="1"><row name="result" id="systemuserid"><cell name="fullname" width="300" /></row></grid>';

                        form.getControl("ts_ncatmanager").addCustomView(viewIdApprovingManagerNCAT, entityNameApprovingManagers, viewDisplayNameApprovingManagers, fetchXmlApprovingManagersNCAT, layoutXmlApprovingManagers, true);
                        form.getControl("ts_ratemanager").addCustomView(viewIdApprovingManagerRATE, entityNameApprovingManagers, viewDisplayNameApprovingManagers, fetchXmlApprovingManagersRATE, layoutXmlApprovingManagers, true);
                    },
                    function (error) {
                    }
                );
            },
            function (error) {
            }
        );

        
    }
}