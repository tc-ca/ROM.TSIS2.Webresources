declare namespace Form.ts_questionnaireversion.Main {
  namespace Information {
    namespace Tabs {
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "ts_documentversion"): Xrm.Attribute<string>;
      get(name: "ts_effectiveenddate"): Xrm.DateAttribute;
      get(name: "ts_effectivestartdate"): Xrm.DateAttribute;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: "ts_ovs_questionnaire"): Xrm.Attribute<any>;
      get(name: "ts_questionnairedefinition"): Xrm.Attribute<string>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "WebResource_QuestionnaireCreator"): Xrm.WebResourceControl;
      get(name: "header_ts_documentversion"): Xrm.StringControl;
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "ts_effectiveenddate"): Xrm.DateControl;
      get(name: "ts_effectivestartdate"): Xrm.DateControl;
      get(name: "ts_name"): Xrm.StringControl;
      get(name: "ts_ovs_questionnaire"): Xrm.LookupControl<"ovs_questionnaire">;
      get(name: "ts_questionnairedefinition"): Xrm.StringControl;
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
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "ts_documentversion"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_effectiveenddate"): Xrm.DateAttribute;
    getAttribute(attributeName: "ts_effectivestartdate"): Xrm.DateAttribute;
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_ovs_questionnaire"): Xrm.Attribute<any>;
    getAttribute(attributeName: "ts_questionnairedefinition"): Xrm.Attribute<string>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "WebResource_QuestionnaireCreator"): Xrm.WebResourceControl;
    getControl(controlName: "header_ts_documentversion"): Xrm.StringControl;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "ts_effectiveenddate"): Xrm.DateControl;
    getControl(controlName: "ts_effectivestartdate"): Xrm.DateControl;
    getControl(controlName: "ts_name"): Xrm.StringControl;
    getControl(controlName: "ts_ovs_questionnaire"): Xrm.LookupControl<"ovs_questionnaire">;
    getControl(controlName: "ts_questionnairedefinition"): Xrm.StringControl;
    getControl(controlName: string): undefined;
  }
}
