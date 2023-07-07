namespace ROM.User {
    let userId: string;
    let dualInspectorRoleId: string;
    const clientUrl = Xrm.Utility.getGlobalContext().getClientUrl();

    export async function onLoad(eContext: Xrm.ExecutionContext<any, any>): Promise<void> {
        const form = <Form.systemuser.Main.User>eContext.getFormContext();
        userId = form.data.entity.getId().replace(/[{}]/g, "");

        if (form.ui.getFormType() == 2) {
            try {
                const id = await getDualInspectorRoleId(form);
                if (id) {
                    dualInspectorRoleId = id;
                    checkIfUserHasDualInspectorRole(form);
                }
                form.getControl("ts_dualinspector").setVisible(true);
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }

    function getDualInspectorRoleId(form: Form.systemuser.Main.User): Promise<string> {
        //There are multiple ROM - Dual Inspector roles, so we need to retrieve the correct one corresponding to the user business unit
        const userBusinessUnitIdAttribute = form.getAttribute("businessunitid");
        const userBusinessUnitIdAttributeValue = userBusinessUnitIdAttribute?.getValue()?.[0]?.id?.replace(/[{}]/g, "") ?? "";

        return Xrm.WebApi.retrieveMultipleRecords("role", `?$select=name,_businessunitid_value&$filter=name eq 'ROM - Dual Inspector' and _businessunitid_value eq '${userBusinessUnitIdAttributeValue}'`).then(
            function success(result) {
                if (result.entities.length === 0) throw new Error('Role not found');
                // Retrieve the role id
                dualInspectorRoleId = result.entities[0].roleid;
                return dualInspectorRoleId;
            }
        );
    }

    async function checkIfUserHasDualInspectorRole(form: Form.systemuser.Main.User): Promise<boolean> {
        try {
            const result = await Xrm.WebApi.retrieveRecord("systemuser", userId, `?$expand=systemuserroles_association($select=roleid)`);
            if (result.systemuserroles_association) {
                if (result.systemuserroles_association.find(role => role.roleid === dualInspectorRoleId)) { // If the user has the Dual Inspector role
                    form.getAttribute("ts_dualinspector").setValue(true);
                } else {
                    form.getAttribute("ts_dualinspector").setValue(false);
                }
                form.getControl("ts_dualinspector").setDisabled(false);
                await form.data.save();
                return true;
            }
        } catch (error) {
            console.error('Error:', error);
        }
        return false;
    }

    export function dualInspectorToggleOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.systemuser.Main.User>eContext.getFormContext();
        const dualInspectorToggleAttribute = form.getAttribute("ts_dualinspector");

        if (dualInspectorToggleAttribute != null) {
            form.getControl("ts_dualinspector").setDisabled(true);
            const dualInspectorToggleAttributeValue = dualInspectorToggleAttribute.getValue();
            Xrm.Utility.showProgressIndicator(dualInspectorToggleAttributeValue ? "Adding ROM - Dual Inspector role..." : "Removing ROM - Dual Inspector role...");

            const operation = dualInspectorToggleAttributeValue == true
                ? 'POST'
                : 'DELETE';

            const operationUrl = dualInspectorToggleAttributeValue == true
                ? `${clientUrl}/api/data/v9.2/systemusers(${userId})/systemuserroles_association/$ref`
                : `${clientUrl}/api/data/v9.2/systemusers(${userId})/systemuserroles_association/$ref?$id=${clientUrl}/api/data/v9.2/roles(${dualInspectorRoleId})`;

            const operationError = dualInspectorToggleAttributeValue == true
                ? 'Failed to add role to user'
                : 'Failed to remove role from user';

            let body: any;
            if (operation == 'POST') {
                body = JSON.stringify({ "@odata.id": `${clientUrl}/api/data/v9.2/roles(${dualInspectorRoleId})` });
            }

            fetch(operationUrl, {
                method: operation,
                headers: {
                    'OData-MaxVersion': '4.0',
                    'OData-Version': '4.0',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: body,
            }).then(response => {
                if (!response.ok) throw new Error(operationError);
                else {
                    form.data.save().then(() => Xrm.Utility.closeProgressIndicator());
                }
            }).catch(error => {
                dualInspectorToggleAttribute.setValue(!dualInspectorToggleAttributeValue);
                Xrm.Utility.closeProgressIndicator();
                Xrm.Navigation.openAlertDialog({ text: error, title: "Error" });
                form.getControl("ts_dualinspector").setDisabled(false);
            });
            form.getControl("ts_dualinspector").setDisabled(false);
        }
    }
}

declare function userHasRole(rolesName: any): boolean;