﻿var lang = parent.Xrm.Utility.getGlobalContext().userSettings.languageId;

var markCompleteValidationTextLocalized;
var markCompleteValidationTitleLocalized;
var markCompleteConfirmationTextLocalized;
var markCompleteConfirmationTitleLocalized;
var missingFinalEnforcementActionTitleLocalized;
var missingFinalEnforcementActionTextLocalized;
var missingFinalEnforcementActionForActionCreateTextLocalized;

if (lang == 1036) {
    markCompleteValidationTextLocalized = "Tous les champs indiqués par un '+' bleu doivent être complétés avant que la constatation puissent être marqué comme terminé.";
    markCompleteValidationTitleLocalized = "Formulaire Incomplet";
    missingFinalEnforcementActionTitleLocalized = "Mesure d'application finale manquante";
    missingFinalEnforcementActionTextLocalized = "Un ou plusieurs enregistrements de constatations sélectionnés n'ont pas de mesure d'application finale. Toutes les constatations sélectionnées doivent avoir une mesure d'application finale pour créer un rapport de constatations."
    missingFinalEnforcementActionForActionCreateTextLocalized = "Un ou plusieurs enregistrements de constatations sélectionnés n'ont pas de mesure d'application finale. Toutes les constatations sélectionnées doivent avoir une mesure d'application finale."
    createAcionFromObservationTitleLocalized = "Erreur de validation";
    createAcionFromObservationTextLocalized = "Il n'est pas possible de créer des mesures d'exécution pour les observations.";
} else {
    markCompleteValidationTextLocalized = "All fields denoted by blue '+' must be completed in order to Mark Complete.";
    markCompleteValidationTitleLocalized = "Form Incomplete";
    missingFinalEnforcementActionTitleLocalized = "Missing Final Enforcement Action"
    missingFinalEnforcementActionTextLocalized = "One of more selected Finding records do not have a Final Enforcement Action. All selected findings must have a Final Enforcement Action to create a Findings Report.";
    missingFinalEnforcementActionForActionCreateTextLocalized = "One of more selected Finding records do not have a Final Enforcement Action. All selected findings must have a Final Enforcement Action.";
    createAcionFromObservationTitleLocalized = "Validation Error";
    createAcionFromObservationTextLocalized = "Enforcement actions cannot be created for observations.";
}

let issoOperationTypeGuids = ["b27e5003-c751-eb11-a812-000d3af3ac0d", "c97a1a12-d8eb-eb11-bacb-000d3af4fbec", "21ca416a-431a-ec11-b6e7-000d3a09d067", "3b261029-c751-eb11-a812-000d3af3ac0d", "d883b39a-c751-eb11-a812-000d3af3ac0d", "da56fea1-c751-eb11-a812-000d3af3ac0d", "199e31ae-c751-eb11-a812-000d3af3ac0d"]

//Action for mscrm.OpenRecordItem overridden command. Opens Finding forms as a modal.
function openRecord(recordId) {
    let formId = "d8af1d58-3786-4ab4-9a35-3a1b85946c12"; //Information Main form
    //Retrieve selected finding record
    Xrm.WebApi.retrieveRecord("ovs_finding", recordId).then(
        function (result) {
            var pageInput = {
                pageType: "entityrecord",
                entityName: "ovs_finding",
                entityId: recordId
            };
            var navigationOptions = {
                target: 2,
                height: {
                    value: 100, unit: "%"
                },
                width: {
                    value: 80, unit: "%"
                },
                position: 1
            };
            //Open finding record
            Xrm.Navigation.navigateTo(pageInput, navigationOptions).then(
                function success() {
                    // Run code on success
                },
                function error() {
                    // Handle errors
                }
            );

        },
        function (error) {
            //If anything goes wrong log the error
            console.log(error);

            //and open "by default" form
            Xrm.Navigation.openForm({
                entityName: "ovs_finding",
                entityId: recordId,
                formId: formId
            });
        });
}

function markComplete(primaryControl) {
    var finalEnforcementAction = primaryControl.getAttribute("ts_finalenforcementaction").getValue();
    var issueaddressedonsite = primaryControl.getAttribute("ts_issueaddressedonsite").getValue();
    var nonComplianceTimeframe = primaryControl.getAttribute("ts_noncompliancetimeframe").getValue();

    var issueaddressedonsiteVisibility = primaryControl.getControl("ts_issueaddressedonsite").getVisible();

    let nonComplianceTimeframeCheck;

    if (issueaddressedonsiteVisibility) {
        nonComplianceTimeframeCheck = (!(issueaddressedonsite == 717750001 && nonComplianceTimeframe == null))
    }
    else {
        nonComplianceTimeframeCheck = nonComplianceTimeframe !== null
    }

    if (finalEnforcementAction != null && (!issueaddressedonsiteVisibility || issueaddressedonsite != null) && nonComplianceTimeframeCheck) {
        primaryControl.getAttribute("statuscode").setValue(717750002); //Complete
        primaryControl.data.save().then(
            function success(result) {
                primaryControl.ui.close();
            });
    }
    else {
        var alertStrings = {
            text: markCompleteValidationTextLocalized,
            title: markCompleteValidationTitleLocalized
        };
        var alertOptions = { height: 200, width: 450 };
        Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
    }
}

