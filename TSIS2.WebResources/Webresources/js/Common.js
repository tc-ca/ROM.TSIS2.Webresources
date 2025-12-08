// Team Schema Name Constants
const TEAM_SCHEMA_NAMES = {
  AVIATION_SECURITY_DOMESTIC: "ts_AviationSecurityDirectorateDomesticTeamGUID",
  AVIATION_SECURITY_INTERNATIONAL: "ts_AviationSecurityInternationalTeamGUID",
  AVIATION_SECURITY: "ts_AviationSecurityTeamGUID",
  ISSO_TEAM: "ts_IntermodalSurfaceSecurityOversightISSOTeamGUID",
  RAIL_SAFETY: "ts_RailSafetyTeamGUID",
  ROM_RAIL_SAFETY_ADMINISTRATOR: "ts_ROMRailSafetyAdministratorGUID",
  AVIATION_SECURITY_INTERNATIONAL_DEV: "ts_AviationSecurityInternationalTeamGUID_DEV",
  ISSO_TEAM_DEV: "ts_IntermodalSurfaceSecurityOversightISSOTeamGUID_DEV",
};

// Business Unit Schema Name Constants
const BU_SCHEMA_NAMES = {
  AVIATION_SECURITY_DOMESTIC: "ts_AviationSecurityDirectorateDomesticBusinessUnitGUID",
  AVIATION_SECURITY_INTERNATIONAL: "ts_AviationSecurityInternationalBusinessUnitGUID",
  ISSO: "ts_IntermodalSurfaceSecurityOversightISSOBusinessUnitGUID",
  TRANSPORT_CANADA: "ts_TransportCanadaBusinessUnitGUID",
  AVIATION_SECURITY_INTERNATIONAL_DEV: "ts_AviationSecurityInternationalBusinessUnitGUID_DEV",
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

/**
 * Check team membership via teammembership join; expects GUID strings.
 * @param {string} userId - User GUID
 * @param {string} teamId - Team GUID
 * @returns {Promise<boolean>} True if user is in team
 */
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

/**
 * Fetch env var and normalize as GUID (lowercase, no braces).
 * Only valid for GUID-based vars—not URLs, keys, or case-sensitive values.
 * @param {string} schemaName - The environment variable schema name
 * @returns {Promise<string|null>} Normalized GUID string or null
 */
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
 * Extract owner GUID regardless of shape: WebApi (_ownerid_value) or lookup (ownerid.id).
 * @param {object} record - The record object (WebApi or form lookup format)
 * @returns {string|null} Owner GUID string or null
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


/**
 * Polymorphic owner check:
 * - Accepts lookup array or raw GUID.
 * - GUID auto-probes as team → user.
 * - Team match = direct team GUID match OR team's BU matches buSchemaNames.
 * - User match = user BU matches buSchemaNames.
 * @param {Array|string} ownerValue - Lookup array [{entityType, id}] or GUID string
 * @param {object} options - Options object with teamSchemaNames and/or buSchemaNames arrays
 * @returns {Promise<boolean>} True if owner matches criteria
 */
async function matchesOwnerTeamOrBU(ownerValue, options) {
  if (!ownerValue || !options) return false;

  // Normalize input → entityType + id
  var entityType = null;
  var id = null;

  // CASE 1: Direct GUID string (could be team OR systemuser)
  if (typeof ownerValue === "string") {
    id = ownerValue;
    // entityType intentionally left null → we will probe team first, then systemuser
  }
  // CASE 2: Normal lookup array from a form field
  else if (Array.isArray(ownerValue) && ownerValue[0]) {
    entityType = ownerValue[0].entityType;
    id = ownerValue[0].id;
  } else {
    return false;
  }

  if (!id) return false;

  var cleanId = id.replace(/[{}]/g, "").toLowerCase();

  async function checkBU(buId) {
    if (!buId) return false;

    if (options.buSchemaNames && options.buSchemaNames.length > 0) {
      return await isBusinessUnit(buId, options.buSchemaNames);
    }

    return false;
  }

  async function checkTeamOwner(ownerId, allowFallbackToUser) {
    // 1) Direct match against team env vars
    if (options.teamSchemaNames && options.teamSchemaNames.length > 0) {
      const cleanOwnerId = ownerId;
      for (var i = 0; i < options.teamSchemaNames.length; i++) {
        var envId = await getEnvironmentVariableValue(options.teamSchemaNames[i]);
        if (envId && cleanOwnerId === envId) {
          return true;
        }
      }
    }

    // 2) Fallback: check the team's Business Unit
    try {
      var team = await Xrm.WebApi.retrieveRecord("team", ownerId, "?$select=_businessunitid_value");
      var buId = team._businessunitid_value;
      if (!buId) return false;

      return await checkBU(buId);
    } catch (error) {
      console.warn("Error in matchesOwnerTeamOrBU checking team owner:", error);

      // In ambiguous string-GUID mode we want to be able to fall back to systemuser
      if (allowFallbackToUser) {
        // Signal caller that we couldn't confirm it's a team → try user next
        return null;
      }

      return false;
    }
  }

  async function checkUserOwner(ownerId) {
    try {
      var user = await Xrm.WebApi.retrieveRecord("systemuser", ownerId, "?$select=_businessunitid_value");
      var buId = user._businessunitid_value;
      if (!buId) return false;

      return await checkBU(buId);
    } catch (error) {
      console.error("Error in matchesOwnerTeamOrBU checking systemuser owner:", error);
      return false;
    }
  }

  // ---- AMBIGUOUS STRING PATH (could be team OR user) ----
  if (!entityType) {
    // First, try treating the GUID as a team
    var teamResult = await checkTeamOwner(cleanId, true);
    if (teamResult === true) return true;
    if (teamResult === false) return false;
    // teamResult === null → not a valid team (or failed to load) → try systemuser
    var userResult = await checkUserOwner(cleanId);
    return userResult === true;
  }

  // ---- EXPLICIT TEAM PATH ----
  if (entityType === "team") {
    var explicitTeamResult = await checkTeamOwner(cleanId, false);
    return explicitTeamResult === true;
  }

  // ---- EXPLICIT SYSTEMUSER PATH ----
  if (entityType === "systemuser") {
    var explicitUserResult = await checkUserOwner(cleanId);
    return explicitUserResult === true;
  }

  return false;
}

/**
 * True if owner belongs to any AvSec team or BU (including *_DEV env-var GUIDs).
 * @param {Array|string} ownerValue - Owner lookup array or GUID string
 * @returns {Promise<boolean>} True if owner is AvSec
 */
async function isOwnedByAvSec(ownerValue) {
  return matchesOwnerTeamOrBU(ownerValue, {
    teamSchemaNames: [
      TEAM_SCHEMA_NAMES.AVIATION_SECURITY_DOMESTIC,
      TEAM_SCHEMA_NAMES.AVIATION_SECURITY_INTERNATIONAL,
      TEAM_SCHEMA_NAMES.AVIATION_SECURITY,
      TEAM_SCHEMA_NAMES.AVIATION_SECURITY_INTERNATIONAL_DEV,
    ],
    buSchemaNames: [
      BU_SCHEMA_NAMES.AVIATION_SECURITY_DOMESTIC,
      BU_SCHEMA_NAMES.AVIATION_SECURITY_INTERNATIONAL,
      BU_SCHEMA_NAMES.AVIATION_SECURITY_INTERNATIONAL_DEV,
    ],
  });
}

/**
 * True only for AvSec Domestic team or Domestic AvSec BU.
 * @param {Array|string} ownerValue - Owner lookup array or GUID string
 * @returns {Promise<boolean>} True if owner is AvSec Domestic
 */
async function isOwnedByAvSecDomestic(ownerValue) {
  return matchesOwnerTeamOrBU(ownerValue, {
    teamSchemaNames: [
      TEAM_SCHEMA_NAMES.AVIATION_SECURITY_DOMESTIC,],
    buSchemaNames: [
      BU_SCHEMA_NAMES.AVIATION_SECURITY_DOMESTIC,
    ],
  });
}

/**
 * True only for AvSec International team/BU (including DEV variant).
 * @param {Array|string} ownerValue - Owner lookup array or GUID string
 * @returns {Promise<boolean>} True if owner is AvSec International
 */
async function isOwnedByAvSecInternational(ownerValue) {
  return matchesOwnerTeamOrBU(ownerValue, {
    teamSchemaNames: [
      TEAM_SCHEMA_NAMES.AVIATION_SECURITY_INTERNATIONAL,
      TEAM_SCHEMA_NAMES.AVIATION_SECURITY_INTERNATIONAL_DEV,
    ],
    buSchemaNames: [
      BU_SCHEMA_NAMES.AVIATION_SECURITY_INTERNATIONAL,
      BU_SCHEMA_NAMES.AVIATION_SECURITY_INTERNATIONAL_DEV,
    ],
  });
}

/**
 * True if owner belongs to ISSO team or ISSO BU (including DEV team).
 * @param {Array|string} ownerValue - Owner lookup array or GUID string
 * @returns {Promise<boolean>} True if owner is ISSO
 */
async function isOwnedByISSO(ownerValue) {
  return matchesOwnerTeamOrBU(ownerValue, {
    teamSchemaNames: [
      TEAM_SCHEMA_NAMES.ISSO_TEAM,
      TEAM_SCHEMA_NAMES.ISSO_TEAM_DEV,
    ],
    buSchemaNames: [
      BU_SCHEMA_NAMES.ISSO,
    ],
  });
}

/**
 * True if owner is Rail Safety team (team-only).
 * @param {Array|string} ownerValue - Owner lookup array or GUID string
 * @returns {Promise<boolean>} True if owner is Rail Safety team
 */
async function isOwnedByRailSafety(ownerValue) {
  return matchesOwnerTeamOrBU(ownerValue, {
    teamSchemaNames: [TEAM_SCHEMA_NAMES.RAIL_SAFETY],
    buSchemaNames: [],
  });
}

/**
 * True if owner is Rail Safety Administrator team (team-only).
 * @param {Array|string} ownerValue - Owner lookup array or GUID string
 * @returns {Promise<boolean>} True if owner is Rail Safety Administrator team
 */
async function isOwnedByRailSafetyAdministrator(ownerValue) {
  return matchesOwnerTeamOrBU(ownerValue, {
    teamSchemaNames: [TEAM_SCHEMA_NAMES.ROM_RAIL_SAFETY_ADMINISTRATOR],
    buSchemaNames: [],
  });
}

/**
 * BU matches any GUID stored in provided env-var schema names.
 * @param {string} buId - Business Unit GUID
 * @param {string[]} schemaNames - Array of environment variable schema names
 * @returns {Promise<boolean>} True if BU matches any schema name
 */
async function isBusinessUnit(buId, schemaNames) {
  if (!buId || !Array.isArray(schemaNames) || schemaNames.length === 0) return false;
  var id = buId.toString().replace(/[{}]/g, "").toLowerCase();

  for (var i = 0; i < schemaNames.length; i++) {
    var envId = await getEnvironmentVariableValue(schemaNames[i]);
    if (envId && id === envId) return true;
  }
  return false;
}

/**
 * True if BU is an AvSec BU (domestic, international, or DEV).
 * @param {string} buId - Business Unit GUID
 * @returns {Promise<boolean>} True if BU is AvSec
 */
async function isAvSecBU(buId) {
  return isBusinessUnit(buId, [
    BU_SCHEMA_NAMES.AVIATION_SECURITY_DOMESTIC,
    BU_SCHEMA_NAMES.AVIATION_SECURITY_INTERNATIONAL,
    BU_SCHEMA_NAMES.AVIATION_SECURITY_INTERNATIONAL_DEV,
  ]);
}

/**
 * True if BU is the ISSO BU.
 * @param {string} buId - Business Unit GUID
 * @returns {Promise<boolean>} True if BU is ISSO
 */
async function isISSOBU(buId) {
  return isBusinessUnit(buId, [BU_SCHEMA_NAMES.ISSO]);
}

// Returns an array of AvSec Business Unit GUIDs (normalized)
async function getAvSecBUGUIDs() {
  var guids = [];

  var devGuid = await getEnvironmentVariableValue(BU_SCHEMA_NAMES.AVIATION_SECURITY_INTERNATIONAL_DEV);
  if (devGuid) guids.push(devGuid);

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

/**
 * True if BU is the Transport Canada BU.
 * @param {string} buId - Business Unit GUID
 * @returns {Promise<boolean>} True if BU is Transport Canada
 */
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

/**
 * True if user is in any AvSec team (domestic, intl, intl-DEV, main AvSec).
 * @param {string} [userId] - User GUID (optional, defaults to current user)
 * @returns {Promise<boolean>} True if user is in any AvSec team
 */
async function isUserInAvSecTeam(userId) {
  if (!userId) {
    userId = Xrm.Utility.getGlobalContext().userSettings.userId;
  }
  if (!userId) return false;
  userId = userId.replace(/[{}]/g, "").toLowerCase();

  const domesticTeamId = await getEnvironmentVariableValue(TEAM_SCHEMA_NAMES.AVIATION_SECURITY_DOMESTIC);
  const internationalTeamId = await getEnvironmentVariableValue(TEAM_SCHEMA_NAMES.AVIATION_SECURITY_INTERNATIONAL);
  const devInternationalTeamId = await getEnvironmentVariableValue(TEAM_SCHEMA_NAMES.AVIATION_SECURITY_INTERNATIONAL_DEV);
  const mainAvSecTeamId = await getEnvironmentVariableValue(TEAM_SCHEMA_NAMES.AVIATION_SECURITY);

  const teamIds = [domesticTeamId, internationalTeamId, devInternationalTeamId, mainAvSecTeamId].filter(Boolean);

  for (let i = 0; i < teamIds.length; i++) {
    const teamId = teamIds[i];
    if (await isUserInTeam(userId, teamId)) {
      return true;
    }
  }

  return false;
}

/**
 * True if user is in ISSO team (prod or DEV).
 * @param {string} [userId] - User GUID (optional, defaults to current user)
 * @returns {Promise<boolean>} True if user is in ISSO team
 */
async function isUserInISSOTeam(userId) {
  if (!userId) {
    userId = Xrm.Utility.getGlobalContext().userSettings.userId;
  }
  if (!userId) return false;
  userId = userId.replace(/[{}]/g, "").toLowerCase();

  const issoTeamId = await getEnvironmentVariableValue(TEAM_SCHEMA_NAMES.ISSO_TEAM);
  const issoTeamDevId = await getEnvironmentVariableValue(TEAM_SCHEMA_NAMES.ISSO_TEAM_DEV);

  const teamIds = [issoTeamId, issoTeamDevId].filter(Boolean);

  for (let i = 0; i < teamIds.length; i++) {
    const teamId = teamIds[i];
    if (await isUserInTeam(userId, teamId)) {
      return true;
    }
  }

  return false;
}

// Retrieve actual AvSec BU name from the database for display purposes
async function getAvSecBUName() {
  let guid =
    (await getEnvironmentVariableValue(BU_SCHEMA_NAMES.AVIATION_SECURITY_DOMESTIC)) ||
    (await getEnvironmentVariableValue(BU_SCHEMA_NAMES.AVIATION_SECURITY_INTERNATIONAL)) ||
    (await getEnvironmentVariableValue(BU_SCHEMA_NAMES.AVIATION_SECURITY_INTERNATIONAL_DEV));

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
 * Show/hide section based on ts_TurnoffDocumentCentre ("yes" hides, "no" shows).
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

/**
 * Get team name by team ID
 * @param {string} teamId - The team GUID
 * @returns {Promise<string|null>} The team name or null if not found
 */
async function getTeamNameById(teamId) {
  try {
    var cleanTeamId = teamId.replace(/[{}]/g, "").toLowerCase();
    var result = await Xrm.WebApi.retrieveRecord("team", cleanTeamId, "?$select=name");
    return result.name;
  } catch (error) {
    console.error("Error retrieving team name:", error);
    return null;
  }
}

/**
 * True if user is in team identified by env-var GUID.
 * @param {string} teamSchemaName - The environment variable schema name for the team GUID
 * @returns {Promise<boolean>} True if user is a member
 */
async function isUserInTeamByEnvVar(teamSchemaName) {
  try {
    var teamGuid = await getEnvironmentVariableValue(teamSchemaName);
    if (!teamGuid) return false;

    var userId = Xrm.Utility.getGlobalContext().userSettings.userId.replace(/[{}]/g, "").toLowerCase();
    return await isUserInTeam(userId, teamGuid);
  } catch (error) {
    console.error("Error checking current user team membership:", error);
    return false;
  }
}

/**
 * For users in given team: show only tabs in visibleTabs; hide the rest.
 * @param {object} formContext - The form context
 * @param {string} teamSchemaName - The environment variable schema name for the team GUID
 * @param {string[]} visibleTabs - Array of tab names to show (all others will be hidden)
 * @returns {Promise<void>}
 */
async function applyTabVisibilityForTeam(formContext, teamSchemaName, visibleTabs) {
  try {
    var isMember = await isUserInTeamByEnvVar(teamSchemaName);
    if (!isMember) return;

    var tabs = formContext.ui.tabs.get();
    tabs.forEach(function (tab) {
      var tabName = tab.getName();
      tab.setVisible(visibleTabs.indexOf(tabName) > -1);
    });
  } catch (error) {
    console.error("Error applying tab visibility for team:", error);
  }
}

/**
 * Assigns Rail Safety Team ownership if user is a Rail Safety team member.
 * Does not call save() - caller is responsible for save.
 * @param {object} formContext - The form context
 * @returns {Promise<boolean>} True if the form was modified, false otherwise
 */
async function assignRailSafetyOwnershipOnSave(formContext) {
  try {
    var isMember = await isUserInTeamByEnvVar(TEAM_SCHEMA_NAMES.RAIL_SAFETY);
    if (!isMember) return false;

    var teamGuid = await getEnvironmentVariableValue(TEAM_SCHEMA_NAMES.RAIL_SAFETY);
    if (!teamGuid) return false;

    var ownerAttribute = formContext.getAttribute("ownerid");
    var currentOwner = ownerAttribute.getValue();

    // Check if already owned by Rail Safety team
    if (currentOwner && currentOwner[0] && currentOwner[0].entityType === "team" &&
        currentOwner[0].id.replace(/[{}]/g, "").toLowerCase() === teamGuid) {
      return false;
    }

    var teamName = (await getTeamNameById(teamGuid)) || "";
    ownerAttribute.setValue([
      {
        id: teamGuid,
        entityType: "team",
        name: teamName,
      },
    ]);
    return true;
  } catch (error) {
    console.error("[Rail Safety] Error in assignRailSafetyOwnershipOnSave:", error);
    return false;
  }
}

/**
 * Checks if the current record is owned by the Rail Safety Team and logs to console.
 * @param {object} formContext - The form context
 * @returns {Promise<void>}
 */
async function logRailSafetyOwnershipStatus(formContext) {
  try {
    var ownerAttribute = formContext.getAttribute("ownerid");
    var ownerValue = ownerAttribute.getValue();

    if (!ownerValue) {
      return;
    }

    var isRailSafety = await isOwnedByRailSafety(ownerValue);
    if (isRailSafety) {
      console.log("This record belongs to Rail Safety.");
    }
  } catch (error) {
    console.error("Error checking Rail Safety ownership:", error);
  }
}
