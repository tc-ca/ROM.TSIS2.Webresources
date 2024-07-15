declare namespace Form.ts_causefinding.Main {
  namespace Information {
    namespace Tabs {
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "ts_cause"): Xrm.LookupAttribute<"qm_rclegislation">;
      get(name: "ts_causetype"): Xrm.OptionSetAttribute<ts_findingtype>;
      get(name: "ts_comments"): Xrm.Attribute<string>;
      get(name: "ts_finding"): Xrm.LookupAttribute<"ovs_finding">;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "ts_cause"): Xrm.LookupControl<"qm_rclegislation">;
      get(name: "ts_causetype"): Xrm.OptionSetControl<ts_findingtype>;
      get(name: "ts_comments"): Xrm.StringControl;
      get(name: "ts_finding"): Xrm.LookupControl<"ovs_finding">;
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
    getAttribute(attributeName: "ts_cause"): Xrm.LookupAttribute<"qm_rclegislation">;
    getAttribute(attributeName: "ts_causetype"): Xrm.OptionSetAttribute<ts_findingtype>;
    getAttribute(attributeName: "ts_comments"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_finding"): Xrm.LookupAttribute<"ovs_finding">;
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "ts_cause"): Xrm.LookupControl<"qm_rclegislation">;
    getControl(controlName: "ts_causetype"): Xrm.OptionSetControl<ts_findingtype>;
    getControl(controlName: "ts_comments"): Xrm.StringControl;
    getControl(controlName: "ts_finding"): Xrm.LookupControl<"ovs_finding">;
    getControl(controlName: "ts_name"): Xrm.StringControl;
    getControl(controlName: string): undefined;
  }
}
