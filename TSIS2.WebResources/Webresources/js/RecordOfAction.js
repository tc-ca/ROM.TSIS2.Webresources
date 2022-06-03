"use strict";
var ROM;
(function (ROM) {
    var RecordOfAction;
    (function (RecordOfAction) {
        function onLoad(eContext) {
            var formContext = eContext.getFormContext();
            verbalWarningAdditionalDetailsVisibility(formContext);
            verbalWarningWhereOtherVisiblity(formContext);
            filterAuthorizedRepresentative(formContext);
        }
        RecordOfAction.onLoad = onLoad;
        function onSave(eContext) {
        }
        RecordOfAction.onSave = onSave;
        function filterAuthorizedRepresentative(formContext) {
            var viewId = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F770}';
            var entityName = "contact";
            var viewDisplayName = "Filtered Contacts";
            var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true" no-lock="false"><entity name="contact"><attribute name="contactid"/><attribute name="fullname"/><link-entity name="ts_operationcontact" from="ts_contact" to="contactid"><link-entity name="ovs_operation" from="ovs_operationid" to="ts_operation"><link-entity name="msdyn_workorder" from="ovs_operationid" to="ovs_operationid"><link-entity name="incident" from="incidentid" to="msdyn_servicerequest"><link-entity name="ts_enforcementaction" from="ts_case" to="incidentid"><link-entity name="ts_serviceofenforcementaction" from="regardingobjectid" to="ts_enforcementactionid"><filter><condition attribute="activityid" operator="eq" value="' + formContext.data.entity.getId() + '" uitype="ts_serviceofenforcementaction"/></filter></link-entity></link-entity></link-entity></link-entity></link-entity><link-entity name="ts_role" from="ts_roleid" to="ts_connectionrole" alias="role"><attribute name="ts_name"/></link-entity></link-entity></entity></fetch>';
            var layoutXml = '<grid name="resultset" object="2" jump="fullname" select="1" icon="1" preview="1"><row name="result" id="contactid"><cell name="fullname" width="200" /><cell name="role.ts_name" width="200" /></row></grid>';
            formContext.getControl("ts_authorizedrepresentative").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
        }
        function methodOfServiceOnChange(eContext) {
            var formContext = eContext.getFormContext();
            verbalWarningAdditionalDetailsVisibility(formContext);
        }
        RecordOfAction.methodOfServiceOnChange = methodOfServiceOnChange;
        function verbalWarningAdditionalDetailsVisibility(formContext) {
            var methodOfServiceValue = formContext.getAttribute("ts_methodofservice").getValue();
            //Show additional fields if method of service includes "Verbal"
            if (methodOfServiceValue != null && methodOfServiceValue.indexOf(717750004 /* Verbal */) !== -1) {
                formContext.ui.tabs.get("general").sections.get("additional_details").setVisible(true);
                formContext.getControl("ts_verbalwarninggivento").setVisible(true);
                formContext.getControl("ts_individualposition").setVisible(true);
                formContext.getControl("ts_individualcompany").setVisible(true);
                formContext.getControl("ts_verbalwarningdate").setVisible(true);
                formContext.getControl("ts_verbalwarningwhere").setVisible(true);
                formContext.getAttribute("ts_verbalwarninggivento").setRequiredLevel("required");
                formContext.getAttribute("ts_individualposition").setRequiredLevel("required");
                formContext.getAttribute("ts_individualcompany").setRequiredLevel("required");
                formContext.getAttribute("ts_verbalwarningdate").setRequiredLevel("required");
                formContext.getAttribute("ts_verbalwarningwhere").setRequiredLevel("required");
            }
            else {
                formContext.ui.tabs.get("general").sections.get("additional_details").setVisible(false);
                formContext.getAttribute("ts_verbalwarninggivento").setValue();
                formContext.getAttribute("ts_individualposition").setValue();
                formContext.getAttribute("ts_individualcompany").setValue();
                formContext.getAttribute("ts_verbalwarningdate").setValue();
                formContext.getAttribute("ts_verbalwarningwhere").setValue();
                formContext.getControl("ts_verbalwarninggivento").setVisible(false);
                formContext.getControl("ts_individualposition").setVisible(false);
                formContext.getControl("ts_individualcompany").setVisible(false);
                formContext.getControl("ts_verbalwarningdate").setVisible(false);
                formContext.getControl("ts_verbalwarningwhere").setVisible(false);
                formContext.getAttribute("ts_verbalwarninggivento").setRequiredLevel("none");
                formContext.getAttribute("ts_individualposition").setRequiredLevel("none");
                formContext.getAttribute("ts_individualcompany").setRequiredLevel("none");
                formContext.getAttribute("ts_verbalwarningdate").setRequiredLevel("none");
                formContext.getAttribute("ts_verbalwarningwhere").setRequiredLevel("none");
            }
        }
        RecordOfAction.verbalWarningAdditionalDetailsVisibility = verbalWarningAdditionalDetailsVisibility;
        function verbalWarningWhereOtherOnChange(eContext) {
            var formContext = eContext.getFormContext();
            verbalWarningWhereOtherVisiblity(formContext);
        }
        RecordOfAction.verbalWarningWhereOtherOnChange = verbalWarningWhereOtherOnChange;
        function verbalWarningWhereOtherVisiblity(formContext) {
            var verbalWarningWhereValue = formContext.getAttribute("ts_verbalwarningwhere").getValue();
            if (verbalWarningWhereValue != 717750002 /* Other */) {
                formContext.getAttribute("ts_verbalwarningwhereother").setValue();
                formContext.getControl("ts_verbalwarningwhereother").setVisible(false);
                formContext.getAttribute("ts_verbalwarningwhereother").setRequiredLevel("none");
            }
            else {
                formContext.getControl("ts_verbalwarningwhereother").setVisible(true);
                formContext.getAttribute("ts_verbalwarningwhereother").setRequiredLevel("required");
            }
        }
        RecordOfAction.verbalWarningWhereOtherVisiblity = verbalWarningWhereOtherVisiblity;
    })(RecordOfAction = ROM.RecordOfAction || (ROM.RecordOfAction = {}));
})(ROM || (ROM = {}));
