namespace ROM.CustomerAsset {
    export function onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
        const form = <Form.msdyn_customerasset.Main.CustomerAsset>eContext.getFormContext();

        const assetCategoryAttribute = form.getAttribute("msdyn_customerassetcategory");
        const assetCategoryAttributeValue = form.getAttribute("msdyn_customerassetcategory").getValue();

        const relatedWorkOrdersOperationSubGrid = form.getControl("Asset_WorkOrder_Operations");
        const relatedWorkOrdersTagsSubGrid = form.getControl("Asset_WorkOrder_Tags");

        if (assetCategoryAttribute != null && assetCategoryAttribute != undefined && assetCategoryAttributeValue != null){
            Xrm.WebApi.retrieveRecord("msdyn_customerassetcategory", assetCategoryAttributeValue[0].id.replace(/[{}]/g, ""), "?$select=ts_assetcategorytype").then(
                function success(result) {
                    if (result.ts_assetcategorytype == 717750000){
                        relatedWorkOrdersOperationSubGrid.setVisible(true);
                        relatedWorkOrdersTagsSubGrid.setVisible(false);
                    }
                    else {
                        relatedWorkOrdersTagsSubGrid.setVisible(true);
                        relatedWorkOrdersOperationSubGrid.setVisible(false);
                    }
                },
                function (error) {
                }
            );
        }
    }
}