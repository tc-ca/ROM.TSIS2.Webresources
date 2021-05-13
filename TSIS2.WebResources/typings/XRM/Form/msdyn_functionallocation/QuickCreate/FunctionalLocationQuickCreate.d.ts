declare namespace Form.msdyn_functionallocation.QuickCreate {
  namespace FunctionalLocationQuickCreate {
    namespace Tabs {
      interface tab_1 extends Xrm.SectionCollectionBase {
        get(name: "tab_1_column_1_section_1"): Xrm.PageSection;
        get(name: "tab_1_column_2_section_1"): Xrm.PageSection;
        get(name: "tab_1_column_3_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "msdyn_address1"): Xrm.Attribute<any>;
      get(name: "msdyn_address2"): Xrm.Attribute<string>;
      get(name: "msdyn_city"): Xrm.Attribute<string>;
      get(name: "msdyn_name"): Xrm.Attribute<string>;
      get(name: "msdyn_parentfunctionallocation"): Xrm.LookupAttribute<"msdyn_functionallocation">;
      get(name: "msdyn_postalcode"): Xrm.Attribute<string>;
      get(name: "msdyn_stateorprovince"): Xrm.Attribute<string>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "msdyn_address1"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "msdyn_address2"): Xrm.StringControl;
      get(name: "msdyn_city"): Xrm.StringControl;
      get(name: "msdyn_name"): Xrm.StringControl;
      get(name: "msdyn_parentfunctionallocation"): Xrm.LookupControl<"msdyn_functionallocation">;
      get(name: "msdyn_postalcode"): Xrm.StringControl;
      get(name: "msdyn_stateorprovince"): Xrm.StringControl;
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
  interface FunctionalLocationQuickCreate extends Xrm.PageBase<FunctionalLocationQuickCreate.Attributes,FunctionalLocationQuickCreate.Tabs,FunctionalLocationQuickCreate.Controls> {
    getAttribute(attributeName: "msdyn_address1"): Xrm.Attribute<any>;
    getAttribute(attributeName: "msdyn_address2"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_city"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_parentfunctionallocation"): Xrm.LookupAttribute<"msdyn_functionallocation">;
    getAttribute(attributeName: "msdyn_postalcode"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_stateorprovince"): Xrm.Attribute<string>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "msdyn_address1"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "msdyn_address2"): Xrm.StringControl;
    getControl(controlName: "msdyn_city"): Xrm.StringControl;
    getControl(controlName: "msdyn_name"): Xrm.StringControl;
    getControl(controlName: "msdyn_parentfunctionallocation"): Xrm.LookupControl<"msdyn_functionallocation">;
    getControl(controlName: "msdyn_postalcode"): Xrm.StringControl;
    getControl(controlName: "msdyn_stateorprovince"): Xrm.StringControl;
    getControl(controlName: string): undefined;
  }
}
