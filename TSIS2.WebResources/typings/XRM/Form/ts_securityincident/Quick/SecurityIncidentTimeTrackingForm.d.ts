declare namespace Form.ts_securityincident.Quick {
  namespace SecurityIncidentTimeTrackingForm {
    namespace Tabs {
      interface tab_1 extends Xrm.SectionCollectionBase {
        get(name: "Time_Tracking_section"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ts_comments"): Xrm.Attribute<string>;
      get(name: "ts_securityincidenttime"): Xrm.NumberAttribute;
      get(name: "ts_traveltime"): Xrm.NumberAttribute;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "ts_comments"): Xrm.StringControl;
      get(name: "ts_securityincidenttime"): Xrm.NumberControl;
      get(name: "ts_traveltime"): Xrm.NumberControl;
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
  interface SecurityIncidentTimeTrackingForm extends Xrm.PageBase<SecurityIncidentTimeTrackingForm.Attributes,SecurityIncidentTimeTrackingForm.Tabs,SecurityIncidentTimeTrackingForm.Controls> {
    getAttribute(attributeName: "ts_comments"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_securityincidenttime"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_traveltime"): Xrm.NumberAttribute;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "ts_comments"): Xrm.StringControl;
    getControl(controlName: "ts_securityincidenttime"): Xrm.NumberControl;
    getControl(controlName: "ts_traveltime"): Xrm.NumberControl;
    getControl(controlName: string): undefined;
  }
}
