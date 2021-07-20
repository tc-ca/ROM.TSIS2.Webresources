

function addExistingOperationsToEntity(primaryControl, selectedEntityTypeName, selectedControl){
    const formContext = primaryControl;
    Xrm.Utility.getEntityMetadata(primaryControl._entityName).then(function (primaryEntityData) {
        const entityName = Xrm.Page.data.entity.getEntityName();
        const entitySetName = primaryEntityData.EntitySetName; //name that is used in api calls, it's normally the entity name in plural (ovs_operation -> ovs_operations)
        const recordId = Xrm.Page.data.entity.getId().replace(/({|})/g,'');

        var currentOperation;
        var defaultViewId = "";
        var viewIds = "";

        var operationsAlreadyAssociatedCondition = filterExistingOperations(formContext, entitySetName, recordId, selectedControl);

        if(entityName == "msdyn_workorder"){ //work order form

            defaultViewId = "080302c7-54e9-eb11-bacb-0022483c44f1"; 

            viewIds = ["080302c7-54e9-eb11-bacb-0022483c44f1", "cca2cae4-216e-46b5-934e-d9112870f36f"];

            setWorkOrderLookupControl(formContext, selectedControl, entitySetName, recordId, defaultViewId, viewIds, operationsAlreadyAssociatedCondition);
            
        }
        else if (entityName == "incident"){ // case form
            setCaseLookupControl(formContext, selectedControl, entitySetName, recordId, defaultViewId, viewIds, operationsAlreadyAssociatedCondition);
        }
        else if (entityName == "ovs_operation"){ // operation
            defaultViewId = "cca2cae4-216e-46b5-934e-d9112870f36f";
            viewIds = ["cca2cae4-216e-46b5-934e-d9112870f36f"];

            setOperationLookupControl(formContext, selectedControl, entitySetName, recordId, defaultViewId, viewIds, operationsAlreadyAssociatedCondition);
        }
    });
}

function showErrorMessageAlert(error){
    var alertStrings = { text: error.message };
    var alertOptions = { height: 120, width: 260 };
    Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function () { });
}

//Filter the operations so the ones that are already associated don't show up in the lookup panel
function filterExistingOperations(formContext, entitySetName, recordId, selectedControl){
    var operationsAlreadyAssociatedCondition = "";

    var req = new XMLHttpRequest();
    req.open("GET", formContext.context.getClientUrl() + "/api/data/v9.0/" + entitySetName + "(" + recordId+ ")" + "/" + selectedControl.getRelationship().name, false);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");

    req.onreadystatechange = function() {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 200) {
                var results = JSON.parse(this.response);
                for (var i = 0; i < results.value.length; i++) {
                    operationsAlreadyAssociatedCondition += `<condition attribute="ovs_operationid" operator="neq" value="${results.value[i]["ovs_operationid"]}" />`;
                }
            } else {
                Xrm.Utility.alertDialog(this.statusText);
            }
        }
    };
    req.send();
    return operationsAlreadyAssociatedCondition;
}

