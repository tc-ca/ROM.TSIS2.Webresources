namespace ROM.Team {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>) {
        //Show the Planning Tab only when in the Oversight Planning Module
        var globalContext = Xrm.Utility.getGlobalContext();
        globalContext.getCurrentAppName().then(function (appName) {
            if (appName == "Oversight Planning Module") {
                const formContext = <Form.team.Main.Team>eContext.getFormContext();
                const planningTab = formContext.ui.tabs.get("tab_planning");
                if (planningTab != null) {
                    planningTab.setVisible(true);
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