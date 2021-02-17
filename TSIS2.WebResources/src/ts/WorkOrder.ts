/* eslint-disable @typescript-eslint/triple-slash-reference */
namespace ROM.WorkOrder {
    // EVENTS
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_workorder.Main.TSISOversightActivity>eContext.getFormContext();

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

    export function fiscalYearOnchange(eContext: Xrm.ExecutionContext<any, any>): void {
        //if new fiscal year is selected, then previous selection of quarter no longer corresponds
        removeSelectedFiscalQuarter(eContext);
    }

    // FUNCTIONS
    function setDefaultFiscalYear(form: Form.msdyn_workorder.Main.TSISOversightActivity): void {
        XrmQuery.retrieveMultiple((x) => x.tc_tcfiscalyears)
            .select((x) => [x.tc_name])
            .filter((x) => Filter.equals(x.tc_iscurrentfiscalyear, true))
            .execute((fiscalYears) => {
                //should only return one fiscal year record as the current
                if (fiscalYears.length === 1) {
                    const targetedFiscalYear = fiscalYears[0];
                    const lookup = new Array();
                    lookup[0] = new Object();
                    lookup[0].id = targetedFiscalYear.tc_tcfiscalyearid;
                    lookup[0].name = targetedFiscalYear.tc_name;
                    lookup[0].entityType = 'tc_tcfiscalyear';

                    form.getAttribute('ovs_fiscalyear').setValue(lookup);
                } else {
                    // do not set a default if multiple records are found, error.
                }
            });
    }

    function removeSelectedFiscalQuarter(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_workorder.Main.TSISOversightActivity>eContext.getFormContext();
        form.getAttribute('ovs_fiscalquarter').setValue(null);
    }

    function userHasRole(roleName): boolean {
        var currentUserRoles = Xrm.Utility.getGlobalContext().userSettings.roles.get();
        for (var i = 0; i < currentUserRoles.length; i++) {
            var userRoleName = currentUserRoles[i].name;
            if (userRoleName == roleName) {
                return true;
            }
        }
        return false;
    }
}
