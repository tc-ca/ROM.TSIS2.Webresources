var lang = parent.Xrm.Utility.getGlobalContext().userSettings.languageId;

var markCompleteValidationTextLocalized;
var markCompleteValidationTitleLocalized;
var markCompleteConfirmationTextLocalized;
var markCompleteConfirmationTitleLocalized;

if (lang == 1036) {
    markCompleteValidationTextLocalized = "Tous les champs indiqués par un '+' bleu doivent être complétés avant que la constatation puissent être marqué comme terminé.";
    markCompleteValidationTitleLocalized = "Formulaire Incomplet";

} else {
    markCompleteValidationTextLocalized = "All fields denoted by blue '+' must be completed in order to Mark Complete.";
    markCompleteValidationTitleLocalized = "Form Incomplete";
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
    if (finalEnforcementAction != null && issueaddressedonsite != null) {
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
    let caseId = primaryControl.data.entity.getId().slice(1, -1);
    //Create new findings report record
    var data =
    {
        "ts_name": "Findings Report Test",
        "ts_Case@odata.bind": `/incidents(${caseId})`,
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

    //Relate the selected findings to the findings report

    //Open the findings report record
}



