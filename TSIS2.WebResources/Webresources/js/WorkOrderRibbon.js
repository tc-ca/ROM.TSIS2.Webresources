var workorderRibbon_lang = parent.Xrm.Utility.getGlobalContext().userSettings.workorderRibbon_languageId;

var workOrderLocalized = "Work Order";
var workOrderDetailsLocalized = "Work Order Details";
var WorkOrderServiceTaskDetailsLocalized = "Work Order Service Task Details";
var serviceTaskLocalized = "Service Task";
var taskTypeLocalized = "Task Type";
var statusReasonLocalized = "Status Reason";
var totalFindingsLocalized = "Total Findings";
var overallInspectionCommentLocalized = "Overall Inspection Comments";
var findingsLocalized = "Findings";
var provisionReferenceLocalized = "Provision Reference";
var findingTypeLocalized = "Finding Type";
var stakeholderLocalized = "Stakeholder";
var operationLocalized = "Operation";
var inspectorCommentLocalized = "Inspector Comment";
var workOrderCommitMessageText = "The selected Work Order(s) have been set to a Committed State";
var workOrderCommitMessageTitle = "Work Orders Committed";

if (workorderRibbon_lang == 1036) {
  workOrderLocalized = "Ordre de travail";
  workOrderDetailsLocalized = "Détails de l'ordre de travail";
  WorkOrderServiceTaskDetailsLocalized = "Détails de la tâche du service d'ordre de travail";
  serviceTaskLocalized = "Tâche du service";
  taskTypeLocalized = "Type de tâche";
  statusReasonLocalized = "Raison du statut";
  totalFindingsLocalized = "Nombre de constatations";
  overallInspectionCommentLocalized = "Commentaires généraux sur l'inspection";
  findingsLocalized = "Constatations";
  provisionReferenceLocalized = "Référence de la disposition";
  findingTypeLocalized = "Finding Type FR";
  stakeholderLocalized = "Intervenant";
  operationLocalized = "Opération";
  inspectorCommentLocalized = "Commentaires de l'inspecteur";
  workOrderCommitMessageText = "Les ordres de travail ont été changé à l’état validé";
  workOrderCommitMessageTitle = "Ordres de travail validés";
}
/**
 * Determines if the "Add Existing" ribbon button should be visible on a specific form.
 * @param {Xrm.FormContext} primaryControl - The form context passed automatically by Ribbon Workbench
 * @param {string} targetFormId - The GUID of the form where the "Add Existing" button should be visible.
 * @returns {boolean} - True if the current form matches the target form
 */
function showAddExistingButton(primaryControl, targetFormId) {
  const currentFormId = primaryControl.ui.formSelector.getCurrentItem().getId();
  return currentFormId === targetFormId;
}
function addExistingWorkOrdersToCase(primaryControl, selectedEntityTypeName, selectedControl) {
  const formContext = primaryControl;
  const workOrderNumber = formContext.getAttribute("msdyn_name").getValue();

  const caseId = Xrm.Page.data.entity.getId().replace(/({|})/g, "");

  const stakeholderAttribute = formContext.getAttribute("customerid");
  const siteAttribute = formContext.getAttribute("msdyn_functionallocation");

  const stakeholderAttributeValue = stakeholderAttribute.getValue();
  const siteAttributeValue = siteAttribute.getValue();

  var lookupOptions = {
    defaultEntityType: "msdyn_workorder",
    entityTypes: ["msdyn_workorder"],
    allowMultiSelect: true,
    defaultViewId: "fce37246-eba1-4e92-bb9d-f8cb3ec38e3f",
    disableMru: true,
    filters: [
      {
        filterXml:
          `<filter type="and">` +
          `<condition attribute="msdyn_serviceaccount" operator="eq" value="${stakeholderAttributeValue[0].id}" />` +
          `<condition attribute="ts_site" operator="eq" value="${siteAttributeValue[0].id}" />` +
          `<condition attribute="msdyn_servicerequest" operator="neq" value="${Xrm.Page.data.entity.getId()}" />` +
          `</filter>`,
        entityLogicalName: "msdyn_workorder",
      },
    ],
  };

  Xrm.Utility.lookupObjects(lookupOptions).then(
    function (result) {
      console.log(result);
      for (var i = 0; i < result.length; i++) {
        var req = new XMLHttpRequest();

        req.open(
          "PATCH",
          formContext.context.getClientUrl() +
            "/api/data/v9.0/" +
            "msdyn_workorders" +
            "(" +
            result[i].id.replace(/({|})/g, "") +
            ")"
        );
        req.setRequestHeader("Content-Type", "application/json");
        req.setRequestHeader("Accept", "application/json");
        req.setRequestHeader("OData-MaxVersion", "4.0");
        req.setRequestHeader("OData-Version", "4.0");

        var payload = {
          "msdyn_servicerequest@odata.bind":
            formContext.context.getClientUrl() + "/api/data/v9.0/" + "incidents" + "(" + caseId + ")",
        };

        req.onreadystatechange = function () {
          if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 204) {
              selectedControl.refresh();
            } else {
              showErrorMessageAlert(this.statusText, workOrderNumber);
            }
          }
        };

        req.send(JSON.stringify(payload));
      }
    },
    function (error) {
      showErrorMessageAlert(error, workOrderNumber);
    }
  );
}

function ActivateWorkOrder(primaryControl) {
  const formContext = primaryControl;
  const workOrderNumber = formContext.getAttribute("msdyn_name").getValue();
  $.ajaxSetup({ cache: true });
  $.getScript("../WebResources/ts_/js/Common.js", function () {
    $.ajaxSetup({ cache: false });
    var confirmStrings = {
      confirmButtonLabel: "Activate",
      cancelButtonLabel: "Cancel",
      text: "Are you sure you want to activate the selected 1 Work Order?\nThis will set the Work Order to the Active state.",
      title: "Confirm Work Order Activation",
    };
    var confirmOptions;
    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
      function (success) {
        if (success.confirmed) {
          formContext.getAttribute("statecode").setValue(0);
          formContext.getAttribute("statuscode").setValue(1);

          // taken out because we don't use 'Completed' as a WO System Status
          //if (userHasRole("System Administrator|ROM - Business Admin|ROM - Manager")) {
          //    formContext.getAttribute("msdyn_systemstatus").setValue(690970003); //Open - Completed
          //}

          openWorkOrderServiceTasks(formContext);
          setWorkOrderServiceTasksView(formContext);

          formContext.data.save();
        }
      },
      function (error) {
        showErrorMessageAlert(error, workOrderNumber);
      }
    );
  });
}

function openWorkOrderServiceTasks(formContext) {
  const workOrderNumber = formContext.getAttribute("msdyn_name").getValue();
  workOrderServiceTaskData = {
    statecode: 0, //closed -> 1
    statuscode: 918640002, //closed -> 918640003
  };

  Xrm.WebApi.online
    .retrieveMultipleRecords(
      "msdyn_workorderservicetask",
      `?$select=msdyn_workorder&$filter=msdyn_workorder/msdyn_workorderid eq ${formContext.data.entity.getId()}`
    )
    .then(
      function success(result) {
        for (var i = 0; i < result.entities.length; i++) {
          Xrm.WebApi.updateRecord(
            "msdyn_workorderservicetask",
            result.entities[i].msdyn_workorderservicetaskid,
            workOrderServiceTaskData
          ).then(
            function success(result) {},
            function (error) {
              showErrorMessageAlert(error, workOrderNumber);
            }
          );
        }
      },
      function (error) {
        showErrorMessageAlert(error, workOrderNumber);
      }
    );
}

