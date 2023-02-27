var lang = parent.Xrm.Utility.getGlobalContext().userSettings.languageId;

var charactersRemainingLocalizedText;
var detailTextAddLocalizedText;
var detailTextMinusLocalizedText;
var provideDetailsLocalizedText;
var unsavedNotificationMessage;

let timeSinceLastNotification;

if (lang == 1036) {
    charactersRemainingLocalizedText = "caractères restants";
    provideDetailsLocalizedText = "Veuillez fournir des détails de l'inspection.";
    undecidedFindingTypeErrorLocalizedText = "Veuillez selectionner un Type de constatation.";
    unsavedNotificationMessage = "Vous avez des changements non-enregistrés dans le questionnaire.";
}
else {
    charactersRemainingLocalizedText = "characters remaining";
    provideDetailsLocalizedText = "Please provide inspection details.";
    undecidedFindingTypeErrorLocalizedText = "Please decide on a Finding Type.";
    unsavedNotificationMessage = "You have unsaved changes to the Questionnaire.";
}

'use strict';
window.parentExecutionContext = null;
window.parentFormContext = null;
Survey.StylesManager.applyTheme('default');

//add hasDetail and detail Text properties to all questions in hasDetailQuestions array. Required to load hasDetail value from JSON definition.
var hasDetailQuestions = ["radiogroup", "checkbox", "dropdown", "image", "imagepicker", "file", "boolean", "matrix", "matrixdropdown", "matrixdynamic", "signaturepad", "rating", "expression", "html", "panel", "paneldynamic", "flowpanel"];
hasDetailQuestions.forEach(function (questionName) {
    Survey.JsonObject.metaData.addProperty(questionName, {
        name: "hasDetail:boolean",
        default: true
    }),
    Survey.JsonObject.metaData.addProperty(questionName, {
        name: "detailEnglishText:string",
        default: "Detail"
    }),
    Survey.JsonObject.metaData.addProperty(questionName, {
        name: "detailFrenchText:string",
        default: "Détail"
    })
});

//add applicableProvisions and applicableProvisionsData property to all questions in hasApplicableProvisions array
var hasApplicableProvisions = ["radiogroup", "checkbox", "dropdown", "image", "imagepicker", "file", "boolean", "matrix", "matrixdropdown", "matrixdynamic", "signaturepad", "rating", "expression", "html", "panel", "paneldynamic", "flowpanel"];
hasApplicableProvisions.forEach(function (questionName) {
    Survey
        .Serializer
        .addProperty(questionName, {
            name: "applicableProvisions:provisionsSelection",
            category: "general",
        });
    Survey
        .Serializer
        .addProperty(questionName, {
            name: "applicableProvisionsData"
        });
});

function appendApplicableProvisionsData(survey, options) {
    //Create HTML elements
    const question = options.htmlElement;
    const provisionContainer = document.createElement("div");
    const provisionParagraph = document.createElement("p");

    const applicableProvisionsData = options.question.applicableProvisionsData
    for (let provisionData of applicableProvisionsData) {
        provisionParagraph.innerHTML += provisionData.provisionNameEn + " ";
    }
    provisionContainer.appendChild(provisionParagraph);
    question.appendChild(provisionContainer);
}

