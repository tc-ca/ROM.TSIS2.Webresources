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

            // Filter the lookup column
            setFiscalYearFilteredView(formContext);
        }
    }

    export function onSave(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_entityrisk.Main.Information>eContext.getFormContext();
        console.log("Entering EntityRisk onSave");
    }

    export function riskRatingOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_securityincident.Main.Information>eContext.getFormContext();

        console.log("riskRatingOnChange is working!!!");
    }

    export function riskScoreOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_securityincident.Main.Information>eContext.getFormContext();

        console.log("riskScoreOnChange is working!!!");
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
}