function setWorkOrderServiceTasksView(formContext) {
  var activeWorkOrderServiceTasksView = {
    entityType: "savedquery",
    id: "{C9FD8F4D-8184-4DDB-A31A-89E66E8E710E}",
    name: "Active Work Order Service Tasks",
  };

  formContext.getControl("workorderservicetasksgrid").getViewSelector().setCurrentView(activeWorkOrderServiceTasksView);
}

function showErrorMessageAlert(error, workOrderNumber) {
  var errorMessage = error.message || error.toString();
  if (workOrderNumber) {
    errorMessage = "Work Order: " + workOrderNumber + "\n\nError: " + errorMessage;
  }
  var alertStrings = { text: errorMessage };
  var alertOptions = { height: 120, width: 260 };
  Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function () {});
}

//Returns true if the Work Order has a name, meaning it has been saved/created. Used for Hiding/Showing Ribbon buttons.
function hasWorkOrderName(primaryControl) {
  return primaryControl.getAttribute("msdyn_name").getValue() != null;
}

//Opens a new window and renders the details of the Work Order and its associated Service Tasks to the opened page to be printed
function exportWorkOrder(primaryControl) {
  var workOrderTitle = workOrderLocalized + " " + primaryControl.getAttribute("msdyn_name").getValue();
  var exportWindow = window.open();
  //Write HTML page template to export Window
  exportWindow.document.write(
    `<html><head><title>${workOrderTitle}</title><link rel="stylesheet" type="text/css" href="../WebResources/ts_/css/WorkOrderExport.css"></head><body></body></html>`
  );

  //Create Work Order Header
  var workOrderHeader = exportWindow.document.createElement("h1");
  workOrderHeader.innerText = workOrderTitle;

  //Create Work Order Details Header
  workOrderDetailsHeader = exportWindow.document.createElement("h2");
  workOrderDetailsHeader.innerText = workOrderDetailsLocalized;

  //Load Work Order Field Labels and Values

  //Load properties for Stakeholder field
  var stakeholderLabel = primaryControl.getControl("msdyn_serviceaccount").getLabel();
  var stakeholderValue = primaryControl.getAttribute("msdyn_serviceaccount").getValue();
  var stakeholderText = stakeholderValue != null ? stakeholderValue[0].name : "";
  //Load properties for Site field
  var siteLabel = primaryControl.getControl("ts_site").getLabel();
  var siteValue = primaryControl.getAttribute("ts_site").getValue();
  var siteText = siteValue != null ? siteValue[0].name : "";
  //Load properties for Activity Type field
  var activityTypeLabel = primaryControl.getControl("msdyn_primaryincidenttype").getLabel();
  var activityTypeValue = primaryControl.getAttribute("msdyn_primaryincidenttype").getValue();
  var activityTypeText = activityTypeValue != null ? activityTypeValue[0].name : "";

  //Create unordered list and add in Work Order Field Values
  var workOrderDetailsList = exportWindow.document.createElement("ul");
  workOrderDetailsList.style.listStyleType = "none";
  workOrderDetailsList.innerHTML += "<li><strong>" + stakeholderLabel + ":</strong> " + stakeholderText + "</li>";
  workOrderDetailsList.innerHTML += "<li><strong>" + siteLabel + ":</strong> " + siteText + "</li>";
  workOrderDetailsList.innerHTML += "<li><strong>" + activityTypeLabel + ":</strong> " + activityTypeText + "</li>";

  //Append Headers and details list to exportWindow's document body
  var exportWindowBody = exportWindow.document.body;
  exportWindowBody.appendChild(workOrderHeader);
  exportWindowBody.appendChild(workOrderDetailsHeader);
  exportWindowBody.appendChild(workOrderDetailsList);

  //Grab the Work Order's name to use when retrieving all the Service Tasks associated to the work Order
  var workOrderName = primaryControl.getAttribute("msdyn_name").getValue();

  //Start a list of service task containers. These will be filled below and then sorted when they're all full
  var WOSTContainerList = [];

  //Retrieve all Service Tasks associated to the Work Order
  Xrm.WebApi.retrieveMultipleRecords(
    "msdyn_workorderservicetask",
    `?$select=msdyn_workorderservicetaskid,msdyn_name,_msdyn_tasktype_value,ovs_questionnaireresponse,statuscode,ovs_questionnairedefinition&$filter=msdyn_workorder/msdyn_name eq '${workOrderName}'`
  ).then(
    async function success(result) {
      if (result.entities.length > 0) {
        //Create Work Order Service Task Details Header
        WOSTDetailsHeader = exportWindow.document.createElement("h2");
        WOSTDetailsHeader.innerText = WorkOrderServiceTaskDetailsLocalized;
        exportWindowBody.appendChild(WOSTDetailsHeader);

        var findingPromises = [];

        //Render Details for every Service Task Retrieved
        result.entities.forEach(function (entity) {
          //Load needed values from the current entity
          var WOSTName = entity.msdyn_name;
          var WOSTTaskType = entity["_msdyn_tasktype_value@OData.Community.Display.V1.FormattedValue"];
          var WOSTStatus = entity["statuscode@OData.Community.Display.V1.FormattedValue"];
          var WOSTResponse = JSON.parse(entity.ovs_questionnaireresponse);

          //Create Div to contain WOST Details, assigning class to prevent page breaking during printing
          var WOSTDetailsDiv = exportWindow.document.createElement("div");
          WOSTDetailsDiv.className = "WOSTDetailsContainer";

          //Create Service Task Details Header
          var WOSTDetailsNameHeader = exportWindow.document.createElement("h3");
          WOSTDetailsNameHeader.innerText = serviceTaskLocalized + " " + WOSTName;

          //Create unordered list and add in Service Task Values
          var WOSTDetailsList = exportWindow.document.createElement("ul");
          WOSTDetailsList.style.listStyleType = "none";
          WOSTDetailsList.innerHTML += "<li><strong>" + taskTypeLocalized + ":</strong> " + WOSTTaskType + "</li>";
          WOSTDetailsList.innerHTML += "<li><strong>" + statusReasonLocalized + ":</strong > " + WOSTStatus + "</li > ";

          //Add Total Findings: 0, will be updated when findings are retrieved
          var totalFindings = exportWindow.document.createElement("li");
          var activeFindingsCount = 0;

          //Create Container to hold everything related to this service task
          var WOSTContainer = exportWindow.document.createElement("div");

          //Append Header and Service Task List to exportWindow's document body
          WOSTDetailsDiv.appendChild(WOSTDetailsNameHeader);
          WOSTDetailsDiv.appendChild(WOSTDetailsList);
          WOSTContainer.appendChild(WOSTDetailsDiv);

          //If no Questionnaire Response is in the current Service Task, nothing else needs to be done so return
          if (WOSTResponse == null) {
            //Set a blank overall inspection comment
            WOSTDetailsList.innerHTML += "<strong>" + overallInspectionCommentLocalized + ":</strong> ";
            //Show 0 Total Findings
            totalFindings.innerHTML = "<strong>" + totalFindingsLocalized + ":</strong> 0";
            //Append Total Findings to Service Task Value List
            WOSTDetailsList.appendChild(totalFindings);
            WOSTContainerList.push({
              WOSTNumber: WOSTName.split("-").pop(),
              container: WOSTContainer,
            });
            return;
          }
          var responseKeys = Object.keys(WOSTResponse);
          var inspectionCommentText = "";

          //If it starts with "Overall Inspection Comment", set inspectionCommentText to its value
          responseKeys.forEach(function (key) {
            if (key.startsWith("Overall Inspection Comment")) {
              inspectionCommentText = WOSTResponse[key];
            }
          });

          //Add the Overall Inspection Comment to the Service Task details list
          WOSTDetailsList.innerHTML +=
            "<strong>" + overallInspectionCommentLocalized + ":</strong> " + inspectionCommentText;

          var WOSTId = entity.msdyn_workorderservicetaskid;
          var findingPromise = Xrm.WebApi.retrieveMultipleRecords(
            "ovs_finding",
            `?$select=ovs_findingprovisionreference,ts_findingprovisiontexten,ts_findingprovisiontextfr,ovs_findingcomments,statecode,_ts_operationid_value,_ts_accountid_value,ts_findingtype&$filter=_ovs_workorderservicetaskid_value eq '${WOSTId}'`
          ).then(async function success(result, index) {
            if (result.entities.length > 0) {
              //Create a table to display all findings
              var findingsTable = exportWindow.document.createElement("table");
              var findingsTableHeaderRow = exportWindow.document.createElement("tr");
              var findingsTableHeader = exportWindow.document.createElement("th");
              findingsTableHeader.innerText = findingsLocalized;
              findingsTableHeaderRow.appendChild(findingsTableHeader);
              findingsTable.appendChild(findingsTableHeaderRow);
              //For each finding, create a table row add the findings data to that row
              result.entities.forEach(function (finding) {
                if (finding.statecode == 1) return;
                activeFindingsCount += 1;
                var findingsDataRow = exportWindow.document.createElement("tr");
                var findingsData = exportWindow.document.createElement("td");
                var provisionReference = finding.ovs_findingprovisionreference || "";
                var provisiontText = finding.ts_findingprovisiontexten || "";
                var findingType = finding["ts_findingtype@OData.Community.Display.V1.FormattedValue"] || "";
                var accountableOperation =
                  finding["_ts_operationid_value@OData.Community.Display.V1.FormattedValue"] || "";
                var accountableStakeholder =
                  finding["_ts_accountid_value@OData.Community.Display.V1.FormattedValue"] || "";
                var findingComments = finding.ovs_findingcomments || "";
                if (workorderRibbon_lang == 1036 && finding.ts_findingprovisiontextfr != undefined)
                  provisiontText = finding.ts_findingprovisiontextfr;
                findingsData.innerHTML +=
                  "<strong>" + provisionReferenceLocalized + ":</strong> " + provisionReference + "<br>";
                findingsData.innerHTML += provisiontText + "<br>";
                findingsData.innerHTML += "<strong>" + findingTypeLocalized + ":</strong> " + findingType + "<br>";
                findingsData.innerHTML +=
                  "<strong>" + stakeholderLocalized + ":</strong> " + accountableOperation + "<br>";
                findingsData.innerHTML +=
                  "<strong>" + operationLocalized + ":</strong> " + accountableStakeholder + "<br>";
                findingsData.innerHTML +=
                  "<strong>" + inspectorCommentLocalized + ":</strong> " + findingComments + "<br>";
                findingsDataRow.appendChild(findingsData);
                findingsTable.appendChild(findingsDataRow);
              });
              WOSTContainer.appendChild(findingsTable);
            }
            //Update total findings count
            totalFindings.innerHTML = "<strong>" + totalFindingsLocalized + ":</strong> " + activeFindingsCount;
            //Append Total Findings to Service Task Value List
            WOSTDetailsList.appendChild(totalFindings);

            WOSTContainerList.push({
              WOSTNumber: WOSTName.split("-").pop(),
              container: WOSTContainer,
            });
          });
          findingPromises.push(findingPromise);
        });
        //Wait for all the retrievals of the findings in all the retrievals of the service tasks to finish, then print.
        Promise.all(findingPromises).then(() => {
          //Sort the WOST Containers in order of the service task numbers, then append to the exportWindow in sorted order
          WOSTContainerList.sort(function (a, b) {
            return a.WOSTNumber - b.WOSTNumber;
          });
          WOSTContainerList.forEach((WOSTC) => {
            exportWindowBody.appendChild(WOSTC.container);
            exportWindowBody.innerHTML += "<hr>";
          });
          exportWindow.print();
          exportWindow.close();
        });
      } else {
        //No service tasks, so print
        exportWindow.print();
        exportWindow.close();
      }
    },
    function (error) {
      console.log(error.message);
      // handle error conditions
    }
  );
}

