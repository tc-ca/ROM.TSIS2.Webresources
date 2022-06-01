"use strict";
var ROM;
(function (ROM) {
    var Operation;
    (function (Operation) {
        var userBusinessUnitName;
        //Stakeholder owning business unit used to filter other fields
        var owningBusinessUnit;
        //Condition to filter fields based on current user BU
        var businessUnitCondition;
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
                userBusinessUnitName = result.entities[0].name;
                businessUnitCondition = '<condition attribute="businessunitid" operator="eq" value="' + result.entities[0].businessunitid + '" />';
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
            //If user is not an admin, filter stakeholder on his BU
            if (!userBusinessUnitName.startsWith("Transport")) {
                setStakeholderFilteredView(form);
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
        function setStakeholderFilteredView(form) {
            form.getControl('ovs_operationtypeid').setDisabled(false);
            var viewId = '{3BC6D613-1CBD-48DC-86C3-37830D34EF7D}';
            var entityName = "ovs_operationtype";
            var viewDisplayName = "Filtered Operation Types";
            var activityTypeFetchXml = '<fetch version="1.0" mapping="logical" returntotalrecordcount="true" page="1" count="25" no-lock="false"><entity name="ovs_operationtype"><attribute name="ovs_operationtypeid"/><attribute name="ovs_name"/><attribute name="ownerid"/><filter type="and"><condition attribute="statecode" operator="eq" value="0"/><condition attribute="owningbusinessunit" operator="eq" value="' + owningBusinessUnit + '" uitype="businessunit"/>' + (!userBusinessUnitName.startsWith("Transport") ? businessUnitCondition : "") + '</filter><order attribute="ovs_name" descending="false"/></entity></fetch>';
            var layoutXml = '<grid name="resultset" object="10010" jump="ovs_name" select="1" icon="1" preview="1"><row name="result" id="ovs_operationtypeid"><cell name="ovs_name" width="200" /></row></grid>';
            form.getControl("ovs_operationtypeid").addCustomView(viewId, entityName, viewDisplayName, activityTypeFetchXml, layoutXml, true);
        }
        function stakeholderOnChange(eContext) {
            var form = eContext.getFormContext();
            var stakeholder = form.getAttribute("ts_stakeholder");
            var stakeholderValue = stakeholder.getValue();
            if (stakeholderValue != null) {
                Xrm.WebApi.retrieveRecord('account', stakeholderValue[0].id, "?$select=_owningbusinessunit_value").then(function success(result) {
                    owningBusinessUnit = result._owningbusinessunit_value;
                    // Filter Operation Type field with owning business unit
                    setStakeholderFilteredView(form);
                }, function (error) { });
            }
            form.getControl('ovs_operationtypeid').setDisabled(true);
            form.getAttribute("ovs_operationtypeid").setValue();
            form.getControl('ts_site').setDisabled(true);
            form.getAttribute("ts_site").setValue();
            form.getControl('ts_subsite').setDisabled(true);
            form.getAttribute("ts_subsite").setValue();
        }
        Operation.stakeholderOnChange = stakeholderOnChange;
        function operationTypeOnChange(eContext) {
            var form = eContext.getFormContext();
            var operationTypeAttribute = form.getAttribute("ovs_operationtypeid");
            if (operationTypeAttribute != null) {
                var operationTypeAttributeValue = operationTypeAttribute.getValue();
                // Filter Functional Location field with owning business unit
                if (operationTypeAttributeValue != null && operationTypeAttributeValue != undefined) {
                    form.getControl('ts_site').setDisabled(false);
                    var viewId = '{26A950A2-BD89-4B6D-AB80-5074DF8AD580}';
                    var entityName = "msdyn_functionallocation";
                    var viewDisplayName = "Filtered Sites";
                    var activityTypeFetchXml = '<fetch version="1.0" mapping="logical" distinct="true" returntotalrecordcount="true" page="1" count="25" no-lock="false"><entity name="msdyn_functionallocation"><attribute name="statecode"/><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><order attribute="msdyn_name" descending="false"/><attribute name="msdyn_parentfunctionallocation"/><filter type="and"><condition attribute="statecode" operator="eq" value="0"/><condition attribute="ts_sitestatus" operator="ne" value="717750001"/><condition attribute="owningbusinessunit" operator="eq" value="' + owningBusinessUnit + '"/>' + (!userBusinessUnitName.startsWith("Transport") ? businessUnitCondition : "") + '</filter></entity></fetch>';
                    var layoutXml = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="200" /></row></grid>';
                    form.getControl("ts_site").addCustomView(viewId, entityName, viewDisplayName, activityTypeFetchXml, layoutXml, true);
                }
                else {
                    form.getControl('ts_site').setDisabled(true);
                }
            }
        }
        Operation.operationTypeOnChange = operationTypeOnChange;
        function siteOnChange(eContext) {
            var form = eContext.getFormContext();
            var siteAttribute = form.getAttribute("ts_site");
            if (siteAttribute != null) {
                var siteAttributeValue = siteAttribute.getValue();
                // Enable subsite field with appropriate filtered view if site selected
                if (siteAttributeValue != null && siteAttributeValue != undefined) {
                    form.getControl('ts_subsite').setDisabled(false);
                    var viewId = '{511EDA6B-C300-4B38-8873-363BE39D4E8F}';
                    var entityName = "msdyn_functionallocation";
                    var viewDisplayName = "Filtered Sites";
                    var activityTypeFetchXml = '<fetch no-lock="false"><entity name="msdyn_functionallocation"><attribute name="statecode"/><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><filter><condition attribute="msdyn_functionallocationid" operator="under" value="' + siteAttributeValue[0].id + '"/><condition attribute="ts_sitestatus" operator="ne" value="717750001"/><condition attribute="owningbusinessunit" operator="eq" value="' + owningBusinessUnit + '"/>' + (!userBusinessUnitName.startsWith("Transport") ? businessUnitCondition : "") + '</filter><order attribute="msdyn_name" descending="false"/></entity></fetch>';
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
