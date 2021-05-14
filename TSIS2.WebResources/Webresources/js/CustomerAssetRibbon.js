function addExistingAssetsToWorkOrder(primaryControl, selectedEntityTypeName, selectedControl){
    const formContext = primaryControl;
    const workOrderID = Xrm.Page.data.entity.getId().replace(/({|})/g,'');
    var customerAssetsAlreadyAssociatedCondition = "";



    var req = new XMLHttpRequest();
    req.open("GET", formContext.context.getClientUrl() + "/api/data/v9.0/" + "msdyn_workorders" + "(" + workOrderID+ ")" + "/" + "ts_msdyn_customerasset_msdyn_workorder_msdyn", false);
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
        defaultViewId:"bf49a9fc-82a7-eb11-9442-000d3a8410dc",
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

            req.open("POST", formContext.context.getClientUrl() + "/api/data/v9.0/" + "msdyn_customerassets" + "(" + result[i].id.replace(/({|})/g,'') + ")" + "/" + "ts_msdyn_customerasset_msdyn_workorder_msdyn" + "/$ref");
            req.setRequestHeader("Content-Type", "application/json");
            req.setRequestHeader("Accept", "application/json");
            req.setRequestHeader("OData-MaxVersion", "4.0");
            req.setRequestHeader("OData-Version", "4.0");

            var payload =
                {
                    "@odata.id" : formContext.context.getClientUrl() + "/api/data/v9.0/" + "msdyn_workorders" + "(" + workOrderID + ")"
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

    function showErrorMessageAlert(error){
        var alertStrings = { text: error.message };
        var alertOptions = { height: 120, width: 260 };
        Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function () { });
    }
}