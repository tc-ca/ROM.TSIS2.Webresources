'use strict';

var ROM;
(function (ROM) {
    (function (BookableResourceBooking) {
        function bookingStatusOnChange(eContext) {
            var form = eContext.getFormContext();
            var bookingStatusAttribute = form.getAttribute("bookingstatus");
            var actualArrivalTimeAttribute = form.getAttribute("msdyn_actualarrivaltime");
            if (actualArrivalTimeAttribute != null || actualArrivalTimeAttribute != undefined) {
                var actualArrivalTimeAttributeValue = actualArrivalTimeAttribute.getValue();
                if (actualArrivalTimeAttributeValue == null || actualArrivalTimeAttributeValue == undefined) {
                    if (bookingStatusAttribute != null && bookingStatusAttribute != undefined) {
                        var bookingStatusAttributeValue = bookingStatusAttribute.getValue();
                        if (bookingStatusAttributeValue != null && bookingStatusAttributeValue != undefined) {
                            if (bookingStatusAttributeValue[0].name == Xrm.Utility.getResourceString("ovs_/resx/BookableResourceBooking", "InProgressBookingStatus")) {
                                var currentDateTime_1 = new Date();
                                var startTimeAttribute_1 = form.getAttribute("starttime");
                                var endTimeAttribute_1 = form.getAttribute("endtime");
                                var beforeStartTime_1 = false;
                                var afterEndTime_1 = false;
                                if (startTimeAttribute_1 != null && startTimeAttribute_1 != undefined) {
                                    var startTimeAttributeValue = startTimeAttribute_1.getValue();
                                    if (startTimeAttributeValue != null && startTimeAttributeValue != undefined) {
                                        var startTimeDiff = ((startTimeAttributeValue.getTime() - currentDateTime_1.getTime()) / 1000) / 60;
                                        var startTimeDiffMins = Math.abs(Math.round(startTimeDiff));
                                        if (startTimeDiffMins > 0) {
                                            beforeStartTime_1 = true;
                                        }
                                    }
                                }
                                if (endTimeAttribute_1 != null && endTimeAttribute_1 != undefined) {
                                    var endTimeAttributeValue = endTimeAttribute_1.getValue();
                                    if (endTimeAttributeValue != null && endTimeAttributeValue != undefined) {
                                        var endTimeDiff = ((endTimeAttributeValue.getTime() - currentDateTime_1.getTime()) / 1000) / 60;
                                        var endTimeDiffMins = Math.abs(Math.round(endTimeDiff));
                                        if (endTimeDiffMins < 0) {
                                            afterEndTime_1 = true;
                                        }
                                    }
                                }
                                if (beforeStartTime_1 || afterEndTime_1) {
                                    var confirmStrings = {
                                        text: Xrm.Utility.getResourceString("ovs_/resx/BookableResourceBooking", "ConfirmStartEndTimeAdjustmentText"),
                                        title: Xrm.Utility.getResourceString("ovs_/resx/BookableResourceBooking", "ConfirmStartEndTimeAdjustmentTitle")
                                    };
                                    var confirmOptions = { height: 200, width: 450 };
                                    Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(function (success) {
                                        if (success.confirmed) {
                                            if (beforeStartTime_1) {
                                                startTimeAttribute_1.setValue(currentDateTime_1);
                                                form.getAttribute("msdyn_estimatedarrivaltime").setValue(currentDateTime_1);
                                            }
                                            if (afterEndTime_1) {
                                                endTimeAttribute_1.setValue(currentDateTime_1);
                                            }
                                        }
                                        form.getAttribute("msdyn_actualarrivaltime").setValue(currentDateTime_1);
                                    });
                                }
                                else {
                                    form.getAttribute("msdyn_actualarrivaltime").setValue(currentDateTime_1);
                                }
                            }
                        }
                    }
                }
            }
        }
        BookableResourceBooking.bookingStatusOnChange = bookingStatusOnChange;
    })(ROM.BookableResourceBooking || (ROM.BookableResourceBooking = {}));
})(ROM || (ROM = {}));
