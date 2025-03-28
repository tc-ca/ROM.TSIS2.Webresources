declare namespace Form.ts_userregistration.Main {
  namespace Information {
    namespace Tabs {
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "ts_aaduser"): Xrm.LookupAttribute<"aaduser">;
      get(name: "ts_businessunit"): Xrm.LookupAttribute<"businessunit">;
      get(name: "ts_firstname"): Xrm.Attribute<string>;
      get(name: "ts_lastname"): Xrm.Attribute<string>;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "ts_aaduser"): Xrm.LookupControl<"aaduser">;
      get(name: "ts_businessunit"): Xrm.LookupControl<"businessunit">;
      get(name: "ts_firstname"): Xrm.StringControl;
      get(name: "ts_lastname"): Xrm.StringControl;
      get(name: "ts_name"): Xrm.StringControl;
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
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "ts_aaduser"): Xrm.LookupAttribute<"aaduser">;
    getAttribute(attributeName: "ts_businessunit"): Xrm.LookupAttribute<"businessunit">;
    getAttribute(attributeName: "ts_firstname"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_lastname"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "ts_aaduser"): Xrm.LookupControl<"aaduser">;
    getControl(controlName: "ts_businessunit"): Xrm.LookupControl<"businessunit">;
    getControl(controlName: "ts_firstname"): Xrm.StringControl;
    getControl(controlName: "ts_lastname"): Xrm.StringControl;
    getControl(controlName: "ts_name"): Xrm.StringControl;
    getControl(controlName: string): undefined;
  }
}
