

function addExistingAssetsToEntity(primaryControl, selectedEntityTypeName, selectedControl){
    //XrmCore.Commands.AddFromSubGrid.addExistingFromSubGridAssociated(selectedEntityTypeName, selectedControl);
    const formContext = primaryControl;
    Xrm.Utility.getEntityMetadata(primaryControl._entityName).then(function (primaryEntityData) {
        const entityName = Xrm.Page.data.entity.getEntityName();
        const entitySetName = primaryEntityData.EntitySetName; //name that is used in api calls, it's normally the entity name in plural (msdyn_customerasset -> msdyn_customerassets)
        const recordId = Xrm.Page.data.entity.getId().replace(/({|})/g,'');

        var currentCustomerAsset;
        var defaultViewId = "";
        var viewIds = "";

        var customerAssetsAlreadyAssociatedCondition = filterExistingOperations(formContext, entitySetName, recordId, selectedControl);

        if(entityName == "msdyn_workorder"){ //work order form

            defaultViewId = Xrm.Page.ui.tabs.get("assets_tab").getDisplayState() == "expanded" ? "bf49a9fc-82a7-eb11-9442-000d3a8410dc" : "3d2af424-46cd-eb11-bacc-0022483c043b";

            viewIds = [(Xrm.Page.ui.tabs.get("assets_tab").getDisplayState() == "expanded" ? "bf49a9fc-82a7-eb11-9442-000d3a8410dc" : "3d2af424-46cd-eb11-bacc-0022483c043b", "6d5b19df-82a7-eb11-9442-000d3a8419e6")];

            setWorkOrderLookupControl(formContext, selectedControl, entitySetName, recordId, defaultViewId, viewIds, customerAssetsAlreadyAssociatedCondition);
            
        }
        else if (entityName == "incident"){ // case form
            setCaseLookupControl(formContext, selectedControl, entitySetName, recordId, defaultViewId, viewIds, customerAssetsAlreadyAssociatedCondition);
        }
        else if (entityName == "msdyn_customerasset"){ // operation
            defaultViewId = "6d5b19df-82a7-eb11-9442-000d3a8419e6";
            viewIds = ["6d5b19df-82a7-eb11-9442-000d3a8419e6"];

            setOperationLookupControl(formContext, selectedControl, entitySetName, recordId, defaultViewId, viewIds, customerAssetsAlreadyAssociatedCondition);
        }
    });
}

function showErrorMessageAlert(error){
    var alertStrings = { text: error.message };
    var alertOptions = { height: 120, width: 260 };
    Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function () { });
}

//Filter the assets so the ones that are already associated don't show up in the lookup panel
function filterExistingOperations(formContext, entitySetName, recordId, selectedControl){
    var customerAssetsAlreadyAssociatedCondition = "";

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
                    customerAssetsAlreadyAssociatedCondition += `<condition attribute="msdyn_customerassetid" operator="neq" value="${results.value[i]["msdyn_customerassetid"]}" />`;
                }
            } else {
                Xrm.Utility.alertDialog(this.statusText);
            }
        }
    };
    req.send();
    return customerAssetsAlreadyAssociatedCondition;
}

