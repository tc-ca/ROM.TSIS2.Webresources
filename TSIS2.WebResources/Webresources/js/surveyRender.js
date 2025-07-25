var lang = parent.Xrm.Utility.getGlobalContext().userSettings.languageId;

var charactersRemainingLocalizedText;
var detailTextAddLocalizedText;
var detailTextMinusLocalizedText;
var provideDetailsLocalizedText;
var unsavedNotificationMessage;
var invokeExemptionLocalized;
var provisionLocalized;

let timeSinceLastNotification;

if (lang == 1036) {
  charactersRemainingLocalizedText = "caractères restants";
  provideDetailsLocalizedText = "Veuillez fournir des détails de l'inspection.";
  undecidedFindingTypeErrorLocalizedText = "Veuillez selectionner un Type de constatation.";
  unsavedNotificationMessage = "Vous avez des changements non-enregistrés dans le questionnaire.";
  invokeExemptionLocalized = "Invoquer l'exemption";
  provisionLocalized = "Dispositions";
  document.querySelector("#PrintPageButton").innerText = "Imprimer la page";
} else {
  charactersRemainingLocalizedText = "characters remaining";
  provideDetailsLocalizedText = "Please provide inspection details.";
  undecidedFindingTypeErrorLocalizedText = "Please decide on a Finding Type.";
  unsavedNotificationMessage = "You have unsaved changes to the Questionnaire.";
  invokeExemptionLocalized = "Invoke Exemption";
  provisionLocalized = "Provision";
  document.querySelector("#PrintPageButton").innerText = "Print Page";
}

("use strict");
window.parentExecutionContext = null;
window.parentFormContext = null;
Survey.StylesManager.applyTheme("default");

//add hasDetail and detail Text properties to all questions in hasDetailQuestions array. Required to load hasDetail value from JSON definition.
var hasDetailQuestions = [
  "radiogroup",
  "checkbox",
  "dropdown",
  "image",
  "imagepicker",
  "file",
  "boolean",
  "matrix",
  "matrixdropdown",
  "matrixdynamic",
  "signaturepad",
  "rating",
  "expression",
  "html",
  "panel",
  "paneldynamic",
  "flowpanel",
];
hasDetailQuestions.forEach(function (questionName) {
  Survey.JsonObject.metaData.addProperty(questionName, {
    name: "hasDetail:boolean",
    default: true,
  }),
    Survey.JsonObject.metaData.addProperty(questionName, {
      name: "detailEnglishText:string",
      default: "Detail",
    }),
    Survey.JsonObject.metaData.addProperty(questionName, {
      name: "detailFrenchText:string",
      default: "Détail",
    });
});

//add applicableProvisions and applicableProvisionsData property to all questions in hasApplicableProvisions array
var hasApplicableProvisions = [
  "radiogroup",
  "checkbox",
  "dropdown",
  "image",
  "imagepicker",
  "file",
  "boolean",
  "matrix",
  "matrixdropdown",
  "matrixdynamic",
  "signaturepad",
  "rating",
  "expression",
  "html",
  "panel",
  "paneldynamic",
  "flowpanel",
];
hasApplicableProvisions.forEach(function (questionName) {
  Survey.Serializer.addProperty(questionName, {
    name: "applicableProvisions:provisionsSelection",
    category: "general",
  });
  Survey.Serializer.addProperty(questionName, {
    name: "applicableProvisionsData",
  });
});

function appendApplicableProvisionsData(survey, options) {
  //Create HTML elements
  const question = options.htmlElement;
  var provisionContainer = document.createElement("div");
  const provisionParagraph = document.createElement("p");

  const applicableProvisionsData = options.question.applicableProvisionsData;

  for (let provisionData of applicableProvisionsData) {
    var uniqueName = Math.floor(Math.random() * 900000) + 100000; // this makes sure the provision-text has unique ID's

    var provisionButton = document.createElement("button");
    provisionButton.classList.add("btn", "btn-info");
    provisionButton.setAttribute("data-target", "#provision-text" + uniqueName);
    provisionButton.setAttribute("data-toggle", "collapse");

    var provisionBreak1 = document.createElement("br");
    var provisionBreak2 = document.createElement("br");

    var provisionText = document.createElement("div");
    provisionText.id = "provision-text" + uniqueName;
    provisionText.classList.add("collapse");

    // Turn each provision into a button for the user to click and then view the details

    if (lang == 1036) {
      provisionButton.innerText = provisionData.provisionNameFr;
      provisionText.innerHTML = provisionData.provisionTextFr;
    } else {
      provisionButton.innerText = provisionData.provisionNameEn;
      provisionText.innerHTML = provisionData.provisionTextEn;
    }

    provisionParagraph.appendChild(provisionBreak1);
    provisionParagraph.appendChild(provisionButton);
    provisionParagraph.appendChild(provisionBreak2);
    provisionParagraph.appendChild(provisionText);
  }
  provisionContainer.appendChild(provisionParagraph);
  question.appendChild(provisionContainer);
}

