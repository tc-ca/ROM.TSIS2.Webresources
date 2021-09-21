interface Incident_Base extends WebEntity {
  activitiescomplete?: boolean | null;
  actualserviceunits?: number | null;
  billedserviceunits?: number | null;
  blockedprofile?: boolean | null;
  caseorigincode?: incident_caseorigincode | null;
  casetypecode?: incident_casetypecode | null;
  checkemail?: boolean | null;
  contractservicelevelcode?: incident_contractservicelevelcode | null;
  createdon?: Date | null;
  customercontacted?: boolean | null;
  customersatisfactioncode?: incident_customersatisfactioncode | null;
  decremententitlementterm?: boolean | null;
  description?: string | null;
  emailaddress?: string | null;
  entityimageid?: string | null;
  escalatedon?: Date | null;
  exchangerate?: number | null;
  firstresponsesent?: boolean | null;
  firstresponseslastatus?: incident_firstresponseslastatus | null;
  followupby?: Date | null;
  followuptaskcreated?: boolean | null;
  importsequencenumber?: number | null;
  incidentid?: string | null;
  incidentstagecode?: incident_incidentstagecode | null;
  influencescore?: number | null;
  isdecrementing?: boolean | null;
  isescalated?: boolean | null;
  lastonholdtime?: Date | null;
  merged?: boolean | null;
  messagetypecode?: socialactivity_postmessagetype | null;
  modifiedon?: Date | null;
  numberofchildincidents?: number | null;
  onholdtime?: number | null;
  overriddencreatedon?: Date | null;
  prioritycode?: incident_prioritycode | null;
  processid?: string | null;
  productserialnumber?: string | null;
  resolveby?: Date | null;
  resolvebyslastatus?: incident_resolvebyslastatus | null;
  responseby?: Date | null;
  routecase?: boolean | null;
  sentimentvalue?: number | null;
  servicestage?: servicestage | null;
  severitycode?: incident_severitycode | null;
  stageid?: string | null;
  statecode?: incident_statecode | null;
  statuscode?: incident_statuscode | null;
  ticketnumber?: string | null;
  timezoneruleversionnumber?: number | null;
  title?: string | null;
  traversedpath?: string | null;
  ts_numberoffindings?: number | null;
  ts_numberoffindings_date?: Date | null;
  ts_numberoffindings_state?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface Incident_Relationships {
  Incident_Appointments?: Appointment_Result[] | null;
  Incident_IncidentResolutions?: IncidentResolution_Result[] | null;
  Incident_ServiceAppointments?: ServiceAppointment_Result[] | null;
  customerid_account?: Account_Result | null;
  customerid_contact?: Contact_Result | null;
  incident_PostFollows?: PostFollow_Result[] | null;
  incident_activity_parties?: ActivityParty_Result[] | null;
  incident_connections1?: Connection_Result[] | null;
  incident_connections2?: Connection_Result[] | null;
  incident_existingcase?: Incident_Result[] | null;
  incident_master_incident?: Incident_Result[] | null;
  incident_parent_incident?: Incident_Result[] | null;
  msdyn_FunctionalLocation?: msdyn_FunctionalLocation_Result | null;
  msdyn_incident_msdyn_customerasset?: msdyn_customerasset_Result[] | null;
  msdyn_incident_msdyn_workorder_ServiceRequest?: msdyn_workorder_Result[] | null;
  ovs_incident_msdyn_workorderservicetask?: msdyn_workorderservicetask_Result[] | null;
  ts_incident_ts_workordercreationwizard?: ts_workordercreationwizard_Result[] | null;
}
interface Incident extends Incident_Base, Incident_Relationships {
  contractdetailid_bind$contractdetails?: string | null;
  contractid_bind$contracts?: string | null;
  customerid_account_bind$accounts?: string | null;
  customerid_contact_bind$contacts?: string | null;
  entitlementid_bind$entitlements?: string | null;
  existingcase_bind$incidents?: string | null;
  firstresponsebykpiid_bind$slakpiinstances?: string | null;
  kbarticleid_bind$kbarticles?: string | null;
  masterid_bind$incidents?: string | null;
  msdyn_FunctionalLocation_bind$msdyn_functionallocations?: string | null;
  msdyn_IoTAlert_bind$msdyn_iotalerts?: string | null;
  msdyn_incidenttype_bind$msdyn_incidenttypes?: string | null;
  ovs_Region_bind$territories?: string | null;
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  parentcaseid_bind$incidents?: string | null;
  primarycontactid_bind$contacts?: string | null;
  productid_bind$products?: string | null;
  resolvebykpiid_bind$slakpiinstances?: string | null;
  responsiblecontactid_bind$contacts?: string | null;
  slaid_sla_bind$slas?: string | null;
  stageid_processstage_bind$processstages?: string | null;
  subjectid_bind$subjects?: string | null;
  transactioncurrencyid_bind$transactioncurrencies?: string | null;
  ts_Country_bind$tc_countries?: string | null;
  ts_TradeNameId_bind$ts_tradenames?: string | null;
}
interface Incident_Create extends Incident {
  incidentid_childincidentcount_bind$childincidentcounts?: string | null;
  socialprofileid_bind$socialprofiles?: string | null;
}
interface Incident_Update extends Incident {
}
interface Incident_Select {
  accountid_guid: WebAttribute<Incident_Select, { accountid_guid: string | null }, { accountid_formatted?: string }>;
  activitiescomplete: WebAttribute<Incident_Select, { activitiescomplete: boolean | null }, {  }>;
  actualserviceunits: WebAttribute<Incident_Select, { actualserviceunits: number | null }, {  }>;
  billedserviceunits: WebAttribute<Incident_Select, { billedserviceunits: number | null }, {  }>;
  blockedprofile: WebAttribute<Incident_Select, { blockedprofile: boolean | null }, {  }>;
  caseorigincode: WebAttribute<Incident_Select, { caseorigincode: incident_caseorigincode | null }, { caseorigincode_formatted?: string }>;
  casetypecode: WebAttribute<Incident_Select, { casetypecode: incident_casetypecode | null }, { casetypecode_formatted?: string }>;
  checkemail: WebAttribute<Incident_Select, { checkemail: boolean | null }, {  }>;
  contactid_guid: WebAttribute<Incident_Select, { contactid_guid: string | null }, { contactid_formatted?: string }>;
  contractdetailid_guid: WebAttribute<Incident_Select, { contractdetailid_guid: string | null }, { contractdetailid_formatted?: string }>;
  contractid_guid: WebAttribute<Incident_Select, { contractid_guid: string | null }, { contractid_formatted?: string }>;
  contractservicelevelcode: WebAttribute<Incident_Select, { contractservicelevelcode: incident_contractservicelevelcode | null }, { contractservicelevelcode_formatted?: string }>;
  createdby_guid: WebAttribute<Incident_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdbyexternalparty_guid: WebAttribute<Incident_Select, { createdbyexternalparty_guid: string | null }, { createdbyexternalparty_formatted?: string }>;
  createdon: WebAttribute<Incident_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<Incident_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  customercontacted: WebAttribute<Incident_Select, { customercontacted: boolean | null }, {  }>;
  customerid_guid: WebAttribute<Incident_Select, { customerid_guid: string | null }, { customerid_formatted?: string }>;
  customersatisfactioncode: WebAttribute<Incident_Select, { customersatisfactioncode: incident_customersatisfactioncode | null }, { customersatisfactioncode_formatted?: string }>;
  decremententitlementterm: WebAttribute<Incident_Select, { decremententitlementterm: boolean | null }, {  }>;
  description: WebAttribute<Incident_Select, { description: string | null }, {  }>;
  emailaddress: WebAttribute<Incident_Select, { emailaddress: string | null }, {  }>;
  entitlementid_guid: WebAttribute<Incident_Select, { entitlementid_guid: string | null }, { entitlementid_formatted?: string }>;
  entityimageid: WebAttribute<Incident_Select, { entityimageid: string | null }, {  }>;
  escalatedon: WebAttribute<Incident_Select, { escalatedon: Date | null }, { escalatedon_formatted?: string }>;
  exchangerate: WebAttribute<Incident_Select, { exchangerate: number | null }, {  }>;
  existingcase_guid: WebAttribute<Incident_Select, { existingcase_guid: string | null }, { existingcase_formatted?: string }>;
  firstresponsebykpiid_guid: WebAttribute<Incident_Select, { firstresponsebykpiid_guid: string | null }, { firstresponsebykpiid_formatted?: string }>;
  firstresponsesent: WebAttribute<Incident_Select, { firstresponsesent: boolean | null }, {  }>;
  firstresponseslastatus: WebAttribute<Incident_Select, { firstresponseslastatus: incident_firstresponseslastatus | null }, { firstresponseslastatus_formatted?: string }>;
  followupby: WebAttribute<Incident_Select, { followupby: Date | null }, { followupby_formatted?: string }>;
  followuptaskcreated: WebAttribute<Incident_Select, { followuptaskcreated: boolean | null }, {  }>;
  importsequencenumber: WebAttribute<Incident_Select, { importsequencenumber: number | null }, {  }>;
  incidentid: WebAttribute<Incident_Select, { incidentid: string | null }, {  }>;
  incidentstagecode: WebAttribute<Incident_Select, { incidentstagecode: incident_incidentstagecode | null }, { incidentstagecode_formatted?: string }>;
  influencescore: WebAttribute<Incident_Select, { influencescore: number | null }, {  }>;
  isdecrementing: WebAttribute<Incident_Select, { isdecrementing: boolean | null }, {  }>;
  isescalated: WebAttribute<Incident_Select, { isescalated: boolean | null }, {  }>;
  kbarticleid_guid: WebAttribute<Incident_Select, { kbarticleid_guid: string | null }, { kbarticleid_formatted?: string }>;
  lastonholdtime: WebAttribute<Incident_Select, { lastonholdtime: Date | null }, { lastonholdtime_formatted?: string }>;
  masterid_guid: WebAttribute<Incident_Select, { masterid_guid: string | null }, { masterid_formatted?: string }>;
  merged: WebAttribute<Incident_Select, { merged: boolean | null }, {  }>;
  messagetypecode: WebAttribute<Incident_Select, { messagetypecode: socialactivity_postmessagetype | null }, { messagetypecode_formatted?: string }>;
  modifiedby_guid: WebAttribute<Incident_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedbyexternalparty_guid: WebAttribute<Incident_Select, { modifiedbyexternalparty_guid: string | null }, { modifiedbyexternalparty_formatted?: string }>;
  modifiedon: WebAttribute<Incident_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<Incident_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  msdyn_functionallocation_guid: WebAttribute<Incident_Select, { msdyn_functionallocation_guid: string | null }, { msdyn_functionallocation_formatted?: string }>;
  msdyn_incidenttype_guid: WebAttribute<Incident_Select, { msdyn_incidenttype_guid: string | null }, { msdyn_incidenttype_formatted?: string }>;
  msdyn_iotalert_guid: WebAttribute<Incident_Select, { msdyn_iotalert_guid: string | null }, { msdyn_iotalert_formatted?: string }>;
  numberofchildincidents: WebAttribute<Incident_Select, { numberofchildincidents: number | null }, {  }>;
  onholdtime: WebAttribute<Incident_Select, { onholdtime: number | null }, {  }>;
  overriddencreatedon: WebAttribute<Incident_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ovs_region_guid: WebAttribute<Incident_Select, { ovs_region_guid: string | null }, { ovs_region_formatted?: string }>;
  ownerid_guid: WebAttribute<Incident_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<Incident_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<Incident_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<Incident_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  parentcaseid_guid: WebAttribute<Incident_Select, { parentcaseid_guid: string | null }, { parentcaseid_formatted?: string }>;
  primarycontactid_guid: WebAttribute<Incident_Select, { primarycontactid_guid: string | null }, { primarycontactid_formatted?: string }>;
  prioritycode: WebAttribute<Incident_Select, { prioritycode: incident_prioritycode | null }, { prioritycode_formatted?: string }>;
  processid: WebAttribute<Incident_Select, { processid: string | null }, {  }>;
  productid_guid: WebAttribute<Incident_Select, { productid_guid: string | null }, { productid_formatted?: string }>;
  productserialnumber: WebAttribute<Incident_Select, { productserialnumber: string | null }, {  }>;
  resolveby: WebAttribute<Incident_Select, { resolveby: Date | null }, { resolveby_formatted?: string }>;
  resolvebykpiid_guid: WebAttribute<Incident_Select, { resolvebykpiid_guid: string | null }, { resolvebykpiid_formatted?: string }>;
  resolvebyslastatus: WebAttribute<Incident_Select, { resolvebyslastatus: incident_resolvebyslastatus | null }, { resolvebyslastatus_formatted?: string }>;
  responseby: WebAttribute<Incident_Select, { responseby: Date | null }, { responseby_formatted?: string }>;
  responsiblecontactid_guid: WebAttribute<Incident_Select, { responsiblecontactid_guid: string | null }, { responsiblecontactid_formatted?: string }>;
  routecase: WebAttribute<Incident_Select, { routecase: boolean | null }, {  }>;
  sentimentvalue: WebAttribute<Incident_Select, { sentimentvalue: number | null }, {  }>;
  servicestage: WebAttribute<Incident_Select, { servicestage: servicestage | null }, { servicestage_formatted?: string }>;
  severitycode: WebAttribute<Incident_Select, { severitycode: incident_severitycode | null }, { severitycode_formatted?: string }>;
  slaid_guid: WebAttribute<Incident_Select, { slaid_guid: string | null }, { slaid_formatted?: string }>;
  slainvokedid_guid: WebAttribute<Incident_Select, { slainvokedid_guid: string | null }, { slainvokedid_formatted?: string }>;
  socialprofileid_guid: WebAttribute<Incident_Select, { socialprofileid_guid: string | null }, { socialprofileid_formatted?: string }>;
  stageid: WebAttribute<Incident_Select, { stageid: string | null }, {  }>;
  statecode: WebAttribute<Incident_Select, { statecode: incident_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<Incident_Select, { statuscode: incident_statuscode | null }, { statuscode_formatted?: string }>;
  subjectid_guid: WebAttribute<Incident_Select, { subjectid_guid: string | null }, { subjectid_formatted?: string }>;
  ticketnumber: WebAttribute<Incident_Select, { ticketnumber: string | null }, {  }>;
  timezoneruleversionnumber: WebAttribute<Incident_Select, { timezoneruleversionnumber: number | null }, {  }>;
  title: WebAttribute<Incident_Select, { title: string | null }, {  }>;
  transactioncurrencyid_guid: WebAttribute<Incident_Select, { transactioncurrencyid_guid: string | null }, { transactioncurrencyid_formatted?: string }>;
  traversedpath: WebAttribute<Incident_Select, { traversedpath: string | null }, {  }>;
  ts_country_guid: WebAttribute<Incident_Select, { ts_country_guid: string | null }, { ts_country_formatted?: string }>;
  ts_numberoffindings: WebAttribute<Incident_Select, { ts_numberoffindings: number | null }, {  }>;
  ts_numberoffindings_date: WebAttribute<Incident_Select, { ts_numberoffindings_date: Date | null }, { ts_numberoffindings_date_formatted?: string }>;
  ts_numberoffindings_state: WebAttribute<Incident_Select, { ts_numberoffindings_state: number | null }, {  }>;
  ts_tradenameid_guid: WebAttribute<Incident_Select, { ts_tradenameid_guid: string | null }, { ts_tradenameid_formatted?: string }>;
  utcconversiontimezonecode: WebAttribute<Incident_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<Incident_Select, { versionnumber: number | null }, {  }>;
}
interface Incident_Filter {
  accountid_guid: XQW.Guid;
  activitiescomplete: boolean;
  actualserviceunits: number;
  billedserviceunits: number;
  blockedprofile: boolean;
  caseorigincode: incident_caseorigincode;
  casetypecode: incident_casetypecode;
  checkemail: boolean;
  contactid_guid: XQW.Guid;
  contractdetailid_guid: XQW.Guid;
  contractid_guid: XQW.Guid;
  contractservicelevelcode: incident_contractservicelevelcode;
  createdby_guid: XQW.Guid;
  createdbyexternalparty_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  customercontacted: boolean;
  customerid_guid: XQW.Guid;
  customersatisfactioncode: incident_customersatisfactioncode;
  decremententitlementterm: boolean;
  description: string;
  emailaddress: string;
  entitlementid_guid: XQW.Guid;
  entityimageid: XQW.Guid;
  escalatedon: Date;
  exchangerate: any;
  existingcase_guid: XQW.Guid;
  firstresponsebykpiid_guid: XQW.Guid;
  firstresponsesent: boolean;
  firstresponseslastatus: incident_firstresponseslastatus;
  followupby: Date;
  followuptaskcreated: boolean;
  importsequencenumber: number;
  incidentid: XQW.Guid;
  incidentstagecode: incident_incidentstagecode;
  influencescore: number;
  isdecrementing: boolean;
  isescalated: boolean;
  kbarticleid_guid: XQW.Guid;
  lastonholdtime: Date;
  masterid_guid: XQW.Guid;
  merged: boolean;
  messagetypecode: socialactivity_postmessagetype;
  modifiedby_guid: XQW.Guid;
  modifiedbyexternalparty_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  msdyn_functionallocation_guid: XQW.Guid;
  msdyn_incidenttype_guid: XQW.Guid;
  msdyn_iotalert_guid: XQW.Guid;
  numberofchildincidents: number;
  onholdtime: number;
  overriddencreatedon: Date;
  ovs_region_guid: XQW.Guid;
  ownerid_guid: XQW.Guid;
  owningbusinessunit_guid: XQW.Guid;
  owningteam_guid: XQW.Guid;
  owninguser_guid: XQW.Guid;
  parentcaseid_guid: XQW.Guid;
  primarycontactid_guid: XQW.Guid;
  prioritycode: incident_prioritycode;
  processid: XQW.Guid;
  productid_guid: XQW.Guid;
  productserialnumber: string;
  resolveby: Date;
  resolvebykpiid_guid: XQW.Guid;
  resolvebyslastatus: incident_resolvebyslastatus;
  responseby: Date;
  responsiblecontactid_guid: XQW.Guid;
  routecase: boolean;
  sentimentvalue: number;
  servicestage: servicestage;
  severitycode: incident_severitycode;
  slaid_guid: XQW.Guid;
  slainvokedid_guid: XQW.Guid;
  socialprofileid_guid: XQW.Guid;
  stageid: XQW.Guid;
  statecode: incident_statecode;
  statuscode: incident_statuscode;
  subjectid_guid: XQW.Guid;
  ticketnumber: string;
  timezoneruleversionnumber: number;
  title: string;
  transactioncurrencyid_guid: XQW.Guid;
  traversedpath: string;
  ts_country_guid: XQW.Guid;
  ts_numberoffindings: number;
  ts_numberoffindings_date: Date;
  ts_numberoffindings_state: number;
  ts_tradenameid_guid: XQW.Guid;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface Incident_Expand {
  Incident_Appointments: WebExpand<Incident_Expand, Appointment_Select, Appointment_Filter, { Incident_Appointments: Appointment_Result[] }>;
  Incident_IncidentResolutions: WebExpand<Incident_Expand, IncidentResolution_Select, IncidentResolution_Filter, { Incident_IncidentResolutions: IncidentResolution_Result[] }>;
  Incident_ServiceAppointments: WebExpand<Incident_Expand, ServiceAppointment_Select, ServiceAppointment_Filter, { Incident_ServiceAppointments: ServiceAppointment_Result[] }>;
  createdby: WebExpand<Incident_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<Incident_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  customerid_account: WebExpand<Incident_Expand, Account_Select, Account_Filter, { customerid_account: Account_Result }>;
  customerid_contact: WebExpand<Incident_Expand, Contact_Select, Contact_Filter, { customerid_contact: Contact_Result }>;
  existingcase: WebExpand<Incident_Expand, Incident_Select, Incident_Filter, { existingcase: Incident_Result }>;
  incident_PostFollows: WebExpand<Incident_Expand, PostFollow_Select, PostFollow_Filter, { incident_PostFollows: PostFollow_Result[] }>;
  incident_activity_parties: WebExpand<Incident_Expand, ActivityParty_Select, ActivityParty_Filter, { incident_activity_parties: ActivityParty_Result[] }>;
  incident_connections1: WebExpand<Incident_Expand, Connection_Select, Connection_Filter, { incident_connections1: Connection_Result[] }>;
  incident_connections2: WebExpand<Incident_Expand, Connection_Select, Connection_Filter, { incident_connections2: Connection_Result[] }>;
  incident_existingcase: WebExpand<Incident_Expand, Incident_Select, Incident_Filter, { incident_existingcase: Incident_Result[] }>;
  incident_master_incident: WebExpand<Incident_Expand, Incident_Select, Incident_Filter, { incident_master_incident: Incident_Result[] }>;
  incident_parent_incident: WebExpand<Incident_Expand, Incident_Select, Incident_Filter, { incident_parent_incident: Incident_Result[] }>;
  masterid: WebExpand<Incident_Expand, Incident_Select, Incident_Filter, { masterid: Incident_Result }>;
  modifiedby: WebExpand<Incident_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<Incident_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  msdyn_FunctionalLocation: WebExpand<Incident_Expand, msdyn_FunctionalLocation_Select, msdyn_FunctionalLocation_Filter, { msdyn_FunctionalLocation: msdyn_FunctionalLocation_Result }>;
  msdyn_incident_msdyn_customerasset: WebExpand<Incident_Expand, msdyn_customerasset_Select, msdyn_customerasset_Filter, { msdyn_incident_msdyn_customerasset: msdyn_customerasset_Result[] }>;
  msdyn_incident_msdyn_workorder_ServiceRequest: WebExpand<Incident_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { msdyn_incident_msdyn_workorder_ServiceRequest: msdyn_workorder_Result[] }>;
  ovs_incident_msdyn_workorderservicetask: WebExpand<Incident_Expand, msdyn_workorderservicetask_Select, msdyn_workorderservicetask_Filter, { ovs_incident_msdyn_workorderservicetask: msdyn_workorderservicetask_Result[] }>;
  ownerid: WebExpand<Incident_Expand, SystemUser_Select, SystemUser_Filter, { ownerid: SystemUser_Result }>;
  owninguser: WebExpand<Incident_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  parentcaseid: WebExpand<Incident_Expand, Incident_Select, Incident_Filter, { parentcaseid: Incident_Result }>;
  primarycontactid: WebExpand<Incident_Expand, Contact_Select, Contact_Filter, { primarycontactid: Contact_Result }>;
  responsiblecontactid: WebExpand<Incident_Expand, Contact_Select, Contact_Filter, { responsiblecontactid: Contact_Result }>;
  ts_incident_ts_workordercreationwizard: WebExpand<Incident_Expand, ts_workordercreationwizard_Select, ts_workordercreationwizard_Filter, { ts_incident_ts_workordercreationwizard: ts_workordercreationwizard_Result[] }>;
}
interface Incident_FormattedResult {
  accountid_formatted?: string;
  caseorigincode_formatted?: string;
  casetypecode_formatted?: string;
  contactid_formatted?: string;
  contractdetailid_formatted?: string;
  contractid_formatted?: string;
  contractservicelevelcode_formatted?: string;
  createdby_formatted?: string;
  createdbyexternalparty_formatted?: string;
  createdon_formatted?: string;
  createdonbehalfby_formatted?: string;
  customerid_formatted?: string;
  customersatisfactioncode_formatted?: string;
  entitlementid_formatted?: string;
  escalatedon_formatted?: string;
  existingcase_formatted?: string;
  firstresponsebykpiid_formatted?: string;
  firstresponseslastatus_formatted?: string;
  followupby_formatted?: string;
  incidentstagecode_formatted?: string;
  kbarticleid_formatted?: string;
  lastonholdtime_formatted?: string;
  masterid_formatted?: string;
  messagetypecode_formatted?: string;
  modifiedby_formatted?: string;
  modifiedbyexternalparty_formatted?: string;
  modifiedon_formatted?: string;
  modifiedonbehalfby_formatted?: string;
  msdyn_functionallocation_formatted?: string;
  msdyn_incidenttype_formatted?: string;
  msdyn_iotalert_formatted?: string;
  overriddencreatedon_formatted?: string;
  ovs_region_formatted?: string;
  ownerid_formatted?: string;
  owningbusinessunit_formatted?: string;
  owningteam_formatted?: string;
  owninguser_formatted?: string;
  parentcaseid_formatted?: string;
  primarycontactid_formatted?: string;
  prioritycode_formatted?: string;
  productid_formatted?: string;
  resolveby_formatted?: string;
  resolvebykpiid_formatted?: string;
  resolvebyslastatus_formatted?: string;
  responseby_formatted?: string;
  responsiblecontactid_formatted?: string;
  servicestage_formatted?: string;
  severitycode_formatted?: string;
  slaid_formatted?: string;
  slainvokedid_formatted?: string;
  socialprofileid_formatted?: string;
  statecode_formatted?: string;
  statuscode_formatted?: string;
  subjectid_formatted?: string;
  transactioncurrencyid_formatted?: string;
  ts_country_formatted?: string;
  ts_numberoffindings_date_formatted?: string;
  ts_tradenameid_formatted?: string;
}
interface Incident_Result extends Incident_Base, Incident_Relationships {
  "@odata.etag": string;
  accountid_guid: string | null;
  contactid_guid: string | null;
  contractdetailid_guid: string | null;
  contractid_guid: string | null;
  createdby_guid: string | null;
  createdbyexternalparty_guid: string | null;
  createdonbehalfby_guid: string | null;
  customerid_guid: string | null;
  entitlementid_guid: string | null;
  existingcase_guid: string | null;
  firstresponsebykpiid_guid: string | null;
  kbarticleid_guid: string | null;
  masterid_guid: string | null;
  modifiedby_guid: string | null;
  modifiedbyexternalparty_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  msdyn_functionallocation_guid: string | null;
  msdyn_incidenttype_guid: string | null;
  msdyn_iotalert_guid: string | null;
  ovs_region_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
  parentcaseid_guid: string | null;
  primarycontactid_guid: string | null;
  productid_guid: string | null;
  resolvebykpiid_guid: string | null;
  responsiblecontactid_guid: string | null;
  slaid_guid: string | null;
  slainvokedid_guid: string | null;
  socialprofileid_guid: string | null;
  subjectid_guid: string | null;
  transactioncurrencyid_guid: string | null;
  ts_country_guid: string | null;
  ts_tradenameid_guid: string | null;
}
interface Incident_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  customerid_account: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
  customerid_contact: WebMappingRetrieve<Contact_Select,Contact_Expand,Contact_Filter,Contact_Fixed,Contact_Result,Contact_FormattedResult>;
  existingcase: WebMappingRetrieve<Incident_Select,Incident_Expand,Incident_Filter,Incident_Fixed,Incident_Result,Incident_FormattedResult>;
  masterid: WebMappingRetrieve<Incident_Select,Incident_Expand,Incident_Filter,Incident_Fixed,Incident_Result,Incident_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  msdyn_FunctionalLocation: WebMappingRetrieve<msdyn_FunctionalLocation_Select,msdyn_FunctionalLocation_Expand,msdyn_FunctionalLocation_Filter,msdyn_FunctionalLocation_Fixed,msdyn_FunctionalLocation_Result,msdyn_FunctionalLocation_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  parentcaseid: WebMappingRetrieve<Incident_Select,Incident_Expand,Incident_Filter,Incident_Fixed,Incident_Result,Incident_FormattedResult>;
  primarycontactid: WebMappingRetrieve<Contact_Select,Contact_Expand,Contact_Filter,Contact_Fixed,Contact_Result,Contact_FormattedResult>;
  responsiblecontactid: WebMappingRetrieve<Contact_Select,Contact_Expand,Contact_Filter,Contact_Fixed,Contact_Result,Contact_FormattedResult>;
}
interface Incident_RelatedMany {
  Incident_Appointments: WebMappingRetrieve<Appointment_Select,Appointment_Expand,Appointment_Filter,Appointment_Fixed,Appointment_Result,Appointment_FormattedResult>;
  Incident_IncidentResolutions: WebMappingRetrieve<IncidentResolution_Select,IncidentResolution_Expand,IncidentResolution_Filter,IncidentResolution_Fixed,IncidentResolution_Result,IncidentResolution_FormattedResult>;
  Incident_ServiceAppointments: WebMappingRetrieve<ServiceAppointment_Select,ServiceAppointment_Expand,ServiceAppointment_Filter,ServiceAppointment_Fixed,ServiceAppointment_Result,ServiceAppointment_FormattedResult>;
  incident_PostFollows: WebMappingRetrieve<PostFollow_Select,PostFollow_Expand,PostFollow_Filter,PostFollow_Fixed,PostFollow_Result,PostFollow_FormattedResult>;
  incident_activity_parties: WebMappingRetrieve<ActivityParty_Select,ActivityParty_Expand,ActivityParty_Filter,ActivityParty_Fixed,ActivityParty_Result,ActivityParty_FormattedResult>;
  incident_connections1: WebMappingRetrieve<Connection_Select,Connection_Expand,Connection_Filter,Connection_Fixed,Connection_Result,Connection_FormattedResult>;
  incident_connections2: WebMappingRetrieve<Connection_Select,Connection_Expand,Connection_Filter,Connection_Fixed,Connection_Result,Connection_FormattedResult>;
  incident_existingcase: WebMappingRetrieve<Incident_Select,Incident_Expand,Incident_Filter,Incident_Fixed,Incident_Result,Incident_FormattedResult>;
  incident_master_incident: WebMappingRetrieve<Incident_Select,Incident_Expand,Incident_Filter,Incident_Fixed,Incident_Result,Incident_FormattedResult>;
  incident_parent_incident: WebMappingRetrieve<Incident_Select,Incident_Expand,Incident_Filter,Incident_Fixed,Incident_Result,Incident_FormattedResult>;
  msdyn_incident_msdyn_customerasset: WebMappingRetrieve<msdyn_customerasset_Select,msdyn_customerasset_Expand,msdyn_customerasset_Filter,msdyn_customerasset_Fixed,msdyn_customerasset_Result,msdyn_customerasset_FormattedResult>;
  msdyn_incident_msdyn_workorder_ServiceRequest: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
  ovs_incident_msdyn_workorderservicetask: WebMappingRetrieve<msdyn_workorderservicetask_Select,msdyn_workorderservicetask_Expand,msdyn_workorderservicetask_Filter,msdyn_workorderservicetask_Fixed,msdyn_workorderservicetask_Result,msdyn_workorderservicetask_FormattedResult>;
  ts_incident_ts_workordercreationwizard: WebMappingRetrieve<ts_workordercreationwizard_Select,ts_workordercreationwizard_Expand,ts_workordercreationwizard_Filter,ts_workordercreationwizard_Fixed,ts_workordercreationwizard_Result,ts_workordercreationwizard_FormattedResult>;
}
interface WebEntitiesRetrieve {
  incidents: WebMappingRetrieve<Incident_Select,Incident_Expand,Incident_Filter,Incident_Fixed,Incident_Result,Incident_FormattedResult>;
}
interface WebEntitiesRelated {
  incidents: WebMappingRelated<Incident_RelatedOne,Incident_RelatedMany>;
}
interface WebEntitiesCUDA {
  incidents: WebMappingCUDA<Incident_Create,Incident_Update,Incident_Select>;
}
