declare namespace Form.ts_entityrisk.Main {
  namespace Information {
    namespace Tabs {
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "statecode"): Xrm.OptionSetAttribute<ts_entityrisk_statecode>;
      get(name: "ts_calculatedriskscore"): Xrm.NumberAttribute;
      get(name: "ts_entityid"): Xrm.Attribute<string>;
      get(name: "ts_entityname"): Xrm.OptionSetAttribute<ts_entityrisk_ts_entityname>;
      get(name: "ts_fiscalyear"): Xrm.LookupAttribute<"tc_tcfiscalyear">;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: "ts_prescribedfrequencyoverride"): Xrm.LookupAttribute<"ts_prescribedfrequencyoverride">;
      get(name: "ts_riskapplicationoperationtype"): Xrm.LookupAttribute<"ovs_operationtype">;
      get(name: "ts_riskscore"): Xrm.NumberAttribute;
      get(name: "ts_siteclass"): Xrm.Attribute<string>;
      get(name: "ts_usesriskapplicationactivitytype"): Xrm.OptionSetAttribute<boolean>;
      get(name: "ts_usesriskapplicationoperation"): Xrm.OptionSetAttribute<boolean>;
      get(name: "ts_usesriskapplicationoperationtype"): Xrm.OptionSetAttribute<boolean>;
      get(name: "ts_usesriskapplicationprogramarea"): Xrm.OptionSetAttribute<boolean>;
      get(name: "ts_usesriskapplicationsite"): Xrm.OptionSetAttribute<boolean>;
      get(name: "ts_usesriskapplicationstakeholder"): Xrm.OptionSetAttribute<boolean>;
      get(name: "ts_weightedriskscore"): Xrm.NumberAttribute;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "ActivityType"): Xrm.SubGridControl<"ts_operationactivityriskscores">;
      get(name: "Operation"): Xrm.SubGridControl<"ts_operationactivityriskscores">;
      get(name: "OperationType"): Xrm.SubGridControl<"ts_operationactivityriskscores">;
      get(name: "ProgramArea"): Xrm.SubGridControl<"ts_operationactivityriskscores">;
      get(name: "Site"): Xrm.SubGridControl<"ts_operationactivityriskscores">;
      get(name: "Stakeholder"): Xrm.SubGridControl<"ts_operationactivityriskscores">;
      get(name: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "header_statecode"): Xrm.OptionSetControl<ts_entityrisk_statecode>;
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "ts_calculatedriskscore"): Xrm.NumberControl;
      get(name: "ts_entityid"): Xrm.StringControl;
      get(name: "ts_entityname"): Xrm.OptionSetControl<ts_entityrisk_ts_entityname>;
      get(name: "ts_fiscalyear"): Xrm.LookupControl<"tc_tcfiscalyear">;
      get(name: "ts_name"): Xrm.StringControl;
      get(name: "ts_prescribedfrequencyoverride"): Xrm.LookupControl<"ts_prescribedfrequencyoverride">;
      get(name: "ts_riskapplicationoperationtype"): Xrm.LookupControl<"ovs_operationtype">;
      get(name: "ts_riskscore"): Xrm.NumberControl;
      get(name: "ts_siteclass"): Xrm.StringControl;
      get(name: "ts_usesriskapplicationactivitytype"): Xrm.OptionSetControl<boolean>;
      get(name: "ts_usesriskapplicationoperation"): Xrm.OptionSetControl<boolean>;
      get(name: "ts_usesriskapplicationoperationtype"): Xrm.OptionSetControl<boolean>;
      get(name: "ts_usesriskapplicationprogramarea"): Xrm.OptionSetControl<boolean>;
      get(name: "ts_usesriskapplicationsite"): Xrm.OptionSetControl<boolean>;
      get(name: "ts_usesriskapplicationstakeholder"): Xrm.OptionSetControl<boolean>;
      get(name: "ts_weightedriskscore"): Xrm.NumberControl;
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
    getAttribute(attributeName: "statecode"): Xrm.OptionSetAttribute<ts_entityrisk_statecode>;
    getAttribute(attributeName: "ts_calculatedriskscore"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_entityid"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_entityname"): Xrm.OptionSetAttribute<ts_entityrisk_ts_entityname>;
    getAttribute(attributeName: "ts_fiscalyear"): Xrm.LookupAttribute<"tc_tcfiscalyear">;
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_prescribedfrequencyoverride"): Xrm.LookupAttribute<"ts_prescribedfrequencyoverride">;
    getAttribute(attributeName: "ts_riskapplicationoperationtype"): Xrm.LookupAttribute<"ovs_operationtype">;
    getAttribute(attributeName: "ts_riskscore"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_siteclass"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_usesriskapplicationactivitytype"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "ts_usesriskapplicationoperation"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "ts_usesriskapplicationoperationtype"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "ts_usesriskapplicationprogramarea"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "ts_usesriskapplicationsite"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "ts_usesriskapplicationstakeholder"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "ts_weightedriskscore"): Xrm.NumberAttribute;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "ActivityType"): Xrm.SubGridControl<"ts_operationactivityriskscores">;
    getControl(controlName: "Operation"): Xrm.SubGridControl<"ts_operationactivityriskscores">;
    getControl(controlName: "OperationType"): Xrm.SubGridControl<"ts_operationactivityriskscores">;
    getControl(controlName: "ProgramArea"): Xrm.SubGridControl<"ts_operationactivityriskscores">;
    getControl(controlName: "Site"): Xrm.SubGridControl<"ts_operationactivityriskscores">;
    getControl(controlName: "Stakeholder"): Xrm.SubGridControl<"ts_operationactivityriskscores">;
    getControl(controlName: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "header_statecode"): Xrm.OptionSetControl<ts_entityrisk_statecode>;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "ts_calculatedriskscore"): Xrm.NumberControl;
    getControl(controlName: "ts_entityid"): Xrm.StringControl;
    getControl(controlName: "ts_entityname"): Xrm.OptionSetControl<ts_entityrisk_ts_entityname>;
    getControl(controlName: "ts_fiscalyear"): Xrm.LookupControl<"tc_tcfiscalyear">;
    getControl(controlName: "ts_name"): Xrm.StringControl;
    getControl(controlName: "ts_prescribedfrequencyoverride"): Xrm.LookupControl<"ts_prescribedfrequencyoverride">;
    getControl(controlName: "ts_riskapplicationoperationtype"): Xrm.LookupControl<"ovs_operationtype">;
    getControl(controlName: "ts_riskscore"): Xrm.NumberControl;
    getControl(controlName: "ts_siteclass"): Xrm.StringControl;
    getControl(controlName: "ts_usesriskapplicationactivitytype"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "ts_usesriskapplicationoperation"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "ts_usesriskapplicationoperationtype"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "ts_usesriskapplicationprogramarea"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "ts_usesriskapplicationsite"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "ts_usesriskapplicationstakeholder"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "ts_weightedriskscore"): Xrm.NumberControl;
    getControl(controlName: string): undefined;
  }
}
