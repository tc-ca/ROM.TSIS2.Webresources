interface Appointment_Base extends WebEntity {
  activityadditionalparams?: string | null;
  activityid?: string | null;
  activitytypecode?: string | null;
  actualdurationminutes?: number | null;
  actualend?: Date | null;
  actualstart?: Date | null;
  attachmentcount?: number | null;
  attachmenterrors?: appointment_attachmenterrors | null;
  category?: string | null;
  createdon?: Date | null;
  description?: string | null;
  exchangerate?: number | null;
  formattedscheduledend?: Date | null;
  formattedscheduledstart?: Date | null;
  globalobjectid?: string | null;
  importsequencenumber?: number | null;
  instancetypecode?: appointment_instancetypecode | null;
  isalldayevent?: boolean | null;
  isbilled?: boolean | null;
  isdraft?: boolean | null;
  ismapiprivate?: boolean | null;
  isonlinemeeting?: boolean | null;
  isregularactivity?: boolean | null;
  isunsafe?: number | null;
  isworkflowcreated?: boolean | null;
  lastonholdtime?: Date | null;
  location?: string | null;
  modifiedfieldsmask?: string | null;
  modifiedon?: Date | null;
  onholdtime?: number | null;
  onlinemeetingchatid?: string | null;
  onlinemeetingid?: string | null;
  onlinemeetingjoinurl?: string | null;
  onlinemeetingtype?: onlinemeetingtype | null;
  originalstartdate?: Date | null;
  outlookownerapptid?: number | null;
  overriddencreatedon?: Date | null;
  prioritycode?: appointment_prioritycode | null;
  processid?: string | null;
  scheduleddurationminutes?: number | null;
  scheduledend?: Date | null;
  scheduledstart?: Date | null;
  seriesid?: string | null;
  sortdate?: Date | null;
  stageid?: string | null;
  statecode?: appointment_statecode | null;
  statuscode?: appointment_statuscode | null;
  subcategory?: string | null;
  subject?: string | null;
  subscriptionid?: string | null;
  timezoneruleversionnumber?: number | null;
  traversedpath?: string | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface Appointment_Relationships {
  appointment_PostFollows?: PostFollow_Result[] | null;
  appointment_activity_parties?: ActivityParty_Result[] | null;
  appointment_connections1?: Connection_Result[] | null;
  appointment_connections2?: Connection_Result[] | null;
  createdby_appointment?: SystemUser_Result | null;
  createdonbehalfby_appointment?: SystemUser_Result | null;
  modifiedby_appointment?: SystemUser_Result | null;
  modifiedonbehalfby_appointment?: SystemUser_Result | null;
  msdyn_appointment_bookableresourcebooking?: BookableResourceBooking_Result[] | null;
  ownerid_appointment?: Team_Result | null;
  ownerid_appointment1?: SystemUser_Result | null;
  owningteam_appointment?: Team_Result | null;
  owninguser_appointment?: SystemUser_Result | null;
  regardingobjectid_account_appointment?: Account_Result | null;
  regardingobjectid_bookableresourcebooking_appointment?: BookableResourceBooking_Result | null;
  regardingobjectid_contact_appointment?: Contact_Result | null;
  regardingobjectid_incident_appointment?: Incident_Result | null;
  regardingobjectid_msdyn_customerasset_appointment?: msdyn_customerasset_Result | null;
  regardingobjectid_msdyn_workorder_appointment?: msdyn_workorder_Result | null;
  regardingobjectid_msdyn_workorderservicetask_appointment?: msdyn_workorderservicetask_Result | null;
  regardingobjectid_ovs_operation_appointment?: ovs_operation_Result | null;
  regardingobjectid_ts_securityincident_appointment?: ts_securityincident_Result | null;
  regardingobjectid_ts_teamplanningdata_appointment?: ts_TeamPlanningData_Result | null;
}
interface Appointment extends Appointment_Base, Appointment_Relationships {
  ownerid_appointment_bind$systemusers?: string | null;
  ownerid_appointment_bind$teams?: string | null;
  regardingobjectid_account_appointment_bind$accounts?: string | null;
  regardingobjectid_bookableresourcebooking_appointment_bind$bookableresourcebookings?: string | null;
  regardingobjectid_bookableresourcebookingheader_appointment_bind$bookableresourcebookingheaders?: string | null;
  regardingobjectid_bulkoperation_appointment_bind$bulkoperations?: string | null;
  regardingobjectid_campaign_appointment_bind$campaigns?: string | null;
  regardingobjectid_campaignactivity_appointment_bind$campaignactivities?: string | null;
  regardingobjectid_contact_appointment_bind$contacts?: string | null;
  regardingobjectid_contract_appointment_bind$contracts?: string | null;
  regardingobjectid_entitlement_appointment_bind$entitlements?: string | null;
  regardingobjectid_entitlementtemplate_appointment_bind$entitlementtemplates?: string | null;
  regardingobjectid_ikl_a2d_securitytemplate_appointment_bind$ikl_a2d_securitytemplates?: string | null;
  regardingobjectid_ikl_bulkmigrationjob_appointment_bind$ikl_bulkmigrationjobs?: string | null;
  regardingobjectid_ikl_bulkmigrationjobstatus_appointment_bind$ikl_bulkmigrationjobstatuses?: string | null;
  regardingobjectid_ikl_inogiclicensedetails_appointment_bind$ikl_inogiclicensedetailses?: string | null;
  regardingobjectid_incident_appointment_bind$incidents?: string | null;
  regardingobjectid_invoice_appointment_bind$invoices?: string | null;
  regardingobjectid_knowledgearticle_appointment_bind$knowledgearticles?: string | null;
  regardingobjectid_knowledgebaserecord_appointment_bind$knowledgebaserecords?: string | null;
  regardingobjectid_lead_appointment_bind$leads?: string | null;
  regardingobjectid_msdyn_agreement_appointment_bind$msdyn_agreements?: string | null;
  regardingobjectid_msdyn_agreementbookingdate_appointment_bind$msdyn_agreementbookingdates?: string | null;
  regardingobjectid_msdyn_agreementbookingincident_appointment_bind$msdyn_agreementbookingincidents?: string | null;
  regardingobjectid_msdyn_agreementbookingproduct_appointment_bind$msdyn_agreementbookingproducts?: string | null;
  regardingobjectid_msdyn_agreementbookingservice_appointment_bind$msdyn_agreementbookingservices?: string | null;
  regardingobjectid_msdyn_agreementbookingservicetask_appointment_bind$msdyn_agreementbookingservicetasks?: string | null;
  regardingobjectid_msdyn_agreementbookingsetup_appointment_bind$msdyn_agreementbookingsetups?: string | null;
  regardingobjectid_msdyn_agreementinvoicedate_appointment_bind$msdyn_agreementinvoicedates?: string | null;
  regardingobjectid_msdyn_agreementinvoiceproduct_appointment_bind$msdyn_agreementinvoiceproducts?: string | null;
  regardingobjectid_msdyn_agreementinvoicesetup_appointment_bind$msdyn_agreementinvoicesetups?: string | null;
  regardingobjectid_msdyn_bookingalertstatus_appointment_bind$msdyn_bookingalertstatuses?: string | null;
  regardingobjectid_msdyn_bookingrule_appointment_bind$msdyn_bookingrules?: string | null;
  regardingobjectid_msdyn_bookingtimestamp_appointment_bind$msdyn_bookingtimestamps?: string | null;
  regardingobjectid_msdyn_customerasset_appointment_bind$msdyn_customerassets?: string | null;
  regardingobjectid_msdyn_fieldservicesetting_appointment_bind$msdyn_fieldservicesettings?: string | null;
  regardingobjectid_msdyn_incidenttypecharacteristic_appointment_bind$msdyn_incidenttypecharacteristics?: string | null;
  regardingobjectid_msdyn_incidenttypeproduct_appointment_bind$msdyn_incidenttypeproducts?: string | null;
  regardingobjectid_msdyn_incidenttypeservice_appointment_bind$msdyn_incidenttypeservices?: string | null;
  regardingobjectid_msdyn_inventoryadjustment_appointment_bind$msdyn_inventoryadjustments?: string | null;
  regardingobjectid_msdyn_inventoryadjustmentproduct_appointment_bind$msdyn_inventoryadjustmentproducts?: string | null;
  regardingobjectid_msdyn_inventoryjournal_appointment_bind$msdyn_inventoryjournals?: string | null;
  regardingobjectid_msdyn_inventorytransfer_appointment_bind$msdyn_inventorytransfers?: string | null;
  regardingobjectid_msdyn_payment_appointment_bind$msdyn_payments?: string | null;
  regardingobjectid_msdyn_paymentdetail_appointment_bind$msdyn_paymentdetailes?: string | null;
  regardingobjectid_msdyn_paymentmethod_appointment_bind$msdyn_paymentmethods?: string | null;
  regardingobjectid_msdyn_paymentterm_appointment_bind$msdyn_paymentterms?: string | null;
  regardingobjectid_msdyn_playbookinstance_appointment_bind$msdyn_playbookinstances?: string | null;
  regardingobjectid_msdyn_postalbum_appointment_bind$msdyn_postalbums?: string | null;
  regardingobjectid_msdyn_postalcode_appointment_bind$msdyn_postalcodes?: string | null;
  regardingobjectid_msdyn_productinventory_appointment_bind$msdyn_productinventories?: string | null;
  regardingobjectid_msdyn_purchaseorder_appointment_bind$msdyn_purchaseorders?: string | null;
  regardingobjectid_msdyn_purchaseorderbill_appointment_bind$msdyn_purchaseorderbills?: string | null;
  regardingobjectid_msdyn_purchaseorderproduct_appointment_bind$msdyn_purchaseorderproducts?: string | null;
  regardingobjectid_msdyn_purchaseorderreceipt_appointment_bind$msdyn_purchaseorderreceipts?: string | null;
  regardingobjectid_msdyn_purchaseorderreceiptproduct_appointment_bind$msdyn_purchaseorderreceiptproducts?: string | null;
  regardingobjectid_msdyn_purchaseordersubstatus_appointment_bind$msdyn_purchaseordersubstatuses?: string | null;
  regardingobjectid_msdyn_quotebookingincident_appointment_bind$msdyn_quotebookingincidents?: string | null;
  regardingobjectid_msdyn_quotebookingproduct_appointment_bind$msdyn_quotebookingproducts?: string | null;
  regardingobjectid_msdyn_quotebookingservice_appointment_bind$msdyn_quotebookingservices?: string | null;
  regardingobjectid_msdyn_quotebookingservicetask_appointment_bind$msdyn_quotebookingservicetasks?: string | null;
  regardingobjectid_msdyn_resourceterritory_appointment_bind$msdyn_resourceterritories?: string | null;
  regardingobjectid_msdyn_rma_appointment_bind$msdyn_rmas?: string | null;
  regardingobjectid_msdyn_rmaproduct_appointment_bind$msdyn_rmaproducts?: string | null;
  regardingobjectid_msdyn_rmareceipt_appointment_bind$msdyn_rmareceipts?: string | null;
  regardingobjectid_msdyn_rmareceiptproduct_appointment_bind$msdyn_rmareceiptproducts?: string | null;
  regardingobjectid_msdyn_rmasubstatus_appointment_bind$msdyn_rmasubstatuses?: string | null;
  regardingobjectid_msdyn_rtv_appointment_bind$msdyn_rtvs?: string | null;
  regardingobjectid_msdyn_rtvproduct_appointment_bind$msdyn_rtvproducts?: string | null;
  regardingobjectid_msdyn_rtvsubstatus_appointment_bind$msdyn_rtvsubstatuses?: string | null;
  regardingobjectid_msdyn_salessuggestion_appointment_bind$msdyn_salessuggestions?: string | null;
  regardingobjectid_msdyn_shipvia_appointment_bind$msdyn_shipvias?: string | null;
  regardingobjectid_msdyn_swarm_appointment_bind$msdyn_swarms?: string | null;
  regardingobjectid_msdyn_systemuserschedulersetting_appointment_bind$msdyn_systemuserschedulersettinges?: string | null;
  regardingobjectid_msdyn_timegroup_appointment_bind$msdyn_timegroups?: string | null;
  regardingobjectid_msdyn_timegroupdetail_appointment_bind$msdyn_timegroupdetails?: string | null;
  regardingobjectid_msdyn_timeoffrequest_appointment_bind$msdyn_timeoffrequests?: string | null;
  regardingobjectid_msdyn_warehouse_appointment_bind$msdyn_warehouses?: string | null;
  regardingobjectid_msdyn_workorder_appointment_bind$msdyn_workorders?: string | null;
  regardingobjectid_msdyn_workordercharacteristic_appointment_bind$msdyn_workordercharacteristics?: string | null;
  regardingobjectid_msdyn_workorderincident_appointment_bind$msdyn_workorderincidents?: string | null;
  regardingobjectid_msdyn_workorderproduct_appointment_bind$msdyn_workorderproducts?: string | null;
  regardingobjectid_msdyn_workorderresourcerestriction_appointment_bind$msdyn_workorderresourcerestrictions?: string | null;
  regardingobjectid_msdyn_workorderservice_appointment_bind$msdyn_workorderservices?: string | null;
  regardingobjectid_msdyn_workorderservicetask_appointment_bind$msdyn_workorderservicetasks?: string | null;
  regardingobjectid_opportunity_appointment_bind$opportunities?: string | null;
  regardingobjectid_ovs_operation_appointment_bind$ovs_operations?: string | null;
  regardingobjectid_ppp_traveller_appointment_bind$ppp_travellers?: string | null;
  regardingobjectid_quote_appointment_bind$quotes?: string | null;
  regardingobjectid_salesorder_appointment_bind$salesorders?: string | null;
  regardingobjectid_site_appointment_bind$sites?: string | null;
  regardingobjectid_ts_request_appointment_bind$ts_requests?: string | null;
  regardingobjectid_ts_securityincident_appointment_bind$ts_securityincidents?: string | null;
  regardingobjectid_ts_teamplanningdata_appointment_bind$ts_teamplanningdatas?: string | null;
  serviceid_appointment_bind$services?: string | null;
  sla_appointment_sla_bind$slas?: string | null;
  stageid_processstage_bind$processstages?: string | null;
  transactioncurrencyid_appointment_bind$transactioncurrencies?: string | null;
}
interface Appointment_Create extends Appointment {
  activityid_activitypointer_bind$activitypointers?: string | null;
}
interface Appointment_Update extends Appointment {
}
interface Appointment_Select {
  activityadditionalparams: WebAttribute<Appointment_Select, { activityadditionalparams: string | null }, {  }>;
  activityid: WebAttribute<Appointment_Select, { activityid: string | null }, {  }>;
  activitytypecode: WebAttribute<Appointment_Select, { activitytypecode: string | null }, {  }>;
  actualdurationminutes: WebAttribute<Appointment_Select, { actualdurationminutes: number | null }, {  }>;
  actualend: WebAttribute<Appointment_Select, { actualend: Date | null }, { actualend_formatted?: string }>;
  actualstart: WebAttribute<Appointment_Select, { actualstart: Date | null }, { actualstart_formatted?: string }>;
  attachmentcount: WebAttribute<Appointment_Select, { attachmentcount: number | null }, {  }>;
  attachmenterrors: WebAttribute<Appointment_Select, { attachmenterrors: appointment_attachmenterrors | null }, { attachmenterrors_formatted?: string }>;
  category: WebAttribute<Appointment_Select, { category: string | null }, {  }>;
  createdby_guid: WebAttribute<Appointment_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<Appointment_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<Appointment_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  description: WebAttribute<Appointment_Select, { description: string | null }, {  }>;
  exchangerate: WebAttribute<Appointment_Select, { exchangerate: number | null }, {  }>;
  formattedscheduledend: WebAttribute<Appointment_Select, { formattedscheduledend: Date | null }, { formattedscheduledend_formatted?: string }>;
  formattedscheduledstart: WebAttribute<Appointment_Select, { formattedscheduledstart: Date | null }, { formattedscheduledstart_formatted?: string }>;
  globalobjectid: WebAttribute<Appointment_Select, { globalobjectid: string | null }, {  }>;
  importsequencenumber: WebAttribute<Appointment_Select, { importsequencenumber: number | null }, {  }>;
  instancetypecode: WebAttribute<Appointment_Select, { instancetypecode: appointment_instancetypecode | null }, { instancetypecode_formatted?: string }>;
  isalldayevent: WebAttribute<Appointment_Select, { isalldayevent: boolean | null }, {  }>;
  isbilled: WebAttribute<Appointment_Select, { isbilled: boolean | null }, {  }>;
  isdraft: WebAttribute<Appointment_Select, { isdraft: boolean | null }, {  }>;
  ismapiprivate: WebAttribute<Appointment_Select, { ismapiprivate: boolean | null }, {  }>;
  isonlinemeeting: WebAttribute<Appointment_Select, { isonlinemeeting: boolean | null }, {  }>;
  isregularactivity: WebAttribute<Appointment_Select, { isregularactivity: boolean | null }, {  }>;
  isunsafe: WebAttribute<Appointment_Select, { isunsafe: number | null }, {  }>;
  isworkflowcreated: WebAttribute<Appointment_Select, { isworkflowcreated: boolean | null }, {  }>;
  lastonholdtime: WebAttribute<Appointment_Select, { lastonholdtime: Date | null }, { lastonholdtime_formatted?: string }>;
  location: WebAttribute<Appointment_Select, { location: string | null }, {  }>;
  modifiedby_guid: WebAttribute<Appointment_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedfieldsmask: WebAttribute<Appointment_Select, { modifiedfieldsmask: string | null }, {  }>;
  modifiedon: WebAttribute<Appointment_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<Appointment_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  onholdtime: WebAttribute<Appointment_Select, { onholdtime: number | null }, {  }>;
  onlinemeetingchatid: WebAttribute<Appointment_Select, { onlinemeetingchatid: string | null }, {  }>;
  onlinemeetingid: WebAttribute<Appointment_Select, { onlinemeetingid: string | null }, {  }>;
  onlinemeetingjoinurl: WebAttribute<Appointment_Select, { onlinemeetingjoinurl: string | null }, {  }>;
  onlinemeetingtype: WebAttribute<Appointment_Select, { onlinemeetingtype: onlinemeetingtype | null }, { onlinemeetingtype_formatted?: string }>;
  optionalattendees_guid: WebAttribute<Appointment_Select, { optionalattendees_guid: string | null }, { optionalattendees_formatted?: string }>;
  organizer_guid: WebAttribute<Appointment_Select, { organizer_guid: string | null }, { organizer_formatted?: string }>;
  originalstartdate: WebAttribute<Appointment_Select, { originalstartdate: Date | null }, { originalstartdate_formatted?: string }>;
  outlookownerapptid: WebAttribute<Appointment_Select, { outlookownerapptid: number | null }, {  }>;
  overriddencreatedon: WebAttribute<Appointment_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<Appointment_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<Appointment_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<Appointment_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<Appointment_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  prioritycode: WebAttribute<Appointment_Select, { prioritycode: appointment_prioritycode | null }, { prioritycode_formatted?: string }>;
  processid: WebAttribute<Appointment_Select, { processid: string | null }, {  }>;
  regardingobjectid_guid: WebAttribute<Appointment_Select, { regardingobjectid_guid: string | null }, { regardingobjectid_formatted?: string }>;
  requiredattendees_guid: WebAttribute<Appointment_Select, { requiredattendees_guid: string | null }, { requiredattendees_formatted?: string }>;
  scheduleddurationminutes: WebAttribute<Appointment_Select, { scheduleddurationminutes: number | null }, {  }>;
  scheduledend: WebAttribute<Appointment_Select, { scheduledend: Date | null }, { scheduledend_formatted?: string }>;
  scheduledstart: WebAttribute<Appointment_Select, { scheduledstart: Date | null }, { scheduledstart_formatted?: string }>;
  seriesid: WebAttribute<Appointment_Select, { seriesid: string | null }, {  }>;
  serviceid_guid: WebAttribute<Appointment_Select, { serviceid_guid: string | null }, { serviceid_formatted?: string }>;
  slaid_guid: WebAttribute<Appointment_Select, { slaid_guid: string | null }, { slaid_formatted?: string }>;
  slainvokedid_guid: WebAttribute<Appointment_Select, { slainvokedid_guid: string | null }, { slainvokedid_formatted?: string }>;
  sortdate: WebAttribute<Appointment_Select, { sortdate: Date | null }, { sortdate_formatted?: string }>;
  stageid: WebAttribute<Appointment_Select, { stageid: string | null }, {  }>;
  statecode: WebAttribute<Appointment_Select, { statecode: appointment_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<Appointment_Select, { statuscode: appointment_statuscode | null }, { statuscode_formatted?: string }>;
  subcategory: WebAttribute<Appointment_Select, { subcategory: string | null }, {  }>;
  subject: WebAttribute<Appointment_Select, { subject: string | null }, {  }>;
  subscriptionid: WebAttribute<Appointment_Select, { subscriptionid: string | null }, {  }>;
  timezoneruleversionnumber: WebAttribute<Appointment_Select, { timezoneruleversionnumber: number | null }, {  }>;
  transactioncurrencyid_guid: WebAttribute<Appointment_Select, { transactioncurrencyid_guid: string | null }, { transactioncurrencyid_formatted?: string }>;
  traversedpath: WebAttribute<Appointment_Select, { traversedpath: string | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<Appointment_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<Appointment_Select, { versionnumber: number | null }, {  }>;
}
interface Appointment_Filter {
  activityadditionalparams: string;
  activityid: XQW.Guid;
  activitytypecode: string;
  actualdurationminutes: number;
  actualend: Date;
  actualstart: Date;
  attachmentcount: number;
  attachmenterrors: appointment_attachmenterrors;
  category: string;
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  description: string;
  exchangerate: any;
  formattedscheduledend: Date;
  formattedscheduledstart: Date;
  globalobjectid: string;
  importsequencenumber: number;
  instancetypecode: appointment_instancetypecode;
  isalldayevent: boolean;
  isbilled: boolean;
  isdraft: boolean;
  ismapiprivate: boolean;
  isonlinemeeting: boolean;
  isregularactivity: boolean;
  isunsafe: number;
  isworkflowcreated: boolean;
  lastonholdtime: Date;
  location: string;
  modifiedby_guid: XQW.Guid;
  modifiedfieldsmask: string;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  onholdtime: number;
  onlinemeetingchatid: string;
  onlinemeetingid: string;
  onlinemeetingjoinurl: string;
  onlinemeetingtype: onlinemeetingtype;
  optionalattendees_guid: XQW.Guid;
  organizer_guid: XQW.Guid;
  originalstartdate: Date;
  outlookownerapptid: number;
  overriddencreatedon: Date;
  ownerid_guid: XQW.Guid;
  owningbusinessunit_guid: XQW.Guid;
  owningteam_guid: XQW.Guid;
  owninguser_guid: XQW.Guid;
  prioritycode: appointment_prioritycode;
  processid: XQW.Guid;
  regardingobjectid_guid: XQW.Guid;
  requiredattendees_guid: XQW.Guid;
  scheduleddurationminutes: number;
  scheduledend: Date;
  scheduledstart: Date;
  seriesid: XQW.Guid;
  serviceid_guid: XQW.Guid;
  slaid_guid: XQW.Guid;
  slainvokedid_guid: XQW.Guid;
  sortdate: Date;
  stageid: XQW.Guid;
  statecode: appointment_statecode;
  statuscode: appointment_statuscode;
  subcategory: string;
  subject: string;
  subscriptionid: XQW.Guid;
  timezoneruleversionnumber: number;
  transactioncurrencyid_guid: XQW.Guid;
  traversedpath: string;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface Appointment_Expand {
  appointment_PostFollows: WebExpand<Appointment_Expand, PostFollow_Select, PostFollow_Filter, { appointment_PostFollows: PostFollow_Result[] }>;
  appointment_activity_parties: WebExpand<Appointment_Expand, ActivityParty_Select, ActivityParty_Filter, { appointment_activity_parties: ActivityParty_Result[] }>;
  appointment_connections1: WebExpand<Appointment_Expand, Connection_Select, Connection_Filter, { appointment_connections1: Connection_Result[] }>;
  appointment_connections2: WebExpand<Appointment_Expand, Connection_Select, Connection_Filter, { appointment_connections2: Connection_Result[] }>;
  createdby_appointment: WebExpand<Appointment_Expand, SystemUser_Select, SystemUser_Filter, { createdby_appointment: SystemUser_Result }>;
  createdonbehalfby_appointment: WebExpand<Appointment_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby_appointment: SystemUser_Result }>;
  modifiedby_appointment: WebExpand<Appointment_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby_appointment: SystemUser_Result }>;
  modifiedonbehalfby_appointment: WebExpand<Appointment_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby_appointment: SystemUser_Result }>;
  msdyn_appointment_bookableresourcebooking: WebExpand<Appointment_Expand, BookableResourceBooking_Select, BookableResourceBooking_Filter, { msdyn_appointment_bookableresourcebooking: BookableResourceBooking_Result[] }>;
  ownerid_appointment: WebExpand<Appointment_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid_appointment: SystemUser_Result } & { ownerid_appointment: Team_Result }>;
  owningteam_appointment: WebExpand<Appointment_Expand, Team_Select, Team_Filter, { owningteam_appointment: Team_Result }>;
  owninguser_appointment: WebExpand<Appointment_Expand, SystemUser_Select, SystemUser_Filter, { owninguser_appointment: SystemUser_Result }>;
  regardingobjectid_account_appointment: WebExpand<Appointment_Expand, Account_Select, Account_Filter, { regardingobjectid_account_appointment: Account_Result }>;
  regardingobjectid_bookableresourcebooking_appointment: WebExpand<Appointment_Expand, BookableResourceBooking_Select, BookableResourceBooking_Filter, { regardingobjectid_bookableresourcebooking_appointment: BookableResourceBooking_Result }>;
  regardingobjectid_contact_appointment: WebExpand<Appointment_Expand, Contact_Select, Contact_Filter, { regardingobjectid_contact_appointment: Contact_Result }>;
  regardingobjectid_incident_appointment: WebExpand<Appointment_Expand, Incident_Select, Incident_Filter, { regardingobjectid_incident_appointment: Incident_Result }>;
  regardingobjectid_msdyn_customerasset_appointment: WebExpand<Appointment_Expand, msdyn_customerasset_Select, msdyn_customerasset_Filter, { regardingobjectid_msdyn_customerasset_appointment: msdyn_customerasset_Result }>;
  regardingobjectid_msdyn_workorder_appointment: WebExpand<Appointment_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { regardingobjectid_msdyn_workorder_appointment: msdyn_workorder_Result }>;
  regardingobjectid_msdyn_workorderservicetask_appointment: WebExpand<Appointment_Expand, msdyn_workorderservicetask_Select, msdyn_workorderservicetask_Filter, { regardingobjectid_msdyn_workorderservicetask_appointment: msdyn_workorderservicetask_Result }>;
  regardingobjectid_ovs_operation_appointment: WebExpand<Appointment_Expand, ovs_operation_Select, ovs_operation_Filter, { regardingobjectid_ovs_operation_appointment: ovs_operation_Result }>;
  regardingobjectid_ts_securityincident_appointment: WebExpand<Appointment_Expand, ts_securityincident_Select, ts_securityincident_Filter, { regardingobjectid_ts_securityincident_appointment: ts_securityincident_Result }>;
  regardingobjectid_ts_teamplanningdata_appointment: WebExpand<Appointment_Expand, ts_TeamPlanningData_Select, ts_TeamPlanningData_Filter, { regardingobjectid_ts_teamplanningdata_appointment: ts_TeamPlanningData_Result }>;
}
interface Appointment_FormattedResult {
  actualend_formatted?: string;
  actualstart_formatted?: string;
  attachmenterrors_formatted?: string;
  createdby_formatted?: string;
  createdon_formatted?: string;
  createdonbehalfby_formatted?: string;
  formattedscheduledend_formatted?: string;
  formattedscheduledstart_formatted?: string;
  instancetypecode_formatted?: string;
  lastonholdtime_formatted?: string;
  modifiedby_formatted?: string;
  modifiedon_formatted?: string;
  modifiedonbehalfby_formatted?: string;
  onlinemeetingtype_formatted?: string;
  optionalattendees_formatted?: string;
  organizer_formatted?: string;
  originalstartdate_formatted?: string;
  overriddencreatedon_formatted?: string;
  ownerid_formatted?: string;
  owningbusinessunit_formatted?: string;
  owningteam_formatted?: string;
  owninguser_formatted?: string;
  prioritycode_formatted?: string;
  regardingobjectid_formatted?: string;
  requiredattendees_formatted?: string;
  scheduledend_formatted?: string;
  scheduledstart_formatted?: string;
  serviceid_formatted?: string;
  slaid_formatted?: string;
  slainvokedid_formatted?: string;
  sortdate_formatted?: string;
  statecode_formatted?: string;
  statuscode_formatted?: string;
  transactioncurrencyid_formatted?: string;
}
interface Appointment_Result extends Appointment_Base, Appointment_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  optionalattendees_guid: string | null;
  organizer_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
  regardingobjectid_guid: string | null;
  requiredattendees_guid: string | null;
  serviceid_guid: string | null;
  slaid_guid: string | null;
  slainvokedid_guid: string | null;
  transactioncurrencyid_guid: string | null;
}
interface Appointment_RelatedOne {
  createdby_appointment: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby_appointment: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby_appointment: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby_appointment: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid_appointment: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  ownerid_appointment1: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  owningteam_appointment: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser_appointment: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  regardingobjectid_account_appointment: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
  regardingobjectid_bookableresourcebooking_appointment: WebMappingRetrieve<BookableResourceBooking_Select,BookableResourceBooking_Expand,BookableResourceBooking_Filter,BookableResourceBooking_Fixed,BookableResourceBooking_Result,BookableResourceBooking_FormattedResult>;
  regardingobjectid_contact_appointment: WebMappingRetrieve<Contact_Select,Contact_Expand,Contact_Filter,Contact_Fixed,Contact_Result,Contact_FormattedResult>;
  regardingobjectid_incident_appointment: WebMappingRetrieve<Incident_Select,Incident_Expand,Incident_Filter,Incident_Fixed,Incident_Result,Incident_FormattedResult>;
  regardingobjectid_msdyn_customerasset_appointment: WebMappingRetrieve<msdyn_customerasset_Select,msdyn_customerasset_Expand,msdyn_customerasset_Filter,msdyn_customerasset_Fixed,msdyn_customerasset_Result,msdyn_customerasset_FormattedResult>;
  regardingobjectid_msdyn_workorder_appointment: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
  regardingobjectid_msdyn_workorderservicetask_appointment: WebMappingRetrieve<msdyn_workorderservicetask_Select,msdyn_workorderservicetask_Expand,msdyn_workorderservicetask_Filter,msdyn_workorderservicetask_Fixed,msdyn_workorderservicetask_Result,msdyn_workorderservicetask_FormattedResult>;
  regardingobjectid_ovs_operation_appointment: WebMappingRetrieve<ovs_operation_Select,ovs_operation_Expand,ovs_operation_Filter,ovs_operation_Fixed,ovs_operation_Result,ovs_operation_FormattedResult>;
  regardingobjectid_ts_securityincident_appointment: WebMappingRetrieve<ts_securityincident_Select,ts_securityincident_Expand,ts_securityincident_Filter,ts_securityincident_Fixed,ts_securityincident_Result,ts_securityincident_FormattedResult>;
  regardingobjectid_ts_teamplanningdata_appointment: WebMappingRetrieve<ts_TeamPlanningData_Select,ts_TeamPlanningData_Expand,ts_TeamPlanningData_Filter,ts_TeamPlanningData_Fixed,ts_TeamPlanningData_Result,ts_TeamPlanningData_FormattedResult>;
}
interface Appointment_RelatedMany {
  appointment_PostFollows: WebMappingRetrieve<PostFollow_Select,PostFollow_Expand,PostFollow_Filter,PostFollow_Fixed,PostFollow_Result,PostFollow_FormattedResult>;
  appointment_activity_parties: WebMappingRetrieve<ActivityParty_Select,ActivityParty_Expand,ActivityParty_Filter,ActivityParty_Fixed,ActivityParty_Result,ActivityParty_FormattedResult>;
  appointment_connections1: WebMappingRetrieve<Connection_Select,Connection_Expand,Connection_Filter,Connection_Fixed,Connection_Result,Connection_FormattedResult>;
  appointment_connections2: WebMappingRetrieve<Connection_Select,Connection_Expand,Connection_Filter,Connection_Fixed,Connection_Result,Connection_FormattedResult>;
  msdyn_appointment_bookableresourcebooking: WebMappingRetrieve<BookableResourceBooking_Select,BookableResourceBooking_Expand,BookableResourceBooking_Filter,BookableResourceBooking_Fixed,BookableResourceBooking_Result,BookableResourceBooking_FormattedResult>;
}
interface WebEntitiesRetrieve {
  appointments: WebMappingRetrieve<Appointment_Select,Appointment_Expand,Appointment_Filter,Appointment_Fixed,Appointment_Result,Appointment_FormattedResult>;
}
interface WebEntitiesRelated {
  appointments: WebMappingRelated<Appointment_RelatedOne,Appointment_RelatedMany>;
}
interface WebEntitiesCUDA {
  appointments: WebMappingCUDA<Appointment_Create,Appointment_Update,Appointment_Select>;
}
