"use strict";
var ROM;
(function (ROM) {
    var OperationActivity;
    (function (OperationActivity) {
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            var operationAttribute = form.getAttribute("ts_operation");
            var activityTypeAttribute = form.getAttribute("ts_activity");
            if (operationAttribute != null && operationAttribute != undefined && activityTypeAttribute != null && activityTypeAttribute != undefined) {
                var operationAttributeValue = operationAttribute.getValue();
                var activityTypeAttributeValue = activityTypeAttribute.getValue();
                if (operationAttributeValue != null && activityTypeAttributeValue != null) {
                    form.ui.tabs.get("related_wos_tab").setVisible(true);
                    var fetchXml = "<filter><condition attribute=\"msdyn_primaryincidenttype\" operator=\"eq\" value=\"" + activityTypeAttributeValue[0].id + "\"/><condition attribute=\"ovs_operationid\" operator=\"eq\" value=\"" + operationAttributeValue[0].id + "\"/><condition attribute=\"statecode\" operator=\"eq\" value=\"0\" /></filter>";
                    setSubgridFilterXml(eContext, "related_wos", fetchXml);
                }
            }
        }
        OperationActivity.onLoad = onLoad;
        function setSubgridFilterXml(eContext, gridName, filterXml) {
            var context = Xrm.Utility.getGlobalContext();
            var formContext = eContext.getFormContext();
            var gridControl = formContext.getControl("related_wos");
            try {
                var viewId = gridControl.getViewSelector().getCurrentView().id
                    .toLowerCase()
                    .replace("{", "")
                    .replace("}", "");
                //@ts-ignore    
                var view = getState(context).metadata.views[viewId];
                if (!view) {
                    return;
                }
                var originalXml = view.fetchXML;
                var fetchXml = removeFilters(removeLinkedEntities(originalXml));
                var insertAtIndex = fetchXml.lastIndexOf("</entity>");
                // Remove any white spaces between XML tags to ensure that different filters are compared the same when checking to refresh
                view.fetchXML = (fetchXml.substring(0, insertAtIndex) + filterXml + fetchXml.substring(insertAtIndex)).replace(/>\s+</g, "><");
                if (view.fetchXML !== originalXml) {
                    // Refresh to load the new Fetch            
                    gridControl.refresh();
                }
            }
            catch (err) {
            }
        }
        OperationActivity.setSubgridFilterXml = setSubgridFilterXml;
        function getState(context) {
            //@ts-ignore
            return context._clientApiExecutor._store.getState();
        }
        function removeFilters(fetchXml) {
            return removeXmlNode(fetchXml, "filter");
        }
        function removeLinkedEntities(fetchXml) {
            return removeXmlNode(fetchXml, "link-entity");
        }
        function removeXmlNode(xml, nodeName) {
            // Remove Empty tags i.e. <example /> or <example a="b" />
            xml = xml.replace(new RegExp("<[s]*" + nodeName + "[^/>]*\\/>", "gm"), "");
            var startTag = "<" + nodeName;
            var endTag = "</" + nodeName + ">";
            var endIndex = xml.indexOf(endTag);
            // use first end Tag to do inner search
            while (endIndex >= 0) {
                endIndex += endTag.length;
                var startIndex = xml.substring(0, endIndex).lastIndexOf(startTag);
                xml = xml.substring(0, startIndex) + xml.substring(endIndex, xml.length);
                endIndex = xml.indexOf(endTag);
            }
            return xml;
        }
    })(OperationActivity = ROM.OperationActivity || (ROM.OperationActivity = {}));
})(ROM || (ROM = {}));
