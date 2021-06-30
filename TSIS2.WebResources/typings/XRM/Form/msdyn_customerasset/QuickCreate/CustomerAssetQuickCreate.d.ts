declare namespace Form.msdyn_customerasset.QuickCreate {
  namespace CustomerAssetQuickCreate {
    namespace Tabs {
      interface tab_1 extends Xrm.SectionCollectionBase {
        get(name: "tab_1_column_1_section_1"): Xrm.PageSection;
        get(name: "tab_1_column_2_section_1"): Xrm.PageSection;
        get(name: "tab_1_column_3_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "msdyn_account"): Xrm.LookupAttribute<"account">;
      get(name: "msdyn_customerassetcategory"): Xrm.LookupAttribute<"msdyn_customerassetcategory">;
      get(name: "msdyn_name"): Xrm.Attribute<string>;
      get(name: "msdyn_product"): Xrm.LookupAttribute<"product">;
      get(name: "ts_customerassetenglish"): Xrm.Attribute<string>;
      get(name: "ts_customerassetfrench"): Xrm.Attribute<string>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "msdyn_account"): Xrm.LookupControl<"account">;
      get(name: "msdyn_customerassetcategory"): Xrm.LookupControl<"msdyn_customerassetcategory">;
      get(name: "msdyn_name"): Xrm.StringControl;
      get(name: "msdyn_product"): Xrm.LookupControl<"product">;
      get(name: "ts_customerassetenglish"): Xrm.StringControl;
      get(name: "ts_customerassetfrench"): Xrm.StringControl;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "tab_1"): Xrm.PageTab<Tabs.tab_1>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface CustomerAssetQuickCreate extends Xrm.PageBase<CustomerAssetQuickCreate.Attributes,CustomerAssetQuickCreate.Tabs,CustomerAssetQuickCreate.Controls> {
    getAttribute(attributeName: "msdyn_account"): Xrm.LookupAttribute<"account">;
    getAttribute(attributeName: "msdyn_customerassetcategory"): Xrm.LookupAttribute<"msdyn_customerassetcategory">;
    getAttribute(attributeName: "msdyn_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_product"): Xrm.LookupAttribute<"product">;
    getAttribute(attributeName: "ts_customerassetenglish"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_customerassetfrench"): Xrm.Attribute<string>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "msdyn_account"): Xrm.LookupControl<"account">;
    getControl(controlName: "msdyn_customerassetcategory"): Xrm.LookupControl<"msdyn_customerassetcategory">;
    getControl(controlName: "msdyn_name"): Xrm.StringControl;
    getControl(controlName: "msdyn_product"): Xrm.LookupControl<"product">;
    getControl(controlName: "ts_customerassetenglish"): Xrm.StringControl;
    getControl(controlName: "ts_customerassetfrench"): Xrm.StringControl;
    getControl(controlName: string): undefined;
  }
}
