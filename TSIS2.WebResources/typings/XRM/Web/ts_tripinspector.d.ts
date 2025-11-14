interface ts_tripinspector_Base extends WebEntity {
  createdon?: Date | null;
  importsequencenumber?: number | null;
  modifiedon?: Date | null;
  overriddencreatedon?: Date | null;
  statecode?: ts_tripinspector_statecode | null;
  statuscode?: ts_tripinspector_statuscode | null;
  timezoneruleversionnumber?: number | null;
  ts_name?: string | null;
  ts_primaryinspector?: boolean | null;
  ts_tripinspectorid?: string | null;
  utcconversiontimezonecode?: number | null;
  versionnumber?: number | null;
}
interface ts_tripinspector_Relationships {
}
interface ts_tripinspector extends ts_tripinspector_Base, ts_tripinspector_Relationships {
  ownerid_bind$systemusers?: string | null;
  ownerid_bind$teams?: string | null;
  ts_inspector_bind$systemusers?: string | null;
  ts_trip_bind$ts_trips?: string | null;
}
interface ts_tripinspector_Create extends ts_tripinspector {
}
interface ts_tripinspector_Update extends ts_tripinspector {
}
interface ts_tripinspector_Select {
  createdby_guid: WebAttribute<ts_tripinspector_Select, { createdby_guid: string | null }, { createdby_formatted?: string }>;
  createdon: WebAttribute<ts_tripinspector_Select, { createdon: Date | null }, { createdon_formatted?: string }>;
  createdonbehalfby_guid: WebAttribute<ts_tripinspector_Select, { createdonbehalfby_guid: string | null }, { createdonbehalfby_formatted?: string }>;
  importsequencenumber: WebAttribute<ts_tripinspector_Select, { importsequencenumber: number | null }, {  }>;
  modifiedby_guid: WebAttribute<ts_tripinspector_Select, { modifiedby_guid: string | null }, { modifiedby_formatted?: string }>;
  modifiedon: WebAttribute<ts_tripinspector_Select, { modifiedon: Date | null }, { modifiedon_formatted?: string }>;
  modifiedonbehalfby_guid: WebAttribute<ts_tripinspector_Select, { modifiedonbehalfby_guid: string | null }, { modifiedonbehalfby_formatted?: string }>;
  overriddencreatedon: WebAttribute<ts_tripinspector_Select, { overriddencreatedon: Date | null }, { overriddencreatedon_formatted?: string }>;
  ownerid_guid: WebAttribute<ts_tripinspector_Select, { ownerid_guid: string | null }, { ownerid_formatted?: string }>;
  owningbusinessunit_guid: WebAttribute<ts_tripinspector_Select, { owningbusinessunit_guid: string | null }, { owningbusinessunit_formatted?: string }>;
  owningteam_guid: WebAttribute<ts_tripinspector_Select, { owningteam_guid: string | null }, { owningteam_formatted?: string }>;
  owninguser_guid: WebAttribute<ts_tripinspector_Select, { owninguser_guid: string | null }, { owninguser_formatted?: string }>;
  statecode: WebAttribute<ts_tripinspector_Select, { statecode: ts_tripinspector_statecode | null }, { statecode_formatted?: string }>;
  statuscode: WebAttribute<ts_tripinspector_Select, { statuscode: ts_tripinspector_statuscode | null }, { statuscode_formatted?: string }>;
  timezoneruleversionnumber: WebAttribute<ts_tripinspector_Select, { timezoneruleversionnumber: number | null }, {  }>;
  ts_inspector_guid: WebAttribute<ts_tripinspector_Select, { ts_inspector_guid: string | null }, { ts_inspector_formatted?: string }>;
  ts_name: WebAttribute<ts_tripinspector_Select, { ts_name: string | null }, {  }>;
  ts_primaryinspector: WebAttribute<ts_tripinspector_Select, { ts_primaryinspector: boolean | null }, {  }>;
  ts_trip_guid: WebAttribute<ts_tripinspector_Select, { ts_trip_guid: string | null }, { ts_trip_formatted?: string }>;
  ts_tripinspectorid: WebAttribute<ts_tripinspector_Select, { ts_tripinspectorid: string | null }, {  }>;
  utcconversiontimezonecode: WebAttribute<ts_tripinspector_Select, { utcconversiontimezonecode: number | null }, {  }>;
  versionnumber: WebAttribute<ts_tripinspector_Select, { versionnumber: number | null }, {  }>;
}
interface ts_tripinspector_Filter {
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
  statecode: ts_tripinspector_statecode;
  statuscode: ts_tripinspector_statuscode;
  timezoneruleversionnumber: number;
  ts_inspector_guid: XQW.Guid;
  ts_name: string;
  ts_primaryinspector: boolean;
  ts_trip_guid: XQW.Guid;
  ts_tripinspectorid: XQW.Guid;
  utcconversiontimezonecode: number;
  versionnumber: number;
}
interface ts_tripinspector_Expand {
  createdby: WebExpand<ts_tripinspector_Expand, SystemUser_Select, SystemUser_Filter, { createdby: SystemUser_Result }>;
  createdonbehalfby: WebExpand<ts_tripinspector_Expand, SystemUser_Select, SystemUser_Filter, { createdonbehalfby: SystemUser_Result }>;
  modifiedby: WebExpand<ts_tripinspector_Expand, SystemUser_Select, SystemUser_Filter, { modifiedby: SystemUser_Result }>;
  modifiedonbehalfby: WebExpand<ts_tripinspector_Expand, SystemUser_Select, SystemUser_Filter, { modifiedonbehalfby: SystemUser_Result }>;
  ownerid: WebExpand<ts_tripinspector_Expand, SystemUser_Select & Team_Select, SystemUser_Filter & Team_Filter, { ownerid: SystemUser_Result } & { ownerid: Team_Result }>;
<<<<<<< HEAD
  owningbusinessunit: WebExpand<ts_tripinspector_Expand, BusinessUnit_Select, BusinessUnit_Filter, { owningbusinessunit: BusinessUnit_Result }>;
=======
>>>>>>> origin/main
  owningteam: WebExpand<ts_tripinspector_Expand, Team_Select, Team_Filter, { owningteam: Team_Result }>;
  owninguser: WebExpand<ts_tripinspector_Expand, SystemUser_Select, SystemUser_Filter, { owninguser: SystemUser_Result }>;
  ts_inspector: WebExpand<ts_tripinspector_Expand, SystemUser_Select, SystemUser_Filter, { ts_inspector: SystemUser_Result }>;
  ts_trip: WebExpand<ts_tripinspector_Expand, ts_trip_Select, ts_trip_Filter, { ts_trip: ts_trip_Result }>;
}
interface ts_tripinspector_FormattedResult {
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
  ts_trip_formatted?: string;
}
interface ts_tripinspector_Result extends ts_tripinspector_Base, ts_tripinspector_Relationships {
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
  ts_trip_guid: string | null;
}
interface ts_tripinspector_RelatedOne {
  createdby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  createdonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  modifiedonbehalfby: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ownerid: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult> & WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
<<<<<<< HEAD
  owningbusinessunit: WebMappingRetrieve<BusinessUnit_Select,BusinessUnit_Expand,BusinessUnit_Filter,BusinessUnit_Fixed,BusinessUnit_Result,BusinessUnit_FormattedResult>;
=======
>>>>>>> origin/main
  owningteam: WebMappingRetrieve<Team_Select,Team_Expand,Team_Filter,Team_Fixed,Team_Result,Team_FormattedResult>;
  owninguser: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_inspector: WebMappingRetrieve<SystemUser_Select,SystemUser_Expand,SystemUser_Filter,SystemUser_Fixed,SystemUser_Result,SystemUser_FormattedResult>;
  ts_trip: WebMappingRetrieve<ts_trip_Select,ts_trip_Expand,ts_trip_Filter,ts_trip_Fixed,ts_trip_Result,ts_trip_FormattedResult>;
}
interface ts_tripinspector_RelatedMany {
}
interface WebEntitiesRetrieve {
  ts_tripinspectors: WebMappingRetrieve<ts_tripinspector_Select,ts_tripinspector_Expand,ts_tripinspector_Filter,ts_tripinspector_Fixed,ts_tripinspector_Result,ts_tripinspector_FormattedResult>;
}
interface WebEntitiesRelated {
  ts_tripinspectors: WebMappingRelated<ts_tripinspector_RelatedOne,ts_tripinspector_RelatedMany>;
}
interface WebEntitiesCUDA {
  ts_tripinspectors: WebMappingCUDA<ts_tripinspector_Create,ts_tripinspector_Update,ts_tripinspector_Select>;
}
