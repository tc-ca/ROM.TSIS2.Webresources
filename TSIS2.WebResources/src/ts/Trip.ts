/* eslint-disable @typescript-eslint/triple-slash-reference */
namespace ROM.Trip {
    // EVENTS
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_trip.Main.Information>eContext.getFormContext();

        if (userHasRole("System Administrator|ROM - Business Admin|ROM - Planner|ROM - Manager")) {
            form.getControl("ts_fiscalyear").setDisabled(false);
            console.log("Enable role");

        } else {
            form.getControl("ts_fiscalyear").setDisabled(true);

        }
        toggleSubgrid(form);
    }

    export function onProgramChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_trip.Main.Information>eContext.getFormContext();

        toggleSubgrid(form);
    }

    /**
    * Shows or hides the Work Orders and Inspections subgrids 
    * based on the selected `ts_program` option set value.
    *
    * @param form The Trip form context.
    */
    function toggleSubgrid(form: Form.ts_trip.Main.Information): void {
        const programValue = form.getAttribute("ts_program")?.getValue();
        const tripInspectionGrid = form.getControl("Inspections");
        const workOrderGrid = form.getControl("Work_Orders");

        switch (programValue) {
            case 741130000: // Aviation Security -> show Work Orders subgrid only
                tripInspectionGrid?.setVisible(false);
                workOrderGrid?.setVisible(true);
                break;

            case 741130001: // Rail Security -> show Trip Inspections subgrid only
                tripInspectionGrid?.setVisible(true);
                workOrderGrid?.setVisible(false);
                break;

            default:
                tripInspectionGrid?.setVisible(false);
                workOrderGrid?.setVisible(false);
                break;
        }
    }
}
