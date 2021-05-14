import MainForm from "../src/Questionnaire/MainForm"

namespace ROM.Questionnaire {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
      MainForm.onLoad(eContext);
    }
    export function onSave(eContext: Xrm.ExecutionContext<any, any>): void {
      MainForm.onSave(eContext);
    }
}
