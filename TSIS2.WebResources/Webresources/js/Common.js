// Team Schema Name Constants
const TEAM_SCHEMA_NAMES = {
  AVIATION_SECURITY_DOMESTIC: "ts_AviationSecurityDirectorateDomesticTeamGUID",
  AVIATION_SECURITY_INTERNATIONAL: "ts_AviationSecurityInternationalTeamGUID",
  ISSO_TEAM: "ts_IntermodalSurfaceSecurityOversightISSOTeamGUID",
};

// Business Unit Schema Name Constants
const BU_SCHEMA_NAMES = {
  AVIATION_SECURITY_DOMESTIC: "ts_AviationSecurityDirectorateDomesticBusinessUnitGUID",
  AVIATION_SECURITY_INTERNATIONAL: "ts_AviationSecurityInternationalBusinessUnitGUID",
  ISSO: "ts_IntermodalSurfaceSecurityOversightISSOBusinessUnitGUID",
  TRANSPORT_CANADA: "ts_TransportCanadaBusinessUnitGUID",
};

// Dev-Specific Hardcoded IDs (To support legacy Dev data without polluting Prod Env Vars)
const DEV_SPECIFIC_IDS = {
  AVSEC_TEAM_DEV: "6db920a0-baa3-eb11-b1ac-000d3ae8b98c",
  AVSEC_BU_DEV: "6cb920a0-baa3-eb11-b1ac-000d3ae8b98c",
  ISSO_TEAM_DEV: "50f4b827-bead-eb11-8236-000d3ae8b866",
  // ISSO BU (Dev) is already covered by ts_IntermodalSurfaceSecurityOversightISSOBusinessUnitGUID
};

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

// Used to lock specific fields in editable grids
function lockFields(executionContext, fields) {
  let formContext = executionContext.getFormContext();
  let planStatusValue = parent.Xrm.Page.getAttribute("ts_planstatus").getValue();
  // If Team Planning Data set to Complete or HQReview block additional fields
  if (planStatusValue == 741130001 || planStatusValue == 447390001) {
    fields.push(
      "ts_teamestimatedduration",
      "ts_planningdetail",
      "ts_details",
      "ts_plannedq1",
      "ts_plannedq2",
      "ts_plannedq3",
      "ts_plannedq4"
    );
  }

  if (formContext) {
    let entity = formContext.data.entity;
    entity.attributes.forEach(function (attribute) {
      if (fields.indexOf(attribute.getName()) > -1) {
        let attributeToDisable = attribute.controls.get(0);
        attributeToDisable.setDisabled(true);
      }
    });
  }
}

// Used to lock specific fields in editable grids
function lockFieldsInspectorHoursEditableGrid(executionContext) {
  let formContext = executionContext.getFormContext();
  let fields = ["ts_varianceq1", "ts_varianceq2", "ts_varianceq3", "ts_varianceq4"];
  let planStatusValue = parent.Xrm.Page.getAttribute("ts_planstatus").getValue();
  // If Team Planning Data set to Complete or HQReview block fields
  if (planStatusValue == 741130001 || planStatusValue == 447390001) {
    if (formContext) {
      let entity = formContext.data.entity;
      entity.attributes.forEach(function (attribute) {
        if (fields.indexOf(attribute.getName()) > -1) {
          let attributeToDisable = attribute.controls.get(0);
          attributeToDisable.setDisabled(true);
        }
      });
    }
  }
}

