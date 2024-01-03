function FileUploadData() {
    this.recordTableNameEnglish = "";
    this.recordTableNameFrench = "";
    this.recordOwner = "";
    this.recordName = "";
    this.mainHeadingEnglish = "";
    this.mainHeadingFrench = "";
    this.usesGroupFiles = false;
    this.validOwner = false;
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

    parent.Xrm.WebApi.retrieveMultipleRecords(PrimaryTypeEntityName, "?fetchXml=" + encodedRecordOwnerFetchXML).then(
        function success(result) {

            fileUploadData.recordOwner = result.entities[0].recordOwner;
            fileUploadData.recordName = result.entities[0].recordName;

            let siteNameEnglish = "";

            if (PrimaryTypeEntityName == "msdyn_functionallocation") {
                siteNameEnglish = result.entities[0].siteNameEnglish;
            }

            modifyRecordOwner(PrimaryTypeEntityName, fileUploadData.recordOwner, fileUploadData.recordName, siteNameEnglish, fileUploadData);

            if (fileUploadData.validOwner == true) {
                // navigate to the canvas app
                navigateToCanvasApp(recordTagId, fileUploadData.recordOwner, lang, fileUploadData.recordTableNameEnglish, fileUploadData.recordTableNameFrench, fileUploadData.recordName, PrimaryTypeEntityName, fileUploadData.mainHeadingFrench, fileUploadData.mainHeadingEnglish, fileUploadData.usesGroupFiles);
            }
            else {
                // display the error message
                if (lang == 1033) {
                    alert("The record has an invalid owner.  It must belong to Aviation Security or Intermodal Surface Security Oversight.");
                }
                else {
                    alert("L'enregistrement a un propriétaire invalide. Il doit appartenir à Aviation Security ou Intermodal Surface Security Oversight.");
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
function navigateToCanvasApp(recordTagId, recordOwner, lang, recordTableNameEnglish, recordTableNameFrench, recordName, PrimaryTypeEntityName,mainHeadingFrench,mainHeadingEnglish,usesGroupFiles) {

    var jsonData = {
        recordId: recordTagId,
        recordOwnerName: recordOwner,
        userLanguage: lang,
        tableNameEnglish: recordTableNameEnglish,
        tableNameFrench: recordTableNameFrench,
        tableRecordName: recordName,
        tableSchemaName: PrimaryTypeEntityName,
        useGroupFiles: usesGroupFiles
    };

    var jsonString = JSON.stringify(jsonData).toString();

    // Centered Dialog
    var pageInput = {
        pageType: "custom",
        name: "ts_fileupload_2bf02", //Unique name of Custom page
        recordId: jsonString
    };
    var navigationOptions = {
        target: 2,
        position: 1,
        width: { value: 1000, unit: "px" },
        height: { value: 1000, unit: "px" },
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