namespace ROM.OperationType {
    export async function onLoad(eContext: Xrm.ExecutionContext<any, any>) {
        const form = <Form.ovs_operationtype.Main.Information>eContext.getFormContext();

        //If owner is Aviation Security
        const ownerAttribute = form.getAttribute("ownerid")
        const ownerAttributeValue = ownerAttribute.getValue();

        if (ownerAttributeValue != null && ownerAttributeValue[0]) {
            const isAvSec = await isOwnedByAvSec(ownerAttributeValue);
            form.getControl("Subgrid_EntityRisk").setVisible(isAvSec);
        } else {
            form.getControl("Subgrid_EntityRisk").setVisible(false);
        }

    }
    export function onSave(eContext: Xrm.ExecutionContext<any, any>): void {
        console.log("onSave working");
    }

}