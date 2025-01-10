//provision parameter is a retrieved qm_legislation entity with the following selected fields (qm_name,qm_legislationlbl,qm_legislationetxt,qm_legislationftxt,_qm_tylegislationtypeid_value,_qm_rcparentlegislationid_value)
//Retrieval code example: Xrm.WebApi.retrieveMultipleRecords("qm_rclegislation", `?$select=qm_name,qm_legislationlbl,qm_legislationetxt,qm_legislationftxt,_qm_tylegislationtypeid_value,_qm_rcparentlegislationid_value&$filter=qm_name eq '${provisionName}'`)
//lang is the language id. 1033 for english, 1036 for french
async function buildLegislationText(provision, lang) {
    var provisionText = "";
    provision.qm_name = `<mark>${provision.qm_name}</mark>`;
    provisionText += await gatherLegislation(provision, lang);
    provision.qm_name = provision.qm_name.replace("<mark>", "").replace("</mark>", "");
    return provisionText;
}

async function gatherLegislation(provision, lang) {
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
    //Marginal notes display the legislation text. No name or label.
    if (provisionType == "8726bb2a-497c-eb11-a812-000d3af31ad8") {
        return `<strong><a href='#' onclick="navigateToProvision('${provision.qm_rclegislationid}')">${provisionText}</a></strong></br>`;
    }

    return `<strong><a href='#' onclick="navigateToProvision('${provision.qm_rclegislationid}')">${provision.qm_name}</a></strong>: ${provisionText}</br>`;
}


function navigateToProvision(provisionId) {
    // Logic to navigate to the specific provision
    parent.Xrm.Navigation.openForm({
        entityName: "qm_rclegislation",
        entityId: provisionId
    });
}