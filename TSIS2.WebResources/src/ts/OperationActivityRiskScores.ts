namespace ROM.OperationActivityRiskScores {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_operationactivityriskscores.Main.Information>eContext.getFormContext();
        console.log("Entering onLoad");
    }

    export function onSave(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_operationactivityriskscores.Main.Information>eContext.getFormContext();
        console.log("Entering onSave");
    }

}