declare namespace Form.ts_enforcementaction.Main {
  namespace Information {
    namespace Tabs {
      interface general extends Xrm.SectionCollectionBase {
        get(name: "additional_details"): Xrm.PageSection;
        get(name: "tab_2_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface related_findings extends Xrm.SectionCollectionBase {
        get(name: "related_findings"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "ts_authorizedrepresentative"): Xrm.LookupAttribute<"contact">;
      get(name: "ts_case"): Xrm.LookupAttribute<"incident">;
      get(name: "ts_comments"): Xrm.Attribute<string>;
      get(name: "ts_copyofreceipt"): Xrm.Attribute<string>;
      get(name: "ts_individualcompany"): Xrm.LookupAttribute<"account">;
      get(name: "ts_individualposition"): Xrm.Attribute<string>;
      get(name: "ts_methodservice"): Xrm.MultiSelectOptionSetAttribute<ts_methodofservice>;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: "ts_timeanddateofservice"): Xrm.DateAttribute;
      get(name: "ts_type"): Xrm.OptionSetAttribute<ts_type>;
      get(name: "ts_verbalwarningdate"): Xrm.DateAttribute;
      get(name: "ts_verbalwarninggivento"): Xrm.LookupAttribute<"contact">;
      get(name: "ts_verbalwarningwhere"): Xrm.MultiSelectOptionSetAttribute<ts_verbalwarningwhere>;
      get(name: "ts_verbalwarningwheredetails"): Xrm.Attribute<string>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "Findings"): Xrm.SubGridControl<"ovs_finding">;
      get(name: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "header_ts_case"): Xrm.LookupControl<"incident">;
      get(name: "header_ts_name"): Xrm.StringControl;
      get(name: "ts_authorizedrepresentative"): Xrm.LookupControl<"contact">;
      get(name: "ts_comments"): Xrm.StringControl;
      get(name: "ts_copyofreceipt"): Xrm.StringControl;
      get(name: "ts_individualcompany"): Xrm.LookupControl<"account">;
      get(name: "ts_individualposition"): Xrm.StringControl;
      get(name: "ts_methodservice"): Xrm.MultiSelectOptionSetControl<ts_methodofservice>;
      get(name: "ts_timeanddateofservice"): Xrm.DateControl;
      get(name: "ts_type"): Xrm.OptionSetControl<ts_type>;
      get(name: "ts_verbalwarningdate"): Xrm.DateControl;
      get(name: "ts_verbalwarninggivento"): Xrm.LookupControl<"contact">;
      get(name: "ts_verbalwarningwhere"): Xrm.MultiSelectOptionSetControl<ts_verbalwarningwhere>;
      get(name: "ts_verbalwarningwheredetails"): Xrm.StringControl;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "general"): Xrm.PageTab<Tabs.general>;
      get(name: "related_findings"): Xrm.PageTab<Tabs.related_findings>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Information extends Xrm.PageBase<Information.Attributes,Information.Tabs,Information.Controls> {
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "ts_authorizedrepresentative"): Xrm.LookupAttribute<"contact">;
    getAttribute(attributeName: "ts_case"): Xrm.LookupAttribute<"incident">;
    getAttribute(attributeName: "ts_comments"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_copyofreceipt"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_individualcompany"): Xrm.LookupAttribute<"account">;
    getAttribute(attributeName: "ts_individualposition"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_methodservice"): Xrm.MultiSelectOptionSetAttribute<ts_methodofservice>;
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_timeanddateofservice"): Xrm.DateAttribute;
    getAttribute(attributeName: "ts_type"): Xrm.OptionSetAttribute<ts_type>;
    getAttribute(attributeName: "ts_verbalwarningdate"): Xrm.DateAttribute;
    getAttribute(attributeName: "ts_verbalwarninggivento"): Xrm.LookupAttribute<"contact">;
    getAttribute(attributeName: "ts_verbalwarningwhere"): Xrm.MultiSelectOptionSetAttribute<ts_verbalwarningwhere>;
    getAttribute(attributeName: "ts_verbalwarningwheredetails"): Xrm.Attribute<string>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "Findings"): Xrm.SubGridControl<"ovs_finding">;
    getControl(controlName: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "header_ts_case"): Xrm.LookupControl<"incident">;
    getControl(controlName: "header_ts_name"): Xrm.StringControl;
    getControl(controlName: "ts_authorizedrepresentative"): Xrm.LookupControl<"contact">;
    getControl(controlName: "ts_comments"): Xrm.StringControl;
    getControl(controlName: "ts_copyofreceipt"): Xrm.StringControl;
    getControl(controlName: "ts_individualcompany"): Xrm.LookupControl<"account">;
    getControl(controlName: "ts_individualposition"): Xrm.StringControl;
    getControl(controlName: "ts_methodservice"): Xrm.MultiSelectOptionSetControl<ts_methodofservice>;
    getControl(controlName: "ts_timeanddateofservice"): Xrm.DateControl;
    getControl(controlName: "ts_type"): Xrm.OptionSetControl<ts_type>;
    getControl(controlName: "ts_verbalwarningdate"): Xrm.DateControl;
    getControl(controlName: "ts_verbalwarninggivento"): Xrm.LookupControl<"contact">;
    getControl(controlName: "ts_verbalwarningwhere"): Xrm.MultiSelectOptionSetControl<ts_verbalwarningwhere>;
    getControl(controlName: "ts_verbalwarningwheredetails"): Xrm.StringControl;
    getControl(controlName: string): undefined;
  }
}
