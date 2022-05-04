namespace ROM.OperationContact {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_operationcontact.Main.Information>eContext.getFormContext();

        //Get user BU
        let userId = Xrm.Utility.getGlobalContext().userSettings.userId;
        let currentUserBusinessUnitFetchXML = [
            "<fetch top='50'>",
            "  <entity name='businessunit'>",
            "    <attribute name='name' />",
            "    <attribute name='businessunitid' />",
            "    <link-entity name='systemuser' from='businessunitid' to='businessunitid'>",
            "      <filter>",
            "        <condition attribute='systemuserid' operator='eq' value='", userId, "'/>",
            "      </filter>",
            "    </link-entity>",
            "  </entity>",
            "</fetch>",
        ].join("");
        currentUserBusinessUnitFetchXML = "?fetchXml=" + encodeURIComponent(currentUserBusinessUnitFetchXML);
        Xrm.WebApi.retrieveMultipleRecords("businessunit", currentUserBusinessUnitFetchXML).then(function (result) {
            let userBusinessUnitName = result.entities[0].name;

            //Only show AvSec/ISSO Operations in same BU
            if(!(userBusinessUnitName.startsWith("Transport"))){
                const viewIdActivity = '{D8BE9759-2765-402C-8AA5-6786738AD020}';
                const entityNameActivity = "ovs_operation";
                const viewDisplayNameActivity = "Filtered Operations"
                const layoutXmlActivity = '<grid name="resultset" object="10010" jump="ovs_name" select="1" icon="1" preview="1"><row name="result" id="ovs_operationid"><cell name="ovs_name" width="200" /><cell name="ts_site" width="200" /><cell name="ovs_operationtypeid" width="200" /></row></grid>';
                const fetchXmlActivity = '<fetch version="1.0" mapping="logical"><entity name="ovs_operation"><filter type="and"><condition attribute="statecode" operator="eq" value="0"/></filter><attribute name="ovs_operationid"/><attribute name="ovs_name"/><attribute name="ts_site"/><attribute name="ovs_operationtypeid"/><order attribute="ovs_name"/><link-entity name="businessunit" from="businessunitid" to="owningbusinessunit"><attribute name="name"/><filter><condition attribute="name" operator="like" value="' + userBusinessUnitName.substring(0, 5) + '%"/></filter></link-entity></entity></fetch>';

                form.getControl("ts_operation").addCustomView(viewIdActivity, entityNameActivity, viewDisplayNameActivity, fetchXmlActivity, layoutXmlActivity, true);            }           
        });        
    }
}