declare namespace Form.ovs_operation.Main {
  namespace Information {
    namespace Tabs {
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ovs_lobid"): Xrm.LookupAttribute<"ovs_lob">;
      get(name: "ovs_name"): Xrm.Attribute<string>;
      get(name: "ovs_operationtypeid"): Xrm.LookupAttribute<"ovs_operationtype">;
      get(name: "ovs_regulatedentityid"): Xrm.LookupAttribute<"account">;
      get(name: "ovs_siteid"): Xrm.LookupAttribute<"account">;
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "statecode"): Xrm.OptionSetAttribute<ovs_operation_statecode>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "ovs_lobid"): Xrm.LookupControl<"ovs_lob">;
      get(name: "ovs_name"): Xrm.StringControl;
      get(name: "ovs_operationtypeid"): Xrm.LookupControl<"ovs_operationtype">;
      get(name: "ovs_regulatedentityid"): Xrm.LookupControl<"account">;
      get(name: "ovs_siteid"): Xrm.LookupControl<"account">;
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "statecode"): Xrm.OptionSetControl<ovs_operation_statecode>;
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
    getAttribute(attributeName: "ovs_lobid"): Xrm.LookupAttribute<"ovs_lob">;
    getAttribute(attributeName: "ovs_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ovs_operationtypeid"): Xrm.LookupAttribute<"ovs_operationtype">;
    getAttribute(attributeName: "ovs_regulatedentityid"): Xrm.LookupAttribute<"account">;
    getAttribute(attributeName: "ovs_siteid"): Xrm.LookupAttribute<"account">;
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "statecode"): Xrm.OptionSetAttribute<ovs_operation_statecode>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "ovs_lobid"): Xrm.LookupControl<"ovs_lob">;
    getControl(controlName: "ovs_name"): Xrm.StringControl;
    getControl(controlName: "ovs_operationtypeid"): Xrm.LookupControl<"ovs_operationtype">;
    getControl(controlName: "ovs_regulatedentityid"): Xrm.LookupControl<"account">;
    getControl(controlName: "ovs_siteid"): Xrm.LookupControl<"account">;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "statecode"): Xrm.OptionSetControl<ovs_operation_statecode>;
    getControl(controlName: string): undefined;
  }
}
