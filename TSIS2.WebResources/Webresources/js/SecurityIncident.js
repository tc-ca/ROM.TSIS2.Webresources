﻿"use strict";
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
            if (formContext.ui.getFormType() == 2 || formContext.ui.getFormType() == 3) {
                StatusOfRailwayOwnerOnChange(eContext);
                var modeAttribute = formContext.getAttribute("ts_mode");
                var modeAttributeValue = modeAttribute.getValue();
                ShowHideFieldsOnMode(eContext, modeAttributeValue);
                setSubSiteFilteredView(formContext, false);
                securityIncidentTypeOnChange(eContext);
                if (formContext.getAttribute("ts_mode").getValue() != null) {
                    setSiteFilteredView(formContext, modeAttributeValue != null ? modeAttributeValue : null);
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
            if (form.getAttribute("ts_arrests").getValue() != 717750001 /* Unknown */ && form.getAttribute("ts_arrests").getValue() != 741130000 /* _0 */) {
                form.getControl("ts_arrestsdetails").setVisible(true);
            }
            else {
                form.getControl("ts_arrestsdetails").setVisible(false);
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
            if (arrests.getValue() != 717750001 /* Unknown */ && arrests.getValue() != 741130000 /* _0 */) {
                form.getControl("ts_arrestsdetails").setVisible(true);
            }
            else {
                form.getControl("ts_arrestsdetails").setVisible(false);
            }
        }
        SecurityIncident.arrestsOnChange = arrestsOnChange;
        function modeOnChange(eContext) {
            var form = eContext.getFormContext();
            var modeAttribute = form.getAttribute("ts_mode");
            var modeAttributeValue = modeAttribute.getValue();
            form.getAttribute("ts_securityincidenttype").setValue(null);
            ShowHideFieldsOnMode(eContext, modeAttributeValue);
            setSiteFilteredView(form, modeAttributeValue != null ? modeAttributeValue : null);
        }
        SecurityIncident.modeOnChange = modeOnChange;
        function siteOnChange(eContext) {
            var form = eContext.getFormContext();
            setSubSiteFilteredView(form, true);
        }
        SecurityIncident.siteOnChange = siteOnChange;
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
        function setSubSiteFilteredView(form, resetValue) {
            var siteAttribute = form.getAttribute("ts_site");
            var siteAttributeValue = siteAttribute.getValue();
            if (siteAttributeValue != null && siteAttributeValue != undefined) {
                if (resetValue) {
                    form.getAttribute('ts_subsite').setValue(null);
                }
                var viewId = '{511EDA6B-C300-4B38-8873-363BE39D4E8F}';
                var entityName = "msdyn_functionallocation";
                var viewDisplayName = "Filtered Sites";
                var siteFetchXml = '<fetch no-lock="false"><entity name="msdyn_functionallocation"><attribute name="statecode"/><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><filter><condition attribute="msdyn_functionallocationid" operator="under" value="' + siteAttributeValue[0].id + '"/><condition attribute="ts_sitestatus" operator="ne" value="717750001"/></filter><order attribute="msdyn_name" descending="false"/></entity></fetch>';
                var layoutXml = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="200" /></row></grid>';
                form.getControl("ts_subsite").addCustomView(viewId, entityName, viewDisplayName, siteFetchXml, layoutXml, true);
            }
        }
        function setSiteFilteredView(form, mode) {
            // Custom view
            var modeCondition = mode != null ? ('<condition attribute="ts_mode" operator="contain-values" value=""><value>' + mode + '</value></condition>') : null;
            var viewId = '{6E57251F-F695-4076-9498-49AB892154B2}';
            var entityName = "msdyn_functionallocation";
            var viewDisplayName = "Filtered Sites";
            var fetchXml = '<fetch version="1.0" mapping="logical" distinct="true" returntotalrecordcount="true" page="1" count="25" no-lock="false"><entity name="msdyn_functionallocation"><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><attribute name="ts_mode"/><order attribute="msdyn_name" descending="false"/><filter type="and"><condition attribute="statecode" operator="eq" value="0"/><condition attribute="ts_sitestatus" operator="ne" value="717750001"/>' + modeCondition + '</filter></entity></fetch>';
            var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="200" /></row></grid>';
            form.getControl("ts_site").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
        }
        function ShowHideFieldsOnMode(eContext, mode) {
            var form = eContext.getFormContext();
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
                form.getControl("ts_subsite").setVisible(true);
                form.getControl("ts_inflight").setVisible(true);
                form.getControl("ts_origin").setVisible(true);
                form.getControl("ts_destination").setVisible(true);
                form.getControl("ts_estimatedarrivaltime").setVisible(true);
                form.getControl("ts_policeresponse").setVisible(true);
                form.getControl("ts_bridgeclosure").setVisible(false);
                form.getControl("ts_damagestoibtproperty").setVisible(false);
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
                form.getControl("ts_subsite").setVisible(false);
                form.getControl("ts_inflight").setVisible(false);
                form.getControl("ts_origin").setVisible(false);
                form.getControl("ts_destination").setVisible(false);
                form.getControl("ts_estimatedarrivaltime").setVisible(false);
                form.getControl("ts_policeresponse").setVisible(false);
                if (mode == 717750000 /* RailSecurity */) {
                    form.getControl("ts_statusofrailwayowner").setVisible(true);
                    form.getControl("ts_owneroftherailwaylinetrack").setVisible(true);
                    form.getControl("ts_milemarker").setVisible(true);
                    form.getControl("ts_markerpost").setVisible(true);
                    form.getControl("ts_yardorstationname").setVisible(true);
                    form.getControl("ts_bridgeclosure").setVisible(false);
                    form.getControl("ts_damagestoibtproperty").setVisible(false);
                    form.getAttribute("ts_site").setValue(null);
                }
                if (mode == 717750001 /* InternationalBridgesandTunnels */) {
                    form.getControl("ts_statusofrailwayowner").setVisible(false);
                    form.getControl("ts_owneroftherailwaylinetrack").setVisible(false);
                    form.getControl("ts_milemarker").setVisible(false);
                    form.getControl("ts_markerpost").setVisible(false);
                    form.getControl("ts_yardorstationname").setVisible(false);
                    form.getControl("ts_bridgeclosure").setVisible(true);
                    form.getControl("ts_damagestoibtproperty").setVisible(true);
                    form.getControl("ts_ruralorurban").setVisible(false);
                    form.getControl("ts_publicorprivatecrossing").setVisible(false);
                }
            }
        }
    })(SecurityIncident = ROM.SecurityIncident || (ROM.SecurityIncident = {}));
})(ROM || (ROM = {}));
