/* eslint-disable @typescript-eslint/triple-slash-reference */
namespace ROM.WorkOrderQuickCreate {
    // EVENTS
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_workorder.QuickCreate.QuickCreateWorkOrder>eContext.getFormContext();

        const rationalLookUpValue = new Array();
        rationalLookUpValue[0] = new Object();
        rationalLookUpValue[0].id = "{47F438C7-C104-EB11-A813-000D3AF3A7A7}";
        rationalLookUpValue[0].name = "Unplanned";
        rationalLookUpValue[0].entityType = "ovs_tyrational";

        form.getAttribute("ovs_rational").setValue(rationalLookUpValue);

        const regionAttribute = form.getAttribute("msdyn_serviceterritory");
        if (regionAttribute != null && regionAttribute != undefined) {

            const regionAttributeValue = regionAttribute.getValue();

            if (regionAttributeValue != null && regionAttributeValue != undefined){                
                if(regionAttributeValue[0].id == "{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}"){ //International
                    form.getControl("ts_country").setVisible(true);
                }
            }
            else{
                form.getControl("ts_country").setVisible(false);
            }
        }
    }

    export function regionOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        try {

            const form = <Form.msdyn_workorder.QuickCreate.QuickCreateWorkOrder>eContext.getFormContext();
            const regionAttribute = form.getAttribute("msdyn_serviceterritory");
            const countryAttribute = form.getAttribute("ts_country");

            if (regionAttribute != null && regionAttribute != undefined) {

                const regionAttributeValue = regionAttribute.getValue();
                if (regionAttributeValue != null && regionAttributeValue != undefined) {
                    if(regionAttributeValue[0].id == "{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}"){ //International
                        form.getControl("ts_country").setVisible(true);
                    }
                }
                else{
                    form.getControl("ts_country").setVisible(false);
                }

            }
        } catch (e) {
            throw new Error(e.Message);
        }
    }
  }