function unlockNCAT(primaryControl) {
    //Set status to New
    primaryControl.getAttribute("statuscode").setValue(1);

    //NCAT
    primaryControl.getControl("ts_ncatactualorpotentialharm").setDisabled(false);
    primaryControl.getControl("ts_ncatintentionality").setDisabled(false);
    primaryControl.getControl("ts_ncatcompliancehistory").setDisabled(false);
    primaryControl.getControl("ts_ncateconomicbenefit").setDisabled(false);
    primaryControl.getControl("ts_ncatmitigationofnoncompliantbehaviors").setDisabled(false);
    primaryControl.getControl("ts_ncatcooperationwithinspectionorinvestigat").setDisabled(false);
    primaryControl.getControl("ts_ncatdetectionofnoncompliances").setDisabled(false);
    primaryControl.getControl("ts_acceptncatrecommendation").setDisabled(false);
    primaryControl.getControl("ts_acceptncatrecommendation").setDisabled(false);
    primaryControl.getControl("ts_issueaddressedonsite").setDisabled(false);
    primaryControl.getControl("ts_noncompliancetimeframe").setDisabled(false);
    primaryControl.getControl("ts_notetostakeholder").setDisabled(false);
    primaryControl.getControl("ts_ncatdetailstosupport").setDisabled(false);

    primaryControl.getAttribute("ts_acceptncatrecommendation").setValue(null);
    primaryControl.getAttribute("ts_finalenforcementaction").setValue(null);

    NCATHideProposedSection(primaryControl);
}

function unlockRATE(primaryControl) {
    //Set status to New
    primaryControl.getAttribute("statuscode").setValue(1);

    //RATE
    primaryControl.getControl("ts_ratespecificcompliancehistory").setDisabled(false);
    primaryControl.getControl("ts_rategeneralcompliancehistory").setDisabled(false);
    primaryControl.getControl("ts_ratespecificenforcementhistory").setDisabled(false);
    primaryControl.getControl("ts_rateactualorpotentialharm").setDisabled(false);
    primaryControl.getControl("ts_rateintentionality").setDisabled(false);
    primaryControl.getControl("ts_rateeconomicbenefit").setDisabled(false);
    primaryControl.getControl("ts_rateresponsibility").setDisabled(false);
    primaryControl.getControl("ts_ratemitigationofnoncompliantbehaviors").setDisabled(false);
    primaryControl.getControl("ts_ratepreventingrecurrence").setDisabled(false);
    primaryControl.getControl("ts_ratecooperationwithinspectionorinvestigat").setDisabled(false);
    primaryControl.getControl("ts_acceptraterecommendation").setDisabled(false);
    primaryControl.getControl("ts_issueaddressedonsite").setDisabled(false);
    primaryControl.getControl("ts_noncompliancetimeframe").setDisabled(false);
    primaryControl.getControl("ts_notetostakeholder").setDisabled(false);

    primaryControl.getAttribute("ts_acceptraterecommendation").setValue(null);
    primaryControl.getAttribute("ts_finalenforcementaction").setValue(null);

    RATEHideProposedSection(primaryControl);
}

function isSystemAdministrator() {
    var roles = Xrm.Utility.getGlobalContext().userSettings.roles;
    var enable = false;
    roles.forEach(function (item) {
        if (item.name == "System Administrator") enable = true;
    });
    return enable;
}

function acceptNCATRecommendationIsNotNull(primaryControl) {
    return (primaryControl.getAttribute("ts_acceptncatrecommendation").getValue() != null)
}

function acceptRATERecommendationIsNotNull(primaryControl) {
    return (primaryControl.getAttribute("ts_acceptraterecommendation").getValue() != null)
}

//Clears, Hides, and sets Required level to None for every field in the NCAT Proposed Section
function NCATHideProposedSection(primaryControl) {
    let formContext = primaryControl;

    formContext.getAttribute("ts_ncatapprovingteam").setValue(null);
    formContext.getAttribute("ts_ncatapprovingteam").setRequiredLevel("none");
    formContext.getControl("ts_ncatapprovingteam").setVisible(false);

    formContext.getAttribute("ts_ncatmanager").setValue(null);
    formContext.getAttribute("ts_ncatmanager").setRequiredLevel("none");
    formContext.getControl("ts_ncatmanager").setVisible(false);

    formContext.getAttribute("ts_ncatinspectorrecommendation").setValue(null);
    formContext.getAttribute("ts_ncatinspectorrecommendation").setRequiredLevel("none");
    formContext.getControl("ts_ncatinspectorrecommendation").setVisible(false);
    formContext.getControl("ts_ncatinspectorrecommendation").clearNotification();

    formContext.getAttribute("ts_ncatenforcementjustification").setValue(null);
    formContext.getAttribute("ts_ncatenforcementjustification").setRequiredLevel("none");
    formContext.getControl("ts_ncatenforcementjustification").setVisible(false);

    NCATHideManagerReviewSection(primaryControl);
}

