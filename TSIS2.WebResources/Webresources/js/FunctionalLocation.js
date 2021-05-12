"use strict";
var ROM;
(function (ROM) {
    var FunctionalLocation;
    (function (FunctionalLocation) {
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            var ownerAttribute = form.getAttribute("ownerid");
            if (ownerAttribute != null && ownerAttribute != undefined) {
                var ownerAttributeValue = ownerAttribute.getValue();
                if (ownerAttributeValue != null && ownerAttributeValue != undefined) {
                    Xrm.WebApi.retrieveRecord("systemusers", ownerAttributeValue[0].id.replace(/[{}]/g, ""), "?$select=_businessunitid_value").then(function success(result) {
                        Xrm.WebApi.retrieveRecord("businessunits", result._businessunitid_value, "?$select=name").then(function success(result) {
                            form.getAttribute("ts_businessunit").setValue(result._businessunitid_value);
                        }, function (error) {
                        });
                    }, function (error) {
                    });
                }
            }
        }
        FunctionalLocation.onLoad = onLoad;
    })(FunctionalLocation = ROM.FunctionalLocation || (ROM.FunctionalLocation = {}));
})(ROM || (ROM = {}));
