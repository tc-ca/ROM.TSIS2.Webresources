declare namespace Form.ts_securityincident.Main {
  namespace TimeTracking {
    namespace Tabs {
      interface tab_TimeTracking extends Xrm.SectionCollectionBase {
        get(name: "{b367a628-326f-4595-a30d-c42898223e7b}"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "statecode"): Xrm.OptionSetAttribute<ts_securityincident_statecode>;
      get(name: "ts_recordstatus"): Xrm.OptionSetAttribute<ts_securityincidentstatus>;
      get(name: "ts_securityincidenttime"): Xrm.NumberAttribute;
      get(name: "ts_tamperingsubcategory"): Xrm.OptionSetAttribute<ts_tamperingsubcategory>;
      get(name: "ts_traveltime"): Xrm.NumberAttribute;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "header_ts_recordstatus"): Xrm.OptionSetControl<ts_securityincidentstatus>;
      get(name: "statecode"): Xrm.OptionSetControl<ts_securityincident_statecode>;
      get(name: "ts_securityincidenttime"): Xrm.NumberControl;
      get(name: "ts_tamperingsubcategory"): Xrm.OptionSetControl<ts_tamperingsubcategory>;
      get(name: "ts_traveltime"): Xrm.NumberControl;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "tab_TimeTracking"): Xrm.PageTab<Tabs.tab_TimeTracking>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface TimeTracking extends Xrm.PageBase<TimeTracking.Attributes,TimeTracking.Tabs,TimeTracking.Controls> {
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "statecode"): Xrm.OptionSetAttribute<ts_securityincident_statecode>;
    getAttribute(attributeName: "ts_recordstatus"): Xrm.OptionSetAttribute<ts_securityincidentstatus>;
    getAttribute(attributeName: "ts_securityincidenttime"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_tamperingsubcategory"): Xrm.OptionSetAttribute<ts_tamperingsubcategory>;
    getAttribute(attributeName: "ts_traveltime"): Xrm.NumberAttribute;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "header_ts_recordstatus"): Xrm.OptionSetControl<ts_securityincidentstatus>;
    getControl(controlName: "statecode"): Xrm.OptionSetControl<ts_securityincident_statecode>;
    getControl(controlName: "ts_securityincidenttime"): Xrm.NumberControl;
    getControl(controlName: "ts_tamperingsubcategory"): Xrm.OptionSetControl<ts_tamperingsubcategory>;
    getControl(controlName: "ts_traveltime"): Xrm.NumberControl;
    getControl(controlName: string): undefined;
  }
}
