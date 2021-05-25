//Set to 1033 by default. Update with parent.Xrm if it can, else use locale if it's been set in time.
var lang = '1033';
if (parent.Xrm != null) {
    lang = parent.Xrm.Utility.getGlobalContext().userSettings.languageId;
} else if (locale != undefined) {
    lang = (locale == 'fr') ? 1036 : 1033;
}

var charactersRemainingLocalizedText;
var detailTextAddLocalizedText;
var detailTextMinusLocalizedText;

if (lang == 1036) {
    charactersRemainingLocalizedText = "caractères restants";
}
else {
    charactersRemainingLocalizedText = "characters remaining";
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

function InitializeSurveyRender(surveyDefinition, surveyResponse, surveyLocale, mode) {

    if (surveyDefinition == null) {
        return;
    }

    var questionnaireDefinition = JSON.parse(surveyDefinition);
    questionnaireDefinition.pages.forEach(function (page, index) {
        for (var i = 0; i < page.elements.length; i++) {
            page.elements[i].visibleIf = null;
            if (index >= 1) questionnaireDefinition.pages[0].elements.push(page.elements[i]);
        }
    });
    window.survey = new Survey.Model(questionnaireDefinition);
    survey.locale = surveyLocale;
    survey.showCompletedPage = false;
    survey.mode = mode;

    if (surveyResponse != null) {
        survey.data = JSON.parse(surveyResponse);
    }

    survey.onAfterRenderHeader.add(function (survey, options) {
        // Hide complete button after survey renders.
        $('.sv_complete_btn').hide();
    });

    survey.onAfterRenderSurvey.add(function (survey, options) {
        // Hide complete and next button after survey renders.
        $('.sv_complete_btn').hide();
        $('.sv_next_btn').hide();
    });

    //Create showdown markdown converter
    var converter = new showdown.Converter();
    survey.onTextMarkdown.add(function (survey, options) {
        //convert the markdown text to html
        var str = converter.makeHtml(options.text);
        //remove root paragraphs <p></p>
        str = str.substring(3);
        str = str.substring(0, str.length - 4);
        //set html
        options.html = str;
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

        /* Append HTML elements to each other forming the following structure

        <div id="detailContainer">
            <div id="header">
            <span id="detailSymbol"></span>
                <span id="detailText"></span>
            </div>
            <div id="content">
                <textarea id="detailBox"></textarea>
            </div>
        </div>
        */

        header.appendChild(detailSymbol);
        header.appendChild(detailText);
        content.appendChild(detailBox);
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
        detailBox.rows = 5;
        detailBox.cols = 50;
        detailBox.readOnly = true;
        detailBox.maxLength = 1000;
        detailBox.style.resize = "vertical";
        detailText.innerHTML = detailLabel;
        content.style.display = "block";

        //Load previous detailBox text
        if (survey.getValue(detailSurveyId) != null) detailBox.value = survey.getValue(detailSurveyId);
 
    }

    //Add Detail content to questions when they are rendered in the survey
    survey
        .onAfterRenderQuestion
        .add(function (survey, options) {
            //Load JSON definition, find current question, check hasDetail
            if (options.question.hasDetail != true) return;
            appendDetailToQuestion(survey, options);
        });


    $('#surveyElementPrint').Survey({
        model: survey
    });

}

InitializeSurveyRender(questionnaireDefinition, questionnaireResponse, locale, "edit");
window.print();
window.close();