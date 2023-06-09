declare namespace Form.msdyn_workorder.Quick {
  namespace WorkOrderTimeTrackingForm {
    namespace Tabs {
      interface tab_1 extends Xrm.SectionCollectionBase {
        get(name: "Time_Tracking_section"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "msdyn_billingaccount"): Xrm.LookupAttribute<"account"> | null;
      get(name: "msdyn_primaryincidenttype"): Xrm.LookupAttribute<"msdyn_incidenttype"> | null;
      get(name: "msdyn_priority"): Xrm.LookupAttribute<"msdyn_priority"> | null;
      get(name: "msdyn_serviceaccount"): Xrm.LookupAttribute<"account"> | null;
      get(name: "msdyn_servicerequest"): Xrm.LookupAttribute<"incident">;
      get(name: "msdyn_substatus"): Xrm.LookupAttribute<"msdyn_workordersubstatus"> | null;
      get(name: "msdyn_systemstatus"): Xrm.OptionSetAttribute<msdyn_wosystemstatus> | null;
      get(name: "msdyn_workordertype"): Xrm.LookupAttribute<"msdyn_workordertype"> | null;
      get(name: "ts_comments"): Xrm.Attribute<string>;
      get(name: "ts_conductingoversight"): Xrm.NumberAttribute;
      get(name: "ts_preparationtime"): Xrm.NumberAttribute;
      get(name: "ts_securityincident"): Xrm.LookupAttribute<"ts_securityincident">;
      get(name: "ts_traveltime"): Xrm.NumberAttribute;
      get(name: "ts_woreportinganddocumentation"): Xrm.NumberAttribute;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "header_process_msdyn_billingaccount"): Xrm.LookupControl<"account"> | null;
      get(name: "header_process_msdyn_billingaccount_1"): Xrm.LookupControl<"account"> | null;
      get(name: "header_process_msdyn_primaryincidenttype"): Xrm.LookupControl<"msdyn_incidenttype"> | null;
      get(name: "header_process_msdyn_primaryincidenttype_1"): Xrm.LookupControl<"msdyn_incidenttype"> | null;
      get(name: "header_process_msdyn_priority"): Xrm.LookupControl<"msdyn_priority"> | null;
      get(name: "header_process_msdyn_priority_1"): Xrm.LookupControl<"msdyn_priority"> | null;
      get(name: "header_process_msdyn_priority_2"): Xrm.LookupControl<"msdyn_priority"> | null;
      get(name: "header_process_msdyn_serviceaccount"): Xrm.LookupControl<"account"> | null;
      get(name: "header_process_msdyn_serviceaccount_1"): Xrm.LookupControl<"account"> | null;
      get(name: "header_process_msdyn_serviceaccount_2"): Xrm.LookupControl<"account"> | null;
      get(name: "header_process_msdyn_substatus"): Xrm.LookupControl<"msdyn_workordersubstatus"> | null;
      get(name: "header_process_msdyn_substatus_1"): Xrm.LookupControl<"msdyn_workordersubstatus"> | null;
      get(name: "header_process_msdyn_substatus_2"): Xrm.LookupControl<"msdyn_workordersubstatus"> | null;
      get(name: "header_process_msdyn_systemstatus"): Xrm.OptionSetControl<msdyn_wosystemstatus> | null;
      get(name: "header_process_msdyn_systemstatus_1"): Xrm.OptionSetControl<msdyn_wosystemstatus> | null;
      get(name: "header_process_msdyn_systemstatus_2"): Xrm.OptionSetControl<msdyn_wosystemstatus> | null;
      get(name: "header_process_msdyn_systemstatus_3"): Xrm.OptionSetControl<msdyn_wosystemstatus> | null;
      get(name: "header_process_msdyn_systemstatus_4"): Xrm.OptionSetControl<msdyn_wosystemstatus> | null;
      get(name: "header_process_msdyn_systemstatus_5"): Xrm.OptionSetControl<msdyn_wosystemstatus> | null;
      get(name: "header_process_msdyn_workordertype"): Xrm.LookupControl<"msdyn_workordertype"> | null;
      get(name: "header_process_msdyn_workordertype_1"): Xrm.LookupControl<"msdyn_workordertype"> | null;
      get(name: "header_process_msdyn_workordertype_2"): Xrm.LookupControl<"msdyn_workordertype"> | null;
      get(name: "msdyn_servicerequest"): Xrm.LookupControl<"incident">;
      get(name: "ts_comments"): Xrm.StringControl;
      get(name: "ts_conductingoversight"): Xrm.NumberControl;
      get(name: "ts_preparationtime"): Xrm.NumberControl;
      get(name: "ts_securityincident"): Xrm.LookupControl<"ts_securityincident">;
      get(name: "ts_traveltime"): Xrm.NumberControl;
      get(name: "ts_woreportinganddocumentation"): Xrm.NumberControl;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "tab_1"): Xrm.PageTab<Tabs.tab_1>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface WorkOrderTimeTrackingForm extends Xrm.PageBase<WorkOrderTimeTrackingForm.Attributes,WorkOrderTimeTrackingForm.Tabs,WorkOrderTimeTrackingForm.Controls> {
    getAttribute(attributeName: "msdyn_billingaccount"): Xrm.LookupAttribute<"account"> | null;
    getAttribute(attributeName: "msdyn_primaryincidenttype"): Xrm.LookupAttribute<"msdyn_incidenttype"> | null;
    getAttribute(attributeName: "msdyn_priority"): Xrm.LookupAttribute<"msdyn_priority"> | null;
    getAttribute(attributeName: "msdyn_serviceaccount"): Xrm.LookupAttribute<"account"> | null;
    getAttribute(attributeName: "msdyn_servicerequest"): Xrm.LookupAttribute<"incident">;
    getAttribute(attributeName: "msdyn_substatus"): Xrm.LookupAttribute<"msdyn_workordersubstatus"> | null;
    getAttribute(attributeName: "msdyn_systemstatus"): Xrm.OptionSetAttribute<msdyn_wosystemstatus> | null;
    getAttribute(attributeName: "msdyn_workordertype"): Xrm.LookupAttribute<"msdyn_workordertype"> | null;
    getAttribute(attributeName: "ts_comments"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_conductingoversight"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_preparationtime"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_securityincident"): Xrm.LookupAttribute<"ts_securityincident">;
    getAttribute(attributeName: "ts_traveltime"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_woreportinganddocumentation"): Xrm.NumberAttribute;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "header_process_msdyn_billingaccount"): Xrm.LookupControl<"account"> | null;
    getControl(controlName: "header_process_msdyn_billingaccount_1"): Xrm.LookupControl<"account"> | null;
    getControl(controlName: "header_process_msdyn_primaryincidenttype"): Xrm.LookupControl<"msdyn_incidenttype"> | null;
    getControl(controlName: "header_process_msdyn_primaryincidenttype_1"): Xrm.LookupControl<"msdyn_incidenttype"> | null;
    getControl(controlName: "header_process_msdyn_priority"): Xrm.LookupControl<"msdyn_priority"> | null;
    getControl(controlName: "header_process_msdyn_priority_1"): Xrm.LookupControl<"msdyn_priority"> | null;
    getControl(controlName: "header_process_msdyn_priority_2"): Xrm.LookupControl<"msdyn_priority"> | null;
    getControl(controlName: "header_process_msdyn_serviceaccount"): Xrm.LookupControl<"account"> | null;
    getControl(controlName: "header_process_msdyn_serviceaccount_1"): Xrm.LookupControl<"account"> | null;
    getControl(controlName: "header_process_msdyn_serviceaccount_2"): Xrm.LookupControl<"account"> | null;
    getControl(controlName: "header_process_msdyn_substatus"): Xrm.LookupControl<"msdyn_workordersubstatus"> | null;
    getControl(controlName: "header_process_msdyn_substatus_1"): Xrm.LookupControl<"msdyn_workordersubstatus"> | null;
    getControl(controlName: "header_process_msdyn_substatus_2"): Xrm.LookupControl<"msdyn_workordersubstatus"> | null;
    getControl(controlName: "header_process_msdyn_systemstatus"): Xrm.OptionSetControl<msdyn_wosystemstatus> | null;
    getControl(controlName: "header_process_msdyn_systemstatus_1"): Xrm.OptionSetControl<msdyn_wosystemstatus> | null;
    getControl(controlName: "header_process_msdyn_systemstatus_2"): Xrm.OptionSetControl<msdyn_wosystemstatus> | null;
    getControl(controlName: "header_process_msdyn_systemstatus_3"): Xrm.OptionSetControl<msdyn_wosystemstatus> | null;
    getControl(controlName: "header_process_msdyn_systemstatus_4"): Xrm.OptionSetControl<msdyn_wosystemstatus> | null;
    getControl(controlName: "header_process_msdyn_systemstatus_5"): Xrm.OptionSetControl<msdyn_wosystemstatus> | null;
    getControl(controlName: "header_process_msdyn_workordertype"): Xrm.LookupControl<"msdyn_workordertype"> | null;
    getControl(controlName: "header_process_msdyn_workordertype_1"): Xrm.LookupControl<"msdyn_workordertype"> | null;
    getControl(controlName: "header_process_msdyn_workordertype_2"): Xrm.LookupControl<"msdyn_workordertype"> | null;
    getControl(controlName: "msdyn_servicerequest"): Xrm.LookupControl<"incident">;
    getControl(controlName: "ts_comments"): Xrm.StringControl;
    getControl(controlName: "ts_conductingoversight"): Xrm.NumberControl;
    getControl(controlName: "ts_preparationtime"): Xrm.NumberControl;
    getControl(controlName: "ts_securityincident"): Xrm.LookupControl<"ts_securityincident">;
    getControl(controlName: "ts_traveltime"): Xrm.NumberControl;
    getControl(controlName: "ts_woreportinganddocumentation"): Xrm.NumberControl;
    getControl(controlName: string): undefined;
  }
}
