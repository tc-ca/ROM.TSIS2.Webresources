interface ts_dutyinspectors_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_dutyinspectors_statecode | null;
  statuscode?: ts_dutyinspectors_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_dutyinspectorsid?: string | null;
  ts_enddate?: Date | null;
  ts_name?: string | null;
  ts_startdate?: Date | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_dutyinspectors_Relationships {
  ts_DutyInspectorSchedule?: ts_DutyInspectorSchedule_Result | null;
  ts_Inspector?: SystemUser_Result | null;
}
interface ts_dutyinspectors extends ts_dutyinspectors_Base, ts_dutyinspectors_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_DutyInspectorSchedule_bind$ts_dutyinspectorschedules?: string | null;
  ts_Inspector_bind$systemusers?: string | null;
  ts_Month_bind$tc_tcmonths?: string | null;
}
interface ts_dutyinspectors_Create extends ts_dutyinspectors {
}
interface ts_dutyinspectors_Update extends ts_dutyinspectors {
}
interface ts_dutyinspectors_Select {
  createdby_guid: WebAttribute<ts_dutyinspectors_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_dutyinspectors_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_dutyinspectors_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_dutyinspectors_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_dutyinspectors_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_dutyinspectors_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_dutyinspectors_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_dutyinspectors_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_dutyinspectors_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_dutyinspectors_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_dutyinspectors_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_dutyinspectors_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_dutyinspectors_Select, { statecode: ts_dutyinspectors_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_dutyinspectors_Select, { statuscode: ts_dutyinspectors_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_dutyinspectors_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_dutyinspectorschedule_guid: WebAttribute<ts_dutyinspectors_Select, { ts_dutyinspectorschedule_guid: string | null }, { ts_dutyinspectorschedule_formatted?: string }>;
  ts_dutyinspectorsid: WebAttribute<ts_dutyinspectors_Select, { ts_dutyinspectorsid: string | null }, {  }>;
  ts_enddate: WebAttribute<ts_dutyinspectors_Select, { ts_enddate: Date | null }, { ts_enddate_formatted?: string }>;
  ts_inspector_guid: WebAttribute<ts_dutyinspectors_Select, { ts_inspector_guid: string | null }, { ts_inspector_formatted?: string }>;
  ts_month_guid: WebAttribute<ts_dutyinspectors_Select, { ts_month_guid: string | null }, { ts_month_formatted?: string }>;
  ts_name: WebAttribute<ts_dutyinspectors_Select, { ts_name: string | null }, {  }>;
  ts_startdate: WebAttribute<ts_dutyinspectors_Select, { ts_startdate: Date | null }, { ts_startdate_formatted?: string }>;
  utcconversiontimezonecode: WebAttribute<ts_dutyinspectors_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_dutyinspectors_Select, { versionnumber: number | null }, {  }>;
}
interface ts_dutyinspectors_Filter {
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
  statecode: ts_dutyinspectors_statecode;
  statuscode: ts_dutyinspectors_statuscode;
  timezoneruleversionnumber: number;
  ts_dutyinspectorschedule_guid: XQW.Guid;
  ts_dutyinspectorsid: XQW.Guid;
  ts_enddate: Date;
  ts_inspector_guid: XQW.Guid;
  ts_month_guid: XQW.Guid;
  ts_name: string;
  ts_startdate: Date;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_dutyinspectors_Expand {
  createdby: WebExpand<ts_dutyinspectors_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_dutyinspectors_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_dutyinspectors_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_dutyinspectors_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_dutyinspectors_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningteam: WebExpand<ts_dutyinspectors_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ts_dutyinspectors_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_DutyInspectorSchedule: WebExpand<ts_dutyinspectors_Expand, ts_DutyInspectorSchedule_Select, ts_DutyInspectorSchedule_Filter, { ts_DutyInspectorSchedule: ts_DutyInspectorSchedule_Result }>;
  ts_Inspector: WebExpand<ts_dutyinspectors_Expand, SystemUser_Select, SystemUser_Filter, { ts_Inspector: SystemUser_Result }>;
}
interface ts_dutyinspectors_FormattedResult {
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
  ts_dutyinspectorschedule_formatted?: string;
  ts_enddate_formatted?: string;
  ts_inspector_formatted?: string;
  ts_month_formatted?: string;
  ts_startdate_formatted?: string;
}
interface ts_dutyinspectors_Result extends ts_dutyinspectors_Base, ts_dutyinspectors_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
  ts_dutyinspectorschedule_guid: string | null;
  ts_inspector_guid: string | null;
  ts_month_guid: string | null;
}
interface ts_dutyinspectors_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_DutyInspectorSchedule: WebMappingRetrieve<ts_DutyInspectorSchedule_Select,ts_DutyInspectorSchedule_Expand,ts_DutyInspectorSchedule_Filter,ts_DutyInspectorSchedule_Fixed,ts_DutyInspectorSchedule_Result,ts_DutyInspectorSchedule_FormattedResult>;
  ts_Inspector: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface ts_dutyinspectors_RelatedMany {
}
interface WebEntitiesRetrieve {
  ts_dutyinspectorses: WebMappingRetrieve<ts_dutyinspectors_Select,ts_dutyinspectors_Expand,ts_dutyinspectors_Filter,ts_dutyinspectors_Fixed,ts_dutyinspectors_Result,ts_dutyinspectors_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_dutyinspectorses: WebMappingRelated<ts_dutyinspectors_RelatedOne,ts_dutyinspectors_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_dutyinspectorses: WebMappingCUDA<ts_dutyinspectors_Create,ts_dutyinspectors_Update,ts_dutyinspectors_Select>;
}
