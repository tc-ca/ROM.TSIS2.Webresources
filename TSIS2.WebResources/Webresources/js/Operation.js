"use strict";
var ROM;
(function (ROM) {
    var Operation;
    (function (Operation) {
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            var userId = Xrm.Utility.getGlobalContext().userSettings.userId;
            var currentUserBusinessUnitFetchXML = [
                "<fetch top='50'>",
                "  <entity name='businessunit'>",
                "    <attribute name='name' />",
                "    <attribute name='businessunitid' />",
                "    <link-entity name='systemuser' from='businessunitid' to='businessunitid'>",
                "      <filter>",
                "        <condition attribute='systemuserid' operator='eq' value='", userId, "'/>",
                "      </filter>",
                "    </link-entity>",
                "  </entity>",
                "</fetch>",
            ].join("");
            currentUserBusinessUnitFetchXML = "?fetchXml=" + encodeURIComponent(currentUserBusinessUnitFetchXML);
            Xrm.WebApi.retrieveMultipleRecords("businessunit", currentUserBusinessUnitFetchXML).then(function (result) {
                var userBusinessUnitName = result.entities[0].name;
                form.getAttribute("ts_ppeguide").setValue(false);
                //Show Properties Tab when the user is in Transport Canada or ISSO business unit
                if (userBusinessUnitName.startsWith("Transport") || userBusinessUnitName.startsWith("Intermodal")) {
                    form.ui.tabs.get("tab_properties").setVisible(true);
                    //Show PPE questions
                    var ppeRequired = form.getAttribute("ts_pperequired").getValue();
                    var specializedPPERequired = form.getAttribute("ts_specializedpperequired").getValue();
                    if (ppeRequired) {
                        form.getControl("ts_ppecategories").setVisible(true);
                        form.getControl("ts_specializedpperequired").setVisible(true);
                    }
                    if (specializedPPERequired) {
                        form.getControl("ts_typesofspecializedppe").setVisible(true);
                    }
                    //Show Visual Security Inspection question only for Railway Carrier and Railway Loader
                    var operationType = form.getAttribute("ovs_operationtypeid").getValue();
                    if (operationType != null) {
                        if (operationType[0].id == "{D883B39A-C751-EB11-A812-000D3AF3AC0D}" || operationType[0].id == "{DA56FEA1-C751-EB11-A812-000D3AF3AC0D}") {
                            form.getControl("ts_visualsecurityinspection").setVisible(true);
                            form.getControl("ts_typeofdangerousgoods").setVisible(true);
                            //Set default value for existing operations
                            if (form.getAttribute("ts_visualsecurityinspection").getValue() == null) {
                                form.getAttribute("ts_visualsecurityinspection").setValue(717750000 /* Unconfirmed */);
                            }
                            else {
                                if (form.getAttribute("ts_visualsecurityinspection").getValue() == 717750001 /* Yes */) {
                                    form.getControl("ts_visualsecurityinspectiondetails").setVisible(true);
                                }
                            }
                        }
                        //if Operation Type is Small Passenger Company, Passenger Company, or Host Company
                        if (operationType[0].id == "{199E31AE-C751-EB11-A812-000D3AF3AC0D}" || operationType[0].id == "{3B261029-C751-EB11-A812-000D3AF3AC0D}" || operationType[0].id == "{B27E5003-C751-EB11-A812-000D3AF3AC0D}") {
                            form.getControl("ts_issecurityinspectionsite").setVisible(true);
                            //Set default value for existing operations
                            if (form.getAttribute("ts_issecurityinspectionsite").getValue() == null) {
                                form.getAttribute("ts_issecurityinspectionsite").setValue(717750000 /* Unconfirmed */);
                            }
                            else {
                                if (form.getAttribute("ts_issecurityinspectionsite").getValue() == 717750001 /* Yes */) {
                                    form.getControl("ts_securityinspectiondetails").setVisible(true);
                                }
                            }
                        }
                    }
                }
            });
            if (form.getAttribute("ts_statusstartdate").getValue() != null) {
                form.getControl("ts_statusenddate").setDisabled(false);
                form.getControl("ts_description").setDisabled(false);
                form.getAttribute("ts_description").setRequiredLevel("required");
            }
        }
        Operation.onLoad = onLoad;
        function onSave(eContext) {
            var form = eContext.getFormContext();
            var statusStartDateValue = form.getAttribute("ts_statusstartdate").getValue();
            var statusEndDateValue = form.getAttribute("ts_statusenddate").getValue();
            if (statusStartDateValue != null) {
                if (Date.parse(statusStartDateValue.toDateString()) <= Date.parse(new Date(Date.now()).toDateString())) {
                    form.getAttribute("ts_operationalstatus").setValue(717750001 /* NonOperational */);
                }
            }
            if (statusEndDateValue != null) {
                if (Date.parse(statusEndDateValue.toDateString()) <= Date.parse(new Date(Date.now()).toDateString())) {
                    form.getAttribute("ts_operationalstatus").setValue(717750000 /* Operational */);
                }
            }
        }
        Operation.onSave = onSave;
        function siteOnChange(eContext) {
            var form = eContext.getFormContext();
            var siteAttribute = form.getAttribute("ts_site");
            if (siteAttribute != null) {
                var siteAttributeValue = siteAttribute.getValue();
                // Enable subsite field with appropriate filtered view if site selected
                if (siteAttributeValue != null && siteAttributeValue != undefined) {
                    form.getControl('ts_subsite').setDisabled(false);
                    var viewId = '{6A59549F-F162-5128-4711-79BC929540C3}';
                    var entityName = "msdyn_functionallocation";
                    var viewDisplayName = "Filtered Sites";
                    var activityTypeFetchXml = '<fetch no-lock="false"><entity name="msdyn_functionallocation"><attribute name="statecode"/><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><filter><condition attribute="msdyn_functionallocationid" operator="under" value="' + siteAttributeValue[0].id + '"/></filter><order attribute="msdyn_name" descending="false"/></entity></fetch>';
                    var layoutXml = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="200" /></row></grid>';
                    form.getControl("ts_subsite").addCustomView(viewId, entityName, viewDisplayName, activityTypeFetchXml, layoutXml, true);
                }
                else {
                    form.getControl('ts_subsite').setDisabled(true);
                }
            }
        }
        Operation.siteOnChange = siteOnChange;
        function statusStartDateOnChange(eContext) {
            var form = eContext.getFormContext();
            if (form.getAttribute("ts_statusstartdate").getValue() != null) {
                form.getControl("ts_statusenddate").setDisabled(false);
                form.getControl("ts_description").setDisabled(false);
                form.getAttribute("ts_description").setRequiredLevel("required");
            }
            else {
                form.getAttribute("ts_description").setRequiredLevel("none");
                form.getAttribute("ts_description").setValue(null);
                form.getAttribute("ts_statusenddate").setValue(null);
                form.getControl("ts_statusenddate").setDisabled(true);
                form.getControl("ts_description").setDisabled(true);
            }
        }
        Operation.statusStartDateOnChange = statusStartDateOnChange;
        function ppeRequiredOnChange(eContext) {
            var form = eContext.getFormContext();
            var ppeRequired = form.getAttribute("ts_pperequired").getValue();
            if (ppeRequired) {
                form.getControl("ts_ppecategories").setVisible(true);
                form.getControl("ts_specializedpperequired").setVisible(true);
            }
            else {
                form.getControl("ts_ppecategories").setVisible(false);
                form.getControl("ts_specializedpperequired").setVisible(false);
                form.getControl("ts_typesofspecializedppe").setVisible(false);
                form.getAttribute("ts_ppecategories").setValue(null);
                form.getAttribute("ts_specializedpperequired").setValue(null);
                form.getAttribute("ts_typesofspecializedppe").setValue(null);
            }
        }
        Operation.ppeRequiredOnChange = ppeRequiredOnChange;
        function specializedPPERequiredOnChange(eContext) {
            var form = eContext.getFormContext();
            var specializedPPERequired = form.getAttribute("ts_specializedpperequired").getValue();
            if (specializedPPERequired) {
                form.getControl("ts_typesofspecializedppe").setVisible(true);
            }
            else {
                form.getControl("ts_typesofspecializedppe").setVisible(false);
                form.getAttribute("ts_typesofspecializedppe").setValue(null);
            }
        }
        Operation.specializedPPERequiredOnChange = specializedPPERequiredOnChange;
        function ppeGuideOnChange(eContext) {
            var form = eContext.getFormContext();
            var NCATFactorGuide = form.getAttribute("ts_ppeguide").getValue();
            var webResourcePPEGuide = form.getControl("WebResource_PPEGuide");
            if (NCATFactorGuide)
                webResourcePPEGuide.setVisible(true);
            else
                webResourcePPEGuide.setVisible(false);
        }
        Operation.ppeGuideOnChange = ppeGuideOnChange;
        function VSIConductedOnChange(eContext) {
            var form = eContext.getFormContext();
            var VSIConducted = form.getAttribute("ts_visualsecurityinspection").getValue();
            var VSIDetails = form.getControl("ts_visualsecurityinspectiondetails");
            if (VSIConducted == 717750001 /* Yes */) {
                VSIDetails.setVisible(true);
            }
            else {
                VSIDetails.setVisible(false);
                form.getAttribute("ts_visualsecurityinspectiondetails").setValue(null);
            }
        }
        Operation.VSIConductedOnChange = VSIConductedOnChange;
        function SIConductedOnChange(eContext) {
            var form = eContext.getFormContext();
            var SIConducted = form.getAttribute("ts_issecurityinspectionsite").getValue();
            var SIDetails = form.getControl("ts_securityinspectiondetails");
            if (SIConducted == 717750001 /* Yes */) {
                SIDetails.setVisible(true);
            }
            else {
                SIDetails.setVisible(false);
                form.getAttribute("ts_securityinspectiondetails").setValue(null);
            }
        }
        Operation.SIConductedOnChange = SIConductedOnChange;
    })(Operation = ROM.Operation || (ROM.Operation = {}));
})(ROM || (ROM = {}));
