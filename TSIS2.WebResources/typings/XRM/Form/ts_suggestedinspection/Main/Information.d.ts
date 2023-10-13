declare namespace Form.ts_suggestedinspection.Main {
  namespace Information {
    namespace Tabs {
      interface tab_2 extends Xrm.SectionCollectionBase {
        get(name: "tab_2_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "ts_activitytype"): Xrm.LookupAttribute<"msdyn_incidenttype">;
      get(name: "ts_category"): Xrm.OptionSetAttribute<ts_plancategory>;
      get(name: "ts_estimatedduration"): Xrm.NumberAttribute;
      get(name: "ts_inspector"): Xrm.LookupAttribute<"systemuser">;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: "ts_operation"): Xrm.LookupAttribute<"ovs_operation">;
      get(name: "ts_operationtype"): Xrm.LookupAttribute<"ovs_operationtype">;
      get(name: "ts_q1"): Xrm.NumberAttribute;
      get(name: "ts_q2"): Xrm.NumberAttribute;
      get(name: "ts_q3"): Xrm.NumberAttribute;
      get(name: "ts_q4"): Xrm.NumberAttribute;
      get(name: "ts_riskthreshold"): Xrm.LookupAttribute<"ts_riskcategory">;
      get(name: "ts_site"): Xrm.LookupAttribute<"msdyn_functionallocation">;
      get(name: "ts_stakeholder"): Xrm.LookupAttribute<"account">;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "grid_supportingregion"): Xrm.SubGridControl<"territory">;
      get(name: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "ts_activitytype"): Xrm.LookupControl<"msdyn_incidenttype">;
      get(name: "ts_category"): Xrm.OptionSetControl<ts_plancategory>;
      get(name: "ts_estimatedduration"): Xrm.NumberControl;
      get(name: "ts_inspector"): Xrm.LookupControl<"systemuser">;
      get(name: "ts_name"): Xrm.StringControl;
      get(name: "ts_operation"): Xrm.LookupControl<"ovs_operation">;
      get(name: "ts_operationtype"): Xrm.LookupControl<"ovs_operationtype">;
      get(name: "ts_q1"): Xrm.NumberControl;
      get(name: "ts_q2"): Xrm.NumberControl;
      get(name: "ts_q3"): Xrm.NumberControl;
      get(name: "ts_q4"): Xrm.NumberControl;
      get(name: "ts_riskthreshold"): Xrm.LookupControl<"ts_riskcategory">;
      get(name: "ts_site"): Xrm.LookupControl<"msdyn_functionallocation">;
      get(name: "ts_stakeholder"): Xrm.LookupControl<"account">;
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
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "ts_activitytype"): Xrm.LookupAttribute<"msdyn_incidenttype">;
    getAttribute(attributeName: "ts_category"): Xrm.OptionSetAttribute<ts_plancategory>;
    getAttribute(attributeName: "ts_estimatedduration"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_inspector"): Xrm.LookupAttribute<"systemuser">;
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_operation"): Xrm.LookupAttribute<"ovs_operation">;
    getAttribute(attributeName: "ts_operationtype"): Xrm.LookupAttribute<"ovs_operationtype">;
    getAttribute(attributeName: "ts_q1"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_q2"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_q3"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_q4"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_riskthreshold"): Xrm.LookupAttribute<"ts_riskcategory">;
    getAttribute(attributeName: "ts_site"): Xrm.LookupAttribute<"msdyn_functionallocation">;
    getAttribute(attributeName: "ts_stakeholder"): Xrm.LookupAttribute<"account">;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "grid_supportingregion"): Xrm.SubGridControl<"territory">;
    getControl(controlName: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "ts_activitytype"): Xrm.LookupControl<"msdyn_incidenttype">;
    getControl(controlName: "ts_category"): Xrm.OptionSetControl<ts_plancategory>;
    getControl(controlName: "ts_estimatedduration"): Xrm.NumberControl;
    getControl(controlName: "ts_inspector"): Xrm.LookupControl<"systemuser">;
    getControl(controlName: "ts_name"): Xrm.StringControl;
    getControl(controlName: "ts_operation"): Xrm.LookupControl<"ovs_operation">;
    getControl(controlName: "ts_operationtype"): Xrm.LookupControl<"ovs_operationtype">;
    getControl(controlName: "ts_q1"): Xrm.NumberControl;
    getControl(controlName: "ts_q2"): Xrm.NumberControl;
    getControl(controlName: "ts_q3"): Xrm.NumberControl;
    getControl(controlName: "ts_q4"): Xrm.NumberControl;
    getControl(controlName: "ts_riskthreshold"): Xrm.LookupControl<"ts_riskcategory">;
    getControl(controlName: "ts_site"): Xrm.LookupControl<"msdyn_functionallocation">;
    getControl(controlName: "ts_stakeholder"): Xrm.LookupControl<"account">;
    getControl(controlName: string): undefined;
  }
}
