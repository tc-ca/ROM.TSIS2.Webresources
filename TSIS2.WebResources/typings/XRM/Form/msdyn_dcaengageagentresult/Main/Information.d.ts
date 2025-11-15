declare namespace Form.msdyn_dcaengageagentresult.Main {
  namespace Information {
    namespace Tabs {
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "msdyn_executiondetails"): Xrm.Attribute<string>;
      get(name: "msdyn_followupdetails"): Xrm.Attribute<string>;
      get(name: "msdyn_lastengageagentresponse"): Xrm.Attribute<string>;
      get(name: "msdyn_lastprocessedactivityid"): Xrm.Attribute<string>;
      get(name: "msdyn_lastprocessedactivitytype"): Xrm.Attribute<string>;
      get(name: "msdyn_lastprocessedtimestamp"): Xrm.DateAttribute;
      get(name: "msdyn_name"): Xrm.Attribute<string>;
      get(name: "msdyn_regarding"): Xrm.LookupAttribute<"account" | "contact" | "lead" | "opportunity">;
      get(name: "msdyn_salesagentrun"): Xrm.LookupAttribute<"msdyn_salesagentrun">;
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "statecode"): Xrm.OptionSetAttribute<msdyn_dcaengageagentresult_statecode>;
      get(name: "statuscode"): Xrm.OptionSetAttribute<msdyn_dcaengageagentresult_statuscode>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "msdyn_executiondetails"): Xrm.StringControl;
      get(name: "msdyn_followupdetails"): Xrm.StringControl;
      get(name: "msdyn_lastengageagentresponse"): Xrm.StringControl;
      get(name: "msdyn_lastprocessedactivityid"): Xrm.StringControl;
      get(name: "msdyn_lastprocessedactivitytype"): Xrm.StringControl;
      get(name: "msdyn_lastprocessedtimestamp"): Xrm.DateControl;
      get(name: "msdyn_name"): Xrm.StringControl;
      get(name: "msdyn_regarding"): Xrm.LookupControl<"account" | "contact" | "lead" | "opportunity">;
      get(name: "msdyn_salesagentrun"): Xrm.LookupControl<"msdyn_salesagentrun">;
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "statecode"): Xrm.OptionSetControl<msdyn_dcaengageagentresult_statecode>;
      get(name: "statuscode"): Xrm.OptionSetControl<msdyn_dcaengageagentresult_statuscode>;
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
    getAttribute(attributeName: "msdyn_executiondetails"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_followupdetails"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_lastengageagentresponse"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_lastprocessedactivityid"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_lastprocessedactivitytype"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_lastprocessedtimestamp"): Xrm.DateAttribute;
    getAttribute(attributeName: "msdyn_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_regarding"): Xrm.LookupAttribute<"account" | "contact" | "lead" | "opportunity">;
    getAttribute(attributeName: "msdyn_salesagentrun"): Xrm.LookupAttribute<"msdyn_salesagentrun">;
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "statecode"): Xrm.OptionSetAttribute<msdyn_dcaengageagentresult_statecode>;
    getAttribute(attributeName: "statuscode"): Xrm.OptionSetAttribute<msdyn_dcaengageagentresult_statuscode>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "msdyn_executiondetails"): Xrm.StringControl;
    getControl(controlName: "msdyn_followupdetails"): Xrm.StringControl;
    getControl(controlName: "msdyn_lastengageagentresponse"): Xrm.StringControl;
    getControl(controlName: "msdyn_lastprocessedactivityid"): Xrm.StringControl;
    getControl(controlName: "msdyn_lastprocessedactivitytype"): Xrm.StringControl;
    getControl(controlName: "msdyn_lastprocessedtimestamp"): Xrm.DateControl;
    getControl(controlName: "msdyn_name"): Xrm.StringControl;
    getControl(controlName: "msdyn_regarding"): Xrm.LookupControl<"account" | "contact" | "lead" | "opportunity">;
    getControl(controlName: "msdyn_salesagentrun"): Xrm.LookupControl<"msdyn_salesagentrun">;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "statecode"): Xrm.OptionSetControl<msdyn_dcaengageagentresult_statecode>;
    getControl(controlName: "statuscode"): Xrm.OptionSetControl<msdyn_dcaengageagentresult_statuscode>;
    getControl(controlName: string): undefined;
  }
}
