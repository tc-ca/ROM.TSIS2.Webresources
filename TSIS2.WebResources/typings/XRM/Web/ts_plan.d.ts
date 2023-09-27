interface ts_Plan_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_plan_statecode | null;
  statuscode?: ts_plan_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_name?: string | null;
  ts_planid?: string | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_Plan_Relationships {
  ts_suggestedinspection_ts_plan?: ts_SuggestedInspection_Result[] | null;
}
interface ts_Plan extends ts_Plan_Base, ts_Plan_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_fiscalyear_bind$tc_tcfiscalyears?: string | null;
  ts_team_bind$teams?: string | null;
}
interface ts_Plan_Create extends ts_Plan {
}
interface ts_Plan_Update extends ts_Plan {
}
interface ts_Plan_Select {
  createdby_guid: WebAttribute<ts_Plan_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_Plan_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_Plan_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_Plan_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_Plan_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_Plan_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_Plan_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_Plan_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_Plan_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_Plan_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_Plan_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_Plan_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_Plan_Select, { statecode: ts_plan_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_Plan_Select, { statuscode: ts_plan_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_Plan_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_fiscalyear_guid: WebAttribute<ts_Plan_Select, { ts_fiscalyear_guid: string | null }, { ts_fiscalyear_formatted?: string }>;
  ts_name: WebAttribute<ts_Plan_Select, { ts_name: string | null }, {  }>;
  ts_planid: WebAttribute<ts_Plan_Select, { ts_planid: string | null }, {  }>;
  ts_team_guid: WebAttribute<ts_Plan_Select, { ts_team_guid: string | null }, { ts_team_formatted?: string }>;
  utcconversiontimezonecode: WebAttribute<ts_Plan_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_Plan_Select, { versionnumber: number | null }, {  }>;
}
interface ts_Plan_Filter {
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
  statecode: ts_plan_statecode;
  statuscode: ts_plan_statuscode;
  timezoneruleversionnumber: number;
  ts_fiscalyear_guid: XQW.Guid;
  ts_name: string;
  ts_planid: XQW.Guid;
  ts_team_guid: XQW.Guid;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_Plan_Expand {
  createdby: WebExpand<ts_Plan_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_Plan_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_Plan_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_Plan_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_Plan_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningteam: WebExpand<ts_Plan_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ts_Plan_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_fiscalyear: WebExpand<ts_Plan_Expand, tc_TCFiscalYear_Select, tc_TCFiscalYear_Filter, { ts_fiscalyear: tc_TCFiscalYear_Result }>;
  ts_suggestedinspection_ts_plan: WebExpand<ts_Plan_Expand, ts_SuggestedInspection_Select, ts_SuggestedInspection_Filter, { ts_suggestedinspection_ts_plan: ts_SuggestedInspection_Result[] }>;
  ts_team: WebExpand<ts_Plan_Expand, Team_Select, Team_Filter, { ts_team: Team_Result }>;
}
interface ts_Plan_FormattedResult {
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
  ts_fiscalyear_formatted?: string;
  ts_team_formatted?: string;
}
interface ts_Plan_Result extends ts_Plan_Base, ts_Plan_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
  ts_fiscalyear_guid: string | null;
  ts_team_guid: string | null;
}
interface ts_Plan_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_fiscalyear: WebMappingRetrieve<tc_TCFiscalYear_Select,tc_TCFiscalYear_Expand,tc_TCFiscalYear_Filter,tc_TCFiscalYear_Fixed,tc_TCFiscalYear_Result,tc_TCFiscalYear_FormattedResult>;
  ts_team: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
}
interface ts_Plan_RelatedMany {
  ts_suggestedinspection_ts_plan: WebMappingRetrieve<ts_SuggestedInspection_Select,ts_SuggestedInspection_Expand,ts_SuggestedInspection_Filter,ts_SuggestedInspection_Fixed,ts_SuggestedInspection_Result,ts_SuggestedInspection_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_plans: WebMappingRetrieve<ts_Plan_Select,ts_Plan_Expand,ts_Plan_Filter,ts_Plan_Fixed,ts_Plan_Result,ts_Plan_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_plans: WebMappingRelated<ts_Plan_RelatedOne,ts_Plan_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_plans: WebMappingCUDA<ts_Plan_Create,ts_Plan_Update,ts_Plan_Select>;
}
