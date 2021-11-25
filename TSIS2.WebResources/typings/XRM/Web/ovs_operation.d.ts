interface ovs_operation_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  ovs_name?: string | null;
  ovs_operationid?: string | null;
  statecode?: ovs_operation_statecode | null;
  statuscode?: ovs_operation_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_details?: string | null;
  ts_enddate?: Date | null;
  ts_operationstatus?: ts_operationstatustest | null;
  ts_startdate?: Date | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ovs_operation_Relationships {
  ovs_operation_Appointments?: Appointment_Result[] | null;
  ovs_operation_ServiceAppointments?: ServiceAppointment_Result[] | null;
  ovs_operation_connections1?: Connection_Result[] | null;
  ovs_operation_connections2?: Connection_Result[] | null;
  ovs_ovs_operation_msdyn_workorder?: msdyn_workorder_Result[] | null;
  ts_msdyn_workorder_ovs_operation_ovs_operati?: msdyn_workorder_Result[] | null;
  ts_ovs_operation_ovs_operation_ovs_operation?: ovs_operation_Result[] | null;
}
interface ovs_operation extends ovs_operation_Base, ovs_operation_Relationships {
  ovs_LOBId_bind$ovs_lobs?: string | null;
  ovs_OperationTypeId_bind$ovs_operationtypes?: string | null;
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_site_bind$msdyn_functionallocations?: string | null;
  ts_stakeholder_bind$accounts?: string | null;
  ts_subsite_bind$msdyn_functionallocations?: string | null;
}
interface ovs_operation_Create extends ovs_operation {
}
interface ovs_operation_Update extends ovs_operation {
}
interface ovs_operation_Select {
  createdby_guid: WebAttribute<ovs_operation_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ovs_operation_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ovs_operation_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ovs_operation_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ovs_operation_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ovs_operation_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ovs_operation_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ovs_operation_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ovs_lobid_guid: WebAttribute<ovs_operation_Select, { ovs_lobid_guid: string | null }, { ovs_lobid_formatted?: string }>;
  ovs_name: WebAttribute<ovs_operation_Select, { ovs_name: string | null }, {  }>;
  ovs_operationid: WebAttribute<ovs_operation_Select, { ovs_operationid: string | null }, {  }>;
  ovs_operationtypeid_guid: WebAttribute<ovs_operation_Select, { ovs_operationtypeid_guid: string | null }, { ovs_operationtypeid_formatted?: string }>;
  ownerid_guid: WebAttribute<ovs_operation_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ovs_operation_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ovs_operation_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ovs_operation_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ovs_operation_Select, { statecode: ovs_operation_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ovs_operation_Select, { statuscode: ovs_operation_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ovs_operation_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_details: WebAttribute<ovs_operation_Select, { ts_details: string | null }, {  }>;
  ts_enddate: WebAttribute<ovs_operation_Select, { ts_enddate: Date | null }, { ts_enddate_formatted?: string }>;
  ts_operationstatus: WebAttribute<ovs_operation_Select, { ts_operationstatus: ts_operationstatustest | null }, { ts_operationstatus_formatted?: string }>;
  ts_site_guid: WebAttribute<ovs_operation_Select, { ts_site_guid: string | null }, { ts_site_formatted?: string }>;
  ts_stakeholder_guid: WebAttribute<ovs_operation_Select, { ts_stakeholder_guid: string | null }, { ts_stakeholder_formatted?: string }>;
  ts_startdate: WebAttribute<ovs_operation_Select, { ts_startdate: Date | null }, { ts_startdate_formatted?: string }>;
  ts_subsite_guid: WebAttribute<ovs_operation_Select, { ts_subsite_guid: string | null }, { ts_subsite_formatted?: string }>;
  utcconversiontimezonecode: WebAttribute<ovs_operation_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ovs_operation_Select, { versionnumber: number | null }, {  }>;
}
interface ovs_operation_Filter {
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  importsequencenumber: number;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  overriddencreatedon: Date;
  ovs_lobid_guid: XQW.Guid;
  ovs_name: string;
  ovs_operationid: XQW.Guid;
  ovs_operationtypeid_guid: XQW.Guid;
  ownerid_guid: XQW.Guid;
  owningbusinessunit_guid: XQW.Guid;
  owningteam_guid: XQW.Guid;
  owninguser_guid: XQW.Guid;
  statecode: ovs_operation_statecode;
  statuscode: ovs_operation_statuscode;
  timezoneruleversionnumber: number;
  ts_details: string;
  ts_enddate: Date;
  ts_operationstatus: ts_operationstatustest;
  ts_site_guid: XQW.Guid;
  ts_stakeholder_guid: XQW.Guid;
  ts_startdate: Date;
  ts_subsite_guid: XQW.Guid;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ovs_operation_Expand {
  createdby: WebExpand<ovs_operation_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ovs_operation_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ovs_operation_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ovs_operation_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ovs_operation_Appointments: WebExpand<ovs_operation_Expand, Appointment_Select, Appointment_Filter, { ovs_operation_Appointments: Appointment_Result[] }>;
  ovs_operation_ServiceAppointments: WebExpand<ovs_operation_Expand, ServiceAppointment_Select, ServiceAppointment_Filter, { ovs_operation_ServiceAppointments: ServiceAppointment_Result[] }>;
  ovs_operation_connections1: WebExpand<ovs_operation_Expand, Connection_Select, Connection_Filter, { ovs_operation_connections1: Connection_Result[] }>;
  ovs_operation_connections2: WebExpand<ovs_operation_Expand, Connection_Select, Connection_Filter, { ovs_operation_connections2: Connection_Result[] }>;
  ovs_ovs_operation_msdyn_workorder: WebExpand<ovs_operation_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { ovs_ovs_operation_msdyn_workorder: msdyn_workorder_Result[] }>;
  ownerid: WebExpand<ovs_operation_Expand, SystemUser_Select, SystemUser_Filter, { ownerid: SystemUser_Result }>;
  owninguser: WebExpand<ovs_operation_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_msdyn_workorder_ovs_operation_ovs_operati: WebExpand<ovs_operation_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { ts_msdyn_workorder_ovs_operation_ovs_operati: msdyn_workorder_Result[] }>;
  ts_ovs_operation_ovs_operation_ovs_operation: WebExpand<ovs_operation_Expand, ovs_operation_Select, ovs_operation_Filter, { ts_ovs_operation_ovs_operation_ovs_operation: ovs_operation_Result[] }>;
  ts_site: WebExpand<ovs_operation_Expand, msdyn_FunctionalLocation_Select, msdyn_FunctionalLocation_Filter, { ts_site: msdyn_FunctionalLocation_Result }>;
  ts_stakeholder: WebExpand<ovs_operation_Expand, Account_Select, Account_Filter, { ts_stakeholder: Account_Result }>;
  ts_subsite: WebExpand<ovs_operation_Expand, msdyn_FunctionalLocation_Select, msdyn_FunctionalLocation_Filter, { ts_subsite: msdyn_FunctionalLocation_Result }>;
}
interface ovs_operation_FormattedResult {
  createdby_formatted?: string;
  createdon_formatted?: string;
  createdonbehalfby_formatted?: string;
  modifiedby_formatted?: string;
  modifiedon_formatted?: string;
  modifiedonbehalfby_formatted?: string;
  overriddencreatedon_formatted?: string;
  ovs_lobid_formatted?: string;
  ovs_operationtypeid_formatted?: string;
  ownerid_formatted?: string;
  owningbusinessunit_formatted?: string;
  owningteam_formatted?: string;
  owninguser_formatted?: string;
  statecode_formatted?: string;
  statuscode_formatted?: string;
  ts_enddate_formatted?: string;
  ts_operationstatus_formatted?: string;
  ts_site_formatted?: string;
  ts_stakeholder_formatted?: string;
  ts_startdate_formatted?: string;
  ts_subsite_formatted?: string;
}
interface ovs_operation_Result extends ovs_operation_Base, ovs_operation_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  ovs_lobid_guid: string | null;
  ovs_operationtypeid_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
  ts_site_guid: string | null;
  ts_stakeholder_guid: string | null;
  ts_subsite_guid: string | null;
}
interface ovs_operation_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_site: WebMappingRetrieve<msdyn_FunctionalLocation_Select,msdyn_FunctionalLocation_Expand,msdyn_FunctionalLocation_Filter,msdyn_FunctionalLocation_Fixed,msdyn_FunctionalLocation_Result,msdyn_FunctionalLocation_FormattedResult>;
  ts_stakeholder: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
  ts_subsite: WebMappingRetrieve<msdyn_FunctionalLocation_Select,msdyn_FunctionalLocation_Expand,msdyn_FunctionalLocation_Filter,msdyn_FunctionalLocation_Fixed,msdyn_FunctionalLocation_Result,msdyn_FunctionalLocation_FormattedResult>;
}
interface ovs_operation_RelatedMany {
  ovs_operation_Appointments: WebMappingRetrieve<Appointment_Select,Appointment_Expand,Appointment_Filter,Appointment_Fixed,Appointment_Result,Appointment_FormattedResult>;
  ovs_operation_ServiceAppointments: WebMappingRetrieve<ServiceAppointment_Select,ServiceAppointment_Expand,ServiceAppointment_Filter,ServiceAppointment_Fixed,ServiceAppointment_Result,ServiceAppointment_FormattedResult>;
  ovs_operation_connections1: WebMappingRetrieve<Connection_Select,Connection_Expand,Connection_Filter,Connection_Fixed,Connection_Result,Connection_FormattedResult>;
  ovs_operation_connections2: WebMappingRetrieve<Connection_Select,Connection_Expand,Connection_Filter,Connection_Fixed,Connection_Result,Connection_FormattedResult>;
  ovs_ovs_operation_msdyn_workorder: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
  ts_msdyn_workorder_ovs_operation_ovs_operati: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
  ts_ovs_operation_ovs_operation_ovs_operation: WebMappingRetrieve<ovs_operation_Select,ovs_operation_Expand,ovs_operation_Filter,ovs_operation_Fixed,ovs_operation_Result,ovs_operation_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ovs_operations: WebMappingRetrieve<ovs_operation_Select,ovs_operation_Expand,ovs_operation_Filter,ovs_operation_Fixed,ovs_operation_Result,ovs_operation_FormattedResult>;
}
interface WebEntitiesRelated {
  ovs_operations: WebMappingRelated<ovs_operation_RelatedOne,ovs_operation_RelatedMany>;
}
interface WebEntitiesCUDA {
  ovs_operations: WebMappingCUDA<ovs_operation_Create,ovs_operation_Update,ovs_operation_Select>;
}
