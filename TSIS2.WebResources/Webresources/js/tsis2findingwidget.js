//Set to 1033 by default. Update with parent.Xrm if it can, else use locale if it's been set in time.
var lang = '1033';
if (parent.Xrm != null) {
    lang = parent.Xrm.Utility.getGlobalContext().userSettings.languageId;
} else if (locale != undefined) {
    lang = (locale == 'fr') ? 1036 : 1033;
}

var inspectorCommentsLocalizedText;
var charactersRemainingLocalizedText;

if (lang == 1036){
    inspectorCommentsLocalizedText = "Commentaires de l'inspecteur";
    charactersRemainingLocalizedText = "caractères restants";
    accountableOperationsLocalized = "Opération responsable";
    findingTypeLocalized = "Finding Type (FR)"
    findingTypeUndecidedLocalized = "Undecided (FR)"
    findingTypeObservationLocalized = "Observation (FR)"
    findingTypeNoncomplianceLocalized = "Non-compliance (FR)"
}
else{
    inspectorCommentsLocalizedText = "Inspector Comments";
    charactersRemainingLocalizedText = "characters remaining";
    accountableOperationsLocalized = "Accountable Operations";
    findingTypeLocalized = "Finding Type"
    findingTypeUndecidedLocalized = "Undecided"
    findingTypeObservationLocalized = "Observation"
    findingTypeNoncomplianceLocalized = "Non-compliance"
}

const findingTypeChoices = {
    en: [{ value: 717750000, text: "Undecided" }, { value: 717750001, text: "Observation" }, { value: 717750002, text: "Non-compliance" }],
    fr: [{ value: 717750000, text: "Undecided FR" }, { value: 717750001, text: "Observation FR" }, { value: 717750002, text: "Non-compliance FR" }]
}

