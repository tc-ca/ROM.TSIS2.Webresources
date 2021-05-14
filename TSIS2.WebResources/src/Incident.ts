import MainForm from "../src/Incident/MainForm";

namespace ROM.Incident {
  export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
    MainForm.onLoad(eContext);
  }
  export function regionOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
    MainForm.regionOnChange(eContext);
  }
  export function countryOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
    MainForm.countryOnChange(eContext);
  }
  export function stakeholderOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
    MainForm.stakeholderOnChange(eContext);
  }
}
