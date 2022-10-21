declare namespace Form.account.Main {
  namespace ROMInformation {
    namespace Tabs {
      interface AssetsAndLocationsTab extends Xrm.SectionCollectionBase {
        get(name: "AssetsAndLocationsSection"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface Case_tab extends Xrm.SectionCollectionBase {
        get(name: "tab_9_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface DETAILS_TAB extends Xrm.SectionCollectionBase {
        get(name: "COMPANY_PROFILE"): Xrm.PageSection;
        get(name: "CONTACT_PREFERENCES"): Xrm.PageSection;
        get(name: "ChildAccounts"): Xrm.PageSection;
        get(name: "DETAILS_TAB_section_6"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface Finding_tab extends Xrm.SectionCollectionBase {
        get(name: "tab_9_section_2"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface Operations extends Xrm.SectionCollectionBase {
        get(name: "Operations_section_2"): Xrm.PageSection;
        get(name: "tab_5_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface SUMMARY_TAB extends Xrm.SectionCollectionBase {
        get(name: "ACCOUNT_INFORMATION"): Xrm.PageSection;
        get(name: "ADDRESS"): Xrm.PageSection;
        get(name: "MapSection"): Xrm.PageSection;
        get(name: "SUMMARY_TAB_section_9"): Xrm.PageSection;
        get(name: "SUMMARY_TAB_section_9"): Xrm.PageSection;
        get(name: "SUMMARY_TAB_section_timeframe"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface WorkOrders extends Xrm.SectionCollectionBase {
        get(name: "tab_7_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_8 extends Xrm.SectionCollectionBase {
        get(name: "_section_477"): Xrm.PageSection;
        get(name: "tab_8_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_contacts extends Xrm.SectionCollectionBase {
        get(name: "SUMMARY_TAB_section_6"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "address1_city"): Xrm.Attribute<string> | null;
      get(name: "address1_composite"): Xrm.Attribute<string> | null;
      get(name: "address1_country"): Xrm.Attribute<string> | null;
      get(name: "address1_latitude"): Xrm.NumberAttribute;
      get(name: "address1_line1"): Xrm.Attribute<string> | null;
      get(name: "address1_line2"): Xrm.Attribute<string> | null;
      get(name: "address1_line3"): Xrm.Attribute<string> | null;
      get(name: "address1_longitude"): Xrm.NumberAttribute;
      get(name: "address1_postalcode"): Xrm.Attribute<string> | null;
      get(name: "address1_stateorprovince"): Xrm.Attribute<string> | null;
      get(name: "customertypecode"): Xrm.OptionSetAttribute<account_customertypecode>;
      get(name: "description"): Xrm.Attribute<string>;
      get(name: "donotbulkemail"): Xrm.OptionSetAttribute<boolean>;
      get(name: "donotemail"): Xrm.OptionSetAttribute<boolean>;
      get(name: "donotfax"): Xrm.OptionSetAttribute<boolean>;
      get(name: "donotphone"): Xrm.OptionSetAttribute<boolean>;
      get(name: "donotpostalmail"): Xrm.OptionSetAttribute<boolean>;
      get(name: "fax"): Xrm.Attribute<string>;
      get(name: "industrycode"): Xrm.OptionSetAttribute<account_industrycode>;
      get(name: "msdyn_serviceterritory"): Xrm.LookupAttribute<"territory">;
      get(name: "name"): Xrm.Attribute<string>;
      get(name: "ovs_legalname"): Xrm.Attribute<string>;
      get(name: "ovs_naicscode"): Xrm.Attribute<string>;
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "ownershipcode"): Xrm.OptionSetAttribute<account_ownershipcode>;
      get(name: "parentaccountid"): Xrm.LookupAttribute<"account">;
      get(name: "preferredcontactmethodcode"): Xrm.OptionSetAttribute<account_preferredcontactmethodcode>;
      get(name: "primarycontactid"): Xrm.LookupAttribute<"contact">;
      get(name: "telephone1"): Xrm.Attribute<string>;
      get(name: "ts_country"): Xrm.LookupAttribute<"tc_country">;
      get(name: "ts_iatacode"): Xrm.Attribute<string>;
      get(name: "ts_icaocode"): Xrm.Attribute<string>;
      get(name: "ts_principaloperationtype"): Xrm.LookupAttribute<"ovs_operationtype">;
      get(name: "ts_securityplantype"): Xrm.OptionSetAttribute<ts_securityplantype>;
      get(name: "ts_stakeholderstatus"): Xrm.OptionSetAttribute<ts_stakeholderstatus>;
      get(name: "ts_statusdescription"): Xrm.Attribute<string>;
      get(name: "ts_statusenddate"): Xrm.DateAttribute;
      get(name: "ts_statusstartdate"): Xrm.DateAttribute;
      get(name: "websiteurl"): Xrm.Attribute<string>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "Cases"): Xrm.SubGridControl<"incident">;
      get(name: "ChildAccounts"): Xrm.SubGridControl<"account">;
      get(name: "Contacts"): Xrm.SubGridControl<"contact">;
      get(name: "Files"): Xrm.SubGridControl<"ts_file">;
      get(name: "Findings"): Xrm.SubGridControl<"ovs_finding">;
      get(name: "Operations"): Xrm.SubGridControl<"ovs_operation">;
      get(name: "Subgrid_1"): Xrm.SubGridControl<"ts_tradename">;
      get(name: "Subgrid_2"): Xrm.SubGridControl<"msdyn_workorder">;
      get(name: "address1_composite"): Xrm.StringControl | null;
      get(name: "address1_composite_compositionLinkControl_address1_city"): Xrm.StringControl | null;
      get(name: "address1_composite_compositionLinkControl_address1_country"): Xrm.StringControl | null;
      get(name: "address1_composite_compositionLinkControl_address1_line1"): Xrm.StringControl | null;
      get(name: "address1_composite_compositionLinkControl_address1_line2"): Xrm.StringControl | null;
      get(name: "address1_composite_compositionLinkControl_address1_line3"): Xrm.StringControl | null;
      get(name: "address1_composite_compositionLinkControl_address1_postalcode"): Xrm.StringControl | null;
      get(name: "address1_composite_compositionLinkControl_address1_stateorprovince"): Xrm.StringControl | null;
      get(name: "address1_latitude"): Xrm.NumberControl;
      get(name: "address1_longitude"): Xrm.NumberControl;
      get(name: "customertypecode"): Xrm.OptionSetControl<account_customertypecode>;
      get(name: "description"): Xrm.StringControl;
      get(name: "donotbulkemail"): Xrm.OptionSetControl<boolean>;
      get(name: "donotemail"): Xrm.OptionSetControl<boolean>;
      get(name: "donotfax"): Xrm.OptionSetControl<boolean>;
      get(name: "donotphone"): Xrm.OptionSetControl<boolean>;
      get(name: "donotpostalmail"): Xrm.OptionSetControl<boolean>;
      get(name: "fax"): Xrm.StringControl;
      get(name: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "industrycode"): Xrm.OptionSetControl<account_industrycode>;
      get(name: "mapcontrol"): Xrm.BaseControl;
      get(name: "msdyn_serviceterritory"): Xrm.LookupControl<"territory">;
      get(name: "name"): Xrm.StringControl;
      get(name: "name1"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "name2"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "name3"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "notescontrol"): Xrm.BaseControl;
      get(name: "ovs_legalname"): Xrm.StringControl;
      get(name: "ovs_naicscode"): Xrm.StringControl;
      get(name: "ownershipcode"): Xrm.OptionSetControl<account_ownershipcode>;
      get(name: "parentaccountid"): Xrm.LookupControl<"account">;
      get(name: "preferredcontactmethodcode"): Xrm.OptionSetControl<account_preferredcontactmethodcode>;
      get(name: "primarycontactid"): Xrm.LookupControl<"contact">;
      get(name: "telephone1"): Xrm.StringControl;
      get(name: "ts_country"): Xrm.LookupControl<"tc_country">;
      get(name: "ts_iatacode"): Xrm.StringControl;
      get(name: "ts_icaocode"): Xrm.StringControl;
      get(name: "ts_principaloperationtype"): Xrm.LookupControl<"ovs_operationtype">;
      get(name: "ts_securityplantype"): Xrm.OptionSetControl<ts_securityplantype>;
      get(name: "ts_stakeholderstatus"): Xrm.OptionSetControl<ts_stakeholderstatus>;
      get(name: "ts_statusdescription"): Xrm.StringControl;
      get(name: "ts_statusenddate"): Xrm.DateControl;
      get(name: "ts_statusstartdate"): Xrm.DateControl;
      get(name: "websiteurl"): Xrm.StringControl;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "AssetsAndLocationsTab"): Xrm.PageTab<Tabs.AssetsAndLocationsTab>;
      get(name: "Case_tab"): Xrm.PageTab<Tabs.Case_tab>;
      get(name: "DETAILS_TAB"): Xrm.PageTab<Tabs.DETAILS_TAB>;
      get(name: "Finding_tab"): Xrm.PageTab<Tabs.Finding_tab>;
      get(name: "Operations"): Xrm.PageTab<Tabs.Operations>;
      get(name: "SUMMARY_TAB"): Xrm.PageTab<Tabs.SUMMARY_TAB>;
      get(name: "Work Orders"): Xrm.PageTab<Tabs.WorkOrders>;
      get(name: "tab_8"): Xrm.PageTab<Tabs.tab_8>;
      get(name: "tab_contacts"): Xrm.PageTab<Tabs.tab_contacts>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface ROMInformation extends Xrm.PageBase<ROMInformation.Attributes,ROMInformation.Tabs,ROMInformation.Controls> {
    getAttribute(attributeName: "address1_city"): Xrm.Attribute<string> | null;
    getAttribute(attributeName: "address1_composite"): Xrm.Attribute<string> | null;
    getAttribute(attributeName: "address1_country"): Xrm.Attribute<string> | null;
    getAttribute(attributeName: "address1_latitude"): Xrm.NumberAttribute;
    getAttribute(attributeName: "address1_line1"): Xrm.Attribute<string> | null;
    getAttribute(attributeName: "address1_line2"): Xrm.Attribute<string> | null;
    getAttribute(attributeName: "address1_line3"): Xrm.Attribute<string> | null;
    getAttribute(attributeName: "address1_longitude"): Xrm.NumberAttribute;
    getAttribute(attributeName: "address1_postalcode"): Xrm.Attribute<string> | null;
    getAttribute(attributeName: "address1_stateorprovince"): Xrm.Attribute<string> | null;
    getAttribute(attributeName: "customertypecode"): Xrm.OptionSetAttribute<account_customertypecode>;
    getAttribute(attributeName: "description"): Xrm.Attribute<string>;
    getAttribute(attributeName: "donotbulkemail"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "donotemail"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "donotfax"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "donotphone"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "donotpostalmail"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "fax"): Xrm.Attribute<string>;
    getAttribute(attributeName: "industrycode"): Xrm.OptionSetAttribute<account_industrycode>;
    getAttribute(attributeName: "msdyn_serviceterritory"): Xrm.LookupAttribute<"territory">;
    getAttribute(attributeName: "name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ovs_legalname"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ovs_naicscode"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "ownershipcode"): Xrm.OptionSetAttribute<account_ownershipcode>;
    getAttribute(attributeName: "parentaccountid"): Xrm.LookupAttribute<"account">;
    getAttribute(attributeName: "preferredcontactmethodcode"): Xrm.OptionSetAttribute<account_preferredcontactmethodcode>;
    getAttribute(attributeName: "primarycontactid"): Xrm.LookupAttribute<"contact">;
    getAttribute(attributeName: "telephone1"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_country"): Xrm.LookupAttribute<"tc_country">;
    getAttribute(attributeName: "ts_iatacode"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_icaocode"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_principaloperationtype"): Xrm.LookupAttribute<"ovs_operationtype">;
    getAttribute(attributeName: "ts_securityplantype"): Xrm.OptionSetAttribute<ts_securityplantype>;
    getAttribute(attributeName: "ts_stakeholderstatus"): Xrm.OptionSetAttribute<ts_stakeholderstatus>;
    getAttribute(attributeName: "ts_statusdescription"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_statusenddate"): Xrm.DateAttribute;
    getAttribute(attributeName: "ts_statusstartdate"): Xrm.DateAttribute;
    getAttribute(attributeName: "websiteurl"): Xrm.Attribute<string>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "Cases"): Xrm.SubGridControl<"incident">;
    getControl(controlName: "ChildAccounts"): Xrm.SubGridControl<"account">;
    getControl(controlName: "Contacts"): Xrm.SubGridControl<"contact">;
    getControl(controlName: "Files"): Xrm.SubGridControl<"ts_file">;
    getControl(controlName: "Findings"): Xrm.SubGridControl<"ovs_finding">;
    getControl(controlName: "Operations"): Xrm.SubGridControl<"ovs_operation">;
    getControl(controlName: "Subgrid_1"): Xrm.SubGridControl<"ts_tradename">;
    getControl(controlName: "Subgrid_2"): Xrm.SubGridControl<"msdyn_workorder">;
    getControl(controlName: "address1_composite"): Xrm.StringControl | null;
    getControl(controlName: "address1_composite_compositionLinkControl_address1_city"): Xrm.StringControl | null;
    getControl(controlName: "address1_composite_compositionLinkControl_address1_country"): Xrm.StringControl | null;
    getControl(controlName: "address1_composite_compositionLinkControl_address1_line1"): Xrm.StringControl | null;
    getControl(controlName: "address1_composite_compositionLinkControl_address1_line2"): Xrm.StringControl | null;
    getControl(controlName: "address1_composite_compositionLinkControl_address1_line3"): Xrm.StringControl | null;
    getControl(controlName: "address1_composite_compositionLinkControl_address1_postalcode"): Xrm.StringControl | null;
    getControl(controlName: "address1_composite_compositionLinkControl_address1_stateorprovince"): Xrm.StringControl | null;
    getControl(controlName: "address1_latitude"): Xrm.NumberControl;
    getControl(controlName: "address1_longitude"): Xrm.NumberControl;
    getControl(controlName: "customertypecode"): Xrm.OptionSetControl<account_customertypecode>;
    getControl(controlName: "description"): Xrm.StringControl;
    getControl(controlName: "donotbulkemail"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "donotemail"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "donotfax"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "donotphone"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "donotpostalmail"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "fax"): Xrm.StringControl;
    getControl(controlName: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "industrycode"): Xrm.OptionSetControl<account_industrycode>;
    getControl(controlName: "mapcontrol"): Xrm.BaseControl;
    getControl(controlName: "msdyn_serviceterritory"): Xrm.LookupControl<"territory">;
    getControl(controlName: "name"): Xrm.StringControl;
    getControl(controlName: "name1"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "name2"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "name3"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "notescontrol"): Xrm.BaseControl;
    getControl(controlName: "ovs_legalname"): Xrm.StringControl;
    getControl(controlName: "ovs_naicscode"): Xrm.StringControl;
    getControl(controlName: "ownershipcode"): Xrm.OptionSetControl<account_ownershipcode>;
    getControl(controlName: "parentaccountid"): Xrm.LookupControl<"account">;
    getControl(controlName: "preferredcontactmethodcode"): Xrm.OptionSetControl<account_preferredcontactmethodcode>;
    getControl(controlName: "primarycontactid"): Xrm.LookupControl<"contact">;
    getControl(controlName: "telephone1"): Xrm.StringControl;
    getControl(controlName: "ts_country"): Xrm.LookupControl<"tc_country">;
    getControl(controlName: "ts_iatacode"): Xrm.StringControl;
    getControl(controlName: "ts_icaocode"): Xrm.StringControl;
    getControl(controlName: "ts_principaloperationtype"): Xrm.LookupControl<"ovs_operationtype">;
    getControl(controlName: "ts_securityplantype"): Xrm.OptionSetControl<ts_securityplantype>;
    getControl(controlName: "ts_stakeholderstatus"): Xrm.OptionSetControl<ts_stakeholderstatus>;
    getControl(controlName: "ts_statusdescription"): Xrm.StringControl;
    getControl(controlName: "ts_statusenddate"): Xrm.DateControl;
    getControl(controlName: "ts_statusstartdate"): Xrm.DateControl;
    getControl(controlName: "websiteurl"): Xrm.StringControl;
    getControl(controlName: string): undefined;
  }
}