async function appendExemptions(survey, options) {
  //Iterate through each applicable provision, get any exemptions that apply to that provision and add the applicableExemptions array
  const applicableProvisionsData = options.question.applicableProvisionsData;
  const applicableExemptions = [];
  for (let provisionData of applicableProvisionsData) {
    let retrieveApplicableExemptions = await getApplicableExemptions(provisionData.provisionNameEn);
    if (retrieveApplicableExemptions != null) {
      for (let applicableExemption of retrieveApplicableExemptions) {
        applicableExemptions.push(applicableExemption);
      }
    }
  }
  //If no applicableExemptions were found, return.
  if (applicableExemptions.length == 0) return;

  //Create HTML elements
  const question = options.htmlElement;
  const exemptionContainer = document.createElement("div");
  const header = document.createElement("div"); //Collapsable Header for Exemption section
  const content = document.createElement("div");
  const ExemptionHeaderText = document.createElement("span");
  const ExemptionExpandSymbol = document.createElement("span");

  const exemptionResponseId = options.question.name + "-Exemptions";

  header.appendChild(ExemptionExpandSymbol);
  header.appendChild(ExemptionHeaderText);
  exemptionContainer.appendChild(header);
  exemptionContainer.appendChild(content);
  question.appendChild(exemptionContainer);

  //Set Styles, Classes, and Text

  exemptionContainer.style.marginTop = "10px";
  header.style.backgroundColor = "#d3d3d3";
  header.style.padding = "2px";
  header.style.cursor = "pointer";
  header.style.fontWeight = "bold";

  ExemptionHeaderText.innerHTML = "Exemptions";
  content.style.display = "block";
  content.style.border = "1px solid";
  content.style.borderColor = "#d3d3d3";
  content.style.padding = "0px 10px 10px 10px";
  ExemptionExpandSymbol.innerHTML = "- ";

  //Add functionality to HTML elements

  //Toggle visibilty of content when header is clicked
  header.onclick = function () {
    if (content.style.display == "block") {
      content.style.display = "none";
      ExemptionExpandSymbol.innerHTML = "+ ";
    } else {
      content.style.display = "block";
      ExemptionExpandSymbol.innerHTML = "- ";
    }
  };

  let exemptionInputs = [];

  // For each exemptions, add a checkbox to invoke and a comment box
  for (let applicableExemption of applicableExemptions) {
    // Create table to contain exemption related inputs
    let exemptionsTable = document.createElement("table");
    let exemptionsTableHeaderRow = document.createElement("tr");
    let invokeExemptionHeader = document.createElement("th");
    let provisionNameHeader = document.createElement("th");
    let exemptionNameHeader = document.createElement("th");

    invokeExemptionHeader.innerHTML = invokeExemptionLocalized;
    provisionNameHeader.innerHTML = provisionLocalized;
    exemptionNameHeader.innerHTML = "Exemption";

    invokeExemptionHeader.style.width = "15%";
    invokeExemptionHeader.style.textAlign = "left";
    provisionNameHeader.style.width = "15%";
    provisionNameHeader.style.textAlign = "left";
    exemptionNameHeader.style.textAlign = "left";

    exemptionsTableHeaderRow.appendChild(invokeExemptionHeader);
    exemptionsTableHeaderRow.appendChild(provisionNameHeader);
    exemptionsTableHeaderRow.appendChild(exemptionNameHeader);
    exemptionsTable.appendChild(exemptionsTableHeaderRow);

    //Create table elements for this exemption
    let exemptionTableInvokeRow = document.createElement("tr");
    let invokeExemptionDataCell = document.createElement("td");
    let provisionNameDataCell = document.createElement("td");
    let exemptionNameDataCell = document.createElement("td");

    //Create a checkbox to invoke exemption
    invokeExemptionCheckbox = document.createElement("input");
    invokeExemptionCheckbox.type = "checkbox";
    invokeExemptionCheckbox.className = "invokeExemptionCheckbox";
    invokeExemptionCheckbox.value = applicableExemption.exemptionId;
    invokeExemptionDataCell.appendChild(invokeExemptionCheckbox);

    //Populate Provision Name Cell
    provisionNameDataCell.innerHTML = applicableExemption.provisionNameEn;

    //Populate Exemption Name Cell
    let exemptionAnchor = document.createElement("a");
    //Open Exemption record in a modal form
    exemptionAnchor.onclick = function () {
      const pageInput = {
        pageType: "entityrecord",
        entityName: "ts_exemption",
        entityId: applicableExemption.exemptionId,
      };
      const navigationOptions = {
        target: 2,
        height: { value: 80, unit: "%" },
        width: { value: 80, unit: "%" },
        position: 1,
      };
      parent.Xrm.Navigation.navigateTo(pageInput, navigationOptions);
    };
    exemptionAnchor.innerHTML = applicableExemption.exemptionName;
    exemptionNameDataCell.appendChild(exemptionAnchor);

    exemptionTableInvokeRow.appendChild(invokeExemptionDataCell);
    exemptionTableInvokeRow.appendChild(provisionNameDataCell);
    exemptionTableInvokeRow.appendChild(exemptionNameDataCell);
    exemptionsTable.appendChild(exemptionTableInvokeRow);

    //Create an input to write comments about the exemption
    let exemptionCommentBox = document.createElement("textarea");
    exemptionCommentBox.className = "form-control";
    exemptionCommentBox.rows = 3;
    exemptionCommentBox.cols = 50;
    exemptionCommentBox.maxLength = 5000;
    exemptionCommentBox.style.resize = "vertical";

    if (survey.mode == "display") {
      exemptionCommentBox.readOnly = true;
      invokeExemptionCheckbox.disabled = "disabled";
    }

    let characterCount = document.createElement("span");
    characterCount.style.textAlign = "left";

    //Update character count onKeyUp in exemptionCommentBox
    let exemptionCommentBoxOnKeyUpHandler = function () {
      let currLength = exemptionCommentBox.value.length;
      characterCount.innerText = exemptionCommentBox.maxLength - currLength + " " + charactersRemainingLocalizedText;
    };
    exemptionCommentBox.onkeyup = exemptionCommentBoxOnKeyUpHandler;

    content.appendChild(exemptionsTable);
    content.appendChild(exemptionCommentBox);
    content.appendChild(characterCount);

    //Load previous exemption values
    let previousResponseValues = survey.getValue(exemptionResponseId);
    if (previousResponseValues != null) {
      for (let previousResponseValue of previousResponseValues) {
        if (
          previousResponseValue.exemptionId == applicableExemption.exemptionId &&
          previousResponseValue.provisionId == applicableExemption.provisionId
        ) {
          invokeExemptionCheckbox.checked = previousResponseValue.exemptionInvoked == true;
          exemptionCommentBox.value = previousResponseValue.exemptionComment;
        }
      }
    }
    //Update character coutnt
    exemptionCommentBoxOnKeyUpHandler();

    exemptionInputs.push({
      exemptionName: applicableExemption.exemptionName,
      exemptionId: applicableExemption.exemptionId,
      provisionNameEn: applicableExemption.provisionNameEn,
      provisionNameFr: applicableExemption.provisionNameFr,
      provisionId: applicableExemption.provisionId,
      invokeCheckbox: invokeExemptionCheckbox,
      commentBox: exemptionCommentBox,
    });

    invokeExemptionCheckbox.onchange = function () {
      let exemptionValues = [];
      for (let exemptionInput of exemptionInputs) {
        exemptionValues.push({
          exemptionName: exemptionInput.exemptionName,
          provisionNameEn: exemptionInput.provisionNameEn,
          provisionNameFr: exemptionInput.provisionNameFr,
          provisionId: exemptionInput.provisionId,
          exemptionId: exemptionInput.exemptionId,
          exemptionInvoked: exemptionInput.invokeCheckbox.checked,
          exemptionComment: exemptionInput.commentBox.value,
        });
      }
      survey.setValue(exemptionResponseId, exemptionValues);
    };

    exemptionCommentBox.onchange = function () {
      let exemptionValues = [];
      for (let exemptionInput of exemptionInputs) {
        exemptionValues.push({
          exemptionName: exemptionInput.exemptionName,
          provisionNameEn: exemptionInput.provisionNameEn,
          provisionNameFr: exemptionInput.provisionNameFr,
          provisionId: exemptionInput.provisionId,
          exemptionId: exemptionInput.exemptionId,
          exemptionInvoked: exemptionInput.invokeCheckbox.checked,
          exemptionComment: exemptionInput.commentBox.value,
        });
      }
      survey.setValue(exemptionResponseId, exemptionValues);
    };
  }
}

