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
    }

    export function onSave(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_entityriskfrequency.Main.Information>eContext.getFormContext();
        console.log("Entering onSave");
    }

    export function entityNameOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_entityriskfrequency.Main.Information>eContext.getFormContext();

        // Get values from the form
        let selectedEntity = formContext.getAttribute("ts_entityname").getValue();

        // Ensure selectedEntity is not null
        if (selectedEntity === null) return;

        // Show the specific lookup based on the entity selected

        switch (selectedEntity) {
            case 741130000:
                console.log("Activity Type selected");

                formContext.getControl("ts_activitytype").setVisible(true);
                formContext.getControl("ts_operation").setVisible(false);
                formContext.getControl("ts_operationtype").setVisible(false);
                formContext.getControl("ts_programarea").setVisible(false);
                formContext.getControl("ts_site").setVisible(false);
                formContext.getControl("ts_stakeholder").setVisible(false);

                break;

            case 741130001:
                console.log("Operation selected");

                formContext.getControl("ts_activitytype").setVisible(false);
                formContext.getControl("ts_operation").setVisible(true);
                formContext.getControl("ts_operationtype").setVisible(false);
                formContext.getControl("ts_programarea").setVisible(false);
                formContext.getControl("ts_site").setVisible(false);
                formContext.getControl("ts_stakeholder").setVisible(false);

                break;

            case 741130002:
                console.log("Operation Type selected");

                formContext.getControl("ts_activitytype").setVisible(false);
                formContext.getControl("ts_operation").setVisible(false);
                formContext.getControl("ts_operationtype").setVisible(true);
                formContext.getControl("ts_programarea").setVisible(false);
                formContext.getControl("ts_site").setVisible(false);
                formContext.getControl("ts_stakeholder").setVisible(false);

                break;

            case 741130003:
                console.log("Program Area selected");

                formContext.getControl("ts_activitytype").setVisible(false);
                formContext.getControl("ts_operation").setVisible(false);
                formContext.getControl("ts_operationtype").setVisible(false);
                formContext.getControl("ts_programarea").setVisible(true);
                formContext.getControl("ts_site").setVisible(false);
                formContext.getControl("ts_stakeholder").setVisible(false);

                break;

            case 741130004:
                console.log("Site selected");

                formContext.getControl("ts_activitytype").setVisible(false);
                formContext.getControl("ts_operation").setVisible(false);
                formContext.getControl("ts_operationtype").setVisible(false);
                formContext.getControl("ts_programarea").setVisible(false);
                formContext.getControl("ts_site").setVisible(true);
                formContext.getControl("ts_stakeholder").setVisible(false);

                break;

            case 741130005:
                console.log("Stakeholder selected");

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
}