declare namespace Form.ts_workordercreationwizard.Main {
  namespace Information {
    namespace Tabs {
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "ts_caseid"): Xrm.LookupAttribute<"incident">;
      get(name: "ts_countryid"): Xrm.LookupAttribute<"tc_country">;
      get(name: "ts_functionallocationid"): Xrm.LookupAttribute<"msdyn_functionallocation">;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: "ts_operationid"): Xrm.LookupAttribute<"msdyn_customerasset">;
      get(name: "ts_ovs_operationtype"): Xrm.LookupAttribute<"ovs_operationtype">;
      get(name: "ts_regionid"): Xrm.LookupAttribute<"territory">;
      get(name: "ts_siteid"): Xrm.LookupAttribute<"msdyn_functionallocation">;
      get(name: "ts_stakeholderid"): Xrm.LookupAttribute<"account">;
      get(name: "ts_workordertypeid"): Xrm.LookupAttribute<"msdyn_workordertype">;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "ActivityTypes"): Xrm.BaseControl;
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "ts_caseid"): Xrm.LookupControl<"incident">;
      get(name: "ts_countryid"): Xrm.LookupControl<"tc_country">;
      get(name: "ts_functionallocationid"): Xrm.LookupControl<"msdyn_functionallocation">;
      get(name: "ts_name"): Xrm.StringControl;
      get(name: "ts_operationid"): Xrm.LookupControl<"msdyn_customerasset">;
      get(name: "ts_ovs_operationtype"): Xrm.LookupControl<"ovs_operationtype">;
      get(name: "ts_regionid"): Xrm.LookupControl<"territory">;
      get(name: "ts_siteid"): Xrm.LookupControl<"msdyn_functionallocation">;
      get(name: "ts_stakeholderid"): Xrm.LookupControl<"account">;
      get(name: "ts_workordertypeid"): Xrm.LookupControl<"msdyn_workordertype">;
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
    getAttribute(attributeName: "ts_caseid"): Xrm.LookupAttribute<"incident">;
    getAttribute(attributeName: "ts_countryid"): Xrm.LookupAttribute<"tc_country">;
    getAttribute(attributeName: "ts_functionallocationid"): Xrm.LookupAttribute<"msdyn_functionallocation">;
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_operationid"): Xrm.LookupAttribute<"msdyn_customerasset">;
    getAttribute(attributeName: "ts_ovs_operationtype"): Xrm.LookupAttribute<"ovs_operationtype">;
    getAttribute(attributeName: "ts_regionid"): Xrm.LookupAttribute<"territory">;
    getAttribute(attributeName: "ts_siteid"): Xrm.LookupAttribute<"msdyn_functionallocation">;
    getAttribute(attributeName: "ts_stakeholderid"): Xrm.LookupAttribute<"account">;
    getAttribute(attributeName: "ts_workordertypeid"): Xrm.LookupAttribute<"msdyn_workordertype">;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "ActivityTypes"): Xrm.BaseControl;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "ts_caseid"): Xrm.LookupControl<"incident">;
    getControl(controlName: "ts_countryid"): Xrm.LookupControl<"tc_country">;
    getControl(controlName: "ts_functionallocationid"): Xrm.LookupControl<"msdyn_functionallocation">;
    getControl(controlName: "ts_name"): Xrm.StringControl;
    getControl(controlName: "ts_operationid"): Xrm.LookupControl<"msdyn_customerasset">;
    getControl(controlName: "ts_ovs_operationtype"): Xrm.LookupControl<"ovs_operationtype">;
    getControl(controlName: "ts_regionid"): Xrm.LookupControl<"territory">;
    getControl(controlName: "ts_siteid"): Xrm.LookupControl<"msdyn_functionallocation">;
    getControl(controlName: "ts_stakeholderid"): Xrm.LookupControl<"account">;
    getControl(controlName: "ts_workordertypeid"): Xrm.LookupControl<"msdyn_workordertype">;
    getControl(controlName: string): undefined;
  }
}
