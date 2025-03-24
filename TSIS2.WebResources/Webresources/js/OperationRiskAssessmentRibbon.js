//For this to work offline, RetrieveMultiple must be avoided
//To get around this, we can get the guids of the related Response records through the subgrid and retrieve each individually
async function recalculateRiskScore(formContext) {
    Xrm.Utility.showProgressIndicator();
    let RiskScoreSet = false;
    let DiscretionaryScoreSet = false;
    let calculationLog = "";
    let operationriskassessmentId = Xrm.Page.data.entity.getId();

    //Calculate and set Risk Score
    //const RiskResponseGrid = formContext.getControl("Subgrid_Risk_Criteria_Responses");
    //const RiskResponseRows = RiskResponseGrid.getGrid().getRows();
    const RiskCriteriaRetrievals = [];
    let RiskResponseRows = await Xrm.WebApi.retrieveMultipleRecords("ts_riskcriteriaresponse", "?$select=ts_riskcriteriaresponseid&$filter=_ts_operationriskassessment_value eq " + operationriskassessmentId);

    if (RiskResponseRows.entities.length > 0) {
        for (let i = 0; i < RiskResponseRows.entities.length; i++) {
            //let RiskResponseRow = RiskResponseRows.get(i).getData();
            RiskCriteriaRetrievals.push(Xrm.WebApi.retrieveRecord("ts_riskcriteriaresponse", RiskResponseRows.entities[i].ts_riskcriteriaresponseid, "?$select=ts_riskcriteriaoption,ts_name&$expand=ts_riskcriteriaoption($select=ts_weight,ts_name)").then(
                function success(result) {
                    if (result.ts_riskcriteriaoption != null) {
                        if (result.ts_riskcriteriaoption.ts_weight != isNaN) {
                            calculationLog += `Risk Criteria "${result.ts_name}" with option "${result.ts_riskcriteriaoption.ts_name}" has a weight of ${result.ts_riskcriteriaoption.ts_weight} \n`;
                            return result.ts_riskcriteriaoption.ts_weight
                        }
                    } else {
                        calculationLog += `Risk Criteria "${result.ts_name}" has no option selected \n`;
                        return 0;
                    }


                }
            ));
        }
    }
    Promise.all(RiskCriteriaRetrievals).then((weights) => {
        let totalWeight = weights.reduce((sum, ele) => sum + ele);
        formContext.getAttribute("ts_riskcriteriascore").setValue(totalWeight);
        calculationLog += `Set Risk Criteria Score to ${totalWeight} \n`;
        RiskScoreSet = true;
        if (RiskScoreSet && DiscretionaryScoreSet) {
            const riskScore = formContext.getAttribute("ts_discretionaryscore").getValue() + formContext.getAttribute("ts_riskcriteriascore").getValue();
            formContext.getAttribute("ts_riskscore").setValue(riskScore);
            calculationLog += `Set Risk Score to ${riskScore} \n`;
            Xrm.Utility.closeProgressIndicator();
            formContext.getAttribute("ts_calculationlog").setValue(calculationLog);
            formContext.data.entity.save();
        }
    });

    //Calculate and set Discretionary Score
    //const DiscretionaryGrid = formContext.getControl("Subgrid_Discretionary_Factor_Responses");
    //const DiscretionaryRows = DiscretionaryGrid.getGrid().getRows();
    let DiscretionaryRows = await Xrm.WebApi.retrieveMultipleRecords("ts_discretionaryfactorresponse", "?$select=ts_discretionaryfactorresponseid&$filter=_ts_operationriskassessment_value eq " + operationriskassessmentId);

    const DiscretionaryRetrievals = [];
    if (DiscretionaryRows.entities.length > 0) {
        for (let i = 0; i < DiscretionaryRows.entities.length; i++) {
            //let DiscretionaryResponseRow = DiscretionaryRows.get(i).getData();
            DiscretionaryRetrievals.push(Xrm.WebApi.retrieveRecord("ts_discretionaryfactorresponse", DiscretionaryRows.entities[i].ts_discretionaryfactorresponseid, "?$select=ts_discretionaryfactoroption,ts_name&$expand=ts_discretionaryfactoroption($select=ts_weight,ts_name),ts_discretionaryfactorgrouping($select=ts_scorerangeminimum,ts_scorerangemaximum, ts_name)").then(
                function success(result) {
                    if (result.ts_discretionaryfactoroption != null && result.ts_discretionaryfactoroption != null) {
                        calculationLog += `Discretionary Factor "${result.ts_name}" with option "${result.ts_discretionaryfactoroption.ts_name}" in group of "${result.ts_discretionaryfactorgrouping.ts_name}" (Min: ${result.ts_discretionaryfactorgrouping.ts_scorerangeminimum}, Max ${result.ts_discretionaryfactorgrouping.ts_scorerangemaximum}) has a weight of ${result.ts_discretionaryfactoroption.ts_weight} \n`;
                        return {
                            groupingName: result.ts_discretionaryfactorgrouping.ts_name,
                            groupingId: result.ts_discretionaryfactorgrouping.ts_discretionaryfactorgroupingid,
                            groupingMin: result.ts_discretionaryfactorgrouping.ts_scorerangeminimum,
                            groupingMax: result.ts_discretionaryfactorgrouping.ts_scorerangemaximum,
                            weight: result.ts_discretionaryfactoroption.ts_weight
                        }
                    } else {
                        calculationLog += `Discretionary Factor "${result.ts_name}" has no option selected \n`;
                    }
                }
            ));
        }
    }
    Promise.all(DiscretionaryRetrievals).then((discretionaryResponses) => {
        let totalScore = 0;
        let groupingScores = [];
        for (let discretionaryResponse of discretionaryResponses) {
            if (discretionaryResponse == null) continue;
            if (discretionaryResponse.groupingId != null && groupingScores[discretionaryResponse.groupingId] == null) {
                groupingScores[discretionaryResponse.groupingId] = {
                    min: discretionaryResponse.groupingMin,
                    max: discretionaryResponse.groupingMax,
                    name: discretionaryResponse.groupingName
                }
            }
            if (groupingScores[discretionaryResponse.groupingId].score == null) {
                groupingScores[discretionaryResponse.groupingId].score = discretionaryResponse.weight;
            } else {
                groupingScores[discretionaryResponse.groupingId].score += discretionaryResponse.weight;
            }
            calculationLog += `Adding ${discretionaryResponse.weight} to ${groupingScores[discretionaryResponse.groupingId].name} Group. Current Group Score: ${groupingScores[discretionaryResponse.groupingId].score} \n`;
        }

        //The score added for a group cannot be outside the min and max values
        for (let groupingId in groupingScores) {
            if (groupingScores[groupingId].score <= groupingScores[groupingId].min) {
                totalScore += groupingScores[groupingId].min;
                calculationLog += `${groupingScores[groupingId].name} Group score of ${groupingScores[groupingId].score} is less than or equal to group minimum of ${groupingScores[groupingId].min}. Adding ${groupingScores[groupingId].min}. Current Discretionary Score Total: ${totalScore} \n`;
            } else if (groupingScores[groupingId].score <= groupingScores[groupingId].max) {
                totalScore += groupingScores[groupingId].score;
                calculationLog += `${groupingScores[groupingId].name} Group score of ${groupingScores[groupingId].score} is less than or equal to group maximum of ${groupingScores[groupingId].max}. Adding ${groupingScores[groupingId].score}. Current Discretionary Score Total: ${totalScore} \n`;
            } else {
                totalScore += groupingScores[groupingId].max;
                calculationLog += `${groupingScores[groupingId].name} Group score of ${groupingScores[groupingId].score} is above group maximum of ${groupingScores[groupingId].max}. Adding ${groupingScores[groupingId].max}. Current Discretionary Score Total: ${totalScore} \n`;
            }
        }
        formContext.getAttribute("ts_discretionaryscore").setValue(totalScore);
        calculationLog += `Set Discretionary Score to ${totalScore} \n`;
        DiscretionaryScoreSet = true;
        if (RiskScoreSet && DiscretionaryScoreSet) {

            let discretionaryScore = formContext.getAttribute("ts_discretionaryscore").getValue();
            let riskCriteriaScore = formContext.getAttribute("ts_riskcriteriascore").getValue();

            if (isNaN(discretionaryScore)) discretionaryScore = 0;
            if (isNaN(riskCriteriaScore)) riskCriteriaScore = 0;

            const riskScore = discretionaryScore + riskCriteriaScore;
            formContext.getAttribute("ts_riskscore").setValue(riskScore);
            calculationLog += `Set Risk Score to ${riskScore} \n`;
            Xrm.Utility.closeProgressIndicator();
            formContext.getAttribute("ts_calculationlog").setValue(calculationLog);
            formContext.data.entity.save();
        }
    });
}

function submitRiskScore(formContext) {
    const riskScore = formContext.getAttribute("ts_riskscore").getValue();
    const operationId = formContext.getAttribute("ts_operation").getValue()[0].id;

    if (riskScore == null || operationId == null) return;

    Xrm.Utility.showProgressIndicator();

    // define the data to update a record
    var data =
    {
        "ts_riskscore": riskScore
    }
    // update the record
    Xrm.WebApi.updateRecord("ovs_operation", operationId, data).then(
        function success(result) {
            console.log("Operation updated");

            //Set Last Submission Date to today
            formContext.getAttribute("ts_lastsubmissiondate").setValue(new Date());
            formContext.data.entity.save();

            Xrm.Utility.closeProgressIndicator();
        },
        function (error) {
            console.log(error.message);
            Xrm.Utility.closeProgressIndicator();
        }
    );
}