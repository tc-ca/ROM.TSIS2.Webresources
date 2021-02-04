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
        var div = document.createElement("div");
        div.className = " autocomplete";
        div.setAttribute("id", "myInput");
        var input = document.createElement("input");
        autocomplete(input, provisionNames);
        input.className = "form-control svd_editor_control";
        input.onchange = function () {
            editor.koValue(input.value);
        }
        editor.onValueUpdated = function (newValue) {
            input.value = editor.koValue() || "";
        }
        input.value = editor.koValue() || "";
        div.appendChild(input);
        htmlElement.appendChild(div);
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


//When the provision is changed, update the question's data
creator.onPropertyValueChanging.add(function(sender, options) {
  if(options.propertyName == "provision") {
    parent.Xrm.WebApi.retrieveMultipleRecords("qm_rclegislation", `?$select=qm_name,qm_legislationlbl,qm_legislationetxt,_qm_tylegislationtypeid_value,_qm_rcparentlegislationid_value&$filter=qm_name eq '${options.newValue}'`).then(
      async function success(result) {
        if (result.entities.length > 0) {
          options.obj.title = `Finding ${result.entities[0].qm_legislationlbl}`;
          options.obj.name = `finding-${result.entities[0].qm_name}`;
          options.obj.reference = result.entities[0].qm_legislationlbl;

          options.obj.description = await buildProvisionText(result.entities[0]);

          options.obj.value = {
            provisionReference: options.obj.reference,
            provisionText: options.obj.description,
            comments: options.obj.comments,
            documentaryEvidence: options.obj.file
          }
        }
      },
      function (error) {
          console.log(error.message);
          // handle error conditions
      }
    );
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