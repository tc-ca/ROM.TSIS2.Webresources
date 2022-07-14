var lang = parent.Xrm.Utility.getGlobalContext().userSettings.languageId;

var markCompleteValidationTextLocalized;
var markCompleteValidationTitleLocalized;
var markCompleteConfirmationTextLocalized;
var markCompleteConfirmationTitleLocalized;
var missingFinalEnforcementActionTitleLocalized;
var missingFinalEnforcementActionTextLocalized;

if (lang == 1036) {
    markCompleteValidationTextLocalized = "Tous les champs indiqués par un '+' bleu doivent être complétés avant que la constatation puissent être marqué comme terminé.";
    markCompleteValidationTitleLocalized = "Formulaire Incomplet";
    missingFinalEnforcementActionTitleLocalized = "Mesure d'application finale manquante";
    missingFinalEnforcementActionTextLocalized = "Un ou plusieurs enregistrements de constatations sélectionnés n'ont pas de mesure d'application finale. Toutes les constatations sélectionnées doivent avoir une mesure d'application finale pour créer un rapport de constatations."

} else {
    markCompleteValidationTextLocalized = "All fields denoted by blue '+' must be completed in order to Mark Complete.";
    markCompleteValidationTitleLocalized = "Form Incomplete";
    missingFinalEnforcementActionTitleLocalized = "Missing Final Enforcement Action"
    missingFinalEnforcementActionTextLocalized = "One of more selected Finding records do not have a Final Enforcement Action. All selected findings must have a Final Enforcement Action to create a Findings Report.";
}
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

    let nonComplianceTimeframeCheck = (!(issueaddressedonsite == 717750001 && nonComplianceTimeframe == null));

    if (finalEnforcementAction != null && issueaddressedonsite != null && nonComplianceTimeframeCheck) {
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

    formContext.getAttribute("ts_rateapprovingteam").setValue(null);
    formContext.getAttribute("ts_rateapprovingteam").setRequiredLevel("none");
    formContext.getControl("ts_rateapprovingteam").setVisible(false);

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

    formContext.getAttribute("ts_rateapprovingteam").setValue(null);
    formContext.getAttribute("ts_rateapprovingteam").setRequiredLevel("none");
    formContext.getControl("ts_rateapprovingteam").setVisible(false);

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

function isAvSecBusinessUnit() {
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
    Xrm.WebApi.retrieveMultipleRecords("businessunit", currentUserBusinessUnitFetchXML).then(function (result) {
        let userBusinessUnitName = result.entities[0].name;
        return userBusinessUnitName.startsWith("Aviation");
    });
}

function isISSOBusinessUnit() {
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
    Xrm.WebApi.retrieveMultipleRecords("businessunit", currentUserBusinessUnitFetchXML).then(function (result) {
        let userBusinessUnitName = result.entities[0].name;
        return userBusinessUnitName.startsWith("Intermodal");
    });
}

function isTCBusinessUnit() {
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
    Xrm.WebApi.retrieveMultipleRecords("businessunit", currentUserBusinessUnitFetchXML).then(function (result) {
        let userBusinessUnitName = result.entities[0].name;
        return userBusinessUnitName.startsWith("Transport");
    });
}

function FindingsReport(findingGUIDs, primaryControl) {
    const gridContext = primaryControl.getControl("subgrid_findings");
    const findingRows = gridContext.getGrid().getSelectedRows();

    //Confirm all selected findings have a final enforcement action
    let { allFindingsHaveFinalEnforcementAction, aFindingIsProtectedB } = checkIfAllFindingsHaveEnforcementAction(findingRows);

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
    findingRows.forEach(function (findingRow) {
        const findingFinalEnforcementAction = findingRow.getAttribute("ts_finalenforcementaction").getValue();
        const findingSensitivityLevel = findingRow.getAttribute("ts_sensitivitylevel").getValue();
        if (findingFinalEnforcementAction == null) {
            allFindingsHaveFinalEnforcementAction = false;
        }
        if (findingSensitivityLevel == 717750001) { //Protected B
            aFindingIsProtectedB = true;
        }
    });
    return { allFindingsHaveFinalEnforcementAction, aFindingIsProtectedB };
}

function getHighestEnforcementActionFromFindings(findingRows){
    let highestFinalEnforcementAction = findingRows.get(0).getAttribute("ts_finalenforcementaction").getValue();
    findingRows.forEach(function (findingRow) {
        const findingFinalEnforcementAction = findingRow.getAttribute("ts_finalenforcementaction").getValue();
        if(findingFinalEnforcementAction > highestFinalEnforcementAction){
            highestFinalEnforcementAction = findingFinalEnforcementAction;
        }
    });
    return highestFinalEnforcementAction;
}

function getTypeOfEnforcementActionValueInEntity(highestEnforcementAction){
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

function showAlertDialog(text, title){
    var alertStrings = { confirmButtonLabel: "OK", text: text, title: title };
    var alertOptions = { height: 200, width: 300 };
    Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
}

function createEnforcementAction(findingGUIDs, primaryControl){
    const gridContext = primaryControl.getControl("subgrid_findings");
    const findingRows = gridContext.getGrid().getSelectedRows();

    //Confirm all selected findings have a final enforcement action
    let { allFindingsHaveFinalEnforcementAction, aFindingIsProtectedB } = checkIfAllFindingsHaveEnforcementAction(findingRows);

    //If a finding does not have a final enforcement action, open an alert dialog
    if (!allFindingsHaveFinalEnforcementAction) {
        showAlertDialog(missingFinalEnforcementActionTextLocalized, missingFinalEnforcementActionTitleLocalized);
        return;
    }

    const caseId = primaryControl.data.entity.getId().slice(1, -1);

    //Retrieve highest enforcement action of findings
    let highestEnforcementAction = getHighestEnforcementActionFromFindings(findingRows);

    var data =
    {
        "ts_Incident_ts_enforcementaction@odata.bind": `/incidents(${caseId})`,
        "ts_typeofenforcementaction": getTypeOfEnforcementActionValueInEntity(highestEnforcementAction),
        "regardingobjectid_incident_ts_enforcementaction@odata.bind": `/incidents(${caseId})`   
    }

    Xrm.WebApi.createRecord("ts_enforcementaction", data).then(

        function (newEnforcementAction) {
            let relatedFindings = [];
            for (let findingGUID of findingGUIDs) {
                relatedFindings.push({
                    entityType: "ovs_finding",
                    id: findingGUID
                });
            }
            const oneToManyAssociateRequest = {
                getMetadata: () => ({
                    boundParameter: null,
                    parameterTypes: {},
                    operationType: 2,
                    operationName: "Associate"
                }),

                relationship: "ts_enforcementaction_ts_enforcementaction",

                target: {
                    entityType: "ts_enforcementaction",
                    id: newEnforcementAction.id
                },

                relatedEntities: relatedFindings
            }

            Xrm.WebApi.online.execute(oneToManyAssociateRequest).then(
                (success) => {
                    console.log("Success", success);

                    var pageInput = {
                        pageType: "entityrecord",
                        entityName: "ts_enforcementaction",
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
                    //Open finding record
                    Xrm.Navigation.navigateTo(pageInput, navigationOptions).then(
                        function success() {
                            // Run code on success
                            primaryControl.getControl("EnforcementActionTimeline").refresh();
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

