import MainForm from "../src/IncidentTypeServiceTask/MainForm";

namespace ROM.IncidentTypeServiceTask {
    export function ToggleQuestionnaire(eContext: Xrm.ExecutionContext<any, any>): void {
      MainForm.ToggleQuestionnaire(eContext);
    }
    export function OnTaskTypeChange(eContext: Xrm.ExecutionContext<any, any>): void {
      MainForm.OnTaskTypeChange(eContext);
    }
}
