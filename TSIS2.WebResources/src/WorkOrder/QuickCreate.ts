export default class QuickCreate {
  // EVENTS
  static onLoad(eContext: Xrm.ExecutionContext<any, any>): void {
    const form = <Form.msdyn_workorder.QuickCreate.QuickCreateWorkOrder>eContext.getFormContext();

    // Disable all operation related fields
    form.getControl("ovs_assetcategory").setDisabled(true);
    form.getControl("msdyn_primaryincidenttype").setDisabled(true);

    //Set required fields
    form.getAttribute("ovs_assetcategory").setRequiredLevel("required");

    // Set default value of Rationale to Unplanned
    const rationalLookUpValue = new Array();
    rationalLookUpValue[0] = new Object();
    rationalLookUpValue[0].id = "{47F438C7-C104-EB11-A813-000D3AF3A7A7}";
    rationalLookUpValue[0].name = "Unplanned";
    rationalLookUpValue[0].entityType = "ovs_tyrational";
    form.getAttribute("ovs_rational").setValue(rationalLookUpValue);

    // Show/Hide country field
    const regionAttribute = form.getAttribute("msdyn_serviceterritory");
    if (regionAttribute != null && regionAttribute != undefined) {

      const regionAttributeValue = regionAttribute.getValue();

      if (regionAttributeValue != null && regionAttributeValue != undefined) {
        if (regionAttributeValue[0].id == "{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}") { //International
          form.getControl("ts_country").setVisible(true);
        }
      }
      else {
        form.getControl("ts_country").setVisible(false);
      }
    }
  }

  static regionOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
    try {
      const form = <Form.msdyn_workorder.QuickCreate.QuickCreateWorkOrder>eContext.getFormContext();
      const regionAttribute = form.getAttribute("msdyn_serviceterritory");

      if (regionAttribute != null && regionAttribute != undefined) {

        const regionAttributeValue = regionAttribute.getValue();
        if (regionAttributeValue != null && regionAttributeValue != undefined) {
          if (regionAttributeValue[0].id == "{3BF0FA88-150F-EB11-A813-000D3AF3A7A7}") { //International
            form.getControl("ts_country").setVisible(true);
          }
        }
        else {
          form.getControl("ts_country").setVisible(false);
        }
      }
    } catch (e) {
      throw new Error(e.Message);
    }
  }

  static workOrderTypeOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
    try {

      const form = <Form.msdyn_workorder.QuickCreate.QuickCreateWorkOrder>eContext.getFormContext();
      const workOrderTypeAttribute = form.getAttribute("msdyn_workordertype");
      const stakeholderAttribute = form.getAttribute("msdyn_serviceaccount");
      const siteAttribute = form.getAttribute("ts_site");

      if (workOrderTypeAttribute != null && workOrderTypeAttribute != undefined &&
        stakeholderAttribute != null && stakeholderAttribute != undefined &&
        siteAttribute != null && siteAttribute != undefined) {

        // Clear out & disable all dependent fields' value
        if (!form.getControl("msdyn_primaryincidenttype").getDisabled() || form.getAttribute("msdyn_primaryincidenttype").getValue() != null) {
          form.getAttribute("msdyn_primaryincidenttype").setValue(null);
        }
        if (!form.getControl("ovs_assetcategory").getDisabled() || form.getAttribute("ovs_assetcategory").getValue() != null) {
          form.getAttribute("ovs_assetcategory").setValue(null);
          form.getAttribute("ovs_asset").setValue(null);
        }
        form.getControl("msdyn_primaryincidenttype").setDisabled(true);
        form.getControl("ovs_assetcategory").setDisabled(true);

        const workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();
        const stakeholderAttributeValue = stakeholderAttribute.getValue();
        const siteAttributeValue = siteAttribute.getValue();
        if (workOrderTypeAttributeValue != null && workOrderTypeAttributeValue != undefined &&
          stakeholderAttributeValue != null && stakeholderAttributeValue != undefined &&
          siteAttributeValue != null && siteAttributeValue != undefined) {

          // Enable direct dependent field
          form.getControl("ovs_assetcategory").setDisabled(false);

          //Custom view: Filter Operation Type
          const viewId = '{8982C38D-8BB4-4C95-BD05-493398FEAE99}';
          const entityName = "msdyn_customerassetcategory";
          const viewDisplayName = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredOperationTypes");
          const fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true"> <entity name="msdyn_customerassetcategory"> <attribute name="msdyn_name" /> <attribute name="msdyn_customerassetcategoryid" /> <order attribute="msdyn_name" descending="false" /> <filter type="and"> <condition attribute="ts_assetcategorytype" operator="eq" value="717750000" /> </filter> <link-entity name="msdyn_customerasset" from="msdyn_customerassetcategory" to="msdyn_customerassetcategoryid" link-type="inner" alias="aj"> <filter type="and"> <condition attribute="msdyn_account" operator="eq" value="' + stakeholderAttributeValue[0].id + '" /> <condition attribute="msdyn_functionallocation" operator="eq" value="' + siteAttributeValue[0].id + '" /> </filter> </link-entity> <link-entity name="msdyn_incidenttype" from="ts_operationtype" to="msdyn_customerassetcategoryid" link-type="inner" alias="ak"> <filter type="and"> <condition attribute="msdyn_defaultworkordertype" operator="eq" value="' + workOrderTypeAttributeValue[0].id + '" /> </filter> </link-entity> </entity> </fetch>';
          const layoutXml = '<grid name="resultset" object="10010" jump="name" select="1" icon="1" preview="1"><row name="result" id="msdyn_customerassetcategoryid"><cell name="msdyn_name" width="200" /></row></grid>';
          form.getControl("ovs_assetcategory").addCustomView(viewId, entityName, viewDisplayName, fetchXml, layoutXml, true);
        }
      }
    } catch (e) {
      throw new Error(e.Message);
    }
  }

  static operationTypeOnChange(eContext: Xrm.ExecutionContext<any, any>): void {
    try {
      const form = <Form.msdyn_workorder.QuickCreate.QuickCreateWorkOrder>eContext.getFormContext();
      const workOrderTypeAttribute = form.getAttribute("msdyn_workordertype");
      const operationTypeAttribute = form.getAttribute("ovs_assetcategory");
      const siteAttribute = form.getAttribute("ts_site");

      if (operationTypeAttribute != null && operationTypeAttribute != undefined) {

        // Clear out & disable all dependent fields' value
        if (!form.getControl("msdyn_primaryincidenttype").getDisabled() || form.getAttribute("msdyn_primaryincidenttype").getValue() != null) {
          form.getAttribute("msdyn_primaryincidenttype").setValue(null);
        }
        form.getControl("msdyn_primaryincidenttype").setDisabled(true);
        form.getAttribute("ovs_asset").setValue(null);

        // If previous fields have values, we use the filtered fetchxml in a custom lookup view
        const workOrderTypeAttributeValue = workOrderTypeAttribute.getValue();
        const operationTypeAttributeValue = operationTypeAttribute.getValue();
        const siteAttributeValue = siteAttribute.getValue();
        if (operationTypeAttributeValue != null && operationTypeAttributeValue != undefined &&
          workOrderTypeAttributeValue != null && workOrderTypeAttributeValue != undefined &&
          siteAttributeValue != null && siteAttributeValue != undefined) {

          // Enable direct dependent field
          form.getControl("msdyn_primaryincidenttype").setDisabled(false);

          //Custom view for Activity Type
          const viewIdActivity = '{145AC9F2-4F7E-43DF-BEBD-442CB4C1F661}';
          const entityNameActivity = "msdyn_incidenttype";
          const viewDisplayNameActivity = Xrm.Utility.getResourceString("ovs_/resx/WorkOrder", "FilteredActivityType");
          const fetchXmlActivity = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="msdyn_incidenttype"><attribute name="msdyn_name" /><attribute name="msdyn_incidenttypeid" /><order attribute="msdyn_name" descending="false" /><filter type="and"><condition attribute="ts_operationtype" operator="eq" value="' + operationTypeAttributeValue[0].id + '" /><condition attribute="msdyn_defaultworkordertype" operator="eq" value="' + workOrderTypeAttributeValue[0].id + '" /></filter></entity></fetch>';
          const layoutXmlActivity = '<grid name="resultset" object="10010" jump="msdyn_name" select="1" icon="1" preview="1"><row name="result" id="msdyn_incidenttypeid"><cell name="msdyn_name" width="200" /></row></grid>';
          form.getControl("msdyn_primaryincidenttype").addCustomView(viewIdActivity, entityNameActivity, viewDisplayNameActivity, fetchXmlActivity, layoutXmlActivity, true);

          // Populate operation asset
          const fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false"><entity name="msdyn_customerasset"><attribute name="msdyn_account" /><attribute name="msdyn_name" /><attribute name="msdyn_functionallocation" /><attribute name="msdyn_customerassetid" /><order attribute="msdyn_name" descending="true" /><filter type="and"><condition attribute="msdyn_customerassetcategory" operator="eq" value="' + operationTypeAttributeValue[0].id + '" /><condition attribute="msdyn_functionallocation" operator="eq" value="' + siteAttributeValue[0].id + '" /></filter></entity></fetch>';
          var encodedFetchXml = encodeURIComponent(fetchXml);
          Xrm.WebApi.retrieveMultipleRecords("msdyn_customerasset", "?fetchXml=" + encodedFetchXml).then(
            function success(result) {
              if (result.entities.length == 1) {
                const targetOperation = result.entities[0];
                const lookup = new Array();
                lookup[0] = new Object();
                lookup[0].id = targetOperation.msdyn_customerassetid;
                lookup[0].name = targetOperation.msdyn_name;
                lookup[0].entityType = 'msdyn_customerasset';

                form.getAttribute('ovs_asset').setValue(lookup);
              } else {
                // do not set a default if multiple records are found, error.
              }
            }
          );
        }
      }
    } catch (e) {
      throw new Error(e.Message);
    }
  }
}