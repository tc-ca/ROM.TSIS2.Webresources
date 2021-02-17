"use strict";
/* eslint-disable @typescript-eslint/triple-slash-reference */
var ROM;
(function (ROM) {
    var BookableResourceBooking;
    (function (BookableResourceBooking) {
        // EVENTS
        function starttimeOnChange(eContext) {
            var form = eContext.getFormContext();
            var starttime = form.getAttribute('starttime').getValue();
            form.getControl('starttime').clearNotification('starttime');
            if (starttime != null) {
                var ovs_plannedfiscalyear = form.getAttribute('ovs_plannedfiscalyearid').getValue();
                if (ovs_plannedfiscalyear != null) {
                    var ovs_plannedfiscalyearid = ovs_plannedfiscalyear[0].id;
                    if (ovs_plannedfiscalyearid != null) {
                        Xrm.WebApi.retrieveRecord("tc_tcfiscalyear", ovs_plannedfiscalyearid, "?$select=tc_fiscalstart,tc_fiscalend").then(function success(result) {
                            if (result != null) {
                                var fiscalstart = result.tc_fiscalstart;
                                fiscalstart = new Date(fiscalstart);
                                var fiscalend = result.tc_fiscalend;
                                fiscalend = new Date(fiscalend);
                                if (starttime != null && (starttime < fiscalstart || starttime > fiscalend)) {
                                    form.getControl('starttime').setNotification('You can not book an oversight activity outside the planned fiscal year', 'starttime');
                                }
                            }
                        }, function (error) {
                            var alertStrings = { text: error.message };
                            var alertOptions = { height: 120, width: 260 };
                            Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function () { });
                        });
                    }
                }
            }
        }
        BookableResourceBooking.starttimeOnChange = starttimeOnChange;
        function endtimeOnChange(eContext) {
            var form = eContext.getFormContext();
            var endtime = form.getAttribute('endtime').getValue();
            form.getControl('endtime').clearNotification('endtime');
            if (endtime != null) {
                var ovs_plannedfiscalyear = form.getAttribute('ovs_plannedfiscalyearid').getValue();
                if (ovs_plannedfiscalyear != null) {
                    var ovs_plannedfiscalyearid = ovs_plannedfiscalyear[0].id;
                    if (ovs_plannedfiscalyearid != null) {
                        Xrm.WebApi.retrieveRecord("tc_tcfiscalyear", ovs_plannedfiscalyearid, "?$select=tc_fiscalstart,tc_fiscalend").then(function success(result) {
                            if (result != null) {
                                var fiscalstart = result.tc_fiscalstart;
                                fiscalstart = new Date(fiscalstart);
                                var fiscalend = result.tc_fiscalend;
                                fiscalend = new Date(fiscalend);
                                if (endtime != null && (endtime < fiscalstart || endtime > fiscalend)) {
                                    form.getControl('endtime').setNotification('You can not book an oversight activity outside the planned fiscal year', 'endtime');
                                }
                            }
                        }, function (error) {
                            var alertStrings = { text: error.message };
                            var alertOptions = { height: 120, width: 260 };
                            Xrm.Navigation.openAlertDialog(alertStrings, alertOptions).then(function () { });
                        });
                    }
                }
            }
        }
        BookableResourceBooking.endtimeOnChange = endtimeOnChange;
    })(BookableResourceBooking = ROM.BookableResourceBooking || (ROM.BookableResourceBooking = {}));
})(ROM || (ROM = {}));
