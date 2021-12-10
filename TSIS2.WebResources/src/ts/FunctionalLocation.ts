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

        setDateRangeVisibility(eContext);

    }

    export function siteStatusOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        setDateRangeVisibility(eContext);
    }

    function setDateRangeVisibility(eContext: Xrm.ExecutionContext<any, any>) {
        const form = <Form.msdyn_functionallocation.Main.Information>eContext.getFormContext();
        const siteStatus = form.getAttribute("ts_sitestatus");

        if (siteStatus != null && siteStatus != undefined) {
            const siteStatusValue = siteStatus.getValue();
            //if status is Non-Operational set Start Date and End Date visible
            if (siteStatusValue == "717750001") {
                form.getControl("ts_statusstartdate").setVisible(true);
                form.getControl("ts_statusenddate").setVisible(true);
            }
            else {
                form.getControl("ts_statusstartdate").setVisible(false);
                form.getControl("ts_statusenddate").setVisible(false);
            }
        }
    }
}