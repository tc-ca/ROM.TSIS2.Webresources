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
        }
        Account.onLoad = onLoad;
        function countryOnChange(eContext) {
            var form = eContext.getFormContext();
            var countryAttr = form.getAttribute("ovs_country").getValue();
            if (countryAttr != null && countryAttr != undefined) {
                var countryName = countryAttr[0].name;
                var address1Country = form.getAttribute("address1_country");
                if (address1Country != null && address1Country != undefined) {
                    address1Country.setValue(countryName);
                }
            }
        }
        Account.countryOnChange = countryOnChange;
    })(Account = ROM.Account || (ROM.Account = {}));
})(ROM || (ROM = {}));
