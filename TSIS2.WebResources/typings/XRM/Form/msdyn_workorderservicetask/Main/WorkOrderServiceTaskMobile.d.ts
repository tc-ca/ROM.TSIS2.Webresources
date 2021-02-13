declare namespace Form.msdyn_workorderservicetask.Main {
  namespace WorkOrderServiceTaskMobile {
    namespace Tabs {
      interface _1932b3772e7e48809b0e477cc529b5fe extends Xrm.SectionCollectionBase {
        get(name: "InspectionFormSection_Mobile"): Xrm.PageSection;
        get(name: "fstab_general_section_duration"): Xrm.PageSection;
        get(name: "fstab_sub_grids_section"): Xrm.PageSection;
        get(name: "tab_3_section_1"): Xrm.PageSection;
        get(name: "{1932b377-2e7e-4880-9b0e-477cc529b5fe}_section_2"): Xrm.PageSection;
        get(name: "{594a0ad8-a9a3-4509-9e40-52f6789d7512}"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "msdyn_actualduration"): Xrm.NumberAttribute;
      get(name: "msdyn_booking"): Xrm.LookupAttribute<"bookableresourcebooking">;
      get(name: "msdyn_customerasset"): Xrm.LookupAttribute<"msdyn_customerasset">;
      get(name: "msdyn_description"): Xrm.Attribute<string>;
      get(name: "msdyn_estimatedduration"): Xrm.NumberAttribute;
      get(name: "msdyn_inspection"): Xrm.LookupAttribute<"msdyn_inspection">;
      get(name: "msdyn_inspectiondefinitionid"): Xrm.LookupAttribute<"msdyn_inspectiondefinition">;
      get(name: "msdyn_inspectionenabled"): Xrm.OptionSetAttribute<boolean>;
      get(name: "msdyn_inspectiontaskresult"): Xrm.OptionSetAttribute<msdyn_inspectionresult>;
      get(name: "msdyn_name"): Xrm.Attribute<string>;
      get(name: "msdyn_percentcomplete"): Xrm.Attribute<any>;
      get(name: "msdyn_surveyboundedoutput"): Xrm.Attribute<any>;
      get(name: "msdyn_tasktype"): Xrm.LookupAttribute<"msdyn_servicetasktype">;
      get(name: "msdyn_workorder"): Xrm.LookupAttribute<"msdyn_workorder">;
      get(name: "msdyn_workorderincident"): Xrm.LookupAttribute<"msdyn_workorderincident">;
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "msdyn_actualduration"): Xrm.NumberControl;
      get(name: "msdyn_booking"): Xrm.LookupControl<"bookableresourcebooking">;
      get(name: "msdyn_customerasset"): Xrm.LookupControl<"msdyn_customerasset">;
      get(name: "msdyn_description"): Xrm.StringControl;
      get(name: "msdyn_estimatedduration"): Xrm.NumberControl;
      get(name: "msdyn_inspection"): Xrm.LookupControl<"msdyn_inspection">;
      get(name: "msdyn_inspectiondefinitionid"): Xrm.LookupControl<"msdyn_inspectiondefinition">;
      get(name: "msdyn_inspectionenabled"): Xrm.OptionSetControl<boolean>;
      get(name: "msdyn_inspectiontaskresult"): Xrm.OptionSetControl<msdyn_inspectionresult>;
      get(name: "msdyn_name"): Xrm.StringControl;
      get(name: "msdyn_percentcomplete"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "msdyn_surveyboundedoutput"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "msdyn_tasktype"): Xrm.LookupControl<"msdyn_servicetasktype">;
      get(name: "msdyn_workorder"): Xrm.LookupControl<"msdyn_workorder">;
      get(name: "msdyn_workorderincident"): Xrm.LookupControl<"msdyn_workorderincident">;
      get(name: "notescontrol"): Xrm.BaseControl;
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "{1932b377-2e7e-4880-9b0e-477cc529b5fe}"): Xrm.PageTab<Tabs._1932b3772e7e48809b0e477cc529b5fe>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface WorkOrderServiceTaskMobile extends Xrm.PageBase<WorkOrderServiceTaskMobile.Attributes,WorkOrderServiceTaskMobile.Tabs,WorkOrderServiceTaskMobile.Controls> {
    getAttribute(attributeName: "msdyn_actualduration"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_booking"): Xrm.LookupAttribute<"bookableresourcebooking">;
    getAttribute(attributeName: "msdyn_customerasset"): Xrm.LookupAttribute<"msdyn_customerasset">;
    getAttribute(attributeName: "msdyn_description"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_estimatedduration"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_inspection"): Xrm.LookupAttribute<"msdyn_inspection">;
    getAttribute(attributeName: "msdyn_inspectiondefinitionid"): Xrm.LookupAttribute<"msdyn_inspectiondefinition">;
    getAttribute(attributeName: "msdyn_inspectionenabled"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "msdyn_inspectiontaskresult"): Xrm.OptionSetAttribute<msdyn_inspectionresult>;
    getAttribute(attributeName: "msdyn_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_percentcomplete"): Xrm.Attribute<any>;
    getAttribute(attributeName: "msdyn_surveyboundedoutput"): Xrm.Attribute<any>;
    getAttribute(attributeName: "msdyn_tasktype"): Xrm.LookupAttribute<"msdyn_servicetasktype">;
    getAttribute(attributeName: "msdyn_workorder"): Xrm.LookupAttribute<"msdyn_workorder">;
    getAttribute(attributeName: "msdyn_workorderincident"): Xrm.LookupAttribute<"msdyn_workorderincident">;
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "msdyn_actualduration"): Xrm.NumberControl;
    getControl(controlName: "msdyn_booking"): Xrm.LookupControl<"bookableresourcebooking">;
    getControl(controlName: "msdyn_customerasset"): Xrm.LookupControl<"msdyn_customerasset">;
    getControl(controlName: "msdyn_description"): Xrm.StringControl;
    getControl(controlName: "msdyn_estimatedduration"): Xrm.NumberControl;
    getControl(controlName: "msdyn_inspection"): Xrm.LookupControl<"msdyn_inspection">;
    getControl(controlName: "msdyn_inspectiondefinitionid"): Xrm.LookupControl<"msdyn_inspectiondefinition">;
    getControl(controlName: "msdyn_inspectionenabled"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "msdyn_inspectiontaskresult"): Xrm.OptionSetControl<msdyn_inspectionresult>;
    getControl(controlName: "msdyn_name"): Xrm.StringControl;
    getControl(controlName: "msdyn_percentcomplete"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "msdyn_surveyboundedoutput"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "msdyn_tasktype"): Xrm.LookupControl<"msdyn_servicetasktype">;
    getControl(controlName: "msdyn_workorder"): Xrm.LookupControl<"msdyn_workorder">;
    getControl(controlName: "msdyn_workorderincident"): Xrm.LookupControl<"msdyn_workorderincident">;
    getControl(controlName: "notescontrol"): Xrm.BaseControl;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: string): undefined;
  }
}
