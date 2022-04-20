namespace ROM.EnforcementAction {

    //Toggle visibility of specific enforcement action (verbal warning)
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        let formContext = <Form.ts_enforcementaction.Main.Information>eContext.getFormContext();
        
        
    }

    export function onSave(eContext: Xrm.ExecutionContext<any, any>): void {
        let formContext = <Form.ts_enforcementaction.Main.Information>eContext.getFormContext();
        formContext.getControl("ts_VerbalWarningGivenTo");

    }

    export function typeOnChange(eContext: Xrm.ExecutionContext<any, any>): void { 
        let formContext = <Form.ts_enforcementaction.Main.Information>eContext.getFormContext();
        let type = formContext.getAttribute("ts_type").getValue();

        //Show additional fields if Enforcement Action is a Verbal Warning
        if(type == ts_type.VerbalWarning){
            formContext.getControl("ts_verbalwarninggivento").setVisible(true);
            formContext.getControl("ts_individualposition").setVisible(true);
            formContext.getControl("ts_company").setVisible(true);
            formContext.getControl("ts_verbalwarningdate").setVisible(true);
            formContext.getControl("ts_verbalwarninglocation").setVisible(true);

            formContext.getAttribute("ts_verbalwarninggivento").setRequiredLevel("required");
            formContext.getAttribute("ts_individualposition").setRequiredLevel("required");
            formContext.getAttribute("ts_company").setRequiredLevel("required");
            formContext.getAttribute("ts_verbalwarningdate").setRequiredLevel("required");
            formContext.getAttribute("ts_verbalwarninglocation").setRequiredLevel("required");
        }
        else{
            formContext.getAttribute("ts_verbalwarninggivento").setValue();
            formContext.getAttribute("ts_individualposition").setValue();
            formContext.getAttribute("ts_company").setValue();
            formContext.getAttribute("ts_verbalwarningdate").setValue();
            formContext.getAttribute("ts_verbalwarninglocation").setValue();

            formContext.getControl("ts_verbalwarninggivento").setVisible(false);
            formContext.getControl("ts_individualposition").setVisible(false);
            formContext.getControl("ts_company").setVisible(false);
            formContext.getControl("ts_verbalwarningdate").setVisible(false);
            formContext.getControl("ts_verbalwarninglocation").setVisible(false);

            formContext.getAttribute("ts_verbalwarninggivento").setRequiredLevel("none");
            formContext.getAttribute("ts_individualposition").setRequiredLevel("none");
            formContext.getAttribute("ts_company").setRequiredLevel("none");
            formContext.getAttribute("ts_verbalwarningdate").setRequiredLevel("none");
            formContext.getAttribute("ts_verbalwarninglocation").setRequiredLevel("none");
        }
    }

    export function verbalWarningLocationOtherDetails(eContext: Xrm.ExecutionContext<any, any>): void { 
        let formContext = <Form.ts_enforcementaction.Main.Information>eContext.getFormContext();
        let verbalWarningLocation = formContext.getAttribute("ts_verbalwarninglocation").getValue();

        //Show additional fields if Enforcement Action is a Verbal Warning
        if(verbalWarningLocation == ts_verbalwarninglocation.Other){
            formContext.getControl("ts_verbalwarninglocationother").setVisible(true);
            formContext.getAttribute("ts_verbalwarninglocationother").setRequiredLevel("required");
        }
        else{
            formContext.getAttribute("ts_verbalwarninglocationother").setValue();
            formContext.getControl("ts_verbalwarninglocationother").setVisible(false);
            formContext.getAttribute("ts_verbalwarninglocationother").setRequiredLevel("none");
        }
    }
}