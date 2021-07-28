var lang = parent.Xrm.Utility.getGlobalContext().userSettings.languageId;

var workOrderLocalized = "Work Order";
var workOrderDetailsLocalized = "Work Order Details";
var WorkOrderServiceTaskDetailsLocalized = "Work Order Service Task Details";
var serviceTaskLocalized = "Service Task";
var taskTypeLocalized = "Task Type";
var statusReasonLocalized = "Status Reason";
var totalFindingsLocalized = "Total Findings";
var overallInspectionCommentLocalized = "Overall Inspection Comments";
var findingsLocalized = "Findings";
var provisionReferenceLocalized = "Provision Reference";
var findingTypeLocalized = "Finding Type";
var stakeholderLocalized = "Stakeholder";
var operationLocalized = "Operation";
var inspectorCommentLocalized = "Inspector Comment";

if (lang == 1036) {
    workOrderLocalized = "Ordre de travail";
    workOrderDetailsLocalized = "Détails de l'ordre de travail";
    WorkOrderServiceTaskDetailsLocalized = "Détails de la tâche du service d'ordre de travail";
    serviceTaskLocalized = "Tâche du service";
    taskTypeLocalized = "Type de tâche";
    statusReasonLocalized = "Raison du statut";
    totalFindingsLocalized = "Nombre de constatations";
    overallInspectionCommentLocalized = "Commentaires généraux sur l'inspection";
    findingsLocalized = "Constatations"; 
    provisionReferenceLocalized = "Référence de la disposition";
    findingTypeLocalized = "Finding Type FR";
    stakeholderLocalized = "Intervenant";
    operationLocalized = "Opération";
    inspectorCommentLocalized = "Commentaires de l'inspecteur";
}

function addExistingWorkOrdersToCase(primaryControl, selectedEntityTypeName, selectedControl) {
    const formContext = primaryControl;

    const caseId = Xrm.Page.data.entity.getId().replace(/({|})/g,'');

    const regionAttribute = formContext.getAttribute("ovs_region");
    const countryAttribute = formContext.getAttribute("ts_country");
    const stakeholderAttribute = formContext.getAttribute("ts_stakeholder");
    const siteAttribute = formContext.getAttribute("msdyn_functionallocation");

    const regionAttributeValue = regionAttribute.getValue();
    const countryAttributeValue = countryAttribute.getValue();
    const stakeholderAttributeValue = stakeholderAttribute.getValue();
    const siteAttributeValue = siteAttribute.getValue();

    var countryCondition = "";

    if (countryAttributeValue != null) {
         countryCondition = `<condition attribute="ts_country" operator="eq" value="${countryAttributeValue[0].id}" />`;
    }

    var lookupOptions =
    {
        defaultEntityType: "msdyn_workorder",
        entityTypes: ["msdyn_workorder"],
        allowMultiSelect: true,
        defaultViewId:"fce37246-eba1-4e92-bb9d-f8cb3ec38e3f",
        disableMru: true,
        filters: [
            {
                filterXml: `<filter type="and">` +
                    `<condition attribute="ts_region" operator="eq" value="${regionAttributeValue[0].id}" />` +
                    countryCondition +
                    `<condition attribute="msdyn_serviceaccount" operator="eq" value="${stakeholderAttributeValue[0].id}" />` +
                    `<condition attribute="ts_site" operator="eq" value="${siteAttributeValue[0].id}" />` +
                    `<condition attribute="msdyn_servicerequest" operator="neq" value="${Xrm.Page.data.entity.getId()}" />` +
                    `</filter>`,
                entityLogicalName: "msdyn_workorder"
            }
        ]
    };

    Xrm.Utility.lookupObjects(lookupOptions).then(
    function(result){
        console.log(result);
        for (var i = 0; i < result.length; i++) {
            var req = new XMLHttpRequest();

            req.open("PATCH", formContext.context.getClientUrl() + "/api/data/v9.0/" + "msdyn_workorders" + "(" + result[i].id.replace(/({|})/g,'') + ")");
            req.setRequestHeader("Content-Type", "application/json");
            req.setRequestHeader("Accept", "application/json");
            req.setRequestHeader("OData-MaxVersion", "4.0");
            req.setRequestHeader("OData-Version", "4.0");

            var payload =
                {
                    "msdyn_servicerequest@odata.bind" : formContext.context.getClientUrl() + "/api/data/v9.0/" + "incidents" + "(" + caseId + ")"
                };

            req.onreadystatechange = function() {
                if (this.readyState === 4) {
                    req.onreadystatechange = null;
                    if (this.status === 204) {
                        selectedControl.refresh();
                    } else {
                        showErrorMessageAlert(this.statusText);
                    }
                }
            };

            req.send(JSON.stringify(payload));
        }
    },
    function (error){
        showErrorMessageAlert(error);
    });
}

