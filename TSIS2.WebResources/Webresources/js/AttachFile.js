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
}

function OpenFileUploadPage(PrimaryControl, PrimaryTypeEntityName, PrimaryControlId) {
    const lang = Xrm.Utility.getGlobalContext().userSettings.languageId;

    const fileUploadData = new FileUploadData();

    let recordTagId = "";

    recordTagId = PrimaryControl.data.entity.getId().replace("{", "").replace("}", "");

    //Get the FetchXml to use
    let recordOwnerFetchXML = getFetchXmlForRecordOwner(PrimaryTypeEntityName, recordTagId);

    let encodedRecordOwnerFetchXML = encodeURIComponent(recordOwnerFetchXML);

    //Set the meta-data tags to be sent to the canvas page app
    setEntitySpecificValues(PrimaryTypeEntityName,fileUploadData);

    //Default Invalid owner message
    let invalidOwnerMessageEnglish = "The record has an invalid owner.  It must belong to Aviation Security or Intermodal Surface Security Oversight.";

    let invalidOwnerMessageFrench = "L'enregistrement a un propriétaire invalide. Il doit appartenir à Aviation Security ou Intermodal Surface Security Oversight.";

    parent.Xrm.WebApi.retrieveMultipleRecords(PrimaryTypeEntityName, "?fetchXml=" + encodedRecordOwnerFetchXML).then(
        function success(result) {

            // make sure Owner is not null
            if (result.entities[0] != undefined) {
                fileUploadData.recordOwner = result.entities[0].recordOwner;
                fileUploadData.recordName = result.entities[0].recordName;

                let siteNameEnglish = "";

                if (PrimaryTypeEntityName == "msdyn_functionallocation") {
                    siteNameEnglish = result.entities[0].siteNameEnglish;
                }

                modifyRecordOwner(PrimaryTypeEntityName, fileUploadData.recordOwner, fileUploadData.recordName, siteNameEnglish, fileUploadData);

                if (fileUploadData.validOwner == true) {

                    // get the SharePoint File ID for the record
                    getSharePointFileId(PrimaryTypeEntityName, fileUploadData, recordTagId)
                        .then(() => {

                            // if the record uses groups, (Case, WorkOrder, and Work Order Service Task) get the sharePointGroupID
                            if (fileUploadData.usesGroupFiles == true) {
                                getSharePointFileGroupId(PrimaryTypeEntityName, fileUploadData, recordTagId)
                                    .then(() => {

                                        // get the sharePointQuery to use in the canvas app
                                        getSharePointQuery(PrimaryTypeEntityName, fileUploadData, recordTagId)
                                            .then(() => { 

                                                // get the users Manager email address
                                                getUsersManager(fileUploadData)
                                                    .then(() => {

                                                        // Check if there is an ID
                                                        const queryString = window.location.search;

                                                        console.log('The queryString is ' + queryString);

                                                        const urlParams = new URLSearchParams(queryString);

                                                        // check if it's a specific user
                                                        let isSpecificUser = Xrm.Utility.getGlobalContext().userSettings.userId;

                                                        if (isSpecificUser == '{7DFAC6D6-994B-EC11-8F8E-000D3AE9A369}') {

                                                            // get the users Email address
                                                            getUsersEmail(fileUploadData)
                                                                .then(() => {

                                                                    // navigate to SharePointAttachFilePopUp.html
                                                                    navigateToSharePointAttachFilePopUp(recordTagId, fileUploadData.recordOwner, lang, fileUploadData.recordTableNameEnglish, fileUploadData.recordTableNameFrench, fileUploadData.recordName, PrimaryTypeEntityName, fileUploadData.mainHeadingFrench, fileUploadData.mainHeadingEnglish, fileUploadData.usesGroupFiles, fileUploadData.sharePointFileID, fileUploadData.sharePointFileGroupID, fileUploadData.sharePointQuery, fileUploadData.usersManagerEmail, fileUploadData.usersEmail);

                                                                });

                                                        }
                                                        else {
                                                            // navigate to the canvas app
                                                            navigateToCanvasApp(recordTagId, fileUploadData.recordOwner, lang, fileUploadData.recordTableNameEnglish, fileUploadData.recordTableNameFrench, fileUploadData.recordName, PrimaryTypeEntityName, fileUploadData.mainHeadingFrench, fileUploadData.mainHeadingEnglish, fileUploadData.usesGroupFiles, fileUploadData.sharePointFileID, fileUploadData.sharePointFileGroupID, fileUploadData.sharePointQuery, fileUploadData.usersManagerEmail);
                                                        }
                                                });
                                            });
                                    });
                            }
                            else {

                                // For everything else, navigate to the canvas app
                                navigateToCanvasApp(recordTagId, fileUploadData.recordOwner, lang, fileUploadData.recordTableNameEnglish, fileUploadData.recordTableNameFrench, fileUploadData.recordName, PrimaryTypeEntityName, fileUploadData.mainHeadingFrench, fileUploadData.mainHeadingEnglish, fileUploadData.usesGroupFiles, fileUploadData.sharePointFileID, fileUploadData.sharePointFileGroupID, fileUploadData.sharePointQuery, fileUploadData.usersManagerEmail);
                            }
                    });
                }
                else {
                    // display the error message
                    if (lang == 1033) {
                        alert(invalidOwnerMessageEnglish);
                    }
                    else {
                        alert(invalidOwnerMessageFrench);
                    }
                }
            } else {

                // if we are working with an Action record - show a customized message
                if (PrimaryTypeEntityName == "ts_action") {
                    invalidOwnerMessageEnglish = "The record has an invalid owner.  It must belong to Aviation Security or Intermodal Surface Security Oversight. Make sure the Action record has a Case.";
                    invalidOwnerMessageFrench = "L’enregistrement a un propriétaire invalide. Il doit appartenir à Aviation Security ou Intermodal Surface Security Oversight. Assurez-vous que l’enregistrement d’action a un cas.";
                }

                // display the error message
                if (lang == 1033) {
                    alert(invalidOwnerMessageEnglish);
                }
                else {
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

// Separate method to navigate to the canvas app
function navigateToCanvasApp(recordTagId, recordOwner, lang, recordTableNameEnglish, recordTableNameFrench, recordName, PrimaryTypeEntityName, mainHeadingFrench, mainHeadingEnglish, usesGroupFiles, relatedSharePointFileID, relatedSharePointFileGroupID, relatedSharePointQuery, relatedManagerEmail) {

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
        usersManagerEmail: relatedManagerEmail
    };

    var jsonString = JSON.stringify(jsonData).toString();

    // Centered Dialog
    var pageInput = {
        pageType: "custom",
        name: "ts_fileupload_2bf02", //Unique name of Custom page
        recordId: jsonString
    };
    
    // Note: remember for height take into consideration the size of the heading of the dialog pop up
    var navigationOptions = {
        target: 2,
        position: 1,
        width: { value: 600, unit: "px" },
        height: { value: 770, unit: "px" },
        title: (lang == 1036) ? mainHeadingFrench : mainHeadingEnglish
    };
    Xrm.Navigation.navigateTo(pageInput, navigationOptions)
        .then(
            //function () {
            //    // Called when the dialog closes
            //    formContext.data.refresh();
            //}
        ).catch(
            function (error) {
                // Handle error
            }
        );
}

// Separate method to navigate to SharePointAttachFilePopUp.html
function navigateToSharePointAttachFilePopUp(recordTagId, recordOwner, lang, recordTableNameEnglish, recordTableNameFrench, recordName, PrimaryTypeEntityName, mainHeadingFrench, mainHeadingEnglish, usesGroupFiles, relatedSharePointFileID, relatedSharePointFileGroupID, relatedSharePointQuery, relatedManagerEmail, relatedUserEmail) {

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
        usersEmail: relatedUserEmail
    };

    var jsonString = JSON.stringify(jsonData).toString();

    // Centered Dialog
    var pageInput = {
        pageType: "webresource",
        webresourceName: "ts_/html/SharePointAttachFilePopUp.html",
        data: jsonString
    };

    // Note: remember for height take into consideration the size of the heading of the dialog pop up
    var navigationOptions = {
        target: 2,
        position: 1,
        width: { value: 600, unit: "px" },
        height: { value: 770, unit: "px" },
        title: (lang == 1036) ? mainHeadingFrench : mainHeadingEnglish
    };

    parent.Xrm.Navigation.navigateTo(pageInput, navigationOptions).then(
        function (returnValue) {
            if (returnValue) {
                // Once the pop-up is closed, refresh the attachment sub grid
                //parent.Xrm.Page.getControl("attachmentsGrid").refresh();
            }
        }
    );
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
                            <attribute name="teamid" />
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
    }
}

function modifyRecordOwner(entityName, myRecordOwner, myRecordName, mySiteNameEnglish, fileUploadData) {
    // Modify recordOwner based on specific conditions

    let avsecOwner = "Aviation Security";
    let issoOwner = "Intermodal Surface Security Oversight";

    // Set headers and table names based on entity type
    switch (entityName) {
        case "msdyn_workorder":
        case "msdyn_workorderservicetask":
        case "incident":
        case "account":
        case "ovs_operation":
        case "ts_action":
            if (myRecordOwner.includes(avsecOwner)) {
                fileUploadData.recordOwner = avsecOwner;
            } else if (myRecordOwner.includes(issoOwner)) {
                fileUploadData.recordOwner = issoOwner;
            }
            break;

        case "msdyn_functionallocation":
            if (mySiteNameEnglish !== null && mySiteNameEnglish !== "") {
                fileUploadData.recordName = mySiteNameEnglish;
            }
            else {
                fileUploadData.recordName = myRecordName;
            }


            if (myRecordOwner !== null && myRecordOwner !== "") {
                if (myRecordOwner.includes(avsecOwner)) {
                    fileUploadData.recordOwner = avsecOwner;
                } else if (myRecordOwner.includes(issoOwner)) {
                    fileUploadData.recordOwner = issoOwner;
                }
            }
            else {
                fileUploadData.recordOwner = "";
            }

            break;
        case "ts_securityincident":
            if (myRecordOwner !== null && myRecordOwner !== "") {

                if (myRecordOwner == 717750000 || myRecordOwner == 717750001) {
                    fileUploadData.recordOwner = issoOwner;
                }
                else if (myRecordOwner == 717750002) {
                    fileUploadData.recordOwner = avsecOwner;
                }
            }
            else {
                fileUploadData.recordOwner = "";
            }
            break;
        case "ts_exemption":
            if (myRecordOwner !== null && myRecordOwner !== "") {

                if (myRecordOwner == 741130000) {
                    fileUploadData.recordOwner = avsecOwner;
                }
            }
            else {
                fileUploadData.recordOwner = "";
            }
            break;
    }

    if (fileUploadData.recordOwner == avsecOwner || fileUploadData.recordOwner == issoOwner) {
        fileUploadData.validOwner = true;
    }
}

function getSharePointFileId(PrimaryTypeEntityName, fileUploadData, recordTagId) {

    let sharePointFileFetchXML = `
                <fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
                  <entity name="ts_sharepointfile">
                    <attribute name="ts_sharepointfileid" />
                    <attribute name="ts_sharepointfilegroup" />
                    <filter>
                      <condition attribute="ts_tablerecordid" operator="eq" value="${recordTagId}" />
                    </filter>
                  </entity>
                </fetch>
    `;

    let encodedSharePointFetchXML = encodeURIComponent(sharePointFileFetchXML);

    // Get the SharePoint File ID for the record
    return parent.Xrm.WebApi.retrieveMultipleRecords("ts_sharepointfile", "?fetchXml=" + encodedSharePointFetchXML).then(
        function success(result) {
            if (result.entities[0] != undefined) {
                // if a ts_sharepointfile record exists for the record, get the ID
                fileUploadData.sharePointFileID = result.entities[0].ts_sharepointfileid;

                // get the SharePoint File Group ID for the record
                if (result.entities[0]._ts_sharepointfilegroup_value != null) {
                    fileUploadData.sharePointFileGroupID = result.entities[0]._ts_sharepointfilegroup_value
                }
            }
            else {
                // if no ts_sharepointfile record exists for the record, create one
                return createSharePointFileRecord(fileUploadData, recordTagId);
            }
        },
        function (error) {
            // handle error conditions
            console.log(`Error retrieving the ts_sharepointfile of ${PrimaryTypeEntityName}: ` + error.message);
        }
    );
}

function getSharePointFileGroupId(PrimaryTypeEntityName, fileUploadData, recordTagId) {

    return new Promise((resolve, reject) => {
        let sharePointFileFetchXML = `
                <fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">
                  <entity name="ts_sharepointfile">
                    <attribute name="ts_sharepointfilegroup" />
                    <filter>
                      <condition attribute="ts_tablerecordid" operator="eq" value="${recordTagId}" />
                    </filter>
                  </entity>
                </fetch>`;

        let encodedSharePointFetchXML = encodeURIComponent(sharePointFileFetchXML);

        // Get the SharePoint File Group ID for the record
        let intervalId = setInterval(function () {
            return parent.Xrm.WebApi.retrieveMultipleRecords("ts_sharepointfile", "?fetchXml=" + encodedSharePointFetchXML).then(
                function success(result) {
                    if (result.entities[0] != undefined) {

                        // get the SharePoint File Group ID for the record
                        if (result.entities[0]._ts_sharepointfilegroup_value != null) {
                            fileUploadData.sharePointFileGroupID = result.entities[0]._ts_sharepointfilegroup_value;
                            clearInterval(intervalId); // clear the interval once we have the result
                            resolve(); // resolve the promise
                        }
                    }
                },
                function (error) {
                    // handle error conditions
                    console.log(`Error retrieving the ts_sharepointfileGroup of ${PrimaryTypeEntityName}: ` + error.message);
                    clearInterval(intervalId); // clear the interval in case of error
                    reject(error); // reject the promise
                }
            );
        }, 1000); // try every x seconds - we do this because we are waiting for the sharePointFileGroup to be created in the backend Plugin
    });

}

function getSharePointQuery(PrimaryTypeEntityName, fileUploadData, recordTagId) {

    let sharePointFileFetchXML = `
        <fetch>
          <entity name="ts_sharepointfile">
            <attribute name="ts_sharepointfileid" />
            <filter>
              <condition attribute="ts_sharepointfilegroup" operator="eq" value="${fileUploadData.sharePointFileGroupID}" />
              <condition attribute="ts_tablerecordid" operator="ne" value="${recordTagId}" />
              <condition attribute="ts_tablerecordid" operator="not-null" />
              <filter />
            </filter>
          </entity>
        </fetch>
    `;

    let encodedSharePointFetchXML = encodeURIComponent(sharePointFileFetchXML);

    // Get the related SharePoint File ID's for the record
    return parent.Xrm.WebApi.retrieveMultipleRecords("ts_sharepointfile", "?fetchXml=" + encodedSharePointFetchXML).then(
        function success(result) {

            // loop through results and add to the sharePointQuery
            for (let i = 0; i < result.entities.length; i++) {
                let entity = result.entities[i];

                if (entity !== null) {
                    fileUploadData.sharePointQuery += "ROMSharePointFileID eq '" + entity.ts_sharepointfileid + "'";

                    // if not the last entity, add an "or"
                    if (i !== result.entities.length - 1) {
                        fileUploadData.sharePointQuery += " or ";
                    }
                }
            }
        },
        function (error) {
            // handle error conditions
            console.log(`Error retrieving in getSharePointQuery using ${PrimaryTypeEntityName}: ` + error.message);
        }
    );
}

function getUsersManager(fileUploadData) {

    return new Promise((resolve, reject) => {
        let userId = Xrm.Utility.getGlobalContext().userSettings.userId;

        userId = userId.replace(/[{}]/g, '');

        let managerFetchXML = `
        <fetch xmlns:generator="MarkMpn.SQL4CDS" distinct="true">
          <entity name="systemuser">
            <attribute name="internalemailaddress" />
            <filter>
              <condition attribute="systemuserid" operator="ne" value="c5cbed71-2e26-ec11-b6e6-000d3af4f643"  />
              <condition attribute="internalemailaddress" operator="not-null" />
            </filter>
            <link-entity name="team" from="administratorid" to="systemuserid">
              <filter>
                <condition attribute="name" operator="ne" value="Transport Canada" />
                <condition attribute="name" operator="not-like" value="%msdyn_workorder%" />
                <condition attribute="name" operator="not-like" value="%ROMTS-GSRST-USERLIST%" />
                <condition attribute="name" operator="not-like" value="%POWER BI SERVICE%" />
                <condition attribute="name" operator="not-like" value="%Aviation Security%" />
                <condition attribute="name" operator="not-like" value="%Intermodal Surface Security Oversight (ISSO)%" />
                <condition attribute="name" operator="not-like" value="%PPP Analyst%" />
                <condition attribute="name" operator="not-like" value="%TCOMS%" />
                <condition attribute="name" operator="not-like" value="%ISSO Business Admins%" />
                <condition attribute="name" operator="not-like" value="%ISSO Inspectors%" />
                <condition attribute="name" operator="not-like" value="%ISSO Managers%" />
                <condition attribute="name" operator="not-like" value="%ISSO Planners%" />
                <condition attribute="name" operator="not-like" value="%ISSO Questionnaire Admins%" />
                <condition attribute="name" operator="not-like" value="%ISSO Questionnaire Admins%" />
              </filter>
              <link-entity name="teammembership" from="teamid" to="teamid">
                <link-entity name="systemuser" alias="systemuser_childuser" from="systemuserid" to="systemuserid">
                  <filter>
                    <condition attribute="systemuserid" operator="eq" value="${userId}" />
                  </filter>
                </link-entity>
              </link-entity>
            </link-entity>
          </entity>
        </fetch>
    `;

        let encodedSharePointFetchXML = encodeURIComponent(managerFetchXML);

        // Get the manager
        return parent.Xrm.WebApi.retrieveMultipleRecords("systemuser", "?fetchXml=" + encodedSharePointFetchXML).then(
            function success(result) {
                if (result.entities[0] != undefined) {

                    // get the Manager
                    if (result.entities[0].internalemailaddress != null) {
                        fileUploadData.usersManagerEmail = result.entities[0].internalemailaddress;
                    }
                }
                resolve(); // resolve the promise
            },
            function (error) {
                // handle error conditions
                console.log(`Error retrieving the users Manager: ${PrimaryTypeEntityName}: ` + error.message);
                reject(error); // reject the promise
            }
        );
    });
}

function getUsersEmail(fileUploadData) {

    return new Promise((resolve, reject) => {
        let userId = Xrm.Utility.getGlobalContext().userSettings.userId;

        userId = userId.replace(/[{}]/g, '');

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

function createSharePointFileRecord(fileUploadData, recordTagId) {
    let entity = {};

    entity.ts_name = fileUploadData.recordName;
    entity.ts_tablename = fileUploadData.recordTableNameEnglish;
    entity.ts_tablenamefrench = fileUploadData.recordTableNameFrench;
    entity.ts_tablerecordid = recordTagId;
    entity.ts_tablerecordname = fileUploadData.recordName;
    entity.ts_tablerecordowner = fileUploadData.recordOwner;

    return parent.Xrm.WebApi.createRecord("ts_sharepointfile", entity).then(
        function success(result) {
            fileUploadData.sharePointFileID = result.id;
            return result;
        },
        function (error) {
            // handle error conditions
            console.log(`Error creating the ts_sharepointfile record for ${entity.ts_tablename}: ` + error.message);
            throw error;
        }
    );
}