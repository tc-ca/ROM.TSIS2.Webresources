interface tc_TCFiscalPeriod_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: tc_tcfiscalperiod_statecode | null;
  statuscode?: tc_tcfiscalperiod_statuscode | null;
  tc_fiscalperiodlonglbl?: string | null;
  tc_name?: string | null;
  tc_tcfiscalperiodid?: string | null;
  timezoneruleversionnumber?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface tc_TCFiscalPeriod_Relationships {
  tc_TCFiscalQuarterId?: tc_TCFiscalQuarter_Result | null;
  tc_TCFiscalYearId?: tc_TCFiscalYear_Result | null;
  tc_TCMonthId?: tc_TCMonth_Result | null;
}
interface tc_TCFiscalPeriod extends tc_TCFiscalPeriod_Base, tc_TCFiscalPeriod_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  tc_TCFiscalQuarterId_bind$tc_tcfiscalquarters?: string | null;
  tc_TCFiscalYearId_bind$tc_tcfiscalyears?: string | null;
  tc_TCMonthId_bind$tc_tcmonths?: string | null;
}
interface tc_TCFiscalPeriod_Create extends tc_TCFiscalPeriod {
}
interface tc_TCFiscalPeriod_Update extends tc_TCFiscalPeriod {
}
interface tc_TCFiscalPeriod_Select {
  createdby_guid: WebAttribute<tc_TCFiscalPeriod_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<tc_TCFiscalPeriod_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<tc_TCFiscalPeriod_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<tc_TCFiscalPeriod_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<tc_TCFiscalPeriod_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<tc_TCFiscalPeriod_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<tc_TCFiscalPeriod_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<tc_TCFiscalPeriod_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<tc_TCFiscalPeriod_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<tc_TCFiscalPeriod_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<tc_TCFiscalPeriod_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<tc_TCFiscalPeriod_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<tc_TCFiscalPeriod_Select, { statecode: tc_tcfiscalperiod_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<tc_TCFiscalPeriod_Select, { statuscode: tc_tcfiscalperiod_statuscode | null }, { statuscode_formatted?: string }>;
  tc_fiscalperiodlonglbl: WebAttribute<tc_TCFiscalPeriod_Select, { tc_fiscalperiodlonglbl: string | null }, {  }>;
  tc_name: WebAttribute<tc_TCFiscalPeriod_Select, { tc_name: string | null }, {  }>;
  tc_tcfiscalperiodid: WebAttribute<tc_TCFiscalPeriod_Select, { tc_tcfiscalperiodid: string | null }, {  }>;
  tc_tcfiscalquarterid_guid: WebAttribute<tc_TCFiscalPeriod_Select, { tc_tcfiscalquarterid_guid: string | null }, { tc_tcfiscalquarterid_formatted?: string }>;
  tc_tcfiscalyearid_guid: WebAttribute<tc_TCFiscalPeriod_Select, { tc_tcfiscalyearid_guid: string | null }, { tc_tcfiscalyearid_formatted?: string }>;
  tc_tcmonthid_guid: WebAttribute<tc_TCFiscalPeriod_Select, { tc_tcmonthid_guid: string | null }, { tc_tcmonthid_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<tc_TCFiscalPeriod_Select, { timezoneruleversionnumber: number | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<tc_TCFiscalPeriod_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<tc_TCFiscalPeriod_Select, { versionnumber: number | null }, {  }>;
}
interface tc_TCFiscalPeriod_Filter {
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
  statecode: tc_tcfiscalperiod_statecode;
  statuscode: tc_tcfiscalperiod_statuscode;
  tc_fiscalperiodlonglbl: string;
  tc_name: string;
  tc_tcfiscalperiodid: XQW.Guid;
  tc_tcfiscalquarterid_guid: XQW.Guid;
  tc_tcfiscalyearid_guid: XQW.Guid;
  tc_tcmonthid_guid: XQW.Guid;
  timezoneruleversionnumber: number;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface tc_TCFiscalPeriod_Expand {
  createdby: WebExpand<tc_TCFiscalPeriod_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<tc_TCFiscalPeriod_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<tc_TCFiscalPeriod_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<tc_TCFiscalPeriod_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<tc_TCFiscalPeriod_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningteam: WebExpand<tc_TCFiscalPeriod_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<tc_TCFiscalPeriod_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  tc_TCFiscalQuarterId: WebExpand<tc_TCFiscalPeriod_Expand, tc_TCFiscalQuarter_Select, tc_TCFiscalQuarter_Filter, { tc_TCFiscalQuarterId: tc_TCFiscalQuarter_Result }>;
  tc_TCFiscalYearId: WebExpand<tc_TCFiscalPeriod_Expand, tc_TCFiscalYear_Select, tc_TCFiscalYear_Filter, { tc_TCFiscalYearId: tc_TCFiscalYear_Result }>;
  tc_TCMonthId: WebExpand<tc_TCFiscalPeriod_Expand, tc_TCMonth_Select, tc_TCMonth_Filter, { tc_TCMonthId: tc_TCMonth_Result }>;
}
interface tc_TCFiscalPeriod_FormattedResult {
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
  tc_tcfiscalquarterid_formatted?: string;
  tc_tcfiscalyearid_formatted?: string;
  tc_tcmonthid_formatted?: string;
}
interface tc_TCFiscalPeriod_Result extends tc_TCFiscalPeriod_Base, tc_TCFiscalPeriod_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
  tc_tcfiscalquarterid_guid: string | null;
  tc_tcfiscalyearid_guid: string | null;
  tc_tcmonthid_guid: string | null;
}
interface tc_TCFiscalPeriod_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  tc_TCFiscalQuarterId: WebMappingRetrieve<tc_TCFiscalQuarter_Select,tc_TCFiscalQuarter_Expand,tc_TCFiscalQuarter_Filter,tc_TCFiscalQuarter_Fixed,tc_TCFiscalQuarter_Result,tc_TCFiscalQuarter_FormattedResult>;
  tc_TCFiscalYearId: WebMappingRetrieve<tc_TCFiscalYear_Select,tc_TCFiscalYear_Expand,tc_TCFiscalYear_Filter,tc_TCFiscalYear_Fixed,tc_TCFiscalYear_Result,tc_TCFiscalYear_FormattedResult>;
  tc_TCMonthId: WebMappingRetrieve<tc_TCMonth_Select,tc_TCMonth_Expand,tc_TCMonth_Filter,tc_TCMonth_Fixed,tc_TCMonth_Result,tc_TCMonth_FormattedResult>;
}
interface tc_TCFiscalPeriod_RelatedMany {
}
interface WebEntitiesRetrieve {
  tc_tcfiscalperiods: WebMappingRetrieve<tc_TCFiscalPeriod_Select,tc_TCFiscalPeriod_Expand,tc_TCFiscalPeriod_Filter,tc_TCFiscalPeriod_Fixed,tc_TCFiscalPeriod_Result,tc_TCFiscalPeriod_FormattedResult>;
}
interface WebEntitiesRelated {
  tc_tcfiscalperiods: WebMappingRelated<tc_TCFiscalPeriod_RelatedOne,tc_TCFiscalPeriod_RelatedMany>;
}
interface WebEntitiesCUDA {
  tc_tcfiscalperiods: WebMappingCUDA<tc_TCFiscalPeriod_Create,tc_TCFiscalPeriod_Update,tc_TCFiscalPeriod_Select>;
}