//Finds any Exemption records for the given exemption that apply to the current Work Order
async function getApplicableExemptions(provisionNameEn) {
  const workOrderFilterFields = await getWorkOrderExemptionFilterFields();
  let exemptionFetchXml = [
    "<fetch>",
    "  <entity name='ts_exemption'>",
    "    <attribute name='ts_name'/>",
    "    <attribute name='ts_exemptionid'/>",
    "    <attribute name='ts_flighttype'/>",
    "    <attribute name='ts_flightcategory'/>",
    "    <attribute name='ts_class'/>",
    "    <link-entity name='ts_exemption_qm_rclegislation' from='ts_exemptionid' to='ts_exemptionid' alias='exemption_provision' intersect='true'>",
    "      <link-entity name='qm_rclegislation' from='qm_rclegislationid' to='qm_rclegislationid' alias='provision' intersect='true'>",
    "        <attribute name='ts_nameenglish'/>",
    "        <attribute name='qm_rclegislationid'/>",
    "        <attribute name='ts_namefrench'/>",
    "        <filter>",
    "          <condition attribute='ts_nameenglish' operator='eq' value='",
    provisionNameEn,
    "'/>",
    "        </filter>",
    "      </link-entity>",
    "    </link-entity>",
    "  </entity>",
    "</fetch>",
  ].join("");
  exemptionFetchXml = "?fetchXml=" + encodeURIComponent(exemptionFetchXml);
  return await parent.Xrm.WebApi.retrieveMultipleRecords("ts_exemption", exemptionFetchXml).then(async function success(
    result
  ) {
    if (result.entities.length > 0) {
      //Create an array of exemption objects to be used in the exemption renderer
      const applicableExemptions = [];
      for (let exemption of result.entities) {
        let isApplicable = await exemptionIsApplicableToWorkOrder(exemption, workOrderFilterFields);
        if (isApplicable) {
          let exemptionObject = {
            provisionId: exemption["provision.qm_rclegislationid"],
            provisionNameEn: exemption["provision.ts_nameenglish"],
            provisionNameFr: exemption["provision.ts_namefrench"],
            exemptionName: exemption["ts_name"],
            exemptionId: exemption["ts_exemptionid"],
          };
          applicableExemptions.push(exemptionObject);
        }
      }
      return applicableExemptions;
    }
    return null;
  });
}

