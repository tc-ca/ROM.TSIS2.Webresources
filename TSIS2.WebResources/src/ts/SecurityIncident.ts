namespace ROM.SecurityIncident {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_securityincident.Main.Information>eContext.getFormContext();

        const delaysToOperations = formContext.getAttribute("ts_delaystooperation");

        if (delaysToOperations.getValue() == ts_delaystooperation.Unknown || delaysToOperations.getValue() == null) {
            formContext.getControl("ts_delayduration").setVisible(false);
        }

        const modeAttribute = formContext.getAttribute("ts_mode");
        const modeAttributeValue = modeAttribute.getValue();

        if (formContext.ui.getFormType() == 2 || formContext.ui.getFormType() == 3) {
            StatusOfRailwayOwnerOnChange(eContext);

            ShowHideFieldsOnMode(eContext, modeAttributeValue, true);
            setSubSiteFilteredView(formContext, false);
            securityIncidentTypeOnChange(eContext);

            if (formContext.getAttribute("ts_mode").getValue() != null) {
                setSiteFilteredView(formContext, modeAttributeValue != null ? modeAttributeValue : null);
            }
        }
        if (modeAttributeValue == ts_securityincidentmode.AviationSecurity) {
            setDefaultView(formContext);
        }

        // only show the Security Incident Details if we actually have an attachment
        const incidentDetailsAttachment = formContext.getAttribute("ts_incidentdetailsattachment").getValue();
        if (incidentDetailsAttachment == null || incidentDetailsAttachment == undefined) {
            formContext.ui.tabs.get("{99b37896-4f52-4179-8296-3cc0e6722411}").sections.get("IncidentDetails").setVisible(false);
        }
    }
   
    export function StatusOfRailwayOwnerOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_securityincident.Main.Information>eContext.getFormContext();
        const arrests = form.getAttribute("ts_arrests");

        let statusOfRailwayOwner = form.getAttribute("ts_statusofrailwayowner").getValue();
        if (statusOfRailwayOwner == null || (statusOfRailwayOwner != null && statusOfRailwayOwner == ts_statusofrailwayowner.Known))
            form.getControl("ts_owneroftherailwaylinetrack").setVisible(true);
        else
            form.getControl("ts_owneroftherailwaylinetrack").setVisible(false);

        if (form.getAttribute("ts_delaystooperation").getValue() == ts_delaystooperation.Known) {
            form.getControl("ts_delayduration").setVisible(true);
        }

        if (arrests.getValue() == ts_arrestsknownorunknown.Unknown || arrests.getValue() == ts_arrestsknownorunknown._0 || arrests.getValue() == null) {
            form.getControl("ts_arrestsdetails").setVisible(false);
        }
        else {
            form.getControl("ts_arrestsdetails").setVisible(true);
        }
    }

    export function delaysToOperationOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_securityincident.Main.Information>eContext.getFormContext();

        const delaysToOperations = form.getAttribute("ts_delaystooperation");

        if (delaysToOperations.getValue() == ts_delaystooperation.Known) {
            form.getControl("ts_delayduration").setVisible(true);
        }
        else if (delaysToOperations.getValue() == ts_delaystooperation.Unknown || delaysToOperations.getValue() == null) {
            form.getAttribute("ts_delayduration").setValue(null);
            form.getControl("ts_delayduration").setVisible(false);
        }
    }

    export function arrestsOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_securityincident.Main.Information>eContext.getFormContext();

        const arrests = form.getAttribute("ts_arrests");

        if (arrests.getValue() == ts_arrestsknownorunknown.Unknown || arrests.getValue() == ts_arrestsknownorunknown._0 || arrests.getValue() == null) {
            form.getControl("ts_arrestsdetails").setVisible(false);
        }
        else {
            form.getControl("ts_arrestsdetails").setVisible(true);
        }
    }

    export function modeOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_securityincident.Main.Information>eContext.getFormContext();

        const modeAttribute = form.getAttribute("ts_mode");
        const modeAttributeValue = modeAttribute.getValue()

        form.getAttribute("ts_securityincidenttype").setValue(null);

        ShowHideFieldsOnMode(eContext, modeAttributeValue, false);
        setSiteFilteredView(form, modeAttributeValue != null ? modeAttributeValue : null);

    }

    export function siteOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_securityincident.Main.Information>eContext.getFormContext();
        setSubSiteFilteredView(form, true);
    }

    export function securityIncidentTypeOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_securityincident.Main.Information>eContext.getFormContext();
        const securityincidentTypeValue = form.getAttribute("ts_securityincidenttype").getValue();

        //Tampering
        if (securityincidentTypeValue != null && securityincidentTypeValue != undefined && securityincidentTypeValue[0].id.toLowerCase() == "{d5ff32e6-4a6b-ed11-81ae-0022483c536f}") {
            form.getControl("ts_tamperingsubcategory").setVisible(true);
        }
        else {
            form.getControl("ts_tamperingsubcategory").setVisible(false);
        }
    }

    function setSubSiteFilteredView(form: Form.ts_securityincident.Main.Information, resetValue: boolean): void {
        const siteAttribute = form.getAttribute("ts_site");
        const siteAttributeValue = siteAttribute.getValue();

        if (siteAttributeValue != null && siteAttributeValue != undefined) {
            if (resetValue) {
                form.getAttribute('ts_subsite').setValue(null);
            }
            const viewId = '{511EDA6B-C300-4B38-8873-363BE39D4E8F}';
            const entityName = "msdyn_functionallocation";
            const viewDisplayName = "Filtered Sites";
            const siteFetchXml = '<fetch no-lock="false"><entity name="msdyn_functionallocation"><attribute name="statecode"/><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><filter><condition attribute="msdyn_functionallocationid" operator="under" value="' + siteAttributeValue[0].id + '"/><condition attribute="ts_sitestatus" operator="ne" value="717750001"/></filter><order attribute="msdyn_name" descending="false"/></entity></fetch>';
            const layoutXml = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="200" /></row></grid>';
            form.getControl("ts_subsite").addCustomView(viewId, entityName, viewDisplayName, siteFetchXml, layoutXml, true);
        }
    }

    function setSiteFilteredView(form: Form.ts_securityincident.Main.Information, mode): void {
        // Custom view
        const modeCondition = mode != null ? ('<condition attribute="ts_mode" operator="contain-values" value=""><value>' + mode + '</value></condition>') : null;

        const viewId = '{6E57251F-F695-4076-9498-49AB892154B2}';
        const entityName = "msdyn_functionallocation";
        const viewDisplayName = "Filtered Sites";
        const fetchXml = '<fetch version="1.0" mapping="logical" distinct="true" returntotalrecordcount="true" page="1" count="25" no-lock="false"><entity name="msdyn_functionallocation"><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><attribute name="ts_mode"/><order attribute="msdyn_name" descending="false"/><filter type="and"><condition attribute="statecode" operator="eq" value="0"/><condition attribute="ts_sitestatus" operator="ne" value="717750001"/>' + modeCondition + '</filter></entity></fetch>';
        const layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="200" /></row></grid>';
        form.getControl("ts_site").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
    }

    function ShowHideFieldsOnMode(eContext: Xrm.ExecutionContext<any, any>, mode, isOnLoad): void {
        const form = <Form.ts_securityincident.Main.Information>eContext.getFormContext();

        if (mode == ts_securityincidentmode.AviationSecurity) {
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

            if (!isOnLoad) {
                form.getAttribute("ts_inflight").setValue(false);
                form.getAttribute("ts_policeresponse").setValue(false);
            }
            const inFlightAttributeValue = form.getAttribute("ts_inflight").getValue();

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

            const policeResponseAttributeValue = form.getAttribute("ts_policeresponse").getValue();
            if (policeResponseAttributeValue) {
                form.getControl("ts_arrests").setVisible(true);
            }
            else {
                form.getControl("ts_arrests").setVisible(false);
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

            form.getControl("ts_subsite").setVisible(false);
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

            if (mode == ts_securityincidentmode.RailSecurity) {
                form.getControl("ts_statusofrailwayowner").setVisible(true);
                form.getControl("ts_owneroftherailwaylinetrack").setVisible(true);
                form.getControl("ts_milemarker").setVisible(true);
                form.getControl("ts_markerpost").setVisible(true);
                form.getControl("ts_yardorstationname").setVisible(true);

                form.getControl("ts_bridgeclosure").setVisible(false);
                form.getControl("ts_damagestoibtproperty").setVisible(false);

                if (!isOnLoad) {
                    form.getAttribute("ts_site").setValue(null);
                }
            }

            if (mode == ts_securityincidentmode.InternationalBridgesandTunnels) {
                const lang = Xrm.Utility.getGlobalContext().userSettings.languageId;
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

                form.getControl("ts_bridgeclosure").setVisible(true);
                form.getControl("ts_damagestoibtproperty").setVisible(true);
                form.getControl("ts_ruralorurban").setVisible(false);
                form.getControl("ts_publicorprivatecrossing").setVisible(false);
            }
            else {
                form.getControl("ts_targetelement").setDisabled(false);
            }
        }
        arrestsOnChange(eContext);
    }

    export function inFlightOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_securityincident.Main.Information>eContext.getFormContext();
        const inFlightAttributeValue = form.getAttribute("ts_inflight").getValue();

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

    export function policeResponseOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_securityincident.Main.Information>eContext.getFormContext();
        const policeResponseAttributeValue = form.getAttribute("ts_policeresponse").getValue();

        if (policeResponseAttributeValue) {
            form.getControl("ts_arrests").setVisible(true);
            form.getAttribute("ts_arrests").setValue(null);
        }
        else {
            form.getControl("ts_arrests").setVisible(false);
        }
    }

    export function reportingCompanyOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_securityincident.Main.Information>eContext.getFormContext();
        const reportingCompanyAttributeValue = form.getAttribute("ts_reportingcompany").getValue();
        const mode = form.getAttribute("ts_mode").getValue();

        if (mode == ts_securityincidentmode.AviationSecurity && reportingCompanyAttributeValue != null && reportingCompanyAttributeValue[0].id.toLowerCase() == '{26b2346f-ba69-ed11-81ac-000d3af4c525}') {
            form.getControl("ts_reportingcompany_name").setVisible(true);
        }
        else {
            form.getControl("ts_reportingcompany_name").setVisible(false);
        }
    }

    export function stakeholderCompanyOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_securityincident.Main.Information>eContext.getFormContext();
        const stakeholderAttributeValue = form.getAttribute("ts_stakeholder").getValue();
        const mode = form.getAttribute("ts_mode").getValue();

        if (mode == ts_securityincidentmode.AviationSecurity && stakeholderAttributeValue != null && stakeholderAttributeValue[0].id.toLowerCase() == '{26b2346f-ba69-ed11-81ac-000d3af4c525}') {
            form.getControl("ts_stakeholder_name").setVisible(true);
        }
        else {
            form.getControl("ts_stakeholder_name").setVisible(false);
        }
    }

    function setDefaultView(form: Form.ts_securityincident.Main.Information) {
        form.getControl("ts_aircarrier").setDefaultView("d06d7b47-80bf-ed11-83ff-0022483c5061");
        form.getControl("ts_origin").setDefaultView("3507a249-81bf-ed11-83ff-0022483d7716");
        form.getControl("ts_destination").setDefaultView("3507a249-81bf-ed11-83ff-0022483d7716");
        form.getControl("ts_diversionaerodrome").setDefaultView("3507a249-81bf-ed11-83ff-0022483d7716");
    }
}