async function appendExemptions(survey, options) {
    //Create HTML elements
    const question = options.htmlElement;
    const exemptionContainer = document.createElement("div");
    const header = document.createElement("div");
    const content = document.createElement("div");
    const ExemptionHeaderText = document.createElement("span");
    const ExemptionExpandSymbol = document.createElement("span");
    
    const exemptionResponseId = options.question.name + "-Exemptions"

    const applicableProvisionsData = options.question.applicableProvisionsData
    const applicableExemptions = []
    for (let provisionData of applicableProvisionsData) {
        let applicableExemption = await getApplicableExemptions(provisionData.provisionNameEn);
        if (applicableExemption != null) applicableExemptions.push(applicableExemption);
    }

    //let applicableExemptions = [
    //    {
    //        provisionName: "SATR 4.1 (a)",
    //        exemptionName: "EX001",
    //        exemptionId: "guid1234",
    //    },
    //    {
    //        provisionName: "SATR 4.1 (b)",
    //        exemptionName: "EX002",
    //        exemptionId: "guid5678",
    //    }
    //]

    header.appendChild(ExemptionExpandSymbol);
    header.appendChild(ExemptionHeaderText);
    exemptionContainer.appendChild(header);
    exemptionContainer.appendChild(content);
    question.appendChild(exemptionContainer);

    //Set Styles, Classes, and text

    exemptionContainer.style.marginTop = "10px";
    header.style.backgroundColor = "#d3d3d3";
    header.style.padding = "2px";
    header.style.cursor = "pointer";
    header.style.fontWeight = "bold";
    
    ExemptionHeaderText.innerHTML = "Exemptions";
    content.style.display = "block";
    content.style.border = "1px solid";
    content.style.borderColor = "#d3d3d3";
    content.style.padding = "0px 10px 10px 10px";
    ExemptionExpandSymbol.innerHTML = "- ";

    //Add functionality to HTML elements

    //Toggle visibilty of content when header is clicked
    header.onclick = function () {
        if (content.style.display == "block") {
            content.style.display = "none";
            ExemptionExpandSymbol.innerHTML = "+ ";
        } else {
            content.style.display = "block";
            ExemptionExpandSymbol.innerHTML = "- ";
        }
    };

    let exemptionInputs = [];

    for (let applicableExemption of applicableExemptions) {
        //Create table to contain exemption related inputs
        let exemptionsTable = document.createElement("table");
        let exemptionsTableHeaderRow = document.createElement("tr");
        let invokeExemptionHeader = document.createElement("th");
        let provisionNameHeader = document.createElement("th");
        let exemptionNameHeader = document.createElement("th");

        invokeExemptionHeader.innerHTML = "Invoke Exemption";
        provisionNameHeader.innerHTML = "Provision";
        exemptionNameHeader.innerHTML = "Exemption";

        invokeExemptionHeader.style.width = "15%";
        invokeExemptionHeader.style.textAlign = "left";
        provisionNameHeader.style.width = "15%";
        provisionNameHeader.style.textAlign = "left";
        exemptionNameHeader.style.textAlign = "left";

        exemptionsTableHeaderRow.appendChild(invokeExemptionHeader);
        exemptionsTableHeaderRow.appendChild(provisionNameHeader);
        exemptionsTableHeaderRow.appendChild(exemptionNameHeader);
        exemptionsTable.appendChild(exemptionsTableHeaderRow);

        //Create table elements for this exemption
        let exemptionTableInvokeRow = document.createElement("tr");
        let invokeExemptionDataCell = document.createElement("td");
        let provisionNameDataCell = document.createElement("td");
        let exemptionNameDataCell = document.createElement("td");

        //Create a checkbox to invoke exemption
        invokeExemptionCheckbox = document.createElement("input");
        invokeExemptionCheckbox.type = "checkbox";
        invokeExemptionCheckbox.className = "invokeExemptionCheckbox";
        invokeExemptionCheckbox.value = applicableExemption.exemptionId;
        invokeExemptionDataCell.appendChild(invokeExemptionCheckbox);

        //Populate Provision Name Cell
        provisionNameDataCell.innerHTML = applicableExemption.provisionNameEn;

        //Populate Exemption Name Cell
        exemptionNameDataCell.innerHTML = applicableExemption.exemptionName;

        exemptionTableInvokeRow.appendChild(invokeExemptionDataCell);
        exemptionTableInvokeRow.appendChild(provisionNameDataCell);
        exemptionTableInvokeRow.appendChild(exemptionNameDataCell);
        exemptionsTable.appendChild(exemptionTableInvokeRow);

        //Create an input to write comments about the exemption
        let exemptionCommentBox = document.createElement("textarea");
        exemptionCommentBox.className = "form-control";
        exemptionCommentBox.rows = 3;
        exemptionCommentBox.cols = 50;
        exemptionCommentBox.maxLength = 2000;
        exemptionCommentBox.style.resize = "vertical";
        if (survey.mode == "display") {
            exemptionCommentBox.readOnly = true;
        }

        let characterCount = document.createElement("span");
        characterCount.style.textAlign = "left";

        //Update character count onKeyUp in exemptionCommentBox
        let exemptionCommentBoxOnKeyUpHandler = function () {
            let currLength = exemptionCommentBox.value.length;
            characterCount.innerText = (exemptionCommentBox.maxLength - currLength) + " " + charactersRemainingLocalizedText;
        }
        exemptionCommentBox.onkeyup = exemptionCommentBoxOnKeyUpHandler;

        content.appendChild(exemptionsTable);
        content.appendChild(exemptionCommentBox);
        content.appendChild(characterCount);

        //Load previous exemption values
        let previousResponseValues = survey.getValue(exemptionResponseId);
        if (previousResponseValues != null) {
            for (let previousResponseValue of previousResponseValues) {
                if (previousResponseValue.exemptionId == applicableExemption.exemptionId) {
                    invokeExemptionCheckbox.checked = (previousResponseValue.exemptionInvoked == true);
                    exemptionCommentBox.value = previousResponseValue.exemptionComment;
                }
            }
        }
        //Update character coutnt
        exemptionCommentBoxOnKeyUpHandler();

        exemptionInputs.push({
            exemptionName: applicableExemption.exemptionName,
            exemptionId: applicableExemption.exemptionId,
            invokeCheckbox: invokeExemptionCheckbox,
            commentBox: exemptionCommentBox
        });

        invokeExemptionCheckbox.onchange = function () {
            let exemptionValues = [];
            for (let exemptionInput of exemptionInputs) {
                exemptionValues.push({
                    exemptionName: exemptionInput.exemptionName,
                    exemptionId: exemptionInput.exemptionId,
                    exemptionInvoked: exemptionInput.invokeCheckbox.checked,
                    exemptionComment: exemptionInput.commentBox.value
                });
            }
            survey.setValue((exemptionResponseId), exemptionValues);
        }

        exemptionCommentBox.onchange = function () {
            let exemptionValues = [];
            for (let exemptionInput of exemptionInputs) {
                exemptionValues.push({
                    exemptionName: exemptionInput.exemptionName,
                    exemptionId: exemptionInput.exemptionId,
                    exemptionInvoked: exemptionInput.invokeCheckbox.checked,
                    exemptionComment: exemptionInput.commentBox.value
                });
            }
            survey.setValue((exemptionResponseId), exemptionValues);
        }
    }
}



