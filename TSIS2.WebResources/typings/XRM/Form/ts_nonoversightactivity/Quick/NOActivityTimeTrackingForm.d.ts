declare namespace Form.ts_nonoversightactivity.Quick {
  namespace NOActivityTimeTrackingForm {
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
      get(name: "ts_activitytime"): Xrm.NumberAttribute;
      get(name: "ts_category"): Xrm.LookupAttribute<"ts_timetrackingcategory">;
      get(name: "ts_dateofactivity"): Xrm.DateAttribute;
      get(name: "ts_program"): Xrm.LookupAttribute<"businessunit">;
      get(name: "ts_quarter"): Xrm.OptionSetAttribute<ts_quarter>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "ts_activitytime"): Xrm.NumberControl;
      get(name: "ts_category"): Xrm.LookupControl<"ts_timetrackingcategory">;
      get(name: "ts_dateofactivity"): Xrm.DateControl;
      get(name: "ts_program"): Xrm.LookupControl<"businessunit">;
      get(name: "ts_quarter"): Xrm.OptionSetControl<ts_quarter>;
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
  interface NOActivityTimeTrackingForm extends Xrm.PageBase<NOActivityTimeTrackingForm.Attributes,NOActivityTimeTrackingForm.Tabs,NOActivityTimeTrackingForm.Controls> {
    getAttribute(attributeName: "ts_activitytime"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_category"): Xrm.LookupAttribute<"ts_timetrackingcategory">;
    getAttribute(attributeName: "ts_dateofactivity"): Xrm.DateAttribute;
    getAttribute(attributeName: "ts_program"): Xrm.LookupAttribute<"businessunit">;
    getAttribute(attributeName: "ts_quarter"): Xrm.OptionSetAttribute<ts_quarter>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "ts_activitytime"): Xrm.NumberControl;
    getControl(controlName: "ts_category"): Xrm.LookupControl<"ts_timetrackingcategory">;
    getControl(controlName: "ts_dateofactivity"): Xrm.DateControl;
    getControl(controlName: "ts_program"): Xrm.LookupControl<"businessunit">;
    getControl(controlName: "ts_quarter"): Xrm.OptionSetControl<ts_quarter>;
    getControl(controlName: string): undefined;
  }
}
