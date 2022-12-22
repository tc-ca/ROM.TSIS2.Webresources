namespace ROM.SecurityIncident {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const formContext = <Form.ts_securityincident.Main.Information>eContext.getFormContext();

        const delaysToOperations = formContext.getAttribute("ts_delaystooperation");

        if (delaysToOperations.getValue() == ts_delaystooperation.Unknown || delaysToOperations.getValue() == null) {
            formContext.getControl("ts_delayduration").setVisible(false);
        }

        if (formContext.ui.getFormType() == 2) {
            StatusOfRailwayOwnerOnChange(eContext);

            const mode = formContext.getAttribute("ts_mode");
            if (mode.getValue() == ts_securityincidentmode.InternationalBridgesandTunnels) {
                formContext.getControl("ts_bridgeclosure").setVisible(true);
                formContext.getControl("ts_damagestoibtproperty").setVisible(true);
                formContext.getControl("ts_ruralorurban").setVisible(false);
                formContext.getControl("ts_publicorprivatecrossing").setVisible(false);
                //Retrieve IBT locations
                let ibtLocationFetchXML = [
                    "<fetch>",
                    "  <entity name='msdyn_functionallocation'>",
                    "    <filter>",
                    "       <condition attribute='ts_mode' operator='contain-values'>",
                    "           <value>717750001</value>",
                    "       </condition>",
                    "    </filter>",
                    "  </entity>",
                    "</fetch>",
                ].join("");
                //Set custom view for Site field
                const viewIBTLocationId = '{75e123a5-2d58-4642-a298-6d7e4edc089e}';
                const layoutXmlContact = '<grid name="resultset" jump="msdyn_name" select="1" icon="1" preview="1" object="10117"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="300" /><cell name="createdon" width="125" /></row></grid>';
                const viewDisplayName = "Site";
                formContext.getControl("ts_site").addCustomView(viewIBTLocationId, "msdyn_functionallocation", viewDisplayName, ibtLocationFetchXML, layoutXmlContact, true);
            }
            if (mode.getValue() == ts_securityincidentmode.AviationSecurity) {
                formContext.getControl("ts_securityincidenttype").setDefaultView("f88f3bcb-6a76-ed11-81ac-0022483d5ee0");
            }
            else {
                formContext.getControl("ts_securityincidenttype").setDefaultView("b8d91bb4-6776-ed11-81ac-0022483d5ee0");
            }
        }
    }

    export function StatusOfRailwayOwnerOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_securityincident.Main.Information>eContext.getFormContext();

        let statusOfRailwayOwner = form.getAttribute("ts_statusofrailwayowner").getValue();
        if (statusOfRailwayOwner == null || (statusOfRailwayOwner != null && statusOfRailwayOwner == ts_statusofrailwayowner.Known))
            form.getControl("ts_owneroftherailwaylinetrack").setVisible(true);
        else
            form.getControl("ts_owneroftherailwaylinetrack").setVisible(false);

        if (form.getAttribute("ts_delaystooperation").getValue() == ts_delaystooperation.Known) {
            form.getControl("ts_delayduration").setVisible(true);
        }

        if (form.getAttribute("ts_arrests").getValue() == ts_arrestsknownorunknown.Known) {
            form.getControl("ts_arrestscount").setVisible(true);
            form.getControl("ts_arrestsdetails").setVisible(true);
        }
    }

    export function delaysToOperationOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_securityincident.Main.Information>eContext.getFormContext();

        const delaysToOperations = form.getAttribute("ts_delaystooperation");

        if (delaysToOperations.getValue() == ts_delaystooperation.Known) {
            form.getControl("ts_delayduration").setVisible(true);
        }
        else if(delaysToOperations.getValue() == ts_delaystooperation.Unknown || delaysToOperations.getValue() == null) {
            form.getAttribute("ts_delayduration").setValue(null);
            form.getControl("ts_delayduration").setVisible(false);
        }
    }

    export function arrestsOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_securityincident.Main.Information>eContext.getFormContext();

        const arrests = form.getAttribute("ts_arrests");

        if (arrests.getValue() == ts_arrestsknownorunknown.Known) {
            form.getControl("ts_arrestscount").setVisible(true);
            form.getControl("ts_arrestsdetails").setVisible(true);
        }
    }

    export function modeOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.ts_securityincident.Main.Information>eContext.getFormContext();

        const mode = form.getAttribute("ts_mode");

        if (mode.getValue() == ts_securityincidentmode.InternationalBridgesandTunnels) {
            form.getControl("ts_bridgeclosure").setVisible(true);
            form.getControl("ts_damagestoibtproperty").setVisible(true);
            form.getControl("ts_ruralorurban").setVisible(false);
            form.getControl("ts_publicorprivatecrossing").setVisible(false);
            //Retrieve IBT locations
            let ibtLocationFetchXML = [
                "<fetch>",
                "  <entity name='msdyn_functionallocation'>",
                "    <filter>",
                "       <condition attribute='ts_mode' operator='contain-values'>",
                "           <value>717750001</value>",
                "       </condition>",
                "    </filter>",
                "  </entity>",
                "</fetch>",
            ].join("");
            //Set custom view for Site field
            const viewIBTLocationId = '{75e123a5-2d58-4642-a298-6d7e4edc089e}';
            const layoutXmlContact = '<grid name="resultset" jump="msdyn_name" select="1" icon="1" preview="1" object="10117"><row name="result" id="msdyn_functionallocationid"><cell name="msdyn_name" width="300" /><cell name="createdon" width="125" /></row></grid>';
            const viewDisplayName = "Site";
            form.getControl("ts_site").addCustomView(viewIBTLocationId, "msdyn_functionallocation", viewDisplayName, ibtLocationFetchXML, layoutXmlContact, true);
            form.getAttribute("ts_site").setValue(null);
        }
        else {
            form.getControl("ts_bridgeclosure").setVisible(false);
            form.getControl("ts_damagestoibtproperty").setVisible(false);
            form.getControl("ts_ruralorurban").setVisible(true);
            form.getControl("ts_publicorprivatecrossing").setVisible(true);
            // Set default view
            form.getControl("ts_site").setDefaultView("57f1ece8-04ac-4178-b2bd-cbd292d2ecc4");
            form.getAttribute("ts_site").setValue(null);
        }

        if (mode.getValue() == ts_securityincidentmode.AviationSecurity) {
            form.getControl("ts_securityincidenttype").setDefaultView("f88f3bcb-6a76-ed11-81ac-0022483d5ee0");
            form.getAttribute("ts_securityincidenttype").setValue(null);
        }
        else {
            form.getControl("ts_securityincidenttype").setDefaultView("b8d91bb4-6776-ed11-81ac-0022483d5ee0");
            form.getAttribute("ts_securityincidenttype").setValue(null);
        }
    }
}