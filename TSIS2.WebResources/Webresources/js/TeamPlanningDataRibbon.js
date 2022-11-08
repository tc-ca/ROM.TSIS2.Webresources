
function recalculateTeamPlanningDataValues(formContext) {
    let teamPlanningDataId = formContext.data.entity.getId();

    let teamPlanningDataPlannedQ1 = 0;
    let teamPlanningDataPlannedQ2 = 0;
    let teamPlanningDataPlannedQ3 = 0;
    let teamPlanningDataPlannedQ4 = 0;

    let teamPlanningDataAvailableInspectorHoursQ1 = 0;
    let teamPlanningDataAvailableInspectorHoursQ2 = 0;
    let teamPlanningDataAvailableInspectorHoursQ3 = 0;
    let teamPlanningDataAvailableInspectorHoursQ4 = 0;

    let teamPlanningDataTeamEstimatedDurationQ1 = 0;
    let teamPlanningDataTeamEstimatedDurationQ2 = 0;
    let teamPlanningDataTeamEstimatedDurationQ3 = 0;
    let teamPlanningDataTeamEstimatedDurationQ4 = 0;

    let ts_teamPlanningDataResidualinspectorhoursQ1 = 0;
    let ts_teamPlanningDataResidualinspectorhoursQ2 = 0;
    let ts_teamPlanningDataResidualinspectorhoursQ3 = 0;
    let ts_teamPlanningDataResidualinspectorhoursQ4 = 0;

    var fetchXml = [
        "<fetch>",
        "  <entity name='ts_planningdata'>",
        "    <filter>",
        "      <condition attribute='ts_teamplanningdata' operator='eq' value='", teamPlanningDataId , "' uitype='team'/>",
        "    </filter>",
        "  </entity>",
        "</fetch>"
    ].join("");
    fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
    Xrm.WebApi.retrieveMultipleRecords("ts_planningdata", fetchXml).then(async function success(result) {
        for (let planningData of result.entities) {
            teamPlanningDataPlannedQ1 += planningData.ts_plannedq1;
            teamPlanningDataPlannedQ2 += planningData.ts_plannedq2;
            teamPlanningDataPlannedQ3 += planningData.ts_plannedq3;
            teamPlanningDataPlannedQ4 += planningData.ts_plannedq4;

            teamPlanningDataTeamEstimatedDurationQ1 += planningData.ts_plannedq1 * planningData.ts_teamestimatedduration;
            teamPlanningDataTeamEstimatedDurationQ2 += planningData.ts_plannedq2 * planningData.ts_teamestimatedduration;
            teamPlanningDataTeamEstimatedDurationQ3 += planningData.ts_plannedq3 * planningData.ts_teamestimatedduration;
            teamPlanningDataTeamEstimatedDurationQ4 += planningData.ts_plannedq4 * planningData.ts_teamestimatedduration;

            let baselineHoursFetchXml = [
                "<fetch top='1'>",
                "  <entity name='ts_baselinehours'>",
                "    <attribute name='ts_plannedq1'/>",
                "    <attribute name='ts_plannedq4'/>",
                "    <attribute name='ts_plannedq3'/>",
                "    <attribute name='ts_plannedq2'/>",
                "    <filter>",
                "      <condition attribute='ts_team' operator='eq' value='", teamId, "'/>",
                "    </filter>",
                "  </entity>",
                "</fetch>"
            ].join("");
            baselineHoursFetchXml = "?fetchXml=" + encodeURIComponent(baselineHoursFetchXml);
            let baselineHours = await Xrm.WebApi.retrieveMultipleRecords("ts_baselinehours", baselineHoursFetchXml).then(async function success(result) { return result.entities[0] });

            if (baselineHours != null) {
                teamPlanningDataAvailableInspectorHoursQ1 = baselineHours.ts_plannedq1;
                teamPlanningDataAvailableInspectorHoursQ2 = baselineHours.ts_plannedq2;
                teamPlanningDataAvailableInspectorHoursQ3 = baselineHours.ts_plannedq3;
                teamPlanningDataAvailableInspectorHoursQ4 = baselineHours.ts_plannedq4;

                ts_teamPlanningDataResidualinspectorhoursQ1 = teamPlanningDataAvailableInspectorHoursQ1 - teamPlanningDataTeamEstimatedDurationQ1;
                ts_teamPlanningDataResidualinspectorhoursQ2 = teamPlanningDataAvailableInspectorHoursQ2 - teamPlanningDataTeamEstimatedDurationQ2;
                ts_teamPlanningDataResidualinspectorhoursQ3 = teamPlanningDataAvailableInspectorHoursQ3 - teamPlanningDataTeamEstimatedDurationQ3;
                ts_teamPlanningDataResidualinspectorhoursQ4 = teamPlanningDataAvailableInspectorHoursQ4 - teamPlanningDataTeamEstimatedDurationQ4;
            }
        }

        formContext.getAttribute("ts_plannedactivityq1").setValue(teamPlanningDataPlannedQ1);
        formContext.getAttribute("ts_plannedactivityq2").setValue(teamPlanningDataPlannedQ2);
        formContext.getAttribute("ts_plannedactivityq3").setValue(teamPlanningDataPlannedQ3);
        formContext.getAttribute("ts_plannedactivityq4").setValue(teamPlanningDataPlannedQ4);
        formContext.getAttribute("ts_availablehoursq1").setValue(teamPlanningDataAvailableInspectorHoursQ1);
        formContext.getAttribute("ts_availablehoursq2").setValue(teamPlanningDataAvailableInspectorHoursQ2);
        formContext.getAttribute("ts_availablehoursq3").setValue(teamPlanningDataAvailableInspectorHoursQ3);
        formContext.getAttribute("ts_availablehoursq4").setValue(teamPlanningDataAvailableInspectorHoursQ4);
        formContext.getAttribute("ts_teamestimateddurationq1").setValue(teamPlanningDataTeamEstimatedDurationQ1)
        formContext.getAttribute("ts_teamestimateddurationq2").setValue(teamPlanningDataTeamEstimatedDurationQ2)
        formContext.getAttribute("ts_teamestimateddurationq3").setValue(teamPlanningDataTeamEstimatedDurationQ3)
        formContext.getAttribute("ts_teamestimateddurationq4").setValue(teamPlanningDataTeamEstimatedDurationQ4)
        formContext.getAttribute("ts_residualinspectorhoursq1").setValue(ts_teamPlanningDataResidualinspectorhoursQ1)
        formContext.getAttribute("ts_residualinspectorhoursq2").setValue(ts_teamPlanningDataResidualinspectorhoursQ2)
        formContext.getAttribute("ts_residualinspectorhoursq3").setValue(ts_teamPlanningDataResidualinspectorhoursQ3)
        formContext.getAttribute("ts_residualinspectorhoursq4").setValue(ts_teamPlanningDataResidualinspectorhoursQ4)
        formContext.data.entity.save();
    });
}