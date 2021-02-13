interface qm_syquestionvalidationrule_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  qm_isenabledind?: boolean | null;
  qm_name?: string | null;
  qm_syquestionvalidationruleid?: string | null;
  qm_validationvaluetxt?: string | null;
  statecode?: qm_syquestionvalidationrule_statecode | null;
  statuscode?: qm_syquestionvalidationrule_statuscode | null;
  timezoneruleversionnumber?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface qm_syquestionvalidationrule_Relationships {
  qm_SYQuestionId?: qm_syquestion_Result | null;
  qm_syquestionvalidationrule_sydependencygrup?: qm_sydependencygroup_Result[] | null;
  qm_tyvalidationruletypeId?: qm_TYValidationruletype_Result | null;
}
interface qm_syquestionvalidationrule extends qm_syquestionvalidationrule_Base, qm_syquestionvalidationrule_Relationships {
  qm_SYQuestionId_bind$qm_syquestions?: string | null;
  qm_tyvalidationruletypeId_bind$qm_tyvalidationruletypes?: string | null;
}
interface qm_syquestionvalidationrule_Create extends qm_syquestionvalidationrule {
}
interface qm_syquestionvalidationrule_Update extends qm_syquestionvalidationrule {
}
interface qm_syquestionvalidationrule_Select {
  createdby_guid: WebAttribute<qm_syquestionvalidationrule_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<qm_syquestionvalidationrule_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<qm_syquestionvalidationrule_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<qm_syquestionvalidationrule_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<qm_syquestionvalidationrule_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<qm_syquestionvalidationrule_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<qm_syquestionvalidationrule_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  organizationid_guid: WebAttribute<qm_syquestionvalidationrule_Select, { organizationid_guid: string | null }, { organizationid_formatted?: string }>;
  overriddencreatedon: WebAttribute<qm_syquestionvalidationrule_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  qm_isenabledind: WebAttribute<qm_syquestionvalidationrule_Select, { qm_isenabledind: boolean | null }, {  }>;
  qm_name: WebAttribute<qm_syquestionvalidationrule_Select, { qm_name: string | null }, {  }>;
  qm_syquestionid_guid: WebAttribute<qm_syquestionvalidationrule_Select, { qm_syquestionid_guid: string | null }, { qm_syquestionid_formatted?: string }>;
  qm_syquestionvalidationruleid: WebAttribute<qm_syquestionvalidationrule_Select, { qm_syquestionvalidationruleid: string | null }, {  }>;
  qm_tyvalidationruletypeid_guid: WebAttribute<qm_syquestionvalidationrule_Select, { qm_tyvalidationruletypeid_guid: string | null }, { qm_tyvalidationruletypeid_formatted?: string }>;
  qm_validationvaluetxt: WebAttribute<qm_syquestionvalidationrule_Select, { qm_validationvaluetxt: string | null }, {  }>;
  statecode: WebAttribute<qm_syquestionvalidationrule_Select, { statecode: qm_syquestionvalidationrule_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<qm_syquestionvalidationrule_Select, { statuscode: qm_syquestionvalidationrule_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<qm_syquestionvalidationrule_Select, { timezoneruleversionnumber: number | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<qm_syquestionvalidationrule_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<qm_syquestionvalidationrule_Select, { versionnumber: number | null }, {  }>;
}
interface qm_syquestionvalidationrule_Filter {
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  importsequencenumber: number;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  organizationid_guid: XQW.Guid;
  overriddencreatedon: Date;
  qm_isenabledind: boolean;
  qm_name: string;
  qm_syquestionid_guid: XQW.Guid;
  qm_syquestionvalidationruleid: XQW.Guid;
  qm_tyvalidationruletypeid_guid: XQW.Guid;
  qm_validationvaluetxt: string;
  statecode: qm_syquestionvalidationrule_statecode;
  statuscode: qm_syquestionvalidationrule_statuscode;
  timezoneruleversionnumber: number;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface qm_syquestionvalidationrule_Expand {
  createdby: WebExpand<qm_syquestionvalidationrule_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<qm_syquestionvalidationrule_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<qm_syquestionvalidationrule_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<qm_syquestionvalidationrule_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  qm_SYQuestionId: WebExpand<qm_syquestionvalidationrule_Expand, qm_syquestion_Select, qm_syquestion_Filter, { qm_SYQuestionId: qm_syquestion_Result }>;
  qm_syquestionvalidationrule_sydependencygrup: WebExpand<qm_syquestionvalidationrule_Expand, qm_sydependencygroup_Select, qm_sydependencygroup_Filter, { qm_syquestionvalidationrule_sydependencygrup: qm_sydependencygroup_Result[] }>;
  qm_tyvalidationruletypeId: WebExpand<qm_syquestionvalidationrule_Expand, qm_TYValidationruletype_Select, qm_TYValidationruletype_Filter, { qm_tyvalidationruletypeId: qm_TYValidationruletype_Result }>;
}
interface qm_syquestionvalidationrule_FormattedResult {
  createdby_formatted?: string;
  createdon_formatted?: string;
  createdonbehalfby_formatted?: string;
  modifiedby_formatted?: string;
  modifiedon_formatted?: string;
  modifiedonbehalfby_formatted?: string;
  organizationid_formatted?: string;
  overriddencreatedon_formatted?: string;
  qm_syquestionid_formatted?: string;
  qm_tyvalidationruletypeid_formatted?: string;
  statecode_formatted?: string;
  statuscode_formatted?: string;
}
interface qm_syquestionvalidationrule_Result extends qm_syquestionvalidationrule_Base, qm_syquestionvalidationrule_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  organizationid_guid: string | null;
  qm_syquestionid_guid: string | null;
  qm_tyvalidationruletypeid_guid: string | null;
}
interface qm_syquestionvalidationrule_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  qm_SYQuestionId: WebMappingRetrieve<qm_syquestion_Select,qm_syquestion_Expand,qm_syquestion_Filter,qm_syquestion_Fixed,qm_syquestion_Result,qm_syquestion_FormattedResult>;
  qm_tyvalidationruletypeId: WebMappingRetrieve<qm_TYValidationruletype_Select,qm_TYValidationruletype_Expand,qm_TYValidationruletype_Filter,qm_TYValidationruletype_Fixed,qm_TYValidationruletype_Result,qm_TYValidationruletype_FormattedResult>;
}
interface qm_syquestionvalidationrule_RelatedMany {
  qm_syquestionvalidationrule_sydependencygrup: WebMappingRetrieve<qm_sydependencygroup_Select,qm_sydependencygroup_Expand,qm_sydependencygroup_Filter,qm_sydependencygroup_Fixed,qm_sydependencygroup_Result,qm_sydependencygroup_FormattedResult>;
}
interface WebEntitiesRetrieve {
  qm_syquestionvalidationrules: WebMappingRetrieve<qm_syquestionvalidationrule_Select,qm_syquestionvalidationrule_Expand,qm_syquestionvalidationrule_Filter,qm_syquestionvalidationrule_Fixed,qm_syquestionvalidationrule_Result,qm_syquestionvalidationrule_FormattedResult>;
}
interface WebEntitiesRelated {
  qm_syquestionvalidationrules: WebMappingRelated<qm_syquestionvalidationrule_RelatedOne,qm_syquestionvalidationrule_RelatedMany>;
}
interface WebEntitiesCUDA {
  qm_syquestionvalidationrules: WebMappingCUDA<qm_syquestionvalidationrule_Create,qm_syquestionvalidationrule_Update,qm_syquestionvalidationrule_Select>;
}
