interface qm_sydependencygroup_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  qm_dependencygroupruletypecd?: qm_tydependencygroupruletype | null;
  qm_name?: string | null;
  qm_sydependencygroupid?: string | null;
  statecode?: qm_sydependencygroup_statecode | null;
  statuscode?: qm_sydependencygroup_statuscode | null;
  timezoneruleversionnumber?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface qm_sydependencygroup_Relationships {
  qm_SYQuestionId?: qm_syquestion_Result | null;
  qm_SYQuestionValidationruleId?: qm_syquestionvalidationrule_Result | null;
  qm_qm_sydependencygroup_qm_sydependencygroup?: qm_sydependencygroupitem_Result[] | null;
}
interface qm_sydependencygroup extends qm_sydependencygroup_Base, qm_sydependencygroup_Relationships {
  qm_SYQuestionId_bind$qm_syquestions?: string | null;
  qm_SYQuestionValidationruleId_bind$qm_syquestionvalidationrules?: string | null;
}
interface qm_sydependencygroup_Create extends qm_sydependencygroup {
}
interface qm_sydependencygroup_Update extends qm_sydependencygroup {
}
interface qm_sydependencygroup_Select {
  createdby_guid: WebAttribute<qm_sydependencygroup_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<qm_sydependencygroup_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<qm_sydependencygroup_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<qm_sydependencygroup_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<qm_sydependencygroup_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<qm_sydependencygroup_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<qm_sydependencygroup_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  organizationid_guid: WebAttribute<qm_sydependencygroup_Select, { organizationid_guid: string | null }, { organizationid_formatted?: string }>;
  overriddencreatedon: WebAttribute<qm_sydependencygroup_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  qm_dependencygroupruletypecd: WebAttribute<qm_sydependencygroup_Select, { qm_dependencygroupruletypecd: qm_tydependencygroupruletype | null }, { qm_dependencygroupruletypecd_formatted?: string }>;
  qm_name: WebAttribute<qm_sydependencygroup_Select, { qm_name: string | null }, {  }>;
  qm_sydependencygroupid: WebAttribute<qm_sydependencygroup_Select, { qm_sydependencygroupid: string | null }, {  }>;
  qm_syquestionid_guid: WebAttribute<qm_sydependencygroup_Select, { qm_syquestionid_guid: string | null }, { qm_syquestionid_formatted?: string }>;
  qm_syquestionvalidationruleid_guid: WebAttribute<qm_sydependencygroup_Select, { qm_syquestionvalidationruleid_guid: string | null }, { qm_syquestionvalidationruleid_formatted?: string }>;
  statecode: WebAttribute<qm_sydependencygroup_Select, { statecode: qm_sydependencygroup_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<qm_sydependencygroup_Select, { statuscode: qm_sydependencygroup_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<qm_sydependencygroup_Select, { timezoneruleversionnumber: number | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<qm_sydependencygroup_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<qm_sydependencygroup_Select, { versionnumber: number | null }, {  }>;
}
interface qm_sydependencygroup_Filter {
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  importsequencenumber: number;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  organizationid_guid: XQW.Guid;
  overriddencreatedon: Date;
  qm_dependencygroupruletypecd: qm_tydependencygroupruletype;
  qm_name: string;
  qm_sydependencygroupid: XQW.Guid;
  qm_syquestionid_guid: XQW.Guid;
  qm_syquestionvalidationruleid_guid: XQW.Guid;
  statecode: qm_sydependencygroup_statecode;
  statuscode: qm_sydependencygroup_statuscode;
  timezoneruleversionnumber: number;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface qm_sydependencygroup_Expand {
  createdby: WebExpand<qm_sydependencygroup_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<qm_sydependencygroup_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<qm_sydependencygroup_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<qm_sydependencygroup_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  qm_SYQuestionId: WebExpand<qm_sydependencygroup_Expand, qm_syquestion_Select, qm_syquestion_Filter, { qm_SYQuestionId: qm_syquestion_Result }>;
  qm_SYQuestionValidationruleId: WebExpand<qm_sydependencygroup_Expand, qm_syquestionvalidationrule_Select, qm_syquestionvalidationrule_Filter, { qm_SYQuestionValidationruleId: qm_syquestionvalidationrule_Result }>;
  qm_qm_sydependencygroup_qm_sydependencygroup: WebExpand<qm_sydependencygroup_Expand, qm_sydependencygroupitem_Select, qm_sydependencygroupitem_Filter, { qm_qm_sydependencygroup_qm_sydependencygroup: qm_sydependencygroupitem_Result[] }>;
}
interface qm_sydependencygroup_FormattedResult {
  createdby_formatted?: string;
  createdon_formatted?: string;
  createdonbehalfby_formatted?: string;
  modifiedby_formatted?: string;
  modifiedon_formatted?: string;
  modifiedonbehalfby_formatted?: string;
  organizationid_formatted?: string;
  overriddencreatedon_formatted?: string;
  qm_dependencygroupruletypecd_formatted?: string;
  qm_syquestionid_formatted?: string;
  qm_syquestionvalidationruleid_formatted?: string;
  statecode_formatted?: string;
  statuscode_formatted?: string;
}
interface qm_sydependencygroup_Result extends qm_sydependencygroup_Base, qm_sydependencygroup_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  organizationid_guid: string | null;
  qm_syquestionid_guid: string | null;
  qm_syquestionvalidationruleid_guid: string | null;
}
interface qm_sydependencygroup_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  qm_SYQuestionId: WebMappingRetrieve<qm_syquestion_Select,qm_syquestion_Expand,qm_syquestion_Filter,qm_syquestion_Fixed,qm_syquestion_Result,qm_syquestion_FormattedResult>;
  qm_SYQuestionValidationruleId: WebMappingRetrieve<qm_syquestionvalidationrule_Select,qm_syquestionvalidationrule_Expand,qm_syquestionvalidationrule_Filter,qm_syquestionvalidationrule_Fixed,qm_syquestionvalidationrule_Result,qm_syquestionvalidationrule_FormattedResult>;
}
interface qm_sydependencygroup_RelatedMany {
  qm_qm_sydependencygroup_qm_sydependencygroup: WebMappingRetrieve<qm_sydependencygroupitem_Select,qm_sydependencygroupitem_Expand,qm_sydependencygroupitem_Filter,qm_sydependencygroupitem_Fixed,qm_sydependencygroupitem_Result,qm_sydependencygroupitem_FormattedResult>;
}
interface WebEntitiesRetrieve {
  qm_sydependencygroups: WebMappingRetrieve<qm_sydependencygroup_Select,qm_sydependencygroup_Expand,qm_sydependencygroup_Filter,qm_sydependencygroup_Fixed,qm_sydependencygroup_Result,qm_sydependencygroup_FormattedResult>;
}
interface WebEntitiesRelated {
  qm_sydependencygroups: WebMappingRelated<qm_sydependencygroup_RelatedOne,qm_sydependencygroup_RelatedMany>;
}
interface WebEntitiesCUDA {
  qm_sydependencygroups: WebMappingCUDA<qm_sydependencygroup_Create,qm_sydependencygroup_Update,qm_sydependencygroup_Select>;
}
