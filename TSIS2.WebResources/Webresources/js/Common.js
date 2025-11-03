function userHasRole(rolesName) {
    var userRoles = Xrm.Utility.getGlobalContext().userSettings.roles;
    var hasRole = false;
    var roles = rolesName.split("|");
    roles.forEach(function (roleItem) {
        userRoles.forEach(function (userRoleItem) {
            if (userRoleItem.name.toLowerCase() == roleItem.toLowerCase()) hasRole = true;
        });
    });
    return hasRole;
}

//Used to lock specific fields in editable grids
function lockFields(executionContext, fields) {
    let formContext = executionContext.getFormContext();
    let planStatusValue = parent.Xrm.Page.getAttribute("ts_planstatus").getValue();
    //If Team Plannig Data set to Complete or HQReview block additional fields
    if (planStatusValue == 741130001 || planStatusValue == 447390001) {
        fields.push(
            "ts_teamestimatedduration",
            "ts_planningdetail",
            "ts_details",
            "ts_plannedq1",
            "ts_plannedq2",
            "ts_plannedq3",
            "ts_plannedq4"
        );
    }

    if (formContext) {
        let entity = formContext.data.entity;
        entity.attributes.forEach(function (attribute, i) {
            if (fields.indexOf(attribute.getName()) > -1) {
                let attributeToDisable = attribute.controls.get(0);
                attributeToDisable.setDisabled(true);
            }
        });
    }
}
//Used to lock specific fields in editable grids
function lockFieldsInspectorHoursEditableGrid(executionContext) {
    let formContext = executionContext.getFormContext();
    fields = ["ts_varianceq1", "ts_varianceq2", "ts_varianceq3", "ts_varianceq4"];
    let planStatusValue = parent.Xrm.Page.getAttribute("ts_planstatus").getValue();
    //If Team Plannig Data set to Complete or HQReview block fields
    if (planStatusValue == 741130001 || planStatusValue == 447390001) {
        if (formContext) {
            let entity = formContext.data.entity;
            entity.attributes.forEach(function (attribute, i) {
                if (fields.indexOf(attribute.getName()) > -1) {
                    let attributeToDisable = attribute.controls.get(0);
                    attributeToDisable.setDisabled(true);
                }
            });
        }
    }
}

//Used to lock specific fields in editable grids
function lockFieldsDutyInspectorsEditableGrid(executionContext) {
    let formContext = executionContext.getFormContext();
    fields = ["ts_startdate", "ts_enddate"];
    if (formContext) {
        let entity = formContext.data.entity;
        entity.attributes.forEach(function (attribute, i) {
            if (fields.indexOf(attribute.getName()) > -1) {
                let attributeToDisable = attribute.controls.get(0);
                attributeToDisable.setDisabled(true);
            }
        });
    }
}
function showButtonBasedOnPlanStatus(primaryControl) {
    var formContext = primaryControl;
    let planStatusValue = formContext.getAttribute("ts_planstatus").getValue();
    return !(planStatusValue == 741130001 || planStatusValue == 447390001);
}
function isFormTypeCreate() {
    return Xrm.Page.ui.getFormType() == 1;
}

function isFormTypeUpdate() {
    return Xrm.Page.ui.getFormType() == 2;
}

function openLookupModalDialogWOForm(executionContext) {
    var formContext = executionContext.getFormContext();

    formContext.getControl("msdyn_workordertype").addOnLookupTagClick(onLookupClick);
    formContext.getControl("ts_region").addOnLookupTagClick(onLookupClick);
    formContext.getControl("ovs_operationtypeid").addOnLookupTagClick(onLookupClick);
    formContext.getControl("ts_tradenameid").addOnLookupTagClick(onLookupClick);
    formContext.getControl("msdyn_serviceaccount").addOnLookupTagClick(onLookupClick);
    formContext.getControl("ts_site").addOnLookupTagClick(onLookupClick);
}

function openLookupModalDialogCaseForm(executionContext) {
    var formContext = executionContext.getFormContext();

    formContext.getControl("ovs_region").addOnLookupTagClick(onLookupClick);
    formContext.getControl("ts_tradenameid").addOnLookupTagClick(onLookupClick);
    formContext.getControl("customerid").addOnLookupTagClick(onLookupClick);
    formContext.getControl("msdyn_functionallocation").addOnLookupTagClick(onLookupClick);
}

