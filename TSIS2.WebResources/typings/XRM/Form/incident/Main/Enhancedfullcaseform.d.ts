declare namespace Form.incident.Main {
  namespace Enhancedfullcaseform {
    namespace Tabs {
      interface Tab_Attachment extends Xrm.SectionCollectionBase {
        get(name: "attachmentSection"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface general extends Xrm.SectionCollectionBase {
        get(name: "Details"): Xrm.PageSection;
        get(name: "Timeline"): Xrm.PageSection;
        get(name: "attachment"): Xrm.PageSection;
        get(name: "caseassociation"): Xrm.PageSection;
        get(name: "description"): Xrm.PageSection;
        get(name: "notes"): Xrm.PageSection;
        get(name: "queueitemdetails"): Xrm.PageSection;
        get(name: "slaTimer"): Xrm.PageSection;
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
      get(name: "description"): Xrm.Attribute<any>;
      get(name: "entitlementid"): Xrm.LookupAttribute<"entitlement">;
      get(name: "escalatedon"): Xrm.DateAttribute;
      get(name: "existingcase"): Xrm.LookupAttribute<"incident"> | null;
      get(name: "isescalated"): Xrm.OptionSetAttribute<boolean>;
      get(name: "msdyn_incidenttype"): Xrm.LookupAttribute<"msdyn_incidenttype"> | null;
      get(name: "msdyn_precreateattachmentsid"): Xrm.Attribute<any>;
      get(name: "msdyn_precreatenotesid"): Xrm.Attribute<any>;
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "parentcaseid"): Xrm.LookupAttribute<"incident">;
      get(name: "primarycontactid"): Xrm.LookupAttribute<"contact"> | null;
      get(name: "prioritycode"): Xrm.Attribute<any>;
      get(name: "productid"): Xrm.LookupAttribute<"product">;
      get(name: "productserialnumber"): Xrm.Attribute<string>;
      get(name: "statuscode"): Xrm.Attribute<any>;
      get(name: "subjectid"): Xrm.Attribute<any>;
      get(name: "ticketnumber"): Xrm.Attribute<string>;
      get(name: "title"): Xrm.Attribute<string>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "Activities"): Xrm.BaseControl;
      get(name: "case_associations_control"): Xrm.BaseControl;
      get(name: "caseorigincode"): Xrm.OptionSetControl<incident_caseorigincode>;
      get(name: "casetypecode"): Xrm.OptionSetControl<incident_casetypecode>;
      get(name: "casetypecodecreate"): Xrm.OptionSetControl<incident_casetypecode>;
      get(name: "createdon"): Xrm.DateControl;
      get(name: "customerid"): Xrm.LookupControl<"account" | "contact">;
      get(name: "description"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "entitlementid"): Xrm.LookupControl<"entitlement">;
      get(name: "escalatedon"): Xrm.DateControl;
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
      get(name: "header_ticketnumber"): Xrm.StringControl;
      get(name: "isescalated"): Xrm.OptionSetControl<boolean>;
      get(name: "msdyn_precreateattachmentsid"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "msdyn_precreateattachmentsid1"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "msdyn_precreatenotesid"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "msdyn_queueitemdetailscontrol"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "notescontrol"): Xrm.BaseControl;
      get(name: "parentcaseid"): Xrm.LookupControl<"incident">;
      get(name: "prioritycode"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "productid"): Xrm.LookupControl<"product">;
      get(name: "productserialnumber"): Xrm.StringControl;
      get(name: "slatimer"): Xrm.BaseControl;
      get(name: "statuscode"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "subjectid"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "title"): Xrm.StringControl;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "Tab_Attachment"): Xrm.PageTab<Tabs.Tab_Attachment>;
      get(name: "general"): Xrm.PageTab<Tabs.general>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Enhancedfullcaseform extends Xrm.PageBase<Enhancedfullcaseform.Attributes,Enhancedfullcaseform.Tabs,Enhancedfullcaseform.Controls> {
    getAttribute(attributeName: "caseorigincode"): Xrm.OptionSetAttribute<incident_caseorigincode>;
    getAttribute(attributeName: "casetypecode"): Xrm.OptionSetAttribute<incident_casetypecode>;
    getAttribute(attributeName: "createdon"): Xrm.DateAttribute;
    getAttribute(attributeName: "customerid"): Xrm.LookupAttribute<"account" | "contact">;
    getAttribute(attributeName: "description"): Xrm.Attribute<any>;
    getAttribute(attributeName: "entitlementid"): Xrm.LookupAttribute<"entitlement">;
    getAttribute(attributeName: "escalatedon"): Xrm.DateAttribute;
    getAttribute(attributeName: "existingcase"): Xrm.LookupAttribute<"incident"> | null;
    getAttribute(attributeName: "isescalated"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "msdyn_incidenttype"): Xrm.LookupAttribute<"msdyn_incidenttype"> | null;
    getAttribute(attributeName: "msdyn_precreateattachmentsid"): Xrm.Attribute<any>;
    getAttribute(attributeName: "msdyn_precreatenotesid"): Xrm.Attribute<any>;
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "parentcaseid"): Xrm.LookupAttribute<"incident">;
    getAttribute(attributeName: "primarycontactid"): Xrm.LookupAttribute<"contact"> | null;
    getAttribute(attributeName: "prioritycode"): Xrm.Attribute<any>;
    getAttribute(attributeName: "productid"): Xrm.LookupAttribute<"product">;
    getAttribute(attributeName: "productserialnumber"): Xrm.Attribute<string>;
    getAttribute(attributeName: "statuscode"): Xrm.Attribute<any>;
    getAttribute(attributeName: "subjectid"): Xrm.Attribute<any>;
    getAttribute(attributeName: "ticketnumber"): Xrm.Attribute<string>;
    getAttribute(attributeName: "title"): Xrm.Attribute<string>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "Activities"): Xrm.BaseControl;
    getControl(controlName: "case_associations_control"): Xrm.BaseControl;
    getControl(controlName: "caseorigincode"): Xrm.OptionSetControl<incident_caseorigincode>;
    getControl(controlName: "casetypecode"): Xrm.OptionSetControl<incident_casetypecode>;
    getControl(controlName: "casetypecodecreate"): Xrm.OptionSetControl<incident_casetypecode>;
    getControl(controlName: "createdon"): Xrm.DateControl;
    getControl(controlName: "customerid"): Xrm.LookupControl<"account" | "contact">;
    getControl(controlName: "description"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "entitlementid"): Xrm.LookupControl<"entitlement">;
    getControl(controlName: "escalatedon"): Xrm.DateControl;
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
    getControl(controlName: "header_ticketnumber"): Xrm.StringControl;
    getControl(controlName: "isescalated"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "msdyn_precreateattachmentsid"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "msdyn_precreateattachmentsid1"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "msdyn_precreatenotesid"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "msdyn_queueitemdetailscontrol"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "notescontrol"): Xrm.BaseControl;
    getControl(controlName: "parentcaseid"): Xrm.LookupControl<"incident">;
    getControl(controlName: "prioritycode"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "productid"): Xrm.LookupControl<"product">;
    getControl(controlName: "productserialnumber"): Xrm.StringControl;
    getControl(controlName: "slatimer"): Xrm.BaseControl;
    getControl(controlName: "statuscode"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "subjectid"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "title"): Xrm.StringControl;
    getControl(controlName: string): undefined;
  }
}
