declare namespace Form.tc_tcfiscalperiod.Main {
  namespace Information {
    namespace Tabs {
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "tc_fiscalperiodlonglbl"): Xrm.Attribute<string>;
      get(name: "tc_name"): Xrm.Attribute<string>;
      get(name: "tc_tcfiscalquarterid"): Xrm.LookupAttribute<"tc_tcfiscalquarter">;
      get(name: "tc_tcfiscalyearid"): Xrm.LookupAttribute<"tc_tcfiscalyear">;
      get(name: "tc_tcmonthid"): Xrm.LookupAttribute<"tc_tcmonth">;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "tc_fiscalperiodlonglbl"): Xrm.StringControl;
      get(name: "tc_name"): Xrm.StringControl;
      get(name: "tc_tcfiscalquarterid"): Xrm.LookupControl<"tc_tcfiscalquarter">;
      get(name: "tc_tcfiscalyearid"): Xrm.LookupControl<"tc_tcfiscalyear">;
      get(name: "tc_tcmonthid"): Xrm.LookupControl<"tc_tcmonth">;
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
    getAttribute(attributeName: "tc_fiscalperiodlonglbl"): Xrm.Attribute<string>;
    getAttribute(attributeName: "tc_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "tc_tcfiscalquarterid"): Xrm.LookupAttribute<"tc_tcfiscalquarter">;
    getAttribute(attributeName: "tc_tcfiscalyearid"): Xrm.LookupAttribute<"tc_tcfiscalyear">;
    getAttribute(attributeName: "tc_tcmonthid"): Xrm.LookupAttribute<"tc_tcmonth">;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "tc_fiscalperiodlonglbl"): Xrm.StringControl;
    getControl(controlName: "tc_name"): Xrm.StringControl;
    getControl(controlName: "tc_tcfiscalquarterid"): Xrm.LookupControl<"tc_tcfiscalquarter">;
    getControl(controlName: "tc_tcfiscalyearid"): Xrm.LookupControl<"tc_tcfiscalyear">;
    getControl(controlName: "tc_tcmonthid"): Xrm.LookupControl<"tc_tcmonth">;
    getControl(controlName: string): undefined;
  }
}
