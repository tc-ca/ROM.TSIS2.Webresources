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
        window.parentFormContext.getAttribute('ovs_questionnaireresponse').setValue(data);

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
        // Trigger form to be "dirty" when there is a change to the questionnaire by clearing out the ovs_questionnaireresponse
        // This looks dangerous but the response will be reparsed and saved on completing the questionnaire.
        window.parentFormContext.getAttribute('ovs_questionnaireresponse').setValue("{}");
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

    $('#surveyElement').Survey({
        model: survey
    });

}

function DoComplete() {
    window.survey.doComplete();
} 
