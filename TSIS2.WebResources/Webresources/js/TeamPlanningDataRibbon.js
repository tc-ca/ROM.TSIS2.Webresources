
function recalculateTeamPlanningDataValues(formContext) {
    Xrm.Utility.showProgressIndicator();
    const teamPlanningDataId = formContext.data.entity.getId();
    const teamPlanningDataTotalHoursQ1 = formContext.getAttribute("ts_totalhoursq1").getValue();
    const teamPlanningDataTotalHoursQ2 = formContext.getAttribute("ts_totalhoursq2").getValue();
    const teamPlanningDataTotalHoursQ3 = formContext.getAttribute("ts_totalhoursq3").getValue();
    const teamPlanningDataTotalHoursQ4 = formContext.getAttribute("ts_totalhoursq4").getValue();
    const teamPlanningDataTotalHoursFiscalYear = formContext.getAttribute("ts_totalhoursfiscalyear").getValue();

    let teamPlanningDataPlannedQ1 = 0;
    let teamPlanningDataPlannedQ2 = 0;
    let teamPlanningDataPlannedQ3 = 0;
    let teamPlanningDataPlannedQ4 = 0;
    let teamPlanningDataPlannedTotal = 0;

    let teamPlanningDataAvailableInspectorHoursQ1 = 0;
    let teamPlanningDataAvailableInspectorHoursQ2 = 0;
    let teamPlanningDataAvailableInspectorHoursQ3 = 0;
    let teamPlanningDataAvailableInspectorHoursQ4 = 0;
    let teamPlanningDataAvailableInspectorHoursTotal = 0;

    let teamPlanningDataTeamEstimatedDurationQ1 = 0;
    let teamPlanningDataTeamEstimatedDurationQ2 = 0;
    let teamPlanningDataTeamEstimatedDurationQ3 = 0;
    let teamPlanningDataTeamEstimatedDurationQ4 = 0;
    let teamPlanningDataTeamEstimatedDurationTotal = 0;

    let ts_teamPlanningDataResidualinspectorhoursQ1 = 0;
    let ts_teamPlanningDataResidualinspectorhoursQ2 = 0;
    let ts_teamPlanningDataResidualinspectorhoursQ3 = 0;
    let ts_teamPlanningDataResidualinspectorhoursQ4 = 0;
    let teamPlanningDataResidualinspectorhoursTotal = 0;

    var fetchXml = [
        "<fetch>",
        "  <entity name='ts_planningdata'>",
        "    <filter>",
        "      <condition attribute='ts_teamplanningdata' operator='eq' value='", teamPlanningDataId , "'/>",
        "    </filter>",
        "    <filter type='or'>",
        "      <condition attribute='ts_operationactivity' operator='null'/>",
        "      <condition attribute='ts_operationactivityisoperational' operator='eq' value='1'/>",
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
        }

        var teamPlanningDataInspectorHoursFetchXml = [
            "<fetch>",
            "  <entity name='ts_teamplanninginspectorhours'>",
            "    <attribute name='ts_varianceq3'/>",
            "    <attribute name='ts_varianceq4'/>",
            "    <attribute name='ts_varianceq2'/>",
            "    <attribute name='ts_varianceq1'/>",
            "    <filter>",
            "      <condition attribute='ts_teamplanningdata' operator='eq' value='", teamPlanningDataId, "'/>",
            "    </filter>",
            "  </entity>",
            "</fetch>"
        ].join("");
        teamPlanningDataInspectorHoursFetchXml = "?fetchXml=" + encodeURIComponent(teamPlanningDataInspectorHoursFetchXml);
        await Xrm.WebApi.retrieveMultipleRecords("ts_teamplanninginspectorhours", teamPlanningDataInspectorHoursFetchXml).then(async function success(result) {
            for (let inspectorHours of result.entities) {
                teamPlanningDataAvailableInspectorHoursQ1 += teamPlanningDataTotalHoursQ1 + inspectorHours.ts_varianceq1;
                teamPlanningDataAvailableInspectorHoursQ2 += teamPlanningDataTotalHoursQ2 + inspectorHours.ts_varianceq2;
                teamPlanningDataAvailableInspectorHoursQ3 += teamPlanningDataTotalHoursQ3 + inspectorHours.ts_varianceq3;
                teamPlanningDataAvailableInspectorHoursQ4 += teamPlanningDataTotalHoursQ4 + inspectorHours.ts_varianceq4;
            }
        });

        ts_teamPlanningDataResidualinspectorhoursQ1 = teamPlanningDataAvailableInspectorHoursQ1 - teamPlanningDataTeamEstimatedDurationQ1;
        ts_teamPlanningDataResidualinspectorhoursQ2 = teamPlanningDataAvailableInspectorHoursQ2 - teamPlanningDataTeamEstimatedDurationQ2;
        ts_teamPlanningDataResidualinspectorhoursQ3 = teamPlanningDataAvailableInspectorHoursQ3 - teamPlanningDataTeamEstimatedDurationQ3;
        ts_teamPlanningDataResidualinspectorhoursQ4 = teamPlanningDataAvailableInspectorHoursQ4 - teamPlanningDataTeamEstimatedDurationQ4;

        teamPlanningDataPlannedTotal = teamPlanningDataPlannedQ1 + teamPlanningDataPlannedQ2 + teamPlanningDataPlannedQ3 + teamPlanningDataPlannedQ4;
        teamPlanningDataAvailableInspectorHoursTotal = teamPlanningDataAvailableInspectorHoursQ1 + teamPlanningDataAvailableInspectorHoursQ2 + teamPlanningDataAvailableInspectorHoursQ3 + teamPlanningDataAvailableInspectorHoursQ4;
        teamPlanningDataTeamEstimatedDurationTotal = teamPlanningDataTeamEstimatedDurationQ1 + teamPlanningDataTeamEstimatedDurationQ2 + teamPlanningDataTeamEstimatedDurationQ3 + teamPlanningDataTeamEstimatedDurationQ4;
        teamPlanningDataResidualinspectorhoursTotal = teamPlanningDataAvailableInspectorHoursTotal - teamPlanningDataTeamEstimatedDurationTotal;

        formContext.getAttribute("ts_plannedactivityq1").setValue(teamPlanningDataPlannedQ1);
        formContext.getAttribute("ts_plannedactivityq2").setValue(teamPlanningDataPlannedQ2);
        formContext.getAttribute("ts_plannedactivityq3").setValue(teamPlanningDataPlannedQ3);
        formContext.getAttribute("ts_plannedactivityq4").setValue(teamPlanningDataPlannedQ4);
        formContext.getAttribute("ts_plannedactivityfiscalyear").setValue(teamPlanningDataPlannedTotal);
        formContext.getAttribute("ts_availablehoursq1").setValue(teamPlanningDataAvailableInspectorHoursQ1);
        formContext.getAttribute("ts_availablehoursq2").setValue(teamPlanningDataAvailableInspectorHoursQ2);
        formContext.getAttribute("ts_availablehoursq3").setValue(teamPlanningDataAvailableInspectorHoursQ3);
        formContext.getAttribute("ts_availablehoursq4").setValue(teamPlanningDataAvailableInspectorHoursQ4);
        formContext.getAttribute("ts_availableinspectorhoursfiscalyear").setValue(teamPlanningDataAvailableInspectorHoursTotal);
        formContext.getAttribute("ts_teamestimateddurationq1").setValue(teamPlanningDataTeamEstimatedDurationQ1);
        formContext.getAttribute("ts_teamestimateddurationq2").setValue(teamPlanningDataTeamEstimatedDurationQ2);
        formContext.getAttribute("ts_teamestimateddurationq3").setValue(teamPlanningDataTeamEstimatedDurationQ3);
        formContext.getAttribute("ts_teamestimateddurationq4").setValue(teamPlanningDataTeamEstimatedDurationQ4);
        formContext.getAttribute("ts_teamestimateddurationfiscalyear").setValue(teamPlanningDataTeamEstimatedDurationTotal);
        formContext.getAttribute("ts_residualinspectorhoursq1").setValue(ts_teamPlanningDataResidualinspectorhoursQ1);
        formContext.getAttribute("ts_residualinspectorhoursq2").setValue(ts_teamPlanningDataResidualinspectorhoursQ2);
        formContext.getAttribute("ts_residualinspectorhoursq3").setValue(ts_teamPlanningDataResidualinspectorhoursQ3);
        formContext.getAttribute("ts_residualinspectorhoursq4").setValue(ts_teamPlanningDataResidualinspectorhoursQ4);
        formContext.getAttribute("ts_residualinspectorhoursfiscalyear").setValue(teamPlanningDataResidualinspectorhoursTotal);
        formContext.data.entity.save();
        Xrm.Utility.closeProgressIndicator();
    });
}

