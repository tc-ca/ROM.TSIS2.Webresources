

function addExistingLegislationsToEntity(primaryControl, selectedControl) {
    const formContext = primaryControl;
    Xrm.Utility.getEntityMetadata(primaryControl._entityName).then(function (primaryEntityData) {
        const entityName = Xrm.Page.data.entity.getEntityName();
        const entitySetName = primaryEntityData.EntitySetName; //name that is used in api calls, it's normally the entity name in plural (qm_rclegislation -> qm_rclegislations)
        const recordId = Xrm.Page.data.entity.getId().replace(/({|})/g, '');

        var defaultViewId = "";
        var viewIds = "";

        var legislationsAlreadyAssociatedCondition = filterExistingLegislations(formContext, entitySetName, recordId, selectedControl);

        if (entityName == "msdyn_workorderservicetask") { //work order service task form

            defaultViewId = "ec7c9e9c-131b-ec11-b6e7-000d3ae8f87e";

            viewIds = ["ec7c9e9c-131b-ec11-b6e7-000d3ae8f87e"];

            setWorkOrderServiceTaskLookupControl(formContext, selectedControl, entitySetName, recordId, defaultViewId, viewIds, legislationsAlreadyAssociatedCondition);

        }
        else  { // legislation
            defaultViewId = "4797655a-2612-4c5d-81be-a514900a38ea";
            viewIds = ["4797655a-2612-4c5d-81be-a514900a38ea"];

            setLegislationLookupControl(formContext, selectedControl, entitySetName, recordId, defaultViewId, viewIds, legislationsAlreadyAssociatedCondition);
        }
    });
}

function showErrorMessageAlert(error) {
    var alertStrings = { text: error.message };
    var alertOptions = { height: 120, width: 260 };
    Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function () { });
}

//Filter the legislations so the ones that are already associated don't show up in the lookup panel
function filterExistingLegislations(formContext, entitySetName, recordId, selectedControl) {
    var legislationsAlreadyAssociatedCondition = "";

    var req = new XMLHttpRequest();
    req.open("GET", formContext.context.getClientUrl() + "/api/data/v9.0/" + entitySetName + "(" + recordId + ")" + "/" + selectedControl.getRelationship().name, false);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("OData-MaxVersion", "4.0");
    req.setRequestHeader("OData-Version", "4.0");

    req.onreadystatechange = function () {
        if (this.readyState === 4) {
            req.onreadystatechange = null;
            if (this.status === 200) {
                var results = JSON.parse(this.response);
                for (var i = 0; i < results.value.length; i++) {
                    legislationsAlreadyAssociatedCondition += `<condition attribute="qm_rclegislationid" operator="neq" value="${results.value[i]["qm_rclegislationid"]}" />`;
                }
            } else {
                Xrm.Utility.alertDialog(this.statusText);
            }
        }
    };
    req.send();
    return legislationsAlreadyAssociatedCondition;
}

function setLegislationLookupControl(formContext, selectedControl, entitySetName, recordId, defaultViewId, viewIds, legislationsAlreadyAssociatedCondition) {

    var lookupOptions =
    {
        defaultEntityType: "qm_rclegislation",
        entityTypes: ["qm_rclegislation"],
        allowMultiSelect: true,
        defaultViewId: `${defaultViewId}`,
        disableMru: true,
        filters: [
            {
                filterXml: `<filter type="and">` +
                    `${legislationsAlreadyAssociatedCondition}` +
                    `</filter> `,
                entityLogicalName: "qm_rclegislation"
            }
        ],
        viewIds: viewIds
    };

    //add the legislation both ways (many-to-many)
    Xrm.Utility.lookupObjects(lookupOptions).then(
        function (result) {
            for (var i = 0; i < result.length; i++) {
                var reqToAssociateCurrentLegislationsToSelectedLegislations = new XMLHttpRequest();
                var reqToAssociateSelectedLegislationToCurrentLegislations = new XMLHttpRequest();

                reqToAssociateCurrentLegislationsToSelectedLegislations.open("POST", formContext.context.getClientUrl() + "/api/data/v9.0/" + "qm_rclegislations" + "(" + result[i].id.replace(/({|})/g, '') + ")" + "/" + selectedControl.getRelationship().name + "/$ref");
                reqToAssociateCurrentLegislationsToSelectedLegislations.setRequestHeader("Content-Type", "application/json");
                reqToAssociateCurrentLegislationsToSelectedLegislations.setRequestHeader("Accept", "application/json");
                reqToAssociateCurrentLegislationsToSelectedLegislations.setRequestHeader("OData-MaxVersion", "4.0");
                reqToAssociateCurrentLegislationsToSelectedLegislations.setRequestHeader("OData-Version", "4.0");

                var payload =
                {
                    "@odata.context": "https://romts-gsrst-dev-tcd365.crm3.dynamics.com/api/data/v9.0/$metadata#$ref",
                    "@odata.id": formContext.context.getClientUrl() + "/api/data/v9.0/" + entitySetName + "(" + recordId + ")"
                };

                reqToAssociateCurrentLegislationsToSelectedLegislations.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        reqToAssociateCurrentLegislationsToSelectedLegislations.onreadystatechange = null;
                        if (this.status === 204) {
                            selectedControl.refresh();
                        } else {
                            showErrorMessageAlert(this.statusText);
                        }
                    }
                };

                reqToAssociateCurrentLegislationsToSelectedLegislations.send(JSON.stringify(payload));

                reqToAssociateSelectedLegislationToCurrentLegislations.open("POST", formContext.context.getClientUrl() + "/api/data/v9.0/" + "qm_rclegislations" + "(" + recordId + ")" + "/" + selectedControl.getRelationship().name + "/$ref");
                reqToAssociateSelectedLegislationToCurrentLegislations.setRequestHeader("Content-Type", "application/json");
                reqToAssociateSelectedLegislationToCurrentLegislations.setRequestHeader("Accept", "application/json");
                reqToAssociateSelectedLegislationToCurrentLegislations.setRequestHeader("OData-MaxVersion", "4.0");
                reqToAssociateSelectedLegislationToCurrentLegislations.setRequestHeader("OData-Version", "4.0");

                var payload =
                {
                    "@odata.context": "https://romts-gsrst-dev-tcd365.crm3.dynamics.com/api/data/v9.0/$metadata#$ref",
                    "@odata.id": formContext.context.getClientUrl() + "/api/data/v9.0/" + entitySetName + "(" + result[i].id.replace(/({|})/g, '') + ")"
                };

                reqToAssociateSelectedLegislationToCurrentLegislations.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        reqToAssociateSelectedLegislationToCurrentLegislations.onreadystatechange = null;
                        if (this.status === 204) {
                            selectedControl.refresh();
                        } else {
                            showErrorMessageAlert(this.statusText);
                        }
                    }
                };

                reqToAssociateSelectedLegislationToCurrentLegislations.send(JSON.stringify(payload));
            }

        },
        function (error) {
            showErrorMessageAlert(error);
        });
}