function ActivateWorkOrder(primaryControl){
    const formContext = primaryControl;

    var confirmStrings = { confirmButtonLabel: "Activate",  cancelButtonLabel: "Cancel" , text: "Are you sure you want to activate the selected 1 Work Order?\nThis will set the Work Order to the Active state.", title: "Confirm Work Order Activation" }
    var confirmOptions;
    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
        function (success) {
            if (success.confirmed){

                formContext.getAttribute("statecode").setValue(0);
                formContext.getAttribute("statuscode").setValue(1);
                formContext.getAttribute("msdyn_systemstatus").setValue(690970003); //Open - Completed

                openWorkOrderServiceTasks(formContext);
                setWorkOrderServiceTasksView(formContext);

                formContext.data.save();
            }
        },
        function (error){
            showErrorMessageAlert(error);
        }
    );
}

function openWorkOrderServiceTasks(formContext){
    workOrderServiceTaskData =
    {
        "statecode" :  0,           //closed -> 1
        "statuscode" : 918640002    //closed -> 918640003
    };

    Xrm.WebApi.online.retrieveMultipleRecords("msdyn_workorderservicetask", `?$select=msdyn_workorder&$filter=msdyn_workorder/msdyn_workorderid eq ${formContext.data.entity.getId()}`).then(
        function success(result){
            for (var i = 0; i < result.entities.length; i++) {
                Xrm.WebApi.updateRecord("msdyn_workorderservicetask", result.entities[i].msdyn_workorderservicetaskid, workOrderServiceTaskData).then(
                    function success(result) {
                    },
                    function (error){
                        showErrorMessageAlert(error);
                    }
                );
            }
        },
        function (error){
            showErrorMessageAlert(error);
        }
    );
}

function setWorkOrderServiceTasksView(formContext){
    var activeWorkOrderServiceTasksView =
    {
        entityType: "savedquery",
        id: "{C9FD8F4D-8184-4DDB-A31A-89E66E8E710E}",
        name: "Active Work Order Service Tasks"
    }

    formContext.getControl("workorderservicetasksgrid").getViewSelector().setCurrentView(activeWorkOrderServiceTasksView);
}

function showErrorMessageAlert(error){
    var alertStrings = { text: error.message };
    var alertOptions = { height: 120, width: 260 };
    Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function () { });
}

//Returns true if the Work Order has a name, meaning it has been saved/created. Used for Hiding/Showing Ribbon buttons.
function hasWorkOrderName(primaryControl) {
    return (primaryControl.getAttribute("msdyn_name").getValue() != null);
}

