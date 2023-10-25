
function OpenFileUploadPage(PrimaryControl, PrimaryTypeEntityName, PrimaryControlId) {
    const lang = Xrm.Utility.getGlobalContext().userSettings.languageId;

    let recordTagId = "";

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

    //Logic for getting tags when attaching files to Work Orders
    if (PrimaryTypeEntityName == "msdyn_workorder") {
        recordTagId = PrimaryControl.data.entity.getId().replace("{", "").replace("}", "");

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
                        if (recordOwner.includes('Aviation Security')) {
                            recordOwner = avsecOwner;
                        } else if (recordOwner.includes('Intermodal Surface Security Oversight')) {
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
                    navigateToCanvasApp(recordTagId, recordOwner, lang, recordTableNameEnglish, recordTableNameFrench, recordName, PrimaryTypeEntityName,mainHeadingFrench,mainHeadingEnglish);
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
}

// Separate method to navigate to the canvas app
function navigateToCanvasApp(recordTagId, recordOwner, lang, recordTableNameEnglish, recordTableNameFrench, recordName, PrimaryTypeEntityName,mainHeadingFrench,mainHeadingEnglish) {

    var jsonData = {
        recordId: recordTagId,
        recordOwnerName: recordOwner,
        userLanguage: lang,
        tableNameEnglish: recordTableNameEnglish,
        tableNameFrench: recordTableNameFrench,
        tableRecordName: recordName,
        tableSchemaName: PrimaryTypeEntityName
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