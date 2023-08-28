"use strict";
var ROM;
(function (ROM) {
    var Action;
    (function (Action) {
        var allDeliveryMethodOptions = [
            { text: "Verbal", value: 741130000 /* ts_deliverymethod.Verbal */ },
            { text: "In Person", value: 741130006 /* ts_deliverymethod.InPerson */ },
            { text: "Telephone", value: 741130007 /* ts_deliverymethod.Telephone */ },
            { text: "Email", value: 741130001 /* ts_deliverymethod.Email */ },
            { text: "SSCIMS", value: 741130002 /* ts_deliverymethod.SSCIMS */ },
            { text: "Letter - Hand delivered", value: 741130003 /* ts_deliverymethod.LetterHandDelivered */ },
            { text: "Letter - Mail", value: 741130004 /* ts_deliverymethod.LetterMail */ },
            { text: "Letter - Registered Mail", value: 741130005 /* ts_deliverymethod.LetterRegisteredMail */ }
        ];
        var allActionStatus = [
            { text: "Consulted", value: 741130000 /* ts_actionstatus.Consulted */ },
            { text: "Convened", value: 741130001 /* ts_actionstatus.Convened */ },
            { text: "Delivered", value: 741130002 /* ts_actionstatus.Delivered */ },
            { text: "Received", value: 741130003 /* ts_actionstatus.Received */ },
            { text: "Requested", value: 741130004 /* ts_actionstatus.Requested */ },
            { text: "Sworn", value: 741130005 /* ts_actionstatus.Sworn */ }
        ];
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            var formType = form.ui.getFormType();
            if (formType === 1 || formType === 2) {
                actionCategoryOnChange(eContext);
            }
            else if (formType !== 0 && formType !== 6) {
                setRelatedFindingsFetchXML(form);
            }
            actionStatusOnChange(eContext);
        }
        Action.onLoad = onLoad;
        function setOptions(attribute, options) {
            if (options) {
                attribute.clearOptions();
                options.forEach(function (option) { return attribute.addOption(option); });
            }
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
            var actionStatusAttribute = form.getControl("ts_actionstatus");
            if (actionCategoryAttributeValue == 741130002 /* ts_actioncategory.EnforcementAction */) {
                var filteredDeliveryOptions = allDeliveryMethodOptions;
                var filteredStatusOptions = allActionStatus;
                if (actionTypeAttributeValue == 741130012 /* ts_actiontype.VerbalWarning */) {
                    filteredDeliveryOptions = [
                        { text: "In Person", value: 741130006 /* ts_deliverymethod.InPerson */ },
                        { text: "Telephone", value: 741130007 /* ts_deliverymethod.Telephone */ },
                        { text: "Email", value: 741130001 /* ts_deliverymethod.Email */ }
                    ];
                    resetFieldsVisibility(form);
                    form.getControl("ts_location").setVisible(false);
                }
                else if (actionTypeAttributeValue == 741130013 /* ts_actiontype.WrittenWarning */) {
                    filteredDeliveryOptions = [
                        { text: "Email", value: 741130001 /* ts_deliverymethod.Email */ },
                        { text: "Letter - Hand delivered", value: 741130003 /* ts_deliverymethod.LetterHandDelivered */ },
                        { text: "Letter - Mail", value: 741130004 /* ts_deliverymethod.LetterMail */ },
                        { text: "Letter - Registered Mail", value: 741130005 /* ts_deliverymethod.LetterRegisteredMail */ },
                        { text: "SSCIMS", value: 741130002 /* ts_deliverymethod.SSCIMS */ }
                    ];
                    filteredStatusOptions = [
                        { text: "Delivered", value: 741130002 /* ts_actionstatus.Delivered */ }
                    ];
                    resetFieldsVisibility(form);
                    form.getControl("ts_location").setVisible(false);
                }
                else if (actionTypeAttributeValue == 741130017 /* ts_actiontype.RegionalEnforcementUnitREU */) {
                    form.getControl("ts_stakeholder").setVisible(false);
                    form.getControl("ts_contact").setVisible(false);
                    form.getControl("ts_deliverymethod").setVisible(false);
                    form.getControl("ts_location").setVisible(false);
                }
                else {
                    filteredDeliveryOptions = allDeliveryMethodOptions;
                    filteredStatusOptions = allActionStatus;
                    resetFieldsVisibility(form);
                }
                setOptions(deliveryMethodAttribute, filteredDeliveryOptions);
                setOptions(actionStatusAttribute, filteredStatusOptions);
            }
            else {
                resetFieldsVisibility(form);
                setOptions(deliveryMethodAttribute, allDeliveryMethodOptions);
                setOptions(actionStatusAttribute, allActionStatus);
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
                var fetchXml = "<link-entity name=\"ts_actionfinding\" from=\"ts_ovs_finding\" to=\"ovs_findingid\" link-type=\"inner\" alias=\"aa\"><attribute name=\"ts_ovs_finding\"/><filter type=\"and\"><condition attribute=\"ts_ovs_finding\" operator=\"not-null\"/></filter><link-entity name=\"ts_action\" from=\"ts_actionid\" to=\"ts_action\" link-type=\"inner\" alias=\"ab\"><attribute name=\"ts_actionid\"/><filter type=\"and\"><condition attribute=\"ts_actionid\" operator=\"eq\" value=\"".concat(actionId, "\"/></filter></link-entity></link-entity>");
                ROM.Utils.setSubgridFilterXml(form, "subgrid_related_findings", fetchXml);
            }
        }
        Action.setRelatedFindingsFetchXML = setRelatedFindingsFetchXML;
        function actionStatusOnChange(eContext) {
            var form = eContext.getFormContext();
            var actionStatus = form.getAttribute("ts_actionstatus").getValue();
            if (actionStatus != null && (actionStatus == 741130000 /* ts_actionstatus.Consulted */ || actionStatus == 741130001 /* ts_actionstatus.Convened */)) {
                form.getControl("ts_deliverymethod").setVisible(false);
                form.getControl("ts_amtamount").setVisible(false);
                form.getControl("ts_duedate").setVisible(false);
            }
            else {
                form.getControl("ts_deliverymethod").setVisible(true);
                form.getControl("ts_amtamount").setVisible(true);
                form.getControl("ts_duedate").setVisible(true);
                var actionType = form.getAttribute("ts_actiontype").getValue();
                if (actionType != null && actionType == 741130007 /* ts_actiontype.AMPPayment */) {
                    form.getControl("ts_amtamount").setVisible(true);
                    if (actionStatus != null && actionStatus == 741130004 /* ts_actionstatus.Requested */) {
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
