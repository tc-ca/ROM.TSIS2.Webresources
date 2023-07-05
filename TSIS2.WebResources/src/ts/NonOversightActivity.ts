namespace ROM.NonOversightActivity {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_nonoversightactivity.Main.Information>eContext.getFormContext();
        if (form.ui.getFormType() == 1) {
            setProgramToUserBusinessUnit(eContext);
        }
    }

    export function dateOfActivityOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_nonoversightactivity.Main.Information>eContext.getFormContext();
        let activityDate = form.getAttribute('ts_dateofactivity').getValue();
        if (activityDate != null) {
            let month = activityDate.getMonth();
            if (month < 3) { //Q4
                form.getAttribute('ts_quarter').setValue(ts_quarter.Q4);
            }
            else if (month >= 3 && month < 6) { //Q1
                form.getAttribute('ts_quarter').setValue(ts_quarter.Q1);
            }
            else if (month >= 6 && month < 9) { //Q2
                form.getAttribute('ts_quarter').setValue(ts_quarter.Q2);
            }
            else if (month >= 9 && month < 12) { //Q3
                form.getAttribute('ts_quarter').setValue(ts_quarter.Q3);
            }
        }
    }

    export function programOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_nonoversightactivity.Main.Information>eContext.getFormContext();
        let program = form.getAttribute('ts_program').getValue();
        if (program != null && program.length > 0) {
            if (program[0].name?.startsWith('Intermodal')) {
                form.getControl("ts_category").setDefaultView("e2efe0d1-0812-ee11-8f6e-0022483d7716");  //ISSO
            }
            else if (program[0].name?.startsWith('Transport')) {
                form.getControl("ts_category").setDefaultView("7b5c2ae7-3714-ee11-9cbe-0022483c5061");  //All
            }
            else {
                form.getControl("ts_category").setDefaultView("9956908f-0912-ee11-8f6e-0022483d7716");  //AvSec
            }
        }
    }

    function setProgramToUserBusinessUnit(eContext: Xrm.ExecutionContext<any, any>) {
        const form = <Form.ts_nonoversightactivity.Main.Information>eContext.getFormContext();
        let userId = Xrm.Utility.getGlobalContext().userSettings.userId;

        Xrm.WebApi.retrieveRecord("systemuser", userId.replace(/[{}]/g, ""), "?$select=_businessunitid_value").then(
            function success(result) {
                const lookup = new Array();
                lookup[0] = new Object();
                lookup[0].id = result["_businessunitid_value"];
                lookup[0].name = result["_businessunitid_value@OData.Community.Display.V1.FormattedValue"];
                lookup[0].entityType = 'businessunit';
                form.getAttribute('ts_program').setValue(lookup);

                programOnChange(eContext);
            },
            function (error) {
                console.log(error.message);
            }
        );
    }
}