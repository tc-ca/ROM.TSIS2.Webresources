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
