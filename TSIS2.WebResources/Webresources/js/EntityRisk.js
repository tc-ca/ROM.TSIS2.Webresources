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
            }
        }
        EntityRisk.onLoad = onLoad;
        function onSave(eContext) {
            var formContext = eContext.getFormContext();
            console.log("Entering EntityRisk onSave");
        }
        EntityRisk.onSave = onSave;
    })(EntityRisk = ROM.EntityRisk || (ROM.EntityRisk = {}));
})(ROM || (ROM = {}));
