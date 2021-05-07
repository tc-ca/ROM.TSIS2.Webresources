"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ROM;
(function (ROM) {
    var Account;
    (function (Account) {
        function onLoad(executionContext) {
            var formContext = executionContext.getFormContext();
            var addressControl = formContext.getControl("address1_composite_compositionLinkControl_address1_country");
            if (addressControl != null && addressControl != undefined) {
                addressControl.setVisible(false);
            }
        }
        Account.onLoad = onLoad;
        function countryOnChange(executionContext) {
            var formContext = executionContext.getFormContext();
            var countryAttr = formContext.getAttribute("ts_country").getValue();
            if (countryAttr != null && countryAttr != undefined) {
                var countryName = countryAttr[0].name;
                var address1Country = formContext.getAttribute("address1_country");
                if (address1Country != null && address1Country != undefined) {
                    address1Country.setValue(countryName);
                }
            }
        }
        Account.countryOnChange = countryOnChange;
    })(Account = ROM.Account || (ROM.Account = {}));
})(ROM = exports.ROM || (exports.ROM = {}));