function openLookupModalDialogFindingForm(executionContext) {
    var formContext = executionContext.getFormContext();

    formContext.getControl("ts_operationid").addOnLookupTagClick(onLookupClick);
    formContext.getControl("ts_accountid").addOnLookupTagClick(onLookupClick);
    formContext.getControl("ts_ovs_operationtype").addOnLookupTagClick(onLookupClick);
    formContext.getControl("ts_functionallocation").addOnLookupTagClick(onLookupClick);
    formContext.getControl("ts_qm_rclegislation").addOnLookupTagClick(onLookupClick);
}

function openLookupModalDialogEmailForm(executionContext) {
    var formContext = executionContext.getFormContext();

    formContext.getControl("from").addOnLookupTagClick(onLookupClick);
    formContext.getControl("to").addOnLookupTagClick(onLookupClick);
}

function openLookupModalDialogSecurityIncidentForm(executionContext) {
    var formContext = executionContext.getFormContext();

    formContext.getControl("ts_securityincidenttype").addOnLookupTagClick(onLookupClick);
    formContext.getControl("ts_reportingcompany").addOnLookupTagClick(onLookupClick);
    formContext.getControl("ts_stakeholder").addOnLookupTagClick(onLookupClick);
    formContext.getControl("ts_region").addOnLookupTagClick(onLookupClick);
    formContext.getControl("ts_site").addOnLookupTagClick(onLookupClick);
}
function onLookupClick(executionContext) {
    executionContext.getEventArgs().preventDefault();
    var record = executionContext.getEventArgs().getTagValue();
    Xrm.Navigation.navigateTo(
        {
            pageType: "entityrecord",
            entityName: record.entityType,
            entityId: record.id,
        },
        {
            target: 2,
            position: 2,
            width: {
                value: 30,
                unit: "%",
            },
        }
    );
}

function setOwnerToUserBusinessUnit(formContext) {
    const ownerAttribute = formContext.getAttribute("ownerid");
    let userId = Xrm.Utility.getGlobalContext().userSettings.userId;
    let currentUserBusinessUnitFetchXML = [
        "<fetch top='1'>",
        "  <entity name='businessunit'>",
        "    <attribute name='name' />",
        "    <attribute name='businessunitid' />",
        "    <link-entity name='systemuser' from='businessunitid' to='businessunitid'>",
        "      <filter>",
        "        <condition attribute='systemuserid' operator='eq' value='",
        userId,
        "'/>",
        "      </filter>",
        "    </link-entity>",
        "  </entity>",
        "</fetch>",
    ].join("");
    currentUserBusinessUnitFetchXML = "?fetchXml=" + encodeURIComponent(currentUserBusinessUnitFetchXML);
    Xrm.WebApi.retrieveMultipleRecords("businessunit", currentUserBusinessUnitFetchXML).then(function success(
        businessunit
    ) {
        if (!businessunit.entities[0].name.startsWith("Transport")) {
            let teamFetchXML = [
                "<fetch top='1'>",
                "  <entity name='team'>",
                "    <attribute name='name' />",
                "    <attribute name='teamid' />",
                "    <filter>",
                "      <condition attribute='name' operator='eq' value='",
                businessunit.entities[0].name,
                "'/>",
                "    </filter>",
                "  </entity>",
                "</fetch>",
            ].join("");
            teamFetchXML = "?fetchXml=" + encodeURIComponent(teamFetchXML);
            Xrm.WebApi.retrieveMultipleRecords("team", teamFetchXML).then(function success(team) {
                if (team.entities.length > 0) {
                    const headerOwnerIdControl = formContext.getControl("header_ownerid");
                    if (headerOwnerIdControl) {
                        headerOwnerIdControl.clearNotification("error");
                    }

                    const ownerIdControl = formContext.getControl("ownerid");
                    if (ownerIdControl) {
                        ownerIdControl.clearNotification("error");
                    }

                    ownerAttribute.setValue([
                        {
                            entityType: "team",
                            name: `${team.entities[0].name}`,
                            id: `${team.entities[0].teamid}`,
                        },
                    ]);
                }
            });
        }
    });
}