//Clears, Hides, and sets Required level to None for every field in the NCAT Manager Review Section
function NCATHideManagerReviewSection(primaryControl) {
    let formContext = primaryControl;


    formContext.getAttribute("ts_ncatmanagerdecision").setRequiredLevel("none");
    formContext.getAttribute("ts_ncatmanagerdecision").setValue(null);
    formContext.getControl("ts_ncatmanagerdecision").setVisible(false);

    formContext.getAttribute("ts_ncatmanageralternativerecommendation").setValue(null);
    formContext.getControl("ts_ncatmanageralternativerecommendation").clearNotification();
    formContext.getControl("ts_ncatmanageralternativerecommendation").setVisible(false);

    formContext.getAttribute("ts_ncatmanagerenforcementjustification").setValue(null);
    formContext.getAttribute("ts_ncatmanagerenforcementjustification").setRequiredLevel("none");
    formContext.getControl("ts_ncatmanagerenforcementjustification").setDisabled(true);
    formContext.getControl("ts_ncatmanagerenforcementjustification").setVisible(false);
}

//Clears, Hides, and sets Required level to None for every field in the RATE Proposed Section
function RATEHideProposedSection(primaryControl) {
    let formContext = primaryControl;

    formContext.getAttribute("ts_ratemanager").setValue(null);
    formContext.getAttribute("ts_ratemanager").setRequiredLevel("none");
    formContext.getControl("ts_ratemanager").setVisible(false);

    formContext.getAttribute("ts_rateinspectorrecommendation").setValue(null);
    formContext.getAttribute("ts_rateinspectorrecommendation").setRequiredLevel("none");
    formContext.getControl("ts_rateinspectorrecommendation").setVisible(false);
    formContext.getControl("ts_rateinspectorrecommendation").clearNotification();

    formContext.getAttribute("ts_rateenforcementjustification").setValue(null);
    formContext.getAttribute("ts_rateenforcementjustification").setRequiredLevel("none");
    formContext.getControl("ts_rateenforcementjustification").setVisible(false);

    RATEHideManagerReviewSection(primaryControl);
}

//Clears, Hides, and sets Required level to None for every field in the RATE Manager Review Section
function RATEHideManagerReviewSection(primaryControl) {
    let formContext = primaryControl;

    formContext.getAttribute("ts_ratemanagerdecision").setRequiredLevel("none");
    formContext.getAttribute("ts_ratemanagerdecision").setValue(null);
    formContext.getControl("ts_ratemanagerdecision").setVisible(false);

    formContext.getAttribute("ts_ratemanageralternativerecommendation").setValue(null);
    formContext.getControl("ts_ratemanageralternativerecommendation").clearNotification();
    formContext.getControl("ts_ratemanageralternativerecommendation").setVisible(false);

    formContext.getAttribute("ts_ratemanagerenforcementjustification").setValue(null);
    formContext.getAttribute("ts_ratemanagerenforcementjustification").setRequiredLevel("none");
    formContext.getControl("ts_ratemanagerenforcementjustification").setDisabled(true);
    formContext.getControl("ts_ratemanagerenforcementjustification").setVisible(false);
}

async function isAvSecBusinessUnit() {
    let userId = Xrm.Utility.getGlobalContext().userSettings.userId;
    let currentUserBusinessUnitFetchXML = [
        "<fetch top='50'>",
        "  <entity name='businessunit'>",
        "    <attribute name='name' />",
        "    <attribute name='businessunitid' />",
        "    <link-entity name='systemuser' from='businessunitid' to='businessunitid' link-type='inner' alias='ab'>>",
        "      <filter>",
        "        <condition attribute='systemuserid' operator='eq' value='", userId, "'/>",
        "      </filter>",
        "    </link-entity>",
        "  </entity>",
        "</fetch>",
    ].join("");
    currentUserBusinessUnitFetchXML = "?fetchXml=" + encodeURIComponent(currentUserBusinessUnitFetchXML);
    let userBusinessUnitName = await Xrm.WebApi.retrieveMultipleRecords("businessunit", currentUserBusinessUnitFetchXML);
    return userBusinessUnitName.entities[0].name.startsWith("Aviation");
}

