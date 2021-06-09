function addExistingAssetsToEntity(primaryControl, selectedEntityTypeName, selectedControl){
    const formContext = primaryControl;
    Xrm.Utility.getEntityMetadata(primaryControl._entityName).then(function (primaryEntityData) {
        const entitySetName = primaryEntityData.EntitySetName;
        const entityID = Xrm.Page.data.entity.getId().replace(/({|})/g,'');
        var customerAssetsAlreadyAssociatedCondition = "";

        var req = new XMLHttpRequest();
        req.open("GET", formContext.context.getClientUrl() + "/api/data/v9.0/" + entitySetName + "(" + entityID+ ")" + "/" + selectedControl.getRelationship().name, false);
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

        var lookupOptions =
        {
            defaultEntityType: "msdyn_customerasset",
            entityTypes: ["msdyn_customerasset"],
            allowMultiSelect: true,
            defaultViewId:(Xrm.Page.ui.tabs.get("assets_tab").getDisplayState() == "expanded" ? "bf49a9fc-82a7-eb11-9442-000d3a8410dc" : "6d5b19df-82a7-eb11-9442-000d3a8419e6"), //show corresponding view (physical asset/operations)
            disableMru: true,
            filters: [
                {
                    filterXml: `<filter type="and">` + 
                        `${customerAssetsAlreadyAssociatedCondition}` +
                        `</filter> `,
                    entityLogicalName: "msdyn_customerasset"
                }
            ]
        };

        console.log(customerAssetsAlreadyAssociatedCondition)

        Xrm.Utility.lookupObjects(lookupOptions).then(
        function(result){
            console.log(result);
            for (var i = 0; i < result.length; i++) {
                req = new XMLHttpRequest();

                req.open("POST", formContext.context.getClientUrl() + "/api/data/v9.0/" + "msdyn_customerassets" + "(" + result[i].id.replace(/({|})/g,'') + ")" + "/" + selectedControl.getRelationship().name + "/$ref");
                req.setRequestHeader("Content-Type", "application/json");
                req.setRequestHeader("Accept", "application/json");
                req.setRequestHeader("OData-MaxVersion", "4.0");
                req.setRequestHeader("OData-Version", "4.0");

                var payload =
                    {
                        "@odata.id" : formContext.context.getClientUrl() + "/api/data/v9.0/" + entitySetName + "(" + entityID + ")"
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
    });
    

    function showErrorMessageAlert(error){
        var alertStrings = { text: error.message };
        var alertOptions = { height: 120, width: 260 };
        Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function () { });
    }
}