var lang = parent.Xrm.Utility.getGlobalContext().userSettings.languageId;

var CharactersRemaining;
var detailTextAdd;
var detailTextMinus;
var submitLocalizedText;

if (lang == 1036) {
    CharactersRemaining = "caractères restants";
    detailTextAdd = "+ Détail";
    detailTextMinus = "- Détail";
    submitLocalizedText = "Soumettre";
}
else {
    CharactersRemaining = "characters remaining";
    detailTextAdd = "+ Detail";
    detailTextMinus = "- Detail";
    submitLocalizedText = "Submit";
}

// Show Designer, Test Survey, JSON Editor and additionally Logic tabs
var options = {
    showLogicTab: true,
    showTranslationTab: true,
    haveCommercialLicense: true 
  };


/*Grab provision labels to populate autocomplete*/
var provisionNames = [];
parent.Xrm.WebApi.retrieveMultipleRecords("qm_rclegislation", `?$select=qm_name,qm_ordernbr`).then(
  function success(result) {
    result.entities.sort(function(a,b){return a.qm_ordernbr - b.qm_ordernbr});
    for (i in result.entities) {
      provisionNames.push(result.entities[i].qm_name);
    }
  }
);

var autocompleteEditor = {
    render: function (editor, htmlElement) {
        var form = document.createElement("form");
        form.setAttribute("autocomplete", "off");
        var div = document.createElement("div");
        div.className = " autocomplete";
        var input = document.createElement("input");
        input.setAttribute("id", "myInput");
        autocomplete(input, provisionNames);
        input.className = "form-control svd_editor_control";
        editor.onValueUpdated = function (newValue) {
            input.value = editor.koValue() || "";
        }
        input.value = editor.koValue() || "";
        var submit = document.createElement("input");
        submit.setAttribute("type", "submit");
        submit.setAttribute("class", "btn btn-primary sv-btn svd-toolbar-button");
        submit.value = submitLocalizedText;
        submit.onclick = function () {
        //Change to empty string first to trigger onChange event even on resubmission of same provision name. Needed to update existing provisions.
          editor.koValue("");
          editor.koValue(input.value);
        }
        div.appendChild(input);
        form.appendChild(div);
        htmlElement.appendChild(form);
        htmlElement.appendChild(submit);
    }
};

var CkEditor_ModalEditor = {
  afterRender: function (modalEditor, htmlElement) {
      if (typeof CKEDITOR === "undefined") 
          return;
      var editor = CKEDITOR.replace(htmlElement);
      var isUpdating = false;
      editor.on("change", function () {
          isUpdating = true;
          modalEditor.editingValue = editor.getData();
          isUpdating = false;
      });
      editor.setData(modalEditor.editingValue);
      modalEditor.onValueUpdated = function (newValue) {
          if (!isUpdating) {
              editor.setData(newValue);
          }
      };
  },
  destroy: function (modalEditor, htmlElement) {
      if (typeof CKEDITOR === "undefined") 
          return;
      var instance = CKEDITOR.instances[htmlElement.id];
      if (instance) {
          instance.removeAllListeners();
          instance.destroy(true);
          CKEDITOR.remove(instance);
      }
  }
};

Survey.surveyLocalization.supportedLocales = ["en", "fr"];

SurveyCreator
    .SurveyPropertyEditorFactory
    .registerCustomEditor("provisionAutoComplete", autocompleteEditor);
SurveyCreator
    .SurveyPropertyModalEditor
    .registerCustomWidget("html", CkEditor_ModalEditor);
SurveyCreator
    .SurveyPropertyModalEditor
    .registerCustomWidget("text", CkEditor_ModalEditor);

var questionDef = SurveyCreator.SurveyQuestionEditorDefinition.definition.question;

//Modify Question Editor. Remove title from general and add it as a tab.
questionDef
    .tabs
    .push({name: "title", index: 1});
SurveyCreator
    .defaultStrings
    .pe
    .tabs["title"] = "Title";
var ind = questionDef
    .properties
    .indexOf("title");
if (ind > -1) 
    questionDef
        .properties
        .splice(ind, 1);

//Create showdown markdown converter
var converter = new showdown.Converter();
function doMarkdown(survey, options) {
    //convert the markdown text to html
    var str = converter.makeHtml(options.text);
    if (str.indexOf("<p>") == 0) {
        //remove root paragraphs<p></p>
        str = str.substring(3);
        str = str.substring(0, str.length - 4);
    }
    //set html
    options.html = str;
}

//Set locale
var surveyLocale = 'en';
if (parent.Xrm.Utility.getGlobalContext().userSettings.languageId == 1036) {
    surveyLocale = 'fr';
}

//Add custom property text localization
SurveyCreator
    .localization
    .locales["fr"].p.hasDetail = "Champ Détail";