/// <summary>
/// Opens a lookup dialog to add users to the Access Team of a Work Order or
/// Unplanned Work Order.
/// Detects the entity type, selects the correct Team Template, filters out users
/// already in the team, and calls the custom action ts_AddUserToAccessTeam for
/// each selected user. Refreshes the subgrid when done.
/// </summary>
/// <remarks>
/// Supports msdyn_workorder and ts_unplannedworkorder.
/// Filters out existing team members, the owner, and applies inspector-team rules.
/// </remarks
function addExistingUsersToWorkOrder(primaryControl, selectedEntityTypeName, selectedControl) {
    const formContext = primaryControl;
    const currentWorkOrderRecordOwnerId = formContext.getAttribute("ownerid").getValue()[0].id.replace(/({|})/g, "");
    const parentEntityName = formContext.data.entity.getEntityName();

    let teamTemplateId = null;
    let incidentTypeId = null;
    let currentWorkOrderRecordId = null;
    let incidentTypeAttr = null;

    if (parentEntityName === "msdyn_workorder") {
        incidentTypeAttr = formContext.getAttribute("msdyn_primaryincidenttype");

        if (incidentTypeAttr?.getValue()?.length > 0) {
            incidentTypeId = incidentTypeAttr.getValue()[0].id.replace(/({|})/g, "");
            currentWorkOrderRecordId = formContext.data.entity.getId().replace(/({|})/g, "");
        }
        getTeamTemplateId("Work Order Access Team", function (id) {
            teamTemplateId = id;
        });
    }
    else if (parentEntityName === "ts_unplannedworkorder") {
        incidentTypeAttr = formContext.getAttribute("ts_primaryincidenttype");

        if (incidentTypeAttr?.getValue()?.length > 0) {
            incidentTypeId = incidentTypeAttr.getValue()[0].id.replace(/({|})/g, "");
            currentWorkOrderRecordId = formContext.data.entity.getId().replace(/({|})/g, "");
        }
        getTeamTemplateId("Unplanned Work Order Access Team", function (id) {
            teamTemplateId = id;
        });
    }

  //Identify WO (ISSO or AvSec) with the activity type field
  Xrm.WebApi.retrieveRecord("msdyn_incidenttype", incidentTypeId, "?$select=_ownerid_value").then(async function (
    incidentType
  ) {
    const incidentTypeOwnerId = getOwnerIdFromRecord(incidentType);
    const isAvSec = incidentTypeOwnerId ? await isOwnedByAvSec(incidentTypeOwnerId) : false;
    const isISSO = incidentTypeOwnerId ? await isOwnedByISSO(incidentTypeOwnerId) : false;
    const isRailSafety = incidentTypeOwnerId ? await isOwnedByRailSafety(incidentTypeOwnerId) : false;

      // TODO: Need to revisit once it is determined what will be done with the inspector teams.
      let inspectorTeamConditions = "";
      if (isAvSec) {
          inspectorTeamConditions =
              '<condition entityname="aa" attribute="name" operator="like" value="Aviation%Inspectors" />';
      }
      else if (isISSO) {
          inspectorTeamConditions = '<condition entityname="aa" attribute="name" operator="eq" value="ISSO%Inspectors" />';
      }
      else if (isRailSafety) {
          inspectorTeamConditions = '<condition entityname="aa" attribute="name" operator="eq" value="Rail Safety Auditor" />';
      }

      let entityName = parentEntityName;
      let entityNameId= parentEntityName + "id";
      let alreadyExistingUsersInAccessTeamFetchXML =
          `<fetch>
        <entity name="systemuser">
            <attribute name="systemuserid"/>
            <link-entity name="teammembership" from="systemuserid" to="systemuserid" link-type="inner" intersect="true">
                <link-entity name="team" from="teamid" to="teamid" link-type="inner">
                    <link-entity name="teamtemplate" from="teamtemplateid" to="teamtemplateid" link-type="inner">
                        <attribute name="teamtemplateid"/>
                        <filter>
                            <condition attribute="teamtemplateid" operator="eq" value="${teamTemplateId}"/>
                        </filter>
                    </link-entity>
                    <link-entity name="principalobjectaccess" from="principalid" to="teamid" link-type="inner">
                        <link-entity name="${entityName}" from="${entityNameId}" to="objectid" link-type="inner">
                            <attribute name="${entityNameId}"/>
                            <filter>
                                <condition attribute="${entityNameId}" operator="eq" value="${currentWorkOrderRecordId}"/>
                            </filter>
                        </link-entity>
                    </link-entity>
                </link-entity>
            </link-entity>
        </entity>
    </fetch>`;

    let alreadyExistingUsersInAccessTeamCondition;
 
    Xrm.WebApi.retrieveMultipleRecords(
      "systemuser",
      "?fetchXml=" + encodeURIComponent(alreadyExistingUsersInAccessTeamFetchXML)
    ).then(
      function success(result) {
        for (var i = 0; i < result.entities.length; i++) {
          alreadyExistingUsersInAccessTeamCondition += `<condition attribute="systemuserid" operator="neq" value="${result.entities[i].systemuserid}" />`;
        }

        const defaultViewId = "d651eb0f-3ea9-ec11-983e-0022483e6bb0";
        const viewIds = ["d651eb0f-3ea9-ec11-983e-0022483e6bb0"];
        var lookupOptions = {
          defaultEntityType: "sytemuser",
          entityTypes: ["systemuser"],
          allowMultiSelect: true,
          defaultViewId: `${defaultViewId}`,
          disableMru: true,
          viewIds: viewIds,
          filters: [
            {
              filterXml:
                `<filter type="and">` +
                `${alreadyExistingUsersInAccessTeamCondition}` + //filter out users already in the WO team
                `<condition attribute="systemuserid" operator="neq" value="${currentWorkOrderRecordOwnerId}" />` + //filter out current user
                `</filter>`,
              entityLogicalName: "systemuser",
            },
            {
              filterXml: `<filter type="and"> ${inspectorTeamConditions} </filter>`, //filter corresponding inspector team (AvSec or ISSO)
              entityLogicalName: "team",
            },
          ],
        };
        // Add selected user(s) to Work Order via custom action
        Xrm.Utility.lookupObjects(lookupOptions).then(async function (result) {

            // Build list of promises
            const requests = [];

            for (let i = 0; i < result.length; i++) {

                requests.push(new Promise((resolve, reject) => {

                    var userId = result[i].id.replace(/({|})/g, "");

                    var payload = {
                        Record: {
                            "@odata.type": `Microsoft.Dynamics.CRM.${parentEntityName}`,
                            [`${parentEntityName}id`]: currentWorkOrderRecordId
                        },
                        TeamTemplate: {
                            "@odata.type": "Microsoft.Dynamics.CRM.teamtemplate",
                            teamtemplateid: teamTemplateId
                        }
                    };

                    var req = new XMLHttpRequest();
                    req.open(
                        "POST",
                        formContext.context.getClientUrl() +
                        "/api/data/v9.0/systemusers(" + userId + ")/Microsoft.Dynamics.CRM.ts_AddUserToAccessTeam",
                        true
                    );
                    req.setRequestHeader("Content-Type", "application/json");
                    req.setRequestHeader("Accept", "application/json");
                    req.setRequestHeader("OData-MaxVersion", "4.0");
                    req.setRequestHeader("OData-Version", "4.0");

                    req.onreadystatechange = function () {
                        if (this.readyState === 4) {
                            req.onreadystatechange = null;

                            if (this.status === 200 || this.status === 204) {
                                resolve(); // Mark request as complete
                            } else {
                                var alertStrings = { text: this.status + " " + this.responseText };
                                var alertOptions = { height: 120, width: 260 };
                                Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
                                reject(); // mark failure
                            }
                        }
                    };
                    req.send(JSON.stringify(payload));
                }));
            }
            await Promise.all(requests);
            selectedControl.refresh();
        }, function (error) {
            showErrorMessageAlert(error);
        });
      },
      function (error) {
        console.log(error.message);
      }
    );
  });
}

