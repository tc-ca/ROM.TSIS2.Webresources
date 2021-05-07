declare namespace Form.incident.Main {
  namespace ROMCase {
    namespace Tabs {
      interface ADDITIONALDETAILS_TAB extends Xrm.SectionCollectionBase {
        get(name: "escalations"): Xrm.PageSection;
        get(name: "parentcaseandtype"): Xrm.PageSection;
        get(name: "responses"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface AssociatedKnowledgeBaseRecords extends Xrm.SectionCollectionBase {
        get(name: "Articles"): Xrm.PageSection;
        get(name: "KnowledgeArticles"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface CASERELATIONSHIP_TAB extends Xrm.SectionCollectionBase {
        get(name: "ChildCases"): Xrm.PageSection;
        get(name: "MergedCases"): Xrm.PageSection;
        get(name: "Research"): Xrm.PageSection;
        get(name: "Solutions"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface DeviceInsightsTab extends Xrm.SectionCollectionBase {
        get(name: "DeviceInsightsSection"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface Enhanced_SLA_Details_Tab extends Xrm.SectionCollectionBase {
        get(name: "Applicable SLA(ENHANCED)"): Xrm.PageSection;
        get(name: "SLAKPIInstances"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface FieldService extends Xrm.SectionCollectionBase {
        get(name: "FieldService_section_4"): Xrm.PageSection;
        get(name: "tab_8_section_2"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface KBARTICLE_TAB extends Xrm.SectionCollectionBase {
        get(name: "contract and product information"): Xrm.PageSection;
        get(name: "kb article"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface SOCIALDETAILS_TAB extends Xrm.SectionCollectionBase {
        get(name: "scores"): Xrm.PageSection;
        get(name: "social"): Xrm.PageSection;
        get(name: "social3"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface general extends Xrm.SectionCollectionBase {
        get(name: "Applicable SLA(STANDARD)"): Xrm.PageSection;
        get(name: "Details"): Xrm.PageSection;
        get(name: "general_section_7"): Xrm.PageSection;
        get(name: "tab_8_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
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
      interface tab_13 extends Xrm.SectionCollectionBase {
        get(name: "tab_13_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "blockedprofile"): Xrm.OptionSetAttribute<boolean>;
      get(name: "caseorigincode"): Xrm.OptionSetAttribute<incident_caseorigincode>;
      get(name: "casetypecode"): Xrm.OptionSetAttribute<incident_casetypecode>;
      get(name: "contractdetailid"): Xrm.LookupAttribute<"contractdetail">;
      get(name: "contractid"): Xrm.LookupAttribute<"contract">;
      get(name: "contractservicelevelcode"): Xrm.OptionSetAttribute<incident_contractservicelevelcode>;
      get(name: "createdon"): Xrm.DateAttribute;
      get(name: "customerid"): Xrm.LookupAttribute<"account" | "contact">;
      get(name: "description"): Xrm.Attribute<string>;
      get(name: "entitlementid"): Xrm.LookupAttribute<"entitlement">;
      get(name: "escalatedon"): Xrm.DateAttribute;
      get(name: "existingcase"): Xrm.LookupAttribute<"incident"> | null;
      get(name: "firstresponsebykpiid"): Xrm.Attribute<any>;
      get(name: "firstresponsesent"): Xrm.OptionSetAttribute<boolean>;
      get(name: "followupby"): Xrm.DateAttribute;
      get(name: "influencescore"): Xrm.NumberAttribute;
      get(name: "isescalated"): Xrm.OptionSetAttribute<boolean>;
      get(name: "kbarticleid"): Xrm.LookupAttribute<"kbarticle">;
      get(name: "messagetypecode"): Xrm.OptionSetAttribute<socialactivity_postmessagetype>;
      get(name: "msdyn_functionallocation"): Xrm.LookupAttribute<"msdyn_functionallocation">;
      get(name: "msdyn_incidenttype"): Xrm.LookupAttribute<"msdyn_incidenttype">;
      get(name: "msdyn_iotalert"): Xrm.LookupAttribute<"msdyn_iotalert">;
      get(name: "ovs_region"): Xrm.LookupAttribute<"territory">;
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "parentcaseid"): Xrm.LookupAttribute<"incident">;
      get(name: "primarycontactid"): Xrm.LookupAttribute<"contact">;
      get(name: "prioritycode"): Xrm.OptionSetAttribute<incident_prioritycode>;
      get(name: "productid"): Xrm.LookupAttribute<"product">;
      get(name: "productserialnumber"): Xrm.Attribute<string>;
      get(name: "resolveby"): Xrm.DateAttribute;
      get(name: "resolvebykpiid"): Xrm.Attribute<any>;
      get(name: "responseby"): Xrm.DateAttribute;
      get(name: "sentimentvalue"): Xrm.NumberAttribute;
      get(name: "socialprofileid"): Xrm.LookupAttribute<"socialprofile">;
      get(name: "statuscode"): Xrm.OptionSetAttribute<incident_statuscode>;
      get(name: "subjectid"): Xrm.LookupAttribute<"subject">;
      get(name: "ticketnumber"): Xrm.Attribute<string>;
      get(name: "title"): Xrm.Attribute<string>;
      get(name: "ts_country"): Xrm.LookupAttribute<"tc_country">;
      get(name: "ts_stakeholder"): Xrm.LookupAttribute<"account">;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "Associated_Articles"): Xrm.SubGridControl<"knowledgebaserecord">;
      get(name: "Associated_KnowledgeArticles"): Xrm.SubGridControl<"knowledgearticleincident">;
      get(name: "CaseResearch_LinkControl"): Xrm.BaseControl;
      get(name: "ChildCasesGrid"): Xrm.SubGridControl<"incident">;
      get(name: "FailedServiceTasks"): Xrm.SubGridControl<"msdyn_workorderservicetask">;
      get(name: "MergedCasesGrid"): Xrm.SubGridControl<"incident">;
      get(name: "RelatedSolutionGrid"): Xrm.SubGridControl<"connection">;
      get(name: "SLA_KPI_Instances_List"): Xrm.SubGridControl<"slakpiinstance">;
      get(name: "Subgrid_1"): Xrm.SubGridControl<"msdyn_workorder">;
      get(name: "Subgrid_2"): Xrm.SubGridControl<"ovs_finding">;
      get(name: "blockedprofile"): Xrm.OptionSetControl<boolean>;
      get(name: "caseorigincode"): Xrm.OptionSetControl<incident_caseorigincode>;
      get(name: "casetypecode"): Xrm.OptionSetControl<incident_casetypecode>;
      get(name: "contractdetailid"): Xrm.LookupControl<"contractdetail">;
      get(name: "contractid"): Xrm.LookupControl<"contract">;
      get(name: "contractservicelevelcode"): Xrm.OptionSetControl<incident_contractservicelevelcode>;
      get(name: "customerid"): Xrm.LookupControl<"account" | "contact">;
      get(name: "description"): Xrm.StringControl;
      get(name: "entitlementid"): Xrm.LookupControl<"entitlement">;
      get(name: "escalatedon"): Xrm.DateControl;
      get(name: "firstresponsesent"): Xrm.OptionSetControl<boolean>;
      get(name: "followupby"): Xrm.DateControl;
      get(name: "header_createdon"): Xrm.DateControl;
      get(name: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "header_prioritycode"): Xrm.OptionSetControl<incident_prioritycode>;
      get(name: "header_process_customerid"): Xrm.LookupControl<"account" | "contact"> | null;
      get(name: "header_process_customerid_1"): Xrm.LookupControl<"account" | "contact"> | null;
      get(name: "header_process_customerid_2"): Xrm.LookupControl<"account" | "contact"> | null;
      get(name: "header_process_customerid_3"): Xrm.LookupControl<"account" | "contact"> | null;
      get(name: "header_process_customerid_4"): Xrm.LookupControl<"account" | "contact"> | null;
      get(name: "header_process_existingcase"): Xrm.LookupControl<"incident"> | null;
      get(name: "header_process_existingcase_1"): Xrm.LookupControl<"incident"> | null;
      get(name: "header_process_msdyn_incidenttype"): Xrm.LookupControl<"msdyn_incidenttype"> | null;
      get(name: "header_process_ownerid"): Xrm.LookupControl<"systemuser" | "team"> | null;
      get(name: "header_process_ownerid_1"): Xrm.LookupControl<"systemuser" | "team"> | null;
      get(name: "header_process_ownerid_2"): Xrm.LookupControl<"systemuser" | "team"> | null;
      get(name: "header_process_primarycontactid"): Xrm.LookupControl<"contact"> | null;
      get(name: "header_process_primarycontactid_1"): Xrm.LookupControl<"contact"> | null;
      get(name: "header_process_primarycontactid_2"): Xrm.LookupControl<"contact"> | null;
      get(name: "header_process_title"): Xrm.StringControl | null;
      get(name: "header_process_title_1"): Xrm.StringControl | null;
      get(name: "header_statuscode"): Xrm.OptionSetControl<incident_statuscode>;
      get(name: "influencescore"): Xrm.NumberControl;
      get(name: "isescalated"): Xrm.OptionSetControl<boolean>;
      get(name: "kbarticleid"): Xrm.LookupControl<"kbarticle">;
      get(name: "kbviewer"): Xrm.BaseControl;
      get(name: "messagetypecode"): Xrm.OptionSetControl<socialactivity_postmessagetype>;
      get(name: "msdyn_functionallocation"): Xrm.LookupControl<"msdyn_functionallocation">;
      get(name: "msdyn_incidenttype"): Xrm.LookupControl<"msdyn_incidenttype">;
      get(name: "msdyn_iotalert"): Xrm.LookupControl<"msdyn_iotalert">;
      get(name: "msdyn_iotalert1"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "notescontrol"): Xrm.BaseControl;
      get(name: "ovs_region"): Xrm.LookupControl<"territory">;
      get(name: "parentcaseid"): Xrm.LookupControl<"incident">;
      get(name: "primarycontactid"): Xrm.LookupControl<"contact">;
      get(name: "productid"): Xrm.LookupControl<"product">;
      get(name: "productserialnumber"): Xrm.StringControl;
      get(name: "resolveby"): Xrm.DateControl;
      get(name: "responseby"): Xrm.DateControl;
      get(name: "sentimentvalue"): Xrm.NumberControl;
      get(name: "socialprofileid"): Xrm.LookupControl<"socialprofile">;
      get(name: "subjectid"): Xrm.LookupControl<"subject">;
      get(name: "ticketnumber"): Xrm.StringControl;
      get(name: "title"): Xrm.StringControl;
      get(name: "ts_country"): Xrm.LookupControl<"tc_country">;
      get(name: "ts_stakeholder"): Xrm.LookupControl<"account">;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "ADDITIONALDETAILS_TAB"): Xrm.PageTab<Tabs.ADDITIONALDETAILS_TAB>;
      get(name: "AssociatedKnowledgeBaseRecords"): Xrm.PageTab<Tabs.AssociatedKnowledgeBaseRecords>;
      get(name: "CASERELATIONSHIP_TAB"): Xrm.PageTab<Tabs.CASERELATIONSHIP_TAB>;
      get(name: "DeviceInsightsTab"): Xrm.PageTab<Tabs.DeviceInsightsTab>;
      get(name: " Enhanced_SLA_Details_Tab"): Xrm.PageTab<Tabs.Enhanced_SLA_Details_Tab>;
      get(name: "FieldService"): Xrm.PageTab<Tabs.FieldService>;
      get(name: "KBARTICLE_TAB"): Xrm.PageTab<Tabs.KBARTICLE_TAB>;
      get(name: "SOCIALDETAILS_TAB"): Xrm.PageTab<Tabs.SOCIALDETAILS_TAB>;
      get(name: "general"): Xrm.PageTab<Tabs.general>;
      get(name: "tab_10"): Xrm.PageTab<Tabs.tab_10>;
      get(name: "tab_11"): Xrm.PageTab<Tabs.tab_11>;
      get(name: "tab_13"): Xrm.PageTab<Tabs.tab_13>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface ROMCase extends Xrm.PageBase<ROMCase.Attributes,ROMCase.Tabs,ROMCase.Controls> {
    getAttribute(attributeName: "blockedprofile"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "caseorigincode"): Xrm.OptionSetAttribute<incident_caseorigincode>;
    getAttribute(attributeName: "casetypecode"): Xrm.OptionSetAttribute<incident_casetypecode>;
    getAttribute(attributeName: "contractdetailid"): Xrm.LookupAttribute<"contractdetail">;
    getAttribute(attributeName: "contractid"): Xrm.LookupAttribute<"contract">;
    getAttribute(attributeName: "contractservicelevelcode"): Xrm.OptionSetAttribute<incident_contractservicelevelcode>;
    getAttribute(attributeName: "createdon"): Xrm.DateAttribute;
    getAttribute(attributeName: "customerid"): Xrm.LookupAttribute<"account" | "contact">;
    getAttribute(attributeName: "description"): Xrm.Attribute<string>;
    getAttribute(attributeName: "entitlementid"): Xrm.LookupAttribute<"entitlement">;
    getAttribute(attributeName: "escalatedon"): Xrm.DateAttribute;
    getAttribute(attributeName: "existingcase"): Xrm.LookupAttribute<"incident"> | null;
    getAttribute(attributeName: "firstresponsebykpiid"): Xrm.Attribute<any>;
    getAttribute(attributeName: "firstresponsesent"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "followupby"): Xrm.DateAttribute;
    getAttribute(attributeName: "influencescore"): Xrm.NumberAttribute;
    getAttribute(attributeName: "isescalated"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "kbarticleid"): Xrm.LookupAttribute<"kbarticle">;
    getAttribute(attributeName: "messagetypecode"): Xrm.OptionSetAttribute<socialactivity_postmessagetype>;
    getAttribute(attributeName: "msdyn_functionallocation"): Xrm.LookupAttribute<"msdyn_functionallocation">;
    getAttribute(attributeName: "msdyn_incidenttype"): Xrm.LookupAttribute<"msdyn_incidenttype">;
    getAttribute(attributeName: "msdyn_iotalert"): Xrm.LookupAttribute<"msdyn_iotalert">;
    getAttribute(attributeName: "ovs_region"): Xrm.LookupAttribute<"territory">;
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "parentcaseid"): Xrm.LookupAttribute<"incident">;
    getAttribute(attributeName: "primarycontactid"): Xrm.LookupAttribute<"contact">;
    getAttribute(attributeName: "prioritycode"): Xrm.OptionSetAttribute<incident_prioritycode>;
    getAttribute(attributeName: "productid"): Xrm.LookupAttribute<"product">;
    getAttribute(attributeName: "productserialnumber"): Xrm.Attribute<string>;
    getAttribute(attributeName: "resolveby"): Xrm.DateAttribute;
    getAttribute(attributeName: "resolvebykpiid"): Xrm.Attribute<any>;
    getAttribute(attributeName: "responseby"): Xrm.DateAttribute;
    getAttribute(attributeName: "sentimentvalue"): Xrm.NumberAttribute;
    getAttribute(attributeName: "socialprofileid"): Xrm.LookupAttribute<"socialprofile">;
    getAttribute(attributeName: "statuscode"): Xrm.OptionSetAttribute<incident_statuscode>;
    getAttribute(attributeName: "subjectid"): Xrm.LookupAttribute<"subject">;
    getAttribute(attributeName: "ticketnumber"): Xrm.Attribute<string>;
    getAttribute(attributeName: "title"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_country"): Xrm.LookupAttribute<"tc_country">;
    getAttribute(attributeName: "ts_stakeholder"): Xrm.LookupAttribute<"account">;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "Associated_Articles"): Xrm.SubGridControl<"knowledgebaserecord">;
    getControl(controlName: "Associated_KnowledgeArticles"): Xrm.SubGridControl<"knowledgearticleincident">;
    getControl(controlName: "CaseResearch_LinkControl"): Xrm.BaseControl;
    getControl(controlName: "ChildCasesGrid"): Xrm.SubGridControl<"incident">;
    getControl(controlName: "FailedServiceTasks"): Xrm.SubGridControl<"msdyn_workorderservicetask">;
    getControl(controlName: "MergedCasesGrid"): Xrm.SubGridControl<"incident">;
    getControl(controlName: "RelatedSolutionGrid"): Xrm.SubGridControl<"connection">;
    getControl(controlName: "SLA_KPI_Instances_List"): Xrm.SubGridControl<"slakpiinstance">;
    getControl(controlName: "Subgrid_1"): Xrm.SubGridControl<"msdyn_workorder">;
    getControl(controlName: "Subgrid_2"): Xrm.SubGridControl<"ovs_finding">;
    getControl(controlName: "blockedprofile"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "caseorigincode"): Xrm.OptionSetControl<incident_caseorigincode>;
    getControl(controlName: "casetypecode"): Xrm.OptionSetControl<incident_casetypecode>;
    getControl(controlName: "contractdetailid"): Xrm.LookupControl<"contractdetail">;
    getControl(controlName: "contractid"): Xrm.LookupControl<"contract">;
    getControl(controlName: "contractservicelevelcode"): Xrm.OptionSetControl<incident_contractservicelevelcode>;
    getControl(controlName: "customerid"): Xrm.LookupControl<"account" | "contact">;
    getControl(controlName: "description"): Xrm.StringControl;
    getControl(controlName: "entitlementid"): Xrm.LookupControl<"entitlement">;
    getControl(controlName: "escalatedon"): Xrm.DateControl;
    getControl(controlName: "firstresponsesent"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "followupby"): Xrm.DateControl;
    getControl(controlName: "header_createdon"): Xrm.DateControl;
    getControl(controlName: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "header_prioritycode"): Xrm.OptionSetControl<incident_prioritycode>;
    getControl(controlName: "header_process_customerid"): Xrm.LookupControl<"account" | "contact"> | null;
    getControl(controlName: "header_process_customerid_1"): Xrm.LookupControl<"account" | "contact"> | null;
    getControl(controlName: "header_process_customerid_2"): Xrm.LookupControl<"account" | "contact"> | null;
    getControl(controlName: "header_process_customerid_3"): Xrm.LookupControl<"account" | "contact"> | null;
    getControl(controlName: "header_process_customerid_4"): Xrm.LookupControl<"account" | "contact"> | null;
    getControl(controlName: "header_process_existingcase"): Xrm.LookupControl<"incident"> | null;
    getControl(controlName: "header_process_existingcase_1"): Xrm.LookupControl<"incident"> | null;
    getControl(controlName: "header_process_msdyn_incidenttype"): Xrm.LookupControl<"msdyn_incidenttype"> | null;
    getControl(controlName: "header_process_ownerid"): Xrm.LookupControl<"systemuser" | "team"> | null;
    getControl(controlName: "header_process_ownerid_1"): Xrm.LookupControl<"systemuser" | "team"> | null;
    getControl(controlName: "header_process_ownerid_2"): Xrm.LookupControl<"systemuser" | "team"> | null;
    getControl(controlName: "header_process_primarycontactid"): Xrm.LookupControl<"contact"> | null;
    getControl(controlName: "header_process_primarycontactid_1"): Xrm.LookupControl<"contact"> | null;
    getControl(controlName: "header_process_primarycontactid_2"): Xrm.LookupControl<"contact"> | null;
    getControl(controlName: "header_process_title"): Xrm.StringControl | null;
    getControl(controlName: "header_process_title_1"): Xrm.StringControl | null;
    getControl(controlName: "header_statuscode"): Xrm.OptionSetControl<incident_statuscode>;
    getControl(controlName: "influencescore"): Xrm.NumberControl;
    getControl(controlName: "isescalated"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "kbarticleid"): Xrm.LookupControl<"kbarticle">;
    getControl(controlName: "kbviewer"): Xrm.BaseControl;
    getControl(controlName: "messagetypecode"): Xrm.OptionSetControl<socialactivity_postmessagetype>;
    getControl(controlName: "msdyn_functionallocation"): Xrm.LookupControl<"msdyn_functionallocation">;
    getControl(controlName: "msdyn_incidenttype"): Xrm.LookupControl<"msdyn_incidenttype">;
    getControl(controlName: "msdyn_iotalert"): Xrm.LookupControl<"msdyn_iotalert">;
    getControl(controlName: "msdyn_iotalert1"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "notescontrol"): Xrm.BaseControl;
    getControl(controlName: "ovs_region"): Xrm.LookupControl<"territory">;
    getControl(controlName: "parentcaseid"): Xrm.LookupControl<"incident">;
    getControl(controlName: "primarycontactid"): Xrm.LookupControl<"contact">;
    getControl(controlName: "productid"): Xrm.LookupControl<"product">;
    getControl(controlName: "productserialnumber"): Xrm.StringControl;
    getControl(controlName: "resolveby"): Xrm.DateControl;
    getControl(controlName: "responseby"): Xrm.DateControl;
    getControl(controlName: "sentimentvalue"): Xrm.NumberControl;
    getControl(controlName: "socialprofileid"): Xrm.LookupControl<"socialprofile">;
    getControl(controlName: "subjectid"): Xrm.LookupControl<"subject">;
    getControl(controlName: "ticketnumber"): Xrm.StringControl;
    getControl(controlName: "title"): Xrm.StringControl;
    getControl(controlName: "ts_country"): Xrm.LookupControl<"tc_country">;
    getControl(controlName: "ts_stakeholder"): Xrm.LookupControl<"account">;
    getControl(controlName: string): undefined;
  }
}