// Used to lock specific fields in editable grids
function lockFieldsDutyInspectorsEditableGrid(executionContext) {
  let formContext = executionContext.getFormContext();
  let fields = ["ts_startdate", "ts_enddate"];
  if (formContext) {
    let entity = formContext.data.entity;
    entity.attributes.forEach(function (attribute) {
      if (fields.indexOf(attribute.getName()) > -1) {
        let attributeToDisable = attribute.controls.get(0);
        attributeToDisable.setDisabled(true);
      }
    });
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
  Xrm.Navigation.navigateTo(
    {
      pageType: "entityrecord",
      entityName: record.entityType,
      entityId: record.id,
    },
    {
      target: 2,
      position: 2,
      width: {
        value: 30,
        unit: "%",
      },
    }
  );
}

/**
 * Dynamics behavior: the main team of a Business Unit always has the same name
 * as the Business Unit, and its name updates automatically when the BU is renamed.
 * Because of this platform behavior, matching the team by `team.name == businessunit.name`
 * is intentional here.
 */
function setOwnerToUserBusinessUnit(formContext) {
  const ownerAttribute = formContext.getAttribute("ownerid");
  let userId = Xrm.Utility.getGlobalContext().userSettings.userId;
  let currentUserBusinessUnitFetchXML = [
    "<fetch top='1'>",
    "  <entity name='businessunit'>",
    "    <attribute name='name' />",
    "    <attribute name='businessunitid' />",
    "    <link-entity name='systemuser' from='businessunitid' to='businessunitid'>",
    "      <filter>",
    "        <condition attribute='systemuserid' operator='eq' value='",
    userId,
    "'/>",
    "      </filter>",
    "    </link-entity>",
    "  </entity>",
    "</fetch>",
  ].join("");
  currentUserBusinessUnitFetchXML = "?fetchXml=" + encodeURIComponent(currentUserBusinessUnitFetchXML);
  Xrm.WebApi.retrieveMultipleRecords("businessunit", currentUserBusinessUnitFetchXML).then(async function (
    businessunit
  ) {
    if (businessunit.entities.length > 0) {
      const userBusinessUnitId = businessunit.entities[0].businessunitid;
      const isTC = await isUserInTCBU(userBusinessUnitId);
      if (!isTC) {
        let teamFetchXML = [
          "<fetch top='1'>",
          "  <entity name='team'>",
          "    <attribute name='name' />",
          "    <attribute name='teamid' />",
          "    <filter>",
          "      <condition attribute='name' operator='eq' value='",
          businessunit.entities[0].name,
          "'/>",
          "    </filter>",
          "  </entity>",
          "</fetch>",
        ].join("");
        teamFetchXML = "?fetchXml=" + encodeURIComponent(teamFetchXML);
        Xrm.WebApi.retrieveMultipleRecords("team", teamFetchXML).then(function success(team) {
          if (team.entities.length > 0) {
            const headerOwnerIdControl = formContext.getControl("header_ownerid");
            if (headerOwnerIdControl) {
              headerOwnerIdControl.clearNotification("error");
            }

            const ownerIdControl = formContext.getControl("ownerid");
            if (ownerIdControl) {
              ownerIdControl.clearNotification("error");
            }

            ownerAttribute.setValue([
              {
                entityType: "team",
                name: "" + team.entities[0].name + "",
                id: "" + team.entities[0].teamid + "",
              },
            ]);
          }
        });
      }
    }
  });
}

async function showFieldWarningMessageIfOwnerIsNotISSONorAvSec(formContext) {
  const ownerAttributeValue = formContext.getAttribute("ownerid").getValue();

  if (ownerAttributeValue && ownerAttributeValue[0]) {
    const isAvSec = await isOwnedByAvSec(ownerAttributeValue);
    const isISSO = await isOwnedByISSO(ownerAttributeValue);

    if (!isAvSec && !isISSO) {
      const warningMessage = Xrm.Utility.getResourceString("ts_/resx/Common", "WarningMessageText");

      const headerOwnerIdControl = formContext.getControl("header_ownerid");
      if (headerOwnerIdControl) {
        headerOwnerIdControl.setNotification(warningMessage, "error");
      }

      const ownerIdControl = formContext.getControl("ownerid");
      if (ownerIdControl) {
        ownerIdControl.setNotification(warningMessage, "error");
      }

      return true;
    } else {
      const headerOwnerIdControl = formContext.getControl("header_ownerid");
      if (headerOwnerIdControl) {
        headerOwnerIdControl.clearNotification("error");
      }

      const ownerIdControl = formContext.getControl("ownerid");
      if (ownerIdControl) {
        ownerIdControl.clearNotification("error");
      }
    }
  }
  return false;
}

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

  return new Promise(function (resolve, reject) {
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

// This helper is intended for GUID-based environment variables.
// It strips { } and lowercases the value for normalized ID comparison.
// Do NOT use it for case-sensitive or non-GUID env vars (URLs, keys, etc.)
function getEnvironmentVariableValue(schemaName) {
  var fetchXml = [
    "<fetch top='1'>",
    "  <entity name='environmentvariabledefinition'>",
    "    <attribute name='defaultvalue'/>",
    "    <filter>",
    "      <condition attribute='schemaname' operator='eq' value='" + schemaName + "'/>",
    "    </filter>",
    "    <link-entity name='environmentvariablevalue' from='environmentvariabledefinitionid' ",
    "      to='environmentvariabledefinitionid' alias='v' link-type='outer'>",
    "      <attribute name='value'/>",
    "    </link-entity>",
    "  </entity>",
    "</fetch>",
  ].join("");

  var encodedFetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);

  return Xrm.WebApi.retrieveMultipleRecords("environmentvariabledefinition", encodedFetchXml)
    .then(function (result) {
      if (result.entities.length === 0) {
        console.warn("Environment variable not found:", schemaName);
        return null;
      }

      var entity = result.entities[0];
      var value = entity["v.value"] || entity["defaultvalue"] || null;
      if (value) value = value.replace(/[{}]/g, "").toLowerCase();
      return value;
    })
    .catch(function (error) {
      console.error("Failed to retrieve environment variable:", schemaName, error);
      return null;
    });
}

/**
 * Returns the owner GUID from a record, regardless of shape.
 * - WebApi record: uses `_ownerid_value`
 * - Object with `ownerid.id`: uses that (future-proof)
 * Returns: GUID string or null
 */
function getOwnerIdFromRecord(record) {
  if (!record) return null;

  // Web API style: `_ownerid_value`
  if (record["_ownerid_value"]) {
    return record["_ownerid_value"];
  }

  // Object style: { ownerid: { id: ... } }
  if (record.ownerid && record.ownerid.id) {
    return record.ownerid.id;
  }

  return null;
}

async function isOwnedBy(ownerValue, schemaNames) {
  if (!schemaNames || !schemaNames.length) return false;

  var ownerId = null;

  // Form lookup: [ { id, ... } ]
  if (Array.isArray(ownerValue) && ownerValue[0] && ownerValue[0].id) {
    ownerId = ownerValue[0].id;
  }
  // Direct GUID string (WebApi usage)
  else if (typeof ownerValue === "string") {
    ownerId = ownerValue;
  }

  if (!ownerId) return false;

  ownerId = ownerId.replace(/[{}]/g, "").toLowerCase();

  for (var i = 0; i < schemaNames.length; i++) {
    var envId = await getEnvironmentVariableValue(schemaNames[i]);
    if (envId && ownerId === envId) return true;
  }
  return false;
}

async function isOwnedByAvSec(ownerValue) {
  if (!ownerValue) return false;

  // CASE 1: Direct GUID string → treat as team owner
  if (typeof ownerValue === "string") {
    return isOwnedBy(ownerValue, [
      TEAM_SCHEMA_NAMES.AVIATION_SECURITY_DOMESTIC,
      TEAM_SCHEMA_NAMES.AVIATION_SECURITY_INTERNATIONAL,
    ]);
  }

  // CASE 2: Normal lookup array from form
  if (!ownerValue[0]) return false;

  var owner = ownerValue[0];
  var entityType = owner.entityType;

  // Owner is a team → compare team ID to env vars, or check team's BU if team GUID doesn't match
  if (entityType === "team") {
    var teamId = owner.id ? owner.id.replace(/[{}]/g, "") : null;
    if (!teamId) return false;

    // First check if team GUID matches AvSec team env vars
    var teamMatches = await isOwnedBy(ownerValue, [
      TEAM_SCHEMA_NAMES.AVIATION_SECURITY_DOMESTIC,
      TEAM_SCHEMA_NAMES.AVIATION_SECURITY_INTERNATIONAL,
    ]);
    if (teamMatches) return true;

    // Check Dev Specific Team ID
    if (teamId === DEV_SPECIFIC_IDS.AVSEC_TEAM_DEV) return true;

    // If team GUID doesn't match, check team's BU (fallback for teams in AvSec BU but not in env vars)
    try {
      var team = await Xrm.WebApi.retrieveRecord("team", teamId, "?$select=_businessunitid_value");
      var buId = team._businessunitid_value;
      if (!buId) return false;

      return await isAvSecBU(buId);
    } catch (error) {
      console.error("Error checking team owner for AvSec:", error);
      return false;
    }
  }

  // Owner is a user → load BU, then check BU against AvSec BU env vars
  if (entityType === "systemuser") {
    var userId = owner.id ? owner.id.replace(/[{}]/g, "") : null;
    if (!userId) return false;

    try {
      var user = await Xrm.WebApi.retrieveRecord("systemuser", userId, "?$select=_businessunitid_value");
      var buId = user._businessunitid_value;
      if (!buId) return false;

      return await isAvSecBU(buId);
    } catch (error) {
      console.error("Error checking systemuser owner for AvSec:", error);
      return false;
    }
  }

  return false;
}

async function isOwnedByISSO(ownerValue) {
  if (!ownerValue) return false;

  // CASE 1: Direct GUID string → treat as team owner
  if (typeof ownerValue === "string") {
    return isOwnedBy(ownerValue, [TEAM_SCHEMA_NAMES.ISSO_TEAM]);
  }

  // CASE 2: Normal lookup array from form
  if (!ownerValue[0]) return false;

  var owner = ownerValue[0];
  var entityType = owner.entityType;

  // Owner is a team → compare team ID to env vars, or check team's BU if team GUID doesn't match
  if (entityType === "team") {
    var teamId = owner.id ? owner.id.replace(/[{}]/g, "") : null;
    if (!teamId) return false;

    // First check if team GUID matches ISSO team env var
    var teamMatches = await isOwnedBy(ownerValue, [TEAM_SCHEMA_NAMES.ISSO_TEAM]);
    if (teamMatches) return true;

    // Check Dev Specific Team ID
    if (teamId === DEV_SPECIFIC_IDS.ISSO_TEAM_DEV) return true;

    // If team GUID doesn't match, check team's BU (fallback for teams in ISSO BU but not in env vars)
    try {
      var team = await Xrm.WebApi.retrieveRecord("team", teamId, "?$select=_businessunitid_value");
      var buId = team._businessunitid_value;
      if (!buId) return false;

      return await isISSOBU(buId);
    } catch (error) {
      console.error("Error checking team owner for ISSO:", error);
      return false;
    }
  }

  // Owner is a user → load BU, then check BU
  if (entityType === "systemuser") {
    var userId = owner.id ? owner.id.replace(/[{}]/g, "") : null;
    if (!userId) return false;

    try {
      var user = await Xrm.WebApi.retrieveRecord("systemuser", userId, "?$select=_businessunitid_value");
      var buId = user._businessunitid_value;
      if (!buId) return false;

      return await isISSOBU(buId);
    } catch (error) {
      console.error("Error checking systemuser owner for ISSO:", error);
      return false;
    }
  }

  return false;
}

// Generic function to check if a BU ID matches any of the provided environment variable schema names
async function isBusinessUnit(buId, schemaNames) {
  if (!buId || !Array.isArray(schemaNames) || schemaNames.length === 0) return false;
  var id = buId.toString().replace(/[{}]/g, "").toLowerCase();

  for (var i = 0; i < schemaNames.length; i++) {
    var envId = await getEnvironmentVariableValue(schemaNames[i]);
    if (envId && id === envId) return true;
  }
  return false;
}

// Checks if a BU ID is one of the AvSec Business Units
async function isAvSecBU(buId) {
  // Check Dev Specific BU ID
  if (buId && buId.toString().replace(/[{}]/g, "").toLowerCase() === DEV_SPECIFIC_IDS.AVSEC_BU_DEV) return true;

  return isBusinessUnit(buId, [
    BU_SCHEMA_NAMES.AVIATION_SECURITY_DOMESTIC,
    BU_SCHEMA_NAMES.AVIATION_SECURITY_INTERNATIONAL,
  ]);
}

// Checks if a BU ID is the ISSO Business Unit
async function isISSOBU(buId) {
  return isBusinessUnit(buId, [BU_SCHEMA_NAMES.ISSO]);
}

// Returns an array of AvSec Business Unit GUIDs (normalized)
async function getAvSecBUGUIDs() {
  var guids = [];

  // Add Dev ID
  guids.push(DEV_SPECIFIC_IDS.AVSEC_BU_DEV);

  var guid1 = await getEnvironmentVariableValue(BU_SCHEMA_NAMES.AVIATION_SECURITY_DOMESTIC);
  if (guid1) guids.push(guid1);

  var guid2 = await getEnvironmentVariableValue(BU_SCHEMA_NAMES.AVIATION_SECURITY_INTERNATIONAL);
  if (guid2) guids.push(guid2);

  return guids;
}

// Returns an array of ISSO Business Unit GUIDs (normalized)
async function getISSOBUGUIDs() {
  var guids = [];

  var guid1 = await getEnvironmentVariableValue(BU_SCHEMA_NAMES.ISSO);
  if (guid1) guids.push(guid1);

  return guids;
}

// Checks if a BU ID is the Transport Canada Business Unit
async function isTCBU(buId) {
  return isBusinessUnit(buId, [BU_SCHEMA_NAMES.TRANSPORT_CANADA]);
}

// Helper wrappers for checking if a user's BU matches specific BUs
async function isUserInAvSecBU(userBuId) {
  return isAvSecBU(userBuId);
}

async function isUserInISSOBU(userBuId) {
  return isISSOBU(userBuId);
}

async function isUserInTCBU(userBuId) {
  return isTCBU(userBuId);
}

// Checks if the given user (or current user) is in any AvSec team
async function isUserInAvSecTeam(userId) {
  if (!userId) {
    userId = Xrm.Utility.getGlobalContext().userSettings.userId;
  }
  if (!userId) return false;
  userId = userId.replace(/[{}]/g, "").toLowerCase();

  const domesticTeamId = await getEnvironmentVariableValue(TEAM_SCHEMA_NAMES.AVIATION_SECURITY_DOMESTIC);
  const internationalTeamId = await getEnvironmentVariableValue(TEAM_SCHEMA_NAMES.AVIATION_SECURITY_INTERNATIONAL);

  let inDomestic = false;
  let inInternational = false;

  if (domesticTeamId) {
    inDomestic = await isUserInTeam(userId, domesticTeamId);
  }

  if (!inDomestic && internationalTeamId) {
    inInternational = await isUserInTeam(userId, internationalTeamId);
  }

  return inDomestic || inInternational;
}

// Checks if the given user (or current user) is in the ISSO team
async function isUserInISSOTeam(userId) {
  if (!userId) {
    userId = Xrm.Utility.getGlobalContext().userSettings.userId;
  }
  if (!userId) return false;
  userId = userId.replace(/[{}]/g, "").toLowerCase();

  const issoTeamId = await getEnvironmentVariableValue(TEAM_SCHEMA_NAMES.ISSO_TEAM);
  if (!issoTeamId) return false;

  return isUserInTeam(userId, issoTeamId);
}

// Retrieve actual AvSec BU name from the database for display purposes
async function getAvSecBUName() {
  var guid = await getEnvironmentVariableValue(BU_SCHEMA_NAMES.AVIATION_SECURITY_DOMESTIC);
  if (!guid) {
    guid = await getEnvironmentVariableValue(BU_SCHEMA_NAMES.AVIATION_SECURITY_INTERNATIONAL);
  }

  if (guid) {
    try {
      var result = await Xrm.WebApi.retrieveRecord("businessunit", guid, "?$select=name");
      return result.name || "Aviation Security";
    } catch (error) {
      console.log("Error retrieving AvSec BU name: " + error.message);
      return "Aviation Security";
    }
  }
  return "Aviation Security";
}

// Retrieve actual ISSO BU name from the database for display purposes
async function getISSOBUName() {
  var guid = await getEnvironmentVariableValue(BU_SCHEMA_NAMES.ISSO);

  if (guid) {
    try {
      var result = await Xrm.WebApi.retrieveRecord("businessunit", guid, "?$select=name");
      return result.name || "Intermodal Surface Security Oversight";
    } catch (error) {
      console.log("Error retrieving ISSO BU name: " + error.message);
      return "Intermodal Surface Security Oversight";
    }
  }
  return "Intermodal Surface Security Oversight";
}

/**
 * Toggle a section in a tab based on the environment variable ts_TurnoffDocumentCentre
 * @param {Xrm.ExecutionContext} executionContext - Form execution context
 * @param {string} tabName - Name of the tab to toggle
 * @param {string} sectionName - Name of the section to toggle
 */
async function toggleDocumentCenter(executionContext, tabName, sectionName) {
  var form = executionContext.getFormContext();

  var value = await getEnvironmentVariableValue("ts_TurnoffDocumentCentre");

  var tab = form.ui.tabs.get(tabName);
  var section = tab && tab.sections.get(sectionName);
  if (!section) {
    console.warn("Tab or section not found: " + tabName + ", " + sectionName);
    return;
  }

  if (value === "yes") {
    section.setVisible(false);
    console.log("Turn off the Document Centre");
  } else if (value === "no") {
    section.setVisible(true);
    var noticeControl = form.getControl("WebResource_NewDocumentCenterNotice");
    if (noticeControl) {
      noticeControl.setVisible(false);
    }
    console.log("Don't turn off the Document Centre");
  } else {
    console.log("Variable not found or invalid");
  }
}
