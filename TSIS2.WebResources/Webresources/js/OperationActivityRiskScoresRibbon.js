function ReCalculateRiskScore(PrimaryControl) {
    console.log("Entering ReCalculateRiskScore()");

    // Make sure PrimaryControl is not null
    if (PrimaryControl == null) {
        console.error("ReCalculateRiskScore() - The PrimaryControl parameter is null.");
        return;
    }
    else
    {
        console.log("ReCalculateRiskScore() - Parameters are valid.");

        // Get the id of the record
        var formContext = PrimaryControl;
        var recordId = formContext.data.entity.getId(); // This gets the GUID
        var entityName = formContext.data.entity.getEntityName();

        // If the recordId is not valid, log an error and return
        if (!recordId || recordId === "") {
            console.error("ReCalculateRiskScore() - recordId is not valid.");
            return;
        }
        else
        {
            recordId = recordId.replace("{", "").replace("}", ""); // Clean the GUID format

            // update the ts_RiskScoreRibbonTrigger field with the current date and time
            Xrm.WebApi.updateRecord(entityName, recordId, { "ts_riskscoreribbontrigger": new Date().toISOString() })
            .then(function success(result) {
                console.log("Risk score trigger updated successfully. Record ID: " + result.id);
            }, function error(error) {
                console.error("Error updating risk score trigger: " + error.message);
            });
        }
    }
}