function setOperationLookupControl(formContext, selectedControl, entitySetName, recordId, defaultViewId, viewIds, operationsAlreadyAssociatedCondition ){
    var currentOperationCondition = (recordId != "") ? `<condition attribute="ovs_operationid" operator="neq" value="${recordId}" />` : "" ;
    
    var lookupOptions =
    {
        defaultEntityType: "ovs_operation",
        entityTypes: ["ovs_operation"],
        allowMultiSelect: true,
        defaultViewId: `${defaultViewId}`,
        disableMru: true,
        filters: [
            {
                filterXml: `<filter type="and">` + 
                    `${operationsAlreadyAssociatedCondition}` +
                    `${currentOperationCondition}` +
                    `</filter> `,
                entityLogicalName: "ovs_operation"
            }
        ],
        viewIds : viewIds
    };

    //add the operation both ways (many-to-many)
    Xrm.Utility.lookupObjects(lookupOptions).then(
        function(result){
            for (var i = 0; i < result.length; i++) {
                var reqToAssociateCurrentOperationsToSelectedOperations = new XMLHttpRequest();
                var reqToAssociateSelectedOperationToCurrentOperations = new XMLHttpRequest();

                reqToAssociateCurrentOperationsToSelectedOperations.open("POST", formContext.context.getClientUrl() + "/api/data/v9.0/" + "ovs_operations" + "(" + result[i].id.replace(/({|})/g,'') + ")" + "/" + selectedControl.getRelationship().name + "/$ref");
                reqToAssociateCurrentOperationsToSelectedOperations.setRequestHeader("Content-Type", "application/json");
                reqToAssociateCurrentOperationsToSelectedOperations.setRequestHeader("Accept", "application/json");
                reqToAssociateCurrentOperationsToSelectedOperations.setRequestHeader("OData-MaxVersion", "4.0");
                reqToAssociateCurrentOperationsToSelectedOperations.setRequestHeader("OData-Version", "4.0");

                var payload =
                    {
                        "@odata.context" : "https://romts-gsrst-dev-tcd365.crm3.dynamics.com/api/data/v9.0/$metadata#$ref",
                        "@odata.id" : formContext.context.getClientUrl() + "/api/data/v9.0/" + entitySetName + "(" + recordId + ")"
                    };
            
                    reqToAssociateCurrentOperationsToSelectedOperations.onreadystatechange = function() {
                    if (this.readyState === 4) {
                        reqToAssociateCurrentOperationsToSelectedOperations.onreadystatechange = null;
                        if (this.status === 204) {
                            selectedControl.refresh();
                        } else {
                            showErrorMessageAlert(this.statusText);
                        }
                    }
                };
        
                reqToAssociateCurrentOperationsToSelectedOperations.send(JSON.stringify(payload));

                reqToAssociateSelectedOperationToCurrentOperations.open("POST", formContext.context.getClientUrl() + "/api/data/v9.0/" + "ovs_operations" + "(" + recordId + ")" + "/" + selectedControl.getRelationship().name + "/$ref");
                reqToAssociateSelectedOperationToCurrentOperations.setRequestHeader("Content-Type", "application/json");
                reqToAssociateSelectedOperationToCurrentOperations.setRequestHeader("Accept", "application/json");
                reqToAssociateSelectedOperationToCurrentOperations.setRequestHeader("OData-MaxVersion", "4.0");
                reqToAssociateSelectedOperationToCurrentOperations.setRequestHeader("OData-Version", "4.0");

                var payload =
                    {
                        "@odata.context" : "https://romts-gsrst-dev-tcd365.crm3.dynamics.com/api/data/v9.0/$metadata#$ref",
                        "@odata.id" : formContext.context.getClientUrl() + "/api/data/v9.0/" + entitySetName + "(" + result[i].id.replace(/({|})/g,'') + ")"
                    };
            
                    reqToAssociateSelectedOperationToCurrentOperations.onreadystatechange = function() {
                    if (this.readyState === 4) {
                        reqToAssociateSelectedOperationToCurrentOperations.onreadystatechange = null;
                        if (this.status === 204) {
                            selectedControl.refresh();
                        } else {
                            showErrorMessageAlert(this.statusText);
                        }
                    }
                };
        
                reqToAssociateSelectedOperationToCurrentOperations.send(JSON.stringify(payload));
            }

    },
    function (error){
        showErrorMessageAlert(error);
    });
}

