"use strict";
var ROM;
(function (ROM) {
    var EntityRisk;
    (function (EntityRisk) {
        function onLoad(eContext) {
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
                            formContext.getAttribute("ts_entityname").setValue(741130004 /* Stakeholder */);
                            break;
                        case "msdyn_functionallocation":
                            formContext.getAttribute("ts_entityname").setValue(741130003 /* Site */);
                            break;
                        case "ovs_operationtype":
                            formContext.getAttribute("ts_entityname").setValue(741130002 /* OperationType */);
                            break;
                        case "ovs_operation":
                            formContext.getAttribute("ts_entityname").setValue(741130001 /* Operation */);
                            break;
                        case "msdyn_incidenttype":
                            formContext.getAttribute("ts_entityname").setValue(741130005 /* ActivityType */);
                            break;
                        case "ts_programarea":
                            formContext.getAttribute("ts_entityname").setValue(741130000 /* ProgramArea */);
                            break;
                        default:
                            console.log("Unknown Parent Record Type");
                            formContext.getAttribute("ts_entityname").setValue(null);
                            break;
                    }
                    // Set the Entity ID
                    formContext.getAttribute("ts_entityid").setValue(parentRecordId);
                    // Set the Name
                    formContext.getAttribute("ts_name").setValue(parentRecordName);
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
        }
        EntityRisk.onLoad = onLoad;
        function onSave(eContext) {
            var formContext = eContext.getFormContext();
            console.log("Entering EntityRisk onSave");
        }
        EntityRisk.onSave = onSave;
        function riskRatingOnChange(eContext) {
            var form = eContext.getFormContext();
            console.log("riskRatingOnChange is working!!!");
        }
        EntityRisk.riskRatingOnChange = riskRatingOnChange;
        function riskScoreOnChange(eContext) {
            var form = eContext.getFormContext();
            console.log("riskScoreOnChange is working!!!");
        }
        EntityRisk.riskScoreOnChange = riskScoreOnChange;
        function setFiscalYearFilteredView(formContext) {
            var viewId = '{350B79C5-0A0E-42B2-8FF7-7F83B7E9628B}';
            var entityName = "tc_tcfiscalyear";
            var viewDisplayName = "Filtered Fiscal Year";
            var today = new Date();
            var yearsAgo = today.getFullYear() - 2;
            var yearsFromNow = today.getFullYear() + 5;
            var fetchXml = "<fetch version=\"1.0\" mapping=\"logical\" distinct=\"true\" returntotalrecordcount=\"true\" page=\"1\" count=\"25\" no-lock=\"false\">\n                            <entity name=\"tc_tcfiscalyear\">\n                              <attribute name=\"tc_tcfiscalyearid\" />\n                              <attribute name=\"tc_name\" />\n                              <order attribute=\"tc_fiscalyearnum\" descending=\"false\" />\n                              <filter>\n                                <condition attribute=\"tc_fiscalyearnum\" operator=\"ge\" value=\"" + yearsAgo + "\" />\n                                <condition attribute=\"tc_fiscalyearnum\" operator=\"le\" value=\"" + yearsFromNow + "\" />\n                              </filter>\n                            </entity>\n                          </fetch>";
            var layoutXml = '<grid name="resultset" object="10010" jump="tc_name" select="1" icon="1" preview="1"><row name="result" id="tc_tcfiscalyearid"><cell name="tc_name" width="200" /></row></grid>';
            formContext.getControl("ts_fiscalyear").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
        }
    })(EntityRisk = ROM.EntityRisk || (ROM.EntityRisk = {}));
})(ROM || (ROM = {}));
