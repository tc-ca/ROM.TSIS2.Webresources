declare namespace Form.tc_tcfiscalyear.Main {
  namespace Information {
    namespace Tabs {
      interface tab extends Xrm.SectionCollectionBase {
        get(name: "Fiscal Year"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "tc_fiscalend"): Xrm.DateAttribute;
      get(name: "tc_fiscalstart"): Xrm.DateAttribute;
      get(name: "tc_fiscalyearlonglbl"): Xrm.Attribute<string>;
      get(name: "tc_fiscalyearnum"): Xrm.Attribute<string>;
      get(name: "tc_name"): Xrm.Attribute<string>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "tc_fiscalend"): Xrm.DateControl;
      get(name: "tc_fiscalstart"): Xrm.DateControl;
      get(name: "tc_fiscalyearlonglbl"): Xrm.StringControl;
      get(name: "tc_fiscalyearnum"): Xrm.StringControl;
      get(name: "tc_name"): Xrm.StringControl;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "tab"): Xrm.PageTab<Tabs.tab>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Information extends Xrm.PageBase<Information.Attributes,Information.Tabs,Information.Controls> {
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "tc_fiscalend"): Xrm.DateAttribute;
    getAttribute(attributeName: "tc_fiscalstart"): Xrm.DateAttribute;
    getAttribute(attributeName: "tc_fiscalyearlonglbl"): Xrm.Attribute<string>;
    getAttribute(attributeName: "tc_fiscalyearnum"): Xrm.Attribute<string>;
    getAttribute(attributeName: "tc_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "tc_fiscalend"): Xrm.DateControl;
    getControl(controlName: "tc_fiscalstart"): Xrm.DateControl;
    getControl(controlName: "tc_fiscalyearlonglbl"): Xrm.StringControl;
    getControl(controlName: "tc_fiscalyearnum"): Xrm.StringControl;
    getControl(controlName: "tc_name"): Xrm.StringControl;
    getControl(controlName: string): undefined;
  }
}
