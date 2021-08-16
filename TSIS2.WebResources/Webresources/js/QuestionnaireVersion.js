"use strict";
var ROM;
(function (ROM) {
    var QuestionnaireVersion;
    (function (QuestionnaireVersion) {
        function onLoad(eContext) {
            setNotificationMessage(eContext);
        }
        QuestionnaireVersion.onLoad = onLoad;
        function dateOnChange(eContext) {
            setNotificationMessage(eContext);
        }
        QuestionnaireVersion.dateOnChange = dateOnChange;
        function setNotificationMessage(eContext) {
            var form = eContext.getFormContext();
            var message;
            var dateStartAttribute = form.getAttribute("ts_effectivestartdate");
            var dateEndAttribute = form.getAttribute("ts_effectiveenddate");
            var dateStartAttributeValue = dateStartAttribute.getValue();
            var dateEndAttributeValue = dateEndAttribute.getValue();
            if (dateStartAttributeValue == null && dateEndAttributeValue == null)
                message = Xrm.Utility.getResourceString("ts_/resx/QuestionnaireVersion", "Draft");
            if (dateStartAttributeValue && dateEndAttributeValue) {
                var dateStartDate = Date.parse(dateStartAttributeValue);
                var dateEndDate = Date.parse(dateEndAttributeValue);
                if (dateStartDate > Date.now() && dateEndDate > Date.now())
                    message = Xrm.Utility.getResourceString("ts_/resx/QuestionnaireVersion", "PublishedAwaitingEffectiveDate");
                if (dateStartDate < Date.now() && dateEndDate < Date.now())
                    message = message = Xrm.Utility.getResourceString("ts_/resx/QuestionnaireVersion", "PublishedRetired");
                if (dateStartDate < Date.now() && dateEndDate > Date.now())
                    message = message = Xrm.Utility.getResourceString("ts_/resx/QuestionnaireVersion", "PublishedInEffect");
            }
            if (dateStartAttributeValue && dateEndAttributeValue == null) {
                var dateStartDate = Date.parse(dateStartAttributeValue);
                if (dateStartDate < Date.now())
                    message = message = Xrm.Utility.getResourceString("ts_/resx/QuestionnaireVersion", "PublishedInEffect");
            }
            form.ui.setFormNotification(message, "INFO", "notification");
        }
    })(QuestionnaireVersion = ROM.QuestionnaireVersion || (ROM.QuestionnaireVersion = {}));
})(ROM || (ROM = {}));
