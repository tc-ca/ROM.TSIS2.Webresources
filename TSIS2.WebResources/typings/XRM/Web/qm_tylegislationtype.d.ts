interface qm_tylegislationtype_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  qm_name?: string | null;
  qm_tylegislationtypeid?: string | null;
  statecode?: qm_tylegislationtype_statecode | null;
  statuscode?: qm_tylegislationtype_statuscode | null;
  timezoneruleversionnumber?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface qm_tylegislationtype_Relationships {
  qm_tylegislationtype_rclegislation?: qm_rclegislation_Result[] | null;
}
interface qm_tylegislationtype extends qm_tylegislationtype_Base, qm_tylegislationtype_Relationships {
}
interface qm_tylegislationtype_Create extends qm_tylegislationtype {
}
interface qm_tylegislationtype_Update extends qm_tylegislationtype {
}
interface qm_tylegislationtype_Select {
  createdby_guid: WebAttribute<qm_tylegislationtype_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<qm_tylegislationtype_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<qm_tylegislationtype_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<qm_tylegislationtype_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<qm_tylegislationtype_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<qm_tylegislationtype_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<qm_tylegislationtype_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  organizationid_guid: WebAttribute<qm_tylegislationtype_Select, { organizationid_guid: string | null }, { organizationid_formatted?: string }>;
  overriddencreatedon: WebAttribute<qm_tylegislationtype_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  qm_name: WebAttribute<qm_tylegislationtype_Select, { qm_name: string | null }, {  }>;
  qm_tylegislationtypeid: WebAttribute<qm_tylegislationtype_Select, { qm_tylegislationtypeid: string | null }, {  }>;
  statecode: WebAttribute<qm_tylegislationtype_Select, { statecode: qm_tylegislationtype_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<qm_tylegislationtype_Select, { statuscode: qm_tylegislationtype_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<qm_tylegislationtype_Select, { timezoneruleversionnumber: number | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<qm_tylegislationtype_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<qm_tylegislationtype_Select, { versionnumber: number | null }, {  }>;
}
interface qm_tylegislationtype_Filter {
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  importsequencenumber: number;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  organizationid_guid: XQW.Guid;
  overriddencreatedon: Date;
  qm_name: string;
  qm_tylegislationtypeid: XQW.Guid;
  statecode: qm_tylegislationtype_statecode;
  statuscode: qm_tylegislationtype_statuscode;
  timezoneruleversionnumber: number;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface qm_tylegislationtype_Expand {
  createdby: WebExpand<qm_tylegislationtype_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<qm_tylegislationtype_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<qm_tylegislationtype_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<qm_tylegislationtype_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  qm_tylegislationtype_rclegislation: WebExpand<qm_tylegislationtype_Expand, qm_rclegislation_Select, qm_rclegislation_Filter, { qm_tylegislationtype_rclegislation: qm_rclegislation_Result[] }>;
}
interface qm_tylegislationtype_FormattedResult {
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
interface qm_tylegislationtype_Result extends qm_tylegislationtype_Base, qm_tylegislationtype_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  organizationid_guid: string | null;
}
interface qm_tylegislationtype_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface qm_tylegislationtype_RelatedMany {
  qm_tylegislationtype_rclegislation: WebMappingRetrieve<qm_rclegislation_Select,qm_rclegislation_Expand,qm_rclegislation_Filter,qm_rclegislation_Fixed,qm_rclegislation_Result,qm_rclegislation_FormattedResult>;
}
interface WebEntitiesRetrieve {
  qm_tylegislationtypes: WebMappingRetrieve<qm_tylegislationtype_Select,qm_tylegislationtype_Expand,qm_tylegislationtype_Filter,qm_tylegislationtype_Fixed,qm_tylegislationtype_Result,qm_tylegislationtype_FormattedResult>;
}
interface WebEntitiesRelated {
  qm_tylegislationtypes: WebMappingRelated<qm_tylegislationtype_RelatedOne,qm_tylegislationtype_RelatedMany>;
}
interface WebEntitiesCUDA {
  qm_tylegislationtypes: WebMappingCUDA<qm_tylegislationtype_Create,qm_tylegislationtype_Update,qm_tylegislationtype_Select>;
}
