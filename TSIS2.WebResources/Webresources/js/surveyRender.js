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
    // If the maxLength is the default value of -1, set maxLength to 1000.
    // No character count if maxLength was set to 0
    survey.onAfterRenderQuestion.add(function (survey, options) {
        if (options.question.getType() !== "comment") return;
        var comment = options.htmlElement.getElementsByTagName('textarea')[0];
        var maxLength = options.question.maxLength;
        if (maxLength == -1) {
            maxLength = 1000;
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
        detailBox.maxLength = 1000;
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
            characterCount.innerText = (1000 - currLength) + " " + charactersRemainingLocalizedText;
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
            if (options.question.hasDetail != true) return;
            appendDetailToQuestion(survey, options);
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
