declare namespace Form.ts_enforcementaction.Main {
  namespace Information {
    namespace Tabs {
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "ts_case"): Xrm.LookupAttribute<"incident">;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: "ts_type"): Xrm.OptionSetAttribute<ts_type>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "Findings"): Xrm.SubGridControl<"ovs_finding">;
      get(name: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "notescontrol"): Xrm.BaseControl;
      get(name: "ts_case"): Xrm.LookupControl<"incident">;
      get(name: "ts_name"): Xrm.StringControl;
      get(name: "ts_type"): Xrm.OptionSetControl<ts_type>;
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
    getAttribute(attributeName: "ts_case"): Xrm.LookupAttribute<"incident">;
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_type"): Xrm.OptionSetAttribute<ts_type>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "Findings"): Xrm.SubGridControl<"ovs_finding">;
    getControl(controlName: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "notescontrol"): Xrm.BaseControl;
    getControl(controlName: "ts_case"): Xrm.LookupControl<"incident">;
    getControl(controlName: "ts_name"): Xrm.StringControl;
    getControl(controlName: "ts_type"): Xrm.OptionSetControl<ts_type>;
    getControl(controlName: string): undefined;
  }
}
