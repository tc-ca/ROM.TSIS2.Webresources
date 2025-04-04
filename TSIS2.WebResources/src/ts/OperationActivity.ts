namespace ROM.OperationActivity {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_operationactivity.Main.Information>eContext.getFormContext();

        const operationAttribute = form.getAttribute("ts_operation");
        const activityTypeAttribute = form.getAttribute("ts_activity");

        if (operationAttribute != null && operationAttribute != undefined && activityTypeAttribute != null && activityTypeAttribute != undefined) {
            const operationAttributeValue = operationAttribute.getValue();
            const activityTypeAttributeValue = activityTypeAttribute.getValue();

            if (operationAttributeValue != null && activityTypeAttributeValue != null) {
                form.ui.tabs.get("related_wos_tab").setVisible(true);

                let fetchXml = `<filter><condition attribute="msdyn_primaryincidenttype" operator="eq" value="${activityTypeAttributeValue[0].id}"/><condition attribute="ovs_operationid" operator="eq" value="${operationAttributeValue[0].id}"/><condition attribute="statecode" operator="eq" value="0" /></filter>`;

                if (form.ui.getFormType() != 0 && form.ui.getFormType() != 1 && form.ui.getFormType() != 6) {
                    //setRelatedWorkOrdersFetchXML(form, fetchXml)
                }
            }
        }

        //If owner is AvSec make accountable team section visible
        const ownerAttribute = form.getAttribute("ownerid");
        if (ownerAttribute != null && ownerAttribute != undefined) {
            const ownerAttributeValue = ownerAttribute.getValue();
            if (ownerAttributeValue != null) {
                if (ownerAttributeValue[0].name && ownerAttributeValue[0].name.toLowerCase().includes("aviation security".toLowerCase())) {
                    form.ui.tabs.get("tab_general").sections.get("section_team").setVisible(true);
                }
            }
        }

        //If not business admin lock all fields
        if (!isAdmin()) {
            setAllFieldsDisabled(eContext);
        }
    }

    export function setRelatedWorkOrdersFetchXML(form: Form.ts_operationactivity.Main.Information, fetchXml: string) {
        let gridControl: any = form.getControl("subgrid_related_actions");

        if (gridControl === null) {
            setTimeout(ROM.OperationActivity.setRelatedWorkOrdersFetchXML, 1000);
            return;
        }
        else {
            ROM.Utils.setSubgridFilterXml(form, "related_wos", fetchXml);
        }
    }

    function setAllFieldsDisabled(eContext) {
        const formContext = eContext.getFormContext();

        formContext.ui.controls.forEach(function (control, i) {
            if (control && control.getDisabled && !control.getDisabled()) {
                control.setDisabled!(true);
            }
        });
    }
    function isAdmin() {
        const userRoles = Xrm.Utility.getGlobalContext().userSettings.roles;
        let isAdmin = false;
        userRoles.forEach(role => {
            if (role.name == "System Administrator" || role.name == "ROM - Business Admin") {
                isAdmin = true;
            }
        });
        return isAdmin;
    }
}
