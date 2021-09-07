

async function generateSurvey() {
    var provisionPromise = await retrieveProvisions();
    var provisions = provisionPromise.entities;
    if (provisions == null) return;
    var customSurveyDefinition = await generateCustomSurveyDefinitionJSON(provisions);

    parentFormContext.getAttribute("ovs_questionnairedefinition").setValue(customSurveyDefinition);
    var oldResponse = JSON.parse(parentFormContext.getAttribute("ovs_questionnaireresponse").getValue());
    for (const [questionName, value] of Object.entries(oldResponse)) {
        console.log(`${questionName}: ${value}`);
    }

    //Iterate through provisions, check if a radiogroup question key exists for it in the old response
        //Use old value

        //Check if any finding questions were filled out for the provision
            //Use old value

    parentFormContext.getAttribute("ovs_questionnaireresponse").setValue("");
    Xrm = parent.Xrm;
    ROM.WorkOrderServiceTask.ToggleQuestionnaire(parentExecutionContext);
}

async function previewProvisionText() {
    var provisionPromise = await retrieveProvisions();
    var provisions = provisionPromise.entities;
    if (provisions == null) return;

    var lang = '1033';
    if (parent.Xrm != null) {
        lang = parent.Xrm.Utility.getGlobalContext().userSettings.languageId;
    }

    var provisionText = "";
    for (var provision of provisions) {
        provisionText += (await buildProvisionText(provision, lang) + "<br><br>");
    }

    var provisionTextWindow = window.open("", "Preview Provision Text");
    provisionTextWindow.document.write("<body></body>");
    var provisionTextSpan = provisionTextWindow.document.createElement('span');
    provisionTextSpan.innerHTML = provisionText
    provisionTextWindow.document.body.appendChild(provisionTextSpan);
}

function InitialContext(executionContext) {
    window.parentExecutionContext = executionContext;
    window.parentFormContext = executionContext.getFormContext();
}

async function retrieveProvisions() {
    //Retrieve Provisions from WOST
    var workOrderServiceTaskId = parentFormContext.data.entity.getId().replace("{", "").replace("}", "");
    var fetchXml = [
        "<fetch>",
        "  <entity name='qm_rclegislation'>",
        "    <all-attributes />",
        "    <link-entity name='ts_workorderservicetask_qm_rclegislation' from='qm_rclegislationid' to='qm_rclegislationid' intersect='true'>",
        "      <filter>",
        "        <condition attribute='msdyn_workorderservicetaskid' operator='eq' value='", workOrderServiceTaskId, "'/>",
        "      </filter>",
        "    </link-entity>",
        "  </entity>",
        "</fetch>",
    ].join("");
    fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);

    return parent.Xrm.WebApi.retrieveMultipleRecords("qm_rclegislation", fetchXml);
}

async function generateCustomSurveyDefinitionJSON(provisions) {
    var survey = {
        pages: [
            {
                name: "page1",
                elements: []
            }
        ]
    };
    var questionCount = 0;
    var questionArray = []
    for (var provision of provisions) {
        var provisionName = provision.qm_name;
        var provisionTextEn = await buildProvisionText(provision, "1033");
        var provisionTextFr = await buildProvisionText(provision, "1036");
        questionCount++;
        var radioQuestionName = provisionName + "-radiogroup";
        //Create Radial question
        var radioQuestion = {
            type: "radiogroup",
            name: radioQuestionName,
            title: provisionName,
            isRequired: true,
            choices: [
                {
                    value: "No Finding",
                    text: "No Finding"
                },
                {
                    value: "Observation",
                    text: "Observation"
                },
                {
                    value: "Non-compliance",
                    text: "Non-compliance"
                }
            ]
        };
        questionArray.push(radioQuestion);
        questionCount++;
        //Create Observation Finding
        var observationFinding = {
            type: "finding",
            name: "finding-id" + questionCount,
            visibleIf: `{${radioQuestionName}} = 'Observation'`,
            title: provisionName,
            description: {
                default: provisionTextEn,
                fr: provisionTextFr
            },
            provision: provisionName,
            reference: provisionName,
            nameID: "id" + questionCount,
            findingType: 717750001,
            provisionData: {
                legislationid: provision.qm_rclegislationid,
                provisioncategoryid: provision._qm_tylegislationtypeid_value
            },
        }
        questionArray.push(observationFinding);
        questionCount++;
        //Create Non-Compliance Finding
        var nonComplianceFinding = {
            type: "finding",
            name: "finding-id" + questionCount,
            visibleIf: `{${radioQuestionName}} = 'Non-compliance'`,
            title: provisionName,
            description: {
                default: provisionTextEn,
                fr: provisionTextFr
            },
            isRequired: true,
            provision: provisionName,
            reference: provisionName,
            nameID: "id" + questionCount,
            findingType: 717750002,
            provisionData: {
                legislationid: provision.qm_rclegislationid,
                provisioncategoryid: provision._qm_tylegislationtypeid_value
            },
        }
        questionArray.push(nonComplianceFinding);
    };
    survey.pages[0].elements = questionArray;
    return JSON.stringify(survey);
}