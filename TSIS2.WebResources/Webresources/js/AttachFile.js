// Hardcoded owner names for SharePoint flows - flows check for these exact strings
// Using hardcoded values so SharePoint flows don't need to be modified
var avsecOwnerName = "Aviation Security";
var issoOwnerName = "Intermodal Surface Security Oversight";

// Display names retrieved from database for user-facing messages
var avsecDisplayName = null;
var issoDisplayName = null;

function FileUploadData() {
    this.recordTableNameEnglish = "";
    this.recordTableNameFrench = "";
    this.recordOwner = "";
    this.recordName = "";
    this.mainHeadingEnglish = "";
    this.mainHeadingFrench = "";
    this.usesGroupFiles = false;
    this.validOwner = false;
    this.sharePointFileID = "";
    this.sharePointFileGroupID = "";
    this.sharePointQuery = "";
    this.usersManagerEmail = "";
    this.usersEmail = "";
    this.businessUnitId = "";
}

async function OpenFileUploadPage(PrimaryControl, PrimaryTypeEntityName, PrimaryControlId) {
    const lang = Xrm.Utility.getGlobalContext().userSettings.languageId;

    const fileUploadData = new FileUploadData();

    let recordTagId = "";

    recordTagId = PrimaryControl.data.entity.getId().replace("{", "").replace("}", "");

    // Get actual BU names from database for user-facing messages
    avsecDisplayName = await getAvSecBUName();
    issoDisplayName = await getISSOBUName();

    //Get the FetchXml to use
    let recordOwnerFetchXML = getFetchXmlForRecordOwner(PrimaryTypeEntityName, recordTagId);

    let encodedRecordOwnerFetchXML = encodeURIComponent(recordOwnerFetchXML);

    //Set the meta-data tags to be sent to the canvas page app
    setEntitySpecificValues(PrimaryTypeEntityName, fileUploadData);

    //Default Invalid owner message
    let invalidOwnerMessageEnglish =
        "The record has an invalid owner.  It must belong to " + avsecDisplayName + " or " + issoDisplayName + ".";

    let invalidOwnerMessageFrench =
        "L'enregistrement a un propriétaire invalide. Il doit appartenir à " +
        avsecDisplayName +
        " ou " +
        issoDisplayName +
        ".";

    // Wait for securityToken and flowURL to be retrieved
    var turnOffDocumentCentre = await getEnvironmentVariableByName("ts_TurnoffDocumentCentre");

    parent.Xrm.WebApi.retrieveMultipleRecords(PrimaryTypeEntityName, "?fetchXml=" + encodedRecordOwnerFetchXML).then(
        async function success(result) {
            // make sure Owner is not null
            if (result.entities[0] != undefined) {
                fileUploadData.recordOwner = result.entities[0].recordOwner;
                fileUploadData.recordName = result.entities[0].recordName;
                fileUploadData.recordOwnerTeamId = result.entities[0].recordOwnerTeamId || null;
                fileUploadData.businessUnitId = result.entities[0].businessUnitId || null;
 
                let siteNameEnglish = "";

                if (PrimaryTypeEntityName == "msdyn_functionallocation") {
                    siteNameEnglish = result.entities[0].siteNameEnglish;
                }

                await modifyRecordOwner(
                    PrimaryTypeEntityName,
                    fileUploadData.recordOwner,
                    fileUploadData.recordName,
                    siteNameEnglish,
                    fileUploadData
                );

                if (fileUploadData.validOwner == true) {
                    //if (fileUploadData.usesGroupFiles == true) {

                    if (turnOffDocumentCentre) {
                        // get the users Email address
                        getUsersEmail(fileUploadData).then(() => {
                            // navigate to SharePointAttachFilePopUp.html
                            navigateToSharePointAttachFilePopUp(
                                recordTagId,
                                fileUploadData.recordOwner,
                                lang,
                                fileUploadData.recordTableNameEnglish,
                                fileUploadData.recordTableNameFrench,
                                fileUploadData.recordName,
                                PrimaryTypeEntityName,
                                fileUploadData.mainHeadingFrench,
                                fileUploadData.mainHeadingEnglish,
                                fileUploadData.usesGroupFiles,
                                fileUploadData.sharePointFileID,
                                fileUploadData.sharePointFileGroupID,
                                fileUploadData.sharePointQuery,
                                fileUploadData.usersManagerEmail,
                                fileUploadData.usersEmail,
                                fileUploadData.businessUnitId
                            );
                        });
                    }
                    // }
                } else {
                    // display the error message
                    if (lang == 1033) {
                        alert(invalidOwnerMessageEnglish);
                    } else {
                        alert(invalidOwnerMessageFrench);
                    }
                }
            } else {
                // if we are working with an Action record - show a customized message
                if (PrimaryTypeEntityName == "ts_action") {
                    invalidOwnerMessageEnglish =
                        "The record has an invalid owner.  It must belong to " +
                        avsecDisplayName +
                        " or " +
                        issoDisplayName +
                        ". Make sure the Action record has a Case.";
                    invalidOwnerMessageFrench =
                        "L'enregistrement a un propriétaire invalide. Il doit appartenir à " +
                        avsecDisplayName +
                        " ou " +
                        issoDisplayName +
                        ". Assurez-vous que l'enregistrement d'action a un cas.";
                }

                // display the error message
                if (lang == 1033) {
                    alert(invalidOwnerMessageEnglish);
                } else {
                    alert(invalidOwnerMessageFrench);
                }
            }
        },
        function (error) {
            // handle error conditions
            console.log(`Error retrieving who the owner of ${PrimaryTypeEntityName}: ` + error.message);
        }
    );
}

