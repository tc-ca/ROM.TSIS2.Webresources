interface msdyn_incidenttype_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  msdyn_copyincidentitemstoagreement?: boolean | null;
  msdyn_description?: string | null;
  msdyn_estimatedduration?: number | null;
  msdyn_incidenttypeid?: string | null;
  msdyn_lastcalculatedtime?: Date | null;
  msdyn_name?: string | null;
  msdyn_resolutionrequiredonwocompletion?: boolean | null;
  msdyn_suggestedduration?: number | null;
  overriddencreatedon?: Date | null;
  ovs_incidenttypenameenglish?: string | null;
  ovs_incidenttypenamefrench?: string | null;
  statecode?: msdyn_incidenttype_statecode | null;
  statuscode?: msdyn_incidenttype_statuscode | null;
  timezoneruleversionnumber?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface msdyn_incidenttype_Relationships {
  msdyn_msdyn_incidenttype_incident_IncidentType?: Incident_Result[] | null;
  msdyn_msdyn_incidenttype_msdyn_incidenttypeservicetask_IncidentType?: msdyn_incidenttypeservicetask_Result[] | null;
  msdyn_msdyn_incidenttype_msdyn_workorder_PrimaryIncidentType?: msdyn_workorder_Result[] | null;
  ts_incident_InspectionType1_msdyn_incidentty?: Incident_Result[] | null;
  ts_incident_InspectionType2_msdyn_incidentty?: Incident_Result[] | null;
  ts_ts_operationactivity_Activity_msdyn_incid?: ts_OperationActivity_Result[] | null;
}
interface msdyn_incidenttype extends msdyn_incidenttype_Base, msdyn_incidenttype_Relationships {
  msdyn_defaultworkordertype_bind$msdyn_workordertypes?: string | null;
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_RiskScore_bind$ts_recurrencefrequencieses?: string | null;
  ts_ovs_operation_bind$ovs_operations?: string | null;
}
interface msdyn_incidenttype_Create extends msdyn_incidenttype {
}
interface msdyn_incidenttype_Update extends msdyn_incidenttype {
}
interface msdyn_incidenttype_Select {
  createdby_guid: WebAttribute<msdyn_incidenttype_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<msdyn_incidenttype_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<msdyn_incidenttype_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<msdyn_incidenttype_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<msdyn_incidenttype_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<msdyn_incidenttype_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<msdyn_incidenttype_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  msdyn_copyincidentitemstoagreement: WebAttribute<msdyn_incidenttype_Select, { msdyn_copyincidentitemstoagreement: boolean | null }, {  }>;
  msdyn_defaultworkordertype_guid: WebAttribute<msdyn_incidenttype_Select, { msdyn_defaultworkordertype_guid: string | null }, { msdyn_defaultworkordertype_formatted?: string }>;
  msdyn_description: WebAttribute<msdyn_incidenttype_Select, { msdyn_description: string | null }, {  }>;
  msdyn_estimatedduration: WebAttribute<msdyn_incidenttype_Select, { msdyn_estimatedduration: number | null }, {  }>;
  msdyn_incidenttypeid: WebAttribute<msdyn_incidenttype_Select, { msdyn_incidenttypeid: string | null }, {  }>;
  msdyn_lastcalculatedtime: WebAttribute<msdyn_incidenttype_Select, { msdyn_lastcalculatedtime: Date | null }, { msdyn_lastcalculatedtime_formatted?: string }>;
  msdyn_name: WebAttribute<msdyn_incidenttype_Select, { msdyn_name: string | null }, {  }>;
  msdyn_resolutionrequiredonwocompletion: WebAttribute<msdyn_incidenttype_Select, { msdyn_resolutionrequiredonwocompletion: boolean | null }, {  }>;
  msdyn_suggestedduration: WebAttribute<msdyn_incidenttype_Select, { msdyn_suggestedduration: number | null }, {  }>;
  overriddencreatedon: WebAttribute<msdyn_incidenttype_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ovs_incidenttypenameenglish: WebAttribute<msdyn_incidenttype_Select, { ovs_incidenttypenameenglish: string | null }, {  }>;
  ovs_incidenttypenamefrench: WebAttribute<msdyn_incidenttype_Select, { ovs_incidenttypenamefrench: string | null }, {  }>;
  ownerid_guid: WebAttribute<msdyn_incidenttype_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<msdyn_incidenttype_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<msdyn_incidenttype_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<msdyn_incidenttype_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<msdyn_incidenttype_Select, { statecode: msdyn_incidenttype_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<msdyn_incidenttype_Select, { statuscode: msdyn_incidenttype_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<msdyn_incidenttype_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_ovs_operation_guid: WebAttribute<msdyn_incidenttype_Select, { ts_ovs_operation_guid: string | null }, { ts_ovs_operation_formatted?: string }>;
  ts_riskscore_guid: WebAttribute<msdyn_incidenttype_Select, { ts_riskscore_guid: string | null }, { ts_riskscore_formatted?: string }>;
  utcconversiontimezonecode: WebAttribute<msdyn_incidenttype_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<msdyn_incidenttype_Select, { versionnumber: number | null }, {  }>;
}
interface msdyn_incidenttype_Filter {
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  importsequencenumber: number;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  msdyn_copyincidentitemstoagreement: boolean;
  msdyn_defaultworkordertype_guid: XQW.Guid;
  msdyn_description: string;
  msdyn_estimatedduration: number;
  msdyn_incidenttypeid: XQW.Guid;
  msdyn_lastcalculatedtime: Date;
  msdyn_name: string;
  msdyn_resolutionrequiredonwocompletion: boolean;
  msdyn_suggestedduration: number;
  overriddencreatedon: Date;
  ovs_incidenttypenameenglish: string;
  ovs_incidenttypenamefrench: string;
  ownerid_guid: XQW.Guid;
  owningbusinessunit_guid: XQW.Guid;
  owningteam_guid: XQW.Guid;
  owninguser_guid: XQW.Guid;
  statecode: msdyn_incidenttype_statecode;
  statuscode: msdyn_incidenttype_statuscode;
  timezoneruleversionnumber: number;
  ts_ovs_operation_guid: XQW.Guid;
  ts_riskscore_guid: XQW.Guid;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface msdyn_incidenttype_Expand {
  createdby: WebExpand<msdyn_incidenttype_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<msdyn_incidenttype_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<msdyn_incidenttype_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<msdyn_incidenttype_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  msdyn_msdyn_incidenttype_incident_IncidentType: WebExpand<msdyn_incidenttype_Expand, Incident_Select, Incident_Filter, { msdyn_msdyn_incidenttype_incident_IncidentType: Incident_Result[] }>;
  msdyn_msdyn_incidenttype_msdyn_incidenttypeservicetask_IncidentType: WebExpand<msdyn_incidenttype_Expand, msdyn_incidenttypeservicetask_Select, msdyn_incidenttypeservicetask_Filter, { msdyn_msdyn_incidenttype_msdyn_incidenttypeservicetask_IncidentType: msdyn_incidenttypeservicetask_Result[] }>;
  msdyn_msdyn_incidenttype_msdyn_workorder_PrimaryIncidentType: WebExpand<msdyn_incidenttype_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { msdyn_msdyn_incidenttype_msdyn_workorder_PrimaryIncidentType: msdyn_workorder_Result[] }>;
  ownerid: WebExpand<msdyn_incidenttype_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningteam: WebExpand<msdyn_incidenttype_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<msdyn_incidenttype_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_incident_InspectionType1_msdyn_incidentty: WebExpand<msdyn_incidenttype_Expand, Incident_Select, Incident_Filter, { ts_incident_InspectionType1_msdyn_incidentty: Incident_Result[] }>;
  ts_incident_InspectionType2_msdyn_incidentty: WebExpand<msdyn_incidenttype_Expand, Incident_Select, Incident_Filter, { ts_incident_InspectionType2_msdyn_incidentty: Incident_Result[] }>;
  ts_ovs_operation: WebExpand<msdyn_incidenttype_Expand, ovs_operation_Select, ovs_operation_Filter, { ts_ovs_operation: ovs_operation_Result }>;
  ts_ts_operationactivity_Activity_msdyn_incid: WebExpand<msdyn_incidenttype_Expand, ts_OperationActivity_Select, ts_OperationActivity_Filter, { ts_ts_operationactivity_Activity_msdyn_incid: ts_OperationActivity_Result[] }>;
}
interface msdyn_incidenttype_FormattedResult {
  createdby_formatted?: string;
  createdon_formatted?: string;
  createdonbehalfby_formatted?: string;
  modifiedby_formatted?: string;
  modifiedon_formatted?: string;
  modifiedonbehalfby_formatted?: string;
  msdyn_defaultworkordertype_formatted?: string;
  msdyn_lastcalculatedtime_formatted?: string;
  overriddencreatedon_formatted?: string;
  ownerid_formatted?: string;
  owningbusinessunit_formatted?: string;
  owningteam_formatted?: string;
  owninguser_formatted?: string;
  statecode_formatted?: string;
  statuscode_formatted?: string;
  ts_ovs_operation_formatted?: string;
  ts_riskscore_formatted?: string;
}
interface msdyn_incidenttype_Result extends msdyn_incidenttype_Base, msdyn_incidenttype_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  msdyn_defaultworkordertype_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
  ts_ovs_operation_guid: string | null;
  ts_riskscore_guid: string | null;
}
interface msdyn_incidenttype_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_ovs_operation: WebMappingRetrieve<ovs_operation_Select,ovs_operation_Expand,ovs_operation_Filter,ovs_operation_Fixed,ovs_operation_Result,ovs_operation_FormattedResult>;
}
interface msdyn_incidenttype_RelatedMany {
  msdyn_msdyn_incidenttype_incident_IncidentType: WebMappingRetrieve<Incident_Select,Incident_Expand,Incident_Filter,Incident_Fixed,Incident_Result,Incident_FormattedResult>;
  msdyn_msdyn_incidenttype_msdyn_incidenttypeservicetask_IncidentType: WebMappingRetrieve<msdyn_incidenttypeservicetask_Select,msdyn_incidenttypeservicetask_Expand,msdyn_incidenttypeservicetask_Filter,msdyn_incidenttypeservicetask_Fixed,msdyn_incidenttypeservicetask_Result,msdyn_incidenttypeservicetask_FormattedResult>;
  msdyn_msdyn_incidenttype_msdyn_workorder_PrimaryIncidentType: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
  ts_incident_InspectionType1_msdyn_incidentty: WebMappingRetrieve<Incident_Select,Incident_Expand,Incident_Filter,Incident_Fixed,Incident_Result,Incident_FormattedResult>;
  ts_incident_InspectionType2_msdyn_incidentty: WebMappingRetrieve<Incident_Select,Incident_Expand,Incident_Filter,Incident_Fixed,Incident_Result,Incident_FormattedResult>;
  ts_ts_operationactivity_Activity_msdyn_incid: WebMappingRetrieve<ts_OperationActivity_Select,ts_OperationActivity_Expand,ts_OperationActivity_Filter,ts_OperationActivity_Fixed,ts_OperationActivity_Result,ts_OperationActivity_FormattedResult>;
}
interface WebEntitiesRetrieve {
  msdyn_incidenttypes: WebMappingRetrieve<msdyn_incidenttype_Select,msdyn_incidenttype_Expand,msdyn_incidenttype_Filter,msdyn_incidenttype_Fixed,msdyn_incidenttype_Result,msdyn_incidenttype_FormattedResult>;
}
interface WebEntitiesRelated {
  msdyn_incidenttypes: WebMappingRelated<msdyn_incidenttype_RelatedOne,msdyn_incidenttype_RelatedMany>;
}
interface WebEntitiesCUDA {
  msdyn_incidenttypes: WebMappingCUDA<msdyn_incidenttype_Create,msdyn_incidenttype_Update,msdyn_incidenttype_Select>;
}
