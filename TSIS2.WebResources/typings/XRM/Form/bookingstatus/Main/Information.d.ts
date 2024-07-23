declare namespace Form.bookingstatus.Main {
  namespace Information {
    namespace Tabs {
      interface FieldService extends Xrm.SectionCollectionBase {
        get(name: "FieldService_section_1"): Xrm.PageSection;
        get(name: "FieldService_section_2"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_2 extends Xrm.SectionCollectionBase {
        get(name: "tab_2_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "description"): Xrm.Attribute<string>;
      get(name: "msdyn_fieldservicestatus"): Xrm.OptionSetAttribute<msdyn_bookingsystemstatus>;
      get(name: "msdyn_imageurl"): Xrm.Attribute<string>;
      get(name: "msdyn_optimizationmethod"): Xrm.OptionSetAttribute<msdyn_bookingstatusoptimizationmethod>;
      get(name: "msdyn_statuscolor"): Xrm.Attribute<string>;
      get(name: "msdyn_statuscompletesworkorder"): Xrm.Attribute<any>;
      get(name: "name"): Xrm.Attribute<string>;
      get(name: "status"): Xrm.OptionSetAttribute<bookingstatus_status>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "WebResource_StatusColor"): Xrm.WebResourceControl;
      get(name: "description"): Xrm.StringControl;
      get(name: "msdyn_fieldservicestatus"): Xrm.OptionSetControl<msdyn_bookingsystemstatus>;
      get(name: "msdyn_imageurl"): Xrm.StringControl;
      get(name: "msdyn_optimizationmethod"): Xrm.OptionSetControl<msdyn_bookingstatusoptimizationmethod>;
      get(name: "msdyn_statuscolor"): Xrm.StringControl;
      get(name: "msdyn_statuscompletesworkorder"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "name"): Xrm.StringControl;
      get(name: "notescontrol"): Xrm.BaseControl;
      get(name: "status"): Xrm.OptionSetControl<bookingstatus_status>;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "FieldService"): Xrm.PageTab<Tabs.FieldService>;
      get(name: "tab_2"): Xrm.PageTab<Tabs.tab_2>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Information extends Xrm.PageBase<Information.Attributes,Information.Tabs,Information.Controls> {
    getAttribute(attributeName: "description"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_fieldservicestatus"): Xrm.OptionSetAttribute<msdyn_bookingsystemstatus>;
    getAttribute(attributeName: "msdyn_imageurl"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_optimizationmethod"): Xrm.OptionSetAttribute<msdyn_bookingstatusoptimizationmethod>;
    getAttribute(attributeName: "msdyn_statuscolor"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_statuscompletesworkorder"): Xrm.Attribute<any>;
    getAttribute(attributeName: "name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "status"): Xrm.OptionSetAttribute<bookingstatus_status>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "WebResource_StatusColor"): Xrm.WebResourceControl;
    getControl(controlName: "description"): Xrm.StringControl;
    getControl(controlName: "msdyn_fieldservicestatus"): Xrm.OptionSetControl<msdyn_bookingsystemstatus>;
    getControl(controlName: "msdyn_imageurl"): Xrm.StringControl;
    getControl(controlName: "msdyn_optimizationmethod"): Xrm.OptionSetControl<msdyn_bookingstatusoptimizationmethod>;
    getControl(controlName: "msdyn_statuscolor"): Xrm.StringControl;
    getControl(controlName: "msdyn_statuscompletesworkorder"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "name"): Xrm.StringControl;
    getControl(controlName: "notescontrol"): Xrm.BaseControl;
    getControl(controlName: "status"): Xrm.OptionSetControl<bookingstatus_status>;
    getControl(controlName: string): undefined;
  }
}
