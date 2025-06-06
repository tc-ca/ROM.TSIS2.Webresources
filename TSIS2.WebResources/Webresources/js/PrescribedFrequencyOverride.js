"use strict";
var ROM;
(function (ROM) {
    var PrescribedFrequencyOverride;
    (function (PrescribedFrequencyOverride) {
        function fiscalYearOnChange(eContext) {
            var _a;
            var formContext = eContext.getFormContext();
            // Get the activity type value from the form
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
    })(PrescribedFrequencyOverride = ROM.PrescribedFrequencyOverride || (ROM.PrescribedFrequencyOverride = {}));
})(ROM || (ROM = {}));