async function getApplicableExemptions(provisionNameEn) {
    let exemptionFilterFetchXml = [
        "<fetch>",
        "  <entity name='ts_exemptionfilter'>",
        "    <filter>",
        "      <condition attribute='statecode' operator='eq' value='0'/>",
        "    </filter>",
        "    <link-entity name='qm_rclegislation' from='qm_rclegislationid' to='ts_provision' alias='ts_provision'>",
        "      <attribute name='ts_nameenglish'/>",
        "      <attribute name='ts_namefrench'/>",
        "      <filter>",
        "        <condition attribute='ts_nameenglish' operator='eq' value='", provisionNameEn , "'/>",
        "      </filter>",
        "    </link-entity>",
        "    <link-entity name='ts_exemption' from='ts_exemptionid' to='ts_exemption' alias='ts_exemption'>",
        "      <attribute name='ts_name'/>",
        "      <attribute name='ts_exemptionid'/>",
        "    </link-entity>",
        "  </entity>",
        "</fetch>"
    ].join("");
    exemptionFilterFetchXml = "?fetchXml=" + encodeURIComponent(exemptionFilterFetchXml);
    return await parent.Xrm.WebApi.retrieveMultipleRecords("ts_exemptionfilter", exemptionFilterFetchXml).then(function success(results) {
        if (results.entities.length > 0) {
            let exemptionObject = {
                provisionNameEn: results.entities[0]["ts_provision.ts_nameenglish"],
                provisionNameFr: results.entities[0]["ts_provision.ts_namefrench"],
                exemptionName: results.entities[0]["ts_exemption.ts_name"],
                exemptionId: results.entities[0]["ts_exemption.ts_exemptionid"],
            }
            return exemptionObject;
        } else {
            return null;
        }
    });
}

function InitialContext(executionContext) {
    window.parentExecutionContext = executionContext;
    window.parentFormContext = executionContext.getFormContext();
}

function InitialFormContext(formContext) {
    window.parentFormContext = formContext;
}

