declare namespace Form.qm_sygroup.Main {
  namespace Information {
    namespace Tabs {
      interface b5fc005da9354bbebc385125935b1d13 extends Xrm.SectionCollectionBase {
        get(name: "{b5fc005d-a935-4bbe-bc38-5125935b1d13}_section_2"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "qm_groupe"): Xrm.Attribute<string>;
      get(name: "qm_groupf"): Xrm.Attribute<string>;
      get(name: "qm_isvisibleind"): Xrm.OptionSetAttribute<boolean>;
      get(name: "qm_name"): Xrm.Attribute<string>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "Questions"): Xrm.SubGridControl<"qm_syquestion">;
      get(name: "qm_groupe"): Xrm.StringControl;
      get(name: "qm_groupf"): Xrm.StringControl;
      get(name: "qm_isvisibleind"): Xrm.OptionSetControl<boolean>;
      get(name: "qm_name"): Xrm.StringControl;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "{b5fc005d-a935-4bbe-bc38-5125935b1d13}"): Xrm.PageTab<Tabs.b5fc005da9354bbebc385125935b1d13>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Information extends Xrm.PageBase<Information.Attributes,Information.Tabs,Information.Controls> {
    getAttribute(attributeName: "qm_groupe"): Xrm.Attribute<string>;
    getAttribute(attributeName: "qm_groupf"): Xrm.Attribute<string>;
    getAttribute(attributeName: "qm_isvisibleind"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "qm_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "Questions"): Xrm.SubGridControl<"qm_syquestion">;
    getControl(controlName: "qm_groupe"): Xrm.StringControl;
    getControl(controlName: "qm_groupf"): Xrm.StringControl;
    getControl(controlName: "qm_isvisibleind"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "qm_name"): Xrm.StringControl;
    getControl(controlName: string): undefined;
  }
}
