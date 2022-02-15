namespace ROM.ScoreThresholds {
    export function OnLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const Form = <Form.ts_assessmentscorethredshots.Main.Information>eContext.getFormContext();
        const assessmentTool = Form.getAttribute("ts_assessmenttool").getValue();
        const ncatEnforcementAction = Form.getControl("ts_ncatenforcementaction");
        const rateEnforcementAction = Form.getControl("ts_rateenforcementaction");
        const ncatEnforcementActionAttribute = Form.getAttribute("ts_ncatenforcementaction");
        const rateEnforcementActionAttribute = Form.getAttribute("ts_rateenforcementaction");
        const rateEnforcementHistory = Form.getControl("ts_rateenforcementhistory");
        const rateEnforcementHistoryAttribute = Form.getAttribute("ts_rateenforcementhistory");
        //If NCAT Assessment Tool set required for NCAT Enforcement Action
        if (assessmentTool != null) {
            if (assessmentTool == ts_assessmenttool.NCAT) {
                ncatEnforcementAction.setVisible(true);
                ncatEnforcementActionAttribute.setRequiredLevel("required");
            }
            //If RATE Assessment Tool set required for RATE Enforcement Action
            else {
                rateEnforcementAction.setVisible(true);
                rateEnforcementActionAttribute.setRequiredLevel("required");
                rateEnforcementHistory.setVisible(true);
                rateEnforcementHistoryAttribute.setRequiredLevel("required");
            }
        }
    }

    export function minimumOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const Form = <Form.ts_assessmentscorethredshots.Main.Information>eContext.getFormContext();
        const minimum = Form.getAttribute("ts_minimum").getValue();
        const maximum = Form.getAttribute("ts_maximum").getValue();
        const message = Xrm.Utility.getResourceString("ts_/resx/ScoreThresholds", "MinimumMessage");
        //Check minimum and maximum score for current record
        if (minimum != null && maximum != null)
            if (minimum > maximum) {
                Form.getControl("ts_maximum").clearNotification("errorMaximum");
                Form.getControl("ts_minimum").setNotification(message, "errorMinimum");
            }
            else {
                Form.getControl("ts_minimum").clearNotification("errorMinimum");
                Form.getControl("ts_maximum").clearNotification("errorMaximum");
            }

        checkScoreIntersection(Form);
    }

    export function maximumOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const Form = <Form.ts_assessmentscorethredshots.Main.Information>eContext.getFormContext();
        const minimum = Form.getAttribute("ts_minimum").getValue();
        const maximum = Form.getAttribute("ts_maximum").getValue();
        const message = Xrm.Utility.getResourceString("ts_/resx/ScoreThresholds", "MaximumMessage");
        //Check minimum and maximum score for current record
        if (minimum != null && maximum != null)
            if (minimum > maximum) {
                Form.getControl("ts_maximum").setNotification(message, "errorMaximum");
                Form.getControl("ts_minimum").clearNotification("errorMinimum");
            }
            else {
                Form.getControl("ts_minimum").clearNotification("errorMinimum");
                Form.getControl("ts_maximum").clearNotification("errorMaximum");
            }
                
        checkScoreIntersection(Form);
    }

    export function assessmentToolOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const Form = <Form.ts_assessmentscorethredshots.Main.Information>eContext.getFormContext();
        const assessmentTool = Form.getAttribute("ts_assessmenttool").getValue();
        const ncatEnforcementAction = Form.getControl("ts_ncatenforcementaction");
        const rateEnforcementAction = Form.getControl("ts_rateenforcementaction");
        const ncatEnforcementActionAttribute = Form.getAttribute("ts_ncatenforcementaction");
        const rateEnforcementActionAttribute = Form.getAttribute("ts_rateenforcementaction");
        const rateEnforcementHistory = Form.getControl("ts_rateenforcementhistory");
        const rateEnforcementHistoryAttribute = Form.getAttribute("ts_rateenforcementhistory");
        //For NCAT tool set visible only NCAT Enforcement Action
        if (assessmentTool == ts_assessmenttool.NCAT) {
            ncatEnforcementAction.setVisible(true);
            ncatEnforcementActionAttribute.setRequiredLevel("required");
            rateEnforcementAction.setVisible(false);
            rateEnforcementActionAttribute.setRequiredLevel("none");
            rateEnforcementHistory.setVisible(false);
            rateEnforcementHistoryAttribute.setRequiredLevel("none")
            rateEnforcementHistoryAttribute.setValue(null);
            rateEnforcementActionAttribute.setValue(null);
        }
        //For RATE tool set visible only RATE Enforcement Action
        else {
            rateEnforcementAction.setVisible(true);
            rateEnforcementAction.setVisible(true);
            rateEnforcementActionAttribute.setRequiredLevel("required");
            rateEnforcementHistory.setVisible(true);
            rateEnforcementHistoryAttribute.setRequiredLevel("required");
            ncatEnforcementAction.setVisible(false);
            ncatEnforcementActionAttribute.setRequiredLevel("none");
            ncatEnforcementActionAttribute.setValue(null);
        }

    }

    function checkScoreIntersection(Form: Form.ts_assessmentscorethredshots.Main.Information): void {
        const minimum = Form.getAttribute("ts_minimum").getValue();
        const maximum = Form.getAttribute("ts_maximum").getValue();
        const assessmentTool = Form.getAttribute("ts_assessmenttool").getValue();
        const enforcementHistory = Form.getAttribute("ts_rateenforcementhistory").getValue();
        const scoreThresholdId = Form.data.entity.getId().replace(/[{}]/g, "").toLowerCase();
        const messageOverlap = Xrm.Utility.getResourceString("ts_/resx/ScoreThresholds", "OverlapMessage");
        const messageScoreFrom = Xrm.Utility.getResourceString("ts_/resx/ScoreThresholds", "ScoreFromMessage");
        const messageTo = Xrm.Utility.getResourceString("ts_/resx/ScoreThresholds", "toMessage");
        //Filter by enforcement history if the assessment tool is RATE
        const enforcementHistoryFetchXMLFilter = (assessmentTool == ts_assessmenttool.RATE) ? "<condition attribute='ts_rateenforcementhistory' operator = 'eq' value = '" + enforcementHistory + "'/>" : "";
        var fetchXml = [
            "<fetch>",
            "<entity name='ts_assessmentscorethredshots'>",
            "<attribute name='ts_assessmentscorethredshotsid'/>",
            "<attribute name='ts_minimum'/>",
            "<attribute name='ts_maximum'/>",
            "<attribute name='ts_name'/>",
            "<order attribute='ts_minimum' descending = 'false'/>",
            "<filter type='and'>",
            "<condition attribute='ts_assessmenttool' operator = 'eq' value = '" + assessmentTool + "'/>",
            enforcementHistoryFetchXMLFilter,
            "</filter>",
            "</entity>",
            "</fetch>"
        ].join("");
        fetchXml = "?fetchXml=" + encodeURIComponent(fetchXml);
        //Retrieve all Score Thresholds for current Assessment Tool and Eforcement History
        //Check for each Score Thresholds if there is any overlap with another one
        //Display error message
        Xrm.WebApi.retrieveMultipleRecords("ts_assessmentscorethredshots", fetchXml)
            .then(function success(result) {
                if (result.entities.length > 1) {
                    for (var i = 0; i < result.entities.length; i++) {
                        if (result.entities[i].ts_assessmentscorethredshotsid == scoreThresholdId) {
                            if (i != result.entities.length - 1) {
                                if (maximum != null && maximum >= result.entities[i + 1].ts_minimum)
                                    Form.getControl("ts_maximum").setNotification(messageOverlap + result.entities[i + 1].ts_name + ". " + messageScoreFrom + result.entities[i + 1].ts_minimum + messageTo + result.entities[i + 1].ts_maximum + ".", "errorOverlap");
                                else
                                    Form.getControl("ts_maximum").clearNotification("errorOverlap");
                            }
                            if (i != 0) {
                                if (minimum != null && minimum <= result.entities[i - 1].ts_maximum)
                                    Form.getControl("ts_minimum").setNotification(messageOverlap + result.entities[i - 1].ts_name + ". " + messageScoreFrom + result.entities[i - 1].ts_minimum + messageTo + result.entities[i - 1].ts_maximum + ".", "errorOverlap");
                                else
                                    Form.getControl("ts_minimum").clearNotification("errorOverlap");
                            }
                        }
                    }
                }
            }
            );
    }
}