declare namespace Form.msdyn_customerasset.Main {
  namespace CustomerAssetMobile {
    namespace Tabs {
      interface CommandsTab extends Xrm.SectionCollectionBase {
        get(name: "CommandsSection"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface DeviceInsightsTab extends Xrm.SectionCollectionBase {
        get(name: "DeviceInsightsSection"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface PropertyLogsTab extends Xrm.SectionCollectionBase {
        get(name: "tab_3_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface fstab_AssetHierarchy extends Xrm.SectionCollectionBase {
        get(name: "AssetHierarchySection"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface fstab_sub_grids extends Xrm.SectionCollectionBase {
        get(name: "fstab_sub_grids_section"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface fstab_summary extends Xrm.SectionCollectionBase {
        get(name: "ConnectedDeviceAttributes"): Xrm.PageSection;
        get(name: "Device Summary Visualization"): Xrm.PageSection;
        get(name: "KnowledgeSection"): Xrm.PageSection;
        get(name: "fstab_summary_column_2_section_1"): Xrm.PageSection;
        get(name: "fstab_summary_column_3_section_1"): Xrm.PageSection;
        get(name: "fstab_summary_location"): Xrm.PageSection;
        get(name: "fstab_summary_section_general"): Xrm.PageSection;
        get(name: "{576663bb-ea91-486d-8f88-da4cd98df0eb}"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "msdyn_account"): Xrm.LookupAttribute<"account">;
      get(name: "msdyn_customerassetcategory"): Xrm.LookupAttribute<"msdyn_customerassetcategory">;
      get(name: "msdyn_deviceid"): Xrm.Attribute<string>;
      get(name: "msdyn_functionallocation"): Xrm.LookupAttribute<"msdyn_functionallocation">;
      get(name: "msdyn_latitude"): Xrm.NumberAttribute;
      get(name: "msdyn_longitude"): Xrm.NumberAttribute;
      get(name: "msdyn_masterasset"): Xrm.LookupAttribute<"msdyn_customerasset">;
      get(name: "msdyn_name"): Xrm.Attribute<string>;
      get(name: "msdyn_parentasset"): Xrm.LookupAttribute<"msdyn_customerasset">;
      get(name: "msdyn_product"): Xrm.LookupAttribute<"product">;
      get(name: "msdyn_registrationstatus"): Xrm.OptionSetAttribute<msdyn_customerasset_msdyn_registrationstatus>;
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "Asset_SubAsset"): Xrm.SubGridControl<"msdyn_customerasset">;
      get(name: "CommandsGrid"): Xrm.SubGridControl<"msdyn_iotdevicecommand">;
      get(name: "ConnectedDevices"): Xrm.SubGridControl<"connection">;
      get(name: "CurrentPropertyValuesSubgrid"): Xrm.SubGridControl<"msdyn_propertylog">;
      get(name: "KnowledgeArticlesSubGrid"): Xrm.SubGridControl<"knowledgearticle">;
      get(name: "PropertyLogsSubGrid"): Xrm.SubGridControl<"msdyn_propertylog">;
      get(name: "WORKORDERS"): Xrm.SubGridControl<"msdyn_workorder">;
      get(name: "msdyn_account"): Xrm.LookupControl<"account">;
      get(name: "msdyn_customerassetcategory"): Xrm.LookupControl<"msdyn_customerassetcategory">;
      get(name: "msdyn_deviceid"): Xrm.StringControl;
      get(name: "msdyn_deviceid1"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "msdyn_deviceid2"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "msdyn_functionallocation"): Xrm.LookupControl<"msdyn_functionallocation">;
      get(name: "msdyn_latitude"): Xrm.NumberControl;
      get(name: "msdyn_longitude"): Xrm.NumberControl;
      get(name: "msdyn_masterasset"): Xrm.LookupControl<"msdyn_customerasset">;
      get(name: "msdyn_name"): Xrm.StringControl;
      get(name: "msdyn_name1"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "msdyn_parentasset"): Xrm.LookupControl<"msdyn_customerasset">;
      get(name: "msdyn_product"): Xrm.LookupControl<"product">;
      get(name: "msdyn_registrationstatus"): Xrm.OptionSetControl<msdyn_customerasset_msdyn_registrationstatus>;
      get(name: "notescontrol"): Xrm.BaseControl;
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "CommandsTab"): Xrm.PageTab<Tabs.CommandsTab>;
      get(name: "DeviceInsightsTab"): Xrm.PageTab<Tabs.DeviceInsightsTab>;
      get(name: "PropertyLogsTab"): Xrm.PageTab<Tabs.PropertyLogsTab>;
      get(name: "fstab_AssetHierarchy"): Xrm.PageTab<Tabs.fstab_AssetHierarchy>;
      get(name: "fstab_sub_grids"): Xrm.PageTab<Tabs.fstab_sub_grids>;
      get(name: "fstab_summary"): Xrm.PageTab<Tabs.fstab_summary>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface CustomerAssetMobile extends Xrm.PageBase<CustomerAssetMobile.Attributes,CustomerAssetMobile.Tabs,CustomerAssetMobile.Controls> {
    getAttribute(attributeName: "msdyn_account"): Xrm.LookupAttribute<"account">;
    getAttribute(attributeName: "msdyn_customerassetcategory"): Xrm.LookupAttribute<"msdyn_customerassetcategory">;
    getAttribute(attributeName: "msdyn_deviceid"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_functionallocation"): Xrm.LookupAttribute<"msdyn_functionallocation">;
    getAttribute(attributeName: "msdyn_latitude"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_longitude"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_masterasset"): Xrm.LookupAttribute<"msdyn_customerasset">;
    getAttribute(attributeName: "msdyn_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_parentasset"): Xrm.LookupAttribute<"msdyn_customerasset">;
    getAttribute(attributeName: "msdyn_product"): Xrm.LookupAttribute<"product">;
    getAttribute(attributeName: "msdyn_registrationstatus"): Xrm.OptionSetAttribute<msdyn_customerasset_msdyn_registrationstatus>;
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "Asset_SubAsset"): Xrm.SubGridControl<"msdyn_customerasset">;
    getControl(controlName: "CommandsGrid"): Xrm.SubGridControl<"msdyn_iotdevicecommand">;
    getControl(controlName: "ConnectedDevices"): Xrm.SubGridControl<"connection">;
    getControl(controlName: "CurrentPropertyValuesSubgrid"): Xrm.SubGridControl<"msdyn_propertylog">;
    getControl(controlName: "KnowledgeArticlesSubGrid"): Xrm.SubGridControl<"knowledgearticle">;
    getControl(controlName: "PropertyLogsSubGrid"): Xrm.SubGridControl<"msdyn_propertylog">;
    getControl(controlName: "WORKORDERS"): Xrm.SubGridControl<"msdyn_workorder">;
    getControl(controlName: "msdyn_account"): Xrm.LookupControl<"account">;
    getControl(controlName: "msdyn_customerassetcategory"): Xrm.LookupControl<"msdyn_customerassetcategory">;
    getControl(controlName: "msdyn_deviceid"): Xrm.StringControl;
    getControl(controlName: "msdyn_deviceid1"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "msdyn_deviceid2"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "msdyn_functionallocation"): Xrm.LookupControl<"msdyn_functionallocation">;
    getControl(controlName: "msdyn_latitude"): Xrm.NumberControl;
    getControl(controlName: "msdyn_longitude"): Xrm.NumberControl;
    getControl(controlName: "msdyn_masterasset"): Xrm.LookupControl<"msdyn_customerasset">;
    getControl(controlName: "msdyn_name"): Xrm.StringControl;
    getControl(controlName: "msdyn_name1"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "msdyn_parentasset"): Xrm.LookupControl<"msdyn_customerasset">;
    getControl(controlName: "msdyn_product"): Xrm.LookupControl<"product">;
    getControl(controlName: "msdyn_registrationstatus"): Xrm.OptionSetControl<msdyn_customerasset_msdyn_registrationstatus>;
    getControl(controlName: "notescontrol"): Xrm.BaseControl;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: string): undefined;
  }
}
