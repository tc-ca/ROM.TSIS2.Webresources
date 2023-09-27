declare namespace Form.ts_nonoversightactivity.Main {
  namespace Information {
    namespace Tabs {
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "ts_activitytime"): Xrm.NumberAttribute;
      get(name: "ts_category"): Xrm.LookupAttribute<"ts_timetrackingcategory">;
      get(name: "ts_dateofactivity"): Xrm.DateAttribute;
      get(name: "ts_description"): Xrm.Attribute<string>;
      get(name: "ts_fiscalyear"): Xrm.LookupAttribute<"tc_tcfiscalyear">;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: "ts_program"): Xrm.LookupAttribute<"businessunit">;
      get(name: "ts_quarter"): Xrm.OptionSetAttribute<ts_quarter>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "ts_activitytime"): Xrm.NumberControl;
      get(name: "ts_category"): Xrm.LookupControl<"ts_timetrackingcategory">;
      get(name: "ts_dateofactivity"): Xrm.DateControl;
      get(name: "ts_description"): Xrm.StringControl;
      get(name: "ts_fiscalyear"): Xrm.LookupControl<"tc_tcfiscalyear">;
      get(name: "ts_name"): Xrm.StringControl;
      get(name: "ts_program"): Xrm.LookupControl<"businessunit">;
      get(name: "ts_quarter"): Xrm.OptionSetControl<ts_quarter>;
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
    getAttribute(attributeName: "ts_activitytime"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_category"): Xrm.LookupAttribute<"ts_timetrackingcategory">;
    getAttribute(attributeName: "ts_dateofactivity"): Xrm.DateAttribute;
    getAttribute(attributeName: "ts_description"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_fiscalyear"): Xrm.LookupAttribute<"tc_tcfiscalyear">;
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_program"): Xrm.LookupAttribute<"businessunit">;
    getAttribute(attributeName: "ts_quarter"): Xrm.OptionSetAttribute<ts_quarter>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "ts_activitytime"): Xrm.NumberControl;
    getControl(controlName: "ts_category"): Xrm.LookupControl<"ts_timetrackingcategory">;
    getControl(controlName: "ts_dateofactivity"): Xrm.DateControl;
    getControl(controlName: "ts_description"): Xrm.StringControl;
    getControl(controlName: "ts_fiscalyear"): Xrm.LookupControl<"tc_tcfiscalyear">;
    getControl(controlName: "ts_name"): Xrm.StringControl;
    getControl(controlName: "ts_program"): Xrm.LookupControl<"businessunit">;
    getControl(controlName: "ts_quarter"): Xrm.OptionSetControl<ts_quarter>;
    getControl(controlName: string): undefined;
  }
}