//Returns all fields needed to check if an exemption applies to a work order
async function getWorkOrderExemptionFilterFields() {
  const workOrderId = window.parentFormContext.getAttribute("msdyn_workorder").getValue()[0].id;
  const flightType = window.parentFormContext.getAttribute("ts_flighttype").getValue();
  const flightCategory = window.parentFormContext.getAttribute("ts_flightcategory").getValue();
  if (workOrderId == null) return;
  //Retrieve the related Work Order with the revelant lookup field ids
  const workOrder = await parent.Xrm.WebApi.retrieveRecord(
    "msdyn_workorder",
    workOrderId,
    "?$select=_ovs_operationtypeid_value,_msdyn_serviceaccount_value,_ts_site_value,_ts_region_value,_ovs_operationid_value&$expand=ts_Site($select=ts_class)"
  );
  if (workOrder == null) return;
  const workOrderFilterFields = {
    operationTypeId: workOrder._ovs_operationtypeid_value,
    stakeholderId: workOrder._msdyn_serviceaccount_value,
    siteId: workOrder._ts_site_value,
    regionId: workOrder._ts_region_value,
    operation1Id: workOrder._ovs_operationid_value,
    operation2Id: workOrder.aocOperationId,
    class: workOrder.ts_Site.ts_class,
    flightType: flightType,
    flightCategory,
    flightCategory,
  };
  return workOrderFilterFields;
}

