function addExistingAssetsToWorkOrder(primaryControl, selectedEntityTypeName, selectedControl){
    const formContext = primaryControl;

    const workOrderID = Xrm.Page.data.entity.getId().replace(/({|})/g,'');

    var lookupOptions =
    {
        defaultEntityType: "msdyn_customerasset",
        entityTypes: ["msdyn_customerasset"],
        allowMultiSelect: true,
        defaultViewId:"bf49a9fc-82a7-eb11-9442-000d3a8410dc",
        disableMru: true,
    };

    Xrm.Utility.lookupObjects(lookupOptions).then(
    function(result){
        console.log(result);
        for (var i = 0; i < result.length; i++) {
            var req = new XMLHttpRequest();

            req.open("PATCH", formContext.context.getClientUrl() + "/api/data/v9.0/" + "msdyn_customerassets" + "(" + result[i].id.replace(/({|})/g,'') + ")");
            req.setRequestHeader("Content-Type", "application/json");
            req.setRequestHeader("Accept", "application/json");
            req.setRequestHeader("OData-MaxVersion", "4.0");
            req.setRequestHeader("OData-Version", "4.0");

            var payload =
                {
                    "msdyn_servicerequest@odata.bind" : formContext.context.getClientUrl() + "/api/data/v9.0/" + "msdyn_workorders" + "(" + workOrderID + ")"
                };

            req.send(JSON.stringify(payload));
        }
    },
    function (error){
        showErrorMessageAlert(error);
    });
}