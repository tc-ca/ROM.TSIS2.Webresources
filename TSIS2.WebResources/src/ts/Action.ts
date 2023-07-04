namespace ROM.Action {
    const allDeliveryMethodOptions = [
        { text: "Verbal", value: ts_deliverymethod.Verbal },
        { text: "In Person", value: ts_deliverymethod.InPerson },
        { text: "Telephone", value: ts_deliverymethod.Telephone },
        { text: "Email", value: ts_deliverymethod.Email },
        { text: "SSCIMS", value: ts_deliverymethod.SSCIMS },
        { text: "Letter - Hand delivered", value: ts_deliverymethod.LetterHandDelivered },
        { text: "Letter - Mail", value: ts_deliverymethod.LetterMail },
        { text: "Letter - Registered Mail", value: ts_deliverymethod.LetterRegisteredMail }
    ];
       
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_action.Main.Information>eContext.getFormContext();
        if(form.ui.getFormType() != 0 && form.ui.getFormType() != 1 && form.ui.getFormType() != 6){
            setRelatedFindingsFetchXML(form)
        }
        else if(form.ui.getFormType() != 2){
            actionCategoryOnChange(eContext);
        }
        actionStatusOnChange(eContext);
    }

    function setOptions(attribute, options) {
        attribute.clearOptions();
        options.forEach(option => attribute.addOption(option));
    }

    function resetFieldsVisibility(form: Form.ts_action.Main.ROMAction) {
        form.getControl("ts_stakeholder").setVisible(true);
        form.getControl("ts_contact").setVisible(true);
        form.getControl("ts_deliverymethod").setVisible(true);
        form.getControl("ts_location").setVisible(true);
    }

    export function actionCategoryOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_action.Main.ROMAction>eContext.getFormContext();
        const actionCategoryAttributeValue = form.getAttribute("ts_actioncategory").getValue();
        const actionTypeAttributeValue = form.getAttribute("ts_actiontype").getValue();
        const deliveryMethodAttribute = form.getControl("ts_deliverymethod");
    
        if (actionCategoryAttributeValue == ts_actioncategory.EnforcementAction) {
            let filteredOptions = allDeliveryMethodOptions
    
            if (actionTypeAttributeValue == ts_actiontype.VerbalWarning) {
                filteredOptions = [
                    { text: "In Person", value: ts_deliverymethod.InPerson },
                    { text: "Telephone", value: ts_deliverymethod.Telephone },
                    { text: "Email", value: ts_deliverymethod.Email }
                ];
                resetFieldsVisibility(form);
                form.getControl("ts_location").setVisible(false);
            } else if (actionTypeAttributeValue == ts_actiontype.WrittenWarning) {
                filteredOptions = [
                    { text: "Email", value: ts_deliverymethod.Email },
                    { text: "Letter - Hand delivered", value: ts_deliverymethod.LetterHandDelivered },
                    { text: "Letter - Mail", value: ts_deliverymethod.LetterMail },
                    { text: "Letter - Registered Mail", value: ts_deliverymethod.LetterRegisteredMail },
                    { text: "SSCIMS", value: ts_deliverymethod.SSCIMS }
                ];
                resetFieldsVisibility(form);
                form.getControl("ts_location").setVisible(false);
            } else if (actionTypeAttributeValue == ts_actiontype.RegionalEnforcementUnitREU) {
                form.getControl("ts_stakeholder").setVisible(false);
                form.getControl("ts_contact").setVisible(false);
                form.getControl("ts_deliverymethod").setVisible(false);
                form.getControl("ts_location").setVisible(false);
            } else {
                filteredOptions = allDeliveryMethodOptions;
                resetFieldsVisibility(form);
            }
            setOptions(deliveryMethodAttribute, filteredOptions);
        }
        else {
            resetFieldsVisibility(form);
            setOptions(deliveryMethodAttribute, allDeliveryMethodOptions);
        }
    }

    export function setRelatedFindingsFetchXML(form: Form.ts_action.Main.Information) {
        let gridControl: any = form.getControl("subgrid_related_findings");

        if (gridControl === null) {
            setTimeout(ROM.Action.setRelatedFindingsFetchXML, 1000);
            return;
        }
        else{
            let actionId = form.data.entity.getId();

            let fetchXml = `<link-entity name="ts_actionfinding" from="ts_ovs_finding" to="ovs_findingid" link-type="inner" alias="aa"><attribute name="ts_ovs_finding"/><filter type="and"><condition attribute="ts_ovs_finding" operator="not-null"/></filter><link-entity name="ts_action" from="ts_actionid" to="ts_action" link-type="inner" alias="ab"><attribute name="ts_actionid"/><filter type="and"><condition attribute="ts_actionid" operator="eq" value="${actionId}"/></filter></link-entity></link-entity>`

            ROM.Utils.setSubgridFilterXml(form, "subgrid_related_findings", fetchXml);
        }
    } 

    export function actionStatusOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_action.Main.ROMAction>eContext.getFormContext();

        let actionStatus = form.getAttribute("ts_actionstatus").getValue();
        if (actionStatus != null && (actionStatus == ts_actionstatus.Consulted || actionStatus == ts_actionstatus.Convened)) {
            form.getControl("ts_deliverymethod").setVisible(false);
            form.getControl("ts_amtamount").setVisible(false);
            form.getControl("ts_duedate").setVisible(false);
        }
        else {
            form.getControl("ts_deliverymethod").setVisible(true);
            form.getControl("ts_amtamount").setVisible(true);
            form.getControl("ts_duedate").setVisible(true);

            let actionType = form.getAttribute("ts_actiontype").getValue();
            if (actionType != null && actionType == ts_actiontype.AMPPayment) {
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

    export function actionTypeOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        actionStatusOnChange(eContext);
        actionCategoryOnChange(eContext);
    }
}