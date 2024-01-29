export function recalculateRiskScore(formContext) {
    //For this to work Offline, we have to avoid using retrieveMultiple
    //retrieveRecord using a guid will work, and the guids can be accessed from the subgrid on the form
    //Retrieve all related Risk Criteria Responses, expand the choice with weight
}