"use strict";
var ROM;
(function (ROM) {
    var UserRegistration;
    (function (UserRegistration) {
        function onLoad(eContext) {
            var formContext = eContext.getFormContext();
            console.log("Entering onLoad");
        }
        UserRegistration.onLoad = onLoad;
        function onSave(eContext) {
            var formContext = eContext.getFormContext();
            console.log("Entering onSave");
        }
        UserRegistration.onSave = onSave;
        function OnChangeAADUser(eContext) {
            var _a;
            console.log("Entering OnChangeAADUser");
            var formContext = eContext.getFormContext();
            var aaduserid = (_a = formContext.getAttribute("ts_aaduser")) === null || _a === void 0 ? void 0 : _a.getValue();
            if (!aaduserid || aaduserid.length === 0)
                return;
            Xrm.WebApi.retrieveRecord("aaduser", aaduserid[0].id, "?$select=userprincipalname,surname,givenname")
                .then(function (result) {
                var _a, _b, _c;
                console.log("Retrieved values: Name: " + result.userprincipalname);
                (_a = formContext.getAttribute("ts_name")) === null || _a === void 0 ? void 0 : _a.setValue(result.userprincipalname);
                (_b = formContext.getAttribute("ts_firstname")) === null || _b === void 0 ? void 0 : _b.setValue(result.givenname);
                (_c = formContext.getAttribute("ts_lastname")) === null || _c === void 0 ? void 0 : _c.setValue(result.surname);
            })
                .catch(function (error) {
                console.error(error.message);
            });
        }
        UserRegistration.OnChangeAADUser = OnChangeAADUser;
    })(UserRegistration = ROM.UserRegistration || (ROM.UserRegistration = {}));
})(ROM || (ROM = {}));
