declare namespace Form.incident.QuickCreate {
  namespace CaseQuickCreate {
    namespace Tabs {
      interface tab_1 extends Xrm.SectionCollectionBase {
        get(name: "tab_1_column_1_section_1"): Xrm.PageSection;
        get(name: "tab_1_column_2_section_1"): Xrm.PageSection;
        get(name: "tab_1_column_3_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "caseorigincode"): Xrm.OptionSetAttribute<incident_caseorigincode>;
      get(name: "casetypecode"): Xrm.OptionSetAttribute<incident_casetypecode>;
      get(name: "customerid"): Xrm.LookupAttribute<"account" | "contact">;
      get(name: "description"): Xrm.Attribute<string>;
      get(name: "entitlementid"): Xrm.LookupAttribute<"entitlement">;
      get(name: "existingcase"): Xrm.LookupAttribute<"incident"> | null;
      get(name: "msdyn_incidenttype"): Xrm.LookupAttribute<"msdyn_incidenttype">;
      get(name: "msdyn_iotalert"): Xrm.LookupAttribute<"msdyn_iotalert">;
      get(name: "ovs_countryid"): Xrm.LookupAttribute<"ovs_country">;
      get(name: "ovs_region"): Xrm.LookupAttribute<"territory">;
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "parentcaseid"): Xrm.LookupAttribute<"incident">;
      get(name: "primarycontactid"): Xrm.LookupAttribute<"contact">;
      get(name: "productid"): Xrm.LookupAttribute<"product">;
      get(name: "resolveby"): Xrm.DateAttribute;
      get(name: "responseby"): Xrm.DateAttribute;
      get(name: "subjectid"): Xrm.LookupAttribute<"subject">;
      get(name: "title"): Xrm.Attribute<string>;
      get(name: "ts_country"): Xrm.LookupAttribute<"tc_country">;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "caseorigincode"): Xrm.OptionSetControl<incident_caseorigincode>;
      get(name: "casetypecode"): Xrm.OptionSetControl<incident_casetypecode>;
      get(name: "customerid"): Xrm.LookupControl<"account" | "contact">;
      get(name: "description"): Xrm.StringControl;
      get(name: "entitlementid"): Xrm.LookupControl<"entitlement">;
      get(name: "header_process_customerid"): Xrm.LookupControl<"account" | "contact"> | null;
      get(name: "header_process_customerid_1"): Xrm.LookupControl<"account" | "contact"> | null;
      get(name: "header_process_customerid_2"): Xrm.LookupControl<"account" | "contact"> | null;
      get(name: "header_process_customerid_3"): Xrm.LookupControl<"account" | "contact"> | null;
      get(name: "header_process_customerid_4"): Xrm.LookupControl<"account" | "contact"> | null;
      get(name: "header_process_existingcase"): Xrm.LookupControl<"incident"> | null;
      get(name: "header_process_existingcase_1"): Xrm.LookupControl<"incident"> | null;
      get(name: "header_process_msdyn_incidenttype"): Xrm.LookupControl<"msdyn_incidenttype"> | null;
      get(name: "header_process_ownerid"): Xrm.LookupControl<"systemuser" | "team"> | null;
      get(name: "header_process_ownerid_1"): Xrm.LookupControl<"systemuser" | "team"> | null;
      get(name: "header_process_ownerid_2"): Xrm.LookupControl<"systemuser" | "team"> | null;
      get(name: "header_process_primarycontactid"): Xrm.LookupControl<"contact"> | null;
      get(name: "header_process_primarycontactid_1"): Xrm.LookupControl<"contact"> | null;
      get(name: "header_process_primarycontactid_2"): Xrm.LookupControl<"contact"> | null;
      get(name: "header_process_title"): Xrm.StringControl | null;
      get(name: "header_process_title_1"): Xrm.StringControl | null;
      get(name: "msdyn_incidenttype"): Xrm.LookupControl<"msdyn_incidenttype">;
      get(name: "msdyn_iotalert"): Xrm.LookupControl<"msdyn_iotalert">;
      get(name: "ovs_countryid"): Xrm.LookupControl<"ovs_country">;
      get(name: "ovs_region"): Xrm.LookupControl<"territory">;
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "parentcaseid"): Xrm.LookupControl<"incident">;
      get(name: "primarycontactid"): Xrm.LookupControl<"contact">;
      get(name: "productid"): Xrm.LookupControl<"product">;
      get(name: "resolveby"): Xrm.DateControl;
      get(name: "responseby"): Xrm.DateControl;
      get(name: "subjectid"): Xrm.LookupControl<"subject">;
      get(name: "title"): Xrm.StringControl;
      get(name: "ts_country"): Xrm.LookupControl<"tc_country">;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "tab_1"): Xrm.PageTab<Tabs.tab_1>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface CaseQuickCreate extends Xrm.PageBase<CaseQuickCreate.Attributes,CaseQuickCreate.Tabs,CaseQuickCreate.Controls> {
    getAttribute(attributeName: "caseorigincode"): Xrm.OptionSetAttribute<incident_caseorigincode>;
    getAttribute(attributeName: "casetypecode"): Xrm.OptionSetAttribute<incident_casetypecode>;
    getAttribute(attributeName: "customerid"): Xrm.LookupAttribute<"account" | "contact">;
    getAttribute(attributeName: "description"): Xrm.Attribute<string>;
    getAttribute(attributeName: "entitlementid"): Xrm.LookupAttribute<"entitlement">;
    getAttribute(attributeName: "existingcase"): Xrm.LookupAttribute<"incident"> | null;
    getAttribute(attributeName: "msdyn_incidenttype"): Xrm.LookupAttribute<"msdyn_incidenttype">;
    getAttribute(attributeName: "msdyn_iotalert"): Xrm.LookupAttribute<"msdyn_iotalert">;
    getAttribute(attributeName: "ovs_countryid"): Xrm.LookupAttribute<"ovs_country">;
    getAttribute(attributeName: "ovs_region"): Xrm.LookupAttribute<"territory">;
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "parentcaseid"): Xrm.LookupAttribute<"incident">;
    getAttribute(attributeName: "primarycontactid"): Xrm.LookupAttribute<"contact">;
    getAttribute(attributeName: "productid"): Xrm.LookupAttribute<"product">;
    getAttribute(attributeName: "resolveby"): Xrm.DateAttribute;
    getAttribute(attributeName: "responseby"): Xrm.DateAttribute;
    getAttribute(attributeName: "subjectid"): Xrm.LookupAttribute<"subject">;
    getAttribute(attributeName: "title"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_country"): Xrm.LookupAttribute<"tc_country">;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "caseorigincode"): Xrm.OptionSetControl<incident_caseorigincode>;
    getControl(controlName: "casetypecode"): Xrm.OptionSetControl<incident_casetypecode>;
    getControl(controlName: "customerid"): Xrm.LookupControl<"account" | "contact">;
    getControl(controlName: "description"): Xrm.StringControl;
    getControl(controlName: "entitlementid"): Xrm.LookupControl<"entitlement">;
    getControl(controlName: "header_process_customerid"): Xrm.LookupControl<"account" | "contact"> | null;
    getControl(controlName: "header_process_customerid_1"): Xrm.LookupControl<"account" | "contact"> | null;
    getControl(controlName: "header_process_customerid_2"): Xrm.LookupControl<"account" | "contact"> | null;
    getControl(controlName: "header_process_customerid_3"): Xrm.LookupControl<"account" | "contact"> | null;
    getControl(controlName: "header_process_customerid_4"): Xrm.LookupControl<"account" | "contact"> | null;
    getControl(controlName: "header_process_existingcase"): Xrm.LookupControl<"incident"> | null;
    getControl(controlName: "header_process_existingcase_1"): Xrm.LookupControl<"incident"> | null;
    getControl(controlName: "header_process_msdyn_incidenttype"): Xrm.LookupControl<"msdyn_incidenttype"> | null;
    getControl(controlName: "header_process_ownerid"): Xrm.LookupControl<"systemuser" | "team"> | null;
    getControl(controlName: "header_process_ownerid_1"): Xrm.LookupControl<"systemuser" | "team"> | null;
    getControl(controlName: "header_process_ownerid_2"): Xrm.LookupControl<"systemuser" | "team"> | null;
    getControl(controlName: "header_process_primarycontactid"): Xrm.LookupControl<"contact"> | null;
    getControl(controlName: "header_process_primarycontactid_1"): Xrm.LookupControl<"contact"> | null;
    getControl(controlName: "header_process_primarycontactid_2"): Xrm.LookupControl<"contact"> | null;
    getControl(controlName: "header_process_title"): Xrm.StringControl | null;
    getControl(controlName: "header_process_title_1"): Xrm.StringControl | null;
    getControl(controlName: "msdyn_incidenttype"): Xrm.LookupControl<"msdyn_incidenttype">;
    getControl(controlName: "msdyn_iotalert"): Xrm.LookupControl<"msdyn_iotalert">;
    getControl(controlName: "ovs_countryid"): Xrm.LookupControl<"ovs_country">;
    getControl(controlName: "ovs_region"): Xrm.LookupControl<"territory">;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "parentcaseid"): Xrm.LookupControl<"incident">;
    getControl(controlName: "primarycontactid"): Xrm.LookupControl<"contact">;
    getControl(controlName: "productid"): Xrm.LookupControl<"product">;
    getControl(controlName: "resolveby"): Xrm.DateControl;
    getControl(controlName: "responseby"): Xrm.DateControl;
    getControl(controlName: "subjectid"): Xrm.LookupControl<"subject">;
    getControl(controlName: "title"): Xrm.StringControl;
    getControl(controlName: "ts_country"): Xrm.LookupControl<"tc_country">;
    getControl(controlName: string): undefined;
  }
}
