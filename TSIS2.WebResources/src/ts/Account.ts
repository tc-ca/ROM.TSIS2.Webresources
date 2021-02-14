/* eslint-disable @typescript-eslint/triple-slash-reference */
namespace ROM.Account {
    // EVENTS
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
      console.log('Onload has been called');
      console.log('Xrm execution context: ', eContext);
      const form = <Form.account.Main.Organizations>eContext.getFormContext();
        var accountType = form.getAttribute('customertypecode').getValue();
        if (accountType == account_customertypecode.RegulatedEntity){
        form.getControl('regulated_entities_subgrid').setVisible(false);
        }
        else
        form.getControl('regulated_entities_subgrid').setVisible(true);
    }
}