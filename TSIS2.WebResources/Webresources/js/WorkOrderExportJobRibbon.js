"use strict";

var STATUS_ACTIVE = 1;
var STATUS_CLIENT_PROCESSING = 741130001;
var STATUS_READY_FOR_SERVER = 741130002;
var STATUS_READY_FOR_FLOW = 741130003;
var STATUS_FLOW_RUNNING = 741130004;
var STATUS_READY_FOR_MERGE = 741130005;
var STATUS_MERGE_IN_PROGRESS = 741130008;
var STATUS_READY_FOR_ZIP = 741130009;
var STATUS_ZIP_IN_PROGRESS = 741130010;
var STATUS_READY_FOR_CLEANUP = 741130011;
var STATUS_CLEANUP_IN_PROGRESS = 741130012;
var STAGE1_STALL_TIMEOUT_MS = 4 * 60 * 1000;
var BACKEND_STALL_TIMEOUT_MS = Number(
  (typeof WORK_ORDER_EXPORT_TIMING !== "undefined" && WORK_ORDER_EXPORT_TIMING
    ? WORK_ORDER_EXPORT_TIMING.BACKEND_STALL_DEAD_AFTER_MINUTES
    : 10)
) * 60 * 1000;
var IN_PROGRESS_STATUSES = [
  STATUS_CLIENT_PROCESSING,
  STATUS_READY_FOR_SERVER,
  STATUS_READY_FOR_FLOW,
  STATUS_FLOW_RUNNING,
  STATUS_READY_FOR_MERGE,
  STATUS_MERGE_IN_PROGRESS,
  STATUS_READY_FOR_ZIP,
  STATUS_ZIP_IN_PROGRESS,
  STATUS_READY_FOR_CLEANUP,
  STATUS_CLEANUP_IN_PROGRESS
];
var STAGE3_RESUME_STATUSES = [
  STATUS_READY_FOR_MERGE,
  STATUS_MERGE_IN_PROGRESS,
  STATUS_READY_FOR_ZIP,
  STATUS_ZIP_IN_PROGRESS,
  STATUS_READY_FOR_CLEANUP,
  STATUS_CLEANUP_IN_PROGRESS
];
var STAGE2_RESUME_STATUSES = [
  STATUS_READY_FOR_SERVER,
  STATUS_READY_FOR_FLOW,
  STATUS_FLOW_RUNNING,
  STATUS_CLIENT_PROCESSING,
  STATUS_ACTIVE,
  741130007 // STATUS_ERROR in plugin
];

var ALLOWED_RESTART_ROLES = "System Administrator|ROM - Business Admin|ROM - Planner|ROM - Manager";

function woejGetFormContext(primaryControl) {
  if (primaryControl && typeof primaryControl.getAttribute === "function") {
    return primaryControl;
  }
  if (typeof Xrm !== "undefined" && Xrm.Page) {
    return Xrm.Page;
  }
  return null;
}

function woejGetJobId(formContext) {
  return ((formContext && formContext.data && formContext.data.entity && formContext.data.entity.getId
    ? formContext.data.entity.getId()
    : "") || "").replace(/[{}]/g, "");
}

function woejGetStatusCode(formContext) {
  var attr = formContext.getAttribute("statuscode") || formContext.getAttribute("header_ts_statuscode");
  return attr ? attr.getValue() : null;
}

function woejIsOneOf(statusCode, statuses) {
  return statuses.indexOf(statusCode) >= 0;
}

function woejIsInProgressStatus(statusCode) {
  return woejIsOneOf(statusCode, IN_PROGRESS_STATUSES);
}

function woejHasRestartRole() {
  if (typeof userHasRole === "function") {
    return userHasRole(ALLOWED_RESTART_ROLES);
  }

  var roles = Xrm.Utility.getGlobalContext().userSettings.roles;
  var allowed = ALLOWED_RESTART_ROLES.toLowerCase().split("|");
  var found = false;
  roles.forEach(function (role) {
    if (allowed.indexOf((role.name || "").toLowerCase()) >= 0) {
      found = true;
    }
  });
  return found;
}

function woejShowAlert(text) {
  return Xrm.Navigation.openAlertDialog({ text: text });
}

function woejGetResourceString(key) {
  return (Xrm.Utility.getResourceString("ts_/resx/WorkOrderExport", key) || "").trim() || key;
}

async function woejPromptResumeOrRestart() {
  var choice = await Xrm.Navigation.openConfirmDialog({
    title: woejGetResourceString("ResumeOrStartOverTitle"),
    text: woejGetResourceString("ResumeOrStartOverText"),
    confirmButtonLabel: woejGetResourceString("OKResume"),
    cancelButtonLabel: woejGetResourceString("StartOver")
  });

  if (choice && choice.confirmed) {
    return "resume";
  }

  var restartConfirm = await Xrm.Navigation.openConfirmDialog({
    title: woejGetResourceString("StartOverExportJobTitle"),
    text: woejGetResourceString("RestartExportConfirmText"),
    confirmButtonLabel: woejGetResourceString("StartOver"),
    cancelButtonLabel: woejGetResourceString("Cancel")
  });

  return restartConfirm && restartConfirm.confirmed ? "restart" : "cancelled";
}

