declare namespace Form.msdyn_workorderincident.Main {
  namespace Information {
    namespace Tabs {
      interface f1tab_resolution extends Xrm.SectionCollectionBase {
        get(name: "tab_3_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_7 extends Xrm.SectionCollectionBase {
        get(name: "tab_7_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_8 extends Xrm.SectionCollectionBase {
        get(name: "tab_8_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface workorderproductstab extends Xrm.SectionCollectionBase {
        get(name: "workorderproductssection"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface workorderservicestab extends Xrm.SectionCollectionBase {
        get(name: "workorderservicessection"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface workorderservicetaskstab extends Xrm.SectionCollectionBase {
        get(name: "workorderservicetasksection"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "msdyn_agreementbookingincident"): Xrm.LookupAttribute<"msdyn_agreementbookingincident">;
      get(name: "msdyn_customerasset"): Xrm.LookupAttribute<"msdyn_customerasset">;
      get(name: "msdyn_description"): Xrm.Attribute<string>;
      get(name: "msdyn_estimatedduration"): Xrm.NumberAttribute;
      get(name: "msdyn_functionallocation"): Xrm.LookupAttribute<"msdyn_functionallocation">;
      get(name: "msdyn_incidentresolved"): Xrm.OptionSetAttribute<boolean>;
      get(name: "msdyn_incidenttype"): Xrm.LookupAttribute<"msdyn_incidenttype">;
      get(name: "msdyn_isprimary"): Xrm.OptionSetAttribute<boolean>;
      get(name: "msdyn_itemspopulated"): Xrm.OptionSetAttribute<boolean>;
      get(name: "msdyn_name"): Xrm.Attribute<string>;
      get(name: "msdyn_taskspercentcompleted"): Xrm.NumberAttribute;
      get(name: "msdyn_workorder"): Xrm.LookupAttribute<"msdyn_workorder">;
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "statecode"): Xrm.OptionSetAttribute<msdyn_workorderincident_statecode>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "footer_statecode"): Xrm.OptionSetControl<msdyn_workorderincident_statecode>;
      get(name: "msdyn_agreementbookingincident"): Xrm.LookupControl<"msdyn_agreementbookingincident">;
      get(name: "msdyn_customerasset"): Xrm.LookupControl<"msdyn_customerasset">;
      get(name: "msdyn_description"): Xrm.StringControl;
      get(name: "msdyn_description1"): Xrm.StringControl;
      get(name: "msdyn_estimatedduration"): Xrm.NumberControl;
      get(name: "msdyn_functionallocation"): Xrm.LookupControl<"msdyn_functionallocation">;
      get(name: "msdyn_incidentresolved"): Xrm.OptionSetControl<boolean>;
      get(name: "msdyn_incidenttype"): Xrm.LookupControl<"msdyn_incidenttype">;
      get(name: "msdyn_isprimary"): Xrm.OptionSetControl<boolean>;
      get(name: "msdyn_itemspopulated"): Xrm.OptionSetControl<boolean>;
      get(name: "msdyn_name"): Xrm.StringControl;
      get(name: "msdyn_taskspercentcompleted"): Xrm.NumberControl;
      get(name: "msdyn_workorder"): Xrm.LookupControl<"msdyn_workorder">;
      get(name: "notescontrol"): Xrm.BaseControl;
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "workorderproductsgrid"): Xrm.SubGridControl<"msdyn_workorderproduct">;
      get(name: "workorderservicesgrid"): Xrm.SubGridControl<"msdyn_workorderservice">;
      get(name: "workorderservicetasksgrid"): Xrm.SubGridControl<"msdyn_workorderservicetask">;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "f1tab_resolution"): Xrm.PageTab<Tabs.f1tab_resolution>;
      get(name: "tab_7"): Xrm.PageTab<Tabs.tab_7>;
      get(name: "tab_8"): Xrm.PageTab<Tabs.tab_8>;
      get(name: "workorderproductstab"): Xrm.PageTab<Tabs.workorderproductstab>;
      get(name: "workorderservicestab"): Xrm.PageTab<Tabs.workorderservicestab>;
      get(name: "workorderservicetaskstab"): Xrm.PageTab<Tabs.workorderservicetaskstab>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Information extends Xrm.PageBase<Information.Attributes,Information.Tabs,Information.Controls> {
    getAttribute(attributeName: "msdyn_agreementbookingincident"): Xrm.LookupAttribute<"msdyn_agreementbookingincident">;
    getAttribute(attributeName: "msdyn_customerasset"): Xrm.LookupAttribute<"msdyn_customerasset">;
    getAttribute(attributeName: "msdyn_description"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_estimatedduration"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_functionallocation"): Xrm.LookupAttribute<"msdyn_functionallocation">;
    getAttribute(attributeName: "msdyn_incidentresolved"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "msdyn_incidenttype"): Xrm.LookupAttribute<"msdyn_incidenttype">;
    getAttribute(attributeName: "msdyn_isprimary"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "msdyn_itemspopulated"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "msdyn_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_taskspercentcompleted"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_workorder"): Xrm.LookupAttribute<"msdyn_workorder">;
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "statecode"): Xrm.OptionSetAttribute<msdyn_workorderincident_statecode>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "footer_statecode"): Xrm.OptionSetControl<msdyn_workorderincident_statecode>;
    getControl(controlName: "msdyn_agreementbookingincident"): Xrm.LookupControl<"msdyn_agreementbookingincident">;
    getControl(controlName: "msdyn_customerasset"): Xrm.LookupControl<"msdyn_customerasset">;
    getControl(controlName: "msdyn_description"): Xrm.StringControl;
    getControl(controlName: "msdyn_description1"): Xrm.StringControl;
    getControl(controlName: "msdyn_estimatedduration"): Xrm.NumberControl;
    getControl(controlName: "msdyn_functionallocation"): Xrm.LookupControl<"msdyn_functionallocation">;
    getControl(controlName: "msdyn_incidentresolved"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "msdyn_incidenttype"): Xrm.LookupControl<"msdyn_incidenttype">;
    getControl(controlName: "msdyn_isprimary"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "msdyn_itemspopulated"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "msdyn_name"): Xrm.StringControl;
    getControl(controlName: "msdyn_taskspercentcompleted"): Xrm.NumberControl;
    getControl(controlName: "msdyn_workorder"): Xrm.LookupControl<"msdyn_workorder">;
    getControl(controlName: "notescontrol"): Xrm.BaseControl;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "workorderproductsgrid"): Xrm.SubGridControl<"msdyn_workorderproduct">;
    getControl(controlName: "workorderservicesgrid"): Xrm.SubGridControl<"msdyn_workorderservice">;
    getControl(controlName: "workorderservicetasksgrid"): Xrm.SubGridControl<"msdyn_workorderservicetask">;
    getControl(controlName: string): undefined;
  }
}
