declare namespace Form.ts_entityrisk.Main {
  namespace Information {
    namespace Tabs {
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "statecode"): Xrm.OptionSetAttribute<ts_entityrisk_statecode>;
      get(name: "ts_entityid"): Xrm.Attribute<string>;
      get(name: "ts_entityname"): Xrm.OptionSetAttribute<ts_entityrisk_ts_entityname>;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: "ts_riskfrequency"): Xrm.LookupAttribute<"ts_riskfrequency">;
      get(name: "ts_riskrating"): Xrm.LookupAttribute<"ts_riskrating">;
      get(name: "ts_weightedriskscore"): Xrm.NumberAttribute;
      get(name: "ts_year"): Xrm.Attribute<string>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "header_statecode"): Xrm.OptionSetControl<ts_entityrisk_statecode>;
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "ts_entityid"): Xrm.StringControl;
      get(name: "ts_entityname"): Xrm.OptionSetControl<ts_entityrisk_ts_entityname>;
      get(name: "ts_name"): Xrm.StringControl;
      get(name: "ts_riskfrequency"): Xrm.LookupControl<"ts_riskfrequency">;
      get(name: "ts_riskrating"): Xrm.LookupControl<"ts_riskrating">;
      get(name: "ts_weightedriskscore"): Xrm.NumberControl;
      get(name: "ts_year"): Xrm.StringControl;
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
    getAttribute(attributeName: "statecode"): Xrm.OptionSetAttribute<ts_entityrisk_statecode>;
    getAttribute(attributeName: "ts_entityid"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_entityname"): Xrm.OptionSetAttribute<ts_entityrisk_ts_entityname>;
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_riskfrequency"): Xrm.LookupAttribute<"ts_riskfrequency">;
    getAttribute(attributeName: "ts_riskrating"): Xrm.LookupAttribute<"ts_riskrating">;
    getAttribute(attributeName: "ts_weightedriskscore"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_year"): Xrm.Attribute<string>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "header_statecode"): Xrm.OptionSetControl<ts_entityrisk_statecode>;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "ts_entityid"): Xrm.StringControl;
    getControl(controlName: "ts_entityname"): Xrm.OptionSetControl<ts_entityrisk_ts_entityname>;
    getControl(controlName: "ts_name"): Xrm.StringControl;
    getControl(controlName: "ts_riskfrequency"): Xrm.LookupControl<"ts_riskfrequency">;
    getControl(controlName: "ts_riskrating"): Xrm.LookupControl<"ts_riskrating">;
    getControl(controlName: "ts_weightedriskscore"): Xrm.NumberControl;
    getControl(controlName: "ts_year"): Xrm.StringControl;
    getControl(controlName: string): undefined;
  }
}
