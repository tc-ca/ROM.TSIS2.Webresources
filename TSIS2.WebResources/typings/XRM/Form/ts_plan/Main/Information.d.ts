declare namespace Form.ts_plan.Main {
  namespace Information {
    namespace Tabs {
      interface tab_3 extends Xrm.SectionCollectionBase {
        get(name: "tab_3_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_supporting_inspections extends Xrm.SectionCollectionBase {
        get(name: "tab_4_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_work_orders extends Xrm.SectionCollectionBase {
        get(name: "tab_2_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "ts_estimateddurationfiscalyear"): Xrm.NumberAttribute;
      get(name: "ts_estimateddurationq1"): Xrm.NumberAttribute;
      get(name: "ts_estimateddurationq2"): Xrm.NumberAttribute;
      get(name: "ts_estimateddurationq3"): Xrm.NumberAttribute;
      get(name: "ts_estimateddurationq4"): Xrm.NumberAttribute;
      get(name: "ts_fiscalyear"): Xrm.LookupAttribute<"tc_tcfiscalyear">;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: "ts_plannedactivityfiscalyear"): Xrm.NumberAttribute;
      get(name: "ts_plannedactivityq1"): Xrm.NumberAttribute;
      get(name: "ts_plannedactivityq2"): Xrm.NumberAttribute;
      get(name: "ts_plannedactivityq3"): Xrm.NumberAttribute;
      get(name: "ts_plannedactivityq4"): Xrm.NumberAttribute;
      get(name: "ts_planstatus"): Xrm.OptionSetAttribute<ts_planstatus>;
      get(name: "ts_team"): Xrm.LookupAttribute<"team">;
      get(name: "ts_totalestimatedcost"): Xrm.NumberAttribute;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "Subgrid_new_1"): Xrm.SubGridControl<"msdyn_workorder">;
      get(name: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "subgrid_supporting_inspections"): Xrm.SubGridControl<"ts_planinspectionsupportregion">;
      get(name: "suggested_inspections_grid"): Xrm.BaseControl;
      get(name: "suggested_inspectorhours_grid"): Xrm.SubGridControl<"ts_planinspectorhours">;
      get(name: "ts_estimateddurationfiscalyear"): Xrm.NumberControl;
      get(name: "ts_estimateddurationq1"): Xrm.NumberControl;
      get(name: "ts_estimateddurationq2"): Xrm.NumberControl;
      get(name: "ts_estimateddurationq3"): Xrm.NumberControl;
      get(name: "ts_estimateddurationq4"): Xrm.NumberControl;
      get(name: "ts_fiscalyear"): Xrm.LookupControl<"tc_tcfiscalyear">;
      get(name: "ts_name"): Xrm.StringControl;
      get(name: "ts_plannedactivityfiscalyear"): Xrm.NumberControl;
      get(name: "ts_plannedactivityq1"): Xrm.NumberControl;
      get(name: "ts_plannedactivityq2"): Xrm.NumberControl;
      get(name: "ts_plannedactivityq3"): Xrm.NumberControl;
      get(name: "ts_plannedactivityq4"): Xrm.NumberControl;
      get(name: "ts_planstatus"): Xrm.OptionSetControl<ts_planstatus>;
      get(name: "ts_team"): Xrm.LookupControl<"team">;
      get(name: "ts_totalestimatedcost"): Xrm.NumberControl;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "tab_3"): Xrm.PageTab<Tabs.tab_3>;
      get(name: "tab_supporting_inspections"): Xrm.PageTab<Tabs.tab_supporting_inspections>;
      get(name: "tab_work_orders"): Xrm.PageTab<Tabs.tab_work_orders>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Information extends Xrm.PageBase<Information.Attributes,Information.Tabs,Information.Controls> {
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "ts_estimateddurationfiscalyear"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_estimateddurationq1"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_estimateddurationq2"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_estimateddurationq3"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_estimateddurationq4"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_fiscalyear"): Xrm.LookupAttribute<"tc_tcfiscalyear">;
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_plannedactivityfiscalyear"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_plannedactivityq1"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_plannedactivityq2"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_plannedactivityq3"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_plannedactivityq4"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_planstatus"): Xrm.OptionSetAttribute<ts_planstatus>;
    getAttribute(attributeName: "ts_team"): Xrm.LookupAttribute<"team">;
    getAttribute(attributeName: "ts_totalestimatedcost"): Xrm.NumberAttribute;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "Subgrid_new_1"): Xrm.SubGridControl<"msdyn_workorder">;
    getControl(controlName: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "subgrid_supporting_inspections"): Xrm.SubGridControl<"ts_planinspectionsupportregion">;
    getControl(controlName: "suggested_inspections_grid"): Xrm.BaseControl;
    getControl(controlName: "suggested_inspectorhours_grid"): Xrm.SubGridControl<"ts_planinspectorhours">;
    getControl(controlName: "ts_estimateddurationfiscalyear"): Xrm.NumberControl;
    getControl(controlName: "ts_estimateddurationq1"): Xrm.NumberControl;
    getControl(controlName: "ts_estimateddurationq2"): Xrm.NumberControl;
    getControl(controlName: "ts_estimateddurationq3"): Xrm.NumberControl;
    getControl(controlName: "ts_estimateddurationq4"): Xrm.NumberControl;
    getControl(controlName: "ts_fiscalyear"): Xrm.LookupControl<"tc_tcfiscalyear">;
    getControl(controlName: "ts_name"): Xrm.StringControl;
    getControl(controlName: "ts_plannedactivityfiscalyear"): Xrm.NumberControl;
    getControl(controlName: "ts_plannedactivityq1"): Xrm.NumberControl;
    getControl(controlName: "ts_plannedactivityq2"): Xrm.NumberControl;
    getControl(controlName: "ts_plannedactivityq3"): Xrm.NumberControl;
    getControl(controlName: "ts_plannedactivityq4"): Xrm.NumberControl;
    getControl(controlName: "ts_planstatus"): Xrm.OptionSetControl<ts_planstatus>;
    getControl(controlName: "ts_team"): Xrm.LookupControl<"team">;
    getControl(controlName: "ts_totalestimatedcost"): Xrm.NumberControl;
    getControl(controlName: string): undefined;
  }
}
