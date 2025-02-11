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

function acceptRATERecommendationIsNotNull(primaryControl) {
    return (primaryControl.getAttribute("ts_acceptraterecommendation").getValue() != null)
}
