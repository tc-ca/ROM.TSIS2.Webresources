declare namespace Form.ts_planningsettings.Main {
  namespace Information {
    namespace Tabs {
      interface tab_2 extends Xrm.SectionCollectionBase {
        get(name: "tab_2_section_1"): Xrm.PageSection;
        get(name: "tab_2_section_2"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_3 extends Xrm.SectionCollectionBase {
        get(name: "tab_3_section_1"): Xrm.PageSection;
        get(name: "tab_3_section_2"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "statecode"): Xrm.OptionSetAttribute<ts_planningsettings_statecode>;
      get(name: "ts_effectivedate"): Xrm.DateAttribute;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: "ts_region"): Xrm.LookupAttribute<"territory">;
      get(name: "ts_stakeholder"): Xrm.LookupAttribute<"account">;
      get(name: "ts_task"): Xrm.OptionSetAttribute<ts_planningsettings_ts_task>;
      get(name: "ts_taskstatus"): Xrm.OptionSetAttribute<ts_planningsettings_ts_taskstatus>;
      get(name: "ts_totalcount"): Xrm.NumberAttribute;
      get(name: "ts_workorderowner"): Xrm.LookupAttribute<"systemuser">;
      get(name: "ts_workordertype"): Xrm.LookupAttribute<"msdyn_workordertype">;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "notescontrol"): Xrm.BaseControl;
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "statecode"): Xrm.OptionSetControl<ts_planningsettings_statecode>;
      get(name: "ts_effectivedate"): Xrm.DateControl;
      get(name: "ts_name"): Xrm.StringControl;
      get(name: "ts_region"): Xrm.LookupControl<"territory">;
      get(name: "ts_stakeholder"): Xrm.LookupControl<"account">;
      get(name: "ts_task"): Xrm.OptionSetControl<ts_planningsettings_ts_task>;
      get(name: "ts_taskstatus"): Xrm.OptionSetControl<ts_planningsettings_ts_taskstatus>;
      get(name: "ts_totalcount"): Xrm.NumberControl;
      get(name: "ts_workorderowner"): Xrm.LookupControl<"systemuser">;
      get(name: "ts_workordertype"): Xrm.LookupControl<"msdyn_workordertype">;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "tab_2"): Xrm.PageTab<Tabs.tab_2>;
      get(name: "tab_3"): Xrm.PageTab<Tabs.tab_3>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Information extends Xrm.PageBase<Information.Attributes,Information.Tabs,Information.Controls> {
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "statecode"): Xrm.OptionSetAttribute<ts_planningsettings_statecode>;
    getAttribute(attributeName: "ts_effectivedate"): Xrm.DateAttribute;
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_region"): Xrm.LookupAttribute<"territory">;
    getAttribute(attributeName: "ts_stakeholder"): Xrm.LookupAttribute<"account">;
    getAttribute(attributeName: "ts_task"): Xrm.OptionSetAttribute<ts_planningsettings_ts_task>;
    getAttribute(attributeName: "ts_taskstatus"): Xrm.OptionSetAttribute<ts_planningsettings_ts_taskstatus>;
    getAttribute(attributeName: "ts_totalcount"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_workorderowner"): Xrm.LookupAttribute<"systemuser">;
    getAttribute(attributeName: "ts_workordertype"): Xrm.LookupAttribute<"msdyn_workordertype">;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "notescontrol"): Xrm.BaseControl;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "statecode"): Xrm.OptionSetControl<ts_planningsettings_statecode>;
    getControl(controlName: "ts_effectivedate"): Xrm.DateControl;
    getControl(controlName: "ts_name"): Xrm.StringControl;
    getControl(controlName: "ts_region"): Xrm.LookupControl<"territory">;
    getControl(controlName: "ts_stakeholder"): Xrm.LookupControl<"account">;
    getControl(controlName: "ts_task"): Xrm.OptionSetControl<ts_planningsettings_ts_task>;
    getControl(controlName: "ts_taskstatus"): Xrm.OptionSetControl<ts_planningsettings_ts_taskstatus>;
    getControl(controlName: "ts_totalcount"): Xrm.NumberControl;
    getControl(controlName: "ts_workorderowner"): Xrm.LookupControl<"systemuser">;
    getControl(controlName: "ts_workordertype"): Xrm.LookupControl<"msdyn_workordertype">;
    getControl(controlName: string): undefined;
  }
}
