"use strict";
var ROM;
(function (ROM) {
    var EnforcementAction;
    (function (EnforcementAction) {
        function onLoad(eContext) {
            var formContext = eContext.getFormContext();
            additionalDetailsVisibility(formContext);
            filterRepresentative(formContext);
        }
        EnforcementAction.onLoad = onLoad;
        function onSave(eContext) {
        }
        EnforcementAction.onSave = onSave;
        function filterRepresentative(formContext) {
            var viewId = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F770}';
            var entityName = "contact";
            var viewDisplayName = "Filtered Contacts";
            var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" no-lock="false"><entity name="contact"><attribute name="contactid"/><attribute name="fullname"/><link-entity name="ts_operationcontact" from="ts_contact" to="contactid"><link-entity name="ovs_operation" from="ovs_operationid" to="ts_operation"><link-entity name="msdyn_workorder" from="ovs_operationid" to="ovs_operationid"><link-entity name="incident" from="incidentid" to="msdyn_servicerequest"><link-entity name="ts_enforcementaction" from="ts_case" to="incidentid"><filter><condition attribute="ts_enforcementactionid" operator="eq" value="' + formContext.data.entity.getId() + '"/></filter></link-entity></link-entity></link-entity></link-entity><link-entity name="ts_role" from="ts_roleid" to="ts_connectionrole" link-type="inner"><attribute name="ts_name" alias="role"/></link-entity></link-entity></entity></fetch>';
            var layoutXml = '<grid name="resultset" object="2" jump="fullname" select="1" icon="1" preview="1"><row name="result" id="contactid"><cell name="fullname" width="200" /><cell name="role.ts_name" width="200" /></row></grid>';
            formContext.getControl("ts_verbalwarninggivento").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
            formContext.getControl("ts_writtenwarningsentto").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
        }
        function typeOnChange(eContext) {
            var formContext = eContext.getFormContext();
            additionalDetailsVisibility(formContext);
        }
        EnforcementAction.typeOnChange = typeOnChange;
        function additionalDetailsVisibility(formContext) {
            var typeAttributeValue = formContext.getAttribute("ts_typeofenforcementaction").getValue();
            if (typeAttributeValue != null && typeAttributeValue == 717750000 /* VerbalWarning */) {
                formContext.ui.tabs.get("general").sections.get("additional_details").setVisible(true);
                formContext.getControl("ts_verbalwarninggivento").setVisible(true);
                formContext.getControl("ts_individualposition").setVisible(true);
                formContext.getControl("ts_individualcompany").setVisible(true);
                formContext.getControl("ts_verbalwarningdeliverylocation").setVisible(true);
                formContext.getAttribute("ts_verbalwarninggivento").setRequiredLevel("required");
                formContext.getAttribute("ts_individualposition").setRequiredLevel("required");
                formContext.getAttribute("ts_individualcompany").setRequiredLevel("required");
                formContext.getAttribute("ts_verbalwarningdeliverylocation").setRequiredLevel("required");
                formContext.getAttribute("ts_writtenwarningsentto").setValue();
                formContext.getAttribute("ts_writtenwarningdeliverymethod").setValue();
                formContext.getControl("ts_writtenwarningsentto").setVisible(false);
                formContext.getControl("ts_writtenwarningdeliverymethod").setVisible(false);
                formContext.getAttribute("ts_writtenwarningsentto").setRequiredLevel("none");
                formContext.getAttribute("ts_writtenwarningdeliverymethod").setRequiredLevel("none");
            }
            else if (typeAttributeValue != null && typeAttributeValue == 717750001 /* WrittenWarning */) {
                formContext.ui.tabs.get("general").sections.get("additional_details").setVisible(true);
                formContext.getControl("ts_writtenwarningsentto").setVisible(true);
                formContext.getControl("ts_individualposition").setVisible(true);
                formContext.getControl("ts_individualcompany").setVisible(true);
                formContext.getControl("ts_writtenwarningdeliverymethod").setVisible(true);
                formContext.getAttribute("ts_writtenwarningsentto").setRequiredLevel("required");
                formContext.getAttribute("ts_individualposition").setRequiredLevel("required");
                formContext.getAttribute("ts_individualcompany").setRequiredLevel("required");
                formContext.getAttribute("ts_writtenwarningdeliverymethod").setRequiredLevel("required");
                formContext.getAttribute("ts_verbalwarninggivento").setValue();
                formContext.getAttribute("ts_verbalwarningdeliverylocation").setValue();
                formContext.getControl("ts_verbalwarninggivento").setVisible(false);
                formContext.getControl("ts_verbalwarningdeliverylocation").setVisible(false);
                formContext.getAttribute("ts_verbalwarninggivento").setRequiredLevel("none");
                formContext.getAttribute("ts_verbalwarningdeliverylocation").setRequiredLevel("none");
            }
            else {
                formContext.ui.tabs.get("general").sections.get("additional_details").setVisible(false);
                formContext.getAttribute("ts_verbalwarninggivento").setValue();
                formContext.getAttribute("ts_writtenwarningsentto").setValue();
                formContext.getAttribute("ts_individualposition").setValue();
                formContext.getAttribute("ts_individualcompany").setValue();
                formContext.getAttribute("ts_verbalwarningdeliverylocation").setValue();
                formContext.getAttribute("ts_writtenwarningdeliverymethod").setValue();
                formContext.getControl("ts_verbalwarninggivento").setVisible(false);
                formContext.getControl("ts_writtenwarningsentto").setVisible(false);
                formContext.getControl("ts_individualposition").setVisible(false);
                formContext.getControl("ts_individualcompany").setVisible(false);
                formContext.getControl("ts_verbalwarningdeliverylocation").setVisible(false);
                formContext.getControl("ts_writtenwarningdeliverymethod").setVisible(false);
                formContext.getAttribute("ts_verbalwarninggivento").setRequiredLevel("none");
                formContext.getAttribute("ts_writtenwarningsentto").setRequiredLevel("none");
                formContext.getAttribute("ts_individualposition").setRequiredLevel("none");
                formContext.getAttribute("ts_individualcompany").setRequiredLevel("none");
                formContext.getAttribute("ts_verbalwarningdeliverylocation").setRequiredLevel("none");
            }
        }
        EnforcementAction.additionalDetailsVisibility = additionalDetailsVisibility;
        function verbalWarningWhereOtherOnChange(eContext) {
            var formContext = eContext.getFormContext();
            //verbalWarningWhereDetailsVisiblity(formContext);
        }
        EnforcementAction.verbalWarningWhereOtherOnChange = verbalWarningWhereOtherOnChange;
    })(EnforcementAction = ROM.EnforcementAction || (ROM.EnforcementAction = {}));
})(ROM || (ROM = {}));
