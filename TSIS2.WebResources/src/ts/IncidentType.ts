namespace ROM.IncidentType {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_incidenttype.Main.Information>eContext.getFormContext();

        //If creating a record
        if(form.ui.getFormType() == 1){
            form.getAttribute('ownerid').setValue();
            let userId = Xrm.Utility.getGlobalContext().userSettings.userId;

            let currentUserBusinessUnitFetchXML = [
                "<fetch>",
                "  <entity name='businessunit'>",
                "    <attribute name='name' />",
                "    <attribute name='businessunitid' />",
                "    <filter type='or'>",
                "      <condition attribute='name' operator='like' value='Aviation%' />",
                "      <condition attribute='name' operator='like' value='Intermodal%' />",
                "    </filter>",
                "    <link-entity name='systemuser' from='businessunitid' to='businessunitid'>",
                "      <filter>",
                "        <condition attribute='systemuserid' operator='eq' value='", userId, "'/>",
                "      </filter>",
                "    </link-entity>",
                "  </entity>",
                "</fetch>",
            ].join("");
            currentUserBusinessUnitFetchXML = "?fetchXml=" + encodeURIComponent(currentUserBusinessUnitFetchXML);

            Xrm.WebApi.retrieveMultipleRecords("businessunit", currentUserBusinessUnitFetchXML).then(
                function (businessunit) {
                    if(businessunit.entities.length > 0){
                        let team;
                        if(businessunit.entities[0].name.startsWith('Aviation')){
                            team = {
                                "name": "Aviation Security",
                                "entityType": "team"
                            };
                        }
                        else if(businessunit.entities[0].name.startsWith('Intermodal')){
                            team = {
                                "name": "Intermodal Surface Security Oversight (ISSO)",
                                "entityType": "team"
                              };
                        }
    
                        var teamfetchXml = [
                            "<fetch>",
                            "  <entity name='team'>",
                            "    <attribute name='name'/>",
                            "    <attribute name='teamid'/>",
                            "    <filter>",
                            "      <condition attribute='name' operator='eq' value='", team.name, "'/>",
                            "    </filter>",
                            "  </entity>",
                            "</fetch>"
                        ].join("");
            
                        teamfetchXml = "?fetchXml=" + encodeURIComponent(teamfetchXml);
            
                        Xrm.WebApi.retrieveMultipleRecords('team', teamfetchXml).then(
                            function success(result) {
                                team.id = result.entities[0].teamid;
                                form.getAttribute('ownerid').setValue([team]);
                            }
                        );
                    }   
                }
            );
        }

        //If viewing a record
        if(form.ui.getFormType() == 2 || form.ui.getFormType() == 3 || form.ui.getFormType() == 4){
            Xrm.WebApi.retrieveRecord('msdyn_incidenttype', form.data.entity.getId(), "?$select=_owningbusinessunit_value").then(
                function success(incidenttype) {
                    let businessUnitfetchXml = [
                        "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false' returntotalrecordcount='true' no-lock='false'>",
                        "  <entity name='businessunit'>",
                        "    <attribute name='name'/>",
                        "    <attribute name='businessunitid'/>",
                        "    <filter>",
                        "      <condition attribute='businessunitid' operator='eq' value='", incidenttype._owningbusinessunit_value, "'/>",
                        "    </filter>",
                        "  </entity>",
                        "</fetch>"
                    ].join("");
                    businessUnitfetchXml = "?fetchXml=" + businessUnitfetchXml;

                    Xrm.WebApi.retrieveMultipleRecords("businessunit", businessUnitfetchXml).then(function (result) {
                        if (result.entities[0].name.startsWith("Aviation")) {
                            form.ui.tabs.get("operation_activity_tab").setVisible(true);
                            form.getControl("ts_programarea").setVisible(true);
                            form.getControl("ts_programactivityriskrating").setVisible(true);
                            let formUI: any = form.ui;
                            formUI.quickForms.get("ProgramAreaRiskRatingQV").setVisible(true);
                        }
                        else {
                            let formUI: any = form.ui;
                            formUI.quickForms.get("ProgramAreaRiskRatingQV").setVisible(false);
                        }
                    });                     
                }
            );
        }
    }

    export function setFieldsDisabled(eContext: Xrm.ExecutionContext<any, any>) {
        const formContext = <Form.ovs_operation.Main.Information>eContext.getFormContext();
        const gridContext = formContext.getControl("operation_activity_grid");
        if (formContext) {
            let arrFields = ["ts_operation", "ts_activity"];
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