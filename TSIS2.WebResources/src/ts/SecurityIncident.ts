namespace ROM.SecurityIncident {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_securityincident.Main.Information>eContext.getFormContext();
        if (formContext.ui.getFormType() == 2) {
            StatusOfRailwayOwnerOnChange(eContext);
        }
    }
    export function StatusOfRailwayOwnerOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        let formContext = <Form.ts_securityincident.Main.Information>eContext.getFormContext();
        let statusOfRailwayOwner = formContext.getAttribute("ts_statusofrailwayowner").getValue();
        if (statusOfRailwayOwner == null || (statusOfRailwayOwner != null && statusOfRailwayOwner == ts_statusofrailwayowner.Known))
            formContext.getControl("ts_owneroftherailwaylinetrack").setVisible(true);
        else
            formContext.getControl("ts_owneroftherailwaylinetrack").setVisible(false);
    }
}