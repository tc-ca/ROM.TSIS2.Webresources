"use strict";
var ROM;
(function (ROM) {
    var CustomerAsset;
    (function (CustomerAsset) {
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            if (form.ui.getFormType() == 1 || form.ui.getFormType() == 2) {
                Xrm.Utility.getGlobalContext().userSettings.languageId == 1033 ? form.getControl("ts_customerassetfrench").setVisible(true) : form.getControl("ts_customerassetenglish").setVisible(true);
            }
            else {
                Xrm.Utility.getGlobalContext().userSettings.languageId == 1033 ? form.getControl("ts_customerassetfrench").setVisible(false) : form.getControl("ts_customerassetenglish").setVisible(false);
            }
        }
        CustomerAsset.onLoad = onLoad;
        function nameOnChange(eContext) {
            var form = eContext.getFormContext();
            var nameAttribute = form.getAttribute("msdyn_name");
            var nameFrenchAttribute = form.getAttribute("ts_customerassetfrench");
            var nameEnglishAttribute = form.getAttribute("ts_customerassetenglish");
            if (nameAttribute != null) {
                var nameAttributeValue = nameAttribute.getValue();
                if (nameAttributeValue != null && nameAttributeValue != undefined) {
                    Xrm.Utility.getGlobalContext().userSettings.languageId == 1033 ? nameEnglishAttribute.setValue(nameAttributeValue) : nameFrenchAttribute.setValue(nameAttributeValue);
                }
            }
        }
        CustomerAsset.nameOnChange = nameOnChange;
    })(CustomerAsset = ROM.CustomerAsset || (ROM.CustomerAsset = {}));
})(ROM || (ROM = {}));
