declare namespace Form.ts_teamplanninginspectorhours.Main {
  namespace Information {
    namespace Tabs {
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "ts_inspector"): Xrm.LookupAttribute<"systemuser">;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: "ts_teamplanningdata"): Xrm.LookupAttribute<"ts_teamplanningdata">;
      get(name: "ts_varianceq1"): Xrm.NumberAttribute;
      get(name: "ts_varianceq2"): Xrm.NumberAttribute;
      get(name: "ts_varianceq3"): Xrm.NumberAttribute;
      get(name: "ts_varianceq4"): Xrm.NumberAttribute;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "ts_inspector"): Xrm.LookupControl<"systemuser">;
      get(name: "ts_name"): Xrm.StringControl;
      get(name: "ts_teamplanningdata"): Xrm.LookupControl<"ts_teamplanningdata">;
      get(name: "ts_varianceq1"): Xrm.NumberControl;
      get(name: "ts_varianceq2"): Xrm.NumberControl;
      get(name: "ts_varianceq3"): Xrm.NumberControl;
      get(name: "ts_varianceq4"): Xrm.NumberControl;
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
    getAttribute(attributeName: "ts_inspector"): Xrm.LookupAttribute<"systemuser">;
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_teamplanningdata"): Xrm.LookupAttribute<"ts_teamplanningdata">;
    getAttribute(attributeName: "ts_varianceq1"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_varianceq2"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_varianceq3"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_varianceq4"): Xrm.NumberAttribute;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "ts_inspector"): Xrm.LookupControl<"systemuser">;
    getControl(controlName: "ts_name"): Xrm.StringControl;
    getControl(controlName: "ts_teamplanningdata"): Xrm.LookupControl<"ts_teamplanningdata">;
    getControl(controlName: "ts_varianceq1"): Xrm.NumberControl;
    getControl(controlName: "ts_varianceq2"): Xrm.NumberControl;
    getControl(controlName: "ts_varianceq3"): Xrm.NumberControl;
    getControl(controlName: "ts_varianceq4"): Xrm.NumberControl;
    getControl(controlName: string): undefined;
  }
}
