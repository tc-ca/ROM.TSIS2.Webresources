"use strict";
var ROM;
(function (ROM) {
    var SuggestedInspection;
    (function (SuggestedInspection) {
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            setOperationTypeFilteredView(form);
        }
        SuggestedInspection.onLoad = onLoad;
        function setOperationTypeFilteredView(form) {
            var viewId = '{8982C38D-8BB4-4C95-BD05-493398FEAE99}';
            var entityName = "ovs_operationtype";
            var viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredOperationTypes");
            var fetchXml = [
                "<fetch>",
                "  <entity name='ovs_operationtype'>",
                "    <link-entity name='ovs_operation' from='ovs_operationtypeid' to='ovs_operationtypeid' link-type='inner' alias='operation'>",
                "      <link-entity name='businessunit' from='businessunitid' to='owningbusinessunit' link-type='inner' alias='businessunit'>",
                "        <filter>",
                "          <condition attribute='name' operator='begins-with' value='Intermodal'/>",
                "        </filter>",
                "      </link-entity>",
                "      <link-entity name='msdyn_incidenttype' from='ts_ovs_operation' to='ovs_operationid' link-type='outer' alias='incidenttype'>",
                "        <filter>",
                "          <condition attribute='msdyn_defaultworkordertype' operator='eq' value='b1ee680a-7cf7-ea11-a815-000d3af3a7a7' uiname='Inspection' uitype='msdyn_workordertype'/>",
                "        </filter>",
                "      </link-entity>",
                "    </link-entity>",
                "  </entity>",
                "</fetch>"
            ].join("");
            var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="ovs_operationtypeid"><cell name="ovs_name" width="200" /></row></grid>';
            form.getControl("ts_operationtype").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
        }
    })(SuggestedInspection = ROM.SuggestedInspection || (ROM.SuggestedInspection = {}));
})(ROM || (ROM = {}));
