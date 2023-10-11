
function OpenFileUploadPage(PrimaryControl, PrimaryTypeEntityName, PrimaryControlId) {
    const lang = Xrm.Utility.getGlobalContext().userSettings.languageId;

    let recordTagId = "";

    let avsecOwner = "Aviation Security";
    let issoOwner = "Intermodal Surface Security Oversight";
    let recordOwner = "";

    let recordTableNameEnglish = "";
    let recordTableNameFrench = "";

    let recordName = "";

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

                    // navigate to the canvas app
                    navigateToCanvasApp(recordTagId, recordOwner, lang, recordTableNameEnglish, recordTableNameFrench, recordName, PrimaryTypeEntityName);
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
function navigateToCanvasApp(recordTagId, recordOwner, lang, recordTableNameEnglish, recordTableNameFrench, recordName, PrimaryTypeEntityName) {

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
        title: (lang == 1036) ? "Documents (FR)" : "Documents"
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