namespace ROM.Operation {
    let userBusinessUnitName;
    let formOpenedInCreateModeWithSiteFilled = false;
    //Stakeholder owning business unit used to filter other fields
    let owningBusinessUnit;
    //Condition to filter fields based on current user BU
    let businessUnitCondition;

    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ovs_operation.Main.Information>eContext.getFormContext();

        let userId = Xrm.Utility.getGlobalContext().userSettings.userId;
        let currentUserBusinessUnitFetchXML = [
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
            businessUnitCondition = '<condition attribute="owningbusinessunit" operator="eq" value="' + result.entities[0].businessunitid + '" />';
            
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
                            form.getAttribute("ts_visualsecurityinspection").setValue(ts_visualsecurityinspection.Unconfirmed);
                        }
                        else {
                            if (form.getAttribute("ts_visualsecurityinspection").getValue() == ts_visualsecurityinspection.Yes) {
                                form.getControl("ts_visualsecurityinspectiondetails").setVisible(true);
                            }
                        }
                    }
                    //if Operation Type is Small Passenger Company, Passenger Company, or Host Company
                    if (operationType[0].id == "{199E31AE-C751-EB11-A812-000D3AF3AC0D}" || operationType[0].id == "{3B261029-C751-EB11-A812-000D3AF3AC0D}" || operationType[0].id == "{B27E5003-C751-EB11-A812-000D3AF3AC0D}") {
                        form.getControl("ts_issecurityinspectionsite").setVisible(true);
                        //Set default value for existing operations
                        if (form.getAttribute("ts_issecurityinspectionsite").getValue() == null) {
                            form.getAttribute("ts_issecurityinspectionsite").setValue(ts_issecurityinspectionsite.Unconfirmed);
                        }
                        else {
                            if (form.getAttribute("ts_issecurityinspectionsite").getValue() == ts_issecurityinspectionsite.Yes) {
                                    form.getControl("ts_securityinspectiondetails").setVisible(true);
                                }
                            }
                        }
                    }

                if(form.ui.getFormType() == 1){ //Create
                    //If the form is opened with the stakeholder/site value already filled (from account/site subgrids)
                    if(form.getAttribute('ts_stakeholder').getValue() != null){
                        getStakeholderOwningBusinessUnitAndSetOperationTypeView(form);
                    }
                    else if(form.getAttribute('ts_site').getValue() != null){
                        formOpenedInCreateModeWithSiteFilled = true;
                        form.getControl('ovs_operationtypeid').setDisabled(false);
                        getSiteOwningBusinessUnitAndSetOperationTypeAndStakeholderView(form);
                    }
                }
                else if(form.ui.getFormType() == 2){ //Update
                    form.getControl('ovs_operationtypeid').setDisabled(false);
                    form.getControl('ts_site').setDisabled(false);

                    setOperationTypeFilteredView(form);
                    setSiteFilteredView(form);
                    setSubSiteFilteredView(form);

                    if(form.getAttribute('ts_subsite').getValue() != null){
                      form.getControl('ts_subsite').setDisabled(false);
                    }
                }

                //If user is not an admin, filter stakeholder on his BU
                if(!userBusinessUnitName.startsWith("Transport")){
                    setOperationTypeFilteredView(form);
                }
            }
        });

        if (form.getAttribute("ts_statusstartdate").getValue() != null) {
            form.getControl("ts_statusenddate").setDisabled(false);
            form.getControl("ts_description").setDisabled(false);
            form.getAttribute("ts_description").setRequiredLevel("required");
        }
    }


    export function onSave(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ovs_operation.Main.Information>eContext.getFormContext();
        const statusStartDateValue = form.getAttribute("ts_statusstartdate").getValue();
        const statusEndDateValue = form.getAttribute("ts_statusenddate").getValue();
        if (statusStartDateValue != null) {
            if (Date.parse(statusStartDateValue.toDateString()) <= Date.parse(new Date(Date.now()).toDateString())) {
                form.getAttribute("ts_operationalstatus").setValue(ts_operationalstatus.NonOperational);
            }
        }
        if (statusEndDateValue != null) {
            if (Date.parse(statusEndDateValue.toDateString()) <= Date.parse(new Date(Date.now()).toDateString())) {
                form.getAttribute("ts_operationalstatus").setValue(ts_operationalstatus.Operational);
            }
        }
    }

    function setStakeholderFilteredView(form: Form.ovs_operation.Main.Information): void {
        form.getControl('ts_stakeholder').setDisabled(false);
        const viewId = '{3BC6D613-1CBD-48DC-86C3-33830D34EF7D}';
        const entityName = "account";
        const viewDisplayName = "Filtered Stakeholders";
        const activityTypeFetchXml = '<fetch version="1.0" mapping="logical" distinct="true" returntotalrecordcount="true" page="1" count="25" no-lock="false"><entity name="account"><attribute name="statecode"/><attribute name="name"/><attribute name="accountnumber"/><attribute name="primarycontactid"/><attribute name="address1_city"/><attribute name="telephone1"/><attribute name="emailaddress1"/><attribute name="accountid"/><attribute name="fax"/><attribute name="address1_name"/><attribute name="address1_fax"/><order attribute="name" descending="false"/><attribute name="ovs_legalname"/><filter type="and"><condition attribute="statecode" operator="eq" value="0"/><condition attribute="ts_stakeholderstatus" operator="ne" value="717750001"/><condition attribute="owningbusinessunit" operator="eq" value="' + owningBusinessUnit + '" uitype="businessunit"/>' + (!userBusinessUnitName.startsWith("Transport") ? businessUnitCondition : "") +'</filter></entity></fetch>';
        const layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="accountid"><cell name="name" width="200" /></row></grid>';
        form.getControl("ts_stakeholder").addCustomView(viewId, entityName, viewDisplayName, activityTypeFetchXml, layoutXml, true);
    }

    function setOperationTypeFilteredView(form: Form.ovs_operation.Main.Information): void {
        form.getControl('ovs_operationtypeid').setDisabled(false);
        const viewId = '{1BC6D613-1CBD-48DC-86C3-77830D34EF7D}';
        const entityName = "ovs_operationtype";
        const viewDisplayName = "Filtered Operation Types";
        const activityTypeFetchXml = '<fetch version="1.0" mapping="logical" returntotalrecordcount="true" page="1" count="25" no-lock="false"><entity name="ovs_operationtype"><attribute name="ovs_operationtypeid"/><attribute name="ovs_name"/><attribute name="ownerid"/><filter type="and"><condition attribute="statecode" operator="eq" value="0"/><condition attribute="owningbusinessunit" operator="eq" value="' + owningBusinessUnit + '" uitype="businessunit"/>' + (!userBusinessUnitName.startsWith("Transport") ? businessUnitCondition : "") +'</filter><order attribute="ovs_name" descending="false"/></entity></fetch>';
        const layoutXml = '<grid name="resultset" object="10010" jump="ovs_name" select="1" icon="1" preview="1"><row name="result" id="ovs_operationtypeid"><cell name="ovs_name" width="200" /></row></grid>';
        form.getControl("ovs_operationtypeid").addCustomView(viewId, entityName, viewDisplayName, activityTypeFetchXml, layoutXml, true);
    }

    function getStakeholderOwningBusinessUnitAndSetOperationTypeView(form: Form.ovs_operation.Main.Information){
        const stakeholder = form.getAttribute("ts_stakeholder");
        const stakeholderValue = stakeholder.getValue();

        if(stakeholderValue != null){
            Xrm.WebApi.retrieveRecord('account', stakeholderValue[0].id, "?$select=_owningbusinessunit_value").then(
                function success(result) {
                    owningBusinessUnit = result._owningbusinessunit_value;
                    if(!formOpenedInCreateModeWithSiteFilled){
                        // Filter Operation Type field with owning business unit
                        setOperationTypeFilteredView(form);
                    }
                },
                function (error) {}
            );
        }
    }

    export function stakeholderOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ovs_operation.Main.Information>eContext.getFormContext();
        const stakeholder = form.getAttribute("ts_stakeholder");
        const stakeholderValue = stakeholder.getValue();

        if(stakeholderValue == null){
            if(!formOpenedInCreateModeWithSiteFilled){
                owningBusinessUnit = null;
                setStakeholderFilteredView(form);
                form.getControl('ovs_operationtypeid').setDisabled(true);
                form.getAttribute("ovs_operationtypeid").setValue();
                form.getControl('ts_site').setDisabled(true);
                form.getAttribute("ts_site").setValue();
                form.getControl('ts_subsite').setDisabled(true);
                form.getAttribute("ts_subsite").setValue();
            }
        }
        else{
            getStakeholderOwningBusinessUnitAndSetOperationTypeView(form);
        }
    }

    function setSiteFilteredView(form: Form.ovs_operation.Main.Information): void {
        const operationTypeAttribute = form.getAttribute("ovs_operationtypeid");
        const operationTypeAttributeValue = operationTypeAttribute.getValue();

        // Filter Functional Location field with owning business unit
        if (operationTypeAttributeValue != null && operationTypeAttributeValue != undefined) {
            form.getControl('ts_site').setDisabled(false);
            const viewId = '{26A950A2-BD89-4B6D-AB80-5074DF8AD580}';
            const entityName = "msdyn_functionallocation";
            const viewDisplayName = "Filtered Sites";
            const activityTypeFetchXml = '<fetch version="1.0" mapping="logical" distinct="true" returntotalrecordcount="true" page="1" count="25" no-lock="false"><entity name="msdyn_functionallocation"><attribute name="statecode"/><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><order attribute="msdyn_name" descending="false"/><attribute name="msdyn_parentfunctionallocation"/><filter type="and"><condition attribute="statecode" operator="eq" value="0"/><condition attribute="ts_sitestatus" operator="ne" value="717750001"/><condition attribute="owningbusinessunit" operator="eq" value="' + owningBusinessUnit + '"/>' + (!userBusinessUnitName.startsWith("Transport") ? businessUnitCondition : "") +'</filter></entity></fetch>';
            const layoutXml = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="200" /></row></grid>';
            form.getControl("ts_site").addCustomView(viewId, entityName, viewDisplayName, activityTypeFetchXml, layoutXml, true);
        }
    }

    function getSiteOwningBusinessUnitAndSetOperationTypeAndStakeholderView(form: Form.ovs_operation.Main.Information){
        const functionalLocation = form.getAttribute("ts_site");
        const functionalLocationValue = functionalLocation.getValue();

        if(functionalLocationValue != null){
            Xrm.WebApi.retrieveRecord('msdyn_functionallocation', functionalLocationValue[0].id, "?$select=_owningbusinessunit_value").then(
                function success(result) {
                    owningBusinessUnit = result._owningbusinessunit_value;
                    // Filter Operation Type field with owning business unit
                    setOperationTypeFilteredView(form);
                    setStakeholderFilteredView(form);
                },
                function (error) {}
            );
        }
    }

    export function operationTypeOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ovs_operation.Main.Information>eContext.getFormContext();
        const operationTypeAttribute = form.getAttribute("ovs_operationtypeid");

        if(!formOpenedInCreateModeWithSiteFilled){
            if (operationTypeAttribute != null) {
                setSiteFilteredView(form);
            }
            else {
                form.getControl('ts_site').setDisabled(true);
            }
        }
    }

    export function siteOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ovs_operation.Main.Information>eContext.getFormContext();
        setSubSiteFilteredView(form);
    }

    function setSubSiteFilteredView(form: Form.ovs_operation.Main.Information): void {
        const siteAttribute = form.getAttribute("ts_site");
        const siteAttributeValue = siteAttribute.getValue();

        // Enable subsite field with appropriate filtered view if site selected
        if (siteAttributeValue != null && siteAttributeValue != undefined) {
            form.getControl('ts_subsite').setDisabled(false);
            const viewId = '{511EDA6B-C300-4B38-8873-363BE39D4E8F}';
            const entityName = "msdyn_functionallocation";
            const viewDisplayName = "Filtered Sites";
            const activityTypeFetchXml = '<fetch no-lock="false"><entity name="msdyn_functionallocation"><attribute name="statecode"/><attribute name="msdyn_functionallocationid"/><attribute name="msdyn_name"/><filter><condition attribute="msdyn_functionallocationid" operator="under" value="' + siteAttributeValue[0].id + '"/><condition attribute="ts_sitestatus" operator="ne" value="717750001"/><condition attribute="owningbusinessunit" operator="eq" value="' + owningBusinessUnit + '"/>' + (!userBusinessUnitName.startsWith("Transport") ? businessUnitCondition : "") +'</filter><order attribute="msdyn_name" descending="false"/></entity></fetch>';
            const layoutXml = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="200" /></row></grid>';
            form.getControl("ts_subsite").addCustomView(viewId, entityName, viewDisplayName, activityTypeFetchXml, layoutXml, true);
        }
    }

    export function statusStartDateOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ovs_operation.Main.Information>eContext.getFormContext();
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

    export function ppeRequiredOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ovs_operation.Main.Information>eContext.getFormContext();
        const ppeRequired = form.getAttribute("ts_pperequired").getValue();
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

    export function specializedPPERequiredOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ovs_operation.Main.Information>eContext.getFormContext();
        const specializedPPERequired = form.getAttribute("ts_specializedpperequired").getValue();
        if (specializedPPERequired){
            form.getControl("ts_typesofspecializedppe").setVisible(true);
        }
        else {
            form.getControl("ts_typesofspecializedppe").setVisible(false);
            form.getAttribute("ts_typesofspecializedppe").setValue(null);
        }
    }
    
    export function ppeGuideOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ovs_operation.Main.Information>eContext.getFormContext();
        let NCATFactorGuide = form.getAttribute("ts_ppeguide").getValue();
        let webResourcePPEGuide = form.getControl("WebResource_PPEGuide");
        if (NCATFactorGuide)
            webResourcePPEGuide.setVisible(true);
        else
            webResourcePPEGuide.setVisible(false);
    }

    export function VSIConductedOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ovs_operation.Main.Information>eContext.getFormContext();
        let VSIConducted = form.getAttribute("ts_visualsecurityinspection").getValue();
        let VSIDetails = form.getControl("ts_visualsecurityinspectiondetails");
        if (VSIConducted == ts_visualsecurityinspection.Yes) {
            VSIDetails.setVisible(true);
        }
        else {
            VSIDetails.setVisible(false);
            form.getAttribute("ts_visualsecurityinspectiondetails").setValue(null);
        }
    }

    export function SIConductedOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ovs_operation.Main.Information>eContext.getFormContext();
        let SIConducted = form.getAttribute("ts_issecurityinspectionsite").getValue();
        let SIDetails = form.getControl("ts_securityinspectiondetails");
        if (SIConducted == ts_issecurityinspectionsite.Yes) {
            SIDetails.setVisible(true);
        }
        else {
            SIDetails.setVisible(false);
            form.getAttribute("ts_securityinspectiondetails").setValue(null);
        }
    }
}