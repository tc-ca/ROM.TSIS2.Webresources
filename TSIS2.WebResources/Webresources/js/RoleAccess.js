/*
 * Privilege Key
 * Org: 8
 * PC: 4
 * BU: 2
 * User: 1
 * None: No Privilege record
 */ 


async function buildRoleAccessTables() {
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
    const workOrderPrivileges = await parent.Xrm.WebApi.retrieveMultipleRecords("roleprivileges", fetchXml).then(function (result) { return result.entities });
    const roleAccessTablesDiv = document.getElementById("roleAccessTables");
    const workOrderTable = document.createElement("table");
    roleAccessTablesDiv.appendChild(workOrderTable);
    const workOrderTableHeader = workOrderTable.createTHead();
    const workOrderTableHeaderRow = workOrderTableHeader.insertRow();

    const workOrderTableRoleNameHeader = workOrderTableHeaderRow.insertCell();
    const workOrderTableCreateHeader = workOrderTableHeaderRow.insertCell();
    const workOrderTableReadHeader = workOrderTableHeaderRow.insertCell();
    const workOrderTableWriteHeader = workOrderTableHeaderRow.insertCell();
    const workOrderTableDeleteHeader = workOrderTableHeaderRow.insertCell();
    const workOrderTableAppendHeader = workOrderTableHeaderRow.insertCell();
    const workOrderTableAppendToHeader = workOrderTableHeaderRow.insertCell();
    const workOrderTableAssignHeader = workOrderTableHeaderRow.insertCell();
    const workOrderTableShareHeader = workOrderTableHeaderRow.insertCell();

    workOrderTableRoleNameHeader.innerHTML = "Security Role";
    workOrderTableCreateHeader.innerHTML = "Create";
    workOrderTableReadHeader.innerHTML = "Read";
    workOrderTableWriteHeader.innerHTML = "Write";
    workOrderTableDeleteHeader.innerHTML = "Delete";
    workOrderTableAppendHeader.innerHTML = "Append";
    workOrderTableAppendToHeader.innerHTML = "Append To";
    workOrderTableAssignHeader.innerHTML = "Assign";
    workOrderTableShareHeader.innerHTML = "Share";

    const workOrderPrivilegesData = {
        Create: 0,
        Read: 0,
        Write: 0,
        Delete: 0,
        Append: 0,
        AppendTo: 0,
        Assign: 0,
        Share: 0,
    }
    for (let privilege of workOrderPrivileges) {
        switch (privilege["priv.name"]) {
            case "prvCreatemsdyn_workorder":
                workOrderPrivilegesData.Create = privilege.privilegedepthmask
                break;
            case "prvReadmsdyn_workorder":
                workOrderPrivilegesData.Read = privilege.privilegedepthmask
                break;
            case "prvWritemsdyn_workorder":
                workOrderPrivilegesData.Write = privilege.privilegedepthmask
                break;
            case "prvDeletemsdyn_workorder":
                workOrderPrivilegesData.Delete = privilege.privilegedepthmask
                break;
            case "prvAppendmsdyn_workorder":
                workOrderPrivilegesData.Append = privilege.privilegedepthmask
                break;
            case "prvAppendTomsdyn_workorder":
                workOrderPrivilegesData.AppendTo = privilege.privilegedepthmask
                break;
            case "prvAssignmsdyn_workorder":
                workOrderPrivilegesData.Assign = privilege.privilegedepthmask
                break;
            case "prvSharemsdyn_workorder":
                workOrderPrivilegesData.Share = privilege.privilegedepthmask
                break;

        }
    }

    const workOrderTableDataBody = workOrderTable.createTBody();
    const workOrderTableDataRow = workOrderTableDataBody.insertRow();
    const workOrderTableRoleNameData = workOrderTableDataRow.insertCell();
    const workOrderTableCreateData = workOrderTableDataRow.insertCell();
    const workOrderTableReadData = workOrderTableDataRow.insertCell();
    const workOrderTableWriteData = workOrderTableDataRow.insertCell();
    const workOrderTableDeleteData = workOrderTableDataRow.insertCell();
    const workOrderTableAppendData = workOrderTableDataRow.insertCell();
    const workOrderTableAppendToData = workOrderTableDataRow.insertCell();
    const workOrderTableAssignData = workOrderTableDataRow.insertCell();
    const workOrderTableShareData = workOrderTableDataRow.insertCell();

    workOrderTableRoleNameData.innerHTML = "ROM - Inspector";
    workOrderTableCreateData.innerHTML = workOrderPrivilegesData.Create;
    workOrderTableReadData.innerHTML = workOrderPrivilegesData.Read;
    workOrderTableWriteData.innerHTML = workOrderPrivilegesData.Write;
    workOrderTableDeleteData.innerHTML = workOrderPrivilegesData.Delete;
    workOrderTableAppendData.innerHTML = workOrderPrivilegesData.Append;
    workOrderTableAppendToData.innerHTML = workOrderPrivilegesData.AppendTo;
    workOrderTableAssignData.innerHTML = workOrderPrivilegesData.Assign;
    workOrderTableShareData.innerHTML = workOrderPrivilegesData.Share;
}
