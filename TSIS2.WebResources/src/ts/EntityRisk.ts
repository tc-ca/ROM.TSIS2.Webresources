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

    export function onSave(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_entityrisk.Main.Information>eContext.getFormContext();
        console.log("Entering EntityRisk onSave");
    }
}