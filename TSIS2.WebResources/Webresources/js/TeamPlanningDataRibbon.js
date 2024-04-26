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

    let totalRequiredHours = 0;

    var fetchXml = [
        "<fetch>",
        "  <entity name='ts_planningdata'>",
        "    <filter type='and'>",
        "      <condition attribute='ts_teamplanningdata' operator='eq' value='", teamPlanningDataId, "'/>",
        "      <condition attribute='statecode' operator='eq' value='0'/>",
        "    </filter>",
        "    <filter type='or'>",
        "      <condition attribute='ts_operationactivity' operator='null'/>",
        "      <condition attribute='ts_operationactivityisoperational' operator='eq' value='1'/>",
        "    </filter>",
        "    <filter>",
        "      <condition attribute='ts_operationactivityisactive' operator='eq' value='1'/>",
        "    </filter>",
        "    <filter type='or'>",
        "      <condition attribute='ts_keephidden' operator='eq' value='0'/>",
        "      <condition attribute='ts_keephidden' operator='not-null'/>",
        "    </filter>",
        "  </entity>",
        "</fetch>"
    ].join("");
    fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
    Xrm.WebApi.retrieveMultipleRecords("ts_planningdata", fetchXml).then(async function success(result) {
        for (let planningData of result.entities) {
            if (isNaN(planningData.ts_plannedq1)) planningData.ts_plannedq1 = 0;
            if (isNaN(planningData.ts_plannedq2)) planningData.ts_plannedq2 = 0;
            if (isNaN(planningData.ts_plannedq3)) planningData.ts_plannedq3 = 0;
            if (isNaN(planningData.ts_plannedq4)) planningData.ts_plannedq4 = 0;
            if (isNaN(planningData.ts_plannedq4)) planningData.ts_plannedq4 = 0;
            if (isNaN(planningData.ts_teamestimatedduration)) planningData.ts_teamestimatedduration = 0;
            if (isNaN(planningData.ts_target)) planningData.ts_target = 0;


            teamPlanningDataPlannedQ1 += planningData.ts_plannedq1;
            teamPlanningDataPlannedQ2 += planningData.ts_plannedq2;
            teamPlanningDataPlannedQ3 += planningData.ts_plannedq3;
            teamPlanningDataPlannedQ4 += planningData.ts_plannedq4;

            teamPlanningDataTeamEstimatedDurationQ1 += planningData.ts_plannedq1 * planningData.ts_teamestimatedduration;
            teamPlanningDataTeamEstimatedDurationQ2 += planningData.ts_plannedq2 * planningData.ts_teamestimatedduration;
            teamPlanningDataTeamEstimatedDurationQ3 += planningData.ts_plannedq3 * planningData.ts_teamestimatedduration;
            teamPlanningDataTeamEstimatedDurationQ4 += planningData.ts_plannedq4 * planningData.ts_teamestimatedduration;

            totalRequiredHours += planningData.ts_target * planningData.ts_teamestimatedduration;
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
        formContext.getAttribute("ts_totalrequiredhours").setValue(totalRequiredHours);
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
                    "    <attribute name='ts_details'/>",
                    "    <filter type='and'>",
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
                    "    <filter>",
                    "      <condition attribute='ts_operationactivityisactive' operator='eq' value='1'/>",
                    "    </filter>",
                    "    </filter>",
                    "    <filter type='or'>",
                    "      <condition attribute='ts_keephidden' operator='eq' value='0'/>",
                    "      <condition attribute='ts_keephidden' operator='not-null'/>",
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
                        if (planningData.ts_details != null) workOrderData["ts_details"] = planningData.ts_details;

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

//Finds Operation Activities that are not being planned for in the current plan and adds Planning Data records for them.
async function addMissingPlanningData(formContext) {
    //Set localized label text
    const lang = parent.Xrm.Utility.getGlobalContext().userSettings.languageId;
    let addMissingPlanningDataTitleLocalized = "Update Planning Data";
    let addMissingPlanningDataTextLocalized = "Planning Data will be added for any missing Operation Activities. Do you wish to proceed?";
    let confirmLocalized = "Yes";
    let cancelLocalized = "Cancel";
    let addMissingPlanningDataProgressIndicator1 = "Finding missing Planning records";
    let addMissingPlanningDataProgressIndicator2 = "Adding missing Planning records";
    if (lang == 1036) {
        addMissingPlanningDataTitleLocalized = "Mettre à jour les données de planification";
        addMissingPlanningDataTextLocalized = "Les données de planification seront ajoutées pour toutes les activités opérationnelles manquantes. Voulez-vous continuer?";
        confirmLocalized = "Oui";
        cancelLocalized = "Annuler";
        addMissingPlanningDataProgressIndicator1 = "Recherche d'enregistrements de planification manquants";
        addMissingPlanningDataProgressIndicator2 = "Ajout d'enregistrements de planification manquants";
    }
    //Open a confirmation dialog box to confirm Planning Data Creation.
    var confirmStrings = { text: addMissingPlanningDataTextLocalized, title: addMissingPlanningDataTitleLocalized, confirmButtonLabel: confirmLocalized, cancelButtonLabel: cancelLocalized };
    var confirmOptions = { height: 200, width: 450 };
    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
        async function (success) {
            if (success.confirmed) {
                Xrm.Utility.showProgressIndicator(addMissingPlanningDataProgressIndicator1);
                //Get required Id's
                const teamPlanningDataId = formContext.data.entity.getId().slice(1, -1);
                let teamValue = formContext.getAttribute("ts_team").getValue();
                let teamId;
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
                if (teamId == null || planningDataFiscalYearName == null) {
                    Xrm.Utility.closeProgressIndicator();
                    return;
                }
                //Retrieve all Operations where OPI Team equals Team Planning Data Team
                var operationActivityFetchXml = [
                    "<fetch>",
                    "  <entity name='ts_operationactivity'>",
                    "    <attribute name='ts_stakeholder'/>",
                    "    <attribute name='ts_operation'/>",
                    "    <attribute name='ts_activity'/>",
                    "    <attribute name='ts_operationtype'/>",
                    "    <attribute name='ts_site'/>",
                    "    <attribute name='ts_operationalstatus'/>",
                    "    <attribute name='ts_operationactivityid'/>",
                    "    <filter>",
                    "      <condition attribute='statecode' operator='eq' value='0'/>",
                    "    </filter>",
                    "    <link-entity name='ovs_operation' from='ovs_operationid' to='ts_operation'>",
                    "      <attribute name='ovs_name'/>",
                    "      <filter>",
                    "        <condition attribute='ts_opiteam' operator='eq' value='", teamId, "'/>",
                    "      </filter>",
                    "    </link-entity>",
                    "    <link-entity name='msdyn_incidenttype' from='msdyn_incidenttypeid' to='ts_activity'>",
                    "      <attribute name='ovs_incidenttypenameenglish'/>",
                    "      <attribute name='ovs_incidenttypenamefrench'/>",
                    "      <attribute name='ts_riskscore'/>",
                    "      <attribute name='msdyn_estimatedduration'/>",
                    "      <filter>",
                    "        <condition attribute='ts_includeinplanning' operator='eq' value='1'/>",
                    "      </filter>",
                    "      <link-entity name='ts_recurrencefrequencies' from='ts_recurrencefrequenciesid' to='ts_riskscore'>",
                    "        <attribute name='ts_class1interval'/>",
                    "        <attribute name='ts_class2and3lowriskinterval'/>",
                    "        <attribute name='ts_class2and3highriskinterval'/>",
                    "      </link-entity>",
                    "    </link-entity>",
                    "    <link-entity name='msdyn_functionallocation' from='msdyn_functionallocationid' to='ts_site'>",
                    "      <attribute name='ts_class'/>",
                    "      <attribute name='ts_riskscore'/>",
                    "      <attribute name='ts_lpdtounitedstates'/>",
                    "    </link-entity>",
                    "  </entity>",
                    "</fetch>"
                ].join("");
                operationActivityFetchXml = "?fetchXml=" + encodeURIComponent(operationActivityFetchXml);
                //All Planning Data related to current Team Planning Data
                var planningDataFetchXml = [
                    "<fetch>",
                    "  <entity name='ts_planningdata'>",
                    "    <attribute name='ts_operationactivity'/>",
                    "    <filter type='and'>",
                    "      <condition attribute='ts_teamplanningdata' operator='eq' value='", teamPlanningDataId, "' uitype='ts_teamplanningdata'/>",
                    "      <condition attribute='statecode' operator='eq' value='0'/>",
                    "    </filter>",
                    "  </entity>",
                    "</fetch>"
                ].join("");
                planningDataFetchXml = "?fetchXml=" + encodeURIComponent(planningDataFetchXml);

                const operationActivites = await Xrm.WebApi.retrieveMultipleRecords("ts_operationactivity", operationActivityFetchXml).then(function success(result) { return result.entities });
                const planningDataRecords = await Xrm.WebApi.retrieveMultipleRecords("ts_planningdata", planningDataFetchXml).then(function success(result) { return result.entities });
                const planningDataCreationPromises = [] //Keep track of all the creation requests so the progress indicator can finish when they return
                for (let operationActivity of operationActivites) {
                    //Try to find a Planning Data record related to the curren Operation Activity
                    let foundInPlan = false;
                    for (let planningData of planningDataRecords) {
                        if (planningData._ts_operationactivity_value == operationActivity.ts_operationactivityid) {
                            foundInPlan = true;
                            break;
                        }
                    }
                    //If a planning data record was not found for the Operation Activity, create one.
                    if (foundInPlan == false) {
                        let generationLog = "";
                        let planningDataName = "";
                        let planningDataEnglishName = "";
                        let planningDataFrenchName = "";
                        let planningDataStakeholderId = "";
                        let planningDataOperationTypeId = "";
                        let planningDataSiteId = "";
                        let planningDataActivityTypeId = "";
                        let planningDataOperationId = "";
                        let planningDataTarget = 0;
                        let planningDataEstimatedDuration = 0;
                        let planningDataQuarters = [0, 0, 0, 0];

                        //Check if anything is missing from the FetchXML. Log it in the generationLog. Flag that there's missing data.
                        if (operationActivity["_ts_stakeholder_value"] == null) {
                            generationLog += "Missing Stakeholder \n";
                            isMissingData = true;
                        }
                        if (operationActivity["_ts_operationtype_value"] == null) {
                            generationLog += "Missing Operation Type\n";
                            isMissingData = true;
                        }
                        if (operationActivity["_ts_site_value"] == null) {
                            generationLog += "Missin Site \n";
                            isMissingData = true;
                        }
                        if (operationActivity["_ts_activity_value"] == null) {
                            generationLog += "Missing Activity Type\n";
                            isMissingData = true;
                        }
                        if (operationActivity["ovs_operation1.ovs_name"] == null) {
                            generationLog += "Operation missing Name\n";
                            isMissingData = true;
                        }
                        if (operationActivity["msdyn_incidenttype2.ovs_incidenttypenameenglish"] == null) {
                            generationLog += "Incident Type missing english name\n";
                            isMissingData = true;
                        }
                        if (operationActivity["msdyn_incidenttype2.ovs_incidenttypenamefrench"] == null) {
                            generationLog += "Incident Type missing french name\n";
                            isMissingData = true;
                        }
                        if (operationActivity["msdyn_functionallocation4.ts_class"] == null) {
                            generationLog += "Missing Class on Site\n";
                            isMissingData = true;
                        }
                        if (operationActivity['ts_recurrencefrequencies3.ts_class2and3highriskinterval'] == null) {
                            generationLog += "Incident Type missing Recurrence Frequency\n";
                            isMissingData = true;
                        }
                        if (operationActivity['ts_recurrencefrequencies3.ts_class2and3lowriskinterval'] == null) {
                            generationLog += "Incident Type missing Recurrence Frequency\n";
                            isMissingData = true;
                        }
                        if (operationActivity['ts_recurrencefrequencies3.ts_class1interval'] == null) {
                            generationLog += "Incident Type missing Recurrence Frequency\n";
                            isMissingData = true;
                        }

                        planningDataStakeholderId = operationActivity["_ts_stakeholder_value"];
                        planningDataOperationTypeId = operationActivity["_ts_operationtype_value"];
                        planningDataSiteId = operationActivity["_ts_site_value"];
                        planningDataActivityTypeId = operationActivity["_ts_activity_value"];
                        planningDataOperationId = operationActivity["_ts_operation_value"];
                        planningDataEnglishName = operationActivity["ovs_operation1.ovs_name"] + " | " + operationActivity["msdyn_incidenttype2.ovs_incidenttypenameenglish"] + " | " + planningDataFiscalYearName;
                        planningDataFrenchName = operationActivity["ovs_operation1.ovs_name"] + " | " + operationActivity["msdyn_incidenttype2.ovs_incidenttypenamefrench"] + " | " + planningDataFiscalYearName;
                        planningDataName = planningDataEnglishName + "::" + planningDataFrenchName;

                        var estimatedDurationFetchXml = [
                            "<fetch>",
                            "  <entity name='ts_teamactivitytypeestimatedduration'>",
                            "    <attribute name='ts_estimatedduration'/>",
                            "    <filter type='and'>",
                            "      <condition attribute='ts_team' operator='eq' value='", teamId, "'/>",
                            "      <condition attribute='ts_activitytype' operator='eq' value='", planningDataActivityTypeId, "'/>",
                            "      <condition attribute='statecode' operator='eq' value='0'/>",
                            "    </filter>",
                            "  </entity>",
                            "</fetch>"
                        ].join("");
                        estimatedDurationFetchXml = "?fetchXml=" + encodeURIComponent(estimatedDurationFetchXml);
                        let teamActivityTypeEstimatedDuration = await Xrm.WebApi.retrieveMultipleRecords("ts_teamactivitytypeestimatedduration", estimatedDurationFetchXml).then(function (result) { return result.entities[0] });

                        if (teamActivityTypeEstimatedDuration != null && teamActivityTypeEstimatedDuration.ts_estimatedduration != null) {
                            planningDataEstimatedDuration = teamActivityTypeEstimatedDuration.ts_estimatedduration / 60;
                        }
                        else if (operationActivity["msdyn_incidenttype2.msdyn_estimatedduration"] != null) {
                            planningDataEstimatedDuration = operationActivity["msdyn_incidenttype2.msdyn_estimatedduration"] / 60;
                            generationLog += "Missing Team Estimated Duration for this Team and Activity Type. Using Activity Type Estimated Duration. \n";
                        } else {
                            generationLog += "The Incident Type does not have an Estimated Duration. \n";
                            isMissingData = true;
                        }
                        let interval = 0;

                        if (operationActivity["msdyn_functionallocation4.ts_class"] == 717750001) {
                            interval = operationActivity['ts_recurrencefrequencies3.ts_class1interval'];
                        }
                        else //Class 2 or 3
                        {

                            if (operationActivity["msdyn_functionallocation4.ts_riskscore"] == null) {
                                generationLog += "Missing Risk Score on Site\n";
                                isMissingData = true;
                            }
                            if (operationActivity["msdyn_functionallocation4.ts_riskscore"] > 5 || operationActivity["msdyn_functionallocation4.ts_lpdtounitedstates"] == true) {
                                interval = operationActivity['ts_recurrencefrequencies3.ts_class2and3highriskinterval'];
                            }
                            else {
                                interval = operationActivity['ts_recurrencefrequencies3.ts_class2and3lowriskinterval'];
                            }
                        }

                        if (interval > 0) {
                            for (let i = 0; i < 4; i += interval) {
                                planningDataQuarters[i]++;
                                planningDataTarget++;
                            }
                        }
                        let data = {
                            "ts_name": planningDataName,
                            "ts_englishname": planningDataEnglishName,
                            "ts_frenchname": planningDataFrenchName,
                            "ts_OperationActivity@odata.bind": "/ts_operationactivities(" + operationActivity.ts_operationactivityid + ")",
                            "ts_FiscalYear@odata.bind": "/tc_tcfiscalyears(" + planningDataFiscalYearId + ")",
                            "ts_TeamPlanningData@odata.bind": "/ts_teamplanningdatas(" + teamPlanningDataId + ")",
                            "ts_Stakeholder@odata.bind": "/accounts(" + planningDataStakeholderId + ")",
                            "ts_OperationType@odata.bind": "/ovs_operationtypes(" + planningDataOperationTypeId + ")",
                            "ts_Site@odata.bind": "/msdyn_functionallocations(" + planningDataSiteId + ")",
                            "ts_ActivityType@odata.bind": "/msdyn_incidenttypes(" + planningDataActivityTypeId + ")",
                            "ts_Operation@odata.bind": "/ovs_operations(" + planningDataOperationId + ")",
                            "ts_target": planningDataTarget,
                            "ts_varianceuncalculated": 0,
                            "ts_plannedwouncalculated": planningDataTarget,
                            "ts_teamestimatedduration": planningDataEstimatedDuration,
                            "ts_originalteamestimatedduration": planningDataEstimatedDuration,
                            "ts_dueq1": planningDataQuarters[0],
                            "ts_dueq2": planningDataQuarters[1],
                            "ts_dueq3": planningDataQuarters[2],
                            "ts_dueq4": planningDataQuarters[3],
                            "ts_plannedq1": planningDataQuarters[0],
                            "ts_plannedq2": planningDataQuarters[1],
                            "ts_plannedq3": planningDataQuarters[2],
                            "ts_plannedq4": planningDataQuarters[3],
                            "ts_generationlog": generationLog
                        }
                        planningDataCreationPromises.push(Xrm.WebApi.createRecord("ts_planningdata", data));
                    }
                }
                Xrm.Utility.showProgressIndicator(addMissingPlanningDataProgressIndicator2);
                //After all additional Planning Data have been created, close the Progress indicator.
                await Promise.all(planningDataCreationPromises);
                recalculateTeamPlanningDataValues(formContext);
            }
        }
    );
}

//Sets all durations to the latest Team Activity Type Estimated Duration if it exists, or the Activity Type Estimated Duration if it does not.
async function resetDurations(formContext) {
    //Set Localized label text
    const lang = parent.Xrm.Utility.getGlobalContext().userSettings.languageId;
    let resetDurationsTitleLocalized = "Reset Durations";
    let resetDurationsTextLocalized = "The Planning Data Durations will be reset to their default values. Any changes made to the Durations in this plan will be overwritten. Do you wish to proceed?";
    let confirmLocalized = "Yes";
    let cancelLocalized = "Cancel";
    if (lang == 1036) {
        resetDurationsTitleLocalized = "Réinitialiser les durées";
        resetDurationsTextLocalized = "Les durées des données de planification seront réinitialisées à leurs valeurs par défaut. Toute modification apportée aux durées dans ce plan sera remplacée. Voulez-vous continuer?";
        confirmLocalized = "Oui";
        cancelLocalized = "Annuler";
    }
    //Open a confirmation dialog box to confirm Duration Updates.
    var confirmStrings = { text: resetDurationsTextLocalized, title: resetDurationsTitleLocalized, confirmButtonLabel: confirmLocalized, cancelButtonLabel: cancelLocalized };
    var confirmOptions = { height: 200, width: 450 };
    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
        async function (success) {
            if (success.confirmed) {
                const teamPlanningDataId = formContext.data.entity.getId().slice(1, -1);
                const teamValue = formContext.getAttribute("ts_team").getValue();
                let teamId;
                if (teamValue != null) {
                    teamId = teamValue[0].id.slice(1, -1);
                } else {
                    return;
                }
                //All Planning Data for the current Team Planning Data. Includes estimated duration on related activity type
                var planningDataFetchXml = [
                    "<fetch>",
                    "  <entity name='ts_planningdata'>",
                    "    <attribute name='ts_activitytype'/>",
                    "    <attribute name='ts_planningdataid'/>",
                    "    <attribute name='ts_teamestimatedduration'/>",
                    "    <filter type='and'>",
                    "      <condition attribute='ts_teamplanningdata' operator='eq' value='", teamPlanningDataId, "'/>",
                    "      <condition attribute='statecode' operator='eq' value='0'/>",
                    "    </filter>",
                    "    <link-entity name='msdyn_incidenttype' from='msdyn_incidenttypeid' to='ts_activitytype' alias='incidenttype'>",
                    "      <attribute name='msdyn_estimatedduration'/>",
                    "      <attribute name='msdyn_incidenttypeid'/>",
                    "    </link-entity>",
                    "  </entity>",
                    "</fetch>"
                ].join("");
                planningDataFetchXml = "?fetchXml=" + encodeURIComponent(planningDataFetchXml);
                const planningDataRecords = await Xrm.WebApi.retrieveMultipleRecords("ts_planningdata", planningDataFetchXml).then(function success(result) { return result.entities });
                planningDataUpdatePromises = []; //Track update promises to close progress indicator when they all return
                Xrm.Utility.showProgressIndicator();
                for (let planningData of planningDataRecords) {
                    if (planningData["incidenttype.msdyn_incidenttypeid"] == null) continue;
                    let planningDataEstimatedDuration = 0;
                    //Team Activity Type Estimated Duration for the plan's Team and the Planning Data's Activity Type
                    var estimatedDurationFetchXml = [
                        "<fetch>",
                        "  <entity name='ts_teamactivitytypeestimatedduration'>",
                        "    <attribute name='ts_estimatedduration'/>",
                        "    <filter type='and'>",
                        "      <condition attribute='ts_team' operator='eq' value='", teamId, "'/>",
                        "      <condition attribute='ts_activitytype' operator='eq' value='", planningData["incidenttype.msdyn_incidenttypeid"], "'/>",
                        "      <condition attribute='statecode' operator='eq' value='0'/>",
                        "    </filter>",
                        "  </entity>",
                        "</fetch>"
                    ].join("");
                    estimatedDurationFetchXml = "?fetchXml=" + encodeURIComponent(estimatedDurationFetchXml);
                    let teamActivityTypeEstimatedDuration = await Xrm.WebApi.retrieveMultipleRecords("ts_teamactivitytypeestimatedduration", estimatedDurationFetchXml).then(function (result) { return result.entities[0] });
                    //If the Team Activity Type Estimated Duration exists, use its estimated duration
                    if (teamActivityTypeEstimatedDuration != null && teamActivityTypeEstimatedDuration.ts_estimatedduration != null) {
                        planningDataEstimatedDuration = teamActivityTypeEstimatedDuration.ts_estimatedduration / 60;
                    }
                    //If the Team Activity Type Estimated Duration does not exists, use the activity type's estimated duration
                    else if (planningData["incidenttype.msdyn_estimatedduration"] != null) {
                        planningDataEstimatedDuration = planningData["incidenttype.msdyn_estimatedduration"] / 60;
                    }
                    //Update the record if the duration will change
                    if (planningData.ts_teamestimatedduration != planningDataEstimatedDuration) {
                        let data =
                        {
                            "ts_teamestimatedduration": planningDataEstimatedDuration
                        }
                        planningDataUpdatePromises.push(Xrm.WebApi.updateRecord("ts_planningdata", planningData.ts_planningdataid, data));
                    }
                }
                //After all additional Planning Data have been updated, close the Progress indicator.
                await Promise.all(planningDataUpdatePromises);
                recalculateTeamPlanningDataValues(formContext);
            }
        }
    );
}