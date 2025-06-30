interface ts_WorkOrderServiceTaskWorkspace_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_workorderservicetaskworkspace_statecode | null;
  statuscode?: ts_workorderservicetaskworkspace_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_name?: string | null;
  ts_workorderservicetaskstartdate?: Date | null;
  ts_workorderservicetaskworkspaceid?: string | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_WorkOrderServiceTaskWorkspace_Relationships {
  ts_WorkOrderServiceTask?: msdyn_workorderservicetask_Result | null;
}
interface ts_WorkOrderServiceTaskWorkspace extends ts_WorkOrderServiceTaskWorkspace_Base, ts_WorkOrderServiceTaskWorkspace_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_WorkOrderServiceTask_bind$msdyn_workorderservicetasks?: string | null;
}
interface ts_WorkOrderServiceTaskWorkspace_Create extends ts_WorkOrderServiceTaskWorkspace {
}
interface ts_WorkOrderServiceTaskWorkspace_Update extends ts_WorkOrderServiceTaskWorkspace {
}
interface ts_WorkOrderServiceTaskWorkspace_Select {
  createdby_guid: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { statecode: ts_workorderservicetaskworkspace_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { statuscode: ts_workorderservicetaskworkspace_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_name: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { ts_name: string | null }, {  }>;
  ts_workorderservicetask_guid: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { ts_workorderservicetask_guid: string | null }, { ts_workorderservicetask_formatted?: string }>;
  ts_workorderservicetaskstartdate: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { ts_workorderservicetaskstartdate: Date | null }, { ts_workorderservicetaskstartdate_formatted?: string }>;
  ts_workorderservicetaskworkspaceid: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { ts_workorderservicetaskworkspaceid: string | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_WorkOrderServiceTaskWorkspace_Select, { versionnumber: number | null }, {  }>;
}
interface ts_WorkOrderServiceTaskWorkspace_Filter {
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
  statecode: ts_workorderservicetaskworkspace_statecode;
  statuscode: ts_workorderservicetaskworkspace_statuscode;
  timezoneruleversionnumber: number;
  ts_name: string;
  ts_workorderservicetask_guid: XQW.Guid;
  ts_workorderservicetaskstartdate: Date;
  ts_workorderservicetaskworkspaceid: XQW.Guid;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_WorkOrderServiceTaskWorkspace_Expand {
  createdby: WebExpand<ts_WorkOrderServiceTaskWorkspace_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_WorkOrderServiceTaskWorkspace_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_WorkOrderServiceTaskWorkspace_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_WorkOrderServiceTaskWorkspace_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_WorkOrderServiceTaskWorkspace_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningteam: WebExpand<ts_WorkOrderServiceTaskWorkspace_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ts_WorkOrderServiceTaskWorkspace_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_WorkOrderServiceTask: WebExpand<ts_WorkOrderServiceTaskWorkspace_Expand, msdyn_workorderservicetask_Select, msdyn_workorderservicetask_Filter, { ts_WorkOrderServiceTask: msdyn_workorderservicetask_Result }>;
}
interface ts_WorkOrderServiceTaskWorkspace_FormattedResult {
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
  ts_workorderservicetask_formatted?: string;
  ts_workorderservicetaskstartdate_formatted?: string;
}
interface ts_WorkOrderServiceTaskWorkspace_Result extends ts_WorkOrderServiceTaskWorkspace_Base, ts_WorkOrderServiceTaskWorkspace_Relationships {
  "@odata.etag": string;
  createdby_guid: string | null;
  createdonbehalfby_guid: string | null;
  modifiedby_guid: string | null;
  modifiedonbehalfby_guid: string | null;
  ownerid_guid: string | null;
  owningbusinessunit_guid: string | null;
  owningteam_guid: string | null;
  owninguser_guid: string | null;
  ts_workorderservicetask_guid: string | null;
}
interface ts_WorkOrderServiceTaskWorkspace_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_WorkOrderServiceTask: WebMappingRetrieve<msdyn_workorderservicetask_Select,msdyn_workorderservicetask_Expand,msdyn_workorderservicetask_Filter,msdyn_workorderservicetask_Fixed,msdyn_workorderservicetask_Result,msdyn_workorderservicetask_FormattedResult>;
}
interface ts_WorkOrderServiceTaskWorkspace_RelatedMany {
}
interface WebEntitiesRetrieve {
  ts_workorderservicetaskworkspaces: WebMappingRetrieve<ts_WorkOrderServiceTaskWorkspace_Select,ts_WorkOrderServiceTaskWorkspace_Expand,ts_WorkOrderServiceTaskWorkspace_Filter,ts_WorkOrderServiceTaskWorkspace_Fixed,ts_WorkOrderServiceTaskWorkspace_Result,ts_WorkOrderServiceTaskWorkspace_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_workorderservicetaskworkspaces: WebMappingRelated<ts_WorkOrderServiceTaskWorkspace_RelatedOne,ts_WorkOrderServiceTaskWorkspace_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_workorderservicetaskworkspaces: WebMappingCUDA<ts_WorkOrderServiceTaskWorkspace_Create,ts_WorkOrderServiceTaskWorkspace_Update,ts_WorkOrderServiceTaskWorkspace_Select>;
}
