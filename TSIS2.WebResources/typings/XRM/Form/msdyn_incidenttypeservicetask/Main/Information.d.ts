declare namespace Form.msdyn_incidenttypeservicetask.Main {
  namespace Information {
    namespace Tabs {
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "msdyn_description"): Xrm.Attribute<string>;
      get(name: "msdyn_estimatedduration"): Xrm.NumberAttribute;
      get(name: "msdyn_incidenttype"): Xrm.LookupAttribute<"msdyn_incidenttype">;
      get(name: "msdyn_inspection"): Xrm.LookupAttribute<"msdyn_inspection">;
      get(name: "msdyn_inspectionenabled"): Xrm.OptionSetAttribute<boolean>;
      get(name: "msdyn_lineorder"): Xrm.NumberAttribute;
      get(name: "msdyn_name"): Xrm.Attribute<string>;
      get(name: "msdyn_tasktype"): Xrm.LookupAttribute<"msdyn_servicetasktype">;
      get(name: "ovs_questionnaire"): Xrm.LookupAttribute<"ovs_questionnaire">;
      get(name: "ovs_questionnaireenabled"): Xrm.OptionSetAttribute<boolean>;
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "statecode"): Xrm.OptionSetAttribute<msdyn_incidenttypeservicetask_statecode>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "WebResource_QuestionnaireRender"): Xrm.WebResourceControl;
      get(name: "footer_statecode"): Xrm.OptionSetControl<msdyn_incidenttypeservicetask_statecode>;
      get(name: "msdyn_description"): Xrm.StringControl;
      get(name: "msdyn_estimatedduration"): Xrm.NumberControl;
      get(name: "msdyn_incidenttype"): Xrm.LookupControl<"msdyn_incidenttype">;
      get(name: "msdyn_inspection"): Xrm.LookupControl<"msdyn_inspection">;
      get(name: "msdyn_inspectionenabled"): Xrm.OptionSetControl<boolean>;
      get(name: "msdyn_lineorder"): Xrm.NumberControl;
      get(name: "msdyn_name"): Xrm.StringControl;
      get(name: "msdyn_surveyresponse"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "msdyn_tasktype"): Xrm.LookupControl<"msdyn_servicetasktype">;
      get(name: "ovs_questionnaire"): Xrm.LookupControl<"ovs_questionnaire">;
      get(name: "ovs_questionnaireenabled"): Xrm.OptionSetControl<boolean>;
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Information extends Xrm.PageBase<Information.Attributes,Information.Tabs,Information.Controls> {
    getAttribute(attributeName: "msdyn_description"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_estimatedduration"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_incidenttype"): Xrm.LookupAttribute<"msdyn_incidenttype">;
    getAttribute(attributeName: "msdyn_inspection"): Xrm.LookupAttribute<"msdyn_inspection">;
    getAttribute(attributeName: "msdyn_inspectionenabled"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "msdyn_lineorder"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_tasktype"): Xrm.LookupAttribute<"msdyn_servicetasktype">;
    getAttribute(attributeName: "ovs_questionnaire"): Xrm.LookupAttribute<"ovs_questionnaire">;
    getAttribute(attributeName: "ovs_questionnaireenabled"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "statecode"): Xrm.OptionSetAttribute<msdyn_incidenttypeservicetask_statecode>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "WebResource_QuestionnaireRender"): Xrm.WebResourceControl;
    getControl(controlName: "footer_statecode"): Xrm.OptionSetControl<msdyn_incidenttypeservicetask_statecode>;
    getControl(controlName: "msdyn_description"): Xrm.StringControl;
    getControl(controlName: "msdyn_estimatedduration"): Xrm.NumberControl;
    getControl(controlName: "msdyn_incidenttype"): Xrm.LookupControl<"msdyn_incidenttype">;
    getControl(controlName: "msdyn_inspection"): Xrm.LookupControl<"msdyn_inspection">;
    getControl(controlName: "msdyn_inspectionenabled"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "msdyn_lineorder"): Xrm.NumberControl;
    getControl(controlName: "msdyn_name"): Xrm.StringControl;
    getControl(controlName: "msdyn_surveyresponse"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "msdyn_tasktype"): Xrm.LookupControl<"msdyn_servicetasktype">;
    getControl(controlName: "ovs_questionnaire"): Xrm.LookupControl<"ovs_questionnaire">;
    getControl(controlName: "ovs_questionnaireenabled"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: string): undefined;
  }
}
