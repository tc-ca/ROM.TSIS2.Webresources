declare namespace Form.qm_syquestion.Main {
  namespace ParentQuestion {
    namespace Tabs {
      interface tab_2 extends Xrm.SectionCollectionBase {
        get(name: "tab_2_section_1"): Xrm.PageSection;
        get(name: "tab_2_section_2"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "qm_isvisibleind"): Xrm.OptionSetAttribute<boolean>;
      get(name: "qm_name"): Xrm.Attribute<string>;
      get(name: "qm_ordernbr"): Xrm.NumberAttribute;
      get(name: "qm_questione"): Xrm.Attribute<string>;
      get(name: "qm_questionf"): Xrm.Attribute<string>;
      get(name: "qm_questionresponsetypecd"): Xrm.OptionSetAttribute<qm_questionresponsetypecd>;
      get(name: "qm_sygroupid"): Xrm.LookupAttribute<"qm_sygroup">;
      get(name: "qm_templateid"): Xrm.LookupAttribute<"qm_sytemplate">;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "ChildQuestions"): Xrm.SubGridControl<"qm_syquestion">;
      get(name: "qm_isvisibleind"): Xrm.OptionSetControl<boolean>;
      get(name: "qm_name"): Xrm.StringControl;
      get(name: "qm_ordernbr"): Xrm.NumberControl;
      get(name: "qm_questione"): Xrm.StringControl;
      get(name: "qm_questionf"): Xrm.StringControl;
      get(name: "qm_questionresponsetypecd"): Xrm.OptionSetControl<qm_questionresponsetypecd>;
      get(name: "qm_sygroupid"): Xrm.LookupControl<"qm_sygroup">;
      get(name: "qm_templateid"): Xrm.LookupControl<"qm_sytemplate">;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "tab_2"): Xrm.PageTab<Tabs.tab_2>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface ParentQuestion extends Xrm.PageBase<ParentQuestion.Attributes,ParentQuestion.Tabs,ParentQuestion.Controls> {
    getAttribute(attributeName: "qm_isvisibleind"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "qm_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "qm_ordernbr"): Xrm.NumberAttribute;
    getAttribute(attributeName: "qm_questione"): Xrm.Attribute<string>;
    getAttribute(attributeName: "qm_questionf"): Xrm.Attribute<string>;
    getAttribute(attributeName: "qm_questionresponsetypecd"): Xrm.OptionSetAttribute<qm_questionresponsetypecd>;
    getAttribute(attributeName: "qm_sygroupid"): Xrm.LookupAttribute<"qm_sygroup">;
    getAttribute(attributeName: "qm_templateid"): Xrm.LookupAttribute<"qm_sytemplate">;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "ChildQuestions"): Xrm.SubGridControl<"qm_syquestion">;
    getControl(controlName: "qm_isvisibleind"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "qm_name"): Xrm.StringControl;
    getControl(controlName: "qm_ordernbr"): Xrm.NumberControl;
    getControl(controlName: "qm_questione"): Xrm.StringControl;
    getControl(controlName: "qm_questionf"): Xrm.StringControl;
    getControl(controlName: "qm_questionresponsetypecd"): Xrm.OptionSetControl<qm_questionresponsetypecd>;
    getControl(controlName: "qm_sygroupid"): Xrm.LookupControl<"qm_sygroup">;
    getControl(controlName: "qm_templateid"): Xrm.LookupControl<"qm_sytemplate">;
    getControl(controlName: string): undefined;
  }
}
