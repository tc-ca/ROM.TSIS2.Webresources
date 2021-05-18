"use strict";
var ROM;
(function (ROM) {
    var CustomerAsset;
    (function (CustomerAsset) {
        function onLoad(eContext) {
            var form = eContext.getFormContext();
            var assetCategoryAttribute = form.getAttribute("msdyn_customerassetcategory");
            var assetCategoryAttributeValue = form.getAttribute("msdyn_customerassetcategory").getValue();
            var relatedWorkOrdersOperationSubGrid = form.getControl("Asset_WorkOrder_Operations");
            var relatedWorkOrdersTagsSubGrid = form.getControl("Asset_WorkOrder_Tags");
            if (assetCategoryAttribute != null && assetCategoryAttribute != undefined && assetCategoryAttributeValue != null) {
                Xrm.WebApi.retrieveRecord("msdyn_customerassetcategory", assetCategoryAttributeValue[0].id.replace(/[{}]/g, ""), "?$select=ts_assetcategorytype").then(function success(result) {
                    if (result.ts_assetcategorytype == 717750000) {
                        relatedWorkOrdersOperationSubGrid.setVisible(true);
                        relatedWorkOrdersTagsSubGrid.setVisible(false);
                    }
                    else {
                        relatedWorkOrdersTagsSubGrid.setVisible(true);
                        relatedWorkOrdersOperationSubGrid.setVisible(false);
                    }
                }, function (error) {
                });
            }
        }
        CustomerAsset.onLoad = onLoad;
    })(CustomerAsset = ROM.CustomerAsset || (ROM.CustomerAsset = {}));
})(ROM || (ROM = {}));
