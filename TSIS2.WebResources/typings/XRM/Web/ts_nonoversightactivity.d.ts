interface ts_nonoversightactivity_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_nonoversightactivity_statecode | null;
  statuscode?: ts_nonoversightactivity_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_activitytime?: number | null;
  ts_dateofactivity?: Date | null;
  ts_description?: string | null;
  ts_name?: string | null;
  ts_nonoversightactivityid?: string | null;
  ts_overtime?: number | null;
  ts_quarter?: ts_quarter | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_nonoversightactivity_Relationships {
  ts_FiscalYear?: tc_TCFiscalYear_Result | null;
}
interface ts_nonoversightactivity extends ts_nonoversightactivity_Base, ts_nonoversightactivity_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_Category_bind$ts_timetrackingcategories?: string | null;
  ts_FiscalYear_bind$tc_tcfiscalyears?: string | null;
  ts_Program_bind$businessunits?: string | null;
}
interface ts_nonoversightactivity_Create extends ts_nonoversightactivity {
}
interface ts_nonoversightactivity_Update extends ts_nonoversightactivity {
}
interface ts_nonoversightactivity_Select {
  createdby_guid: WebAttribute<ts_nonoversightactivity_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_nonoversightactivity_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_nonoversightactivity_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_nonoversightactivity_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_nonoversightactivity_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_nonoversightactivity_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_nonoversightactivity_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_nonoversightactivity_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_nonoversightactivity_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_nonoversightactivity_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_nonoversightactivity_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_nonoversightactivity_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_nonoversightactivity_Select, { statecode: ts_nonoversightactivity_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_nonoversightactivity_Select, { statuscode: ts_nonoversightactivity_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_nonoversightactivity_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_activitytime: WebAttribute<ts_nonoversightactivity_Select, { ts_activitytime: number | null }, {  }>;
  ts_category_guid: WebAttribute<ts_nonoversightactivity_Select, { ts_category_guid: string | null }, { ts_category_formatted?: string }>;
  ts_dateofactivity: WebAttribute<ts_nonoversightactivity_Select, { ts_dateofactivity: Date | null }, { ts_dateofactivity_formatted?: string }>;
  ts_description: WebAttribute<ts_nonoversightactivity_Select, { ts_description: string | null }, {  }>;
  ts_fiscalyear_guid: WebAttribute<ts_nonoversightactivity_Select, { ts_fiscalyear_guid: string | null }, { ts_fiscalyear_formatted?: string }>;
  ts_name: WebAttribute<ts_nonoversightactivity_Select, { ts_name: string | null }, {  }>;
  ts_nonoversightactivityid: WebAttribute<ts_nonoversightactivity_Select, { ts_nonoversightactivityid: string | null }, {  }>;
  ts_overtime: WebAttribute<ts_nonoversightactivity_Select, { ts_overtime: number | null }, {  }>;
  ts_program_guid: WebAttribute<ts_nonoversightactivity_Select, { ts_program_guid: string | null }, { ts_program_formatted?: string }>;
  ts_quarter: WebAttribute<ts_nonoversightactivity_Select, { ts_quarter: ts_quarter | null }, { ts_quarter_formatted?: string }>;
  utcconversiontimezonecode: WebAttribute<ts_nonoversightactivity_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_nonoversightactivity_Select, { versionnumber: number | null }, {  }>;
}
interface ts_nonoversightactivity_Filter {
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
  statecode: ts_nonoversightactivity_statecode;
  statuscode: ts_nonoversightactivity_statuscode;
  timezoneruleversionnumber: number;
  ts_activitytime: any;
  ts_category_guid: XQW.Guid;
  ts_dateofactivity: Date;
  ts_description: string;
  ts_fiscalyear_guid: XQW.Guid;
  ts_name: string;
  ts_nonoversightactivityid: XQW.Guid;
  ts_overtime: any;
  ts_program_guid: XQW.Guid;
  ts_quarter: ts_quarter;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_nonoversightactivity_Expand {
  createdby: WebExpand<ts_nonoversightactivity_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_nonoversightactivity_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_nonoversightactivity_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_nonoversightactivity_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_nonoversightactivity_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningteam: WebExpand<ts_nonoversightactivity_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ts_nonoversightactivity_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_FiscalYear: WebExpand<ts_nonoversightactivity_Expand, tc_TCFiscalYear_Select, tc_TCFiscalYear_Filter, { ts_FiscalYear: tc_TCFiscalYear_Result }>;
}
interface ts_nonoversightactivity_FormattedResult {
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
  ts_category_formatted?: string;
  ts_dateofactivity_formatted?: string;
  ts_fiscalyear_formatted?: string;
  ts_program_formatted?: string;
  ts_quarter_formatted?: string;
}
interface ts_nonoversightactivity_Result extends ts_nonoversightactivity_Base, ts_nonoversightactivity_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
  ts_category_guid: string | null;
  ts_fiscalyear_guid: string | null;
  ts_program_guid: string | null;
}
interface ts_nonoversightactivity_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_FiscalYear: WebMappingRetrieve<tc_TCFiscalYear_Select,tc_TCFiscalYear_Expand,tc_TCFiscalYear_Filter,tc_TCFiscalYear_Fixed,tc_TCFiscalYear_Result,tc_TCFiscalYear_FormattedResult>;
}
interface ts_nonoversightactivity_RelatedMany {
}
interface WebEntitiesRetrieve {
  ts_nonoversightactivities: WebMappingRetrieve<ts_nonoversightactivity_Select,ts_nonoversightactivity_Expand,ts_nonoversightactivity_Filter,ts_nonoversightactivity_Fixed,ts_nonoversightactivity_Result,ts_nonoversightactivity_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_nonoversightactivities: WebMappingRelated<ts_nonoversightactivity_RelatedOne,ts_nonoversightactivity_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_nonoversightactivities: WebMappingCUDA<ts_nonoversightactivity_Create,ts_nonoversightactivity_Update,ts_nonoversightactivity_Select>;
}
