async function updateOperationsFlow() {
    const lang = parent.Xrm.Utility.getGlobalContext().userSettings.languageId;
    let confirmStrings;
    if (lang == 1033) {
        confirmStrings = {
            text: "The Risk Threshold of all Operations will be updated. Do you wish to proceed?",
            title: "Update Operation Risk Thresholds"
        };
    } else {
        confirmStrings = {
            text: "The Risk Threshold of all Operations will be updated. Do you wish to proceed? (FR)",
            title: "Update Operation Risk Thresholds (FR)"
        };
    }
    const confirmOptions = { height: 200, width: 450 };
    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(async function (success) {
        if (success.confirmed) {
            var url = await GetEnvironmentVariableValue("ts_UpdateOperationsRiskThresholdFlowUrl");
            var flowKey = await GetEnvironmentVariableValue("ts_SharePointFlowKey");

            // Check if url is valid before proceeding
            if (!url) {
                console.error("Flow URL is not available");
                return;
            }

            const data = {};

            try {
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "FlowKey": flowKey
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    console.log('Success: Update Operations Risk Threshold flow triggered');
                } else {
                    console.error('Error:', response.statusText);
                }
            } catch (error) {
                console.error('Error sending request to flow:', error);
                return;
            }
        }
    });
}

async function GetEnvironmentVariableValue(name) {
    let results = await Xrm.WebApi.retrieveMultipleRecords("environmentvariabledefinition", `?$filter=schemaname eq '${name}'&$select=environmentvariabledefinitionid&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)`);

    if (!results || !results.entities || results.entities.length < 1) return null;
    let variable = results.entities[0];
    if (!variable.environmentvariabledefinition_environmentvariablevalue || variable.environmentvariabledefinition_environmentvariablevalue.length < 1) return null;

    return variable.environmentvariabledefinition_environmentvariablevalue[0].value;
}
