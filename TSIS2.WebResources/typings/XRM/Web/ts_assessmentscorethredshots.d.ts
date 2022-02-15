interface ts_assessmentscorethredshots_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_assessmentscorethredshots_statecode | null;
  statuscode?: ts_assessmentscorethredshots_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_assessmentscorethredshotsid?: string | null;
  ts_assessmenttool?: ts_assessmenttool | null;
  ts_maximum?: number | null;
  ts_minimum?: number | null;
  ts_name?: string | null;
  ts_ncatenforcementaction?: ts_ncatrecommendations | null;
  ts_rateenforcementaction?: ts_raterecommendations | null;
  ts_rateenforcementhistory?: ts_ratespecificenforcementhistory | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_assessmentscorethredshots_Relationships {
}
interface ts_assessmentscorethredshots extends ts_assessmentscorethredshots_Base, ts_assessmentscorethredshots_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
}
interface ts_assessmentscorethredshots_Create extends ts_assessmentscorethredshots {
}
interface ts_assessmentscorethredshots_Update extends ts_assessmentscorethredshots {
}
interface ts_assessmentscorethredshots_Select {
  createdby_guid: WebAttribute<ts_assessmentscorethredshots_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_assessmentscorethredshots_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_assessmentscorethredshots_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_assessmentscorethredshots_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_assessmentscorethredshots_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_assessmentscorethredshots_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_assessmentscorethredshots_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_assessmentscorethredshots_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_assessmentscorethredshots_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_assessmentscorethredshots_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_assessmentscorethredshots_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_assessmentscorethredshots_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_assessmentscorethredshots_Select, { statecode: ts_assessmentscorethredshots_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_assessmentscorethredshots_Select, { statuscode: ts_assessmentscorethredshots_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_assessmentscorethredshots_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_assessmentscorethredshotsid: WebAttribute<ts_assessmentscorethredshots_Select, { ts_assessmentscorethredshotsid: string | null }, {  }>;
  ts_assessmenttool: WebAttribute<ts_assessmentscorethredshots_Select, { ts_assessmenttool: ts_assessmenttool | null }, { ts_assessmenttool_formatted?: string }>;
  ts_maximum: WebAttribute<ts_assessmentscorethredshots_Select, { ts_maximum: number | null }, {  }>;
  ts_minimum: WebAttribute<ts_assessmentscorethredshots_Select, { ts_minimum: number | null }, {  }>;
  ts_name: WebAttribute<ts_assessmentscorethredshots_Select, { ts_name: string | null }, {  }>;
  ts_ncatenforcementaction: WebAttribute<ts_assessmentscorethredshots_Select, { ts_ncatenforcementaction: ts_ncatrecommendations | null }, { ts_ncatenforcementaction_formatted?: string }>;
  ts_rateenforcementaction: WebAttribute<ts_assessmentscorethredshots_Select, { ts_rateenforcementaction: ts_raterecommendations | null }, { ts_rateenforcementaction_formatted?: string }>;
  ts_rateenforcementhistory: WebAttribute<ts_assessmentscorethredshots_Select, { ts_rateenforcementhistory: ts_ratespecificenforcementhistory | null }, { ts_rateenforcementhistory_formatted?: string }>;
  utcconversiontimezonecode: WebAttribute<ts_assessmentscorethredshots_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_assessmentscorethredshots_Select, { versionnumber: number | null }, {  }>;
}
interface ts_assessmentscorethredshots_Filter {
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
  statecode: ts_assessmentscorethredshots_statecode;
  statuscode: ts_assessmentscorethredshots_statuscode;
  timezoneruleversionnumber: number;
  ts_assessmentscorethredshotsid: XQW.Guid;
  ts_assessmenttool: ts_assessmenttool;
  ts_maximum: number;
  ts_minimum: number;
  ts_name: string;
  ts_ncatenforcementaction: ts_ncatrecommendations;
  ts_rateenforcementaction: ts_raterecommendations;
  ts_rateenforcementhistory: ts_ratespecificenforcementhistory;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_assessmentscorethredshots_Expand {
  createdby: WebExpand<ts_assessmentscorethredshots_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_assessmentscorethredshots_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_assessmentscorethredshots_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_assessmentscorethredshots_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_assessmentscorethredshots_Expand, SystemUser_Select, SystemUser_Filter, { ownerid: SystemUser_Result }>;
  owninguser: WebExpand<ts_assessmentscorethredshots_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
}
interface ts_assessmentscorethredshots_FormattedResult {
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
  ts_assessmenttool_formatted?: string;
  ts_ncatenforcementaction_formatted?: string;
  ts_rateenforcementaction_formatted?: string;
  ts_rateenforcementhistory_formatted?: string;
}
interface ts_assessmentscorethredshots_Result extends ts_assessmentscorethredshots_Base, ts_assessmentscorethredshots_Relationships {
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
interface ts_assessmentscorethredshots_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface ts_assessmentscorethredshots_RelatedMany {
}
interface WebEntitiesRetrieve {
  ts_assessmentscorethredshotses: WebMappingRetrieve<ts_assessmentscorethredshots_Select,ts_assessmentscorethredshots_Expand,ts_assessmentscorethredshots_Filter,ts_assessmentscorethredshots_Fixed,ts_assessmentscorethredshots_Result,ts_assessmentscorethredshots_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_assessmentscorethredshotses: WebMappingRelated<ts_assessmentscorethredshots_RelatedOne,ts_assessmentscorethredshots_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_assessmentscorethredshotses: WebMappingCUDA<ts_assessmentscorethredshots_Create,ts_assessmentscorethredshots_Update,ts_assessmentscorethredshots_Select>;
}