function woejParseDateMs(value) {
  if (!value) return NaN;
  var ts = Date.parse(value);
  return Number.isFinite(ts) ? ts : NaN;
}

function woejIsLikelyStalled(job) {
  if (!job) return false;
  var statusCode = job.statuscode;
  if (!woejIsInProgressStatus(statusCode)) return false;

  var stallTimeoutMs = (statusCode === STATUS_CLIENT_PROCESSING || statusCode === STATUS_ACTIVE)
    ? STAGE1_STALL_TIMEOUT_MS
    : BACKEND_STALL_TIMEOUT_MS;
  var heartbeatMs = woejParseDateMs(job.ts_lastheartbeat);
  var modifiedMs = woejParseDateMs(job.modifiedon);
  var now = Date.now();
  var heartbeatStale = Number.isFinite(heartbeatMs) ? ((now - heartbeatMs) >= stallTimeoutMs) : true;
  var modifiedStale = Number.isFinite(modifiedMs) ? ((now - modifiedMs) >= stallTimeoutMs) : true;

  var hasPartialProgress =
    Number(job.ts_doneunits || 0) > 0 ||
    (((job.ts_progressmessage || "").toString().trim().length) > 0) ||
    Number(job.ts_nextmergeindex || 0) > 0;

  return heartbeatStale && modifiedStale && hasPartialProgress;
}

async function woejGetLiveJobState(jobId) {
  return await Xrm.WebApi.retrieveRecord(
    "ts_workorderexportjob",
    jobId,
    "?$select=statuscode,ts_lastheartbeat,modifiedon,ts_progressmessage,ts_nextmergeindex,ts_doneunits"
  );
}

function woejGetResumeTargetStatus(statusCode) {
  if (woejIsOneOf(statusCode, STAGE3_RESUME_STATUSES)) {
    return STATUS_READY_FOR_MERGE;
  }

  if (woejIsOneOf(statusCode, STAGE2_RESUME_STATUSES)) {
    return STATUS_READY_FOR_SERVER;
  }

  return STATUS_READY_FOR_SERVER;
}

async function woejReloadExportJobForm(jobId, formContext) {
  try {
    await Xrm.Navigation.openForm({
      entityName: "ts_workorderexportjob",
      entityId: jobId,
      openInNewWindow: false
    });
    return;
  } catch (e) {
    // Fallback to in-place refresh if navigation fails.
  }

  try {
    await formContext.data.refresh(false);
    try { formContext.ui.refreshRibbon(); } catch (e) { }
  } catch (e) {
    if (typeof window !== "undefined" && window.location && typeof window.location.reload === "function") {
      window.location.reload();
    }
  }
}

function woejPad2(n) { return n < 10 ? "0" + n : "" + n; }

function woejFormatRestartedName(existingName) {
  var defaultName = woejGetResourceString("ExportDefaultName");
  var base = (existingName || defaultName).toString().trim();
  base = base.replace(/\s*\|\s*restarted\s*@.*$/i, "");
  base = base.replace(/\s+\(restarted\s*@.*\)$/i, "");
  base = base.replace(/\s+\(restarted.*\)$/i, "");

  var now = new Date();
  var stamp = now.getFullYear() + "-" + woejPad2(now.getMonth() + 1) + "-" + woejPad2(now.getDate()) +
    " " + woejPad2(now.getHours()) + ":" + woejPad2(now.getMinutes());
  var userName = "";
  try {
    userName = (Xrm.Utility.getGlobalContext().userSettings.userName || "").toString().trim();
  } catch (e) {
    userName = "";
  }
  if (!userName) {
    userName = woejGetResourceString("UnknownUser");
  }

  var fmt = woejGetResourceString("RestartedAtByFormat");
  return base + " " + (fmt.replace("{0}", stamp).replace("{1}", userName));
}

function woejIsGeneratedExportArtifact(filename) {
  var name = (filename || "").toString().trim().toLowerCase();
  if (!name) return false;

  if (/^wo_.+_survey_.+\.pdf$/i.test(name)) return true;
  if (/^wo_.+_main\.pdf$/i.test(name)) return true;
  if (/^wo_.+_merged\.pdf$/i.test(name)) return true;
  if (name === "__woexport_tmp__.wip") return true;
  if (name.endsWith(".zip")) return true;
  return false;
}

async function woejGetGeneratedArtifactNotes(jobId) {
  var query =
    "?$select=annotationid,filename,isdocument" +
    "&$filter=_objectid_value eq " + jobId + " and isdocument eq true" +
    "&$top=5000";

  var result = await Xrm.WebApi.retrieveMultipleRecords("annotation", query);
  return (result.entities || []).filter(function (n) {
    return !!n.annotationid && woejIsGeneratedExportArtifact(n.filename);
  });
}

async function woejDeleteNotes(notes) {
  for (var i = 0; i < notes.length; i++) {
    try {
      await Xrm.WebApi.deleteRecord("annotation", notes[i].annotationid);
    } catch (e) {
      // Keep restart resilient even if one note cannot be deleted.
    }
  }
}

