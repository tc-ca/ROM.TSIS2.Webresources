let lang = parent.Xrm.Utility.getGlobalContext().userSettings.languageId;

let missingFieldsInspectionGenerationTitleLocalized;
let missingFieldsInspectionGenerationTextLocalized;
let inspectionGeneratedTextLocalized;
let inspectionGeneratedTitleLocalized;
let inspectionGenerationProgressText;

if (lang == 1036) {
    missingFieldsInspectionGenerationTitleLocalized = "Champs manquants";
    missingFieldsInspectionGenerationTextLocalized = "Un des champs suivant est manquant: Intervenant, Site";
    inspectionGeneratedTextLocalized = "Ordre de travail créé avec succès";
    inspectionGeneratedTitleLocalized = "Inspection";
    inspectionGenerationProgressText = "Veuillez attendre pendant que l'ordre de travail se fasse créer."

}else {
    missingFieldsInspectionGenerationTitleLocalized = "Missing fields";
    missingFieldsInspectionGenerationTextLocalized = "One of the following fields is not set: Reporting Company, Site";
    inspectionGeneratedTextLocalized = "Work order created successfully";
    inspectionGeneratedTitleLocalized = "Inspection";
    inspectionGenerationProgressText = "Please wait while the Work Order is being created.";
}

function generateInspection(primaryControl) {
    let stakeholder = primaryControl.getAttribute("ts_stakeholder").getValue();
    let site = primaryControl.getAttribute("ts_site").getValue();

    if(!stakeholder || !site){
        showAlertDialog(missingFieldsInspectionGenerationTextLocalized, missingFieldsInspectionGenerationTitleLocalized);
        return;
    }

    const securityIncidentId = primaryControl.data.entity.getId().slice(1, -1);

    let data =
    {
        "msdyn_serviceaccount@odata.bind": `/accounts(${(stakeholder[0].id).slice(1, -1)})`,
        "ts_Site@odata.bind": `/msdyn_functionallocations(${(site[0].id).slice(1, -1)})`,
        "ts_SecurityIncident@odata.bind": `/ts_securityincidents(${securityIncidentId})`,
    }

    Xrm.Utility.showProgressIndicator(inspectionGenerationProgressText);

    //Create new inspection linked to current Security Inspection
    Xrm.WebApi.createRecord("msdyn_workorder", data).then(
        function success(result) {
            Xrm.Utility.closeProgressIndicator();
            showAlertDialog(inspectionGeneratedTextLocalized, inspectionGeneratedTitleLocalized)
            primaryControl.ui.tabs.get("tab_3").setFocus();
            primaryControl.ui.controls.get("grid_workorder").refresh();
        },
        function (error){
            Xrm.Utility.closeProgressIndicator();
        }
    )
}

function showAlertDialog(text, title){
    let alertStrings = { confirmButtonLabel: "OK", text: text, title: title };
    let alertOptions = { height: 200, width: 300 };
    Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
}