//operationList and activityTypeOperationTypeIdsList is set in WOST onLoad. If they don't exist, set it to an empty list to avoid null reference exception.
var operationList = operationList || [];
var activityTypeOperationTypeIdsList = activityTypeOperationTypeIdsList || [];


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
            { name: "provision", category: "general", visibleIndex: 1, type: "provisionAutoComplete" },
            { name: "name", readOnly: true },
            { name: "description", type: "textarea" },
            { name: "reference" },
            { name: "nameID" },
            {
                name: "findingType",
                type: "dropdown",
                category: "general",
                visibleIndex: 0,
                default: 717750000,
                choices: (obj) => {
                    if (!obj) return [];
                    var loc = obj.getLocale();
                    if (!loc) loc = Survey.surveyLocalization.defaultLocale;
                    var res = findingTypeChoices[loc];
                    return !!res ? res : [];
                }
            },
            { name: "inspectorComments" },
            { name: "provisionData" },
        ], null, "text");

    },
    //If you want to use the default question rendering then set this property to true. We do not need any default rendering, we will use our our htmlTemplate
    isDefaultRender: false,
    //You should use it if your set the isDefaultRender to false
    htmlTemplate:
        `<div><div class="form-group"><div class="operationsContainer"></div> <label for="comment" style="padding-top: 15px;"> <span class="field-name">${inspectorCommentsLocalizedText}</span> </label> <textarea type="text" class="form-control inspectorComments" rows="3" cols="50" maxlength="1000" style="resize: vertical;"></textarea> <span class="character-count"></span> </div> </div>`,
    //The main function, rendering and two-way binding
    afterRender: function (question, el) {
        //el is our root element in htmlTemplate, is "div" in our case
        var operationsContainer = el.getElementsByClassName("operationsContainer")[0];
        var comments = el.getElementsByClassName("inspectorComments")[0];
        var characterCount = el.getElementsByClassName("character-count")[0];

        //The form has data to load
        if (question.value != null) {
            //Populate question property and form value
            question.inspectorComments = question.value.comments || "";
            comments.value = question.value.comments || "";
            question.accountableOperations = question.value.operations || [];
        }

        updateQuestionValue(question);

        //Create table to contain operation related inputs
        var operationsTable = document.createElement("table");
        var operationsTableHeaderRow = document.createElement("tr");
        var accountableOperationHeader = document.createElement("th");
        var findingTypeHeader = document.createElement("th");
        var operationNameHeader = document.createElement("th");

        accountableOperationHeader.innerHTML = "Accountable";
        findingTypeHeader.innerHTML = "Finding Type";
        operationNameHeader.innerHTML = "Operation Name";

        accountableOperationHeader.style.width = "10%";
        accountableOperationHeader.style.textAlign = "left";
        findingTypeHeader.style.width = "15%";
        findingTypeHeader.style.textAlign = "left";
        operationNameHeader.style.textAlign = "left";

        //Add table headers if there are operations
        if (operationList.length > 0) {
            operationsTableHeaderRow.appendChild(accountableOperationHeader);
            operationsTableHeaderRow.appendChild(findingTypeHeader);
            operationsTableHeaderRow.appendChild(operationNameHeader);
            operationsTable.appendChild(operationsTableHeaderRow);
        }

        //This stores references to the inputs of each table row so that the values can be retrieved together and entered into the question's value json
        var operationInputs = [];
        
        //Iterate through each operation associated to the Work Order, populate the operation table with inputs
        operationList.forEach(function (operation) {
            //Create table elements for this operation
            var operationTableRow = document.createElement("tr");
            var accountableOperationData = document.createElement("td");
            var findingTypeData = document.createElement("td");
            var operationNameData = document.createElement("td");

            //Create a checkbox to indicate an operation is accountable for the finding
            operationCheckbox = document.createElement("input");
            operationCheckbox.type = "checkbox";
            operationCheckbox.className = "operationCheckbox";
            operationCheckbox.value = operation.id;
            accountableOperationData.appendChild(operationCheckbox);

            //Create a dropdown to select the Finding Type of the operation
            var findingTypeDropdown = document.createElement("select");
            findingTypeDropdown.style.webkitAppearance = "auto";

            var undecidedOption = document.createElement("option");
            undecidedOption.value = 717750000;
            undecidedOption.innerHTML = findingTypeUndecidedLocalized;

            var observationOption = document.createElement("option");
            observationOption.value = 717750001;
            observationOption.innerHTML = findingTypeObservationLocalized;

            var noncomplianceOption = document.createElement("option");
            noncomplianceOption.value = 717750002;
            noncomplianceOption.innerHTML = findingTypeNoncomplianceLocalized;

            findingTypeDropdown.appendChild(undecidedOption);
            findingTypeDropdown.appendChild(observationOption);
            findingTypeDropdown.appendChild(noncomplianceOption);

            //Load old input values if they exist
            //For each operation saved in the question's value, if its operation ID matches the current operation's ID, load its values
            question.value.operations.forEach(function (operation) {
                if (operation.operationID == operationCheckbox.value) {
                    operationCheckbox.checked = true;
                    findingTypeDropdown.value = operation.findingType;
                }
            });

            //if the operationType is not regulated, or the operationType is not one of the parent Work Order's Activity Type's operationTypes
            //Set to Observation and Lock the dropdown
            if (!operation.isRegulated || !activityTypeOperationTypeIdsList.includes(operation.operationTypeId)) {
                findingTypeDropdown.value = 717750001;
                findingTypeDropdown.disabled = true;
                findingTypeDropdown.style.webkitAppearance = "none";
            //If the findingType was decided in the questionnaire, use its value and lock the dropdown
            } else if (question.findingType != null) {
                findingTypeDropdown.value = question.findingType;
                findingTypeDropdown.disabled = true;
                findingTypeDropdown.style.webkitAppearance = "none";
            }
            updateQuestionValue(question);
            findingTypeData.appendChild(findingTypeDropdown);

            operationNameData.innerHTML = operation.name

            operationTableRow.appendChild(accountableOperationData);
            operationTableRow.appendChild(findingTypeData);
            operationTableRow.appendChild(operationNameData);
            operationsTable.appendChild(operationTableRow);

            //Add references to checkbox and dropdown to the inputs array, so their values can be retrieved together
            operationInputs.push({
                checkbox: operationCheckbox,
                dropdown: findingTypeDropdown
            });

            //If there's only one operation, it must be accountable, so check the checkbox and lock it, then update the question value
            if (operationList.length == 1) {
                operationCheckbox.checked = true;
                operationCheckbox.disabled = "disabled";
                question.accountableOperations = [{
                    operationID: operationCheckbox.value,
                    findingType: findingTypeDropdown.value
                }];
                updateQuestionValue(question);
            }

            //When the dropdown is changed, update the question's accountable operation object and then update the question value
            findingTypeDropdown.onchange = function () {
                question.accountableOperations = [];
                operationInputs.forEach(function (operationInputs) {
                    if (operationInputs.checkbox.checked) {
                        question.accountableOperations.push({
                            operationID: operationInputs.checkbox.value,
                            findingType: operationInputs.dropdown.value
                        });
                    }
                });
                updateQuestionValue(question);
                console.log(question.value)
            }

            //When the checkbox is changed, update the accountable operation object and then update the question value
            operationCheckbox.onchange = function () {
                question.accountableOperations = [];
                operationInputs.forEach(function (operationInputs) {
                    if (operationInputs.checkbox.checked) {
                        question.accountableOperations.push({
                            operationID: operationInputs.checkbox.value,
                            findingType: operationInputs.dropdown.value
                        });
                    }
                });
                updateQuestionValue(question);
                console.log(question.value)
            }
        });
        

        operationsContainer.appendChild(operationsTable);

        function updateCharacterCount() {
            characterCount.innerText = (1000 - comments.value.length) + " " + charactersRemainingLocalizedText;
        }
        updateCharacterCount();
        comments.onkeyup = updateCharacterCount;

        comments.onchange = function () {
            question.inspectorComments = comments.value;
            updateQuestionValue(question);
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
        //updateQuestionValue(question);
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
        comments: question.inspectorComments || "",
        operations: question.accountableOperations || [],
        provisionData: question.provisionData
    }
}

function updateQuestionProvisionData(question, provisionName) {
    /* Questions in the test survey are assigned new question.id's causing duplicate findings in the json.
    question.nameID will grab the id once and stay the same */
    if (question.nameID == null) {
        question.nameID = question.id;
    }
    parent.Xrm.WebApi.retrieveMultipleRecords("qm_rclegislation", `?$filter=qm_name eq '${provisionName}'`).then(
        async function success(result) {
            if (result.entities.length > 0) {
                let provision = result.entities[0];
                question.title = provision.qm_name;
                question.name = `finding-${question.nameID}`;
                question.reference = provision.qm_name;
                question.description = "<html>" + await buildProvisionText(provision, lang) + "</html>";
                question.locDescription.values.default = "<html>" + await buildProvisionText(provision, 1033) + "</html>";
                question.locDescription.values.fr = "<html>" + await buildProvisionText(provision, 1036) + "</html>";
                question.provisionData = {
                    legislationid: provision._qm_tylegislationsourceid_value,
                    provisioncategoryid: provision._ts_provisioncategory_value
                };
            }
        },
        function (error) {
            console.log(error.message);
            // handle error conditions
        }
    );
}