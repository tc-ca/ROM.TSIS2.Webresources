function userHasRole(rolesName) {
    var userRoles = Xrm.Utility.getGlobalContext().userSettings.roles;
    var hasRole = false;
    var roles = rolesName.split("|");
    roles.forEach(function (roleItem) {
        userRoles.forEach(function (userRoleItem) {
            if (userRoleItem.name.toLowerCase() == roleItem.toLowerCase()) hasRole = true;
        });
    });
    return hasRole;
}

//Used to lock specific fields in editable grids
function lockFields(executionContext, fields) {
    let formContext = executionContext.getFormContext();
    let planStatusValue = parent.Xrm.Page.getAttribute("ts_planstatus").getValue();
    //If Team Plannig Data set to Complete or HQReview block additional fields
    if (planStatusValue == 741130001 || planStatusValue == 447390001) {
        fields.push("ts_teamestimatedduration", "ts_planningdetail", "ts_details", "ts_plannedq1", "ts_plannedq2", "ts_plannedq3", "ts_plannedq4");
    }

    if (formContext) {
        let entity = formContext.data.entity;
        entity.attributes.forEach(function (attribute, i) {
            if (fields.indexOf(attribute.getName()) > -1) {
                let attributeToDisable = attribute.controls.get(0);
                attributeToDisable.setDisabled(true);
            }
        });
    }
}
//Used to lock specific fields in editable grids
function lockFieldsInspectorHoursEditableGrid(executionContext) {
    let formContext = executionContext.getFormContext();
    fields = ["ts_varianceq1", "ts_varianceq2", "ts_varianceq3", "ts_varianceq4"];
    let planStatusValue = parent.Xrm.Page.getAttribute("ts_planstatus").getValue();
    //If Team Plannig Data set to Complete or HQReview block fields
    if (planStatusValue == 741130001 || planStatusValue == 447390001) {
        if (formContext) {
            let entity = formContext.data.entity;
            entity.attributes.forEach(function (attribute, i) {
                if (fields.indexOf(attribute.getName()) > -1) {
                    let attributeToDisable = attribute.controls.get(0);
                    attributeToDisable.setDisabled(true);
                }
            });
        }
    }
}

function showButtonBasedOnPlanStatus(primaryControl) {
    var formContext = primaryControl;
    let planStatusValue = formContext.getAttribute("ts_planstatus").getValue();
    return !(planStatusValue == 741130001 || planStatusValue == 447390001);
}
function isFormTypeCreate() {
    return Xrm.Page.ui.getFormType() == 1;
}

function isFormTypeUpdate() {
    return Xrm.Page.ui.getFormType() == 2;
}

function openLookupModalDialogWOForm(executionContext) {
    var formContext = executionContext.getFormContext();

    formContext.getControl("msdyn_workordertype").addOnLookupTagClick(onLookupClick);
    formContext.getControl("ts_region").addOnLookupTagClick(onLookupClick);
    formContext.getControl("ovs_operationtypeid").addOnLookupTagClick(onLookupClick);
    formContext.getControl("ts_tradenameid").addOnLookupTagClick(onLookupClick);
    formContext.getControl("msdyn_serviceaccount").addOnLookupTagClick(onLookupClick);
    formContext.getControl("ts_site").addOnLookupTagClick(onLookupClick);
    formContext.getControl("msdyn_servicerequest").addOnLookupTagClick(onLookupClickCaseTimeTracking);
}

function openLookupModalDialogCaseForm(executionContext) {
    var formContext = executionContext.getFormContext();

    formContext.getControl("ovs_region").addOnLookupTagClick(onLookupClick);
    formContext.getControl("ts_tradenameid").addOnLookupTagClick(onLookupClick);
    formContext.getControl("customerid").addOnLookupTagClick(onLookupClick);
    formContext.getControl("msdyn_functionallocation").addOnLookupTagClick(onLookupClick);
}

function openLookupModalDialogFindingForm(executionContext) {
    var formContext = executionContext.getFormContext();

    formContext.getControl("ts_operationid").addOnLookupTagClick(onLookupClick);
    formContext.getControl("ts_accountid").addOnLookupTagClick(onLookupClick);
    formContext.getControl("ts_ovs_operationtype").addOnLookupTagClick(onLookupClick);
    formContext.getControl("ts_functionallocation").addOnLookupTagClick(onLookupClick);
    formContext.getControl("ts_qm_rclegislation").addOnLookupTagClick(onLookupClick);
}

function openLookupModalDialogEmailForm(executionContext) {
    var formContext = executionContext.getFormContext();

    formContext.getControl("from").addOnLookupTagClick(onLookupClick);
    formContext.getControl("to").addOnLookupTagClick(onLookupClick);
}

function openLookupModalDialogSecurityIncidentForm(executionContext) {
    var formContext = executionContext.getFormContext();

    formContext.getControl("ts_securityincidenttype").addOnLookupTagClick(onLookupClick);
    formContext.getControl("ts_reportingcompany").addOnLookupTagClick(onLookupClick);
    formContext.getControl("ts_stakeholder").addOnLookupTagClick(onLookupClick);
    formContext.getControl("ts_region").addOnLookupTagClick(onLookupClick);
    formContext.getControl("ts_site").addOnLookupTagClick(onLookupClick);
}
function onLookupClick(executionContext) {
    executionContext.getEventArgs().preventDefault();
    var record = executionContext.getEventArgs().getTagValue();
    Xrm.Navigation.navigateTo({
        pageType: "entityrecord",
        entityName: record.entityType,
        entityId: record.id
    }, {
        target: 2,
        position: 2,
        width:
        {
            value: 30,
            unit: "%"
        }
    });
}

function onLookupClickCaseTimeTracking(executionContext) {
    executionContext.getEventArgs().preventDefault();
    var record = executionContext.getEventArgs().getTagValue();
    Xrm.Navigation.navigateTo({
        pageType: "entityrecord",
        entityName: record.entityType,
        entityId: record.id,
        formId: "cc169f8e-7df9-ed11-8f6e-000d3af36bac"
    }, {
        target: 2,
        position: 2,
        width:
        {
            value: 30,
            unit: "%"
        }
    });
}


