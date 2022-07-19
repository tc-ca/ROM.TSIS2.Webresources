declare namespace Form.ts_riskcategory.Main {
  namespace Information {
    namespace Tabs {
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "ts_frequency"): Xrm.NumberAttribute;
      get(name: "ts_interval"): Xrm.NumberAttribute;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: "ts_operationfrequency"): Xrm.LookupAttribute<"ts_operationfrequency">;
      get(name: "ts_operationtype"): Xrm.LookupAttribute<"ovs_operationtype">;
      get(name: "ts_riskcategoryen"): Xrm.Attribute<string>;
      get(name: "ts_riskcategoryfr"): Xrm.Attribute<string>;
      get(name: "ts_riskscoremaximum"): Xrm.NumberAttribute;
      get(name: "ts_riskscoreminimum"): Xrm.NumberAttribute;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "ts_frequency"): Xrm.NumberControl;
      get(name: "ts_interval"): Xrm.NumberControl;
      get(name: "ts_name"): Xrm.StringControl;
      get(name: "ts_operationfrequency"): Xrm.LookupControl<"ts_operationfrequency">;
      get(name: "ts_operationtype"): Xrm.LookupControl<"ovs_operationtype">;
      get(name: "ts_riskcategoryen"): Xrm.StringControl;
      get(name: "ts_riskcategoryfr"): Xrm.StringControl;
      get(name: "ts_riskscoremaximum"): Xrm.NumberControl;
      get(name: "ts_riskscoreminimum"): Xrm.NumberControl;
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
    getAttribute(attributeName: "ts_frequency"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_interval"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_operationfrequency"): Xrm.LookupAttribute<"ts_operationfrequency">;
    getAttribute(attributeName: "ts_operationtype"): Xrm.LookupAttribute<"ovs_operationtype">;
    getAttribute(attributeName: "ts_riskcategoryen"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_riskcategoryfr"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_riskscoremaximum"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_riskscoreminimum"): Xrm.NumberAttribute;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "ts_frequency"): Xrm.NumberControl;
    getControl(controlName: "ts_interval"): Xrm.NumberControl;
    getControl(controlName: "ts_name"): Xrm.StringControl;
    getControl(controlName: "ts_operationfrequency"): Xrm.LookupControl<"ts_operationfrequency">;
    getControl(controlName: "ts_operationtype"): Xrm.LookupControl<"ovs_operationtype">;
    getControl(controlName: "ts_riskcategoryen"): Xrm.StringControl;
    getControl(controlName: "ts_riskcategoryfr"): Xrm.StringControl;
    getControl(controlName: "ts_riskscoremaximum"): Xrm.NumberControl;
    getControl(controlName: "ts_riskscoreminimum"): Xrm.NumberControl;
    getControl(controlName: string): undefined;
  }
}
