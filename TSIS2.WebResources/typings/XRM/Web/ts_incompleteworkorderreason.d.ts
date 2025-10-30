interface ts_IncompleteWorkOrderReason_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_incompleteworkorderreason_statecode | null;
  statuscode?: ts_incompleteworkorderreason_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_incompleteworkorderreasonid?: string | null;
  ts_name?: string | null;
  ts_reasonenglish?: string | null;
  ts_reasonfrench?: string | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_IncompleteWorkOrderReason_Relationships {
  ts_msdyn_workorder_IncompleteWorkOrderReason?: msdyn_workorder_Result[] | null;
}
interface ts_IncompleteWorkOrderReason extends ts_IncompleteWorkOrderReason_Base, ts_IncompleteWorkOrderReason_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
}
interface ts_IncompleteWorkOrderReason_Create extends ts_IncompleteWorkOrderReason {
}
interface ts_IncompleteWorkOrderReason_Update extends ts_IncompleteWorkOrderReason {
}
interface ts_IncompleteWorkOrderReason_Select {
  createdby_guid: WebAttribute<ts_IncompleteWorkOrderReason_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_IncompleteWorkOrderReason_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_IncompleteWorkOrderReason_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_IncompleteWorkOrderReason_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_IncompleteWorkOrderReason_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_IncompleteWorkOrderReason_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_IncompleteWorkOrderReason_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_IncompleteWorkOrderReason_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_IncompleteWorkOrderReason_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_IncompleteWorkOrderReason_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_IncompleteWorkOrderReason_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_IncompleteWorkOrderReason_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_IncompleteWorkOrderReason_Select, { statecode: ts_incompleteworkorderreason_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_IncompleteWorkOrderReason_Select, { statuscode: ts_incompleteworkorderreason_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_IncompleteWorkOrderReason_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_incompleteworkorderreasonid: WebAttribute<ts_IncompleteWorkOrderReason_Select, { ts_incompleteworkorderreasonid: string | null }, {  }>;
  ts_name: WebAttribute<ts_IncompleteWorkOrderReason_Select, { ts_name: string | null }, {  }>;
  ts_reasonenglish: WebAttribute<ts_IncompleteWorkOrderReason_Select, { ts_reasonenglish: string | null }, {  }>;
  ts_reasonfrench: WebAttribute<ts_IncompleteWorkOrderReason_Select, { ts_reasonfrench: string | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<ts_IncompleteWorkOrderReason_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_IncompleteWorkOrderReason_Select, { versionnumber: number | null }, {  }>;
}
interface ts_IncompleteWorkOrderReason_Filter {
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
  statecode: ts_incompleteworkorderreason_statecode;
  statuscode: ts_incompleteworkorderreason_statuscode;
  timezoneruleversionnumber: number;
  ts_incompleteworkorderreasonid: XQW.Guid;
  ts_name: string;
  ts_reasonenglish: string;
  ts_reasonfrench: string;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_IncompleteWorkOrderReason_Expand {
  createdby: WebExpand<ts_IncompleteWorkOrderReason_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_IncompleteWorkOrderReason_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_IncompleteWorkOrderReason_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_IncompleteWorkOrderReason_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_IncompleteWorkOrderReason_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
  owningbusinessunit: WebExpand<ts_IncompleteWorkOrderReason_Expand, BusinessUnit_Select, BusinessUnit_Filter, { owningbusinessunit: BusinessUnit_Result }>;
  owningteam: WebExpand<ts_IncompleteWorkOrderReason_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ts_IncompleteWorkOrderReason_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_msdyn_workorder_IncompleteWorkOrderReason: WebExpand<ts_IncompleteWorkOrderReason_Expand, msdyn_workorder_Select, msdyn_workorder_Filter, { ts_msdyn_workorder_IncompleteWorkOrderReason: msdyn_workorder_Result[] }>;
}
interface ts_IncompleteWorkOrderReason_FormattedResult {
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
}
interface ts_IncompleteWorkOrderReason_Result extends ts_IncompleteWorkOrderReason_Base, ts_IncompleteWorkOrderReason_Relationships {
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
interface ts_IncompleteWorkOrderReason_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owningbusinessunit: WebMappingRetrieve<BusinessUnit_Select,BusinessUnit_Expand,BusinessUnit_Filter,BusinessUnit_Fixed,BusinessUnit_Result,BusinessUnit_FormattedResult>;
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
}
interface ts_IncompleteWorkOrderReason_RelatedMany {
  ts_msdyn_workorder_IncompleteWorkOrderReason: WebMappingRetrieve<msdyn_workorder_Select,msdyn_workorder_Expand,msdyn_workorder_Filter,msdyn_workorder_Fixed,msdyn_workorder_Result,msdyn_workorder_FormattedResult>;
}
interface WebEntitiesRetrieve {
  ts_incompleteworkorderreasons: WebMappingRetrieve<ts_IncompleteWorkOrderReason_Select,ts_IncompleteWorkOrderReason_Expand,ts_IncompleteWorkOrderReason_Filter,ts_IncompleteWorkOrderReason_Fixed,ts_IncompleteWorkOrderReason_Result,ts_IncompleteWorkOrderReason_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_incompleteworkorderreasons: WebMappingRelated<ts_IncompleteWorkOrderReason_RelatedOne,ts_IncompleteWorkOrderReason_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_incompleteworkorderreasons: WebMappingCUDA<ts_IncompleteWorkOrderReason_Create,ts_IncompleteWorkOrderReason_Update,ts_IncompleteWorkOrderReason_Select>;
}
