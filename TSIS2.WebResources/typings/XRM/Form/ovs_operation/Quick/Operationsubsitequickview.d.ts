declare namespace Form.ovs_operation.Quick {
  namespace Operationsubsitequickview {
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
      get(name: "ts_subsite"): Xrm.LookupAttribute<"msdyn_functionallocation">;
      get(name: "ts_subsubsite"): Xrm.LookupAttribute<"msdyn_functionallocation">;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "ts_subsite"): Xrm.LookupControl<"msdyn_functionallocation">;
      get(name: "ts_subsubsite"): Xrm.LookupControl<"msdyn_functionallocation">;
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
  interface Operationsubsitequickview extends Xrm.PageBase<Operationsubsitequickview.Attributes,Operationsubsitequickview.Tabs,Operationsubsitequickview.Controls> {
    getAttribute(attributeName: "ts_subsite"): Xrm.LookupAttribute<"msdyn_functionallocation">;
    getAttribute(attributeName: "ts_subsubsite"): Xrm.LookupAttribute<"msdyn_functionallocation">;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "ts_subsite"): Xrm.LookupControl<"msdyn_functionallocation">;
    getControl(controlName: "ts_subsubsite"): Xrm.LookupControl<"msdyn_functionallocation">;
    getControl(controlName: string): undefined;
  }
}
