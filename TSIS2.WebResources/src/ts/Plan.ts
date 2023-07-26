namespace ROM.Plan {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext: any = eContext.getFormContext();
        if (formContext.ui.getFormType() == 1) { //Create
            formContext.data.entity.addOnPostSave(generateSuggestedInspections);
        }
    }

    async function generateSuggestedInspections(eContext: Xrm.ExecutionContext<any, any>) {
        const formContext: any = eContext.getFormContext();
        formContext.data.entity.removeOnPostSave(generateSuggestedInspections);
        const planId = formContext.data.entity.getId().slice(1, -1);
        let teamValue = formContext.getAttribute("ts_team").getValue();
        let teamId;
        let teamName;
        if (teamValue != null) {
            teamId = teamValue[0].id;
            teamName = teamValue[0].name;
        }

        const planningDataFiscalYearValue = formContext.getAttribute("ts_fiscalyear").getValue()
        let planningDataFiscalYearName;
        let planningDataFiscalYearId;
        if (planningDataFiscalYearValue != null) {
            planningDataFiscalYearName = planningDataFiscalYearValue[0].name;
            planningDataFiscalYearId = planningDataFiscalYearValue[0].id.slice(1, -1);
        }

        if (teamId != null && planningDataFiscalYearId != null) {
            //Show Loading Wheel

            //TODO Add some code to generate some mock suggested inspections

            //Get Baseline Hours of Team
            var baselineHoursfetchXml = [
                "<fetch>",
                "  <entity name='ts_baselinehours'>",
                "    <attribute name='ts_team'/>",
                "    <filter>",
                "      <condition attribute='ts_team' operator='eq' value='", teamId, "'uitype='team'/>",
                "    </filter>",
                "  </entity>",
                "</fetch>"
            ].join("");
            baselineHoursfetchXml = "?fetchXml=" + encodeURIComponent(baselineHoursfetchXml);
            let baselineHours = await Xrm.WebApi.retrieveMultipleRecords("ts_baselinehours", baselineHoursfetchXml).then(function success(result) {
                return result.entities[0];
            });

            if (baselineHours != null && baselineHours.ts_baselinehoursid != null) {
                //Retrieve all inspector hours records with the same baseline hours
                var inspectorHoursfetchXml  = [
                    "<fetch>",
                    "  <entity name='ts_inspectionhours'>",
                    "    <attribute name='ts_totalhoursq1'/>",
                    "    <attribute name='ts_totalhoursq2'/>",
                    "    <attribute name='ts_totalhoursq3'/>",
                    "    <attribute name='ts_totalhoursq4'/>",
                    "    <attribute name='ts_inspectionhoursid'/>",
                    "    <filter>",
                    "      <condition attribute='ts_baselinehours' operator='eq' value='", baselineHours.ts_baselinehoursid, "' uitype='ts_baselinehours'/>",
                    "    </filter>",
                    "    <link-entity name='systemuser' from='systemuserid' to='ts_inspector' alias='user'>",
                    "      <attribute name='fullname'/>",
                    "    </link-entity>",
                    "  </entity>",
                    "</fetch>"
                ].join("");
                inspectorHoursfetchXml = "?fetchXml=" + encodeURIComponent(inspectorHoursfetchXml);
                let teamInspectorHours = await Xrm.WebApi.retrieveMultipleRecords("ts_inspectionhours", inspectorHoursfetchXml).then(function success(result) {
                    return result.entities;
                });

                if (teamInspectorHours != null && teamInspectorHours.length > 0) {
                    //For each inspector, create an Plan Inspector Hours record
                    for (let inspectorHours of teamInspectorHours) {
                        let data = {
                            "ts_name": inspectorHours["user.fullname"] + " | " + teamName + " | " + planningDataFiscalYearName,
                            "ts_inspectorhours@odata.bind": "/ts_inspectorhours(" + inspectorHours.ts_inspectionhoursid + ")",
                            "ts_plan@odata.bind": "/ts_plans(" + planId + ")",
                            "ts_totalhoursq1": inspectorHours.ts_totalhoursq1,
                            "ts_totalhoursq2": inspectorHours.ts_totalhoursq2,
                            "ts_totalhoursq3": inspectorHours.ts_totalhoursq3,
                            "ts_totalhoursq4": inspectorHours.ts_totalhoursq4,
                            "ts_remaininghoursq1": 0,
                            "ts_remaininghoursq2": 0,
                            "ts_remaininghoursq3": 0,
                            "ts_remaininghoursq4": 0
                        }
                        Xrm.WebApi.createRecord("ts_planinspectorhours", data);
                    }
                }
            }
        }

        //Hide loading wheel
    }

    function recalculate() {

    }
}