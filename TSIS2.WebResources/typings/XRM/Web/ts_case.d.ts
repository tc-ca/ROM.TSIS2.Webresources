interface ts_case_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_case_statecode | null;
  statuscode?: ts_case_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_caseid?: string | null;
  ts_dateofinspection1?: Date | null;
  ts_dateofinspection2?: Date | null;
  ts_description?: string | null;
  ts_emailaddress?: string | null;
  ts_incident?: ts_yesno | null;
  ts_name?: string | null;
  ts_notes?: string | null;
  ts_overtime?: number | null;
  ts_quarterofreportinganddocumentation?: ts_quarter | null;
  ts_quarteroftraveltime?: ts_quarter | null;
  ts_ticketnumber?: string | null;
  ts_traveltime?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_case_Relationships {
  ts_Customer?: Account_Result | null;
  ts_ExistingCase?: ts_case_Result | null;
  ts_InspectionType1?: msdyn_incidenttype_Result | null;
  ts_InspectionType2?: msdyn_incidenttype_Result | null;
  ts_OperationType?: ovs_operationtype_Result | null;
  ts_Site?: ts_site_Result | null;
  ts_case_Appointments?: Appointment_Result[] | null;
  ts_case_Emails?: Email_Result[] | null;
  ts_case_ServiceAppointments?: ServiceAppointment_Result[] | null;
  ts_case_connections1?: Connection_Result[] | null;
  ts_case_connections2?: Connection_Result[] | null;
  ts_case_ts_enforcementactions?: ts_enforcementaction_Result[] | null;
  ts_ts_case_ts_case_ExistingCase?: ts_case_Result[] | null;
}
interface ts_case extends ts_case_Base, ts_case_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_Country_bind$tc_countries?: string | null;
  ts_Customer_bind$accounts?: string | null;
  ts_ExistingCase_bind$ts_cases?: string | null;
  ts_InspectionType1_bind$msdyn_incidenttypes?: string | null;
  ts_InspectionType2_bind$msdyn_incidenttypes?: string | null;
  ts_OperationType_bind$ovs_operationtypes?: string | null;
  ts_Region_bind$ts_regions?: string | null;
  ts_Site_bind$ts_sites?: string | null;
  ts_TradeNameId_bind$ts_tradenames?: string | null;
  ts_primarycontactid_bind$contacts?: string | null;
}
interface ts_case_Create extends ts_case {
}
interface ts_case_Update extends ts_case {
}
interface ts_case_Select {
  createdby_guid: WebAttribute<ts_case_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_case_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_case_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_case_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_case_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_case_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_case_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_case_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_case_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_case_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_case_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_case_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_case_Select, { statecode: ts_case_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_case_Select, { statuscode: ts_case_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_case_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_caseid: WebAttribute<ts_case_Select, { ts_caseid: string | null }, {  }>;
  ts_country_guid: WebAttribute<ts_case_Select, { ts_country_guid: string | null }, { ts_country_formatted?: string }>;
  ts_customer_guid: WebAttribute<ts_case_Select, { ts_customer_guid: string | null }, { ts_customer_formatted?: string }>;
  ts_dateofinspection1: WebAttribute<ts_case_Select, { ts_dateofinspection1: Date | null }, { ts_dateofinspection1_formatted?: string }>;
  ts_dateofinspection2: WebAttribute<ts_case_Select, { ts_dateofinspection2: Date | null }, { ts_dateofinspection2_formatted?: string }>;
  ts_description: WebAttribute<ts_case_Select, { ts_description: string | null }, {  }>;
  ts_emailaddress: WebAttribute<ts_case_Select, { ts_emailaddress: string | null }, {  }>;
  ts_existingcase_guid: WebAttribute<ts_case_Select, { ts_existingcase_guid: string | null }, { ts_existingcase_formatted?: string }>;
  ts_incident: WebAttribute<ts_case_Select, { ts_incident: ts_yesno | null }, { ts_incident_formatted?: string }>;
  ts_inspectiontype1_guid: WebAttribute<ts_case_Select, { ts_inspectiontype1_guid: string | null }, { ts_inspectiontype1_formatted?: string }>;
  ts_inspectiontype2_guid: WebAttribute<ts_case_Select, { ts_inspectiontype2_guid: string | null }, { ts_inspectiontype2_formatted?: string }>;
  ts_name: WebAttribute<ts_case_Select, { ts_name: string | null }, {  }>;
  ts_notes: WebAttribute<ts_case_Select, { ts_notes: string | null }, {  }>;
  ts_operationtype_guid: WebAttribute<ts_case_Select, { ts_operationtype_guid: string | null }, { ts_operationtype_formatted?: string }>;
  ts_overtime: WebAttribute<ts_case_Select, { ts_overtime: number | null }, {  }>;
  ts_primarycontactid_guid: WebAttribute<ts_case_Select, { ts_primarycontactid_guid: string | null }, { ts_primarycontactid_formatted?: string }>;
  ts_quarterofreportinganddocumentation: WebAttribute<ts_case_Select, { ts_quarterofreportinganddocumentation: ts_quarter | null }, { ts_quarterofreportinganddocumentation_formatted?: string }>;
  ts_quarteroftraveltime: WebAttribute<ts_case_Select, { ts_quarteroftraveltime: ts_quarter | null }, { ts_quarteroftraveltime_formatted?: string }>;
  ts_region_guid: WebAttribute<ts_case_Select, { ts_region_guid: string | null }, { ts_region_formatted?: string }>;
  ts_site_guid: WebAttribute<ts_case_Select, { ts_site_guid: string | null }, { ts_site_formatted?: string }>;
  ts_ticketnumber: WebAttribute<ts_case_Select, { ts_ticketnumber: string | null }, {  }>;
  ts_tradenameid_guid: WebAttribute<ts_case_Select, { ts_tradenameid_guid: string | null }, { ts_tradenameid_formatted?: string }>;
  ts_traveltime: WebAttribute<ts_case_Select, { ts_traveltime: number | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<ts_case_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_case_Select, { versionnumber: number | null }, {  }>;
}
interface ts_case_Filter {
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  importsequencenumber: number;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  overriddencreatedon: Date;
  ownerid_guid: XQW.Guid;
  owningbusinessunit_guid: XQW.Guid;
  owningteam_guid: XQW.Guid;
  owninguser_guid: XQW.Guid;
  statecode: ts_case_statecode;
  statuscode: ts_case_statuscode;
  timezoneruleversionnumber: number;
  ts_caseid: XQW.Guid;
  ts_country_guid: XQW.Guid;
  ts_customer_guid: XQW.Guid;
  ts_dateofinspection1: Date;
  ts_dateofinspection2: Date;
  ts_description: string;
  ts_emailaddress: string;
  ts_existingcase_guid: XQW.Guid;
  ts_incident: ts_yesno;
  ts_inspectiontype1_guid: XQW.Guid;
  ts_inspectiontype2_guid: XQW.Guid;
  ts_name: string;
  ts_notes: string;
  ts_operationtype_guid: XQW.Guid;
  ts_overtime: any;
  ts_primarycontactid_guid: XQW.Guid;
  ts_quarterofreportinganddocumentation: ts_quarter;
  ts_quarteroftraveltime: ts_quarter;
  ts_region_guid: XQW.Guid;
  ts_site_guid: XQW.Guid;
  ts_ticketnumber: string;
  ts_tradenameid_guid: XQW.Guid;
  ts_traveltime: any;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_case_Expand {
  createdby: WebExpand<ts_case_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_case_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_case_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_case_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_case_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningbusinessunit: WebExpand<ts_case_Expand, BusinessUnit_Select, BusinessUnit_Filter, { owningbusinessunit: BusinessUnit_Result }>;
  owningteam: WebExpand<ts_case_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ts_case_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_Customer: WebExpand<ts_case_Expand, Account_Select, Account_Filter, { ts_Customer: Account_Result }>;
  ts_ExistingCase: WebExpand<ts_case_Expand, ts_case_Select, ts_case_Filter, { ts_ExistingCase: ts_case_Result }>;
  ts_InspectionType1: WebExpand<ts_case_Expand, msdyn_incidenttype_Select, msdyn_incidenttype_Filter, { ts_InspectionType1: msdyn_incidenttype_Result }>;
  ts_InspectionType2: WebExpand<ts_case_Expand, msdyn_incidenttype_Select, msdyn_incidenttype_Filter, { ts_InspectionType2: msdyn_incidenttype_Result }>;
  ts_OperationType: WebExpand<ts_case_Expand, ovs_operationtype_Select, ovs_operationtype_Filter, { ts_OperationType: ovs_operationtype_Result }>;
  ts_Site: WebExpand<ts_case_Expand, ts_site_Select, ts_site_Filter, { ts_Site: ts_site_Result }>;
  ts_case_Appointments: WebExpand<ts_case_Expand, Appointment_Select, Appointment_Filter, { ts_case_Appointments: Appointment_Result[] }>;
  ts_case_Emails: WebExpand<ts_case_Expand, Email_Select, Email_Filter, { ts_case_Emails: Email_Result[] }>;
  ts_case_ServiceAppointments: WebExpand<ts_case_Expand, ServiceAppointment_Select, ServiceAppointment_Filter, { ts_case_ServiceAppointments: ServiceAppointment_Result[] }>;
  ts_case_connections1: WebExpand<ts_case_Expand, Connection_Select, Connection_Filter, { ts_case_connections1: Connection_Result[] }>;
  ts_case_connections2: WebExpand<ts_case_Expand, Connection_Select, Connection_Filter, { ts_case_connections2: Connection_Result[] }>;
  ts_case_ts_enforcementactions: WebExpand<ts_case_Expand, ts_enforcementaction_Select, ts_enforcementaction_Filter, { ts_case_ts_enforcementactions: ts_enforcementaction_Result[] }>;
  ts_primarycontactid: WebExpand<ts_case_Expand, Contact_Select, Contact_Filter, { ts_primarycontactid: Contact_Result }>;
  ts_ts_case_ts_case_ExistingCase: WebExpand<ts_case_Expand, ts_case_Select, ts_case_Filter, { ts_ts_case_ts_case_ExistingCase: ts_case_Result[] }>;
}
interface ts_case_FormattedResult {
  createdby_formatted?: string;
  createdon_formatted?: string;
  createdonbehalfby_formatted?: string;
  modifiedby_formatted?: string;
  modifiedon_formatted?: string;
  modifiedonbehalfby_formatted?: string;
  overriddencreatedon_formatted?: string;
  ownerid_formatted?: string;
  owningbusinessunit_formatted?: string;
  owningteam_formatted?: string;
  owninguser_formatted?: string;
  statecode_formatted?: string;
  statuscode_formatted?: string;
  ts_country_formatted?: string;
  ts_customer_formatted?: string;
  ts_dateofinspection1_formatted?: string;
  ts_dateofinspection2_formatted?: string;
  ts_existingcase_formatted?: string;
  ts_incident_formatted?: string;
  ts_inspectiontype1_formatted?: string;
  ts_inspectiontype2_formatted?: string;
  ts_operationtype_formatted?: string;
  ts_primarycontactid_formatted?: string;
  ts_quarterofreportinganddocumentation_formatted?: string;
  ts_quarteroftraveltime_formatted?: string;
  ts_region_formatted?: string;
  ts_site_formatted?: string;
  ts_tradenameid_formatted?: string;
}
interface ts_case_Result extends ts_case_Base, ts_case_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
  ts_country_guid: string | null;
  ts_customer_guid: string | null;
  ts_existingcase_guid: string | null;
  ts_inspectiontype1_guid: string | null;
  ts_inspectiontype2_guid: string | null;
  ts_operationtype_guid: string | null;
  ts_primarycontactid_guid: string | null;
  ts_region_guid: string | null;
  ts_site_guid: string | null;
  ts_tradenameid_guid: string | null;
}
interface ts_case_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningbusinessunit: WebMappingRetrieve<BusinessUnit_Select,BusinessUnit_Expand,BusinessUnit_Filter,BusinessUnit_Fixed,BusinessUnit_Result,BusinessUnit_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_Customer: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
  ts_ExistingCase: WebMappingRetrieve<ts_case_Select,ts_case_Expand,ts_case_Filter,ts_case_Fixed,ts_case_Result,ts_case_FormattedResult>;
  ts_InspectionType1: WebMappingRetrieve<msdyn_incidenttype_Select,msdyn_incidenttype_Expand,msdyn_incidenttype_Filter,msdyn_incidenttype_Fixed,msdyn_incidenttype_Result,msdyn_incidenttype_FormattedResult>;
  ts_InspectionType2: WebMappingRetrieve<msdyn_incidenttype_Select,msdyn_incidenttype_Expand,msdyn_incidenttype_Filter,msdyn_incidenttype_Fixed,msdyn_incidenttype_Result,msdyn_incidenttype_FormattedResult>;
  ts_OperationType: WebMappingRetrieve<ovs_operationtype_Select,ovs_operationtype_Expand,ovs_operationtype_Filter,ovs_operationtype_Fixed,ovs_operationtype_Result,ovs_operationtype_FormattedResult>;
  ts_Site: WebMappingRetrieve<ts_site_Select,ts_site_Expand,ts_site_Filter,ts_site_Fixed,ts_site_Result,ts_site_FormattedResult>;
  ts_primarycontactid: WebMappingRetrieve<Contact_Select,Contact_Expand,Contact_Filter,Contact_Fixed,Contact_Result,Contact_FormattedResult>;
}
interface ts_case_RelatedMany {
  ts_case_Appointments: WebMappingRetrieve<Appointment_Select,Appointment_Expand,Appointment_Filter,Appointment_Fixed,Appointment_Result,Appointment_FormattedResult>;
  ts_case_Emails: WebMappingRetrieve<Email_Select,Email_Expand,Email_Filter,Email_Fixed,Email_Result,Email_FormattedResult>;
  ts_case_ServiceAppointments: WebMappingRetrieve<ServiceAppointment_Select,ServiceAppointment_Expand,ServiceAppointment_Filter,ServiceAppointment_Fixed,ServiceAppointment_Result,ServiceAppointment_FormattedResult>;
  ts_case_connections1: WebMappingRetrieve<Connection_Select,Connection_Expand,Connection_Filter,Connection_Fixed,Connection_Result,Connection_FormattedResult>;
  ts_case_connections2: WebMappingRetrieve<Connection_Select,Connection_Expand,Connection_Filter,Connection_Fixed,Connection_Result,Connection_FormattedResult>;
  ts_case_ts_enforcementactions: WebMappingRetrieve<ts_enforcementaction_Select,ts_enforcementaction_Expand,ts_enforcementaction_Filter,ts_enforcementaction_Fixed,ts_enforcementaction_Result,ts_enforcementaction_FormattedResult>;
  ts_ts_case_ts_case_ExistingCase: WebMappingRetrieve<ts_case_Select,ts_case_Expand,ts_case_Filter,ts_case_Fixed,ts_case_Result,ts_case_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_cases: WebMappingRetrieve<ts_case_Select,ts_case_Expand,ts_case_Filter,ts_case_Fixed,ts_case_Result,ts_case_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_cases: WebMappingRelated<ts_case_RelatedOne,ts_case_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_cases: WebMappingCUDA<ts_case_Create,ts_case_Update,ts_case_Select>;
}