function getTeamTemplateId(teamTemplateName, callback) {
    const query = `?$select=teamtemplateid&$filter=teamtemplatename eq '${teamTemplateName}'`;

    Xrm.WebApi.retrieveMultipleRecords("teamtemplate", query).then(
        function success(result) {
            if (result.entities.length > 0) {
                callback(result.entities[0].teamtemplateid);
            } else {
                console.error("Team template not found:", teamTemplateName);
                callback(null);
            }
        },
        function error(error) {
            console.error("Error fetching team template:", error);
            callback(null);
        }
    );
}

function planningWorkOrder(data) {
  Xrm.Navigation.navigateTo(
    {
      pageType: "bulkedit",
      entityName: "msdyn_workorder",
      entityIds: data,
      formId: "12e4f1be-8e7e-464a-af5f-40a27b5ba91c",
    },
    {
      target: 2,
      width: {
        value: 65,
        unit: "%",
      },
      height: {
        value: 65,
        unit: "%",
      },
    }
  );
}

function justifyWorkOrder(data) {
  Xrm.Navigation.navigateTo(
    {
      pageType: "bulkedit",
      entityName: "msdyn_workorder",
      entityIds: data,
      formId: "85a91458-af19-ed11-b83f-002248ae441f",
    },
    {
      target: 2,
      width: {
        value: 65,
        unit: "%",
      },
      height: {
        value: 65,
        unit: "%",
      },
    }
  );
}

function justifyWorkOrderCancellation(data) {
  Xrm.Navigation.navigateTo(
    {
      pageType: "bulkedit",
      entityName: "msdyn_workorder",
      entityIds: data,
      formId: "a2e8c429-b027-ed11-9db1-002248ada8c4",
    },
    {
      target: 2,
      width: {
        value: 65,
        unit: "%",
      },
      height: {
        value: 65,
        unit: "%",
      },
    }
  );
}

function workOrdersAddToTrip(data) {
  var parameters = {};
  if (data != null && data.length > 0) {
    parameters["ts_name"] = "Add " + data.length + " work order(s) to trip";
    parameters["ts_inspections"] = data.toString();
  }

  Xrm.Navigation.navigateTo(
    {
      pageType: "entityrecord",
      entityName: "ts_tripinspectionbatchadd",
      data: parameters,
    },
    {
      target: 2,
      width: {
        value: 65,
        unit: "%",
      },
      height: {
        value: 65,
        unit: "%",
      },
    }
  );
}

function commitSelectedWorkOrders(selectedWorkOrdersGuids, selectedControl) {
  for (let workOrderGuid of selectedWorkOrdersGuids) {
    Xrm.WebApi.updateRecord("msdyn_workorder", workOrderGuid, { ts_state: 717750001 });
  }
  var alertStrings = { confirmButtonLabel: "OK", text: workOrderCommitMessageText, title: workOrderCommitMessageTitle };
  var alertOptions = { height: 200, width: 200 };
  Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function success(result) {
    selectedControl.refresh();
  });
}

