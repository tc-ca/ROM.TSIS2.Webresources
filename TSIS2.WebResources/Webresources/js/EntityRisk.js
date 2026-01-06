"use strict";
var ROM;
(function (ROM) {
    var EntityRisk;
    (function (EntityRisk) {
        function onLoad(eContext) {
            var _a, _b, _c, _d;
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
            if (formContext.ui.getFormType() == 2 /* Xrm.FormType.Update */) {
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
            // Check if this is for a Site
            var entityName = (_b = formContext.getAttribute("ts_entityname")) === null || _b === void 0 ? void 0 : _b.getValue();
            // Check if Site Class is already set
            var siteClass = (_c = formContext.getAttribute("ts_siteclass")) === null || _c === void 0 ? void 0 : _c.getValue();
            if (entityName === ts_entityrisk_ts_entityname.Site) {
                if (!siteClass) {
                    // Get the ID of the Site
                    var siteId = (_d = formContext.getAttribute("ts_entityid")) === null || _d === void 0 ? void 0 : _d.getValue();
                    // If the Site ID is not null or undefined
                    if (siteId !== null && siteId !== undefined) {
                        // Fetch the Site Class
                        Xrm.WebApi.retrieveRecord("msdyn_functionallocation", siteId, "?$select=ts_class").then(function (siteRecord) {
                            // Set the Site Class
                            var siteClassLabel = siteRecord["ts_class@OData.Community.Display.V1.FormattedValue"];
                            if (siteClassLabel !== null && siteClassLabel !== undefined) {
                                formContext.getAttribute("ts_siteclass").setValue(siteClassLabel);
                            }
                            else {
                                console.log("Site Class is not set for this Site.");
                            }
                        }, function (error) {
                            console.error("Error retrieving Site Class:", error.message);
                        });
                    }
                }
            }
            else {
                // If not a Site, hide the Site Class field
                var siteClassControl = formContext.getControl("ts_siteclass");
                if (siteClassControl) {
                    siteClassControl.setVisible(false);
                }
            }
        }
        EntityRisk.onLoad = onLoad;
        function onSave(eContext) {
            var formContext = eContext.getFormContext();
            console.log("Entering EntityRisk onSave");
        }
        EntityRisk.onSave = onSave;
        function fiscalYearOnChange(eContext) {
            var _a, _b, _c, _d, _e;
            var formContext = eContext.getFormContext();
            var globalContext = Xrm.Utility.getGlobalContext();
            var queryParams = globalContext.getQueryStringParameters();
            // Get values from the form
            var entityId = (_a = formContext.getAttribute("ts_entityid")) === null || _a === void 0 ? void 0 : _a.getValue();
            var fiscalYear = formContext.getAttribute("ts_fiscalyear").getValue();
            var fiscalYearID = "";
            if (fiscalYear) {
                fiscalYearID = fiscalYear[0].id.toString().replace(/{|}/g, '');
            }
            // Fetch existing records to check for duplicates
            var fetchXml = "\n        <fetch>\n            <entity name=\"ts_entityrisk\">\n                <attribute name=\"ts_entityriskid\" />\n                <filter>\n                    <condition attribute=\"ts_entityid\" operator=\"eq\" value=\"".concat(entityId, "\" />\n                    <condition attribute=\"ts_fiscalyear\" operator=\"eq\" value=\"").concat(fiscalYearID, "\" />\n                </filter>\n            </entity>\n        </fetch>");
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
            // Check if the form is being saved as a new record
            if (formContext.ui.getFormType() === 1 /* Xrm.FormType.Create */) {
                // Get the Fiscal Year Name
                var parentRecordName = queryParams["parentrecordname"];
                var fiscalYear_1 = (_b = formContext.getAttribute("ts_fiscalyear")) === null || _b === void 0 ? void 0 : _b.getValue();
                var fiscalYearName = fiscalYear_1 && fiscalYear_1.length > 0 ? fiscalYear_1[0].name : null;
                // Set the Name
                formContext.getAttribute("ts_name").setValue(parentRecordName + " " + fiscalYearName);
                // Get the selected Entity Name
                var entityName = (_c = formContext.getAttribute("ts_entityname")) === null || _c === void 0 ? void 0 : _c.getValue();
                // If the Entity Name is Activity Type
                if (entityName === ts_entityrisk_ts_entityname.ActivityType) {
                    // Get the Fiscal Year value
                    var fiscalYear_2 = (_d = formContext.getAttribute("ts_fiscalyear")) === null || _d === void 0 ? void 0 : _d.getValue();
                    // If Fiscal Year is not null or undefined, get the ID
                    var fiscalYearId = fiscalYear_2 && fiscalYear_2.length > 0 ? fiscalYear_2[0].id.replace(/[{}]/g, "") : null;
                    // Get the Entity ID value
                    var entityId_1 = (_e = formContext.getAttribute("ts_entityid")) === null || _e === void 0 ? void 0 : _e.getValue();
                    // If both Fiscal Year and Entity ID are not null 
                    if (fiscalYear_2 !== null && fiscalYear_2 !== undefined && entityId_1 !== null && entityId_1 !== undefined) {
                        console.log("Entity Risk created with Fiscal Year and Entity ID.");
                        // Fetch XML for getting the ts_prescribedfrequencyoverrideid
                        var fetchXmlPrescribedFrequencyOverrideId = "\n                        <fetch xmlns:generator='MarkMpn.SQL4CDS'>\n                          <entity name='ts_prescribedfrequencyoverride'>\n                            <attribute name='ts_prescribedfrequencyoverrideid' />\n                            <attribute name='ts_name' />\n                            <link-entity name='msdyn_incidenttype' to='ts_activitytype' from='msdyn_incidenttypeid' alias='msdyn_incidenttype' link-type='inner'>\n                              <filter>\n                                <condition attribute='msdyn_incidenttypeid' operator='eq' value='".concat(entityId_1, "' />\n                              </filter>\n                            </link-entity>\n                            <filter>\n                              <condition attribute='ts_fiscalyear' operator='eq' value='").concat(fiscalYearId, "' />\n                            </filter>\n                          </entity>\n                        </fetch>\n                    ");
                        var fetchXmlEncoded = "?fetchXml=" + encodeURIComponent(fetchXmlPrescribedFrequencyOverrideId);
                        // Retrieve the ts_prescribedfrequencyoverrideid
                        Xrm.WebApi.retrieveMultipleRecords("ts_prescribedfrequencyoverride", fetchXmlEncoded).then(function (result) {
                            if (result.entities.length > 0) {
                                // Initialize the variable to store the ID
                                var prescribedFrequencyOverrideId = "";
                                // Initialize the variable to store the name
                                var prescribedFrequencyOverrideName = "";
                                // Get the first record's ts_prescribedfrequencyoverrideid
                                for (var _i = 0, _a = result.entities; _i < _a.length; _i++) {
                                    var record = _a[_i];
                                    prescribedFrequencyOverrideId = record["ts_prescribedfrequencyoverrideid"];
                                    prescribedFrequencyOverrideName = record["ts_name"];
                                    console.log("Prescribed Frequency Override ID:", prescribedFrequencyOverrideId);
                                }
                                // Set the Prescribed Frequency Override lookup field
                                var lookup = new Array();
                                lookup[0] = new Object();
                                lookup[0].id = "{" + prescribedFrequencyOverrideId + "}";
                                lookup[0].name = prescribedFrequencyOverrideName;
                                lookup[0].entityType = "ts_prescribedfrequencyoverride";
                                formContext.getAttribute("ts_prescribedfrequencyoverride").setValue(lookup);
                                // Show the Prescribed Frequency Override field
                                var prescribedFrequencyOverrideControl = formContext.getControl("ts_prescribedfrequencyoverride");
                                if (prescribedFrequencyOverrideControl) {
                                    prescribedFrequencyOverrideControl.setVisible(true);
                                    prescribedFrequencyOverrideControl.setDisabled(true); // Disable the field
                                }
                            }
                            else {
                                console.log("No Prescribed Frequency Override ID found.");
                            }
                        }, function (error) {
                            console.error("Error retrieving Prescribed Frequency Override ID:", error);
                        });
                    }
                    else {
                        console.log("No Prescribed Frequency Override ID found.");
                        // Hide the Prescribed Frequency Override field
                        var prescribedFrequencyOverrideControl = formContext.getControl("ts_prescribedfrequencyoverride");
                        if (prescribedFrequencyOverrideControl) {
                            formContext.getAttribute("ts_prescribedfrequencyoverride").setValue(null);
                            prescribedFrequencyOverrideControl.setVisible(false);
                            prescribedFrequencyOverrideControl.setDisabled(true);
                        }
                    }
                }
            }
        }
        EntityRisk.fiscalYearOnChange = fiscalYearOnChange;
        function setFiscalYearFilteredView(formContext) {
            var viewId = '{350B79C5-0A0E-42B2-8FF7-7F83B7E9628B}';
            var entityName = "tc_tcfiscalyear";
            var viewDisplayName = "Filtered Fiscal Year";
            var today = new Date();
            var yearsAgo = today.getFullYear() - 2;
            var yearsFromNow = today.getFullYear() + 5;
            var fetchXml = "<fetch version=\"1.0\" mapping=\"logical\" distinct=\"true\" returntotalrecordcount=\"true\" page=\"1\" count=\"25\" no-lock=\"false\">\n                            <entity name=\"tc_tcfiscalyear\">\n                              <attribute name=\"tc_tcfiscalyearid\" />\n                              <attribute name=\"tc_name\" />\n                              <order attribute=\"tc_fiscalyearnum\" descending=\"false\" />\n                              <filter>\n                                <condition attribute=\"tc_fiscalyearnum\" operator=\"ge\" value=\"".concat(yearsAgo, "\" />\n                                <condition attribute=\"tc_fiscalyearnum\" operator=\"le\" value=\"").concat(yearsFromNow, "\" />\n                              </filter>\n                            </entity>\n                          </fetch>");
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
