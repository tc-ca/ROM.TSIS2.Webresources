
function test() {
    let fetchXml = [
        "<fetch>",
        "  <entity name='roleprivileges'>",
        "    <attribute name='privilegedepthmask'/>",
        "    <filter>",
        "      <condition attribute='roleid' operator='eq' value='ed37675e-f72c-eb11-a813-000d3af3a7a7'/>",
        "    </filter>",
        "    <link-entity name='privilege' from='privilegeid' to='privilegeid' alias='priv'>",
        "      <attribute name='name'/>",
        "      <filter>",
        "        <condition attribute='name' operator='ends-with' value='msdyn_workorder'/>",
        "      </filter>",
        "    </link-entity>",
        "  </entity>",
        "</fetch>"
    ].join("");
    fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
    parent.Xrm.WebApi.retrieveMultipleRecords("roleprivileges", fetchXml).then(function (result) {
        console.log(result.entities);
    });
}
