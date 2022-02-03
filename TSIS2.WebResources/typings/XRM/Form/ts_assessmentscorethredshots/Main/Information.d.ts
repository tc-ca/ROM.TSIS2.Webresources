declare namespace Form.ts_assessmentscorethredshots.Main {
  namespace Information {
    namespace Tabs {
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "ts_assessmenttool"): Xrm.OptionSetAttribute<ts_assessmenttool>;
      get(name: "ts_maximum"): Xrm.NumberAttribute;
      get(name: "ts_minimum"): Xrm.NumberAttribute;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: "ts_ncatenforcementaction"): Xrm.OptionSetAttribute<ts_ncatrecommendations>;
      get(name: "ts_rateenforcementaction"): Xrm.OptionSetAttribute<ts_raterecommendations>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "ts_assessmenttool"): Xrm.OptionSetControl<ts_assessmenttool>;
      get(name: "ts_maximum"): Xrm.NumberControl;
      get(name: "ts_minimum"): Xrm.NumberControl;
      get(name: "ts_name"): Xrm.StringControl;
      get(name: "ts_ncatenforcementaction"): Xrm.OptionSetControl<ts_ncatrecommendations>;
      get(name: "ts_rateenforcementaction"): Xrm.OptionSetControl<ts_raterecommendations>;
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
    getAttribute(attributeName: "ts_assessmenttool"): Xrm.OptionSetAttribute<ts_assessmenttool>;
    getAttribute(attributeName: "ts_maximum"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_minimum"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_ncatenforcementaction"): Xrm.OptionSetAttribute<ts_ncatrecommendations>;
    getAttribute(attributeName: "ts_rateenforcementaction"): Xrm.OptionSetAttribute<ts_raterecommendations>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "ts_assessmenttool"): Xrm.OptionSetControl<ts_assessmenttool>;
    getControl(controlName: "ts_maximum"): Xrm.NumberControl;
    getControl(controlName: "ts_minimum"): Xrm.NumberControl;
    getControl(controlName: "ts_name"): Xrm.StringControl;
    getControl(controlName: "ts_ncatenforcementaction"): Xrm.OptionSetControl<ts_ncatrecommendations>;
    getControl(controlName: "ts_rateenforcementaction"): Xrm.OptionSetControl<ts_raterecommendations>;
    getControl(controlName: string): undefined;
  }
}
