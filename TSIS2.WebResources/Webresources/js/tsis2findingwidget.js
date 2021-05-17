if (parent.Xrm == null) {
    var lang = 1033
} else {
    var lang = parent.Xrm.Utility.getGlobalContext().userSettings.languageId;
}


var inspectorCommentsLocalizedText;
var charactersRemainingLocalizedText;

if (lang == 1036){
    inspectorCommentsLocalizedText = "Commentaires de l'inspecteur";
    charactersRemainingLocalizedText = "caractères restants";
}
else{
    inspectorCommentsLocalizedText = "Inspector Comments";
    charactersRemainingLocalizedText = "characters remaining";
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
        ], null, "text");

    },
    //If you want to use the default question rendering then set this property to true. We do not need any default rendering, we will use our our htmlTemplate
    isDefaultRender: false,
    //You should use it if your set the isDefaultRender to false
    htmlTemplate:
        `<div> <div class="form-group"> <label for="comment" style="padding-top: 15px;"> <span class="field-name">${inspectorCommentsLocalizedText}</span> </label> <textarea type="text" class="form-control inspectorComments" rows="3" cols="50" maxlength="1000" style="resize: vertical;"></textarea> <span class="character-count"> </span> </div> </div>`,
    //The main function, rendering and two-way binding
    afterRender: function (question, el) {
        //el is our root element in htmlTemplate, is "div" in our case
        //get the text element
        var comments = el.getElementsByClassName("inspectorComments")[0];
        var characterCount = el.getElementsByClassName("character-count")[0];

        //The form has data to load
        if (question.value != null) {
            //Populate question property and form value
            question.inspectorComments = question.value.comments || "";
            comments.value = question.value.comments || "";
        }

        function updateCharacterCount() {
            characterCount.innerText = (1000 - comments.value.length) + " " + charactersRemainingLocalizedText;
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

        //Assign nameID if it was not assigned in surveyCreator
        if (question.nameID == null) {
            question.nameID = question.id;
        }
        question.name = `finding-${question.nameID}`;
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

function updateQuestionValue(question) {
    question.value = {
        provisionReference: question.reference,
        provisionTextEn: question.locDescription.values.default,
        provisionTextFr: question.locDescription.values.fr,
        comments: question.inspectorComments,
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
                question.description = "<html>" + await buildProvisionText(result.entities[0], lang) + "</html>";
                question.locDescription.values.default = "<html>" + await buildProvisionText(result.entities[0], 1033) + "</html>";
                question.locDescription.values.fr = "<html>" + await buildProvisionText(result.entities[0], 1036) + "</html>";
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
        }
    }
}