function setWorkOrderLookupControl(formContext, selectedControl, entitySetName, recordId, defaultViewId, viewIds, operationsAlreadyAssociatedCondition){
    var operationValue = formContext.getAttribute("ovs_operationid").getValue();
    var currentOperationCondition = operationValue != null ? `<condition attribute="ovs_operationid" operator="neq" value="${operationValue[0].id}" />` : "";
    var relatedOperations = operationValue != null ? `<condition entityname="ts_ovs_operation_ovs_operation" attribute="ovs_operationidtwo" operator="eq" value="${operationValue[0].id}" />` : "";

    var lookupOptions =
    {
        defaultEntityType: "ovs_operation",
        entityTypes: ["ovs_operation"],
        allowMultiSelect: true,
        defaultViewId: `${defaultViewId}`,
        disableMru: true,
        filters: [
            {
                filterXml: `<filter type="and">` + 
                    `${operationsAlreadyAssociatedCondition}` +
                    `${currentOperationCondition}` +
                    `${relatedOperations}` +
                    `</filter> `,
                entityLogicalName: "ovs_operation"
            }
        ],
        viewIds : viewIds
    };

    Xrm.Utility.lookupObjects(lookupOptions).then(
        function(result){
            for (var i = 0; i < result.length; i++) {

                req = new XMLHttpRequest();

                req.open("POST", formContext.context.getClientUrl() + "/api/data/v9.0/" + "ovs_operations" + "(" + result[i].id.replace(/({|})/g,'') + ")" + "/" + selectedControl.getRelationship().name + "/$ref");
                req.setRequestHeader("Content-Type", "application/json");
                req.setRequestHeader("Accept", "application/json");
                req.setRequestHeader("OData-MaxVersion", "4.0");
                req.setRequestHeader("OData-Version", "4.0");

                var payload =
                    {
                        "@odata.id" : formContext.context.getClientUrl() + "/api/data/v9.0/" + entitySetName + "(" + recordId + ")" //workorder
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



function setCaseLookupControl(formContext, selectedControl, entitySetName, recordId, defaultViewId, viewIds, operationsAlreadyAssociatedCondition){

    var lookupOptions =
    {
        defaultEntityType: "ovs_operation",
        entityTypes: ["ovs_operation"],
        allowMultiSelect: true,
        defaultViewId: `${defaultViewId}`,
        disableMru: true,
        filters: [
            {
                filterXml: `<filter type="and">` + 
                    `${operationsAlreadyAssociatedCondition}` +
                    `</filter> `,
                entityLogicalName: "ovs_operation"
            }
        ],
        viewIds : viewIds
    };

    Xrm.Utility.lookupObjects(lookupOptions).then(
        function(result){
            for (var i = 0; i < result.length; i++) {

                req = new XMLHttpRequest();

                req.open("POST", formContext.context.getClientUrl() + "/api/data/v9.0/" + "incidents" + "(" + recordId + ")" + "/" + selectedControl.getRelationship().name + "/$ref");
                req.setRequestHeader("Content-Type", "application/json");
                req.setRequestHeader("Accept", "application/json");
                req.setRequestHeader("OData-MaxVersion", "4.0");
                req.setRequestHeader("OData-Version", "4.0");

                var payload =
                    {
                        "@odata.context" : formContext.context.getClientUrl() + "/api/data/v9.0/" + "api/data/v9.0/$metadata#$ref",
                        "@odata.id" : entitySetName + "(" + result[i].id.replace(/({|})/g,'') + ")"
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

function removeOperations(selectedEntityTypeName, selectedControl, FirstSelectedItemId){
    //removal of the current operation from the related operations both ways (many to many)
    if(selectedControl.getParentForm().data.entity.getEntityName() == "ovs_operation"){
        var req = new XMLHttpRequest();
        selectedControl.getGrid().getSelectedRows().forEach(row => 
            {
                req = new XMLHttpRequest();
                req.open("DELETE", Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.0/" + "ovs_operations" + "(" + row.data.entity.getId().replace(/({|})/g,'') + ")" + "/" + selectedControl.getRelationship().name + "(" + Xrm.Page.data.entity.getId().replace(/({|})/g,'') + ")" + "/$ref", false);
                req.setRequestHeader("Content-Type", "application/json");
                req.setRequestHeader("Accept", "application/json");
                req.setRequestHeader("OData-MaxVersion", "4.0");
                req.setRequestHeader("OData-Version", "4.0");
                req.send();      
            }
        );
        XrmCore.Commands.Disassociate.gridDisassociate(selectedEntityTypeName, selectedControl, FirstSelectedItemId);
    }
    else{ //normal behavior if another form is used because (one-to-many)
        XrmCore.Commands.Disassociate.gridDisassociate(selectedEntityTypeName, selectedControl, FirstSelectedItemId);
    }
}