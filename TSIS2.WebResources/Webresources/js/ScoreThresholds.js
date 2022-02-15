"use strict";
var ROM;
(function (ROM) {
    var ScoreThresholds;
    (function (ScoreThresholds) {
        function OnLoad(eContext) {
            var Form = eContext.getFormContext();
            var assessmentTool = Form.getAttribute("ts_assessmenttool").getValue();
            var ncatEnforcementAction = Form.getControl("ts_ncatenforcementaction");
            var rateEnforcementAction = Form.getControl("ts_rateenforcementaction");
            var ncatEnforcementActionAttribute = Form.getAttribute("ts_ncatenforcementaction");
            var rateEnforcementActionAttribute = Form.getAttribute("ts_rateenforcementaction");
            var rateEnforcementHistory = Form.getControl("ts_rateenforcementhistory");
            var rateEnforcementHistoryAttribute = Form.getAttribute("ts_rateenforcementhistory");
            //If NCAT Assessment Tool set required for NCAT Enforcement Action
            if (assessmentTool != null) {
                if (assessmentTool == 717750000 /* NCAT */) {
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
        ScoreThresholds.OnLoad = OnLoad;
        function minimumOnChange(eContext) {
            var Form = eContext.getFormContext();
            var minimum = Form.getAttribute("ts_minimum").getValue();
            var maximum = Form.getAttribute("ts_maximum").getValue();
            var message = Xrm.Utility.getResourceString("ts_/resx/ScoreThresholds", "MinimumMessage");
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
        ScoreThresholds.minimumOnChange = minimumOnChange;
        function maximumOnChange(eContext) {
            var Form = eContext.getFormContext();
            var minimum = Form.getAttribute("ts_minimum").getValue();
            var maximum = Form.getAttribute("ts_maximum").getValue();
            var message = Xrm.Utility.getResourceString("ts_/resx/ScoreThresholds", "MaximumMessage");
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
        ScoreThresholds.maximumOnChange = maximumOnChange;
        function assessmentToolOnChange(eContext) {
            var Form = eContext.getFormContext();
            var assessmentTool = Form.getAttribute("ts_assessmenttool").getValue();
            var ncatEnforcementAction = Form.getControl("ts_ncatenforcementaction");
            var rateEnforcementAction = Form.getControl("ts_rateenforcementaction");
            var ncatEnforcementActionAttribute = Form.getAttribute("ts_ncatenforcementaction");
            var rateEnforcementActionAttribute = Form.getAttribute("ts_rateenforcementaction");
            var rateEnforcementHistory = Form.getControl("ts_rateenforcementhistory");
            var rateEnforcementHistoryAttribute = Form.getAttribute("ts_rateenforcementhistory");
            //For NCAT tool set visible only NCAT Enforcement Action
            if (assessmentTool == 717750000 /* NCAT */) {
                ncatEnforcementAction.setVisible(true);
                ncatEnforcementActionAttribute.setRequiredLevel("required");
                rateEnforcementAction.setVisible(false);
                rateEnforcementActionAttribute.setRequiredLevel("none");
                rateEnforcementHistory.setVisible(false);
                rateEnforcementHistoryAttribute.setRequiredLevel("none");
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
        ScoreThresholds.assessmentToolOnChange = assessmentToolOnChange;
        function checkScoreIntersection(Form) {
            var minimum = Form.getAttribute("ts_minimum").getValue();
            var maximum = Form.getAttribute("ts_maximum").getValue();
            var assessmentTool = Form.getAttribute("ts_assessmenttool").getValue();
            var enforcementHistory = Form.getAttribute("ts_rateenforcementhistory").getValue();
            var scoreThresholdId = Form.data.entity.getId().replace(/[{}]/g, "").toLowerCase();
            var messageOverlap = Xrm.Utility.getResourceString("ts_/resx/ScoreThresholds", "OverlapMessage");
            var messageScoreFrom = Xrm.Utility.getResourceString("ts_/resx/ScoreThresholds", "ScoreFromMessage");
            var messageTo = Xrm.Utility.getResourceString("ts_/resx/ScoreThresholds", "toMessage");
            //Filter by enforcement history if the assessment tool is RATE
            var enforcementHistoryFetchXMLFilter = (assessmentTool == 717750001 /* RATE */) ? "<condition attribute='ts_rateenforcementhistory' operator = 'eq' value = '" + enforcementHistory + "'/>" : "";
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
            });
        }
    })(ScoreThresholds = ROM.ScoreThresholds || (ROM.ScoreThresholds = {}));
})(ROM || (ROM = {}));
