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

//Returns a sorted array of all Provision names that are not non-imperative
async function retrieveProvisionNames() {
    //Initialize array to collect retrieved provisions
    var provisions = [];
    //Retrieve first 5000 provisions that are not non-imperative
    let result = await parent.Xrm.WebApi.retrieveMultipleRecords("qm_rclegislation", `?$select=qm_name,qm_ordernbr&$filter=(_ts_provisioncategory_value ne 18adfa7f-33f5-eb11-94ef-000d3af36036)`);
    //Add results to provisions array
    provisions = provisions.concat(result.entities);
    //result.nextLink is a URL to the next page of 5000 provisions 
    //Track nextLink URL
    let nextLink = result.nextLink;
    //Continue to retrieve provisions in groups of 5000 until no more pages remain
    while (nextLink != null) {
        //Parse the search options from the nextLink URL
        let options = new URL(nextLink).search;
        //Retrieve next page of provisions
        let nextLinkResult = await parent.Xrm.WebApi.retrieveMultipleRecords("qm_rclegislation", options);
        //Add the retrieved provisions to the previously retrieved provisions
        provisions = provisions.concat(nextLinkResult.entities);
        //update nextLink value
        nextLink = nextLinkResult.nextLink;
    }
    //Sort the provisions by order numbers
    provisions.sort(function (a, b) { return a.qm_ordernbr - b.qm_ordernbr });
    let provisionNames = [];
    //Populate an array of just the provision names
    for (provision of provisions) {
        provisionNames.push(provision.qm_name);
    }
    return provisionNames;
}

let provisionNames = [];

var autocompleteEditor = {
    render: async function (editor, htmlElement) {
        var form = document.createElement("form");
        form.setAttribute("autocomplete", "off");
        var div = document.createElement("div");
        div.className = " autocomplete";
        var input = document.createElement("input");
        input.setAttribute("id", "myInput");
        if (provisionNames.length === 0) provisionNames = await retrieveProvisionNames();
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
    .locales["fr"].p.findingType = "Type de finding";
SurveyCreator
    .localization
    .locales["fr"].p.applicableProvisions = "Constatations applicables";

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
        .orderedQuestions = ["radiogroup", "checkbox", "dropdown", "finding", "bootstrapdatepicker", "comment", "image", "imagepicker", "file", "boolean", "text", "multipletext", "matrix", "matrixdropdown", "matrixdynamic", "signaturepad", "rating", "expression", "html", "panel", "paneldynamic" , "flowpanel"];

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

//When the applicableProvisions property is changed, update the question's applicableProvisionsData property.
creator.onPropertyValueChanging.add(async function (sender, options) {
    if (options.propertyName == "applicableProvisions") {
        const provisionNames = options.newValue.split("|");
        const applicableProvisionsData = [];
        for (let provisionName of provisionNames) {
            applicableProvisionsData.push(await gatherapplicableProvisionsData(provisionName));
        }
        options.obj.applicableProvisionsData = applicableProvisionsData;
    }
});

//Takes a provision name and returns an object with the provision data needed in the applicableProvisionsData property for that provision
async function gatherapplicableProvisionsData(provisionName) {
    let applicableProvisionsData = await parent.Xrm.WebApi.retrieveMultipleRecords("qm_rclegislation", `?$filter=(ts_nameenglish eq '${provisionName}' or ts_namefrench eq '${provisionName}')`).then(
        async function success(result) {
            if (result.entities.length > 0) {
                let provision = result.entities[0];
                let provisionData = {
                    provisionId: provision.qm_rclegislationid,
                    provisionNameEn: provision.ts_nameenglish,
                    provisionNameFr: provision.ts_namefrench,
                    provisionTextEn: await buildProvisionText(provision, 1033),
                    provisionTextFr: await buildProvisionText(provision, 1036),
                }
                return provisionData;
            }
        },
        function (error) {
            console.log(error.message);
            // handle error conditions
        }
    );
    return applicableProvisionsData;
}

//Create the custom editor for provision selection.
//Uses an AriaAutocomplete input to select multiple provision names
//Provision names are divided by '|' character
var provisionsSelectionEditor = {
    render: async function (editor, htmlElement) {
        if (provisionNames.length === 0) provisionNames = await retrieveProvisionNames();
        var div = document.createElement("div");
        div.style.position = "initial";
        var input = document.createElement("input");
        input.value = editor.koValue() || "";
        div.appendChild(input);
        htmlElement.appendChild(div);
        const autocomplete = AriaAutocomplete(input, {
            source: provisionNames,
            onItemRender: ({ label }) => {
                if (!autocomplete.options.source.includes(label)) {
                    return `Add ${label}...`;
                }
                return label;
            },
            multiple: true,
            minLength: 1,
            multipleSeparator: "|"
        });
        input.onchange = function () {
            editor.koValue(input.value);
        }
        editor.onValueUpdated = function (newValue) {
            input.value = editor.koValue() || "";
        }
    }
};

SurveyCreator
    .SurveyPropertyEditorFactory
    .registerCustomEditor("provisionsSelection", provisionsSelectionEditor);

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
    detailBox.maxLength = 10000;
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
            options
                .survey
                .onAfterRenderQuestion
                .add(function (survey, options) {
                    if (options.question.applicableProvisionsData == null || options.question.applicableProvisionsData == undefined) return;
                    appendApplicableProvisionsData(survey, options);
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
            options
                .survey
                .onAfterRenderQuestion
                .add(function (survey, options) {
                    if (options.question.applicableProvisionsData == null || options.question.applicableProvisionsData == undefined) return;
                    appendApplicableProvisionsData(survey, options);
                });
        }
    });

// Add a character count and limit to Comment questions.
// If the maxLength is the default value of -1, set maxLength to 5000.
// No character count if maxLength was set to 0
function appendCharacterCountToQuestion(survey, options) {
    var comment = options.htmlElement.getElementsByTagName('textarea')[0];
    var maxLength = options.question.maxLength;
    if (maxLength == -1) {
        maxLength = 5000;
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
    var json = JSON.parse(surveyDefinition);
    json.locale = surveyLocale;
    creator.JSON = json;
  }
  SurveyCreator.localization.currentLocale = surveyLocale;
}

function GetSurveyDefinition() {
  return JSON.stringify(creator.JSON);
}