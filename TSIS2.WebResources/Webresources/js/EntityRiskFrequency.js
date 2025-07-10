"use strict";
var ROM;
(function (ROM) {
    var EntityRiskFrequency;
    (function (EntityRiskFrequency) {
        function onLoad(eContext) {
            var formContext = eContext.getFormContext();
            console.log("Entering onLoad");
            formContext.getControl("ts_generateduniquekey").setVisible(false);
            // Filter the Fiscal Year lookup column
            setFiscalYearFilteredView(formContext);
            // if we are on a new form
            if (formContext.ui.getFormType() == 1) {
                // hide all the entity lookups
                formContext.getControl("ts_activitytype").setVisible(false);
                formContext.getControl("ts_operation").setVisible(false);
                formContext.getControl("ts_operationtype").setVisible(false);
                formContext.getControl("ts_programarea").setVisible(false);
                formContext.getControl("ts_site").setVisible(false);
                formContext.getControl("ts_stakeholder").setVisible(false);
            }
            // if we are on an existing form
            if (formContext.ui.getFormType() == 2) {
                if (formContext.getAttribute("ts_activitytype").getValue() === null) {
                    formContext.getControl("ts_activitytype").setVisible(false);
                }
                if (formContext.getAttribute("ts_operation").getValue() === null) {
                    formContext.getControl("ts_operation").setVisible(false);
                }
                if (formContext.getAttribute("ts_operationtype").getValue() === null) {
                    formContext.getControl("ts_operationtype").setVisible(false);
                }
                if (formContext.getAttribute("ts_programarea").getValue() === null) {
                    formContext.getControl("ts_programarea").setVisible(false);
                }
                if (formContext.getAttribute("ts_site").getValue() === null) {
                    formContext.getControl("ts_site").setVisible(false);
                }
                if (formContext.getAttribute("ts_stakeholder").getValue() === null) {
                    formContext.getControl("ts_stakeholder").setVisible(false);
                }
            }
        }
        EntityRiskFrequency.onLoad = onLoad;
        function onSave(eContext) {
            var formContext = eContext.getFormContext();
            console.log("Entering onSave");
        }
        EntityRiskFrequency.onSave = onSave;
        function fiscalYearOnChange(eContext) {
            var formContext = eContext.getFormContext();
            getSelectedLookupValue(formContext, eContext);
            setEnglishandFrenchName(formContext);
        }
        EntityRiskFrequency.fiscalYearOnChange = fiscalYearOnChange;
        function riskFrequencyOnChange(eContext) {
            var formContext = eContext.getFormContext();
            getSelectedLookupValue(formContext, eContext);
        }
        EntityRiskFrequency.riskFrequencyOnChange = riskFrequencyOnChange;
        function entityNameOnChange(eContext) {
            var formContext = eContext.getFormContext();
            // Get values from the form
            var selectedEntity = formContext.getAttribute("ts_entityname").getValue();
            // Ensure selectedEntity is not null
            if (selectedEntity === null)
                return;
            // Show the specific lookup based on the entity selected
            formContext.getAttribute("ts_activitytype").setValue(null);
            formContext.getAttribute("ts_operation").setValue(null);
            formContext.getAttribute("ts_operationtype").setValue(null);
            formContext.getAttribute("ts_programarea").setValue(null);
            formContext.getAttribute("ts_site").setValue(null);
            formContext.getAttribute("ts_stakeholder").setValue(null);
            formContext.getAttribute("ts_activitytype").setRequiredLevel("none");
            formContext.getAttribute("ts_operation").setRequiredLevel("none");
            formContext.getAttribute("ts_operationtype").setRequiredLevel("none");
            formContext.getAttribute("ts_programarea").setRequiredLevel("none");
            formContext.getAttribute("ts_site").setRequiredLevel("none");
            formContext.getAttribute("ts_stakeholder").setRequiredLevel("none");
            switch (selectedEntity) {
                case 741130000:
                    console.log("Activity Type selected");
                    formContext.getAttribute("ts_activitytype").setRequiredLevel("required");
                    formContext.getControl("ts_activitytype").setVisible(true);
                    formContext.getControl("ts_operation").setVisible(false);
                    formContext.getControl("ts_operationtype").setVisible(false);
                    formContext.getControl("ts_programarea").setVisible(false);
                    formContext.getControl("ts_site").setVisible(false);
                    formContext.getControl("ts_stakeholder").setVisible(false);
                    break;
                case 741130001:
                    console.log("Operation selected");
                    formContext.getAttribute("ts_operation").setRequiredLevel("required");
                    formContext.getControl("ts_activitytype").setVisible(false);
                    formContext.getControl("ts_operation").setVisible(true);
                    formContext.getControl("ts_operationtype").setVisible(false);
                    formContext.getControl("ts_programarea").setVisible(false);
                    formContext.getControl("ts_site").setVisible(false);
                    formContext.getControl("ts_stakeholder").setVisible(false);
                    break;
                case 741130002:
                    console.log("Operation Type selected");
                    formContext.getAttribute("ts_operationtype").setRequiredLevel("required");
                    formContext.getControl("ts_activitytype").setVisible(false);
                    formContext.getControl("ts_operation").setVisible(false);
                    formContext.getControl("ts_operationtype").setVisible(true);
                    formContext.getControl("ts_programarea").setVisible(false);
                    formContext.getControl("ts_site").setVisible(false);
                    formContext.getControl("ts_stakeholder").setVisible(false);
                    break;
                case 741130003:
                    console.log("Program Area selected");
                    formContext.getAttribute("ts_programarea").setRequiredLevel("required");
                    formContext.getControl("ts_activitytype").setVisible(false);
                    formContext.getControl("ts_operation").setVisible(false);
                    formContext.getControl("ts_operationtype").setVisible(false);
                    formContext.getControl("ts_programarea").setVisible(true);
                    formContext.getControl("ts_site").setVisible(false);
                    formContext.getControl("ts_stakeholder").setVisible(false);
                    break;
                case 741130004:
                    console.log("Site selected");
                    formContext.getAttribute("ts_site").setRequiredLevel("required");
                    formContext.getControl("ts_activitytype").setVisible(false);
                    formContext.getControl("ts_operation").setVisible(false);
                    formContext.getControl("ts_operationtype").setVisible(false);
                    formContext.getControl("ts_programarea").setVisible(false);
                    formContext.getControl("ts_site").setVisible(true);
                    formContext.getControl("ts_stakeholder").setVisible(false);
                    break;
                case 741130005:
                    console.log("Stakeholder selected");
                    formContext.getAttribute("ts_stakeholder").setRequiredLevel("required");
                    formContext.getControl("ts_activitytype").setVisible(false);
                    formContext.getControl("ts_operation").setVisible(false);
                    formContext.getControl("ts_operationtype").setVisible(false);
                    formContext.getControl("ts_programarea").setVisible(false);
                    formContext.getControl("ts_site").setVisible(false);
                    formContext.getControl("ts_stakeholder").setVisible(true);
                    break;
                default:
                    console.log("Entity Name drop down selection - Unknown selection");
                    // Optional: Handle cases where the selection is not recognized
                    break;
            }
        }
        EntityRiskFrequency.entityNameOnChange = entityNameOnChange;
        // This function is called when the value of the Activity Type, Operation, Operation Type, Program Area, Site, or Stakeholder lookup fields change
        function entityOnChange(eContext) {
            var formContext = eContext.getFormContext();
            getSelectedLookupValue(formContext, eContext);
            setEnglishandFrenchName(formContext);
        }
        EntityRiskFrequency.entityOnChange = entityOnChange;
        function setFiscalYearFilteredView(formContext) {
            var viewId = '{350B79C5-0A0E-42B2-8FF7-7F63B7E9628B}';
            var entityName = "tc_tcfiscalyear";
            var viewDisplayName = "Filtered Fiscal Year";
            var today = new Date();
            var yearsAgo = today.getFullYear() - 2;
            var yearsFromNow = today.getFullYear() + 5;
            var fetchXml = "<fetch version=\"1.0\" mapping=\"logical\" distinct=\"true\" returntotalrecordcount=\"true\" page=\"1\" count=\"25\" no-lock=\"false\">\n                            <entity name=\"tc_tcfiscalyear\">\n                              <attribute name=\"tc_tcfiscalyearid\" />\n                              <attribute name=\"tc_name\" />\n                              <order attribute=\"tc_fiscalyearnum\" descending=\"false\" />\n                              <filter>\n                                <condition attribute=\"tc_fiscalyearnum\" operator=\"ge\" value=\"".concat(yearsAgo, "\" />\n                                <condition attribute=\"tc_fiscalyearnum\" operator=\"le\" value=\"").concat(yearsFromNow, "\" />\n                              </filter>\n                            </entity>\n                          </fetch>");
            var layoutXml = '<grid name="resultset" object="10010" jump="tc_name" select="1" icon="1" preview="1"><row name="result" id="tc_tcfiscalyearid"><cell name="tc_name" width="200" /></row></grid>';
            formContext.getControl("ts_fiscalyear").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
        }
        function getSelectedLookupValue(formContext, eContext) {
            // Get the attribute that triggered the event
            var eventSource = eContext.getEventSource();
            // Ensure eventSource is not null
            if (!eventSource) {
                console.error("Event source is null");
                return;
            }
            // Get the selected lookup
            var fieldName = eventSource.getName();
            // if this is being called from the onChange event of the fiscal year or risk frequency fields
            if (fieldName === "ts_fiscalyear" || fieldName === "ts_riskfrequency") {
                var activityType = formContext.getAttribute("ts_activitytype").getValue();
                var operation = formContext.getAttribute("ts_operation").getValue();
                var operationType = formContext.getAttribute("ts_operationtype").getValue();
                var programArea = formContext.getAttribute("ts_programarea").getValue();
                var site = formContext.getAttribute("ts_site").getValue();
                var stakeholder = formContext.getAttribute("ts_stakeholder").getValue();
                if (activityType != null) {
                    fieldName = "ts_activitytype";
                }
                else if (operation != null) {
                    fieldName = "ts_operation";
                }
                else if (operationType != null) {
                    fieldName = "ts_operationtype";
                }
                else if (programArea != null) {
                    fieldName = "ts_programarea";
                }
                else if (site != null) {
                    fieldName = "ts_site";
                }
                else if (stakeholder != null) {
                    fieldName = "ts_stakeholder";
                }
                else {
                    fieldName = null;
                }
            }
            checkGeneratedUniqueKey(formContext, fieldName);
        }
        // This function is used to retrieve the English and French display names for the selected entity and set the ts_englishname and ts_frenchname fields along with the Fiscal Year
        function setEnglishandFrenchName(formContext) {
            // get the selection from ts_entityname
            var selectedEntity = formContext.getAttribute("ts_entityname").getValue();
            // Ensure selectedEntity is not null
            if (selectedEntity === null)
                return;
            // get the user's language ID
            var userLanguageId = Xrm.Utility.getGlobalContext().userSettings.languageId;
            var fetchXml = "";
            var selectedTable = "";
            var encodedFetchXml = "";
            switch (selectedEntity) {
                case 741130000:
                    console.log("Activity Type selected");
                    // get the selected value of ts_activitytype
                    var activityType = formContext.getAttribute("ts_activitytype").getValue();
                    // Ensure activityType is not null
                    if (activityType === null)
                        return;
                    selectedTable = "msdyn_incidenttype";
                    // Fetch the selected activity type record
                    fetchXml = "<fetch>\n                              <entity name=\"msdyn_incidenttype\">\n                                <attribute name=\"ovs_incidenttypenameenglish\" />\n                                <attribute name=\"ovs_incidenttypenamefrench\" />\n                                <filter>\n                                  <condition attribute=\"msdyn_incidenttypeid\" operator=\"eq\" value=\"".concat(activityType[0].id, "\" />\n                                </filter>\n                              </entity>\n                            </fetch>");
                    break;
                case 741130001:
                    console.log("Operation selected");
                    // get the selected value of ts_operation
                    var operation = formContext.getAttribute("ts_operation").getValue();
                    // Ensure operation is not null
                    if (operation === null)
                        return;
                    selectedTable = "ovs_operation";
                    // Fetch the selected operation record
                    fetchXml = "<fetch>\n                              <entity name=\"ovs_operation\">\n                                <attribute name=\"ovs_name\" />\n                                <filter>\n                                  <condition attribute=\"ovs_operationid\" operator=\"eq\" value=\"".concat(operation[0].id, "\" />\n                                </filter>\n                              </entity>\n                            </fetch>");
                    break;
                case 741130002:
                    console.log("Operation Type selected");
                    // get the selected value of ts_operationtype
                    var operationType = formContext.getAttribute("ts_operationtype").getValue();
                    // Ensure operationType is not null
                    if (operationType === null)
                        return;
                    selectedTable = "ovs_operationtype";
                    // Fetch the selected operationtype record
                    fetchXml = "<fetch>\n                              <entity name=\"ovs_operationtype\">\n                                <attribute name=\"ovs_operationtypenameenglish\" />\n                                <attribute name=\"ovs_operationtypenamefrench\" />\n                                <filter>\n                                  <condition attribute=\"ovs_operationtypeid\" operator=\"eq\" value=\"".concat(operationType[0].id, "\" />\n                                </filter>\n                              </entity>\n                            </fetch>");
                    break;
                case 741130003:
                    console.log("Program Area selected");
                    // get the selected value of ts_programarea
                    var programArea = formContext.getAttribute("ts_programarea").getValue();
                    // Ensure programArea is not null
                    if (programArea === null)
                        return;
                    selectedTable = "ts_programarea";
                    // Fetch the selected Program Area record
                    fetchXml = "<fetch>\n                              <entity name=\"ts_programarea\">\n                                <attribute name=\"ts_programareaen\" />\n                                <attribute name=\"ts_programareafr\" />\n                                <filter>\n                                  <condition attribute=\"ts_programareaid\" operator=\"eq\" value=\"".concat(programArea[0].id, "\" />\n                                </filter>\n                              </entity>\n                            </fetch>");
                    break;
                case 741130004:
                    console.log("Site selected");
                    // get the selected value of ts_site
                    var site = formContext.getAttribute("ts_site").getValue();
                    // Ensure site is not null
                    if (site === null)
                        return;
                    selectedTable = "msdyn_functionallocation";
                    // Fetch the selected site record
                    fetchXml = "<fetch>\n                              <entity name=\"msdyn_functionallocation\">\n                                <attribute name=\"msdyn_name\" />\n                                <filter>\n                                  <condition attribute=\"msdyn_functionallocationid\" operator=\"eq\" value=\"".concat(site[0].id, "\" />\n                                </filter>\n                              </entity>\n                            </fetch>");
                    break;
                case 741130005:
                    console.log("Stakeholder selected");
                    // get the selected value of ts_stakeholder
                    var stakeholder = formContext.getAttribute("ts_stakeholder").getValue();
                    // Ensure stakeholder is not null
                    if (stakeholder === null)
                        return;
                    selectedTable = "account";
                    // Fetch the selected site record
                    fetchXml = "<fetch>\n                              <entity name=\"account\">\n                                <attribute name=\"name\" />\n                                <filter>\n                                  <condition attribute=\"accountid\" operator=\"eq\" value=\"".concat(stakeholder[0].id, "\" />\n                                </filter>\n                              </entity>\n                            </fetch>");
                    break;
                default:
                    console.log("Entity Name drop down selection - Unknown selection");
                    // Optional: Handle cases where the selection is not recognized
                    break;
            }
            // make sure the fetchXml is not empty
            if (fetchXml === "")
                return;
            encodedFetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
            Xrm.WebApi.retrieveMultipleRecords(selectedTable, encodedFetchXml).then(function (result) {
                if (result.entities.length > 0) {
                    console.log("Record found");
                    var record = result.entities[0];
                    var displayNameEnglish_1 = "";
                    var displayNameFrench_1 = "";
                    switch (selectedEntity) {
                        case 741130000: // Activity Type
                            displayNameEnglish_1 = record["ovs_incidenttypenameenglish"];
                            displayNameFrench_1 = record["ovs_incidenttypenamefrench"];
                            break;
                        case 741130001: // Operation
                            displayNameEnglish_1 = record["ovs_name"];
                            displayNameFrench_1 = record["ovs_name"];
                            break;
                        case 741130002: // Operation Type
                            displayNameEnglish_1 = record["ovs_operationtypenameenglish"];
                            displayNameFrench_1 = record["ovs_operationtypenamefrench"];
                            break;
                        case 741130003: // Program Area
                            displayNameEnglish_1 = record["ts_programareaen"];
                            displayNameFrench_1 = record["ts_programareafr"];
                            break;
                        case 741130004: // Site
                            displayNameEnglish_1 = record["msdyn_name"];
                            displayNameFrench_1 = record["msdyn_name"];
                            break;
                        case 741130005: // Stakeholder
                            displayNameEnglish_1 = record["name"];
                            displayNameFrench_1 = record["name"];
                            break;
                    }
                    console.log("Retrieved English display name:", displayNameEnglish_1);
                    console.log("Retrieved French display name:", displayNameFrench_1);
                    // Make sure displayNameEnglish is not empty
                    if (displayNameEnglish_1 === "")
                        return;
                    // Get the selected Fiscal Year
                    var fiscalYear = formContext.getAttribute("ts_fiscalyear").getValue();
                    // Ensure fiscalYear is not null
                    if (fiscalYear === null)
                        return;
                    // Get the Fiscal Year
                    fetchXml = "<fetch>\n                              <entity name=\"tc_tcfiscalyear\">\n                                <attribute name=\"tc_fiscalyearlonglbl\" />\n                                <filter>\n                                  <condition attribute=\"tc_tcfiscalyearid\" operator=\"eq\" value=\"".concat(fiscalYear[0].id, "\" />\n                                </filter>\n                              </entity>\n                            </fetch>");
                    encodedFetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
                    Xrm.WebApi.retrieveMultipleRecords("tc_tcfiscalyear", encodedFetchXml).then(function (result) {
                        if (result.entities.length > 0) {
                            console.log("Record found");
                            var record_1 = result.entities[0];
                            var fiscalYear_1 = record_1["tc_fiscalyearlonglbl"];
                            console.log("Retrieved fiscal year:", fiscalYear_1);
                            // if the fiscal year is not null
                            if (fiscalYear_1 !== null) {
                                // Set the English display name
                                formContext.getAttribute("ts_englishname").setValue(displayNameEnglish_1 + " - " + fiscalYear_1);
                                // Set the French display name
                                formContext.getAttribute("ts_frenchname").setValue(displayNameFrench_1 + " - " + fiscalYear_1);
                            }
                        }
                        else {
                            console.log("Record not found");
                        }
                    }, function (error) {
                        console.error("Error retrieving record:", error.message);
                    });
                }
                else {
                    console.log("Record not found");
                }
            }, function (error) {
                console.error("Error retrieving record:", error.message);
            });
        }
        function checkGeneratedUniqueKey(formContext, fieldName) {
            var generatedUniqueKey = "";
            var fiscalYear = formContext.getAttribute("ts_fiscalyear").getValue();
            // Ensure fiscalYear and entityName are not null
            if (fiscalYear === null || fieldName === null)
                return;
            var fiscalYearName = fiscalYear[0].name;
            var entityGuid = "";
            switch (fieldName) {
                case "ts_activitytype":
                    console.log("Activity Type selected");
                    var activityType = formContext.getAttribute("ts_activitytype").getValue();
                    if (activityType != null) {
                        entityGuid = activityType[0].id;
                    }
                    break;
                case "ts_operation":
                    console.log("Operation selected");
                    var operation = formContext.getAttribute("ts_operation").getValue();
                    if (operation != null) {
                        entityGuid = operation[0].id;
                    }
                    break;
                case "ts_operationtype":
                    console.log("Operation Type selected");
                    var operationType = formContext.getAttribute("ts_operationtype").getValue();
                    if (operationType != null) {
                        entityGuid = operationType[0].id;
                    }
                    break;
                case "ts_programarea":
                    console.log("Program Area selected");
                    var programArea = formContext.getAttribute("ts_programarea").getValue();
                    if (programArea != null) {
                        entityGuid = programArea[0].id;
                    }
                    break;
                case "ts_site":
                    console.log("Site selected");
                    var site = formContext.getAttribute("ts_site").getValue();
                    if (site != null) {
                        entityGuid = site[0].id;
                    }
                    break;
                case "ts_stakeholder":
                    console.log("Stakeholder selected");
                    var stakeholder = formContext.getAttribute("ts_stakeholder").getValue();
                    if (stakeholder != null) {
                        entityGuid = stakeholder[0].id;
                    }
                    break;
                default:
                    console.log("FieldName - Unknown selection");
                    // Optional: Handle cases where the selection is not recognized
                    break;
            }
            // Generate the unique key
            generatedUniqueKey = fiscalYearName + ":" + entityGuid;
            formContext.getAttribute("ts_generateduniquekey").setValue(generatedUniqueKey);
            // Fetch existing records to check for duplicates
            var fetchXml = "\n        <fetch>\n          <entity name=\"ts_entityriskfrequency\">\n            <attribute name=\"ts_generateduniquekey\" />\n            <filter>\n              <condition attribute=\"ts_generateduniquekey\" operator=\"eq\" value=\"".concat(generatedUniqueKey, "\" />\n            </filter>\n          </entity>\n        </fetch>");
            var encodedFetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
            // Get the user's language ID
            var userLanguageId = Xrm.Utility.getGlobalContext().userSettings.languageId;
            var fiscalYearField = formContext.getControl("ts_fiscalyear");
            // Check for existing records
            Xrm.WebApi.retrieveMultipleRecords("ts_entityriskfrequency", encodedFetchXml).then(function (result) {
                if (result.entities.length > 0) {
                    // Determine the message based on the user's language
                    var message = (userLanguageId === 1036) // French language code
                        ? "Une fréquence de risque existe déjà pour cet exercice financier." // French message
                        : "A Risk Frequency already exists for this Fiscal Year."; // English message
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
    })(EntityRiskFrequency = ROM.EntityRiskFrequency || (ROM.EntityRiskFrequency = {}));
})(ROM || (ROM = {}));
