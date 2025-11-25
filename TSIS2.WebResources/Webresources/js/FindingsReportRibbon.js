async function callFlow(primaryControl) {
    await primaryControl.data.save();
    const findingsReportId = primaryControl.data.entity.getId().slice(1, -1); //Remove curly braces.
    const sensitivityLabelValue = primaryControl.getAttribute("ts_sensitivitylevel").getValue();
    const language = primaryControl.getAttribute("ts_language").getValue();

    let sensitivityLabelEn = "";
    let sensitivityLabelFr = "";

    if (sensitivityLabelValue == 717750000) {
        sensitivityLabelEn = "UNCLASSIFIED";
        sensitivityLabelFr = "NON CLASSIFIÉ"
    } else if (sensitivityLabelValue == 717750001) {
        sensitivityLabelEn = "PROTECTED B";
        sensitivityLabelFr = "PROTÉGÉ B";
    }
    let sensitivityLevel = (language == 717750000) ? sensitivityLabelEn : sensitivityLabelFr;

    let userLanguage = Xrm.Utility.getGlobalContext().userSettings.languageId;

    let flowRunningDialogTitle = (userLanguage == 1036) ? "Le rapport est en cours de génération" : "Report is being generated";
    let flowRunningDialogText = (userLanguage == 1036) ? "Le rapport PDF est en cours de génération et sera momentanément joint au dossier." : "The Report PDF is being generated and will be attached to the Case momentarily.";

    var url = await GetEnvironmentVariableValue("ts_FindingsReportFlowURL");
    var flowKey = await GetEnvironmentVariableValue("ts_SharePointFlowKey");

    // Check if url is valid before proceeding
    if (!url) {
        console.error("Flow URL is not available");
        return;
    }

    const data = {
        FindingsReportId: findingsReportId,
        SensitivityLevel: sensitivityLevel,
        UserLanguage: userLanguage
    };

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
            console.log('Success: Report generation flow triggered');
        } else {
            console.error('Error:', response.statusText);
        }
    } catch (error) {
        console.error('Error sending request to flow:', error);
        return;
    }

    var alertStrings = { confirmButtonLabel: "OK", text: flowRunningDialogText, title: flowRunningDialogTitle };
    var alertOptions = { height: 120, width: 260 };
    Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(
        function (success) {
            primaryControl.ui.close();
        },
        function (error) {
            console.log(error.message);
        }
    );
}

async function GetEnvironmentVariableValue(name) {
    let results = await Xrm.WebApi.retrieveMultipleRecords("environmentvariabledefinition", `?$filter=schemaname eq '${name}'&$select=environmentvariabledefinitionid&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)`);

    if (!results || !results.entities || results.entities.length < 1) return null;
    let variable = results.entities[0];
    if (!variable.environmentvariabledefinition_environmentvariablevalue || variable.environmentvariabledefinition_environmentvariablevalue.length < 1) return null;

    return variable.environmentvariabledefinition_environmentvariablevalue[0].value;
}