SurveyCreator
    .localization
    .locales["fr"].p.provision = "Dispositions";

SurveyCreator
    .localization
    .currentLocale = surveyLocale;

var creator = new SurveyCreator.SurveyCreator("creatorElement", options);
creator.showToolbox = "right";
creator.showPropertyGrid = "right";
creator.rightContainerActiveItem("toolbox");

creator
    .survey
    .onTextMarkdown
    .add(doMarkdown);
creator
    .onDesignerSurveyCreated
    .add(function (editor, options) {
        options
            .survey
            .onTextMarkdown
            .add(doMarkdown);
    });
creator
    .onTestSurveyCreated
    .add(function (editor, options) {
        options
            .survey
            .onTextMarkdown
            .add(doMarkdown);
    });
    creator
    .toolbox
    .orderedQuestions = ["radiogroup", "checkbox", "dropdown", "finding", "comment", "image", "imagepicker", "file", "boolean", "text", "multipletext", "matrix", "matrixdropdown", "matrixdynamic", "signaturepad", "rating", "expression", "html", "panel", "paneldynamic" , "flowpanel"];

//add hasDetail property to all questions in hasDetailQuestions array
var hasDetailQuestions = ["radiogroup", "checkbox", "dropdown", "image", "imagepicker", "file", "boolean", "matrix", "matrixdropdown", "matrixdynamic", "signaturepad", "rating", "expression", "html", "panel", "paneldynamic", "flowpanel"];
hasDetailQuestions.forEach(function (questionName) {
    Survey
        .Serializer
        .addProperty(questionName, {
            name: "hasDetail:switch",
            category: "general",
            default: true
        });
});



function appendDetailToQuestion(survey, options) {
    //Create HTML elements

    var question = options.htmlElement;
    var detailContainer = document.createElement("div");
    var header = document.createElement("div");
    var content = document.createElement("div");
    var detailText = document.createElement("span");
    var detailBox = document.createElement("textarea");
    var characterCount = document.createElement("span");

    /* Append HTML elements to each other forming the following structure

    <div id="detailContainer">
        <div id="header">
            <span id="detailText"></span>
        </div>
        <div id="content">
            <textarea id="detailBox"></textarea>
            <span id="characterCount"></span>
        </div>
    </div>
    */

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

    //Expand content if detailBox has text saved previously, and load previous detailBox text
    if (survey.getValue(options.question.name + "-Detail") != null) {
        detailBox.value = survey.getValue(options.question.name + "-Detail");
        content.style.display = "block";
        detailText.innerHTML = detailTextMinus;
    } else {
        content.style.display = "none";
        detailText.innerHTML = detailTextAdd;
    }

    //Add functionality to HTML elements

    //Update character count onKeyUp in detailBox
    var detailBoxOnKeyUpHandler = function () {
        var currLength = detailBox.value.length;
        characterCount.innerText = (1000 - currLength) + " " + CharactersRemaining;
    }
    detailBoxOnKeyUpHandler();
    detailBox.onkeyup = detailBoxOnKeyUpHandler;

    //Update detail text in survey response
    detailBox.onchange = function () {
        survey.setValue((options.question.name +"-Detail"), detailBox.value);
    }

    //Toggle visibilty of content when header is clicked
    header.onclick = function () {
        if (content.style.display == "block" && detailBox.value == "") {
            content.style.display = "none";
            detailText.innerHTML = detailTextAdd;
        } else {
            content.style.display = "block";
            detailText.innerHTML = detailTextMinus;
        }
    };

    //Toggle visibilty of Detail when hasDetail property is changed in creator
    options.question.registerFunctionOnPropertyValueChanged("hasDetail", function () {
        if (options.question.hasDetail == true) {
            detailContainer.style.display = "block";
        } else {
            detailContainer.style.display = "none";
        }
    });
}

//Add Detail content to questions when they are rendered in the survey designer and test survey
creator
    .onSurveyInstanceCreated
    .add(function (sender, options) {
        //If we are creating a surface for designer surface
        if (options.reason == "designer") {
            options
                .survey
                .onAfterRenderQuestion
                .add(function (survey, options) {
                    if (options.question.hasDetail != true) return;
                    appendDetailToQuestion(survey, options);
                });
        }
        //If we are creating a surface for "Test Survey" tab
        if (options.reason == "test") {
            options
                .survey
                .onAfterRenderQuestion
                .add(function (survey, options) {
                    if (options.question.hasDetail != true) return;
                    appendDetailToQuestion(survey, options);
                });
        }
    });

//When the provision is changed, update the question's data. Ignore changes to empty strings
creator.onPropertyValueChanging.add(function (sender, options) {
    if (options.propertyName == "provision" && options.newValue != "") {
    updateQuestionProvisionData(options.obj, options.newValue);
  }
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