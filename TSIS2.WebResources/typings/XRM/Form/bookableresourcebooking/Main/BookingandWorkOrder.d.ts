declare namespace Form.bookableresourcebooking.Main {
  namespace BookingandWorkOrder {
    namespace Tabs {
      interface fstab_Notes extends Xrm.SectionCollectionBase {
        get(name: "fstab_notes_section_general"): Xrm.PageSection;
        get(name: "fstab_notes_section_signature"): Xrm.PageSection;
        get(name: "fstab_notes_section_timeline"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface fstab_customer extends Xrm.SectionCollectionBase {
        get(name: "fstab_customer_section_general"): Xrm.PageSection;
        get(name: "fstab_report_section_travel"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface fstab_fieldservice extends Xrm.SectionCollectionBase {
        get(name: "fstab_fieldservice_section_general"): Xrm.PageSection;
        get(name: "fstab_fieldservice_section_others"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface fstab_general extends Xrm.SectionCollectionBase {
        get(name: "fstab_general_section_others"): Xrm.PageSection;
        get(name: "fstab_general_section_summary"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface fstab_service extends Xrm.SectionCollectionBase {
        get(name: "fstab_service_section_general"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "bookingstatus"): Xrm.Attribute<any>;
      get(name: "bookingtype"): Xrm.OptionSetAttribute<bookableresourcebooking_bookingtype>;
      get(name: "duration"): Xrm.NumberAttribute;
      get(name: "endtime"): Xrm.DateAttribute;
      get(name: "msdyn_actualarrivaltime"): Xrm.DateAttribute;
      get(name: "msdyn_actualtravelduration"): Xrm.NumberAttribute;
      get(name: "msdyn_agreementbookingdate"): Xrm.LookupAttribute<"msdyn_agreementbookingdate">;
      get(name: "msdyn_allowoverlapping"): Xrm.OptionSetAttribute<boolean>;
      get(name: "msdyn_bookingmethod"): Xrm.OptionSetAttribute<msdyn_resourceschedulesource>;
      get(name: "msdyn_estimatedarrivaltime"): Xrm.DateAttribute;
      get(name: "msdyn_estimatedtravelduration"): Xrm.NumberAttribute;
      get(name: "msdyn_milestraveled"): Xrm.Attribute<any>;
      get(name: "msdyn_offlinetimestamp"): Xrm.DateAttribute;
      get(name: "msdyn_resourcegroup"): Xrm.LookupAttribute<"bookableresource">;
      get(name: "msdyn_signature"): Xrm.Attribute<any>;
      get(name: "msdyn_timegroupdetailselected"): Xrm.LookupAttribute<"msdyn_timegroupdetail">;
      get(name: "msdyn_workorder"): Xrm.LookupAttribute<"msdyn_workorder">;
      get(name: "name"): Xrm.Attribute<string>;
      get(name: "resource"): Xrm.LookupAttribute<"bookableresource">;
      get(name: "starttime"): Xrm.DateAttribute;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "bookingstatus"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "bookingtype"): Xrm.OptionSetControl<bookableresourcebooking_bookingtype>;
      get(name: "duration"): Xrm.NumberControl;
      get(name: "endtime"): Xrm.DateControl;
      get(name: "msdyn_actualarrivaltime"): Xrm.DateControl;
      get(name: "msdyn_actualarrivaltime1"): Xrm.DateControl;
      get(name: "msdyn_actualtravelduration"): Xrm.NumberControl;
      get(name: "msdyn_actualtravelduration1"): Xrm.NumberControl;
      get(name: "msdyn_agreementbookingdate"): Xrm.LookupControl<"msdyn_agreementbookingdate">;
      get(name: "msdyn_allowoverlapping"): Xrm.OptionSetControl<boolean>;
      get(name: "msdyn_bookingmethod"): Xrm.OptionSetControl<msdyn_resourceschedulesource>;
      get(name: "msdyn_estimatedarrivaltime"): Xrm.DateControl;
      get(name: "msdyn_estimatedtravelduration"): Xrm.NumberControl;
      get(name: "msdyn_milestraveled"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "msdyn_offlinetimestamp"): Xrm.DateControl;
      get(name: "msdyn_resourcegroup"): Xrm.LookupControl<"bookableresource">;
      get(name: "msdyn_signature"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "msdyn_timegroupdetailselected"): Xrm.LookupControl<"msdyn_timegroupdetail">;
      get(name: "msdyn_workorder"): Xrm.LookupControl<"msdyn_workorder">;
      get(name: "msdyn_workorder1"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "msdyn_workorder2"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "msdyn_workorder3"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "name"): Xrm.StringControl;
      get(name: "notescontrol"): Xrm.BaseControl;
      get(name: "resource"): Xrm.LookupControl<"bookableresource">;
      get(name: "starttime"): Xrm.DateControl;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "fstab_Notes"): Xrm.PageTab<Tabs.fstab_Notes>;
      get(name: "fstab_customer"): Xrm.PageTab<Tabs.fstab_customer>;
      get(name: "fstab_fieldservice"): Xrm.PageTab<Tabs.fstab_fieldservice>;
      get(name: "fstab_general"): Xrm.PageTab<Tabs.fstab_general>;
      get(name: "fstab_service"): Xrm.PageTab<Tabs.fstab_service>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface BookingandWorkOrder extends Xrm.PageBase<BookingandWorkOrder.Attributes,BookingandWorkOrder.Tabs,BookingandWorkOrder.Controls> {
    getAttribute(attributeName: "bookingstatus"): Xrm.Attribute<any>;
    getAttribute(attributeName: "bookingtype"): Xrm.OptionSetAttribute<bookableresourcebooking_bookingtype>;
    getAttribute(attributeName: "duration"): Xrm.NumberAttribute;
    getAttribute(attributeName: "endtime"): Xrm.DateAttribute;
    getAttribute(attributeName: "msdyn_actualarrivaltime"): Xrm.DateAttribute;
    getAttribute(attributeName: "msdyn_actualtravelduration"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_agreementbookingdate"): Xrm.LookupAttribute<"msdyn_agreementbookingdate">;
    getAttribute(attributeName: "msdyn_allowoverlapping"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "msdyn_bookingmethod"): Xrm.OptionSetAttribute<msdyn_resourceschedulesource>;
    getAttribute(attributeName: "msdyn_estimatedarrivaltime"): Xrm.DateAttribute;
    getAttribute(attributeName: "msdyn_estimatedtravelduration"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_milestraveled"): Xrm.Attribute<any>;
    getAttribute(attributeName: "msdyn_offlinetimestamp"): Xrm.DateAttribute;
    getAttribute(attributeName: "msdyn_resourcegroup"): Xrm.LookupAttribute<"bookableresource">;
    getAttribute(attributeName: "msdyn_signature"): Xrm.Attribute<any>;
    getAttribute(attributeName: "msdyn_timegroupdetailselected"): Xrm.LookupAttribute<"msdyn_timegroupdetail">;
    getAttribute(attributeName: "msdyn_workorder"): Xrm.LookupAttribute<"msdyn_workorder">;
    getAttribute(attributeName: "name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "resource"): Xrm.LookupAttribute<"bookableresource">;
    getAttribute(attributeName: "starttime"): Xrm.DateAttribute;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "bookingstatus"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "bookingtype"): Xrm.OptionSetControl<bookableresourcebooking_bookingtype>;
    getControl(controlName: "duration"): Xrm.NumberControl;
    getControl(controlName: "endtime"): Xrm.DateControl;
    getControl(controlName: "msdyn_actualarrivaltime"): Xrm.DateControl;
    getControl(controlName: "msdyn_actualarrivaltime1"): Xrm.DateControl;
    getControl(controlName: "msdyn_actualtravelduration"): Xrm.NumberControl;
    getControl(controlName: "msdyn_actualtravelduration1"): Xrm.NumberControl;
    getControl(controlName: "msdyn_agreementbookingdate"): Xrm.LookupControl<"msdyn_agreementbookingdate">;
    getControl(controlName: "msdyn_allowoverlapping"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "msdyn_bookingmethod"): Xrm.OptionSetControl<msdyn_resourceschedulesource>;
    getControl(controlName: "msdyn_estimatedarrivaltime"): Xrm.DateControl;
    getControl(controlName: "msdyn_estimatedtravelduration"): Xrm.NumberControl;
    getControl(controlName: "msdyn_milestraveled"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "msdyn_offlinetimestamp"): Xrm.DateControl;
    getControl(controlName: "msdyn_resourcegroup"): Xrm.LookupControl<"bookableresource">;
    getControl(controlName: "msdyn_signature"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "msdyn_timegroupdetailselected"): Xrm.LookupControl<"msdyn_timegroupdetail">;
    getControl(controlName: "msdyn_workorder"): Xrm.LookupControl<"msdyn_workorder">;
    getControl(controlName: "msdyn_workorder1"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "msdyn_workorder2"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "msdyn_workorder3"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "name"): Xrm.StringControl;
    getControl(controlName: "notescontrol"): Xrm.BaseControl;
    getControl(controlName: "resource"): Xrm.LookupControl<"bookableresource">;
    getControl(controlName: "starttime"): Xrm.DateControl;
    getControl(controlName: string): undefined;
  }
}
