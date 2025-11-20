var lang = parent.Xrm.Utility.getGlobalContext().userSettings.languageId;

if (lang == 1036) {
  createActionValidationTextLocalized = "Veuillez sélectionner une ou plusieurs infractions pour créer une action.";
  createActionValidationTitleLocalized = "Sélection d'une ou plusieurs infractions Requise";
} else {
  createActionValidationTextLocalized = "Please select one or more infractions to create an action.";
  createActionValidationTitleLocalized = "Infractions Selection Required";
}
function unlockRATE(primaryControl) {
  //Set status to New
  primaryControl.getAttribute("statuscode").setValue(1);

  //RATE
  primaryControl.getControl("ts_ratespecificnoncompliancehistory").setDisabled(false);
  primaryControl.getControl("ts_rategeneralnoncompliancehistory").setDisabled(false);
  primaryControl.getControl("ts_ratepreviousenforcementmechanism").setDisabled(false);
  primaryControl.getControl("ts_rateactualorpotentialharm").setDisabled(false);
  primaryControl.getControl("ts_rateintentionality").setDisabled(false);
  primaryControl.getControl("ts_rateeconomicbenefit").setDisabled(false);
  primaryControl.getControl("ts_rateresponsibility").setDisabled(false);
  primaryControl.getControl("ts_ratemitigationofharm").setDisabled(false);
  primaryControl.getControl("ts_ratepreventingrecurrence").setDisabled(false);
  primaryControl.getControl("ts_ratecooperation").setDisabled(false);
  primaryControl.getControl("ts_acceptraterecommendation").setDisabled(false);
  primaryControl.getControl("ts_issueaddressedonsite").setDisabled(false);
  primaryControl.getControl("ts_noncompliancetimeframe").setDisabled(false);
  // primaryControl.getControl("ts_notetostakeholder").setDisabled(false);

  primaryControl.getAttribute("ts_acceptraterecommendation").setValue(null);
  primaryControl.getAttribute("ts_finalenforcementaction").setValue(null);

  RATEHideProposedSection(primaryControl);
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

  formContext.getAttribute("ts_ratemanagerenforcementjustification").setValue(null);
  formContext.getAttribute("ts_ratemanagerenforcementjustification").setRequiredLevel("none");
  formContext.getControl("ts_ratemanagerenforcementjustification").setVisible(false);

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
    "        <condition attribute='systemuserid' operator='eq' value='",
    userId,
    "'/>",
    "      </filter>",
    "    </link-entity>",
    "  </entity>",
    "</fetch>",
  ].join("");
  currentUserBusinessUnitFetchXML = "?fetchXml=" + encodeURIComponent(currentUserBusinessUnitFetchXML);
  let userBusinessUnitName = await Xrm.WebApi.retrieveMultipleRecords("businessunit", currentUserBusinessUnitFetchXML);
  const userBusinessUnitId = userBusinessUnitName.entities[0].businessunitid;

  return await isAvSecBU(userBusinessUnitId);
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
    "        <condition attribute='systemuserid' operator='eq' value='",
    userId,
    "'/>",
    "      </filter>",
    "    </link-entity>",
    "  </entity>",
    "</fetch>",
  ].join("");
  currentUserBusinessUnitFetchXML = "?fetchXml=" + encodeURIComponent(currentUserBusinessUnitFetchXML);
  let userBusinessUnitName = await Xrm.WebApi.retrieveMultipleRecords("businessunit", currentUserBusinessUnitFetchXML);
  const userBusinessUnitId = userBusinessUnitName.entities[0].businessunitid;

  return await isTCBU(userBusinessUnitId);
}

function acceptRATERecommendationIsNotNull(primaryControl) {
  return primaryControl.getAttribute("ts_acceptraterecommendation").getValue() != null;
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

async function createEnforcementAction(infractionGUIDs, primaryControl) {
  const gridContext = primaryControl.getControl("subgrid_infractions");
  const infractionRows = gridContext.getGrid().getSelectedRows();

  //If infractions are not selected open alert dialog
  if (infractionGUIDs.length == 0) {
    showAlertDialog(createActionValidationTextLocalized, createActionValidationTitleLocalized);
    return;
  }
  const caseId = primaryControl.data.entity.getId().slice(1, -1);
  var stakeholderId = "";
  const caseRecord = await Xrm.WebApi.retrieveRecord("incident", caseId, "?$select=_customerid_value");
  if (caseRecord != null && caseRecord._customerid_value != null) {
    stakeholderId = caseRecord._customerid_value;
  }

  var enforcementActionType = [];
  infractionRows.forEach(function (infractionRow) {
    var data = {
      "ts_Case@odata.bind": `/incidents(${caseId})`,
      ts_actiontype: getTypeOfActionValueInEntity(infractionRow.getAttribute("ts_finalenforcementaction").getValue()),
      ts_actioncategory: 741130002,
      "ts_stakeholder@odata.bind": `/accounts(${stakeholderId})`,
    };
    if (stakeholderId == "") {
      data = {
        "ts_Case@odata.bind": `/incidents(${caseId})`,
        ts_actiontype: getTypeOfActionValueInEntity(infractionRow.getAttribute("ts_finalenforcementaction").getValue()),
        ts_actioncategory: 741130002,
      };
    }
    if (
      !enforcementActionType.includes(
        getTypeOfActionValueInEntity(infractionRow.getAttribute("ts_finalenforcementaction").getValue())
      )
    ) {
      enforcementActionType.push(
        getTypeOfActionValueInEntity(infractionRow.getAttribute("ts_finalenforcementaction").getValue())
      );

      Xrm.WebApi.createRecord("ts_action", data).then(
        function (newEnforcementAction) {
          console.log("Successfully created action.");

          for (let infractionGUID of infractionGUIDs) {
            var dataActionInfraction = {
              "ts_action@odata.bind": `/ts_actions(${newEnforcementAction.id})`,
              "ts_Infraction@odata.bind": `/ts_infractions(${infractionGUID})`,
            };
            Xrm.WebApi.createRecord("ts_actioninfraction", dataActionInfraction).then(
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
            entityId: newEnforcementAction.id,
          };
          var navigationOptions = {
            target: 2,
            height: {
              value: 100,
              unit: "%",
            },
            width: {
              value: 80,
              unit: "%",
            },
            position: 1,
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
        }
      );
    }
  });
}
function showAlertDialog(text, title) {
  var alertStrings = { confirmButtonLabel: "OK", text: text, title: title };
  var alertOptions = { height: 200, width: 300 };
  Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
}