function isSystemAdministrator() {
  var roles = Xrm.Utility.getGlobalContext().userSettings.roles;
  var enable = false;
  roles.forEach(function (item) {
    if (item.name == "System Administrator") enable = true;
  });
  return enable;
}

function bulkAddAdditionalInspectors(formContext, selectedWorkOrdersGuids) {
  // Centered Dialog
  var pageInput = {
    pageType: "custom",
    name: "ts_bulkaddadditionalinspectors_1936a", //Unique name of Custom page
    recordId: selectedWorkOrdersGuids,
  };
  var navigationOptions = {
    target: 2,
    position: 1,
    width: { value: 450, unit: "px" },
    height: { value: 550, unit: "px" },
    title: workorderRibbon_lang == 1036 ? "Ajouter des inspecteurs supplémentaires" : "Add Additional Inspectors",
  };
  Xrm.Navigation.navigateTo(pageInput, navigationOptions)
    .then
    //function () {
    //    // Called when the dialog closes
    //    formContext.data.refresh();
    //}
    ()
    .catch(function (error) {
      // Handle error
    });
}

function copyServiceTask(formContext) {
  const workOrdersGuid = formContext.data.entity.getId().replace(/({|})/g, "").toLowerCase();
  // Centered Dialog
  var pageInput = {
    pageType: "custom",
    name: "ts_copyservicetask_50612", //Unique name of Custom page
    recordId: workOrdersGuid,
  };
  var navigationOptions = {
    target: 2,
    position: 1,
    width: { value: 450, unit: "px" },
    height: { value: 550, unit: "px" },
    title: workorderRibbon_lang == 1036 ? "Copier la tâche de service" : "Copy Service Task",
  };
  Xrm.Navigation.navigateTo(pageInput, navigationOptions)
    .then
    //function () {
    //    // Called when the dialog closes
    //    formContext.data.refresh();
    //}
    ()
    .catch(function (error) {
      // Handle error
    });
}

function isTeamOrPlanContext(primaryControl) {
  // Determines if subgrid is on ts_teamplanningdata or ts_plan [Shows Commit button, configure in ribbon workbench under rule: ts.msdyn_workorder.isPlanORTeamPlanningDataSubgrid]
  try {
    var formContext;

    // Fallback if primaryControl is undefined
    if (primaryControl && typeof primaryControl.getFormContext === "function") {
      formContext = primaryControl.getFormContext();
    } else if (typeof Xrm !== "undefined" && Xrm.Page) {
      formContext = Xrm.Page;
    } else {
      return false; // No context available
    }

    var entityName = null;
    if (formContext.data && formContext.data.entity) {
      if (typeof formContext.data.entity.getEntityName === "function") {
        entityName = formContext.data.entity.getEntityName();
      } else if (formContext.data.entity.entityName) {
        entityName = formContext.data.entity.entityName;
      }
    }

    return entityName === "ts_teamplanningdata" || entityName === "ts_plan";
  } catch (e) {
    return false;
  }
}

