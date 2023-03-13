declare namespace Form.ovs_operation.Main {
  namespace Information {
    namespace Tabs {
      interface WorkOrders extends Xrm.SectionCollectionBase {
        get(name: "tab_4_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface bb4b118ea1c94e04ae4d8c6a177ee56c extends Xrm.SectionCollectionBase {
        get(name: "Risk"): Xrm.PageSection;
        get(name: "_section_156"): Xrm.PageSection;
        get(name: "section_8"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface operation_activity_tab extends Xrm.SectionCollectionBase {
        get(name: "operation_activity_tab_section_3"): Xrm.PageSection;
        get(name: "tab_8_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_5 extends Xrm.SectionCollectionBase {
        get(name: "tab_5_section_1"): Xrm.PageSection;
        get(name: "tab_5_section_2"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_7 extends Xrm.SectionCollectionBase {
        get(name: "tab_7_Operation Contact"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_properties_avsec extends Xrm.SectionCollectionBase {
        get(name: "tab_avsec_properties_air_carrier_passenger"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_properties_isso extends Xrm.SectionCollectionBase {
        get(name: "is_security_inspection_site_section"): Xrm.PageSection;
        get(name: "tab_properties_ppeguide"): Xrm.PageSection;
        get(name: "tab_properties_section_4"): Xrm.PageSection;
        get(name: "tab_properties_section_5"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ovs_name"): Xrm.Attribute<string>;
      get(name: "ovs_operationtypeid"): Xrm.LookupAttribute<"ovs_operationtype">;
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "statecode"): Xrm.OptionSetAttribute<ovs_operation_statecode>;
      get(name: "ts_aviationsecuritytraining"): Xrm.Attribute<any>;
      get(name: "ts_cargo"): Xrm.Attribute<any>;
      get(name: "ts_cateringandstores"): Xrm.Attribute<any>;
      get(name: "ts_comments"): Xrm.Attribute<string>;
      get(name: "ts_dateoflastcomprehensiveinspection"): Xrm.DateAttribute;
      get(name: "ts_dateoflastriskbasedinspection"): Xrm.DateAttribute;
      get(name: "ts_dateoflastsecurityplanreview"): Xrm.DateAttribute;
      get(name: "ts_description"): Xrm.Attribute<string>;
      get(name: "ts_domesticflights"): Xrm.Attribute<any>;
      get(name: "ts_internationalflights"): Xrm.Attribute<any>;
      get(name: "ts_internationalprogramsbranchipb"): Xrm.Attribute<any>;
      get(name: "ts_issecurityinspectionsite"): Xrm.OptionSetAttribute<ts_issecurityinspectionsite>;
      get(name: "ts_mail"): Xrm.Attribute<any>;
      get(name: "ts_operationalstatus"): Xrm.OptionSetAttribute<ts_operationalstatus>;
      get(name: "ts_operationfrequency"): Xrm.LookupAttribute<"ts_operationfrequency">;
      get(name: "ts_opi"): Xrm.Attribute<any>;
      get(name: "ts_opiteam"): Xrm.LookupAttribute<"team">;
      get(name: "ts_oss"): Xrm.Attribute<any>;
      get(name: "ts_planningstatus"): Xrm.OptionSetAttribute<ts_planningstatus>;
      get(name: "ts_ppecategories"): Xrm.MultiSelectOptionSetAttribute<ts_ppecategories>;
      get(name: "ts_ppeguide"): Xrm.Attribute<any>;
      get(name: "ts_pperequired"): Xrm.OptionSetAttribute<boolean>;
      get(name: "ts_risk"): Xrm.LookupAttribute<"ts_riskcategory">;
      get(name: "ts_riskscore"): Xrm.NumberAttribute;
      get(name: "ts_ron"): Xrm.Attribute<any>;
      get(name: "ts_securityinspectiondetails"): Xrm.OptionSetAttribute<ts_securityinspectiondetails>;
      get(name: "ts_site"): Xrm.LookupAttribute<"msdyn_functionallocation">;
      get(name: "ts_specializedpperequired"): Xrm.OptionSetAttribute<boolean>;
      get(name: "ts_stakeholder"): Xrm.LookupAttribute<"account">;
      get(name: "ts_stationtype"): Xrm.OptionSetAttribute<ts_stationtype>;
      get(name: "ts_statusenddate"): Xrm.DateAttribute;
      get(name: "ts_statusstartdate"): Xrm.DateAttribute;
      get(name: "ts_subsite"): Xrm.LookupAttribute<"msdyn_functionallocation">;
      get(name: "ts_subsubsite"): Xrm.LookupAttribute<"msdyn_functionallocation">;
      get(name: "ts_transborderflights"): Xrm.Attribute<any>;
      get(name: "ts_typeofdangerousgoods"): Xrm.OptionSetAttribute<ts_typeofdangerousgoods>;
      get(name: "ts_typesofspecializedppe"): Xrm.MultiSelectOptionSetAttribute<ts_typesofspecializedppe>;
      get(name: "ts_unattendedaircraft"): Xrm.Attribute<any>;
      get(name: "ts_visualsecurityinspection"): Xrm.OptionSetAttribute<ts_visualsecurityinspection>;
      get(name: "ts_visualsecurityinspectiondetails"): Xrm.OptionSetAttribute<ts_visualsecurityinspectiondetails>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "Files"): Xrm.SubGridControl<"ts_file">;
      get(name: "Subgrid_Operation_Contacts"): Xrm.SubGridControl<"ts_operationcontact">;
      get(name: "WebResource_PPEGuide"): Xrm.WebResourceControl;
      get(name: "WorkOrders"): Xrm.SubGridControl<"msdyn_workorder">;
      get(name: "header_ovs_operationtypeid"): Xrm.LookupControl<"ovs_operationtype">;
      get(name: "header_ts_site"): Xrm.LookupControl<"msdyn_functionallocation">;
      get(name: "header_ts_stakeholder"): Xrm.LookupControl<"account">;
      get(name: "notescontrol"): Xrm.BaseControl;
      get(name: "notescontrol1"): Xrm.BaseControl;
      get(name: "operation_activity_grid"): Xrm.BaseControl;
      get(name: "ovs_name"): Xrm.StringControl;
      get(name: "ovs_operationtypeid"): Xrm.LookupControl<"ovs_operationtype">;
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "statecode"): Xrm.OptionSetControl<ovs_operation_statecode>;
      get(name: "ts_aviationsecuritytraining"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "ts_cargo"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "ts_cateringandstores"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "ts_comments"): Xrm.StringControl;
      get(name: "ts_dateoflastcomprehensiveinspection"): Xrm.DateControl;
      get(name: "ts_dateoflastriskbasedinspection"): Xrm.DateControl;
      get(name: "ts_dateoflastsecurityplanreview"): Xrm.DateControl;
      get(name: "ts_description"): Xrm.StringControl;
      get(name: "ts_domesticflights"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "ts_internationalflights"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "ts_internationalprogramsbranchipb"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "ts_issecurityinspectionsite"): Xrm.OptionSetControl<ts_issecurityinspectionsite>;
      get(name: "ts_mail"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "ts_operationalstatus"): Xrm.OptionSetControl<ts_operationalstatus>;
      get(name: "ts_operationalstatus1"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "ts_operationfrequency"): Xrm.LookupControl<"ts_operationfrequency">;
      get(name: "ts_opi"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "ts_opiteam"): Xrm.LookupControl<"team">;
      get(name: "ts_oss"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "ts_planningstatus"): Xrm.OptionSetControl<ts_planningstatus>;
      get(name: "ts_ppecategories"): Xrm.MultiSelectOptionSetControl<ts_ppecategories>;
      get(name: "ts_ppeguide"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "ts_pperequired"): Xrm.OptionSetControl<boolean>;
      get(name: "ts_risk"): Xrm.LookupControl<"ts_riskcategory">;
      get(name: "ts_riskscore"): Xrm.NumberControl;
      get(name: "ts_ron"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "ts_securityinspectiondetails"): Xrm.OptionSetControl<ts_securityinspectiondetails>;
      get(name: "ts_site"): Xrm.LookupControl<"msdyn_functionallocation">;
      get(name: "ts_specializedpperequired"): Xrm.OptionSetControl<boolean>;
      get(name: "ts_stakeholder"): Xrm.LookupControl<"account">;
      get(name: "ts_stationtype"): Xrm.OptionSetControl<ts_stationtype>;
      get(name: "ts_statusenddate"): Xrm.DateControl;
      get(name: "ts_statusstartdate"): Xrm.DateControl;
      get(name: "ts_subsite"): Xrm.LookupControl<"msdyn_functionallocation">;
      get(name: "ts_subsubsite"): Xrm.LookupControl<"msdyn_functionallocation">;
      get(name: "ts_transborderflights"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "ts_typeofdangerousgoods"): Xrm.OptionSetControl<ts_typeofdangerousgoods>;
      get(name: "ts_typesofspecializedppe"): Xrm.MultiSelectOptionSetControl<ts_typesofspecializedppe>;
      get(name: "ts_unattendedaircraft"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "ts_visualsecurityinspection"): Xrm.OptionSetControl<ts_visualsecurityinspection>;
      get(name: "ts_visualsecurityinspectiondetails"): Xrm.OptionSetControl<ts_visualsecurityinspectiondetails>;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "WorkOrders"): Xrm.PageTab<Tabs.WorkOrders>;
      get(name: "{bb4b118e-a1c9-4e04-ae4d-8c6a177ee56c}"): Xrm.PageTab<Tabs.bb4b118ea1c94e04ae4d8c6a177ee56c>;
      get(name: "operation_activity_tab"): Xrm.PageTab<Tabs.operation_activity_tab>;
      get(name: "tab_5"): Xrm.PageTab<Tabs.tab_5>;
      get(name: "tab_7"): Xrm.PageTab<Tabs.tab_7>;
      get(name: "tab_properties_avsec"): Xrm.PageTab<Tabs.tab_properties_avsec>;
      get(name: "tab_properties_isso"): Xrm.PageTab<Tabs.tab_properties_isso>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Information extends Xrm.PageBase<Information.Attributes,Information.Tabs,Information.Controls> {
    getAttribute(attributeName: "ovs_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ovs_operationtypeid"): Xrm.LookupAttribute<"ovs_operationtype">;
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "statecode"): Xrm.OptionSetAttribute<ovs_operation_statecode>;
    getAttribute(attributeName: "ts_aviationsecuritytraining"): Xrm.Attribute<any>;
    getAttribute(attributeName: "ts_cargo"): Xrm.Attribute<any>;
    getAttribute(attributeName: "ts_cateringandstores"): Xrm.Attribute<any>;
    getAttribute(attributeName: "ts_comments"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_dateoflastcomprehensiveinspection"): Xrm.DateAttribute;
    getAttribute(attributeName: "ts_dateoflastriskbasedinspection"): Xrm.DateAttribute;
    getAttribute(attributeName: "ts_dateoflastsecurityplanreview"): Xrm.DateAttribute;
    getAttribute(attributeName: "ts_description"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_domesticflights"): Xrm.Attribute<any>;
    getAttribute(attributeName: "ts_internationalflights"): Xrm.Attribute<any>;
    getAttribute(attributeName: "ts_internationalprogramsbranchipb"): Xrm.Attribute<any>;
    getAttribute(attributeName: "ts_issecurityinspectionsite"): Xrm.OptionSetAttribute<ts_issecurityinspectionsite>;
    getAttribute(attributeName: "ts_mail"): Xrm.Attribute<any>;
    getAttribute(attributeName: "ts_operationalstatus"): Xrm.OptionSetAttribute<ts_operationalstatus>;
    getAttribute(attributeName: "ts_operationfrequency"): Xrm.LookupAttribute<"ts_operationfrequency">;
    getAttribute(attributeName: "ts_opi"): Xrm.Attribute<any>;
    getAttribute(attributeName: "ts_opiteam"): Xrm.LookupAttribute<"team">;
    getAttribute(attributeName: "ts_oss"): Xrm.Attribute<any>;
    getAttribute(attributeName: "ts_planningstatus"): Xrm.OptionSetAttribute<ts_planningstatus>;
    getAttribute(attributeName: "ts_ppecategories"): Xrm.MultiSelectOptionSetAttribute<ts_ppecategories>;
    getAttribute(attributeName: "ts_ppeguide"): Xrm.Attribute<any>;
    getAttribute(attributeName: "ts_pperequired"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "ts_risk"): Xrm.LookupAttribute<"ts_riskcategory">;
    getAttribute(attributeName: "ts_riskscore"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_ron"): Xrm.Attribute<any>;
    getAttribute(attributeName: "ts_securityinspectiondetails"): Xrm.OptionSetAttribute<ts_securityinspectiondetails>;
    getAttribute(attributeName: "ts_site"): Xrm.LookupAttribute<"msdyn_functionallocation">;
    getAttribute(attributeName: "ts_specializedpperequired"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "ts_stakeholder"): Xrm.LookupAttribute<"account">;
    getAttribute(attributeName: "ts_stationtype"): Xrm.OptionSetAttribute<ts_stationtype>;
    getAttribute(attributeName: "ts_statusenddate"): Xrm.DateAttribute;
    getAttribute(attributeName: "ts_statusstartdate"): Xrm.DateAttribute;
    getAttribute(attributeName: "ts_subsite"): Xrm.LookupAttribute<"msdyn_functionallocation">;
    getAttribute(attributeName: "ts_subsubsite"): Xrm.LookupAttribute<"msdyn_functionallocation">;
    getAttribute(attributeName: "ts_transborderflights"): Xrm.Attribute<any>;
    getAttribute(attributeName: "ts_typeofdangerousgoods"): Xrm.OptionSetAttribute<ts_typeofdangerousgoods>;
    getAttribute(attributeName: "ts_typesofspecializedppe"): Xrm.MultiSelectOptionSetAttribute<ts_typesofspecializedppe>;
    getAttribute(attributeName: "ts_unattendedaircraft"): Xrm.Attribute<any>;
    getAttribute(attributeName: "ts_visualsecurityinspection"): Xrm.OptionSetAttribute<ts_visualsecurityinspection>;
    getAttribute(attributeName: "ts_visualsecurityinspectiondetails"): Xrm.OptionSetAttribute<ts_visualsecurityinspectiondetails>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "Files"): Xrm.SubGridControl<"ts_file">;
    getControl(controlName: "Subgrid_Operation_Contacts"): Xrm.SubGridControl<"ts_operationcontact">;
    getControl(controlName: "WebResource_PPEGuide"): Xrm.WebResourceControl;
    getControl(controlName: "WorkOrders"): Xrm.SubGridControl<"msdyn_workorder">;
    getControl(controlName: "header_ovs_operationtypeid"): Xrm.LookupControl<"ovs_operationtype">;
    getControl(controlName: "header_ts_site"): Xrm.LookupControl<"msdyn_functionallocation">;
    getControl(controlName: "header_ts_stakeholder"): Xrm.LookupControl<"account">;
    getControl(controlName: "notescontrol"): Xrm.BaseControl;
    getControl(controlName: "notescontrol1"): Xrm.BaseControl;
    getControl(controlName: "operation_activity_grid"): Xrm.BaseControl;
    getControl(controlName: "ovs_name"): Xrm.StringControl;
    getControl(controlName: "ovs_operationtypeid"): Xrm.LookupControl<"ovs_operationtype">;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "statecode"): Xrm.OptionSetControl<ovs_operation_statecode>;
    getControl(controlName: "ts_aviationsecuritytraining"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "ts_cargo"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "ts_cateringandstores"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "ts_comments"): Xrm.StringControl;
    getControl(controlName: "ts_dateoflastcomprehensiveinspection"): Xrm.DateControl;
    getControl(controlName: "ts_dateoflastriskbasedinspection"): Xrm.DateControl;
    getControl(controlName: "ts_dateoflastsecurityplanreview"): Xrm.DateControl;
    getControl(controlName: "ts_description"): Xrm.StringControl;
    getControl(controlName: "ts_domesticflights"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "ts_internationalflights"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "ts_internationalprogramsbranchipb"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "ts_issecurityinspectionsite"): Xrm.OptionSetControl<ts_issecurityinspectionsite>;
    getControl(controlName: "ts_mail"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "ts_operationalstatus"): Xrm.OptionSetControl<ts_operationalstatus>;
    getControl(controlName: "ts_operationalstatus1"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "ts_operationfrequency"): Xrm.LookupControl<"ts_operationfrequency">;
    getControl(controlName: "ts_opi"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "ts_opiteam"): Xrm.LookupControl<"team">;
    getControl(controlName: "ts_oss"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "ts_planningstatus"): Xrm.OptionSetControl<ts_planningstatus>;
    getControl(controlName: "ts_ppecategories"): Xrm.MultiSelectOptionSetControl<ts_ppecategories>;
    getControl(controlName: "ts_ppeguide"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "ts_pperequired"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "ts_risk"): Xrm.LookupControl<"ts_riskcategory">;
    getControl(controlName: "ts_riskscore"): Xrm.NumberControl;
    getControl(controlName: "ts_ron"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "ts_securityinspectiondetails"): Xrm.OptionSetControl<ts_securityinspectiondetails>;
    getControl(controlName: "ts_site"): Xrm.LookupControl<"msdyn_functionallocation">;
    getControl(controlName: "ts_specializedpperequired"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "ts_stakeholder"): Xrm.LookupControl<"account">;
    getControl(controlName: "ts_stationtype"): Xrm.OptionSetControl<ts_stationtype>;
    getControl(controlName: "ts_statusenddate"): Xrm.DateControl;
    getControl(controlName: "ts_statusstartdate"): Xrm.DateControl;
    getControl(controlName: "ts_subsite"): Xrm.LookupControl<"msdyn_functionallocation">;
    getControl(controlName: "ts_subsubsite"): Xrm.LookupControl<"msdyn_functionallocation">;
    getControl(controlName: "ts_transborderflights"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "ts_typeofdangerousgoods"): Xrm.OptionSetControl<ts_typeofdangerousgoods>;
    getControl(controlName: "ts_typesofspecializedppe"): Xrm.MultiSelectOptionSetControl<ts_typesofspecializedppe>;
    getControl(controlName: "ts_unattendedaircraft"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "ts_visualsecurityinspection"): Xrm.OptionSetControl<ts_visualsecurityinspection>;
    getControl(controlName: "ts_visualsecurityinspectiondetails"): Xrm.OptionSetControl<ts_visualsecurityinspectiondetails>;
    getControl(controlName: string): undefined;
  }
}
