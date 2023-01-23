

async function buildRoleAccessTables(formContext, wrCtrl) {
    const lang = parent.Xrm.Utility.getGlobalContext().userSettings.languageId;
    const contentWindow = await wrCtrl.getContentWindow().then(function (win) { return win });
    const securityRoles = JSON.parse(formContext.getAttribute("ts_securityroles").getValue().replace(/(\r\n|\n|\r)/gm, ""));
    const powerAppsEntities = JSON.parse(formContext.getAttribute("ts_tables").getValue().replace(/(\r\n|\n|\r)/gm, ""));

    const roleAccessTablesDiv = contentWindow.document.getElementById("roleAccessTables");

    for (let powerAppsEntity of powerAppsEntities) {
        const sercurityRoleAccessTable = document.createElement("table");
        roleAccessTablesDiv.appendChild(sercurityRoleAccessTable);
        populateSecurityRolePrivilegeTable(sercurityRoleAccessTable, securityRoles, powerAppsEntity, lang);
    }
}

async function populateSecurityRolePrivilegeTable(sercurityRoleAccessTable, securityRoles, powerAppsEntity, lang) {
    let securityRoleHeaderLocalized = "Security Role";
    let createHeaderLocalized = "Create";
    let readHeaderLocalized = "Read";
    let writeHeaderLocalized = "Write";
    let deleteHeaderLocalized = "Delete";
    let appendHeaderLocalized = "Append";
    let appendToHeaderLocalized = "Append To";
    let assignHeaderLocalized = "Assign";
    let shareHeaderLocalized = "Share";
    
    if (lang == 1036) {
        securityRoleHeaderLocalized = "Rôle de sécurité";
        createHeaderLocalized = "Créer";
        readHeaderLocalized = "Lire";
        writeHeaderLocalized = "Écrire";
        deleteHeaderLocalized = "Supprimer";
        appendHeaderLocalized = "Ajouter";
        appendToHeaderLocalized = "Ajouter à";
        assignHeaderLocalized = "Attribuer";
        shareHeaderLocalized = "Partager";
    }
    const sercurityRoleAccessTableHeader = sercurityRoleAccessTable.createTHead();
    const sercurityRoleAccessTableHeaderTitleRow = sercurityRoleAccessTableHeader.insertRow();
    const sercurityRoleAccessTableHeaderTitleHeader = document.createElement("th");
    sercurityRoleAccessTableHeaderTitleHeader.colSpan = 9;
    sercurityRoleAccessTableHeaderTitleHeader.innerHTML = powerAppsEntity.plainTextName;
    sercurityRoleAccessTableHeaderTitleRow.appendChild(sercurityRoleAccessTableHeaderTitleHeader);

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

    sercurityRoleAccessTableRoleNameHeader.innerHTML = securityRoleHeaderLocalized;
    sercurityRoleAccessTableCreateHeader.innerHTML = createHeaderLocalized;
    sercurityRoleAccessTableReadHeader.innerHTML = readHeaderLocalized;
    sercurityRoleAccessTableWriteHeader.innerHTML = writeHeaderLocalized;
    sercurityRoleAccessTableDeleteHeader.innerHTML = deleteHeaderLocalized;
    sercurityRoleAccessTableAppendHeader.innerHTML = appendHeaderLocalized;
    sercurityRoleAccessTableAppendToHeader.innerHTML = appendToHeaderLocalized;
    sercurityRoleAccessTableAssignHeader.innerHTML = assignHeaderLocalized;
    sercurityRoleAccessTableShareHeader.innerHTML = shareHeaderLocalized;

    sercurityRoleAccessTableHeaderRow.appendChild(sercurityRoleAccessTableRoleNameHeader);
    sercurityRoleAccessTableHeaderRow.appendChild(sercurityRoleAccessTableCreateHeader);
    sercurityRoleAccessTableHeaderRow.appendChild(sercurityRoleAccessTableReadHeader);
    sercurityRoleAccessTableHeaderRow.appendChild(sercurityRoleAccessTableWriteHeader);
    sercurityRoleAccessTableHeaderRow.appendChild(sercurityRoleAccessTableDeleteHeader);
    sercurityRoleAccessTableHeaderRow.appendChild(sercurityRoleAccessTableAppendHeader);
    sercurityRoleAccessTableHeaderRow.appendChild(sercurityRoleAccessTableAppendToHeader);
    sercurityRoleAccessTableHeaderRow.appendChild(sercurityRoleAccessTableAssignHeader);
    sercurityRoleAccessTableHeaderRow.appendChild(sercurityRoleAccessTableShareHeader);

    const sercurityRoleAccessTableDataBody = sercurityRoleAccessTable.createTBody();
    for (let securityRole of securityRoles) {
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
        parent.Xrm.WebApi.retrieveMultipleRecords("roleprivileges", fetchXml).then(function (result) {
            securityRolePrivileges = result.entities;
            const securityRolePrivilegesData = {
                Create: "",
                Read: "",
                Write: "",
                Delete: "",
                Append: "",
                AppendTo: "",
                Assign: "",
                Share: "",
            }

            for (let privilege of securityRolePrivileges) {
                switch (privilege["priv.name"].toLowerCase()) {
                    case "prvcreate" + powerAppsEntity.logicalname:
                        securityRolePrivilegesData.Create = convertPrivilegeDepthCodeToText(privilege.privilegedepthmask, lang);
                        break;
                    case "prvread" + powerAppsEntity.logicalname:
                        securityRolePrivilegesData.Read = convertPrivilegeDepthCodeToText(privilege.privilegedepthmask, lang);
                        break;
                    case "prvwrite" + powerAppsEntity.logicalname:
                        securityRolePrivilegesData.Write = convertPrivilegeDepthCodeToText(privilege.privilegedepthmask, lang);
                        break;
                    case "prvdelete" + powerAppsEntity.logicalname:
                        securityRolePrivilegesData.Delete = convertPrivilegeDepthCodeToText(privilege.privilegedepthmask, lang);
                        break;
                    case "prvappend" + powerAppsEntity.logicalname:
                        securityRolePrivilegesData.Append = convertPrivilegeDepthCodeToText(privilege.privilegedepthmask, lang);
                        break;
                    case "prvappendto" + powerAppsEntity.logicalname:
                        securityRolePrivilegesData.AppendTo = convertPrivilegeDepthCodeToText(privilege.privilegedepthmask, lang);
                        break;
                    case "prvassign" + powerAppsEntity.logicalname:
                        securityRolePrivilegesData.Assign = convertPrivilegeDepthCodeToText(privilege.privilegedepthmask, lang);
                        break;
                    case "prvshare" + powerAppsEntity.logicalname:
                        securityRolePrivilegesData.Share = convertPrivilegeDepthCodeToText(privilege.privilegedepthmask, lang);
                        break;
                }
            }

            sercurityRoleAccessTableRoleNameData.innerHTML = securityRole.name;
            sercurityRoleAccessTableRoleNameData.style.textAlign = "left";
            sercurityRoleAccessTableCreateData.innerHTML = securityRolePrivilegesData.Create;
            sercurityRoleAccessTableReadData.innerHTML = securityRolePrivilegesData.Read;
            sercurityRoleAccessTableWriteData.innerHTML = securityRolePrivilegesData.Write;
            sercurityRoleAccessTableDeleteData.innerHTML = securityRolePrivilegesData.Delete;
            sercurityRoleAccessTableAppendData.innerHTML = securityRolePrivilegesData.Append;
            sercurityRoleAccessTableAppendToData.innerHTML = securityRolePrivilegesData.AppendTo;
            sercurityRoleAccessTableAssignData.innerHTML = securityRolePrivilegesData.Assign;
            sercurityRoleAccessTableShareData.innerHTML = securityRolePrivilegesData.Share;
        });
    }
}