function openUnplannedWorkOrderForm() {
    // Open Unplanned WO form, from ribbon button, and set flag to true to open the related WO on creation of unplanned WO
    Xrm.Navigation.navigateTo({
        pageType: "entityrecord",
        entityName: "ts_unplannedworkorder",
        data: {
            ts_openworkorderoncreation: true
        }
    }, {
        target: 1
    });
}
function editUnplannedWorkOrder(primaryControl) {
  const formContext = primaryControl;
  const currentWorkOrderId = formContext.data.entity.getId().replace(/({|})/g, "");
  var lang = parent.Xrm.Utility.getGlobalContext().userSettings.languageId;

  // Retrieve the related ts_unplannedworkorder using the ts_workorder relationship field
  Xrm.WebApi.retrieveMultipleRecords(
    "ts_unplannedworkorder",
    `?$select=ts_unplannedworkorderid&$filter=_ts_workorder_value eq '${currentWorkOrderId}'`
  ).then(
    function success(result) {
      if (result.entities.length > 0) {
        // Find and open related unplanned work order in a modal window
        const unplannedWorkOrderId = result.entities[0].ts_unplannedworkorderid;

        const pageInput = {
          pageType: "entityrecord",
          entityName: "ts_unplannedworkorder",
          entityId: unplannedWorkOrderId,
          formType: 2,
          useQuickCreateForm: true,
        };

        const navigationOptions = {
          target: 2,
          width: { value: 80, unit: "%" },
          height: { value: 80, unit: "%" },
          position: 1,
        };

        Xrm.Navigation.navigateTo(pageInput, navigationOptions).then(
          function success(result) {
            console.log("Modal opened successfully");
            // Refresh the form after modal closes
            formContext.data.refresh();
            const timelineControl = formContext.getControl("Timeline"); // or your control's name
            if (timelineControl) {
                timelineControl.refresh();
            }
          },
          function error(err) {
            console.error("Error opening modal:", err);
            showErrorMessageAlert(err);
          }
        );
      } else {
        // No related unplanned work order found, show alert
        //var alertStrings = {
        //    text: (lang == 1036) ?
        //        "Aucun ordre de travail non planifié associé trouvé pour cet ordre de travail." :
        //        "No related unplanned work order found for this work order.",
        //    title: (lang == 1036) ? "Aucun enregistrement trouvé" : "No Record Found"
        //};
        //var alertOptions = { height: 120, width: 350 };
        //Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);

        // No related unplanned work order found - create new one with field mappings
        createAndOpenWorkspaceFromWorkOrder(formContext, currentWorkOrderId, lang);
      }
    },
    function error(err) {
      console.error("Error retrieving unplanned work order:", err);
      showErrorMessageAlert(err);
    }
  );
}
// Core: Create workspace from work order - returns Promise<id>
function createWorkspaceFromWorkOrder(currentWorkOrderId, lang) {
  return new Promise((resolve, reject) => {
    // Retrieve work order data to transfer fields
    Xrm.WebApi.retrieveRecord("msdyn_workorder", currentWorkOrderId,
      "?$select=msdyn_name,_ownerid_value,_msdyn_workordertype_value,_ts_region_value,_ts_country_value,_ovs_operationtypeid_value,ts_aircraftclassification,_ts_tradenameid_value,_msdyn_serviceaccount_value,_ts_contact_value,_ts_site_value,_msdyn_functionallocation_value,_ts_subsubsite_value,_ts_reason_value,_ts_workorderjustification_value,_ovs_operationid_value,msdyn_worklocation,_ovs_rational_value,ts_businessowner,_msdyn_primaryincidenttype_value,msdyn_primaryincidentdescription,msdyn_primaryincidentestimatedduration,ts_overtimerequired,ts_reportdetails,_ts_canceledinspectionjustification_value,_ovs_revisedquarterid_value,_ts_scheduledquarterjustification_value,ts_justificationcomment,ts_details,msdyn_instructions,ts_preparationtime,ts_woreportinganddocumentation,ts_comments,ts_overtime,ts_conductingoversight,ts_traveltime,_msdyn_servicerequest_value,_ts_securityincident_value,_ts_trip_value,_msdyn_parentworkorder_value,msdyn_systemstatus,ts_state,_ovs_fiscalyear_value,_ovs_fiscalquarter_value,ts_othercanceledjustification,_ts_accountableteam_value"
    ).then(
      function success(workOrder) {
        // Prepare data for creating the unplanned work order record
        var unplannedWorkOrderData = {
          // Flag to skip plugin from creating a new WO record on the creation of a unplanned WO
          ts_skipplugin: true,
          ts_name: workOrder.msdyn_name
        };

        // Add lookup fields only if they exist
        // Summary
        if (workOrder._ownerid_value) {

            const ownerType = workOrder["_ownerid_value@Microsoft.Dynamics.CRM.lookuplogicalname"];

            if (ownerType === "systemuser") {
                unplannedWorkOrderData["ownerid@odata.bind"] = "/systemusers(" + workOrder._ownerid_value + ")";
            } else if (ownerType === "team") {
                unplannedWorkOrderData["ownerid@odata.bind"] = "/teams(" + workOrder._ownerid_value + ")";
            } else {
                console.warn("Unknown owner type:", ownerType);
            }
        }
        if (currentWorkOrderId) {
          unplannedWorkOrderData["ts_WorkOrder@odata.bind"] = "/msdyn_workorders(" + currentWorkOrderId + ")";
        }
        if (workOrder._msdyn_workordertype_value) {
          unplannedWorkOrderData["ts_workordertype@odata.bind"] = "/msdyn_workordertypes(" + workOrder._msdyn_workordertype_value + ")";
        }
        if (workOrder._ts_region_value) {
          unplannedWorkOrderData["ts_region@odata.bind"] = "/msdyn_regions(" + workOrder._ts_region_value + ")";
        }
        if (workOrder._ts_country_value) {
          unplannedWorkOrderData["ts_country@odata.bind"] = "/tc_countries(" + workOrder._ts_country_value + ")";
        }
        if (workOrder._ovs_operationtypeid_value) {
          unplannedWorkOrderData["ts_operationtype@odata.bind"] = "/ovs_operationtypes(" + workOrder._ovs_operationtypeid_value + ")";
        }
        if (workOrder._ts_tradenameid_value) {
          unplannedWorkOrderData["ts_TradeName@odata.bind"] = "/ts_tradenames(" + workOrder._ts_tradenameid_value + ")";
        }
        if (workOrder._msdyn_serviceaccount_value) {
          unplannedWorkOrderData["ts_stakeholder@odata.bind"] = "/accounts(" + workOrder._msdyn_serviceaccount_value + ")";
        }
        if (workOrder._ts_contact_value) {
          unplannedWorkOrderData["ts_contact@odata.bind"] = "/contacts(" + workOrder._ts_contact_value + ")";
        }
        if (workOrder._ts_site_value) {
          unplannedWorkOrderData["ts_site@odata.bind"] = "/ts_sites(" + workOrder._ts_site_value + ")";
        }
        if (workOrder._msdyn_functionallocation_value) {
          unplannedWorkOrderData["ts_functionallocation@odata.bind"] = "/msdyn_functionallocations(" + workOrder._msdyn_functionallocation_value + ")";
        }
        if (workOrder._ts_subsubsite_value) {
          unplannedWorkOrderData["ts_subsubsite@odata.bind"] = "/msdyn_functionallocations(" + workOrder._ts_subsubsite_value + ")";
        }
        if (workOrder._ts_reason_value) {
          unplannedWorkOrderData["ts_reason@odata.bind"] = "/ts_planningreasons(" + workOrder._ts_reason_value + ")";
        }
        if (workOrder._ts_workorderjustification_value) {
          unplannedWorkOrderData["ts_WorkOrderJustification@odata.bind"] = "/ts_justifications(" + workOrder._ts_workorderjustification_value + ")";
        }
        if (workOrder._ovs_operationid_value) {
          unplannedWorkOrderData["ts_operation@odata.bind"] = "/ovs_operations(" + workOrder._ovs_operationid_value + ")";
        }
        if (workOrder._ovs_rational_value) {
          unplannedWorkOrderData["ts_rational@odata.bind"] = "/ovs_tyrationals(" + workOrder._ovs_rational_value + ")";
        }
        if (workOrder._msdyn_primaryincidenttype_value) {
          unplannedWorkOrderData["ts_primaryincidenttype@odata.bind"] = "/msdyn_incidenttypes(" + workOrder._msdyn_primaryincidenttype_value + ")";
        }
        // Settings
        if (workOrder._ts_canceledinspectionjustification_value) {
          unplannedWorkOrderData["ts_CancelledInspectionJustification@odata.bind"] = "/ts_canceledinspectionjustifications(" + workOrder._ts_canceledinspectionjustification_value + ")";
        }
        if (workOrder._ovs_revisedquarterid_value) {
          unplannedWorkOrderData["ts_revisedquarterid@odata.bind"] = "/tc_tcfiscalquarters(" + workOrder._ovs_revisedquarterid_value + ")";
        }
        if (workOrder._ts_scheduledquarterjustification_value) {
          unplannedWorkOrderData["ts_ScheduledQuarterJustification@odata.bind"] = "/ts_justifications(" + workOrder._ts_scheduledquarterjustification_value + ")";
        }
        if (workOrder._ovs_fiscalyear_value) {
          unplannedWorkOrderData["ts_PlannedFiscalYear@odata.bind"] = "/tc_tcfiscalyears(" + workOrder._ovs_fiscalyear_value + ")";
        }
        if (workOrder._ovs_fiscalquarter_value) {
          unplannedWorkOrderData["ts_PlannedFiscalQuarter@odata.bind"] = "/tc_tcfiscalquarters(" + workOrder._ovs_fiscalquarter_value + ")";
        }
        if (workOrder._ts_accountableteam_value) {
          unplannedWorkOrderData["ts_accountableteam@odata.bind"] = "/teams(" + workOrder._ts_accountableteam_value + ")";
        }
        // Time Tracking
        if (workOrder._msdyn_servicerequest_value) {
          unplannedWorkOrderData["ts_servicerequest@odata.bind"] = "/incidents(" + workOrder._msdyn_servicerequest_value + ")";
        }
        if (workOrder._ts_securityincident_value) {
          unplannedWorkOrderData["ts_SecurityIncident@odata.bind"] = "/ts_securityincidents(" + workOrder._ts_securityincident_value + ")";
        }
        if (workOrder._ts_trip_value) {
          unplannedWorkOrderData["ts_Trip@odata.bind"] = "/ts_trips(" + workOrder._ts_trip_value + ")";
        }
        if (workOrder._msdyn_parentworkorder_value) {
          unplannedWorkOrderData["ts_ParentWorkOrder@odata.bind"] = "/msdyn_workorders(" + workOrder._msdyn_parentworkorder_value + ")";
        }
        // Add simple fields only if they exist
        // Summary
        if (workOrder.ts_aircraftclassification !== null && workOrder.ts_aircraftclassification !== undefined) {
          unplannedWorkOrderData.ts_aircraftclassification = workOrder.ts_aircraftclassification;
        }
        if (workOrder.msdyn_worklocation !== null && workOrder.msdyn_worklocation !== undefined) {
          unplannedWorkOrderData.ts_worklocation = workOrder.msdyn_worklocation;
        }
        if (workOrder.ts_businessowner) {
          unplannedWorkOrderData.ts_businessowner = workOrder.ts_businessowner;
        }
        if (workOrder.msdyn_primaryincidentdescription) {
          unplannedWorkOrderData.ts_primaryincidentdescription = workOrder.msdyn_primaryincidentdescription;
        }
        if (workOrder.msdyn_primaryincidentestimatedduration !== null && workOrder.msdyn_primaryincidentestimatedduration !== undefined) {
          unplannedWorkOrderData.ts_primaryincidentestimatedduration = workOrder.msdyn_primaryincidentestimatedduration;
        }
        if (workOrder.ts_overtimerequired !== null && workOrder.ts_overtimerequired !== undefined) {
          unplannedWorkOrderData.ts_overtimerequired = workOrder.ts_overtimerequired;
        }
        if (workOrder.ts_reportdetails) {
          unplannedWorkOrderData.ts_reportdetails = workOrder.ts_reportdetails;
        }
        // Settings
        if (workOrder.ts_justificationcomment) {
          unplannedWorkOrderData.ts_scheduledquarterjustificationcomment = workOrder.ts_justificationcomment;
        }
        if (workOrder.ts_details) {
          unplannedWorkOrderData.ts_details = workOrder.ts_details;
        }
        if (workOrder.msdyn_instructions) {
          unplannedWorkOrderData.ts_instructions = workOrder.msdyn_instructions;
        }
        if (workOrder.ts_othercanceledjustification) {
          unplannedWorkOrderData.ts_othercancelledjustification = workOrder.ts_othercanceledjustification;
        }
        // Time Tracking
        if (workOrder.ts_preparationtime) {
          unplannedWorkOrderData.ts_wopreparationtime = workOrder.ts_preparationtime;
        }
        if (workOrder.ts_woreportinganddocumentation) {
          unplannedWorkOrderData.ts_woreportinganddocumentation = workOrder.ts_woreportinganddocumentation;
        }
        if (workOrder.ts_comments) {
          unplannedWorkOrderData.ts_comments = workOrder.ts_comments;
        }
        if (workOrder.ts_overtime) {
          unplannedWorkOrderData.ts_overtime = workOrder.ts_overtime;
        }
        if (workOrder.ts_conductingoversight) {
          unplannedWorkOrderData.ts_woconductingoversight = workOrder.ts_conductingoversight;
        }
        if (workOrder.ts_traveltime) {
          unplannedWorkOrderData.ts_wotraveltime = workOrder.ts_traveltime;
        }
        // System Status
        if (workOrder.ts_state)
        {
          unplannedWorkOrderData.ts_state = workOrder.ts_state;
        }
        if (workOrder.msdyn_systemstatus) {
          unplannedWorkOrderData.ts_recordstatus = workOrder.msdyn_systemstatus;
        }
        // Create the unplanned work order record
        Xrm.WebApi.createRecord("ts_unplannedworkorder", unplannedWorkOrderData).then(
          function success(result) {
            console.log("Unplanned work order created successfully with ID: " + result.id);
            resolve(result.id);
          },
          function error(err) {
            console.error("Error creating unplanned work order:", err);
            var alertStrings = {
              text: (lang == 1036) ?
                "Erreur lors de la création de l'ordre de travail non planifié. Veuillez contacter l'administrateur. Détails: " + err.message :
                "Error creating unplanned work order. Please contact administrator. Details: " + err.message,
              title: (lang == 1036) ? "Erreur de création" : "Creation Error"
            };
            var alertOptions = { height: 150, width: 400 };
            Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
            reject(err);
          }
        );
      },
      function error(err) {
        console.error("Error retrieving work order data:", err);
        var alertStrings = {
          text: (lang == 1036) ?
            "Erreur lors de la récupération des données de l'ordre de travail. Veuillez contacter l'administrateur. Détails: " + err.message :
            "Error retrieving work order data. Please contact administrator. Details: " + err.message,
          title: (lang == 1036) ? "Erreur de récupération" : "Retrieval Error"
        };
        var alertOptions = { height: 150, width: 400 };
        Xrm.Navigation.openAlertDialog(alertStrings, alertOptions);
        reject(err);
      }
    );
  });
}

