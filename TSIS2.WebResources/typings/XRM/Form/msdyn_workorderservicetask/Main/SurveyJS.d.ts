declare namespace Form.msdyn_workorderservicetask.Main {
  namespace SurveyJS {
    namespace Tabs {
      interface tab_10 extends Xrm.SectionCollectionBase {
        get(name: "tab_10_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_11 extends Xrm.SectionCollectionBase {
        get(name: "tab_11_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_5 extends Xrm.SectionCollectionBase {
        get(name: "tab_6_section_2"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_6 extends Xrm.SectionCollectionBase {
        get(name: "tab_6_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_7 extends Xrm.SectionCollectionBase {
        get(name: "tab_7_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_8 extends Xrm.SectionCollectionBase {
        get(name: "tab_8_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_9 extends Xrm.SectionCollectionBase {
        get(name: "tab_9_section_1"): Xrm.PageSection;
        get(name: "tab_9_section_3"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_summary extends Xrm.SectionCollectionBase {
        get(name: "InspectionFormSection"): Xrm.PageSection;
        get(name: "QuestionnaireFormSection"): Xrm.PageSection;
        get(name: "section_custom_questionnaire"): Xrm.PageSection;
        get(name: "{1932b377-2e7e-4880-9b0e-477cc529b5fe}_section_2"): Xrm.PageSection;
        get(name: "{1932b377-2e7e-4880-9b0e-477cc529b5fe}_section_3"): Xrm.PageSection;
        get(name: "{594a0ad8-a9a3-4509-9e40-52f6789d7512}"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "msdyn_agreementbookingservicetask"): Xrm.LookupAttribute<"msdyn_agreementbookingservicetask">;
      get(name: "msdyn_booking"): Xrm.LookupAttribute<"bookableresourcebooking">;
      get(name: "msdyn_customerasset"): Xrm.LookupAttribute<"msdyn_customerasset">;
      get(name: "msdyn_description"): Xrm.Attribute<string>;
      get(name: "msdyn_inspection"): Xrm.LookupAttribute<"msdyn_inspection">;
      get(name: "msdyn_inspectiondefinitionid"): Xrm.LookupAttribute<"msdyn_inspectiondefinition">;
      get(name: "msdyn_inspectionenabled"): Xrm.OptionSetAttribute<boolean>;
      get(name: "msdyn_inspectiontaskresult"): Xrm.OptionSetAttribute<msdyn_inspectionresult>;
      get(name: "msdyn_lineorder"): Xrm.NumberAttribute;
      get(name: "msdyn_name"): Xrm.Attribute<string>;
      get(name: "msdyn_percentcomplete"): Xrm.NumberAttribute;
      get(name: "msdyn_surveyboundedoutput"): Xrm.Attribute<any>;
      get(name: "msdyn_tasktype"): Xrm.LookupAttribute<"msdyn_servicetasktype">;
      get(name: "msdyn_workorder"): Xrm.LookupAttribute<"msdyn_workorder">;
      get(name: "msdyn_workorderincident"): Xrm.LookupAttribute<"msdyn_workorderincident">;
      get(name: "ovs_caseid"): Xrm.LookupAttribute<"incident">;
      get(name: "ovs_questionnairedefinition"): Xrm.Attribute<string>;
      get(name: "ovs_questionnaireresponse"): Xrm.Attribute<string>;
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "statecode"): Xrm.OptionSetAttribute<msdyn_workorderservicetask_statecode>;
      get(name: "statuscode"): Xrm.OptionSetAttribute<msdyn_workorderservicetask_statuscode>;
      get(name: "ts_operationtypefilter"): Xrm.LookupAttribute<"ovs_operationtype">;
      get(name: "ts_servicetaskstartdate"): Xrm.DateAttribute;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "CustomQuestionnaireProvisions"): Xrm.SubGridControl<"qm_rclegislation">;
      get(name: "Provisions"): Xrm.SubGridControl<"ovs_workorderservicetaskprovision">;
      get(name: "Subgrid_1"): Xrm.SubGridControl<"sharepointdocument">;
      get(name: "Subgrid_Findings"): Xrm.SubGridControl<"ovs_finding">;
      get(name: "WebResource_Provisions"): Xrm.WebResourceControl;
      get(name: "WebResource_QuestionnaireRender"): Xrm.WebResourceControl;
      get(name: "footer_statecode"): Xrm.OptionSetControl<msdyn_workorderservicetask_statecode>;
      get(name: "msdyn_agreementbookingservicetask"): Xrm.LookupControl<"msdyn_agreementbookingservicetask">;
      get(name: "msdyn_agreementbookingservicetask1"): Xrm.LookupControl<"msdyn_agreementbookingservicetask">;
      get(name: "msdyn_booking"): Xrm.LookupControl<"bookableresourcebooking">;
      get(name: "msdyn_booking1"): Xrm.LookupControl<"bookableresourcebooking">;
      get(name: "msdyn_customerasset"): Xrm.LookupControl<"msdyn_customerasset">;
      get(name: "msdyn_customerasset1"): Xrm.LookupControl<"msdyn_customerasset">;
      get(name: "msdyn_description"): Xrm.StringControl;
      get(name: "msdyn_description1"): Xrm.StringControl;
      get(name: "msdyn_inspection"): Xrm.LookupControl<"msdyn_inspection">;
      get(name: "msdyn_inspectiondefinitionid"): Xrm.LookupControl<"msdyn_inspectiondefinition">;
      get(name: "msdyn_inspectionenabled"): Xrm.OptionSetControl<boolean>;
      get(name: "msdyn_inspectiontaskresult"): Xrm.OptionSetControl<msdyn_inspectionresult>;
      get(name: "msdyn_lineorder"): Xrm.NumberControl;
      get(name: "msdyn_name"): Xrm.StringControl;
      get(name: "msdyn_percentcomplete"): Xrm.NumberControl;
      get(name: "msdyn_surveyboundedoutput"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "msdyn_tasktype"): Xrm.LookupControl<"msdyn_servicetasktype">;
      get(name: "msdyn_workorder"): Xrm.LookupControl<"msdyn_workorder">;
      get(name: "msdyn_workorderincident"): Xrm.LookupControl<"msdyn_workorderincident">;
      get(name: "msdyn_workorderincident1"): Xrm.LookupControl<"msdyn_workorderincident">;
      get(name: "notescontrol"): Xrm.BaseControl;
      get(name: "ovs_caseid"): Xrm.LookupControl<"incident">;
      get(name: "ovs_questionnairedefinition"): Xrm.StringControl;
      get(name: "ovs_questionnaireresponse"): Xrm.StringControl;
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "statecode"): Xrm.OptionSetControl<msdyn_workorderservicetask_statecode>;
      get(name: "statuscode"): Xrm.OptionSetControl<msdyn_workorderservicetask_statuscode>;
      get(name: "ts_operationtypefilter"): Xrm.LookupControl<"ovs_operationtype">;
      get(name: "ts_servicetaskstartdate"): Xrm.DateControl;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "tab_10"): Xrm.PageTab<Tabs.tab_10>;
      get(name: "tab_11"): Xrm.PageTab<Tabs.tab_11>;
      get(name: "tab_5"): Xrm.PageTab<Tabs.tab_5>;
      get(name: "tab_6"): Xrm.PageTab<Tabs.tab_6>;
      get(name: "tab_7"): Xrm.PageTab<Tabs.tab_7>;
      get(name: "tab_8"): Xrm.PageTab<Tabs.tab_8>;
      get(name: "tab_9"): Xrm.PageTab<Tabs.tab_9>;
      get(name: "tab_summary"): Xrm.PageTab<Tabs.tab_summary>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface SurveyJS extends Xrm.PageBase<SurveyJS.Attributes,SurveyJS.Tabs,SurveyJS.Controls> {
    getAttribute(attributeName: "msdyn_agreementbookingservicetask"): Xrm.LookupAttribute<"msdyn_agreementbookingservicetask">;
    getAttribute(attributeName: "msdyn_booking"): Xrm.LookupAttribute<"bookableresourcebooking">;
    getAttribute(attributeName: "msdyn_customerasset"): Xrm.LookupAttribute<"msdyn_customerasset">;
    getAttribute(attributeName: "msdyn_description"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_inspection"): Xrm.LookupAttribute<"msdyn_inspection">;
    getAttribute(attributeName: "msdyn_inspectiondefinitionid"): Xrm.LookupAttribute<"msdyn_inspectiondefinition">;
    getAttribute(attributeName: "msdyn_inspectionenabled"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "msdyn_inspectiontaskresult"): Xrm.OptionSetAttribute<msdyn_inspectionresult>;
    getAttribute(attributeName: "msdyn_lineorder"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_percentcomplete"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_surveyboundedoutput"): Xrm.Attribute<any>;
    getAttribute(attributeName: "msdyn_tasktype"): Xrm.LookupAttribute<"msdyn_servicetasktype">;
    getAttribute(attributeName: "msdyn_workorder"): Xrm.LookupAttribute<"msdyn_workorder">;
    getAttribute(attributeName: "msdyn_workorderincident"): Xrm.LookupAttribute<"msdyn_workorderincident">;
    getAttribute(attributeName: "ovs_caseid"): Xrm.LookupAttribute<"incident">;
    getAttribute(attributeName: "ovs_questionnairedefinition"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ovs_questionnaireresponse"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "statecode"): Xrm.OptionSetAttribute<msdyn_workorderservicetask_statecode>;
    getAttribute(attributeName: "statuscode"): Xrm.OptionSetAttribute<msdyn_workorderservicetask_statuscode>;
    getAttribute(attributeName: "ts_operationtypefilter"): Xrm.LookupAttribute<"ovs_operationtype">;
    getAttribute(attributeName: "ts_servicetaskstartdate"): Xrm.DateAttribute;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "CustomQuestionnaireProvisions"): Xrm.SubGridControl<"qm_rclegislation">;
    getControl(controlName: "Provisions"): Xrm.SubGridControl<"ovs_workorderservicetaskprovision">;
    getControl(controlName: "Subgrid_1"): Xrm.SubGridControl<"sharepointdocument">;
    getControl(controlName: "Subgrid_Findings"): Xrm.SubGridControl<"ovs_finding">;
    getControl(controlName: "WebResource_Provisions"): Xrm.WebResourceControl;
    getControl(controlName: "WebResource_QuestionnaireRender"): Xrm.WebResourceControl;
    getControl(controlName: "footer_statecode"): Xrm.OptionSetControl<msdyn_workorderservicetask_statecode>;
    getControl(controlName: "msdyn_agreementbookingservicetask"): Xrm.LookupControl<"msdyn_agreementbookingservicetask">;
    getControl(controlName: "msdyn_agreementbookingservicetask1"): Xrm.LookupControl<"msdyn_agreementbookingservicetask">;
    getControl(controlName: "msdyn_booking"): Xrm.LookupControl<"bookableresourcebooking">;
    getControl(controlName: "msdyn_booking1"): Xrm.LookupControl<"bookableresourcebooking">;
    getControl(controlName: "msdyn_customerasset"): Xrm.LookupControl<"msdyn_customerasset">;
    getControl(controlName: "msdyn_customerasset1"): Xrm.LookupControl<"msdyn_customerasset">;
    getControl(controlName: "msdyn_description"): Xrm.StringControl;
    getControl(controlName: "msdyn_description1"): Xrm.StringControl;
    getControl(controlName: "msdyn_inspection"): Xrm.LookupControl<"msdyn_inspection">;
    getControl(controlName: "msdyn_inspectiondefinitionid"): Xrm.LookupControl<"msdyn_inspectiondefinition">;
    getControl(controlName: "msdyn_inspectionenabled"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "msdyn_inspectiontaskresult"): Xrm.OptionSetControl<msdyn_inspectionresult>;
    getControl(controlName: "msdyn_lineorder"): Xrm.NumberControl;
    getControl(controlName: "msdyn_name"): Xrm.StringControl;
    getControl(controlName: "msdyn_percentcomplete"): Xrm.NumberControl;
    getControl(controlName: "msdyn_surveyboundedoutput"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "msdyn_tasktype"): Xrm.LookupControl<"msdyn_servicetasktype">;
    getControl(controlName: "msdyn_workorder"): Xrm.LookupControl<"msdyn_workorder">;
    getControl(controlName: "msdyn_workorderincident"): Xrm.LookupControl<"msdyn_workorderincident">;
    getControl(controlName: "msdyn_workorderincident1"): Xrm.LookupControl<"msdyn_workorderincident">;
    getControl(controlName: "notescontrol"): Xrm.BaseControl;
    getControl(controlName: "ovs_caseid"): Xrm.LookupControl<"incident">;
    getControl(controlName: "ovs_questionnairedefinition"): Xrm.StringControl;
    getControl(controlName: "ovs_questionnaireresponse"): Xrm.StringControl;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "statecode"): Xrm.OptionSetControl<msdyn_workorderservicetask_statecode>;
    getControl(controlName: "statuscode"): Xrm.OptionSetControl<msdyn_workorderservicetask_statuscode>;
    getControl(controlName: "ts_operationtypefilter"): Xrm.LookupControl<"ovs_operationtype">;
    getControl(controlName: "ts_servicetaskstartdate"): Xrm.DateControl;
    getControl(controlName: string): undefined;
  }
}
