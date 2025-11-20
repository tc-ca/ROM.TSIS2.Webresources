namespace ROM.SecurityIncidentType {
    let langColumn = Xrm.Utility.getGlobalContext().userSettings.languageId === 1033 ? "ts_securityincidenttypenameenglish" : "ts_securityincidenttypenamefrench";

    export async function onLoad(eContext: Xrm.ExecutionContext<any, any>): Promise<void> {
        const formContext = <Form.ts_securityincidenttype.Main.Information>eContext.getFormContext();

        if (formContext.ui.getFormType() == 1 || formContext.ui.getFormType() == 2) {
            showTCOMWarningMessage(formContext);
        }

        const shouldClearOwner = await showFieldWarningMessageIfOwnerIsNotISSONorAvSec(formContext);
        if (shouldClearOwner) {
            formContext.getAttribute("ownerid").setValue(null);
        }

        if (formContext.ui.getFormType() == 1) {
            setOwnerToUserBusinessUnit(formContext);
        }
        else if (formContext.ui.getFormType() != 1) {
            checkIfExistingRecordExistWithSameNameAndBU(formContext, "ts_name")
        }
    }

    export function onSave(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_securityincidenttype.Main.Information>eContext.getFormContext();
        if (
            checkIfExistingRecordExistWithSameNameAndBU(form, "ts_name") ||
            checkIfExistingRecordExistWithSameNameAndBU(form, "ts_securityincidenttypenameenglish") ||
            checkIfExistingRecordExistWithSameNameAndBU(form, "ts_securityincidenttypenamefrench")) {
            eContext.getEventArgs().preventDefault();
        }
    }

    export async function ownerOnChange(eContext: Xrm.ExecutionContext<any, any>): Promise<void> {
        const form = <Form.ts_securityincidenttype.Main.Information>eContext.getFormContext();

        await showFieldWarningMessageIfOwnerIsNotISSONorAvSec(form);

        checkIfExistingRecordExistWithSameNameAndBU(form, "ts_name")
        checkIfExistingRecordExistWithSameNameAndBU(form, "ts_securityincidenttypenameenglish")
        checkIfExistingRecordExistWithSameNameAndBU(form, "ts_securityincidenttypenamefrench")
    }

    export function nameOnChange(eContext: Xrm.ExecutionContext<any, any>, field: string): void {
        const form = <Form.ts_securityincidenttype.Main.Information>eContext.getFormContext();
        checkIfExistingRecordExistWithSameNameAndBU(form, field)
    }

    export function checkIfExistingRecordExistWithSameNameAndBU(formContext: Form.ts_securityincidenttype.Main.Information, field: string): boolean {
        let securityIncidentAttribute = formContext.getAttribute(field);
        if (securityIncidentAttribute !== undefined) {
            let ownerAttribute = formContext.getAttribute("ownerid");
            if (securityIncidentAttribute && ownerAttribute) {

                let nameAttributeValue = (securityIncidentAttribute as Xrm.Attribute<string>).getValue()?.trim();
                let ownerAttributeValue = (ownerAttribute as Xrm.Attribute<string>).getValue();
                if (nameAttributeValue && ownerAttributeValue) {

                    let fetchData = {
                        "securityIncidentTypeName": `${nameAttributeValue}`,
                        "ownerId": `${ownerAttribute.getValue()?.[0].id}`
                    };
                    let fetchXml = [
                        "<fetch version='1.0' mapping='logical' distinct='true'>",
                        "  <entity name='ts_securityincidenttype'>",
                        "    <filter type='and'>",
                        "      <condition attribute='", (field === 'ts_name' ? langColumn : field), "' operator='eq' value='", fetchData.securityIncidentTypeName, "'/>",
                        "      <condition attribute='ownerid' operator='eq' value='", fetchData.ownerId, "'/>",
                        "      <condition attribute='ts_securityincidenttypeid' operator='neq' value='", formContext.data.entity.getId(), "'/>",
                        "    </filter>",
                        "  </entity>",
                        "</fetch>"
                    ].join("");

                    Xrm.WebApi.retrieveMultipleRecords('ts_securityincidenttype', "?fetchXml=" + fetchXml).then(
                        function success(result) {
                            if (result.entities.length > 0) {
                                const warningMessage = Xrm.Utility.getResourceString("ts_/resx/SecurityIncidentType", "WarningMessageText");
                                (formContext.getControl(field) as any).setNotification(warningMessage, "error");
                                return true;
                            }
                            else {
                                (formContext.getControl(field) as any).clearNotification("error");
                            }
                        }
                    );
                }
            }
        }
        return false;
    }

    function showTCOMWarningMessage(formContext: Form.ts_securityincidenttype.Main.Information): void {
        const message = Xrm.Utility.getGlobalContext().userSettings.languageId === 1033
            ? "Please advise TCOMs before creating or changing this record."
            : "Veuillez informer les TCOM avant de créer ou de modifier cet enregistrement.";

        formContext.ui.setFormNotification(message, "WARNING", "tcom_warning");
    }
}