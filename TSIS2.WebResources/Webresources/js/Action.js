"use strict";
var ROM;
(function (ROM) {
    var Action;
    (function (Action) {
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            if (form.ui.getFormType() != 0 && form.ui.getFormType() != 1 && form.ui.getFormType() != 6) {
                setRelatedFindingsFetchXML(form);
            }
            actionStatusOnChange(eContext);
        }
        Action.onLoad = onLoad;
        function setRelatedFindingsFetchXML(form) {
            var gridControl = form.getControl("subgrid_related_findings");
            if (gridControl === null) {
                setTimeout(ROM.Action.setRelatedFindingsFetchXML, 1000);
                return;
            }
            else {
                var actionId = form.data.entity.getId();
                var fetchXml = "<fetch version=\"1.0\" output-format=\"xml-platform\" mapping=\"logical\" distinct=\"true\"><entity name=\"ovs_finding\"><attribute name=\"ovs_finding\"/><attribute name=\"ovs_findingid\"/><attribute name=\"ovs_findingprovisionreference\"/><attribute name=\"ts_findingtype\"/><link-entity name=\"ts_actionfinding\" alias=\"aa\" link-type=\"inner\" from=\"ts_ovs_finding\" to=\"ovs_findingid\"><attribute name=\"ts_ovs_finding\" /></filter><link-entity name=\"ts_action\" alias=\"ab\" link-type=\"inner\" from=\"ts_actionid\" to=\"ts_action\"><attribute name=\"ts_actionid\"/><filter type=\"and\"><condition attribute=\"ts_actionid\" operator=\"eq\" value=\"" + actionId + "\"/></filter></link-entity></link-entity></entity></fetch>";
                gridControl.setFilterXml(fetchXml);
                gridControl.refresh();
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
        }
        Action.actionTypeOnChange = actionTypeOnChange;
    })(Action = ROM.Action || (ROM.Action = {}));
})(ROM || (ROM = {}));