// UI: Wraps creation with modal navigation
async function createAndOpenWorkspaceFromWorkOrder(formContext, currentWorkOrderId, lang) {
  try {
    const workspaceId = await createWorkspaceFromWorkOrder(currentWorkOrderId, lang);
    
    // Open in modal
    await Xrm.Navigation.navigateTo({
      pageType: "entityrecord",
      entityName: "ts_unplannedworkorder",
      entityId: workspaceId,
      formType: 2
    }, {
      target: 2,
      width: { value: 80, unit: "%" },
      height: { value: 80, unit: "%" },
      position: 1
    });
    
    formContext.data.refresh();
  } catch (err) {
    console.error("Error creating and opening unplanned work order:", err);
    showErrorMessageAlert(err);
  }
}
function disableEditButtonOnWorkOrder(primaryControl) {
    // Disable Edit button on Work Order if the Work Order is not "In Progress" or "New" or "Closed" or "Cancelled"
    var attr = primaryControl && primaryControl.getAttribute
        ? primaryControl.getAttribute("msdyn_systemstatus")
        : null;
    var status = attr ? attr.getValue() : null;
    if (status === 690970000 || status === 741130001 || status === 741130000 || status === 690970005) {
        return true; // Enable Edit button
    }
    else {
        return false; // Disable Edit button
    }
}

/**
 * Enables the "Edit Work Order" button when the current user is
 * either the owner of the Work Order or is part of an access team
 * evaluated elsewhere in ROM.WorkOrder.isEditWorkOrderEnabled.
 *
 * @param {any} primaryControl 
 *        The form context passed automatically by the ribbon command.
 *
 * @returns {boolean}
 *          - true: if the current user is the Work Order owner  
 *          - true: if ROM.WorkOrder.isEditWorkOrderEnabled is true  
 *          - false: otherwise
 *
 * @description
 * This function is used as a Ribbon Enable Rule.  
 * It first checks if the logged-in user owns the Work Order record.  
 * If not, it falls back to a shared flag that indicates whether the
 * user has access through an Access Team (e.g., Additional Inspectors).
 */
function enableEditWorkOrderButtonForOwnerOrInspector(primaryControl) {
    const formContext = primaryControl;
    const currentUserId = Xrm.Utility.getGlobalContext().userSettings.userId.replace(/[{}]/g, "");

    const owner = formContext.getAttribute("ownerid")?.getValue();
    if (owner) {
        if (owner[0].id.replace(/[{}]/g, "").toLowerCase() === currentUserId.toLowerCase()) {
            return validUser = true;
        }
    }

    if (canEditWorkOrderWorkspace()) {
        return validUser = true;
    }

    return ROM.WorkOrder.isEditWorkOrderEnabled;
}

/**
 * Display rule: Shows button only when Work Order is in a subgrid on ts_workorderexportjob form
 * Configure in Ribbon Workbench: Enable Rule -> Custom Rule -> Function: isInExportJobSubgrid
 */
function isInExportJobSubgrid(primaryControl) {
  try {
    // Check if we're in a subgrid context by checking parent window
    if (typeof parent !== "undefined" && parent.Xrm && parent.Xrm.Page) {
      var parentEntityName = parent.Xrm.Page.data.entity.getEntityName();
      return parentEntityName === "ts_workorderexportjob";
    }
    return false;
  } catch (e) {
    return false;
  }
}

/**
 * Export questionnaires for this Work Order (called from ribbon button in subgrid)
 * Creates a new export job for the selected Work Orders
 * Configure in Ribbon Workbench:
 *   - Button 1 (what user saw):    exportWorkOrderFromSubgrid(selectedControl)
 *   - Button 2 (show all hidden):  exportWorkOrderFromSubgrid(selectedControl, true)
 * @param {any} selectedControl - The subgrid control
 * @param {boolean} includeHiddenQuestions - Optional flag, default false
 */
