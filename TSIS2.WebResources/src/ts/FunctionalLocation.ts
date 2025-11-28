namespace ROM.FunctionalLocation {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_functionallocation.Main.Information>eContext.getFormContext();

        // Show only Summary and Work Orders tabs, hide all others
        const tabs = form.ui.tabs.get();
        const tabsToShow = ["tab_3", "Work Orders"]; // Summary and Work Orders
        
        tabs.forEach(function(tab: any) {
            try {
                const tabName = tab.getName();
                if (tabsToShow.includes(tabName)) {
                    tab.setVisible(true);
                } else {
                    tab.setVisible(false);
                }
            } catch (e) {
                // Tab error, skip
            }
        });

        const ownerAttribute = form.getAttribute("ownerid")
        if (ownerAttribute != null && ownerAttribute != undefined) {

            const ownerAttributeValue = ownerAttribute.getValue();

            if (ownerAttributeValue != null && ownerAttributeValue != undefined && ownerAttributeValue[0].entityType == "systemuser") {
                var targetId = ownerAttributeValue[0].id.replace(/[{}]/g, "");
                var isOffline = Xrm.Utility.getGlobalContext().client.getClientState() === "Offline";
                if (isOffline) {
                    form.ui.setFormNotification("Offline: get system user ", "INFO", "offline-operation");
                    Xrm.WebApi.offline.retrieveRecord("systemuser", targetId, "?$select=_businessunitid_value").then(
                        function success(result) {
                            Xrm.WebApi.offline.retrieveRecord("businessunit", result._businessunitid_value, "?$select=name").then(
                                function success(result) {
                                    form.getAttribute("ts_businessunit").setValue(result.name);
                                    form.ui.setFormNotification("Offline: get BU ", "INFO", "offline-operation");
                                },
                                function (error) {
                                    form.ui.setFormNotification("Offline: ERROR  " + JSON.stringify(error), "ERROR", "offline-error");
                                }
                            );
                        },
                        function (error) {
                            form.ui.setFormNotification("Offline: ERROR  " + JSON.stringify(error), "ERROR", "offline-error");
                        }
                    );
                }
                else {
                    Xrm.WebApi.retrieveRecord("systemuser", targetId, "?$select=_businessunitid_value").then(
                        function success(result) {
                            Xrm.WebApi.retrieveRecord("businessunit", result._businessunitid_value, "?$select=name").then(
                                function success(result) {
                                    form.getAttribute("ts_businessunit").setValue(result.name);
                                },
                                function (error) {
                                    form.ui.setFormNotification("Online: ERROR get BU - " + JSON.stringify(error), "ERROR", "online-error");
                                }
                            );
                        },
                        function (error) {
                            form.ui.setFormNotification("Online: ERROR  get user - " + JSON.stringify(error), "ERROR", "online-error");
                        }
                    );
                }
            }

            // Detect if the record is owned by the Rail Safety Team
            if (ownerAttributeValue != null && ownerAttributeValue != undefined && ownerAttributeValue[0].entityType == "team") {
                checkIfOwnedByRailSafetyTeam(ownerAttributeValue[0].id);
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
                (async function () {
                    const isISSO = await isOwnedByISSO(ownerAttributeValue);
                    if (isISSO) {
                        let operationView =
                        {
                            entityType: "savedquery",
                            id: "{4361bdce-d4ae-ec11-983e-002248ade910}",
                            name: "Active Operations"
                        }
                        form.getControl("Operations").getViewSelector().setCurrentView(operationView);

                        form.getControl("ts_siteriskrating").setVisible(false);
                    }
                })();
            }

            //If owner is Aviation Security
            if (ownerAttributeValue != null) {
                (async function () {
                    const isAvSec = await isOwnedByAvSec(ownerAttributeValue);
                    if (isAvSec) {
                        form.ui.tabs.get("tab_Risk").setVisible(true);
                        form.getControl("ts_accountableteam").setVisible(true);
                        form.getAttribute("ts_accountableteam").setRequiredLevel("required");
                    }
                    else {
                        form.ui.tabs.get("tab_Risk").setVisible(false);
                    }
                })();
            }
        }

        if (form.getAttribute("ts_statusstartdate").getValue() != null) {
            form.getControl("ts_statusenddate").setDisabled(false);
            form.getControl("ts_description").setDisabled(false);
            form.getAttribute("ts_description").setRequiredLevel("required");
        }
        riskScoreVisibility(form);
        siteTypesVisibility(eContext);

        // Check if user should be assigned to Rail Safety Team on load
        checkAndSetRailSafetyTeamOwnerOnLoad(form).catch((error) => {
            console.error("Error in checkAndSetRailSafetyTeamOwnerOnLoad:", error);
        });

        //Lock for non Admin users
        if (!userHasRole("System Administrator|ROM - Business Admin")) {
            form.getControl("msdyn_name").setDisabled(true);
            form.getControl("ts_functionallocationnameenglish").setDisabled(true);
            form.getControl("ts_functionallocationnamefrench").setDisabled(true);
        }
    }

    // Check if record is owned by Rail Safety Team
    async function checkIfOwnedByRailSafetyTeam(ownerId: string): Promise<void> {
        try {
            const railSafetyTeamGuid = await GetEnvironmentVariableValue("ts_RailSafetyTeamGUID");

            if (!railSafetyTeamGuid) {
                return;
            }

            const cleanOwnerId = ownerId.replace(/[{}]/g, "").toLowerCase();
            const cleanRailSafetyTeamGuid = railSafetyTeamGuid.replace(/[{}]/g, "").toLowerCase();

            if (cleanOwnerId === cleanRailSafetyTeamGuid) {
                console.log("This record belongs to Rail Safety");
            }
        } catch (error) {
            console.error("Error checking Rail Safety Team ownership:", error);
        }
    }

    export function IATACodeOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_functionallocation.Main.Information>eContext.getFormContext();
        const iataValue = form.getAttribute("ts_iatacode").getValue();

        form.getControl("ts_iatacode").clearNotification("iata_length_error");

        if (iataValue != null) {
            if (iataValue.length !== 3) {
                form.getControl("ts_iatacode").setNotification("IATA code must be exactly 3 characters.", "iata_length_error");
                eContext.getEventArgs() && eContext.getEventArgs().preventDefault();
            }
        }
    }

    export function ICAOCodeOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_functionallocation.Main.Information>eContext.getFormContext();
        const icaoValue = form.getAttribute("ts_icaocode").getValue();

        form.getControl("ts_icaocode").clearNotification("icao_length_error");

        if (icaoValue != null) {
            if (icaoValue.length !== 4) {
                form.getControl("ts_icaocode").setNotification("ICAO code must be exactly 4 characters.", "icao_length_error");
                eContext.getEventArgs() && eContext.getEventArgs().preventDefault();
            }
        }
    }

    export async function onSave(eContext: Xrm.ExecutionContext<any, any>): Promise<void> {
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

    // Set owner to Rail Safety Team if user is member (called on form load)
    async function checkAndSetRailSafetyTeamOwnerOnLoad(form: Form.msdyn_functionallocation.Main.Information): Promise<void> {
        try {
            const railSafetyTeamGuid = await GetEnvironmentVariableValue("ts_RailSafetyTeamGUID");

            if (!railSafetyTeamGuid) {
                return;
            }

            const currentOwner = form.getAttribute("ownerid").getValue();

            // Check if already owned by Rail Safety Team
            if (currentOwner != null && currentOwner[0].entityType === "team") {
                const currentOwnerId = currentOwner[0].id.replace(/[{}]/g, "").toLowerCase();
                const cleanRailSafetyTeamGuid = railSafetyTeamGuid.replace(/[{}]/g, "").toLowerCase();
                if (currentOwnerId === cleanRailSafetyTeamGuid) {
                    return;
                }
            }

            const userId = Xrm.Utility.getGlobalContext().userSettings.userId.replace(/[{}]/g, "");
            
            const isUserInRailSafetyTeam = await checkUserTeamMembership(userId, railSafetyTeamGuid);

            if (isUserInRailSafetyTeam) {
                const teamName = await getTeamName(railSafetyTeamGuid);
                
                const teamLookup: any = [
                    {
                        id: railSafetyTeamGuid,
                        entityType: "team",
                        name: teamName
                    }
                ];
                
                const ownerIdAttr = form.getAttribute("ownerid");
                if (ownerIdAttr != null) {
                    ownerIdAttr.setValue(teamLookup);
                    
                    // Trigger save event
                    form.data.save().then(
                        function() {
                            // Save successful
                        },
                        function(error) {
                            console.error("Error saving Rail Safety Team owner:", error);
                        }
                    );
                }
            }
        } catch (error) {
            console.error("Error in checkAndSetRailSafetyTeamOwnerOnLoad:", error);
        }
    }

    // Helper: Check if user is member of specific team
    async function checkUserTeamMembership(userId: string, teamId: string): Promise<boolean> {
        try {
            const cleanUserId = userId.replace(/[{}]/g, "");
            const cleanTeamId = teamId.replace(/[{}]/g, "");

            const fetchXml = [
                "<fetch top='1'>",
                "  <entity name='teammembership'>",
                "    <attribute name='teammembershipid'/>",
                "    <filter type='and'>",
                "      <condition attribute='systemuserid' operator='eq' value='", cleanUserId, "'/>",
                "      <condition attribute='teamid' operator='eq' value='", cleanTeamId, "'/>",
                "    </filter>",
                "  </entity>",
                "</fetch>"
            ].join("");

            const encodedFetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
            const result = await Xrm.WebApi.retrieveMultipleRecords("teammembership", encodedFetchXml);
            
            const isMember = result.entities.length > 0;
            return isMember;
        } catch (error) {
            return false;
        }
    }

    // Helper: Get environment variable value
    async function GetEnvironmentVariableValue(name: string): Promise<string | null> {
        try {
            const query = `?$filter=schemaname eq '${name}'&$select=environmentvariabledefinitionid&$expand=environmentvariabledefinition_environmentvariablevalue($select=value)`;
            
            const results = await Xrm.WebApi.retrieveMultipleRecords(
                "environmentvariabledefinition",
                query
            );

            if (!results || !results.entities || results.entities.length < 1) {
                return null;
            }
            const variable = results.entities[0];
            
            if (!variable.environmentvariabledefinition_environmentvariablevalue ||
                variable.environmentvariabledefinition_environmentvariablevalue.length < 1) {
                return null;
            }

            const value = variable.environmentvariabledefinition_environmentvariablevalue[0].value;
            return value;
        } catch (error) {
            return null;
        }
    }

    // Helper: Get team name by team ID
    async function getTeamName(teamId: string): Promise<string | null> {
        try {
            const cleanTeamId = teamId.replace(/[{}]/g, "");

            const result = await Xrm.WebApi.retrieveRecord("team", cleanTeamId, "?$select=name");
            const teamName = result.name;
            return teamName;
        } catch (error) {
            return null;
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


    export function onOwnerChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_functionallocation.Main.Information>eContext.getFormContext();

        // Get the owner field value
        const ownerAttributeValue = form.getAttribute("ownerid").getValue();

        // If owner is Aviation Security, make the ts_accountableteam field required and visible
        if (ownerAttributeValue != null) {
            (async function () {
                const isAvSec = await isOwnedByAvSec(ownerAttributeValue);
                if (isAvSec) {
                    form.getControl("ts_accountableteam").setVisible(true);
                    form.getAttribute("ts_accountableteam").setRequiredLevel("required");
                } else {
                    form.getControl("ts_accountableteam").setVisible(false);
                    form.getAttribute("ts_accountableteam").setRequiredLevel("none");
                }
            })();
        }
        else {
            // If owner is null, hide and unrequire the ts_accountableteam field
            form.getControl("ts_accountableteam").setVisible(false);
            form.getAttribute("ts_accountableteam").setRequiredLevel("none");
            form.getAttribute("ts_accountableteam").setValue(null);
        }
    }
}