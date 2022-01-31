
function NCATFactorsHaveValues(primaryControl) {
    let factor1 = primaryControl.getAttribute("ts_ncatactualorpotentialharm").getValue();
    let factor2 = primaryControl.getAttribute("ts_ncatcompliancehistory").getValue();
    let factor3 = primaryControl.getAttribute("ts_ncatcooperationwithinspectionorinvestigat").getValue();
    let factor4 = primaryControl.getAttribute("ts_ncatdetectionofnoncompliances").getValue();
    let factor5 = primaryControl.getAttribute("ts_ncateconomicbenefit").getValue();
    let factor6 = primaryControl.getAttribute("ts_ncatintentionality").getValue();
    let factor7 = primaryControl.getAttribute("ts_ncatmitigationofnoncompliantbehaviors").getValue();

    return (factor1 != null && factor2 != null && factor3 != null && factor4 != null && factor5 != null && factor6 != null && factor7 != null);
}


//Function called when Finalize finding ribbon button is pressed
//Calculates and sets the Enforcement Recommendation
async function NCATFinalize(primaryControl) {

    let factor1 = primaryControl.getAttribute("ts_ncatactualorpotentialharm").getValue();
    let factor2 = primaryControl.getAttribute("ts_ncatcompliancehistory").getValue();
    let factor3 = primaryControl.getAttribute("ts_ncatcooperationwithinspectionorinvestigat").getValue();
    let factor4 = primaryControl.getAttribute("ts_ncatdetectionofnoncompliances").getValue();
    let factor5 = primaryControl.getAttribute("ts_ncateconomicbenefit").getValue();
    let factor6 = primaryControl.getAttribute("ts_ncatintentionality").getValue();
    let factor7 = primaryControl.getAttribute("ts_ncatmitigationofnoncompliantbehaviors").getValue();

    if (factor1 == null || factor2 == null || factor3 == null || factor4 == null || factor5 == null || factor6 == null || factor7 == null) {
        primaryControl.getAttribute("ts_ncatenforcementrecommendation").setValue(null);
        primaryControl.getAttribute("ts_acceptncatrecommendation").setValue(null);
        primaryControl.getAttribute("ts_ncatinspectorrecommendation").setValue(null);
        primaryControl.getControl("ts_acceptncatrecommendation").setVisible(false);
        return;
    }

    let findingID = primaryControl.data.entity.getId();
    
    let fetchXml = [
        "<fetch top='50'>",
        "  <entity name='ovs_finding'>",
        "    <filter>",
        "      <condition attribute='ovs_findingid' operator='eq' value='", findingID, "'/>",
        "    </filter>",
        "    <link-entity name='ts_assessmentrating' from='ts_assessmentratingid' to='ts_ncatactualorpotentialharm'>",
        "      <attribute name='ts_weight' />",
        "    </link-entity>",
        "    <link-entity name='ts_assessmentrating' from='ts_assessmentratingid' to='ts_ncatcompliancehistory'>",
        "      <attribute name='ts_weight' />",
        "    </link-entity>",
        "    <link-entity name='ts_assessmentrating' from='ts_assessmentratingid' to='ts_ncatcooperationwithinspectionorinvestigat'>",
        "      <attribute name='ts_weight' />",
        "    </link-entity>",
        "    <link-entity name='ts_assessmentrating' from='ts_assessmentratingid' to='ts_ncatdetectionofnoncompliances'>",
        "      <attribute name='ts_weight' />",
        "    </link-entity>",
        "    <link-entity name='ts_assessmentrating' from='ts_assessmentratingid' to='ts_ncateconomicbenefit'>",
        "      <attribute name='ts_weight' />",
        "    </link-entity>",
        "    <link-entity name='ts_assessmentrating' from='ts_assessmentratingid' to='ts_ncatintentionality'>",
        "      <attribute name='ts_weight' />",
        "    </link-entity>",
        "    <link-entity name='ts_assessmentrating' from='ts_assessmentratingid' to='ts_ncatmitigationofnoncompliantbehaviors'>",
        "      <attribute name='ts_weight' />",
        "    </link-entity>",
        "  </entity>",
        "</fetch>",
    ].join("");
    fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);

    let findingWithWeight = await Xrm.WebApi.retrieveMultipleRecords("ovs_finding", fetchXml);
    findingWithWeight = findingWithWeight.entities[0];

    let totalWeight = findingWithWeight["ts_assessmentrating1.ts_weight"] + findingWithWeight["ts_assessmentrating2.ts_weight"] + findingWithWeight["ts_assessmentrating3.ts_weight"] + findingWithWeight["ts_assessmentrating4.ts_weight"] + findingWithWeight["ts_assessmentrating5.ts_weight"] + findingWithWeight["ts_assessmentrating6.ts_weight"] + findingWithWeight["ts_assessmentrating7.ts_weight"];

    let enforcementResponseChoiceNumber;
    if (totalWeight <= 19) {
        //Verbal Warning
        enforcementResponseChoiceNumber = 717750000;
    } else if (totalWeight > 19 && totalWeight <= 55) {
        //Written Warning
        enforcementResponseChoiceNumber = 717750001;
    } else if (totalWeight > 55) {
        //Referral to CEE
        enforcementResponseChoiceNumber = 717750002;
    }

    primaryControl.getAttribute("ts_ncatenforcementrecommendation").setValue(enforcementResponseChoiceNumber);
    primaryControl.getControl("ts_acceptncatrecommendation").setVisible(true);
    primaryControl.getAttribute("ts_ncatinspectorrecommendation").setValue(null);
}