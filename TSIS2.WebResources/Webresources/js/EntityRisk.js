"use strict";
var ROM;
(function (ROM) {
    var EntityRisk;
    (function (EntityRisk) {
        function onLoad(eContext) {
            var formContext = eContext.getFormContext();
            console.log("Entering EntityRisk onLoad");
            // if we are on the new form
            if (formContext.ui.getFormType() == 1) {
                var globalContext = Xrm.Utility.getGlobalContext();
                var queryParams = globalContext.getQueryStringParameters();
                // Extract the id and record type of the parent form this is calling from
                var parentRecordId = queryParams["parentrecordid"];
                var parentRecordType = queryParams["parentrecordtype"];
                var parentRecordName = queryParams["parentrecordname"];
                if (parentRecordType != null && parentRecordId != null && parentRecordName != null) {
                    // Set the Entity Name choice
                    switch (parentRecordType) {
                        case "account":
                            formContext.getAttribute("ts_entityname").setValue(741130004 /* Stakeholder */);
                            break;
                        case "msdyn_functionallocation":
                            formContext.getAttribute("ts_entityname").setValue(741130003 /* Site */);
                            break;
                        case "ovs_operationtype":
                            formContext.getAttribute("ts_entityname").setValue(741130002 /* OperationType */);
                            break;
                        case "ovs_operation":
                            formContext.getAttribute("ts_entityname").setValue(741130001 /* Operation */);
                            break;
                        case "msdyn_incidenttype":
                            formContext.getAttribute("ts_entityname").setValue(741130005 /* ActivityType */);
                            break;
                        case "ts_programarea":
                            formContext.getAttribute("ts_entityname").setValue(741130000 /* ProgramArea */);
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
        EntityRisk.onLoad = onLoad;
        function onSave(eContext) {
            var formContext = eContext.getFormContext();
            console.log("Entering EntityRisk onSave");
        }
        EntityRisk.onSave = onSave;
        function riskRatingOnChange(eContext) {
            var form = eContext.getFormContext();
            // Get the selected Risk Rating attribute
            var riskRating = form.getAttribute("ts_riskrating");
            var riskRatingScore = 0;
            var riskRatingWeight = 0;
            if (riskRating != null) {
                var riskRatingAttributeValue = riskRating.getValue();
                if (riskRatingAttributeValue != null && riskRatingAttributeValue.length > 0) {
                    var riskRatingID = riskRatingAttributeValue[0].id; // Retrieve the first selected value
                    // Retrieve the ts_riskscore value from the ts_riskrating record
                    Xrm.WebApi.retrieveRecord("ts_riskrating", riskRatingID, "?$select=ts_riskscore,ts_riskweight")
                        .then(function success(riskRatingRecord) {
                        var riskScore = riskRatingRecord.ts_riskscore;
                        var riskWeight = riskRatingRecord.ts_riskweight;
                        // If the ts_riskscore is not null, update the form field
                        if (riskScore !== null) {
                            riskRatingScore = riskScore;
                            // Populate the ts_riskscore field if it's currently null or empty
                            var riskScoreAttribute = form.getAttribute("ts_riskscore");
                            if (riskScoreAttribute && (riskScoreAttribute.getValue() === null || riskScoreAttribute.getValue() === 0)) {
                                riskScoreAttribute.setValue(riskRatingScore);
                            }
                        }
                        // If the ts_riskweight is not null, update the form field
                        if (riskWeight !== null) {
                            riskRatingWeight = riskWeight;
                            // Populate the ts_riskweight field if it's currently null or empty
                            var riskWeightAttribute = form.getAttribute("ts_weightedriskscore");
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
        EntityRisk.riskRatingOnChange = riskRatingOnChange;
        function riskScoreOnChange(eContext) {
            var form = eContext.getFormContext();
            // Get the entered Risk Score attribute
            var riskScore = form.getAttribute("ts_riskscore");
            if (riskScore != null) {
                var riskScoreAttributeValue_1 = riskScore.getValue();
                if (riskScoreAttributeValue_1 != null) {
                    // Define FetchXML to get all risk ranges
                    var getRiskRatingIdFetchXML = "\n                <fetch xmlns:generator='MarkMpn.SQL4CDS'>\n                  <entity name='ts_riskrating'>\n                    <attribute name='ts_riskratingid' />\n                    <attribute name='ts_name' />\n                    <link-entity name='ts_riskrange' to='ts_riskrange' from='ts_riskrangeid' alias='ts_riskRange' link-type='inner'>\n                      <attribute name='ts_minscore' />\n                      <attribute name='ts_maxscore' />\n                    </link-entity>\n                  </entity>\n                </fetch>";
                    var fetchXmlEncoded = "?fetchXml=" + encodeURIComponent(getRiskRatingIdFetchXML);
                    Xrm.WebApi.retrieveMultipleRecords("ts_riskrating", fetchXmlEncoded).then(function (result) {
                        if (result.entities.length > 0) {
                            var riskScoreNumber = Number(riskScoreAttributeValue_1);
                            // Go through all the risk ratings to find a match
                            var matchingRiskRatingID = null;
                            var matchingRiskRatingName = null;
                            var roundedRiskScore = Math.floor(riskScoreAttributeValue_1);
                            for (var _i = 0, _a = result.entities; _i < _a.length; _i++) {
                                var record = _a[_i];
                                // Fetch and convert the scores to numbers
                                var minScore = Number(record["ts_riskRange.ts_minscore"]);
                                var maxScore = Number(record["ts_riskRange.ts_maxscore"]);
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
                            }
                            else {
                                console.warn("No matching risk rating found for score:", roundedRiskScore);
                                form.getAttribute("ts_riskrating").setValue(null); // Clear the lookup if no match
                            }
                        }
                        else {
                            console.log("No risk ratings found in the system.");
                        }
                    }, function (error) {
                        console.error("Error retrieving risk rating:", error);
                    });
                }
            }
        }
        EntityRisk.riskScoreOnChange = riskScoreOnChange;
        function setFiscalYearFilteredView(formContext) {
            var viewId = '{350B79C5-0A0E-42B2-8FF7-7F83B7E9628B}';
            var entityName = "tc_tcfiscalyear";
            var viewDisplayName = "Filtered Fiscal Year";
            var today = new Date();
            var yearsAgo = today.getFullYear() - 2;
            var yearsFromNow = today.getFullYear() + 5;
            var fetchXml = "<fetch version=\"1.0\" mapping=\"logical\" distinct=\"true\" returntotalrecordcount=\"true\" page=\"1\" count=\"25\" no-lock=\"false\">\n                            <entity name=\"tc_tcfiscalyear\">\n                              <attribute name=\"tc_tcfiscalyearid\" />\n                              <attribute name=\"tc_name\" />\n                              <order attribute=\"tc_fiscalyearnum\" descending=\"false\" />\n                              <filter>\n                                <condition attribute=\"tc_fiscalyearnum\" operator=\"ge\" value=\"" + yearsAgo + "\" />\n                                <condition attribute=\"tc_fiscalyearnum\" operator=\"le\" value=\"" + yearsFromNow + "\" />\n                              </filter>\n                            </entity>\n                          </fetch>";
            var layoutXml = '<grid name="resultset" object="10010" jump="tc_name" select="1" icon="1" preview="1"><row name="result" id="tc_tcfiscalyearid"><cell name="tc_name" width="200" /></row></grid>';
            formContext.getControl("ts_fiscalyear").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
        }
    })(EntityRisk = ROM.EntityRisk || (ROM.EntityRisk = {}));
})(ROM || (ROM = {}));
