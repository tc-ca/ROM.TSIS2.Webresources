declare namespace Form.ts_aircraft.Main {
  namespace ROMAircraft {
    namespace Tabs {
      interface Summary extends Xrm.SectionCollectionBase {
        get(name: "Summary"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "statecode"): Xrm.OptionSetAttribute<ts_aircraft_statecode>;
      get(name: "ts_manufacturer"): Xrm.OptionSetAttribute<ts_aircraftmanufacturer>;
      get(name: "ts_model"): Xrm.OptionSetAttribute<ts_aircraftmodel>;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: "ts_registeredowner"): Xrm.LookupAttribute<"account">;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "header_statecode"): Xrm.OptionSetControl<ts_aircraft_statecode>;
      get(name: "ts_manufacturer"): Xrm.OptionSetControl<ts_aircraftmanufacturer>;
      get(name: "ts_model"): Xrm.OptionSetControl<ts_aircraftmodel>;
      get(name: "ts_name"): Xrm.StringControl;
      get(name: "ts_registeredowner"): Xrm.LookupControl<"account">;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "Summary"): Xrm.PageTab<Tabs.Summary>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface ROMAircraft extends Xrm.PageBase<ROMAircraft.Attributes,ROMAircraft.Tabs,ROMAircraft.Controls> {
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "statecode"): Xrm.OptionSetAttribute<ts_aircraft_statecode>;
    getAttribute(attributeName: "ts_manufacturer"): Xrm.OptionSetAttribute<ts_aircraftmanufacturer>;
    getAttribute(attributeName: "ts_model"): Xrm.OptionSetAttribute<ts_aircraftmodel>;
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_registeredowner"): Xrm.LookupAttribute<"account">;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "header_statecode"): Xrm.OptionSetControl<ts_aircraft_statecode>;
    getControl(controlName: "ts_manufacturer"): Xrm.OptionSetControl<ts_aircraftmanufacturer>;
    getControl(controlName: "ts_model"): Xrm.OptionSetControl<ts_aircraftmodel>;
    getControl(controlName: "ts_name"): Xrm.StringControl;
    getControl(controlName: "ts_registeredowner"): Xrm.LookupControl<"account">;
    getControl(controlName: string): undefined;
  }
}
