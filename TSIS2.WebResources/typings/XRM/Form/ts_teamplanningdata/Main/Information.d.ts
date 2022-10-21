declare namespace Form.ts_teamplanningdata.Main {
  namespace Information {
    namespace Tabs {
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "ts_availablehoursq1"): Xrm.NumberAttribute;
      get(name: "ts_availablehoursq2"): Xrm.NumberAttribute;
      get(name: "ts_availablehoursq3"): Xrm.NumberAttribute;
      get(name: "ts_availablehoursq4"): Xrm.NumberAttribute;
      get(name: "ts_fiscalyear"): Xrm.LookupAttribute<"tc_tcfiscalyear">;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: "ts_plannedactivityq1"): Xrm.NumberAttribute;
      get(name: "ts_plannedactivityq2"): Xrm.NumberAttribute;
      get(name: "ts_plannedactivityq3"): Xrm.NumberAttribute;
      get(name: "ts_plannedactivityq4"): Xrm.NumberAttribute;
      get(name: "ts_residualinspectorhoursq1"): Xrm.NumberAttribute;
      get(name: "ts_residualinspectorhoursq2"): Xrm.NumberAttribute;
      get(name: "ts_residualinspectorhoursq3"): Xrm.NumberAttribute;
      get(name: "ts_residualinspectorhoursq4"): Xrm.NumberAttribute;
      get(name: "ts_team"): Xrm.LookupAttribute<"team">;
      get(name: "ts_teamestimateddurationq1"): Xrm.NumberAttribute;
      get(name: "ts_teamestimateddurationq2"): Xrm.NumberAttribute;
      get(name: "ts_teamestimateddurationq3"): Xrm.NumberAttribute;
      get(name: "ts_teamestimateddurationq4"): Xrm.NumberAttribute;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "Subgrid_new_1"): Xrm.BaseControl;
      get(name: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "header_ts_name"): Xrm.StringControl;
      get(name: "header_ts_residualinspectorhoursq1"): Xrm.NumberControl;
      get(name: "header_ts_residualinspectorhoursq2"): Xrm.NumberControl;
      get(name: "header_ts_residualinspectorhoursq3"): Xrm.NumberControl;
      get(name: "header_ts_residualinspectorhoursq4"): Xrm.NumberControl;
      get(name: "ts_availablehoursq1"): Xrm.NumberControl;
      get(name: "ts_availablehoursq2"): Xrm.NumberControl;
      get(name: "ts_availablehoursq3"): Xrm.NumberControl;
      get(name: "ts_availablehoursq4"): Xrm.NumberControl;
      get(name: "ts_fiscalyear"): Xrm.LookupControl<"tc_tcfiscalyear">;
      get(name: "ts_plannedactivityq1"): Xrm.NumberControl;
      get(name: "ts_plannedactivityq2"): Xrm.NumberControl;
      get(name: "ts_plannedactivityq3"): Xrm.NumberControl;
      get(name: "ts_plannedactivityq4"): Xrm.NumberControl;
      get(name: "ts_team"): Xrm.LookupControl<"team">;
      get(name: "ts_teamestimateddurationq1"): Xrm.NumberControl;
      get(name: "ts_teamestimateddurationq2"): Xrm.NumberControl;
      get(name: "ts_teamestimateddurationq3"): Xrm.NumberControl;
      get(name: "ts_teamestimateddurationq4"): Xrm.NumberControl;
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
  interface Information extends Xrm.PageBase<Information.Attributes,Information.Tabs,Information.Controls> {
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "ts_availablehoursq1"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_availablehoursq2"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_availablehoursq3"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_availablehoursq4"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_fiscalyear"): Xrm.LookupAttribute<"tc_tcfiscalyear">;
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_plannedactivityq1"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_plannedactivityq2"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_plannedactivityq3"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_plannedactivityq4"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_residualinspectorhoursq1"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_residualinspectorhoursq2"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_residualinspectorhoursq3"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_residualinspectorhoursq4"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_team"): Xrm.LookupAttribute<"team">;
    getAttribute(attributeName: "ts_teamestimateddurationq1"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_teamestimateddurationq2"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_teamestimateddurationq3"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_teamestimateddurationq4"): Xrm.NumberAttribute;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "Subgrid_new_1"): Xrm.BaseControl;
    getControl(controlName: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "header_ts_name"): Xrm.StringControl;
    getControl(controlName: "header_ts_residualinspectorhoursq1"): Xrm.NumberControl;
    getControl(controlName: "header_ts_residualinspectorhoursq2"): Xrm.NumberControl;
    getControl(controlName: "header_ts_residualinspectorhoursq3"): Xrm.NumberControl;
    getControl(controlName: "header_ts_residualinspectorhoursq4"): Xrm.NumberControl;
    getControl(controlName: "ts_availablehoursq1"): Xrm.NumberControl;
    getControl(controlName: "ts_availablehoursq2"): Xrm.NumberControl;
    getControl(controlName: "ts_availablehoursq3"): Xrm.NumberControl;
    getControl(controlName: "ts_availablehoursq4"): Xrm.NumberControl;
    getControl(controlName: "ts_fiscalyear"): Xrm.LookupControl<"tc_tcfiscalyear">;
    getControl(controlName: "ts_plannedactivityq1"): Xrm.NumberControl;
    getControl(controlName: "ts_plannedactivityq2"): Xrm.NumberControl;
    getControl(controlName: "ts_plannedactivityq3"): Xrm.NumberControl;
    getControl(controlName: "ts_plannedactivityq4"): Xrm.NumberControl;
    getControl(controlName: "ts_team"): Xrm.LookupControl<"team">;
    getControl(controlName: "ts_teamestimateddurationq1"): Xrm.NumberControl;
    getControl(controlName: "ts_teamestimateddurationq2"): Xrm.NumberControl;
    getControl(controlName: "ts_teamestimateddurationq3"): Xrm.NumberControl;
    getControl(controlName: "ts_teamestimateddurationq4"): Xrm.NumberControl;
    getControl(controlName: string): undefined;
  }
}
