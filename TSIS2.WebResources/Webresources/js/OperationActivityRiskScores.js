"use strict";
var ROM;
(function (ROM) {
    var OperationActivityRiskScores;
    (function (OperationActivityRiskScores) {
        function getRecordId(formContext) {
            // returns the record ID without curly braces
            var id = formContext.data.entity.getId();
            return id ? id.replace(/[{}]/g, "") : "";
        }
        function onLoad(eContext) {
            var formContext = eContext.getFormContext();
            var recordId = getRecordId(formContext);
            console.log("Current record ID:", recordId);
            // Check if the user language is French
            var userLanguage = Xrm.Utility.getGlobalContext().userSettings.languageId;
            // Check if we are using a Risk Application
            var riskApplication = formContext.getAttribute("ts_usesriskapplication").getValue();
            // If we have a Risk Application, get the values being used
            if (riskApplication != null && riskApplication == true) {
                console.log("Using Risk Application");
                var fetchXml = "\n                <fetch top=\"1\">\n                  <entity name=\"ovs_operationtype\">\n                    <attribute name=\"ts_riskapplication\" />\n                    <link-entity name=\"ts_operationactivity\"\n                                 from=\"ts_operationtype\"\n                                 to=\"ovs_operationtypeid\"\n                                 link-type=\"inner\">\n                      <link-entity name=\"ts_operationactivityriskscores\"\n                                   from=\"ts_operationactivity\"\n                                   to=\"ts_operationactivityid\"\n                                   link-type=\"inner\">\n                        <filter>\n                          <condition attribute=\"ts_operationactivityriskscoresid\"\n                                     operator=\"eq\"\n                                     value=\"" + recordId + "\" />\n                        </filter>\n                      </link-entity>\n                    </link-entity>\n                  </entity>\n                </fetch>";
                Xrm.WebApi.retrieveMultipleRecords("ovs_operationtype", "?fetchXml=" + encodeURIComponent(fetchXml)).then(function (result) {
                    if (result.entities.length > 0) {
                        var record = result.entities[0];
                        // Raw numeric value
                        var numericVal = record["ts_riskapplication"];
                        // Human-readable label (like ts_riskapplicationname in SQL)
                        var label = record["ts_riskapplication@OData.Community.Display.V1.FormattedValue"];
                        console.log("Risk Application (numeric):", numericVal);
                        console.log("Risk Application (label):", label);
                        var riskApplicationNotificationMessage = "Risk Application in use: " + label + " are being used to calculate the Risk Score.";
                        // If the user language is French, translate the message
                        if (userLanguage === 1036) {
                            riskApplicationNotificationMessage = "Application de risque en cours d'utilisation : " + label + " sont utilis\u00E9s pour calculer le score de risque.";
                        }
                        // show the info banner
                        formContext.ui.setFormNotification(riskApplicationNotificationMessage, "INFO", "riskAppInfo");
                    }
                    else {
                        console.log("No record found.");
                    }
                }).catch(function (error) {
                    console.error("Error retrieving data:", error);
                });
            }
            else {
                console.log("No Risk Application selected.");
            }
        }
        OperationActivityRiskScores.onLoad = onLoad;
        function onSave(eContext) {
            var formContext = eContext.getFormContext();
            console.log("Entering onSave");
        }
        OperationActivityRiskScores.onSave = onSave;
    })(OperationActivityRiskScores = ROM.OperationActivityRiskScores || (ROM.OperationActivityRiskScores = {}));
})(ROM || (ROM = {}));
