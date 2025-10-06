namespace ROM.OperationActivityRiskScores {
    function getRecordId(formContext: Form.ts_operationactivityriskscores.Main.Information): string {
        // returns the record ID without curly braces
        const id = formContext.data.entity.getId();
        return id ? id.replace(/[{}]/g, "") : "";
    }

    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_operationactivityriskscores.Main.Information>eContext.getFormContext();
        const recordId = getRecordId(formContext);
        console.log("Current record ID:", recordId);

        // Check if the user language is French
        const userLanguage = Xrm.Utility.getGlobalContext().userSettings.languageId;

        // Check if we are using a Risk Application
        const riskApplication = formContext.getAttribute("ts_usesriskapplication").getValue();
        
        // If we have a Risk Application, get the values being used
        if (riskApplication != null && riskApplication == true) {
            console.log("Using Risk Application");

            const fetchXml = `
                <fetch top="1">
                  <entity name="ovs_operationtype">
                    <attribute name="ts_riskapplication" />
                    <link-entity name="ts_operationactivity"
                                 from="ts_operationtype"
                                 to="ovs_operationtypeid"
                                 link-type="inner">
                      <link-entity name="ts_operationactivityriskscores"
                                   from="ts_operationactivity"
                                   to="ts_operationactivityid"
                                   link-type="inner">
                        <filter>
                          <condition attribute="ts_operationactivityriskscoresid"
                                     operator="eq"
                                     value="${recordId}" />
                        </filter>
                      </link-entity>
                    </link-entity>
                  </entity>
                </fetch>`;

            Xrm.WebApi.retrieveMultipleRecords(
                "ovs_operationtype",
                `?fetchXml=${encodeURIComponent(fetchXml)}`
            ).then(result => {
                if (result.entities.length > 0) {
                    const record = result.entities[0];

                    // Raw numeric value
                    const numericVal = record["ts_riskapplication"];

                    // Human-readable label (like ts_riskapplicationname in SQL)
                    const label = record["ts_riskapplication@OData.Community.Display.V1.FormattedValue"];

                    console.log("Risk Application (numeric):", numericVal);
                    console.log("Risk Application (label):", label);

                    let riskApplicationNotificationMessage = `Risk Application in use: ${label} are being used to calculate the Risk Score.`;

                    // If the user language is French, translate the message
                    if (userLanguage === 1036) { 
                        riskApplicationNotificationMessage = `Application de risque en cours d'utilisation : ${label} sont utilisés pour calculer le score de risque.`;
                    }

                    // show the info banner
                    formContext.ui.setFormNotification(
                        riskApplicationNotificationMessage,
                        "INFO",
                        "riskAppInfo"
                    );
                } else {
                    console.log("No record found.");
                }
            }).catch(error => {
                console.error("Error retrieving data:", error);
            });
        } else {
            console.log("No Risk Application selected.");
        }
    }

    export function onSave(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_operationactivityriskscores.Main.Information>eContext.getFormContext();
        console.log("Entering onSave");
    }
}