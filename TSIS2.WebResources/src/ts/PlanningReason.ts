namespace ROM.PlanningReason {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = eContext.getFormContext();

        // Log Team/BU ownership status to console
        logCurrentTeamOwnershipStatus(form);
    }

    export async function onSave(eContext: Xrm.ExecutionContext<any, any>): Promise<void> {
        const form = eContext.getFormContext();

        try {
            // Team ownership assignment
            await assignUserTeamOwnershipOnSave(form);
        } catch (error) {
            console.error("[PlanningReason.onSave] Error:", error);
        }
    }
}
