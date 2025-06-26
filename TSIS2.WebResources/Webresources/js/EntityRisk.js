"use strict";
var ROM;
(function (ROM) {
    var EntityRisk;
    (function (EntityRisk) {
        function onLoad(eContext) {
            var _a;
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
            // Check if we are in the edit form
            if (formContext.ui.getFormType() == 2 /* Update */) {
                // check if ts_prescribedfrequencyoverride is empty
                var prescribedFrequencyOverride = (_a = formContext.getAttribute("ts_prescribedfrequencyoverride")) === null || _a === void 0 ? void 0 : _a.getValue();
                if (prescribedFrequencyOverride === null || prescribedFrequencyOverride === undefined) {
                    // Hide the Prescribed Frequency Override field
                    var prescribedFrequencyOverrideControl = formContext.getControl("ts_prescribedfrequencyoverride");
                    if (prescribedFrequencyOverrideControl) {
                        prescribedFrequencyOverrideControl.setVisible(false);
                    }
                }
            }
        }
        EntityRisk.onLoad = onLoad;
        function onSave(eContext) {
            var _a, _b, _c;
            var formContext = eContext.getFormContext();
            console.log("Entering EntityRisk onSave");
            // Check if the form is being saved as a new record
            if (formContext.ui.getFormType() === 1 /* Create */) {
                // Get the selected Entity Name
                var entityName = (_a = formContext.getAttribute("ts_entityname")) === null || _a === void 0 ? void 0 : _a.getValue();
                // If the Entity Name is Activity Type
                if (entityName === 741130005 /* ActivityType */) {
                    // Get the Fiscal Year value
                    var fiscalYear = (_b = formContext.getAttribute("ts_fiscalyear")) === null || _b === void 0 ? void 0 : _b.getValue();
                    // Get the Entity ID value
                    var entityId = (_c = formContext.getAttribute("ts_entityid")) === null || _c === void 0 ? void 0 : _c.getValue();
                    // If both Fiscal Year and Entity ID are not null 
                    if (fiscalYear !== null && fiscalYear !== undefined && entityId !== null && entityId !== undefined) {
                        console.log("Entity Risk created with Fiscal Year and Entity ID.");
                    }
                }
            }
        }
        EntityRisk.onSave = onSave;
        /*
        //Risk Rating removed from Entity Risk form
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
        */
        function fiscalYearOnChange(eContext) {
            var _a;
            var formContext = eContext.getFormContext();
            // Get values from the form
            var entityId = (_a = formContext.getAttribute("ts_entityid")) === null || _a === void 0 ? void 0 : _a.getValue();
            var fiscalYear = formContext.getAttribute("ts_fiscalyear").getValue();
            var fiscalYearID = "";
            if (fiscalYear) {
                fiscalYearID = fiscalYear[0].id.toString().replace(/{|}/g, '');
            }
            // Fetch existing records to check for duplicates
            var fetchXml = "\n        <fetch>\n            <entity name=\"ts_entityrisk\">\n                <attribute name=\"ts_entityriskid\" />\n                <filter>\n                    <condition attribute=\"ts_entityid\" operator=\"eq\" value=\"" + entityId + "\" />\n                    <condition attribute=\"ts_fiscalyear\" operator=\"eq\" value=\"" + fiscalYearID + "\" />\n                </filter>\n            </entity>\n        </fetch>";
            var encodedFetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
            var fiscalYearField = formContext.getControl("ts_fiscalyear");
            // Get the user's language ID
            var userLanguageId = Xrm.Utility.getGlobalContext().userSettings.languageId;
            // Check for existing records
            Xrm.WebApi.retrieveMultipleRecords("ts_entityrisk", encodedFetchXml).then(function (result) {
                if (result.entities.length > 0) {
                    // Determine the message based on the user's language
                    var message = (userLanguageId === 1036) // French language code
                        ? "Un Risk Score existe déjà pour cet exercice fiscal." // French message
                        : "A Risk Score already exists for this Fiscal Year."; // English message
                    if (fiscalYearField) {
                        fiscalYearField.setFocus(); // Moves the cursor focus to the ts_fiscalyear field
                        fiscalYearField.setNotification(message, "ERROR");
                    }
                }
                else {
                    if (fiscalYearField) {
                        // If no duplicate found, clear the existing notification (if any)
                        fiscalYearField.clearNotification();
                    }
                    console.log("No duplicates found.");
                }
            }, function (error) {
                console.error("Error validating uniqueness:", error.message);
            });
        }
        EntityRisk.fiscalYearOnChange = fiscalYearOnChange;
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
        function showOperationActivityRiskScore(eContext) {
            var _a;
            var formContext = eContext.getFormContext();
            var entityValue = (_a = formContext.getAttribute("ts_entityname")) === null || _a === void 0 ? void 0 : _a.getValue();
            var activityType = formContext.getControl("ActivityType");
            var operation = formContext.getControl("Operation");
            var operationType = formContext.getControl("OperationType");
            var programArea = formContext.getControl("ProgramArea");
            var site = formContext.getControl("Site");
            var stakeholder = formContext.getControl("Stakeholder");
            // Hide all subgrids initially
            activityType === null || activityType === void 0 ? void 0 : activityType.setVisible(false);
            operation === null || operation === void 0 ? void 0 : operation.setVisible(false);
            operationType === null || operationType === void 0 ? void 0 : operationType.setVisible(false);
            programArea === null || programArea === void 0 ? void 0 : programArea.setVisible(false);
            site === null || site === void 0 ? void 0 : site.setVisible(false);
            stakeholder === null || stakeholder === void 0 ? void 0 : stakeholder.setVisible(false);
            if (entityValue === null || entityValue === undefined) {
                return;
            }
            // Show only the relevant subgrid based on the selected choice value
            switch (entityValue) {
                case 741130005: // Activity Type
                    activityType === null || activityType === void 0 ? void 0 : activityType.setVisible(true);
                    break;
                case 741130001: // Operation
                    operation === null || operation === void 0 ? void 0 : operation.setVisible(true);
                    break;
                case 741130002: // Operation Type
                    operationType === null || operationType === void 0 ? void 0 : operationType.setVisible(true);
                    break;
                case 741130000: // Program Area
                    programArea === null || programArea === void 0 ? void 0 : programArea.setVisible(true);
                    break;
                case 741130003: // Site
                    site === null || site === void 0 ? void 0 : site.setVisible(true);
                    break;
                case 741130004: // Stakeholder
                    stakeholder === null || stakeholder === void 0 ? void 0 : stakeholder.setVisible(true);
                    break;
                default:
                    // Unknown value, do nothing
                    break;
            }
        }
        EntityRisk.showOperationActivityRiskScore = showOperationActivityRiskScore;
    })(EntityRisk = ROM.EntityRisk || (ROM.EntityRisk = {}));
})(ROM || (ROM = {}));
