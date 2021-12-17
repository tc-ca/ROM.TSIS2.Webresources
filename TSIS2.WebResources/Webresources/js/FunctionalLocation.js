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
            if (form.getAttribute("ts_statusstartdate").getValue() == null) {
                form.getAttribute("ts_description").setValue(null);
                form.getControl("ts_statusenddate").setDisabled(true);
                form.getControl("ts_description").setDisabled(true);
            }
        }
        FunctionalLocation.onLoad = onLoad;
        function siteStatusOnChange(eContext) {
            var form = eContext.getFormContext();
            var siteStatus = form.getAttribute("ts_sitestatus");
            if (siteStatus != null && siteStatus != undefined) {
                var siteStatusValue = siteStatus.getValue();
                //if status is Non-Operational 
                if (siteStatusValue == 717750001) {
                    form.getAttribute("ts_statusstartdate").setValue(new Date(Date.now()));
                    form.getAttribute("ts_statusenddate").setValue(null);
                    form.getControl("ts_statusenddate").setDisabled(false);
                    form.getControl("ts_description").setDisabled(false);
                }
                else {
                    form.getAttribute("ts_statusstartdate").setValue(null);
                    form.getAttribute("ts_statusenddate").setValue(null);
                    form.getAttribute("ts_description").setValue(null);
                    form.getControl("ts_statusenddate").setDisabled(true);
                    form.getControl("ts_description").setDisabled(true);
                }
            }
        }
        FunctionalLocation.siteStatusOnChange = siteStatusOnChange;
        function statusStartDateOnChange(eContext) {
            var form = eContext.getFormContext();
            if (form.getAttribute("ts_statusstartdate").getValue() != null) {
                form.getControl("ts_statusenddate").setDisabled(false);
                form.getControl("ts_description").setDisabled(false);
            }
        }
        FunctionalLocation.statusStartDateOnChange = statusStartDateOnChange;
    })(FunctionalLocation = ROM.FunctionalLocation || (ROM.FunctionalLocation = {}));
})(ROM || (ROM = {}));
