"use strict";
var ROM;
(function (ROM) {
    var NonOversightActivity;
    (function (NonOversightActivity) {
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            if (form.ui.getFormType() == 1) {
                setProgramToUserBusinessUnit(eContext);
            }
        }
        NonOversightActivity.onLoad = onLoad;
        function dateOfActivityOnChange(eContext) {
            var form = eContext.getFormContext();
            var activityDate = form.getAttribute('ts_dateofactivity').getValue();
            if (activityDate != null) {
                var month = activityDate.getMonth();
                if (month < 3) { //Q4
                    form.getAttribute('ts_quarter').setValue(741130003 /* ts_quarter.Q4 */);
                }
                else if (month >= 3 && month < 6) { //Q1
                    form.getAttribute('ts_quarter').setValue(741130000 /* ts_quarter.Q1 */);
                }
                else if (month >= 6 && month < 9) { //Q2
                    form.getAttribute('ts_quarter').setValue(741130001 /* ts_quarter.Q2 */);
                }
                else if (month >= 9 && month < 12) { //Q3
                    form.getAttribute('ts_quarter').setValue(741130002 /* ts_quarter.Q3 */);
                }
                var fetchXML = "\n            <fetch version=\"1.0\" output-format=\"xml-platform\" mapping=\"logical\" distinct=\"false\">\n              <entity name=\"tc_tcfiscalyear\">\n                <attribute name=\"tc_tcfiscalyearid\" />\n                <attribute name=\"tc_name\" />\n                <attribute name=\"tc_tcfiscalyearid\" />\n                <order attribute=\"tc_name\" descending=\"false\" />\n                <filter type=\"and\">\n                  <condition attribute=\"tc_fiscalstart\" operator=\"on-or-before\" value=\"" + activityDate.toISOString().split('T')[0] + "\" />\n                  <condition attribute=\"tc_fiscalend\" operator=\"on-or-after\" value=\"" + activityDate.toISOString().split('T')[0] + "\" />\n                </filter>\n              </entity>\n            </fetch>\n            ";
                fetchXML = "?fetchXml=" + encodeURIComponent(fetchXML);
                debugger;
                Xrm.WebApi.retrieveMultipleRecords("tc_tcfiscalyear", fetchXML).then(function success(result) {
                    if (result.entities.length > 0) {
                        var targetedFiscalYear = result.entities[0];
                        var lookup = new Array();
                        lookup[0] = new Object();
                        lookup[0].id = targetedFiscalYear.tc_tcfiscalyearid;
                        lookup[0].name = targetedFiscalYear.tc_name;
                        lookup[0].entityType = 'tc_tcfiscalyear';
                        var test = form.getAttribute('ts_fiscalyear');
                        form.getAttribute('ts_fiscalyear').setValue(lookup);
                    }
                }, function (error) {
                });
            }
        }
        NonOversightActivity.dateOfActivityOnChange = dateOfActivityOnChange;
        function programOnChange(eContext) {
            var _a, _b;
            var form = eContext.getFormContext();
            var program = form.getAttribute('ts_program').getValue();
            if (program != null && program.length > 0) {
                if ((_a = program[0].name) === null || _a === void 0 ? void 0 : _a.startsWith('Intermodal')) {
                    form.getControl("ts_category").setDefaultView("e2efe0d1-0812-ee11-8f6e-0022483d7716"); //ISSO
                }
                else if ((_b = program[0].name) === null || _b === void 0 ? void 0 : _b.startsWith('Transport')) {
                    form.getControl("ts_category").setDefaultView("7b5c2ae7-3714-ee11-9cbe-0022483c5061"); //All
                }
                else {
                    form.getControl("ts_category").setDefaultView("9956908f-0912-ee11-8f6e-0022483d7716"); //AvSec
                }
            }
        }
        NonOversightActivity.programOnChange = programOnChange;
        function setProgramToUserBusinessUnit(eContext) {
            var form = eContext.getFormContext();
            var userId = Xrm.Utility.getGlobalContext().userSettings.userId;
            Xrm.WebApi.retrieveRecord("systemuser", userId.replace(/[{}]/g, ""), "?$select=_businessunitid_value").then(function success(result) {
                var lookup = new Array();
                lookup[0] = new Object();
                lookup[0].id = result["_businessunitid_value"];
                lookup[0].name = result["_businessunitid_value@OData.Community.Display.V1.FormattedValue"];
                lookup[0].entityType = 'businessunit';
                form.getAttribute('ts_program').setValue(lookup);
                programOnChange(eContext);
            }, function (error) {
                console.log(error.message);
            });
        }
    })(NonOversightActivity = ROM.NonOversightActivity || (ROM.NonOversightActivity = {}));
})(ROM || (ROM = {}));
