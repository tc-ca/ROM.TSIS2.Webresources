declare namespace Form.account.Quick {
  namespace TDGPrimaryContact {
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
      get(name: "ovs_primarycontactemail"): Xrm.Attribute<string>;
      get(name: "ovs_primarycontactphone"): Xrm.Attribute<string>;
      get(name: "primarycontactid"): Xrm.LookupAttribute<"contact">;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "ovs_primarycontactemail"): Xrm.StringControl;
      get(name: "ovs_primarycontactphone"): Xrm.StringControl;
      get(name: "primarycontactid"): Xrm.LookupControl<"contact">;
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
  interface TDGPrimaryContact extends Xrm.PageBase<TDGPrimaryContact.Attributes,TDGPrimaryContact.Tabs,TDGPrimaryContact.Controls> {
    getAttribute(attributeName: "ovs_primarycontactemail"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ovs_primarycontactphone"): Xrm.Attribute<string>;
    getAttribute(attributeName: "primarycontactid"): Xrm.LookupAttribute<"contact">;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "ovs_primarycontactemail"): Xrm.StringControl;
    getControl(controlName: "ovs_primarycontactphone"): Xrm.StringControl;
    getControl(controlName: "primarycontactid"): Xrm.LookupControl<"contact">;
    getControl(controlName: string): undefined;
  }
}
