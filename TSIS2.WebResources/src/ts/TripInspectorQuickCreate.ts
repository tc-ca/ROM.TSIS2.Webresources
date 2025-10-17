namespace ROM.TripInspectorQuickCreate {
    // EVENTS
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_tripinspector.QuickCreate.NewForm>eContext.getFormContext();
        const tripLookup = form.getAttribute("ts_trip").getValue();
        if (tripLookup && tripLookup.length > 0) {
            const tripId = tripLookup[0].id.replace("{", "").replace("}", "");

            // Retrieve the ts_region value from the parent Trip record
            Xrm.WebApi.retrieveRecord("ts_trip", tripId, "?$select=_ts_region_value").then(
                function success(result) {
                    const regionId = result["_ts_region_value"];
                    if (regionId) {
                        console.log("Trip Region retrieved:", regionId);
                        filterInspectorByRegion(form, regionId);
                    } else {
                        console.log("Trip has no region set. No filter applied.");
                    }
                },
                function (error) {
                    console.error("Error retrieving Trip region:", error.message);
                }
            );
        }
    }

    function filterInspectorByRegion(form, regionId) {
        const inspector = form.getControl("ts_inspector");

        inspector.addPreSearch(function () {
            const filterXml = `
            <filter type="and">
                <condition attribute="territoryid" operator="eq" value="${regionId}" />
            </filter>`;
            inspector.addCustomFilter(filterXml, "systemuser");
        });
    }
}