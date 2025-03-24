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

    export function entityOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_entityriskfrequency.Main.Information>eContext.getFormContext();

        getSelectedLookupValue(formContext, eContext);
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