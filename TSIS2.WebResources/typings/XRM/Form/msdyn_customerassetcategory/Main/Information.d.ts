declare namespace Form.msdyn_customerassetcategory.Main {
  namespace Information {
    namespace Tabs {
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "msdyn_name"): Xrm.Attribute<string>;
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "ts_assetcategorynameenglish"): Xrm.Attribute<string>;
      get(name: "ts_assetcategorynamefrench"): Xrm.Attribute<string>;
      get(name: "ts_assetcategorytype"): Xrm.OptionSetAttribute<ts_assetcategorytype>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "msdyn_name"): Xrm.StringControl;
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "ts_assetcategorynameenglish"): Xrm.StringControl;
      get(name: "ts_assetcategorynamefrench"): Xrm.StringControl;
      get(name: "ts_assetcategorytype"): Xrm.OptionSetControl<ts_assetcategorytype>;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Information extends Xrm.PageBase<Information.Attributes,Information.Tabs,Information.Controls> {
    getAttribute(attributeName: "msdyn_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "ts_assetcategorynameenglish"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_assetcategorynamefrench"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_assetcategorytype"): Xrm.OptionSetAttribute<ts_assetcategorytype>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "msdyn_name"): Xrm.StringControl;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "ts_assetcategorynameenglish"): Xrm.StringControl;
    getControl(controlName: "ts_assetcategorynamefrench"): Xrm.StringControl;
    getControl(controlName: "ts_assetcategorytype"): Xrm.OptionSetControl<ts_assetcategorytype>;
    getControl(controlName: string): undefined;
  }
}
