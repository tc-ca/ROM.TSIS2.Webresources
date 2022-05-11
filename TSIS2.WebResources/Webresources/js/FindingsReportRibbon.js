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


    var params = {
        "FindingsReportId": findingsReportId,
        "SensitivityLevelEn": sensitivityLabelEn,
        "SensitivityLevelFr": sensitivityLabelFr,
        "language": language
    }

    var url = await GetEnvironmentVariableValue("ts_FindingsReportFlowURL");
    var req = new XMLHttpRequest();
    req.open("POST", url, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(params));
    var alertStrings = { confirmButtonLabel: "OK", text: "The Report PDF is being generated and will be attached to the Case momentarily.", title: "Report is being generated" };
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