"use strict";
var ROM;
(function (ROM) {
    var SecurityIncidentType;
    (function (SecurityIncidentType) {
        var langColumn = Xrm.Utility.getGlobalContext().userSettings.languageId === 1033 ? "ts_securityincidenttypenameenglish" : "ts_securityincidenttypenamefrench";
        function onLoad(eContext) {
            var formContext = eContext.getFormContext();
            if (showFieldWarningMessageIfOwnerIsNotISSONorAvSec(formContext)) {
                formContext.getAttribute("ownerid").setValue();
            }
            if (formContext.ui.getFormType() == 1) {
                setOwnerToUserBusinessUnit(formContext);
            }
            else if (formContext.ui.getFormType() != 1) {
                checkIfExistingRecordExistWithSameNameAndBU(formContext, "ts_name");
            }
        }
        SecurityIncidentType.onLoad = onLoad;
        function onSave(eContext) {
            var form = eContext.getFormContext();
            if (checkIfExistingRecordExistWithSameNameAndBU(form, "ts_name") ||
                checkIfExistingRecordExistWithSameNameAndBU(form, "ts_securityincidenttypenameenglish") ||
                checkIfExistingRecordExistWithSameNameAndBU(form, "ts_securityincidenttypenamefrench")) {
                eContext.getEventArgs().preventDefault();
            }
        }
        SecurityIncidentType.onSave = onSave;
        function ownerOnChange(eContext) {
            var form = eContext.getFormContext();
            showFieldWarningMessageIfOwnerIsNotISSONorAvSec(form);
            checkIfExistingRecordExistWithSameNameAndBU(form, "ts_name");
            checkIfExistingRecordExistWithSameNameAndBU(form, "ts_securityincidenttypenameenglish");
            checkIfExistingRecordExistWithSameNameAndBU(form, "ts_securityincidenttypenamefrench");
        }
        SecurityIncidentType.ownerOnChange = ownerOnChange;
        function nameOnChange(eContext, field) {
            var form = eContext.getFormContext();
            checkIfExistingRecordExistWithSameNameAndBU(form, field);
        }
        SecurityIncidentType.nameOnChange = nameOnChange;
        function checkIfExistingRecordExistWithSameNameAndBU(formContext, field) {
            var _a, _b;
            var securityIncidentAttribute = formContext.getAttribute(field);
            if (securityIncidentAttribute !== undefined) {
                var ownerAttribute = formContext.getAttribute("ownerid");
                if (securityIncidentAttribute && ownerAttribute) {
                    var nameAttributeValue = (_a = securityIncidentAttribute.getValue()) === null || _a === void 0 ? void 0 : _a.trim();
                    var ownerAttributeValue = ownerAttribute.getValue();
                    if (nameAttributeValue && ownerAttributeValue) {
                        var fetchData = {
                            "securityIncidentTypeName": "" + nameAttributeValue,
                            "ownerId": "" + ((_b = ownerAttribute.getValue()) === null || _b === void 0 ? void 0 : _b[0].id)
                        };
                        var fetchXml = [
                            "<fetch version='1.0' mapping='logical' distinct='true'>",
                            "  <entity name='ts_securityincidenttype'>",
                            "    <filter type='and'>",
                            "      <condition attribute='", (field === 'ts_name' ? langColumn : field), "' operator='eq' value='", fetchData.securityIncidentTypeName, "'/>",
                            "      <condition attribute='ownerid' operator='eq' value='", fetchData.ownerId, "'/>",
                            "      <condition attribute='ts_securityincidenttypeid' operator='neq' value='", formContext.data.entity.getId(), "'/>",
                            "    </filter>",
                            "  </entity>",
                            "</fetch>"
                        ].join("");
                        Xrm.WebApi.retrieveMultipleRecords('ts_securityincidenttype', "?fetchXml=" + fetchXml).then(function success(result) {
                            if (result.entities.length > 0) {
                                var warningMessage = Xrm.Utility.getResourceString("ts_/resx/SecurityIncidentType", "WarningMessageText");
                                formContext.getControl(field).setNotification(warningMessage, "error");
                                return true;
                            }
                            else {
                                formContext.getControl(field).clearNotification("error");
                            }
                        });
                    }
                }
            }
            return false;
        }
        SecurityIncidentType.checkIfExistingRecordExistWithSameNameAndBU = checkIfExistingRecordExistWithSameNameAndBU;
    })(SecurityIncidentType = ROM.SecurityIncidentType || (ROM.SecurityIncidentType = {}));
})(ROM || (ROM = {}));
