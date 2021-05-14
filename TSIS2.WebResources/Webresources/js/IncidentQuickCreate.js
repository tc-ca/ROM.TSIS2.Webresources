'use strict';

var QuickCreate =  (function () {
    function QuickCreate() {
    }
    QuickCreate.onLoad = function (eContext) {
        var form = eContext.getFormContext();
        switch (form.ui.getFormType()) {
            case 1:
                this.setRegion(eContext);
                break;
        }
    };
    QuickCreate.regionOnChange = function (eContext) {
        try {
            var form = eContext.getFormContext();
            var regionAttribute = form.getAttribute("ovs_region");
            if (regionAttribute != null && regionAttribute != undefined) {
                var regionAttributeValue = regionAttribute.getValue();
                if (regionAttributeValue != null && regionAttributeValue != undefined) {
                    if (regionAttributeValue[0].id == "{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}") {
                        form.getControl("ts_country").setVisible(true);
                    }
                }
                else {
                    form.getControl("ts_country").setVisible(false);
                }
            }
        }
        catch (e) {
            throw new Error(e.Message);
        }
    };
    QuickCreate.setRegion = function (eContext) {
        var currentUserId = Xrm.Utility.getGlobalContext().userSettings.userId;
        currentUserId = currentUserId.replace(/[{}]/g, "");
        var $this = this;
        Xrm.WebApi.online.retrieveRecord("systemuser", currentUserId, "?$select=_territoryid_value").then(function success(result) {
            var form = eContext.getFormContext();
            if (result != null && result["_territoryid_value"] != null) {
                Xrm.WebApi.online.retrieveRecord("territory", result["_territoryid_value"], "?$select=name").then(function success(result) {
                    var territoryId = result["territoryid"];
                    var territoryName = result["name"];
                    var territoryLogicalName = "territory";
                    var lookup = new Array();
                    lookup[0] = new Object();
                    lookup[0].id = territoryId;
                    lookup[0].name = territoryName;
                    lookup[0].entityType = territoryLogicalName;
                    form.getAttribute('ovs_region').setValue(lookup);
                    if (lookup[0].id == "{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}") {
                        form.getControl("ts_country").setVisible(true);
                    }
                    else {
                        $this.regionOnChange(eContext);
                    }
                }, function (error) {
                    var alertStrings = { text: error.message };
                    var alertOptions = { height: 120, width: 260 };
                    Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function () { });
                });
            }
        }, function (error) {
            var alertStrings = { text: error.message };
            var alertOptions = { height: 120, width: 260 };
            Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function () { });
        });
    };
    return QuickCreate;
}());

var ROM;
(function (ROM) {
    (function (IncidentQuickCreate) {
        function onLoad(eContext) {
            QuickCreate.onLoad(eContext);
        }
        IncidentQuickCreate.onLoad = onLoad;
        function regionOnChange(eContext) {
            QuickCreate.regionOnChange(eContext);
        }
        IncidentQuickCreate.regionOnChange = regionOnChange;
    })(ROM.IncidentQuickCreate || (ROM.IncidentQuickCreate = {}));
})(ROM || (ROM = {}));
