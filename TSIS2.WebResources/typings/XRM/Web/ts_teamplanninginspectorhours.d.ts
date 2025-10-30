interface ts_TeamPlanningInspectorHours_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_teamplanninginspectorhours_statecode | null;
  statuscode?: ts_teamplanninginspectorhours_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_name?: string | null;
  ts_teamplanninginspectorhoursid?: string | null;
  ts_varianceq1?: number | null;
  ts_varianceq2?: number | null;
  ts_varianceq3?: number | null;
  ts_varianceq4?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_TeamPlanningInspectorHours_Relationships {
  ts_Inspector?: SystemUser_Result | null;
  ts_TeamPlanningData?: ts_TeamPlanningData_Result | null;
}
interface ts_TeamPlanningInspectorHours extends ts_TeamPlanningInspectorHours_Base, ts_TeamPlanningInspectorHours_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_Inspector_bind$systemusers?: string | null;
  ts_TeamPlanningData_bind$ts_teamplanningdatas?: string | null;
}
interface ts_TeamPlanningInspectorHours_Create extends ts_TeamPlanningInspectorHours {
}
interface ts_TeamPlanningInspectorHours_Update extends ts_TeamPlanningInspectorHours {
}
interface ts_TeamPlanningInspectorHours_Select {
  createdby_guid: WebAttribute<ts_TeamPlanningInspectorHours_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_TeamPlanningInspectorHours_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_TeamPlanningInspectorHours_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_TeamPlanningInspectorHours_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_TeamPlanningInspectorHours_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_TeamPlanningInspectorHours_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_TeamPlanningInspectorHours_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_TeamPlanningInspectorHours_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_TeamPlanningInspectorHours_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_TeamPlanningInspectorHours_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_TeamPlanningInspectorHours_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_TeamPlanningInspectorHours_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_TeamPlanningInspectorHours_Select, { statecode: ts_teamplanninginspectorhours_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_TeamPlanningInspectorHours_Select, { statuscode: ts_teamplanninginspectorhours_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_TeamPlanningInspectorHours_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_inspector_guid: WebAttribute<ts_TeamPlanningInspectorHours_Select, { ts_inspector_guid: string | null }, { ts_inspector_formatted?: string }>;
  ts_name: WebAttribute<ts_TeamPlanningInspectorHours_Select, { ts_name: string | null }, {  }>;
  ts_teamplanningdata_guid: WebAttribute<ts_TeamPlanningInspectorHours_Select, { ts_teamplanningdata_guid: string | null }, { ts_teamplanningdata_formatted?: string }>;
  ts_teamplanninginspectorhoursid: WebAttribute<ts_TeamPlanningInspectorHours_Select, { ts_teamplanninginspectorhoursid: string | null }, {  }>;
  ts_varianceq1: WebAttribute<ts_TeamPlanningInspectorHours_Select, { ts_varianceq1: number | null }, {  }>;
  ts_varianceq2: WebAttribute<ts_TeamPlanningInspectorHours_Select, { ts_varianceq2: number | null }, {  }>;
  ts_varianceq3: WebAttribute<ts_TeamPlanningInspectorHours_Select, { ts_varianceq3: number | null }, {  }>;
  ts_varianceq4: WebAttribute<ts_TeamPlanningInspectorHours_Select, { ts_varianceq4: number | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<ts_TeamPlanningInspectorHours_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_TeamPlanningInspectorHours_Select, { versionnumber: number | null }, {  }>;
}
interface ts_TeamPlanningInspectorHours_Filter {
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
  statecode: ts_teamplanninginspectorhours_statecode;
  statuscode: ts_teamplanninginspectorhours_statuscode;
  timezoneruleversionnumber: number;
  ts_inspector_guid: XQW.Guid;
  ts_name: string;
  ts_teamplanningdata_guid: XQW.Guid;
  ts_teamplanninginspectorhoursid: XQW.Guid;
  ts_varianceq1: any;
  ts_varianceq2: any;
  ts_varianceq3: any;
  ts_varianceq4: any;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_TeamPlanningInspectorHours_Expand {
  createdby: WebExpand<ts_TeamPlanningInspectorHours_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_TeamPlanningInspectorHours_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_TeamPlanningInspectorHours_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_TeamPlanningInspectorHours_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_TeamPlanningInspectorHours_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningbusinessunit: WebExpand<ts_TeamPlanningInspectorHours_Expand, BusinessUnit_Select, BusinessUnit_Filter, { owningbusinessunit: BusinessUnit_Result }>;
  owningteam: WebExpand<ts_TeamPlanningInspectorHours_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ts_TeamPlanningInspectorHours_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_Inspector: WebExpand<ts_TeamPlanningInspectorHours_Expand, SystemUser_Select, SystemUser_Filter, { ts_Inspector: SystemUser_Result }>;
  ts_TeamPlanningData: WebExpand<ts_TeamPlanningInspectorHours_Expand, ts_TeamPlanningData_Select, ts_TeamPlanningData_Filter, { ts_TeamPlanningData: ts_TeamPlanningData_Result }>;
}
interface ts_TeamPlanningInspectorHours_FormattedResult {
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
  ts_inspector_formatted?: string;
  ts_teamplanningdata_formatted?: string;
}
interface ts_TeamPlanningInspectorHours_Result extends ts_TeamPlanningInspectorHours_Base, ts_TeamPlanningInspectorHours_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
  ts_inspector_guid: string | null;
  ts_teamplanningdata_guid: string | null;
}
interface ts_TeamPlanningInspectorHours_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningbusinessunit: WebMappingRetrieve<BusinessUnit_Select,BusinessUnit_Expand,BusinessUnit_Filter,BusinessUnit_Fixed,BusinessUnit_Result,BusinessUnit_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_Inspector: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_TeamPlanningData: WebMappingRetrieve<ts_TeamPlanningData_Select,ts_TeamPlanningData_Expand,ts_TeamPlanningData_Filter,ts_TeamPlanningData_Fixed,ts_TeamPlanningData_Result,ts_TeamPlanningData_FormattedResult>;
}
interface ts_TeamPlanningInspectorHours_RelatedMany {
}
interface WebEntitiesRetrieve {
  ts_teamplanninginspectorhourses: WebMappingRetrieve<ts_TeamPlanningInspectorHours_Select,ts_TeamPlanningInspectorHours_Expand,ts_TeamPlanningInspectorHours_Filter,ts_TeamPlanningInspectorHours_Fixed,ts_TeamPlanningInspectorHours_Result,ts_TeamPlanningInspectorHours_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_teamplanninginspectorhourses: WebMappingRelated<ts_TeamPlanningInspectorHours_RelatedOne,ts_TeamPlanningInspectorHours_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_teamplanninginspectorhourses: WebMappingCUDA<ts_TeamPlanningInspectorHours_Create,ts_TeamPlanningInspectorHours_Update,ts_TeamPlanningInspectorHours_Select>;
}
