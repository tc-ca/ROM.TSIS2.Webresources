namespace ROM.FunctionalLocation {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_functionallocation.Main.Information>eContext.getFormContext();
       
        const ownerAttribute = form.getAttribute("ownerid")
        if(ownerAttribute != null && ownerAttribute != undefined){

            const ownerAttributeValue = ownerAttribute.getValue();

            if(ownerAttributeValue != null && ownerAttributeValue != undefined){

                Xrm.WebApi.retrieveRecord("systemusers", ownerAttributeValue[0].id.replace(/[{}]/g, ""), "?$select=_businessunitid_value").then(
                    function success(result) {
                        Xrm.WebApi.retrieveRecord("businessunits", result._businessunitid_value, "?$select=name").then(
                            function success(result) {
                                form.getAttribute("ts_businessunit").setValue(result._businessunitid_value);
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
    }
}