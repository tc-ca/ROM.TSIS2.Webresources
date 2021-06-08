function addExistingWorkOrdersToCase(primaryControl, selectedEntityTypeName, selectedControl){
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
    var exportWindow = window.open();
    exportWindow.document.write('<html><head><title>Work Order Export</title><link rel="stylesheet" type="text/css" href="../WebResources/ts_/css/WorkOrderExport.css"></head><body></body></html>');

    var workOrderHeader = exportWindow.document.createElement('h1');
    workOrderHeader.innerText = "Work Order";

    var workOrderName = exportWindow.document.createElement('h2');
    workOrderName.innerText = primaryControl.getAttribute("msdyn_name").getValue();

    workOrderDetailsHeader = exportWindow.document.createElement('h3');
    workOrderDetailsHeader.innerText = "Work Order Details";

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
    workOrderDetailsList.innerHTML += '<li>' + stakeholderLabel + ': ' + stakeholderText + '</li>';
    workOrderDetailsList.innerHTML += '<li>' + siteLabel + ': ' + siteText + '</li>';
    workOrderDetailsList.innerHTML += '<li>' + activityTypeLabel + ': ' + activityTypeText + '</li>';

    WOSTDetailsHeader = exportWindow.document.createElement('h3');
    WOSTDetailsHeader.innerText = "Work Order Service Tasks Details";

    var exportWindowBody = exportWindow.document.body;
    exportWindowBody.appendChild(workOrderHeader);
    exportWindowBody.appendChild(workOrderName);
    exportWindowBody.appendChild(workOrderDetailsHeader);
    exportWindowBody.appendChild(workOrderDetailsList);
    exportWindowBody.appendChild(WOSTDetailsHeader);
    

    //Service Task Type(s)
    var workOrderName = primaryControl.getAttribute("msdyn_name").getValue();
    Xrm.WebApi.retrieveMultipleRecords("msdyn_workorderservicetask", `?$select=msdyn_name,_msdyn_tasktype_value,ovs_questionnaireresponse,ovs_questionnairedefinition&$filter=msdyn_workorder/msdyn_name eq '${workOrderName}'`).then(
        async function success(result) {
            if (result.entities.length > 0) {
                result.entities.forEach(function (entity) {
                    var WOSTName = entity.msdyn_name;
                    var WOSTTaskType = entity["_msdyn_tasktype_value@OData.Community.Display.V1.FormattedValue"];
                    var WOSTDefinition = entity.ovs_questionnairedefinition;
                    var WOSTResponse = JSON.parse(entity.ovs_questionnaireresponse);

                    var WOSTDetailsList = exportWindow.document.createElement('ul');
                    WOSTDetailsList.style.listStyleType = "none";
                    WOSTDetailsList.innerHTML += '<li>Service Task: ' + WOSTName + '</li>';
                    WOSTDetailsList.innerHTML += '<li>Task Type: ' + WOSTTaskType + '</li>';

                    var responseKeys = Object.keys(WOSTResponse);
                    var findings = [];
                    var inspectionCommentText = "";
                    responseKeys.forEach(function (key) {
                        if (key.startsWith("finding-")) {
                            findings.push(WOSTResponse[key]);
                        } else if (key.startsWith("Overall")) {
                            inspectionCommentText = WOSTResponse[key];
                        }
                    });
                    WOSTDetailsList.innerHTML += "Overall Inspection Comment: " + inspectionCommentText;

                    var findingsTable = exportWindow.document.createElement('table');
                    var findingsTableHeaderRow = exportWindow.document.createElement('tr');
                    var findingsTableHeader = exportWindow.document.createElement('th');

                    findingsTableHeader.innerText = "Findings";

                    findingsTableHeaderRow.appendChild(findingsTableHeader);
                    findingsTable.appendChild(findingsTableHeaderRow);

                    findings.forEach(function (finding) {
                        var findingsDataRow = exportWindow.document.createElement('tr');
                        var findingsData = exportWindow.document.createElement('td');

                        findingsData.innerHTML += "<strong>Provision Reference:</strong> " + finding.provisionReference + "<br>";
                        findingsData.innerHTML += finding.provisionTextEn + "<br>";
                        findingsData.innerHTML += "<strong>Inspector Comment:</strong> " + finding.comments + "<br>";

                        findingsDataRow.appendChild(findingsData);
                        findingsTable.appendChild(findingsDataRow);
                    });

                    exportWindowBody.appendChild(WOSTDetailsList);
                    exportWindowBody.appendChild(findingsTable);
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