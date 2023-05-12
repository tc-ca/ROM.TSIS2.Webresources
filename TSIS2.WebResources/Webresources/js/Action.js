﻿"use strict";
var ROM;
(function (ROM) {
    var Action;
    (function (Action) {
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            if (form.ui.getFormType() != 0 && form.ui.getFormType() != 1 && form.ui.getFormType() != 6) {
                setRelatedFindingsFetchXML(form);
            }
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
                var fetchXml = "<fetch version=\"1.0\" output-format=\"xml-platform\" mapping=\"logical\" distinct=\"true\"><entity name=\"ovs_finding\"><attribute name=\"ovs_finding\"/><attribute name=\"ovs_findingid\"/><attribute name=\"ovs_findingprovisionreference\"/><attribute name=\"ts_findingtype\"/><link-entity name=\"ts_actionfinding\" alias=\"aa\" link-type=\"inner\" from=\"ts_ovs_finding\" to=\"ovs_findingid\"><attribute name=\"ts_ovs_finding\" /></filter><link-entity name=\"ts_action\" alias=\"ab\" link-type=\"inner\" from=\"ts_actionid\" to=\"ts_action\"><attribute name=\"ts_actionid\"/><filter type=\"and\"><condition attribute=\"ts_actionid\" operator=\"eq\" value=\"".concat(actionId, "\"/></filter></link-entity></link-entity></entity></fetch>");
                gridControl.setFilterXml(fetchXml);
                gridControl.refresh();
            }
        }
        Action.setRelatedFindingsFetchXML = setRelatedFindingsFetchXML;
    })(Action = ROM.Action || (ROM.Action = {}));
})(ROM || (ROM = {}));
