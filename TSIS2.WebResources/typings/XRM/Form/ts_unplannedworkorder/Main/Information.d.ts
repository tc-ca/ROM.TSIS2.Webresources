declare namespace Form.ts_unplannedworkorder.Main {
  namespace Information {
    namespace Tabs {
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "statecode"): Xrm.OptionSetAttribute<ts_unplannedworkorder_statecode>;
      get(name: "statuscode"): Xrm.OptionSetAttribute<ts_unplannedworkorder_statuscode>;
      get(name: "ts_aircraftclassification"): Xrm.OptionSetAttribute<ts_aircraftclassification>;
      get(name: "ts_businessowner"): Xrm.Attribute<string>;
      get(name: "ts_contact"): Xrm.LookupAttribute<"contact">;
      get(name: "ts_country"): Xrm.LookupAttribute<"tc_country">;
      get(name: "ts_details"): Xrm.Attribute<string>;
      get(name: "ts_functionallocation"): Xrm.LookupAttribute<"msdyn_functionallocation">;
      get(name: "ts_name"): Xrm.Attribute<string>;
      get(name: "ts_operation"): Xrm.LookupAttribute<"ovs_operation">;
      get(name: "ts_operationtype"): Xrm.LookupAttribute<"ovs_operationtype">;
      get(name: "ts_overtimerequired"): Xrm.OptionSetAttribute<boolean>;
      get(name: "ts_primaryincidentdescription"): Xrm.Attribute<string>;
      get(name: "ts_primaryincidentestimatedduration"): Xrm.NumberAttribute;
      get(name: "ts_primaryincidenttype"): Xrm.LookupAttribute<"msdyn_incidenttype">;
      get(name: "ts_rational"): Xrm.LookupAttribute<"ovs_tyrational">;
      get(name: "ts_recordstatus"): Xrm.OptionSetAttribute<msdyn_wosystemstatus>;
      get(name: "ts_region"): Xrm.LookupAttribute<"territory">;
      get(name: "ts_site"): Xrm.LookupAttribute<"msdyn_functionallocation">;
      get(name: "ts_stakeholder"): Xrm.LookupAttribute<"account">;
      get(name: "ts_state"): Xrm.OptionSetAttribute<ts_planningstate>;
      get(name: "ts_subsubsite"): Xrm.LookupAttribute<"msdyn_functionallocation">;
      get(name: "ts_tradename"): Xrm.LookupAttribute<"ts_tradename">;
      get(name: "ts_worklocation"): Xrm.OptionSetAttribute<msdyn_worklocation>;
      get(name: "ts_workordertype"): Xrm.LookupAttribute<"msdyn_workordertype">;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "header_statecode"): Xrm.OptionSetControl<ts_unplannedworkorder_statecode>;
      get(name: "header_statuscode"): Xrm.OptionSetControl<ts_unplannedworkorder_statuscode>;
      get(name: "header_ts_recordstatus"): Xrm.OptionSetControl<msdyn_wosystemstatus>;
      get(name: "ts_aircraftclassification"): Xrm.OptionSetControl<ts_aircraftclassification>;
      get(name: "ts_businessowner"): Xrm.StringControl;
      get(name: "ts_contact"): Xrm.LookupControl<"contact">;
      get(name: "ts_country"): Xrm.LookupControl<"tc_country">;
      get(name: "ts_details"): Xrm.StringControl;
      get(name: "ts_functionallocation"): Xrm.LookupControl<"msdyn_functionallocation">;
      get(name: "ts_name"): Xrm.StringControl;
      get(name: "ts_operation"): Xrm.LookupControl<"ovs_operation">;
      get(name: "ts_operationtype"): Xrm.LookupControl<"ovs_operationtype">;
      get(name: "ts_overtimerequired"): Xrm.OptionSetControl<boolean>;
      get(name: "ts_primaryincidentdescription"): Xrm.StringControl;
      get(name: "ts_primaryincidentestimatedduration"): Xrm.NumberControl;
      get(name: "ts_primaryincidenttype"): Xrm.LookupControl<"msdyn_incidenttype">;
      get(name: "ts_rational"): Xrm.LookupControl<"ovs_tyrational">;
      get(name: "ts_region"): Xrm.LookupControl<"territory">;
      get(name: "ts_site"): Xrm.LookupControl<"msdyn_functionallocation">;
      get(name: "ts_stakeholder"): Xrm.LookupControl<"account">;
      get(name: "ts_state"): Xrm.OptionSetControl<ts_planningstate>;
      get(name: "ts_subsubsite"): Xrm.LookupControl<"msdyn_functionallocation">;
      get(name: "ts_tradename"): Xrm.LookupControl<"ts_tradename">;
      get(name: "ts_worklocation"): Xrm.OptionSetControl<msdyn_worklocation>;
      get(name: "ts_workordertype"): Xrm.LookupControl<"msdyn_workordertype">;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Information extends Xrm.PageBase<Information.Attributes,Information.Tabs,Information.Controls> {
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "statecode"): Xrm.OptionSetAttribute<ts_unplannedworkorder_statecode>;
    getAttribute(attributeName: "statuscode"): Xrm.OptionSetAttribute<ts_unplannedworkorder_statuscode>;
    getAttribute(attributeName: "ts_aircraftclassification"): Xrm.OptionSetAttribute<ts_aircraftclassification>;
    getAttribute(attributeName: "ts_businessowner"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_contact"): Xrm.LookupAttribute<"contact">;
    getAttribute(attributeName: "ts_country"): Xrm.LookupAttribute<"tc_country">;
    getAttribute(attributeName: "ts_details"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_functionallocation"): Xrm.LookupAttribute<"msdyn_functionallocation">;
    getAttribute(attributeName: "ts_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_operation"): Xrm.LookupAttribute<"ovs_operation">;
    getAttribute(attributeName: "ts_operationtype"): Xrm.LookupAttribute<"ovs_operationtype">;
    getAttribute(attributeName: "ts_overtimerequired"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "ts_primaryincidentdescription"): Xrm.Attribute<string>;
    getAttribute(attributeName: "ts_primaryincidentestimatedduration"): Xrm.NumberAttribute;
    getAttribute(attributeName: "ts_primaryincidenttype"): Xrm.LookupAttribute<"msdyn_incidenttype">;
    getAttribute(attributeName: "ts_rational"): Xrm.LookupAttribute<"ovs_tyrational">;
    getAttribute(attributeName: "ts_recordstatus"): Xrm.OptionSetAttribute<msdyn_wosystemstatus>;
    getAttribute(attributeName: "ts_region"): Xrm.LookupAttribute<"territory">;
    getAttribute(attributeName: "ts_site"): Xrm.LookupAttribute<"msdyn_functionallocation">;
    getAttribute(attributeName: "ts_stakeholder"): Xrm.LookupAttribute<"account">;
    getAttribute(attributeName: "ts_state"): Xrm.OptionSetAttribute<ts_planningstate>;
    getAttribute(attributeName: "ts_subsubsite"): Xrm.LookupAttribute<"msdyn_functionallocation">;
    getAttribute(attributeName: "ts_tradename"): Xrm.LookupAttribute<"ts_tradename">;
    getAttribute(attributeName: "ts_worklocation"): Xrm.OptionSetAttribute<msdyn_worklocation>;
    getAttribute(attributeName: "ts_workordertype"): Xrm.LookupAttribute<"msdyn_workordertype">;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "header_statecode"): Xrm.OptionSetControl<ts_unplannedworkorder_statecode>;
    getControl(controlName: "header_statuscode"): Xrm.OptionSetControl<ts_unplannedworkorder_statuscode>;
    getControl(controlName: "header_ts_recordstatus"): Xrm.OptionSetControl<msdyn_wosystemstatus>;
    getControl(controlName: "ts_aircraftclassification"): Xrm.OptionSetControl<ts_aircraftclassification>;
    getControl(controlName: "ts_businessowner"): Xrm.StringControl;
    getControl(controlName: "ts_contact"): Xrm.LookupControl<"contact">;
    getControl(controlName: "ts_country"): Xrm.LookupControl<"tc_country">;
    getControl(controlName: "ts_details"): Xrm.StringControl;
    getControl(controlName: "ts_functionallocation"): Xrm.LookupControl<"msdyn_functionallocation">;
    getControl(controlName: "ts_name"): Xrm.StringControl;
    getControl(controlName: "ts_operation"): Xrm.LookupControl<"ovs_operation">;
    getControl(controlName: "ts_operationtype"): Xrm.LookupControl<"ovs_operationtype">;
    getControl(controlName: "ts_overtimerequired"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "ts_primaryincidentdescription"): Xrm.StringControl;
    getControl(controlName: "ts_primaryincidentestimatedduration"): Xrm.NumberControl;
    getControl(controlName: "ts_primaryincidenttype"): Xrm.LookupControl<"msdyn_incidenttype">;
    getControl(controlName: "ts_rational"): Xrm.LookupControl<"ovs_tyrational">;
    getControl(controlName: "ts_region"): Xrm.LookupControl<"territory">;
    getControl(controlName: "ts_site"): Xrm.LookupControl<"msdyn_functionallocation">;
    getControl(controlName: "ts_stakeholder"): Xrm.LookupControl<"account">;
    getControl(controlName: "ts_state"): Xrm.OptionSetControl<ts_planningstate>;
    getControl(controlName: "ts_subsubsite"): Xrm.LookupControl<"msdyn_functionallocation">;
    getControl(controlName: "ts_tradename"): Xrm.LookupControl<"ts_tradename">;
    getControl(controlName: "ts_worklocation"): Xrm.OptionSetControl<msdyn_worklocation>;
    getControl(controlName: "ts_workordertype"): Xrm.LookupControl<"msdyn_workordertype">;
    getControl(controlName: string): undefined;
  }
}
