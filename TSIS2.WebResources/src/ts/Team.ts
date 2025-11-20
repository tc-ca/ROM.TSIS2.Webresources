namespace ROM.Team {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>) {
        //Show the Planning Tab only when in the Oversight Planning Module
        var globalContext = Xrm.Utility.getGlobalContext();
        globalContext.getCurrentAppName().then(async function (appName) {
            if (appName == "Oversight Planning Module" || appName == "Module de planification de la surveillance") {
                const formContext = <Form.team.Main.Team>eContext.getFormContext();
                const businessUnitAttribute = formContext.getAttribute("businessunitid");
                if (businessUnitAttribute != null) {
                    const businessUnitValue = businessUnitAttribute.getValue();
                    if (businessUnitValue != null && businessUnitValue.length > 0) {
                        const businessUnitId = businessUnitValue[0].id;
                        const isOwningAvSecBU = await isAvSecBU(businessUnitId);
                        const isOwningISSOBU = !isOwningAvSecBU ? await isISSOBU(businessUnitId) : false;

                        if (isOwningISSOBU) {
                            const planningTab = formContext.ui.tabs.get("tab_planning_isso");
                            if (planningTab != null) {
                                planningTab.setVisible(true);
                            }
                        } else if (isOwningAvSecBU) {
                            const planningTab = formContext.ui.tabs.get("tab_planning_avsec");
                            if (planningTab != null) {
                                planningTab.setVisible(true);
                            }
                        }

                    }
                }
            }
        });
    }

    export function setFieldsDisabled(eContext: Xrm.ExecutionContext<any, any>) {
        const formContext = <Form.ovs_operation.Main.Information>eContext.getFormContext();
        const gridContext = formContext.getControl("activity_type_estimated_duration");
        if (formContext) {
            let arrFields = ["ts_activitytype"];
            let objEntity = formContext.data.entity;
            objEntity.attributes.forEach(
                function (attribute, i) {
                    if (arrFields.indexOf(attribute.getName()) > -1) {
                        let attributeToDisable = attribute.controls.get(0);
                        attributeToDisable.setDisabled(true);
                    }
                }
            );
        };
    }
}