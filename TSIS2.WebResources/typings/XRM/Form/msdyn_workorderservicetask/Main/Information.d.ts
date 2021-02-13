declare namespace Form.msdyn_workorderservicetask.Main {
  namespace Information {
    namespace Tabs {
      interface tab_6 extends Xrm.SectionCollectionBase {
        get(name: "tab_6_section_1"): Xrm.PageSection;
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
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "msdyn_actualduration"): Xrm.NumberAttribute;
      get(name: "msdyn_agreementbookingservicetask"): Xrm.LookupAttribute<"msdyn_agreementbookingservicetask">;
      get(name: "msdyn_booking"): Xrm.LookupAttribute<"bookableresourcebooking">;
      get(name: "msdyn_customerasset"): Xrm.LookupAttribute<"msdyn_customerasset">;
      get(name: "msdyn_description"): Xrm.Attribute<string>;
      get(name: "msdyn_estimatedduration"): Xrm.NumberAttribute;
      get(name: "msdyn_inspection"): Xrm.LookupAttribute<"msdyn_inspection">;
      get(name: "msdyn_inspectiondefinitionid"): Xrm.LookupAttribute<"msdyn_inspectiondefinition">;
      get(name: "msdyn_inspectionenabled"): Xrm.OptionSetAttribute<boolean>;
      get(name: "msdyn_inspectiontaskresult"): Xrm.OptionSetAttribute<msdyn_inspectionresult>;
      get(name: "msdyn_lineorder"): Xrm.NumberAttribute;
      get(name: "msdyn_name"): Xrm.Attribute<string>;
      get(name: "msdyn_percentcomplete"): Xrm.NumberAttribute;
      get(name: "msdyn_surveyboundedoutput"): Xrm.Attribute<any>;
      get(name: "msdyn_tasktype"): Xrm.LookupAttribute<"msdyn_servicetasktype">;
      get(name: "msdyn_workorder"): Xrm.LookupAttribute<"msdyn_workorder">;
      get(name: "msdyn_workorderincident"): Xrm.LookupAttribute<"msdyn_workorderincident">;
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "statecode"): Xrm.OptionSetAttribute<msdyn_workorderservicetask_statecode>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "footer_statecode"): Xrm.OptionSetControl<msdyn_workorderservicetask_statecode>;
      get(name: "msdyn_actualduration"): Xrm.NumberControl;
      get(name: "msdyn_agreementbookingservicetask"): Xrm.LookupControl<"msdyn_agreementbookingservicetask">;
      get(name: "msdyn_agreementbookingservicetask1"): Xrm.LookupControl<"msdyn_agreementbookingservicetask">;
      get(name: "msdyn_booking"): Xrm.LookupControl<"bookableresourcebooking">;
      get(name: "msdyn_booking1"): Xrm.LookupControl<"bookableresourcebooking">;
      get(name: "msdyn_customerasset"): Xrm.LookupControl<"msdyn_customerasset">;
      get(name: "msdyn_customerasset1"): Xrm.LookupControl<"msdyn_customerasset">;
      get(name: "msdyn_description"): Xrm.StringControl;
      get(name: "msdyn_description1"): Xrm.StringControl;
      get(name: "msdyn_estimatedduration"): Xrm.NumberControl;
      get(name: "msdyn_inspection"): Xrm.LookupControl<"msdyn_inspection">;
      get(name: "msdyn_inspectiondefinitionid"): Xrm.LookupControl<"msdyn_inspectiondefinition">;
      get(name: "msdyn_inspectionenabled"): Xrm.OptionSetControl<boolean>;
      get(name: "msdyn_inspectiontaskresult"): Xrm.OptionSetControl<msdyn_inspectionresult>;
      get(name: "msdyn_lineorder"): Xrm.NumberControl;
      get(name: "msdyn_name"): Xrm.StringControl;
      get(name: "msdyn_percentcomplete"): Xrm.NumberControl;
      get(name: "msdyn_surveyboundedoutput"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "msdyn_tasktype"): Xrm.LookupControl<"msdyn_servicetasktype">;
      get(name: "msdyn_workorder"): Xrm.LookupControl<"msdyn_workorder">;
      get(name: "msdyn_workorderincident"): Xrm.LookupControl<"msdyn_workorderincident">;
      get(name: "msdyn_workorderincident1"): Xrm.LookupControl<"msdyn_workorderincident">;
      get(name: "notescontrol"): Xrm.BaseControl;
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "tab_6"): Xrm.PageTab<Tabs.tab_6>;
      get(name: "tab_7"): Xrm.PageTab<Tabs.tab_7>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Information extends Xrm.PageBase<Information.Attributes,Information.Tabs,Information.Controls> {
    getAttribute(attributeName: "msdyn_actualduration"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_agreementbookingservicetask"): Xrm.LookupAttribute<"msdyn_agreementbookingservicetask">;
    getAttribute(attributeName: "msdyn_booking"): Xrm.LookupAttribute<"bookableresourcebooking">;
    getAttribute(attributeName: "msdyn_customerasset"): Xrm.LookupAttribute<"msdyn_customerasset">;
    getAttribute(attributeName: "msdyn_description"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_estimatedduration"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_inspection"): Xrm.LookupAttribute<"msdyn_inspection">;
    getAttribute(attributeName: "msdyn_inspectiondefinitionid"): Xrm.LookupAttribute<"msdyn_inspectiondefinition">;
    getAttribute(attributeName: "msdyn_inspectionenabled"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "msdyn_inspectiontaskresult"): Xrm.OptionSetAttribute<msdyn_inspectionresult>;
    getAttribute(attributeName: "msdyn_lineorder"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_percentcomplete"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_surveyboundedoutput"): Xrm.Attribute<any>;
    getAttribute(attributeName: "msdyn_tasktype"): Xrm.LookupAttribute<"msdyn_servicetasktype">;
    getAttribute(attributeName: "msdyn_workorder"): Xrm.LookupAttribute<"msdyn_workorder">;
    getAttribute(attributeName: "msdyn_workorderincident"): Xrm.LookupAttribute<"msdyn_workorderincident">;
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "statecode"): Xrm.OptionSetAttribute<msdyn_workorderservicetask_statecode>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "footer_statecode"): Xrm.OptionSetControl<msdyn_workorderservicetask_statecode>;
    getControl(controlName: "msdyn_actualduration"): Xrm.NumberControl;
    getControl(controlName: "msdyn_agreementbookingservicetask"): Xrm.LookupControl<"msdyn_agreementbookingservicetask">;
    getControl(controlName: "msdyn_agreementbookingservicetask1"): Xrm.LookupControl<"msdyn_agreementbookingservicetask">;
    getControl(controlName: "msdyn_booking"): Xrm.LookupControl<"bookableresourcebooking">;
    getControl(controlName: "msdyn_booking1"): Xrm.LookupControl<"bookableresourcebooking">;
    getControl(controlName: "msdyn_customerasset"): Xrm.LookupControl<"msdyn_customerasset">;
    getControl(controlName: "msdyn_customerasset1"): Xrm.LookupControl<"msdyn_customerasset">;
    getControl(controlName: "msdyn_description"): Xrm.StringControl;
    getControl(controlName: "msdyn_description1"): Xrm.StringControl;
    getControl(controlName: "msdyn_estimatedduration"): Xrm.NumberControl;
    getControl(controlName: "msdyn_inspection"): Xrm.LookupControl<"msdyn_inspection">;
    getControl(controlName: "msdyn_inspectiondefinitionid"): Xrm.LookupControl<"msdyn_inspectiondefinition">;
    getControl(controlName: "msdyn_inspectionenabled"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "msdyn_inspectiontaskresult"): Xrm.OptionSetControl<msdyn_inspectionresult>;
    getControl(controlName: "msdyn_lineorder"): Xrm.NumberControl;
    getControl(controlName: "msdyn_name"): Xrm.StringControl;
    getControl(controlName: "msdyn_percentcomplete"): Xrm.NumberControl;
    getControl(controlName: "msdyn_surveyboundedoutput"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "msdyn_tasktype"): Xrm.LookupControl<"msdyn_servicetasktype">;
    getControl(controlName: "msdyn_workorder"): Xrm.LookupControl<"msdyn_workorder">;
    getControl(controlName: "msdyn_workorderincident"): Xrm.LookupControl<"msdyn_workorderincident">;
    getControl(controlName: "msdyn_workorderincident1"): Xrm.LookupControl<"msdyn_workorderincident">;
    getControl(controlName: "notescontrol"): Xrm.BaseControl;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: string): undefined;
  }
}
