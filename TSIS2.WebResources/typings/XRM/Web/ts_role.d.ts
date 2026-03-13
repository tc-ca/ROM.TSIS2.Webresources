interface ts_role_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_role_statecode | null;
  statuscode?: ts_role_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_name?: string | null;
  ts_roleid?: string | null;
  ts_rolenameenglish?: string | null;
  ts_rolenamefrench?: string | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_role_Relationships {
  ts_role_ts_operationcontact_connectionrole?: ts_operationcontact_Result[] | null;
}
interface ts_role extends ts_role_Base, ts_role_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
}
interface ts_role_Create extends ts_role {
}
interface ts_role_Update extends ts_role {
}
interface ts_role_Select {
  createdby_guid: WebAttribute<ts_role_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_role_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_role_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_role_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_role_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_role_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_role_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_role_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_role_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_role_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_role_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_role_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_role_Select, { statecode: ts_role_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_role_Select, { statuscode: ts_role_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_role_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_name: WebAttribute<ts_role_Select, { ts_name: string | null }, {  }>;
  ts_roleid: WebAttribute<ts_role_Select, { ts_roleid: string | null }, {  }>;
  ts_rolenameenglish: WebAttribute<ts_role_Select, { ts_rolenameenglish: string | null }, {  }>;
  ts_rolenamefrench: WebAttribute<ts_role_Select, { ts_rolenamefrench: string | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<ts_role_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_role_Select, { versionnumber: number | null }, {  }>;
}
interface ts_role_Filter {
  createdby_guid: XQW.Guid;
  createdon: Date;
  createdonbehalfby_guid: XQW.Guid;
  importsequencenumber: number;
  modifiedby_guid: XQW.Guid;
  modifiedon: Date;
  modifiedonbehalfby_guid: XQW.Guid;
  overriddencreatedon: Date;
  ownerid_guid: XQW.Guid;
  owningbusinessunit_guid: XQW.Guid;
  owningteam_guid: XQW.Guid;
  owninguser_guid: XQW.Guid;
  statecode: ts_role_statecode;
  statuscode: ts_role_statuscode;
  timezoneruleversionnumber: number;
  ts_name: string;
  ts_roleid: XQW.Guid;
  ts_rolenameenglish: string;
  ts_rolenamefrench: string;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_role_Expand {
  createdby: WebExpand<ts_role_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_role_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_role_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_role_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_role_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningbusinessunit: WebExpand<ts_role_Expand, BusinessUnit_Select, BusinessUnit_Filter, { owningbusinessunit: BusinessUnit_Result }>;
  owningteam: WebExpand<ts_role_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ts_role_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_role_ts_operationcontact_connectionrole: WebExpand<ts_role_Expand, ts_operationcontact_Select, ts_operationcontact_Filter, { ts_role_ts_operationcontact_connectionrole: ts_operationcontact_Result[] }>;
}
interface ts_role_FormattedResult {
  createdby_formatted?: string;
  createdon_formatted?: string;
  createdonbehalfby_formatted?: string;
  modifiedby_formatted?: string;
  modifiedon_formatted?: string;
  modifiedonbehalfby_formatted?: string;
  overriddencreatedon_formatted?: string;
  ownerid_formatted?: string;
  owningbusinessunit_formatted?: string;
  owningteam_formatted?: string;
  owninguser_formatted?: string;
  statecode_formatted?: string;
  statuscode_formatted?: string;
}
interface ts_role_Result extends ts_role_Base, ts_role_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
}
interface ts_role_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningbusinessunit: WebMappingRetrieve<BusinessUnit_Select,BusinessUnit_Expand,BusinessUnit_Filter,BusinessUnit_Fixed,BusinessUnit_Result,BusinessUnit_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface ts_role_RelatedMany {
  ts_role_ts_operationcontact_connectionrole: WebMappingRetrieve<ts_operationcontact_Select,ts_operationcontact_Expand,ts_operationcontact_Filter,ts_operationcontact_Fixed,ts_operationcontact_Result,ts_operationcontact_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_roles: WebMappingRetrieve<ts_role_Select,ts_role_Expand,ts_role_Filter,ts_role_Fixed,ts_role_Result,ts_role_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_roles: WebMappingRelated<ts_role_RelatedOne,ts_role_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_roles: WebMappingCUDA<ts_role_Create,ts_role_Update,ts_role_Select>;
}
