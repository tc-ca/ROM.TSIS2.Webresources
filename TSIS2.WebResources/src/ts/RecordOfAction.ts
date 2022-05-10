namespace ROM.RecordOfAction {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        let formContext = <Form.ts_serviceofenforcementaction.Main.Information>eContext.getFormContext();
        
        verbalWarningAdditionalDetailsVisibility(formContext);
        verbalWarningWhereOtherVisiblity(formContext);
    }

    export function onSave(eContext: Xrm.ExecutionContext<any, any>): void {
    }

    export function methodOfServiceOnChange(eContext: Xrm.ExecutionContext<any, any>): void { 
        let formContext = <Form.ts_serviceofenforcementaction.Main.Information>eContext.getFormContext();
        verbalWarningAdditionalDetailsVisibility(formContext);
    }

    export function verbalWarningAdditionalDetailsVisibility(formContext: Form.ts_serviceofenforcementaction.Main.Information){
        const methodOfServiceValue = formContext.getAttribute("ts_methodofservice").getValue();

        //Show additional fields if method of service includes "Verbal"
        if(methodOfServiceValue != null && methodOfServiceValue.indexOf(ts_methodofservice.Verbal) !== -1){
            formContext.ui.tabs.get("general").sections.get("additional_details").setVisible(true);

            formContext.getControl("ts_verbalwarninggivento").setVisible(true);
            formContext.getControl("ts_individualposition").setVisible(true);
            formContext.getControl("ts_individualcompany").setVisible(true);
            formContext.getControl("ts_verbalwarningdate").setVisible(true);
            formContext.getControl("ts_verbalwarningwhere").setVisible(true);

            formContext.getAttribute("ts_verbalwarninggivento").setRequiredLevel("required");
            formContext.getAttribute("ts_individualposition").setRequiredLevel("required");
            formContext.getAttribute("ts_individualcompany").setRequiredLevel("required");
            formContext.getAttribute("ts_verbalwarningdate").setRequiredLevel("required");
            formContext.getAttribute("ts_verbalwarningwhere").setRequiredLevel("required");
        }
        else{
            formContext.ui.tabs.get("general").sections.get("additional_details").setVisible(false);

            formContext.getAttribute("ts_verbalwarninggivento").setValue();
            formContext.getAttribute("ts_individualposition").setValue();
            formContext.getAttribute("ts_individualcompany").setValue();
            formContext.getAttribute("ts_verbalwarningdate").setValue();
            formContext.getAttribute("ts_verbalwarningwhere").setValue();

            formContext.getControl("ts_verbalwarninggivento").setVisible(false);
            formContext.getControl("ts_individualposition").setVisible(false);
            formContext.getControl("ts_individualcompany").setVisible(false);
            formContext.getControl("ts_verbalwarningdate").setVisible(false);
            formContext.getControl("ts_verbalwarningwhere").setVisible(false);

            formContext.getAttribute("ts_verbalwarninggivento").setRequiredLevel("none");
            formContext.getAttribute("ts_individualposition").setRequiredLevel("none");
            formContext.getAttribute("ts_individualcompany").setRequiredLevel("none");
            formContext.getAttribute("ts_verbalwarningdate").setRequiredLevel("none");
            formContext.getAttribute("ts_verbalwarningwhere").setRequiredLevel("none");
        }
    }

    export function verbalWarningWhereOtherOnChange(eContext: Xrm.ExecutionContext<any, any>): void { 
        let formContext = <Form.ts_serviceofenforcementaction.Main.Information>eContext.getFormContext();
        verbalWarningWhereOtherVisiblity(formContext);
    }

    export function verbalWarningWhereOtherVisiblity(formContext: Form.ts_serviceofenforcementaction.Main.Information){
        const verbalWarningWhereValue = formContext.getAttribute("ts_verbalwarningwhere").getValue();

        if(verbalWarningWhereValue != ts_verbalwarninglocation.Other){
            formContext.getAttribute("ts_verbalwarningwhereother").setValue();
            formContext.getControl("ts_verbalwarningwhereother").setVisible(false);
            formContext.getAttribute("ts_verbalwarningwhereother").setRequiredLevel("none");
        }
        else{
            formContext.getControl("ts_verbalwarningwhereother").setVisible(true);
            formContext.getAttribute("ts_verbalwarningwhereother").setRequiredLevel("required"); 
        }
    }

}