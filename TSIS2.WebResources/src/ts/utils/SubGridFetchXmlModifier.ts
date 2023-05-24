// Functions to handle custom subgrid fetchXml
namespace ROM.Utils {
    export function setSubgridFilterXml(formContext: any, gridName: string, filterXml: string): void {
        const context = Xrm.Utility.getGlobalContext();
        let gridControl: any = formContext.getControl(gridName);
        
        try {
            const viewId = gridControl.getViewSelector().getCurrentView().id
                .toLowerCase()
                .replace("{", "")
                .replace("}", "");
        
            
            const view = getState(context as any).metadata.views[viewId];
            if (!view) {
                return;
            }
            const originalXml = view.fetchXML;
            const fetchXml = removeFilters(removeLinkedEntities(originalXml));
            const insertAtIndex = fetchXml.lastIndexOf("</entity>");
            // Remove any white spaces between XML tags to ensure that different filters are compared the same when checking to refresh
            view.fetchXML = (fetchXml.substring(0, insertAtIndex) + filterXml + fetchXml.substring(insertAtIndex)).replace(/>\s+</g, "><");

            if (view.fetchXML !== originalXml) {
                // Refresh to load the new Fetch            
                gridControl?.refresh();
            }

        } catch (err) {
        }
    }

    export function getState(context: Xrm.ExecutionContext<any, any>) {
        return (context as any)._clientApiExecutor._store.getState();
    }

    export function removeFilters(fetchXml: string): string {
        return removeXmlNode(fetchXml, "filter");
    }

    export function removeLinkedEntities(fetchXml: string) {
        return removeXmlNode(fetchXml, "link-entity");
    }

    export function removeXmlNode(xml: string, nodeName: string) {
        // Remove Empty tags i.e. <example /> or <example a="b" />
        xml = xml.replace(new RegExp(`<[\s]*${nodeName}[^/>]*\\/>`, "gm"), "");

        const startTag = "<" + nodeName;
        const endTag = `</${nodeName}>`;
        let endIndex = xml.indexOf(endTag);

        // use first end Tag to do inner search
        while (endIndex >= 0) {
            endIndex += endTag.length;
            const startIndex = xml.substring(0, endIndex).lastIndexOf(startTag);
            xml = xml.substring(0, startIndex) + xml.substring(endIndex, xml.length);
            endIndex = xml.indexOf(endTag);
        }
        return xml;
    }
}