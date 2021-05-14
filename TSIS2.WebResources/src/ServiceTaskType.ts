import MainForm from "../src/ServiceTaskType/MainForm";

namespace ROM.ServiceTaskType {
    export function ToggleQuestionnaire(eContext: Xrm.ExecutionContext<any, any>): void {
      MainForm.ToggleQuestionnaire(eContext);
    }
}
