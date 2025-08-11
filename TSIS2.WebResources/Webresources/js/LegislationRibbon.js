

async function addExistingLegislationsToEntity(primaryControl, selectedControl) {
    const formContext = primaryControl;

    var workOrderOperationTypeCondition = await filterOperationTypeLegislations(formContext);
    Xrm.Utility.getEntityMetadata(primaryControl._entityName).then(function (primaryEntityData) {
        const entityName = Xrm.Page.data.entity.getEntityName();
        const entitySetName = primaryEntityData.EntitySetName; //name that is used in api calls, it's normally the entity name in plural (qm_rclegislation -> qm_rclegislations)
        const recordId = Xrm.Page.data.entity.getId().replace(/({|})/g, '');

        var defaultViewId = "";
        var viewIds = "";
        var legislationsAlreadyAssociatedCondition = filterExistingLegislations(formContext, entitySetName, recordId, selectedControl);

        if (entityName == "msdyn_workorderservicetask" || entityName == "ts_workorderservicetaskworkspace") { //work order service task form

            defaultViewId = "ec7c9e9c-131b-ec11-b6e7-000d3ae8f87e";

            viewIds = ["ec7c9e9c-131b-ec11-b6e7-000d3ae8f87e"];

            setWorkOrderServiceTaskLookupControl(formContext, selectedControl, entitySetName, recordId, defaultViewId, viewIds, legislationsAlreadyAssociatedCondition, workOrderOperationTypeCondition);

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

async function filterOperationTypeLegislations(formContext) {
    var operationTypeCondition = "";

     // Try to get workOrderValue from msdyn_workorder, fallback to ts_workorder if not present
    let workOrderValue = null;
    if (formContext.getAttribute("msdyn_workorder") != null) {
        workOrderValue = formContext.getAttribute("msdyn_workorder").getValue();
    }
    if ((!workOrderValue || workOrderValue.length === 0) && formContext.getAttribute("ts_workorder") != null) {
        workOrderValue = formContext.getAttribute("ts_workorder").getValue();
    }

    const workOrderId = workOrderValue && workOrderValue.length > 0 ? workOrderValue[0].id : "";

    if (workOrderId) {
        var workOrder = await Xrm.WebApi.retrieveRecord("msdyn_workorder", workOrderId, "?$select=ovs_operationtypeid&$expand=ovs_operationtypeid($expand=owningbusinessunit($select=name))");
        if (workOrder != null && workOrder.ovs_operationtypeid != null) {
            var operationTypeId = workOrder.ovs_operationtypeid.ovs_operationtypeid;

            var fetchXML = [
                "<fetch version='1.0' mapping='logical' returntotalrecordcount='true' no-lock='false'>",
                "  <entity name='ts_ovs_operationtype_qm_rclegislation'>",
                "    <attribute name='qm_rclegislationid' />",
                "     <filter>",
                "       <condition attribute='ovs_operationtypeid' operator='eq' value='", operationTypeId, "'/>",
                "     </filter>",
                "  </entity>",
                "</fetch>"
            ].join("");

            fetchXML = "?fetchXml=" + encodeURIComponent(fetchXML);
            var operationtypeLegislation = await Xrm.WebApi.retrieveMultipleRecords('ts_ovs_operationtype_qm_rclegislation', fetchXML);
            if (operationtypeLegislation != null && operationtypeLegislation.entities != null && operationtypeLegislation.entities.length > 0) {
                for (var i = 0; i < operationtypeLegislation.entities.length; i++) {
                    operationTypeCondition += `<condition attribute="qm_rclegislationid" operator="eq" value="${operationtypeLegislation.entities[i]["qm_rclegislationid"]}" />`;
                }
            }
        }
    }

    if (operationTypeCondition != "") {
        operationTypeCondition = `<filter type="or">` + operationTypeCondition + `</filter> `;
    }
    return operationTypeCondition;
}

function setWorkOrderServiceTaskLookupControl(formContext, selectedControl, entitySetName, recordId, defaultViewId, viewIds, legislationsAlreadyAssociatedCondition, operationTypeCondition) {
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
                    `<condition attribute="ts_provisioncategory" operator="ne" value="{18ADFA7F-33F5-EB11-94EF-000D3AF36036}" />` + //Filter out Non-Imperative Legislations
                    `${operationTypeCondition}` +
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
    const surveyJSFormIds = [
        "af78c3e5-c009-4256-854f-f61a6d4b15fc",
        "a269d88a-9b57-446f-a9c7-63a8ca9db4c8"
    ];
    const currentFormId = primaryControl.ui.formSelector.getCurrentItem().getId();
    return surveyJSFormIds.includes(currentFormId);
}