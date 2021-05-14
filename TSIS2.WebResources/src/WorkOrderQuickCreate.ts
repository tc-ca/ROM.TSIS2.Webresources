import QuickCreate from "../src/WorkOrder/QuickCreate";

namespace ROM.WorkOrderQuickCreate {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
      QuickCreate.onLoad(eContext);
    }
    export function regionOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
      QuickCreate.regionOnChange(eContext);
    }
    export function workOrderTypeOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
      QuickCreate.workOrderTypeOnChange(eContext);
    }
    export function operationTypeOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
      QuickCreate.operationTypeOnChange(eContext);
    }
  }