function onLoad(eContext) {
    const formContext = eContext.getFormContext();
    const wrCtrl = formContext.getControl('WebResource_securityroleprivilegecompare');
    buildRoleAccessTables(formContext, wrCtrl);
}

function convertPrivilegeDepthCodeToText(depth, lang) {
    let userLabelLocalized = "U";
    let BusinessUnitLabelLocalized = "BU";
    let parentChildLabelLocalized = "P:C";
    let OrganisationChildLabelLocalized = "Org";
    let errorLabelLocalized = "Error";

    if (lang == 1036) {
        userLabelLocalized = "U";
        BusinessUnitLabelLocalized = "D";
        parentChildLabelLocalized = "M:SD";
        OrganisationChildLabelLocalized = "Org";
        errorLabelLocalized = "Erreur";
    }

    switch (depth) {
        case 8:
            return OrganisationChildLabelLocalized;
        case 4:
            return parentChildLabelLocalized;
        case 2:
            return BusinessUnitLabelLocalized;
        case 1:
            return userLabelLocalized;
        default:
            return errorLabelLocalized;
    }
}

//Takes the logical name of an entity and returns the localized display name for that entity
//Might use this later, but it's really slow and not every table has a good display name set in both languages.
async function getTableName(logicalname, lang) {
    let fetchXml = [
        "<fetch top='1'>",
        "  <entity name='msdyn_solutioncomponentsummary'>",
        "    <attribute name='msdyn_displayname'/>",
        "    <filter>",
        "      <condition attribute='msdyn_name' operator='eq' value='" + logicalname + "'/>",
        "    </filter>",
        "  </entity>",
        "</fetch>"
    ].join("");
    fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
    let tableName = "";
    tableName = await Xrm.WebApi.retrieveMultipleRecords("msdyn_solutioncomponentsummary", fetchXml).then(function (result) {
        return (result.entities[0] != null) ? result.entities[0].msdyn_displayname : ((lang == 1036) ? "Erreur" : "Error");
    });
    return tableName;
}