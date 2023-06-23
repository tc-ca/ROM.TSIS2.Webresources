"use strict";
// Functions to handle custom subgrid fetchXml
var ROM;
(function (ROM) {
    var Utils;
    (function (Utils) {
        function setSubgridFilterXml(formContext, gridName, filterXml) {
            var context = Xrm.Utility.getGlobalContext();
            var gridControl = formContext.getControl(gridName);
            try {
                var viewId = gridControl.getViewSelector().getCurrentView().id
                    .toLowerCase()
                    .replace("{", "")
                    .replace("}", "");
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
                    gridControl === null || gridControl === void 0 ? void 0 : gridControl.refresh();
                }
            }
            catch (err) {
            }
        }
        Utils.setSubgridFilterXml = setSubgridFilterXml;
        function getState(context) {
            return context._clientApiExecutor._store.getState();
        }
        Utils.getState = getState;
        function removeFilters(fetchXml) {
            return removeXmlNode(fetchXml, "filter");
        }
        Utils.removeFilters = removeFilters;
        function removeLinkedEntities(fetchXml) {
            return removeXmlNode(fetchXml, "link-entity");
        }
        Utils.removeLinkedEntities = removeLinkedEntities;
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
        Utils.removeXmlNode = removeXmlNode;
    })(Utils = ROM.Utils || (ROM.Utils = {}));
})(ROM || (ROM = {}));
