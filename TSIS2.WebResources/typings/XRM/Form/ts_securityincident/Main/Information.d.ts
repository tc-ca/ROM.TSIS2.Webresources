declare namespace Form.ts_securityincident.Main {
  namespace Information {
    namespace Tabs {
      interface _99b378964f52417982963cc0e6722411 extends Xrm.SectionCollectionBase {
        get(name: "{99b37896-4f52-4179-8296-3cc0e6722411}_column_2_section_1"): Xrm.PageSection;
        get(name: "{99b37896-4f52-4179-8296-3cc0e6722411}_section_4"): Xrm.PageSection;
        get(name: "{99b37896-4f52-4179-8296-3cc0e6722411}_section_5"): Xrm.PageSection;
        get(name: "{b367a628-326f-4595-a30d-c42898223e7b}"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_2 extends Xrm.SectionCollectionBase {
        get(name: "tab_2_section_1"): Xrm.PageSection;
        get(name: "tab_2_section_4"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_3 extends Xrm.SectionCollectionBase {
        get(name: "tab_3_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_4 extends Xrm.SectionCollectionBase {
        get(name: "tab_4_section_1"): Xrm.PageSection;
        get(name: "tab_4_section_2"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "new_location"): Xrm.Attribute<string>;
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "ts_arrests"): Xrm.OptionSetAttribute<ts_arrestsknownorunknown>;
      get(name: "ts_arrestscount"): Xrm.NumberAttribute;
      get(name: "ts_arrestsdetails"): Xrm.Attribute<string>;
      get(name: "ts_degreesminutesseconds"): Xrm.Attribute<string>;
      get(name: "ts_delaystooperation"): Xrm.OptionSetAttribute<ts_delaystooperation>;
      get(name: "ts_delaystooperationtime"): Xrm.DateAttribute;
      get(name: "ts_injuries"): Xrm.OptionSetAttribute<ts_injuries>;
      get(name: "ts_latitude"): Xrm.NumberAttribute;
      get(name: "ts_locationcontext"): Xrm.Attribute<string>;
      get(name: "ts_locationtype"): Xrm.OptionSetAttribute<ts_locationtype>;
      get(name: "ts_longitude"): Xrm.NumberAttribute;
      get(name: "ts_milemarker"): Xrm.Attribute<string>;
      get(name: "ts_mode"): Xrm.OptionSetAttribute<ts_securityincidentmode>;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: "ts_owneroftherailwaylinetrack"): Xrm.Attribute<string>;
      get(name: "ts_province"): Xrm.LookupAttribute<"tc_province">;
      get(name: "ts_publicorprivatecrossing"): Xrm.OptionSetAttribute<ts_publicorprivatecrossing>;
      get(name: "ts_region"): Xrm.LookupAttribute<"territory">;
      get(name: "ts_ruralorurban"): Xrm.OptionSetAttribute<ts_ruralorurban>;
      get(name: "ts_securityincidenttype"): Xrm.LookupAttribute<"ts_securityincidenttype">;
      get(name: "ts_site"): Xrm.LookupAttribute<"msdyn_functionallocation">;
      get(name: "ts_stakeholder"): Xrm.LookupAttribute<"account">;
      get(name: "ts_stakeholderoperationtype"): Xrm.LookupAttribute<"ovs_operationtype">;
      get(name: "ts_statusofrailwayowner"): Xrm.OptionSetAttribute<ts_statusofrailwayowner>;
      get(name: "ts_subdivision"): Xrm.Attribute<string>;
      get(name: "ts_targetelement"): Xrm.LookupAttribute<"ts_targetelement">;
      get(name: "ts_tcomsid"): Xrm.Attribute<string>;
      get(name: "ts_tcomsofficer"): Xrm.Attribute<string>;
      get(name: "ts_yardorstationname"): Xrm.Attribute<string>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "Subgrid_new_1"): Xrm.SubGridControl<"contact">;
      get(name: "grid_doc"): Xrm.SubGridControl<"ts_file">;
      get(name: "grid_workorder"): Xrm.SubGridControl<"msdyn_workorder">;
      get(name: "new_location"): Xrm.StringControl;
      get(name: "notescontrol"): Xrm.BaseControl;
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "ts_arrests"): Xrm.OptionSetControl<ts_arrestsknownorunknown>;
      get(name: "ts_arrestscount"): Xrm.NumberControl;
      get(name: "ts_arrestsdetails"): Xrm.StringControl;
      get(name: "ts_degreesminutesseconds"): Xrm.StringControl;
      get(name: "ts_delaystooperation"): Xrm.OptionSetControl<ts_delaystooperation>;
      get(name: "ts_delaystooperationtime"): Xrm.DateControl;
      get(name: "ts_injuries"): Xrm.OptionSetControl<ts_injuries>;
      get(name: "ts_latitude"): Xrm.NumberControl;
      get(name: "ts_locationcontext"): Xrm.StringControl;
      get(name: "ts_locationtype"): Xrm.OptionSetControl<ts_locationtype>;
      get(name: "ts_longitude"): Xrm.NumberControl;
      get(name: "ts_milemarker"): Xrm.StringControl;
      get(name: "ts_mode"): Xrm.OptionSetControl<ts_securityincidentmode>;
      get(name: "ts_name"): Xrm.StringControl;
      get(name: "ts_owneroftherailwaylinetrack"): Xrm.StringControl;
      get(name: "ts_province"): Xrm.LookupControl<"tc_province">;
      get(name: "ts_publicorprivatecrossing"): Xrm.OptionSetControl<ts_publicorprivatecrossing>;
      get(name: "ts_region"): Xrm.LookupControl<"territory">;
      get(name: "ts_ruralorurban"): Xrm.OptionSetControl<ts_ruralorurban>;
      get(name: "ts_securityincidenttype"): Xrm.LookupControl<"ts_securityincidenttype">;
      get(name: "ts_site"): Xrm.LookupControl<"msdyn_functionallocation">;
      get(name: "ts_stakeholder"): Xrm.LookupControl<"account">;
      get(name: "ts_stakeholderoperationtype"): Xrm.LookupControl<"ovs_operationtype">;
      get(name: "ts_statusofrailwayowner"): Xrm.OptionSetControl<ts_statusofrailwayowner>;
      get(name: "ts_subdivision"): Xrm.StringControl;
      get(name: "ts_targetelement"): Xrm.LookupControl<"ts_targetelement">;
      get(name: "ts_tcomsid"): Xrm.StringControl;
      get(name: "ts_tcomsofficer"): Xrm.StringControl;
      get(name: "ts_yardorstationname"): Xrm.StringControl;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "{99b37896-4f52-4179-8296-3cc0e6722411}"): Xrm.PageTab<Tabs._99b378964f52417982963cc0e6722411>;
      get(name: "tab_2"): Xrm.PageTab<Tabs.tab_2>;
      get(name: "tab_3"): Xrm.PageTab<Tabs.tab_3>;
      get(name: "tab_4"): Xrm.PageTab<Tabs.tab_4>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Information extends Xrm.PageBase<Information.Attributes,Information.Tabs,Information.Controls> {
    getAttribute(attributeName: "new_location"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "ts_arrests"): Xrm.OptionSetAttribute<ts_arrestsknownorunknown>;
    getAttribute(attributeName: "ts_arrestscount"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_arrestsdetails"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_degreesminutesseconds"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_delaystooperation"): Xrm.OptionSetAttribute<ts_delaystooperation>;
    getAttribute(attributeName: "ts_delaystooperationtime"): Xrm.DateAttribute;
    getAttribute(attributeName: "ts_injuries"): Xrm.OptionSetAttribute<ts_injuries>;
    getAttribute(attributeName: "ts_latitude"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_locationcontext"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_locationtype"): Xrm.OptionSetAttribute<ts_locationtype>;
    getAttribute(attributeName: "ts_longitude"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_milemarker"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_mode"): Xrm.OptionSetAttribute<ts_securityincidentmode>;
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_owneroftherailwaylinetrack"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_province"): Xrm.LookupAttribute<"tc_province">;
    getAttribute(attributeName: "ts_publicorprivatecrossing"): Xrm.OptionSetAttribute<ts_publicorprivatecrossing>;
    getAttribute(attributeName: "ts_region"): Xrm.LookupAttribute<"territory">;
    getAttribute(attributeName: "ts_ruralorurban"): Xrm.OptionSetAttribute<ts_ruralorurban>;
    getAttribute(attributeName: "ts_securityincidenttype"): Xrm.LookupAttribute<"ts_securityincidenttype">;
    getAttribute(attributeName: "ts_site"): Xrm.LookupAttribute<"msdyn_functionallocation">;
    getAttribute(attributeName: "ts_stakeholder"): Xrm.LookupAttribute<"account">;
    getAttribute(attributeName: "ts_stakeholderoperationtype"): Xrm.LookupAttribute<"ovs_operationtype">;
    getAttribute(attributeName: "ts_statusofrailwayowner"): Xrm.OptionSetAttribute<ts_statusofrailwayowner>;
    getAttribute(attributeName: "ts_subdivision"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_targetelement"): Xrm.LookupAttribute<"ts_targetelement">;
    getAttribute(attributeName: "ts_tcomsid"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_tcomsofficer"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_yardorstationname"): Xrm.Attribute<string>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "Subgrid_new_1"): Xrm.SubGridControl<"contact">;
    getControl(controlName: "grid_doc"): Xrm.SubGridControl<"ts_file">;
    getControl(controlName: "grid_workorder"): Xrm.SubGridControl<"msdyn_workorder">;
    getControl(controlName: "new_location"): Xrm.StringControl;
    getControl(controlName: "notescontrol"): Xrm.BaseControl;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "ts_arrests"): Xrm.OptionSetControl<ts_arrestsknownorunknown>;
    getControl(controlName: "ts_arrestscount"): Xrm.NumberControl;
    getControl(controlName: "ts_arrestsdetails"): Xrm.StringControl;
    getControl(controlName: "ts_degreesminutesseconds"): Xrm.StringControl;
    getControl(controlName: "ts_delaystooperation"): Xrm.OptionSetControl<ts_delaystooperation>;
    getControl(controlName: "ts_delaystooperationtime"): Xrm.DateControl;
    getControl(controlName: "ts_injuries"): Xrm.OptionSetControl<ts_injuries>;
    getControl(controlName: "ts_latitude"): Xrm.NumberControl;
    getControl(controlName: "ts_locationcontext"): Xrm.StringControl;
    getControl(controlName: "ts_locationtype"): Xrm.OptionSetControl<ts_locationtype>;
    getControl(controlName: "ts_longitude"): Xrm.NumberControl;
    getControl(controlName: "ts_milemarker"): Xrm.StringControl;
    getControl(controlName: "ts_mode"): Xrm.OptionSetControl<ts_securityincidentmode>;
    getControl(controlName: "ts_name"): Xrm.StringControl;
    getControl(controlName: "ts_owneroftherailwaylinetrack"): Xrm.StringControl;
    getControl(controlName: "ts_province"): Xrm.LookupControl<"tc_province">;
    getControl(controlName: "ts_publicorprivatecrossing"): Xrm.OptionSetControl<ts_publicorprivatecrossing>;
    getControl(controlName: "ts_region"): Xrm.LookupControl<"territory">;
    getControl(controlName: "ts_ruralorurban"): Xrm.OptionSetControl<ts_ruralorurban>;
    getControl(controlName: "ts_securityincidenttype"): Xrm.LookupControl<"ts_securityincidenttype">;
    getControl(controlName: "ts_site"): Xrm.LookupControl<"msdyn_functionallocation">;
    getControl(controlName: "ts_stakeholder"): Xrm.LookupControl<"account">;
    getControl(controlName: "ts_stakeholderoperationtype"): Xrm.LookupControl<"ovs_operationtype">;
    getControl(controlName: "ts_statusofrailwayowner"): Xrm.OptionSetControl<ts_statusofrailwayowner>;
    getControl(controlName: "ts_subdivision"): Xrm.StringControl;
    getControl(controlName: "ts_targetelement"): Xrm.LookupControl<"ts_targetelement">;
    getControl(controlName: "ts_tcomsid"): Xrm.StringControl;
    getControl(controlName: "ts_tcomsofficer"): Xrm.StringControl;
    getControl(controlName: "ts_yardorstationname"): Xrm.StringControl;
    getControl(controlName: string): undefined;
  }
}
