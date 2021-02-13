interface qm_sygroup_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  qm_groupe?: string | null;
  qm_groupf?: string | null;
  qm_isvisibleind?: boolean | null;
  qm_name?: string | null;
  qm_ordernbr?: number | null;
  qm_sygroupid?: string | null;
  statecode?: qm_sygroup_statecode | null;
  statuscode?: qm_sygroup_statuscode | null;
  timezoneruleversionnumber?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface qm_sygroup_Relationships {
  qm_sygroup_syquestion?: qm_syquestion_Result[] | null;
  qm_sytemplate_sygroup?: qm_sytemplate_Result[] | null;
}
interface qm_sygroup extends qm_sygroup_Base, qm_sygroup_Relationships {
}
interface qm_sygroup_Create extends qm_sygroup {
}
interface qm_sygroup_Update extends qm_sygroup {
}
interface qm_sygroup_Select {
  createdby_guid: WebAttribute<qm_sygroup_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<qm_sygroup_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<qm_sygroup_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<qm_sygroup_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<qm_sygroup_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<qm_sygroup_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<qm_sygroup_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  organizationid_guid: WebAttribute<qm_sygroup_Select, { organizationid_guid: string | null }, { organizationid_formatted?: string }>;
  overriddencreatedon: WebAttribute<qm_sygroup_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  qm_groupe: WebAttribute<qm_sygroup_Select, { qm_groupe: string | null }, {  }>;
  qm_groupf: WebAttribute<qm_sygroup_Select, { qm_groupf: string | null }, {  }>;
  qm_isvisibleind: WebAttribute<qm_sygroup_Select, { qm_isvisibleind: boolean | null }, {  }>;
  qm_name: WebAttribute<qm_sygroup_Select, { qm_name: string | null }, {  }>;
  qm_ordernbr: WebAttribute<qm_sygroup_Select, { qm_ordernbr: number | null }, {  }>;
  qm_sygroupid: WebAttribute<qm_sygroup_Select, { qm_sygroupid: string | null }, {  }>;
  statecode: WebAttribute<qm_sygroup_Select, { statecode: qm_sygroup_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<qm_sygroup_Select, { statuscode: qm_sygroup_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<qm_sygroup_Select, { timezoneruleversionnumber: number | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<qm_sygroup_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<qm_sygroup_Select, { versionnumber: number | null }, {  }>;
}
interface qm_sygroup_Filter {
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  importsequencenumber: number;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  organizationid_guid: XQW.Guid;
  overriddencreatedon: Date;
  qm_groupe: string;
  qm_groupf: string;
  qm_isvisibleind: boolean;
  qm_name: string;
  qm_ordernbr: number;
  qm_sygroupid: XQW.Guid;
  statecode: qm_sygroup_statecode;
  statuscode: qm_sygroup_statuscode;
  timezoneruleversionnumber: number;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface qm_sygroup_Expand {
  createdby: WebExpand<qm_sygroup_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<qm_sygroup_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<qm_sygroup_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<qm_sygroup_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  qm_sygroup_syquestion: WebExpand<qm_sygroup_Expand, qm_syquestion_Select, qm_syquestion_Filter, { qm_sygroup_syquestion: qm_syquestion_Result[] }>;
  qm_sytemplate_sygroup: WebExpand<qm_sygroup_Expand, qm_sytemplate_Select, qm_sytemplate_Filter, { qm_sytemplate_sygroup: qm_sytemplate_Result[] }>;
}
interface qm_sygroup_FormattedResult {
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
interface qm_sygroup_Result extends qm_sygroup_Base, qm_sygroup_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  organizationid_guid: string | null;
}
interface qm_sygroup_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface qm_sygroup_RelatedMany {
  qm_sygroup_syquestion: WebMappingRetrieve<qm_syquestion_Select,qm_syquestion_Expand,qm_syquestion_Filter,qm_syquestion_Fixed,qm_syquestion_Result,qm_syquestion_FormattedResult>;
  qm_sytemplate_sygroup: WebMappingRetrieve<qm_sytemplate_Select,qm_sytemplate_Expand,qm_sytemplate_Filter,qm_sytemplate_Fixed,qm_sytemplate_Result,qm_sytemplate_FormattedResult>;
}
interface WebEntitiesRetrieve {
  qm_sygroups: WebMappingRetrieve<qm_sygroup_Select,qm_sygroup_Expand,qm_sygroup_Filter,qm_sygroup_Fixed,qm_sygroup_Result,qm_sygroup_FormattedResult>;
}
interface WebEntitiesRelated {
  qm_sygroups: WebMappingRelated<qm_sygroup_RelatedOne,qm_sygroup_RelatedMany>;
}
interface WebEntitiesCUDA {
  qm_sygroups: WebMappingCUDA<qm_sygroup_Create,qm_sygroup_Update,qm_sygroup_Select>;
}
