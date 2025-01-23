namespace ROM.OperationType {
    export async function onLoad(eContext: Xrm.ExecutionContext<any, any>) {
        console.log("onLoad working");
    }
    export function onSave(eContext: Xrm.ExecutionContext<any, any>): void {
        console.log("onSave working");
    }

}