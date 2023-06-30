"use strict";
var ROM;
(function (ROM) {
    var Action;
    (function (Action) {
        var allDeliveryMethodOptions = [
            { text: "Verbal", value: 741130000 /* Verbal */ },
            { text: "In Person", value: 741130006 /* InPerson */ },
            { text: "Telephone", value: 741130007 /* Telephone */ },
            { text: "Email", value: 741130001 /* Email */ },
            { text: "SSCIMS", value: 741130002 /* SSCIMS */ },
            { text: "Letter - Hand delivered", value: 741130003 /* LetterHandDelivered */ },
            { text: "Letter - Mail", value: 741130004 /* LetterMail */ },
            { text: "Letter - Registered Mail", value: 741130005 /* LetterRegisteredMail */ }
        ];
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            if (form.ui.getFormType() != 0 && form.ui.getFormType() != 1 && form.ui.getFormType() != 6) {
                setRelatedFindingsFetchXML(form);
            }
            else if (form.ui.getFormType() != 2) {
                actionCategoryOnChange(eContext);
            }
            actionStatusOnChange(eContext);
        }
        Action.onLoad = onLoad;
        function setOptions(attribute, options) {
            attribute.clearOptions();
            options.forEach(function (option) { return attribute.addOption(option); });
        }
        function resetFieldsVisibility(form) {
            form.getControl("ts_stakeholder").setVisible(true);
            form.getControl("ts_contact").setVisible(true);
            form.getControl("ts_deliverymethod").setVisible(true);
            form.getControl("ts_location").setVisible(true);
        }
        function actionCategoryOnChange(eContext) {
            var form = eContext.getFormContext();
            var actionCategoryAttributeValue = form.getAttribute("ts_actioncategory").getValue();
            var actionTypeAttributeValue = form.getAttribute("ts_actiontype").getValue();
            var deliveryMethodAttribute = form.getControl("ts_deliverymethod");
            if (actionCategoryAttributeValue == 741130002 /* EnforcementAction */) {
                var filteredOptions = allDeliveryMethodOptions;
                if (actionTypeAttributeValue == 741130012 /* VerbalWarning */) {
                    filteredOptions = [
                        { text: "In Person", value: 741130006 /* InPerson */ },
                        { text: "Telephone", value: 741130007 /* Telephone */ },
                        { text: "Email", value: 741130001 /* Email */ }
                    ];
                    resetFieldsVisibility(form);
                    form.getControl("ts_location").setVisible(false);
                }
                else if (actionTypeAttributeValue == 741130013 /* WrittenWarning */) {
                    filteredOptions = [
                        { text: "Email", value: 741130001 /* Email */ },
                        { text: "Letter - Hand delivered", value: 741130003 /* LetterHandDelivered */ },
                        { text: "Letter - Mail", value: 741130004 /* LetterMail */ },
                        { text: "Letter - Registered Mail", value: 741130005 /* LetterRegisteredMail */ },
                        { text: "SSCIMS", value: 741130002 /* SSCIMS */ }
                    ];
                    resetFieldsVisibility(form);
                    form.getControl("ts_location").setVisible(false);
                }
                else if (actionTypeAttributeValue == 741130017 /* RegionalEnforcementUnitREU */) {
                    form.getControl("ts_stakeholder").setVisible(false);
                    form.getControl("ts_contact").setVisible(false);
                    form.getControl("ts_deliverymethod").setVisible(false);
                    form.getControl("ts_location").setVisible(false);
                }
                else {
                    filteredOptions = allDeliveryMethodOptions;
                    resetFieldsVisibility(form);
                }
                setOptions(deliveryMethodAttribute, filteredOptions);
            }
            else {
                resetFieldsVisibility(form);
                setOptions(deliveryMethodAttribute, allDeliveryMethodOptions);
            }
        }
        Action.actionCategoryOnChange = actionCategoryOnChange;
        function setRelatedFindingsFetchXML(form) {
            var gridControl = form.getControl("subgrid_related_findings");
            if (gridControl === null) {
                setTimeout(ROM.Action.setRelatedFindingsFetchXML, 1000);
                return;
            }
            else {
                var actionId = form.data.entity.getId();
                var fetchXml = "<link-entity name=\"ts_actionfinding\" from=\"ts_ovs_finding\" to=\"ovs_findingid\" link-type=\"inner\" alias=\"aa\"><attribute name=\"ts_ovs_finding\"/><filter type=\"and\"><condition attribute=\"ts_ovs_finding\" operator=\"not-null\"/></filter><link-entity name=\"ts_action\" from=\"ts_actionid\" to=\"ts_action\" link-type=\"inner\" alias=\"ab\"><attribute name=\"ts_actionid\"/><filter type=\"and\"><condition attribute=\"ts_actionid\" operator=\"eq\" value=\"" + actionId + "\"/></filter></link-entity></link-entity>";
                ROM.Utils.setSubgridFilterXml(form, "subgrid_related_findings", fetchXml);
            }
        }
        Action.setRelatedFindingsFetchXML = setRelatedFindingsFetchXML;
        function actionStatusOnChange(eContext) {
            var form = eContext.getFormContext();
            var actionStatus = form.getAttribute("ts_actionstatus").getValue();
            if (actionStatus != null && (actionStatus == 741130000 /* Consulted */ || actionStatus == 741130001 /* Convened */)) {
                form.getControl("ts_deliverymethod").setVisible(false);
                form.getControl("ts_amtamount").setVisible(false);
                form.getControl("ts_duedate").setVisible(false);
            }
            else {
                form.getControl("ts_deliverymethod").setVisible(true);
                form.getControl("ts_amtamount").setVisible(true);
                form.getControl("ts_duedate").setVisible(true);
                var actionType = form.getAttribute("ts_actiontype").getValue();
                if (actionType != null && actionType == 741130007 /* AMPPayment */) {
                    form.getControl("ts_amtamount").setVisible(true);
                    if (actionStatus != null && actionStatus == 741130004 /* Requested */) {
                        form.getControl("ts_duedate").setVisible(true);
                    }
                    else {
                        form.getControl("ts_duedate").setVisible(false);
                    }
                }
                else {
                    form.getControl("ts_amtamount").setVisible(false);
                    form.getControl("ts_duedate").setVisible(false);
                }
            }
        }
        Action.actionStatusOnChange = actionStatusOnChange;
        function actionTypeOnChange(eContext) {
            actionStatusOnChange(eContext);
            actionCategoryOnChange(eContext);
        }
        Action.actionTypeOnChange = actionTypeOnChange;
    })(Action = ROM.Action || (ROM.Action = {}));
})(ROM || (ROM = {}));
