

function generateSurvey() {
    var provisions = await retrieveProvisions();
    var customSurveyDefinition = generateCustomSurveyDefinitionJSON(provisions);
    console.log(customSurveyDefinition);

        //Replace survey definition

        //Clear survey response field

        //Initialize survey
}

function InitialContext(executionContext) {
    window.parentExecutionContext = executionContext;
    window.parentFormContext = executionContext.getFormContext();
}

async function retrieveProvisions() {
    //Retrieve Provisions from WOST
    var workOrderServiceTaskId = parentFormContext.data.entity.getId();
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

    Xrm.WebApi.retrieveMultipleRecords("qm_rclegislation", fetchXml).then(function success(result) {
        if (result.entities[0] != null) {
            return result.entities;
        }
    }, function error(error) {
        Xrm.Navigation.openAlertDialog({ text: error.message });
        return null;
    });
}

function generateCustomSurveyDefinitionJSON(provisions) {
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
    provisions.forEach(function (provision) {
        var provisionTextEn = await buildProvisionText(provision, "1033");
        var provisionTextFr = await buildProvisionText(provision, "1036");
        questionCount++;
        var radioQuestionName = "question" + questionCount;
        //Create Radial question
        var radioQuestion = {
            type: "radiogroup",
            name: radioQuestionName,
            title: provision.qm_name,
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
            visibleIf: `"{"${radioQuestionName}"}" = 'Observation'`,
            title: provision.qm_name,
            description: {
                default: provisionTextEn,
                fr: provisionTextFr
            },
            provision: provision.qm_name,
            reference: provision.qm_name,
            nameID: "id" + questionCount,
            findingType: 717750001,
            provisionData: {
                legislationid: "temp",
                provisioncategoryid: null
            },
        }
        questionArray.push(observationFinding);
        questionCount++;
        //Create Non-Compliance Finding
        var nonComplianceFinding = {
            type: "finding",
            name: "finding-id" + questionCount,
            visibleIf: `"{"${radioQuestionName}"}" = 'Non-compliance'`,
            title: provision.qm_name,
            description: {
                default: provisionTextEn,
                fr: provisionTextFr
            },
            isRequired: true,
            provision: provision.qm_name,
            reference: provision.qm_name,
            nameID: "id" + questionCount,
            findingType: 717750002,
            provisionData: {
                legislationid: "temp",
                provisioncategoryid: null
            },
        }
        questionArray.push(nonComplianceFinding);
    });
    survey.pages[0].elements = questionArray;
    return JSON.stringify(survey);
}