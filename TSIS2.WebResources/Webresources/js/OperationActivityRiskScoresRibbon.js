function ReCalculateRiskScore(PrimaryControl) {
    console.log("Entering ReCalculateRiskScore()");

    // Make sure PrimaryControl is not null
    if (PrimaryControl == null) {
        console.error("ReCalculateRiskScore() - The PrimaryControl parameter is null.");
        return;
    }
    else
    {
        console.log("ReCalculateRiskScore() - Parameters are valid.");

        // Get the id of the record
        var formContext = PrimaryControl;
        var recordId = formContext.data.entity.getId(); // This gets the GUID
        var entityName = formContext.data.entity.getEntityName();

        // If the recordId is not valid, log an error and return
        if (!recordId || recordId === "") {
            console.error("ReCalculateRiskScore() - recordId is not valid.");
            return;
        }
        else
        {
            recordId = recordId.replace("{", "").replace("}", ""); // Clean the GUID format

            // update the ts_RiskScoreRibbonTrigger field with the current date and time
            Xrm.WebApi.updateRecord(entityName, recordId, { "ts_riskscoreribbontrigger": new Date().toISOString() })
            .then(function success(result) {
                console.log("Risk score trigger updated successfully. Record ID: " + result.id);
            }, function error(error) {
                console.error("Error updating risk score trigger: " + error.message);
            });
        }
    }
}

// --- global flag the Enable Rule will read
var OARisk_RecalcEnabled = true;

/**
 * Enable Rule for the button.
 * Only checks the cooldown flag (ignores saved state).
 */
function OARisk_IsRecalcEnabled(primaryControl) {
    return OARisk_RecalcEnabled;
}

/**
 * Command Action for the button.
 * Debounces clicks with a short cooldown.
 */
function OARisk_ReCalculateRiskScore(primaryControl) {
    var formContext = primaryControl;

    if (!OARisk_RecalcEnabled) {
        Xrm.Navigation.openAlertDialog({ text: "Please wait a few seconds before clicking again." });
        return;
    }

    // start cooldown immediately
    OARisk_RecalcEnabled = false;
    _oa_refreshRibbon(formContext);

    var idRaw = formContext.data.entity.getId();
    if (!idRaw) {
        _oa_notify("Please save the record before recalculating.");
        _oa_endCooldown(formContext, /*immediate*/ true);
        return;
    }

    var recordId = idRaw.replace(/[{}]/g, "");
    var entityName = formContext.data.entity.getEntityName();

    if (Xrm.Utility && Xrm.Utility.showProgressIndicator) {
        Xrm.Utility.showProgressIndicator("Queuing risk recalculation…");
    }

    var payload = {
        ts_riskscoreribbontrigger: new Date().toISOString()
    };

    Xrm.WebApi.updateRecord(entityName, recordId, payload)
        .then(function () {
            _oa_notify("Risk rating recalculation has been queued.");
            _oa_endCooldown(formContext, /*immediate*/ false);
        })
        .catch(function (err) {
            _oa_error("Error updating trigger: " + err.message);
            _oa_endCooldown(formContext, /*immediate*/ true);
        })
        .finally(function () {
            if (Xrm.Utility && Xrm.Utility.closeProgressIndicator) {
                Xrm.Utility.closeProgressIndicator();
            }
        });
}

// --- helpers ---------------------------------------------------------------

function _oa_endCooldown(formContext, immediate) {
    var delayMs = immediate ? 0 : 5000; // adjust cooldown here
    setTimeout(function () {
        OARisk_RecalcEnabled = true;
        _oa_refreshRibbon(formContext);
    }, delayMs);
}

function _oa_refreshRibbon(formContext) {
    if (formContext && formContext.ui && formContext.ui.refreshRibbon) {
        formContext.ui.refreshRibbon();
    } else if (Xrm.Ribbon && Xrm.Ribbon.refreshCommandBars) {
        Xrm.Ribbon.refreshCommandBars();
    }
}

function _oa_notify(text) {
    Xrm.Navigation.openAlertDialog({ text: text });
}

function _oa_error(text) {
    Xrm.Navigation.openErrorDialog({ message: text });
}
