declare namespace Form.incident.Main {
  namespace Enhancedquickcaseform {
    namespace Tabs {
      interface attachment extends Xrm.SectionCollectionBase {
        get(name: "tab_9_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface general extends Xrm.SectionCollectionBase {
        get(name: "Details"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface notes extends Xrm.SectionCollectionBase {
        get(name: "tab_8_section_1"): Xrm.PageSection;
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
      get(name: "existingcase"): Xrm.LookupAttribute<"incident"> | null;
      get(name: "msdyn_incidenttype"): Xrm.LookupAttribute<"msdyn_incidenttype"> | null;
      get(name: "msdyn_precreateattachmentsid"): Xrm.Attribute<any>;
      get(name: "msdyn_precreatenotesid"): Xrm.Attribute<any>;
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "primarycontactid"): Xrm.LookupAttribute<"contact"> | null;
      get(name: "prioritycode"): Xrm.Attribute<any>;
      get(name: "productid"): Xrm.LookupAttribute<"product">;
      get(name: "productserialnumber"): Xrm.Attribute<string>;
      get(name: "statuscode"): Xrm.Attribute<any>;
      get(name: "subjectid"): Xrm.LookupAttribute<"subject">;
      get(name: "title"): Xrm.Attribute<string>;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "caseorigincode"): Xrm.OptionSetControl<incident_caseorigincode>;
      get(name: "casetypecode"): Xrm.OptionSetControl<incident_casetypecode>;
      get(name: "customerid"): Xrm.LookupControl<"account" | "contact">;
      get(name: "description"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "header_createdon"): Xrm.DateControl;
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
      get(name: "msdyn_precreateattachmentsid"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "msdyn_precreatenotesid"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "prioritycode"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "productid"): Xrm.LookupControl<"product">;
      get(name: "productserialnumber"): Xrm.StringControl;
      get(name: "statuscode"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "subjectid"): Xrm.LookupControl<"subject">;
      get(name: "title"): Xrm.StringControl;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "attachment"): Xrm.PageTab<Tabs.attachment>;
      get(name: "general"): Xrm.PageTab<Tabs.general>;
      get(name: "notes"): Xrm.PageTab<Tabs.notes>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Enhancedquickcaseform extends Xrm.PageBase<Enhancedquickcaseform.Attributes,Enhancedquickcaseform.Tabs,Enhancedquickcaseform.Controls> {
    getAttribute(attributeName: "caseorigincode"): Xrm.OptionSetAttribute<incident_caseorigincode>;
    getAttribute(attributeName: "casetypecode"): Xrm.OptionSetAttribute<incident_casetypecode>;
    getAttribute(attributeName: "createdon"): Xrm.DateAttribute;
    getAttribute(attributeName: "customerid"): Xrm.LookupAttribute<"account" | "contact">;
    getAttribute(attributeName: "description"): Xrm.Attribute<any>;
    getAttribute(attributeName: "existingcase"): Xrm.LookupAttribute<"incident"> | null;
    getAttribute(attributeName: "msdyn_incidenttype"): Xrm.LookupAttribute<"msdyn_incidenttype"> | null;
    getAttribute(attributeName: "msdyn_precreateattachmentsid"): Xrm.Attribute<any>;
    getAttribute(attributeName: "msdyn_precreatenotesid"): Xrm.Attribute<any>;
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "primarycontactid"): Xrm.LookupAttribute<"contact"> | null;
    getAttribute(attributeName: "prioritycode"): Xrm.Attribute<any>;
    getAttribute(attributeName: "productid"): Xrm.LookupAttribute<"product">;
    getAttribute(attributeName: "productserialnumber"): Xrm.Attribute<string>;
    getAttribute(attributeName: "statuscode"): Xrm.Attribute<any>;
    getAttribute(attributeName: "subjectid"): Xrm.LookupAttribute<"subject">;
    getAttribute(attributeName: "title"): Xrm.Attribute<string>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "caseorigincode"): Xrm.OptionSetControl<incident_caseorigincode>;
    getControl(controlName: "casetypecode"): Xrm.OptionSetControl<incident_casetypecode>;
    getControl(controlName: "customerid"): Xrm.LookupControl<"account" | "contact">;
    getControl(controlName: "description"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "header_createdon"): Xrm.DateControl;
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
    getControl(controlName: "msdyn_precreateattachmentsid"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "msdyn_precreatenotesid"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "prioritycode"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "productid"): Xrm.LookupControl<"product">;
    getControl(controlName: "productserialnumber"): Xrm.StringControl;
    getControl(controlName: "statuscode"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "subjectid"): Xrm.LookupControl<"subject">;
    getControl(controlName: "title"): Xrm.StringControl;
    getControl(controlName: string): undefined;
  }
}
