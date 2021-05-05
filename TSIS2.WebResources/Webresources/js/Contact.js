"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Contact = /** @class */ (function () {
    function Contact() {
    }
    Contact.onLoad = function (eContext) {
        var form = eContext.getFormContext();
        form.getAttribute("firstname").setValue("Bob");
    };
    return Contact;
}());
exports.default = Contact;
