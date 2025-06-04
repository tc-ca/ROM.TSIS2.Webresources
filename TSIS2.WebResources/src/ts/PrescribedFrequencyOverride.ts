namespace ROM.PrescribedFrequencyOverride {
    export function fiscalYearOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_prescribedfrequencyoverride.Main.Information>eContext.getFormContext();

        // Get values from the form
        const activityTypeLookup = formContext.getAttribute("ts_activitytype")?.getValue();
        let activityTypeId = "";

        if (activityTypeLookup && activityTypeLookup.length > 0) {
            activityTypeId = activityTypeLookup[0].id.toString().replace(/{|}/g, '');
            console.log("Parent Incident Type ID:", activityTypeId);
        } else {
            console.warn("Incident Type is not set.");
        }

        let fiscalYear = formContext.getAttribute("ts_fiscalyear").getValue();

        let fiscalYearID = "";

        if (fiscalYear) {
            fiscalYearID = fiscalYear[0].id.toString().replace(/{|}/g, '');
            console.log("Fiscal Year ID:", fiscalYearID);
        } else {
            console.warn("Fiscal Year is not set.");
        }

        

        // Fetch existing records to check for duplicates
        const fetchXml = `
        <fetch>
            <entity name="ts_prescribedfrequencyoverride">
                <attribute name="ts_activitytype" />
                <filter>
                    <condition attribute="ts_activitytype" operator="eq" value="${activityTypeId}" />
                    <condition attribute="ts_fiscalyear" operator="eq" value="${fiscalYearID}" />
                </filter>
            </entity>
        </fetch>`;

        const encodedFetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);

        const fiscalYearField = formContext.getControl("ts_fiscalyear");

        // Get the user's language ID
        const userLanguageId = Xrm.Utility.getGlobalContext().userSettings.languageId;

        // Check for existing records
        Xrm.WebApi.retrieveMultipleRecords("ts_prescribedfrequencyoverride", encodedFetchXml).then(
            function (result) {
                if (result.entities.length > 0) {

                    // Determine the message based on the user's language
                    const message = (userLanguageId === 1036) // French language code
                        ? "Une fréquence prescrite existe déjà pour cet exercice financier." // French message
                        : "A prescribed frequency already exists for this fiscal year."; // English message

                    if (fiscalYearField) {
                        fiscalYearField.setFocus(); // Moves the cursor focus to the ts_fiscalyear field
                        fiscalYearField.setNotification(message, "ERROR");
                    }

                } else {

                    if (fiscalYearField) {

                        // If no duplicate found, clear the existing notification (if any)
                        fiscalYearField.clearNotification();
                    }

                    console.log("No duplicates found.");
                }
            },
            function (error) {
                console.error("Error validating uniqueness:", error.message);
            }
        );


    }
}