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