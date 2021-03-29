interface msdyn_incidenttypeservicetask_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  msdyn_description?: string | null;
  msdyn_estimatedduration?: number | null;
  msdyn_incidenttypeservicetaskid?: string | null;
  msdyn_inspectionenabled?: boolean | null;
  msdyn_lineorder?: number | null;
  msdyn_name?: string | null;
  overriddencreatedon?: Date | null;
  ovs_questionnaireenabled?: boolean | null;
  statecode?: msdyn_incidenttypeservicetask_statecode | null;
  statuscode?: msdyn_incidenttypeservicetask_statuscode | null;
  timezoneruleversionnumber?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface msdyn_incidenttypeservicetask_Relationships {
  ovs_Questionnaire?: ovs_Questionnaire_Result | null;
}
interface msdyn_incidenttypeservicetask extends msdyn_incidenttypeservicetask_Base, msdyn_incidenttypeservicetask_Relationships {
  msdyn_Inspection_bind$msdyn_inspections?: string | null;
  msdyn_incidenttype_bind$msdyn_incidenttypes?: string | null;
  msdyn_tasktype_bind$msdyn_servicetasktypes?: string | null;
  ovs_Questionnaire_bind$ovs_questionnaires?: string | null;
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
}
interface msdyn_incidenttypeservicetask_Create extends msdyn_incidenttypeservicetask {
}
interface msdyn_incidenttypeservicetask_Update extends msdyn_incidenttypeservicetask {
}
interface msdyn_incidenttypeservicetask_Select {
  createdby_guid: WebAttribute<msdyn_incidenttypeservicetask_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<msdyn_incidenttypeservicetask_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<msdyn_incidenttypeservicetask_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<msdyn_incidenttypeservicetask_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<msdyn_incidenttypeservicetask_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<msdyn_incidenttypeservicetask_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<msdyn_incidenttypeservicetask_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  msdyn_description: WebAttribute<msdyn_incidenttypeservicetask_Select, { msdyn_description: string | null }, {  }>;
  msdyn_estimatedduration: WebAttribute<msdyn_incidenttypeservicetask_Select, { msdyn_estimatedduration: number | null }, {  }>;
  msdyn_incidenttype_guid: WebAttribute<msdyn_incidenttypeservicetask_Select, { msdyn_incidenttype_guid: string | null }, { msdyn_incidenttype_formatted?: string }>;
  msdyn_incidenttypeservicetaskid: WebAttribute<msdyn_incidenttypeservicetask_Select, { msdyn_incidenttypeservicetaskid: string | null }, {  }>;
  msdyn_inspection_guid: WebAttribute<msdyn_incidenttypeservicetask_Select, { msdyn_inspection_guid: string | null }, { msdyn_inspection_formatted?: string }>;
  msdyn_inspectionenabled: WebAttribute<msdyn_incidenttypeservicetask_Select, { msdyn_inspectionenabled: boolean | null }, {  }>;
  msdyn_lineorder: WebAttribute<msdyn_incidenttypeservicetask_Select, { msdyn_lineorder: number | null }, {  }>;
  msdyn_name: WebAttribute<msdyn_incidenttypeservicetask_Select, { msdyn_name: string | null }, {  }>;
  msdyn_tasktype_guid: WebAttribute<msdyn_incidenttypeservicetask_Select, { msdyn_tasktype_guid: string | null }, { msdyn_tasktype_formatted?: string }>;
  overriddencreatedon: WebAttribute<msdyn_incidenttypeservicetask_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ovs_questionnaire_guid: WebAttribute<msdyn_incidenttypeservicetask_Select, { ovs_questionnaire_guid: string | null }, { ovs_questionnaire_formatted?: string }>;
  ovs_questionnaireenabled: WebAttribute<msdyn_incidenttypeservicetask_Select, { ovs_questionnaireenabled: boolean | null }, {  }>;
  ownerid_guid: WebAttribute<msdyn_incidenttypeservicetask_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<msdyn_incidenttypeservicetask_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<msdyn_incidenttypeservicetask_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<msdyn_incidenttypeservicetask_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<msdyn_incidenttypeservicetask_Select, { statecode: msdyn_incidenttypeservicetask_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<msdyn_incidenttypeservicetask_Select, { statuscode: msdyn_incidenttypeservicetask_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<msdyn_incidenttypeservicetask_Select, { timezoneruleversionnumber: number | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<msdyn_incidenttypeservicetask_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<msdyn_incidenttypeservicetask_Select, { versionnumber: number | null }, {  }>;
}
interface msdyn_incidenttypeservicetask_Filter {
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  importsequencenumber: number;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  msdyn_description: string;
  msdyn_estimatedduration: number;
  msdyn_incidenttype_guid: XQW.Guid;
  msdyn_incidenttypeservicetaskid: XQW.Guid;
  msdyn_inspection_guid: XQW.Guid;
  msdyn_inspectionenabled: boolean;
  msdyn_lineorder: number;
  msdyn_name: string;
  msdyn_tasktype_guid: XQW.Guid;
  overriddencreatedon: Date;
  ovs_questionnaire_guid: XQW.Guid;
  ovs_questionnaireenabled: boolean;
  ownerid_guid: XQW.Guid;
  owningbusinessunit_guid: XQW.Guid;
  owningteam_guid: XQW.Guid;
  owninguser_guid: XQW.Guid;
  statecode: msdyn_incidenttypeservicetask_statecode;
  statuscode: msdyn_incidenttypeservicetask_statuscode;
  timezoneruleversionnumber: number;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface msdyn_incidenttypeservicetask_Expand {
  createdby: WebExpand<msdyn_incidenttypeservicetask_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<msdyn_incidenttypeservicetask_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<msdyn_incidenttypeservicetask_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<msdyn_incidenttypeservicetask_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  msdyn_tasktype: WebExpand<msdyn_incidenttypeservicetask_Expand, msdyn_servicetasktype_Select, msdyn_servicetasktype_Filter, { msdyn_tasktype: msdyn_servicetasktype_Result }>;
  ovs_Questionnaire: WebExpand<msdyn_incidenttypeservicetask_Expand, ovs_Questionnaire_Select, ovs_Questionnaire_Filter, { ovs_Questionnaire: ovs_Questionnaire_Result }>;
  ownerid: WebExpand<msdyn_incidenttypeservicetask_Expand, SystemUser_Select, SystemUser_Filter, { ownerid: SystemUser_Result }>;
  owninguser: WebExpand<msdyn_incidenttypeservicetask_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
}
interface msdyn_incidenttypeservicetask_FormattedResult {
  createdby_formatted?: string;
  createdon_formatted?: string;
  createdonbehalfby_formatted?: string;
  modifiedby_formatted?: string;
  modifiedon_formatted?: string;
  modifiedonbehalfby_formatted?: string;
  msdyn_incidenttype_formatted?: string;
  msdyn_inspection_formatted?: string;
  msdyn_tasktype_formatted?: string;
  overriddencreatedon_formatted?: string;
  ovs_questionnaire_formatted?: string;
  ownerid_formatted?: string;
  owningbusinessunit_formatted?: string;
  owningteam_formatted?: string;
  owninguser_formatted?: string;
  statecode_formatted?: string;
  statuscode_formatted?: string;
}
interface msdyn_incidenttypeservicetask_Result extends msdyn_incidenttypeservicetask_Base, msdyn_incidenttypeservicetask_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  msdyn_incidenttype_guid: string | null;
  msdyn_inspection_guid: string | null;
  msdyn_tasktype_guid: string | null;
  ovs_questionnaire_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
}
interface msdyn_incidenttypeservicetask_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  msdyn_tasktype: WebMappingRetrieve<msdyn_servicetasktype_Select,msdyn_servicetasktype_Expand,msdyn_servicetasktype_Filter,msdyn_servicetasktype_Fixed,msdyn_servicetasktype_Result,msdyn_servicetasktype_FormattedResult>;
  ovs_Questionnaire: WebMappingRetrieve<ovs_Questionnaire_Select,ovs_Questionnaire_Expand,ovs_Questionnaire_Filter,ovs_Questionnaire_Fixed,ovs_Questionnaire_Result,ovs_Questionnaire_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface msdyn_incidenttypeservicetask_RelatedMany {
}
interface WebEntitiesRetrieve {
  msdyn_incidenttypeservicetasks: WebMappingRetrieve<msdyn_incidenttypeservicetask_Select,msdyn_incidenttypeservicetask_Expand,msdyn_incidenttypeservicetask_Filter,msdyn_incidenttypeservicetask_Fixed,msdyn_incidenttypeservicetask_Result,msdyn_incidenttypeservicetask_FormattedResult>;
}
interface WebEntitiesRelated {
  msdyn_incidenttypeservicetasks: WebMappingRelated<msdyn_incidenttypeservicetask_RelatedOne,msdyn_incidenttypeservicetask_RelatedMany>;
}
interface WebEntitiesCUDA {
  msdyn_incidenttypeservicetasks: WebMappingCUDA<msdyn_incidenttypeservicetask_Create,msdyn_incidenttypeservicetask_Update,msdyn_incidenttypeservicetask_Select>;
}
