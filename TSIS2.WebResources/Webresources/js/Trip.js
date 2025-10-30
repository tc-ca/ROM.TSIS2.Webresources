"use strict";
/* eslint-disable @typescript-eslint/triple-slash-reference */
var ROM;
(function (ROM) {
    var Trip;
    (function (Trip) {
        // EVENTS
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            if (userHasRole("System Administrator|ROM - Business Admin|ROM - Planner|ROM - Manager")) {
                form.getControl("ts_fiscalyear").setDisabled(false);
                console.log("Enable role");
            }
            else {
                form.getControl("ts_fiscalyear").setDisabled(true);
            }
            toggleSubgrid(form);
        }
        Trip.onLoad = onLoad;
        function onProgramChange(eContext) {
            var form = eContext.getFormContext();
            toggleSubgrid(form);
        }
        Trip.onProgramChange = onProgramChange;
        /**
        * Shows or hides the Work Orders and Inspections subgrids
        * based on the selected `ts_program` option set value.
        *
        * @param form The Trip form context.
        */
        function toggleSubgrid(form) {
            var _a;
            var programValue = (_a = form.getAttribute("ts_program")) === null || _a === void 0 ? void 0 : _a.getValue();
            var tripInspectionGrid = form.getControl("Inspections");
            var workOrderGrid = form.getControl("Work_Orders");
            switch (programValue) {
                case 741130000: // Aviation Security -> show Work Orders subgrid only
                    tripInspectionGrid === null || tripInspectionGrid === void 0 ? void 0 : tripInspectionGrid.setVisible(false);
                    workOrderGrid === null || workOrderGrid === void 0 ? void 0 : workOrderGrid.setVisible(true);
                    break;
                case 741130001: // Rail Security -> show Trip Inspections subgrid only
                    tripInspectionGrid === null || tripInspectionGrid === void 0 ? void 0 : tripInspectionGrid.setVisible(true);
                    workOrderGrid === null || workOrderGrid === void 0 ? void 0 : workOrderGrid.setVisible(false);
                    break;
                default:
                    tripInspectionGrid === null || tripInspectionGrid === void 0 ? void 0 : tripInspectionGrid.setVisible(false);
                    workOrderGrid === null || workOrderGrid === void 0 ? void 0 : workOrderGrid.setVisible(false);
                    break;
            }
        }
    })(Trip = ROM.Trip || (ROM.Trip = {}));
})(ROM || (ROM = {}));