// Separate method to navigate to SharePointAttachFilePopUp.html
function navigateToSharePointAttachFilePopUp(
    recordTagId,
    recordOwner,
    lang,
    recordTableNameEnglish,
    recordTableNameFrench,
    recordName,
    PrimaryTypeEntityName,
    mainHeadingFrench,
    mainHeadingEnglish,
    usesGroupFiles,
    relatedSharePointFileID,
    relatedSharePointFileGroupID,
    relatedSharePointQuery,
    relatedManagerEmail,
    relatedUserEmail,
    businessUnitId
) {
    var jsonData = {
        recordId: recordTagId,
        recordOwnerName: recordOwner,
        userLanguage: lang,
        tableNameEnglish: recordTableNameEnglish,
        tableNameFrench: recordTableNameFrench,
        tableRecordName: recordName,
        tableSchemaName: PrimaryTypeEntityName,
        useGroupFiles: usesGroupFiles,
        sharePointFileID: relatedSharePointFileID,
        sharePointFileGroupID: relatedSharePointFileGroupID,
        sharePointQuery: relatedSharePointQuery,
        usersManagerEmail: relatedManagerEmail,
        usersEmail: relatedUserEmail,
        businessUnitId: businessUnitId
    };

    var jsonString = JSON.stringify(jsonData).toString();

    // Centered Dialog
    var pageInput = {
        pageType: "webresource",
        webresourceName: "ts_/html/SharePointAttachFilePopUp.html",
        data: jsonString,
    };

    // Note: remember for height take into consideration the size of the heading of the dialog pop up
    var navigationOptions = {
        target: 2,
        position: 1,
        width: { value: 600, unit: "px" },
        height: { value: 770, unit: "px" },
        title: lang == 1036 ? mainHeadingFrench : mainHeadingEnglish,
    };

    parent.Xrm.Navigation.navigateTo(pageInput, navigationOptions).then(function (returnValue) {
        if (returnValue) {
            // Once the pop-up is closed, refresh the attachment sub grid
            //parent.Xrm.Page.getControl("attachmentsGrid").refresh();
        }
    });
}

