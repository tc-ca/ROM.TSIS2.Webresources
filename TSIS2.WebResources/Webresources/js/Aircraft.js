﻿"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var ROM;
(function (ROM) {
    var Aircraft;
    (function (Aircraft) {
        var aircraftModelOptions;
        function onLoad(eContext) {
            return __awaiter(this, void 0, void 0, function () {
                var form;
                return __generator(this, function (_a) {
                    form = eContext.getFormContext();
                    aircraftModelOptions = form.getControl("ts_model").getOptions();
                    return [2 /*return*/];
                });
            });
        }
        Aircraft.onLoad = onLoad;
        function aircraftManufacturerOnChange(eContext) {
            var form = eContext.getFormContext();
            var aircraftmanufacturer = form.getAttribute("ts_manufacturer").getValue();
            var options = form.getControl("ts_model").getOptions();
            for (var i = 0; i < options.length; i++)
                form.getControl("ts_model").removeOption(options[i].value);
            //form.getControl("ts_model").setVisible(true);
            if (aircraftmanufacturer == 741130000 /* ts_aircraftmanufacturer.Boeing */) {
                for (var i = 1; i <= 11; i++) {
                    form.getControl("ts_model").addOption(aircraftModelOptions[i]);
                }
            }
            else if (aircraftmanufacturer == 741130001 /* ts_aircraftmanufacturer.Airbus */) {
                for (var i = 12; i <= 22; i++) {
                    form.getControl("ts_model").addOption(aircraftModelOptions[i]);
                }
            }
            else if (aircraftmanufacturer == 741130002 /* ts_aircraftmanufacturer.DeHavilland */) {
                for (var i = 23; i <= 24; i++) {
                    form.getControl("ts_model").addOption(aircraftModelOptions[i]);
                }
            }
            else if (aircraftmanufacturer == 741130003 /* ts_aircraftmanufacturer.Bombardier */) {
                for (var i = 25; i <= 25; i++) {
                    form.getControl("ts_model").addOption(aircraftModelOptions[i]);
                }
            }
            else if (aircraftmanufacturer == 741130004 /* ts_aircraftmanufacturer.Embraer */) {
                for (var i = 26; i <= 29; i++) {
                    form.getControl("ts_model").addOption(aircraftModelOptions[i]);
                }
            }
            else if (aircraftmanufacturer == 741130005 /* ts_aircraftmanufacturer.Other */) {
                //form.getControl("ts_modelother").setVisible(true);
                //form.getControl("ts_model").setVisible(false);
            }
        }
        Aircraft.aircraftManufacturerOnChange = aircraftManufacturerOnChange;
    })(Aircraft = ROM.Aircraft || (ROM.Aircraft = {}));
})(ROM || (ROM = {}));
