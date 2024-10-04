declare namespace Form.bookableresourcebooking.Main {
  namespace BookingforM365 {
    namespace Tabs {
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "bookingstatus"): Xrm.LookupAttribute<"bookingstatus">;
      get(name: "bookingtype"): Xrm.OptionSetAttribute<bookableresourcebooking_bookingtype>;
      get(name: "duration"): Xrm.NumberAttribute;
      get(name: "endtime"): Xrm.DateAttribute;
      get(name: "msdyn_actualarrivaltime"): Xrm.DateAttribute;
      get(name: "resource"): Xrm.LookupAttribute<"bookableresource">;
      get(name: "starttime"): Xrm.DateAttribute;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "bookingstatus"): Xrm.LookupControl<"bookingstatus">;
      get(name: "bookingtype"): Xrm.OptionSetControl<bookableresourcebooking_bookingtype>;
      get(name: "duration"): Xrm.NumberControl;
      get(name: "endtime"): Xrm.DateControl;
      get(name: "msdyn_actualarrivaltime"): Xrm.DateControl;
      get(name: "resource"): Xrm.LookupControl<"bookableresource">;
      get(name: "starttime"): Xrm.DateControl;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface BookingforM365 extends Xrm.PageBase<BookingforM365.Attributes,BookingforM365.Tabs,BookingforM365.Controls> {
    getAttribute(attributeName: "bookingstatus"): Xrm.LookupAttribute<"bookingstatus">;
    getAttribute(attributeName: "bookingtype"): Xrm.OptionSetAttribute<bookableresourcebooking_bookingtype>;
    getAttribute(attributeName: "duration"): Xrm.NumberAttribute;
    getAttribute(attributeName: "endtime"): Xrm.DateAttribute;
    getAttribute(attributeName: "msdyn_actualarrivaltime"): Xrm.DateAttribute;
    getAttribute(attributeName: "resource"): Xrm.LookupAttribute<"bookableresource">;
    getAttribute(attributeName: "starttime"): Xrm.DateAttribute;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "bookingstatus"): Xrm.LookupControl<"bookingstatus">;
    getControl(controlName: "bookingtype"): Xrm.OptionSetControl<bookableresourcebooking_bookingtype>;
    getControl(controlName: "duration"): Xrm.NumberControl;
    getControl(controlName: "endtime"): Xrm.DateControl;
    getControl(controlName: "msdyn_actualarrivaltime"): Xrm.DateControl;
    getControl(controlName: "resource"): Xrm.LookupControl<"bookableresource">;
    getControl(controlName: "starttime"): Xrm.DateControl;
    getControl(controlName: string): undefined;
  }
}