function setOperationLookupControl(formContext, selectedControl, entitySetName, recordId, defaultViewId, viewIds, customerAssetsAlreadyAssociatedCondition ){
    var currentCustomerAssetCondition = (recordId != "") ? `<condition attribute="msdyn_customerassetid" operator="neq" value="${recordId}" />` : "" ;
    
    var lookupOptions =
    {
        defaultEntityType: "msdyn_customerasset",
        entityTypes: ["msdyn_customerasset"],
        allowMultiSelect: true,
        defaultViewId: `${defaultViewId}`,
        disableMru: true,
        filters: [
            {
                filterXml: `<filter type="and">` + 
                    `${customerAssetsAlreadyAssociatedCondition}` +
                    `${currentCustomerAssetCondition}` +
                    `</filter> `,
                entityLogicalName: "msdyn_customerasset"
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

                reqToAssociateCurrentOperationsToSelectedOperations.open("POST", formContext.context.getClientUrl() + "/api/data/v9.0/" + "msdyn_customerassets" + "(" + result[i].id.replace(/({|})/g,'') + ")" + "/" + selectedControl.getRelationship().name + "/$ref");
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

                reqToAssociateSelectedOperationToCurrentOperations.open("POST", formContext.context.getClientUrl() + "/api/data/v9.0/" + "msdyn_customerassets" + "(" + recordId + ")" + "/" + selectedControl.getRelationship().name + "/$ref");
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

function setWorkOrderLookupControl(formContext, selectedControl, entitySetName, recordId, defaultViewId, viewIds, customerAssetsAlreadyAssociatedCondition){
    var customerAssetValue = formContext.getAttribute("ovs_asset").getValue();
    var currentCustomerAssetCondition = `<condition attribute="msdyn_customerassetid" operator="neq" value="${customerAssetValue[0].id}" />`;
    var relatedOperations = `<link-entity name="ts_msdyn_customerasset_msdyn_customerasset" intersect="true" visible="false" to="msdyn_customerassetid" from="msdyn_customerassetidtwo" ><link-entity name="msdyn_customerasset" from="msdyn_customerassetid" to="msdyn_customerassetidone" alias="bb" > <filter type="and" ><condition attribute="msdyn_customerassetid" operator="eq" uitype="msdyn_customerasset" value="${customerAssetValue[0].id}" /></filter></link-entity></link-entity>`

    var lookupOptions =
    {
        defaultEntityType: "msdyn_customerasset",
        entityTypes: ["msdyn_customerasset"],
        allowMultiSelect: true,
        defaultViewId: `${defaultViewId}`,
        disableMru: true,
        filters: [
            {
                filterXml: `<filter type="and">` + 
                    `${customerAssetsAlreadyAssociatedCondition}` +
                    `${currentCustomerAssetCondition}` +
                    `${relatedOperations}` +
                    `</filter> `,
                entityLogicalName: "msdyn_customerasset"
            }
        ],
        viewIds : viewIds
    };

    Xrm.Utility.lookupObjects(lookupOptions).then(
        function(result){
            for (var i = 0; i < result.length; i++) {

                req = new XMLHttpRequest();

                req.open("POST", formContext.context.getClientUrl() + "/api/data/v9.0/" + "msdyn_customerassets" + "(" + result[i].id.replace(/({|})/g,'') + ")" + "/" + selectedControl.getRelationship().name + "/$ref");
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



function setCaseLookupControl(formContext, selectedControl, entitySetName, recordId, defaultViewId, viewIds, customerAssetsAlreadyAssociatedCondition){

    var lookupOptions =
    {
        defaultEntityType: "msdyn_customerasset",
        entityTypes: ["msdyn_customerasset"],
        allowMultiSelect: true,
        defaultViewId: `${defaultViewId}`,
        disableMru: true,
        filters: [
            {
                filterXml: `<filter type="and">` + 
                    `${customerAssetsAlreadyAssociatedCondition}` +
                    `</filter> `,
                entityLogicalName: "msdyn_customerasset"
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

function removeAsset(selectedEntityTypeName, selectedControl, FirstSelectedItemId){
    //removal of the current operation from the related operations both ways (many to many)
    if(selectedControl.getParentForm().data.entity.getEntityName() == "msdyn_customerassets"){
        var req = new XMLHttpRequest();
        selectedControl.getGrid().getSelectedRows().forEach(row => 
            {
                req = new XMLHttpRequest();
                req.open("DELETE", Xrm.Utility.getGlobalContext().getClientUrl() + "/api/data/v9.0/" + "msdyn_customerassets" + "(" + row.data.entity.getId().replace(/({|})/g,'') + ")" + "/" + selectedControl.getRelationship().name + "(" + Xrm.Page.data.entity.getId().replace(/({|})/g,'') + ")" + "/$ref", false);
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