"use strict";
var ROM;
(function (ROM) {
    var PlanningData;
    (function (PlanningData) {
        function onLoad(eContext) {
            var formContext = eContext.getFormContext();
            if (formContext.ui.getFormType() == 2) { //Update type. The form has already been saved for the first time
                formContext.getControl("ts_fiscalyear").setDisabled(true);
                formContext.getControl("ts_name").setDisabled(true);
                formContext.getControl("ts_teamplanningdata").setDisabled(true);
                if (formContext.getAttribute("ts_dueq1").getValue != null) {
                    formContext.getControl("ts_dueq1").setDisabled(true);
                }
                if (formContext.getAttribute("ts_dueq2").getValue != null) {
                    formContext.getControl("ts_dueq2").setDisabled(true);
                }
                if (formContext.getAttribute("ts_dueq3").getValue != null) {
                    formContext.getControl("ts_dueq3").setDisabled(true);
                }
                if (formContext.getAttribute("ts_dueq4").getValue != null) {
                    formContext.getControl("ts_dueq4").setDisabled(true);
                }
                if (formContext.getAttribute("ts_operationactivity").getValue() != null) {
                    formContext.getControl("ts_operationactivity").setDisabled(true);
                }
                if (formContext.getAttribute("ts_target").getValue() == null) {
                    formContext.getControl("ts_target").setDisabled(false);
                }
                else if (userHasRole("System Administrator|ROM - Business Admin")) {
                    formContext.getControl("ts_target").setDisabled(false);
                }
                var planningDataId = formContext.data.entity.getId();
                var teamPlanningDataFetchXML = [
                    "<fetch>",
                    "<entity name='ts_teamplanningdata'>",
                    "<link-entity name = 'ts_planningdata' from = 'ts_teamplanningdata' to = 'ts_teamplanningdataid' link-type='inner' alias = 'ag'>",
                    "<filter type='and'>",
                    "<condition attribute='ts_planningdataid' operator = 'eq' value='", planningDataId, "'/>",
                    "</filter>",
                    "</link-entity>",
                    "</entity>",
                    "</fetch>"
                ].join("");
                teamPlanningDataFetchXML = "?fetchXml=" + encodeURIComponent(teamPlanningDataFetchXML);
                Xrm.WebApi.retrieveMultipleRecords("ts_teamplanningdata", teamPlanningDataFetchXML).then(function (result) {
                    if (result.entities[0].ts_planstatus == 741130001) {
                        disableFormFields(eContext);
                    }
                    ;
                });
            }
            else if (formContext.ui.getFormType() == 1) {
                formContext.getControl("ts_target").setDisabled(false);
            }
            if (formContext.getAttribute("ts_generationlog").getValue() == null) {
                formContext.getControl("ts_generationlog").setVisible(false);
            }
        }
        PlanningData.onLoad = onLoad;
        function plannedOnChange(eContext) {
            setNullQuarterValueToZero(eContext);
        }
        PlanningData.plannedOnChange = plannedOnChange;
        function siteOnChange(eContext) {
            var form = eContext.getFormContext();
            var operationTypeAttribute = form.getAttribute("ts_operationtype");
            var stakeholderAttribute = form.getAttribute("ts_stakeholder");
            var siteAttribute = form.getAttribute("ts_site");
            if (siteAttribute != null && siteAttribute != undefined) {
                // Clear out operation and subsite value if not already empty
                if (form.getAttribute("ts_operation").getValue() != null)
                    form.getAttribute("ts_operation").setValue(null);
                // If an operation type is selected, we use the filtered fetchxml, otherwise, disable and clear out the dependent fields
                var operationTypeAttributeValue = operationTypeAttribute.getValue();
                var stakeholderAttributeValue = stakeholderAttribute.getValue();
                var siteAttributeValue = siteAttribute.getValue();
                //const workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();
                if (siteAttributeValue != null && siteAttributeValue != undefined &&
                    stakeholderAttributeValue != null && stakeholderAttributeValue != undefined &&
                    operationTypeAttributeValue != null && operationTypeAttributeValue != undefined) {
                    // Populate operation asset
                    var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="ovs_operation"><attribute name="ovs_name"/><attribute name="ts_stakeholder"/><attribute name="ts_site"/><attribute name="ovs_operationid"/><attribute name="ts_operationalstatus"/><attribute name="ts_subsite"/><attribute name="ts_subsubsite"/><order attribute="ovs_name" descending="true"/><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeValue[0].id + '"/><condition attribute="ts_site" operator="eq" value="' + siteAttributeValue[0].id + '"/><condition attribute="ts_stakeholder" operator="eq" value="' + stakeholderAttributeValue[0].id + '"/></filter></entity></fetch>';
                    var encodedFetchXml = encodeURIComponent(fetchXml);
                    Xrm.WebApi.retrieveMultipleRecords("ovs_operation", "?fetchXml=" + encodedFetchXml).then(function success(result) {
                        if (result.entities.length == 1) {
                            var targetOperation = result.entities[0];
                            var lookup = new Array();
                            lookup[0] = new Object();
                            lookup[0].id = targetOperation.ovs_operationid;
                            lookup[0].name = targetOperation.ovs_name;
                            lookup[0].entityType = 'ovs_operation';
                            if (targetOperation.ts_operationalstatus == 717750001) {
                                form.ui.setFormNotification((Xrm.Utility.getGlobalContext().userSettings.languageId == 1033 ? "The operation \"" + targetOperation.ovs_name + "\" is non-operational." : "L'opération \"" + targetOperation.ovs_name + "\" est  non opérationnelle."), "ERROR", "non-operational-operation");
                                form.getAttribute('ts_site').setValue(null);
                            }
                            else {
                                form.ui.clearFormNotification("non-operational-operation");
                                form.getAttribute('ts_operation').setValue(lookup);
                                //if (targetOperation._ts_subsite_value) {
                                //    var lookupSubsite = new Array();
                                //    lookupSubsite[0] = new Object();
                                //    lookupSubsite[0].id = targetOperation._ts_subsite_value;
                                //    lookupSubsite[0].name = targetOperation["_ts_subsite_value@OData.Community.Display.V1.FormattedValue"];
                                //    lookupSubsite[0].entityType = 'msdyn_functionallocation';
                                //    form.getAttribute('ts_subsite').setValue(lookupSubsite);
                                //}
                                //if (targetOperation._ts_subsubsite_value) {
                                //    var lookupSubsubsite = new Array();
                                //    lookupSubsubsite[0] = new Object();
                                //    lookupSubsubsite[0].id = targetOperation._ts_subsubsite_value;
                                //    lookupSubsubsite[0].name = targetOperation["_ts_subsubsite_value@OData.Community.Display.V1.FormattedValue"];
                                //    lookupSubsubsite[0].entityType = 'msdyn_functionallocation';
                                //    form.getAttribute('ts_subsubsite').setValue(lookupSubsubsite);
                                //}
                            }
                        }
                        else {
                            // do not set a default if multiple records are found
                        }
                    }, function (error) {
                        console.log(error.message);
                    });
                    //Check if any subsites exists and only show the field if it's the case
                    //const fetchXmlToCheckForSubSites = '<fetch no-lock="false" returntotalrecordcount="true" page="1" count="25"><entity name="msdyn_functionallocation"><attribute name="statecode"/><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><filter><condition attribute="msdyn_functionallocationid" operator="under" value="' + siteAttributeValue[0].id + '"/></filter><order attribute="msdyn_name" descending="false"/><link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="msdyn_parentfunctionallocation" alias="bb"><filter type="and"><condition attribute="msdyn_functionallocationid" operator="eq" uitype="msdyn_functionallocation" value="' + siteAttributeValue[0].id + '"/></filter></link-entity></entity></fetch>';
                    //encodedFetchXml = encodeURIComponent(fetchXmlToCheckForSubSites);
                    //only retrieve SubSites with Operations under Stakeholders
                    /*
                    var targetSubSiteIds = "";
                    var checkOtherSubSites = true;
                    const fetchOperationsWithSiteAndStakeholder = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="ovs_operation"><attribute name="ovs_name" /><attribute name="ts_subsite"/><attribute name="ts_subsubsite"/><attribute name="createdon" /><attribute name="ovs_operationtypeid" /><attribute name="ovs_operationid" />     <order attribute="ovs_name" descending="false" /><filter type="and"><condition attribute="statecode" operator="eq" value="0" /><condition attribute="ts_stakeholder" operator="eq" uitype="account" value="' + stakeholderAttributeValue[0].id + '" /> <condition attribute="ts_site" operator="eq"  uitype="msdyn_functionallocation" value="' + siteAttributeValue[0].id + '" /><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeValue[0].id + '"/></filter></entity></fetch>';
                    var encodedFetchXmlOperationsWithSiteAndStakeholder = encodeURIComponent(fetchOperationsWithSiteAndStakeholder);
                    Xrm.WebApi.retrieveMultipleRecords("ovs_operation", "?fetchXml=" + encodedFetchXmlOperationsWithSiteAndStakeholder).then(
                        function success(result) {
                            if (result.entities.length > 0) {
                                var counter = 0;
                                result.entities.forEach(function (item) {
                                    var subSiteId = item["_ts_subsite_value"];
                                    if (subSiteId != undefined) {
                                        targetSubSiteIds += "<value>" + subSiteId + "</value>";
                                        counter++;
                                    }
                                });
    
                                if (targetSubSiteIds != "") {
                                    checkOtherSubSites = false;
                                    form.getControl('ts_subsite').setDisabled(false);
                                    //form.getControl('ts_subsite').setVisible(true);
                                    form.getAttribute("ts_subsite").setRequiredLevel("required");
                                    var viewId = '{1B59589F-F122-5428-4771-79BC925240C3}';
                                    var entityName = "msdyn_functionallocation";
                                    var activityTypeFetchXml = '<fetch no-lock="false"><entity name="msdyn_functionallocation"><attribute name="statecode"/><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><filter><condition attribute="msdyn_functionallocationid" operator="in">' + targetSubSiteIds + '</condition></filter><order attribute="msdyn_name" descending="false"/></entity></fetch>';
                                    var layoutXml = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="200" /></row></grid>';
                                    form.getControl("ts_subsite").addCustomView(viewId, entityName, "FilteredSites", activityTypeFetchXml, layoutXml, true);
                                }
                            }
                            if (checkOtherSubSites) {
                                form.getAttribute("ts_subsite").setValue(null);
                                //form.getControl('ts_subsite').setVisible(false);
                                form.getAttribute("ts_subsite").setRequiredLevel("none");
                                form.getAttribute("ts_subsubsite").setValue(null);
                                //form.getControl('ts_subsubsite').setVisible(false);
                                form.getAttribute("ts_subsubsite").setRequiredLevel("none");
                            }
                        },
                        function (error) {
                            console.log(error.message);
                        }
                    );
                    */
                }
                else {
                    //form.getAttribute("ts_subsite").setValue(null);
                    //form.getControl('ts_subsite').setVisible(false);
                    //form.getAttribute("ts_subsite").setRequiredLevel("none");
                    //form.getAttribute("ts_subsubsite").setValue(null);
                    //form.getControl('ts_subsubsite').setVisible(false);
                    //form.getAttribute("ts_subsubsite").setRequiredLevel("none");
                }
            }
        }
        PlanningData.siteOnChange = siteOnChange;
        function subSiteOnChange(eContext) {
            var form = eContext.getFormContext();
            var operationTypeAttribute = form.getAttribute("ts_operationtype");
            var stakeholderAttribute = form.getAttribute("ts_stakeholder");
            var siteAttribute = form.getAttribute("ts_site");
            var subSiteAttribute = form.getAttribute("ts_subsite");
            //const workOrderTypeAttribute = form.getAttribute("msdyn_workordertype");
            if (siteAttribute != null && siteAttribute != undefined && subSiteAttribute != null && subSiteAttribute != undefined) {
                if (form.getAttribute("ts_operation").getValue() != null)
                    form.getAttribute("ts_operation").setValue(null);
                // If an operation type is selected, we use the filtered fetchxml, otherwise, disable and clear out the dependent fields
                var operationTypeAttributeValue = operationTypeAttribute.getValue();
                var stakeholderAttributeValue = stakeholderAttribute.getValue();
                var siteAttributeValue = siteAttribute.getValue();
                var subSiteAttributeValue = subSiteAttribute.getValue();
                // const workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();
                if (siteAttributeValue != null && siteAttributeValue != undefined &&
                    subSiteAttributeValue != null && subSiteAttributeValue != undefined &&
                    stakeholderAttributeValue != null && stakeholderAttributeValue != undefined &&
                    operationTypeAttributeValue != null && operationTypeAttributeValue != undefined) {
                    // Populate operation asset
                    var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="ovs_operation"><attribute name="ovs_name"/><attribute name="ts_stakeholder"/><attribute name="ts_site"/><attribute name="ovs_operationid"/><attribute name="ts_operationalstatus"/><order attribute="ovs_name" descending="true"/><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeValue[0].id + '"/><condition attribute="ts_site" operator="eq" value="' + siteAttributeValue[0].id + '"/><condition attribute="ts_stakeholder" operator="eq" value="' + stakeholderAttributeValue[0].id + '"/><condition attribute="ts_subsite" operator="eq" value="' + subSiteAttributeValue[0].id + '"/></filter></entity></fetch>';
                    var encodedFetchXml = encodeURIComponent(fetchXml);
                    Xrm.WebApi.retrieveMultipleRecords("ovs_operation", "?fetchXml=" + encodedFetchXml).then(function success(result) {
                        if (result.entities.length == 1) {
                            var targetOperation = result.entities[0];
                            var lookup = new Array();
                            lookup[0] = new Object();
                            lookup[0].id = targetOperation.ovs_operationid;
                            lookup[0].name = targetOperation.ovs_name;
                            lookup[0].entityType = 'ovs_operation';
                            if (targetOperation.ts_operationalstatus == 717750001) {
                                form.ui.setFormNotification((Xrm.Utility.getGlobalContext().userSettings.languageId == 1033 ? "The operation \"" + targetOperation.ovs_name + "\" is non-operational." : "L'opération \"" + targetOperation.ovs_name + "\" est  non opérationnelle."), "ERROR", "non-operational-operation");
                                form.getAttribute('ts_site').setValue(null);
                            }
                            else {
                                form.ui.clearFormNotification("non-operational-operation");
                                form.getAttribute('ts_operation').setValue(lookup);
                            }
                            //setActivityTypeFilteredView(form, lookup[0].id, workOrderTypeAttributeValue[0].id, operationTypeAttributeValue[0].id);
                        }
                        else {
                            // do not set a default if multiple records are found.
                        }
                    }, function (error) {
                        console.log(error.message);
                    });
                    //Check if any Sub-subsites exists and only show the field if it's the case
                    //const fetchXmlToCheckForSubSites = '<fetch no-lock="false" returntotalrecordcount="true" page="1" count="25"><entity name="msdyn_functionallocation"><attribute name="statecode"/><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><filter><condition attribute="msdyn_functionallocationid" operator="under" value="' + siteAttributeValue[0].id + '"/></filter><order attribute="msdyn_name" descending="false"/><link-entity name="msdyn_functionallocation" from="msdyn_functionallocationid" to="msdyn_parentfunctionallocation" alias="bb"><filter type="and"><condition attribute="msdyn_functionallocationid" operator="eq" uitype="msdyn_functionallocation" value="' + siteAttributeValue[0].id + '"/></filter></link-entity></entity></fetch>';
                    //encodedFetchXml = encodeURIComponent(fetchXmlToCheckForSubSites);
                    //only retrieve SubSites with Operations under Stakeholders
                    var targetSubSiteIds = "";
                    var checkOtherSubSites = true;
                    var fetchOperationsWithSiteAndStakeholder = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="ovs_operation"><attribute name="ovs_name" /><attribute name="ts_subsite"/><attribute name="ts_subsubsite"/><attribute name="createdon" /><attribute name="ovs_operationtypeid" /><attribute name="ovs_operationid" />     <order attribute="ovs_name" descending="false" /><filter type="and"><condition attribute="statecode" operator="eq" value="0" /><condition attribute="ts_stakeholder" operator="eq" uitype="account" value="' + stakeholderAttributeValue[0].id + '" /> <condition attribute="ts_site" operator="eq"  uitype="msdyn_functionallocation" value="' + siteAttributeValue[0].id + '" /><condition attribute="ts_subsite" operator="eq"  uitype="msdyn_functionallocation" value="' + subSiteAttributeValue[0].id + '" /><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeValue[0].id + '"/></filter></entity></fetch>';
                    var encodedFetchXmlOperationsWithSiteAndStakeholder = encodeURIComponent(fetchOperationsWithSiteAndStakeholder);
                    Xrm.WebApi.retrieveMultipleRecords("ovs_operation", "?fetchXml=" + encodedFetchXmlOperationsWithSiteAndStakeholder).then(function success(result) {
                        if (result.entities.length > 0) {
                            var subCounter = 0;
                            result.entities.forEach(function (item) {
                                var subSiteId = item["_ts_subsubsite_value"];
                                if (subSiteId != undefined) {
                                    targetSubSiteIds += "<value>" + subSiteId + "</value>";
                                    subCounter++;
                                }
                            });
                            if (targetSubSiteIds != "") {
                                checkOtherSubSites = false;
                                form.getControl('ts_subsubsite').setDisabled(false);
                                //form.getControl('ts_subsubsite').setVisible(true);
                                form.getAttribute("ts_subsubsite").setRequiredLevel("required");
                                var viewId = '{1B59589F-F122-5428-4771-79BC925240C4}';
                                var entityName = "msdyn_functionallocation";
                                //var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredSites");
                                var activityTypeFetchXml = '<fetch no-lock="false"><entity name="msdyn_functionallocation"><attribute name="statecode"/><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><filter><condition attribute="msdyn_functionallocationid" operator="in">' + targetSubSiteIds + '</condition></filter><order attribute="msdyn_name" descending="false"/></entity></fetch>';
                                //debugger;
                                //var msgTxt = subCounter + " operations found for the selected site and stakeholder!.";
                                //form.ui.clearFormNotification("hasOperation");
                                //form.ui.setFormNotification(msgTxt, "INFO", "hasOperation"); //INFO
                                var layoutXml = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="200" /></row></grid>';
                                form.getControl("ts_subsubsite").addCustomView(viewId, entityName, "FilteredSites", activityTypeFetchXml, layoutXml, true);
                            }
                        }
                        if (checkOtherSubSites) {
                            //No operation found for Sub-subsite
                            form.getAttribute("ts_subsubsite").setValue(null);
                            form.getControl('ts_subsubsite').setDisabled(true);
                            //form.getControl('ts_subsubsite').setVisible(false);
                            form.getAttribute("ts_subsubsite").setRequiredLevel("none");
                        }
                    }, function (error) {
                        console.log(error.message);
                    });
                }
                else {
                    form.getAttribute("ts_subsubsite").setValue(null);
                    form.getControl('ts_subsubsite').setDisabled(true);
                    form.getAttribute("ts_subsubsite").setRequiredLevel("none");
                }
            }
        }
        PlanningData.subSiteOnChange = subSiteOnChange;
        function subSubSiteOnChange(eContext) {
            var form = eContext.getFormContext();
            var operationTypeAttribute = form.getAttribute("ts_operationtype");
            var stakeholderAttribute = form.getAttribute("ts_stakeholder");
            var siteAttribute = form.getAttribute("ts_site");
            var subSiteAttribute = form.getAttribute("ts_subsite");
            var subSubSiteAttribute = form.getAttribute("ts_subsubsite");
            //const workOrderTypeAttribute = form.getAttribute("msdyn_workordertype");
            if (siteAttribute != null && siteAttribute != undefined && subSiteAttribute != null && subSiteAttribute != undefined && subSubSiteAttribute != null && subSubSiteAttribute != undefined) {
                // Clear out operation and subsite value if not already empty
                if (form.getAttribute("ts_operation").getValue() != null)
                    form.getAttribute("ts_operation").setValue(null);
                // If an operation type is selected, we use the filtered fetchxml, otherwise, disable and clear out the dependent fields
                var operationTypeAttributeValue = operationTypeAttribute.getValue();
                var stakeholderAttributeValue = stakeholderAttribute.getValue();
                var siteAttributeValue = siteAttribute.getValue();
                var subSiteAttributeValue = subSiteAttribute.getValue();
                var subSubSiteAttributeValue = subSubSiteAttribute.getValue();
                //const workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();
                if (siteAttributeValue != null && siteAttributeValue != undefined &&
                    subSiteAttributeValue != null && subSiteAttributeValue != undefined &&
                    subSubSiteAttributeValue != null && subSubSiteAttributeValue != undefined &&
                    stakeholderAttributeValue != null && stakeholderAttributeValue != undefined &&
                    operationTypeAttributeValue != null && operationTypeAttributeValue != undefined) {
                    // Populate operation asset
                    var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="ovs_operation"><attribute name="ovs_name"/><attribute name="ts_stakeholder"/><attribute name="ts_site"/><attribute name="ovs_operationid"/><attribute name="ts_operationalstatus"/><order attribute="ovs_name" descending="true"/><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttributeValue[0].id + '"/><condition attribute="ts_site" operator="eq" value="' + siteAttributeValue[0].id + '"/><condition attribute="ts_stakeholder" operator="eq" value="' + stakeholderAttributeValue[0].id + '"/><condition attribute="ts_subsite" operator="eq" value="' + subSiteAttributeValue[0].id + '"/><condition attribute="ts_subsubsite" operator="eq" value="' + subSubSiteAttributeValue[0].id + '"/></filter></entity></fetch>';
                    var encodedFetchXml = encodeURIComponent(fetchXml);
                    Xrm.WebApi.retrieveMultipleRecords("ovs_operation", "?fetchXml=" + encodedFetchXml).then(function success(result) {
                        if (result.entities.length == 1) {
                            var targetOperation = result.entities[0];
                            var lookup = new Array();
                            lookup[0] = new Object();
                            lookup[0].id = targetOperation.ovs_operationid;
                            lookup[0].name = targetOperation.ovs_name;
                            lookup[0].entityType = 'ovs_operation';
                            if (targetOperation.ts_operationalstatus == 717750001) {
                                form.ui.clearFormNotification("sub-non-operational-operation");
                                form.ui.setFormNotification((Xrm.Utility.getGlobalContext().userSettings.languageId == 1033 ? "The operation \"" + targetOperation.ovs_name + "\" is non-operational." : "L'opération \"" + targetOperation.ovs_name + "\" est  non opérationnelle."), "ERROR", "sub-non-operational-operation");
                                form.getAttribute('ts_site').setValue(null);
                            }
                            else {
                                form.ui.clearFormNotification("sub-non-operational-operation");
                                form.getAttribute('ts_operation').setValue(lookup);
                            }
                            //setActivityTypeFilteredView(form, lookup[0].id, workOrderTypeAttributeValue[0].id, operationTypeAttributeValue[0].id);
                        }
                        else {
                            //form.ui.clearFormNotification("closedSubSubProject")
                            //form.ui.setFormNotification("No operation matching the selected Sub subsite, Operation Type and Stakeholder!.", "WARNING", "closedSubSubProject");//ERROR
                        }
                    }, function (error) {
                        console.log(error.message);
                    });
                }
            }
        }
        PlanningData.subSubSiteOnChange = subSubSiteOnChange;
        function setNullQuarterValueToZero(eContext) {
            var nameAttr = eContext.getEventSource();
            console.log("setNullQuarterValueToZero: eContext value:", eContext);
            if (!nameAttr || nameAttr.getName() == undefined) {
                console.error("setNullQuarterValueToZero: nameAttr.getName() is null.");
                return;
            }
            if (nameAttr.getName() == "ts_plannedq1" || nameAttr.getName() == "ts_plannedq2" || nameAttr.getName() == "ts_plannedq3" || nameAttr.getName() == "ts_plannedq4") {
                if (nameAttr.getValue() == null) {
                    nameAttr.setValue(0);
                }
            }
        }
        function disableFormFields(eContext) {
            var form = eContext.getFormContext();
            form.ui.controls.forEach(function (control, index) {
                var controlType = control.getControlType();
                if (controlType != "iframe" && controlType != "webresource" && controlType != "subgrid") {
                    control.setDisabled(true);
                }
            });
        }
    })(PlanningData = ROM.PlanningData || (ROM.PlanningData = {}));
})(ROM || (ROM = {}));