async function exportWorkOrderFromSubgrid(selectedControl, includeHiddenQuestions = false) {
  try {
    function pad2(n) {
      return (n < 10 ? "0" : "") + n;
    }

    // Local, user-friendly timestamp for record names (avoid ISO noise)
    function formatDateForJobName(d) {
      var yyyy = d.getFullYear();
      var mm = pad2(d.getMonth() + 1);
      var dd = pad2(d.getDate());
      var hh = pad2(d.getHours());
      var mi = pad2(d.getMinutes());
      return yyyy + "-" + mm + "-" + dd + " " + hh + ":" + mi;
    }

    async function checkForExistingActiveJobs() {
      const activeStatuses = [741130001, 741130002, 741130003, 741130004, 741130005];
      const filterConditions = activeStatuses.map(s => `statuscode eq ${s}`).join(" or ");
      const query = `?$select=ts_name,statuscode&$filter=${filterConditions}&$top=1`;

      try {
        const result = await Xrm.WebApi.retrieveMultipleRecords("ts_workorderexportjob", query);
        return (result.entities && result.entities.length > 0) ? result.entities[0] : null;
      } catch (error) {
        console.error("Error checking for active export jobs:", error);
        return null; // fail-open (server plugin still enforces)
      }
    }

    // 1. Get GUIDs from selected rows
    var selectedRows = selectedControl.getGrid().getSelectedRows();
    var selectedIds = [];
    selectedRows.forEach(function (row) {
      selectedIds.push(row.getData().getEntity().getId().replace(/[{}]/g, ""));
    });

    if (selectedIds.length === 0) {
      Xrm.Navigation.openAlertDialog({ text: "Please select at least one Work Order." });
      return;
    }

    // 2. Concurrency check (UX-only)
    const existingJob = await checkForExistingActiveJobs();
    if (existingJob) {
      await Xrm.Navigation.openAlertDialog({
        confirmButtonLabel: "OK",
        text: `An export is already in progress: "${existingJob.ts_name || "(unnamed)"}". Please wait for it to complete before starting a new export.`
      });
      return;
    }

   // 2. Create ts_workorderexportjob
   var includeHidden =
     includeHiddenQuestions === true ||
     includeHiddenQuestions === "true" ||
     includeHiddenQuestions === 1;

  var entity = {};
  entity.ts_name = "Batch Export (" + selectedIds.length + " Work Orders) - " + formatDateForJobName(new Date());
  entity.statuscode = 741130001; // Client Processing – questionnaire rendering
  entity.ts_hiddenquestions = includeHidden;
   entity.ts_surveypayloadjson = JSON.stringify({
     ids: selectedIds,
     includeHiddenQuestions: includeHidden,
   });

    const result = await Xrm.WebApi.createRecord("ts_workorderexportjob", entity);
    var newId = result.id;

    // 3. Navigation: Open record in a new window (not modal)
    var pageInput = {
      pageType: "entityrecord",
      entityName: "ts_workorderexportjob",
      entityId: newId
    };
    var navigationOptions = { target: 1 };

    try {
      await Xrm.Navigation.navigateTo(pageInput, navigationOptions);
      // Refresh the subgrid
      selectedControl.refresh();
    } catch (e) {
      // Silent fail - user can manually open the record if needed
    }

  } catch (e) {
    console.log("[PDFTEST] Error in exportWorkOrderQuestionnaireFromSubgrid: " + e.message);
    Xrm.Navigation.openAlertDialog({ text: "Error: " + e.message });
  }
}

function canEditWorkOrderWorkspace() {
    var roles = Xrm.Utility.getGlobalContext().userSettings.roles;
    var enable = false;
    roles.forEach(function (item) {
        if (item.name == "System Administrator" || item.name == "ROM - Manager" || item.name == "ROM - Planner" || item.name == "ROM - Business Admin") {
            enable = true;
        } 
    });
    return enable;
}

// Bulk-edit opener for Workspace with auto-create capability
// If workspaces don't exist for selected Work Orders, they are created automatically
function openBulkWorkspace(selectedControl) {
    // Security check - only allow specific roles
    var roles = Xrm.Utility.getGlobalContext().userSettings.roles;
    var hasAccess = false;
    roles.forEach(function (item) {
        if (item.name == "System Administrator" || item.name == "ROM - Manager" || item.name == "ROM - Planner") {
            hasAccess = true;
        }
    });

    if (!hasAccess) {
        const lang = Xrm.Utility.getGlobalContext().userSettings.languageId;
        const permissionError = new Error((lang == 1036) ? 
            "Vous n'avez pas la permission d'accéder à cette fonction." : 
            "You do not have permission to access this function.");
        showErrorMessageAlert(permissionError);
        return;
    }

    const lookup = "_ts_workorder_value";
    const grid = selectedControl.getGrid ? selectedControl.getGrid() : selectedControl;
    const rows = grid.getSelectedRows().get();
    const woIds = rows.map(r => r.getData().getEntity().getId().replace(/[{}]/g, "").toLowerCase());
    const lang = Xrm.Utility.getGlobalContext().userSettings.languageId;

    (async function () {
        try {
            // Show progress indicator
            Xrm.Utility.showProgressIndicator();

            const wsIds = [];
            const missingWoIds = [];
            const failedWoIds = [];

            // Step 1: Query existing workspaces for each Work Order
            for (let index = 0; index < woIds.length; index++) {
                const woId = woIds[index];
                const res = await Xrm.WebApi.retrieveMultipleRecords(
                    "ts_unplannedworkorder",
                    `?$select=ts_unplannedworkorderid&$filter=${lookup} eq '${woId}'`
                );
                
                if (res.entities && res.entities.length > 0) {
                    // Existing workspace found - add to list
                    res.entities.forEach(e =>
                        wsIds.push(e["ts_unplannedworkorderid"].replace(/[{}]/g, "").toLowerCase())
                    );
                } else {
                    // No workspace found - mark for creation
                    missingWoIds.push(woId);
                }
            }

            // Step 2: Create workspaces for missing Work Orders
            if (missingWoIds.length > 0) {
                for (let index = 0; index < missingWoIds.length; index++) {
                    const woId = missingWoIds[index];
                    try {
                        const newWorkspaceId = await createWorkspaceFromWorkOrder(woId, lang);
                        if (newWorkspaceId) {
                            wsIds.push(newWorkspaceId);
                        } else {
                            failedWoIds.push(woId);
                        }
                    } catch (error) {
                        console.error("Error creating workspace for WO:", woId, error);
                        failedWoIds.push(woId);
                    }
                }
            }

            // Step 2.5: Show warning if any failed
            if (failedWoIds.length > 0) {
                const successCount = missingWoIds.length - failedWoIds.length;
                let diagnosticDetails = "\n\nDiagnostic Info:\n";
                diagnosticDetails += "- Total WOs selected: " + woIds.length + "\n";
                diagnosticDetails += "- Successfully created: " + successCount + "\n";
                diagnosticDetails += "- Failed: " + failedWoIds.length + "\n";
                diagnosticDetails += "- Step: Check workspace creation or API calls\n";
                diagnosticDetails += "- Please check the browser console for detailed errors";
                
                const failureMessage = (lang == 1036) ?
                    `${successCount} espace(s) de travail créé(s). Échec pour ${failedWoIds.length} ordre(s) de travail.\nIDs: ${failedWoIds.join(", ")}` + diagnosticDetails :
                    `${successCount} workspace(s) created. Failed for ${failedWoIds.length} work order(s).\nIDs: ${failedWoIds.join(", ")}` + diagnosticDetails;
                
                Xrm.Utility.closeProgressIndicator();
                showErrorMessageAlert(new Error(failureMessage));
                return;
            }

            // Step 3: Open bulk-edit with all workspace IDs (existing + newly created)
            if (wsIds.length > 0) {
                Xrm.Utility.closeProgressIndicator();
                
                await Xrm.Navigation.navigateTo({
                    pageType: "bulkedit",
                    entityName: "ts_unplannedworkorder",
                    entityIds: wsIds
                }, {
                    target: 2,
                    width: { value: 80, unit: "%" },
                    height: { value: 80, unit: "%" },
                    position: 1
                });
            }
        } catch (error) {
            Xrm.Utility.closeProgressIndicator();
            showErrorMessageAlert(error);
        }
    })();
}