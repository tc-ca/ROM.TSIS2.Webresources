
function OpenFileUploadPage(PrimaryControl, PrimaryTypeEntityName, PrimaryControlId) {
    const lang = Xrm.Utility.getGlobalContext().userSettings.languageId;

    let recordTagId = "";

    let usesGroupFiles = false;

    let avsecOwner = "Aviation Security";
    let issoOwner = "Intermodal Surface Security Oversight";
    let recordOwner = "";

    let recordTableNameEnglish = "";
    let recordTableNameFrench = "";

    let recordName = "";

    let mainHeadingEnglish = "";
    let mainHeadingFrench = "";

    let caseHeaderEnglish = "Add File(s) to Case Documents";
    let caseHeaderFrench = "Ajouter un/des fichier(s) aux documents du cas";

    let workOrderHeaderEnglish = "Add File(s) to Work Order Documents";
    let workOrderHeaderFrench = "Ajouter un/des fichier(s) aux documents d'ordre de travail";

    let workOrderServiceTaskHeaderEnglish = "Add File(s) to Inspection Documents";
    let workOrderServiceTaskHeaderFrench = "Ajouter un/des fichier(s) aux documents d'inspection";

    let stakeholderHeaderEnglish = "Add File(s) to Stakeholder Documents";
    let stakeholderHeaderFrench = "Ajouter un/des fichier(s) aux documents d'intervenant";

    let siteHeaderEnglish = "Add File(s) to Site Documents";
    let siteHeaderFrench = "Ajouter un/des fichier(s) aux documents du site";

    let operationHeaderEnglish = "Add File(s) to Operation Documents";
    let operationHeaderFrench = "Ajouter un/des fichier(s) aux documents d'opération";

    let securityIncidentHeaderEnglish = "Add File(s) to Security Incident Documents";
    let securityIncidentHeaderFrench = "Ajouter un/des fichier(s) aux documents de l'incident de sûreté";

    let exemptionHeaderEnglish = "Add File(s) to Exemption Documents";
    let exemptionHeaderFrench = "Ajouter un/des fichier(s) aux documents d'exemption";

    recordTagId = PrimaryControl.data.entity.getId().replace("{", "").replace("}", "");

    //Work Orders - Logic
    if (PrimaryTypeEntityName == "msdyn_workorder") {
        
        //Find out what business owns the Work Order and what the Work Order Number is
        {
            let recordOwnerFetchXML = `
            <fetch xmlns:generator='MarkMpn.SQL4CDS'>
              <entity name='msdyn_workorder'>
                <attribute name='msdyn_name' alias='workOrderNumber' />
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

            let encodedRecordOwnerFetchXML = encodeURIComponent(recordOwnerFetchXML);

            parent.Xrm.WebApi.retrieveMultipleRecords("msdyn_workorder", "?fetchXml=" + encodedRecordOwnerFetchXML).then(
                function success(result) {
                    // record the id of the owner
                    recordOwner = result.entities[0].recordOwner;
                    recordName = result.entities[0].workOrderNumber;

                    if (recordOwner !== null && recordOwner !== "") {
                        if (recordOwner.includes(avsecOwner)) {
                            recordOwner = avsecOwner;
                        } else if (recordOwner.includes(issoOwner)) {
                            recordOwner = issoOwner;
                        }
                    }
                    else {
                        recordOwner = "";
                    }

                    //Set the header
                    mainHeadingEnglish = workOrderHeaderEnglish;
                    mainHeadingFrench = workOrderHeaderFrench;

                    // navigate to the canvas app
                    navigateToCanvasApp(recordTagId, recordOwner, lang, recordTableNameEnglish, recordTableNameFrench, recordName, PrimaryTypeEntityName,mainHeadingFrench,mainHeadingEnglish,true);
                },
                function (error) {
                    // handle error conditions
                    console.log("Error retrieving who the owner of the Work Order is by the Operation Type: " + error.message);
                }
            );
        }

        //Set the Table Name
        {
            recordTableNameEnglish = "Work Order";
            recordTableNameFrench = "Ordre de travail";
        }
    }

    //Work Order Service Tasks - Logic
    if (PrimaryTypeEntityName == "msdyn_workorderservicetask") {

        //Find out what business owns the Work Order Service Task is
        {
            let recordOwnerFetchXML = `
                <fetch xmlns:generator='MarkMpn.SQL4CDS'>
                  <entity name='msdyn_workorderservicetask'>
                    <attribute name='msdyn_name' alias='workOrderServiceTaskNumber' />
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
                </fetch>`
            ;

            let encodedRecordOwnerFetchXML = encodeURIComponent(recordOwnerFetchXML);

            parent.Xrm.WebApi.retrieveMultipleRecords("msdyn_workorderservicetask", "?fetchXml=" + encodedRecordOwnerFetchXML).then(
                function success(result) {
                    // record the id of the owner
                    recordOwner = result.entities[0].recordOwner;
                    recordName = result.entities[0].workOrderServiceTaskNumber;

                    if (recordOwner !== null && recordOwner !== "") {
                        if (recordOwner.includes(avsecOwner)) {
                            recordOwner = avsecOwner;
                        } else if (recordOwner.includes(issoOwner)) {
                            recordOwner = issoOwner;
                        }
                    }
                    else {
                        recordOwner = "";
                    }

                    //Set the header
                    mainHeadingEnglish = workOrderServiceTaskHeaderEnglish;
                    mainHeadingFrench = workOrderServiceTaskHeaderFrench;

                    // navigate to the canvas app
                    navigateToCanvasApp(recordTagId, recordOwner, lang, recordTableNameEnglish, recordTableNameFrench, recordName, PrimaryTypeEntityName, mainHeadingFrench, mainHeadingEnglish,true);
                },
                function (error) {
                    // handle error conditions
                    console.log("Error retrieving who the owner of the Work Order Service Task is by the Operation Type: " + error.message);
                }
            );

        }

        //Set the table name
        {
            recordTableNameEnglish = "Work Order Service Task";
            recordTableNameFrench = "Tâche de service de l'ordre de travail";
        }
    }

    //Cases - Logic
    if (PrimaryTypeEntityName == "incident") {
        //Find out what business owns the Case is
        {
            let recordOwnerFetchXML = `        
                <fetch xmlns:generator='MarkMpn.SQL4CDS' distinct='true'>
                  <entity name='msdyn_workorder'>
                    <link-entity name='incident' to='msdyn_servicerequest' from='incidentid' alias='incident' link-type='inner'>
                      <attribute name='title' alias='caseNumber' />
                      <filter>
                        <condition attribute='incidentid' operator='eq' value="${recordTagId}" />
                      </filter>
                      <order attribute='title' />
                    </link-entity>
                    <link-entity name='ovs_operationtype' to='ovs_operationtypeid' from='ovs_operationtypeid' alias='ovs_operationtype' link-type='inner'>
                      <link-entity name='team' to='owningteam' from='teamid' alias='team' link-type='inner'>
                        <attribute name='name' alias='recordOwner' />
                        <order attribute='name' />
                      </link-entity>
                    </link-entity>
                  </entity>
                </fetch>`
            ;

            let encodedRecordOwnerFetchXML = encodeURIComponent(recordOwnerFetchXML);

            parent.Xrm.WebApi.retrieveMultipleRecords("msdyn_workorder", "?fetchXml=" + encodedRecordOwnerFetchXML).then(
                function success(result) {
                    // record the id of the owner
                    recordOwner = result.entities[0].recordOwner;
                    recordName = result.entities[0].caseNumber;

                    if (recordOwner !== null && recordOwner !== "") {
                        if (recordOwner.includes(avsecOwner)) {
                            recordOwner = avsecOwner;
                        } else if (recordOwner.includes(issoOwner)) {
                            recordOwner = issoOwner;
                        }
                    }
                    else {
                        recordOwner = "";
                    }

                    //Set the header
                    mainHeadingEnglish = caseHeaderEnglish;
                    mainHeadingFrench = caseHeaderFrench;

                    // navigate to the canvas app
                    navigateToCanvasApp(recordTagId, recordOwner, lang, recordTableNameEnglish, recordTableNameFrench, recordName, PrimaryTypeEntityName, mainHeadingFrench, mainHeadingEnglish,true);
                },
                function (error) {
                    // handle error conditions
                    console.log("Error retrieving who the owner of the Case is by the Operation Type: " + error.message);
                }
            );

        }

        //Set the table name
        {
            recordTableNameEnglish = "Case";
            recordTableNameFrench = "Cas";
        }
    }

    //Stakeholders - Logic
    if (PrimaryTypeEntityName == "account") {
        //Find out what business owns the Stakeholder
        {
            let recordOwnerFetchXML = `        
                <fetch xmlns:generator='MarkMpn.SQL4CDS'>
                  <entity name='account'>
                    <attribute name='name' alias='stakeholderName' />
                    <link-entity name='team' to='owningteam' from='teamid' alias='team' link-type='inner'>
                      <attribute name='name' alias='recordOwner' />
                    </link-entity>
                    <filter>
                      <condition attribute='accountid' operator='eq' value="${recordTagId}" />
                    </filter>
                  </entity>
                </fetch>`
            ;

            let encodedRecordOwnerFetchXML = encodeURIComponent(recordOwnerFetchXML);

            parent.Xrm.WebApi.retrieveMultipleRecords("account", "?fetchXml=" + encodedRecordOwnerFetchXML).then(
                function success(result) {
                    // record the id of the owner
                    recordOwner = result.entities[0].recordOwner;
                    recordName = result.entities[0].stakeholderName;

                    if (recordOwner !== null && recordOwner !== "") {
                        if (recordOwner.includes(avsecOwner)) {
                            recordOwner = avsecOwner;
                        } else if (recordOwner.includes(issoOwner)) {
                            recordOwner = issoOwner;
                        }
                    }
                    else {
                        recordOwner = "";
                    }

                    //Set the header
                    mainHeadingEnglish = stakeholderHeaderEnglish;
                    mainHeadingFrench = stakeholderHeaderFrench;

                    // navigate to the canvas app
                    navigateToCanvasApp(recordTagId, recordOwner, lang, recordTableNameEnglish, recordTableNameFrench, recordName, PrimaryTypeEntityName, mainHeadingFrench, mainHeadingEnglish, false);
                },
                function (error) {
                    // handle error conditions
                    console.log("Error retrieving who the owner of the Stakeholder is: " + error.message);
                }
            );

        }

        //Set the table name
        {
            recordTableNameEnglish = "Stakeholder";
            recordTableNameFrench = "Partie prenante";
        }
    }

    //Sites - Logic
    if (PrimaryTypeEntityName == "msdyn_functionallocation") {
        //Find out what business owns the Site
        {
            let recordOwnerFetchXML = `        
                <fetch xmlns:generator='MarkMpn.SQL4CDS'>
                  <entity name='msdyn_functionallocation'>
                    <attribute name='msdyn_name' alias='siteName' />
                    <attribute name='ts_functionallocationnameenglish' alias='siteNameEnglish' />
                    <link-entity name='team' to='owningteam' from='teamid' alias='team' link-type='inner'>
                      <attribute name='name' alias='recordOwner' />
                    </link-entity>
                    <filter>
                      <condition attribute='msdyn_functionallocationid' operator='eq' value="${recordTagId}" />
                    </filter>
                  </entity>
                </fetch>`
            ;

            let encodedRecordOwnerFetchXML = encodeURIComponent(recordOwnerFetchXML);

            parent.Xrm.WebApi.retrieveMultipleRecords("msdyn_functionallocation", "?fetchXml=" + encodedRecordOwnerFetchXML).then(
                function success(result) {
                    // record the id of the owner
                    recordOwner = result.entities[0].recordOwner;
                    let siteNameEnglish = result.entities[0].siteNameEnglish;

                    if (siteNameEnglish !== null && siteNameEnglish !== "") {
                        recordName = siteNameEnglish;
                    }
                    else {
                        recordName = result.entities[0].siteName;
                    }


                    if (recordOwner !== null && recordOwner !== "") {
                        if (recordOwner.includes(avsecOwner)) {
                            recordOwner = avsecOwner;
                        } else if (recordOwner.includes(issoOwner)) {
                            recordOwner = issoOwner;
                        }
                    }
                    else {
                        recordOwner = "";
                    }

                    //Set the header
                    mainHeadingEnglish = siteHeaderEnglish;
                    mainHeadingFrench = siteHeaderFrench;

                    // navigate to the canvas app
                    navigateToCanvasApp(recordTagId, recordOwner, lang, recordTableNameEnglish, recordTableNameFrench, recordName, PrimaryTypeEntityName, mainHeadingFrench, mainHeadingEnglish, false);
                },
                function (error) {
                    // handle error conditions
                    console.log("Error retrieving who the owner of the Site is: " + error.message);
                }
            );

        }

        //Set the table name
        {
            recordTableNameEnglish = "Site";
            recordTableNameFrench = "Site";
        }
    }

    //Operations - Logic
    if (PrimaryTypeEntityName == "ovs_operation") {
        //Find out what business owns the Operation
        {
            let recordOwnerFetchXML = `        
                <fetch xmlns:generator='MarkMpn.SQL4CDS'>
                  <entity name='ovs_operation'>
                    <attribute name='ovs_name' alias='operationName' />
                    <link-entity name='team' to='owningteam' from='teamid' alias='team' link-type='inner'>
                      <attribute name='name' alias='recordOwner' />
                    </link-entity>
                    <filter>
                      <condition attribute='ovs_operationid' operator='eq' value="${recordTagId}" />
                    </filter>
                  </entity>
                </fetch>`;

            let encodedRecordOwnerFetchXML = encodeURIComponent(recordOwnerFetchXML);

            parent.Xrm.WebApi.retrieveMultipleRecords("ovs_operation", "?fetchXml=" + encodedRecordOwnerFetchXML).then(
                function success(result) {
                    // record the id of the owner
                    recordOwner = result.entities[0].recordOwner;
                    recordName = result.entities[0].operationName;

                    if (recordOwner !== null && recordOwner !== "") {
                        if (recordOwner.includes(avsecOwner)) {
                            recordOwner = avsecOwner;
                        } else if (recordOwner.includes(issoOwner)) {
                            recordOwner = issoOwner;
                        }
                    }
                    else {
                        recordOwner = "";
                    }

                    //Set the header
                    mainHeadingEnglish = siteHeaderEnglish;
                    mainHeadingFrench = siteHeaderFrench;

                    // navigate to the canvas app
                    navigateToCanvasApp(recordTagId, recordOwner, lang, recordTableNameEnglish, recordTableNameFrench, recordName, PrimaryTypeEntityName, mainHeadingFrench, mainHeadingEnglish, false);
                },
                function (error) {
                    // handle error conditions
                    console.log("Error retrieving who the owner of the Operation is: " + error.message);
                }
            );

        }

        //Set the table name
        {
            recordTableNameEnglish = "Operation";
            recordTableNameFrench = "Opération";
        }
    }

    //Security Incident - Logic
    if (PrimaryTypeEntityName == "ts_securityincident") {
        //Find out what business owns the Security Incident
        {
            let recordOwnerFetchXML = `        
                <fetch xmlns:generator='MarkMpn.SQL4CDS'>
                  <entity name='ts_securityincident'>
                    <attribute name='ts_name' alias='securityIncidentName' />
                    <attribute name='ts_mode' alias='recordOwner' />
                    <filter>
                      <condition attribute='ts_securityincidentid' operator='eq' value="${recordTagId}" />
                    </filter>
                  </entity>
                </fetch>
            `;

            let encodedRecordOwnerFetchXML = encodeURIComponent(recordOwnerFetchXML);

            parent.Xrm.WebApi.retrieveMultipleRecords("ts_securityincident", "?fetchXml=" + encodedRecordOwnerFetchXML).then(
                function success(result) {
                    // record the id of the owner
                    recordOwner = result.entities[0].recordOwner;
                    recordName = result.entities[0].siteName;

                    if (recordOwner !== null && recordOwner !== "") {

                        if (recordOwner == 717750000 || recordOwner == 717750001) {
                            recordOwner = issoOwner;
                        }
                        else if (recordOwner == 717750002) {
                            recordOwner = avsecOwner;
                        }
                    }
                    else {
                        recordOwner = "";
                    }

                    //Set the header
                    mainHeadingEnglish = siteHeaderEnglish;
                    mainHeadingFrench = siteHeaderFrench;

                    // navigate to the canvas app
                    navigateToCanvasApp(recordTagId, recordOwner, lang, recordTableNameEnglish, recordTableNameFrench, recordName, PrimaryTypeEntityName, mainHeadingFrench, mainHeadingEnglish, false);
                },
                function (error) {
                    // handle error conditions
                    console.log("Error retrieving who the owner of the Security Incident is: " + error.message);
                }
            );

        }

        //Set the table name
        {
            recordTableNameEnglish = "Security Incident";
            recordTableNameFrench = "Incidents de sûreté";
        }
    }

    //Exemption - Logic
    if (PrimaryTypeEntityName == "ts_exemption") {
        //Find out what business owns the Exemption
        {
            let recordOwnerFetchXML = `        
                <fetch xmlns:generator='MarkMpn.SQL4CDS'>
                  <entity name='ts_exemption'>
                    <attribute name='ts_name' alias='exemptionName' />
                    <attribute name='ts_program' alias='recordOwner' />
                    <filter>
                      <condition attribute='ts_exemptionid' operator='eq' value="${recordTagId}" />
                    </filter>
                  </entity>
                </fetch>
            `;

            let encodedRecordOwnerFetchXML = encodeURIComponent(recordOwnerFetchXML);

            parent.Xrm.WebApi.retrieveMultipleRecords("ts_exemption", "?fetchXml=" + encodedRecordOwnerFetchXML).then(
                function success(result) {
                    // record the id of the owner
                    recordOwner = result.entities[0].recordOwner;
                    recordName = result.entities[0].siteName;

                    if (recordOwner !== null && recordOwner !== "") {

                        if (recordOwner == 741130000) {
                            recordOwner = avsecOwner;
                        }
                    }
                    else {
                        recordOwner = "";
                    }

                    //Set the header
                    mainHeadingEnglish = siteHeaderEnglish;
                    mainHeadingFrench = siteHeaderFrench;

                    // navigate to the canvas app
                    navigateToCanvasApp(recordTagId, recordOwner, lang, recordTableNameEnglish, recordTableNameFrench, recordName, PrimaryTypeEntityName, mainHeadingFrench, mainHeadingEnglish, false);
                },
                function (error) {
                    // handle error conditions
                    console.log("Error retrieving who the owner of the Exemption is: " + error.message);
                }
            );

        }

        //Set the table name
        {
            recordTableNameEnglish = "Exemption";
            recordTableNameFrench = "Exemption";
        }
    }
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