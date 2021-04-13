declare namespace Form.msdyn_workorder.Main {
  namespace WorkOrderMobile {
    namespace Tabs {
      interface b8e326ee5c214a18ba55e3b56966c249 extends Xrm.SectionCollectionBase {
        get(name: "fstab_other_section_misc"): Xrm.PageSection;
        get(name: "fstab_other_section_total"): Xrm.PageSection;
        get(name: "fstab_sub_grids_section"): Xrm.PageSection;
        get(name: "fstab_summary_section_address"): Xrm.PageSection;
        get(name: "fstab_summary_section_general"): Xrm.PageSection;
        get(name: "fstab_summary_section_primary_incident"): Xrm.PageSection;
        get(name: "fstab_summary_section_sales_tax"): Xrm.PageSection;
        get(name: "{b8e326ee-5c21-4a18-ba55-e3b56966c249}_column_2_section_1"): Xrm.PageSection;
        get(name: "{b8e326ee-5c21-4a18-ba55-e3b56966c249}_section_9"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_8 extends Xrm.SectionCollectionBase {
        get(name: "tab_8_section_2"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "msdyn_address1"): Xrm.Attribute<string>;
      get(name: "msdyn_address2"): Xrm.Attribute<string>;
      get(name: "msdyn_address3"): Xrm.Attribute<string>;
      get(name: "msdyn_billingaccount"): Xrm.LookupAttribute<"account">;
      get(name: "msdyn_city"): Xrm.Attribute<string>;
      get(name: "msdyn_country"): Xrm.Attribute<string>;
      get(name: "msdyn_customerasset"): Xrm.LookupAttribute<"msdyn_customerasset">;
      get(name: "msdyn_estimatesubtotalamount"): Xrm.NumberAttribute;
      get(name: "msdyn_functionallocation"): Xrm.LookupAttribute<"msdyn_functionallocation">;
      get(name: "msdyn_instructions"): Xrm.Attribute<string>;
      get(name: "msdyn_internalflags"): Xrm.Attribute<string>;
      get(name: "msdyn_iotalert"): Xrm.LookupAttribute<"msdyn_iotalert">;
      get(name: "msdyn_latitude"): Xrm.NumberAttribute;
      get(name: "msdyn_longitude"): Xrm.NumberAttribute;
      get(name: "msdyn_mapcontrol"): Xrm.Attribute<any>;
      get(name: "msdyn_name"): Xrm.Attribute<string>;
      get(name: "msdyn_postalcode"): Xrm.Attribute<string>;
      get(name: "msdyn_pricelist"): Xrm.LookupAttribute<"pricelevel">;
      get(name: "msdyn_primaryincidentdescription"): Xrm.Attribute<string>;
      get(name: "msdyn_primaryincidenttype"): Xrm.LookupAttribute<"msdyn_incidenttype">;
      get(name: "msdyn_primaryresolution"): Xrm.LookupAttribute<"msdyn_resolution">;
      get(name: "msdyn_priority"): Xrm.LookupAttribute<"msdyn_priority">;
      get(name: "msdyn_reportedbycontact"): Xrm.LookupAttribute<"contact">;
      get(name: "msdyn_serviceaccount"): Xrm.LookupAttribute<"account">;
      get(name: "msdyn_serviceterritory"): Xrm.LookupAttribute<"territory">;
      get(name: "msdyn_stateorprovince"): Xrm.Attribute<string>;
      get(name: "msdyn_substatus"): Xrm.LookupAttribute<"msdyn_workordersubstatus">;
      get(name: "msdyn_subtotalamount"): Xrm.NumberAttribute;
      get(name: "msdyn_supportcontact"): Xrm.LookupAttribute<"bookableresource">;
      get(name: "msdyn_systemstatus"): Xrm.OptionSetAttribute<msdyn_wosystemstatus>;
      get(name: "msdyn_taxable"): Xrm.Attribute<any>;
      get(name: "msdyn_taxcode"): Xrm.LookupAttribute<"msdyn_taxcode">;
      get(name: "msdyn_timefrompromised"): Xrm.DateAttribute;
      get(name: "msdyn_timetopromised"): Xrm.DateAttribute;
      get(name: "msdyn_totalamount"): Xrm.NumberAttribute;
      get(name: "msdyn_totalsalestax"): Xrm.NumberAttribute;
      get(name: "msdyn_workordersummary"): Xrm.Attribute<string>;
      get(name: "msdyn_workordertype"): Xrm.LookupAttribute<"msdyn_workordertype">;
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "transactioncurrencyid"): Xrm.LookupAttribute<"transactioncurrency">;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "Incidents_List"): Xrm.SubGridControl<"msdyn_workorderincident">;
      get(name: "KnowledgeArticlesSubGrid"): Xrm.SubGridControl<"knowledgearticle">;
      get(name: "bookings"): Xrm.SubGridControl<"bookableresourcebooking">;
      get(name: "header_msdyn_primaryincidenttype"): Xrm.LookupControl<"msdyn_incidenttype">;
      get(name: "header_msdyn_serviceaccount"): Xrm.LookupControl<"account">;
      get(name: "header_msdyn_systemstatus"): Xrm.OptionSetControl<msdyn_wosystemstatus>;
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
      get(name: "msdyn_address1"): Xrm.StringControl;
      get(name: "msdyn_address11"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "msdyn_address2"): Xrm.StringControl;
      get(name: "msdyn_address3"): Xrm.StringControl;
      get(name: "msdyn_billingaccount"): Xrm.LookupControl<"account">;
      get(name: "msdyn_city"): Xrm.StringControl;
      get(name: "msdyn_country"): Xrm.StringControl;
      get(name: "msdyn_customerasset"): Xrm.LookupControl<"msdyn_customerasset">;
      get(name: "msdyn_estimatesubtotalamount"): Xrm.NumberControl;
      get(name: "msdyn_functionallocation"): Xrm.LookupControl<"msdyn_functionallocation">;
      get(name: "msdyn_instructions"): Xrm.StringControl;
      get(name: "msdyn_internalflags"): Xrm.StringControl;
      get(name: "msdyn_iotalert"): Xrm.LookupControl<"msdyn_iotalert">;
      get(name: "msdyn_latitude"): Xrm.NumberControl;
      get(name: "msdyn_latitude1"): Xrm.NumberControl;
      get(name: "msdyn_longitude"): Xrm.NumberControl;
      get(name: "msdyn_longitude1"): Xrm.NumberControl;
      get(name: "msdyn_mapcontrol"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "msdyn_name"): Xrm.StringControl;
      get(name: "msdyn_postalcode"): Xrm.StringControl;
      get(name: "msdyn_pricelist"): Xrm.LookupControl<"pricelevel">;
      get(name: "msdyn_primaryincidentdescription"): Xrm.StringControl;
      get(name: "msdyn_primaryincidenttype"): Xrm.LookupControl<"msdyn_incidenttype">;
      get(name: "msdyn_primaryresolution"): Xrm.LookupControl<"msdyn_resolution">;
      get(name: "msdyn_priority"): Xrm.LookupControl<"msdyn_priority">;
      get(name: "msdyn_reportedbycontact"): Xrm.LookupControl<"contact">;
      get(name: "msdyn_serviceaccount"): Xrm.LookupControl<"account">;
      get(name: "msdyn_serviceterritory"): Xrm.LookupControl<"territory">;
      get(name: "msdyn_stateorprovince"): Xrm.StringControl;
      get(name: "msdyn_substatus"): Xrm.LookupControl<"msdyn_workordersubstatus">;
      get(name: "msdyn_subtotalamount"): Xrm.NumberControl;
      get(name: "msdyn_supportcontact"): Xrm.LookupControl<"bookableresource">;
      get(name: "msdyn_systemstatus"): Xrm.OptionSetControl<msdyn_wosystemstatus>;
      get(name: "msdyn_taxable"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "msdyn_taxcode"): Xrm.LookupControl<"msdyn_taxcode">;
      get(name: "msdyn_timefrompromised"): Xrm.DateControl;
      get(name: "msdyn_timetopromised"): Xrm.DateControl;
      get(name: "msdyn_totalamount"): Xrm.NumberControl;
      get(name: "msdyn_totalsalestax"): Xrm.NumberControl;
      get(name: "msdyn_workordersummary"): Xrm.StringControl;
      get(name: "msdyn_workordertype"): Xrm.LookupControl<"msdyn_workordertype">;
      get(name: "notescontrol"): Xrm.BaseControl;
      get(name: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "transactioncurrencyid"): Xrm.LookupControl<"transactioncurrency">;
      get(name: "workorderproductsgrid"): Xrm.SubGridControl<"msdyn_workorderproduct">;
      get(name: "workorderservicesgrid"): Xrm.SubGridControl<"msdyn_workorderservice">;
      get(name: "workorderservicetasksgrid"): Xrm.SubGridControl<"msdyn_workorderservicetask">;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "{b8e326ee-5c21-4a18-ba55-e3b56966c249}"): Xrm.PageTab<Tabs.b8e326ee5c214a18ba55e3b56966c249>;
      get(name: "tab_8"): Xrm.PageTab<Tabs.tab_8>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface WorkOrderMobile extends Xrm.PageBase<WorkOrderMobile.Attributes,WorkOrderMobile.Tabs,WorkOrderMobile.Controls> {
    getAttribute(attributeName: "msdyn_address1"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_address2"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_address3"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_billingaccount"): Xrm.LookupAttribute<"account">;
    getAttribute(attributeName: "msdyn_city"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_country"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_customerasset"): Xrm.LookupAttribute<"msdyn_customerasset">;
    getAttribute(attributeName: "msdyn_estimatesubtotalamount"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_functionallocation"): Xrm.LookupAttribute<"msdyn_functionallocation">;
    getAttribute(attributeName: "msdyn_instructions"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_internalflags"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_iotalert"): Xrm.LookupAttribute<"msdyn_iotalert">;
    getAttribute(attributeName: "msdyn_latitude"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_longitude"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_mapcontrol"): Xrm.Attribute<any>;
    getAttribute(attributeName: "msdyn_name"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_postalcode"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_pricelist"): Xrm.LookupAttribute<"pricelevel">;
    getAttribute(attributeName: "msdyn_primaryincidentdescription"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_primaryincidenttype"): Xrm.LookupAttribute<"msdyn_incidenttype">;
    getAttribute(attributeName: "msdyn_primaryresolution"): Xrm.LookupAttribute<"msdyn_resolution">;
    getAttribute(attributeName: "msdyn_priority"): Xrm.LookupAttribute<"msdyn_priority">;
    getAttribute(attributeName: "msdyn_reportedbycontact"): Xrm.LookupAttribute<"contact">;
    getAttribute(attributeName: "msdyn_serviceaccount"): Xrm.LookupAttribute<"account">;
    getAttribute(attributeName: "msdyn_serviceterritory"): Xrm.LookupAttribute<"territory">;
    getAttribute(attributeName: "msdyn_stateorprovince"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_substatus"): Xrm.LookupAttribute<"msdyn_workordersubstatus">;
    getAttribute(attributeName: "msdyn_subtotalamount"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_supportcontact"): Xrm.LookupAttribute<"bookableresource">;
    getAttribute(attributeName: "msdyn_systemstatus"): Xrm.OptionSetAttribute<msdyn_wosystemstatus>;
    getAttribute(attributeName: "msdyn_taxable"): Xrm.Attribute<any>;
    getAttribute(attributeName: "msdyn_taxcode"): Xrm.LookupAttribute<"msdyn_taxcode">;
    getAttribute(attributeName: "msdyn_timefrompromised"): Xrm.DateAttribute;
    getAttribute(attributeName: "msdyn_timetopromised"): Xrm.DateAttribute;
    getAttribute(attributeName: "msdyn_totalamount"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_totalsalestax"): Xrm.NumberAttribute;
    getAttribute(attributeName: "msdyn_workordersummary"): Xrm.Attribute<string>;
    getAttribute(attributeName: "msdyn_workordertype"): Xrm.LookupAttribute<"msdyn_workordertype">;
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "transactioncurrencyid"): Xrm.LookupAttribute<"transactioncurrency">;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "Incidents_List"): Xrm.SubGridControl<"msdyn_workorderincident">;
    getControl(controlName: "KnowledgeArticlesSubGrid"): Xrm.SubGridControl<"knowledgearticle">;
    getControl(controlName: "bookings"): Xrm.SubGridControl<"bookableresourcebooking">;
    getControl(controlName: "header_msdyn_primaryincidenttype"): Xrm.LookupControl<"msdyn_incidenttype">;
    getControl(controlName: "header_msdyn_serviceaccount"): Xrm.LookupControl<"account">;
    getControl(controlName: "header_msdyn_systemstatus"): Xrm.OptionSetControl<msdyn_wosystemstatus>;
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
    getControl(controlName: "msdyn_address1"): Xrm.StringControl;
    getControl(controlName: "msdyn_address11"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "msdyn_address2"): Xrm.StringControl;
    getControl(controlName: "msdyn_address3"): Xrm.StringControl;
    getControl(controlName: "msdyn_billingaccount"): Xrm.LookupControl<"account">;
    getControl(controlName: "msdyn_city"): Xrm.StringControl;
    getControl(controlName: "msdyn_country"): Xrm.StringControl;
    getControl(controlName: "msdyn_customerasset"): Xrm.LookupControl<"msdyn_customerasset">;
    getControl(controlName: "msdyn_estimatesubtotalamount"): Xrm.NumberControl;
    getControl(controlName: "msdyn_functionallocation"): Xrm.LookupControl<"msdyn_functionallocation">;
    getControl(controlName: "msdyn_instructions"): Xrm.StringControl;
    getControl(controlName: "msdyn_internalflags"): Xrm.StringControl;
    getControl(controlName: "msdyn_iotalert"): Xrm.LookupControl<"msdyn_iotalert">;
    getControl(controlName: "msdyn_latitude"): Xrm.NumberControl;
    getControl(controlName: "msdyn_latitude1"): Xrm.NumberControl;
    getControl(controlName: "msdyn_longitude"): Xrm.NumberControl;
    getControl(controlName: "msdyn_longitude1"): Xrm.NumberControl;
    getControl(controlName: "msdyn_mapcontrol"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "msdyn_name"): Xrm.StringControl;
    getControl(controlName: "msdyn_postalcode"): Xrm.StringControl;
    getControl(controlName: "msdyn_pricelist"): Xrm.LookupControl<"pricelevel">;
    getControl(controlName: "msdyn_primaryincidentdescription"): Xrm.StringControl;
    getControl(controlName: "msdyn_primaryincidenttype"): Xrm.LookupControl<"msdyn_incidenttype">;
    getControl(controlName: "msdyn_primaryresolution"): Xrm.LookupControl<"msdyn_resolution">;
    getControl(controlName: "msdyn_priority"): Xrm.LookupControl<"msdyn_priority">;
    getControl(controlName: "msdyn_reportedbycontact"): Xrm.LookupControl<"contact">;
    getControl(controlName: "msdyn_serviceaccount"): Xrm.LookupControl<"account">;
    getControl(controlName: "msdyn_serviceterritory"): Xrm.LookupControl<"territory">;
    getControl(controlName: "msdyn_stateorprovince"): Xrm.StringControl;
    getControl(controlName: "msdyn_substatus"): Xrm.LookupControl<"msdyn_workordersubstatus">;
    getControl(controlName: "msdyn_subtotalamount"): Xrm.NumberControl;
    getControl(controlName: "msdyn_supportcontact"): Xrm.LookupControl<"bookableresource">;
    getControl(controlName: "msdyn_systemstatus"): Xrm.OptionSetControl<msdyn_wosystemstatus>;
    getControl(controlName: "msdyn_taxable"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "msdyn_taxcode"): Xrm.LookupControl<"msdyn_taxcode">;
    getControl(controlName: "msdyn_timefrompromised"): Xrm.DateControl;
    getControl(controlName: "msdyn_timetopromised"): Xrm.DateControl;
    getControl(controlName: "msdyn_totalamount"): Xrm.NumberControl;
    getControl(controlName: "msdyn_totalsalestax"): Xrm.NumberControl;
    getControl(controlName: "msdyn_workordersummary"): Xrm.StringControl;
    getControl(controlName: "msdyn_workordertype"): Xrm.LookupControl<"msdyn_workordertype">;
    getControl(controlName: "notescontrol"): Xrm.BaseControl;
    getControl(controlName: "ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "transactioncurrencyid"): Xrm.LookupControl<"transactioncurrency">;
    getControl(controlName: "workorderproductsgrid"): Xrm.SubGridControl<"msdyn_workorderproduct">;
    getControl(controlName: "workorderservicesgrid"): Xrm.SubGridControl<"msdyn_workorderservice">;
    getControl(controlName: "workorderservicetasksgrid"): Xrm.SubGridControl<"msdyn_workorderservicetask">;
    getControl(controlName: string): undefined;
  }
}