//Checks all work order filter fields to see if they line up with the exemption's filters.
//Exemption has Many-to-Many relationships and multi-select fields to use as filters selection.
//For the Many-to-Many relationships, we retrieve the intermediary table records, and check if the id if the work order field is one of the ids.
//If no intermediary table records are found for a relationship, then the check for that filter is a pass.
//For the multiselect picklists, the values are returned as an array of optionset values.
//All checks must pass for the exemption to be applicable.
async function exemptionIsApplicableToWorkOrder(exemption, workOrderFilterFields) {
  let stakeholderMatch = false;
  let operationTypeMatch = false;
  let siteMatch = false;
  let regionMatch = false;
  let operationMatch = false;
  let classMatch = false;
  let flightTypeMatch = false;
  let flightCategoryMatch = false;

  //Operation Type
  let operationTypeFetchXml = [
    "<fetch>",
    "  <entity name='ts_exemption_ovs_operationtype'>",
    "    <attribute name='ovs_operationtypeid'/>",
    "    <filter>",
    "      <condition attribute='ts_exemptionid' operator='eq' value='",
    exemption.ts_exemptionid,
    "'/>",
    "    </filter>",
    "  </entity>",
    "</fetch>",
  ].join("");
  operationTypeFetchXml = "?fetchXml=" + encodeURIComponent(operationTypeFetchXml);
  const exemptionOperationTypes = await parent.Xrm.WebApi.retrieveMultipleRecords(
    "ts_exemption_ovs_operationtype",
    operationTypeFetchXml
  ).then(function (result) {
    return result.entities;
  });
  if (exemptionOperationTypes == null || (exemptionOperationTypes != null && exemptionOperationTypes.length == 0)) {
    //If there are no filters for this field then it does not matter what it is, so match.
    operationTypeMatch = true;
  } else if (exemptionOperationTypes != null) {
    for (let exemptionOperationType of exemptionOperationTypes) {
      if (exemptionOperationType.ovs_operationtypeid == workOrderFilterFields.operationTypeId) {
        operationTypeMatch = true;
        break;
      }
    }
  }

  //Stakeholder
  let accountFetchXml = [
    "<fetch>",
    "  <entity name='ts_exemption_account'>",
    "    <attribute name='accountid'/>",
    "    <filter>",
    "      <condition attribute='ts_exemptionid' operator='eq' value='",
    exemption.ts_exemptionid,
    "'/>",
    "    </filter>",
    "  </entity>",
    "</fetch>",
  ].join("");
  accountFetchXml = "?fetchXml=" + encodeURIComponent(accountFetchXml);
  const exemptionStakeholders = await parent.Xrm.WebApi.retrieveMultipleRecords(
    "ts_exemption_account",
    accountFetchXml
  ).then(function (result) {
    return result.entities;
  });
  if (exemptionStakeholders == null || (exemptionStakeholders != null && exemptionStakeholders.length == 0)) {
    //If there are no filters for this field then it does not matter what it is, so match.
    stakeholderMatch = true;
  } else if (exemptionStakeholders != null) {
    for (let exemptionStakeholder of exemptionStakeholders) {
      if (exemptionStakeholder.accountid == workOrderFilterFields.stakeholderId) {
        stakeholderMatch = true;
        break;
      }
    }
  }

  //Site
  var siteFetchXml = [
    "<fetch>",
    "  <entity name='ts_exemption_msdyn_functionallocation'>",
    "    <attribute name='msdyn_functionallocationid'/>",
    "    <filter>",
    "      <condition attribute='ts_exemptionid' operator='eq' value='",
    exemption.ts_exemptionid,
    "'/>",
    "    </filter>",
    "  </entity>",
    "</fetch>",
  ].join("");
  siteFetchXml = "?fetchXml=" + encodeURIComponent(siteFetchXml);
  const exemptionSites = await parent.Xrm.WebApi.retrieveMultipleRecords(
    "ts_exemption_msdyn_functionallocation",
    siteFetchXml
  ).then(function (result) {
    return result.entities;
  });
  if (exemptionSites == null || (exemptionSites != null && exemptionSites.length == 0)) {
    //If there are no filters for this field then it does not matter what it is, so match.
    siteMatch = true;
  } else if (exemptionSites != null) {
    for (let exemptionSite of exemptionSites) {
      if (exemptionSite.msdyn_functionallocationid == workOrderFilterFields.siteId) {
        siteMatch = true;
        break;
      }
    }
  }

  //Region
  var regionFetchXml = [
    "<fetch>",
    "  <entity name='ts_exemption_territory'>",
    "    <attribute name='territoryid'/>",
    "    <filter>",
    "      <condition attribute='ts_exemptionid' operator='eq' value='",
    exemption.ts_exemptionid,
    "'/>",
    "    </filter>",
    "  </entity>",
    "</fetch>",
  ].join("");
  regionFetchXml = "?fetchXml=" + encodeURIComponent(regionFetchXml);
  const exemptionRegions = await parent.Xrm.WebApi.retrieveMultipleRecords(
    "ts_exemption_territory",
    regionFetchXml
  ).then(function (result) {
    return result.entities;
  });
  if (exemptionRegions == null || (exemptionRegions != null && exemptionRegions.length == 0)) {
    //If there are no filters for this field then it does not matter what it is, so match.
    regionMatch = true;
  } else if (exemptionRegions != null) {
    for (let exemptionRegion of exemptionRegions) {
      if (exemptionRegion.territoryid == workOrderFilterFields.regionId) {
        regionMatch = true;
        break;
      }
    }
  }

  //Operation
  var operationFetchXml = [
    "<fetch>",
    "  <entity name='ts_exemption_ovs_operation'>",
    "    <attribute name='ovs_operationid'/>",
    "    <filter>",
    "      <condition attribute='ts_exemptionid' operator='eq' value='",
    exemption.ts_exemptionid,
    "'/>",
    "    </filter>",
    "  </entity>",
    "</fetch>",
  ].join("");
  operationFetchXml = "?fetchXml=" + encodeURIComponent(operationFetchXml);
  const exemptionOperations = await parent.Xrm.WebApi.retrieveMultipleRecords(
    "ts_exemption_ovs_operation",
    operationFetchXml
  ).then(function (result) {
    return result.entities;
  });
  if (exemptionOperations == null || (exemptionOperations != null && exemptionOperations.length == 0)) {
    //If there are no filters for this field then it does not matter what it is, so match.
    operationMatch = true;
  } else if (exemptionOperations != null) {
    for (let exemptionOperation of exemptionOperations) {
      if (
        exemptionOperation.ovs_operationid == workOrderFilterFields.operation1Id ||
        exemptionOperation.ovs_operationid == workOrderFilterFields.operation2Id
      ) {
        operationMatch = true;
        break;
      }
    }
  }

  //Flight Type
  if (exemption.ts_flighttype == null) {
    flightTypeMatch = true;
  } else if (workOrderFilterFields.flightType != null) {
    const exemptionFlightTypes = exemption.ts_flighttype.split(",");
    flightTypeMatch = exemptionFlightTypes.includes(workOrderFilterFields.flightType.toString());
  }

  //Flight Category
  if (exemption.ts_flightcategory == null) {
    flightCategoryMatch = true;
  } else if (workOrderFilterFields.flightCategory != null) {
    const exemptionFlightCategories = exemption.ts_flightcategory.split(",");
    flightCategoryMatch = exemptionFlightCategories.includes(workOrderFilterFields.flightCategory.toString());
  }

  //Class
  if (exemption.ts_class == null) {
    classMatch = true;
  } else if (workOrderFilterFields.class != null) {
    const exemptionClasses = exemption.ts_class.split(",");
    classMatch = exemptionClasses.includes(workOrderFilterFields.class.toString());
  }

  //If every filter is a match, the exemption is applicable
  let exemptionIsApplicable =
    stakeholderMatch &&
    operationTypeMatch &&
    operationTypeMatch &&
    siteMatch &&
    regionMatch &&
    operationMatch &&
    classMatch &&
    flightTypeMatch &&
    flightCategoryMatch;
  return exemptionIsApplicable;
}