async function createWorkOrders(formContext) {
    const teamPlanningDataId = formContext.data.entity.getId();
    const fiscalYear = formContext.getAttribute("ts_fiscalyear");
    if (fiscalYear == null) return;
    const fiscalYearId = fiscalYear[0].id;
    //Find ID's of fiscal quarters for the fiscal year
    let fiscalQuarters = await Xrm.WebApi.retrieveMultipleRecords("tc_tcfiscalyear", `?$select=tc_tcfiscalquarterid,tc_fiscalquarternum&$filter=tc_tcfiscalyearid eq ${fiscalYearId}`).then(function (result) { return result.entities });
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
    var planningDataFetchXml = [
        "<fetch>",
        "  <entity name='ts_planningdata'>",
        "    <attribute name='ts_operation'/>",
        "    <attribute name='ts_plannedq3'/>",
        "    <attribute name='ts_stakeholder'/>",
        "    <attribute name='ts_fiscalyear'/>",
        "    <attribute name='ts_site'/>",
        "    <attribute name='ts_activitytype'/>",
        "    <attribute name='ts_operationtype'/>",
        "    <attribute name='ts_plannedq4'/>",
        "    <attribute name='ts_plannedq1'/>",
        "    <attribute name='ts_planningdataid'/>",
        "    <attribute name='ts_plannedq2'/>",
        "    <filter>",
        "      <condition attribute='ts_teamplanningdata' operator='eq' value='", teamPlanningDataId, "'/>",
        "    </filter>",
        "    <link-entity name='msdyn_functionallocation' from='msdyn_functionallocationid' to='ts_site' alias='ts_site'>",
        "      <attribute name='ts_region'/>",
        "    </link-entity>",
        "  </entity>",
        "</fetch>"
    ].join("");
    planningDataFetchXml = "?fetchXml=" + encodeURIComponent(planningDataFetchXml);
    //Iterate through each planning data record
    Xrm.WebApi.retrieveMultipleRecords("ts_planningdata", planningDataFetchXml).then(function (result) {
        const planningDatas = result.entities;
        for (const planningData of planningDatas) {
            let data = {
                "ovs_fiscalyear@odata.bind": "/tc_tcfiscalyears(" + fiscalYearId + ")",
                "ts_Region@odata.bind": "/territories(" + planningData.ts_stakeholder + ")",
                "msdyn_workordertype@odata.bind": "/msdyn_workordertypes(b1ee680a-7cf7-ea11-a815-000d3af3a7a7)",
                "msdyn_serviceaccount@odata.bind": "/accounts(" + planningData.ts_stakeholder + ")",
                "ovs_operationtypeid@odata.bind": "/ovs_operationtypes(" + planningData.ts_operationtype + ")",
                "ts_site@odata.bind": "/msdyn_functionallocations(" + planningData.ts_site + ")",
                "msdyn_primaryincidenttype@odata.bind": "/msdyn_incidenttypes(" + planningData.ts_activitytype + ")",
                "ovs_OperationId@odata.bind": "/ovs_operations(" + planningData.ts_operation + ")",
            }
            data["ovs_fiscalquarter@odata.bind"] = "/tc_tcfiscalquarters(" + Q1Id + ")";
            //Create Q1 Work Orders
            for (let i = 0; i < planningData.ts_plannedq1; i++) {
                Xrm.WebApi.createRecord("msdyn_workorder", data).then(
                    function success(result) {
                    },
                    function (error) {
                        console.log(error.message);
                    }
                );
            }
            data["ovs_fiscalquarter@odata.bind"] = "/tc_tcfiscalquarters(" + Q2Id + ")";
            //Create Q2 Work Orders
            for (let i = 0; i < planningData.ts_plannedq2; i++) {
                Xrm.WebApi.createRecord("msdyn_workorder", data).then(
                    function success(result) {
                    },
                    function (error) {
                        console.log(error.message);
                    }
                );
            }
            data["ovs_fiscalquarter@odata.bind"] = "/tc_tcfiscalquarters(" + Q3Id + ")";
            //Create Q3 Work Orders
            for (let i = 0; i < planningData.ts_plannedq3; i++) {
                Xrm.WebApi.createRecord("msdyn_workorder", data).then(
                    function success(result) {
                    },
                    function (error) {
                        console.log(error.message);
                    }
                );
            }
            data["ovs_fiscalquarter@odata.bind"] = "/tc_tcfiscalquarters(" + Q4Id + ")";
            //Create Q4 Work Orders
            for (let i = 0; i < planningData.ts_plannedq4; i++) {
                Xrm.WebApi.createRecord("msdyn_workorder", data).then(
                    function success(result) {
                    },
                    function (error) {
                        console.log(error.message);
                    }
                );
            }
        }
    });



    //Lock the team planning data record somehow so you can't make more work orders
}