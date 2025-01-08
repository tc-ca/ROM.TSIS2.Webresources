function openAddNewEntityRiskFromRibbon(PrimaryControl, PrimaryTypeEntityName, PrimaryControlId) {
    // Ensure the PrimaryControl parameter is passed by the ribbon button
    if (!PrimaryControl) {
        console.error("Primary control not found.");
        return;
    }

    // Get the form context
    var formContext = PrimaryControl;

    // Get the ID of the parent record
    var parentRecordId = formContext.data.entity.getId(); // Parent record ID
    parentRecordId = parentRecordId ? parentRecordId.replace("{", "").replace("}", "") : null; // Clean GUID format

    // Get the logical name of the parent record's entity
    var parentRecordType = formContext.data.entity.getEntityName(); // Parent entity schema name

    // Get the primary field value (e.g., name) of the parent record
    var parentRecordName = "";

    // Set the Entity Name choice
    switch (parentRecordType) {
        case "account":
            parentRecordName = formContext.getAttribute("name") ? formContext.getAttribute("name").getValue() : null;
            break;
        case "msdyn_functionallocation":
            parentRecordName = formContext.getAttribute("msdyn_name") ? formContext.getAttribute("msdyn_name").getValue() : null;
            break;
        case "ovs_operationtype":
            parentRecordName = formContext.getAttribute("ovs_name") ? formContext.getAttribute("ovs_name").getValue() : null;
            break;
        case "ovs_operation":
            parentRecordName = formContext.getAttribute("ovs_name") ? formContext.getAttribute("ovs_name").getValue() : null;
            break;
        case "msdyn_incidenttype":
            parentRecordName = formContext.getAttribute("msdyn_name") ? formContext.getAttribute("msdyn_name").getValue() : null;
            break;
        case "ts_programarea":
            parentRecordName = formContext.getAttribute("ts_name") ? formContext.getAttribute("ts_name").getValue() : null;
            break;
        default:
            console.log("Unknown Parent Record Type, we need to know what table we are working with for the many-to-many relationship with ts_entityrisk.");
            parentRecordName = "";
            break;
    }

    // Validate that all required values are available
    if (!parentRecordId || !parentRecordType || !parentRecordName) {
        console.error("Parent record information is missing or incomplete.  We need to know the Record ID (guid), what table we are working with, and also the name of the record.");
        console.error("parentrecordid: " + parentRecordId);
        console.error("parentrecordtype: " + parentRecordType);
        console.error("parentrecordname: " + parentRecordName);
        return;
    }

    console.log("parentRecordId: " + parentRecordId);
    console.log("parentRecordType: " + parentRecordType);
    console.log("parentRecordName: " + parentRecordName);

    // Define the related entity logical name
    var relatedEntityName = "ts_entityrisk"; 

    // Parameters to pre-fill the lookup field with the parent record
    var entityFormOptions = {
        entityName: relatedEntityName, // The related entity you want to open
        useQuickCreateForm: false,
        formId: "a761fd60-e7d9-497e-8a8f-974fe6460bb9"
    };

    // Define relationship parameters for the N:N relationship
    var formParameters = {
        "parentrecordid": parentRecordId,
        "parentrecordtype": parentRecordType,
        "parentrecordname": parentRecordName
    };

    // Open the "Add New" form for the related entity
    Xrm.Navigation.openForm(entityFormOptions, formParameters)
        .then(function (result) {
            console.log("Form opened successfully.");
        })
        .catch(function (error) {
            console.error("Error opening the form: ", error);
        });
}
