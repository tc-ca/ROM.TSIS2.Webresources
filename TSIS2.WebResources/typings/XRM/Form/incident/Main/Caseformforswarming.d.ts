declare namespace Form.incident.Main {
  namespace Caseformforswarming {
    namespace Tabs {
      interface general extends Xrm.SectionCollectionBase {
        get(name: "casedetails"): Xrm.PageSection;
        get(name: "general_section_3"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "createdon"): Xrm.DateAttribute;
      get(name: "customerid"): Xrm.Attribute<any>;
      get(name: "description"): Xrm.Attribute<string>;
      get(name: "existingcase"): Xrm.LookupAttribute<"incident"> | null;
      get(name: "msdyn_incidenttype"): Xrm.LookupAttribute<"msdyn_incidenttype"> | null;
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "primarycontactid"): Xrm.LookupAttribute<"contact"> | null;
      get(name: "prioritycode"): Xrm.OptionSetAttribute<incident_prioritycode>;
      get(name: "productid"): Xrm.LookupAttribute<"product">;
      get(name: "statecode"): Xrm.OptionSetAttribute<incident_statecode>;
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
      get(name: "customerid"): Xrm.LookupControl<"account" | "contact">;
      get(name: "description"): Xrm.StringControl;
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
      get(name: "prioritycode"): Xrm.OptionSetControl<incident_prioritycode>;
      get(name: "productid"): Xrm.LookupControl<"product">;
      get(name: "statecode"): Xrm.OptionSetControl<incident_statecode>;
      get(name: "subjectid"): Xrm.LookupControl<"subject">;
      get(name: "ticketnumber"): Xrm.StringControl;
      get(name: "title"): Xrm.StringControl;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "general"): Xrm.PageTab<Tabs.general>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Caseformforswarming extends Xrm.PageBase<Caseformforswarming.Attributes,Caseformforswarming.Tabs,Caseformforswarming.Controls> {
    getAttribute(attributeName: "createdon"): Xrm.DateAttribute;
    getAttribute(attributeName: "customerid"): Xrm.Attribute<any>;
    getAttribute(attributeName: "description"): Xrm.Attribute<string>;
    getAttribute(attributeName: "existingcase"): Xrm.LookupAttribute<"incident"> | null;
    getAttribute(attributeName: "msdyn_incidenttype"): Xrm.LookupAttribute<"msdyn_incidenttype"> | null;
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "primarycontactid"): Xrm.LookupAttribute<"contact"> | null;
    getAttribute(attributeName: "prioritycode"): Xrm.OptionSetAttribute<incident_prioritycode>;
    getAttribute(attributeName: "productid"): Xrm.LookupAttribute<"product">;
    getAttribute(attributeName: "statecode"): Xrm.OptionSetAttribute<incident_statecode>;
    getAttribute(attributeName: "statuscode"): Xrm.OptionSetAttribute<incident_statuscode>;
    getAttribute(attributeName: "subjectid"): Xrm.LookupAttribute<"subject">;
    getAttribute(attributeName: "ticketnumber"): Xrm.Attribute<string>;
    getAttribute(attributeName: "title"): Xrm.Attribute<string>;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "customerid"): Xrm.LookupControl<"account" | "contact">;
    getControl(controlName: "description"): Xrm.StringControl;
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
    getControl(controlName: "prioritycode"): Xrm.OptionSetControl<incident_prioritycode>;
    getControl(controlName: "productid"): Xrm.LookupControl<"product">;
    getControl(controlName: "statecode"): Xrm.OptionSetControl<incident_statecode>;
    getControl(controlName: "subjectid"): Xrm.LookupControl<"subject">;
    getControl(controlName: "ticketnumber"): Xrm.StringControl;
    getControl(controlName: "title"): Xrm.StringControl;
    getControl(controlName: string): undefined;
  }
}
