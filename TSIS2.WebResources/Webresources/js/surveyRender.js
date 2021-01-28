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
  survey.mode = mode;

  if (surveyResponse != null) {
    survey.data = JSON.parse(surveyResponse);
  }

  survey.onComplete.add(function (result) {
    SaveAnswers(result);

    // const surveyPDF = new SurveyPDF.SurveyPDF(json);
    // surveyPDF.data = survey.data;
    // surveyPDF.raw('dataurlstring').then(function (dataurl) {
    //   SavePDF(dataurl);
    // });
  });

  //Create showdown markdown converter
  var converter = new showdown.Converter();
  survey
    .onTextMarkdown
    .add(function (survey, options) {
        //convert the markdown text to html
        var str = converter.makeHtml(options.text);
        //remove root paragraphs <p></p>
        str = str.substring(3);
        str = str.substring(0, str.length - 4);
        //set html
        options.html = str;
    });

  $('#surveyElement').Survey({
    model: survey,
    onValueChanged: surveyValueChanged,
  });

  $('.sv-btn.sv-footer__complete-btn').hide();
}

function SaveAnswers(userInput) {
  var data = JSON.stringify(userInput.data, null, 3);
  window.parentFormContext.getAttribute('ovs_questionnairereponse').setValue(data);
}

const surveyValueChanged = function (sender, options) {
  const el = document.getElementById(options.name);
  if (el) {
    el.value = options.value;
  }
};

function DoComplete() {
  window.survey.doComplete();
}
// const createAnnotation = function (regarding, fileInfo, documentBody) {
//   /// <param name='regrding' type='MobileCRM.Refernce'/>
//   /// <param name='fileInfo' type='MobileCRM.Settings._fileInfo'/>
//   /// <param name='documentBody' type='base64'>File base 64 string.<param>

//   var note = {
//     filename: 'PDFReport.pdf',
//     mimetype: 'application/pdf',
//     isdocument: true,
//     documentbody: documentBody.slice(documentBody.indexOf(',') + 1) || ' ',
//     subject: 'PDF report doucment',
//     notetext: 'Survey JS questionnaire PDF report',
//     'objectid_tc_tcinspection@odata.bind': '/tc_tcinspections(' + regarding + ')',
//   };

//   parent.Xrm.WebApi.createRecord('annotation', note).then(
//     function success(result) {
//       console.log('Document saved: ' + result.id);
//       // perform operations on record creation
//     },
//     function (error) {
//       console.log(error.message);
//       // handle error conditions
//     }
//   );
// };

// function SavePDF(text) {
//   createAnnotation(tc_tcinspectionid.replace(/[{}]/g, ''), 'PDFReport.pdf', text);
//   return true;
// }
