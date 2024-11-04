declare namespace Form.ts_workordertimetracking.Main {
  namespace Information {
    namespace Tabs {
      interface General extends Xrm.SectionCollectionBase {
        get(name: "General_section_2"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "ts_comments"): Xrm.Attribute<string>;
      get(name: "ts_conductingoversight"): Xrm.NumberAttribute;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: "ts_preparationtime"): Xrm.NumberAttribute;
      get(name: "ts_region"): Xrm.LookupAttribute<"territory">;
      get(name: "ts_reportinganddocumentation"): Xrm.NumberAttribute;
      get(name: "ts_workorder"): Xrm.LookupAttribute<"msdyn_workorder">;
      get(name: "ts_wotraveltime"): Xrm.NumberAttribute;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "ts_comments"): Xrm.StringControl;
      get(name: "ts_conductingoversight"): Xrm.NumberControl;
      get(name: "ts_name"): Xrm.StringControl;
      get(name: "ts_preparationtime"): Xrm.NumberControl;
      get(name: "ts_region"): Xrm.LookupControl<"territory">;
      get(name: "ts_reportinganddocumentation"): Xrm.NumberControl;
      get(name: "ts_workorder"): Xrm.LookupControl<"msdyn_workorder">;
      get(name: "ts_wotraveltime"): Xrm.NumberControl;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "General"): Xrm.PageTab<Tabs.General>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Information extends Xrm.PageBase<Information.Attributes,Information.Tabs,Information.Controls> {
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "ts_comments"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_conductingoversight"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_preparationtime"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_region"): Xrm.LookupAttribute<"territory">;
    getAttribute(attributeName: "ts_reportinganddocumentation"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_workorder"): Xrm.LookupAttribute<"msdyn_workorder">;
    getAttribute(attributeName: "ts_wotraveltime"): Xrm.NumberAttribute;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "ts_comments"): Xrm.StringControl;
    getControl(controlName: "ts_conductingoversight"): Xrm.NumberControl;
    getControl(controlName: "ts_name"): Xrm.StringControl;
    getControl(controlName: "ts_preparationtime"): Xrm.NumberControl;
    getControl(controlName: "ts_region"): Xrm.LookupControl<"territory">;
    getControl(controlName: "ts_reportinganddocumentation"): Xrm.NumberControl;
    getControl(controlName: "ts_workorder"): Xrm.LookupControl<"msdyn_workorder">;
    getControl(controlName: "ts_wotraveltime"): Xrm.NumberControl;
    getControl(controlName: string): undefined;
  }
}
