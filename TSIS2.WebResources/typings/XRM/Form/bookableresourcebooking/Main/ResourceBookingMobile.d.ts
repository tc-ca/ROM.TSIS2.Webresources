declare namespace Form.bookableresourcebooking.Main {
  namespace ResourceBookingMobile {
    namespace Tabs {
      interface FieldService extends Xrm.SectionCollectionBase {
        get(name: "FieldService_column_5_section_1"): Xrm.PageSection;
        get(name: "FieldService_column_6_section_1"): Xrm.PageSection;
        get(name: "FieldService_section_1"): Xrm.PageSection;
        get(name: "FieldService_section_2"): Xrm.PageSection;
        get(name: "FieldService_section_4"): Xrm.PageSection;
        get(name: "FieldService_section_5"): Xrm.PageSection;
        get(name: "FieldService_section_6"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface fstab_general extends Xrm.SectionCollectionBase {
        get(name: "fstab_general_section_general"): Xrm.PageSection;
        get(name: "fstab_general_section_misc"): Xrm.PageSection;
        get(name: "fstab_general_section_schedule"): Xrm.PageSection;
        get(name: "fstab_general_section_travel"): Xrm.PageSection;
        get(name: "fstab_note_section"): Xrm.PageSection;
        get(name: "tab_actions"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface fstab_signature extends Xrm.SectionCollectionBase {
        get(name: "fstab_signature_section_signature"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface fstab_timeline extends Xrm.SectionCollectionBase {
        get(name: "fstab_note_section_2"): Xrm.PageSection;
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
      get(name: "msdyn_latitude"): Xrm.NumberAttribute;
      get(name: "msdyn_longitude"): Xrm.NumberAttribute;
      get(name: "msdyn_milestraveled"): Xrm.Attribute<any>;
      get(name: "msdyn_offlinetimestamp"): Xrm.DateAttribute;
      get(name: "msdyn_quickNoteAction"): Xrm.OptionSetAttribute<msdyn_quicknote_type>;
      get(name: "msdyn_resourcegroup"): Xrm.LookupAttribute<"bookableresource">;
      get(name: "msdyn_signature"): Xrm.Attribute<any>;
      get(name: "msdyn_timegroupdetailselected"): Xrm.LookupAttribute<"msdyn_timegroupdetail">;
      get(name: "msdyn_totalbillableduration"): Xrm.NumberAttribute;
      get(name: "msdyn_totalbreakduration"): Xrm.NumberAttribute;
      get(name: "msdyn_totalcost"): Xrm.NumberAttribute;
      get(name: "msdyn_totaldurationinprogress"): Xrm.NumberAttribute;
      get(name: "msdyn_workorder"): Xrm.Attribute<any>;
      get(name: "name"): Xrm.Attribute<string>;
      get(name: "resource"): Xrm.LookupAttribute<"bookableresource">;
      get(name: "starttime"): Xrm.DateAttribute;
      get(name: "transactioncurrencyid"): Xrm.LookupAttribute<"transactioncurrency">;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "PRODUCTS"): Xrm.BaseControl;
      get(name: "SERVICES"): Xrm.BaseControl;
      get(name: "SERVICE_TASKS"): Xrm.BaseControl;
      get(name: "ServiceTasks"): Xrm.SubGridControl<"msdyn_workorderservicetask">;
      get(name: "bookingstatus"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "bookingtype"): Xrm.OptionSetControl<bookableresourcebooking_bookingtype>;
      get(name: "duration"): Xrm.NumberControl;
      get(name: "endtime"): Xrm.DateControl;
      get(name: "header_bookingstatus"): Xrm.LookupControl<"bookingstatus">;
      get(name: "header_msdyn_workorder"): Xrm.LookupControl<"msdyn_workorder">;
      get(name: "header_starttime"): Xrm.DateControl;
      get(name: "msdyn_actualarrivaltime"): Xrm.DateControl;
      get(name: "msdyn_actualtravelduration"): Xrm.NumberControl;
      get(name: "msdyn_agreementbookingdate"): Xrm.LookupControl<"msdyn_agreementbookingdate">;
      get(name: "msdyn_allowoverlapping"): Xrm.OptionSetControl<boolean>;
      get(name: "msdyn_bookingmethod"): Xrm.OptionSetControl<msdyn_resourceschedulesource>;
      get(name: "msdyn_estimatedarrivaltime"): Xrm.DateControl;
      get(name: "msdyn_estimatedtravelduration"): Xrm.NumberControl;
      get(name: "msdyn_latitude"): Xrm.NumberControl;
      get(name: "msdyn_longitude"): Xrm.NumberControl;
      get(name: "msdyn_milestraveled"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "msdyn_offlinetimestamp"): Xrm.DateControl;
      get(name: "msdyn_quickNoteAction"): Xrm.OptionSetControl<msdyn_quicknote_type>;
      get(name: "msdyn_quicknotescontrol"): Xrm.BaseControl;
      get(name: "msdyn_resourcegroup"): Xrm.LookupControl<"bookableresource">;
      get(name: "msdyn_signature"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "msdyn_timegroupdetailselected"): Xrm.LookupControl<"msdyn_timegroupdetail">;
      get(name: "msdyn_totalbillableduration"): Xrm.NumberControl;
      get(name: "msdyn_totalbreakduration"): Xrm.NumberControl;
      get(name: "msdyn_totalcost"): Xrm.NumberControl;
      get(name: "msdyn_totaldurationinprogress"): Xrm.NumberControl;
      get(name: "name"): Xrm.StringControl;
      get(name: "notescontrol"): Xrm.BaseControl;
      get(name: "resource"): Xrm.LookupControl<"bookableresource">;
      get(name: "starttime"): Xrm.DateControl;
      get(name: "transactioncurrencyid"): Xrm.LookupControl<"transactioncurrency">;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "FieldService"): Xrm.PageTab<Tabs.FieldService>;
      get(name: "fstab_general"): Xrm.PageTab<Tabs.fstab_general>;
      get(name: "fstab_signature"): Xrm.PageTab<Tabs.fstab_signature>;
      get(name: "fstab_timeline"): Xrm.PageTab<Tabs.fstab_timeline>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface ResourceBookingMobile extends Xrm.PageBase<ResourceBookingMobile.Attributes,ResourceBookingMobile.Tabs,ResourceBookingMobile.Controls> {
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
    getAttribute(attributeName: "msdyn_latitude"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_longitude"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_milestraveled"): Xrm.Attribute<any>;
    getAttribute(attributeName: "msdyn_offlinetimestamp"): Xrm.DateAttribute;
    getAttribute(attributeName: "msdyn_quickNoteAction"): Xrm.OptionSetAttribute<msdyn_quicknote_type>;
    getAttribute(attributeName: "msdyn_resourcegroup"): Xrm.LookupAttribute<"bookableresource">;
    getAttribute(attributeName: "msdyn_signature"): Xrm.Attribute<any>;
    getAttribute(attributeName: "msdyn_timegroupdetailselected"): Xrm.LookupAttribute<"msdyn_timegroupdetail">;
    getAttribute(attributeName: "msdyn_totalbillableduration"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_totalbreakduration"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_totalcost"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_totaldurationinprogress"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_workorder"): Xrm.Attribute<any>;
    getAttribute(attributeName: "name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "resource"): Xrm.LookupAttribute<"bookableresource">;
    getAttribute(attributeName: "starttime"): Xrm.DateAttribute;
    getAttribute(attributeName: "transactioncurrencyid"): Xrm.LookupAttribute<"transactioncurrency">;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "PRODUCTS"): Xrm.BaseControl;
    getControl(controlName: "SERVICES"): Xrm.BaseControl;
    getControl(controlName: "SERVICE_TASKS"): Xrm.BaseControl;
    getControl(controlName: "ServiceTasks"): Xrm.SubGridControl<"msdyn_workorderservicetask">;
    getControl(controlName: "bookingstatus"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "bookingtype"): Xrm.OptionSetControl<bookableresourcebooking_bookingtype>;
    getControl(controlName: "duration"): Xrm.NumberControl;
    getControl(controlName: "endtime"): Xrm.DateControl;
    getControl(controlName: "header_bookingstatus"): Xrm.LookupControl<"bookingstatus">;
    getControl(controlName: "header_msdyn_workorder"): Xrm.LookupControl<"msdyn_workorder">;
    getControl(controlName: "header_starttime"): Xrm.DateControl;
    getControl(controlName: "msdyn_actualarrivaltime"): Xrm.DateControl;
    getControl(controlName: "msdyn_actualtravelduration"): Xrm.NumberControl;
    getControl(controlName: "msdyn_agreementbookingdate"): Xrm.LookupControl<"msdyn_agreementbookingdate">;
    getControl(controlName: "msdyn_allowoverlapping"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "msdyn_bookingmethod"): Xrm.OptionSetControl<msdyn_resourceschedulesource>;
    getControl(controlName: "msdyn_estimatedarrivaltime"): Xrm.DateControl;
    getControl(controlName: "msdyn_estimatedtravelduration"): Xrm.NumberControl;
    getControl(controlName: "msdyn_latitude"): Xrm.NumberControl;
    getControl(controlName: "msdyn_longitude"): Xrm.NumberControl;
    getControl(controlName: "msdyn_milestraveled"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "msdyn_offlinetimestamp"): Xrm.DateControl;
    getControl(controlName: "msdyn_quickNoteAction"): Xrm.OptionSetControl<msdyn_quicknote_type>;
    getControl(controlName: "msdyn_quicknotescontrol"): Xrm.BaseControl;
    getControl(controlName: "msdyn_resourcegroup"): Xrm.LookupControl<"bookableresource">;
    getControl(controlName: "msdyn_signature"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "msdyn_timegroupdetailselected"): Xrm.LookupControl<"msdyn_timegroupdetail">;
    getControl(controlName: "msdyn_totalbillableduration"): Xrm.NumberControl;
    getControl(controlName: "msdyn_totalbreakduration"): Xrm.NumberControl;
    getControl(controlName: "msdyn_totalcost"): Xrm.NumberControl;
    getControl(controlName: "msdyn_totaldurationinprogress"): Xrm.NumberControl;
    getControl(controlName: "name"): Xrm.StringControl;
    getControl(controlName: "notescontrol"): Xrm.BaseControl;
    getControl(controlName: "resource"): Xrm.LookupControl<"bookableresource">;
    getControl(controlName: "starttime"): Xrm.DateControl;
    getControl(controlName: "transactioncurrencyid"): Xrm.LookupControl<"transactioncurrency">;
    getControl(controlName: string): undefined;
  }
}
