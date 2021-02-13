var ROM;
(function (ROM) {
    var WorkOrder;
    (function (WorkOrder) {
        var Form;
        // EVENTS
        function onLoad(executionContext) {
            console.log('Onload has been called');
            console.log('Xrm execution context: ', executionContext);
            Form = executionContext.getFormContext();
            switch (Form.ui.getFormType()) {
                //Create
                case 1:
                    setDefaultFiscalYear(Form);
                default:
                    break;
            }
            if (!userHasRole("ROM Manager") && !userHasRole("ROM Planner")) {
                Form.getControl("ovs_revisedquarterid").setDisabled(true);
            }
            else {
                Form.getControl("ovs_revisedquarterid").setDisabled(false);
            }
        }
        WorkOrder.onLoad = onLoad;
        function fiscalYearOnchange(executionContext) {
            console.log('fiscalYearOnChange has been called');
            console.log('Xrm execution context: ', executionContext);
            //if new fiscal year is selected, then previous selection of quarter no longer corresponds
            removeSelectedFiscalQuarter(executionContext);
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
        function removeSelectedFiscalQuarter(executionContext) {
            var form = executionContext.getFormContext();
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
