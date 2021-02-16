interface qm_TYValidationruletype_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  qm_defaulterroren?: string | null;
  qm_defaulterrorfr?: string | null;
  qm_name?: string | null;
  qm_tyvalidationruletypeid?: string | null;
  qm_validationruletypeen?: string | null;
  qm_validationruletypefr?: string | null;
  statecode?: qm_tyvalidationruletype_statecode | null;
  statuscode?: qm_tyvalidationruletype_statuscode | null;
  timezoneruleversionnumber?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface qm_TYValidationruletype_Relationships {
  qm_tyvalidationruletype_syquestionvalidrule?: qm_syquestionvalidationrule_Result[] | null;
}
interface qm_TYValidationruletype extends qm_TYValidationruletype_Base, qm_TYValidationruletype_Relationships {
}
interface qm_TYValidationruletype_Create extends qm_TYValidationruletype {
}
interface qm_TYValidationruletype_Update extends qm_TYValidationruletype {
}
interface qm_TYValidationruletype_Select {
  createdby_guid: WebAttribute<qm_TYValidationruletype_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<qm_TYValidationruletype_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<qm_TYValidationruletype_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<qm_TYValidationruletype_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<qm_TYValidationruletype_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<qm_TYValidationruletype_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<qm_TYValidationruletype_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  organizationid_guid: WebAttribute<qm_TYValidationruletype_Select, { organizationid_guid: string | null }, { organizationid_formatted?: string }>;
  overriddencreatedon: WebAttribute<qm_TYValidationruletype_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  qm_defaulterroren: WebAttribute<qm_TYValidationruletype_Select, { qm_defaulterroren: string | null }, {  }>;
  qm_defaulterrorfr: WebAttribute<qm_TYValidationruletype_Select, { qm_defaulterrorfr: string | null }, {  }>;
  qm_name: WebAttribute<qm_TYValidationruletype_Select, { qm_name: string | null }, {  }>;
  qm_tyvalidationruletypeid: WebAttribute<qm_TYValidationruletype_Select, { qm_tyvalidationruletypeid: string | null }, {  }>;
  qm_validationruletypeen: WebAttribute<qm_TYValidationruletype_Select, { qm_validationruletypeen: string | null }, {  }>;
  qm_validationruletypefr: WebAttribute<qm_TYValidationruletype_Select, { qm_validationruletypefr: string | null }, {  }>;
  statecode: WebAttribute<qm_TYValidationruletype_Select, { statecode: qm_tyvalidationruletype_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<qm_TYValidationruletype_Select, { statuscode: qm_tyvalidationruletype_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<qm_TYValidationruletype_Select, { timezoneruleversionnumber: number | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<qm_TYValidationruletype_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<qm_TYValidationruletype_Select, { versionnumber: number | null }, {  }>;
}
interface qm_TYValidationruletype_Filter {
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  importsequencenumber: number;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  organizationid_guid: XQW.Guid;
  overriddencreatedon: Date;
  qm_defaulterroren: string;
  qm_defaulterrorfr: string;
  qm_name: string;
  qm_tyvalidationruletypeid: XQW.Guid;
  qm_validationruletypeen: string;
  qm_validationruletypefr: string;
  statecode: qm_tyvalidationruletype_statecode;
  statuscode: qm_tyvalidationruletype_statuscode;
  timezoneruleversionnumber: number;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface qm_TYValidationruletype_Expand {
  createdby: WebExpand<qm_TYValidationruletype_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<qm_TYValidationruletype_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<qm_TYValidationruletype_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<qm_TYValidationruletype_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  qm_tyvalidationruletype_syquestionvalidrule: WebExpand<qm_TYValidationruletype_Expand, qm_syquestionvalidationrule_Select, qm_syquestionvalidationrule_Filter, { qm_tyvalidationruletype_syquestionvalidrule: qm_syquestionvalidationrule_Result[] }>;
}
interface qm_TYValidationruletype_FormattedResult {
  createdby_formatted?: string;
  createdon_formatted?: string;
  createdonbehalfby_formatted?: string;
  modifiedby_formatted?: string;
  modifiedon_formatted?: string;
  modifiedonbehalfby_formatted?: string;
  organizationid_formatted?: string;
  overriddencreatedon_formatted?: string;
  statecode_formatted?: string;
  statuscode_formatted?: string;
}
interface qm_TYValidationruletype_Result extends qm_TYValidationruletype_Base, qm_TYValidationruletype_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  organizationid_guid: string | null;
}
interface qm_TYValidationruletype_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface qm_TYValidationruletype_RelatedMany {
  qm_tyvalidationruletype_syquestionvalidrule: WebMappingRetrieve<qm_syquestionvalidationrule_Select,qm_syquestionvalidationrule_Expand,qm_syquestionvalidationrule_Filter,qm_syquestionvalidationrule_Fixed,qm_syquestionvalidationrule_Result,qm_syquestionvalidationrule_FormattedResult>;
}
interface WebEntitiesRetrieve {
  qm_tyvalidationruletypes: WebMappingRetrieve<qm_TYValidationruletype_Select,qm_TYValidationruletype_Expand,qm_TYValidationruletype_Filter,qm_TYValidationruletype_Fixed,qm_TYValidationruletype_Result,qm_TYValidationruletype_FormattedResult>;
}
interface WebEntitiesRelated {
  qm_tyvalidationruletypes: WebMappingRelated<qm_TYValidationruletype_RelatedOne,qm_TYValidationruletype_RelatedMany>;
}
interface WebEntitiesCUDA {
  qm_tyvalidationruletypes: WebMappingCUDA<qm_TYValidationruletype_Create,qm_TYValidationruletype_Update,qm_TYValidationruletype_Select>;
}
