declare namespace Form.tc_tcfiscalquarter.Main {
  namespace Information {
    namespace Tabs {
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "tc_fiscalquarterlbl"): Xrm.Attribute<string>;
      get(name: "tc_fiscalquarterlonglbl"): Xrm.Attribute<string>;
      get(name: "tc_fiscalquarternum"): Xrm.NumberAttribute;
      get(name: "tc_name"): Xrm.Attribute<string>;
      get(name: "tc_quarterend"): Xrm.DateAttribute;
      get(name: "tc_quarterstart"): Xrm.DateAttribute;
      get(name: "tc_tcfiscalyearid"): Xrm.LookupAttribute<"tc_tcfiscalyear">;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "tc_fiscalquarterlbl"): Xrm.StringControl;
      get(name: "tc_fiscalquarterlonglbl"): Xrm.StringControl;
      get(name: "tc_fiscalquarternum"): Xrm.NumberControl;
      get(name: "tc_name"): Xrm.StringControl;
      get(name: "tc_quarterend"): Xrm.DateControl;
      get(name: "tc_quarterstart"): Xrm.DateControl;
      get(name: "tc_tcfiscalyearid"): Xrm.LookupControl<"tc_tcfiscalyear">;
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
    getAttribute(attributeName: "tc_fiscalquarterlbl"): Xrm.Attribute<string>;
    getAttribute(attributeName: "tc_fiscalquarterlonglbl"): Xrm.Attribute<string>;
    getAttribute(attributeName: "tc_fiscalquarternum"): Xrm.NumberAttribute;
    getAttribute(attributeName: "tc_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "tc_quarterend"): Xrm.DateAttribute;
    getAttribute(attributeName: "tc_quarterstart"): Xrm.DateAttribute;
    getAttribute(attributeName: "tc_tcfiscalyearid"): Xrm.LookupAttribute<"tc_tcfiscalyear">;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "tc_fiscalquarterlbl"): Xrm.StringControl;
    getControl(controlName: "tc_fiscalquarterlonglbl"): Xrm.StringControl;
    getControl(controlName: "tc_fiscalquarternum"): Xrm.NumberControl;
    getControl(controlName: "tc_name"): Xrm.StringControl;
    getControl(controlName: "tc_quarterend"): Xrm.DateControl;
    getControl(controlName: "tc_quarterstart"): Xrm.DateControl;
    getControl(controlName: "tc_tcfiscalyearid"): Xrm.LookupControl<"tc_tcfiscalyear">;
    getControl(controlName: string): undefined;
  }
}
