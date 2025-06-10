"use strict";
var ROM;
(function (ROM) {
    var PrescribedFrequencyOverride;
    (function (PrescribedFrequencyOverride) {
        function fiscalYearOnChange(eContext) {
            var _a;
            var formContext = eContext.getFormContext();
            // This function is used to retrieve the selected lookup value and set the English and French names based on the selected activity type and fiscal year
            setEnglishandFrenchName(formContext);
            // Get values from the form
            var activityTypeLookup = (_a = formContext.getAttribute("ts_activitytype")) === null || _a === void 0 ? void 0 : _a.getValue();
            var activityTypeId = "";
            if (activityTypeLookup && activityTypeLookup.length > 0) {
                activityTypeId = activityTypeLookup[0].id.toString().replace(/{|}/g, '');
                console.log("Parent Incident Type ID:", activityTypeId);
            }
            else {
                console.warn("Incident Type is not set.");
            }
            var fiscalYear = formContext.getAttribute("ts_fiscalyear").getValue();
            var fiscalYearID = "";
            if (fiscalYear) {
                fiscalYearID = fiscalYear[0].id.toString().replace(/{|}/g, '');
                console.log("Fiscal Year ID:", fiscalYearID);
            }
            else {
                console.warn("Fiscal Year is not set.");
            }
            // Fetch existing records to check for duplicates
            var fetchXml = "\n        <fetch>\n            <entity name=\"ts_prescribedfrequencyoverride\">\n                <attribute name=\"ts_activitytype\" />\n                <filter>\n                    <condition attribute=\"ts_activitytype\" operator=\"eq\" value=\"" + activityTypeId + "\" />\n                    <condition attribute=\"ts_fiscalyear\" operator=\"eq\" value=\"" + fiscalYearID + "\" />\n                </filter>\n            </entity>\n        </fetch>";
            var encodedFetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
            var fiscalYearField = formContext.getControl("ts_fiscalyear");
            // Get the user's language ID
            var userLanguageId = Xrm.Utility.getGlobalContext().userSettings.languageId;
            // Check for existing records
            Xrm.WebApi.retrieveMultipleRecords("ts_prescribedfrequencyoverride", encodedFetchXml).then(function (result) {
                if (result.entities.length > 0) {
                    // Determine the message based on the user's language
                    var message = (userLanguageId === 1036) // French language code
                        ? "Une fréquence prescrite existe déjà pour cet exercice financier." // French message
                        : "A prescribed frequency already exists for this fiscal year."; // English message
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
        PrescribedFrequencyOverride.fiscalYearOnChange = fiscalYearOnChange;
        function classSelection(eContext) {
            var _a;
            var formContext = eContext.getFormContext();
            var classSelection = ((_a = formContext.getAttribute("ts_prescribedfrequencyclassselection")) === null || _a === void 0 ? void 0 : _a.getValue()) || [];
            console.log("Selected Class:", classSelection);
            // Map class codes to their corresponding fields
            var classMappings = {
                741130001: 'ts_riskfrequency',
                741130002: 'ts_prescribedfrequencyclass2',
                741130003: 'ts_prescribedfrequencyclass3'
            };
            // Loop through all possible class codes
            Object.entries(classMappings).forEach(function (_a) {
                var _b, _c, _d, _e, _f;
                var codeStr = _a[0], fieldName = _a[1];
                var code = parseInt(codeStr, 10);
                var control = formContext.getControl(fieldName);
                var attribute = formContext.getAttribute(fieldName);
                if (classSelection.includes(code)) {
                    (_b = control) === null || _b === void 0 ? void 0 : _b.setVisible(true);
                    (_c = attribute) === null || _c === void 0 ? void 0 : _c.setRequiredLevel("required");
                }
                else {
                    // Clear the field, hide it, and remove requirement
                    (_d = attribute) === null || _d === void 0 ? void 0 : _d.setValue(null);
                    (_e = control) === null || _e === void 0 ? void 0 : _e.setVisible(false);
                    (_f = attribute) === null || _f === void 0 ? void 0 : _f.setRequiredLevel("none");
                }
            });
        }
        PrescribedFrequencyOverride.classSelection = classSelection;
        // This function is used to retrieve the English and French display names for the selected entity and set the ts_englishname and ts_frenchname fields along with the Fiscal Year
        function setEnglishandFrenchName(formContext) {
            // get the selection from ts_entityname
            var selectedEntity = formContext.getAttribute("ts_activitytype").getValue();
            // Ensure selectedEntity is not null
            if (selectedEntity === null)
                return;
            // get the user's language ID
            var userLanguageId = Xrm.Utility.getGlobalContext().userSettings.languageId;
            var fetchXml = "";
            var selectedTable = "";
            var encodedFetchXml = "";
            if (selectedEntity && selectedEntity.length > 0) {
                selectedTable = "msdyn_incidenttype";
                // Fetch the selected activity type record
                fetchXml = "<fetch>\n                              <entity name=\"msdyn_incidenttype\">\n                                <attribute name=\"ovs_incidenttypenameenglish\" />\n                                <attribute name=\"ovs_incidenttypenamefrench\" />\n                                <filter>\n                                  <condition attribute=\"msdyn_incidenttypeid\" operator=\"eq\" value=\"" + selectedEntity[0].id + "\" />\n                                </filter>\n                              </entity>\n                            </fetch>";
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
                    if (selectedEntity) {
                        displayNameEnglish_1 = record["ovs_incidenttypenameenglish"];
                        displayNameFrench_1 = record["ovs_incidenttypenamefrench"];
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
                    fetchXml = "<fetch>\n                              <entity name=\"tc_tcfiscalyear\">\n                                <attribute name=\"tc_fiscalyearlonglbl\" />\n                                <filter>\n                                  <condition attribute=\"tc_tcfiscalyearid\" operator=\"eq\" value=\"" + fiscalYear[0].id + "\" />\n                                </filter>\n                              </entity>\n                            </fetch>";
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
    })(PrescribedFrequencyOverride = ROM.PrescribedFrequencyOverride || (ROM.PrescribedFrequencyOverride = {}));
})(ROM || (ROM = {}));
