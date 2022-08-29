interface Team_Base extends WebEntity {
  azureactivedirectoryobjectid?: string | null;
  createdon?: Date | null;
  description?: string | null;
  emailaddress?: string | null;
  exchangerate?: number | null;
  importsequencenumber?: number | null;
  isdefault?: boolean | null;
  issastokenset?: boolean | null;
  membershiptype?: team_membershiptype | null;
  modifiedon?: Date | null;
  name?: string | null;
  organizationid?: string | null;
  overriddencreatedon?: Date | null;
  processid?: string | null;
  sastoken?: string | null;
  sharelinkqualifier?: string | null;
  stageid?: string | null;
  systemmanaged?: boolean | null;
  teamid?: string | null;
  teamtype?: team_type | null;
  traversedpath?: string | null;
  versionnumber?: number | null;
}
interface Team_Relationships {
  OwningTeam_postfollows?: PostFollow_Result[] | null;
  regardingobjectid_account?: Account_Result | null;
  regardingobjectid_msdyn_workorder?: msdyn_workorder_Result | null;
  team_accounts?: Account_Result[] | null;
  team_appointment?: Appointment_Result[] | null;
  team_bookableresource?: BookableResource_Result[] | null;
  team_bookableresourcebooking?: BookableResourceBooking_Result[] | null;
  team_bookingstatus?: BookingStatus_Result[] | null;
  team_bulkoperationlog?: BulkOperationLog_Result[] | null;
  team_connections1?: Connection_Result[] | null;
  team_connections2?: Connection_Result[] | null;
  team_contacts?: Contact_Result[] | null;
  team_email?: Email_Result[] | null;
  team_incidentresolution?: IncidentResolution_Result[] | null;
  team_incidents?: Incident_Result[] | null;
  team_msdyn_customerasset?: msdyn_customerasset_Result[] | null;
  team_msdyn_customerassetcategory?: msdyn_customerassetcategory_Result[] | null;
  team_msdyn_functionallocation?: msdyn_FunctionalLocation_Result[] | null;
  team_msdyn_incidenttype?: msdyn_incidenttype_Result[] | null;
  team_msdyn_incidenttypeservicetask?: msdyn_incidenttypeservicetask_Result[] | null;
  team_msdyn_servicetasktype?: msdyn_servicetasktype_Result[] | null;
  team_msdyn_workorder?: msdyn_workorder_Result[] | null;
  team_msdyn_workorderservicetask?: msdyn_workorderservicetask_Result[] | null;
  team_ovs_finding?: ovs_Finding_Result[] | null;
  team_ovs_operation?: ovs_operation_Result[] | null;
  team_ovs_questionnaire?: ovs_Questionnaire_Result[] | null;
  team_service_appointments?: ServiceAppointment_Result[] | null;
  team_tc_tcfiscalquarter?: tc_TCFiscalQuarter_Result[] | null;
  team_tc_tcfiscalyear?: tc_TCFiscalYear_Result[] | null;
  team_ts_assessmentscorethredshots?: ts_assessmentscorethredshots_Result[] | null;
  team_ts_canceledinspectionjustification?: ts_canceledinspectionjustification_Result[] | null;
  team_ts_incompleteworkorderreason?: ts_IncompleteWorkOrderReason_Result[] | null;
  team_ts_inspectionhours?: ts_InspectionHours_Result[] | null;
  team_ts_operationactivity?: ts_OperationActivity_Result[] | null;
  team_ts_operationcontact?: ts_operationcontact_Result[] | null;
  team_ts_planningsettings?: ts_planningsettings_Result[] | null;
  team_ts_questionnaireversion?: ts_questionnaireversion_Result[] | null;
  team_ts_riskcategory?: ts_RiskCategory_Result[] | null;
  team_ts_role?: ts_role_Result[] | null;
  team_ts_workordercreationwizard?: ts_workordercreationwizard_Result[] | null;
  teammembership_association?: SystemUser_Result[] | null;
  ts_enforcementaction_team_owningteam?: ts_enforcementaction_Result[] | null;
  ts_ovs_Finding_NCATApprovingTeam_Team?: ovs_Finding_Result[] | null;
  ts_ovs_Finding_RATEApprovingTeam_Team?: ovs_Finding_Result[] | null;
}
interface Team extends Team_Base, Team_Relationships {
  administratorid_bind$systemusers?: string | null;
  businessunitid_bind$businessunits?: string | null;
  queueid_bind$queues?: string | null;
  stageid_processstage_bind$processstages?: string | null;
  transactioncurrencyid_bind$transactioncurrencies?: string | null;
  ts_Territory_bind$territories?: string | null;
}
interface Team_Create extends Team {
  associatedteamtemplateid_bind$teamtemplates?: string | null;
  regardingobjectid_account_bind$accounts?: string | null;
  regardingobjectid_knowledgearticle_bind$knowledgearticles?: string | null;
  regardingobjectid_msdyn_workorder_bind$msdyn_workorders?: string | null;
  regardingobjectid_opportunity_bind$opportunities?: string | null;
}
interface Team_Update extends Team {
}
interface Team_Select {
  administratorid_guid: WebAttribute<Team_Select, { administratorid_guid: string | null }, { administratorid_formatted?: string }>;
  azureactivedirectoryobjectid: WebAttribute<Team_Select, { azureactivedirectoryobjectid: string | null }, {  }>;
  businessunitid_guid: WebAttribute<Team_Select, { businessunitid_guid: string | null }, { businessunitid_formatted?: string }>;
  createdby_guid: WebAttribute<Team_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<Team_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<Team_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  description: WebAttribute<Team_Select, { description: string | null }, {  }>;
  emailaddress: WebAttribute<Team_Select, { emailaddress: string | null }, {  }>;
  exchangerate: WebAttribute<Team_Select, { exchangerate: number | null }, {  }>;
  importsequencenumber: WebAttribute<Team_Select, { importsequencenumber: number | null }, {  }>;
  isdefault: WebAttribute<Team_Select, { isdefault: boolean | null }, {  }>;
  issastokenset: WebAttribute<Team_Select, { issastokenset: boolean | null }, {  }>;
  membershiptype: WebAttribute<Team_Select, { membershiptype: team_membershiptype | null }, { membershiptype_formatted?: string }>;
  modifiedby_guid: WebAttribute<Team_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<Team_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<Team_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  name: WebAttribute<Team_Select, { name: string | null }, {  }>;
  organizationid: WebAttribute<Team_Select, { organizationid: string | null }, {  }>;
  overriddencreatedon: WebAttribute<Team_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  processid: WebAttribute<Team_Select, { processid: string | null }, {  }>;
  queueid_guid: WebAttribute<Team_Select, { queueid_guid: string | null }, { queueid_formatted?: string }>;
  regardingobjectid_guid: WebAttribute<Team_Select, { regardingobjectid_guid: string | null }, { regardingobjectid_formatted?: string }>;
  sastoken: WebAttribute<Team_Select, { sastoken: string | null }, {  }>;
  sharelinkqualifier: WebAttribute<Team_Select, { sharelinkqualifier: string | null }, {  }>;
  stageid: WebAttribute<Team_Select, { stageid: string | null }, {  }>;
  systemmanaged: WebAttribute<Team_Select, { systemmanaged: boolean | null }, {  }>;
  teamid: WebAttribute<Team_Select, { teamid: string | null }, {  }>;
  teamtemplateid_guid: WebAttribute<Team_Select, { teamtemplateid_guid: string | null }, { teamtemplateid_formatted?: string }>;
  teamtype: WebAttribute<Team_Select, { teamtype: team_type | null }, { teamtype_formatted?: string }>;
  transactioncurrencyid_guid: WebAttribute<Team_Select, { transactioncurrencyid_guid: string | null }, { transactioncurrencyid_formatted?: string }>;
  traversedpath: WebAttribute<Team_Select, { traversedpath: string | null }, {  }>;
  ts_territory_guid: WebAttribute<Team_Select, { ts_territory_guid: string | null }, { ts_territory_formatted?: string }>;
  versionnumber: WebAttribute<Team_Select, { versionnumber: number | null }, {  }>;
}
interface Team_Filter {
  administratorid_guid: XQW.Guid;
  azureactivedirectoryobjectid: XQW.Guid;
  businessunitid_guid: XQW.Guid;
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  description: string;
  emailaddress: string;
  exchangerate: any;
  importsequencenumber: number;
  isdefault: boolean;
  issastokenset: boolean;
  membershiptype: team_membershiptype;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  name: string;
  organizationid: XQW.Guid;
  overriddencreatedon: Date;
  processid: XQW.Guid;
  queueid_guid: XQW.Guid;
  regardingobjectid_guid: XQW.Guid;
  sastoken: string;
  sharelinkqualifier: string;
  stageid: XQW.Guid;
  systemmanaged: boolean;
  teamid: XQW.Guid;
  teamtemplateid_guid: XQW.Guid;
  teamtype: team_type;
  transactioncurrencyid_guid: XQW.Guid;
  traversedpath: string;
  ts_territory_guid: XQW.Guid;
  versionnumber: number;
}
interface Team_Expand {
  OwningTeam_postfollows: WebExpand<Team_Expand, PostFollow_Select, PostFollow_Filter, { OwningTeam_postfollows: PostFollow_Result[] }>;
  administratorid: WebExpand<Team_Expand, SystemUser_Select, SystemUser_Filter, { administratorid: SystemUser_Result }>;
  createdby: WebExpand<Team_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<Team_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<Team_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<Team_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  regardingobjectid_account: WebExpand<Team_Expand, Account_Select, Account_Filter, { regardingobjectid_account: Account_Result }>;
  regardingobjectid_msdyn_workorder: WebExpand<Team_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { regardingobjectid_msdyn_workorder: msdyn_workorder_Result }>;
  team_accounts: WebExpand<Team_Expand, Account_Select, Account_Filter, { team_accounts: Account_Result[] }>;
  team_appointment: WebExpand<Team_Expand, Appointment_Select, Appointment_Filter, { team_appointment: Appointment_Result[] }>;
  team_bookableresource: WebExpand<Team_Expand, BookableResource_Select, BookableResource_Filter, { team_bookableresource: BookableResource_Result[] }>;
  team_bookableresourcebooking: WebExpand<Team_Expand, BookableResourceBooking_Select, BookableResourceBooking_Filter, { team_bookableresourcebooking: BookableResourceBooking_Result[] }>;
  team_bookingstatus: WebExpand<Team_Expand, BookingStatus_Select, BookingStatus_Filter, { team_bookingstatus: BookingStatus_Result[] }>;
  team_bulkoperationlog: WebExpand<Team_Expand, BulkOperationLog_Select, BulkOperationLog_Filter, { team_bulkoperationlog: BulkOperationLog_Result[] }>;
  team_connections1: WebExpand<Team_Expand, Connection_Select, Connection_Filter, { team_connections1: Connection_Result[] }>;
  team_connections2: WebExpand<Team_Expand, Connection_Select, Connection_Filter, { team_connections2: Connection_Result[] }>;
  team_contacts: WebExpand<Team_Expand, Contact_Select, Contact_Filter, { team_contacts: Contact_Result[] }>;
  team_email: WebExpand<Team_Expand, Email_Select, Email_Filter, { team_email: Email_Result[] }>;
  team_incidentresolution: WebExpand<Team_Expand, IncidentResolution_Select, IncidentResolution_Filter, { team_incidentresolution: IncidentResolution_Result[] }>;
  team_incidents: WebExpand<Team_Expand, Incident_Select, Incident_Filter, { team_incidents: Incident_Result[] }>;
  team_msdyn_customerasset: WebExpand<Team_Expand, msdyn_customerasset_Select, msdyn_customerasset_Filter, { team_msdyn_customerasset: msdyn_customerasset_Result[] }>;
  team_msdyn_customerassetcategory: WebExpand<Team_Expand, msdyn_customerassetcategory_Select, msdyn_customerassetcategory_Filter, { team_msdyn_customerassetcategory: msdyn_customerassetcategory_Result[] }>;
  team_msdyn_functionallocation: WebExpand<Team_Expand, msdyn_FunctionalLocation_Select, msdyn_FunctionalLocation_Filter, { team_msdyn_functionallocation: msdyn_FunctionalLocation_Result[] }>;
  team_msdyn_incidenttype: WebExpand<Team_Expand, msdyn_incidenttype_Select, msdyn_incidenttype_Filter, { team_msdyn_incidenttype: msdyn_incidenttype_Result[] }>;
  team_msdyn_incidenttypeservicetask: WebExpand<Team_Expand, msdyn_incidenttypeservicetask_Select, msdyn_incidenttypeservicetask_Filter, { team_msdyn_incidenttypeservicetask: msdyn_incidenttypeservicetask_Result[] }>;
  team_msdyn_servicetasktype: WebExpand<Team_Expand, msdyn_servicetasktype_Select, msdyn_servicetasktype_Filter, { team_msdyn_servicetasktype: msdyn_servicetasktype_Result[] }>;
  team_msdyn_workorder: WebExpand<Team_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { team_msdyn_workorder: msdyn_workorder_Result[] }>;
  team_msdyn_workorderservicetask: WebExpand<Team_Expand, msdyn_workorderservicetask_Select, msdyn_workorderservicetask_Filter, { team_msdyn_workorderservicetask: msdyn_workorderservicetask_Result[] }>;
  team_ovs_finding: WebExpand<Team_Expand, ovs_Finding_Select, ovs_Finding_Filter, { team_ovs_finding: ovs_Finding_Result[] }>;
  team_ovs_operation: WebExpand<Team_Expand, ovs_operation_Select, ovs_operation_Filter, { team_ovs_operation: ovs_operation_Result[] }>;
  team_ovs_questionnaire: WebExpand<Team_Expand, ovs_Questionnaire_Select, ovs_Questionnaire_Filter, { team_ovs_questionnaire: ovs_Questionnaire_Result[] }>;
  team_service_appointments: WebExpand<Team_Expand, ServiceAppointment_Select, ServiceAppointment_Filter, { team_service_appointments: ServiceAppointment_Result[] }>;
  team_tc_tcfiscalquarter: WebExpand<Team_Expand, tc_TCFiscalQuarter_Select, tc_TCFiscalQuarter_Filter, { team_tc_tcfiscalquarter: tc_TCFiscalQuarter_Result[] }>;
  team_tc_tcfiscalyear: WebExpand<Team_Expand, tc_TCFiscalYear_Select, tc_TCFiscalYear_Filter, { team_tc_tcfiscalyear: tc_TCFiscalYear_Result[] }>;
  team_ts_assessmentscorethredshots: WebExpand<Team_Expand, ts_assessmentscorethredshots_Select, ts_assessmentscorethredshots_Filter, { team_ts_assessmentscorethredshots: ts_assessmentscorethredshots_Result[] }>;
  team_ts_canceledinspectionjustification: WebExpand<Team_Expand, ts_canceledinspectionjustification_Select, ts_canceledinspectionjustification_Filter, { team_ts_canceledinspectionjustification: ts_canceledinspectionjustification_Result[] }>;
  team_ts_incompleteworkorderreason: WebExpand<Team_Expand, ts_IncompleteWorkOrderReason_Select, ts_IncompleteWorkOrderReason_Filter, { team_ts_incompleteworkorderreason: ts_IncompleteWorkOrderReason_Result[] }>;
  team_ts_inspectionhours: WebExpand<Team_Expand, ts_InspectionHours_Select, ts_InspectionHours_Filter, { team_ts_inspectionhours: ts_InspectionHours_Result[] }>;
  team_ts_operationactivity: WebExpand<Team_Expand, ts_OperationActivity_Select, ts_OperationActivity_Filter, { team_ts_operationactivity: ts_OperationActivity_Result[] }>;
  team_ts_operationcontact: WebExpand<Team_Expand, ts_operationcontact_Select, ts_operationcontact_Filter, { team_ts_operationcontact: ts_operationcontact_Result[] }>;
  team_ts_planningsettings: WebExpand<Team_Expand, ts_planningsettings_Select, ts_planningsettings_Filter, { team_ts_planningsettings: ts_planningsettings_Result[] }>;
  team_ts_questionnaireversion: WebExpand<Team_Expand, ts_questionnaireversion_Select, ts_questionnaireversion_Filter, { team_ts_questionnaireversion: ts_questionnaireversion_Result[] }>;
  team_ts_riskcategory: WebExpand<Team_Expand, ts_RiskCategory_Select, ts_RiskCategory_Filter, { team_ts_riskcategory: ts_RiskCategory_Result[] }>;
  team_ts_role: WebExpand<Team_Expand, ts_role_Select, ts_role_Filter, { team_ts_role: ts_role_Result[] }>;
  team_ts_workordercreationwizard: WebExpand<Team_Expand, ts_workordercreationwizard_Select, ts_workordercreationwizard_Filter, { team_ts_workordercreationwizard: ts_workordercreationwizard_Result[] }>;
  teammembership_association: WebExpand<Team_Expand, SystemUser_Select, SystemUser_Filter, { teammembership_association: SystemUser_Result[] }>;
  ts_enforcementaction_team_owningteam: WebExpand<Team_Expand, ts_enforcementaction_Select, ts_enforcementaction_Filter, { ts_enforcementaction_team_owningteam: ts_enforcementaction_Result[] }>;
  ts_ovs_Finding_NCATApprovingTeam_Team: WebExpand<Team_Expand, ovs_Finding_Select, ovs_Finding_Filter, { ts_ovs_Finding_NCATApprovingTeam_Team: ovs_Finding_Result[] }>;
  ts_ovs_Finding_RATEApprovingTeam_Team: WebExpand<Team_Expand, ovs_Finding_Select, ovs_Finding_Filter, { ts_ovs_Finding_RATEApprovingTeam_Team: ovs_Finding_Result[] }>;
}
interface Team_FormattedResult {
  administratorid_formatted?: string;
  businessunitid_formatted?: string;
  createdby_formatted?: string;
  createdon_formatted?: string;
  createdonbehalfby_formatted?: string;
  membershiptype_formatted?: string;
  modifiedby_formatted?: string;
  modifiedon_formatted?: string;
  modifiedonbehalfby_formatted?: string;
  overriddencreatedon_formatted?: string;
  queueid_formatted?: string;
  regardingobjectid_formatted?: string;
  teamtemplateid_formatted?: string;
  teamtype_formatted?: string;
  transactioncurrencyid_formatted?: string;
  ts_territory_formatted?: string;
}
interface Team_Result extends Team_Base, Team_Relationships {
  "@odata.etag": string;
  administratorid_guid: string | null;
  businessunitid_guid: string | null;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  queueid_guid: string | null;
  regardingobjectid_guid: string | null;
  teamtemplateid_guid: string | null;
  transactioncurrencyid_guid: string | null;
  ts_territory_guid: string | null;
}
interface Team_RelatedOne {
  administratorid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  regardingobjectid_account: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
  regardingobjectid_msdyn_workorder: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
}
interface Team_RelatedMany {
  OwningTeam_postfollows: WebMappingRetrieve<PostFollow_Select,PostFollow_Expand,PostFollow_Filter,PostFollow_Fixed,PostFollow_Result,PostFollow_FormattedResult>;
  team_accounts: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
  team_appointment: WebMappingRetrieve<Appointment_Select,Appointment_Expand,Appointment_Filter,Appointment_Fixed,Appointment_Result,Appointment_FormattedResult>;
  team_bookableresource: WebMappingRetrieve<BookableResource_Select,BookableResource_Expand,BookableResource_Filter,BookableResource_Fixed,BookableResource_Result,BookableResource_FormattedResult>;
  team_bookableresourcebooking: WebMappingRetrieve<BookableResourceBooking_Select,BookableResourceBooking_Expand,BookableResourceBooking_Filter,BookableResourceBooking_Fixed,BookableResourceBooking_Result,BookableResourceBooking_FormattedResult>;
  team_bookingstatus: WebMappingRetrieve<BookingStatus_Select,BookingStatus_Expand,BookingStatus_Filter,BookingStatus_Fixed,BookingStatus_Result,BookingStatus_FormattedResult>;
  team_bulkoperationlog: WebMappingRetrieve<BulkOperationLog_Select,BulkOperationLog_Expand,BulkOperationLog_Filter,BulkOperationLog_Fixed,BulkOperationLog_Result,BulkOperationLog_FormattedResult>;
  team_connections1: WebMappingRetrieve<Connection_Select,Connection_Expand,Connection_Filter,Connection_Fixed,Connection_Result,Connection_FormattedResult>;
  team_connections2: WebMappingRetrieve<Connection_Select,Connection_Expand,Connection_Filter,Connection_Fixed,Connection_Result,Connection_FormattedResult>;
  team_contacts: WebMappingRetrieve<Contact_Select,Contact_Expand,Contact_Filter,Contact_Fixed,Contact_Result,Contact_FormattedResult>;
  team_email: WebMappingRetrieve<Email_Select,Email_Expand,Email_Filter,Email_Fixed,Email_Result,Email_FormattedResult>;
  team_incidentresolution: WebMappingRetrieve<IncidentResolution_Select,IncidentResolution_Expand,IncidentResolution_Filter,IncidentResolution_Fixed,IncidentResolution_Result,IncidentResolution_FormattedResult>;
  team_incidents: WebMappingRetrieve<Incident_Select,Incident_Expand,Incident_Filter,Incident_Fixed,Incident_Result,Incident_FormattedResult>;
  team_msdyn_customerasset: WebMappingRetrieve<msdyn_customerasset_Select,msdyn_customerasset_Expand,msdyn_customerasset_Filter,msdyn_customerasset_Fixed,msdyn_customerasset_Result,msdyn_customerasset_FormattedResult>;
  team_msdyn_customerassetcategory: WebMappingRetrieve<msdyn_customerassetcategory_Select,msdyn_customerassetcategory_Expand,msdyn_customerassetcategory_Filter,msdyn_customerassetcategory_Fixed,msdyn_customerassetcategory_Result,msdyn_customerassetcategory_FormattedResult>;
  team_msdyn_functionallocation: WebMappingRetrieve<msdyn_FunctionalLocation_Select,msdyn_FunctionalLocation_Expand,msdyn_FunctionalLocation_Filter,msdyn_FunctionalLocation_Fixed,msdyn_FunctionalLocation_Result,msdyn_FunctionalLocation_FormattedResult>;
  team_msdyn_incidenttype: WebMappingRetrieve<msdyn_incidenttype_Select,msdyn_incidenttype_Expand,msdyn_incidenttype_Filter,msdyn_incidenttype_Fixed,msdyn_incidenttype_Result,msdyn_incidenttype_FormattedResult>;
  team_msdyn_incidenttypeservicetask: WebMappingRetrieve<msdyn_incidenttypeservicetask_Select,msdyn_incidenttypeservicetask_Expand,msdyn_incidenttypeservicetask_Filter,msdyn_incidenttypeservicetask_Fixed,msdyn_incidenttypeservicetask_Result,msdyn_incidenttypeservicetask_FormattedResult>;
  team_msdyn_servicetasktype: WebMappingRetrieve<msdyn_servicetasktype_Select,msdyn_servicetasktype_Expand,msdyn_servicetasktype_Filter,msdyn_servicetasktype_Fixed,msdyn_servicetasktype_Result,msdyn_servicetasktype_FormattedResult>;
  team_msdyn_workorder: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
  team_msdyn_workorderservicetask: WebMappingRetrieve<msdyn_workorderservicetask_Select,msdyn_workorderservicetask_Expand,msdyn_workorderservicetask_Filter,msdyn_workorderservicetask_Fixed,msdyn_workorderservicetask_Result,msdyn_workorderservicetask_FormattedResult>;
  team_ovs_finding: WebMappingRetrieve<ovs_Finding_Select,ovs_Finding_Expand,ovs_Finding_Filter,ovs_Finding_Fixed,ovs_Finding_Result,ovs_Finding_FormattedResult>;
  team_ovs_operation: WebMappingRetrieve<ovs_operation_Select,ovs_operation_Expand,ovs_operation_Filter,ovs_operation_Fixed,ovs_operation_Result,ovs_operation_FormattedResult>;
  team_ovs_questionnaire: WebMappingRetrieve<ovs_Questionnaire_Select,ovs_Questionnaire_Expand,ovs_Questionnaire_Filter,ovs_Questionnaire_Fixed,ovs_Questionnaire_Result,ovs_Questionnaire_FormattedResult>;
  team_service_appointments: WebMappingRetrieve<ServiceAppointment_Select,ServiceAppointment_Expand,ServiceAppointment_Filter,ServiceAppointment_Fixed,ServiceAppointment_Result,ServiceAppointment_FormattedResult>;
  team_tc_tcfiscalquarter: WebMappingRetrieve<tc_TCFiscalQuarter_Select,tc_TCFiscalQuarter_Expand,tc_TCFiscalQuarter_Filter,tc_TCFiscalQuarter_Fixed,tc_TCFiscalQuarter_Result,tc_TCFiscalQuarter_FormattedResult>;
  team_tc_tcfiscalyear: WebMappingRetrieve<tc_TCFiscalYear_Select,tc_TCFiscalYear_Expand,tc_TCFiscalYear_Filter,tc_TCFiscalYear_Fixed,tc_TCFiscalYear_Result,tc_TCFiscalYear_FormattedResult>;
  team_ts_assessmentscorethredshots: WebMappingRetrieve<ts_assessmentscorethredshots_Select,ts_assessmentscorethredshots_Expand,ts_assessmentscorethredshots_Filter,ts_assessmentscorethredshots_Fixed,ts_assessmentscorethredshots_Result,ts_assessmentscorethredshots_FormattedResult>;
  team_ts_canceledinspectionjustification: WebMappingRetrieve<ts_canceledinspectionjustification_Select,ts_canceledinspectionjustification_Expand,ts_canceledinspectionjustification_Filter,ts_canceledinspectionjustification_Fixed,ts_canceledinspectionjustification_Result,ts_canceledinspectionjustification_FormattedResult>;
  team_ts_incompleteworkorderreason: WebMappingRetrieve<ts_IncompleteWorkOrderReason_Select,ts_IncompleteWorkOrderReason_Expand,ts_IncompleteWorkOrderReason_Filter,ts_IncompleteWorkOrderReason_Fixed,ts_IncompleteWorkOrderReason_Result,ts_IncompleteWorkOrderReason_FormattedResult>;
  team_ts_inspectionhours: WebMappingRetrieve<ts_InspectionHours_Select,ts_InspectionHours_Expand,ts_InspectionHours_Filter,ts_InspectionHours_Fixed,ts_InspectionHours_Result,ts_InspectionHours_FormattedResult>;
  team_ts_operationactivity: WebMappingRetrieve<ts_OperationActivity_Select,ts_OperationActivity_Expand,ts_OperationActivity_Filter,ts_OperationActivity_Fixed,ts_OperationActivity_Result,ts_OperationActivity_FormattedResult>;
  team_ts_operationcontact: WebMappingRetrieve<ts_operationcontact_Select,ts_operationcontact_Expand,ts_operationcontact_Filter,ts_operationcontact_Fixed,ts_operationcontact_Result,ts_operationcontact_FormattedResult>;
  team_ts_planningsettings: WebMappingRetrieve<ts_planningsettings_Select,ts_planningsettings_Expand,ts_planningsettings_Filter,ts_planningsettings_Fixed,ts_planningsettings_Result,ts_planningsettings_FormattedResult>;
  team_ts_questionnaireversion: WebMappingRetrieve<ts_questionnaireversion_Select,ts_questionnaireversion_Expand,ts_questionnaireversion_Filter,ts_questionnaireversion_Fixed,ts_questionnaireversion_Result,ts_questionnaireversion_FormattedResult>;
  team_ts_riskcategory: WebMappingRetrieve<ts_RiskCategory_Select,ts_RiskCategory_Expand,ts_RiskCategory_Filter,ts_RiskCategory_Fixed,ts_RiskCategory_Result,ts_RiskCategory_FormattedResult>;
  team_ts_role: WebMappingRetrieve<ts_role_Select,ts_role_Expand,ts_role_Filter,ts_role_Fixed,ts_role_Result,ts_role_FormattedResult>;
  team_ts_workordercreationwizard: WebMappingRetrieve<ts_workordercreationwizard_Select,ts_workordercreationwizard_Expand,ts_workordercreationwizard_Filter,ts_workordercreationwizard_Fixed,ts_workordercreationwizard_Result,ts_workordercreationwizard_FormattedResult>;
  teammembership_association: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_enforcementaction_team_owningteam: WebMappingRetrieve<ts_enforcementaction_Select,ts_enforcementaction_Expand,ts_enforcementaction_Filter,ts_enforcementaction_Fixed,ts_enforcementaction_Result,ts_enforcementaction_FormattedResult>;
  ts_ovs_Finding_NCATApprovingTeam_Team: WebMappingRetrieve<ovs_Finding_Select,ovs_Finding_Expand,ovs_Finding_Filter,ovs_Finding_Fixed,ovs_Finding_Result,ovs_Finding_FormattedResult>;
  ts_ovs_Finding_RATEApprovingTeam_Team: WebMappingRetrieve<ovs_Finding_Select,ovs_Finding_Expand,ovs_Finding_Filter,ovs_Finding_Fixed,ovs_Finding_Result,ovs_Finding_FormattedResult>;
}
interface WebEntitiesRetrieve {
  teams: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
}
interface WebEntitiesRelated {
  teams: WebMappingRelated<Team_RelatedOne,Team_RelatedMany>;
}
interface WebEntitiesCUDA {
  teams: WebMappingCUDA<Team_Create,Team_Update,Team_Select>;
}
