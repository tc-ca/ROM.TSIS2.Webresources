declare namespace Form.incident.Main {
  namespace TimelineWallControlCaseMain {
    namespace Tabs {
      interface SUMMARY_TAB extends Xrm.SectionCollectionBase {
        get(name: "SOCIAL_PANE_TAB"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "customerid"): Xrm.LookupAttribute<"account" | "contact"> | null;
      get(name: "existingcase"): Xrm.LookupAttribute<"incident"> | null;
      get(name: "msdyn_incidenttype"): Xrm.LookupAttribute<"msdyn_incidenttype"> | null;
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "primarycontactid"): Xrm.LookupAttribute<"contact"> | null;
      get(name: "title"): Xrm.Attribute<string> | null;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
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
      get(name: "notescontrol"): Xrm.BaseControl;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "SUMMARY_TAB"): Xrm.PageTab<Tabs.SUMMARY_TAB>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface TimelineWallControlCaseMain extends Xrm.PageBase<TimelineWallControlCaseMain.Attributes,TimelineWallControlCaseMain.Tabs,TimelineWallControlCaseMain.Controls> {
    getAttribute(attributeName: "customerid"): Xrm.LookupAttribute<"account" | "contact"> | null;
    getAttribute(attributeName: "existingcase"): Xrm.LookupAttribute<"incident"> | null;
    getAttribute(attributeName: "msdyn_incidenttype"): Xrm.LookupAttribute<"msdyn_incidenttype"> | null;
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "primarycontactid"): Xrm.LookupAttribute<"contact"> | null;
    getAttribute(attributeName: "title"): Xrm.Attribute<string> | null;
    getAttribute(attributeName: string): undefined;
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
    getControl(controlName: "notescontrol"): Xrm.BaseControl;
    getControl(controlName: string): undefined;
  }
}