async function isISSOBusinessUnit() {
    let userId = Xrm.Utility.getGlobalContext().userSettings.userId;
    let currentUserBusinessUnitFetchXML = [
        "<fetch top='50'>",
        "  <entity name='businessunit'>",
        "    <attribute name='name' />",
        "    <attribute name='businessunitid' />",
        "    <link-entity name='systemuser' from='businessunitid' to='businessunitid'>",
        "      <filter>",
        "        <condition attribute='systemuserid' operator='eq' value='", userId, "'/>",
        "      </filter>",
        "    </link-entity>",
        "  </entity>",
        "</fetch>",
    ].join("");
    currentUserBusinessUnitFetchXML = "?fetchXml=" + encodeURIComponent(currentUserBusinessUnitFetchXML);
    let userBusinessUnitName = await Xrm.WebApi.retrieveMultipleRecords("businessunit", currentUserBusinessUnitFetchXML);
    return userBusinessUnitName.entities[0].name.startsWith("Intermodal");
}

async function isTCBusinessUnit() {
    let userId = Xrm.Utility.getGlobalContext().userSettings.userId;
    let currentUserBusinessUnitFetchXML = [
        "<fetch top='50'>",
        "  <entity name='businessunit'>",
        "    <attribute name='name' />",
        "    <attribute name='businessunitid' />",
        "    <link-entity name='systemuser' from='businessunitid' to='businessunitid'>",
        "      <filter>",
        "        <condition attribute='systemuserid' operator='eq' value='", userId, "'/>",
        "      </filter>",
        "    </link-entity>",
        "  </entity>",
        "</fetch>",
    ].join("");
    currentUserBusinessUnitFetchXML = "?fetchXml=" + encodeURIComponent(currentUserBusinessUnitFetchXML);
    let userBusinessUnitName = await Xrm.WebApi.retrieveMultipleRecords("businessunit", currentUserBusinessUnitFetchXML);
    return userBusinessUnitName.entities[0].name.startsWith("Transport");
}

function FindingsReport(findingGUIDs, primaryControl) {
    const gridContext = primaryControl.getControl("subgrid_findings");
    const findingRows = gridContext.getGrid().getSelectedRows();

    //Confirm all selected findings have a final enforcement action
    let { allFindingsHaveFinalEnforcementAction, aFindingIsProtectedB, aFindingIsObservation } = checkIfAllFindingsHaveEnforcementAction(findingRows);

    //If a finding does not have a final enforcement action, open an alert dialog
    if (!allFindingsHaveFinalEnforcementAction) {
        showAlertDialog(missingFinalEnforcementActionTextLocalized, missingFinalEnforcementActionTitleLocalized);
        return;
    }

    const caseId = primaryControl.data.entity.getId().slice(1, -1);
    //If a finding is Protected B, set the findings report sensitivity level to Protected B. Else Unclassified.
    const sensitivityLevel = (aFindingIsProtectedB) ? 717750001 : 717750000;

    let CaseNumber = primaryControl.getAttribute("ticketnumber").getValue();

    //Create new findings report record
    var data =
    {
        "ts_name": CaseNumber + " Findings Report",
        "ts_Case@odata.bind": `/incidents(${caseId})`,
        "ts_sensitivitylevel": sensitivityLevel
    }
    Xrm.WebApi.createRecord("ts_findingsreport", data).then(

        function (newFindingsReport) {
            let relatedFindings = [];
            for (let findingGUID of findingGUIDs) {
                relatedFindings.push({
                    entityType: "ovs_finding",
                    id: findingGUID
                });
            }
            const manyToManyAssociateRequest = {
                getMetadata: () => ({
                    boundParameter: null,
                    parameterTypes: {},
                    operationType: 2,
                    operationName: "Associate"
                }),

                relationship: "ts_FindingsReport_ovs_Finding_ovs_Finding",

                target: {
                    entityType: "ts_findingsreport",
                    id: newFindingsReport.id
                },

                relatedEntities: relatedFindings
            }

            Xrm.WebApi.online.execute(manyToManyAssociateRequest).then(
                (success) => {
                    console.log("Success", success);

                    var pageInput = {
                        pageType: "entityrecord",
                        entityName: "ts_findingsreport",
                        entityId: newFindingsReport.id
                    };
                    var navigationOptions = {
                        target: 2,
                        height: {
                            value: 100, unit: "%"
                        },
                        width: {
                            value: 80, unit: "%"
                        },
                        position: 1
                    };
                    //Open finding record
                    Xrm.Navigation.navigateTo(pageInput, navigationOptions).then(
                        function success() {
                            // Run code on success
                        },
                        function error() {
                            // Handle errors
                        }
                    );
                },
                (error) => {
                    console.log("Error", error);
                }
            )
        },
        function (error) {
            console.log(error.message);
        });
}

