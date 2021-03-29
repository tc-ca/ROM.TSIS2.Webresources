declare namespace Form.incidentresolution.QuickCreate {
  namespace CaseResolutionQuickCreateForm {
    namespace Tabs {
      interface general extends Xrm.SectionCollectionBase {
        get(name: "information"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "description"): Xrm.Attribute<string>;
      get(name: "resolutiontypecode"): Xrm.OptionSetAttribute<incidentresolution_incident_statuscode>;
      get(name: "subject"): Xrm.Attribute<string>;
      get(name: "timespent"): Xrm.NumberAttribute;
      get(name: "totaltimespent"): Xrm.NumberAttribute;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "description"): Xrm.StringControl;
      get(name: "resolutiontypecode"): Xrm.OptionSetControl<incidentresolution_incident_statuscode>;
      get(name: "subject"): Xrm.StringControl;
      get(name: "timespent"): Xrm.NumberControl;
      get(name: "totaltimespent"): Xrm.NumberControl;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "general"): Xrm.PageTab<Tabs.general>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface CaseResolutionQuickCreateForm extends Xrm.PageBase<CaseResolutionQuickCreateForm.Attributes,CaseResolutionQuickCreateForm.Tabs,CaseResolutionQuickCreateForm.Controls> {
    getAttribute(attributeName: "description"): Xrm.Attribute<string>;
    getAttribute(attributeName: "resolutiontypecode"): Xrm.OptionSetAttribute<incidentresolution_incident_statuscode>;
    getAttribute(attributeName: "subject"): Xrm.Attribute<string>;
    getAttribute(attributeName: "timespent"): Xrm.NumberAttribute;
    getAttribute(attributeName: "totaltimespent"): Xrm.NumberAttribute;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "description"): Xrm.StringControl;
    getControl(controlName: "resolutiontypecode"): Xrm.OptionSetControl<incidentresolution_incident_statuscode>;
    getControl(controlName: "subject"): Xrm.StringControl;
    getControl(controlName: "timespent"): Xrm.NumberControl;
    getControl(controlName: "totaltimespent"): Xrm.NumberControl;
    getControl(controlName: string): undefined;
  }
}
