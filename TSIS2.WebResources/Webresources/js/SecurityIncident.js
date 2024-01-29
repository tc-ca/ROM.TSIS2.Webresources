"use strict";
var ROM;
(function (ROM) {
    var SecurityIncident;
    (function (SecurityIncident) {
        var isROM20Form = false;
        function onLoad(eContext) {
            var formContext = eContext.getFormContext();
            var delaysToOperations = formContext.getAttribute("ts_delaystooperation");
            var formItem = formContext.ui.formSelector.getCurrentItem().getId();
            isROM20Form = formItem.toLowerCase() == "66fddf7a-2b5e-4239-8059-cda85838b5b2";
            if (delaysToOperations.getValue() == 717750001 /* Unknown */ || delaysToOperations.getValue() == null) {
                formContext.getControl("ts_delayduration").setVisible(false);
            }
            var modeAttribute = formContext.getAttribute("ts_mode");
            var modeAttributeValue = modeAttribute.getValue();
            if (formContext.ui.getFormType() == 2 || formContext.ui.getFormType() == 3) {
                StatusOfRailwayOwnerOnChange(eContext);
                ShowHideFieldsOnMode(eContext, modeAttributeValue, true);
                securityIncidentTypeOnChange(eContext);
                if (formContext.getAttribute("ts_mode").getValue() != null) {
                    setSiteFilteredView(formContext, modeAttributeValue != null ? modeAttributeValue : null);
                }
            }
            if (modeAttributeValue == 717750002 /* AviationSecurity */) {
                setDefaultView(formContext);
                formContext.getControl("ts_overtime").setVisible(true);
            }
            // only show the Security Incident Details if we actually have an attachment
            var incidentDetailsAttachment = formContext.getAttribute("ts_incidentdetailsattachment").getValue();
            if (incidentDetailsAttachment == null || incidentDetailsAttachment == undefined) {
                formContext.ui.tabs.get("{99b37896-4f52-4179-8296-3cc0e6722411}").sections.get("IncidentDetails").setVisible(false);
            }
            unlockRecordLogFieldsIfUserIsSystemAdmin(formContext);
            adjustIncidentDateTime(formContext);
            lockAllSummaryFieldsWhenStatusClosed(eContext);
            restrictStatusFieldWhenStatusClosed(eContext);
        }
        SecurityIncident.onLoad = onLoad;
        function adjustIncidentDateTime(formContext) {
            if (formContext.ui.getFormType() != 1) {
                if (formContext.getAttribute("ts_incidentdatetime").getValue() != null && formContext.getAttribute("ts_incidentdatetimeadjust").getValue() != null) {
                    formContext.getControl("ts_incidentdatetime").setVisible(false);
                    formContext.getControl("ts_incidentdatetimeadjust").setVisible(true);
                }
                if (formContext.getAttribute("ts_reporteddatetime").getValue() != null && formContext.getAttribute("ts_reporteddatetimeadjust").getValue() != null) {
                    formContext.getControl("ts_reporteddatetime").setVisible(false);
                    formContext.getControl("ts_reporteddatetimeadjust").setVisible(true);
                }
            }
            /*
            var incidentDatetime = formContext.getAttribute("ts_incidentdatetime").getValue();
            var reportedDatetime = formContext.getAttribute("ts_reporteddatetime").getValue();
            var timezone = formContext.getAttribute("ts_timezone").getValue();
            
            if (timezone != null) {
                var timeZoneHoursAdjust = 0;
                if (timezone == ts_timezone.AtlanticTime) {
                    timeZoneHoursAdjust = -4;
                }
                else if (timezone == ts_timezone.CentralTime) {
                    timeZoneHoursAdjust = -6;
                }
                else if (timezone == ts_timezone.EasternTime) {
                    timeZoneHoursAdjust = -5;
                }
                else if (timezone == ts_timezone.MountainTime) {
                    timeZoneHoursAdjust = -7;
                }
                else if (timezone == ts_timezone.PacificTime) {
                    timeZoneHoursAdjust = -8;
                }
    
                if (incidentDatetime != null) {
                    var timezoneOffset = incidentDatetime.getTimezoneOffset();
                    var stTimezoneOffset = new Date(incidentDatetime.getFullYear(), 0, 1).getTimezoneOffset();
                    var isDayLightSaving = stTimezoneOffset > timezoneOffset;
                    if (isDayLightSaving) {
                        incidentDatetime.setHours(incidentDatetime.getHours() + timeZoneHoursAdjust + timezoneOffset / 60 + 1);
                    }
                    else {
                        incidentDatetime.setHours(incidentDatetime.getHours() + timeZoneHoursAdjust + timezoneOffset / 60);
                    }
                    
                    formContext.getAttribute("ts_incidentdatetimeadjust").setValue(incidentDatetime);
                }
    
                if (reportedDatetime != null) {
                    var timezoneOffset = reportedDatetime.getTimezoneOffset();
                    var stTimezoneOffset = new Date(reportedDatetime.getFullYear(), 0, 1).getTimezoneOffset();
                    var isDayLightSaving = stTimezoneOffset > timezoneOffset;
                    if (isDayLightSaving) {
                        reportedDatetime.setHours(reportedDatetime.getHours() + timeZoneHoursAdjust + timezoneOffset / 60 + 1);
                    }
                    else {
                        reportedDatetime.setHours(reportedDatetime.getHours() + timeZoneHoursAdjust + timezoneOffset / 60);
                    }
    
                    formContext.getAttribute("ts_reporteddatetimeadjust").setValue(reportedDatetime);
                }
            }
            */
        }
        function TimeZoneOnChange(eContext) {
            var formContext = eContext.getFormContext();
            formContext.getControl("ts_incidentdatetime").setVisible(true);
            formContext.getControl("ts_incidentdatetimeadjust").setVisible(false);
            formContext.getControl("ts_reporteddatetime").setVisible(true);
            formContext.getControl("ts_reporteddatetimeadjust").setVisible(false);
        }
        SecurityIncident.TimeZoneOnChange = TimeZoneOnChange;
        function StatusOfRailwayOwnerOnChange(eContext) {
            var form = eContext.getFormContext();
            var arrests = form.getAttribute("ts_arrests");
            var statusOfRailwayOwner = form.getAttribute("ts_statusofrailwayowner").getValue();
            if (statusOfRailwayOwner == null || (statusOfRailwayOwner != null && statusOfRailwayOwner == 717750000 /* Known */))
                form.getControl("ts_owneroftherailwaylinetrack").setVisible(true);
            else
                form.getControl("ts_owneroftherailwaylinetrack").setVisible(false);
            if (form.getAttribute("ts_delaystooperation").getValue() == 717750000 /* Known */) {
                form.getControl("ts_delayduration").setVisible(true);
            }
            if (arrests.getValue() == 717750001 /* Unknown */ || arrests.getValue() == 741130000 /* _0 */ || arrests.getValue() == null) {
                form.getControl("ts_arrestsdetails").setVisible(false);
            }
            else {
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
            if (arrests.getValue() == 717750001 /* Unknown */ || arrests.getValue() == 741130000 /* _0 */ || arrests.getValue() == null) {
                form.getControl("ts_arrestsdetails").setVisible(false);
            }
            else {
                form.getControl("ts_arrestsdetails").setVisible(true);
            }
        }
        SecurityIncident.arrestsOnChange = arrestsOnChange;
        function modeOnChange(eContext) {
            var form = eContext.getFormContext();
            var modeAttribute = form.getAttribute("ts_mode");
            var modeAttributeValue = modeAttribute.getValue();
            ShowHideFieldsOnMode(eContext, modeAttributeValue, false);
            form.getAttribute("ts_securityincidenttype").setValue(null);
            ShowHideFieldsOnMode(eContext, modeAttributeValue, false);
            setSiteFilteredView(form, modeAttributeValue != null ? modeAttributeValue : null);
        }
        SecurityIncident.modeOnChange = modeOnChange;
        function securityIncidentTypeOnChange(eContext) {
            var form = eContext.getFormContext();
            var securityincidentTypeValue = form.getAttribute("ts_securityincidenttype").getValue();
            //Tampering
            if (securityincidentTypeValue != null && securityincidentTypeValue != undefined && securityincidentTypeValue[0].id.toLowerCase() == "{d5ff32e6-4a6b-ed11-81ae-0022483c536f}") {
                form.getControl("ts_tamperingsubcategory").setVisible(true);
            }
            else {
                form.getControl("ts_tamperingsubcategory").setVisible(false);
            }
        }
        SecurityIncident.securityIncidentTypeOnChange = securityIncidentTypeOnChange;
        function siteOnChange(eContext) {
            var form = eContext.getFormContext();
            var siteValue = form.getAttribute("ts_site").getValue();
            if (siteValue != null) {
                Xrm.WebApi.retrieveRecord("msdyn_functionallocation", siteValue[0].id, "?$select=_ts_sitetype_value ").then(function success(result) {
                    if (result["_ts_sitetype_value"] != null) {
                        var lookup = new Array();
                        lookup[0] = new Object();
                        lookup[0].id = result["_ts_sitetype_value"];
                        lookup[0].name = result["_ts_sitetype_value@OData.Community.Display.V1.FormattedValue"];
                        lookup[0].entityType = result["_ts_sitetype_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                        form.getAttribute("ts_sitetype").setValue(lookup);
                    }
                }, function error(error) {
                    Xrm.Navigation.openAlertDialog({ text: error.message });
                });
            }
            else {
                form.getAttribute("ts_sitetype").setValue(null);
            }
        }
        SecurityIncident.siteOnChange = siteOnChange;
        function subSiteOnChange(eContext) {
            var form = eContext.getFormContext();
            var subSiteValue = form.getAttribute("ts_subsite").getValue();
            if (subSiteValue != null) {
                Xrm.WebApi.retrieveRecord("msdyn_functionallocation", subSiteValue[0].id, "?$select=_ts_sitetype_value ").then(function success(result) {
                    if (result["_ts_sitetype_value"] != null) {
                        var lookup = new Array();
                        lookup[0] = new Object();
                        lookup[0].id = result["_ts_sitetype_value"];
                        lookup[0].name = result["_ts_sitetype_value@OData.Community.Display.V1.FormattedValue"];
                        lookup[0].entityType = result["_ts_sitetype_value@Microsoft.Dynamics.CRM.lookuplogicalname"];
                        form.getAttribute("ts_subsitetype").setValue(lookup);
                    }
                }, function error(error) {
                    Xrm.Navigation.openAlertDialog({ text: error.message });
                });
            }
            else {
                form.getAttribute("ts_subsitetype").setValue(null);
            }
        }
        SecurityIncident.subSiteOnChange = subSiteOnChange;
        function setSiteFilteredView(form, mode) {
            // Custom view
            var modeCondition = mode != null ? ('<condition attribute="ts_mode" operator="contain-values" value=""><value>' + mode + '</value></condition>') : null;
            var viewId = '{6E57251F-F695-4076-9498-49AB892154B2}';
            var entityName = "msdyn_functionallocation";
            var viewDisplayName = "Filtered Sites";
            var fetchXml = '<fetch version="1.0" mapping="logical" distinct="true" returntotalrecordcount="true" page="1" count="25" no-lock="false"><entity name="msdyn_functionallocation"><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><attribute name="ts_mode"/><order attribute="msdyn_name" descending="false"/><filter type="and"><condition attribute="statecode" operator="eq" value="0"/><condition attribute="ts_sitestatus" operator="ne" value="717750001"/>' + modeCondition + '</filter></entity></fetch>';
            var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="200" /></row></grid>';
            form.getControl("ts_site").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
            form.getControl("ts_subsite").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
        }
        function ShowHideFieldsOnMode(eContext, mode, isOnLoad) {
            var form = eContext.getFormContext();
            var lang = Xrm.Utility.getGlobalContext().userSettings.languageId;
            if (mode == 717750002 /* AviationSecurity */) {
                form.getControl("ts_securityincidenttype").setDefaultView("f88f3bcb-6a76-ed11-81ac-0022483d5ee0");
                form.getControl("ts_targetelement").setVisible(false);
                form.getControl("ts_statusofrailwayowner").setVisible(false);
                form.getControl("ts_owneroftherailwaylinetrack").setVisible(false);
                form.getControl("ts_locationtype").setVisible(false);
                form.getControl("new_location").setVisible(false);
                form.getControl("ts_subdivision").setVisible(false);
                form.getControl("ts_milemarker").setVisible(false);
                form.getControl("ts_markerpost").setVisible(false);
                form.getControl("ts_locationcontext").setVisible(false);
                form.getControl("ts_yardorstationname").setVisible(false);
                form.getControl("ts_publicorprivatecrossing").setVisible(false);
                form.getControl("ts_ruralorurban").setVisible(false);
                if (!isROM20Form) {
                    var tab_time_tracking = form.ui.tabs.get("tab_time_tracking");
                    tab_time_tracking.setVisible(true);
                }
                form.getControl("ts_sitetype").setVisible(true);
                form.getControl("ts_subsite").setVisible(true);
                form.getControl("ts_subsitetype").setVisible(true);
                form.getControl("ts_inflight").setVisible(true);
                form.getControl("ts_estimatedarrivaltime").setVisible(true);
                form.getControl("ts_policeresponse").setVisible(true);
                form.getControl("ts_contact").setVisible(true);
                form.getControl("ts_email").setVisible(true);
                form.getControl("ts_phone").setVisible(true);
                form.getControl("ts_additionaldetails").setVisible(true);
                form.getControl("ts_organization").setVisible(true);
                form.getControl("ts_bridgeclosure").setVisible(false);
                form.getControl("ts_damagestoibtproperty").setVisible(false);
                form.getControl("ts_arrests").setVisible(false);
                form.getControl("ts_arrestsdetails").setVisible(false);
                form.getControl("ts_delaystooperation").setVisible(false);
                form.getControl("ts_injuries").setVisible(false);
                if (!isOnLoad) {
                    form.getAttribute("ts_inflight").setValue(false);
                    form.getAttribute("ts_policeresponse").setValue(false);
                }
                var inFlightAttributeValue = form.getAttribute("ts_inflight").getValue();
                if (inFlightAttributeValue) {
                    form.getControl("ts_origin").setVisible(true);
                    form.getControl("ts_destination").setVisible(true);
                    form.getControl("ts_diversionaerodrome").setVisible(true);
                    form.getControl("ts_aircarrier").setVisible(true);
                    form.getControl("ts_flightnumber").setVisible(true);
                }
                else {
                    form.getControl("ts_origin").setVisible(false);
                    form.getControl("ts_destination").setVisible(false);
                    form.getControl("ts_diversionaerodrome").setVisible(false);
                    form.getControl("ts_aircarrier").setVisible(false);
                    form.getControl("ts_flightnumber").setVisible(false);
                }
                var policeResponseAttributeValue = form.getAttribute("ts_policeresponse").getValue();
                if (policeResponseAttributeValue) {
                    form.getControl("ts_arrests").setVisible(true);
                }
                else {
                    form.getControl("ts_arrests").setVisible(false);
                }
                if (lang == 1036) {
                    form.getControl("ts_tcomscategoryenglish").setVisible(false);
                    form.getControl("ts_tcomscategoryfrench").setVisible(true);
                    form.getControl("ts_tcomssubcategoryenglish").setVisible(false);
                    form.getControl("ts_tcomssubcategoryfrench").setVisible(true);
                    form.getControl("ts_tcomsinteractionenglish").setVisible(false);
                    form.getControl("ts_tcomsinteractionfrench").setVisible(true);
                    form.getControl("ts_furtheractionrequired").setVisible(true);
                    form.getControl("ts_tcomsseverityenglish").setVisible(false);
                    form.getControl("ts_tcomsseverityfrench").setVisible(true);
                    form.getControl("ts_tcomseventname").setVisible(true);
                    form.getControl("ts_tcomseventfollowupenglish").setVisible(false);
                    form.getControl("ts_tcomseventfollowupfrench").setVisible(true);
                    form.getControl("ts_statusrationale").setVisible(true);
                }
                else {
                    form.getControl("ts_tcomscategoryenglish").setVisible(true);
                    form.getControl("ts_tcomscategoryfrench").setVisible(false);
                    form.getControl("ts_tcomssubcategoryenglish").setVisible(true);
                    form.getControl("ts_tcomssubcategoryfrench").setVisible(false);
                    form.getControl("ts_tcomsinteractionenglish").setVisible(true);
                    form.getControl("ts_tcomsinteractionfrench").setVisible(false);
                    form.getControl("ts_furtheractionrequired").setVisible(true);
                    form.getControl("ts_tcomsseverityenglish").setVisible(true);
                    form.getControl("ts_tcomsseverityfrench").setVisible(false);
                    form.getControl("ts_tcomseventname").setVisible(true);
                    form.getControl("ts_tcomseventfollowupenglish").setVisible(true);
                    form.getControl("ts_tcomseventfollowupfrench").setVisible(false);
                    form.getControl("ts_statusrationale").setVisible(true);
                }
            }
            else {
                form.getControl("ts_securityincidenttype").setDefaultView("b8d91bb4-6776-ed11-81ac-0022483d5ee0");
                form.getControl("ts_targetelement").setVisible(true);
                form.getControl("ts_locationtype").setVisible(true);
                form.getControl("new_location").setVisible(true);
                form.getControl("ts_subdivision").setVisible(true);
                form.getControl("ts_locationcontext").setVisible(true);
                form.getControl("ts_publicorprivatecrossing").setVisible(true);
                form.getControl("ts_ruralorurban").setVisible(true);
                form.getControl("ts_arrests").setVisible(true);
                form.getControl("ts_sitetype").setVisible(false);
                form.getControl("ts_subsite").setVisible(false);
                form.getControl("ts_subsitetype").setVisible(false);
                form.getControl("ts_inflight").setVisible(false);
                form.getControl("ts_estimatedarrivaltime").setVisible(false);
                form.getControl("ts_policeresponse").setVisible(false);
                form.getControl("ts_contact").setVisible(false);
                form.getControl("ts_email").setVisible(false);
                form.getControl("ts_phone").setVisible(false);
                form.getControl("ts_additionaldetails").setVisible(false);
                form.getControl("ts_origin").setVisible(false);
                form.getControl("ts_destination").setVisible(false);
                form.getControl("ts_diversionaerodrome").setVisible(false);
                form.getControl("ts_aircarrier").setVisible(false);
                form.getControl("ts_flightnumber").setVisible(false);
                form.getControl("ts_reportingcompany_name").setVisible(false);
                form.getControl("ts_stakeholder_name").setVisible(false);
                form.getControl("ts_organization").setVisible(false);
                form.getControl("ts_delaystooperation").setVisible(true);
                form.getControl("ts_injuries").setVisible(true);
                if (mode == 717750000 /* RailSecurity */) {
                    form.getControl("ts_statusofrailwayowner").setVisible(true);
                    form.getControl("ts_owneroftherailwaylinetrack").setVisible(true);
                    form.getControl("ts_milemarker").setVisible(true);
                    form.getControl("ts_markerpost").setVisible(true);
                    form.getControl("ts_yardorstationname").setVisible(true);
                    if (!isROM20Form) {
                        var tab_time_tracking = form.ui.tabs.get("tab_time_tracking");
                        tab_time_tracking.setVisible(false);
                    }
                    form.getControl("ts_bridgeclosure").setVisible(false);
                    form.getControl("ts_damagestoibtproperty").setVisible(false);
                    if (!isOnLoad) {
                        form.getAttribute("ts_site").setValue(null);
                        form.getAttribute("ts_sitetype").setValue(null);
                    }
                }
                if (mode == 717750001 /* InternationalBridgesandTunnels */) {
                    var lookup = new Array();
                    lookup[0] = new Object();
                    lookup[0].id = "{051bb19d-f065-ed11-9569-0022483c0cc5}";
                    lookup[0].name = (lang == 1036) ? "PTI" : "IBT";
                    lookup[0].entityType = "ts_targetelement";
                    form.getAttribute("ts_targetelement").setValue(lookup);
                    form.getControl("ts_targetelement").setDisabled(true);
                    form.getControl("ts_statusofrailwayowner").setVisible(false);
                    form.getControl("ts_owneroftherailwaylinetrack").setVisible(false);
                    form.getControl("ts_milemarker").setVisible(false);
                    form.getControl("ts_markerpost").setVisible(false);
                    form.getControl("ts_yardorstationname").setVisible(false);
                    if (!isROM20Form) {
                        var tab_time_tracking = form.ui.tabs.get("tab_time_tracking");
                        tab_time_tracking.setVisible(false);
                    }
                    form.getControl("ts_bridgeclosure").setVisible(true);
                    form.getControl("ts_damagestoibtproperty").setVisible(true);
                    form.getControl("ts_ruralorurban").setVisible(false);
                    form.getControl("ts_publicorprivatecrossing").setVisible(false);
                }
                else {
                    form.getControl("ts_targetelement").setDisabled(false);
                }
                form.getControl("ts_tcomscategoryenglish").setVisible(false);
                form.getControl("ts_tcomscategoryfrench").setVisible(false);
                form.getControl("ts_tcomssubcategoryenglish").setVisible(false);
                form.getControl("ts_tcomssubcategoryfrench").setVisible(false);
                form.getControl("ts_tcomsinteractionenglish").setVisible(false);
                form.getControl("ts_tcomsinteractionfrench").setVisible(false);
                form.getControl("ts_furtheractionrequired").setVisible(false);
                form.getControl("ts_tcomsseverityenglish").setVisible(false);
                form.getControl("ts_tcomsseverityfrench").setVisible(false);
                form.getControl("ts_tcomseventname").setVisible(false);
                form.getControl("ts_tcomseventfollowupenglish").setVisible(false);
                form.getControl("ts_tcomseventfollowupfrench").setVisible(false);
                form.getControl("ts_statusrationale").setVisible(false);
            }
            arrestsOnChange(eContext);
        }
        function inFlightOnChange(eContext) {
            var form = eContext.getFormContext();
            var inFlightAttributeValue = form.getAttribute("ts_inflight").getValue();
            if (inFlightAttributeValue) {
                form.getControl("ts_origin").setVisible(true);
                form.getControl("ts_destination").setVisible(true);
                form.getControl("ts_diversionaerodrome").setVisible(true);
                form.getControl("ts_aircarrier").setVisible(true);
                form.getControl("ts_flightnumber").setVisible(true);
                form.getAttribute("ts_origin").setValue(null);
                form.getAttribute("ts_destination").setValue(null);
                form.getAttribute("ts_diversionaerodrome").setValue(null);
                form.getAttribute("ts_aircarrier").setValue(null);
                form.getAttribute("ts_flightnumber").setValue(null);
            }
            else {
                form.getControl("ts_origin").setVisible(false);
                form.getControl("ts_destination").setVisible(false);
                form.getControl("ts_diversionaerodrome").setVisible(false);
                form.getControl("ts_aircarrier").setVisible(false);
                form.getControl("ts_flightnumber").setVisible(false);
            }
        }
        SecurityIncident.inFlightOnChange = inFlightOnChange;
        function policeResponseOnChange(eContext) {
            var form = eContext.getFormContext();
            var policeResponseAttributeValue = form.getAttribute("ts_policeresponse").getValue();
            if (policeResponseAttributeValue) {
                form.getControl("ts_arrests").setVisible(true);
                form.getAttribute("ts_arrests").setValue(null);
            }
            else {
                form.getControl("ts_arrests").setVisible(false);
            }
        }
        SecurityIncident.policeResponseOnChange = policeResponseOnChange;
        function reportingCompanyOnChange(eContext) {
            var form = eContext.getFormContext();
            var reportingCompanyAttributeValue = form.getAttribute("ts_reportingcompany").getValue();
            var mode = form.getAttribute("ts_mode").getValue();
            if (mode == 717750002 /* AviationSecurity */ && reportingCompanyAttributeValue != null && reportingCompanyAttributeValue[0].id.toLowerCase() == '{26b2346f-ba69-ed11-81ac-000d3af4c525}') {
                form.getControl("ts_reportingcompany_name").setVisible(true);
            }
            else {
                form.getControl("ts_reportingcompany_name").setVisible(false);
            }
        }
        SecurityIncident.reportingCompanyOnChange = reportingCompanyOnChange;
        function stakeholderCompanyOnChange(eContext) {
            var form = eContext.getFormContext();
            var stakeholderAttributeValue = form.getAttribute("ts_stakeholder").getValue();
            var mode = form.getAttribute("ts_mode").getValue();
            if (mode == 717750002 /* AviationSecurity */ && stakeholderAttributeValue != null && stakeholderAttributeValue[0].id.toLowerCase() == '{26b2346f-ba69-ed11-81ac-000d3af4c525}') {
                form.getControl("ts_stakeholder_name").setVisible(true);
            }
            else {
                form.getControl("ts_stakeholder_name").setVisible(false);
            }
        }
        SecurityIncident.stakeholderCompanyOnChange = stakeholderCompanyOnChange;
        function restrictStatusFieldWhenStatusClosed(eContext) {
            var formContext = eContext.getFormContext();
            var recordstatus = formContext.getAttribute("ts_recordstatus").getValue();
            if (recordstatus == 741130002 /* Closed */) {
                formContext.getControl("header_ts_recordstatus").removeOption(741130000 /* New */);
                formContext.getControl("header_ts_recordstatus").removeOption(447390001 /* Onhold */);
                formContext.getControl("header_ts_recordstatus").removeOption(741130003 /* Inactive */);
                if (!userHasRole("System Administrator|ROM - Business Admin|ROM - Manager")) {
                    formContext.getControl("header_ts_recordstatus").removeOption(741130001 /* InProgress */);
                }
            }
        }
        SecurityIncident.restrictStatusFieldWhenStatusClosed = restrictStatusFieldWhenStatusClosed;
        function lockAllSummaryFieldsWhenStatusClosed(eContext) {
            var formContext = eContext.getFormContext();
            var recordstatus = formContext.getAttribute("ts_recordstatus").getValue();
            if (recordstatus == 741130002 /* Closed */) {
                setAllFieldsDisabledInTab(formContext, "{99b37896-4f52-4179-8296-3cc0e6722411}");
            }
        }
        SecurityIncident.lockAllSummaryFieldsWhenStatusClosed = lockAllSummaryFieldsWhenStatusClosed;
        function setAllFieldsDisabledInTab(formContext, tabname) {
            var tab = formContext.ui.tabs.get(tabname);
            if (tab != null) {
                var tabSections = tab.sections.get();
                for (var i in tabSections) {
                    var secName = tabSections[i].getName();
                    setAllFieldsDisabledInSection(formContext, secName);
                }
            }
        }
        function setAllFieldsDisabledInSection(formContext, sectionName) {
            var ctrlName = formContext.ui.controls.get();
            for (var i in ctrlName) {
                var ctrl = ctrlName[i];
                if (ctrl.getParent() != null) {
                    var ctrlSection = ctrl.getParent().getName();
                    if (ctrlSection == sectionName) {
                        ctrl.setDisabled(true);
                    }
                }
            }
        }
        function setDefaultView(form) {
            form.getControl("ts_aircarrier").setDefaultView("d06d7b47-80bf-ed11-83ff-0022483c5061");
            form.getControl("ts_origin").setDefaultView("3507a249-81bf-ed11-83ff-0022483d7716");
            form.getControl("ts_destination").setDefaultView("3507a249-81bf-ed11-83ff-0022483d7716");
            form.getControl("ts_diversionaerodrome").setDefaultView("3507a249-81bf-ed11-83ff-0022483d7716");
        }
        function userHasRole(rolesName) {
            var userRoles = Xrm.Utility.getGlobalContext().userSettings.roles;
            var hasRole = false;
            var roles = rolesName.split("|");
            roles.forEach(function (roleItem) {
                userRoles.forEach(function (userRoleItem) {
                    if (userRoleItem.name.toLowerCase() == roleItem.toLowerCase())
                        hasRole = true;
                });
            });
            return hasRole;
        }
        SecurityIncident.userHasRole = userHasRole;
        function unlockRecordLogFieldsIfUserIsSystemAdmin(formContext) {
            if (userHasRole("System Administrator")) {
                formContext.getControl("ts_closedon").setDisabled(false);
                formContext.getControl("ts_closedby").setDisabled(false);
            }
        }
    })(SecurityIncident = ROM.SecurityIncident || (ROM.SecurityIncident = {}));
})(ROM || (ROM = {}));