function checkIfAllFindingsHaveEnforcementAction(findingRows) {
    let allFindingsHaveFinalEnforcementAction = true;
    let aFindingIsProtectedB = false;
    let aFindingIsObservation = false;
    findingRows.forEach(function (findingRow) {
        const findingFinalEnforcementAction = findingRow.getAttribute("ts_finalenforcementaction").getValue();
        const findingSensitivityLevel = findingRow.getAttribute("ts_sensitivitylevel").getValue();
        const findingType = findingRow.getAttribute("ts_findingtype").getValue();

        if (findingFinalEnforcementAction == null) {
            allFindingsHaveFinalEnforcementAction = false;
        }
        if (findingSensitivityLevel == 717750001) { //Protected B
            aFindingIsProtectedB = true;
        }
        if (findingType == 717750001) { // Observation 
            aFindingIsObservation  = true;
        }
    });
    return { allFindingsHaveFinalEnforcementAction, aFindingIsProtectedB, aFindingIsObservation };
}

function getHighestEnforcementActionFromFindings(findingRows) {
    let highestFinalEnforcementAction = findingRows.get(0).getAttribute("ts_finalenforcementaction").getValue();
    findingRows.forEach(function (findingRow) {
        const findingFinalEnforcementAction = findingRow.getAttribute("ts_finalenforcementaction").getValue();
        if (findingFinalEnforcementAction > highestFinalEnforcementAction) {
            highestFinalEnforcementAction = findingFinalEnforcementAction;
        }
    });
    return highestFinalEnforcementAction;
}

function getTypeOfEnforcementActionValueInEntity(highestEnforcementAction) {
    switch (highestEnforcementAction) {
        case 717750001 /* VerbalWarning */:
            return 717750000 /* VerbalWarning */;
        case 717750002 /* WrittenWarning */:
            return 717750001 /* WrittenWarning */;
        case 717750003 /* AMPLevel120ofMaximum */:
        case 717750004 /* AMPLevel250ofMaximum */:
        case 717750005 /* AMPLevel3100ofMaximum */:
            return 717750005 /* ReferraltoREU */;
        case 717750006 /* SuspensionofCAD */:
            return 717750003 /* ReferraltoREU */;
        case 717750007 /* CancellationofCAD */:
            return 717750004 /* ReferraltoREU */;
        case 717750008 /* ReferraltoREU */:
            return 717750002 /* ReferraltoREU */;
        case 000000000 /* TBD: what enforcement action in finding make the Enforcement Action type to penal process */:
            return 717750006 /* Penal Process */;
        default:
            return 717750006;
    }
}

function showAlertDialog(text, title) {
    var alertStrings = { confirmButtonLabel: "OK", text: text, title: title };
    var alertOptions = { height: 200, width: 300 };
    Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
}

function AssignCorrectiveAction(findingGUIDs, primaryControl) {
    const enforcementActionId = primaryControl.data.entity.getId().slice(1, -1);

    var correctiveActionFormOptions = {};
    correctiveActionFormOptions["entityName"] = "ts_correctiveaction";
    correctiveActionFormOptions["formId"] = "46ae0d3b-7957-4541-9be6-707e2b0fd741";
    correctiveActionFormOptions["useQuickCreateForm"] = true;

    // Open the form
    Xrm.Navigation.openForm(correctiveActionFormOptions, findingGUIDs).then(
        function (success) {
            console.log(success);
            var correctiveActionId = Object.values(success)[0][0].id.slice(1, -1);

            let relatedFindings = [];
            for (let findingGUID of findingGUIDs) {
                relatedFindings.push({
                    entityType: "ovs_finding",
                    id: findingGUID
                });
            }
            relatedFindings.forEach(function (finding) {
                var data =
                {
                    "ts_Finding@odata.bind": `/ovs_findings(${finding.id})`,
                    "ts_EnforcementAction@odata.bind": `/ts_enforcementactions(${enforcementActionId})`,
                    "ts_CorrectiveAction@odata.bind": `/ts_correctiveactions(${correctiveActionId})`,
                }

                Xrm.WebApi.createRecord("ts_correctiveactionfinding", data).then(
                    function (success) {
                        console.log(success);
                    });
            },
                function (error) {
                    console.log(error);
                });
        });
}

async function isNCAT(findingGUID) {
    let operationTypeFetchXml = [
        "<fetch>",
        "<entity name='ovs_operationtype'>",
        "<attribute name='ovs_operationtypeid'/>",
        "<link-entity name='ovs_finding' from='ts_ovs_operationtype' to='ovs_operationtypeid' link-type='inner' alias='ab'>",
        "<filter type='and'>",
        "<condition attribute='ovs_findingid' operator='eq' value='", findingGUID, "'/>",
        "</filter>",
        "</link-entity>",
        "</entity>",
        "</fetch>"
    ].join("");
    operationTypeFetchXml = "?fetchXml=" + encodeURIComponent(operationTypeFetchXml);
    let operationType = await Xrm.WebApi.retrieveMultipleRecords("ovs_operationtype", operationTypeFetchXml);
    if (operationType != null && operationType.entities.length > 0) {
        return issoOperationTypeGuids.includes(operationType.entities[0].ovs_operationtypeid);
    }
    else {
        return false;
    }
}

