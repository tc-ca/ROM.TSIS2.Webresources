interface ts_DutyInspectorSchedule_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_dutyinspectorschedule_statecode | null;
  statuscode?: ts_dutyinspectorschedule_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_dutyinspectorscheduleid?: string | null;
  ts_name?: string | null;
  ts_startdate?: Date | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_DutyInspectorSchedule_Relationships {
  ts_DutyInspectorSchedule_ts_DutyInspectorSchedule_ts_dutyinspectors?: ts_dutyinspectors_Result[] | null;
  ts_FiscalYear?: tc_TCFiscalYear_Result | null;
}
interface ts_DutyInspectorSchedule extends ts_DutyInspectorSchedule_Base, ts_DutyInspectorSchedule_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_FiscalYear_bind$tc_tcfiscalyears?: string | null;
  ts_Region_bind$territories?: string | null;
}
interface ts_DutyInspectorSchedule_Create extends ts_DutyInspectorSchedule {
}
interface ts_DutyInspectorSchedule_Update extends ts_DutyInspectorSchedule {
}
interface ts_DutyInspectorSchedule_Select {
  createdby_guid: WebAttribute<ts_DutyInspectorSchedule_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_DutyInspectorSchedule_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_DutyInspectorSchedule_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_DutyInspectorSchedule_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_DutyInspectorSchedule_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_DutyInspectorSchedule_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_DutyInspectorSchedule_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_DutyInspectorSchedule_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_DutyInspectorSchedule_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_DutyInspectorSchedule_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_DutyInspectorSchedule_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_DutyInspectorSchedule_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_DutyInspectorSchedule_Select, { statecode: ts_dutyinspectorschedule_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_DutyInspectorSchedule_Select, { statuscode: ts_dutyinspectorschedule_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_DutyInspectorSchedule_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_dutyinspectorscheduleid: WebAttribute<ts_DutyInspectorSchedule_Select, { ts_dutyinspectorscheduleid: string | null }, {  }>;
  ts_fiscalyear_guid: WebAttribute<ts_DutyInspectorSchedule_Select, { ts_fiscalyear_guid: string | null }, { ts_fiscalyear_formatted?: string }>;
  ts_name: WebAttribute<ts_DutyInspectorSchedule_Select, { ts_name: string | null }, {  }>;
  ts_region_guid: WebAttribute<ts_DutyInspectorSchedule_Select, { ts_region_guid: string | null }, { ts_region_formatted?: string }>;
  ts_startdate: WebAttribute<ts_DutyInspectorSchedule_Select, { ts_startdate: Date | null }, { ts_startdate_formatted?: string }>;
  utcconversiontimezonecode: WebAttribute<ts_DutyInspectorSchedule_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_DutyInspectorSchedule_Select, { versionnumber: number | null }, {  }>;
}
interface ts_DutyInspectorSchedule_Filter {
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
  statecode: ts_dutyinspectorschedule_statecode;
  statuscode: ts_dutyinspectorschedule_statuscode;
  timezoneruleversionnumber: number;
  ts_dutyinspectorscheduleid: XQW.Guid;
  ts_fiscalyear_guid: XQW.Guid;
  ts_name: string;
  ts_region_guid: XQW.Guid;
  ts_startdate: Date;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_DutyInspectorSchedule_Expand {
  createdby: WebExpand<ts_DutyInspectorSchedule_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_DutyInspectorSchedule_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_DutyInspectorSchedule_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_DutyInspectorSchedule_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_DutyInspectorSchedule_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningbusinessunit: WebExpand<ts_DutyInspectorSchedule_Expand, BusinessUnit_Select, BusinessUnit_Filter, { owningbusinessunit: BusinessUnit_Result }>;
  owningteam: WebExpand<ts_DutyInspectorSchedule_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ts_DutyInspectorSchedule_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_DutyInspectorSchedule_ts_DutyInspectorSchedule_ts_dutyinspectors: WebExpand<ts_DutyInspectorSchedule_Expand, ts_dutyinspectors_Select, ts_dutyinspectors_Filter, { ts_DutyInspectorSchedule_ts_DutyInspectorSchedule_ts_dutyinspectors: ts_dutyinspectors_Result[] }>;
  ts_FiscalYear: WebExpand<ts_DutyInspectorSchedule_Expand, tc_TCFiscalYear_Select, tc_TCFiscalYear_Filter, { ts_FiscalYear: tc_TCFiscalYear_Result }>;
}
interface ts_DutyInspectorSchedule_FormattedResult {
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
  ts_region_formatted?: string;
  ts_startdate_formatted?: string;
}
interface ts_DutyInspectorSchedule_Result extends ts_DutyInspectorSchedule_Base, ts_DutyInspectorSchedule_Relationships {
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
  ts_region_guid: string | null;
}
interface ts_DutyInspectorSchedule_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningbusinessunit: WebMappingRetrieve<BusinessUnit_Select,BusinessUnit_Expand,BusinessUnit_Filter,BusinessUnit_Fixed,BusinessUnit_Result,BusinessUnit_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_FiscalYear: WebMappingRetrieve<tc_TCFiscalYear_Select,tc_TCFiscalYear_Expand,tc_TCFiscalYear_Filter,tc_TCFiscalYear_Fixed,tc_TCFiscalYear_Result,tc_TCFiscalYear_FormattedResult>;
}
interface ts_DutyInspectorSchedule_RelatedMany {
  ts_DutyInspectorSchedule_ts_DutyInspectorSchedule_ts_dutyinspectors: WebMappingRetrieve<ts_dutyinspectors_Select,ts_dutyinspectors_Expand,ts_dutyinspectors_Filter,ts_dutyinspectors_Fixed,ts_dutyinspectors_Result,ts_dutyinspectors_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_dutyinspectorschedules: WebMappingRetrieve<ts_DutyInspectorSchedule_Select,ts_DutyInspectorSchedule_Expand,ts_DutyInspectorSchedule_Filter,ts_DutyInspectorSchedule_Fixed,ts_DutyInspectorSchedule_Result,ts_DutyInspectorSchedule_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_dutyinspectorschedules: WebMappingRelated<ts_DutyInspectorSchedule_RelatedOne,ts_DutyInspectorSchedule_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_dutyinspectorschedules: WebMappingCUDA<ts_DutyInspectorSchedule_Create,ts_DutyInspectorSchedule_Update,ts_DutyInspectorSchedule_Select>;
}