// FetchXml to use for each table
function getFetchXmlForRecordOwner(tableName, recordTagId) {
    switch (tableName) {
        case "incident":
            return `
                <fetch xmlns:generator='MarkMpn.SQL4CDS' distinct='true'>
                  <entity name='incident'>
                    <attribute name='title' alias='recordName' />
                    <filter>
                      <condition attribute='incidentid' operator='eq' value="${recordTagId}" />
                    </filter>
                    <link-entity name='msdyn_workorder' from='msdyn_servicerequest' to='incidentid' alias='workorder'>
                      <link-entity name='ovs_operationtype' from='ovs_operationtypeid' to='ovs_operationtypeid' alias='operationtype'>
                        <link-entity name='team' from='teamid' to='ownerid' alias='teamrelationship'>
                          <attribute name='name' alias='recordOwner' />
                          <attribute name='teamid' alias='recordOwnerTeamId' />
                          <attribute name='businessunitid' alias='businessUnitId' />
                        </link-entity>
                      </link-entity>
                    </link-entity>
                  </entity>
                </fetch>
            `;
        case "msdyn_workorder":
            return `
                <fetch xmlns:generator='MarkMpn.SQL4CDS'>
                  <entity name='msdyn_workorder'>
                    <attribute name='msdyn_name' alias='recordName' />
                    <link-entity name='ovs_operationtype' to='ovs_operationtypeid' from='ovs_operationtypeid' alias='ovs_operationtype' link-type='inner'>
                      <link-entity name='team' to='owningteam' from='teamid' alias='team' link-type='inner'>
                        <attribute name='name' alias='recordOwner' />
                        <attribute name='teamid' alias='recordOwnerTeamId' />
                        <attribute name='businessunitid' alias='businessUnitId' />
                      </link-entity>
                    </link-entity>
                    <filter>
                      <condition attribute='msdyn_workorderid' operator='eq' value="${recordTagId}" />
                    </filter>
                  </entity>
                </fetch>
            `;
        case "msdyn_workorderservicetask":
            return `
                <fetch xmlns:generator='MarkMpn.SQL4CDS'>
                  <entity name='msdyn_workorderservicetask'>
                    <attribute name='msdyn_name' alias='recordName' />
                    <link-entity name='msdyn_workorder' to='msdyn_workorder' from='msdyn_workorderid' alias='msdyn_workorder' link-type='inner'>
                      <link-entity name='ovs_operationtype' to='ovs_operationtypeid' from='ovs_operationtypeid' alias='ovs_operationtype' link-type='inner'>
                        <link-entity name='team' to='owningteam' from='teamid' alias='team' link-type='inner'>
                          <attribute name='name' alias='recordOwner' />
                          <attribute name='teamid' alias='recordOwnerTeamId' />
                          <attribute name='businessunitid' alias='businessUnitId' />
                        </link-entity>
                      </link-entity>
                    </link-entity>
                    <filter>
                      <condition attribute='msdyn_workorderservicetaskid' operator='eq' value="${recordTagId}" />
                    </filter>
                  </entity>
                </fetch>
            `;
        case "account":
            return `
                <fetch xmlns:generator='MarkMpn.SQL4CDS'>
                  <entity name='account'>
                    <attribute name='name' alias='recordName' />
                    <link-entity name='team' to='owningteam' from='teamid' alias='team' link-type='inner'>
                      <attribute name='name' alias='recordOwner' />
                      <attribute name='teamid' alias='recordOwnerTeamId' />
                      <attribute name='businessunitid' alias='businessUnitId' />
                    </link-entity>
                    <filter>
                      <condition attribute='accountid' operator='eq' value="${recordTagId}" />
                    </filter>
                  </entity>
                </fetch>
            `;
        case "ovs_operation":
            return `
                <fetch xmlns:generator='MarkMpn.SQL4CDS'>
                  <entity name='ovs_operation'>
                    <attribute name='ovs_name' alias='recordName' />
                    <link-entity name='team' to='owningteam' from='teamid' alias='team' link-type='inner'>
                      <attribute name='name' alias='recordOwner' />
                      <attribute name='teamid' alias='recordOwnerTeamId' />
                      <attribute name='businessunitid' alias='businessUnitId' />
                    </link-entity>
                    <filter>
                      <condition attribute='ovs_operationid' operator='eq' value="${recordTagId}" />
                    </filter>
                  </entity>
                </fetch>
            `;
        case "msdyn_functionallocation":
            return `
                <fetch xmlns:generator='MarkMpn.SQL4CDS'>
                  <entity name='msdyn_functionallocation'>
                    <attribute name='msdyn_name' alias='recordName' />
                    <attribute name='ts_functionallocationnameenglish' alias='siteNameEnglish' />
                    <link-entity name='team' to='owningteam' from='teamid' alias='team' link-type='inner'>
                      <attribute name='name' alias='recordOwner' />
                      <attribute name='teamid' alias='recordOwnerTeamId' />
                      <attribute name='businessunitid' alias='businessUnitId' />
                    </link-entity>
                    <filter>
                      <condition attribute='msdyn_functionallocationid' operator='eq' value="${recordTagId}" />
                    </filter>
                  </entity>
                </fetch>
            `;
        case "ts_securityincident":
            return `
                <fetch xmlns:generator='MarkMpn.SQL4CDS'>
                  <entity name='ts_securityincident'>
                    <attribute name='ts_name' alias='recordName' />
                    <attribute name='ts_mode' alias='recordOwner' />
                    <attribute name='owningbusinessunit' alias='businessUnitId' />
                    <filter>
                      <condition attribute='ts_securityincidentid' operator='eq' value="${recordTagId}" />
                    </filter>
                  </entity>
                </fetch>
            `;
        case "ts_exemption":
            return `
                <fetch xmlns:generator='MarkMpn.SQL4CDS'>
                  <entity name='ts_exemption'>
                    <attribute name='ts_name' alias='recordName' />
                    <attribute name='ts_program' alias='recordOwner' />
                    <attribute name='owningbusinessunit' alias='businessUnitId' />
                    <filter>
                      <condition attribute='ts_exemptionid' operator='eq' value="${recordTagId}" />
                    </filter>
                  </entity>
                </fetch>
            `;
        case "ts_action":
            return `
                <fetch xmlns:generator="MarkMpn.SQL4CDS">
                  <entity name="ts_action">
                    <attribute name="ts_name" alias="recordName" />
                    <attribute name="ts_actionid" />
                    <link-entity name="incident" to="ts_case" from="incidentid" alias="incident" link-type="inner">
                      <attribute name="incidentid" />
                      <link-entity name="msdyn_workorder" to="incidentid" from="msdyn_servicerequest" alias="msdyn_workorder" link-type="inner">
                        <attribute name="msdyn_workorderid" />
                        <link-entity name="ovs_operationtype" to="ovs_operationtypeid" from="ovs_operationtypeid" alias="ovs_operationtype" link-type="inner">
                          <attribute name="ovs_operationtypeid" />
                          <link-entity name="team" to="owningteam" from="teamid" alias="team" link-type="inner">
                            <attribute name="name" alias="recordOwner" />
                            <attribute name="teamid" alias="recordOwnerTeamId" />
                            <attribute name='businessunitid' alias='businessUnitId' />
                            <order attribute="teamid" />
                          </link-entity>
                          <order attribute="ovs_operationtypeid" />
                        </link-entity>
                        <order attribute="msdyn_workorderid" />
                      </link-entity>
                      <order attribute="incidentid" />
                    </link-entity>
                    <filter>
                      <condition attribute="ts_actionid" operator="eq" value="${recordTagId}" />
                    </filter>
                    <order attribute="ts_actionid" />
                  </entity>
                </fetch>
            `;
        case "ts_trip":
            return `
              <fetch xmlns:generator='MarkMpn.SQL4CDS'>
                <entity name='ts_trip'>
                    <attribute name='ts_name' alias='recordName' />
                    <filter>
                        <condition attribute='ts_tripid' operator='eq' value='${recordTagId}' />
                    </filter>
                    <link-entity name='businessunit' from='businessunitid' to='owningbusinessunit' link-type='inner' alias='bu'>
                        <attribute name='name' alias='recordOwner' />
                        <attribute name='businessunitid' alias='recordOwnerBUId' />
                    </link-entity>
                </entity>
              </fetch>
            `;
        // Add more cases for other entity types as needed
    }
}