function setWorkOrderServiceTaskLookupControl(formContext, selectedControl, entitySetName, recordId, defaultViewId, viewIds, legislationsAlreadyAssociatedCondition) {
    //var operationTypeFilterValue = formContext.getAttribute("ts_operationtypefilter").getValue();
    //var operationTypeLegislations = operationTypeFilterValue != null ? `<condition attribute='ts_operationtype' operator='eq' value='${operationTypeFilterValue[0].id}' />` : "";
    var legislationSourceFilterValue = formContext.getAttribute("ts_legislationsourcefilter").getValue();
    var legislationSourceLegislations = legislationSourceFilterValue != null ? `<condition attribute='qm_tylegislationsourceid' operator='eq' value='${legislationSourceFilterValue[0].id}' />` : "";

    var legislationTypeFilterValue = formContext.getAttribute("ts_legislationtypefilter").getValue();
    var legislationTypeLegislations = legislationTypeFilterValue != null ? `<condition attribute='qm_tylegislationtypeid' operator='eq' value='${legislationTypeFilterValue[0].id}' />` : "";

    var lookupOptions =
    {
        defaultEntityType: "qm_rclegislation",
        entityTypes: ["qm_rclegislation"],
        allowMultiSelect: true,
        defaultViewId: `${defaultViewId}`,
        disableMru: true,
        filters: [
            {
                filterXml: `<filter type="and">` +
                    `${legislationsAlreadyAssociatedCondition}` +
                    `${legislationSourceLegislations}` +
                    `${legislationTypeLegislations}` +
                    `</filter> `,
                entityLogicalName: "qm_rclegislation"
            }
        ],
        viewIds: viewIds
    };

    Xrm.Utility.lookupObjects(lookupOptions).then(
        function (result) {
            for (var i = 0; i < result.length; i++) {

                req = new XMLHttpRequest();

                req.open("POST", formContext.context.getClientUrl() + "/api/data/v9.0/" + "qm_rclegislations" + "(" + result[i].id.replace(/({|})/g, '') + ")" + "/" + selectedControl.getRelationship().name + "/$ref");
                req.setRequestHeader("Content-Type", "application/json");
                req.setRequestHeader("Accept", "application/json");
                req.setRequestHeader("OData-MaxVersion", "4.0");
                req.setRequestHeader("OData-Version", "4.0");

                var payload =
                {
                    "@odata.id": formContext.context.getClientUrl() + "/api/data/v9.0/" + entitySetName + "(" + recordId + ")" //workorder
                };

                req.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        req.onreadystatechange = null;
                        if (this.status === 204) {
                            selectedControl.refresh();
                        } else {
                            showErrorMessageAlert(this.statusText);
                        }
                    }
                };

                req.send(JSON.stringify(payload));
            }
        },
        function (error) {
            showErrorMessageAlert(error);
        });
}

//Returns true if the current form is the Work Order Service Task SurveyJS Form
function isCurrentFormSurveyJSForm(primaryControl) {
    const surveyJSFormId = "af78c3e5-c009-4256-854f-f61a6d4b15fc";
    const currentFormId = primaryControl.ui.formSelector.getCurrentItem().getId();
    return (currentFormId === surveyJSFormId);
}