interface ts_securityincidenttype_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_securityincidenttype_statecode | null;
  statuscode?: ts_securityincidenttype_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_name?: string | null;
  ts_securityincidenttypeid?: string | null;
  ts_securityincidenttypenameenglish?: string | null;
  ts_securityincidenttypenamefrench?: string | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_securityincidenttype_Relationships {
  ts_ts_securityincidenttype_ts_securityincident_SecurityIncidentType?: ts_securityincident_Result[] | null;
}
interface ts_securityincidenttype extends ts_securityincidenttype_Base, ts_securityincidenttype_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
}
interface ts_securityincidenttype_Create extends ts_securityincidenttype {
}
interface ts_securityincidenttype_Update extends ts_securityincidenttype {
}
interface ts_securityincidenttype_Select {
  createdby_guid: WebAttribute<ts_securityincidenttype_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_securityincidenttype_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_securityincidenttype_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_securityincidenttype_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_securityincidenttype_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_securityincidenttype_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_securityincidenttype_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_securityincidenttype_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_securityincidenttype_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_securityincidenttype_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_securityincidenttype_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_securityincidenttype_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_securityincidenttype_Select, { statecode: ts_securityincidenttype_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_securityincidenttype_Select, { statuscode: ts_securityincidenttype_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_securityincidenttype_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_name: WebAttribute<ts_securityincidenttype_Select, { ts_name: string | null }, {  }>;
  ts_securityincidenttypeid: WebAttribute<ts_securityincidenttype_Select, { ts_securityincidenttypeid: string | null }, {  }>;
  ts_securityincidenttypenameenglish: WebAttribute<ts_securityincidenttype_Select, { ts_securityincidenttypenameenglish: string | null }, {  }>;
  ts_securityincidenttypenamefrench: WebAttribute<ts_securityincidenttype_Select, { ts_securityincidenttypenamefrench: string | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<ts_securityincidenttype_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_securityincidenttype_Select, { versionnumber: number | null }, {  }>;
}
interface ts_securityincidenttype_Filter {
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
  statecode: ts_securityincidenttype_statecode;
  statuscode: ts_securityincidenttype_statuscode;
  timezoneruleversionnumber: number;
  ts_name: string;
  ts_securityincidenttypeid: XQW.Guid;
  ts_securityincidenttypenameenglish: string;
  ts_securityincidenttypenamefrench: string;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_securityincidenttype_Expand {
  createdby: WebExpand<ts_securityincidenttype_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_securityincidenttype_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_securityincidenttype_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_securityincidenttype_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_securityincidenttype_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningbusinessunit: WebExpand<ts_securityincidenttype_Expand, BusinessUnit_Select, BusinessUnit_Filter, { owningbusinessunit: BusinessUnit_Result }>;
  owningteam: WebExpand<ts_securityincidenttype_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ts_securityincidenttype_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_ts_securityincidenttype_ts_securityincident_SecurityIncidentType: WebExpand<ts_securityincidenttype_Expand, ts_securityincident_Select, ts_securityincident_Filter, { ts_ts_securityincidenttype_ts_securityincident_SecurityIncidentType: ts_securityincident_Result[] }>;
}
interface ts_securityincidenttype_FormattedResult {
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
interface ts_securityincidenttype_Result extends ts_securityincidenttype_Base, ts_securityincidenttype_Relationships {
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
interface ts_securityincidenttype_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningbusinessunit: WebMappingRetrieve<BusinessUnit_Select,BusinessUnit_Expand,BusinessUnit_Filter,BusinessUnit_Fixed,BusinessUnit_Result,BusinessUnit_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface ts_securityincidenttype_RelatedMany {
  ts_ts_securityincidenttype_ts_securityincident_SecurityIncidentType: WebMappingRetrieve<ts_securityincident_Select,ts_securityincident_Expand,ts_securityincident_Filter,ts_securityincident_Fixed,ts_securityincident_Result,ts_securityincident_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_securityincidenttypes: WebMappingRetrieve<ts_securityincidenttype_Select,ts_securityincidenttype_Expand,ts_securityincidenttype_Filter,ts_securityincidenttype_Fixed,ts_securityincidenttype_Result,ts_securityincidenttype_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_securityincidenttypes: WebMappingRelated<ts_securityincidenttype_RelatedOne,ts_securityincidenttype_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_securityincidenttypes: WebMappingCUDA<ts_securityincidenttype_Create,ts_securityincidenttype_Update,ts_securityincidenttype_Select>;
}
