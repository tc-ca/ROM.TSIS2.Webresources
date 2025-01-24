declare namespace Form.ovs_operationtype.Main {
  namespace Information {
    namespace Tabs {
      interface tab_2 extends Xrm.SectionCollectionBase {
        get(name: "tab_2_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_Risk extends Xrm.SectionCollectionBase {
        get(name: "tab_3_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ovs_name"): Xrm.Attribute<string>;
      get(name: "ovs_operationtypenameenglish"): Xrm.Attribute<string>;
      get(name: "ovs_operationtypenamefrench"): Xrm.Attribute<string>;
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "ts_operationtyperiskrating"): Xrm.LookupAttribute<"ts_riskrating">;
      get(name: "ts_regulated"): Xrm.Attribute<any>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "Subgrid_DiscretionaryFactorGroupings"): Xrm.SubGridControl<"ts_discretionaryfactorgrouping">;
      get(name: "Subgrid_EntityRisk"): Xrm.SubGridControl<"ts_entityrisk">;
      get(name: "Subgrid_Risk_Criteria"): Xrm.SubGridControl<"ts_riskcriteria">;
      get(name: "Subgrid_new_1"): Xrm.SubGridControl<"ovs_operation">;
      get(name: "ovs_name"): Xrm.StringControl;
      get(name: "ovs_operationtypenameenglish"): Xrm.StringControl;
      get(name: "ovs_operationtypenamefrench"): Xrm.StringControl;
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "ts_operationtyperiskrating"): Xrm.LookupControl<"ts_riskrating">;
      get(name: "ts_regulated"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "tab_2"): Xrm.PageTab<Tabs.tab_2>;
      get(name: "tab_Risk"): Xrm.PageTab<Tabs.tab_Risk>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Information extends Xrm.PageBase<Information.Attributes,Information.Tabs,Information.Controls> {
    getAttribute(attributeName: "ovs_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ovs_operationtypenameenglish"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ovs_operationtypenamefrench"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "ts_operationtyperiskrating"): Xrm.LookupAttribute<"ts_riskrating">;
    getAttribute(attributeName: "ts_regulated"): Xrm.Attribute<any>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "Subgrid_DiscretionaryFactorGroupings"): Xrm.SubGridControl<"ts_discretionaryfactorgrouping">;
    getControl(controlName: "Subgrid_EntityRisk"): Xrm.SubGridControl<"ts_entityrisk">;
    getControl(controlName: "Subgrid_Risk_Criteria"): Xrm.SubGridControl<"ts_riskcriteria">;
    getControl(controlName: "Subgrid_new_1"): Xrm.SubGridControl<"ovs_operation">;
    getControl(controlName: "ovs_name"): Xrm.StringControl;
    getControl(controlName: "ovs_operationtypenameenglish"): Xrm.StringControl;
    getControl(controlName: "ovs_operationtypenamefrench"): Xrm.StringControl;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "ts_operationtyperiskrating"): Xrm.LookupControl<"ts_riskrating">;
    getControl(controlName: "ts_regulated"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: string): undefined;
  }
}
