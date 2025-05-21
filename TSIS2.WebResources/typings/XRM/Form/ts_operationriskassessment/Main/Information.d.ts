declare namespace Form.ts_operationriskassessment.Main {
  namespace Information {
    namespace Tabs {
      interface tab_2 extends Xrm.SectionCollectionBase {
        get(name: "tab_2_section_3"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "ts_calculationlog"): Xrm.Attribute<string>;
      get(name: "ts_discretionaryscore"): Xrm.NumberAttribute;
      get(name: "ts_lastsubmissiondate"): Xrm.DateAttribute;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: "ts_operation"): Xrm.LookupAttribute<"ovs_operation">;
      get(name: "ts_riskcriteriascore"): Xrm.NumberAttribute;
      get(name: "ts_riskscore"): Xrm.NumberAttribute;
      get(name: "ts_riskthresholdenglish"): Xrm.Attribute<string>;
      get(name: "ts_riskthresholdfrench"): Xrm.Attribute<string>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "Subgrid_Discretionary_Factor_Responses"): Xrm.BaseControl;
      get(name: "Subgrid_Risk_Criteria_Responses"): Xrm.BaseControl;
      get(name: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "ts_calculationlog"): Xrm.StringControl;
      get(name: "ts_discretionaryscore"): Xrm.NumberControl;
      get(name: "ts_lastsubmissiondate"): Xrm.DateControl;
      get(name: "ts_name"): Xrm.StringControl;
      get(name: "ts_operation"): Xrm.LookupControl<"ovs_operation">;
      get(name: "ts_riskcriteriascore"): Xrm.NumberControl;
      get(name: "ts_riskscore"): Xrm.NumberControl;
      get(name: "ts_riskthresholdenglish"): Xrm.StringControl;
      get(name: "ts_riskthresholdfrench"): Xrm.StringControl;
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
    getAttribute(attributeName: "ts_calculationlog"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_discretionaryscore"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_lastsubmissiondate"): Xrm.DateAttribute;
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_operation"): Xrm.LookupAttribute<"ovs_operation">;
    getAttribute(attributeName: "ts_riskcriteriascore"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_riskscore"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_riskthresholdenglish"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_riskthresholdfrench"): Xrm.Attribute<string>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "Subgrid_Discretionary_Factor_Responses"): Xrm.BaseControl;
    getControl(controlName: "Subgrid_Risk_Criteria_Responses"): Xrm.BaseControl;
    getControl(controlName: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "ts_calculationlog"): Xrm.StringControl;
    getControl(controlName: "ts_discretionaryscore"): Xrm.NumberControl;
    getControl(controlName: "ts_lastsubmissiondate"): Xrm.DateControl;
    getControl(controlName: "ts_name"): Xrm.StringControl;
    getControl(controlName: "ts_operation"): Xrm.LookupControl<"ovs_operation">;
    getControl(controlName: "ts_riskcriteriascore"): Xrm.NumberControl;
    getControl(controlName: "ts_riskscore"): Xrm.NumberControl;
    getControl(controlName: "ts_riskthresholdenglish"): Xrm.StringControl;
    getControl(controlName: "ts_riskthresholdfrench"): Xrm.StringControl;
    getControl(controlName: string): undefined;
  }
}
