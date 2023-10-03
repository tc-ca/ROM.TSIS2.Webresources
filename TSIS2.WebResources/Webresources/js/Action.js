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
        var allActionStatus = [
            { text: "Consulted", value: 741130000 /* Consulted */ },
            { text: "Convened", value: 741130001 /* Convened */ },
            { text: "Delivered", value: 741130002 /* Delivered */ },
            { text: "Received", value: 741130003 /* Received */ },
            { text: "Requested", value: 741130004 /* Requested */ },
            { text: "Sworn", value: 741130005 /* Sworn */ }
        ];
        var actionTypeOptions;
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            var formType = form.ui.getFormType();
            actionTypeOptions = form.getControl("ts_actiontype").getOptions();
            if (formType === 1 || formType === 2) {
                actionCategoryOnChange(eContext);
            }
            else if (formType !== 0 && formType !== 6) {
                //setRelatedFindingsFetchXML(form);
            }
            actionStatusOnChange(eContext);
            filterCategory(eContext);
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
            if (actionCategoryAttributeValue == 741130002 /* EnforcementAction */) {
                var filteredDeliveryOptions = allDeliveryMethodOptions;
                var filteredStatusOptions = allActionStatus;
                if (actionTypeAttributeValue == 741130012 /* VerbalWarning */) {
                    filteredDeliveryOptions = [
                        { text: "In Person", value: 741130006 /* InPerson */ },
                        { text: "Telephone", value: 741130007 /* Telephone */ },
                        { text: "Email", value: 741130001 /* Email */ }
                    ];
                    resetFieldsVisibility(form);
                    form.getControl("ts_location").setVisible(false);
                }
                else if (actionTypeAttributeValue == 741130013 /* WrittenWarning */) {
                    filteredDeliveryOptions = [
                        { text: "Email", value: 741130001 /* Email */ },
                        { text: "Letter - Hand delivered", value: 741130003 /* LetterHandDelivered */ },
                        { text: "Letter - Mail", value: 741130004 /* LetterMail */ },
                        { text: "Letter - Registered Mail", value: 741130005 /* LetterRegisteredMail */ },
                        { text: "SSCIMS", value: 741130002 /* SSCIMS */ }
                    ];
                    filteredStatusOptions = [
                        { text: "Delivered", value: 741130002 /* Delivered */ }
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
                    filteredDeliveryOptions = allDeliveryMethodOptions;
                    filteredStatusOptions = allActionStatus;
                    resetFieldsVisibility(form);
                }
                setOptions(deliveryMethodAttribute, filteredDeliveryOptions);
                setOptions(actionStatusAttribute, filteredStatusOptions);
            }
            else if (actionCategoryAttributeValue == 741130001 /* CorrectiveAction */ && actionTypeAttributeValue == 741130008 /* CorrectiveActionPlan */) {
                form.getControl("ts_stakeholder").setVisible(true);
                form.getControl("ts_contact").setVisible(true);
                form.getControl("ts_duedate").setVisible(true);
                form.getControl("ts_location").setVisible(false);
                form.getControl("ts_deliverymethod").setVisible(false);
                form.getControl("ts_amtamount").setVisible(false);
                setOptions(actionStatusAttribute, allActionStatus);
            }
            else {
                resetFieldsVisibility(form);
                setOptions(deliveryMethodAttribute, allDeliveryMethodOptions);
                setOptions(actionStatusAttribute, allActionStatus);
            }
            //Hide action type options for ISSO
            if (form.ui.getFormType() != 1) {
                var actionId = form.data.entity.getId();
                var operationTypeFetchXML = [
                    "<fetch version=\"1.0\" output-format=\"xml-platform\" mapping=\"logical\" distinct=\"true\">\n                  <entity name=\"msdyn_workorder\">\n                    <attribute name=\"msdyn_name\" />\n                    <attribute name=\"msdyn_workorderid\" />\n                    <attribute name=\"ovs_operationtypeid\" />\n                    <link-entity name=\"ovs_finding\" from=\"ts_workorder\" to=\"msdyn_workorderid\" link-type=\"inner\" alias=\"ac\">\n                      <link-entity name=\"ts_actionfinding\" from=\"ts_ovs_finding\" to=\"ovs_findingid\" link-type=\"inner\" alias=\"ad\">\n                        <filter type=\"and\">\n                          <condition attribute=\"ts_action\" operator=\"eq\" uitype=\"ts_action\" value=\"" + actionId + "\" />\n                        </filter>\n                      </link-entity>\n                    </link-entity>\n                  </entity>\n                </fetch>"
                ].join("");
                operationTypeFetchXML = "?fetchXml=" + encodeURIComponent(operationTypeFetchXML);
                Xrm.WebApi.retrieveMultipleRecords("msdyn_workorder", operationTypeFetchXML).then(function success(result) {
                    var operationTypeOwningBusinessUnitFetchXML = [
                        "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true' no-lock='false'>",
                        "  <entity name='businessunit'>",
                        "    <attribute name='name'/>",
                        "    <attribute name='businessunitid'/>",
                        "    <link-entity name='ovs_operationtype' from='owningbusinessunit' to='businessunitid' link-type='inner'>",
                        "      <filter>",
                        "        <condition attribute='ovs_operationtypeid' operator='eq' value='", result.entities[0]._ovs_operationtypeid_value, "'/>",
                        "      </filter>",
                        "    </link-entity>",
                        "  </entity>",
                        "</fetch>"
                    ].join("");
                    operationTypeOwningBusinessUnitFetchXML = "?fetchXml=" + operationTypeOwningBusinessUnitFetchXML;
                    Xrm.WebApi.retrieveMultipleRecords("businessunit", operationTypeOwningBusinessUnitFetchXML).then(function success(resultBusinessUnit) {
                        if (!resultBusinessUnit.entities[0].name.startsWith("Avia")) {
                            var actiontypes = form.getControl("ts_actiontype");
                            setOptions(actiontypes, actionTypeOptions);
                            if (actionCategoryAttributeValue == 741130002 /* EnforcementAction */) {
                                for (var i = 0; i < actionTypeOptions.length; i++) {
                                    if (actionTypeOptions[i].value != 741130012 /* VerbalWarning */ && actionTypeOptions[i].value != 741130013 /* WrittenWarning */ && actionTypeOptions[i].value != 741130017 /* RegionalEnforcementUnitREU */) {
                                        actiontypes.removeOption(actionTypeOptions[i].value);
                                    }
                                }
                            }
                            else if (actionCategoryAttributeValue == 741130001 /* CorrectiveAction */) {
                                for (var i = 0; i < actionTypeOptions.length; i++) {
                                    if (actionTypeOptions[i].value != 741130008 /* CorrectiveActionPlan */) {
                                        actiontypes.removeOption(actionTypeOptions[i].value);
                                    }
                                }
                            }
                        }
                    }, function (error) {
                    });
                }, function (error) {
                });
            }
            ///end
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
            var actionCategoryAttributeValue = form.getAttribute("ts_actioncategory").getValue();
            var actionTypeAttributeValue = form.getAttribute("ts_actiontype").getValue();
            if (!(actionStatus != null && actionTypeAttributeValue != null && actionCategoryAttributeValue == 741130001 /* CorrectiveAction */ && actionTypeAttributeValue == 741130008 /* CorrectiveActionPlan */)) {
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
        }
        Action.actionStatusOnChange = actionStatusOnChange;
        function actionTypeOnChange(eContext) {
            actionStatusOnChange(eContext);
            actionCategoryOnChange(eContext);
        }
        Action.actionTypeOnChange = actionTypeOnChange;
        function filterCategory(eContext) {
            var form = eContext.getFormContext();
            if (form.ui.getFormType() != 1) {
                var actionId = form.data.entity.getId();
                var operationTypeFetchXML = [
                    "<fetch version=\"1.0\" output-format=\"xml-platform\" mapping=\"logical\" distinct=\"true\">\n                  <entity name=\"msdyn_workorder\">\n                    <attribute name=\"msdyn_name\" />\n                    <attribute name=\"msdyn_workorderid\" />\n                    <attribute name=\"ovs_operationtypeid\" />\n                    <link-entity name=\"ovs_finding\" from=\"ts_workorder\" to=\"msdyn_workorderid\" link-type=\"inner\" alias=\"ac\">\n                      <link-entity name=\"ts_actionfinding\" from=\"ts_ovs_finding\" to=\"ovs_findingid\" link-type=\"inner\" alias=\"ad\">\n                        <filter type=\"and\">\n                          <condition attribute=\"ts_action\" operator=\"eq\" uitype=\"ts_action\" value=\"" + actionId + "\" />\n                        </filter>\n                      </link-entity>\n                    </link-entity>\n                  </entity>\n                </fetch>"
                ].join("");
                operationTypeFetchXML = "?fetchXml=" + encodeURIComponent(operationTypeFetchXML);
                Xrm.WebApi.retrieveMultipleRecords("msdyn_workorder", operationTypeFetchXML).then(function success(result) {
                    var operationTypeOwningBusinessUnitFetchXML = [
                        "<fetch version='1.0' output-format='xml-platform' mapping='logical' distinct='true' no-lock='false'>",
                        "  <entity name='businessunit'>",
                        "    <attribute name='name'/>",
                        "    <attribute name='businessunitid'/>",
                        "    <link-entity name='ovs_operationtype' from='owningbusinessunit' to='businessunitid' link-type='inner'>",
                        "      <filter>",
                        "        <condition attribute='ovs_operationtypeid' operator='eq' value='", result.entities[0]._ovs_operationtypeid_value, "'/>",
                        "      </filter>",
                        "    </link-entity>",
                        "  </entity>",
                        "</fetch>"
                    ].join("");
                    operationTypeOwningBusinessUnitFetchXML = "?fetchXml=" + operationTypeOwningBusinessUnitFetchXML;
                    Xrm.WebApi.retrieveMultipleRecords("businessunit", operationTypeOwningBusinessUnitFetchXML).then(function success(resultBusinessUnit) {
                        if (!resultBusinessUnit.entities[0].name.startsWith("Avia")) {
                            var actionCategoryOptions = form.getControl("ts_actioncategory").getOptions();
                            for (var i = 0; i < actionCategoryOptions.length; i++) {
                                if (actionCategoryOptions[i].value != 741130002 /* EnforcementAction */ && actionCategoryOptions[i].value != 741130001 /* CorrectiveAction */) {
                                    form.getControl("ts_actioncategory").removeOption(actionCategoryOptions[i].value);
                                }
                            }
                        }
                    }, function (error) {
                    });
                }, function (error) {
                });
            }
        }
        Action.filterCategory = filterCategory;
    })(Action = ROM.Action || (ROM.Action = {}));
})(ROM || (ROM = {}));
