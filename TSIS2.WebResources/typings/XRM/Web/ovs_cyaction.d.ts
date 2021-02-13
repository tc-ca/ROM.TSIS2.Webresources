interface ovs_CYAction_Base extends WebEntity {
  activityadditionalparams?: string | null;
  activityid?: string | null;
  activitytypecode?: string | null;
  actualdurationminutes?: number | null;
  actualend?: Date | null;
  actualstart?: Date | null;
  community?: socialprofile_community | null;
  createdon?: Date | null;
  deliverylastattemptedon?: Date | null;
  deliveryprioritycode?: activitypointer_deliveryprioritycode | null;
  description?: string | null;
  exchangeitemid?: string | null;
  exchangerate?: number | null;
  exchangeweblink?: string | null;
  importsequencenumber?: number | null;
  instancetypecode?: ovs_cyaction_instancetypecode | null;
  isbilled?: boolean | null;
  ismapiprivate?: boolean | null;
  isregularactivity?: boolean | null;
  isworkflowcreated?: boolean | null;
  lastonholdtime?: Date | null;
  leftvoicemail?: boolean | null;
  modifiedon?: Date | null;
  onholdtime?: number | null;
  overriddencreatedon?: Date | null;
  postponeactivityprocessinguntil?: Date | null;
  prioritycode?: ovs_cyaction_prioritycode | null;
  processid?: string | null;
  scheduleddurationminutes?: number | null;
  scheduledend?: Date | null;
  scheduledstart?: Date | null;
  senton?: Date | null;
  seriesid?: string | null;
  sortdate?: Date | null;
  stageid?: string | null;
  statecode?: ovs_cyaction_statecode | null;
  statuscode?: ovs_cyaction_statuscode | null;
  subject?: string | null;
  timezoneruleversionnumber?: number | null;
  traversedpath?: string | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ovs_CYAction_Relationships {
  createdby_ovs_cyaction?: SystemUser_Result | null;
  createdonbehalfby_ovs_cyaction?: SystemUser_Result | null;
  modifiedby_ovs_cyaction?: SystemUser_Result | null;
  modifiedonbehalfby_ovs_cyaction?: SystemUser_Result | null;
  ovs_CYAction_activity_parties?: ActivityParty_Result[] | null;
  ovs_cyaction_connections1?: Connection_Result[] | null;
  ovs_cyaction_connections2?: Connection_Result[] | null;
  ownerid_ovs_cyaction?: Team_Result | null;
  ownerid_ovs_cyaction1?: SystemUser_Result | null;
  owningteam_ovs_cyaction?: Team_Result | null;
  owninguser_ovs_cyaction?: SystemUser_Result | null;
  regardingobjectid_account_ovs_cyaction?: Account_Result | null;
  regardingobjectid_bookableresourcebooking_ovs_cyaction?: BookableResourceBooking_Result | null;
  regardingobjectid_contact_ovs_cyaction?: Contact_Result | null;
  regardingobjectid_incident_ovs_cyaction?: Incident_Result | null;
  regardingobjectid_msdyn_workorder_ovs_cyaction?: msdyn_workorder_Result | null;
  regardingobjectid_msdyn_workorderincident_ovs_cyaction?: msdyn_workorderincident_Result | null;
  regardingobjectid_msdyn_workorderservicetask_ovs_cyaction?: msdyn_workorderservicetask_Result | null;
  regardingobjectid_ovs_cysafetyassessment_ovs_cyaction?: ovs_CYSafetyAssessment_Result | null;
}
interface ovs_CYAction extends ovs_CYAction_Base, ovs_CYAction_Relationships {
  ownerid_ovs_cyaction_bind$systemusers?: string | null;
  ownerid_ovs_cyaction_bind$teams?: string | null;
  regardingobjectid_account_ovs_cyaction_bind$accounts?: string | null;
  regardingobjectid_bookableresourcebooking_ovs_cyaction_bind$bookableresourcebookings?: string | null;
  regardingobjectid_bookableresourcebookingheader_ovs_cyaction_bind$bookableresourcebookingheaders?: string | null;
  regardingobjectid_bulkoperation_ovs_cyaction_bind$bulkoperations?: string | null;
  regardingobjectid_campaign_ovs_cyaction_bind$campaigns?: string | null;
  regardingobjectid_campaignactivity_ovs_cyaction_bind$campaignactivities?: string | null;
  regardingobjectid_contact_ovs_cyaction_bind$contacts?: string | null;
  regardingobjectid_contract_ovs_cyaction_bind$contracts?: string | null;
  regardingobjectid_entitlement_ovs_cyaction_bind$entitlements?: string | null;
  regardingobjectid_entitlementtemplate_ovs_cyaction_bind$entitlementtemplates?: string | null;
  regardingobjectid_ikl_a2d_securitytemplate_ovs_cyaction_bind$ikl_a2d_securitytemplates?: string | null;
  regardingobjectid_ikl_bulkmigrationjob_ovs_cyaction_bind$ikl_bulkmigrationjobs?: string | null;
  regardingobjectid_ikl_bulkmigrationjobstatus_ovs_cyaction_bind$ikl_bulkmigrationjobstatuses?: string | null;
  regardingobjectid_ikl_inogiclicensedetails_ovs_cyaction_bind$ikl_inogiclicensedetailses?: string | null;
  regardingobjectid_incident_ovs_cyaction_bind$incidents?: string | null;
  regardingobjectid_invoice_ovs_cyaction_bind$invoices?: string | null;
  regardingobjectid_knowledgearticle_ovs_cyaction_bind$knowledgearticles?: string | null;
  regardingobjectid_knowledgebaserecord_ovs_cyaction_bind$knowledgebaserecords?: string | null;
  regardingobjectid_lead_ovs_cyaction_bind$leads?: string | null;
  regardingobjectid_msdyn_agreement_ovs_cyaction_bind$msdyn_agreements?: string | null;
  regardingobjectid_msdyn_agreementbookingdate_ovs_cyaction_bind$msdyn_agreementbookingdates?: string | null;
  regardingobjectid_msdyn_agreementbookingincident_ovs_cyaction_bind$msdyn_agreementbookingincidents?: string | null;
  regardingobjectid_msdyn_agreementbookingproduct_ovs_cyaction_bind$msdyn_agreementbookingproducts?: string | null;
  regardingobjectid_msdyn_agreementbookingservice_ovs_cyaction_bind$msdyn_agreementbookingservices?: string | null;
  regardingobjectid_msdyn_agreementbookingservicetask_ovs_cyaction_bind$msdyn_agreementbookingservicetasks?: string | null;
  regardingobjectid_msdyn_agreementbookingsetup_ovs_cyaction_bind$msdyn_agreementbookingsetups?: string | null;
  regardingobjectid_msdyn_agreementinvoicedate_ovs_cyaction_bind$msdyn_agreementinvoicedates?: string | null;
  regardingobjectid_msdyn_agreementinvoiceproduct_ovs_cyaction_bind$msdyn_agreementinvoiceproducts?: string | null;
  regardingobjectid_msdyn_agreementinvoicesetup_ovs_cyaction_bind$msdyn_agreementinvoicesetups?: string | null;
  regardingobjectid_msdyn_bookingalertstatus_ovs_cyaction_bind$msdyn_bookingalertstatuses?: string | null;
  regardingobjectid_msdyn_bookingrule_ovs_cyaction_bind$msdyn_bookingrules?: string | null;
  regardingobjectid_msdyn_bookingtimestamp_ovs_cyaction_bind$msdyn_bookingtimestamps?: string | null;
  regardingobjectid_msdyn_customerasset_ovs_cyaction_bind$msdyn_customerassets?: string | null;
  regardingobjectid_msdyn_fieldservicesetting_ovs_cyaction_bind$msdyn_fieldservicesettings?: string | null;
  regardingobjectid_msdyn_incidenttypecharacteristic_ovs_cyaction_bind$msdyn_incidenttypecharacteristics?: string | null;
  regardingobjectid_msdyn_incidenttypeproduct_ovs_cyaction_bind$msdyn_incidenttypeproducts?: string | null;
  regardingobjectid_msdyn_incidenttypeservice_ovs_cyaction_bind$msdyn_incidenttypeservices?: string | null;
  regardingobjectid_msdyn_inventoryadjustment_ovs_cyaction_bind$msdyn_inventoryadjustments?: string | null;
  regardingobjectid_msdyn_inventoryadjustmentproduct_ovs_cyaction_bind$msdyn_inventoryadjustmentproducts?: string | null;
  regardingobjectid_msdyn_inventoryjournal_ovs_cyaction_bind$msdyn_inventoryjournals?: string | null;
  regardingobjectid_msdyn_inventorytransfer_ovs_cyaction_bind$msdyn_inventorytransfers?: string | null;
  regardingobjectid_msdyn_payment_ovs_cyaction_bind$msdyn_payments?: string | null;
  regardingobjectid_msdyn_paymentdetail_ovs_cyaction_bind$msdyn_paymentdetailes?: string | null;
  regardingobjectid_msdyn_paymentmethod_ovs_cyaction_bind$msdyn_paymentmethods?: string | null;
  regardingobjectid_msdyn_paymentterm_ovs_cyaction_bind$msdyn_paymentterms?: string | null;
  regardingobjectid_msdyn_playbookinstance_ovs_cyaction_bind$msdyn_playbookinstances?: string | null;
  regardingobjectid_msdyn_postalbum_ovs_cyaction_bind$msdyn_postalbums?: string | null;
  regardingobjectid_msdyn_postalcode_ovs_cyaction_bind$msdyn_postalcodes?: string | null;
  regardingobjectid_msdyn_productinventory_ovs_cyaction_bind$msdyn_productinventories?: string | null;
  regardingobjectid_msdyn_purchaseorder_ovs_cyaction_bind$msdyn_purchaseorders?: string | null;
  regardingobjectid_msdyn_purchaseorderbill_ovs_cyaction_bind$msdyn_purchaseorderbills?: string | null;
  regardingobjectid_msdyn_purchaseorderproduct_ovs_cyaction_bind$msdyn_purchaseorderproducts?: string | null;
  regardingobjectid_msdyn_purchaseorderreceipt_ovs_cyaction_bind$msdyn_purchaseorderreceipts?: string | null;
  regardingobjectid_msdyn_purchaseorderreceiptproduct_ovs_cyaction_bind$msdyn_purchaseorderreceiptproducts?: string | null;
  regardingobjectid_msdyn_purchaseordersubstatus_ovs_cyaction_bind$msdyn_purchaseordersubstatuses?: string | null;
  regardingobjectid_msdyn_quotebookingincident_ovs_cyaction_bind$msdyn_quotebookingincidents?: string | null;
  regardingobjectid_msdyn_quotebookingproduct_ovs_cyaction_bind$msdyn_quotebookingproducts?: string | null;
  regardingobjectid_msdyn_quotebookingservice_ovs_cyaction_bind$msdyn_quotebookingservices?: string | null;
  regardingobjectid_msdyn_quotebookingservicetask_ovs_cyaction_bind$msdyn_quotebookingservicetasks?: string | null;
  regardingobjectid_msdyn_resourceterritory_ovs_cyaction_bind$msdyn_resourceterritories?: string | null;
  regardingobjectid_msdyn_rma_ovs_cyaction_bind$msdyn_rmas?: string | null;
  regardingobjectid_msdyn_rmaproduct_ovs_cyaction_bind$msdyn_rmaproducts?: string | null;
  regardingobjectid_msdyn_rmareceipt_ovs_cyaction_bind$msdyn_rmareceipts?: string | null;
  regardingobjectid_msdyn_rmareceiptproduct_ovs_cyaction_bind$msdyn_rmareceiptproducts?: string | null;
  regardingobjectid_msdyn_rmasubstatus_ovs_cyaction_bind$msdyn_rmasubstatuses?: string | null;
  regardingobjectid_msdyn_rtv_ovs_cyaction_bind$msdyn_rtvs?: string | null;
  regardingobjectid_msdyn_rtvproduct_ovs_cyaction_bind$msdyn_rtvproducts?: string | null;
  regardingobjectid_msdyn_rtvsubstatus_ovs_cyaction_bind$msdyn_rtvsubstatuses?: string | null;
  regardingobjectid_msdyn_shipvia_ovs_cyaction_bind$msdyn_shipvias?: string | null;
  regardingobjectid_msdyn_systemuserschedulersetting_ovs_cyaction_bind$msdyn_systemuserschedulersettinges?: string | null;
  regardingobjectid_msdyn_timegroup_ovs_cyaction_bind$msdyn_timegroups?: string | null;
  regardingobjectid_msdyn_timegroupdetail_ovs_cyaction_bind$msdyn_timegroupdetails?: string | null;
  regardingobjectid_msdyn_timeoffrequest_ovs_cyaction_bind$msdyn_timeoffrequests?: string | null;
  regardingobjectid_msdyn_warehouse_ovs_cyaction_bind$msdyn_warehouses?: string | null;
  regardingobjectid_msdyn_workorder_ovs_cyaction_bind$msdyn_workorders?: string | null;
  regardingobjectid_msdyn_workordercharacteristic_ovs_cyaction_bind$msdyn_workordercharacteristics?: string | null;
  regardingobjectid_msdyn_workorderincident_ovs_cyaction_bind$msdyn_workorderincidents?: string | null;
  regardingobjectid_msdyn_workorderproduct_ovs_cyaction_bind$msdyn_workorderproducts?: string | null;
  regardingobjectid_msdyn_workorderresourcerestriction_ovs_cyaction_bind$msdyn_workorderresourcerestrictions?: string | null;
  regardingobjectid_msdyn_workorderservice_ovs_cyaction_bind$msdyn_workorderservices?: string | null;
  regardingobjectid_msdyn_workorderservicetask_ovs_cyaction_bind$msdyn_workorderservicetasks?: string | null;
  regardingobjectid_new_interactionforemail_ovs_cyaction_bind$interactionforemails?: string | null;
  regardingobjectid_opportunity_ovs_cyaction_bind$opportunities?: string | null;
  regardingobjectid_ovs_cysafetyassessment_ovs_cyaction_bind$ovs_cysafetyassessments?: string | null;
  regardingobjectid_ppp_traveller_ovs_cyaction_bind$ppp_travellers?: string | null;
  regardingobjectid_quote_ovs_cyaction_bind$quotes?: string | null;
  regardingobjectid_salesorder_ovs_cyaction_bind$salesorders?: string | null;
  regardingobjectid_site_ovs_cyaction_bind$sites?: string | null;
  serviceid_ovs_cyaction_bind$services?: string | null;
  sla_activitypointer_sla_ovs_cyaction_bind$slas?: string | null;
  transactioncurrencyid_ovs_cyaction_bind$transactioncurrencies?: string | null;
}
interface ovs_CYAction_Create extends ovs_CYAction {
  activityid_ovs_cyaction_bind$activitypointers?: string | null;
}
interface ovs_CYAction_Update extends ovs_CYAction {
}
interface ovs_CYAction_Select {
  activityadditionalparams: WebAttribute<ovs_CYAction_Select, { activityadditionalparams: string | null }, {  }>;
  activityid: WebAttribute<ovs_CYAction_Select, { activityid: string | null }, {  }>;
  activitytypecode: WebAttribute<ovs_CYAction_Select, { activitytypecode: string | null }, {  }>;
  actualdurationminutes: WebAttribute<ovs_CYAction_Select, { actualdurationminutes: number | null }, {  }>;
  actualend: WebAttribute<ovs_CYAction_Select, { actualend: Date | null }, { actualend_formatted?: string }>;
  actualstart: WebAttribute<ovs_CYAction_Select, { actualstart: Date | null }, { actualstart_formatted?: string }>;
  bcc_guid: WebAttribute<ovs_CYAction_Select, { bcc_guid: string | null }, { bcc_formatted?: string }>;
  cc_guid: WebAttribute<ovs_CYAction_Select, { cc_guid: string | null }, { cc_formatted?: string }>;
  community: WebAttribute<ovs_CYAction_Select, { community: socialprofile_community | null }, { community_formatted?: string }>;
  createdby_guid: WebAttribute<ovs_CYAction_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ovs_CYAction_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ovs_CYAction_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  customers_guid: WebAttribute<ovs_CYAction_Select, { customers_guid: string | null }, { customers_formatted?: string }>;
  deliverylastattemptedon: WebAttribute<ovs_CYAction_Select, { deliverylastattemptedon: Date | null }, { deliverylastattemptedon_formatted?: string }>;
  deliveryprioritycode: WebAttribute<ovs_CYAction_Select, { deliveryprioritycode: activitypointer_deliveryprioritycode | null }, { deliveryprioritycode_formatted?: string }>;
  description: WebAttribute<ovs_CYAction_Select, { description: string | null }, {  }>;
  exchangeitemid: WebAttribute<ovs_CYAction_Select, { exchangeitemid: string | null }, {  }>;
  exchangerate: WebAttribute<ovs_CYAction_Select, { exchangerate: number | null }, {  }>;
  exchangeweblink: WebAttribute<ovs_CYAction_Select, { exchangeweblink: string | null }, {  }>;
  from_guid: WebAttribute<ovs_CYAction_Select, { from_guid: string | null }, { from_formatted?: string }>;
  importsequencenumber: WebAttribute<ovs_CYAction_Select, { importsequencenumber: number | null }, {  }>;
  instancetypecode: WebAttribute<ovs_CYAction_Select, { instancetypecode: ovs_cyaction_instancetypecode | null }, { instancetypecode_formatted?: string }>;
  isbilled: WebAttribute<ovs_CYAction_Select, { isbilled: boolean | null }, {  }>;
  ismapiprivate: WebAttribute<ovs_CYAction_Select, { ismapiprivate: boolean | null }, {  }>;
  isregularactivity: WebAttribute<ovs_CYAction_Select, { isregularactivity: boolean | null }, {  }>;
  isworkflowcreated: WebAttribute<ovs_CYAction_Select, { isworkflowcreated: boolean | null }, {  }>;
  lastonholdtime: WebAttribute<ovs_CYAction_Select, { lastonholdtime: Date | null }, { lastonholdtime_formatted?: string }>;
  leftvoicemail: WebAttribute<ovs_CYAction_Select, { leftvoicemail: boolean | null }, {  }>;
  modifiedby_guid: WebAttribute<ovs_CYAction_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ovs_CYAction_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ovs_CYAction_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  onholdtime: WebAttribute<ovs_CYAction_Select, { onholdtime: number | null }, {  }>;
  optionalattendees_guid: WebAttribute<ovs_CYAction_Select, { optionalattendees_guid: string | null }, { optionalattendees_formatted?: string }>;
  organizer_guid: WebAttribute<ovs_CYAction_Select, { organizer_guid: string | null }, { organizer_formatted?: string }>;
  overriddencreatedon: WebAttribute<ovs_CYAction_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ovs_CYAction_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ovs_CYAction_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ovs_CYAction_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ovs_CYAction_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  partners_guid: WebAttribute<ovs_CYAction_Select, { partners_guid: string | null }, { partners_formatted?: string }>;
  postponeactivityprocessinguntil: WebAttribute<ovs_CYAction_Select, { postponeactivityprocessinguntil: Date | null }, { postponeactivityprocessinguntil_formatted?: string }>;
  prioritycode: WebAttribute<ovs_CYAction_Select, { prioritycode: ovs_cyaction_prioritycode | null }, { prioritycode_formatted?: string }>;
  processid: WebAttribute<ovs_CYAction_Select, { processid: string | null }, {  }>;
  regardingobjectid_guid: WebAttribute<ovs_CYAction_Select, { regardingobjectid_guid: string | null }, { regardingobjectid_formatted?: string }>;
  requiredattendees_guid: WebAttribute<ovs_CYAction_Select, { requiredattendees_guid: string | null }, { requiredattendees_formatted?: string }>;
  resources_guid: WebAttribute<ovs_CYAction_Select, { resources_guid: string | null }, { resources_formatted?: string }>;
  scheduleddurationminutes: WebAttribute<ovs_CYAction_Select, { scheduleddurationminutes: number | null }, {  }>;
  scheduledend: WebAttribute<ovs_CYAction_Select, { scheduledend: Date | null }, { scheduledend_formatted?: string }>;
  scheduledstart: WebAttribute<ovs_CYAction_Select, { scheduledstart: Date | null }, { scheduledstart_formatted?: string }>;
  sendermailboxid_guid: WebAttribute<ovs_CYAction_Select, { sendermailboxid_guid: string | null }, { sendermailboxid_formatted?: string }>;
  senton: WebAttribute<ovs_CYAction_Select, { senton: Date | null }, { senton_formatted?: string }>;
  seriesid: WebAttribute<ovs_CYAction_Select, { seriesid: string | null }, {  }>;
  serviceid_guid: WebAttribute<ovs_CYAction_Select, { serviceid_guid: string | null }, { serviceid_formatted?: string }>;
  slaid_guid: WebAttribute<ovs_CYAction_Select, { slaid_guid: string | null }, { slaid_formatted?: string }>;
  slainvokedid_guid: WebAttribute<ovs_CYAction_Select, { slainvokedid_guid: string | null }, { slainvokedid_formatted?: string }>;
  sortdate: WebAttribute<ovs_CYAction_Select, { sortdate: Date | null }, { sortdate_formatted?: string }>;
  stageid: WebAttribute<ovs_CYAction_Select, { stageid: string | null }, {  }>;
  statecode: WebAttribute<ovs_CYAction_Select, { statecode: ovs_cyaction_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ovs_CYAction_Select, { statuscode: ovs_cyaction_statuscode | null }, { statuscode_formatted?: string }>;
  subject: WebAttribute<ovs_CYAction_Select, { subject: string | null }, {  }>;
  timezoneruleversionnumber: WebAttribute<ovs_CYAction_Select, { timezoneruleversionnumber: number | null }, {  }>;
  to_guid: WebAttribute<ovs_CYAction_Select, { to_guid: string | null }, { to_formatted?: string }>;
  transactioncurrencyid_guid: WebAttribute<ovs_CYAction_Select, { transactioncurrencyid_guid: string | null }, { transactioncurrencyid_formatted?: string }>;
  traversedpath: WebAttribute<ovs_CYAction_Select, { traversedpath: string | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<ovs_CYAction_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ovs_CYAction_Select, { versionnumber: number | null }, {  }>;
}
interface ovs_CYAction_Filter {
  activityadditionalparams: string;
  activityid: XQW.Guid;
  activitytypecode: string;
  actualdurationminutes: number;
  actualend: Date;
  actualstart: Date;
  bcc_guid: XQW.Guid;
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
  instancetypecode: ovs_cyaction_instancetypecode;
  isbilled: boolean;
  ismapiprivate: boolean;
  isregularactivity: boolean;
  isworkflowcreated: boolean;
  lastonholdtime: Date;
  leftvoicemail: boolean;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
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
  prioritycode: ovs_cyaction_prioritycode;
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
  slaid_guid: XQW.Guid;
  slainvokedid_guid: XQW.Guid;
  sortdate: Date;
  stageid: XQW.Guid;
  statecode: ovs_cyaction_statecode;
  statuscode: ovs_cyaction_statuscode;
  subject: string;
  timezoneruleversionnumber: number;
  to_guid: XQW.Guid;
  transactioncurrencyid_guid: XQW.Guid;
  traversedpath: string;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ovs_CYAction_Expand {
  createdby_ovs_cyaction: WebExpand<ovs_CYAction_Expand, SystemUser_Select, SystemUser_Filter, { createdby_ovs_cyaction: SystemUser_Result }>;
  createdonbehalfby_ovs_cyaction: WebExpand<ovs_CYAction_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby_ovs_cyaction: SystemUser_Result }>;
  modifiedby_ovs_cyaction: WebExpand<ovs_CYAction_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby_ovs_cyaction: SystemUser_Result }>;
  modifiedonbehalfby_ovs_cyaction: WebExpand<ovs_CYAction_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby_ovs_cyaction: SystemUser_Result }>;
  ovs_CYAction_activity_parties: WebExpand<ovs_CYAction_Expand, ActivityParty_Select, ActivityParty_Filter, { ovs_CYAction_activity_parties: ActivityParty_Result[] }>;
  ovs_cyaction_connections1: WebExpand<ovs_CYAction_Expand, Connection_Select, Connection_Filter, { ovs_cyaction_connections1: Connection_Result[] }>;
  ovs_cyaction_connections2: WebExpand<ovs_CYAction_Expand, Connection_Select, Connection_Filter, { ovs_cyaction_connections2: Connection_Result[] }>;
  ownerid_ovs_cyaction: WebExpand<ovs_CYAction_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid_ovs_cyaction: SystemUser_Result } & { ownerid_ovs_cyaction: Team_Result }>;
  owningteam_ovs_cyaction: WebExpand<ovs_CYAction_Expand, Team_Select, Team_Filter, { owningteam_ovs_cyaction: Team_Result }>;
  owninguser_ovs_cyaction: WebExpand<ovs_CYAction_Expand, SystemUser_Select, SystemUser_Filter, { owninguser_ovs_cyaction: SystemUser_Result }>;
  regardingobjectid_account_ovs_cyaction: WebExpand<ovs_CYAction_Expand, Account_Select, Account_Filter, { regardingobjectid_account_ovs_cyaction: Account_Result }>;
  regardingobjectid_bookableresourcebooking_ovs_cyaction: WebExpand<ovs_CYAction_Expand, BookableResourceBooking_Select, BookableResourceBooking_Filter, { regardingobjectid_bookableresourcebooking_ovs_cyaction: BookableResourceBooking_Result }>;
  regardingobjectid_contact_ovs_cyaction: WebExpand<ovs_CYAction_Expand, Contact_Select, Contact_Filter, { regardingobjectid_contact_ovs_cyaction: Contact_Result }>;
  regardingobjectid_incident_ovs_cyaction: WebExpand<ovs_CYAction_Expand, Incident_Select, Incident_Filter, { regardingobjectid_incident_ovs_cyaction: Incident_Result }>;
  regardingobjectid_msdyn_workorder_ovs_cyaction: WebExpand<ovs_CYAction_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { regardingobjectid_msdyn_workorder_ovs_cyaction: msdyn_workorder_Result }>;
  regardingobjectid_msdyn_workorderincident_ovs_cyaction: WebExpand<ovs_CYAction_Expand, msdyn_workorderincident_Select, msdyn_workorderincident_Filter, { regardingobjectid_msdyn_workorderincident_ovs_cyaction: msdyn_workorderincident_Result }>;
  regardingobjectid_msdyn_workorderservicetask_ovs_cyaction: WebExpand<ovs_CYAction_Expand, msdyn_workorderservicetask_Select, msdyn_workorderservicetask_Filter, { regardingobjectid_msdyn_workorderservicetask_ovs_cyaction: msdyn_workorderservicetask_Result }>;
  regardingobjectid_ovs_cysafetyassessment_ovs_cyaction: WebExpand<ovs_CYAction_Expand, ovs_CYSafetyAssessment_Select, ovs_CYSafetyAssessment_Filter, { regardingobjectid_ovs_cysafetyassessment_ovs_cyaction: ovs_CYSafetyAssessment_Result }>;
}
interface ovs_CYAction_FormattedResult {
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
  slaid_formatted?: string;
  slainvokedid_formatted?: string;
  sortdate_formatted?: string;
  statecode_formatted?: string;
  statuscode_formatted?: string;
  to_formatted?: string;
  transactioncurrencyid_formatted?: string;
}
interface ovs_CYAction_Result extends ovs_CYAction_Base, ovs_CYAction_Relationships {
  "@odata.etag": string;
  bcc_guid: string | null;
  cc_guid: string | null;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  customers_guid: string | null;
  from_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
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
  slaid_guid: string | null;
  slainvokedid_guid: string | null;
  to_guid: string | null;
  transactioncurrencyid_guid: string | null;
}
interface ovs_CYAction_RelatedOne {
  createdby_ovs_cyaction: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby_ovs_cyaction: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby_ovs_cyaction: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby_ovs_cyaction: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid_ovs_cyaction: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  ownerid_ovs_cyaction1: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  owningteam_ovs_cyaction: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser_ovs_cyaction: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  regardingobjectid_account_ovs_cyaction: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
  regardingobjectid_bookableresourcebooking_ovs_cyaction: WebMappingRetrieve<BookableResourceBooking_Select,BookableResourceBooking_Expand,BookableResourceBooking_Filter,BookableResourceBooking_Fixed,BookableResourceBooking_Result,BookableResourceBooking_FormattedResult>;
  regardingobjectid_contact_ovs_cyaction: WebMappingRetrieve<Contact_Select,Contact_Expand,Contact_Filter,Contact_Fixed,Contact_Result,Contact_FormattedResult>;
  regardingobjectid_incident_ovs_cyaction: WebMappingRetrieve<Incident_Select,Incident_Expand,Incident_Filter,Incident_Fixed,Incident_Result,Incident_FormattedResult>;
  regardingobjectid_msdyn_workorder_ovs_cyaction: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
  regardingobjectid_msdyn_workorderincident_ovs_cyaction: WebMappingRetrieve<msdyn_workorderincident_Select,msdyn_workorderincident_Expand,msdyn_workorderincident_Filter,msdyn_workorderincident_Fixed,msdyn_workorderincident_Result,msdyn_workorderincident_FormattedResult>;
  regardingobjectid_msdyn_workorderservicetask_ovs_cyaction: WebMappingRetrieve<msdyn_workorderservicetask_Select,msdyn_workorderservicetask_Expand,msdyn_workorderservicetask_Filter,msdyn_workorderservicetask_Fixed,msdyn_workorderservicetask_Result,msdyn_workorderservicetask_FormattedResult>;
  regardingobjectid_ovs_cysafetyassessment_ovs_cyaction: WebMappingRetrieve<ovs_CYSafetyAssessment_Select,ovs_CYSafetyAssessment_Expand,ovs_CYSafetyAssessment_Filter,ovs_CYSafetyAssessment_Fixed,ovs_CYSafetyAssessment_Result,ovs_CYSafetyAssessment_FormattedResult>;
}
interface ovs_CYAction_RelatedMany {
  ovs_CYAction_activity_parties: WebMappingRetrieve<ActivityParty_Select,ActivityParty_Expand,ActivityParty_Filter,ActivityParty_Fixed,ActivityParty_Result,ActivityParty_FormattedResult>;
  ovs_cyaction_connections1: WebMappingRetrieve<Connection_Select,Connection_Expand,Connection_Filter,Connection_Fixed,Connection_Result,Connection_FormattedResult>;
  ovs_cyaction_connections2: WebMappingRetrieve<Connection_Select,Connection_Expand,Connection_Filter,Connection_Fixed,Connection_Result,Connection_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ovs_cyactions: WebMappingRetrieve<ovs_CYAction_Select,ovs_CYAction_Expand,ovs_CYAction_Filter,ovs_CYAction_Fixed,ovs_CYAction_Result,ovs_CYAction_FormattedResult>;
}
interface WebEntitiesRelated {
  ovs_cyactions: WebMappingRelated<ovs_CYAction_RelatedOne,ovs_CYAction_RelatedMany>;
}
interface WebEntitiesCUDA {
  ovs_cyactions: WebMappingCUDA<ovs_CYAction_Create,ovs_CYAction_Update,ovs_CYAction_Select>;
}
