async function setSelectedNonOperational(operationActivityGuids, selectedControl) {
    let data =
    {
        "ts_operationalstatus": 717750001,
    }
    Xrm.Utility.showProgressIndicator();
    for (let operationActivityGuid of operationActivityGuids) {
        await Xrm.WebApi.updateRecord("ts_operationactivity", operationActivityGuid, data);
    }
    setTimeout(selectedControl.refresh(), 1000);
    Xrm.Utility.closeProgressIndicator();
}

async function setSelectedOperational(operationActivityGuids, selectedControl) {
    let data =
    {
        "ts_operationalstatus": 717750000,
    }
    Xrm.Utility.showProgressIndicator();
    for (let operationActivityGuid of operationActivityGuids) {
        await Xrm.WebApi.updateRecord("ts_operationactivity", operationActivityGuid, data);
    }
    setTimeout(selectedControl.refresh(), 1000);
    Xrm.Utility.closeProgressIndicator();
}