declare namespace Form.msdyn_customerasset.Main {
  namespace CustomerAsset {
    namespace Tabs {
      interface AlertsTab extends Xrm.SectionCollectionBase {
        get(name: "AlertsSection"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface AssetHierarchy extends Xrm.SectionCollectionBase {
        get(name: "AssetHierarchySection"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
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
        get(name: "tab_4_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface assets_and_locations_tab extends Xrm.SectionCollectionBase {
        get(name: "tab_5_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface b3f360611f164bbbbd7444fac42c9094 extends Xrm.SectionCollectionBase {
        get(name: "Asset_WorkOrder"): Xrm.PageSection;
        get(name: "Connected Device Readings"): Xrm.PageSection;
        get(name: "ConnectedDeviceAttributes"): Xrm.PageSection;
        get(name: "Device Summary Visualization"): Xrm.PageSection;
        get(name: "fstab_summary_location"): Xrm.PageSection;
        get(name: "knowledgesection"): Xrm.PageSection;
        get(name: "{216040c1-499b-4120-8175-2efb7536e940}"): Xrm.PageSection;
        get(name: "{576663bb-ea91-486d-8f88-da4cd98df0eb}"): Xrm.PageSection;
        get(name: "{b3f36061-1f16-4bbb-bd74-44fac42c9094}_section_3"): Xrm.PageSection;
        get(name: "{b3f36061-1f16-4bbb-bd74-44fac42c9094}_section_7"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface properties_tab extends Xrm.SectionCollectionBase {
        get(name: "tab_6_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "msdyn_account"): Xrm.LookupAttribute<"account">;
      get(name: "msdyn_assettag"): Xrm.Attribute<string>;
      get(name: "msdyn_customerassetcategory"): Xrm.LookupAttribute<"msdyn_customerassetcategory">;
      get(name: "msdyn_deviceid"): Xrm.Attribute<string>;
      get(name: "msdyn_functionallocation"): Xrm.LookupAttribute<"msdyn_functionallocation">;
      get(name: "msdyn_latitude"): Xrm.NumberAttribute;
      get(name: "msdyn_longitude"): Xrm.NumberAttribute;
      get(name: "msdyn_manufacturingdate"): Xrm.DateAttribute;
      get(name: "msdyn_masterasset"): Xrm.LookupAttribute<"msdyn_customerasset">;
      get(name: "msdyn_name"): Xrm.Attribute<string>;
      get(name: "msdyn_parentasset"): Xrm.LookupAttribute<"msdyn_customerasset">;
      get(name: "msdyn_product"): Xrm.LookupAttribute<"product">;
      get(name: "msdyn_registrationstatus"): Xrm.OptionSetAttribute<msdyn_customerasset_msdyn_registrationstatus>;
      get(name: "msdyn_workorderproduct"): Xrm.LookupAttribute<"msdyn_workorderproduct">;
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "ts_customerassetenglish"): Xrm.Attribute<string>;
      get(name: "ts_customerassetfrench"): Xrm.Attribute<string>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "AlertsGrid"): Xrm.SubGridControl<"msdyn_iotalert">;
      get(name: "Asset_SubAsset"): Xrm.SubGridControl<"msdyn_customerasset">;
      get(name: "Asset_WorkOrders_Tags"): Xrm.SubGridControl<"msdyn_workorder">;
      get(name: "CommandsGrid"): Xrm.SubGridControl<"msdyn_iotdevicecommand">;
      get(name: "ConnectedDevices"): Xrm.SubGridControl<"connection">;
      get(name: "CurrentPropertyValuesSubgrid"): Xrm.SubGridControl<"msdyn_propertylog">;
      get(name: "CurrentPropertyValuesSubgrid1"): Xrm.SubGridControl<"msdyn_propertylog">;
      get(name: "KnowledgeArticlesSubGrid"): Xrm.SubGridControl<"knowledgearticle">;
      get(name: "PropertyLogsSubGrid"): Xrm.SubGridControl<"msdyn_propertylog">;
      get(name: "PropertyLogsSubGrid1"): Xrm.SubGridControl<"msdyn_propertylog">;
      get(name: "WebResource_PowerBIConnectedDevices"): Xrm.WebResourceControl;
      get(name: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "msdyn_account"): Xrm.LookupControl<"account">;
      get(name: "msdyn_assettag"): Xrm.StringControl;
      get(name: "msdyn_customerassetcategory"): Xrm.LookupControl<"msdyn_customerassetcategory">;
      get(name: "msdyn_deviceid"): Xrm.StringControl;
      get(name: "msdyn_deviceid1"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "msdyn_deviceid2"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "msdyn_functionallocation"): Xrm.LookupControl<"msdyn_functionallocation">;
      get(name: "msdyn_latitude"): Xrm.NumberControl;
      get(name: "msdyn_longitude"): Xrm.NumberControl;
      get(name: "msdyn_manufacturingdate"): Xrm.DateControl;
      get(name: "msdyn_masterasset"): Xrm.LookupControl<"msdyn_customerasset">;
      get(name: "msdyn_name"): Xrm.StringControl;
      get(name: "msdyn_name1"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "msdyn_name2"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "msdyn_parentasset"): Xrm.LookupControl<"msdyn_customerasset">;
      get(name: "msdyn_product"): Xrm.LookupControl<"product">;
      get(name: "msdyn_registrationstatus"): Xrm.OptionSetControl<msdyn_customerasset_msdyn_registrationstatus>;
      get(name: "msdyn_workorderproduct"): Xrm.LookupControl<"msdyn_workorderproduct">;
      get(name: "notescontrol"): Xrm.BaseControl;
      get(name: "ts_customerassetenglish"): Xrm.StringControl;
      get(name: "ts_customerassetfrench"): Xrm.StringControl;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "AlertsTab"): Xrm.PageTab<Tabs.AlertsTab>;
      get(name: "AssetHierarchy"): Xrm.PageTab<Tabs.AssetHierarchy>;
      get(name: "CommandsTab"): Xrm.PageTab<Tabs.CommandsTab>;
      get(name: "DeviceInsightsTab"): Xrm.PageTab<Tabs.DeviceInsightsTab>;
      get(name: "PropertyLogsTab"): Xrm.PageTab<Tabs.PropertyLogsTab>;
      get(name: "assets_and_locations_tab"): Xrm.PageTab<Tabs.assets_and_locations_tab>;
      get(name: "{b3f36061-1f16-4bbb-bd74-44fac42c9094}"): Xrm.PageTab<Tabs.b3f360611f164bbbbd7444fac42c9094>;
      get(name: "properties_tab"): Xrm.PageTab<Tabs.properties_tab>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface CustomerAsset extends Xrm.PageBase<CustomerAsset.Attributes,CustomerAsset.Tabs,CustomerAsset.Controls> {
    getAttribute(attributeName: "msdyn_account"): Xrm.LookupAttribute<"account">;
    getAttribute(attributeName: "msdyn_assettag"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_customerassetcategory"): Xrm.LookupAttribute<"msdyn_customerassetcategory">;
    getAttribute(attributeName: "msdyn_deviceid"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_functionallocation"): Xrm.LookupAttribute<"msdyn_functionallocation">;
    getAttribute(attributeName: "msdyn_latitude"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_longitude"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_manufacturingdate"): Xrm.DateAttribute;
    getAttribute(attributeName: "msdyn_masterasset"): Xrm.LookupAttribute<"msdyn_customerasset">;
    getAttribute(attributeName: "msdyn_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_parentasset"): Xrm.LookupAttribute<"msdyn_customerasset">;
    getAttribute(attributeName: "msdyn_product"): Xrm.LookupAttribute<"product">;
    getAttribute(attributeName: "msdyn_registrationstatus"): Xrm.OptionSetAttribute<msdyn_customerasset_msdyn_registrationstatus>;
    getAttribute(attributeName: "msdyn_workorderproduct"): Xrm.LookupAttribute<"msdyn_workorderproduct">;
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "ts_customerassetenglish"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_customerassetfrench"): Xrm.Attribute<string>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "AlertsGrid"): Xrm.SubGridControl<"msdyn_iotalert">;
    getControl(controlName: "Asset_SubAsset"): Xrm.SubGridControl<"msdyn_customerasset">;
    getControl(controlName: "Asset_WorkOrders_Tags"): Xrm.SubGridControl<"msdyn_workorder">;
    getControl(controlName: "CommandsGrid"): Xrm.SubGridControl<"msdyn_iotdevicecommand">;
    getControl(controlName: "ConnectedDevices"): Xrm.SubGridControl<"connection">;
    getControl(controlName: "CurrentPropertyValuesSubgrid"): Xrm.SubGridControl<"msdyn_propertylog">;
    getControl(controlName: "CurrentPropertyValuesSubgrid1"): Xrm.SubGridControl<"msdyn_propertylog">;
    getControl(controlName: "KnowledgeArticlesSubGrid"): Xrm.SubGridControl<"knowledgearticle">;
    getControl(controlName: "PropertyLogsSubGrid"): Xrm.SubGridControl<"msdyn_propertylog">;
    getControl(controlName: "PropertyLogsSubGrid1"): Xrm.SubGridControl<"msdyn_propertylog">;
    getControl(controlName: "WebResource_PowerBIConnectedDevices"): Xrm.WebResourceControl;
    getControl(controlName: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "msdyn_account"): Xrm.LookupControl<"account">;
    getControl(controlName: "msdyn_assettag"): Xrm.StringControl;
    getControl(controlName: "msdyn_customerassetcategory"): Xrm.LookupControl<"msdyn_customerassetcategory">;
    getControl(controlName: "msdyn_deviceid"): Xrm.StringControl;
    getControl(controlName: "msdyn_deviceid1"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "msdyn_deviceid2"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "msdyn_functionallocation"): Xrm.LookupControl<"msdyn_functionallocation">;
    getControl(controlName: "msdyn_latitude"): Xrm.NumberControl;
    getControl(controlName: "msdyn_longitude"): Xrm.NumberControl;
    getControl(controlName: "msdyn_manufacturingdate"): Xrm.DateControl;
    getControl(controlName: "msdyn_masterasset"): Xrm.LookupControl<"msdyn_customerasset">;
    getControl(controlName: "msdyn_name"): Xrm.StringControl;
    getControl(controlName: "msdyn_name1"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "msdyn_name2"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "msdyn_parentasset"): Xrm.LookupControl<"msdyn_customerasset">;
    getControl(controlName: "msdyn_product"): Xrm.LookupControl<"product">;
    getControl(controlName: "msdyn_registrationstatus"): Xrm.OptionSetControl<msdyn_customerasset_msdyn_registrationstatus>;
    getControl(controlName: "msdyn_workorderproduct"): Xrm.LookupControl<"msdyn_workorderproduct">;
    getControl(controlName: "notescontrol"): Xrm.BaseControl;
    getControl(controlName: "ts_customerassetenglish"): Xrm.StringControl;
    getControl(controlName: "ts_customerassetfrench"): Xrm.StringControl;
    getControl(controlName: string): undefined;
  }
}
