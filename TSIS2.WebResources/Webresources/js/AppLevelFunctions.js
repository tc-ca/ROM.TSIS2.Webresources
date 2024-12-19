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
  loadDynamicNotifications(appUrl);
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

function loadDynamicNotifications(currentEnvUrl) {
  const now = new Date().toISOString();

  // Map environment URLs to names
  const envMap = {
    "https://romts-gsrst-tcd365.crm3.dynamics.com": "PROD",
    "https://romts-gsrst-dev-tcd365.crm3.dynamics.com": "DEV",
    "https://romts-gsrst-qa-tcd365.crm3.dynamics.com": "QA",
    "https://romts-gsrst-integration-tcd365.crm3.dynamics.com": "INTEGRATION",
    "https://romts-gsrst-data-tcd365.crm3.dynamics.com": "DATA",
    "https://romts-gsrst-acctcd365.crm3.dynamics.com": "ACC",
  };

  const currentEnv = envMap[currentEnvUrl] || "ALL";

  const environmentChoiceMap = {
    741130000: "ALL",
    741130001: "DEV",
    741130002: "QA",
    741130003: "ACC",
    741130004: "DATA",
    741130005: "INTEGRATION",
    741130006: "PROD",
  };

  const fetchXml = `
    <fetch>
      <entity name="ts_notification">
        <filter type="and">
          <condition attribute="ts_active" operator="eq" value="1" />
          <filter type="or">
            <condition attribute="ts_startdate" operator="null" />
            <condition attribute="ts_startdate" operator="on-or-before" value="${now}" />
          </filter>
          <filter type="or">
            <condition attribute="ts_enddate" operator="null" />
            <condition attribute="ts_enddate" operator="on-or-after" value="${now}" />
          </filter>
        </filter>
      </entity>
    </fetch>
  `;

  Xrm.WebApi.retrieveMultipleRecords("ts_notification", `?fetchXml=${encodeURIComponent(fetchXml)}`).then(
    function success(result) {
      result.entities.forEach(function (notification) {
        const notifEnv = environmentChoiceMap[notification.ts_environment] || "ALL";

        if (notifEnv !== "ALL" && notifEnv !== currentEnv) {
          return;
        }

        const closeButtonMap = { 0: false, 1: true };

        const NotificationObj = {
          type: 2,
          level: notification.ts_level,
          message: notification.ts_message,
          showCloseButton: closeButtonMap[notification.ts_closebutton] || false,
        };

        Xrm.App.addGlobalNotification(NotificationObj).then(
          function success(notificationId) {
            if (notification.ts_enddate) {
              const endTime = new Date(notification.ts_enddate);
              const msUntilEnd = endTime - new Date();
              if (msUntilEnd > 0) {
                setTimeout(function () {
                  Xrm.App.clearGlobalNotification(notificationId);
                }, msUntilEnd);
              }
            }
          },
          function error(err) {
            console.log(err);
          }
        );
      });
    },
    function error(err) {
      console.log(err);
    }
  );
}
