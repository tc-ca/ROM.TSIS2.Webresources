namespace ROM.CauseFinding {

    export async function onLoad(eContext: Xrm.ExecutionContext<any, any>) {
        const form = <Form.ts_causefinding.Main.Information>eContext.getFormContext();
        debugger;
        var finding = form.getAttribute("ts_finding").getValue();
        if (finding != null ) {
            const record = await Xrm.WebApi.retrieveRecord('ovs_finding', finding[0].id, '?$select=ovs_finding,_ts_qm_rclegislation_value');
            if (record != null && record._ts_qm_rclegislation_value != null) {

                const viewId = '{3544CA89-0B3B-4456-8918-494DF3B1CD1C}';
                const entityName = "qm_rclegislation";
                const viewDisplayName = "Filtered Legislation";

                const fetchXml = `<fetch version="1.0" mapping="logical" no-lock="false" distinct="true">
                          <entity name="qm_rclegislation">
                            <attribute name="qm_name" />
                            <attribute name="qm_legislationftxt" />
                            <attribute name="qm_legislationetxt" />
                            <attribute name="qm_rclegislationid" />
                            <order attribute="qm_name" descending="false" />
                            <link-entity name="ts_qm_rclegislation_causes" intersect="true" visible="false" from="qm_rclegislationidtwo" to="qm_rclegislationid">
                              <link-entity name="qm_rclegislation" alias="ai" from="qm_rclegislationid" to="qm_rclegislationidone">
                                <filter type="and">
                                  <condition attribute="qm_rclegislationid" operator="eq" value="` + record._ts_qm_rclegislation_value + `"  uitype="qm_rclegislation" />
                                </filter>
                              </link-entity>
                            </link-entity>
                          </entity>
                        </fetch>`;

                const layoutXml = '<grid name="resultset" object="2" jump="qm_name" select="1" icon="1" preview="1"><row name="result" id="qm_rclegislationid"><cell name="qm_name" width="300" /></row></grid>';

                form.getControl("ts_cause").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
            }
        }
    }
}



