let lang = parent.Xrm.Utility.getGlobalContext().userSettings.languageId;

let scheduleGeneratedTextLocalized;
let scheduleGeneratedTitleLocalized;
let scheduleGenerationProgressText;

if (lang == 1036) {
    scheduleGeneratedTextLocalized = "Schedule créé avec succès";
    scheduleGeneratedTitleLocalized = "Schedule";
    scheduleGenerationProgressText = "Veuillez attendre pendant que Schedule se fasse créer."

} else {
    scheduleGeneratedTextLocalized = "Schedule created successfully";
    scheduleGeneratedTitleLocalized = "Schedule";
    scheduleGenerationProgressText = "Please wait while the Schedule is being created.";
}

async function generateSchedule(primaryControl) {
    const dutyInspectorScheduleId = primaryControl.data.entity.getId().slice(1, -1);
    let scheduleStartDate = primaryControl.getAttribute("ts_startdate").getValue();
    let region = primaryControl.getAttribute("ts_region").getValue();
    let fiscalYear = primaryControl.getAttribute("ts_fiscalyear").getValue();
    let fiscalYearId = fiscalYear[0].id.slice(1, -1);
    let regionId = region[0].id.slice(1, -1);
    let scheduleEndDate;
    let regionName, fiscalYearName;

    //If record is not saved
    if (dutyInspectorScheduleId == "") {
        showAlertDialog("Please, save the record first.", "Warning");
        return;
    }

    //If there is already schedule for this region and fiscal year
    const isDuplicate = await checkDuplicateDutyInspector(regionId, fiscalYearId, dutyInspectorScheduleId);
    if (isDuplicate) {
        showAlertDialog("The schedule for this region and this fiscal year already exists.", "Warning");
        return;
    }

    await Xrm.WebApi.retrieveRecord("tc_tcfiscalyear", fiscalYearId, "?$select=tc_fiscalend").then(
        function success(result) {
            scheduleEndDate = new Date(result.tc_fiscalend);

        });

    // Fetch region name
    await Xrm.WebApi.retrieveRecord("territory", regionId, "?$select=name").then(
        function success(result) {
            regionName = result.name;
        }
    );

    // Fetch fiscal year name
    await Xrm.WebApi.retrieveRecord("tc_tcfiscalyear", fiscalYearId, "?$select=tc_name").then(
        function success(result) {
            fiscalYearName = result.tc_name;
        }
    );

    let current = new Date(scheduleStartDate);
    Xrm.Utility.showProgressIndicator(scheduleGenerationProgressText);

    while (current <= scheduleEndDate) {
        const weekStart = new Date(current);
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);
        let data =
        {
            "ts_startdate": weekStart.toISOString(),
            "ts_enddate": weekEnd.toISOString(),
            "ts_DutyInspectorSchedule@odata.bind": `/ts_dutyinspectorschedules(${dutyInspectorScheduleId})`,
            "ts_name": regionName + " - " + fiscalYearName
        }
        //Create new Duty Inspectors linked to current Duty Inspector Schedule
        Xrm.WebApi.createRecord("ts_dutyinspectors", data).then(
            function success(result) {

            },
            function (error) {
                console.error("Error creating record:", error.message);
                Xrm.Utility.closeProgressIndicator();
            }
        );

        current.setDate(current.getDate() + 7);
    }
    Xrm.Utility.closeProgressIndicator();
    primaryControl.ui.controls.get("grid_duty_inspectors").refresh();
    showAlertDialog(scheduleGeneratedTextLocalized, scheduleGeneratedTitleLocalized);
}

function showAlertDialog(text, title) {
    let alertStrings = { confirmButtonLabel: "OK", text: text, title: title };
    let alertOptions = { height: 200, width: 300 };
    Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
}

async function checkDuplicateDutyInspector(regionId, fiscalYearId, dutyInspectorScheduleId) {
    let duplicate = false;
    let dutyInspectorScheduleFetch = [
        "<fetch>",
        "  <entity name='ts_dutyinspectors'>",
        "    <filter type='and'>",
        "        <condition attribute='ts_dutyinspectorschedule' operator='eq' value='", dutyInspectorScheduleId, "'/>",
        "    </filter>",
        "  </entity>",
        "</fetch>"
    ].join("");
    dutyInspectorScheduleFetch = "?fetchXml=" + encodeURIComponent(dutyInspectorScheduleFetch);

    await Xrm.WebApi.retrieveMultipleRecords("ts_dutyinspectors", dutyInspectorScheduleFetch).then(
        function success(result) {
            if (result.entities.length > 0)
                duplicate = true;
        });
    return duplicate;
}
