declare namespace Form.qm_sytemplate.Main {
  namespace Template {
    namespace Tabs {
      interface _577b9b2e19714cd685916663ff39b327 extends Xrm.SectionCollectionBase {
        get(name: "{96d0ae62-4c3e-4d2c-b89e-bedefc0e9299}"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_2 extends Xrm.SectionCollectionBase {
        get(name: "tab_2_section_1"): Xrm.PageSection;
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
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "qm_name"): Xrm.Attribute<string>;
      get(name: "qm_templatedescetxt"): Xrm.Attribute<string>;
      get(name: "qm_templatedescftxt"): Xrm.Attribute<string>;
      get(name: "qm_templateenm"): Xrm.Attribute<string>;
      get(name: "qm_templatefnm"): Xrm.Attribute<string>;
      get(name: "qm_templatejsontxt"): Xrm.Attribute<string>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "WebResource_BuilderTemplateForm"): Xrm.WebResourceControl;
      get(name: "qm_name"): Xrm.StringControl;
      get(name: "qm_templatedescetxt"): Xrm.StringControl;
      get(name: "qm_templatedescftxt"): Xrm.StringControl;
      get(name: "qm_templateenm"): Xrm.StringControl;
      get(name: "qm_templatefnm"): Xrm.StringControl;
      get(name: "qm_templatejsontxt"): Xrm.StringControl;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "{577b9b2e-1971-4cd6-8591-6663ff39b327}"): Xrm.PageTab<Tabs._577b9b2e19714cd685916663ff39b327>;
      get(name: "tab_2"): Xrm.PageTab<Tabs.tab_2>;
      get(name: "tab_3"): Xrm.PageTab<Tabs.tab_3>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Template extends Xrm.PageBase<Template.Attributes,Template.Tabs,Template.Controls> {
    getAttribute(attributeName: "qm_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "qm_templatedescetxt"): Xrm.Attribute<string>;
    getAttribute(attributeName: "qm_templatedescftxt"): Xrm.Attribute<string>;
    getAttribute(attributeName: "qm_templateenm"): Xrm.Attribute<string>;
    getAttribute(attributeName: "qm_templatefnm"): Xrm.Attribute<string>;
    getAttribute(attributeName: "qm_templatejsontxt"): Xrm.Attribute<string>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "WebResource_BuilderTemplateForm"): Xrm.WebResourceControl;
    getControl(controlName: "qm_name"): Xrm.StringControl;
    getControl(controlName: "qm_templatedescetxt"): Xrm.StringControl;
    getControl(controlName: "qm_templatedescftxt"): Xrm.StringControl;
    getControl(controlName: "qm_templateenm"): Xrm.StringControl;
    getControl(controlName: "qm_templatefnm"): Xrm.StringControl;
    getControl(controlName: "qm_templatejsontxt"): Xrm.StringControl;
    getControl(controlName: string): undefined;
  }
}
