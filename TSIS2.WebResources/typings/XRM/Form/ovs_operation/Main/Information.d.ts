declare namespace Form.ovs_operation.Main {
  namespace Information {
    namespace Tabs {
      interface Connections extends Xrm.SectionCollectionBase {
        get(name: "tab_3_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface WorkOrders extends Xrm.SectionCollectionBase {
        get(name: "tab_4_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface bb4b118ea1c94e04ae4d8c6a177ee56c extends Xrm.SectionCollectionBase {
        get(name: "_section_186"): Xrm.PageSection;
        get(name: "null_section_3"): Xrm.PageSection;
        get(name: "{bb4b118e-a1c9-4e04-ae4d-8c6a177ee56c}_section_5"): Xrm.PageSection;
        get(name: "{bb4b118e-a1c9-4e04-ae4d-8c6a177ee56c}_section_6"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface rel_operations_tab extends Xrm.SectionCollectionBase {
        get(name: "tab_2_section_1"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ovs_name"): Xrm.Attribute<string>;
      get(name: "ovs_operationtypeid"): Xrm.LookupAttribute<"ovs_operationtype">;
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "statecode"): Xrm.OptionSetAttribute<ovs_operation_statecode>;
      get(name: "ts_description"): Xrm.Attribute<string>;
      get(name: "ts_operationalstatus"): Xrm.OptionSetAttribute<ts_operationalstatus>;
      get(name: "ts_site"): Xrm.LookupAttribute<"msdyn_functionallocation">;
      get(name: "ts_stakeholder"): Xrm.LookupAttribute<"account">;
      get(name: "ts_statusenddate"): Xrm.DateAttribute;
      get(name: "ts_statusstartdate"): Xrm.DateAttribute;
      get(name: "ts_subsite"): Xrm.LookupAttribute<"msdyn_functionallocation">;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "Connections"): Xrm.SubGridControl<"connection">;
      get(name: "Subgrid_1"): Xrm.SubGridControl<"ovs_operation">;
      get(name: "Subgrid_2"): Xrm.SubGridControl<"connection">;
      get(name: "WorkOrders"): Xrm.SubGridControl<"msdyn_workorder">;
      get(name: "notescontrol"): Xrm.BaseControl;
      get(name: "ovs_name"): Xrm.StringControl;
      get(name: "ovs_operationtypeid"): Xrm.LookupControl<"ovs_operationtype">;
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "statecode"): Xrm.OptionSetControl<ovs_operation_statecode>;
      get(name: "ts_description"): Xrm.StringControl;
      get(name: "ts_operationalstatus"): Xrm.OptionSetControl<ts_operationalstatus>;
      get(name: "ts_site"): Xrm.LookupControl<"msdyn_functionallocation">;
      get(name: "ts_stakeholder"): Xrm.LookupControl<"account">;
      get(name: "ts_statusenddate"): Xrm.DateControl;
      get(name: "ts_statusstartdate"): Xrm.DateControl;
      get(name: "ts_subsite"): Xrm.LookupControl<"msdyn_functionallocation">;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "Connections"): Xrm.PageTab<Tabs.Connections>;
      get(name: "WorkOrders"): Xrm.PageTab<Tabs.WorkOrders>;
      get(name: "{bb4b118e-a1c9-4e04-ae4d-8c6a177ee56c}"): Xrm.PageTab<Tabs.bb4b118ea1c94e04ae4d8c6a177ee56c>;
      get(name: "rel_operations_tab"): Xrm.PageTab<Tabs.rel_operations_tab>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Information extends Xrm.PageBase<Information.Attributes,Information.Tabs,Information.Controls> {
    getAttribute(attributeName: "ovs_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ovs_operationtypeid"): Xrm.LookupAttribute<"ovs_operationtype">;
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "statecode"): Xrm.OptionSetAttribute<ovs_operation_statecode>;
    getAttribute(attributeName: "ts_description"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_operationalstatus"): Xrm.OptionSetAttribute<ts_operationalstatus>;
    getAttribute(attributeName: "ts_site"): Xrm.LookupAttribute<"msdyn_functionallocation">;
    getAttribute(attributeName: "ts_stakeholder"): Xrm.LookupAttribute<"account">;
    getAttribute(attributeName: "ts_statusenddate"): Xrm.DateAttribute;
    getAttribute(attributeName: "ts_statusstartdate"): Xrm.DateAttribute;
    getAttribute(attributeName: "ts_subsite"): Xrm.LookupAttribute<"msdyn_functionallocation">;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "Connections"): Xrm.SubGridControl<"connection">;
    getControl(controlName: "Subgrid_1"): Xrm.SubGridControl<"ovs_operation">;
    getControl(controlName: "Subgrid_2"): Xrm.SubGridControl<"connection">;
    getControl(controlName: "WorkOrders"): Xrm.SubGridControl<"msdyn_workorder">;
    getControl(controlName: "notescontrol"): Xrm.BaseControl;
    getControl(controlName: "ovs_name"): Xrm.StringControl;
    getControl(controlName: "ovs_operationtypeid"): Xrm.LookupControl<"ovs_operationtype">;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "statecode"): Xrm.OptionSetControl<ovs_operation_statecode>;
    getControl(controlName: "ts_description"): Xrm.StringControl;
    getControl(controlName: "ts_operationalstatus"): Xrm.OptionSetControl<ts_operationalstatus>;
    getControl(controlName: "ts_site"): Xrm.LookupControl<"msdyn_functionallocation">;
    getControl(controlName: "ts_stakeholder"): Xrm.LookupControl<"account">;
    getControl(controlName: "ts_statusenddate"): Xrm.DateControl;
    getControl(controlName: "ts_statusstartdate"): Xrm.DateControl;
    getControl(controlName: "ts_subsite"): Xrm.LookupControl<"msdyn_functionallocation">;
    getControl(controlName: string): undefined;
  }
}
