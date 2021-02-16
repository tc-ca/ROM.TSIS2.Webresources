declare namespace Form.ovs_unplannedforecast.Main {
  namespace Information {
    namespace Tabs {
      interface Tab extends Xrm.SectionCollectionBase {
        get(name: "Section"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ovs_capacity"): Xrm.NumberAttribute;
      get(name: "ovs_fiscalyear"): Xrm.LookupAttribute<"tc_tcfiscalyear">;
      get(name: "ovs_name"): Xrm.Attribute<string>;
      get(name: "ovs_quarter"): Xrm.LookupAttribute<"tc_tcfiscalquarter">;
      get(name: "ovs_region"): Xrm.LookupAttribute<"territory">;
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "ovs_capacity"): Xrm.NumberControl;
      get(name: "ovs_fiscalyear"): Xrm.LookupControl<"tc_tcfiscalyear">;
      get(name: "ovs_name"): Xrm.StringControl;
      get(name: "ovs_quarter"): Xrm.LookupControl<"tc_tcfiscalquarter">;
      get(name: "ovs_region"): Xrm.LookupControl<"territory">;
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "Tab"): Xrm.PageTab<Tabs.Tab>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Information extends Xrm.PageBase<Information.Attributes,Information.Tabs,Information.Controls> {
    getAttribute(attributeName: "ovs_capacity"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ovs_fiscalyear"): Xrm.LookupAttribute<"tc_tcfiscalyear">;
    getAttribute(attributeName: "ovs_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ovs_quarter"): Xrm.LookupAttribute<"tc_tcfiscalquarter">;
    getAttribute(attributeName: "ovs_region"): Xrm.LookupAttribute<"territory">;
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "ovs_capacity"): Xrm.NumberControl;
    getControl(controlName: "ovs_fiscalyear"): Xrm.LookupControl<"tc_tcfiscalyear">;
    getControl(controlName: "ovs_name"): Xrm.StringControl;
    getControl(controlName: "ovs_quarter"): Xrm.LookupControl<"tc_tcfiscalquarter">;
    getControl(controlName: "ovs_region"): Xrm.LookupControl<"territory">;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: string): undefined;
  }
}
