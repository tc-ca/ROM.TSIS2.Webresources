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

            //TEST CODE (To be replaced with flow logic currently in azure functions
            //Retrieve 20 ISSO Operations to suggest inspections for
            var issoActivitiesFetchXml = [
                "<fetch top='20'>",
                "  <entity name='msdyn_incidenttype'>",
                "    <attribute name='msdyn_incidenttypeid'/>",
                "    <attribute name='msdyn_name'/>",
                "    <attribute name='msdyn_estimatedduration'/>",
                "    <link-entity name='ts_ovs_operationtypes_msdyn_incidenttypes' from='msdyn_incidenttypeid' to='msdyn_incidenttypeid' intersect='true'>",
                "      <link-entity name='ovs_operationtype' from='ovs_operationtypeid' to='ovs_operationtypeid' intersect='true'>",
                "        <link-entity name='ovs_operation' from='ovs_operationtypeid' to='ovs_operationtypeid' alias='operation'>",
                "          <attribute name='ovs_operationtypeid'/>",
                "          <attribute name='ts_site'/>",
                "          <attribute name='ts_stakeholder'/>",
                "          <attribute name='ovs_operationid'/>",
                "          <attribute name='ts_risk'/>",
                "          <attribute name='ts_operationnameenglish'/>",
                "          <attribute name='ts_operationnamefrench'/>",
                "          <link-entity name='businessunit' from='businessunitid' to='owningbusinessunit' alias='businessunit'>",
                "             <filter>",
                "                 <condition attribute='name' operator='begins-with' value='Intermodal'/>",
                "             </filter>",
                "          </link-entity>",
                "          <filter type='and'>",
                "            <condition attribute='ts_stakeholder' operator='not-null'/>",
                "            <condition attribute='ovs_operationtypeid' operator='not-null'/>",
                "            <condition attribute='ts_site' operator='not-null'/>",
                "            <condition attribute='ts_risk' operator='not-null'/>",
                "          </filter>",
                "        </link-entity>",
                "      </link-entity>",
                "    </link-entity>",
                "  </entity>",
                "</fetch>"
            ].join("");
            issoActivitiesFetchXml = "?fetchXml=" + encodeURIComponent(issoActivitiesFetchXml);
            let issoActivities = await Xrm.WebApi.retrieveMultipleRecords("msdyn_incidenttype", issoActivitiesFetchXml).then(function success(result) {
                return result.entities;
            });

            //Create a suggested inspection for each operation
            for (let activity of issoActivities) {
                let data = {
                    "ts_name": `${activity["operation.ts_operationnameenglish"]} | ${activity.msdyn_name} | ${planFiscalYearName}`,
                    "ts_plan@odata.bind": "/ts_plans(" + planId + ")",
                    "ts_stakeholder@odata.bind": "/accounts(" + activity["operation.ts_stakeholder"] + ")",
                    "ts_operationtype@odata.bind": "/ovs_operationtypes(" + activity["operation.ovs_operationtypeid"] + ")",
                    "ts_site@odata.bind": "/msdyn_functionallocations(" + activity["operation.ts_site"] + ")",
                    "ts_activitytype@odata.bind": "/msdyn_incidenttypes(" + activity.msdyn_incidenttypeid + ")",
                    "ts_operation@odata.bind": "/ovs_operations(" + activity["operation.ovs_operationid"] + ")",
                    "ts_riskthreshold@odata.bind": "/ts_riskcategories(" + activity["operation.ts_risk"] + ")",
                    "ts_estimatedduration": activity.msdyn_estimatedduration / 60,
                    "ts_q1": 1,
                    "ts_q2": 0,
                    "ts_q3": 0,
                    "ts_q4": 0,
                }
                Xrm.WebApi.createRecord("ts_suggestedinspection", data).then(
                    function success(result) {
                    },
                    function (error) {
                        console.log(error.message);
                    }
                );
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

    function TDGComprehensiveSuggestedInspections(formContext) {

        //Retrieve all Operations of Operation Type "Railway Carrier", "Railway Loader", and "HQ - TDG"

        //Foreach Operation

            // If Security Plan Type equals Corporate Security Plan

                // If Operation Type does not equal HQ - TDG

                    // If Operation ts_typeofdangerousgoods equals null or Schedule 1 DG

                        // If Last SPR Inspection was over 4 years ago, add SPR to activities list

                        // If Last Comprehensive inspection was over 4 years ago, add comprehensive to activities list

            // Elif Security Plan Type equals Site Security Plan

                // If Operation ts_typeofdangerousgoods equals null or Schedule 1 DG

                        // If Last Inspection was over 4 years ago, add SPR to activities list
    }
}