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
        if (formContext.ui.getFormType() == Xrm.FormType.Update) {

            // check if ts_prescribedfrequencyoverride is empty
            const prescribedFrequencyOverride = formContext.getAttribute("ts_prescribedfrequencyoverride")?.getValue();

            if (prescribedFrequencyOverride === null || prescribedFrequencyOverride === undefined) {

                // Hide the Prescribed Frequency Override field
                const prescribedFrequencyOverrideControl = formContext.getControl("ts_prescribedfrequencyoverride");

                if (prescribedFrequencyOverrideControl) {
                    prescribedFrequencyOverrideControl.setVisible(false);
                }
            }
        }

        // Check if this is for a Site
        const entityName = formContext.getAttribute("ts_entityname")?.getValue();

        // Check if Site Class is already set
        const siteClass = formContext.getAttribute("ts_siteclass")?.getValue();

        if (entityName === ts_entityrisk_ts_entityname.Site) {

            if (!siteClass) {
                // Get the ID of the Site
                const siteId = formContext.getAttribute("ts_entityid")?.getValue();

                // If the Site ID is not null or undefined
                if (siteId !== null && siteId !== undefined) {

                    // Fetch the Site Class
                    Xrm.WebApi.retrieveRecord("msdyn_functionallocation", siteId, "?$select=ts_class").then(
                        function (siteRecord) {

                            // Set the Site Class
                            const siteClassLabel = siteRecord["ts_class@OData.Community.Display.V1.FormattedValue"];

                            if (siteClassLabel !== null && siteClassLabel !== undefined) {
                                formContext.getAttribute("ts_siteclass").setValue(siteClassLabel);
                            } else {
                                console.log("Site Class is not set for this Site.");
                            }
                        },
                        function (error) {
                            console.error("Error retrieving Site Class:", error.message);
                        }
                    );
                }
            }
        }
        else {

            // If not a Site, hide the Site Class field
            const siteClassControl = formContext.getControl("ts_siteclass");
            if (siteClassControl) {
                siteClassControl.setVisible(false);
            }
        }
    }

    export function onSave(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_entityrisk.Main.Information>eContext.getFormContext();
        console.log("Entering EntityRisk onSave");
    }
    export function fiscalYearOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_entityrisk.Main.Information>eContext.getFormContext();

        const globalContext = Xrm.Utility.getGlobalContext() as any;
        const queryParams = globalContext.getQueryStringParameters();

        // Get values from the form
        let entityId = formContext.getAttribute("ts_entityid")?.getValue();
        let fiscalYear = formContext.getAttribute("ts_fiscalyear").getValue();

        let fiscalYearID = "";

        if (fiscalYear) {
            fiscalYearID = fiscalYear[0].id.toString().replace(/{|}/g, '');
        }


        // Fetch existing records to check for duplicates
        const fetchXml = `
        <fetch>
            <entity name="ts_entityrisk">
                <attribute name="ts_entityriskid" />
                <filter>
                    <condition attribute="ts_entityid" operator="eq" value="${entityId}" />
                    <condition attribute="ts_fiscalyear" operator="eq" value="${fiscalYearID}" />
                </filter>
            </entity>
        </fetch>`;

        const encodedFetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);

        const fiscalYearField = formContext.getControl("ts_fiscalyear");

        // Get the user's language ID
        const userLanguageId = Xrm.Utility.getGlobalContext().userSettings.languageId;

        // Check for existing records
        Xrm.WebApi.retrieveMultipleRecords("ts_entityrisk", encodedFetchXml).then(
            function (result) {
                if (result.entities.length > 0) {

                    // Determine the message based on the user's language
                    const message = (userLanguageId === 1036) // French language code
                        ? "Un Risk Score existe déjà pour cet exercice fiscal." // French message
                        : "A Risk Score already exists for this Fiscal Year."; // English message
                    
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

        // Check if the form is being saved as a new record
        if (formContext.ui.getFormType() === Xrm.FormType.Create) {

            // Get the Fiscal Year Name
            const parentRecordName = queryParams["parentrecordname"];
            const fiscalYear = formContext.getAttribute("ts_fiscalyear")?.getValue();
            const fiscalYearName = fiscalYear && fiscalYear.length > 0 ? fiscalYear[0].name : null;

            // Set the Name
            formContext.getAttribute("ts_name").setValue(parentRecordName + " " + fiscalYearName);

            // Get the selected Entity Name
            const entityName = formContext.getAttribute("ts_entityname")?.getValue();

            // If the Entity Name is Activity Type
            if (entityName === ts_entityrisk_ts_entityname.ActivityType) {

                // Get the Fiscal Year value
                const fiscalYear = formContext.getAttribute("ts_fiscalyear")?.getValue();

                // If Fiscal Year is not null or undefined, get the ID
                const fiscalYearId = fiscalYear && fiscalYear.length > 0 ? fiscalYear[0].id.replace(/[{}]/g, "") : null;

                // Get the Entity ID value
                const entityId = formContext.getAttribute("ts_entityid")?.getValue();

                // If both Fiscal Year and Entity ID are not null 
                if (fiscalYear !== null && fiscalYear !== undefined && entityId !== null && entityId !== undefined) {
                    console.log("Entity Risk created with Fiscal Year and Entity ID.");

                    // Fetch XML for getting the ts_prescribedfrequencyoverrideid
                    const fetchXmlPrescribedFrequencyOverrideId = `
                        <fetch xmlns:generator='MarkMpn.SQL4CDS'>
                          <entity name='ts_prescribedfrequencyoverride'>
                            <attribute name='ts_prescribedfrequencyoverrideid' />
                            <attribute name='ts_name' />
                            <link-entity name='msdyn_incidenttype' to='ts_activitytype' from='msdyn_incidenttypeid' alias='msdyn_incidenttype' link-type='inner'>
                              <filter>
                                <condition attribute='msdyn_incidenttypeid' operator='eq' value='${entityId}' />
                              </filter>
                            </link-entity>
                            <filter>
                              <condition attribute='ts_fiscalyear' operator='eq' value='${fiscalYearId}' />
                            </filter>
                          </entity>
                        </fetch>
                    `;


                    const fetchXmlEncoded = "?fetchXml=" + encodeURIComponent(fetchXmlPrescribedFrequencyOverrideId);

                    // Retrieve the ts_prescribedfrequencyoverrideid
                    Xrm.WebApi.retrieveMultipleRecords("ts_prescribedfrequencyoverride", fetchXmlEncoded).then(
                        function (result) {
                            if (result.entities.length > 0) {

                                // Initialize the variable to store the ID
                                let prescribedFrequencyOverrideId: string = "";

                                // Initialize the variable to store the name
                                let prescribedFrequencyOverrideName: string = "";

                                // Get the first record's ts_prescribedfrequencyoverrideid
                                for (const record of result.entities) {

                                    prescribedFrequencyOverrideId = record["ts_prescribedfrequencyoverrideid"];
                                    prescribedFrequencyOverrideName = record["ts_name"];

                                    console.log("Prescribed Frequency Override ID:", prescribedFrequencyOverrideId);
                                }

                                // Set the Prescribed Frequency Override lookup field
                                let lookup = new Array();

                                lookup[0] = new Object();
                                lookup[0].id = "{" + prescribedFrequencyOverrideId + "}";
                                lookup[0].name = prescribedFrequencyOverrideName;
                                lookup[0].entityType = "ts_prescribedfrequencyoverride";

                                formContext.getAttribute("ts_prescribedfrequencyoverride").setValue(lookup);

                                // Show the Prescribed Frequency Override field
                                const prescribedFrequencyOverrideControl = formContext.getControl("ts_prescribedfrequencyoverride");
                                if (prescribedFrequencyOverrideControl) {
                                    prescribedFrequencyOverrideControl.setVisible(true);
                                    prescribedFrequencyOverrideControl.setDisabled(true); // Disable the field
                                }


                            } else {
                                console.log("No Prescribed Frequency Override ID found.");
                            }
                        },
                        function (error) {
                            console.error("Error retrieving Prescribed Frequency Override ID:", error);
                        }
                    );

                }
                else {
                    console.log("No Prescribed Frequency Override ID found.");

                    // Hide the Prescribed Frequency Override field
                    const prescribedFrequencyOverrideControl = formContext.getControl("ts_prescribedfrequencyoverride");
                    if (prescribedFrequencyOverrideControl) {
                        formContext.getAttribute("ts_prescribedfrequencyoverride").setValue(null);
                        prescribedFrequencyOverrideControl.setVisible(false);
                        prescribedFrequencyOverrideControl.setDisabled(true);
                    }
                }
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

    export function showOperationActivityRiskScore(eContext: Xrm.ExecutionContext<any, any>): void {

        const formContext = eContext.getFormContext() as Form.ts_entityrisk.Main.Information;
        const entityValue = formContext.getAttribute("ts_entityname")?.getValue();

        const activityType = formContext.getControl("ActivityType");
        const operation = formContext.getControl("Operation");
        const operationType = formContext.getControl("OperationType");
        const programArea = formContext.getControl("ProgramArea");
        const site = formContext.getControl("Site");
        const stakeholder = formContext.getControl("Stakeholder");

        // Hide all subgrids initially
        activityType?.setVisible(false);
        operation?.setVisible(false);
        operationType?.setVisible(false);
        programArea?.setVisible(false);
        site?.setVisible(false);
        stakeholder?.setVisible(false);

        if (entityValue === null || entityValue === undefined) {
            return;
        }

        // Show only the relevant subgrid based on the selected choice value
        switch (entityValue) {
            case 741130005: // Activity Type
                activityType?.setVisible(true);
                break;
            case 741130001: // Operation
                operation?.setVisible(true);
                break;
            case 741130002: // Operation Type
                operationType?.setVisible(true);
                break;
            case 741130000: // Program Area
                programArea?.setVisible(true);
                break;
            case 741130003: // Site
                site?.setVisible(true);
                break;
            case 741130004: // Stakeholder
                stakeholder?.setVisible(true);
                break;
            default:
                // Unknown value, do nothing
                break;
        }
    }
}