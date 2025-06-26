declare namespace Form.ts_operationactivityriskscores.Main {
  namespace Information {
    namespace Tabs {
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "statecode"): Xrm.OptionSetAttribute<ts_operationactivityriskscores_statecode>;
      get(name: "ts_activitytypeentityrisk"): Xrm.LookupAttribute<"ts_entityrisk">;
      get(name: "ts_activitytyperiskscore"): Xrm.NumberAttribute;
      get(name: "ts_calculatedriskscore"): Xrm.NumberAttribute;
      get(name: "ts_fiscalyear"): Xrm.LookupAttribute<"tc_tcfiscalyear">;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: "ts_operationactivity"): Xrm.LookupAttribute<"ts_operationactivity">;
      get(name: "ts_operationentityrisk"): Xrm.LookupAttribute<"ts_entityrisk">;
      get(name: "ts_operationriskscore"): Xrm.NumberAttribute;
      get(name: "ts_operationtypeentityrisk"): Xrm.LookupAttribute<"ts_entityrisk">;
      get(name: "ts_operationtyperiskscore"): Xrm.NumberAttribute;
      get(name: "ts_prescribedfrequencyoverride"): Xrm.LookupAttribute<"ts_prescribedfrequencyoverride">;
      get(name: "ts_programareaentityrisk"): Xrm.LookupAttribute<"ts_entityrisk">;
      get(name: "ts_programareariskscore"): Xrm.NumberAttribute;
      get(name: "ts_riskapplication"): Xrm.OptionSetAttribute<boolean>;
      get(name: "ts_riskapplicationscore"): Xrm.NumberAttribute;
      get(name: "ts_riskfrequency"): Xrm.LookupAttribute<"ts_riskfrequency">;
      get(name: "ts_riskrating"): Xrm.LookupAttribute<"ts_riskrating">;
      get(name: "ts_siteentityrisk"): Xrm.LookupAttribute<"ts_entityrisk">;
      get(name: "ts_siteriskscore"): Xrm.NumberAttribute;
      get(name: "ts_stakeholderentityrisk"): Xrm.LookupAttribute<"ts_entityrisk">;
      get(name: "ts_stakeholderriskscore"): Xrm.NumberAttribute;
      get(name: "ts_usesriskapplication"): Xrm.OptionSetAttribute<boolean>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "header_statecode"): Xrm.OptionSetControl<ts_operationactivityriskscores_statecode>;
      get(name: "ts_activitytypeentityrisk"): Xrm.LookupControl<"ts_entityrisk">;
      get(name: "ts_activitytyperiskscore"): Xrm.NumberControl;
      get(name: "ts_calculatedriskscore"): Xrm.NumberControl;
      get(name: "ts_calculatedriskscore1"): Xrm.NumberControl;
      get(name: "ts_fiscalyear"): Xrm.LookupControl<"tc_tcfiscalyear">;
      get(name: "ts_name"): Xrm.StringControl;
      get(name: "ts_operationactivity"): Xrm.LookupControl<"ts_operationactivity">;
      get(name: "ts_operationentityrisk"): Xrm.LookupControl<"ts_entityrisk">;
      get(name: "ts_operationriskscore"): Xrm.NumberControl;
      get(name: "ts_operationtypeentityrisk"): Xrm.LookupControl<"ts_entityrisk">;
      get(name: "ts_operationtyperiskscore"): Xrm.NumberControl;
      get(name: "ts_prescribedfrequencyoverride"): Xrm.LookupControl<"ts_prescribedfrequencyoverride">;
      get(name: "ts_programareaentityrisk"): Xrm.LookupControl<"ts_entityrisk">;
      get(name: "ts_programareariskscore"): Xrm.NumberControl;
      get(name: "ts_riskapplication"): Xrm.OptionSetControl<boolean>;
      get(name: "ts_riskapplicationscore"): Xrm.NumberControl;
      get(name: "ts_riskfrequency"): Xrm.LookupControl<"ts_riskfrequency">;
      get(name: "ts_riskrating"): Xrm.LookupControl<"ts_riskrating">;
      get(name: "ts_siteentityrisk"): Xrm.LookupControl<"ts_entityrisk">;
      get(name: "ts_siteriskscore"): Xrm.NumberControl;
      get(name: "ts_stakeholderentityrisk"): Xrm.LookupControl<"ts_entityrisk">;
      get(name: "ts_stakeholderriskscore"): Xrm.NumberControl;
      get(name: "ts_usesriskapplication"): Xrm.OptionSetControl<boolean>;
      get(name: "ts_usesriskapplication1"): Xrm.OptionSetControl<boolean>;
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
    getAttribute(attributeName: "statecode"): Xrm.OptionSetAttribute<ts_operationactivityriskscores_statecode>;
    getAttribute(attributeName: "ts_activitytypeentityrisk"): Xrm.LookupAttribute<"ts_entityrisk">;
    getAttribute(attributeName: "ts_activitytyperiskscore"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_calculatedriskscore"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_fiscalyear"): Xrm.LookupAttribute<"tc_tcfiscalyear">;
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_operationactivity"): Xrm.LookupAttribute<"ts_operationactivity">;
    getAttribute(attributeName: "ts_operationentityrisk"): Xrm.LookupAttribute<"ts_entityrisk">;
    getAttribute(attributeName: "ts_operationriskscore"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_operationtypeentityrisk"): Xrm.LookupAttribute<"ts_entityrisk">;
    getAttribute(attributeName: "ts_operationtyperiskscore"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_prescribedfrequencyoverride"): Xrm.LookupAttribute<"ts_prescribedfrequencyoverride">;
    getAttribute(attributeName: "ts_programareaentityrisk"): Xrm.LookupAttribute<"ts_entityrisk">;
    getAttribute(attributeName: "ts_programareariskscore"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_riskapplication"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "ts_riskapplicationscore"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_riskfrequency"): Xrm.LookupAttribute<"ts_riskfrequency">;
    getAttribute(attributeName: "ts_riskrating"): Xrm.LookupAttribute<"ts_riskrating">;
    getAttribute(attributeName: "ts_siteentityrisk"): Xrm.LookupAttribute<"ts_entityrisk">;
    getAttribute(attributeName: "ts_siteriskscore"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_stakeholderentityrisk"): Xrm.LookupAttribute<"ts_entityrisk">;
    getAttribute(attributeName: "ts_stakeholderriskscore"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_usesriskapplication"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "header_statecode"): Xrm.OptionSetControl<ts_operationactivityriskscores_statecode>;
    getControl(controlName: "ts_activitytypeentityrisk"): Xrm.LookupControl<"ts_entityrisk">;
    getControl(controlName: "ts_activitytyperiskscore"): Xrm.NumberControl;
    getControl(controlName: "ts_calculatedriskscore"): Xrm.NumberControl;
    getControl(controlName: "ts_calculatedriskscore1"): Xrm.NumberControl;
    getControl(controlName: "ts_fiscalyear"): Xrm.LookupControl<"tc_tcfiscalyear">;
    getControl(controlName: "ts_name"): Xrm.StringControl;
    getControl(controlName: "ts_operationactivity"): Xrm.LookupControl<"ts_operationactivity">;
    getControl(controlName: "ts_operationentityrisk"): Xrm.LookupControl<"ts_entityrisk">;
    getControl(controlName: "ts_operationriskscore"): Xrm.NumberControl;
    getControl(controlName: "ts_operationtypeentityrisk"): Xrm.LookupControl<"ts_entityrisk">;
    getControl(controlName: "ts_operationtyperiskscore"): Xrm.NumberControl;
    getControl(controlName: "ts_prescribedfrequencyoverride"): Xrm.LookupControl<"ts_prescribedfrequencyoverride">;
    getControl(controlName: "ts_programareaentityrisk"): Xrm.LookupControl<"ts_entityrisk">;
    getControl(controlName: "ts_programareariskscore"): Xrm.NumberControl;
    getControl(controlName: "ts_riskapplication"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "ts_riskapplicationscore"): Xrm.NumberControl;
    getControl(controlName: "ts_riskfrequency"): Xrm.LookupControl<"ts_riskfrequency">;
    getControl(controlName: "ts_riskrating"): Xrm.LookupControl<"ts_riskrating">;
    getControl(controlName: "ts_siteentityrisk"): Xrm.LookupControl<"ts_entityrisk">;
    getControl(controlName: "ts_siteriskscore"): Xrm.NumberControl;
    getControl(controlName: "ts_stakeholderentityrisk"): Xrm.LookupControl<"ts_entityrisk">;
    getControl(controlName: "ts_stakeholderriskscore"): Xrm.NumberControl;
    getControl(controlName: "ts_usesriskapplication"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "ts_usesriskapplication1"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: string): undefined;
  }
}
