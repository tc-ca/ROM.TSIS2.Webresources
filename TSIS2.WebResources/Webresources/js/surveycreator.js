// Show Designer, Test Survey, JSON Editor and additionally Logic tabs
var options = {
    showLogicTab: true,
    showTranslationTab: true,
    haveCommercialLicense: true 
  };
  // Create showdown markdown converter
  var converter = new showdown.Converter();
  //create the SurveyJS Creator and render it in div with id equals to "creatorElement"
  var creator = new SurveyCreator.SurveyCreator('creatorElement', options);
  //Show toolbox in the right container. It is shown on the left by default
  creator.showToolbox = 'right';
  //Show property grid in the right container, combined with toolbox
  creator.showPropertyGrid = 'right';
  //Make toolbox active by default
  creator.rightContainerActiveItem('toolbox');
  creator.onTestSurveyCreated.add(function (sender, options) {
    options.survey.onTextMarkdown.add(function (survey, options) {
      //convert the markdown text to html
      var str = converter.makeHtml(options.text);
      //remove root paragraphs <p></p>
      str = str.substring(3);
      str = str.substring(0, str.length - 4);
      //set html
      options.html = str;
    });
  });
  
  function InitializeSurveyCreator(surveyDefinition, surveyLocale) {
    if (surveyDefinition !== null && surveyDefinition !== undefined) {
      creator.JSON = JSON.parse(surveyDefinition);
    }
    SurveyCreator.localization.currentLocale = surveyLocale;
  }
  
  function GetSurveyDefinition() {
    return JSON.stringify(creator.JSON);
  }
  