function InitializeSurveyRender(surveyDefinition, surveyResponse, surveyLocale, mode, eContext) {

    if (surveyDefinition == null) {
        return;
    }

    var questionnaireDefinition = JSON.parse(surveyDefinition);
    window.survey = new Survey.Model(questionnaireDefinition);
    survey.locale = surveyLocale;
    survey.showCompletedPage = false;
    survey.mode = mode;

    if (surveyResponse != null) {
        survey.data = JSON.parse(surveyResponse);
    }

    survey.onComplete.add(function (survey, options) {
        // When survey is completed, parse the resulting JSON and save it to ovs_questionnaireresponse
        var data = JSON.stringify(survey.data, null, 3);
        window.parentFormContext.getAttribute('ovs_questionnaireresponse').setValue(data.trim());

        // In order to keep the survey in place without showing a thank you or blank page
        // Set the state to running, keep the data and go to the first page
        survey.clear(false, true);
        survey.render();

        //When the survey is saved, reset the notification timer.
        timeSinceLastNotification = null;
    });

    survey.onAfterRenderSurvey.add(function (survey, options) {
        // Hide complete button after survey renders.
        $('.sv_complete_btn').remove();
    });

    survey.onValueChanged.add(function (survey, options) {
        //Adding a space to the questionnaireresponse to make the form dirty. The space gets trimmed off in survey.onComplete.
        var data = JSON.stringify(survey.data, null, 3) + " ";
        if (window.parentFormContext != null) window.parentFormContext.getAttribute('ovs_questionnaireresponse').setValue(data);
    });

    //Show an unsaved changes notification after 10 minutes when a value is changed.
    survey.onValueChanged.add(function (survey, options) {

        if (timeSinceLastNotification == null) timeSinceLastNotification = Date.now();

        if (Date.now() - timeSinceLastNotification < 600000) return;

        // define notification object
        var notification =
        {
            type: 1,
            level: 3, //warning
            message: unsavedNotificationMessage
        }

        parent.Xrm.App.addGlobalNotification(notification);

        timeSinceLastNotification = Date.now();
    });

    survey.onValueChanged.add(function (survey, options) {
        const el = document.getElementById(options.name);
        if (el) {
            el.value = options.value;
        }
    });

    //Create showdown markdown converter
    var converter = new showdown.Converter();
    survey.onTextMarkdown.add(function (survey, options) {
        //convert the markdown text to html
        var str = converter.makeHtml(options.text);
        if (str.indexOf("<p>") == 0) {
            //remove root paragraphs<p></p>
            str = str.substring(3);
            str = str.substring(0, str.length - 4);
        }
        //set html
        options.html = str;
    });


    // Add a character count and limit to Comment questions.
    // If the maxLength is the default value of -1, set maxLength to 2000.
    // No character count if maxLength was set to 0
    survey.onAfterRenderQuestion.add(function (survey, options) {
        if (options.question.getType() !== "comment") return;
        var comment = options.htmlElement.getElementsByTagName('textarea')[0];
        var maxLength = options.question.maxLength;
        if (maxLength == -1) {
            maxLength = 2000;
        }
        if (maxLength !== 0) {
            comment.setAttribute("maxLength", maxLength);
            var div = document.createElement("div");
            div.style.textAlign = "left";
            comment.parentNode.appendChild(div);
            var changingHandler = function () {
                var currLength = comment.value.length;
                div.innerText = (maxLength - currLength) + " " + charactersRemainingLocalizedText;
            }
            changingHandler();
            comment.onkeyup = changingHandler;
        }
    });
    
    survey.onValidateQuestion.add(function (sender, options) {
        if (options.question.getType() == "finding") {
            //Add error if any findingTypes are Undecided
            if (options.value.operations != null) {
                let hasUndecided = false;
                for (let operation of options.value.operations) {
                    if (operation.findingType == 717750000) {
                        hasUndecided = true;
                    }
                }
                if (hasUndecided) {
                    options.error = undecidedFindingTypeErrorLocalizedText;
                }
            }
            //Add error if comment is empty
            if (options.value.comments == "" && options.question.isRequired) {
                //If there's already error text, add a line break
                if (options.error != null) {
                    options.error += "<br>" + provideDetailsLocalizedText;
                } else {
                    options.error = provideDetailsLocalizedText;
                }
            }
        }
    });
    

    function appendDetailToQuestion(survey, options) {
        var detailSurveyId = options.question.name + "-Detail";
        var detailLabel = "";
        if (lang == 1036) {
            detailLabel = options.question.detailFrenchText || "Détail";
        } else {
            detailLabel = options.question.detailEnglishText || "Detail";
        }
        //Create HTML elements

        var question = options.htmlElement;
        var detailContainer = document.createElement("div");
        var header = document.createElement("div");
        var content = document.createElement("div");
        var detailText = document.createElement("span");
        var detailSymbol = document.createElement("span");
        var detailBox = document.createElement("textarea");
        var characterCount = document.createElement("span");

        if (survey.mode == "display") {
            detailBox.readOnly = true;
        }
        /* Append HTML elements to each other forming the following structure

        <div id="detailContainer">
            <div id="header">
            <span id="detailSymbol"></span>
                <span id="detailText"></span>
            </div>
            <div id="content">
                <textarea id="detailBox"></textarea>
                <span id="characterCount"></span>
            </div>
        </div>
        */

        header.appendChild(detailSymbol);
        header.appendChild(detailText);
        content.appendChild(detailBox);
        content.appendChild(characterCount);
        detailContainer.appendChild(header);
        detailContainer.appendChild(content);
        question.appendChild(detailContainer);

        //Set Styles, Classes, and text

        detailContainer.style.marginTop = "10px";
        header.style.backgroundColor = "#d3d3d3";
        header.style.padding = "2px";
        header.style.cursor = "pointer";
        header.style.fontWeight = "bold";
        detailBox.className = "form-control";
        detailBox.rows = 3;
        detailBox.cols = 50;
        detailBox.maxLength = 2000;
        detailBox.style.resize = "vertical";
        characterCount.style.textAlign = "left";
        detailText.innerHTML = detailLabel;
        content.style.display = "block";
        detailSymbol.innerHTML = "- ";

        //Load previous detailBox text
        if (survey.getValue(detailSurveyId) != null) {
            detailBox.value = survey.getValue(detailSurveyId);
        }

        //Add functionality to HTML elements

        //Update character count onKeyUp in detailBox
        var detailBoxOnKeyUpHandler = function () {
            var currLength = detailBox.value.length;
            characterCount.innerText = (detailBox.maxLength - currLength) + " " + charactersRemainingLocalizedText;
        }
        detailBoxOnKeyUpHandler();
        detailBox.onkeyup = detailBoxOnKeyUpHandler;

        //Update detail text in survey response
        detailBox.onchange = function () {
            survey.setValue((options.question.name + "-Detail"), detailBox.value);
        }

        //Toggle visibilty of content when header is clicked
        header.onclick = function () {
            if (content.style.display == "block" && detailBox.value == "") {
                content.style.display = "none";
                detailSymbol.innerHTML = "+ ";
            } else {
                content.style.display = "block";
                detailSymbol.innerHTML = "- ";
            }
        };

    }

    //Add Detail content to questions when they are rendered in the survey
    survey
        .onAfterRenderQuestion
        .add(function (survey, options) {
            if (options.question.getType() == "finding") {
                if (survey.mode == "display") {
                    var comment = options.htmlElement.getElementsByTagName('textarea')[0];
                    comment.readOnly = true;
                }
            }
            //Load JSON definition, find current question, check hasDetail
            if (options.question.hasDetail == true) {
                appendDetailToQuestion(survey, options);
            }

            if (options.question.applicableProvisionsData != null) {
                appendApplicableProvisionsData(survey, options);
                appendExemptions(survey, options);
            }
        });

    survey
        .onUpdateQuestionCssClasses
        .add(function (survey, options) {
            var classes = options.cssClasses

            if (options.question.isRequired) {
                classes.title += " sq-title-required";
            }
            if (options.question.getType() == "finding") {
                classes.title += " sq-title-finding";
            }
        });

    $('#surveyElement').Survey({
        model: survey
    });

}

function DoComplete() {
    var currentPageNo = survey.currentPageNo;
    window.survey.doComplete();
    survey.currentPage = currentPageNo;
} 
