namespace ROM.SecurityIncidentType {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_securityincidenttype.Main.Information>eContext.getFormContext();

        if (formContext.ui.getFormType() == 1) {
            setOwnerToUserBusinessUnit(formContext);
        }
        else if (formContext.ui.getFormType() != 1) {
            checkIfExistingRecordExistWithSameNameAndBU(eContext)
            showFieldWarningMessageIfOwnerIsNotISSONorAvSec(formContext)
        }
    }

    export function ownerOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_securityincidenttype.Main.Information>eContext.getFormContext();
        showFieldWarningMessageIfOwnerIsNotISSONorAvSec(form)
        checkIfExistingRecordExistWithSameNameAndBU(eContext)
    }

    export function checkIfExistingRecordExistWithSameNameAndBU(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_securityincidenttype.Main.Information>eContext.getFormContext();

        let nameAttribute = formContext.getAttribute("ts_name");
        let ownerAttribute = formContext.getAttribute("ownerid");

        if (nameAttribute && ownerAttribute) {
            let fetchData = {
                "securityIncidentName": `${nameAttribute.getValue()?.trim()}`,
                "ownerId": `${ownerAttribute.getValue()?.[0].id}`
            };
            let fetchXml = [
                "<fetch version='1.0' mapping='logical' distinct='true'>",
                "  <entity name='ts_securityincidenttype'>",
                "    <attribute name='ts_name'/>",
                "    <attribute name='ownerid'/>",
                "    <filter type='and'>",
                "      <condition attribute='ts_name' operator='eq' value='", fetchData.securityIncidentName, "'/>",
                "      <condition attribute='ownerid' operator='eq' value='", fetchData.ownerId, "'/>",
                "    </filter>",
                "  </entity>",
                "</fetch>"
                
                ].join("");

            Xrm.WebApi.retrieveMultipleRecords('ts_securityincidenttype', "?fetchXml=" + fetchXml).then(
                function success(result) {
                    if(result.entities.length > 0){
                        const warningMessage = Xrm.Utility.getResourceString("ts_/resx/SecurityIncidentType", "WarningMessageText");
                        formContext.getControl("ts_name").setNotification(warningMessage, "error");
                    }
                    else{
                        formContext.getControl("ownerid").clearNotification("error");
                    }
                }
            );
        }
    }
}

declare function setOwnerToUserBusinessUnit(formContext: any): void;
declare function showFieldWarningMessageIfOwnerIsNotISSONorAvSec(formContext: any): void;