//Opens a new window and renders the details of the Work Order and its associated Service Tasks to the opened page to be printed
function exportWorkOrder(primaryControl) {
    var workOrderTitle = workOrderLocalized + " " + primaryControl.getAttribute("msdyn_name").getValue();
    var exportWindow = window.open();
    //Write HTML page template to export Window
    exportWindow.document.write(`<html><head><title>${workOrderTitle}</title><link rel="stylesheet" type="text/css" href="../WebResources/ts_/css/WorkOrderExport.css"></head><body></body></html>`);

    //Create Work Order Header
    var workOrderHeader = exportWindow.document.createElement('h1');
    workOrderHeader.innerText = workOrderTitle

    //Create Work Order Details Header
    workOrderDetailsHeader = exportWindow.document.createElement('h2');
    workOrderDetailsHeader.innerText = workOrderDetailsLocalized;

    //Load Work Order Field Labels and Values

    //Load properties for Stakeholder field
    var stakeholderLabel = primaryControl.getControl('msdyn_serviceaccount').getLabel();
    var stakeholderValue = primaryControl.getAttribute('msdyn_serviceaccount').getValue();
    var stakeholderText = (stakeholderValue != null) ? stakeholderValue[0].name : "";
    //Load properties for Site field
    var siteLabel = primaryControl.getControl('ts_site').getLabel();
    var siteValue = primaryControl.getAttribute('ts_site').getValue();
    var siteText = (siteValue != null) ? siteValue[0].name : "";
    //Load properties for Activity Type field
    var activityTypeLabel = primaryControl.getControl('msdyn_primaryincidenttype').getLabel();
    var activityTypeValue = primaryControl.getAttribute('msdyn_primaryincidenttype').getValue();
    var activityTypeText = (activityTypeValue != null) ? activityTypeValue[0].name : "";

    //Create unordered list and add in Work Order Field Values
    var workOrderDetailsList = exportWindow.document.createElement('ul');
    workOrderDetailsList.style.listStyleType = "none";
    workOrderDetailsList.innerHTML += '<li><strong>' + stakeholderLabel + ':</strong> ' + stakeholderText + '</li>';
    workOrderDetailsList.innerHTML += '<li><strong>' + siteLabel + ':</strong> ' + siteText + '</li>';
    workOrderDetailsList.innerHTML += '<li><strong>' + activityTypeLabel + ':</strong> ' + activityTypeText + '</li>';

    

    //Append Headers and details list to exportWindow's document body
    var exportWindowBody = exportWindow.document.body;
    exportWindowBody.appendChild(workOrderHeader);
    exportWindowBody.appendChild(workOrderDetailsHeader);
    exportWindowBody.appendChild(workOrderDetailsList);

    //Grab the Work Order's name to use when retrieving all the Service Tasks associated to the work Order
    var workOrderName = primaryControl.getAttribute("msdyn_name").getValue();

    //Start a list of service task containers. These will be filled below and then sorted when they're all full
    var WOSTContainerList = [];

    //Retrieve all Service Tasks associated to the Work Order
    Xrm.WebApi.retrieveMultipleRecords("msdyn_workorderservicetask", `?$select=msdyn_workorderservicetaskid,msdyn_name,_msdyn_tasktype_value,ovs_questionnaireresponse,statuscode,ovs_questionnairedefinition&$filter=msdyn_workorder/msdyn_name eq '${workOrderName}'`).then(
        async function success(result) {
            if (result.entities.length > 0) {

                //Create Work Order Service Task Details Header
                WOSTDetailsHeader = exportWindow.document.createElement('h2');
                WOSTDetailsHeader.innerText = WorkOrderServiceTaskDetailsLocalized;
                exportWindowBody.appendChild(WOSTDetailsHeader);

                var findingPromises = [];

                //Render Details for every Service Task Retrieved
                result.entities.forEach(function (entity) {
                    //Load needed values from the current entity
                    var WOSTName = entity.msdyn_name;
                    var WOSTTaskType = entity["_msdyn_tasktype_value@OData.Community.Display.V1.FormattedValue"];
                    var WOSTStatus = entity["statuscode@OData.Community.Display.V1.FormattedValue"];
                    var WOSTResponse = JSON.parse(entity.ovs_questionnaireresponse);

                    //Create Div to contain WOST Details, assigning class to prevent page breaking during printing
                    var WOSTDetailsDiv = exportWindow.document.createElement('div');
                    WOSTDetailsDiv.className = "WOSTDetailsContainer";

                    //Create Service Task Details Header
                    var WOSTDetailsNameHeader = exportWindow.document.createElement('h3');
                    WOSTDetailsNameHeader.innerText = serviceTaskLocalized + " " + WOSTName;

                    //Create unordered list and add in Service Task Values
                    var WOSTDetailsList = exportWindow.document.createElement('ul');
                    WOSTDetailsList.style.listStyleType = "none";
                    WOSTDetailsList.innerHTML += '<li><strong>' + taskTypeLocalized + ':</strong> ' + WOSTTaskType + '</li>';
                    WOSTDetailsList.innerHTML += '<li><strong>' + statusReasonLocalized + ':</strong > ' + WOSTStatus + '</li > ';

                    //Add Total Findings: 0, will be updated when findings are retrieved
                    var totalFindings = exportWindow.document.createElement('li');
                    var activeFindingsCount = 0;

                    //Create Container to hold everything related to this service task
                    var WOSTContainer = exportWindow.document.createElement('div');

                    //Append Header and Service Task List to exportWindow's document body
                    WOSTDetailsDiv.appendChild(WOSTDetailsNameHeader);
                    WOSTDetailsDiv.appendChild(WOSTDetailsList);
                    WOSTContainer.appendChild(WOSTDetailsDiv);

                    //If no Questionnaire Response is in the current Service Task, nothing else needs to be done so return
                    if (WOSTResponse == null) {
                        //Set a blank overall inspection comment
                        WOSTDetailsList.innerHTML += "<strong>" + overallInspectionCommentLocalized + ":</strong> ";
                        //Show 0 Total Findings
                        totalFindings.innerHTML = "<strong>" + totalFindingsLocalized + ":</strong> 0";
                        //Append Total Findings to Service Task Value List
                        WOSTDetailsList.appendChild(totalFindings);
                        WOSTContainerList.push({
                            WOSTNumber: WOSTName.split('-').pop(),
                            container: WOSTContainer
                        });
                        return;
                    } 
                    var responseKeys = Object.keys(WOSTResponse);
                    var inspectionCommentText = "";

                    //If it starts with "Overall Inspection Comment", set inspectionCommentText to its value
                    responseKeys.forEach(function (key) {
                        if (key.startsWith("Overall Inspection Comment")) {
                            inspectionCommentText = WOSTResponse[key];
                        }
                    });

                    //Add the Overall Inspection Comment to the Service Task details list
                    WOSTDetailsList.innerHTML += "<strong>" + overallInspectionCommentLocalized + ":</strong> " + inspectionCommentText;

                    var WOSTId = entity.msdyn_workorderservicetaskid;
                    var findingPromise = Xrm.WebApi.retrieveMultipleRecords("ovs_finding", `?$select=ovs_findingprovisionreference,ts_findingprovisiontexten,ts_findingprovisiontextfr,ovs_findingcomments,statecode,_ts_operationid_value,_ts_accountid_value,ts_findingtype&$filter=_ovs_workorderservicetaskid_value eq '${WOSTId}'`).then(
                        async function success(result, index) {
                            if (result.entities.length > 0) {
                                //Create a table to display all findings
                                var findingsTable = exportWindow.document.createElement('table');
                                var findingsTableHeaderRow = exportWindow.document.createElement('tr');
                                var findingsTableHeader = exportWindow.document.createElement('th');
                                findingsTableHeader.innerText = findingsLocalized;
                                findingsTableHeaderRow.appendChild(findingsTableHeader);
                                findingsTable.appendChild(findingsTableHeaderRow);
                                //For each finding, create a table row add the findings data to that row
                                result.entities.forEach(function (finding) {
                                    if (finding.statecode == 1) return;
                                    activeFindingsCount += 1;
                                    var findingsDataRow = exportWindow.document.createElement('tr');
                                    var findingsData = exportWindow.document.createElement('td');
                                    var provisionReference = finding.ovs_findingprovisionreference || "";
                                    var provisiontText = finding.ts_findingprovisiontexten || "";
                                    var findingType = finding["ts_findingtype@OData.Community.Display.V1.FormattedValue"] || "";
                                    var accountableOperation = finding["_ts_operationid_value@OData.Community.Display.V1.FormattedValue"] || "";
                                    var accountableStakeholder = finding["_ts_accountid_value@OData.Community.Display.V1.FormattedValue"] || "";
                                    var findingComments = finding.ovs_findingcomments || "";
                                    if (lang == 1036 && finding.ts_findingprovisiontextfr != undefined) provisiontText = finding.ts_findingprovisiontextfr;
                                    findingsData.innerHTML += "<strong>" + provisionReferenceLocalized + ":</strong> " + provisionReference + "<br>";
                                    findingsData.innerHTML += provisiontText + "<br>";
                                    findingsData.innerHTML += "<strong>" + findingTypeLocalized + ":</strong> " + findingType + "<br>";
                                    findingsData.innerHTML += "<strong>" + stakeholderLocalized + ":</strong> " + accountableOperation + "<br>";
                                    findingsData.innerHTML += "<strong>" + operationLocalized + ":</strong> " + accountableStakeholder + "<br>";
                                    findingsData.innerHTML += "<strong>" + inspectorCommentLocalized + ":</strong> " + findingComments + "<br>";
                                    findingsDataRow.appendChild(findingsData);
                                    findingsTable.appendChild(findingsDataRow);
                                });
                                WOSTContainer.appendChild(findingsTable);
                            }
                            //Update total findings count
                            totalFindings.innerHTML = "<strong>" + totalFindingsLocalized + ":</strong> " + activeFindingsCount;
                            //Append Total Findings to Service Task Value List
                            WOSTDetailsList.appendChild(totalFindings);

                            WOSTContainerList.push({
                                WOSTNumber: WOSTName.split('-').pop(),
                                container: WOSTContainer
                            });
                        }
                    );
                    findingPromises.push(findingPromise);
                });
                //Wait for all the retrievals of the findings in all the retrievals of the service tasks to finish, then print.
                Promise.all(findingPromises).then(() => {
                    //Sort the WOST Containers in order of the service task numbers, then append to the exportWindow in sorted order
                    WOSTContainerList.sort(function (a, b) { return a.WOSTNumber - b.WOSTNumber });
                    WOSTContainerList.forEach((WOSTC) => {
                        exportWindowBody.appendChild(WOSTC.container);
                        exportWindowBody.innerHTML += '<hr>';
                    });
                    exportWindow.print();
                    exportWindow.close();
                });
            } else {
                //No service tasks, so print
                exportWindow.print();
                exportWindow.close();
            }
        },
        function (error) {
            console.log(error.message);
            // handle error conditions
        }
    );
}