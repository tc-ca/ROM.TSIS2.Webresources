interface ts_EnforcementAction_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_enforcementaction_statecode | null;
  statuscode?: ts_enforcementaction_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_comments?: string | null;
  ts_copyofreceipt?: string | null;
  ts_enforcementactionid?: string | null;
  ts_enforcementactionnumber?: string | null;
  ts_individualposition?: string | null;
  ts_methodofservice?: ts_methodofservice | null;
  ts_name?: string | null;
  ts_timeanddateofservice?: Date | null;
  ts_type?: ts_type | null;
  ts_verbalwarningdate?: Date | null;
  ts_verbalwarninglocation?: ts_verbalwarninglocation | null;
  ts_verbalwarninglocationother?: string | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_EnforcementAction_Relationships {
  ts_AuthorizedRepresentative?: Contact_Result | null;
  ts_Case?: Incident_Result | null;
  ts_Company?: Account_Result | null;
  ts_EnforcementAction_ts_EnforcementAction?: ovs_Finding_Result[] | null;
  ts_VerbalWarningGivenTo?: Contact_Result | null;
  ts_enforcementaction_Appointments?: Appointment_Result[] | null;
  ts_enforcementaction_ServiceAppointments?: ServiceAppointment_Result[] | null;
  ts_enforcementaction_ts_serviceofenforcementactions?: ts_serviceofenforcementaction_Result[] | null;
}
interface ts_EnforcementAction extends ts_EnforcementAction_Base, ts_EnforcementAction_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_AuthorizedRepresentative_bind$contacts?: string | null;
  ts_Case_bind$incidents?: string | null;
  ts_Company_bind$accounts?: string | null;
  ts_VerbalWarningGivenTo_bind$contacts?: string | null;
}
interface ts_EnforcementAction_Create extends ts_EnforcementAction {
}
interface ts_EnforcementAction_Update extends ts_EnforcementAction {
}
interface ts_EnforcementAction_Select {
  createdby_guid: WebAttribute<ts_EnforcementAction_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_EnforcementAction_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_EnforcementAction_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_EnforcementAction_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_EnforcementAction_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_EnforcementAction_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_EnforcementAction_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_EnforcementAction_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_EnforcementAction_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_EnforcementAction_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_EnforcementAction_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_EnforcementAction_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_EnforcementAction_Select, { statecode: ts_enforcementaction_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_EnforcementAction_Select, { statuscode: ts_enforcementaction_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_EnforcementAction_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_authorizedrepresentative_guid: WebAttribute<ts_EnforcementAction_Select, { ts_authorizedrepresentative_guid: string | null }, { ts_authorizedrepresentative_formatted?: string }>;
  ts_case_guid: WebAttribute<ts_EnforcementAction_Select, { ts_case_guid: string | null }, { ts_case_formatted?: string }>;
  ts_comments: WebAttribute<ts_EnforcementAction_Select, { ts_comments: string | null }, {  }>;
  ts_company_guid: WebAttribute<ts_EnforcementAction_Select, { ts_company_guid: string | null }, { ts_company_formatted?: string }>;
  ts_copyofreceipt: WebAttribute<ts_EnforcementAction_Select, { ts_copyofreceipt: string | null }, {  }>;
  ts_enforcementactionid: WebAttribute<ts_EnforcementAction_Select, { ts_enforcementactionid: string | null }, {  }>;
  ts_enforcementactionnumber: WebAttribute<ts_EnforcementAction_Select, { ts_enforcementactionnumber: string | null }, {  }>;
  ts_individualposition: WebAttribute<ts_EnforcementAction_Select, { ts_individualposition: string | null }, {  }>;
  ts_methodofservice: WebAttribute<ts_EnforcementAction_Select, { ts_methodofservice: ts_methodofservice | null }, { ts_methodofservice_formatted?: string }>;
  ts_name: WebAttribute<ts_EnforcementAction_Select, { ts_name: string | null }, {  }>;
  ts_timeanddateofservice: WebAttribute<ts_EnforcementAction_Select, { ts_timeanddateofservice: Date | null }, { ts_timeanddateofservice_formatted?: string }>;
  ts_type: WebAttribute<ts_EnforcementAction_Select, { ts_type: ts_type | null }, { ts_type_formatted?: string }>;
  ts_verbalwarningdate: WebAttribute<ts_EnforcementAction_Select, { ts_verbalwarningdate: Date | null }, { ts_verbalwarningdate_formatted?: string }>;
  ts_verbalwarninggivento_guid: WebAttribute<ts_EnforcementAction_Select, { ts_verbalwarninggivento_guid: string | null }, { ts_verbalwarninggivento_formatted?: string }>;
  ts_verbalwarninglocation: WebAttribute<ts_EnforcementAction_Select, { ts_verbalwarninglocation: ts_verbalwarninglocation | null }, { ts_verbalwarninglocation_formatted?: string }>;
  ts_verbalwarninglocationother: WebAttribute<ts_EnforcementAction_Select, { ts_verbalwarninglocationother: string | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<ts_EnforcementAction_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_EnforcementAction_Select, { versionnumber: number | null }, {  }>;
}
interface ts_EnforcementAction_Filter {
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
  statecode: ts_enforcementaction_statecode;
  statuscode: ts_enforcementaction_statuscode;
  timezoneruleversionnumber: number;
  ts_authorizedrepresentative_guid: XQW.Guid;
  ts_case_guid: XQW.Guid;
  ts_comments: string;
  ts_company_guid: XQW.Guid;
  ts_copyofreceipt: string;
  ts_enforcementactionid: XQW.Guid;
  ts_enforcementactionnumber: string;
  ts_individualposition: string;
  ts_methodofservice: ts_methodofservice;
  ts_name: string;
  ts_timeanddateofservice: Date;
  ts_type: ts_type;
  ts_verbalwarningdate: Date;
  ts_verbalwarninggivento_guid: XQW.Guid;
  ts_verbalwarninglocation: ts_verbalwarninglocation;
  ts_verbalwarninglocationother: string;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_EnforcementAction_Expand {
  createdby: WebExpand<ts_EnforcementAction_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_EnforcementAction_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_EnforcementAction_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_EnforcementAction_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_EnforcementAction_Expand, SystemUser_Select, SystemUser_Filter, { ownerid: SystemUser_Result }>;
  owninguser: WebExpand<ts_EnforcementAction_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_AuthorizedRepresentative: WebExpand<ts_EnforcementAction_Expand, Contact_Select, Contact_Filter, { ts_AuthorizedRepresentative: Contact_Result }>;
  ts_Case: WebExpand<ts_EnforcementAction_Expand, Incident_Select, Incident_Filter, { ts_Case: Incident_Result }>;
  ts_Company: WebExpand<ts_EnforcementAction_Expand, Account_Select, Account_Filter, { ts_Company: Account_Result }>;
  ts_EnforcementAction_ts_EnforcementAction: WebExpand<ts_EnforcementAction_Expand, ovs_Finding_Select, ovs_Finding_Filter, { ts_EnforcementAction_ts_EnforcementAction: ovs_Finding_Result[] }>;
  ts_VerbalWarningGivenTo: WebExpand<ts_EnforcementAction_Expand, Contact_Select, Contact_Filter, { ts_VerbalWarningGivenTo: Contact_Result }>;
  ts_enforcementaction_Appointments: WebExpand<ts_EnforcementAction_Expand, Appointment_Select, Appointment_Filter, { ts_enforcementaction_Appointments: Appointment_Result[] }>;
  ts_enforcementaction_ServiceAppointments: WebExpand<ts_EnforcementAction_Expand, ServiceAppointment_Select, ServiceAppointment_Filter, { ts_enforcementaction_ServiceAppointments: ServiceAppointment_Result[] }>;
  ts_enforcementaction_ts_serviceofenforcementactions: WebExpand<ts_EnforcementAction_Expand, ts_serviceofenforcementaction_Select, ts_serviceofenforcementaction_Filter, { ts_enforcementaction_ts_serviceofenforcementactions: ts_serviceofenforcementaction_Result[] }>;
}
interface ts_EnforcementAction_FormattedResult {
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
  ts_authorizedrepresentative_formatted?: string;
  ts_case_formatted?: string;
  ts_company_formatted?: string;
  ts_methodofservice_formatted?: string;
  ts_timeanddateofservice_formatted?: string;
  ts_type_formatted?: string;
  ts_verbalwarningdate_formatted?: string;
  ts_verbalwarninggivento_formatted?: string;
  ts_verbalwarninglocation_formatted?: string;
}
interface ts_EnforcementAction_Result extends ts_EnforcementAction_Base, ts_EnforcementAction_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
  ts_authorizedrepresentative_guid: string | null;
  ts_case_guid: string | null;
  ts_company_guid: string | null;
  ts_verbalwarninggivento_guid: string | null;
}
interface ts_EnforcementAction_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_AuthorizedRepresentative: WebMappingRetrieve<Contact_Select,Contact_Expand,Contact_Filter,Contact_Fixed,Contact_Result,Contact_FormattedResult>;
  ts_Case: WebMappingRetrieve<Incident_Select,Incident_Expand,Incident_Filter,Incident_Fixed,Incident_Result,Incident_FormattedResult>;
  ts_Company: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
  ts_VerbalWarningGivenTo: WebMappingRetrieve<Contact_Select,Contact_Expand,Contact_Filter,Contact_Fixed,Contact_Result,Contact_FormattedResult>;
}
interface ts_EnforcementAction_RelatedMany {
  ts_EnforcementAction_ts_EnforcementAction: WebMappingRetrieve<ovs_Finding_Select,ovs_Finding_Expand,ovs_Finding_Filter,ovs_Finding_Fixed,ovs_Finding_Result,ovs_Finding_FormattedResult>;
  ts_enforcementaction_Appointments: WebMappingRetrieve<Appointment_Select,Appointment_Expand,Appointment_Filter,Appointment_Fixed,Appointment_Result,Appointment_FormattedResult>;
  ts_enforcementaction_ServiceAppointments: WebMappingRetrieve<ServiceAppointment_Select,ServiceAppointment_Expand,ServiceAppointment_Filter,ServiceAppointment_Fixed,ServiceAppointment_Result,ServiceAppointment_FormattedResult>;
  ts_enforcementaction_ts_serviceofenforcementactions: WebMappingRetrieve<ts_serviceofenforcementaction_Select,ts_serviceofenforcementaction_Expand,ts_serviceofenforcementaction_Filter,ts_serviceofenforcementaction_Fixed,ts_serviceofenforcementaction_Result,ts_serviceofenforcementaction_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_enforcementactions: WebMappingRetrieve<ts_EnforcementAction_Select,ts_EnforcementAction_Expand,ts_EnforcementAction_Filter,ts_EnforcementAction_Fixed,ts_EnforcementAction_Result,ts_EnforcementAction_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_enforcementactions: WebMappingRelated<ts_EnforcementAction_RelatedOne,ts_EnforcementAction_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_enforcementactions: WebMappingCUDA<ts_EnforcementAction_Create,ts_EnforcementAction_Update,ts_EnforcementAction_Select>;
}
