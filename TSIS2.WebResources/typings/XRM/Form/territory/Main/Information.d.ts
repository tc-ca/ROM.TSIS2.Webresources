declare namespace Form.territory.Main {
  namespace Information {
    namespace Tabs {
      interface general extends Xrm.SectionCollectionBase {
        get(name: "description"): Xrm.PageSection;
        get(name: "territory information"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface subterritories_tab extends Xrm.SectionCollectionBase {
        get(name: "territory_tab1_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "description"): Xrm.Attribute<string>;
      get(name: "name"): Xrm.Attribute<string>;
      get(name: "ovs_territorynameenglish"): Xrm.Attribute<string>;
      get(name: "ovs_territorynamefrench"): Xrm.Attribute<string>;
      get(name: "parentterritoryid"): Xrm.LookupAttribute<"territory">;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "description"): Xrm.StringControl;
      get(name: "name"): Xrm.StringControl;
      get(name: "ovs_territorynameenglish"): Xrm.StringControl;
      get(name: "ovs_territorynamefrench"): Xrm.StringControl;
      get(name: "parentterritoryid"): Xrm.LookupControl<"territory">;
      get(name: "territories_subgrid"): Xrm.SubGridControl<"territory">;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "general"): Xrm.PageTab<Tabs.general>;
      get(name: "subterritories_tab"): Xrm.PageTab<Tabs.subterritories_tab>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Information extends Xrm.PageBase<Information.Attributes,Information.Tabs,Information.Controls> {
    getAttribute(attributeName: "description"): Xrm.Attribute<string>;
    getAttribute(attributeName: "name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ovs_territorynameenglish"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ovs_territorynamefrench"): Xrm.Attribute<string>;
    getAttribute(attributeName: "parentterritoryid"): Xrm.LookupAttribute<"territory">;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "description"): Xrm.StringControl;
    getControl(controlName: "name"): Xrm.StringControl;
    getControl(controlName: "ovs_territorynameenglish"): Xrm.StringControl;
    getControl(controlName: "ovs_territorynamefrench"): Xrm.StringControl;
    getControl(controlName: "parentterritoryid"): Xrm.LookupControl<"territory">;
    getControl(controlName: "territories_subgrid"): Xrm.SubGridControl<"territory">;
    getControl(controlName: string): undefined;
  }
}
