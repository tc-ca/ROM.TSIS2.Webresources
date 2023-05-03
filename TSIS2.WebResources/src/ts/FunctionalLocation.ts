namespace ROM.FunctionalLocation {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_functionallocation.Main.Information>eContext.getFormContext();

        const ownerAttribute = form.getAttribute("ownerid")
        if (ownerAttribute != null && ownerAttribute != undefined) {

            const ownerAttributeValue = ownerAttribute.getValue();

            if (ownerAttributeValue != null && ownerAttributeValue != undefined) {

                Xrm.WebApi.retrieveRecord("systemuser", ownerAttributeValue[0].id.replace(/[{}]/g, ""), "?$select=_businessunitid_value").then(
                    function success(result) {
                        Xrm.WebApi.retrieveRecord("businessunit", result._businessunitid_value, "?$select=name").then(
                            function success(result) {
                                form.getAttribute("ts_businessunit").setValue(result.name);
                            },
                            function (error) {
                            }
                        );
                    },
                    function (error) {
                    }
                );
            }

            //If site type is aerodrome, show ICAO and IATA fields
            //If Region is not International, show Class field
            const siteTypeAttribute = form.getAttribute("ts_sitetype");
            if (siteTypeAttribute != null) {
                const siteTypeAttributeValue = form.getAttribute("ts_sitetype").getValue();
                if (siteTypeAttributeValue != null) {
                    if (siteTypeAttributeValue[0].name == "Aerodrome") {
                        form.getControl("ts_icaocode").setVisible(true);
                        form.getControl("ts_iatacode").setVisible(true);
                        const regionAttributeValue = form.getAttribute("ts_region").getValue();
                        if (regionAttributeValue != null)
                            if (regionAttributeValue[0].name != "International") {
                                form.getControl("ts_class").setVisible(true);
                            }
                    }
                }
            }

            //If owner is ISSO, replace operations view
            if (ownerAttributeValue != null) {
                if (ownerAttributeValue[0].name == "Intermodal Surface Security Oversight (ISSO)") {
                    let operationView =
                    {
                        entityType: "savedquery",
                        id: "{4361bdce-d4ae-ec11-983e-002248ade910}",
                        name: "Active Operations ISSO (Site)"
                    }
                    form.getControl("Operations").getViewSelector().setCurrentView(operationView);
                }
            }

        }

        if (form.getAttribute("ts_statusstartdate").getValue() != null) {
            form.getControl("ts_statusenddate").setDisabled(false);
            form.getControl("ts_description").setDisabled(false);
            form.getAttribute("ts_description").setRequiredLevel("required");
        }
        riskScoreVisibility(form);
        siteTypesVisibility(eContext);
    }

    export function onSave(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_functionallocation.Main.Information>eContext.getFormContext();
        const statusStartDateValue = form.getAttribute("ts_statusstartdate").getValue();
        const statusEndDateValue = form.getAttribute("ts_statusenddate").getValue();
        if (statusStartDateValue != null) {
            if (Date.parse(statusStartDateValue.toDateString()) <= Date.parse(new Date(Date.now()).toDateString())) {
                form.getAttribute("ts_sitestatus").setValue(ts_sitestatus.NonOperational);
            }
        }
        if (statusEndDateValue != null) {
            if (Date.parse(statusEndDateValue.toDateString()) <= Date.parse(new Date(Date.now()).toDateString())) {
                form.getAttribute("ts_sitestatus").setValue(ts_sitestatus.Operational);
            }
        }
    }
    export function siteTypeOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        try {
            const form = <Form.msdyn_functionallocation.Main.Information>eContext.getFormContext();
            const siteTypeAttribute = form.getAttribute("ts_sitetype");
            const icaoCodeAttribute = form.getAttribute("ts_icaocode");
            const iataCodeAttribute = form.getAttribute("ts_iatacode");
            const classAttribute = form.getAttribute("ts_class");
            if (siteTypeAttribute != null && siteTypeAttribute != undefined) {
                const siteTypeAttributeValue = siteTypeAttribute.getValue();
                if (siteTypeAttributeValue != null && siteTypeAttributeValue != undefined) {
                    if (siteTypeAttributeValue[0].id == "{99DA31E7-7D78-EB11-A812-0022486D697D}") { //aerodrome
                        form.getControl("ts_icaocode").setVisible(true)
                        form.getControl("ts_iatacode").setVisible(true)
                        const regionAttributeValue = form.getAttribute("ts_region").getValue();
                        if (regionAttributeValue != null) {
                            if (regionAttributeValue[0].name != "International") {
                                form.getControl("ts_class").setVisible(true);
                            }
                            else {
                                classAttribute.setValue() == null;
                                form.getControl("ts_class").setVisible(false);
                            }
                        }
                        else {
                            form.getControl("ts_class").setVisible(true);
                        }

                    }
                    else {
                        icaoCodeAttribute.setValue() == null;
                        iataCodeAttribute.setValue() == null;
                        classAttribute.setValue() == null;
                        form.getControl("ts_icaocode").setVisible(false)
                        form.getControl("ts_iatacode").setVisible(false)
                        form.getControl("ts_class").setVisible(false)
                    }
                }
                else {
                    icaoCodeAttribute.setValue() == null;
                    iataCodeAttribute.setValue() == null;
                    classAttribute.setValue() == null;
                    form.getControl("ts_icaocode").setVisible(false)
                    form.getControl("ts_iatacode").setVisible(false)
                    form.getControl("ts_class").setVisible(false)
                }
            }

            siteTypesVisibility(eContext);
        } catch (e) {
            throw new Error((e as any).Message);
        }
    }

    export function statusStartDateOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_functionallocation.Main.Information>eContext.getFormContext();
        if (form.getAttribute("ts_statusstartdate").getValue() != null) {
            form.getControl("ts_statusenddate").setDisabled(false);
            form.getControl("ts_description").setDisabled(false);
            form.getAttribute("ts_description").setRequiredLevel("required");
        }
        else {
            form.getAttribute("ts_description").setRequiredLevel("none");
            form.getAttribute("ts_description").setValue(null);
            form.getAttribute("ts_statusenddate").setValue(null);
            form.getControl("ts_statusenddate").setDisabled(true);
            form.getControl("ts_description").setDisabled(true);
        }
    }

    export function regionOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_functionallocation.Main.Information>eContext.getFormContext();
        const regionAttributeValue = form.getAttribute("ts_region").getValue();
        const classAttribute = form.getAttribute("ts_class");
        const siteTypeAttributeValue = form.getAttribute("ts_sitetype").getValue();
        if (siteTypeAttributeValue != null) {
            if (siteTypeAttributeValue[0].id == "{99DA31E7-7D78-EB11-A812-0022486D697D}")
                if (regionAttributeValue != null) {
                    if (regionAttributeValue[0].name != "International") { //aerodrome and not International
                        form.getControl("ts_class").setVisible(true);

                    } else {
                        classAttribute.setValue(null);
                        form.getControl("ts_class").setVisible(false);
                    }
                } else {
                    form.getControl("ts_class").setVisible(true);
                }
        }
        else {
            classAttribute.setValue(null);
            form.getControl("ts_class").setVisible(false);
        }
    }

    //Shows the Risk Score field only when the Class is 2 or 3
    function riskScoreVisibility(form: Form.msdyn_functionallocation.Main.Information) {
        const siteClass = form.getAttribute("ts_class").getValue();
        if (siteClass == ts_msdyn_functionallocation_ts_class._2 || siteClass == ts_msdyn_functionallocation_ts_class._3) {
            form.getControl("ts_riskscore").setVisible(true);
            form.getControl("ts_lpdtounitedstates").setVisible(true);
        } else {
            form.getControl("ts_riskscore").setVisible(false);
            form.getControl("ts_lpdtounitedstates").setVisible(false);
        }
    }

    export function siteTypesVisibility(eContext: Xrm.ExecutionContext<any, any>) {
        const form = <Form.msdyn_functionallocation.Main.Information>eContext.getFormContext();
        const siteType = form.getAttribute("ts_sitetype").getValue();
        if (siteType != null) {
            form.getControl("ts_sitetype2").setVisible(true);

            const siteType2 = form.getAttribute("ts_sitetype2").getValue();
            if (siteType2 != null) {
                form.getControl("ts_sitetype3").setVisible(true);
            }
            else {
                form.getControl("ts_sitetype3").setVisible(false);
            }
        }
        else {
            form.getControl("ts_sitetype2").setVisible(false);
            form.getControl("ts_sitetype3").setVisible(false);
        }
    }
    
    export function classOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_functionallocation.Main.Information>eContext.getFormContext();
        riskScoreVisibility(form);
    }
}