function getTypeOfActionValueInEntity(highestEnforcementAction) {
    switch (highestEnforcementAction) {
        case 717750001 /* VerbalWarning */:
            return 741130012 /* VerbalWarning */;
        case 717750002 /* WrittenWarning */:
            return 741130013 /* WrittenWarning */;
        case 717750003 /* AMPLevel120ofMaximum */:
        case 717750004 /* AMPLevel250ofMaximum */:
        case 717750005 /* AMPLevel3100ofMaximum */:
            return 741130000 /* AMP */;
        case 717750006 /* SuspensionofCAD */:
            return 741130001 /* Suspensation of a CAD */;
        case 717750007 /* CancellationofCAD */:
            return 741130001 /* Suspensation of a CAD */;
        case 717750008 /* ReferraltoREU */:
            return 741130017 /* ReferraltoREU */;
        default:
            return 741130015; //Other ?
    }
}

async function createEnforcementAction(findingGUIDs, primaryControl) {
    const gridContext = primaryControl.getControl("subgrid_findings");
    const findingRows = gridContext.getGrid().getSelectedRows();

    //Confirm all selected findings have a final enforcement action
    let { allFindingsHaveFinalEnforcementAction, aFindingIsProtectedB, aFindingIsObservation } = checkIfAllFindingsHaveEnforcementAction(findingRows);

    //If a finding does not have a final enforcement action, open an alert dialog
    if (!allFindingsHaveFinalEnforcementAction) {
        showAlertDialog(missingFinalEnforcementActionForActionCreateTextLocalized, missingFinalEnforcementActionTitleLocalized);
        return;
    }
    if (aFindingIsObservation) {
        showAlertDialog(createAcionFromObservationTextLocalized, createAcionFromObservationTitleLocalized);
        return;
    }
    const caseId = primaryControl.data.entity.getId().slice(1, -1);
   
    if (await isNCAT(findingGUIDs[0])) {
        //Retrieve highest enforcement action of findings
        let highestEnforcementAction = getHighestEnforcementActionFromFindings(findingRows);

        var data =
        {
            "ts_Case@odata.bind": `/incidents(${caseId})`,
            "ts_actiontype": getTypeOfActionValueInEntity(highestEnforcementAction),
            "ts_actioncategory": 741130002
        }

        Xrm.WebApi.createRecord("ts_action", data).then(
            function (newEnforcementAction) {
                console.log("Successfully created action.");

                for (let findingGUID of findingGUIDs) {
                    var dataActionFinding =
                    {
                        "ts_action@odata.bind": `/ts_actions(${newEnforcementAction.id})`,
                        "ts_ovs_Finding@odata.bind": `/ovs_findings(${findingGUID})`
                    }
                    Xrm.WebApi.createRecord("ts_actionfinding", dataActionFinding).then(
                        function (success) {
                            console.log(success);
                        },
                        function (error) {
                            console.log(error.message);
                        }
                    );
                }
                var pageInput = {
                    pageType: "entityrecord",
                    entityName: "ts_action",
                    entityId: newEnforcementAction.id
                };
                var navigationOptions = {
                    target: 2,
                    height: {
                        value: 100, unit: "%"
                    },
                    width: {
                        value: 80, unit: "%"
                    },
                    position: 1
                };
                //Open action record
                Xrm.Navigation.navigateTo(pageInput, navigationOptions).then(
                    function success() {
                        // Run code on success
                        primaryControl.getControl("Subgrid_EnforcementAction").refresh();
                    },
                    function error() {
                        // Handle errors
                    }
                );
            },
            function (error) {
                console.log(error.message);
            });
    }
    else {
        var enforcementActionType = [];
        findingRows.forEach(function (findingRow) {
            var data =
            {
                "ts_Case@odata.bind": `/incidents(${caseId})`,
                "ts_actiontype": getTypeOfActionValueInEntity(findingRow.getAttribute("ts_finalenforcementaction").getValue()),
                "ts_actioncategory": 741130002
            }

            if (!enforcementActionType.includes(getTypeOfActionValueInEntity(findingRow.getAttribute("ts_finalenforcementaction").getValue()))) {
                enforcementActionType.push(getTypeOfActionValueInEntity(findingRow.getAttribute("ts_finalenforcementaction").getValue()));

                Xrm.WebApi.createRecord("ts_action", data).then(
                    function (newEnforcementAction) {
                        console.log("Successfully created action.");

                        for (let findingGUID of findingGUIDs) {
                            var dataActionFinding =
                            {
                                "ts_action@odata.bind": `/ts_actions(${newEnforcementAction.id})`,
                                "ts_ovs_Finding@odata.bind": `/ovs_findings(${findingGUID})`
                            }
                            Xrm.WebApi.createRecord("ts_actionfinding", dataActionFinding).then(
                                function (success) {
                                    console.log(success);
                                },
                                function (error) {
                                    console.log(error.message);
                                }
                            );
                        }
                        var pageInput = {
                            pageType: "entityrecord",
                            entityName: "ts_action",
                            entityId: newEnforcementAction.id
                        };
                        var navigationOptions = {
                            target: 2,
                            height: {
                                value: 100, unit: "%"
                            },
                            width: {
                                value: 80, unit: "%"
                            },
                            position: 1
                        };
                        //Open action record
                        Xrm.Navigation.navigateTo(pageInput, navigationOptions).then(
                            function success() {
                                // Run code on success
                                primaryControl.getControl("Subgrid_EnforcementAction").refresh();
                            },
                            function error() {
                                // Handle errors
                            }
                        );

                    },
                    function (error) {
                        console.log(error.message);
                    }); 
            } 
        }); 
    } 
}

