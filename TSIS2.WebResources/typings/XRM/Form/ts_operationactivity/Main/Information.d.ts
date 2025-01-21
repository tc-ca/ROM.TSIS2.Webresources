declare namespace Form.ts_operationactivity.Main {
  namespace Information {
    namespace Tabs {
      interface related_wos_tab extends Xrm.SectionCollectionBase {
        get(name: "tab_2_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface risk_scores_tab extends Xrm.SectionCollectionBase {
        get(name: "tab_3_section_operation_activity_risk_scores"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "ts_activity"): Xrm.LookupAttribute<"msdyn_incidenttype">;
      get(name: "ts_closedondateoflastworkorder"): Xrm.DateAttribute;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: "ts_operation"): Xrm.LookupAttribute<"ovs_operation">;
      get(name: "ts_operationalstatus"): Xrm.OptionSetAttribute<ts_operationalstatus>;
      get(name: "ts_plannedstatus"): Xrm.OptionSetAttribute<ts_planningstatus>;
      get(name: "ts_programarea"): Xrm.LookupAttribute<"ts_programarea">;
      get(name: "ts_riskscore"): Xrm.NumberAttribute;
      get(name: "ts_site"): Xrm.LookupAttribute<"msdyn_functionallocation">;
      get(name: "ts_stakeholder"): Xrm.LookupAttribute<"account">;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "Subgrid_new_1"): Xrm.SubGridControl<"ts_operationactivityriskscores">;
      get(name: "WebResource_OperationActivityRelatedWOView"): Xrm.WebResourceControl;
      get(name: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "header_ts_operationalstatus"): Xrm.OptionSetControl<ts_operationalstatus>;
      get(name: "header_ts_plannedstatus"): Xrm.OptionSetControl<ts_planningstatus>;
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "ts_activity"): Xrm.LookupControl<"msdyn_incidenttype">;
      get(name: "ts_closedondateoflastworkorder"): Xrm.DateControl;
      get(name: "ts_name"): Xrm.StringControl;
      get(name: "ts_operation"): Xrm.LookupControl<"ovs_operation">;
      get(name: "ts_programarea"): Xrm.LookupControl<"ts_programarea">;
      get(name: "ts_riskscore"): Xrm.NumberControl;
      get(name: "ts_site"): Xrm.LookupControl<"msdyn_functionallocation">;
      get(name: "ts_stakeholder"): Xrm.LookupControl<"account">;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "related_wos_tab"): Xrm.PageTab<Tabs.related_wos_tab>;
      get(name: "risk_scores_tab"): Xrm.PageTab<Tabs.risk_scores_tab>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Information extends Xrm.PageBase<Information.Attributes,Information.Tabs,Information.Controls> {
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "ts_activity"): Xrm.LookupAttribute<"msdyn_incidenttype">;
    getAttribute(attributeName: "ts_closedondateoflastworkorder"): Xrm.DateAttribute;
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_operation"): Xrm.LookupAttribute<"ovs_operation">;
    getAttribute(attributeName: "ts_operationalstatus"): Xrm.OptionSetAttribute<ts_operationalstatus>;
    getAttribute(attributeName: "ts_plannedstatus"): Xrm.OptionSetAttribute<ts_planningstatus>;
    getAttribute(attributeName: "ts_programarea"): Xrm.LookupAttribute<"ts_programarea">;
    getAttribute(attributeName: "ts_riskscore"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_site"): Xrm.LookupAttribute<"msdyn_functionallocation">;
    getAttribute(attributeName: "ts_stakeholder"): Xrm.LookupAttribute<"account">;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "Subgrid_new_1"): Xrm.SubGridControl<"ts_operationactivityriskscores">;
    getControl(controlName: "WebResource_OperationActivityRelatedWOView"): Xrm.WebResourceControl;
    getControl(controlName: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "header_ts_operationalstatus"): Xrm.OptionSetControl<ts_operationalstatus>;
    getControl(controlName: "header_ts_plannedstatus"): Xrm.OptionSetControl<ts_planningstatus>;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "ts_activity"): Xrm.LookupControl<"msdyn_incidenttype">;
    getControl(controlName: "ts_closedondateoflastworkorder"): Xrm.DateControl;
    getControl(controlName: "ts_name"): Xrm.StringControl;
    getControl(controlName: "ts_operation"): Xrm.LookupControl<"ovs_operation">;
    getControl(controlName: "ts_programarea"): Xrm.LookupControl<"ts_programarea">;
    getControl(controlName: "ts_riskscore"): Xrm.NumberControl;
    getControl(controlName: "ts_site"): Xrm.LookupControl<"msdyn_functionallocation">;
    getControl(controlName: "ts_stakeholder"): Xrm.LookupControl<"account">;
    getControl(controlName: string): undefined;
  }
}
