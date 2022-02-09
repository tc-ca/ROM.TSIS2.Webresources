namespace ROM.Finding {

    let lang = Xrm.Utility.getGlobalContext().userSettings.languageId;

    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        //If Observation, keep everything hidden
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();
        let findingType = formContext.getAttribute("ts_findingtype").getValue();

        if (findingType != ts_findingtype.Noncompliance) return;

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
                if (formContext.getAttribute("ts_acceptncatrecommendation").getValue() == ts_yesno.No) {
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
                if (formContext.getAttribute("ts_acceptraterecommendation").getValue() == ts_yesno.No) {
                    formContext.ui.tabs.get("summary").sections.get("RATE_proposed_section").setVisible(true);
                    AcceptRATERecommendationOnChange(eContext);
                }
            }
        });

        setApprovingManagersViews(formContext);
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

                let min = threshold.ts_minimum;
                let max = threshold.ts_maximum;

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

                let min = threshold.ts_minimum;
                let max = threshold.ts_maximum;

                if (totalWeight >= min && totalWeight <= max) {
                    enforcementResponseChoiceNumber = threshold.ts_ncatenforcementaction;
                    break;
                }
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
        if (acceptNCATRecommendation == ts_yesno.No) {
            //Show Inspector Recommendation
            formContext.getControl("ts_ncatinspectorrecommendation").setVisible(true);
            //Require Inspector Recommendation
            formContext.getAttribute("ts_ncatinspectorrecommendation").setRequiredLevel("required");
            //Show Enforcement Justification
            formContext.getControl("ts_ncatenforcementjustification").setVisible(true);
            //Require Enforcement Justification
            formContext.getAttribute("ts_ncatenforcementjustification").setRequiredLevel("required");

            const adminRoleId = "ca432c33-29a1-eb11-b1ac-000d3ae8bbe0";
            const managerRoleId = "85e36d25-29f5-eb11-94ef-000d3af36036";
            let userRoles = Xrm.Utility.getGlobalContext().userSettings.roles;
            //If the user is a system admin or ROM - Manager, show the NCAT manager review section
            let isAdminOrManager = false;
            userRoles.forEach(role => {
                if (role.id == adminRoleId || role.id == managerRoleId) {
                    isAdminOrManager = true;
                }
            });
            if (isAdminOrManager) formContext.ui.tabs.get("summary").sections.get("NCAT_manager_review").setVisible(true);
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
            //Hide NCAT Manager Review section
            formContext.ui.tabs.get("summary").sections.get("NCAT_manager_review").setVisible(false);
        }
    }

    export function AcceptRATERecommendationOnChange(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();
        let acceptRATERecommendation = formContext.getAttribute("ts_acceptraterecommendation").getValue();

        //If they did not accept the RATE recommendation
        if (acceptRATERecommendation == ts_yesno.No) {
            //Show Inspector Recommendation
            formContext.getControl("ts_rateinspectorrecommendation").setVisible(true);
            //Require Inspector Recommendation
            formContext.getAttribute("ts_rateinspectorrecommendation").setRequiredLevel("required");
            //Show Enforcement Justification
            formContext.getControl("ts_rateenforcementjustification").setVisible(true);
            //Require Enforcement Justification
            formContext.getAttribute("ts_rateenforcementjustification").setRequiredLevel("required");

            const adminRoleId = "ca432c33-29a1-eb11-b1ac-000d3ae8bbe0";
            const managerRoleId = "85e36d25-29f5-eb11-94ef-000d3af36036";
            let userRoles = Xrm.Utility.getGlobalContext().userSettings.roles;
            //If the user is a system admin or ROM - Manager, show the RATE manager review section
            let isAdminOrManager = false;
            userRoles.forEach(role => {
                if (role.id == adminRoleId || role.id == managerRoleId) {
                    isAdminOrManager = true;
                }
            });
            if (isAdminOrManager) formContext.ui.tabs.get("summary").sections.get("RATE_manager_review").setVisible(true);
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
            //Hide RATE Manager Review section
            formContext.ui.tabs.get("summary").sections.get("RATE_manager_review").setVisible(false);
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

    export function NCATInspectorRecommendationOnChange(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();
        let NCATInspectorRecommendation = formContext.getAttribute("ts_ncatinspectorrecommendation").getValue();
        let NCATEnforcementRecommendation = formContext.getAttribute("ts_ncatenforcementrecommendation").getValue();

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

    export function RATEInspectorRecommendationOnChange(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ovs_finding.Main.Information>eContext.getFormContext();
        let RATEInspectorRecommendation = formContext.getAttribute("ts_rateinspectorrecommendation").getValue();
        let RATEEnforcementRecommendation = formContext.getAttribute("ts_rateenforcementrecommendation").getValue();

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
                        const fetchXmlApprovingManagersNCAT = '<fetch distinct="false" mapping="logical"><entity name="systemuser"><attribute name="fullname"/><attribute name="territoryid"/><filter><condition attribute="territoryid" operator="eq" value="' + regionId + '" /></filter><link-entity name="systemuserroles" from="systemuserid" to="systemuserid" link-type="inner" intersect="true"><attribute name="roleid"/><filter><condition attribute="roleid" operator="eq" value="' + romManagerRoleId + '"/></filter></link-entity><link-entity name="businessunitmap" from="businessid" to="businessunitid" link-type="inner"><filter><condition attribute="businessid" operator="eq" value="6cb920a0-baa3-eb11-b1ac-000d3ae8b98c" uitype="businessunitmap"/></filter></link-entity></entity></fetch>';

                        //Approving managers in the same region as the case with the ISSO Business Unit
                        const fetchXmlApprovingManagersRATE = '<fetch distinct="false" mapping="logical"><entity name="systemuser"><attribute name="fullname"/><attribute name="territoryid"/><filter><condition attribute="territoryid" operator="eq" value="' + regionId + '" /></filter><link-entity name="systemuserroles" from="systemuserid" to="systemuserid" link-type="inner" intersect="true"><attribute name="roleid"/><filter><condition attribute="roleid" operator="eq" value="' + romManagerRoleId + '"/></filter></link-entity><link-entity name="businessunitmap" from="businessid" to="businessunitid" link-type="inner"><filter><condition attribute="businessid" operator="eq" value="4ff4b827-bead-eb11-8236-000d3ae8b866" uitype="businessunitmap"/></filter></link-entity></entity></fetch>';
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