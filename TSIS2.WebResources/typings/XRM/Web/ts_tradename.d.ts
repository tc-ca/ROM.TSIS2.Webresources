interface ts_tradename_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_tradename_statecode | null;
  statuscode?: ts_tradename_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_name?: string | null;
  ts_tradenameid?: string | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_tradename_Relationships {
  ts_StakeholderId?: Account_Result | null;
  ts_msdyn_workorder_ts_tradenameId_ts_tradena?: msdyn_workorder_Result[] | null;
  ts_ts_tradename_incident?: Incident_Result[] | null;
}
interface ts_tradename extends ts_tradename_Base, ts_tradename_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_StakeholderId_bind$accounts?: string | null;
}
interface ts_tradename_Create extends ts_tradename {
}
interface ts_tradename_Update extends ts_tradename {
}
interface ts_tradename_Select {
  createdby_guid: WebAttribute<ts_tradename_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_tradename_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_tradename_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_tradename_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_tradename_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_tradename_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_tradename_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_tradename_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_tradename_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_tradename_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_tradename_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_tradename_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_tradename_Select, { statecode: ts_tradename_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_tradename_Select, { statuscode: ts_tradename_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_tradename_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_name: WebAttribute<ts_tradename_Select, { ts_name: string | null }, {  }>;
  ts_stakeholderid_guid: WebAttribute<ts_tradename_Select, { ts_stakeholderid_guid: string | null }, { ts_stakeholderid_formatted?: string }>;
  ts_tradenameid: WebAttribute<ts_tradename_Select, { ts_tradenameid: string | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<ts_tradename_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_tradename_Select, { versionnumber: number | null }, {  }>;
}
interface ts_tradename_Filter {
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
  statecode: ts_tradename_statecode;
  statuscode: ts_tradename_statuscode;
  timezoneruleversionnumber: number;
  ts_name: string;
  ts_stakeholderid_guid: XQW.Guid;
  ts_tradenameid: XQW.Guid;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_tradename_Expand {
  createdby: WebExpand<ts_tradename_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_tradename_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_tradename_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_tradename_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_tradename_Expand, SystemUser_Select, SystemUser_Filter, { ownerid: SystemUser_Result }>;
  owninguser: WebExpand<ts_tradename_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_StakeholderId: WebExpand<ts_tradename_Expand, Account_Select, Account_Filter, { ts_StakeholderId: Account_Result }>;
  ts_msdyn_workorder_ts_tradenameId_ts_tradena: WebExpand<ts_tradename_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { ts_msdyn_workorder_ts_tradenameId_ts_tradena: msdyn_workorder_Result[] }>;
  ts_ts_tradename_incident: WebExpand<ts_tradename_Expand, Incident_Select, Incident_Filter, { ts_ts_tradename_incident: Incident_Result[] }>;
}
interface ts_tradename_FormattedResult {
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
  ts_stakeholderid_formatted?: string;
}
interface ts_tradename_Result extends ts_tradename_Base, ts_tradename_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
  ts_stakeholderid_guid: string | null;
}
interface ts_tradename_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_StakeholderId: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
}
interface ts_tradename_RelatedMany {
  ts_msdyn_workorder_ts_tradenameId_ts_tradena: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
  ts_ts_tradename_incident: WebMappingRetrieve<Incident_Select,Incident_Expand,Incident_Filter,Incident_Fixed,Incident_Result,Incident_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_tradenames: WebMappingRetrieve<ts_tradename_Select,ts_tradename_Expand,ts_tradename_Filter,ts_tradename_Fixed,ts_tradename_Result,ts_tradename_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_tradenames: WebMappingRelated<ts_tradename_RelatedOne,ts_tradename_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_tradenames: WebMappingCUDA<ts_tradename_Create,ts_tradename_Update,ts_tradename_Select>;
}
