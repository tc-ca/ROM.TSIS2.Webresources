import QuickCreate from "../src/Incident/QuickCreate";

namespace ROM.IncidentQuickCreate {
  export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
    QuickCreate.onLoad(eContext);
  }
  export function regionOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
    QuickCreate.regionOnChange(eContext);
  }
}
