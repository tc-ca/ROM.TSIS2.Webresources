declare namespace Form.ts_questionnaireoffline.Main {
  namespace Information {
    namespace Tabs {
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: "ts_questionnaire"): Xrm.LookupAttribute<"ts_questionnaireoffline">;
      get(name: "ts_questionnairedefinition"): Xrm.Attribute<string>;
      get(name: "ts_questionnaireresponse"): Xrm.Attribute<string>;
      get(name: "ts_startdate"): Xrm.DateAttribute;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "ts_name"): Xrm.StringControl;
      get(name: "ts_questionnaire"): Xrm.LookupControl<"ts_questionnaireoffline">;
      get(name: "ts_questionnairedefinition"): Xrm.StringControl;
      get(name: "ts_questionnaireresponse"): Xrm.StringControl;
      get(name: "ts_startdate"): Xrm.DateControl;
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
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_questionnaire"): Xrm.LookupAttribute<"ts_questionnaireoffline">;
    getAttribute(attributeName: "ts_questionnairedefinition"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_questionnaireresponse"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_startdate"): Xrm.DateAttribute;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "ts_name"): Xrm.StringControl;
    getControl(controlName: "ts_questionnaire"): Xrm.LookupControl<"ts_questionnaireoffline">;
    getControl(controlName: "ts_questionnairedefinition"): Xrm.StringControl;
    getControl(controlName: "ts_questionnaireresponse"): Xrm.StringControl;
    getControl(controlName: "ts_startdate"): Xrm.DateControl;
    getControl(controlName: string): undefined;
  }
}