function setEntitySpecificValues(entityName, fileUploadData) {
    // Set headers and table names based on entity type
    switch (entityName) {
        case "msdyn_workorder":
            fileUploadData.recordTableNameEnglish = "Work Order";
            fileUploadData.recordTableNameFrench = "Ordre de travail";
            fileUploadData.mainHeadingEnglish = "Add File(s) to Work Order Documents";
            fileUploadData.mainHeadingFrench = "Ajouter un/des fichier(s) aux documents d'ordre de travail";
            fileUploadData.usesGroupFiles = true;
            break;
        case "msdyn_workorderservicetask":
            fileUploadData.recordTableNameEnglish = "Work Order Service Task";
            fileUploadData.recordTableNameFrench = "Tâche de service de l'ordre de travail";
            fileUploadData.mainHeadingEnglish = "Add File(s) to Inspection Documents";
            fileUploadData.mainHeadingFrench = "Ajouter un/des fichier(s) aux documents d'inspection";
            fileUploadData.usesGroupFiles = true;
            break;
        case "incident":
            fileUploadData.recordTableNameEnglish = "Case";
            fileUploadData.recordTableNameFrench = "Cas";
            fileUploadData.mainHeadingEnglish = "Add File(s) to Case Documents";
            fileUploadData.mainHeadingFrench = "Ajouter un/des fichier(s) aux documents du cas";
            fileUploadData.usesGroupFiles = true;
            break;
        case "account":
            fileUploadData.recordTableNameEnglish = "Stakeholder";
            fileUploadData.recordTableNameFrench = "Partie prenante";
            fileUploadData.mainHeadingEnglish = "Add File(s) to Stakeholder Documents";
            fileUploadData.mainHeadingFrench = "Ajouter un/des fichier(s) aux documents d'intervenant";
            fileUploadData.usesGroupFiles = false;
            break;
        case "ovs_operation":
            fileUploadData.recordTableNameEnglish = "Operation";
            fileUploadData.recordTableNameFrench = "Opération";
            fileUploadData.mainHeadingEnglish = "Add File(s) to Operation Documents";
            fileUploadData.mainHeadingFrench = "Ajouter un/des fichier(s) aux documents d'opération";
            fileUploadData.usesGroupFiles = false;
            break;
        case "msdyn_functionallocation":
            fileUploadData.recordTableNameEnglish = "Site";
            fileUploadData.recordTableNameFrench = "Site";
            fileUploadData.mainHeadingEnglish = "Add File(s) to Site Documents";
            fileUploadData.mainHeadingFrench = "Ajouter un/des fichier(s) aux documents du site";
            fileUploadData.usesGroupFiles = false;
            break;
        case "ts_securityincident":
            fileUploadData.recordTableNameEnglish = "Security Incident";
            fileUploadData.recordTableNameFrench = "Incidents de sûreté";
            fileUploadData.mainHeadingEnglish = "Add File(s) to Security Incident Documents";
            fileUploadData.mainHeadingFrench = "Ajouter un/des fichier(s) aux documents de l'incident de sûreté";
            fileUploadData.usesGroupFiles = false;
            break;
        case "ts_exemption":
            fileUploadData.recordTableNameEnglish = "Exemption";
            fileUploadData.recordTableNameFrench = "Exemption";
            fileUploadData.mainHeadingEnglish = "Add File(s) to Exemption Documents";
            fileUploadData.mainHeadingFrench = "Ajouter un/des fichier(s) aux documents d'exemption";
            fileUploadData.usesGroupFiles = false;
            break;
        case "ts_action":
            fileUploadData.recordTableNameEnglish = "Action";
            fileUploadData.recordTableNameFrench = "Action";
            fileUploadData.mainHeadingEnglish = "Add File(s) to Action Documents";
            fileUploadData.mainHeadingFrench = "Ajouter un/des fichier(s) aux documents d'action";
            fileUploadData.usesGroupFiles = false;
            break;
        case "ts_trip":
            fileUploadData.recordTableNameEnglish = "Trip";
            fileUploadData.recordTableNameFrench = "Voyage";
            fileUploadData.mainHeadingEnglish = "Add File(s) to Trip Documents";
            fileUploadData.mainHeadingFrench = "Ajouter un/des fichier(s) aux documents du voyage";
            fileUploadData.usesGroupFiles = false;
            break;
    }
}

