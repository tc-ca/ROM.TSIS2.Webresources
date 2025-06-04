namespace ROM.PrescribedFrequencyOverride {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_prescribedfrequencyoverride.Main.Information>eContext.getFormContext();
        console.log("Entering onLoad");


    }
}