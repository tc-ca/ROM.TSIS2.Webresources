declare namespace Form.appointment.Main {
  namespace Appointment {
    namespace Tabs {
      interface appointment extends Xrm.SectionCollectionBase {
        get(name: "appointment description"): Xrm.PageSection;
        get(name: "attachments"): Xrm.PageSection;
        get(name: "general information"): Xrm.PageSection;
        get(name: "scheduling information"): Xrm.PageSection;
        get(name: "tab_2_section_2"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_ci_call_summary extends Xrm.SectionCollectionBase {
        get(name: "tab_ci_section_call_summary"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_ci_notes extends Xrm.SectionCollectionBase {
        get(name: "tab_ci_section_notes"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
      interface tab_notes extends Xrm.SectionCollectionBase {
        get(name: "timeline_section"): Xrm.PageSection;
        get(name: string): undefined;
        get(): Xrm.PageSection[];
        get(index: number): Xrm.PageSection;
        get(chooser: (item: Xrm.PageSection, index: number) => boolean): Xrm.PageSection[];
      }
    }
    interface Attributes extends Xrm.AttributeCollectionBase {
      get(name: "birthdate"): Xrm.DateAttribute | null;
      get(name: "budgetamount"): Xrm.NumberAttribute | null;
      get(name: "closeprobability"): Xrm.NumberAttribute | null;
      get(name: "companyname"): Xrm.Attribute<string> | null;
      get(name: "createdon"): Xrm.DateAttribute | null;
      get(name: "currentsituation"): Xrm.Attribute<string> | null;
      get(name: "customerneed"): Xrm.Attribute<string> | null;
      get(name: "decisionmaker"): Xrm.OptionSetAttribute<boolean> | null;
      get(name: "description"): Xrm.Attribute<any>;
      get(name: "emailaddress1"): Xrm.Attribute<string> | null;
      get(name: "estimatedclosedate"): Xrm.DateAttribute | null;
      get(name: "estimatedvalue"): Xrm.NumberAttribute | null;
      get(name: "familystatuscode"): Xrm.OptionSetAttribute<number> | null;
      get(name: "firstname"): Xrm.Attribute<string> | null;
      get(name: "isalldayevent"): Xrm.OptionSetAttribute<boolean>;
      get(name: "isonlinemeeting"): Xrm.Attribute<any>;
      get(name: "jobtitle"): Xrm.Attribute<string> | null;
      get(name: "lastname"): Xrm.Attribute<string> | null;
      get(name: "location"): Xrm.Attribute<string>;
      get(name: "mobilephone"): Xrm.Attribute<string> | null;
      get(name: "name"): Xrm.Attribute<string> | null;
      get(name: "onlinemeetingjoinurl"): Xrm.Attribute<any>;
      get(name: "opportunityratingcode"): Xrm.OptionSetAttribute<number> | null;
      get(name: "optionalattendees"): Xrm.LookupAttribute<"account" | "contact" | "entitlement" | "equipment" | "knowledgearticle" | "lead" | "msdyn_salessuggestion" | "queue" | "systemuser" | "unresolvedaddress">;
      get(name: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
      get(name: "parentaccountid"): Xrm.LookupAttribute<"account"> | null;
      get(name: "parentcontactid"): Xrm.LookupAttribute<"opportunity"> | null;
      get(name: "parentcustomerid"): Xrm.LookupAttribute<"contact"> | null;
      get(name: "primarycontactid"): Xrm.LookupAttribute<"account"> | null;
      get(name: "prioritycode"): Xrm.OptionSetAttribute<appointment_prioritycode>;
      get(name: "proposedsolution"): Xrm.Attribute<string> | null;
      get(name: "purchaseprocess"): Xrm.OptionSetAttribute<number> | null;
      get(name: "purchasetimeframe"): Xrm.OptionSetAttribute<number> | null;
      get(name: "regardingobjectid"): Xrm.LookupAttribute<"account" | "bookableresourcebooking" | "bookableresourcebookingheader" | "bulkoperation" | "campaign" | "campaignactivity" | "contact" | "contract" | "entitlement" | "entitlementtemplate" | "ikl_a2d_securitytemplate" | "ikl_bulkmigrationjob" | "ikl_bulkmigrationjobstatus" | "ikl_inogiclicensedetails" | "incident" | "invoice" | "knowledgearticle" | "knowledgebaserecord" | "lead" | "msdyn_agreement" | "msdyn_agreementbookingdate" | "msdyn_agreementbookingincident" | "msdyn_agreementbookingproduct" | "msdyn_agreementbookingservice" | "msdyn_agreementbookingservicetask" | "msdyn_agreementbookingsetup" | "msdyn_agreementinvoicedate" | "msdyn_agreementinvoiceproduct" | "msdyn_agreementinvoicesetup" | "msdyn_bookingalertstatus" | "msdyn_bookingrule" | "msdyn_bookingtimestamp" | "msdyn_customerasset" | "msdyn_fieldservicesetting" | "msdyn_incidenttypecharacteristic" | "msdyn_incidenttypeproduct" | "msdyn_incidenttypeservice" | "msdyn_inventoryadjustment" | "msdyn_inventoryadjustmentproduct" | "msdyn_inventoryjournal" | "msdyn_inventorytransfer" | "msdyn_payment" | "msdyn_paymentdetail" | "msdyn_paymentmethod" | "msdyn_paymentterm" | "msdyn_playbookinstance" | "msdyn_postalbum" | "msdyn_postalcode" | "msdyn_productinventory" | "msdyn_purchaseorder" | "msdyn_purchaseorderbill" | "msdyn_purchaseorderproduct" | "msdyn_purchaseorderreceipt" | "msdyn_purchaseorderreceiptproduct" | "msdyn_purchaseordersubstatus" | "msdyn_quotebookingincident" | "msdyn_quotebookingproduct" | "msdyn_quotebookingservice" | "msdyn_quotebookingservicetask" | "msdyn_resourceterritory" | "msdyn_rma" | "msdyn_rmaproduct" | "msdyn_rmareceipt" | "msdyn_rmareceiptproduct" | "msdyn_rmasubstatus" | "msdyn_rtv" | "msdyn_rtvproduct" | "msdyn_rtvsubstatus" | "msdyn_salessuggestion" | "msdyn_shipvia" | "msdyn_swarm" | "msdyn_systemuserschedulersetting" | "msdyn_timegroup" | "msdyn_timegroupdetail" | "msdyn_timeoffrequest" | "msdyn_warehouse" | "msdyn_workorder" | "msdyn_workordercharacteristic" | "msdyn_workorderincident" | "msdyn_workorderproduct" | "msdyn_workorderresourcerestriction" | "msdyn_workorderservice" | "msdyn_workorderservicetask" | "opportunity" | "ovs_operation" | "ppp_traveller" | "quote" | "salesorder" | "site" | "ts_request" | "ts_securityincident" | "ts_teamplanningdata">;
      get(name: "requiredattendees"): Xrm.LookupAttribute<"account" | "contact" | "entitlement" | "equipment" | "knowledgearticle" | "lead" | "msdyn_salessuggestion" | "queue" | "systemuser" | "unresolvedaddress">;
      get(name: "resolveby"): Xrm.DateAttribute | null;
      get(name: "responseby"): Xrm.DateAttribute | null;
      get(name: "scheduleddurationminutes"): Xrm.NumberAttribute;
      get(name: "scheduledend"): Xrm.DateAttribute;
      get(name: "scheduledstart"): Xrm.DateAttribute;
      get(name: "spousesname"): Xrm.Attribute<string> | null;
      get(name: "statecode"): Xrm.OptionSetAttribute<appointment_statecode>;
      get(name: "subject"): Xrm.Attribute<string>;
      get(name: "subjectid"): Xrm.LookupAttribute<"incident"> | null;
      get(name: "telephone1"): Xrm.Attribute<string> | null;
      get(name: "ticketnumber"): Xrm.Attribute<string> | null;
      get(name: "title"): Xrm.Attribute<string> | null;
      get(name: "websiteurl"): Xrm.Attribute<string> | null;
      get(name: string): undefined;
      get(): Xrm.Attribute<any>[];
      get(index: number): Xrm.Attribute<any>;
      get(chooser: (item: Xrm.Attribute<any>, index: number) => boolean): Xrm.Attribute<any>[];
    }
    interface Controls extends Xrm.ControlCollectionBase {
      get(name: "attachmentsGrid"): Xrm.SubGridControl<"activitymimeattachment">;
      get(name: "description"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
      get(name: "header_prioritycode"): Xrm.OptionSetControl<appointment_prioritycode>;
      get(name: "header_process_birthdate"): Xrm.DateControl | null;
      get(name: "header_process_budgetamount"): Xrm.NumberControl | null;
      get(name: "header_process_budgetamount_1"): Xrm.NumberControl | null;
      get(name: "header_process_closeprobability"): Xrm.NumberControl | null;
      get(name: "header_process_companyname"): Xrm.StringControl | null;
      get(name: "header_process_createdon"): Xrm.DateControl | null;
      get(name: "header_process_currentsituation"): Xrm.StringControl | null;
      get(name: "header_process_customerneed"): Xrm.StringControl | null;
      get(name: "header_process_decisionmaker"): Xrm.OptionSetControl<boolean> | null;
      get(name: "header_process_description"): Xrm.StringControl | null;
      get(name: "header_process_description_1"): Xrm.StringControl | null;
      get(name: "header_process_description_2"): Xrm.StringControl | null;
      get(name: "header_process_description_3"): Xrm.StringControl | null;
      get(name: "header_process_description_4"): Xrm.StringControl | null;
      get(name: "header_process_description_5"): Xrm.StringControl | null;
      get(name: "header_process_emailaddress1"): Xrm.StringControl | null;
      get(name: "header_process_emailaddress1_1"): Xrm.StringControl | null;
      get(name: "header_process_estimatedclosedate"): Xrm.DateControl | null;
      get(name: "header_process_estimatedvalue"): Xrm.NumberControl | null;
      get(name: "header_process_familystatuscode"): Xrm.OptionSetControl<number> | null;
      get(name: "header_process_firstname"): Xrm.StringControl | null;
      get(name: "header_process_firstname_1"): Xrm.StringControl | null;
      get(name: "header_process_jobtitle"): Xrm.StringControl | null;
      get(name: "header_process_lastname"): Xrm.StringControl | null;
      get(name: "header_process_lastname_1"): Xrm.StringControl | null;
      get(name: "header_process_location"): Xrm.StringControl | null;
      get(name: "header_process_mobilephone"): Xrm.StringControl | null;
      get(name: "header_process_mobilephone_1"): Xrm.StringControl | null;
      get(name: "header_process_name"): Xrm.StringControl | null;
      get(name: "header_process_name_1"): Xrm.StringControl | null;
      get(name: "header_process_opportunityratingcode"): Xrm.OptionSetControl<number> | null;
      get(name: "header_process_optionalattendees"): Xrm.LookupControl<"account" | "contact" | "entitlement" | "equipment" | "knowledgearticle" | "lead" | "msdyn_salessuggestion" | "queue" | "systemuser" | "unresolvedaddress"> | null;
      get(name: "header_process_ownerid"): Xrm.LookupControl<"incident"> | null;
      get(name: "header_process_parentaccountid"): Xrm.LookupControl<"account"> | null;
      get(name: "header_process_parentaccountid_1"): Xrm.LookupControl<"opportunity"> | null;
      get(name: "header_process_parentcontactid"): Xrm.LookupControl<"opportunity"> | null;
      get(name: "header_process_parentcustomerid"): Xrm.LookupControl<"contact"> | null;
      get(name: "header_process_primarycontactid"): Xrm.LookupControl<"account"> | null;
      get(name: "header_process_prioritycode"): Xrm.OptionSetControl<appointment_prioritycode> | null;
      get(name: "header_process_proposedsolution"): Xrm.StringControl | null;
      get(name: "header_process_purchaseprocess"): Xrm.OptionSetControl<number> | null;
      get(name: "header_process_purchasetimeframe"): Xrm.OptionSetControl<number> | null;
      get(name: "header_process_regardingobjectid"): Xrm.LookupControl<"account" | "bookableresourcebooking" | "bookableresourcebookingheader" | "bulkoperation" | "campaign" | "campaignactivity" | "contact" | "contract" | "entitlement" | "entitlementtemplate" | "ikl_a2d_securitytemplate" | "ikl_bulkmigrationjob" | "ikl_bulkmigrationjobstatus" | "ikl_inogiclicensedetails" | "incident" | "invoice" | "knowledgearticle" | "knowledgebaserecord" | "lead" | "msdyn_agreement" | "msdyn_agreementbookingdate" | "msdyn_agreementbookingincident" | "msdyn_agreementbookingproduct" | "msdyn_agreementbookingservice" | "msdyn_agreementbookingservicetask" | "msdyn_agreementbookingsetup" | "msdyn_agreementinvoicedate" | "msdyn_agreementinvoiceproduct" | "msdyn_agreementinvoicesetup" | "msdyn_bookingalertstatus" | "msdyn_bookingrule" | "msdyn_bookingtimestamp" | "msdyn_customerasset" | "msdyn_fieldservicesetting" | "msdyn_incidenttypecharacteristic" | "msdyn_incidenttypeproduct" | "msdyn_incidenttypeservice" | "msdyn_inventoryadjustment" | "msdyn_inventoryadjustmentproduct" | "msdyn_inventoryjournal" | "msdyn_inventorytransfer" | "msdyn_payment" | "msdyn_paymentdetail" | "msdyn_paymentmethod" | "msdyn_paymentterm" | "msdyn_playbookinstance" | "msdyn_postalbum" | "msdyn_postalcode" | "msdyn_productinventory" | "msdyn_purchaseorder" | "msdyn_purchaseorderbill" | "msdyn_purchaseorderproduct" | "msdyn_purchaseorderreceipt" | "msdyn_purchaseorderreceiptproduct" | "msdyn_purchaseordersubstatus" | "msdyn_quotebookingincident" | "msdyn_quotebookingproduct" | "msdyn_quotebookingservice" | "msdyn_quotebookingservicetask" | "msdyn_resourceterritory" | "msdyn_rma" | "msdyn_rmaproduct" | "msdyn_rmareceipt" | "msdyn_rmareceiptproduct" | "msdyn_rmasubstatus" | "msdyn_rtv" | "msdyn_rtvproduct" | "msdyn_rtvsubstatus" | "msdyn_salessuggestion" | "msdyn_shipvia" | "msdyn_swarm" | "msdyn_systemuserschedulersetting" | "msdyn_timegroup" | "msdyn_timegroupdetail" | "msdyn_timeoffrequest" | "msdyn_warehouse" | "msdyn_workorder" | "msdyn_workordercharacteristic" | "msdyn_workorderincident" | "msdyn_workorderproduct" | "msdyn_workorderresourcerestriction" | "msdyn_workorderservice" | "msdyn_workorderservicetask" | "opportunity" | "ovs_operation" | "ppp_traveller" | "quote" | "salesorder" | "site" | "ts_request" | "ts_securityincident" | "ts_teamplanningdata"> | null;
      get(name: "header_process_requiredattendees"): Xrm.LookupControl<"account" | "contact" | "entitlement" | "equipment" | "knowledgearticle" | "lead" | "msdyn_salessuggestion" | "queue" | "systemuser" | "unresolvedaddress"> | null;
      get(name: "header_process_resolveby"): Xrm.DateControl | null;
      get(name: "header_process_responseby"): Xrm.DateControl | null;
      get(name: "header_process_scheduledend"): Xrm.DateControl | null;
      get(name: "header_process_scheduledstart"): Xrm.DateControl | null;
      get(name: "header_process_spousesname"): Xrm.StringControl | null;
      get(name: "header_process_subject"): Xrm.StringControl | null;
      get(name: "header_process_subject_1"): Xrm.StringControl | null;
      get(name: "header_process_subjectid"): Xrm.LookupControl<"incident"> | null;
      get(name: "header_process_telephone1"): Xrm.StringControl | null;
      get(name: "header_process_telephone1_1"): Xrm.StringControl | null;
      get(name: "header_process_ticketnumber"): Xrm.StringControl | null;
      get(name: "header_process_title"): Xrm.StringControl | null;
      get(name: "header_process_websiteurl"): Xrm.StringControl | null;
      get(name: "header_statecode"): Xrm.OptionSetControl<appointment_statecode>;
      get(name: "isalldayevent"): Xrm.OptionSetControl<boolean>;
      get(name: "isonlinemeeting"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "location"): Xrm.StringControl;
      get(name: "notescontrol"): Xrm.BaseControl;
      get(name: "onlinemeetingjoinurl"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "optionalattendees"): Xrm.LookupControl<"account" | "contact" | "entitlement" | "equipment" | "knowledgearticle" | "lead" | "msdyn_salessuggestion" | "queue" | "systemuser" | "unresolvedaddress">;
      get(name: "regardingobjectid"): Xrm.LookupControl<"account" | "bookableresourcebooking" | "bookableresourcebookingheader" | "bulkoperation" | "campaign" | "campaignactivity" | "contact" | "contract" | "entitlement" | "entitlementtemplate" | "ikl_a2d_securitytemplate" | "ikl_bulkmigrationjob" | "ikl_bulkmigrationjobstatus" | "ikl_inogiclicensedetails" | "incident" | "invoice" | "knowledgearticle" | "knowledgebaserecord" | "lead" | "msdyn_agreement" | "msdyn_agreementbookingdate" | "msdyn_agreementbookingincident" | "msdyn_agreementbookingproduct" | "msdyn_agreementbookingservice" | "msdyn_agreementbookingservicetask" | "msdyn_agreementbookingsetup" | "msdyn_agreementinvoicedate" | "msdyn_agreementinvoiceproduct" | "msdyn_agreementinvoicesetup" | "msdyn_bookingalertstatus" | "msdyn_bookingrule" | "msdyn_bookingtimestamp" | "msdyn_customerasset" | "msdyn_fieldservicesetting" | "msdyn_incidenttypecharacteristic" | "msdyn_incidenttypeproduct" | "msdyn_incidenttypeservice" | "msdyn_inventoryadjustment" | "msdyn_inventoryadjustmentproduct" | "msdyn_inventoryjournal" | "msdyn_inventorytransfer" | "msdyn_payment" | "msdyn_paymentdetail" | "msdyn_paymentmethod" | "msdyn_paymentterm" | "msdyn_playbookinstance" | "msdyn_postalbum" | "msdyn_postalcode" | "msdyn_productinventory" | "msdyn_purchaseorder" | "msdyn_purchaseorderbill" | "msdyn_purchaseorderproduct" | "msdyn_purchaseorderreceipt" | "msdyn_purchaseorderreceiptproduct" | "msdyn_purchaseordersubstatus" | "msdyn_quotebookingincident" | "msdyn_quotebookingproduct" | "msdyn_quotebookingservice" | "msdyn_quotebookingservicetask" | "msdyn_resourceterritory" | "msdyn_rma" | "msdyn_rmaproduct" | "msdyn_rmareceipt" | "msdyn_rmareceiptproduct" | "msdyn_rmasubstatus" | "msdyn_rtv" | "msdyn_rtvproduct" | "msdyn_rtvsubstatus" | "msdyn_salessuggestion" | "msdyn_shipvia" | "msdyn_swarm" | "msdyn_systemuserschedulersetting" | "msdyn_timegroup" | "msdyn_timegroupdetail" | "msdyn_timeoffrequest" | "msdyn_warehouse" | "msdyn_workorder" | "msdyn_workordercharacteristic" | "msdyn_workorderincident" | "msdyn_workorderproduct" | "msdyn_workorderresourcerestriction" | "msdyn_workorderservice" | "msdyn_workorderservicetask" | "opportunity" | "ovs_operation" | "ppp_traveller" | "quote" | "salesorder" | "site" | "ts_request" | "ts_securityincident" | "ts_teamplanningdata">;
      get(name: "requiredattendees"): Xrm.LookupControl<"account" | "contact" | "entitlement" | "equipment" | "knowledgearticle" | "lead" | "msdyn_salessuggestion" | "queue" | "systemuser" | "unresolvedaddress">;
      get(name: "scheduleddurationminutes"): Xrm.NumberControl;
      get(name: "scheduledend"): Xrm.DateControl;
      get(name: "scheduledstart"): Xrm.DateControl;
      get(name: "subject"): Xrm.StringControl;
      get(name: "subject1"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: "subject2"): Xrm.Control<Xrm.Attribute<any>>;
      get(name: string): undefined;
      get(): Xrm.BaseControl[];
      get(index: number): Xrm.BaseControl;
      get(chooser: (item: Xrm.BaseControl, index: number) => boolean): Xrm.BaseControl[];
    }
    interface Tabs extends Xrm.TabCollectionBase {
      get(name: "appointment"): Xrm.PageTab<Tabs.appointment>;
      get(name: "tab_ci_call_summary"): Xrm.PageTab<Tabs.tab_ci_call_summary>;
      get(name: "tab_ci_notes"): Xrm.PageTab<Tabs.tab_ci_notes>;
      get(name: "tab_notes"): Xrm.PageTab<Tabs.tab_notes>;
      get(name: string): undefined;
      get(): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
      get(index: number): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>;
      get(chooser: (item: Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>, index: number) => boolean): Xrm.PageTab<Xrm.Collection<Xrm.PageSection>>[];
    }
  }
  interface Appointment extends Xrm.PageBase<Appointment.Attributes,Appointment.Tabs,Appointment.Controls> {
    getAttribute(attributeName: "birthdate"): Xrm.DateAttribute | null;
    getAttribute(attributeName: "budgetamount"): Xrm.NumberAttribute | null;
    getAttribute(attributeName: "closeprobability"): Xrm.NumberAttribute | null;
    getAttribute(attributeName: "companyname"): Xrm.Attribute<string> | null;
    getAttribute(attributeName: "createdon"): Xrm.DateAttribute | null;
    getAttribute(attributeName: "currentsituation"): Xrm.Attribute<string> | null;
    getAttribute(attributeName: "customerneed"): Xrm.Attribute<string> | null;
    getAttribute(attributeName: "decisionmaker"): Xrm.OptionSetAttribute<boolean> | null;
    getAttribute(attributeName: "description"): Xrm.Attribute<any>;
    getAttribute(attributeName: "emailaddress1"): Xrm.Attribute<string> | null;
    getAttribute(attributeName: "estimatedclosedate"): Xrm.DateAttribute | null;
    getAttribute(attributeName: "estimatedvalue"): Xrm.NumberAttribute | null;
    getAttribute(attributeName: "familystatuscode"): Xrm.OptionSetAttribute<number> | null;
    getAttribute(attributeName: "firstname"): Xrm.Attribute<string> | null;
    getAttribute(attributeName: "isalldayevent"): Xrm.OptionSetAttribute<boolean>;
    getAttribute(attributeName: "isonlinemeeting"): Xrm.Attribute<any>;
    getAttribute(attributeName: "jobtitle"): Xrm.Attribute<string> | null;
    getAttribute(attributeName: "lastname"): Xrm.Attribute<string> | null;
    getAttribute(attributeName: "location"): Xrm.Attribute<string>;
    getAttribute(attributeName: "mobilephone"): Xrm.Attribute<string> | null;
    getAttribute(attributeName: "name"): Xrm.Attribute<string> | null;
    getAttribute(attributeName: "onlinemeetingjoinurl"): Xrm.Attribute<any>;
    getAttribute(attributeName: "opportunityratingcode"): Xrm.OptionSetAttribute<number> | null;
    getAttribute(attributeName: "optionalattendees"): Xrm.LookupAttribute<"account" | "contact" | "entitlement" | "equipment" | "knowledgearticle" | "lead" | "msdyn_salessuggestion" | "queue" | "systemuser" | "unresolvedaddress">;
    getAttribute(attributeName: "ownerid"): Xrm.LookupAttribute<"systemuser" | "team">;
    getAttribute(attributeName: "parentaccountid"): Xrm.LookupAttribute<"account"> | null;
    getAttribute(attributeName: "parentcontactid"): Xrm.LookupAttribute<"opportunity"> | null;
    getAttribute(attributeName: "parentcustomerid"): Xrm.LookupAttribute<"contact"> | null;
    getAttribute(attributeName: "primarycontactid"): Xrm.LookupAttribute<"account"> | null;
    getAttribute(attributeName: "prioritycode"): Xrm.OptionSetAttribute<appointment_prioritycode>;
    getAttribute(attributeName: "proposedsolution"): Xrm.Attribute<string> | null;
    getAttribute(attributeName: "purchaseprocess"): Xrm.OptionSetAttribute<number> | null;
    getAttribute(attributeName: "purchasetimeframe"): Xrm.OptionSetAttribute<number> | null;
    getAttribute(attributeName: "regardingobjectid"): Xrm.LookupAttribute<"account" | "bookableresourcebooking" | "bookableresourcebookingheader" | "bulkoperation" | "campaign" | "campaignactivity" | "contact" | "contract" | "entitlement" | "entitlementtemplate" | "ikl_a2d_securitytemplate" | "ikl_bulkmigrationjob" | "ikl_bulkmigrationjobstatus" | "ikl_inogiclicensedetails" | "incident" | "invoice" | "knowledgearticle" | "knowledgebaserecord" | "lead" | "msdyn_agreement" | "msdyn_agreementbookingdate" | "msdyn_agreementbookingincident" | "msdyn_agreementbookingproduct" | "msdyn_agreementbookingservice" | "msdyn_agreementbookingservicetask" | "msdyn_agreementbookingsetup" | "msdyn_agreementinvoicedate" | "msdyn_agreementinvoiceproduct" | "msdyn_agreementinvoicesetup" | "msdyn_bookingalertstatus" | "msdyn_bookingrule" | "msdyn_bookingtimestamp" | "msdyn_customerasset" | "msdyn_fieldservicesetting" | "msdyn_incidenttypecharacteristic" | "msdyn_incidenttypeproduct" | "msdyn_incidenttypeservice" | "msdyn_inventoryadjustment" | "msdyn_inventoryadjustmentproduct" | "msdyn_inventoryjournal" | "msdyn_inventorytransfer" | "msdyn_payment" | "msdyn_paymentdetail" | "msdyn_paymentmethod" | "msdyn_paymentterm" | "msdyn_playbookinstance" | "msdyn_postalbum" | "msdyn_postalcode" | "msdyn_productinventory" | "msdyn_purchaseorder" | "msdyn_purchaseorderbill" | "msdyn_purchaseorderproduct" | "msdyn_purchaseorderreceipt" | "msdyn_purchaseorderreceiptproduct" | "msdyn_purchaseordersubstatus" | "msdyn_quotebookingincident" | "msdyn_quotebookingproduct" | "msdyn_quotebookingservice" | "msdyn_quotebookingservicetask" | "msdyn_resourceterritory" | "msdyn_rma" | "msdyn_rmaproduct" | "msdyn_rmareceipt" | "msdyn_rmareceiptproduct" | "msdyn_rmasubstatus" | "msdyn_rtv" | "msdyn_rtvproduct" | "msdyn_rtvsubstatus" | "msdyn_salessuggestion" | "msdyn_shipvia" | "msdyn_swarm" | "msdyn_systemuserschedulersetting" | "msdyn_timegroup" | "msdyn_timegroupdetail" | "msdyn_timeoffrequest" | "msdyn_warehouse" | "msdyn_workorder" | "msdyn_workordercharacteristic" | "msdyn_workorderincident" | "msdyn_workorderproduct" | "msdyn_workorderresourcerestriction" | "msdyn_workorderservice" | "msdyn_workorderservicetask" | "opportunity" | "ovs_operation" | "ppp_traveller" | "quote" | "salesorder" | "site" | "ts_request" | "ts_securityincident" | "ts_teamplanningdata">;
    getAttribute(attributeName: "requiredattendees"): Xrm.LookupAttribute<"account" | "contact" | "entitlement" | "equipment" | "knowledgearticle" | "lead" | "msdyn_salessuggestion" | "queue" | "systemuser" | "unresolvedaddress">;
    getAttribute(attributeName: "resolveby"): Xrm.DateAttribute | null;
    getAttribute(attributeName: "responseby"): Xrm.DateAttribute | null;
    getAttribute(attributeName: "scheduleddurationminutes"): Xrm.NumberAttribute;
    getAttribute(attributeName: "scheduledend"): Xrm.DateAttribute;
    getAttribute(attributeName: "scheduledstart"): Xrm.DateAttribute;
    getAttribute(attributeName: "spousesname"): Xrm.Attribute<string> | null;
    getAttribute(attributeName: "statecode"): Xrm.OptionSetAttribute<appointment_statecode>;
    getAttribute(attributeName: "subject"): Xrm.Attribute<string>;
    getAttribute(attributeName: "subjectid"): Xrm.LookupAttribute<"incident"> | null;
    getAttribute(attributeName: "telephone1"): Xrm.Attribute<string> | null;
    getAttribute(attributeName: "ticketnumber"): Xrm.Attribute<string> | null;
    getAttribute(attributeName: "title"): Xrm.Attribute<string> | null;
    getAttribute(attributeName: "websiteurl"): Xrm.Attribute<string> | null;
    getAttribute(attributeName: string): undefined;
    getControl(controlName: "attachmentsGrid"): Xrm.SubGridControl<"activitymimeattachment">;
    getControl(controlName: "description"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "header_ownerid"): Xrm.LookupControl<"systemuser" | "team">;
    getControl(controlName: "header_prioritycode"): Xrm.OptionSetControl<appointment_prioritycode>;
    getControl(controlName: "header_process_birthdate"): Xrm.DateControl | null;
    getControl(controlName: "header_process_budgetamount"): Xrm.NumberControl | null;
    getControl(controlName: "header_process_budgetamount_1"): Xrm.NumberControl | null;
    getControl(controlName: "header_process_closeprobability"): Xrm.NumberControl | null;
    getControl(controlName: "header_process_companyname"): Xrm.StringControl | null;
    getControl(controlName: "header_process_createdon"): Xrm.DateControl | null;
    getControl(controlName: "header_process_currentsituation"): Xrm.StringControl | null;
    getControl(controlName: "header_process_customerneed"): Xrm.StringControl | null;
    getControl(controlName: "header_process_decisionmaker"): Xrm.OptionSetControl<boolean> | null;
    getControl(controlName: "header_process_description"): Xrm.StringControl | null;
    getControl(controlName: "header_process_description_1"): Xrm.StringControl | null;
    getControl(controlName: "header_process_description_2"): Xrm.StringControl | null;
    getControl(controlName: "header_process_description_3"): Xrm.StringControl | null;
    getControl(controlName: "header_process_description_4"): Xrm.StringControl | null;
    getControl(controlName: "header_process_description_5"): Xrm.StringControl | null;
    getControl(controlName: "header_process_emailaddress1"): Xrm.StringControl | null;
    getControl(controlName: "header_process_emailaddress1_1"): Xrm.StringControl | null;
    getControl(controlName: "header_process_estimatedclosedate"): Xrm.DateControl | null;
    getControl(controlName: "header_process_estimatedvalue"): Xrm.NumberControl | null;
    getControl(controlName: "header_process_familystatuscode"): Xrm.OptionSetControl<number> | null;
    getControl(controlName: "header_process_firstname"): Xrm.StringControl | null;
    getControl(controlName: "header_process_firstname_1"): Xrm.StringControl | null;
    getControl(controlName: "header_process_jobtitle"): Xrm.StringControl | null;
    getControl(controlName: "header_process_lastname"): Xrm.StringControl | null;
    getControl(controlName: "header_process_lastname_1"): Xrm.StringControl | null;
    getControl(controlName: "header_process_location"): Xrm.StringControl | null;
    getControl(controlName: "header_process_mobilephone"): Xrm.StringControl | null;
    getControl(controlName: "header_process_mobilephone_1"): Xrm.StringControl | null;
    getControl(controlName: "header_process_name"): Xrm.StringControl | null;
    getControl(controlName: "header_process_name_1"): Xrm.StringControl | null;
    getControl(controlName: "header_process_opportunityratingcode"): Xrm.OptionSetControl<number> | null;
    getControl(controlName: "header_process_optionalattendees"): Xrm.LookupControl<"account" | "contact" | "entitlement" | "equipment" | "knowledgearticle" | "lead" | "msdyn_salessuggestion" | "queue" | "systemuser" | "unresolvedaddress"> | null;
    getControl(controlName: "header_process_ownerid"): Xrm.LookupControl<"incident"> | null;
    getControl(controlName: "header_process_parentaccountid"): Xrm.LookupControl<"account"> | null;
    getControl(controlName: "header_process_parentaccountid_1"): Xrm.LookupControl<"opportunity"> | null;
    getControl(controlName: "header_process_parentcontactid"): Xrm.LookupControl<"opportunity"> | null;
    getControl(controlName: "header_process_parentcustomerid"): Xrm.LookupControl<"contact"> | null;
    getControl(controlName: "header_process_primarycontactid"): Xrm.LookupControl<"account"> | null;
    getControl(controlName: "header_process_prioritycode"): Xrm.OptionSetControl<appointment_prioritycode> | null;
    getControl(controlName: "header_process_proposedsolution"): Xrm.StringControl | null;
    getControl(controlName: "header_process_purchaseprocess"): Xrm.OptionSetControl<number> | null;
    getControl(controlName: "header_process_purchasetimeframe"): Xrm.OptionSetControl<number> | null;
    getControl(controlName: "header_process_regardingobjectid"): Xrm.LookupControl<"account" | "bookableresourcebooking" | "bookableresourcebookingheader" | "bulkoperation" | "campaign" | "campaignactivity" | "contact" | "contract" | "entitlement" | "entitlementtemplate" | "ikl_a2d_securitytemplate" | "ikl_bulkmigrationjob" | "ikl_bulkmigrationjobstatus" | "ikl_inogiclicensedetails" | "incident" | "invoice" | "knowledgearticle" | "knowledgebaserecord" | "lead" | "msdyn_agreement" | "msdyn_agreementbookingdate" | "msdyn_agreementbookingincident" | "msdyn_agreementbookingproduct" | "msdyn_agreementbookingservice" | "msdyn_agreementbookingservicetask" | "msdyn_agreementbookingsetup" | "msdyn_agreementinvoicedate" | "msdyn_agreementinvoiceproduct" | "msdyn_agreementinvoicesetup" | "msdyn_bookingalertstatus" | "msdyn_bookingrule" | "msdyn_bookingtimestamp" | "msdyn_customerasset" | "msdyn_fieldservicesetting" | "msdyn_incidenttypecharacteristic" | "msdyn_incidenttypeproduct" | "msdyn_incidenttypeservice" | "msdyn_inventoryadjustment" | "msdyn_inventoryadjustmentproduct" | "msdyn_inventoryjournal" | "msdyn_inventorytransfer" | "msdyn_payment" | "msdyn_paymentdetail" | "msdyn_paymentmethod" | "msdyn_paymentterm" | "msdyn_playbookinstance" | "msdyn_postalbum" | "msdyn_postalcode" | "msdyn_productinventory" | "msdyn_purchaseorder" | "msdyn_purchaseorderbill" | "msdyn_purchaseorderproduct" | "msdyn_purchaseorderreceipt" | "msdyn_purchaseorderreceiptproduct" | "msdyn_purchaseordersubstatus" | "msdyn_quotebookingincident" | "msdyn_quotebookingproduct" | "msdyn_quotebookingservice" | "msdyn_quotebookingservicetask" | "msdyn_resourceterritory" | "msdyn_rma" | "msdyn_rmaproduct" | "msdyn_rmareceipt" | "msdyn_rmareceiptproduct" | "msdyn_rmasubstatus" | "msdyn_rtv" | "msdyn_rtvproduct" | "msdyn_rtvsubstatus" | "msdyn_salessuggestion" | "msdyn_shipvia" | "msdyn_swarm" | "msdyn_systemuserschedulersetting" | "msdyn_timegroup" | "msdyn_timegroupdetail" | "msdyn_timeoffrequest" | "msdyn_warehouse" | "msdyn_workorder" | "msdyn_workordercharacteristic" | "msdyn_workorderincident" | "msdyn_workorderproduct" | "msdyn_workorderresourcerestriction" | "msdyn_workorderservice" | "msdyn_workorderservicetask" | "opportunity" | "ovs_operation" | "ppp_traveller" | "quote" | "salesorder" | "site" | "ts_request" | "ts_securityincident" | "ts_teamplanningdata"> | null;
    getControl(controlName: "header_process_requiredattendees"): Xrm.LookupControl<"account" | "contact" | "entitlement" | "equipment" | "knowledgearticle" | "lead" | "msdyn_salessuggestion" | "queue" | "systemuser" | "unresolvedaddress"> | null;
    getControl(controlName: "header_process_resolveby"): Xrm.DateControl | null;
    getControl(controlName: "header_process_responseby"): Xrm.DateControl | null;
    getControl(controlName: "header_process_scheduledend"): Xrm.DateControl | null;
    getControl(controlName: "header_process_scheduledstart"): Xrm.DateControl | null;
    getControl(controlName: "header_process_spousesname"): Xrm.StringControl | null;
    getControl(controlName: "header_process_subject"): Xrm.StringControl | null;
    getControl(controlName: "header_process_subject_1"): Xrm.StringControl | null;
    getControl(controlName: "header_process_subjectid"): Xrm.LookupControl<"incident"> | null;
    getControl(controlName: "header_process_telephone1"): Xrm.StringControl | null;
    getControl(controlName: "header_process_telephone1_1"): Xrm.StringControl | null;
    getControl(controlName: "header_process_ticketnumber"): Xrm.StringControl | null;
    getControl(controlName: "header_process_title"): Xrm.StringControl | null;
    getControl(controlName: "header_process_websiteurl"): Xrm.StringControl | null;
    getControl(controlName: "header_statecode"): Xrm.OptionSetControl<appointment_statecode>;
    getControl(controlName: "isalldayevent"): Xrm.OptionSetControl<boolean>;
    getControl(controlName: "isonlinemeeting"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "location"): Xrm.StringControl;
    getControl(controlName: "notescontrol"): Xrm.BaseControl;
    getControl(controlName: "onlinemeetingjoinurl"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "optionalattendees"): Xrm.LookupControl<"account" | "contact" | "entitlement" | "equipment" | "knowledgearticle" | "lead" | "msdyn_salessuggestion" | "queue" | "systemuser" | "unresolvedaddress">;
    getControl(controlName: "regardingobjectid"): Xrm.LookupControl<"account" | "bookableresourcebooking" | "bookableresourcebookingheader" | "bulkoperation" | "campaign" | "campaignactivity" | "contact" | "contract" | "entitlement" | "entitlementtemplate" | "ikl_a2d_securitytemplate" | "ikl_bulkmigrationjob" | "ikl_bulkmigrationjobstatus" | "ikl_inogiclicensedetails" | "incident" | "invoice" | "knowledgearticle" | "knowledgebaserecord" | "lead" | "msdyn_agreement" | "msdyn_agreementbookingdate" | "msdyn_agreementbookingincident" | "msdyn_agreementbookingproduct" | "msdyn_agreementbookingservice" | "msdyn_agreementbookingservicetask" | "msdyn_agreementbookingsetup" | "msdyn_agreementinvoicedate" | "msdyn_agreementinvoiceproduct" | "msdyn_agreementinvoicesetup" | "msdyn_bookingalertstatus" | "msdyn_bookingrule" | "msdyn_bookingtimestamp" | "msdyn_customerasset" | "msdyn_fieldservicesetting" | "msdyn_incidenttypecharacteristic" | "msdyn_incidenttypeproduct" | "msdyn_incidenttypeservice" | "msdyn_inventoryadjustment" | "msdyn_inventoryadjustmentproduct" | "msdyn_inventoryjournal" | "msdyn_inventorytransfer" | "msdyn_payment" | "msdyn_paymentdetail" | "msdyn_paymentmethod" | "msdyn_paymentterm" | "msdyn_playbookinstance" | "msdyn_postalbum" | "msdyn_postalcode" | "msdyn_productinventory" | "msdyn_purchaseorder" | "msdyn_purchaseorderbill" | "msdyn_purchaseorderproduct" | "msdyn_purchaseorderreceipt" | "msdyn_purchaseorderreceiptproduct" | "msdyn_purchaseordersubstatus" | "msdyn_quotebookingincident" | "msdyn_quotebookingproduct" | "msdyn_quotebookingservice" | "msdyn_quotebookingservicetask" | "msdyn_resourceterritory" | "msdyn_rma" | "msdyn_rmaproduct" | "msdyn_rmareceipt" | "msdyn_rmareceiptproduct" | "msdyn_rmasubstatus" | "msdyn_rtv" | "msdyn_rtvproduct" | "msdyn_rtvsubstatus" | "msdyn_salessuggestion" | "msdyn_shipvia" | "msdyn_swarm" | "msdyn_systemuserschedulersetting" | "msdyn_timegroup" | "msdyn_timegroupdetail" | "msdyn_timeoffrequest" | "msdyn_warehouse" | "msdyn_workorder" | "msdyn_workordercharacteristic" | "msdyn_workorderincident" | "msdyn_workorderproduct" | "msdyn_workorderresourcerestriction" | "msdyn_workorderservice" | "msdyn_workorderservicetask" | "opportunity" | "ovs_operation" | "ppp_traveller" | "quote" | "salesorder" | "site" | "ts_request" | "ts_securityincident" | "ts_teamplanningdata">;
    getControl(controlName: "requiredattendees"): Xrm.LookupControl<"account" | "contact" | "entitlement" | "equipment" | "knowledgearticle" | "lead" | "msdyn_salessuggestion" | "queue" | "systemuser" | "unresolvedaddress">;
    getControl(controlName: "scheduleddurationminutes"): Xrm.NumberControl;
    getControl(controlName: "scheduledend"): Xrm.DateControl;
    getControl(controlName: "scheduledstart"): Xrm.DateControl;
    getControl(controlName: "subject"): Xrm.StringControl;
    getControl(controlName: "subject1"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: "subject2"): Xrm.Control<Xrm.Attribute<any>>;
    getControl(controlName: string): undefined;
  }
}
