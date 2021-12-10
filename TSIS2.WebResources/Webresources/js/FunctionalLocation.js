"use strict";
var ROM;
(function (ROM) {
    var FunctionalLocation;
    (function (FunctionalLocation) {
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            var ownerAttribute = form.getAttribute("ownerid");
            if (ownerAttribute != null && ownerAttribute != undefined) {
                var ownerAttributeValue = ownerAttribute.getValue();
                if (ownerAttributeValue != null && ownerAttributeValue != undefined) {
                    Xrm.WebApi.retrieveRecord("systemuser", ownerAttributeValue[0].id.replace(/[{}]/g, ""), "?$select=_businessunitid_value").then(function success(result) {
                        Xrm.WebApi.retrieveRecord("businessunit", result._businessunitid_value, "?$select=name").then(function success(result) {
                            form.getAttribute("ts_businessunit").setValue(result.name);
                        }, function (error) {
                        });
                    }, function (error) {
                    });
                }
            }
            setDateRangeVisibility(eContext);
        }
        FunctionalLocation.onLoad = onLoad;
        function siteStatusOnChange(eContext) {
            setDateRangeVisibility(eContext);
        }
        FunctionalLocation.siteStatusOnChange = siteStatusOnChange;
        function setDateRangeVisibility(eContext) {
            var form = eContext.getFormContext();
            var siteStatus = form.getAttribute("ts_sitestatus");
            if (siteStatus != null && siteStatus != undefined) {
                var siteStatusValue = siteStatus.getValue();
                //if status is Non-Operational set Start Date and End Date visible
                if (siteStatusValue == "717750001") {
                    form.getControl("ts_statusstartdate").setVisible(true);
                    form.getControl("ts_statusenddate").setVisible(true);
                }
                else {
                    form.getControl("ts_statusstartdate").setVisible(false);
                    form.getControl("ts_statusenddate").setVisible(false);
                }
            }
        }
    })(FunctionalLocation = ROM.FunctionalLocation || (ROM.FunctionalLocation = {}));
})(ROM || (ROM = {}));
