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

    const powerAppsEntities = [
        { plainTextName: "Work Order", logicalname: "msdyn_workorder" },
        { plainTextName: "Case", logicalname: "incident" },
        { plainTextName: "Operation", logicalname: "ovs_operation" },
        { plainTextName: "Site", logicalname: "msdyn_functionallocation" },
        { plainTextName: "Operation Type", logicalname: "ovs_operationtype" },
        { plainTextName: "Stakeholder", logicalname: "account" },
    ]

    const roleAccessTablesDiv = document.getElementById("roleAccessTables");

    for (let powerAppsEntity of powerAppsEntities) {
        const sercurityRoleAccessTable = document.createElement("table");
        roleAccessTablesDiv.appendChild(sercurityRoleAccessTable);

        const sercurityRoleAccessTableHeader = sercurityRoleAccessTable.createTHead();
        const sercurityRoleAccessTableHeaderTitleRow = sercurityRoleAccessTableHeader.insertRow();
        const sercurityRoleAccessTableHeaderTitleHeader = document.createElement("th");
        sercurityRoleAccessTableHeaderTitleHeader.colSpan = 9
        sercurityRoleAccessTableHeaderTitleHeader.innerHTML = powerAppsEntity.plainTextName;
        sercurityRoleAccessTableHeaderTitleRow.appendChild(sercurityRoleAccessTableHeaderTitleHeader)

        const sercurityRoleAccessTableHeaderRow = sercurityRoleAccessTableHeader.insertRow();
        const sercurityRoleAccessTableRoleNameHeader = document.createElement("th");
        const sercurityRoleAccessTableCreateHeader = document.createElement("th");
        const sercurityRoleAccessTableReadHeader = document.createElement("th");
        const sercurityRoleAccessTableWriteHeader = document.createElement("th");
        const sercurityRoleAccessTableDeleteHeader = document.createElement("th");
        const sercurityRoleAccessTableAppendHeader = document.createElement("th");
        const sercurityRoleAccessTableAppendToHeader = document.createElement("th");
        const sercurityRoleAccessTableAssignHeader = document.createElement("th");
        const sercurityRoleAccessTableShareHeader = document.createElement("th");

        sercurityRoleAccessTableRoleNameHeader.innerHTML = "Security Role";
        sercurityRoleAccessTableCreateHeader.innerHTML = "Create";
        sercurityRoleAccessTableReadHeader.innerHTML = "Read";
        sercurityRoleAccessTableWriteHeader.innerHTML = "Write";
        sercurityRoleAccessTableDeleteHeader.innerHTML = "Delete";
        sercurityRoleAccessTableAppendHeader.innerHTML = "Append";
        sercurityRoleAccessTableAppendToHeader.innerHTML = "Append To";
        sercurityRoleAccessTableAssignHeader.innerHTML = "Assign";
        sercurityRoleAccessTableShareHeader.innerHTML = "Share";

        sercurityRoleAccessTableHeaderRow.appendChild(sercurityRoleAccessTableRoleNameHeader);
        sercurityRoleAccessTableHeaderRow.appendChild(sercurityRoleAccessTableCreateHeader);
        sercurityRoleAccessTableHeaderRow.appendChild(sercurityRoleAccessTableReadHeader);
        sercurityRoleAccessTableHeaderRow.appendChild(sercurityRoleAccessTableWriteHeader);
        sercurityRoleAccessTableHeaderRow.appendChild(sercurityRoleAccessTableDeleteHeader);
        sercurityRoleAccessTableHeaderRow.appendChild(sercurityRoleAccessTableAppendHeader);
        sercurityRoleAccessTableHeaderRow.appendChild(sercurityRoleAccessTableAppendToHeader);
        sercurityRoleAccessTableHeaderRow.appendChild(sercurityRoleAccessTableAssignHeader);
        sercurityRoleAccessTableHeaderRow.appendChild(sercurityRoleAccessTableShareHeader);

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
                "        <condition attribute='name' operator='ends-with' value='" + powerAppsEntity.logicalname + "'/>",
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
                switch (privilege["priv.name"].toLowerCase()) {
                    case "prvcreate" + powerAppsEntity.logicalname:
                        workOrderPrivilegesData.Create = privilege.privilegedepthmask
                        break;
                    case "prvread" + powerAppsEntity.logicalname:
                        workOrderPrivilegesData.Read = privilege.privilegedepthmask
                        break;
                    case "prvwrite" + powerAppsEntity.logicalname:
                        workOrderPrivilegesData.Write = privilege.privilegedepthmask
                        break;
                    case "prvdelete" + powerAppsEntity.logicalname:
                        workOrderPrivilegesData.Delete = privilege.privilegedepthmask
                        break;
                    case "prvappend" + powerAppsEntity.logicalname:
                        workOrderPrivilegesData.Append = privilege.privilegedepthmask
                        break;
                    case "prvappendTo" + powerAppsEntity.logicalname:
                        workOrderPrivilegesData.AppendTo = privilege.privilegedepthmask
                        break;
                    case "prvassign" + powerAppsEntity.logicalname:
                        workOrderPrivilegesData.Assign = privilege.privilegedepthmask
                        break;
                    case "prvshare" + powerAppsEntity.logicalname:
                        workOrderPrivilegesData.Share = privilege.privilegedepthmask
                        break;

                }
            }

            const sercurityRoleAccessTableDataBody = sercurityRoleAccessTable.createTBody();
            const sercurityRoleAccessTableDataRow = sercurityRoleAccessTableDataBody.insertRow();
            const sercurityRoleAccessTableRoleNameData = sercurityRoleAccessTableDataRow.insertCell();
            const sercurityRoleAccessTableCreateData = sercurityRoleAccessTableDataRow.insertCell();
            const sercurityRoleAccessTableReadData = sercurityRoleAccessTableDataRow.insertCell();
            const sercurityRoleAccessTableWriteData = sercurityRoleAccessTableDataRow.insertCell();
            const sercurityRoleAccessTableDeleteData = sercurityRoleAccessTableDataRow.insertCell();
            const sercurityRoleAccessTableAppendData = sercurityRoleAccessTableDataRow.insertCell();
            const sercurityRoleAccessTableAppendToData = sercurityRoleAccessTableDataRow.insertCell();
            const sercurityRoleAccessTableAssignData = sercurityRoleAccessTableDataRow.insertCell();
            const sercurityRoleAccessTableShareData = sercurityRoleAccessTableDataRow.insertCell();

            sercurityRoleAccessTableRoleNameData.innerHTML = securityRole.name;
            sercurityRoleAccessTableCreateData.innerHTML = workOrderPrivilegesData.Create;
            sercurityRoleAccessTableReadData.innerHTML = workOrderPrivilegesData.Read;
            sercurityRoleAccessTableWriteData.innerHTML = workOrderPrivilegesData.Write;
            sercurityRoleAccessTableDeleteData.innerHTML = workOrderPrivilegesData.Delete;
            sercurityRoleAccessTableAppendData.innerHTML = workOrderPrivilegesData.Append;
            sercurityRoleAccessTableAppendToData.innerHTML = workOrderPrivilegesData.AppendTo;
            sercurityRoleAccessTableAssignData.innerHTML = workOrderPrivilegesData.Assign;
            sercurityRoleAccessTableShareData.innerHTML = workOrderPrivilegesData.Share;
        }
    }
}
