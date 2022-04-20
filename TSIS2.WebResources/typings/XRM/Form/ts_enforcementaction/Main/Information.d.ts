declare namespace Form.ts_enforcementaction.Main {
  namespace Information {
    namespace Tabs {
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "ts_authorizedrepresentative"): Xrm.LookupAttribute<"contact">;
      get(name: "ts_comments"): Xrm.Attribute<string>;
      get(name: "ts_company"): Xrm.LookupAttribute<"account">;
      get(name: "ts_copyofreceipt"): Xrm.Attribute<string>;
      get(name: "ts_individualposition"): Xrm.Attribute<string>;
      get(name: "ts_methodofservice"): Xrm.OptionSetAttribute<ts_methodofservice>;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: "ts_timeanddateofservice"): Xrm.DateAttribute;
      get(name: "ts_type"): Xrm.OptionSetAttribute<ts_type>;
      get(name: "ts_verbalwarningdate"): Xrm.DateAttribute;
      get(name: "ts_verbalwarninggivento"): Xrm.LookupAttribute<"contact">;
      get(name: "ts_verbalwarninglocation"): Xrm.OptionSetAttribute<ts_verbalwarninglocation>;
      get(name: "ts_verbalwarninglocationother"): Xrm.Attribute<string>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "ts_authorizedrepresentative"): Xrm.LookupControl<"contact">;
      get(name: "ts_comments"): Xrm.StringControl;
      get(name: "ts_company"): Xrm.LookupControl<"account">;
      get(name: "ts_copyofreceipt"): Xrm.StringControl;
      get(name: "ts_individualposition"): Xrm.StringControl;
      get(name: "ts_methodofservice"): Xrm.OptionSetControl<ts_methodofservice>;
      get(name: "ts_name"): Xrm.StringControl;
      get(name: "ts_timeanddateofservice"): Xrm.DateControl;
      get(name: "ts_type"): Xrm.OptionSetControl<ts_type>;
      get(name: "ts_verbalwarningdate"): Xrm.DateControl;
      get(name: "ts_verbalwarninggivento"): Xrm.LookupControl<"contact">;
      get(name: "ts_verbalwarninglocation"): Xrm.OptionSetControl<ts_verbalwarninglocation>;
      get(name: "ts_verbalwarninglocationother"): Xrm.StringControl;
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
    getAttribute(attributeName: "ts_authorizedrepresentative"): Xrm.LookupAttribute<"contact">;
    getAttribute(attributeName: "ts_comments"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_company"): Xrm.LookupAttribute<"account">;
    getAttribute(attributeName: "ts_copyofreceipt"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_individualposition"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_methodofservice"): Xrm.OptionSetAttribute<ts_methodofservice>;
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_timeanddateofservice"): Xrm.DateAttribute;
    getAttribute(attributeName: "ts_type"): Xrm.OptionSetAttribute<ts_type>;
    getAttribute(attributeName: "ts_verbalwarningdate"): Xrm.DateAttribute;
    getAttribute(attributeName: "ts_verbalwarninggivento"): Xrm.LookupAttribute<"contact">;
    getAttribute(attributeName: "ts_verbalwarninglocation"): Xrm.OptionSetAttribute<ts_verbalwarninglocation>;
    getAttribute(attributeName: "ts_verbalwarninglocationother"): Xrm.Attribute<string>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "ts_authorizedrepresentative"): Xrm.LookupControl<"contact">;
    getControl(controlName: "ts_comments"): Xrm.StringControl;
    getControl(controlName: "ts_company"): Xrm.LookupControl<"account">;
    getControl(controlName: "ts_copyofreceipt"): Xrm.StringControl;
    getControl(controlName: "ts_individualposition"): Xrm.StringControl;
    getControl(controlName: "ts_methodofservice"): Xrm.OptionSetControl<ts_methodofservice>;
    getControl(controlName: "ts_name"): Xrm.StringControl;
    getControl(controlName: "ts_timeanddateofservice"): Xrm.DateControl;
    getControl(controlName: "ts_type"): Xrm.OptionSetControl<ts_type>;
    getControl(controlName: "ts_verbalwarningdate"): Xrm.DateControl;
    getControl(controlName: "ts_verbalwarninggivento"): Xrm.LookupControl<"contact">;
    getControl(controlName: "ts_verbalwarninglocation"): Xrm.OptionSetControl<ts_verbalwarninglocation>;
    getControl(controlName: "ts_verbalwarninglocationother"): Xrm.StringControl;
    getControl(controlName: string): undefined;
  }
}
