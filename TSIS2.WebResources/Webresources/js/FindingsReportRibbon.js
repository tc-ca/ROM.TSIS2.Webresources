function callFlow(primaryControl) {
    const findingsReportId = primaryControl.data.entity.getId().slice(1, -1); //Remove curly braces.
    const Case = primaryControl.getAttribute("ts_case").getValue();
    const reportName = primaryControl.getAttribute("ts_name").getValue();

    var params = {
        "FindingsReportId": findingsReportId
    }

    var url = "https://prod-26.canadacentral.logic.azure.com:443/workflows/93fd254f93b04c16998cd52dcbb22d44/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=7kcQ2SpCBVxRAYHLWagu7X0pvWEBpaXfXdi1IW6HGL8";
    var req = new XMLHttpRequest();
    req.open("POST", url, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(params));
    Xrm.Utility.alertDialog("The Report PDF is being generated and will be attached to the Case momentarily");
}