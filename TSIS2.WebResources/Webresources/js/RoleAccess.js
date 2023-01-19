/*
 * Privilege Key
 * Org: 8
 * PC: 4
 * BU: 2
 * User: 1
 * None: No Privilege record
 */ 


async function buildRoleAccessTables() {
    const securityRoles = [
        { name: "ROM - Base", id: "158781c7-f92c-eb11-a813-000d3af3a7a7" },
        { name: "ROM - Inspector", id: "ed37675e-f72c-eb11-a813-000d3af3a7a7" },
        { name: "ROM - Planner", id: "9f03e814-29f5-eb11-94ef-000d3af36036" },
        { name: "ROM - Manager", id: "85e36d25-29f5-eb11-94ef-000d3af36036" },
        { name: "ROM - Business Admin", id: "779105f0-8d3a-eb11-a813-000d3af3fc19" },
    ]

    const roleAccessTablesDiv = document.getElementById("roleAccessTables");
    const workOrderTable = document.createElement("table");
    roleAccessTablesDiv.appendChild(workOrderTable);

    const workOrderTableHeader = workOrderTable.createTHead();
    const workOrderTableHeaderTitleRow = workOrderTableHeader.insertRow();
    const workOrderTableHeaderTitleHeader = document.createElement("th");
    workOrderTableHeaderTitleHeader.colSpan = 9
    workOrderTableHeaderTitleHeader.innerHTML = "msdyn_workorder";
    workOrderTableHeaderTitleRow.appendChild(workOrderTableHeaderTitleHeader)

    const workOrderTableHeaderRow = workOrderTableHeader.insertRow();
    const workOrderTableRoleNameHeader = document.createElement("th");
    const workOrderTableCreateHeader = document.createElement("th");
    const workOrderTableReadHeader = document.createElement("th");
    const workOrderTableWriteHeader = document.createElement("th");
    const workOrderTableDeleteHeader = document.createElement("th");
    const workOrderTableAppendHeader = document.createElement("th");
    const workOrderTableAppendToHeader = document.createElement("th");
    const workOrderTableAssignHeader = document.createElement("th");
    const workOrderTableShareHeader = document.createElement("th");

    workOrderTableRoleNameHeader.innerHTML = "Security Role";
    workOrderTableCreateHeader.innerHTML = "Create";
    workOrderTableReadHeader.innerHTML = "Read";
    workOrderTableWriteHeader.innerHTML = "Write";
    workOrderTableDeleteHeader.innerHTML = "Delete";
    workOrderTableAppendHeader.innerHTML = "Append";
    workOrderTableAppendToHeader.innerHTML = "Append To";
    workOrderTableAssignHeader.innerHTML = "Assign";
    workOrderTableShareHeader.innerHTML = "Share";

    workOrderTableHeaderRow.appendChild(workOrderTableRoleNameHeader);
    workOrderTableHeaderRow.appendChild(workOrderTableCreateHeader);
    workOrderTableHeaderRow.appendChild(workOrderTableReadHeader);
    workOrderTableHeaderRow.appendChild(workOrderTableWriteHeader);
    workOrderTableHeaderRow.appendChild(workOrderTableDeleteHeader);
    workOrderTableHeaderRow.appendChild(workOrderTableAppendHeader);
    workOrderTableHeaderRow.appendChild(workOrderTableAppendToHeader);
    workOrderTableHeaderRow.appendChild(workOrderTableAssignHeader);
    workOrderTableHeaderRow.appendChild(workOrderTableShareHeader);

    for (let securityRole of securityRoles) {
        let fetchXml = [
            "<fetch>",
            "  <entity name='roleprivileges'>",
            "    <attribute name='privilegedepthmask'/>",
            "    <filter>",
            "      <condition attribute='roleid' operator='eq' value='" + securityRole.id + "'/>",
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

        workOrderTableRoleNameData.innerHTML = securityRole.name;
        workOrderTableCreateData.innerHTML = workOrderPrivilegesData.Create;
        workOrderTableReadData.innerHTML = workOrderPrivilegesData.Read;
        workOrderTableWriteData.innerHTML = workOrderPrivilegesData.Write;
        workOrderTableDeleteData.innerHTML = workOrderPrivilegesData.Delete;
        workOrderTableAppendData.innerHTML = workOrderPrivilegesData.Append;
        workOrderTableAppendToData.innerHTML = workOrderPrivilegesData.AppendTo;
        workOrderTableAssignData.innerHTML = workOrderPrivilegesData.Assign;
        workOrderTableShareData.innerHTML = workOrderPrivilegesData.Share;
    }
}
