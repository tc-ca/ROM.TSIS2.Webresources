"use strict";
var ROM;
(function (ROM) {
    var Operation;
    (function (Operation) {
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            var operationStatusAttribute = form.getAttribute("ts_operationstatus");
            var operationStatusAttributeValue = operationStatusAttribute.getValue();
            if (operationStatusAttributeValue != null && operationStatusAttributeValue != undefined) {
                if (operationStatusAttributeValue == 717750001) {
                    form.getControl("ts_startdate").setVisible(true);
                    form.getControl("ts_enddate").setVisible(true);
                }
            }
        }
        Operation.onLoad = onLoad;
        function siteOnChange(eContext) {
            var form = eContext.getFormContext();
            var siteAttribute = form.getAttribute("ts_site");
            if (siteAttribute != null) {
                var siteAttributeValue = siteAttribute.getValue();
                // Enable subsite field with appropriate filtered view if site selected
                if (siteAttributeValue != null && siteAttributeValue != undefined) {
                    form.getControl('ts_subsite').setDisabled(false);
                    var viewId = '{6A59549F-F162-5128-4711-79BC929540C3}';
                    var entityName = "msdyn_functionallocation";
                    var viewDisplayName = "Filtered Sites";
                    var activityTypeFetchXml = '<fetch no-lock="false"><entity name="msdyn_functionallocation"><attribute name="statecode"/><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><filter><condition attribute="msdyn_functionallocationid" operator="under" value="' + siteAttributeValue[0].id + '"/></filter><order attribute="msdyn_name" descending="false"/></entity></fetch>';
                    var layoutXml = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="200" /></row></grid>';
                    form.getControl("ts_subsite").addCustomView(viewId, entityName, viewDisplayName, activityTypeFetchXml, layoutXml, true);
                }
                else {
                    form.getControl('ts_subsite').setDisabled(true);
                }
            }
        }
        Operation.siteOnChange = siteOnChange;
        function operationStatusOnChange(eContext) {
            var form = eContext.getFormContext();
            var operationStatusAttribute = form.getAttribute("ts_operationstatus");
            var startDateAttribute = form.getAttribute("ts_startdate");
            var endDateAttribute = form.getAttribute("ts_enddate");
            if (operationStatusAttribute != null) {
                var operationStatusAttributeValue = operationStatusAttribute.getValue();
                var startDateAttributeValue = startDateAttribute.getValue();
                var endDateAttributeValue = endDateAttribute.getValue();
                if (operationStatusAttributeValue != null && operationStatusAttributeValue != undefined) {
                    if (operationStatusAttributeValue == 717750001) {
                        form.getAttribute("ts_startdate").setRequiredLevel("required");
                        form.getControl("ts_startdate").setVisible(true);
                        form.getControl("ts_enddate").setVisible(true);
                    }
                    else {
                        form.getAttribute("ts_startdate").setRequiredLevel("none");
                        form.getControl("ts_startdate").setVisible(false);
                        form.getControl("ts_enddate").setVisible(false);
                    }
                }
            }
        }
        Operation.operationStatusOnChange = operationStatusOnChange;
    })(Operation = ROM.Operation || (ROM.Operation = {}));
})(ROM || (ROM = {}));