function showFieldWarningMessageIfOwnerIsNotISSONorAvSec(formContext) {
    const ownerAttributeValue = formContext.getAttribute("ownerid").getValue();

    if (ownerAttributeValue && ownerAttributeValue[0].name) {
        if (!ownerAttributeValue[0].name.startsWith("Aviation") && !ownerAttributeValue[0].name.startsWith("Intermodal")) {
            const warningMessage = Xrm.Utility.getResourceString("ts_/resx/Common", "WarningMessageText");

            const headerOwnerIdControl = formContext.getControl("header_ownerid");
            if (headerOwnerIdControl) {
                headerOwnerIdControl.setNotification(warningMessage, "error");
            }

            const ownerIdControl = formContext.getControl("ownerid");
            if (ownerIdControl) {
                ownerIdControl.setNotification(warningMessage, "error");
            }

            return true;
        } else {
            const headerOwnerIdControl = formContext.getControl("header_ownerid");
            if (headerOwnerIdControl) {
                headerOwnerIdControl.clearNotification("error");
            }

            const ownerIdControl = formContext.getControl("ownerid");
            if (ownerIdControl) {
                ownerIdControl.clearNotification("error");
            }
        }
    }
    return false;
}

function isUserInTeam(userId, teamId) {
    const fetchXml = [
        "<fetch distinct='false' mapping='logical'>",
        "  <entity name='team'>",
        "    <attribute name='name' />",
        "    <attribute name='teamid' />",
        "    <filter type='and'>",
        "      <condition attribute='teamtype' operator='ne' value='1' />",
        "      <condition attribute='teamid' operator='eq' value='",
        teamId,
        "' />",
        "    </filter>",
        "    <link-entity name='teammembership' intersect='true' visible='false' to='teamid' from='teamid'>",
        "      <link-entity name='systemuser' from='systemuserid' to='systemuserid' alias='bb'>",
        "        <filter type='and'>",
        "          <condition attribute='systemuserid' operator='eq' value='",
        userId,
        "' />",
        "        </filter>",
        "      </link-entity>",
        "    </link-entity>",
        "  </entity>",
        "</fetch>",
    ].join("");

    return new Promise((resolve, reject) => {
        Xrm.WebApi.retrieveMultipleRecords("team", "?fetchXml=" + encodeURIComponent(fetchXml))
            .then(function success(result) {
                resolve(result.entities.length > 0);
            })
            .catch(function error(err) {
                console.error("Error checking team membership:", err);
                reject(err);
            });
    });

}

/**
* Get the value of an environment variable
* @param {string} variableName - Schema name of the environment variable
* @param {function} callback - Function to call with the value
*/
function getEnvironmentVariableByName(variableName, callback) {
    var fetchXML = `
        <fetch top="1">
            <entity name="environmentvariablevalue">
                <attribute name="value" />
                <link-entity name="environmentvariabledefinition" 
                             to="environmentvariabledefinitionid" 
                             from="environmentvariabledefinitionid" 
                             alias="definition">
                    <filter>
                        <condition attribute="schemaname" operator="eq" value="${variableName}" />
                    </filter>
                </link-entity>
            </entity>
        </fetch>
    `;

    var encodedFetchXml = encodeURIComponent(fetchXML);

    Xrm.WebApi.retrieveMultipleRecords("environmentvariablevalue", "?fetchXml=" + encodedFetchXml)
        .then(function (result) {
            if (result.entities.length > 0 && result.entities[0].value !== undefined) {
                callback(result.entities[0].value);
            } else {
                console.warn(`Environment variable '${variableName}' not found or has no value.`);
                callback(null);
            }
        })
        .catch(function (error) {
            console.error("Error retrieving environment variable '" + variableName + "': " + error.message);
            callback(null);
        });
}

/**
 * Toggle a section in a tab based on the environment variable ts_TurnoffDocumentCentre
 * @param {Xrm.ExecutionContext} executionContext - Form execution context
 * @param {string} tabName - Name of the tab to toggle
 * @param {string} sectionName - Name of the section to toggle
 */
function toggleDocumentCenter(executionContext, tabName, sectionName) {
    var form = executionContext.getFormContext();

    getEnvironmentVariableByName("ts_TurnoffDocumentCentre", function (value) {
        var section = form.ui.tabs.get(tabName)?.sections.get(sectionName);
        if (!section) {
            console.warn(`Tab or section not found: ${tabName}, ${sectionName}`);
            return;
        }

        if (value === "yes") {
            section.setVisible(false);
            console.log("Turn off the Document Centre");
        } else if (value === "no") {
            section.setVisible(true);
            form.getControl("WebResource_NewDocumentCenterNotice")?.setVisible(false);
            console.log("Don't turn off the Document Centre");
        } else {
            console.log("Variable not found or invalid");
        }
    });
}

