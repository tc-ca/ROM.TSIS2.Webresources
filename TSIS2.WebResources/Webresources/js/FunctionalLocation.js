"use strict";
var ROM;
(function (ROM) {
    var FunctionalLocation;
    (function (FunctionalLocation) {
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            var ownerAttribute = form.getAttribute("ownerid");
            if (ownerAttribute != null && ownerAttribute != undefined) {
                var ownerAttributeValue = ownerAttribute.getValue();
                if (ownerAttributeValue != null && ownerAttributeValue != undefined && ownerAttributeValue[0].entityType == "systemuser") {
                    var targetId = ownerAttributeValue[0].id.replace(/[{}]/g, "");
                    console.log("Type: " + ownerAttributeValue[0].entityType);
                    var isOffline = Xrm.Utility.getGlobalContext().client.getClientState() === "Offline";
                    if (isOffline) {
                        form.ui.setFormNotification("Offline: get system user ", "INFO", "offline-operation");
                        Xrm.WebApi.offline.retrieveRecord("systemuser", targetId, "?$select=_businessunitid_value").then(function success(result) {
                            Xrm.WebApi.offline.retrieveRecord("businessunit", result._businessunitid_value, "?$select=name").then(function success(result) {
                                form.getAttribute("ts_businessunit").setValue(result.name);
                                form.ui.setFormNotification("Offline: get BU ", "INFO", "offline-operation");
                            }, function (error) {
                                form.ui.setFormNotification("Offline: ERROR  " + JSON.stringify(error), "ERROR", "offline-error");
                            });
                        }, function (error) {
                            form.ui.setFormNotification("Offline: ERROR  " + JSON.stringify(error), "ERROR", "offline-error");
                        });
                    }
                    else {
                        Xrm.WebApi.retrieveRecord("systemuser", targetId, "?$select=_businessunitid_value").then(function success(result) {
                            Xrm.WebApi.retrieveRecord("businessunit", result._businessunitid_value, "?$select=name").then(function success(result) {
                                form.getAttribute("ts_businessunit").setValue(result.name);
                            }, function (error) {
                                form.ui.setFormNotification("Online: ERROR get BU - " + JSON.stringify(error), "ERROR", "online-error");
                            });
                        }, function (error) {
                            form.ui.setFormNotification("Online: ERROR  get user - " + JSON.stringify(error), "ERROR", "online-error");
                        });
                    }
                }
                //If site type is aerodrome, show ICAO and IATA fields
                //If Region is not International, show Class field
                var siteTypeAttribute = form.getAttribute("ts_sitetype");
                if (siteTypeAttribute != null) {
                    var siteTypeAttributeValue = form.getAttribute("ts_sitetype").getValue();
                    if (siteTypeAttributeValue != null) {
                        if (siteTypeAttributeValue[0].name == "Aerodrome") {
                            form.getControl("ts_icaocode").setVisible(true);
                            form.getControl("ts_iatacode").setVisible(true);
                            var regionAttributeValue = form.getAttribute("ts_region").getValue();
                            if (regionAttributeValue != null)
                                if (regionAttributeValue[0].name != "International") {
                                    form.getControl("ts_class").setVisible(true);
                                }
                        }
                    }
                }
                //If owner is ISSO, replace operations view
                if (ownerAttributeValue != null) {
                    if (ownerAttributeValue[0].name == "Intermodal Surface Security Oversight (ISSO)") {
                        var operationView = {
                            entityType: "savedquery",
                            id: "{4361bdce-d4ae-ec11-983e-002248ade910}",
                            name: "Active Operations ISSO (Site)"
                        };
                        form.getControl("Operations").getViewSelector().setCurrentView(operationView);
                        form.getControl("ts_siteriskrating").setVisible(false);
                    }
                }
                //If owner is Aviation Security
                if (ownerAttributeValue != null) {
                    if (ownerAttributeValue[0].name && ownerAttributeValue[0].name.toLowerCase().includes("aviation security".toLowerCase())) {
                        form.ui.tabs.get("tab_Risk").setVisible(true);
                        form.getControl("ts_accountableteam").setVisible(true);
                        form.getAttribute("ts_accountableteam").setRequiredLevel("required");
                    }
                    else {
                        form.ui.tabs.get("tab_Risk").setVisible(false);
                    }
                }
            }
            if (form.getAttribute("ts_statusstartdate").getValue() != null) {
                form.getControl("ts_statusenddate").setDisabled(false);
                form.getControl("ts_description").setDisabled(false);
                form.getAttribute("ts_description").setRequiredLevel("required");
            }
            riskScoreVisibility(form);
            siteTypesVisibility(eContext);
            //Lock for non Admin users
            if (!userHasRole("System Administrator|ROM - Business Admin")) {
                form.getControl("msdyn_name").setDisabled(true);
                form.getControl("ts_functionallocationnameenglish").setDisabled(true);
                form.getControl("ts_functionallocationnamefrench").setDisabled(true);
            }
        }
        FunctionalLocation.onLoad = onLoad;
        function onSave(eContext) {
            var form = eContext.getFormContext();
            var statusStartDateValue = form.getAttribute("ts_statusstartdate").getValue();
            var statusEndDateValue = form.getAttribute("ts_statusenddate").getValue();
            if (statusStartDateValue != null) {
                if (Date.parse(statusStartDateValue.toDateString()) <= Date.parse(new Date(Date.now()).toDateString())) {
                    form.getAttribute("ts_sitestatus").setValue(717750001 /* ts_sitestatus.NonOperational */);
                }
            }
            if (statusEndDateValue != null) {
                if (Date.parse(statusEndDateValue.toDateString()) <= Date.parse(new Date(Date.now()).toDateString())) {
                    form.getAttribute("ts_sitestatus").setValue(717750000 /* ts_sitestatus.Operational */);
                }
            }
        }
        FunctionalLocation.onSave = onSave;
        function siteTypeOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var siteTypeAttribute = form.getAttribute("ts_sitetype");
                var icaoCodeAttribute = form.getAttribute("ts_icaocode");
                var iataCodeAttribute = form.getAttribute("ts_iatacode");
                var classAttribute = form.getAttribute("ts_class");
                if (siteTypeAttribute != null && siteTypeAttribute != undefined) {
                    var siteTypeAttributeValue = siteTypeAttribute.getValue();
                    if (siteTypeAttributeValue != null && siteTypeAttributeValue != undefined) {
                        if (siteTypeAttributeValue[0].id == "{99DA31E7-7D78-EB11-A812-0022486D697D}") { //aerodrome
                            form.getControl("ts_icaocode").setVisible(true);
                            form.getControl("ts_iatacode").setVisible(true);
                            var regionAttributeValue = form.getAttribute("ts_region").getValue();
                            if (regionAttributeValue != null) {
                                if (regionAttributeValue[0].name != "International") {
                                    form.getControl("ts_class").setVisible(true);
                                }
                                else {
                                    classAttribute.setValue() == null;
                                    form.getControl("ts_class").setVisible(false);
                                }
                            }
                            else {
                                form.getControl("ts_class").setVisible(true);
                            }
                        }
                        else {
                            icaoCodeAttribute.setValue() == null;
                            iataCodeAttribute.setValue() == null;
                            classAttribute.setValue() == null;
                            form.getControl("ts_icaocode").setVisible(false);
                            form.getControl("ts_iatacode").setVisible(false);
                            form.getControl("ts_class").setVisible(false);
                        }
                    }
                    else {
                        icaoCodeAttribute.setValue() == null;
                        iataCodeAttribute.setValue() == null;
                        classAttribute.setValue() == null;
                        form.getControl("ts_icaocode").setVisible(false);
                        form.getControl("ts_iatacode").setVisible(false);
                        form.getControl("ts_class").setVisible(false);
                    }
                }
                siteTypesVisibility(eContext);
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        FunctionalLocation.siteTypeOnChange = siteTypeOnChange;
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
                form.getAttribute("ts_statusenddate").setValue(null);
                form.getControl("ts_statusenddate").setDisabled(true);
                form.getControl("ts_description").setDisabled(true);
            }
        }
        FunctionalLocation.statusStartDateOnChange = statusStartDateOnChange;
        function regionOnChange(eContext) {
            var form = eContext.getFormContext();
            var regionAttributeValue = form.getAttribute("ts_region").getValue();
            var classAttribute = form.getAttribute("ts_class");
            var siteTypeAttributeValue = form.getAttribute("ts_sitetype").getValue();
            if (siteTypeAttributeValue != null) {
                if (siteTypeAttributeValue[0].id == "{99DA31E7-7D78-EB11-A812-0022486D697D}")
                    if (regionAttributeValue != null) {
                        if (regionAttributeValue[0].name != "International") { //aerodrome and not International
                            form.getControl("ts_class").setVisible(true);
                        }
                        else {
                            classAttribute.setValue(null);
                            form.getControl("ts_class").setVisible(false);
                        }
                    }
                    else {
                        form.getControl("ts_class").setVisible(true);
                    }
            }
            else {
                classAttribute.setValue(null);
                form.getControl("ts_class").setVisible(false);
            }
        }
        FunctionalLocation.regionOnChange = regionOnChange;
        //Shows the Risk Score field only when the Class is 2 or 3
        function riskScoreVisibility(form) {
            var siteClass = form.getAttribute("ts_class").getValue();
            if (siteClass == 717750002 /* ts_msdyn_functionallocation_ts_class._2 */ || siteClass == 717750003 /* ts_msdyn_functionallocation_ts_class._3 */) {
                form.getControl("ts_riskscore").setVisible(true);
                form.getControl("ts_lpdtounitedstates").setVisible(true);
            }
            else {
                form.getControl("ts_riskscore").setVisible(false);
                form.getControl("ts_lpdtounitedstates").setVisible(false);
            }
        }
        function siteTypesVisibility(eContext) {
            var form = eContext.getFormContext();
            var siteType = form.getAttribute("ts_sitetype").getValue();
            if (siteType != null) {
                form.getControl("ts_sitetype2").setVisible(true);
                var siteType2 = form.getAttribute("ts_sitetype2").getValue();
                if (siteType2 != null) {
                    form.getControl("ts_sitetype3").setVisible(true);
                }
                else {
                    form.getControl("ts_sitetype3").setVisible(false);
                }
            }
            else {
                form.getControl("ts_sitetype2").setVisible(false);
                form.getControl("ts_sitetype3").setVisible(false);
            }
        }
        FunctionalLocation.siteTypesVisibility = siteTypesVisibility;
        function classOnChange(eContext) {
            var form = eContext.getFormContext();
            riskScoreVisibility(form);
        }
        FunctionalLocation.classOnChange = classOnChange;
        function userHasRole(rolesName) {
            var userRoles = Xrm.Utility.getGlobalContext().userSettings.roles;
            var hasRole = false;
            var roles = rolesName.split("|");
            roles.forEach(function (roleItem) {
                userRoles.forEach(function (userRoleItem) {
                    if (userRoleItem.name.toLowerCase() == roleItem.toLowerCase())
                        hasRole = true;
                });
            });
            return hasRole;
        }
        FunctionalLocation.userHasRole = userHasRole;
        function onOwnerChange(eContext) {
            var form = eContext.getFormContext();
            // Get the owner field value
            var ownerAttributeValue = form.getAttribute("ownerid").getValue();
            // If owner is Aviation Security, make the ts_accountableteam field required and visible
            if (ownerAttributeValue != null) {
                if (ownerAttributeValue[0].name && ownerAttributeValue[0].name.toLowerCase().includes("aviation security".toLowerCase())) {
                    form.getControl("ts_accountableteam").setVisible(true);
                    form.getAttribute("ts_accountableteam").setRequiredLevel("required");
                }
                else {
                    form.getControl("ts_accountableteam").setVisible(false);
                    form.getAttribute("ts_accountableteam").setRequiredLevel("none");
                }
            }
            else {
                // If owner is null, hide and unrequire the ts_accountableteam field
                form.getControl("ts_accountableteam").setVisible(false);
                form.getAttribute("ts_accountableteam").setRequiredLevel("none");
                form.getAttribute("ts_accountableteam").setValue(null);
            }
        }
        FunctionalLocation.onOwnerChange = onOwnerChange;
    })(FunctionalLocation = ROM.FunctionalLocation || (ROM.FunctionalLocation = {}));
})(ROM || (ROM = {}));
