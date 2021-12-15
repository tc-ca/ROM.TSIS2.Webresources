"use strict";
var ROM;
(function (ROM) {
    var Account;
    (function (Account) {
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            var addressControl = form.getControl("address1_composite_compositionLinkControl_address1_country");
            if (addressControl != null && addressControl != undefined) {
                addressControl.setVisible(false);
            }
            setDateRangeVisibility(eContext);
        }
        Account.onLoad = onLoad;
        function regionOnChange(eContext) {
            var form = eContext.getFormContext();
            var countryAttribute = form.getAttribute("ts_country");
            var regionAttribute = form.getAttribute("msdyn_serviceterritory");
            var address1CountryAttribute = form.getAttribute("address1_country");
            if (address1CountryAttribute != null && address1CountryAttribute != undefined) {
                var regionAttributeValue = regionAttribute.getValue();
                var countryAttributeValue = countryAttribute.getValue();
                var address1CountryAttributeValue = address1CountryAttribute.getValue();
                if (regionAttributeValue != null && regionAttributeValue != undefined) {
                    //Set Country to Canada if Region Is Not International
                    if (regionAttributeValue[0].id != "{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}") { //International
                        var lookup = new Array();
                        lookup[0] = new Object();
                        lookup[0].id = "{208EF8A1-8E75-EB11-A812-000D3AF3FAC7}";
                        lookup[0].name = "CANADA";
                        lookup[0].entityType = "tc_country";
                        form.getAttribute("ts_country").setValue(lookup);
                        address1CountryAttribute.setValue("CANADA");
                    }
                    else {
                        if (countryAttributeValue != null && countryAttributeValue[0].id == "{208EF8A1-8E75-EB11-A812-000D3AF3FAC7}") { //Canada
                            countryAttribute.setValue(null);
                        }
                        if (address1CountryAttributeValue == "CANADA") {
                            address1CountryAttribute.setValue(null);
                        }
                    }
                }
            }
        }
        Account.regionOnChange = regionOnChange;
        function countryOnChange(eContext) {
            var form = eContext.getFormContext();
            var countryAttribute = form.getAttribute("ts_country");
            var regionAttribute = form.getAttribute("msdyn_serviceterritory");
            var address1CountryAttribute = form.getAttribute("address1_country");
            if (address1CountryAttribute != null && address1CountryAttribute != undefined) {
                var regionAttributeValue = regionAttribute.getValue();
                var countryAttributeValue = countryAttribute.getValue();
                var address1CountryAttributeValue = address1CountryAttribute.getValue();
                if (countryAttributeValue != null && countryAttributeValue != undefined) {
                    //Put Address1_Composite Country value to the one set in the Country field
                    address1CountryAttribute.setValue(countryAttributeValue[0].name);
                    //Clear and lock Region field if Country is not Canada
                    if (countryAttributeValue[0].id != "{208EF8A1-8E75-EB11-A812-000D3AF3FAC7}") { //Canada
                        var lookup = new Array();
                        lookup[0] = new Object();
                        lookup[0].id = "{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}";
                        lookup[0].name = "International";
                        lookup[0].entityType = "territory";
                        regionAttribute.setValue(lookup);
                        form.getControl("msdyn_serviceterritory").setDisabled(true);
                    }
                    else {
                        if (regionAttributeValue != null && regionAttributeValue[0].id != "{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}") { //International
                            regionAttribute.setValue(null);
                            if (address1CountryAttributeValue == "CANADA") {
                                address1CountryAttribute.setValue(null);
                            }
                            if (countryAttribute != null && countryAttributeValue[0].id == "{208EF8A1-8E75-EB11-A812-000D3AF3FAC7}") {
                                countryAttribute.setValue(null);
                            }
                        }
                        else {
                            regionAttribute.setValue(null);
                        }
                    }
                }
                else {
                    address1CountryAttribute.setValue(null);
                    form.getControl("msdyn_serviceterritory").setDisabled(false);
                }
            }
        }
        Account.countryOnChange = countryOnChange;
        function stakeholderStatusOnChange(eContext) {
            setDateRangeVisibility(eContext);
        }
        Account.stakeholderStatusOnChange = stakeholderStatusOnChange;
        function setDateRangeVisibility(eContext) {
            var form = eContext.getFormContext();
            var stakeholderStatus = form.getAttribute("ts_stakeholderstatus");
            if (stakeholderStatus != null && stakeholderStatus != undefined) {
                var stakeholderStatusValue = stakeholderStatus.getValue();
                //if status is Non-Operational set Start Date and End Date visible
                if (stakeholderStatusValue == 717750001) {
                    form.getControl("ts_statusstartdate").setVisible(true);
                    form.getControl("ts_statusenddate").setVisible(true);
                }
                else {
                    form.getControl("ts_statusstartdate").setVisible(false);
                    form.getControl("ts_statusenddate").setVisible(false);
                }
            }
        }
    })(Account = ROM.Account || (ROM.Account = {}));
})(ROM || (ROM = {}));
