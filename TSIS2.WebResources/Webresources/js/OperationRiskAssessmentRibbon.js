//For this to work offline, RetrieveMultiple must be avoided
//To get around this, we can get the guids of the related Response records through the subgrid and retrieve each individually
function recalculateRiskScore(formContext) {
    Xrm.Utility.showProgressIndicator();
    let RiskScoreSet = false;
    let DiscretionaryScoreSet = false;
    let calculationLog = "";

    //Calculate and set Risk Score
    const RiskResponseGrid = formContext.getControl("Subgrid_Risk_Criteria_Responses");
    const RiskResponseRows = RiskResponseGrid.getGrid().getRows();
    const RiskCriteriaRetrievals = [];
    for (let i = 0; i < RiskResponseRows.getLength(); i++) {
        let RiskResponseRow = RiskResponseRows.get(i).getData();
        RiskCriteriaRetrievals.push(Xrm.WebApi.retrieveRecord("ts_riskcriteriaresponse", RiskResponseRow._entity._entityId.guid, "?$select=ts_riskcriteriaoption,ts_name&$expand=ts_riskcriteriaoption($select=ts_weight,ts_name)").then(
            function success(result) {
                calculationLog += `Risk Criteria "${result.ts_name}" with option "${result.ts_riskcriteriaoption.ts_name}" has a weight of ${result.ts_riskcriteriaoption.ts_weight} \n`;
                if (result.ts_riskcriteriaoption.ts_weight != isNaN) {
                    return result.ts_riskcriteriaoption.ts_weight
                }
            }
        ));
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
    const DiscretionaryGrid = formContext.getControl("Subgrid_Discretionary_Factor_Responses");
    const DiscretionaryRows = DiscretionaryGrid.getGrid().getRows();
    const DiscretionaryRetrievals = [];
    for (let i = 0; i < DiscretionaryRows.getLength(); i++) {
        let DiscretionaryResponseRow = DiscretionaryRows.get(i).getData();
        DiscretionaryRetrievals.push(Xrm.WebApi.retrieveRecord("ts_discretionaryfactorresponse", DiscretionaryResponseRow._entity._entityId.guid, "?$select=ts_discretionaryfactoroption,ts_name&$expand=ts_discretionaryfactoroption($select=ts_weight,ts_name),ts_discretionaryfactorgrouping($select=ts_scorerangeminimum,ts_scorerangemaximum, ts_name)").then(
            function success(result) {
                calculationLog += `Discretionary Factor "${result.ts_name}" with option "${result.ts_discretionaryfactoroption.ts_name}" in group of "${result.ts_discretionaryfactorgrouping.ts_name}" (Min: ${result.ts_discretionaryfactorgrouping.ts_scorerangeminimum}, Max ${result.ts_discretionaryfactorgrouping.ts_scorerangemaximum}) has a weight of ${result.ts_discretionaryfactoroption.ts_weight} \n`;
                return {
                    groupingName: result.ts_discretionaryfactorgrouping.ts_name,
                    groupingId: result.ts_discretionaryfactorgrouping.ts_discretionaryfactorgroupingid,
                    groupingMin: result.ts_discretionaryfactorgrouping.ts_scorerangeminimum,
                    groupingMax: result.ts_discretionaryfactorgrouping.ts_scorerangemaximum,
                    weight: result.ts_discretionaryfactoroption.ts_weight
                }
            }
        ));
    }
    Promise.all(DiscretionaryRetrievals).then((discretionaryResponses) => {
        let totalScore = 0;
        let groupingScores = [];
        for (let discretionaryResponse of discretionaryResponses) {
            if (groupingScores[discretionaryResponse.groupingId] == null) {
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
            const riskScore = formContext.getAttribute("ts_discretionaryscore").getValue() + formContext.getAttribute("ts_riskcriteriascore").getValue();
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
            Xrm.Utility.closeProgressIndicator();
        },
        function (error) {
            console.log(error.message);
            Xrm.Utility.closeProgressIndicator();
        }
    );
}