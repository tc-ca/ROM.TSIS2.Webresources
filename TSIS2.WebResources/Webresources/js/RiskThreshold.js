"use strict";
var ROM;
(function (ROM) {
    var RiskThreshold;
    (function (RiskThreshold) {
        // EVENTS
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            setOperationFrequencyFilteredView(form);
        }
        RiskThreshold.onLoad = onLoad;
        function operationFrequencyOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                setCycleLengthAndInspectionsPerCycle(form);
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        RiskThreshold.operationFrequencyOnChange = operationFrequencyOnChange;
        // FUNCTIONS
        function setCycleLengthAndInspectionsPerCycle(form) {
            // get the selected Operation Frequency
            var selectedOperationFrequency = form.getAttribute("ts_operationfrequency").getValue();
            if (selectedOperationFrequency != null && selectedOperationFrequency != undefined) {
                Xrm.WebApi.retrieveRecord("ts_operationfrequency", selectedOperationFrequency[0].id.replace(/({|})/g, ''), "?$select=ts_cyclelengthyears,ts_inspectionspercycle").then(function success(result) {
                    // set the Cycle length and Inspections per cycle
                    form.getAttribute("ts_interval").setValue(result.ts_cyclelengthyears);
                    form.getAttribute("ts_frequency").setValue(result.ts_inspectionspercycle);
                }, function (error) {
                });
            }
        }
        function setOperationFrequencyFilteredView(form) {
            var viewId = '{3FB9EC4E-155A-48C9-B237-8E0279059121}';
            var entityName = "ts_operationfrequency";
            var viewDisplayName = "Operation Frequency Filtered View";
            var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" returntotalrecordcount="true" page="1" count="25" no-lock="false"><entity name="ts_operationfrequency"><attribute name="ts_operationfrequencyid" /><attribute name="ts_name" /><order attribute="ts_name" /></entity></fetch>';
            var layoutXml = '<grid name="resultset" object="10010" jump="ts_name" select="1" icon="1" preview="1"><row name="result" id="ts_operationfrequencyid"><cell name="ts_name" width="200" /></row></grid>';
            form.getControl("ts_operationfrequency").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
        }
    })(RiskThreshold = ROM.RiskThreshold || (ROM.RiskThreshold = {}));
})(ROM || (ROM = {}));
