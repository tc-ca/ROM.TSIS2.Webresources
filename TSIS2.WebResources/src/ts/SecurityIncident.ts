namespace ROM.SecurityIncident {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_securityincident.Main.Information>eContext.getFormContext();
        if (formContext.ui.getFormType() == 2) {
            StatusOfRailwayOwnerOnChange(eContext);
        }
    }
    export function StatusOfRailwayOwnerOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_securityincident.Main.Information>eContext.getFormContext();

        let statusOfRailwayOwner = form.getAttribute("ts_statusofrailwayowner").getValue();
        if (statusOfRailwayOwner == null || (statusOfRailwayOwner != null && statusOfRailwayOwner == ts_statusofrailwayowner.Known))
            form.getControl("ts_owneroftherailwaylinetrack").setVisible(true);
        else
            form.getControl("ts_owneroftherailwaylinetrack").setVisible(false);

        if(form.getAttribute("ts_delaystooperation").getValue() == ts_delaystooperation.Known){
            form.getControl("ts_delaystooperationtime").setVisible(true);
        }

        if(form.getAttribute("ts_arrests").getValue() == ts_arrestsknownorunknown.Known){
            form.getControl("ts_arrestscount").setVisible(true);
            form.getControl("ts_arrestsdetails").setVisible(true);
        }
    }

    export function delaysToOperationOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_securityincident.Main.Information>eContext.getFormContext();

        const delaysToOperations = form.getAttribute("ts_delaystooperation");

        if (delaysToOperations.getValue() == ts_delaystooperation.Known) {
            form.getControl("ts_delaystooperationtime").setVisible(true);
        }
    }

    export function arrestsOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_securityincident.Main.Information>eContext.getFormContext();

        const arrests = form.getAttribute("ts_arrests");

        if (arrests.getValue() == ts_arrestsknownorunknown.Known) {
            form.getControl("ts_arrestscount").setVisible(true);
            form.getControl("ts_arrestsdetails").setVisible(true);
        }
    }
}