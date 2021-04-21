/* eslint-disable @typescript-eslint/triple-slash-reference */
namespace ROM.WorkOrderQuickCreate {
    // EVENTS
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_workorder.QuickCreate.QuickCreateWorkOrder>eContext.getFormContext();
    }

    export function regionOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        try {

            const form = <Form.msdyn_workorder.QuickCreate.QuickCreateWorkOrder>eContext.getFormContext();
            const regionAttribute = form.getAttribute("msdyn_serviceterritory");
            const countryAttribute = form.getAttribute("ovs_ovscountry");

            if (regionAttribute != null && regionAttribute != undefined) {

                const regionAttributeValue = regionAttribute.getValue();
                if (regionAttributeValue != null && regionAttributeValue != undefined) {
                    if(regionAttributeValue[0].name == "International"){
                        form.getControl("ovs_ovscountry").setVisible(true);
                    }
                }
                else{
                    form.getControl("ovs_ovscountry").setVisible(false);
                }

            }
        } catch (e) {
            throw new Error(e.Message);
        }
    }
  }
