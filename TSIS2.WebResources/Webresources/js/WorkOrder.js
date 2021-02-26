"use strict";
/* eslint-disable @typescript-eslint/triple-slash-reference */
var ROM;
(function (ROM) {
    var WorkOrder;
    (function (WorkOrder) {
        // EVENTS
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            switch (form.ui.getFormType()) {
                //Create
                case 1:
                    setDefaultFiscalYear(form);
                default:
                    break;
            }
            if (!userHasRole("ROM Manager") && !userHasRole("ROM Planner")) {
                form.getControl("ovs_revisedquarterid").setDisabled(true);
            }
            else {
                form.getControl("ovs_revisedquarterid").setDisabled(false);
            }
        }
        WorkOrder.onLoad = onLoad;
        function regionOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var regionAttribute = form.getAttribute("msdyn_serviceterritory");
                if (regionAttribute != null && regionAttribute != undefined) {
                    // Clear out all dependent fields' value
                    form.getAttribute("ovs_operationtypeid").setValue(null);
                    form.getAttribute("msdyn_billingaccount").setValue(null);
                    form.getAttribute("msdyn_serviceaccount").setValue(null);
                    // Disable all dependent fields
                    form.getControl("ovs_operationtypeid").setDisabled(true);
                    form.getControl("msdyn_billingaccount").setDisabled(true);
                    form.getControl("msdyn_serviceaccount").setDisabled(true);
                    // If previous fields have values, we use the filtered fetchxml in a custom lookup view
                    if (regionAttribute.getValue() != null && regionAttribute.getValue() != undefined) {
                        // Enable direct dependent field
                        form.getControl("ovs_operationtypeid").setDisabled(false);
                        // Setup a custom view
                        // This value is never saved and only needs to be unique among the other available views for the lookup.
                        var viewId = '{8982C38D-8BB4-4C95-BD05-493398FEAE98}';
                        var entityName = "ovs_operationtype";
                        var viewDisplayName = "Filtered Operation Types";
                        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"><entity name="ovs_operationtype"><attribute name="ovs_operationtypeid" /><attribute name="ovs_name" /><order attribute="ovs_name" descending="false" /><link-entity name="ovs_operation" from="ovs_operationtypeid" to="ovs_operationtypeid" link-type="inner" alias="al"><link-entity name="account" from="accountid" to="ovs_siteid" link-type="inner" alias="am"><filter type="and"><condition attribute="territoryid" operator="eq"  value="' + regionAttribute.getValue()[0].id + '" /></filter></link-entity></link-entity></entity></fetch>';
                        var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="ovs_operationtypeid"><cell name="ovs_name" width="200" /><cell name="owner" width="125" /></row></grid>';
                        form.getControl("ovs_operationtypeid").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        WorkOrder.regionOnChange = regionOnChange;
        function operationTypeOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var regionAttribute = form.getAttribute("msdyn_serviceterritory");
                var operationTypeAttribute = form.getAttribute("ovs_operationtypeid");
                if (operationTypeAttribute != null && operationTypeAttribute != undefined) {
                    // Clear out all dependent fields' value
                    form.getAttribute("msdyn_billingaccount").setValue(null);
                    form.getAttribute("msdyn_serviceaccount").setValue(null);
                    // Disable all dependent fields
                    form.getControl("msdyn_billingaccount").setDisabled(true);
                    form.getControl("msdyn_serviceaccount").setDisabled(true);
                    // If previous fields have values, we use the filtered fetchxml in a custom lookup view
                    if (regionAttribute.getValue() != null && regionAttribute.getValue() != undefined &&
                        operationTypeAttribute.getValue() != null && operationTypeAttribute.getValue() != undefined) {
                        // Enable direct dependent field
                        form.getControl("msdyn_billingaccount").setDisabled(false);
                        // Setup a custom view
                        // This value is never saved and only needs to be unique among the other available views for the lookup.
                        var viewId = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F659}';
                        var entityName = "account";
                        var viewDisplayName = "Filtered Regulated Entities";
                        var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="accountid"><cell name="name" width="200" /><cell name="owner" width="125" /></row></grid>';
                        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"><entity name="account"><attribute name="name" /><attribute name="accountid" /><order attribute="name" descending="false" /><filter type="and"><condition attribute="customertypecode" operator="eq" value="948010000" /></filter><link-entity name="ovs_operation" from="ovs_regulatedentityid" to="accountid" link-type="inner" alias="ag"><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttribute.getValue()[0].id + '" /></filter><link-entity name="account" from="accountid" to="ovs_siteid" link-type="inner" alias="ah"><filter type="and"><condition attribute="territoryid" operator="eq" value="' + regionAttribute.getValue()[0].id + '" /></filter></link-entity></link-entity></entity></fetch>';
                        form.getControl("msdyn_billingaccount").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        WorkOrder.operationTypeOnChange = operationTypeOnChange;
        function regulatedEntityOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var regionAttribute = form.getAttribute("msdyn_serviceterritory");
                var operationTypeAttribute = form.getAttribute("ovs_operationtypeid");
                var regulatedEntityAttribute = form.getAttribute("msdyn_billingaccount");
                if (regulatedEntityAttribute != null && regulatedEntityAttribute != undefined) {
                    // Clear out all dependent fields' value
                    form.getAttribute("msdyn_serviceaccount").setValue(null);
                    // Disable all dependent fields
                    form.getControl("msdyn_serviceaccount").setDisabled(true);
                    // If an operation type is selected, we use the filtered fetchxml, otherwise, disable and clear out the dependent fields
                    if (regionAttribute.getValue() != null && regionAttribute.getValue() != undefined &&
                        operationTypeAttribute.getValue() != null && operationTypeAttribute.getValue() != undefined &&
                        regulatedEntityAttribute.getValue() != null && regulatedEntityAttribute.getValue() != undefined) {
                        // Enable direct dependent field
                        form.getControl("msdyn_serviceaccount").setDisabled(false);
                        // Setup a custom view
                        // This value is never saved and only needs to be unique among the other available views for the lookup.
                        var viewId = '{6E57251F-F695-4076-9498-49AB892154B7}';
                        var entityName = "account";
                        var viewDisplayName = "Filtered Sites";
                        var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="accountid"><cell name="name" width="200" /><cell name="owner" width="125" /></row></grid>';
                        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"><entity name="account"><attribute name="name" /><attribute name="accountid" /><order attribute="name" descending="false" /><filter type="and"><condition attribute="customertypecode" operator="eq" value="948010001" /><condition attribute="territoryid" operator="eq" value="' + regionAttribute.getValue()[0].id + '" /></filter><link-entity name="ovs_operation" from="ovs_siteid" to="accountid" link-type="inner" alias="ab"><filter type="and"><condition attribute="ovs_operationtypeid" operator = "eq" value ="' + operationTypeAttribute.getValue()[0].id + '" /><condition attribute="ovs_regulatedentityid" operator="eq"  value="' + regulatedEntityAttribute.getValue()[0].id + '" /></filter></link-entity></entity></fetch>';
                        form.getControl("msdyn_serviceaccount").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                    }
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        WorkOrder.regulatedEntityOnChange = regulatedEntityOnChange;
        function fiscalYearOnchange(eContext) {
            //if new fiscal year is selected, then previous selection of quarter no longer corresponds
            removeSelectedFiscalQuarter(eContext);
        }
        WorkOrder.fiscalYearOnchange = fiscalYearOnchange;
        // FUNCTIONS
        function setDefaultFiscalYear(form) {
            XrmQuery.retrieveMultiple(function (x) { return x.tc_tcfiscalyears; })
                .select(function (x) { return [x.tc_name]; })
                .filter(function (x) { return Filter.equals(x.tc_iscurrentfiscalyear, true); })
                .execute(function (fiscalYears) {
                //should only return one fiscal year record as the current
                if (fiscalYears.length === 1) {
                    var targetedFiscalYear = fiscalYears[0];
                    var lookup = new Array();
                    lookup[0] = new Object();
                    lookup[0].id = targetedFiscalYear.tc_tcfiscalyearid;
                    lookup[0].name = targetedFiscalYear.tc_name;
                    lookup[0].entityType = 'tc_tcfiscalyear';
                    form.getAttribute('ovs_fiscalyear').setValue(lookup);
                }
                else {
                    // do not set a default if multiple records are found, error.
                }
            });
        }
        function removeSelectedFiscalQuarter(eContext) {
            var form = eContext.getFormContext();
            form.getAttribute('ovs_fiscalquarter').setValue(null);
        }
        function userHasRole(roleName) {
            var currentUserRoles = Xrm.Utility.getGlobalContext().userSettings.roles.get();
            for (var i = 0; i < currentUserRoles.length; i++) {
                var userRoleName = currentUserRoles[i].name;
                if (userRoleName == roleName) {
                    return true;
                }
            }
            return false;
        }
    })(WorkOrder = ROM.WorkOrder || (ROM.WorkOrder = {}));
})(ROM || (ROM = {}));
