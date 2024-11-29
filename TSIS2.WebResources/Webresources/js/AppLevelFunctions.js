function appOnLoad() {
  const PROD_URL = "https://romts-gsrst-tcd365.crm3.dynamics.com";

  const appUrl = getAppURL();

  // Banner messages
  if (Xrm.Utility.getGlobalContext().userSettings.languageId == 1033) {
    message1 = "All changes made in this environment will not appear in the Production Environment";
    message2 =
      "You can now submit feedback to the team by using the form available in the Support section in the left-side menu!";
  } else {
    message1 =
      "Tous les changements effectué dans cet environment n'apparaiseront pas dans l'environment de Production";
    message2 =
      "Vous pouvez maintenant fournir vos commentaires à l'équipe en utilisant le formulaire disponible dans la section Support du menu de gauche!";
  }

    // Hide unwanted Tables in the Site map for Production - the table entries can be located here: \Webresources\css\prod_custom.css
  if (appUrl === PROD_URL) {
    showBanner(appUrl, message1, false);
    loadProdCustomCSS();
  }

  showBanner(appUrl, message2, true);
}

function getAppURL() {
  return Xrm.Utility.getGlobalContext().getClientUrl();
}

function showBanner(appId, display_message, allow_close) {
  let message;

  var NotificationObj = {
    type: 2,
    level: 3,
    message: display_message,
    showCloseButton: allow_close,
  };
  Xrm.App.addGlobalNotification(NotificationObj).then(
    function success(result) {},
    function (error) {
      console.log(error.message);
    }
  );
}

function loadProdCustomCSS() {
  //TSIS2.WebResources\Webresources\css\prod_custom.css
  var relativePath = "../WebResources/ovs_/css/prod_custom.css";

  var link = document.createElement("link");

  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = relativePath;
  link.media = "all";

  window.parent.document.head.appendChild(link);
}
