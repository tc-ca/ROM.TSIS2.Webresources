declare namespace Form.ts_workorderservicetaskworkspace.Main {
  namespace Information {
    namespace Tabs {
      interface tab_Oversight extends Xrm.SectionCollectionBase {
        get(name: "tab_11_section_1"): Xrm.PageSection;
        get(name: "tab_Oversight_AirCarrier"): Xrm.PageSection;
        get(name: "tab_Oversight_Aircraft"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_questionnaire extends Xrm.SectionCollectionBase {
        get(name: "QuestionnaireFormSection"): Xrm.PageSection;
        get(name: "section_custom_questionnaire"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_summary extends Xrm.SectionCollectionBase {
        get(name: "tab_3_section_1"): Xrm.PageSection;
        get(name: "tab_summary_section_accesscontrol"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "statecode"): Xrm.OptionSetAttribute<ts_workorderservicetaskworkspace_statecode>;
      get(name: "statuscode"): Xrm.OptionSetAttribute<ts_workorderservicetaskworkspace_statuscode>;
      get(name: "ts_accesscontrol"): Xrm.Attribute<any>;
      get(name: "ts_aircraftmodel"): Xrm.OptionSetAttribute<ts_aircraftmodel>;
      get(name: "ts_aocoperation"): Xrm.LookupAttribute<"ovs_operation">;
      get(name: "ts_aocoperationtype"): Xrm.LookupAttribute<"ovs_operationtype">;
      get(name: "ts_aocsite"): Xrm.LookupAttribute<"msdyn_functionallocation">;
      get(name: "ts_aocstakeholder"): Xrm.LookupAttribute<"account">;
      get(name: "ts_brandname"): Xrm.OptionSetAttribute<ts_aircarrierbrandname>;
      get(name: "ts_fromoffline"): Xrm.OptionSetAttribute<boolean>;
      get(name: "ts_legislationsourcefilter"): Xrm.LookupAttribute<"qm_tylegislationsource">;
      get(name: "ts_legislationtypefilter"): Xrm.LookupAttribute<"qm_tylegislationtype">;
      get(name: "ts_mandatory"): Xrm.Attribute<any>;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: "ts_percentcomplete"): Xrm.NumberAttribute;
      get(name: "ts_questionnairedefinition"): Xrm.Attribute<string>;
      get(name: "ts_questionnaireresponse"): Xrm.Attribute<string>;
      get(name: "ts_tasktype"): Xrm.LookupAttribute<"msdyn_servicetasktype">;
      get(name: "ts_workorder"): Xrm.Attribute<any>;
      get(name: "ts_workorderservicetask"): Xrm.LookupAttribute<"msdyn_workorderservicetask">;
      get(name: "ts_workorderservicetaskenddate"): Xrm.DateAttribute;
      get(name: "ts_workorderservicetaskstartdate"): Xrm.DateAttribute;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "Access_Users"): Xrm.SubGridControl<"systemuser">;
      get(name: "CustomQuestionnaireProvisions"): Xrm.SubGridControl<"qm_rclegislation">;
      get(name: "WebResource_QuestionnaireRender"): Xrm.WebResourceControl;
      get(name: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "statecode"): Xrm.OptionSetControl<ts_workorderservicetaskworkspace_statecode>;
      get(name: "statuscode"): Xrm.OptionSetControl<ts_workorderservicetaskworkspace_statuscode>;
      get(name: "ts_accesscontrol"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "ts_aircraftmodel"): Xrm.OptionSetControl<ts_aircraftmodel>;
      get(name: "ts_aocoperation"): Xrm.LookupControl<"ovs_operation">;
      get(name: "ts_aocoperationtype"): Xrm.LookupControl<"ovs_operationtype">;
      get(name: "ts_aocsite"): Xrm.LookupControl<"msdyn_functionallocation">;
      get(name: "ts_aocstakeholder"): Xrm.LookupControl<"account">;
      get(name: "ts_brandname"): Xrm.OptionSetControl<ts_aircarrierbrandname>;
      get(name: "ts_fromoffline"): Xrm.OptionSetControl<boolean>;
      get(name: "ts_legislationsourcefilter"): Xrm.LookupControl<"qm_tylegislationsource">;
      get(name: "ts_legislationtypefilter"): Xrm.LookupControl<"qm_tylegislationtype">;
      get(name: "ts_mandatory"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "ts_name"): Xrm.StringControl;
      get(name: "ts_percentcomplete"): Xrm.NumberControl;
      get(name: "ts_questionnairedefinition"): Xrm.StringControl;
      get(name: "ts_questionnaireresponse"): Xrm.StringControl;
      get(name: "ts_tasktype"): Xrm.LookupControl<"msdyn_servicetasktype">;
      get(name: "ts_workorder"): Xrm.LookupControl<"msdyn_workorder">;
      get(name: "ts_workorderservicetask"): Xrm.LookupControl<"msdyn_workorderservicetask">;
      get(name: "ts_workorderservicetaskenddate"): Xrm.DateControl;
      get(name: "ts_workorderservicetaskstartdate"): Xrm.DateControl;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "tab_Oversight"): Xrm.PageTab<Tabs.tab_Oversight>;
      get(name: "tab_questionnaire"): Xrm.PageTab<Tabs.tab_questionnaire>;
      get(name: "tab_summary"): Xrm.PageTab<Tabs.tab_summary>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Information extends Xrm.PageBase<Information.Attributes,Information.Tabs,Information.Controls> {
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "statecode"): Xrm.OptionSetAttribute<ts_workorderservicetaskworkspace_statecode>;
    getAttribute(attributeName: "statuscode"): Xrm.OptionSetAttribute<ts_workorderservicetaskworkspace_statuscode>;
    getAttribute(attributeName: "ts_accesscontrol"): Xrm.Attribute<any>;
    getAttribute(attributeName: "ts_aircraftmodel"): Xrm.OptionSetAttribute<ts_aircraftmodel>;
    getAttribute(attributeName: "ts_aocoperation"): Xrm.LookupAttribute<"ovs_operation">;
    getAttribute(attributeName: "ts_aocoperationtype"): Xrm.LookupAttribute<"ovs_operationtype">;
    getAttribute(attributeName: "ts_aocsite"): Xrm.LookupAttribute<"msdyn_functionallocation">;
    getAttribute(attributeName: "ts_aocstakeholder"): Xrm.LookupAttribute<"account">;
    getAttribute(attributeName: "ts_brandname"): Xrm.OptionSetAttribute<ts_aircarrierbrandname>;
    getAttribute(attributeName: "ts_fromoffline"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "ts_legislationsourcefilter"): Xrm.LookupAttribute<"qm_tylegislationsource">;
    getAttribute(attributeName: "ts_legislationtypefilter"): Xrm.LookupAttribute<"qm_tylegislationtype">;
    getAttribute(attributeName: "ts_mandatory"): Xrm.Attribute<any>;
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_percentcomplete"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_questionnairedefinition"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_questionnaireresponse"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_tasktype"): Xrm.LookupAttribute<"msdyn_servicetasktype">;
    getAttribute(attributeName: "ts_workorder"): Xrm.Attribute<any>;
    getAttribute(attributeName: "ts_workorderservicetask"): Xrm.LookupAttribute<"msdyn_workorderservicetask">;
    getAttribute(attributeName: "ts_workorderservicetaskenddate"): Xrm.DateAttribute;
    getAttribute(attributeName: "ts_workorderservicetaskstartdate"): Xrm.DateAttribute;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "Access_Users"): Xrm.SubGridControl<"systemuser">;
    getControl(controlName: "CustomQuestionnaireProvisions"): Xrm.SubGridControl<"qm_rclegislation">;
    getControl(controlName: "WebResource_QuestionnaireRender"): Xrm.WebResourceControl;
    getControl(controlName: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "statecode"): Xrm.OptionSetControl<ts_workorderservicetaskworkspace_statecode>;
    getControl(controlName: "statuscode"): Xrm.OptionSetControl<ts_workorderservicetaskworkspace_statuscode>;
    getControl(controlName: "ts_accesscontrol"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "ts_aircraftmodel"): Xrm.OptionSetControl<ts_aircraftmodel>;
    getControl(controlName: "ts_aocoperation"): Xrm.LookupControl<"ovs_operation">;
    getControl(controlName: "ts_aocoperationtype"): Xrm.LookupControl<"ovs_operationtype">;
    getControl(controlName: "ts_aocsite"): Xrm.LookupControl<"msdyn_functionallocation">;
    getControl(controlName: "ts_aocstakeholder"): Xrm.LookupControl<"account">;
    getControl(controlName: "ts_brandname"): Xrm.OptionSetControl<ts_aircarrierbrandname>;
    getControl(controlName: "ts_fromoffline"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "ts_legislationsourcefilter"): Xrm.LookupControl<"qm_tylegislationsource">;
    getControl(controlName: "ts_legislationtypefilter"): Xrm.LookupControl<"qm_tylegislationtype">;
    getControl(controlName: "ts_mandatory"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "ts_name"): Xrm.StringControl;
    getControl(controlName: "ts_percentcomplete"): Xrm.NumberControl;
    getControl(controlName: "ts_questionnairedefinition"): Xrm.StringControl;
    getControl(controlName: "ts_questionnaireresponse"): Xrm.StringControl;
    getControl(controlName: "ts_tasktype"): Xrm.LookupControl<"msdyn_servicetasktype">;
    getControl(controlName: "ts_workorder"): Xrm.LookupControl<"msdyn_workorder">;
    getControl(controlName: "ts_workorderservicetask"): Xrm.LookupControl<"msdyn_workorderservicetask">;
    getControl(controlName: "ts_workorderservicetaskenddate"): Xrm.DateControl;
    getControl(controlName: "ts_workorderservicetaskstartdate"): Xrm.DateControl;
    getControl(controlName: string): undefined;
  }
}
