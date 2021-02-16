interface ovs_CYSafetyAssessment_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  ovs_cyharm?: ovs_cyharm | null;
  ovs_cylikelihoodofharm?: ovs_cylikelihoodofharm | null;
  ovs_cymagnitudeofharm?: ovs_cymagnitudeofharm | null;
  ovs_cysafetyassessmentid?: string | null;
  ovs_name?: string | null;
  statecode?: ovs_cysafetyassessment_statecode | null;
  statuscode?: ovs_cysafetyassessment_statuscode | null;
  timezoneruleversionnumber?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ovs_CYSafetyAssessment_Relationships {
  ovs_InspectionId?: msdyn_workorder_Result | null;
  ovs_cysafetyassessment_Appointments?: Appointment_Result[] | null;
  ovs_cysafetyassessment_ServiceAppointments?: ServiceAppointment_Result[] | null;
  ovs_cysafetyassessment_ovs_CYActions?: ovs_CYAction_Result[] | null;
  ovs_cysafetyassessment_ovs_cancellationrequests?: ovs_cancellationrequest_Result[] | null;
  ovs_cysafetyassessment_ovs_revisedquarterrequests?: ovs_revisedquarterrequest_Result[] | null;
}
interface ovs_CYSafetyAssessment extends ovs_CYSafetyAssessment_Base, ovs_CYSafetyAssessment_Relationships {
  ovs_InspectionId_bind$msdyn_workorders?: string | null;
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
}
interface ovs_CYSafetyAssessment_Create extends ovs_CYSafetyAssessment {
}
interface ovs_CYSafetyAssessment_Update extends ovs_CYSafetyAssessment {
}
interface ovs_CYSafetyAssessment_Select {
  createdby_guid: WebAttribute<ovs_CYSafetyAssessment_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ovs_CYSafetyAssessment_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ovs_CYSafetyAssessment_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ovs_CYSafetyAssessment_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ovs_CYSafetyAssessment_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ovs_CYSafetyAssessment_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ovs_CYSafetyAssessment_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ovs_CYSafetyAssessment_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ovs_cyharm: WebAttribute<ovs_CYSafetyAssessment_Select, { ovs_cyharm: ovs_cyharm | null }, { ovs_cyharm_formatted?: string }>;
  ovs_cylikelihoodofharm: WebAttribute<ovs_CYSafetyAssessment_Select, { ovs_cylikelihoodofharm: ovs_cylikelihoodofharm | null }, { ovs_cylikelihoodofharm_formatted?: string }>;
  ovs_cymagnitudeofharm: WebAttribute<ovs_CYSafetyAssessment_Select, { ovs_cymagnitudeofharm: ovs_cymagnitudeofharm | null }, { ovs_cymagnitudeofharm_formatted?: string }>;
  ovs_cysafetyassessmentid: WebAttribute<ovs_CYSafetyAssessment_Select, { ovs_cysafetyassessmentid: string | null }, {  }>;
  ovs_inspectionid_guid: WebAttribute<ovs_CYSafetyAssessment_Select, { ovs_inspectionid_guid: string | null }, { ovs_inspectionid_formatted?: string }>;
  ovs_name: WebAttribute<ovs_CYSafetyAssessment_Select, { ovs_name: string | null }, {  }>;
  ownerid_guid: WebAttribute<ovs_CYSafetyAssessment_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ovs_CYSafetyAssessment_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ovs_CYSafetyAssessment_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ovs_CYSafetyAssessment_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ovs_CYSafetyAssessment_Select, { statecode: ovs_cysafetyassessment_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ovs_CYSafetyAssessment_Select, { statuscode: ovs_cysafetyassessment_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ovs_CYSafetyAssessment_Select, { timezoneruleversionnumber: number | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<ovs_CYSafetyAssessment_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ovs_CYSafetyAssessment_Select, { versionnumber: number | null }, {  }>;
}
interface ovs_CYSafetyAssessment_Filter {
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  importsequencenumber: number;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  overriddencreatedon: Date;
  ovs_cyharm: ovs_cyharm;
  ovs_cylikelihoodofharm: ovs_cylikelihoodofharm;
  ovs_cymagnitudeofharm: ovs_cymagnitudeofharm;
  ovs_cysafetyassessmentid: XQW.Guid;
  ovs_inspectionid_guid: XQW.Guid;
  ovs_name: string;
  ownerid_guid: XQW.Guid;
  owningbusinessunit_guid: XQW.Guid;
  owningteam_guid: XQW.Guid;
  owninguser_guid: XQW.Guid;
  statecode: ovs_cysafetyassessment_statecode;
  statuscode: ovs_cysafetyassessment_statuscode;
  timezoneruleversionnumber: number;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ovs_CYSafetyAssessment_Expand {
  createdby: WebExpand<ovs_CYSafetyAssessment_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ovs_CYSafetyAssessment_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ovs_CYSafetyAssessment_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ovs_CYSafetyAssessment_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ovs_InspectionId: WebExpand<ovs_CYSafetyAssessment_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { ovs_InspectionId: msdyn_workorder_Result }>;
  ovs_cysafetyassessment_Appointments: WebExpand<ovs_CYSafetyAssessment_Expand, Appointment_Select, Appointment_Filter, { ovs_cysafetyassessment_Appointments: Appointment_Result[] }>;
  ovs_cysafetyassessment_ServiceAppointments: WebExpand<ovs_CYSafetyAssessment_Expand, ServiceAppointment_Select, ServiceAppointment_Filter, { ovs_cysafetyassessment_ServiceAppointments: ServiceAppointment_Result[] }>;
  ovs_cysafetyassessment_ovs_CYActions: WebExpand<ovs_CYSafetyAssessment_Expand, ovs_CYAction_Select, ovs_CYAction_Filter, { ovs_cysafetyassessment_ovs_CYActions: ovs_CYAction_Result[] }>;
  ovs_cysafetyassessment_ovs_cancellationrequests: WebExpand<ovs_CYSafetyAssessment_Expand, ovs_cancellationrequest_Select, ovs_cancellationrequest_Filter, { ovs_cysafetyassessment_ovs_cancellationrequests: ovs_cancellationrequest_Result[] }>;
  ovs_cysafetyassessment_ovs_revisedquarterrequests: WebExpand<ovs_CYSafetyAssessment_Expand, ovs_revisedquarterrequest_Select, ovs_revisedquarterrequest_Filter, { ovs_cysafetyassessment_ovs_revisedquarterrequests: ovs_revisedquarterrequest_Result[] }>;
  ownerid: WebExpand<ovs_CYSafetyAssessment_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningteam: WebExpand<ovs_CYSafetyAssessment_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ovs_CYSafetyAssessment_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
}
interface ovs_CYSafetyAssessment_FormattedResult {
  createdby_formatted?: string;
  createdon_formatted?: string;
  createdonbehalfby_formatted?: string;
  modifiedby_formatted?: string;
  modifiedon_formatted?: string;
  modifiedonbehalfby_formatted?: string;
  overriddencreatedon_formatted?: string;
  ovs_cyharm_formatted?: string;
  ovs_cylikelihoodofharm_formatted?: string;
  ovs_cymagnitudeofharm_formatted?: string;
  ovs_inspectionid_formatted?: string;
  ownerid_formatted?: string;
  owningbusinessunit_formatted?: string;
  owningteam_formatted?: string;
  owninguser_formatted?: string;
  statecode_formatted?: string;
  statuscode_formatted?: string;
}
interface ovs_CYSafetyAssessment_Result extends ovs_CYSafetyAssessment_Base, ovs_CYSafetyAssessment_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  ovs_inspectionid_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
}
interface ovs_CYSafetyAssessment_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ovs_InspectionId: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface ovs_CYSafetyAssessment_RelatedMany {
  ovs_cysafetyassessment_Appointments: WebMappingRetrieve<Appointment_Select,Appointment_Expand,Appointment_Filter,Appointment_Fixed,Appointment_Result,Appointment_FormattedResult>;
  ovs_cysafetyassessment_ServiceAppointments: WebMappingRetrieve<ServiceAppointment_Select,ServiceAppointment_Expand,ServiceAppointment_Filter,ServiceAppointment_Fixed,ServiceAppointment_Result,ServiceAppointment_FormattedResult>;
  ovs_cysafetyassessment_ovs_CYActions: WebMappingRetrieve<ovs_CYAction_Select,ovs_CYAction_Expand,ovs_CYAction_Filter,ovs_CYAction_Fixed,ovs_CYAction_Result,ovs_CYAction_FormattedResult>;
  ovs_cysafetyassessment_ovs_cancellationrequests: WebMappingRetrieve<ovs_cancellationrequest_Select,ovs_cancellationrequest_Expand,ovs_cancellationrequest_Filter,ovs_cancellationrequest_Fixed,ovs_cancellationrequest_Result,ovs_cancellationrequest_FormattedResult>;
  ovs_cysafetyassessment_ovs_revisedquarterrequests: WebMappingRetrieve<ovs_revisedquarterrequest_Select,ovs_revisedquarterrequest_Expand,ovs_revisedquarterrequest_Filter,ovs_revisedquarterrequest_Fixed,ovs_revisedquarterrequest_Result,ovs_revisedquarterrequest_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ovs_cysafetyassessments: WebMappingRetrieve<ovs_CYSafetyAssessment_Select,ovs_CYSafetyAssessment_Expand,ovs_CYSafetyAssessment_Filter,ovs_CYSafetyAssessment_Fixed,ovs_CYSafetyAssessment_Result,ovs_CYSafetyAssessment_FormattedResult>;
}
interface WebEntitiesRelated {
  ovs_cysafetyassessments: WebMappingRelated<ovs_CYSafetyAssessment_RelatedOne,ovs_CYSafetyAssessment_RelatedMany>;
}
interface WebEntitiesCUDA {
  ovs_cysafetyassessments: WebMappingCUDA<ovs_CYSafetyAssessment_Create,ovs_CYSafetyAssessment_Update,ovs_CYSafetyAssessment_Select>;
}
