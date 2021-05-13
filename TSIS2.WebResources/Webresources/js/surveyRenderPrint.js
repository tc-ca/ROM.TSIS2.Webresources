var lang = parent.Xrm.Utility.getGlobalContext().userSettings.languageId;

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
    var questionnaireDefinition = JSON.parse(surveyDefinition);
    questionnaireDefinition.pages.forEach(function (page) {
        for (var i = 0; i < page.elements.length; i++) {
            page.elements[i].visibleIf = null;
        }
    });
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
    });

    survey.onAfterRenderSurvey.add(function (survey, options) {
        // Hide complete button after survey renders.
        $('.sv_complete_btn').hide();
    });

    survey.onValueChanging.add(function (survey, options) {
        //Adding a space to the questionnaireresponse to make the form dirty. The space gets trimmed off in survey.onComplete.
        var data = JSON.stringify(survey.data, null, 3) + " ";
        window.parentFormContext.getAttribute('ovs_questionnaireresponse').setValue(data);
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
        detailBox.maxLength = 1000;
        detailBox.style.resize = "vertical";
        detailText.innerHTML = detailLabel;
        content.style.display = "block";


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

function DoComplete() {
    var currentPageNo = survey.currentPageNo;
    window.survey.doComplete();
    survey.currentPage = currentPageNo;
} 
