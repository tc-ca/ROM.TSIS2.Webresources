namespace ROM.Aircraft {
    var aircraftModelOptions;

    export async function onLoad(eContext: Xrm.ExecutionContext<any, any>) {
        const form = <Form.ts_aircraft.Main.ROMAircraft>eContext.getFormContext();
        aircraftModelOptions = form.getControl("ts_model").getOptions();

        //if (form.ui.getFormType() == 2) {
        //    aircraftManufacturerOnChange(eContext);
        //}
    }

    export function aircraftManufacturerOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_aircraft.Main.ROMAircraft>eContext.getFormContext();

        const aircraftmanufacturer = form.getAttribute("ts_manufacturer").getValue();
        var options = form.getControl("ts_model").getOptions();
        for (var i = 0; i < options.length; i++)
            form.getControl("ts_model").removeOption(options[i].value);

        //form.getControl("ts_model").setVisible(true);
        if (aircraftmanufacturer == ts_aircraftmanufacturer.Boeing) {
            for (var i = 1; i <= 11; i++) {
                form.getControl("ts_model").addOption(aircraftModelOptions[i]);
            }
        }
        else if (aircraftmanufacturer == ts_aircraftmanufacturer.Airbus) {
            for (var i = 12; i <= 22; i++) {
                form.getControl("ts_model").addOption(aircraftModelOptions[i]);
            }
        }
        else if (aircraftmanufacturer == ts_aircraftmanufacturer.DeHavilland) {
            for (var i = 23; i <= 24; i++) {
                form.getControl("ts_model").addOption(aircraftModelOptions[i]);
            }
        }
        else if (aircraftmanufacturer == ts_aircraftmanufacturer.Bombardier) {
            for (var i = 25; i <= 25; i++) {
                form.getControl("ts_model").addOption(aircraftModelOptions[i]);
            }
        }
        else if (aircraftmanufacturer == ts_aircraftmanufacturer.Embraer) {
            for (var i = 26; i <= 29; i++) {
                form.getControl("ts_model").addOption(aircraftModelOptions[i]);
            }
        }
        else if (aircraftmanufacturer == ts_aircraftmanufacturer.Other) {
            //form.getControl("ts_modelother").setVisible(true);
            //form.getControl("ts_model").setVisible(false);
        }
    }

}



