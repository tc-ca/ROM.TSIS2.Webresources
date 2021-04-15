﻿var lang = parent.Xrm.Utility.getGlobalContext().userSettings.languageId;


var MaxFileSizeAlertText;
var MaxFileSizeAlertTitle;
var InspectorComments;
var ChooseFiles;
var NoFileChosen;
var DocumentaryEvidence;

if (lang == 1036){
    MaxFileSizeAlertText = "Taille de fichier maximum de 10Mb atteinte. Veuillez choisir un autre fichier.";
    MaxFileSizeAlertTitle = "Taille de fichier maximale atteinte !";
    InspectorComments = "Commentaires de l'inspecteur";
    CharactersRemaining = "caractères restants";
    ChooseFiles = "Choisir les fichiers";
    NoFileChosen = "Aucun fichier choisi";
    DocumentaryEvidence = "La preuve documentaire";
}
else{
    MaxFileSizeAlertText = "The maximum file size of 10 MB has been exceeded. Please choose another file.";
    MaxFileSizeAlertTitle = "Maximum file size exceeded !";
    InspectorComments = "Inspector Comments";
    CharactersRemaining = "characters remaining";
    ChooseFiles = "Choose Files";
    NoFileChosen = "No file chosen";
    DocumentaryEvidence = "Documentary Evidence";
}

var widget = {
    //the widget name. It should be unique and written in lowcase.
    name: "finding",
    //the widget title. It is how it will appear on the toolbox of the SurveyJS Editor/Builder
    title: "Finding",
    //the name of the icon on the toolbox. We will leave it empty to use the standard one
    iconName: "",
    //If the widgets depends on third-party library(s) then here you may check if this library(s) is loaded
    widgetIsLoaded: function () {
        //return typeof $ == "function" && !!$.fn.select2; //return true if jQuery and select2 widget are loaded on the page
        return true; //we do not require anything so we just return true.
    },
    //SurveyJS library calls this function for every question to check, if it should use this widget instead of default rendering/behavior
    isFit: function (question) {
        //we return true if the type of question is textwithbutton
        return question.getType() === "finding";
        //the following code will activate the widget for a text question with inputType equals to date
        //return question.getType() === 'text' && question.inputType === "date";
    },
    //Use this function to create a new class or add new properties or remove unneeded properties from your widget
    //activatedBy tells how your widget has been activated by: property, type or customType
    //property - it means that it will activated if a property of the existing question type is set to particular value, for example inputType = "date"
    //type - you are changing the behaviour of entire question type. For example render radiogroup question differently, have a fancy radio buttons
    //customType - you are creating a new type, like in our example "textwithbutton"
    activatedByChanged: function (activatedBy) {
        //we do not need to check acticatedBy parameter, since we will use our widget for customType only
        //We are creating a new class and derived it from text question type. It means that text model (properties and fuctions) will be available to us
        Survey.JsonObject.metaData.addClass("finding", [
            { name: "provision", category: "general", visibleIndex: 0, type: "provisionAutoComplete" },
            { name: "name", readOnly: true },
            { name: "description", type: "textarea" },
            { name: "reference" },
            { name: "nameID" },
            { name: "inspectorComments", default: "test" },
            { name: "file"}
        ], null, "text");

    },
    //If you want to use the default question rendering then set this property to true. We do not need any default rendering, we will use our our htmlTemplate
    isDefaultRender: false,
    //You should use it if your set the isDefaultRender to false
    htmlTemplate:
        `<div> <div class="form-group"> <label for="comment" style="padding-top: 15px;"> <span class="field-name">${InspectorComments}</span> </label> <textarea type="text" class="form-control inspectorComments" rows="3" cols="50" maxlength="1000"></textarea> <span class="character-count"></span> </div> <div class="form-group" style="padding-top: 10px;"> <label for="file" style="padding-bottom: 2px; margin-bottom: 0px;"> <span class="field-name">${DocumentaryEvidence}</span> </label> <input type="file" class="sv_q_file_input file" multiple="true" style="padding-top: 2px;"></input> <p class="evidenceText"></p> </div> </div>`,
    //The main function, rendering and two-way binding
    afterRender: function (question, el) {
        //el is our root element in htmlTemplate, is "div" in our case
        //get the text element
        var comments = el.getElementsByClassName("inspectorComments")[0];
        var characterCount = el.getElementsByClassName("character-count")[0];
        var file = el.getElementsByClassName("file")[0];
        var fileText = el.getElementsByClassName("evidenceText")[0];
        var fileArray = [];

        //The form has data to load
        if (question.value != null) {
            //Populate question property and form value
            question.inspectorComments = question.value.comments || "";
            comments.value = question.value.comments || "";
            
            question.file = question.value.documentaryEvidence || [];
            fileArray = question.value.documentaryEvidence || [];
            fileText.innerText = question.value.documentaryEvidence || [];
        }

        function updateCharacterCount() {
            characterCount.innerText = (1000 - comments.value.length) + " " + CharactersRemaining;
        }
        updateCharacterCount();
        comments.onkeyup = updateCharacterCount;

        comments.onchange = function () {
            question.inspectorComments = comments.value;
            question.value = {
                provisionReference: question.reference,
                provisionTextEn: question.locDescription.values.default,
                provisionTextFr: question.locDescription.values.fr,
                comments: comments.value,
                documentaryEvidence: question.file
            }
        }

        file.onchange = function () {
            for (var i = 0; i < file.files.length; i++) {
                if(validateFile(file.files[i])){
                    fileArray.push(file.files[i]);
                }
            }
            fileText.innerText = fileArray;
            question.file = fileArray;
            question.value = {
                provisionReference: question.reference,
                provisionTextEn: question.locDescription.values.default,
                provisionTextFr: question.locDescription.values.fr,
                comments: comments.value,
                documentaryEvidence: fileArray
            }
        }


        //set the changed value into question value
        onValueChangedCallback = function () {

        }
        onReadOnlyChangedCallback = function () {
            /*
            if (question.isReadOnly) {
              comments.setAttribute("disabled", "disabled");
            } else {
              comments.removeAttribute("disabled");
            }
            */
        };
        //if question becomes readonly/enabled add/remove disabled attribute
        question.readOnlyChangedCallback = onReadOnlyChangedCallback;
        //if the question value changed in the code, for example you have changed it in JavaScript
        //question.valueChangedCallback = onValueChangedCallback;

        //set initial value
        updateQuestionValue(question);
        //set initial readOnly if needed
        onReadOnlyChangedCallback();
    },
    //Use it to destroy the widget. It is typically needed by jQuery widgets
    willUnmount: function (question, el) {
        //We do not need to clear anything in our simple example
        //Here is the example to destroy the image picker
        //var $el = $(el).find("select");
        //$el.data('picker').destroy();
    }
};



