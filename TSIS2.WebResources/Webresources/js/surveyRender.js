var lang = parent.Xrm.Utility.getGlobalContext().userSettings.languageId;

var CharactersRemaining;

if (lang == 1036) {
    CharactersRemaining = "caractères restants";
}
else {
    CharactersRemaining = "characters remaining";
}

'use strict';
window.parentExecutionContext = null;
window.parentFormContext = null;
Survey.StylesManager.applyTheme('default');

function InitialContext(executionContext) {
    window.parentExecutionContext = executionContext;
    window.parentFormContext = executionContext.getFormContext();
}

function InitializeSurveyRender(surveyDefinition, surveyResponse, surveyLocale, mode) {

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
                div.innerText = (maxLength - currLength) + " " + CharactersRemaining;
            }
            changingHandler();
            comment.onkeyup = changingHandler;
        }
    });


    $('#surveyElement').Survey({
        model: survey
    });

}

function DoComplete() {
    window.survey.doComplete();
} 
