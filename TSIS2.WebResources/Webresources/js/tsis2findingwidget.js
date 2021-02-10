var widget = {
  //the widget name. It should be unique and written in lowcase.
  name: "finding",
  //the widget title. It is how it will appear on the toolbox of the SurveyJS Editor/Builder
  title: "Finding",
  //the name of the icon on the toolbox. We will leave it empty to use the standard one
  iconName: "",
  //If the widgets depends on third-party library(s) then here you may check if this library(s) is loaded
  widgetIsLoaded: function() {
    //return typeof $ == "function" && !!$.fn.select2; //return true if jQuery and select2 widget are loaded on the page
    return true; //we do not require anything so we just return true.
  },
  //SurveyJS library calls this function for every question to check, if it should use this widget instead of default rendering/behavior
  isFit: function(question) {
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
  activatedByChanged: function(activatedBy) {
    //we do not need to check acticatedBy parameter, since we will use our widget for customType only
    //We are creating a new class and derived it from text question type. It means that text model (properties and fuctions) will be available to us
    Survey.JsonObject.metaData.addClass("finding", [
      {name: "provision", category: "general", visibleIndex: 0, type: "provisionAutoComplete"},
      {name: "name", readOnly: true},
      {name: "description", type: "textarea"},
      {name: "reference"}, {name: "comments"},
      {name: "file"}
    ], null, "text");
    
  },
  //If you want to use the default question rendering then set this property to true. We do not need any default rendering, we will use our our htmlTemplate
  isDefaultRender: false,
  //You should use it if your set the isDefaultRender to false
  htmlTemplate:
    '<div> <div class="form-group"> <label for="comment" style="padding-top: 15px;"> <span class="field-name">Inspector Comments</span> </label> <textarea type="text" class="form-control comments" rows="3" cols="50"></textarea> </div> <div class="form-group" style="padding-top: 10px;"> <label for="file" style="padding-bottom: 2px; margin-bottom: 0px;"> <span class="field-name">Documentary Evidence</span> </label> <input type="file" class="sv_q_file_input file" style="padding-top: 2px;"></input> </div> </div>',
  //The main function, rendering and two-way binding
  afterRender: function(question, el) {
    //el is our root element in htmlTemplate, is "div" in our case
    //get the text element
    var comments = el.getElementsByClassName("comments")[0];
    var file = el.getElementsByClassName("file")[0];

    comments.onchange = function () {
      question.comments = comments.value;
      question.value = {
        provisionReference: question.reference,
        provisionText: question.description,
        comments: question.comments,
        documentaryEvidence: question.file
      }
    }

    file.onchange = function () {
      question.file = file.value;
      question.value = {
        provisionReference: question.reference,
        provisionText: question.description,
        comments: question.comments,
        documentaryEvidence: question.file
      }
    }


    //set the changed value into question value
    onValueChangedCallback = function() {
      updateQuestionProvisionData(question, question.provision);
    }
    onReadOnlyChangedCallback = function() {
      if (question.isReadOnly) {
        comments.setAttribute("disabled", "disabled");
      } else {
        comments.removeAttribute("disabled");
      }
    };
    //if question becomes readonly/enabled add/remove disabled attribute
    question.readOnlyChangedCallback = onReadOnlyChangedCallback;
    //if the question value changed in the code, for example you have changed it in JavaScript
    //question.valueChangedCallback = onValueChangedCallback;

    //set initial value
    onValueChangedCallback();
    //set initial readOnly if needed
    onReadOnlyChangedCallback();
  },
  //Use it to destroy the widget. It is typically needed by jQuery widgets
  willUnmount: function(question, el) {
    //We do not need to clear anything in our simple example
    //Here is the example to destroy the image picker
    //var $el = $(el).find("select");
    //$el.data('picker').destroy();
  }
};

//Register our widget in singleton custom widget collection
Survey.CustomWidgetCollection.Instance.addCustomWidget(widget, "customtype");


function updateQuestionProvisionData(question, provisionName) {
  parent.Xrm.WebApi.retrieveMultipleRecords("qm_rclegislation", `?$select=qm_name,qm_legislationlbl,qm_legislationetxt,_qm_tylegislationtypeid_value,_qm_rcparentlegislationid_value&$filter=qm_name eq '${provisionName}'`).then(
    async function success(result) {
      if (result.entities.length > 0) {
        question.title = result.entities[0].qm_name;
        question.name = `finding-${result.entities[0].qm_name}`;
        question.reference = result.entities[0].qm_legislationlbl;

        question.description = await buildProvisionText(result.entities[0]);

        question.value = {
          provisionReference: question.reference,
          provisionText: question.description,
          comments: question.comments,
          documentaryEvidence: question.file
        }
      }
    },
    function (error) {
        console.log(error.message);
        // handle error conditions
    }
  );
}

async function buildProvisionText(provision) {
  let provisionText = "";
  provision.qm_name = `<mark>${provision.qm_name}</mark>`;
  provisionText += await gatherAncestorProvisionText(provision);
  provisionText += await gatherDescendentProvisionText(provision);
  return provisionText;
}

async function gatherAncestorProvisionText(provision) {
  let provisionText = provision.qm_legislationetxt || "";
  let provisionType = provision[`_qm_tylegislationtypeid_value@OData.Community.Display.V1.FormattedValue`];
  if (provisionType == "Body") {
    return "";
  }
  if (provisionType == "Heading") {
    return `<strong>${provision.qm_name}</strong></br>`;
  }
  let parent = await getParentProvision(provision);
  return await gatherAncestorProvisionText(parent) + `<strong>${provision.qm_name}</strong>: ${provisionText}</br>`;
}

async function gatherDescendentProvisionText(provision) {
  let children = await getChildrenProvisions(provision);
  if (children.length == 0) {
    return "";
  }
  let provisionText = "<ul style='list-style-type:none;'>";
    for (var i in children) {
      let childText = children[i].qm_legislationetxt || "";
      provisionText += `<li><strong>${children[i].qm_legislationlbl}</strong> ${childText}</li>` +  await gatherDescendentProvisionText(children[i]);
    }
  provisionText += "</ul>";
  return provisionText;
}

async function getParentProvision(provision) {
  var result = await parent.Xrm.WebApi.retrieveRecord("qm_rclegislation", provision._qm_rcparentlegislationid_value, `?$select=qm_name,qm_legislationlbl,qm_legislationetxt,_qm_tylegislationtypeid_value,_qm_rcparentlegislationid_value`);
  return result;
}

async function getSiblingProvisions(provision) {
  var results = await parent.Xrm.WebApi.retrieveMultipleRecords("qm_rclegislation", `?$select=qm_name,qm_legislationlbl,qm_legislationetxt,_qm_tylegislationtypeid_value,_qm_rcparentlegislationid_value,qm_ordernbr&$filter=_qm_rcparentlegislationid_value eq '${provision._qm_rcparentlegislationid_value}'`);
  //results.entities.sort(function(a,b){return a.qm_ordernbr - b.qm_ordernbr});
  return results.entities;
}

async function getChildrenProvisions(provision) {
  var results = await parent.Xrm.WebApi.retrieveMultipleRecords("qm_rclegislation", `?$select=qm_name,qm_legislationlbl,qm_legislationetxt,_qm_tylegislationtypeid_value,_qm_rcparentlegislationid_value,qm_ordernbr&$filter=_qm_rcparentlegislationid_value eq '${provision.qm_rclegislationid}'`);
  //results.entities.sort(function(a,b){return a.qm_ordernbr - b.qm_ordernbr});
  return results.entities;
} 