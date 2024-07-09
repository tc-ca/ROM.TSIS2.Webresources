declare namespace Form.ts_site.QuickCreate {
  namespace NewForm {
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
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "ts_address1"): Xrm.Attribute<string>;
      get(name: "ts_address2"): Xrm.Attribute<string>;
      get(name: "ts_city"): Xrm.Attribute<string>;
      get(name: "ts_costcenter"): Xrm.Attribute<string>;
      get(name: "ts_emailaddress"): Xrm.Attribute<string>;
      get(name: "ts_locationopendate"): Xrm.DateAttribute;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: "ts_parentfunctionallocation"): Xrm.LookupAttribute<"ts_site">;
      get(name: "ts_primarytimezone"): Xrm.Attribute<any>;
      get(name: "ts_shortname"): Xrm.Attribute<string>;
      get(name: "ts_stateorprovince"): Xrm.Attribute<string>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "ts_address1"): Xrm.StringControl;
      get(name: "ts_address2"): Xrm.StringControl;
      get(name: "ts_city"): Xrm.StringControl;
      get(name: "ts_costcenter"): Xrm.StringControl;
      get(name: "ts_emailaddress"): Xrm.StringControl;
      get(name: "ts_locationopendate"): Xrm.DateControl;
      get(name: "ts_name"): Xrm.StringControl;
      get(name: "ts_parentfunctionallocation"): Xrm.LookupControl<"ts_site">;
      get(name: "ts_primarytimezone"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "ts_shortname"): Xrm.StringControl;
      get(name: "ts_stateorprovince"): Xrm.StringControl;
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
  interface NewForm extends Xrm.PageBase<NewForm.Attributes,NewForm.Tabs,NewForm.Controls> {
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "ts_address1"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_address2"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_city"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_costcenter"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_emailaddress"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_locationopendate"): Xrm.DateAttribute;
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_parentfunctionallocation"): Xrm.LookupAttribute<"ts_site">;
    getAttribute(attributeName: "ts_primarytimezone"): Xrm.Attribute<any>;
    getAttribute(attributeName: "ts_shortname"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_stateorprovince"): Xrm.Attribute<string>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "ts_address1"): Xrm.StringControl;
    getControl(controlName: "ts_address2"): Xrm.StringControl;
    getControl(controlName: "ts_city"): Xrm.StringControl;
    getControl(controlName: "ts_costcenter"): Xrm.StringControl;
    getControl(controlName: "ts_emailaddress"): Xrm.StringControl;
    getControl(controlName: "ts_locationopendate"): Xrm.DateControl;
    getControl(controlName: "ts_name"): Xrm.StringControl;
    getControl(controlName: "ts_parentfunctionallocation"): Xrm.LookupControl<"ts_site">;
    getControl(controlName: "ts_primarytimezone"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "ts_shortname"): Xrm.StringControl;
    getControl(controlName: "ts_stateorprovince"): Xrm.StringControl;
    getControl(controlName: string): undefined;
  }
}
