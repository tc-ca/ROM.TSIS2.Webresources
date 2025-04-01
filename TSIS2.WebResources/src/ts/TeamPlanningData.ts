namespace ROM.TeamPlanningData {
    const INSPECTORROLEID = "ed37675e-f72c-eb11-a813-000d3af3a7a7";
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_teamplanningdata.Main.Information>eContext.getFormContext();
        if (formContext.ui.getFormType() == 2) { //Update type. The form has already been saved for the first time
            formContext.getControl("ts_team").setDisabled(true);
            formContext.getControl("ts_fiscalyear").setDisabled(true);
            const planStatusValue = formContext.getAttribute("ts_planstatus").getValue();

            if (planStatusValue == ts_planstatus.Complete || planStatusValue == ts_planstatus.HQreview) {
                if (userHasRole("System Administrator|ROM - Business Admin")) {
                    formContext.getControl("ts_planstatus").setDisabled(false);
                }
                else {
                    formContext.getControl("ts_planstatus").setDisabled(true);
                }

                formContext.getControl("ts_totalhoursq1").setDisabled(true);
                formContext.getControl("ts_totalhoursq2").setDisabled(true);
                formContext.getControl("ts_totalhoursq3").setDisabled(true);
                formContext.getControl("ts_totalhoursq4").setDisabled(true);
                formContext.getControl("ts_totalhoursfiscalyear").setDisabled(true);
                formContext.getControl("header_ts_name").setDisabled(true);
                formContext.getControl("header_ownerid").setDisabled(true);
            }
            else {
                formContext.getControl("ts_totalhoursq1").setDisabled(false);
                formContext.getControl("ts_totalhoursq2").setDisabled(false);
                formContext.getControl("ts_totalhoursq3").setDisabled(false);
                formContext.getControl("ts_totalhoursq4").setDisabled(false);
                formContext.getControl("ts_totalhoursfiscalyear").setDisabled(false);
                formContext.getControl("header_ts_name").setDisabled(false);
                formContext.getControl("header_ownerid").setDisabled(false);
                formContext.getControl("ts_planstatus").setDisabled(false);
            }

        }
    }
    export function onSave(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext: any = eContext.getFormContext();
        if (formContext.ui.getFormType() == 1) { //Create
            formContext.data.entity.addOnPostSave(generatePlanningData)
        }
    }
    async function generatePlanningData(eContext: Xrm.ExecutionContext<any, any>) {
        Xrm.Utility.showProgressIndicator("Please wait while the Planning records are being created.");
        const formContext: any = eContext.getFormContext();
        formContext.data.entity.removeOnPostSave(generatePlanningData);
        const teamPlanningDataId = formContext.data.entity.getId().slice(1, -1);
        const teamPlanningDataTotalHoursQ1 = formContext.getAttribute("ts_totalhoursq1").getValue();
        const teamPlanningDataTotalHoursQ2 = formContext.getAttribute("ts_totalhoursq2").getValue();
        const teamPlanningDataTotalHoursQ3 = formContext.getAttribute("ts_totalhoursq3").getValue();
        const teamPlanningDataTotalHoursQ4 = formContext.getAttribute("ts_totalhoursq4").getValue();
        const teamPlanningDataTotalHoursFiscalYear = formContext.getAttribute("ts_totalhoursfiscalyear").getValue();

        if (teamPlanningDataTotalHoursQ1 == null) formContext.getAttribute("ts_totalhoursq1").setValue(0);
        if (teamPlanningDataTotalHoursQ2 == null) formContext.getAttribute("ts_totalhoursq2").setValue(0);
        if (teamPlanningDataTotalHoursQ3 == null) formContext.getAttribute("ts_totalhoursq3").setValue(0);
        if (teamPlanningDataTotalHoursQ4 == null) formContext.getAttribute("ts_totalhoursq4").setValue(0);
        if (teamPlanningDataTotalHoursFiscalYear == null) formContext.getAttribute("ts_totalhoursfiscalyear").setValue(0);


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
        if (teamId == null || planningDataFiscalYearName == null) {
            Xrm.Utility.closeProgressIndicator();
            return;
        }

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

        let teamPlanningDataResidualinspectorhoursQ1 = 0;
        let teamPlanningDataResidualinspectorhoursQ2 = 0;
        let teamPlanningDataResidualinspectorhoursQ3 = 0;
        let teamPlanningDataResidualinspectorhoursQ4 = 0;
        let teamPlanningDataResidualinspectorhoursTotal = 0;

        let totalRequiredHours = 0;

        //Retrieve all users of Team with Inspector Role
        var userfetchXml = [
            "<fetch>",
            "  <entity name='systemuser'>",
            "    <attribute name='fullname'/>",
            "    <attribute name='systemuserid'/>",
            "    <link-entity name='teammembership' from='systemuserid' to='systemuserid' intersect='true'>",
            "      <filter>",
            "        <condition attribute='teamid' operator='eq' value='", teamId, "' uitype='teammembership'/>",
            "      </filter>",
            "    </link-entity>",
            "    <link-entity name='systemuserroles' from='systemuserid' to='systemuserid' intersect='true'>",
            "      <filter>",
            "        <condition attribute='roleid' operator='eq' value='", INSPECTORROLEID, "'/>",
            "      </filter>",
            "    </link-entity>",
            "  </entity>",
            "</fetch>"
        ].join("");
        userfetchXml = "?fetchXml=" + encodeURIComponent(userfetchXml);
        await Xrm.WebApi.retrieveMultipleRecords("systemuser", userfetchXml).then(function success(result) {
            for (let user of result.entities) {
                teamPlanningDataAvailableInspectorHoursQ1 += teamPlanningDataTotalHoursQ1;
                teamPlanningDataAvailableInspectorHoursQ2 += teamPlanningDataTotalHoursQ2;
                teamPlanningDataAvailableInspectorHoursQ3 += teamPlanningDataTotalHoursQ3;
                teamPlanningDataAvailableInspectorHoursQ4 += teamPlanningDataTotalHoursQ4;
                let data = {
                    "ts_name": user.fullname + " | " + teamName + " | " + planningDataFiscalYearName,
                    "ts_Inspector@odata.bind": "/systemusers(" + user.systemuserid + ")",
                    "ts_TeamPlanningData@odata.bind": "/ts_teamplanningdatas(" + teamPlanningDataId + ")",
                    "ts_varianceq1": 0,
                    "ts_varianceq2": 0,
                    "ts_varianceq3": 0,
                    "ts_varianceq4": 0,
                }
                Xrm.WebApi.createRecord("ts_teamplanninginspectorhours", data);
            }
        });

        //Retrieve all Operations where OPI Team equals Team Planning Data Team
        var fetchXml = [
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
            "      <condition attribute='ts_accountableteam' operator = 'eq' value = '", teamId, "'/> ",
            "    </filter>",
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
        fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
        await Xrm.WebApi.retrieveMultipleRecords("ts_operationactivity", fetchXml).then(async function success(result) {
            for (let operationActivity of result.entities) {

                let generationLog = "";

                let isMissingData = false;
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
                    "    <filter>",
                    "      <condition attribute='ts_team' operator='eq' value='", teamId, "'/>",
                    "      <condition attribute='ts_activitytype' operator='eq' value='", planningDataActivityTypeId, "'/>",
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
                    if (operationActivity.ts_operationalstatus == 717750000) { //Operational
                        teamPlanningDataTeamEstimatedDurationQ1 += planningDataQuarters[0] * planningDataEstimatedDuration;
                        teamPlanningDataTeamEstimatedDurationQ2 += planningDataQuarters[1] * planningDataEstimatedDuration;
                        teamPlanningDataTeamEstimatedDurationQ3 += planningDataQuarters[2] * planningDataEstimatedDuration;
                        teamPlanningDataTeamEstimatedDurationQ4 += planningDataQuarters[3] * planningDataEstimatedDuration;

                        teamPlanningDataPlannedQ1 += planningDataQuarters[0];
                        teamPlanningDataPlannedQ2 += planningDataQuarters[1];
                        teamPlanningDataPlannedQ3 += planningDataQuarters[2];
                        teamPlanningDataPlannedQ4 += planningDataQuarters[3];

                        totalRequiredHours += planningDataTarget * planningDataEstimatedDuration;
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
                Xrm.WebApi.createRecord("ts_planningdata", data).then(
                    function success(result) {
                    },
                    function (error) {
                        console.log(error.message);
                    }
                );
            }
        });

        teamPlanningDataResidualinspectorhoursQ1 = teamPlanningDataAvailableInspectorHoursQ1 - teamPlanningDataTeamEstimatedDurationQ1;
        teamPlanningDataResidualinspectorhoursQ2 = teamPlanningDataAvailableInspectorHoursQ2 - teamPlanningDataTeamEstimatedDurationQ2;
        teamPlanningDataResidualinspectorhoursQ3 = teamPlanningDataAvailableInspectorHoursQ3 - teamPlanningDataTeamEstimatedDurationQ3;
        teamPlanningDataResidualinspectorhoursQ4 = teamPlanningDataAvailableInspectorHoursQ4 - teamPlanningDataTeamEstimatedDurationQ4;

        teamPlanningDataPlannedTotal = teamPlanningDataPlannedQ1 + teamPlanningDataPlannedQ2 + teamPlanningDataPlannedQ3 + teamPlanningDataPlannedQ4;
        teamPlanningDataAvailableInspectorHoursTotal = teamPlanningDataAvailableInspectorHoursQ1 + teamPlanningDataAvailableInspectorHoursQ2 + teamPlanningDataAvailableInspectorHoursQ3 + teamPlanningDataAvailableInspectorHoursQ4;
        teamPlanningDataTeamEstimatedDurationTotal = teamPlanningDataTeamEstimatedDurationQ1 + teamPlanningDataTeamEstimatedDurationQ2 + teamPlanningDataTeamEstimatedDurationQ3 + teamPlanningDataTeamEstimatedDurationQ4;
        teamPlanningDataResidualinspectorhoursTotal = teamPlanningDataAvailableInspectorHoursTotal - teamPlanningDataTeamEstimatedDurationTotal;

        formContext.getAttribute("ts_name").setValue(teamName + " | " + planningDataFiscalYearName);
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
        formContext.getAttribute("ts_residualinspectorhoursq1").setValue(teamPlanningDataResidualinspectorhoursQ1);
        formContext.getAttribute("ts_residualinspectorhoursq2").setValue(teamPlanningDataResidualinspectorhoursQ2);
        formContext.getAttribute("ts_residualinspectorhoursq3").setValue(teamPlanningDataResidualinspectorhoursQ3);
        formContext.getAttribute("ts_residualinspectorhoursq4").setValue(teamPlanningDataResidualinspectorhoursQ4);
        formContext.getAttribute("ts_residualinspectorhoursfiscalyear").setValue(teamPlanningDataResidualinspectorhoursTotal);
        formContext.getAttribute("ts_totalrequiredhours").setValue(totalRequiredHours);
        formContext.data.entity.save();
        Xrm.Utility.closeProgressIndicator();
    }

    export function setTotalInspectorHoursFiscalYear(formContext: Form.ts_teamplanningdata.Main.Information) {
        const teamPlanningDataTotalHoursQ1 = formContext.getAttribute("ts_totalhoursq1").getValue();
        const teamPlanningDataTotalHoursQ2 = formContext.getAttribute("ts_totalhoursq2").getValue();
        const teamPlanningDataTotalHoursQ3 = formContext.getAttribute("ts_totalhoursq3").getValue();
        const teamPlanningDataTotalHoursQ4 = formContext.getAttribute("ts_totalhoursq4").getValue();
        if (teamPlanningDataTotalHoursQ1 != null && teamPlanningDataTotalHoursQ2 != null && teamPlanningDataTotalHoursQ3 != null && teamPlanningDataTotalHoursQ4 != null) {
            formContext.getAttribute("ts_totalhoursfiscalyear").setValue(teamPlanningDataTotalHoursQ1 + teamPlanningDataTotalHoursQ2 + teamPlanningDataTotalHoursQ3 + teamPlanningDataTotalHoursQ4);
        }
    }

    export function inspectorHoursQ1OnChange(eContext: Xrm.ExecutionContext<any, any>) {
        const formContext = <Form.ts_teamplanningdata.Main.Information>eContext.getFormContext();
        const teamPlanningDataTotalHoursQ1 = formContext.getAttribute("ts_totalhoursq1").getValue();
        if (teamPlanningDataTotalHoursQ1 == null) {
            formContext.getAttribute("ts_totalhoursq1").setValue(0);
        }
        setTotalInspectorHoursFiscalYear(formContext);
    }

    export function inspectorHoursQ2OnChange(eContext: Xrm.ExecutionContext<any, any>) {
        const formContext = <Form.ts_teamplanningdata.Main.Information>eContext.getFormContext();
        const teamPlanningDataTotalHoursQ2 = formContext.getAttribute("ts_totalhoursq2").getValue();
        if (teamPlanningDataTotalHoursQ2 == null) {
            formContext.getAttribute("ts_totalhoursq2").setValue(0);
        }
        setTotalInspectorHoursFiscalYear(formContext);
    }

    export function inspectorHoursQ3OnChange(eContext: Xrm.ExecutionContext<any, any>) {
        const formContext = <Form.ts_teamplanningdata.Main.Information>eContext.getFormContext();
        const teamPlanningDataTotalHoursQ3 = formContext.getAttribute("ts_totalhoursq3").getValue();
        if (teamPlanningDataTotalHoursQ3 == null) {
            formContext.getAttribute("ts_totalhoursq3").setValue(0);
        }
        setTotalInspectorHoursFiscalYear(formContext);
    }

    export function inspectorHoursQ4OnChange(eContext: Xrm.ExecutionContext<any, any>) {
        const formContext = <Form.ts_teamplanningdata.Main.Information>eContext.getFormContext();
        const teamPlanningDataTotalHoursQ4 = formContext.getAttribute("ts_totalhoursq4").getValue();
        if (teamPlanningDataTotalHoursQ4 == null) {
            formContext.getAttribute("ts_totalhoursq4").setValue(0);
        }
        setTotalInspectorHoursFiscalYear(formContext);
    }

    export function fiscalYearInspectorHoursOnChange(eContext: Xrm.ExecutionContext<any, any>) {
        const formContext = <Form.ts_teamplanningdata.Main.Information>eContext.getFormContext();
        let teamPlanningDataTotalHoursFiscalYear = formContext.getAttribute("ts_totalhoursfiscalyear").getValue()
        if (teamPlanningDataTotalHoursFiscalYear == null) {
            formContext.getAttribute("ts_totalhoursfiscalyear").setValue(0);
            formContext.getAttribute("ts_totalhoursq1").setValue(0);
            formContext.getAttribute("ts_totalhoursq2").setValue(0);
            formContext.getAttribute("ts_totalhoursq3").setValue(0);
            formContext.getAttribute("ts_totalhoursq4").setValue(0);
        } else {
            const quarterTotal = teamPlanningDataTotalHoursFiscalYear / 4
            formContext.getAttribute("ts_totalhoursq1").setValue(quarterTotal);
            formContext.getAttribute("ts_totalhoursq2").setValue(quarterTotal);
            formContext.getAttribute("ts_totalhoursq3").setValue(quarterTotal);
            formContext.getAttribute("ts_totalhoursq4").setValue(quarterTotal);
        }
        
    }

    export function userHasRole(rolesName) {
        var userRoles = Xrm.Utility.getGlobalContext().userSettings.roles;
        var hasRole = false;
        var roles = rolesName.split("|");
        roles.forEach(function (roleItem) {
            userRoles.forEach(function (userRoleItem) {
                if (userRoleItem.name.toLowerCase() == roleItem.toLowerCase()) hasRole = true;
            });
        });
        return hasRole;
    }

    export function planStatusOnChange(eContext: Xrm.ExecutionContext<any, any>) {
        const formContext = <Form.ts_teamplanningdata.Main.Information>eContext.getFormContext();
        const planStatusValue = formContext.getAttribute("ts_planstatus").getValue();
        if (planStatusValue == ts_planstatus.Complete || planStatusValue == ts_planstatus.HQreview) {
            formContext.getControl("ts_totalhoursq1").setDisabled(true);
            formContext.getControl("ts_totalhoursq2").setDisabled(true);
            formContext.getControl("ts_totalhoursq3").setDisabled(true);
            formContext.getControl("ts_totalhoursq4").setDisabled(true);
            formContext.getControl("ts_totalhoursq4").setDisabled(true);
            formContext.getControl("ts_totalhoursfiscalyear").setDisabled(true);
            formContext.getControl("header_ts_name").setDisabled(true);
            formContext.getControl("header_ownerid").setDisabled(true);

            if (userHasRole("System Administrator|ROM - Business Admin")) {
                formContext.getControl("ts_planstatus").setDisabled(false);
            }
            else {
                formContext.getControl("ts_planstatus").setDisabled(true);
            }
        }
       else {
            formContext.getControl("ts_totalhoursq1").setDisabled(false);
            formContext.getControl("ts_totalhoursq2").setDisabled(false);
            formContext.getControl("ts_totalhoursq3").setDisabled(false);
            formContext.getControl("ts_totalhoursq4").setDisabled(false);
            formContext.getControl("ts_totalhoursfiscalyear").setDisabled(false);
            formContext.getControl("header_ts_name").setDisabled(false);
            formContext.getControl("header_ownerid").setDisabled(false);
            formContext.getControl("ts_planstatus").setDisabled(false);
        }
        formContext.ui.refreshRibbon();
        formContext.data.entity.save();
    }

}