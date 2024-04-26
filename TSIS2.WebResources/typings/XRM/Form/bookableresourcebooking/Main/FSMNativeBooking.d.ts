declare namespace Form.bookableresourcebooking.Main {
  namespace FSMNativeBooking {
    namespace Tabs {
      interface generalTab extends Xrm.SectionCollectionBase {
        get(name: "assetsSection"): Xrm.PageSection;
        get(name: "detailsSection"): Xrm.PageSection;
        get(name: "statusSection"): Xrm.PageSection;
        get(name: "summarySection"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface productsTab extends Xrm.SectionCollectionBase {
        get(name: "productsSection"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface serviceTab extends Xrm.SectionCollectionBase {
        get(name: "servicesSection"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface taskTab extends Xrm.SectionCollectionBase {
        get(name: "bookingStatusSection2"): Xrm.PageSection;
        get(name: "serviceTaskSection"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface timelineTab extends Xrm.SectionCollectionBase {
        get(name: "timelineSection"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "bookingstatus"): Xrm.LookupAttribute<"bookingstatus">;
      get(name: "bookingtype"): Xrm.OptionSetAttribute<bookableresourcebooking_bookingtype>;
      get(name: "duration"): Xrm.NumberAttribute;
      get(name: "endtime"): Xrm.DateAttribute;
      get(name: "modifiedby"): Xrm.LookupAttribute<"systemuser">;
      get(name: "msdyn_actualarrivaltime"): Xrm.DateAttribute;
      get(name: "msdyn_actualtravelduration"): Xrm.NumberAttribute;
      get(name: "msdyn_estimatedarrivaltime"): Xrm.DateAttribute;
      get(name: "msdyn_workorder"): Xrm.Attribute<any>;
      get(name: "name"): Xrm.Attribute<string>;
      get(name: "resource"): Xrm.LookupAttribute<"bookableresource">;
      get(name: "starttime"): Xrm.DateAttribute;
      get(name: "statecode"): Xrm.OptionSetAttribute<bookableresourcebooking_statecode>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "bookingstatus"): Xrm.LookupControl<"bookingstatus">;
      get(name: "bookingstatus1"): Xrm.LookupControl<"bookingstatus">;
      get(name: "bookingstatus2"): Xrm.LookupControl<"bookingstatus">;
      get(name: "bookingtype"): Xrm.OptionSetControl<bookableresourcebooking_bookingtype>;
      get(name: "bookingtype1"): Xrm.OptionSetControl<bookableresourcebooking_bookingtype>;
      get(name: "duration"): Xrm.NumberControl;
      get(name: "endtime"): Xrm.DateControl;
      get(name: "modifiedby"): Xrm.LookupControl<"systemuser">;
      get(name: "msdyn_actualarrivaltime"): Xrm.DateControl;
      get(name: "msdyn_actualtravelduration"): Xrm.NumberControl;
      get(name: "msdyn_estimatedarrivaltime"): Xrm.DateControl;
      get(name: "msdyn_workorder"): Xrm.LookupControl<"msdyn_workorder">;
      get(name: "name"): Xrm.StringControl;
      get(name: "notescontrol"): Xrm.BaseControl;
      get(name: "resource"): Xrm.LookupControl<"bookableresource">;
      get(name: "serviceTasksGrid"): Xrm.SubGridControl<"msdyn_workorderservicetask">;
      get(name: "starttime"): Xrm.DateControl;
      get(name: "starttime1"): Xrm.DateControl;
      get(name: "statecode"): Xrm.OptionSetControl<bookableresourcebooking_statecode>;
      get(name: "workOrderProductsGrid"): Xrm.SubGridControl<"msdyn_workorderproduct">;
      get(name: "workOrderServicesGrid"): Xrm.SubGridControl<"msdyn_workorderservice">;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "generalTab"): Xrm.PageTab<Tabs.generalTab>;
      get(name: "productsTab"): Xrm.PageTab<Tabs.productsTab>;
      get(name: "serviceTab"): Xrm.PageTab<Tabs.serviceTab>;
      get(name: "taskTab"): Xrm.PageTab<Tabs.taskTab>;
      get(name: "timelineTab"): Xrm.PageTab<Tabs.timelineTab>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface FSMNativeBooking extends Xrm.PageBase<FSMNativeBooking.Attributes,FSMNativeBooking.Tabs,FSMNativeBooking.Controls> {
    getAttribute(attributeName: "bookingstatus"): Xrm.LookupAttribute<"bookingstatus">;
    getAttribute(attributeName: "bookingtype"): Xrm.OptionSetAttribute<bookableresourcebooking_bookingtype>;
    getAttribute(attributeName: "duration"): Xrm.NumberAttribute;
    getAttribute(attributeName: "endtime"): Xrm.DateAttribute;
    getAttribute(attributeName: "modifiedby"): Xrm.LookupAttribute<"systemuser">;
    getAttribute(attributeName: "msdyn_actualarrivaltime"): Xrm.DateAttribute;
    getAttribute(attributeName: "msdyn_actualtravelduration"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_estimatedarrivaltime"): Xrm.DateAttribute;
    getAttribute(attributeName: "msdyn_workorder"): Xrm.Attribute<any>;
    getAttribute(attributeName: "name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "resource"): Xrm.LookupAttribute<"bookableresource">;
    getAttribute(attributeName: "starttime"): Xrm.DateAttribute;
    getAttribute(attributeName: "statecode"): Xrm.OptionSetAttribute<bookableresourcebooking_statecode>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "bookingstatus"): Xrm.LookupControl<"bookingstatus">;
    getControl(controlName: "bookingstatus1"): Xrm.LookupControl<"bookingstatus">;
    getControl(controlName: "bookingstatus2"): Xrm.LookupControl<"bookingstatus">;
    getControl(controlName: "bookingtype"): Xrm.OptionSetControl<bookableresourcebooking_bookingtype>;
    getControl(controlName: "bookingtype1"): Xrm.OptionSetControl<bookableresourcebooking_bookingtype>;
    getControl(controlName: "duration"): Xrm.NumberControl;
    getControl(controlName: "endtime"): Xrm.DateControl;
    getControl(controlName: "modifiedby"): Xrm.LookupControl<"systemuser">;
    getControl(controlName: "msdyn_actualarrivaltime"): Xrm.DateControl;
    getControl(controlName: "msdyn_actualtravelduration"): Xrm.NumberControl;
    getControl(controlName: "msdyn_estimatedarrivaltime"): Xrm.DateControl;
    getControl(controlName: "msdyn_workorder"): Xrm.LookupControl<"msdyn_workorder">;
    getControl(controlName: "name"): Xrm.StringControl;
    getControl(controlName: "notescontrol"): Xrm.BaseControl;
    getControl(controlName: "resource"): Xrm.LookupControl<"bookableresource">;
    getControl(controlName: "serviceTasksGrid"): Xrm.SubGridControl<"msdyn_workorderservicetask">;
    getControl(controlName: "starttime"): Xrm.DateControl;
    getControl(controlName: "starttime1"): Xrm.DateControl;
    getControl(controlName: "statecode"): Xrm.OptionSetControl<bookableresourcebooking_statecode>;
    getControl(controlName: "workOrderProductsGrid"): Xrm.SubGridControl<"msdyn_workorderproduct">;
    getControl(controlName: "workOrderServicesGrid"): Xrm.SubGridControl<"msdyn_workorderservice">;
    getControl(controlName: string): undefined;
  }
}
