declare namespace Form.msdyn_incidenttype.Main {
  namespace Information {
    namespace Tabs {
      interface c6408e8549e74216bf96986a20c64ecb extends Xrm.SectionCollectionBase {
        get(name: "{2405DB6B-E18C-49E5-A76B-505837745C84}"): Xrm.PageSection;
        get(name: "{aa02fbb3-348e-4f8c-bc8e-1fe3f9bd7d90}"): Xrm.PageSection;
        get(name: "{c6408e85-49e7-4216-bf96-986a20c64ecb}_section_2"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface f1tab_details extends Xrm.SectionCollectionBase {
        get(name: "tab_3_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_4 extends Xrm.SectionCollectionBase {
        get(name: "tab_4_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_5 extends Xrm.SectionCollectionBase {
        get(name: "tab_5_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_6 extends Xrm.SectionCollectionBase {
        get(name: "tab_6_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_7 extends Xrm.SectionCollectionBase {
        get(name: "tab_7_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "msdyn_copyincidentitemstoagreement"): Xrm.OptionSetAttribute<boolean>;
      get(name: "msdyn_defaultworkordertype"): Xrm.LookupAttribute<"msdyn_workordertype">;
      get(name: "msdyn_description"): Xrm.Attribute<string>;
      get(name: "msdyn_estimatedduration"): Xrm.NumberAttribute;
      get(name: "msdyn_lastcalculatedtime"): Xrm.DateAttribute;
      get(name: "msdyn_name"): Xrm.Attribute<string>;
      get(name: "msdyn_suggestedduration"): Xrm.NumberAttribute;
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "statecode"): Xrm.OptionSetAttribute<msdyn_incidenttype_statecode>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "Characteristics"): Xrm.SubGridControl<"msdyn_incidenttypecharacteristic">;
      get(name: "footer_statecode"): Xrm.OptionSetControl<msdyn_incidenttype_statecode>;
      get(name: "incidentproductssubgrid"): Xrm.SubGridControl<"msdyn_incidenttypeproduct">;
      get(name: "incidentservicessubgrid"): Xrm.SubGridControl<"msdyn_incidenttypeservice">;
      get(name: "msdyn_copyincidentitemstoagreement"): Xrm.OptionSetControl<boolean>;
      get(name: "msdyn_defaultworkordertype"): Xrm.LookupControl<"msdyn_workordertype">;
      get(name: "msdyn_description"): Xrm.StringControl;
      get(name: "msdyn_estimatedduration"): Xrm.NumberControl;
      get(name: "msdyn_lastcalculatedtime"): Xrm.DateControl;
      get(name: "msdyn_name"): Xrm.StringControl;
      get(name: "msdyn_suggestedduration"): Xrm.NumberControl;
      get(name: "notescontrol"): Xrm.BaseControl;
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "servicetasksgrid"): Xrm.SubGridControl<"msdyn_incidenttypeservicetask">;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "{c6408e85-49e7-4216-bf96-986a20c64ecb}"): Xrm.PageTab<Tabs.c6408e8549e74216bf96986a20c64ecb>;
      get(name: "f1tab_details"): Xrm.PageTab<Tabs.f1tab_details>;
      get(name: "tab_4"): Xrm.PageTab<Tabs.tab_4>;
      get(name: "tab_5"): Xrm.PageTab<Tabs.tab_5>;
      get(name: "tab_6"): Xrm.PageTab<Tabs.tab_6>;
      get(name: "tab_7"): Xrm.PageTab<Tabs.tab_7>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Information extends Xrm.PageBase<Information.Attributes,Information.Tabs,Information.Controls> {
    getAttribute(attributeName: "msdyn_copyincidentitemstoagreement"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "msdyn_defaultworkordertype"): Xrm.LookupAttribute<"msdyn_workordertype">;
    getAttribute(attributeName: "msdyn_description"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_estimatedduration"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_lastcalculatedtime"): Xrm.DateAttribute;
    getAttribute(attributeName: "msdyn_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_suggestedduration"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "statecode"): Xrm.OptionSetAttribute<msdyn_incidenttype_statecode>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "Characteristics"): Xrm.SubGridControl<"msdyn_incidenttypecharacteristic">;
    getControl(controlName: "footer_statecode"): Xrm.OptionSetControl<msdyn_incidenttype_statecode>;
    getControl(controlName: "incidentproductssubgrid"): Xrm.SubGridControl<"msdyn_incidenttypeproduct">;
    getControl(controlName: "incidentservicessubgrid"): Xrm.SubGridControl<"msdyn_incidenttypeservice">;
    getControl(controlName: "msdyn_copyincidentitemstoagreement"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "msdyn_defaultworkordertype"): Xrm.LookupControl<"msdyn_workordertype">;
    getControl(controlName: "msdyn_description"): Xrm.StringControl;
    getControl(controlName: "msdyn_estimatedduration"): Xrm.NumberControl;
    getControl(controlName: "msdyn_lastcalculatedtime"): Xrm.DateControl;
    getControl(controlName: "msdyn_name"): Xrm.StringControl;
    getControl(controlName: "msdyn_suggestedduration"): Xrm.NumberControl;
    getControl(controlName: "notescontrol"): Xrm.BaseControl;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "servicetasksgrid"): Xrm.SubGridControl<"msdyn_incidenttypeservicetask">;
    getControl(controlName: string): undefined;
  }
}