//Register our widget in singleton custom widget collection
Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "customtype");

function validateFile(file){
    if(file.size > 10240000){
        var alertString = { title: MaxFileSizeAlertTitle, text: MaxFileSizeAlertText };
        var alertOptions = { height: 150, width: 450 };
        parent.Xrm.Navigation.openAlertDialog(alertString, alertOptions).then(
            function (success) {
                console.log("Alert dialog closed");
            },
            function (error) {
                console.log(error.message);
            }
      );
      return false;
    }
    return true;
}

function updateQuestionValue(question) {
    question.value = {
        provisionReference: question.reference,
        provisionTextEn: question.locDescription.values.default,
        provisionTextFr: question.locDescription.values.fr,
        comments: question.inspectorComments,
        documentaryEvidence: question.file
    }
}

function updateQuestionProvisionData(question, provisionName) {
    /* Questions in the test survey are assigned new question.id's causing duplicate findings in the json.
    question.nameID will grab the id once and stay the same */
    if (question.nameID == null) {
        question.nameID = question.id;
    }
    parent.Xrm.WebApi.retrieveMultipleRecords("qm_rclegislation", `?$select=qm_name,qm_legislationlbl,qm_legislationetxt,qm_legislationftxt,_qm_tylegislationtypeid_value,_qm_rcparentlegislationid_value&$filter=qm_name eq '${provisionName}'`).then(
        async function success(result) {
            if (result.entities.length > 0) {
                question.title = result.entities[0].qm_name;
                question.name = `finding-${question.nameID}`;
                question.reference = result.entities[0].qm_name;

                question.description = await buildProvisionText(result.entities[0], lang);
                question.locDescription.values.default = await buildProvisionText(result.entities[0], 1033);
                question.locDescription.values.fr = await buildProvisionText(result.entities[0], 1036);
            }
        },
        function (error) {
            console.log(error.message);
            // handle error conditions
        }
    );
    if (question.value == null) {
        question.value = {
            provisionReference: question.reference,
            provisionTextEn: question.locDescription.values.default,
            provisionTextFr: question.locDescription.values.fr,
            comments: question.inspectorComments,
            documentaryEvidence: question.file
        }
    }
}

