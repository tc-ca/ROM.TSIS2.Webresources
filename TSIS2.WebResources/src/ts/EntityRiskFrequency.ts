namespace ROM.EntityRiskFrequency {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_entityriskfrequency.Main.Information>eContext.getFormContext();
        console.log("Entering onLoad");

        formContext.getControl("ts_generateduniquekey").setVisible(false);

        // Filter the Fiscal Year lookup column
        setFiscalYearFilteredView(formContext);

        // if we are on a new form
        if (formContext.ui.getFormType() ==1) {

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

    export function onSave(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_entityriskfrequency.Main.Information>eContext.getFormContext();

        console.log("Entering onSave");
    }

    export function fiscalYearOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_entityriskfrequency.Main.Information>eContext.getFormContext();

        getSelectedLookupValue(formContext, eContext);

        setEnglishandFrenchName(formContext);
    }

    export function riskFrequencyOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_entityriskfrequency.Main.Information>eContext.getFormContext();

        getSelectedLookupValue(formContext, eContext);
    }

    export function entityNameOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_entityriskfrequency.Main.Information>eContext.getFormContext();

        // Get values from the form
        let selectedEntity = formContext.getAttribute("ts_entityname").getValue();

        // Ensure selectedEntity is not null
        if (selectedEntity === null) return;

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

    // This function is called when the value of the Activity Type, Operation, Operation Type, Program Area, Site, or Stakeholder lookup fields change
    export function entityOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_entityriskfrequency.Main.Information>eContext.getFormContext();

        getSelectedLookupValue(formContext, eContext);

        setEnglishandFrenchName(formContext);
    }

    function setFiscalYearFilteredView(formContext: Form.ts_entityriskfrequency.Main.Information) {
        const viewId = '{350B79C5-0A0E-42B2-8FF7-7F63B7E9628B}';
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

    function getSelectedLookupValue(formContext: Form.ts_entityriskfrequency.Main.Information, eContext: Xrm.ExecutionContext<any, any>) {

        // Get the attribute that triggered the event
        const eventSource = eContext.getEventSource();

        // Ensure eventSource is not null
        if (!eventSource) {
            console.error("Event source is null");
            return;
        }

        // Get the selected lookup
        let fieldName = eventSource.getName();

        // if this is being called from the onChange event of the fiscal year or risk frequency fields
        if (fieldName === "ts_fiscalyear" || fieldName === "ts_riskfrequency" ) {
            let activityType = formContext.getAttribute("ts_activitytype").getValue();
            let operation = formContext.getAttribute("ts_operation").getValue();
            let operationType = formContext.getAttribute("ts_operationtype").getValue();
            let programArea = formContext.getAttribute("ts_programarea").getValue();
            let site = formContext.getAttribute("ts_site").getValue();
            let stakeholder = formContext.getAttribute("ts_stakeholder").getValue();

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
    function setEnglishandFrenchName(formContext: Form.ts_entityriskfrequency.Main.Information) {

        // get the selection from ts_entityname
        let selectedEntity = formContext.getAttribute("ts_entityname").getValue();

        // Ensure selectedEntity is not null
        if (selectedEntity === null) return;

        // get the user's language ID
        const userLanguageId = Xrm.Utility.getGlobalContext().userSettings.languageId;

        let fetchXml = "";
        let selectedTable = "";
        let encodedFetchXml = "";

        switch (selectedEntity) {
            case 741130000:
                console.log("Activity Type selected");

                // get the selected value of ts_activitytype
                let activityType = formContext.getAttribute("ts_activitytype").getValue();

                // Ensure activityType is not null
                if (activityType === null) return;

                selectedTable = "msdyn_incidenttype";

                // Fetch the selected activity type record
                fetchXml = `<fetch>
                              <entity name="msdyn_incidenttype">
                                <attribute name="ovs_incidenttypenameenglish" />
                                <attribute name="ovs_incidenttypenamefrench" />
                                <filter>
                                  <condition attribute="msdyn_incidenttypeid" operator="eq" value="${activityType[0].id}" />
                                </filter>
                              </entity>
                            </fetch>`;

                break;

            case 741130001:
                console.log("Operation selected");

                // get the selected value of ts_operation
                let operation = formContext.getAttribute("ts_operation").getValue();

                // Ensure operation is not null
                if (operation === null) return;

                selectedTable = "ovs_operation";

                // Fetch the selected operation record
                fetchXml = `<fetch>
                              <entity name="ovs_operation">
                                <attribute name="ovs_name" />
                                <filter>
                                  <condition attribute="ovs_operationid" operator="eq" value="${operation[0].id}" />
                                </filter>
                              </entity>
                            </fetch>`;

                break;

            case 741130002:
                console.log("Operation Type selected");

                // get the selected value of ts_operationtype
                let operationType = formContext.getAttribute("ts_operationtype").getValue();

                // Ensure operationType is not null
                if (operationType === null) return;

                selectedTable = "ovs_operationtype";

                // Fetch the selected operationtype record
                fetchXml = `<fetch>
                              <entity name="ovs_operationtype">
                                <attribute name="ovs_operationtypenameenglish" />
                                <attribute name="ovs_operationtypenamefrench" />
                                <filter>
                                  <condition attribute="ovs_operationtypeid" operator="eq" value="${operationType[0].id}" />
                                </filter>
                              </entity>
                            </fetch>`;

                break;

            case 741130003:
                console.log("Program Area selected");

                // get the selected value of ts_programarea
                let programArea = formContext.getAttribute("ts_programarea").getValue();

                // Ensure programArea is not null
                if (programArea === null) return;

                selectedTable = "ts_programarea";

                // Fetch the selected Program Area record
                fetchXml = `<fetch>
                              <entity name="ts_programarea">
                                <attribute name="ts_programareaen" />
                                <attribute name="ts_programareafr" />
                                <filter>
                                  <condition attribute="ts_programareaid" operator="eq" value="${programArea[0].id}" />
                                </filter>
                              </entity>
                            </fetch>`;

                break;

            case 741130004:
                console.log("Site selected");

                // get the selected value of ts_site
                let site = formContext.getAttribute("ts_site").getValue();

                // Ensure site is not null
                if (site === null) return;

                selectedTable = "msdyn_functionallocation";

                // Fetch the selected site record
                fetchXml = `<fetch>
                              <entity name="msdyn_functionallocation">
                                <attribute name="msdyn_name" />
                                <filter>
                                  <condition attribute="msdyn_functionallocationid" operator="eq" value="${site[0].id}" />
                                </filter>
                              </entity>
                            </fetch>`;

                break;

            case 741130005:
                console.log("Stakeholder selected");

                // get the selected value of ts_stakeholder
                let stakeholder = formContext.getAttribute("ts_stakeholder").getValue();

                // Ensure stakeholder is not null
                if (stakeholder === null) return;

                selectedTable = "account";

                // Fetch the selected site record
                fetchXml = `<fetch>
                              <entity name="account">
                                <attribute name="name" />
                                <filter>
                                  <condition attribute="accountid" operator="eq" value="${stakeholder[0].id}" />
                                </filter>
                              </entity>
                            </fetch>`;

                break;

            default:
                console.log("Entity Name drop down selection - Unknown selection");
                // Optional: Handle cases where the selection is not recognized
                break;

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

                    switch (selectedEntity) {
                        case 741130000: // Activity Type
                            displayNameEnglish = record["ovs_incidenttypenameenglish"];
                            displayNameFrench = record["ovs_incidenttypenamefrench"];
                            break;
                        case 741130001: // Operation
                            displayNameEnglish = record["ovs_name"];
                            displayNameFrench = record["ovs_name"];
                            break;
                        case 741130002: // Operation Type
                            displayNameEnglish = record["ovs_operationtypenameenglish"];
                            displayNameFrench = record["ovs_operationtypenamefrench"];
                            break;
                        case 741130003: // Program Area
                            displayNameEnglish = record["ts_programareaen"];
                            displayNameFrench = record["ts_programareafr"];
                            break;
                        case 741130004: // Site
                            displayNameEnglish = record["msdyn_name"];
                            displayNameFrench = record["msdyn_name"];
                            break;
                        case 741130005: // Stakeholder
                            displayNameEnglish = record["name"];
                            displayNameFrench = record["name"];
                            break;
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
    function checkGeneratedUniqueKey(formContext: Form.ts_entityriskfrequency.Main.Information,fieldName: string) {

        let generatedUniqueKey = "";
        let fiscalYear = formContext.getAttribute("ts_fiscalyear").getValue();

        // Ensure fiscalYear and entityName are not null
        if (fiscalYear === null || fieldName === null) return;

        let fiscalYearName = fiscalYear[0].name;
        let entityGuid = "";

        switch (fieldName) {
            case "ts_activitytype":
                console.log("Activity Type selected");

                let activityType = formContext.getAttribute("ts_activitytype").getValue();

                if (activityType != null) {
                    entityGuid = activityType[0].id;
                }

                break;

            case "ts_operation":
                console.log("Operation selected");

                let operation = formContext.getAttribute("ts_operation").getValue();

                if (operation != null) {
                    entityGuid = operation[0].id;
                }

                break;

            case "ts_operationtype":
                console.log("Operation Type selected");

                let operationType = formContext.getAttribute("ts_operationtype").getValue();

                if (operationType != null) {
                    entityGuid = operationType[0].id;
                }

                break;

            case "ts_programarea":
                console.log("Program Area selected");

                let programArea = formContext.getAttribute("ts_programarea").getValue();

                if (programArea != null) {
                    entityGuid = programArea[0].id;
                }

                break;

            case "ts_site":
                console.log("Site selected");

                let site = formContext.getAttribute("ts_site").getValue();

                if (site != null) {
                    entityGuid = site[0].id;
                }

                break;

            case "ts_stakeholder":
                console.log("Stakeholder selected");

                let stakeholder = formContext.getAttribute("ts_stakeholder").getValue();

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
        const fetchXml = `
        <fetch>
          <entity name="ts_entityriskfrequency">
            <attribute name="ts_generateduniquekey" />
            <filter>
              <condition attribute="ts_generateduniquekey" operator="eq" value="${generatedUniqueKey}" />
            </filter>
          </entity>
        </fetch>`;

        const encodedFetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);

        // Get the user's language ID
        const userLanguageId = Xrm.Utility.getGlobalContext().userSettings.languageId;

        const fiscalYearField = formContext.getControl("ts_fiscalyear");

        // Check for existing records
        Xrm.WebApi.retrieveMultipleRecords("ts_entityriskfrequency", encodedFetchXml).then(
            function (result) {
                if (result.entities.length > 0) {

                    // Determine the message based on the user's language
                    const message = (userLanguageId === 1036) // French language code
                        ? "Une fréquence de risque existe déjà pour cet exercice financier." // French message
                        : "A Risk Frequency already exists for this Fiscal Year."; // English message

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