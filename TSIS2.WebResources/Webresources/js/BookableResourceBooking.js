"use strict";
/* eslint-disable @typescript-eslint/triple-slash-reference */
var ROM;
(function (ROM) {
    var BookableResourceBooking;
    (function (BookableResourceBooking) {
        // EVENTS
        function bookingStatusOnChange(eContext) {
            var form = eContext.getFormContext();
            var bookingStatusAttribute = form.getAttribute("bookingstatus");
            var actualArrivalTimeAttribute = form.getAttribute("msdyn_actualarrivaltime");
            // Only do this if arrival time hasn't been set before
            if (actualArrivalTimeAttribute != null || actualArrivalTimeAttribute != undefined) {
                var actualArrivalTimeAttributeValue = actualArrivalTimeAttribute.getValue();
                if (actualArrivalTimeAttributeValue == null || actualArrivalTimeAttributeValue == undefined) {
                    // Only do this if the booking status changes to "In Progress"
                    if (bookingStatusAttribute != null && bookingStatusAttribute != undefined) {
                        var bookingStatusAttributeValue = bookingStatusAttribute.getValue();
                        if (bookingStatusAttributeValue != null && bookingStatusAttributeValue != undefined) {
                            if (bookingStatusAttributeValue[0].name == Xrm.Utility.getResourceString("ovs_/resx/BookableResourceBooking", "InProgressBookingStatus")) {
                                // Get the client's current date time
                                //NOTE: This already takes into account timezone offset
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
                                // Ask the client if they want to re-adjust the start and end datetime if they conflict with the current datetime
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
                                                // Update the estimated arrival time too
                                                form.getAttribute("msdyn_estimatedarrivaltime").setValue(currentDateTime_1);
                                            }
                                            if (afterEndTime_1) {
                                                endTimeAttribute_1.setValue(currentDateTime_1);
                                            }
                                        }
                                        // Set the actual arrival time to the client's current date time when booking status is set to "In Progress"
                                        form.getAttribute("msdyn_actualarrivaltime").setValue(currentDateTime_1);
                                    });
                                }
                                else {
                                    // Set the actual arrival time to the client's current date time when booking status is set to "In Progress"
                                    form.getAttribute("msdyn_actualarrivaltime").setValue(currentDateTime_1);
                                }
                            }
                        }
                    }
                }
            }
        }
        BookableResourceBooking.bookingStatusOnChange = bookingStatusOnChange;
    })(BookableResourceBooking = ROM.BookableResourceBooking || (ROM.BookableResourceBooking = {}));
})(ROM || (ROM = {}));