function InitialContext(executionContext) {
  window.parentExecutionContext = executionContext;
  window.parentFormContext = executionContext.getFormContext();
}

function InitialFormContext(formContext) {
  window.parentFormContext = formContext;
}

function InitializeSurveyRender(surveyDefinition, surveyResponse, surveyLocale, mode, eContext) {
  if (surveyDefinition == null) {
    return;
  }
  let responseAttributeLogicalName = "ovs_questionnaireresponse";
  //If we're on the questionnaireresponse table, the field to save the value in is different from the WOST form
  if (window.parentFormContext != null) {
    if (window.parentFormContext._entityName == "ts_questionnaireresponse") {
      responseAttributeLogicalName = "ts_questionnaireanswers";
    }
  }
  //If we're on the work order service task workspace table, the field to save the value in is different from the WOST form
  if (window.parentFormContext != null) {
    if (window.parentFormContext._entityName == "ts_workorderservicetaskworkspace") {
      responseAttributeLogicalName = "ts_questionnaireresponse";
    }
  }
  var questionnaireDefinition = JSON.parse(surveyDefinition);
  window.survey = new Survey.Model(questionnaireDefinition);
  survey.locale = surveyLocale;
  survey.showCompletedPage = false;
  survey.mode = mode;
  if (surveyResponse != null) {
    survey.data = JSON.parse(surveyResponse);
  }
  survey.onComplete.add(function (survey, options) {
    // When survey is completed, parse the resulting JSON and save it to ovs_questionnaireresponse
    var data = JSON.stringify(survey.data, null, 3);
    window.parentFormContext.getAttribute(responseAttributeLogicalName).setValue(data.trim());

    // In order to keep the survey in place without showing a thank you or blank page
    // Set the state to running, keep the data and go to the first page
    survey.clear(false, true);
    survey.render();

    //When the survey is saved, reset the notification timer.
    timeSinceLastNotification = null;
  });
  survey.onAfterRenderSurvey.add(function (survey, options) {
    // Hide complete button after survey renders.
    $(".sv_complete_btn").remove();
  });
  survey.onValueChanged.add(function (survey, options) {
    //Adding a space to the questionnaireresponse to make the form dirty. The space gets trimmed off in survey.onComplete.
    var data = JSON.stringify(survey.data, null, 3) + " ";
    if (window.parentFormContext != null)
      window.parentFormContext.getAttribute(responseAttributeLogicalName).setValue(data);
  });
  //Show an unsaved changes notification after 10 minutes when a value is changed.
  survey.onValueChanged.add(function (survey, options) {
    if (timeSinceLastNotification == null) timeSinceLastNotification = Date.now();

    if (Date.now() - timeSinceLastNotification < 600000) return;

    // define notification object
    var notification = {
      type: 1,
      level: 3, //warning
      message: unsavedNotificationMessage,
    };

    parent.Xrm.App.addGlobalNotification(notification);

    timeSinceLastNotification = Date.now();
  });

  survey.onValueChanged.add(function (survey, options) {
    const el = document.getElementById(options.name);
    if (el) {
      el.value = options.value;
    }
  });
  //Create showdown markdown converter
  var converter = new showdown.Converter();
  survey.onTextMarkdown.add(function (survey, options) {
    //convert the markdown text to html
    var str = converter.makeHtml(options.text);
    if (str.indexOf("<p>") == 0) {
      //remove root paragraphs<p></p>
      str = str.substring(3);
      str = str.substring(0, str.length - 4);
    }
    //set html
    options.html = str;
  });

  // Add a character count and limit to Comment questions.
  // If the maxLength is the default value of -1, set maxLength to 5000.
  // No character count if maxLength was set to 0
  survey.onAfterRenderQuestion.add(function (survey, options) {
    if (options.question.getType() !== "comment") return;
    var comment = options.htmlElement.getElementsByTagName("textarea")[0];
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
        div.innerText = maxLength - currLength + " " + charactersRemainingLocalizedText;
      };
      changingHandler();
      comment.onkeyup = changingHandler;
    }
  });
  survey.onValidateQuestion.add(function (sender, options) {
    if (options.question.getType() == "finding") {
      //Add error if any findingTypes are Undecided
      if (options.value.operations != null) {
        let hasUndecided = false;
        for (let operation of options.value.operations) {
          if (operation.findingType == 717750000) {
            hasUndecided = true;
          }
        }
        if (hasUndecided) {
          options.error = undecidedFindingTypeErrorLocalizedText;
        }
      }
      //Add error if comment is empty
      if (options.value.comments == "" && options.question.isRequired) {
        //If there's already error text, add a line break
        if (options.error != null) {
          options.error += "<br>" + provideDetailsLocalizedText;
        } else {
          options.error = provideDetailsLocalizedText;
        }
      }
    }
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

    if (survey.mode == "display") {
      detailBox.readOnly = true;
    }
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
      characterCount.innerText = detailBox.maxLength - currLength + " " + charactersRemainingLocalizedText;
    };
    detailBoxOnKeyUpHandler();
    detailBox.onkeyup = detailBoxOnKeyUpHandler;

    //Update detail text in survey response
    detailBox.onchange = function () {
      survey.setValue(options.question.name + "-Detail", detailBox.value);
    };

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
  }

  //Add Detail content to questions when they are rendered in the survey
  survey.onAfterRenderQuestion.add(function (survey, options) {
    if (options.question.getType() == "finding") {
      if (survey.mode == "display") {
        var comment = options.htmlElement.getElementsByTagName("textarea")[0];
        comment.readOnly = true;
      }
    }
    //Load JSON definition, find current question, check hasDetail
    if (options.question.hasDetail == true) {
      appendDetailToQuestion(survey, options);
    }

    if (options.question.applicableProvisionsData != null) {
      appendApplicableProvisionsData(survey, options);
      appendExemptions(survey, options);
    }
  });

  survey.onUpdateQuestionCssClasses.add(function (survey, options) {
    var classes = options.cssClasses;

    if (options.question.isRequired) {
      classes.title += " sq-title-required";
    }
    if (options.question.getType() == "finding") {
      classes.title += " sq-title-finding";
    }
  });

  $("#surveyElement").Survey({
    model: survey,
  });
}

