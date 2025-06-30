declare namespace Form.ts_workorderservicetaskworkspace.Main {
  namespace Information {
    namespace Tabs {
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: "ts_workorderservicetask"): Xrm.LookupAttribute<"msdyn_workorderservicetask">;
      get(name: "ts_workorderservicetaskstartdate"): Xrm.DateAttribute;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "ts_name"): Xrm.StringControl;
      get(name: "ts_workorderservicetask"): Xrm.LookupControl<"msdyn_workorderservicetask">;
      get(name: "ts_workorderservicetaskstartdate"): Xrm.DateControl;
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
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_workorderservicetask"): Xrm.LookupAttribute<"msdyn_workorderservicetask">;
    getAttribute(attributeName: "ts_workorderservicetaskstartdate"): Xrm.DateAttribute;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "ts_name"): Xrm.StringControl;
    getControl(controlName: "ts_workorderservicetask"): Xrm.LookupControl<"msdyn_workorderservicetask">;
    getControl(controlName: "ts_workorderservicetaskstartdate"): Xrm.DateControl;
    getControl(controlName: string): undefined;
  }
}
