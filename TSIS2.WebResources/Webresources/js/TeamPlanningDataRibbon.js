const { promises } = require("stream");



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
        "      <condition attribute='ts_teamplanningdata' operator='eq' value='", teamPlanningDataId, "'/>",
        "      <condition attribute='statecode' operator='eq' value='0'/>",
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

/*
 * Triggered by Create Work Order Ribbon button on Team Planning data form.
 * Retrieves the Planning Data related to the Team Planning Data, excluding records that are inactive
 * or that have a non-operational operation activity, then determines how many Work Orders must be made
 * each year by looking at the Planned Q (Number) fields, creating work orders in the specified fiscal year and quarter.
 * If Work Orders have already been generated it will subtract the existing number of Work Orders to reduce the number of
 * new Work Orders being generated. New Work Orders are related to the Planning Data and Team Planning Data records.
 */
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
                const teamPlanningDataId = formContext.data.entity.getId();
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
                    "      <condition attribute='statecode' operator='eq' value='0'/>",
                    "    </filter>",
                    "    <filter type='and'>",
                    "      <filter type='or'>",
                    "        <condition attribute='ts_plannedq1' operator='gt' value='0'/>",
                    "        <condition attribute='ts_plannedq2' operator='gt' value='0'/>",
                    "        <condition attribute='ts_plannedq3' operator='gt' value='0'/>",
                    "        <condition attribute='ts_plannedq4' operator='gt' value='0'/>",
                    "      </filter>",
                    "      <filter type='or'>",
                    "        <condition attribute='ts_operationactivity' operator='null'/>",
                    "        <condition attribute='ts_operationactivityisoperational' operator='eq' value='1'/>",
                    "      </filter>",
                    "    </filter>",
                    "    <link-entity name='msdyn_functionallocation' from='msdyn_functionallocationid' to='ts_site' link-type='outer' alias='ts_site'>",
                    "      <attribute name='ts_region'/>",
                    "    </link-entity>",
                    "    <link-entity name='account' from='accountid' to='ts_stakeholder' link-type='outer' alias='ts_stakeholder'>",
                    "      <attribute name='name'/>",
                    "    </link-entity>",
                    "  </entity>",
                    "</fetch>"
                ].join("");
                planningDataFetchXml = "?fetchXml=" + encodeURIComponent(planningDataFetchXml);
                //Array of Work Order creation promises. When all promises return, the Progress Indicator is closed.
                const workOrderCreationPromises = [];
                let currentWorkOrders = 0
                //Iterate through each planning data record
                await Xrm.WebApi.retrieveMultipleRecords("ts_planningdata", planningDataFetchXml).then(async function (result) {
                    const planningDatas = result.entities;
                    for (const planningData of planningDatas) {
                        let tradeNameId = null
                        if (planningData["_ts_stakeholder_value"] != null && planningData["ts_stakeholder.name"] != null) tradeNameId = await determineTradeNameOfStakeholder(planningData._ts_stakeholder_value, planningData["ts_stakeholder.name"]);
                        //Set the Work Order Lookups using the Planning Data Lookups. Some can be null, so they are only added if there is a value.
                        let workOrderData = {}
                        if (teamPlanningDataId != null) workOrderData["ts_TeamPlanningData@odata.bind"] = "/ts_teamplanningdatas(" + teamPlanningDataId.slice(1, -1) + ")";
                        //if (teamId != null) workOrderData["ownerid@odata.bind"] = "/teams(" + teamId.slice(1, -1) + ")";
                        if (planningData.ts_planningdataid != null) workOrderData["ts_PlanningData@odata.bind"] = "/ts_planningdatas(" + planningData.ts_planningdataid + ")";
                        if (fiscalYearId != null) workOrderData["ovs_FiscalYear@odata.bind"] = "/tc_tcfiscalyears(" + fiscalYearId + ")";
                        if (planningData["ts_site.ts_region"] != null) workOrderData["ts_Region@odata.bind"] = "/territories(" + planningData["ts_site.ts_region"] + ")";
                        if (planningData._ts_stakeholder_value != null) workOrderData["msdyn_serviceaccount@odata.bind"] = "/accounts(" + planningData._ts_stakeholder_value + ")";
                        if (tradeNameId != null) workOrderData["ts_tradenameId@odata.bind"] = "/ts_tradenames(" + tradeNameId + ")";
                        if (planningData._ts_operationtype_value != null) workOrderData["ovs_operationtypeid@odata.bind"] = "/ovs_operationtypes(" + planningData._ts_operationtype_value + ")";
                        if (planningData._ts_site_value != null) workOrderData["ts_Site@odata.bind"] = "/msdyn_functionallocations(" + planningData._ts_site_value + ")";
                        if (planningData._ts_activitytype_value != null) workOrderData["msdyn_primaryincidenttype@odata.bind"] = "/msdyn_incidenttypes(" + planningData._ts_activitytype_value + ")";
                        if (planningData._ts_operation_value != null) workOrderData["ovs_OperationId@odata.bind"] = "/ovs_operations(" + planningData._ts_operation_value + ")";


                        /*
                         * For each ts_plannedq field, determine how many Work Orders must be created, then create them.
                         * Subtract the current number of work orders related to the current Planning Data record to prevent duplicates.
                         * Duplicate the above workOrderData object for each quarter so that the correct Fiscal Quarter lookup can be set.
                         * Update the Progress Indicator after the Work Order is created.
                         */

                        if (planningData.ts_plannedq1 > 0) {
                            const currentPlannedQ1InspectionsCount = await Xrm.WebApi.retrieveMultipleRecords("msdyn_workorder", `?$select=msdyn_name&$filter=_ts_planningdata_value eq ${planningData.ts_planningdataid} and _ovs_fiscalquarter_value eq ${Q1Id}`).then(function (result) { return result.entities.length });
                            const workOrdersToCreateInQ1 = planningData.ts_plannedq1 - currentPlannedQ1InspectionsCount;
                            totalWorkOrders -= currentPlannedQ1InspectionsCount;
                            const dataQ1 = { ...workOrderData };
                            dataQ1["ovs_FiscalQuarter@odata.bind"] = "/tc_tcfiscalquarters(" + Q1Id + ")";
                            for (let i = 0; i < workOrdersToCreateInQ1; i++) {
                                workOrderCreationPromises.push(Xrm.WebApi.createRecord("msdyn_workorder", dataQ1).then(() => {
                                    currentWorkOrders++;
                                    Xrm.Utility.showProgressIndicator(createWorkOrdersProgressIndicator + " (" + currentWorkOrders + " / " + totalWorkOrders + " )");
                                }));
                            }
                        }
                        if (planningData.ts_plannedq2 > 0) {
                            const currentPlannedQ2InspectionsCount = await Xrm.WebApi.retrieveMultipleRecords("msdyn_workorder", `?$select=msdyn_name&$filter=_ts_planningdata_value eq ${planningData.ts_planningdataid} and _ovs_fiscalquarter_value eq ${Q2Id}`).then(function (result) { return result.entities.length });
                            const workOrdersToCreateInQ2 = planningData.ts_plannedq2 - currentPlannedQ2InspectionsCount;
                            totalWorkOrders -= currentPlannedQ2InspectionsCount;
                            const dataQ2 = { ...workOrderData };
                            dataQ2["ovs_FiscalQuarter@odata.bind"] = "/tc_tcfiscalquarters(" + Q2Id + ")";
                            for (let i = 0; i < workOrdersToCreateInQ2; i++) {
                                workOrderCreationPromises.push(Xrm.WebApi.createRecord("msdyn_workorder", dataQ2).then(() => {
                                    currentWorkOrders++;
                                    Xrm.Utility.showProgressIndicator(createWorkOrdersProgressIndicator + " (" + currentWorkOrders + " / " + totalWorkOrders + " )");
                                }));
                            }
                        }
                        if (planningData.ts_plannedq3 > 0) {
                            const currentPlannedQ3InspectionsCount = await Xrm.WebApi.retrieveMultipleRecords("msdyn_workorder", `?$select=msdyn_name&$filter=_ts_planningdata_value eq ${planningData.ts_planningdataid} and _ovs_fiscalquarter_value eq ${Q3Id}`).then(function (result) { return result.entities.length });
                            const workOrdersToCreateInQ3 = planningData.ts_plannedq3 - currentPlannedQ3InspectionsCount;
                            totalWorkOrders -= currentPlannedQ3InspectionsCount;
                            const dataQ3 = { ...workOrderData };
                            dataQ3["ovs_FiscalQuarter@odata.bind"] = "/tc_tcfiscalquarters(" + Q3Id + ")";
                            for (let i = 0; i < workOrdersToCreateInQ3; i++) {
                                workOrderCreationPromises.push(Xrm.WebApi.createRecord("msdyn_workorder", dataQ3).then(() => {
                                    currentWorkOrders++;
                                    Xrm.Utility.showProgressIndicator(createWorkOrdersProgressIndicator + " (" + currentWorkOrders + " / " + totalWorkOrders + " )");
                                }));
                            }
                        }
                        if (planningData.ts_plannedq4 > 0) {
                            const currentPlannedQ4InspectionsCount = await Xrm.WebApi.retrieveMultipleRecords("msdyn_workorder", `?$select=msdyn_name&$filter=_ts_planningdata_value eq ${planningData.ts_planningdataid} and _ovs_fiscalquarter_value eq ${Q4Id}`).then(function (result) { return result.entities.length });
                            const workOrdersToCreateInQ4 = planningData.ts_plannedq4 - currentPlannedQ4InspectionsCount;
                            totalWorkOrders -= currentPlannedQ4InspectionsCount;
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