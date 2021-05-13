'use strict';

var MainForm =  (function () {
    function MainForm() {
    }
    MainForm.onLoad = function (eContext) {
        var form = eContext.getFormContext();
        var addressControl = form.getControl("address1_composite_compositionLinkControl_address1_country");
        if (addressControl != null && addressControl != undefined) {
            addressControl.setVisible(false);
        }
    };
    MainForm.regionOnChange = function (eContext) {
        var form = eContext.getFormContext();
        var countryAttribute = form.getAttribute("ts_country");
        var regionAttribute = form.getAttribute("msdyn_serviceterritory");
        var address1CountryAttribute = form.getAttribute("address1_country");
        if (address1CountryAttribute != null && address1CountryAttribute != undefined) {
            var regionAttributeValue = regionAttribute.getValue();
            var countryAttributeValue = countryAttribute.getValue();
            var address1CountryAttributeValue = address1CountryAttribute.getValue();
            if (regionAttributeValue != null && regionAttributeValue != undefined) {
                if (regionAttributeValue[0].id != "{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}") {
                    var lookup = new Array();
                    lookup[0] = new Object();
                    lookup[0].id = "{208EF8A1-8E75-EB11-A812-000D3AF3FAC7}";
                    lookup[0].name = "CANADA";
                    lookup[0].entityType = "tc_country";
                    form.getAttribute("ts_country").setValue(lookup);
                    address1CountryAttribute.setValue("CANADA");
                }
                else {
                    if (countryAttributeValue != null && countryAttributeValue[0].id == "{208EF8A1-8E75-EB11-A812-000D3AF3FAC7}") {
                        countryAttribute.setValue(null);
                    }
                    if (address1CountryAttributeValue == "CANADA") {
                        address1CountryAttribute.setValue(null);
                    }
                }
            }
        }
    };
    MainForm.countryOnChange = function (eContext) {
        var form = eContext.getFormContext();
        var countryAttribute = form.getAttribute("ts_country");
        var regionAttribute = form.getAttribute("msdyn_serviceterritory");
        var address1CountryAttribute = form.getAttribute("address1_country");
        if (address1CountryAttribute != null && address1CountryAttribute != undefined) {
            var regionAttributeValue = regionAttribute.getValue();
            var countryAttributeValue = countryAttribute.getValue();
            var address1CountryAttributeValue = address1CountryAttribute.getValue();
            if (countryAttributeValue != null && countryAttributeValue != undefined) {
                address1CountryAttribute.setValue(countryAttributeValue[0].name);
                if (countryAttributeValue[0].id != "{208EF8A1-8E75-EB11-A812-000D3AF3FAC7}") {
                    var lookup = new Array();
                    lookup[0] = new Object();
                    lookup[0].id = "{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}";
                    lookup[0].name = "International";
                    lookup[0].entityType = "territory";
                    regionAttribute.setValue(lookup);
                    form.getControl("msdyn_serviceterritory").setDisabled(true);
                }
                else {
                    if (regionAttributeValue != null && regionAttributeValue[0].id != "{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}") {
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
    };
    return MainForm;
}());

var ROM;
(function (ROM) {
    (function (Account) {
        function onLoad(executionContext) {
            MainForm.onLoad(executionContext);
        }
        Account.onLoad = onLoad;
        function regionOnChange(executionContext) {
            MainForm.regionOnChange(executionContext);
        }
        Account.regionOnChange = regionOnChange;
        function countryOnChange(executionContext) {
            MainForm.countryOnChange(executionContext);
        }
        Account.countryOnChange = countryOnChange;
    })(ROM.Account || (ROM.Account = {}));
})(ROM || (ROM = {}));
