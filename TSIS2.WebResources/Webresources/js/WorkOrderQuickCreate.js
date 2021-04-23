"use strict";
/* eslint-disable @typescript-eslint/triple-slash-reference */
var ROM;
(function (ROM) {
    var WorkOrderQuickCreate;
    (function (WorkOrderQuickCreate) {
        // EVENTS
        function onLoad(eContext) {
            var form = eContext.getFormContext();
        }
        WorkOrderQuickCreate.onLoad = onLoad;
        function regionOnChange(eContext) {
            try {
                var form = eContext.getFormContext();
                var regionAttribute = form.getAttribute("msdyn_serviceterritory");
                var countryAttribute = form.getAttribute("ts_country");
                if (regionAttribute != null && regionAttribute != undefined) {
                    var regionAttributeValue = regionAttribute.getValue();
                    if (regionAttributeValue != null && regionAttributeValue != undefined) {
                        if (regionAttributeValue[0].name == "International") {
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
        }
        WorkOrderQuickCreate.regionOnChange = regionOnChange;
    })(WorkOrderQuickCreate = ROM.WorkOrderQuickCreate || (ROM.WorkOrderQuickCreate = {}));
})(ROM || (ROM = {}));
