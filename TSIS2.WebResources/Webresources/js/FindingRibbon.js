
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

    let findingId = primaryControl.data.entity.getId();
    
    let fetchXml = [
        "<fetch top='50'>",
        "  <entity name='ovs_finding'>",
        "    <filter>",
        "      <condition attribute='ovs_findingid' operator='eq' value='", findingId, "'/>",
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
    let inspectorRecommendationControl = primaryControl.getControl("ts_ncatinspectorrecommendation");
    inspectorRecommendationControl.removeOption(717750000);
    inspectorRecommendationControl.removeOption(717750001);
    inspectorRecommendationControl.removeOption(717750002);
    let verbalnWarningOption = { text: "Verbal Warning", value: 717750000 }
    let writtenWarningOption = { text: "Written Warning", value: 717750001 }
    let referralOption = { text: "Referral to CEE", value: 717750002 }
    if (totalWeight <= 19) {
        //Verbal Warning
        enforcementResponseChoiceNumber = 717750000;
        inspectorRecommendationControl.addOption(writtenWarningOption);
        inspectorRecommendationControl.addOption(referralOption);
    } else if (totalWeight > 19 && totalWeight <= 55) {
        //Written Warning
        enforcementResponseChoiceNumber = 717750001;
        inspectorRecommendationControl.addOption(verbalnWarningOption);
        inspectorRecommendationControl.addOption(referralOption);
    } else if (totalWeight > 55) {
        //Referral to CEE
        enforcementResponseChoiceNumber = 717750002;
        inspectorRecommendationControl.addOption(verbalnWarningOption);
        inspectorRecommendationControl.addOption(writtenWarningOption);
    }

    primaryControl.getAttribute("ts_ncatenforcementrecommendation").setValue(enforcementResponseChoiceNumber);
    primaryControl.getControl("ts_acceptncatrecommendation").setVisible(true);
    primaryControl.getAttribute("ts_ncatinspectorrecommendation").setValue(null);
}

function openRecord(recordId) {
    //Setting formId to "Default"
    let formId = "d8af1d58-3786-4ab4-9a35-3a1b85946c12"; //Information Main form
    //Getting the record
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