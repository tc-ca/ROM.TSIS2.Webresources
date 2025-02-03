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
    //showBanner(appUrl, message1, false); //incorrect message1 displaying in prod
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
  let allowNotificationsWithNoDates = false;

  // Current UTC time used in FetchXML and comparisons
  const now = new Date();

  // Determine language-specific message field
  const userLanguageId = Xrm.Utility.getGlobalContext().userSettings.languageId;
  const messageField = userLanguageId === 1033 ? "ts_messageenglish" : "ts_messagefrench";

  const currentUserId = Xrm.Utility.getGlobalContext().userSettings.userId;

  const environmentMap = {
    "https://romts-gsrst-tcd365.crm3.dynamics.com": "741130005",
    "https://romts-gsrst-dev-tcd365.crm3.dynamics.com": "741130000",
    "https://romts-gsrst-qa-tcd365.crm3.dynamics.com": "741130001",
    "https://romts-gsrst-integration-tcd365.crm3.dynamics.com": "741130004",
    "https://romts-gsrst-data-tcd365.crm3.dynamics.com": "741130003",
    "https://romts-gsrst-acctcd365.crm3.dynamics.com": "741130002",
  };

  const currentEnvValue = environmentMap[currentEnvUrl];
  if (!currentEnvValue) {
    console.error(`Unknown environment URL: ${currentEnvUrl}`);
    return;
  }

  const fetchXml = `
    <fetch>
      <entity name="ts_notification">
        <attribute name="ts_environment" />
        <attribute name="ts_level" />
        <attribute name="${messageField}" />
        <attribute name="ts_closebutton" />
        <attribute name="ts_enddate" />
        <attribute name="ts_startdate" />
        <attribute name="ts_scopeteam" />
        <filter type="and">
          <condition attribute="ts_active" operator="eq" value="1" />
          <filter type="and">
            <filter type="or">
              <condition attribute="ts_startdate" operator="null" />
              <condition attribute="ts_startdate" operator="on-or-before" value="${now.toISOString()}" />
            </filter>
            <filter type="or">
              <condition attribute="ts_enddate" operator="null" />
              <condition attribute="ts_enddate" operator="on-or-after" value="${now.toISOString()}" />
            </filter>
          </filter>
        </filter>
      </entity>
    </fetch>
  `;

  // Fetch notifications
  Xrm.WebApi.retrieveMultipleRecords("ts_notification", `?fetchXml=${encodeURIComponent(fetchXml)}`)
    .then(async function success(result) {
      for (const notification of result.entities) {
        // Extract and parse dates
        const startDateRaw = notification.ts_startdate;
        const endDateRaw = notification.ts_enddate;
        const startDate = startDateRaw ? new Date(startDateRaw) : null;
        const endDate = endDateRaw ? new Date(endDateRaw) : null;

        //If no start or end date, and allowNotificationsWithNoDates is false, skip notification
        if (!startDate && !endDate && !allowNotificationsWithNoDates) {
          continue;
        }

        // Evaluate start and end date conditions
        const isAfterStart = startDate ? now >= startDate : true;
        const isBeforeEnd = endDate ? now <= endDate : true;

        if (!isAfterStart || !isBeforeEnd) {
          continue;
        }

        // Check environment mapping
        const selectedEnvs = (notification.ts_environment || "").split(",");

        //If current dev is targetted by the notification, show it
        if (!selectedEnvs.includes(currentEnvValue)) {
          continue;
        }

        // Check team scope if specified
        if (notification._ts_scopeteam_value) {
          try {
            const isInTeam = await isUserInTeam(currentUserId, notification._ts_scopeteam_value);
            if (!isInTeam) {
              continue;
            }
          } catch (error) {
            console.error("Error checking team membership:", error);
            continue;
          }
        }

        // Show notification
        const NotificationObj = {
          type: 2,
          level: notification.ts_level,
          message: notification[messageField],
          showCloseButton: notification.ts_closebutton,
        };

        Xrm.App.addGlobalNotification(NotificationObj)
          .then(function onShowSuccess(notificationId) {
            if (endDate) {
              const msUntilEnd = endDate.getTime() - now.getTime();
              if (msUntilEnd > 0) {
                setTimeout(() => {
                  Xrm.App.clearGlobalNotification(notificationId);
                }, msUntilEnd);
              }
            }
          })
          .catch(function onShowError(err) {
            console.error("Error displaying notification:", err);
          });
      }
    })
    .catch(function error(err) {
      console.error("Error retrieving notifications:", err);
    });
}

//Check if user is in a team
function isUserInTeam(userId, teamId) {
  const fetchXml = [
    "<fetch distinct='false' mapping='logical'>",
    "  <entity name='team'>",
    "    <attribute name='name' />",
    "    <attribute name='teamid' />",
    "    <filter type='and'>",
    "      <condition attribute='teamtype' operator='ne' value='1' />",
    "      <condition attribute='teamid' operator='eq' value='",
    teamId,
    "' />",
    "    </filter>",
    "    <link-entity name='teammembership' intersect='true' visible='false' to='teamid' from='teamid'>",
    "      <link-entity name='systemuser' from='systemuserid' to='systemuserid' alias='bb'>",
    "        <filter type='and'>",
    "          <condition attribute='systemuserid' operator='eq' value='",
    userId,
    "' />",
    "        </filter>",
    "      </link-entity>",
    "    </link-entity>",
    "  </entity>",
    "</fetch>",
  ].join("");

  return new Promise((resolve, reject) => {
    Xrm.WebApi.retrieveMultipleRecords("team", "?fetchXml=" + encodeURIComponent(fetchXml))
      .then(function success(result) {
        resolve(result.entities.length > 0);
      })
      .catch(function error(err) {
        console.error("Error checking team membership:", err);
        reject(err);
      });
  });
}
