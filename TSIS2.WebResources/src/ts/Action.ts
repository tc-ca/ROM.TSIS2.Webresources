namespace ROM.Action {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_action.Main.Information>eContext.getFormContext();
        if(form.ui.getFormType() != 0 && form.ui.getFormType() != 1 && form.ui.getFormType() != 6){
            setRelatedFindingsFetchXML(form)
        }
        actionStatusOnChange(eContext);
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
    }
}