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
        }
        EntityRiskFrequency.onLoad = onLoad;
        function onSave(eContext) {
            var formContext = eContext.getFormContext();
            generateUniqueKey(formContext);
            console.log("Entering onSave");
        }
        EntityRiskFrequency.onSave = onSave;
        function entityNameOnChange(eContext) {
            var formContext = eContext.getFormContext();
            // Get values from the form
            var selectedEntity = formContext.getAttribute("ts_entityname").getValue();
            // Ensure selectedEntity is not null
            if (selectedEntity === null)
                return;
            // Show the specific lookup based on the entity selected
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
        function setFiscalYearFilteredView(formContext) {
            var viewId = '{350B79C5-0A0E-42B2-8FF7-7F63B7E9628B}';
            var entityName = "tc_tcfiscalyear";
            var viewDisplayName = "Filtered Fiscal Year";
            var today = new Date();
            var yearsAgo = today.getFullYear() - 2;
            var yearsFromNow = today.getFullYear() + 5;
            var fetchXml = "<fetch version=\"1.0\" mapping=\"logical\" distinct=\"true\" returntotalrecordcount=\"true\" page=\"1\" count=\"25\" no-lock=\"false\">\n                            <entity name=\"tc_tcfiscalyear\">\n                              <attribute name=\"tc_tcfiscalyearid\" />\n                              <attribute name=\"tc_name\" />\n                              <order attribute=\"tc_fiscalyearnum\" descending=\"false\" />\n                              <filter>\n                                <condition attribute=\"tc_fiscalyearnum\" operator=\"ge\" value=\"" + yearsAgo + "\" />\n                                <condition attribute=\"tc_fiscalyearnum\" operator=\"le\" value=\"" + yearsFromNow + "\" />\n                              </filter>\n                            </entity>\n                          </fetch>";
            var layoutXml = '<grid name="resultset" object="10010" jump="tc_name" select="1" icon="1" preview="1"><row name="result" id="tc_tcfiscalyearid"><cell name="tc_name" width="200" /></row></grid>';
            formContext.getControl("ts_fiscalyear").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
        }
        function generateUniqueKey(formContext) {
            var generatedUniqueKey = "";
            var fiscalYear = formContext.getAttribute("ts_fiscalyear").getValue();
            var selectedEntity = formContext.getAttribute("ts_entityname").getValue();
            // Ensure fiscalYear and entityName are not null
            if (fiscalYear === null || selectedEntity === null)
                return;
            var fiscalYearName = fiscalYear[0].name;
            var entityGuid = "";
            switch (selectedEntity) {
                case 741130000:
                    console.log("Activity Type selected");
                    var activityType = formContext.getAttribute("ts_activitytype").getValue();
                    if (activityType != null) {
                        entityGuid = activityType[0].id;
                    }
                    break;
                case 741130001:
                    console.log("Operation selected");
                    var operation = formContext.getAttribute("ts_operation").getValue();
                    if (operation != null) {
                        entityGuid = operation[0].id;
                    }
                    break;
                case 741130002:
                    console.log("Operation Type selected");
                    var operationType = formContext.getAttribute("ts_operationtype").getValue();
                    if (operationType != null) {
                        entityGuid = operationType[0].id;
                    }
                    break;
                case 741130003:
                    console.log("Program Area selected");
                    var programArea = formContext.getAttribute("ts_programarea").getValue();
                    if (programArea != null) {
                        entityGuid = programArea[0].id;
                    }
                    break;
                case 741130004:
                    console.log("Site selected");
                    var site = formContext.getAttribute("ts_site").getValue();
                    if (site != null) {
                        entityGuid = site[0].id;
                    }
                    break;
                case 741130005:
                    console.log("Stakeholder selected");
                    var stakeholder = formContext.getAttribute("ts_stakeholder").getValue();
                    if (stakeholder != null) {
                        entityGuid = stakeholder[0].id;
                    }
                    break;
                default:
                    console.log("Entity Name drop down selection - Unknown selection");
                    // Optional: Handle cases where the selection is not recognized
                    break;
            }
            // Generate the unique key
            generatedUniqueKey = fiscalYearName + ":" + entityGuid;
            formContext.getAttribute("ts_generateduniquekey").setValue(generatedUniqueKey);
        }
    })(EntityRiskFrequency = ROM.EntityRiskFrequency || (ROM.EntityRiskFrequency = {}));
})(ROM || (ROM = {}));
