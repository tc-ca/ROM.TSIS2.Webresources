// Show Designer, Test Survey, JSON Editor and additionally Logic tabs
var options = {
    showLogicTab: true,
    showTranslationTab: true,
    haveCommercialLicense: true 
  };

  function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }
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


async function buildProvisionText(provision) {
  let provisionText = "";
  let parent = await getParentProvision(provision);
  provisionText += `**${parent.qm_legislationlbl.substr(1)}** ${parent.qm_legislationetxt}<br/>`
  let siblings = await getSiblingProvisions(provision);
  for (var i in siblings) {
    provisionText += `&#160;&#160;&#160;&#160;**${siblings[i].qm_legislationlbl.substr(siblings[i].qm_legislationlbl.length - 3)}** ${siblings[i].qm_legislationetxt}<br/>`;
    let children = await getChildrenProvisions(siblings[i]);
    for (var j in children) {
      provisionText += `&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;**${children[j].qm_legislationlbl.substr(children[j].qm_legislationlbl.length - 3)}** ${children[j].qm_legislationetxt}<br/>`;
    }
  }
  return provisionText;
}

async function getParentProvision(provision) {
  var result = await parent.Xrm.WebApi.retrieveRecord("qm_rclegislation", provision._qm_rcparentlegislationid_value, `?$select=qm_name,qm_legislationlbl,qm_legislationetxt,_qm_tylegislationtypeid_value,_qm_rcparentlegislationid_value`);
  return result;
}

async function getSiblingProvisions(provision) {
  var results = await parent.Xrm.WebApi.retrieveMultipleRecords("qm_rclegislation", `?$select=qm_name,qm_legislationlbl,qm_legislationetxt,_qm_tylegislationtypeid_value,_qm_rcparentlegislationid_value,qm_ordernbr&$filter=_qm_rcparentlegislationid_value eq '${provision._qm_rcparentlegislationid_value}'`);
  results.entities.sort(function(a,b){return a.qm_ordernbr - b.qm_ordernbr});
  return results.entities;
}

async function getChildrenProvisions(provision) {
  var results = await parent.Xrm.WebApi.retrieveMultipleRecords("qm_rclegislation", `?$select=qm_name,qm_legislationlbl,qm_legislationetxt,_qm_tylegislationtypeid_value,_qm_rcparentlegislationid_value,qm_ordernbr&$filter=_qm_rcparentlegislationid_value eq '${provision.qm_rclegislationid}'`);
  results.entities.sort(function(a,b){return a.qm_ordernbr - b.qm_ordernbr});
  return results.entities;
} 