function DoComplete() {
  var currentPageNo = survey.currentPageNo;
  window.survey.doComplete();
  survey.currentPage = currentPageNo;
}

function PrintSurveyPage() {
  // Check if the Questionnaire name is available and set it as the pdf file name
  var questionnairePrintPageFileName = "";
  var surveyTitleElement = document.getElementsByClassName("sv_page_title");

  if (surveyTitleElement.length > 0) {
    // Set the Questionnaire name as the pdf file name
    var surveyTitleElementText = surveyTitleElement[0].querySelector("span").textContent;
    questionnairePrintPageFileName = surveyTitleElementText.replace(/ /g, "_");
  }

  // If there is no Questionnaire name available, give the pdf a default file name
  if (questionnairePrintPageFileName === "") {
    var lang = parent.Xrm.Utility.getGlobalContext().userSettings.languageId;
    if (lang == 1036) {
      questionnairePrintPageFileName = "Impression_de_la_page_du_questionnaire";
    } else {
      questionnairePrintPageFileName = "Questionnaire_Page_Printout";
    }
  }

  // https://ekoopmans.github.io/html2pdf.js/
  // Set the options for creating the PDF
  var opt = {
    jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
    pagebreak: { mode: "avoid-all", before: ".sv_nav" },
    filename: questionnairePrintPageFileName,
  };

  // Clone the survey element
  var surveyElement = document.getElementById("surveyElement");
  var surveyClone = surveyElement.cloneNode(true);

  // Function to hide elements with the text '##### characters remain'
  function hideCharacterCountElements(clone) {
    var characterCountElements = clone.querySelectorAll("span");
    characterCountElements.forEach(function (span) {
      if (span.textContent.match(/\d+ characters remain/)) {
        span.style.display = "none"; // Hide the element
      }
    });
  }

  // Hide character count elements in the clone
  hideCharacterCountElements(surveyClone);

  // Convert textareas to editable divs
  function convertTextareaToDiv(textarea) {
    var editableDiv = document.createElement("div");
    editableDiv.style.cssText = textarea.style.cssText; // Copy the style
    editableDiv.setAttribute("contenteditable", "false"); // Make it read-only
    editableDiv.textContent = textarea.value; // Copy the text content
    editableDiv.style.overflowWrap = "break-word"; // Ensure long words wrap
    editableDiv.style.wordBreak = "break-word"; // Break words to prevent overflow
    editableDiv.style.whiteSpace = "pre-wrap"; // Maintain whitespace formatting
    editableDiv.style.display = "inline-block"; // Set display to inline-block
    editableDiv.style.marginTop = "10px";
    editableDiv.style.breakInside = "avoid"; // Prevents the div from being split across pages

    // Replace the textarea with the editable div
    textarea.parentNode.replaceChild(editableDiv, textarea);
  }

  // Get all textareas and convert them before creating the PDF
  var textareas = surveyClone.querySelectorAll("textarea");
  textareas.forEach(convertTextareaToDiv);

  // Create the actual PDF
  html2pdf().set(opt).from(surveyClone).saveAs();

  // Clean up: Remove the clone from the DOM if it was added for conversion
  if (surveyClone.parentNode) {
    surveyClone.parentNode.removeChild(surveyClone);
  }
}
