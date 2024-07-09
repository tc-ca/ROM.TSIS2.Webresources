declare namespace Form.ts_site.Main {
  namespace Information {
    namespace Tabs {
      interface AssetsAndLocationsTab extends Xrm.SectionCollectionBase {
        get(name: "tab_7_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface Cases extends Xrm.SectionCollectionBase {
        get(name: "tab_4_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface Findings extends Xrm.SectionCollectionBase {
        get(name: "tab_5_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface LocationPropertiesTab extends Xrm.SectionCollectionBase {
        get(name: "tab_6_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface Operations extends Xrm.SectionCollectionBase {
        get(name: "tab_2_section_1"): Xrm.PageSection;
        get(name: "tab_2_section_2"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface SiteVisit extends Xrm.SectionCollectionBase {
        get(name: "tab_8_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface WorkOrders extends Xrm.SectionCollectionBase {
        get(name: "tab_3_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface _2830e9845f1644f8b41e75c3afb14f2c extends Xrm.SectionCollectionBase {
        get(name: "{2830e984-5f16-44f8-b41e-75c3afb14f2c}_section_2"): Xrm.PageSection;
        get(name: "{2830e984-5f16-44f8-b41e-75c3afb14f2c}_section_3"): Xrm.PageSection;
        get(name: "{2830e984-5f16-44f8-b41e-75c3afb14f2c}_section_4"): Xrm.PageSection;
        get(name: "{2830e984-5f16-44f8-b41e-75c3afb14f2c}_section_5"): Xrm.PageSection;
        get(name: "{2830e984-5f16-44f8-b41e-75c3afb14f2c}_section_6"): Xrm.PageSection;
        get(name: "{636d9ac3-013c-47fb-8c6b-fe3f91c7773b}"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "ts_address1"): Xrm.Attribute<string>;
      get(name: "ts_address2"): Xrm.Attribute<string>;
      get(name: "ts_address3"): Xrm.Attribute<string>;
      get(name: "ts_addressname"): Xrm.Attribute<string>;
      get(name: "ts_alias1"): Xrm.Attribute<string>;
      get(name: "ts_alias2"): Xrm.Attribute<string>;
      get(name: "ts_alias3"): Xrm.Attribute<string>;
      get(name: "ts_alias4"): Xrm.Attribute<string>;
      get(name: "ts_alias5"): Xrm.Attribute<string>;
      get(name: "ts_businessunit"): Xrm.Attribute<string>;
      get(name: "ts_city"): Xrm.Attribute<string>;
      get(name: "ts_class"): Xrm.OptionSetAttribute<ts_ts_site_ts_class>;
      get(name: "ts_costcenter"): Xrm.Attribute<string>;
      get(name: "ts_country"): Xrm.LookupAttribute<"tc_country">;
      get(name: "ts_countryregion"): Xrm.Attribute<string>;
      get(name: "ts_description"): Xrm.Attribute<string>;
      get(name: "ts_emailaddress"): Xrm.Attribute<string>;
      get(name: "ts_functionallocationnameenglish"): Xrm.Attribute<string>;
      get(name: "ts_functionallocationnamefrench"): Xrm.Attribute<string>;
      get(name: "ts_iatacode"): Xrm.Attribute<string>;
      get(name: "ts_icaocode"): Xrm.Attribute<string>;
      get(name: "ts_latitude"): Xrm.NumberAttribute;
      get(name: "ts_locationopendate"): Xrm.DateAttribute;
      get(name: "ts_longitude"): Xrm.NumberAttribute;
      get(name: "ts_lpdtounitedstates"): Xrm.OptionSetAttribute<boolean>;
      get(name: "ts_mode"): Xrm.MultiSelectOptionSetAttribute<ts_securityincidentmode>;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: "ts_parentfunctionallocation"): Xrm.LookupAttribute<"ts_site">;
      get(name: "ts_postalcode"): Xrm.Attribute<string>;
      get(name: "ts_primarytimezone"): Xrm.Attribute<any>;
      get(name: "ts_region"): Xrm.LookupAttribute<"territory">;
      get(name: "ts_riskscore"): Xrm.NumberAttribute;
      get(name: "ts_shortname"): Xrm.Attribute<string>;
      get(name: "ts_sitestatus"): Xrm.OptionSetAttribute<ts_sitestatus>;
      get(name: "ts_sitetype"): Xrm.LookupAttribute<"ovs_sitetype">;
      get(name: "ts_sitetype2"): Xrm.LookupAttribute<"ovs_sitetype">;
      get(name: "ts_sitetype3"): Xrm.LookupAttribute<"ovs_sitetype">;
      get(name: "ts_stateorprovince"): Xrm.Attribute<string>;
      get(name: "ts_statusenddate"): Xrm.DateAttribute;
      get(name: "ts_statusstartdate"): Xrm.DateAttribute;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "Subgrid_1"): Xrm.SubGridControl<"ts_site">;
      get(name: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "notescontrol"): Xrm.BaseControl;
      get(name: "ts_address1"): Xrm.StringControl;
      get(name: "ts_address2"): Xrm.StringControl;
      get(name: "ts_address3"): Xrm.StringControl;
      get(name: "ts_addressname"): Xrm.StringControl;
      get(name: "ts_alias1"): Xrm.StringControl;
      get(name: "ts_alias2"): Xrm.StringControl;
      get(name: "ts_alias3"): Xrm.StringControl;
      get(name: "ts_alias4"): Xrm.StringControl;
      get(name: "ts_alias5"): Xrm.StringControl;
      get(name: "ts_businessunit"): Xrm.StringControl;
      get(name: "ts_city"): Xrm.StringControl;
      get(name: "ts_class"): Xrm.OptionSetControl<ts_ts_site_ts_class>;
      get(name: "ts_costcenter"): Xrm.StringControl;
      get(name: "ts_country"): Xrm.LookupControl<"tc_country">;
      get(name: "ts_countryregion"): Xrm.StringControl;
      get(name: "ts_description"): Xrm.StringControl;
      get(name: "ts_emailaddress"): Xrm.StringControl;
      get(name: "ts_functionallocationnameenglish"): Xrm.StringControl;
      get(name: "ts_functionallocationnamefrench"): Xrm.StringControl;
      get(name: "ts_iatacode"): Xrm.StringControl;
      get(name: "ts_icaocode"): Xrm.StringControl;
      get(name: "ts_latitude"): Xrm.NumberControl;
      get(name: "ts_locationopendate"): Xrm.DateControl;
      get(name: "ts_longitude"): Xrm.NumberControl;
      get(name: "ts_lpdtounitedstates"): Xrm.OptionSetControl<boolean>;
      get(name: "ts_mode"): Xrm.MultiSelectOptionSetControl<ts_securityincidentmode>;
      get(name: "ts_name"): Xrm.StringControl;
      get(name: "ts_name1"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "ts_parentfunctionallocation"): Xrm.LookupControl<"ts_site">;
      get(name: "ts_parentfunctionallocation1"): Xrm.LookupControl<"ts_site">;
      get(name: "ts_postalcode"): Xrm.StringControl;
      get(name: "ts_primarytimezone"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "ts_region"): Xrm.LookupControl<"territory">;
      get(name: "ts_riskscore"): Xrm.NumberControl;
      get(name: "ts_shortname"): Xrm.StringControl;
      get(name: "ts_sitestatus"): Xrm.OptionSetControl<ts_sitestatus>;
      get(name: "ts_sitetype"): Xrm.LookupControl<"ovs_sitetype">;
      get(name: "ts_sitetype2"): Xrm.LookupControl<"ovs_sitetype">;
      get(name: "ts_sitetype3"): Xrm.LookupControl<"ovs_sitetype">;
      get(name: "ts_stateorprovince"): Xrm.StringControl;
      get(name: "ts_statusenddate"): Xrm.DateControl;
      get(name: "ts_statusstartdate"): Xrm.DateControl;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "AssetsAndLocationsTab"): Xrm.PageTab<Tabs.AssetsAndLocationsTab>;
      get(name: "Cases"): Xrm.PageTab<Tabs.Cases>;
      get(name: "Findings"): Xrm.PageTab<Tabs.Findings>;
      get(name: "LocationPropertiesTab"): Xrm.PageTab<Tabs.LocationPropertiesTab>;
      get(name: "Operations"): Xrm.PageTab<Tabs.Operations>;
      get(name: "Site Visit"): Xrm.PageTab<Tabs.SiteVisit>;
      get(name: "Work Orders"): Xrm.PageTab<Tabs.WorkOrders>;
      get(name: "{2830e984-5f16-44f8-b41e-75c3afb14f2c}"): Xrm.PageTab<Tabs._2830e9845f1644f8b41e75c3afb14f2c>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Information extends Xrm.PageBase<Information.Attributes,Information.Tabs,Information.Controls> {
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "ts_address1"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_address2"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_address3"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_addressname"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_alias1"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_alias2"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_alias3"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_alias4"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_alias5"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_businessunit"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_city"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_class"): Xrm.OptionSetAttribute<ts_ts_site_ts_class>;
    getAttribute(attributeName: "ts_costcenter"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_country"): Xrm.LookupAttribute<"tc_country">;
    getAttribute(attributeName: "ts_countryregion"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_description"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_emailaddress"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_functionallocationnameenglish"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_functionallocationnamefrench"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_iatacode"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_icaocode"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_latitude"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_locationopendate"): Xrm.DateAttribute;
    getAttribute(attributeName: "ts_longitude"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_lpdtounitedstates"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "ts_mode"): Xrm.MultiSelectOptionSetAttribute<ts_securityincidentmode>;
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_parentfunctionallocation"): Xrm.LookupAttribute<"ts_site">;
    getAttribute(attributeName: "ts_postalcode"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_primarytimezone"): Xrm.Attribute<any>;
    getAttribute(attributeName: "ts_region"): Xrm.LookupAttribute<"territory">;
    getAttribute(attributeName: "ts_riskscore"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_shortname"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_sitestatus"): Xrm.OptionSetAttribute<ts_sitestatus>;
    getAttribute(attributeName: "ts_sitetype"): Xrm.LookupAttribute<"ovs_sitetype">;
    getAttribute(attributeName: "ts_sitetype2"): Xrm.LookupAttribute<"ovs_sitetype">;
    getAttribute(attributeName: "ts_sitetype3"): Xrm.LookupAttribute<"ovs_sitetype">;
    getAttribute(attributeName: "ts_stateorprovince"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_statusenddate"): Xrm.DateAttribute;
    getAttribute(attributeName: "ts_statusstartdate"): Xrm.DateAttribute;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "Subgrid_1"): Xrm.SubGridControl<"ts_site">;
    getControl(controlName: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "notescontrol"): Xrm.BaseControl;
    getControl(controlName: "ts_address1"): Xrm.StringControl;
    getControl(controlName: "ts_address2"): Xrm.StringControl;
    getControl(controlName: "ts_address3"): Xrm.StringControl;
    getControl(controlName: "ts_addressname"): Xrm.StringControl;
    getControl(controlName: "ts_alias1"): Xrm.StringControl;
    getControl(controlName: "ts_alias2"): Xrm.StringControl;
    getControl(controlName: "ts_alias3"): Xrm.StringControl;
    getControl(controlName: "ts_alias4"): Xrm.StringControl;
    getControl(controlName: "ts_alias5"): Xrm.StringControl;
    getControl(controlName: "ts_businessunit"): Xrm.StringControl;
    getControl(controlName: "ts_city"): Xrm.StringControl;
    getControl(controlName: "ts_class"): Xrm.OptionSetControl<ts_ts_site_ts_class>;
    getControl(controlName: "ts_costcenter"): Xrm.StringControl;
    getControl(controlName: "ts_country"): Xrm.LookupControl<"tc_country">;
    getControl(controlName: "ts_countryregion"): Xrm.StringControl;
    getControl(controlName: "ts_description"): Xrm.StringControl;
    getControl(controlName: "ts_emailaddress"): Xrm.StringControl;
    getControl(controlName: "ts_functionallocationnameenglish"): Xrm.StringControl;
    getControl(controlName: "ts_functionallocationnamefrench"): Xrm.StringControl;
    getControl(controlName: "ts_iatacode"): Xrm.StringControl;
    getControl(controlName: "ts_icaocode"): Xrm.StringControl;
    getControl(controlName: "ts_latitude"): Xrm.NumberControl;
    getControl(controlName: "ts_locationopendate"): Xrm.DateControl;
    getControl(controlName: "ts_longitude"): Xrm.NumberControl;
    getControl(controlName: "ts_lpdtounitedstates"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "ts_mode"): Xrm.MultiSelectOptionSetControl<ts_securityincidentmode>;
    getControl(controlName: "ts_name"): Xrm.StringControl;
    getControl(controlName: "ts_name1"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "ts_parentfunctionallocation"): Xrm.LookupControl<"ts_site">;
    getControl(controlName: "ts_parentfunctionallocation1"): Xrm.LookupControl<"ts_site">;
    getControl(controlName: "ts_postalcode"): Xrm.StringControl;
    getControl(controlName: "ts_primarytimezone"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "ts_region"): Xrm.LookupControl<"territory">;
    getControl(controlName: "ts_riskscore"): Xrm.NumberControl;
    getControl(controlName: "ts_shortname"): Xrm.StringControl;
    getControl(controlName: "ts_sitestatus"): Xrm.OptionSetControl<ts_sitestatus>;
    getControl(controlName: "ts_sitetype"): Xrm.LookupControl<"ovs_sitetype">;
    getControl(controlName: "ts_sitetype2"): Xrm.LookupControl<"ovs_sitetype">;
    getControl(controlName: "ts_sitetype3"): Xrm.LookupControl<"ovs_sitetype">;
    getControl(controlName: "ts_stateorprovince"): Xrm.StringControl;
    getControl(controlName: "ts_statusenddate"): Xrm.DateControl;
    getControl(controlName: "ts_statusstartdate"): Xrm.DateControl;
    getControl(controlName: string): undefined;
  }
}
