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
        const planId = formContext.data.entity.getId().slice(1, -1);
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
                return result.entities;
            });
            if (planData == null) {
                console.log("Failed to current Plan");
                return;
            }

            let fiscalQuartersfetchXml = [
                "<fetch>",
                "  <entity name='tc_tcfiscalquarter'>",
                "    <attribute name='tc_fiscalquarternum'/>",
                "    <attribute name='tc_quarterend'/>",
                "    <attribute name='tc_quarterstart'/>",
                "    <link-entity name='tc_tcfiscalyear' from='tc_tcfiscalyearid' to='tc_tcfiscalyearid' alias='quarter'>",
                "      <filter>",
                "        <condition attribute='tc_tcfiscalyearid' operator='eq' value='", planData.tc_tcfiscalyearid, "' uiname='2024-2025' uitype='tc_tcfiscalyear'/>",
                "      </filter>",
                "    </link-entity>",
                "  </entity>",
                "</fetch>"
            ].join("");
            fiscalQuartersfetchXml = "?fetchXml=" + encodeURIComponent(fiscalQuartersfetchXml);
            let fiscalQuarters = await Xrm.WebApi.retrieveMultipleRecords("ts_plan", planfetchXml).then(function success(result) {
                return result.entities;
            });
            if (fiscalQuarters == null) {
                console.log("Failed to retrieve fiscal quarters");
            }

            let q1, q2, q3, q4;
            for (let fiscalQuarter of fiscalQuarters) {
                if (fiscalQuarter.tc_fiscalquarternum == 1) {
                    q1 = fiscalQuarter;
                }
                else if (fiscalQuarter.tc_fiscalquarternum == 2) {
                    q2 = fiscalQuarter;
                }
                else if (fiscalQuarter.tc_fiscalquarternum == 3) {
                    q3 = fiscalQuarter;
                }
                else if (fiscalQuarter.tc_fiscalquarternum == 4) {
                    q4 = fiscalQuarter;
                }
            }

            if (q1 == null || q2 == null || q3 == null || q4 == null) {
                console.log("Error setting Quarters");
                return;
            }

            const teamRegionId = planData["team.ts_territory"];
            const plannedFiscalStartDate = planData["fiscalyear.tc_fiscalstart"];
            const plannedFiscalEndDate = planData["fiscalyear.tc_fiscalend"];

            var railOperationsFetchXml = [
                "<fetch>",
                "  <entity name='ovs_operation'>",
                "    <attribute name='ts_dateoflastriskbasedinspection'/>",
                "    <attribute name='ts_typeofdangerousgoods'/>",
                "    <attribute name='ovs_name'/>",
                "    <attribute name='ovs_operationid'/>",
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
            let railOperations = await Xrm.WebApi.retrieveMultipleRecords("msdyn_incidenttype", railOperationsFetchXml).then(function success(result) {
                return result.entities;
            });

            //Create a suggested inspection for each operation
            for (let railOperation of railOperations) {

                // If ts_typeofdangerousgoods does not equal No DG
                if (railOperation.ts_typeofdangerousgoods != ts_typeofdangerousgoods.NoDangerousGoods) {
                    // If Risk Score recurrence compared with Last Risk Based Inspection puts next inspection within fiscal year
                    const lastRiskInspection: Date = railOperation.ts_dateoflastriskbasedinspection;
                    const riskInterval = railOperation["risk.ts_interval"]; //Cycle Length Years
                    const riskFrequency = railOperation["risk.ts_frequency"]; //Inspections per Cycle
                    let nextInspectionDate: Date = getNextInspectionDate(lastRiskInspection, riskFrequency, riskInterval);
                    let inspectionIsDue = false;

                    let q1Count = 0;
                    let q2Count = 0;
                    let q3Count = 0;
                    let q4Count = 0;

                    for (let i = 1; i <= riskFrequency; i++) {
                        //If Next Inspection occurs before fiscal year ends, an inspection is due/overdue
                        if (nextInspectionDate <= plannedFiscalEndDate) {
                            inspectionIsDue = true;
                            //Determine which quarter the inspection falls in
                            if (nextInspectionDate <= q1.tc_quarterend) {
                                q1Count++;
                            }
                            else if (q2.tc_quarterstart <= nextInspectionDate && nextInspectionDate <= q2.tc_quarterend) {
                                q2Count++;
                            }
                            else if (q3.tc_quarterstart <= nextInspectionDate && nextInspectionDate <= q3.tc_quarterend) {
                                q3Count++;
                            }
                            else if (q4.tc_quarterstart <= nextInspectionDate && nextInspectionDate <= q4.tc_quarterend) {
                                q4Count++;
                            }
                        }
                        nextInspectionDate = getNextInspectionDate(lastRiskInspection, riskFrequency, riskInterval);
                    }

                    if (inspectionIsDue) {
                        let data = {
                            "ts_name": `${railOperation["operation.ts_operationnameenglish"]} | ${railOperation.msdyn_name} | ${planFiscalYearName}`,
                            "ts_plan@odata.bind": "/ts_plans(" + planId + ")",
                            "ts_stakeholder@odata.bind": "/accounts(" + railOperation["operation.ts_stakeholder"] + ")",
                            "ts_operationtype@odata.bind": "/ovs_operationtypes(" + railOperation["operation.ovs_operationtypeid"] + ")",
                            "ts_site@odata.bind": "/msdyn_functionallocations(" + railOperation["operation.ts_site"] + ")",
                            "ts_operation@odata.bind": "/ovs_operations(" + railOperation["operation.ovs_operationid"] + ")",
                            "ts_riskthreshold@odata.bind": "/ts_riskcategories(" + railOperation["operation.ts_risk"] + ")",
                            "ts_estimatedduration": railOperation.msdyn_estimatedduration / 60,
                            "ts_q1": q1Count,
                            "ts_q2": q2Count,
                            "ts_q3": q3Count,
                            "ts_q4": q4Count,
                        }

                        if (railOperation.ts_typeofdangerousgoods == ts_typeofdangerousgoods.Schedule1DangerousGoods || railOperation.ts_typeofdangerousgoods == null) {
                            if (railOperation.ts_visualsecurityinspection == ts_visualsecurityinspection.Yes) {
                                //Both TDG and VSI are suggested
                                data["ts_activitytype@odata.bind"] = "/msdyn_incidenttypes()";
                                Xrm.WebApi.createRecord("ts_suggestedinspection", data).then(
                                    function success(result) {
                                    },
                                    function (error) {
                                        console.log(error.message);
                                    }
                                );

                                data["ts_activitytype@odata.bind"] = "/msdyn_incidenttypes()";
                                Xrm.WebApi.createRecord("ts_suggestedinspection", data).then(
                                    function success(result) {
                                    },
                                    function (error) {
                                        console.log(error.message);
                                    }
                                );
                            } else {
                                //TDG Suggested
                                data["ts_activitytype@odata.bind"] = "/msdyn_incidenttypes()";
                                Xrm.WebApi.createRecord("ts_suggestedinspection", data).then(
                                    function success(result) {
                                    },
                                    function (error) {
                                        console.log(error.message);
                                    }
                                );
                            }
                        }
                        else if (railOperation.ts_typeofdangerousgoods == ts_typeofdangerousgoods.NonSchedule1DangerousGoods) {
                            if (railOperation.ts_visualsecurityinspection == ts_visualsecurityinspection.Yes) {
                                //Both Non-Schedule 1 and VSI are suggested
                                data["ts_activitytype@odata.bind"] = "/msdyn_incidenttypes()";
                                Xrm.WebApi.createRecord("ts_suggestedinspection", data).then(
                                    function success(result) {
                                    },
                                    function (error) {
                                        console.log(error.message);
                                    }
                                );

                                data["ts_activitytype@odata.bind"] = "/msdyn_incidenttypes()";
                                Xrm.WebApi.createRecord("ts_suggestedinspection", data).then(
                                    function success(result) {
                                    },
                                    function (error) {
                                        console.log(error.message);
                                    }
                                );
                            } else {
                                //Non-Schedule 1
                                data["ts_activitytype@odata.bind"] = "/msdyn_incidenttypes()";
                                Xrm.WebApi.createRecord("ts_suggestedinspection", data).then(
                                    function success(result) {
                                    },
                                    function (error) {
                                        console.log(error.message);
                                    }
                                );
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

    function getNextInspectionDate(startDate, frequency, interval): Date {
        let nextInspectionDate = new Date(startDate);
        const monthsToAdd = 12 * frequency / interval;
        nextInspectionDate.setMonth(nextInspectionDate.getMonth() + monthsToAdd);
        return nextInspectionDate;
    }
}