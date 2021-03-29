declare namespace Form.incident.Main {
  namespace CaseforMultisessionexperience {
    namespace Tabs {
      interface CASERELATIONSHIP_TAB extends Xrm.SectionCollectionBase {
        get(name: "Applicable SLA(STANDARD)"): Xrm.PageSection;
        get(name: "Case Details"): Xrm.PageSection;
        get(name: "ChildCases"): Xrm.PageSection;
        get(name: "KnowledgeArticles"): Xrm.PageSection;
        get(name: "MergedCases"): Xrm.PageSection;
        get(name: "RelatedCases"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface Summary extends Xrm.SectionCollectionBase {
        get(name: "Case Details Summary"): Xrm.PageSection;
        get(name: "TabsControl"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "caseorigincode"): Xrm.OptionSetAttribute<incident_caseorigincode>;
      get(name: "casetypecode"): Xrm.OptionSetAttribute<incident_casetypecode>;
      get(name: "createdon"): Xrm.DateAttribute;
      get(name: "customerid"): Xrm.LookupAttribute<"account" | "contact">;
      get(name: "description"): Xrm.Attribute<string>;
      get(name: "entitlementid"): Xrm.LookupAttribute<"entitlement">;
      get(name: "escalatedon"): Xrm.DateAttribute;
      get(name: "existingcase"): Xrm.LookupAttribute<"incident"> | null;
      get(name: "firstresponsesent"): Xrm.OptionSetAttribute<boolean>;
      get(name: "followupby"): Xrm.DateAttribute;
      get(name: "isescalated"): Xrm.OptionSetAttribute<boolean>;
      get(name: "msdyn_incidenttype"): Xrm.LookupAttribute<"msdyn_incidenttype"> | null;
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "parentcaseid"): Xrm.LookupAttribute<"incident">;
      get(name: "primarycontactid"): Xrm.LookupAttribute<"contact"> | null;
      get(name: "prioritycode"): Xrm.OptionSetAttribute<incident_prioritycode>;
      get(name: "productid"): Xrm.LookupAttribute<"product">;
      get(name: "resolveby"): Xrm.DateAttribute;
      get(name: "responseby"): Xrm.DateAttribute;
      get(name: "statuscode"): Xrm.OptionSetAttribute<incident_statuscode>;
      get(name: "subjectid"): Xrm.LookupAttribute<"subject">;
      get(name: "ticketnumber"): Xrm.Attribute<string>;
      get(name: "title"): Xrm.Attribute<string>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "Associated_KnowledgeArticles"): Xrm.SubGridControl<"knowledgearticleincident">;
      get(name: "ChildCasesGrid"): Xrm.SubGridControl<"incident">;
      get(name: "MergedCasesGrid"): Xrm.SubGridControl<"incident">;
      get(name: "casetypecode"): Xrm.OptionSetControl<incident_casetypecode>;
      get(name: "customerid"): Xrm.LookupControl<"account" | "contact">;
      get(name: "description"): Xrm.StringControl;
      get(name: "entitlementid"): Xrm.LookupControl<"entitlement">;
      get(name: "escalatedon"): Xrm.DateControl;
      get(name: "firstresponsesent"): Xrm.OptionSetControl<boolean>;
      get(name: "followupby"): Xrm.DateControl;
      get(name: "header_caseorigincode"): Xrm.OptionSetControl<incident_caseorigincode>;
      get(name: "header_createdon"): Xrm.DateControl;
      get(name: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
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
      get(name: "header_ticketnumber"): Xrm.StringControl;
      get(name: "isescalated"): Xrm.OptionSetControl<boolean>;
      get(name: "notescontrol"): Xrm.BaseControl;
      get(name: "parentcaseid"): Xrm.LookupControl<"incident">;
      get(name: "prioritycode"): Xrm.OptionSetControl<incident_prioritycode>;
      get(name: "productid"): Xrm.LookupControl<"product">;
      get(name: "relatedCases"): Xrm.SubGridControl<"connection">;
      get(name: "resolveby"): Xrm.DateControl;
      get(name: "responseby"): Xrm.DateControl;
      get(name: "statuscode"): Xrm.OptionSetControl<incident_statuscode>;
      get(name: "subjectid"): Xrm.LookupControl<"subject">;
      get(name: "title"): Xrm.StringControl;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "CASERELATIONSHIP_TAB"): Xrm.PageTab<Tabs.CASERELATIONSHIP_TAB>;
      get(name: "Summary"): Xrm.PageTab<Tabs.Summary>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface CaseforMultisessionexperience extends Xrm.PageBase<CaseforMultisessionexperience.Attributes,CaseforMultisessionexperience.Tabs,CaseforMultisessionexperience.Controls> {
    getAttribute(attributeName: "caseorigincode"): Xrm.OptionSetAttribute<incident_caseorigincode>;
    getAttribute(attributeName: "casetypecode"): Xrm.OptionSetAttribute<incident_casetypecode>;
    getAttribute(attributeName: "createdon"): Xrm.DateAttribute;
    getAttribute(attributeName: "customerid"): Xrm.LookupAttribute<"account" | "contact">;
    getAttribute(attributeName: "description"): Xrm.Attribute<string>;
    getAttribute(attributeName: "entitlementid"): Xrm.LookupAttribute<"entitlement">;
    getAttribute(attributeName: "escalatedon"): Xrm.DateAttribute;
    getAttribute(attributeName: "existingcase"): Xrm.LookupAttribute<"incident"> | null;
    getAttribute(attributeName: "firstresponsesent"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "followupby"): Xrm.DateAttribute;
    getAttribute(attributeName: "isescalated"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "msdyn_incidenttype"): Xrm.LookupAttribute<"msdyn_incidenttype"> | null;
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "parentcaseid"): Xrm.LookupAttribute<"incident">;
    getAttribute(attributeName: "primarycontactid"): Xrm.LookupAttribute<"contact"> | null;
    getAttribute(attributeName: "prioritycode"): Xrm.OptionSetAttribute<incident_prioritycode>;
    getAttribute(attributeName: "productid"): Xrm.LookupAttribute<"product">;
    getAttribute(attributeName: "resolveby"): Xrm.DateAttribute;
    getAttribute(attributeName: "responseby"): Xrm.DateAttribute;
    getAttribute(attributeName: "statuscode"): Xrm.OptionSetAttribute<incident_statuscode>;
    getAttribute(attributeName: "subjectid"): Xrm.LookupAttribute<"subject">;
    getAttribute(attributeName: "ticketnumber"): Xrm.Attribute<string>;
    getAttribute(attributeName: "title"): Xrm.Attribute<string>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "Associated_KnowledgeArticles"): Xrm.SubGridControl<"knowledgearticleincident">;
    getControl(controlName: "ChildCasesGrid"): Xrm.SubGridControl<"incident">;
    getControl(controlName: "MergedCasesGrid"): Xrm.SubGridControl<"incident">;
    getControl(controlName: "casetypecode"): Xrm.OptionSetControl<incident_casetypecode>;
    getControl(controlName: "customerid"): Xrm.LookupControl<"account" | "contact">;
    getControl(controlName: "description"): Xrm.StringControl;
    getControl(controlName: "entitlementid"): Xrm.LookupControl<"entitlement">;
    getControl(controlName: "escalatedon"): Xrm.DateControl;
    getControl(controlName: "firstresponsesent"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "followupby"): Xrm.DateControl;
    getControl(controlName: "header_caseorigincode"): Xrm.OptionSetControl<incident_caseorigincode>;
    getControl(controlName: "header_createdon"): Xrm.DateControl;
    getControl(controlName: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
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
    getControl(controlName: "header_ticketnumber"): Xrm.StringControl;
    getControl(controlName: "isescalated"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "notescontrol"): Xrm.BaseControl;
    getControl(controlName: "parentcaseid"): Xrm.LookupControl<"incident">;
    getControl(controlName: "prioritycode"): Xrm.OptionSetControl<incident_prioritycode>;
    getControl(controlName: "productid"): Xrm.LookupControl<"product">;
    getControl(controlName: "relatedCases"): Xrm.SubGridControl<"connection">;
    getControl(controlName: "resolveby"): Xrm.DateControl;
    getControl(controlName: "responseby"): Xrm.DateControl;
    getControl(controlName: "statuscode"): Xrm.OptionSetControl<incident_statuscode>;
    getControl(controlName: "subjectid"): Xrm.LookupControl<"subject">;
    getControl(controlName: "title"): Xrm.StringControl;
    getControl(controlName: string): undefined;
  }
}
