"use strict";
/* eslint-disable @typescript-eslint/triple-slash-reference */
var ROM;
(function (ROM) {
    var WorkOrderQuickCreate;
    (function (WorkOrderQuickCreate) {
        // EVENTS
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            // Disable all operation related fields
            form.getControl("ovs_assetcategory").setDisabled(true);
            form.getControl("msdyn_primaryincidenttype").setDisabled(true);
            //Set required fields
            form.getAttribute("ovs_assetcategory").setRequiredLevel("required");
            // Set default value of Rationale to Unplanned
            var rationalLookUpValue = new Array();
            rationalLookUpValue[0] = new Object();
            rationalLookUpValue[0].id = "{47F438C7-C104-EB11-A813-000D3AF3A7A7}";
            rationalLookUpValue[0].name = "Unplanned";
            rationalLookUpValue[0].entityType = "ovs_tyrational";
            form.getAttribute("ovs_rational").setValue(rationalLookUpValue);
            // Show/Hide country field
            var regionAttribute = form.getAttribute("msdyn_serviceterritory");
            if (regionAttribute != null && regionAttribute != undefined) {
                var regionAttributeValue = regionAttribute.getValue();
                if (regionAttributeValue != null && regionAttributeValue != undefined) {
                    if (regionAttributeValue[0].id == "{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}") { //International
                        form.getControl("ts_country").setVisible(true);
                    }
                }
                else {
                    form.getControl("ts_country").setVisible(false);
                }
            }
        }
        WorkOrderQuickCreate.onLoad = onLoad;
        function regionOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var regionAttribute = form.getAttribute("msdyn_serviceterritory");
                if (regionAttribute != null && regionAttribute != undefined) {
                    var regionAttributeValue = regionAttribute.getValue();
                    if (regionAttributeValue != null && regionAttributeValue != undefined) {
                        if (regionAttributeValue[0].id == "{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}") { //International
                            form.getControl("ts_country").setVisible(true);
                        }
                    }
                    else {
                        form.getControl("ts_country").setVisible(false);
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        WorkOrderQuickCreate.regionOnChange = regionOnChange;
        function workOrderTypeOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var workOrderTypeAttribute = form.getAttribute("msdyn_workordertype");
                var stakeholderAttribute = form.getAttribute("msdyn_serviceaccount");
                var siteAttribute = form.getAttribute("ts_site");
                if (workOrderTypeAttribute != null && workOrderTypeAttribute != undefined &&
                    stakeholderAttribute != null && stakeholderAttribute != undefined &&
                    siteAttribute != null && siteAttribute != undefined) {
                    // Clear out & disable all dependent fields' value
                    if (!form.getControl("msdyn_primaryincidenttype").getDisabled() || form.getAttribute("msdyn_primaryincidenttype").getValue() != null) {
                        form.getAttribute("msdyn_primaryincidenttype").setValue(null);
                    }
                    if (!form.getControl("ovs_assetcategory").getDisabled() || form.getAttribute("ovs_assetcategory").getValue() != null) {
                        form.getAttribute("ovs_assetcategory").setValue(null);
                        form.getAttribute("ovs_asset").setValue(null);
                    }
                    form.getControl("msdyn_primaryincidenttype").setDisabled(true);
                    form.getControl("ovs_assetcategory").setDisabled(true);
                    var workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();
                    var stakeholderAttributeValue = stakeholderAttribute.getValue();
                    var siteAttributeValue = siteAttribute.getValue();
                    if (workOrderTypeAttributeValue != null && workOrderTypeAttributeValue != undefined &&
                        stakeholderAttributeValue != null && stakeholderAttributeValue != undefined &&
                        siteAttributeValue != null && siteAttributeValue != undefined) {
                        // Enable direct dependent field
                        form.getControl("ovs_assetcategory").setDisabled(false);
                        //Custom view: Filter Operation Type
                        var viewId = '{8982C38D-8BB4-4C95-BD05-493398FEAE99}';
                        var entityName = "msdyn_customerassetcategory";
                        var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredOperationTypes");
                        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"> <entity name="msdyn_customerassetcategory"> <attribute name="msdyn_name" /> <attribute name="msdyn_customerassetcategoryid" /> <order attribute="msdyn_name" descending="false" /> <filter type="and"> <condition attribute="ts_assetcategorytype" operator="eq" value="717750000" /> </filter> <link-entity name="msdyn_customerasset" from="msdyn_customerassetcategory" to="msdyn_customerassetcategoryid" link-type="inner" alias="aj"> <filter type="and"> <condition attribute="msdyn_account" operator="eq" value="' + stakeholderAttributeValue[0].id + '" /> <condition attribute="msdyn_functionallocation" operator="eq" value="' + siteAttributeValue[0].id + '" /> </filter> </link-entity> <link-entity name="msdyn_incidenttype" from="ts_operationtype" to="msdyn_customerassetcategoryid" link-type="inner" alias="ak"> <filter type="and"> <condition attribute="msdyn_defaultworkordertype" operator="eq" value="' + workOrderTypeAttributeValue[0].id + '" /> </filter> </link-entity> </entity> </fetch>';
                        var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="msdyn_customerassetcategoryid"><cell name="msdyn_name" width="200" /></row></grid>';
                        form.getControl("ovs_assetcategory").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        WorkOrderQuickCreate.workOrderTypeOnChange = workOrderTypeOnChange;
        function operationTypeOnChange(eContext) {
            try {
                var form_1 = eContext.getFormContext();
                var workOrderTypeAttribute = form_1.getAttribute("msdyn_workordertype");
                var operationTypeAttribute = form_1.getAttribute("ovs_assetcategory");
                var siteAttribute = form_1.getAttribute("ts_site");
                if (operationTypeAttribute != null && operationTypeAttribute != undefined) {
                    // Clear out & disable all dependent fields' value
                    if (!form_1.getControl("msdyn_primaryincidenttype").getDisabled() || form_1.getAttribute("msdyn_primaryincidenttype").getValue() != null) {
                        form_1.getAttribute("msdyn_primaryincidenttype").setValue(null);
                    }
                    form_1.getControl("msdyn_primaryincidenttype").setDisabled(true);
                    form_1.getAttribute("ovs_asset").setValue(null);
                    // If previous fields have values, we use the filtered fetchxml in a custom lookup view
                    var workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();
                    var operationTypeAttributeValue = operationTypeAttribute.getValue();
                    var siteAttributeValue = siteAttribute.getValue();
                    if (operationTypeAttributeValue != null && operationTypeAttributeValue != undefined &&
                        workOrderTypeAttributeValue != null && workOrderTypeAttributeValue != undefined &&
                        siteAttributeValue != null && siteAttributeValue != undefined) {
                        // Enable direct dependent field
                        form_1.getControl("msdyn_primaryincidenttype").setDisabled(false);
                        //Custom view for Activity Type
                        var viewIdActivity = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F661}';
                        var entityNameActivity = "msdyn_incidenttype";
                        var viewDisplayNameActivity = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredActivityType");
                        var fetchXmlActivity = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="msdyn_incidenttype"><attribute name="msdyn_name" /><attribute name="msdyn_incidenttypeid" /><order attribute="msdyn_name" descending="false" /><filter type="and"><condition attribute="ts_operationtype" operator="eq" value="' + operationTypeAttributeValue[0].id + '" /><condition attribute="msdyn_defaultworkordertype" operator="eq" value="' + workOrderTypeAttributeValue[0].id + '" /></filter></entity></fetch>';
                        var layoutXmlActivity = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_incidenttypeid"><cell name="msdyn_name" width="200" /></row></grid>';
                        form_1.getControl("msdyn_primaryincidenttype").addCustomView(viewIdActivity, entityNameActivity, viewDisplayNameActivity, fetchXmlActivity, layoutXmlActivity, true);
                        // Populate operation asset
                        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="msdyn_customerasset"><attribute name="msdyn_account" /><attribute name="msdyn_name" /><attribute name="msdyn_functionallocation" /><attribute name="msdyn_customerassetid" /><order attribute="msdyn_name" descending="true" /><filter type="and"><condition attribute="msdyn_customerassetcategory" operator="eq" value="' + operationTypeAttributeValue[0].id + '" /><condition attribute="msdyn_functionallocation" operator="eq" value="' + siteAttributeValue[0].id + '" /></filter></entity></fetch>';
                        var encodedFetchXml = encodeURIComponent(fetchXml);
                        Xrm.WebApi.retrieveMultipleRecords("msdyn_customerasset", "?fetchXml=" + encodedFetchXml).then(function success(result) {
                            if (result.entities.length == 1) {
                                var targetOperation = result.entities[0];
                                var lookup = new Array();
                                lookup[0] = new Object();
                                lookup[0].id = targetOperation.msdyn_customerassetid;
                                lookup[0].name = targetOperation.msdyn_name;
                                lookup[0].entityType = 'msdyn_customerasset';
                                form_1.getAttribute('ovs_asset').setValue(lookup);
                            }
                            else {
                                // do not set a default if multiple records are found, error.
                            }
                        });
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        WorkOrderQuickCreate.operationTypeOnChange = operationTypeOnChange;
    })(WorkOrderQuickCreate = ROM.WorkOrderQuickCreate || (ROM.WorkOrderQuickCreate = {}));
})(ROM || (ROM = {}));
