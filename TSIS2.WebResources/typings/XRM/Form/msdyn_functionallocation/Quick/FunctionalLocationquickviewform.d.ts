declare namespace Form.msdyn_functionallocation.Quick {
  namespace FunctionalLocationquickviewform {
    namespace Tabs {
      interface tab_1 extends Xrm.SectionCollectionBase {
        get(name: "tab_1_column_1_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ts_class"): Xrm.OptionSetAttribute<ts_msdyn_functionallocation_ts_class>;
      get(name: "ts_riskscore"): Xrm.NumberAttribute;
      get(name: "ts_sitetype"): Xrm.LookupAttribute<"ovs_sitetype">;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "ts_class"): Xrm.OptionSetControl<ts_msdyn_functionallocation_ts_class>;
      get(name: "ts_riskscore"): Xrm.NumberControl;
      get(name: "ts_sitetype"): Xrm.LookupControl<"ovs_sitetype">;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "tab_1"): Xrm.PageTab<Tabs.tab_1>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface FunctionalLocationquickviewform extends Xrm.PageBase<FunctionalLocationquickviewform.Attributes,FunctionalLocationquickviewform.Tabs,FunctionalLocationquickviewform.Controls> {
    getAttribute(attributeName: "ts_class"): Xrm.OptionSetAttribute<ts_msdyn_functionallocation_ts_class>;
    getAttribute(attributeName: "ts_riskscore"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_sitetype"): Xrm.LookupAttribute<"ovs_sitetype">;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "ts_class"): Xrm.OptionSetControl<ts_msdyn_functionallocation_ts_class>;
    getControl(controlName: "ts_riskscore"): Xrm.NumberControl;
    getControl(controlName: "ts_sitetype"): Xrm.LookupControl<"ovs_sitetype">;
    getControl(controlName: string): undefined;
  }
}
