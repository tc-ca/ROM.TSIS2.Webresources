declare namespace Form.ovs_cysafetyassessment.Main {
  namespace Information {
    namespace Tabs {
      interface tab_2 extends Xrm.SectionCollectionBase {
        get(name: "tab_2_section_1"): Xrm.PageSection;
        get(name: "tab_2_section_2"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ovs_cyharm"): Xrm.OptionSetAttribute<ovs_cyharm>;
      get(name: "ovs_cylikelihoodofharm"): Xrm.OptionSetAttribute<ovs_cylikelihoodofharm>;
      get(name: "ovs_cymagnitudeofharm"): Xrm.OptionSetAttribute<ovs_cymagnitudeofharm>;
      get(name: "ovs_inspectionid"): Xrm.LookupAttribute<"msdyn_workorder">;
      get(name: "ovs_name"): Xrm.Attribute<string>;
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "statuscode"): Xrm.OptionSetAttribute<ovs_cysafetyassessment_statuscode>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "Actions"): Xrm.SubGridControl<"ovs_cyaction">;
      get(name: "ActionsClosed"): Xrm.SubGridControl<"ovs_cyaction">;
      get(name: "header_ovs_inspectionid"): Xrm.LookupControl<"msdyn_workorder">;
      get(name: "header_statuscode"): Xrm.OptionSetControl<ovs_cysafetyassessment_statuscode>;
      get(name: "ovs_cyharm"): Xrm.OptionSetControl<ovs_cyharm>;
      get(name: "ovs_cylikelihoodofharm"): Xrm.OptionSetControl<ovs_cylikelihoodofharm>;
      get(name: "ovs_cymagnitudeofharm"): Xrm.OptionSetControl<ovs_cymagnitudeofharm>;
      get(name: "ovs_name"): Xrm.StringControl;
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "tab_2"): Xrm.PageTab<Tabs.tab_2>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Information extends Xrm.PageBase<Information.Attributes,Information.Tabs,Information.Controls> {
    getAttribute(attributeName: "ovs_cyharm"): Xrm.OptionSetAttribute<ovs_cyharm>;
    getAttribute(attributeName: "ovs_cylikelihoodofharm"): Xrm.OptionSetAttribute<ovs_cylikelihoodofharm>;
    getAttribute(attributeName: "ovs_cymagnitudeofharm"): Xrm.OptionSetAttribute<ovs_cymagnitudeofharm>;
    getAttribute(attributeName: "ovs_inspectionid"): Xrm.LookupAttribute<"msdyn_workorder">;
    getAttribute(attributeName: "ovs_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "statuscode"): Xrm.OptionSetAttribute<ovs_cysafetyassessment_statuscode>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "Actions"): Xrm.SubGridControl<"ovs_cyaction">;
    getControl(controlName: "ActionsClosed"): Xrm.SubGridControl<"ovs_cyaction">;
    getControl(controlName: "header_ovs_inspectionid"): Xrm.LookupControl<"msdyn_workorder">;
    getControl(controlName: "header_statuscode"): Xrm.OptionSetControl<ovs_cysafetyassessment_statuscode>;
    getControl(controlName: "ovs_cyharm"): Xrm.OptionSetControl<ovs_cyharm>;
    getControl(controlName: "ovs_cylikelihoodofharm"): Xrm.OptionSetControl<ovs_cylikelihoodofharm>;
    getControl(controlName: "ovs_cymagnitudeofharm"): Xrm.OptionSetControl<ovs_cymagnitudeofharm>;
    getControl(controlName: "ovs_name"): Xrm.StringControl;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: string): undefined;
  }
}
