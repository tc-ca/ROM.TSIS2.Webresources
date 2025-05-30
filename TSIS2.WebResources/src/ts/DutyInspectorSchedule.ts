namespace ROM.DutyInspectorSchedule {
    export async function onSave(eContext: Xrm.ExecutionContext<any, any>) {
        const form = <Form.ts_dutyinspectorschedule.Main.Information>eContext.getFormContext();
        let region = form.getAttribute("ts_region").getValue();
        let fiscalYear = form.getAttribute("ts_fiscalyear").getValue();
        let fiscalYearId, regionId;
        let regionName, fiscalYearName;
        var eventArgs = eContext.getEventArgs();

        eventArgs.preventDefault();

        if (fiscalYear != null && region != null) {
            fiscalYearId = fiscalYear[0].id.slice(1, -1);
            regionId = region[0].id.slice(1, -1);
        }
        // Fetch region name
        await Xrm.WebApi.retrieveRecord("territory", regionId, "?$select=name").then(
            function success(result) {
                regionName = result.name;
            }
        );

        // Fetch fiscal year name
        await Xrm.WebApi.retrieveRecord("tc_tcfiscalyear", fiscalYearId, "?$select=tc_name").then(
            function success(result) {
                fiscalYearName = result.tc_name;
            }
        );
        form.getAttribute("ts_name").setValue(regionName + " - " + fiscalYearName);

        // Let the form fully reset, then save
        setTimeout(function () {
            // Save again now that value is set
            form.data.save();
        }, 500); // slight delay to avoid conflict
    }
}