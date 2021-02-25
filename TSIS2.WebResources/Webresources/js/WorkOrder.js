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
        function operationTypeOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var operationTypeAttribute = form.getAttribute("ovs_operationtypeid");
                if (operationTypeAttribute != null && operationTypeAttribute != undefined) {
                    var viewId = form.getControl("msdyn_billingaccount").getDefaultView();
                    var entityName = "account";
                    var viewDisplayName = "Filtered Regulated Entities";
                    var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="accountid"><cell name="name" width="200" /><cell name="owner" width="125" /></row></grid>';
                    // If an operation type is selected, we use the filtered fetchxml, otherwise, use the default
                    var fetchXml = "";
                    if (operationTypeAttribute.getValue() != null && operationTypeAttribute.getValue() != undefined) {
                        fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"><entity name="account"><attribute name="name" /><attribute name="accountid" /><order attribute="name" descending="false" /><link-entity name="ovs_operation" from="ovs_regulatedentityid" to="accountid" link-type="inner" alias="ae"><filter type="and"><condition attribute="ovs_operationtypeid" operator="eq" value="' + operationTypeAttribute.getValue()[0].id + '" /></filter></link-entity></entity></fetch>';
                    }
                    else {
                        fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="account"><attribute name="name" /><attribute name="accountid" /><filter type="and"><condition attribute="customertypecode" operator="eq" value="948010000" /></filter></entity></fetch>';
                    }
                    form.getControl("msdyn_billingaccount").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
                }
            }
            catch (e) {
                throw new Error(e.Message);
            }
        }
        WorkOrder.operationTypeOnChange = operationTypeOnChange;
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
