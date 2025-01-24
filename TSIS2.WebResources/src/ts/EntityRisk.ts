namespace ROM.EntityRisk {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_entityrisk.Main.Information>eContext.getFormContext();
        console.log("Entering EntityRisk onLoad");

        // if we are on the new form
        if (formContext.ui.getFormType() == 1) {
            const globalContext = Xrm.Utility.getGlobalContext() as any;
            const queryParams = globalContext.getQueryStringParameters();

            // Extract the id and record type of the parent form this is calling from
            const parentRecordId = queryParams["parentrecordid"];
            const parentRecordType = queryParams["parentrecordtype"];
            const parentRecordName = queryParams["parentrecordname"];

            if (parentRecordType != null && parentRecordId != null && parentRecordName != null) {

                // Set the Entity Name choice
                switch (parentRecordType) {
                    case "account":
                        formContext.getAttribute("ts_entityname").setValue(ts_entityrisk_ts_entityname.Stakeholder);
                        break;
                    case "msdyn_functionallocation":
                        formContext.getAttribute("ts_entityname").setValue(ts_entityrisk_ts_entityname.Site);
                        break;
                    case "ovs_operationtype":
                        formContext.getAttribute("ts_entityname").setValue(ts_entityrisk_ts_entityname.OperationType);
                        break;
                    case "ovs_operation":
                        formContext.getAttribute("ts_entityname").setValue(ts_entityrisk_ts_entityname.Operation);
                        break;
                    case "msdyn_incidenttype":
                        formContext.getAttribute("ts_entityname").setValue(ts_entityrisk_ts_entityname.ActivityType);
                        break;
                    case "ts_programarea":
                        formContext.getAttribute("ts_entityname").setValue(ts_entityrisk_ts_entityname.ProgramArea);
                        break;
                    default:
                        console.log("Unknown Parent Record Type");
                        formContext.getAttribute("ts_entityname").setValue(null);
                        break;
                }

                // Set the Entity ID
                formContext.getAttribute("ts_entityid").setValue(parentRecordId);

                // Set the Name
                formContext.getAttribute("ts_name").setValue(parentRecordName);
            }
            else {
                console.log("ERROR unable to retrieve any parent record information");

                // These are read-only or hidden fields on the form.  If we can't get any parent record information then the record can't be created since they are required.
                formContext.getAttribute("ts_entityname").setValue(null);
                formContext.getAttribute("ts_entityid").setValue(parentRecordId);
                formContext.getAttribute("ts_name").setValue(parentRecordName);
            }

            // Filter the lookup column
            setFiscalYearFilteredView(formContext);
        }
    }

    export function onSave(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_entityrisk.Main.Information>eContext.getFormContext();
        console.log("Entering EntityRisk onSave");
    }

    export function riskRatingOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_entityrisk.Main.Information>eContext.getFormContext();

        // Get the selected Risk Rating attribute
        const riskRating = form.getAttribute("ts_riskrating");
        let riskRatingScore = 0;
        let riskRatingWeight = 0;

        if (riskRating != null) {
            const riskRatingAttributeValue = riskRating.getValue();
            if (riskRatingAttributeValue != null && riskRatingAttributeValue.length > 0) {
                const riskRatingID = riskRatingAttributeValue[0].id; // Retrieve the first selected value

                // Retrieve the ts_riskscore value from the ts_riskrating record
                Xrm.WebApi.retrieveRecord("ts_riskrating", riskRatingID, "?$select=ts_riskscore,ts_riskweight")
                    .then(function success(riskRatingRecord) {
                        const riskScore = riskRatingRecord.ts_riskscore;
                        const riskWeight = riskRatingRecord.ts_riskweight;

                        // If the ts_riskscore is not null, update the form field
                        if (riskScore !== null) {
                            riskRatingScore = riskScore;

                            // Populate the ts_riskscore field if it's currently null or empty
                            const riskScoreAttribute = form.getAttribute("ts_riskscore");
                            if (riskScoreAttribute && (riskScoreAttribute.getValue() === null || riskScoreAttribute.getValue() === 0)) {
                                riskScoreAttribute.setValue(riskRatingScore);
                            }
                        }

                        // If the ts_riskweight is not null, update the form field
                        if (riskWeight !== null) {
                            riskRatingWeight = riskWeight;

                            // Populate the ts_riskweight field if it's currently null or empty
                            const riskWeightAttribute = form.getAttribute("ts_weightedriskscore");
                            if (riskWeightAttribute && (riskWeightAttribute.getValue() === null || riskWeightAttribute.getValue() === 0)) {
                                riskWeightAttribute.setValue(riskRatingWeight);
                            }
                        }

                    })
                    .catch(function error(err) {
                        console.error("Error retrieving ts_riskrating record:", err.message);
                    });
            }
        }
    }

    export function riskScoreOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_entityrisk.Main.Information>eContext.getFormContext();

        // Get the entered Risk Score attribute
        const riskScore = form.getAttribute("ts_riskscore");

        if (riskScore != null) {
            const riskScoreAttributeValue = riskScore.getValue();

            if (riskScoreAttributeValue != null) {
                // Define FetchXML to get all risk ranges
                let getRiskRatingIdFetchXML = `
                <fetch xmlns:generator='MarkMpn.SQL4CDS'>
                  <entity name='ts_riskrating'>
                    <attribute name='ts_riskratingid' />
                    <attribute name='ts_name' />
                    <link-entity name='ts_riskrange' to='ts_riskrange' from='ts_riskrangeid' alias='ts_riskRange' link-type='inner'>
                      <attribute name='ts_minscore' />
                      <attribute name='ts_maxscore' />
                    </link-entity>
                  </entity>
                </fetch>`;

                const fetchXmlEncoded = "?fetchXml=" + encodeURIComponent(getRiskRatingIdFetchXML);

                Xrm.WebApi.retrieveMultipleRecords("ts_riskrating", fetchXmlEncoded).then(
                    function (result) {
                        if (result.entities.length > 0) {

                            let riskScoreNumber = Number(riskScoreAttributeValue);

                            // Go through all the risk ratings to find a match
                            let matchingRiskRatingID = null; 
                            let matchingRiskRatingName = null;

                            const roundedRiskScore = Math.floor(riskScoreAttributeValue);

                            for (const record of result.entities) {
                                // Fetch and convert the scores to numbers
                                const minScore = Number(record["ts_riskRange.ts_minscore"]);
                                const maxScore = Number(record["ts_riskRange.ts_maxscore"]);

                                console.log("Evaluating record:");
                                console.log("Risk Rating:", record.ts_name, "minScore:", minScore, "maxScore:", maxScore);

                                // Check if the rounded risk score is within the range
                                if (minScore <= roundedRiskScore && maxScore >= roundedRiskScore) {
                                    matchingRiskRatingID = record.ts_riskratingid;
                                    matchingRiskRatingName = record.ts_name;
                                    break; // Stop iterating once a match is found
                                }
                            }

                            // Handle the matching record
                            if (matchingRiskRatingID) {

                                console.log("Matching Risk Rating Found:", matchingRiskRatingName);

                                // Set the lookup field value
                                form.getAttribute("ts_riskrating").setValue([
                                    {
                                        id: matchingRiskRatingID,
                                        name: matchingRiskRatingName,
                                        entityType: "ts_riskrating",
                                    },
                                ]);
                            } else {
                                console.warn("No matching risk rating found for score:", roundedRiskScore);
                                form.getAttribute("ts_riskrating").setValue(null); // Clear the lookup if no match
                            }
                        } else {
                            console.log("No risk ratings found in the system.");
                        }
                    },
                    function (error) {
                        console.error("Error retrieving risk rating:", error);
                    }
                );
            }
        }
    }
    function setFiscalYearFilteredView(formContext: Form.ts_entityrisk.Main.Information) {
        const viewId = '{350B79C5-0A0E-42B2-8FF7-7F83B7E9628B}';
        const entityName = "tc_tcfiscalyear";
        const viewDisplayName = "Filtered Fiscal Year";

        const today = new Date();
        const yearsAgo = today.getFullYear() - 2;
        const yearsFromNow = today.getFullYear() + 5;

        const fetchXml = `<fetch version="1.0" mapping="logical" distinct="true" returntotalrecordcount="true" page="1" count="25" no-lock="false">
                            <entity name="tc_tcfiscalyear">
                              <attribute name="tc_tcfiscalyearid" />
                              <attribute name="tc_name" />
                              <order attribute="tc_fiscalyearnum" descending="false" />
                              <filter>
                                <condition attribute="tc_fiscalyearnum" operator="ge" value="${yearsAgo}" />
                                <condition attribute="tc_fiscalyearnum" operator="le" value="${yearsFromNow}" />
                              </filter>
                            </entity>
                          </fetch>`;

        const layoutXml = '<grid name="resultset" object="10010" jump="tc_name" select="1" icon="1" preview="1"><row name="result" id="tc_tcfiscalyearid"><cell name="tc_name" width="200" /></row></grid>';

        formContext.getControl("ts_fiscalyear").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
    }
}