declare namespace Form.serviceappointment.AppointmentBook {
  namespace Information {
    namespace Tabs {
      interface serviceappointment extends Xrm.SectionCollectionBase {
        get(name: "general information"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "customers"): Xrm.LookupAttribute<"account" | "contact">;
      get(name: "location"): Xrm.Attribute<string>;
      get(name: "resources"): Xrm.LookupAttribute<"equipment" | "systemuser">;
      get(name: "serviceid"): Xrm.LookupAttribute<"service">;
      get(name: "siteid"): Xrm.LookupAttribute<"site">;
      get(name: "statuscode"): Xrm.OptionSetAttribute<serviceappointment_statuscode>;
      get(name: "subject"): Xrm.Attribute<string>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "customers"): Xrm.LookupControl<"account" | "contact">;
      get(name: "location"): Xrm.StringControl;
      get(name: "resources"): Xrm.LookupControl<"equipment" | "systemuser">;
      get(name: "serviceid"): Xrm.LookupControl<"service">;
      get(name: "siteid"): Xrm.LookupControl<"site">;
      get(name: "statuscode"): Xrm.OptionSetControl<serviceappointment_statuscode>;
      get(name: "subject"): Xrm.StringControl;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "serviceappointment"): Xrm.PageTab<Tabs.serviceappointment>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Information extends Xrm.PageBase<Information.Attributes,Information.Tabs,Information.Controls> {
    getAttribute(attributeName: "customers"): Xrm.LookupAttribute<"account" | "contact">;
    getAttribute(attributeName: "location"): Xrm.Attribute<string>;
    getAttribute(attributeName: "resources"): Xrm.LookupAttribute<"equipment" | "systemuser">;
    getAttribute(attributeName: "serviceid"): Xrm.LookupAttribute<"service">;
    getAttribute(attributeName: "siteid"): Xrm.LookupAttribute<"site">;
    getAttribute(attributeName: "statuscode"): Xrm.OptionSetAttribute<serviceappointment_statuscode>;
    getAttribute(attributeName: "subject"): Xrm.Attribute<string>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "customers"): Xrm.LookupControl<"account" | "contact">;
    getControl(controlName: "location"): Xrm.StringControl;
    getControl(controlName: "resources"): Xrm.LookupControl<"equipment" | "systemuser">;
    getControl(controlName: "serviceid"): Xrm.LookupControl<"service">;
    getControl(controlName: "siteid"): Xrm.LookupControl<"site">;
    getControl(controlName: "statuscode"): Xrm.OptionSetControl<serviceappointment_statuscode>;
    getControl(controlName: "subject"): Xrm.StringControl;
    getControl(controlName: string): undefined;
  }
}
