namespace ROM.FunctionalLocation {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_functionallocation.Main.Information>eContext.getFormContext();

        const ownerAttribute = form.getAttribute("ownerid")
        if (ownerAttribute != null && ownerAttribute != undefined) {

            const ownerAttributeValue = ownerAttribute.getValue();

            if (ownerAttributeValue != null && ownerAttributeValue != undefined) {

                Xrm.WebApi.retrieveRecord("systemuser", ownerAttributeValue[0].id.replace(/[{}]/g, ""), "?$select=_businessunitid_value").then(
                    function success(result) {
                        Xrm.WebApi.retrieveRecord("businessunit", result._businessunitid_value, "?$select=name").then(
                            function success(result) {
                                form.getAttribute("ts_businessunit").setValue(result.name);
                            },
                            function (error) {
                            }
                        );
                    },
                    function (error) {
                    }
                );
            }
        }

        if (form.getAttribute("ts_statusstartdate").getValue() == null)
            form.getControl("ts_statusenddate").setDisabled(true);
    }

    export function siteStatusOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_functionallocation.Main.Information>eContext.getFormContext();
        const siteStatus = form.getAttribute("ts_sitestatus");
       
        if (siteStatus != null && siteStatus != undefined) {
            const siteStatusValue = siteStatus.getValue();
            //if status is Non-Operational 
            if (siteStatusValue == 717750001) {
                form.getAttribute("ts_statusstartdate").setValue(new Date(Date.now()));
                form.getAttribute("ts_statusenddate").setValue(null);
                form.getControl("ts_statusenddate").setDisabled(false);
            }
            else {
                form.getAttribute("ts_statusstartdate").setValue(null);
                form.getAttribute("ts_statusenddate").setValue(null);
                form.getControl("ts_statusenddate").setDisabled(true);                
            }
        }
    }
    export function statusStartDateOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_functionallocation.Main.Information>eContext.getFormContext();
        if (form.getAttribute("ts_statusstartdate").getValue() != null)
            form.getControl("ts_statusenddate").setDisabled(false);
    }
}