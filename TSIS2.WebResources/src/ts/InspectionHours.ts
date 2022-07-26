namespace ROM.InspectionHours {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_inspectionhours.Main.Information>eContext.getFormContext();

        //Show Time section if Inspector and Baseline Hours have values
        const InspectorValue = formContext.getAttribute("ts_inspector").getValue();
        const BaselineHoursValue = formContext.getAttribute("ts_baselinehours").getValue();
        if (InspectorValue != null && BaselineHoursValue != null) {
            const generalTab = formContext.ui.tabs.get("tab_general");
            generalTab.sections.get("section_inspection_hours").setVisible(true);
        }

        setInspectorLookupFetchXML(formContext);
    }

    export function inspectorOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_inspectionhours.Main.Information>eContext.getFormContext();
        const InspectorValue = formContext.getAttribute("ts_inspector").getValue();
        if (InspectorValue != null) {
            //Set the Name to the Full Name of the chosen Inspector
            formContext.getAttribute("ts_name").setValue(InspectorValue[0].name)
        }
    }

    function setInspectorLookupFetchXML(formContext: Form.ts_inspectionhours.Main.Information) {
        var fetchXml = [
            "<fetch version='1.0' output-format='xml-platform' mapping='logical' count='50'>",
            "  <entity name='systemuser'>",
            "    <attribute name='fullname' />",
            "    <attribute name='territoryid' />",
            "    <attribute name='ts_inspectionhours' />",
            "    <order attribute='fullname' descending='false' />",
            "    <filter type='and'>",
            "      <condition attribute='isdisabled' operator='eq' value='0'/>",
            "      <condition attribute='accessmode' operator='ne' value='3'/>",
            "      <condition attribute='accessmode' operator='ne' value='5'/>",
            "      <condition attribute='ts_inspectionhours' operator='null' />",
            "    </filter>",
            "    <filter type='or'>",
            "      <condition entityname='userrole' attribute='name' operator='eq' value='ROM - Inspector' />",
            "      <condition entityname='teamrole' attribute='name' operator='eq' value='ROM - Inspector' />",
            "    </filter>",
            "    <attribute name='systemuserid' />",
            "    <link-entity alias='a_9156d7f5d3bd47ad9f84ac9b81fa0d54' name='businessunit' to='businessunitid' from='businessunitid' link-type='inner' visible='false'>",
            "      <attribute name='name' />",
            "    </link-entity>",
            "    <link-entity name='systemuserroles' from='systemuserid' to='systemuserid'>",
            "      <link-entity alias='userrole' name='role' from='roleid' to='roleid' />",
            "    </link-entity>",
            "    <link-entity name='teammembership' from='systemuserid' to='systemuserid' link-type='inner' intersect='true'>",
            "      <link-entity name='team' from='teamid' to='teamid' link-type='inner' intersect='true'>",
            "        <link-entity name='teamroles' from='teamid' to='teamid' link-type='inner' intersect='true'>",
            "          <link-entity alias='teamrole' name='role' from='roleid' to='roleid' link-type='inner' intersect='true' />",
            "        </link-entity>",
            "      </link-entity>",
            "    </link-entity>",
            "  </entity>",
            "</fetch>",
        ].join("");

        const viewId = '{8982C38D-8BB4-4C95-BD05-493398FEAE99}';
        const entityName = "systemuser";
        const viewDisplayName = "";
        const layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="systemuserid"><cell name="fullname" width="200" /></row></grid>';
        formContext.getControl("ts_inspector").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
    }
}