async function buildProvisionText(provision, lang) {
    let provisionText = "";
    provision.qm_name = `<mark>${provision.qm_name}</mark>`;
    provisionText += await gatherAncestorProvisionText(provision, lang);
    provisionText += await gatherDescendentProvisionText(provision, lang);
    return provisionText;
}

async function gatherAncestorProvisionText(provision, lang) {
    //If language is French, use the french text if it exists, else use English. Empty string if it's null.
    let provisionText = "";
    if (lang == 1036) {
        if (provision.qm_legislationftxt) {
            provisionText = provision.qm_legislationftxt;
        } else if (provision.qm_legislationetxt) {
            provisionText = "(fr)" + provision.qm_legislationetxt;
        }
    } else {
        provisionText = provision.qm_legislationetxt || "";
    }
    let provisionType = provision[`_qm_tylegislationtypeid_value@OData.Community.Display.V1.FormattedValue`];

    //Base case. Body provisions don't have any text to display.
    if (provisionType == "Body") {
        return "";
    }
    //Base case. Headings are bold, and have no legislation text next to them
    if (provisionType == "Heading") {
        return `<strong>${provision.qm_name}</strong></br>`;
    }
    let parent = await getParentProvision(provision);
    return await gatherAncestorProvisionText(parent, lang) + `<strong>${provision.qm_name}</strong>: ${provisionText}</br>`;
}

async function gatherDescendentProvisionText(provision, lang) {
    let children = await getChildrenProvisions(provision);
    //Base case. Provision has no children.
    if (children.length == 0) {
        return "";
    }
    let provisionText = "<ul style='list-style-type:none;'>";
    for (var i in children) {
        //If language is French, use the french text, else use English. Empty string if it's null.
        let childText = "";
        if (lang == 1036) {
            if (children[i].qm_legislationftxt) {
                childText = children[i].qm_legislationftxt;
            } else if (children[i].qm_legislationetxt) {
                childText = "(fr)" + children[i].qm_legislationetxt;
            }
        } else {
            childText = children[i].qm_legislationetxt || "";
        }
        provisionText += `<li><strong>${children[i].qm_legislationlbl}</strong> ${childText}</li>` + await gatherDescendentProvisionText(children[i], lang);
    }
    provisionText += "</ul>";
    return provisionText;
}

async function getParentProvision(provision) {
    var result = await parent.Xrm.WebApi.retrieveRecord("qm_rclegislation", provision._qm_rcparentlegislationid_value, `?$select=qm_name,qm_legislationlbl,qm_legislationetxt,qm_legislationftxt,_qm_tylegislationtypeid_value,_qm_rcparentlegislationid_value`);
    return result;
}

async function getSiblingProvisions(provision) {
    var results = await parent.Xrm.WebApi.retrieveMultipleRecords("qm_rclegislation", `?$select=qm_name,qm_legislationlbl,qm_legislationetxt,qm_legislationftxt,_qm_tylegislationtypeid_value,_qm_rcparentlegislationid_value,qm_ordernbr&$filter=_qm_rcparentlegislationid_value eq '${provision._qm_rcparentlegislationid_value}'`);
    //results.entities.sort(function(a,b){return a.qm_ordernbr - b.qm_ordernbr});
    return results.entities;
}

async function getChildrenProvisions(provision) {
    var results = await parent.Xrm.WebApi.retrieveMultipleRecords("qm_rclegislation", `?$select=qm_name,qm_legislationlbl,qm_legislationetxt,qm_legislationftxt,_qm_tylegislationtypeid_value,_qm_rcparentlegislationid_value,qm_ordernbr&$filter=_qm_rcparentlegislationid_value eq '${provision.qm_rclegislationid}'`);
    //results.entities.sort(function(a,b){return a.qm_ordernbr - b.qm_ordernbr});
    return results.entities;
} 