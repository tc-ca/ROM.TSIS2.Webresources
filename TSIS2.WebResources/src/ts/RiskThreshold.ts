namespace ROM.RiskThreshold {

    // EVENTS
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_riskcategory.Main.Information>eContext.getFormContext();
        setOperationFrequencyFilteredView(form);
    }

    export function operationFrequencyOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        try {
            const form = <Form.ts_riskcategory.Main.Information>eContext.getFormContext(); 
            setCycleLengthAndInspectionsPerCycle(form);
        } catch (e) {
            throw new Error(e.Message);
        }
    }

    // FUNCTIONS
    function setCycleLengthAndInspectionsPerCycle(form: Form.ts_riskcategory.Main.Information): void {
        // get the selected Operation Frequency
        let selectedOperationFrequency = form.getAttribute("ts_operationfrequency").getValue();

        if (selectedOperationFrequency != null && selectedOperationFrequency != undefined) {
            Xrm.WebApi.retrieveRecord("ts_operationfrequency", selectedOperationFrequency[0].id.replace(/({|})/g, ''), "?$select=ts_cyclelengthyears,ts_inspectionspercycle").then(
                function success(result) {
                    // set the Cycle length and Inspections per cycle
                    form.getAttribute("ts_interval").setValue(result.ts_cyclelengthyears);
                    form.getAttribute("ts_frequency").setValue(result.ts_inspectionspercycle);
                },
                function (error) {
                }
            );
        }
    }

    function setOperationFrequencyFilteredView(form: Form.ts_riskcategory.Main.Information): void {
        const viewId = '{3FB9EC4E-155A-48C9-B237-8E0279059121}';
        const entityName = "ts_operationfrequency";
        const viewDisplayName = "Operation Frequency Filtered View";
        const fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" returntotalrecordcount="true" page="1" count="25" no-lock="false"><entity name="ts_operationfrequency"><attribute name="ts_operationfrequencyid" /><attribute name="ts_name" /><order attribute="ts_name" /></entity></fetch>';
        const layoutXml = '<grid name="resultset" object="10010" jump="ts_name" select="1" icon="1" preview="1"><row name="result" id="ts_operationfrequencyid"><cell name="ts_name" width="200" /></row></grid>';
        form.getControl("ts_operationfrequency").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
    }
}