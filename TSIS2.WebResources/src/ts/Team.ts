namespace ROM.Team {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>) {
        //Show the Planning Tab only when in the Oversight Planning Module
        var globalContext = Xrm.Utility.getGlobalContext();
        globalContext.getCurrentAppName().then(function (appName) {
            if (appName == "Oversight Planning Module" || appName == "Module de planification de la surveillance") {
                const formContext = <Form.team.Main.Team>eContext.getFormContext();
                const businessUnitAttribute = formContext.getAttribute("businessunitid");
                let businessUnitName;
                if (businessUnitAttribute != null) {
                    const businessUnitValue = businessUnitAttribute.getValue();
                    if (businessUnitValue != null) {
                        businessUnitName = businessUnitValue[0].name;
                        if (businessUnitName.startsWith("Intermodal")) {
                            const planningTab = formContext.ui.tabs.get("tab_planning_isso");
                            if (planningTab != null) {
                                planningTab.setVisible(true);
                            }
                        } else if (businessUnitName.startsWith("Aviation")) {
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