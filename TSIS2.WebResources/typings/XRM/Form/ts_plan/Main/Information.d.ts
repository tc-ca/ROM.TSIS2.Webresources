declare namespace Form.ts_plan.Main {
  namespace Information {
    namespace Tabs {
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "ts_fiscalyear"): Xrm.LookupAttribute<"tc_tcfiscalyear">;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: "ts_team"): Xrm.LookupAttribute<"team">;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "suggested_inspections_grid"): Xrm.BaseControl;
      get(name: "suggested_inspectorhours_grid"): Xrm.SubGridControl<"ts_planinspectorhours">;
      get(name: "ts_fiscalyear"): Xrm.LookupControl<"tc_tcfiscalyear">;
      get(name: "ts_name"): Xrm.StringControl;
      get(name: "ts_team"): Xrm.LookupControl<"team">;
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
    getAttribute(attributeName: "ts_fiscalyear"): Xrm.LookupAttribute<"tc_tcfiscalyear">;
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_team"): Xrm.LookupAttribute<"team">;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "suggested_inspections_grid"): Xrm.BaseControl;
    getControl(controlName: "suggested_inspectorhours_grid"): Xrm.SubGridControl<"ts_planinspectorhours">;
    getControl(controlName: "ts_fiscalyear"): Xrm.LookupControl<"tc_tcfiscalyear">;
    getControl(controlName: "ts_name"): Xrm.StringControl;
    getControl(controlName: "ts_team"): Xrm.LookupControl<"team">;
    getControl(controlName: string): undefined;
  }
}
