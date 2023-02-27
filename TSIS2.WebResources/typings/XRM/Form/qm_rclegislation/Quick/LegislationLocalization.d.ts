declare namespace Form.qm_rclegislation.Quick {
  namespace LegislationLocalization {
    namespace Tabs {
      interface tab_1 extends Xrm.SectionCollectionBase {
        get(name: "tab_1_column_1_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "qm_legislationetxt"): Xrm.Attribute<string>;
      get(name: "qm_legislationftxt"): Xrm.Attribute<string>;
      get(name: "qm_violationdisplaytexten"): Xrm.Attribute<string>;
      get(name: "qm_violationdisplaytextfr"): Xrm.Attribute<string>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "qm_legislationetxt"): Xrm.StringControl;
      get(name: "qm_legislationftxt"): Xrm.StringControl;
      get(name: "qm_violationdisplaytexten"): Xrm.StringControl;
      get(name: "qm_violationdisplaytextfr"): Xrm.StringControl;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "tab_1"): Xrm.PageTab<Tabs.tab_1>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface LegislationLocalization extends Xrm.PageBase<LegislationLocalization.Attributes,LegislationLocalization.Tabs,LegislationLocalization.Controls> {
    getAttribute(attributeName: "qm_legislationetxt"): Xrm.Attribute<string>;
    getAttribute(attributeName: "qm_legislationftxt"): Xrm.Attribute<string>;
    getAttribute(attributeName: "qm_violationdisplaytexten"): Xrm.Attribute<string>;
    getAttribute(attributeName: "qm_violationdisplaytextfr"): Xrm.Attribute<string>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "qm_legislationetxt"): Xrm.StringControl;
    getControl(controlName: "qm_legislationftxt"): Xrm.StringControl;
    getControl(controlName: "qm_violationdisplaytexten"): Xrm.StringControl;
    getControl(controlName: "qm_violationdisplaytextfr"): Xrm.StringControl;
    getControl(controlName: string): undefined;
  }
}
