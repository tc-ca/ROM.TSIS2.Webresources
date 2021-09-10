declare namespace Form.msdyn_servicetasktype.Main {
  namespace ROMInformation {
    namespace Tabs {
      interface tab_3 extends Xrm.SectionCollectionBase {
        get(name: "{d55543e7-10be-4e88-975c-1762a586fa72}_section_4"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "msdyn_description"): Xrm.Attribute<string>;
      get(name: "msdyn_estimatedduration"): Xrm.NumberAttribute;
      get(name: "msdyn_inspection"): Xrm.Attribute<any>;
      get(name: "msdyn_name"): Xrm.Attribute<string>;
      get(name: "ovs_questionnaire"): Xrm.LookupAttribute<"ovs_questionnaire">;
      get(name: "ovs_questionnaireenabled"): Xrm.Attribute<any>;
      get(name: "ovs_servicetasktypenameenglish"): Xrm.Attribute<string>;
      get(name: "ovs_servicetasktypenamefrench"): Xrm.Attribute<string>;
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "statecode"): Xrm.OptionSetAttribute<msdyn_servicetasktype_statecode>;
      get(name: "ts_hascustomquestionnaire"): Xrm.Attribute<any>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "Provisions"): Xrm.SubGridControl<"qm_rclegislation">;
      get(name: "WebResource_QuestionnaireRender"): Xrm.WebResourceControl;
      get(name: "footer_statecode"): Xrm.OptionSetControl<msdyn_servicetasktype_statecode>;
      get(name: "msdyn_description"): Xrm.StringControl;
      get(name: "msdyn_estimatedduration"): Xrm.NumberControl;
      get(name: "msdyn_name"): Xrm.StringControl;
      get(name: "msdyn_surveyresponse"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "notescontrol"): Xrm.BaseControl;
      get(name: "ovs_questionnaire"): Xrm.LookupControl<"ovs_questionnaire">;
      get(name: "ovs_questionnaireenabled"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "ovs_servicetasktypenameenglish"): Xrm.StringControl;
      get(name: "ovs_servicetasktypenamefrench"): Xrm.StringControl;
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "ts_hascustomquestionnaire"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "tab_3"): Xrm.PageTab<Tabs.tab_3>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface ROMInformation extends Xrm.PageBase<ROMInformation.Attributes,ROMInformation.Tabs,ROMInformation.Controls> {
    getAttribute(attributeName: "msdyn_description"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_estimatedduration"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_inspection"): Xrm.Attribute<any>;
    getAttribute(attributeName: "msdyn_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ovs_questionnaire"): Xrm.LookupAttribute<"ovs_questionnaire">;
    getAttribute(attributeName: "ovs_questionnaireenabled"): Xrm.Attribute<any>;
    getAttribute(attributeName: "ovs_servicetasktypenameenglish"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ovs_servicetasktypenamefrench"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "statecode"): Xrm.OptionSetAttribute<msdyn_servicetasktype_statecode>;
    getAttribute(attributeName: "ts_hascustomquestionnaire"): Xrm.Attribute<any>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "Provisions"): Xrm.SubGridControl<"qm_rclegislation">;
    getControl(controlName: "WebResource_QuestionnaireRender"): Xrm.WebResourceControl;
    getControl(controlName: "footer_statecode"): Xrm.OptionSetControl<msdyn_servicetasktype_statecode>;
    getControl(controlName: "msdyn_description"): Xrm.StringControl;
    getControl(controlName: "msdyn_estimatedduration"): Xrm.NumberControl;
    getControl(controlName: "msdyn_name"): Xrm.StringControl;
    getControl(controlName: "msdyn_surveyresponse"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "notescontrol"): Xrm.BaseControl;
    getControl(controlName: "ovs_questionnaire"): Xrm.LookupControl<"ovs_questionnaire">;
    getControl(controlName: "ovs_questionnaireenabled"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "ovs_servicetasktypenameenglish"): Xrm.StringControl;
    getControl(controlName: "ovs_servicetasktypenamefrench"): Xrm.StringControl;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "ts_hascustomquestionnaire"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: string): undefined;
  }
}
