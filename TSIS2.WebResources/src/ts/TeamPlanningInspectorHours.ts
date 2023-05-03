namespace ROM.TeamPlanningInspectorHours {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_teamplanninginspectorhours.Main.Information>eContext.getFormContext();
        if (formContext.ui.getFormType() == 2) { //Update type. The form has already been saved for the first time
           
            let teamPlanningDataInspectorHoursId = formContext.data.entity.getId();
            let teamPlanningDataFetchXML = [
                "<fetch>",
                "<entity name='ts_teamplanningdata'>",
                "<link-entity name = 'ts_teamplanninginspectorhours' from = 'ts_teamplanningdata' to = 'ts_teamplanningdataid' link-type='inner' alias = 'ag'>",
                "<filter type='and'>",
                "<condition attribute='ts_teamplanninginspectorhoursid' operator = 'eq' value='", teamPlanningDataInspectorHoursId, "'/>",
                "</filter>",
                "</link-entity>",
                "</entity>",
                "</fetch>"
            ].join("");
            teamPlanningDataFetchXML = "?fetchXml=" + encodeURIComponent(teamPlanningDataFetchXML);
            Xrm.WebApi.retrieveMultipleRecords("ts_teamplanningdata", teamPlanningDataFetchXML).then(function (result) {
                if (result.entities[0].ts_planstatus == 741130001) {
                    disableFormFields(eContext);
                };
            });
        }
    }

    function disableFormFields(eContext: Xrm.ExecutionContext<any, any>): void {
        let form = eContext.getFormContext();
        form.ui.controls.forEach(function (control, index) {
            let controlType = control.getControlType();
            if (controlType != "iframe" && controlType != "webresource" && controlType != "subgrid") {
                control.setDisabled!(true);
            }
        });
    }
}