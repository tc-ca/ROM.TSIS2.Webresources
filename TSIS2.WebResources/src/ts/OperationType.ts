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

        // Log Rail Safety ownership status to console
        logRailSafetyOwnershipStatus(form);
    }

    export async function onSave(eContext: Xrm.ExecutionContext<any, any>): Promise<void> {
        const form = <Form.ovs_operationtype.Main.Information>eContext.getFormContext();

        try {
            // Rail Safety ownership assignment
            await assignRailSafetyOwnershipOnSave(form);
        } catch (error) {
            console.error("[OperationType.onSave] Error:", error);
        }
    }

}