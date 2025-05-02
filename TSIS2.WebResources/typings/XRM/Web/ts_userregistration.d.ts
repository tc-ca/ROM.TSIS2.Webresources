interface ts_UserRegistration_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_userregistration_statecode | null;
  statuscode?: ts_userregistration_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_firstname?: string | null;
  ts_lastname?: string | null;
  ts_name?: string | null;
  ts_userregistrationid?: string | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_UserRegistration_Relationships {
}
interface ts_UserRegistration extends ts_UserRegistration_Base, ts_UserRegistration_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_BusinessUnit_bind$businessunits?: string | null;
  ts_aaduser_bind$aadusers?: string | null;
}
interface ts_UserRegistration_Create extends ts_UserRegistration {
}
interface ts_UserRegistration_Update extends ts_UserRegistration {
}
interface ts_UserRegistration_Select {
  createdby_guid: WebAttribute<ts_UserRegistration_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_UserRegistration_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_UserRegistration_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_UserRegistration_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_UserRegistration_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_UserRegistration_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_UserRegistration_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_UserRegistration_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_UserRegistration_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_UserRegistration_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_UserRegistration_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_UserRegistration_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_UserRegistration_Select, { statecode: ts_userregistration_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_UserRegistration_Select, { statuscode: ts_userregistration_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_UserRegistration_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_aaduser_guid: WebAttribute<ts_UserRegistration_Select, { ts_aaduser_guid: string | null }, { ts_aaduser_formatted?: string }>;
  ts_businessunit_guid: WebAttribute<ts_UserRegistration_Select, { ts_businessunit_guid: string | null }, { ts_businessunit_formatted?: string }>;
  ts_firstname: WebAttribute<ts_UserRegistration_Select, { ts_firstname: string | null }, {  }>;
  ts_lastname: WebAttribute<ts_UserRegistration_Select, { ts_lastname: string | null }, {  }>;
  ts_name: WebAttribute<ts_UserRegistration_Select, { ts_name: string | null }, {  }>;
  ts_userregistrationid: WebAttribute<ts_UserRegistration_Select, { ts_userregistrationid: string | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<ts_UserRegistration_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_UserRegistration_Select, { versionnumber: number | null }, {  }>;
}
interface ts_UserRegistration_Filter {
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
  statecode: ts_userregistration_statecode;
  statuscode: ts_userregistration_statuscode;
  timezoneruleversionnumber: number;
  ts_aaduser_guid: XQW.Guid;
  ts_businessunit_guid: XQW.Guid;
  ts_firstname: string;
  ts_lastname: string;
  ts_name: string;
  ts_userregistrationid: XQW.Guid;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_UserRegistration_Expand {
  createdby: WebExpand<ts_UserRegistration_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_UserRegistration_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_UserRegistration_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_UserRegistration_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_UserRegistration_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningteam: WebExpand<ts_UserRegistration_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ts_UserRegistration_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
}
interface ts_UserRegistration_FormattedResult {
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
  ts_aaduser_formatted?: string;
  ts_businessunit_formatted?: string;
}
interface ts_UserRegistration_Result extends ts_UserRegistration_Base, ts_UserRegistration_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
  ts_aaduser_guid: string | null;
  ts_businessunit_guid: string | null;
}
interface ts_UserRegistration_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface ts_UserRegistration_RelatedMany {
}
interface WebEntitiesRetrieve {
  ts_userregistrations: WebMappingRetrieve<ts_UserRegistration_Select,ts_UserRegistration_Expand,ts_UserRegistration_Filter,ts_UserRegistration_Fixed,ts_UserRegistration_Result,ts_UserRegistration_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_userregistrations: WebMappingRelated<ts_UserRegistration_RelatedOne,ts_UserRegistration_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_userregistrations: WebMappingCUDA<ts_UserRegistration_Create,ts_UserRegistration_Update,ts_UserRegistration_Select>;
}
