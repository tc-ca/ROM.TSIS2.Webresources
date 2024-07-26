declare namespace Form.ts_case.Main {
  namespace Information {
    namespace Tabs {
      interface General extends Xrm.SectionCollectionBase {
        get(name: "{776e1a6b-a21a-4f23-96af-37ba1527c5db}_section_3"): Xrm.PageSection;
        get(name: "{776e1a6b-a21a-4f23-96af-37ba1527c5db}_section_4"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "modifiedon"): Xrm.DateAttribute;
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "statecode"): Xrm.OptionSetAttribute<ts_case_statecode>;
      get(name: "statuscode"): Xrm.OptionSetAttribute<ts_case_statuscode>;
      get(name: "ts_country"): Xrm.LookupAttribute<"tc_country">;
      get(name: "ts_customer"): Xrm.LookupAttribute<"account">;
      get(name: "ts_description"): Xrm.Attribute<string>;
      get(name: "ts_incident"): Xrm.OptionSetAttribute<ts_yesno>;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: "ts_primarycontactid"): Xrm.LookupAttribute<"contact">;
      get(name: "ts_region"): Xrm.LookupAttribute<"ts_region">;
      get(name: "ts_site"): Xrm.LookupAttribute<"ts_site">;
      get(name: "ts_ticketnumber"): Xrm.Attribute<string>;
      get(name: "ts_tradenameid"): Xrm.LookupAttribute<"ts_tradename">;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "header_statecode"): Xrm.OptionSetControl<ts_case_statecode>;
      get(name: "header_statuscode"): Xrm.OptionSetControl<ts_case_statuscode>;
      get(name: "modifiedon"): Xrm.DateControl;
      get(name: "notescontrol"): Xrm.BaseControl;
      get(name: "ts_country"): Xrm.LookupControl<"tc_country">;
      get(name: "ts_customer"): Xrm.LookupControl<"account">;
      get(name: "ts_description"): Xrm.StringControl;
      get(name: "ts_incident"): Xrm.OptionSetControl<ts_yesno>;
      get(name: "ts_name"): Xrm.StringControl;
      get(name: "ts_primarycontactid"): Xrm.LookupControl<"contact">;
      get(name: "ts_region"): Xrm.LookupControl<"ts_region">;
      get(name: "ts_site"): Xrm.LookupControl<"ts_site">;
      get(name: "ts_ticketnumber"): Xrm.StringControl;
      get(name: "ts_tradenameid"): Xrm.LookupControl<"ts_tradename">;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "General"): Xrm.PageTab<Tabs.General>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Information extends Xrm.PageBase<Information.Attributes,Information.Tabs,Information.Controls> {
    getAttribute(attributeName: "modifiedon"): Xrm.DateAttribute;
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "statecode"): Xrm.OptionSetAttribute<ts_case_statecode>;
    getAttribute(attributeName: "statuscode"): Xrm.OptionSetAttribute<ts_case_statuscode>;
    getAttribute(attributeName: "ts_country"): Xrm.LookupAttribute<"tc_country">;
    getAttribute(attributeName: "ts_customer"): Xrm.LookupAttribute<"account">;
    getAttribute(attributeName: "ts_description"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_incident"): Xrm.OptionSetAttribute<ts_yesno>;
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_primarycontactid"): Xrm.LookupAttribute<"contact">;
    getAttribute(attributeName: "ts_region"): Xrm.LookupAttribute<"ts_region">;
    getAttribute(attributeName: "ts_site"): Xrm.LookupAttribute<"ts_site">;
    getAttribute(attributeName: "ts_ticketnumber"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_tradenameid"): Xrm.LookupAttribute<"ts_tradename">;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "header_statecode"): Xrm.OptionSetControl<ts_case_statecode>;
    getControl(controlName: "header_statuscode"): Xrm.OptionSetControl<ts_case_statuscode>;
    getControl(controlName: "modifiedon"): Xrm.DateControl;
    getControl(controlName: "notescontrol"): Xrm.BaseControl;
    getControl(controlName: "ts_country"): Xrm.LookupControl<"tc_country">;
    getControl(controlName: "ts_customer"): Xrm.LookupControl<"account">;
    getControl(controlName: "ts_description"): Xrm.StringControl;
    getControl(controlName: "ts_incident"): Xrm.OptionSetControl<ts_yesno>;
    getControl(controlName: "ts_name"): Xrm.StringControl;
    getControl(controlName: "ts_primarycontactid"): Xrm.LookupControl<"contact">;
    getControl(controlName: "ts_region"): Xrm.LookupControl<"ts_region">;
    getControl(controlName: "ts_site"): Xrm.LookupControl<"ts_site">;
    getControl(controlName: "ts_ticketnumber"): Xrm.StringControl;
    getControl(controlName: "ts_tradenameid"): Xrm.LookupControl<"ts_tradename">;
    getControl(controlName: string): undefined;
  }
}
