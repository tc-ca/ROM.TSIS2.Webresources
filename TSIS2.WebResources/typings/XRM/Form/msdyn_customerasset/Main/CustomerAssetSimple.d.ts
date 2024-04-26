declare namespace Form.msdyn_customerasset.Main {
  namespace CustomerAssetSimple {
    namespace Tabs {
      interface _866051212d82446ca9fe976ccafa2c86 extends Xrm.SectionCollectionBase {
        get(name: "{a0b727a1-f333-461a-a7c2-cf9622a5d43d}"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "msdyn_account"): Xrm.LookupAttribute<"account">;
      get(name: "msdyn_customerassetcategory"): Xrm.LookupAttribute<"msdyn_customerassetcategory">;
      get(name: "msdyn_masterasset"): Xrm.LookupAttribute<"msdyn_customerasset">;
      get(name: "msdyn_name"): Xrm.Attribute<string>;
      get(name: "msdyn_parentasset"): Xrm.LookupAttribute<"msdyn_customerasset">;
      get(name: "msdyn_product"): Xrm.LookupAttribute<"product">;
      get(name: "msdyn_workorderproduct"): Xrm.LookupAttribute<"msdyn_workorderproduct">;
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "msdyn_account"): Xrm.LookupControl<"account">;
      get(name: "msdyn_customerassetcategory"): Xrm.LookupControl<"msdyn_customerassetcategory">;
      get(name: "msdyn_masterasset"): Xrm.LookupControl<"msdyn_customerasset">;
      get(name: "msdyn_name"): Xrm.StringControl;
      get(name: "msdyn_parentasset"): Xrm.LookupControl<"msdyn_customerasset">;
      get(name: "msdyn_product"): Xrm.LookupControl<"product">;
      get(name: "msdyn_workorderproduct"): Xrm.LookupControl<"msdyn_workorderproduct">;
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "{86605121-2d82-446c-a9fe-976ccafa2c86}"): Xrm.PageTab<Tabs._866051212d82446ca9fe976ccafa2c86>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface CustomerAssetSimple extends Xrm.PageBase<CustomerAssetSimple.Attributes,CustomerAssetSimple.Tabs,CustomerAssetSimple.Controls> {
    getAttribute(attributeName: "msdyn_account"): Xrm.LookupAttribute<"account">;
    getAttribute(attributeName: "msdyn_customerassetcategory"): Xrm.LookupAttribute<"msdyn_customerassetcategory">;
    getAttribute(attributeName: "msdyn_masterasset"): Xrm.LookupAttribute<"msdyn_customerasset">;
    getAttribute(attributeName: "msdyn_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_parentasset"): Xrm.LookupAttribute<"msdyn_customerasset">;
    getAttribute(attributeName: "msdyn_product"): Xrm.LookupAttribute<"product">;
    getAttribute(attributeName: "msdyn_workorderproduct"): Xrm.LookupAttribute<"msdyn_workorderproduct">;
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "msdyn_account"): Xrm.LookupControl<"account">;
    getControl(controlName: "msdyn_customerassetcategory"): Xrm.LookupControl<"msdyn_customerassetcategory">;
    getControl(controlName: "msdyn_masterasset"): Xrm.LookupControl<"msdyn_customerasset">;
    getControl(controlName: "msdyn_name"): Xrm.StringControl;
    getControl(controlName: "msdyn_parentasset"): Xrm.LookupControl<"msdyn_customerasset">;
    getControl(controlName: "msdyn_product"): Xrm.LookupControl<"product">;
    getControl(controlName: "msdyn_workorderproduct"): Xrm.LookupControl<"msdyn_workorderproduct">;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: string): undefined;
  }
}
