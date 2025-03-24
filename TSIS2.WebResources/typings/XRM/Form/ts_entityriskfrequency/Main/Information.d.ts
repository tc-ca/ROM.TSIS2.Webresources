declare namespace Form.ts_entityriskfrequency.Main {
  namespace Information {
    namespace Tabs {
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "statecode"): Xrm.OptionSetAttribute<ts_entityriskfrequency_statecode>;
      get(name: "ts_activitytype"): Xrm.LookupAttribute<"msdyn_incidenttype">;
      get(name: "ts_englishname"): Xrm.Attribute<string>;
      get(name: "ts_entityname"): Xrm.OptionSetAttribute<ts_entityriskfrequency_ts_entityname>;
      get(name: "ts_fiscalyear"): Xrm.LookupAttribute<"tc_tcfiscalyear">;
      get(name: "ts_frenchname"): Xrm.Attribute<string>;
      get(name: "ts_generateduniquekey"): Xrm.Attribute<string>;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: "ts_operation"): Xrm.LookupAttribute<"ovs_operation">;
      get(name: "ts_operationtype"): Xrm.LookupAttribute<"ovs_operationtype">;
      get(name: "ts_programarea"): Xrm.LookupAttribute<"ts_programarea">;
      get(name: "ts_riskfrequency"): Xrm.LookupAttribute<"ts_riskfrequency">;
      get(name: "ts_site"): Xrm.LookupAttribute<"msdyn_functionallocation">;
      get(name: "ts_stakeholder"): Xrm.LookupAttribute<"account">;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "header_statecode"): Xrm.OptionSetControl<ts_entityriskfrequency_statecode>;
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "ts_activitytype"): Xrm.LookupControl<"msdyn_incidenttype">;
      get(name: "ts_englishname"): Xrm.StringControl;
      get(name: "ts_entityname"): Xrm.OptionSetControl<ts_entityriskfrequency_ts_entityname>;
      get(name: "ts_fiscalyear"): Xrm.LookupControl<"tc_tcfiscalyear">;
      get(name: "ts_frenchname"): Xrm.StringControl;
      get(name: "ts_generateduniquekey"): Xrm.StringControl;
      get(name: "ts_name"): Xrm.StringControl;
      get(name: "ts_operation"): Xrm.LookupControl<"ovs_operation">;
      get(name: "ts_operationtype"): Xrm.LookupControl<"ovs_operationtype">;
      get(name: "ts_programarea"): Xrm.LookupControl<"ts_programarea">;
      get(name: "ts_riskfrequency"): Xrm.LookupControl<"ts_riskfrequency">;
      get(name: "ts_site"): Xrm.LookupControl<"msdyn_functionallocation">;
      get(name: "ts_stakeholder"): Xrm.LookupControl<"account">;
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
    getAttribute(attributeName: "statecode"): Xrm.OptionSetAttribute<ts_entityriskfrequency_statecode>;
    getAttribute(attributeName: "ts_activitytype"): Xrm.LookupAttribute<"msdyn_incidenttype">;
    getAttribute(attributeName: "ts_englishname"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_entityname"): Xrm.OptionSetAttribute<ts_entityriskfrequency_ts_entityname>;
    getAttribute(attributeName: "ts_fiscalyear"): Xrm.LookupAttribute<"tc_tcfiscalyear">;
    getAttribute(attributeName: "ts_frenchname"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_generateduniquekey"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_operation"): Xrm.LookupAttribute<"ovs_operation">;
    getAttribute(attributeName: "ts_operationtype"): Xrm.LookupAttribute<"ovs_operationtype">;
    getAttribute(attributeName: "ts_programarea"): Xrm.LookupAttribute<"ts_programarea">;
    getAttribute(attributeName: "ts_riskfrequency"): Xrm.LookupAttribute<"ts_riskfrequency">;
    getAttribute(attributeName: "ts_site"): Xrm.LookupAttribute<"msdyn_functionallocation">;
    getAttribute(attributeName: "ts_stakeholder"): Xrm.LookupAttribute<"account">;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "header_statecode"): Xrm.OptionSetControl<ts_entityriskfrequency_statecode>;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "ts_activitytype"): Xrm.LookupControl<"msdyn_incidenttype">;
    getControl(controlName: "ts_englishname"): Xrm.StringControl;
    getControl(controlName: "ts_entityname"): Xrm.OptionSetControl<ts_entityriskfrequency_ts_entityname>;
    getControl(controlName: "ts_fiscalyear"): Xrm.LookupControl<"tc_tcfiscalyear">;
    getControl(controlName: "ts_frenchname"): Xrm.StringControl;
    getControl(controlName: "ts_generateduniquekey"): Xrm.StringControl;
    getControl(controlName: "ts_name"): Xrm.StringControl;
    getControl(controlName: "ts_operation"): Xrm.LookupControl<"ovs_operation">;
    getControl(controlName: "ts_operationtype"): Xrm.LookupControl<"ovs_operationtype">;
    getControl(controlName: "ts_programarea"): Xrm.LookupControl<"ts_programarea">;
    getControl(controlName: "ts_riskfrequency"): Xrm.LookupControl<"ts_riskfrequency">;
    getControl(controlName: "ts_site"): Xrm.LookupControl<"msdyn_functionallocation">;
    getControl(controlName: "ts_stakeholder"): Xrm.LookupControl<"account">;
    getControl(controlName: string): undefined;
  }
}
