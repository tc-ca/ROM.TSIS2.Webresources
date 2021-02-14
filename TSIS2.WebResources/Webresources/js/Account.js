/* eslint-disable @typescript-eslint/triple-slash-reference */
var ROM;
(function (ROM) {
    var Account;
    (function (Account) {
        // EVENTS
        function onLoad(eContext) {
            console.log('Onload has been called');
            console.log('Xrm execution context: ', eContext);
            var form = eContext.getFormContext();
            var accountType = form.getAttribute('customertypecode').getValue();
            if (accountType == 948010000 /* RegulatedEntity */) {
                form.getControl('regulated_entities_subgrid').setVisible(false);
            }
            else
                form.getControl('regulated_entities_subgrid').setVisible(true);
        }
        Account.onLoad = onLoad;
    })(Account = ROM.Account || (ROM.Account = {}));
})(ROM || (ROM = {}));
