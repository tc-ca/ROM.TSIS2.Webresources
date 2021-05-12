import MainForm from "./Account/MainForm";

namespace ROM.Account {

  export function onLoad(executionContext: Xrm.ExecutionContext<Form.account.Main.ROMInformation, any>) {
    MainForm.onLoad(executionContext);
  }

  export function regionOnChange(executionContext: Xrm.ExecutionContext<any, any>): void {
    MainForm.regionOnChange(executionContext);
  }

  export function countryOnChange(executionContext: Xrm.ExecutionContext<any, any>): void {
    MainForm.countryOnChange(executionContext);
  }
}