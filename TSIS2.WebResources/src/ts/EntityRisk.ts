namespace ROM.EntityRisk {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_entityrisk.Main.Information>eContext.getFormContext();
        console.log("Entering EntityRisk onLoad");
    }

    export function onSave(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_entityrisk.Main.Information>eContext.getFormContext();
        console.log("Entering EntityRisk onSave");
    }
}