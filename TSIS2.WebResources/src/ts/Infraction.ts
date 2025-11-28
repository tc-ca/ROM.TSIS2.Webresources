namespace ROM.Infraction {

    let lang = Xrm.Utility.getGlobalContext().userSettings.languageId;

    let factorLockMessageTitleLocalizedText = "Warning";
    let factorLockMessageBodyLocalizedText = 'All the factors of the tool will be locked when you select "OK".';

    if (lang == 1036) {
        factorLockMessageTitleLocalizedText = "Avertissement";
        factorLockMessageBodyLocalizedText = `Tous les facteurs de l'outil vont être verrouillé lorsque vous sélectionner "OK".`;
    }

    //Air Carrier (Passenger), Air Carrier(All Cargo), Operator of an Aerodrome
    let avSecOperationTypeGuides = ["{8B614EF0-C651-EB11-A812-000D3AF3AC0D}", "{E03381D0-C751-EB11-A812-000D3AF3AC0D}", "{E3238EDD-C651-EB11-A812-000D3AF3AC0D}"];

    var isROM20Form = false;

    //Toggle visibility of  RATE sections depending user business unit and rolls
    //Sets field Controls parameters (required, hidden, disabled, etc) depending on current form state
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        let formContext = <Form.ts_infraction.Main.Information>eContext.getFormContext();

        let isDualInspector = false;
        const userRoles = Xrm.Utility.getGlobalContext().userSettings.roles;
        userRoles.forEach(role => {
            if (role.name == "ROM - Dual Inspector") {
                isDualInspector = true;
            }
        });

        var formItem = formContext.ui.formSelector.getCurrentItem().getId();
        isROM20Form = formItem.toLowerCase() == "c01347bc-d346-447d-b902-4f411a0e9706";

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
        Xrm.WebApi.retrieveMultipleRecords("businessunit", currentUserBusinessUnitFetchXML).then(function (businessunit) {
            const userBusinessUnitName = businessunit.entities[0].name;

            const operationTypeAttributeValue = formContext.getAttribute("ts_operationtype").getValue();

            let operationTypeOwningBusinessUnit;
            if (operationTypeAttributeValue != null) {
                let operationTypeOwningBusinessUnitFetchXML = [
                    "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true' no-lock='false'>",
                    "  <entity name='businessunit'>",
                    "    <attribute name='name'/>",
                    "    <attribute name='businessunitid'/>",
                    "    <link-entity name='ovs_operationtype' from='owningbusinessunit' to='businessunitid' link-type='inner'>",
                    "      <filter>",
                    "        <condition attribute='ovs_operationtypeid' operator='eq' value='", operationTypeAttributeValue[0].id, "'/>",
                    "      </filter>",
                    "    </link-entity>",
                    "  </entity>",
                    "</fetch>"
                ].join("");
                operationTypeOwningBusinessUnitFetchXML = "?fetchXml=" + encodeURIComponent(operationTypeOwningBusinessUnitFetchXML);

                Xrm.WebApi.retrieveMultipleRecords("businessunit", operationTypeOwningBusinessUnitFetchXML).then(async function (operationTypeBusinessUnit) {
                    operationTypeOwningBusinessUnit = operationTypeBusinessUnit.entities[0].name;
                    if (operationTypeAttributeValue != null) {
                        const infractionID = formContext.data.entity.getId();
                        let infractionFetchXml = [
                            "<fetch>",
                            "  <entity name='ts_infraction'>",
                            "    <filter type='and'>",
                            "      <condition attribute='ts_infractionid' operator='eq' value='", infractionID, "'/>",
                            "    </filter>",
                            "    <link-entity name='msdyn_functionallocation' from='msdyn_functionallocationid' to='ts_functionallocation' alias='site'>",
                            "      <attribute name='ts_region'/>",
                            "    </link-entity>",
                            "  </entity>",
                            "</fetch>"
                        ].join("");
                        infractionFetchXml = "?fetchXml=" + encodeURIComponent(infractionFetchXml);
                        Xrm.WebApi.retrieveMultipleRecords("ts_infraction", infractionFetchXml).then(async function (result) {
                            const currentInfraction = result.entities[0];
                            const regionId = currentInfraction["site.ts_region"];

                            //If Operation Type is Air Carrier (Passenger) or Air Carrier(All Cargo) or Operator of an Aerodrome and not international
                            if (avSecOperationTypeGuides.includes(operationTypeAttributeValue[0].id) && regionId != "3bf0fa88-150f-eb11-a813-000d3af3a7a7") { //GUID for International region
                                formContext.ui.tabs.get("tab_RATE").setVisible(true);
                                formContext.getControl("ts_finalenforcementaction").setDisabled(true);
                            }
                            else {
                                formContext.getControl("ts_finalenforcementaction").setDisabled(false);
                                formContext.ui.tabs.get("tab_RATE").setVisible(false);
                            }

                            formContext.getControl("header_ts_rateenforcementrecommendation").setVisible(true);

                            //If there's a recommended enforcement action and the finding is not complete yet, then the accept rate recommendation field should be unlocked
                            const enforcementRecommendation = formContext.getAttribute("ts_rateenforcementrecommendation").getValue();
                            const recordStatus = formContext.getAttribute("statuscode").getValue();
                            if (enforcementRecommendation != null && recordStatus != ts_infraction_statuscode.Complete) {
                                formContext.getControl("ts_acceptraterecommendation").setDisabled(false);
                            }

                            //If they have accepted or rejected the RATE recommendation previously, then the RATE factors should be locked.
                            const acceptRATERecommendation = formContext.getAttribute("ts_acceptraterecommendation").getValue();
                            if (acceptRATERecommendation != null) {
                                lockRATEFactors(eContext);
                            }

                            //If they did not accept the rate recommendation, show proposal sections and fields
                            if (formContext.getAttribute("ts_acceptraterecommendation").getValue() == ts_yesno.No) {
                                formContext.ui.tabs.get("tab_RATE").sections.get("RATE_proposed_section").setVisible(true);
                                setPostRATERecommendationSelectionFieldsVisibility(eContext);
                                RATEManagerDecisionOnChange(eContext);
                            }
                        });


                        // }
                    }
                    RATESpecificComplianceHistoryOnChange(eContext);
                    await setApprovingTeamsViews(formContext);

                    if (formContext.getAttribute("statuscode").getValue() == ts_infraction_statuscode.Complete) {
                        disableFormFields(formContext);
                    }

                    showHideNonComplianceTimeframe(formContext);

                });

                if (operationTypeAttributeValue != null && operationTypeAttributeValue[0].id == "{BE8B0910-C751-EB11-A812-000D3AF3AC0D}") { //Person
                    formContext.getControl("ts_contact").setVisible(true);
                }
                else {
                    formContext.getControl("ts_contact").setVisible(false);
                }
            }
        });

        if (isROM20Form) {
            //    SubGridFilterExecution(eContext);
        }

    }

    export function onSave(eContext: Xrm.ExecutionContext<any, any>): void {
        let formContext = <Form.ts_infraction.Main.Information>eContext.getFormContext();
        const statusCodeAttribute = formContext.getAttribute("statuscode");
        const statusCodeValue = statusCodeAttribute.getValue();
        onLoad(eContext);
        if (statusCodeValue == ts_infraction_statuscode.Complete) return;
        const acceptRATERecommendation = formContext.getAttribute("ts_acceptraterecommendation").getValue();
        const rejectedRecommendation = acceptRATERecommendation == ts_yesno.No;
        const RATEManager = formContext.getAttribute("ts_ratemanager").getValue();
        const hasManagerFieldPopulated = RATEManager != null;

        if (rejectedRecommendation && hasManagerFieldPopulated) {
            statusCodeAttribute.setValue(ts_infraction_statuscode.Pending)
        } else {
            statusCodeAttribute.setValue(ts_infraction_statuscode.InProgress)
        }
    }


    //If all RATE Fields are set, calculate and set the recommended enforcement
    export async function RATEFieldOnChange(eContext: Xrm.ExecutionContext<any, any>): Promise<boolean> {
        let formContext = <Form.ts_infraction.Main.Information>eContext.getFormContext();

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
        let formContext = <Form.ts_infraction.Main.Information>eContext.getFormContext();

        const rateSpecificComplianceHistory = formContext.getAttribute("ts_ratespecificnoncompliancehistory").getValue();
        const factor1Value = formContext.getAttribute("ts_rategeneralnoncompliancehistory").getValue();
        const factor2Value = formContext.getAttribute("ts_rateactualorpotentialharm").getValue();
        const factor3Value = formContext.getAttribute("ts_rateresponsibility").getValue();
        const factor4Value = formContext.getAttribute("ts_ratemitigationofharm").getValue();
        const factor5Value = formContext.getAttribute("ts_ratepreventingrecurrence").getValue();
        const factor6Value = formContext.getAttribute("ts_rateintentionality").getValue();
        const factor7Value = formContext.getAttribute("ts_rateeconomicbenefit").getValue();
        const factor8Value = formContext.getAttribute("ts_ratecooperation").getValue();

        const complianceHistory = formContext.getAttribute("ts_ratespecificnoncompliancehistory").getValue()
        let enforcementHistory = formContext.getAttribute("ts_ratepreviousenforcementmechanism").getValue();

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


    //Sets the RATE Final Enforcement Action to the recommended Enforcement if the user accepts
    //Reveals fields for user to suggest an alternative enforcement action if they do not accept the recommendation
    export function AcceptRATERecommendationOnChange(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ts_infraction.Main.Information>eContext.getFormContext();
        const acceptRATERecommendation = formContext.getAttribute("ts_acceptraterecommendation").getValue();

        if (acceptRATERecommendation == null) {
            RATEHideProposedSection(eContext);
            formContext.getAttribute("ts_finalenforcementaction").setValue(null);
        }

        //If the NCAT factors are all filled
        if (formContext.getAttribute("ts_rateactualorpotentialharm").getValue() != null && formContext.getAttribute("ts_rateintentionality").getValue() != null && formContext.getAttribute("ts_rateeconomicbenefit").getValue() != null && formContext.getAttribute("ts_rateresponsibility").getValue() != null && formContext.getAttribute("ts_ratemitigationofharm").getValue() != null && formContext.getAttribute("ts_ratepreventingrecurrence").getValue() != null && formContext.getAttribute("ts_ratecooperation").getValue() != null && acceptRATERecommendation != null) {

            var confirmStrings = { text: factorLockMessageBodyLocalizedText, title: factorLockMessageTitleLocalizedText };
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
                            setPostRATERecommendationSelectionFieldsVisibility(eContext);
                        });
                    } else {
                        formContext.getAttribute("ts_acceptraterecommendation").setValue(null);
                    }
                });
        }
    }

    //Make the Accept RATE Recommendation field Visible if there is an Enforcement Recommendation 
    export function RATEEnforcementRecommendationOnChange(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ts_infraction.Main.Information>eContext.getFormContext();
        const RATEEnforcementRecommendation = formContext.getAttribute("ts_rateenforcementrecommendation").getValue();
        const status = formContext.getAttribute("statuscode").getValue();
        if (RATEEnforcementRecommendation != null && status != ts_infraction_statuscode.Complete) {
            //Enable Accept RATE Recommendation
            formContext.getControl("ts_acceptraterecommendation").setDisabled(false);
        } else {
            //Disable Accept RATE Recommendation
            formContext.getControl("ts_acceptraterecommendation").setDisabled(true);
            //Clear Accept RATE Recommendation
            formContext.getAttribute("ts_acceptraterecommendation").setValue(null);
        }
    }
    export function RATESpecificComplianceHistoryOnChange(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ts_infraction.Main.Information>eContext.getFormContext();
        const specificComplianceHistory = formContext.getAttribute("ts_ratespecificnoncompliancehistory").getValue()
        if (specificComplianceHistory != null && specificComplianceHistory != ts_ratespecificcompliancehistory._0documentedpreviousidenticalorsimilarnoncompliances) {
            formContext.getControl("ts_ratepreviousenforcementmechanism").setVisible(true);
        } else {
            formContext.getAttribute("ts_ratepreviousenforcementmechanism").setValue(null);
            formContext.getControl("ts_ratepreviousenforcementmechanism").setVisible(false);
        }
    }

    //Does not allow RATE Inspector Recommendation to match the NCAT Enforcement Recommendation
    //Resets the Manager Review Section fields
    export function RATEInspectorRecommendationOnChange(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ts_infraction.Main.Information>eContext.getFormContext();
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


    //Sets the RATE Final Enforcement Action depending on the Manager Decision
    //Sets Manager Section Controls to Required or Disabled depending on Manager Decision
    export function RATEManagerDecisionOnChange(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ts_infraction.Main.Information>eContext.getFormContext();
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

    //Does not allow RATE Manager Recommendation to match either RATE Recommendation or Inspector Recommendation
    //Sets the RATE Final Enforcement action to the Manager Recommendation
    export function RATEManagerAlternativeRecommendationOnChange(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ts_infraction.Main.Information>eContext.getFormContext();
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
    export function approvingRATETeamsOnChange(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ts_infraction.Main.Information>eContext.getFormContext();
        const RATEApprovingTeam = formContext.getAttribute("ts_rateapprovingteam").getValue();

        if (RATEApprovingTeam != null) {
            const viewIdApprovingManagerRATE = '{1c259fee-0541-4cac-8d20-7b30ee394a73}';
            const entityNameApprovingManagers = "systemuser";
            const viewDisplayNameApprovingManagers = "FilteredApprovingManagers";

            //Approving managers in the same region as the case with the ISSO Business Unit
            const fetchXmlApprovingManagersRATE = `<fetch distinct="true" page="1" no-lock="false"><entity name="systemuser"><attribute name="systemuserid"/><attribute name="fullname"/><link-entity name="teammembership" from="systemuserid" to="systemuserid" intersect="true"><filter><condition attribute="teamid" operator="eq" value="${RATEApprovingTeam[0].id}"/></filter></link-entity></entity></fetch>`;

            const layoutXmlApprovingManagers = '<grid name="resultset" object="8" jump="fullname" select="1" icon="1" preview="1"><row name="result" id="systemuserid"><cell name="fullname" width="300" /></row></grid>';

            formContext.getControl("ts_ratemanager").addCustomView(viewIdApprovingManagerRATE, entityNameApprovingManagers, viewDisplayNameApprovingManagers, fetchXmlApprovingManagersRATE, layoutXmlApprovingManagers, true);

            formContext.getControl("ts_ratemanager").setDisabled(false);
        }
        else {
            formContext.getAttribute("ts_ratemanager").setValue();
            formContext.getControl("ts_ratemanager").setDisabled(true);
        }
    }
    export function issueAddressedOnSiteOnChange(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ts_infraction.Main.Information>eContext.getFormContext();
        showHideNonComplianceTimeframe(formContext);
    }

    function showHideNonComplianceTimeframe(formContext) {
        let addressedOnSiteAttribute = formContext.getAttribute("ts_issueaddressedonsite");
        let nonComplianceTimeframeAttribute = formContext.getAttribute("ts_noncompliancetimeframe");
        let nonComplianceTimeframeControl = formContext.getControl("ts_noncompliancetimeframe");

        if (addressedOnSiteAttribute != null && nonComplianceTimeframeAttribute != null) {
            const addressedOnSiteValue = addressedOnSiteAttribute.getValue();
            if (addressedOnSiteValue == ts_yesno.No) {
                //Show timeframe field
                nonComplianceTimeframeControl.setVisible(true);
            } else {
                //Hide timeframe field
                nonComplianceTimeframeControl.setVisible(false);
            }
        }
    }

    //Clears, Hides, and sets Required level to None for every field in the RATE Proposed Section
    function RATEHideProposedSection(eContext: Xrm.ExecutionContext<any, any>) {
        let formContext = <Form.ts_infraction.Main.Information>eContext.getFormContext();


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
        let formContext = <Form.ts_infraction.Main.Information>eContext.getFormContext();

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
    //Infraction has no NCAT fields, so the NCAT-related code is unused, might need to be removed in a future cleanup.
    async function setApprovingTeamsViews(form: Form.ts_infraction.Main.Information): Promise<void> {
        const viewIdApprovingTeamNCAT = '{3c259fee-0541-4cac-8d20-7b30ee397ca7}';
        const viewIdApprovingTeamRATE = '{3c259fee-0541-4cac-8d20-7b30ee394a73}';
        const entityNameApprovingTeams = "team";
        const viewDisplayNameApprovingTeams = "FilteredApprovingTeams";

        // Retrieve ISSO Business Unit GUIDs
        const issoBUGUIDs = await getISSOBUGUIDs();

        // Retrieve AvSec Business Unit GUIDs
        const avSecBUGUIDs = await getAvSecBUGUIDs();

        // Build filter conditions for ISSO BUs
        let issoBUFilterConditions = '';
        if (issoBUGUIDs.length > 0) {
            if (issoBUGUIDs.length === 1) {
                issoBUFilterConditions = `<condition attribute="businessunitid" operator="eq" value="${issoBUGUIDs[0]}"/>`;
            } else {
                issoBUFilterConditions = '<filter type="or">';
                for (let i = 0; i < issoBUGUIDs.length; i++) {
                    issoBUFilterConditions += `<condition attribute="businessunitid" operator="eq" value="${issoBUGUIDs[i]}"/>`;
                }
                issoBUFilterConditions += '</filter>';
            }
        } else {
            // No ISSO BU GUIDs found - use a condition that will never match to prevent invalid FetchXML
            issoBUFilterConditions = `<condition attribute="businessunitid" operator="eq" value="00000000-0000-0000-0000-000000000000"/>`;
        }

        // Build filter conditions for AvSec BUs
        let avSecBUFilterConditions = '';
        if (avSecBUGUIDs.length > 0) {
            if (avSecBUGUIDs.length === 1) {
                avSecBUFilterConditions = `<condition attribute="businessunitid" operator="eq" value="${avSecBUGUIDs[0]}"/>`;
            } else {
                avSecBUFilterConditions = '<filter type="or">';
                for (let i = 0; i < avSecBUGUIDs.length; i++) {
                    avSecBUFilterConditions += `<condition attribute="businessunitid" operator="eq" value="${avSecBUGUIDs[i]}"/>`;
                }
                avSecBUFilterConditions += '</filter>';
            }
        } else {
            // No AvSec BU GUIDs found - use a condition that will never match to prevent invalid FetchXML
            avSecBUFilterConditions = `<condition attribute="businessunitid" operator="eq" value="00000000-0000-0000-0000-000000000000"/>`;
        }

        //Approving teams with the ISSO Business Unit (GUID-based)
        const fetchXmlApprovingTeamsNCAT = `<fetch output-format="xml-platform" mapping="logical" no-lock="false"><entity name="team"><attribute name="name"/><attribute name="businessunitid"/><attribute name="teamid"/><attribute name="teamtype"/><filter type="and"><condition attribute="teamtype" operator="eq" value="0"/><condition attribute="ts_territory" operator="not-null"/></filter><order attribute="name" descending="false"/><link-entity name="businessunit" from="businessunitid" to="businessunitid"><filter>${issoBUFilterConditions}</filter></link-entity></entity></fetch>`;

        //Approving managers with the AvSec Business Unit (GUID-based)
        const fetchXmlApprovingTeamsRATE = `<fetch output-format="xml-platform" mapping="logical" no-lock="false"><entity name="team"><attribute name="name"/><attribute name="businessunitid"/><attribute name="teamid"/><attribute name="teamtype"/><filter type="and"><condition attribute="teamtype" operator="eq" value="0"/><condition attribute="ts_territory" operator="not-null"/></filter><order attribute="name" descending="false"/><link-entity name="businessunit" from="businessunitid" to="businessunitid"><filter>${avSecBUFilterConditions}</filter></link-entity></entity></fetch>`;

        const layoutXmlApprovingTeams = '<grid name="resultset" object="8" jump="name" select="1" icon="1" preview="1"><row name="result" id="businessunitid"><cell name="name" width="300" /></row></grid>';

        // Apply the AvSec BU-based custom view to the RATE Approving Team lookup
        form.getControl("ts_rateapprovingteam").addCustomView(
            viewIdApprovingTeamRATE,
            entityNameApprovingTeams,
            viewDisplayNameApprovingTeams,
            fetchXmlApprovingTeamsRATE,
            layoutXmlApprovingTeams,
            true
        );
        // Set it as the default view so the lookup uses it
        form.getControl("ts_rateapprovingteam").setDefaultView(viewIdApprovingTeamRATE);
    }

    function setPostRATERecommendationSelectionFieldsVisibility(eContext: Xrm.ExecutionContext<any, any>): void {
        let formContext = <Form.ts_infraction.Main.Information>eContext.getFormContext();
        const acceptRATERecommendation = formContext.getAttribute("ts_acceptraterecommendation").getValue();

        if (acceptRATERecommendation == ts_yesno.No || acceptRATERecommendation == ts_yesno.Yes) {
            lockRATEFactors(eContext);
            formContext.getControl("ts_acceptraterecommendation").setDisabled(true);
        }

        //If they did not accept the RATE recommendation
        if (acceptRATERecommendation == ts_yesno.No) {
            //Show RATE Approving Manager
            formContext.getControl("ts_ratemanager").setVisible(true);
            formContext.getControl("ts_ratemanager").setDisabled(false);
            formContext.getAttribute("ts_ratemanager").setRequiredLevel("required");
            //Show Inspector Recommendation
            formContext.getControl("ts_rateinspectorrecommendation").setVisible(true);
            formContext.getControl("ts_rateinspectorrecommendation").setDisabled(false);
            //Require Inspector Recommendation
            formContext.getAttribute("ts_rateinspectorrecommendation").setRequiredLevel("required");
            //Show Enforcement Justification
            formContext.getControl("ts_rateenforcementjustification").setVisible(true);
            formContext.getControl("ts_rateenforcementjustification").setDisabled(false);
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
            if (formContext.getAttribute("ts_ratemanager").getValue() != null) {
                const userRoles = Xrm.Utility.getGlobalContext().userSettings.roles;
                //If the user is a system admin or ROM - Manager, show the RATE manager review section
                let isAdminOrManager = false;
                userRoles.forEach(role => {
                    if (role.name == "System Administrator" || role.name == "ROM - Manager") {
                        isAdminOrManager = true;
                    }
                });
                const currentUserId = Xrm.Utility.getGlobalContext().userSettings.userId;
                const rateManagerValue = formContext.getAttribute("ts_ratemanager").getValue();
                if (rateManagerValue != null) {
                    const approvingManagerId = rateManagerValue[0].id;
                    if (currentUserId == approvingManagerId) {
                        isAdminOrManager = true;
                    }
                }

                if (isAdminOrManager) {
                    formContext.ui.tabs.get("tab_RATE").sections.get("RATE_manager_review").setVisible(true);
                }
            }
        } else {
            RATEHideProposedSection(eContext);
        }
    }

    function lockRATEFactors(eContext: Xrm.ExecutionContext<any, any>) {
        const formContext = <Form.ts_infraction.Main.Information>eContext.getFormContext();
        formContext.getControl("ts_rateactualorpotentialharm").setDisabled(true);
        formContext.getControl("ts_rateintentionality").setDisabled(true);
        formContext.getControl("ts_rateeconomicbenefit").setDisabled(true);
        formContext.getControl("ts_rateresponsibility").setDisabled(true);
        formContext.getControl("ts_ratemitigationofharm").setDisabled(true);
        formContext.getControl("ts_ratepreventingrecurrence").setDisabled(true);
        formContext.getControl("ts_ratecooperation").setDisabled(true);
        formContext.getControl("ts_ratespecificnoncompliancehistory").setDisabled(true);
        formContext.getControl("ts_rategeneralnoncompliancehistory").setDisabled(true);
        formContext.getControl("ts_ratepreviousenforcementmechanism").setDisabled(true);
    }

    //Disable all form fields except for "note to stakeholder"
    function disableFormFields(form: Form.ts_infraction.Main.Information): void {
        form.ui.controls.forEach(function (control, index) {
            let controlType = control.getControlType();
            let controlName = control.getName();
            if (controlType != "iframe" && controlType != "webresource" && controlType != "subgrid") {
                if (controlName != "ts_notetostakeholder" && controlName != "ts_sensitivitylevel") {
                    control.setDisabled!(true);
                }
            }
        });
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

    export function SubGridFilterExecution(eContext: Xrm.ExecutionContext<any, any>): void {
        let formContext = <Form.ts_infraction.Main.Information>eContext.getFormContext();

        let gridControl: any = formContext.getControl("relatedfinding_grid");
        var accountobjectid = formContext.getAttribute("ts_contact").getValue();
        let findingId = formContext.data.entity.getId();

        var accountId = '';
        if (accountobjectid != null && accountobjectid != undefined) {
            accountId = accountobjectid[0].id;
        }

        if (gridControl === null) {
            setTimeout(ROM.Finding.SubGridFilterExecution, 1000);
            return;
        }
        else {
            if (accountId !== null && accountId !== '') {
                var fetchXml = `<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false' no-lock='false'>
	            <entity name='ovs_finding'>
		            <attribute name='ovs_findingprovisionreference'/>
		            <attribute name='ovs_finding'/>
		            <attribute name='ts_findingtype'/>
		            <attribute name='ts_accountid'/>
		            <attribute name='statecode'/>
		            <attribute name='ts_ovs_operationtype'/>
		            <attribute name='ovs_caseid'/>
		            <attribute name='ts_workorder'/>
		            <attribute name='createdon'/>
		            <order attribute='createdon' descending='true'/>
		            <attribute name='ovs_findingid'/>
		            <attribute name='ts_functionallocation'/>
		            <filter type='and'>
			            <condition attribute='statecode' operator='eq' value='0'/>
			            <condition attribute='ts_accountid' operator='eq' value='` + accountId + `' uitype='account'/>
                        <condition attribute='ovs_findingid' operator='ne' value='` + findingId + `' uitype='ovs_finding'/>
		            </filter>
	            </entity>
            </fetch>`;

                gridControl.setFilterXml(fetchXml);
                gridControl.refresh();
            }
        }
    }
}