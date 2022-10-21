interface ts_enforcementaction_Base extends WebEntity {
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
  instancetypecode?: ts_enforcementaction_instancetypecode | null;
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
  prioritycode?: ts_enforcementaction_prioritycode | null;
  processid?: string | null;
  scheduleddurationminutes?: number | null;
  scheduledend?: Date | null;
  scheduledstart?: Date | null;
  senton?: Date | null;
  seriesid?: string | null;
  sortdate?: Date | null;
  stageid?: string | null;
  statecode?: ts_enforcementaction_statecode | null;
  statuscode?: ts_enforcementaction_statuscode | null;
  subject?: string | null;
  timezoneruleversionnumber?: number | null;
  traversedpath?: string | null;
  ts_comments?: string | null;
  ts_copyofreceipt?: string | null;
  ts_dateandtimeofserviceofenforcementaction?: Date | null;
  ts_individualposition?: string | null;
  ts_typeofenforcementaction?: ts_type | null;
  ts_verbalwarningdeliverylocation?: ts_verbalwarningdeliverylocation | null;
  ts_writtenwarningdeliverymethod?: ts_writtenwarningdeliverymethod | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_enforcementaction_Relationships {
  createdby_ts_enforcementaction?: SystemUser_Result | null;
  createdonbehalfby_ts_enforcementaction?: SystemUser_Result | null;
  modifiedby_ts_enforcementaction?: SystemUser_Result | null;
  modifiedonbehalfby_ts_enforcementaction?: SystemUser_Result | null;
  ownerid_ts_enforcementaction?: Team_Result | null;
  ownerid_ts_enforcementaction1?: SystemUser_Result | null;
  owningteam_ts_enforcementaction?: Team_Result | null;
  owninguser_ts_enforcementaction?: SystemUser_Result | null;
  regardingobjectid_account_ts_enforcementaction?: Account_Result | null;
  regardingobjectid_bookableresourcebooking_ts_enforcementaction?: BookableResourceBooking_Result | null;
  regardingobjectid_contact_ts_enforcementaction?: Contact_Result | null;
  regardingobjectid_incident_ts_enforcementaction?: Incident_Result | null;
  regardingobjectid_msdyn_customerasset_ts_enforcementaction?: msdyn_customerasset_Result | null;
  regardingobjectid_msdyn_workorder_ts_enforcementaction?: msdyn_workorder_Result | null;
  regardingobjectid_msdyn_workorderservicetask_ts_enforcementaction?: msdyn_workorderservicetask_Result | null;
  regardingobjectid_ovs_operation_ts_enforcementaction?: ovs_operation_Result | null;
  ts_Incident_ts_enforcementaction?: Incident_Result | null;
  ts_Individualcompany_ts_enforcementaction?: Account_Result | null;
  ts_Verbalwarninggivento_ts_enforcementaction?: Contact_Result | null;
  ts_Writtenwarningsentto_ts_enforcementaction?: Contact_Result | null;
  ts_enforcementaction_activity_parties?: ActivityParty_Result[] | null;
  ts_enforcementaction_connections1?: Connection_Result[] | null;
  ts_enforcementaction_connections2?: Connection_Result[] | null;
  ts_enforcementaction_ts_enforcementaction?: ovs_Finding_Result[] | null;
}
interface ts_enforcementaction extends ts_enforcementaction_Base, ts_enforcementaction_Relationships {
  ownerid_ts_enforcementaction_bind$systemusers?: string | null;
  ownerid_ts_enforcementaction_bind$teams?: string | null;
  regardingobjectid_account_ts_enforcementaction_bind$accounts?: string | null;
  regardingobjectid_bookableresourcebooking_ts_enforcementaction_bind$bookableresourcebookings?: string | null;
  regardingobjectid_bookableresourcebookingheader_ts_enforcementaction_bind$bookableresourcebookingheaders?: string | null;
  regardingobjectid_bulkoperation_ts_enforcementaction_bind$bulkoperations?: string | null;
  regardingobjectid_campaign_ts_enforcementaction_bind$campaigns?: string | null;
  regardingobjectid_campaignactivity_ts_enforcementaction_bind$campaignactivities?: string | null;
  regardingobjectid_contact_ts_enforcementaction_bind$contacts?: string | null;
  regardingobjectid_contract_ts_enforcementaction_bind$contracts?: string | null;
  regardingobjectid_entitlement_ts_enforcementaction_bind$entitlements?: string | null;
  regardingobjectid_entitlementtemplate_ts_enforcementaction_bind$entitlementtemplates?: string | null;
  regardingobjectid_ikl_a2d_securitytemplate_ts_enforcementaction_bind$ikl_a2d_securitytemplates?: string | null;
  regardingobjectid_ikl_bulkmigrationjob_ts_enforcementaction_bind$ikl_bulkmigrationjobs?: string | null;
  regardingobjectid_ikl_bulkmigrationjobstatus_ts_enforcementaction_bind$ikl_bulkmigrationjobstatuses?: string | null;
  regardingobjectid_ikl_inogiclicensedetails_ts_enforcementaction_bind$ikl_inogiclicensedetailses?: string | null;
  regardingobjectid_incident_ts_enforcementaction_bind$incidents?: string | null;
  regardingobjectid_invoice_ts_enforcementaction_bind$invoices?: string | null;
  regardingobjectid_knowledgearticle_ts_enforcementaction_bind$knowledgearticles?: string | null;
  regardingobjectid_knowledgebaserecord_ts_enforcementaction_bind$knowledgebaserecords?: string | null;
  regardingobjectid_lead_ts_enforcementaction_bind$leads?: string | null;
  regardingobjectid_msdyn_agreement_ts_enforcementaction_bind$msdyn_agreements?: string | null;
  regardingobjectid_msdyn_agreementbookingdate_ts_enforcementaction_bind$msdyn_agreementbookingdates?: string | null;
  regardingobjectid_msdyn_agreementbookingincident_ts_enforcementaction_bind$msdyn_agreementbookingincidents?: string | null;
  regardingobjectid_msdyn_agreementbookingproduct_ts_enforcementaction_bind$msdyn_agreementbookingproducts?: string | null;
  regardingobjectid_msdyn_agreementbookingservice_ts_enforcementaction_bind$msdyn_agreementbookingservices?: string | null;
  regardingobjectid_msdyn_agreementbookingservicetask_ts_enforcementaction_bind$msdyn_agreementbookingservicetasks?: string | null;
  regardingobjectid_msdyn_agreementbookingsetup_ts_enforcementaction_bind$msdyn_agreementbookingsetups?: string | null;
  regardingobjectid_msdyn_agreementinvoicedate_ts_enforcementaction_bind$msdyn_agreementinvoicedates?: string | null;
  regardingobjectid_msdyn_agreementinvoiceproduct_ts_enforcementaction_bind$msdyn_agreementinvoiceproducts?: string | null;
  regardingobjectid_msdyn_agreementinvoicesetup_ts_enforcementaction_bind$msdyn_agreementinvoicesetups?: string | null;
  regardingobjectid_msdyn_bookingalertstatus_ts_enforcementaction_bind$msdyn_bookingalertstatuses?: string | null;
  regardingobjectid_msdyn_bookingrule_ts_enforcementaction_bind$msdyn_bookingrules?: string | null;
  regardingobjectid_msdyn_bookingtimestamp_ts_enforcementaction_bind$msdyn_bookingtimestamps?: string | null;
  regardingobjectid_msdyn_customerasset_ts_enforcementaction_bind$msdyn_customerassets?: string | null;
  regardingobjectid_msdyn_fieldservicesetting_ts_enforcementaction_bind$msdyn_fieldservicesettings?: string | null;
  regardingobjectid_msdyn_incidenttypecharacteristic_ts_enforcementaction_bind$msdyn_incidenttypecharacteristics?: string | null;
  regardingobjectid_msdyn_incidenttypeproduct_ts_enforcementaction_bind$msdyn_incidenttypeproducts?: string | null;
  regardingobjectid_msdyn_incidenttypeservice_ts_enforcementaction_bind$msdyn_incidenttypeservices?: string | null;
  regardingobjectid_msdyn_inventoryadjustment_ts_enforcementaction_bind$msdyn_inventoryadjustments?: string | null;
  regardingobjectid_msdyn_inventoryadjustmentproduct_ts_enforcementaction_bind$msdyn_inventoryadjustmentproducts?: string | null;
  regardingobjectid_msdyn_inventoryjournal_ts_enforcementaction_bind$msdyn_inventoryjournals?: string | null;
  regardingobjectid_msdyn_inventorytransfer_ts_enforcementaction_bind$msdyn_inventorytransfers?: string | null;
  regardingobjectid_msdyn_payment_ts_enforcementaction_bind$msdyn_payments?: string | null;
  regardingobjectid_msdyn_paymentdetail_ts_enforcementaction_bind$msdyn_paymentdetailes?: string | null;
  regardingobjectid_msdyn_paymentmethod_ts_enforcementaction_bind$msdyn_paymentmethods?: string | null;
  regardingobjectid_msdyn_paymentterm_ts_enforcementaction_bind$msdyn_paymentterms?: string | null;
  regardingobjectid_msdyn_playbookinstance_ts_enforcementaction_bind$msdyn_playbookinstances?: string | null;
  regardingobjectid_msdyn_postalbum_ts_enforcementaction_bind$msdyn_postalbums?: string | null;
  regardingobjectid_msdyn_postalcode_ts_enforcementaction_bind$msdyn_postalcodes?: string | null;
  regardingobjectid_msdyn_productinventory_ts_enforcementaction_bind$msdyn_productinventories?: string | null;
  regardingobjectid_msdyn_purchaseorder_ts_enforcementaction_bind$msdyn_purchaseorders?: string | null;
  regardingobjectid_msdyn_purchaseorderbill_ts_enforcementaction_bind$msdyn_purchaseorderbills?: string | null;
  regardingobjectid_msdyn_purchaseorderproduct_ts_enforcementaction_bind$msdyn_purchaseorderproducts?: string | null;
  regardingobjectid_msdyn_purchaseorderreceipt_ts_enforcementaction_bind$msdyn_purchaseorderreceipts?: string | null;
  regardingobjectid_msdyn_purchaseorderreceiptproduct_ts_enforcementaction_bind$msdyn_purchaseorderreceiptproducts?: string | null;
  regardingobjectid_msdyn_purchaseordersubstatus_ts_enforcementaction_bind$msdyn_purchaseordersubstatuses?: string | null;
  regardingobjectid_msdyn_quotebookingincident_ts_enforcementaction_bind$msdyn_quotebookingincidents?: string | null;
  regardingobjectid_msdyn_quotebookingproduct_ts_enforcementaction_bind$msdyn_quotebookingproducts?: string | null;
  regardingobjectid_msdyn_quotebookingservice_ts_enforcementaction_bind$msdyn_quotebookingservices?: string | null;
  regardingobjectid_msdyn_quotebookingservicetask_ts_enforcementaction_bind$msdyn_quotebookingservicetasks?: string | null;
  regardingobjectid_msdyn_resourceterritory_ts_enforcementaction_bind$msdyn_resourceterritories?: string | null;
  regardingobjectid_msdyn_rma_ts_enforcementaction_bind$msdyn_rmas?: string | null;
  regardingobjectid_msdyn_rmaproduct_ts_enforcementaction_bind$msdyn_rmaproducts?: string | null;
  regardingobjectid_msdyn_rmareceipt_ts_enforcementaction_bind$msdyn_rmareceipts?: string | null;
  regardingobjectid_msdyn_rmareceiptproduct_ts_enforcementaction_bind$msdyn_rmareceiptproducts?: string | null;
  regardingobjectid_msdyn_rmasubstatus_ts_enforcementaction_bind$msdyn_rmasubstatuses?: string | null;
  regardingobjectid_msdyn_rtv_ts_enforcementaction_bind$msdyn_rtvs?: string | null;
  regardingobjectid_msdyn_rtvproduct_ts_enforcementaction_bind$msdyn_rtvproducts?: string | null;
  regardingobjectid_msdyn_rtvsubstatus_ts_enforcementaction_bind$msdyn_rtvsubstatuses?: string | null;
  regardingobjectid_msdyn_salessuggestion_ts_enforcementaction_bind$msdyn_salessuggestions?: string | null;
  regardingobjectid_msdyn_shipvia_ts_enforcementaction_bind$msdyn_shipvias?: string | null;
  regardingobjectid_msdyn_swarm_ts_enforcementaction_bind$msdyn_swarms?: string | null;
  regardingobjectid_msdyn_systemuserschedulersetting_ts_enforcementaction_bind$msdyn_systemuserschedulersettinges?: string | null;
  regardingobjectid_msdyn_timegroup_ts_enforcementaction_bind$msdyn_timegroups?: string | null;
  regardingobjectid_msdyn_timegroupdetail_ts_enforcementaction_bind$msdyn_timegroupdetails?: string | null;
  regardingobjectid_msdyn_timeoffrequest_ts_enforcementaction_bind$msdyn_timeoffrequests?: string | null;
  regardingobjectid_msdyn_warehouse_ts_enforcementaction_bind$msdyn_warehouses?: string | null;
  regardingobjectid_msdyn_workorder_ts_enforcementaction_bind$msdyn_workorders?: string | null;
  regardingobjectid_msdyn_workordercharacteristic_ts_enforcementaction_bind$msdyn_workordercharacteristics?: string | null;
  regardingobjectid_msdyn_workorderincident_ts_enforcementaction_bind$msdyn_workorderincidents?: string | null;
  regardingobjectid_msdyn_workorderproduct_ts_enforcementaction_bind$msdyn_workorderproducts?: string | null;
  regardingobjectid_msdyn_workorderresourcerestriction_ts_enforcementaction_bind$msdyn_workorderresourcerestrictions?: string | null;
  regardingobjectid_msdyn_workorderservice_ts_enforcementaction_bind$msdyn_workorderservices?: string | null;
  regardingobjectid_msdyn_workorderservicetask_ts_enforcementaction_bind$msdyn_workorderservicetasks?: string | null;
  regardingobjectid_new_interactionforemail_ts_enforcementaction_bind$interactionforemails?: string | null;
  regardingobjectid_opportunity_ts_enforcementaction_bind$opportunities?: string | null;
  regardingobjectid_ovs_operation_ts_enforcementaction_bind$ovs_operations?: string | null;
  regardingobjectid_ppp_traveller_ts_enforcementaction_bind$ppp_travellers?: string | null;
  regardingobjectid_quote_ts_enforcementaction_bind$quotes?: string | null;
  regardingobjectid_salesorder_ts_enforcementaction_bind$salesorders?: string | null;
  regardingobjectid_site_ts_enforcementaction_bind$sites?: string | null;
  regardingobjectid_ts_request_ts_enforcementaction_bind$ts_requests?: string | null;
  serviceid_ts_enforcementaction_bind$services?: string | null;
  sla_activitypointer_sla_ts_enforcementaction_bind$slas?: string | null;
  transactioncurrencyid_ts_enforcementaction_bind$transactioncurrencies?: string | null;
  ts_Incident_ts_enforcementaction_bind$incidents?: string | null;
  ts_Individualcompany_ts_enforcementaction_bind$accounts?: string | null;
  ts_Verbalwarninggivento_ts_enforcementaction_bind$contacts?: string | null;
  ts_Writtenwarningsentto_ts_enforcementaction_bind$contacts?: string | null;
}
interface ts_enforcementaction_Create extends ts_enforcementaction {
  activityid_ts_enforcementaction_bind$activitypointers?: string | null;
}
interface ts_enforcementaction_Update extends ts_enforcementaction {
}
interface ts_enforcementaction_Select {
  activityadditionalparams: WebAttribute<ts_enforcementaction_Select, { activityadditionalparams: string | null }, {  }>;
  activityid: WebAttribute<ts_enforcementaction_Select, { activityid: string | null }, {  }>;
  activitytypecode: WebAttribute<ts_enforcementaction_Select, { activitytypecode: string | null }, {  }>;
  actualdurationminutes: WebAttribute<ts_enforcementaction_Select, { actualdurationminutes: number | null }, {  }>;
  actualend: WebAttribute<ts_enforcementaction_Select, { actualend: Date | null }, { actualend_formatted?: string }>;
  actualstart: WebAttribute<ts_enforcementaction_Select, { actualstart: Date | null }, { actualstart_formatted?: string }>;
  bcc_guid: WebAttribute<ts_enforcementaction_Select, { bcc_guid: string | null }, { bcc_formatted?: string }>;
  cc_guid: WebAttribute<ts_enforcementaction_Select, { cc_guid: string | null }, { cc_formatted?: string }>;
  community: WebAttribute<ts_enforcementaction_Select, { community: socialprofile_community | null }, { community_formatted?: string }>;
  createdby_guid: WebAttribute<ts_enforcementaction_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_enforcementaction_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_enforcementaction_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  customers_guid: WebAttribute<ts_enforcementaction_Select, { customers_guid: string | null }, { customers_formatted?: string }>;
  deliverylastattemptedon: WebAttribute<ts_enforcementaction_Select, { deliverylastattemptedon: Date | null }, { deliverylastattemptedon_formatted?: string }>;
  deliveryprioritycode: WebAttribute<ts_enforcementaction_Select, { deliveryprioritycode: activitypointer_deliveryprioritycode | null }, { deliveryprioritycode_formatted?: string }>;
  description: WebAttribute<ts_enforcementaction_Select, { description: string | null }, {  }>;
  exchangeitemid: WebAttribute<ts_enforcementaction_Select, { exchangeitemid: string | null }, {  }>;
  exchangerate: WebAttribute<ts_enforcementaction_Select, { exchangerate: number | null }, {  }>;
  exchangeweblink: WebAttribute<ts_enforcementaction_Select, { exchangeweblink: string | null }, {  }>;
  from_guid: WebAttribute<ts_enforcementaction_Select, { from_guid: string | null }, { from_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_enforcementaction_Select, { importsequencenumber: number | null }, {  }>;
  instancetypecode: WebAttribute<ts_enforcementaction_Select, { instancetypecode: ts_enforcementaction_instancetypecode | null }, { instancetypecode_formatted?: string }>;
  isbilled: WebAttribute<ts_enforcementaction_Select, { isbilled: boolean | null }, {  }>;
  ismapiprivate: WebAttribute<ts_enforcementaction_Select, { ismapiprivate: boolean | null }, {  }>;
  isregularactivity: WebAttribute<ts_enforcementaction_Select, { isregularactivity: boolean | null }, {  }>;
  isworkflowcreated: WebAttribute<ts_enforcementaction_Select, { isworkflowcreated: boolean | null }, {  }>;
  lastonholdtime: WebAttribute<ts_enforcementaction_Select, { lastonholdtime: Date | null }, { lastonholdtime_formatted?: string }>;
  leftvoicemail: WebAttribute<ts_enforcementaction_Select, { leftvoicemail: boolean | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_enforcementaction_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_enforcementaction_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_enforcementaction_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  onholdtime: WebAttribute<ts_enforcementaction_Select, { onholdtime: number | null }, {  }>;
  optionalattendees_guid: WebAttribute<ts_enforcementaction_Select, { optionalattendees_guid: string | null }, { optionalattendees_formatted?: string }>;
  organizer_guid: WebAttribute<ts_enforcementaction_Select, { organizer_guid: string | null }, { organizer_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_enforcementaction_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_enforcementaction_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_enforcementaction_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_enforcementaction_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_enforcementaction_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  partners_guid: WebAttribute<ts_enforcementaction_Select, { partners_guid: string | null }, { partners_formatted?: string }>;
  postponeactivityprocessinguntil: WebAttribute<ts_enforcementaction_Select, { postponeactivityprocessinguntil: Date | null }, { postponeactivityprocessinguntil_formatted?: string }>;
  prioritycode: WebAttribute<ts_enforcementaction_Select, { prioritycode: ts_enforcementaction_prioritycode | null }, { prioritycode_formatted?: string }>;
  processid: WebAttribute<ts_enforcementaction_Select, { processid: string | null }, {  }>;
  regardingobjectid_guid: WebAttribute<ts_enforcementaction_Select, { regardingobjectid_guid: string | null }, { regardingobjectid_formatted?: string }>;
  requiredattendees_guid: WebAttribute<ts_enforcementaction_Select, { requiredattendees_guid: string | null }, { requiredattendees_formatted?: string }>;
  resources_guid: WebAttribute<ts_enforcementaction_Select, { resources_guid: string | null }, { resources_formatted?: string }>;
  scheduleddurationminutes: WebAttribute<ts_enforcementaction_Select, { scheduleddurationminutes: number | null }, {  }>;
  scheduledend: WebAttribute<ts_enforcementaction_Select, { scheduledend: Date | null }, { scheduledend_formatted?: string }>;
  scheduledstart: WebAttribute<ts_enforcementaction_Select, { scheduledstart: Date | null }, { scheduledstart_formatted?: string }>;
  sendermailboxid_guid: WebAttribute<ts_enforcementaction_Select, { sendermailboxid_guid: string | null }, { sendermailboxid_formatted?: string }>;
  senton: WebAttribute<ts_enforcementaction_Select, { senton: Date | null }, { senton_formatted?: string }>;
  seriesid: WebAttribute<ts_enforcementaction_Select, { seriesid: string | null }, {  }>;
  serviceid_guid: WebAttribute<ts_enforcementaction_Select, { serviceid_guid: string | null }, { serviceid_formatted?: string }>;
  slaid_guid: WebAttribute<ts_enforcementaction_Select, { slaid_guid: string | null }, { slaid_formatted?: string }>;
  slainvokedid_guid: WebAttribute<ts_enforcementaction_Select, { slainvokedid_guid: string | null }, { slainvokedid_formatted?: string }>;
  sortdate: WebAttribute<ts_enforcementaction_Select, { sortdate: Date | null }, { sortdate_formatted?: string }>;
  stageid: WebAttribute<ts_enforcementaction_Select, { stageid: string | null }, {  }>;
  statecode: WebAttribute<ts_enforcementaction_Select, { statecode: ts_enforcementaction_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_enforcementaction_Select, { statuscode: ts_enforcementaction_statuscode | null }, { statuscode_formatted?: string }>;
  subject: WebAttribute<ts_enforcementaction_Select, { subject: string | null }, {  }>;
  timezoneruleversionnumber: WebAttribute<ts_enforcementaction_Select, { timezoneruleversionnumber: number | null }, {  }>;
  to_guid: WebAttribute<ts_enforcementaction_Select, { to_guid: string | null }, { to_formatted?: string }>;
  transactioncurrencyid_guid: WebAttribute<ts_enforcementaction_Select, { transactioncurrencyid_guid: string | null }, { transactioncurrencyid_formatted?: string }>;
  traversedpath: WebAttribute<ts_enforcementaction_Select, { traversedpath: string | null }, {  }>;
  ts_comments: WebAttribute<ts_enforcementaction_Select, { ts_comments: string | null }, {  }>;
  ts_copyofreceipt: WebAttribute<ts_enforcementaction_Select, { ts_copyofreceipt: string | null }, {  }>;
  ts_dateandtimeofserviceofenforcementaction: WebAttribute<ts_enforcementaction_Select, { ts_dateandtimeofserviceofenforcementaction: Date | null }, { ts_dateandtimeofserviceofenforcementaction_formatted?: string }>;
  ts_incident_guid: WebAttribute<ts_enforcementaction_Select, { ts_incident_guid: string | null }, { ts_incident_formatted?: string }>;
  ts_individualcompany_guid: WebAttribute<ts_enforcementaction_Select, { ts_individualcompany_guid: string | null }, { ts_individualcompany_formatted?: string }>;
  ts_individualposition: WebAttribute<ts_enforcementaction_Select, { ts_individualposition: string | null }, {  }>;
  ts_typeofenforcementaction: WebAttribute<ts_enforcementaction_Select, { ts_typeofenforcementaction: ts_type | null }, { ts_typeofenforcementaction_formatted?: string }>;
  ts_verbalwarningdeliverylocation: WebAttribute<ts_enforcementaction_Select, { ts_verbalwarningdeliverylocation: ts_verbalwarningdeliverylocation | null }, { ts_verbalwarningdeliverylocation_formatted?: string }>;
  ts_verbalwarninggivento_guid: WebAttribute<ts_enforcementaction_Select, { ts_verbalwarninggivento_guid: string | null }, { ts_verbalwarninggivento_formatted?: string }>;
  ts_writtenwarningdeliverymethod: WebAttribute<ts_enforcementaction_Select, { ts_writtenwarningdeliverymethod: ts_writtenwarningdeliverymethod | null }, { ts_writtenwarningdeliverymethod_formatted?: string }>;
  ts_writtenwarningsentto_guid: WebAttribute<ts_enforcementaction_Select, { ts_writtenwarningsentto_guid: string | null }, { ts_writtenwarningsentto_formatted?: string }>;
  utcconversiontimezonecode: WebAttribute<ts_enforcementaction_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_enforcementaction_Select, { versionnumber: number | null }, {  }>;
}
interface ts_enforcementaction_Filter {
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
  instancetypecode: ts_enforcementaction_instancetypecode;
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
  prioritycode: ts_enforcementaction_prioritycode;
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
  statecode: ts_enforcementaction_statecode;
  statuscode: ts_enforcementaction_statuscode;
  subject: string;
  timezoneruleversionnumber: number;
  to_guid: XQW.Guid;
  transactioncurrencyid_guid: XQW.Guid;
  traversedpath: string;
  ts_comments: string;
  ts_copyofreceipt: string;
  ts_dateandtimeofserviceofenforcementaction: Date;
  ts_incident_guid: XQW.Guid;
  ts_individualcompany_guid: XQW.Guid;
  ts_individualposition: string;
  ts_typeofenforcementaction: ts_type;
  ts_verbalwarningdeliverylocation: ts_verbalwarningdeliverylocation;
  ts_verbalwarninggivento_guid: XQW.Guid;
  ts_writtenwarningdeliverymethod: ts_writtenwarningdeliverymethod;
  ts_writtenwarningsentto_guid: XQW.Guid;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_enforcementaction_Expand {
  createdby_ts_enforcementaction: WebExpand<ts_enforcementaction_Expand, SystemUser_Select, SystemUser_Filter, { createdby_ts_enforcementaction: SystemUser_Result }>;
  createdonbehalfby_ts_enforcementaction: WebExpand<ts_enforcementaction_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby_ts_enforcementaction: SystemUser_Result }>;
  modifiedby_ts_enforcementaction: WebExpand<ts_enforcementaction_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby_ts_enforcementaction: SystemUser_Result }>;
  modifiedonbehalfby_ts_enforcementaction: WebExpand<ts_enforcementaction_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby_ts_enforcementaction: SystemUser_Result }>;
  ownerid_ts_enforcementaction: WebExpand<ts_enforcementaction_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid_ts_enforcementaction: SystemUser_Result } & { ownerid_ts_enforcementaction: Team_Result }>;
  owningteam_ts_enforcementaction: WebExpand<ts_enforcementaction_Expand, Team_Select, Team_Filter, { owningteam_ts_enforcementaction: Team_Result }>;
  owninguser_ts_enforcementaction: WebExpand<ts_enforcementaction_Expand, SystemUser_Select, SystemUser_Filter, { owninguser_ts_enforcementaction: SystemUser_Result }>;
  regardingobjectid_account_ts_enforcementaction: WebExpand<ts_enforcementaction_Expand, Account_Select, Account_Filter, { regardingobjectid_account_ts_enforcementaction: Account_Result }>;
  regardingobjectid_bookableresourcebooking_ts_enforcementaction: WebExpand<ts_enforcementaction_Expand, BookableResourceBooking_Select, BookableResourceBooking_Filter, { regardingobjectid_bookableresourcebooking_ts_enforcementaction: BookableResourceBooking_Result }>;
  regardingobjectid_contact_ts_enforcementaction: WebExpand<ts_enforcementaction_Expand, Contact_Select, Contact_Filter, { regardingobjectid_contact_ts_enforcementaction: Contact_Result }>;
  regardingobjectid_incident_ts_enforcementaction: WebExpand<ts_enforcementaction_Expand, Incident_Select, Incident_Filter, { regardingobjectid_incident_ts_enforcementaction: Incident_Result }>;
  regardingobjectid_msdyn_customerasset_ts_enforcementaction: WebExpand<ts_enforcementaction_Expand, msdyn_customerasset_Select, msdyn_customerasset_Filter, { regardingobjectid_msdyn_customerasset_ts_enforcementaction: msdyn_customerasset_Result }>;
  regardingobjectid_msdyn_workorder_ts_enforcementaction: WebExpand<ts_enforcementaction_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { regardingobjectid_msdyn_workorder_ts_enforcementaction: msdyn_workorder_Result }>;
  regardingobjectid_msdyn_workorderservicetask_ts_enforcementaction: WebExpand<ts_enforcementaction_Expand, msdyn_workorderservicetask_Select, msdyn_workorderservicetask_Filter, { regardingobjectid_msdyn_workorderservicetask_ts_enforcementaction: msdyn_workorderservicetask_Result }>;
  regardingobjectid_ovs_operation_ts_enforcementaction: WebExpand<ts_enforcementaction_Expand, ovs_operation_Select, ovs_operation_Filter, { regardingobjectid_ovs_operation_ts_enforcementaction: ovs_operation_Result }>;
  ts_Incident_ts_enforcementaction: WebExpand<ts_enforcementaction_Expand, Incident_Select, Incident_Filter, { ts_Incident_ts_enforcementaction: Incident_Result }>;
  ts_Individualcompany_ts_enforcementaction: WebExpand<ts_enforcementaction_Expand, Account_Select, Account_Filter, { ts_Individualcompany_ts_enforcementaction: Account_Result }>;
  ts_Verbalwarninggivento_ts_enforcementaction: WebExpand<ts_enforcementaction_Expand, Contact_Select, Contact_Filter, { ts_Verbalwarninggivento_ts_enforcementaction: Contact_Result }>;
  ts_Writtenwarningsentto_ts_enforcementaction: WebExpand<ts_enforcementaction_Expand, Contact_Select, Contact_Filter, { ts_Writtenwarningsentto_ts_enforcementaction: Contact_Result }>;
  ts_enforcementaction_activity_parties: WebExpand<ts_enforcementaction_Expand, ActivityParty_Select, ActivityParty_Filter, { ts_enforcementaction_activity_parties: ActivityParty_Result[] }>;
  ts_enforcementaction_connections1: WebExpand<ts_enforcementaction_Expand, Connection_Select, Connection_Filter, { ts_enforcementaction_connections1: Connection_Result[] }>;
  ts_enforcementaction_connections2: WebExpand<ts_enforcementaction_Expand, Connection_Select, Connection_Filter, { ts_enforcementaction_connections2: Connection_Result[] }>;
  ts_enforcementaction_ts_enforcementaction: WebExpand<ts_enforcementaction_Expand, ovs_Finding_Select, ovs_Finding_Filter, { ts_enforcementaction_ts_enforcementaction: ovs_Finding_Result[] }>;
}
interface ts_enforcementaction_FormattedResult {
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
  ts_dateandtimeofserviceofenforcementaction_formatted?: string;
  ts_incident_formatted?: string;
  ts_individualcompany_formatted?: string;
  ts_typeofenforcementaction_formatted?: string;
  ts_verbalwarningdeliverylocation_formatted?: string;
  ts_verbalwarninggivento_formatted?: string;
  ts_writtenwarningdeliverymethod_formatted?: string;
  ts_writtenwarningsentto_formatted?: string;
}
interface ts_enforcementaction_Result extends ts_enforcementaction_Base, ts_enforcementaction_Relationships {
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
  ts_incident_guid: string | null;
  ts_individualcompany_guid: string | null;
  ts_verbalwarninggivento_guid: string | null;
  ts_writtenwarningsentto_guid: string | null;
}
interface ts_enforcementaction_RelatedOne {
  createdby_ts_enforcementaction: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby_ts_enforcementaction: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby_ts_enforcementaction: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby_ts_enforcementaction: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid_ts_enforcementaction: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  ownerid_ts_enforcementaction1: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  owningteam_ts_enforcementaction: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser_ts_enforcementaction: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  regardingobjectid_account_ts_enforcementaction: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
  regardingobjectid_bookableresourcebooking_ts_enforcementaction: WebMappingRetrieve<BookableResourceBooking_Select,BookableResourceBooking_Expand,BookableResourceBooking_Filter,BookableResourceBooking_Fixed,BookableResourceBooking_Result,BookableResourceBooking_FormattedResult>;
  regardingobjectid_contact_ts_enforcementaction: WebMappingRetrieve<Contact_Select,Contact_Expand,Contact_Filter,Contact_Fixed,Contact_Result,Contact_FormattedResult>;
  regardingobjectid_incident_ts_enforcementaction: WebMappingRetrieve<Incident_Select,Incident_Expand,Incident_Filter,Incident_Fixed,Incident_Result,Incident_FormattedResult>;
  regardingobjectid_msdyn_customerasset_ts_enforcementaction: WebMappingRetrieve<msdyn_customerasset_Select,msdyn_customerasset_Expand,msdyn_customerasset_Filter,msdyn_customerasset_Fixed,msdyn_customerasset_Result,msdyn_customerasset_FormattedResult>;
  regardingobjectid_msdyn_workorder_ts_enforcementaction: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
  regardingobjectid_msdyn_workorderservicetask_ts_enforcementaction: WebMappingRetrieve<msdyn_workorderservicetask_Select,msdyn_workorderservicetask_Expand,msdyn_workorderservicetask_Filter,msdyn_workorderservicetask_Fixed,msdyn_workorderservicetask_Result,msdyn_workorderservicetask_FormattedResult>;
  regardingobjectid_ovs_operation_ts_enforcementaction: WebMappingRetrieve<ovs_operation_Select,ovs_operation_Expand,ovs_operation_Filter,ovs_operation_Fixed,ovs_operation_Result,ovs_operation_FormattedResult>;
  ts_Incident_ts_enforcementaction: WebMappingRetrieve<Incident_Select,Incident_Expand,Incident_Filter,Incident_Fixed,Incident_Result,Incident_FormattedResult>;
  ts_Individualcompany_ts_enforcementaction: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
  ts_Verbalwarninggivento_ts_enforcementaction: WebMappingRetrieve<Contact_Select,Contact_Expand,Contact_Filter,Contact_Fixed,Contact_Result,Contact_FormattedResult>;
  ts_Writtenwarningsentto_ts_enforcementaction: WebMappingRetrieve<Contact_Select,Contact_Expand,Contact_Filter,Contact_Fixed,Contact_Result,Contact_FormattedResult>;
}
interface ts_enforcementaction_RelatedMany {
  ts_enforcementaction_activity_parties: WebMappingRetrieve<ActivityParty_Select,ActivityParty_Expand,ActivityParty_Filter,ActivityParty_Fixed,ActivityParty_Result,ActivityParty_FormattedResult>;
  ts_enforcementaction_connections1: WebMappingRetrieve<Connection_Select,Connection_Expand,Connection_Filter,Connection_Fixed,Connection_Result,Connection_FormattedResult>;
  ts_enforcementaction_connections2: WebMappingRetrieve<Connection_Select,Connection_Expand,Connection_Filter,Connection_Fixed,Connection_Result,Connection_FormattedResult>;
  ts_enforcementaction_ts_enforcementaction: WebMappingRetrieve<ovs_Finding_Select,ovs_Finding_Expand,ovs_Finding_Filter,ovs_Finding_Fixed,ovs_Finding_Result,ovs_Finding_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_enforcementactions: WebMappingRetrieve<ts_enforcementaction_Select,ts_enforcementaction_Expand,ts_enforcementaction_Filter,ts_enforcementaction_Fixed,ts_enforcementaction_Result,ts_enforcementaction_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_enforcementactions: WebMappingRelated<ts_enforcementaction_RelatedOne,ts_enforcementaction_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_enforcementactions: WebMappingCUDA<ts_enforcementaction_Create,ts_enforcementaction_Update,ts_enforcementaction_Select>;
}
