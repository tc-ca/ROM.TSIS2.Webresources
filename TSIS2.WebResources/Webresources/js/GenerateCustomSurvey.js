var findingTypes = {
    "No Finding": 717750000,
    "Observation": 717750001,
    "Non-compliance": 717750002,
};

async function generateSurvey() {
    var provisionPromise = await retrieveProvisions();
    var provisions = provisionPromise.entities;
    if (provisions == null) return;
    var customSurveyDefinition = await generateCustomSurveyDefinition(provisions);

    var oldDefinition = JSON.parse(parentFormContext.getAttribute("ovs_questionnairedefinition").getValue());
    var oldResponse = JSON.parse(parentFormContext.getAttribute("ovs_questionnaireresponse").getValue());
    var newResponse = {};

    //Iterate through provisions, check if a radiogroup question key exists for it in the old response
    for (provision of provisions) {
        let provisionName = provision.qm_name;
        //If the same radiogroup question existed in the old response, keep the old values
        if ((provisionName + "-radiogroup") in oldResponse) {
            let findingTypeValue = oldResponse[provisionName + "-radiogroup"];
            newResponse[provisionName + "-radiogroup"] = findingTypeValue;

            //Check if any finding questions in the custom survey definition can use old values
            for (oldQuestion of oldDefinition.pages[0].elements) {
                //If a finding question used the same provision and has the same findingType
                if (oldQuestion.type == "finding" && oldQuestion.provision == provisionName && oldQuestion.findingType == findingTypes[findingTypeValue]) {
                    //Retrieve the value in the old response
                    let oldFindingQuestionValue = oldResponse[oldQuestion.name];
                    //Determine the question name used in the new definition, then set its value in the new response
                    for (newQuestion of customSurveyDefinition.pages[0].elements) {
                        if (newQuestion.provision == provisionName && newQuestion.findingType == findingTypes[findingTypeValue]) {
                            newQuestionName = newQuestion.name;
                            newResponse[newQuestionName] = oldFindingQuestionValue;
                        }
                    }
                }
            }
        }
    }

        //Check if any finding questions were filled out for the provision
            //Use old value
    parentFormContext.getAttribute("ovs_questionnairedefinition").setValue(JSON.stringify(customSurveyDefinition));
    parentFormContext.getAttribute("ovs_questionnaireresponse").setValue(JSON.stringify(newResponse));
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

async function generateCustomSurveyDefinition(provisions) {
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
    return survey;
}