function canRestartJob(primaryControl) {
  try {
    var formContext = woejGetFormContext(primaryControl);
    if (!formContext) return false;
    if (!woejHasRestartRole()) return false;
    return true;
  } catch (e) {
    return false;
  }
}

async function restartJob(primaryControl, options) {
  options = options || {};
  var forceRestart = !!options.forceRestart;
  var preRestartUpdate = options.preRestartUpdate || null;
  var formContext = woejGetFormContext(primaryControl);
  if (!formContext) {
    await woejShowAlert(woejGetResourceString("CouldNotDetermineFormContext"));
    return;
  }

  if (!woejHasRestartRole()) {
    await woejShowAlert(woejGetResourceString("OnlyRolesCanRestart"));
    return;
  }

  var jobId = woejGetJobId(formContext);
  if (!jobId) {
    await woejShowAlert(woejGetResourceString("CouldNotDetermineJobId"));
    return;
  }

  var jobState = null;
  try {
    jobState = await woejGetLiveJobState(jobId);
  } catch (e) {
    // Fall back to form values if live retrieve fails.
  }

  var statusCode = jobState && jobState.statuscode != null
    ? jobState.statuscode
    : woejGetStatusCode(formContext);
  var inProgress = woejIsInProgressStatus(statusCode);
  var isStalled = inProgress && woejIsLikelyStalled(jobState);

  if (!forceRestart && inProgress && !isStalled) {
    await woejShowAlert(woejGetResourceString("ExportJobStillRunning"));
    return;
  }

  var mode = forceRestart ? "restart" : (inProgress ? await woejPromptResumeOrRestart() : "restart");
  if (mode === "cancelled") return;

  try {
    if (mode === "resume") {
      Xrm.Utility.showProgressIndicator(woejGetResourceString("ResumingExportJob"));

      var targetStatus = woejGetResumeTargetStatus(statusCode);
      await Xrm.WebApi.updateRecord("ts_workorderexportjob", jobId, {
        statuscode: targetStatus,
        ts_errormessage: ""
      });

      Xrm.Utility.closeProgressIndicator();
      await woejShowAlert(woejGetResourceString("ResumeRequestedReloading"));
      await woejReloadExportJobForm(jobId, formContext);
      return;
    }

    if (!inProgress) {
      var confirm = await Xrm.Navigation.openConfirmDialog({
        title: woejGetResourceString("RestartExportJobTitle"),
        text: woejGetResourceString("RestartExportConfirmText")
      });
      if (!confirm || !confirm.confirmed) return;
    }

    Xrm.Utility.showProgressIndicator(woejGetResourceString("RestartingExportJob"));

    var notes = await woejGetGeneratedArtifactNotes(jobId);
    if (notes.length > 0) {
      await woejDeleteNotes(notes);
    }

    var existingNameAttr = formContext.getAttribute("ts_name");
    var existingName = existingNameAttr ? existingNameAttr.getValue() : "";
    var restartedName = woejFormatRestartedName(existingName);

    var restartPatch = {
      statuscode: STATUS_CLIENT_PROCESSING,
      ts_name: restartedName,
      ts_errormessage: "",
      ts_payloadjson: null,
      ts_doneunits: 0,
      ts_totalunits: 0,
      ts_nextmergeindex: 0,
      ts_progressmessage: "",
      ts_lastheartbeat: null
    };
    if (preRestartUpdate) {
      for (var field in preRestartUpdate) {
        if (Object.prototype.hasOwnProperty.call(preRestartUpdate, field)) {
          restartPatch[field] = preRestartUpdate[field];
        }
      }
    }

    await Xrm.WebApi.updateRecord("ts_workorderexportjob", jobId, restartPatch);

    // Best effort clear of file column artifact (if present).
    try {
      await Xrm.WebApi.updateRecord("ts_workorderexportjob", jobId, {
        ts_finalexportzip: null
      });
    } catch (e) {
      // Ignore if file-column clear is not available in this org/version.
    }
    try {
      await Xrm.WebApi.updateRecord("ts_workorderexportjob", jobId, {
        ts_tempexportzip: null
      });
    } catch (e) {
      // Ignore if temp file-column clear is not available in this org/version.
    }

    Xrm.Utility.closeProgressIndicator();
    Xrm.Utility.showProgressIndicator(woejGetResourceString("ExportJobRestartedRefresh"));
    await new Promise(function (resolve) { setTimeout(resolve, 5000); });
    try { Xrm.Utility.closeProgressIndicator(); } catch (e) { }
    await woejReloadExportJobForm(jobId, formContext);
  } catch (e) {
    try { Xrm.Utility.closeProgressIndicator(); } catch (ignored) { }
    await woejShowAlert(woejGetResourceString("FailedToRestartExportJob") + (e && e.message ? e.message : e));
  }
}

if (typeof window !== "undefined") {
  window.WorkOrderExportJobRibbon = window.WorkOrderExportJobRibbon || {};
  window.WorkOrderExportJobRibbon.canRestartJob = canRestartJob;
  window.WorkOrderExportJobRibbon.restartJob = restartJob;
}