//Takes selected Finding records from a subgrid, finds which one is complete, and applies its enforcement tool results to the remaining selected records
async function copyEnforcementActionToolResults(primaryControl, SelectedControlsSelectedItemIds) {
    const findingIdsFilterValues = SelectedControlsSelectedItemIds.map(item => "<value>" + item + "</value>");
    let findingFetchXml = [
        "<fetch>",
        "  <entity name='ovs_finding'>",
        "    <filter>",
        "      <condition attribute='ovs_findingid' operator='in'>",
                    findingIdsFilterValues.join(""),
        "      </condition>",
        "      <condition attribute='ts_finalenforcementaction' operator='not-null'/>",
        "    </filter>",
        "  </entity>",
        "</fetch>"
    ].join("");
    findingFetchXml = "?fetchXml=" + encodeURIComponent(findingFetchXml);
    //Retrieve the selected finding with a final enforcement action.
    const completeFinding = await Xrm.WebApi.retrieveMultipleRecords("ovs_finding", findingFetchXml).then(
        function success(result) {
            return result.entities[0];
        }
    );

    //Set Localized labels
    let toolName;
    let confirmStrings = {}
    if (lang == 1033) {
        toolName = (completeFinding._ts_ncatactualorpotentialharm_value) ? "NCAT" : "RATE";
        confirmStrings = {
            text: toolName + " result from Finding " + completeFinding.ovs_finding + " will be applied to the selected Findings. Do you wish to proceed?",
            title: "Apply Result"
        };
    } else {
        toolName = (completeFinding._ts_ncatactualorpotentialharm_value) ? "OENC" : "OERA";
        confirmStrings = {
            text: "Les résultats de l'" + toolName + " pour la constatation " + completeFinding.ovs_finding + " vont être appliqués aux constatations sélectionnées. Voulez-vous continuer?",
            title: "Appliquez les résultats"
        };
    }
    

    if (completeFinding != null) {
        //Open confirmation message asking if they're sure and which result will be copied
        var confirmOptions = { height: 200, width: 450 };
        Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(async function (success) {
            if (success.confirmed) {
                //Spinning Wheel
                Xrm.Utility.showProgressIndicator();

                let data = {};

                //Split for NCAT and RATE
                if (completeFinding._ts_ncatactualorpotentialharm_value != null) {
                    //NCAT
                    data = {
                        "ts_NCATActualorPotentialHarm@odata.bind": "/ts_assessmentratings(" + completeFinding._ts_ncatactualorpotentialharm_value + ")",
                        "ts_NCATIntentionality@odata.bind": "/ts_assessmentratings(" + completeFinding._ts_ncatintentionality_value + ")",
                        "ts_NCATComplianceHistory@odata.bind": "/ts_assessmentratings(" + completeFinding._ts_ncatcompliancehistory_value + ")",
                        "ts_NCATEconomicBenefit@odata.bind": "/ts_assessmentratings(" + completeFinding._ts_ncateconomicbenefit_value + ")",
                        "ts_NCATEconomicBenefit@odata.bind": "/ts_assessmentratings(" + completeFinding._ts_ncateconomicbenefit_value + ")",
                        "ts_NCATMitigationofNonCompliantBehaviors@odata.bind": "/ts_assessmentratings(" + completeFinding._ts_ncatmitigationofnoncompliantbehaviors_value + ")",
                        "ts_NCATCooperationwithInspectionorInvestigat@odata.bind": "/ts_assessmentratings(" + completeFinding._ts_ncatcooperationwithinspectionorinvestigat_value + ")",
                        "ts_NCATDetectionofNonCompliances@odata.bind": "/ts_assessmentratings(" + completeFinding._ts_ncatdetectionofnoncompliances_value + ")",
                        "ts_ncatdetailstosupport": completeFinding.ts_ncatdetailstosupport,
                        "ts_acceptncatrecommendation": completeFinding.ts_acceptncatrecommendation,
                        "ts_ncatenforcementrecommendation": completeFinding.ts_ncatenforcementrecommendation,
                        "ts_ncatenforcementjustification": completeFinding.ts_ncatenforcementjustification,
                        "ts_ncatinspectorrecommendation": completeFinding.ts_ncatinspectorrecommendation,
                        "ts_ncatenforcementjustification": completeFinding.ts_ncatenforcementjustification,
                        "ts_ncatmanagerdecision": completeFinding.ts_ncatmanagerdecision,
                        "ts_ncatmanageralternativerecommendation": completeFinding.ts_ncatmanageralternativerecommendation,
                        "ts_ncatmanagerenforcementjustification": completeFinding.ts_ncatmanagerenforcementjustification,
                        "ts_issueaddressedonsite": completeFinding.ts_issueaddressedonsite,
                        "ts_noncompliancetimeframe": completeFinding.ts_noncompliancetimeframe,
                        "ovs_findingcomments": completeFinding.ovs_findingcomments,
                        "ts_notetostakeholder": completeFinding.ts_notetostakeholder,
                        "ts_sensitivitylevel": completeFinding.ts_sensitivitylevel,
                        "ts_finalenforcementaction": completeFinding.ts_finalenforcementaction,
                        "statecode": completeFinding.statecode,
                        "statuscode": completeFinding.statuscode,
                    }
                    if (completeFinding._ts_ncatmanager_value != null) {
                        data["ts_NCATManager@odata.bind"] = "/systemusers(" + completeFinding._ts_ncatmanager_value + ")";
                    }
                    if (completeFinding._ts_ncatapprovingteam_value != null) {
                        data["ts_NCATApprovingTeam@odata.bind"] = "/teams(" + completeFinding._ts_ncatapprovingteam_value + ")";
                    }
                        
                }
                else if (completeFinding._ts_rategeneralcompliancehistory_value != null) {
                    //RATE
                    data = {
                        "ts_ratespecificcompliancehistory": completeFinding.ts_ratespecificcompliancehistory,
                        "ts_RATEGeneralComplianceHistory@odata.bind": "/ts_assessmentratings(" + completeFinding._ts_rategeneralcompliancehistory_value + ")",
                        "ts_RATEActualorPotentialHarm@odata.bind": "/ts_assessmentratings(" + completeFinding._ts_rateactualorpotentialharm_value + ")",
                        "ts_RATEIntentionality@odata.bind": "/ts_assessmentratings(" + completeFinding._ts_rateintentionality_value + ")",
                        "ts_RATEEconomicBenefit@odata.bind": "/ts_assessmentratings(" + completeFinding._ts_rateeconomicbenefit_value + ")",
                        "ts_RATEResponsibility@odata.bind": "/ts_assessmentratings(" + completeFinding._ts_rateresponsibility_value + ")",
                        "ts_RATEMitigationofNonCompliantBehaviors@odata.bind": "/ts_assessmentratings(" + completeFinding._ts_ratemitigationofnoncompliantbehaviors_value + ")",
                        "ts_RATEPreventingRecurrence@odata.bind": "/ts_assessmentratings(" + completeFinding._ts_ratepreventingrecurrence_value + ")",
                        "ts_RATECooperationwithInspectionorInvestigat@odata.bind": "/ts_assessmentratings(" + completeFinding._ts_ratecooperationwithinspectionorinvestigat_value + ")",
                        "ts_ratespecificenforcementhistory": completeFinding.ts_ratespecificenforcementhistory,
                        "ts_rateenforcementrecommendation": completeFinding.ts_rateenforcementrecommendation
                    }
                }

                //Update the selected findings with the completed finding's data. Skip the one that is complete
                for (let selectedFindingId of SelectedControlsSelectedItemIds) {
                    if (selectedFindingId != completeFinding.ovs_findingid) {
                        //Get Finding Type of Finding to make sure it's Non-Compliance
                        const finding = await Xrm.WebApi.retrieveRecord("ovs_finding", selectedFindingId, "?$select=ts_findingtype");
                        if (finding != null && finding.ts_findingtype == 717750002) {
                            await Xrm.WebApi.updateRecord("ovs_finding", selectedFindingId, data);
                        }
                    }
                }
                Xrm.Utility.closeProgressIndicator();
                primaryControl.getControl("subgrid_findings").refresh();
            }
        });
    }
}