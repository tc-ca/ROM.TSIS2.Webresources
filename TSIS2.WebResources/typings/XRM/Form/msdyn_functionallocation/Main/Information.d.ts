declare namespace Form.msdyn_functionallocation.Main {
  namespace Information {
    namespace Tabs {
      interface AssetsAndLocationsTab extends Xrm.SectionCollectionBase {
        get(name: "AssetsAndLocationsSection"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface Operations extends Xrm.SectionCollectionBase {
        get(name: "Operations_section_4"): Xrm.PageSection;
        get(name: "tab_4_section_2"): Xrm.PageSection;
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
      interface properties_tab extends Xrm.SectionCollectionBase {
        get(name: "tab_4_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_3 extends Xrm.SectionCollectionBase {
        get(name: "AddressSection"): Xrm.PageSection;
        get(name: "_section_72"): Xrm.PageSection;
        get(name: "tab_3_section_1"): Xrm.PageSection;
        get(name: "tab_3_section_2"): Xrm.PageSection;
        get(name: "tab_3_section_7"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_6 extends Xrm.SectionCollectionBase {
        get(name: "tab_6_section_1"): Xrm.PageSection;
        get(name: "tab_6_section_2"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "msdyn_address1"): Xrm.Attribute<any>;
      get(name: "msdyn_address2"): Xrm.Attribute<string>;
      get(name: "msdyn_address3"): Xrm.Attribute<string>;
      get(name: "msdyn_addressname"): Xrm.Attribute<string>;
      get(name: "msdyn_city"): Xrm.Attribute<string>;
      get(name: "msdyn_country"): Xrm.Attribute<string>;
      get(name: "msdyn_latitude"): Xrm.NumberAttribute;
      get(name: "msdyn_longitude"): Xrm.NumberAttribute;
      get(name: "msdyn_name"): Xrm.Attribute<string>;
      get(name: "msdyn_parentfunctionallocation"): Xrm.LookupAttribute<"msdyn_functionallocation">;
      get(name: "msdyn_postalcode"): Xrm.Attribute<string>;
      get(name: "msdyn_stateorprovince"): Xrm.Attribute<string>;
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "ts_businessunit"): Xrm.Attribute<string>;
      get(name: "ts_class"): Xrm.OptionSetAttribute<ts_msdyn_functionallocation_ts_class>;
      get(name: "ts_country"): Xrm.LookupAttribute<"tc_country">;
      get(name: "ts_description"): Xrm.Attribute<string>;
      get(name: "ts_functionallocationnameenglish"): Xrm.Attribute<string>;
      get(name: "ts_functionallocationnamefrench"): Xrm.Attribute<string>;
      get(name: "ts_iatacode"): Xrm.Attribute<string>;
      get(name: "ts_icaocode"): Xrm.Attribute<string>;
      get(name: "ts_region"): Xrm.LookupAttribute<"territory">;
      get(name: "ts_sitestatus"): Xrm.OptionSetAttribute<ts_sitestatus>;
      get(name: "ts_sitetype"): Xrm.LookupAttribute<"ovs_sitetype">;
      get(name: "ts_statusenddate"): Xrm.DateAttribute;
      get(name: "ts_statusstartdate"): Xrm.DateAttribute;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "Files"): Xrm.SubGridControl<"ts_file">;
      get(name: "Operations"): Xrm.SubGridControl<"ovs_operation">;
      get(name: "PropertyLogsSubGrid"): Xrm.SubGridControl<"msdyn_propertylog">;
      get(name: "Subgrid_1"): Xrm.SubGridControl<"msdyn_functionallocation">;
      get(name: "Subgrid_2"): Xrm.SubGridControl<"msdyn_workorder">;
      get(name: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "msdyn_address1"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "msdyn_address2"): Xrm.StringControl;
      get(name: "msdyn_address3"): Xrm.StringControl;
      get(name: "msdyn_addressname"): Xrm.StringControl;
      get(name: "msdyn_city"): Xrm.StringControl;
      get(name: "msdyn_country"): Xrm.StringControl;
      get(name: "msdyn_latitude"): Xrm.NumberControl;
      get(name: "msdyn_longitude"): Xrm.NumberControl;
      get(name: "msdyn_name"): Xrm.StringControl;
      get(name: "msdyn_name1"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "msdyn_name2"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "msdyn_name3"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "msdyn_parentfunctionallocation"): Xrm.LookupControl<"msdyn_functionallocation">;
      get(name: "msdyn_postalcode"): Xrm.StringControl;
      get(name: "msdyn_stateorprovince"): Xrm.StringControl;
      get(name: "notescontrol"): Xrm.BaseControl;
      get(name: "ts_businessunit"): Xrm.StringControl;
      get(name: "ts_class"): Xrm.OptionSetControl<ts_msdyn_functionallocation_ts_class>;
      get(name: "ts_country"): Xrm.LookupControl<"tc_country">;
      get(name: "ts_description"): Xrm.StringControl;
      get(name: "ts_functionallocationnameenglish"): Xrm.StringControl;
      get(name: "ts_functionallocationnamefrench"): Xrm.StringControl;
      get(name: "ts_iatacode"): Xrm.StringControl;
      get(name: "ts_icaocode"): Xrm.StringControl;
      get(name: "ts_region"): Xrm.LookupControl<"territory">;
      get(name: "ts_sitestatus"): Xrm.OptionSetControl<ts_sitestatus>;
      get(name: "ts_sitetype"): Xrm.LookupControl<"ovs_sitetype">;
      get(name: "ts_statusenddate"): Xrm.DateControl;
      get(name: "ts_statusstartdate"): Xrm.DateControl;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "AssetsAndLocationsTab"): Xrm.PageTab<Tabs.AssetsAndLocationsTab>;
      get(name: "Operations"): Xrm.PageTab<Tabs.Operations>;
      get(name: "Work Orders"): Xrm.PageTab<Tabs.WorkOrders>;
      get(name: "properties_tab"): Xrm.PageTab<Tabs.properties_tab>;
      get(name: "tab_3"): Xrm.PageTab<Tabs.tab_3>;
      get(name: "tab_6"): Xrm.PageTab<Tabs.tab_6>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Information extends Xrm.PageBase<Information.Attributes,Information.Tabs,Information.Controls> {
    getAttribute(attributeName: "msdyn_address1"): Xrm.Attribute<any>;
    getAttribute(attributeName: "msdyn_address2"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_address3"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_addressname"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_city"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_country"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_latitude"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_longitude"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_parentfunctionallocation"): Xrm.LookupAttribute<"msdyn_functionallocation">;
    getAttribute(attributeName: "msdyn_postalcode"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_stateorprovince"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "ts_businessunit"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_class"): Xrm.OptionSetAttribute<ts_msdyn_functionallocation_ts_class>;
    getAttribute(attributeName: "ts_country"): Xrm.LookupAttribute<"tc_country">;
    getAttribute(attributeName: "ts_description"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_functionallocationnameenglish"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_functionallocationnamefrench"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_iatacode"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_icaocode"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_region"): Xrm.LookupAttribute<"territory">;
    getAttribute(attributeName: "ts_sitestatus"): Xrm.OptionSetAttribute<ts_sitestatus>;
    getAttribute(attributeName: "ts_sitetype"): Xrm.LookupAttribute<"ovs_sitetype">;
    getAttribute(attributeName: "ts_statusenddate"): Xrm.DateAttribute;
    getAttribute(attributeName: "ts_statusstartdate"): Xrm.DateAttribute;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "Files"): Xrm.SubGridControl<"ts_file">;
    getControl(controlName: "Operations"): Xrm.SubGridControl<"ovs_operation">;
    getControl(controlName: "PropertyLogsSubGrid"): Xrm.SubGridControl<"msdyn_propertylog">;
    getControl(controlName: "Subgrid_1"): Xrm.SubGridControl<"msdyn_functionallocation">;
    getControl(controlName: "Subgrid_2"): Xrm.SubGridControl<"msdyn_workorder">;
    getControl(controlName: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "msdyn_address1"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "msdyn_address2"): Xrm.StringControl;
    getControl(controlName: "msdyn_address3"): Xrm.StringControl;
    getControl(controlName: "msdyn_addressname"): Xrm.StringControl;
    getControl(controlName: "msdyn_city"): Xrm.StringControl;
    getControl(controlName: "msdyn_country"): Xrm.StringControl;
    getControl(controlName: "msdyn_latitude"): Xrm.NumberControl;
    getControl(controlName: "msdyn_longitude"): Xrm.NumberControl;
    getControl(controlName: "msdyn_name"): Xrm.StringControl;
    getControl(controlName: "msdyn_name1"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "msdyn_name2"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "msdyn_name3"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "msdyn_parentfunctionallocation"): Xrm.LookupControl<"msdyn_functionallocation">;
    getControl(controlName: "msdyn_postalcode"): Xrm.StringControl;
    getControl(controlName: "msdyn_stateorprovince"): Xrm.StringControl;
    getControl(controlName: "notescontrol"): Xrm.BaseControl;
    getControl(controlName: "ts_businessunit"): Xrm.StringControl;
    getControl(controlName: "ts_class"): Xrm.OptionSetControl<ts_msdyn_functionallocation_ts_class>;
    getControl(controlName: "ts_country"): Xrm.LookupControl<"tc_country">;
    getControl(controlName: "ts_description"): Xrm.StringControl;
    getControl(controlName: "ts_functionallocationnameenglish"): Xrm.StringControl;
    getControl(controlName: "ts_functionallocationnamefrench"): Xrm.StringControl;
    getControl(controlName: "ts_iatacode"): Xrm.StringControl;
    getControl(controlName: "ts_icaocode"): Xrm.StringControl;
    getControl(controlName: "ts_region"): Xrm.LookupControl<"territory">;
    getControl(controlName: "ts_sitestatus"): Xrm.OptionSetControl<ts_sitestatus>;
    getControl(controlName: "ts_sitetype"): Xrm.LookupControl<"ovs_sitetype">;
    getControl(controlName: "ts_statusenddate"): Xrm.DateControl;
    getControl(controlName: "ts_statusstartdate"): Xrm.DateControl;
    getControl(controlName: string): undefined;
  }
}
