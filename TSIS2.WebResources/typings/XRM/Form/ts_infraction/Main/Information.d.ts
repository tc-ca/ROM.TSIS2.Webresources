declare namespace Form.ts_infraction.Main {
  namespace Information {
    namespace Tabs {
      interface tab_2 extends Xrm.SectionCollectionBase {
        get(name: "tab_2_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_RATE extends Xrm.SectionCollectionBase {
        get(name: "RATE_manager_review"): Xrm.PageSection;
        get(name: "RATE_proposed_section"): Xrm.PageSection;
        get(name: "_section_144"): Xrm.PageSection;
        get(name: "tab_3_section_1"): Xrm.PageSection;
        get(name: "tab_3_section_3"): Xrm.PageSection;
        get(name: "tab_3_section_4"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "statuscode"): Xrm.OptionSetAttribute<ts_infraction_statuscode>;
      get(name: "ts_acceptraterecommendation"): Xrm.OptionSetAttribute<ts_yesno>;
      get(name: "ts_contact"): Xrm.LookupAttribute<"contact">;
      get(name: "ts_finalenforcementaction"): Xrm.OptionSetAttribute<ts_finalenforcementaction>;
      get(name: "ts_functionallocation"): Xrm.LookupAttribute<"msdyn_functionallocation">;
      get(name: "ts_infractiontype"): Xrm.OptionSetAttribute<ts_infractiontype>;
      get(name: "ts_issueaddressedonsite"): Xrm.OptionSetAttribute<ts_yesno>;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: "ts_noncompliancetimeframe"): Xrm.OptionSetAttribute<ts_noncompliancetimeframe>;
      get(name: "ts_operation"): Xrm.LookupAttribute<"ovs_operation">;
      get(name: "ts_operationtype"): Xrm.LookupAttribute<"ovs_operationtype">;
      get(name: "ts_rateactualorpotentialharm"): Xrm.LookupAttribute<"ts_assessmentrating">;
      get(name: "ts_rateapprovingteam"): Xrm.LookupAttribute<"team">;
      get(name: "ts_ratecooperation"): Xrm.LookupAttribute<"ts_assessmentrating">;
      get(name: "ts_rateeconomicbenefit"): Xrm.LookupAttribute<"ts_assessmentrating">;
      get(name: "ts_rateenforcementjustification"): Xrm.Attribute<string>;
      get(name: "ts_rateenforcementrecommendation"): Xrm.OptionSetAttribute<ts_raterecommendations>;
      get(name: "ts_rategeneralnoncompliancehistory"): Xrm.LookupAttribute<"ts_assessmentrating">;
      get(name: "ts_rateinspectorrecommendation"): Xrm.OptionSetAttribute<ts_raterecommendations>;
      get(name: "ts_rateintentionality"): Xrm.LookupAttribute<"ts_assessmentrating">;
      get(name: "ts_ratemanager"): Xrm.LookupAttribute<"systemuser">;
      get(name: "ts_ratemanageralternativerecommendation"): Xrm.OptionSetAttribute<ts_raterecommendations>;
      get(name: "ts_ratemanagerdecision"): Xrm.OptionSetAttribute<ts_ratemanagerdecision>;
      get(name: "ts_ratemanagerenforcementjustification"): Xrm.Attribute<string>;
      get(name: "ts_ratemitigationofharm"): Xrm.LookupAttribute<"ts_assessmentrating">;
      get(name: "ts_ratepreventingrecurrence"): Xrm.LookupAttribute<"ts_assessmentrating">;
      get(name: "ts_ratepreviousenforcementmechanism"): Xrm.OptionSetAttribute<ts_ratespecificenforcementhistory>;
      get(name: "ts_rateresponsibility"): Xrm.LookupAttribute<"ts_assessmentrating">;
      get(name: "ts_ratespecificnoncompliancehistory"): Xrm.OptionSetAttribute<ts_ratespecificcompliancehistory>;
      get(name: "ts_stakeholder"): Xrm.LookupAttribute<"account">;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "Subgrid_new_1"): Xrm.SubGridControl<"ovs_finding">;
      get(name: "WebResource_RATEFactorGuide_AcceptanceOfResponsibility"): Xrm.WebResourceControl;
      get(name: "WebResource_RATEFactorGuide_ActualPotentialHarmVulnerability"): Xrm.WebResourceControl;
      get(name: "WebResource_RATEFactorGuide_Cooperation"): Xrm.WebResourceControl;
      get(name: "WebResource_RATEFactorGuide_EconomicBenefit"): Xrm.WebResourceControl;
      get(name: "WebResource_RATEFactorGuide_GeneralNonComplianceHistory"): Xrm.WebResourceControl;
      get(name: "WebResource_RATEFactorGuide_Intentionality"): Xrm.WebResourceControl;
      get(name: "WebResource_RATEFactorGuide_MitigationOfHarm"): Xrm.WebResourceControl;
      get(name: "WebResource_RATEFactorGuide_PreventionOfRecurrence"): Xrm.WebResourceControl;
      get(name: "WebResource_RATEFactorGuide_SpecificNonComplianceHistory"): Xrm.WebResourceControl;
      get(name: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "header_statuscode"): Xrm.OptionSetControl<ts_infraction_statuscode>;
      get(name: "header_ts_rateenforcementrecommendation"): Xrm.OptionSetControl<ts_raterecommendations>;
      get(name: "ts_acceptraterecommendation"): Xrm.OptionSetControl<ts_yesno>;
      get(name: "ts_contact"): Xrm.LookupControl<"contact">;
      get(name: "ts_finalenforcementaction"): Xrm.OptionSetControl<ts_finalenforcementaction>;
      get(name: "ts_functionallocation"): Xrm.LookupControl<"msdyn_functionallocation">;
      get(name: "ts_infractiontype"): Xrm.OptionSetControl<ts_infractiontype>;
      get(name: "ts_issueaddressedonsite"): Xrm.OptionSetControl<ts_yesno>;
      get(name: "ts_name"): Xrm.StringControl;
      get(name: "ts_noncompliancetimeframe"): Xrm.OptionSetControl<ts_noncompliancetimeframe>;
      get(name: "ts_operation"): Xrm.LookupControl<"ovs_operation">;
      get(name: "ts_operationtype"): Xrm.LookupControl<"ovs_operationtype">;
      get(name: "ts_rateactualorpotentialharm"): Xrm.LookupControl<"ts_assessmentrating">;
      get(name: "ts_rateapprovingteam"): Xrm.LookupControl<"team">;
      get(name: "ts_ratecooperation"): Xrm.LookupControl<"ts_assessmentrating">;
      get(name: "ts_rateeconomicbenefit"): Xrm.LookupControl<"ts_assessmentrating">;
      get(name: "ts_rateenforcementjustification"): Xrm.StringControl;
      get(name: "ts_rateenforcementrecommendation"): Xrm.OptionSetControl<ts_raterecommendations>;
      get(name: "ts_rategeneralnoncompliancehistory"): Xrm.LookupControl<"ts_assessmentrating">;
      get(name: "ts_rateinspectorrecommendation"): Xrm.OptionSetControl<ts_raterecommendations>;
      get(name: "ts_rateintentionality"): Xrm.LookupControl<"ts_assessmentrating">;
      get(name: "ts_ratemanager"): Xrm.LookupControl<"systemuser">;
      get(name: "ts_ratemanageralternativerecommendation"): Xrm.OptionSetControl<ts_raterecommendations>;
      get(name: "ts_ratemanagerdecision"): Xrm.OptionSetControl<ts_ratemanagerdecision>;
      get(name: "ts_ratemanagerenforcementjustification"): Xrm.StringControl;
      get(name: "ts_ratemitigationofharm"): Xrm.LookupControl<"ts_assessmentrating">;
      get(name: "ts_ratepreventingrecurrence"): Xrm.LookupControl<"ts_assessmentrating">;
      get(name: "ts_ratepreviousenforcementmechanism"): Xrm.OptionSetControl<ts_ratespecificenforcementhistory>;
      get(name: "ts_rateresponsibility"): Xrm.LookupControl<"ts_assessmentrating">;
      get(name: "ts_ratespecificnoncompliancehistory"): Xrm.OptionSetControl<ts_ratespecificcompliancehistory>;
      get(name: "ts_stakeholder"): Xrm.LookupControl<"account">;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "tab_2"): Xrm.PageTab<Tabs.tab_2>;
      get(name: "tab_RATE"): Xrm.PageTab<Tabs.tab_RATE>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Information extends Xrm.PageBase<Information.Attributes,Information.Tabs,Information.Controls> {
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "statuscode"): Xrm.OptionSetAttribute<ts_infraction_statuscode>;
    getAttribute(attributeName: "ts_acceptraterecommendation"): Xrm.OptionSetAttribute<ts_yesno>;
    getAttribute(attributeName: "ts_contact"): Xrm.LookupAttribute<"contact">;
    getAttribute(attributeName: "ts_finalenforcementaction"): Xrm.OptionSetAttribute<ts_finalenforcementaction>;
    getAttribute(attributeName: "ts_functionallocation"): Xrm.LookupAttribute<"msdyn_functionallocation">;
    getAttribute(attributeName: "ts_infractiontype"): Xrm.OptionSetAttribute<ts_infractiontype>;
    getAttribute(attributeName: "ts_issueaddressedonsite"): Xrm.OptionSetAttribute<ts_yesno>;
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_noncompliancetimeframe"): Xrm.OptionSetAttribute<ts_noncompliancetimeframe>;
    getAttribute(attributeName: "ts_operation"): Xrm.LookupAttribute<"ovs_operation">;
    getAttribute(attributeName: "ts_operationtype"): Xrm.LookupAttribute<"ovs_operationtype">;
    getAttribute(attributeName: "ts_rateactualorpotentialharm"): Xrm.LookupAttribute<"ts_assessmentrating">;
    getAttribute(attributeName: "ts_rateapprovingteam"): Xrm.LookupAttribute<"team">;
    getAttribute(attributeName: "ts_ratecooperation"): Xrm.LookupAttribute<"ts_assessmentrating">;
    getAttribute(attributeName: "ts_rateeconomicbenefit"): Xrm.LookupAttribute<"ts_assessmentrating">;
    getAttribute(attributeName: "ts_rateenforcementjustification"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_rateenforcementrecommendation"): Xrm.OptionSetAttribute<ts_raterecommendations>;
    getAttribute(attributeName: "ts_rategeneralnoncompliancehistory"): Xrm.LookupAttribute<"ts_assessmentrating">;
    getAttribute(attributeName: "ts_rateinspectorrecommendation"): Xrm.OptionSetAttribute<ts_raterecommendations>;
    getAttribute(attributeName: "ts_rateintentionality"): Xrm.LookupAttribute<"ts_assessmentrating">;
    getAttribute(attributeName: "ts_ratemanager"): Xrm.LookupAttribute<"systemuser">;
    getAttribute(attributeName: "ts_ratemanageralternativerecommendation"): Xrm.OptionSetAttribute<ts_raterecommendations>;
    getAttribute(attributeName: "ts_ratemanagerdecision"): Xrm.OptionSetAttribute<ts_ratemanagerdecision>;
    getAttribute(attributeName: "ts_ratemanagerenforcementjustification"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_ratemitigationofharm"): Xrm.LookupAttribute<"ts_assessmentrating">;
    getAttribute(attributeName: "ts_ratepreventingrecurrence"): Xrm.LookupAttribute<"ts_assessmentrating">;
    getAttribute(attributeName: "ts_ratepreviousenforcementmechanism"): Xrm.OptionSetAttribute<ts_ratespecificenforcementhistory>;
    getAttribute(attributeName: "ts_rateresponsibility"): Xrm.LookupAttribute<"ts_assessmentrating">;
    getAttribute(attributeName: "ts_ratespecificnoncompliancehistory"): Xrm.OptionSetAttribute<ts_ratespecificcompliancehistory>;
    getAttribute(attributeName: "ts_stakeholder"): Xrm.LookupAttribute<"account">;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "Subgrid_new_1"): Xrm.SubGridControl<"ovs_finding">;
    getControl(controlName: "WebResource_RATEFactorGuide_AcceptanceOfResponsibility"): Xrm.WebResourceControl;
    getControl(controlName: "WebResource_RATEFactorGuide_ActualPotentialHarmVulnerability"): Xrm.WebResourceControl;
    getControl(controlName: "WebResource_RATEFactorGuide_Cooperation"): Xrm.WebResourceControl;
    getControl(controlName: "WebResource_RATEFactorGuide_EconomicBenefit"): Xrm.WebResourceControl;
    getControl(controlName: "WebResource_RATEFactorGuide_GeneralNonComplianceHistory"): Xrm.WebResourceControl;
    getControl(controlName: "WebResource_RATEFactorGuide_Intentionality"): Xrm.WebResourceControl;
    getControl(controlName: "WebResource_RATEFactorGuide_MitigationOfHarm"): Xrm.WebResourceControl;
    getControl(controlName: "WebResource_RATEFactorGuide_PreventionOfRecurrence"): Xrm.WebResourceControl;
    getControl(controlName: "WebResource_RATEFactorGuide_SpecificNonComplianceHistory"): Xrm.WebResourceControl;
    getControl(controlName: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "header_statuscode"): Xrm.OptionSetControl<ts_infraction_statuscode>;
    getControl(controlName: "header_ts_rateenforcementrecommendation"): Xrm.OptionSetControl<ts_raterecommendations>;
    getControl(controlName: "ts_acceptraterecommendation"): Xrm.OptionSetControl<ts_yesno>;
    getControl(controlName: "ts_contact"): Xrm.LookupControl<"contact">;
    getControl(controlName: "ts_finalenforcementaction"): Xrm.OptionSetControl<ts_finalenforcementaction>;
    getControl(controlName: "ts_functionallocation"): Xrm.LookupControl<"msdyn_functionallocation">;
    getControl(controlName: "ts_infractiontype"): Xrm.OptionSetControl<ts_infractiontype>;
    getControl(controlName: "ts_issueaddressedonsite"): Xrm.OptionSetControl<ts_yesno>;
    getControl(controlName: "ts_name"): Xrm.StringControl;
    getControl(controlName: "ts_noncompliancetimeframe"): Xrm.OptionSetControl<ts_noncompliancetimeframe>;
    getControl(controlName: "ts_operation"): Xrm.LookupControl<"ovs_operation">;
    getControl(controlName: "ts_operationtype"): Xrm.LookupControl<"ovs_operationtype">;
    getControl(controlName: "ts_rateactualorpotentialharm"): Xrm.LookupControl<"ts_assessmentrating">;
    getControl(controlName: "ts_rateapprovingteam"): Xrm.LookupControl<"team">;
    getControl(controlName: "ts_ratecooperation"): Xrm.LookupControl<"ts_assessmentrating">;
    getControl(controlName: "ts_rateeconomicbenefit"): Xrm.LookupControl<"ts_assessmentrating">;
    getControl(controlName: "ts_rateenforcementjustification"): Xrm.StringControl;
    getControl(controlName: "ts_rateenforcementrecommendation"): Xrm.OptionSetControl<ts_raterecommendations>;
    getControl(controlName: "ts_rategeneralnoncompliancehistory"): Xrm.LookupControl<"ts_assessmentrating">;
    getControl(controlName: "ts_rateinspectorrecommendation"): Xrm.OptionSetControl<ts_raterecommendations>;
    getControl(controlName: "ts_rateintentionality"): Xrm.LookupControl<"ts_assessmentrating">;
    getControl(controlName: "ts_ratemanager"): Xrm.LookupControl<"systemuser">;
    getControl(controlName: "ts_ratemanageralternativerecommendation"): Xrm.OptionSetControl<ts_raterecommendations>;
    getControl(controlName: "ts_ratemanagerdecision"): Xrm.OptionSetControl<ts_ratemanagerdecision>;
    getControl(controlName: "ts_ratemanagerenforcementjustification"): Xrm.StringControl;
    getControl(controlName: "ts_ratemitigationofharm"): Xrm.LookupControl<"ts_assessmentrating">;
    getControl(controlName: "ts_ratepreventingrecurrence"): Xrm.LookupControl<"ts_assessmentrating">;
    getControl(controlName: "ts_ratepreviousenforcementmechanism"): Xrm.OptionSetControl<ts_ratespecificenforcementhistory>;
    getControl(controlName: "ts_rateresponsibility"): Xrm.LookupControl<"ts_assessmentrating">;
    getControl(controlName: "ts_ratespecificnoncompliancehistory"): Xrm.OptionSetControl<ts_ratespecificcompliancehistory>;
    getControl(controlName: "ts_stakeholder"): Xrm.LookupControl<"account">;
    getControl(controlName: string): undefined;
  }
}
