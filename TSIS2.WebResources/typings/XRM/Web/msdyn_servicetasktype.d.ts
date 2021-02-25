interface msdyn_servicetasktype_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  msdyn_description?: string | null;
  msdyn_estimatedduration?: number | null;
  msdyn_inspectionenabled?: boolean | null;
  msdyn_name?: string | null;
  msdyn_servicetasktypeid?: string | null;
  overriddencreatedon?: Date | null;
  ovs_questionnaireenabled?: boolean | null;
  ovs_questionnaireresultjson?: string | null;
  statecode?: msdyn_servicetasktype_statecode | null;
  statuscode?: msdyn_servicetasktype_statuscode | null;
  timezoneruleversionnumber?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface msdyn_servicetasktype_Relationships {
  msdyn_msdyn_servicetasktype_msdyn_incidenttypeservicetask_TaskType?: msdyn_incidenttypeservicetask_Result[] | null;
  msdyn_msdyn_servicetasktype_msdyn_workorderservicetask_TaskType?: msdyn_workorderservicetask_Result[] | null;
  ovs_Questionnaire?: ovs_Questionnaire_Result | null;
}
interface msdyn_servicetasktype extends msdyn_servicetasktype_Base, msdyn_servicetasktype_Relationships {
  msdyn_Inspection_bind$msdyn_inspections?: string | null;
  ovs_QuestionnaireTemplate_bind$qm_sytemplates?: string | null;
  ovs_Questionnaire_bind$ovs_questionnaires?: string | null;
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
}
interface msdyn_servicetasktype_Create extends msdyn_servicetasktype {
}
interface msdyn_servicetasktype_Update extends msdyn_servicetasktype {
}
interface msdyn_servicetasktype_Select {
  createdby_guid: WebAttribute<msdyn_servicetasktype_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<msdyn_servicetasktype_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<msdyn_servicetasktype_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<msdyn_servicetasktype_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<msdyn_servicetasktype_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<msdyn_servicetasktype_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<msdyn_servicetasktype_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  msdyn_description: WebAttribute<msdyn_servicetasktype_Select, { msdyn_description: string | null }, {  }>;
  msdyn_estimatedduration: WebAttribute<msdyn_servicetasktype_Select, { msdyn_estimatedduration: number | null }, {  }>;
  msdyn_inspection_guid: WebAttribute<msdyn_servicetasktype_Select, { msdyn_inspection_guid: string | null }, { msdyn_inspection_formatted?: string }>;
  msdyn_inspectionenabled: WebAttribute<msdyn_servicetasktype_Select, { msdyn_inspectionenabled: boolean | null }, {  }>;
  msdyn_name: WebAttribute<msdyn_servicetasktype_Select, { msdyn_name: string | null }, {  }>;
  msdyn_servicetasktypeid: WebAttribute<msdyn_servicetasktype_Select, { msdyn_servicetasktypeid: string | null }, {  }>;
  overriddencreatedon: WebAttribute<msdyn_servicetasktype_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ovs_questionnaire_guid: WebAttribute<msdyn_servicetasktype_Select, { ovs_questionnaire_guid: string | null }, { ovs_questionnaire_formatted?: string }>;
  ovs_questionnaireenabled: WebAttribute<msdyn_servicetasktype_Select, { ovs_questionnaireenabled: boolean | null }, {  }>;
  ovs_questionnaireresultjson: WebAttribute<msdyn_servicetasktype_Select, { ovs_questionnaireresultjson: string | null }, {  }>;
  ovs_questionnairetemplate_guid: WebAttribute<msdyn_servicetasktype_Select, { ovs_questionnairetemplate_guid: string | null }, { ovs_questionnairetemplate_formatted?: string }>;
  ownerid_guid: WebAttribute<msdyn_servicetasktype_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<msdyn_servicetasktype_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<msdyn_servicetasktype_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<msdyn_servicetasktype_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<msdyn_servicetasktype_Select, { statecode: msdyn_servicetasktype_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<msdyn_servicetasktype_Select, { statuscode: msdyn_servicetasktype_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<msdyn_servicetasktype_Select, { timezoneruleversionnumber: number | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<msdyn_servicetasktype_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<msdyn_servicetasktype_Select, { versionnumber: number | null }, {  }>;
}
interface msdyn_servicetasktype_Filter {
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  importsequencenumber: number;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  msdyn_description: string;
  msdyn_estimatedduration: number;
  msdyn_inspection_guid: XQW.Guid;
  msdyn_inspectionenabled: boolean;
  msdyn_name: string;
  msdyn_servicetasktypeid: XQW.Guid;
  overriddencreatedon: Date;
  ovs_questionnaire_guid: XQW.Guid;
  ovs_questionnaireenabled: boolean;
  ovs_questionnaireresultjson: string;
  ovs_questionnairetemplate_guid: XQW.Guid;
  ownerid_guid: XQW.Guid;
  owningbusinessunit_guid: XQW.Guid;
  owningteam_guid: XQW.Guid;
  owninguser_guid: XQW.Guid;
  statecode: msdyn_servicetasktype_statecode;
  statuscode: msdyn_servicetasktype_statuscode;
  timezoneruleversionnumber: number;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface msdyn_servicetasktype_Expand {
  createdby: WebExpand<msdyn_servicetasktype_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<msdyn_servicetasktype_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<msdyn_servicetasktype_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<msdyn_servicetasktype_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  msdyn_msdyn_servicetasktype_msdyn_incidenttypeservicetask_TaskType: WebExpand<msdyn_servicetasktype_Expand, msdyn_incidenttypeservicetask_Select, msdyn_incidenttypeservicetask_Filter, { msdyn_msdyn_servicetasktype_msdyn_incidenttypeservicetask_TaskType: msdyn_incidenttypeservicetask_Result[] }>;
  msdyn_msdyn_servicetasktype_msdyn_workorderservicetask_TaskType: WebExpand<msdyn_servicetasktype_Expand, msdyn_workorderservicetask_Select, msdyn_workorderservicetask_Filter, { msdyn_msdyn_servicetasktype_msdyn_workorderservicetask_TaskType: msdyn_workorderservicetask_Result[] }>;
  ovs_Questionnaire: WebExpand<msdyn_servicetasktype_Expand, ovs_Questionnaire_Select, ovs_Questionnaire_Filter, { ovs_Questionnaire: ovs_Questionnaire_Result }>;
  ownerid: WebExpand<msdyn_servicetasktype_Expand, SystemUser_Select, SystemUser_Filter, { ownerid: SystemUser_Result }>;
  owninguser: WebExpand<msdyn_servicetasktype_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
}
interface msdyn_servicetasktype_FormattedResult {
  createdby_formatted?: string;
  createdon_formatted?: string;
  createdonbehalfby_formatted?: string;
  modifiedby_formatted?: string;
  modifiedon_formatted?: string;
  modifiedonbehalfby_formatted?: string;
  msdyn_inspection_formatted?: string;
  overriddencreatedon_formatted?: string;
  ovs_questionnaire_formatted?: string;
  ovs_questionnairetemplate_formatted?: string;
  ownerid_formatted?: string;
  owningbusinessunit_formatted?: string;
  owningteam_formatted?: string;
  owninguser_formatted?: string;
  statecode_formatted?: string;
  statuscode_formatted?: string;
}
interface msdyn_servicetasktype_Result extends msdyn_servicetasktype_Base, msdyn_servicetasktype_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  msdyn_inspection_guid: string | null;
  ovs_questionnaire_guid: string | null;
  ovs_questionnairetemplate_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
}
interface msdyn_servicetasktype_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ovs_Questionnaire: WebMappingRetrieve<ovs_Questionnaire_Select,ovs_Questionnaire_Expand,ovs_Questionnaire_Filter,ovs_Questionnaire_Fixed,ovs_Questionnaire_Result,ovs_Questionnaire_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface msdyn_servicetasktype_RelatedMany {
  msdyn_msdyn_servicetasktype_msdyn_incidenttypeservicetask_TaskType: WebMappingRetrieve<msdyn_incidenttypeservicetask_Select,msdyn_incidenttypeservicetask_Expand,msdyn_incidenttypeservicetask_Filter,msdyn_incidenttypeservicetask_Fixed,msdyn_incidenttypeservicetask_Result,msdyn_incidenttypeservicetask_FormattedResult>;
  msdyn_msdyn_servicetasktype_msdyn_workorderservicetask_TaskType: WebMappingRetrieve<msdyn_workorderservicetask_Select,msdyn_workorderservicetask_Expand,msdyn_workorderservicetask_Filter,msdyn_workorderservicetask_Fixed,msdyn_workorderservicetask_Result,msdyn_workorderservicetask_FormattedResult>;
}
interface WebEntitiesRetrieve {
  msdyn_servicetasktypes: WebMappingRetrieve<msdyn_servicetasktype_Select,msdyn_servicetasktype_Expand,msdyn_servicetasktype_Filter,msdyn_servicetasktype_Fixed,msdyn_servicetasktype_Result,msdyn_servicetasktype_FormattedResult>;
}
interface WebEntitiesRelated {
  msdyn_servicetasktypes: WebMappingRelated<msdyn_servicetasktype_RelatedOne,msdyn_servicetasktype_RelatedMany>;
}
interface WebEntitiesCUDA {
  msdyn_servicetasktypes: WebMappingCUDA<msdyn_servicetasktype_Create,msdyn_servicetasktype_Update,msdyn_servicetasktype_Select>;
}
