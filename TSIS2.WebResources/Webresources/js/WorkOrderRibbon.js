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

function exportWorkOrder(primaryControl) {
    var workOrderTitle = workOrderLocalized + " " + primaryControl.getAttribute("msdyn_name").getValue();
    var exportWindow = window.open();
    exportWindow.document.write(`<html><head><title>${workOrderTitle}</title><link rel="stylesheet" type="text/css" href="../WebResources/ts_/css/WorkOrderExport.css"></head><body></body></html>`);
    
    var workOrderHeader = exportWindow.document.createElement('h1');
    workOrderHeader.innerText = workOrderTitle

    workOrderDetailsHeader = exportWindow.document.createElement('h2');
    workOrderDetailsHeader.innerText = workOrderDetailsLocalized;

    //Stakeholder Name msdyn_serviceaccount
    var stakeholderLabel = primaryControl.getControl('msdyn_serviceaccount').getLabel();
    var stakeholderValue = primaryControl.getAttribute('msdyn_serviceaccount').getValue();
    var stakeholderText = (stakeholderValue != null) ? stakeholderValue[0].name : "";
    //Site Name ts_site
    var siteLabel = primaryControl.getControl('ts_site').getLabel();
    var siteValue = primaryControl.getAttribute('ts_site').getValue();
    var siteText = (siteValue != null) ? siteValue[0].name : "";
    //Acitivity Type Name msdyn_primaryincidenttype
    var activityTypeLabel = primaryControl.getControl('msdyn_primaryincidenttype').getLabel();
    var activityTypeValue = primaryControl.getAttribute('msdyn_primaryincidenttype').getValue();
    var activityTypeText = (activityTypeValue != null) ? activityTypeValue[0].name : "";

    var workOrderDetailsList = exportWindow.document.createElement('ul');
    workOrderDetailsList.style.listStyleType = "none";
    workOrderDetailsList.innerHTML += '<li><strong>' + stakeholderLabel + ':</strong> ' + stakeholderText + '</li>';
    workOrderDetailsList.innerHTML += '<li><strong>' + siteLabel + ':</strong> ' + siteText + '</li>';
    workOrderDetailsList.innerHTML += '<li><strong>' + activityTypeLabel + ':</strong> ' + activityTypeText + '</li>';

    WOSTDetailsHeader = exportWindow.document.createElement('h2');
    WOSTDetailsHeader.innerText = WorkOrderServiceTaskDetailsLocalized;

    var exportWindowBody = exportWindow.document.body;
    exportWindowBody.appendChild(workOrderHeader);
    exportWindowBody.appendChild(workOrderDetailsHeader);
    exportWindowBody.appendChild(workOrderDetailsList);
    exportWindowBody.appendChild(WOSTDetailsHeader);
    

    //Service Task Type(s)
    var workOrderName = primaryControl.getAttribute("msdyn_name").getValue();
    Xrm.WebApi.retrieveMultipleRecords("msdyn_workorderservicetask", `?$select=msdyn_name,_msdyn_tasktype_value,ovs_questionnaireresponse,statuscode,ovs_questionnairedefinition&$filter=msdyn_workorder/msdyn_name eq '${workOrderName}'`).then(
        async function success(result) {
            if (result.entities.length > 0) {
                result.entities.forEach(function (entity) {
                    var WOSTName = entity.msdyn_name;
                    var WOSTTaskType = entity["_msdyn_tasktype_value@OData.Community.Display.V1.FormattedValue"];
                    var WOSTStatus = entity["statuscode@OData.Community.Display.V1.FormattedValue"];
                    var WOSTResponse = JSON.parse(entity.ovs_questionnaireresponse);
                    var totalFindings = 0;

                    var WOSTDetailsNameHeader = exportWindow.document.createElement('h3');
                    WOSTDetailsNameHeader.innerText = serviceTaskLocalized + " " + WOSTName;

                    var WOSTDetailsList = exportWindow.document.createElement('ul');
                    WOSTDetailsList.style.listStyleType = "none";
                    WOSTDetailsList.innerHTML += '<li><strong>' + taskTypeLocalized + ':</strong> ' + WOSTTaskType + '</li>';
                    WOSTDetailsList.innerHTML += '<li><strong>' + statusReasonLocalized + ':</strong > ' + WOSTStatus + '</li > ';

                    var totalFindings = exportWindow.document.createElement('li');
                    totalFindings.innerHTML = "<strong>" + totalFindingsLocalized + ":</strong> 0";

                    WOSTDetailsList.appendChild(totalFindings);
                    exportWindowBody.appendChild(WOSTDetailsNameHeader);
                    exportWindowBody.appendChild(WOSTDetailsList);

                    if (WOSTResponse == null) return;
                    var responseKeys = Object.keys(WOSTResponse);
                    var findings = [];
                    var inspectionCommentText = "";
                    responseKeys.forEach(function (key) {
                        if (key.startsWith("finding-")) {
                            findings.push(WOSTResponse[key]);
                        } else if (key.startsWith("Overall Inspection Comment")) {
                            inspectionCommentText = WOSTResponse[key];
                        }
                    });
                    if (findings.length == 0) return;

                    totalFindings.innerHTML = "<strong>" + totalFindingsLocalized + ":</strong> " + findings.length;

                    WOSTDetailsList.innerHTML += "<strong>" + overallInspectionCommentLocalized + ":</strong> " + inspectionCommentText;

                    var findingsTable = exportWindow.document.createElement('table');
                    var findingsTableHeaderRow = exportWindow.document.createElement('tr');
                    var findingsTableHeader = exportWindow.document.createElement('th');

                    findingsTableHeader.innerText = findingsLocalized;

                    findingsTableHeaderRow.appendChild(findingsTableHeader);
                    findingsTable.appendChild(findingsTableHeaderRow);

                    findings.forEach(function (finding) {
                        var findingsDataRow = exportWindow.document.createElement('tr');
                        var findingsData = exportWindow.document.createElement('td');

                        findingsData.innerHTML += "<strong>" + provisionReferenceLocalized + ":</strong> " + finding.provisionReference + "<br>";
                        findingsData.innerHTML += ((lang == 1036) ? finding.provisionTextFr : finding.provisionTextEn) + "<br>";
                        findingsData.innerHTML += "<strong>" + inspectorCommentLocalized + ":</strong> " + finding.comments + "<br>";

                        findingsDataRow.appendChild(findingsData);
                        findingsTable.appendChild(findingsDataRow);
                    });
                    exportWindowBody.appendChild(findingsTable);
                    exportWindowBody.innerHTML += '<hr>';
                });
                
            }
        },
        function (error) {
            console.log(error.message);
            // handle error conditions
        }
    );
    //Load Service Tasks

    //Show Service Task Fields
}