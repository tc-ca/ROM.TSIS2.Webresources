//provision parameter is a retrieved qm_legislation entity with the following selected fields (qm_name,qm_legislationlbl,qm_legislationetxt,qm_legislationftxt,_qm_tylegislationtypeid_value,_qm_rcparentlegislationid_value)
//Retrieval code example: Xrm.WebApi.retrieveMultipleRecords("qm_rclegislation", `?$select=qm_name,qm_legislationlbl,qm_legislationetxt,qm_legislationftxt,_qm_tylegislationtypeid_value,_qm_rcparentlegislationid_value&$filter=qm_name eq '${provisionName}'`)
//lang is the language id. 1033 for english, 1036 for french
async function buildProvisionText(provision, lang) {
    var provisionText = "";
    provision.qm_name = `<mark>${provision.qm_name}</mark>`;
    provisionText += await gatherAncestorProvisionText(provision, lang);
    provisionText += await gatherDescendentProvisionText(provision, lang);
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
    let provisionType = provision[`_qm_tylegislationtypeid_value@OData.Community.Display.V1.FormattedValue`];

    //Base case. Body provisions don't have any text to display.
    if (provisionType == "Body") {
        return "";
    }
    //Base case. Headings are bold, and show the provision text.
    if (provisionType == "Heading") {
        return `<strong>${provisionText}</strong></br>`;
    }

    let parent = await getParentProvision(provision);

    //Marginal notes display the legislation text. No name or label.
    if (provisionType == "Marginal Note") {
        return await gatherAncestorProvisionText(parent, lang) + `<strong>${provisionText}</strong></br>`;
    }
    
    return await gatherAncestorProvisionText(parent, lang) + `<strong>${provision.qm_name}</strong>: ${provisionText}</br>`;
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

        let provisionType = children[i][`_qm_tylegislationtypeid_value@OData.Community.Display.V1.FormattedValue`];

        //Special case for marginal notes. Show the legislation text with no label.
        if (provisionType == "Marginal Note") {
            provisionText += `<li><strong>${childText}</strong></li>` + await gatherDescendentProvisionText(children[i], lang);
        } else {
            provisionText += `<li><strong>${children[i].qm_legislationlbl}</strong> ${childText}</li>` + await gatherDescendentProvisionText(children[i], lang);
        }
    }
    provisionText += "</ul>";
    return provisionText;
}

async function getParentProvision(provision) {
    var result = await parent.Xrm.WebApi.retrieveRecord("qm_rclegislation", provision._qm_rcparentlegislationid_value, `?$select=qm_name,qm_legislationlbl,qm_legislationetxt,qm_legislationftxt,_qm_tylegislationtypeid_value,_qm_rcparentlegislationid_value`);
    return result;
}

async function getSiblingProvisions(provision) {
    var results = await parent.Xrm.WebApi.retrieveMultipleRecords("qm_rclegislation", `?$select=qm_name,qm_legislationlbl,qm_legislationetxt,qm_legislationftxt,_qm_tylegislationtypeid_value,_qm_rcparentlegislationid_value,qm_ordernbr&$filter=_qm_rcparentlegislationid_value eq '${provision._qm_rcparentlegislationid_value}'`);
    //results.entities.sort(function(a,b){return a.qm_ordernbr - b.qm_ordernbr});
    return results.entities;
}

async function getChildrenProvisions(provision) {
    var results = await parent.Xrm.WebApi.retrieveMultipleRecords("qm_rclegislation", `?$select=qm_name,qm_legislationlbl,qm_legislationetxt,qm_legislationftxt,_qm_tylegislationtypeid_value,_qm_rcparentlegislationid_value,qm_ordernbr&$filter=_qm_rcparentlegislationid_value eq '${provision.qm_rclegislationid}'`);
    //results.entities.sort(function(a,b){return a.qm_ordernbr - b.qm_ordernbr});
    return results.entities;
} 