"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var ROM;
(function (ROM) {
    var Operation;
    (function (Operation) {
        var userBusinessUnitName;
        var formOpenedInCreateModeWithSiteFilled = false;
        //Stakeholder owning business unit used to filter other fields
        var owningBusinessUnit;
        //Condition to filter fields based on current user BU
        var businessUnitCondition;
        var issoOperationTypeGuids = ["{B27E5003-C751-EB11-A812-000D3AF3AC0D}", "{C97A1A12-D8EB-EB11-BACB-000D3AF4FBEC}", "{21CA416A-431A-EC11-B6E7-000D3A09D067}", "{3B261029-C751-EB11-A812-000D3AF3AC0D}", "{D883B39A-C751-EB11-A812-000D3AF3AC0D}", "{DA56FEA1-C751-EB11-A812-000D3AF3AC0D}", "{199E31AE-C751-EB11-A812-000D3AF3AC0D}"];
        function onLoad(eContext) {
            return __awaiter(this, void 0, void 0, function () {
                var form, userRoles, userId, currentUserBusinessUnitFetchXML;
                return __generator(this, function (_a) {
                    form = eContext.getFormContext();
                    userRoles = Xrm.Utility.getGlobalContext().userSettings.roles;
                    //If the user is a system admin or ROM - Planner, enable risk score field
                    userRoles.forEach(function (role) {
                        if (role.name == "System Administrator") {
                            form.getControl("ts_riskscore").setDisabled(false);
                            form.getControl("ts_dateoflastsecurityplanreview").setDisabled(false);
                            form.getControl("ts_dateoflastcomprehensiveinspection").setDisabled(false);
                            form.getControl("ts_dateoflastriskbasedinspection").setDisabled(false);
                        }
                    });
                    userId = Xrm.Utility.getGlobalContext().userSettings.userId;
                    currentUserBusinessUnitFetchXML = [
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
                        var operationType = form.getAttribute("ovs_operationtypeid").getValue();
                        //Show ISSO Properties Tab if OperationType is ISSO, show Avsec if not 
                        if (operationType != null) {
                            if (issoOperationTypeGuids.includes(operationType[0].id)) {
                                form.ui.tabs.get("tab_properties_isso").setVisible(true);
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
                                //Show Visual Security Inspection question only for Railway Carrier and Railway Loader depending on Type Of Dangerous Goods
                                if (operationType != null) {
                                    if (operationType[0].id == "{D883B39A-C751-EB11-A812-000D3AF3AC0D}" || operationType[0].id == "{DA56FEA1-C751-EB11-A812-000D3AF3AC0D}") {
                                        form.getControl("ts_typeofdangerousgoods").setVisible(true);
                                        if (form.getAttribute("ts_typeofdangerousgoods").getValue() == 717750002 /* NonSchedule1DangerousGoods */ || form.getAttribute("ts_typeofdangerousgoods").getValue() == 717750001 /* Schedule1DangerousGoods */) {
                                            form.getControl("ts_visualsecurityinspection").setVisible(true);
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
                                    }
                                    //If Operation Type is Small Passenger Company, Passenger Company, or Host Company
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
                                if (form.ui.getFormType() == 1) { //Create
                                    //If the form is opened with the stakeholder or site value already filled (from account/site subgrids)
                                    if (form.getAttribute('ts_stakeholder').getValue() != null) {
                                        getStakeholderOwningBusinessUnitAndSetOperationTypeView(form);
                                    }
                                    else if (form.getAttribute('ts_site').getValue() != null) {
                                        formOpenedInCreateModeWithSiteFilled = true;
                                        form.getControl('ovs_operationtypeid').setDisabled(false);
                                        getSiteOwningBusinessUnitAndSetOperationTypeAndStakeholderView(form);
                                    }
                                }
                                else if (form.ui.getFormType() == 2) { //Update
                                    showOperationActivityTabIfAvSec(form);
                                    //We filter the form on the business unit of the owner of the record
                                    var ownerAttribute = form.getAttribute("ownerid").getValue();
                                    if (ownerAttribute != null) {
                                        Xrm.WebApi.retrieveRecord(ownerAttribute[0].entityType, ownerAttribute[0].id, "?$select=_businessunitid_value").then(function success(result) {
                                            owningBusinessUnit = result._businessunitid_value;
                                            form.getControl('ovs_operationtypeid').setDisabled(false);
                                            form.getControl('ts_site').setDisabled(false);
                                            setStakeholderFilteredView(form);
                                            setOperationTypeFilteredView(form);
                                            setSiteFilteredView(form);
                                            setSubSiteFilteredView(form);
                                        });
                                    }
                                    if (form.getAttribute('ts_subsite').getValue() != null) {
                                        form.getControl('ts_subsite').setDisabled(false);
                                    }
                                }
                                else if (form.ui.getFormType() == 3 || form.ui.getFormType() == 4) {
                                    showOperationActivityTabIfAvSec(form);
                                }
                            } else {
                                form.ui.tabs.get("tab_properties_avsec").setVisible(true);
                            }
                        }
                    });
                    if (form.getAttribute("ts_statusstartdate").getValue() != null) {
                        form.getControl("ts_statusenddate").setDisabled(false);
                        form.getControl("ts_description").setDisabled(false);
                        form.getAttribute("ts_description").setRequiredLevel("required");
                    }
                    return [2 /*return*/];
                });
            });
        }
        Operation.onLoad = onLoad;
        function showOperationActivityTabIfAvSec(form) {
            Xrm.WebApi.retrieveRecord('ovs_operation', form.data.entity.getId(), "?$select=_owningbusinessunit_value").then(function success(operation) {
                var businessUnitfetchXml = [
                    "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='false' returntotalrecordcount='true' no-lock='false'>",
                    "  <entity name='businessunit'>",
                    "    <attribute name='name'/>",
                    "    <attribute name='businessunitid'/>",
                    "    <filter>",
                    "      <condition attribute='businessunitid' operator='eq' value='", operation._owningbusinessunit_value, "'/>",
                    "    </filter>",
                    "  </entity>",
                    "</fetch>"
                ].join("");
                businessUnitfetchXml = "?fetchXml=" + businessUnitfetchXml;
                Xrm.WebApi.retrieveMultipleRecords("businessunit", businessUnitfetchXml).then(function (result) {
                    if (result.entities[0].name.startsWith("Aviation")) {
                        form.ui.tabs.get("operation_activity_tab").setVisible(true);
                    }
                });
            });
        }
        Operation.showOperationActivityTabIfAvSec = showOperationActivityTabIfAvSec;
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
            form.getControl('ts_stakeholder').setDisabled(false);
            var viewId = '{3BC6D613-1CBD-48DC-86C3-33830D34EF7D}';
            var entityName = "account";
            var viewDisplayName = "Filtered Stakeholders";
            var activityTypeFetchXml = '<fetch version="1.0" mapping="logical" distinct="true" returntotalrecordcount="true" page="1" count="25" no-lock="false"><entity name="account"><attribute name="statecode"/><attribute name="name"/><attribute name="accountnumber"/><attribute name="primarycontactid"/><attribute name="address1_city"/><attribute name="telephone1"/><attribute name="emailaddress1"/><attribute name="accountid"/><attribute name="fax"/><attribute name="address1_name"/><attribute name="address1_fax"/><order attribute="name" descending="false"/><attribute name="ovs_legalname"/><filter type="and"><condition attribute="statecode" operator="eq" value="0"/><condition attribute="ts_stakeholderstatus" operator="ne" value="717750001"/><condition attribute="owningbusinessunit" operator="eq" value="' + owningBusinessUnit + '" uitype="businessunit"/>' + (!userBusinessUnitName.startsWith("Transport") ? businessUnitCondition : "") + '</filter></entity></fetch>';
            var layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="accountid"><cell name="name" width="200" /></row></grid>';
            form.getControl("ts_stakeholder").addCustomView(viewId, entityName, viewDisplayName, activityTypeFetchXml, layoutXml, true);
        }
        function setOperationTypeFilteredView(form) {
            form.getControl('ovs_operationtypeid').setDisabled(false);
            var viewId = '{1BC6D613-1CBD-48DC-86C3-77830D34EF7D}';
            var entityName = "ovs_operationtype";
            var viewDisplayName = "Filtered Operation Types";
            var activityTypeFetchXml = '<fetch version="1.0" mapping="logical" returntotalrecordcount="true" page="1" count="25" no-lock="false"><entity name="ovs_operationtype"><attribute name="ovs_operationtypeid"/><attribute name="ovs_name"/><attribute name="ownerid"/><filter type="and"><condition attribute="statecode" operator="eq" value="0"/><condition attribute="owningbusinessunit" operator="eq" value="' + owningBusinessUnit + '" uitype="businessunit"/>' + (!userBusinessUnitName.startsWith("Transport") ? businessUnitCondition : "") + '</filter><order attribute="ovs_name" descending="false"/></entity></fetch>';
            var layoutXml = '<grid name="resultset" object="10010" jump="ovs_name" select="1" icon="1" preview="1"><row name="result" id="ovs_operationtypeid"><cell name="ovs_name" width="200" /></row></grid>';
            form.getControl("ovs_operationtypeid").addCustomView(viewId, entityName, viewDisplayName, activityTypeFetchXml, layoutXml, true);
        }
        function getStakeholderOwningBusinessUnitAndSetOperationTypeView(form) {
            var stakeholder = form.getAttribute("ts_stakeholder");
            var stakeholderValue = stakeholder.getValue();
            if (stakeholderValue != null) {
                Xrm.WebApi.retrieveRecord('account', stakeholderValue[0].id, "?$select=_owningbusinessunit_value").then(function success(result) {
                    owningBusinessUnit = result._owningbusinessunit_value;
                    if (!formOpenedInCreateModeWithSiteFilled) {
                        setOperationTypeFilteredView(form);
                    }
                }, function (error) { });
            }
        }
        function stakeholderOnChange(eContext) {
            var form = eContext.getFormContext();
            var stakeholder = form.getAttribute("ts_stakeholder");
            var stakeholderValue = stakeholder.getValue();
            if (form.ui.getFormType() != 2) {
                if (!formOpenedInCreateModeWithSiteFilled) {
                    form.getControl('ovs_operationtypeid').setDisabled(true);
                    form.getAttribute("ovs_operationtypeid").setValue();
                    form.getControl('ts_site').setDisabled(true);
                    form.getAttribute("ts_site").setValue();
                    form.getControl('ts_subsite').setDisabled(true);
                    form.getAttribute("ts_subsite").setValue();
                    getStakeholderOwningBusinessUnitAndSetOperationTypeView(form);
                }
            }
        }
        Operation.stakeholderOnChange = stakeholderOnChange;
        function setSiteFilteredView(form) {
            var operationTypeAttribute = form.getAttribute("ovs_operationtypeid");
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
        }
        function getSiteOwningBusinessUnitAndSetOperationTypeAndStakeholderView(form) {
            var functionalLocation = form.getAttribute("ts_site");
            var functionalLocationValue = functionalLocation.getValue();
            if (functionalLocationValue != null) {
                Xrm.WebApi.retrieveRecord('msdyn_functionallocation', functionalLocationValue[0].id, "?$select=_owningbusinessunit_value").then(function success(result) {
                    owningBusinessUnit = result._owningbusinessunit_value;
                    setOperationTypeFilteredView(form);
                    setStakeholderFilteredView(form);
                }, function (error) { });
            }
        }
        function operationTypeOnChange(eContext) {
            var form = eContext.getFormContext();
            var operationTypeAttribute = form.getAttribute("ovs_operationtypeid");
            if (!formOpenedInCreateModeWithSiteFilled && form.ui.getFormType() != 2) {
                if (operationTypeAttribute != null) {
                    setSiteFilteredView(form);
                }
                else {
                    form.getControl('ts_site').setDisabled(true);
                }
            }
        }
        Operation.operationTypeOnChange = operationTypeOnChange;
        function siteOnChange(eContext) {
            var form = eContext.getFormContext();
            setSubSiteFilteredView(form);
        }
        Operation.siteOnChange = siteOnChange;
        function setSubSiteFilteredView(form) {
            var siteAttribute = form.getAttribute("ts_site");
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
        }
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
        function typeOfDangerousGoodsOnChange(eContext) {
            var form = eContext.getFormContext();
            var typeOfDangerousGoods = form.getAttribute("ts_typeofdangerousgoods").getValue();
            if (typeOfDangerousGoods == 717750002 /* NonSchedule1DangerousGoods */ || typeOfDangerousGoods == 717750001 /* Schedule1DangerousGoods */) {
                form.getControl("ts_visualsecurityinspection").setVisible(true);
            }
            else {
                form.getControl("ts_visualsecurityinspection").setVisible(false);
                form.getAttribute("ts_visualsecurityinspection").setValue(null);
                form.getControl("ts_visualsecurityinspectiondetails").setVisible(false);
                form.getAttribute("ts_visualsecurityinspectiondetails").setValue(null);
            }
        }
        Operation.typeOfDangerousGoodsOnChange = typeOfDangerousGoodsOnChange;
        function setFieldsDisabled(eContext) {
            var formContext = eContext.getFormContext();
            var gridContext = formContext.getControl("operation_activity_grid");
            if (formContext) {
                var arrFields_1 = ["ts_operation", "ts_activity"];
                var objEntity = formContext.data.entity;
                objEntity.attributes.forEach(function (attribute, i) {
                    if (arrFields_1.indexOf(attribute.getName()) > -1) {
                        var attributeToDisable = attribute.controls.get(0);
                        attributeToDisable.setDisabled(true);
                    }
                });
            }
            ;
        }
        Operation.setFieldsDisabled = setFieldsDisabled;
    })(Operation = ROM.Operation || (ROM.Operation = {}));
})(ROM || (ROM = {}));
