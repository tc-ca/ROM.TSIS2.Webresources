"use strict";
var ROM;
(function (ROM) {
    var File;
    (function (File) {
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            //Hide the Attachment column if the SharePoint link is already populated.
            var sharePointLink = form.getAttribute("ts_sharepointlink").getValue();
            if (sharePointLink == null) {
                var attachmentControl = form.getControl("ts_attachment");
                if (attachmentControl != null && attachmentControl != undefined) {
                    attachmentControl.setVisible(true);
                }
            }
        }
        File.onLoad = onLoad;
    })(File = ROM.File || (ROM.File = {}));
})(ROM || (ROM = {}));
