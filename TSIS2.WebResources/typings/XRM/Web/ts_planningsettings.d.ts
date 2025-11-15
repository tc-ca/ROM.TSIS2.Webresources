interface ts_planningsettings_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_planningsettings_statecode | null;
  statuscode?: ts_planningsettings_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_effectivedate?: Date | null;
  ts_name?: string | null;
  ts_planningsettingsid?: string | null;
  ts_task?: ts_planningsettings_ts_task | null;
  ts_taskstatus?: ts_planningsettings_ts_taskstatus | null;
  ts_totalcount?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_planningsettings_Relationships {
}
interface ts_planningsettings extends ts_planningsettings_Base, ts_planningsettings_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_region_bind$territories?: string | null;
  ts_stakeholder_bind$accounts?: string | null;
  ts_workorderowner_bind$systemusers?: string | null;
  ts_workordertype_bind$msdyn_workordertypes?: string | null;
}
interface ts_planningsettings_Create extends ts_planningsettings {
}
interface ts_planningsettings_Update extends ts_planningsettings {
}
interface ts_planningsettings_Select {
  createdby_guid: WebAttribute<ts_planningsettings_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_planningsettings_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_planningsettings_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_planningsettings_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_planningsettings_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_planningsettings_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_planningsettings_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_planningsettings_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_planningsettings_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_planningsettings_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_planningsettings_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_planningsettings_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_planningsettings_Select, { statecode: ts_planningsettings_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_planningsettings_Select, { statuscode: ts_planningsettings_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_planningsettings_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_effectivedate: WebAttribute<ts_planningsettings_Select, { ts_effectivedate: Date | null }, { ts_effectivedate_formatted?: string }>;
  ts_name: WebAttribute<ts_planningsettings_Select, { ts_name: string | null }, {  }>;
  ts_planningsettingsid: WebAttribute<ts_planningsettings_Select, { ts_planningsettingsid: string | null }, {  }>;
  ts_region_guid: WebAttribute<ts_planningsettings_Select, { ts_region_guid: string | null }, { ts_region_formatted?: string }>;
  ts_stakeholder_guid: WebAttribute<ts_planningsettings_Select, { ts_stakeholder_guid: string | null }, { ts_stakeholder_formatted?: string }>;
  ts_task: WebAttribute<ts_planningsettings_Select, { ts_task: ts_planningsettings_ts_task | null }, { ts_task_formatted?: string }>;
  ts_taskstatus: WebAttribute<ts_planningsettings_Select, { ts_taskstatus: ts_planningsettings_ts_taskstatus | null }, { ts_taskstatus_formatted?: string }>;
  ts_totalcount: WebAttribute<ts_planningsettings_Select, { ts_totalcount: number | null }, {  }>;
  ts_workorderowner_guid: WebAttribute<ts_planningsettings_Select, { ts_workorderowner_guid: string | null }, { ts_workorderowner_formatted?: string }>;
  ts_workordertype_guid: WebAttribute<ts_planningsettings_Select, { ts_workordertype_guid: string | null }, { ts_workordertype_formatted?: string }>;
  utcconversiontimezonecode: WebAttribute<ts_planningsettings_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_planningsettings_Select, { versionnumber: number | null }, {  }>;
}
interface ts_planningsettings_Filter {
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
  statecode: ts_planningsettings_statecode;
  statuscode: ts_planningsettings_statuscode;
  timezoneruleversionnumber: number;
  ts_effectivedate: Date;
  ts_name: string;
  ts_planningsettingsid: XQW.Guid;
  ts_region_guid: XQW.Guid;
  ts_stakeholder_guid: XQW.Guid;
  ts_task: ts_planningsettings_ts_task;
  ts_taskstatus: ts_planningsettings_ts_taskstatus;
  ts_totalcount: number;
  ts_workorderowner_guid: XQW.Guid;
  ts_workordertype_guid: XQW.Guid;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_planningsettings_Expand {
  createdby: WebExpand<ts_planningsettings_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_planningsettings_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_planningsettings_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_planningsettings_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_planningsettings_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningbusinessunit: WebExpand<ts_planningsettings_Expand, BusinessUnit_Select, BusinessUnit_Filter, { owningbusinessunit: BusinessUnit_Result }>;
  owningteam: WebExpand<ts_planningsettings_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ts_planningsettings_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_stakeholder: WebExpand<ts_planningsettings_Expand, Account_Select, Account_Filter, { ts_stakeholder: Account_Result }>;
  ts_workorderowner: WebExpand<ts_planningsettings_Expand, SystemUser_Select, SystemUser_Filter, { ts_workorderowner: SystemUser_Result }>;
}
interface ts_planningsettings_FormattedResult {
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
  ts_effectivedate_formatted?: string;
  ts_region_formatted?: string;
  ts_stakeholder_formatted?: string;
  ts_task_formatted?: string;
  ts_taskstatus_formatted?: string;
  ts_workorderowner_formatted?: string;
  ts_workordertype_formatted?: string;
}
interface ts_planningsettings_Result extends ts_planningsettings_Base, ts_planningsettings_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
  ts_region_guid: string | null;
  ts_stakeholder_guid: string | null;
  ts_workorderowner_guid: string | null;
  ts_workordertype_guid: string | null;
}
interface ts_planningsettings_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningbusinessunit: WebMappingRetrieve<BusinessUnit_Select,BusinessUnit_Expand,BusinessUnit_Filter,BusinessUnit_Fixed,BusinessUnit_Result,BusinessUnit_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_stakeholder: WebMappingRetrieve<Account_Select,Account_Expand,Account_Filter,Account_Fixed,Account_Result,Account_FormattedResult>;
  ts_workorderowner: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface ts_planningsettings_RelatedMany {
}
interface WebEntitiesRetrieve {
  ts_planningsettingses: WebMappingRetrieve<ts_planningsettings_Select,ts_planningsettings_Expand,ts_planningsettings_Filter,ts_planningsettings_Fixed,ts_planningsettings_Result,ts_planningsettings_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_planningsettingses: WebMappingRelated<ts_planningsettings_RelatedOne,ts_planningsettings_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_planningsettingses: WebMappingCUDA<ts_planningsettings_Create,ts_planningsettings_Update,ts_planningsettings_Select>;
}
