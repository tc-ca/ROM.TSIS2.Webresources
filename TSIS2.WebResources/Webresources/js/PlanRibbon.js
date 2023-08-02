async function recalculate(formContext) {
    const planId = formContext.data.entity.getId().slice(1, -1);
    //Retrieve the Plan Inspector Hours records with the user id
    let planInspectorHoursFetchXml = [
        "<fetch>",
        "  <entity name='ts_planinspectorhours'>",
        "    <attribute name='ts_totalhoursq1'/>",
        "    <attribute name='ts_totalhoursq2'/>",
        "    <attribute name='ts_totalhoursq3'/>",
        "    <attribute name='ts_totalhoursq4'/>",
        "    <attribute name='ts_planinspectorhoursid'/>",
        "    <filter>",
        "      <condition attribute='ts_plan' operator='eq' value='", planId, "' uiname='Test Plan 1' uitype='ts_plan'/>",
        "    </filter>",
        "    <link-entity name='ts_inspectionhours' from='ts_inspectionhoursid' to='ts_inspectorhours' alias='inspectorhours'>",
        "      <attribute name='ts_inspector'/>",
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
                remainingHoursQ1: planInspectorHoursRecord.ts_totalhoursq1,
                remainingHoursQ2: planInspectorHoursRecord.ts_totalhoursq2,
                remainingHoursQ3: planInspectorHoursRecord.ts_totalhoursq3,
                remainingHoursQ4: planInspectorHoursRecord.ts_totalhoursq4,
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
        "    <attribute name='ts_q1'/>",
        "    <attribute name='ts_q2'/>",
        "    <attribute name='ts_q3'/>",
        "    <attribute name='ts_q4'/>",
        "    <attribute name='ts_inspector'/>",
        "    <filter>",
        "      <condition attribute='ts_plan' operator='eq' value='", planId, "' uiname='Test Plan 1' uitype='ts_plan'/>",
        "    </filter>",
        "    <link-entity name='msdyn_incidenttype' from='msdyn_incidenttypeid' to='ts_activitytype' alias='activitytype'>",
        "      <attribute name='msdyn_estimatedduration'/>",
        "    </link-entity>",
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
            planInspectorHours[suggestedInspection._ts_inspector_value].remainingHoursQ1 -= suggestedInspection.ts_q1 * (suggestedInspection["activitytype.msdyn_estimatedduration"] / 60);
            planInspectorHours[suggestedInspection._ts_inspector_value].remainingHoursQ2 -= suggestedInspection.ts_q2 * (suggestedInspection["activitytype.msdyn_estimatedduration"] / 60);
            planInspectorHours[suggestedInspection._ts_inspector_value].remainingHoursQ3 -= suggestedInspection.ts_q3 * (suggestedInspection["activitytype.msdyn_estimatedduration"] / 60);
            planInspectorHours[suggestedInspection._ts_inspector_value].remainingHoursQ4 -= suggestedInspection.ts_q4 * (suggestedInspection["activitytype.msdyn_estimatedduration"] / 60);
        }
    }

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
            Xrm.WebApi.updateRecord("ts_planinspectorhours", planInspectorHours[inspectorId].planInspectorHoursId, data)
        }
    }
}