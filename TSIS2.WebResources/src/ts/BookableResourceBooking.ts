/* eslint-disable @typescript-eslint/triple-slash-reference */
namespace ROM.BookableResourceBooking {
    // EVENTS
    export function bookingStatusOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.bookableresourcebooking.Main.ROMInformation>eContext.getFormContext();
        const bookingStatusAttribute = form.getAttribute("bookingstatus");
        const actualArrivalTimeAttribute = form.getAttribute("msdyn_actualarrivaltime");

        // Only do this if arrival time hasn't been set before
        if (actualArrivalTimeAttribute != null || actualArrivalTimeAttribute != undefined) {
            const actualArrivalTimeAttributeValue = actualArrivalTimeAttribute.getValue();
            if (actualArrivalTimeAttributeValue == null || actualArrivalTimeAttributeValue == undefined) {

                // Only do this if the booking status changes to "In Progress"
                if (bookingStatusAttribute != null && bookingStatusAttribute != undefined) {
                    const bookingStatusAttributeValue = bookingStatusAttribute.getValue();

                    if (bookingStatusAttributeValue != null && bookingStatusAttributeValue != undefined) {
                        if (bookingStatusAttributeValue[0].name == Xrm.Utility.getResourceString("ovs_/resx/BookableResourceBooking", "InProgressBookingStatus")) {

                            // Get the client's current date time
                            //NOTE: This already takes into account timezone offset
                            const currentDateTime = new Date();

                            const startTimeAttribute = form.getAttribute("starttime");
                            const endTimeAttribute = form.getAttribute("endtime");

                            let beforeStartTime = false;
                            let afterEndTime = false;

                            if (startTimeAttribute != null && startTimeAttribute != undefined) {
                                const startTimeAttributeValue = startTimeAttribute.getValue();
                                if (startTimeAttributeValue != null && startTimeAttributeValue != undefined) {
                                    const startTimeDiff = ((startTimeAttributeValue.getTime() - currentDateTime.getTime()) / 1000) / 60;
                                    const startTimeDiffMins = Math.abs(Math.round(startTimeDiff));
                                    if (startTimeDiffMins > 0) {
                                        beforeStartTime = true;
                                    }
                                }
                            }

                            if (endTimeAttribute != null && endTimeAttribute != undefined) {
                                const endTimeAttributeValue = endTimeAttribute.getValue();
                                if (endTimeAttributeValue != null && endTimeAttributeValue != undefined) {
                                    const endTimeDiff = ((endTimeAttributeValue.getTime() - currentDateTime.getTime()) / 1000) / 60;
                                    const endTimeDiffMins = Math.abs(Math.round(endTimeDiff));
                                    if (endTimeDiffMins < 0) {
                                        afterEndTime = true;
                                    }
                                }
                            }

                            // Ask the client if they want to re-adjust the start and end datetime if they conflict with the current datetime
                            if (beforeStartTime || afterEndTime) {

                                const confirmStrings = {
                                    text: Xrm.Utility.getResourceString("ovs_/resx/BookableResourceBooking", "ConfirmStartEndTimeAdjustmentText"),
                                    title: Xrm.Utility.getResourceString("ovs_/resx/BookableResourceBooking", "ConfirmStartEndTimeAdjustmentTitle")
                                };
                                const confirmOptions = { height: 200, width: 450 };
                                Xrm.Navigation.openConfirmDialog(confirmStrings, confirmOptions).then(
                                    function (success) {
                                        if (success.confirmed) {
                                            if (beforeStartTime) {
                                                startTimeAttribute.setValue(currentDateTime);
                                                // Update the estimated arrival time too
                                                form.getAttribute("msdyn_estimatedarrivaltime").setValue(currentDateTime);
                                            }
                                            if (afterEndTime) {
                                                endTimeAttribute.setValue(currentDateTime);
                                            }
                                        }
                                        // Set the actual arrival time to the client's current date time when booking status is set to "In Progress"
                                        form.getAttribute("msdyn_actualarrivaltime").setValue(currentDateTime);
                                    }
                                );

                            } else {
                                // Set the actual arrival time to the client's current date time when booking status is set to "In Progress"
                                form.getAttribute("msdyn_actualarrivaltime").setValue(currentDateTime);
                            }

                        }
                    }
                }
            }
        }
    }
}