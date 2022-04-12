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