async function modifyRecordOwner(entityName, myRecordOwner, myRecordName, mySiteNameEnglish, fileUploadData) {
    // Modify recordOwner based on specific conditions
    // recordOwner is set to hardcoded values so SharePoint flows don't need to be modified

    // Set headers and table names based on entity type
    switch (entityName) {
        case "msdyn_workorder":
        case "msdyn_workorderservicetask":
        case "incident":
        case "account":
        case "ovs_operation":
        case "ts_action":
            if (fileUploadData.recordOwnerTeamId) {
                const ownerId = fileUploadData.recordOwnerTeamId;
                const isAvSec = await isOwnedByAvSec(ownerId);
                const isISSO = await isOwnedByISSO(ownerId);

                if (isAvSec) {
                    fileUploadData.recordOwner = avsecOwnerName;
                } else if (isISSO) {
                    fileUploadData.recordOwner = issoOwnerName;
                }
            }
            break;

        case "msdyn_functionallocation":
            if (mySiteNameEnglish !== null && mySiteNameEnglish !== "") {
                fileUploadData.recordName = mySiteNameEnglish;
            } else {
                fileUploadData.recordName = myRecordName;
            }

            if (fileUploadData.recordOwnerTeamId) {
                const ownerId = fileUploadData.recordOwnerTeamId;
                const isAvSec = await isOwnedByAvSec(ownerId);
                const isISSO = await isOwnedByISSO(ownerId);

                if (isAvSec) {
                    fileUploadData.recordOwner = avsecOwnerName;
                } else if (isISSO) {
                    fileUploadData.recordOwner = issoOwnerName;
                } else {
                    fileUploadData.recordOwner = "";
                }
            } else {
                fileUploadData.recordOwner = "";
            }

            break;
        case "ts_securityincident":
            if (myRecordOwner !== null && myRecordOwner !== "") {
                if (myRecordOwner == 717750000 || myRecordOwner == 717750001) {
                    fileUploadData.recordOwner = issoOwnerName;
                } else if (myRecordOwner == 717750002) {
                    fileUploadData.recordOwner = avsecOwnerName;
                }
            } else {
                fileUploadData.recordOwner = "";
            }
            break;
        case "ts_exemption":
            if (myRecordOwner !== null && myRecordOwner !== "") {
                if (myRecordOwner == 741130000) {
                    fileUploadData.recordOwner = avsecOwnerName;
                }
            } else {
                fileUploadData.recordOwner = "";
            }
            break;

        case "ts_trip":
            if (fileUploadData.recordOwnerBUId) {
                fileUploadData.businessUnitId = fileUploadData.recordOwnerBUId;
                const isAvSec = await isAvSecBU(fileUploadData.recordOwnerBUId);
                const isISSO = await isISSOBU(fileUploadData.recordOwnerBUId);

                if (isAvSec) {
                    fileUploadData.recordOwner = avsecOwnerName;
                } else if (isISSO) {
                    fileUploadData.recordOwner = issoOwnerName;
                }
            }
            break;
    }

    if (fileUploadData.recordOwner == avsecOwnerName || fileUploadData.recordOwner == issoOwnerName) {
        fileUploadData.validOwner = true;
    }
}
function getUsersEmail(fileUploadData) {
    return new Promise((resolve, reject) => {
        let userId = Xrm.Utility.getGlobalContext().userSettings.userId;

        userId = userId.replace(/[{}]/g, "");

        let managerFetchXML = `
        <fetch xmlns:generator="MarkMpn.SQL4CDS">
          <entity name="systemuser">
            <attribute name="internalemailaddress" />
            <filter>
              <condition attribute="systemuserid" operator="eq" value="${userId}" />
            </filter>
          </entity>
        </fetch>
    `;

        let encodedSharePointFetchXML = encodeURIComponent(managerFetchXML);

        // Get the email
        return parent.Xrm.WebApi.retrieveMultipleRecords("systemuser", "?fetchXml=" + encodedSharePointFetchXML).then(
            function success(result) {
                if (result.entities[0] != undefined) {
                    // get the Manager
                    if (result.entities[0].internalemailaddress != null) {
                        fileUploadData.usersEmail = result.entities[0].internalemailaddress;
                    }
                }
                resolve(); // resolve the promise
            },
            function (error) {
                // handle error conditions
                console.log(`Error retrieving the users Email: ${PrimaryTypeEntityName}: ` + error.message);
                reject(error); // reject the promise
            }
        );
    });
}

