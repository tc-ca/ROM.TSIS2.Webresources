namespace ROM.Account {
    // Rail Safety tab visibility configuration for Account (Stakeholder) form
    const RAIL_SAFETY_VISIBLE_TABS = ["SUMMARY_TAB", "DETAILS_TAB", "tab_contacts", "Work Orders"];

    export async function onLoad(eContext: Xrm.ExecutionContext<any, any>) {
        const form = <Form.account.Main.ROMInformation>eContext.getFormContext();
        const addressControl = form.getControl("address1_composite_compositionLinkControl_address1_country");

        if (addressControl != null && addressControl != undefined) {
            addressControl.setVisible(false);
        }

        if (form.getAttribute("ts_statusstartdate").getValue() != null) {
            form.getControl("ts_statusenddate").setDisabled(false);
            form.getControl("ts_statusdescription").setDisabled(false);
            form.getAttribute("ts_statusdescription").setRequiredLevel("required");
        }

        //If owner is ISSO, replace operations view
        const ownerAttribute = form.getAttribute("ownerid")
        if (ownerAttribute != null && ownerAttribute != undefined) {
            const ownerAttributeValue = ownerAttribute.getValue();
            if (ownerAttributeValue != null) {
                const isISSOOwner = await isOwnedByISSO(ownerAttributeValue);
                if (isISSOOwner) {
                    let operationView =
                    {
                        entityType: "savedquery",
                        id: "{f3c99b02-591d-ed11-b83e-002248ae429c}",
                        name: "Active Operations"
                    }
                    form.getControl("Operations").getViewSelector().setCurrentView(operationView);
                }
            }
        }

        // Rail Safety: Detect if record is owned by Rail Safety Team and configure tab visibility
        try {
            const ownerVal = ownerAttribute?.getValue();
            if (ownerVal && ownerVal[0] && ownerVal[0].entityType === "team") {
                const isRailSafetyOwned = await isOwnedByRailSafety(ownerVal);
                if (isRailSafetyOwned) {
                    const teamName = await getTeamNameById(ownerVal[0].id);
                    console.log(`This record belongs to ${teamName}`);
                }
            }

            // Show only specific tabs for Rail Safety team members
            await applyTabVisibilityForTeam(form, TEAM_SCHEMA_NAMES.RAIL_SAFETY, RAIL_SAFETY_VISIBLE_TABS);
        } catch (e) {
            console.error("Rail Safety tab/owner check error:", e);
        }

        //Lock for non Admin users, unless the current user is a member of the ROM Rail Safety Administrator team
        (async function () {
            try {
                const isRailSafetyAdmin = await isUserInTeamByEnvVar(TEAM_SCHEMA_NAMES.ROM_RAIL_SAFETY_ADMINISTRATOR);
                if (!userHasRole("System Administrator|ROM - Business Admin") && !isRailSafetyAdmin) {
                    form.getControl("name").setDisabled(true);
                    form.getControl("ovs_legalname").setDisabled(true);
                }
                else {
                    form.getControl("ovs_accountnameenglish").setVisible(true);
                    form.getControl("ovs_accountnamefrench").setVisible(true);
                }
            } catch (err) {
                console.error("Error checking Rail Safety admin team membership:", err);
                // Fallback to original behavior if check fails
                if (!userHasRole("System Administrator|ROM - Business Admin")) {
                    form.getControl("name").setDisabled(true);
                    form.getControl("ovs_legalname").setDisabled(true);
                }
                else {
                    form.getControl("ovs_accountnameenglish").setVisible(true);
                    form.getControl("ovs_accountnamefrench").setVisible(true);
                }
            }
        })();

        //If owner is Aviation Security
        const ownerValue = form.getAttribute("ownerid").getValue();
        var isAvSec = await isOwnedByAvSec(ownerValue);
        form.ui.tabs.get("tab_Risk").setVisible(isAvSec);

        // Set owner to Rail Safety team if user is a member (on load, then save)
        await setOwnerToTeamAndSave(form, TEAM_SCHEMA_NAMES.RAIL_SAFETY);
    }

    export function onSave(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.account.Main.ROMInformation>eContext.getFormContext();
        const statusStartDateValue = form.getAttribute("ts_statusstartdate").getValue();
        const statusEndDateValue = form.getAttribute("ts_statusenddate").getValue();
        if (statusStartDateValue != null) {
            if (Date.parse(statusStartDateValue.toDateString()) <= Date.parse(new Date(Date.now()).toDateString())) {
                form.getAttribute("ts_stakeholderstatus").setValue(ts_stakeholderstatus.NonOperational);
            }
        }
        if (statusEndDateValue != null) {
            if (Date.parse(statusEndDateValue.toDateString()) <= Date.parse(new Date(Date.now()).toDateString())) {
                form.getAttribute("ts_stakeholderstatus").setValue(ts_stakeholderstatus.Operational);
            }
        }
    }

    export function regionOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.account.Main.ROMInformation>eContext.getFormContext();

        const countryAttribute = form.getAttribute("ts_country");
        const regionAttribute = form.getAttribute("msdyn_serviceterritory");
        const address1CountryAttribute = form.getAttribute("address1_country");

        if (address1CountryAttribute != null && address1CountryAttribute != undefined) {
            const regionAttributeValue = regionAttribute.getValue();
            const countryAttributeValue = countryAttribute.getValue();
            const address1CountryAttributeValue = address1CountryAttribute.getValue();

            if (regionAttributeValue != null && regionAttributeValue != undefined) {

                //Set Country to Canada if Region Is Not International
                if (regionAttributeValue[0].id != "{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}") { //International
                    var lookup = new Array();
                    lookup[0] = new Object();
                    lookup[0].id = "{208EF8A1-8E75-EB11-A812-000D3AF3FAC7}"
                    lookup[0].name = "CANADA";
                    lookup[0].entityType = "tc_country";

                    form.getAttribute("ts_country").setValue(lookup);
                    address1CountryAttribute.setValue("CANADA");
                }
                else {
                    if (countryAttributeValue != null && countryAttributeValue[0].id == "{208EF8A1-8E75-EB11-A812-000D3AF3FAC7}") { //Canada
                        countryAttribute.setValue(null);
                    }
                    if (address1CountryAttributeValue == "CANADA") {
                        address1CountryAttribute.setValue(null);
                    }
                }
            }
        }
    }

    export function countryOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.account.Main.ROMInformation>eContext.getFormContext();

        const countryAttribute = form.getAttribute("ts_country");
        const regionAttribute = form.getAttribute("msdyn_serviceterritory");
        const address1CountryAttribute = form.getAttribute("address1_country");

        if (address1CountryAttribute != null && address1CountryAttribute != undefined) {
            const regionAttributeValue = regionAttribute.getValue();
            const countryAttributeValue = countryAttribute.getValue();
            const address1CountryAttributeValue = address1CountryAttribute.getValue();

            if (countryAttributeValue != null && countryAttributeValue != undefined) {

                //Put Address1_Composite Country value to the one set in the Country field
                address1CountryAttribute.setValue(countryAttributeValue[0].name)

                //Clear and lock Region field if Country is not Canada
                if (countryAttributeValue[0].id != "{208EF8A1-8E75-EB11-A812-000D3AF3FAC7}") { //Canada
                    var lookup = new Array();
                    lookup[0] = new Object();
                    lookup[0].id = "{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}"
                    lookup[0].name = "International";
                    lookup[0].entityType = "territory";

                    regionAttribute.setValue(lookup);
                    form.getControl("msdyn_serviceterritory").setDisabled(true);
                }
                else {
                    if (regionAttributeValue != null && regionAttributeValue[0].id != "{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}") { //International
                        regionAttribute.setValue(null);
                        if (address1CountryAttributeValue == "CANADA") {
                            address1CountryAttribute.setValue(null);
                        }
                        if (countryAttribute != null && countryAttributeValue[0].id == "{208EF8A1-8E75-EB11-A812-000D3AF3FAC7}") {
                            countryAttribute.setValue(null);
                        }
                    }
                    else {
                        regionAttribute.setValue(null);
                    }
                }
            }
            else {
                address1CountryAttribute.setValue(null);
                form.getControl("msdyn_serviceterritory").setDisabled(false);
            }
        }
    }

    export function statusStartDateOnChange(eContext: Xrm.ExecutionContext<any, any>) {
        const form = <Form.account.Main.ROMInformation>eContext.getFormContext();
        const statusStartDateValue = form.getAttribute("ts_statusstartdate").getValue();
        if (statusStartDateValue != null) {
            form.getControl("ts_statusenddate").setDisabled(false);
            form.getControl("ts_statusdescription").setDisabled(false);
            form.getAttribute("ts_statusdescription").setRequiredLevel("required");
        }
        else {
            form.getAttribute("ts_statusdescription").setRequiredLevel("none");
            form.getAttribute("ts_statusdescription").setValue(null);
            form.getAttribute("ts_statusenddate").setValue(null);
            form.getControl("ts_statusenddate").setDisabled(true);
            form.getControl("ts_statusdescription").setDisabled(true);
        }

    }
}