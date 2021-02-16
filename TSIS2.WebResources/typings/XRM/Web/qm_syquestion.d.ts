interface qm_syquestion_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  qm_isvisibleind?: boolean | null;
  qm_name?: string | null;
  qm_ordernbr?: number | null;
  qm_questione?: string | null;
  qm_questionf?: string | null;
  qm_questionresponsetypecd?: qm_questionresponsetypecd | null;
  qm_syquestionid?: string | null;
  statecode?: qm_syquestion_statecode | null;
  statuscode?: qm_syquestion_statuscode | null;
  timezoneruleversionnumber?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface qm_syquestion_Relationships {
  qm_SYGroupId?: qm_sygroup_Result | null;
  qm_SYQuestionId_self?: qm_syquestion_Result | null;
  qm_qm_syquestion_qm_syquestionvalidationrule?: qm_syquestionvalidationrule_Result[] | null;
  qm_syquestion_sydependencygroup?: qm_sydependencygroup_Result[] | null;
  qm_syquestion_sydependencygroupitem?: qm_sydependencygroupitem_Result[] | null;
  qm_syquestion_syquestion?: qm_syquestion_Result[] | null;
  qm_syquestion_syresponse?: qm_syresponse_Result[] | null;
}
interface qm_syquestion extends qm_syquestion_Base, qm_syquestion_Relationships {
  qm_SYGroupId_bind$qm_sygroups?: string | null;
  qm_SYQuestionId_self_bind$qm_syquestions?: string | null;
  qm_templateid_bind$qm_sytemplates?: string | null;
}
interface qm_syquestion_Create extends qm_syquestion {
}
interface qm_syquestion_Update extends qm_syquestion {
}
interface qm_syquestion_Select {
  createdby_guid: WebAttribute<qm_syquestion_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<qm_syquestion_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<qm_syquestion_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<qm_syquestion_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<qm_syquestion_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<qm_syquestion_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<qm_syquestion_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  organizationid_guid: WebAttribute<qm_syquestion_Select, { organizationid_guid: string | null }, { organizationid_formatted?: string }>;
  overriddencreatedon: WebAttribute<qm_syquestion_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  qm_isvisibleind: WebAttribute<qm_syquestion_Select, { qm_isvisibleind: boolean | null }, {  }>;
  qm_name: WebAttribute<qm_syquestion_Select, { qm_name: string | null }, {  }>;
  qm_ordernbr: WebAttribute<qm_syquestion_Select, { qm_ordernbr: number | null }, {  }>;
  qm_questione: WebAttribute<qm_syquestion_Select, { qm_questione: string | null }, {  }>;
  qm_questionf: WebAttribute<qm_syquestion_Select, { qm_questionf: string | null }, {  }>;
  qm_questionresponsetypecd: WebAttribute<qm_syquestion_Select, { qm_questionresponsetypecd: qm_questionresponsetypecd | null }, { qm_questionresponsetypecd_formatted?: string }>;
  qm_sygroupid_guid: WebAttribute<qm_syquestion_Select, { qm_sygroupid_guid: string | null }, { qm_sygroupid_formatted?: string }>;
  qm_syquestionid: WebAttribute<qm_syquestion_Select, { qm_syquestionid: string | null }, {  }>;
  qm_syquestionid_self_guid: WebAttribute<qm_syquestion_Select, { qm_syquestionid_self_guid: string | null }, { qm_syquestionid_self_formatted?: string }>;
  qm_templateid_guid: WebAttribute<qm_syquestion_Select, { qm_templateid_guid: string | null }, { qm_templateid_formatted?: string }>;
  statecode: WebAttribute<qm_syquestion_Select, { statecode: qm_syquestion_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<qm_syquestion_Select, { statuscode: qm_syquestion_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<qm_syquestion_Select, { timezoneruleversionnumber: number | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<qm_syquestion_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<qm_syquestion_Select, { versionnumber: number | null }, {  }>;
}
interface qm_syquestion_Filter {
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  importsequencenumber: number;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  organizationid_guid: XQW.Guid;
  overriddencreatedon: Date;
  qm_isvisibleind: boolean;
  qm_name: string;
  qm_ordernbr: number;
  qm_questione: string;
  qm_questionf: string;
  qm_questionresponsetypecd: qm_questionresponsetypecd;
  qm_sygroupid_guid: XQW.Guid;
  qm_syquestionid: XQW.Guid;
  qm_syquestionid_self_guid: XQW.Guid;
  qm_templateid_guid: XQW.Guid;
  statecode: qm_syquestion_statecode;
  statuscode: qm_syquestion_statuscode;
  timezoneruleversionnumber: number;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface qm_syquestion_Expand {
  createdby: WebExpand<qm_syquestion_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<qm_syquestion_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<qm_syquestion_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<qm_syquestion_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  qm_SYGroupId: WebExpand<qm_syquestion_Expand, qm_sygroup_Select, qm_sygroup_Filter, { qm_SYGroupId: qm_sygroup_Result }>;
  qm_SYQuestionId_self: WebExpand<qm_syquestion_Expand, qm_syquestion_Select, qm_syquestion_Filter, { qm_SYQuestionId_self: qm_syquestion_Result }>;
  qm_qm_syquestion_qm_syquestionvalidationrule: WebExpand<qm_syquestion_Expand, qm_syquestionvalidationrule_Select, qm_syquestionvalidationrule_Filter, { qm_qm_syquestion_qm_syquestionvalidationrule: qm_syquestionvalidationrule_Result[] }>;
  qm_syquestion_sydependencygroup: WebExpand<qm_syquestion_Expand, qm_sydependencygroup_Select, qm_sydependencygroup_Filter, { qm_syquestion_sydependencygroup: qm_sydependencygroup_Result[] }>;
  qm_syquestion_sydependencygroupitem: WebExpand<qm_syquestion_Expand, qm_sydependencygroupitem_Select, qm_sydependencygroupitem_Filter, { qm_syquestion_sydependencygroupitem: qm_sydependencygroupitem_Result[] }>;
  qm_syquestion_syquestion: WebExpand<qm_syquestion_Expand, qm_syquestion_Select, qm_syquestion_Filter, { qm_syquestion_syquestion: qm_syquestion_Result[] }>;
  qm_syquestion_syresponse: WebExpand<qm_syquestion_Expand, qm_syresponse_Select, qm_syresponse_Filter, { qm_syquestion_syresponse: qm_syresponse_Result[] }>;
  qm_templateid: WebExpand<qm_syquestion_Expand, qm_sytemplate_Select, qm_sytemplate_Filter, { qm_templateid: qm_sytemplate_Result }>;
}
interface qm_syquestion_FormattedResult {
  createdby_formatted?: string;
  createdon_formatted?: string;
  createdonbehalfby_formatted?: string;
  modifiedby_formatted?: string;
  modifiedon_formatted?: string;
  modifiedonbehalfby_formatted?: string;
  organizationid_formatted?: string;
  overriddencreatedon_formatted?: string;
  qm_questionresponsetypecd_formatted?: string;
  qm_sygroupid_formatted?: string;
  qm_syquestionid_self_formatted?: string;
  qm_templateid_formatted?: string;
  statecode_formatted?: string;
  statuscode_formatted?: string;
}
interface qm_syquestion_Result extends qm_syquestion_Base, qm_syquestion_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  organizationid_guid: string | null;
  qm_sygroupid_guid: string | null;
  qm_syquestionid_self_guid: string | null;
  qm_templateid_guid: string | null;
}
interface qm_syquestion_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  qm_SYGroupId: WebMappingRetrieve<qm_sygroup_Select,qm_sygroup_Expand,qm_sygroup_Filter,qm_sygroup_Fixed,qm_sygroup_Result,qm_sygroup_FormattedResult>;
  qm_SYQuestionId_self: WebMappingRetrieve<qm_syquestion_Select,qm_syquestion_Expand,qm_syquestion_Filter,qm_syquestion_Fixed,qm_syquestion_Result,qm_syquestion_FormattedResult>;
  qm_templateid: WebMappingRetrieve<qm_sytemplate_Select,qm_sytemplate_Expand,qm_sytemplate_Filter,qm_sytemplate_Fixed,qm_sytemplate_Result,qm_sytemplate_FormattedResult>;
}
interface qm_syquestion_RelatedMany {
  qm_qm_syquestion_qm_syquestionvalidationrule: WebMappingRetrieve<qm_syquestionvalidationrule_Select,qm_syquestionvalidationrule_Expand,qm_syquestionvalidationrule_Filter,qm_syquestionvalidationrule_Fixed,qm_syquestionvalidationrule_Result,qm_syquestionvalidationrule_FormattedResult>;
  qm_syquestion_sydependencygroup: WebMappingRetrieve<qm_sydependencygroup_Select,qm_sydependencygroup_Expand,qm_sydependencygroup_Filter,qm_sydependencygroup_Fixed,qm_sydependencygroup_Result,qm_sydependencygroup_FormattedResult>;
  qm_syquestion_sydependencygroupitem: WebMappingRetrieve<qm_sydependencygroupitem_Select,qm_sydependencygroupitem_Expand,qm_sydependencygroupitem_Filter,qm_sydependencygroupitem_Fixed,qm_sydependencygroupitem_Result,qm_sydependencygroupitem_FormattedResult>;
  qm_syquestion_syquestion: WebMappingRetrieve<qm_syquestion_Select,qm_syquestion_Expand,qm_syquestion_Filter,qm_syquestion_Fixed,qm_syquestion_Result,qm_syquestion_FormattedResult>;
  qm_syquestion_syresponse: WebMappingRetrieve<qm_syresponse_Select,qm_syresponse_Expand,qm_syresponse_Filter,qm_syresponse_Fixed,qm_syresponse_Result,qm_syresponse_FormattedResult>;
}
interface WebEntitiesRetrieve {
  qm_syquestions: WebMappingRetrieve<qm_syquestion_Select,qm_syquestion_Expand,qm_syquestion_Filter,qm_syquestion_Fixed,qm_syquestion_Result,qm_syquestion_FormattedResult>;
}
interface WebEntitiesRelated {
  qm_syquestions: WebMappingRelated<qm_syquestion_RelatedOne,qm_syquestion_RelatedMany>;
}
interface WebEntitiesCUDA {
  qm_syquestions: WebMappingCUDA<qm_syquestion_Create,qm_syquestion_Update,qm_syquestion_Select>;
}
