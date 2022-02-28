﻿"use strict";
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
                var siteTypeAttribute = form.getAttribute("ts_sitetype");
                if (siteTypeAttribute != null) {
                    var siteTypeAttributeValue = form.getAttribute("ts_sitetype").getValue();
                    if (siteTypeAttributeValue != null) {
                        if (siteTypeAttributeValue[0].name == "Aerodrome") {
                            form.getControl("ts_icaocode").setVisible(true);
                            form.getControl("ts_iatacode").setVisible(true);
                        }
                    }
                }
                //If site type is aerodrome, show ICAO and IATA fields
            }
            if (form.getAttribute("ts_statusstartdate").getValue() == null) {
                form.getAttribute("ts_description").setValue(null);
                form.getControl("ts_statusenddate").setDisabled(true);
                form.getControl("ts_description").setDisabled(true);
                form.getAttribute("ts_description").setRequiredLevel("none");
            }
            else {
                form.getAttribute("ts_description").setRequiredLevel("required");
            }
        }
        FunctionalLocation.onLoad = onLoad;
        function siteTypeOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var siteTypeAttribute = form.getAttribute("ts_sitetype");
                var icaoCodeAttribute = form.getAttribute("ts_icaocode");
                var iataCodeAttribute = form.getAttribute("ts_iatacode");
                if (siteTypeAttribute != null && siteTypeAttribute != undefined) {
                    var siteTypeAttributeValue = siteTypeAttribute.getValue();
                    if (siteTypeAttributeValue != null && siteTypeAttributeValue != undefined) {
                        if (siteTypeAttributeValue[0].id == "{99DA31E7-7D78-EB11-A812-0022486D697D}") { //aerodrome
                            form.getControl("ts_icaocode").setVisible(true);
                            form.getControl("ts_iatacode").setVisible(true);
                        }
                    }
                    else {
                        icaoCodeAttribute.setValue() == null;
                        iataCodeAttribute.setValue() == null;
                        form.getControl("ts_icaocode").setVisible(false);
                        form.getControl("ts_iatacode").setVisible(false);
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        FunctionalLocation.siteTypeOnChange = siteTypeOnChange;
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
                    form.getAttribute("ts_description").setRequiredLevel("required");
                }
                else {
                    form.getAttribute("ts_statusstartdate").setValue(null);
                    form.getAttribute("ts_statusenddate").setValue(null);
                    form.getAttribute("ts_description").setValue(null);
                    form.getControl("ts_statusenddate").setDisabled(true);
                    form.getControl("ts_description").setDisabled(true);
                    form.getAttribute("ts_description").setRequiredLevel("none");
                }
            }
        }
        FunctionalLocation.siteStatusOnChange = siteStatusOnChange;
        function statusStartDateOnChange(eContext) {
            var form = eContext.getFormContext();
            if (form.getAttribute("ts_statusstartdate").getValue() != null) {
                form.getControl("ts_statusenddate").setDisabled(false);
                form.getControl("ts_description").setDisabled(false);
                form.getAttribute("ts_description").setRequiredLevel("required");
            }
            else {
                form.getAttribute("ts_description").setRequiredLevel("none");
                form.getAttribute("ts_description").setValue(null);
                form.getControl("ts_statusenddate").setDisabled(true);
                form.getControl("ts_description").setDisabled(true);
            }
        }
        FunctionalLocation.statusStartDateOnChange = statusStartDateOnChange;
    })(FunctionalLocation = ROM.FunctionalLocation || (ROM.FunctionalLocation = {}));
})(ROM || (ROM = {}));
