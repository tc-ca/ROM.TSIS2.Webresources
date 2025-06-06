namespace ROM.PrescribedFrequencyOverride {
    export function fiscalYearOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_prescribedfrequencyoverride.Main.Information>eContext.getFormContext();

        // This function is used to retrieve the selected lookup value and set the English and French names based on the selected activity type and fiscal year
        setEnglishandFrenchName(formContext);

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

    export function activityTypeOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_prescribedfrequencyoverride.Main.Information>eContext.getFormContext();

        // This function is used to retrieve the selected lookup value and set the English and French names based on the selected activity type and fiscal year
        setEnglishandFrenchName(formContext);

    }

    // This function is used to retrieve the English and French display names for the selected entity and set the ts_englishname and ts_frenchname fields along with the Fiscal Year
    function setEnglishandFrenchName(formContext: Form.ts_prescribedfrequencyoverride.Main.Information) {

        // get the selection from ts_entityname
        let selectedEntity = formContext.getAttribute("ts_activitytype").getValue();

        // Ensure selectedEntity is not null
        if (selectedEntity === null) return;

        // get the user's language ID
        const userLanguageId = Xrm.Utility.getGlobalContext().userSettings.languageId;

        let fetchXml = "";
        let selectedTable = "";
        let encodedFetchXml = "";

        if (selectedEntity && selectedEntity.length > 0) {

            selectedTable = "msdyn_incidenttype";

            // Fetch the selected activity type record
            fetchXml = `<fetch>
                              <entity name="msdyn_incidenttype">
                                <attribute name="ovs_incidenttypenameenglish" />
                                <attribute name="ovs_incidenttypenamefrench" />
                                <filter>
                                  <condition attribute="msdyn_incidenttypeid" operator="eq" value="${selectedEntity[0].id}" />
                                </filter>
                              </entity>
                            </fetch>`;
        }

        // make sure the fetchXml is not empty
        if (fetchXml === "") return;

        encodedFetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);

        Xrm.WebApi.retrieveMultipleRecords(selectedTable, encodedFetchXml).then(
            function (result) {
                if (result.entities.length > 0) {
                    console.log("Record found");

                    const record = result.entities[0];

                    let displayNameEnglish = "";
                    let displayNameFrench = "";

                    if (selectedEntity) {
                        displayNameEnglish = record["ovs_incidenttypenameenglish"];
                        displayNameFrench = record["ovs_incidenttypenamefrench"];

                    }

                    console.log("Retrieved English display name:", displayNameEnglish);
                    console.log("Retrieved French display name:", displayNameFrench);

                    // Make sure displayNameEnglish is not empty
                    if (displayNameEnglish === "") return;

                    // Get the selected Fiscal Year
                    let fiscalYear = formContext.getAttribute("ts_fiscalyear").getValue();

                    // Ensure fiscalYear is not null
                    if (fiscalYear === null) return;

                    // Get the Fiscal Year
                    fetchXml = `<fetch>
                              <entity name="tc_tcfiscalyear">
                                <attribute name="tc_fiscalyearlonglbl" />
                                <filter>
                                  <condition attribute="tc_tcfiscalyearid" operator="eq" value="${fiscalYear[0].id}" />
                                </filter>
                              </entity>
                            </fetch>`;

                    encodedFetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);

                    Xrm.WebApi.retrieveMultipleRecords("tc_tcfiscalyear", encodedFetchXml).then(
                        function (result) {
                            if (result.entities.length > 0) {
                                console.log("Record found");

                                const record = result.entities[0];

                                let fiscalYear = record["tc_fiscalyearlonglbl"];

                                console.log("Retrieved fiscal year:", fiscalYear);

                                // if the fiscal year is not null
                                if (fiscalYear !== null) {

                                    // Set the English display name
                                    formContext.getAttribute("ts_englishname").setValue(displayNameEnglish + " - " + fiscalYear);

                                    // Set the French display name
                                    formContext.getAttribute("ts_frenchname").setValue(displayNameFrench + " - " + fiscalYear);
                                }

                            } else {
                                console.log("Record not found");
                            }
                        },
                        function (error) {
                            console.error("Error retrieving record:", error.message);
                        }
                    );

                } else {
                    console.log("Record not found");
                }
            },
            function (error) {
                console.error("Error retrieving record:", error.message);
            }
        );
    }
}