var lang = parent.Xrm.Utility.getGlobalContext().userSettings.languageId;

var charactersRemainingLocalizedText;
var detailTextAddLocalizedText;
var detailTextMinusLocalizedText;
var submitLocalizedText;

if (lang == 1036) {
    charactersRemainingLocalizedText = "caractères restants";
    submitLocalizedText = "Soumettre";
    provideDetailsLocalizedText = "Veuillez fournir des détails de l'inspection.";
}
else {
    charactersRemainingLocalizedText = "characters remaining";
    submitLocalizedText = "Submit";
    provideDetailsLocalizedText = "Please provide inspection details.";
}

// Show Designer, Test Survey, JSON Editor and additionally Logic tabs
var options = {
    showLogicTab: true,
    showTranslationTab: true,
    haveCommercialLicense: true 
  };


/*Grab provision labels to populate autocomplete. Filter out Non-Imperative provisions*/
var provisionNames = [];
parent.Xrm.WebApi.retrieveMultipleRecords("qm_rclegislation", `?$select=qm_name,qm_ordernbr&$filter=(_ts_provisioncategory_value ne 18adfa7f-33f5-eb11-94ef-000d3af36036)`).then(
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
    .locales["fr"].p.hasDetail = "Champ détail ?";
SurveyCreator
    .localization
    .locales["fr"].p.detailEnglishText = "Description champ détail englais";
SurveyCreator
    .localization
    .locales["fr"].p.detailFrenchText = "Description champ détail français";
SurveyCreator
    .localization
    .locales["fr"].p.provision = "Dispositions";
SurveyCreator
    .localization
    .locales["fr"].p.findingType = "Finding Type FR";

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

//add hasDetail and detail Text properties to all questions in hasDetailQuestions array
var hasDetailQuestions = ["radiogroup", "checkbox", "dropdown", "image", "imagepicker", "file", "boolean", "matrix", "matrixdropdown", "matrixdynamic", "signaturepad", "rating", "expression", "html", "panel", "paneldynamic", "flowpanel"];
hasDetailQuestions.forEach(function (questionName) {
    Survey
        .Serializer
        .addProperty(questionName, {
            name: "hasDetail:switch",
            category: "general",
            default: true
        });
    Survey
        .Serializer
        .addProperty(questionName, {
            name: "detailEnglishText:string",
            category: "general",
            dependsOn: ["hasDetail"],
            visibleIf: function (obj) {
                return (obj.hasDetail == true);
            },
            default: "Detail"
        });
    Survey
        .Serializer
        .addProperty(questionName, {
            name: "detailFrenchText:string",
            category: "general",
            dependsOn: ["hasDetail"],
            visibleIf: function (obj) {
                return (obj.hasDetail == true);
            },
            default: "Détail"
        });
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

    //Expand content if detailBox has text saved previously, and load previous detailBox text
    if (survey.getValue(detailSurveyId) != null) {
        detailBox.value = survey.getValue(detailSurveyId);
        content.style.display = "block";
        detailSymbol.innerHTML = "- ";
    } else {
        content.style.display = "none";
        detailSymbol.innerHTML = "+ ";
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
        survey.setValue((options.question.name +"-Detail"), detailBox.value);
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

    //Toggle visibilty of Detail when hasDetail property is changed in creator
    options.question.registerFunctionOnPropertyValueChanged("hasDetail", function () {
        if (options.question.hasDetail == true) {
            detailContainer.style.display = "block";
        } else {
            detailContainer.style.display = "none";
        }
    });

    //Change detailText text when detail Text property of current language is changed
    if (lang == 1036) {
        options.question.registerFunctionOnPropertyValueChanged("detailFrenchText", function () {
            detailText.innerHTML = options.question.detailFrenchText
        });
    } else {
        options.question.registerFunctionOnPropertyValueChanged("detailEnglishText", function () {
            detailText.innerHTML = options.question.detailEnglishText
        });
    }
    
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
            options
                .survey
                .onAfterRenderQuestion
                .add(function (survey, options) {
                    if (options.question.getType() !== "finding") return;
                    options.question.nameID = options.question.id
                    options.question.name = `finding-${options.question.nameID}`;
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

// Add a character count and limit to Comment questions.
// If the maxLength is the default value of -1, set maxLength to 1000.
// No character count if maxLength was set to 0
function appendCharacterCountToQuestion(survey, options) {
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
}

//Add Character Count to Comment questions when they are rendered in the survey designer and test survey
creator
    .onSurveyInstanceCreated
    .add(function (sender, options) {
        //If survey instance in survey designer is created
        if (options.reason == "designer") {
            options
                .survey
                .onAfterRenderQuestion
                .add(function (survey, options) {
                    if (options.question.getType() !== "comment") return;
                    appendCharacterCountToQuestion(survey, options);
                });
        }
        //If Test Survey instance is created
        if (options.reason == "test") {
            options
                .survey
                .onAfterRenderQuestion
                .add(function (survey, options) {
                    if (options.question.getType() !== "comment") return;
                    appendCharacterCountToQuestion(survey, options);
                });
        }
    });

//Add custom validation to finding questions during test survey
creator
    .onSurveyInstanceCreated
    .add(function (sender, options) {
        //If Test Survey instance is created
        if (options.reason == "test") {
            options
                .survey
                .onValidateQuestion
                .add(function (sender, options) {
                    //If it is a finding that is required, with an empty comment
                    if (options.question.getType() == "finding" && options.question.isRequired && options.value.comments == "") {
                        options.error = provideDetailsLocalizedText;
                    }
                });
        }
    });

//Add isOverallInspectionComment property to comment questions
Survey
    .Serializer
    .addProperty("comment", {
        name: "isOverallInspectionComments:switch",
        category: "general",
        default: false
    });

//When isOverallInspectionComment property is toggled to true, change the name of the question to Overall Inspection Comment
//Consistent naming is needed for the Work Order Inspection Report
creator.onPropertyValueChanging.add(function (sender, options) {
    if (options.propertyName == "isOverallInspectionComments") {
        if (options.newValue == true) {
            options.obj.name = "Overall Inspection Comments"
        } else {
            options.obj.name = options.obj.title;
        }
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