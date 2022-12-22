"use strict";
var ROM;
(function (ROM) {
    var SecurityIncident;
    (function (SecurityIncident) {
        function onLoad(eContext) {
            var formContext = eContext.getFormContext();
            var delaysToOperations = formContext.getAttribute("ts_delaystooperation");
            if (delaysToOperations.getValue() == 717750001 /* Unknown */ || delaysToOperations.getValue() == null) {
                formContext.getControl("ts_delayduration").setVisible(false);
            }
            if (formContext.ui.getFormType() == 2) {
                StatusOfRailwayOwnerOnChange(eContext);
                var mode = formContext.getAttribute("ts_mode");
                if (mode.getValue() == 717750001 /* InternationalBridgesandTunnels */) {
                    formContext.getControl("ts_bridgeclosure").setVisible(true);
                    formContext.getControl("ts_damagestoibtproperty").setVisible(true);
                    formContext.getControl("ts_ruralorurban").setVisible(false);
                    formContext.getControl("ts_publicorprivatecrossing").setVisible(false);
                    //Retrieve IBT locations
                    var ibtLocationFetchXML = [
                        "<fetch>",
                        "  <entity name='msdyn_functionallocation'>",
                        "    <filter>",
                        "       <condition attribute='ts_mode' operator='contain-values'>",
                        "           <value>717750001</value>",
                        "       </condition>",
                        "    </filter>",
                        "  </entity>",
                        "</fetch>",
                    ].join("");
                    //Set custom view for Site field
                    var viewIBTLocationId = '{75e123a5-2d58-4642-a298-6d7e4edc089e}';
                    var layoutXmlContact = '<grid name="resultset" jump="msdyn_name" select="1" icon="1" preview="1" object="10117"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="300" /><cell name="createdon" width="125" /></row></grid>';
                    var viewDisplayName = "Site";
                    formContext.getControl("ts_site").addCustomView(viewIBTLocationId, "msdyn_functionallocation", viewDisplayName, ibtLocationFetchXML, layoutXmlContact, true);
                }
                if (mode.getValue() == 717750002 /* AviationSecurity */) {
                    formContext.getControl("ts_securityincidenttype").setDefaultView("f88f3bcb-6a76-ed11-81ac-0022483d5ee0");
                }
                else {
                    formContext.getControl("ts_securityincidenttype").setDefaultView("b8d91bb4-6776-ed11-81ac-0022483d5ee0");
                }
            }
        }
        SecurityIncident.onLoad = onLoad;
        function StatusOfRailwayOwnerOnChange(eContext) {
            var form = eContext.getFormContext();
            var statusOfRailwayOwner = form.getAttribute("ts_statusofrailwayowner").getValue();
            if (statusOfRailwayOwner == null || (statusOfRailwayOwner != null && statusOfRailwayOwner == 717750000 /* Known */))
                form.getControl("ts_owneroftherailwaylinetrack").setVisible(true);
            else
                form.getControl("ts_owneroftherailwaylinetrack").setVisible(false);
            if (form.getAttribute("ts_delaystooperation").getValue() == 717750000 /* Known */) {
                form.getControl("ts_delayduration").setVisible(true);
            }
            if (form.getAttribute("ts_arrests").getValue() == 717750000 /* Known */) {
                form.getControl("ts_arrestscount").setVisible(true);
                form.getControl("ts_arrestsdetails").setVisible(true);
            }
        }
        SecurityIncident.StatusOfRailwayOwnerOnChange = StatusOfRailwayOwnerOnChange;
        function delaysToOperationOnChange(eContext) {
            var form = eContext.getFormContext();
            var delaysToOperations = form.getAttribute("ts_delaystooperation");
            if (delaysToOperations.getValue() == 717750000 /* Known */) {
                form.getControl("ts_delayduration").setVisible(true);
            }
            else if (delaysToOperations.getValue() == 717750001 /* Unknown */ || delaysToOperations.getValue() == null) {
                form.getAttribute("ts_delayduration").setValue(null);
                form.getControl("ts_delayduration").setVisible(false);
            }
        }
        SecurityIncident.delaysToOperationOnChange = delaysToOperationOnChange;
        function arrestsOnChange(eContext) {
            var form = eContext.getFormContext();
            var arrests = form.getAttribute("ts_arrests");
            if (arrests.getValue() == 717750000 /* Known */) {
                form.getControl("ts_arrestscount").setVisible(true);
                form.getControl("ts_arrestsdetails").setVisible(true);
            }
        }
        SecurityIncident.arrestsOnChange = arrestsOnChange;
        function modeOnChange(eContext) {
            var form = eContext.getFormContext();
            var mode = form.getAttribute("ts_mode");
            if (mode.getValue() == 717750001 /* InternationalBridgesandTunnels */) {
                form.getControl("ts_bridgeclosure").setVisible(true);
                form.getControl("ts_damagestoibtproperty").setVisible(true);
                form.getControl("ts_ruralorurban").setVisible(false);
                form.getControl("ts_publicorprivatecrossing").setVisible(false);
                //Retrieve IBT locations
                var ibtLocationFetchXML = [
                    "<fetch>",
                    "  <entity name='msdyn_functionallocation'>",
                    "    <filter>",
                    "       <condition attribute='ts_mode' operator='contain-values'>",
                    "           <value>717750001</value>",
                    "       </condition>",
                    "    </filter>",
                    "  </entity>",
                    "</fetch>",
                ].join("");
                //Set custom view for Site field
                var viewIBTLocationId = '{75e123a5-2d58-4642-a298-6d7e4edc089e}';
                var layoutXmlContact = '<grid name="resultset" jump="msdyn_name" select="1" icon="1" preview="1" object="10117"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="300" /><cell name="createdon" width="125" /></row></grid>';
                var viewDisplayName = "Site";
                form.getControl("ts_site").addCustomView(viewIBTLocationId, "msdyn_functionallocation", viewDisplayName, ibtLocationFetchXML, layoutXmlContact, true);
                form.getAttribute("ts_site").setValue(null);
            }
            else {
                form.getControl("ts_bridgeclosure").setVisible(false);
                form.getControl("ts_damagestoibtproperty").setVisible(false);
                form.getControl("ts_ruralorurban").setVisible(true);
                form.getControl("ts_publicorprivatecrossing").setVisible(true);
                // Set default view
                form.getControl("ts_site").setDefaultView("57f1ece8-04ac-4178-b2bd-cbd292d2ecc4");
                form.getAttribute("ts_site").setValue(null);
            }
            if (mode.getValue() == 717750002 /* AviationSecurity */) {
                form.getControl("ts_securityincidenttype").setDefaultView("f88f3bcb-6a76-ed11-81ac-0022483d5ee0");
                form.getAttribute("ts_securityincidenttype").setValue(null);
            }
            else {
                form.getControl("ts_securityincidenttype").setDefaultView("b8d91bb4-6776-ed11-81ac-0022483d5ee0");
                form.getAttribute("ts_securityincidenttype").setValue(null);
            }
        }
        SecurityIncident.modeOnChange = modeOnChange;
    })(SecurityIncident = ROM.SecurityIncident || (ROM.SecurityIncident = {}));
})(ROM || (ROM = {}));