async function getEnvironmentVariableByName(variableName) {
    let variableValue = "";

    const fetchXML = `
                                                                                        <fetch>
                                                                                            <entity name="environmentvariablevalue">
                                                                                                <attribute name="value" />
                                                                                                <link-entity name="environmentvariabledefinition" to="environmentvariabledefinitionid" from="environmentvariabledefinitionid" alias="environmentvariabledefinition" link-type="inner">
                                                                                                    <filter>
                                                                                                        <condition attribute="schemaname" operator="eq" value="${variableName}" />
                                                                                                    </filter>
                                                                                                </link-entity>
                                                                                            </entity>
                                                                                        </fetch>
                                                                                    `;

    const encodedFetchXml = encodeURIComponent(fetchXML);

    while (true) {
        try {
            const result = await parent.Xrm.WebApi.retrieveMultipleRecords("environmentvariablevalue", "?fetchXml=" + encodedFetchXml);
            if (result.entities.length > 0) {
                variableValue = result.entities[0].value;
                return variableValue;
            } else {
                console.log(`Environment variable ${variableName} not found.`);
                return variableValue;
            }
        } catch (error) {
            console.error("Error retrieving environment variable: " + error.message);
            throw error;
        }

        await new Promise(resolve => setTimeout(resolve, 500)); // wait for 500ms before next check
    }
}
