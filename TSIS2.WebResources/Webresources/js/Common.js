function userHasRole(rolesName) {
    var userRoles = Xrm.Utility.getGlobalContext().userSettings.roles;
    var hasRole = false;
    var roles = rolesName.split("|");
    roles.forEach(function(roleItem){
        userRoles.forEach(function (userRoleItem) {
            if (userRoleItem.name.toLowerCase() == roleItem.toLowerCase()) hasRole =true;
        });
    });
    return hasRole;
}

//Used to lock specific fields in editable grids
function lockFields(executionContext, fields) {
    let formContext = executionContext.getFormContext();
    //If Team Plannig Data set to Complete block additional fields
    if (parent.Xrm.Page.getAttribute("ts_planstatus").getValue() == 741130001) {
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
    //If Team Plannig Data set to Complete block fields
    if (parent.Xrm.Page.getAttribute("ts_planstatus").getValue() == 741130001) {
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
    return (formContext.getAttribute("ts_planstatus").getValue() != 741130001);
}
function isFormTypeCreate(){
    return Xrm.Page.ui.getFormType() == 1;
}

function isFormTypeUpdate(){
    return Xrm.Page.ui.getFormType() == 2;
}

