﻿"use strict";
var ROM;
(function (ROM) {
    var OperationActivity;
    (function (OperationActivity) {
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            var operationAttribute = form.getAttribute("ts_operation");
            var activityTypeAttribute = form.getAttribute("ts_activity");
            if (operationAttribute != null && operationAttribute != undefined && activityTypeAttribute != null && activityTypeAttribute != undefined) {
                var operationAttributeValue = operationAttribute.getValue();
                var activityTypeAttributeValue = activityTypeAttribute.getValue();
                if (operationAttributeValue != null && activityTypeAttributeValue != null) {
                    form.ui.tabs.get("related_wos_tab").setVisible(true);
                    var fetchXml = "<filter><condition attribute=\"msdyn_primaryincidenttype\" operator=\"eq\" value=\"" + activityTypeAttributeValue[0].id + "\"/><condition attribute=\"ovs_operationid\" operator=\"eq\" value=\"" + operationAttributeValue[0].id + "\"/><condition attribute=\"statecode\" operator=\"eq\" value=\"0\" /></filter>";
                    if (form.ui.getFormType() != 0 && form.ui.getFormType() != 1 && form.ui.getFormType() != 6) {
                        //setRelatedWorkOrdersFetchXML(form, fetchXml)
                    }
                }
            }
            //If not business admin lock all fields
            if (!isAdmin()) {
                setAllFieldsDisabled(eContext);
            }
        }
        OperationActivity.onLoad = onLoad;
        function setRelatedWorkOrdersFetchXML(form, fetchXml) {
            var gridControl = form.getControl("subgrid_related_actions");
            if (gridControl === null) {
                setTimeout(ROM.OperationActivity.setRelatedWorkOrdersFetchXML, 1000);
                return;
            }
            else {
                ROM.Utils.setSubgridFilterXml(form, "related_wos", fetchXml);
            }
        }
        OperationActivity.setRelatedWorkOrdersFetchXML = setRelatedWorkOrdersFetchXML;
        function setAllFieldsDisabled(eContext) {
            var formContext = eContext.getFormContext();
            formContext.ui.controls.forEach(function (control, i) {
                if (control && control.getDisabled && !control.getDisabled()) {
                    control.setDisabled(true);
                }
            });
        }
        function isAdmin() {
            var userRoles = Xrm.Utility.getGlobalContext().userSettings.roles;
            var isAdmin = false;
            userRoles.forEach(function (role) {
                if (role.name == "System Administrator" || role.name == "ROM - Business Admin") {
                    isAdmin = true;
                }
            });
            return isAdmin;
        }
    })(OperationActivity = ROM.OperationActivity || (ROM.OperationActivity = {}));
})(ROM || (ROM = {}));
