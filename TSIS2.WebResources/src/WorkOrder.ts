import MainForm from "../src/WorkOrder/MainForm";

namespace ROM.WorkOrder {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
      MainForm.onLoad(eContext);
    }
    export function onSave(eContext: Xrm.ExecutionContext<any, any>): void {
      MainForm.onSave(eContext);
    }
    export function workOrderTypeOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
      MainForm.workOrderTypeOnChange(eContext);
    }
    export function regionOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
      MainForm.regionOnChange(eContext);
    }
    export function countryOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
      MainForm.countryOnChange(eContext);
    }
    export function fiscalYearOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
      MainForm.fiscalYearOnChange(eContext);
    }
    export function operationTypeOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
      MainForm.operationTypeOnChange(eContext);
    }
    export function stakeholderOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
      MainForm.stakeholderOnChange(eContext);
    }
    export function siteOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
      MainForm.siteOnChange(eContext);
    }
    export function systemStatusOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
      MainForm.systemStatusOnChange(eContext);
    }
    export function caseOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
      MainForm.caseOnChange(eContext);
    }
    export function stateCodeOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
      MainForm.stateCodeOnChange(eContext);
    }
    export function updateCaseView(eContext: Xrm.ExecutionContext<any, any>): void {
      MainForm.updateCaseView(eContext);
    }
}