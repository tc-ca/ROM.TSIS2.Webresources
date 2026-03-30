interface ts_workordertimetracking_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_workordertimetracking_statecode | null;
  statuscode?: ts_workordertimetracking_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_comments?: string | null;
  ts_conductingoversight?: number | null;
  ts_name?: string | null;
  ts_preparationtime?: number | null;
  ts_reportinganddocumentation?: number | null;
  ts_totaltime?: number | null;
  ts_workordertimetrackingid?: string | null;
  ts_wotraveltime?: number | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_workordertimetracking_Relationships {
  ts_UnplannedWorkOrder?: ts_unplannedworkorder_Result | null;
  ts_WorkOrder?: msdyn_workorder_Result | null;
}
interface ts_workordertimetracking extends ts_workordertimetracking_Base, ts_workordertimetracking_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_RegionNew_bind$ts_regions?: string | null;
  ts_Region_bind$territories?: string | null;
  ts_UnplannedWorkOrder_bind$ts_unplannedworkorders?: string | null;
  ts_WorkOrder_bind$msdyn_workorders?: string | null;
}
interface ts_workordertimetracking_Create extends ts_workordertimetracking {
}
interface ts_workordertimetracking_Update extends ts_workordertimetracking {
}
interface ts_workordertimetracking_Select {
  createdby_guid: WebAttribute<ts_workordertimetracking_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_workordertimetracking_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_workordertimetracking_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_workordertimetracking_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_workordertimetracking_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_workordertimetracking_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_workordertimetracking_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_workordertimetracking_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_workordertimetracking_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_workordertimetracking_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_workordertimetracking_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_workordertimetracking_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_workordertimetracking_Select, { statecode: ts_workordertimetracking_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_workordertimetracking_Select, { statuscode: ts_workordertimetracking_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_workordertimetracking_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_comments: WebAttribute<ts_workordertimetracking_Select, { ts_comments: string | null }, {  }>;
  ts_conductingoversight: WebAttribute<ts_workordertimetracking_Select, { ts_conductingoversight: number | null }, {  }>;
  ts_name: WebAttribute<ts_workordertimetracking_Select, { ts_name: string | null }, {  }>;
  ts_preparationtime: WebAttribute<ts_workordertimetracking_Select, { ts_preparationtime: number | null }, {  }>;
  ts_region_guid: WebAttribute<ts_workordertimetracking_Select, { ts_region_guid: string | null }, { ts_region_formatted?: string }>;
  ts_regionnew_guid: WebAttribute<ts_workordertimetracking_Select, { ts_regionnew_guid: string | null }, { ts_regionnew_formatted?: string }>;
  ts_reportinganddocumentation: WebAttribute<ts_workordertimetracking_Select, { ts_reportinganddocumentation: number | null }, {  }>;
  ts_totaltime: WebAttribute<ts_workordertimetracking_Select, { ts_totaltime: number | null }, {  }>;
  ts_unplannedworkorder_guid: WebAttribute<ts_workordertimetracking_Select, { ts_unplannedworkorder_guid: string | null }, { ts_unplannedworkorder_formatted?: string }>;
  ts_workorder_guid: WebAttribute<ts_workordertimetracking_Select, { ts_workorder_guid: string | null }, { ts_workorder_formatted?: string }>;
  ts_workordertimetrackingid: WebAttribute<ts_workordertimetracking_Select, { ts_workordertimetrackingid: string | null }, {  }>;
  ts_wotraveltime: WebAttribute<ts_workordertimetracking_Select, { ts_wotraveltime: number | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<ts_workordertimetracking_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_workordertimetracking_Select, { versionnumber: number | null }, {  }>;
}
interface ts_workordertimetracking_Filter {
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
  statecode: ts_workordertimetracking_statecode;
  statuscode: ts_workordertimetracking_statuscode;
  timezoneruleversionnumber: number;
  ts_comments: string;
  ts_conductingoversight: any;
  ts_name: string;
  ts_preparationtime: any;
  ts_region_guid: XQW.Guid;
  ts_regionnew_guid: XQW.Guid;
  ts_reportinganddocumentation: any;
  ts_totaltime: number;
  ts_unplannedworkorder_guid: XQW.Guid;
  ts_workorder_guid: XQW.Guid;
  ts_workordertimetrackingid: XQW.Guid;
  ts_wotraveltime: any;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_workordertimetracking_Expand {
  createdby: WebExpand<ts_workordertimetracking_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_workordertimetracking_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_workordertimetracking_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_workordertimetracking_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_workordertimetracking_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningteam: WebExpand<ts_workordertimetracking_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ts_workordertimetracking_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_UnplannedWorkOrder: WebExpand<ts_workordertimetracking_Expand, ts_unplannedworkorder_Select, ts_unplannedworkorder_Filter, { ts_UnplannedWorkOrder: ts_unplannedworkorder_Result }>;
  ts_WorkOrder: WebExpand<ts_workordertimetracking_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { ts_WorkOrder: msdyn_workorder_Result }>;
}
interface ts_workordertimetracking_FormattedResult {
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
  ts_region_formatted?: string;
  ts_regionnew_formatted?: string;
  ts_unplannedworkorder_formatted?: string;
  ts_workorder_formatted?: string;
}
interface ts_workordertimetracking_Result extends ts_workordertimetracking_Base, ts_workordertimetracking_Relationships {
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
  ts_regionnew_guid: string | null;
  ts_unplannedworkorder_guid: string | null;
  ts_workorder_guid: string | null;
}
interface ts_workordertimetracking_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_UnplannedWorkOrder: WebMappingRetrieve<ts_unplannedworkorder_Select,ts_unplannedworkorder_Expand,ts_unplannedworkorder_Filter,ts_unplannedworkorder_Fixed,ts_unplannedworkorder_Result,ts_unplannedworkorder_FormattedResult>;
  ts_WorkOrder: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
}
interface ts_workordertimetracking_RelatedMany {
}
interface WebEntitiesRetrieve {
  ts_workordertimetrackings: WebMappingRetrieve<ts_workordertimetracking_Select,ts_workordertimetracking_Expand,ts_workordertimetracking_Filter,ts_workordertimetracking_Fixed,ts_workordertimetracking_Result,ts_workordertimetracking_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_workordertimetrackings: WebMappingRelated<ts_workordertimetracking_RelatedOne,ts_workordertimetracking_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_workordertimetrackings: WebMappingCUDA<ts_workordertimetracking_Create,ts_workordertimetracking_Update,ts_workordertimetracking_Select>;
}
