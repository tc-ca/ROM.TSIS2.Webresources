function appOnLoad() {
    const PROD_URL = "https://romts-gsrst-tcd365.crm3.dynamics.com";
    const DATA_URL = "https://romts-gsrst-data-tcd365.crm3.dynamics.com";

    const appUrl = getAppURL()

    if(appUrl != PROD_URL){
        if(appUrl == DATA_URL){
            showBanner(appUrl, true);
        }
        else{
            showBanner(appUrl);
        }
    }
}

function getAppURL(){
    return Xrm.Utility.getGlobalContext().getClientUrl();
}

function showBanner(appId, dataEnv = false) {
    let message;

    if(!dataEnv){
        if(Xrm.Utility.getGlobalContext().userSettings.languageId == 1033){
            message = "All changes made in this environment will not appear in the Production Environment";
        }
        else{
            message = "Tous les changements effectué dans cet environment n'apparaiseront pas dans l'environment de Production"; 
        }
    }   
    else{
        if(Xrm.Utility.getGlobalContext().userSettings.languageId == 1033){
            message = "All changes made to Questionnaires and Legislations will have to be manually migrated to the Production Environment";
        }
        else{
            message = "Tous les changements effectués aux Questionnaires et aux Législations devront être manuellement migrés à l'environnement de Production"; 
        }
    }

    var NotificationObj = {
        type: 2,
        level: 3,
        message: message,
        showCloseButton: false,
    }
    Xrm.App.addGlobalNotification(NotificationObj).then(function success(result) {
    }, function(error) {
        console.log(error.message);
    });
}