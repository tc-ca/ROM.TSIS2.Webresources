declare namespace Form.ts_teamplanningdata.Main {
  namespace Information {
    namespace Tabs {
      interface tab_3 extends Xrm.SectionCollectionBase {
        get(name: "null_section_3"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_hours extends Xrm.SectionCollectionBase {
        get(name: "tab_hours_section_3"): Xrm.PageSection;
        get(name: "tab_hours_section_3"): Xrm.PageSection;
        get(name: "tab_hours_section_4"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_planning_data extends Xrm.SectionCollectionBase {
        get(name: "null_section_5"): Xrm.PageSection;
        get(name: "tab_planning_data_fiscal_year"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_workorders extends Xrm.SectionCollectionBase {
        get(name: "tab_4_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "ts_availablehoursq1"): Xrm.NumberAttribute;
      get(name: "ts_availablehoursq2"): Xrm.NumberAttribute;
      get(name: "ts_availablehoursq3"): Xrm.NumberAttribute;
      get(name: "ts_availablehoursq4"): Xrm.NumberAttribute;
      get(name: "ts_availableinspectorhoursfiscalyear"): Xrm.NumberAttribute;
      get(name: "ts_fiscalyear"): Xrm.LookupAttribute<"tc_tcfiscalyear">;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: "ts_plannedactivityfiscalyear"): Xrm.NumberAttribute;
      get(name: "ts_plannedactivityq1"): Xrm.NumberAttribute;
      get(name: "ts_plannedactivityq2"): Xrm.NumberAttribute;
      get(name: "ts_plannedactivityq3"): Xrm.NumberAttribute;
      get(name: "ts_plannedactivityq4"): Xrm.NumberAttribute;
      get(name: "ts_residualinspectorhoursfiscalyear"): Xrm.NumberAttribute;
      get(name: "ts_residualinspectorhoursq1"): Xrm.NumberAttribute;
      get(name: "ts_residualinspectorhoursq2"): Xrm.NumberAttribute;
      get(name: "ts_residualinspectorhoursq3"): Xrm.NumberAttribute;
      get(name: "ts_residualinspectorhoursq4"): Xrm.NumberAttribute;
      get(name: "ts_team"): Xrm.LookupAttribute<"team">;
      get(name: "ts_teamestimateddurationfiscalyear"): Xrm.NumberAttribute;
      get(name: "ts_teamestimateddurationq1"): Xrm.NumberAttribute;
      get(name: "ts_teamestimateddurationq2"): Xrm.NumberAttribute;
      get(name: "ts_teamestimateddurationq3"): Xrm.NumberAttribute;
      get(name: "ts_teamestimateddurationq4"): Xrm.NumberAttribute;
      get(name: "ts_totalhoursfiscalyear"): Xrm.NumberAttribute;
      get(name: "ts_totalhoursq1"): Xrm.NumberAttribute;
      get(name: "ts_totalhoursq2"): Xrm.NumberAttribute;
      get(name: "ts_totalhoursq3"): Xrm.NumberAttribute;
      get(name: "ts_totalhoursq4"): Xrm.NumberAttribute;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "Subgrid_new_1"): Xrm.SubGridControl<"msdyn_workorder">;
      get(name: "Subgrid_new_2"): Xrm.BaseControl;
      get(name: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "header_ts_name"): Xrm.StringControl;
      get(name: "header_ts_residualinspectorhoursq1"): Xrm.NumberControl;
      get(name: "header_ts_residualinspectorhoursq2"): Xrm.NumberControl;
      get(name: "header_ts_residualinspectorhoursq3"): Xrm.NumberControl;
      get(name: "header_ts_residualinspectorhoursq4"): Xrm.NumberControl;
      get(name: "subgrid_planning_data"): Xrm.BaseControl;
      get(name: "ts_availablehoursq1"): Xrm.NumberControl;
      get(name: "ts_availablehoursq2"): Xrm.NumberControl;
      get(name: "ts_availablehoursq3"): Xrm.NumberControl;
      get(name: "ts_availablehoursq4"): Xrm.NumberControl;
      get(name: "ts_availableinspectorhoursfiscalyear"): Xrm.NumberControl;
      get(name: "ts_fiscalyear"): Xrm.LookupControl<"tc_tcfiscalyear">;
      get(name: "ts_plannedactivityfiscalyear"): Xrm.NumberControl;
      get(name: "ts_plannedactivityq1"): Xrm.NumberControl;
      get(name: "ts_plannedactivityq2"): Xrm.NumberControl;
      get(name: "ts_plannedactivityq3"): Xrm.NumberControl;
      get(name: "ts_plannedactivityq4"): Xrm.NumberControl;
      get(name: "ts_residualinspectorhoursfiscalyear"): Xrm.NumberControl;
      get(name: "ts_team"): Xrm.LookupControl<"team">;
      get(name: "ts_teamestimateddurationfiscalyear"): Xrm.NumberControl;
      get(name: "ts_teamestimateddurationq1"): Xrm.NumberControl;
      get(name: "ts_teamestimateddurationq2"): Xrm.NumberControl;
      get(name: "ts_teamestimateddurationq3"): Xrm.NumberControl;
      get(name: "ts_teamestimateddurationq4"): Xrm.NumberControl;
      get(name: "ts_totalhoursfiscalyear"): Xrm.NumberControl;
      get(name: "ts_totalhoursq1"): Xrm.NumberControl;
      get(name: "ts_totalhoursq2"): Xrm.NumberControl;
      get(name: "ts_totalhoursq3"): Xrm.NumberControl;
      get(name: "ts_totalhoursq4"): Xrm.NumberControl;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "tab_3"): Xrm.PageTab<Tabs.tab_3>;
      get(name: "tab_hours"): Xrm.PageTab<Tabs.tab_hours>;
      get(name: "tab_planning_data"): Xrm.PageTab<Tabs.tab_planning_data>;
      get(name: "tab_workorders"): Xrm.PageTab<Tabs.tab_workorders>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Information extends Xrm.PageBase<Information.Attributes,Information.Tabs,Information.Controls> {
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "ts_availablehoursq1"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_availablehoursq2"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_availablehoursq3"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_availablehoursq4"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_availableinspectorhoursfiscalyear"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_fiscalyear"): Xrm.LookupAttribute<"tc_tcfiscalyear">;
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_plannedactivityfiscalyear"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_plannedactivityq1"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_plannedactivityq2"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_plannedactivityq3"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_plannedactivityq4"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_residualinspectorhoursfiscalyear"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_residualinspectorhoursq1"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_residualinspectorhoursq2"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_residualinspectorhoursq3"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_residualinspectorhoursq4"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_team"): Xrm.LookupAttribute<"team">;
    getAttribute(attributeName: "ts_teamestimateddurationfiscalyear"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_teamestimateddurationq1"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_teamestimateddurationq2"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_teamestimateddurationq3"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_teamestimateddurationq4"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_totalhoursfiscalyear"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_totalhoursq1"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_totalhoursq2"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_totalhoursq3"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_totalhoursq4"): Xrm.NumberAttribute;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "Subgrid_new_1"): Xrm.SubGridControl<"msdyn_workorder">;
    getControl(controlName: "Subgrid_new_2"): Xrm.BaseControl;
    getControl(controlName: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "header_ts_name"): Xrm.StringControl;
    getControl(controlName: "header_ts_residualinspectorhoursq1"): Xrm.NumberControl;
    getControl(controlName: "header_ts_residualinspectorhoursq2"): Xrm.NumberControl;
    getControl(controlName: "header_ts_residualinspectorhoursq3"): Xrm.NumberControl;
    getControl(controlName: "header_ts_residualinspectorhoursq4"): Xrm.NumberControl;
    getControl(controlName: "subgrid_planning_data"): Xrm.BaseControl;
    getControl(controlName: "ts_availablehoursq1"): Xrm.NumberControl;
    getControl(controlName: "ts_availablehoursq2"): Xrm.NumberControl;
    getControl(controlName: "ts_availablehoursq3"): Xrm.NumberControl;
    getControl(controlName: "ts_availablehoursq4"): Xrm.NumberControl;
    getControl(controlName: "ts_availableinspectorhoursfiscalyear"): Xrm.NumberControl;
    getControl(controlName: "ts_fiscalyear"): Xrm.LookupControl<"tc_tcfiscalyear">;
    getControl(controlName: "ts_plannedactivityfiscalyear"): Xrm.NumberControl;
    getControl(controlName: "ts_plannedactivityq1"): Xrm.NumberControl;
    getControl(controlName: "ts_plannedactivityq2"): Xrm.NumberControl;
    getControl(controlName: "ts_plannedactivityq3"): Xrm.NumberControl;
    getControl(controlName: "ts_plannedactivityq4"): Xrm.NumberControl;
    getControl(controlName: "ts_residualinspectorhoursfiscalyear"): Xrm.NumberControl;
    getControl(controlName: "ts_team"): Xrm.LookupControl<"team">;
    getControl(controlName: "ts_teamestimateddurationfiscalyear"): Xrm.NumberControl;
    getControl(controlName: "ts_teamestimateddurationq1"): Xrm.NumberControl;
    getControl(controlName: "ts_teamestimateddurationq2"): Xrm.NumberControl;
    getControl(controlName: "ts_teamestimateddurationq3"): Xrm.NumberControl;
    getControl(controlName: "ts_teamestimateddurationq4"): Xrm.NumberControl;
    getControl(controlName: "ts_totalhoursfiscalyear"): Xrm.NumberControl;
    getControl(controlName: "ts_totalhoursq1"): Xrm.NumberControl;
    getControl(controlName: "ts_totalhoursq2"): Xrm.NumberControl;
    getControl(controlName: "ts_totalhoursq3"): Xrm.NumberControl;
    getControl(controlName: "ts_totalhoursq4"): Xrm.NumberControl;
    getControl(controlName: string): undefined;
  }
}
