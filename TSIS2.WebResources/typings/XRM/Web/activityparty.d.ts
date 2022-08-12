interface ActivityParty_Base extends WebEntity {
  activitypartyid?: string | null;
  addressused?: string | null;
  addressusedemailcolumnnumber?: number | null;
  donotemail?: boolean | null;
  donotfax?: boolean | null;
  donotphone?: boolean | null;
  donotpostalmail?: boolean | null;
  effort?: number | null;
  exchangeentryid?: string | null;
  instancetypecode?: activityparty_instancetypecode | null;
  ispartydeleted?: boolean | null;
  owningbusinessunit?: string | null;
  owninguser?: string | null;
  participationtypemask?: activityparty_participationtypemask | null;
  scheduledend?: Date | null;
  scheduledstart?: Date | null;
  versionnumber?: number | null;
}
interface ActivityParty_Relationships {
  activityid_appointment?: Appointment_Result | null;
  activityid_email?: Email_Result | null;
  activityid_incidentresolution?: IncidentResolution_Result | null;
  activityid_serviceappointment?: ServiceAppointment_Result | null;
  partyid_account?: Account_Result | null;
  partyid_contact?: Contact_Result | null;
  partyid_incident?: Incident_Result | null;
  partyid_systemuser?: SystemUser_Result | null;
}
interface ActivityParty extends ActivityParty_Base, ActivityParty_Relationships {
  activityid_activitypointer_bind$activitypointers?: string | null;
  activityid_appointment_bind$appointments?: string | null;
  activityid_campaignactivity_bind$campaignactivities?: string | null;
  activityid_campaignresponse_bind$campaignresponses?: string | null;
  activityid_chat_activityparty_bind$chats?: string | null;
  activityid_email_bind$emails?: string | null;
  activityid_fax_bind$faxes?: string | null;
  activityid_incidentresolution_bind$incidentresolutions?: string | null;
  activityid_letter_bind$letters?: string | null;
  activityid_msdyn_bookingalert_activityparty_bind$msdyn_bookingalerts?: string | null;
  activityid_msfp_alert_activityparty_bind$msfp_alerts?: string | null;
  activityid_msfp_surveyinvite_activityparty_bind$msfp_surveyinvites?: string | null;
  activityid_msfp_surveyresponse_activityparty_bind$msfp_surveyresponses?: string | null;
  activityid_opportunityclose_bind$opportunitycloses?: string | null;
  activityid_orderclose_bind$ordercloses?: string | null;
  activityid_phonecall_bind$phonecalls?: string | null;
  activityid_quoteclose_bind$quotecloses?: string | null;
  activityid_recurringappointmentmaster_bind$recurringappointmentmasters?: string | null;
  activityid_serviceappointment_bind$serviceappointments?: string | null;
  activityid_socialactivity_bind$socialactivities?: string | null;
  activityid_task_bind$tasks?: string | null;
  activityid_ts_enforcementaction_activityparty_bind$ts_enforcementactions?: string | null;
  activityid_ts_interview_activityparty_bind$ts_interviews?: string | null;
  partyid_account_bind$accounts?: string | null;
  partyid_bulkoperation_bind$bulkoperations?: string | null;
  partyid_campaign_bind$campaigns?: string | null;
  partyid_campaignactivity_bind$campaignactivities?: string | null;
  partyid_contact_bind$contacts?: string | null;
  partyid_contract_bind$contracts?: string | null;
  partyid_entitlement_bind$entitlements?: string | null;
  partyid_equipment_bind$equipments?: string | null;
  partyid_incident_bind$incidents?: string | null;
  partyid_invoice_bind$invoices?: string | null;
  partyid_knowledgearticle_bind$knowledgearticles?: string | null;
  partyid_lead_bind$leads?: string | null;
  partyid_msdyn_salessuggestion_bind$msdyn_salessuggestions?: string | null;
  partyid_opportunity_bind$opportunities?: string | null;
  partyid_queue_bind$queues?: string | null;
  partyid_quote_bind$quotes?: string | null;
  partyid_salesorder_bind$salesorders?: string | null;
  partyid_systemuser_bind$systemusers?: string | null;
  resourcespecid_bind$resourcespecs?: string | null;
}
interface ActivityParty_Create extends ActivityParty {
}
interface ActivityParty_Update extends ActivityParty {
}
interface ActivityParty_Select {
  activityid_guid: WebAttribute<ActivityParty_Select, { activityid_guid: string | null }, { activityid_formatted?: string }>;
  activitypartyid: WebAttribute<ActivityParty_Select, { activitypartyid: string | null }, {  }>;
  addressused: WebAttribute<ActivityParty_Select, { addressused: string | null }, {  }>;
  addressusedemailcolumnnumber: WebAttribute<ActivityParty_Select, { addressusedemailcolumnnumber: number | null }, {  }>;
  donotemail: WebAttribute<ActivityParty_Select, { donotemail: boolean | null }, {  }>;
  donotfax: WebAttribute<ActivityParty_Select, { donotfax: boolean | null }, {  }>;
  donotphone: WebAttribute<ActivityParty_Select, { donotphone: boolean | null }, {  }>;
  donotpostalmail: WebAttribute<ActivityParty_Select, { donotpostalmail: boolean | null }, {  }>;
  effort: WebAttribute<ActivityParty_Select, { effort: number | null }, {  }>;
  exchangeentryid: WebAttribute<ActivityParty_Select, { exchangeentryid: string | null }, {  }>;
  instancetypecode: WebAttribute<ActivityParty_Select, { instancetypecode: activityparty_instancetypecode | null }, { instancetypecode_formatted?: string }>;
  ispartydeleted: WebAttribute<ActivityParty_Select, { ispartydeleted: boolean | null }, {  }>;
  ownerid_guid: WebAttribute<ActivityParty_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit: WebAttribute<ActivityParty_Select, { owningbusinessunit: string | null }, {  }>;
  owninguser: WebAttribute<ActivityParty_Select, { owninguser: string | null }, {  }>;
  participationtypemask: WebAttribute<ActivityParty_Select, { participationtypemask: activityparty_participationtypemask | null }, { participationtypemask_formatted?: string }>;
  partyid_guid: WebAttribute<ActivityParty_Select, { partyid_guid: string | null }, { partyid_formatted?: string }>;
  resourcespecid_guid: WebAttribute<ActivityParty_Select, { resourcespecid_guid: string | null }, { resourcespecid_formatted?: string }>;
  scheduledend: WebAttribute<ActivityParty_Select, { scheduledend: Date | null }, { scheduledend_formatted?: string }>;
  scheduledstart: WebAttribute<ActivityParty_Select, { scheduledstart: Date | null }, { scheduledstart_formatted?: string }>;
  versionnumber: WebAttribute<ActivityParty_Select, { versionnumber: number | null }, {  }>;
}
interface ActivityParty_Filter {
  activityid_guid: XQW.Guid;
  activitypartyid: XQW.Guid;
  addressused: string;
  addressusedemailcolumnnumber: number;
  donotemail: boolean;
  donotfax: boolean;
  donotphone: boolean;
  donotpostalmail: boolean;
  effort: number;
  exchangeentryid: string;
  instancetypecode: activityparty_instancetypecode;
  ispartydeleted: boolean;
  ownerid_guid: XQW.Guid;
  owningbusinessunit: XQW.Guid;
  owninguser: XQW.Guid;
  participationtypemask: activityparty_participationtypemask;
  partyid_guid: XQW.Guid;
  resourcespecid_guid: XQW.Guid;
  scheduledend: Date;
  scheduledstart: Date;
  versionnumber: number;
}
interface ActivityParty_Expand {
  activityid_appointment: WebExpand<ActivityParty_Expand, Appointment_Select, Appointment_Filter, { activityid_appointment: Appointment_Result }>;
  activityid_email: WebExpand<ActivityParty_Expand, Email_Select, Email_Filter, { activityid_email: Email_Result }>;
  activityid_incidentresolution: WebExpand<ActivityParty_Expand, IncidentResolution_Select, IncidentResolution_Filter, { activityid_incidentresolution: IncidentResolution_Result }>;
  activityid_serviceappointment: WebExpand<ActivityParty_Expand, ServiceAppointment_Select, ServiceAppointment_Filter, { activityid_serviceappointment: ServiceAppointment_Result }>;
  partyid_account: WebExpand<ActivityParty_Expand, Account_Select, Account_Filter, { partyid_account: Account_Result }>;
  partyid_contact: WebExpand<ActivityParty_Expand, Contact_Select, Contact_Filter, { partyid_contact: Contact_Result }>;
  partyid_incident: WebExpand<ActivityParty_Expand, Incident_Select, Incident_Filter, { partyid_incident: Incident_Result }>;
  partyid_systemuser: WebExpand<ActivityParty_Expand, SystemUser_Select, SystemUser_Filter, { partyid_systemuser: SystemUser_Result }>;
}
interface ActivityParty_FormattedResult {
  activityid_formatted?: string;
  instancetypecode_formatted?: string;
  ownerid_formatted?: string;
  participationtypemask_formatted?: string;
  partyid_formatted?: string;
  resourcespecid_formatted?: string;
  scheduledend_formatted?: string;
  scheduledstart_formatted?: string;
}
interface ActivityParty_Result extends ActivityParty_Base, ActivityParty_Relationships {
  "@odata.etag": string;
  activityid_guid: string | null;
  ownerid_guid: string | null;
  partyid_guid: string | null;
  resourcespecid_guid: string | null;
}
interface ActivityParty_RelatedOne {
  activityid_appointment: WebMappingRetrieve<Appointment_Select,Appointment_Expand,Appointment_Filter,Appointment_Fixed,Appointment_Result,Appointment_FormattedResult>;
  activityid_email: WebMappingRetrieve<Email_Select,Email_Expand,Email_Filter,Email_Fixed,Email_Result,Email_FormattedResult>;
  activityid_incidentresolution: WebMappingRetrieve<IncidentResolution_Select,IncidentResolution_Expand,IncidentResolution_Filter,IncidentResolution_Fixed,IncidentResolution_Result,IncidentResolution_FormattedResult>;
  activityid_serviceappointment: WebMappingRetrieve<ServiceAppointment_Select,ServiceAppointment_Expand,ServiceAppointment_Filter,ServiceAppointment_Fixed,ServiceAppointment_Result,ServiceAppointment_FormattedResult>;
  partyid_account: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
  partyid_contact: WebMappingRetrieve<Contact_Select,Contact_Expand,Contact_Filter,Contact_Fixed,Contact_Result,Contact_FormattedResult>;
  partyid_incident: WebMappingRetrieve<Incident_Select,Incident_Expand,Incident_Filter,Incident_Fixed,Incident_Result,Incident_FormattedResult>;
  partyid_systemuser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface ActivityParty_RelatedMany {
}
interface WebEntitiesRetrieve {
  activityparties: WebMappingRetrieve<ActivityParty_Select,ActivityParty_Expand,ActivityParty_Filter,ActivityParty_Fixed,ActivityParty_Result,ActivityParty_FormattedResult>;
}
interface WebEntitiesRelated {
  activityparties: WebMappingRelated<ActivityParty_RelatedOne,ActivityParty_RelatedMany>;
}
interface WebEntitiesCUDA {
  activityparties: WebMappingCUDA<ActivityParty_Create,ActivityParty_Update,ActivityParty_Select>;
}
