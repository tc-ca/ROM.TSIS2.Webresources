interface ServiceAppointment_Base extends WebEntity {
  activityadditionalparams?: string | null;
  activityid?: string | null;
  activitytypecode?: string | null;
  actualdurationminutes?: number | null;
  actualend?: Date | null;
  actualstart?: Date | null;
  category?: string | null;
  community?: socialprofile_community | null;
  createdon?: Date | null;
  deliverylastattemptedon?: Date | null;
  deliveryprioritycode?: activitypointer_deliveryprioritycode | null;
  description?: string | null;
  exchangeitemid?: string | null;
  exchangerate?: number | null;
  exchangeweblink?: string | null;
  importsequencenumber?: number | null;
  instancetypecode?: _serviceappointment_instancetypecode | null;
  isalldayevent?: boolean | null;
  isbilled?: boolean | null;
  ismapiprivate?: boolean | null;
  isregularactivity?: boolean | null;
  isworkflowcreated?: boolean | null;
  lastonholdtime?: Date | null;
  leftvoicemail?: boolean | null;
  location?: string | null;
  modifiedon?: Date | null;
  onholdtime?: number | null;
  overriddencreatedon?: Date | null;
  postponeactivityprocessinguntil?: Date | null;
  prioritycode?: serviceappointment_prioritycode | null;
  processid?: string | null;
  scheduleddurationminutes?: number | null;
  scheduledend?: Date | null;
  scheduledstart?: Date | null;
  senton?: Date | null;
  seriesid?: string | null;
  sortdate?: Date | null;
  stageid?: string | null;
  statecode?: serviceappointment_statecode | null;
  statuscode?: serviceappointment_statuscode | null;
  subcategory?: string | null;
  subject?: string | null;
  subscriptionid?: string | null;
  timezoneruleversionnumber?: number | null;
  traversedpath?: string | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ServiceAppointment_Relationships {
  createdby_serviceappointment?: SystemUser_Result | null;
  createdonbehalfby_serviceappointment?: SystemUser_Result | null;
  modifiedby_serviceappointment?: SystemUser_Result | null;
  modifiedonbehalfby_serviceappointment?: SystemUser_Result | null;
  msdyn_serviceappointment_bookableresourcebooking_serviceappointment?: BookableResourceBooking_Result[] | null;
  ownerid_serviceappointment?: Team_Result | null;
  ownerid_serviceappointment1?: SystemUser_Result | null;
  owningteam_serviceappointment?: Team_Result | null;
  owninguser_serviceappointment?: SystemUser_Result | null;
  regardingobjectid_account_serviceappointment?: Account_Result | null;
  regardingobjectid_bookableresourcebooking_serviceappointment?: BookableResourceBooking_Result | null;
  regardingobjectid_contact_serviceappointment?: Contact_Result | null;
  regardingobjectid_incident_serviceappointment?: Incident_Result | null;
  regardingobjectid_msdyn_customerasset_serviceappointment?: msdyn_customerasset_Result | null;
  regardingobjectid_msdyn_workorder_serviceappointment?: msdyn_workorder_Result | null;
  regardingobjectid_msdyn_workorderservicetask_serviceappointment?: msdyn_workorderservicetask_Result | null;
  regardingobjectid_ovs_operation_serviceappointment?: ovs_operation_Result | null;
  regardingobjectid_ts_securityincident_serviceappointment?: ts_securityincident_Result | null;
  serviceappointment_activity_parties?: ActivityParty_Result[] | null;
  serviceappointment_connections1?: Connection_Result[] | null;
  serviceappointment_connections2?: Connection_Result[] | null;
}
interface ServiceAppointment extends ServiceAppointment_Base, ServiceAppointment_Relationships {
  SLAId_bind$slas?: string | null;
  msdyn_OrganizationalUnitServiceAppointmentId_ServiceAppointment_bind$msdyn_organizationalunits?: string | null;
  ownerid_serviceappointment_bind$systemusers?: string | null;
  ownerid_serviceappointment_bind$teams?: string | null;
  regardingobjectid_account_serviceappointment_bind$accounts?: string | null;
  regardingobjectid_bookableresourcebooking_serviceappointment_bind$bookableresourcebookings?: string | null;
  regardingobjectid_bookableresourcebookingheader_serviceappointment_bind$bookableresourcebookingheaders?: string | null;
  regardingobjectid_bulkoperation_serviceappointment_bind$bulkoperations?: string | null;
  regardingobjectid_campaign_serviceappointment_bind$campaigns?: string | null;
  regardingobjectid_campaignactivity_serviceappointment_bind$campaignactivities?: string | null;
  regardingobjectid_contact_serviceappointment_bind$contacts?: string | null;
  regardingobjectid_contract_serviceappointment_bind$contracts?: string | null;
  regardingobjectid_entitlement_serviceappointment_bind$entitlements?: string | null;
  regardingobjectid_entitlementtemplate_serviceappointment_bind$entitlementtemplates?: string | null;
  regardingobjectid_ikl_a2d_securitytemplate_serviceappointment_bind$ikl_a2d_securitytemplates?: string | null;
  regardingobjectid_ikl_bulkmigrationjob_serviceappointment_bind$ikl_bulkmigrationjobs?: string | null;
  regardingobjectid_ikl_bulkmigrationjobstatus_serviceappointment_bind$ikl_bulkmigrationjobstatuses?: string | null;
  regardingobjectid_ikl_inogiclicensedetails_serviceappointment_bind$ikl_inogiclicensedetailses?: string | null;
  regardingobjectid_incident_serviceappointment_bind$incidents?: string | null;
  regardingobjectid_invoice_serviceappointment_bind$invoices?: string | null;
  regardingobjectid_knowledgearticle_serviceappointment_bind$knowledgearticles?: string | null;
  regardingobjectid_knowledgebaserecord_serviceappointment_bind$knowledgebaserecords?: string | null;
  regardingobjectid_lead_serviceappointment_bind$leads?: string | null;
  regardingobjectid_msdyn_agreement_serviceappointment_bind$msdyn_agreements?: string | null;
  regardingobjectid_msdyn_agreementbookingdate_serviceappointment_bind$msdyn_agreementbookingdates?: string | null;
  regardingobjectid_msdyn_agreementbookingincident_serviceappointment_bind$msdyn_agreementbookingincidents?: string | null;
  regardingobjectid_msdyn_agreementbookingproduct_serviceappointment_bind$msdyn_agreementbookingproducts?: string | null;
  regardingobjectid_msdyn_agreementbookingservice_serviceappointment_bind$msdyn_agreementbookingservices?: string | null;
  regardingobjectid_msdyn_agreementbookingservicetask_serviceappointment_bind$msdyn_agreementbookingservicetasks?: string | null;
  regardingobjectid_msdyn_agreementbookingsetup_serviceappointment_bind$msdyn_agreementbookingsetups?: string | null;
  regardingobjectid_msdyn_agreementinvoicedate_serviceappointment_bind$msdyn_agreementinvoicedates?: string | null;
  regardingobjectid_msdyn_agreementinvoiceproduct_serviceappointment_bind$msdyn_agreementinvoiceproducts?: string | null;
  regardingobjectid_msdyn_agreementinvoicesetup_serviceappointment_bind$msdyn_agreementinvoicesetups?: string | null;
  regardingobjectid_msdyn_bookingalertstatus_serviceappointment_bind$msdyn_bookingalertstatuses?: string | null;
  regardingobjectid_msdyn_bookingrule_serviceappointment_bind$msdyn_bookingrules?: string | null;
  regardingobjectid_msdyn_bookingtimestamp_serviceappointment_bind$msdyn_bookingtimestamps?: string | null;
  regardingobjectid_msdyn_customerasset_serviceappointment_bind$msdyn_customerassets?: string | null;
  regardingobjectid_msdyn_fieldservicesetting_serviceappointment_bind$msdyn_fieldservicesettings?: string | null;
  regardingobjectid_msdyn_incidenttypecharacteristic_serviceappointment_bind$msdyn_incidenttypecharacteristics?: string | null;
  regardingobjectid_msdyn_incidenttypeproduct_serviceappointment_bind$msdyn_incidenttypeproducts?: string | null;
  regardingobjectid_msdyn_incidenttypeservice_serviceappointment_bind$msdyn_incidenttypeservices?: string | null;
  regardingobjectid_msdyn_inventoryadjustment_serviceappointment_bind$msdyn_inventoryadjustments?: string | null;
  regardingobjectid_msdyn_inventoryadjustmentproduct_serviceappointment_bind$msdyn_inventoryadjustmentproducts?: string | null;
  regardingobjectid_msdyn_inventoryjournal_serviceappointment_bind$msdyn_inventoryjournals?: string | null;
  regardingobjectid_msdyn_inventorytransfer_serviceappointment_bind$msdyn_inventorytransfers?: string | null;
  regardingobjectid_msdyn_payment_serviceappointment_bind$msdyn_payments?: string | null;
  regardingobjectid_msdyn_paymentdetail_serviceappointment_bind$msdyn_paymentdetailes?: string | null;
  regardingobjectid_msdyn_paymentmethod_serviceappointment_bind$msdyn_paymentmethods?: string | null;
  regardingobjectid_msdyn_paymentterm_serviceappointment_bind$msdyn_paymentterms?: string | null;
  regardingobjectid_msdyn_playbookinstance_serviceappointment_bind$msdyn_playbookinstances?: string | null;
  regardingobjectid_msdyn_postalbum_serviceappointment_bind$msdyn_postalbums?: string | null;
  regardingobjectid_msdyn_postalcode_serviceappointment_bind$msdyn_postalcodes?: string | null;
  regardingobjectid_msdyn_productinventory_serviceappointment_bind$msdyn_productinventories?: string | null;
  regardingobjectid_msdyn_purchaseorder_serviceappointment_bind$msdyn_purchaseorders?: string | null;
  regardingobjectid_msdyn_purchaseorderbill_serviceappointment_bind$msdyn_purchaseorderbills?: string | null;
  regardingobjectid_msdyn_purchaseorderproduct_serviceappointment_bind$msdyn_purchaseorderproducts?: string | null;
  regardingobjectid_msdyn_purchaseorderreceipt_serviceappointment_bind$msdyn_purchaseorderreceipts?: string | null;
  regardingobjectid_msdyn_purchaseorderreceiptproduct_serviceappointment_bind$msdyn_purchaseorderreceiptproducts?: string | null;
  regardingobjectid_msdyn_purchaseordersubstatus_serviceappointment_bind$msdyn_purchaseordersubstatuses?: string | null;
  regardingobjectid_msdyn_quotebookingincident_serviceappointment_bind$msdyn_quotebookingincidents?: string | null;
  regardingobjectid_msdyn_quotebookingproduct_serviceappointment_bind$msdyn_quotebookingproducts?: string | null;
  regardingobjectid_msdyn_quotebookingservice_serviceappointment_bind$msdyn_quotebookingservices?: string | null;
  regardingobjectid_msdyn_quotebookingservicetask_serviceappointment_bind$msdyn_quotebookingservicetasks?: string | null;
  regardingobjectid_msdyn_resourceterritory_serviceappointment_bind$msdyn_resourceterritories?: string | null;
  regardingobjectid_msdyn_rma_serviceappointment_bind$msdyn_rmas?: string | null;
  regardingobjectid_msdyn_rmaproduct_serviceappointment_bind$msdyn_rmaproducts?: string | null;
  regardingobjectid_msdyn_rmareceipt_serviceappointment_bind$msdyn_rmareceipts?: string | null;
  regardingobjectid_msdyn_rmareceiptproduct_serviceappointment_bind$msdyn_rmareceiptproducts?: string | null;
  regardingobjectid_msdyn_rmasubstatus_serviceappointment_bind$msdyn_rmasubstatuses?: string | null;
  regardingobjectid_msdyn_rtv_serviceappointment_bind$msdyn_rtvs?: string | null;
  regardingobjectid_msdyn_rtvproduct_serviceappointment_bind$msdyn_rtvproducts?: string | null;
  regardingobjectid_msdyn_rtvsubstatus_serviceappointment_bind$msdyn_rtvsubstatuses?: string | null;
  regardingobjectid_msdyn_salessuggestion_serviceappointment_bind$msdyn_salessuggestions?: string | null;
  regardingobjectid_msdyn_shipvia_serviceappointment_bind$msdyn_shipvias?: string | null;
  regardingobjectid_msdyn_swarm_serviceappointment_bind$msdyn_swarms?: string | null;
  regardingobjectid_msdyn_systemuserschedulersetting_serviceappointment_bind$msdyn_systemuserschedulersettinges?: string | null;
  regardingobjectid_msdyn_timegroup_serviceappointment_bind$msdyn_timegroups?: string | null;
  regardingobjectid_msdyn_timegroupdetail_serviceappointment_bind$msdyn_timegroupdetails?: string | null;
  regardingobjectid_msdyn_timeoffrequest_serviceappointment_bind$msdyn_timeoffrequests?: string | null;
  regardingobjectid_msdyn_warehouse_serviceappointment_bind$msdyn_warehouses?: string | null;
  regardingobjectid_msdyn_workorder_serviceappointment_bind$msdyn_workorders?: string | null;
  regardingobjectid_msdyn_workordercharacteristic_serviceappointment_bind$msdyn_workordercharacteristics?: string | null;
  regardingobjectid_msdyn_workorderincident_serviceappointment_bind$msdyn_workorderincidents?: string | null;
  regardingobjectid_msdyn_workorderproduct_serviceappointment_bind$msdyn_workorderproducts?: string | null;
  regardingobjectid_msdyn_workorderresourcerestriction_serviceappointment_bind$msdyn_workorderresourcerestrictions?: string | null;
  regardingobjectid_msdyn_workorderservice_serviceappointment_bind$msdyn_workorderservices?: string | null;
  regardingobjectid_msdyn_workorderservicetask_serviceappointment_bind$msdyn_workorderservicetasks?: string | null;
  regardingobjectid_new_interactionforemail_serviceappointment_bind$interactionforemails?: string | null;
  regardingobjectid_opportunity_serviceappointment_bind$opportunities?: string | null;
  regardingobjectid_ovs_operation_serviceappointment_bind$ovs_operations?: string | null;
  regardingobjectid_ppp_traveller_serviceappointment_bind$ppp_travellers?: string | null;
  regardingobjectid_quote_serviceappointment_bind$quotes?: string | null;
  regardingobjectid_salesorder_serviceappointment_bind$salesorders?: string | null;
  regardingobjectid_site_serviceappointment_bind$sites?: string | null;
  regardingobjectid_ts_request_serviceappointment_bind$ts_requests?: string | null;
  regardingobjectid_ts_securityincident_serviceappointment_bind$ts_securityincidents?: string | null;
  serviceid_serviceappointment_bind$services?: string | null;
  siteid_bind$sites?: string | null;
  transactioncurrencyid_serviceappointment_bind$transactioncurrencies?: string | null;
}
interface ServiceAppointment_Create extends ServiceAppointment {
  activityid_activitypointer_bind$activitypointers?: string | null;
}
interface ServiceAppointment_Update extends ServiceAppointment {
}
interface ServiceAppointment_Select {
  activityadditionalparams: WebAttribute<ServiceAppointment_Select, { activityadditionalparams: string | null }, {  }>;
  activityid: WebAttribute<ServiceAppointment_Select, { activityid: string | null }, {  }>;
  activitytypecode: WebAttribute<ServiceAppointment_Select, { activitytypecode: string | null }, {  }>;
  actualdurationminutes: WebAttribute<ServiceAppointment_Select, { actualdurationminutes: number | null }, {  }>;
  actualend: WebAttribute<ServiceAppointment_Select, { actualend: Date | null }, { actualend_formatted?: string }>;
  actualstart: WebAttribute<ServiceAppointment_Select, { actualstart: Date | null }, { actualstart_formatted?: string }>;
  bcc_guid: WebAttribute<ServiceAppointment_Select, { bcc_guid: string | null }, { bcc_formatted?: string }>;
  category: WebAttribute<ServiceAppointment_Select, { category: string | null }, {  }>;
  cc_guid: WebAttribute<ServiceAppointment_Select, { cc_guid: string | null }, { cc_formatted?: string }>;
  community: WebAttribute<ServiceAppointment_Select, { community: socialprofile_community | null }, { community_formatted?: string }>;
  createdby_guid: WebAttribute<ServiceAppointment_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ServiceAppointment_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ServiceAppointment_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  customers_guid: WebAttribute<ServiceAppointment_Select, { customers_guid: string | null }, { customers_formatted?: string }>;
  deliverylastattemptedon: WebAttribute<ServiceAppointment_Select, { deliverylastattemptedon: Date | null }, { deliverylastattemptedon_formatted?: string }>;
  deliveryprioritycode: WebAttribute<ServiceAppointment_Select, { deliveryprioritycode: activitypointer_deliveryprioritycode | null }, { deliveryprioritycode_formatted?: string }>;
  description: WebAttribute<ServiceAppointment_Select, { description: string | null }, {  }>;
  exchangeitemid: WebAttribute<ServiceAppointment_Select, { exchangeitemid: string | null }, {  }>;
  exchangerate: WebAttribute<ServiceAppointment_Select, { exchangerate: number | null }, {  }>;
  exchangeweblink: WebAttribute<ServiceAppointment_Select, { exchangeweblink: string | null }, {  }>;
  from_guid: WebAttribute<ServiceAppointment_Select, { from_guid: string | null }, { from_formatted?: string }>;
  importsequencenumber: WebAttribute<ServiceAppointment_Select, { importsequencenumber: number | null }, {  }>;
  instancetypecode: WebAttribute<ServiceAppointment_Select, { instancetypecode: _serviceappointment_instancetypecode | null }, { instancetypecode_formatted?: string }>;
  isalldayevent: WebAttribute<ServiceAppointment_Select, { isalldayevent: boolean | null }, {  }>;
  isbilled: WebAttribute<ServiceAppointment_Select, { isbilled: boolean | null }, {  }>;
  ismapiprivate: WebAttribute<ServiceAppointment_Select, { ismapiprivate: boolean | null }, {  }>;
  isregularactivity: WebAttribute<ServiceAppointment_Select, { isregularactivity: boolean | null }, {  }>;
  isworkflowcreated: WebAttribute<ServiceAppointment_Select, { isworkflowcreated: boolean | null }, {  }>;
  lastonholdtime: WebAttribute<ServiceAppointment_Select, { lastonholdtime: Date | null }, { lastonholdtime_formatted?: string }>;
  leftvoicemail: WebAttribute<ServiceAppointment_Select, { leftvoicemail: boolean | null }, {  }>;
  location: WebAttribute<ServiceAppointment_Select, { location: string | null }, {  }>;
  modifiedby_guid: WebAttribute<ServiceAppointment_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ServiceAppointment_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ServiceAppointment_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  msdyn_organizationalunitid_guid: WebAttribute<ServiceAppointment_Select, { msdyn_organizationalunitid_guid: string | null }, { msdyn_organizationalunitid_formatted?: string }>;
  onholdtime: WebAttribute<ServiceAppointment_Select, { onholdtime: number | null }, {  }>;
  optionalattendees_guid: WebAttribute<ServiceAppointment_Select, { optionalattendees_guid: string | null }, { optionalattendees_formatted?: string }>;
  organizer_guid: WebAttribute<ServiceAppointment_Select, { organizer_guid: string | null }, { organizer_formatted?: string }>;
  overriddencreatedon: WebAttribute<ServiceAppointment_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ServiceAppointment_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ServiceAppointment_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ServiceAppointment_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ServiceAppointment_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  partners_guid: WebAttribute<ServiceAppointment_Select, { partners_guid: string | null }, { partners_formatted?: string }>;
  postponeactivityprocessinguntil: WebAttribute<ServiceAppointment_Select, { postponeactivityprocessinguntil: Date | null }, { postponeactivityprocessinguntil_formatted?: string }>;
  prioritycode: WebAttribute<ServiceAppointment_Select, { prioritycode: serviceappointment_prioritycode | null }, { prioritycode_formatted?: string }>;
  processid: WebAttribute<ServiceAppointment_Select, { processid: string | null }, {  }>;
  regardingobjectid_guid: WebAttribute<ServiceAppointment_Select, { regardingobjectid_guid: string | null }, { regardingobjectid_formatted?: string }>;
  requiredattendees_guid: WebAttribute<ServiceAppointment_Select, { requiredattendees_guid: string | null }, { requiredattendees_formatted?: string }>;
  resources_guid: WebAttribute<ServiceAppointment_Select, { resources_guid: string | null }, { resources_formatted?: string }>;
  scheduleddurationminutes: WebAttribute<ServiceAppointment_Select, { scheduleddurationminutes: number | null }, {  }>;
  scheduledend: WebAttribute<ServiceAppointment_Select, { scheduledend: Date | null }, { scheduledend_formatted?: string }>;
  scheduledstart: WebAttribute<ServiceAppointment_Select, { scheduledstart: Date | null }, { scheduledstart_formatted?: string }>;
  sendermailboxid_guid: WebAttribute<ServiceAppointment_Select, { sendermailboxid_guid: string | null }, { sendermailboxid_formatted?: string }>;
  senton: WebAttribute<ServiceAppointment_Select, { senton: Date | null }, { senton_formatted?: string }>;
  seriesid: WebAttribute<ServiceAppointment_Select, { seriesid: string | null }, {  }>;
  serviceid_guid: WebAttribute<ServiceAppointment_Select, { serviceid_guid: string | null }, { serviceid_formatted?: string }>;
  siteid_guid: WebAttribute<ServiceAppointment_Select, { siteid_guid: string | null }, { siteid_formatted?: string }>;
  slaid_guid: WebAttribute<ServiceAppointment_Select, { slaid_guid: string | null }, { slaid_formatted?: string }>;
  slainvokedid_guid: WebAttribute<ServiceAppointment_Select, { slainvokedid_guid: string | null }, { slainvokedid_formatted?: string }>;
  sortdate: WebAttribute<ServiceAppointment_Select, { sortdate: Date | null }, { sortdate_formatted?: string }>;
  stageid: WebAttribute<ServiceAppointment_Select, { stageid: string | null }, {  }>;
  statecode: WebAttribute<ServiceAppointment_Select, { statecode: serviceappointment_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ServiceAppointment_Select, { statuscode: serviceappointment_statuscode | null }, { statuscode_formatted?: string }>;
  subcategory: WebAttribute<ServiceAppointment_Select, { subcategory: string | null }, {  }>;
  subject: WebAttribute<ServiceAppointment_Select, { subject: string | null }, {  }>;
  subscriptionid: WebAttribute<ServiceAppointment_Select, { subscriptionid: string | null }, {  }>;
  timezoneruleversionnumber: WebAttribute<ServiceAppointment_Select, { timezoneruleversionnumber: number | null }, {  }>;
  to_guid: WebAttribute<ServiceAppointment_Select, { to_guid: string | null }, { to_formatted?: string }>;
  transactioncurrencyid_guid: WebAttribute<ServiceAppointment_Select, { transactioncurrencyid_guid: string | null }, { transactioncurrencyid_formatted?: string }>;
  traversedpath: WebAttribute<ServiceAppointment_Select, { traversedpath: string | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<ServiceAppointment_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ServiceAppointment_Select, { versionnumber: number | null }, {  }>;
}
interface ServiceAppointment_Filter {
  activityadditionalparams: string;
  activityid: XQW.Guid;
  activitytypecode: string;
  actualdurationminutes: number;
  actualend: Date;
  actualstart: Date;
  bcc_guid: XQW.Guid;
  category: string;
  cc_guid: XQW.Guid;
  community: socialprofile_community;
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  customers_guid: XQW.Guid;
  deliverylastattemptedon: Date;
  deliveryprioritycode: activitypointer_deliveryprioritycode;
  description: string;
  exchangeitemid: string;
  exchangerate: any;
  exchangeweblink: string;
  from_guid: XQW.Guid;
  importsequencenumber: number;
  instancetypecode: _serviceappointment_instancetypecode;
  isalldayevent: boolean;
  isbilled: boolean;
  ismapiprivate: boolean;
  isregularactivity: boolean;
  isworkflowcreated: boolean;
  lastonholdtime: Date;
  leftvoicemail: boolean;
  location: string;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  msdyn_organizationalunitid_guid: XQW.Guid;
  onholdtime: number;
  optionalattendees_guid: XQW.Guid;
  organizer_guid: XQW.Guid;
  overriddencreatedon: Date;
  ownerid_guid: XQW.Guid;
  owningbusinessunit_guid: XQW.Guid;
  owningteam_guid: XQW.Guid;
  owninguser_guid: XQW.Guid;
  partners_guid: XQW.Guid;
  postponeactivityprocessinguntil: Date;
  prioritycode: serviceappointment_prioritycode;
  processid: XQW.Guid;
  regardingobjectid_guid: XQW.Guid;
  requiredattendees_guid: XQW.Guid;
  resources_guid: XQW.Guid;
  scheduleddurationminutes: number;
  scheduledend: Date;
  scheduledstart: Date;
  sendermailboxid_guid: XQW.Guid;
  senton: Date;
  seriesid: XQW.Guid;
  serviceid_guid: XQW.Guid;
  siteid_guid: XQW.Guid;
  slaid_guid: XQW.Guid;
  slainvokedid_guid: XQW.Guid;
  sortdate: Date;
  stageid: XQW.Guid;
  statecode: serviceappointment_statecode;
  statuscode: serviceappointment_statuscode;
  subcategory: string;
  subject: string;
  subscriptionid: XQW.Guid;
  timezoneruleversionnumber: number;
  to_guid: XQW.Guid;
  transactioncurrencyid_guid: XQW.Guid;
  traversedpath: string;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ServiceAppointment_Expand {
  createdby_serviceappointment: WebExpand<ServiceAppointment_Expand, SystemUser_Select, SystemUser_Filter, { createdby_serviceappointment: SystemUser_Result }>;
  createdonbehalfby_serviceappointment: WebExpand<ServiceAppointment_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby_serviceappointment: SystemUser_Result }>;
  modifiedby_serviceappointment: WebExpand<ServiceAppointment_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby_serviceappointment: SystemUser_Result }>;
  modifiedonbehalfby_serviceappointment: WebExpand<ServiceAppointment_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby_serviceappointment: SystemUser_Result }>;
  msdyn_serviceappointment_bookableresourcebooking_serviceappointment: WebExpand<ServiceAppointment_Expand, BookableResourceBooking_Select, BookableResourceBooking_Filter, { msdyn_serviceappointment_bookableresourcebooking_serviceappointment: BookableResourceBooking_Result[] }>;
  ownerid_serviceappointment: WebExpand<ServiceAppointment_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid_serviceappointment: SystemUser_Result } & { ownerid_serviceappointment: Team_Result }>;
  owningteam_serviceappointment: WebExpand<ServiceAppointment_Expand, Team_Select, Team_Filter, { owningteam_serviceappointment: Team_Result }>;
  owninguser_serviceappointment: WebExpand<ServiceAppointment_Expand, SystemUser_Select, SystemUser_Filter, { owninguser_serviceappointment: SystemUser_Result }>;
  regardingobjectid_account_serviceappointment: WebExpand<ServiceAppointment_Expand, Account_Select, Account_Filter, { regardingobjectid_account_serviceappointment: Account_Result }>;
  regardingobjectid_bookableresourcebooking_serviceappointment: WebExpand<ServiceAppointment_Expand, BookableResourceBooking_Select, BookableResourceBooking_Filter, { regardingobjectid_bookableresourcebooking_serviceappointment: BookableResourceBooking_Result }>;
  regardingobjectid_contact_serviceappointment: WebExpand<ServiceAppointment_Expand, Contact_Select, Contact_Filter, { regardingobjectid_contact_serviceappointment: Contact_Result }>;
  regardingobjectid_incident_serviceappointment: WebExpand<ServiceAppointment_Expand, Incident_Select, Incident_Filter, { regardingobjectid_incident_serviceappointment: Incident_Result }>;
  regardingobjectid_msdyn_customerasset_serviceappointment: WebExpand<ServiceAppointment_Expand, msdyn_customerasset_Select, msdyn_customerasset_Filter, { regardingobjectid_msdyn_customerasset_serviceappointment: msdyn_customerasset_Result }>;
  regardingobjectid_msdyn_workorder_serviceappointment: WebExpand<ServiceAppointment_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { regardingobjectid_msdyn_workorder_serviceappointment: msdyn_workorder_Result }>;
  regardingobjectid_msdyn_workorderservicetask_serviceappointment: WebExpand<ServiceAppointment_Expand, msdyn_workorderservicetask_Select, msdyn_workorderservicetask_Filter, { regardingobjectid_msdyn_workorderservicetask_serviceappointment: msdyn_workorderservicetask_Result }>;
  regardingobjectid_ovs_operation_serviceappointment: WebExpand<ServiceAppointment_Expand, ovs_operation_Select, ovs_operation_Filter, { regardingobjectid_ovs_operation_serviceappointment: ovs_operation_Result }>;
  regardingobjectid_ts_securityincident_serviceappointment: WebExpand<ServiceAppointment_Expand, ts_securityincident_Select, ts_securityincident_Filter, { regardingobjectid_ts_securityincident_serviceappointment: ts_securityincident_Result }>;
  serviceappointment_activity_parties: WebExpand<ServiceAppointment_Expand, ActivityParty_Select, ActivityParty_Filter, { serviceappointment_activity_parties: ActivityParty_Result[] }>;
  serviceappointment_connections1: WebExpand<ServiceAppointment_Expand, Connection_Select, Connection_Filter, { serviceappointment_connections1: Connection_Result[] }>;
  serviceappointment_connections2: WebExpand<ServiceAppointment_Expand, Connection_Select, Connection_Filter, { serviceappointment_connections2: Connection_Result[] }>;
}
interface ServiceAppointment_FormattedResult {
  actualend_formatted?: string;
  actualstart_formatted?: string;
  bcc_formatted?: string;
  cc_formatted?: string;
  community_formatted?: string;
  createdby_formatted?: string;
  createdon_formatted?: string;
  createdonbehalfby_formatted?: string;
  customers_formatted?: string;
  deliverylastattemptedon_formatted?: string;
  deliveryprioritycode_formatted?: string;
  from_formatted?: string;
  instancetypecode_formatted?: string;
  lastonholdtime_formatted?: string;
  modifiedby_formatted?: string;
  modifiedon_formatted?: string;
  modifiedonbehalfby_formatted?: string;
  msdyn_organizationalunitid_formatted?: string;
  optionalattendees_formatted?: string;
  organizer_formatted?: string;
  overriddencreatedon_formatted?: string;
  ownerid_formatted?: string;
  owningbusinessunit_formatted?: string;
  owningteam_formatted?: string;
  owninguser_formatted?: string;
  partners_formatted?: string;
  postponeactivityprocessinguntil_formatted?: string;
  prioritycode_formatted?: string;
  regardingobjectid_formatted?: string;
  requiredattendees_formatted?: string;
  resources_formatted?: string;
  scheduledend_formatted?: string;
  scheduledstart_formatted?: string;
  sendermailboxid_formatted?: string;
  senton_formatted?: string;
  serviceid_formatted?: string;
  siteid_formatted?: string;
  slaid_formatted?: string;
  slainvokedid_formatted?: string;
  sortdate_formatted?: string;
  statecode_formatted?: string;
  statuscode_formatted?: string;
  to_formatted?: string;
  transactioncurrencyid_formatted?: string;
}
interface ServiceAppointment_Result extends ServiceAppointment_Base, ServiceAppointment_Relationships {
  "@odata.etag": string;
  bcc_guid: string | null;
  cc_guid: string | null;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  customers_guid: string | null;
  from_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  msdyn_organizationalunitid_guid: string | null;
  optionalattendees_guid: string | null;
  organizer_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
  partners_guid: string | null;
  regardingobjectid_guid: string | null;
  requiredattendees_guid: string | null;
  resources_guid: string | null;
  sendermailboxid_guid: string | null;
  serviceid_guid: string | null;
  siteid_guid: string | null;
  slaid_guid: string | null;
  slainvokedid_guid: string | null;
  to_guid: string | null;
  transactioncurrencyid_guid: string | null;
}
interface ServiceAppointment_RelatedOne {
  createdby_serviceappointment: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby_serviceappointment: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby_serviceappointment: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby_serviceappointment: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid_serviceappointment: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  ownerid_serviceappointment1: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  owningteam_serviceappointment: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser_serviceappointment: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  regardingobjectid_account_serviceappointment: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
  regardingobjectid_bookableresourcebooking_serviceappointment: WebMappingRetrieve<BookableResourceBooking_Select,BookableResourceBooking_Expand,BookableResourceBooking_Filter,BookableResourceBooking_Fixed,BookableResourceBooking_Result,BookableResourceBooking_FormattedResult>;
  regardingobjectid_contact_serviceappointment: WebMappingRetrieve<Contact_Select,Contact_Expand,Contact_Filter,Contact_Fixed,Contact_Result,Contact_FormattedResult>;
  regardingobjectid_incident_serviceappointment: WebMappingRetrieve<Incident_Select,Incident_Expand,Incident_Filter,Incident_Fixed,Incident_Result,Incident_FormattedResult>;
  regardingobjectid_msdyn_customerasset_serviceappointment: WebMappingRetrieve<msdyn_customerasset_Select,msdyn_customerasset_Expand,msdyn_customerasset_Filter,msdyn_customerasset_Fixed,msdyn_customerasset_Result,msdyn_customerasset_FormattedResult>;
  regardingobjectid_msdyn_workorder_serviceappointment: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
  regardingobjectid_msdyn_workorderservicetask_serviceappointment: WebMappingRetrieve<msdyn_workorderservicetask_Select,msdyn_workorderservicetask_Expand,msdyn_workorderservicetask_Filter,msdyn_workorderservicetask_Fixed,msdyn_workorderservicetask_Result,msdyn_workorderservicetask_FormattedResult>;
  regardingobjectid_ovs_operation_serviceappointment: WebMappingRetrieve<ovs_operation_Select,ovs_operation_Expand,ovs_operation_Filter,ovs_operation_Fixed,ovs_operation_Result,ovs_operation_FormattedResult>;
  regardingobjectid_ts_securityincident_serviceappointment: WebMappingRetrieve<ts_securityincident_Select,ts_securityincident_Expand,ts_securityincident_Filter,ts_securityincident_Fixed,ts_securityincident_Result,ts_securityincident_FormattedResult>;
}
interface ServiceAppointment_RelatedMany {
  msdyn_serviceappointment_bookableresourcebooking_serviceappointment: WebMappingRetrieve<BookableResourceBooking_Select,BookableResourceBooking_Expand,BookableResourceBooking_Filter,BookableResourceBooking_Fixed,BookableResourceBooking_Result,BookableResourceBooking_FormattedResult>;
  serviceappointment_activity_parties: WebMappingRetrieve<ActivityParty_Select,ActivityParty_Expand,ActivityParty_Filter,ActivityParty_Fixed,ActivityParty_Result,ActivityParty_FormattedResult>;
  serviceappointment_connections1: WebMappingRetrieve<Connection_Select,Connection_Expand,Connection_Filter,Connection_Fixed,Connection_Result,Connection_FormattedResult>;
  serviceappointment_connections2: WebMappingRetrieve<Connection_Select,Connection_Expand,Connection_Filter,Connection_Fixed,Connection_Result,Connection_FormattedResult>;
}
interface WebEntitiesRetrieve {
  serviceappointments: WebMappingRetrieve<ServiceAppointment_Select,ServiceAppointment_Expand,ServiceAppointment_Filter,ServiceAppointment_Fixed,ServiceAppointment_Result,ServiceAppointment_FormattedResult>;
}
interface WebEntitiesRelated {
  serviceappointments: WebMappingRelated<ServiceAppointment_RelatedOne,ServiceAppointment_RelatedMany>;
}
interface WebEntitiesCUDA {
  serviceappointments: WebMappingCUDA<ServiceAppointment_Create,ServiceAppointment_Update,ServiceAppointment_Select>;
}
