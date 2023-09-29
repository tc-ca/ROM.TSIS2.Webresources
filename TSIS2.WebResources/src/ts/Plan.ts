namespace ROM.Plan {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext: any = eContext.getFormContext();
        if (formContext.ui.getFormType() == 1) { //Create
            formContext.data.entity.addOnPostSave(generateSuggestedInspections);
        }
    }

    async function generateSuggestedInspections(eContext: Xrm.ExecutionContext<any, any>) {
        const formContext: any = eContext.getFormContext();
        Xrm.Utility.showProgressIndicator("Please wait while the Suggested Inspection records are being created.");
        formContext.data.entity.removeOnPostSave(generateSuggestedInspections);
        let planId = formContext.data.entity.getId();
        let teamValue = formContext.getAttribute("ts_team").getValue();
        let teamId;
        let teamName;
        if (teamValue != null) {
            teamId = teamValue[0].id;
            teamName = teamValue[0].name;
        }

        const planFiscalYearValue = formContext.getAttribute("ts_fiscalyear").getValue()
        let planFiscalYearName;
        let planFiscalYearId;
        if (planFiscalYearValue != null) {
            planFiscalYearName = planFiscalYearValue[0].name;
            planFiscalYearId = planFiscalYearValue[0].id.slice(1, -1);
        }

        if (teamId != null && planFiscalYearId != null) {

            formContext.getAttribute("ts_name").setValue(`${teamName} ${planFiscalYearName}`);
            //Show Loading Wheel

            //Current Plan linked with fiscalyear and region data
            let planfetchXml = [
                "<fetch>",
                "  <entity name='ts_plan'>",
                "    <filter>",
                "      <condition attribute='ts_planid' operator='eq' value='", planId, "' uitype='ts_plan'/>",
                "    </filter>",
                "    <link-entity name='tc_tcfiscalyear' from='tc_tcfiscalyearid' to='ts_fiscalyear' alias='fiscalyear'>",
                "      <attribute name='tc_fiscalend'/>",
                "      <attribute name='tc_fiscalstart'/>",
                "      <attribute name='tc_tcfiscalyearid'/>",
                "    </link-entity>",
                "    <link-entity name='team' from='teamid' to='ts_team' alias='team'>",
                "      <attribute name='ts_territory'/>",
                "    </link-entity>",
                "  </entity>",
                "</fetch>"
            ].join("");
            planfetchXml = "?fetchXml=" + encodeURIComponent(planfetchXml);
            let planData = await Xrm.WebApi.retrieveMultipleRecords("ts_plan", planfetchXml).then(function success(result) {
                return result.entities[0];
            });
            if (planData == null) {
                console.log("Failed to load current Plan");
                return;
            }

            const teamRegionId = planData["team.ts_territory"];
            const plannedFiscalStartDate = new Date(planData["fiscalyear.tc_fiscalstart"]);
            const plannedFiscalEndDate = new Date(planData["fiscalyear.tc_fiscalend"]);

            var railOperationsFetchXml = [
                "<fetch>",
                "  <entity name='ovs_operation'>",
                "    <attribute name='ts_dateoflastriskbasedinspection'/>",
                "    <attribute name='ts_typeofdangerousgoods'/>",
                "    <attribute name='ovs_name'/>",
                "    <attribute name='ovs_operationid'/>",
                "    <attribute name='ovs_operationtypeid'/>",
                "    <attribute name='ts_risk'/>",
                "    <attribute name='ts_site'/>",
                "    <attribute name='ts_stakeholder'/>",
                "    <attribute name='ts_operationnameenglish'/>",
                "    <attribute name='ts_operationnamefrench'/>",
                "    <attribute name='ts_visualsecurityinspection'/>",
                "    <filter type='or'>",
                "      <condition attribute='ovs_operationtypeid' operator='eq' value='d883b39a-c751-eb11-a812-000d3af3ac0d' uiname='Railway Carrier' uitype='ovs_operationtype'/>",
                "      <condition attribute='ovs_operationtypeid' operator='eq' value='da56fea1-c751-eb11-a812-000d3af3ac0d' uiname='Railway Loader' uitype='ovs_operationtype'/>",
                "    </filter>",
                "    <link-entity name='msdyn_functionallocation' from='msdyn_functionallocationid' to='ts_site'>",
                "      <filter>",
                "        <condition attribute='ts_region' operator='eq' value='", teamRegionId, "' uiname='Pacific Region' uitype='territory'/>",
                "      </filter>",
                "    </link-entity>",
                "    <link-entity name='ts_riskcategory' from='ts_riskcategoryid' to='ts_risk' alias='risk'>",
                "      <attribute name='ts_frequency'/>",
                "      <attribute name='ts_interval'/>",
                "    </link-entity>",
                "  </entity>",
                "</fetch>"
            ].join("");
            railOperationsFetchXml = "?fetchXml=" + encodeURIComponent(railOperationsFetchXml);
            let railOperations = await Xrm.WebApi.retrieveMultipleRecords("ovs_operation", railOperationsFetchXml).then(function success(result) {
                return result.entities;
            });
            planId = planId.slice(1, -1);

            const siteInspectionTDGIncidentType = await Xrm.WebApi.retrieveRecord("msdyn_incidenttype", "2bc59aa0-511a-ec11-b6e7-000d3a09ce95", "?$select=msdyn_name,msdyn_estimatedduration").then(function success(result) {return result;},function (error) {console.log(error.message);});
            const VSITDGIncidentType = await Xrm.WebApi.retrieveRecord("msdyn_incidenttype", "34c59aa0-511a-ec11-b6e7-000d3a09ce95", "?$select=msdyn_name,msdyn_estimatedduration").then(function success(result) {return result;},function (error) {console.log(error.message);});
            const NonSchedule1TDGIncidentType = await Xrm.WebApi.retrieveRecord("msdyn_incidenttype", "3ac59aa0-511a-ec11-b6e7-000d3a09ce95", "?$select=msdyn_name,msdyn_estimatedduration").then(function success(result) {return result;},function (error) {console.log(error.message);});
            const OversightSIPAXIncidentType = await Xrm.WebApi.retrieveRecord("msdyn_incidenttype", "c8c934c6-01b5-ec11-983e-000d3af4f373", "?$select=msdyn_name,msdyn_estimatedduration").then(function success(result) {return result;},function (error) {console.log(error.message);});
            const SIPAXIncidentType = await Xrm.WebApi.retrieveRecord("msdyn_incidenttype", "45c59aa0-511a-ec11-b6e7-000d3a09ce95", "?$select=msdyn_name,msdyn_estimatedduration").then(function success(result) {return result;},function (error) {console.log(error.message);});

            //Create a suggested inspection for each operation
            for (let railOperation of railOperations) {

                // If ts_typeofdangerousgoods does not equal No DG
                if (railOperation.ts_typeofdangerousgoods != ts_typeofdangerousgoods.NoDangerousGoods) {
                    // If Risk Score recurrence compared with Last Risk Based Inspection puts next inspection within fiscal year
                    const lastRiskInspection: Date = railOperation.ts_dateoflastriskbasedinspection;
                    const riskInterval = railOperation["risk.ts_interval"]; //Cycle Length Years
                    const riskFrequency = railOperation["risk.ts_frequency"]; //Inspections per Cycle
                    let inspectionIsDue = false;
                    let inspectionCount = 0;

                    //Handle Last Risk Inspection Date bieng Null. Suggest an inspection this fiscal year. Or multiple if multiple happen a year.
                    if (lastRiskInspection == null) {
                        inspectionIsDue = true;
                        if (riskInterval > 1) {
                            inspectionCount = 1;
                        } else {
                            inspectionCount = riskFrequency;
                        }
                    } else { // There is a previous date we need to start from
                        let nextInspectionDate: Date = getNextInspectionDate(lastRiskInspection, riskFrequency, riskInterval);

                        for (let i = 1; i <= riskFrequency; i++) {
                            //If Next Inspection occurs before fiscal year ends, an inspection is due/overdue
                            if (nextInspectionDate <= plannedFiscalEndDate) {
                                inspectionCount++;
                                inspectionIsDue = true;
                            }
                            nextInspectionDate = getNextInspectionDate(lastRiskInspection, riskFrequency, riskInterval);
                        }
                    }

                    if (inspectionIsDue) {
                        let data = {
                            //data["ts_name"] = `${railOperation.ts_operationnameenglish} | ${VSITDGIncidentType.ts_estimatedduration.msdyn_name} | ${planFiscalYearName}`;
                            "ts_plan@odata.bind": "/ts_plans(" + planId + ")",
                            "ts_stakeholder@odata.bind": "/accounts(" + railOperation._ts_stakeholder_value + ")",
                            "ts_operationtype@odata.bind": "/ovs_operationtypes(" + railOperation._ovs_operationtypeid_value + ")",
                            "ts_site@odata.bind": "/msdyn_functionallocations(" + railOperation._ts_site_value + ")",
                            "ts_operation@odata.bind": "/ovs_operations(" + railOperation.ovs_operationid + ")",
                            "ts_riskthreshold@odata.bind": "/ts_riskcategories(" + railOperation._ts_risk_value + ")",
                            "ts_q1": inspectionCount,
                            "ts_q2": 0,
                            "ts_q3": 0,
                            "ts_q4": 0,
                        }

                        if (railOperation.ts_typeofdangerousgoods == ts_typeofdangerousgoods.Schedule1DangerousGoods || railOperation.ts_typeofdangerousgoods == null) {
                            if (railOperation.ts_visualsecurityinspection == ts_visualsecurityinspection.Yes) {
                                //Both Site Inspection (TDG) and Oversight of the Railway Carrier Visual Security Inspection (TDG) are suggested

                                const VSIData = { ...data };
                                const SiteInspectionData = { ...data };

                                VSIData["ts_activitytype@odata.bind"] = "/msdyn_incidenttypes(34c59aa0-511a-ec11-b6e7-000d3a09ce95)"; //Oversight of the Railway Carrier Visual Security Inspection (TDG)
                                VSIData["ts_estimatedduration"] = VSITDGIncidentType.msdyn_estimatedduration / 60;
                                Xrm.WebApi.createRecord("ts_suggestedinspection", VSIData).then(function success(result) { }, function (error) { console.log(error.message); });

                                SiteInspectionData["ts_activitytype@odata.bind"] = "/msdyn_incidenttypes(2bc59aa0-511a-ec11-b6e7-000d3a09ce95)"; //Site Inspection (TDG)
                                SiteInspectionData["ts_estimatedduration"] = siteInspectionTDGIncidentType.msdyn_estimatedduration / 60;
                                Xrm.WebApi.createRecord("ts_suggestedinspection", SiteInspectionData).then(function success(result) { }, function (error) { console.log(error.message); });
                            } else {
                                const SiteInspectionData = { ...data };

                                //Site Inspection (TDG) Suggested
                                SiteInspectionData["ts_activitytype@odata.bind"] = "/msdyn_incidenttypes(2bc59aa0-511a-ec11-b6e7-000d3a09ce95)"; //Site Inspection (TDG)
                                SiteInspectionData["ts_estimatedduration"] = siteInspectionTDGIncidentType.msdyn_estimatedduration / 60;
                                Xrm.WebApi.createRecord("ts_suggestedinspection", SiteInspectionData).then(function success(result) { }, function (error) { console.log(error.message); });
                            }
                        }
                        else if (railOperation.ts_typeofdangerousgoods == ts_typeofdangerousgoods.NonSchedule1DangerousGoods) {
                            if (railOperation.ts_visualsecurityinspection == ts_visualsecurityinspection.Yes) {
                                //Both Site Inspection for Non-Schedule 1 DG Railway Carriers/Loaders (TDG) and Oversight of the Railway Carrier Visual Security Inspection (TDG) are suggested

                                const VSIData = { ...data };
                                const nonSchedule1Data = { ...data };

                                VSIData["ts_activitytype@odata.bind"] = "/msdyn_incidenttypes(34c59aa0-511a-ec11-b6e7-000d3a09ce95)"; //Oversight of the Railway Carrier Visual Security Inspection (TDG)
                                VSIData["ts_estimatedduration"] = VSITDGIncidentType.msdyn_estimatedduration / 60;
                                Xrm.WebApi.createRecord("ts_suggestedinspection", VSIData).then(function success(result) { }, function (error) { console.log(error.message); });

                                nonSchedule1Data["ts_activitytype@odata.bind"] = "/msdyn_incidenttypes(3ac59aa0-511a-ec11-b6e7-000d3a09ce95)"; //Site Inspection for Non-Schedule 1 DG Railway Carriers/Loaders (TDG)
                                nonSchedule1Data["ts_estimatedduration"] = NonSchedule1TDGIncidentType.msdyn_estimatedduration / 60;
                                Xrm.WebApi.createRecord("ts_suggestedinspection", nonSchedule1Data).then(function success(result) { }, function (error) { console.log(error.message); });
                            } else {
                                //Site Inspection for Non-Schedule 1 DG Railway Carriers/Loaders (TDG)

                                const nonSchedule1Data = { ...data };

                                nonSchedule1Data["ts_activitytype@odata.bind"] = "/msdyn_incidenttypes(3ac59aa0-511a-ec11-b6e7-000d3a09ce95)"; //Site Inspection for Non-Schedule 1 DG Railway Carriers/Loaders (TDG)
                                nonSchedule1Data["ts_estimatedduration"] = NonSchedule1TDGIncidentType.msdyn_estimatedduration / 60;
                                Xrm.WebApi.createRecord("ts_suggestedinspection", nonSchedule1Data).then(function success(result) {},function (error) {console.log(error.message);});
                            }
                        }
                    }
                }
                
            }
            
            //Retrieve all inspector hours records related to the Plan's team
            var inspectorHoursfetchXml = [
                "<fetch>",
                "  <entity name='ts_inspectionhours'>",
                "    <attribute name='ts_totalhoursq1'/>",
                "    <attribute name='ts_totalhoursq2'/>",
                "    <attribute name='ts_totalhoursq3'/>",
                "    <attribute name='ts_totalhoursq4'/>",
                "    <attribute name='ts_inspectionhoursid'/>",
                "    <link-entity name='systemuser' from='systemuserid' to='ts_inspector' alias='user'>",
                "      <attribute name='fullname'/>",
                "    </link-entity>",
                "    <link-entity name='ts_baselinehours' from='ts_baselinehoursid' to='ts_baselinehours'>",
                "      <filter>",
                "        <condition attribute='ts_team' operator='eq' value='", teamId, "' uitype='team'/>",
                "      </filter>",
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
                        "ts_name": inspectorHours["user.fullname"] + " | " + teamName + " | " + planFiscalYearName,
                        "ts_inspectorhours@odata.bind": "/ts_inspectionhourses(" + inspectorHours.ts_inspectionhoursid + ")",
                        "ts_plan@odata.bind": "/ts_plans(" + planId + ")",
                        "ts_remaininghoursq1": inspectorHours.ts_totalhoursq1,
                        "ts_remaininghoursq2": inspectorHours.ts_totalhoursq2,
                        "ts_remaininghoursq3": inspectorHours.ts_totalhoursq3,
                        "ts_remaininghoursq4": inspectorHours.ts_totalhoursq4
                    }
                    Xrm.WebApi.createRecord("ts_planinspectorhours", data);
                }
            }
        }
        formContext.data.entity.save();
        Xrm.Utility.closeProgressIndicator();
    }

    //Used to lock specific fields in editable grids
    export function lockSuggestedInspectionEditableGridFields(executionContext, fields) {
        let formContext = executionContext.getFormContext();
        if (formContext) {
            let entity = formContext.data.entity;
            entity.attributes.forEach(function (attribute, i) {
                if (fields.indexOf(attribute.getName()) > -1) {
                    let attributeToDisable = attribute.controls.get(0);
                    attributeToDisable.setDisabled(true);
                }
            });
        }
    }

    function getNextInspectionDate(startDate, interval, frequency): Date {
        let nextInspectionDate = new Date(startDate);
        const monthsToAdd = 12 * frequency / interval;
        nextInspectionDate.setMonth(nextInspectionDate.getMonth() + monthsToAdd);
        return nextInspectionDate;
    }
}