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
    let teamPlanningDataTeamEstimatedTravelTimeTotal = 0;
    let teamPlanningSupportRegionTimeTotal = 0;
    let teamPlanningDataTeamEstimatedCostTotal = 0;

    const teamValue = formContext.data.entity.attributes.get("ts_team").getValue();
    const fiscalyearValue = formContext.data.entity.attributes.get("ts_fiscalyear").getValue();
    if (teamValue != null && fiscalyearValue != null) {
        const teamRegion = await Xrm.WebApi.retrieveRecord('team', teamValue[0].id, '?$select=_ts_territory_value');

        let supportRegionHoursFetchXml = `
        <fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false'>
          <entity name='ts_planinspectionsupportregion'>
            <attribute name='ts_planinspectionsupportregionid' />
            <attribute name='ts_suggestedinspection' />
            <attribute name='ts_region' />
            <attribute name='ts_hours' />
            <filter type='and'>
              <condition attribute='ts_region' operator='eq' uitype='territory' value='` + teamRegion["_ts_territory_value"] + `' />
            </filter>
            <link-entity name='ts_suggestedinspection' from='ts_suggestedinspectionid' to='ts_suggestedinspection' link-type='inner' alias='am'>
              <link-entity name='ts_plan' from='ts_planid' to='ts_plan' link-type='inner' alias='an'>
                <filter type='and'>
                  <condition attribute='ts_fiscalyear' operator='eq' uitype='tc_tcfiscalyear' value='` + fiscalyearValue[0].id + `' />
                </filter>
              </link-entity>
            </link-entity>
          </entity>
        </fetch>`;
        supportRegionHoursFetchXml = "?fetchXml=" + encodeURIComponent(supportRegionHoursFetchXml);
        let supportRegionHours = await Xrm.WebApi.retrieveMultipleRecords("ts_planinspectionsupportregion", supportRegionHoursFetchXml).then(function success(result) {
            return result.entities;
        });
        for (let supportRegionHour of supportRegionHours) {
            if (supportRegionHour["ts_hours"] != null) {
                teamPlanningSupportRegionTimeTotal += supportRegionHour["ts_hours"];
            }
        }
    }

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
        "    <attribute name='ts_estimatedtraveltime'/>",
        "    <attribute name='ts_estimatedcost' />",
        "    <attribute name='ts_trip' />",
        "    <filter>",
        "      <condition attribute='ts_plan' operator='eq' value='", planId, "' uitype='ts_plan'/>",
        "    </filter>",
        "    <link-entity name='ts_trip' from='ts_tripid' to='ts_trip' visible='false' link-type='outer' alias='plantrip'>",
        "    <attribute name='ts_estimatedtraveltime' />",
        "    <attribute name='ts_estimatedcost' />",
        "    </link-entity>",
        "  </entity>",
        "</fetch>"
    ].join("");
    suggestedInspectionsFetchXml = "?fetchXml=" + encodeURIComponent(suggestedInspectionsFetchXml);
    let suggestedInspections = await Xrm.WebApi.retrieveMultipleRecords("ts_suggestedinspection", suggestedInspectionsFetchXml).then(function success(result) {
        return result.entities;
    });
    let tripInspectorIds = "";
    //For each suggested inspection, if the assigned inspector has a matching inspector hours object, subtract from the total hours of each quarter 
    for (let suggestedInspection of suggestedInspections) {
        if (planInspectorHours[suggestedInspection._ts_inspector_value] != null) {
            const q1 = (suggestedInspection.ts_q1 != null) ? suggestedInspection.ts_q1 : 0;
            const q2 = (suggestedInspection.ts_q2 != null) ? suggestedInspection.ts_q2 : 0;
            const q3 = (suggestedInspection.ts_q3 != null) ? suggestedInspection.ts_q3 : 0;
            const q4 = (suggestedInspection.ts_q4 != null) ? suggestedInspection.ts_q4 : 0;

            var estimatedTravelTime = 0;
            if (suggestedInspection["plantrip.ts_estimatedtraveltime"] != null && suggestedInspection["_ts_trip_value"] != null) {
                if (tripInspectorIds.indexOf(suggestedInspection["_ts_trip_value"] + ";" + suggestedInspection["_ts_inspector_value"]) == -1) {
                    estimatedTravelTime = Math.round(suggestedInspection["plantrip.ts_estimatedtraveltime"]);
                    tripInspectorIds += suggestedInspection["_ts_trip_value"] + ";" + suggestedInspection["_ts_inspector_value"] + "|";
                }
            }
            else if (suggestedInspection["ts_estimatedtraveltime"] != null) {
                estimatedTravelTime = Math.round(suggestedInspection["ts_estimatedtraveltime"]);
            }

            planInspectorHours[suggestedInspection._ts_inspector_value].remainingHoursQ1 -= q1 * (suggestedInspection.ts_estimatedduration + estimatedTravelTime);
            planInspectorHours[suggestedInspection._ts_inspector_value].remainingHoursQ2 -= q2 * (suggestedInspection.ts_estimatedduration + estimatedTravelTime);
            planInspectorHours[suggestedInspection._ts_inspector_value].remainingHoursQ3 -= q3 * (suggestedInspection.ts_estimatedduration + estimatedTravelTime);
            planInspectorHours[suggestedInspection._ts_inspector_value].remainingHoursQ4 -= q4 * (suggestedInspection.ts_estimatedduration + estimatedTravelTime);
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
    let tripIds = "";
    let costAppliedTripIds = "";
    suggestedInspections.forEach(function (inspection) {
        if (isNaN(inspection.ts_q1)) inspection.ts_q1 = 0;
        if (isNaN(inspection.ts_q2)) inspection.ts_q2 = 0;
        if (isNaN(inspection.ts_q3)) inspection.ts_q3 = 0;
        if (isNaN(inspection.ts_q4)) inspection.ts_q4 = 0;

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
        if (inspection["plantrip.ts_estimatedtraveltime"] != null && inspection["_ts_trip_value"]  != null) {
            if (tripIds.indexOf(inspection["_ts_trip_value"] ) == -1) {
                teamPlanningDataTeamEstimatedTravelTimeTotal += inspection["plantrip.ts_estimatedtraveltime"];
                tripIds += inspection["_ts_trip_value"] + "|";
            }
        }
        else if (inspection.ts_estimatedtraveltime != null) {
            teamPlanningDataTeamEstimatedTravelTimeTotal += inspection.ts_estimatedtraveltime;
        }

        if (inspection["plantrip.ts_estimatedcost"] != null && inspection["_ts_trip_value"] != null && costAppliedTripIds.indexOf(inspection["_ts_trip_value"]) == -1) {
            teamPlanningDataTeamEstimatedCostTotal += inspection["plantrip.ts_estimatedcost"];
            costAppliedTripIds += inspection["_ts_trip_value"] + "|";
        }
        //Only add cost if it is not in a trip that has been accounted for
        else if (inspection.ts_estimatedcost != null && !(inspection["_ts_trip_value"] != null && costAppliedTripIds.indexOf(inspection["_ts_trip_value"]) != -1)) {
            teamPlanningDataTeamEstimatedCostTotal += inspection.ts_estimatedcost;
        }
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
    formContext.getAttribute("ts_estimateddurationfiscalyear").setValue(teamPlanningDataTeamEstimatedDurationTotal + teamPlanningDataTeamEstimatedTravelTimeTotal + teamPlanningSupportRegionTimeTotal);

    formContext.getAttribute("ts_totalestimatedcost").setValue(teamPlanningDataTeamEstimatedCostTotal);

    //wait until all updates have finished
    await Promise.all(updatePromises);
    formContext.data.entity.save();
    Xrm.Page.getControl("suggested_inspectorhours_grid").refresh();
    Xrm.Utility.closeProgressIndicator();
}

async function createWorkOrders(formContext) {
    const lang = parent.Xrm.Utility.getGlobalContext().userSettings.languageId;

    let createWorkOrdersTitleLocalized = "Create Work Orders";
    let createWorkOrdersTextLocalized = "Work Orders will be created. Do you wish to proceed?";
    let createWorkOrdersConfirmLocalized = "Yes";
    let createWorkOrdersCancelLocalized = "Cancel";
    let createWorkOrdersProgressIndicator = "Please wait while the Work Orders are being created."
    if (lang == 1036) {
        createWorkOrdersTitleLocalized = "Création d'ordres de travail";
        createWorkOrdersTextLocalized = "Des ordres de travail seront créés. Voulez-vous continuer?";
        createWorkOrdersConfirmLocalized = "Oui";
        createWorkOrdersCancelLocalized = "Annuler";
        createWorkOrdersProgressIndicator = "Veuillez patienter pendant la création des ordres de travail."
    }

    //Open a confirmation dialog box to confirm Work Order Creation.
    var confirmStrings = { text: createWorkOrdersTextLocalized, title: createWorkOrdersTitleLocalized, confirmButtonLabel: createWorkOrdersConfirmLocalized, cancelButtonLabel: createWorkOrdersCancelLocalized };
    var confirmOptions = { height: 200, width: 450 };
    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
        async function (success) {
            if (success.confirmed) {
                Xrm.Utility.showProgressIndicator(createWorkOrdersProgressIndicator);
                //Obtain ID's of records needed for Work Order creation
                const planId = formContext.data.entity.getId();
                const team = formContext.getAttribute("ts_team").getValue();
                let teamId = null;
                if (team != null) teamId = team[0].id;
                const fiscalYearValue = formContext.getAttribute("ts_fiscalyear").getValue();
                let totalWorkOrders = formContext.getAttribute("ts_plannedactivityfiscalyear").getValue();
                if (fiscalYearValue == null) return;
                const fiscalYearId = fiscalYearValue[0].id.slice(1, -1);
                //Find ID's of fiscal quarters for the fiscal year
                let fiscalQuarters = await Xrm.WebApi.retrieveMultipleRecords("tc_tcfiscalquarter", `?$select=tc_tcfiscalquarterid,tc_fiscalquarternum&$filter=_tc_tcfiscalyearid_value eq ${fiscalYearId}`).then(function (result) { return result.entities });
                let Q1Id = "";
                let Q2Id = "";
                let Q3Id = "";
                let Q4Id = "";
                for (let fiscalQuarter of fiscalQuarters) {
                    if (fiscalQuarter.tc_fiscalquarternum == 1) Q1Id = fiscalQuarter.tc_tcfiscalquarterid;
                    else if (fiscalQuarter.tc_fiscalquarternum == 2) Q2Id = fiscalQuarter.tc_tcfiscalquarterid;
                    else if (fiscalQuarter.tc_fiscalquarternum == 3) Q3Id = fiscalQuarter.tc_tcfiscalquarterid;
                    else if (fiscalQuarter.tc_fiscalquarternum == 4) Q4Id = fiscalQuarter.tc_tcfiscalquarterid;
                }

                var suggestedInspectionFetchXml = [
                    "<fetch>",
                    "  <entity name='ts_suggestedinspection'>",
                    "    <attribute name='ts_operation'/>",
                    "    <attribute name='ts_q3'/>",
                    "    <attribute name='ts_stakeholder'/>",
                    "    <attribute name='ts_site'/>",
                    "    <attribute name='ts_activitytype'/>",
                    "    <attribute name='ts_operationtype'/>",
                    "    <attribute name='ts_q4'/>",
                    "    <attribute name='ts_q1'/>",
                    "    <attribute name='ts_plan'/>",
                    "    <attribute name='ts_q2'/>",
                    "    <attribute name='ts_trip'/>",
                    "    <attribute name='ts_estimatedcost'/>",
                    "    <filter type='and'>",
                    "      <condition attribute='ts_plan' operator='eq' value='", planId, "'/>",
                    "      <condition attribute='statecode' operator='eq' value='0'/>",
                    "    </filter>",
                    "    <filter type='and'>",
                    "      <filter type='or'>",
                    "        <condition attribute='ts_q1' operator='gt' value='0'/>",
                    "        <condition attribute='ts_q2' operator='gt' value='0'/>",
                    "        <condition attribute='ts_q3' operator='gt' value='0'/>",
                    "        <condition attribute='ts_q4' operator='gt' value='0'/>",
                    "      </filter>",
                    "    </filter>",
                    "    <link-entity name='ts_trip' from='ts_tripid' to='ts_trip' visible='false' link-type='outer' alias='plantrip'>",
                    "      <attribute name='ts_name'/>",
                    "    </link-entity>",
                    "    <link-entity name='msdyn_functionallocation' from='msdyn_functionallocationid' to='ts_site' link-type='outer' alias='ts_site'>",
                    "      <attribute name='ts_region'/>",
                    "    </link-entity>",
                    "    <link-entity name='account' from='accountid' to='ts_stakeholder' link-type='outer' alias='ts_stakeholder'>",
                    "      <attribute name='name'/>",
                    "    </link-entity>",
                    "  </entity>",
                    "</fetch>"
                ].join("");
                suggestedInspectionFetchXml = "?fetchXml=" + encodeURIComponent(suggestedInspectionFetchXml);
                //Array of Work Order creation promises. When all promises return, the Progress Indicator is closed.
                const workOrderCreationPromises = [];
                let currentWorkOrders = 0
                //Iterate through each suggested inspection record
                await Xrm.WebApi.retrieveMultipleRecords("ts_suggestedinspection", suggestedInspectionFetchXml).then(async function (result) {
                    const suggestedInspections = result.entities;
                    for (const suggestedInspection of suggestedInspections) {
                        let tradeNameId = null
                        if (suggestedInspection["_ts_stakeholder_value"] != null && suggestedInspection["ts_stakeholder.name"] != null) tradeNameId = await determineTradeNameOfStakeholder(suggestedInspection._ts_stakeholder_value, suggestedInspection["ts_stakeholder.name"]);
                        //Set the Work Order Lookups using the Suggested Inspection Lookups. Some can be null, so they are only added if there is a value.
                        let workOrderData = {}
                        if (planId != null) workOrderData["ts_plan@odata.bind"] = "/ts_plans(" + planId.slice(1, -1) + ")";
                        if (suggestedInspection.ts_suggestedinspectionid != null) workOrderData["ts_suggestedinspection@odata.bind"] = "/ts_suggestedinspections(" + suggestedInspection.ts_suggestedinspectionid + ")";
                        if (fiscalYearId != null) workOrderData["ovs_FiscalYear@odata.bind"] = "/tc_tcfiscalyears(" + fiscalYearId + ")";
                        if (suggestedInspection["ts_site.ts_region"] != null) workOrderData["ts_Region@odata.bind"] = "/territories(" + suggestedInspection["ts_site.ts_region"] + ")";
                        if (suggestedInspection._ts_stakeholder_value != null) workOrderData["msdyn_serviceaccount@odata.bind"] = "/accounts(" + suggestedInspection._ts_stakeholder_value + ")";
                        if (tradeNameId != null) workOrderData["ts_tradenameId@odata.bind"] = "/ts_tradenames(" + tradeNameId + ")";
                        if (suggestedInspection._ts_operationtype_value != null) workOrderData["ovs_operationtypeid@odata.bind"] = "/ovs_operationtypes(" + suggestedInspection._ts_operationtype_value + ")";
                        if (suggestedInspection._ts_site_value != null) workOrderData["ts_Site@odata.bind"] = "/msdyn_functionallocations(" + suggestedInspection._ts_site_value + ")";
                        if (suggestedInspection._ts_activitytype_value != null) workOrderData["msdyn_primaryincidenttype@odata.bind"] = "/msdyn_incidenttypes(" + suggestedInspection._ts_activitytype_value + ")";
                        if (suggestedInspection._ts_operation_value != null) workOrderData["ovs_OperationId@odata.bind"] = "/ovs_operations(" + suggestedInspection._ts_operation_value + ")";
                        if (suggestedInspection["plantrip.ts_name"] != null) workOrderData["ts_trip@odata.bind"] = "/ts_trips(" + suggestedInspection._ts_trip_value + ")";
                        if (suggestedInspection.ts_estimatedcost != null) workOrderData["ts_plannedcost"] = suggestedInspection.ts_estimatedcost;

                        /*
                         * For each ts_q field, determine how many Work Orders must be created, then create them.
                         * Subtract the current number of work orders related to the current Suggested Inspection record to prevent duplicates.
                         * Duplicate the above workOrderData object for each quarter so that the correct Fiscal Quarter lookup can be set.
                         * Update the Progress Indicator after the Work Order is created.
                         */

                        if (suggestedInspection.ts_q1 > 0) {
                            const currentQ1InspectionsCount = await Xrm.WebApi.retrieveMultipleRecords("msdyn_workorder", `?$select=msdyn_name&$filter=_ts_suggestedinspection_value eq ${suggestedInspection.ts_suggestedinspectionid} and _ovs_fiscalquarter_value eq ${Q1Id}`).then(function (result) { return result.entities.length });
                            const workOrdersToCreateInQ1 = suggestedInspection.ts_q1 - currentQ1InspectionsCount;
                            totalWorkOrders -= currentQ1InspectionsCount;
                            const dataQ1 = { ...workOrderData };
                            dataQ1["ovs_FiscalQuarter@odata.bind"] = "/tc_tcfiscalquarters(" + Q1Id + ")";
                            for (let i = 0; i < workOrdersToCreateInQ1; i++) {
                                workOrderCreationPromises.push(Xrm.WebApi.createRecord("msdyn_workorder", dataQ1).then(() => {
                                    currentWorkOrders++;
                                    Xrm.Utility.showProgressIndicator(createWorkOrdersProgressIndicator + " (" + currentWorkOrders + " / " + totalWorkOrders + " )");
                                }));
                            }
                        }
                        if (suggestedInspection.ts_q2 > 0) {
                            const currentQ2InspectionsCount = await Xrm.WebApi.retrieveMultipleRecords("msdyn_workorder", `?$select=msdyn_name&$filter=_ts_suggestedinspection_value eq ${suggestedInspection.ts_suggestedinspectionid} and _ovs_fiscalquarter_value eq ${Q2Id}`).then(function (result) { return result.entities.length });
                            const workOrdersToCreateInQ2 = suggestedInspection.ts_q2 - currentQ2InspectionsCount;
                            totalWorkOrders -= currentQ2InspectionsCount;
                            const dataQ2 = { ...workOrderData };
                            dataQ2["ovs_FiscalQuarter@odata.bind"] = "/tc_tcfiscalquarters(" + Q2Id + ")";
                            for (let i = 0; i < workOrdersToCreateInQ2; i++) {
                                workOrderCreationPromises.push(Xrm.WebApi.createRecord("msdyn_workorder", dataQ2).then(() => {
                                    currentWorkOrders++;
                                    Xrm.Utility.showProgressIndicator(createWorkOrdersProgressIndicator + " (" + currentWorkOrders + " / " + totalWorkOrders + " )");
                                }));
                            }
                        }
                        if (suggestedInspection.ts_q3 > 0) {
                            const currentQ3InspectionsCount = await Xrm.WebApi.retrieveMultipleRecords("msdyn_workorder", `?$select=msdyn_name&$filter=_ts_suggestedinspection_value eq ${suggestedInspection.ts_suggestedinspectionid} and _ovs_fiscalquarter_value eq ${Q3Id}`).then(function (result) { return result.entities.length });
                            const workOrdersToCreateInQ3 = suggestedInspection.ts_q3 - currentQ3InspectionsCount;
                            totalWorkOrders -= currentQ3InspectionsCount;
                            const dataQ3 = { ...workOrderData };
                            dataQ3["ovs_FiscalQuarter@odata.bind"] = "/tc_tcfiscalquarters(" + Q3Id + ")";
                            for (let i = 0; i < workOrdersToCreateInQ3; i++) {
                                workOrderCreationPromises.push(Xrm.WebApi.createRecord("msdyn_workorder", dataQ3).then(() => {
                                    currentWorkOrders++;
                                    Xrm.Utility.showProgressIndicator(createWorkOrdersProgressIndicator + " (" + currentWorkOrders + " / " + totalWorkOrders + " )");
                                }));
                            }
                        }
                        if (suggestedInspection.ts_q4 > 0) {
                            const currentQ4InspectionsCount = await Xrm.WebApi.retrieveMultipleRecords("msdyn_workorder", `?$select=msdyn_name&$filter=_ts_suggestedinspection_value eq ${suggestedInspection.ts_suggestedinspectionid} and _ovs_fiscalquarter_value eq ${Q4Id}`).then(function (result) { return result.entities.length });
                            const workOrdersToCreateInQ4 = suggestedInspection.ts_q4 - currentQ4InspectionsCount;
                            totalWorkOrders -= currentQ4InspectionsCount;
                            const dataQ4 = { ...workOrderData };
                            dataQ4["ovs_FiscalQuarter@odata.bind"] = "/tc_tcfiscalquarters(" + Q4Id + ")";
                            for (let i = 0; i < workOrdersToCreateInQ4; i++) {
                                workOrderCreationPromises.push(Xrm.WebApi.createRecord("msdyn_workorder", dataQ4).then(() => {
                                    currentWorkOrders++;
                                    Xrm.Utility.showProgressIndicator(createWorkOrdersProgressIndicator + " (" + currentWorkOrders + " / " + totalWorkOrders + " )");
                                }));
                            }
                        }
                        Xrm.Utility.showProgressIndicator(createWorkOrdersProgressIndicator + " (" + currentWorkOrders + " / " + totalWorkOrders + " )");
                    }
                });
                //After all Work Orders have been created, close the Progress indicator.
                await Promise.all(workOrderCreationPromises)

                //Create Trip Inspections for WO created
                var workOrderCreatedFetchXml = [
                    "<fetch>",
                    "<entity name='msdyn_workorder'>",
                    "<attribute name='msdyn_name'/>",
                    "<attribute name='msdyn_workorderid'/>",
                    "<attribute name='ts_trip'/>",
                    "<filter type='and'>",
                        "<condition attribute='ts_plan' operator='eq' value='", planId, "'/>",
                        "<condition attribute='ts_trip' operator='not-null'/>",
                    "</filter>",
                    "</entity>",
                    "</fetch>"
                ].join("");
                workOrderCreatedFetchXml = "?fetchXml=" + encodeURIComponent(workOrderCreatedFetchXml);
                //Array of Work Order creation promises. When all promises return, the Progress Indicator is closed.
                const tripInspectionCreationPromises = [];

                //Iterate through each WO
                await Xrm.WebApi.retrieveMultipleRecords("msdyn_workorder", workOrderCreatedFetchXml).then(async function (result) {
                    const workOrders = result.entities;
                    for (const workOrder of workOrders) {
                        let tripInspectionData = {}
                        tripInspectionData["ts_inspection@odata.bind"] = "/msdyn_workorders(" + workOrder.msdyn_workorderid + ")";
                        tripInspectionData["ts_trip@odata.bind"] = "/ts_trips(" + workOrder._ts_trip_value + ")";
                        tripInspectionCreationPromises.push(Xrm.WebApi.createRecord("ts_tripinspection", tripInspectionData));
                    }
                });

                await Promise.all(tripInspectionCreationPromises);
                Xrm.Utility.closeProgressIndicator();
            }
        }
    );
}

//Find the TradeName that has a matching name of the stakeholder, but if it doesn't exist just use the first TradeName retrieved
async function determineTradeNameOfStakeholder(stakeholderId, stakeholderName) {
    const tradeNames = await Xrm.WebApi.retrieveMultipleRecords("ts_tradename", `?$select=ts_name,ts_tradenameid&$filter=_ts_stakeholderid_value eq ${stakeholderId}`).then(function (result) { return result.entities });
    let tradeNameId = null;
    if (tradeNames.length > 0) {
        tradeNameId = tradeNames[0].ts_tradenameid
        for (let i = 1; i < tradeNames.length; i++) {
            if (tradeNames[i].ts_name == stakeholderName) {
                tradeNames[i].ts_tradenameid;
            }
        }
    }
    return tradeNameId;
}
