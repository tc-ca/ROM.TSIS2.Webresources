//provision parameter is a retrieved qm_legislation entity with the following selected fields (qm_name,qm_legislationlbl,qm_legislationetxt,qm_legislationftxt,_qm_tylegislationtypeid_value,_qm_rcparentlegislationid_value)
//Retrieval code example: Xrm.WebApi.retrieveMultipleRecords("qm_rclegislation", `?$select=qm_name,qm_legislationlbl,qm_legislationetxt,qm_legislationftxt,_qm_tylegislationtypeid_value,_qm_rcparentlegislationid_value&$filter=qm_name eq '${provisionName}'`)
//lang is the language id. 1033 for english, 1036 for french
async function buildProvisionText(provision, lang) {
    var provisionText = "";
    provision.qm_name = `<mark>${provision.qm_name}</mark>`;
    provisionText += await gatherAncestorProvisionText(provision, lang);
    provisionText += await gatherDescendentProvisionText(provision, lang);
    provision.qm_name = provision.qm_name.replace("<mark>", "").replace("</mark>", "");
    return provisionText;
}

async function gatherAncestorProvisionText(provision, lang) {
    //If language is French, use the french text if it exists, else use English. Empty string if it's null.
    let provisionText = "";
    if (lang == 1036) {
        if (provision.qm_legislationftxt) {
            provisionText = provision.qm_legislationftxt;
        } else if (provision.qm_legislationetxt) {
            provisionText = "(fr)" + provision.qm_legislationetxt;
        }
    } else {
        provisionText = provision.qm_legislationetxt || "";
    }
    let provisionType = provision["_qm_tylegislationtypeid_value"];

    //Base case. Body provisions don't have any text to display.
    if (provisionType == "b1015ef4-d729-eb11-a813-000d3af3a7a7") {
        return "";
    }
    //Base case. Headings are bold, and show the provision text.
    if (provisionType == "1829d66a-962b-eb11-a813-000d3af3fc19") {
        return `<strong><a href='#' onclick="navigateToProvision('${provision.qm_rclegislationid}')">${provisionText}</a></strong></br>`;
    }

    let parent = await getParentProvision(provision);

    //Marginal notes display the legislation text. No name or label.
    if (provisionType == "8726bb2a-497c-eb11-a812-000d3af31ad8") {
        return await gatherAncestorProvisionText(parent, lang) + `<strong><a href='#' onclick="navigateToProvision('${provision.qm_rclegislationid}')">${provisionText}</a></strong></br>`;
    }
    
    return await gatherAncestorProvisionText(parent, lang) + `<strong><a href='#' onclick="navigateToProvision('${provision.qm_rclegislationid}')">${provision.qm_name}</a></strong>: ${provisionText}</br>`;
}

async function gatherDescendentProvisionText(provision, lang) {
    let children = await getChildrenProvisions(provision);
    //Base case. Provision has no children.
    if (children.length == 0) {
        return "";
    }
    let provisionText = "<ul style='list-style-type:none;'>";
    for (var i in children) {
        //If language is French, use the french text, else use English. Empty string if it's null.
        let childText = "";
        if (lang == 1036) {
            if (children[i].qm_legislationftxt) {
                childText = children[i].qm_legislationftxt;
            } else if (children[i].qm_legislationetxt) {
                childText = "(fr)" + children[i].qm_legislationetxt;
            }
        } else {
            childText = children[i].qm_legislationetxt || "";
        }

        let provisionType = children[i][`_qm_tylegislationtypeid_value`];

        //Special case for marginal notes. Show the legislation text with no label.
        if (provisionType == "8726bb2a-497c-eb11-a812-000d3af31ad8" || children[i].qm_legislationlbl==null) {
            provisionText += `<li><strong><a href='#' onclick="navigateToProvision('${children[i].qm_rclegislationid}')">${childText}</a></strong></li>` +
                await gatherDescendentProvisionText(children[i], lang);
        } else {
            provisionText += `<li><strong><a href='#' onclick="navigateToProvision('${children[i].qm_rclegislationid}')">${children[i].qm_legislationlbl}</a></strong> ${childText}</li>` +
                await gatherDescendentProvisionText(children[i], lang);
        }
    }
    provisionText += "</ul>";
    return provisionText;
}

// Navigation function to handle link clicks
function navigateToProvision(provisionId) {
    // Logic to navigate to the specific provision
    parent.Xrm.Navigation.openForm({
        entityName: "qm_rclegislation",
        entityId: provisionId
    });
}

async function getParentProvision(provision) {
    var result = await parent.Xrm.WebApi.retrieveRecord("qm_rclegislation", provision._qm_rcparentlegislationid_value, `?$select=qm_name,qm_legislationlbl,qm_legislationetxt,qm_legislationftxt,_qm_tylegislationtypeid_value,_qm_rcparentlegislationid_value`);
    return result;
}

async function getSiblingProvisions(provision) {
    var results = await parent.Xrm.WebApi.retrieveMultipleRecords("qm_rclegislation", `?$select=qm_name,qm_legislationlbl,qm_legislationetxt,qm_legislationftxt,_qm_tylegislationtypeid_value,_qm_rcparentlegislationid_value,ts_ordernbr&$filter=_qm_rcparentlegislationid_value eq '${provision._qm_rcparentlegislationid_value}'`);
    return sortProvisions(results.entities);
}

async function getChildrenProvisions(provision) {
    var results = await parent.Xrm.WebApi.retrieveMultipleRecords("qm_rclegislation", `?$select=qm_name,qm_legislationlbl,qm_legislationetxt,qm_legislationftxt,_qm_tylegislationtypeid_value,_qm_rcparentlegislationid_value,ts_ordernbr&$filter=_qm_rcparentlegislationid_value eq '${provision.qm_rclegislationid}'`);
    return sortProvisions(results.entities);
}

//Returns a sorted array of provisions using the provision's order number.
//Places provisions with no order number at the end without changing the order they came.
function sortProvisions(provisionArray) {
    var hasOrderNumber = [];
    var noOrderNumber = [];

    //Split the provisions based on if they have an order number to sort with
    provisionArray.forEach(provision => {
        if (provision.ts_ordernbr != null) {
            hasOrderNumber.push(provision);
        } else {
            noOrderNumber.push(provision);
        }
    });
    //Sort the provisions with order numbers
    hasOrderNumber.sort(function (a, b) { return a.ts_ordernbr - b.ts_ordernbr });
    //Add the unsorted provisions to the end of the sorted array
    sortedProvisions = hasOrderNumber.concat(noOrderNumber);
    return sortedProvisions;
}