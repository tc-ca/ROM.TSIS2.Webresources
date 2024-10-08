namespace ROM.Action {
    let isISSO = false;

    //Ideally we should retrieve the values automatically from the form so we don't have to update this file every time the option sets changes. getOptionSets and retrieveOptionSetValues *should* do this but no values are retrieved onLoad, could be because the form is not fully loaded/initiated yet or something with async. To check. 

    let allDeliveryMethodOptions = [
        { text: "Verbal", value: ts_deliverymethod.Verbal },
        { text: "In Person", value: ts_deliverymethod.InPerson },
        { text: "Telephone", value: ts_deliverymethod.Telephone },
        { text: "Email", value: ts_deliverymethod.Email },
        { text: "SSCIMS", value: ts_deliverymethod.SSCIMS },
        { text: "Letter - Hand delivered", value: ts_deliverymethod.LetterHandDelivered },
        { text: "Letter - Mail", value: ts_deliverymethod.LetterMail },
        { text: "Letter - Registered Mail", value: ts_deliverymethod.LetterRegisteredMail }
    ];

    let allActionCategoryOptions = [
        { text: "Administrative Action", value: ts_actioncategory.AdministrativeAction },
        { text: "Corrective Action", value: ts_actioncategory.CorrectiveAction },
        { text: "Enforcement Action", value: ts_actioncategory.EnforcementAction },
        { text: "Immediate Harm Reduction Measure", value: ts_actioncategory.ImmediateHarmReductionMeasure },
        // { text: "Legal Action", value: ts_actioncategory.LegalAction },
        { text: "REU Enforcement Action", value: ts_actioncategory.REUEnforcementAction },
        // { text: "TATC Action", value: ts_actioncategory.TATCAction },
    ];

    let allActionStatus = [
        { text: "Consulted", value: ts_actionstatus.Consulted },
        { text: "Convened", value: ts_actionstatus.Convened },
        { text: "Delivered", value: ts_actionstatus.Delivered },
        { text: "Received", value: ts_actionstatus.Received },
        { text: "Referred", value: ts_actionstatus.Referred },
        { text: "Requested", value: ts_actionstatus.Requested },
        { text: "Sworn", value: ts_actionstatus.Sworn }
    ];

    let allActionTypes = [
        { text: "AMP", value: ts_actiontype.AMP },
        { text: "Administrative monetary penalty", value: ts_actiontype.Administrativemonetarypenalty },
        { text: "Affidavit Of Service | Sworn", value: ts_actiontype.AffidavitofServiceSworn },
        //{ text: "Affidavit Of Service | Cancellation/Suspension of CAD", value: ts_actiontype.AffidavitOfServiceCancellationSuspensionofCAD },
        { text: "Affidavit of Service", value: ts_actiontype.AffidavitofService },
        { text: "AMP Payment | Received", value: ts_actiontype.AMPPaymentReceived },
        //{ text: "Corrective Action Plan | Requested", value: ts_actiontype.CorrectiveActionPlan },
        //{ text: "Correspondence", value: ts_actiontype.Correspondence },
        { text: "Detention of Aircraft", value: ts_actiontype.DetentionofAircraft },
        { text: "Informal Meeting | Offered", value: ts_actiontype.InformalMeetingOffered },
        { text: "Informal Meeting | Convened", value: ts_actiontype.InformalMeetingConvened },
        { text: "Legal Counsel | Consulted", value: ts_actiontype.LegalCounselConsulted },
        { text: "Letter - Commitment | Received", value: ts_actiontype.LetterCommitmentReceived },
        { text: "Letter - Non-Compliance | Sent", value: ts_actiontype.LetterNonComplianceSent },
        { text: "Letter - SSC OSA Further Action | Sent", value: ts_actiontype.LetterSSCOSAFurtherActionSent },
        { text: "Letter - Non-Compliance | Response received", value: ts_actiontype.LetterNonComplianceResponsereceived },
        // { text: "Notification | Non-compliance", value: ts_actiontype.NotificationNoncompliance },
        { text: "Notice of Assessment of Monetary Penalty", value: ts_actiontype.NoticeofAssessmentofMonetaryPenalty },
        { text: "Other", value: ts_actiontype.Other },
        { text: "Prosecution", value: ts_actiontype.Prosecution },
        { text: "Punitive Suspension of CAD", value: ts_actiontype.PunitiveSuspensionofCAD },
        { text: "Regional Enforcement Unit (REU) | Consulted", value: ts_actiontype.RegionalEnforcementUnitREUConsulted },
        // { text: "TATC | Appeal Application", value: ts_actiontype.TATCAppealApplication },
        // { text: "TATC | Appeal Determination", value: ts_actiontype.TATCAppealDetermination },
        // { text: "TATC | Appeal Hearing", value: ts_actiontype.TATCAppealHearing },
        // { text: "TATC | Certificate for unpaid AMP", value: ts_actiontype.TATCCertificateforunpaidAMP },
        // { text: "TATC | Determination", value: ts_actiontype.TATCDetermination },
        // { text: "TATC | Review Application", value: ts_actiontype.TATCReviewApplication },
        { text: "TATC - Hearing | Convened", value: ts_actiontype.TATCHearingConvened },
        { text: "Verbal Warning", value: ts_actiontype.VerbalWarning },
        // { text: "Written Notice", value: ts_actiontype.WrittenNotice },
        { text: "Written Warning", value: ts_actiontype.WrittenWarning },
        { text: "Corrective Action Plan | Received", value: ts_actiontype.CorrectiveActionPlanReceived },
        { text: "Corrective Action Plan | Requested", value: ts_actiontype.CorrectiveActionPlanRequested },
        { text: "Informal Meeting | Convened", value: ts_actiontype.InformalMeetingConvened },
        //{ text: "Letter - Non-Compliance | Response received", value: ts_actiontype.LetterNonComplianceResponseReceived },
        { text: "Regional Enforcement Unit (REU) | Referral", value: ts_actiontype.RegionalEnforcementUnitREUReferral },
        { text: "TATC - Correspondence | Sent", value: ts_actiontype.TATCCorrespondenceSent },
        { text: "TATC - Correspondence | Received", value: ts_actiontype.TATCCorrespondenceReceived }
    ];

    export async function onLoad(eContext: Xrm.ExecutionContext<any, any>): Promise<void> {
        const form = <Form.ts_action.Main.ROMAction>eContext.getFormContext();
        const formType = form.ui.getFormType();

        const caseAttributeValue = (form.getAttribute("ts_case") as any).getValue();
        if (caseAttributeValue) {
            isISSO = await isISSOAction(caseAttributeValue[0].id);
        }
        if (formType === 2) {
            //setRelatedFindingsFetchXML(form);
            filterCategory(form, true);
            actionCategoryOnChange(eContext, true);
            if (form.getAttribute("ts_actiontype").getValue() != null) {
                actionTypeOnChange(eContext, true)
            }
        }
    }

    async function isISSOAction(caseId): Promise<boolean> {
        let caseOwningBUFetchXML = [
            "<fetch version='1.0' mapping='logical' returntotalrecordcount='true' no-lock='false'>",
            "  <entity name='incident'>",
            "    <attribute name='owningbusinessunit' />",
            "     <filter>",
            "       <condition attribute='incidentid' operator='eq' value='", caseId, "'/>",
            "     </filter>",
            "  </entity>",
            "</fetch>"
        ].join("");

        caseOwningBUFetchXML = "?fetchXml=" + encodeURIComponent(caseOwningBUFetchXML);
        const incident = await Xrm.WebApi.retrieveMultipleRecords('incident', caseOwningBUFetchXML);
        if (incident.entities.length > 0) {
            const businessunit = await Xrm.WebApi.retrieveRecord('businessunit', incident.entities[0]._owningbusinessunit_value, '?$select=name');
            if (businessunit.name.startsWith("Intermodal")) {
                isISSO = true;
            }

        }
        return isISSO;
    }


    function setOptions(attribute, options) {
        if (options) {
            attribute.clearOptions();
            options.forEach(option => attribute.addOption(option));
        }
    }

    function clearNonActionFields(form: Form.ts_action.Main.ROMAction) {
        //form.getAttribute("ts_stakeholder").setValue(null);
        form.getAttribute("ts_contact").setValue(null);
        form.getAttribute("ts_deliverymethod").setValue(null);
        form.getAttribute("ts_location").setValue(null);
        form.getAttribute("ts_details").setValue(null);
        form.getAttribute("ts_duedate").setValue(null);
    }

    function resetFieldsVisibility(form: Form.ts_action.Main.ROMAction) {
        form.getControl("ts_stakeholder").setVisible(true);
        form.getControl("ts_contact").setVisible(true);
        form.getControl("ts_deliverymethod").setVisible(true);
        form.getControl("ts_duedate").setVisible(true);
        form.getControl("ts_location").setVisible(true);
        form.getControl("ts_details").setVisible(true);
    }

    export function actionCategoryOnChange(eContext: Xrm.ExecutionContext<any, any>, onLoad: boolean = false): void {
        const form = <Form.ts_action.Main.ROMAction>eContext.getFormContext();
        const actionCategoryAttributeValue = form.getAttribute("ts_actioncategory").getValue();

        if (!actionCategoryAttributeValue) {
            if (!onLoad) {
                form.getAttribute("ts_actiontype").setValue(null)
                //form.getAttribute("ts_actionstatus").setValue(null)
                clearNonActionFields(form);
            }
        }
        else {
            resetFieldsVisibility(form);
        }

        //if (!onLoad) {
        //    form.getAttribute("ts_actionstatus").setValue(null)
        //}

        filterTypes(form);
    }

    function filterTypes(form: Form.ts_action.Main.ROMAction) {
        const actionCategoryAttributeValue = form.getAttribute("ts_actioncategory").getValue();
        const actionTypeAttribute = form.getControl("ts_actiontype");
        let filteredActionTypeOptions = allActionTypes;
        if (isISSO) {
            switch (actionCategoryAttributeValue) {
                case ts_actioncategory.CorrectiveAction:
                    filteredActionTypeOptions = createFilteredOptions([ts_actiontype.CorrectiveActionPlanRequested], allActionTypes);
                    break;
                case ts_actioncategory.EnforcementAction:
                    filteredActionTypeOptions = createFilteredOptions([
                        ts_actiontype.VerbalWarning,
                        ts_actiontype.RegionalEnforcementUnitREUConsulted,
                        ts_actiontype.WrittenWarning,
                    ], allActionTypes);
                    break;
            }
        }
        else {
            switch (actionCategoryAttributeValue) {
                case ts_actioncategory.AdministrativeAction:
                    filteredActionTypeOptions = createFilteredOptions([
                        ts_actiontype.AffidavitofServiceSworn,
                        ts_actiontype.AMPPaymentReceived,
                        ts_actiontype.InformalMeetingOffered,
                        ts_actiontype.InformalMeetingConvened,
                        ts_actiontype.LetterSSCOSAFurtherActionSent,
                        ts_actiontype.LetterNonComplianceSent,
                        ts_actiontype.LetterNonComplianceResponsereceived,
                        ts_actiontype.LetterCommitmentReceived,
                        ts_actiontype.LegalCounselConsulted,
                        ts_actiontype.RegionalEnforcementUnitREUConsulted,
                        ts_actiontype.RegionalEnforcementUnitREUReferral,
                        ts_actiontype.TATCHearingConvened,
                        ts_actiontype.TATCCorrespondenceSent,
                        ts_actiontype.TATCCorrespondenceReceived,
                        //ts_actiontype.AffidavitOfServiceAMP,
                        //ts_actiontype.AffidavitOfServiceCancellationSuspensionofCAD,
                        //ts_actiontype.AMPPayment,
                        //ts_actiontype.InformalMeeting,
                        //ts_actiontype.InformalMeetingConvened,
                        //ts_actiontype.Correspondence,
                        //ts_actiontype.LetterSSCOSAFurtherAction,
                        //ts_actiontype.LetterNoncompliance,
                        //ts_actiontype.LetterNonComplianceResponseReceived,
                        //ts_actiontype.LetterCommitment,
                        //ts_actiontype.LegalCounsel,
                        //ts_actiontype.RegionalEnforcementUnitREU,
                        //ts_actiontype.RegionalEnforcementUnitReferral,
                        //ts_actiontype.TATCReviewHearing,
                        //ts_actiontype.TATCCorrespondenceSent,
                        //ts_actiontype.TATCCorrespondenceReceived,
                        //ts_actiontype.NotificationNoncompliance,
                        //ts_actiontype.WrittenNotice,
                    ], allActionTypes);
                    break;
                case ts_actioncategory.CorrectiveAction:
                    filteredActionTypeOptions = createFilteredOptions([
                        ts_actiontype.CorrectiveActionPlanRequested,
                        ts_actiontype.CorrectiveActionPlanReceived,
                    ], allActionTypes);
                    break;
                case ts_actioncategory.EnforcementAction:
                    filteredActionTypeOptions = createFilteredOptions([
                        ts_actiontype.AMP,
                        ts_actiontype.Prosecution,
                        ts_actiontype.PunitiveSuspensionofCAD,
                        ts_actiontype.VerbalWarning,
                        ts_actiontype.WrittenWarning,
                    ], allActionTypes);
                    break;
                case ts_actioncategory.ImmediateHarmReductionMeasure:
                    filteredActionTypeOptions = createFilteredOptions([
                        ts_actiontype.DetentionofAircraft,
                        ts_actiontype.Other
                    ], allActionTypes);
                    break;
                //case ts_actioncategory.LegalAction:
                //    filteredActionTypeOptions = createFilteredOptions([ts_actiontype.RegionalEnforcementUnitREU, ts_actiontype.LegalCounsel], allActionTypes);
                //    break;
                case ts_actioncategory.REUEnforcementAction:
                    filteredActionTypeOptions = createFilteredOptions([
                        ts_actiontype.AMP,
                        ts_actiontype.Prosecution,
                        ts_actiontype.PunitiveSuspensionofCAD,
                        ts_actiontype.VerbalWarning,
                        ts_actiontype.WrittenWarning,
                    ], allActionTypes);
                    break;
                //case ts_actioncategory.TATCAction:
                //    filteredActionTypeOptions = createFilteredOptions([
                //        ts_actiontype.TATCCertificateforunpaidAMP,
                //        ts_actiontype.TATCAppealApplication,
                //        ts_actiontype.TATCAppealDetermination,
                //        ts_actiontype.TATCDetermination,
                //        ts_actiontype.TATCReviewApplication,
                //        ts_actiontype.TATCReviewHearing,
                //        ts_actiontype.TATCAppealHearing,
                //    ], allActionTypes);
                //    break;
            }
        }
        setOptions(actionTypeAttribute, filteredActionTypeOptions);
    }

    export function actionTypeOnChange(eContext: Xrm.ExecutionContext<any, any>, onLoad: boolean = false): void {
        const form = <Form.ts_action.Main.ROMAction>eContext.getFormContext();
        const actionCategoryAttributeValue = form.getAttribute("ts_actioncategory").getValue();
        const actionTypeAttributeValue = form.getAttribute("ts_actiontype").getValue();
        const deliveryMethodAttribute = form.getControl("ts_deliverymethod");
        const actionStatusAttribute = form.getControl("ts_actionstatus");

        if (isISSO) {
            handleISSOTypeChange(form, actionCategoryAttributeValue, actionTypeAttributeValue, deliveryMethodAttribute, actionStatusAttribute, onLoad);
        } else {
            handleAvSecTypeChange(form, actionCategoryAttributeValue, actionTypeAttributeValue, deliveryMethodAttribute, actionStatusAttribute, onLoad);
        }
    }

    function handleISSOTypeChange(form: Form.ts_action.Main.ROMAction, actionCategoryAttributeValue: any, actionTypeAttributeValue: any, deliveryMethodAttribute: Xrm.OptionSetControl<any>, actionStatusAttribute: Xrm.OptionSetControl<any>, onLoad: boolean = false): void {
        if (!actionTypeAttributeValue) {
            //form.getAttribute("ts_actionstatus").setValue(null);
            if (!onLoad) {
                clearNonActionFields(form);
            }
            return;
        }

        let filteredDeliveryOptions = allDeliveryMethodOptions
        let filteredActionStatusOptions = allActionStatus;

        switch (actionCategoryAttributeValue) {
            case ts_actioncategory.EnforcementAction:
                switch (actionTypeAttributeValue) {
                    case ts_actiontype.VerbalWarning:
                        form.getControl("ts_stakeholder").setVisible(true);
                        form.getControl("ts_contact").setVisible(true);
                        form.getControl("ts_deliverymethod").setVisible(true);
                        form.getControl("ts_timedate").setVisible(true);
                        form.getControl("ts_details").setVisible(true);

                        form.getControl("ts_location").setVisible(false);
                        form.getControl("ts_duedate").setVisible(false);
                        filteredDeliveryOptions = createFilteredOptions([
                            ts_deliverymethod.InPerson, ts_deliverymethod.Telephone, ts_deliverymethod.Email
                        ], allDeliveryMethodOptions);

                        filteredActionStatusOptions = createFilteredOptions([ts_actionstatus.Delivered], allActionStatus);
                        break;
                    case ts_actiontype.WrittenWarning:
                        form.getControl("ts_stakeholder").setVisible(true);
                        form.getControl("ts_contact").setVisible(true);
                        form.getControl("ts_deliverymethod").setVisible(true);
                        form.getControl("ts_timedate").setVisible(true);
                        form.getControl("ts_details").setVisible(true);

                        form.getControl("ts_location").setVisible(false);
                        form.getControl("ts_duedate").setVisible(false);

                        filteredDeliveryOptions = createFilteredOptions([
                            ts_deliverymethod.Email,
                            ts_deliverymethod.LetterHandDelivered,
                            ts_deliverymethod.LetterMail,
                            ts_deliverymethod.LetterRegisteredMail,
                            ts_deliverymethod.SSCIMS
                        ], allDeliveryMethodOptions);
                        filteredActionStatusOptions = createFilteredOptions([ts_actionstatus.Delivered], allActionStatus);
                        break;
                    case ts_actiontype.RegionalEnforcementUnitREUConsulted:
                        form.getControl("ts_stakeholder").setVisible(false);
                        form.getControl("ts_contact").setVisible(false);
                        form.getControl("ts_deliverymethod").setVisible(false);
                        form.getControl("ts_location").setVisible(false);
                        form.getControl("ts_duedate").setVisible(false);

                        form.getControl("ts_timedate").setVisible(true);
                        form.getControl("ts_details").setVisible(true);

                        filteredActionStatusOptions = createFilteredOptions([ts_actionstatus.Referred], allActionStatus);
                        break;
                    default:
                        resetFieldsVisibility(form);
                }
                break;
            case ts_actioncategory.CorrectiveAction:
                switch (actionTypeAttributeValue) {
                    case ts_actiontype.CorrectiveActionPlanReceived:
                        form.getControl("ts_stakeholder").setVisible(true);
                        form.getControl("ts_contact").setVisible(true);
                        form.getControl("ts_duedate").setVisible(true);
                        form.getControl("ts_timedate").setVisible(true);
                        form.getControl("ts_details").setVisible(true);

                        form.getControl("ts_location").setVisible(false);
                        form.getControl("ts_deliverymethod").setVisible(false);

                        filteredActionStatusOptions = createFilteredOptions([ts_actionstatus.Requested, ts_actionstatus.Received], allActionStatus);
                        break;
                    default:
                        resetFieldsVisibility(form)
                }
                break;
            default:
                resetFieldsVisibility(form);
        }

        setOptions(deliveryMethodAttribute, filteredDeliveryOptions);
        form.getAttribute("ts_deliverymethod").setValue(null);
        setOptions(actionStatusAttribute, filteredActionStatusOptions);

        const currentActionStatusValue = form.getAttribute("ts_actionstatus").getValue();
        const valueExists = filteredActionStatusOptions.some(option => option.value === currentActionStatusValue);
        //if (!valueExists) {
        //    form.getAttribute("ts_actionstatus").setValue(null);
        //}
    }


    function handleAvSecTypeChange(
        form: Form.ts_action.Main.ROMAction, actionCategoryAttributeValue: any, actionTypeAttributeValue: any, deliveryMethodAttribute: Xrm.OptionSetControl<any>, actionStatusAttribute: Xrm.OptionSetControl<any>, onLoad: boolean = false): void {
        //if (!actionTypeAttributeValue) {
        //    form.getAttribute("ts_actionstatus").setValue(null);
        //    return;
        //}

        if (!onLoad) {
            clearNonActionFields(form);
        }

        let filteredDeliveryOptions = allDeliveryMethodOptions;
        let filteredActionStatusOptions = allActionStatus;

        //switch (actionCategoryAttributeValue) {
        //    case ts_actioncategory.AdministrativeAction:
        //        switch (actionTypeAttributeValue) {
        //            case ts_actiontype.AffidavitOfServiceAMP:
        //            //case ts_actiontype.AffidavitOfServiceCancellationSuspensionofCAD:
        //            //    filteredActionStatusOptions = createFilteredOptions([ts_actionstatus.Sworn], allActionStatus);
        //            //    break;
        //            case ts_actiontype.InformalMeeting:
        //                //filteredActionStatusOptions = createFilteredOptions([ts_actionstatus.Delivered, ts_actionstatus.Convened], allActionStatus);
        //                //break;
        //            //case ts_actiontype.Correspondence:
        //            case ts_actiontype.LetterCommitment:
        //            case ts_actiontype.LetterNoncompliance:
        //            case ts_actiontype.LetterSSCOSAFurtherAction:
        //                //filteredActionStatusOptions = createFilteredOptions([ts_actionstatus.Delivered, ts_actionstatus.Received], allActionStatus);
        //                //break;
        //            case ts_actiontype.AMPPayment:
        //                filteredActionStatusOptions = createFilteredOptions([ts_actionstatus.Received], allActionStatus);
        //                break;
        //            //case ts_actiontype.NotificationNoncompliance:
        //            //case ts_actiontype.WrittenNotice:
        //            //    filteredActionStatusOptions = createFilteredOptions([ts_actionstatus.Delivered], allActionStatus);
        //            //    break;
        //            default:
        //                resetFieldsVisibility(form)
        //        }
        //        break;
        //    case ts_actioncategory.CorrectiveAction:
        //        switch (actionTypeAttributeValue) {
        //            case ts_actiontype.CorrectiveActionPlan:
        //                filteredActionStatusOptions = createFilteredOptions([ts_actionstatus.Requested, ts_actionstatus.Received], allActionStatus);
        //                break;
        //            default:
        //                resetFieldsVisibility(form)
        //        }
        //        break;
        //    case ts_actioncategory.EnforcementAction:
        //        switch (actionTypeAttributeValue) {
        //            case ts_actiontype.AMP:
        //            case ts_actiontype.Prosecution:
        //            case ts_actiontype.PunitiveSuspensionofCAD:
        //            case ts_actiontype.VerbalWarning:
        //            case ts_actiontype.WrittenWarning:
        //                filteredActionStatusOptions = createFilteredOptions([ts_actionstatus.Delivered], allActionStatus);
        //                break;
        //            default:
        //                resetFieldsVisibility(form)
        //        }
        //        break;
        //    case ts_actioncategory.ImmediateHarmReductionMeasure:
        //        switch (actionTypeAttributeValue) {
        //            case ts_actiontype.DetentionofAircraft:
        //            case ts_actiontype.Other:
        //                filteredActionStatusOptions = createFilteredOptions([ts_actionstatus.Delivered], allActionStatus);
        //                break;
        //            default:
        //                resetFieldsVisibility(form)
        //        }
        //        break;
        //    //case ts_actioncategory.LegalAction:
        //    //    switch (actionTypeAttributeValue) {
        //    //        case ts_actiontype.RegionalEnforcementUnitREU:
        //    //            filteredActionStatusOptions = createFilteredOptions([ts_actionstatus.Consulted, ts_actionstatus.Referred], allActionStatus);
        //    //            break;
        //    //        case ts_actiontype.LegalCounsel:
        //    //            filteredActionStatusOptions = createFilteredOptions([ts_actionstatus.Consulted], allActionStatus);
        //    //            break;
        //    //        default:
        //    //            resetFieldsVisibility(form)
        //    //    }
        //    //    break;
        //    //case ts_actioncategory.REUEnforcementAction:
        //    //    switch (actionTypeAttributeValue) {
        //    //        case ts_actiontype.AMP:
        //    //        case ts_actiontype.Prosecution:
        //    //        case ts_actiontype.PunitiveSuspensionofCAD:
        //    //        case ts_actiontype.VerbalWarning:
        //    //        case ts_actiontype.WrittenWarning:
        //    //            filteredActionStatusOptions = createFilteredOptions([ts_actionstatus.Received], allActionStatus);
        //    //            break;
        //    //        default:
        //    //            resetFieldsVisibility(form)
        //    //    }
        //    //    break;
        //    //case ts_actioncategory.TATCAction:
        //    //    switch (actionTypeAttributeValue) {
        //    //        case ts_actiontype.TATCAppealApplication:
        //    //            filteredActionStatusOptions = createFilteredOptions([ts_actionstatus.Delivered, ts_actionstatus.Received], allActionStatus);
        //    //            break;
        //    //        case ts_actiontype.TATCAppealDetermination:
        //    //        case ts_actiontype.TATCDetermination:
        //    //            filteredActionStatusOptions = createFilteredOptions([ts_actionstatus.Received], allActionStatus);
        //    //            break;
        //    //        case ts_actiontype.TATCAppealHearing:
        //    //        case ts_actiontype.TATCReviewHearing:
        //    //            filteredActionStatusOptions = createFilteredOptions([ts_actionstatus.Convened], allActionStatus);
        //    //            break;
        //    //        case ts_actiontype.TATCCertificateforunpaidAMP:
        //    //            filteredActionStatusOptions = createFilteredOptions([ts_actionstatus.Requested, ts_actionstatus.Received], allActionStatus);
        //    //            break;
        //    //        case ts_actiontype.TATCReviewApplication:
        //    //            filteredActionStatusOptions = createFilteredOptions([ts_actionstatus.Received], allActionStatus);
        //    //            break;
        //    //        default:
        //    //            resetFieldsVisibility(form)
        //    //    }
        //    //    break;
        //}

        setOptions(deliveryMethodAttribute, filteredDeliveryOptions);
        if (!onLoad) {
            form.getAttribute("ts_deliverymethod").setValue(null);
        }
        setOptions(actionStatusAttribute, filteredActionStatusOptions);

        const currentActionStatusValue = form.getAttribute("ts_actionstatus").getValue();
        const valueExists = filteredActionStatusOptions.some(option => option.value === currentActionStatusValue);
        //if (!valueExists) {
        //    form.getAttribute("ts_actionstatus").setValue(null);
        //}
        if (actionTypeAttributeValue == ts_actiontype.AMP || actionTypeAttributeValue == ts_actiontype.AMPPaymentReceived) {
            form.getControl("ts_amtamount").setVisible(true);
        }
        else {
            form.getControl("ts_amtamount").setVisible(false);
        }
    }


    export function actionStatusOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_action.Main.ROMAction>eContext.getFormContext();

        let actionStatus = form.getAttribute("ts_actionstatus").getValue();
        if (actionStatus != null && (actionStatus == ts_actionstatus.Consulted || actionStatus == ts_actionstatus.Convened || actionStatus == ts_actionstatus.Referred)) {
            form.getControl("ts_deliverymethod").setVisible(false);
            form.getControl("ts_amtamount").setVisible(false);
            form.getControl("ts_duedate").setVisible(false);
        }
        else {
            form.getControl("ts_deliverymethod").setVisible(true);
            form.getControl("ts_amtamount").setVisible(true);
            form.getControl("ts_duedate").setVisible(true);

            let actionType = form.getAttribute("ts_actiontype").getValue();
            if (actionType != null && actionType == ts_actiontype.AMPPaymentReceived) {
                form.getControl("ts_amtamount").setVisible(true);
                if (actionStatus != null && actionStatus == ts_actionstatus.Requested) {
                    form.getControl("ts_duedate").setVisible(true);
                }
                else {
                    form.getControl("ts_duedate").setVisible(false);
                }
            }
            else {
                form.getControl("ts_amtamount").setVisible(false);
                form.getControl("ts_duedate").setVisible(false);
            }
        }
    }


    function createFilteredOptions(options: number[], allOptionsSet: { text: string, value: number }[]) {
        const reverseLookup = Object.fromEntries(allOptionsSet.map(option => [option.value, option.text]));

        return options.map(option => ({
            text: reverseLookup[option],
            value: option
        }));
    }

    function filterCategory(form: Form.ts_action.Main.ROMAction, onLoad: boolean = false) {
        if (isISSO) {
            setOptions(form.getControl("ts_actioncategory"), createFilteredOptions([
                ts_actioncategory.CorrectiveAction,
                ts_actioncategory.EnforcementAction,
            ], allActionCategoryOptions));
        }
        //if (form.getAttribute("ts_actioncategory").getValue() != null && form.getAttribute("ts_actiontype").getValue() == null && form.getAttribute("ts_actionstatus").getValue() == null)
        if (form.getAttribute("ts_actioncategory").getValue() != null && form.getAttribute("ts_actiontype").getValue() == null) {
            if (!onLoad) {
                form.getAttribute("ts_actioncategory").setValue(null);
            }
        }
    }

    async function getOptionSets() {
        allDeliveryMethodOptions = await retrieveOptionSetValues("ts_deliverymethod");
        allActionStatus = await retrieveOptionSetValues("ts_actionstatus");
        allActionTypes = await retrieveOptionSetValues("ts_actiontype");
    }

    async function retrieveOptionSetValues(optionSet) {
        let optionSetData;

        const entityMetadata = await Xrm.Utility.getEntityMetadata("ts_action", [optionSet]);

        if (
            entityMetadata &&
            entityMetadata.Attributes &&
            entityMetadata.Attributes._collection &&
            entityMetadata.Attributes._collection[optionSet]
        ) {
            optionSetData = entityMetadata.Attributes._collection[optionSet].OptionSet;
        }
        return optionSetData;
    }

    export function setRelatedFindingsFetchXML(form: Form.ts_action.Main.ROMAction) {
        let actionId = form.data.entity.getId();
        let gridControl: any = form.getControl("subgrid_related_findings");

        if (gridControl === null) {
            setTimeout(ROM.Action.setRelatedFindingsFetchXML, 1000);
            return;
        }
        else {
            let fetchXml = `<link-entity name="ts_actionfinding" from="ts_ovs_finding" to="ovs_findingid" link-type="inner" alias="aa"><attribute name="ts_ovs_finding"/><filter type="and"><condition attribute="ts_ovs_finding" operator="not-null"/></filter><link-entity name="ts_action" from="ts_actionid" to="ts_action" link-type="inner" alias="ab"><attribute name="ts_actionid"/><filter type="and"><condition attribute="ts_actionid" operator="eq" value="${actionId}"/></filter></link-entity></link-entity>`
            ROM.Utils.setSubgridFilterXml(form, "subgrid_related_findings", fetchXml);
        }
    }
}

