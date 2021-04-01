function ActivateWorkOrder(primaryControl) {
    const formContext = primaryControl;

    var confirmStrings = { confirmButtonLabel: "Activate",  cancelButtonLabel: "Cancel" , text: "Are you sure you want to activate the selected 1 Work Order?\nThis will set the Work Order to the Active state.", title: "Confirm Work Order Activation" }
    var confirmOptions;
    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
        function (success) {
            if (success.confirmed){
                console.log("Dialog closed using OK button.");
                formContext.getAttribute("statecode").setValue(0);
                formContext.getAttribute("statuscode").setValue(1);
                formContext.getAttribute("msdyn_systemstatus").setValue(690970003); //Open - Completed
            
                openWorkOrderServiceTasks(formContext);
                openBookableResourceBookings(formContext);

                setWorkOrderServiceTasksView(formContext);
                setBookableResourceBookingsView(formContext);

                formContext.data.save();
            }
            else{
                console.log("Dialog closed using Cancel button or X.");
            }
        },
        function (error) {
            console.log(error.message);
        }
    );
}

function openWorkOrderServiceTasks(formContext) {
    workOrderServiceTaskData = 
    {
        "statecode" :  0,           //closed -> 1
        "statuscode" : 918640002    //closed -> 918640003
    };

    Xrm.WebApi.online.retrieveMultipleRecords("msdyn_workorderservicetask", `?$select=msdyn_workorder&$filter=msdyn_workorder/msdyn_workorderid eq ${formContext.data.entity.getId()}`).then(
        function success(result) {
            for (var i = 0; i < result.entities.length; i++) {
                console.log("Found workorderservicetask : " + result.entities[i].msdyn_workorderservicetaskid);
                Xrm.WebApi.updateRecord("msdyn_workorderservicetask", result.entities[i].msdyn_workorderservicetaskid, workOrderServiceTaskData).then(
                    function success(result) {
                        //work order service task opened successfully
                        console.log("Work Order Service task opened");
                    },
                    function (error) {
                        console.log("Err");
                    }
                );
            }
        },
        function (error) {
        }
    );
}

function openBookableResourceBookings(formContext) {
    bookableResourceBookingData = 
            {
                "statecode" :  0,           //closed -> 1
                "statuscode" : 1            //closed -> 2
            };
    Xrm.WebApi.online.retrieveMultipleRecords("bookableresourcebooking", `?$select=msdyn_workorder&$filter=msdyn_workorder/msdyn_workorderid eq ${formContext.data.entity.getId()}`).then(
        function success(result) {
            for (var i = 0; i < result.entities.length; i++) {
                console.log("Found bookable : " + result.entities[i].bookableresourcebookingid);
                Xrm.WebApi.updateRecord("bookableresourcebooking", result.entities[i].bookableresourcebookingid, bookableResourceBookingData).then(
                    function success(result) {
                        //bookable resource booking opened successfully
                        console.log("Bookable Resource Booking opened");
                    },
                    function (error) {
                        //error
                        console.log("Err");
                    }
                );
            }
        },
        function (error) {
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

function setBookableResourceBookingsView(formContext){
    var activeBookingsView = 
    {
        entityType: "savedquery",
        id: "{8AF53D0E-07FE-49D4-BBBA-CA524DD6551B}",
        name: "Active Resource Bookings (Field Service Information)"
    };   

    formContext.getControl("bookings").getViewSelector().setCurrentView(activeBookingsView);
}