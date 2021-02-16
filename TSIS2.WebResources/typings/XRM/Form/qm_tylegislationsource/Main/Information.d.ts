declare namespace Form.qm_tylegislationsource.Main {
  namespace Information {
    namespace Tabs {
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "qm_legislationsourceelbl"): Xrm.Attribute<string>;
      get(name: "qm_legislationsourceetxt"): Xrm.Attribute<string>;
      get(name: "qm_legislationsourceflbl"): Xrm.Attribute<string>;
      get(name: "qm_legislationsourceftxt"): Xrm.Attribute<string>;
      get(name: "qm_name"): Xrm.Attribute<string>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "qm_legislationsourceelbl"): Xrm.StringControl;
      get(name: "qm_legislationsourceetxt"): Xrm.StringControl;
      get(name: "qm_legislationsourceflbl"): Xrm.StringControl;
      get(name: "qm_legislationsourceftxt"): Xrm.StringControl;
      get(name: "qm_name"): Xrm.StringControl;
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
    getAttribute(attributeName: "qm_legislationsourceelbl"): Xrm.Attribute<string>;
    getAttribute(attributeName: "qm_legislationsourceetxt"): Xrm.Attribute<string>;
    getAttribute(attributeName: "qm_legislationsourceflbl"): Xrm.Attribute<string>;
    getAttribute(attributeName: "qm_legislationsourceftxt"): Xrm.Attribute<string>;
    getAttribute(attributeName: "qm_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "qm_legislationsourceelbl"): Xrm.StringControl;
    getControl(controlName: "qm_legislationsourceetxt"): Xrm.StringControl;
    getControl(controlName: "qm_legislationsourceflbl"): Xrm.StringControl;
    getControl(controlName: "qm_legislationsourceftxt"): Xrm.StringControl;
    getControl(controlName: "qm_name"): Xrm.StringControl;
    getControl(controlName: string): undefined;
  }
}
