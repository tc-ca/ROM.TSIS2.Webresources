async function recalculate(formContext) {
    const planId = formContext.data.entity.getId().slice(1, -1);
    Xrm.Utility.showProgressIndicator();

    let teamPlanningDataPlannedQ1 = 0;
    let teamPlanningDataPlannedQ2 = 0;
    let teamPlanningDataPlannedQ3 = 0;
    let teamPlanningDataPlannedQ4 = 0;
    let teamPlanningDataPlannedTotal = 0;

    let teamPlanningDataTeamEstimatedDurationQ1 = 0;
    let teamPlanningDataTeamEstimatedDurationQ2 = 0;
    let teamPlanningDataTeamEstimatedDurationQ3 = 0;
    let teamPlanningDataTeamEstimatedDurationQ4 = 0;
    let teamPlanningDataTeamEstimatedDurationTotal = 0;

    //Retrieve the Plan Inspector Hours records with the user id
    let planInspectorHoursFetchXml = [
        "<fetch>",
        "  <entity name='ts_planinspectorhours'>",
        "    <attribute name='ts_planinspectorhoursid'/>",
        "    <filter>",
        "      <condition attribute='ts_plan' operator='eq' value='", planId, "' uiname='Test Plan 1' uitype='ts_plan'/>",
        "    </filter>",
        "    <link-entity name='ts_inspectionhours' from='ts_inspectionhoursid' to='ts_inspectorhours' alias='inspectorhours'>",
        "      <attribute name='ts_inspector'/>",
        "      <attribute name='ts_totalhoursq1'/>",
        "      <attribute name='ts_totalhoursq2'/>",
        "      <attribute name='ts_totalhoursq3'/>",
        "      <attribute name='ts_totalhoursq4'/>",
        "    </link-entity>",
        "  </entity>",
        "</fetch>"
    ].join("");
    planInspectorHoursFetchXml = "?fetchXml=" + encodeURIComponent(planInspectorHoursFetchXml);
    let inspectorIds = [];
    let planInspectorHours = await Xrm.WebApi.retrieveMultipleRecords("ts_planinspectorhours", planInspectorHoursFetchXml).then(function success(result) {
        //Convert the result to a format easier to work with
        let inspectorHours = {};
        for (let planInspectorHoursRecord of result.entities) {
            //Total hours data for an inspector will be stored as property on the inspectorHours object, with the inspector's id as the property's name
            //This let's us quickly find the inspector without having to iterate through an array to find a matching id

            //Start the remaining hours as the total hours
            inspectorHours[planInspectorHoursRecord["inspectorhours.ts_inspector"]] = {
                remainingHoursQ1: planInspectorHoursRecord["inspectorhours.ts_totalhoursq1"],
                remainingHoursQ2: planInspectorHoursRecord["inspectorhours.ts_totalhoursq2"],
                remainingHoursQ3: planInspectorHoursRecord["inspectorhours.ts_totalhoursq3"],
                remainingHoursQ4: planInspectorHoursRecord["inspectorhours.ts_totalhoursq4"],
                planInspectorHoursId: planInspectorHoursRecord.ts_planinspectorhoursid
            }
            inspectorIds.push(planInspectorHoursRecord["inspectorhours.ts_inspector"]);
        }
        return inspectorHours;
    });
    //Retrieve suggested inspections on the plan
    let suggestedInspectionsFetchXml = [
        "<fetch>",
        "  <entity name='ts_suggestedinspection'>",
        "    <attribute name='ts_estimatedduration'/>",
        "    <attribute name='ts_inspector'/>",
        "    <attribute name='ts_q1'/>",
        "    <attribute name='ts_q2'/>",
        "    <attribute name='ts_q3'/>",
        "    <attribute name='ts_q4'/>",
        "    <filter>",
        "      <condition attribute='ts_plan' operator='eq' value='", planId, "' uitype='ts_plan'/>",
        "    </filter>",
        "  </entity>",
        "</fetch>"
    ].join("");
    suggestedInspectionsFetchXml = "?fetchXml=" + encodeURIComponent(suggestedInspectionsFetchXml);
    let suggestedInspections = await Xrm.WebApi.retrieveMultipleRecords("ts_suggestedinspection", suggestedInspectionsFetchXml).then(function success(result) {
        return result.entities;
    });
    //For each suggested inspection, if the assigned inspector has a matching inspector hours object, subtract from the total hours of each quarter 
    for (let suggestedInspection of suggestedInspections) {
        if (planInspectorHours[suggestedInspection._ts_inspector_value] != null) {
            const q1 = (suggestedInspection.ts_q1 != null) ? suggestedInspection.ts_q1 : 0;
            const q2 = (suggestedInspection.ts_q2 != null) ? suggestedInspection.ts_q2 : 0;
            const q3 = (suggestedInspection.ts_q3 != null) ? suggestedInspection.ts_q3 : 0;
            const q4 = (suggestedInspection.ts_q4 != null) ? suggestedInspection.ts_q4 : 0;
            planInspectorHours[suggestedInspection._ts_inspector_value].remainingHoursQ1 -= q1 * suggestedInspection.ts_estimatedduration;
            planInspectorHours[suggestedInspection._ts_inspector_value].remainingHoursQ2 -= q2 * suggestedInspection.ts_estimatedduration;
            planInspectorHours[suggestedInspection._ts_inspector_value].remainingHoursQ3 -= q3 * suggestedInspection.ts_estimatedduration;
            planInspectorHours[suggestedInspection._ts_inspector_value].remainingHoursQ4 -= q4 * suggestedInspection.ts_estimatedduration;
        }
    }

    let updatePromises = [];

    //Update each ts_planinspectorhours with the updated remaining hours
    for (let inspectorId of inspectorIds) {
        if (planInspectorHours[inspectorId] != null) {
            let data =
            {
                "ts_remaininghoursq1": planInspectorHours[inspectorId].remainingHoursQ1,
                "ts_remaininghoursq2": planInspectorHours[inspectorId].remainingHoursQ2,
                "ts_remaininghoursq3": planInspectorHours[inspectorId].remainingHoursQ3,
                "ts_remaininghoursq4": planInspectorHours[inspectorId].remainingHoursQ4
            }
            updatePromises.push(Xrm.WebApi.updateRecord("ts_planinspectorhours", planInspectorHours[inspectorId].planInspectorHoursId, data));
        }
    }

    suggestedInspections.forEach(function (inspection) {
        teamPlanningDataPlannedQ1 += inspection.ts_q1;
        teamPlanningDataPlannedQ2 += inspection.ts_q2;
        teamPlanningDataPlannedQ3 += inspection.ts_q3;
        teamPlanningDataPlannedQ4 += inspection.ts_q4;
        teamPlanningDataPlannedTotal += inspection.ts_q1 + inspection.ts_q2 + inspection.ts_q3 + inspection.ts_q4;
        teamPlanningDataTeamEstimatedDurationQ1 += inspection.ts_estimatedduration * inspection.ts_q1;
        teamPlanningDataTeamEstimatedDurationQ2 += inspection.ts_estimatedduration * inspection.ts_q2;
        teamPlanningDataTeamEstimatedDurationQ3 += inspection.ts_estimatedduration * inspection.ts_q3;
        teamPlanningDataTeamEstimatedDurationQ4 += inspection.ts_estimatedduration * inspection.ts_q4;
        teamPlanningDataTeamEstimatedDurationTotal += inspection.ts_estimatedduration;

    });

    formContext.getAttribute("ts_plannedactivityq1").setValue(teamPlanningDataPlannedQ1);
    formContext.getAttribute("ts_plannedactivityq2").setValue(teamPlanningDataPlannedQ2);
    formContext.getAttribute("ts_plannedactivityq3").setValue(teamPlanningDataPlannedQ3);
    formContext.getAttribute("ts_plannedactivityq4").setValue(teamPlanningDataPlannedQ4);
    formContext.getAttribute("ts_plannedactivityfiscalyear").setValue(teamPlanningDataPlannedTotal);

    formContext.getAttribute("ts_estimateddurationq1").setValue(teamPlanningDataTeamEstimatedDurationQ1);
    formContext.getAttribute("ts_estimateddurationq2").setValue(teamPlanningDataTeamEstimatedDurationQ2);
    formContext.getAttribute("ts_estimateddurationq3").setValue(teamPlanningDataTeamEstimatedDurationQ3);
    formContext.getAttribute("ts_estimateddurationq4").setValue(teamPlanningDataTeamEstimatedDurationQ4);
    formContext.getAttribute("ts_estimateddurationfiscalyear").setValue(teamPlanningDataTeamEstimatedDurationTotal);

    //wait until all updates have finished
    await Promise.all(updatePromises);
    formContext.data.entity.save();
    Xrm.Page.getControl("suggested_inspectorhours_grid").refresh();
    Xrm.Utility.closeProgressIndicator();
}