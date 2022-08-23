namespace ROM.OperationActivity {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_operationactivity.Main.Information>eContext.getFormContext();

        const operationAttribute = form.getAttribute("ts_operation");
        const activityTypeAttribute = form.getAttribute("ts_activity");

        if(operationAttribute != null && operationAttribute != undefined && activityTypeAttribute != null && activityTypeAttribute != undefined){
            const operationAttributeValue= operationAttribute.getValue();
            const activityTypeAttributeValue= activityTypeAttribute.getValue();

            if(operationAttributeValue != null && activityTypeAttributeValue != null){
                form.ui.tabs.get("related_wos_tab").setVisible(true);

                let fetchXml = `<filter><condition attribute="msdyn_primaryincidenttype" operator="eq" value="${activityTypeAttributeValue[0].id}"/><condition attribute="ovs_operationid" operator="eq" value="${operationAttributeValue[0].id}"/><condition attribute="statecode" operator="eq" value="0" /></filter>`;

                setSubgridFilterXml(eContext, "related_wos", fetchXml);
            }
        }
    }

    export function setSubgridFilterXml(eContext: Xrm.ExecutionContext<any, any>, gridName: string, filterXml: string): void {
        const context = Xrm.Utility.getGlobalContext();
        const formContext = <Form.ts_operationactivity.Main.Information>eContext.getFormContext();

        let gridControl = formContext.getControl("related_wos");
        
        try {
            const viewId = gridControl.getViewSelector().getCurrentView().id
                .toLowerCase()
                .replace("{", "")
                .replace("}", "");
        
            //@ts-ignore    
            const view = getState(context).metadata.views[viewId];
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
                gridControl.refresh();
            }

        } catch (err) {
        }
    }

    function getState(context: Xrm.ExecutionContext<any, any>) {
        //@ts-ignore
        return (context as Context)._clientApiExecutor._store.getState();
    }

    function removeFilters(fetchXml: string): string {
        return removeXmlNode(fetchXml, "filter");
    }

    function removeLinkedEntities(fetchXml: string) {
        return removeXmlNode(fetchXml, "link-entity");
    }

    function removeXmlNode(xml: string, nodeName: string) {
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