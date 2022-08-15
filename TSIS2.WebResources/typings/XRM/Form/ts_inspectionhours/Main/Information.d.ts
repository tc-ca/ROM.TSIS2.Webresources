declare namespace Form.ts_inspectionhours.Main {
  namespace Information {
    namespace Tabs {
      interface tab_general extends Xrm.SectionCollectionBase {
        get(name: "section_inspection_hours"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "ts_baselinehours"): Xrm.LookupAttribute<"ts_baselinehours">;
      get(name: "ts_inspector"): Xrm.LookupAttribute<"systemuser">;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: "ts_plannedq1"): Xrm.NumberAttribute;
      get(name: "ts_plannedq2"): Xrm.NumberAttribute;
      get(name: "ts_plannedq3"): Xrm.NumberAttribute;
      get(name: "ts_plannedq4"): Xrm.NumberAttribute;
      get(name: "ts_totalhours"): Xrm.NumberAttribute;
      get(name: "ts_totalhoursq1"): Xrm.NumberAttribute;
      get(name: "ts_totalhoursq2"): Xrm.NumberAttribute;
      get(name: "ts_totalhoursq3"): Xrm.NumberAttribute;
      get(name: "ts_totalhoursq4"): Xrm.NumberAttribute;
      get(name: "ts_unplannedq1"): Xrm.NumberAttribute;
      get(name: "ts_unplannedq2"): Xrm.NumberAttribute;
      get(name: "ts_unplannedq3"): Xrm.NumberAttribute;
      get(name: "ts_unplannedq4"): Xrm.NumberAttribute;
      get(name: "ts_varianceq1"): Xrm.NumberAttribute;
      get(name: "ts_varianceq2"): Xrm.NumberAttribute;
      get(name: "ts_varianceq3"): Xrm.NumberAttribute;
      get(name: "ts_varianceq4"): Xrm.NumberAttribute;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "ts_baselinehours"): Xrm.LookupControl<"ts_baselinehours">;
      get(name: "ts_inspector"): Xrm.LookupControl<"systemuser">;
      get(name: "ts_name"): Xrm.StringControl;
      get(name: "ts_plannedq1"): Xrm.NumberControl;
      get(name: "ts_plannedq2"): Xrm.NumberControl;
      get(name: "ts_plannedq3"): Xrm.NumberControl;
      get(name: "ts_plannedq4"): Xrm.NumberControl;
      get(name: "ts_totalhours"): Xrm.NumberControl;
      get(name: "ts_totalhoursq1"): Xrm.NumberControl;
      get(name: "ts_totalhoursq2"): Xrm.NumberControl;
      get(name: "ts_totalhoursq3"): Xrm.NumberControl;
      get(name: "ts_totalhoursq4"): Xrm.NumberControl;
      get(name: "ts_unplannedq1"): Xrm.NumberControl;
      get(name: "ts_unplannedq2"): Xrm.NumberControl;
      get(name: "ts_unplannedq3"): Xrm.NumberControl;
      get(name: "ts_unplannedq4"): Xrm.NumberControl;
      get(name: "ts_varianceq1"): Xrm.NumberControl;
      get(name: "ts_varianceq2"): Xrm.NumberControl;
      get(name: "ts_varianceq3"): Xrm.NumberControl;
      get(name: "ts_varianceq4"): Xrm.NumberControl;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "tab_general"): Xrm.PageTab<Tabs.tab_general>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Information extends Xrm.PageBase<Information.Attributes,Information.Tabs,Information.Controls> {
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "ts_baselinehours"): Xrm.LookupAttribute<"ts_baselinehours">;
    getAttribute(attributeName: "ts_inspector"): Xrm.LookupAttribute<"systemuser">;
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_plannedq1"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_plannedq2"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_plannedq3"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_plannedq4"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_totalhours"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_totalhoursq1"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_totalhoursq2"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_totalhoursq3"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_totalhoursq4"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_unplannedq1"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_unplannedq2"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_unplannedq3"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_unplannedq4"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_varianceq1"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_varianceq2"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_varianceq3"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_varianceq4"): Xrm.NumberAttribute;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "ts_baselinehours"): Xrm.LookupControl<"ts_baselinehours">;
    getControl(controlName: "ts_inspector"): Xrm.LookupControl<"systemuser">;
    getControl(controlName: "ts_name"): Xrm.StringControl;
    getControl(controlName: "ts_plannedq1"): Xrm.NumberControl;
    getControl(controlName: "ts_plannedq2"): Xrm.NumberControl;
    getControl(controlName: "ts_plannedq3"): Xrm.NumberControl;
    getControl(controlName: "ts_plannedq4"): Xrm.NumberControl;
    getControl(controlName: "ts_totalhours"): Xrm.NumberControl;
    getControl(controlName: "ts_totalhoursq1"): Xrm.NumberControl;
    getControl(controlName: "ts_totalhoursq2"): Xrm.NumberControl;
    getControl(controlName: "ts_totalhoursq3"): Xrm.NumberControl;
    getControl(controlName: "ts_totalhoursq4"): Xrm.NumberControl;
    getControl(controlName: "ts_unplannedq1"): Xrm.NumberControl;
    getControl(controlName: "ts_unplannedq2"): Xrm.NumberControl;
    getControl(controlName: "ts_unplannedq3"): Xrm.NumberControl;
    getControl(controlName: "ts_unplannedq4"): Xrm.NumberControl;
    getControl(controlName: "ts_varianceq1"): Xrm.NumberControl;
    getControl(controlName: "ts_varianceq2"): Xrm.NumberControl;
    getControl(controlName: "ts_varianceq3"): Xrm.NumberControl;
    getControl(controlName: "ts_varianceq4"): Xrm.NumberControl;
    getControl(controlName: string): undefined;
  }
}
